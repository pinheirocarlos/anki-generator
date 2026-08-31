# Phase 0 Research: AnkiWeb E2E Automation & Visual Layout Guardrails

**Feature Branch**: `004-ankiweb-e2e-automation`  
**Date**: 2026-08-30  
**Status**: Completed  

---

## 1. Overview & Objectives

This document establishes the architectural, technical, and implementation decisions for the automated End-to-End (E2E) testing suite and visual guardrail engine (`004-ankiweb-e2e-automation`).

The goal is to eliminate manual verification and Shift-Right regression defects by creating an automated pipeline that:
1. **Samples dynamic representative cards** across all pedagogical and visual typologies.
2. **Compiles an isolated sanity deck** (`MAANG_E2E_Sanity.apkg`).
3. **Communicates with local Anki Desktop** via Anki-Connect to import the deck and trigger cloud synchronization.
4. **Automates browser testing on AnkiWeb** (`https://ankiweb.net/`) using Playwright with persistent session authentication.
5. **Enforces strict visual and layout guardrails** (0% horizontal scroll in 360px viewports, $\ge 44$px touch targets, zero KaTeX error classes, Dark Modern code tokenization, video playback attributes, and visual snapshot regression testing).
6. **Provides a fast local component runner** executing full DOM and CSS validation in under 3 seconds without external dependencies.

---

## 2. Research Decisions & Rationales

### 2.1 E2E Browser Automation Engine: Playwright

- **Decision**: Adopt `@playwright/test` (v1.45+) as the primary test runner and browser automation engine, supported by a programmatic orchestrator (`src/e2e/orchestrator.js`) for end-to-end workflow sequencing.
- **Rationale**:
  - **Native Multi-Viewport & Mobile Emulation**: First-class support for defining mobile viewports (`360x640`, `390x844`) and desktop viewports (`1280x720`).
  - **Built-in Visual Snapshot Diffing**: `expect(locator).toHaveScreenshot()` provides robust pixel-level diffing with configurable `maxDiffPixelRatio` and automatic snapshot directory management.
  - **Storage State Persistence**: Native `storageState` configuration allows saving and restoring cookies and local storage (`.auth/ankiweb-session.json`), minimizing login requests and preventing AnkiWeb rate-limits.
  - **Fast Headless Execution**: Headless Chromium execution delivers sub-second page rendering for the local runner.
- **Alternatives Considered**:
  - *Puppeteer*: Viable, but lacks built-in snapshot assertions, multi-browser matrix, and integrated test runner fixtures without external plugins.
  - *Cypress*: Slower startup, complex multi-origin tab handling, less suited for CLI-driven non-web projects.
  - *Selenium WebDriver*: Outdated architecture, high latency, cumbersome configuration.

---

### 2.2 Anki Desktop Integration Protocol: Anki-Connect JSON-RPC

- **Decision**: Implement a native Node.js HTTP client (`src/utils/anki-connect.js`) communicating with Anki-Connect on `http://127.0.0.1:8765` using standard JSON-RPC 2.0.
- **Actions Required**:
  1. `version`: Health check / ping. Returns the API version (e.g. `6`).
  2. `importPackage`: Imports the absolute path to `MAANG_E2E_Sanity.apkg`.
  3. `sync`: Triggers synchronization with AnkiWeb.
  4. `deleteDecks`: Deletes `["MAANG_E2E_Sanity"]` with `cardsToo: true` when `--cleanup` is requested.
  5. `getDeckNames`: Verifies deck presence in the collection.
- **Fail-Fast Diagnostic Policy**:
  - If `fetch('http://127.0.0.1:8765')` throws `ECONNREFUSED`, immediately abort with clear instructions:
    1. Confirm Anki Desktop is running on Windows.
    2. Confirm Anki-Connect add-on (code `2055492159`) is installed.
    3. Verify port `8765` is accessible.
- **Rationale**: Anki-Connect is the universal standard for programmatically manipulating Anki collections. Using native `fetch` requires zero additional npm packages.
- **Alternatives Considered**:
  - *Direct SQLite manipulation on `collection.anki2`*: High risk of file lock conflicts with the running Anki process, database corruption, and inability to trigger cloud synchronization.

---

### 2.3 Dynamic Representative Card Sampler

- **Decision**: Create `src/e2e/sanity-sampler.js` to dynamically scan `decks/` across all phases and select 1 representative card for each required typology.
- **Target Typologies**:
  1. **L2 Fundamental Card**: `level::l2-fundamental` with real-world intuition/analogy.
  2. **L3 Junior Card**: `level::l3-junior` with algorithmic mechanics and $O(1)/O(N)$ badges.
  3. **L4 Pleno Code Card**: `level::l4-pleno` with Dark Modern syntax-highlighted Go and Java snippets.
  4. **Micro-Video Card**: Contains `<video>` with mobile autoplay/loop attributes.
  5. **SVG Card**: Contains responsive `<svg>` with `viewBox`.
  6. **Table Card**: Contains comparative table ($\le 3$ columns).
  7. **KaTeX Math Card**: Contains inline `$math$` or block `$$math$$` expressions.
  8. **Accordion Card**: Contains `<details><summary>Deep Dive & Walkthrough</summary>`.
- **Sampling Strategy**:
  - The sampler iterates through all Markdown files in `decks/`, scores each file by the criteria it satisfies, and generates a minimal distinct subset (typically 6 to 8 cards) covering 100% of typologies.
  - The subset is compiled into `MAANG_E2E_Sanity.apkg` using the core `buildDecks({ files, deckName: 'MAANG_E2E_Sanity' })` generator.
