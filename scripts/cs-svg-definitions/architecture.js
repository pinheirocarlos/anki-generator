import { svgWrapper } from '../cs-svg-base.js';

export const ARCHITECTURE_SVGS = {
  // === cpu-cache ===
  'CS-ARCH-CACHE-000': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Hierarquia de Caches da CPU: Escala de Capacidade vs Latência</text>
  <g transform="translate(140, 45)">
    <!-- Registers -->
    <rect x="110" y="0" width="180" height="24" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="200" y="16" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Registradores (~1 KB) | ~0.3 ns (1 ciclo)</text>
    
    <!-- L1 Cache -->
    <rect x="80" y="32" width="240" height="26" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="200" y="49" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">L1 Cache (~64 KB) | ~1 ns (4 ciclos)</text>
    
    <!-- L2 Cache -->
    <rect x="50" y="66" width="300" height="28" rx="4" fill="#075985" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="200" y="84" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">L2 Cache (~1 MB) | ~3-4 ns (12 ciclos)</text>
    
    <!-- L3 Cache -->
    <rect x="20" y="102" width="360" height="30" rx="4" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="200" y="121" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">L3 Cache Compartilhado (~32 MB) | ~10-15 ns (40 ciclos)</text>
    
    <!-- Main Memory RAM -->
    <rect x="0" y="140" width="400" height="30" rx="4" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="200" y="159" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Memória RAM Principal (~32-128 GB) | ~60-80 ns (~200 ciclos)</text>
  </g>
`),

  'CS-ARCH-CACHE-001': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">False Sharing: Invalidação de Cache Line em Multi-Core</text>
  <g transform="translate(40, 50)">
    <!-- Core 1 -->
    <rect x="0" y="0" width="280" height="65" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Core 0: Modifica threadA_count</text>
    <rect x="20" y="32" width="110" height="24" rx="4" fill="#7f1d1d"/>
    <text x="75" y="48" fill="#fca5a5" font-size="10" font-family="monospace" text-anchor="middle">var a (8B)</text>
    <rect x="150" y="32" width="110" height="24" rx="4" fill="#334155"/>
    <text x="205" y="48" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">var b (8B)</text>
    
    <!-- Core 2 -->
    <rect x="320" y="0" width="280" height="65" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="460" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Core 1: Modifica threadB_count</text>
    <rect x="340" y="32" width="110" height="24" rx="4" fill="#334155"/>
    <text x="395" y="48" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">var a (8B)</text>
    <rect x="470" y="32" width="110" height="24" rx="4" fill="#7f1d1d"/>
    <text x="525" y="48" fill="#fca5a5" font-size="10" font-family="monospace" text-anchor="middle">var b (8B)</text>
  </g>
  <g transform="translate(60, 130)">
    <rect x="0" y="0" width="560" height="35" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
    <text x="280" y="22" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Mesma Cache Line (64 Bytes) → Invalidação Contínua (Cache Bouncing / MESI ping-pong)</text>
  </g>
  <text x="340" y="190" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Solução: Padding de 64 bytes (Cache Line Alignment) isolando as variáveis em linhas distintas.</text>
`),

  'CS-ARCH-CACHE-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estrutura de Cache Line (64 Bytes) e Alinhamento de Memória</text>
  <g transform="translate(50, 55)">
    <!-- 64 Bytes line -->
    <rect x="0" y="0" width="580" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <rect x="0" y="0" width="72" height="50" rx="4" fill="#0369a1"/>
    <text x="36" y="25" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Word 0</text>
    <text x="36" y="40" fill="#94a3b8" font-size="9" text-anchor="middle">0..7 B</text>

    <rect x="73" y="0" width="72" height="50" fill="#0284c7"/>
    <text x="109" y="25" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Word 1</text>
    <text x="109" y="40" fill="#94a3b8" font-size="9" text-anchor="middle">8..15 B</text>

    <rect x="146" y="0" width="72" height="50" fill="#0369a1"/>
    <text x="182" y="25" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Word 2</text>
    <text x="182" y="40" fill="#94a3b8" font-size="9" text-anchor="middle">16..23 B</text>

    <rect x="219" y="0" width="72" height="50" fill="#0284c7"/>
    <text x="255" y="25" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Word 3</text>
    <text x="255" y="40" fill="#94a3b8" font-size="9" text-anchor="middle">24..31 B</text>

    <rect x="292" y="0" width="288" height="50" fill="#1e293b"/>
    <text x="436" y="30" fill="#64748b" font-size="11" font-weight="bold" text-anchor="middle">Words 4 a 7 (32..63 Bytes) — Preenchidos em Bloco Atômico</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Transferência em Bloco de 64B = Custo de Cache Miss idêntico para 1 byte ou 64 bytes contíguos</text>
  <text x="340" y="170" fill="#94a3b8" font-size="11" text-anchor="middle">Base da Localidade Espacial: Acessar array sequencial aproveita 1 miss a cada 8 elementos int64.</text>
