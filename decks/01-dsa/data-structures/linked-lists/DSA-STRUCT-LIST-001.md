---
id: DSA-STRUCT-LIST-001
title: "Padrão de Nós Sentinela (Dummy Head/Tail) em Listas Duplamente Ligadas"
tags:
  - level::l4-pleno
  - topic::dsa::linked-lists
  - company::google
  - freq::high
---

## Pergunta
Como o padrão de **Nós Sentinela (Dummy Head / Dummy Tail)** elimina condições de borda (*null checks*) em listas duplamente ligadas?

## Resposta
### Quick Answer
**Solução Direta**:
- Nós Sentinela são dois nós sentinelas fixos alocados na inicialização: `head` e `tail`.
- Em uma lista vazia, `head.next = tail` e `tail.prev = head`.
- Todos os elementos reais são inseridos estritamente entre `head` e `tail`.
- **Benefício**: Qualquer nó inserido ou removido tem garantidamente um vizinho anterior (`prev`) e um vizinho posterior (`next`), eliminando todas as verificações de `if (head == null)` ou `if (node.next == null)`.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/sentinel-dummy-nodes-loop.webm">
    <p>Visualização: Nós sentinelas eliminam verificações de ponteiro nulo nas extremidades da lista duplamente encadeada.</p>
  </video>
</div>

| Estrutura de Lista | Inserção no Início | Remoção do Último Item |
|---|---|---|
| **Sem Sentinela** | Exige `if (head == null)` | Exige atualizar `head = null` |
| **Com Sentinelas** | Sempre `insertAfter(head)` | Sempre `remove(node)` uniforme |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Primitiva com Sentinelas
```java
public class DoublyLinkedList {
  private final Node head = new Node(0, 0);
  private final Node tail = new Node(0, 0);

  public DoublyLinkedList() {
    head.next = tail;
    tail.prev = head;
  }

  public void addFirst(Node node) {
    node.next = head.next;
    node.prev = head;
    head.next.prev = node;
    head.next = node;
  }

  public void remove(Node node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
}
```

#### Key Takeaways
- O uso de sentinelas reduz o código de manipulação de ponteiros pela metade e previne erros comuns de `NullPointerException` em entrevistas FAANG.

</details>
