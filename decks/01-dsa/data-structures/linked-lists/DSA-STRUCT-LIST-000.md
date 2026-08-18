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
