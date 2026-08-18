import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Module 2 Part 1: Algorithmic Patterns (11 to 18)...');

// 11. two-pointers
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/two-pointers/DSA-PATT-2POINT-000.md', `---
id: DSA-PATT-2POINT-000
title: "Conceito de Two Pointers Opostos em Arrays Ordenados para Two Sum em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::two-pointers
  - company::meta
  - freq::high
---

## Pergunta
Como o padrão de **Two Pointers Opostos** resolve o problema de soma de dois números (*Two Sum II*) em um array ordenado em tempo $O(N)$ e espaço $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Posicionamos dois ponteiros nas extremidades do array: \`left = 0\` e \`right = N - 1\`.
- A cada passo, calculamos $\\text{soma} = A[\\text{left}] + A[\\text{right}]$:
  - Se $\\text{soma} == \\text{alvo}$: encontramos o par ($O(1)$).
  - Se $\\text{soma} < \\text{alvo}$: incrementamos \`left++\` para buscar um valor maior.
  - Se $\\text{soma} > \\text{alvo}$: decrementamos \`right--\` para buscar um valor menor.
- Como o array está ordenado, descartamos com segurança uma linha ou coluna inteira de combinações a cada iteração, reduzindo o tempo de $O(N^2)$ para **$O(N)$**.

### Dual Coding Visual
| Comparação de Soma | Ação no Ponteiro | Racional |
|---|---|---|
| $\\text{soma} < \\text{alvo}$ | \`left++\` | Precisa aumentar o valor total |
| $\\text{soma} > \\text{alvo}$ | \`right--\` | Precisa diminuir o valor total |
| $\\text{soma} == \\text{alvo}$ | Retorna \`[left, right]\` | Par exato encontrado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Two Sum Ordenado
\`\`\`go
package main

func twoSum(numbers []int, target int) []int {
  left, right := 0, len(numbers)-1
  for left < right {
    sum := numbers[left] + numbers[right]
    if sum == target {
      return []int{left + 1, right + 1}
    } else if sum < target {
      left++
    } else {
      right--
    }
  }
  return nil
}
\`\`\`

#### Key Takeaways
- A técnica elimina a necessidade de memória auxiliar de Hash Map ($O(1)$ espaço vs $O(N)$).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/two-pointers/DSA-PATT-2POINT-002.md', `---
id: DSA-PATT-2POINT-002
title: "Padrão Fast & Slow Pointers (Algoritmo de Floyd) para Detecção de Ciclos"
tags:
  - level::l3-junior
  - topic::dsa::two-pointers
  - company::amazon
  - freq::high
---

## Pergunta
Como o padrão **Fast & Slow Pointers (Algoritmo de Floyd / Tartaruga e Lebre)** detecta ciclos em listas encadeadas em $O(N)$ tempo e $O(1)$ espaço?

## Resposta
### Quick Answer
**Solução Direta**:
- Inicializamos dois ponteiros na cabeça da lista: \`slow = head\` e \`fast = head\`.
- A cada iteração:
  - \`slow\` avança 1 passo (\`slow = slow.next\`).
  - \`fast\` avança 2 passos (\`fast = fast.next.next\`).
- Se a lista for acíclica, \`fast\` atingirá \`null\` e o algoritmo encerra.
- Se houver ciclo, a cada passo a distância relativa entre \`fast\` e \`slow\` dentro do ciclo diminui em 1 nó; portanto, \`fast\` inevitavelmente alcançará \`slow\` (\`fast == slow\`) dentro de no máximo uma volta no ciclo.

### Dual Coding Visual
| Estado da Lista | Comportamento de \`fast\` | Diagnóstico |
|---|---|---|
| **Sem Ciclo** | Atinge \`null\` em $N/2$ passos | Lista linear terminada |
| **Com Ciclo** | \`fast == slow\` | Ciclo detectado com certeza |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Detecção de Ciclo
\`\`\`java
public class LinkedListCycle {
  public boolean hasCycle(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow == fast) return true;
    }
    return false;
  }
}
\`\`\`

#### Key Takeaways
- O algoritmo não modifica a lista e consome estritamente $O(1)$ de memória auxiliar.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/two-pointers/DSA-PATT-2POINT-003.md', `---
id: DSA-PATT-2POINT-003
title: "Otimização de Espaço de O(N) para O(1) Usando Two Pointers"
tags:
  - level::l3-junior
  - topic::dsa::two-pointers
  - company::google
  - freq::high
---

## Pergunta
Em quais classes de problemas lineares o padrão Two Pointers permite reduzir o espaço auxiliar de $O(N)$ para $O(1)$ in-place?

