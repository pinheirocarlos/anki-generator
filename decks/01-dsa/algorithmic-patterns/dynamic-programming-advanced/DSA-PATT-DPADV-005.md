---
id: DSA-PATT-DPADV-005
title: "Profile DP (Broken Profile / Tiling) para Preenchimento de Grades com Dominós"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-advanced
  - company::google
  - freq::high
---

## Pergunta
Como a técnica de **Profile DP (Broken Profile)** modela o preenchimento exato de uma grade $M \times N$ com dominós $2 \times 1$?

## Resposta
### Quick Answer
**Solução Direta**:
- Processamos a grade célula por célula $(r, c)$ em ordem de varredura (*raster scan*).
- O estado de DP mantém uma máscara binária de $M$ bits representando o **perfil de contorno quebrado (*broken profile*)** das últimas $M$ células (se a célula já foi coberta por um dominó ou está vazia).
- Ao avançar para a célula $(r, c)$:
  - Se já estiver coberta: apenas avança o perfil.
  - Se estiver vazia: tenta colocar um dominó horizontal (cobrindo $(r, c+1)$) ou vertical (cobrindo $(r+1, c)$).
- **Complexidade**: $O(M \cdot N \cdot 2^M)$, permitindo preenchimento de grades com $M \le 12$ e $N$ grande em tempo submilisegundo.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/dp-divide-conquer-quadrangle-loop.webm">
    <p>Visualização: Monotonicidade dos pontos de divisão ótima opt[i][j] reduzindo complexidade de O(K * N²) para O(K * N log N).</p>
  </video>
</div>

| Estratégia de Transição | Estado Rastreado | Complexidade |
|---|---|---|
| **Coluna por Coluna** | $2^M \times 2^M$ transições | $O(N \cdot 4^M)$ |
| **Broken Profile (Célula)** | $M$ bits de fronteira | $O(M \cdot N \cdot 2^M)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Processar célula a célula reduz a matriz de transição de $O(4^M)$ para $O(2^M)$, dobrando o limite suportado de $M$.

</details>
