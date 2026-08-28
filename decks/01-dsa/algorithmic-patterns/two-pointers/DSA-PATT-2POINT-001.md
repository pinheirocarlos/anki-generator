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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Ponteiros Rápido e Lento (Fast &amp; Slow / Floyd's Cycle Detection)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="20" width="80" height="35" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="40" y="42" fill="#fff" font-size="11" text-anchor="middle">Node 1</text>
    <line x1="80" y1="37" x2="130" y2="37" stroke="#3b82f6" stroke-width="2"/>
    <rect x="130" y="20" width="80" height="35" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="170" y="42" fill="#fff" font-size="11" text-anchor="middle">Node 2</text>
    
    <circle cx="320" cy="37" r="35" fill="none" stroke="#10b981" stroke-width="3"/>
    <circle cx="320" cy="2" r="6" fill="#f43f5e"/><text x="320" y="-8" fill="#f43f5e" font-size="9" text-anchor="middle">Fast (2 passos)</text>
    <circle cx="320" cy="72" r="6" fill="#38bdf8"/><text x="320" y="90" fill="#38bdf8" font-size="9" text-anchor="middle">Slow (1 passo)</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Garante colisão dentro do ciclo em O(N) sem usar Hash Set (Espaço O(1))</text>

</svg>

| Decisão de Ponteiro | Condição de Altura | Justificativa Matemática |
|---|---|---|
| `left++` | $H[\text{left}] < H[\text{right}]$ | `left` já atingiu sua área máxima possível |
| `right--` | $H[\text{right}] < H[\text{left}]$ | `right` já atingiu sua área máxima possível |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A prova demonstra que descartar $N-1$ pares a cada passo não perde a solução ótima, reduzindo $O(N^2)$ combinações para exatamente $N-1$ comparações ($O(N)$).

</details>