`),

  'CS-ARCH-CACHE-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Hardware Prefetcher da CPU: Detecção de Padrões Sequenciais</text>
  <g transform="translate(60, 50)">
    <!-- Step 1 -->
    <rect x="0" y="10" width="100" height="40" rx="4" fill="#047857" stroke="#10b981" stroke-width="1.5"/>
    <text x="50" y="32" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Bloco N</text>
    <text x="50" y="44" fill="#a7f3d0" font-size="9" text-anchor="middle">CPU leu (Hit)</text>

    <!-- Arrow -->
    <path d="M 105 30 L 135 30" stroke="#10b981" stroke-width="2"/>

    <!-- Step 2 -->
    <rect x="140" y="10" width="100" height="40" rx="4" fill="#047857" stroke="#10b981" stroke-width="1.5"/>
    <text x="190" y="32" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Bloco N+1</text>
    <text x="190" y="44" fill="#a7f3d0" font-size="9" text-anchor="middle">CPU leu (Hit)</text>

    <!-- Prefetcher Trigger -->
    <path d="M 245 30 L 275 30" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>

    <!-- Step 3 (Prefetched) -->
    <rect x="280" y="10" width="120" height="40" rx="4" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="340" y="28" fill="#fef3c7" font-size="10" font-weight="bold" text-anchor="middle">Bloco N+2</text>
    <text x="340" y="42" fill="#fbbf24" font-size="9" text-anchor="middle">Prefetch Antecipado</text>

    <rect x="420" y="10" width="120" height="40" rx="4" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="480" y="28" fill="#fef3c7" font-size="10" font-weight="bold" text-anchor="middle">Bloco N+3</text>
    <text x="480" y="42" fill="#fbbf24" font-size="9" text-anchor="middle">Pré-carregado em L1</text>
  </g>
  <rect x="60" y="125" width="560" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
  <text x="340" y="150" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Padrão Sequencial (Stride = +1) → Prefetcher esconde 100% da latência de RAM na CPU</text>
`),

  'CS-ARCH-CACHE-004': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Protocolo de Coerência de Cache MESI: Máquina de Estados</text>
  <g transform="translate(60, 45)">
    <!-- Modified -->
    <rect x="0" y="10" width="115" height="50" rx="6" fill="#7f1d1d" stroke="#ef4444" stroke-width="2"/>
    <text x="57" y="32" fill="#fca5a5" font-size="12" font-weight="bold" text-anchor="middle">M (Modified)</text>
    <text x="57" y="48" fill="#fecaca" font-size="9" text-anchor="middle">Dirty, Exclusivo</text>

    <!-- Exclusive -->
    <rect x="155" y="10" width="115" height="50" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
    <text x="212" y="32" fill="#86efac" font-size="12" font-weight="bold" text-anchor="middle">E (Exclusive)</text>
    <text x="212" y="48" fill="#bbf7d0" font-size="9" text-anchor="middle">Clean, 1 Núcleo</text>

    <!-- Shared -->
    <rect x="310" y="10" width="115" height="50" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="367" y="32" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">S (Shared)</text>
    <text x="367" y="48" fill="#bfdbfe" font-size="9" text-anchor="middle">Clean, Multi-Core</text>

    <!-- Invalid -->
    <rect x="445" y="10" width="115" height="50" rx="6" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
    <text x="502" y="32" fill="#cbd5e1" font-size="12" font-weight="bold" text-anchor="middle">I (Invalid)</text>
    <text x="502" y="48" fill="#e2e8f0" font-size="9" text-anchor="middle">Dados Inválidos</text>
  </g>
  <g transform="translate(60, 125)">
    <rect x="0" y="0" width="560" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <text x="280" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Transições de Escrita (BusRdX): Invalida todas as cópias 'S' em outros núcleos → Estado 'M'</text>
    <text x="280" y="45" fill="#94a3b8" font-size="10" text-anchor="middle">Snooping no Barramento Compartilhado garante coerência estrita de memória entre todos os cores.</text>
  </g>
