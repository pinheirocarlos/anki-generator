---
id: DSA-PATT-2POINT-005
title: "Demonstração Formal para Encontrar o Início de Ciclo em Lista Ligada (Cycle II)"
tags:
  - level::l4-pleno
  - topic::dsa::two-pointers
  - company::microsoft
  - freq::high
---

## Pergunta
Qual é a demonstração matemática que prova como encontrar o **nó exato de início de ciclo** em uma lista ligada (*Linked List Cycle II*)?

## Resposta
### Quick Answer
**Solução Direta**:
- Sejam:
  - $L_1$: Distância da cabeça (`head`) até o nó de início do ciclo.
  - $L_2$: Distância do início do ciclo até o ponto de encontro de `slow` e `fast`.
  - $C$: Comprimento total do ciclo.
- Quando se encontram:
  - Distância percorrida por `slow`: $D_{\text{slow}} = L_1 + L_2$.
  - Distância percorrida por `fast`: $D_{\text{fast}} = L_1 + L_2 + k \cdot C$.
- Como `fast` anda no dobro da velocidade ($D_{\text{fast}} = 2 D_{\text{slow}}$):
  $$L_1 + L_2 + k \cdot C = 2(L_1 + L_2) \implies L_1 = k \cdot C - L_2 = (k-1)C + (C - L_2)$$
- **Algoritmo**: Após o encontro, reiniciamos um ponteiro na cabeça (`p1 = head`) mantendo o outro no ponto de encontro (`p2 = fast`). Avançando ambos a 1 passo por vez, eles se encontrarão **exatamente no nó de início do ciclo** após $L_1$ passos.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Linked List Cycle II: Encontro no Início do Ciclo (L₁ = C - L₂)</text>
  <g transform="translate(60, 45)">
    <!-- Parte linear L1 -->
    <line x1="20" y1="50" x2="220" y2="50" stroke="#3b82f6" stroke-width="2.5"/>
    <circle cx="20" cy="50" r="12" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/><text x="20" y="54" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Head</text>
    <text x="120" y="40" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Distância L₁</text>

    <!-- Ciclo -->
    <circle cx="300" cy="50" r="45" fill="none" stroke="#10b981" stroke-width="2.5"/>
    <circle cx="220" cy="50" r="10" fill="#047857" stroke="#10b981" stroke-width="2"/><text x="220" y="30" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Início Ciclo</text>

    <!-- Ponto de encontro -->
    <circle cx="340" cy="20" r="9" fill="#b45309" stroke="#f59e0b" stroke-width="2"/><text x="340" y="5" fill="#fcd34d" font-size="9" font-weight="bold" text-anchor="middle">Encontro (L₂)</text>
    <text x="380" y="75" fill="#94a3b8" font-size="10" text-anchor="middle">Restante (C - L₂)</text>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Ponteiro de Head e Ponteiro de Encontro avançam 1 passo/vez e colidem exatamente no início</text>
</svg>
<p>Visualização: Demonstração matemática de Floyd (Cycle II): avanço simultâneo de head e ponto de encontro até o início do ciclo.</p>

| Ponteiro na Fase 2 | Posição Inicial | Ponto de Encontro Final |
|---|---|---|
| **`p1`** | `head` (1 passo/vez) | Início exato do ciclo ($L_1$) |
| **`p2`** | Ponto de encontro (1 passo/vez) | Início exato do ciclo ($C - L_2$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Linked List Cycle II
```go
package main

func detectCycle(head *ListNode) *ListNode {
  slow, fast := head, head
  for fast != nil && fast.Next != nil {
    slow = slow.Next
    fast = fast.Next.Next
    if slow == fast {
      // Fase 2: Encontrar o nó de início
      p1 := head
      p2 := slow
      for p1 != p2 {
        p1 = p1.Next
        p2 = p2.Next
      }
      return p1
    }
  }
  return nil
}
```

#### Key Takeaways
- Essa elegante propriedade matemática transforma um problema que exigiria $O(N)$ memória de Hash Set em uma solução estritamente $O(1)$ de memória auxiliar.

</details>
