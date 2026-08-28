---
id: DSA-STRUCT-ADVTREE-005
title: "Conceito de Treap (Tree + Heap) e Resolução Probabilística de Balanceamento"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-trees
  - company::google
  - freq::high
---

## Pergunta
Como a estrutura **Treap (Cartesian Tree)** combina as propriedades de BST e Heap para manter balanceamento com alta probabilidade?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Treap** atribui a cada nó dois valores:
  1. Uma **Chave (`key`)**: Satisfaz estritamente a invariante de **BST** (esquerda $<$ chave $<$ direita).
  2. Uma **Prioridade (`priority`)**: Um número aleatório gerado no momento da inserção que satisfaz a invariante de **Max-Heap** ($\text{pai} \ge \text{filhos}$).
- Ao inserir um elemento:
  - Insere-o como folha seguindo as regras da BST.
  - Executa rotações para subir o nó até satisfazer a prioridade do Heap.
- Como as prioridades são aleatórias, a árvore é equivalente a uma BST construída por inserção em ordem aleatória, garantindo altura esperada $O(\log N)$ com alta probabilidade.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Suffix Tree &amp; Suffix Automaton: Indexação de Substrings em Tempo Linear</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Construção com Algoritmo de Ukkonen em Tempo O(N)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Armazena todos os sufixos de uma string compactados em uma árvore.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Responde se qualquer padrão de tamanho M existe no texto em tempo O(M).</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Resolve Maior Substring Comum e Substring Palindrômica Mais Longa em tempo ótimo</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Suffix Tree &amp; Suffix Automaton: Indexação de Substrings em Tempo Linear</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Construção com Algoritmo de Ukkonen em Tempo O(N)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Armazena todos os sufixos de uma string compactados em uma árvore.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Responde se qualquer padrão de tamanho M existe no texto em tempo O(M).</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Resolve Maior Substring Comum e Substring Palindrômica Mais Longa em tempo ótimo</text>

</svg>

| Dimensão do Nó | Invariante Satisfeita | Função na Estrutura |
|---|---|---|
| **`key` (Chave)** | BST ($	ext{left} < 	ext{key} < 	ext{right}$) | Busca de elementos ordenada |
| **`priority` (Aleatória)** | Max-Heap ($	ext{pai} \ge 	ext{filhos}$) | Garante balanceamento probabilístico |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Operações Especiais em Treap
- **`split(treap, k)`**: Divide a Treap em duas Treaps $T_1$ (chaves $\le k$) e $T_2$ (chaves $> k$) em $O(\log N)$.
- **`merge(T1, T2)`**: Funde duas Treaps em uma única em $O(\log N)$.

#### Key Takeaways
- Treaps (especialmente Treaps Implícitas) são a base para implementar vetores com inserção, remoção e inversão de intervalos em $O(\log N)$.

</details>
