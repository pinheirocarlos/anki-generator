/**
 * AnkiWeb Browser Automation Controller
 *
 * Implements Playwright browser automation for AnkiWeb:
 * - Session state caching & authentication persistence (.auth/ankiweb-session.json)
 * - Navigation to dedicated sanity deck (MAANG_E2E_Sanity)
 * - Front/Back card study progression with guardrails validation
 * - Mobile & desktop viewport emulation and screenshot capture
 *
 * Conforming to Phase 1 Data Model, plan.md, and e2e-report.schema.json.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { chromium } from '@playwright/test';
import { VIEWPORT_PROFILES } from '../../playwright.config.js';
import { runCardGuardrails, assertTouchTargets, assertAccordionInteraction } from './guardrails.js';

// Load environment variables from .env if present
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');

export const DEFAULT_ANKIWEB_URL = 'https://ankiweb.net';
export const DEFAULT_LOGIN_URL = 'https://ankiweb.net/account/login';
export const DEFAULT_DECKS_URL = 'https://ankiweb.net/decks/';
export const DEFAULT_DECK_NAME = 'MAANG_E2E_Sanity';
export const DEFAULT_AUTH_STORAGE_PATH = path.join(ROOT_DIR, '.auth', 'ankiweb-session.json');
export const DEFAULT_SCREENSHOTS_DIR = path.join(ROOT_DIR, 'reports', 'e2e', 'screenshots');

export const DEFAULT_VIEWPORT = VIEWPORT_PROFILES?.['mobile-small'] || Object.freeze({
  name: 'mobile-small',
  width: 360,
  height: 640,
  deviceScaleFactor: 2,
  isMobile: true
});

export const DEFAULT_MOBILE_VIEWPORTS = Object.freeze([
  VIEWPORT_PROFILES?.['mobile-small'] || { name: 'mobile-small', width: 360, height: 640, isMobile: true, deviceScaleFactor: 2 },
  VIEWPORT_PROFILES?.['mobile-standard'] || { name: 'mobile-standard', width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }
]);

/**
 * Retrieves AnkiWeb credentials from environment variables or custom overrides.
 *
 * @param {object} [customCreds={}]
 * @returns {{ user: string, password: string }}
 */
export function getAnkiWebCredentials(customCreds = {}) {
  let user;
  if (customCreds.user !== undefined) {
    user = customCreds.user;
  } else if (customCreds.username !== undefined) {
    user = customCreds.username;
  } else {
    user = process.env.ANKIWEB_USER || process.env.ANKIWEB_USERNAME || '';
  }

  let password;
  if (customCreds.password !== undefined) {
    password = customCreds.password;
  } else {
    password = process.env.ANKIWEB_PASSWORD || '';
  }

  return { user, password };
}

/**
 * Extracts canonical Card ID from the active study page DOM.
 * Scans `.card-id`, `[data-card-id]`, `.card-header`, or text regex `/[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[0-9]+/`.
 *
 * @param {import('@playwright/test').Page} page - Active Playwright page
 * @param {number} [fallbackIndex=1] - Fallback numeric index if ID is not found in DOM
 * @returns {Promise<string>} Canonical card ID (e.g. "DSA-STRUCT-ARRAY-000")
 */
export async function extractCurrentCardId(page, fallbackIndex = 1) {
  try {
    const cardId = await page.evaluate(() => {
      // 1. Try explicit ID element or attribute
      const idEl = document.querySelector('.card-id, [data-card-id], .card-header .id');
      if (idEl) {
        const text = (idEl.getAttribute('data-card-id') || idEl.textContent || '').trim();
        if (text) return text;
      }

      // 2. Scan header or card container for canonical ID pattern
      const container = document.querySelector('#qa, .card, .card-container, body');
      if (container) {
        const text = container.textContent || '';
        const match = text.match(/[A-Z]{2,4}-[A-Z0-9]+-[A-Z0-9]+-[0-9]{3}/);
        if (match) {
          return match[0];
        }
      }

      return null;
    });

    if (cardId) {
      return cardId;
    }
  } catch {
    // If evaluation fails (e.g. page navigating), fallback to indexed ID
  }

  return `SANITY-CARD-${String(fallbackIndex).padStart(3, '0')}`;
}

