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
