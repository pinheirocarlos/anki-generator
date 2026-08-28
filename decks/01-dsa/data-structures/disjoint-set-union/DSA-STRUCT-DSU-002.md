---
id: DSA-STRUCT-DSU-002
title: "Operação Find e Busca de Representante Canônico em DSU"
tags:
  - level::l3-junior
  - topic::dsa::disjoint-set-union
  - company::google
  - freq::high
---

## Pergunta
Como a operação **`find`** localiza a raiz canônica de um elemento em um DSU seguindo ponteiros de pais?

## Resposta
### Quick Answer
**Solução Direta**:
- Cada nó mantém um ponteiro para seu nó pai em um array `parent[]`.
- Inicialmente, todo elemento é seu próprio pai (`parent[i] = i`), formando $N$ conjuntos unitários.
- Ao chamar `find(x)`:
  - Segue-se a cadeia de pais recursivamente (`x = parent[x]`) até encontrar o nó raiz onde `parent[root] == root`.
  - Retorna esse nó raiz representativo.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">União por Rank ou Tamanho (Union by Rank)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Regra: Conecta a raiz da árvore mais rasa sob a raiz da mais profunda</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se rank(rootA) &lt; rank(rootB) → parent[rootA] = rootB (altura total não cresce).</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Se rank(rootA) == rank(rootB) → parent[rootB] = rootA; rank(rootA)++.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Garante altura máxima de O(log N) mesmo sem compressão de caminhos</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">União por Rank ou Tamanho (Union by Rank)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Regra: Conecta a raiz da árvore mais rasa sob a raiz da mais profunda</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se rank(rootA) &lt; rank(rootB) → parent[rootA] = rootB (altura total não cresce).</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Se rank(rootA) == rank(rootB) → parent[rootB] = rootA; rank(rootA)++.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Garante altura máxima de O(log N) mesmo sem compressão de caminhos</text>

</svg>

| Estado de Nó | Condição no Array | Papel Estrutural |
|---|---|---|
| **Nó Raiz (Líder)** | `parent[i] == i` | Representante oficial do grupo |
| **Nó Interno** | `parent[i] != i` | Aponta para pai na hierarquia |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Find Básico
```java
public class BasicDSU {
  private int[] parent;

  public BasicDSU(int n) {
    parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
  }

  public int find(int x) {
    while (x != parent[x]) {
      x = parent[x];
    }
    return x;
  }
}
```

#### Key Takeaways
- Sem otimizações, a cadeia de ponteiros pode degenerar em uma linha de comprimento $O(N)$, tornando o `find` linear.

</details>
