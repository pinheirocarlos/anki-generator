# Research: FAANG/MAANG Anki Deck & Pedagogical Engine

**Feature**: `001-faang-anki-deck`
**Date**: 2026-08-16
**Status**: Completed

## 1. Markdown Parsing & Card Separation

### Decision
Use `gray-matter` for YAML frontmatter extraction and regular expressions matching `## Pergunta` (front) and `## Resposta` (back), with fallback tolerance for case-insensitive matching (`/## Pergunta/i`, `/## Resposta/i`). The markdown body is converted to HTML using `marked`.

### Rationale
- Standardizes card authoring in plain Markdown files.
- Decouples content creation (which uses PT-BR headings and English code) from the build script logic.
- Ensures compatibility with both human editors and multi-agent AI generators.

### Alternatives Considered
- *Custom delimiter (e.g. `---front---` / `---back---`)*: Rejected because standard Markdown headers (`## Pergunta`, `## Resposta`) render natively and cleanly in GitHub, VS Code, and Markdown previewers.
- *JSON/YAML card definitions*: Rejected because authoring code snippets and multi-paragraph pedagogical proofs in JSON strings causes escaping noise and poor readability.

---

## 2. Anki Packaging & Offline Media Ingestion

### Decision
Use `anki-apkg-export` with `sql.js` (patched memory heap for large decks) to generate `.apkg` packages. For media files (PNG, SVG, JPG located in `decks/<fase_id>/<modulo>/<subtopico>/assets/`), the build script reads binary buffers and registers them via `apkg.addMedia(filename, data)` while rewriting local markdown image references `![](assets/...)` into Anki-compliant `<img src="...">` tags.

### Rationale
- Anki requires media files to be registered in its internal media table and packaged in the SQLite ZIP bundle.
- Co-locating images in `assets/` subdirectories maintains filesystem scalability (avoiding bloated root folders) while allowing the build script to easily crawl and embed them.

### Alternatives Considered
- *External CDN links*: Rejected because Constitution Principle V strictly mandates 100% offline-first operation.
- *Base64 inline embedding*: Rejected because large base64 strings in HTML bloat the SQLite note table and slow down Anki mobile rendering.

---

## 3. Scalable Curriculum Manifest & Deterministic IDs

### Decision
Implement `syllabus_manifest.json` in the root repository. Every card must have a canonical ID in its frontmatter conforming to `<PHASE>-<MODULE>-<SUBTOPIC>-<INDEX>` (e.g. `CS-ARCH-CACHE-001`). The manifest tracks the status of each subtopic (`pending`, `in_progress`, `completed`) and maps canonical IDs.

### Rationale
- Enables scaling to thousands of subtopics across the 4 syllabus phases without duplicates.
- Provides AI agents with a single source of truth for the next pending topic batch.

### Alternatives Considered
- *Folder-scanning only (no manifest)*: Rejected because scanning thousands of directories to detect missing subtopics or duplicates becomes slow and error-prone as the repository scales.

---

## 4. Multi-Target Build Output Naming

### Decision
- **Master Consolidated Deck**: `MAANG_Engineering_Mastery.apkg`
- **Modular Phase Builds**: Option to export individual phase packages (e.g. `MAANG_Phase2_CS_Fundamentals.apkg`) via CLI flag (e.g. `node src/generator.js --phase 02-cs-fundamentals`).

### Rationale
- Satisfies user preference for the package name while adhering to Constitution Principle V for modular exports to support AnkiWeb sync constraints.
