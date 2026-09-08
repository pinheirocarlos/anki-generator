---
id: DSA-PATT-DPADV-000
title: "Programação Dinâmica em Árvores (Tree DP): House Robber III em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-advanced
  - company::google
  - freq::high
---

## Pergunta
Como a **Programação Dinâmica em Árvores (Tree DP)** calcula valores ótimos em pós-ordem retornando tuplas de estado em tempo $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Em Tree DP, executamos uma travessia pós-ordem (Bottom-Up) onde cada nó retorna uma tupla com os estados da sua subárvore.
- Em **House Robber III** (onde não podemos roubar nós diretamente conectados por aresta):
  - Cada chamada recursiva retorna um par `[robRoot, notRobRoot]`:
    - `robRoot`: $\text{node.val} + \text{left.notRob} + \text{right.notRob}$.
    - `notRobRoot`: $\max(\text{left.rob}, \text{left.notRob}) + \max(\text{right.rob}, \text{right.notRob})$.
- **Complexidade**: $O(N)$ tempo (visita cada nó 1 vez) e $O(H)$ espaço de pilha.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Tree DP (House Robber III): Par de Estados [rob, not_rob] em Pós-Ordem</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Propagação Bottom-Up dos Filhos para os Pais</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">rob = root.val + left.not_rob + right.not_rob (não rouba filhos diretos).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">not_rob = max(left.rob, left.not_rob) + max(right.rob, right.not_rob).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">DFS única em pós-ordem resolvendo a árvore inteira em tempo linear estrito O(N)</text>
</svg>
<p>Visualização: Programação Dinâmica em Árvore computando recursivamente pares de estados (rob, not_rob) em pós-ordem O(N).</p>
| Estado Retornado | Relação com Filhos | Fórmula de Ganho |
|---|---|---|
| **Roubar Raiz** | Obriga a NÃO roubar filhos | $\text{node.val} + \text{filhos.notRob}$ |
| **Não Roubar Raiz** | Livre para roubar ou não | $\max(\text{filho.rob}, \text{filho.notRob})$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: House Robber III
```java
public class HouseRobberIII {
  public int rob(TreeNode root) {
    int[] res = dfs(root);
    return Math.max(res[0], res[1]);
  }

  private int[] dfs(TreeNode node) {
    if (node == null) return new int[]{0, 0};
    int[] left = dfs(node.left);
    int[] right = dfs(node.right);

    int rob = node.val + left[1] + right[1];
    int notRob = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    return new int[]{rob, notRob};
  }
}
```

#### Key Takeaways
- Retornar o par de estados na recursão elimina a sobreposição de chamadas que degradaria a solução ingênua para tempo exponencial $O(2^N)$.

</details>