`),

  // === cpu-internals-isa ===
  'CS-ARCH-CPU-000': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Calling Conventions x86-64: Caller-Saved vs Callee-Saved</text>
  <g transform="translate(50, 48)">
    <!-- Caller-Saved -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="135" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Caller-Saved (Voláteis)</text>
    <text x="135" y="45" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">RAX, RCX, RDX, RSI, RDI, R8-R11</text>
    <text x="135" y="70" fill="#94a3b8" font-size="10" text-anchor="middle">Função chamada PODE sobrescrever livremente.</text>
    <text x="135" y="85" fill="#94a3b8" font-size="10" text-anchor="middle">Se caller precisar, ele mesmo salva na stack.</text>

    <!-- Callee-Saved -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Callee-Saved (Não-Voláteis)</text>
    <text x="445" y="45" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">RBX, RSP, RBP, R12, R13, R14, R15</text>
    <text x="445" y="70" fill="#94a3b8" font-size="10" text-anchor="middle">Função chamada DEVE preservar o valor original.</text>
    <text x="445" y="85" fill="#94a3b8" font-size="10" text-anchor="middle">Faz push no prólogo e pop no epílogo.</text>
  </g>
  <text x="340" y="180" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">System V AMD64 ABI: Argumentos 1 a 6 em RDI, RSI, RDX, RCX, R8, R9. Retorno em RAX.</text>
`),

  'CS-ARCH-CPU-001': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Arquitetura NUMA (Non-Uniform Memory Access) Multi-Socket</text>
  <g transform="translate(60, 48)">
    <!-- Socket 0 -->
    <rect x="0" y="0" width="240" height="90" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="120" y="24" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">NUMA Node 0</text>
    <rect x="20" y="35" width="80" height="40" rx="4" fill="#0369a1"/>
    <text x="60" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">CPU 0..15</text>
    <rect x="120" y="35" width="100" height="40" rx="4" fill="#065f46"/>
    <text x="170" y="55" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Local RAM</text>
    <text x="170" y="68" fill="#a7f3d0" font-size="9" text-anchor="middle">~60 ns</text>

    <!-- Interconnect UPI / QPI -->
    <g transform="translate(240, 35)">
      <line x1="0" y1="20" x2="80" y2="20" stroke="#f59e0b" stroke-width="3"/>
      <text x="40" y="12" fill="#f59e0b" font-size="9" font-weight="bold" text-anchor="middle">UPI Link</text>
    </g>

    <!-- Socket 1 -->
    <rect x="320" y="0" width="240" height="90" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="440" y="24" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">NUMA Node 1</text>
    <rect x="340" y="35" width="80" height="40" rx="4" fill="#0369a1"/>
    <text x="380" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">CPU 16..31</text>
    <rect x="440" y="35" width="100" height="40" rx="4" fill="#065f46"/>
    <text x="490" y="55" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Local RAM</text>
    <text x="490" y="68" fill="#a7f3d0" font-size="9" text-anchor="middle">~60 ns</text>
  </g>
  <rect x="60" y="155" width="560" height="34" rx="6" fill="#0f172a" stroke="#f43f5e" stroke-width="1"/>
  <text x="340" y="176" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Acesso Remoto (Node 0 acessando RAM do Node 1): ~100-140 ns (Penalidade NUMA de ~2x)</text>
