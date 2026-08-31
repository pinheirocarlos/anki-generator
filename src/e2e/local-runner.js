/**
 * Fast Headless Local Component Runner for Instant Dev Feedback (Task T022, T024)
 *
 * Executes full DOM, CSS layout, Touch-Target, Video, KaTeX, and Syntax-Highlighting
 * guardrails in-memory via Playwright page.setContent() without network, Anki Desktop,
 * or AnkiWeb dependencies.
 *
 * Performance Target: < 3.0 seconds execution budget (SC-005, FR-009).
 * Conforming to:
 * - specs/004-ankiweb-e2e-automation/spec.md (User Story 4)
 * - specs/004-ankiweb-e2e-automation/contracts/e2e-report.schema.json
 * - specs/004-ankiweb-e2e-automation/contracts/e2e-cli.schema.json
 */

import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';
import { sampleSanityDeck, CARD_TYPOLOGIES, ALL_TYPOLOGIES } from './sanity-sampler.js';
import { renderCard } from '../generator.js';
import { runCardGuardrails } from './guardrails.js';
import {
  generateE2EReport,
  validateE2EReport,
  saveE2EReport,
  formatReportSummary,
  VALID_PHASES
} from './orchestrator.js';
import { VIEWPORT_PROFILES } from '../../playwright.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

/**
 * Maximum acceptable execution duration for the local runner (3.0 seconds / 3000ms).
 * Conforms to SC-005 and FR-009.
 */
export const BENCHMARK_MAX_DURATION_MS = 3000;

export const DEFAULT_LOCAL_OPTIONS = Object.freeze({
  headed: false,
  phase: undefined,
  sampleCount: 8,
  reportDir: 'reports/e2e',
  maxDurationMs: BENCHMARK_MAX_DURATION_MS,
  viewports: ['mobile-small'],
  concurrency: 4,
  saveReport: true
});

/**
 * Asserts that the local runner completed execution within the performance benchmark budget (< 3.0s).
 *
 * @param {number} durationMs - Measured execution duration in milliseconds
 * @param {number} [maxDurationMs=BENCHMARK_MAX_DURATION_MS] - Maximum allowed duration in milliseconds
 * @returns {{
 *   passed: boolean,
 *   durationMs: number,
 *   thresholdMs: number,
 *   marginMs: number,
 *   error: string | null
 * }}
 */
export function assertPerformanceBenchmark(durationMs, maxDurationMs = BENCHMARK_MAX_DURATION_MS) {
  const passed = typeof durationMs === 'number' && durationMs >= 0 && durationMs <= maxDurationMs;
  const marginMs = maxDurationMs - durationMs;
  const error = !passed
    ? `Local runner exceeded performance benchmark: ${durationMs}ms > ${maxDurationMs}ms threshold (exceeded by ${Math.abs(marginMs)}ms)`
    : null;

  return {
    passed,
    durationMs,
    thresholdMs: maxDurationMs,
    marginMs,
    error
  };
}

/**
 * Parses command-line arguments for the local component runner.
 *
 * @param {string[]} [argv=process.argv.slice(2)]
 * @returns {object} Parsed options object
 */
export function parseLocalCLIOptions(argv = process.argv.slice(2)) {
  const options = { ...DEFAULT_LOCAL_OPTIONS };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '--headed') {
      options.headed = true;
    } else if (arg === '--headless') {
      options.headed = false;
    } else if (arg === '--phase' && i + 1 < argv.length) {
      options.phase = argv[++i];
    } else if (arg.startsWith('--phase=')) {
      options.phase = arg.split('=')[1];
    } else if (arg === '--sample-count' && i + 1 < argv.length) {
      options.sampleCount = parseInt(argv[++i], 10);
    } else if (arg.startsWith('--sample-count=')) {
      options.sampleCount = parseInt(arg.split('=')[1], 10);
    } else if (arg === '--max-duration' && i + 1 < argv.length) {
      options.maxDurationMs = parseInt(argv[++i], 10);
    } else if (arg.startsWith('--max-duration=')) {
      options.maxDurationMs = parseInt(arg.split('=')[1], 10);
    } else if (arg === '--concurrency' && i + 1 < argv.length) {
      options.concurrency = parseInt(argv[++i], 10);
    } else if (arg.startsWith('--concurrency=')) {
      options.concurrency = parseInt(arg.split('=')[1], 10);
    } else if (arg === '--report-dir' && i + 1 < argv.length) {
      options.reportDir = argv[++i];
    } else if (arg.startsWith('--report-dir=')) {
      options.reportDir = arg.split('=')[1];
    } else if (arg === '--all-viewports') {
      options.viewports = ['mobile-small', 'mobile-standard', 'desktop-hd'];
    } else if (arg === '--no-save') {
      options.saveReport = false;
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  }

  return options;
}

