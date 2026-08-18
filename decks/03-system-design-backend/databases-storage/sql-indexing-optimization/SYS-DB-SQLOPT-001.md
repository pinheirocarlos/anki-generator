---
id: SYS-DB-SQLOPT-001
title: "Índices Compostos e a Regra do Prefixo Mais à Esquerda (Leftmost Prefix Rule)"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::meta
  - freq::high
---

## Pergunta
Como a regra do Prefixo Mais à Esquerda (*Leftmost Prefix Rule*) determina a eficácia de um índice composto `(A, B, C)` em consultas SQL?

## Resposta
### Quick Answer
**Solução Direta**:
- Um índice composto `INDEX(A, B, C)` ordena os dados primeiramente por $A$; para valores idênticos de $A$, ordena por $B$; para valores idênticos de $B$, ordena por $C$.
- **Consultas que APROVEITAM o Índice**:
  - `WHERE A = 1` (Usa $A$)
  - `WHERE A = 1 AND B = 2` (Usa $A$ e $B$)
  - `WHERE A = 1 AND B = 2 AND C = 3` (Usa $A, B$ e $C$)
  - `WHERE A = 1 AND B > 2 AND C = 3` (Usa $A$ e $B$; após a condição de faixa em $B$, $C$ não é usado para index range scan).
- **Consultas que NÃO APROVEITAM o Índice**:
  - `WHERE B = 2` ou `WHERE C = 3` ou `WHERE B = 2 AND C = 3` (Não iniciam pelo prefixo $A$, exigindo *Full Table Scan* ou *Index Full Scan*).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/sql-composite-index-leftmost-prefix-loop.webm">
    <p>Visualização: Regra do Prefixo Mais à Esquerda navegando na B+Tree composta (A, B, C) apenas quando a coluna antecedente é filtrada.</p>
  </video>
</div>

| Cláusula WHERE | Uso do Índice `(A, B, C)` | Tipo de Execução |
|---|---|---|
| `WHERE A = 1 AND B = 5` | Total para $A$ e $B$ | Index Range Scan |
| `WHERE A = 1 AND C = 9` | Parcial (Usa $A$, filtra $C$ em memória) | Index Range Scan em $A$ |
| `WHERE B = 5 AND C = 9` | Nulo (Sem o prefixo $A$) | Full Table Scan |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Dica de Ouro de Cardinalidade
- Coloque no início do índice composto as colunas de **maior seletividade/cardinalidade** que são frequentemente filtradas com igualdade (`=`).

</details>
