import { svgWrapper } from '../cs-svg-base.js';

export const OS_MEMORY_SVGS = {
  // === lock-free-atomics ===
  'CS-OS-ATOM-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Não-Atomicidade de count++: Race Condition em Nível de Hardware</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="85" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">1. READ</text>
    <text x="85" y="44" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">MOV EAX, [count]</text>
    <text x="85" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">Carrega RAM/L1 p/ Reg</text>

    <rect x="195" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="280" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">2. MODIFY</text>
    <text x="280" y="44" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">ADD EAX, 1</text>
    <text x="280" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">Incremento na ALU</text>

    <rect x="390" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#f43f5e"/>
    <text x="475" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">3. WRITE</text>
    <text x="475" y="44" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">MOV [count], EAX</text>
    <text x="475" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">Grava Reg na Memória</text>
  </g>
  <text x="340" y="160" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">Sem instrução atômica (LOCK XADD), duas threads intercaladas sobrescrevem o resultado gerando perda de dados.</text>
`),

  'CS-OS-ATOM-001': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Memory Barriers (Fences) &amp; Reordenação de CPU (Happens-Before)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="260" height="80" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="130" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Sem Memory Barrier</text>
    <text x="130" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">CPU Out-of-Order Execution &amp; Compilador</text>
    <text x="130" y="62" fill="#fca5a5" font-size="10" text-anchor="middle">podem inverter write(ready) antes de write(data)!</text>

    <rect x="300" y="0" width="260" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="430" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Com Memory Barrier (MFENCE)</text>
    <text x="430" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Garante ordem estrita de Store/Load Buffers</text>
    <text x="430" y="62" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Estabelece relação de Happens-Before</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Volatile em Java / atomic.Store em Go inserem barreiras de memória para forçar visibilidade imediata entre cores.</text>
`),

  'CS-OS-ATOM-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Instrução Compare-And-Swap (CAS): Base do Lock-Free</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="280" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">CMPXCHG [ptr], new_val (Atômico no Hardware)</text>
    <text x="280" y="48" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">if (*ptr == expected_val) { *ptr = new_val; return true; } else { return false; }</text>
    <text x="280" y="68" fill="#bae6fd" font-size="10" text-anchor="middle">Executado em laço (CAS Loop / Spin): Tenta atomicamente até obter sucesso sem bloquear a thread.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Elimina o custo de context switches de mutex; sob altíssima contenção, o overhead de CPU do loop pode subir.</text>
`),

  'CS-OS-ATOM-004': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Problema ABA em Pilhas Lock-Free &amp; Solução por Tagged Pointers</text>
  <g transform="translate(50, 48)">
    <!-- ABA Problem -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Problema ABA</text>
    <text x="135" y="42" fill="#f8fafc" font-size="10" text-anchor="middle">1. Thread 1 lê ponteiro A</text>
    <text x="135" y="58" fill="#f8fafc" font-size="10" text-anchor="middle">2. Thread 2 muda A → B e depois B → A</text>
    <text x="135" y="78" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">CAS(A) sucede falsamente com estado corrompido</text>

    <!-- Tagged Pointer -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Solução: Tagged Pointer (Ponteiro + Versão)</text>
    <text x="445" y="42" fill="#f8fafc" font-size="10" text-anchor="middle">Armazena (Ponteiro 48b + Versão 16b)</text>
    <text x="445" y="58" fill="#f8fafc" font-size="10" text-anchor="middle">Transição: (A, v1) → (B, v2) → (A, v3)</text>
    <text x="445" y="78" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">CAS((A, v1)) falha corretamente!</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">No x86-64, instruções de 128-bit (CMPXCHG16B) realizam CAS atômico de ponteiro e contador de versão juntos.</text>
`),

  // === ipc-inter-process-communication ===
  'CS-OS-IPC-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Pipes Anônimos vs Named Pipes (FIFOs)</text>
  <g transform="translate(50, 48)">
    <!-- Anonymous Pipe -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Pipe Anônimo (pipe())</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Unidirecional / Buffer em RAM no Kernel</text>
    <text x="135" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Apenas entre processos com parentesco (fork)</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Exemplo: ls | grep foo no Bash</text>

    <!-- Named Pipe -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Named Pipe (FIFO - mkfifo)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Possui ponto de entrada no filesystem</text>
    <text x="445" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Comunicação entre processos arbitrários sem parentesco</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Dados continuam trafegando 100% na RAM</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Buffer padrão do Linux: 64 KB (ajustável via fcntl F_SETPIPE_SZ). Escritas > 4 KB não são atômicas.</text>