`),

  'CS-ARCH-CPU-002': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Layout de Stack Frame x86-64 com Ponteiros RSP e RBP</text>
  <g transform="translate(180, 45)">
    <!-- Stack addresses -->
    <text x="-40" y="25" fill="#94a3b8" font-size="10" font-family="monospace">Endereço Alto</text>
    <text x="-40" y="135" fill="#94a3b8" font-size="10" font-family="monospace">Endereço Baixo</text>

    <!-- Caller Frame -->
    <rect x="50" y="0" width="260" height="28" rx="4" fill="#334155" stroke="#64748b"/>
    <text x="180" y="18" fill="#cbd5e1" font-size="10" text-anchor="middle">Parâmetros Passados pelo Caller (>6 args)</text>

    <!-- Return Address -->
    <rect x="50" y="30" width="260" height="26" rx="4" fill="#7f1d1d" stroke="#ef4444"/>
    <text x="180" y="47" fill="#fecaca" font-size="10" font-weight="bold" text-anchor="middle">Endereço de Retorno (RIP)</text>

    <!-- Saved RBP -->
    <rect x="50" y="58" width="260" height="26" rx="4" fill="#065f46" stroke="#10b981"/>
    <text x="180" y="75" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Saved Base Pointer (RBP Antigo) ← RBP</text>

    <!-- Local Variables -->
    <rect x="50" y="86" width="260" height="35" rx="4" fill="#1e3a8a" stroke="#3b82f6"/>
    <text x="180" y="103" fill="#bfdbfe" font-size="10" font-weight="bold" text-anchor="middle">Variáveis Locais &amp; Temporários</text>
    <text x="180" y="115" fill="#93c5fd" font-size="9" text-anchor="middle">Alocadas por sub $N, %rsp</text>

    <!-- Top of Stack -->
    <line x1="30" y1="125" x2="330" y2="125" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
    <text x="180" y="142" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Topo da Stack (Stack Pointer) ← RSP</text>
  </g>
  <text x="340" y="205" fill="#94a3b8" font-size="10" text-anchor="middle">A Stack cresce para baixo (direção a endereços menores). RSP diminui com cada push.</text>
`),

  'CS-ARCH-CPU-003': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Filosofia de ISA: CISC (x86-64) vs RISC (ARM64 / RISC-V)</text>
  <g transform="translate(50, 48)">
    <!-- CISC -->
    <rect x="0" y="0" width="270" height="110" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="13" font-weight="bold" text-anchor="middle">x86-64 (CISC)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">• Instruções de comprimento variável (1 a 15 bytes)</text>
    <text x="135" y="62" fill="#f8fafc" font-size="10" text-anchor="middle">• Operações diretas memória-registrador (add [rax], rbx)</text>
    <text x="135" y="80" fill="#f8fafc" font-size="10" text-anchor="middle">• Decodificadores complexos (hardware traduz p/ micro-ops)</text>
    <text x="135" y="98" fill="#94a3b8" font-size="9" text-anchor="middle">Foco: Densidade de código &amp; Retrocompatibilidade</text>

    <!-- RISC -->
    <rect x="310" y="0" width="270" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">ARM64 / Apple Silicon (RISC)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">• Instruções de tamanho fixo (estritamente 4 bytes)</text>
    <text x="445" y="62" fill="#f8fafc" font-size="10" text-anchor="middle">• Arquitetura Load/Store (apenas LDR/STR tocam na RAM)</text>
    <text x="445" y="80" fill="#f8fafc" font-size="10" text-anchor="middle">• Decodificação paralela ultra-larga (8+ decoders simples)</text>
    <text x="445" y="98" fill="#94a3b8" font-size="9" text-anchor="middle">Foco: Eficiência energética &amp; Alto paralelismo IPC</text>
  </g>
  <text x="340" y="185" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Convergência: Processadores modernos x86 quebram CISC em micro-ops RISC internamente.</text>
