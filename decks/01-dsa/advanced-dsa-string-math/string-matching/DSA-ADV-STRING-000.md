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
| Algoritmo | Custo por Janela | Complexidade de Tempo Médio |
|---|---|---|
| **Busca Ingênua** | $O(M)$ Comparações | $O(N \cdot M)$ |
| **Rabin-Karp (Rolling Hash)** | $O(1)$ Recálculo do Hash | $O(N + M)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O uso de módulo primo grande ($10^9 + 7$) e double-hashing reduz a probabilidade de colisões para perto de zero.

</details>
