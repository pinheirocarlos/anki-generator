import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Module 1: Stacks, Queues, Hash Tables, Trees & Tries...');

// 3. stacks-queues
writeAndValidateCard('decks/01-dsa/data-structures/stacks-queues/DSA-STRUCT-STACK-000.md', `---
id: DSA-STRUCT-STACK-000
title: "Diferença Fundamental entre LIFO (Pilha) e FIFO (Fila)"
tags:
  - level::l3-junior
  - topic::dsa::stacks-queues
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre o princípio de acesso **LIFO (Pilha)** e **FIFO (Fila)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Pilha / Stack (LIFO - Last In, First Out)**: O último elemento inserido (\`push\`) é o primeiro a ser removido (\`pop\`). Operações ocorrem exclusivamente no topo.
- **Fila / Queue (FIFO - First In, First Out)**: O primeiro elemento inserido no fim (\`enqueue\`) é o primeiro a ser removido no início (\`dequeue\`).
- Ambas as estruturas realizam suas operações primárias de inserção, remoção e consulta em tempo estritamente constante $O(1)$.

### Dual Coding Visual
| Estrutura | Disciplina de Acesso | Ponto de Inserção / Remoção |
|---|---|---|
| **Pilha (Stack)** | LIFO (Último a entrar sai primeiro) | Topo / Topo |
| **Fila (Queue)** | FIFO (Primeiro a entrar sai primeiro) | Fim / Início |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Metáforas do Mundo Real
- **Pilha**: Uma pilha de pratos na cozinha. O último prato lavado é colocado em cima e será o primeiro a ser retirado.
- **Fila**: Uma fila de caixa de supermercado. O primeiro cliente a chegar é o primeiro a ser atendido.

#### Key Takeaways
- Ambas as estruturas impõem restrições intencionais de acesso (sem busca por índice arbitrário) para garantir invariantes de ordem e custo $O(1)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/stacks-queues/DSA-STRUCT-STACK-002.md', `---
id: DSA-STRUCT-STACK-002
title: "Operações e Estrutura de Deques (Double-Ended Queues)"
tags:
  - level::l3-junior
  - topic::dsa::stacks-queues
  - company::google
  - freq::high
---

## Pergunta
Como funciona um **Deque (Double-Ended Queue)** e quais operações ele suporta em tempo $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Um **Deque** é uma fila de extremidade dupla que generaliza pilhas e filas.
- Permite inserção e remoção em tempo $O(1)$ em ambas as extremidades:
  - \`pushFirst\` / \`popFirst\`: Inserção e remoção no início.
  - \`pushLast\` / \`popLast\`: Inserção e remoção no fim.
- Pode ser implementado de forma eficiente via lista duplamente encadeada ou vetor circular dinâmico (\`ArrayDeque\`).

### Dual Coding Visual
| Operação | Início (\`First\`) | Fim (\`Last\`) |
|---|---|---|
| **Inserção (\`push\`)** | $O(1)$ | $O(1)$ |
| **Remoção (\`pop\`)** | $O(1)$ | $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: \`ArrayDeque\`
\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class DequeExample {
  public static void main(String[] args) {
    Deque<Integer> deque = new ArrayDeque<>();
    deque.addFirst(10); // Início
    deque.addLast(20);  // Fim

    int first = deque.removeFirst(); // 10
    int last = deque.removeLast();   // 20
  }
}
\`\`\`

#### Key Takeaways
- Em Java, \`ArrayDeque\` é consideravelmente mais rápido e consome menos memória do que a classe legada \`java.util.Stack\` (que possui overhead de sincronização com \`Vector\`).

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/stacks-queues/DSA-STRUCT-STACK-003.md', `---
id: DSA-STRUCT-STACK-003
title: "Cenários de Aplicação Real: Pilhas (Call Stack) vs Filas (Job Buffers)"
tags:
  - level::l3-junior
  - topic::dsa::stacks-queues
  - company::apple
  - freq::high
---

## Pergunta
Em quais cenários reais de engenharia de software cada estrutura (Pilha vs Fila) é tipicamente aplicada?

## Resposta
### Quick Answer
**Solução Direta**:
- **Aplicações de Pilha (LIFO)**:
  - Call stack de execução de funções e recursão de programas.
  - Avaliação de expressões e parsing sintático (validação de parênteses).
  - Mecanismos de Desfazer/Refazer (\`Undo/Redo\`) e navegação no histórico de páginas do navegador (*Back button*).
- **Aplicações de Fila (FIFO)**:
  - Filas de processamento de tarefas em segundo plano (RabbitMQ, SQS, Celery).
  - Algoritmos de busca em largura (BFS) em grafos e árvores.
  - Buffers de I/O de streaming de vídeo e áudio.

### Dual Coding Visual
| Estrutura | Caso de Uso Canônico | Algoritmo Associado |
|---|---|---|
| **Pilha (Stack)** | Recursão / Parsing | DFS (Depth-First Search) |
| **Fila (Queue)** | Processamento de Mensagens | BFS (Breadth-First Search) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A escolha entre Pilha e Fila define diretamente a estratégia de exploração espacial de um algoritmo: profundidade (DFS com Pilha) vs largura por camadas (BFS com Fila).

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/stacks-queues/DSA-STRUCT-STACK-001.md', `---
id: DSA-STRUCT-STACK-001
title: "Implementação de MinStack com Consulta O(1) de Mínimo"
tags:
  - level::l4-pleno
  - topic::dsa::stacks-queues
  - company::bloomberg
  - freq::high
---

## Pergunta
Como manter a consulta do elemento mínimo (\`getMin\`) em **tempo constante $O(1)$** em uma \`MinStack\`?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos duas pilhas paralelas sincronizadas:
  1. \`mainStack\`: Armazena todos os elementos inseridos.
  2. \`minStack\`: Armazena o menor valor histórico visível até o nível atual.
- Ao executar \`push(x)\`:
  - Inserimos \`x\` na \`mainStack\`.
  - Inserimos $\\min(x, \\text{minStack.peek()})$ na \`minStack\`.
- Ao executar \`pop()\`: desempilhamos ambas simultaneamente.
- \`getMin()\` retorna \`minStack.peek()\` instantaneamente em $O(1)$.

### Dual Coding Visual
| Operação | Pilhas (\`main\` / \`min\`) | \`getMin()\` |
|---|---|---|
| \`push(5)\` | \`[5]\` / \`[5]\` | \`5\` |
| \`push(3)\` | \`[5, 3]\` / \`[5, 3]\` | \`3\` |
| \`push(7)\` | \`[5, 3, 7]\` / \`[5, 3, 3]\` | \`3\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: \`MinStack\`
\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class MinStack {
  private final Deque<Integer> stack = new ArrayDeque<>();
  private final Deque<Integer> minStack = new ArrayDeque<>();

  public void push(int val) {
    stack.push(val);
    int currentMin = minStack.isEmpty() ? val : Math.min(val, minStack.peek());
    minStack.push(currentMin);
  }

  public void pop() {
    stack.pop();
    minStack.pop();
  }

  public int top() {
    return stack.peek();
  }

  public int getMin() {
    return minStack.peek();
  }
}
\`\`\`

#### Key Takeaways
- A técnica gasta $O(N)$ de memória auxiliar para garantir que \`getMin\` execute em $O(1)$ sem necessidade de varrer a pilha.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/stacks-queues/DSA-STRUCT-STACK-004.md', `---
id: DSA-STRUCT-STACK-004
title: "Implementação de Fila FIFO com Duas Pilhas LIFO em Custo O(1) Amortizado"
tags:
  - level::l4-pleno
  - topic::dsa::stacks-queues
  - company::microsoft
  - freq::high
---

## Pergunta
Como implementar uma **Fila FIFO utilizando duas Pilhas LIFO** garantindo custo $O(1)$ amortizado por operação?

## Resposta
### Quick Answer
**Solução Direta**:
- Utilizamos duas pilhas: \`inStack\` (para inserções) e \`outStack\` (para remoções).
- \`push(x)\`: Sempre insere no topo de \`inStack\` ($O(1)$).
- \`pop()\` / \`peek()\`:
  - Se \`outStack\` estiver vazia, desempilhamos todos os elementos de \`inStack\` e empilhamos em \`outStack\` (essa transferência inverte a ordem de LIFO para FIFO).
  - Desempilhamos o topo de \`outStack\`.
- Cada elemento é transferido de \`inStack\` para \`outStack\` exatamente uma vez ao longo de seu ciclo de vida, conferindo **custo amortizado $O(1)$**.

### Dual Coding Visual
| Operação | Mecânica das Pilhas | Custo Amortizado |
|---|---|---|
| \`push(x)\` | Insere em \`inStack\` | $O(1)$ |
| \`pop()\` | Transfere para \`outStack\` se vazia | $O(1)$ Amortizado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Prova de Custo Amortizado
- Para $N$ inserções e $N$ remoções, cada elemento sofre no máximo 2 operações de \`push\` e 2 operações de \`pop\` no total.
- Custo total para $2N$ operações = $4N$ passos.
- Custo médio por operação = $\\frac{4N}{2N} = O(1)$.

#### Key Takeaways
- É um clássico de entrevistas técnicas para testar a compreensão de análise amortizada de algoritmos.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/stacks-queues/DSA-STRUCT-STACK-005.md', `---
id: DSA-STRUCT-STACK-005
title: "Padrão Monotonic Stack para Resolução de Next Greater Element em O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::stacks-queues
  - company::meta
  - freq::high
---

## Pergunta
Como o padrão **Monotonic Stack** resolve o problema clássico de *Next Greater Element* em tempo linear $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos uma pilha com elementos estritamente monótonos (ex: monótona decrescente com índices).
- Ao iterar sobre o array no índice $i$:
  - Enquanto o elemento atual \`arr[i]\` for maior que o topo da pilha \`arr[stack.peek()]\`, significa que \`arr[i]\` é o **Next Greater Element** daquele índice desempilhado: preenchemos \`result[stack.pop()] = arr[i]\`.
  - Empilhamos o índice $i$.
- Como cada índice entra e sai da pilha no máximo uma vez, a complexidade total é $O(N)$ linear contra $O(N^2)$ da busca quadrática.

### Dual Coding Visual
| Abordagem | Tempo de Execução | Espaço Auxiliar |
|---|---|---|
| **Busca Dupla Força Bruta** | $O(N^2)$ Quadrático | $O(1)$ |
| **Monotonic Stack** | $O(N)$ Linear | $O(N)$ Pilha de Índices |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Next Greater Element
\`\`\`java
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;

public class NextGreaterElement {
  public static int[] nextGreaterElements(int[] nums) {
    int[] res = new int[nums.length];
    Arrays.fill(res, -1);
    Deque<Integer> stack = new ArrayDeque<>(); // Guarda índices

    for (int i = 0; i < nums.length; i++) {
      while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
        res[stack.pop()] = nums[i];
      }
      stack.push(i);
    }
    return res;
  }
}
\`\`\`

#### Key Takeaways
- O Monotonic Stack é a ferramenta chave para resolver problemas como *Daily Temperatures*, *Largest Rectangle in Histogram* e *Trapping Rain Water*.

</details>
`);

// 4. hash-tables
writeAndValidateCard('decks/01-dsa/data-structures/hash-tables/DSA-STRUCT-HASH-000.md', `---
id: DSA-STRUCT-HASH-000
title: "Funcionamento Interno de Tabelas Hash e Papel da Função de Hash"
tags:
  - level::l3-junior
  - topic::dsa::hash-tables
  - company::google
  - freq::high
---

## Pergunta
Como funciona internamente uma **Tabela Hash (Hash Map)** e qual o papel desempenhado pela **Função de Hash**?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma Tabela Hash mantém um array interno de *buckets* indexados de $0$ a $M-1$.
- A **Função de Hash** mapeia uma chave arbitrária (ex: \`"user_123"\`) para um número inteiro pseudo-aleatório e determinístico:
  $$\\text{índice} = \\text{hash}(\\text{chave}) \\pmod M$$
- Esse cálculo direto permite localizar, inserir e remover pares chave-valor em tempo médio $O(1)$.

### Dual Coding Visual
| Componente | Função Principal | Complexidade Média |
|---|---|---|
| **Função de Hash** | Mapeia chave para inteiro uniforme | $O(L)$ (tam da chave) |
| **Array de Buckets** | Acesso indexado ao endereço físico | $O(1)$ Instantâneo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Propriedades de uma Boa Função de Hash
1. **Determinismo**: A mesma chave sempre produz exatamente o mesmo valor de hash.
2. **Distribuição Uniforme**: Espalha as chaves homogeneamente por todos os buckets para minimizar colisões.
3. **Eficiência**: Executa rapidamente em poucas instruções de CPU.

#### Key Takeaways
- Sem uma boa função de hash, chaves se concentram no mesmo bucket, degradando o tempo de busca de $O(1)$ para $O(N)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/hash-tables/DSA-STRUCT-HASH-002.md', `---
id: DSA-STRUCT-HASH-002
title: "Fator de Carga (Load Factor) e Processo de Rehashing em Tabelas Hash"
tags:
  - level::l3-junior
  - topic::dsa::hash-tables
  - company::amazon
  - freq::high
---

## Pergunta
O que é o **Fator de Carga (Load Factor)** em uma tabela hash e quando o processo de **Rehashing** é disparado?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Fator de Carga ($\\alpha$)** mede o nível de ocupação da tabela:
  $$\\alpha = \\frac{N}{M} = \\frac{\\text{número de elementos}}{\\text{capacidade de buckets}}$$
- Quando $\\alpha$ ultrapassa um limiar pré-definido (normalmente $0.75$ em Java \`HashMap\`):
  1. A capacidade do array de buckets é duplicada ($M \\to 2M$).
  2. Um processo de **Rehashing** recalcula o novo índice de cada elemento existente: $\\text{hash}(k) \\pmod{2M}$.
- O custo do rehashing é $O(N)$, mas ocorre raramente, mantendo o custo médio por inserção em $O(1)$ amortizado.

### Dual Coding Visual
| Fator de Carga ($\\alpha$) | Risco de Colisão | Ocupação de Memória |
|---|---|---|
| **$\\alpha < 0.5$** | Muito baixo (rápido) | Desperdício de memória |
| **$\\alpha = 0.75$ (Ideal)** | Balanceamento ótimo | Trade-off equilibrado |
| **$\\alpha > 1.0$** | Altíssimo (degradação) | Array superlotado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Pré-dimensionar a capacidade inicial do mapa ao conhecer o volume de dados (\`new HashMap<>(expectedSize / 0.75f)\`) elimina rehashings custosos durante a execução.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/hash-tables/DSA-STRUCT-HASH-003.md', `---
id: DSA-STRUCT-HASH-003
title: "Resolução de Colisões por Encadeamento Separado (Separate Chaining)"
tags:
  - level::l3-junior
  - topic::dsa::hash-tables
  - company::microsoft
  - freq::high
---

## Pergunta
Como funciona a resolução de colisões por **Encadeamento Separado (Separate Chaining)** em tabelas hash?

## Resposta
### Quick Answer
**Solução Direta**:
- Em **Separate Chaining**, cada posição do array de buckets armazena uma lista encadeada (ou árvore binária balanceada) contendo todas as entradas que colidiram naquele mesmo índice.
- Ao buscar uma chave:
  1. Calcula-se o índice do bucket via $\\text{hash}(k) \\pmod M$.
  2. Percorre-se a lista daquele bucket comparando as chaves via \`equals()\`.
- **Complexidade**: $O(1)$ em média (com distribuição uniforme); $O(N)$ no pior caso (se todas as chaves colidirem no mesmo bucket).

### Dual Coding Visual
| Estratégia de Colisão | Estrutura no Bucket | Tratamento de Colisão |
|---|---|---|
| **Separate Chaining** | Lista Encadeada / AVL | Insere novo nó na lista do bucket |
| **Open Addressing** | Elemento direto no slot | Procura próximo slot livre |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização no Java 8 (Treeification)
Quando um bucket individual acumula **mais de 8 nós** e a capacidade total é $\\ge 64$, o Java converte a lista encadeada daquele bucket em uma **Red-Black Tree**, melhorando o pior caso de busca de $O(N)$ para $O(\\log N)$ contra ataques de DoS por colisão de hash.

#### Key Takeaways
- Separate Chaining é simples de implementar e degrada graciosamente mesmo quando o fator de carga ultrapassa $1.0$.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/hash-tables/DSA-STRUCT-HASH-001.md', `---
id: DSA-STRUCT-HASH-001
title: "Trade-offs de Cache e Memória: Separate Chaining vs Open Addressing"
tags:
  - level::l4-pleno
  - topic::dsa::hash-tables
  - company::meta
  - freq::high
---

## Pergunta
Quais os trade-offs de desempenho de cache e alocação de memória entre **Separate Chaining** e **Open Addressing** (Linear Probing)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Separate Chaining**: Aloca cada entrada em um nó individual do Heap. Vantagem: suporta $\\alpha > 1.0$ sem travar. Desvantagem: gera múltiplos ponteiros extras e frequentes cache misses.
- **Open Addressing (Linear Probing / Robin Hood)**: Todos os pares residem diretamente em um array contíguo plano. Quando ocorre colisão, procura o próximo slot livre ($i+1, i+2$). Vantagem: excelente localidade de cache CPU (leituras sequenciais). Desvantagem: exige $\\alpha < 0.7$ para evitar *clustering* (agrupamento primário de colisões).

### Dual Coding Visual
| Característica | Separate Chaining | Open Addressing (Linear Probing) |
|---|---|---|
| **Localidade de Cache CPU** | Ruim (saltos no Heap) | Excelente (vetor contíguo) |
| **Overhead de Ponteiros** | Alto (8–16B por nó) | Zero ponteiros de nó |
| **Sensibilidade a $\\alpha$** | Baixa ($\alpha > 1$ ok) | Altíssima (degrada se $\alpha > 0.8$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Robin Hood Hashing
Variante de Open Addressing onde elementos com maior distância de sua posição ideal "roubam" o slot de elementos com menor distância durante a inserção, equalizando a variância de busca e prevenindo picos de latência.

#### Key Takeaways
- Linguagens modernas de alta performance (Rust \`HashMap\`, C++ \`absl::flat_hash_map\`, Go \`map\`) utilizam variantes de Open Addressing contíguo devido à velocidade dos caches L1/L2.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/hash-tables/DSA-STRUCT-HASH-004.md', `---
id: DSA-STRUCT-HASH-004
title: "Arquitetura de Swiss Tables com Vetorização SIMD para Tabelas Hash"
tags:
  - level::l4-pleno
  - topic::dsa::hash-tables
  - company::google
  - freq::high
---

## Pergunta
Como a arquitetura **Swiss Table (Google Abseil Flat Hash Map)** utiliza controle por bytes e instruções SIMD para acelerar buscas?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Swiss Table** separa a tabela em dois arrays contíguos:
  1. **Array de Metadados (Control Bytes)**: Cada slot possui 1 byte (7 bits do hash superior + 1 bit de estado: vazio, cheio ou deletado).
  2. **Array de Slots**: Armazena as chaves e valores reais.
- **Vetorização SIMD**: Carrega 16 bytes de controle em um registrador SSE/AVX de 128-bit e compara 16 buckets simultaneamente em **uma única instrução de CPU**, eliminando comparações caras de chave para buckets vazios.

### Dual Coding Visual
| Técnica de Tabela Hash | Comparação por Passo | Instrução CPU |
|---|---|---|
| **Linear Probing Tradicional** | 1 bucket por vez | Instruções escalares \`CMP\` |
| **Swiss Table (SIMD)** | 16 buckets simultâneos | \`_mm_cmpeq_epi8\` (128-bit) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Vantagens Arquiteturais
- Reduz a quantidade de acessos à memória RAM em até 80%.
- É a implementação padrão da biblioteca padrão do Rust (\`hashbrown\`) e do Google Abseil C++.

#### Key Takeaways
- Swiss Tables representam o estado da arte em estruturas de dados mecânicamente alinhadas com a arquitetura de processadores modernos.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/hash-tables/DSA-STRUCT-HASH-005.md', `---
id: DSA-STRUCT-HASH-005
title: "Design de LRU Cache com Operações Get e Put em Tempo Estritamente O(1)"
tags:
  - level::l4-pleno
  - topic::dsa::hash-tables
  - company::meta
  - freq::high
---

## Pergunta
Como estruturar a implementação completa de um **LRU Cache (Least Recently Used)** com operações \`get\` e \`put\` em tempo estritamente $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos uma composição de duas estruturas:
  1. \`Map<Integer, Node>\`: Localiza o nó da chave instantaneamente em $O(1)$.
  2. \`DoublyLinkedList\` com Sentinelas (\`head\` e \`tail\`): Mantém a ordem temporal.
- **Fluxo de \`get(key)\`**: Se existe no mapa, remove o nó de sua posição atual na lista e reinsere imediatamente após \`head\` (mais recente). Retorna \`node.val\`.
- **Fluxo de \`put(key, value)\`**: Se já existe, atualiza o valor e move para \`head\`. Se for novo e atingir \`capacity\`, remove \`tail.prev\` da lista e apaga sua entrada do mapa; em seguida insere o novo nó em \`head\`.

### Dual Coding Visual
| Operação LRU | Composição (Mapa + Lista) | Complexidade |
|---|---|---|
| **\`get(key)\`** | Busca no Mapa + Move para \`head\` | $O(1)$ |
| **\`put(key, val)\`** | Insere no Mapa + Insere em \`head\` | $O(1)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: LRU Cache
\`\`\`java
import java.util.HashMap;
import java.util.Map;

public class LRUCache {
  private static class Node {
    int key, val;
    Node prev, next;
    Node(int k, int v) { this.key = k; this.val = v; }
  }

  private final int capacity;
  private final Map<Integer, Node> map = new HashMap<>();
  private final Node head = new Node(0, 0);
  private final Node tail = new Node(0, 0);

  public LRUCache(int capacity) {
    this.capacity = capacity;
    head.next = tail;
    tail.prev = head;
  }

  public int get(int key) {
    Node node = map.get(key);
    if (node == null) return -1;
    moveToHead(node);
    return node.val;
  }

  public void put(int key, int value) {
    Node node = map.get(key);
    if (node != null) {
      node.val = value;
      moveToHead(node);
    } else {
      if (map.size() == capacity) {
        Node lru = tail.prev;
        removeNode(lru);
        map.remove(lru.key);
      }
      Node newNode = new Node(key, value);
      map.put(key, newNode);
      addFirst(newNode);
    }
  }

  private void removeNode(Node node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  private void addFirst(Node node) {
    node.next = head.next;
    node.prev = head;
    head.next.prev = node;
    head.next = node;
  }

  private void moveToHead(Node node) {
    removeNode(node);
    addFirst(node);
  }
}
\`\`\`

#### Key Takeaways
- É uma das questões mais frequentes em entrevistas de System Design e Low-Level Design na Meta, Google e Amazon.

</details>
`);

console.log('✅ hash-tables decomposed.');
