---
id: DSA-PATT-SLIDE-001
title: "Template Universal Canônico para Problemas de Sliding Window Dinâmica"
tags:
  - level::l4-pleno
  - topic::dsa::sliding-window
  - company::meta
  - freq::high
---

## Pergunta
Qual é o **template canônico universal** para resolver qualquer problema de Sliding Window Dinâmica em entrevistas FAANG?

## Resposta
### Quick Answer
**Solução Direta**:
- O template universal estrutura-se no padrão:
  ```java
  int left = 0, result = 0;
  Map<Object, Integer> windowState = new HashMap<>();

  for (int right = 0; right < n; right++) {
    // 1. Adiciona arr[right] ao estado
    addElement(windowState, arr[right]);

    // 2. Contrai a janela enquanto for inválida
    while (isWindowInvalid(windowState)) {
      removeElement(windowState, arr[left]);
      left++;
    }

    // 3. Atualiza resposta ótima
    result = Math.max(result, right - left + 1);
  }
  ```

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/sliding-window-template-expansion-loop.webm">
    <p>Visualização: Laço externo expande ponteiro direito; laço interno contrai ponteiro esquerdo enquanto a condição for inválida.</p>
  </video>
</div>

| Etapa do Template | Responsabilidade | Complexidade Amortizada |
|---|---|---|
| **1. Ingestão (`right`)** | Atualiza contadores do novo item | $O(1)$ |
| **2. Encolhimento (`left`)** | Despeja elementos inválidos | $O(1)$ Amortizado |
| **3. Coleta de Métrica** | Mede tamanho $(\text{right}-\text{left}+1)$ | $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Dominar esse esqueleto resolve ~90% dos problemas de janela deslizante do LeetCode com código limpo e sem bugs de off-by-one.

</details>
