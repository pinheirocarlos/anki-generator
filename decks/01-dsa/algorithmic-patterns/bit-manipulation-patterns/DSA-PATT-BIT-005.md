---
id: DSA-PATT-BIT-005
title: "Geração de Todos os Subconjuntos de uma Máscara via (sub - 1) & mask em O(3^N)"
tags:
  - level::l4-pleno
  - topic::dsa::bit-manipulation-patterns
  - company::amazon
  - freq::high
---

## Pergunta
Como iterar estritamente sobre todos os subconjuntos de uma máscara binária usando a expressão **`sub = (sub - 1) & mask`** em tempo total $O(3^N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Para iterar sobre todos os sub-padrões de bits ativos de uma máscara `mask` sem testar inteiros irrelevantes:
  ```java
  for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
    // Processa o subconjunto ativo 'sub'
  }
  ```
- **Por que funciona**: Subtrair 1 decrementa o padrão; ao fazer AND com `mask`, limpamos todos os bits que não faziam parte da máscara original, pulando diretamente para o próximo subconjunto válido.
- **Complexidade Global**: Para todas as $2^N$ máscaras possíveis, o total de iterações sobre todos os subconjuntos é:
  $$\sum_{k=0}^N \binom{N}{k} 2^k = (1 + 2)^N = 3^N$$

### Dual Coding Visual
| Abordagem | Estados Avaliados | Complexidade para todas as máscaras |
|---|---|---|
| **Loop Ingênuo de $0$ a `mask`** | Testa números inválidos | $O(4^N)$ |
| **`(sub - 1) & mask`** | Visita apenas subconjuntos válidos | $O(3^N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a técnica fundamental para problemas avançados de Bitmask DP com particionamento de conjuntos (*Partition Array into Subsets*).

</details>