`),

  'CS-OS-IPC-001': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Mecanismos de IPC no Linux: Latência vs Complexidade</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="24" rx="4" fill="#065f46"/>
    <text x="15" y="16" fill="#ffffff" font-size="10" font-weight="bold">Shared Memory (shm_open / mmap)</text>
    <text x="545" y="16" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="end">&lt; 0.1 µs (Zero-Copy direto na RAM)</text>

    <rect x="0" y="28" width="560" height="24" rx="4" fill="#0369a1"/>
    <text x="15" y="44" fill="#ffffff" font-size="10" font-weight="bold">Unix Domain Sockets (AF_UNIX)</text>
    <text x="545" y="44" fill="#bae6fd" font-size="10" font-family="monospace" text-anchor="end">~1 a 2 µs (Passagem de FDs, sem checksum)</text>

    <rect x="0" y="56" width="560" height="24" rx="4" fill="#0284c7"/>
    <text x="15" y="72" fill="#ffffff" font-size="10" font-weight="bold">Pipes / FIFOs</text>
    <text x="545" y="72" fill="#bae6fd" font-size="10" font-family="monospace" text-anchor="end">~2 a 3 µs (Stream sequencial no Kernel)</text>

    <rect x="0" y="84" width="560" height="24" rx="4" fill="#d97706"/>
    <text x="15" y="100" fill="#ffffff" font-size="10" font-weight="bold">POSIX Message Queues (mq_send)</text>
    <text x="545" y="100" fill="#fef3c7" font-size="10" font-family="monospace" text-anchor="end">~3 a 5 µs (Mensagens com prioridade)</text>

    <rect x="0" y="112" width="560" height="24" rx="4" fill="#b91c1c"/>
    <text x="15" y="128" fill="#ffffff" font-size="10" font-weight="bold">TCP Loopback (127.0.0.1)</text>
    <text x="545" y="128" fill="#fecaca" font-size="10" font-family="monospace" text-anchor="end">~10 a 20 µs (Overhead de pilha TCP/IP)</text>
  </g>
  <text x="340" y="195" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Regra de ouro: Comunicação local no mesmo host deve usar Unix Domain Sockets ou Shared Memory.</text>
`),

  'CS-OS-IPC-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Unix Domain Sockets (UDS) vs TCP Loopback (127.0.0.1)</text>
  <g transform="translate(50, 48)">
    <!-- UDS -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="135" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Unix Domain Socket (AF_UNIX)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Comunicação direta por cópia de buffer no Kernel</text>
    <text x="135" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Sem TCP framing, sem checksum, sem routing</text>
    <text x="135" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Suporta transferência atômica de File Descriptors</text>

    <!-- Loopback -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="445" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">TCP Loopback (127.0.0.1)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Passa pela pilha inteira de rede do Kernel</text>
    <text x="445" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Gera cálculos de checksum e controle de fluxo TCP</text>
    <text x="445" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Consome portas TCP efêmeras locais</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">UDS entrega até 2x mais throughput e metade da latência em comparação com conexões de loopback.</text>
`),

  'CS-OS-IPC-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Memória Compartilhada POSIX (shm_open) para Transferência em O(1)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="15" width="130" height="55" rx="5" fill="#1e293b" stroke="#38bdf8"/>
    <text x="65" y="40" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Processo A</text>
    <text x="65" y="55" fill="#94a3b8" font-size="9" text-anchor="middle">Espaço Virtual A</text>

    <!-- Shared Physical Memory -->
    <rect x="180" y="0" width="200" height="85" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="280" y="26" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">RAM Física Compartilhada</text>
    <text x="280" y="48" fill="#f8fafc" font-size="10" text-anchor="middle">Mesmo PFN mapeado em ambos</text>
    <text x="280" y="68" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Zero-Copy Absoluto</text>

    <rect x="430" y="15" width="130" height="55" rx="5" fill="#1e293b" stroke="#38bdf8"/>
    <text x="495" y="40" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Processo B</text>
    <text x="495" y="55" fill="#94a3b8" font-size="9" text-anchor="middle">Espaço Virtual B</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Processo A grava na memória e o Processo B lê instantaneamente; sincronização exige semáforos POSIX ou Mutex robustos.</text>
`),

  // === linux-kernel-process-management ===
  'CS-OS-KERN-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Criação de Processos com fork() e Copy-On-Write (COW)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="280" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Após fork(): Processo Filho duplica apenas a Tabela de Páginas (PTEs read-only)</text>
    <text x="280" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Páginas de dados permanecem compartilhadas em RAM física sem cópia inicial (Criação em O(1))</text>
    <text x="280" y="66" fill="#f59e0b" font-size="10" font-weight="bold" text-anchor="middle">No primeiro write(): A MMU gera Page Fault e duplica fisicamente apenas aquela página de 4 KB modificada.</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Base do snapshotting do Redis (BGSAVE) e isolamento instantâneo de processos em contêineres Linux.</text>
