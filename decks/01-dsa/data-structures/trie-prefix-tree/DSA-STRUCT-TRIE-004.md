---
id: DSA-STRUCT-TRIE-004
title: "Bitwise Trie (Trie Binária) para Maximum XOR de Dois Números em O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::trie-prefix-tree
  - company::meta
  - freq::high
---

## Pergunta
Como uma **Bitwise Trie (Trie Binária de Bits)** resolve o problema clássico de *Maximum XOR of Two Numbers in an Array* em tempo linear $O(32N) = O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Inserimos a representação binária de 32 bits de todos os $N$ números em uma Trie onde cada nó possui apenas 2 filhos: `children[0]` e `children[1]`.
- Para cada número $X$:
  - Para cada bit $b$ de $X$ (do bit mais significativo 31 ao 0), tentamos gulosamente navegar pelo bit oposto $1 - b$ na Trie (pois $b \oplus (1-b) = 1$, maximizando o bit resultante).
  - Se o caminho com o bit oposto existir, somamos $2^k$ ao resultado; se não existir, seguimos pelo caminho do próprio bit $b$.
- **Complexidade**: $O(32N) = O(N)$ linear contra $O(N^2)$ da força bruta com pares.

### Dual Coding Visual
| Abordagem | Tempo de Execução | Decisão de Bit em Cada Passo |
|---|---|---|
| **Pares Força Bruta** | $O(N^2)$ Quadrático | Nenhuma ($N^2$ cálculos) |
| **Bitwise Trie** | $O(32N) = O(N)$ | Escolhe gulosa do bit oposto $1-b$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Bitwise Trie XOR
```java
public class BitwiseTrieXOR {
  private static class Node {
    Node[] children = new Node[2];
  }

  private final Node root = new Node();

  public void insert(int num) {
    Node curr = root;
    for (int i = 31; i >= 0; i--) {
      int bit = (num >> i) & 1;
      if (curr.children[bit] == null) curr.children[bit] = new Node();
      curr = curr.children[bit];
    }
  }

  public int findMaxXOR(int num) {
    Node curr = root;
    int maxVal = 0;
    for (int i = 31; i >= 0; i--) {
      int bit = (num >> i) & 1;
      int oppBit = 1 - bit;
      if (curr.children[oppBit] != null) {
        maxVal |= (1 << i);
        curr = curr.children[oppBit];
      } else {
        curr = curr.children[bit];
      }
    }
    return maxVal;
  }
}
```

#### Key Takeaways
- Bitwise Tries são o padrão ouro para problemas de otimização de operações bitwise com restrições lineares.

</details>
