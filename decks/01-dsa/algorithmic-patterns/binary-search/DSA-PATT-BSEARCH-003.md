---
id: DSA-PATT-BSEARCH-003
title: "Busca Binária em Arrays Rotacionados (Search in Rotated Sorted Array)"
tags:
  - level::l3-junior
  - topic::dsa::binary-search
  - company::meta
  - freq::high
---

## Pergunta
Como adaptar a Busca Binária para encontrar um alvo em um **array rotacionado em pivô desconhecido** em tempo $O(\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Em qualquer array ordenado rotacionado (ex: `[4, 5, 6, 7, 0, 1, 2]`), dividindo ao meio em `mid`, **ao menos uma das metades está garantidamente ordenada**:
  - Se `arr[left] <= arr[mid]`: A metade esquerda está ordenada.
    - Se $\text{arr}[\text{left}] \le \text{target} < \text{arr}[\text{mid}]$, busca na esquerda (`right = mid - 1`); senão, busca na direita (`left = mid + 1`).
  - Caso contrário: A metade direita está ordenada.
    - Se $\text{arr}[\text{mid}] < \text{target} \le \text{arr}[\text{right}]$, busca na direita (`left = mid + 1`); senão, busca na esquerda (`right = mid - 1`).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Busca Binária em Array Rotacionado: Metade Monotônica</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Pelo menos uma das metades [low..mid] ou [mid..high] está perfeitamente ordenada</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se nums[low] &lt;= nums[mid]: a metade esquerda é contínua e ordenada.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Verifica se target reside dentro de [nums[low], nums[mid]] para descartar a outra metade.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Complexidade mantida em O(log N) mesmo com rotação circular</text>

</svg>
<p>Visualização: Busca binária em vetor rotacionado identificando a metade monotônica ordenada para direcionar o descarte.</p>

| Metade Ordenada | Condição de Teste | Regra de Descarte |
|---|---|---|
| **Esquerda Ordenada** | `arr[left] <= arr[mid]` | Verifica se alvo está entre `left` e `mid` |
| **Direita Ordenada** | `arr[left] > arr[mid]` | Verifica se alvo está entre `mid` e `right` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Mesmo com a rotação, o teste de ordenação de metade preserva o descarte de 50% dos elementos a cada passo, garantindo $O(\log N)$.

</details>
