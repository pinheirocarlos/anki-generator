import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Phase 2: CS Fundamentals - OS & Memory (Part 1)...');

// ==========================================
// 1. virtual-memory
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/virtual-memory/CS-OS-VMEM-000.md', `---
id: CS-OS-VMEM-000
title: "Memória Virtual e Isolamento de Espaço de Endereçamento de Processos"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::meta
  - freq::high
---

## Pergunta
O que é **Memória Virtual** e por que os processos nunca acessam a memória RAM física diretamente?

## Resposta
### Quick Answer
**Solução Direta**:
- **Memória Virtual**: É uma abstração fornecida em conjunto pelo sistema operacional e pela unidade de hardware **MMU (Memory Management Unit)** que atribui a cada processo um **espaço de endereçamento linear contíguo e privado** (ex: 128 TB em sistemas de 64 bits).
- **Razões Primárias**:
  1. **Isolamento e Segurança**: Impede que um processo leia ou corrompa a memória de outros processos ou do próprio kernel (dispara *Segmentation Fault / SIGSEGV* em acessos ilegais).
  2. **Overcommit e Flexibilidade**: Permite alocar mais memória do que a RAM física instalada através de paginação sob demanda e Swap no disco.
  3. **Contiguidade Ilusória**: O programa vê sua memória como um bloco único contínuo, mesmo que os dados estejam espalhados em páginas fragmentadas na RAM.

### Dual Coding Visual
| Visão do Processo | Visão do Kernel / Hardware |
|---|---|
| Espaço contíguo privado de 0 a 128 TB | Páginas de 4 KB espalhadas na RAM física |
| Acesso a ponteiro \`0x7fff...\` | MMU traduz para endereço físico \`0x1a40...\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental do Escritório com Números Fictícios
- É como se cada funcionário de um prédio tivesse uma mesa com gavetas numeradas de 1 a 1.000.
- O funcionário pede o documento da "gaveta 50". O chefe de segurança (MMU) consulta a planilha secreta e busca o papel no armário real do subsolo 3, gaveta 912, sem que o funcionário saiba a localização física real.

#### Key Takeaways
- Nenhum software de userspace em sistemas operacionais modernos (Linux, Windows, macOS) possui acesso a endereços físicos de RAM.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/virtual-memory/CS-OS-VMEM-002.md', `---
id: CS-OS-VMEM-002
title: "Tabelas de Páginas Multinível e Tradução de Endereços pela MMU"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
Como a **MMU (Memory Management Unit)** e as **Tabelas de Páginas Multinível** traduzem endereços virtuais em endereços físicos de RAM?

## Resposta
### Quick Answer
**Solução Direta**:
- A memória é dividida em blocos de tamanho fixo chamados **Páginas Virtuais** e **Page Frames Físicos** (geralmente **4 KB**).
- **Tradução pela MMU**:
  1. O registrador especial da CPU **\`CR3\`** armazena o ponteiro para a raiz da Tabela de Páginas do processo ativo.
  2. Um endereço virtual de 48 bits em x86-64 é dividido em índices: \`PGD (Nível 4) -> PUD (Nível 3) -> PMD (Nível 2) -> PTE (Nível 1) + Offset de 12 bits\`.
  3. A MMU percorre a árvore de 4 níveis (*Page Table Walk*) para encontrar o endereço base do frame físico e soma o *Offset*, gerando o endereço real de RAM em hardware.

### Dual Coding Visual
| Estrutura | Função no Hardware |
|---|---|
| **Registrador \`CR3\`** | Aponta para a base da Tabela de Páginas do processo atual |
| **Page Table Walk (4 Níveis)**| Navegação por ponteiros da MMU para achar o frame |
| **Offset (12 bits inferiores)**| Localiza o byte exato dentro da página de 4.096 bytes |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que a Tabela é Multinível e Não Plana?
- Se a tabela de páginas fosse plana (um array único para 48 bits), cada processo precisaria de uma tabela de **512 GB** apenas para mapear seus ponteiros!
- Com arquitetura multinível em árvore, páginas de memória não alocadas pelo processo simplesmente não criam nós filhos, reduzindo o consumo de memória da tabela para poucos kilobytes.

#### Key Takeaways
- Como um *Page Table Walk* exige 4 acessos sequenciais à RAM (~200ns), a CPU utiliza o cache **TLB** para memorizar as últimas traduções.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/virtual-memory/CS-OS-VMEM-003.md', `---
id: CS-OS-VMEM-003
title: "Page Faults no Sistema Operacional (Minor vs Major Page Fault)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença entre um **Minor Page Fault** e um **Major Page Fault** no kernel Linux e qual o impacto de latência?

