import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateCard } from '../src/utils/validator.js';
import { SVG_GENERATORS } from '../src/utils/media-catalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const CS_DIR = path.join(ROOT_DIR, 'decks', '02-cs-fundamentals');

/**
 * Complete media mapping dictionary for all 97 CS Fundamentals cards
 */
export const CS_CARD_MEDIA_MAP = {
  // === architecture/cpu-cache ===
  'CS-ARCH-CACHE-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/cpu-cache-false-sharing-mesi-loop.webm',
    fallbackText: 'Invalidação de linha de cache compartilhada entre cores distintos durante escritas simultâneas em variáveis vizinhas.',
    svgGenerator: SVG_GENERATORS.cpuCacheMESI
  },
  'CS-ARCH-CACHE-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/cpu-cache-line-64bytes-spatial-loop.webm',
    fallbackText: 'Carregamento contíguo de 64 bytes da RAM para a cache L1 acelerando acessos sequenciais a vetores.',
    svgGenerator: SVG_GENERATORS.cpuCacheMESI
  },
  'CS-ARCH-CACHE-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/cache-write-through-vs-write-back-loop.webm',
    fallbackText: 'Atualização síncrona da RAM (Write-Through) vs marcação de bit sujo (Dirty Bit) com flush assíncrono (Write-Back).'
  },
  'CS-ARCH-CACHE-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/cache-set-associative-mapping-loop.webm',
    fallbackText: 'Mapeamento de endereço de memória em Index, Tag e Offset com busca paralela em N vias do conjunto.'
  },
  'CS-ARCH-CACHE-004': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/cpu-cache-l1-l2-l3-latency-loop.webm',
    fallbackText: 'Comparação de latência: L1 (~1ns), L2 (~4ns), L3 (~15ns) e RAM principal (~80ns).',
    svgGenerator: SVG_GENERATORS.storageHierarchy
  },

  // === architecture/cpu-internals-isa ===
  'CS-ARCH-CPU-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/von-neumann-vs-harvard-architecture-loop.webm',
    fallbackText: 'Barramento compartilhado de dados e instruções (Von Neumann) vs barramentos independentes paralelos (Harvard).'
  },
  'CS-ARCH-CPU-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/cpu-fetch-decode-execute-loop.webm',
    fallbackText: 'Ciclo de instrução da CPU buscando comando no PC, decodificando na Control Unit e executando na ALU.'
  },
  'CS-ARCH-CPU-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/cisc-vs-risc-instruction-set-loop.webm',
    fallbackText: 'Instruções complexas de múltiplos ciclos (CISC) vs instruções atômicas de tamanho fixo em 1 ciclo (RISC).'
  },
  'CS-ARCH-CPU-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/cpu-registers-pc-sp-flags-loop.webm',
    fallbackText: 'Manipulação de registradores de estado: Program Counter (PC), Stack Pointer (SP) e Flags aritméticas (ZF, CF, OF).'
  },

  // === architecture/pipelining-branch-prediction ===
  'CS-ARCH-PIPE-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/cpu-instruction-pipelining-stages-loop.webm',
    fallbackText: 'Execução sobreposta de estágios IF, ID, EX, MEM e WB elevando o throughput para 1 instrução por ciclo.'
  },
  'CS-ARCH-PIPE-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/cpu-pipeline-branch-flush-loop.webm',
    fallbackText: 'Previsão especulativa de ramificação mantendo o pipeline cheio e penalidade de flush em caso de erro.'
  },
  'CS-ARCH-PIPE-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/pipeline-data-hazard-forwarding-loop.webm',
    fallbackText: 'Encaminhamento de dados direto da saída da ALU (Bypassing) eliminando bolhas de espera (Stalls).'
  },
  'CS-ARCH-PIPE-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/simd-vector-parallel-lanes-loop.webm',
    fallbackText: 'Processamento paralelo de múltiplos elementos de dados (128/256/512 bits) em uma única instrução de máquina.'
  },

  // === architecture/storage-io-hierarchy ===
  'CS-ARCH-IO-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/hdd-mechanical-vs-nvme-ssd-loop.webm',
    fallbackText: 'Tempo de busca mecânica do braço do HDD (~5ms) vs acesso eletrônico direto em células NAND flash (~20µs).',
    svgGenerator: SVG_GENERATORS.storageHierarchy
  },
  'CS-ARCH-IO-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/append-only-log-sequential-io-loop.webm',
    fallbackText: 'Gravações sequenciais no final do arquivo eliminando rotações de disco e random writes no armazenamento.'
  },
  'CS-ARCH-IO-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/sequential-vs-random-disk-io-loop.webm',
    fallbackText: 'Throughput de I/O sequencial atingindo GB/s comparado a dezenas de MB/s no I/O aleatório.'
  },
  'CS-ARCH-IO-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/os-page-cache-dirty-pages-loop.webm',
    fallbackText: 'Interpolação transparente de páginas na RAM física com gravações diferidas (Flush de Dirty Pages) pelo pdflush/flusher.'
  },
  'CS-ARCH-IO-004': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/dma-direct-memory-access-transfer-loop.webm',
    fallbackText: 'Controlador DMA transferindo blocos entre periféricos e RAM liberando a CPU para outras tarefas.'
  },
  'CS-ARCH-IO-005': {
    videoUrl: 'https://assets.faang-anki.dev/media/architecture/direct-io-bypass-page-cache-loop.webm',
    fallbackText: 'Bancos de dados gerenciando seu próprio buffer pool em memória ignorando o Page Cache do Kernel.'
  },

  // === discrete-math/boolean-logic ===
  'CS-MATH-BOOL-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/bitwise-operations-masks-truth-loop.webm',
    fallbackText: 'Aplicações de máscaras lógicas (AND para leitura, OR para ativação, XOR para alternância) em 1 ciclo.'
  },
  'CS-MATH-BOOL-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/bitwise-brian-kernighan-popcount-loop.webm',
    fallbackText: 'A operação n & (n-1) desliga o bit 1 menos significativo em cada iteração contando os bits ativos.'
  },
  'CS-MATH-BOOL-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/de-morgan-laws-simplification-loop.webm',
    fallbackText: 'Equivalência lógica: NOT (A AND B) = (NOT A) OR (NOT B) e NOT (A OR B) = (NOT A) AND (NOT B).'
  },
  'CS-MATH-BOOL-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/xor-properties-self-canceling-loop.webm',
    fallbackText: 'Auto-anulação (A ^ A = 0) e elemento neutro (A ^ 0 = A) cancelando duplicatas em tempo linear.'
  },
  'CS-MATH-BOOL-004': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/bitset-dense-array-indexing-loop.webm',
    fallbackText: 'Indexação de booleanos comprimidos usando array[i / 64] & (1ULL << (i % 64)) com 8x menos memória.'
  },

  // === discrete-math/combinatorics-probability ===
  'CS-MATH-PROB-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/permutations-vs-combinations-tree-loop.webm',
    fallbackText: 'A ordem importa nas permutações P(n,k) = n!/(n-k)! vs indiferença de ordem em combinações C(n,k).'
  },
  'CS-MATH-PROB-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/birthday-paradox-hash-collision-loop.webm',
    fallbackText: 'Crescimento exponencial da probabilidade de colisão atingindo 50% em apenas sqrt(N) elementos.'
  },
  'CS-MATH-PROB-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/bayes-theorem-conditional-probability-loop.webm',
    fallbackText: 'Atualização da probabilidade a posteriori P(A|B) combinando verossimilhança e probabilidade a priori.'
  },
  'CS-MATH-PROB-004': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/bloom-filter-false-positive-math-loop.webm',
    fallbackText: 'Relação matemática entre número de hashes k = (m/n) ln 2 e taxa de falsos positivos no filtro probabilístico.'
  },

  // === discrete-math/graph-theory ===
  'CS-MATH-GRAPH-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/dag-topological-ordering-proof-loop.webm',
    fallbackText: 'Existência de ao menos um nó com in-degree 0 em todo DAG permitindo linearização causal das tarefas.'
  },
  'CS-MATH-GRAPH-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/pigeonhole-principle-induction-loop.webm',
    fallbackText: 'Se n itens são colocados em m recipientes com n > m, ao menos um recipiente contém múltiplos itens.'
  },
  'CS-MATH-GRAPH-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/graph-adjacency-matrix-vs-list-loop.webm',
    fallbackText: 'Matriz O(V²) para grafos densos e verificação O(1) vs Lista O(V+E) para grafos esparsos.'
  },
  'CS-MATH-GRAPH-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/tarjan-strongly-connected-components-loop.webm',
    fallbackText: 'Busca em profundidade com low-link values identificando componentes fortemente conexos em tempo O(V+E).'
  },
  'CS-MATH-GRAPH-004': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/equivalence-relation-dsu-partition-loop.webm',
    fallbackText: 'Particionamento do conjunto em classes de equivalência disjuntas mantidas com árvores de apontadores.'
  },

  // === discrete-math/number-representation-ieee754 ===
  'CS-MATH-NUM-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/twos-complement-integer-overflow-loop.webm',
    fallbackText: 'Inversão de bits somada a 1 (~x + 1) unificando adição e subtração na ALU com wrap-around no estouro.'
  },
  'CS-MATH-NUM-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/floating-point-inaccuracy-01-02-loop.webm',
    fallbackText: 'Dízimas periódicas binárias (0.1 + 0.2 = 0.30000000000000004) exigindo tipos decimais em sistemas contábeis.'
  },
  'CS-MATH-NUM-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/endianness-byte-order-network-loop.webm',
    fallbackText: 'Byte mais significativo no menor endereço (Big-Endian / Network Order) vs byte menos significativo (Little-Endian / x86).'
  },
  'CS-MATH-NUM-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/ieee-754-floating-point-layout-loop.webm',
    fallbackText: 'Decomposição binária em 1 bit de sinal, 8 bits de expoente com bias e 23 bits de mantissa normalizada.'
  },
  'CS-MATH-NUM-004': {
    videoUrl: 'https://assets.faang-anki.dev/media/math/ieee-754-subnormal-nan-infinity-loop.webm',
    fallbackText: 'Expoente com todos os bits 1 (NaN / Infinito) e expoente 0 com mantissa não-nula (Subnormais).'
  },

  // === networking/dns-tls ===
  'CS-NET-DNS-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/dns-recursive-authoritative-resolution-loop.webm',
    fallbackText: 'Cascata de resolução: Root Server (.) -> TLD (.com) -> Servidor Autoritativo -> Cache no Resolvedor Recursivo.',
    svgGenerator: SVG_GENERATORS.tlsHandshake
  },
  'CS-NET-DNS-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/tls-13-handshake-keyshare-loop.webm',
    fallbackText: 'Handshake TLS 1.3 de 1-RTT enviando parâmetros Diffie-Hellman na primeira mensagem.',
    svgGenerator: SVG_GENERATORS.tlsHandshake
  },
  'CS-NET-DNS-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/dns-record-types-ttl-cache-loop.webm',
    fallbackText: 'Registros A (IPv4), AAAA (IPv6), CNAME (alias) com expiração controlada pelo Time To Live (TTL).'
  },

  // === networking/http-protocols ===
  'CS-NET-HTTP-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/http11-head-of-line-blocking-loop.webm',
    fallbackText: 'Bloqueio de cabeça de fila no HTTP/1.1 onde uma resposta lenta retém todas as requisições subsequentes na mesma conexão.',
    svgGenerator: SVG_GENERATORS.httpMultiplex
  },
  'CS-NET-HTTP-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/hpack-qpack-header-compression-loop.webm',
    fallbackText: 'Tabela dinâmica de cabeçalhos e codificação de Huffman eliminando bytes redundantes em requisições contínuas.'
  },
  'CS-NET-HTTP-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/http2-multiplexing-streams-loop.webm',
    fallbackText: 'Streams binárias independentes multiplexadas sobre uma única conexão TCP no HTTP/2.',
    svgGenerator: SVG_GENERATORS.httpMultiplex
  },
  'CS-NET-HTTP-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/http3-quic-udp-streams-loop.webm',
    fallbackText: 'Streams independentes em nível de transporte onde a perda de pacotes em um fluxo não interrompe outros fluxos.',
    svgGenerator: SVG_GENERATORS.httpMultiplex
  },

  // === networking/modern-apis-protocols ===
  'CS-NET-API-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/rest-websocket-sse-comparison-loop.webm',
    fallbackText: 'Request-Response síncrono (REST) vs Full-Duplex bidirecional (WebSockets) vs Unidirecional servidor->cliente (SSE).'
  },
  'CS-NET-API-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/websocket-handshake-upgrade-loop.webm',
    fallbackText: 'Handshake inicial HTTP com cabeçalho Connection: Upgrade transicionando para frames bidirecionais TCP.'
  },
  'CS-NET-API-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/grpc-protobuf-binary-framing-loop.webm',
    fallbackText: 'Mensagens codificadas em binário compacto Protobuf com esquema tipado estrito e overhead mínimo de parsing.'
  },
  'CS-NET-API-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/graphql-query-payload-exact-loop.webm',
    fallbackText: 'O cliente especifica exatamente os campos desejados retornando a resposta exata em uma única requisição.'
  },

  // === networking/socket-io-epoll ===
  'CS-NET-SOCK-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/tcp-server-socket-bind-listen-accept-loop.webm',
    fallbackText: 'Sequência canônica de chamadas de sistema: socket() -> bind() -> listen() -> accept() criando socket conectado.'
  },
  'CS-NET-SOCK-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/nagle-algorithm-tcp-nodelay-loop.webm',
    fallbackText: 'Buffering de pequenos pacotes aguardando ACK vs envio imediato com TCP_NODELAY para baixa latência.'
  },
  'CS-NET-SOCK-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/tcp-timewait-2msl-drain-loop.webm',
    fallbackText: 'Retenção do socket por 2MSL garantindo que o ACK final chegue ao servidor e pacotes obsoletos na rede expirem.'
  },

  // === networking/tcp-udp-transport ===
  'CS-NET-TCP-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/tcp-vs-udp-transport-layer-loop.webm',
    fallbackText: 'Garantia de entrega, retransmissão e ordenação (TCP) vs datagramas connectionless de baixa latência (UDP).',
    svgGenerator: SVG_GENERATORS.tcpHandshake
  },
  'CS-NET-TCP-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/tcp-congestion-cubic-vs-bbr-loop.webm',
    fallbackText: 'Crescimento de janela em curva cúbica baseada em perda (CUBIC) vs modelo de banda e RTT mínimo (BBR).'
  },
  'CS-NET-TCP-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/tcp-handshake-loop.webm',
    fallbackText: 'O handshake de 3 vias sincroniza números de sequência iniciais (ISN) entre cliente e servidor.',
    svgGenerator: SVG_GENERATORS.tcpHandshake
  },
  'CS-NET-TCP-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/tcp-head-of-line-blocking-stream-loop.webm',
    fallbackText: 'Retenção de todos os bytes subsequentes no buffer do receptor aguardando a retransmissão de um pacote perdido.'
  },
  'CS-NET-TCP-004': {
    videoUrl: 'https://assets.faang-anki.dev/media/networking/tcp-sliding-window-bdp-scaling-loop.webm',
    fallbackText: 'Buffer de transmissão dimensionado pelo produto Largura de Banda x Atraso (BDP = Bandwidth * RTT).'
  },

  // === os-memory/ipc-inter-process-communication ===
  'CS-OS-IPC-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/ipc-anonymous-vs-named-pipes-loop.webm',
    fallbackText: 'Comunicação unidirecional em buffer do kernel entre processos pai-filho vs arquivo FIFO no filesystem.'
  },
  'CS-OS-IPC-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/linux-ipc-mechanisms-overview-loop.webm',
    fallbackText: 'Espectro de IPC: Sockets UDS, Pipes, POSIX Queues e Memória Compartilhada classificados por latência.'
  },
  'CS-OS-IPC-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/unix-domain-sockets-vs-loopback-loop.webm',
    fallbackText: 'UDS eliminando encapsulamento de cabeçalhos TCP/IP, checksums e controle de congestionamento na mesma máquina.'
  },
  'CS-OS-IPC-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/posix-shared-memory-shm-loop.webm',
    fallbackText: 'Mapeamento do mesmo bloco de memória física nos espaços virtuais de dois processos para transferência em O(1).'
  },

  // === os-memory/linux-io-syscalls ===
  'CS-OS-SYS-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/syscall-user-to-kernel-ring-transition-loop.webm',
    fallbackText: 'Instrução syscall disparando transição de Ring 3 para Ring 0 com troca de pilha e consulta à tabela sys_call_table.'
  },
  'CS-OS-SYS-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/buffered-vs-direct-io-pagecache-loop.webm',
    fallbackText: 'Acesso mediado pelo Page Cache na RAM vs I/O direto via O_DIRECT sem duplicação de buffers.'
  },
  'CS-OS-SYS-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/linux-zero-copy-sendfile-loop.webm',
    fallbackText: 'Transferência direta de dados do Page Cache para o Socket Buffer via DMA sem passar pelo User Space.'
  },
  'CS-OS-SYS-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/epoll-redblack-ready-list-loop.webm',
    fallbackText: 'Árvore Red-Black de descritores e Ready List duplamente ligada alimentada por interrupções do kernel em O(1).',
    svgGenerator: SVG_GENERATORS.epollEventLoop
  },

  // === os-memory/linux-kernel-process-management ===
  'CS-OS-KERN-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/linux-fork-copy-on-write-loop.webm',
    fallbackText: 'Compartilhamento de páginas físicas marcadas como read-only duplicando apenas na primeira tentativa de escrita.'
  },
  'CS-OS-KERN-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/cfs-scheduler-vruntime-rbtree-loop.webm',
    fallbackText: 'Seleção da tarefa com menor tempo virtual de execução (vruntime) na extrema esquerda da Red-Black Tree.'
  },
  'CS-OS-KERN-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/zombie-vs-orphan-processes-init-loop.webm',
    fallbackText: 'Processo terminado aguardando wait() do pai (Zumbi) vs processo cujo pai morreu re-adotado pelo init/systemd (Órfão).'
  },
  'CS-OS-KERN-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/unix-signals-sigterm-vs-sigkill-loop.webm',
    fallbackText: 'Sinal interceptável para limpeza graciosa (SIGTERM 15) vs terminação forçada e incondicional no Kernel (SIGKILL 9).'
  },

  // === os-memory/lock-free-atomics ===
  'CS-OS-ATOM-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/non-atomic-increment-hardware-race-loop.webm',
    fallbackText: 'Decomposição da instrução em 3 etapas (Read, Modify, Write) gerando race condition entre múltiplos cores.'
  },
  'CS-OS-ATOM-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/memory-barriers-happens-before-fences-loop.webm',
    fallbackText: 'Instruções de barreira impedindo reordenação de instruções no compilador e na CPU (Happens-Before).'
  },
  'CS-OS-ATOM-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/compare-and-swap-atomic-instruction-loop.webm',
    fallbackText: 'Atualização atômica em hardware onde o novo valor é escrito somente se o valor atual for idêntico ao esperado.'
  },
  'CS-OS-ATOM-004': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/lock-free-cas-aba-tagged-loop.webm',
    fallbackText: 'Incremento atômico de versão em tagged pointer impedindo que mudanças ABA passem despercebidas pelo CAS.'
  },

  // === os-memory/processes-threads ===
  'CS-OS-PROC-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/process-vs-thread-memory-space-loop.webm',
    fallbackText: 'Processos com espaços de memória isolados (CR3 distinto) vs Threads compartilhando heap, código e dados.',
    svgGenerator: SVG_GENERATORS.processLifecycle
  },
  'CS-OS-PROC-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/process-context-switch-pcb-loop.webm',
    fallbackText: 'Troca de contexto salvando registradores, stack pointer e invalidando entradas da TLB na troca de processos.',
    svgGenerator: SVG_GENERATORS.processLifecycle
  },
  'CS-OS-PROC-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/goroutines-m-to-n-scheduler-loop.webm',
    fallbackText: 'Goroutines leves (2KB) escalonadas em User Space vs Threads do Kernel (1-2MB) com sobrecarga de syscall.'
  },
  'CS-OS-PROC-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/pcb-tcb-kernel-structs-loop.webm',
    fallbackText: 'Estruturas do Kernel armazenando estado de execução, prioridade, descritores de arquivo e mapeamento de memória.'
  },

  // === os-memory/synchronization-primitives ===
  'CS-OS-SYNC-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/race-condition-critical-section-loop.webm',
    fallbackText: 'Acesso concorrente a recurso compartilhado sem sincronização levando a corrupção de estado inconsistente.'
  },
  'CS-OS-SYNC-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/futex-fast-userspace-mutex-loop.webm',
    fallbackText: 'Espera ocupada na CPU (Spinlock) vs suspensão da thread no kernel (Mutex) vs abordagem híbrida (Futex).'
  },
  'CS-OS-SYNC-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/mutex-vs-counting-semaphore-loop.webm',
    fallbackText: 'Propriedade exclusiva de travamento (Mutex) vs controle de pool de N recursos disponíveis (Semáforo).'
  },
  'CS-OS-SYNC-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/read-write-lock-concurrency-loop.webm',
    fallbackText: 'Múltiplos leitores simultâneos permitidos com bloqueio exclusivo apenas durante operações de escrita.'
  },
  'CS-OS-SYNC-004': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/deadlock-coffman-circular-wait-loop.webm',
    fallbackText: 'Bloqueio mútuo quando ocorrem Exclusão Mútua, Posse e Espera, Não-Preempção e Espera Circular.'
  },

  // === os-memory/virtual-memory ===
  'CS-OS-VMEM-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/virtual-memory-isolation-layout-loop.webm',
    fallbackText: 'Cada processo opera em seu próprio espaço de endereçamento virtual contíguo isolado de outros processos.',
    svgGenerator: SVG_GENERATORS.virtualMemory
  },
  'CS-OS-VMEM-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/virtual-memory-tlb-translation-loop.webm',
    fallbackText: 'Cache L1 de traduções na MMU e uso de HugePages (2MB/1GB) aumentando a área de memória por entrada da TLB.',
    svgGenerator: SVG_GENERATORS.virtualMemory
  },
  'CS-OS-VMEM-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/multilevel-page-tables-cr3-walk-loop.webm',
    fallbackText: 'Árvore de tradução hierárquica (PGD -> PUD -> PMD -> PTE) economizando memória para espaços esparsos.',
    svgGenerator: SVG_GENERATORS.virtualMemory
  },
  'CS-OS-VMEM-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/page-fault-major-minor-swap-loop.webm',
    fallbackText: 'Página ausente da tabela mas presente na RAM (Minor) vs busca obrigatória de bloco no disco/swap (Major).'
  },
  'CS-OS-VMEM-005': {
    videoUrl: 'https://assets.faang-anki.dev/media/os/mmap-file-backed-virtual-memory-loop.webm',
    fallbackText: 'Mapeamento de arquivo diretamente nas páginas virtuais do processo com lazy loading sob demanda na primeira leitura.'
  },

  // === runtimes-garbage-collection/go-runtime-gc ===
  'CS-RNT-GO-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/runtimes/go-tri-color-gc-mark-sweep-loop.webm',
    fallbackText: 'Escaneamento concorrente com coloração Preto, Cinza e Branco com pausas STW sub-milissegundo.',
    svgGenerator: SVG_GENERATORS.triColorGC
  },
  'CS-RNT-GO-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/runtimes/go-gmp-scheduler-stealing-loop.webm',
    fallbackText: 'Processador lógico ocioso roubando goroutines da fila local de outro processador no modelo GMP do Go.',
    svgGenerator: SVG_GENERATORS.goGMP
  },
  'CS-RNT-GO-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/runtimes/go-gc-tuning-gomemlimit-loop.webm',
    fallbackText: 'Controle da frequência de disparo do GC em percentual de crescimento e limite rígido de memória anti-OOM.'
  },

  // === runtimes-garbage-collection/jvm-memory-gc ===
  'CS-RNT-JVM-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/runtimes/jvm-memory-layout-metaspace-heap-loop.webm',
    fallbackText: 'Divisão estrutural da JVM entre Metaspace (Off-Heap), Heap Generacional e Stacks individuais de cada thread.',
    svgGenerator: SVG_GENERATORS.jvmGenerationalHeap
  },
  'CS-RNT-JVM-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/runtimes/jvm-g1gc-vs-zgc-regions-loop.webm',
    fallbackText: 'Heap particionado em regiões de 1-32MB (G1GC) vs Colored Pointers com pausas < 1ms (ZGC).'
  },
  'CS-RNT-JVM-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/runtimes/jvm-generational-gc-promotion-loop.webm',
    fallbackText: 'Objetos sobreviventes promovidos de Eden para Survivor e posteriormente para Tenured no ciclo de GC da JVM.',
    svgGenerator: SVG_GENERATORS.jvmGenerationalHeap
  },
  'CS-RNT-JVM-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/runtimes/jvm-safepoint-stw-pause-loop.webm',
    fallbackText: 'Suspensão de threads de aplicação em SafePoints conhecidos para escaneamento de raízes do GC.'
  },

  // === runtimes-garbage-collection/memory-allocation-escape-analysis ===
  'CS-RNT-ALLOC-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/runtimes/stack-vs-heap-memory-allocation-loop.webm',
    fallbackText: 'Alocação e liberação instantânea por avanço de ponteiro (Stack) vs alocação dinâmica com gerenciamento de fragmentação (Heap).'
  },
  'CS-RNT-ALLOC-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/runtimes/escape-analysis-stack-heap-loop.webm',
    fallbackText: 'Ponteiros que não escapam do escopo da função são alocados diretamente no stack frame sem overhead de GC.'
  },
  'CS-RNT-ALLOC-003': {
    videoUrl: 'https://assets.faang-anki.dev/media/runtimes/sync-pool-object-reuse-gc-loop.webm',
    fallbackText: 'Pool de objetos pré-alocados reutilizados entre goroutines reduzindo drasticamente as alocações no heap.'
  }
};

