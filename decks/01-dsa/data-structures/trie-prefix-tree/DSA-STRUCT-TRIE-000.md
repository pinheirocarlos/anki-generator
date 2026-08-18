---
id: DSA-STRUCT-TRIE-000
title: "Estrutura de uma Trie (Árvore de Prefixos) e Compartilhamento de Prefixos"
tags:
  - level::l3-junior
  - topic::dsa::trie-prefix-tree
  - company::google
  - freq::high
---

## Pergunta
O que é uma **Trie (Árvore de Prefixos)** e como ela compartilha prefixos comuns entre palavras armazenadas?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Trie** é uma árvore $k$-ária onde cada nó representa um caractere e as arestas conectam caracteres sequenciais de uma palavra.
- Palavras que compartilham o mesmo prefixo (ex: `"car" e "card"`) compartilham exatamente os mesmos nós iniciais (`c -> a -> r`).
- Um flag booleano `isEndOfWord` no nó marca quando aquele caminho forma uma palavra completa válida, economizando espaço ao evitar duplicação de prefixos.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/trie-prefix-sharing-loop.webm">
    <p>Visualização: Compartilhamento de nós de prefixos comuns entre palavras reduzindo redundância estrutural.</p>
  </video>
</div>

| Estrutura de Busca | Custo de Busca por Palavra de Tam $L$ | Busca por Prefixo |
|---|---|---|
| **Hash Map** | $O(L)$ cálculo do hash | $O(N \times L)$ Varredura total |
| **Trie** | $O(L)$ Caractere a caractere | $O(P)$ onde $P$ é tam do prefixo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Diagrama de Nós Compartilhados
```text
         (root)
           |
           'c'
           |
           'a'
           |
           'r' (isEnd: true -> "car")
           |
           'd' (isEnd: true -> "card")
```

#### Key Takeaways
- Em uma Trie, a complexidade de busca é totalmente independente do número total de palavras $N$ cadastradas; ela depende unicamente do comprimento $L$ da palavra consultada.

</details>
