---
id: DSA-STRUCT-TRIE-005
title: "Trade-offs de Memória: Array de Ponteiros vs Hash Map nos Nós da Trie"
tags:
  - level::l4-pleno
  - topic::dsa::trie-prefix-tree
  - company::google
  - freq::high
---

## Pergunta
Quais os trade-offs de velocidade e consumo de memória entre usar um **Array Fixo de Ponteiros** (`Node[26]`) versus um **Hash Map** nos nós de uma Trie?

## Resposta
### Quick Answer
**Solução Direta**:
- **Array Fixo (`Node[26]`)**:
  - Acesso $O(1)$ instantâneo por aritmética de índice (`c - 'a'`).
  - Desperdício massivo de memória se o alfabeto for grande (ex: Unicode/UTF-8) ou se a Trie for esparsa (a maioria dos 26 ponteiros fica `null`).
- **Hash Map (`Map<Character, Node>`)**:
  - Aloca ponteiros estritamente sob demanda para os caracteres existentes $\to$ **Excelente eficiência de memória**.
  - Pequeno overhead adicional de hashing e indireção de objetos.

### Dual Coding Visual
| Estratégia de Nós | Acesso por Caractere | Consumo de Memória |
|---|---|---|
| **Array Fixo `Node[26]`** | $O(1)$ Ultra-rápido | Alto (26 ponteiros por nó) |
| **`Map<Character, Node>`** | $O(1)$ Médio (hash) | Mínimo (apenas caracteres reais) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Para alfabetos restritos (`a-z`), arrays fixos são preferíveis por velocidade; para caracteres gerais ou Unicode, o uso de Hash Maps ou Radix Trees é obrigatório.

</details>
