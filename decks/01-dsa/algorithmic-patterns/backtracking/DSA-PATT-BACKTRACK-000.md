---
id: DSA-PATT-BACKTRACK-000
title: "Conceito de Backtracking como DFS com Poda sobre Árvores de Decisão"
tags:
  - level::l3-junior
  - topic::dsa::backtracking
  - company::meta
  - freq::high
---

## Pergunta
O que define o paradigma de **Backtracking** e como a **Poda (Pruning)** evita a explosão combinatória da força bruta?

## Resposta
### Quick Answer
**Solução Direta**:
- **Backtracking** é uma busca exaustiva em profundidade (DFS) sobre uma árvore de decisões que constrói candidatos à solução incrementalmente:
  1. **Escolha**: Toma uma decisão adicionando um elemento ao caminho (`path.add(x)`).
  2. **Exploração**: Chama recursivamente a função para o próximo nível.
  3. **Desfazer (Backtrack)**: Reverte a decisão removendo o elemento (`path.removeLast()`) para testar o próximo ramo.
- **Poda (Pruning)**: Aborta ramos inteiros assim que uma restrição de negócio for violada (ex: soma já ultrapassou o alvo), evitando explorar subárvores inviáveis.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Backtracking: Escolher → Explorar → Desfazer Escolha (Reversão de Estado)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="0" width="130" height="60" fill="#1e293b" stroke="#3b82f6" rx="4"/>
    <text x="65" y="25" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1. Escolha</text>
    <text x="65" y="45" fill="#f8fafc" font-size="10" font-family="monospace">state.add(c)</text>

    <path d="M 135 30 L 175 30" stroke="#10b981" stroke-width="2"/>

    <rect x="180" y="0" width="130" height="60" fill="#1e293b" stroke="#10b981" rx="4"/>
    <text x="245" y="25" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. Explore (DFS)</text>
    <text x="245" y="45" fill="#f8fafc" font-size="10" font-family="monospace">backtrack(i+1)</text>

    <path d="M 315 30 L 355 30" stroke="#f43f5e" stroke-width="2"/>

    <rect x="360" y="0" width="130" height="60" fill="#1e293b" stroke="#f43f5e" rx="4"/>
    <text x="425" y="25" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">3. Desfazer</text>
    <text x="425" y="45" fill="#f8fafc" font-size="10" font-family="monospace">state.pop()</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Reutiliza a mesma estrutura de memória sem clonar listas a cada nível</text>

</svg>

| Etapa de Backtracking | Ação no Estado | Reversão na Saída |
|---|---|---|
| **1. Escolha** | `path.add(candidate)` | Estado modificado |
| **2. Recursão** | `backtrack(nextIndex, path)` | Explora subárvore |
| **3. Backtrack** | `path.remove(path.size() - 1)` | Estado restaurado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O Backtracking consome apenas $O(\text{profundidade})$ de memória auxiliar (reutilizando a mesma lista `path`), em contraste com a criação de novas listas a cada chamada.

</details>
