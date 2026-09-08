---
id: DSA-PATT-2POINT-001
title: "Prova da Corretude do Descarte Guloso em Container With Most Water O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::two-pointers
  - company::meta
  - freq::high
---

## Pergunta
Como provar matematicamente a corretude do descarte guloso da menor barra em **Container With Most Water** em tempo linear $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A área formada por dois limites `left` e `right` é:
  $$\text{Área} = (\text{right} - \text{left}) \times \min(H[\text{left}], H[\text{right}])$$
- Suponha sem perda de generalidade que $H[\text{left}] < H[\text{right}]$:
  - A largura máxima possível com a barra da esquerda é a largura atual $(\text{right} - \text{left})$.
  - Se mantivermos `left` e movermos `right` para qualquer posição intermediária $k < \text{right}$, a largura diminui e a altura continua limitada por $H[\text{left}]$ ($\min(H[\text{left}], H[k]) \le H[\text{left}]$).
  - Portanto, **nenhum outro par** contendo `left` pode gerar uma área maior que a atual. Podemos descartar `left` com segurança incrementando `left++`.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Container With Most Water: Escolha Gulosa com Two Pointers</text>
  <g transform="translate(140, 50)">
    <rect x="0" y="20" width="20" height="70" fill="#3b82f6" rx="2"/>
    <text x="10" y="12" fill="#38bdf8" font-size="10" text-anchor="middle">h[L]=8</text>

    <rect x="20" y="45" width="240" height="45" fill="#0284c7" opacity="0.4"/>
    <text x="140" y="70" fill="#e0f2fe" font-size="11" font-weight="bold" text-anchor="middle">Área = min(h[L], h[R]) × (R - L)</text>

    <rect x="260" y="45" width="20" height="45" fill="#f59e0b" rx="2"/>
    <text x="270" y="37" fill="#fcd34d" font-size="10" text-anchor="middle">h[R]=5 (Menor)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Mover a barra mais alta nunca aumentará a área; logo, move-se sempre o ponteiro menor (R--)</text>
</svg>
<p>Visualização: Descarte guloso da barra mais baixa para buscar alturas maiores em Container With Most Water O(N).</p>

| Decisão de Ponteiro | Condição de Altura | Justificativa Matemática |
|---|---|---|
| `left++` | $H[\text{left}] < H[\text{right}]$ | `left` já atingiu sua área máxima possível |
| `right--` | $H[\text{right}] < H[\text{left}]$ | `right` já atingiu sua área máxima possível |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A prova demonstra que descartar $N-1$ pares a cada passo não perde a solução ótima, reduzindo $O(N^2)$ combinações para exatamente $N-1$ comparações ($O(N)$).

</details>
