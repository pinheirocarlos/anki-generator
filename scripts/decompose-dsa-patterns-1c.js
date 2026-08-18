import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Module 2 Part 1c: Topo Sort, Shortest Paths & MST (16 to 18)...');

// 16. topological-sort
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/topological-sort/DSA-PATT-TOPO-000.md', `---
id: DSA-PATT-TOPO-000
title: "Definição de Ordenação Topológica em Grafos Acíclicos Direcionados (DAGs)"
tags:
  - level::l3-junior
  - topic::dsa::topological-sort
  - company::google
  - freq::high
---

## Pergunta
O que é uma **Ordenação Topológica (Topological Sort)** e por que ela só é viável em Grafos Acíclicos Direcionados (DAGs)?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Ordenação Topológica** é uma linearização dos vértices de um grafo direcionado tal que, para toda aresta direcionada $u \\to v$, o vértice $u$ aparece **obrigatoriamente antes** de $v$ na sequência ordenada.
- **Viabilidade Exclusiva em DAGs**: Se o grafo contiver um ciclo (ex: $A \\to B \\to C \\to A$), $A$ deveria vir antes de $B$, que deveria vir antes de $C$, que deveria vir antes de $A$ (uma contradição lógica insolúvel). Portanto, a ordenação topológica existe se e somente se o grafo for um **DAG (Directed Acyclic Graph)**.

### Dual Coding Visual
| Tipo de Grafo | Possui Ciclo | Ordenação Topológica Válida |
|---|---|---|
| **DAG (Acíclico Direcionado)** | Não | Sim (ao menos uma ordenação válida) |
| **Grafo com Ciclo** | Sim | Impossível (dependência circular) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Um DAG pode admitir múltiplas ordenações topológicas válidas diferentes se houver tarefas independentes em paralelo.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/topological-sort/DSA-PATT-TOPO-002.md', `---
id: DSA-PATT-TOPO-002
title: "Resolução de Dependências de Tarefas e Compilação com Topological Sort"
tags:
  - level::l3-junior
  - topic::dsa::topological-sort
  - company::amazon
  - freq::high
---

## Pergunta
Como a Ordenação Topológica modela sistemas de resolução de dependências de compilação (ex: Make, Gradle, npm)?

## Resposta
### Quick Answer
**Solução Direta**:
- Modelamos cada pacote/tarefa como um vértice e cada pré-requisito como uma aresta direcionada $\\text{Dependência} \\to \\text{Alvo}$ (ou $\\text{Tarefa} \\to \\text{Pré-requisito}$).
- A ordenação topológica gera a **sequência de execução segura** onde nenhuma tarefa é iniciada antes que todos os seus pré-requisitos tenham sido completamente compilados e instalados.
- Se o algoritmo falhar em ordenar todos os nós, significa que foi detectada uma **Dependência Circular** fatal.

### Dual Coding Visual
| Elemento de Sistema | Modelagem em DAG |
|---|---|
| **Biblioteca / Módulo** | Vértice $V$ |
| **\`import\` / Pré-requisito** | Aresta Direcionada $u \\to v$ |
| **Ordem de Build** | Ordem Topológica linearizada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Sistemas de CI/CD modernos constroem seus grafos de execução com base em ordenação topológica para maximizar o paralelismo de nós com \`in-degree == 0\`.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/topological-sort/DSA-PATT-TOPO-003.md', `---
id: DSA-PATT-TOPO-003
title: "Impossibilidade de Ordenação Topológica na Presença de Ciclos"
tags:
  - level::l3-junior
  - topic::dsa::topological-sort
  - company::meta
  - freq::high
---

## Pergunta
Por que a presença de um ciclo em um grafo direcionado quebra matematicamente qualquer tentativa de ordenação linear?

## Resposta
### Quick Answer
**Solução Direta**:
- Seja um ciclo simples $v_1 \\to v_2 \\to \\dots \\to v_k \\to v_1$.
- Pela definição de ordenação topológica, deveríamos ter:
  $$\\text{pos}(v_1) < \\text{pos}(v_2) < \\dots < \\text{pos}(v_k) < \\text{pos}(v_1)$$
