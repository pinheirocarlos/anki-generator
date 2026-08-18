---
id: DSA-STRUCT-GRAPH-002
title: "Representação de Grafos por Matriz de Adjacência: Vantagens e Custo O(V²)"
tags:
  - level::l3-junior
  - topic::dsa::graphs-representations
  - company::google
  - freq::high
---

## Pergunta
Como funciona a representação de grafos por **Matriz de Adjacência** e quais suas características de complexidade?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Matriz de Adjacência** é uma matriz bidimensional $M$ de tamanho $V \times V$:
  - $M[u][v] = 1$ (ou peso $w$) se existe uma aresta conectando $u$ a $v$.
  - $M[u][v] = 0$ se não há aresta.
- **Vantagens**: Consulta instantânea $O(1)$ para verificar se dois vértices são adjacentes (`hasEdge(u, v)`).
- **Desvantagens**: Espaço de memória fixo quadrático $O(V^2)$ e iteração sobre vizinhos de um vértice custa sempre $O(V)$, mesmo em grafos esparsos.

### Dual Coding Visual
| Operação em Matriz | Complexidade | Observação |
|---|---|---|
| **Verificar Aresta $(u, v)$** | $O(1)$ Instantâneo | Acesso direto `M[u][v]` |
| **Listar Vizinhos de $u$** | $O(V)$ | Precisa varrer a linha inteira |
| **Consumo de Memória** | $O(V^2)$ | Proibitivo para $V > 10^5$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Matrizes de adjacência são indicadas apenas para grafos densos ($E \approx V^2$) ou quando $V$ é muito pequeno ($V \le 1000$).

</details>
