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
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="24" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Design de LRU Cache: HashMap O(1) + Doubly Linked List com Sentinelas</text>

  <!-- HashMap Layer (Top) -->
  <g transform="translate(60, 42)">
    <rect x="0" y="0" width="560" height="38" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="80" y="24" fill="#38bdf8" font-size="11" font-weight="bold">HashMap&lt;Key, Node*&gt;:</text>
    
    <!-- Hash Entries -->
    <rect x="230" y="6" width="90" height="26" fill="#1e3a8a" stroke="#60a5fa" rx="3"/>
    <text x="275" y="23" fill="#93c5fd" font-size="10" font-family="monospace" text-anchor="middle">"k1" → &amp;NodeA</text>

    <rect x="340" y="6" width="90" height="26" fill="#1e3a8a" stroke="#60a5fa" rx="3"/>
    <text x="385" y="23" fill="#93c5fd" font-size="10" font-family="monospace" text-anchor="middle">"k2" → &amp;NodeB</text>

    <rect x="450" y="6" width="90" height="26" fill="#1e3a8a" stroke="#60a5fa" rx="3"/>
    <text x="495" y="23" fill="#93c5fd" font-size="10" font-family="monospace" text-anchor="middle">"k3" → &amp;NodeC</text>
  </g>

  <!-- Pointers downward -->
  <g stroke="#60a5fa" stroke-width="1.5" stroke-dasharray="3,3">
    <path d="M 335 80 L 335 110"/>
    <path d="M 445 80 L 445 110"/>
    <path d="M 555 80 L 555 110"/>
  </g>

  <!-- Doubly Linked List Layer (Bottom) -->
  <g transform="translate(60, 110)">
    <!-- Sentinel Head (MRU side) -->
    <rect x="0" y="0" width="70" height="42" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="4"/>
    <text x="35" y="18" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">HEAD</text>
    <text x="35" y="32" fill="#a7f3d0" font-size="9" text-anchor="middle">(Sentinela)</text>

    <path d="M 70 21 L 105 21" stroke="#10b981" stroke-width="2"/>

    <!-- MRU Node (Node A) -->
    <rect x="105" y="0" width="130" height="42" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="170" y="18" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Node A (MRU)</text>
    <text x="170" y="32" fill="#f8fafc" font-size="9" font-family="monospace" text-anchor="middle">[prev | k1, v1 | next]</text>

    <path d="M 235 21 L 270 21" stroke="#94a3b8" stroke-width="2"/>

    <!-- Middle Node (Node B) -->
    <rect x="270" y="0" width="130" height="42" fill="#1e293b" stroke="#64748b" rx="4"/>
    <text x="335" y="18" fill="#94a3b8" font-size="10" font-weight="bold" text-anchor="middle">Node B</text>
    <text x="335" y="32" fill="#f8fafc" font-size="9" font-family="monospace" text-anchor="middle">[prev | k2, v2 | next]</text>

    <path d="M 400 21 L 435 21" stroke="#f43f5e" stroke-width="2"/>

    <!-- LRU Node (Node C) -->
    <rect x="435" y="0" width="130" height="42" fill="#1e293b" stroke="#f43f5e" stroke-width="2" rx="4"/>
    <text x="500" y="18" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Node C (LRU)</text>
    <text x="500" y="32" fill="#f8fafc" font-size="9" font-family="monospace" text-anchor="middle">[prev | k3, v3 | next]</text>

    <path d="M 565 21 L 590 21" stroke="#f43f5e" stroke-width="2"/>

    <!-- Sentinel Tail -->
    <rect x="590" y="0" width="60" height="42" fill="#881337" stroke="#f43f5e" stroke-width="1.5" rx="4"/>
    <text x="620" y="18" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">TAIL</text>
    <text x="620" y="32" fill="#fecdd3" font-size="9" text-anchor="middle">(Evict)</text>
  </g>

  <text x="340" y="195" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Acesso instantâneo via HashMap e reordenação/remoção O(1) in-place na lista duplamente ligada</text>
</svg>
<p>Visualização: Arquitetura LRU Cache combinando HashMap para acesso O(1) e Doubly Linked List com sentinelas para reordenação temporal O(1).</p>

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
