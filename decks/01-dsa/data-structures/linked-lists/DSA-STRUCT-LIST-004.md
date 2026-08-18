---
id: DSA-STRUCT-LIST-004
title: "Composição de Lista Duplamente Ligada e Hash Map para LRU Cache O(1)"
tags:
  - level::l4-pleno
  - topic::dsa::linked-lists
  - company::amazon
  - freq::high
---

## Pergunta
Como a composição de uma **Lista Duplamente Ligada** com um **Hash Map** permite implementar um **LRU Cache** com `get` e `put` em $O(1)$ estrito?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Hash Map** mapeia cada chave `key` para a referência direta do seu nó na memória (`Map<Key, Node>`), permitindo busca em $O(1)$.
- A **Lista Duplamente Ligada** mantém a ordem de uso:
  - Nós mais recentemente acessados são movidos para o início (`head`).
  - O nó menos recentemente utilizado reside sempre no fim (`tail.prev`).
- Com a referência direta do nó obtida pelo mapa, a remoção e reinserção na cabeça da lista ocorrem em $O(1)$ através da manipulação de 4 ponteiros.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/lru-cache-doubly-linked-map-loop.webm">
    <p>Visualização: Hash Map mapeia chaves diretamente para nós da lista duplamente ligada para remoção e inserção O(1) na cabeça.</p>
  </video>
</div>

| Operação LRU | Papel do Hash Map | Papel da Lista Dupla |
|---|---|---|
| **`get(key)`** | Localiza o nó em $O(1)$ | Move nó para `head` em $O(1)$ |
| **`put(key, val)`** | Registra chave em $O(1)$ | Despeja `tail.prev` se cheio |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Diagrama de Arquitetura LRU
```text
Hash Map:
[ "k1" -> Node1 ], [ "k2" -> Node2 ], [ "k3" -> Node3 ]

Lista Dupla:
[Head Sentinel] <-> [Node3 (MRU)] <-> [Node1] <-> [Node2 (LRU)] <-> [Tail Sentinel]
```

#### Key Takeaways
- Se usássemos um array em vez de lista duplamente ligada, mover o item acessado para a ponta exigiria deslocar elementos em $O(N)$. A lista ligada é indispensável para o $O(1)$ estrito.

</details>