/**
 * Checks whether the current page is authenticated on AnkiWeb.
 *
 * @param {import('@playwright/test').Page} page - Active Playwright page
 * @returns {Promise<boolean>} True if user is logged in
 */
export async function isLoggedIn(page) {
  try {
    const url = page.url();
    if (url.includes('/account/login')) {
      return false;
    }

    const hasAuthElements = await page.evaluate(() => {
      const logoutLink = document.querySelector('a[href*="/account/logout"], a[href*="logout"]');
      const decksContainer = document.querySelector('#deck-list, .deck-btn, a[href*="/study/"]');
      const studyContainer = document.querySelector('#qa, #quiz-ans, #easebtns');
      return !!(logoutLink || decksContainer || studyContainer);
    });

    return hasAuthElements;
  } catch {
    return false;
  }
}

/**
 * Validates persistent session state by navigating to the decks dashboard.
 *
 * @param {import('@playwright/test').Page} page - Active Playwright page
 * @param {object} [options={}]
 * @param {string} [options.decksUrl=DEFAULT_DECKS_URL]
 * @param {number} [options.timeout=10000]
 * @returns {Promise<{ valid: boolean, url: string }>}
 */
export async function validateSession(page, options = {}) {
  const {
    decksUrl = DEFAULT_DECKS_URL,
    timeout = 10000
  } = options;

  try {
    await page.goto(decksUrl, { waitUntil: 'domcontentloaded', timeout });
    const authenticated = await isLoggedIn(page);
    return {
      valid: authenticated,
      url: page.url()
    };
  } catch (err) {
    return {
      valid: false,
      url: page.url(),
      error: err.message
    };
  }
}

/**
 * Persists active Playwright browser context storage state (cookies & localStorage) to disk.
 *
 * @param {import('@playwright/test').BrowserContext|import('@playwright/test').Page} contextOrPage
 * @param {string} [sessionPath=DEFAULT_AUTH_STORAGE_PATH]
 * @returns {Promise<string|null>} Path to saved session file
 */
export async function saveSessionState(contextOrPage, sessionPath = DEFAULT_AUTH_STORAGE_PATH) {
  if (!contextOrPage || !sessionPath) return null;
  const context = typeof contextOrPage.storageState === 'function'
    ? contextOrPage
    : (typeof contextOrPage.context === 'function' ? contextOrPage.context() : null);

  if (!context) {
    throw new Error('[AnkiWebRunner] Invalid context or page supplied to saveSessionState.');
  }

  const sessionDir = path.dirname(sessionPath);
  if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
  }

  await context.storageState({ path: sessionPath });
  return sessionPath;
}

/**
 * Removes cached session file from disk if present.
 *
 * @param {string} [sessionPath=DEFAULT_AUTH_STORAGE_PATH]
 * @returns {boolean} True if file was deleted
 */
