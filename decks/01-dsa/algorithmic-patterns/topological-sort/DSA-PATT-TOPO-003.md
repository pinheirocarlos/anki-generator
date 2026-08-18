---
id: DSA-PATT-TOPO-003
title: "Impossibilidade de Ordenação Topológica na Presença de Ciclos"
tags:
  - level::l3-junior
  - topic::dsa::topological-sort
  - company::meta
  - freq::high
---

## Pergunta
Por que a presença de um ciclo em um grafo direcionado quebra matematicamente qualquer tentativa de ordenação linear?

## Resposta
### Quick Answer
**Solução Direta**:
- Seja um ciclo simples $v_1 \to v_2 \to \dots \to v_k \to v_1$.
- Pela definição de ordenação topológica, deveríamos ter:
  $$\text{pos}(v_1) < \text{pos}(v_2) < \dots < \text{pos}(v_k) < \text{pos}(v_1)$$
- Isso imporia $\text{pos}(v_1) < \text{pos}(v_1)$, o que é uma contradição lógica estrita.
- Portanto, qualquer algoritmo de ordenação topológica atua simultaneamente como um **detector de ciclos direcionados**.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/topo-sort-cycle-detection-deadlock-loop.webm">
    <p>Visualização: Bloqueio do algoritmo de Kahn com nós restantes de in-degree > 0 provando a presença de ciclos.</p>
  </video>
</div>

| Estrutura de Dependência | Relação de Posição | Status de Validade |
|---|---|---|
| **Caminho Linear $A \to B \to C$** | $\text{pos}(A) < \text{pos}(B) < \text{pos}(C)$ | Válido |
| **Ciclo $A \to B \to C \to A$** | $\text{pos}(A) < \dots < \text{pos}(A)$ | Impossível (Contradição) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de código, o tratamento do caso em que o grafo contém ciclos (retornando array vazio `[]`) é o teste de borda mais comum em problemas como *Course Schedule*.

</details>
