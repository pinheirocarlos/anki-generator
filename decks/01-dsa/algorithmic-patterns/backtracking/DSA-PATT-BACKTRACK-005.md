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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Knuth's Dancing Links (DLX): Algoritmo X para Cobertura Exata</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Listas Duplamente Ligadas Circulares em 4 Direções (L, R, U, D)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Remove colunas e linhas cobrindo nós em O(1); restaura perfeitamente no backtrack.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Resolve problemas complexos de pentaminós, Sudoku e Cobertura de Conjuntos em tempo recorde.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Obra-prima de Donald Knuth para backtracking ultra-otimizado</text>

</svg>

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
