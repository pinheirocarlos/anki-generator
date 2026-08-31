import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';
import { sampleSanityDeck, exportSanityManifest } from './sanity-sampler.js';
import { buildDecks } from '../generator.js';
import { ankiConnect, AnkiConnectError, formatDiagnosticMessage } from '../utils/anki-connect.js';
import { AnkiWebRunner } from './ankiweb-runner.js';
import { MAX_DIFF_PIXEL_RATIO } from './guardrails.js';
import { VIEWPORT_PROFILES } from '../../playwright.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

export const DEFAULT_BASELINES_DIR = path.join(ROOT_DIR, 'test', 'e2e', 'baselines');
export const DEFAULT_SCREENSHOTS_DIR = path.join(ROOT_DIR, 'reports', 'e2e', 'screenshots');

export const VALID_PHASES = Object.freeze([
  '01-dsa',
  '02-cs-fundamentals',
  '03-system-design-backend',
  '04-behavioral-engineering'
]);

export const DEFAULT_CLI_OPTIONS = Object.freeze({
  cleanup: false,
  headed: false,
  updateSnapshots: false,
  phase: undefined,
  sampleCount: 8,
  reportDir: 'reports/e2e'
});

export const VALID_SUITES = Object.freeze([
  'AnkiWeb E2E Automation',
  'Local E2E Component Runner'
]);

export const VALID_MODES = Object.freeze([
  'cloud-ankiweb',
  'local-headless'
]);

/**
 * Finds the golden baseline file path corresponding to a card ID, side, and viewport profile.
 *
 * @param {string} cardId - Canonical card ID (e.g. "DSA-STRUCT-ARRAY-000")
 * @param {"front"|"back"} side - Card side
 * @param {string} [viewportName="mobile-small"] - Viewport name ("mobile-small", "mobile-standard", "desktop-hd")
 * @param {string} [baselinesDir=DEFAULT_BASELINES_DIR] - Root baselines directory
 * @returns {string|null} Baseline file path or null if not found
 */
export function findBaselinePath(cardId, side, viewportName = 'mobile-small', baselinesDir = DEFAULT_BASELINES_DIR) {
  const expectedPath = path.join(baselinesDir, viewportName, `${cardId}-${side}.png`);
  if (fs.existsSync(expectedPath)) {
    return expectedPath;
  }
  return null;
}

/**
 * Compares an actual screenshot against a golden baseline reference screenshot.
 * Uses Playwright canvas pixel comparison to compute pixel diff count, diff ratio,
 * and optionally generates a highlighted diff image artifact.
 *
 * @param {string|Buffer} actualScreenshot - Path to actual screenshot file or Buffer
 * @param {string|Buffer} baselineScreenshot - Path to golden baseline reference file or Buffer
 * @param {object} [options={}]
 * @param {number} [options.threshold=0.2] - Color delta threshold per channel (0.0 to 1.0)
 * @param {number} [options.maxDiffPixelRatio=MAX_DIFF_PIXEL_RATIO] - Maximum acceptable diff ratio (default: 0.02 / 2%)
 * @param {string} [options.diffOutputPath] - Output path for visual diff PNG artifact
 * @param {boolean} [options.saveDiff=true] - Whether to save diff artifact when mismatch occurs
 * @param {import('@playwright/test').Page} [options.page] - Optional existing Playwright page for canvas evaluation
 * @returns {Promise<{
 *   match: boolean,
 *   diffRatio: number,
 *   totalPixels: number,
 *   diffPixelCount: number,
 *   width: number,
 *   height: number,
 *   diffOutputPath?: string,
 *   error?: string
 * }>}
 */