`),

  // === pipelining-branch-prediction ===
  'CS-ARCH-PIPE-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Pipeline Clássico de 5 Estágios da CPU (RISC)</text>
  <g transform="translate(60, 50)">
    <!-- Stage 1 -->
    <rect x="0" y="0" width="95" height="60" rx="5" fill="#0369a1" stroke="#38bdf8"/>
    <text x="47" y="26" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">IF (Fetch)</text>
    <text x="47" y="45" fill="#bae6fd" font-size="9" text-anchor="middle">Busca da RAM/L1I</text>

    <!-- Stage 2 -->
    <rect x="115" y="0" width="95" height="60" rx="5" fill="#0284c7" stroke="#38bdf8"/>
    <text x="162" y="26" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">ID (Decode)</text>
    <text x="162" y="45" fill="#bae6fd" font-size="9" text-anchor="middle">Decodifica &amp; Regs</text>

    <!-- Stage 3 -->
    <rect x="230" y="0" width="95" height="60" rx="5" fill="#0d9488" stroke="#2dd4bf"/>
    <text x="277" y="26" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">EX (Execute)</text>
    <text x="277" y="45" fill="#ccfbf1" font-size="9" text-anchor="middle">Cálculo na ALU</text>

    <!-- Stage 4 -->
    <rect x="345" y="0" width="95" height="60" rx="5" fill="#4f46e5" stroke="#818cf8"/>
    <text x="392" y="26" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">MEM (Memory)</text>
    <text x="392" y="45" fill="#e0e7ff" font-size="9" text-anchor="middle">Acesso L1 Dados</text>

    <!-- Stage 5 -->
    <rect x="460" y="0" width="95" height="60" rx="5" fill="#059669" stroke="#34d399"/>
    <text x="507" y="26" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">WB (Writeback)</text>
    <text x="507" y="45" fill="#d1fae5" font-size="9" text-anchor="middle">Grava Registrador</text>
  </g>
  <text x="340" y="145" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Throughput Ideal: 1 Instrução Concluída por Ciclo (CPI = 1.0)</text>
  <text x="340" y="170" fill="#94a3b8" font-size="11" text-anchor="middle">Sobreposição temporal: 5 instruções diferentes sendo processadas simultaneamente em cada estágio.</text>
`),

  'CS-ARCH-PIPE-001': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Branch Misprediction: Penalidade de Pipeline Flush</text>
  <g transform="translate(60, 48)">
    <!-- Prediction Flow -->
    <rect x="0" y="0" width="260" height="85" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="1.5"/>
    <text x="130" y="22" fill="#86efac" font-size="12" font-weight="bold" text-anchor="middle">Predição Correta (Hit ~96%)</text>
    <text x="130" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Branch Predictor acerta o caminho</text>
    <text x="130" y="62" fill="#bbf7d0" font-size="10" font-weight="bold" text-anchor="middle">Zero Stalls | Execução Fluida contínua</text>
    <text x="130" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Custo: 0 ciclos adicionais</text>

    <!-- Misprediction Flow -->
    <rect x="300" y="0" width="260" height="85" rx="6" fill="#7f1d1d" stroke="#ef4444" stroke-width="1.5"/>
    <text x="430" y="22" fill="#fca5a5" font-size="12" font-weight="bold" text-anchor="middle">Misprediction (Erro de Predição)</text>
    <text x="430" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Instruções especulativas inválidas</text>
    <text x="430" y="62" fill="#fecaca" font-size="10" font-weight="bold" text-anchor="middle">Pipeline Flush (Descarta 15 a 20 ciclos)</text>
    <text x="430" y="76" fill="#fca5a5" font-size="9" text-anchor="middle">CPU recarrega instruções do caminho real</text>
  </g>
  <rect x="60" y="150" width="560" height="40" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="340" y="175" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Otimização Branchless (CMOV, Bitwise): Elimina saltos condicionais em laços críticos de performance.</text>
