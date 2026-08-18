---
id: DSA-ADV-SWEEPLINE-006
title: "Intuição Fundamental de Linha de Varredura (Sweep-Line): O Scanner Laser 2D"
tags:
  - level::l2-fundamental
  - topic::dsa::sweepline-geometry
  - company::uber
  - freq::medium
---

## Pergunta
Como a técnica de Linha de Varredura (Sweep-Line Algorithm) simplifica problemas geométricos 2D transformando-os em uma sequência linear 1D de eventos no tempo?

## Resposta
### Quick Answer
**Solução Direta**:
- A técnica **Sweep-Line** imagina uma **linha vertical laser** que desliza continuamente pelo plano cartesiano (da esquerda para a direita).
- Em vez de comparar todos os pares de formas geométricas ($O(N^2)$), ela para apenas em **pontos críticos de eventos** (onde um prédio/retângulo começa ou termina), mantendo uma estrutura ordenada dos itens ativos no feixe laser em **$O(N \log N)$**.

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Sweep-Line: Uma Linha Laser Imaginária Processa Inícios e Fins de Prédios</text>

  <!-- Prédios / Retângulos -->
  <g transform="translate(60, 45)">
    <!-- Prédio 1 -->
    <rect x="40" y="30" width="120" height="70" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="2" />
    <text x="100" y="70" fill="#93c5fd" font-size="11" text-anchor="middle">Prédio A (Alt 70)</text>

    <!-- Prédio 2 (Sobreposto) -->
    <rect x="110" y="10" width="140" height="90" fill="#065f46" stroke="#10b981" stroke-width="2" rx="2" fill-opacity="0.6" />
    <text x="180" y="55" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Prédio B (Alt 90)</text>

    <!-- Linha Laser Sweep-Line -->
    <line x1="110" y1="0" x2="110" y2="105" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="4,4" />
    <polygon points="110,0 105,8 115,8" fill="#ef4444" />
    <text x="110" y="125" fill="#fca5a5" font-size="10" font-family="monospace" text-anchor="middle">Laser em X=110</text>
    <text x="110" y="138" fill="#ef4444" font-size="9" text-anchor="middle">(Evento: Início de B)</text>
  </g>

  <!-- Painel de Eventos -->
  <g transform="translate(360, 45)">
    <rect x="0" y="0" width="200" height="90" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="100" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Fila de Eventos Ordenados</text>
    <text x="15" y="40" fill="#a7f3d0" font-size="10" font-family="monospace">1. X=40:  Entra A (Max=70)</text>
    <text x="15" y="58" fill="#34d399" font-size="10" font-family="monospace">2. X=110: Entra B (Max=90) ✓</text>
    <text x="15" y="76" fill="#94a3b8" font-size="10" font-family="monospace">3. X=160: Sai A   (Max=90)</text>
  </g>

  <text x="300" y="170" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">O contorno da cidade (Skyline) muda exatamente quando a altura máxima ativa no laser é alterada!</text>
</svg>

| Problema Geométrico | Abordagem Força Bruta | Abordagem Sweep-Line |
|---|---|---|
| **Interseção de Segmentos de Linha** | Compara todos os pares ($O(N^2)$) | Compara apenas linhas vizinhas no laser ($O(N \log N)$) |
| **Skyline Problem (Contorno de Prédios)** | Desenha pixel por pixel | Processa apenas eventos de início/fim com Max-Heap |
| **Convex Hull (Fecho Convexo)** | Teste combinatorial de triângulos | Ordena pontos e varre a fronteira |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia do Scanner de Mesa
Quando você digitaliza uma folha, a luz do scanner se move linha por linha. Em nenhum momento o scanner precisa olhar para a folha inteira ao mesmo tempo; ele só processa o que está exatamente debaixo da barra de luz naquele instante.

#### A Estrutura de Apoio
1. Uma **Fila de Prioridade (ou lista ordenada)** com todos os eventos ordenados pela coordenada $X$.
2. Uma **BST ou Heap** com os objetos que estão atualmente cruzando a linha laser para consultar o máximo/mínimo em tempo real.

#### Key Takeaways
- Transforma problemas bidimensionais complexos em problemas unidimensionais de ordenação e eventos temporais.

</details>