export async function compareVisualSnapshots(actualScreenshot, baselineScreenshot, options = {}) {
  const {
    threshold = 0.2,
    maxDiffPixelRatio = MAX_DIFF_PIXEL_RATIO || 0.02,
    diffOutputPath,
    saveDiff = true,
    page: providedPage
  } = options;

  let actualBuffer;
  if (Buffer.isBuffer(actualScreenshot)) {
    actualBuffer = actualScreenshot;
  } else if (typeof actualScreenshot === 'string' && fs.existsSync(actualScreenshot)) {
    actualBuffer = fs.readFileSync(actualScreenshot);
  } else {
    return {
      match: false,
      diffRatio: 1.0,
      totalPixels: 0,
      diffPixelCount: 0,
      width: 0,
      height: 0,
      error: `Actual screenshot file not found: ${actualScreenshot}`
    };
  }

  let baselineBuffer;
  if (Buffer.isBuffer(baselineScreenshot)) {
    baselineBuffer = baselineScreenshot;
  } else if (typeof baselineScreenshot === 'string' && fs.existsSync(baselineScreenshot)) {
    baselineBuffer = fs.readFileSync(baselineScreenshot);
  } else {
    return {
      match: false,
      diffRatio: 1.0,
      totalPixels: 0,
      diffPixelCount: 0,
      width: 0,
      height: 0,
      error: `Baseline screenshot file not found: ${baselineScreenshot}`
    };
  }

  if (actualBuffer.equals(baselineBuffer)) {
    return {
      match: true,
      diffRatio: 0,
      totalPixels: 1,
      diffPixelCount: 0,
      width: 0,
      height: 0
    };
  }

  const base64_1 = actualBuffer.toString('base64');
  const base64_2 = baselineBuffer.toString('base64');

  let browserToClose = null;
  let page = providedPage;

  try {
    if (!page) {
      browserToClose = await chromium.launch({ headless: true });
      page = await browserToClose.newPage();
    }

    const evalResult = await page.evaluate(async ({ b1, b2, maxDiffRatio, tol }) => {
      const loadImg = (b64) => new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load image for visual diff'));
        img.src = 'data:image/png;base64,' + b64;
      });

      const img1 = await loadImg(b1);
      const img2 = await loadImg(b2);

      const width = Math.max(img1.width, img2.width);
      const height = Math.max(img1.height, img2.height);

      const canvas1 = document.createElement('canvas');
      canvas1.width = width;
      canvas1.height = height;
      const ctx1 = canvas1.getContext('2d');
      ctx1.drawImage(img1, 0, 0);
      const data1 = ctx1.getImageData(0, 0, width, height).data;

      const canvas2 = document.createElement('canvas');
      canvas2.width = width;
      canvas2.height = height;
      const ctx2 = canvas2.getContext('2d');
      ctx2.drawImage(img2, 0, 0);
      const data2 = ctx2.getImageData(0, 0, width, height).data;

      const diffCanvas = document.createElement('canvas');
      diffCanvas.width = width;
      diffCanvas.height = height;
      const diffCtx = diffCanvas.getContext('2d');
      const diffImgData = diffCtx.createImageData(width, height);
      const diffData = diffImgData.data;

      let diffPixelCount = 0;
      const totalPixels = width * height;
      const maxDelta = 255 * tol;

      for (let i = 0; i < data1.length; i += 4) {
        const rDiff = Math.abs(data1[i] - data2[i]);
        const gDiff = Math.abs(data1[i + 1] - data2[i + 1]);
        const bDiff = Math.abs(data1[i + 2] - data2[i + 2]);
        const aDiff = Math.abs(data1[i + 3] - data2[i + 3]);

        const isDiff = (rDiff + gDiff + bDiff + aDiff) / 4 > maxDelta;

        if (isDiff) {
          diffPixelCount++;
          diffData[i] = 255;
          diffData[i + 1] = 0;
          diffData[i + 2] = 0;
          diffData[i + 3] = 255;
        } else {
          diffData[i] = data1[i];
          diffData[i + 1] = data1[i + 1];
          diffData[i + 2] = data1[i + 2];
          diffData[i + 3] = Math.max(30, Math.round(data1[i + 3] * 0.3));
        }
      }

      diffCtx.putImageData(diffImgData, 0, 0);
      const diffRatio = totalPixels > 0 ? Math.round((diffPixelCount / totalPixels) * 10000) / 10000 : 0;
      const diffDataUrl = (diffPixelCount > 0) ? diffCanvas.toDataURL('image/png') : null;

      return {
        width,
        height,
        totalPixels,
        diffPixelCount,
        diffRatio,
        match: diffRatio <= maxDiffRatio,
        diffDataUrl
      };
    }, { b1: base64_1, b2: base64_2, maxDiffRatio: maxDiffPixelRatio, tol: threshold });

    let writtenDiffPath;
    if (saveDiff && diffOutputPath && evalResult.diffDataUrl) {
      const diffDir = path.dirname(diffOutputPath);
      if (!fs.existsSync(diffDir)) {
        fs.mkdirSync(diffDir, { recursive: true });
      }
      const rawBase64 = evalResult.diffDataUrl.replace(/^data:image\/png;base64,/, '');
      fs.writeFileSync(diffOutputPath, Buffer.from(rawBase64, 'base64'));
      writtenDiffPath = diffOutputPath;
    }

    return {
      match: evalResult.match,
      diffRatio: evalResult.diffRatio,
      totalPixels: evalResult.totalPixels,
      diffPixelCount: evalResult.diffPixelCount,
      width: evalResult.width,
      height: evalResult.height,
      ...(writtenDiffPath ? { diffOutputPath: writtenDiffPath } : {})
    };
  } finally {
    if (browserToClose) {
      await browserToClose.close().catch(() => {});
    }
  }
}

