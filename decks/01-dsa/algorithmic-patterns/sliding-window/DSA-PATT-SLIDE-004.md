---
id: DSA-PATT-SLIDE-004
title: "Longest Substring Without Repeating Characters em O(N) com Hash Map de Índices"
tags:
  - level::l4-pleno
  - topic::dsa::sliding-window
  - company::amazon
  - freq::high
---

## Pergunta
Como resolver **Longest Substring Without Repeating Characters** (LeetCode 3) em tempo $O(N)$ saltando o ponteiro `left` diretamente via Hash Map?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos um mapa `lastSeen<Character, Integer>` registrando o índice da última ocorrência de cada caractere.
- Ao encontrar um caractere `c` no índice `right`:
  - Se `c` já foi visto e seu último índice é $\ge \text{left}$, saltamos `left = lastSeen.get(c) + 1` diretamente em $O(1)$, sem precisar contrair a janela passo a passo.
  - Atualizamos `lastSeen.put(c, right)`.
  - Calculamos $\text{maxLen} = \max(\text{maxLen}, \text{right} - \text{left} + 1)$.
- **Complexidade**: $O(N)$ tempo e $O(\min(N, |\Sigma|))$ espaço.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/longest-substring-distinct-hashmap-loop.webm">
    <p>Visualização: Salto direto do ponteiro left para lastIndex + 1 ao encontrar caractere duplicado no Hash Map.</p>
  </video>
</div>

| Técnica de Contração | Passos para Pular Duplicata | Complexidade |
|---|---|---|
| **Set com While `left++`** | Avança 1 a 1 até remover caractere | $O(2N)$ passos |
| **Map com Salto de Índice** | `left = max(left, lastSeen[c] + 1)` | $O(N)$ 1 único salto |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Salto Direto
```java
import java.util.HashMap;
import java.util.Map;

public class LongestSubstring {
  public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> lastSeen = new HashMap<>();
    int maxLen = 0, left = 0;

    for (int right = 0; right < s.length(); right++) {
      char c = s.charAt(right);
      if (lastSeen.containsKey(c)) {
        left = Math.max(left, lastSeen.get(c) + 1);
      }
      lastSeen.put(c, right);
      maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
  }
}
```

#### Key Takeaways
- O uso de `Math.max(left, ...)` é crucial para não retroceder o ponteiro `left` caso o caractere duplicado esteja fora da janela ativa atual.

</details>
