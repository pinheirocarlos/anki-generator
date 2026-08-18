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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/uber-h3-hexagonal-spatial-index-rings-loop.webm">
    <p>Visualização: Grade espacial hexagonal Uber H3 com anéis k-ring de vizinhança uniforme sem distorções de cantos.</p>
  </video>
</div>

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
