import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUTH_STORAGE_PATH = path.join(__dirname, '.auth', 'ankiweb-session.json');

/**
 * Standardized Viewport Profiles conforming to Phase 1 Data Model
 */
export const VIEWPORT_PROFILES = {
  'mobile-small': {
    name: 'mobile-small',
    width: 360,
    height: 640,
    deviceScaleFactor: 1,
    isMobile: true
  },
  'mobile-standard': {
    name: 'mobile-standard',
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    isMobile: true
  },
  'desktop-hd': {
    name: 'desktop-hd',
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
    isMobile: false
  }
};

const TEMP_OUTPUT_DIR = process.env.TEMP
  ? path.join(process.env.TEMP, 'anki-playwright-results')
  : path.join(__dirname, 'reports', 'e2e', 'test-results');

export default defineConfig({
  testDir: './test/e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.02,
      threshold: 0.2
    }
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['json', { outputFile: 'reports/e2e/playwright-report.json' }]
  ],
  outputDir: TEMP_OUTPUT_DIR,
  snapshotPathTemplate: '{testDir}/baselines/{projectName}/{arg}{ext}',
  use: {
    baseURL: 'https://ankiweb.net',
    trace: 'off',
    screenshot: 'only-on-failure',
    video: 'off',
    storageState: fs.existsSync(AUTH_STORAGE_PATH) ? AUTH_STORAGE_PATH : undefined
  },
  projects: [
    {
      name: 'mobile-small',
      use: {
        viewport: {
          width: VIEWPORT_PROFILES['mobile-small'].width,
          height: VIEWPORT_PROFILES['mobile-small'].height
        },
        deviceScaleFactor: VIEWPORT_PROFILES['mobile-small'].deviceScaleFactor,
        isMobile: VIEWPORT_PROFILES['mobile-small'].isMobile,
        hasTouch: true
      }
    },
    {
      name: 'mobile-standard',
      use: {
        viewport: {
          width: VIEWPORT_PROFILES['mobile-standard'].width,
          height: VIEWPORT_PROFILES['mobile-standard'].height
        },
        deviceScaleFactor: VIEWPORT_PROFILES['mobile-standard'].deviceScaleFactor,
        isMobile: VIEWPORT_PROFILES['mobile-standard'].isMobile,
        hasTouch: true
      }
    },
    {
      name: 'desktop-hd',
      use: {
        viewport: {
          width: VIEWPORT_PROFILES['desktop-hd'].width,
          height: VIEWPORT_PROFILES['desktop-hd'].height
        },
        deviceScaleFactor: VIEWPORT_PROFILES['desktop-hd'].deviceScaleFactor,
        isMobile: VIEWPORT_PROFILES['desktop-hd'].isMobile,
        hasTouch: false
      }
    }
  ]
});
