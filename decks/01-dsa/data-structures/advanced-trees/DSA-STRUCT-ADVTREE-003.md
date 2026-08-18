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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/fenwick-tree-lsb-jumps-loop.webm">
    <p>Visualização: Navegação por saltos de índices usando isolamento do bit menos significativo i & (-i).</p>
  </video>
</div>

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
