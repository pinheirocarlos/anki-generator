---
id: DSA-PATT-BACKTRACK-000
title: "Conceito de Backtracking como DFS com Poda sobre Árvores de Decisão"
tags:
  - level::l3-junior
  - topic::dsa::backtracking
  - company::meta
  - freq::high
---

## Pergunta
O que define o paradigma de **Backtracking** e como a **Poda (Pruning)** evita a explosão combinatória da força bruta?

## Resposta
### Quick Answer
**Solução Direta**:
- **Backtracking** é uma busca exaustiva em profundidade (DFS) sobre uma árvore de decisões que constrói candidatos à solução incrementalmente:
  1. **Escolha**: Toma uma decisão adicionando um elemento ao caminho (`path.add(x)`).
  2. **Exploração**: Chama recursivamente a função para o próximo nível.
  3. **Desfazer (Backtrack)**: Reverte a decisão removendo o elemento (`path.removeLast()`) para testar o próximo ramo.
- **Poda (Pruning)**: Aborta ramos inteiros assim que uma restrição de negócio for violada (ex: soma já ultrapassou o alvo), evitando explorar subárvores inviáveis.

### Dual Coding Visual
| Etapa de Backtracking | Ação no Estado | Reversão na Saída |
|---|---|---|
| **1. Escolha** | `path.add(candidate)` | Estado modificado |
| **2. Recursão** | `backtrack(nextIndex, path)` | Explora subárvore |
| **3. Backtrack** | `path.remove(path.size() - 1)` | Estado restaurado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O Backtracking consome apenas $O(\text{profundidade})$ de memória auxiliar (reutilizando a mesma lista `path`), em contraste com a criação de novas listas a cada chamada.

</details>
