---
id: DSA-PATT-MONOSTACK-000
title: "Definição e Invariante de Monotonic Stack (Crescente vs Decrescente)"
tags:
  - level::l3-junior
  - topic::dsa::monotonic-stack-queue
  - company::meta
  - freq::high
---

## Pergunta
Qual é a invariante estrutural de uma **Monotonic Stack** e quando escolher uma pilha monótona crescente versus decrescente?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Monotonic Stack** é uma pilha onde os elementos são mantidos estritamente ordenados da base até o topo:
  - **Monótona Crescente**: Elementos aumentam da base para o topo ($A[\text{base}] < \dots < A[\text{topo}]$). Usada para encontrar o **Previous / Next Smaller Element**.
  - **Monótona Decrescente**: Elementos diminuem da base para o topo ($A[\text{base}] > \dots > A[\text{topo}]$). Usada para encontrar o **Previous / Next Greater Element**.
- Ao inserir $x$, desempilhamos todos os elementos que violam a invariante de ordem, garantindo amortização total de $O(N)$ linear.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Pilha Monotônica Crescente vs Decrescente</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Monotônica Crescente (Base → Topo)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Itens: [ 1, 3, 5, 8 ] (Cresce até o topo)</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Encontra: Próximo Menor Elemento (NSE)</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Monotônica Decrescente</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Itens: [ 8, 5, 3, 1 ] (Diminui até o topo)</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Encontra: Próximo Maior Elemento (NGE)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Mantém a invariante desempilhando violadores antes de cada push: Custo Amortizado O(1)</text>

</svg>

<p>Visualização: Remoção de elementos dominados mantendo a ordem estrita crescente ou decrescente.</p>


| Tipo de Pilha Monótona | Ordem da Base ao Topo | Objetivo de Busca |
|---|---|---|
| **Crescente** | Valores aumentam | Próximo / Anterior **Menor** |
| **Decrescente** | Valores diminuem | Próximo / Anterior **Maior** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Como cada elemento entra e sai da pilha no máximo uma vez, a complexidade total sobre todo o array de tamanho $N$ é estritamente $O(2N) = O(N)$.

</details>