`),

  'CS-OS-KERN-001': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Escalonador CFS (Completely Fair Scheduler) e vruntime</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="24" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Red-Black Tree ordenada por vruntime (Virtual Runtime)</text>
    <text x="280" y="48" fill="#f8fafc" font-size="10" text-anchor="middle">CFS sempre escolhe o nó mais à esquerda da árvore (menor vruntime) em O(1).</text>
    <text x="280" y="66" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">vruntime += delta_exec * (NICE_0_LOAD / weight)</text>
  </g>
  <text x="340" y="155" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Processos com maior prioridade (nice negativo) acumulam vruntime mais lentamente, recebendo mais fatias de CPU.</text>
`),

  'CS-OS-KERN-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Ciclo de Vida: Processos Zumbis vs Processos Órfãos</text>
  <g transform="translate(50, 48)">
    <!-- Zombie -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Processo Zumbi (&lt;defunct&gt;)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Processo encerrou, mas o Pai NÃO chamou wait()</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Retém entrada na Tabela de Processos (PID ocupado)</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Muitos zumbis esgotam a tabela de PIDs do OS</text>

    <!-- Orphan -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Processo Órfão</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Processo Pai morreu antes do Processo Filho</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Filho é adotado automaticamente pelo PID 1 (init/systemd)</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">PID 1 executa wait() garantindo limpeza limpa</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Em contêineres Docker, usar tini ou dumb-init como PID 1 previne o acúmulo de processos zumbis.</text>
`),

  'CS-OS-KERN-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sinais Unix: SIGTERM (Gracioso) vs SIGKILL (Forçado)</text>
  <g transform="translate(50, 48)">
    <!-- SIGTERM -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="135" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">SIGTERM (Sinal 15)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Pode ser capturado e tratado pelo processo</text>
    <text x="135" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Graceful Shutdown: Conclui requisições em voo,</text>
    <text x="135" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">drena filas e fecha conexões de banco de dados</text>

    <!-- SIGKILL -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="445" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">SIGKILL (Sinal 9)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">NÃO pode ser capturado ou ignorado</text>
    <text x="445" y="60" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Kernel encerra a execução no mesmo instante</text>
    <text x="445" y="76" fill="#f87171" font-size="9" text-anchor="middle">Risco de corrupção de arquivos temporários</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Kubernetes envia SIGTERM, aguarda o período terminationGracePeriodSeconds (padrão 30s) e então envia SIGKILL.</text>
`),

  // === processes-threads ===
  'CS-OS-PROC-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Processo vs Thread: Isolamento de Recursos</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Processo: Unidade de Isolamento de Recursos (Espaço de Memória Virtual, FDs, PCB)</text>
    <text x="280" y="44" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Threads dentro do mesmo processo compartilham: Heap, Código (Text) e Descritores de Arquivo</text>
    <text x="280" y="66" fill="#f59e0b" font-size="10" text-anchor="middle">Cada Thread possui exclusivamente seu próprio: Stack (Pilha de execução), Registradores de CPU e Program Counter (PC).</text>
  </g>
  <text x="340" y="155" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">Falha de segmentação (SIGSEGV) em uma thread derruba o processo inteiro e todas as suas threads irmãs.</text>
