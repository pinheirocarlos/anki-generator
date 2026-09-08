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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Janela Dinâmica: Expansão com Right e Contração Mínima com Left</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Problema: Menor Subarray com Soma &gt;= Target (LeetCode 209)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Expande Right: soma += arr[right] até soma &gt;= target.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">2. Contrai Left: min_len = min(min_len, right - left + 1); soma -= arr[left++];</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Cada ponteiro avança no máximo N vezes: Tempo O(2N) = O(N), Espaço O(1)</text>
</svg>
<p>Visualização: Contração da janela dinâmica até encontrar o menor comprimento que satisfaz a restrição.</p>

| Ação de Janela Dinâmica | Movimento de Ponteiro | Disparo de Ação |
|---|---|---|
| **Expandir Janela** | `right++` | A cada passo do laço externo |
| **Contrair Janela** | `left++` | Enquanto condição for violada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Embora existam dois loops aninhados (`for right` e `while condição`), `left` e `right` avançam estritamente para a frente no máximo $N$ vezes cada, mantendo a complexidade assintótica em $O(2N) = O(N)$.

</details>
