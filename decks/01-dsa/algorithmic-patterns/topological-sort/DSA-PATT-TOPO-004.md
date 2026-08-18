---
id: DSA-PATT-TOPO-004
title: "Ordenação Topológica via DFS com Pós-Ordem Reversa e Detecção de Back-Edges"
tags:
  - level::l4-pleno
  - topic::dsa::topological-sort
  - company::meta
  - freq::high
---

## Pergunta
Como a **DFS com Pós-Ordem Reversa (Post-Order)** gera uma ordenação topológica válida e detecta ciclos direcionados em $O(V + E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Executa DFS com coloração de 3 estados (0: White, 1: Gray, 2: Black):
  - Ao iniciar visita ao nó $u$: marca como `Gray`.
  - Para cada vizinho $v$: se $v$ for `Gray`, aborta (detectou ciclo / Back-Edge). Se for `White`, visita recursivamente.
  - Ao terminar de processar todos os descendentes de $u$: marca $u$ como `Black` e empilha $u$ em uma Pilha (ou insere no início de uma lista).
- Como um nó só é empilhado após todas as suas dependências terem sido concluídas, desempilhar todos os nós produz a **ordem topológica exata**.

### Dual Coding Visual
| Passo da DFS | Estado do Nó | Inserção na Ordem |
|---|---|---|
| **Entrada no nó** | Marcado como `Gray` (Ativo) | Nenhuma |
| **Retorno da recursão** | Marcado como `Black` (Pronto) | Empilhado (Pós-ordem reversa) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A pós-ordem reversa de uma DFS em um DAG é matematicamente equivalente à ordenação topológica.

</details>
