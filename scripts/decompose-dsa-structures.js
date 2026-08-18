import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Module 1: Data Structures...');

// 1. arrays-strings
writeAndValidateCard('decks/01-dsa/data-structures/arrays-strings/DSA-STRUCT-ARRAY-000.md', `---
id: DSA-STRUCT-ARRAY-000
title: "Acesso Indexado O(1) e Aritmética de Ponteiros em Vetores Contíguos"
tags:
  - level::l3-junior
  - topic::dsa::arrays-strings
  - company::amazon
  - freq::high
---

## Pergunta
Por que arrays contíguos em memória oferecem **acesso indexado $O(1)$** instantâneo?

## Resposta
### Quick Answer
**Solução Direta**:
- Elementos de um array residem lado a lado em blocos contíguos de memória RAM.
- O endereço de qualquer índice $i$ é calculado instantaneamente via fórmula direta em hardware:
  $$\\text{Endereço}(i) = \\text{EndereçoBase} + (i \\times \\text{TamanhoElemento})$$
- Como a operação envolve apenas uma multiplicação e uma adição de inteiros executadas em tempo constante pela ALU, o acesso a qualquer elemento ocorre em $O(1)$.

### Dual Coding Visual
| Estrutura de Dados | Acesso por Índice | Cálculo de Endereço |
|---|---|---|
| **Array Contíguo** | $O(1)$ Instantâneo | Aritmética direta de ponteiros |
| **Lista Encadeada** | $O(N)$ Sequencial | Travessia de ponteiro a ponteiro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental do Corredor de Hotel
- Um array contíguo é como um corredor de hotel com quartos numerados em sequência perfeita (\`101, 102, 103, 104\`).
- Para visitar o quarto \`104\`, você calcula a distância exata a partir da entrada e caminha diretamente até ele, sem precisar passar abrindo as portas anteriores.

#### Exemplo em Go: Aritmética de Ponteiros
\`\`\`go
package main

import (
  "fmt"
  "unsafe"
)

func main() {
  arr := [4]int32{10, 20, 30, 40}
  basePtr := unsafe.Pointer(&arr[0])
  elementSize := unsafe.Sizeof(arr[0]) // 4 bytes

  // Endereço do índice 2: base + 2 * 4
  idx2Ptr := unsafe.Pointer(uintptr(basePtr) + 2*elementSize)
  val := *(*int32)(idx2Ptr)

  fmt.Printf("Elemento no índice 2 via aritmética: %d\\n", val) // 30
}
\`\`\`

#### Key Takeaways
- O acesso $O(1)$ depende exclusivamente da contiguidade física da memória e do tamanho uniforme de cada elemento.
- Inserções ou deleções no meio do array continuam custando $O(N)$ porque exigem o deslocamento em bloco dos elementos subsequentes.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/arrays-strings/DSA-STRUCT-ARRAY-002.md', `---
id: DSA-STRUCT-ARRAY-002
title: "Mecanismo de Redimensionamento Dinâmico em Vetores (Length vs Capacity)"
tags:
  - level::l3-junior
  - topic::dsa::arrays-strings
  - company::google
  - freq::high
---

## Pergunta
Como funciona o **redimensionamento dinâmico** de vetores (\`ArrayList\` / \`slice\`) quando sua capacidade máxima é atingida?

## Resposta
### Quick Answer
**Solução Direta**:
- Vetores dinâmicos encapsulam um array estático interno mantendo dois atributos essenciais:
  - \`length\` / \`size\`: Quantidade de elementos atualmente ocupados.
  - \`capacity\`: Quantidade total de elementos que o buffer alocado suporta.
- Quando \`length == capacity\` e ocorre um novo append:
  1. Um novo bloco contíguo de memória é alocado com fator de crescimento geométrico ($1.5\\times$ em Java, $2\\times$ em Go).
  2. Todos os elementos antigos são copiados para o novo bloco.
  3. O buffer antigo é liberado pelo Garbage Collector.

### Dual Coding Visual
| Estado do Vetor | Dimensões (Len / Cap) | Ação de Alocação |
|---|---|---|
| **Inicial** | \`len: 3, cap: 4\` | Nenhuma (há espaço livre) |
| **Após 4º item** | \`len: 4, cap: 4\` | Limite do buffer atingido |
| **Após 5º item (Append)** | \`len: 5, cap: 8\` | Novo array $2\\times$ alocado + cópia |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estrutura do Slice Header em Go
Em Go, um \`slice\` é uma struct compacta de 24 bytes (arquitetura 64-bit):

\`\`\`go
package main

import "fmt"

func inspectSliceGrowth() {
  s := make([]int, 0, 2)
  fmt.Printf("Inicial -> len: %d, cap: %d\\n", len(s), cap(s)) // len: 0, cap: 2

  s = append(s, 1, 2)
  fmt.Printf("Cheio   -> len: %d, cap: %d\\n", len(s), cap(s)) // len: 2, cap: 2

  s = append(s, 3) // Dispara realocação geométrica
  fmt.Printf("Crescido-> len: %d, cap: %d\\n", len(s), cap(s)) // len: 3, cap: 4
}
\`\`\`

#### Key Takeaways
- O redimensionamento geométrico é o mecanismo que garante custo constante amortizado $O(1)$ por inserção.
- Se o crescimento fosse aritmético fixo ($+10$ posições a cada estouro), o custo total de $N$ inserções se tornaria $O(N^2)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/arrays-strings/DSA-STRUCT-ARRAY-003.md', `---
id: DSA-STRUCT-ARRAY-003
title: "Localidade Espacial de Cache da CPU em Arrays vs Listas Encadeadas"
tags:
  - level::l3-junior
  - topic::dsa::arrays-strings
  - company::apple
  - freq::high
---

## Pergunta
Como a **localidade espacial de cache da CPU** beneficia arrays contíguos em comparação com listas encadeadas?

## Resposta
### Quick Answer
**Solução Direta**:
- Quando a CPU acessa \`arr[0]\`, o controlador de hardware carrega automaticamente uma **Cache Line inteira (normalmente 64 bytes)** da memória RAM para os caches L1/L2.
- Em arrays contíguos, os elementos vizinhos (\`arr[1]\`, \`arr[2]\`, etc.) já estão pré-carregados na mesma linha de cache, gerando **Cache Hits** com latência de ~1ns.
- Em listas encadeadas, cada nó é alocado individualmente no Heap em posições esparsas de memória, provocando frequentes **Cache Misses** e forçando acessos lentos à RAM (~50–100ns).

### Dual Coding Visual
| Estrutura | Disposição em Memória | Padrão de Cache L1/L2 |
|---|---|---|
| **Array Contíguo** | Bloco contínuo único | Cache Hits sequenciais (~1ns) |
| **Lista Encadeada** | Nós fragmentados no Heap | Cache Misses frequentes (~100ns) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental do Leitor de Livro
- **Array**: É como ler as páginas encadernadas de um livro em sequência; ao virar a folha, o conteúdo já está nas suas mãos.
- **Lista Encadeada**: É como ler um livro onde cada parágrafo termina com um bilhete apontando para uma biblioteca diferente na cidade.

#### Impacto Prático de Performance
\`\`\`text
Operação de Travessia em 1.000.000 de inteiros:
- Array Contíguo:       ~0.8 ms (Pré-fetcher de hardware ativo)
- Lista Encadeada:     ~14.5 ms (Penalidade constante de latência RAM)
\`\`\`

#### Key Takeaways
- Arrays superam listas encadeadas na prática moderna mesmo em cenários com complexidade teórica similar, devido à arquitetura de hierarquia de memória e pipelines de instrução da CPU.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/arrays-strings/DSA-STRUCT-ARRAY-001.md', `---
id: DSA-STRUCT-ARRAY-001
title: "Prova do Custo Amortizado O(1) de Vetores Dinâmicos via Método Contábil"
tags:
  - level::l4-pleno
  - topic::dsa::arrays-strings
  - company::meta
  - freq::high
---

## Pergunta
Como provar formalmente que o custo de inserção (\`append\`) em um vetor dinâmico é **$O(1)$ amortizado** utilizando o método contábil?

## Resposta
### Quick Answer
**Solução Direta**:
- No **Método Contábil (Accounting Method)**, cobramos um custo amortizado de **3 créditos virtuais** por cada inserção simples:
  - **1 crédito**: Paga o custo imediato de gravar o elemento no array.
  - **1 crédito**: Fica armazenado como saldo do próprio elemento para sua futura cópia.
  - **1 crédito**: Fica armazenado para pagar a futura cópia de um elemento mais antigo que já consumiu seu saldo.
- Quando o array atinge a capacidade $N$ e precisa duplicar para $2N$, exatamente $N$ créditos estão acumulados no saldo, pagando integralmente a cópia dos $N$ elementos para o novo buffer sem déficit. Logo, o custo por operação é $O(1)$.

### Dual Coding Visual
| Operação | Custo Real | Saldo Acumulado |
|---|---|---|
| **Append sem realocação** | 1 ciclo | $+2$ créditos no saldo |
| **Append com duplicação $N \\to 2N$** | $N + 1$ ciclos | Saldo de $N$ zera o custo de cópia |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Dedução da Série Geométrica (Método Agregado)
O custo total $T(N)$ para inserir $N$ elementos começando com capacidade 1 é a soma das inserções imediatas mais as cópias nas potências de 2:
$$T(N) = N + \\sum_{j=0}^{\\lfloor \\log_2 N \\rfloor} 2^j = N + (2^{\\lfloor \\log_2 N \\rfloor + 1} - 1) < N + 2N = 3N$$

Dividindo pelo número de operações $N$:
$$\\text{Custo Amortizado} = \\frac{T(N)}{N} < \\frac{3N}{N} = O(1)$$

#### Key Takeaways
- A chave da prova matemática é que os elementos recém-inseridos subsidiam a cópia dos elementos antigos antes que ocorra a próxima realocação.
- Esse resultado só é válido quando o fator multiplicativo é maior que 1 ($\gamma > 1$).

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/arrays-strings/DSA-STRUCT-ARRAY-004.md', `---
id: DSA-STRUCT-ARRAY-004
title: "Custos de Imutabilidade de Strings e Concatenação O(N) com StringBuilder"
tags:
  - level::l4-pleno
  - topic::dsa::arrays-strings
  - company::google
  - freq::high
---

## Pergunta
Por que a concatenação de strings em loop com operador \`+=\` tem complexidade $O(N^2)$ e como \`StringBuilder\` resolve esse problema?

## Resposta
### Quick Answer
**Solução Direta**:
- Em linguagens como Java e Go, strings são **imutáveis** (buffers somente leitura compartilhados com segurança entre threads).
- Ao concatenar em loop (\`s += c\`), uma nova string é alocada e todos os caracteres anteriores são copiados a cada iteração, resultando no somatório:
  $$1 + 2 + 3 + \\dots + N = \\frac{N(N+1)}{2} = O(N^2) \\text{ bytes copiados}$$
- Classes como \`StringBuilder\` (Java) ou \`strings.Builder\` (Go) utilizam um buffer de bytes mutável com expansão geométrica, alcançando complexidade linear $O(N)$ total.

### Dual Coding Visual
| Estratégia de Concatenação | Tempo de Execução | Alocações no Heap |
|---|---|---|
| **Loop com \`s += str\`** | $O(N^2)$ Quadrático | $N$ novos objetos alocados |
| **\`StringBuilder\` / \`strings.Builder\`** | $O(N)$ Linear | $O(\\log N)$ realocações |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go com Zero Allocations
\`\`\`go
package main

import (
  "strings"
)

func buildLargeString(items []string) string {
  var sb strings.Builder
  // Pré-aloca capacidade conhecida para evitar qualquer realocação intermediária:
  sb.Grow(len(items) * 16)
  for _, item := range items {
    sb.WriteString(item)
  }
  return sb.String()
}
\`\`\`

#### Key Takeaways
- Em entrevistas FAANG, qualquer concatenação de strings em laço sem construtor mutável é classificada como erro grave de complexidade assintótica.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/arrays-strings/DSA-STRUCT-ARRAY-005.md', `---
id: DSA-STRUCT-ARRAY-005
title: "Design e Otimização Bitwise de um Ring Buffer Circular Contíguo"
tags:
  - level::l4-pleno
  - topic::dsa::arrays-strings
  - company::netflix
  - freq::high
---

## Pergunta
Como projetar um **Ring Buffer (Buffer Circular)** contíguo de alta performance e como a otimização com máscara bitwise acelera o avanço de ponteiros?

## Resposta
### Quick Answer
**Solução Direta**:
- Um **Ring Buffer** utiliza um array de tamanho fixo com dois ponteiros de índice (\`head\` e \`tail\`) que avançam circularmente sem deslocar elementos:
  $$\\text{tail} = (\\text{tail} + 1) \\pmod{\\text{capacity}}$$
- **Otimização Bitwise**: Quando a capacidade é configurada como potência de 2 ($2^k$), a operação cara de divisão/módulo (\`%\`) é substituída por uma operação bitwise rápida:
  $$\\text{tail} = (\\text{tail} + 1) \\ \\& \\ (\\text{capacity} - 1)$$
- Essa operação executa em **1 único ciclo de clock** da CPU contra 15–40 ciclos da instrução \`DIV\`.

### Dual Coding Visual
| Estratégia de Avanço | Instrução CPU | Ciclos de Clock |
|---|---|---|
| **Aritmética Modular (\`% cap\`)** | \`DIV\` / \`IDIV\` | ~15 a 40 ciclos |
| **Máscara Bitwise (\`& (cap - 1)\`)** | \`AND\` | 1 ciclo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Ring Buffer com Bitwise Mask
\`\`\`java
public class FastRingBuffer<T> {
  private final Object[] buffer;
  private final int mask; // capacity - 1 (para capacidade 2^k)
  private int head = 0;
  private int tail = 0;
  private int size = 0;

  public FastRingBuffer(int powerOfTwoCap) {
    this.buffer = new Object[powerOfTwoCap];
    this.mask = powerOfTwoCap - 1;
  }

  public boolean push(T item) {
    if (size == buffer.length) return false;
    buffer[tail] = item;
    tail = (tail + 1) & mask;
    size++;
    return true;
  }

  @SuppressWarnings("unchecked")
  public T pop() {
    if (size == 0) return null;
    T item = (T) buffer[head];
    buffer[head] = null;
    head = (head + 1) & mask;
    size--;
    return item;
  }
}
\`\`\`

#### Key Takeaways
- O Ring Buffer é a base estrutural de filas de mensagens em memória de baixa latência (ex: LMAX Disruptor e buffers de socket no kernel Linux).

</details>
`);

// 2. linked-lists
writeAndValidateCard('decks/01-dsa/data-structures/linked-lists/DSA-STRUCT-LIST-000.md', `---
id: DSA-STRUCT-LIST-000
title: "Estrutura de Nós Encadeados com Ponteiros em Listas Ligadas"
tags:
  - level::l3-junior
  - topic::dsa::linked-lists
  - company::microsoft
  - freq::high
---

## Pergunta
Como funcionam internamente os nós e ponteiros de uma **Lista Encadeada Simples (Singly Linked List)**?

## Resposta
### Quick Answer
**Solução Direta**:
- Cada nó em uma lista encadeada é uma estrutura alocada individualmente no Heap contendo dois campos:
  1. \`val\`: O dado ou valor armazenado.
  2. \`next\`: O ponteiro contendo o endereço de memória do próximo nó (ou \`null\` no último nó).
- A lista é acessada a partir de uma referência para o nó inicial (\`head\`), exigindo travessia sequencial $O(N)$ para alcançar nós intermediários.

### Dual Coding Visual
| Tipo de Lista | Ponteiros por Nó | Direção de Travessia |
|---|---|---|
| **Singly Linked** | 1 ponteiro (\`next\`) | Apenas para frente |
| **Doubly Linked** | 2 ponteiros (\`prev\`, \`next\`) | Bidirecional |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Estrutura Básica de Nó
\`\`\`go
package main

import "fmt"

type ListNode struct {
  Val  int
  Next *ListNode
}

func printList(head *ListNode) {
  curr := head
  for curr != nil {
    fmt.Printf("%d -> ", curr.Val)
    curr = curr.Next
  }
  fmt.Println("nil")
}
\`\`\`

#### Key Takeaways
- Listas encadeadas não suportam acesso indexado $O(1)$; o acesso ao $k$-ésimo elemento exige obrigatoriamente $k$ saltos de ponteiro ($O(k)$).

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/linked-lists/DSA-STRUCT-LIST-002.md', `---
id: DSA-STRUCT-LIST-002
title: "Inserção e Remoção O(1) nas Extremidades em Listas Encadeadas"
tags:
  - level::l3-junior
  - topic::dsa::linked-lists
  - company::amazon
  - freq::high
---

## Pergunta
Por que a inserção e remoção no início de uma lista encadeada é **estritamente $O(1)$** sem necessidade de realocação de buffers?

## Resposta
### Quick Answer
**Solução Direta**:
- Para inserir um novo nó no início (\`head\`):
  1. Criamos o novo nó e apontamos seu \`next\` para o \`head\` atual: \`newNode.next = head\`.
  2. Atualizamos a referência \`head = newNode\`.
- Essa operação manipula exatamente dois ponteiros em tempo constante $O(1)$, independentemente do tamanho $N$ da lista, sem precisar realocar ou deslocar nenhum outro elemento.

### Dual Coding Visual
| Operação | Lista Encadeada | Vetor Dinâmico |
|---|---|---|
| **Inserção no Início (\`pushFront\`)** | $O(1)$ Ponteiros | $O(N)$ Deslocamento em bloco |
| **Inserção no Fim (\`pushBack\` com tail)**| $O(1)$ Ponteiro | $O(1)$ Amortizado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Inserção no Topo
\`\`\`java
public class SinglyLinkedList {
  private Node head;

  public void pushFront(int val) {
    Node newNode = new Node(val);
    newNode.next = head;
    head = newNode; // O(1) estrito
  }
}
\`\`\`

#### Key Takeaways
- Listas ligadas são estruturas ideais para construir Pilhas e Filas onde inserções e deleções ocorrem predominantemente nas pontas.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/linked-lists/DSA-STRUCT-LIST-003.md', `---
id: DSA-STRUCT-LIST-003
title: "Trade-offs de Overhead de Ponteiros e Cache Misses em Listas Ligadas"
tags:
  - level::l3-junior
  - topic::dsa::linked-lists
  - company::meta
  - freq::high
---

## Pergunta
Quais são as desvantagens de consumo de memória e localidade de cache de listas encadeadas em relação a arrays?

## Resposta
### Quick Answer
**Solução Direta**:
- **Overhead de Memória**: Cada nó exige 8 bytes (em 64-bit) para o ponteiro \`next\` (mais 8 bytes para \`prev\` em listas duplas) além do payload, gerando um desperdício de 50% a 75% da memória apenas com ponteiros.
- **Cache Misses Críticos**: Como os nós são alocados em momentos distintos, eles ficam espalhados pelo Heap; percorrer a lista gera um salto aleatório de memória por nó, inutilizando o pré-fetcher de hardware da CPU.

### Dual Coding Visual
| Característica | Lista Encadeada | Array Contíguo |
|---|---|---|
| **Overhead por Elemento** | 8–16 bytes (ponteiros) | 0 bytes extras |
| **Aproveitamento de Cache Line** | Baixo (1 nó por salto) | Alto (múltiplos itens na linha) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Análise de Overhead em 64-bit
Para armazenar um inteiro de 4 bytes (\`int32\`):
- **Array Contíguo**: 4 bytes por elemento.
- **Lista Duplamente Encadeada**: 4 bytes (valor) + 4 bytes (padding) + 8 bytes (\`prev\`) + 8 bytes (\`next\`) + 16 bytes (header de objeto JVM) = **40 bytes** para guardar 4 bytes de dado ($10\\times$ mais memória).

#### Key Takeaways
- Em cenários com restrição de memória ou sensibilidade a latência de CPU, vetores dinâmicos são quase invariavelmente preferíveis a listas ligadas.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/linked-lists/DSA-STRUCT-LIST-001.md', `---
id: DSA-STRUCT-LIST-001
title: "Padrão de Nós Sentinela (Dummy Head/Tail) em Listas Duplamente Ligadas"
tags:
  - level::l4-pleno
  - topic::dsa::linked-lists
  - company::google
  - freq::high
---

## Pergunta
Como o padrão de **Nós Sentinela (Dummy Head / Dummy Tail)** elimina condições de borda (*null checks*) em listas duplamente ligadas?

## Resposta
### Quick Answer
**Solução Direta**:
- Nós Sentinela são dois nós sentinelas fixos alocados na inicialização: \`head\` e \`tail\`.
- Em uma lista vazia, \`head.next = tail\` e \`tail.prev = head\`.
- Todos os elementos reais são inseridos estritamente entre \`head\` e \`tail\`.
- **Benefício**: Qualquer nó inserido ou removido tem garantidamente um vizinho anterior (\`prev\`) e um vizinho posterior (\`next\`), eliminando todas as verificações de \`if (head == null)\` ou \`if (node.next == null)\`.

### Dual Coding Visual
| Estrutura de Lista | Inserção no Início | Remoção do Último Item |
|---|---|---|
| **Sem Sentinela** | Exige \`if (head == null)\` | Exige atualizar \`head = null\` |
| **Com Sentinelas** | Sempre \`insertAfter(head)\` | Sempre \`remove(node)\` uniforme |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Primitiva com Sentinelas
\`\`\`java
public class DoublyLinkedList {
  private final Node head = new Node(0, 0);
  private final Node tail = new Node(0, 0);

  public DoublyLinkedList() {
    head.next = tail;
    tail.prev = head;
  }

  public void addFirst(Node node) {
    node.next = head.next;
    node.prev = head;
    head.next.prev = node;
    head.next = node;
  }

  public void remove(Node node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
}
\`\`\`

#### Key Takeaways
- O uso de sentinelas reduz o código de manipulação de ponteiros pela metade e previne erros comuns de \`NullPointerException\` em entrevistas FAANG.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/linked-lists/DSA-STRUCT-LIST-004.md', `---
id: DSA-STRUCT-LIST-004
title: "Composição de Lista Duplamente Ligada e Hash Map para LRU Cache O(1)"
tags:
  - level::l4-pleno
  - topic::dsa::linked-lists
  - company::amazon
  - freq::high
---

## Pergunta
Como a composição de uma **Lista Duplamente Ligada** com um **Hash Map** permite implementar um **LRU Cache** com \`get\` e \`put\` em $O(1)$ estrito?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Hash Map** mapeia cada chave \`key\` para a referência direta do seu nó na memória (\`Map<Key, Node>\`), permitindo busca em $O(1)$.
- A **Lista Duplamente Ligada** mantém a ordem de uso:
  - Nós mais recentemente acessados são movidos para o início (\`head\`).
  - O nó menos recentemente utilizado reside sempre no fim (\`tail.prev\`).
- Com a referência direta do nó obtida pelo mapa, a remoção e reinserção na cabeça da lista ocorrem em $O(1)$ através da manipulação de 4 ponteiros.

### Dual Coding Visual
| Operação LRU | Papel do Hash Map | Papel da Lista Dupla |
|---|---|---|
| **\`get(key)\`** | Localiza o nó em $O(1)$ | Move nó para \`head\` em $O(1)$ |
| **\`put(key, val)\`** | Registra chave em $O(1)$ | Despeja \`tail.prev\` se cheio |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Diagrama de Arquitetura LRU
\`\`\`text
Hash Map:
[ "k1" -> Node1 ], [ "k2" -> Node2 ], [ "k3" -> Node3 ]

Lista Dupla:
[Head Sentinel] <-> [Node3 (MRU)] <-> [Node1] <-> [Node2 (LRU)] <-> [Tail Sentinel]
\`\`\`

#### Key Takeaways
- Se usássemos um array em vez de lista duplamente ligada, mover o item acessado para a ponta exigiria deslocar elementos em $O(N)$. A lista ligada é indispensável para o $O(1)$ estrito.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/linked-lists/DSA-STRUCT-LIST-005.md', `---
id: DSA-STRUCT-LIST-005
title: "Mecânica Probabilística de Skip Lists para Busca em Tempo O(log N)"
tags:
  - level::l4-pleno
  - topic::dsa::linked-lists
  - company::redis
  - freq::high
---

## Pergunta
Como as **Skip Lists** alcançam busca, inserção e remoção em tempo $O(\\log N)$ usando ponteiros multinível e aleatoriedade?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Skip List** sobrepõe múltiplas camadas de listas encadeadas ordenadas com atalhos:
  - A camada 0 (base) contém todos os $N$ elementos ordenados.
  - Cada camada superior $k$ atua como uma "pista expressa", contendo um subconjunto aleatório dos elementos da camada $k-1$ (geralmente com probabilidade $p = 1/2$).
- Durante a busca, caminhamos horizontalmente na camada mais alta até que o próximo valor seja maior que o alvo; em seguida, descemos verticalmente para a camada inferior.
- Essa descida em torre divide o espaço de busca pela metade a cada nível, atingindo $O(\\log N)$ esperado.

### Dual Coding Visual
| Estrutura de Busca | Custo de Busca | Complexidade de Implementação |
|---|---|---|
| **Árvore Red-Black** | $O(\\log N)$ Pior caso | Alta (Rotações e recolorações) |
| **Skip List** | $O(\\log N)$ Esperado | Média (Ponteiros + \`coinFlip\`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Modelo de Torres da Skip List
\`\`\`text
Level 3:  [Head] -------------------------> [30] -----------------> nil
Level 2:  [Head] -------------> [15] ------> [30] ------> [50] ----> nil
Level 1:  [Head] -----> [8] --> [15] ------> [30] ------> [50] ----> nil
Level 0:  [Head] -> [3]->[8]->[12]->[15]->[20]->[30]->[42]->[50]-> nil
\`\`\`

#### Key Takeaways
- Skip Lists são utilizadas no **Redis (Sorted Sets / ZSET)** e em bancos de dados LSM-Tree (como LevelDB/RocksDB) porque são significativamente mais fáceis de sincronizar em ambientes concorrentes (*Lock-Free Skip Lists*) do que árvores balanceadas.

</details>
`);

console.log('✅ linked-lists decomposed.');