`),

  'CS-OS-PROC-001': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sobrecarga de Context Switch: Processo vs Thread</text>
  <g transform="translate(50, 48)">
    <!-- Process Switch -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Context Switch de Processo</text>
    <text x="135" y="42" fill="#f8fafc" font-size="10" text-anchor="middle">1. Salva registradores no PCB</text>
    <text x="135" y="58" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">2. Troca registrador CR3 (Tabela de Páginas)</text>
    <text x="135" y="74" fill="#fca5a5" font-size="10" text-anchor="middle">3. TLB Flush (Invalida cache de tradução)</text>
    <text x="135" y="88" fill="#94a3b8" font-size="9" text-anchor="middle">Custo alto: ~1.000 a 2.000 ns + Cache Misses</text>

    <!-- Thread Switch -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Context Switch de Thread (Mesmo Processo)</text>
    <text x="445" y="42" fill="#f8fafc" font-size="10" text-anchor="middle">1. Salva registradores no TCB</text>
    <text x="445" y="58" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">2. CR3 permanece INTACTO (Mesmo espaço)</text>
    <text x="445" y="74" fill="#34d399" font-size="10" text-anchor="middle">3. TLB preservado sem invalidações</text>
    <text x="445" y="88" fill="#a7f3d0" font-size="9" text-anchor="middle">Custo moderado: ~100 a 300 ns</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">A preservação da TLB é a principal razão pela qual threads são muito mais leves para troca de contexto que processos.</text>
`),

  'CS-OS-PROC-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Goroutines e Green Threads vs Threads do Kernel do OS</text>
  <g transform="translate(50, 48)">
    <!-- Kernel Threads -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="135" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">OS Kernel Threads (Modelo 1:1)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Stack fixo grande: ~1 a 8 MB por thread</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Escalonamento via Kernel Syscall (~1.000 ns)</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Limite prático: ~5.000 a 10.000 threads ativas</text>

    <!-- Goroutines -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Goroutines (Modelo M:N em User Space)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Stack dinâmico contíguo: Começa com apenas 2 KB</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Escalonamento em User Space (~10 a 20 ns)</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Capacidade: Milhões de Goroutines concorrentes</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">O runtime do Go gerencia cooperativamente pontos de preempção em chamadas de função e I/O de rede não-bloqueante.</text>
`),

  'CS-OS-PROC-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estruturas do Kernel: PCB (task_struct) e TCB</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="24" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">No Kernel do Linux, tanto processos quanto threads são instâncias de struct task_struct</text>
    <text x="280" y="48" fill="#f8fafc" font-size="10" text-anchor="middle">Contém: PID/TID, Estado de execução, Registradores de CPU, mm_struct (Ponteiro de Memória) e files_struct (FDs).</text>
    <text x="280" y="66" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">Threads do mesmo processo compartilham os mesmos ponteiros mm e files (flag CLONE_VM | CLONE_FILES em clone()).</text>
  </g>
  <text x="340" y="155" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">A flexibilidade da syscall clone() permite implementar desde threads POSIX até contêineres (Namespaces/Cgroups).</text>
`),

  // === synchronization-primitives ===
  'CS-OS-SYNC-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Race Conditions e Proteção de Seção Crítica</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="280" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Seção Crítica: Trecho de código que acessa recursos compartilhados mutáveis</text>
    <text x="280" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">Propriedades Obrigatórias:</text>
    <text x="280" y="65" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">1. Exclusão Mútua (Mutual Exclusion) | 2. Progresso (Liveness) | 3. Espera Limitada (Bounded Waiting)</text>
  </g>
  <text x="340" y="155" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Sem exclusão mútua, a ordem de escalonamento não-determinística da CPU corrompe o estado dos dados.</text>
