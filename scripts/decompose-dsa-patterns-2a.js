import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Module 2 Part 2a: DP & Greedy (19 to 22)...');

// 19. dynamic-programming-1d
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-1d/DSA-PATT-DP1D-000.md', `---
id: DSA-PATT-DP1D-000
title: "Subestrutura Ótima e Sobreposição de Subproblemas em Programação Dinâmica"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-1d
  - company::meta
  - freq::high
---

## Pergunta
Quais são as duas propriedades matemáticas fundamentais que qualificam um problema para resolução via **Programação Dinâmica (DP)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **1. Subestrutura Ótima (*Optimal Substructure*)**: A solução ótima do problema global pode ser construída a partir das soluções ótimas de seus subproblemas menores.
- **2. Sobreposição de Subproblemas (*Overlapping Subproblems*)**: O mesmo subproblema é recalculado repetidas vezes em múltiplos ramos da árvore recursiva (ex: $\\text{fib}(3)$ sendo recalculado por $\\text{fib}(5)$ e $\\text{fib}(4)$).
- A Programação Dinâmica resolve cada subproblema exatamente uma única vez, armazenando o resultado em cache para consultas futuras em $O(1)$.

### Dual Coding Visual
| Propriedade de DP | Definição | Exemplo Canônico |
|---|---|---|
| **Subestrutura Ótima** | Solução global composta de subsoluções | $DP[i] = DP[i-1] + DP[i-2]$ |
| **Sobreposição de Subproblemas** | Recálculo repetido de mesmos estados | Árvore recursiva de Fibonacci |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Problemas com subestrutura ótima mas **sem** sobreposição de subproblemas (subproblemas disjuntos) são resolvidos por *Divisão e Conquista* (ex: Mergesort), e não por DP.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-1d/DSA-PATT-DP1D-002.md', `---
id: DSA-PATT-DP1D-002
title: "Memoization (Top-Down) vs Tabulation (Bottom-Up) em Programação Dinâmica"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-1d
  - company::google
  - freq::high
---