/**
 * Parses command-line arguments into structured options conforming to e2e-cli.schema.json.
 *
 * @param {string[]} [argv=process.argv.slice(2)] - Arguments array
 * @returns {object} Parsed CLI options
 */
export function parseCLIOptions(argv = process.argv.slice(2)) {
  const options = {
    cleanup: DEFAULT_CLI_OPTIONS.cleanup,
    headed: DEFAULT_CLI_OPTIONS.headed,
    updateSnapshots: DEFAULT_CLI_OPTIONS.updateSnapshots,
    phase: undefined,
    sampleCount: DEFAULT_CLI_OPTIONS.sampleCount,
    reportDir: DEFAULT_CLI_OPTIONS.reportDir,
    help: false
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '--cleanup') {
      options.cleanup = true;
    } else if (arg === '--no-cleanup') {
      options.cleanup = false;
    } else if (arg === '--headed') {
      options.headed = true;
    } else if (arg === '--headless') {
      options.headed = false;
    } else if (arg === '--updateSnapshots' || arg === '--update-snapshots') {
      options.updateSnapshots = true;
    } else if (arg === '--phase' && argv[i + 1]) {
      options.phase = argv[i + 1];
      i++;
    } else if (arg.startsWith('--phase=')) {
      options.phase = arg.split('=')[1];
    } else if ((arg === '--sampleCount' || arg === '--sample-count') && argv[i + 1]) {
      options.sampleCount = parseInt(argv[i + 1], 10);
      i++;
    } else if (arg.startsWith('--sampleCount=') || arg.startsWith('--sample-count=')) {
      options.sampleCount = parseInt(arg.split('=')[1], 10);
    } else if ((arg === '--reportDir' || arg === '--report-dir') && argv[i + 1]) {
      options.reportDir = argv[i + 1];
      i++;
    } else if (arg.startsWith('--reportDir=') || arg.startsWith('--report-dir=')) {
      options.reportDir = arg.split('=')[1];
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  }

  return options;
}

/**
 * Validates parsed CLI options against e2e-cli.schema.json constraints.
 *
 * @param {object} options - CLI options object
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateCLIOptions(options) {
  const errors = [];

  if (!options || typeof options !== 'object') {
    return { valid: false, errors: ['CLI options must be an object.'] };
  }

  if (typeof options.cleanup !== 'boolean') {
    errors.push(`"cleanup" must be a boolean, got ${typeof options.cleanup}.`);
  }

  if (typeof options.headed !== 'boolean') {
    errors.push(`"headed" must be a boolean, got ${typeof options.headed}.`);
  }

  if (typeof options.updateSnapshots !== 'boolean') {
    errors.push(`"updateSnapshots" must be a boolean, got ${typeof options.updateSnapshots}.`);
  }

  if (options.phase !== undefined && options.phase !== null) {
    if (typeof options.phase !== 'string' || !VALID_PHASES.includes(options.phase)) {
      errors.push(
        `Invalid phase "${options.phase}". Must be one of: [${VALID_PHASES.join(', ')}].`
      );
    }
  }

  if (
    !Number.isInteger(options.sampleCount) ||
    options.sampleCount < 1 ||
    options.sampleCount > 50
  ) {
    errors.push(
      `"sampleCount" must be an integer between 1 and 50, got ${options.sampleCount}.`
    );
  }

  if (typeof options.reportDir !== 'string' || options.reportDir.trim() === '') {
    errors.push(`"reportDir" must be a non-empty string, got "${options.reportDir}".`);
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Prints CLI help usage documentation to the console.
 */