## Resposta
### Quick Answer
**Solução Direta**:
- Two Pointers substitui a criação de novos arrays ou Hash Maps em problemas com mutação *in-place*:
  1. **Remoção de Duplicatas (*Remove Duplicates from Sorted Array*)**: \`slow\` mantém a fronteira dos elementos únicos e \`fast\` varre o array.
  2. **Particionamento (*Move Zeroes / Dutch National Flag*)**: Ponteiros trocam elementos de lugar sem memória extra.
  3. **Reversão de Strings / Palíndromos**: Troca caracteres simétricos nas pontas até que \`left >= right\`.

### Dual Coding Visual
| Problema Linear | Abordagem com Array Extra | Abordagem Two Pointers In-Place |
|---|---|---|
| **Remove Duplicates** | Cria novo array $O(N)$ | Ponteiros \`slow/fast\` em $O(1)$ |
| **Move Zeroes** | Filtra em nova lista $O(N)$ | Swap in-place em $O(1)$ |
| **Valid Palindrome** | Inverte string cópia $O(N)$ | Ponteiros convergentes em $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de código, sempre que um problema linear sugerir alocar um novo buffer, avalie se Two Pointers permite resolver in-place com $O(1)$ memória.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/two-pointers/DSA-PATT-2POINT-001.md', `---
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
- A área formada por dois limites \`left\` e \`right\` é:
  $$\\text{Área} = (\\text{right} - \\text{left}) \\times \\min(H[\\text{left}], H[\\text{right}])$$
- Suponha sem perda de generalidade que $H[\\text{left}] < H[\\text{right}]$:
  - A largura máxima possível com a barra da esquerda é a largura atual $(\\text{right} - \\text{left})$.
  - Se mantivermos \`left\` e movermos \`right\` para qualquer posição intermediária $k < \\text{right}$, a largura diminui e a altura continua limitada por $H[\\text{left}]$ ($\\min(H[\\text{left}], H[k]) \\le H[\\text{left}]$).
  - Portanto, **nenhum outro par** contendo \`left\` pode gerar uma área maior que a atual. Podemos descartar \`left\` com segurança incrementando \`left++\`.

### Dual Coding Visual
| Decisão de Ponteiro | Condição de Altura | Justificativa Matemática |
|---|---|---|
| \`left++\` | $H[\\text{left}] < H[\\text{right}]$ | \`left\` já atingiu sua área máxima possível |
| \`right--\` | $H[\\text{right}] < H[\\text{left}]$ | \`right\` já atingiu sua área máxima possível |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A prova demonstra que descartar $N-1$ pares a cada passo não perde a solução ótima, reduzindo $O(N^2)$ combinações para exatamente $N-1$ comparações ($O(N)$).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/two-pointers/DSA-PATT-2POINT-004.md', `---
id: DSA-PATT-2POINT-004
title: "Implementação de 3Sum com Deduplicação Rigorosa de Ponteiros em O(N²)"
tags:
  - level::l4-pleno
  - topic::dsa::two-pointers
  - company::google
  - freq::high
---

## Pergunta
Como implementar o algoritmo **3Sum** em tempo $O(N^2)$ e espaço $O(1)$ garantindo deduplicação rigorosa de triplas sem usar \`Set\`?

## Resposta
### Quick Answer
**Solução Direta**:
- Primeiro ordenamos o array em $O(N \\log N)$.
- Fixamos o primeiro elemento no índice $i$ (de $0$ até $N-3$):
  - **Deduplicação de $i$**: Se $i > 0$ e $A[i] == A[i-1]$, pula com \`continue\`.
  - Executamos Two Pointers com $\\text{left} = i + 1$ e $\\text{right} = N - 1$ procurando $\\text{soma} = -A[i]$.
  - Ao encontrar uma tripla válida:
    - Adiciona à resposta.
    - **Deduplicação dos ponteiros**: Avança \`left++\` enquanto $A[\\text{left}] == A[\\text{left}-1]$ e recua \`right--\` enquanto $A[\\text{right}] == A[\\text{right}+1]$.

### Dual Coding Visual
| Elemento da Tripla | Ponto de Deduplicação | Ação de Salto |
|---|---|---|
| **$i$ (Primeiro elemento)** | Antes do loop Two Pointers | \`if (i > 0 && A[i] == A[i-1]) continue\` |
| **\`left\` / \`right\`** | Imediatamente após achar tripla | \`while (left < right && A[left] == A[left+1]) left++\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: 3Sum Ótimo
\`\`\`java
import java.util.*;

public class ThreeSumSolution {
  public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();

    for (int i = 0; i < nums.length - 2; i++) {
      if (nums[i] > 0) break; // Otimização: menores que 0 somados não dão 0
      if (i > 0 && nums[i] == nums[i - 1]) continue;

      int left = i + 1, right = nums.length - 1;
      while (left < right) {
        int sum = nums[i] + nums[left] + nums[right];
        if (sum == 0) {
          res.add(Arrays.asList(nums[i], nums[left], nums[right]));
          while (left < right && nums[left] == nums[left + 1]) left++;
          while (left < right && nums[right] == nums[right - 1]) right--;
          left++;
          right--;
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }
    return res;
  }
}
\`\`\`

#### Key Takeaways
- A deduplicação manual por ponteiros economiza o overhead de alocação de objetos e hashing de um \`Set<List<Integer>>\`.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/two-pointers/DSA-PATT-2POINT-005.md', `---
id: DSA-PATT-2POINT-005
title: "Demonstração Formal para Encontrar o Início de Ciclo em Lista Ligada (Cycle II)"
tags:
  - level::l4-pleno
  - topic::dsa::two-pointers
  - company::microsoft
  - freq::high
