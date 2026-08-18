---
id: DSA-ADV-SWEEPLINE-000
title: "Paradigma de Linha de Varredura (Sweep-Line) e Fila de Eventos Discretos em O(N log N)"
tags:
  - level::l3-junior
  - topic::dsa::sweepline-geometry
  - company::meta
  - freq::high
---

## Pergunta
O que é o paradigma de **Linha de Varredura (Sweep-Line)** e como ele converte problemas geométricos 2D contínuos em uma sequência de eventos discretos 1D?

## Resposta
### Quick Answer
**Solução Direta**:
- O paradigma imagina uma linha vertical infinita varrendo o plano cartesiano da esquerda para a direita ($X \to \infty$):
  1. **Fila de Eventos (*Event Queue*)**: Armazena os pontos críticos de transição (inícios de segmentos, fins, vértices) ordenados pela coordenada $X$ ($O(N \log N)$).
  2. **Estrutura de Estado (*Sweep-Line Status*)**: Mantém os objetos geométricos ativos que intersectam a linha no momento atual, armazenados em uma BST balanceada (ex: TreeMap) ordenada pela coordenada $Y$.
  3. A cada evento, o estado é atualizado e as propriedades geométricas são computadas em $O(\log N)$.
- **Complexidade**: Reduz problemas $O(N^2)$ para $O(N \log N)$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/sweepline-events-loop.webm">
    <p>Visualização: Linha imaginária varrendo o plano bidimensional processando eventos em ordem cronológica de coordenadas X.</p>
  </video>
</div>

| Componente de Sweep-Line | Estrutura de Dados | Papel no Algoritmo |
|---|---|---|
| **Fila de Eventos** | Array Ordenado / Min-Heap ($X$) | Determina a ordem cronológica da varredura |
| **Estado da Linha** | BST Balanceada / TreeMap ($Y$) | Rastreia objetos ativos que cruzam a linha |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É uma das técnicas geométricas mais poderosas para transformar complexidades espaciais contínuas em eventos computáveis.

</details>
