---
id: DSA-ADV-STRING-001
title: "Autômato de Aho-Corasick para Busca Simultânea de Dicionários em O(N + sum(M))"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::google
  - freq::high
---

## Pergunta
Como o **Autômato de Aho-Corasick** combina uma Trie com links de falha (*failure links*) para buscar milhares de palavras simultaneamente em tempo linear?

## Resposta
### Quick Answer
**Solução Direta**:
- Em vez de rodar KMP $K$ vezes para $K$ palavras diferentes ($O(K \cdot N)$), Aho-Corasick constrói uma máquina de estados finitos:
  1. Constrói uma **Trie** contendo todas as palavras do dicionário.
  2. Computa **Links de Falha (Suffix Links)** via BFS em camadas (similar à tabela $\pi$ do KMP estendida para árvores).
  3. Varre o texto $T$ em uma única passagem: a cada caractere, transita pelos estados da Trie e salta pelos links de falha em caso de mismatch.
- **Complexidade**: $O(|T| + \sum |P_i|)$ tempo linear absoluto, independentemente do número de palavras no dicionário.

### Dual Coding Visual
| Abordagem Multi-Padrão | Custo com $K$ Palavras | Escalabilidade |
|---|---|---|
| **$K \times$ KMP** | $O(K \cdot N)$ | Degrada com dicionários grandes |
| **Aho-Corasick Automaton** | $O(N + \text{TamanhoTotal})$ | Escala para milhões de palavras |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Aplicações Industriais
- É o algoritmo utilizado pelo utilitário `fgrep`, filtros de moderação de conteúdo e sistemas de detecção de intrusão (Snort).

#### Key Takeaways
- Aho-Corasick é a generalização do KMP para conjuntos de strings organizados em Trie.

</details>
