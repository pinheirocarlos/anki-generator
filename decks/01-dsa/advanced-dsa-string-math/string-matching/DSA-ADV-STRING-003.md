---
id: DSA-ADV-STRING-003
title: "Algoritmo Z (Z-Algorithm) e o Z-Array para Busca de Padrões em O(N+M)"
tags:
  - level::l3-junior
  - topic::dsa::string-matching
  - company::amazon
  - freq::high
---

## Pergunta
O que é o **Z-Array** e como o **Algoritmo Z** encontra todas as ocorrências de um padrão concatenando $\text{Padrão} + \$ + \text{Texto}$?

## Resposta
### Quick Answer
**Solução Direta**:
- Para uma string $S$, $Z[i]$ é o comprimento do maior prefixo comum entre $S$ e a substring que começa em $S[i]$.
- **Busca de Padrões**:
  1. Constrói a string concatenada: $S = \text{pattern} + \text{"\$"} + \text{text}$ (onde `$` é um caractere sentinela único).
  2. Computa o Z-Array de $S$ em tempo linear $O(N + M)$ mantendo uma janela $[L, R]$ de casamento máximo.
  3. Qualquer posição $i$ onde $Z[i] == |\text{pattern}|$ indica uma ocorrência exata do padrão no texto no índice $i - |\text{pattern}| - 1$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Z-Algorithm: Construção do Z-Array em Tempo Linear O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Z[i] = Maior Substring Iniciando em i que Casa com Prefixo de S</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Mantém uma caixa de correspondência [L, R] mais à direita já explorada.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Reutiliza valores Z[i - L] previamente calculados gerando tempo estrito O(N).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Aplicado na string pattern + "$" + text para localizar todas as ocorrências em O(N + M)</text>
</svg>
<p>Visualização: Algoritmo Z mantendo a janela de correspondência [L, R] para calcular os valores de casamento de prefixo em tempo O(N+M).</p>
| Estrutura Concatenada | Condição de Casamento | Índice Real no Texto |
|---|---|---|
| $\text{Padrão} + \$ + \text{Texto}$ | $Z[i] == \text{len}(\text{Padrão})$ | $i - \text{len}(\text{Padrão}) - 1$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O Algoritmo Z é muito mais simples de implementar e raciocinar que o KMP, mantendo a mesma complexidade linear $O(N + M)$.

</details>
