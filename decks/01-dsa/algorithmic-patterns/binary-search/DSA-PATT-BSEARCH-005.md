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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Comparativo de Templates: while (left &lt;= right) vs while (left &lt; right)</text>
  <g transform="translate(60, 45)">
    <!-- Template 1 -->
    <rect x="0" y="0" width="260" height="85" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="130" y="20" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Intervalo Fechado: [left, right]</text>
    <text x="15" y="40" fill="#f8fafc" font-size="10">Condição: while (left &lt;= right)</text>
    <text x="15" y="56" fill="#94a3b8" font-size="10">left = mid + 1; right = mid - 1;</text>
    <text x="15" y="72" fill="#34d399" font-size="10">Retorno: mid ao encontrar alvo direto</text>

    <!-- Template 2 -->
    <rect x="300" y="0" width="260" height="85" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="430" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Intervalo Semi-Aberto: [left, right)</text>
    <text x="315" y="40" fill="#f8fafc" font-size="10">Condição: while (left &lt; right)</text>
    <text x="315" y="56" fill="#94a3b8" font-size="10">left = mid + 1; right = mid;</text>
    <text x="315" y="72" fill="#34d399" font-size="10">Retorno: left converge para a fronteira</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Mid seguro contra overflow: mid = left + (right - left) / 2</text>
</svg>
<p>Visualização: Comparação de invariantes de loop em busca binária: intervalo fechado [L, R] vs semi-aberto [L, R).</p>

| Template | Condição / Atualização | Condição de Parada |
|---|---|---|
| **Template 1** | `left <= right` com `mid ± 1` | `left > right` |
| **Template 2** | `left < right` com `mid` ou `mid + 1` | `left == right` (convergiu) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A causa mais comum de loops infinitos em busca binária é misturar as regras de atualização de um template com a condição de término do outro.

</details>
