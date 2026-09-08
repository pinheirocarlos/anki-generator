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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Word Search II: Backtracking em Grid 2D com Prefix-Tree (Trie)</text>
  <g transform="translate(60, 45)">
    <!-- Matriz 2D -->
    <rect x="0" y="0" width="160" height="85" fill="#1e293b" stroke="#3b82f6" rx="4"/>
    <text x="80" y="18" fill="#60a5fa" font-size="10" font-weight="bold" text-anchor="middle">Grade 2D (Board)</text>
    <rect x="15" y="28" width="25" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="27" y="43" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">O</text>
    <rect x="45" y="28" width="25" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="57" y="43" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">A</text>
    <rect x="75" y="28" width="25" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="87" y="43" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">T</text>
    <rect x="105" y="28" width="25" height="22" fill="#065f46" stroke="#10b981" rx="2"/><text x="117" y="43" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">H</text>
    <text x="80" y="72" fill="#34d399" font-size="9" text-anchor="middle">Marca '#' in-place e desfaz</text>

    <!-- Trie Sync -->
    <rect x="200" y="0" width="360" height="85" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="380" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Navegação Conjunta no Trie: O ➔ A ➔ T ➔ H (Word!)</text>
    <text x="215" y="42" fill="#f8fafc" font-size="10">• Se nó do Trie não tem filho para o caractere ➔ Poda imediata!</text>
    <text x="215" y="58" fill="#fcd34d" font-size="10">• Ao encontrar palavra: adiciona à resposta e desmarca nó</text>
    <text x="215" y="74" fill="#38bdf8" font-size="10">• Evita verificar palavras inexistentes: de O(M×N×4ᴸ) para O(M×N×3ᴸ)</text>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Acoplamento do Trie poda milhares de ramos antes mesmo de explorar o grid</text>
</svg>
<p>Visualização: Backtracking em matriz 2D guiado por Trie com marcação in-place da célula visitada e restauração no desempilhamento.</p>

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