`),

  'CS-ARCH-PIPE-002': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Data Hazard (Read-After-Write) &amp; Soluções: Stall vs ALU Forwarding</text>
  <g transform="translate(50, 48)">
    <!-- Stall Bubble -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Sem Forwarding: Pipeline Stall</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">ADD R1, R2, R3 (escreve em R1)</text>
    <text x="135" y="60" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">SUB R4, R1, R5 (precisa de R1)</text>
    <text x="135" y="76" fill="#fca5a5" font-size="9" text-anchor="middle">Aguarda WriteBack → Insere 2 Bolhas (NOPs)</text>

    <!-- ALU Forwarding / Bypassing -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Com ALU Forwarding (Bypassing)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Saída da ALU (estágio EX) é roteada</text>
    <text x="445" y="60" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">diretamente para a entrada da próxima ALU</text>
    <text x="445" y="76" fill="#34d399" font-size="9" text-anchor="middle">Zero bolhas de espera para operações aritméticas</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Load-Use Hazard: Quando a dependência vem de um LOAD da memória, 1 ciclo de stall ainda é obrigatório.</text>
  <text x="340" y="185" fill="#94a3b8" font-size="10" text-anchor="middle">Compiladores reordenam instruções independentes (Instruction Scheduling) para preencher essa lacuna.</text>
`),

  'CS-ARCH-PIPE-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Vetorização SIMD (Single Instruction, Multiple Data): AVX-512 / Neon</text>
  <g transform="translate(60, 48)">
    <!-- Scalar -->
    <rect x="0" y="0" width="260" height="75" rx="6" fill="#1e293b" stroke="#64748b"/>
    <text x="130" y="20" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">Escalar (1 operação por ciclo)</text>
    <rect x="60" y="32" width="140" height="28" rx="4" fill="#334155"/>
    <text x="130" y="50" fill="#ffffff" font-size="11" font-family="monospace" text-anchor="middle">A[0] + B[0] = C[0]</text>

    <!-- SIMD 512-bit -->
    <rect x="300" y="0" width="260" height="75" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="430" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">SIMD Vetorial (8x Float64 em 1 ciclo)</text>
    <g transform="translate(310, 32)">
      <rect x="0" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="30" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="60" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="90" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="120" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="150" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="180" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="210" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <text x="120" y="18" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">AVX-512 (512 bits)</text>
    </g>
  </g>
  <rect x="60" y="140" width="560" height="40" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
  <text x="340" y="165" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Aceleração de até 8x a 16x em Processamento de Imagens, Álgebra Linear e Machine Learning.</text>
