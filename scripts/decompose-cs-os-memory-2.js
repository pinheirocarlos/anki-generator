import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Phase 2: CS Fundamentals - OS & Memory (Part 2)...');

// ==========================================
// 1. linux-io-syscalls
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/linux-io-syscalls/CS-OS-SYS-000.md', `---
id: CS-OS-SYS-000
title: "Transição User Space para Kernel Space em Syscalls no Linux"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
O que acontece na CPU durante a transição de **User Mode (Ring 3)** para **Kernel Mode (Ring 0)** ao executar uma Syscall?

## Resposta
### Quick Answer
**Solução Direta**:
- Processos de aplicação rodam em modo não-privilegiado (**Ring 3 / User Space**) sem permissão para tocar em hardware ou placas de rede.
- **Passo a Passo da Syscall (ex: instrução \`SYSCALL\` em x86-64)**:
  1. A aplicação coloca o número da syscall no registrador \`RAX\` e argumentos em \`RDI, RSI, RDX...\`.
  2. A CPU eleva seu nível de privilégio para **Ring 0 (Kernel Mode)** e salta para o endereço do tratador do kernel (*System Call Table*).
  3. A CPU troca da Stack de Userspace para a **Stack de Kernel** do processo.
  4. O kernel executa a operação protegida e retorna via \`SYSRET\`, restaurando o Ring 3.

### Dual Coding Visual
| Nível de Privilégio | Acesso a Hardware | Estrutura de Stack Ativa |
|---|---|---|
| **Ring 3 (User Space)** | Bloqueado (Dispara Trap de CPU) | Stack da Thread do Processo |
| **Ring 0 (Kernel Space)**| Irrestrito (Memória total / I/O) | Kernel Stack dedicada da Thread |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Custo de uma Syscall
- Uma syscall simples (como \`getpid()\`) consome em média **50 a 100 nanossegundos**.
- Em loops com milhões de iterações, fazer syscalls a cada byte destruirá o throughput da aplicação; por isso I/O em linguagens modernas utiliza buffers em userspace (\`bufio\` em Go, \`BufferedReader\` em Java).

#### Key Takeaways
- Syscalls são a única porta de entrada controlada e segura pela qual processos de userspace solicitam serviços ao sistema operacional.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/linux-io-syscalls/CS-OS-SYS-002.md', `---
id: CS-OS-SYS-002
title: "Zero-Copy no Linux com a Syscall sendfile()"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::netflix
  - freq::high
---

## Pergunta
Como a técnica de **Zero-Copy** com a syscall **\`sendfile()\`** transfere arquivos para a rede sem copiar bytes para o Userspace?

## Resposta
### Quick Answer
**Solução Direta**:
- **Caminho Tradicional (\`read()\` + \`write()\` = 4 cópias + 4 trocas de modo)**:
  1. Disco $\to$ Page Cache do Kernel (via DMA).
  2. Page Cache $\to$ Buffer de Userspace da Aplicação (Cópia pela CPU).
  3. Buffer de Userspace $\to$ Socket Buffer do Kernel (Cópia pela CPU).
  4. Socket Buffer $\to$ Placa de Rede NIC (via DMA).
- **Com \`sendfile()\` (Zero-Copy = 2 cópias DMA + 0 cópias de CPU)**:
  - O kernel transfere os dados diretamente do **Page Cache para a Placa de Rede (NIC)** via descritores de DMA com *Scatter-Gather*, sem transferir nenhum byte para a memória da aplicação.

### Dual Coding Visual
| Método de Transferência | Cópias de Dados na RAM | Trocas de Modo (Context Switches) |
|---|---|---|
| **\`read()\` + \`write()\`** | 4 cópias (2 por CPU + 2 DMA) | 4 trocas (User $\to$ Kernel $\to$ User $\to$ Kernel) |
| **\`sendfile()\` (Zero-Copy)** | 2 cópias (Apenas DMA) | 2 trocas (Apenas 1 syscall única) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Uso em Produção: Kafka e NGINX
- O **Apache Kafka** e o **NGINX** entregam petabytes de arquivos estáticos e mensagens com quase 0% de uso de CPU porque operam 100% sobre \`sendfile()\` / \`splice()\`, permitindo que o hardware de DMA e a rede saturem links de 100 Gbps.

#### Key Takeaways
- Zero-Copy economiza largura de banda de barramento de memória RAM e elimina cache evictions nos caches L1/L2/L3 da CPU.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/linux-io-syscalls/CS-OS-SYS-003.md', `---
id: CS-OS-SYS-003
title: "Multiplexação de I/O: epoll O(1) vs select/poll O(N)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::meta
  - freq::high
---

## Pergunta
Por que a API **\`epoll\`** do Linux escala em tempo **$O(1)$** com milhões de conexões simultâneas enquanto **\`select\` / \`poll\`** degradam em **$O(N)$**?

## Resposta
### Quick Answer
**Solução Direta**:
- **\`select\` / \`poll\` ($O(N)$ Linear)**:
  - A aplicação deve passar uma lista com todos os $N$ descritores de arquivos (FDs) para o kernel a cada chamada.
  - O kernel precisa **percorrer linearmente os $N$ sockets** para descobrir quais receberam dados, e a aplicação precisa varrer a lista inteira novamente no retorno.
- **\`epoll\` ($O(1)$ Orientado a Eventos)**:
  1. Cria uma estrutura persistente no kernel via **Red-Black Tree** (\`epoll_create\`).
  2. Registra sockets apenas uma vez (\`epoll_ctl\`). A placa de rede dispara interrupções de hardware que inserem os sockets ativos diretamente em uma **Lista Encadeada de Prontos (Ready List)**.
  3. Ao chamar \`epoll_wait\`, o kernel retorna **apenas os sockets que já possuem dados prontos**, sem nenhuma varredura linear.

### Dual Coding Visual
| API de I/O | Custo por Evento | Comportamento com 100.000 Sockets Ociosos |
|---|---|---|
| **\`select\` / \`poll\`** | $O(N)$ | Varia 100.000 sockets a cada milissegundo (Inviável) |
| **\`epoll\` (Linux)** | $O(\\text{eventos ativos})$ | Retorna instantaneamente em $O(1)$ apenas os ativos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Problema C10K e C1000K
- No final dos anos 1990, servidores travavam ao atingir 10.000 conexões simultâneas (*The C10K Problem*) devido ao $O(N)$ do \`select\`.
- O advento do \`epoll\` no kernel Linux 2.6 viabilizou servidores modernos como NGINX, Node.js e Redis atenderem mais de 1.000.000 de conexões simultâneas por máquina (*C1000K*).

#### Key Takeaways
- O equivalente do \`epoll\` no macOS/BSD é o **\`kqueue\`** e no Windows é o **\`IOCP\`**.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/linux-io-syscalls/CS-OS-SYS-001.md', `---
id: CS-OS-SYS-001
title: "Direct I/O (O_DIRECT) vs Buffered I/O e Page Cache"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
O que é **Direct I/O (\`O_DIRECT\`)** e por que bancos de dados relacionais transacionais (como PostgreSQL e MySQL InnoDB) contornam o **Page Cache** do Linux?

## Resposta
### Quick Answer
**Solução Direta**:
- **Buffered I/O (Padrão Linux)**:
  - Toda escrita com \`write()\` grava primeiro no **Page Cache do kernel** na RAM e retorna imediatamente (*Write-Back Assíncrono*).
  - O kernel decide quando descarregar para o disco (*Dirty Pages Flush*).
  - *Problema para Bancos*: Causa **Double Buffering** (o mesmo bloco de 16 KB fica duplicado no Buffer Pool do banco e no Page Cache do OS) e dificulta garantias estritas de durabilidade ACID.
- **Direct I/O (\`O_DIRECT\`)**:
  - Abre o arquivo contornando completamente o Page Cache do kernel.
  - A controladora lê e escreve diretamente entre o buffer de userspace da aplicação e o storage NVMe via DMA.
  - O banco de dados assume o controle total dos algoritmos de substituição de cache (LRU/Clock) e da ordem de gravação no WAL (*Write-Ahead Log*).

### Dual Coding Visual
| Modo de I/O | Passa pelo Page Cache do SO? | Risco de Duplicação de Memória |
|---|---|---|
| **Buffered I/O** | Sim (Retém em cache na RAM do kernel) | Sim (*Double Buffering* consome o dobro de RAM) |
| **Direct I/O (\`O_DIRECT\`)** | Não (Transfere direto via DMA) | Zero (Cache controlado 100% pelo banco) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Requisitos de Alinhamento de Hardware do \`O_DIRECT\`
- Ao usar \`O_DIRECT\`, o buffer de memória, o deslocamento no arquivo (*offset*) e o tamanho da gravação **devem ser múltiplos exatos do tamanho do setor do disco** (geralmente 4.096 bytes / 4 KB). Qualquer desalinhamento faz a syscall falhar com \`EINVAL\`.

#### Key Takeaways
- Bancos de dados de classe empresarial utilizam \`O_DIRECT\` para seus arquivos de dados principais e \`fsync()\` / \`fdatasync()\` nos arquivos de log de transações.

</details>
`);

// ==========================================
// 2. linux-kernel-process-management
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/linux-kernel-process-management/CS-OS-KERN-000.md', `---
id: CS-OS-KERN-000
title: "Criação de Processos com fork() e Copy-On-Write (COW)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
Como a otimização de **Copy-On-Write (COW)** torna a syscall **\`fork()\`** praticamente instantânea mesmo para processos com muitos gigabytes de RAM?

## Resposta
### Quick Answer
**Solução Direta**:
- Ao executar **\`fork()\`**, o Linux cria um novo processo filho duplicando apenas a Tabela de Páginas do pai, **sem duplicar a memória física real**.
- **Mecanismo Copy-On-Write (COW)**:
  1. Todas as páginas de memória física são marcadas na MMU como **Somente Leitura (\`Read-Only\`)** e compartilhadas entre pai e filho.
  2. Enquanto ambos apenas lerem dados, compartilham a mesma RAM física com **zero custo de cópia**.
  3. No instante em que o pai ou o filho tentar modificar um byte, a MMU dispara uma interrupção de proteção (*Page Fault COW*).
  4. O kernel intercepta a interrupção, aloca um novo bloco físico de 4 KB, copia os dados daquela página específica, atualiza a tabela do processo escritor com permissão de escrita e retoma a instrução.

### Dual Coding Visual
| Fase do Processo | Estado das Páginas na MMU | Memória RAM Física |
|---|---|---|
| **Imediatamente após \`fork()\`** | Somente Leitura (\`RO\`) | 100% compartilhada entre Pai e Filho |
| **Após Escrita do Filho** | Página modificada vira Leitura/Escrita | Apenas a página de 4 KB modificada é copiada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como o Redis Executa Snapshots em Segundo Plano (BGSAVE)
- O Redis grava snapshots de persistência no disco chamando \`fork()\`.
- O processo filho varre a memória em segundo plano e grava o arquivo RDB no disco com uma visão estática imutável no tempo, enquanto o processo pai continua atendendo milhares de clientes em tempo real, mutando apenas as páginas necessárias via Copy-On-Write.

#### Key Takeaways
- \`fork()\` seguido imediatamente de \`execve()\` não sofre penalidade de cópia de memória, pois o \`execve\` descarta o espaço de endereçamento antigo.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/linux-kernel-process-management/CS-OS-KERN-002.md', `---
id: CS-OS-KERN-002
title: "Ciclo de Vida de Processos: Processos Zumbis vs Processos Órfãos"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre um **Processo Zumbi (\`defunct\`)** e um **Processo Órfão** no sistema operacional Linux?

## Resposta
### Quick Answer
**Solução Direta**:
- **Processo Zumbi (\`defunct\` / \`Z\` no \`ps\`)**:
  - É um processo que já terminou sua execução (\`exit()\`), liberou toda a sua memória RAM, arquivos e recursos, mas **continua ocupando uma entrada na Tabela de Processos do Kernel**.
  - Permanece retido até que o processo pai leia seu código de saída com a syscall **\`wait()\` / \`waitpid()\`** (*Reaping*).
  - *Perigo*: Centenas de zumbis esgotam a tabela de PIDs do kernel (\`/proc/sys/kernel/pid_max\`), impedindo o sistema de iniciar qualquer novo processo.
- **Processo Órfão**:
  - É um processo cujo processo pai morreu antes dele.
  - O kernel Linux automaticamente adota o processo órfão, reatribuindo seu pai para o **PID 1 (\`systemd\` / \`init\`)**, que chama \`wait()\` periodicamente para coletar seu status quando ele morrer.

### Dual Coding Visual
| Tipo de Processo | O Processo ainda Roda Código? | Causa Raiz do Problema |
|---|---|---|
| **Zumbi (\`defunct\`)** | Não (Morto, apenas retém o PID) | O pai esqueceu de chamar \`waitpid()\` |
| **Órfão** | Sim (Executando normalmente) | O pai terminou antes do filho |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Problema do PID 1 em Containers Docker
- Se sua aplicação Node.js ou Go rodar como PID 1 dentro de um container Docker sem um init system leve (como \`tini\`) e criar processos filhos que morrem, esses processos viram zumbis eternos porque o Node.js não implementa reaping de sinais \`SIGCHLD\`.
- **Solução**: Usar a flag \`docker run --init\` para embutir um init system correto.

#### Key Takeaways
- Um processo zumbi não consome memória RAM nem CPU; seu único consumo é um slot numérico na tabela de PIDs do kernel.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/linux-kernel-process-management/CS-OS-KERN-003.md', `---
id: CS-OS-KERN-003
title: "Sinais Unix: SIGTERM vs SIGKILL e Shutdown Gracioso"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::meta
  - freq::high
---

## Pergunta
Qual é a diferença entre os sinais **SIGTERM (15)** e **SIGKILL (9)** e como implementar um encerramento gracioso (*Graceful Shutdown*)?

## Resposta
### Quick Answer
**Solução Direta**:
- **SIGTERM (Signal 15 - Termination Request)**:
  - Solicitação educada de encerramento enviada por orquestradores (Kubernetes / Docker).
  - **Pode ser capturado e tratado pelo processo**: a aplicação intercepta o sinal, para de aceitar novas requisições HTTP, finaliza transações de banco em andamento, descarrega buffers e encerra voluntariamente com código 0.
- **SIGKILL (Signal 9 - Kill Immediate)**:
  - Ordem forçada de término executada diretamente pelo kernel.
  - **Não pode ser capturado, bloqueado ou ignorado**: o processo é destruído instantaneamente no mesmo ciclo de clock, podendo corromper arquivos ou transações não persistidas.

### Dual Coding Visual
| Sinal Unix | Pode ser Capturado pelo App? | Ação Realizada pelo Processo |
|---|---|---|
| **SIGTERM (15)** | **Sim** | Fecha conexões, salva estado e encerra com calma |
| **SIGKILL (9)** | **Não (Interceptado pelo Kernel)** | Morte instantânea sem execução de código de limpeza |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Graceful Shutdown em Servidor HTTP
\`\`\`go
package main

import (
  "context"
  "net/http"
  "os"
  "os/signal"
  "syscall"
  "time"
)

func main() {
  server := &http.Server{Addr: ":8080"}
  stop := make(chan os.Signal, 1)
  signal.Notify(stop, syscall.SIGTERM, syscall.SIGINT)

  go server.ListenAndServe()

  <-stop // Aguarda sinal SIGTERM do Kubernetes

  // Dá 15 segundos para requisições em voo terminarem com sucesso:
  ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
  defer cancel()
  server.Shutdown(ctx)
}
\`\`\`

#### Key Takeaways
- No Kubernetes, ao desligar um pod, ele envia primeiro \`SIGTERM\` e aguarda o período de carência (\`terminationGracePeriodSeconds: 30\`); se o container não encerrar dentro do prazo, ele envia o \`SIGKILL\` definitivo.

</details>
`);

// ==========================================
// 3. ipc-inter-process-communication
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/ipc-inter-process-communication/CS-OS-IPC-000.md', `---
id: CS-OS-IPC-000
title: "Comparação de IPC: Pipes Anônimos vs Named Pipes (FIFOs)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
Qual é a diferença funcional entre **Pipes Anônimos** e **Named Pipes (FIFOs)** para comunicação entre processos no Linux?

## Resposta
### Quick Answer
**Solução Direta**:
- **Pipe Anônimo (\`pipe()\` syscall / operador \`|\` no shell)**:
  - Canal de comunicação unidirecional mantido exclusivamente em memória RAM pelo kernel (buffer de 64 KB).
  - Não possui nome no sistema de arquivos; só pode ser compartilhado entre **processos com relação de parentesco** (processo pai e filho criados via \`fork()\`).
  - É destruído automaticamente quando todos os descritores de arquivos são fechados.
- **Named Pipe (FIFO - \`mkfifo\` comando / syscall)**:
  - Aparece explicitamente como um nó especial no sistema de arquivos (ex: \`/tmp/meu_pipe\`).
  - Permite comunicação entre **dois processos completamente independentes e sem nenhum parentesco**.
  - O tráfego de dados continua ocorrendo 100% na memória RAM do kernel, sem escrita física no disco.

### Dual Coding Visual
| Tipo de Pipe | Existe no Sistema de Arquivos? | Exige Relação de Parentesco (Pai/Filho)? |
|---|---|---|
| **Pipe Anônimo** | Não (Apenas FDs em memória) | Sim (Criado antes do \`fork()\`) |
| **Named Pipe (FIFO)**| Sim (Arquivo especial tipo \`p\`) | Não (Qualquer processo pode abrir) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo no Terminal com Named Pipe
\`\`\`bash
# Cria o Named Pipe no disco:
mkfifo /tmp/app_fifo

# Terminal 1: Processo consumidor aguarda dados
cat < /tmp/app_fifo

# Terminal 2: Processo produtor envia dados (Desbloqueia o Terminal 1)
echo "Mensagem Inter-Processos" > /tmp/app_fifo
\`\`\`

#### Key Takeaways
- Pipes operam com semântica de stream de bytes sem preservação de limites de mensagens; leituras em pipes vazios bloqueiam a thread por padrão.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/ipc-inter-process-communication/CS-OS-IPC-002.md', `---
id: CS-OS-IPC-002
title: "Unix Domain Sockets (UDS) vs TCP Loopback (127.0.0.1)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::netflix
  - freq::high
---

## Pergunta
Por que a comunicação via **Unix Domain Sockets (UDS)** é até 2x mais rápida e consome menos CPU do que **TCP Loopback (\`127.0.0.1\`)** no mesmo host?

## Resposta
### Quick Answer
**Solução Direta**:
- **TCP Loopback (\`127.0.0.1:8080\`)**:
  - Roda a pilha de rede completa do kernel: gera números de sequência TCP, calcula checksums, empacota cabeçalhos IP/TCP, gerencia janelas de congestionamento e ACK de pacotes, embora o tráfego nunca saia da máquina.
- **Unix Domain Sockets (\`AF_UNIX\` / ex: \`/var/run/docker.sock\`)**:
  - Abandona toda a pilha de rede e protocolos de transporte.
  - O kernel Linux simplesmente **copia blocos de memória diretamente do buffer de escrita de um processo para o buffer de leitura do outro**, sem empacotamento, sem checksums e sem handshakes TCP.
  - Oferece **o dobro de vazão (throughput)**, **metade da latência** e suporte a controle de permissões por arquivo padrão Unix (\`chmod / chown\`).

### Dual Coding Visual
| Característica | TCP Loopback (\`127.0.0.1\`) | Unix Domain Socket (\`AF_UNIX\`) |
|---|---|---|
| **Caminho dos Dados** | Pilha TCP/IP completa do kernel | Cópia direta de buffer em memória |
| **Segurança e Acesso** | Qualquer processo local conecta na porta | Restrito por permissões de arquivo Unix |
| **Performance Relativa**| Baseline | **~2x mais rápido com menor uso de CPU** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Onde o UDS é Utilizado em Produção
- Comunicação entre **NGINX $\to$ PHP-FPM / Puma / Gunicorn**.
- Comunicação do CLI do Docker com o daemon do Docker (\`/var/run/docker.sock\`).
- Sidecars no Kubernetes comunicando-se com a aplicação principal no mesmo Pod.

#### Key Takeaways
- Sempre que dois processos rodarem garantidamente dentro do mesmo nó Linux, use Unix Domain Sockets em vez de portas TCP locais.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/os-memory/ipc-inter-process-communication/CS-OS-IPC-003.md', `---
id: CS-OS-IPC-003
title: "Memória Compartilhada POSIX (shm_open) para Transferência de Dados em O(1)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::meta
  - freq::high
---

## Pergunta
Por que a **Memória Compartilhada (Shared Memory / \`shm_open\`)** é o mecanismo de IPC de maior velocidade absoluta no sistema operacional?

## Resposta
### Quick Answer
**Solução Direta**:
- Todos os outros mecanismos de IPC (Pipes, Sockets, Filas de Mensagens) exigem que o dado seja copiado:
  $$\\text{Buffer do Processo A} \\xrightarrow{\\text{Syscall}} \\text{Buffer do Kernel} \\xrightarrow{\\text{Syscall}} \\text{Buffer do Processo B}$$
- **Memória Compartilhada (Shared Memory)**:
  - O kernel faz com que as Tabelas de Páginas de ambos os processos apontem para os **mesmos frames de memória física RAM**.
  - O Processo A grava um dado no endereço \`0x1000\`, e o Processo B lê o dado **instantaneamente em tempo zero ($O(1)$)**, com **Zero Cópias de memória** e **Zero Syscalls**.
- **Desafio**: Como o kernel não faz mediação, os processos são responsáveis por sincronizar o acesso concorrente usando Mutexes compartilhados ou primitivas Atômicas Lock-Free.

### Dual Coding Visual
| Mecanismo de IPC | Cópias de Dados por Mensagem | Envolve Syscalls a cada Mensagem? |
|---|---|---|
| **Pipes / Sockets** | 2 cópias (User $\to$ Kernel $\to$ User) | Sim (\`write()\` e \`read()\`) |
| **Shared Memory** | **0 cópias (Acesso direto à RAM)** | **Não (Acesso direto via ponteiro)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em C: Criando Bloco de Memória Compartilhada POSIX
\`\`\`c
#include <fcntl.h>
#include <sys/mman.h>
#include <unistd.h>

int main() {
    int fd = shm_open("/meu_bloco_shm", O_CREAT | O_RDWR, 0666);
    ftruncate(fd, 4096); // Aloca 4 KB
    char *ptr = mmap(0, 4096, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);

    ptr[0] = 'A'; // O outro processo lê 'A' instantaneamente na RAM!
    return 0;
}
\`\`\`

#### Key Takeaways
- Shared Memory é amplamente utilizada em sistemas de trading de ultra-baixa latência (HFT), processamento de vídeo e no PostgreSQL para o *Shared Buffer Pool*.

</details>
`);

console.log('✅ Phase 2 OS & Memory (Part 2) successfully decomposed!');
