---
id: DSA-STRUCT-DSU-000
title: "Conceito de Disjoint Set Union (DSU) e Representação de Conjuntos Disjuntos"
tags:
  - level::l3-junior
  - topic::dsa::disjoint-set-union
  - company::meta
  - freq::high
---

## Pergunta
O que é a estrutura de dados **Disjoint Set Union (DSU / Union-Find)** e qual problema ela modela?

## Resposta
### Quick Answer
**Solução Direta**:
- O **DSU (Union-Find)** mantém uma coleção de conjuntos disjuntos (não-sobrepostos) de elementos particionados.
- Cada conjunto é identificado por um **elemento representativo único (líder ou raiz)**.
- Suporta duas operações fundamentais:
  - **`find(x)`**: Retorna o líder do conjunto ao qual $x$ pertence.
  - **`union(x, y)`**: Funde os conjuntos que contêm $x$ e $y$ em um único conjunto.
- É a estrutura ideal para consultas dinâmicas de conectividade (*connected components*) em grafos.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/dsu-disjoint-sets-forest-loop.webm">
    <p>Visualização: Floresta de árvores onde cada nó aponta para seu pai até a raiz representativa do conjunto.</p>
  </video>
</div>

| Operação DSU | Propósito | Pergunta Respondida |
|---|---|---|
| **`find(x)`** | Localiza a raiz canônica do conjunto | "A qual grupo $x$ pertence?" |
| **`union(x, y)`** | Conecta dois grupos distintos | "Funda os grupos de $x$ e $y$" |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Dois nós $A$ e $B$ estão conectados se e somente se `find(A) == find(B)`.

</details>
