---
id: DSA-STRUCT-DSU-003
title: "Operação Union e Fusão de Componentes Conexos em DSU"
tags:
  - level::l3-junior
  - topic::dsa::disjoint-set-union
  - company::amazon
  - freq::high
---

## Pergunta
Como a operação **`union`** funde dois conjuntos no DSU e como ela verifica se dois nós já estavam conectados?

## Resposta
### Quick Answer
**Solução Direta**:
- Para fundir os conjuntos de $x$ e $y$:
  1. Encontra as raízes de ambos: `rootX = find(x)` e `rootY = find(y)`.
  2. Se `rootX == rootY`, os elementos **já pertencem ao mesmo conjunto** (nenhuma ação é necessária e retorna `false`).
  3. Se `rootX != rootY`, faz uma raiz apontar para a outra (`parent[rootX] = rootY`), unificando os grupos e decrementando o total de componentes conexos.

### Dual Coding Visual
| Condição em `union(x, y)` | Ação | Conectividade |
|---|---|---|
| `rootX == rootY` | Ignora / Sinaliza ciclo | Já conectados |
| `rootX != rootY` | `parent[rootX] = rootY` | Nova conexão estabelecida |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O retorno booleano de `union` (verdadeiro se conectou, falso se já estavam conectados) é a chave para algoritmos de detecção de ciclos e Kruskal.

</details>