## Resposta
### Quick Answer
**Solução Direta**:
- **Page Fault**: É uma interrupção de hardware disparada pela MMU quando o processo tenta acessar uma página virtual cujo bit de presença (*Present Bit*) está zerado na Tabela de Páginas.
- **Minor Page Fault (Soft Fault)**:
  - A página de dados já está presente na memória RAM física (ex: no OS Page Cache ou alocação recente de \`malloc\`), mas ainda não estava mapeada na tabela do processo.
  - O kernel apenas atualiza a entrada da tabela e retoma o processo instantaneamente (**~1 a 5 µs**).
- **Major Page Fault (Hard Fault)**:
  - A página não está na RAM e precisa ser **lida fisicamente do disco ou partição de Swap**.
  - O processo é suspenso enquanto o driver de storage executa I/O de disco, gerando latência severa (**~20 µs em SSD NVMe a ~10 ms em HDD**).

### Dual Coding Visual
| Tipo de Page Fault | Origem do Dado | Latência Típica |
|---|---|---|
| **Minor Page Fault** | Já residente na RAM (Page Cache / Zeroed Page) | ~1 a 5 µs (Rápido) |
| **Major Page Fault** | Leitura física do SSD NVMe ou Swap | ~20 µs a 10 ms (Gargalo de I/O) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Alocação Tardia do Linux (Lazy Allocation)
- Quando você chama \`malloc(1024 * 1024 * 1024)\` (1 GB) em C/Go, o sistema operacional não aloca 1 GB de RAM física imediatamente; ele apenas reserva o espaço virtual.
- A memória física só é atribuída página a página conforme o seu código escreve em cada endereço, disparando Minor Page Faults controlados sob demanda (*Demand Paging*).

#### Key Takeaways
- Picos frequentes de Major Page Faults indicam que o servidor está sofrendo de **Thrashing de Memória** (esgotamento de RAM e saturação de Swap).

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/virtual-memory/CS-OS-VMEM-001.md', `---
id: CS-OS-VMEM-001
title: "TLB (Translation Lookaside Buffer) e Adoção de HugePages"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::netflix
  - freq::high
---

## Pergunta
O que é o **TLB (Translation Lookaside Buffer)** e por que bancos de dados de alta performance adotam **HugePages** de 2 MB ou 1 GB?

## Resposta
### Quick Answer
**Solução Direta**:
- **TLB (Translation Lookaside Buffer)**: É um cache associativo ultra-rápido de silício na CPU que memoriza as traduções recentes de *Endereço Virtual $\\to$ Endereço Físico*.
  - *TLB Hit*: Tradução resolvida em **~0.5 a 1 ns** (1 ciclo de clock).
  - *TLB Miss*: Exige percorrer a tabela de páginas de 4 níveis na RAM (*Page Table Walk*), custando **~50 a 100 ns**.
- **O Problema com Páginas Padrão de 4 KB**: Um servidor com 256 GB de RAM possui **67 milhões de páginas de 4 KB**. Como o TLB da CPU só guarda ~1.500 a 3.000 entradas, grandes bancos de dados sofrem com taxas massivas de TLB Miss.
- **HugePages (2 MB / 1 GB)**: Reduz a quantidade total de entradas necessárias em até $512\\times$ (para 2 MB) ou $262.144\\times$ (para 1 GB), garantindo que quase todo o *Buffer Pool* caiba nas entradas do TLB, acelerando o throughput do banco em **10% a 30%**.

### Dual Coding Visual
| Configuração de Página | Quantidade de Entradas para 64 GB | Cobertura Típica do TLB |
|---|---|---|
| **Página Padrão (4 KB)** | 16.777.216 páginas | < 0.1% da memória cabe no TLB |
| **HugePage (2 MB)** | 32.768 páginas | Quase 100% mapeável com poucas entradas |
| **HugePage (1 GB)** | 64 páginas | 100% no TLB (Zero TLB Misses) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Habilitar HugePages no Linux para PostgreSQL / Redis
\`\`\`bash
# Reserva 2048 HugePages de 2 MB (Total de 4 GB dedicados):
sudo sysctl -w vm.nr_hugepages=2048

# Verifica a alocação de HugePages no sistema:
grep -i HugePages /proc/meminfo
\`\`\`

#### Key Takeaways
- **Transparent Huge Pages (THP)** do kernel Linux tenta alocar páginas de 2 MB automaticamente, mas frequentemente causa picos de latência (*latency spikes*) em bancos de dados devido à compactação síncrona de memória; bancos como Redis e MongoDB recomendam desabilitar THP e usar HugePages estáticas.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/virtual-memory/CS-OS-VMEM-005.md', `---
id: CS-OS-VMEM-005
title: "Mapeamento de Arquivos com mmap() e Compartilhamento de Memória"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
Como funciona o mapeamento de arquivos em memória com a syscall **\`mmap()\`** e quais suas vantagens de performance?

## Resposta
### Quick Answer
**Solução Direta**:
- A syscall **\`mmap()\`** mapeia um arquivo do disco ou um bloco de memória anônima diretamente no espaço de endereçamento virtual do processo.
- **Vantagens de Performance**:
  1. **Elimina Cópia de Buffer (Zero Userspace Copy)**: Em vez de chamar \`read()\` para copiar bytes do Page Cache do kernel para o buffer da aplicação, o programa lê e escreve diretamente através de ponteiros de memória (\`*ptr\`).
  2. **Paginação sob Demanda (Lazy Loading)**: O arquivo de 100 GB não é carregado na RAM; apenas as páginas tocadas pelo código são trazidas do disco via Page Faults controlados.
  3. **Compartilhamento Inter-Processos (IPC)**: Múltiplos processos podem mapear o mesmo arquivo com a flag \`MAP_SHARED\`, compartilhando dados em $O(1)$ sem pipes ou sockets.

### Dual Coding Visual
| Estratégia de Leitura | Caminho dos Dados | Cópias de Memória |
|---|---|---|
| **Syscall \`read()\` Padrão** | Disco $\to$ Page Cache (Kernel) $\to$ Buffer (App) | 2 cópias |
| **Mapeamento via \`mmap()\`** | Disco $\to$ Page Cache $\to$ Ponteiro direto do App | 1 cópia única |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Leitura de Arquivo com mmap
\`\`\`go
package main

import (
  "fmt"
  "os"
  "syscall"
)

func main() {
  f, _ := os.Open("dados.bin")
  defer f.Close()
  stat, _ := f.Stat()

  // Mapeia o arquivo inteiro na memória virtual como somente leitura:
  data, _ := syscall.Mmap(int(f.Fd()), 0, int(stat.Size()), syscall.PROT_READ, syscall.MAP_SHARED)
  defer syscall.Munmap(data)

  // Acesso direto via slice de bytes em memória sem chamar read():
  fmt.Printf("Primeiro byte: %c\\n", data[0])
}
\`\`\`

#### Key Takeaways
- Motores de indexação e bancos embutidos (como **BoltDB**, **LMDB** e **Lucene**) utilizam \`mmap()\` para delegar todo o gerenciamento de cache de disco e paginação ao kernel Linux.

</details>
`);