export function clearSessionState(sessionPath = DEFAULT_AUTH_STORAGE_PATH) {
  if (sessionPath && fs.existsSync(sessionPath)) {
    try {
      fs.unlinkSync(sessionPath);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * Checks whether the active session has expired (e.g. redirected to login page or unauthenticated).
 *
 * @param {import('@playwright/test').Page} page - Active Playwright page
 * @returns {Promise<boolean>} True if session is expired or unauthenticated
 */
export async function isSessionExpired(page) {
  if (!page) return true;
  try {
    const url = page.url();
    if (url.includes('/account/login')) {
      return true;
    }
    const loggedIn = await isLoggedIn(page);
    return !loggedIn;
  } catch {
    return true;
  }
}

/**
 * Authenticates against AnkiWeb (https://ankiweb.net/account/login) and persists session state.
 *
 * @param {import('@playwright/test').Page} page - Active Playwright page
 * @param {object} [credentials] - AnkiWeb user and password
 * @param {object} [options={}]
 * @param {string} [options.loginUrl=DEFAULT_LOGIN_URL]
 * @param {string} [options.sessionPath=DEFAULT_AUTH_STORAGE_PATH]
 * @param {boolean} [options.saveSession=true]
 * @param {number} [options.timeout=15000]
 * @returns {Promise<boolean>} True if login succeeded
 */
export async function loginToAnkiWeb(page, credentials = {}, options = {}) {
  const { user, password } = getAnkiWebCredentials(credentials);
  const {
    loginUrl = DEFAULT_LOGIN_URL,
    sessionPath = DEFAULT_AUTH_STORAGE_PATH,
    saveSession = true,
    timeout = 15000
  } = options;

  if (!user || !password) {
    throw new Error(
      '[AnkiWebRunner] AnkiWeb credentials missing. Set ANKIWEB_USER and ANKIWEB_PASSWORD in .env or pass credentials explicitly.'
    );
  }

  await page.goto(loginUrl, { waitUntil: 'domcontentloaded', timeout });

  // Locate username / email field
  const userSelector = 'input[name="username"], input[name="email"], #email, input[type="email"], input[type="text"]';
  await page.waitForSelector(userSelector, { timeout });
  await page.fill(userSelector, user);

  // Locate password field
  const passSelector = 'input[name="password"], #password, input[type="password"]';
  await page.waitForSelector(passSelector, { timeout });
  await page.fill(passSelector, password);

  // Submit login form
  const submitSelector = 'form button[type="submit"], form input[type="submit"], button[type="submit"], input[type="submit"], form button:has-text("Log in"), form button:has-text("Entrar")';
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout }).catch(() => { }),
    page.click(submitSelector)
  ]);

  // Check if still on login page or error alert displayed
  const currentUrl = page.url();
  const hasLoginError = await page.evaluate(() => {
    const errorAlert = document.querySelector('.alert-danger, .alert-error, .error, .alert-warning');
    return errorAlert ? errorAlert.textContent.trim() : null;
  });

  if (hasLoginError || currentUrl.includes('/account/login')) {
    throw new Error(
      `[AnkiWebRunner] AnkiWeb authentication failed: ${hasLoginError || 'Redirected back to login page. Check credentials.'}`
    );
  }

  // Save session state to disk if requested
  if (saveSession && sessionPath) {
    await saveSessionState(page.context(), sessionPath);
  }

  return true;
}

/**
 * Navigates to a specific deck on AnkiWeb and begins the study session.
 *
 * @param {import('@playwright/test').Page} page - Active Playwright page
 * @param {string} [deckName=DEFAULT_DECK_NAME] - Name of deck to study
 * @param {object} [options={}]
 * @param {string} [options.decksUrl=DEFAULT_DECKS_URL]
 * @param {number} [options.timeout=10000]
 * @returns {Promise<boolean>} True if study session entered successfully
 */
export async function navigateToDeck(page, deckName = DEFAULT_DECK_NAME, options = {}) {
  const {
    decksUrl = DEFAULT_DECKS_URL,
    timeout = 10000,
    skipNavigation = false
  } = options;

  const deckSelector = `a:has-text("${deckName}"), button:has-text("${deckName}"), .deck-btn:has-text("${deckName}"), tr:has-text("${deckName}") a, tr:has-text("${deckName}") button, [data-deck="${deckName}"]`;

  // 1. Check if deck element is already present in DOM
  let deckElement = await page.$(deckSelector);

  // 2. If not present and navigation not explicitly skipped, navigate to decks dashboard
  if (!deckElement && !skipNavigation && decksUrl) {
    const currentUrl = page.url();
    if (!currentUrl.includes('/decks')) {
      await page.goto(decksUrl, { waitUntil: 'domcontentloaded', timeout }).catch(() => { });
      deckElement = await page.$(deckSelector);
    }
  }

  if (!deckElement) {
    // Alternative check: maybe user is already on the study page for this deck
    const isAlreadyStudying = await page.evaluate(() => !!document.querySelector('#qa, #quiz-ans, #easebtns'));
    if (isAlreadyStudying) {
      return true;
    }

    throw new Error(
      `[AnkiWebRunner] Deck "${deckName}" was not found on AnkiWeb decks dashboard. Ensure Anki Desktop has imported "${deckName}" and synced to AnkiWeb.`
    );
  }

  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded', timeout }).catch(() => { }),
    deckElement.click()
  ]);

  // Wait for card container or study controls to be ready
  await page.waitForSelector('#qa, .card, #quiz-ans, #study-box', { timeout }).catch(() => { });

  return true;
}

