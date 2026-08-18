---
id: DSA-STRUCT-HEAP-002
title: "Representação Compacta de Heap Binário em Array Contíguo sem Ponteiros"
tags:
  - level::l3-junior
  - topic::dsa::heaps-priority-queues
  - company::google
  - freq::high
---

## Pergunta
Por que um Heap Binário pode ser representado compactamente em um **array contíguo sem ponteiros** e quais são as fórmulas de indexação?

## Resposta
### Quick Answer
**Solução Direta**:
- Como um Heap é uma árvore binária completa (preenchida nível por nível da esquerda para a direita), não existem "buracos" na estrutura.
- Cada nó no índice $i$ (indexação 0-based) mapeia diretamente para seus parentes via fórmulas aritméticas rápidas:
  - **Pai**: $\lfloor (i - 1) / 2 \rfloor$
  - **Filho Esquerdo**: $2i + 1$
  - **Filho Direito**: $2i + 2$
- Isso elimina 100% dos ponteiros de árvore, resultando em localidade de cache perfeita e zero overhead de memória.

### Dual Coding Visual
| Relação Familiar | Fórmula (0-Indexed) | Exemplo para Índice $i = 2$ |
|---|---|---|
| **Pai** | $(i - 1) / 2$ | $(2 - 1) / 2 = 0$ (Raiz) |
| **Filho Esquerdo** | $2i + 1$ | $2(2) + 1 = 5$ |
| **Filho Direito** | $2i + 2$ | $2(2) + 2 = 6$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O mapeamento em array contíguo torna o Heap uma das estruturas mais rápidas e eficientes em memória na computação.

</details>
