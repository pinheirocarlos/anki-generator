import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Phase 2: CS Fundamentals - Architecture...');

// ==========================================
// 1. cpu-cache
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/architecture/cpu-cache/CS-ARCH-CACHE-000.md', `---
id: CS-ARCH-CACHE-000
title: "Hierarquia de Caches da CPU (L1/L2/L3) e Latências de Acesso"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::google
  - freq::high
---

## Pergunta
O que é a **hierarquia de memória da CPU (L1/L2/L3)** e por que ela existe na arquitetura de computadores moderna?

## Resposta
### Quick Answer
**Solução Direta**:
- A CPU opera na escala de frações de nanossegundo (~0.3ns por ciclo a 3.5GHz), enquanto a memória RAM principal leva de 50 a 100ns para responder (gargalo de Von Neumann).
- Para evitar que os núcleos fiquem ociosos (*CPU Stalls*), processadores integram múltiplos níveis de cache estático (SRAM) ultra-rápidos:
  - **L1 (Instruções/Dados)**: ~32-64 KB por núcleo, latência de ~1 ns (4 ciclos).
  - **L2**: ~512 KB - 1 MB por núcleo, latência de ~3-4 ns (12-14 ciclos).
  - **L3 (Shared/LLC)**: ~16-64 MB compartilhado entre todos os núcleos, latência de ~10-15 ns (40-60 ciclos).

### Dual Coding Visual
| Nível de Memória | Tamanho Típico | Latência de Acesso |
|---|---|---|
| **Registradores** | ~1-2 KB | ~0.3 ns (1 ciclo) |
| **Cache L1 / L2** | ~64 KB / 1 MB | ~1 a 4 ns |
| **Cache L3 (LLC)** | ~16 a 64 MB | ~10 a 15 ns |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental da Mesa de Trabalho
- **Registrador**: É o papel na sua mão agora.
- **Cache L1/L2**: É o caderno aberto sobre a sua mesa de trabalho.
- **Cache L3**: É a gaveta da sua escrivaninha.
- **RAM**: É a estante no corredor (você precisa levantar e andar até lá).
- **SSD/Disco**: É a biblioteca pública no centro da cidade.

#### Exemplo em Go: Impacto de Localidade Temporal
\`\`\`go
package main

// Acessar variáveis repetidas vezes mantém os dados em L1:
func sumRepeated(arr []int, iterations int) int {
  total := 0
  for k := 0; k < iterations; k++ {
    total += arr[0] // arr[0] permanece no cache L1 durante todo o laço
  }
  return total
}
\`\`\`

#### Key Takeaways
- O princípio que viabiliza os caches é a **localidade de referência** (temporal: dados acessados recentemente serão reutilizados; espacial: dados vizinhos serão acessados em seguida).

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/cpu-cache/CS-ARCH-CACHE-002.md', `---
id: CS-ARCH-CACHE-002
title: "Conceito e Mecânica de Cache Line (64 Bytes)"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::amazon
  - freq::high
---

## Pergunta
O que é uma **Cache Line** de 64 bytes e como ela afeta a transferência de dados entre a RAM e a CPU?

