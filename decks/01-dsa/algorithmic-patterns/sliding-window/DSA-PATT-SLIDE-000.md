---
id: DSA-PATT-SLIDE-000
title: "Conceito de Sliding Window e Redução de O(N·K) para O(N)"
tags:
  - level::l3-junior
  - topic::dsa::sliding-window
  - company::meta
  - freq::high
---

## Pergunta
O que é o padrão **Sliding Window (Janela Deslizante)** e como ele reduz a complexidade de tempo de $O(N \cdot K)$ para $O(N)$ linear?

## Resposta
### Quick Answer
**Solução Direta**:
- Em problemas sobre subarrays/substrings contíguos de tamanho $K$, a abordagem ingênua recalcula a propriedade da janela do zero a cada posição ($O(N \cdot K)$).
- O **Sliding Window** reaproveita o estado acumulado da janela anterior:
  - Ao deslizar a janela 1 posição para a direita, removemos o elemento que ficou para trás no início (`left`) e adicionamos o novo elemento que entrou no final (`right`).
- Como cada elemento entra e sai da janela exatamente uma única vez, o custo total é **$O(N)$ linear** com $O(1)$ por passo.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Janela Deslizante de Tamanho Fixo K em O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="10" width="50" height="35" fill="#1e293b" stroke="#64748b" rx="3"/><text x="25" y="32" fill="#94a3b8" font-size="11" text-anchor="middle">1</text>
    
    <g transform="translate(60, 0)">
      <rect x="0" y="0" width="180" height="55" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6"/>
      <text x="90" y="20" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Janela Ativa (K = 3)</text>
      <text x="30" y="42" fill="#fff" font-size="12" text-anchor="middle">2</text>
      <text x="90" y="42" fill="#fff" font-size="12" text-anchor="middle">3</text>
      <text x="150" y="42" fill="#fff" font-size="12" text-anchor="middle">4</text>
    </g>

    <rect x="250" y="10" width="50" height="35" fill="#1e293b" stroke="#64748b" rx="3"/><text x="275" y="32" fill="#94a3b8" font-size="11" text-anchor="middle">5</text>
    <rect x="310" y="10" width="50" height="35" fill="#1e293b" stroke="#64748b" rx="3"/><text x="335" y="32" fill="#94a3b8" font-size="11" text-anchor="middle">6</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="11" font-family="monospace" text-anchor="middle">Nova Soma = Soma_Anterior - arr[i - K] + arr[i]</text>
  <text x="340" y="170" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Atualização em tempo O(1) por passo → Complexidade total O(N)</text>

</svg>
<p>Visualização: Janela deslizante de tamanho fixo calculando o delta de entrada e saída em O(1).</p>

| Abordagem | Cálculo por Deslizamento | Complexidade Total |
|---|---|---|
| **Força Bruta** | Recalcula todos os $K$ itens | $O(N \cdot K)$ ou $O(N^2)$ |
| **Sliding Window** | $\text{soma} += \text{entra} - \text{sai}$ | $O(N)$ Linear |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O princípio fundamental é transformar um problema quadrático de recálculo em um problema linear de atualização delta ($+ \text{in} - \text{out}$).

</details>