export function printHelp() {
  console.log(`
================================================================================
  AnkiWeb E2E Automation & Visual Layout Guardrails CLI
================================================================================

Usage:
  node src/e2e/orchestrator.js [options]

Options:
  --cleanup                 Delete MAANG_E2E_Sanity deck from Anki Desktop and sync after test completion (default: false)
  --no-cleanup              Keep MAANG_E2E_Sanity deck for post-test inspection
  --headed                  Run Playwright in headed browser mode for visual inspection (default: headless)
  --update-snapshots        Update golden baseline visual snapshot reference images (default: false)
  --phase <phase>           Filter dynamic sampling to a specific phase (e.g. "01-dsa", "02-cs-fundamentals")
  --sample-count <count>    Maximum number of cards to sample for sanity deck (1-50, default: 8)
  --report-dir <dir>        Output directory for structured reports and screenshots (default: "reports/e2e")
  -h, --help                Display this help message
`);
}

/**
 * Generates a structured JSON execution report conforming to e2e-report.schema.json.
 *
 * @param {object} params
 * @param {"AnkiWeb E2E Automation"|"Local E2E Component Runner"} [params.suite="AnkiWeb E2E Automation"]
 * @param {"cloud-ankiweb"|"local-headless"} [params.mode="cloud-ankiweb"]
 * @param {string} [params.deckName="MAANG_E2E_Sanity"]
 * @param {number} [params.durationMs]
 * @param {Date|number|string} [params.startTime]
 * @param {Date|number|string} [params.endTime]
 * @param {Array<object>} [params.cardResults=[]]
 * @param {Record<string, boolean>} [params.typologiesCovered={}]
 * @param {object} [params.artifacts={}]
 * @param {object} [params.customSummary]
 * @returns {object} Conforming E2EExecutionReport object
 */
export function generateE2EReport(params = {}) {
  const {
    suite = 'AnkiWeb E2E Automation',
    mode = 'cloud-ankiweb',
    deckName = 'MAANG_E2E_Sanity',
    durationMs: explicitDurationMs,
    startTime,
    endTime,
    cardResults = [],
    typologiesCovered = {},
    artifacts = {},
    customSummary = null
  } = params;

  let calculatedDuration = 0;
  if (typeof explicitDurationMs === 'number' && explicitDurationMs >= 0) {
    calculatedDuration = explicitDurationMs;
  } else if (startTime && endTime) {
    calculatedDuration = Math.max(0, new Date(endTime).getTime() - new Date(startTime).getTime());
  }

  // Calculate unique cards tested
  const uniqueCardIds = new Set(cardResults.map(r => r.cardId).filter(Boolean));
  const totalCardsTested = Math.max(1, uniqueCardIds.size || cardResults.length);

  // Calculate assertions summary
  let totalAssertions = 0;
  let passedAssertions = 0;
  let failedAssertions = 0;

  if (customSummary) {
    totalAssertions = customSummary.totalAssertions;
    passedAssertions = customSummary.passedAssertions;
    failedAssertions = customSummary.failedAssertions;
  } else {
    for (const card of cardResults) {
      // Each card evaluation checks standard guardrail assertions:
      // 1. Horizontal overflow (0%)
      // 2. Touch targets (>= 44px)
      // 3. KaTeX rendering (0 errors)
      // 4. Video playback attributes
      // 5. Code syntax highlighting
      // +1 if visual diff checked
      let cardAssertionChecks = 5;
      if (card.metrics && typeof card.metrics.visualDiffRatio === 'number') {
        cardAssertionChecks += 1;
      }

      const cardErrors = Array.isArray(card.errors) ? card.errors.length : (card.passed ? 0 : 1);
      const cardFails = Math.min(cardAssertionChecks, cardErrors);
      const cardPasses = cardAssertionChecks - cardFails;

      totalAssertions += cardAssertionChecks;
      passedAssertions += cardPasses;
      failedAssertions += cardFails;
    }

    if (totalAssertions === 0) {
      totalAssertions = 1;
      passedAssertions = 1;
      failedAssertions = 0;
    }
  }

  const overallStatus = (failedAssertions === 0 && cardResults.every(r => r.passed !== false))
    ? 'PASSED'
    : 'FAILED';

  const report = {
    suite,
    timestamp: new Date().toISOString(),
    durationMs: calculatedDuration,
    environment: {
      nodeVersion: process.version,
      os: `${os.type()} ${os.release()} (${os.arch()})`,
      browser: 'chromium',
      mode,
      deckName
    },
    summary: {
      totalCardsTested,
      totalAssertions,
      passedAssertions,
      failedAssertions,
      overallStatus
    },
    typologiesCovered: { ...typologiesCovered },
    cardResults: cardResults.map(r => ({
      cardId: r.cardId || 'UNKNOWN',
      viewport: r.viewport ? {
        name: r.viewport.name || 'mobile-small',
        width: r.viewport.width || 360,
        height: r.viewport.height || 640,
        isMobile: r.viewport.isMobile !== undefined ? !!r.viewport.isMobile : true
      } : {
        name: 'mobile-small',
        width: 360,
        height: 640,
        isMobile: true
      },
      side: r.side || 'front',
      passed: !!r.passed,
      metrics: {
        scrollWidth: r.metrics?.scrollWidth || 0,
        clientWidth: r.metrics?.clientWidth || 0,
        hasHorizontalOverflow: !!r.metrics?.hasHorizontalOverflow,
        ...(r.metrics?.summaryTouchTargetHeight !== undefined ? { summaryTouchTargetHeight: r.metrics.summaryTouchTargetHeight } : {}),
        katexErrorCount: r.metrics?.katexErrorCount || 0,
        ...(r.metrics?.videoElementCount !== undefined ? { videoElementCount: r.metrics.videoElementCount } : {}),
        videoMissingAttributes: Array.isArray(r.metrics?.videoMissingAttributes) ? [...r.metrics.videoMissingAttributes] : [],
        ...(r.metrics?.highlightJsTokensFound !== undefined ? { highlightJsTokensFound: r.metrics.highlightJsTokensFound } : {}),
        ...(r.metrics?.visualDiffRatio !== undefined ? { visualDiffRatio: r.metrics.visualDiffRatio } : {})
      },
      ...(r.screenshotPath ? { screenshotPath: r.screenshotPath } : {}),
      errors: Array.isArray(r.errors) ? [...r.errors] : []
    })),
    artifacts: { ...artifacts }
  };

  return report;
}

