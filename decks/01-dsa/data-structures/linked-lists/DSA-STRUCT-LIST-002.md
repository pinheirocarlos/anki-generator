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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Inserção no Início (pushFront) em O(1) via Manipulação de Ponteiros</text>
  
  <g transform="translate(50, 55)">
    <!-- New Node -->
    <g transform="translate(0, 30)">
      <rect x="0" y="0" width="55" height="40" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
      <text x="27" y="24" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Novo</text>
      <rect x="55" y="0" width="35" height="40" fill="#047857" rx="2"/>
      <text x="72" y="24" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">&amp;N1</text>
      <text x="45" y="-8" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">1. newNode.next = head</text>
    </g>

    <!-- Arrow from newNode to N1 -->
    <path d="M 90 50 Q 140 10 180 40" fill="none" stroke="#10b981" stroke-width="2.5"/>
    <polygon points="185,42 175,37 178,47" fill="#10b981"/>

    <!-- Head Pointer -->
    <g transform="translate(180, -15)">
      <rect x="0" y="0" width="60" height="25" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="3"/>
      <text x="30" y="17" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">head</text>
      <path d="M 0 12 L -60 30" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3"/>
      <text x="-70" y="10" fill="#f59e0b" font-size="10" font-weight="bold" text-anchor="middle">2. head = newNode</text>
    </g>

    <!-- Existing Node 1 -->
    <g transform="translate(180, 30)">
      <rect x="0" y="0" width="55" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/>
      <text x="27" y="24" fill="#ffffff" font-size="12" text-anchor="middle">Nó 1</text>
      <rect x="55" y="0" width="35" height="40" fill="#0f766e" rx="2"/>
      <text x="72" y="24" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">&amp;N2</text>
    </g>

    <line x1="270" y1="50" x2="310" y2="50" stroke="#3b82f6" stroke-width="2"/>

    <!-- Existing Node 2 -->
    <g transform="translate(310, 30)">
      <rect x="0" y="0" width="55" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/>
      <text x="27" y="24" fill="#ffffff" font-size="12" text-anchor="middle">Nó 2</text>
      <rect x="55" y="0" width="35" height="40" fill="#0f766e" rx="2"/>
      <text x="72" y="24" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">NULL</text>
    </g>
  </g>

  <g transform="translate(480, 55)">
    <rect x="0" y="0" width="160" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="80" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Passos O(1):</text>
    <text x="12" y="42" fill="#f8fafc" font-size="10" font-family="monospace">1. node.next = head</text>
    <text x="12" y="60" fill="#f8fafc" font-size="10" font-family="monospace">2. head = node</text>
  </g>

  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Apenas 2 ponteiros atualizados: Custo O(1) estrito e zero cópia de buffer</text>
</svg>

<p>Visualização: Inserção O(1) no início (pushFront) via atualização de dois ponteiros na memória.</p>

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
