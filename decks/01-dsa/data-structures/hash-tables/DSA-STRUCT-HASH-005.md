---
id: DSA-STRUCT-HASH-005
title: "Design de LRU Cache com Operações Get e Put em Tempo Estritamente O(1)"
tags:
  - level::l4-pleno
  - topic::dsa::hash-tables
  - company::meta
  - freq::high
---

## Pergunta
Como estruturar a implementação completa de um **LRU Cache (Least Recently Used)** com operações `get` e `put` em tempo estritamente $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos uma composição de duas estruturas:
  1. `Map<Integer, Node>`: Localiza o nó da chave instantaneamente em $O(1)$.
  2. `DoublyLinkedList` com Sentinelas (`head` e `tail`): Mantém a ordem temporal.
- **Fluxo de `get(key)`**: Se existe no mapa, remove o nó de sua posição atual na lista e reinsere imediatamente após `head` (mais recente). Retorna `node.val`.
- **Fluxo de `put(key, value)`**: Se já existe, atualiza o valor e move para `head`. Se for novo e atingir `capacity`, remove `tail.prev` da lista e apaga sua entrada do mapa; em seguida insere o novo nó em `head`.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/lru-cache-get-put-evict-loop.webm">
    <p>Visualização: Remoção do nó menos recentemente usado (LRU) na cauda e movimentação para a cabeça no acesso em O(1).</p>
  </video>
</div>

| Operação LRU | Composição (Mapa + Lista) | Complexidade |
|---|---|---|
| **`get(key)`** | Busca no Mapa + Move para `head` | $O(1)$ |
| **`put(key, val)`** | Insere no Mapa + Insere em `head` | $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: LRU Cache
```java
import java.util.HashMap;
import java.util.Map;

public class LRUCache {
  private static class Node {
    int key, val;
    Node prev, next;
    Node(int k, int v) { this.key = k; this.val = v; }
  }

  private final int capacity;
  private final Map<Integer, Node> map = new HashMap<>();
  private final Node head = new Node(0, 0);
  private final Node tail = new Node(0, 0);

  public LRUCache(int capacity) {
    this.capacity = capacity;
    head.next = tail;
    tail.prev = head;
  }

  public int get(int key) {
    Node node = map.get(key);
    if (node == null) return -1;
    moveToHead(node);
    return node.val;
  }

  public void put(int key, int value) {
    Node node = map.get(key);
    if (node != null) {
      node.val = value;
      moveToHead(node);
    } else {
      if (map.size() == capacity) {
        Node lru = tail.prev;
        removeNode(lru);
        map.remove(lru.key);
      }
      Node newNode = new Node(key, value);
      map.put(key, newNode);
      addFirst(newNode);
    }
  }

  private void removeNode(Node node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  private void addFirst(Node node) {
    node.next = head.next;
    node.prev = head;
    head.next.prev = node;
    head.next = node;
  }

  private void moveToHead(Node node) {
    removeNode(node);
    addFirst(node);
  }
}
```

#### Key Takeaways
- É uma das questões mais frequentes em entrevistas de System Design e Low-Level Design na Meta, Google e Amazon.

</details>