`),

  // === storage-io-hierarchy ===
  'CS-ARCH-IO-000': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Hierarquia de Armazenamento: Dispositivos &amp; Escala de Latência</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="24" rx="4" fill="#0369a1"/>
    <text x="15" y="16" fill="#ffffff" font-size="10" font-weight="bold">CPU Registers / Caches</text>
    <text x="545" y="16" fill="#bae6fd" font-size="10" font-family="monospace" text-anchor="end">~0.3 a 15 ns</text>

    <rect x="0" y="28" width="560" height="24" rx="4" fill="#0284c7"/>
    <text x="15" y="44" fill="#ffffff" font-size="10" font-weight="bold">DRAM Principal (DDR4/DDR5)</text>
    <text x="545" y="44" fill="#bae6fd" font-size="10" font-family="monospace" text-anchor="end">~60 a 80 ns</text>

    <rect x="0" y="56" width="560" height="24" rx="4" fill="#0d9488"/>
    <text x="15" y="72" fill="#ffffff" font-size="10" font-weight="bold">SSD NVMe PCIe Gen4/5 (Flash NAND)</text>
    <text x="545" y="72" fill="#ccfbf1" font-size="10" font-family="monospace" text-anchor="end">~10 a 50 µs (1.000x RAM)</text>

    <rect x="0" y="84" width="560" height="24" rx="4" fill="#d97706"/>
    <text x="15" y="100" fill="#ffffff" font-size="10" font-weight="bold">SSD SATA AHCI</text>
    <text x="545" y="100" fill="#fef3c7" font-size="10" font-family="monospace" text-anchor="end">~100 a 200 µs</text>

    <rect x="0" y="112" width="560" height="24" rx="4" fill="#b91c1c"/>
    <text x="15" y="128" fill="#ffffff" font-size="10" font-weight="bold">HDD Mecânico (Busca Magnética + Rotação)</text>
    <text x="545" y="128" fill="#fecaca" font-size="10" font-family="monospace" text-anchor="end">~4 a 10 ms (100.000x RAM)</text>
  </g>
  <text x="340" y="195" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Analogia: 1 ciclo de CPU = 1 segundo → NVMe = 1 dia | HDD = 4 meses de espera.</text>
`),

  'CS-ARCH-IO-001': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Append-Only Log (WAL) em Motores de Banco de Dados</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="70" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="280" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Write-Ahead Log (WAL) no Disco: Apenas Escrita Sequencial no Fim</text>
    
    <!-- Log entries -->
    <rect x="20" y="32" width="90" height="26" rx="3" fill="#065f46"/>
    <text x="65" y="49" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">Tx 101 (OK)</text>

    <rect x="120" y="32" width="90" height="26" rx="3" fill="#065f46"/>
    <text x="165" y="49" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">Tx 102 (OK)</text>

    <rect x="220" y="32" width="90" height="26" rx="3" fill="#065f46"/>
    <text x="265" y="49" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">Tx 103 (OK)</text>

    <rect x="320" y="32" width="100" height="26" rx="3" fill="#047857" stroke="#34d399"/>
    <text x="370" y="49" fill="#ffffff" font-size="10" font-weight="bold" font-family="monospace" text-anchor="middle">Tx 104 [APPEND]</text>

    <path d="M 430 45 L 470 45 M 460 38 L 470 45 L 460 52" stroke="#34d399" stroke-width="2" fill="none"/>
  </g>
  <rect x="60" y="135" width="560" height="50" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Vantagem: Transforma mutações aleatórias em I/O sequencial de alta velocidade.</text>
  <text x="340" y="172" fill="#94a3b8" font-size="10" text-anchor="middle">Garante durabilidade ACID (fsync no commit) sem pagar o custo de reorganizar árvores B-Tree no disco.</text>
`),

  'CS-ARCH-IO-002': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">I/O Sequencial vs I/O Aleatório: Throughput &amp; Mecânica</text>
  <g transform="translate(50, 48)">
    <!-- Sequential -->
    <rect x="0" y="0" width="275" height="90" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="137" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">I/O Sequencial (Padrão Contíguo)</text>
    <text x="137" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">HDD: Cabeça magnética não se desloca</text>
    <text x="137" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">SSD: Otimizado para blocos NAND grandes</text>
    <text x="137" y="78" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Throughput: ~500 MB/s (HDD) / 7.000 MB/s (NVMe)</text>

    <!-- Random -->
    <rect x="305" y="0" width="275" height="90" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="442" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">I/O Aleatório (Saltos de Endereço)</text>
    <text x="442" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">HDD: Tempo de busca mecânica (Seek Time 5-10ms)</text>
    <text x="442" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">SSD: Amplificação de escrita &amp; IOPS bound</text>
    <text x="442" y="78" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">Throughput: ~1-5 MB/s (HDD) / 800 MB/s (NVMe)</text>
  </g>
  <text x="340" y="175" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Regra de Ouro em Sistemas Distribuídos: Kafka e LSM-Trees estruturam toda ingestão em I/O sequencial.</text>
`),

  'CS-ARCH-IO-003': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">OS Page Cache: Intermediando I/O entre Processo e Disco</text>
  <g transform="translate(60, 48)">
    <!-- Process -->
    <rect x="0" y="20" width="110" height="50" rx="5" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="55" y="45" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Aplicação</text>
    <text x="55" y="58" fill="#94a3b8" font-size="9" text-anchor="middle">read() / write()</text>

    <!-- Arrow -->
    <path d="M 115 45 L 175 45" stroke="#38bdf8" stroke-width="2"/>

    <!-- Page Cache -->
    <rect x="180" y="0" width="200" height="90" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="280" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Linux Page Cache (RAM)</text>
    <text x="280" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">Páginas de 4 KB em Memória</text>
    <text x="280" y="62" fill="#a7f3d0" font-size="10" text-anchor="middle">Leitura: Retorno em ~100ns (Hit)</text>
    <text x="280" y="78" fill="#fef3c7" font-size="9" text-anchor="middle">Escrita: Marcado como Dirty Page</text>

    <!-- Arrow Flush -->
    <path d="M 385 45 L 445 45" stroke="#f59e0b" stroke-width="2"/>
    <text x="415" y="38" fill="#f59e0b" font-size="8" text-anchor="middle">Flusher</text>

    <!-- Physical Disk -->
    <rect x="450" y="20" width="110" height="50" rx="5" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="505" y="45" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Disco / SSD</text>
    <text x="505" y="58" fill="#94a3b8" font-size="9" text-anchor="middle">Persistência Real</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">write() retorna instantaneamente após gravar no Page Cache; fsync() força o flush para a mídia física.</text>
