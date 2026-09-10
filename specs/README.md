# 📋 Feature Specifications (`specs/`)

Este diretório armazena as especificações de funcionalidades ativas geradas pelo **Spec-Driven Development** (`spec-cli` / `speckit`).

---

## 🏛️ Governança & Constituição
Todas as especificações criadas neste diretório devem seguir rigorosamente as diretrizes da **Constituição do Projeto (v1.4.0)**, disponível em:
- [`.specify/memory/constitution.md`](../.specify/memory/constitution.md)

---

## 📦 Histórico de Especificações Concluídas
As especificações das features fundamentais do motor foram concluídas, validadas e incorporadas ao código-fonte principal:

| Spec | Nome da Feature | Status | Artefatos Entregues |
|---|---|---|---|
| `001` | **FAANG Anki Deck & Engine MVP** | Concluído | Motor de compilação estática (`src/generator.js`), validações e 550 cards iniciais. |
| `002` | **Atomic Media & Foundations (L2)** | Concluído | 108 cards de Primeiros Princípios (`CS-ARCH-CACHE-006`), mapeamento multi-tier. |
| `003` | **Public Multimedia Curation** | Concluído | Erradicação de placeholders, 453 diagramas SVGs inline, auditor de links (`link-checker.js`). |
| `004` | **AnkiWeb E2E & Visual Regression** | Concluído | Suíte Playwright E2E (`src/e2e/`), local runner (<1s) e 110 baselines golden multi-viewport. |

> *Nota: Os planos detalhados de tarefas e pesquisas técnicas dessas quatro features pioneiras estão preservados no histórico do Git.*