/**
 * Prints CLI help usage documentation for the local runner.
 */
export function printLocalHelp() {
  console.log(`
================================================================================
  Fast Local Component Runner (Instant DOM & Layout Feedback)
================================================================================

Usage:
  node src/e2e/local-runner.js [options]
  npm run test:e2e:local [-- options]

Options:
  --phase <phase>           Filter dynamic sampling to a specific phase (e.g. "01-dsa")
  --sample-count <count>    Number of cards to sample (default: 8)
  --max-duration <ms>       Performance benchmark threshold in ms (default: 3000)
  --concurrency <count>     Number of parallel page workers (default: 4)
  --all-viewports           Run assertions across mobile-small, mobile-standard, and desktop
  --headed                  Run Chromium in headed mode for visual debugging
  --report-dir <dir>        Output directory for structured report (default: "reports/e2e")
  --no-save                 Do not write report to disk
  -h, --help                Display this help message
`);
}

/**
 * Local Component Runner Class for in-memory fast DOM and layout validation.
 */
export class LocalRunner {
  /**
   * @param {object} [options]
   */
  constructor(options = {}) {
    this.options = {
      ...DEFAULT_LOCAL_OPTIONS,
      ...options
    };
  }

  /**
   * Executes the full in-memory local runner suite.
   *
   * @param {object} [runtimeOptions]
   * @returns {Promise<{
   *   report: object,
   *   benchmark: { passed: boolean, durationMs: number, thresholdMs: number, error: string | null },
   *   passed: boolean,
   *   durationMs: number,
   *   reportPath?: string
   * }>}
   */
  async run(runtimeOptions = {}) {
    const opts = {
      ...this.options,
      ...runtimeOptions
    };

    const startTime = performance.now();
    const startTimeIso = new Date().toISOString();

    // 1. Dynamic Card Sampling (guarantees coverage of typologies)
    let sampledCards = opts.cards;
    let manifest;
    let typologiesCovered = {};

    if (!sampledCards || sampledCards.length === 0) {
      const sampleResult = sampleSanityDeck({
        minRatio: 0,
        minCards: opts.sampleCount || 8
      });
      manifest = sampleResult.manifest;
      sampledCards = sampleResult.sampledCards;

      if (opts.phase && VALID_PHASES.includes(opts.phase)) {
        sampledCards = sampledCards.filter(c => c.phase === opts.phase);
      }

      // Map typology coverage
      for (const typology of ALL_TYPOLOGIES) {
        typologiesCovered[typology] = !!manifest?.coverageMatrix?.[typology];
      }
    } else {
      for (const typology of ALL_TYPOLOGIES) {
        typologiesCovered[typology] = sampledCards.some(
          c => Array.isArray(c.typologiesCovered) && c.typologiesCovered.includes(typology)
        );
      }
    }

    // 2. Determine Viewport Profiles to evaluate
    const viewportKeys = Array.isArray(opts.viewports) && opts.viewports.length > 0
      ? opts.viewports
      : ['mobile-small'];

    const targetViewports = viewportKeys.map(k => {
      if (typeof k === 'object' && k.width && k.height) return k;
      return VIEWPORT_PROFILES[k] || VIEWPORT_PROFILES['mobile-small'];
    });

    // 3. Launch Headless Chromium browser instance (single instance for maximum velocity)
    const browser = await chromium.launch({
      headless: !opts.headed,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });

    const cardResults = [];

    try {
      const context = await browser.newContext();

      // Create a pool of pages for concurrent validation
      const concurrency = Math.max(1, Math.min(opts.concurrency || 4, sampledCards.length));
      const pages = await Promise.all(
        Array.from({ length: concurrency }, async () => context.newPage())
      );

      for (const viewport of targetViewports) {
        // Prepare task queue for this viewport
        const tasks = [];
        for (const card of sampledCards) {
          tasks.push({ card, viewport });
        }

        let taskIndex = 0;
        async function worker(page) {
          await page.setViewportSize({
            width: viewport.width,
            height: viewport.height
          });

          while (taskIndex < tasks.length) {
            const current = tasks[taskIndex++];
            if (!current) break;

            const { card } = current;
            const cardId = card.id || path.basename(card.filePath || 'card', '.md');
            const rendered = renderCard(card.filePath || card, { resolveLocalMedia: true });

            // --- Front View Validation ---
            await page.setContent(rendered.frontDocument, { waitUntil: 'domcontentloaded' });
            const frontResult = await runCardGuardrails(page, {
              cardId,
              side: 'front',
              viewport: {
                name: viewport.name || 'mobile-small',
                width: viewport.width,
                height: viewport.height,
                isMobile: !!viewport.isMobile
              },
              options: {
                testAccordion: false
              }
            });
            cardResults.push(frontResult);

            // --- Back View Validation ---
            await page.setContent(rendered.backDocument, { waitUntil: 'domcontentloaded' });
            const backResult = await runCardGuardrails(page, {
              cardId,
              side: 'back',
              viewport: {
                name: viewport.name || 'mobile-small',
                width: viewport.width,
                height: viewport.height,
                isMobile: !!viewport.isMobile
              },
              options: {
                testAccordion: true
              }
            });
            cardResults.push(backResult);
          }
        }

        await Promise.all(pages.map(p => worker(p)));
      }

      await context.close();
    } finally {
      await browser.close();
    }

    const endTime = performance.now();
    const durationMs = Math.round(endTime - startTime);

    // 4. Performance Benchmark Assertion (< 3.0s)
    const benchmark = assertPerformanceBenchmark(durationMs, opts.maxDurationMs || BENCHMARK_MAX_DURATION_MS);

    // 5. Generate Structured JSON Execution Report
    const report = generateE2EReport({
      suite: 'Local E2E Component Runner',
      mode: 'local-headless',
      deckName: manifest?.deckName || 'MAANG_E2E_Sanity',
      durationMs,
      startTime: startTimeIso,
      endTime: new Date().toISOString(),
      cardResults,
      typologiesCovered,
      artifacts: {}
    });

    // Validate generated report against contract schema
    const validation = validateE2EReport(report);
    if (!validation.valid) {
      console.warn('⚠️ Generated E2E local report schema warnings:\n' + validation.errors.join('\n'));
    }

    // 6. Save Report Artifact (if enabled)
    let reportPath;
    if (opts.saveReport !== false) {
      const destDir = opts.reportDir || 'reports/e2e';
      reportPath = saveE2EReport(report, destDir);
      report.artifacts.reportPath = reportPath;
    }

    const overallPassed = report.summary.overallStatus === 'PASSED' && benchmark.passed;

    return {
      report,
      benchmark,
      passed: overallPassed,
      durationMs,
      reportPath
    };
  }
}