- Isso imporia $\\text{pos}(v_1) < \\text{pos}(v_1)$, o que é uma contradição lógica estrita.
- Portanto, qualquer algoritmo de ordenação topológica atua simultaneamente como um **detector de ciclos direcionados**.

### Dual Coding Visual
| Estrutura de Dependência | Relação de Posição | Status de Validade |
|---|---|---|
| **Caminho Linear $A \\to B \\to C$** | $\\text{pos}(A) < \\text{pos}(B) < \\text{pos}(C)$ | Válido |
| **Ciclo $A \\to B \\to C \\to A$** | $\\text{pos}(A) < \\dots < \\text{pos}(A)$ | Impossível (Contradição) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de código, o tratamento do caso em que o grafo contém ciclos (retornando array vazio \`[]\`) é o teste de borda mais comum em problemas como *Course Schedule*.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/topological-sort/DSA-PATT-TOPO-001.md', `---
id: DSA-PATT-TOPO-001
title: "Algoritmo de Kahn (BFS Baseado em In-Degree) para Ordenação Topológica em O(V+E)"
tags:
  - level::l4-pleno
  - topic::dsa::topological-sort
  - company::google
  - freq::high
---

## Pergunta
Como o **Algoritmo de Kahn (BFS In-Degree)** calcula a ordenação topológica e detecta ciclos em tempo $O(V + E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. Calcula o **Grau de Entrada (\`in-degree\`)** de cada vértice (número de arestas que chegam nele).
- 2. Enfileira todos os vértices com \`in-degree == 0\` (tarefas sem nenhum pré-requisito pendente).
- 3. Enquanto a fila não estiver vazia:
  - Desenfileira $u$, adiciona $u$ à ordem topológica.
  - Para cada vizinho $v$ de $u$: decrementa \`in-degree[v]--\`. Se \`in-degree[v] == 0\`, enfileira $v$.
- **Detecção de Ciclo**: Se o número de elementos processados for menor que $|V|$, **existe ciclo** no grafo.
- **Complexidade**: $O(V + E)$ tempo e $O(V + E)$ espaço.

### Dual Coding Visual
| Grau de Entrada (\`in-degree\`) | Significado de Negócio | Ação no Algoritmo |
|---|---|---|
| \`in-degree == 0\` | Pré-requisitos 100% satisfeitos | Enfileira para execução |
| \`in-degree > 0\` | Aguarda dependências | Bloqueado até zerar |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Algoritmo de Kahn
\`\`\`java
import java.util.*;

public class KahnTopoSort {
  public int[] findOrder(int numCourses, int[][] prerequisites) {
    int[] inDegree = new int[numCourses];
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());

    for (int[] pre : prerequisites) {
      adj.get(pre[1]).add(pre[0]);
      inDegree[pre[0]]++;
    }

    Queue<Integer> queue = new ArrayDeque<>();
    for (int i = 0; i < numCourses; i++) {
      if (inDegree[i] == 0) queue.offer(i);
    }

    int[] order = new int[numCourses];
    int index = 0;

    while (!queue.isEmpty()) {
      int curr = queue.poll();
      order[index++] = curr;
      for (int neighbor : adj.get(curr)) {
        inDegree[neighbor]--;
        if (inDegree[neighbor] == 0) queue.offer(neighbor);
      }
    }

    return index == numCourses ? order : new int[0]; // Se index < V -> Tem ciclo!
  }
}
\`\`\`

#### Key Takeaways
- O Algoritmo de Kahn é intuitivo, iterativo e elimina preocupações com estouro de recursão de pilha.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/topological-sort/DSA-PATT-TOPO-004.md', `---
id: DSA-PATT-TOPO-004
title: "Ordenação Topológica via DFS com Pós-Ordem Reversa e Detecção de Back-Edges"
tags:
  - level::l4-pleno
  - topic::dsa::topological-sort
  - company::meta
  - freq::high
---

## Pergunta
Como a **DFS com Pós-Ordem Reversa (Post-Order)** gera uma ordenação topológica válida e detecta ciclos direcionados em $O(V + E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Executa DFS com coloração de 3 estados (0: White, 1: Gray, 2: Black):
  - Ao iniciar visita ao nó $u$: marca como \`Gray\`.
  - Para cada vizinho $v$: se $v$ for \`Gray\`, aborta (detectou ciclo / Back-Edge). Se for \`White\`, visita recursivamente.
  - Ao terminar de processar todos os descendentes de $u$: marca $u$ como \`Black\` e empilha $u$ em uma Pilha (ou insere no início de uma lista).
- Como um nó só é empilhado após todas as suas dependências terem sido concluídas, desempilhar todos os nós produz a **ordem topológica exata**.

### Dual Coding Visual
| Passo da DFS | Estado do Nó | Inserção na Ordem |
|---|---|---|
| **Entrada no nó** | Marcado como \`Gray\` (Ativo) | Nenhuma |
| **Retorno da recursão** | Marcado como \`Black\` (Pronto) | Empilhado (Pós-ordem reversa) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A pós-ordem reversa de uma DFS em um DAG é matematicamente equivalente à ordenação topológica.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/topological-sort/DSA-PATT-TOPO-005.md', `---
id: DSA-PATT-TOPO-005
title: "Modelagem Canônica de Course Schedule I & II com Kahn e DFS"
tags:
  - level::l4-pleno
  - topic::dsa::topological-sort
  - company::amazon
  - freq::high
---

## Pergunta
Como modelar as relações de dependência dos problemas **Course Schedule I (LeetCode 207)** e **Course Schedule II (LeetCode 210)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Course Schedule I**: Pergunta se é possível concluir todos os cursos. Resposta: \`kahn(graph).count == numCourses\` (detecta se o grafo é acíclico).
- **Course Schedule II**: Pede a ordem exata de realização dos cursos. Resposta: retorna o array \`order[]\` preenchido pelo Algoritmo de Kahn (ou \`[]\` se houver ciclo).
- Em ambos, a aresta de dependência $[u, v]$ onde $v$ é pré-requisito de $u$ deve ser modelada como aresta $v \\to u$, garantindo que \`in-degree[u]++\` represente a quantidade de pré-requisitos pendentes.

### Dual Coding Visual
| Problema LeetCode | Pergunta Respondida | Retorno Esperado |
|---|---|---|
| **Course Schedule I** | É possível formar? (Sem ciclo) | \`boolean\` (\`true\` / \`false\`) |
| **Course Schedule II** | Qual a ordem de execução? | \`int[]\` com a sequência válida |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A correta orientação das arestas ($v \\to u$) é a armadilha mais comum que inverte o grafo e quebra a solução.

</details>
`);

// 17. shortest-path-algorithms
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/shortest-path-algorithms/DSA-PATT-SPATH-000.md', `---
id: DSA-PATT-SPATH-000
title: "Por que BFS Falha com Arestas Ponderadas e a Intuição de Dijkstra"
tags:
  - level::l3-junior
  - topic::dsa::shortest-path-algorithms
  - company::google
  - freq::high
---

## Pergunta
Por que a BFS tradicional falha em encontrar o caminho mais curto em grafos com **arestas de pesos diferentes** e como Dijkstra resolve essa limitação?

## Resposta
### Quick Answer
**Solução Direta**:
- A BFS assume que cada aresta tem peso unitário uniforme ($1$), medindo distância apenas por contagem de passos.
- Em grafos ponderados, um caminho com **mais arestas** pode ter **custo total menor** que um caminho direto com uma única aresta pesada (ex: $A \\to B \\to C$ com custo $1 + 1 = 2$ vs $A \\to C$ com custo $10$).
- **Dijkstra** substitui a Fila FIFO por uma **Fila de Prioridade (Min-Heap)**, expandindo sempre o nó com a **menor distância acumulada acumulada até o momento**, garantindo a corretude com custos desiguais não-negativos.

### Dual Coding Visual
| Algoritmo | Fila e Métrica de Expansão | Aplicabilidade |
|---|---|---|
| **BFS** | Fila FIFO / Contagem de saltos ($w=1$) | Apenas pesos unitários |
| **Dijkstra** | Min-Heap / Custo acumulado $\\sum w$ | Pesos não-negativos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Dijkstra é essencialmente uma BFS orientada a menor custo acumulado em vez de menor contagem de saltos.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/shortest-path-algorithms/DSA-PATT-SPATH-002.md', `---
id: DSA-PATT-SPATH-002
title: "Intuição do Algoritmo de Dijkstra com Min-Heap e Relaxamento Guloso"
tags:
  - level::l3-junior
  - topic::dsa::shortest-path-algorithms
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Algoritmo de Dijkstra** utiliza o Min-Heap e a técnica de **Relaxamento de Arestas** para calcular distâncias mínimas em $O((V + E) \\log V)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantém um array \`dist[]\` inicializado com $\\infty$ (com \`dist[src] = 0\`) e um Min-Heap de pares $(d, u)$.
- A cada passo:
  1. Extrai o nó $u$ com menor distância provisória da raiz do Min-Heap.
  2. Se $d > \\text{dist}[u]$, descarta (entrada obsoleta no heap).
  3. **Relaxamento de Aresta**: Para cada vizinho $v$ com aresta $(u, v, w)$:
     $$\\text{Se } \\text{dist}[u] + w < \\text{dist}[v] \\implies \\text{dist}[v] = \\text{dist}[u] + w \\quad (\\text{insere } (\\text{dist}[v], v) \\text{ no Min-Heap})$$
- Encerra quando o heap esvaziar, com \`dist[]\` contendo o menor caminho de \`src\` para todos os vértices.

### Dual Coding Visual
| Operação de Dijkstra | Ação | Complexidade |
|---|---|---|
| **Extração do Mínimo** | \`minHeap.poll()\` ($V$ vezes) | $O(V \\log V)$ |
| **Relaxamento de Aresta** | \`minHeap.offer()\` ($E$ vezes) | $O(E \\log V)$ |
| **Total Combinado** | $O((V + E) \\log V)$ | Ótimo para grafos esparsos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Dijkstra Canônico
\`\`\`java
import java.util.*;

public class Dijkstra {
  public static int[] dijkstra(int n, List<List<int[]>> adj, int src) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;

    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
    pq.offer(new int[]{0, src}); // {distância, nó}

    while (!pq.isEmpty()) {
      int[] curr = pq.poll();
      int d = curr[0], u = curr[1];
      if (d > dist[u]) continue; // Descarta entrada obsoleta

      for (int[] edge : adj.get(u)) {
        int v = edge[0], weight = edge[1];
        if (dist[u] + weight < dist[v]) {
          dist[v] = dist[u] + weight;
          pq.offer(new int[]{dist[v], v});
        }
      }
    }
    return dist;
  }
}
\`\`\`

#### Key Takeaways
- O descarte \`if (d > dist[u]) continue\` é a otimização fundamental que evita lentidão por múltiplas entradas do mesmo nó no Min-Heap.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/shortest-path-algorithms/DSA-PATT-SPATH-003.md', `---
id: DSA-PATT-SPATH-003
title: "Por que o Algoritmo de Dijkstra Falha na Presença de Arestas de Peso Negativo"
tags:
  - level::l3-junior
  - topic::dsa::shortest-path-algorithms
  - company::meta
  - freq::high
---

## Pergunta
Por que a estratégia gulosa de Dijkstra falha em encontrar o caminho correto quando o grafo possui **arestas de peso negativo**?

## Resposta
### Quick Answer
**Solução Direta**:
- A premissa matemática gulosa de Dijkstra é que, ao extrair um nó $u$ do Min-Heap, **sua menor distância final já foi irrevogavelmente determinada**, pois qualquer caminho alternativo futuro somaria pesos positivos e seria estritamente mais longo.
- **A Falha com Pesos Negativos**: Uma aresta de peso negativo subsequente (ex: $-10$) pode reduzir a distância de um nó após ele já ter sido marcado como finalizado, violando a invariante de Dijkstra e produzindo distâncias incorretas (ou loop infinito em ciclos negativos).
- Para grafos com pesos negativos, deve-se utilizar o **Algoritmo de Bellman-Ford** ($O(V \\cdot E)$).

### Dual Coding Visual
| Algoritmo | Suporte a Pesos Negativos | Complexidade de Tempo |
|---|---|---|
| **Dijkstra** | Não (produz resultado errado) | $O((V + E) \\log V)$ |
| **Bellman-Ford** | Sim (suporta e detecta ciclos) | $O(V \\cdot E)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas FAANG, sempre verifique se os pesos das arestas podem ser negativos antes de escolher Dijkstra.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/shortest-path-algorithms/DSA-PATT-SPATH-001.md', `---
id: DSA-PATT-SPATH-001
title: "Matriz Comparativa de Caminhos Mínimos: Dijkstra vs Bellman-Ford vs Floyd vs A*"
tags:
  - level::l4-pleno
  - topic::dsa::shortest-path-algorithms
  - company::google
  - freq::high
---

## Pergunta
Qual é a matriz de trade-offs entre **Dijkstra**, **Bellman-Ford**, **Floyd-Warshall** e **A\* Search** para problemas de caminho mínimo?

## Resposta
### Quick Answer
**Solução Direta**:
- **Dijkstra ($O((V+E)\\log V)$)**: Único ponto de origem (*Single-Source*) em grafos com pesos não-negativos. Mais rápido na prática.
- **Bellman-Ford ($O(V \\cdot E)$)**: Suporta pesos negativos e detecta **Ciclos de Peso Negativo**.
- **Floyd-Warshall ($O(V^3)$)**: Todos os pares para todos os pares (*All-Pairs*) com Programação Dinâmica sobre matrizes.
- **A\* Search ($O(E)$ com boa heurística)**: Utiliza função heurística $f(n) = g(n) + h(n)$ para direcionar a busca em direção ao alvo em mapas espaciais (GPS e IA de jogos).

### Dual Coding Visual
| Algoritmo | Complexidade e Tipo | Suporta Pesos Negativos |
|---|---|---|
| **Dijkstra** | $O((V+E)\log V)$ (Single-Source) | Não |
| **Bellman-Ford** | $O(V \cdot E)$ (Single-Source) | Sim (com detecção) |
| **Floyd-Warshall** | $O(V^3)$ (All-Pairs DP) | Sim (sem ciclos neg) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Escolher o algoritmo certo depende da quantidade de origens (1 vs todas) e das restrições de peso do grafo.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/shortest-path-algorithms/DSA-PATT-SPATH-004.md', `---
id: DSA-PATT-SPATH-004
title: "Algoritmo de Bellman-Ford e Detecção de Ciclos Negativos em O(V·E)"
tags:
  - level::l4-pleno
  - topic::dsa::shortest-path-algorithms
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Algoritmo de Bellman-Ford** relaxa todas as arestas $V-1$ vezes e detecta ciclos negativos em tempo $O(V \\cdot E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O caminho mais curto simples em um grafo de $V$ vértices contém no máximo $V - 1$ arestas.
- **Algoritmo**:
  1. Executa $V - 1$ rodadas de relaxamento sobre **todas as $E$ arestas** do grafo: para cada $(u, v, w)$, se $\\text{dist}[u] + w < \\text{dist}[v]$, faz $\\text{dist}[v] = \\text{dist}[u] + w$.
  2. **Detecção de Ciclo Negativo**: Executa uma $V$-ésima rodada. Se qualquer aresta ainda puder ser relaxada ($\\text{dist}[u] + w < \\text{dist}[v]$), significa que existe um **Ciclo de Peso Negativo** alcançável a partir da origem.
- **Complexidade**: $O(V \\cdot E)$ tempo e $O(V)$ espaço.

### Dual Coding Visual
| Rodada de Bellman-Ford | Propósito | Diagnóstico |
|---|---|---|
| **Rodadas $1$ a $V-1$** | Propaga distâncias mínimas | Convergência de caminhos simples |
| **Rodada $V$ (Extra)** | Verifica se ainda reduz distância | Se reduzir $\\implies$ Ciclo Negativo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É utilizado em protocolos de roteamento de redes como RIP (Routing Information Protocol) baseado em Distance-Vector.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/shortest-path-algorithms/DSA-PATT-SPATH-005.md', `---
id: DSA-PATT-SPATH-005
title: "Algoritmo de Floyd-Warshall para All-Pairs Shortest Path com DP em O(V³)"
tags:
  - level::l4-pleno
  - topic::dsa::shortest-path-algorithms
  - company::microsoft
  - freq::high
---

## Pergunta
Como o **Algoritmo de Floyd-Warshall** computa o caminho mais curto entre todos os pares de vértices via Programação Dinâmica em tempo $O(V^3)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantém uma matriz $\\text{dist}[i][j]$ inicializada com o peso direto das arestas (e $0$ na diagonal principal).
- Itera sobre todos os vértices intermediários possíveis $k$ de $0$ a $V-1$:
  - Para cada par $(i, j)$, testa se passar por $k$ reduz o custo:
    $$\\text{dist}[i][j] = \\min(\\text{dist}[i][j], \\ \\text{dist}[i][k] + \\text{dist}[k][j])$$
- **Estrutura**: Três loops aninhados simples (\`for k, for i, for j\`).
- **Complexidade**: $O(V^3)$ tempo e $O(V^2)$ espaço em matriz contígua.

### Dual Coding Visual
| Algoritmo All-Pairs | Estrutura de Código | Complexidade |
|---|---|---|
| **$V \\times$ Dijkstra** | $V$ chamadas de Min-Heap | $O(V \\cdot E \\log V)$ |
| **Floyd-Warshall** | 3 loops simples sobre matriz | $O(V^3)$ (código em 5 linhas) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Floyd-Warshall
\`\`\`java
public class FloydWarshall {
  public void floydWarshall(int[][] dist, int V) {
    for (int k = 0; k < V; k++) {
      for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
          if (dist[i][k] != Integer.MAX_VALUE && dist[k][j] != Integer.MAX_VALUE) {
            dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
          }
        }
      }
    }
  }
}
\`\`\`

#### Key Takeaways
- O loop mais externo **deve ser obrigatoriamente o vértice intermediário $k$** para que a propriedade de subestrutura ótima da DP seja respeitada.

</details>
`);

// 18. minimum-spanning-tree
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/minimum-spanning-tree/DSA-PATT-MST-000.md', `---
id: DSA-PATT-MST-000
title: "Conceito de Árvore Geradora Mínima (MST) e a Propriedade do Corte (Cut Property)"
tags:
  - level::l3-junior
  - topic::dsa::minimum-spanning-tree
  - company::meta
  - freq::high
---

## Pergunta
O que é uma **Árvore Geradora Mínima (MST)** e qual a intuição da **Propriedade do Corte (Cut Property)**?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **MST** é um subconjunto de $V - 1$ arestas de um grafo conexo e não-direcionado que conecta todos os $V$ vértices com o **menor custo total de pesos possível**, sem formar ciclos.
- **Propriedade do Corte (Cut Property)**: Se dividirmos os vértices do grafo em dois conjuntos disjuntos $S$ e $V \\setminus S$ (um corte), a **aresta de menor peso que atravessa esse corte pertence garantidamente à Árvore Geradora Mínima**.
- Essa propriedade matemática é o fundamento da corretude dos algoritmos gulosos de Kruskal e Prim.

### Dual Coding Visual
| Propriedade de MST | Requisito Estrutural | Quantidade de Arestas |
|---|---|---|
| **Conexão Total** | Todos os $V$ nós conectados | Exatamente $V - 1$ arestas |
| **Sem Ciclos** | É uma árvore matemática | 0 ciclos |
| **Custo Mínimo** | $\\sum w(e)$ minimizado globalmente | Baseado na Cut Property |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Uma MST conecta todos os vértices gastando o mínimo possível, mas **não garante** o menor caminho entre dois nós individuais (esse é o papel de Dijkstra).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/minimum-spanning-tree/DSA-PATT-MST-002.md', `---
id: DSA-PATT-MST-002
title: "Algoritmo de Kruskal: Abordagem Orientada a Arestas com DSU em O(E log E)"
tags:
  - level::l3-junior
  - topic::dsa::minimum-spanning-tree
  - company::google
  - freq::high
---

## Pergunta
Como o **Algoritmo de Kruskal** constrói a MST ordenando arestas e utilizando DSU em tempo $O(E \\log E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O Algoritmo de Kruskal opera sob perspectiva de arestas globais:
  1. Ordena todas as $E$ arestas em ordem crescente de peso ($O(E \\log E)$).
  2. Inicializa um DSU com $V$ conjuntos disjuntos.
  3. Itera sobre as arestas ordenadas: se os extremos da aresta pertencem a componentes diferentes (\`dsu.union(u, v) == true\`), adiciona a aresta à MST.
  4. Encerra ao acumular $V - 1$ arestas.

### Dual Coding Visual
| Passo de Kruskal | Estrutura Envolvida | Complexidade |
|---|---|---|
| **1. Ordenação Global** | \`Arrays.sort(edges)\` | $O(E \\log E)$ |
| **2. Teste e Fusão** | $E$ chamadas no DSU | $O(E \\cdot \\alpha(V))$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É extremamente simples de implementar e altamente eficiente para grafos esparsos ($E \\approx V$).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/minimum-spanning-tree/DSA-PATT-MST-003.md', `---
id: DSA-PATT-MST-003
title: "Algoritmo de Prim: Abordagem Orientada a Vértices com Min-Heap em O(E log V)"
tags:
  - level::l3-junior
  - topic::dsa::minimum-spanning-tree
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Algoritmo de Prim** expande a MST incrementalmente a partir de um vértice usando um Min-Heap em $O(E \\log V)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O Algoritmo de Prim opera sob perspectiva de expansão de árvore:
  1. Inicia em um vértice arbitrário e marca-o como visitado.
  2. Insere todas as arestas incidentes ao nó em um Min-Heap.
  3. A cada passo:
     - Extrai a aresta mais leve do heap conectando um nó visitado a um nó não-visitado $v$.
     - Adiciona a aresta à MST e marca $v$ como visitado.
     - Insere todas as arestas saindo de $v$ para nós não-visitados no Min-Heap.
  4. Repete até que todos os $V$ nós estejam na MST.

### Dual Coding Visual
| Algoritmo de MST | Estratégia de Construção | Estrutura Auxiliar Principal |
|---|---|---|
| **Kruskal** | Floresta de arestas fundidas | DSU (Union-Find) |
| **Prim** | Árvore única crescendo vértice a vértice | Min-Heap (\`PriorityQueue\`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A dinâmica de Prim é muito similar a Dijkstra, mas com uma diferença crucial: a prioridade no heap é apenas o peso da aresta individual $w(u, v)$, e não a distância acumulada desde a raiz.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/minimum-spanning-tree/DSA-PATT-MST-001.md', `---
id: DSA-PATT-MST-001
title: "Trade-offs de Escolha: Kruskal para Grafos Esparsos vs Prim para Grafos Densos"
tags:
  - level::l4-pleno
  - topic::dsa::minimum-spanning-tree
  - company::microsoft
  - freq::high
---

## Pergunta
Quais os critérios de escolha entre **Kruskal** e **Prim** com base na densidade de arestas do grafo?

## Resposta
### Quick Answer
**Solução Direta**:
- **Grafo Esparso ($E \\ll V^2$, ex: $E = O(V)$)**:
  - **Kruskal** é preferível: $O(E \\log E) = O(E \\log V)$, com constante muito rápida e estruturas simples (DSU + lista de arestas).
- **Grafo Denso ($E \\approx V^2$)**:
  - **Prim com Matriz de Adjacência ($O(V^2)$)** supera Kruskal (que custaria $O(V^2 \\log V^2) = O(V^2 \\log V)$).
- Para problemas geométricos em 2D com $N$ pontos onde todas as $N^2$ conexões existem (*Min Cost to Connect All Points*), Prim com array plano é a solução mais rápida.

### Dual Coding Visual
| Densidade do Grafo | Algoritmo Recomendado | Complexidade Assintótica |
|---|---|---|
| **Esparso ($E \\approx V$)** | Kruskal com DSU | $O(E \\log E)$ |
| **Denso ($E \\approx V^2$)** | Prim com Matriz | $O(V^2)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Prim sem Heap (apenas com array de distâncias mínimas) roda em estritos $O(V^2)$ sem custo de logaritmo em grafos completos.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/minimum-spanning-tree/DSA-PATT-MST-004.md', `---
id: DSA-PATT-MST-004
title: "Modelagem de Redes de Menor Custo com MST (Min Cost to Connect All Points)"
tags:
  - level::l4-pleno
  - topic::dsa::minimum-spanning-tree
  - company::meta
  - freq::high
---

## Pergunta
Como modelar o problema **Min Cost to Connect All Points** (LeetCode 1584) como uma MST sobre distâncias de Manhattan?

## Resposta
### Quick Answer
**Solução Direta**:
- Dados $N$ pontos 2D, o custo de conectar o ponto $i$ ao ponto $j$ é a distância de Manhattan:
  $$w(i, j) = |x_i - x_j| + |y_i - y_j|$$
- Modelamos um grafo completo não-direcionado ponderado com $V = N$ vértices e $E = \\frac{N(N-1)}{2}$ arestas implícitas.
- Aplicando o **Algoritmo de Prim** com um array \`minCost[]\` de tamanho $N$:
  - A cada passo, seleciona o ponto fora da árvore com menor custo de conexão em $O(N)$ e atualiza as distâncias dos demais pontos.
- **Complexidade**: $O(N^2)$ tempo e $O(N)$ espaço auxiliar.

### Dual Coding Visual
| Abordagem no LeetCode 1584 | Complexidade de Tempo | Espaço de Memória |
|---|---|---|
| **Kruskal (Gera todas as arestas)** | $O(N^2 \\log N)$ | $O(N^2)$ para $N^2$ arestas |
| **Prim Otimizado (Array plano)** | $O(N^2)$ | $O(N)$ Mínimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em grafos completos implícitos, Prim com array evita alocar milhões de objetos de aresta no Heap.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/minimum-spanning-tree/DSA-PATT-MST-005.md', `---
id: DSA-PATT-MST-005
title: "Unicidade da Árvore Geradora Mínima quando os Pesos são Distintos"
tags:
  - level::l4-pleno
  - topic::dsa::minimum-spanning-tree
  - company::google
  - freq::high
---

## Pergunta
Por que a unicidade estrita dos pesos de todas as arestas em um grafo garante que a **MST seja matematicamente única**?

## Resposta
### Quick Answer
**Solução Direta**:
- Pela **Propriedade do Corte**, em qualquer corte que divide o grafo em dois grupos, a aresta de menor peso que atravessa o corte deve obrigatoriamente pertencer a qualquer MST.
- Se todos os pesos das arestas forem distintos:
  - Em cada corte, existe uma **única aresta de peso estritamente mínimo** que o atravessa.
  - Não há empates e, portanto, não há escolhas arbitrárias entre arestas equivalentes.
  - Kruskal e Prim farão exatamente as mesmas escolhas unívocas, resultando em uma **MST única**.

### Dual Coding Visual
| Pesos das Arestas no Grafo | Quantidade de MSTs Possíveis |
|---|---|
| **Todos os pesos distintos** | Garantidamente **1 única MST** |
| **Arestas com pesos repetidos** | Podem existir múltiplas MSTs de mesmo custo total |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É um teorema clássico de teoria dos grafos cobrado frequentemente em perguntas conceituais de entrevistas sênior.

</details>
`);

console.log('✅ topo-sort, shortest-paths and mst decomposed.');
