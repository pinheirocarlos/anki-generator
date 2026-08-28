---
id: SYS-ARCH-RIDE-000
title: "Indexação Geoespacial: Geohash vs Google S2 vs Uber H3 (Hexágonos)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::uber
  - freq::high
---

## Pergunta
Por que sistemas de mobilidade urbana (Uber / Lyft) utilizam células hexagonais (Uber H3) em vez de Geohashes retangulares para indexação espacial?

## Resposta
### Quick Answer
**Solução Direta**:
- **Geohash (Retângulos / Quadrados)**:
  - Codifica latitude e longitude em strings de base32 intercalando bits.
  - **Problema**: Células adjacentes possuem distâncias variáveis entre centros (4 vizinhos laterais a distância $D$, 4 vizinhos diagonais a distância $\sqrt{2}D$).
- **Uber H3 (Sistema Hexagonal Hierárquico)**:
  - Divide a superfície do globo terrestre em uma malha de **hexágonos regulares**.
  - **Propriedade Única do Hexágono**: **Todos os 6 vizinhos adjacentes estão exatamente à mesma distância** do centro geométrico.
  - Simplifica cálculos de raio de busca de motoristas (k-ring search), zoneamento de preços dinâmicos (*Surge Pricing*) e interpolação de demanda sem distorções diagonais.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Indexação Geoespacial: Geohash vs Google S2 vs Uber H3 (Hexágonos)</text>
  <g transform="translate(40, 50)">
    <!-- Geohash / S2 (Squares) -->
    <rect x="0" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Grades Quadradas (Geohash / S2)</text>
    <text x="140" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">8 Vizinhos: 4 lados + 4 diagonais</text>
    <text x="140" y="70" fill="#f87171" font-size="10" text-anchor="middle">Distorção: diagonais têm distâncias 1.41x</text>
    <text x="140" y="92" fill="#fca5a5" font-size="9" text-anchor="middle">Complica buscas de raio circular (k-ring)</text>

    <!-- Uber H3 (Hexagons) -->
    <rect x="320" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Grade Hexagonal Uber H3</text>
    <text x="460" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">6 Vizinhos Equidistantes</text>
    <text x="460" y="70" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Distância constante entre centros</text>
    <text x="460" y="92" fill="#a7f3d0" font-size="9" text-anchor="middle">Perfeito para matching e surge pricing contíguo</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Uber H3 indexa a Terra em 16 resoluções hierárquicas através de números inteiros compactos de 64 bits (uint64).</text>

</svg>

| Sistema Geoespacial | Formato da Célula | Distância para Todos os Vizinhos |
|---|---|---|
| **Geohash** | Retângulo / Quadrado | Desigual (Vizinhos diagonais estão a $\sqrt{2}D$) |
| **Google S2** | Projeção cúbica quadtree | Desigual nos cantos da projeção |
| **Uber H3** | **Hexágono Regular** | **Estritamente idêntica para todos os 6 vizinhos** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Resoluções no Uber H3
- Resolução 7: Área de $\approx 5 \text{ km}^2$ (Ideal para cálculo de Surge Pricing em bairros).
- Resolução 9: Área de $\approx 0.1 \text{ km}^2$ (Ideal para matching motorista-passageiro no raio de 1 km).

</details>
