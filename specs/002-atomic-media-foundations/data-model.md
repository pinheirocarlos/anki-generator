# Phase 1 Data Model & Contracts: Atomic Cards, Multimedia & Foundations

**Feature**: `002-atomic-media-foundations` | **Date**: 2026-08-17

---

## 1. Entities & Schema Definitions

### 1.1 Flashcard Entity (`.md` File)

Cada flashcard é representado por um arquivo Markdown isolado com metadados estruturados em Frontmatter YAML e corpo semântico:

```yaml
---
id: string (matching ^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[0-9]{3}$)
title: string (length between 3 and 120 chars)
tags:
  - "level::l2-fundamental" | "level::l3-junior" | "level::l4-pleno" | "level::l5-senior"
  - "topic::<phase>::<subtopic>"
  - "company::<company_name>" (optional)
  - "freq::high" | "freq::medium" | "freq::low"
---
```

#### Content Body Rules:
1. **Seção `## Pergunta`**:
   - Exatamente um cabeçalho `## Pergunta`.
   - Texto objetivo com no máximo **1 ponto de interrogação** ou **1 única proposição interrogativa direta**.
   - Proibição estrita de perguntas compostas aglutinando múltiplos tópicos não-relacionados.
2. **Seção `## Resposta`**:
   - Exatamente um cabeçalho `## Resposta`.
   - Subseção `### Quick Answer`: Resposta direta avaliável em <15s com badges de complexidade ($O(1)$, $O(N)$).
   - Subseção `### Dual Coding Visual`: Mídia visual de alto impacto (Micro-vídeo em loop, SVG responsivo com `viewBox` ou tabela comparativa $\le 3$ colunas).
   - Subseção `<details><summary>Deep Dive & Walkthrough</summary>`: Aprofundamentos, snippets de código concisos em Go/Java e trade-offs.

---

### 1.2 Updated Level Taxonomy

| Level Tag | Target Persona | Foco Pedagógico | Padrão Visual no CSS |
|---|---|---|---|
| `level::l2-fundamental` | Nivelamento / Iniciante | Intuição, metáforas cotidianas, primeiros princípios, zero jargão assumido | Badge Esmeralda (`#10b981`) |
| `level::l3-junior` | Júnior / New Grad | Mecânica básica, complexidade de tempo/espaço, estruturas fundamentais | Badge Azul Real (`#3b82f6`) |
| `level::l4-pleno` | Pleno / Mid-Level | Implementações idiomáticas, concorrência, otimização de cache/I/O e trade-offs | Badge Roxo Violeta (`#8b5cf6`) |
| `level::l5-senior` | Sênior / Staff | Sistemas distribuídos em escala, resiliência extrema, falhas parciais e mitigação | Badge Âmbar Dourado (`#f59e0b`) |

---

### 1.3 Media Resource Contract

Todo recurso de mídia inserido no baralho deve atender a uma das seguintes tipagens:

```html
<!-- Micro-Vídeo Mobile-First (Prioridade 1) -->
<video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback>
  <source src="https://..." type="video/webm">
  <source src="https://..." type="video/mp4">
</video>

<!-- SVG Declarativo Responsivo (Prioridade 2) -->
<svg viewBox="0 0 600 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <!-- Elementos vetoriais com cores semânticas -->
</svg>

<!-- Tabela Compacta Responsiva (Prioridade 3) -->
| Conceito | Tempo | Espaço |
|---|---|---|
| **Operação A** | $O(1)$ | $O(1)$ |
```

---

## 2. Curriculum Manifest Schema (`syllabus_manifest.json`)

O manifesto central de currículo rastreia todos os subtópicos e garante a integridade bidirecional dos IDs:

```json
{
  "version": "1.2.0",
  "last_updated": "2026-08-17",
  "phases": [
    {
      "id": "01-dsa",
      "title": "Estruturas de Dados & Algoritmos (DSA / LeetCode Mastery)",
      "modules": [
        {
          "id": "data-structures",
          "title": "Estruturas de Dados Fundamentais e Avançadas",
          "subtopics": [
            {
              "id": "arrays-strings",
              "title": "Vetores Dinâmicos, Manipulação de Strings, Matrizes e Buffers Contíguos",
              "status": "completed",
              "card_ids": [
                "DSA-STRUCT-ARRAY-000",
                "DSA-STRUCT-ARRAY-001",
                "DSA-STRUCT-ARRAY-002",
                "DSA-STRUCT-ARRAY-003"
              ]
            }
          ]
        }
      ]
    }
  ]
}
```
