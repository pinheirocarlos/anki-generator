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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/elasticsearch-inverted-index-postings-list-loop.webm">
    <p>Visualização: Índice Invertido mapeando termos normalizados para Postings Lists com busca booleana e scoring BM25 em O(1).</p>
  </video>
</div>

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
