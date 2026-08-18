# Feature Specification: FAANG Anki Deck & Pedagogical Engine

**Feature Branch**: `001-faang-anki-deck`

**Created**: 2026-08-16 | **Updated**: 2026-08-16 (v1.3.0 Alignment)

**Status**: Ready for Execution

**Input**: User description: "se baseando no que já fiz em bkp" + expansão curricular completa com camada entry-level/noob-friendly.

## Clarifications

### Session 2026-08-16 (Batch 1 & Layout Overhaul)
- Q: Qual fase/módulo do currículo (Syllabus) deve ser priorizado na primeira leva de criação dos flashcards (MVP)? → A: Fase 2: Fundamentos da Ciência da Computação (Matemática Discreta, Lógica, Binários, Arquitetura de Computadores, CPU/Memória/Cache).
- Q: Como as imagens locais e assets visuais (da abordagem híbrida) devem ser organizados na estrutura de diretórios do projeto? → A: Subpasta de assets co-localizada por subtópico: `decks/<fase_id>/<modulo>/<subtopico>/assets/<card_id>.<png|svg|jpg>`.
- Q: Como resolver a quebra de layout, duplicação de pergunta no verso e scroll horizontal no AnkiDroid? → A: Usar template de resposta único (`answerFormat: '{{Back}}'`), encapsular tabelas com `<div class="table-responsive">` limitando a 2-3 colunas, corrigir sintaxe CSS do Night Mode para AnkiDroid e pré-compilar código Go/Java com `highlight.js` (tema Dark Modern).
- Q: Como garantir que o baralho atenda tanto quem está revisando quanto quem está aprendendo do zero (noobs/iniciantes)? → A: Todo subtópico curricular deve obrigatoriamente incluir cards introdutórios (*entry-level / noob-friendly*) focados em ensinar pela primeira vez com analogias intuitivas, metáforas do mundo real e recursos visuais passo a passo antes de aprofundamentos técnicos.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Quick Concept Review & Pattern Recognition on Mobile (Priority: P1)

As a backend software engineer preparing for FAANG interviews, I want to review atomic computer science and algorithmic concepts on my phone in 15 to 90 seconds per card with instant visual cues and quick answers, so that I can reinforce pattern recognition and active recall during short daily study intervals.

**Why this priority**: Core value proposition of the product. Fast, high-density recall during micro-learning intervals on mobile devices is the primary usage pattern.

**Independent Test**: Can be independently verified by opening an atomic flashcard on a mobile screen (AnkiDroid): front shows question, tags and visual cue; back reveals single unified container with compact question context, direct quick answer in <15s with complexity badges, without duplication or horizontal scroll.

**Acceptance Scenarios**:

1. **Given** a user opens a concept flashcard on mobile (starting with Phase 2 CS Fundamentals), **When** viewing the front of the card, **Then** the question is displayed in concise PT-BR with English technical terms, along with hierarchical category tags and any visual pattern trigger.
2. **Given** a user flips the card to see the answer, **When** the back is displayed, **Then** the primary answer is immediately visible at the top in a single cohesive card container with Big-O time/space complexity badges (or core concept summaries), without requiring taps, expanding sections or showing duplicated front blocks.

---

### User Story 2 - Deep Dive & Code Implementation Inspection (Priority: P2)

As an engineer studying complex data structures, algorithms, or system design scenarios, I want to expand an in-depth walkthrough containing optimal code implementations in Go and Java with dark syntax highlighting and detailed trade-off analyses without cluttering the initial answer view, so that I can deeply understand edge cases when I have dedicated study time.

**Why this priority**: Essential for mastering L3/L4/L5 interview depths beyond quick recall, providing rigorous reference implementations and proofs.

**Independent Test**: Can be tested by tapping the collapsible `<details>` ("Deep Dive & Walkthrough") section on a flipped card: code blocks render with Dark Modern syntax highlighting in Go and Java with zero horizontal scrolling and line wrapping suitable for mobile screens (≥360px).

**Acceptance Scenarios**:

1. **Given** a flipped card with a complex algorithmic or systems problem, **When** the user taps the collapsible "Deep Dive" section (min 44px touch target), **Then** the detailed explanation, mathematical proof/trade-offs, and idiomatic Go/Java snippets expand smoothly.
2. **Given** the expanded code snippet on a standard mobile screen width, **When** the user reads through the implementation, **Then** syntax is highlighted with rich dark palette and no horizontal scrolling is required to read complete lines.