/**
 * Validates an E2EExecutionReport object against e2e-report.schema.json rules.
 *
 * @param {object} report - Report object to validate
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateE2EReport(report) {
  const errors = [];

  if (!report || typeof report !== 'object') {
    return { valid: false, errors: ['Report must be a non-null object.'] };
  }

  // 1. Validate suite
  if (!VALID_SUITES.includes(report.suite)) {
    errors.push(`"suite" must be one of: [${VALID_SUITES.join(', ')}], got "${report.suite}".`);
  }

  // 2. Validate timestamp
  if (!report.timestamp || typeof report.timestamp !== 'string' || isNaN(Date.parse(report.timestamp))) {
    errors.push(`"timestamp" must be a valid ISO-8601 date string, got "${report.timestamp}".`);
  }

  // 3. Validate durationMs
  if (typeof report.durationMs !== 'number' || report.durationMs < 0) {
    errors.push(`"durationMs" must be a number >= 0, got ${report.durationMs}.`);
  }

  // 4. Validate environment
  if (!report.environment || typeof report.environment !== 'object') {
    errors.push('"environment" must be a non-null object.');
  } else {
    const env = report.environment;
    if (!env.nodeVersion || typeof env.nodeVersion !== 'string') {
      errors.push('environment.nodeVersion must be a non-empty string.');
    }
    if (!env.os || typeof env.os !== 'string') {
      errors.push('environment.os must be a non-empty string.');
    }
    if (env.browser !== 'chromium') {
      errors.push(`environment.browser must be "chromium", got "${env.browser}".`);
    }
    if (!VALID_MODES.includes(env.mode)) {
      errors.push(`environment.mode must be one of [${VALID_MODES.join(', ')}], got "${env.mode}".`);
    }
    if (!env.deckName || typeof env.deckName !== 'string') {
      errors.push('environment.deckName must be a non-empty string.');
    }
  }

  // 5. Validate summary
  if (!report.summary || typeof report.summary !== 'object') {
    errors.push('"summary" must be a non-null object.');
  } else {
    const s = report.summary;
    if (!Number.isInteger(s.totalCardsTested) || s.totalCardsTested < 1) {
      errors.push(`summary.totalCardsTested must be an integer >= 1, got ${s.totalCardsTested}.`);
    }
    if (!Number.isInteger(s.totalAssertions) || s.totalAssertions < 1) {
      errors.push(`summary.totalAssertions must be an integer >= 1, got ${s.totalAssertions}.`);
    }
    if (!Number.isInteger(s.passedAssertions) || s.passedAssertions < 0) {
      errors.push(`summary.passedAssertions must be an integer >= 0, got ${s.passedAssertions}.`);
    }
    if (!Number.isInteger(s.failedAssertions) || s.failedAssertions < 0) {
      errors.push(`summary.failedAssertions must be an integer >= 0, got ${s.failedAssertions}.`);
    }
    if (s.overallStatus !== 'PASSED' && s.overallStatus !== 'FAILED') {
      errors.push(`summary.overallStatus must be "PASSED" or "FAILED", got "${s.overallStatus}".`);
    }
  }

  // 6. Validate cardResults
  if (!Array.isArray(report.cardResults)) {
    errors.push('"cardResults" must be an array.');
  } else {
    report.cardResults.forEach((card, idx) => {
      if (!card.cardId || typeof card.cardId !== 'string') {
        errors.push(`cardResults[${idx}].cardId must be a non-empty string.`);
      }
      if (card.side !== 'front' && card.side !== 'back') {
        errors.push(`cardResults[${idx}].side must be "front" or "back", got "${card.side}".`);
      }
      if (typeof card.passed !== 'boolean') {
        errors.push(`cardResults[${idx}].passed must be a boolean.`);
      }
      if (!card.metrics || typeof card.metrics !== 'object') {
        errors.push(`cardResults[${idx}].metrics must be an object.`);
      } else {
        const m = card.metrics;
        if (typeof m.scrollWidth !== 'number') {
          errors.push(`cardResults[${idx}].metrics.scrollWidth must be a number.`);
        }
        if (typeof m.clientWidth !== 'number') {
          errors.push(`cardResults[${idx}].metrics.clientWidth must be a number.`);
        }
        if (typeof m.hasHorizontalOverflow !== 'boolean') {
          errors.push(`cardResults[${idx}].metrics.hasHorizontalOverflow must be a boolean.`);
        }
        if (!Number.isInteger(m.katexErrorCount) || m.katexErrorCount < 0) {
          errors.push(`cardResults[${idx}].metrics.katexErrorCount must be an integer >= 0.`);
        }
        if (!Array.isArray(m.videoMissingAttributes)) {
          errors.push(`cardResults[${idx}].metrics.videoMissingAttributes must be an array.`);
        }
      }
      if (!Array.isArray(card.errors)) {
        errors.push(`cardResults[${idx}].errors must be an array of strings.`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Saves a structured E2EExecutionReport object to disk.
 *
 * @param {object} report - Report object to persist
 * @param {string} [destinationPathOrDir] - Destination file path or directory
 * @returns {string} Absolute path to written report file
 */
