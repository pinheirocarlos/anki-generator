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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Cuckoo Hashing: Duas Funções Hash e Busca O(1) no Pior Caso</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="220" height="80" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="110" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Tabela 1 (h1(key))</text>
    <rect x="20" y="35" width="180" height="30" fill="#1e3a8a" rx="3"/>
    <text x="110" y="54" fill="#93c5fd" font-size="10" text-anchor="middle">Chave reside no slot h1(k)...</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="220" height="80" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="110" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Tabela 2 (h2(key))</text>
      <rect x="20" y="35" width="180" height="30" fill="#065f46" rx="3"/>
      <text x="110" y="54" fill="#a7f3d0" font-size="10" text-anchor="middle">...ou reside no slot h2(k)</text>
    </g>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Busca inspeciona estritamente 2 posições: Custo O(1) garantido no pior caso</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Cuckoo Hashing: Duas Funções Hash e Busca O(1) no Pior Caso</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="220" height="80" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="110" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Tabela 1 (h1(key))</text>
    <rect x="20" y="35" width="180" height="30" fill="#1e3a8a" rx="3"/>
    <text x="110" y="54" fill="#93c5fd" font-size="10" text-anchor="middle">Chave reside no slot h1(k)...</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="220" height="80" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="110" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Tabela 2 (h2(key))</text>
      <rect x="20" y="35" width="180" height="30" fill="#065f46" rx="3"/>
      <text x="110" y="54" fill="#a7f3d0" font-size="10" text-anchor="middle">...ou reside no slot h2(k)</text>
    </g>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Busca inspeciona estritamente 2 posições: Custo O(1) garantido no pior caso</text>

</svg>

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
