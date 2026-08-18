import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Module 1 Part 4: Heaps, DSU, Graphs & Advanced Trees...');

// 7. heaps-priority-queues
writeAndValidateCard('decks/01-dsa/data-structures/heaps-priority-queues/DSA-STRUCT-HEAP-000.md', `---
id: DSA-STRUCT-HEAP-000
title: "Propriedade e Invariante de Heap Binário (Min-Heap vs Max-Heap)"
tags:
  - level::l3-junior
  - topic::dsa::heaps-priority-queues
  - company::amazon
  - freq::high
---

## Pergunta
O que é a propriedade estrutural e a invariante de ordenação de um **Heap Binário** (Min-Heap e Max-Heap)?

## Resposta
### Quick Answer
**Solução Direta**:
- Um Heap Binário é uma **Árvore Binária Completa** que satisfaz a invariante de heap:
  - **Min-Heap**: Para todo nó $i$, o valor do nó pai é menor ou igual ao valor de seus filhos ($\\text{pai} \\le \\text{filhos}$). O elemento mínimo global reside sempre na **raiz** ($O(1)$).
  - **Max-Heap**: Para todo nó $i$, o valor do nó pai é maior ou igual ao de seus filhos ($\\text{pai} \\ge \\text{filhos}$). O elemento máximo reside na raiz.
- A estrutura não impõe ordenação horizontal estrita entre nós irmãos, apenas vertical entre pais e descendentes.

### Dual Coding Visual
| Tipo de Heap | Invariante de Nó | Elemento na Raiz |
|---|---|---|
| **Min-Heap** | $\\text{pai} \\le \\text{filhos}$ | Menor valor global ($O(1)$) |
| **Max-Heap** | $\\text{pai} \\ge \\text{filhos}$ | Maior valor global ($O(1)$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Como a árvore é completa, a altura é estritamente garantida como $H = \\lfloor \\log_2 N \\rfloor$, evitando qualquer risco de degeneração.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/heaps-priority-queues/DSA-STRUCT-HEAP-002.md', `---
id: DSA-STRUCT-HEAP-002
title: "Representação Compacta de Heap Binário em Array Contíguo sem Ponteiros"
tags:
  - level::l3-junior
  - topic::dsa::heaps-priority-queues
  - company::google
  - freq::high
---

## Pergunta
Por que um Heap Binário pode ser representado compactamente em um **array contíguo sem ponteiros** e quais são as fórmulas de indexação?

## Resposta
### Quick Answer
**Solução Direta**:
- Como um Heap é uma árvore binária completa (preenchida nível por nível da esquerda para a direita), não existem "buracos" na estrutura.
- Cada nó no índice $i$ (indexação 0-based) mapeia diretamente para seus parentes via fórmulas aritméticas rápidas:
  - **Pai**: $\\lfloor (i - 1) / 2 \\rfloor$
  - **Filho Esquerdo**: $2i + 1$
  - **Filho Direito**: $2i + 2$
- Isso elimina 100% dos ponteiros de árvore, resultando em localidade de cache perfeita e zero overhead de memória.

### Dual Coding Visual
| Relação Familiar | Fórmula (0-Indexed) | Exemplo para Índice $i = 2$ |
|---|---|---|
| **Pai** | $(i - 1) / 2$ | $(2 - 1) / 2 = 0$ (Raiz) |
| **Filho Esquerdo** | $2i + 1$ | $2(2) + 1 = 5$ |
| **Filho Direito** | $2i + 2$ | $2(2) + 2 = 6$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O mapeamento em array contíguo torna o Heap uma das estruturas mais rápidas e eficientes em memória na computação.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/heaps-priority-queues/DSA-STRUCT-HEAP-003.md', `---
id: DSA-STRUCT-HEAP-003
title: "Implementação de Fila de Prioridade com Inserção e Extração em O(log N)"
tags:
  - level::l3-junior
  - topic::dsa::heaps-priority-queues
  - company::microsoft
  - freq::high
---

## Pergunta
Como ocorrem as operações de **inserção (\`push\`)** e **remoção do extremo (\`pop\`)** em uma Fila de Prioridade em tempo $O(\\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- **Inserção (\`push(x)\`)**: Adiciona o novo elemento no final do array e executa **\`siftUp\` (ou bubble-up)**: troca o elemento com seu pai sucessivamente até restaurar a invariante ($O(\\log N)$).
- **Remoção (\`pop()\`)**: Substitui a raiz pelo último elemento do array, remove o último elemento e executa **\`siftDown\` (ou bubble-down)**: troca a raiz com o menor de seus filhos até restabelecer a invariante ($O(\\log N)$).
- **Consulta (\`peek()\`)**: Apenas lê o índice 0 em tempo constante $O(1)$.

### Dual Coding Visual
| Operação | Mecânica de Reajuste | Complexidade |
|---|---|---|
| **\`push(x)\`** | Adiciona no fim + \`siftUp\` | $O(\\log N)$ |
| **\`pop()\`** | Troca raiz com último + \`siftDown\` | $O(\\log N)$ |
| **\`peek()\`** | Retorna \`arr[0]\` | $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em ambas as operações, o elemento percorre no máximo a altura da árvore $H = \\log_2 N$.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/heaps-priority-queues/DSA-STRUCT-HEAP-001.md', `---
id: DSA-STRUCT-HEAP-001
title: "Demonstração do Custo Linear O(N) do Algoritmo Heapify Bottom-Up"
tags:
  - level::l4-pleno
  - topic::dsa::heaps-priority-queues
  - company::meta
  - freq::high
---

## Pergunta
Por que o algoritmo **Heapify Bottom-Up constrói um Heap em tempo linear $O(N)$** em vez de $O(N \\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- No Heapify Bottom-Up, executamos \`siftDown\` a partir do último nó não-folha ($\\lfloor N/2 \\rfloor - 1$) descendo até o índice 0.
- A maioria dos nós reside nos níveis inferiores da árvore e precisa descer poucos passos:
  - $N/2$ nós folha descem $0$ passos.
  - $N/4$ nós descem no máximo $1$ passo.
  - $N/8$ nós descem no máximo $2$ passos.
- A soma total de passos converge pela série aritmético-geométrica:
  $$S = \\sum_{h=0}^{\\log N} \\frac{N}{2^{h+1}} \\times h = N \\sum_{h=0}^{\\infty} \\frac{h}{2^{h+1}} = N \\times 1 = O(N)$$

### Dual Coding Visual
| Abordagem de Construção | Algoritmo | Complexidade de Tempo |
|---|---|---|
| **$N$ Inserções Top-Down** | \`siftUp\` sucessivo | $O(N \\log N)$ |
| **Heapify Bottom-Up** | \`siftDown\` a partir de $N/2$ | $O(N)$ Linear |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Heapify Linear
\`\`\`java
public class HeapifyUtil {
  public static void buildMinHeap(int[] arr) {
    int n = arr.length;
    // Inicia no último nó pai e vai até a raiz
    for (int i = n / 2 - 1; i >= 0; i--) {
      siftDown(arr, i, n);
    }
  }

  private static void siftDown(int[] arr, int i, int n) {
    int smallest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if (left < n && arr[left] < arr[smallest]) smallest = left;
    if (right < n && arr[right] < arr[smallest]) smallest = right;

    if (smallest != i) {
      int temp = arr[i];
      arr[i] = arr[smallest];
      arr[smallest] = temp;
      siftDown(arr, smallest, n);
    }
  }
}
\`\`\`

#### Key Takeaways
- Construir um heap sobre um array já existente via Heapify custa apenas $O(N)$, sendo o primeiro passo do *Heapsort*.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/heaps-priority-queues/DSA-STRUCT-HEAP-004.md', `---
id: DSA-STRUCT-HEAP-004
title: "Resolução do Problema Top-K Elements com Min-Heap em Tempo O(N log K)"
tags:
  - level::l4-pleno
  - topic::dsa::heaps-priority-queues
  - company::google
  - freq::high
---

## Pergunta
Como utilizar um **Min-Heap de tamanho fixo $K$** para encontrar os $K$ maiores elementos de um array em tempo $O(N \\log K)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos um **Min-Heap** com capacidade restrita a exatamente $K$ elementos:
  - Para cada elemento $x$ do array:
    1. Inserimos $x$ no heap.
    2. Se o tamanho do heap ultrapassar $K$, removemos a raiz com \`pop()\`. Como é um Min-Heap, a raiz é o menor entre os candidatos e é descartada.
- No final, restam no heap exatamente os $K$ maiores elementos.
- **Complexidade**: $O(N \\log K)$ tempo e $O(K)$ espaço auxiliar (muito superior a ordenar o array inteiro em $O(N \\log N)$ quando $K \\ll N$).

### Dual Coding Visual
| Estratégia Top-K | Complexidade de Tempo | Espaço Auxiliar |
|---|---|---|
| **Ordenação Completa** | $O(N \\log N)$ | $O(1)$ ou $O(N)$ |
| **Min-Heap de Tamanho $K$** | $O(N \\log K)$ | $O(K)$ |
| **Quickselect** | $O(N)$ Médio / $O(N^2)$ Pior | $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Top K Elements
\`\`\`java
import java.util.PriorityQueue;

public class TopKPattern {
  public static int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>(k);
    for (int num : nums) {
      minHeap.offer(num);
      if (minHeap.size() > k) {
        minHeap.poll(); // Descarta o menor dos k+1
      }
    }
    return minHeap.peek(); // Retorna o k-ésimo maior
  }
}
\`\`\`

#### Key Takeaways
- O padrão Min-Heap para Top-K Maiores (e Max-Heap para Top-K Menores) é um dos padrões mais cobrados em entrevistas técnicas.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/heaps-priority-queues/DSA-STRUCT-HEAP-005.md', `---
id: DSA-STRUCT-HEAP-005
title: "Padrão de Dois Heaps para Mediana de Fluxo Contínuo em Tempo O(1)"
tags:
  - level::l4-pleno
  - topic::dsa::heaps-priority-queues
  - company::netflix
  - freq::high
---

## Pergunta
Como o padrão de **Dois Heaps (Max-Heap + Min-Heap)** calcula a mediana de um fluxo contínuo de dados em tempo $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Dividimos o fluxo de dados em duas metades balanceadas:
  1. \`smallHeap\` (**Max-Heap**): Armazena a metade inferior dos números (topo = maior da metade inferior).
  2. \`largeHeap\` (**Min-Heap**): Armazena a metade superior dos números (topo = menor da metade superior).
- Mantemos a invariante de balanceamento de tamanho: $\\text{len}(\\text{small}) == \\text{len}(\\text{large})$ ou $\\text{len}(\\text{small}) == \\text{len}(\\text{large}) + 1$.
- **Cálculo da Mediana em $O(1)$**:
  - Se total ímpar: \`smallHeap.peek()\`.
  - Se total par: $(\\text{smallHeap.peek()} + \\text{largeHeap.peek()}) / 2.0$.

### Dual Coding Visual
| Configuração de Heaps | Metade dos Dados | Acesso ao Elemento Mediano |
|---|---|---|
| **Max-Heap (\`small\`)** | Metade Inferior ($x \\le \\text{mediana}$) | Topo é o maior da metade baixa |
| **Min-Heap (\`large\`)** | Metade Superior ($x > \\text{mediana}$) | Topo é o menor da metade alta |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Find Median from Data Stream (LeetCode 295)
\`\`\`java
import java.util.Collections;
import java.util.PriorityQueue;

public class MedianFinder {
  private final PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder()); // Max-Heap
  private final PriorityQueue<Integer> large = new PriorityQueue<>(); // Min-Heap

  public void addNum(int num) {
    small.offer(num);
    large.offer(small.poll()); // Garante que large tem números maiores

    // Rebalanceia tamanhos
    if (small.size() < large.size()) {
      small.offer(large.poll());
    }
  }

  public double findMedian() {
    if (small.size() > large.size()) return small.peek();
    return (small.peek() + large.peek()) / 2.0;
  }
}
\`\`\`

#### Key Takeaways
- Inserir um número custa $O(\\log N)$ e obter a mediana custa estritamente $O(1)$.

</details>
`);

// 8. disjoint-set-union
writeAndValidateCard('decks/01-dsa/data-structures/disjoint-set-union/DSA-STRUCT-DSU-000.md', `---
id: DSA-STRUCT-DSU-000
title: "Conceito de Disjoint Set Union (DSU) e Representação de Conjuntos Disjuntos"
tags:
  - level::l3-junior
  - topic::dsa::disjoint-set-union
  - company::meta
  - freq::high
---

## Pergunta
O que é a estrutura de dados **Disjoint Set Union (DSU / Union-Find)** e qual problema ela modela?

## Resposta
### Quick Answer
**Solução Direta**:
- O **DSU (Union-Find)** mantém uma coleção de conjuntos disjuntos (não-sobrepostos) de elementos particionados.
- Cada conjunto é identificado por um **elemento representativo único (líder ou raiz)**.
- Suporta duas operações fundamentais:
  - **\`find(x)\`**: Retorna o líder do conjunto ao qual $x$ pertence.
  - **\`union(x, y)\`**: Funde os conjuntos que contêm $x$ e $y$ em um único conjunto.
- É a estrutura ideal para consultas dinâmicas de conectividade (*connected components*) em grafos.

### Dual Coding Visual
| Operação DSU | Propósito | Pergunta Respondida |
|---|---|---|
| **\`find(x)\`** | Localiza a raiz canônica do conjunto | "A qual grupo $x$ pertence?" |
| **\`union(x, y)\`** | Conecta dois grupos distintos | "Funda os grupos de $x$ e $y$" |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Dois nós $A$ e $B$ estão conectados se e somente se \`find(A) == find(B)\`.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/disjoint-set-union/DSA-STRUCT-DSU-002.md', `---
id: DSA-STRUCT-DSU-002
title: "Operação Find e Busca de Representante Canônico em DSU"
tags:
  - level::l3-junior
  - topic::dsa::disjoint-set-union
  - company::google
  - freq::high
---

## Pergunta
Como a operação **\`find\`** localiza a raiz canônica de um elemento em um DSU seguindo ponteiros de pais?

## Resposta
### Quick Answer
**Solução Direta**:
- Cada nó mantém um ponteiro para seu nó pai em um array \`parent[]\`.
- Inicialmente, todo elemento é seu próprio pai (\`parent[i] = i\`), formando $N$ conjuntos unitários.
- Ao chamar \`find(x)\`:
  - Segue-se a cadeia de pais recursivamente (\`x = parent[x]\`) até encontrar o nó raiz onde \`parent[root] == root\`.
  - Retorna esse nó raiz representativo.

### Dual Coding Visual
| Estado de Nó | Condição no Array | Papel Estrutural |
|---|---|---|
| **Nó Raiz (Líder)** | \`parent[i] == i\` | Representante oficial do grupo |
| **Nó Interno** | \`parent[i] != i\` | Aponta para pai na hierarquia |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Find Básico
\`\`\`java
public class BasicDSU {
  private int[] parent;

  public BasicDSU(int n) {
    parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
  }

  public int find(int x) {
    while (x != parent[x]) {
      x = parent[x];
    }
    return x;
  }
}
\`\`\`

#### Key Takeaways
- Sem otimizações, a cadeia de ponteiros pode degenerar em uma linha de comprimento $O(N)$, tornando o \`find\` linear.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/disjoint-set-union/DSA-STRUCT-DSU-003.md', `---
id: DSA-STRUCT-DSU-003
title: "Operação Union e Fusão de Componentes Conexos em DSU"
tags:
  - level::l3-junior
  - topic::dsa::disjoint-set-union
  - company::amazon
  - freq::high
---

## Pergunta
Como a operação **\`union\`** funde dois conjuntos no DSU e como ela verifica se dois nós já estavam conectados?

## Resposta
### Quick Answer
**Solução Direta**:
- Para fundir os conjuntos de $x$ e $y$:
  1. Encontra as raízes de ambos: \`rootX = find(x)\` e \`rootY = find(y)\`.
  2. Se \`rootX == rootY\`, os elementos **já pertencem ao mesmo conjunto** (nenhuma ação é necessária e retorna \`false\`).
  3. Se \`rootX != rootY\`, faz uma raiz apontar para a outra (\`parent[rootX] = rootY\`), unificando os grupos e decrementando o total de componentes conexos.

### Dual Coding Visual
| Condição em \`union(x, y)\` | Ação | Conectividade |
|---|---|---|
| \`rootX == rootY\` | Ignora / Sinaliza ciclo | Já conectados |
| \`rootX != rootY\` | \`parent[rootX] = rootY\` | Nova conexão estabelecida |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O retorno booleano de \`union\` (verdadeiro se conectou, falso se já estavam conectados) é a chave para algoritmos de detecção de ciclos e Kruskal.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/disjoint-set-union/DSA-STRUCT-DSU-001.md', `---
id: DSA-STRUCT-DSU-001
title: "Otimização DSU: Path Compression + Union by Rank e Complexidade O(α(N))"
tags:
  - level::l4-pleno
  - topic::dsa::disjoint-set-union
  - company::google
  - freq::high
---

## Pergunta
Por que a combinação de **Path Compression** com **Union by Rank** reduz o custo de operações do DSU para **$O(\\alpha(N))$** quase constante?

## Resposta
### Quick Answer
**Solução Direta**:
- **Path Compression**: Durante o \`find(x)\`, faz todos os nós visitados no caminho apontarem diretamente para a raiz (\`parent[x] = find(parent[x])\`), achatando a árvore para altura $\\approx 1$.
- **Union by Rank / Size**: Ao unir duas árvores, anexa a árvore de menor profundidade (*rank*) sob a raiz da de maior profundidade, impedindo crescimento descontrolado da altura.
- **Complexidade**: A combinação de ambas garante tempo amortizado $O(\\alpha(N))$ por operação, onde $\\alpha$ é a **Função Inversa de Ackermann** (para qualquer valor prático no universo $N \\le 10^{80}$, $\\alpha(N) \\le 4$, ou seja, tempo efetivamente constante).

### Dual Coding Visual
| Otimização | Mecanismo | Efeito na Árvore |
|---|---|---|
| **Path Compression** | \`parent[x] = find(parent[x])\` | Achata os ramos visitados |
| **Union by Rank** | Conecta menor árvore sob a maior | Limita altura a $O(\\log N)$ |
| **Ambos Juntos** | Amortização máxima | $O(\\alpha(N)) \\approx O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: DSU Ótimo Canônico
\`\`\`java
public class OptimizedDSU {
  private final int[] parent;
  private final int[] rank;
  private int count;

  public OptimizedDSU(int n) {
    this.parent = new int[n];
    this.rank = new int[n];
    this.count = n;
    for (int i = 0; i < n; i++) parent[i] = i;
  }

  public int find(int x) {
    if (parent[x] != x) {
      parent[x] = find(parent[x]); // Path Compression
    }
    return parent[x];
  }

  public boolean union(int x, int y) {
    int rootX = find(x);
    int rootY = find(y);
    if (rootX == rootY) return false;

    // Union by Rank
    if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }
    count--;
    return true;
  }

  public int getCount() { return count; }
}
\`\`\`

#### Key Takeaways
- Sem Path Compression e Union by Rank, o DSU pode degradar para $O(N)$ por operação. Com ambos, é praticamente $O(1)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/disjoint-set-union/DSA-STRUCT-DSU-004.md', `---
id: DSA-STRUCT-DSU-004
title: "Detecção de Ciclos em Grafos Não-Direcionados com DSU"
tags:
  - level::l4-pleno
  - topic::dsa::disjoint-set-union
  - company::meta
  - freq::high
---

## Pergunta
Como o DSU detecta **ciclos em grafos não-direcionados** durante a inserção incremental de arestas?

## Resposta
### Quick Answer
**Solução Direta**:
- Para cada aresta $(u, v)$ do grafo:
  1. Consulta as raízes: \`rootU = find(u)\` e \`rootV = find(v)\`.
  2. Se \`rootU == rootV\`, significa que $u$ e $v$ **já estavam conectados** por um caminho anterior existente. Adicionar a aresta $(u, v)$ fecha um **ciclo** no grafo.
  3. Se \`rootU != rootV\`, executa \`union(u, v)\` com segurança.
- **Complexidade**: $O(E \\cdot \\alpha(V))$ tempo e $O(V)$ espaço.

### Dual Coding Visual
| Aresta Analisada $(u, v)$ | Condição no DSU | Diagnóstico |
|---|---|---|
| \`find(u) != find(v)\` | Diferentes conjuntos | Aresta segura (sem ciclo) |
| \`find(u) == find(v)\` | Mesmo conjunto | Ciclo detectado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Redundant Connection (LeetCode 684)
O problema de encontrar a aresta redundante que fecha um ciclo em um grafo conexo é resolvido diretamente retornando a primeira aresta $(u, v)$ onde \`!dsu.union(u, v)\`.

#### Key Takeaways
- O DSU detecta ciclos apenas em grafos **não-direcionados**; para grafos direcionados, deve-se usar DFS de 3 cores ou Algoritmo de Kahn (Ordenação Topológica).

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/disjoint-set-union/DSA-STRUCT-DSU-005.md', `---
id: DSA-STRUCT-DSU-005
title: "Construção de Árvore Geradora Mínima (MST) via Algoritmo de Kruskal e DSU"
tags:
  - level::l4-pleno
  - topic::dsa::disjoint-set-union
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Algoritmo de Kruskal** utiliza o DSU para construir a Árvore Geradora Mínima (MST) de um grafo em $O(E \\log E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo guloso de Kruskal opera em três passos:
  1. **Ordenação**: Ordena todas as $E$ arestas em ordem crescente de peso ($O(E \\log E)$).
  2. **Iteração Gulosa com DSU**: Para cada aresta $(u, v, w)$ ordenada:
     - Se \`dsu.union(u, v)\` retornar \`true\` (não forma ciclo), adiciona a aresta à MST e soma o peso $w$.
     - Se retornar \`false\` (formaria ciclo), descarta a aresta.
  3. Encerra quando a MST contiver $V - 1$ arestas.

### Dual Coding Visual
| Etapa de Kruskal | Operação Principal | Custo Assintótico |
|---|---|---|
| **1. Ordenação de Arestas** | \`Arrays.sort(edges)\` | $O(E \\log E)$ |
| **2. Fusão de Componentes** | $E$ operações no DSU | $O(E \\cdot \\alpha(V))$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Como $O(E \\cdot \\alpha(V)) \\ll O(E \\log E)$, o gargalo de Kruskal reside exclusivamente na ordenação inicial das arestas.

</details>
`);

// 9. graphs-representations
writeAndValidateCard('decks/01-dsa/data-structures/graphs-representations/DSA-STRUCT-GRAPH-000.md', `---
id: DSA-STRUCT-GRAPH-000
title: "Definição Formal de Grafo, Direcionamento e Ponderação de Arestas"
tags:
  - level::l3-junior
  - topic::dsa::graphs-representations
  - company::meta
  - freq::high
---

## Pergunta
O que define formalmente um **Grafo** ($G = (V, E)$) e qual a diferença entre grafos direcionados, não-direcionados e ponderados?

## Resposta
### Quick Answer
**Solução Direta**:
- Um Grafo $G = (V, E)$ é composto por um conjunto de vértices/nós $V$ e um conjunto de arestas $E$ conectando pares de nós.
- **Não-Direcionado**: Arestas são bidirecionais ($(u, v) = (v, u)$). Exemplo: conexões de amizade no Facebook.
- **Direcionado (Digrafo)**: Arestas possuem sentido unidirecional ($u \\to v \\neq v \\to u$). Exemplo: seguidores no Twitter/Instagram ou dependências de pacotes.
- **Ponderado**: Cada aresta possui um peso associado (custo, distância, latência).

### Dual Coding Visual
| Tipo de Grafo | Simetria de Aresta | Exemplo de Aplicação |
|---|---|---|
| **Não-Direcionado** | $(u, v) \\iff (v, u)$ | Redes de computadores / Amizades |
| **Direcionado (Digrafo)** | $u \\to v$ | Navegação web / Pré-requisitos |
| **Ponderado** | $(u, v, w)$ com peso $w$ | Rotas de GPS (distância em km) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O direcionamento e a presença de pesos determinam quais algoritmos são aplicáveis (ex: Dijkstra para ponderados não-negativos, BFS para não-ponderados).

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/graphs-representations/DSA-STRUCT-GRAPH-002.md', `---
id: DSA-STRUCT-GRAPH-002
title: "Representação de Grafos por Matriz de Adjacência: Vantagens e Custo O(V²)"
tags:
  - level::l3-junior
  - topic::dsa::graphs-representations
  - company::google
  - freq::high
---

## Pergunta
Como funciona a representação de grafos por **Matriz de Adjacência** e quais suas características de complexidade?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Matriz de Adjacência** é uma matriz bidimensional $M$ de tamanho $V \\times V$:
  - $M[u][v] = 1$ (ou peso $w$) se existe uma aresta conectando $u$ a $v$.
  - $M[u][v] = 0$ se não há aresta.
- **Vantagens**: Consulta instantânea $O(1)$ para verificar se dois vértices são adjacentes (\`hasEdge(u, v)\`).
- **Desvantagens**: Espaço de memória fixo quadrático $O(V^2)$ e iteração sobre vizinhos de um vértice custa sempre $O(V)$, mesmo em grafos esparsos.

### Dual Coding Visual
| Operação em Matriz | Complexidade | Observação |
|---|---|---|
| **Verificar Aresta $(u, v)$** | $O(1)$ Instantâneo | Acesso direto \`M[u][v]\` |
| **Listar Vizinhos de $u$** | $O(V)$ | Precisa varrer a linha inteira |
| **Consumo de Memória** | $O(V^2)$ | Proibitivo para $V > 10^5$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Matrizes de adjacência são indicadas apenas para grafos densos ($E \\approx V^2$) ou quando $V$ é muito pequeno ($V \\le 1000$).

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/graphs-representations/DSA-STRUCT-GRAPH-003.md', `---
id: DSA-STRUCT-GRAPH-003
title: "Representação de Grafos por Lista de Adjacência: Eficiência Espacial O(V+E)"
tags:
  - level::l3-junior
  - topic::dsa::graphs-representations
  - company::amazon
  - freq::high
---

## Pergunta
Como funciona a representação por **Lista de Adjacência** e por que ela é o padrão da indústria para grafos esparsos?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Lista de Adjacência** mantém um array de listas (ou vetores dinâmicos) \`List<Integer> adj[V]\`:
  - \`adj[u]\` armazena exclusivamente os vizinhos diretos com os quais $u$ compartilha uma aresta.
- **Eficiência Espacial**: Consome estritamente $O(V + E)$ de memória, alocando apenas as arestas reais existentes.
- **Travessia**: Iterar sobre os vizinhos de $u$ custa exatamente o grau do nó $O(\\text{deg}(u))$, permitindo que algoritmos como BFS e DFS rodem em tempo ótimo $O(V + E)$.

### Dual Coding Visual
| Representação | Consumo de Memória | Iteração de Vizinhos de $u$ |
|---|---|---|
| **Matriz de Adjacência** | $O(V^2)$ Quadrático | $O(V)$ Varredura de linha |
| **Lista de Adjacência** | $O(V + E)$ Ótimo | $O(\\text{deg}(u))$ Apenas vizinhos reais |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Lista de Adjacência
\`\`\`go
package main

type Graph struct {
  adj [][]int
}

func NewGraph(v int) *Graph {
  return &Graph{adj: make([][]int, v)}
}

func (g *Graph) AddEdge(u, v int) {
  g.adj[u] = append(g.adj[u], v)
  g.adj[v] = append(g.adj[v], u) // Para não-direcionado
}
\`\`\`

#### Key Takeaways
- Como a esmagadora maioria dos grafos do mundo real (redes sociais, malhas viárias, web) é esparsa ($E \\ll V^2$), a lista de adjacência é a escolha padrão.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/graphs-representations/DSA-STRUCT-GRAPH-001.md', `---
id: DSA-STRUCT-GRAPH-001
title: "Critérios de Engenharia: Lista vs Matriz de Adjacência para Grafos Densos e Esparsos"
tags:
  - level::l4-pleno
  - topic::dsa::graphs-representations
  - company::google
  - freq::high
---

## Pergunta
Quais os critérios rigorosos de engenharia para escolher entre Lista de Adjacência e Matriz de Adjacência em sistemas de escala FAANG?

## Resposta
### Quick Answer
**Solução Direta**:
- **Grafo Esparso ($E \\ll V^2$, ex: $E = O(V)$)**:
  - Use **Lista de Adjacência**. Economiza gigabytes de memória ($O(V+E)$) e permite BFS/DFS em $O(V+E)$ em vez de $O(V^2)$.
- **Grafo Denso ($E \\approx V^2$)**:
  - Use **Matriz de Adjacência**. Ocupa a mesma ordem de memória que a lista, mas possui zero overhead de ponteiros e oferece consultas de aresta instantâneas $O(1)$.
- **Algoritmos com Matriz**: Algoritmos como Floyd-Warshall ($O(V^3)$ All-Pairs Shortest Path) operam naturalmente sobre matrizes contíguas.

### Dual Coding Visual
| Métrica | Grafo Esparso ($V=10^5, E=10^6$) | Grafo Denso ($V=10^4, E=10^8$) |
|---|---|---|
| **Matriz $O(V^2)$** | $\\approx 10\\text{ GB}$ (99.9% vazia) | $\\approx 100\\text{ MB}$ (Ótima) |
| **Lista $O(V+E)$** | $\\approx 12\\text{ MB}$ (Ideal) | $\\approx 400\\text{ MB}$ (Ponteiros extras) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Para redes sociais de milhões de usuários ($V = 10^8$), a Matriz de Adjacência exigiria $10^{16}$ bytes ($10\\text{ Petabytes}$), tornando a Lista de Adjacência a única opção fisicamente viável.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/graphs-representations/DSA-STRUCT-GRAPH-004.md', `---
id: DSA-STRUCT-GRAPH-004
title: "Compressed Sparse Row (CSR) para Grafos Estáticos de Alta Performance"
tags:
  - level::l4-pleno
  - topic::dsa::graphs-representations
  - company::meta
  - freq::high
---

## Pergunta
Como a estrutura **Compressed Sparse Row (CSR)** elimina ponteiros e atinge máxima localidade de cache em grafos estáticos de grande escala?

## Resposta
### Quick Answer
**Solução Direta**:
- O **CSR** comprime a lista de adjacência inteira em **3 arrays planos contíguos**:
  1. \`values[]\`: Pesos de todas as arestas (opcional).
  2. \`column_indices[]\` (\`cols\`): Os nós de destino de todas as arestas concatenados em sequência contígua ($|E|$ inteiros).
  3. \`row_offsets[]\` (\`row_ptr\`): Ponteiros de índice ($|V| + 1$ inteiros) onde as arestas do vértice $u$ iniciam em \`row_ptr[u]\` e terminam em \`row_ptr[u+1]\`.
- **Benefício**: Zero ponteiros ou listas dinâmicas no Heap, compactação máxima de memória e vetorização SIMD de travessia na CPU/GPU.

### Dual Coding Visual
| Estrutura de Grafo | Disposição na Memória | Localidade de Cache |
|---|---|---|
| **Lista de Listas (\`vector<vector>\`)** | Múltiplos buffers fragmentados | Ruim (Cache Misses) |
| **CSR (Compressed Sparse Row)** | 2 arrays planos contíguos | Perfeita (Pré-fetch sequencial) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Aplicações Industriais
- Utilizado em bibliotecas de grafos em GPU (NVIDIA cuGraph), motores de Graph Neural Networks (PyTorch Geometric) e computação científica de matrizes esparsas.

#### Key Takeaways
- O CSR é a representação mais compacta e rápida para grafos estáticos que não sofrem mutação frequente de arestas.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/graphs-representations/DSA-STRUCT-GRAPH-005.md', `---
id: DSA-STRUCT-GRAPH-005
title: "Impacto da Representação de Grafos na Complexidade de BFS, DFS e Dijkstra"
tags:
  - level::l4-pleno
  - topic::dsa::graphs-representations
  - company::microsoft
  - freq::high
---

## Pergunta
Como a escolha entre Lista de Adjacência e Matriz de Adjacência altera a complexidade assintótica de **BFS, DFS e Dijkstra**?

## Resposta
### Quick Answer
**Solução Direta**:
- **BFS e DFS**:
  - *Com Lista de Adjacência*: $O(V + E)$ ótimo (visita cada nó e aresta uma única vez).
  - *Com Matriz de Adjacência*: $O(V^2)$ (para cada nó, precisa inspecionar todos os $V$ slots da linha).
- **Algoritmo de Dijkstra**:
  - *Com Min-Heap + Lista*: $O((V + E) \\log V)$ ótimo para grafos esparsos.
  - *Com Array + Matriz*: $O(V^2)$ ótimo para grafos densos onde $E \\approx V^2$ (pois $(V + V^2) \\log V > V^2$).

### Dual Coding Visual
| Algoritmo | Complexidade (Lista de Adjacência) | Complexidade (Matriz de Adjacência) |
|---|---|---|
| **BFS / DFS** | $O(V + E)$ | $O(V^2)$ |
| **Dijkstra** | $O((V + E) \\log V)$ | $O(V^2)$ |
| **Prim (MST)** | $O((V + E) \\log V)$ | $O(V^2)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de algoritmos, sempre declare explicitamente a complexidade baseada em Lista de Adjacência ($O(V + E)$) a menos que o problema especifique uma matriz densa.

</details>
`);

// 10. advanced-trees
writeAndValidateCard('decks/01-dsa/data-structures/advanced-trees/DSA-STRUCT-ADVTREE-000.md', `---
id: DSA-STRUCT-ADVTREE-000
title: "Limitação de Prefix Sums em Cenários Dinâmicos de Consulta e Atualização"
tags:
  - level::l3-junior
  - topic::dsa::advanced-trees
  - company::google
  - freq::high
---

## Pergunta
Por que arrays de soma de prefixos (*Prefix Sums*) falham em atender cenários com **consultas de intervalo e atualizações pontuais dinâmicas simultâneas**?

## Resposta
### Quick Answer
**Solução Direta**:
- Em um array estático com **Prefix Sums**:
  - Consulta de soma de intervalo $\\sum_{i=L}^R A[i] = P[R] - P[L-1]$ executa em tempo instantâneo $O(1)$.
  - **O Gargalo**: Quando um elemento pontual $A[i]$ é atualizado, todos os prefixos subsequentes ($P[i], P[i+1], \\dots, P[N]$) precisam ser recalculados, custando **$O(N)$ linear**.
- Para $Q$ operações mistas de consulta e atualização, o custo total se torna $O(Q \\times N)$.
- Estruturas como **Segment Tree** e **Fenwick Tree** equilibram ambos para **$O(\\log N)$**.

### Dual Coding Visual
| Estrutura de Dados | Range Query (Consulta) | Point Update (Atualização) |
|---|---|---|
| **Array Simples** | $O(N)$ Varredura | $O(1)$ Direto no índice |
| **Prefix Sums** | $O(1)$ Subtração | $O(N)$ Recálculo em cascata |
| **Segment / Fenwick Tree** | $O(\\log N)$ Balanceado | $O(\\log N)$ Balanceado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Segment Trees e Fenwick Trees resolvem o dilema clássico da computação: equilibrar custo de leitura e custo de escrita para $O(\\log N)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/advanced-trees/DSA-STRUCT-ADVTREE-002.md', `---
id: DSA-STRUCT-ADVTREE-002
title: "Intuição e Estrutura da Segment Tree para Consultas de Intervalo em O(log N)"
tags:
  - level::l3-junior
  - topic::dsa::advanced-trees
  - company::meta
  - freq::high
---

## Pergunta
Como a **Segment Tree (Árvore de Segmentos)** decompõe intervalos para responder consultas associativas (soma, mínimo, GCD) em $O(\\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Segment Tree** é uma árvore binária onde:
  - As folhas representam os elementos individuais do array original ($A[i]$).
  - Cada nó interno armazena o resultado agregado (soma, $\\min$, $\\max$) do seu intervalo correspondente $[L, R]$, calculado pela combinação dos seus dois filhos $[L, M]$ e $[M+1, R]$.
- Qualquer intervalo de consulta arbitrário $[Q_L, Q_R]$ pode ser decomposto em no máximo **$O(\\log N)$ nós canônicos disjuntos** da árvore, calculando a resposta em $O(\\log N)$.

### Dual Coding Visual
| Nível da Segment Tree | Intervalo Coberto | Operação Agregada |
|---|---|---|
| **Raiz** | $[0, N-1]$ | Soma total do array |
| **Nós Internos** | Metades recursivas $[L, M]$ e $[M+1, R]$ | $\\text{soma}(\\text{left}) + \\text{soma}(\\text{right})$ |
| **Folhas** | $[i, i]$ | Valor unitário $A[i]$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Capacidade do Array de Representação
Uma Segment Tree construída sobre $N$ elementos pode ser armazenada em um array contíguo de tamanho máximo **$4N$**, com o filho esquerdo em $2i+1$ e direito em $2i+2$.

#### Key Takeaways
- Funciona para qualquer operação matemática **associativa** (Soma, Mínimo, Máximo, MDC/GCD, Multiplicação de Matrizes).

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/advanced-trees/DSA-STRUCT-ADVTREE-003.md', `---
id: DSA-STRUCT-ADVTREE-003
title: "Fenwick Tree (Binary Indexed Tree) e Isolamento do Bit Menos Significativo"
tags:
  - level::l3-junior
  - topic::dsa::advanced-trees
  - company::google
  - freq::high
---

## Pergunta
Como a **Fenwick Tree (Binary Indexed Tree - BIT)** utiliza a operação bitwise \`i & (-i)\` para consultas de prefixo e atualizações em $O(\\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Fenwick Tree** mantém um array $T$ de tamanho $N+1$ (1-indexed) onde cada posição $i$ é responsável pela soma de um intervalo de tamanho $\\text{LSB}(i) = i \\ \\& \\ (-i)$ (o bit menos significativo isolado em complemento de dois):
  - **Consulta de Prefixo \`query(i)\`**: Soma $T[i]$ e remove o LSB (\`i -= i & (-i)\`) até $i=0$ ($O(\\log N)$).
  - **Atualização Pontual \`update(i, val)\`**: Soma \`val\` em $T[i]$ e adiciona o LSB (\`i += i & (-i)\`) propagando até $N$ ($O(\\log N)$).
- **Vantagem sobre Segment Tree**: Consome apenas **$1N$** de espaço (contra $4N$) e seu código possui menos de 10 linhas.

### Dual Coding Visual
| Operação em Fenwick | Operação Bitwise de Passo | Complexidade |
|---|---|---|
| **\`query(i)\` (Prefixo)** | \`i -= i & (-i)\` (Remove LSB) | $O(\\log N)$ |
| **\`update(i, delta)\`** | \`i += i & (-i)\` (Soma LSB) | $O(\\log N)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Fenwick Tree Canônica
\`\`\`java
public class FenwickTree {
  private final int[] tree;

  public FenwickTree(int n) {
    this.tree = new int[n + 1];
  }

  public void update(int i, int delta) {
    for (; i < tree.length; i += i & (-i)) {
      tree[i] += delta;
    }
  }

  public int query(int i) {
    int sum = 0;
    for (; i > 0; i -= i & (-i)) {
      sum += tree[i];
    }
    return sum;
  }

  public int queryRange(int l, int r) {
    return query(r) - query(l - 1);
  }
}
\`\`\`

#### Key Takeaways
- A Fenwick Tree é a estrutura mais concisa e rápida para Range Sum Queries com Point Updates.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/advanced-trees/DSA-STRUCT-ADVTREE-001.md', `---
id: DSA-STRUCT-ADVTREE-001
title: "Mecanismo de Lazy Propagation em Segment Trees para Atualizações de Intervalo em O(log N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-trees
  - company::amazon
  - freq::high
---

## Pergunta
Como o mecanismo de **Lazy Propagation (Propagação Preguiçosa)** permite atualizar intervalos completos $[L, R]$ em uma Segment Tree em tempo $O(\\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Sem Lazy Propagation, atualizar um intervalo $[L, R]$ exigiria visitar todas as folhas do intervalo em $O(N)$.
- **Lazy Propagation**:
  - Quando um nó da árvore está totalmente contido no intervalo de atualização $[L, R]$, atualizamos o valor agregado daquele nó imediatamente e registramos a pendência em um array auxiliar \`lazy[node]\`.
  - **Postergamos** a propagação para os filhos até que uma operação futura precise consultar aquela subárvore.
  - Ao visitar um nó com pendência, empurramos o valor para os filhos imediatos (\`pushDown\`) e limpamos o \`lazy[node]\`.
- **Complexidade**: Reduz a atualização de intervalo de $O(N)$ para **$O(\\log N)$**.

### Dual Coding Visual
| Estratégia de Range Update | Visita de Nós | Complexidade de Tempo |
|---|---|---|
| **Sem Lazy Propagation** | Visita todas as folhas no range | $O(N)$ Ineficiente |
| **Com Lazy Propagation** | Atualiza nó superior + marca lazy | $O(\\log N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Lazy Propagation é essencial para problemas competitivos de grafos e intervalos onde ocorrem frequentes operações em lote sobre faixas de dados.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/advanced-trees/DSA-STRUCT-ADVTREE-004.md', `---
id: DSA-STRUCT-ADVTREE-004
title: "Fenwick Tree 2D para Consultas e Atualizações em Matrizes Dinâmicas"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-trees
  - company::meta
  - freq::high
---

## Pergunta
Como estender a Fenwick Tree para uma **matriz bidimensional 2D** com consultas e atualizações de submatrizes em $O(\\log N \\cdot \\log M)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Fenwick Tree 2D** aninha dois loops de LSB sobre uma matriz $T[N+1][M+1]$:
  - **\`update(row, col, delta)\`**: Executa o loop externo em \`row += row & (-row)\` e, para cada linha, executa o loop interno em \`col += col & (-col)\` ($O(\\log N \\cdot \\log M)$).
  - **\`query(row, col)\`**: Soma os acumulados decrescendo \`row -= row & (-row)\` e \`col -= col & (-col)\`.
- Para obter a soma de uma submatriz $[r_1, c_1]$ a $[r_2, c_2]$, aplica-se o Princípio da Inclusão-Exclusão 2D:
  $$\\text{soma} = Q(r_2, c_2) - Q(r_1-1, c_2) - Q(r_2, c_1-1) + Q(r_1-1, c_1-1)$$

### Dual Coding Visual
| Operação 2D | Abordagem Força Bruta | Fenwick Tree 2D |
|---|---|---|
| **Update Pontual Matriz** | $O(1)$ | $O(\\log N \\log M)$ |
| **Consulta Submatriz** | $O(N \\times M)$ | $O(\\log N \\log M)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A Fenwick Tree 2D é a solução mais elegante para o problema *Range Sum Query 2D - Mutable* (LeetCode 308).

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/advanced-trees/DSA-STRUCT-ADVTREE-005.md', `---
id: DSA-STRUCT-ADVTREE-005
title: "Conceito de Treap (Tree + Heap) e Resolução Probabilística de Balanceamento"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-trees
  - company::google
  - freq::high
---

## Pergunta
Como a estrutura **Treap (Cartesian Tree)** combina as propriedades de BST e Heap para manter balanceamento com alta probabilidade?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Treap** atribui a cada nó dois valores:
  1. Uma **Chave (\`key\`)**: Satisfaz estritamente a invariante de **BST** (esquerda $<$ chave $<$ direita).
  2. Uma **Prioridade (\`priority\`)**: Um número aleatório gerado no momento da inserção que satisfaz a invariante de **Max-Heap** ($\\text{pai} \\ge \\text{filhos}$).
- Ao inserir um elemento:
  - Insere-o como folha seguindo as regras da BST.
  - Executa rotações para subir o nó até satisfazer a prioridade do Heap.
- Como as prioridades são aleatórias, a árvore é equivalente a uma BST construída por inserção em ordem aleatória, garantindo altura esperada $O(\\log N)$ com alta probabilidade.

### Dual Coding Visual
| Dimensão do Nó | Invariante Satisfeita | Função na Estrutura |
|---|---|---|
| **\`key\` (Chave)** | BST ($\text{left} < \text{key} < \text{right}$) | Busca de elementos ordenada |
| **\`priority\` (Aleatória)** | Max-Heap ($\text{pai} \\ge \text{filhos}$) | Garante balanceamento probabilístico |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Operações Especiais em Treap
- **\`split(treap, k)\`**: Divide a Treap em duas Treaps $T_1$ (chaves $\\le k$) e $T_2$ (chaves $> k$) em $O(\\log N)$.
- **\`merge(T1, T2)\`**: Funde duas Treaps em uma única em $O(\\log N)$.

#### Key Takeaways
- Treaps (especialmente Treaps Implícitas) são a base para implementar vetores com inserção, remoção e inversão de intervalos em $O(\\log N)$.

</details>
`);

console.log('✅ All 10 Data Structures subtopics successfully decomposed!');
