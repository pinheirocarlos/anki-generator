# Research: Public Multimedia Curation & Resilient Visual Engine

**Feature Branch**: `003-public-multimedia-curation`  
**Date**: 2026-08-24  
**Status**: Completed  

---

## 1. Technical Decisions & Rationales

### Decision 1: High-Impact Public Media Sourcing & Multi-Tier Pedagogical Allocation (P1 vs P2)

- **Decision**: Eradicate all 371 occurrences of `assets.faang-anki.dev` and map each card to either:
  1. **P1 (Public Looping Micro-Video / Animated WebP/GIF)**: For dynamic temporal processes, step-by-step algorithms, network protocols, concurrency races, and lifecycle transitions (e.g., Dijkstra relaxation, TCP 3-way handshake, Raft consensus, Go GMP scheduler, Kafka partition balancing).
     - **Sources**: Canonical educational domains (Wikimedia Commons, official Go/Linux/PostgreSQL/Redis documentation, open-source algorithm visualizers, ByteByteGo public diagrams, official W3C/IETF specs).
  2. **P2 (Declarative Responsive Inline SVG or Compact Comparison Table)**: For static topological structures, memory layouts, ASTs, B-Trees/Trie nodes, and architectural trade-off comparisons.
     - **Sources**: Procedural SVG generators from `src/utils/media-catalog.js` and dedicated inline SVGs with `viewBox="0 0 W H"` and `width="100%"`.
- **Rationale**: The Dual Coding Theory (Constitution Principle I) requires visual reinforcement to match the exact mental model of the question. Dynamic processes lose educational efficacy when reduced to static text, while static topologies do not need video streams.
- **Alternatives Considered**:
  - *Host all videos locally in APKG*: Rejected because embedding 371 videos into SQLite would push the master APKG past AnkiWeb's 250MB sync limit.
  - *Static Markdown tables only*: Rejected because complex algorithms and distributed protocols cannot be intuitively grasped in 15 seconds through text tables alone.

---

### Decision 2: Active HTTP Reachability Auditor Architecture (`src/utils/link-checker.js`)

- **Decision**: Build a standalone link auditor (`src/utils/link-checker.js`) executed via `npm run test:links`.
  - **Node Native Fetch**: Utilize native `fetch` (Node 18+) with `AbortSignal.timeout(5000)`.
  - **Concurrency Pool**: Controlled worker pool (concurrency = 8) to avoid socket exhaustion and rate-limiting from public CDNs.
  - **Retry Policy**: Up to 2 retries on transient network failures (HTTP 429 Too Many Requests, 502/503/504, or ETIMEDOUT) with exponential backoff (500ms, 1500ms).
  - **HTTP Method Strategy**: Issue `HEAD` first; if `405 Method Not Allowed` or `403 Forbidden` (some CDNs block HEAD), fallback to `GET` with `Range: bytes=0-1024` or immediate abort upon header receipt.
  - **Identification**: Explicit `User-Agent: FAANG-Anki-LinkChecker/1.0 (Educational flashcard media auditor)` header.
  - **Reporting**: Emit structured summary to `link-health-report.json` and exit with code 0 on all 200s, code 1 on any broken link.
- **Rationale**: Prevents CI/CD flakiness while ensuring no broken URLs or dead domains enter production decks.
- **Alternatives Considered**:
  - *Integrating live network checks into `npm test`*: Rejected because `npm test` must remain 100% offline, deterministic, and fast (< 1s) for local git pre-commit hooks and testing pipelines.
  - *Using external npm packages (e.g., `broken-link-checker`)*: Rejected to avoid unnecessary dependencies; Node 18 native `fetch` handles this cleanly with zero external runtime footprint.

---

### Decision 3: Offline Validation Guardrails (`src/utils/validator.js`)

