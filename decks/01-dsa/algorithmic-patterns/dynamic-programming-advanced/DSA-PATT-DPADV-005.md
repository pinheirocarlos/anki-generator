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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Profile DP (Broken Profile / Tiling): Cobertura Célula a Célula</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Fronteira Ativa com Máscara de N bits</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Processa a grade célula (r, c) em ordem lexicográfica mantendo o perfil quebrado.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Decisões de dominó: horizontal 1×2 ou vertical 2×1 preenchendo vazios sem sobreposição.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Complexidade: O(N · M · 2ᴺ) viabilizando contagens combinatórias exatas</text>
</svg>
<p>Visualização: Profile DP (broken profile) cobrindo uma grade célula a célula rastreando a fronteira de preenchimento via máscara de bits.</p>
| Estratégia de Transição | Estado Rastreado | Complexidade |
|---|---|---|
| **Coluna por Coluna** | $2^M \times 2^M$ transições | $O(N \cdot 4^M)$ |
| **Broken Profile (Célula)** | $M$ bits de fronteira | $O(M \cdot N \cdot 2^M)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Processar célula a célula reduz a matriz de transição de $O(4^M)$ para $O(2^M)$, dobrando o limite suportado de $M$.

</details>
