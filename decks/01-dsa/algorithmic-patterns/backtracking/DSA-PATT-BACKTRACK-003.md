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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/n-queens-bitmask-attack-vectors-loop.webm">
    <p>Visualização: Rastreamento de colunas e diagonais ocupadas usando máscaras binárias e avanço por linhas.</p>
  </video>
</div>

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