---

### User Story 3 - Offline Multi-Topic Filtered Review & Modular Builds (Priority: P3)

As a candidate focusing on a specific tech company or topic (e.g. Amazon leadership, computer architecture, or graph algorithms), I want to study using targeted decks (either by tags or by importing phase-specific `.apkg` packages) in complete offline mode, so that I can study anywhere without dependency on internet connectivity or massive file sizes.

**Why this priority**: Enables targeted preparation sprints per interview type, supports resource-efficient mobile sync, and guarantees reliable usage in transit or airplane mode.

**Independent Test**: Can be tested by importing either the consolidated deck or a modular phase package (`MAANG_02-cs-fundamentals.apkg`) into AnkiDroid/AnkiWeb, disconnecting internet, and successfully executing a study session with full offline styling, pre-rendered code syntax and local assets.

**Acceptance Scenarios**:

1. **Given** an offline device with the imported deck, **When** filtering cards by `topic::*`, `level::*`, or `company::*`, **Then** cards are accurately filtered and all visual diagrams/styling/code blocks render completely offline without broken links or missing styles.
2. **Given** a modular phase package exported by the build system, **When** imported into Anki, **Then** only cards belonging to that phase are imported while preserving global tag compatibility.

---

### User Story 4 - First-Principles & Entry-Level Visual Pedagogy (Zero-to-Hero) (Priority: P1)

As an engineer encountering a topic for the first time or brushing up on weak foundations, I want to learn core computer science, algorithmic, and distributed systems concepts from scratch through clear real-world analogies, step-by-step visual diagrams, and intuitive problem framing, so that I can build an unshakable mental model before moving to technical proofs or implementation code.

**Why this priority**: High pedagogical efficacy requires building the intuitive model first; memorization without intuition causes high failure rates in novel interview problems.

**Independent Test**: Can be verified by reviewing entry-level cards (`level::l3-junior`): card explains the fundamental "why" and problem context using intuitive analogies and visual steps, making the concept comprehensible to an entry-level practitioner without prerequisite jargon.

**Acceptance Scenarios**:

1. **Given** an entry-level concept card, **When** the user reads the front and flips to the back, **Then** the explanation defines the core intuition with a relatable real-world analogy and a step-by-step visual diagram (SVG or simple table).
2. **Given** a beginner studying a complex topic (e.g., Virtual Memory, Raft Consensus, Monotonic Stack), **When** reviewing the introductory card, **Then** the card focuses purely on explaining how and why it works simply, leaving syntax micro-optimizations for subsequent cards in that subtopic.

---

### Edge Cases

- **Complex Visual Generation**: When a topic requires an intricate architecture or flow diagram that cannot be rendered declaratively via SVG or table, the system pauses content generation, outputs structured generation prompts, and awaits user asset placement under `decks/<fase_id>/<modulo>/<subtopico>/assets/<card_id>.<png|svg|jpg>` before finalizing the card.
- **Small Mobile Screen Constraint**: When viewing long mathematical formulas, comparison tables, or multi-step logic on a 360px-wide mobile screen, tables wrap in `.table-responsive` containers and text/collapsible sections wrap cleanly without clipping UI elements.
- **Ambiguous Metadata & Duplicate Avoidance**: When a new batch of cards is proposed, the system verifies against `syllabus_manifest.json` to prevent duplicated coverage of subtopics across generation sessions.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST present card questions in clear PT-BR prose while preserving all technical terminology, algorithmic names, and design patterns in standard English (`code` formatted).
- **FR-002**: System MUST structure every card back in a single unified container with three distinct visual layers: (1) Immediate Quick Answer with Big-O badges, (2) Responsive Dual Coding Visual (declarative SVG, table ≤3 cols, or embedded image), and (3) Collapsible `<details>` Deep Dive section.
- **FR-003**: System MUST provide code examples exclusively in Go and Java, formatted with build-time syntax highlighting (`highlight.js` in Dark Modern palette) and line wrapping to fit narrow mobile viewports without horizontal scrolling.
- **FR-004**: System MUST assign strict hierarchical tags to all cards using the schema: `level::<l3-junior|l4-pleno|l5-senior>`, `topic::<area>::<subtopico>`, `company::<company_name>`, and `freq::<high|medium|low>`.
- **FR-005**: System MUST prohibit nested sub-deck creation and enforce a single flat deck architecture organized solely by metadata tags.
- **FR-006**: System MUST package all styling, fonts, code syntax tokens, and visual assets locally so the exported deck operates 100% offline without external CDN dependencies.
- **FR-007**: System MUST support visual cues on the front of the card (`## Pergunta`) for pattern recognition training where applicable.
- **FR-008**: System MUST enforce time-to-read constraints: maximum 15 seconds reading time for atomic foundation cards and 45-90 seconds mental processing time for synthesis/algorithmic cards.
- **FR-009**: The initial generation milestone (MVP batch) MUST target Phase 2: Computer Science Fundamentals (Discrete Math, Boolean Algebra, CPU/Memory/Registers, Cache, Binary Representation).
- **FR-010**: All static visual assets generated for cards MUST be organized under `decks/<fase_id>/<modulo>/<subtopico>/assets/<card_id>.<ext>` to prevent filesystem inode bloat and allow predictable packaging.
- **FR-011**: System MUST maintain a central curriculum tracking registry (`syllabus_manifest.json`) registering all modules, granular subtopics, deterministic card IDs (e.g. `CS-ARCH-CACHE-001`), and generation status to prevent duplication at massive scale.
- **FR-012**: The build engine MUST support compiling both the complete consolidated master deck and modular per-phase decks (e.g. `MAANG_02-cs-fundamentals.apkg`) to manage payload size and AnkiWeb sync constraints.
- **FR-013**: System MUST ensure every syllabus subtopic includes an introductory entry-level card (`level::l3-junior`) whose primary pedagogical mission is teaching from first principles via intuitive analogies and step-by-step visual models.
- **FR-014**: System MUST map and maintain actionable task definitions across all 108 curriculum subtopics (105 pending + 3 completed) covering all 4 syllabus phases.

