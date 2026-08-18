---
id: DSA-STRUCT-TRIE-001
title: "Radix Tree (Compressed Trie) e Compressão de Cadeias Unárias"
tags:
  - level::l4-pleno
  - topic::dsa::trie-prefix-tree
  - company::amazon
  - freq::high
---

## Pergunta
Como a **Radix Tree (Compressed / Compact Trie / Patricia Tree)** reduz o consumo de memória ao comprimir cadeias de caracteres unários?

## Resposta
### Quick Answer
**Solução Direta**:
- Em uma Trie tradicional, nós intermediários que possuem **exatamente 1 único filho** e não marcam fim de palavra geram overhead excessivo de alocação de nós.
- A **Radix Tree** compacta essas cadeias consecutivas de nós unários em uma **única aresta contendo uma string**:
  - Exemplo: A cadeia de nós `r -> o -> o -> t` é comprimida em uma única aresta rotulada como `"root"`.
- Isso reduz drasticamente o número total de nós alocados e economiza memória de ponteiros em até 70%.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/radix-tree-node-compression-loop.webm">
    <p>Visualização: Fusão de nós unários consecutivos em uma única aresta de string comprimida.</p>
  </video>
</div>

| Estrutura | Sequência `"inter"` sem bifurcação | Quantidade de Nós |
|---|---|---|
| **Trie Padrão** | `'i' -> 'n' -> 't' -> 'e' -> 'r'` | 5 nós alocados |
| **Radix Tree** | Aresta única `"inter"` | 1 nó alocado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Usos em Engenharia
- A Radix Tree é amplamente utilizada em **Roteadores IP (CIDR lookup)** e em roteadores HTTP de frameworks web modernos (ex: Gin em Go, Express e Fastify).

#### Key Takeaways
- A compactação mantém a velocidade $O(L)$ de busca enquanto elimina a maior desvantagem da Trie: o desperdício de memória por ponteiros esparsos.

</details>
