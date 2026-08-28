---
id: DSA-ADV-STRING-004
title: "Suffix Array e LCP Array para Indexação e Consultas de Substrings em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::meta
  - freq::high
---

## Pergunta
Como a combinação de **Suffix Array** e **LCP Array (Longest Common Prefix)** indexa textos para consultas e contagem de substrings distintas?

## Resposta
### Quick Answer
**Solução Direta**:
- **Suffix Array (`SA[]`)**: Array com os índices de todos os sufixos da string ordenados lexicograficamente. Permite buscar qualquer padrão de tamanho $M$ via Busca Binária em $O(M \log N)$.
- **LCP Array (`LCP[]`)**: Armazena o comprimento do maior prefixo comum entre sufixos adjacentes no Suffix Array (computado em $O(N)$ via Algoritmo de Kasai).
- **Contagem de Substrings Distintas**: O total de substrings únicas de uma string de tamanho $N$ é dado diretamente por:
  $$\text{Substrings Distintas} = \frac{N(N + 1)}{2} - \sum_{i=1}^{N-1} LCP[i]$$

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Manacher's Algorithm: Maior Substring Palindrômica em Tempo Estrito O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Simetria em Torno do Centro do Palíndromo</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Insere '#' entre caracteres para unificar palíndromos pares e ímpares: "^#a#b#a#$".</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Espelha os raios P[i] em relação ao centro C: P[i] = min(R - i, P[2*C - i]).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Supera a expansão ingênua O(N²) alcançando complexidade linear estrita O(N)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Manacher's Algorithm: Maior Substring Palindrômica em Tempo Estrito O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Simetria em Torno do Centro do Palíndromo</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Insere '#' entre caracteres para unificar palíndromos pares e ímpares: "^#a#b#a#$".</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Espelha os raios P[i] em relação ao centro C: P[i] = min(R - i, P[2*C - i]).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Supera a expansão ingênua O(N²) alcançando complexidade linear estrita O(N)</text>

</svg>

| Estrutura de Sufixos | Memória de Armazenamento | Propósito Principal |
|---|---|---|
| **Suffix Tree** | $O(N)$ (Constante alta ~20 bytes/nó) | Consultas complexas em grafos |
| **Suffix Array + LCP** | $O(N)$ (Arrays planos de 4 bytes) | Indexação compacta e rápida em cache |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O Suffix Array oferece o mesmo poder expressivo que uma Suffix Tree com uma fração minúscula do consumo de memória.

</details>
