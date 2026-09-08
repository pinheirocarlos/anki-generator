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
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Interseção de Segmentos com Algoritmo de Bentley-Ottmann</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">BST de Segmentos Ativos Ordenados pelo Eixo Y</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Apenas segmentos adjacentes na árvore BST podem se cruzar.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Ao detectar cruzamento, insere o ponto de interseção como novo evento na fila.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Reduz a comparação quadrática ingênua O(N²) para tempo eficiente O((N + K) log N)</text>
</svg>
<p>Visualização: Algoritmo de Bentley-Ottmann detectando interseções entre segmentos adjacentes na estrutura de estado ativa em O((N + K) log N).</p>
| Abordagem | Pares Testados | Complexidade de Tempo |
|---|---|---|
| **Força Bruta** | Todos os $\binom{N}{2}$ pares | $O(N^2)$ |
| **Bentley-Ottmann (Sweep-Line)** | Apenas vizinhos adjacentes na BST | $O((N + K) \log N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Reduz dramaticamente o processamento gráfico em sistemas CAD e renderização de polígonos.

</details>