## Pergunta
Quais as diferenças estruturais e trade-offs entre **Memoization (Top-Down)** e **Tabulation (Bottom-Up)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Memoization (Top-Down)**: Mantém a estrutura recursiva natural descendo do problema maior para os subproblemas, guardando os retornos em um mapa/array (\`memo[]\`). Vantagem: calcula apenas os estados estritamente necessários. Desvantagem: overhead de chamadas de função e risco de StackOverflow.
- **Tabulation (Bottom-Up)**: Itera iterativamente a partir dos casos base até o estado final preenchendo uma tabela (\`dp[]\`). Vantagem: zero overhead de recursão e permite otimizações de espaço in-place ($O(1)$).

### Dual Coding Visual
| Estratégia de DP | Fluxo de Computação | Estrutura de Controle |
|---|---|---|
| **Memoization (Top-Down)** | Problema Maior $\\to$ Casos Base | Recursão + Cache (\`memo[]\`) |
| **Tabulation (Bottom-Up)** | Casos Base $\\to$ Problema Maior | Loop iterativo (\`for\`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de código, começar descrevendo a intuição recursiva (Top-Down) e converter para a tabela iterativa (Bottom-Up) demonstra maturidade algorítmica completa.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-1d/DSA-PATT-DP1D-003.md', `---
id: DSA-PATT-DP1D-003
title: "Otimização de Espaço de DP 1D de O(N) para O(1) com Duas Variáveis"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-1d
  - company::amazon
  - freq::high
---

## Pergunta
Como reduzir o espaço de memória de uma DP 1D de $O(N)$ para **tempo constante $O(1)$** quando o estado depende apenas dos $K$ termos anteriores?

## Resposta
### Quick Answer
**Solução Direta**:
- Se a relação de recorrência para $DP[i]$ depende apenas dos dois estados anteriores ($DP[i-1]$ e $DP[i-2]$, como em *Climbing Stairs* e *Fibonacci*):
  - Não é necessário alocar um array \`int dp[N]\`.
  - Mantemos apenas duas variáveis escalares: \`prev2\` e \`prev1\`.
  - A cada passo: \`curr = prev1 + prev2\`, seguido por \`prev2 = prev1\` e \`prev1 = curr\`.
- **Complexidade**: Reduz o espaço de $O(N)$ para **$O(1)$** estrito mantendo o tempo em $O(N)$.

### Dual Coding Visual
| Abordagem | Consumo de Memória | Estrutura de Armazenamento |
|---|---|---|
| **Array \`dp[]\` Completo** | $O(N)$ | Array alocado no Heap |
| **Variáveis Escalares** | $O(1)$ | 2 registradores na CPU |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Climbing Stairs O(1)
\`\`\`java
public class ClimbingStairs {
  public int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
      int curr = prev1 + prev2;
      prev2 = prev1;
      prev1 = curr;
    }
    return prev1;
  }
}
\`\`\`

#### Key Takeaways
- É a primeira pergunta de otimização que qualquer entrevistador sênior fará após você apresentar uma solução com array $O(N)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-1d/DSA-PATT-DP1D-001.md', `---
id: DSA-PATT-DP1D-001
title: "House Robber e a Transição de Estados DP[i] = max(DP[i-1], DP[i-2] + nums[i])"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-1d
  - company::meta
  - freq::high
---

## Pergunta
Como modelar a equação de recorrência e a escolha binária (roubar vs não roubar) no problema **House Robber** (LeetCode 198)?

## Resposta
### Quick Answer
**Solução Direta**:
- Em cada casa $i$, existem duas escolhas mutualmente exclusivas:
  1. **Não roubar a casa $i$**: O ganho máximo é igual ao acumulado até a casa anterior ($DP[i-1]$).
  2. **Roubar a casa $i$**: Não podemos roubar a casa $i-1$; logo, o ganho é o valor de $A[i]$ mais o acumulado até a casa $i-2$ ($DP[i-2] + A[i]$).
- **Equação de Recorrência**:
  $$DP[i] = \\max(DP[i-1], \\ DP[i-2] + A[i])$$
- **Complexidade**: $O(N)$ tempo e $O(1)$ espaço (usando duas variáveis).

### Dual Coding Visual
| Decisão na Casa $i$ | Restrição Aplicada | Ganho Acumulado |
|---|---|---|
| **Roubar Casa $i$** | Não pode roubar $i-1$ | $DP[i-2] + A[i]$ |
| **Pular Casa $i$** | Mantém saque de $i-1$ | $DP[i-1]$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: House Robber O(1) Espaço
\`\`\`java
public class HouseRobber {
  public int rob(int[] nums) {
    if (nums.length == 0) return 0;
    int robPrev2 = 0, robPrev1 = 0;
    for (int num : nums) {
      int curr = Math.max(robPrev1, robPrev2 + num);
      robPrev2 = robPrev1;
      robPrev1 = curr;
    }
    return robPrev1;
  }
}
\`\`\`

#### Key Takeaways
- Modela perfeitamente problemas de seleção com restrição de elementos adjacentes.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-1d/DSA-PATT-DP1D-004.md', `---
id: DSA-PATT-DP1D-004
title: "Coin Change (Mochila Unbounded) em Tempo O(N · Amount)"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-1d
  - company::amazon
  - freq::high
---

## Pergunta
Como a Programação Dinâmica 1D resolve o problema **Coin Change** (número mínimo de moedas para atingir um valor) em $O(N \\cdot \\text{amount})$?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[a]$ como o número mínimo de moedas necessárias para formar a quantia $a$:
  - Caso base: $DP[0] = 0$, e todas as outras posições inicializadas com $\\infty$.
  - Para cada quantia $a$ de $1$ até $\\text{amount}$:
    - Para cada moeda $c \\in \\text{coins}$: se $a - c \\ge 0$, então:
      $$DP[a] = \\min(DP[a], \\ DP[a - c] + 1)$$
- **Complexidade**: $O(N \\times \\text{amount})$ tempo e $O(\\text{amount})$ espaço (variante de Mochila Não-Limitada / *Unbounded Knapsack*).

### Dual Coding Visual
| Quantia Alvo $a$ | Relação de Recorrência | Caso Impossível |
|---|---|---|
| $a = 0$ | $DP[0] = 0$ (0 moedas) | N/A |
| $a > 0$ | $\\min_{c}(DP[a - c] + 1)$ | Retorna $-1$ se $DP[\\text{amount}] == \\infty$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Coin Change
\`\`\`java
import java.util.Arrays;

public class CoinChange {
  public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1); // Valor infinito seguro
    dp[0] = 0;

    for (int a = 1; a <= amount; a++) {
      for (int c : coins) {
        if (a - c >= 0) {
          dp[a] = Math.min(dp[a], dp[a - c] + 1);
        }
      }
    }
    return dp[amount] > amount ? -1 : dp[amount];
  }
}
\`\`\`

#### Key Takeaways
- Como podemos reutilizar a mesma moeda múltiplas vezes, a iteração de valores ocorre naturalmente de forma crescente de $1$ a $\\text{amount}$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-1d/DSA-PATT-DP1D-005.md', `---
id: DSA-PATT-DP1D-005
title: "Longest Increasing Subsequence (LIS) em O(N log N) com Patience Sorting"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-1d
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo de **Patience Sorting + Busca Binária** otimiza o cálculo de Longest Increasing Subsequence (LIS) de $O(N^2)$ para $O(N \\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A DP quadrática tradicional ($DP[i] = 1 + \\max(DP[j])$) custa $O(N^2)$.
- **Patience Sorting ($O(N \\log N)$)**:
  - Mantemos um array \`tails[]\` onde \`tails[len]\` armazena o menor elemento final entre todas as subsequências crescentes de comprimento $\\text{len} + 1$ encontradas até agora.
  - Para cada número $x$:
    - Executamos **Busca Binária** no array ordenado \`tails[]\` para encontrar o primeiro elemento $\\ge x$ (\`idx\`).
    - Se $x$ for maior que todos, adiciona ao final (\`tails.add(x)\`).
    - Se encontrar $\\ge x$, substitui \`tails[idx] = x\` (ganância: um final menor é mais vantajoso para expansões futuras).
- O comprimento da LIS é exatamente o tamanho final do array \`tails[]\`.

### Dual Coding Visual
| Algoritmo de LIS | Complexidade de Tempo | Espaço de Memória |
|---|---|---|
| **DP Quadrática Padrão** | $O(N^2)$ | $O(N)$ |
| **Patience Sorting + Binary Search** | $O(N \\log N)$ Ótimo | $O(N)$ Array \`tails[]\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: LIS O(N log N)
\`\`\`java
import java.util.*;

public class LISSolution {
  public int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int x : nums) {
      int idx = Collections.binarySearch(tails, x);
      if (idx < 0) idx = -(idx + 1); // Posição de inserção
      if (idx == tails.size()) {
        tails.add(x);
      } else {
        tails.set(idx, x);
      }
    }
    return tails.size();
  }
}
\`\`\`

#### Key Takeaways
- É um clássico absoluto de entrevistas da Google e Meta que separa candidatos júnior ($O(N^2)$) de candidatos pleno/sênior ($O(N \\log N)$).

</details>
`);

// 20. dynamic-programming-2d
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-2d/DSA-PATT-DP2D-000.md', `---
id: DSA-PATT-DP2D-000
title: "Modelagem de DP 2D em Matrizes de Grade (Unique Paths e Minimum Path Sum)"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-2d
  - company::meta
  - freq::high
---

## Pergunta
Como modelar a função de transição de estados de uma DP 2D em matrizes de grade para problemas como **Unique Paths** e **Minimum Path Sum**?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[r][c]$ como a métrica acumulada até a célula $(r, c)$.
- Como o movimento é restrito para a **direita** e para **baixo**, qualquer caminho até $(r, c)$ vem obrigatoriamente da célula de cima $(r-1, c)$ ou da esquerda $(r, c-1)$:
  - **Unique Paths (Contagem de Caminhos)**:
    $$DP[r][c] = DP[r-1][c] + DP[r][c-1]$$
  - **Minimum Path Sum (Caminho de Menor Custo)**:
    $$DP[r][c] = \\text{grid}[r][c] + \\min(DP[r-1][c], \\ DP[r][c-1])$$
- **Complexidade**: $O(M \\times N)$ tempo e $O(M \\times N)$ espaço.

### Dual Coding Visual
| Problema de Grade | Origem dos Subproblemas | Função de Agregação |
|---|---|---|
| **Unique Paths** | Cima $(r-1, c)$ e Esquerda $(r, c-1)$ | Soma ($+$) |
| **Minimum Path Sum** | Cima $(r-1, c)$ e Esquerda $(r, c-1)$ | Célula $+$ Mínimo ($\\min$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- As bordas da matriz (linha 0 e coluna 0) formam os casos base, pois só possuem uma direção de entrada possível.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-2d/DSA-PATT-DP2D-002.md', `---
id: DSA-PATT-DP2D-002
title: "Otimização de Espaço de DP 2D de O(M·N) para O(N) com Array de Rolamento"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-2d
  - company::amazon
  - freq::high
---

## Pergunta
Como a técnica de **Array de Rolamento (Rolling Array)** reduz o consumo de memória de uma DP 2D de $O(M \\times N)$ para $O(N)$ de uma única linha?

## Resposta
### Quick Answer
**Solução Direta**:
- Na equação $DP[r][c] = DP[r-1][c] + DP[r][c-1]$, o cálculo da linha atual $r$ depende **apenas da linha imediatamente anterior $r-1$** e do valor recém-calculado à esquerda $DP[r][c-1]$.
- Alocamos um array unidimensional \`dp[]\` de tamanho $N$:
  - \`dp[c]\` antes de ser atualizado contém o valor da **linha de cima** ($DP[r-1][c]$).
  - \`dp[c-1]\` já atualizado contém o valor da **esquerda** ($DP[r][c-1]$).
  - Atualizamos in-place: \`dp[c] = dp[c] + dp[c-1]\`.
- **Complexidade**: Reduz o espaço de $O(M \\times N)$ para **$O(N)$** mantendo o tempo em $O(M \\times N)$.

### Dual Coding Visual
| Estrutura de Armazenamento | Consumo de Memória | Acesso ao Vizinho de Cima |
|---|---|---|
| **Matriz $M \\times N$** | $O(M \\times N)$ | \`dp[r-1][c]\` |
| **Array Plano de 1 Linha** | $O(N)$ | \`dp[c]\` antes do update |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Unique Paths O(N) Espaço
\`\`\`java
import java.util.Arrays;

public class UniquePathsOptimized {
  public int uniquePaths(int m, int n) {
    int[] dp = new int[n];
    Arrays.fill(dp, 1); // Linha 0 inicializada com 1s

    for (int r = 1; r < m; r++) {
      for (int c = 1; c < n; c++) {
        dp[c] += dp[c - 1];
      }
    }
    return dp[n - 1];
  }
}
\`\`\`

#### Key Takeaways
- É aplicável em praticamente qualquer DP de matriz ou alinhamento de strings (LCS, Edit Distance) que dependa apenas da linha anterior.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-2d/DSA-PATT-DP2D-003.md', `---
id: DSA-PATT-DP2D-003
title: "Longest Common Subsequence (LCS) e Casamento de Caracteres em O(M·N)"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-2d
  - company::google
  - freq::high
---

## Pergunta
Como a Programação Dinâmica 2D resolve o problema **Longest Common Subsequence (LCS)** em tempo $O(M \\times N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[i][j]$ como o comprimento da maior subsequência comum entre os prefixos $S_1[0..i-1]$ e $S_2[0..j-1]$:
  - **Se os caracteres coincidem ($S_1[i-1] == S_2[j-1]$)**: Estendemos a subsequência diagonal anterior:
    $$DP[i][j] = 1 + DP[i-1][j-1]$$
  - **Se são diferentes**: Tomamos o melhor resultado descartando um caractere de $S_1$ ou de $S_2$:
    $$DP[i][j] = \\max(DP[i-1][j], \\ DP[i][j-1])$$
- **Complexidade**: $O(M \\times N)$ tempo e $O(M \\times N)$ espaço (ou $O(\\min(M, N))$ otimizado).

### Dual Coding Visual
| Comparação de Caracteres | Equação de Transição | Direção de Preenchimento |
|---|---|---|
| $S_1[i-1] == S_2[j-1]$ | $1 + DP[i-1][j-1]$ | Diagonal Superior |
| $S_1[i-1] \\neq S_2[j-1]$ | $\\max(DP[i-1][j], DP[i][j-1])$ | $\\max(\\text{Cima}, \\text{Esquerda})$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Aplicações Práticas
- É a base do utilitário \`git diff\`, de algoritmos de alinhamento de sequências de DNA (Needleman-Wunsch) e corretores ortográficos.

#### Key Takeaways
- É o problema arquetípico para qualquer problema de processamento de duas strings em entrevistas técnicas.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-2d/DSA-PATT-DP2D-001.md', `---
id: DSA-PATT-DP2D-001
title: "Problema da Mochila 0/1 (0-1 Knapsack) com Restrição de Capacidade e Peso"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-2d
  - company::meta
  - freq::high
---

## Pergunta
Como formular a Programação Dinâmica do problema da **Mochila 0/1 (0-1 Knapsack)** e por que a otimização de espaço exige iteração reversa?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[i][w]$ como o valor máximo considerando os primeiros $i$ itens com capacidade $w$:
  $$DP[i][w] = \\begin{cases} DP[i-1][w] & \\text{se } \\text{wt}[i-1] > w \\\\ \\max(DP[i-1][w], \\ DP[i-1][w - \\text{wt}[i-1]] + \\text{val}[i-1]) & \\text{caso contrário} \\end{cases}$$
- **Otimização para Array 1D**: Ao comprimir para um array \`dp[w]\`, devemos iterar a capacidade $w$ de forma **estritamente decrescente** (de $W$ até $\\text{wt}[i]$). Isso garante que o valor $DP[w - \\text{wt}[i]]$ consultado venha da linha anterior ($i-1$) e impeça que o mesmo item seja reutilizado mais de uma vez.

### Dual Coding Visual
| Tipo de Mochila | Ordem de Iteração da Capacidade $w$ | Reutilização de Itens |
|---|---|---|
| **0/1 Knapsack** | **Decrescente** ($W \\to \\text{wt}[i]$) | Cada item usado no máximo 1 vez |
| **Unbounded Knapsack** | **Crescente** ($\\text{wt}[i] \\to W$) | Itens infinitos reutilizáveis |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A direção do loop interno (crescente vs decrescente) é a diferença fundamental entre Mochila Não-Limitada e Mochila 0/1.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-2d/DSA-PATT-DP2D-004.md', `---
id: DSA-PATT-DP2D-004
title: "Edit Distance (Levenshtein Distance) com Inserção, Deleção e Substituição"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-2d
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo de **Edit Distance (Distância de Levenshtein)** computa o número mínimo de operações de edição entre duas strings em $O(M \\times N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[i][j]$ como o custo mínimo para converter $S_1[0..i-1]$ em $S_2[0..j-1]$:
  - Se $S_1[i-1] == S_2[j-1]$, custo zero: $DP[i][j] = DP[i-1][j-1]$.
  - Se $S_1[i-1] \\neq S_2[j-1]$, escolhemos a operação de menor custo $+ 1$:
    $$DP[i][j] = 1 + \\min \\begin{cases} DP[i][j-1] & (\\text{Inserção}) \\\\ DP[i-1][j] & (\\text{Deleção}) \\\\ DP[i-1][j-1] & (\\text{Substituição}) \\end{cases}$$
- **Complexidade**: $O(M \\times N)$ tempo e $O(M \\times N)$ espaço (ou $O(N)$ comprimido).

### Dual Coding Visual
| Operação de Edição | Posição na Matriz DP | Racional |
|---|---|---|
| **Substituição** | Diagonal $DP[i-1][j-1]$ | Troca o caractere correspondente |
| **Inserção** | Esquerda $DP[i][j-1]$ | Insere caractere de $S_2$ em $S_1$ |
| **Deleção** | Cima $DP[i-1][j]$ | Remove caractere de $S_1$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Edit Distance
\`\`\`java
public class EditDistance {
  public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    for (int i = 1; i <= m; i++) {
      for (int j = 1; j <= n; j++) {
        if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
        }
      }
    }
    return dp[m][n];
  }
}
\`\`\`

#### Key Takeaways
- É um clássico para avaliação de algoritmos de processamento de texto e NLP.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-2d/DSA-PATT-DP2D-005.md', `---
id: DSA-PATT-DP2D-005
title: "Longest Palindromic Substring e DP em Intervalos de Substrings [i, j]"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-2d
  - company::amazon
  - freq::high
---

## Pergunta
Como a DP 2D sobre intervalos $[i, j]$ verifica se substrings são palíndromos para resolver **Longest Palindromic Substring** em $O(N^2)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[i][j]$ como booleano (\`true\` se a substring $S[i..j]$ for um palíndromo):
  - Casos base: Substrings de tamanho 1 são sempre palíndromos ($DP[i][i] = \\text{true}$).
  - Substrings de tamanho 2: $DP[i][i+1] = (S[i] == S[i+1])$.
  - Substrings de tamanho $\\ge 3$: $S[i..j]$ é palíndromo se e somente se as pontas forem iguais e o miolo interno for um palíndromo:
    $$DP[i][j] = (S[i] == S[j]) \\ \\land \\ DP[i+1][j-1]$$
- **Ordem de Preenchimento**: Deve ser preenchida por **comprimento crescente de substring** ou com $i$ decrescendo de $N-1$ até $0$ para que o miolo $DP[i+1][j-1]$ já esteja calculado.

### Dual Coding Visual
| Condição de Palíndromo | Equação | Racional |
|---|---|---|
| $S[i] == S[j]$ e $j - i \\le 2$ | \`true\` | Tamanho 1 ou 2 com caracteres iguais |
| $S[i] == S[j]$ e $j - i > 2$ | $DP[i+1][j-1]$ | Depende do miolo interno já ser palíndromo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A técnica de expandir a partir do centro (*Expand Around Center*) atinge a mesma complexidade $O(N^2)$ com $O(1)$ de memória auxiliar.

</details>
`);

// 21. dynamic-programming-advanced
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-advanced/DSA-PATT-DPADV-000.md', `---
id: DSA-PATT-DPADV-000
title: "Programação Dinâmica em Árvores (Tree DP): House Robber III em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-advanced
  - company::google
  - freq::high
---

## Pergunta
Como a **Programação Dinâmica em Árvores (Tree DP)** calcula valores ótimos em pós-ordem retornando tuplas de estado em tempo $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Em Tree DP, executamos uma travessia pós-ordem (Bottom-Up) onde cada nó retorna uma tupla com os estados da sua subárvore.
- Em **House Robber III** (onde não podemos roubar nós diretamente conectados por aresta):
  - Cada chamada recursiva retorna um par \`[robRoot, notRobRoot]\`:
    - \`robRoot\`: $\\text{node.val} + \\text{left.notRob} + \\text{right.notRob}$.
    - \`notRobRoot\`: $\\max(\\text{left.rob}, \\text{left.notRob}) + \\max(\\text{right.rob}, \\text{right.notRob})$.
- **Complexidade**: $O(N)$ tempo (visita cada nó 1 vez) e $O(H)$ espaço de pilha.

### Dual Coding Visual
| Estado Retornado | Relação com Filhos | Fórmula de Ganho |
|---|---|---|
| **Roubar Raiz** | Obriga a NÃO roubar filhos | $\\text{node.val} + \\text{filhos.notRob}$ |
| **Não Roubar Raiz** | Livre para roubar ou não | $\\max(\\text{filho.rob}, \\text{filho.notRob})$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: House Robber III
\`\`\`java
public class HouseRobberIII {
  public int rob(TreeNode root) {
    int[] res = dfs(root);
    return Math.max(res[0], res[1]);
  }

  private int[] dfs(TreeNode node) {
    if (node == null) return new int[]{0, 0};
    int[] left = dfs(node.left);
    int[] right = dfs(node.right);

    int rob = node.val + left[1] + right[1];
    int notRob = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    return new int[]{rob, notRob};
  }
}
\`\`\`

#### Key Takeaways
- Retornar o par de estados na recursão elimina a sobreposição de chamadas que degradaria a solução ingênua para tempo exponencial $O(2^N)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-advanced/DSA-PATT-DPADV-002.md', `---
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
- Definimos $DP[\\text{mask}][u]$ como o custo mínimo para visitar o subconjunto de cidades \`mask\` terminando na cidade $u$:
  $$DP[\\text{mask}][u] = \\min_{v \\notin \\text{mask}} (DP[\\text{mask} \\mid (1 \\ll v)][v] + \\text{cost}[u][v])$$
- **Complexidade**: Reduz o custo da força bruta fatorial $O(N!)$ para **$O(N^2 2^N)$**, tornando o problema tratável para $N \\le 20$.

### Dual Coding Visual
| Representação de Conjunto | Formato Binário | Custo do Algoritmo |
|---|---|---|
| **Força Bruta de Permutações** | Lista de cidades visitadas | $O(N!)$ Inviável para $N > 12$ |
| **Bitmask DP (Held-Karp)** | Máscara inteira de $N$ bits | $O(N^2 2^N)$ Viável até $N=20$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Operações Bitwise Essenciais
- Testar se $i$ está na máscara: \`(mask & (1 << i)) != 0\`
- Adicionar $i$ à máscara: \`mask | (1 << i)\`
- Remover $i$ da máscara: \`mask & ~(1 << i)\`

#### Key Takeaways
- Bitmask DP é a técnica padrão para problemas NP-difíceis com restrição de entrada pequena ($N \\le 20$).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-advanced/DSA-PATT-DPADV-003.md', `---
id: DSA-PATT-DPADV-003
title: "Digit DP para Contagem de Números sob Restrições de Limite de Prefixo"
tags:
  - level::l3-junior
  - topic::dsa::dynamic-programming-advanced
  - company::google
  - freq::high
---

## Pergunta
Como a técnica de **Digit DP** conta números em um intervalo $[A, B]$ que satisfazem propriedades específicas em tempo $O(\\log_{10}(B))$?

## Resposta
### Quick Answer
**Solução Direta**:
- Convertemos a contagem no intervalo $[A, B]$ para $F(B) - F(A - 1)$.
- Em $F(N)$, processamos os dígitos de $N$ da esquerda para a direita mantendo uma função recursiva com memoization \`dfs(index, isLimit, isNum, state)\`:
  - \`index\`: Posição do dígito atual.
  - \`isLimit\` (booleano): Se \`true\`, o dígito atual está limitado pelo dígito correspondente de $N$ (não pode ultrapassar); se \`false\`, pode assumir qualquer dígito de $0$ a $9$.
  - \`state\`: Propriedade rastreada (ex: soma de dígitos, dígito anterior).
- **Complexidade**: $O(\\text{len}(\\text{dígitos}) \\times \\text{estados})$, executando em menos de 1ms para números até $10^{18}$.

### Dual Coding Visual
| Parâmetro de Digit DP | Papel no Algoritmo | Efeito na Ramificação |
|---|---|---|
| \`isLimit == true\` | Prefixo coincide com $N$ | Dígito limitado a $[0, N[i]]$ |
| \`isLimit == false\` | Prefixo é estritamente menor | Dígito livre em $[0, 9]$ (Memoizável) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Quando \`isLimit == false\`, o resultado depende apenas de \`index\` e \`state\`, permitindo cache massivo entre ramos.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-advanced/DSA-PATT-DPADV-001.md', `---
id: DSA-PATT-DPADV-001
title: "Matrix Chain Multiplication (MCM) e DP sobre Intervalos [i, j] em O(N³)"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-advanced
  - company::amazon
  - freq::high
---

## Pergunta
Como o paradigma de **Matrix Chain Multiplication (MCM)** particiona intervalos $[i, j]$ para encontrar a ordem de parentização ótima em $O(N^3)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Definimos $DP[i][j]$ como o custo mínimo para multiplicar a cadeia de matrizes de $A_i$ até $A_j$:
  - Testamos todos os possíveis pontos de corte intermediários $k$ entre $i$ e $j-1$:
    $$DP[i][j] = \\min_{i \\le k < j} (DP[i][k] + DP[k+1][j] + p_{i-1} \\cdot p_k \\cdot p_j)$$
  - Onde $p_{i-1} \\cdot p_k \\cdot p_j$ é o custo de multiplicar a matriz resultante $(A_i..A_k)$ pela matriz $(A_{k+1}..A_j)$.
- **Complexidade**: $O(N^3)$ tempo e $O(N^2)$ espaço.

### Dual Coding Visual
| Componente da Recorrência | Significado |
|---|---|
| $DP[i][k]$ | Custo ótimo da partição esquerda |
| $DP[k+1][j]$ | Custo ótimo da partição direita |
| $p_{i-1} p_k p_j$ | Custo de fundir as duas matrizes resultantes |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Problemas Análogos
- *Minimum Cost Tree From Leaf Values* (LeetCode 1130)
- *Burst Balloons* (LeetCode 312)
- *Remove Boxes* (LeetCode 546)

#### Key Takeaways
- A iteração deve ser feita por comprimento crescente do intervalo $\\text{len} = j - i + 1$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-advanced/DSA-PATT-DPADV-004.md', `---
id: DSA-PATT-DPADV-004
title: "Otimização Convex Hull Trick (CHT) para DP Quadrática em Tempo O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-advanced
  - company::meta
  - freq::high
---

## Pergunta
Como a **Otimização Convex Hull Trick (CHT)** reduz a complexidade de transições de DP da forma $DP[i] = \\min_j (DP[j] + m_j x_i + c_j)$ de $O(N^2)$ para $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Em recorrências onde a transição tem formato de equação de reta linear $y = m_j x + c_j$:
  - Cada estado $j$ anterior define uma reta com inclinação $m_j$ e intercepto $c_j = DP[j]$.
  - O cálculo de $DP[i]$ corresponde a encontrar o valor mínimo entre todas as retas avaliadas no ponto $x = x_i$.
- **Convex Hull Trick**: Mantém o invólucro convexo inferior (*Lower Convex Hull*) dessas retas em um Deque:
  - Retas que se tornam matematicamente redundantes são eliminadas em $O(1)$ amortizado.
  - A consulta do ponto ótimo executa em $O(1)$ com dois ponteiros (se as inclinações forem monotônicas).
- **Complexidade**: Reduz de $O(N^2)$ para **$O(N)$ linear**.

### Dual Coding Visual
| Abordagem de Transição | Custo por Estado | Complexidade Total |
|---|---|---|
| **DP Quadrática Padrão** | Varre todos os $j < i$ | $O(N^2)$ |
| **Convex Hull Trick (CHT)** | Consulta no invólucro convexo | $O(N)$ Linear |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É uma das técnicas avançadas mais elegantes de otimização geométrica em programação dinâmica.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/dynamic-programming-advanced/DSA-PATT-DPADV-005.md', `---
id: DSA-PATT-DPADV-005
title: "Profile DP (Broken Profile / Tiling) para Preenchimento de Grades com Dominós"
tags:
  - level::l4-pleno
  - topic::dsa::dynamic-programming-advanced
  - company::google
  - freq::high
---

## Pergunta
Como a técnica de **Profile DP (Broken Profile)** modela o preenchimento exato de uma grade $M \\times N$ com dominós $2 \\times 1$?

## Resposta
### Quick Answer
**Solução Direta**:
- Processamos a grade célula por célula $(r, c)$ em ordem de varredura (*raster scan*).
- O estado de DP mantém uma máscara binária de $M$ bits representando o **perfil de contorno quebrado (*broken profile*)** das últimas $M$ células (se a célula já foi coberta por um dominó ou está vazia).
- Ao avançar para a célula $(r, c)$:
  - Se já estiver coberta: apenas avança o perfil.
  - Se estiver vazia: tenta colocar um dominó horizontal (cobrindo $(r, c+1)$) ou vertical (cobrindo $(r+1, c)$).
- **Complexidade**: $O(M \\cdot N \\cdot 2^M)$, permitindo preenchimento de grades com $M \\le 12$ e $N$ grande em tempo submilisegundo.

### Dual Coding Visual
| Estratégia de Transição | Estado Rastreado | Complexidade |
|---|---|---|
| **Coluna por Coluna** | $2^M \\times 2^M$ transições | $O(N \\cdot 4^M)$ |
| **Broken Profile (Célula)** | $M$ bits de fronteira | $O(M \\cdot N \\cdot 2^M)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Processar célula a célula reduz a matriz de transição de $O(4^M)$ para $O(2^M)$, dobrando o limite suportado de $M$.

</details>
`);

// 22. greedy-algorithms
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/greedy-algorithms/DSA-PATT-GREEDY-000.md', `---
id: DSA-PATT-GREEDY-000
title: "Propriedade da Escolha Gulosa (Greedy-Choice Property) vs Programação Dinâmica"
tags:
  - level::l3-junior
  - topic::dsa::greedy-algorithms
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença conceitual e de garantias entre a **Escolha Gulosa (Greedy)** e a **Programação Dinâmica (DP)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Algoritmo Guloso (Greedy)**: Toma a melhor decisão local no momento atual **sem jamais voltar atrás (*no backtracking*)**, assumindo que escolhas locais ótimas levarão à solução global ótima. Roda em $O(N)$ ou $O(N \\log N)$.
- **Programação Dinâmica (DP)**: Avalia **todas as escolhas locais possíveis** através de subproblemas sobrepostos, tomando a decisão ótima após ponderar o impacto futuro.
- **Quando usar Greedy**: Somente quando for possível provar matematicamente a **Propriedade da Escolha Gulosa** e a **Subestrutura Ótima**.

### Dual Coding Visual
| Paradigma | Decisão e Exploração | Custo Típico |
|---|---|---|
| **Greedy (Guloso)** | Irrevogável / 1 único caminho | $O(N)$ / $O(N \log N)$ |
| **DP (Dinâmica)** | Avalia todas as transições | $O(N^2)$ / $O(N \cdot W)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Se a escolha gulosa falhar em cobrir o caso ótimo (como na Mochila 0/1 com itens inteiros), deve-se usar Programação Dinâmica.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/greedy-algorithms/DSA-PATT-GREEDY-002.md', `---
id: DSA-PATT-GREEDY-002
title: "Interval Scheduling e Seleção de Atividades por Término em O(N log N)"
tags:
  - level::l3-junior
  - topic::dsa::greedy-algorithms
  - company::google
  - freq::high
---

## Pergunta
Por que o problema de **Seleção de Atividades (Interval Scheduling)** exige ordenação por **horário de término (\`end\`)** em vez de horário de início?

## Resposta
### Quick Answer
**Solução Direta**:
- O objetivo é maximizar o número total de tarefas não-conflitantes:
  - Escolher gulosamente a tarefa que **termina o mais cedo possível (\`min end\`)** deixa a **maior quantidade de tempo livre restante** para acomodar tarefas futuras.
- **Algoritmo**:
  1. Ordena os intervalos por seu ponto de término $\\text{end}_i$ ($O(N \\log N)$).
  2. Seleciona a primeira tarefa e registra seu \`lastEnd\`.
  3. Para cada próxima tarefa $i$: se $\\text{start}_i \\ge \\text{lastEnd}$, seleciona a tarefa e atualiza \`lastEnd = end_i\`.
- **Complexidade**: $O(N \\log N)$ tempo e $O(1)$ espaço auxiliar.

### Dual Coding Visual
| Critério de Ordenação Guloso | Resultado | Status de Otimização |
|---|---|---|
| **Ordenar por Início (\`start\`)** | Pode escolher tarefa longa que bloqueia tudo | Incorreto |
| **Ordenar por Término (\`end\`)** | Maximiza tempo livre restante | Matematicamente Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- *Non-overlapping Intervals* (LeetCode 435) é resolvido diretamente calculando $N - \\text{maxNonOverlapping(intervals)}$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/greedy-algorithms/DSA-PATT-GREEDY-003.md', `---
id: DSA-PATT-GREEDY-003
title: "Fractional Knapsack vs 0/1 Knapsack e Ordenação por Densidade de Valor"
tags:
  - level::l3-junior
  - topic::dsa::greedy-algorithms
  - company::meta
  - freq::high
---

## Pergunta
Por que a estratégia gulosa por **densidade de valor ($V/W$)** funciona perfeitamente para **Fractional Knapsack**, mas falha para **0/1 Knapsack**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fractional Knapsack (Mochila Fracionária)**: Como podemos levar frações contínuas de um item, ordenar por valor unitário $\\frac{\\text{valor}}{\\text{peso}}$ e encher a mochila com os itens mais densos até a capacidade máxima garante matematicamente o maior lucro possível em $O(N \\log N)$.
- **0/1 Knapsack (Mochila Discreta)**: Como os itens são indivisíveis (0 ou 1), pegar um item de alta densidade pode deixar um espaço residual vazio que não cabe mais nenhum outro item valioso, gerando desperdício e tornando a escolha gulosa subótima (exige DP).

### Dual Coding Visual
| Variante da Mochila | Divisibilidade dos Itens | Algoritmo Ótimo |
|---|---|---|
| **Fracionária (Fractional)** | Permite frações de itens | **Greedy** ($O(N \\log N)$ por $V/W$) |
| **Discreta (0/1)** | Apenas item inteiro (0 ou 1) | **DP** ($O(N \\cdot W)$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a demonstração clássica de como uma pequena mudança na restrição de negócio (discreto vs contínuo) altera o paradigma algorítmico de Guloso para Programação Dinâmica.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/greedy-algorithms/DSA-PATT-GREEDY-001.md', `---
id: DSA-PATT-GREEDY-001
title: "Jump Game I & II: Rastreamento do Alcance Máximo em Tempo Linear O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::greedy-algorithms
  - company::apple
  - freq::high
---

## Pergunta
Como o padrão guloso de rastreamento do alcance máximo (\`maxReach\`) resolve **Jump Game I & II** em tempo linear $O(N)$ e espaço $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- **Jump Game I (Alcançabilidade)**:
  - Mantém \`maxReach = 0\`. Para cada índice $i$: se $i > \\text{maxReach}$, retorna \`false\`. Atualiza $\\text{maxReach} = \\max(\\text{maxReach}, i + \\text{nums}[i])$. Se $\\text{maxReach} \\ge N-1$, retorna \`true\` ($O(N)$).
- **Jump Game II (Mínimo de Saltos)**:
  - Mantém \`curEnd\` (fronteira do salto atual) e \`curFarthest\` (alcance máximo avistado).
  - Ao iterar $i$ até $N-2$: atualiza \`curFarthest = max(curFarthest, i + nums[i])\`. Quando $i == \\text{curEnd}$, somos forçados a dar um salto (\`jumps++\`) e expandimos a fronteira \`curEnd = curFarthest\`.

### Dual Coding Visual
| Problema Jump Game | Variáveis Rastreadas | Decisão de Incremento |
|---|---|---|
| **Jump Game I** | \`maxReach\` | Se $i > \\text{maxReach} \\implies$ Inalcançável |
| **Jump Game II** | \`curEnd\` e \`curFarthest\` | Se $i == \\text{curEnd} \\implies \\text{jumps}++$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Jump Game II
\`\`\`java
public class JumpGameII {
  public int jump(int[] nums) {
    int jumps = 0, curEnd = 0, curFarthest = 0;
    for (int i = 0; i < nums.length - 1; i++) {
      curFarthest = Math.max(curFarthest, i + nums[i]);
      if (i == curEnd) {
        jumps++;
        curEnd = curFarthest;
      }
    }
    return jumps;
  }
}
\`\`\`

#### Key Takeaways
- Transforma uma busca BFS/DP em um algoritmo guloso de 1 único passo $O(N)$ com $O(1)$ de memória.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/greedy-algorithms/DSA-PATT-GREEDY-004.md', `---
id: DSA-PATT-GREEDY-004
title: "Gas Station (LeetCode 134) com Soma Cumulativa e Ponto de Partida em O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::greedy-algorithms
  - company::amazon
  - freq::high
---

## Pergunta
Como provar que o problema **Gas Station (Postos de Combustível)** pode ser resolvido em uma única passagem linear $O(N)$ e $O(1)$ de espaço?

## Resposta
### Quick Answer
**Solução Direta**:
- **Condição 1 (Existência Global)**: Se $\\sum \\text{gas}[i] < \\sum \\text{cost}[i]$, é matematicamente impossível completar o circuito; retorna $-1$.
- **Condição 2 (Identificação do Ponto de Início Guloso)**:
  - Mantemos um \`currentTank = 0\` e \`startStation = 0\`.
  - Iteramos pelos postos: $\\text{currentTank} += \\text{gas}[i] - \\text{cost}[i]$.
  - Se $\\text{currentTank} < 0$, nenhum posto entre \`startStation\` e $i$ pode ser o ponto de partida válido (pois todos acumularam saldo positivo intermediário que acabou falhando em $i$).
  - Reiniciamos \`startStation = i + 1\` e \`currentTank = 0\`.

### Dual Coding Visual
| Métrica Rastreada | Condição de Teste | Ação |
|---|---|---|
| **\`totalTank\`** | $\\sum (\\text{gas} - \\text{cost}) < 0$ | Retorna $-1$ no final |
| **\`currentTank\`** | $\\text{currentTank} < 0$ | Pula início: \`start = i + 1\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A propriedade gulosa de que nenhum posto intermediário de uma sequência que falhou pode ser a resposta evita reiniciar a busca do zero $N$ vezes ($O(N^2) \\to O(N)$).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/greedy-algorithms/DSA-PATT-GREEDY-005.md', `---
id: DSA-PATT-GREEDY-005
title: "Algoritmo de Huffman Coding para Compressão de Dados com Min-Heap"
tags:
  - level::l4-pleno
  - topic::dsa::greedy-algorithms
  - company::google
  - freq::high
---

## Pergunta
Como o **Algoritmo de Huffman Coding** utiliza uma estratégia gulosa com Min-Heap para gerar códigos prefixados de tamanho ótimo?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo atribui códigos binários mais curtos aos caracteres mais frequentes e códigos mais longos aos caracteres raros:
  1. Insere todos os caracteres e suas frequências em um **Min-Heap**.
  2. Enquanto o heap tiver mais de 1 nó:
     - Extrai os dois nós de menor frequência $N_1$ e $N_2$.
     - Cria um nó pai com frequência $\\text{freq}(N_1) + \\text{freq}(N_2)$, conectando $N_1$ à esquerda (bit 0) e $N_2$ à direita (bit 1).
     - Reinsere o nó pai no Min-Heap.
  3. A árvore final produz um código livre de prefixos (*Prefix-Free Code*) com comprimento médio mínimo.
- **Complexidade**: $O(N \\log N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
| Frequência do Símbolo | Posição na Árvore de Huffman | Tamanho do Código Binário |
|---|---|---|
| **Alta Frequência** | Próximo à Raiz | Curto (ex: 1 a 2 bits) |
| **Baixa Frequência** | Folhas Profundas | Longo (ex: 6 a 8 bits) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a base de algoritmos de compressão de arquivos como DEFLATE (ZIP, GZIP e PNG).

</details>
`);

console.log('✅ DP 1D, DP 2D, DP Adv and Greedy decomposed.');
