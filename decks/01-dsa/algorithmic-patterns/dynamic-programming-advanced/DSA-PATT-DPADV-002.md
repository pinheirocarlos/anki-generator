---
id: DSA-PATT-DPADV-002
title: "Bitmask DP para Problema do Caixeiro Viajante (TSP) e Subconjuntos em O(N²·2^N)"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-advanced
  - company::meta
  - freq::high
---

## Pergunta
Como a **Bitmask DP** representa subconjuntos de elementos como inteiros binários para resolver o Problema do Caixeiro Viajante (TSP) em $O(N^2 2^N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Um inteiro de $N$ bits representa o conjunto de cidades visitadas (se o $i$-ésimo bit for $1$, a cidade $i$ foi visitada).
- Definimos $DP[\text{mask}][u]$ como o custo mínimo para visitar o subconjunto de cidades `mask` terminando na cidade $u$:
  $$DP[\text{mask}][u] = \min_{v \notin \text{mask}} (DP[\text{mask} \mid (1 \ll v)][v] + \text{cost}[u][v])$$
- **Complexidade**: Reduz o custo da força bruta fatorial $O(N!)$ para **$O(N^2 2^N)$**, tornando o problema tratável para $N \le 20$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Tree DP (DP em Árvores): Re-Rooting e Subárvores</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Duas Passadas DFS (Subindo e Descendo)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">DFS 1 (Bottom-Up): Calcula as respostas parciais de cada subárvore a partir das folhas.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">DFS 2 (Top-Down): Transfere a contribuição do pai ao re-enraizar a árvore para cada vizinho.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Calcula a resposta para TODAS as N possíveis raízes em tempo O(N) ao invés de O(N²)</text>

</svg>

| Representação de Conjunto | Formato Binário | Custo do Algoritmo |
|---|---|---|
| **Força Bruta de Permutações** | Lista de cidades visitadas | $O(N!)$ Inviável para $N > 12$ |
| **Bitmask DP (Held-Karp)** | Máscara inteira de $N$ bits | $O(N^2 2^N)$ Viável até $N=20$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Operações Bitwise Essenciais
- Testar se $i$ está na máscara: `(mask & (1 << i)) != 0`
- Adicionar $i$ à máscara: `mask | (1 << i)`
- Remover $i$ da máscara: `mask & ~(1 << i)`

#### Key Takeaways
- Bitmask DP é a técnica padrão para problemas NP-difíceis com restrição de entrada pequena ($N \le 20$).

</details>
