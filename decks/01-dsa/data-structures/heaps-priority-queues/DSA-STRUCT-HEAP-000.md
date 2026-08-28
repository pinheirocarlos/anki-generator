---
id: DSA-STRUCT-HEAP-000
title: "Propriedade e Invariante de Heap Binário (Min-Heap vs Max-Heap)"
tags:
  - level::l3-junior
  - topic::dsa::heaps-priority-queues
  - company::amazon
  - freq::high
---

## Pergunta
O que é a propriedade estrutural e a invariante de ordenação de um **Heap Binário** (Min-Heap e Max-Heap)?

## Resposta
### Quick Answer
**Solução Direta**:
- Um Heap Binário é uma **Árvore Binária Completa** que satisfaz a invariante de heap:
  - **Min-Heap**: Para todo nó $i$, o valor do nó pai é menor ou igual ao valor de seus filhos ($\text{pai} \le \text{filhos}$). O elemento mínimo global reside sempre na **raiz** ($O(1)$).
  - **Max-Heap**: Para todo nó $i$, o valor do nó pai é maior ou igual ao de seus filhos ($\text{pai} \ge \text{filhos}$). O elemento máximo reside na raiz.
- A estrutura não impõe ordenação horizontal estrita entre nós irmãos, apenas vertical entre pais e descendentes.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Representação de Heap Binário em Array Contíguo</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="70" height="40" fill="#047857" stroke="#10b981" rx="4"/><text x="35" y="25" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">100 [0]</text>
    <rect x="80" y="0" width="70" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="115" y="25" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">19 [1]</text>
    <rect x="160" y="0" width="70" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="195" y="25" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">36 [2]</text>
    <rect x="240" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="275" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">17 [3]</text>
    <rect x="320" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="355" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">3 [4]</text>
    <rect x="400" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="435" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">25 [5]</text>
    <rect x="480" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="515" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">1 [6]</text>
  </g>
  <rect x="100" y="115" width="480" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
  <text x="340" y="133" fill="#34d399" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle">Pai(i) = (i - 1) / 2  |  FilhoEsq(i) = 2i + 1  |  FilhoDir(i) = 2i + 2</text>
  <text x="340" y="148" fill="#94a3b8" font-size="10" text-anchor="middle">Acesso a parentes via aritmética de índices sem alocar ponteiros extras</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Representação de Heap Binário em Array Contíguo</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="70" height="40" fill="#047857" stroke="#10b981" rx="4"/><text x="35" y="25" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">100 [0]</text>
    <rect x="80" y="0" width="70" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="115" y="25" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">19 [1]</text>
    <rect x="160" y="0" width="70" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="195" y="25" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">36 [2]</text>
    <rect x="240" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="275" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">17 [3]</text>
    <rect x="320" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="355" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">3 [4]</text>
    <rect x="400" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="435" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">25 [5]</text>
    <rect x="480" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="515" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">1 [6]</text>
  </g>
  <rect x="100" y="115" width="480" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
  <text x="340" y="133" fill="#34d399" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle">Pai(i) = (i - 1) / 2  |  FilhoEsq(i) = 2i + 1  |  FilhoDir(i) = 2i + 2</text>
  <text x="340" y="148" fill="#94a3b8" font-size="10" text-anchor="middle">Acesso a parentes via aritmética de índices sem alocar ponteiros extras</text>

</svg>

| Tipo de Heap | Invariante de Nó | Elemento na Raiz |
|---|---|---|
| **Min-Heap** | $\text{pai} \le \text{filhos}$ | Menor valor global ($O(1)$) |
| **Max-Heap** | $\text{pai} \ge \text{filhos}$ | Maior valor global ($O(1)$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Como a árvore é completa, a altura é estritamente garantida como $H = \lfloor \log_2 N \rfloor$, evitando qualquer risco de degeneração.

</details>
