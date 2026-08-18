import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Module 2 Part 1b: Binary Search, Intervals & Traversals (13 to 15)...');

// 13. binary-search
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/binary-search/DSA-PATT-BSEARCH-000.md', `---
id: DSA-PATT-BSEARCH-000
title: "Invariante do Binary Search em Arrays Ordenados e Cálculo Seguro de Mid"
tags:
  - level::l3-junior
  - topic::dsa::binary-search
  - company::google
  - freq::high
---

## Pergunta
Como a **Busca Binária (Binary Search)** divide o espaço de busca pela metade a cada passo e por que usamos \`mid = left + (right - left) / 2\`?

## Resposta
### Quick Answer
**Solução Direta**:
- Em um array ordenado, comparamos o elemento central \`arr[mid]\` com o valor alvo:
  - Se \`arr[mid] == target\`: retorna o índice.
  - Se \`arr[mid] < target\`: descartamos a metade esquerda (\`left = mid + 1\`).
  - Se \`arr[mid] > target\`: descartamos a metade direita (\`right = mid - 1\`).
- **Cálculo Seguro de Mid**: A expressão ingênua \`(left + right) / 2\` pode causar **Integer Overflow** se $\\text{left} + \\text{right} > 2^{31} - 1$. A forma \`left + (right - left) / 2\` é matematicamente idêntica e imune a overflow.
- **Complexidade**: $O(\\log N)$ tempo e $O(1)$ espaço.

### Dual Coding Visual
| Fórmula de Cálculo de Mid | Risco de Overflow | Segurança em 32-bit |
|---|---|---|
| \`(left + right) / 2\` | Alto se soma $> 2^{31}-1$ | Inseguro (bug histórico do Java) |
| \`left + (right - left) / 2\` | Zero | 100% Seguro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Busca Binária Padrão
\`\`\`java
public class BinarySearchStandard {
  public static int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
      int mid = left + (right - left) / 2;
      if (nums[mid] == target) return mid;
      else if (nums[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }
}
\`\`\`

#### Key Takeaways
- A cada iteração, exatamente 50% dos elementos restantes são eliminados.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/binary-search/DSA-PATT-BSEARCH-002.md', `---
id: DSA-PATT-BSEARCH-002
title: "Busca Binária de Limites: Lower Bound vs Upper Bound"
tags:
  - level::l3-junior
  - topic::dsa::binary-search
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença conceitual e de invariante entre **Lower Bound** (primeira ocorrência) e **Upper Bound** (primeiro elemento maior que o alvo)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Lower Bound ($\\ge \\text{target}$)**: Encontra o primeiro índice $i$ onde $\\text{arr}[i] \\ge \\text{target}$. Quando $\\text{arr}[\\text{mid}] \\ge \\text{target}$, guardamos \`mid\` como candidato e encolhemos a busca para a esquerda (\`right = mid - 1\`).
- **Upper Bound ($> \\text{target}$)**: Encontra o primeiro índice $i$ onde $\\text{arr}[i] > \\text{target}$. Quando $\\text{arr}[\\text{mid}] > \\text{target}$, guardamos \`mid\` e vamos para a esquerda (\`right = mid - 1\`).
- A contagem de elementos iguais ao alvo é dada por: $\\text{count} = \\text{upperBound} - \\text{lowerBound}$.

### Dual Coding Visual
| Algoritmo | Condição de Encolhimento para a Esquerda | Retorno Típico |
|---|---|---|
| **Lower Bound** | \`arr[mid] >= target\` | Primeiro índice com valor $\\ge \\text{target}$ |
| **Upper Bound** | \`arr[mid] > target\` | Primeiro índice com valor $> \\text{target}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a base para resolver o problema clássico *Find First and Last Position of Element in Sorted Array* (LeetCode 34).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/binary-search/DSA-PATT-BSEARCH-003.md', `---
id: DSA-PATT-BSEARCH-003
title: "Busca Binária em Arrays Rotacionados (Search in Rotated Sorted Array)"
tags:
  - level::l3-junior
  - topic::dsa::binary-search
  - company::meta
  - freq::high
---

