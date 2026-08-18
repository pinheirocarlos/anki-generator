---
id: DSA-PATT-MONOSTACK-006
title: "Intuição Fundamental de Monotonic Stack: A Linha do Horizonte e os Prédios Mais Altos"
tags:
  - level::l2-fundamental
  - topic::dsa::monotonic-stack-queue
  - company::google
  - freq::high
---

## Pergunta
Qual é o modelo mental de uma Pilha Monotônica (Monotonic Stack) e como ela encontra o "próximo elemento maior" em tempo linear $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Pilha Monotônica** mantém seus elementos estritamente em ordem crescente ou decrescente, descartando (fazendo `pop`) imediatamente qualquer elemento anterior que seja superado pelo novo item que está chegando.
- Funciona como a **linha do horizonte de uma cidade**: quando um arranha-céu gigante surge, todos os prédios baixinhos que estavam atrás dele ficam ocultos da visão e podem ser descartados.

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Analogia dos Prédios: O Prédio Maior (8) Esconde e Descarta os Menores (3, 5)</text>

  <!-- Pilha Monotônica Decrescente -->
  <g transform="translate(60, 45)">
    <!-- Prédio 10 (Fundo da Pilha) -->
    <rect x="0" y="20" width="50" height="80" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="3" />
    <text x="25" y="65" fill="#ffffff" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle">10</text>
    <text x="25" y="115" fill="#64748b" font-size="10" font-family="sans-serif" text-anchor="middle">Base</text>

    <!-- Prédio 5 (Sendo removido) -->
    <rect x="70" y="50" width="50" height="50" fill="#78350f" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="3,3" rx="3" />
    <text x="95" y="80" fill="#fde68a" font-size="14" font-family="sans-serif" text-anchor="middle">5</text>
    <text x="95" y="115" fill="#f59e0b" font-size="10" font-family="sans-serif" text-anchor="middle">Pop!</text>

    <!-- Prédio 3 (Sendo removido) -->
    <rect x="140" y="70" width="50" height="30" fill="#991b1b" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3" rx="3" />
    <text x="165" y="90" fill="#fca5a5" font-size="13" font-family="sans-serif" text-anchor="middle">3</text>
    <text x="165" y="115" fill="#ef4444" font-size="10" font-family="sans-serif" text-anchor="middle">Pop!</text>

    <!-- Prédio 8 Chegando (Novo Elemento) -->
    <rect x="230" y="30" width="60" height="70" fill="#065f46" stroke="#10b981" stroke-width="2.5" rx="4" />
    <text x="260" y="70" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">8</text>
    <text x="260" y="115" fill="#34d399" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">Chega (8)</text>
  </g>

  <!-- Seta indicando eliminação -->
  <path d="M 280 40 Q 230 10 180 40" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,4" />
  <polygon points="175,43 186,37 184,47" fill="#ef4444" />
  <text x="440" y="80" fill="#a7f3d0" font-size="11" font-family="sans-serif">8 é o "Next Greater Element"</text>
  <text x="440" y="100" fill="#94a3b8" font-size="11" font-family="sans-serif">para 3 e para 5!</text>
</svg>

| Abordagem | Complexidade de Tempo | Como Encontra o Próximo Maior |
|---|---|---|
| **Dois Loops Aninhados (Força Bruta)** | $O(N^2)$ | Para cada item, varre todos os itens à frente |
| **Monotonic Stack** | $O(N)$ Linear | Cada elemento entra e sai da pilha no máximo 1 vez |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Problema Clássico: "Qual a próxima temperatura mais quente?"
Se as temperaturas dos próximos dias forem `[73, 74, 75, 71, 69, 72, 76]`:
- Para saber daqui a quantos dias fará mais calor que hoje, a força bruta olha para frente dia por dia ($O(N^2)$).
- A **Monotonic Stack** guarda os dias frios na pilha. Quando um dia mais quente chega, ele resolve imediatamente a dúvida de todos os dias mais frios pendentes na pilha.

#### Por que é $O(N)$ se há um `while` dentro do `for`?
Porque cada número da lista é empilhado (`push`) **exatamente uma vez** e desempilhado (`pop`) **no máximo uma vez**. A soma total de todas as operações ao longo do algoritmo inteiro é limitada a $2N$.

#### Key Takeaways
- Padrão definitivo para problemas de: *Next Greater Element*, *Daily Temperatures*, *Largest Rectangle in Histogram* e *Trapping Rain Water*.

</details>