## Resposta
### Quick Answer
**Solução Direta**:
- A CPU nunca carrega bytes individuais da memória RAM; ela transfere dados exclusivamente em blocos de tamanho fixo chamados **Cache Lines** (geralmente **64 bytes** em arquiteturas x86 e ARM64).
- Quando você lê uma variável de 4 bytes (\`int32\`), o controlador de memória carrega a variável e os 60 bytes vizinhos alinhados na mesma linha de 64 bytes.
- Isso maximiza o aproveitamento da **localidade espacial**, tornando acessos a elementos contíguos de um array praticamente gratuitos (Cache Hits em L1).

### Dual Coding Visual
| Estrutura de Memória | Unidade de Transferência | Alinhamento Típico |
|---|---|---|
| **RAM para Cache L3/L2/L1** | 1 Cache Line | Blocos de 64 bytes |
| **Cache L1 para Registrador** | Palavra de CPU (Word) | 4 ou 8 bytes (32/64 bits) |
| **Disco para RAM (OS Page)** | 1 Página de Memória | 4.096 bytes (4 KB) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em C: Alinhamento de Estruturas
\`\`\`c
#include <stdio.h>

// Struct de 64 bytes cabe perfeitamente em 1 única Cache Line:
struct alignas(64) WorkerData {
  long counter;
  char padding[56];
};

int main() {
  printf("Tamanho da struct alinhada: %zu bytes\\n", sizeof(struct WorkerData)); // 64
  return 0;
}
\`\`\`

#### Key Takeaways
- Uma Cache Line é a menor unidade atômica de transferência e coerência na hierarquia de hardware.
- Se uma struct cruzar o limite de 64 bytes (*boundary split*), um único acesso exigirá a leitura de duas Cache Lines distintas.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/cpu-cache/CS-ARCH-CACHE-003.md', `---
id: CS-ARCH-CACHE-003
title: "Hardware Prefetching da CPU em Acessos Sequenciais"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::apple
  - freq::high
---

## Pergunta
Como o mecanismo de **Hardware Prefetching** da CPU acelera leituras sequenciais de arrays na memória RAM?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Hardware Prefetcher** é uma unidade dedicada de silício na CPU que monitora os padrões de acesso à memória.
- Ao detectar acessos sequenciais contínuos (ex: \`arr[0]\`, \`arr[1]\`, \`arr[2]\`), o prefetcher antecipa os próximos blocos e dispara comandos de leitura assíncronos para trazer as Cache Lines futuras da RAM para o cache L2/L1 antes que o programa execute as instruções de leitura.
- Isso oculta a latência de ~60ns da RAM, permitindo que a CPU processe arrays em velocidade próxima ao limite de largura de banda do barramento.

### Dual Coding Visual
| Padrão de Acesso | Comportamento do Prefetcher | Taxa de Cache Miss |
|---|---|---|
| **Linear Sequencial (\`arr[i++]\`)** | Antecipação com 100% de precisão | Próxima de 0% (quase nula) |
| **Aleatório / Ponteiros (\`node->next\`)** | Impossível prever o próximo endereço | Alta (~50-100ns de espera) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Impacto Prático de Benchmark
\`\`\`text
Iteração em 10.000.000 de inteiros:
1. Array Contíguo (Linear Prefetching ativo):  ~3.2 ms
2. Array Aleatório / Lista Encadeada (No Prefetch): ~48.0 ms (~15x mais lento!)
\`\`\`

#### Key Takeaways
- Para que o Prefetcher funcione com eficiência máxima, prefira estruturas lineares e evite passos (*strides*) gigantescos ou saltos aleatórios de ponteiros.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/cpu-cache/CS-ARCH-CACHE-001.md', `---
id: CS-ARCH-CACHE-001
title: "False Sharing em Multi-Core e Mitigação por Padding de Cache Line"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::meta
  - freq::high
---

## Pergunta
O que é o fenômeno destrutivo de **False Sharing** em sistemas multi-core e como mitigá-lo com alinhamento e padding de memória?

## Resposta
### Quick Answer
**Solução Direta**:
- **False Sharing**: Ocorre quando duas threads em núcleos de CPU diferentes modificam variáveis independentes que residem por acaso na **mesma Cache Line de 64 bytes**.
- Embora as variáveis sejam distintas no código (ex: \`a\` e \`b\`), o hardware invalida a Cache Line inteira a cada escrita através do protocolo de coerência (MESI), forçando recargas contínuas e degradando brutalmente a performance.
- **Mitigação**: Inserir **padding de 64 bytes** (ex: \`[8]uint64\` em Go ou \`@Contended\` em Java) ou alinhar as estruturas para garantir que variáveis concorrentes fiquem em Cache Lines isoladas.

### Dual Coding Visual
| Cenário Multi-Thread | Disposição na Memória | Impacto de Performance |
|---|---|---|
| **False Sharing Ativo** | Variáveis concorrentes na mesma linha (64B) | Invalidação constante da Cache Line |
| **Isolamento com Padding** | Linhas de 64B separadas por padding | Zero contenção de coerência no barramento |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Mitigando False Sharing com Padding
\`\`\`go
package main

// ESTRUTURA COM FALSE SHARING (Invalidação mútua a cada incremento):
type BadCounters struct {
  c1 uint64 // 8 bytes
  c2 uint64 // 8 bytes (reside na mesma Cache Line de 64B que c1)
}

// ESTRUTURA OTIMIZADA (Cada contador tem sua própria Cache Line de 64B):
type GoodCounters struct {
  c1 uint64
  _  [7]uint64 // 56 bytes de padding preenchendo a linha de 64B
  c2 uint64
  _  [7]uint64 // 56 bytes de padding preenchendo a linha de 64B
}
\`\`\`

#### Key Takeaways
- Em Java, a anotação \`@jdk.internal.vm.annotation.Contended\` adiciona padding automático de 128 bytes para evitar False Sharing em classes de alta concorrência como \`LongAdder\` e \`ConcurrentHashMap\`.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/cpu-cache/CS-ARCH-CACHE-004.md', `---
id: CS-ARCH-CACHE-004
title: "Protocolo de Coerência de Cache MESI (Modified, Exclusive, Shared, Invalid)"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::google
  - freq::high
---

## Pergunta
Como o protocolo de coerência de cache **MESI** coordena a consistência de dados entre caches L1/L2 em múltiplos núcleos de CPU?

## Resposta
### Quick Answer
**Solução Direta**:
- O protocolo **MESI** atribui um de quatro estados a cada Cache Line presente nos caches locais dos núcleos:
  - **M (Modified)**: A linha foi alterada no cache local e está divergente da RAM principal; nenhum outro núcleo a possui.
  - **E (Exclusive)**: A linha está idêntica à RAM principal e presente **apenas** neste núcleo.
  - **S (Shared)**: A linha está idêntica à RAM e pode estar presente no cache de múltiplos núcleos (apenas leitura).
  - **I (Invalid)**: A linha contém dados obsoletos e não pode ser lida (deve ser recarregada).
- Quando um núcleo grava em uma linha no estado **Shared**, ele transmite uma mensagem de invalidação (*Bus Invalidate*) no barramento, forçando todos os outros núcleos a marcar sua cópia como **Invalid**.

### Dual Coding Visual
| Estado MESI | No Cache Local? | Modificado vs RAM? |
|---|---|---|
| **Modified (M)** | Válido e Exclusivo | Sim (Pendente de Flush) |
| **Exclusive (E)**| Válido e Exclusivo | Não (Cópia Limpa) |
| **Shared (S)**   | Válido em Múltiplos Núcleos | Não (Cópia Limpa) |
| **Invalid (I)**  | Inválido (Requer Recarga) | Indiferente |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Transição de Estados no Barramento
1. **Leitura inicial (Núcleo 0)**: Busca na RAM $\rightarrow$ entra no estado **Exclusive (E)**.
2. **Leitura concorrente (Núcleo 1)**: Núcleo 0 escuta no barramento (*snooping*) $\rightarrow$ ambas as linhas passam para **Shared (S)**.
3. **Escrita (Núcleo 0)**: Núcleo 0 emite *Invalidate* $\rightarrow$ Núcleo 1 muda para **Invalid (I)**, Núcleo 0 muda para **Modified (M)**.

#### Key Takeaways
- O tráfego de mensagens de invalidação no barramento (*Interconnect Traffic*) é o principal gargalo de escalabilidade linear em CPUs com dezenas de núcleos.

</details>
`);

// ==========================================
// 2. pipelining-branch-prediction
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/architecture/pipelining-branch-prediction/CS-ARCH-PIPE-000.md', `---
id: CS-ARCH-PIPE-000
title: "Pipeline de Instruções da CPU e Paralelismo Temporal"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::amazon
  - freq::high
---

## Pergunta
O que é o **Pipeline de Instruções** da CPU e como ele aumenta o throughput de execução através do paralelismo temporal?

## Resposta
### Quick Answer
**Solução Direta**:
- O pipeline divide a execução de cada instrução de máquina em estágios sequenciais discretos (tipicamente 5 estágios clássicos de RISC):
  1. **IF (Instruction Fetch)**: Busca a instrução na memória/cache L1i.
  2. **ID (Instruction Decode)**: Decodifica o opcode e lê os registradores.
  3. **EX (Execute)**: Executa a operação aritmética ou lógica na ALU.
  4. **MEM (Memory Access)**: Lê ou grava dados na memória/cache L1d.
  5. **WB (Write Back)**: Escreve o resultado final de volta nos registradores.
- Em vez de esperar uma instrução completar todos os 5 ciclos para iniciar a próxima, a CPU inicia uma nova instrução a cada ciclo de clock, completando idealmente **1 instrução por ciclo (IPC = 1)** em regime contínuo.

### Dual Coding Visual
| Estágio de Pipeline | Função Principal | Recurso de Hardware |
|---|---|---|
| **IF / ID** | Busca e decodificação da instrução | Cache L1i + Decodificador |
| **EX** | Execução aritmética / cálculo de salto | ALU / Unidade de Branch |
| **MEM / WB** | Acesso à memória e escrita em registrador | Cache L1d + Register File |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia da Linha de Montagem de Carros
- Se 1 trabalhador montar um carro do início ao fim (chassi, motor, pintura, rodas), leva 10 horas para produzir 1 carro.
- Se houver uma linha de montagem com 10 estações especializadas de 1 hora cada, o primeiro carro demora 10 horas, mas a partir daí sai **1 carro novo a cada hora**.

#### Key Takeaways
- O pipeline não reduz o tempo de latência individual de uma instrução (continua levando $K$ ciclos), mas multiplica o **throughput global** por $K$.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/pipelining-branch-prediction/CS-ARCH-PIPE-002.md', `---
id: CS-ARCH-PIPE-002
title: "Hazards Estruturais e de Dados (RAW) no Pipeline e Bypassing da ALU"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::google
  - freq::high
---

## Pergunta
O que são **Hazards Estruturais e de Dados (RAW)** no pipeline da CPU e como a técnica de *Forwarding/Bypassing* resolve dependências?

## Resposta
### Quick Answer
**Solução Direta**:
- **Hazards**: São conflitos que impedem a próxima instrução de executar no ciclo de clock esperado, forçando a inserção de bolhas de espera (*Pipeline Stalls / NOPs*).
- **Hazard Estrutural**: Dois estágios disputam o mesmo recurso físico (resolvido por caches L1 separados: L1-Instrução e L1-Dados na arquitetura Harvard).
- **Hazard de Dados (RAW - Read After Write)**: Uma instrução precisa do resultado de uma instrução anterior que ainda não terminou o estágio Write-Back.
- **Forwarding (Bypassing)**: Circuito de hardware que conecta a saída da ALU diretamente à entrada da ALU para a próxima instrução, eliminando 2 ciclos de espera sem precisar aguardar a gravação no registrador.

### Dual Coding Visual
| Tipo de Hazard | Causa Primária | Solução de Hardware |
|---|---|---|
| **Structural Hazard** | Conflito por recurso de hardware | Caches L1i e L1d fisicamente separados |
| **Data Hazard (RAW)** | Dependência de cálculo anterior | Forwarding/Bypassing direto da ALU |
| **Control Hazard** | Desvio condicional incerto | Branch Predictor especulativo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Assembly: Dependência RAW
\`\`\`text
ADD R1, R2, R3   ; R1 = R2 + R3 (Resultado pronto no final do estágio EX)
SUB R4, R1, R5   ; R4 = R1 - R5 (Precisa de R1 imediatamente no estágio EX)

Sem Forwarding: SUB precisa esperar 2 ciclos (NOP, NOP) até R1 ser gravado em WB.
Com Forwarding: Saída da ALU do ADD é encaminhada diretamente para a entrada da ALU do SUB.
\`\`\`

#### Key Takeaways
- Compiladores modernos reordenam instruções independentes para preencher possíveis bolhas (*Delay Slots*) sem alterar a semântica do programa.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/pipelining-branch-prediction/CS-ARCH-PIPE-001.md', `---
id: CS-ARCH-PIPE-001
title: "Penalidade de Branch Misprediction e Código Branchless"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::meta
  - freq::high
---

## Pergunta
Por que a penalidade de **Branch Misprediction** degrada a performance da CPU e como escrever código *Branchless* para caminhos críticos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Branch Misprediction Penalty**: Quando a CPU encontra um desvio condicional (\`if/else\`), o preditor de saltos especula o caminho mais provável. Se a previsão estiver errada, a CPU deve descartar (*flush*) todas as 15 a 20 instruções em voo no pipeline longo, desperdiçando **15 a 20 ciclos de clock**.
- **Código Branchless**: Técnica que substitui estruturas de decisão condicionais por operações aritméticas, bitwise ou instruções de seleção condicional em hardware (\`CMOV - Conditional Move\`), executando em tempo estritamente constante e imune a erros de predição.

### Dual Coding Visual
| Estratégia | Instruções Geradas | Penalidade em Dados Aleatórios |
|---|---|---|
| **Com Branch (\`if/else\`)** | \`CMP\` + \`JNE\` (Salto condicional) | ~15-20 ciclos a cada erro de predição |
| **Branchless (\`CMOV\` / Bitwise)**| \`CMP\` + \`CMOV\` ou Máscara Bitwise | 1 ciclo fixo (Zero risco de flush) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Função Max Branching vs Branchless
\`\`\`go
package main

// 1. Com Branch (Sujeito a Misprediction se a e b forem imprevisíveis):
func maxBranch(a, b int) int {
  if a > b {
    return a
  }
  return b
}

// 2. Branchless via Bitwise (Executa sem nenhum salto condicional):
func maxBranchless(a, b int) int {
  diff := a - b
  mask := diff >> 63 // -1 se a < b, 0 se a >= b (em arquitetura 64-bit)
  return a - (diff & mask)
}
\`\`\`

#### Key Takeaways
- Ordenar dados antes de processar laços condicionais transforma desvios imprevisíveis em branches 99% previsíveis, acelerando a execução em até 6x.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/pipelining-branch-prediction/CS-ARCH-PIPE-003.md', `---
id: CS-ARCH-PIPE-003
title: "Instruções Vetoriais SIMD (Single Instruction Multiple Data)"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::apple
  - freq::high
---

## Pergunta
O que é uma **Instrução SIMD** (*Single Instruction, Multiple Data*) e como ela acelera processamento massivo de vetores?

## Resposta
### Quick Answer
**Solução Direta**:
- **SIMD**: Paradigma de computação paralela em nível de instrução onde uma única instrução de CPU é aplicada simultaneamente sobre múltiplos elementos de dados empacotados em registradores largos.
- Em vez de somar dois inteiros de 32 bits por vez (modo escalar), extensões SIMD modernas (como **AVX-512** com 512 bits ou **ARM Neon** com 128 bits) carregam e somam **16 inteiros de 32 bits em 1 único ciclo de clock**.
- Essencial para computação gráfica, machine learning, codificação de áudio/vídeo e buscas analíticas em bancos colunares (ClickHouse/DuckDB).

### Dual Coding Visual
| Modelo de Execução | Largura de Registrador | Elementos Processados por Ciclo |
|---|---|---|
| **Escalar Padrão (x86-64)** | 64 bits | 1 valor escalar |
| **SIMD AVX-2 (256-bit)** | 256 bits | 8 inteiros de 32-bit ou 4 floats |
| **SIMD AVX-512 (512-bit)**| 512 bits | 16 inteiros de 32-bit ou 8 floats |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Mental: Soma Escalar vs SIMD
- **Escalar**: \`res[0] = a[0] + b[0]\`, depois \`res[1] = a[1] + b[1]\`, etc. (8 instruções separadas).
- **SIMD (AVX)**: \`_mm256_add_epi32(vecA, vecB)\` calcula \`res[0..7]\` em uma única operação paralela de hardware.

#### Key Takeaways
- Compiladores modernos realizam auto-vetorização (*Auto-Vectorization*) quando loops são simples, contíguos e livres de dependências cruzadas entre iterações.

</details>
`);

// ==========================================
// 3. cpu-internals-isa
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/architecture/cpu-internals-isa/CS-ARCH-CPU-000.md', `---
id: CS-ARCH-CPU-000
title: "Registradores de CPU e Calling Conventions (Caller-Saved vs Callee-Saved)"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::google
  - freq::high
---

## Pergunta
Qual é o papel dos **Registradores de Propósito Geral** e como a **Calling Convention** divide responsabilidades entre Caller e Callee?

## Resposta
### Quick Answer
**Solução Direta**:
- Registradores são as células de memória mais rápidas da CPU (~0.3ns), operando diretamente no pipeline de execução.
- Em x86-64 (System V ABI usada por Linux/macOS), a **Calling Convention** define o protocolo de passagem de argumentos e preservação de registradores:
  - **Passagem de Argumentos**: Os primeiros 6 argumentos inteiros/ponteiros são passados via registradores: \`RDI, RSI, RDX, RCX, R8, R9\`.
  - **Caller-Saved (Volatile)**: \`RAX, RCX, RDX, RSI, RDI, R8-R11\`. A função que chama deve salvá-los na Stack se quiser preservar seus valores após a chamada.
  - **Callee-Saved (Non-Volatile)**: \`RBX, RSP, RBP, R12-R15\`. A função chamada deve salvar e restaurar seus valores intactos antes de retornar.

### Dual Coding Visual
| Categoria de Registrador | Registradores Típicos (x86-64) | Responsabilidade de Preservação |
|---|---|---|
| **Passagem de Args (1-6)** | \`RDI, RSI, RDX, RCX, R8, R9\` | Caller fornece antes de \`CALL\` |
| **Caller-Saved (Temporários)**| \`RAX\` (Retorno), \`R10, R11\` | Função chamadora salva na Stack |
| **Callee-Saved (Preservados)**| \`RBX, RBP, R12-R15\` | Função chamada salva e restaura |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Assembly: Prólogo e Epílogo de Função
\`\`\`text
minha_funcao:
  push rbp          ; Salva o RBP antigo na Stack (Callee-Saved)
  mov rbp, rsp      ; Define o novo Stack Frame
  push rbx          ; Salva RBX porque a função vai utilizá-lo

  ; Corpo da função...
  mov eax, edi      ; Retorna o primeiro argumento (RDI) em EAX

  pop rbx           ; Restaura o valor original de RBX
  mov rsp, rbp      ; Desfaz o Stack Frame
  pop rbp           ; Restaura o RBP da função anterior
  ret               ; Retorna para o chamador
\`\`\`

#### Key Takeaways
- Seguir a Calling Convention garante interoperabilidade perfeita entre código compilado em C, Go, Rust e Assembly puro.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/cpu-internals-isa/CS-ARCH-CPU-002.md', `---
id: CS-ARCH-CPU-002
title: "Gestão de Stack Frames com Ponteiros RSP e RBP"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::amazon
  - freq::high
---

## Pergunta
Como a CPU gerencia **Stack Frames** utilizando os registradores de ponteiro de pilha (\`RSP\`) e ponteiro de base (\`RBP\`)?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Stack Frame** é o bloco de memória na pilha alocado dinamicamente para cada invocação de função ativa, guardando variáveis locais, parâmetros excedentes e endereço de retorno.
- **RSP (Stack Pointer)**: Aponta sempre para o **topo atual da pilha** (o endereço mais baixo alocado, já que a Stack cresce para baixo na memória).
- **RBP (Base / Frame Pointer)**: Aponta para a **base fixa do frame atual**, servindo como âncora estável para acessar variáveis locais (\`[rbp - 8]\`) e parâmetros passados na Stack (\`[rbp + 16]\`).

### Dual Coding Visual
| Registrador | Papel no Stack Frame | Variação Durante a Execução |
|---|---|---|
| **RSP (Stack Pointer)** | Topo dinâmico da pilha | Altera a cada \`PUSH\`, \`POP\` ou alocação |
| **RBP (Base Pointer)**  | Base fixa do frame corrente | Permanece constante no corpo da função |
| **RIP (Instruction Ptr)**| Próxima instrução a executar | Atualizado pelo hardware a cada ciclo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Layout da Stack em Memória (Cresce para Baixo)
\`\`\`text
[Endereço Alto]
  | Parâmetros excedentes (Arg 7, Arg 8...)
  | Endereço de Retorno (salvo pela instrução CALL)
  | RBP anterior (salvo pelo PUSH rbp) <-- RBP aponta aqui
  | Variável Local 1 [rbp - 8]
  | Variável Local 2 [rbp - 16]
  | ...
  v [RSP aponta aqui (Topo da Stack)]
[Endereço Baixo]
\`\`\`

#### Key Takeaways
- Compiladores modernos com otimização ativada podem omitir o RBP (\`-fomit-frame-pointer\`), liberando o registrador para uso geral e calculando offsets puramente a partir de RSP.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/cpu-internals-isa/CS-ARCH-CPU-003.md', `---
id: CS-ARCH-CPU-003
title: "Comparação de Filosofia de ISA: x86-64 (CISC) vs ARM64 (RISC)"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::apple
  - freq::high
---

## Pergunta
Quais são as diferenças fundamentais de filosofia de design entre arquiteturas **x86-64 (CISC)** e **ARM64 (RISC)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **x86-64 (CISC - Complex Instruction Set Computer)**:
  - Instruções de tamanho variável (1 a 15 bytes) que realizam operações complexas (ex: ler da memória, somar e salvar em 1 instrução).
  - Menor quantidade de registradores gerais (16 registradores).
  - Hardware interno mais denso com decodificadores complexos que traduzem instruções CISC em micro-operações ($\mu\text{ops}$).
- **ARM64 (RISC - Reduced Instruction Set Computer)**:
  - Arquitetura estrita **Load/Store**: operações aritméticas só ocorrem entre registradores; apenas instruções dedicadas (\`LDR\`/\`STR\`) tocam a memória.
  - Instruções com tamanho fixo (sempre 4 bytes / 32 bits), facilitando a decodificação paralela e reduzindo consumo de energia.
  - 31 registradores de propósito geral (\`X0\` a \`X30\`).

### Dual Coding Visual
| Característica | x86-64 (Intel / AMD) | ARM64 / AArch64 (Graviton / Apple) |
|---|---|---|
| **Filosofia ISA** | CISC (Complexo) | RISC (Reduzido / Load-Store) |
| **Tamanho da Instrução** | Variável (1 a 15 bytes) | Fixo (4 bytes) |
| **Registradores Gerais** | 16 (\`RAX\` a \`R15\`) | 31 (\`X0\` a \`X30\`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que Servidores Cloud Estão Migrando para ARM (AWS Graviton)
- O tamanho fixo de instruções e o modelo simples de decodificação permitem criar processadores com núcleos menores, mais eficientes e com menor dissipação térmica.
- Isso possibilita empacotar até 128 núcleos físicos em um único soquete com custo por computação 20% a 40% menor que processadores x86 legados.

#### Key Takeaways
- Internamente, CPUs x86 modernas também executam um núcleo RISC, traduzindo instruções x86 complexas em $\mu\text{ops}$ na camada de decodificação de hardware.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/cpu-internals-isa/CS-ARCH-CPU-001.md', `---
id: CS-ARCH-CPU-001
title: "Arquitetura NUMA (Non-Uniform Memory Access) e Afinidade de CPU"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::netflix
  - freq::high
---

## Pergunta
Como a arquitetura **NUMA (Non-Uniform Memory Access)** impacta a latência em servidores multi-socket e como o *CPU Pinning* mitiga a contenção?

## Resposta
### Quick Answer
**Solução Direta**:
- **NUMA**: Em servidores com múltiplos soquetes de CPU, a memória RAM física é particionada em nós (*NUMA Nodes*), com cada banco conectado diretamente ao controlador de uma CPU específica.
- **Acesso Local vs Remoto**:
  - *Local Node*: A CPU acessa seu próprio banco de RAM com latência mínima (~60-80ns).
  - *Remote Node*: Para ler dados na RAM de outro soquete, a requisição trafega pelo barramento de interconexão (UPI/Infinity Fabric), gerando **latência 2x a 3x maior** (~150-250ns).
- **CPU Pinning / Thread Affinity**: Vincular processos ou threads a núcleos de um único nó NUMA específico (via comando \`numactl\` ou syscall \`sched_setaffinity\`), garantindo alocação estritamente local de memória.

### Dual Coding Visual
| Tipo de Acesso NUMA | Caminho do Barramento | Latência Típica |
|---|---|---|
| **Local Memory Access** | CPU $\rightarrow$ RAM Local | ~60 a 80 ns |
| **Remote Memory Access**| CPU 0 $\rightarrow$ Interconnect $\rightarrow$ CPU 1 $\rightarrow$ RAM 1 | ~160 a 240 ns |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Linux: Executando com Isolamento NUMA
\`\`\`bash
# Executa o banco de dados vinculado exclusivamente aos núcleos do Nó 0 com memória local:
numactl --cpunodebind=0 --membind=0 ./meu_banco_de_dados
\`\`\`

#### Exemplo em Go: Definindo Afinidade de Thread
\`\`\`go
package main

import (
  "runtime"
)

func lockToThread() {
  // Fixa a goroutine atual a uma OS Thread exclusiva para evitar migração entre núcleos NUMA:
  runtime.LockOSThread()
}
\`\`\`

#### Key Takeaways
- Em bancos de dados de alta vazão (PostgreSQL, Redis, ScyllaDB), desbalanceamento NUMA descontrolado pode causar quedas abruptas de throughput de 50% por saturação do barramento de interconexão.

</details>
`);

// ==========================================
// 4. storage-io-hierarchy
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/architecture/storage-io-hierarchy/CS-ARCH-IO-000.md', `---
id: CS-ARCH-IO-000
title: "Diferenças Mecânicas e Latências: HDD Mecânico vs SSD NVMe"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::netflix
  - freq::high
---

## Pergunta
Qual a diferença fundamental de mecânica e latência entre um **HDD mecânico** e um **SSD NVMe**?

## Resposta
### Quick Answer
**Solução Direta**:
- **HDD Mecânico**: Depende de componentes físicos móveis (discos magnéticos girando a 7.200-15.000 RPM e um braço atuador mecânico). A leitura aleatória exige mover o cabeçote (*Seek Time*) e esperar a rotação do disco, resultando em latência de **~5 a 10 milissegundos (ms)**.
- **SSD NVMe**: Construído com chips de memória Flash NAND em estado sólido sem peças móveis, comunicando-se diretamente pelo barramento PCIe de alta velocidade com milhares de filas de comandos paralelas, entregando latência de **~10 a 50 microssegundos (µs)** (~100x a 1000x mais rápido).

### Dual Coding Visual
| Meio de Armazenamento | Latência Típica | IOPS Típico |
|---|---|---|
| **HDD Mecânico** | ~10.000 µs (10 ms) | ~75 a 200 IOPS |
| **SSD SATA III** | ~500 µs (0.5 ms) | ~50.000 a 100.000 IOPS |
| **SSD NVMe (PCIe 4/5)** | ~20 µs (0.02 ms) | ~500.000 a 1.500.000 IOPS |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental do Toca-Discos vs Chip de Silício
- **HDD**: É como um toca-discos de vinil antigo. Se você quiser trocar de faixa aleatoriamente, a agulha precisa levantar fisicamente, viajar até o meio do disco e esperar o sulco correto passar embaixo dela.
- **SSD NVMe**: É como acessar diretamente uma matriz de lâmpadas elétricas onde você acende o interruptor do endereço desejado na velocidade dos elétrons.

#### Key Takeaways
- O protocolo NVMe suporta até 64.000 filas de comandos com 64.000 comandos cada, explorando paralelismo massivo em sistemas multi-core.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/storage-io-hierarchy/CS-ARCH-IO-002.md', `---
id: CS-ARCH-IO-002
title: "Vantagens de Performance de I/O Sequencial vs Aleatório em Discos"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::amazon
  - freq::high
---

## Pergunta
Por que acessos de I/O **Sequenciais** são ordens de grandeza mais rápidos que acessos **Aleatórios** tanto em HDDs quanto em SSDs?

## Resposta
### Quick Answer
**Solução Direta**:
- **Em HDDs**: O acesso sequencial mantém o braço mecânico imóvel enquanto o disco gira continuamente sob o cabeçote, atingindo até 200 MB/s. No acesso aleatório, cada busca exige deslocar o braço (*Seek Time*), derrubando a taxa efetiva para ~1-2 MB/s.
- **Em SSDs**: Embora não haja braço móvel, a memória Flash organiza dados em *Páginas (4-16 KB)* e *Blocos (2-8 MB)*. Leituras sequenciais ativam múltiplos canais NAND em paralelo e o *Read-Ahead* do controlador; escritas sequenciais evitam fragmentação e o custo severo de *Garbage Collection / Write Amplification* da controladora SSD.

### Dual Coding Visual
| Tipo de Acesso | Comportamento em HDD | Comportamento em SSD NVMe |
|---|---|---|
| **I/O Sequencial** | Braço parado, leitura contínua (~200 MB/s) | Canais NAND em paralelo máximo (~5.000 MB/s) |
| **I/O Aleatório** | Reposicionamento constante do braço (~1 MB/s) | Sobrecarga de lookup e GC Flash (~300-800 MB/s) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implicações em Arquitetura de Software
- Esta diferença fundamental é o motivo pelo qual sistemas distribuídos de altíssimo throughput (como **Apache Kafka**, **Cassandra**, **LSM-Trees**) desenham todas as suas estruturas de armazenamento como **Append-Only Logs** sequenciais.

#### Key Takeaways
- Mesmo em SSDs NVMe de última geração, gravações sequenciais têm throughput 3x a 5x maior e causam menor desgaste (*wear*) nas células NAND Flash.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/storage-io-hierarchy/CS-ARCH-IO-003.md', `---
id: CS-ARCH-IO-003
title: "Papel do OS Page Cache na Aceleração de I/O de Arquivos"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::meta
  - freq::high
---

## Pergunta
Como o **OS Page Cache** do kernel Linux acelera leituras e gravações de arquivos utilizando a memória RAM livre?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Page Cache** é uma camada de cache transparente gerenciada pelo kernel Linux que utiliza toda a memória RAM não alocada por processos para reter páginas (4 KB) lidas ou gravadas no disco.
- **Leituras**: Se uma página solicitada já estiver no Page Cache (*Cache Hit*), a resposta é entregue instantaneamente na velocidade da RAM (~100ns), sem tocar no disco físico.
- **Gravações**: Syscalls \`write()\` gravam imediatamente no Page Cache marcando as páginas como *Dirty Pages*, retornando sucesso instantâneo para a aplicação; threads de background do kernel (\`flusher/kswapd\`) descarregam as páginas no disco de forma assíncrona.

### Dual Coding Visual
| Operação de I/O | Fluxo com Page Cache (Padrão) | Latência Percebida pelo App |
|---|---|---|
| **Leitura com Cache Hit** | App $\leftarrow$ RAM Page Cache (Zero acesso ao disco) | ~100 ns |
| **Escrita Buffered** | App $\rightarrow$ Grava na RAM como *Dirty Page* | ~1 µs (Assíncrono) |
| **Leitura com Cache Miss**| App $\leftarrow$ Leitura física $\rightarrow$ Popula Page Cache | ~20 µs a 10 ms |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Forçando Sincronização Durável
\`\`\`go
package main

import "os"

func persistSecurely(file *os.File, data []byte) error {
  if _, err := file.Write(data); err != nil { // Grava no Page Cache do OS
    return err
  }
  // Invoca a syscall fsync() para forçar o flush imediato das Dirty Pages para o hardware:
  return file.Sync()
}
\`\`\`

#### Key Takeaways
- "RAM livre é RAM desperdiçada": O Linux aloca quase 100% da RAM disponível para o Page Cache e a desaloca instantaneamente se um processo solicitar mais memória.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/storage-io-hierarchy/CS-ARCH-IO-004.md', `---
id: CS-ARCH-IO-004
title: "Mecanismo de DMA (Direct Memory Access) para Transferência de Dados"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::google
  - freq::high
---

## Pergunta
Como o controlador **DMA (Direct Memory Access)** transfere dados entre armazenamento/rede e a memória RAM sem consumir ciclos da CPU?

## Resposta
### Quick Answer
**Solução Direta**:
- **DMA (Acesso Direto à Memória)**: É um controlador de hardware dedicado que permite a dispositivos periféricos (placas de rede, controladoras NVMe/SATA) transferir blocos de dados diretamente para/da memória RAM principal.
- **Sem DMA (Programmed I/O)**: A CPU teria que executar um laço instrução por instrução para copiar cada byte da porta do dispositivo para a RAM, consumindo 100% de um núcleo de processamento.
- **Com DMA**: A CPU apenas programa o controlador DMA com o endereço de origem, destino e tamanho do bloco, liberando-se imediatamente para executar outros processos. Quando a transferência termina, o DMA emite uma **interrupção de hardware (IRQ)** avisando a CPU.

### Dual Coding Visual
| Método de Transferência | Intervenção da CPU Durante a Transferência | Carga de CPU |
|---|---|---|
| **Programmed I/O (Sem DMA)** | CPU lê e grava cada byte individualmente em loop | 100% de uso de núcleo |
| **DMA (Direct Memory Access)**| CPU delega ao chip DMA e atende a interrupção final | Próxima de 0% |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental do Gerente e o Entregador
- **Sem DMA**: O gerente da empresa (CPU) desce até a calçada, pega caixa por caixa do caminhão de entregas e sobe a escada para guardar no estoque.
- **Com DMA**: O gerente apenas assina a ordem: *"Entregue 100 caixas no depósito 3 e me envie uma mensagem no WhatsApp quando terminar"*. O gerente continua trabalhando normalmente em relatórios!

#### Key Takeaways
- DMA é o pilar fundamental que viabiliza Zero-Copy, buffers circulares de placa de rede (*Ring Buffers de NIC*) e transferência de dados em redes de 100 Gbps.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/storage-io-hierarchy/CS-ARCH-IO-001.md', `---
id: CS-ARCH-IO-001
title: "Design de Append-Only Logs em Motores de Armazenamento (LSM-Trees / WAL)"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::meta
  - freq::high
---

## Pergunta
Por que sistemas como **Kafka** e motores **LSM-Trees (RocksDB)** convertem todas as mutações em gravações sequenciais (*Append-Only Log / WAL*)?

## Resposta
### Quick Answer
**Solução Direta**:
- Bancos de dados relacionais tradicionais baseados em **B-Trees** realizam escritas *in-place* aleatórias em páginas de 8/16 KB espalhadas pelo arquivo de dados, causando severa contenção de I/O aleatório e fragmentação.
- **Motores Log-Structured (LSM-Trees / Kafka)**:
  1. Todas as inserções, atualizações e deleções são gravadas exclusivamente no final de um arquivo sequencial (*Write-Ahead Log - WAL*).
  2. Mutações são mantidas em memória em uma estrutura ordenada (*MemTable*).
  3. Ao atingir um limite, a MemTable é descarregada no disco em arquivos imutáveis (*SSTables*) via I/O estritamente sequencial.
- Isso maximiza o throughput de gravação atingindo a vazão máxima teórica do SSD/HDD.

### Dual Coding Visual
| Estrutura de Armazenamento | Padrão de Escrita em Disco | Otimizado Para |
|---|---|---|
| **B-Tree Clássica (PostgreSQL / MySQL)** | In-Place Aleatório em páginas fixas | Leituras pontuais rápidas |
| **LSM-Tree / WAL (RocksDB / Kafka)** | Append-Only Estritamente Sequencial | Altíssimo throughput de gravação |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Escrita Sequencial de WAL
\`\`\`go
package main

import (
  "encoding/binary"
  "os"
)

type WALWriter struct {
  file *os.File
}

func (w *WALWriter) AppendEntry(payload []byte) error {
  length := uint32(len(payload))
  // Grava cabeçalho de tamanho + payload sequencialmente no final do log:
  if err := binary.Write(w.file, binary.BigEndian, length); err != nil {
    return err
  }
  _, err := w.file.Write(payload)
  return err
}
\`\`\`

#### Key Takeaways
- As deleções em LSM-Trees não removem dados imediatamente do arquivo; gravam um marcador de exclusão chamado **Tombstone**, que é consolidado posteriormente no processo em segundo plano de **Compaction**.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/architecture/storage-io-hierarchy/CS-ARCH-IO-005.md', `---
id: CS-ARCH-IO-005
title: "Direct I/O (O_DIRECT) e Evitação de Double Buffering em Bancos de Dados"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::netflix
  - freq::high
---

## Pergunta
Quando bancos de dados relacionais contornam o Page Cache do sistema operacional utilizando a flag **\`O_DIRECT\`**?

## Resposta
### Quick Answer
**Solução Direta**:
- Bancos de dados de alta performance (como **MySQL InnoDB**, **PostgreSQL** e **Oracle**) implementam seu próprio *Buffer Pool* gerenciado em userspace com políticas de substituição customizadas (ex: variantes avançadas de LRU-2Q).
- **Problema do Double Buffering**: Se o banco ler dados pelo I/O buffered padrão, 1 página de 16 KB residirá no *Buffer Pool* do banco e outra cópia idêntica residirá no *Page Cache* do kernel, desperdiçando 50% da memória RAM do servidor em dados duplicados.
- **\`O_DIRECT\`**: Flag do Linux que instrui a syscall \`open()\` a contornar integralmente o Page Cache do kernel, transferindo blocos diretamente entre a memória da aplicação e o disco via DMA.

### Dual Coding Visual
| Estratégia de I/O | Caminho dos Dados | Risco de Duplicação de RAM |
|---|---|---|
| **Buffered I/O (Padrão)** | Disco $\rightarrow$ Page Cache $\rightarrow$ Buffer Pool | Alto (Dupla cópia em RAM) |
| **Direct I/O (\`O_DIRECT\`)** | Disco $\rightarrow$ Buffer Pool (App Direct) | Zero (Cópia única e direta) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em C: Abertura com O_DIRECT
\`\`\`c
#define _GNU_SOURCE
#include <fcntl.h>
#include <unistd.h>
#include <stdlib.h>

void readDirect() {
  // Requer memória alinhada ao tamanho de bloco do setor de disco (ex: 4096 bytes):
  void* alignedBuffer;
  posix_memalign(&alignedBuffer, 4096, 4096);

  int fd = open("banco.db", O_RDONLY | O_DIRECT);
  read(fd, alignedBuffer, 4096);
  close(fd);
  free(alignedBuffer);
}
\`\`\`

#### Key Takeaways
- O uso de \`O_DIRECT\` impõe restrições estritas: os buffers de memória, offsets de arquivo e tamanhos de transferência devem ser múltiplos exatos do setor lógico do disco (normalmente 512 ou 4.096 bytes).

</details>
`);

console.log('✅ Phase 2 Architecture module successfully decomposed!');
