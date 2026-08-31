# Implementation Plan: AnkiWeb E2E Automation & Visual Layout Guardrails

**Branch**: `004-ankiweb-e2e-automation` | **Date**: 2026-08-30 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/004-ankiweb-e2e-automation/spec.md` and Constitution v1.4.0

---

## Summary

This feature delivers an automated End-to-End (E2E) verification suite and visual guardrail system to eliminate regression defects and manual inspection across flashcard releases:
1. **Dynamic Representative Card Sampler (`src/e2e/sanity-sampler.js`)**: Automatically scans the 550+ cards across all phases to select 1 representative card for each required typology (L2 Fundamental, L3 Junior, L4 Pleno Code, Micro-Videos, SVGs, Tables, KaTeX, and Accordions), producing an isolated test deck package (`MAANG_E2E_Sanity.apkg`).
2. **Anki-Connect Desktop Client (`src/utils/anki-connect.js`)**: Integrates with local Anki Desktop on `http://127.0.0.1:8765` to import the sanity package, trigger cloud synchronization with AnkiWeb, and provide clean teardown when `--cleanup` is flagged, featuring immediate fail-fast diagnostics.
3. **Playwright AnkiWeb Automation Suite (`src/e2e/ankiweb-runner.js`)**: Automates browser study on `https://ankiweb.net/` with persistent session caching (`.auth/ankiweb-session.json`), mobile viewport emulation (`360x640`, `390x844`), and visual snapshot comparison against golden baselines.
4. **Visual Layout & DOM Guardrails**: Programmatically verifies 0% horizontal overflow (`scrollWidth === clientWidth`), $\ge 44$px touch targets on `<details><summary>`, Dark Modern syntax tokens, zero `.katex-error` classes, and valid `<video>` playback flags.
5. **Fast Local Component Runner (`src/e2e/local-runner.js`)**: In-memory headless runner validating DOM and CSS layout in $< 3$ seconds without network or desktop dependencies (`npm run test:e2e:local`).
6. **Security & Artifact Isolation**: Zero credential leakage with `.env.example`, `.env`, `.auth/`, and temporary reports ignored by Git.

---

## Technical Context

**Language/Version**: Node.js v18+ (ECMAScript Modules `type: module`)  
**Primary Dependencies**: `@playwright/test` (^1.45.0), `dotenv` (^16.4.5), `anki-apkg-export` (^4.0.3), `gray-matter` (^4.0.3), `marked` (^18.0.9), `highlight.js` (^11.12.0), `katex` (^0.18.4), `sql.js` (^1.14.2)  
**Storage**: Local `.auth/ankiweb-session.json` (gitignored), `.env` (gitignored), JSON manifests/reports (`reports/e2e/e2e-report.json`), SQLite inside `.apkg` packages  
**Testing**: Fast Local Headless Runner (`npm run test:e2e:local`) + Full Cloud AnkiWeb E2E Runner (`npm run test:e2e`) + Unit/Card schema tests (`npm test`)  
**Target Platform**: Playwright Chromium (Mobile WebViews `360x640`, `390x844`, Desktop `1280x720`) on AnkiWeb (`https://ankiweb.net/`) and Anki Desktop (Windows/macOS/Linux)  
**Project Type**: Browser Automation Suite / Quality Engineering & Visual Layout Guardrail Engine  
**Performance Goals**: Local runner $< 3$ seconds; Cloud E2E suite $< 30$ seconds; 0% horizontal scroll in 360px viewport  
**Constraints**: Zero credential leakage; non-destructive to user's main 550-card study history; fail-fast on missing Anki Desktop / Anki-Connect; reusable session to prevent rate-limiting  

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Requirement | Status | Verification |
|---|---|---|---|
| **I. Dual Coding & Micro-Videos** | Dynamic concepts receive looping micro-videos (`<video autoplay loop muted playsinline>`); static structures receive responsive SVGs or tables $\le 3$ cols. | ✅ PASS | Guardrails verify all mandatory video attributes and container wrappers in both local and cloud runners. |
| **II. Progressive Disclosure & Atomicity** | Immediate `Quick Answer` (<15s reading), single question per card (<30s evaluation), `<details><summary>` deep dive ($\ge 44$px touch area). | ✅ PASS | DOM geometry assertions explicitly verify summary element height $\ge 44$px and smooth accordion toggle. |
| **III. Strategic Bilingualism & Syntax Highlighting** | PT-BR explanation, English technical terms, Go/Java snippets with static `highlight.js` tokenization and zero horizontal scroll. | ✅ PASS | E2E runner asserts `scrollWidth === clientWidth` at 360px and validates syntax token presence. |
| **IV. Strict Tag Hierarchy & Flat Deck** | Flat deck in Anki; strict tags (`level::*`, `topic::*`, `company::*`, `freq::*`); canonical IDs. | ✅ PASS | Dynamic sampler extracts cards with canonical tags and compiles into flat `MAANG_E2E_Sanity` deck. |
| **V. Static-Engine & Online-Enhanced Media** | 100% static CSS, KaTeX, and Highlight.js; valid public HTTPS media without placeholder domains. | ✅ PASS | E2E assertions verify zero `.katex-error` elements and successful remote video asset streaming. |
| **VI. First-Principles & Entry-Level Pedagogy** | `level::l2-fundamental` entry cards included with intuitive analogies for each subtopic. | ✅ PASS | Sampler specifically checks and verifies presence of `level::l2-fundamental` in the test deck. |

