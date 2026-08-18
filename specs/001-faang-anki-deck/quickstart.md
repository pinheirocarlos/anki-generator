# Quickstart & Validation Guide: FAANG/MAANG Anki Deck Engine

**Feature**: `001-faang-anki-deck`
**Date**: 2026-08-16

This guide documents runnable validation scenarios that prove the feature works end-to-end.

---

## 1. Prerequisites
- **Node.js**: v18+ installed
- **NPM**: dependencies installed (`npm install`)
- **Anki / AnkiDroid**: for importing and previewing the generated `.apkg` (optional for headless build validation)

---

## 2. Setup & First Card Sample Creation

Create the initial sample directory structure and card under Phase 2:
```bash
# Criar diretório do primeiro subtópico (CS Fundamentals -> Arquitetura -> CPU Cache)
mkdir -p decks/02-cs-fundamentals/architecture/cpu-cache/assets
```

Create a sample card at `decks/02-cs-fundamentals/architecture/cpu-cache/CS-ARCH-CACHE-001.md`:
```markdown
---
id: CS-ARCH-CACHE-001
title: "L1 vs L2 vs L3 Cache Latency"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::amazon
  - freq::high
---

## Pergunta
Qual a ordem de grandeza de latência de acesso aos caches **L1, L2 e L3** comparados à **RAM**?

## Resposta
### Quick Answer
**Solução Direta**: 
- **L1**: ~1 ns (3-4 ciclos de CPU)
- **L2**: ~3-5 ns (~14 ciclos)
- **L3**: ~10-20 ns (~50 ciclos)
- **RAM Principal**: ~60-100 ns (~200x mais lento que L1).

### Dual Coding Visual
| Nível de Memória | Latência Aproximada | Proporção Visual |
|---|---|---|
| Registradores / L1 | ~1 ns | █ |
| L2 Cache | ~4 ns | ████ |
| L3 Cache | ~15 ns | ███████████████ |
| RAM (DRAM) | ~100 ns | ████████████████████ (100x) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Impacto em Big Techs
Linhas de cache (Cache Lines) transferem tipicamente 64 bytes contíguos de memória, tornando o layout contíguo em structs/arrays crítico para desempenho.
</details>
```

---

## 3. Build & Packaging Execution

Execute the compilation command:
```bash
npm run build
```

**Expected Outcome**:
- Script identifies cards in `decks/` recursively.
- Parses `## Pergunta` and `## Resposta`.
- Injects mobile-first CSS with dark/light mode support.
- Generates `MAANG_Engineering_Mastery.apkg` in the root repository.
- Console outputs: `Successfully generated MAANG_Engineering_Mastery.apkg with 1 cards.`

---

## 4. End-to-End Visual Verification

1. Open **Anki** (Desktop or AnkiDroid).
2. Go to **File -> Import** and select `MAANG_Engineering_Mastery.apkg`.
3. Open Card Browser:
   - Verify card has tags `level::l4-pleno`, `topic::cs::architecture`, `company::amazon`, `freq::high`.
   - Verify Front shows tags and Question in PT-BR with English bold terms.
   - Verify Back shows Quick Answer, Table, and collapsible `<details>` that expands on click/tap without horizontal scrolling.