/**
 * Builds the responsive HTML video block
 */
export function buildVideoWrapper(videoUrl, fallbackText) {
  return `<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="${videoUrl}">
    <p>Visualização: ${fallbackText}</p>
  </video>
</div>`;
}

/**
 * Injects or updates the media block inside the Dual Coding Visual section of a card's content
 */
export function injectMediaIntoCard(content, cardId) {
  const mediaConfig = CS_CARD_MEDIA_MAP[cardId];
  if (!mediaConfig) {
    return content;
  }

  let videoBlock = buildVideoWrapper(mediaConfig.videoUrl, mediaConfig.fallbackText);

  // If already contains video wrapper, replace it
  if (content.includes('<div class="video-wrapper">')) {
    return content.replace(
      /<div class="video-wrapper">[\s\S]*?<\/div>/,
      videoBlock
    );
  }

  // Otherwise inject right after `### Dual Coding Visual\n`
  if (content.includes('### Dual Coding Visual\n')) {
    return content.replace(
      '### Dual Coding Visual\n',
      `### Dual Coding Visual\n${videoBlock}\n\n`
    );
  }

  if (content.includes('### Dual Coding Visual')) {
    return content.replace(
      '### Dual Coding Visual',
      `### Dual Coding Visual\n${videoBlock}\n`
    );
  }

  return content;
}