/**
 * Functional wrapper for executing the local component runner.
 *
 * @param {object} [options]
 * @returns {Promise<{
 *   report: object,
 *   benchmark: { passed: boolean, durationMs: number, thresholdMs: number, error: string | null },
 *   passed: boolean,
 *   durationMs: number,
 *   reportPath?: string
 * }>}
 */
export async function runLocalRunner(options = {}) {
  const runner = new LocalRunner(options);
  return runner.run(options);
}

// CLI Execution Handler
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const cliOpts = parseLocalCLIOptions();

  if (cliOpts.help) {
    printLocalHelp();
    process.exit(0);
  }

  console.log('⚡ Starting Fast Local Component Runner (Task T022, T024)...');
  console.log(`⏱️  Benchmark Budget: < ${(cliOpts.maxDurationMs / 1000).toFixed(1)}s\n`);

  runLocalRunner(cliOpts)
    .then(({ report, benchmark, passed, durationMs, reportPath }) => {
      console.log(formatReportSummary(report));

      console.log('\n⏱️  Performance Benchmark Summary:');
      if (benchmark.passed) {
        console.log(`   ✅ Execution completed in ${durationMs}ms (< ${benchmark.thresholdMs}ms target, margin: +${benchmark.marginMs}ms)`);
      } else {
        console.error(`   ❌ Benchmark FAILED: Execution took ${durationMs}ms, exceeding the ${benchmark.thresholdMs}ms threshold!`);
      }

      if (reportPath) {
        console.log(`\n💾 Saved local report artifact to: ${path.relative(ROOT_DIR, reportPath)}`);
      }

      if (passed) {
        console.log('\n🎉 Local component runner validation PASSED with 0 errors!\n');
        process.exit(0);
      } else {
        console.error('\n💥 Local component runner validation FAILED!\n');
        process.exit(1);
      }
    })
    .catch(err => {
      console.error('💥 Fatal error in local runner:', err);
      process.exit(1);
    });
}