`),

  'CS-ARCH-IO-004': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Mecanismo DMA (Direct Memory Access): Desafogando a CPU</text>
  <g transform="translate(60, 48)">
    <!-- CPU -->
    <rect x="0" y="0" width="140" height="60" rx="5" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="70" y="26" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">CPU Principal</text>
    <text x="70" y="44" fill="#94a3b8" font-size="9" text-anchor="middle">Apenas inicia o comando</text>

    <!-- DMA Controller -->
    <rect x="210" y="0" width="140" height="60" rx="5" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="280" y="26" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">DMA Controller</text>
    <text x="280" y="44" fill="#a7f3d0" font-size="9" text-anchor="middle">Assume o Barramento</text>

    <!-- RAM & Disk -->
    <rect x="420" y="0" width="140" height="60" rx="5" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="490" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">RAM &lt;=&gt; Disco / NIC</text>
    <text x="490" y="44" fill="#94a3b8" font-size="9" text-anchor="middle">Transferência em Bloco</text>

    <path d="M 145 30 L 205 30" stroke="#38bdf8" stroke-width="2"/>
    <path d="M 355 30 L 415 30" stroke="#10b981" stroke-width="2"/>
  </g>
  <rect x="60" y="135" width="560" height="50" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
  <text x="340" y="155" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Sem DMA: CPU move byte a byte (100% de uso de core). Com DMA: CPU livre para computar;</text>
  <text x="340" y="172" fill="#94a3b8" font-size="10" text-anchor="middle">o controlador DMA gera uma interrupção (IRQ) somente quando a transferência completa.</text>
`),

  'CS-ARCH-IO-005': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Direct I/O (O_DIRECT) vs Buffered I/O em Motores de Banco de Dados</text>
  <g transform="translate(50, 48)">
    <!-- Buffered IO -->
    <rect x="0" y="0" width="270" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="135" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Buffered I/O (Padrão)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">App Buffer → Page Cache (RAM) → Disco</text>
    <text x="135" y="62" fill="#fca5a5" font-size="10" text-anchor="middle">Problema: Double Buffering (Gasto duplo de RAM)</text>
    <text x="135" y="78" fill="#94a3b8" font-size="9" text-anchor="middle">Bom para ferramentas CLI e apps genéricas</text>

    <!-- Direct IO -->
    <rect x="310" y="0" width="270" height="90" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Direct I/O (flag O_DIRECT)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">App Buffer (InnoDB Buffer Pool) → Disco</text>
    <text x="445" y="62" fill="#a7f3d0" font-size="10" text-anchor="middle">Bypassa 100% o Page Cache do Kernel</text>
    <text x="445" y="78" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Padrão em RDBMS: MySQL, Postgres, Oracle</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">O_DIRECT entrega controle total do algoritmo de eviction (LRU/2Q) para o próprio banco de dados.</text>
`)
};
