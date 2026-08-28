---
id: DSA-ADV-SWEEPLINE-000
title: "Paradigma de Linha de Varredura (Sweep-Line) e Fila de Eventos Discretos em O(N log N)"
tags:
  - level::l3-junior
  - topic::dsa::sweepline-geometry
  - company::meta
  - freq::high
---

## Pergunta
O que é o paradigma de **Linha de Varredura (Sweep-Line)** e como ele converte problemas geométricos 2D contínuos em uma sequência de eventos discretos 1D?

## Resposta
### Quick Answer
**Solução Direta**:
- O paradigma imagina uma linha vertical infinita varrendo o plano cartesiano da esquerda para a direita ($X \to \infty$):
  1. **Fila de Eventos (*Event Queue*)**: Armazena os pontos críticos de transição (inícios de segmentos, fins, vértices) ordenados pela coordenada $X$ ($O(N \log N)$).
  2. **Estrutura de Estado (*Sweep-Line Status*)**: Mantém os objetos geométricos ativos que intersectam a linha no momento atual, armazenados em uma BST balanceada (ex: TreeMap) ordenada pela coordenada $Y$.
  3. A cada evento, o estado é atualizado e as propriedades geométricas são computadas em $O(\log N)$.
- **Complexidade**: Reduz problemas $O(N^2)$ para $O(N \log N)$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sweep-Line: Varredura de Eventos Ordenados por Coordenada X</text>
  <g transform="translate(140, 50)">
    <line x1="180" y1="0" x2="180" y2="85" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4"/>
    <text x="180" y="-8" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Sweep Line (X)</text>

    <circle cx="60" cy="30" r="6" fill="#3b82f6"/><text x="60" y="20" fill="#93c5fd" font-size="9" text-anchor="middle">Start (1)</text>
    <circle cx="180" cy="50" r="6" fill="#f59e0b"/><text x="180" y="70" fill="#fcd34d" font-size="9" text-anchor="middle">Event (2)</text>
    <circle cx="300" cy="20" r="6" fill="#10b981"/><text x="300" y="10" fill="#a7f3d0" font-size="9" text-anchor="middle">End (3)</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Transforma problemas geométricos 2D estáticos em problemas 1D dinâmicos em O(N log N)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sweep-Line: Varredura de Eventos Ordenados por Coordenada X</text>
  <g transform="translate(140, 50)">
    <!-- Vertical sweep line -->
    <line x1="180" y1="0" x2="180" y2="85" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4"/>
    <text x="180" y="-8" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Sweep Line (X)</text>

    <!-- Point Events -->
    <circle cx="60" cy="30" r="6" fill="#3b82f6"/><text x="60" y="20" fill="#93c5fd" font-size="9" text-anchor="middle">Start (1)</text>
    <circle cx="180" cy="50" r="6" fill="#f59e0b"/><text x="180" y="70" fill="#fcd34d" font-size="9" text-anchor="middle">Event (2)</text>
    <circle cx="300" cy="20" r="6" fill="#10b981"/><text x="300" y="10" fill="#a7f3d0" font-size="9" text-anchor="middle">End (3)</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Transforma problemas geométricos 2D estáticos em problemas 1D dinâmicos em O(N log N)</text>

</svg>

| Componente de Sweep-Line | Estrutura de Dados | Papel no Algoritmo |
|---|---|---|
| **Fila de Eventos** | Array Ordenado / Min-Heap ($X$) | Determina a ordem cronológica da varredura |
| **Estado da Linha** | BST Balanceada / TreeMap ($Y$) | Rastreia objetos ativos que cruzam a linha |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É uma das técnicas geométricas mais poderosas para transformar complexidades espaciais contínuas em eventos computáveis.

</details>
