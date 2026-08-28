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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">LRU Cache: Doubly Linked List + Hash Map (O(1) Get &amp; Put)</text>
  <g transform="translate(60, 50)">
    <!-- HashMap -->
    <rect x="0" y="0" width="160" height="70" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="80" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Hash Map (Chave → Nó)</text>
    <text x="20" y="42" fill="#f8fafc" font-size="10" font-family="monospace">"k1" → &amp;Node1</text>
    <text x="20" y="58" fill="#f8fafc" font-size="10" font-family="monospace">"k2" → &amp;Node2</text>

    <!-- Doubly Linked List -->
    <g transform="translate(200, 0)">
      <rect x="0" y="10" width="70" height="50" fill="#047857" stroke="#10b981" rx="4"/>
      <text x="35" y="32" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">MRU</text>
      <text x="35" y="48" fill="#a7f3d0" font-size="9" text-anchor="middle">Mais Recente</text>

      <line x1="70" y1="35" x2="110" y2="35" stroke="#10b981" stroke-width="2"/>

      <rect x="110" y="10" width="70" height="50" fill="#1e293b" stroke="#475569" rx="4"/>
      <text x="145" y="38" fill="#94a3b8" font-size="11" text-anchor="middle">Node 2</text>

      <line x1="180" y1="35" x2="220" y2="35" stroke="#f43f5e" stroke-width="2"/>

      <rect x="220" y="10" width="70" height="50" fill="#7f1d1d" stroke="#ef4444" rx="4"/>
      <text x="255" y="32" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">LRU</text>
      <text x="255" y="48" fill="#fecaca" font-size="9" text-anchor="middle">Evicting Target</text>
    </g>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Get(key): O(1) movendo nó para cabeça (MRU) | Put(key): O(1) desalojando cauda (LRU)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">LRU Cache: Doubly Linked List + Hash Map (O(1) Get &amp; Put)</text>
  <g transform="translate(60, 50)">
    <!-- HashMap -->
    <rect x="0" y="0" width="160" height="70" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="80" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Hash Map (Chave → Nó)</text>
    <text x="20" y="42" fill="#f8fafc" font-size="10" font-family="monospace">"k1" → &amp;Node1</text>
    <text x="20" y="58" fill="#f8fafc" font-size="10" font-family="monospace">"k2" → &amp;Node2</text>

    <!-- Doubly Linked List -->
    <g transform="translate(200, 0)">
      <rect x="0" y="10" width="70" height="50" fill="#047857" stroke="#10b981" rx="4"/>
      <text x="35" y="32" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">MRU</text>
      <text x="35" y="48" fill="#a7f3d0" font-size="9" text-anchor="middle">Mais Recente</text>

      <line x1="70" y1="35" x2="110" y2="35" stroke="#10b981" stroke-width="2"/>

      <rect x="110" y="10" width="70" height="50" fill="#1e293b" stroke="#475569" rx="4"/>
      <text x="145" y="38" fill="#94a3b8" font-size="11" text-anchor="middle">Node 2</text>

      <line x1="180" y1="35" x2="220" y2="35" stroke="#f43f5e" stroke-width="2"/>

      <rect x="220" y="10" width="70" height="50" fill="#7f1d1d" stroke="#ef4444" rx="4"/>
      <text x="255" y="32" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">LRU</text>
      <text x="255" y="48" fill="#fecaca" font-size="9" text-anchor="middle">Evicting Target</text>
    </g>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Get(key): O(1) movendo nó para cabeça (MRU) | Put(key): O(1) desalojando cauda (LRU)</text>

</svg>

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