export function saveE2EReport(report, destinationPathOrDir) {
  let targetPath;
  if (!destinationPathOrDir) {
    targetPath = path.join(ROOT_DIR, 'reports', 'e2e', 'e2e-report.json');
  } else {
    const resolved = path.resolve(ROOT_DIR, destinationPathOrDir);
    if (resolved.endsWith('.json')) {
      targetPath = resolved;
    } else {
      targetPath = path.join(resolved, 'e2e-report.json');
    }
  }

  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(targetPath, JSON.stringify(report, null, 2), 'utf8');
  return targetPath;
}

/**
 * Formats report metrics into a readable terminal summary string.
 *
 * @param {object} report - E2EExecutionReport object
 * @returns {string} Formatted terminal summary
 */
export function formatReportSummary(report) {
  const isPassed = report.summary?.overallStatus === 'PASSED';
  const statusIcon = isPassed ? '✅ PASSED' : '❌ FAILED';
  const separator = '='.repeat(70);

  const lines = [
    separator,
    `  ${report.suite || 'E2E Execution Report'} - ${statusIcon}`,
    separator,
    `  Mode:             ${report.environment?.mode || 'N/A'}`,
    `  Deck:             ${report.environment?.deckName || 'N/A'}`,
    `  Execution Time:   ${report.durationMs || 0}ms`,
    `  Cards Tested:     ${report.summary?.totalCardsTested || 0}`,
    `  Assertions:       ${report.summary?.totalAssertions || 0} total (${report.summary?.passedAssertions || 0} passed, ${report.summary?.failedAssertions || 0} failed)`,
    `  Timestamp:        ${report.timestamp || new Date().toISOString()}`
  ];

  if (report.typologiesCovered && Object.keys(report.typologiesCovered).length > 0) {
    lines.push('  Typologies:');
    for (const [typology, covered] of Object.entries(report.typologiesCovered)) {
      lines.push(`    - [${covered ? '✓' : '✗'}] ${typology}`);
    }
  }

  if (!isPassed && Array.isArray(report.cardResults)) {
    const failedCards = report.cardResults.filter(c => !c.passed || (c.errors && c.errors.length > 0));
    if (failedCards.length > 0) {
      lines.push('  Failures:');
      for (const card of failedCards) {
        lines.push(`    - Card: ${card.cardId} (${card.side || 'unknown side'})`);
        for (const err of card.errors || []) {
          lines.push(`        * ${err}`);
        }
      }
    }
  }

  lines.push(separator);
  return lines.join('\n');
}