---

## Pergunta
Qual é a demonstração matemática que prova como encontrar o **nó exato de início de ciclo** em uma lista ligada (*Linked List Cycle II*)?

## Resposta
### Quick Answer
**Solução Direta**:
- Sejam:
  - $L_1$: Distância da cabeça (\`head\`) até o nó de início do ciclo.
  - $L_2$: Distância do início do ciclo até o ponto de encontro de \`slow\` e \`fast\`.
  - $C$: Comprimento total do ciclo.
- Quando se encontram:
  - Distância percorrida por \`slow\`: $D_{\\text{slow}} = L_1 + L_2$.
  - Distância percorrida por \`fast\`: $D_{\\text{fast}} = L_1 + L_2 + k \\cdot C$.
- Como \`fast\` anda no dobro da velocidade ($D_{\\text{fast}} = 2 D_{\\text{slow}}$):
  $$L_1 + L_2 + k \\cdot C = 2(L_1 + L_2) \\implies L_1 = k \\cdot C - L_2 = (k-1)C + (C - L_2)$$
- **Algoritmo**: Após o encontro, reiniciamos um ponteiro na cabeça (\`p1 = head\`) mantendo o outro no ponto de encontro (\`p2 = fast\`). Avançando ambos a 1 passo por vez, eles se encontrarão **exatamente no nó de início do ciclo** após $L_1$ passos.

### Dual Coding Visual
| Ponteiro na Fase 2 | Posição Inicial | Ponto de Encontro Final |
|---|---|---|
| **\`p1\`** | \`head\` (1 passo/vez) | Início exato do ciclo ($L_1$) |
| **\`p2\`** | Ponto de encontro (1 passo/vez) | Início exato do ciclo ($C - L_2$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Linked List Cycle II
\`\`\`go
package main

func detectCycle(head *ListNode) *ListNode {
  slow, fast := head, head
  for fast != nil && fast.Next != nil {
    slow = slow.Next
    fast = fast.Next.Next
    if slow == fast {
      // Fase 2: Encontrar o nó de início
      p1 := head
      p2 := slow
      for p1 != p2 {
        p1 = p1.Next
        p2 = p2.Next
      }
      return p1
    }
  }
  return nil
}
\`\`\`

#### Key Takeaways
- Essa elegante propriedade matemática transforma um problema que exigiria $O(N)$ memória de Hash Set em uma solução estritamente $O(1)$ de memória auxiliar.

</details>
`);

// 12. sliding-window
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/sliding-window/DSA-PATT-SLIDE-000.md', `---
id: DSA-PATT-SLIDE-000
title: "Conceito de Sliding Window e Redução de O(N·K) para O(N)"
tags:
  - level::l3-junior
  - topic::dsa::sliding-window
  - company::meta
  - freq::high
---

## Pergunta
O que é o padrão **Sliding Window (Janela Deslizante)** e como ele reduz a complexidade de tempo de $O(N \\cdot K)$ para $O(N)$ linear?