`),

  'CS-OS-SYNC-001': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Mecânica de Sincronização: Spinlock vs Mutex vs Futex</text>
  <g transform="translate(50, 48)">
    <!-- Spinlock -->
    <rect x="0" y="0" width="180" height="95" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="90" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Spinlock (Busy-Wait)</text>
    <text x="90" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Queima CPU em loop CAS</text>
    <text x="90" y="58" fill="#fca5a5" font-size="9" text-anchor="middle">Latência: ~5 a 10 ns</text>
    <text x="90" y="74" fill="#a7f3d0" font-size="9" text-anchor="middle">Ideal p/ esperas curtíssimas</text>
    <text x="90" y="88" fill="#94a3b8" font-size="8" text-anchor="middle">Uso em Kernels e Drivers</text>

    <!-- OS Mutex -->
    <rect x="195" y="0" width="180" height="95" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="285" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">OS Mutex Tradicional</text>
    <text x="285" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Syscall a cada lock/unlock</text>
    <text x="285" y="58" fill="#fca5a5" font-size="9" text-anchor="middle">Latência: ~1.000 ns</text>
    <text x="285" y="74" fill="#94a3b8" font-size="9" text-anchor="middle">Coloca a thread para dormir</text>
    <text x="285" y="88" fill="#94a3b8" font-size="8" text-anchor="middle">Alto custo de syscall</text>

    <!-- Futex -->
    <rect x="390" y="0" width="190" height="95" rx="5" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="485" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Linux Futex (Padrão)</text>
    <text x="485" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Fast Userspace Mutex</text>
    <text x="485" y="58" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Sem contenção: Atomic CAS</text>
    <text x="485" y="74" fill="#fca5a5" font-size="9" text-anchor="middle">Com contenção: Syscall futex_wait()</text>
    <text x="485" y="88" fill="#a7f3d0" font-size="8" text-anchor="middle">Base de std::mutex / sync.Mutex</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Futex combina a velocidade ultrarrápida do atomic em espaço do usuário com a eficiência do Kernel sob contenção real.</text>
`),

  'CS-OS-SYNC-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Mutex (Exclusão Mútua) vs Semáforos Contadores</text>
  <g transform="translate(50, 48)">
    <!-- Mutex -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Mutex (Lock Binário com Ownership)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Apenas 1 thread entra por vez</text>
    <text x="135" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Ownership Estrito: Somente quem travou pode destravar!</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Proteção de estruturas de dados e variáveis</text>

    <!-- Semaphore -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Semáforo Contador (Controle de Vagas)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Controla o acesso a um pool de N recursos</text>
    <text x="445" y="60" fill="#f59e0b" font-size="10" font-weight="bold" text-anchor="middle">Sem Ownership: Qualquer thread pode sinalizar (Post/Release)</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Pool de conexões de BD, Limitação de Concorrência</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Semáforos também são amplamente utilizados para sinalização e sincronização produtor-consumidor entre threads.</text>
`),

  'CS-OS-SYNC-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Read-Write Locks (sync.RWMutex) para Cargas Read-Heavy</text>
  <g transform="translate(50, 48)">
    <!-- Readers -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="135" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">RLock() Compartilhado (Múltiplos Leitores)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">N threads leem simultaneamente sem bloqueio mútuo</text>
    <text x="135" y="60" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Escala linearmente com o número de núcleos de CPU</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Ideal para: Caches in-memory e tabelas de roteamento</text>

    <!-- Writer -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="445" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Lock() Exclusivo (Escritor Único)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Bloqueia todos os leitores e todos os outros escritores</text>
    <text x="445" y="60" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Garante mutação segura sem inconsistência</text>
    <text x="445" y="76" fill="#f87171" font-size="9" text-anchor="middle">Atenção ao risco de Writer Starvation se leituras forem infinitas</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Se a proporção de leituras for &lt; 80%, um Mutex simples costuma ser mais rápido devido ao menor overhead atômico.</text>
`),

  'CS-OS-SYNC-004': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Deadlocks: As 4 Condições Obrigatórias de Coffman</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="130" height="85" rx="5" fill="#1e293b" stroke="#f43f5e"/>
    <text x="65" y="22" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">1. Exclusão Mútua</text>
    <text x="65" y="44" fill="#cbd5e1" font-size="9" text-anchor="middle">Recursos não podem</text>
    <text x="65" y="58" fill="#cbd5e1" font-size="9" text-anchor="middle">ser compartilhados</text>

    <rect x="145" y="0" width="130" height="85" rx="5" fill="#1e293b" stroke="#f43f5e"/>
    <text x="210" y="22" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">2. Hold and Wait</text>
    <text x="210" y="44" fill="#cbd5e1" font-size="9" text-anchor="middle">Retém um recurso e</text>
    <text x="210" y="58" fill="#cbd5e1" font-size="9" text-anchor="middle">espera por outro</text>

    <rect x="290" y="0" width="130" height="85" rx="5" fill="#1e293b" stroke="#f43f5e"/>
    <text x="355" y="22" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">3. Não-Preempção</text>
    <text x="355" y="44" fill="#cbd5e1" font-size="9" text-anchor="middle">Recursos não podem</text>
    <text x="355" y="58" fill="#cbd5e1" font-size="9" text-anchor="middle">ser confiscados à força</text>

    <rect x="435" y="0" width="125" height="85" rx="5" fill="#1e293b" stroke="#f43f5e"/>
    <text x="497" y="22" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">4. Espera Circular</text>
    <text x="497" y="44" fill="#cbd5e1" font-size="9" text-anchor="middle">Ciclo fechado de</text>
    <text x="497" y="58" fill="#cbd5e1" font-size="9" text-anchor="middle">dependências em cadeia</text>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Prevenção Canônica: Hierarquia Global de Locks (Adquirir múltiplos locks sempre em ordem estrita de endereço/ID).</text>