/**
 * Recursively find all markdown files in a directory
 */
function findMarkdownFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      findMarkdownFiles(fullPath, list);
    } else if (fullPath.endsWith('.md')) {
      list.push(fullPath);
    }
  }
  return list;
}

/**
 * Main execution function
 */
export function executeInjection() {
  console.log('🚀 Starting CS Fundamentals Looping Micro-Video & SVG Injection...');
  const files = findMarkdownFiles(CS_DIR);
  console.log(`🔍 Found ${files.length} cards in ${CS_DIR}`);

  let updatedCount = 0;
  let validationErrors = 0;

  for (const filePath of files) {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const idMatch = rawContent.match(/^id:\s*([^\n\r]+)/m);
    if (!idMatch) {
      console.warn(`⚠️ No ID found in ${filePath}`);
      continue;
    }

    const cardId = idMatch[1].trim();
    if (!CS_CARD_MEDIA_MAP[cardId]) {
      console.warn(`⚠️ No media mapping defined for card ID: ${cardId}`);
      continue;
    }

    const newContent = injectMediaIntoCard(rawContent, cardId);

    // Validate the updated card
    const validation = validateCard(filePath, newContent);
    if (!validation.valid) {
      console.error(`❌ Validation failed for updated card [${cardId}]:`, validation.errors);
      validationErrors++;
      continue;
    }

    fs.writeFileSync(filePath, newContent, 'utf8');
    updatedCount++;
  }

  console.log(`\n🎉 Completed injection: ${updatedCount} cards updated successfully!`);
  if (validationErrors > 0) {
    console.error(`💥 Validation failed on ${validationErrors} cards.`);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  executeInjection();
}
