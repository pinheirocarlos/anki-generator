---
id: DSA-ADV-STRING-000
title: "Algoritmo de Rabin-Karp com Rolling Hash Polinomial e Aritmética Modular"
tags:
  - level::l3-junior
  - topic::dsa::string-matching
  - company::google
  - freq::high
---

## Pergunta
Como o **Algoritmo de Rabin-Karp** utiliza **Rolling Hash polinomial** para buscar padrões em texto em tempo médio linear $O(N + M)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Em vez de comparar substrings caractere por caractere ($O(M)$), Rabin-Karp calcula o valor de hash do padrão e de uma janela deslizante de tamanho $M$ no texto:
- **Rolling Hash**: Ao deslizar a janela de $i$ para $i+1$, o novo hash é computado em **$O(1)$**:
  $$H_{\text{novo}} = ( (H_{\text{ant}} - S[i] \cdot B^{M-1}) \cdot B + S[i+M] ) \pmod P$$
  - Onde $B$ é a base (ex: 31 ou 257) e $P$ é um primo grande (ex: $10^9 + 7$).
- Se $H_{\text{janela}} == H_{\text{padrão}}$, compara os caracteres reais para descartar colisões espúrias.
- **Complexidade**: $O(N + M)$ tempo médio e $O(1)$ espaço.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Knuth-Morris-Pratt (KMP): Tabela de Prefixo π (LPS) em Tempo O(N + M)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Longest Proper Prefix which is also Suffix (LPS)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao ocorrer mismatch no caractere j do padrão: j = lps[j - 1].</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">O ponteiro do texto NUNCA retrocede; salta diretamente para o prefixo coincidente.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Elimina o recuo quadrático O(N · M) da busca ingênua (brute force)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Knuth-Morris-Pratt (KMP): Tabela de Prefixo π (LPS) em Tempo O(N + M)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Longest Proper Prefix which is also Suffix (LPS)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao ocorrer mismatch no caractere j do padrão: j = lps[j - 1].</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">O ponteiro do texto NUNCA retrocede; salta diretamente para o prefixo coincidente.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Elimina o recuo quadrático O(N · M) da busca ingênua (brute force)</text>

</svg>

| Algoritmo | Custo por Janela | Complexidade de Tempo Médio |
|---|---|---|
| **Busca Ingênua** | $O(M)$ Comparações | $O(N \cdot M)$ |
| **Rabin-Karp (Rolling Hash)** | $O(1)$ Recálculo do Hash | $O(N + M)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O uso de módulo primo grande ($10^9 + 7$) e double-hashing reduz a probabilidade de colisões para perto de zero.

</details>
