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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sweep-Line: Uma Linha Laser Imaginária Processa Inícios e Fins de Objetos</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Metáfora do Scanner de Código de Barras</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Em vez de olhar o plano 2D inteiro de uma vez, você passa um scanner vertical.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Você só precisa recalcular coisas nos pontos exatos onde algo começa, cruza ou termina.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Converte problemas contínuos infinitos em um conjunto discreto finito de eventos</text>
</svg>
<p>Visualização: Metáfora do scanner laser: transformar um problema geométrico bidimensional contínuo em uma sequência cronológica de eventos pontuais.</p>
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