// ==========================================
// 2. processes-threads
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/processes-threads/CS-OS-PROC-000.md', `---
id: CS-OS-PROC-000
title: "Diferença Fundamental entre Processo e Thread"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::uber
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre um **Processo** e uma **Thread** no sistema operacional?

## Resposta
### Quick Answer
**Solução Direta**:
- **Processo**: É uma instância de um programa em execução que possui seu **próprio espaço de endereçamento de memória virtual privado e isolado**, além de sua própria tabela de descritores de arquivos (FDs), variáveis de ambiente e privilégios de segurança.
- **Thread (Linha de Execução)**: É a menor unidade de escalonamento que o processador pode executar. Múltiplas threads pertencentes ao mesmo processo **compartilham o mesmo espaço de memória virtual (Heap, código, variáveis globais e FDs)**, possuindo apenas sua própria **Stack privativa** e conjunto de registradores de CPU.

### Dual Coding Visual
| Recurso do Sistema | Compartilhado entre Threads do mesmo Processo? | Isolado por Processo? |
|---|---|---|
| **Espaço de Memória (Heap / Código)** | Sim (Compartilhado) | Sim (Totalmente Isolado) |
| **Pilha de Execução (Stack Frame)**| Não (Privativo por Thread) | Sim (Isolado) |
| **Tabela de File Descriptors**| Sim (Compartilhado) | Sim (Isolado) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia da Casa e dos Moradores
- **Processo**: É uma casa cercada com muros altos. O que acontece dentro da casa 101 não afeta a casa 102.
- **Thread**: São os moradores da casa. Todos compartilham a mesma cozinha e geladeira (Heap compartilhado), mas cada um tem seu próprio quarto privativo (Stack de thread). Se dois moradores tentarem pegar o mesmo prato ao mesmo tempo sem conversar, ocorre conflito (*Race Condition*).

#### Key Takeaways
- Se uma thread sofrer um erro grave de ponteiro nulo ou violação de acesso (*Segmentation Fault*), o processo inteiro e todas as suas outras threads são terminados pelo sistema operacional.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/processes-threads/CS-OS-PROC-002.md', `---
id: CS-OS-PROC-002
title: "Goroutines e Green Threads vs Threads do Kernel do OS"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
O que são **Goroutines / Green Threads (Threads de Userspace)** e por que elas consomem apenas ~2 KB contra ~1 MB de uma Thread do Kernel?

## Resposta
### Quick Answer
**Solução Direta**:
- **OS Kernel Threads (1:1)**: Gerenciadas diretamente pelo kernel do sistema operacional. Cada thread aloca uma pilha de tamanho fixo grande (tipicamente **1 a 2 MB**) e sua alternância exige troca de modo (*Kernel Space Context Switch*).
- **Goroutines / Green Threads (M:N)**: Gerenciadas puramente em **Userspace** pelo runtime da linguagem (como Go ou Java Virtual Threads):
  - **Pilha Dinâmica Minúscula**: Iniciam com apenas **~2 KB de memória Stack** e crescem/encolhem dinamicamente sob demanda.
  - **Troca de Contexto Rápida**: A alternância ocorre em userspace sem invocar syscalls nem invalidar TLB, custando **~10 a 30 ns** contra ~1 a 2 µs de uma thread do SO.
- Permite que um único servidor execute **centenas de milhares de Goroutines simultâneas** consumindo poucos gigabytes de RAM.

### Dual Coding Visual
| Característica | OS Kernel Thread | Goroutine (Go Runtime) |
|---|---|---|
| **Consumo Inicial de Stack** | ~1.048.576 bytes (1 MB fixo) | ~2.048 bytes (2 KB dinâmico) |
| **Tempo de Troca de Contexto**| ~1.000 a 2.000 ns (Syscall / Kernel) | ~15 a 30 ns (Userspace puro) |
| **Capacidade por Servidor** | Poucas milhares (~5.000) | Centenas de milhares (~500.000+) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Criando 100.000 Concorrências em Segundos
\`\`\`go
package main

import (
  "sync"
  "time"
)

func main() {
  var wg sync.WaitGroup
  for i := 0; i < 100_000; i++ {
    wg.Add(1)
    go func() {
      defer wg.Done()
      time.Sleep(10 * time.Millisecond) // Ocupa apenas 2 KB de Stack
    }()
  }
  wg.Wait()
}
\`\`\`

#### Key Takeaways
- O modelo de Goroutines viabilizou a substituição do modelo de I/O reativo complexo baseado em callbacks pelo modelo síncrono bloqueante imperativo com concorrência massiva transparente.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/processes-threads/CS-OS-PROC-003.md', `---
id: CS-OS-PROC-003
title: "Estruturas de Dados do Kernel: PCB (Process Control Block) e TCB (Thread Control Block)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
Quais informações essenciais são salvas no **PCB (Process Control Block)** e no **TCB (Thread Control Block)** pelo sistema operacional?

