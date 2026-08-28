---
id: DSA-ADV-SWEEPLINE-003
title: "Detecção de Interseção de Segmentos (Bentley-Ottmann) em O((N + K) log N)"
tags:
  - level::l3-junior
  - topic::dsa::sweepline-geometry
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Algoritmo de Bentley-Ottmann** encontra todas as $K$ interseções entre $N$ segmentos de reta em $O((N + K) \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Testar todos os pares de segmentos custaria $O(N^2)$.
- **Bentley-Ottmann com Sweep-Line**:
  - Dois segmentos só podem se cruzar se forem **vizinhos adjacentes imediatos** no estado da linha de varredura (BST ordenada por $Y$).
  - **Eventos**: Ponto inicial de segmento, ponto final de segmento e ponto de interseção recém-descoberto.
  - A cada inserção/remoção na BST, testamos interseção **apenas entre os vizinhos adjacentes acima e abaixo**.
  - Ao encontrar uma interseção, inserimos o novo evento na fila para trocar a ordem relativa dos dois segmentos na BST após o cruzamento.
- **Complexidade**: $O((N + K) \log N)$ tempo.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Convex Hull: Algoritmo de Monotone Chain (Andrew / Graham Scan) em O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Produto Vetorial (Cross Product) para Verificar Curvas à Esquerda</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Ordena pontos por coordenadas (x, y).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Constrói envoltória inferior e superior desempilhando pontos que formam curvas à direita em O(N).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Garante a menor fronteira convexa contendo todos os N pontos no plano</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Convex Hull: Algoritmo de Monotone Chain (Andrew / Graham Scan) em O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Produto Vetorial (Cross Product) para Verificar Curvas à Esquerda</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Ordena pontos por coordenadas (x, y).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Constrói envoltória inferior e superior desempilhando pontos que formam curvas à direita em O(N).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Garante a menor fronteira convexa contendo todos os N pontos no plano</text>

</svg>

| Abordagem | Pares Testados | Complexidade de Tempo |
|---|---|---|
| **Força Bruta** | Todos os $\binom{N}{2}$ pares | $O(N^2)$ |
| **Bentley-Ottmann (Sweep-Line)** | Apenas vizinhos adjacentes na BST | $O((N + K) \log N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Reduz dramaticamente o processamento gráfico em sistemas CAD e renderização de polígonos.

</details>
