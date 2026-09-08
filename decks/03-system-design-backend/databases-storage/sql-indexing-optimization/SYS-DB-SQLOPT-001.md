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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Regra do Prefixo Mais à Esquerda (Leftmost Prefix Rule) em Índices Compostos</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="35" rx="6" fill="#0284c7"/>
    <text x="300" y="22" fill="#ffffff" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle">CREATE INDEX idx_user ON users(company_id, department_id, created_at);</text>

    <g transform="translate(0, 48)">
      <rect x="0" y="0" width="190" height="65" rx="6" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="95" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">WHERE company_id = 1</text>
      <text x="95" y="45" fill="#86efac" font-size="9" text-anchor="middle">✅ Utiliza Índice (Prefixo A)</text>

      <rect x="205" y="0" width="190" height="65" rx="6" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="300" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">WHERE company &amp; dept</text>
      <text x="300" y="45" fill="#86efac" font-size="9" text-anchor="middle">✅ Utiliza Índice (Prefixo A, B)</text>

      <rect x="410" y="0" width="190" height="65" rx="6" fill="#7f1d1d" stroke="#f43f5e" stroke-width="1"/>
      <text x="505" y="22" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">WHERE department_id = 2</text>
      <text x="505" y="45" fill="#fca5a5" font-size="9" text-anchor="middle">❌ Full Table Scan (Ignora Índice)</text>
    </g>
  </g>
  <text x="340" y="195" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">A B+Tree é ordenada lexicograficamente: colunas sem o prefixo inicial quebram a navegação na árvore.</text>

</svg>
<p>Visualização: Regra do Prefixo Mais à Esquerda navegando na B+Tree composta (A, B, C) apenas quando a coluna antecedente é filtrada.</p>

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