`),

  // === linux-io-syscalls ===
  'CS-OS-SYS-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Transição Ring 3 (User) para Ring 0 (Kernel) em Syscalls</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="260" height="80" rx="6" fill="#1e293b" stroke="#38bdf8"/>
    <text x="130" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">User Space (Ring 3)</text>
    <text x="130" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Código da aplicação sem privilégios</text>
    <text x="130" y="62" fill="#bae6fd" font-size="10" text-anchor="middle">Executa instrução SYSCALL no x86-64</text>

    <!-- Transition Arrow -->
    <path d="M 265 40 L 295 40" stroke="#f59e0b" stroke-width="2"/>

    <rect x="300" y="0" width="260" height="80" rx="6" fill="#1e293b" stroke="#f43f5e"/>
    <text x="430" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Kernel Space (Ring 0)</text>
    <text x="430" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Troca de pilha para Kernel Stack</text>
    <text x="430" y="62" fill="#fca5a5" font-size="10" text-anchor="middle">Despacha para a Syscall Table indexada em RAX</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Custo de transição: ~50 a 100 ns por chamada. I/O multiplexado (epoll/io_uring) reduz o volume de syscalls.</text>
`),

  'CS-OS-SYS-001': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Direct I/O (O_DIRECT) vs Buffered I/O e Page Cache</text>
  <g transform="translate(50, 48)">
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b"/>
    <text x="135" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Buffered I/O (Padrão do OS)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">read() copia do Page Cache para buffer da app</text>
    <text x="135" y="60" fill="#a7f3d0" font-size="10" text-anchor="middle">Cache transparente de leituras repetidas</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Custo: Cópia extra de memória CPU</text>

    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Direct I/O (flag O_DIRECT)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">DMA transfere direto do disco para buffer da app</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Zero sobrecarga no Page Cache do OS</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Exige alinhamento estrito em 4 KB (Setores de Disco)</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Bancos de dados profissionais implementam seus próprios caches inteligentes sobre Direct I/O.</text>
`),

  'CS-OS-SYS-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Zero-Copy no Linux: A Syscall sendfile() / splice()</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="280" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">sendfile(out_fd, in_fd, offset, count)</text>
    <text x="280" y="48" fill="#f8fafc" font-size="11" text-anchor="middle">Page Cache do Arquivo → DMA → Buffer da Placa de Rede (NIC) diretamente no Kernel</text>
    <text x="280" y="68" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Os dados NUNCA são copiados para o User Space! Reduz o uso de CPU em até 80%.</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Segredo do Throughput Monstruoso do Apache Kafka e Nginx ao servir arquivos e streams estáticos.</text>
`),

  'CS-OS-SYS-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Multiplexação de I/O: epoll O(1) vs select/poll O(N)</text>
  <g transform="translate(50, 48)">
    <!-- select/poll -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">select() / poll() — Custo O(N)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Passa array com todos os N sockets em cada syscall</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Kernel precisa varrer N conexões linearmente</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Inviável para C10K (10.000 conexões)</text>

    <!-- epoll -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Linux epoll — Custo O(Eventos Prontos)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Registra FDs uma única vez no Kernel (RB-Tree)</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">epoll_wait() retorna lista de conexões ativas em O(1)</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Escala facilmente para 1.000.000 de conexões</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Motor fundamental por trás de Netty, Node.js (libuv), Go Netpoller, Redis e Nginx.</text>
