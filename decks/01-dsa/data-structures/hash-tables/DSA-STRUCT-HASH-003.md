---
id: DSA-STRUCT-HASH-003
title: "Resolução de Colisões por Encadeamento Separado (Separate Chaining)"
tags:
  - level::l3-junior
  - topic::dsa::hash-tables
  - company::microsoft
  - freq::high
---

## Pergunta
Como funciona a resolução de colisões por **Encadeamento Separado (Separate Chaining)** em tabelas hash?

## Resposta
### Quick Answer
**Solução Direta**:
- Em **Separate Chaining**, cada posição do array de buckets armazena uma lista encadeada (ou árvore binária balanceada) contendo todas as entradas que colidiram naquele mesmo índice.
- Ao buscar uma chave:
  1. Calcula-se o índice do bucket via $\text{hash}(k) \pmod M$.
  2. Percorre-se a lista daquele bucket comparando as chaves via `equals()`.
- **Complexidade**: $O(1)$ em média (com distribuição uniforme); $O(N)$ no pior caso (se todas as chaves colidirem no mesmo bucket).

### Dual Coding Visual
| Estratégia de Colisão | Estrutura no Bucket | Tratamento de Colisão |
|---|---|---|
| **Separate Chaining** | Lista Encadeada / AVL | Insere novo nó na lista do bucket |
| **Open Addressing** | Elemento direto no slot | Procura próximo slot livre |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização no Java 8 (Treeification)
Quando um bucket individual acumula **mais de 8 nós** e a capacidade total é $\ge 64$, o Java converte a lista encadeada daquele bucket em uma **Red-Black Tree**, melhorando o pior caso de busca de $O(N)$ para $O(\log N)$ contra ataques de DoS por colisão de hash.

#### Key Takeaways
- Separate Chaining é simples de implementar e degrada graciosamente mesmo quando o fator de carga ultrapassa $1.0$.

</details>
