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
| Estado do Vetor | Length | Capacity | Ação de Alocação |
|---|---|---|---|
| **Inicial** | 3 | 4 | Nenhuma (há espaço livre) |
| **Após 4º item** | 4 | 4 | Limite atingido |
| **Após 5º item (Append)** | 5 | 8 | Novo array $2\\times$ alocado + cópia |

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
| **Array Contíguo** | Bloco contínuo único | Cache Hits sequenciais |
| **Lista Encadeada** | Nós fragmentados no Heap | Cache Misses a cada salto |

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
| Operação | Custo Real | Crédito Cobrado | Saldo Acumulado |
|---|---|---|---|
| **Append sem realocação** | 1 ciclo | 3 créditos | $+2$ créditos no saldo |
| **Append com duplicação $N \\to 2N$** | $N + 1$ ciclos | 3 créditos | Saldo de $N$ zera o custo |

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

console.log('✅ arrays-strings decomposed.');
