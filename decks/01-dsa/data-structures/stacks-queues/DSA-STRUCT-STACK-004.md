---
id: DSA-STRUCT-STACK-004
title: "Implementação de Fila FIFO com Duas Pilhas LIFO em Custo O(1) Amortizado"
tags:
  - level::l4-pleno
  - topic::dsa::stacks-queues
  - company::microsoft
  - freq::high
---

## Pergunta
Como implementar uma **Fila FIFO utilizando duas Pilhas LIFO** garantindo custo $O(1)$ amortizado por operação?

## Resposta
### Quick Answer
**Solução Direta**:
- Utilizamos duas pilhas: `inStack` (para inserções) e `outStack` (para remoções).
- `push(x)`: Sempre insere no topo de `inStack` ($O(1)$).
- `pop()` / `peek()`:
  - Se `outStack` estiver vazia, desempilhamos todos os elementos de `inStack` e empilhamos em `outStack` (essa transferência inverte a ordem de LIFO para FIFO).
  - Desempilhamos o topo de `outStack`.
- Cada elemento é transferido de `inStack` para `outStack` exatamente uma vez ao longo de seu ciclo de vida, conferindo **custo amortizado $O(1)$**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Implementação de Fila Usando Duas Pilhas (Custo Amortizado O(1))</text>
  <g transform="translate(80, 50)">
    <!-- Stack In -->
    <rect x="0" y="0" width="200" height="85" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="100" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">stack_in (Enqueue)</text>
    <rect x="30" y="35" width="140" height="18" fill="#2563eb" rx="2"/><text x="100" y="48" fill="#fff" font-size="10" text-anchor="middle">Novo Item 3</text>
    <rect x="30" y="57" width="140" height="18" fill="#1d4ed8" rx="2"/><text x="100" y="70" fill="#fff" font-size="10" text-anchor="middle">Novo Item 4</text>

    <!-- Transfer Arrow -->
    <path d="M 215 45 L 265 45" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="240" y="35" fill="#f59e0b" font-size="9" font-weight="bold" text-anchor="middle">Inverte</text>

    <!-- Stack Out -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="200" height="85" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="100" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">stack_out (Dequeue)</text>
      <rect x="30" y="35" width="140" height="18" fill="#047857" rx="2"/><text x="100" y="48" fill="#fff" font-size="10" text-anchor="middle">Primeiro Item 1 (Pop)</text>
      <rect x="30" y="57" width="140" height="18" fill="#065f46" rx="2"/><text x="100" y="70" fill="#fff" font-size="10" text-anchor="middle">Item 2</text>
    </g>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Cada elemento entra e sai de cada pilha no máximo 2 vezes: Custo Amortizado O(1)</text>

</svg>

<p>Visualização: Fila implementada com duas pilhas garantindo custo amortizado O(1).</p>


| Operação | Mecânica das Pilhas | Custo Amortizado |
|---|---|---|
| `push(x)` | Insere em `inStack` | $O(1)$ |
| `pop()` | Transfere para `outStack` se vazia | $O(1)$ Amortizado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Prova de Custo Amortizado
- Para $N$ inserções e $N$ remoções, cada elemento sofre no máximo 2 operações de `push` e 2 operações de `pop` no total.
- Custo total para $2N$ operações = $4N$ passos.
- Custo médio por operação = $\frac{4N}{2N} = O(1)$.

#### Key Takeaways
- É um clássico de entrevistas técnicas para testar a compreensão de análise amortizada de algoritmos.

</details>
