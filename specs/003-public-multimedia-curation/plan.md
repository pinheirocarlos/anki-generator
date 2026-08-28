# Implementation Plan: Public Multimedia Curation & Resilient Visual Engine

**Branch**: `003-public-multimedia-curation` | **Date**: 2026-08-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/003-public-multimedia-curation/spec.md` and Constitution v1.4.0

---

## Summary

This feature achieves complete visual and multimedia excellence across the entire 550-card curriculum:
1. **Placeholder Eradication & Public Curation**: Replace all 371 occurrences of the nonexistent domain `assets.faang-anki.dev` with verified, stable, high-impact public media assets (looping micro-videos, responsive SVGs, and compact tables) tailored to each individual concept.
2. **Active Reachability & Health Auditor (`link-checker.js`)**: Implement an automated network link auditor (`npm run test:links`) with connection pooling (8 concurrent workers), 5s timeout, 2x retry on 429/5xx, and structured reporting (`link-health-report.json`).
3. **Resilient CSS Engine & Theme Integration**: Remove hardcoded `background-color: #000` from `<video>` tags in `generator.js`, ensuring seamless dark/light theme integration and eliminating black-box rendering in Anki Desktop and AnkiDroid.
4. **Curriculum Batch Execution & Verification**: Execute curation in 3 disciplined phases: Phase 01 DSA (180 cards), Phase 02 CS Fundamentals (97 cards), and Phase 03 System Design (94 cards).

---

## Technical Context

**Language/Version**: Node.js v18+ (ECMAScript Modules `type: module`)  
**Primary Dependencies**: `anki-apkg-export` (^4.0.3), `gray-matter` (^4.0.3), `marked` (^18.0.9), `highlight.js` (^11.12.0), `katex` (^0.18.4), `sql.js` (^1.14.2)  
**Storage**: Flat Markdown files (`decks/`), Central JSON Registry (`media-curation-registry.json`), SQLite inside `.apkg` packages, Health Report (`link-health-report.json`)  
**Testing**: Offline test suite in `test/validate-cards.test.js` (`npm test`) + Active HTTP reachability suite in `src/utils/link-checker.js` (`npm run test:links`)  
**Target Platform**: Mobile-first (*AnkiDroid*, *AnkiMobile*, *AnkiWeb*) and Anki Desktop (Windows/macOS/Linux)  
**Project Type**: Static Flashcard Engine / Multimedia Curriculum Packaging Tool  
**Performance Goals**: Build 550+ cards in < 3 seconds; Link audit across 371+ URLs in < 20 seconds; Master `.apkg` < 50MB  
**Constraints**: Zero runtime JS; 100% offline-ready CSS/styles; HTTP 200 required for all remote URLs; zero black-box containers; strict single-concept atomicity  

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Requirement | Status | Verification |
|---|---|---|---|
| **I. Dual Coding & Micro-Videos** | Dynamic concepts receive looping micro-videos (`<video autoplay loop muted playsinline>`); static structures receive responsive SVGs or tables $\le 3$ cols. | ✅ PASS | Enforced in `media-curation-registry.json`, `data-model.md`, and card Markdown templates. |
| **II. Progressive Disclosure & Atomicity** | Immediate `Quick Answer` (<15s reading), single question per card (<30s evaluation), `<details>` deep dive. | ✅ PASS | Verified by `validator.js` and `validate-cards.test.js`. |
| **III. Strategic Bilingualism & Syntax Highlighting** | PT-BR explanation, English technical terms, Go/Java snippets with static `highlight.js` realce. | ✅ PASS | Enforced across all 550 Markdown flashcards. |
| **IV. Strict Tag Hierarchy & Flat Deck** | Flat deck in Anki; strict tags (`level::*`, `topic::*`, `company::*`, `freq::*`); canonical IDs. | ✅ PASS | Validated by manifest and card schema assertions. |
| **V. Static-Engine & Online-Enhanced Media** | 100% static CSS, KaTeX, and Highlight.js; valid public HTTPS media without placeholder domains. | ✅ PASS | Eradication of `assets.faang-anki.dev`; audited via `link-checker.js` and `validator.js`. |
| **VI. First-Principles & Entry-Level Pedagogy** | `level::l2-fundamental` entry cards included with intuitive analogies for each subtopic. | ✅ PASS | Validated across all 550 cards in manifest and decks. |

---

## Project Structure

### Documentation (this feature)

```text
specs/003-public-multimedia-curation/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output (Technical decisions & rationales)
├── data-model.md        # Phase 1 output (Entities, schemas, batch definitions)
├── quickstart.md        # Phase 1 output (Validation & verification guide)
├── contracts/           # Phase 1 output (JSON schema & CLI contracts)
│   ├── media-curation-registry.schema.json
│   ├── link-health-report.schema.json
│   └── link-checker-cli.schema.json
└── tasks.md             # Phase 2 output (/speckit-tasks command - created separately)
```

### Source Code Impact Areas

```text
faang_anki/
├── media-curation-registry.json                 # [NEW] Canonical media curation catalog
├── link-health-report.json                      # [NEW] Generated link health report
├── decks/
│   ├── 01-dsa/                                 # [MODIFY] 180 cards updated with curated media
│   ├── 02-cs-fundamentals/                    # [MODIFY] 97 cards updated with curated media
│   ├── 03-system-design-backend/               # [MODIFY] 94 cards updated with curated media
│   └── 04-behavioral-engineering/              # [VERIFIED] 83 cards already 100% clean
├── src/
│   ├── generator.js                            # [MODIFY] Remove #000 video background; resilient CSS
│   └── utils/
│       ├── link-checker.js                     # [NEW] Live HTTP reachability & MIME type auditor
│       ├── validator.js                        # [MODIFY] Block placeholder domains in offline tests
│       ├── media-catalog.js                    # [MODIFY] Align mappings with public media catalog
│       └── media-resolver.js                   # [VERIFIED] Existing media extraction logic
├── test/
│   └── validate-cards.test.js                  # [MODIFY] Update mock tests & add placeholder blocking test
├── package.json                                # [MODIFY] Add "test:links": "node src/utils/link-checker.js"
└── README.md                                   # [MODIFY] Document online-enhanced media infrastructure
```

---

## Complexity Tracking

> **No violations. All design choices strictly adhere to the Constitution v1.4.0.**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| *None* | N/A | N/A |
