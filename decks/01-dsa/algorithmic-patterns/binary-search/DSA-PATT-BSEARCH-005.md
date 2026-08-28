---
id: DSA-PATT-BSEARCH-005
title: "Templates de Invariantes: while (left <= right) vs while (left < right)"
tags:
  - level::l4-pleno
  - topic::dsa::binary-search
  - company::netflix
  - freq::high
---

## Pergunta
Quais as regras de término e atualização de limites para os dois templates clássicos de Busca Binária (`while (left <= right)` vs `while (left < right)`)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Template 1 (`while (left <= right)`)**:
  - Espaço de busca: intervalo fechado $[\text{left}, \text{right}]$.
  - Atualização: `left = mid + 1` e `right = mid - 1`.
  - Término: quando $\text{left} > \text{right}$ (espaço vazio). Usado para busca de valor exato.
- **Template 2 (`while (left < right)`)**:
  - Espaço de busca: intervalo semiaberto ou convergência direta para 1 único elemento.
  - Atualização: `left = mid + 1` e `right = mid` (ou `mid = (left + right + 1) / 2` com `left = mid` e `right = mid - 1`).
  - Término: quando $\text{left} == \text{right}$. Usado para busca de limites e mínimos locais (*Find Peak Element*).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Busca Ternária para Extremos de Funções Unimodais em O(log₃ N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Dois Pontos Médios: m1 = L + (R-L)/3  |  m2 = R - (R-L)/3</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se f(m1) &lt; f(m2) (buscando máximo) → descarta o terço esquerdo [L, m1].</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Reduz o espaço de busca por um fator de 2/3 a cada iteração.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Ideal para otimização contínua e geometria computacional sem cálculo de derivadas</text>

</svg>

| Template | Condição / Atualização | Condição de Parada |
|---|---|---|
| **Template 1** | `left <= right` com `mid ± 1` | `left > right` |
| **Template 2** | `left < right` com `mid` ou `mid + 1` | `left == right` (convergiu) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A causa mais comum de loops infinitos em busca binária é misturar as regras de atualização de um template com a condição de término do outro.

</details>
