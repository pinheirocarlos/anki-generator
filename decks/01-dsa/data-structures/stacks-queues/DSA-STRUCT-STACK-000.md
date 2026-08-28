---
id: DSA-STRUCT-STACK-000
title: "Diferença Fundamental entre LIFO (Pilha) e FIFO (Fila)"
tags:
  - level::l3-junior
  - topic::dsa::stacks-queues
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre o princípio de acesso **LIFO (Pilha)** e **FIFO (Fila)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Pilha / Stack (LIFO - Last In, First Out)**: O último elemento inserido (`push`) é o primeiro a ser removido (`pop`). Operações ocorrem exclusivamente no topo.
- **Fila / Queue (FIFO - First In, First Out)**: O primeiro elemento inserido no fim (`enqueue`) é o primeiro a ser removido no início (`dequeue`).
- Ambas as estruturas realizam suas operações primárias de inserção, remoção e consulta em tempo estritamente constante $O(1)$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Comparação de Disciplinas: Pilha (LIFO) vs Fila (FIFO)</text>
  <g transform="translate(80, 50)">
    <!-- Stack LIFO -->
    <rect x="0" y="0" width="200" height="85" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="100" y="20" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Pilha (LIFO - Topo)</text>
    <rect x="40" y="30" width="120" height="18" fill="#2563eb" rx="2"/><text x="100" y="43" fill="#fff" font-size="10" text-anchor="middle">Elemento 3 (Pop ↑)</text>
    <rect x="40" y="50" width="120" height="18" fill="#1d4ed8" rx="2"/><text x="100" y="63" fill="#fff" font-size="10" text-anchor="middle">Elemento 2</text>
    <rect x="40" y="70" width="120" height="18" fill="#1e40af" rx="2"/><text x="100" y="83" fill="#fff" font-size="10" text-anchor="middle">Elemento 1 (Base)</text>

    <!-- Queue FIFO -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="220" height="85" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="110" y="20" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Fila (FIFO - Extremidades)</text>
      <rect x="15" y="38" width="55" height="30" fill="#047857" rx="3"/><text x="42" y="57" fill="#fff" font-size="10" text-anchor="middle">Out (Head)</text>
      <text x="85" y="57" fill="#94a3b8" font-size="12">→</text>
      <rect x="105" y="38" width="55" height="30" fill="#065f46" rx="3"/><text x="132" y="57" fill="#fff" font-size="10" text-anchor="middle">Mid</text>
      <text x="175" y="57" fill="#94a3b8" font-size="12">→</text>
      <rect x="195" y="38" width="15" height="30" fill="#0f766e" rx="1"/>
    </g>
  </g>
  <text x="340" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">Operações Push/Pop e Enqueue/Dequeue são estritamente O(1)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Comparação de Disciplinas: Pilha (LIFO) vs Fila (FIFO)</text>
  <g transform="translate(80, 50)">
    <!-- Stack LIFO -->
    <rect x="0" y="0" width="200" height="85" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="100" y="20" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Pilha (LIFO - Topo)</text>
    <rect x="40" y="30" width="120" height="18" fill="#2563eb" rx="2"/><text x="100" y="43" fill="#fff" font-size="10" text-anchor="middle">Elemento 3 (Pop ↑)</text>
    <rect x="40" y="50" width="120" height="18" fill="#1d4ed8" rx="2"/><text x="100" y="63" fill="#fff" font-size="10" text-anchor="middle">Elemento 2</text>
    <rect x="40" y="70" width="120" height="18" fill="#1e40af" rx="2"/><text x="100" y="83" fill="#fff" font-size="10" text-anchor="middle">Elemento 1 (Base)</text>

    <!-- Queue FIFO -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="220" height="85" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="110" y="20" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Fila (FIFO - Extremidades)</text>
      <rect x="15" y="38" width="55" height="30" fill="#047857" rx="3"/><text x="42" y="57" fill="#fff" font-size="10" text-anchor="middle">Out (Head)</text>
      <text x="85" y="57" fill="#94a3b8" font-size="12">→</text>
      <rect x="105" y="38" width="55" height="30" fill="#065f46" rx="3"/><text x="132" y="57" fill="#fff" font-size="10" text-anchor="middle">Mid</text>
      <text x="175" y="57" fill="#94a3b8" font-size="12">→</text>
      <rect x="195" y="38" width="15" height="30" fill="#0f766e" rx="1"/>
    </g>
  </g>
  <text x="340" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">Operações Push/Pop e Enqueue/Dequeue são estritamente O(1)</text>

</svg>

| Estrutura | Disciplina de Acesso | Ponto de Inserção / Remoção |
|---|---|---|
| **Pilha (Stack)** | LIFO (Último a entrar sai primeiro) | Topo / Topo |
| **Fila (Queue)** | FIFO (Primeiro a entrar sai primeiro) | Fim / Início |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Metáforas do Mundo Real
- **Pilha**: Uma pilha de pratos na cozinha. O último prato lavado é colocado em cima e será o primeiro a ser retirado.
- **Fila**: Uma fila de caixa de supermercado. O primeiro cliente a chegar é o primeiro a ser atendido.

#### Key Takeaways
- Ambas as estruturas impõem restrições intencionais de acesso (sem busca por índice arbitrário) para garantir invariantes de ordem e custo $O(1)$.

</details>