### Key Entities

- **Flashcard**: Represents a single learning item consisting of frontmatter metadata (canonical ID, title, hierarchical tags), question front (`## Pergunta`), and 3-layered answer back (`## Resposta`).
- **Tag Taxonomy**: Standardized categorization schema (`level`, `topic`, `company`, `freq`) enabling multi-dimensional filtered study.
- **Visual Asset**: Either an inline declarative graphic (SVG/Markdown table ≤3 cols) or a local image asset located at `decks/<fase_id>/<modulo>/<subtopico>/assets/<card_id>.<ext>` and bundled into `.apkg`.
- **Curriculum Manifest (`syllabus_manifest.json`)**: Central registry tracking syllabus tree, subtopic coverage status (`pending`, `completed`), and canonical card ID mappings.
- **Curricular Module (Syllabus)**: The structured hierarchy of subjects across 4 phases (Algorithms & Data Structures, CS Fundamentals, Systems & Backend Engineering, Software Engineering & Behavioral).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of generated cards are reviewable on mobile viewports (minimum 360px width) with zero horizontal scrollbars on AnkiDroid and Anki Desktop.
- **SC-002**: 100% of flashcards contain valid hierarchical frontmatter tags matching the defined schema.
- **SC-003**: 100% of cards function fully in offline mode with zero network requests, broken image links, or unrendered code blocks.
- **SC-004**: Primary answer readability allows 90% of atomic cards to be evaluated by the user within 15 seconds.
- **SC-005**: 100% of complex algorithmic or architectural topics include an accompanying visual representation (SVG, table, or embedded image).
- **SC-006**: Initial batch delivers a cohesive set of 5 to 10 flashcards for Phase 2 CS Fundamentals meeting all pedagogical constraints.
- **SC-007**: 100% of generated cards are registered in `syllabus_manifest.json` with unique canonical IDs, guaranteeing 0% duplicates across generation batches.
- **SC-008**: 100% of syllabus subtopics possess entry-level introductory cards designed to teach fundamentals from scratch through analogies and visual models.

## Assumptions

- Target users range from engineers with entry-level knowledge seeking to learn fundamentals from scratch to experienced developers preparing for L4/L5 interviews.
- Primary consumption platform is AnkiDroid and Anki desktop/web in dark/light system mode.
- Generation of cards occurs incrementally in structured batches per subtopic following the task roadmap.
- Image generation for complex diagrams utilizes a hybrid workflow where AI specifies prompts and file paths (`decks/<fase_id>/<modulo>/<subtopico>/assets/<card_id>.<ext>`) for local bundling.
- Build engine supports multi-target exports (consolidated master `.apkg` and phase-specific `.apkg`).