- **Rationale**: Dynamic sampling guarantees that tests run on real production cards without maintaining a fragile, duplicate set of synthetic test cards.
- **Alternatives Considered**:
  - *Static hardcoded mock cards*: Tends to drift from real card structures and misses real-world edge cases.

---

### 2.4 AnkiWeb Authentication & Session Persistence

- **Decision**: Authenticate via Playwright against `https://ankiweb.net/account/login` using credentials from `.env` (`ANKIWEB_USER`, `ANKIWEB_PASSWORD`) and persist session cookies into `.auth/ankiweb-session.json`.
- **Session Validation Workflow**:
  1. If `.auth/ankiweb-session.json` exists:
     - Launch browser context with `storageState: '.auth/ankiweb-session.json'`.
     - Navigate to `https://ankiweb.net/decks/`.
     - Check if user is logged in (presence of `#deck-list` or user account menu).
     - If valid: reuse session immediately.
  2. If session is missing or expired:
     - Navigate to `https://ankiweb.net/account/login`.
     - Fill credentials and submit.
     - Wait for navigation to `https://ankiweb.net/decks/`.
     - Save `context.storageState({ path: '.auth/ankiweb-session.json' })`.
- **Security & Privacy**:
  - `.auth/` and `.env` are strictly blocked in `.gitignore`.
  - Provide `.env.example` in repo root.
- **Rationale**: Session reuse reduces login requests from $N$ to 1, preventing AnkiWeb bot detection and CAPTCHA challenges.

---

### 2.5 Visual Guardrails & Assertion Mechanics

- **Decision**: Implement a two-tier assertion strategy combining DOM/CSS structural checks with visual snapshot diffing.
- **Assertion Rules**:
  1. **Horizontal Scroll Guardrail (SC-001)**:
     ```js
     const hasHorizontalOverflow = await page.evaluate(() => {
       return document.documentElement.scrollWidth > window.innerWidth ||
              document.body.scrollWidth > window.innerWidth;
     });
     expect(hasHorizontalOverflow).toBe(false);
     ```
  2. **Touch-Target Height Guardrail (SC-003)**:
     ```js
     const summaryBox = await page.locator('details summary').boundingBox();
     expect(summaryBox.height).toBeGreaterThanOrEqual(44);
     ```
  3. **KaTeX Error Class Guardrail (SC-002)**:
     ```js
     const errorElements = await page.locator('.katex-error').count();
     expect(errorElements).toBe(0);
     ```
  4. **Micro-Video Mobile Flags Guardrail (Principle I)**:
     ```js
     const video = page.locator('video').first();
     if (await video.count() > 0) {
       await expect(video).toHaveAttribute('autoplay', '');
       await expect(video).toHaveAttribute('loop', '');
       await expect(video).toHaveAttribute('muted', '');
       await expect(video).toHaveAttribute('playsinline', '');
     }
     ```
  5. **Dark Modern Code Highlight Tokens Guardrail (Principle III)**:
     ```js
     const tokens = await page.locator('pre code span[class*="hljs-"]').count();
     expect(tokens).toBeGreaterThan(0);
     ```
  6. **Visual Snapshot Diffing (SC-006)**:
     ```js
     await expect(page.locator('.card-container')).toHaveScreenshot({
       maxDiffPixelRatio: 0.02,
       threshold: 0.2
     });
     ```

---

### 2.6 Fast Local Component Runner (< 3 seconds)

- **Decision**: Provide `src/e2e/local-runner.js` (`npm run test:e2e:local`) that operates entirely in memory using Playwright headless without network, Anki Desktop, or AnkiWeb calls.
- **Execution Flow**:
  1. Sample the representative cards via `sanity-sampler.js`.
  2. Render the full HTML (CSS + KaTeX + Highlight.js + Tags + Body) using `generator.js` rendering logic.
  3. Load HTML into Playwright headless page via `page.setContent(html)`.
  4. Run the complete DOM layout guardrail assertions (overflow at 360px, touch target $\ge 44$px, KaTeX errors, video attributes, code tokens).
  5. Complete execution across all sample cards in $< 3$ seconds.
- **Rationale**: Gives developers instant, offline feedback on CSS or card changes during active development before running full cloud synchronization.

---

## 3. Technology Stack & Dependencies

| Component | Technology / Library | Version | Role |
|---|---|---|---|
| E2E Framework | `@playwright/test` | `^1.45.0` | Browser automation, visual snapshots, mobile viewports |
| Browser Engine | Chromium Headless | Bundled with Playwright | DOM rendering & snapshot capture |
| Desktop RPC | Native `fetch` (Node.js v18+) | Built-in | Anki-Connect JSON-RPC client |
| Env Management | `dotenv` | `^16.4.5` | Loading `.env` credentials securely |
| Packaging Engine | `generator.js` (existing) | Project root | Compiling `.apkg` sanity deck |
| Assertion Lib | Playwright `expect` | Bundled | DOM, geometry, and visual diff assertions |

---

## 4. Summary of Decisions

- **Architecture**: Decoupled orchestrator pattern separating sampling, Anki-Connect integration, Playwright execution, and reporting.
- **Security**: Strict credential isolation via `.env` and `.auth/` blocked in `.gitignore`.
- **Reliability**: Fail-fast diagnostics for Anki Desktop; session caching for AnkiWeb.
- **Performance**: Instant local runner (<3s) for dev iteration; full E2E cloud runner (<30s) for pre-release verification.
