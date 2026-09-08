---
id: SYS-DB-VECTOR-000
title: "Mecanismo de Busca Invertida do Elasticsearch (Inverted Index) e BM25"
tags:
  - level::l3-junior
  - topic::sys::databases
  - company::elastic
  - freq::high
---

## Pergunta
Como a estrutura de Índice Invertido (Inverted Index) no Elasticsearch / Apache Lucene permite buscas textuais de alta velocidade em terabytes de dados?

## Resposta
### Quick Answer
**Solução Direta**:
- Em vez de mapear `Documento -> Texto`, o **Índice Invertido** analisa e tokeniza o texto criando um dicionário que mapeia cada **Termo único -> Lista de Documentos onde o termo ocorre** (*Posting List*).
- **Algoritmo de Relevância BM25 (Best Matching 25)**:
  - **Term Frequency (TF)**: Quantas vezes o termo aparece no documento (com saturação assintótica).
  - **Inverse Document Frequency (IDF)**: Quão raro o termo é no corpus inteiro (palavras raras recebem peso muito maior que palavras comuns).
  - **Document Length Normalization**: Penaliza documentos excessivamente longos.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Índice Invertido &amp; BM25 Scoring (Elasticsearch / Lucene)</text>
  <g transform="translate(40, 50)">
    <!-- Term Dictionary -->
    <rect x="0" y="0" width="200" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="100" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Term Dictionary (FST)</text>
    <text x="100" y="45" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">"distributed" →</text>
    <text x="100" y="68" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">"consensus"   →</text>
    <text x="100" y="90" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">"raft"        →</text>

    <!-- Postings Lists -->
    <rect x="230" y="0" width="370" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="415" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Postings Lists (DocID + Term Freq + Positions)</text>
    <text x="415" y="45" fill="#86efac" font-size="10" font-family="monospace" text-anchor="middle">[Doc 1 (tf:3), Doc 4 (tf:1), Doc 9 (tf:2)]</text>
    <text x="415" y="68" fill="#86efac" font-size="10" font-family="monospace" text-anchor="middle">[Doc 1 (tf:1), Doc 9 (tf:4)]</text>
    <text x="415" y="90" fill="#86efac" font-size="10" font-family="monospace" text-anchor="middle">[Doc 9 (tf:5)]</text>
  </g>
  <text x="340" y="195" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Interseção booleana via Roaring Bitmaps e ranking BM25 ponderado por TF-IDF em sub-milissegundos.</text>

</svg>
<p>Visualização: Índice Invertido mapeando termos normalizados para Postings Lists com busca booleana e scoring BM25 em O(1).</p>

| Termo Tokenizado | Posting List (IDs de Documentos com Frequência) |
|---|---|
| **"distributed"** | `Doc1 (freq=3)`, `Doc4 (freq=1)`, `Doc9 (freq=5)` |
| **"systems"** | `Doc1 (freq=2)`, `Doc2 (freq=1)`, `Doc4 (freq=4)` |
| **"database"** | `Doc3 (freq=8)`, `Doc4 (freq=2)`, `Doc7 (freq=1)` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Interseção de Posting Lists
- Uma busca por `"distributed AND systems"` executa uma **interseção de listas ordenadas** (via Skip Lists de Lucene) entre `[1, 4, 9]` e `[1, 2, 4]`, encontrando `Doc1` e `Doc4` em frações de milissegundo.

</details>
