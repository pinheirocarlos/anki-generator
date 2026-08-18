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
| Estrutura de Sufixos | Memória de Armazenamento | Propósito Principal |
|---|---|---|
| **Suffix Tree** | $O(N)$ (Constante alta ~20 bytes/nó) | Consultas complexas em grafos |
| **Suffix Array + LCP** | $O(N)$ (Arrays planos de 4 bytes) | Indexação compacta e rápida em cache |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O Suffix Array oferece o mesmo poder expressivo que uma Suffix Tree com uma fração minúscula do consumo de memória.

</details>
