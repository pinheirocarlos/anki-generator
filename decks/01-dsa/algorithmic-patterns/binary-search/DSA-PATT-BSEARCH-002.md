---
id: DSA-PATT-BSEARCH-002
title: "Busca Binária de Limites: Lower Bound vs Upper Bound"
tags:
  - level::l3-junior
  - topic::dsa::binary-search
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença conceitual e de invariante entre **Lower Bound** (primeira ocorrência) e **Upper Bound** (primeiro elemento maior que o alvo)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Lower Bound ($\ge \text{target}$)**: Encontra o primeiro índice $i$ onde $\text{arr}[i] \ge \text{target}$. Quando $\text{arr}[\text{mid}] \ge \text{target}$, guardamos `mid` como candidato e encolhemos a busca para a esquerda (`right = mid - 1`).
- **Upper Bound ($> \text{target}$)**: Encontra o primeiro índice $i$ onde $\text{arr}[i] > \text{target}$. Quando $\text{arr}[\text{mid}] > \text{target}$, guardamos `mid` e vamos para a esquerda (`right = mid - 1`).
- A contagem de elementos iguais ao alvo é dada por: $\text{count} = \text{upperBound} - \text{lowerBound}$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Invariantes de Busca Binária: lower_bound vs upper_bound</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">lower_bound(target)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Primeiro elemento onde arr[i] &gt;= target</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Início do intervalo de duplicatas</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">upper_bound(target)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Primeiro elemento onde arr[i] &gt; target</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Fim do intervalo de duplicatas</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Contagem de ocorrências de X em array ordenado: count = upper_bound(X) - lower_bound(X)</text>

</svg>
<p>Visualização: Invariantes de limites de busca binária: lower_bound (primeiro >= x) vs upper_bound (primeiro > x).</p>

| Algoritmo | Condição de Encolhimento para a Esquerda | Retorno Típico |
|---|---|---|
| **Lower Bound** | `arr[mid] >= target` | Primeiro índice com valor $\ge \text{target}$ |
| **Upper Bound** | `arr[mid] > target` | Primeiro índice com valor $> \text{target}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a base para resolver o problema clássico *Find First and Last Position of Element in Sorted Array* (LeetCode 34).

</details>
