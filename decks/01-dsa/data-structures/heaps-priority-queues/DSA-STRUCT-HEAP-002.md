---
id: DSA-STRUCT-HEAP-002
title: "Representação Compacta de Heap Binário em Array Contíguo sem Ponteiros"
tags:
  - level::l3-junior
  - topic::dsa::heaps-priority-queues
  - company::google
  - freq::high
---

## Pergunta
Por que um Heap Binário pode ser representado compactamente em um **array contíguo sem ponteiros** e quais são as fórmulas de indexação?

## Resposta
### Quick Answer
**Solução Direta**:
- Como um Heap é uma árvore binária completa (preenchida nível por nível da esquerda para a direita), não existem "buracos" na estrutura.
- Cada nó no índice $i$ (indexação 0-based) mapeia diretamente para seus parentes via fórmulas aritméticas rápidas:
  - **Pai**: $\lfloor (i - 1) / 2 \rfloor$
  - **Filho Esquerdo**: $2i + 1$
  - **Filho Direito**: $2i + 2$
- Isso elimina 100% dos ponteiros de árvore, resultando em localidade de cache perfeita e zero overhead de memória.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Construção Linear de Heap: Build-Heap em Tempo O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Bottom-Up Heapify a partir do último nó não-folha (N/2 - 1)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">A maioria dos nós reside nos níveis inferiores (folhas não precisam de heapify).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11" font-family="monospace">Somatório Σ (h / 2^h) converge para 2 → Custo Total Estrito = O(N)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Construir heap elemento a elemento custa O(N log N); Build-Heap reduz para O(N)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Construção Linear de Heap: Build-Heap em Tempo O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Bottom-Up Heapify a partir do último nó não-folha (N/2 - 1)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">A maioria dos nós reside nos níveis inferiores (folhas não precisam de heapify).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11" font-family="monospace">Somatório Σ (h / 2^h) converge para 2 → Custo Total Estrito = O(N)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Construir heap elemento a elemento custa O(N log N); Build-Heap reduz para O(N)</text>

</svg>

| Relação Familiar | Fórmula (0-Indexed) | Exemplo para Índice $i = 2$ |
|---|---|---|
| **Pai** | $(i - 1) / 2$ | $(2 - 1) / 2 = 0$ (Raiz) |
| **Filho Esquerdo** | $2i + 1$ | $2(2) + 1 = 5$ |
| **Filho Direito** | $2i + 2$ | $2(2) + 2 = 6$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O mapeamento em array contíguo torna o Heap uma das estruturas mais rápidas e eficientes em memória na computação.

</details>
