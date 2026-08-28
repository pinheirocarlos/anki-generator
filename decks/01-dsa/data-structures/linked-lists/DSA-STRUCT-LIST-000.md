---
id: DSA-STRUCT-LIST-000
title: "Estrutura de Nós Encadeados com Ponteiros em Listas Ligadas"
tags:
  - level::l3-junior
  - topic::dsa::linked-lists
  - company::microsoft
  - freq::high
---

## Pergunta
Como funcionam internamente os nós e ponteiros de uma **Lista Encadeada Simples (Singly Linked List)**?

## Resposta
### Quick Answer
**Solução Direta**:
- Cada nó em uma lista encadeada é uma estrutura alocada individualmente no Heap contendo dois campos:
  1. `val`: O dado ou valor armazenado.
  2. `next`: O ponteiro contendo o endereço de memória do próximo nó (ou `null` no último nó).
- A lista é acessada a partir de uma referência para o nó inicial (`head`), exigindo travessia sequencial $O(N)$ para alcançar nós intermediários.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Inserção e Remoção O(1) em Listas Encadeadas via Atualização de Ponteiros</text>
  <g transform="translate(80, 60)">
    <!-- Node A -->
    <rect x="0" y="0" width="50" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="25" y="25" fill="#fff" font-size="12" text-anchor="middle">A</text>
    <rect x="50" y="0" width="30" height="40" fill="#0f766e" rx="2"/><text x="65" y="25" fill="#a7f3d0" font-size="10" text-anchor="middle">&amp;B</text>

    <!-- Node B (Deleted) -->
    <g opacity="0.4">
      <rect x="160" y="0" width="50" height="40" fill="#7f1d1d" stroke="#ef4444" rx="4"/><text x="185" y="25" fill="#fff" font-size="12" text-anchor="middle">B</text>
      <rect x="210" y="0" width="30" height="40" fill="#991b1b" rx="2"/><text x="225" y="25" fill="#fecaca" font-size="10" text-anchor="middle">&amp;C</text>
    </g>

    <!-- Node C -->
    <rect x="320" y="0" width="50" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="345" y="25" fill="#fff" font-size="12" text-anchor="middle">C</text>
    <rect x="370" y="0" width="30" height="40" fill="#0f766e" rx="2"/><text x="385" y="25" fill="#a7f3d0" font-size="10" text-anchor="middle">NULL</text>

    <!-- Bypass Arc -->
    <path d="M 80 15 Q 200 -25 320 15" fill="none" stroke="#10b981" stroke-width="2.5"/>
    <text x="200" y="-10" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">prev.next = curr.next (O(1))</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Sem deslocamento de elementos na memória RAM: Custo O(1)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Inserção e Remoção O(1) em Listas Encadeadas via Atualização de Ponteiros</text>
  <g transform="translate(80, 60)">
    <!-- Node A -->
    <rect x="0" y="0" width="50" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="25" y="25" fill="#fff" font-size="12" text-anchor="middle">A</text>
    <rect x="50" y="0" width="30" height="40" fill="#0f766e" rx="2"/><text x="65" y="25" fill="#a7f3d0" font-size="10" text-anchor="middle">&amp;B</text>

    <!-- Node B (Deleted) -->
    <g opacity="0.4">
      <rect x="160" y="0" width="50" height="40" fill="#7f1d1d" stroke="#ef4444" rx="4"/><text x="185" y="25" fill="#fff" font-size="12" text-anchor="middle">B</text>
      <rect x="210" y="0" width="30" height="40" fill="#991b1b" rx="2"/><text x="225" y="25" fill="#fecaca" font-size="10" text-anchor="middle">&amp;C</text>
    </g>

    <!-- Node C -->
    <rect x="320" y="0" width="50" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="345" y="25" fill="#fff" font-size="12" text-anchor="middle">C</text>
    <rect x="370" y="0" width="30" height="40" fill="#0f766e" rx="2"/><text x="385" y="25" fill="#a7f3d0" font-size="10" text-anchor="middle">NULL</text>

    <!-- Bypass Arc -->
    <path d="M 80 15 Q 200 -25 320 15" fill="none" stroke="#10b981" stroke-width="2.5"/>
    <text x="200" y="-10" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">prev.next = curr.next (O(1))</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Sem deslocamento de elementos na memória RAM: Custo O(1)</text>

</svg>

| Tipo de Lista | Ponteiros por Nó | Direção de Travessia |
|---|---|---|
| **Singly Linked** | 1 ponteiro (`next`) | Apenas para frente |
| **Doubly Linked** | 2 ponteiros (`prev`, `next`) | Bidirecional |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Estrutura Básica de Nó
```go
package main

import "fmt"

type ListNode struct {
  Val  int
  Next *ListNode
}

func printList(head *ListNode) {
  curr := head
  for curr != nil {
    fmt.Printf("%d -> ", curr.Val)
    curr = curr.Next
  }
  fmt.Println("nil")
}
```

#### Key Takeaways
- Listas encadeadas não suportam acesso indexado $O(1)$; o acesso ao $k$-ésimo elemento exige obrigatoriamente $k$ saltos de ponteiro ($O(k)$).

</details>
