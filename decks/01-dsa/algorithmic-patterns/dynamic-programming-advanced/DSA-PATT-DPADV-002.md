---
id: DSA-PATT-DPADV-002
title: "Bitmask DP para Problema do Caixeiro Viajante (TSP) e Subconjuntos em O(N²·2^N)"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-advanced
  - company::meta
  - freq::high
---

## Pergunta
Como a **Bitmask DP** representa subconjuntos de elementos como inteiros binários para resolver o Problema do Caixeiro Viajante (TSP) em $O(N^2 2^N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Um inteiro de $N$ bits representa o conjunto de cidades visitadas (se o $i$-ésimo bit for $1$, a cidade $i$ foi visitada).
- Definimos $DP[\text{mask}][u]$ como o custo mínimo para visitar o subconjunto de cidades `mask` terminando na cidade $u$:
  $$DP[\text{mask}][u] = \min_{v \notin \text{mask}} (DP[\text{mask} \mid (1 \ll v)][v] + \text{cost}[u][v])$$
- **Complexidade**: Reduz o custo da força bruta fatorial $O(N!)$ para **$O(N^2 2^N)$**, tornando o problema tratável para $N \le 20$.

### Dual Coding Visual
| Representação de Conjunto | Formato Binário | Custo do Algoritmo |
|---|---|---|
| **Força Bruta de Permutações** | Lista de cidades visitadas | $O(N!)$ Inviável para $N > 12$ |
| **Bitmask DP (Held-Karp)** | Máscara inteira de $N$ bits | $O(N^2 2^N)$ Viável até $N=20$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Operações Bitwise Essenciais
- Testar se $i$ está na máscara: `(mask & (1 << i)) != 0`
- Adicionar $i$ à máscara: `mask | (1 << i)`
- Remover $i$ da máscara: `mask & ~(1 << i)`

#### Key Takeaways
- Bitmask DP é a técnica padrão para problemas NP-difíceis com restrição de entrada pequena ($N \le 20$).

</details>