- **Decision**: Update `src/utils/validator.js` to strictly reject any placeholder domains (specifically `assets.faang-anki.dev`, `example.com`, `example.org`, `localhost`, `placeholder.com`) during standard `npm test`.
- **Rationale**: Provides instant, offline static analysis catching regressions before any card is committed or built.
- **Alternatives Considered**:
  - *Relying only on `npm run test:links`*: Rejected because developers working offline should be blocked immediately if placeholder URLs are introduced.

---

### Decision 4: CSS Resilience & Eradication of Black-Box Video Containers

- **Decision**: Refactor `.card-container video` and `.media-container` styles in `src/generator.js`:
  - Remove `background-color: #000;` on `<video>` elements.
  - Set `background-color: transparent;` and `object-fit: contain;`.
  - Ensure `.video-wrapper` and `.media-container` have subtle border matching `var(--border-color)`, responsive `border-radius: 8px`, and smooth transition so that even during high-latency mobile loading, no opaque black boxes or layout shifts occur.
  - Add explicit mobile video flags: `<video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback>`.
- **Rationale**: On mobile devices (AnkiDroid / AnkiMobile), an unstyled video or broken URL with `#000` background renders as a large black rectangle that ruins Dark Mode and Light Mode aesthetics.
- **Alternatives Considered**:
  - *Setting video background to fixed white or grey*: Rejected because it breaks Anki's Dark Mode (`.nightMode`). Using `transparent` and `var(--bg-card)` seamlessly adapts to any theme.

---

### Decision 5: Centralized Media Curation Registry (`media-curation-registry.json`)

- **Decision**: Establish `media-curation-registry.json` at the project root (or `src/data/media-curation-registry.json`) as the single source of truth for media metadata:
  - Structure: Maps `card_id` -> `{ concept, tier, url, type, attribution, license, caption, validated_at }`.
  - Captions: Concise, single-concept pedagogical captions embedded in cards (`<p>Visualização: [Explicação contextualizada]</p>`).
  - Attribution: Stored in registry and optionally exposed in `<details>` deep dive for CC-BY licenses, maintaining clean mobile review screens.
- **Rationale**: Centralizes attribution, auditing, and batch curation tracking across all 550 cards in the curriculum.

---

### Decision 6: Phased Modular Curricular Execution Strategy

- **Decision**: Organize the curation and replacement of the 371 cards into 3 curriculum-based batches:
  - **Batch 1 (Phase 01 - DSA)**: 180 cards across arrays, strings, linked lists, trees, graphs, sorting, dynamic programming, heaps, tries, bit manipulation.
  - **Batch 2 (Phase 02 - CS Fundamentals)**: 97 cards across OS, Linux internals, computer architecture, memory/TLB, networking (TCP/IP, HTTP/2/3, DNS), database storage engines (B-Tree, LSM-Tree, MVCC).
  - **Batch 3 (Phase 03 - System Design Backend)**: 94 cards across distributed consensus (Raft, Paxos), messaging (Kafka, Queues), caching (LRU, Cache-Aside), load balancing, rate limiting, and system design archetypes.
- **Validation per Batch**: Run `npm test`, `npm run test:links`, compile modular `.apkg` via `npm run build`, and inspect generated card samples before proceeding to the next batch.
- **Rationale**: Prevents cognitive fatigue, ensures thorough domain-specific curation quality, and allows incremental verification.

---

## 2. Risk Mitigation Matrix

| Risk | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|
| Public third-party URL becomes 404 in the future | Medium | Low | Run `npm run test:links` in CI/periodic audits; media registry allows 1-click fallback to procedural SVG in `media-catalog.js`. |
| WebView blocks autoplay on low-battery mobile devices | Low | Low | All videos include semantic inline captions and are preceded by `Quick Answer` + comparison tables. |
| Insecure HTTP link triggers mixed-content blocking | Low | High | `validator.js` and `test/validate-cards.test.js` strictly reject `http://` URLs (require `https://`). |
| CDN rate-limits link-checker requests | Medium | Low | Concurrency pool capped at 8 with 500ms/1500ms backoff on HTTP 429. |
