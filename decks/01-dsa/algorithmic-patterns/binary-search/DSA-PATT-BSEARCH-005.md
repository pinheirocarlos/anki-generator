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
| Template | Condição / Atualização | Condição de Parada |
|---|---|---|
| **Template 1** | `left <= right` com `mid ± 1` | `left > right` |
| **Template 2** | `left < right` com `mid` ou `mid + 1` | `left == right` (convergiu) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A causa mais comum de loops infinitos em busca binária é misturar as regras de atualização de um template com a condição de término do outro.

</details>
