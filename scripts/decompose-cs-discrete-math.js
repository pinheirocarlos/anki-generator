import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Phase 2: CS Fundamentals - Discrete Math...');

// ==========================================
// 1. boolean-logic
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/boolean-logic/CS-MATH-BOOL-000.md', `---
id: CS-MATH-BOOL-000
title: "Operações Bitwise Fundamentais (AND, OR, XOR, NOT, Shifts) e Máscaras"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
O que são as operações **bitwise fundamentais** (AND, OR, XOR, NOT, Shifts) e como utilizá-las para manipular máscaras de bits em $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Operações bitwise atuam diretamente sobre bits individuais no hardware da ALU em **1 ciclo de clock**:
  - **AND (\`&\`)**: Retorna 1 se ambos os bits forem 1 (usado para *filtrar / testar* bits: \`flags & MASK\`).
  - **OR (\`|\`)**: Retorna 1 se pelo menos um bit for 1 (usado para *ligar / setar* bits: \`flags | MASK\`).
  - **XOR (\`^\`)**: Retorna 1 se os bits forem diferentes (usado para *alternar / toggle* bits: \`flags ^ MASK\`).
  - **NOT (\`~\`)**: Inverte todos os bits (usado para *desligar* bits em conjunto com AND: \`flags & ~MASK\`).
  - **Shifts (\`<<\`, \`>>\`)**: Deslocam bits para esquerda (multiplica por $2^k$) ou direita (divide por $2^k$).

### Dual Coding Visual
| Operação Bitwise | Exemplo de Código | Efeito Prático na Flag |
|---|---|---|
| **Setar Bit $k$** | \`set_bit(flags, k)\` | Liga o bit na posição $k$ |
| **Limpar Bit $k$**| \`clear_bit(flags, k)\` | Desliga o bit na posição $k$ |
| **Testar Bit $k$**| \`test_bit(flags, k)\` | Retorna \`true\` se ativo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Sistema de Permissões de Alta Performance
\`\`\`go
package main

import "fmt"

const (
  PermRead    = 1 << 0 // 0001 (1)
  PermWrite   = 1 << 1 // 0010 (2)
  PermExecute = 1 << 2 // 0100 (4)
  PermAdmin   = 1 << 3 // 1000 (8)
)

func main() {
  var userPerms uint8 = PermRead | PermWrite // 0011

  // Testando permissão de escrita:
  hasWrite := (userPerms & PermWrite) != 0 // true

  // Revogando permissão de escrita:
  userPerms &= ^PermWrite // 0001 (em Go ^ é NOT bitwise)

  fmt.Printf("Permissões: %04b, Pode Escrever: %v\\n", userPerms, hasWrite)
}
\`\`\`

#### Key Takeaways
- Máscaras de bits empacotam até 64 flags booleanas em um único inteiro de 8 bytes (\`uint64\`), economizando 90% de memória comparado a arrays de booleanos.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/boolean-logic/CS-MATH-BOOL-002.md', `---
id: CS-MATH-BOOL-002
title: "Teoremas de De Morgan e Simplificação de Expressões Lógicas"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::amazon
  - freq::high
---

## Pergunta
O que estabelecem os **Teoremas de De Morgan** e como aplicá-los para simplificar condições lógicas complexas em código?

## Resposta
### Quick Answer
**Solução Direta**:
- Os **Teoremas de De Morgan** definem a relação de dualidade entre conjunção (\`AND\`) e disjunção (\`OR\`) sob negação (\`NOT\`):
  1. **Primeira Lei**: A negação de uma conjunção é a disjunção das negações:
     $$\\neg(A \\land B) \\iff (\\neg A \\lor \\neg B)$$
  2. **Segunda Lei**: A negação de uma disjunção é a conjunção das negações:
     $$\\neg(A \\lor B) \\iff (\\neg A \\land \\neg B)$$
- Permite refatorar expressões com múltiplos \`!\` aninhados em código legível, eliminando bugs de limites (*boundary errors*).

### Dual Coding Visual
| Expressão com Negação Externa | Forma Equivalente De Morgan | Legibilidade em Código |
|---|---|---|
| \`!(A && B)\` | \`!A OR !B\` | Condição de recusa imediata |
| \`!(A OR B)\` | \`!A && !B\` | Verificação de restrição estrita |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Refatorando Condicional Complexa
\`\`\`java
// Código Difícil de Ler (Negação Externa):
if (!(user.isActive() && !user.isBanned() && user.hasValidSubscription())) {
  denyAccess();
}

// Código Refatorado com Teorema de De Morgan (Claro e Direto):
if (!user.isActive() || user.isBanned() || !user.hasValidSubscription()) {
  denyAccess();
}
\`\`\`

#### Key Takeaways
- Aplicar De Morgan transforma negações de conjuntos em verificações sequenciais com *Short-Circuit Evaluation* eficiente.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/boolean-logic/CS-MATH-BOOL-003.md', `---
id: CS-MATH-BOOL-003
title: "Propriedades do Operador XOR (Involução, Auto-Anulação e Busca de Elemento Único)"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::meta
  - freq::high
---

## Pergunta
Quais são as propriedades algébricas fundamentais do **XOR ($\oplus$)** e como a auto-anulação permite encontrar elementos únicos em $O(N)$ tempo e $O(1)$ espaço?

## Resposta
### Quick Answer
**Solução Direta**:
- O operador **XOR (Exclusive OR / $\oplus$)** possui 4 propriedades algébricas essenciais:
  1. **Identidade**: $x \\oplus 0 = x$
  2. **Auto-anulação (Involução)**: $x \\oplus x = 0$
  3. **Comutatividade**: $x \\oplus y = y \\oplus x$
  4. **Associatividade**: $(x \\oplus y) \\oplus z = x \\oplus (y \\oplus z)$
- **Busca de Elemento Único**: Em um array onde todos os números aparecem 2 vezes exceto 1 único elemento, aplicar XOR cumulativo em todos os elementos anula todos os pares duplicados ($x \\oplus x = 0$), restando unicamente o número isolado:
  $$\\text{resultado} = a \\oplus a \\oplus b \\oplus b \\oplus c = 0 \\oplus 0 \\oplus c = c$$

### Dual Coding Visual
| Propriedade XOR | Expressão Matemática | Efeito em Bits |
|---|---|---|
| **Elemento Neutro** | $x \\oplus 0 = x$ | Preserva todos os bits de $x$ |
| **Auto-Anulação** | $x \\oplus x = 0$ | Zera todos os bits idênticos |
| **Inversão Seletiva**| $x \\oplus 1 = \\neg x$ | Inverte o bit alvo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Single Number em $O(N)$ Tempo e $O(1)$ Espaço
\`\`\`go
package main

func singleNumber(nums []int) int {
  unique := 0
  for _, x := range nums {
    unique ^= x // Pares duplicados se anulam mutuamente
  }
  return unique
}
\`\`\`

#### Key Takeaways
- A propriedade $x \\oplus y \\oplus y = x$ é a base criptográfica de One-Time Pads (OTP), listas encadeadas XOR duplamente ligadas (*XOR Linked Lists*) e esquemas de paridade RAID-5.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/boolean-logic/CS-MATH-BOOL-001.md', `---
id: CS-MATH-BOOL-001
title: "Algoritmo de Brian Kernighan para Contagem de Bits Ligados (Popcount)"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo de **Brian Kernighan** utiliza a expressão \`n & (n - 1)\` para contar bits ligados (\`popcount\`) em tempo proporcional apenas aos bits 1?

## Resposta
### Quick Answer
**Solução Direta**:
- A expressão bitwise **\`n & (n - 1)\`** zera (limpa) exatamente o **bit 1 menos significativo (LSB - Least Significant Bit)** de \`n\` a cada iteração.
- **Mecânica**: Subtrair 1 de \`n\` inverte todos os bits a partir do bit 1 mais à direita até o final. Ao aplicar \`&\` com o \`n\` original, esse bit 1 e todos os zeros à sua direita viram zero.
- **Complexidade**: Enquanto o loop ingênuo testa todos os 32 ou 64 bits em $O(\\text{total\\_bits})$, Brian Kernighan executa em **$O(K)$ iterações**, onde $K$ é a quantidade exata de bits 1 ativos ($K \\le \\text{total\\_bits}$).

### Dual Coding Visual
| Valor de \`n\` | Binário Original | Resultado \`n & (n - 1)\` |
|---|---|---|
| **\`n = 12\`** | \`1100\` | \`1000\` (8) - Limpou o bit 2 |
| **\`n = 8\`**  | \`1000\` | \`0000\` (0) - Limpou o bit 3 |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Algoritmo de Brian Kernighan
\`\`\`java
public class BitCount {
  public static int countSetBits(int n) {
    int count = 0;
    while (n != 0) {
      n &= (n - 1); // Zera o LSB 1
      count++;
    }
    return count;
  }
}
\`\`\`

#### Teste de Potência de 2 em $O(1)$
- Um número inteiro positivo $n$ é potência de 2 se e somente se possui exatamente 1 bit ligado:
\`\`\`go
func isPowerOfTwo(n int) bool {
  return n > 0 && (n & (n - 1)) == 0
}
\`\`\`

#### Key Takeaways
- CPUs modernas oferecem a instrução de hardware nativa \`POPCNT\` que calcula a contagem total de bits ligados em 1 único ciclo de clock.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/boolean-logic/CS-MATH-BOOL-004.md', `---
id: CS-MATH-BOOL-004
title: "Implementação de Bitset / Bit Array de Alta Densidade"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::netflix
  - freq::high
---

## Pergunta
Como implementar um **Bitset / Bit Array** compacto de alta performance e realizar operações de união/interseção em $O(N/64)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Um **Bitset** armazena uma sequência de $N$ booleanos empacotados dentro de um array de inteiros de 64 bits (\`[]uint64\`), consumindo **1 bit por booleano** em vez de 1 byte por \`bool\` em linguagens padrão (redução de 8x no uso de RAM).
- **Indexação**: Para o bit $k$:
  - Índice do bloco no array: \`wordIdx = k / 64\` (ou \`k >> 6\`).
  - Posição dentro da palavra: \`bitOffset = k % 64\` (ou \`k & 63\`).
- **Operações Vetoriais**: Operações de conjunto (União com \`|\`, Interseção com \`&\`) processam **64 booleanos por ciclo de clock da ALU**, alcançando velocidade $64\\times$ maior que loops iterativos.

### Dual Coding Visual
| Estrutura de Booleans | Memória por 1.000.000 Bools | Custo de Interseção (AND) |
|---|---|---|
| **Array de Bools (\`[]bool\`)** | ~1.000.000 bytes (1 MB) | 1.000.000 iterações escalares |
| **Bitset (\`[]uint64\`)** | ~125.000 bytes (125 KB) | 15.625 operações bitwise ($64\\times$ mais rápido) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Estrutura BitSet Básica
\`\`\`go
package main

type BitSet struct {
  words []uint64
}

func NewBitSet(size int) *BitSet {
  return &BitSet{words: make([]uint64, (size+63)/64)}
}

func (b *BitSet) Set(k int) {
  b.words[k>>6] |= 1 << (k & 63)
}

func (b *BitSet) Test(k int) bool {
  return (b.words[k>>6] & (1 << (k & 63))) != 0
}

func (b *BitSet) Union(other *BitSet) {
  for i := range b.words {
    b.words[i] |= other.words[i] // 64 flags unidas por ciclo!
  }
}
\`\`\`

#### Key Takeaways
- Bitsets são o alicerce de filtros de Bloom, indexadores de banco de dados (Bitmap Indexes do PostgreSQL/ClickHouse) e solvers de grafos em alta escala.

</details>
`);

// ==========================================
// 2. number-representation-ieee754
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/number-representation-ieee754/CS-MATH-NUM-000.md', `---
id: CS-MATH-NUM-000
title: "Complemento de Dois para Representação de Inteiros e Integer Overflow"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::amazon
  - freq::high
---

## Pergunta
Como funciona a representação de inteiros em **Complemento de Dois** e como o hardware lida com **Integer Overflow**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Complemento de Dois**: É o padrão universal de representação de números inteiros com sinal na CPU. O bit mais significativo (MSB) atua com peso negativo ($-2^{N-1}$).
- **Cálculo de $-X$**: Inverte todos os bits de $X$ (\`NOT\`) e soma 1:
  $$-X = \\sim X + 1$$
- **Vantagens**: Permite que a ALU execute subtrações usando o mesmo circuito físico de adição ($A - B = A + (-B)$) e possui **zero único** (\`0000 0000\` = 0).
- **Integer Overflow**: Ocorre quando o resultado ultrapassa a capacidade de bits (\`MaxInt + 1\` vira \`MinInt\`), gerando o flag de overflow (\`OF\`) na CPU sem disparar exceções por padrão em C/Go.

### Dual Coding Visual
| Valor Decimal (8 bits) | Representação Binária | Significado dos Bits |
|---|---|---|
| **$+127$ (Max)** | \`0111 1111\` | $0 \\times (-128) + 127$ |
| **$0$** | \`0000 0000\` | Zero único e inequívoco |
| **$-1$** | \`1111 1111\` | $-128 + 127 = -1$ |
| **$-128$ (Min)** | \`1000 0000\` | $-128 + 0 = -128$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Wraparound de Inteiro
\`\`\`go
package main

import (
  "fmt"
  "math"
)

func main() {
  var max int32 = math.MaxInt32 // 2.147.483.647 (0111...1111)
  overflowed := max + 1        // -2.147.483.648 (1000...0000)

  fmt.Printf("Max: %d -> Overflowed: %d\\n", max, overflowed)
}
\`\`\`

#### Key Takeaways
- O bug histórico de overflow na busca binária (\`mid = (low + high) / 2\`) ocorria quando \`low + high\` estourava \`MaxInt32\`. A forma segura é \`mid = low + (high - low) / 2\`.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/number-representation-ieee754/CS-MATH-NUM-002.md', `---
id: CS-MATH-NUM-002
title: "Endianness (Big-Endian vs Little-Endian) e Network Byte Order"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
O que é **Endianness** (Big-Endian vs Little-Endian) e por que a conversão para Network Byte Order é mandatória em redes?

## Resposta
### Quick Answer
**Solução Direta**:
- **Endianness**: É a convenção de ordem pela qual bytes individuais de uma palavra multi-byte (como um \`uint32\` de 4 bytes) são armazenados em endereços sequenciais de memória:
  - **Little-Endian (x86-64, ARM64 padrão)**: O byte **menos significativo (LSB)** fica no endereço de memória mais baixo.
  - **Big-Endian**: O byte **mais significativo (MSB)** fica no endereço de memória mais baixo (ordem natural de leitura humana).
- **Network Byte Order**: A arquitetura da Internet (TCP/IP) adota estritamente **Big-Endian**. Protocolos exigem conversão explícita (\`htons\`, \`htonl\`, \`binary.BigEndian\`) antes de transmitir pacotes na rede.

### Dual Coding Visual
| Ordem de Bytes (\`0x12345678\`) | Endereço \`0x00\` (Início) | Endereço \`0x03\` (Fim) |
|---|---|---|
| **Big-Endian (Network Order)** | \`0x12\` (MSB Mais Significativo) | \`0x78\` (LSB Menos Significativo) |
| **Little-Endian (Host x86)** | \`0x78\` (LSB Menos Significativo) | \`0x12\` (MSB Mais Significativo) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Serialização em Network Byte Order
\`\`\`go
package main

import (
  "encoding/binary"
  "fmt"
)

func main() {
  buf := make([]byte, 4)
  var val uint32 = 0x12345678

  // Converte para Big-Endian (Network Order):
  binary.BigEndian.PutUint32(buf, val)
  fmt.Printf("Big-Endian: % X\\n", buf) // 12 34 56 78

  // Converte para Little-Endian (Host x86):
  binary.LittleEndian.PutUint32(buf, val)
  fmt.Printf("Little-Endian: % X\\n", buf) // 78 56 34 12
}
\`\`\`

#### Key Takeaways
- Little-Endian facilita a conversão de tipos em hardware (um \`uint32\` lido como \`uint16\` no mesmo ponteiro retorna o valor correto sem deslocamento).

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/number-representation-ieee754/CS-MATH-NUM-003.md', `---
id: CS-MATH-NUM-003
title: "Estrutura do Padrão IEEE 754: Sinal, Expoente com Bias e Mantissa"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::apple
  - freq::high
---

## Pergunta
Como o padrão **IEEE 754** divide números de ponto flutuante em *Sinal, Expoente com Bias e Mantissa (Fração)*?

## Resposta
### Quick Answer
**Solução Direta**:
- O padrão **IEEE 754** codifica números reais em 3 campos contíguos de bits:
  1. **Bit de Sinal ($S$)**: 1 bit (0 = positivo, 1 = negativo).
  2. **Expoente com Bias ($E$)**: 8 bits em \`float32\` (Bias = 127) ou 11 bits em \`float64\` (Bias = 1023). O expoente real é $E - \\text{Bias}$.
  3. **Mantissa / Fração ($M$)**: 23 bits em \`float32\` ou 52 bits em \`float64\`. Assume um bit 1 implícito antes da vírgula ($1.M$) para números normalizados.
- **Fórmula de Decodificação**:
  $$\\text{Valor} = (-1)^S \\times (1 + M) \\times 2^{E - \\text{Bias}}$$

### Dual Coding Visual
| Tipo IEEE 754 | Expoente com Bias | Mantissa / Fração |
|---|---|---|
| **Single (\`float32\`)** | 8 bits (Bias 127) | 23 bits (~7 dígitos precisão) |
| **Double (\`float64\`)** | 11 bits (Bias 1023)| 52 bits (~16 dígitos precisão) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Decomposição de Bits
- Para representar o número $+1.5$:
  - Sinal $S = 0$.
  - Binário: $1.5 = 1.1_2 = 1.1_2 \\times 2^0$.
  - Expoente real = 0 $\\rightarrow$ Campo $E = 0 + 127 = 127$ (\`01111111\`).
  - Mantissa $M = 0.5$ (bit mais significativo da fração é 1 $\\rightarrow$ \`1000...000\`).

#### Key Takeaways
- Como a mantissa tem tamanho finito (52 bits em double), frações binárias periódicas não podem ser representadas com precisão infinita.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/number-representation-ieee754/CS-MATH-NUM-001.md', `---
id: CS-MATH-NUM-001
title: "Inexatidão de Ponto Flutuante Binário e Tipos Decimais para Finanças"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::meta
  - freq::high
---

## Pergunta
Por que a expressão \`0.1 + 0.2 == 0.3\` avalia como \`false\` em ponto flutuante IEEE 754 e como mitigar erros de precisão financeira?

## Resposta
### Quick Answer
**Solução Direta**:
- **Causa da Inexatidão**: Na base 10, frações como $0.1 = 1/10$ são exatas. Na base 2, $1/10$ se torna uma **dízima periódica binária infinita**:
  $$0.1_{10} = 0.00011001100110011..._2$$
- Ao truncar em 53 bits de precisão IEEE 754, ocorrem pequenos erros de arredondamento:
  $$0.1 + 0.2 = 0.3000000000000000444089... \\neq 0.3$$
- **Mitigação Financeira**:
  1. Utilizar tipos **Ponto Fixo Decimal** (ex: \`BigDecimal\` em Java, \`shopspring/decimal\` em Go).
  2. Armazenar valores monetários como **inteiros na menor unidade fracionária** (ex: R$ 10,50 armazenado como \`1050\` centavos).

### Dual Coding Visual
| Abordagem de Cálculo | Representação Interna | Risco de Arredondamento Financeiro |
|---|---|---|
| **\`float64\` / \`double\`** | Ponto flutuante binário IEEE 754 | Inaceitável (Dízima periódica em base 2) |
| **Inteiro em Centavos** | Inteiro puro de 64 bits (\`int64\`) | Zero erro (Aritmética exata) |
| **\`BigDecimal\`** | Base 10 com escala decimal configurada | Zero erro (Precisão arbitrária exata) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Comparação com Epsilon vs BigDecimal
\`\`\`java
import java.math.BigDecimal;

public class FinancialCalc {
  public static void main(String[] args) {
    // 1. Comparação perigosa em float:
    double a = 0.1 + 0.2;
    System.out.println(a == 0.3); // false!

    // 2. Comparação segura com Epsilon:
    double EPSILON = 1e-9;
    boolean isEqual = Math.abs(a - 0.3) < EPSILON; // true

    // 3. Padrão Financeiro Profissional (BigDecimal):
    BigDecimal d1 = new BigDecimal("0.1");
    BigDecimal d2 = new BigDecimal("0.2");
    BigDecimal sum = d1.add(d2);
    System.out.println(sum.equals(new BigDecimal("0.3"))); // true
  }
}
\`\`\`

#### Key Takeaways
- Nunca use \`float\` ou \`double\` para calcular juros, preços, saldos bancários ou transações financeiras em entrevistas de System Design e backend.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/number-representation-ieee754/CS-MATH-NUM-004.md', `---
id: CS-MATH-NUM-004
title: "Valores Especiais IEEE 754 (Subnormais, NaN, Infinito) e Penalidade de FPU"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
O que são **números Subnormais (Denormais)**, \`NaN\` e \`Infinito\` no padrão IEEE 754 e qual o impacto de performance na FPU?

## Resposta
### Quick Answer
**Solução Direta**:
- O padrão reserva combinações específicas no campo de expoente para estados especiais:
  - **$\\pm \\infty$ (Infinito)**: Expoente = todos 1 (\`255\` ou \`2047\`), Mantissa = 0 (resultado de divisões por zero: \`1.0 / 0.0\`).
  - **NaN (Not a Number)**: Expoente = todos 1, Mantissa $\\neq$ 0 (resultado de \`0.0 / 0.0\` ou \`sqrt(-1)\`). Todo teste \`NaN == NaN\` retorna \`false\`.
  - **Subnormais (Denormais)**: Expoente = todos 0 (\`000...0\`), Mantissa $\\neq$ 0. Permite *Underflow gradual* para valores extremamente próximos de zero ($0 < |x| < 2^{-1022}$).
- **Penalidade de Performance**: Muitas CPUs não processam subnormais no pipeline veloz da FPU e disparam microcode traps, causando lentidão de **10x a 100x** em loops intensivos.

### Dual Coding Visual
| Estado Especial | Padrão dos Bits | Comportamento em Execução |
|---|---|---|
| **Zero ($\\pm 0$)** | Expoente 0 / Mantissa 0 | \`+0.0 == -0.0\` retorna \`true\` |
| **Subnormal** | Expoente 0 / Mantissa $\\neq 0$ | Underflow gradual ($10\\times$ mais lento) |
| **Infinito ($\\pm \\infty$)**| Expoente 1s / Mantissa 0 | Ultrapassou o maior expoente |
| **NaN** | Expoente 1s / Mantissa $\\neq 0$ | Não ordenável (\`x != x\` é \`true\`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Desabilitar Subnormais em Processamento de Áudio/Jogos
- Em aplicações de tempo real (processamento de áudio DSP, motores de física), desenvolvedores ativam as flags da FPU **DAZ (Denormals-Are-Zero)** e **FTZ (Flush-To-Zero)** no registrador \`MXCSR\` da CPU, forçando qualquer subnormal a virar zero instantaneamente em 1 ciclo.

#### Key Takeaways
- A única forma confiável de checar se uma variável é \`NaN\` em código sem funções nativas é testar \`x != x\`.

</details>
`);

// ==========================================
// 3. combinatorics-probability
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/combinatorics-probability/CS-MATH-PROB-000.md', `---
id: CS-MATH-PROB-000
title: "Permutações vs Combinações e Análise de Explosão Combinatória"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
Qual é a diferença matemática fundamental entre **Permutações** e **Combinações** e como calcular suas cardinalidades?

## Resposta
### Quick Answer
**Solução Direta**:
- **Permutação ($P(n, k)$)**: A **ordem dos elementos importa**. Número de maneiras de ordenar $k$ itens distintos a partir de um conjunto de $n$ itens:
  $$P(n, k) = \\frac{n!}{(n - k)!} \\quad \\text{Ex: Senhas, pódio de corrida, rotas de entrega}$$
- **Combinação ($C(n, k)$ ou $\\binom{n}{k}$)**: A **ordem dos elementos NÃO importa**. Número de subconjuntos de tamanho $k$ escolhidos a partir de $n$ itens:
  $$C(n, k) = \\frac{n!}{k!(n - k)!} = \\frac{P(n, k)}{k!} \\quad \\text{Ex: Mãos de cartas, sorteio de comitê}$$
- A divisão por $k!$ nas combinações cancela todas as permutações equivalentes do mesmo subconjunto.

### Dual Coding Visual
| Conceito | Importa a Ordem? | Exemplo com \`{A,B,C}\` ($k=2$) |
|---|---|---|
| **Permutação** | Sim | 6 pares: \`AB, BA, AC, CA, BC, CB\` |
| **Combinação** | Não | 3 subconjuntos: \`{A,B}, {A,C}, {B,C}\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Cálculo de Combinação sem Overflow
\`\`\`go
package main

// Calcula C(n, k) de forma incremental para evitar estouro de n!:
func combinations(n, k int) int {
  if k > n {
    return 0
  }
  if k > n-k {
    k = n - k // Simetria C(n, k) == C(n, n-k)
  }
  res := 1
  for i := 1; i <= k; i++ {
    res = res * (n - i + 1) / i
  }
  return res
}
\`\`\`

#### Key Takeaways
- Em algoritmos de força bruta (Backtracking), permutações geram árvores com $O(N!)$ folhas, enquanto geração de todos os subconjuntos gera $O(2^N)$ folhas.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/combinatorics-probability/CS-MATH-PROB-002.md', `---
id: CS-MATH-PROB-002
title: "Probabilidade Condicional e Teorema de Bayes em Sistemas de Decisão"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::meta
  - freq::high
---

## Pergunta
O que é **Probabilidade Condicional** e como o **Teorema de Bayes** calcula a probabilidade atualizada de um evento à luz de novas evidências?

## Resposta
### Quick Answer
**Solução Direta**:
- **Probabilidade Condicional ($P(A \\mid B)$)**: A probabilidade do evento $A$ ocorrer dado que o evento $B$ já ocorreu com certeza:
  $$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$$
- **Teorema de Bayes**: Fórmula matemática fundamental para inverter probabilidades condicionais, atualizando a probabilidade a priori $P(A)$ para a probabilidade a posteriori $P(A \\mid B)$ ao observar a evidência $B$:
  $$P(A \\mid B) = \\frac{P(B \\mid A) \\cdot P(A)}{P(B)}$$
- Base para classificadores Naive Bayes (filtros anti-spam, detecção de fraude e diagnósticos de falhas em sistemas distribuídos).

### Dual Coding Visual
| Termo Bayesiano | Significado no Sistema | Exemplo em Filtro Anti-Spam |
|---|---|---|
| **$P(A)$ (Prior)** | Probabilidade base antes de ver o dado | Taxa geral de spam recebido (ex: 20%) |
| **$P(B \\mid A)$ (Likelihood)** | Chance da evidência ocorrer dado que é $A$ | Chance da palavra "promoção" estar em spams |
| **$P(A \\mid B)$ (Posterior)** | Probabilidade atualizada após ver a evidência | Chance do e-mail ser spam contendo "promoção" |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Paradoxo do Falso Positivo
- Se uma doença afeta 1 em 1.000 pessoas ($P(D) = 0.001$) e um teste tem 99% de precisão ($P(T \\mid D) = 0.99$ e $P(T \\mid \\neg D) = 0.05$ de falso positivo):
  $$P(D \\mid T) = \\frac{0.99 \\times 0.001}{(0.99 \\times 0.001) + (0.05 \\times 0.999)} \\approx \\frac{0.00099}{0.05094} \\approx 1.94\\%$$
- Mesmo com teste positivo, a chance real de ter a doença é de apenas ~2% devido à raridade da condição a priori!

#### Key Takeaways
- Ignorar a probabilidade a priori (*Base Rate Fallacy*) é um dos erros estatísticos mais comuns em engenharia e análise de dados.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/combinatorics-probability/CS-MATH-PROB-001.md', `---
id: CS-MATH-PROB-001
title: "Paradoxo do Aniversário e Probabilidade de Colisão de Hash"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Paradoxo do Aniversário (Birthday Paradox)** explica por que colisões de hash ocorrem em $O(\\sqrt{N})$ inserções?

## Resposta
### Quick Answer
**Solução Direta**:
- **O Paradoxo**: Em uma sala com apenas **23 pessoas**, a probabilidade de que pelo menos duas pessoas façam aniversário no mesmo dia ultrapassa **50%**, embora existam 365 dias no ano.
- **Causa Matemática**: O número de comparações de pares possíveis cresce quadraticamente com a combinação $\\binom{K}{2} = \\frac{K(K-1)}{2}$. Com 23 pessoas, existem 253 pares de comparação independentes.
- **Impacto em Tabelas Hash e Criptografia**: Em um espaço de chaves de tamanho $N$, a primeira colisão de hash tem $\\approx 50\\%$ de chance de ocorrer após apenas **$K \\approx \\sqrt{N}$** elementos inseridos:
  - Em hashes de 32 bits ($2^{32} \\approx 4 \\times 10^9$), colisões surgem após apenas $\\approx 2^{16} = 65.536$ chaves.
  - Em hashes de 64 bits ($2^{64}$), colisões surgem após $\\approx 2^{32} \\approx 4$ bilhões de chaves.

### Dual Coding Visual
| Espaço de Hash ($N$) | Raiz Quadrada ($\\sqrt{N}$) | Inserções para 50% de Risco de Colisão |
|---|---|---|
| **32-bit ($4.2 \\times 10^9$)** | $2^{16}$ | ~65.536 chaves |
| **64-bit ($1.8 \\times 10^{19}$)**| $2^{32}$ | ~4.294.967.296 chaves |
| **128-bit (UUIDv4 / MD5)** | $2^{64}$ | ~$1.8 \\times 10^{19}$ chaves (Colisão zero) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fórmula de Aproximação da Probabilidade de Colisão
Para $k$ itens aleatórios inseridos em $N$ posições:
$$P(\\text{ao menos 1 colisão}) \\approx 1 - e^{-\\frac{k^2}{2N}}$$
Para $P \\ge 0.5$:
$$k \\approx \\sqrt{2N \\ln 2} \\approx 1.177 \\sqrt{N}$$

#### Key Takeaways
- Por causa do Birthday Paradox, UUIDs e identificadores distribuídos usam no mínimo **128 bits** para garantir colisão zero sem necessidade de coordenação central.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/combinatorics-probability/CS-MATH-PROB-004.md', `---
id: CS-MATH-PROB-004
title: "Dimensionamento e Análise de Falsos Positivos em Bloom Filters"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::netflix
  - freq::high
---

## Pergunta
Como dimensionar o tamanho do vetor de bits ($m$) e a quantidade de funções hash ($k$) em um **Bloom Filter** para atingir uma taxa alvo de falsos positivos?

## Resposta
### Quick Answer
**Solução Direta**:
- Um **Bloom Filter** é uma estrutura de dados probabilística com tempo $O(k)$ e espaço ultra-compacto que garante:
  - **Zero Falsos Negativos**: Se o filtro responder "NÃO", o elemento com 100% de certeza nunca foi inserido.
  - **Possíveis Falsos Positivos**: Se o filtro responder "SIM", o elemento pode estar presente ou os bits colidiram por acaso.
- **Fórmulas de Dimensionamento Ótimo**:
  - Para $n$ elementos inseridos e taxa de falsos positivos desejada $p$:
    $$m = -\\frac{n \\ln p}{(\\ln 2)^2} \\approx -1.44 \\cdot n \\log_2 p \\quad \\text{(Tamanho do vetor em bits)}$$
  - Quantidade ótima de funções hash $k$:
    $$k = \\frac{m}{n} \\ln 2 \\approx 0.693 \\cdot \\frac{m}{n}$$

### Dual Coding Visual
| Taxa de Falso Positivo ($p$) | Bits por Elemento ($m/n$) | Funções Hash Ótimas ($k$) |
|---|---|---|
| **$1\\%$ ($p = 0.01$)** | ~9.6 bits / item | $k = 7$ |
| **$0.1\\%$ ($p = 0.001$)** | ~14.4 bits / item | $k = 10$ |
| **$0.01\\%$ ($p = 0.0001$)**| ~19.1 bits / item | $k = 13$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Estrutura de Lookup em Bloom Filter
\`\`\`go
package main

type BloomFilter struct {
  bits []uint64
  m    uint64 // total de bits
  k    uint8  // total de hashes
}

func (bf *BloomFilter) Contains(key string) bool {
  for i := uint8(0); i < bf.k; i++ {
    hash := calculateHash(key, i) % bf.m
    if (bf.bits[hash/64] & (1 << (hash % 64))) == 0 {
      return false // 100% de certeza que NÃO existe!
    }
  }
  return true // Provavelmente existe (sujeito a falso positivo)
}
\`\`\`

#### Key Takeaways
- Motores de banco como RocksDB e Cassandra usam Bloom Filters antes de buscar em SSTables no disco, evitando 99% das leituras de disco desnecessárias para chaves inexistentes.

</details>
`);

// ==========================================
// 4. graph-theory
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/graph-theory/CS-MATH-GRAPH-000.md', `---
id: CS-MATH-GRAPH-000
title: "Grafo Direcionado Acíclico (DAG) e Ordenação Topológica"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
O que define um **Grafo Direcionado Acíclico (DAG)** e como a **Ordenação Topológica** resolve dependências em sistemas de compilação e tarefas?

## Resposta
### Quick Answer
**Solução Direta**:
- **DAG (Directed Acyclic Graph)**: É um grafo orientado que não contém nenhum ciclo direcionado (é impossível partir de um vértice $v$ e retornar a $v$ seguindo a direção das arestas).
- **Ordenação Topológica**: É uma ordenação linear de todos os vértices de um DAG tal que, para cada aresta direcionada $(u \\to v)$, o vértice $u$ aparece **obrigatoriamente antes** de $v$ na sequência.
- **Aplicações**: Resolução de ordem de compilação de pacotes (npm/Go modules), pipelines de CI/CD, escalonamento de queries em bancos de dados distribuídos e DAGs de orquestração (Apache Airflow / Spark).

### Dual Coding Visual
| Estrutura de Grafo | Possui Ciclo? | Suporta Ordenação Topológica? |
|---|---|---|
| **DAG (Válido)** | Não | Sim (Ao menos 1 ordem linear válida) |
| **Grafo com Ciclo (\`A \to B \to A\`)**| Sim | Não (Gera deadlock de dependência mútua) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Algoritmo de Kahn (Baseado em In-Degree) em $O(V + E)$
1. Calcula o grau de entrada (\`in-degree\`) de todos os vértices.
2. Insere em uma fila todos os vértices com \`in-degree == 0\` (sem dependências).
3. Enquanto a fila não estiver vazia:
   - Remove o vértice $u$ e adiciona na lista de resultado ordenado.
   - Decrementa o \`in-degree\` de todos os vizinhos de $u$. Se algum vizinho atingir zero, adiciona na fila.
4. Se o resultado final tiver menos que $V$ vértices, **o grafo contém ciclos**!

#### Key Takeaways
- Um grafo direcionado admite ordenação topológica se e somente se for um DAG (livre de ciclos).

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/graph-theory/CS-MATH-GRAPH-002.md', `---
id: CS-MATH-GRAPH-002
title: "Representação de Grafos: Matriz de Adjacência vs Lista de Adjacência"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::amazon
  - freq::high
---

## Pergunta
Quais são os trade-offs de tempo e espaço entre representar grafos via **Matriz de Adjacência** e via **Lista de Adjacência**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Matriz de Adjacência**: Matriz 2D de tamanho $V \\times V$ onde \`matrix[u][v] = 1\` se existe a aresta $(u \\to v)$.
  - *Espaço*: $O(V^2)$ (Inviável para grafos esparsos com milhões de nós).
  - *Checar se aresta $(u, v)$ existe*: $O(1)$ instantâneo.
  - *Iterar sobre vizinhos de $u$*: $O(V)$.
- **Lista de Adjacência**: Array de listas onde \`adj[u]\` guarda apenas os vizinhos diretos de $u$.
  - *Espaço*: $O(V + E)$ (Ótimo para grafos esparsos onde $E \\ll V^2$).
  - *Checar se aresta $(u, v)$ existe*: $O(\\text{grau}(u))$.
  - *Iterar sobre vizinhos de $u$*: $O(\\text{grau}(u))$.

### Dual Coding Visual
| Operação | Matriz de Adjacência | Lista de Adjacência |
|---|---|---|
| **Consumo de Memória** | $O(V^2)$ | $O(V + E)$ (Muito mais compacto) |
| **Verificar Aresta $(u, v)$** | $O(1)$ Instantâneo | $O(\\text{grau}(u))$ |
| **Iterar Vizinhos de $u$** | $O(V)$ | $O(\\text{grau}(u))$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Lista de Adjacência Compacta
\`\`\`go
package main

// Grafo com V nós representado via lista de adjacência esparsa:
type Graph struct {
  adj [][]int
}

func NewGraph(numVertices int) *Graph {
  return &Graph{adj: make([][]int, numVertices)}
}

func (g *Graph) AddEdge(u, v int) {
  g.adj[u] = append(g.adj[u], v)
}
\`\`\`

#### Key Takeaways
- A grande maioria das redes do mundo real (redes sociais, links da web, rotas rodoviárias) é esparsa ($E \\ll V^2$), tornando a Lista de Adjacência a escolha padrão absoluta.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/graph-theory/CS-MATH-GRAPH-003.md', `---
id: CS-MATH-GRAPH-003
title: "Componentes Fortemente Conexos (SCC) e Algoritmo de Tarjan"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::meta
  - freq::high
---

## Pergunta
O que caracteriza um **Componente Fortemente Conexo (SCC)** em grafos direcionados e como o algoritmo de Tarjan os identifica em $O(V + E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- **SCC (Strongly Connected Component)**: É um subgrafo maximal direcionado onde todo vértice $u$ consegue alcançar todo vértice $v$, e vice-versa ($u \\leftrightarrow v$).
- **Algoritmo de Tarjan**: Identifica todos os SCCs em uma **única travessia DFS** mantendo dois índices por vértice:
  - \`ids[u]\`: A ordem cronológica de descoberta de $u$ na DFS.
  - \`low[u]\`: O menor ID alcançável a partir de $u$ através de arestas da árvore ou arestas de retorno (*Back-Edges*) no SCC.
- Quando a DFS completa a exploração de um nó raiz onde \`ids[u] == low[u]\`, todos os vértices acima de $u$ na pilha da DFS formam um SCC completo e são desempilhados juntos.

### Dual Coding Visual
| Métrica no Algoritmo de Tarjan | Significado | Ação ao Completar DFS do Nó |
|---|---|---|
| **\`low[u] < ids[u]\`** | O nó alcança um ancestral na árvore DFS | Faz parte de um ciclo maior no SCC |
| **\`low[u] == ids[u]\`**| O nó é a raiz do SCC | Desempilha todos os nós do SCC |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Condensação de Grafo
- Ao colapsar cada SCC em um único super-nó, o grafo direcionado resultante é garantidamente um **DAG (Grafo Acíclico)**, permitindo aplicar ordenação topológica e algoritmos de caminho ótimo em grafos originalmente com ciclos.

#### Key Takeaways
- O Algoritmo de Tarjan tem complexidade $O(V + E)$ e requer apenas uma passagem DFS, sendo mais eficiente que o algoritmo de Kosaraju que necessita de duas passagens e do grafo transposto.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/graph-theory/CS-MATH-GRAPH-001.md', `---
id: CS-MATH-GRAPH-001
title: "Provas de Invariantes via Indução Matemática e Princípio da Casa dos Pombos"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
Como utilizar **Indução Matemática** e o **Princípio da Casa dos Pombos** para provar invariantes e limites em estruturas de dados e grafos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Indução Matemática**: Técnica de prova formal em 2 passos:
  1. *Caso Base*: Provar que a propriedade $P(n)$ é verdadeira para $n = 0$ ou $n = 1$.
  2. *Passo Indutivo*: Assumir que $P(k)$ é verdadeira (Hipótese de Indução) e demonstrar rigorosamente que $P(k+1)$ também é verdadeira.
  - *Exemplo*: Provar que uma árvore binária cheia com $L$ folhas possui exatamente $2L - 1$ nós totais.
- **Princípio da Casa dos Pombos (Pigeonhole Principle)**: Se $N$ pombos forem colocados em $M$ casas e $N > M$, então **ao menos uma casa conterá $\\ge 2$ pombos**.
  - *Exemplo*: Em qualquer grafo simples com $V \\ge 2$ nós, existem **ao menos dois vértices com exatamente o mesmo grau de conexões**.

### Dual Coding Visual
| Método de Prova | Estrutura Lógica | Aplicação em Engenharia de Software |
|---|---|---|
| **Indução Matemática** | Base $P(1)$ + Passo $P(k) \\implies P(k+1)$ | Prova de terminação e invariante de laços |
| **Casa dos Pombos** | $N > M \\implies \\ge \\lceil N/M \\rceil$ pombos em 1 casa | Prova de colisões de hash e ciclos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Prova via Pigeonhole: Ciclos em Grafos Finitos
- Se você percorrer um caminho de comprimento $V$ em um grafo com $V$ vértices, pela Casa dos Pombos você terá visitado $V + 1$ vértices no total.
- Como existem apenas $V$ vértices distintos no grafo, ao menos um vértice foi visitado duas vezes $\\implies$ **o caminho contém garantidamente um ciclo**!

#### Key Takeaways
- Provas por invariantes de laço são essenciais em entrevistas de algoritmos para demonstrar a corretude de algoritmos gulosos (*Greedy*) e de dois ponteiros.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/discrete-math/graph-theory/CS-MATH-GRAPH-004.md', `---
id: CS-MATH-GRAPH-004
title: "Relações de Equivalência e Disjoint Set Union (DSU / Union-Find)"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::meta
  - freq::high
---

## Pergunta
O que é uma **Relação de Equivalência** e como a estrutura **Disjoint Set Union (DSU)** implementa partição de conjuntos com compressão de caminho?

## Resposta
### Quick Answer
**Solução Direta**:
- **Relação de Equivalência ($\sim$)**: É uma relação binária que satisfaz 3 propriedades matemáticas axiomáticas:
  1. **Reflexividade**: $a \\sim a$.
  2. **Simetria**: $a \\sim b \\implies b \\sim a$.
  3. **Transitividade**: $a \\sim b \\land b \\sim c \\implies a \\sim c$.
  - Ela divide um conjunto em **classes de equivalência disjuntas** (partição exata).
- **Disjoint Set Union (DSU / Union-Find)**: Estrutura que mantém conjuntos disjuntos com duas operações:
  - **\`Find(u)\` com Path Compression**: Encontra o representante da classe e reconecta todos os nós do caminho diretamente à raiz.
  - **\`Union(u, v)\` por Rank**: Conecta a raiz da árvore mais baixa à raiz da árvore mais alta.
- **Complexidade**: Amortizado **$O(\\alpha(N))$ por operação** (onde $\\alpha$ é a Função de Ackermann Inversa, $\\alpha(N) < 5$ para qualquer $N$ no universo observável).

### Dual Coding Visual
| Operação DSU | Sem Otimização | Com Path Compression & Union-by-Rank |
|---|---|---|
| **\`Find(u)\`** | $O(N)$ (Árvore degenerada em lista) | $O(\\alpha(N)) \\approx O(1)$ Quase constante |
| **\`Union(u, v)\`** | $O(N)$ | $O(\\alpha(N)) \\approx O(1)$ Quase constante |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: DSU Completo e Idiomático
\`\`\`go
package main

type DSU struct {
  parent []int
  rank   []int
}

func NewDSU(n int) *DSU {
  parent := make([]int, n)
  rank := make([]int, n)
  for i := range parent {
    parent[i] = i
  }
  return &DSU{parent: parent, rank: rank}
}

func (d *DSU) Find(i int) int {
  if d.parent[i] != i {
    d.parent[i] = d.Find(d.parent[i]) // Path Compression
  }
  return d.parent[i]
}

func (d *DSU) Union(i, j int) bool {
  rootI, rootJ := d.Find(i), d.Find(j)
  if rootI == rootJ {
    return false // Já pertencem à mesma classe de equivalência
  }
  if d.rank[rootI] < d.rank[rootJ] {
    d.parent[rootI] = rootJ
  } else if d.rank[rootI] > d.rank[rootJ] {
    d.parent[rootJ] = rootI
  } else {
    d.parent[rootJ] = rootI
    d.rank[rootI]++
  }
  return true
}
\`\`\`

#### Key Takeaways
- DSU é a base do **Algoritmo de Kruskal** para Árvore Geradora Mínima (MST) e detecção dinâmica de conectividade em redes em tempo real.

</details>
`);

console.log('✅ Phase 2 Discrete Math module successfully decomposed!');
