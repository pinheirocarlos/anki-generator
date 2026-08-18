# Implementation Plan: Atomic Cards, Multimedia Upgrade & Foundations Tier

**Branch**: `002-atomic-media-foundations` | **Date**: 2026-08-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-atomic-media-foundations/spec.md` and Constitution v1.4.0

---

## Summary

This feature addresses the three core architectural and pedagogical improvements for the MAANG Anki Deck:
1. **Atomic Flashcard Decomposition**: Decompose all 141 multi-part/compound questions into single-concept atomic cards to guarantee accurate spaced repetition (SRS) scoring and micro-learning speed (<30s).
2. **Multimedia & Interactive Dual Coding**: Elevate visual quality by establishing looping micro-videos (`<video autoplay loop muted playsinline>`) and responsive SVGs (`viewBox`) for dynamic processes across all 4 syllabus phases, replacing text-only table fallbacks.
3. **Foundations Level (`level::l2-fundamental`)**: Introduce a dedicated entry-level tier focused on real-world analogies, intuitive physical models, and zero assumed jargon to provide clean onboarding before junior/mid-level deep dives.

---

## Technical Context

**Language/Version**: Node.js v18+ (ECMAScript Modules `type: module`)  
**Primary Dependencies**: `anki-apkg-export` (^4.0.3), `gray-matter` (^4.0.3), `marked` (^18.0.9), `highlight.js` (^11.11.1), `katex` (^0.16.22), `sql.js`  
**Storage**: Flat Markdown files on filesystem (`decks/`), JSON manifest (`syllabus_manifest.json`), SQLite inside `.apkg` packages  
**Testing**: Automated validation suite in `test/validate-cards.test.js` asserting frontmatter, manifest synchronization, atomic question patterns, table widths, and media URLs  
**Target Platform**: Mobile-first (*AnkiDroid*, *AnkiMobile*, *AnkiWeb*) and Anki Desktop (Windows/macOS/Linux)  
**Project Type**: Static Flashcard Engine / Curriculum Packaging Tool  
**Performance Goals**: Build 1,000+ cards in < 3 seconds; 100% offline-ready CSS/styles; zero horizontal scroll on mobile (≥360px)  
**Constraints**: Zero runtime JavaScript execution; strict tag taxonomy; canonical deterministic IDs; strict single-question atomicity  

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Requirement | Status | Verification |
|---|---|---|---|
| **I. Dual Coding & Micro-Videos** | Dynamic topics use looping micro-videos (3–15s, muted, playsinline) or responsive SVGs. Tables $\le 3$ cols. | ✅ PASS | Specified in `research.md`, `data-model.md`, and media schema. |
| **II. Progressive Disclosure** | Quick Answer immediate (<15s reading), deep dive in `<details>`, single-container note template. | ✅ PASS | Schema enforces atomic question with instant `Quick Answer`. |
| **III. Strategic Bilingualism & Syntax Highlighting** | PT-BR explanation, English technical terms, Go/Java code with static `highlight.js` and word-wrap. | ✅ PASS | Enforced in card templates and generator pipeline. |
| **IV. Strict Tag Hierarchy & Flat Deck** | Flat deck in Anki; tags `level::*`, `topic::*`, `company::*`, `freq::*`. Introduction of `level::l2-fundamental`. | ✅ PASS | Validated in `card-schema.json` and `validator.js` regex. |
| **V. Static-Engine & Media Handling** | 100% static CSS/tokenization, safe HTTPS remote media and local assets in `assets/`. | ✅ PASS | Handled in `media-resolver.js` and `generator.js`. |
| **VI. First-Principles & Entry-Level Pedagogy** | Mandatory `level::l2-fundamental` cards for every subtopic teaching from scratch with real-world analogies. | ✅ PASS | Formalized in spec requirement FR-006 and User Story 3. |

---

## Project Structure

### Documentation (this feature)

```text
specs/002-atomic-media-foundations/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 output (Technical decisions & rationales)
├── data-model.md        # Phase 1 output (Entities, tags, schemas)
├── quickstart.md        # Phase 1 output (Validation & verification guide)
├── contracts/           # Phase 1 output (JSON schema contracts)
│   ├── card-schema.json
│   └── manifest-schema.json
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code Impact Areas

```text
faang_anki/
├── decks/                                      # Content repository to be refactored/expanded
│   ├── 01-dsa/                                 # Decomposed atomic cards + L2 cards + SVGs/videos
│   ├── 02-cs-fundamentals/                    # Decomposed atomic cards + L2 cards + SVGs/videos
│   ├── 03-system-design-backend/               # Decomposed atomic cards + L2 cards + SVGs/videos
│   └── 04-behavioral-engineering/              # Decomposed atomic cards + L2 cards + SVGs/videos
├── src/
│   ├── generator.js                            # Updated CSS badges for L2 Fundamental and video wrappers
│   └── utils/
│       ├── validator.js                        # Updated TAG_LEVEL_REGEX (l2-fundamental) & single-question assertion
│       └── media-resolver.js                   # Validates HTTPS video and SVG asset injection
├── test/
│   └── validate-cards.test.js                  # Regression tests for atomic questions and L2 tags
├── syllabus_manifest.json                      # Sincronização de todos os novos IDs atômicos
├── package.json
└── README.md
```

---

## Complexity Tracking

> **No violations. All design choices strictly adhere to the Constitution v1.4.0.**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| *None* | N/A | N/A |