## Resposta
### Quick Answer
**Solução Direta**:
- **PCB (Process Control Block - \`task_struct\` no Linux)**: Estrutura do kernel que representa o processo inteiro:
  - Identificador de processo (\`PID\`, \`PPID\`).
  - Ponteiro para a Tabela de Páginas de Memória Virtual (\`struct mm_struct\` / registrador \`CR3\`).
  - Tabela de File Descriptors abertos (\`struct files_struct\`).
  - Credenciais de segurança, permissões e estado de sinais Unix.
- **TCB (Thread Control Block)**: Estrutura que representa uma linha de execução dentro do processo:
  - Identificador de thread (\`TID\`).
  - Cópia salva dos registradores de CPU (\`RIP, RSP, RAX, RBX...\`).
  - Ponteiro para a Stack da thread.
  - Prioridade de escalonamento e afinidade de CPU.

### Dual Coding Visual
| Estrutura do Kernel | Dados Armazenados | Escopo |
|---|---|---|
| **PCB (\`task_struct\`)** | Memória virtual, FDs, credenciais, PID | Global para todo o processo |
| **TCB** | Registradores de CPU, Stack Pointer (\`RSP\`), TID | Exclusivo de cada thread |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como o Linux Trata Threads (\`clone()\` Syscall)
- No kernel Linux, não existe uma estrutura totalmente separada para threads; tanto processos quanto threads são instâncias de \`task_struct\`.
- Ao criar uma thread com a syscall \`clone()\`, o kernel simplesmente compartilha os ponteiros \`mm_struct\` (memória) e \`files_struct\` (arquivos) da struct mãe, usando as flags \`CLONE_VM\` e \`CLONE_FILES\`.

#### Key Takeaways
- Essa uniformidade arquitetural do Linux faz com que o escalonador CFS escalone \`tasks\` de maneira homogênea, sem penalidade extra entre threads e processos leves.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/processes-threads/CS-OS-PROC-001.md', `---
id: CS-OS-PROC-001
title: "Sobrecarga de Context Switch: Processo (CR3/TLB Flush) vs Thread"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
O que torna a **Troca de Contexto (Context Switch)** de um processo significativamente mais custosa do que a de uma thread?

## Resposta
### Quick Answer
**Solução Direta**:
- **Context Switch entre Threads do mesmo Processo**:
  - Salva e restaura apenas registradores de CPU e o Stack Pointer (\`RSP\`).
  - O espaço de memória virtual continua o mesmo; o registrador \`CR3\` **não é alterado** e o cache **TLB permanece intacto**. Custo: **~0.5 a 1 µs**.
- **Context Switch entre Processos Distintos**:
  1. *Troca de Registrador \`CR3\`*: Carrega a raiz da nova Tabela de Páginas do outro processo.
  2. *Invalidação do TLB (TLB Flush)*: Todas as traduções de endereços em cache no TLB são invalidadas.
  3. *Poluição de Caches L1/L2/L3*: O novo processo toca endereços de memória diferentes, causando uma avalanche de Cache Misses subsequentes. Custo: **~2 a 5 µs** + penalidade prolongada de cache misses.

### Dual Coding Visual
| Operação de Troca de Contexto | Entre Threads do mesmo Processo | Entre Processos Distintos |
|---|---|---|
| **Troca de Registradores de CPU** | Sim | Sim |
| **Troca de Registrador \`CR3\` (Memória)** | Não (Mesma memória) | **Sim (Nova Tabela de Páginas)** |
| **Invalidação do TLB** | Não (TLB preservado) | **Sim (Flush completo do TLB)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização de Hardware: PCID (Process-Context Identifiers)
- Processadores x86 modernos suportam a funcionalidade **PCID** (Process-Context Identifier), que etiqueta as entradas do TLB com um ID do processo.
- Isso permite alternar o registrador \`CR3\` sem descartar todo o cache do TLB, reduzindo o impacto de performance das trocas de contexto entre processos em até 30%.

#### Key Takeaways
- Em arquiteturas de micro-serviços com altíssima taxa de requisições, evitar processos pesados e adotar pools de threads ou runtimes concorrentes minimiza o desperdício de ciclos em context switches.

</details>
`);

// ==========================================
// 3. synchronization-primitives
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/synchronization-primitives/CS-OS-SYNC-000.md', `---
id: CS-OS-SYNC-000
title: "Race Conditions (Condições de Corrida) e Seções Críticas"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
O que é uma **Race Condition (Condição de Corrida)** e por que seções críticas de código exigem sincronização mútua?

## Resposta
### Quick Answer
**Solução Direta**:
- **Race Condition**: Ocorre quando duas ou mais threads ou processos acessam concorrentemente um recurso compartilhado (como uma variável em memória) e ao menos um acesso é de **escrita**, com o resultado final dependendo da ordem imprevisível de escalonamento dos núcleos da CPU.
- **Seção Crítica**: É o trecho de código que acessa a memória compartilhada.
- **Exclusão Mútua**: Regra que garante que **no máximo 1 thread** possa executar dentro da seção crítica em qualquer instante de tempo, impedindo que operações compostas não-atômicas (como \`read-modify-write\`) sejam intercaladas destrutivamente.

### Dual Coding Visual
| Thread 1 (Lê saldo = 100) | Thread 2 (Lê saldo = 100) | Saldo Real Gravado |
|---|---|---|
| Subtrai 20 (calcula 80) | Subtrai 50 (calcula 50) | Inconsistente! |
| Grava saldo = 80 | Grava saldo = 50 (Sobrescreve T1) | **Saldo final: 50 (Perdeu o débito de 20)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Race Condition Detectada pelo Detector Nativo
\`\`\`go
package main

import (
  "fmt"
  "sync"
)

func main() {
  counter := 0
  var wg sync.WaitGroup

  for i := 0; i < 1000; i++ {
    wg.Add(1)
    go func() {
      defer wg.Done()
      counter++ // DATA RACE! Operação de leitura + soma + escrita não atômica
    }()
  }
  wg.Wait()
  fmt.Println("Contador final:", counter) // Raramente será 1000!
}
\`\`\`

#### Como Testar com Race Detector
\`\`\`bash
go run -race main.go
\`\`\`

#### Key Takeaways
- Uma linha aparentemente inocente como \`counter++\` traduz-se em 3 instruções de máquina separadas (\`MOV\`, \`ADD\`, \`MOV\`), abrindo janela para intercalação concorrente.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/synchronization-primitives/CS-OS-SYNC-002.md', `---
id: CS-OS-SYNC-002
title: "Mutex (Exclusão Mútua) vs Semáforos Contadores"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::meta
  - freq::high
---

## Pergunta
Qual é a diferença essencial de comportamento e caso de uso entre um **Mutex** e um **Semáforo Contador**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Mutex (Mutual Exclusion Lock)**:
  - Primitiva de bloqueio com estado binário (0 ou 1).
  - Possui o conceito estrito de **Propriedade (*Ownership*)**: a **mesma thread** que adquiriu o lock com \`Lock()\` é a única autorizada a liberá-lo com \`Unlock()\`.
  - Usado para proteger seções críticas exclusivas em estruturas de dados.
- **Semáforo Contador (Counting Semaphore)**:
  - Mantém um contador de permissões disponíveis ($N$).
  - **Não possui propriedade**: qualquer thread pode sinalizar (\`Signal() / Post()\`) para incrementar o contador, permitindo que até $N$ threads acessem um recurso simultaneamente.
  - Usado para controle de concorrência limitada (ex: pool de 20 conexões de banco de dados) e sinalização entre threads produtoras e consumidoras.

### Dual Coding Visual
| Característica | Mutex | Semáforo Contador ($N$) |
|---|---|---|
| **Concorrência Máxima** | Exatamente 1 thread | Até $N$ threads simultâneas |
| **Conceito de Ownership** | Sim (Apenas quem trancou pode destrancar) | Não (Qualquer thread pode sinalizar) |
| **Caso de Uso Primário** | Proteger mutação de struct / variável | Rate limiting / Pool de conexões / Notificação |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Limitando Concorrência com Channel como Semáforo
\`\`\`go
package main

// Canal com buffer de tamanho 5 atua como semáforo contador de 5 slots:
type Semaphore chan struct{}

func NewSemaphore(limit int) Semaphore {
  return make(chan struct{}, limit)
}

func (s Semaphore) Acquire() { s <- struct{}{} }
func (s Semaphore) Release() { <-s }
\`\`\`

#### Key Takeaways
- Um Mutex não é simplesmente um semáforo binário com $N=1$; o Mutex garante propriedades extras de segurança contra liberação indevida por threads estranhas.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/synchronization-primitives/CS-OS-SYNC-003.md', `---
id: CS-OS-SYNC-003
title: "Read-Write Locks (RW-Lock) para Cenários Read-Heavy"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
O que é um **Read-Write Lock (RW-Lock)** e em que cenários de tráfego ele entrega maior throughput do que um Mutex exclusivo?

## Resposta
### Quick Answer
**Solução Direta**:
- Um **RW-Lock (\`RWMutex\`)** desacopla o acesso concorrente em dois modos distintos:
  - **Leitura Compartilhada (\`RLock\` / \`RUnlock\`)**: Múltiplas threads leitoras podem segurar o lock simultaneamente em paralelo, desde que não haja nenhuma escritora ativa.
  - **Escrita Exclusiva (\`Lock\` / \`Unlock\`)**: Apenas 1 thread escritora por vez; bloqueia todas as outras leitoras e escritoras.
- **Cenário Ideal**: Cargas de trabalho com **alta taxa de leitura e baixa taxa de escrita** (ex: 95% leituras / 5% escritas em tabelas de cache e configurações).
- Em cenários com muitas escritas, o RW-Lock pode ter performance inferior a um Mutex simples devido ao overhead de manter contadores atômicos de leitores.

### Dual Coding Visual
| Modo do Lock | Múltiplos Leitores Simultâneos? | Escritores Simultâneos? |
|---|---|---|
| **RLock (Leitura)** | **Sim (Ilimitados)** | Não (Bloqueia novos escritores) |
| **Lock (Escrita)**  | Não (Bloqueia todos os leitores) | **Exatamente 1 (Exclusivo)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Cache Concorrente Seguro com RWMutex
\`\`\`go
package main

import "sync"

type ThreadSafeCache struct {
  mu   sync.RWMutex
  data map[string]string
}

func (c *ThreadSafeCache) Get(key string) (string, bool) {
  c.mu.RLock() // 100 threads leem em paralelo sem bloquear umas às outras
  defer c.mu.RUnlock()
  val, ok := c.data[key]
  return val, ok
}

func (c *ThreadSafeCache) Set(key, val string) {
  c.mu.Lock() // Escrita exclusiva bloqueia leituras e escritas concorrentes
  defer c.mu.Unlock()
  c.data[key] = val
}
\`\`\`

#### Key Takeaways
- Para evitar *Writer Starvation* (onde um fluxo contínuo de novos leitores impede eternamente a escritora de adquirir o lock), implementações modernas de RW-Lock priorizam novos escritores.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/synchronization-primitives/CS-OS-SYNC-004.md', `---
id: CS-OS-SYNC-004
title: "Deadlocks e as 4 Condições de Coffman"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
O que é um **Deadlock** e quais são as 4 condições necessárias de Coffman para que ele ocorra?

## Resposta
### Quick Answer
**Solução Direta**:
- **Deadlock (Impasse)**: Situação de congelamento permanente onde duas ou mais threads ficam bloqueadas eternamente, com cada uma aguardando um recurso retido pela outra.
- **As 4 Condições de Coffman (Todas devem ser satisfeitas simultaneamente)**:
  1. **Exclusão Mútua**: Os recursos não podem ser compartilhados simultaneamente.
  2. **Posse e Espera (*Hold and Wait*)**: Uma thread retém um recurso enquanto aguarda outro.
  3. **Não-Preempção (*No Preemption*)**: Recursos não podem ser tomados à força de uma thread.
  4. **Espera Circular (*Circular Wait*)**: Existe um ciclo fechado de dependências ($T_1 \to R_2 \to T_2 \to R_1 \to T_1$).
- Quebrar **qualquer uma** das 4 condições torna o deadlock matematicamente impossível.

### Dual Coding Visual
| Thread | Recursos Retidos | Recursos Aguardados |
|---|---|---|
| **Thread 1** | Retém Lock A | Aguarda Lock B (Bloqueada) |
| **Thread 2** | Retém Lock B | Aguarda Lock A (Bloqueada) |
| **Resultado** | Ciclo Fechado: $T_1 \to B \to T_2 \to A \to T_1$ | **Deadlock Permanente** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Jantar dos Filósofos
- 5 filósofos sentados ao redor de uma mesa com 5 garfos (1 garfo entre cada par).
- Cada filósofo pega o garfo da sua esquerda e tenta pegar o da direita.
- Todos ficam segurando 1 garfo esperando o garfo vizinho ser solto $\to$ todos morrem de fome (*Deadlock clássico por espera circular*).

#### Key Takeaways
- A forma mais comum de prevenir deadlocks na prática de software é quebrar a **Espera Circular** através da regra estrita de **Lock Ordering** (adquirir locks sempre na mesma ordem global).

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/synchronization-primitives/CS-OS-SYNC-001.md', `---
id: CS-OS-SYNC-001
title: "Mecânica e Latência: Spinlock vs OS Mutex vs Futex no Linux"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::netflix
  - freq::high
---

## Pergunta
Qual é a diferença de consumo de CPU e latência entre um **Spinlock**, um **OS Mutex** clássico e um **Futex (Fast Userspace Mutex)** no Linux?

## Resposta
### Quick Answer
**Solução Direta**:
- **Spinlock**: Executa um laço ativo de CPU (\`busy-waiting\` com instrução \`PAUSE\`) testando atomicamente se o lock foi liberado.
  - *Vantagem*: Latência mínima (**~10 ns**); zero overhead de troca de contexto de syscall.
  - *Desvantagem*: Queima 100% de uso de núcleo de CPU enquanto espera; desastroso se a seção crítica demorar.
- **OS Mutex Clássico**: Dispara uma syscall imediata para suspender a thread no kernel (*Sleep*) e colocá-la na fila de espera.
  - *Desvantagem*: Custo fixo pesado de duas trocas de contexto (**~1 a 2 µs**).
- **Futex (Fast Userspace Mutex / Padrão Linux)**: O melhor dos dois mundos:
  1. No caminho feliz sem contenção: adquire o lock em **userspace puro com 1 instrução atômica CAS (~5 ns)** sem tocar no kernel.
  2. Apenas se houver colisão concorrente real: invoca a syscall \`futex(FUTEX_WAIT)\` para dormir no kernel.

### Dual Coding Visual
| Primitiva | Caminho Sem Contenção | Comportamento sob Contenção |
|---|---|---|
| **Spinlock** | CAS atômico (~5 ns) | Gira em loop ocupado (100% CPU) |
| **OS Mutex** | Syscall no kernel (~1 µs) | Suspende thread no kernel (0% CPU) |
| **Futex (Linux)** | CAS atômico puro (~5 ns) | Suspende via syscall futex (0% CPU) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Híbrido (Adaptive Mutex em Go e Java)
- Implementações modernas (como o \`sync.Mutex\` do Go e locks da JVM) utilizam uma abordagem adaptativa:
  - Giram em spinlock por alguns ciclos (ex: 30 tentativas rápidas) torcendo para a outra thread liberar o lock imediatamente.
  - Se o lock não for liberado rápido, desistem do spinlock e dormem usando o Futex do kernel, economizando CPU.

#### Key Takeaways
- Praticamente todas as primitivas de concorrência em Linux de Go (\`sync.Mutex\`), Rust (\`std::sync::Mutex\`), C++ (\`std::mutex\`) e Java são construídas sobre o Futex do kernel Linux.

</details>
`);

// ==========================================
// 4. lock-free-atomics
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/lock-free-atomics/CS-OS-ATOM-000.md', `---
id: CS-OS-ATOM-000
title: "Não-Atomicidade de count++ em Nível de Hardware"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
Por que uma operação simples como \`count++\` não é atômica no nível de hardware e instruções de máquina da CPU?

## Resposta
### Quick Answer
**Solução Direta**:
- Em linguagens compiladas (C, Go, Rust) e interpretadas (Java, Python), a instrução \`count++\` é decomposta pelo compilador em **3 passos discretos em Assembly**:
  1. **\`MOV EAX, [count]\` (Read)**: Copia o valor da variável da memória RAM/cache para o registrador da CPU.
  2. **\`ADD EAX, 1\` (Modify)**: A ALU soma 1 ao registrador.
  3. **\`MOV [count], EAX\` (Write)**: Grava o novo valor de volta na posição de memória.
- Se duas threads em núcleos diferentes executarem o passo 1 simultaneamente, ambas lerão o mesmo valor antigo (ex: 5) e ambas gravarão 6, perdendo 1 incremento (*Lost Update*).

### Dual Coding Visual
| Ciclo de CPU | Thread 1 vs Thread 2 | Memória \`count\` |
|---|---|---|
| **1-2 (Read)** | Ambas leem count (5) para registradores locais | 5 |
| **3 (Modify)** | Ambas somam 1 em seus registradores (6) | 5 |
| **4 (Write)** | Ambas gravam 6 na memória | **6 (Deveria ser 7!)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Instrução Atômica de Hardware (\`LOCK INC\`)
- Para tornar o incremento seguro em 1 única instrução de máquina x86 sem Mutex de software, o processador fornece o prefixo de barramento **\`LOCK\`**:
\`\`\`text
LOCK INC DWORD PTR [count]  ; Trava a Cache Line no barramento e incrementa atomicamente
\`\`\`

#### Key Takeaways
- Pacotes como \`sync/atomic\` em Go e \`AtomicInteger\` em Java invocam diretamente essas instruções de hardware (\`LOCK ADD\`, \`LOCK CMPXCHG\`).

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/lock-free-atomics/CS-OS-ATOM-002.md', `---
id: CS-OS-ATOM-002
title: "Instrução Compare-And-Swap (CAS) e Programação Lock-Free"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::meta
  - freq::high
---

## Pergunta
Como a instrução de hardware **Compare-And-Swap (CAS)** permite atualizar variáveis concorrentes sem adquirir nenhum Lock (*Lock-Free*)?

## Resposta
### Quick Answer
**Solução Direta**:
- **CAS (Compare-And-Swap / \`CMPXCHG\` em x86)**: É uma instrução atômica de hardware que recebe 3 parâmetros: \`endereço_memória\`, \`valor_esperado\` e \`novo_valor\`.
- **Lógica Atômica em Hardware**:
  - Se o valor atual na memória for **igual** ao \`valor_esperado\`, grava o \`novo_valor\` e retorna \`true\`.
  - Se o valor na memória foi alterado por outra thread, **não grava nada** e retorna \`false\`.
- **Laço Lock-Free (CAS Loop)**: A thread lê o valor atual, calcula a mutação e tenta o CAS em loop; se outra thread ganhar a corrida, o CAS falha e a thread repete o laço com o valor atualizado sem nunca ser suspensa pelo kernel.

### Dual Coding Visual
| Etapa do CAS Loop | Operação | Resultado se Houver Colisão |
|---|---|---|
| **1. Leitura** | \`old = *ptr\` | Obtém snapshot do valor |
| **2. Cálculo** | \`new = old + 1\` | Computa mutação em registrador local |
| **3. Tentativa CAS** | \`CAS(ptr, old, new)\` | Se \`*ptr != old\`, falha e reinicia loop |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Incremento Atômico via CAS Loop
\`\`\`go
package main

import (
  "sync/atomic"
)

func AtomicIncrement(addr *int64) int64 {
  for {
    oldVal := atomic.LoadInt64(addr)
    newVal := oldVal + 1
    // Tenta atualizar atomicamente se o valor ainda for oldVal:
    if atomic.CompareAndSwapInt64(addr, oldVal, newVal) {
      return newVal // Sucesso!
    }
    // Se falhar, outra thread alterou o valor; repete o laço sem dormir.
  }
}
\`\`\`

#### Key Takeaways
- Estruturas Lock-Free garantem que **ao menos uma thread do sistema faz progresso garantido a cada ciclo**, eliminando o risco de inversão de prioridade e deadlocks.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/lock-free-atomics/CS-OS-ATOM-001.md', `---
id: CS-OS-ATOM-001
title: "Memory Barriers / Fences e Visibilidade Volatile (Happens-Before)"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
O que são **Memory Barriers / Fences** e por que a semântica \`volatile\` / *Happens-Before* é mandatória para impedir reordenações da CPU e compilador?

## Resposta
### Quick Answer
**Solução Direta**:
- **Reordenação de Instruções**: Compiladores e CPUs modernas reordenam leituras e escritas (*Out-of-Order Execution*) para maximizar o uso do pipeline, desde que não quebrem o código sequencial de 1 única thread. Em ambiente multi-core, isso faz com que outra thread veja dados parcialmente gravados ou flags ativas fora de ordem.
- **Memory Barriers (Fences de CPU)**: Instruções de hardware (\`MFENCE\`, \`LFENCE\`, \`SFENCE\` em x86 ou \`DMB\` em ARM) que impõem restrições estritas de ordem:
  - *Acquire Fence*: Nenhuma leitura/escrita posterior pode ser movida para antes da barreira.
  - *Release Fence*: Nenhuma leitura/escrita anterior pode ser movida para depois da barreira.
- **Semântica \`volatile\` / Happens-Before**: Garante que qualquer escrita realizada antes da gravação de uma flag volátil se torne **imediatamente visível** para qualquer thread que leia essa flag em seguida.

### Dual Coding Visual
| Tipo de Barreira | Efeito na Ordem de Memória | Caso de Uso |
|---|---|---|
| **Release Barrier** | Impede escritas anteriores de passarem para baixo | Publicação de dados antes de ligar a flag \`ready\` |
| **Acquire Barrier** | Impede leituras posteriores de passarem para cima | Leitura da flag \`ready\` antes de ler os dados |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Bug Clássico do Double-Checked Locking sem Volatile (Java)
\`\`\`java
public class Singleton {
  private static volatile Singleton instance; // volatile é OBRIGATÓRIO!

  public static Singleton getInstance() {
    if (instance == null) {
      synchronized (Singleton.class) {
        if (instance == null) {
          // Sem volatile, a CPU pode reordenar a atribuição de memória antes
          // da execução do construtor, fazendo outra thread ver um objeto semipronto!
          instance = new Singleton();
        }
      }
    }
    return instance;
  }
}
\`\`\`

#### Key Takeaways
- O modelo de memória x86 é fortemente ordenado (*Total Store Order - TSO*), enquanto ARM64 é fracamente ordenado (*Weakly Ordered*), tornando bugs de falta de barreiras muito mais frequentes em CPUs Apple Silicon e Graviton.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/lock-free-atomics/CS-OS-ATOM-004.md', `---
id: CS-OS-ATOM-004
title: "O Problema ABA em Estruturas Lock-Free e Tagged Pointers"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::netflix
  - freq::high
---

## Pergunta
O que é o **Problema ABA** em estruturas de dados Lock-Free e como ponteiros versionados (*Tagged Pointers*) o eliminam?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema ABA**: Ocorre em algoritmos Lock-Free baseados em CAS quando uma thread $T_1$ lê o valor $A$, é suspensa, e durante a pausa:
  1. Outra thread $T_2$ altera o valor de $A$ para $B$.
  2. $T_2$ (ou outra thread) altera de volta de $B$ para $A$ (ou desaloca e recicla o mesmo endereço de memória de $A$).
  3. Quando $T_1$ acorda e executa \`CAS(ptr, A, C)\`, a instrução tem sucesso falso porque o ponteiro tem o mesmo valor $A$, mas o estado interno ou os nós subsequentes da estrutura foram completamente corrompidos!
- **Solução com Tagged Pointers / Versionamento**:
  - Armazenar junto com o ponteiro um **contador de versão / tag de 64 bits** que é incrementado monotonicamente a cada mutação: \`Pair(pointer, version)\`.
  - O CAS passa a validar o par completo: \`Double-Word CAS (DCAS / CMPXCHG16B)\`. Mesmo que o ponteiro volte para $A$, a versão será diferente ($A_1 \\to B_2 \\to A_3 \\neq A_1$), fazendo o CAS falhar com segurança.

### Dual Coding Visual
| Linha do Tempo | Ação Concorrente | Estado da Pilha |
|---|---|---|
| **$t_1$ (Leitura T1)** | T1 lê Topo = $A$ (aponta para $B$) | Pilha: $A \\to B$ |
| **$t_2$ (T2 Mutação)** | T2 remove $A$, remove $B$, reinsere $A$ reciclado | Pilha: $A \\to C$ |
| **$t_3$ (CAS Falso T1)**| T1 executa CAS(Topo, $A$, $B$) com sucesso falso | **Pilha corrompida ($A \\to B$ desalocado)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que Linguagens com Garbage Collector Sofrem Menos com ABA
- Em linguagens com GC (como Go e Java), enquanto a Thread 1 mantiver uma referência ao nó $A$, o coletor de lixo não desaloca nem recicla a memória de $A$ para um novo objeto, reduzindo drasticamente a ocorrência do problema ABA comparado a C/C++ com \`free()\`.
- Em Java, classes especializadas como \`AtomicStampedReference\` implementam Tagged Pointers nativamente.

#### Key Takeaways
- Sempre que você reciclar nós em memória (*Memory Pools / Free Lists*) em código Lock-Free, utilize Tagged Pointers ou Hazard Pointers para prevenir o problema ABA.

</details>
`);

console.log('✅ Phase 2 OS & Memory (Part 1) successfully decomposed!');

