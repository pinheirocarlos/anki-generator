---
id: DSA-STRUCT-DSU-001
title: "Otimização DSU: Path Compression + Union by Rank e Complexidade O(α(N))"
tags:
  - level::l4-pleno
  - topic::dsa::disjoint-set-union
  - company::google
  - freq::high
---

## Pergunta
Por que a combinação de **Path Compression** com **Union by Rank** reduz o custo de operações do DSU para **$O(\alpha(N))$** quase constante?

## Resposta
### Quick Answer
**Solução Direta**:
- **Path Compression**: Durante o `find(x)`, faz todos os nós visitados no caminho apontarem diretamente para a raiz (`parent[x] = find(parent[x])`), achatando a árvore para altura $\approx 1$.
- **Union by Rank / Size**: Ao unir duas árvores, anexa a árvore de menor profundidade (*rank*) sob a raiz da de maior profundidade, impedindo crescimento descontrolado da altura.
- **Complexidade**: A combinação de ambas garante tempo amortizado $O(\alpha(N))$ por operação, onde $\alpha$ é a **Função Inversa de Ackermann** (para qualquer valor prático no universo $N \le 10^{80}$, $\alpha(N) \le 4$, ou seja, tempo efetivamente constante).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/dsu-path-compression-loop.webm">
    <p>Visualização: Achatamento da árvore de apontadores diretamente para a raiz na chamada de find() reduzindo a altura para quase 1.</p>
  </video>
</div>

| Otimização | Mecanismo | Efeito na Árvore |
|---|---|---|
| **Path Compression** | `parent[x] = find(parent[x])` | Achata os ramos visitados |
| **Union by Rank** | Conecta menor árvore sob a maior | Limita altura a $O(\log N)$ |
| **Ambos Juntos** | Amortização máxima | $O(\alpha(N)) \approx O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: DSU Ótimo Canônico
```java
public class OptimizedDSU {
  private final int[] parent;
  private final int[] rank;
  private int count;

  public OptimizedDSU(int n) {
    this.parent = new int[n];
    this.rank = new int[n];
    this.count = n;
    for (int i = 0; i < n; i++) parent[i] = i;
  }

  public int find(int x) {
    if (parent[x] != x) {
      parent[x] = find(parent[x]); // Path Compression
    }
    return parent[x];
  }

  public boolean union(int x, int y) {
    int rootX = find(x);
    int rootY = find(y);
    if (rootX == rootY) return false;

    // Union by Rank
    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }
    count--;
    return true;
  }

  public int getCount() { return count; }
}
```

#### Key Takeaways
- Sem Path Compression e Union by Rank, o DSU pode degradar para $O(N)$ por operação. Com ambos, é praticamente $O(1)$.

</details>
