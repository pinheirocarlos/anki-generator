---
id: DSA-PATT-SLIDE-003
title: "Sliding Window Dinâmica com Expansão e Contração de Janela"
tags:
  - level::l3-junior
  - topic::dsa::sliding-window
  - company::google
  - freq::high
---

## Pergunta
Como funciona uma **Sliding Window Dinâmica/Variável** onde o tamanho da janela se expande e contrai sob demanda?

## Resposta
### Quick Answer
**Solução Direta**:
- Em uma janela dinâmica:
  1. **Expansão**: O ponteiro `right` avança continuamente adicionando novos elementos ao estado da janela.
  2. **Contração**: Quando uma restrição é violada (ex: soma $> S$ ou caractere duplicado), um loop interno avança o ponteiro `left++` removendo elementos até restabelecer a validade da janela.
  3. **Registro**: Atualiza a métrica ótima (tamanho máximo ou mínimo da janela).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/dynamic-sliding-window-shrink-loop.webm">
    <p>Visualização: Ajuste elástico da janela mantendo a invariante válida do problema com custo total 2N -> O(N).</p>
  </video>
</div>

| Ação de Janela Dinâmica | Movimento de Ponteiro | Disparo de Ação |
|---|---|---|
| **Expandir Janela** | `right++` | A cada passo do laço externo |
| **Contrair Janela** | `left++` | Enquanto condição for violada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Embora existam dois loops aninhados (`for right` e `while condição`), `left` e `right` avançam estritamente para a frente no máximo $N$ vezes cada, mantendo a complexidade assintótica em $O(2N) = O(N)$.

</details>