/**
 * Clicks the "Show Answer" button to reveal the back of the card.
 *
 * @param {import('@playwright/test').Page} page - Active Playwright page
 * @param {object} [options={}]
 * @param {number} [options.timeout=5000]
 * @returns {Promise<boolean>}
 */
export async function showCardAnswer(page, options = {}) {
  const { timeout = 5000 } = options;

  const showAnswerSelector = '#quiz-ans, button#show_ans, input#quiz-ans, button:has-text("Show Answer"), button:has-text("Mostrar Resposta"), #easebtn, button.btn-primary';

  const showBtn = await page.$(showAnswerSelector);
  if (showBtn) {
    await showBtn.click();
  } else {
    // Fallback: press Space key
    await page.keyboard.press('Space');
  }

  // Wait for ease answer buttons to become visible
  await page.waitForSelector('#easebtns, button#ease1, button#ease2, button#ease3, button#ease4, button:has-text("Good"), button:has-text("Bom")', { timeout }).catch(() => { });

  return true;
}

/**
 * Selects an answer rating (Again, Hard, Good, Easy) to advance to the next card.
 *
 * @param {import('@playwright/test').Page} page - Active Playwright page
 * @param {"good"|"again"|"hard"|"easy"|number} [rating="good"] - Answer ease rating
 * @param {object} [options={}]
 * @param {number} [options.timeout=5000]
 * @returns {Promise<boolean>}
 */
export async function answerCurrentCard(page, rating = 'good', options = {}) {
  const { timeout = 5000 } = options;

  let selector;
  if (rating === 'again' || rating === 1) {
    selector = 'button#ease1, button[data-ease="1"], #ease1, button:has-text("Again"), button:has-text("Errei")';
  } else if (rating === 'hard' || rating === 2) {
    selector = 'button#ease2, button[data-ease="2"], #ease2, button:has-text("Hard"), button:has-text("Difícil")';
  } else if (rating === 'easy' || rating === 4) {
    selector = 'button#ease4, button[data-ease="4"], #ease4, button:has-text("Easy"), button:has-text("Fácil")';
  } else {
    // Default: 'good' / 3
    selector = 'button#ease3, button[data-ease="3"], #ease3, button:has-text("Good"), button:has-text("Bom")';
  }

  const btn = await page.$(selector);
  if (btn) {
    await btn.click();
  } else {
    // Fallback: press key '3' or Space
    await page.keyboard.press('3');
  }

  // Wait for next card front or study finished message
  await page.waitForTimeout(300);
  return true;
}

/**
 * Checks if the deck study session has concluded.
 *
 * @param {import('@playwright/test').Page} page - Active Playwright page
 * @returns {Promise<boolean>} True if deck is completed
 */
export async function isDeckFinished(page) {
  try {
    return await page.evaluate(() => {
      const text = document.body ? document.body.textContent || '' : '';
      const finishedIndicators = [
        'Congratulations! You have finished this deck for now.',
        'Deck finished',
        'Você concluiu este baralho por enquanto',
        'No cards are due',
        'No cards left',
        'quiz-finished'
      ];

      if (finishedIndicators.some(ind => text.includes(ind))) {
        return true;
      }

      const finishedEl = document.querySelector('#quiz-finished, .alert-info, .deck-finished');
      if (finishedEl && finishedEl.textContent.toLowerCase().includes('finish')) {
        return true;
      }

      // Check if study containers are missing and we are back on decks page
      const hasStudyControls = document.querySelector('#qa, #quiz-ans, #easebtns');
      return !hasStudyControls;
    });
  } catch {
    return false;
  }
}

