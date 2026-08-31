/**
 * Golden Baseline Screenshot Generator
 *
 * Generates reference visual screenshots for all sampled sanity deck cards
 * across configured viewports (mobile-small, mobile-standard, desktop-hd).
 * Saves PNG snapshots to `test/e2e/baselines/{projectName}/{cardId}-{side}.png`
 * conforming to `playwright.config.js` snapshotPathTemplate.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';
import { sampleSanityDeck } from './sanity-sampler.js';
import { renderCard } from '../generator.js';
import { VIEWPORT_PROFILES } from '../../playwright.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const BASELINES_DIR = path.join(ROOT_DIR, 'test', 'e2e', 'baselines');

/**
 * Generates golden baselines for all sampled cards across all viewport profiles.
 *
 * @param {object} [options]
 * @param {string} [options.outDir=BASELINES_DIR]
 * @param {boolean} [options.silent=false]
 * @returns {Promise<{ totalScreenshots: number, baselinesDir: string }>}
 */
export async function generateGoldenBaselines(options = {}) {
  const {
    outDir = BASELINES_DIR,
    silent = false
  } = options;

  const log = (...args) => {
    if (!silent) console.log(...args);
  };

  const { sampledCards } = sampleSanityDeck();
  log(`📸 Generating golden baseline screenshots for ${sampledCards.length} cards...`);

  const browser = await chromium.launch({ headless: true });
  let count = 0;

  try {
    for (const [projectName, profile] of Object.entries(VIEWPORT_PROFILES)) {
      const projectDir = path.join(outDir, projectName);
      if (fs.existsSync(projectDir)) {
        const existing = fs.readdirSync(projectDir);
        for (const file of existing) {
          if (file.endsWith('.png')) {
            fs.unlinkSync(path.join(projectDir, file));
          }
        }
      } else {
        fs.mkdirSync(projectDir, { recursive: true });
      }

      log(`  📱 Viewport: [${projectName}] (${profile.width}x${profile.height})`);
      const page = await browser.newPage({
        viewport: { width: profile.width, height: profile.height },
        deviceScaleFactor: profile.deviceScaleFactor || 1,
        hasTouch: profile.isMobile
      });

      for (const card of sampledCards) {
        const rendered = renderCard(card.filePath, { resolveLocalMedia: true });

        // 1. Front Snapshot
        await page.setContent(rendered.frontDocument, { waitUntil: 'domcontentloaded' });
        const frontContainer = page.locator('.card-container');
        const frontPath = path.join(projectDir, `${card.id}-front.png`);
        await frontContainer.screenshot({ path: frontPath });
        count++;

        // 2. Back Snapshot
        await page.setContent(rendered.backDocument, { waitUntil: 'domcontentloaded' });
        const backContainer = page.locator('.card-container');
        const backPath = path.join(projectDir, `${card.id}-back.png`);
        await backContainer.screenshot({ path: backPath });
        count++;
      }

      await page.close();
    }

    log(`✅ Successfully generated ${count} golden baseline screenshots in ${outDir}\n`);
    return { totalScreenshots: count, baselinesDir: outDir };
  } finally {
    await browser.close();
  }
}

// Direct CLI Execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateGoldenBaselines()
    .then(({ totalScreenshots, baselinesDir }) => {
      console.log(`Generated ${totalScreenshots} baselines at ${baselinesDir}`);
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Failed to generate baselines:', err);
      process.exit(1);
    });
}
