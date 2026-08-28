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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sliding Window Maximum com Monotonic Deque em Tempo O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Deque Monotônico Decrescente de Índices</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Remove índices expirados da frente: if deque.front() &lt;= i - K → pop_front().</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Remove itens menores do fim antes de inserir: deque.peek() é sempre o máximo da janela.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Reduz o custo de O(N · K) ou O(N log K) com Heap para O(N) com Deque</text>

</svg>

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
