---
id: DSA-ADV-STRING-005
title: "Algoritmo de Manacher para Encontrar Todos os Palíndromos em Tempo Estritamente O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::apple
  - freq::high
---

## Pergunta
Como o **Algoritmo de Manacher** calcula o maior raio palíndromo centrado em cada posição de uma string em tempo linear estrito $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. **Transformação de Formato**: Insere um caractere sentinela (ex: `#`) entre cada letra (ex: `"aba" -> "^#a#b#a#$"`), unificando palíndromos de comprimento par e ímpar sob a mesma lógica de centro.
- 2. Mantém o centro $C$ e a borda direita $R$ do palíndromo mais longo avistado até o momento.
- 3. Para cada posição $i$:
  - Se $i < R$, inicializa o raio $P[i]$ aproveitando a **simetria espelhada** em relação ao centro $C$ ($i' = 2C - i$):
    $$P[i] = \min(R - i, \ P[i'])$$
  - Expande além de $P[i]$ apenas se o palíndromo ultrapassar a borda direita $R$.
- **Complexidade**: $O(N)$ linear estrito, pois a borda direita $R$ avança monotonicamente.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Manacher's Algorithm: Maior Substring Palindrômica em Tempo Estrito O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Transformação com '#' + Simetria do Centro C e Borda Direita R</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Insere '#' entre caracteres: unifica palíndromos pares e ímpares.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Espelha raio: P[i] = min(R - i, P[2*C - i]); expande apenas além de R em tempo amortizado O(N).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Encontra a maior substring palíndroma sem o custo quadrático O(N²) da expansão ingênua</text>
</svg>
<p>Visualização: Algoritmo de Manacher espelhando os raios de palíndromos já calculados através do centro ativo para tempo estrito O(N).</p>

| Algoritmo de Palíndromos | Complexidade de Tempo | Tratamento de Tamanho Par/Ímpar |
|---|---|---|
| **Expand Around Center** | $O(N^2)$ | Exige 2 loops separados ($2N-1$ centros) |
| **Algoritmo de Manacher** | **$O(N)$ Linear** | Unificado via sentinelas `#` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a resposta definitiva e ótima para o problema *Longest Palindromic Substring*.

</details>
