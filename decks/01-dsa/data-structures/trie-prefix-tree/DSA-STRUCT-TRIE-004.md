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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bitwise Trie: Consulta de Maximum XOR de Pares em O(32)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Trie Binária (Filhos 0 e 1)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Para maximizar o XOR com o número X bit a bit (do bit 31 ao 0):</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Se o bit atual de X é 0, escolhe descer pelo ramo 1 (e vice-versa). Custo = O(32 × N) = O(N).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Transforma busca por força bruta O(N²) de XOR em tempo linear O(N)</text>

</svg>
<p>Visualização: Navegação gulosa em Bitwise Trie priorizando o bit oposto (1 - b) para maximizar o resultado da operação XOR em O(32).</p>

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
