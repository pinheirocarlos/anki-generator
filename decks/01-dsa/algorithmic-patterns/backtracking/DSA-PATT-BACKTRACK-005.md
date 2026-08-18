---
id: DSA-PATT-BACKTRACK-005
title: "Word Search II com Acoplamento de Trie e Backtracking em Matriz 2D"
tags:
  - level::l4-pleno
  - topic::dsa::backtracking
  - company::amazon
  - freq::high
---

## Pergunta
Por que acoplar uma **Trie** ao Backtracking em **Word Search II** (LeetCode 212) é exponencialmente mais rápido que rodar Word Search I para cada palavra?

## Resposta
### Quick Answer
**Solução Direta**:
- Executar Backtracking individual para $K$ palavras no tabuleiro $M \times N$ custa $O(K \times M \cdot N \cdot 4^L)$.
- **Acoplamento com Trie ($O(M \cdot N \cdot 4^L)$)**:
  1. Inserimos todas as $K$ palavras em uma **Trie**.
  2. Disparamos a DFS a partir de cada célula $(r, c)$ do tabuleiro, caminhando simultaneamente no tabuleiro e nos nós da Trie.
  3. **Poda Instantânea**: Se o caractere atual da grade não for filho do nó atual da Trie (`currNode.children[c] == null`), abortamos a DFS imediatamente.
  4. Uma única busca no tabuleiro valida todas as $K$ palavras em paralelo.

### Dual Coding Visual
| Abordagem | Número de Buscas no Tabuleiro | Complexidade |
|---|---|---|
| **Busca Individual por Palavra** | $K$ buscas independentes | $O(K \cdot M \cdot N \cdot 4^L)$ |
| **Trie + Backtracking Combinado** | 1 única busca global | $O(M \cdot N \cdot 4^L)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização Extra: Remoção de Folhas da Trie
Ao encontrar uma palavra válida, marcamos `currNode.word = null` e podamos nós da Trie que ficaram sem filhos para não reencontrar a mesma palavra em outros caminhos.

#### Key Takeaways
- É um exemplo perfeito de fusão de estruturas de dados (Trie) com padrões de exploração (Backtracking).

</details>
