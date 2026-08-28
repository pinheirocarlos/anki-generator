# Quickstart: Validation & Execution Guide

**Feature**: Public Multimedia Curation & Resilient Visual Engine  
**Branch**: `003-public-multimedia-curation`  
**Specification**: [spec.md](./spec.md) | **Data Model**: [data-model.md](./data-model.md) | **Research**: [research.md](./research.md)

---

## 1. Prerequisites

- **Node.js**: `v18.0.0+` (native `fetch` and ESM support required)
- **NPM**: `v9.0.0+`
- **Network**: Active internet connection required for `npm run test:links` (offline execution for `npm test` and `npm run build`)

---

## 2. Core Validation Scenarios

### Scenario 1: Offline Deterministic Card Validation (`npm test`)
Verifies that all 550 markdown flashcards adhere to structural rules, LaTeX formulas, single-concept atomicity, table widths ($\le 3$ cols), and contain **zero placeholder URLs** (`assets.faang-anki.dev`).

```bash
# Run full offline test suite
npm test
```

**Expected Outcome**:
- Exit code `0`.
- Console outputs: `ALL VALIDATION CHECKS PASSED (550 cards verified)`.
- Rejection of any placeholder domain or malformed tag.

---

### Scenario 2: Active Remote Media Reachability Audit (`npm run test:links`)
Audits all remote HTTPS URLs across all flashcards for reachability (`HTTP 200 OK`) and valid MIME types.

```bash
# Run live network link auditor across all decks
npm run test:links

# Or test a single curricular batch
node src/utils/link-checker.js --deck decks/01-dsa
node src/utils/link-checker.js --deck decks/02-cs-fundamentals
node src/utils/link-checker.js --deck decks/03-system-design-backend
```

**Expected Outcome**:
- Exit code `0`.
- All URLs respond with `HTTP 200 OK` and valid media Content-Types (`video/mp4`, `video/webm`, `image/*`).
- Generates `link-health-report.json` with 0 failures (see [schema contract](./contracts/link-health-report.schema.json)).

---

### Scenario 3: Deck Compilation & Asset Packaging (`npm run build`)
Compiles all markdown cards into standalone master and modular `.apkg` packages.

```bash
# Build master and modular decks
npm run build
```

**Expected Outcome**:
- Generates `dist/MAANG_Engineering_Mastery.apkg` (< 50MB) in under 5 seconds.
- Generates modular phase decks:
  - `dist/MAANG_01-dsa.apkg`
  - `dist/MAANG_02-cs-fundamentals.apkg`
  - `dist/MAANG_03-system-design-backend.apkg`
  - `dist/MAANG_04-behavioral-engineering.apkg`

---

### Scenario 4: Anki Desktop & Mobile Visual Inspection
Verifies that cards render without layout shifts or black box artifacts on both Dark and Light modes.

1. Import `dist/MAANG_Engineering_Mastery.apkg` into Anki Desktop / AnkiDroid.
2. Review sample cards from each curricular batch:
   - **DSA**: `DSA-STRUCT-ARRAY-000`, `DSA-STRUCT-TREE-001`, `DSA-PAT-GRAPH-000`
   - **CS Fundamentals**: `CS-NET-TCP-000`, `CS-OS-VIRTUALMEM-000`, `CS-DB-BTREE-000`
   - **System Design**: `SYS-DIST-CONSENSUS-000`, `SYS-MSG-KAFKA-000`, `SYS-RES-RATELIMIT-000`
3. Verify that:
   - Videos play in silent loop without requiring user click.
   - SVGs scale fluidly without horizontal scroll.
   - Background seamlessly integrates with `--bg-card` (zero `#000` solid boxes).
