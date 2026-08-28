---
id: DSA-ADV-STRING-002
title: "Algoritmo KMP e a Tabela de Prefixos Pi (LPS - Longest Prefix Suffix) em O(N+M)"
tags:
  - level::l3-junior
  - topic::dsa::string-matching
  - company::meta
  - freq::high
---

## Pergunta
Como o **Algoritmo KMP (Knuth-Morris-Pratt)** utiliza a tabela LPS para nunca retroceder o ponteiro do texto durante o casamento de padrões?

## Resposta
### Quick Answer
**Solução Direta**:
- A tabela **LPS (`pi[]`)** armazena o comprimento do maior prefixo próprio que também é sufixo para cada prefixo do padrão.
- Ao encontrar uma incompatibilidade (*mismatch*) no caractere $j$ do padrão após casar $j$ caracteres:
  - O KMP não reinicia a busca do texto; ele consulta **`j = lps[j - 1]`**.
  - Esse salto reaproveita os caracteres que já sabemos que casam com o início do padrão, mantendo o ponteiro do texto $i$ avançando **estritamente para a frente**.
- **Complexidade**: $O(N + M)$ tempo estrito garantido no pior caso e $O(M)$ espaço auxiliar.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Z-Algorithm: Construção do Z-Array em Tempo Linear O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Z[i] = Maior Substring Iniciando em i que Casar com Prefixo de S</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Mantém uma caixa de correspondência [L, R] mais à direita já explorada.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Reutiliza valores Z[i - L] previamente calculados: Tempo estrito O(N).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Aplicado na string pattern + "$" + text para localizar todas as ocorrências em O(N + M)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Z-Algorithm: Construção do Z-Array em Tempo Linear O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Z[i] = Maior Substring Iniciando em i que Casar com Prefixo de S</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Mantém uma caixa de correspondência [L, R] mais à direita já explorada.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Reutiliza valores Z[i - L] previamente calculados: Tempo estrito O(N).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Aplicado na string pattern + "$" + text para localizar todas as ocorrências em O(N + M)</text>

</svg>

| Comportamento em Mismatch | Ponteiro do Texto $i$ | Ponteiro do Padrão $j$ |
|---|---|---|
| **Busca Ingênua** | Retrocede para $i - j + 1$ | Reinicia em $0$ |
| **KMP (Knuth-Morris-Pratt)** | **Nunca retrocede** (Avança sempre) | Salta para `lps[j - 1]` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É o algoritmo canônico para garantir que o casamento de strings seja concluído em tempo estritamente determinístico $O(N + M)$ sem depender de hashing.

</details>
