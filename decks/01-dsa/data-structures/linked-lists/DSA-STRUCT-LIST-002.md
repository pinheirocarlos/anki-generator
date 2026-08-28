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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Reversão In-Place de Lista Encadeada com Três Ponteiros</text>
  <g transform="translate(60, 55)">
    <!-- Prev -->
    <rect x="0" y="20" width="60" height="40" fill="#1e293b" stroke="#94a3b8" rx="4"/><text x="30" y="45" fill="#94a3b8" font-size="12" text-anchor="middle">Prev</text>
    
    <!-- Curr -->
    <rect x="140" y="20" width="60" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/><text x="170" y="45" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Curr</text>
    
    <!-- Next -->
    <rect x="280" y="20" width="60" height="40" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="4"/><text x="310" y="45" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Next</text>

    <!-- Inverted Arrow -->
    <path d="M 140 30 L 65 30" stroke="#f43f5e" stroke-width="2.5"/>
    <text x="100" y="20" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">curr.next = prev</text>
  </g>
  <g transform="translate(420, 50)">
    <rect x="0" y="0" width="200" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="100" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Passo a Passo O(N):</text>
    <text x="15" y="40" fill="#f8fafc" font-size="10" font-family="monospace">next = curr.next</text>
    <text x="15" y="54" fill="#f87171" font-size="10" font-family="monospace">curr.next = prev</text>
    <text x="15" y="68" fill="#34d399" font-size="10" font-family="monospace">prev = curr; curr = next</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Espaço Auxiliar: O(1) estrito | Complexidade de Tempo: O(N)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Reversão In-Place de Lista Encadeada com Três Ponteiros</text>
  <g transform="translate(60, 55)">
    <!-- Prev -->
    <rect x="0" y="20" width="60" height="40" fill="#1e293b" stroke="#94a3b8" rx="4"/><text x="30" y="45" fill="#94a3b8" font-size="12" text-anchor="middle">Prev</text>
    
    <!-- Curr -->
    <rect x="140" y="20" width="60" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/><text x="170" y="45" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Curr</text>
    
    <!-- Next -->
    <rect x="280" y="20" width="60" height="40" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="4"/><text x="310" y="45" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Next</text>

    <!-- Inverted Arrow -->
    <path d="M 140 30 L 65 30" stroke="#f43f5e" stroke-width="2.5"/>
    <text x="100" y="20" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">curr.next = prev</text>
  </g>
  <g transform="translate(420, 50)">
    <rect x="0" y="0" width="200" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="100" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Passo a Passo O(N):</text>
    <text x="15" y="40" fill="#f8fafc" font-size="10" font-family="monospace">next = curr.next</text>
    <text x="15" y="54" fill="#f87171" font-size="10" font-family="monospace">curr.next = prev</text>
    <text x="15" y="68" fill="#34d399" font-size="10" font-family="monospace">prev = curr; curr = next</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Espaço Auxiliar: O(1) estrito | Complexidade de Tempo: O(N)</text>

</svg>

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
