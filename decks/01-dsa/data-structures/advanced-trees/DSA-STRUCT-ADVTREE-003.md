---
id: DSA-STRUCT-ADVTREE-003
title: "Fenwick Tree (Binary Indexed Tree) e Isolamento do Bit Menos Significativo"
tags:
  - level::l3-junior
  - topic::dsa::advanced-trees
  - company::google
  - freq::high
---

## Pergunta
Como a **Fenwick Tree (Binary Indexed Tree - BIT)** utiliza a operação bitwise `i & (-i)` para consultas de prefixo e atualizações em $O(\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Fenwick Tree** mantém um array $T$ de tamanho $N+1$ (1-indexed) onde cada posição $i$ é responsável pela soma de um intervalo de tamanho $\text{LSB}(i) = i \ \& \ (-i)$ (o bit menos significativo isolado em complemento de dois):
  - **Consulta de Prefixo `query(i)`**: Soma $T[i]$ e remove o LSB (`i -= i & (-i)`) até $i=0$ ($O(\log N)$).
  - **Atualização Pontual `update(i, val)`**: Soma `val` em $T[i]$ e adiciona o LSB (`i += i & (-i)`) propagando até $N$ ($O(\log N)$).
- **Vantagem sobre Segment Tree**: Consome apenas **$1N$** de espaço (contra $4N$) e seu código possui menos de 10 linhas.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Treap (Tree + Heap): Balanceamento Probabilístico com Prioridades Aleatórias</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Invariante Dupla: BST na Chave + Max-Heap na Prioridade</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Cada nó gera uma prioridade aleatória rand(). Insere como BST e restaura Heap com rotações.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Garante altura esperada de O(log N) sem algoritmos complexos de rebalanceamento.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Facilita operações poderosas de Split(k) e Merge(T1, T2) em tempo O(log N)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Treap (Tree + Heap): Balanceamento Probabilístico com Prioridades Aleatórias</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Invariante Dupla: BST na Chave + Max-Heap na Prioridade</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Cada nó gera uma prioridade aleatória rand(). Insere como BST e restaura Heap com rotações.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Garante altura esperada de O(log N) sem algoritmos complexos de rebalanceamento.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Facilita operações poderosas de Split(k) e Merge(T1, T2) em tempo O(log N)</text>

</svg>

| Operação em Fenwick | Operação Bitwise de Passo | Complexidade |
|---|---|---|
| **`query(i)` (Prefixo)** | `i -= i & (-i)` (Remove LSB) | $O(\log N)$ |
| **`update(i, delta)`** | `i += i & (-i)` (Soma LSB) | $O(\log N)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Fenwick Tree Canônica
```java
public class FenwickTree {
  private final int[] tree;

  public FenwickTree(int n) {
    this.tree = new int[n + 1];
  }

  public void update(int i, int delta) {
    for (; i < tree.length; i += i & (-i)) {
      tree[i] += delta;
    }
  }

  public int query(int i) {
    int sum = 0;
    for (; i > 0; i -= i & (-i)) {
      sum += tree[i];
    }
    return sum;
  }

  public int queryRange(int l, int r) {
    return query(r) - query(l - 1);
  }
}
```

#### Key Takeaways
- A Fenwick Tree é a estrutura mais concisa e rápida para Range Sum Queries com Point Updates.

</details>