`),

  // === virtual-memory ===
  'CS-OS-VMEM-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Memória Virtual: Isolamento de Espaço de Endereçamento de 64 bits</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Cada processo possui a ilusão de possuir até 128 TB de memória contígua exclusiva</text>
    <text x="280" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">A MMU da CPU traduz endereços virtuais (VA) em endereços físicos de RAM (PA) em tempo de execução.</text>
    <text x="280" y="65" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">Proteção Total: Um processo não consegue ler nem corromper a memória de outro processo.</text>
  </g>
  <text x="340" y="155" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Permite overcommit de memória, compartilhamento de bibliotecas dinâmicas (.so) e paginação sob demanda.</text>
`),

  'CS-OS-VMEM-001': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">TLB (Translation Lookaside Buffer) e HugePages (2 MB / 1 GB)</text>
  <g transform="translate(50, 48)">
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b"/>
    <text x="135" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Páginas Padrão de 4 KB</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">64 GB RAM = 16.000.000 páginas</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">TLB Miss frequente em bancos de dados</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Page Table Walk de 4 níveis consome ciclos</text>

    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">HugePages (2 MB ou 1 GB)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">64 GB RAM = apenas 32.000 páginas de 2MB</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">TLB Hit rate sobe para ~99.9%!</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Padrão em PostgreSQL, Oracle, Redis</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">HugePages reduzem drasticamente a sobrecarga de tradução de endereços da MMU em heap pesados.</text>
`),

  'CS-OS-VMEM-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Tabela de Páginas de 4 Níveis no x86-64 (Page Walk)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="10" width="100" height="50" rx="4" fill="#0369a1"/>
    <text x="50" y="32" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">PGD</text>
    <text x="50" y="48" fill="#bae6fd" font-size="9" text-anchor="middle">Nível 4 (CR3)</text>

    <path d="M 105 35 L 135 35" stroke="#38bdf8" stroke-width="2"/>

    <rect x="140" y="10" width="100" height="50" rx="4" fill="#0284c7"/>
    <text x="190" y="32" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">PUD</text>
    <text x="190" y="48" fill="#bae6fd" font-size="9" text-anchor="middle">Nível 3</text>

    <path d="M 245 35 L 275 35" stroke="#38bdf8" stroke-width="2"/>

    <rect x="280" y="10" width="100" height="50" rx="4" fill="#0d9488"/>
    <text x="330" y="32" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">PMD</text>
    <text x="330" y="48" fill="#ccfbf1" font-size="9" text-anchor="middle">Nível 2</text>

    <path d="M 385 35 L 415 35" stroke="#10b981" stroke-width="2"/>

    <rect x="420" y="10" width="140" height="50" rx="4" fill="#047857" stroke="#10b981" stroke-width="2"/>
    <text x="490" y="32" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">PTE (Page Table Entry)</text>
    <text x="490" y="48" fill="#a7f3d0" font-size="9" text-anchor="middle">Endereço Físico PFN</text>
  </g>
  <text x="340" y="150" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Estrutura em árvore esparsa economiza memória: aloca apenas nós para regiões virtuais efetivamente utilizadas.</text>
`),

  'CS-OS-VMEM-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Page Faults no OS: Minor vs Major Page Fault</text>
  <g transform="translate(50, 48)">
    <!-- Minor -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="135" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Minor Page Fault (Sem I/O de Disco)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">A página já está na RAM (ex: Page Cache/COW)</text>
    <text x="135" y="60" fill="#a7f3d0" font-size="10" text-anchor="middle">Kernel apenas atualiza a entrada na PTE</text>
    <text x="135" y="76" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Latência: ~1 a 2 µs</text>

    <!-- Major -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="445" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Major Page Fault (Exige I/O de Disco)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">A página precisa ser lida do Disco / Swap / Storage</text>
    <text x="445" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Thread é colocada em estado Uninterruptible Sleep (D)</text>
    <text x="445" y="76" fill="#f87171" font-size="9" font-weight="bold" text-anchor="middle">Latência: ~1 a 10 ms (Gargalo severo)</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Monitoramento de Major Faults no Prometheus é crucial para detectar Thrashing de memória e pressão de Swap.</text>
`),

  'CS-OS-VMEM-005': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Mapeamento de Arquivos com mmap()</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">mmap(addr, length, prot, flags, fd, offset)</text>
    <text x="280" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">Projeta um arquivo de disco diretamente no espaço de endereçamento virtual da aplicação.</text>
    <text x="280" y="65" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">Acesso por ponteiros C/Go (*ptr) dispensando read() e write() manuais com paginação por demanda.</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Arquitetura de armazenamento do LMDB, Kafka (índices), SQLite e motores de busca baseados em Lucene.</text>
`)
};
