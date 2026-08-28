---
id: DSA-STRUCT-ADVTREE-002
title: "Intuição e Estrutura da Segment Tree para Consultas de Intervalo em O(log N)"
tags:
  - level::l3-junior
  - topic::dsa::advanced-trees
  - company::meta
  - freq::high
---

## Pergunta
Como a **Segment Tree (Árvore de Segmentos)** decompõe intervalos para responder consultas associativas (soma, mínimo, GCD) em $O(\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Segment Tree** é uma árvore binária onde:
  - As folhas representam os elementos individuais do array original ($A[i]$).
  - Cada nó interno armazena o resultado agregado (soma, $\min$, $\max$) do seu intervalo correspondente $[L, R]$, calculado pela combinação dos seus dois filhos $[L, M]$ e $[M+1, R]$.
- Qualquer intervalo de consulta arbitrário $[Q_L, Q_R]$ pode ser decomposto em no máximo **$O(\log N)$ nós canônicos disjuntos** da árvore, calculando a resposta em $O(\log N)$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fenwick Tree (Binary Indexed Tree / BIT): Operações com i &amp; (-i)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Navegação Bitwise pelo LSB (Least Significant Bit)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Soma de prefixo: idx -= (idx &amp; -idx) descendo para a esquerda em O(log N).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Atualização pontual: idx += (idx &amp; -idx) subindo e atualizando os responsáveis em O(log N).</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Requer apenas 1 array de tamanho N (metade da memória da Segment Tree de 4N)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fenwick Tree (Binary Indexed Tree / BIT): Operações com i &amp; (-i)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Navegação Bitwise pelo LSB (Least Significant Bit)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Soma de prefixo: idx -= (idx &amp; -idx) descendo para a esquerda em O(log N).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Atualização pontual: idx += (idx &amp; -idx) subindo e atualizando os responsáveis em O(log N).</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Requer apenas 1 array de tamanho N (metade da memória da Segment Tree de 4N)</text>

</svg>

| Nível da Segment Tree | Intervalo Coberto | Operação Agregada |
|---|---|---|
| **Raiz** | $[0, N-1]$ | Soma total do array |
| **Nós Internos** | Metades recursivas $[L, M]$ e $[M+1, R]$ | $\text{soma}(\text{left}) + \text{soma}(\text{right})$ |
| **Folhas** | $[i, i]$ | Valor unitário $A[i]$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Capacidade do Array de Representação
Uma Segment Tree construída sobre $N$ elementos pode ser armazenada em um array contíguo de tamanho máximo **$4N$**, com o filho esquerdo em $2i+1$ e direito em $2i+2$.

#### Key Takeaways
- Funciona para qualquer operação matemática **associativa** (Soma, Mínimo, Máximo, MDC/GCD, Multiplicação de Matrizes).

</details>
