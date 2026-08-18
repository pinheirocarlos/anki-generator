---
id: DSA-STRUCT-LIST-002
title: "Inserção e Remoção O(1) nas Extremidades em Listas Encadeadas"
tags:
  - level::l3-junior
  - topic::dsa::linked-lists
  - company::amazon
  - freq::high
---

## Pergunta
Por que a inserção e remoção no início de uma lista encadeada é **estritamente $O(1)$** sem necessidade de realocação de buffers?

## Resposta
### Quick Answer
**Solução Direta**:
- Para inserir um novo nó no início (`head`):
  1. Criamos o novo nó e apontamos seu `next` para o `head` atual: `newNode.next = head`.
  2. Atualizamos a referência `head = newNode`.
- Essa operação manipula exatamente dois ponteiros em tempo constante $O(1)$, independentemente do tamanho $N$ da lista, sem precisar realocar ou deslocar nenhum outro elemento.

### Dual Coding Visual
| Operação | Lista Encadeada | Vetor Dinâmico |
|---|---|---|
| **Inserção no Início (`pushFront`)** | $O(1)$ Ponteiros | $O(N)$ Deslocamento em bloco |
| **Inserção no Fim (`pushBack` com tail)**| $O(1)$ Ponteiro | $O(1)$ Amortizado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Inserção no Topo
```java
public class SinglyLinkedList {
  private Node head;

  public void pushFront(int val) {
    Node newNode = new Node(val);
    newNode.next = head;
    head = newNode; // O(1) estrito
  }
}
```

#### Key Takeaways
- Listas ligadas são estruturas ideais para construir Pilhas e Filas onde inserções e deleções ocorrem predominantemente nas pontas.

</details>