---

## Project Structure

### Documentation (this feature)

```text
specs/004-ankiweb-e2e-automation/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output (Technical decisions & rationales)
├── data-model.md        # Phase 1 output (Entities, states, assertions schema)
├── quickstart.md        # Phase 1 output (Validation & execution guide)
├── contracts/           # Phase 1 output (JSON schema & CLI contracts)
│   ├── anki-connect-rpc.schema.json
│   ├── e2e-report.schema.json
│   ├── e2e-cli.schema.json
│   └── sanity-sampler.schema.json
└── tasks.md             # Phase 2 output (/speckit-tasks command - created separately)
```

### Source Code Impact Areas

```text
faang_anki/
├── .auth/                                       # [NEW] [GITIGNORED] Session storage directory
│   └── ankiweb-session.json                    # Cached Playwright storage state
├── reports/                                     # [NEW] [GITIGNORED] E2E execution reports & screenshots
│   └── e2e/
│       ├── e2e-report.json                     # Structured test execution results
│       └── screenshots/                        # Captured evidence screenshots & diffs
├── .env.example                                 # [NEW] Template for ANKIWEB_USER and ANKIWEB_PASSWORD
├── .gitignore                                   # [MODIFY] Add .auth/, .env, reports/, test-results/
├── playwright.config.js                         # [NEW] Playwright multi-viewport & snapshot config
├── package.json                                 # [MODIFY] Add @playwright/test, dotenv, and e2e scripts
├── src/
│   ├── generator.js                             # [MODIFY] Expose support for custom deck packaging options
│   ├── utils/
│   │   └── anki-connect.js                     # [NEW] Client for local Anki Desktop JSON-RPC API
│   └── e2e/
│       ├── sanity-sampler.js                   # [NEW] Dynamic representative card selector
│       ├── guardrails.js                       # [NEW] DOM, CSS overflow, KaTeX & touch-target assertions
│       ├── local-runner.js                     # [NEW] Fast (<3s) offline headless DOM runner
│       ├── ankiweb-runner.js                   # [NEW] Cloud Playwright browser runner for AnkiWeb
│       └── orchestrator.js                     # [NEW] Pipeline coordinator and CLI entry point
└── test/
    └── e2e/
        ├── baselines/                          # [NEW] Golden baseline snapshot reference images
        └── e2e-guardrails.test.js              # [NEW] Playwright test spec for visual regression
```

---

## Complexity Tracking

> **No violations. All design choices strictly adhere to the Constitution v1.4.0.**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| *None* | N/A | N/A |