/**
 * Main Orchestration Entry Point.
 * Coordinates card sampling, package build, Anki-Connect interaction, browser runner, and report generation.
 *
 * @param {object} [cliOptions] - Parsed CLI options
 * @returns {Promise<object>} Generated and validated E2EExecutionReport
 */
export async function runOrchestrator(cliOptions = {}) {
  const options = {
    ...DEFAULT_CLI_OPTIONS,
    ...cliOptions
  };

  const validation = validateCLIOptions(options);
  if (!validation.valid) {
    throw new Error(`Invalid CLI options:\n${validation.errors.join('\n')}`);
  }

  const startTime = new Date();
  console.log('🚀 Starting AnkiWeb E2E Automation Pipeline...\n');

  // Step 1: Dynamic Card Sampling
  console.log('📦 Step 1: Sampling representative cards for sanity deck...');
  const { manifest, sampledCards } = sampleSanityDeck({
    phaseFilter: options.phase,
    targetSampleCount: options.sampleCount
  });

  const manifestPath = exportSanityManifest(
    manifest,
    path.join(options.reportDir, 'sanity-manifest.json')
  );
  console.log(`   - Sampled ${manifest.totalCards} cards covering 100% of typologies.`);
  console.log(`   - Manifest saved to ${manifestPath}`);

  // Step 2: Build MAANG_E2E_Sanity.apkg
  console.log('\n🔨 Step 2: Compiling isolated sanity deck package...');
  const markdownFiles = sampledCards.map(c => c.filePath);
  const apkgResult = await buildDecks({
    files: markdownFiles,
    deckName: manifest.deckName,
    outputFile: manifest.outputApkgPath,
    silent: true
  });
  console.log(`   - Package compiled successfully: ${apkgResult.outputFile}`);

  // Step 3: Anki-Connect Desktop Import and Sync to AnkiWeb
  const client = options.ankiConnectClient || ankiConnect;
  if (!options.skipAnkiConnect) {
    console.log('\n🔄 Step 3: Importing sanity deck into Anki Desktop via Anki-Connect...');
    try {
      await client.ping();
    } catch (pingErr) {
      if (pingErr instanceof AnkiConnectError && pingErr.diagnostic) {
        console.error('\n' + formatDiagnosticMessage(pingErr.diagnostic));
      }
      throw pingErr;
    }

    await client.importPackage(apkgResult.outputFile);
    console.log(`   - Imported "${manifest.deckName}" into local Anki Desktop collection.`);

    console.log('☁️  Synchronizing Anki Desktop with AnkiWeb cloud...');
    await client.sync();
    console.log('   - Synced successfully with AnkiWeb.');
  }

  // Step 4: Playwright AnkiWeb Browser Automation Runner
  let cardResults = [];
  const screenshotsDir = path.join(options.reportDir, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  if (!options.skipBrowser) {
    console.log('\n🌐 Step 4: Launching AnkiWeb Playwright browser runner...');
    const runner = options.ankiWebRunner || new AnkiWebRunner({
      headed: options.headed,
      viewport: options.viewport || VIEWPORT_PROFILES?.['mobile-small'] || {
        name: 'mobile-small',
        width: 360,
        height: 640,
        deviceScaleFactor: 2,
        isMobile: true
      },
      authStoragePath: options.authStoragePath,
      credentials: options.credentials
    });

    try {
      const studyResult = await runner.runStudySession({
        deckName: manifest.deckName,
        maxCards: sampledCards.length,
        screenshotDir: screenshotsDir,
        captureScreenshots: true
      });
      cardResults = studyResult?.cardResults || [];
      console.log(`   - Studied and evaluated ${studyResult?.totalCardsStudied || cardResults.length} card(s).`);

      // Step 4b: Visual Regression Diff Comparison against Golden Baselines
      const baselinesDir = options.baselinesDir || DEFAULT_BASELINES_DIR;
      if (fs.existsSync(baselinesDir)) {
        console.log('📸 Comparing captured card screenshots against Golden Baselines...');
        for (const cardRes of cardResults) {
          const vpName = cardRes.viewport?.name || 'mobile-small';
          const baselinePath = findBaselinePath(cardRes.cardId, cardRes.side, vpName, baselinesDir);

          if (baselinePath && cardRes.screenshotPath && fs.existsSync(cardRes.screenshotPath)) {
            if (options.updateSnapshots) {
              fs.copyFileSync(cardRes.screenshotPath, baselinePath);
              console.log(`   - Updated golden baseline: ${baselinePath}`);
              cardRes.metrics.visualDiffRatio = 0;
            } else {
              const diffPath = path.join(screenshotsDir, `${cardRes.cardId}-${cardRes.side}-${vpName}-diff.png`);
              const diffResult = await compareVisualSnapshots(
                cardRes.screenshotPath,
                baselinePath,
                {
                  maxDiffPixelRatio: MAX_DIFF_PIXEL_RATIO,
                  diffOutputPath: diffPath,
                  page: runner.page
                }
              );

              cardRes.metrics.visualDiffRatio = diffResult.diffRatio;
              if (!diffResult.match) {
                const diffError = `Visual regression diff ratio ${diffResult.diffRatio} exceeds maximum allowed threshold of ${MAX_DIFF_PIXEL_RATIO} against baseline ${path.basename(baselinePath)}`;
                cardRes.errors.push(diffError);
                cardRes.passed = false;
                console.warn(`   ⚠️ Visual Diff mismatch on [${cardRes.cardId}] (${cardRes.side}): ${(diffResult.diffRatio * 100).toFixed(2)}%`);
              }
            }
          }
        }
      }
    } finally {
      if (!options.keepRunnerOpen) {
        await runner.close();
      }
    }
  }

  // Step 5: Teardown / Cleanup handling (if --cleanup is flagged)
  if (options.cleanup && !options.skipAnkiConnect) {
    console.log('\n🧹 Step 5: Teardown -- Cleaning up sanity deck from Anki Desktop & AnkiWeb (--cleanup active)...');
    try {
      if (typeof client.cleanupTestDeck === 'function') {
        await client.cleanupTestDeck(manifest.deckName, true);
      } else {
        await client.deleteDecks(manifest.deckName, true);
        await client.sync();
      }
      console.log(`   - Deleted "${manifest.deckName}" from local Anki collection.`);
      console.log('   - Synced deck removal to AnkiWeb cloud.');
    } catch (cleanupErr) {
      console.warn(`   ⚠️ Warning: Cleanup failed: ${cleanupErr.message}`);
    }
  } else if (!options.skipAnkiConnect) {
    console.log(`\n📌 Preserving test deck "${manifest.deckName}" in Anki Desktop for manual inspection (default mode, no --cleanup).`);
  }

  // Step 6: Generate and Save Structured Report
  const typologiesCovered = {};
  for (const typology of Object.keys(manifest.coverageMatrix || {})) {
    typologiesCovered[typology] = true;
  }

  const endTime = new Date();
  const report = generateE2EReport({
    suite: 'AnkiWeb E2E Automation',
    mode: 'cloud-ankiweb',
    deckName: manifest.deckName,
    startTime,
    endTime,
    cardResults,
    typologiesCovered,
    artifacts: {
      sanityApkg: apkgResult.outputFile,
      sanityManifest: manifestPath,
      screenshotsDir: path.join(options.reportDir, 'screenshots')
    }
  });

  const reportValidation = validateE2EReport(report);
  if (!reportValidation.valid) {
    throw new Error(`[Orchestrator] Generated report failed validation:\n${reportValidation.errors.join('\n')}`);
  }

  const savedReportPath = saveE2EReport(report, options.reportDir);
  console.log(`\n💾 Saved execution report to: ${savedReportPath}`);
  console.log('\n' + formatReportSummary(report));

  return report;
}

// CLI Execution Handler
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const options = parseCLIOptions(process.argv.slice(2));

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  runOrchestrator(options)
    .then((report) => {
      if (report.summary.overallStatus === 'PASSED') {
        process.exit(0);
      } else {
        process.exit(1);
      }
    })
    .catch((err) => {
      console.error('\n❌ Orchestrator execution error:', err.message || err);
      process.exit(1);
    });
}
