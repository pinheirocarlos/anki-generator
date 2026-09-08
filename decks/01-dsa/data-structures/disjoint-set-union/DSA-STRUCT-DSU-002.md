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

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Operação find(x): Travessia de Pais até a Raiz Canônica (parent[root] == root)</text>
  
  <g transform="translate(60, 45)">
    <!-- Vetor parent -->
    <rect x="0" y="0" width="260" height="95" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6"/>
    <text x="130" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Vetor parent[]</text>
    <text x="25" y="42" fill="#94a3b8" font-size="11" font-family="monospace">Índice i:  0   1   2   3</text>
    <text x="25" y="62" fill="#34d399" font-size="11" font-family="monospace">parent[i]: 0   0   1   3</text>
    <text x="25" y="82" fill="#fcd34d" font-size="10">Raízes: parent[0]=0, parent[3]=3</text>

    <!-- Execução find(2) -->
    <g transform="translate(290, 0)">
      <rect x="0" y="0" width="270" height="95" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
      <text x="135" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Rastreio de find(2)</text>
      <text x="15" y="40" fill="#f8fafc" font-size="10">1. Inicia em x = 2 (parent[2] = 1)</text>
      <text x="15" y="58" fill="#f8fafc" font-size="10">2. Sobe para x = 1 (parent[1] = 0)</text>
      <text x="15" y="76" fill="#38bdf8" font-size="10" font-weight="bold">3. Chega em x = 0 (parent[0] == 0) ➔ Retorna 0</text>
    </g>
  </g>

  <text x="340" y="175" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Dois nós u e v estão no mesmo conjunto se e somente se find(u) == find(v)</text>
</svg>

<p>Visualização: Operação find percorrendo a cadeia de pais no array parent até alcançar a raiz canônica auto-referenciada.</p>

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
