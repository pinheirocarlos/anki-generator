# Implementation Plan: FAANG/MAANG Anki Deck & Pedagogical Engine

**Branch**: `001-faang-anki-deck` | **Date**: 2026-08-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-faang-anki-deck/spec.md` and Constitution v1.3.0

---

## Summary

Implement the foundational pedagogical flashcard engine, data architecture, and full curriculum roadmap for the MAANG Anki Deck project. The technical approach establishes:
1. A granular subtopic directory layout (`decks/<fase_id>/<modulo>/<subtopico>/<card_id>.md`) with co-located `assets/` subdirectories to ensure scalability up to 10M cards without filesystem or git degradation.
2. A centralized `syllabus_manifest.json` catalog tracking 108 subtopics (105 pending + 3 completed) and assigning canonical deterministic IDs (e.g. `CS-ARCH-CACHE-001`, `DSA-STRUCT-ARRAY-001`).
3. Pedagogical "Zero-to-Hero" multi-tier card architecture: mandatory entry-level intuitive/visual cards (`level::l3-junior`) teaching fundamentals from scratch using real-world analogies before advanced implementation and interview deep dives.
4. An updated Node.js build pipeline in `src/generator.js` using `marked` + `highlight.js` (Dark Modern theme), responsive table wrappers (`<div class="table-responsive">`), single-container Anki template architecture (`answerFormat: '{{Back}}'`), and AnkiDroid-ready CSS design system.
5. Packaging into `MAANG_Engineering_Mastery.apkg` (and modular phase packages `MAANG_02-cs-fundamentals.apkg`) with 100% offline rendering and zero horizontal scroll on mobile (≥360px).
6. Comprehensive task breakdown spanning all 4 syllabus phases (CS Fundamentals, DSA, System Design, Behavioral/SRE).

---

## Technical Context

**Language/Version**: Node.js v18+ (ECMAScript Modules `type: module`)  
**Primary Dependencies**: `anki-apkg-export` (^4.0.3), `gray-matter` (^4.0.3), `marked` (^18.0.9), `highlight.js` (^11.11.1), `sql.js` (patched memory heap)  
**Storage**: Flat Markdown files on filesystem, JSON manifest (`syllabus_manifest.json`), SQLite within `.apkg` packages  
**Testing**: Node.js build validation and schema assertion tests for frontmatter/manifest/tables/code syntax  
**Target Platform**: Mobile-first (*AnkiDroid*, *AnkiMobile*, *AnkiWeb*) and Anki Desktop (Windows/macOS/Linux)  
**Project Type**: Static Content Generator / CLI Packaging Tool  
**Performance Goals**: Build 1,000 cards in < 3 seconds; 100% offline rendering  
**Constraints**: Zero CDN dependencies; zero horizontal scroll on viewports ≥360px; strict tag taxonomy; single-container template architecture; build-time syntax tokenization; mandatory entry-level visual cards for every subtopic  
**Scale/Scope**: Architectural support for massive scale (10M cards) via deep subtopic sharding and curriculum manifest  

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Requirement | Status | Verification |
|---|---|---|---|
| **I. Dual Coding & Visual-First** | All complex concepts have visual cues (SVG with viewBox, tables ≤3 cols with `.table-responsive`, or local image assets in `assets/`). | ✅ PASS | Enforced in `data-model.md`, `card-schema.json`, and markdown template. |
| **II. Progressive Disclosure** | Quick Answer immediate (<15s reading), deep dive in collapsible `<details>`, single-container note template. | ✅ PASS | Card schema and CSS in generator provide built-in accordion styling and single container per side. |
| **III. Strategic Bilingualism & Syntax Highlighting** | Prosa in PT-BR, technical terms in English `code`, snippets in Go & Java with `highlight.js` Dark Modern syntax and zero scroll. | ✅ PASS | Verified in spec, generator marked-highlight integration, and word-wrap CSS rules. |
| **IV. Strict Tag Hierarchy & Flat Deck** | No nested sub-decks in Anki; filtering exclusively via tags (`level::*`, `topic::*`, `company::*`, `freq::*`) + canonical IDs. | ✅ PASS | Enforced in `card-schema.json` regex and generator tagging logic. |
| **V. Offline-First & Multi-Target** | 100% self-contained `.apkg` (no external CDNs), local media embedded, multi-target build support. | ✅ PASS | Media ingestion via `apkg.addMedia()` and output named `MAANG_Engineering_Mastery.apkg`. |
| **VI. First-Principles & Entry-Level Pedagogy** | Every subtopic must contain entry-level (`level::l3-junior`) cards teaching concepts from scratch via real-world analogies and visual steps. | ✅ PASS | Enforced in spec User Story 4, requirements FR-013, and task generation rules. |

---

## Project Structure

### Documentation (this feature)

```text
specs/001-faang-anki-deck/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (Technical decisions & rationales)
├── data-model.md        # Phase 1 output (Entities, relationships, validation rules)
├── quickstart.md        # Phase 1 output (Validation & verification guide)
├── contracts/           # Phase 1 output (JSON schema contracts)
│   ├── card-schema.json
│   └── manifest-schema.json
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
faang_anki/
├── decks/                                      # Content repository
│   ├── 01-dsa/                                 # Phase 1 DSA & LeetCode
│   ├── 02-cs-fundamentals/                    # Phase 2 CS Fundamentals
│   ├── 03-system-design-backend/               # Phase 3 System Design & Backend
│   └── 04-behavioral-engineering/              # Phase 4 Behavioral, SRE & Security
├── src/
│   ├── generator.js                            # Core compilation, highlight & packaging script
│   └── utils/
│       ├── validator.js                        # Frontmatter, code block & table validator
│       └── media-resolver.js                   # Media crawling & rewrite utility
├── syllabus_manifest.json                      # Central curriculum registry
├── package.json
└── README.md
```

**Structure Decision**: Single modular project. Content authored in plain Markdown inside `decks/`, compiled via Node.js CLI script into Anki `.apkg` SQLite bundles.

---

## Complexity Tracking

> **No violations. All design choices strictly adhere to the Constitution v1.3.0.**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| *None* | N/A | N/A |