## Pergunta
Como adaptar a Busca Binária para encontrar um alvo em um **array rotacionado em pivô desconhecido** em tempo $O(\\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Em qualquer array ordenado rotacionado (ex: \`[4, 5, 6, 7, 0, 1, 2]\`), dividindo ao meio em \`mid\`, **ao menos uma das metades está garantidamente ordenada**:
  - Se \`arr[left] <= arr[mid]\`: A metade esquerda está ordenada.
    - Se $\\text{arr}[\\text{left}] \\le \\text{target} < \\text{arr}[\\text{mid}]$, busca na esquerda (\`right = mid - 1\`); senão, busca na direita (\`left = mid + 1\`).
  - Caso contrário: A metade direita está ordenada.
    - Se $\\text{arr}[\\text{mid}] < \\text{target} \\le \\text{arr}[\\text{right}]$, busca na direita (\`left = mid + 1\`); senão, busca na esquerda (\`right = mid - 1\`).

### Dual Coding Visual
| Metade Ordenada | Condição de Teste | Regra de Descarte |
|---|---|---|
| **Esquerda Ordenada** | \`arr[left] <= arr[mid]\` | Verifica se alvo está entre \`left\` e \`mid\` |
| **Direita Ordenada** | \`arr[left] > arr[mid]\` | Verifica se alvo está entre \`mid\` e \`right\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Mesmo com a rotação, o teste de ordenação de metade preserva o descarte de 50% dos elementos a cada passo, garantindo $O(\\log N)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/binary-search/DSA-PATT-BSEARCH-001.md', `---
id: DSA-PATT-BSEARCH-001
title: "Paradigma de Binary Search on Answer / Solution Space (Koko Eating Bananas)"
tags:
  - level::l4-pleno
  - topic::dsa::binary-search
  - company::google
  - freq::high
---

## Pergunta
Como funciona o paradigma de **Binary Search on Answer** para encontrar o valor ótimo em problemas de otimização monotônica?

## Resposta
### Quick Answer
**Solução Direta**:
- Quando não temos um array ordenado explícito, mas o espaço de respostas possíveis é limitado em uma faixa contínua $[\\text{minAns}, \\text{maxAns}]$ e satisfaz a propriedade de **Monotonicidade**:
  - Se uma resposta $K$ é viável (função \`isValid(K) == true\`), qualquer valor $> K$ também é viável (ou vice-versa).
- Executamos a busca binária sobre o valor da resposta:
  - Testamos \`mid = left + (right - left) / 2\`.
  - Se \`isValid(mid)\` for verdadeiro, registramos \`ans = mid\` e tentamos um valor menor (\`right = mid - 1\`).
  - Se falso, aumentamos o valor (\`left = mid + 1\`).
- **Complexidade**: $O(\\text{Custo}(\\text{isValid}) \\times \\log(\\text{maxAns} - \\text{minAns}))$.

### Dual Coding Visual
| Propriedade de Resposta | Espaço de Teste | Direção de Busca |
|---|---|---|
| \`isValid(K) == false\` | $K$ insuficiente | Aumenta $K \\to$ \`left = mid + 1\` |
| \`isValid(K) == true\` | $K$ viável | Registra + diminui $\\to$ \`right = mid - 1\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Problemas Canônicos FAANG
- *Koko Eating Bananas* (LeetCode 875)
- *Capacity To Ship Packages Within D Days* (LeetCode 1011)
- *Split Array Largest Sum* (LeetCode 410)

#### Key Takeaways
- É um dos padrões mais cobrados em entrevistas técnicas para avaliar a capacidade de abstração de busca binária além de arrays simples.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/binary-search/DSA-PATT-BSEARCH-004.md', `---
id: DSA-PATT-BSEARCH-004
title: "Busca Binária de Mediana de Dois Arrays Ordenados em O(log(min(N, M)))"
tags:
  - level::l4-pleno
  - topic::dsa::binary-search
  - company::apple
  - freq::high
---

## Pergunta
Como o algoritmo de partição binária encontra a **Mediana de Dois Arrays Ordenados** em tempo $O(\\log(\\min(N, M)))$?

## Resposta
### Quick Answer
**Solução Direta**:
- Garantimos que o array $A$ seja o menor ($|A| \\le |B|$).
- Fazemos busca binária no ponto de corte $i$ do array $A$ (de $0$ a $|A|$), determinando o corte correspondente em $B$:
  $$j = \\frac{|A| + |B| + 1}{2} - i$$
- Os cortes dividem os dois arrays em metades esquerda e direita:
  - Condição de partição válida: $A[i-1] \\le B[j]$ e $B[j-1] \\le A[i]$.
  - Se $A[i-1] > B[j]$, movemos o corte $i$ para a esquerda (\`right = i - 1\`).
  - Se $B[j-1] > A[i]$, movemos o corte $i$ para a direita (\`left = i + 1\`).
- A mediana é computada em $O(1)$ a partir dos extremos da partição.

### Dual Coding Visual
| Metade Esquerda | Metade Direita | Condição de Validade |
|---|---|---|
| $\\max(A[i-1], B[j-1])$ | $\\min(A[i], B[j])$ | $\\text{maxEsquerda} \\le \\text{minDireita}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É considerado um dos problemas mais célebres do LeetCode (Hard #4) por aplicar busca binária simultânea em duas partições de dados.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/binary-search/DSA-PATT-BSEARCH-005.md', `---
id: DSA-PATT-BSEARCH-005
title: "Templates de Invariantes: while (left <= right) vs while (left < right)"
tags:
  - level::l4-pleno
  - topic::dsa::binary-search
  - company::netflix
  - freq::high
---

## Pergunta
Quais as regras de término e atualização de limites para os dois templates clássicos de Busca Binária (\`while (left <= right)\` vs \`while (left < right)\`)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Template 1 (\`while (left <= right)\`)**:
  - Espaço de busca: intervalo fechado $[\\text{left}, \\text{right}]$.
  - Atualização: \`left = mid + 1\` e \`right = mid - 1\`.
  - Término: quando $\\text{left} > \\text{right}$ (espaço vazio). Usado para busca de valor exato.
- **Template 2 (\`while (left < right)\`)**:
  - Espaço de busca: intervalo semiaberto ou convergência direta para 1 único elemento.
  - Atualização: \`left = mid + 1\` e \`right = mid\` (ou \`mid = (left + right + 1) / 2\` com \`left = mid\` e \`right = mid - 1\`).
  - Término: quando $\\text{left} == \\text{right}$. Usado para busca de limites e mínimos locais (*Find Peak Element*).

### Dual Coding Visual
| Template | Condição / Atualização | Condição de Parada |
|---|---|---|
| **Template 1** | \`left <= right\` com \`mid ± 1\` | \`left > right\` |
| **Template 2** | \`left < right\` com \`mid\` ou \`mid + 1\` | \`left == right\` (convergiu) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A causa mais comum de loops infinitos em busca binária é misturar as regras de atualização de um template com a condição de término do outro.

</details>
`);

// 14. intervals-merge
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/intervals-merge/DSA-PATT-INTERVAL-000.md', `---
id: DSA-PATT-INTERVAL-000
title: "Padrão de Ordenação Inicial por Início de Intervalo para Merge Intervals"
tags:
  - level::l3-junior
  - topic::dsa::intervals-merge
  - company::meta
  - freq::high
---

## Pergunta
Por que a ordenação preliminar dos intervalos por seu ponto de início (\`start\`) é a chave para resolver problemas de sobreposição em $O(N \\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Sem ordenação, qualquer intervalo poderia sobrepor qualquer outro, exigindo comparações de todos os pares em $O(N^2)$.
- Ao ordenar os intervalos por $\\text{start}_i$ em ordem crescente:
  - Garantimos que se um intervalo $B$ sobrepõe o intervalo $A$, então obrigatoriamente $\\text{start}_A \\le \\text{start}_B$.
  - A sobreposição depende unicamente de verificar se o início do próximo intervalo é menor ou igual ao fim do intervalo atual: $\\text{start}_B \\le \\text{end}_A$.
  - Isso reduz o processamento a uma única varredura linear $O(N)$ após a ordenação $O(N \\log N)$.

### Dual Coding Visual
| Estratégia de Intervalos | Comparações Necessárias | Complexidade Total |
|---|---|---|
| **Sem Ordenação** | Compara todos os pares $(i, j)$ | $O(N^2)$ |
| **Com Ordenação por Start** | Varredura linear sequencial | $O(N \\log N)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em qualquer problema envolvendo intervalos no LeetCode, o primeiro passo padrão deve ser ordenar por \`start\` (ou por \`end\` em problemas de agendamento guloso).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/intervals-merge/DSA-PATT-INTERVAL-002.md', `---
id: DSA-PATT-INTERVAL-002
title: "Algoritmo de Fusão de Intervalos Sobrepostos (Merge Intervals) em O(N log N)"
tags:
  - level::l3-junior
  - topic::dsa::intervals-merge
  - company::google
  - freq::high
---

## Pergunta
Como implementar o algoritmo de **Merge Intervals** (LeetCode 56) fundindo intervalos adjacentes em tempo $O(N \\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Ordenamos os intervalos por seu início \`start\`.
- Mantemos uma lista de resultado e inserimos o primeiro intervalo \`curr = intervals[0]\`.
- Para cada próximo intervalo \`next\`:
  - **Se houver sobreposição (\`next.start <= curr.end\`)**: fundimos estendendo o fim: \`curr.end = max(curr.end, next.end)\`.
  - **Se não houver sobreposição**: adicionamos \`next\` como o novo intervalo ativo na lista.
- **Complexidade**: $O(N \\log N)$ tempo (dominado pela ordenação) e $O(N)$ espaço para o resultado.

### Dual Coding Visual
| Condição com Intervalo Atual | Ação de Fusão | Resultado |
|---|---|---|
| \`next.start <= curr.end\` | \`curr.end = max(curr.end, next.end)\` | Intervalo expandido |
| \`next.start > curr.end\` | Adiciona \`next\` à lista | Novo intervalo isolado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Merge Intervals
\`\`\`java
import java.util.*;

public class MergeIntervals {
  public int[][] merge(int[][] intervals) {
    if (intervals.length <= 1) return intervals;
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

    List<int[]> merged = new ArrayList<>();
    int[] curr = intervals[0];
    merged.add(curr);

    for (int i = 1; i < intervals.length; i++) {
      if (intervals[i][0] <= curr[1]) {
        curr[1] = Math.max(curr[1], intervals[i][1]); // Funde
      } else {
        curr = intervals[i];
        merged.add(curr);
      }
    }
    return merged.toArray(new int[merged.size()][]);
  }
}
\`\`\`

#### Key Takeaways
- O uso de \`Math.max(curr.end, next.end)\` é essencial para cobrir o caso em que o intervalo atual engloba completamente o próximo (\`[1, 10]\` e \`[2, 5]\`).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/intervals-merge/DSA-PATT-INTERVAL-003.md', `---
id: DSA-PATT-INTERVAL-003
title: "Inserção de Novo Intervalo em Lista Ordenada (Insert Interval) em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::intervals-merge
  - company::amazon
  - freq::high
---

## Pergunta
Como inserir um novo intervalo em uma lista de intervalos disjuntos já ordenada (**Insert Interval** - LeetCode 57) em tempo linear $O(N)$ sem reordenar?

## Resposta
### Quick Answer
**Solução Direta**:
- Dividimos o processamento em 3 fases lineares:
  1. **Antes da sobreposição**: Adiciona todos os intervalos cujo término é menor que o início do novo: \`intervals[i].end < newInterval.start\`.
  2. **Fusão da sobreposição**: Enquanto houver sobreposição (\`intervals[i].start <= newInterval.end\`), expande o novo intervalo:
     \`newInterval.start = min(newInterval.start, intervals[i].start)\` e \`newInterval.end = max(newInterval.end, intervals[i].end)\`. Ao final do laço, adiciona \`newInterval\`.
  3. **Após a sobreposição**: Adiciona todos os intervalos restantes.
- **Complexidade**: $O(N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
| Fase do Algoritmo | Critério de Processamento | Ação |
|---|---|---|
| **Fase 1 (Antes)** | \`interval.end < new.start\` | Adiciona direto |
| **Fase 2 (Fusão)** | \`interval.start <= new.end\` | Absorve no \`newInterval\` |
| **Fase 3 (Depois)** | Restante da lista | Adiciona direto |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Como a entrada já está ordenada, a inserção executa em tempo linear $O(N)$ estrito, sem custo de $O(N \\log N)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/intervals-merge/DSA-PATT-INTERVAL-001.md', `---
id: DSA-PATT-INTERVAL-001
title: "Resolução de Meeting Rooms II via Min-Heap de Términos em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::intervals-merge
  - company::meta
  - freq::high
---

## Pergunta
Como utilizar um **Min-Heap de horários de término** para encontrar o número mínimo de salas de reunião em **Meeting Rooms II** em $O(N \\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Ordenamos as reuniões pelo horário de início (\`start\`).
- Mantemos um **Min-Heap** contendo os horários de término das reuniões em andamento (a raiz é a sala que desocupa mais cedo):
  - Para cada reunião $M$:
    - Se a raiz do heap tiver término menor ou igual ao início de $M$ (\`minHeap.peek() <= M.start\`), a sala foi liberada: desempilhamos a raiz (\`minHeap.poll()\`).
    - Alocamos a reunião inserindo seu término no heap (\`minHeap.offer(M.end)\`).
- O tamanho máximo do heap representa o **número mínimo de salas simultâneas necessárias**.

### Dual Coding Visual
| Evento | Condição do Heap | Ação de Sala |
|---|---|---|
| **Reunião Inicia** | \`minHeap.peek() <= start\` | Reutiliza sala existente (\`poll\` + \`offer\`) |
| **Conflito de Horário** | \`minHeap.peek() > start\` | Abre nova sala (\`offer\`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Meeting Rooms II
\`\`\`java
import java.util.*;

public class MeetingRoomsII {
  public int minMeetingRooms(int[][] intervals) {
    if (intervals == null || intervals.length == 0) return 0;
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    minHeap.offer(intervals[0][1]);

    for (int i = 1; i < intervals.length; i++) {
      if (intervals[i][0] >= minHeap.peek()) {
        minHeap.poll(); // Libera sala
      }
      minHeap.offer(intervals[i][1]); // Ocupa sala
    }
    return minHeap.size();
  }
}
\`\`\`

#### Key Takeaways
- O Min-Heap rastreia com precisão o recurso compartilhado de desocupação mais próxima em $O(\\log K)$ por evento.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/intervals-merge/DSA-PATT-INTERVAL-004.md', `---
id: DSA-PATT-INTERVAL-004
title: "Algoritmo de Linha de Varredura para Meeting Rooms II com Contadores de Eventos"
tags:
  - level::l4-pleno
  - topic::dsa::intervals-merge
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo de **Linha de Varredura (Chronological Sweep-Line)** calcula o pico de salas simultâneas sem usar Heaps?

## Resposta
### Quick Answer
**Solução Direta**:
- Separamos todos os inícios e términos em arrays independentes: \`starts[]\` e \`ends[]\`, ordenando ambos em $O(N \\log N)$.
- Usamos dois ponteiros (\`s\` e \`e\`) e um contador \`rooms = 0\`:
  - Se \`starts[s] < ends[e]\`: uma reunião começou antes que a anterior terminasse $\\to$ \`rooms++\` e \`s++\`. Atualiza o pico \`maxRooms = max(maxRooms, rooms)\`.
  - Caso contrário (\`starts[s] >= ends[e]\`): uma reunião terminou e liberou uma sala $\\to$ \`rooms--\` e \`e++\`.
- **Complexidade**: $O(N \\log N)$ tempo e $O(N)$ espaço contíguo (com menor constante de cache que o Heap).

### Dual Coding Visual
| Evento Temporal | Ponteiro Avançado | Contador de Salas |
|---|---|---|
| \`starts[s] < ends[e]\` | \`s++\` (Início de reunião) | \`rooms++\` |
| \`starts[s] >= ends[e]\` | \`e++\` (Fim de reunião) | \`rooms--\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Esta técnica é equivalente a converter o problema em uma sequência de eventos discretos $+1$ (início) e $-1$ (término) ordenados no tempo.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/intervals-merge/DSA-PATT-INTERVAL-005.md', `---
id: DSA-PATT-INTERVAL-005
title: "Interseção de Listas de Intervalos Ordenados em Tempo O(N + M)"
tags:
  - level::l4-pleno
  - topic::dsa::intervals-merge
  - company::apple
  - freq::high
---

## Pergunta
Como encontrar a interseção entre duas listas de intervalos ordenados e disjuntos (**Interval List Intersections**) em tempo linear $O(N + M)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Usamos dois ponteiros $i$ e $j$ para percorrer as listas $A$ e $B$:
  - O intervalo de sobreposição potencial entre $A[i]$ e $B[j]$ é:
    $$\\text{start} = \\max(A[i].\\text{start}, B[j].\\text{start}), \\quad \\text{end} = \\min(A[i].\\text{end}, B[j].\\text{end})$$
  - Se $\\text{start} \\le \\text{end}$, adicionamos $[\text{start}, \text{end}]$ ao resultado.
  - **Avanço de Ponteiro**: Avançamos o ponteiro do intervalo que **termina primeiro** (se $A[i].\\text{end} < B[j].\\text{end}$, fazemos $i++$; senão $j++$), pois ele não pode mais intersectar nenhum intervalo futuro.

### Dual Coding Visual
| Cálculo de Interseção | Condição de Validade | Regra de Descarte |
|---|---|---|
| $[\max(S_A, S_B), \min(E_A, E_B)]$ | $\\text{start} \\le \\text{end}$ | Avança o que tiver menor \`end\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Combina perfeitamente a lógica de intervalos com Two Pointers em complexidade linear ótima $O(N + M)$.

</details>
`);

// 15. bfs-dfs-traversals
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/bfs-dfs-traversals/DSA-PATT-TRAVERSAL-000.md', `---
id: DSA-PATT-TRAVERSAL-000
title: "Intuição da Busca em Largura (BFS) por Camadas e Fila FIFO para Caminho Mínimo"
tags:
  - level::l3-junior
  - topic::dsa::bfs-dfs-traversals
  - company::meta
  - freq::high
---

## Pergunta
Por que a **Busca em Largura (BFS)** garante encontrar o **caminho mais curto em número de arestas** em grafos não-ponderados?

## Resposta
### Quick Answer
**Solução Direta**:
- A BFS explora o grafo em **camadas concêntricas ordenadas por distância** a partir da raiz usando uma Fila FIFO:
  - Nível 0: Vértice de origem (distância 0).
  - Nível 1: Todos os vizinhos diretos a 1 aresta de distância.
  - Nível $k$: Todos os nós alcançáveis em exatamente $k$ arestas.
- Como a Fila FIFO processa estritamente todos os nós do nível $k$ antes de qualquer nó do nível $k+1$, a primeira vez que o nó alvo é desenfileirado corresponde **garantidamente ao menor número possível de passos**.

### Dual Coding Visual
| Algoritmo | Estrutura de Dados | Ordem de Exploração |
|---|---|---|
| **BFS (Largura)** | Fila FIFO (\`Queue\`) | Camadas concêntricas de distância crescente |
| **DFS (Profundidade)** | Pilha / Recursão | Ramo completo até o nó folha |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: BFS de Menor Caminho
\`\`\`java
public int shortestPathBFS(List<List<Integer>> adj, int src, int dst, int n) {
  boolean[] visited = new boolean[n];
  Queue<Integer> queue = new ArrayDeque<>();
  queue.offer(src);
  visited[src] = true;
  int distance = 0;

  while (!queue.isEmpty()) {
    int levelSize = queue.size();
    for (int i = 0; i < levelSize; i++) {
      int curr = queue.poll();
      if (curr == dst) return distance;
      for (int neighbor : adj.get(curr)) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.offer(neighbor);
        }
      }
    }
    distance++;
  }
  return -1; // Inalcançável
}
\`\`\`

#### Key Takeaways
- Para grafos não-ponderados, a BFS é a ferramenta mais eficiente para caminhos mínimos ($O(V + E)$).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/bfs-dfs-traversals/DSA-PATT-TRAVERSAL-002.md', `---
id: DSA-PATT-TRAVERSAL-002
title: "Intuição da Busca em Profundidade (DFS) com Recursão para Conectividade"
tags:
  - level::l3-junior
  - topic::dsa::bfs-dfs-traversals
  - company::google
  - freq::high
---

## Pergunta
Como a **Busca em Profundidade (DFS)** explora caminhos até o esgotamento antes do backtracking e quais suas aplicações primárias?

## Resposta
### Quick Answer
**Solução Direta**:
- A DFS segue recursivamente por um ramo único até atingir um nó folha ou sem vizinhos não-visitados, executando **Backtracking** ao retornar na pilha de chamadas para explorar ramos adjacentes.
- **Aplicações Primárias**:
  - Detecção de componentes conexos em matrizes e grafos (Flood Fill / Number of Islands).
  - Busca exaustiva de todos os caminhos possíveis (*All Paths from Source to Target*).
  - Ordenação Topológica e detecção de ciclos em grafos direcionados.

### Dual Coding Visual
| Característica | DFS (Depth-First) | BFS (Breadth-First) |
|---|---|---|
| **Estratégia** | Aprofunda o máximo possível | Varre em ondas circulares |
| **Estrutura** | Call Stack (Recursão) | Fila (\`Queue\`) |
| **Foco Ideal** | Conectividade / Backtracking | Menor caminho não-ponderado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A DFS é mais concisa de escrever recursivamente, mas consome espaço de pilha proporcional à profundidade máxima do grafo ($O(V)$).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/bfs-dfs-traversals/DSA-PATT-TRAVERSAL-003.md', `---
id: DSA-PATT-TRAVERSAL-003
title: "Trade-offs de Memória: BFS O(W) (Largura Máxima) vs DFS O(H) (Profundidade)"
tags:
  - level::l3-junior
  - topic::dsa::bfs-dfs-traversals
  - company::amazon
  - freq::high
---

## Pergunta
Quais os trade-offs de consumo de memória entre BFS ($O(W)$ largura máxima) e DFS ($O(H)$ altura máxima)?

## Resposta
### Quick Answer
**Solução Direta**:
- **BFS**: Mantém na fila todos os nós do nível mais largo da árvore/grafo ($O(W)$). Em uma árvore binária cheia, o último nível contém $W = N/2$ nós folha, consumindo **$O(N)$ massivo de memória**.
- **DFS**: Mantém na pilha apenas os nós do caminho atual da raiz até a folha ($O(H)$). Em uma árvore balanceada, a altura é $H = O(\\log N)$, consumindo **memória mínima de pilha**.
- Em grafos muito largos e rasos, DFS consome muito menos memória; em grafos profundos e estreitos, a BFS é mais estável contra StackOverflow.

### Dual Coding Visual
| Formato da Árvore | Consumo de Memória (BFS vs DFS) | Escolha Ideal |
|---|---|---|
| **Balanceada** | BFS: $O(N)$ / DFS: $O(\log N)$ | DFS economiza RAM |
| **Profunda ($H \approx N$)** | BFS: $O(1)$ / DFS: $O(N)$ | BFS evita StackOverflow |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de System Design e Algoritmos, a decisão entre BFS e DFS deve ser fundamentada pelo formato geométrico esperado da árvore de estados (largura vs profundidade).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/bfs-dfs-traversals/DSA-PATT-TRAVERSAL-001.md', `---
id: DSA-PATT-TRAVERSAL-001
title: "BFS Bidirecional para Redução Exponencial de Espaço de Busca O(B^(d/2))"
tags:
  - level::l4-pleno
  - topic::dsa::bfs-dfs-traversals
  - company::google
  - freq::high
---

## Pergunta
Como a **BFS Bidirecional (Bidirectional BFS)** reduz a complexidade de espaço e tempo de $O(B^d)$ para $O(B^{d/2})$ em problemas de busca de caminhos (ex: Word Ladder)?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma BFS unidirecional padrão com fator de ramificação $B$ e distância $d$ explora uma árvore com $O(B^d)$ nós.
- A **BFS Bidirecional** dispara duas buscas simultâneas: uma a partir da origem (\`beginSet\`) e outra a partir do destino (\`endSet\`), expandindo sempre o conjunto de menor tamanho a cada rodada.
- As buscas se encontram na metade do caminho ($d/2$).
- O número total de nós visitados cai drasticamente para $2 \\times O(B^{d/2}) = O(B^{d/2})$. Para $B=10$ e $d=6$, reduz de $1.000.000$ para apenas $2.000$ nós avaliados ($500\\times$ mais rápido).

### Dual Coding Visual
| Técnica de BFS | Nós Avaliados ($B=10, d=6$) | Complexidade de Nós |
|---|---|---|
| **BFS Unidirecional** | $10^6 = 1.000.000$ nós | $O(B^d)$ |
| **BFS Bidirecional** | $2 \\times 10^3 = 2.000$ nós | $O(B^{d/2})$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Word Ladder (LeetCode 127)
A transição de BFS unidirecional para bidirecional transforma uma solução com tempo de execução de ~400ms em uma solução de ~15ms em Java.

#### Key Takeaways
- É aplicável sempre que o estado final exato for conhecido previamente (como no jogo do quebra-cabeça de 8 peças ou transformações de palavras).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/bfs-dfs-traversals/DSA-PATT-TRAVERSAL-004.md', `---
id: DSA-PATT-TRAVERSAL-004
title: "Flood Fill e Contagem de Componentes em Matrizes 2D (Number of Islands)"
tags:
  - level::l4-pleno
  - topic::dsa::bfs-dfs-traversals
  - company::meta
  - freq::high
---

## Pergunta
Como modelar uma **Matriz 2D como um Grafo Implícito** para contar componentes conexos (*Number of Islands*) em $O(M \\times N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Cada célula $(r, c)$ da matriz é tratada como um vértice cujas arestas conectam às 4 células adjacentes válidas ($(r+1, c), (r-1, c), (r, c+1), (r, c-1)$).
- Ao iterar sobre a matriz com loops aninhados:
  - Ao encontrar uma terra não visitada (\`grid[r][c] == '1'\`), incrementamos \`islandCount++\`.
  - Disparamos uma DFS/BFS para afundar/visitar toda a ilha conectada (\`grid[r][c] = '0'\`), marcando-a in-place para não ser revisitada.
- **Complexidade**: $O(M \\times N)$ tempo e $O(M \\times N)$ espaço no pior caso de pilha de recursão.

### Dual Coding Visual
| Elemento de Matriz | Equivalente em Teoria dos Grafos |
|---|---|
| **Célula \`(r, c)\`** | Vértice $V$ |
| **4 Vizinhos Ortogonais** | Arestas $E$ |
| **Ilha Conectada** | Componente Conexo do Grafo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Number of Islands
\`\`\`java
public class NumberOfIslands {
  public int numIslands(char[][] grid) {
    int count = 0;
    for (int r = 0; r < grid.length; r++) {
      for (int c = 0; c < grid[0].length; c++) {
        if (grid[r][c] == '1') {
          count++;
          dfs(grid, r, c);
        }
      }
    }
    return count;
  }

  private void dfs(char[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
    grid[r][c] = '0'; // Marca como visitado in-place
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
  }
}
\`\`\`

#### Key Takeaways
- Modificar a célula para \`'0'\` in-place elimina a necessidade de alocar uma matriz auxiliar de booleanos \`visited[][]\`.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/bfs-dfs-traversals/DSA-PATT-TRAVERSAL-005.md', `---
id: DSA-PATT-TRAVERSAL-005
title: "Detecção de Ciclos em Grafos Direcionados via DFS de 3 Cores (White, Gray, Black)"
tags:
  - level::l4-pleno
  - topic::dsa::bfs-dfs-traversals
  - company::amazon
  - freq::high
---

## Pergunta
Como o algoritmo de **Coloração de 3 Estados (White, Gray, Black)** detecta ciclos em grafos direcionados via DFS em tempo $O(V + E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Cada vértice possui 1 de 3 estados de cor:
  1. **White (0 - Não Visitado)**: Vértice ainda não processado.
  2. **Gray (1 - Em Processamento / Na Pilha Atual)**: Vértice está na cadeia de recursão ativa no momento.
  3. **Black (2 - Concluído)**: Vértice e toda a sua subárvore já foram totalmente explorados sem ciclos.
- **Detecção de Ciclo**: Durante a travessia DFS a partir de um nó cinza, se encontrarmos um vizinho que **já é cinza (Gray)**, encontramos uma **Back-Edge** (aresta de retorno para um ancestral ativo na pilha), confirmando a existência de um **Ciclo Direcionado**.

### Dual Coding Visual
| Cor do Vértice | Estado de Processamento | Ação ao Encontrar na DFS |
|---|---|---|
| **White (0)** | Inexplorado | Continua DFS normalmente |
| **Gray (1)** | Na pilha de recursão ativa | **CICLO DETECTADO!** |
| **Black (2)** | Totalmente concluído | Ignora (caminho seguro) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Diferente de grafos não-direcionados (onde DSU funciona), a detecção de ciclos em grafos direcionados exige distinguir nós em processamento ativo (Gray) de nós já concluídos (Black).

</details>
`);

console.log('✅ binary-search, intervals-merge and bfs-dfs-traversals decomposed.');
