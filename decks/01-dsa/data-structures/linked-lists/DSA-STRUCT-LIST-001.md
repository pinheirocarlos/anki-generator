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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Nós Sentinela (Dummy Nodes) para Eliminação de Edge Cases</text>
  <g transform="translate(80, 60)">
    <!-- Sentinel Dummy Node -->
    <rect x="0" y="0" width="60" height="45" fill="#3b0764" stroke="#a855f7" stroke-width="2" rx="4"/>
    <text x="30" y="20" fill="#e9d5ff" font-size="10" font-weight="bold" text-anchor="middle">DUMMY</text>
    <text x="30" y="36" fill="#a855f7" font-size="9" text-anchor="middle">val: -1</text>
    <rect x="60" y="0" width="30" height="45" fill="#581c87" rx="2"/><text x="75" y="28" fill="#f3e8ff" font-size="10" text-anchor="middle">&amp;N1</text>

    <line x1="90" y1="22" x2="140" y2="22" stroke="#a855f7" stroke-width="2"/>

    <!-- Head Node 1 -->
    <rect x="140" y="0" width="50" height="45" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="165" y="28" fill="#fff" font-size="12" text-anchor="middle">Head</text>
    <rect x="190" y="0" width="30" height="45" fill="#0f766e" rx="2"/><text x="205" y="28" fill="#a7f3d0" font-size="10" text-anchor="middle">&amp;N2</text>

    <line x1="220" y1="22" x2="270" y2="22" stroke="#3b82f6" stroke-width="2"/>

    <!-- Node 2 -->
    <rect x="270" y="0" width="50" height="45" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="295" y="28" fill="#fff" font-size="12" text-anchor="middle">Node 2</text>
    <rect x="320" y="0" width="30" height="45" fill="#0f766e" rx="2"/><text x="335" y="28" fill="#a7f3d0" font-size="10" text-anchor="middle">NULL</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Elimina checagens if (head == null) e simplifica inserções/remoções na cabeça da lista</text>
  <text x="340" y="175" fill="#94a3b8" font-size="11" text-anchor="middle">Retorno padrão da função: return dummy.next</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Nós Sentinela (Dummy Nodes) para Eliminação de Edge Cases</text>
  <g transform="translate(80, 60)">
    <!-- Sentinel Dummy Node -->
    <rect x="0" y="0" width="60" height="45" fill="#3b0764" stroke="#a855f7" stroke-width="2" rx="4"/>
    <text x="30" y="20" fill="#e9d5ff" font-size="10" font-weight="bold" text-anchor="middle">DUMMY</text>
    <text x="30" y="36" fill="#a855f7" font-size="9" text-anchor="middle">val: -1</text>
    <rect x="60" y="0" width="30" height="45" fill="#581c87" rx="2"/><text x="75" y="28" fill="#f3e8ff" font-size="10" text-anchor="middle">&amp;N1</text>

    <line x1="90" y1="22" x2="140" y2="22" stroke="#a855f7" stroke-width="2"/>

    <!-- Head Node 1 -->
    <rect x="140" y="0" width="50" height="45" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="165" y="28" fill="#fff" font-size="12" text-anchor="middle">Head</text>
    <rect x="190" y="0" width="30" height="45" fill="#0f766e" rx="2"/><text x="205" y="28" fill="#a7f3d0" font-size="10" text-anchor="middle">&amp;N2</text>

    <line x1="220" y1="22" x2="270" y2="22" stroke="#3b82f6" stroke-width="2"/>

    <!-- Node 2 -->
    <rect x="270" y="0" width="50" height="45" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="295" y="28" fill="#fff" font-size="12" text-anchor="middle">Node 2</text>
    <rect x="320" y="0" width="30" height="45" fill="#0f766e" rx="2"/><text x="335" y="28" fill="#a7f3d0" font-size="10" text-anchor="middle">NULL</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Elimina checagens if (head == null) e simplifica inserções/remoções na cabeça da lista</text>
  <text x="340" y="175" fill="#94a3b8" font-size="11" text-anchor="middle">Retorno padrão da função: return dummy.next</text>

</svg>

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
