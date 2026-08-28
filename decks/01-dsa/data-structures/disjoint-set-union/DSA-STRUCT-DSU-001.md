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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Otimização de Path Compression (Compressão de Caminhos)</text>
  <g transform="translate(80, 50)">
    <!-- Deep Chain -->
    <text x="80" y="10" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Antes de find(4)</text>
    <circle cx="80" cy="30" r="12" fill="#047857"/><text x="80" y="34" fill="#fff" font-size="9" text-anchor="middle">R</text>
    <line x1="80" y1="42" x2="80" y2="58" stroke="#64748b"/>
    <circle cx="80" cy="70" r="10" fill="#1e293b" stroke="#475569"/><text x="80" y="73" fill="#fff" font-size="8" text-anchor="middle">2</text>
    <line x1="80" y1="80" x2="80" y2="95" stroke="#64748b"/>
    <circle cx="80" cy="105" r="10" fill="#1e293b" stroke="#3b82f6"/><text x="80" y="108" fill="#fff" font-size="8" text-anchor="middle">4</text>

    <!-- Arrow -->
    <path d="M 170 65 L 230 65" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrow)"/>

    <!-- Flat -->
    <g transform="translate(300, 0)">
      <text x="80" y="10" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Após Compressão: parent[x] = find(parent[x])</text>
      <circle cx="80" cy="30" r="14" fill="#047857" stroke="#10b981"/><text x="80" y="34" fill="#fff" font-size="10" text-anchor="middle">R</text>
      <line x1="68" y1="40" x2="40" y2="70" stroke="#10b981"/>
      <circle cx="35" cy="80" r="10" fill="#1e293b" stroke="#10b981"/><text x="35" y="83" fill="#fff" font-size="8" text-anchor="middle">2</text>
      <line x1="92" y1="40" x2="120" y2="70" stroke="#10b981"/>
      <circle cx="125" cy="80" r="10" fill="#1e293b" stroke="#10b981"/><text x="125" y="83" fill="#fff" font-size="8" text-anchor="middle">4</text>
    </g>
  </g>
  <text x="340" y="175" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Conecta todos os nós visitados diretamente à raiz, achatando a árvore para altura 1</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Otimização de Path Compression (Compressão de Caminhos)</text>
  <g transform="translate(80, 50)">
    <!-- Deep Chain -->
    <text x="80" y="10" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Antes de find(4)</text>
    <circle cx="80" cy="30" r="12" fill="#047857"/><text x="80" y="34" fill="#fff" font-size="9" text-anchor="middle">R</text>
    <line x1="80" y1="42" x2="80" y2="58" stroke="#64748b"/>
    <circle cx="80" cy="70" r="10" fill="#1e293b" stroke="#475569"/><text x="80" y="73" fill="#fff" font-size="8" text-anchor="middle">2</text>
    <line x1="80" y1="80" x2="80" y2="95" stroke="#64748b"/>
    <circle cx="80" cy="105" r="10" fill="#1e293b" stroke="#3b82f6"/><text x="80" y="108" fill="#fff" font-size="8" text-anchor="middle">4</text>

    <!-- Arrow -->
    <path d="M 170 65 L 230 65" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrow)"/>

    <!-- Flat -->
    <g transform="translate(300, 0)">
      <text x="80" y="10" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Após Compressão: parent[x] = find(parent[x])</text>
      <circle cx="80" cy="30" r="14" fill="#047857" stroke="#10b981"/><text x="80" y="34" fill="#fff" font-size="10" text-anchor="middle">R</text>
      <line x1="68" y1="40" x2="40" y2="70" stroke="#10b981"/>
      <circle cx="35" cy="80" r="10" fill="#1e293b" stroke="#10b981"/><text x="35" y="83" fill="#fff" font-size="8" text-anchor="middle">2</text>
      <line x1="92" y1="40" x2="120" y2="70" stroke="#10b981"/>
      <circle cx="125" cy="80" r="10" fill="#1e293b" stroke="#10b981"/><text x="125" y="83" fill="#fff" font-size="8" text-anchor="middle">4</text>
    </g>
  </g>
  <text x="340" y="175" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Conecta todos os nós visitados diretamente à raiz, achatando a árvore para altura 1</text>

</svg>

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