/**
 * Runs a complete study progression loop over the deck on AnkiWeb,
 * executing visual layout and DOM guardrails on each card's Front and Back.
 *
 * @param {import('@playwright/test').Page} page - Active Playwright page
 * @param {object} [options={}]
 * @param {string} [options.deckName=DEFAULT_DECK_NAME]
 * @param {object} [options.viewport=DEFAULT_VIEWPORT]
 * @param {number} [options.maxCards=50]
 * @param {string} [options.screenshotDir]
 * @param {boolean} [options.captureScreenshots=false]
 * @param {object} [options.guardrailOptions={}]
 * @returns {Promise<{
 *   cardResults: Array<object>,
 *   totalCardsStudied: number,
 *   completed: boolean
 * }>}
 */
export async function runStudySession(page, options = {}) {
  const {
    deckName = DEFAULT_DECK_NAME,
    viewport = DEFAULT_VIEWPORT,
    maxCards = 50,
    screenshotDir,
    captureScreenshots = !!screenshotDir,
    guardrailOptions = {}
  } = options;

  await navigateToDeck(page, deckName, options);

  const cardResults = [];
  let cardIndex = 0;

  if (screenshotDir && !fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  while (cardIndex < maxCards) {
    if (await isDeckFinished(page)) {
      break;
    }

    cardIndex++;
    const cardId = await extractCurrentCardId(page, cardIndex);

    // =========================================================================
    // 1. FRONT EVALUATION
    // =========================================================================
    let frontScreenshotPath;
    if (captureScreenshots && screenshotDir) {
      frontScreenshotPath = path.join(screenshotDir, `${cardId}-front-${viewport.name || viewport.width}.png`);
      try {
        await page.screenshot({ path: frontScreenshotPath, fullPage: false });
      } catch {
        frontScreenshotPath = undefined;
      }
    }

    const frontResult = await runCardGuardrails(page, {
      cardId,
      side: 'front',
      viewport,
      options: guardrailOptions,
      screenshotPath: frontScreenshotPath
    });
    cardResults.push(frontResult);

    // =========================================================================
    // 2. FLIP CARD ("Show Answer")
    // =========================================================================
    await showCardAnswer(page, options);
    await page.waitForTimeout(200);

    // =========================================================================
    // 3. BACK EVALUATION
    // =========================================================================
    let backScreenshotPath;
    if (captureScreenshots && screenshotDir) {
      backScreenshotPath = path.join(screenshotDir, `${cardId}-back-${viewport.name || viewport.width}.png`);
      try {
        await page.screenshot({ path: backScreenshotPath, fullPage: false });
      } catch {
        backScreenshotPath = undefined;
      }
    }

    const backResult = await runCardGuardrails(page, {
      cardId,
      side: 'back',
      viewport,
      options: {
        testAccordion: true,
        ...guardrailOptions
      },
      screenshotPath: backScreenshotPath
    });
    cardResults.push(backResult);

    // =========================================================================
    // 4. ADVANCE TO NEXT CARD
    // =========================================================================
    await answerCurrentCard(page, 'good', options);
  }

  return {
    cardResults,
    totalCardsStudied: cardIndex,
    completed: true
  };
}

/**
 * Verifies that all accordion <details><summary> elements on the page satisfy
 * touch target geometry (>= 44px) and toggle smoothly without layout overflow.
 *
 * @param {import('@playwright/test').Page} page - Active Playwright page
 * @param {object} [options={}]
 * @returns {Promise<{
 *   touchResult: object,
 *   accordionResult: object,
 *   passed: boolean,
 *   errors: string[]
 * }>}
 */
export async function verifyTouchTargetsAndAccordions(page, options = {}) {
  const touchResult = await assertTouchTargets(page, options);
  let accordionResult = { accordionCount: 0, toggledSuccessfully: true, passed: true, errors: [] };

  if (touchResult.summaryCount > 0) {
    accordionResult = await assertAccordionInteraction(page, options);
  }

  const allErrors = [...touchResult.errors, ...accordionResult.errors];
  return {
    touchResult,
    accordionResult,
    passed: allErrors.length === 0,
    errors: allErrors
  };
}

/**
 * High-level AnkiWeb Runner Controller Class.
 * Manages browser lifecycle, session persistence, authentication, and test execution.
 */
export class AnkiWebRunner {
  /**
   * @param {object} [options={}]
   * @param {object} [options.credentials]
   * @param {string} [options.authStoragePath=DEFAULT_AUTH_STORAGE_PATH]
   * @param {object} [options.viewport=DEFAULT_VIEWPORT]
   * @param {boolean} [options.headed=false]
   * @param {number} [options.timeout=30000]
   */
  constructor(options = {}) {
    this.options = {
      credentials: options.credentials || getAnkiWebCredentials(),
      authStoragePath: options.authStoragePath || DEFAULT_AUTH_STORAGE_PATH,
      viewport: options.viewport || DEFAULT_VIEWPORT,
      headed: !!options.headed,
      timeout: options.timeout || 30000,
      ...options
    };

    this.browser = null;
    this.context = null;
    this.page = null;
  }

  /**
   * Launches Playwright browser and initializes context with storageState if available.
   *
   * @returns {Promise<import('@playwright/test').Page>}
   */
  async launch() {
    this.browser = await chromium.launch({
      headless: !this.options.headed
    });

    const contextOptions = {
      viewport: {
        width: this.options.viewport.width || 360,
        height: this.options.viewport.height || 640
      },
      deviceScaleFactor: this.options.viewport.deviceScaleFactor || 2,
      isMobile: this.options.viewport.isMobile !== undefined ? this.options.viewport.isMobile : true,
      hasTouch: this.options.viewport.isMobile !== undefined ? this.options.viewport.isMobile : true
    };

    if (this.options.authStoragePath && fs.existsSync(this.options.authStoragePath)) {
      try {
        const fileContent = fs.readFileSync(this.options.authStoragePath, 'utf8');
        const parsed = JSON.parse(fileContent);
        if (parsed && (Array.isArray(parsed.cookies) || Array.isArray(parsed.origins))) {
          contextOptions.storageState = this.options.authStoragePath;
        } else {
          console.warn(`⚠️ Warning: Storage state at ${this.options.authStoragePath} is malformed. Proceeding with clean context.`);
        }
      } catch (err) {
        console.warn(`⚠️ Warning: Failed to read storage state from ${this.options.authStoragePath}: ${err.message}. Proceeding with clean context.`);
      }
    }

    this.context = await this.browser.newContext(contextOptions);
    this.page = await this.context.newPage();
    this.page.setDefaultTimeout(this.options.timeout);

    return this.page;
  }

  /**
   * Clears the cached session storage file on disk.
   *
   * @returns {boolean} True if session file was deleted
   */
  clearSession() {
    return clearSessionState(this.options.authStoragePath);
  }

  /**
   * Ensures browser is authenticated on AnkiWeb, reusing cached session or performing login with automatic expiration renewal.
   *
   * @returns {Promise<boolean>}
   */
  async authenticate() {
    if (!this.page) {
      await this.launch();
    }

    // Step 1: Check if existing session is valid
    const sessionCheck = await validateSession(this.page, {
      decksUrl: DEFAULT_DECKS_URL,
      timeout: Math.min(10000, this.options.timeout)
    });

    if (sessionCheck.valid) {
      return true;
    }

    // Step 2: Session invalid or expired -> perform re-authentication & refresh cached storageState
    if (this.options.authStoragePath && fs.existsSync(this.options.authStoragePath)) {
      console.log('🔄 Cached AnkiWeb session expired. Re-authenticating and refreshing session cache...');
    }

    await loginToAnkiWeb(this.page, this.options.credentials, {
      sessionPath: this.options.authStoragePath,
      saveSession: true,
      timeout: this.options.timeout
    });

    return true;
  }

  /**
   * Dynamically changes the active viewport on the page and runner instance.
   *
   * @param {object} viewport - ViewportProfile object (e.g. { name: 'mobile-standard', width: 390, height: 844 })
   * @returns {Promise<void>}
   */
  async setViewport(viewport) {
    if (!viewport || !viewport.width || !viewport.height) {
      throw new Error('[AnkiWebRunner] Invalid viewport configuration supplied.');
    }
    this.options.viewport = viewport;
    if (this.page) {
      await this.page.setViewportSize({
        width: viewport.width,
        height: viewport.height
      });
    }
  }

  /**
   * Runs the automated study session on AnkiWeb.
   *
   * @param {object} [studyOptions={}]
   * @returns {Promise<{ cardResults: Array<object>, totalCardsStudied: number, completed: boolean }>}
   */
  async runStudySession(studyOptions = {}) {
    await this.authenticate();

    const targetViewport = studyOptions.viewport || this.options.viewport;
    if (studyOptions.viewport) {
      await this.setViewport(studyOptions.viewport);
    }

    const screenshotDir = studyOptions.screenshotDir || (studyOptions.captureScreenshots ? DEFAULT_SCREENSHOTS_DIR : undefined);

    return await runStudySession(this.page, {
      deckName: studyOptions.deckName || DEFAULT_DECK_NAME,
      viewport: targetViewport,
      maxCards: studyOptions.maxCards || 50,
      screenshotDir,
      captureScreenshots: studyOptions.captureScreenshots !== undefined ? studyOptions.captureScreenshots : !!screenshotDir,
      guardrailOptions: studyOptions.guardrailOptions || {}
    });
  }

  /**
   * Executes study and layout guardrails across multiple mobile and desktop viewports,
   * collecting evidence screenshots for each card Front & Back per viewport.
   *
   * @param {object} [options={}]
   * @param {Array<object>} [options.viewports=DEFAULT_MOBILE_VIEWPORTS]
   * @param {string} [options.deckName=DEFAULT_DECK_NAME]
   * @param {string} [options.screenshotDir=DEFAULT_SCREENSHOTS_DIR]
   * @param {boolean} [options.captureScreenshots=true]
   * @param {number} [options.maxCards=50]
   * @param {object} [options.guardrailOptions={}]
   * @returns {Promise<{
   *   viewportResults: Record<string, object>,
   *   allCardResults: Array<object>,
   *   totalCardsStudied: number,
   *   passed: boolean
   * }>}
   */
  async runMultiViewportStudySession(options = {}) {
    await this.authenticate();

    const viewports = options.viewports || DEFAULT_MOBILE_VIEWPORTS;
    const screenshotDir = options.screenshotDir || (options.captureScreenshots !== false ? DEFAULT_SCREENSHOTS_DIR : undefined);
    const viewportResults = {};
    const allCardResults = [];
    let totalCardsStudied = 0;
    let allPassed = true;

    for (const vp of viewports) {
      await this.setViewport(vp);

      const sessionResult = await runStudySession(this.page, {
        deckName: options.deckName || DEFAULT_DECK_NAME,
        viewport: vp,
        maxCards: options.maxCards || 50,
        screenshotDir,
        captureScreenshots: options.captureScreenshots !== false,
        guardrailOptions: options.guardrailOptions || {}
      });

      viewportResults[vp.name || `${vp.width}x${vp.height}`] = sessionResult;
      allCardResults.push(...sessionResult.cardResults);
      totalCardsStudied = Math.max(totalCardsStudied, sessionResult.totalCardsStudied);

      const hasFailures = sessionResult.cardResults.some(r => !r.passed);
      if (hasFailures) {
        allPassed = false;
      }
    }

    return {
      viewportResults,
      allCardResults,
      totalCardsStudied,
      passed: allPassed
    };
  }

  /**
   * Verifies touch targets and accordion interactions on the current active page.
   *
   * @param {object} [options={}]
   * @returns {Promise<{ touchResult: object, accordionResult: object, passed: boolean, errors: string[] }>}
   */
  async verifyTouchTargetsAndAccordions(options = {}) {
    if (!this.page) {
      throw new Error('[AnkiWebRunner] Cannot verify accordions: browser page is not initialized.');
    }
    return await verifyTouchTargetsAndAccordions(this.page, options);
  }

  /**
   * Closes page, context, and browser instances.
   */
  async close() {
    if (this.page) {
      await this.page.close().catch(() => { });
      this.page = null;
    }
    if (this.context) {
      await this.context.close().catch(() => { });
      this.context = null;
    }
    if (this.browser) {
      await this.browser.close().catch(() => { });
      this.browser = null;
    }
  }
}
