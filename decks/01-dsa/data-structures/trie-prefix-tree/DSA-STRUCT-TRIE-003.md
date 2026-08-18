---
id: DSA-STRUCT-TRIE-003
title: "Implementação de Autocomplete e Sugestões de Busca com Trie e DFS"
tags:
  - level::l3-junior
  - topic::dsa::trie-prefix-tree
  - company::twitter
  - freq::high
---

## Pergunta
Como implementar um mecanismo de **Autocomplete** de palavras combinando busca em Trie com travessia DFS?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo de Autocomplete divide-se em duas etapas:
  1. **Localizar o Nó do Prefixo**: Percorre a Trie com o prefixo digitado pelo usuário em $O(P)$ até o nó terminal $N_{\text{prefix}}$.
  2. **Explorar Sugestões via DFS**: A partir de $N_{\text{prefix}}$, executa uma busca em profundidade (DFS) para coletar todas as palavras com flag `isEndOfWord == true` na subárvore abaixo daquele nó.
- **Complexidade**: $O(P + K)$, onde $P$ é o tamanho do prefixo e $K$ é o número total de caracteres explorados na subárvore de sugestões.

### Dual Coding Visual
| Etapa do Autocomplete | Algoritmo | Complexidade |
|---|---|---|
| **1. Navegação de Prefixo** | Busca padrão em Trie | $O(P)$ |
| **2. Coleta de Palavras** | DFS na subárvore | $O(K)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a espinha dorsal de caixas de sugestão de busca (Google Search / Typeahead) e corretores ortográficos de teclado.

</details>