## Resposta
### Quick Answer
**Solução Direta**:
- Em problemas sobre subarrays/substrings contíguos de tamanho $K$, a abordagem ingênua recalcula a propriedade da janela do zero a cada posição ($O(N \\cdot K)$).
- O **Sliding Window** reaproveita o estado acumulado da janela anterior:
  - Ao deslizar a janela 1 posição para a direita, removemos o elemento que ficou para trás no início (\`left\`) e adicionamos o novo elemento que entrou no final (\`right\`).
- Como cada elemento entra e sai da janela exatamente uma única vez, o custo total é **$O(N)$ linear** com $O(1)$ por passo.

### Dual Coding Visual
| Abordagem | Cálculo por Deslizamento | Complexidade Total |
|---|---|---|
| **Força Bruta** | Recalcula todos os $K$ itens | $O(N \\cdot K)$ ou $O(N^2)$ |
| **Sliding Window** | $\\text{soma} += \\text{entra} - \\text{sai}$ | $O(N)$ Linear |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O princípio fundamental é transformar um problema quadrático de recálculo em um problema linear de atualização delta ($+ \\text{in} - \\text{out}$).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/sliding-window/DSA-PATT-SLIDE-002.md', `---
id: DSA-PATT-SLIDE-002
title: "Sliding Window de Tamanho Fixo K para Máxima Soma de Subarray"
tags:
  - level::l3-junior
  - topic::dsa::sliding-window
  - company::amazon
  - freq::high
---

## Pergunta
Como estruturar uma **Sliding Window de tamanho fixo $K$** para calcular a soma máxima de subarray em tempo $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Inicializa calculando a soma dos primeiros $K$ elementos (\`somaAtual\`).
- Itera com o ponteiro \`right\` de $K$ até $N-1$:
  1. Atualiza a janela: \`somaAtual += arr[right] - arr[right - K]\`.
  2. Atualiza o máximo global: \`maxSoma = max(maxSoma, somaAtual)\`.
- **Complexidade**: $O(N)$ tempo e $O(1)$ espaço.

### Dual Coding Visual
| Passo de Janela Fixa | Operação Delta | Complexidade de Passo |
|---|---|---|
| **Entrada do elemento** | \`soma += arr[right]\` | $O(1)$ |
| **Saída do elemento** | \`soma -= arr[right - K]\` | $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Janela Fixa
\`\`\`java
public class FixedSlidingWindow {
  public static int maxSumSubarray(int[] nums, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += nums[i];

    int maxSum = windowSum;
    for (int i = k; i < nums.length; i++) {
      windowSum += nums[i] - nums[i - k];
      maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
  }
}
\`\`\`

#### Key Takeaways
- Em janelas fixas, o ponteiro esquerdo é determinado diretamente por $\\text{left} = \\text{right} - K + 1$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/sliding-window/DSA-PATT-SLIDE-003.md', `---
id: DSA-PATT-SLIDE-003
title: "Sliding Window Dinâmica com Expansão e Contração de Janela"
tags:
  - level::l3-junior
  - topic::dsa::sliding-window
  - company::google
  - freq::high
---

## Pergunta
Como funciona uma **Sliding Window Dinâmica/Variável** onde o tamanho da janela se expande e contrai sob demanda?

## Resposta
### Quick Answer
**Solução Direta**:
- Em uma janela dinâmica:
  1. **Expansão**: O ponteiro \`right\` avança continuamente adicionando novos elementos ao estado da janela.
  2. **Contração**: Quando uma restrição é violada (ex: soma $> S$ ou caractere duplicado), um loop interno avança o ponteiro \`left++\` removendo elementos até restabelecer a validade da janela.
  3. **Registro**: Atualiza a métrica ótima (tamanho máximo ou mínimo da janela).

### Dual Coding Visual
| Ação de Janela Dinâmica | Movimento de Ponteiro | Disparo de Ação |
|---|---|---|
| **Expandir Janela** | \`right++\` | A cada passo do laço externo |
| **Contrair Janela** | \`left++\` | Enquanto condição for violada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Embora existam dois loops aninhados (\`for right\` e \`while condição\`), \`left\` e \`right\` avançam estritamente para a frente no máximo $N$ vezes cada, mantendo a complexidade assintótica em $O(2N) = O(N)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/sliding-window/DSA-PATT-SLIDE-001.md', `---
id: DSA-PATT-SLIDE-001
title: "Template Universal Canônico para Problemas de Sliding Window Dinâmica"
tags:
  - level::l4-pleno
  - topic::dsa::sliding-window
  - company::meta
  - freq::high
---

## Pergunta
Qual é o **template canônico universal** para resolver qualquer problema de Sliding Window Dinâmica em entrevistas FAANG?

## Resposta
### Quick Answer
**Solução Direta**:
- O template universal estrutura-se no padrão:
  \`\`\`java
  int left = 0, result = 0;
  Map<Object, Integer> windowState = new HashMap<>();

  for (int right = 0; right < n; right++) {
    // 1. Adiciona arr[right] ao estado
    addElement(windowState, arr[right]);

    // 2. Contrai a janela enquanto for inválida
    while (isWindowInvalid(windowState)) {
      removeElement(windowState, arr[left]);
      left++;
    }

    // 3. Atualiza resposta ótima
    result = Math.max(result, right - left + 1);
  }
  \`\`\`

### Dual Coding Visual
| Etapa do Template | Responsabilidade | Complexidade Amortizada |
|---|---|---|
| **1. Ingestão (\`right\`)** | Atualiza contadores do novo item | $O(1)$ |
| **2. Encolhimento (\`left\`)** | Despeja elementos inválidos | $O(1)$ Amortizado |
| **3. Coleta de Métrica** | Mede tamanho $(\\text{right}-\\text{left}+1)$ | $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Dominar esse esqueleto resolve ~90% dos problemas de janela deslizante do LeetCode com código limpo e sem bugs de off-by-one.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/sliding-window/DSA-PATT-SLIDE-004.md', `---
id: DSA-PATT-SLIDE-004
title: "Longest Substring Without Repeating Characters em O(N) com Hash Map de Índices"
tags:
  - level::l4-pleno
  - topic::dsa::sliding-window
  - company::amazon
  - freq::high
---

## Pergunta
Como resolver **Longest Substring Without Repeating Characters** (LeetCode 3) em tempo $O(N)$ saltando o ponteiro \`left\` diretamente via Hash Map?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos um mapa \`lastSeen<Character, Integer>\` registrando o índice da última ocorrência de cada caractere.
- Ao encontrar um caractere \`c\` no índice \`right\`:
  - Se \`c\` já foi visto e seu último índice é $\\ge \\text{left}$, saltamos \`left = lastSeen.get(c) + 1\` diretamente em $O(1)$, sem precisar contrair a janela passo a passo.
  - Atualizamos \`lastSeen.put(c, right)\`.
  - Calculamos $\\text{maxLen} = \\max(\\text{maxLen}, \\text{right} - \\text{left} + 1)$.
- **Complexidade**: $O(N)$ tempo e $O(\\min(N, |\\Sigma|))$ espaço.

### Dual Coding Visual
| Técnica de Contração | Passos para Pular Duplicata | Complexidade |
|---|---|---|
| **Set com While \`left++\`** | Avança 1 a 1 até remover caractere | $O(2N)$ passos |
| **Map com Salto de Índice** | \`left = max(left, lastSeen[c] + 1)\` | $O(N)$ 1 único salto |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Salto Direto
\`\`\`java
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
\`\`\`

#### Key Takeaways
- O uso de \`Math.max(left, ...)\` é crucial para não retroceder o ponteiro \`left\` caso o caractere duplicado esteja fora da janela ativa atual.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/sliding-window/DSA-PATT-SLIDE-005.md', `---
id: DSA-PATT-SLIDE-005
title: "Minimum Window Substring em O(N) com Contadores de Frequência"
tags:
  - level::l4-pleno
  - topic::dsa::sliding-window
  - company::meta
  - freq::high
---

## Pergunta
Como implementar o clássico hard **Minimum Window Substring** (LeetCode 76) em tempo linear $O(N)$ e espaço $O(|\\Sigma|)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Contamos a frequência dos caracteres da string alvo $T$ em um mapa \`targetMap\` e mantemos uma variável \`formed\` contando quantos caracteres únicos atingiram a frequência necessária.
- Expandimos \`right\`:
  - Se \`windowMap[c] == targetMap[c]\`, incrementamos \`formed++\`.
- Quando \`formed == required\` (janela válida contendo todo $T$):
  - Atualizamos a menor janela encontrada.
  - Contraímos \`left++\` removendo caracteres até que a janela deixe de ser válida (\`formed--\`).
- **Complexidade**: $O(|S| + |T|)$ tempo e $O(|\\Sigma|)$ espaço (onde $|\\Sigma| \\le 128$ para ASCII).

### Dual Coding Visual
| Variável de Controle | Significado | Condição de Janela Válida |
|---|---|---|
| **\`required\`** | Total de caracteres únicos em $T$ | Constante |
| **\`formed\`** | Quantidade de caracteres atendidos na janela | Válida quando \`formed == required\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O uso de uma variável escalar \`formed\` evita comparar o mapa inteiro a cada passo ($O(|\\Sigma|)$), mantendo cada avanço em tempo estritamente $O(1)$.

</details>
`);

console.log('✅ two-pointers and sliding-window decomposed.');
