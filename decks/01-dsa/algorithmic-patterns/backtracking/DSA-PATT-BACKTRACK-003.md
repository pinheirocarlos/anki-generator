---
id: DSA-PATT-BACKTRACK-003
title: "Deduplicação em Backtracking com Elementos Repetidos (Subsets II / Combination Sum II)"
tags:
  - level::l3-junior
  - topic::dsa::backtracking
  - company::amazon
  - freq::high
---

## Pergunta
Como evitar a geração de subconjuntos e combinações duplicadas em Backtracking quando o array de entrada contém números repetidos?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. **Ordenamos o array preliminarmente** (`Arrays.sort(nums)`) para agrupar elementos idênticos adjacentes.
- 2. No loop de escolhas: se o elemento atual for igual ao anterior no mesmo nível de profundidade (`i > start && nums[i] == nums[i - 1]`), pulamos com **`continue`**.
- **Por que funciona**: A condição `i > start` permite usar o mesmo número duplicado em níveis mais profundos (ramos filhos), mas impede escolher o mesmo número mais de uma vez como a primeira opção daquele nível de ramificação (irmãos).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Geração de Subconjuntos (Power Set O(2ᴺ)) vs Permutações (O(N!))</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Subsets (Escolha Binária)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Para cada item: inclui ou não inclui</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">2ᴺ combinações totais</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Permutations (Troca de Posições)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Fixa cada elemento na posição i</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">N! ordenações distintas</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Subsets usam índice inicial 'start'; Permutações usam vetor 'used[]' ou swap in-place</text>

</svg>

| Nível de Decisão | Condição de Duplicata | Ação |
|---|---|---|
| **Primeiro item do nível (`i == start`)** | `nums[i] == nums[i-1]` | Processa normalmente (ramo filho) |
| **Irmãos subsequentes (`i > start`)** | `nums[i] == nums[i-1]` | Pula com `continue` (evita duplicata) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Subsets II
```java
import java.util.*;

public class SubsetsWithDup {
  public List<List<Integer>> subsetsWithDup(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), res);
    return res;
  }

  private void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> res) {
    res.add(new ArrayList<>(path));
    for (int i = start; i < nums.length; i++) {
      if (i > start && nums[i] == nums[i - 1]) continue; // Deduplicação
      path.add(nums[i]);
      backtrack(nums, i + 1, path, res);
      path.remove(path.size() - 1);
    }
  }
}
```

#### Key Takeaways
- Essa técnica economiza o custo de usar um `Set<List<Integer>>` e evita a geração de soluções redundantes.

</details>
