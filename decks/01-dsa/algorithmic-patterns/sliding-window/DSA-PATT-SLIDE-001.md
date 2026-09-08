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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Janela Deslizante Dinâmica (Expansão de Right &amp; Contração de Left)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Padrão Geral para Subarrays Contíguos Ótimos</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Expande a janela com right++ incluindo novos elementos.</text>
    <text x="20" y="62" fill="#f87171" font-size="11">2. Enquanto a condição for violada, contrai com left++ e remove do estado da janela.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Cada índice é adicionado e removido no máximo 1 vez: Tempo amortizado O(2N) = O(N)</text>

</svg>
<p>Visualização: Expansão do ponteiro direito e contração do esquerdo em janela deslizante dinâmica.</p>

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
