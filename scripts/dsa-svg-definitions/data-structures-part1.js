import { svgWrapper } from '../dsa-svg-base.js';

export const DATA_STRUCTURES_PART1_SVGS = {
  // === arrays-strings ===
  'DSA-STRUCT-ARRAY-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Acesso Indexado O(1) e Aritmética de Ponteiros em Vetores Contíguos</text>
  <g transform="translate(60, 55)">
    <!-- Base address pointer -->
    <rect x="0" y="30" width="80" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="40" y="55" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">arr[0]</text>
    <text x="40" y="90" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">0x1000</text>
    
    <rect x="110" y="30" width="80" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="150" y="55" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">arr[1]</text>
    <text x="150" y="90" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">0x1004</text>

    <rect x="220" y="30" width="80" height="40" fill="#065f46" stroke="#10b981" stroke-width="2.5" rx="4"/>
    <text x="260" y="55" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">arr[2]</text>
    <text x="260" y="90" fill="#34d399" font-size="10" font-family="monospace" text-anchor="middle">0x1008</text>

    <rect x="330" y="30" width="80" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="370" y="55" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">arr[3]</text>
    <text x="370" y="90" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">0x100C</text>

    <rect x="440" y="30" width="80" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="480" y="55" fill="#f8fafc" font-size="13" font-weight="bold" text-anchor="middle">arr[4]</text>
    <text x="480" y="90" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">0x1010</text>
  </g>
  <rect x="140" y="150" width="400" height="32" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
  <text x="340" y="171" fill="#34d399" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle">Endereço(i) = Base + (i × sizeof(T)) → Custo ALU O(1)</text>
`),

  'DSA-STRUCT-ARRAY-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Crescimento Amortizado de Vetores Dinâmicos: Duplicação Geométrica 2x</text>
  <g transform="translate(60, 50)">
    <text x="0" y="15" fill="#94a3b8" font-size="11">Capacidade = 4 (Cheio):</text>
    <rect x="140" y="0" width="50" height="24" fill="#3b82f6" rx="3"/>
    <rect x="195" y="0" width="50" height="24" fill="#3b82f6" rx="3"/>
    <rect x="250" y="0" width="50" height="24" fill="#3b82f6" rx="3"/>
    <rect x="305" y="0" width="50" height="24" fill="#3b82f6" rx="3"/>
  </g>
  <g transform="translate(60, 90)">
    <text x="0" y="15" fill="#10b981" font-size="11">Capacidade = 8 (Realloc 2x):</text>
    <rect x="140" y="0" width="50" height="24" fill="#10b981" rx="3"/>
    <rect x="195" y="0" width="50" height="24" fill="#10b981" rx="3"/>
    <rect x="250" y="0" width="50" height="24" fill="#10b981" rx="3"/>
    <rect x="305" y="0" width="50" height="24" fill="#10b981" rx="3"/>
    <rect x="360" y="0" width="50" height="24" fill="#047857" rx="3"/>
    <rect x="415" y="0" width="50" height="24" fill="#1e293b" stroke="#475569" rx="3"/>
    <rect x="470" y="0" width="50" height="24" fill="#1e293b" stroke="#475569" rx="3"/>
    <rect x="525" y="0" width="50" height="24" fill="#1e293b" stroke="#475569" rx="3"/>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Custo Total de N inserções = 1 + 2 + 4 + ... + N = 2N → Custo Amortizado = O(1)</text>
`),

  'DSA-STRUCT-ARRAY-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Redimensionamento Dinâmico em Vetores (Length vs Capacity)</text>
  <g transform="translate(70, 50)">
    <rect x="0" y="0" width="240" height="80" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6"/>
    <text x="120" y="25" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Antes do Resize (Append)</text>
    <text x="20" y="50" fill="#f8fafc" font-size="11">length = 4 (Ocupados)</text>
    <text x="20" y="68" fill="#f87171" font-size="11">capacity = 4 (Buffer Cheio)</text>

    <path d="M 260 40 L 300 40" stroke="#f59e0b" stroke-width="3" marker-end="url(#arrow)"/>

    <rect x="320" y="0" width="260" height="80" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="450" y="25" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Após Resize 2x em Bloco Novo</text>
    <text x="340" y="50" fill="#f8fafc" font-size="11">length = 5 (Novo item inserido)</text>
    <text x="340" y="68" fill="#34d399" font-size="11">capacity = 8 (4 slots livres reservados)</text>
  </g>
  <text x="340" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">Buffer antigo é coletado pelo GC após cópia em bloco (memmove / memcpy)</text>
`),

  'DSA-STRUCT-ARRAY-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Localidade Espacial de Cache e Prefetching em Vetores Contíguos</text>
  <g transform="translate(60, 50)">
    <!-- Cache Line 64 Bytes -->
    <rect x="0" y="0" width="560" height="60" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="6"/>
    <text x="280" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Linha de Cache L1 da CPU (64 Bytes = 16 inteiros de 4B)</text>
    <g transform="translate(15, 28)">
      <rect x="0" y="0" width="30" height="24" fill="#047857" rx="2"/><text x="15" y="16" fill="#fff" font-size="10" text-anchor="middle">A[0]</text>
      <rect x="35" y="0" width="30" height="24" fill="#047857" rx="2"/><text x="50" y="16" fill="#fff" font-size="10" text-anchor="middle">A[1]</text>
      <rect x="70" y="0" width="30" height="24" fill="#047857" rx="2"/><text x="85" y="16" fill="#fff" font-size="10" text-anchor="middle">A[2]</text>
      <rect x="105" y="0" width="30" height="24" fill="#047857" rx="2"/><text x="120" y="16" fill="#fff" font-size="10" text-anchor="middle">A[3]</text>
      <rect x="140" y="0" width="30" height="24" fill="#047857" rx="2"/><text x="155" y="16" fill="#fff" font-size="10" text-anchor="middle">A[4]</text>
      <text x="200" y="16" fill="#94a3b8" font-size="10">... Carregados juntos na mesma busca em L1 (~1ns)</text>
    </g>
  </g>
  <text x="340" y="145" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Iteração linear em Array = 1 Cache Miss a cada 16 acessos (93.75% Cache Hits)</text>
  <text x="340" y="170" fill="#94a3b8" font-size="11" text-anchor="middle">Ao contrário de nós esparsos em Heap (listas), vetores maximizam a largura de banda da CPU</text>
`),

  'DSA-STRUCT-ARRAY-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Two Pointers em Arrays: Otimização de Espaço O(N) → O(1)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="20" width="60" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="30" y="45" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">1</text>
    <text x="30" y="10" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Left →</text>

    <rect x="80" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="110" y="45" fill="#94a3b8" font-size="14" text-anchor="middle">3</text>
    <rect x="160" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="190" y="45" fill="#94a3b8" font-size="14" text-anchor="middle">5</text>
    <rect x="240" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="270" y="45" fill="#94a3b8" font-size="14" text-anchor="middle">8</text>
    <rect x="320" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="350" y="45" fill="#94a3b8" font-size="14" text-anchor="middle">11</text>

    <rect x="400" y="20" width="60" height="40" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="430" y="45" fill="#fff" font-size="14" font-weight="bold" text-anchor="middle">15</text>
    <text x="430" y="10" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">← Right</text>
  </g>
  <rect x="140" y="130" width="400" height="45" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
  <text x="340" y="148" fill="#f8fafc" font-size="11" text-anchor="middle">Soma = arr[L] + arr[R]. Se Soma &lt; Target → L++ | Se Soma &gt; Target → R--</text>
  <text x="340" y="166" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Elimina necessidade de Hash Map: Tempo O(N), Espaço O(1)</text>
`),

  'DSA-STRUCT-ARRAY-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Ring Buffers Circulares com Máscara Bitwise (head/tail)</text>
  <g transform="translate(120, 50)">
    <circle cx="220" cy="55" r="50" fill="none" stroke="#475569" stroke-width="12" stroke-dasharray="35 5"/>
    <rect x="180" y="-10" width="80" height="25" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="220" y="7" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Head (Read)</text>

    <rect x="250" y="80" width="80" height="25" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="290" y="97" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Tail (Write)</text>
  </g>
  <g transform="translate(360, 60)">
    <rect x="0" y="0" width="240" height="70" fill="#1e293b" stroke="#3b82f6" stroke-width="1" rx="6"/>
    <text x="120" y="25" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">idx = (idx + 1) &amp; (N - 1)</text>
    <text x="120" y="50" fill="#38bdf8" font-size="10" text-anchor="middle">Substitui módulo % por bitwise AND</text>
  </g>
  <text x="340" y="170" fill="#a1a1aa" font-size="11" text-anchor="middle">Utilizado em buffers IPC de áudio, sockets de rede e filas LMAX Disruptor</text>
`),

  // === linked-lists ===
  'DSA-STRUCT-LIST-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Inserção e Remoção O(1) em Listas Encadeadas via Atualização de Ponteiros</text>
  <g transform="translate(80, 60)">
    <!-- Node A -->
    <rect x="0" y="0" width="50" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="25" y="25" fill="#fff" font-size="12" text-anchor="middle">A</text>
    <rect x="50" y="0" width="30" height="40" fill="#0f766e" rx="2"/><text x="65" y="25" fill="#a7f3d0" font-size="10" text-anchor="middle">&amp;B</text>

    <!-- Node B (Deleted) -->
    <g opacity="0.4">
      <rect x="160" y="0" width="50" height="40" fill="#7f1d1d" stroke="#ef4444" rx="4"/><text x="185" y="25" fill="#fff" font-size="12" text-anchor="middle">B</text>
      <rect x="210" y="0" width="30" height="40" fill="#991b1b" rx="2"/><text x="225" y="25" fill="#fecaca" font-size="10" text-anchor="middle">&amp;C</text>
    </g>

    <!-- Node C -->
    <rect x="320" y="0" width="50" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="345" y="25" fill="#fff" font-size="12" text-anchor="middle">C</text>
    <rect x="370" y="0" width="30" height="40" fill="#0f766e" rx="2"/><text x="385" y="25" fill="#a7f3d0" font-size="10" text-anchor="middle">NULL</text>

    <!-- Bypass Arc -->
    <path d="M 80 15 Q 200 -25 320 15" fill="none" stroke="#10b981" stroke-width="2.5"/>
    <text x="200" y="-10" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">prev.next = curr.next (O(1))</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Sem deslocamento de elementos na memória RAM: Custo O(1)</text>
`),

  'DSA-STRUCT-LIST-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Nós Sentinela (Dummy Nodes) para Eliminação de Edge Cases</text>
  <g transform="translate(80, 60)">
    <!-- Sentinel Dummy Node -->
    <rect x="0" y="0" width="60" height="45" fill="#3b0764" stroke="#a855f7" stroke-width="2" rx="4"/>
    <text x="30" y="20" fill="#e9d5ff" font-size="10" font-weight="bold" text-anchor="middle">DUMMY</text>
    <text x="30" y="36" fill="#a855f7" font-size="9" text-anchor="middle">val: -1</text>
    <rect x="60" y="0" width="30" height="45" fill="#581c87" rx="2"/><text x="75" y="28" fill="#f3e8ff" font-size="10" text-anchor="middle">&amp;N1</text>

    <line x1="90" y1="22" x2="140" y2="22" stroke="#a855f7" stroke-width="2"/>

    <!-- Head Node 1 -->
    <rect x="140" y="0" width="50" height="45" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="165" y="28" fill="#fff" font-size="12" text-anchor="middle">Head</text>
    <rect x="190" y="0" width="30" height="45" fill="#0f766e" rx="2"/><text x="205" y="28" fill="#a7f3d0" font-size="10" text-anchor="middle">&amp;N2</text>

    <line x1="220" y1="22" x2="270" y2="22" stroke="#3b82f6" stroke-width="2"/>

    <!-- Node 2 -->
    <rect x="270" y="0" width="50" height="45" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="295" y="28" fill="#fff" font-size="12" text-anchor="middle">Node 2</text>
    <rect x="320" y="0" width="30" height="45" fill="#0f766e" rx="2"/><text x="335" y="28" fill="#a7f3d0" font-size="10" text-anchor="middle">NULL</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Elimina checagens if (head == null) e simplifica inserções/remoções na cabeça da lista</text>
  <text x="340" y="175" fill="#94a3b8" font-size="11" text-anchor="middle">Retorno padrão da função: return dummy.next</text>
`),

  'DSA-STRUCT-LIST-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Reversão In-Place de Lista Encadeada com Três Ponteiros</text>
  <g transform="translate(60, 55)">
    <!-- Prev -->
    <rect x="0" y="20" width="60" height="40" fill="#1e293b" stroke="#94a3b8" rx="4"/><text x="30" y="45" fill="#94a3b8" font-size="12" text-anchor="middle">Prev</text>
    
    <!-- Curr -->
    <rect x="140" y="20" width="60" height="40" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/><text x="170" y="45" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Curr</text>
    
    <!-- Next -->
    <rect x="280" y="20" width="60" height="40" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="4"/><text x="310" y="45" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Next</text>

    <!-- Inverted Arrow -->
    <path d="M 140 30 L 65 30" stroke="#f43f5e" stroke-width="2.5"/>
    <text x="100" y="20" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">curr.next = prev</text>
  </g>
  <g transform="translate(420, 50)">
    <rect x="0" y="0" width="200" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="100" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Passo a Passo O(N):</text>
    <text x="15" y="40" fill="#f8fafc" font-size="10" font-family="monospace">next = curr.next</text>
    <text x="15" y="54" fill="#f87171" font-size="10" font-family="monospace">curr.next = prev</text>
    <text x="15" y="68" fill="#34d399" font-size="10" font-family="monospace">prev = curr; curr = next</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Espaço Auxiliar: O(1) estrito | Complexidade de Tempo: O(N)</text>
`),

  'DSA-STRUCT-LIST-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Dispersão Espacial na Memória Heap e Cache Misses em Listas</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="100" height="50" fill="#7f1d1d" stroke="#ef4444" rx="4"/>
    <text x="50" y="25" fill="#fecaca" font-size="11" text-anchor="middle">Nó 1 (0x1000)</text>
    <text x="50" y="42" fill="#f87171" font-size="9" text-anchor="middle">Pointer Chase</text>

    <path d="M 100 25 Q 180 -15 220 25" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4"/>

    <rect x="220" y="0" width="100" height="50" fill="#7f1d1d" stroke="#ef4444" rx="4"/>
    <text x="270" y="25" fill="#fecaca" font-size="11" text-anchor="middle">Nó 2 (0x8F40)</text>
    <text x="270" y="42" fill="#f87171" font-size="9" text-anchor="middle">Salto na RAM</text>

    <path d="M 320 25 Q 390 65 440 25" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4"/>

    <rect x="440" y="0" width="100" height="50" fill="#7f1d1d" stroke="#ef4444" rx="4"/>
    <text x="490" y="25" fill="#fecaca" font-size="11" text-anchor="middle">Nó 3 (0x3100)</text>
    <text x="490" y="42" fill="#f87171" font-size="9" text-anchor="middle">Cache Miss L1/L2</text>
  </g>
  <text x="340" y="150" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">Cada acesso a próximo nó gera latência de ~50-100ns buscando na DRAM</text>
  <text x="340" y="172" fill="#94a3b8" font-size="11" text-anchor="middle">Razão pela qual vetores contíguos superam listas encadeadas na prática moderna</text>
`),

  'DSA-STRUCT-LIST-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">LRU Cache: Doubly Linked List + Hash Map (O(1) Get &amp; Put)</text>
  <g transform="translate(60, 50)">
    <!-- HashMap -->
    <rect x="0" y="0" width="160" height="70" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="80" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Hash Map (Chave → Nó)</text>
    <text x="20" y="42" fill="#f8fafc" font-size="10" font-family="monospace">"k1" → &amp;Node1</text>
    <text x="20" y="58" fill="#f8fafc" font-size="10" font-family="monospace">"k2" → &amp;Node2</text>

    <!-- Doubly Linked List -->
    <g transform="translate(200, 0)">
      <rect x="0" y="10" width="70" height="50" fill="#047857" stroke="#10b981" rx="4"/>
      <text x="35" y="32" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">MRU</text>
      <text x="35" y="48" fill="#a7f3d0" font-size="9" text-anchor="middle">Mais Recente</text>

      <line x1="70" y1="35" x2="110" y2="35" stroke="#10b981" stroke-width="2"/>

      <rect x="110" y="10" width="70" height="50" fill="#1e293b" stroke="#475569" rx="4"/>
      <text x="145" y="38" fill="#94a3b8" font-size="11" text-anchor="middle">Node 2</text>

      <line x1="180" y1="35" x2="220" y2="35" stroke="#f43f5e" stroke-width="2"/>

      <rect x="220" y="10" width="70" height="50" fill="#7f1d1d" stroke="#ef4444" rx="4"/>
      <text x="255" y="32" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">LRU</text>
      <text x="255" y="48" fill="#fecaca" font-size="9" text-anchor="middle">Evicting Target</text>
    </g>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Get(key): O(1) movendo nó para cabeça (MRU) | Put(key): O(1) desalojando cauda (LRU)</text>
`),

  'DSA-STRUCT-LIST-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Skip List e Faixas Expressas Multinível (Busca O(log N))</text>
  <g transform="translate(60, 50)">
    <!-- Level 3 (Express) -->
    <text x="0" y="15" fill="#f59e0b" font-size="10" font-weight="bold">L3 (Express):</text>
    <rect x="100" y="0" width="40" height="20" fill="#b45309" rx="3"/><text x="120" y="14" fill="#fff" font-size="9" text-anchor="middle">1</text>
    <line x1="140" y1="10" x2="380" y2="10" stroke="#f59e0b" stroke-width="2"/>
    <rect x="380" y="0" width="40" height="20" fill="#b45309" rx="3"/><text x="400" y="14" fill="#fff" font-size="9" text-anchor="middle">9</text>

    <!-- Level 2 -->
    <text x="0" y="45" fill="#38bdf8" font-size="10" font-weight="bold">L2 (Interm):</text>
    <rect x="100" y="30" width="40" height="20" fill="#0369a1" rx="3"/><text x="120" y="44" fill="#fff" font-size="9" text-anchor="middle">1</text>
    <line x1="140" y1="40" x2="240" y2="40" stroke="#38bdf8" stroke-width="2"/>
    <rect x="240" y="30" width="40" height="20" fill="#0369a1" rx="3"/><text x="260" y="44" fill="#fff" font-size="9" text-anchor="middle">5</text>
    <line x1="280" y1="40" x2="380" y2="40" stroke="#38bdf8" stroke-width="2"/>
    <rect x="380" y="30" width="40" height="20" fill="#0369a1" rx="3"/><text x="400" y="44" fill="#fff" font-size="9" text-anchor="middle">9</text>

    <!-- Level 1 (Base) -->
    <text x="0" y="75" fill="#10b981" font-size="10" font-weight="bold">L1 (Base):</text>
    <rect x="100" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="120" y="74" fill="#fff" font-size="9" text-anchor="middle">1</text>
    <rect x="170" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="190" y="74" fill="#fff" font-size="9" text-anchor="middle">3</text>
    <rect x="240" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="260" y="74" fill="#fff" font-size="9" text-anchor="middle">5</text>
    <rect x="310" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="330" y="74" fill="#fff" font-size="9" text-anchor="middle">7</text>
    <rect x="380" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="400" y="74" fill="#fff" font-size="9" text-anchor="middle">9</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Saltos exponenciais probabilísticos substituem árvores auto-balanceadas (usado em Redis ZSET)</text>
`),

  // === stacks-queues ===
  'DSA-STRUCT-STACK-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Comparação de Disciplinas: Pilha (LIFO) vs Fila (FIFO)</text>
  <g transform="translate(80, 50)">
    <!-- Stack LIFO -->
    <rect x="0" y="0" width="200" height="85" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="100" y="20" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Pilha (LIFO - Topo)</text>
    <rect x="40" y="30" width="120" height="18" fill="#2563eb" rx="2"/><text x="100" y="43" fill="#fff" font-size="10" text-anchor="middle">Elemento 3 (Pop ↑)</text>
    <rect x="40" y="50" width="120" height="18" fill="#1d4ed8" rx="2"/><text x="100" y="63" fill="#fff" font-size="10" text-anchor="middle">Elemento 2</text>
    <rect x="40" y="70" width="120" height="18" fill="#1e40af" rx="2"/><text x="100" y="83" fill="#fff" font-size="10" text-anchor="middle">Elemento 1 (Base)</text>

    <!-- Queue FIFO -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="220" height="85" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="110" y="20" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Fila (FIFO - Extremidades)</text>
      <rect x="15" y="38" width="55" height="30" fill="#047857" rx="3"/><text x="42" y="57" fill="#fff" font-size="10" text-anchor="middle">Out (Head)</text>
      <text x="85" y="57" fill="#94a3b8" font-size="12">→</text>
      <rect x="105" y="38" width="55" height="30" fill="#065f46" rx="3"/><text x="132" y="57" fill="#fff" font-size="10" text-anchor="middle">Mid</text>
      <text x="175" y="57" fill="#94a3b8" font-size="12">→</text>
      <rect x="195" y="38" width="15" height="30" fill="#0f766e" rx="1"/>
    </g>
  </g>
  <text x="340" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">Operações Push/Pop e Enqueue/Dequeue são estritamente O(1)</text>
`),

  'DSA-STRUCT-STACK-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Min Stack com Rastreamento Sincronizado O(1)</text>
  <g transform="translate(120, 50)">
    <!-- Main Stack -->
    <rect x="0" y="0" width="180" height="85" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="90" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Pilha Principal</text>
    <rect x="30" y="30" width="120" height="15" fill="#2563eb" rx="2"/><text x="90" y="42" fill="#fff" font-size="10" text-anchor="middle">val: 2 (Topo)</text>
    <rect x="30" y="47" width="120" height="15" fill="#1d4ed8" rx="2"/><text x="90" y="59" fill="#fff" font-size="10" text-anchor="middle">val: 6</text>
    <rect x="30" y="64" width="120" height="15" fill="#1e40af" rx="2"/><text x="90" y="76" fill="#fff" font-size="10" text-anchor="middle">val: 3 (Base)</text>

    <!-- Min Stack -->
    <g transform="translate(240, 0)">
      <rect x="0" y="0" width="180" height="85" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="90" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Pilha de Mínimos Auxiliar</text>
      <rect x="30" y="30" width="120" height="15" fill="#047857" rx="2"/><text x="90" y="42" fill="#fff" font-size="10" text-anchor="middle">min: 2 (min(2, 3))</text>
      <rect x="30" y="47" width="120" height="15" fill="#065f46" rx="2"/><text x="90" y="59" fill="#fff" font-size="10" text-anchor="middle">min: 3 (min(6, 3))</text>
      <rect x="30" y="64" width="120" height="15" fill="#0f766e" rx="2"/><text x="90" y="76" fill="#fff" font-size="10" text-anchor="middle">min: 3</text>
    </g>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">getMin() retorna o topo da pilha auxiliar instantaneamente em tempo O(1)</text>
`),

  'DSA-STRUCT-STACK-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Deque (Double-Ended Queue): Inserção e Remoção em Ambas as Pontas</text>
  <g transform="translate(80, 50)">
    <rect x="80" y="20" width="360" height="45" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="6"/>
    
    <!-- Front Ops -->
    <text x="30" y="35" fill="#38bdf8" font-size="10" font-weight="bold">push_front() →</text>
    <text x="30" y="55" fill="#f43f5e" font-size="10" font-weight="bold">← pop_front()</text>

    <!-- Interior items -->
    <rect x="100" y="28" width="60" height="30" fill="#2563eb" rx="3"/><text x="130" y="48" fill="#fff" font-size="11" text-anchor="middle">Item 1</text>
    <rect x="170" y="28" width="60" height="30" fill="#1e40af" rx="3"/><text x="200" y="48" fill="#94a3b8" font-size="11" text-anchor="middle">Item 2</text>
    <rect x="240" y="28" width="60" height="30" fill="#1e40af" rx="3"/><text x="270" y="48" fill="#94a3b8" font-size="11" text-anchor="middle">Item 3</text>
    <rect x="310" y="28" width="60" height="30" fill="#047857" rx="3"/><text x="340" y="48" fill="#fff" font-size="11" text-anchor="middle">Item 4</text>

    <!-- Back Ops -->
    <text x="450" y="35" fill="#10b981" font-size="10" font-weight="bold">← push_back()</text>
    <text x="450" y="55" fill="#f59e0b" font-size="10" font-weight="bold">pop_back() →</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Essencial para Janela Deslizante Monotônica e Algoritmo 0-1 BFS</text>
`),

  'DSA-STRUCT-STACK-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Call Stack Frames (Execução Síncrona) vs Task Queue (Assíncrona)</text>
  <g transform="translate(80, 50)">
    <!-- Call Stack -->
    <rect x="0" y="0" width="220" height="85" fill="#1e293b" stroke="#f43f5e" rx="6"/>
    <text x="110" y="20" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Call Stack (LIFO - Thread Stack)</text>
    <rect x="20" y="30" width="180" height="15" fill="#b91c1c" rx="2"/><text x="110" y="42" fill="#fff" font-size="9" text-anchor="middle">baz() frame [IP, local vars]</text>
    <rect x="20" y="48" width="180" height="15" fill="#991b1b" rx="2"/><text x="110" y="60" fill="#fff" font-size="9" text-anchor="middle">bar() frame</text>
    <rect x="20" y="66" width="180" height="15" fill="#7f1d1d" rx="2"/><text x="110" y="78" fill="#fff" font-size="9" text-anchor="middle">main() frame</text>

    <!-- Async Queue -->
    <g transform="translate(260, 0)">
      <rect x="0" y="0" width="240" height="85" fill="#1e293b" stroke="#3b82f6" rx="6"/>
      <text x="120" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Event Loop Task Queue (FIFO)</text>
      <rect x="20" y="38" width="60" height="30" fill="#1e40af" rx="3"/><text x="50" y="57" fill="#fff" font-size="9" text-anchor="middle">I/O Callback</text>
      <text x="95" y="57" fill="#94a3b8">→</text>
      <rect x="110" y="38" width="60" height="30" fill="#1d4ed8" rx="3"/><text x="140" y="57" fill="#fff" font-size="9" text-anchor="middle">Timer Job</text>
    </g>
  </g>
  <text x="340" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">Stack Overflow ocorre quando a profundidade de recursão excede a memória da pilha (~1-8MB)</text>
`),

  'DSA-STRUCT-STACK-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Implementação de Fila Usando Duas Pilhas (Custo Amortizado O(1))</text>
  <g transform="translate(80, 50)">
    <!-- Stack In -->
    <rect x="0" y="0" width="200" height="85" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="100" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">stack_in (Enqueue)</text>
    <rect x="30" y="35" width="140" height="18" fill="#2563eb" rx="2"/><text x="100" y="48" fill="#fff" font-size="10" text-anchor="middle">Novo Item 3</text>
    <rect x="30" y="57" width="140" height="18" fill="#1d4ed8" rx="2"/><text x="100" y="70" fill="#fff" font-size="10" text-anchor="middle">Novo Item 4</text>

    <!-- Transfer Arrow -->
    <path d="M 215 45 L 265 45" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow)"/>
    <text x="240" y="35" fill="#f59e0b" font-size="9" font-weight="bold" text-anchor="middle">Inverte</text>

    <!-- Stack Out -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="200" height="85" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="100" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">stack_out (Dequeue)</text>
      <rect x="30" y="35" width="140" height="18" fill="#047857" rx="2"/><text x="100" y="48" fill="#fff" font-size="10" text-anchor="middle">Primeiro Item 1 (Pop)</text>
      <rect x="30" y="57" width="140" height="18" fill="#065f46" rx="2"/><text x="100" y="70" fill="#fff" font-size="10" text-anchor="middle">Item 2</text>
    </g>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Cada elemento entra e sai de cada pilha no máximo 2 vezes: Custo Amortizado O(1)</text>
`),

  'DSA-STRUCT-STACK-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Monotonic Stack para Next Greater Element (NGE)</text>
  <g transform="translate(80, 50)">
    <g transform="translate(0, 10)">
      <text x="0" y="15" fill="#94a3b8" font-size="11">Array: [2, 1, 5, 6, 2, 3]</text>
      <text x="0" y="38" fill="#f59e0b" font-size="11">Ao encontrar 5 &gt; Topo (1):</text>
      <text x="0" y="55" fill="#10b981" font-size="11">→ Desempilha 1 com NGE = 5</text>
    </g>

    <!-- Monotonic Stack -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="220" height="85" fill="#1e293b" stroke="#a855f7" rx="6"/>
      <text x="110" y="20" fill="#d8b4fe" font-size="11" font-weight="bold" text-anchor="middle">Pilha Monotônica Decrescente</text>
      <rect x="30" y="30" width="160" height="20" fill="#7e22ce" rx="2"/><text x="110" y="44" fill="#fff" font-size="10" text-anchor="middle">Índice 2 (val: 5)</text>
      <rect x="30" y="55" width="160" height="20" fill="#581c87" rx="2"/><text x="110" y="69" fill="#fff" font-size="10" text-anchor="middle">Índice 0 (val: 2)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Resolve problemas NGE, Maior Retângulo em Histograma e Água Presa em O(N)</text>
`),

  // === hash-tables ===
  'DSA-STRUCT-HASH-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Função Hash Determinística e Mapeamento de Índice % N</text>
  <g transform="translate(60, 50)">
    <!-- Key -->
    <rect x="0" y="15" width="90" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/>
    <text x="45" y="38" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">"alice"</text>

    <!-- Hash Engine -->
    <path d="M 95 35 L 145 35" stroke="#3b82f6" stroke-width="2"/>
    <rect x="150" y="5" width="160" height="60" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="230" y="25" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Hash Function</text>
    <text x="230" y="42" fill="#94a3b8" font-size="10" font-family="monospace">Murmur3 / xxHash</text>
    <text x="230" y="56" fill="#f8fafc" font-size="10" font-family="monospace">hash = 0x8A4F3912</text>

    <!-- Index Calc -->
    <path d="M 315 35 L 365 35" stroke="#f59e0b" stroke-width="2"/>
    <rect x="370" y="15" width="140" height="40" fill="#047857" stroke="#10b981" rx="4"/>
    <text x="440" y="33" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">hash % BucketCount</text>
    <text x="440" y="47" fill="#a7f3d0" font-size="10" font-family="monospace">→ Bucket [4]</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Garante distribuição uniforme com probabilidade mínima de colisão em O(1)</text>
`),

  'DSA-STRUCT-HASH-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Resolução de Colisões: Chaining (Encadeamento) vs Open Addressing</text>
  <g transform="translate(60, 50)">
    <!-- Separate Chaining -->
    <rect x="0" y="0" width="240" height="85" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Separate Chaining (Listas)</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">Bucket 2 → [k1, v1] → [k4, v4]</text>
    <text x="15" y="60" fill="#94a3b8" font-size="9">Aloca nós extras na Heap</text>

    <!-- Open Addressing -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="260" height="85" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="130" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Open Addressing (Sondagem Linear)</text>
      <text x="15" y="42" fill="#f8fafc" font-size="10">Colisão no slot 2 → tenta slot 3, slot 4</text>
      <text x="15" y="60" fill="#34d399" font-size="9">100% contíguo, sem alocações extras</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Chaining tolera carga &gt; 1.0 | Open Addressing requer carga &lt; 0.7 para evitar clusters</text>
`),

  'DSA-STRUCT-HASH-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fator de Carga (Load Factor α = N/M) e Rehashing Dinâmico</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="220" height="75" fill="#1e293b" stroke="#f43f5e" rx="6"/>
    <text x="110" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Limite de Carga Atingido</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">α = 12 itens / 16 buckets = 0.75</text>
    <text x="20" y="62" fill="#f87171" font-size="10">Colisões começam a degradar para O(N)</text>

    <path d="M 230 37 L 280 37" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow)"/>

    <g transform="translate(290, 0)">
      <rect x="0" y="0" width="230" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="115" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Rehash: Capacidade Duplicada (32)</text>
      <text x="20" y="45" fill="#f8fafc" font-size="11">Novo α = 12 / 32 = 0.375</text>
      <text x="20" y="62" fill="#34d399" font-size="10">Itens redistribuídos: Custo Amortizado O(1)</text>
    </g>
  </g>
  <text x="340" y="160" fill="#94a3b8" font-size="11" text-anchor="middle">Em Go e Java, o threshold padrão de redimensionamento é 0.75 (ou 6.5 em Go map)</text>
`),

  'DSA-STRUCT-HASH-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Robin Hood Hashing: Minimização da Variância de Sondagem</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Princípio: "Tira do rico (baixo DIB) e dá ao pobre (alto DIB)"</text>
    <text x="30" y="45" fill="#f8fafc" font-size="11">DIB (Distance from Initial Bucket): conta quantos passos longe do hash original o item está.</text>
    <text x="30" y="62" fill="#10b981" font-size="11">Se novo_item.DIB &gt; slot.DIB → troca os elementos e continua sondando o desalojado.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz o desvio padrão do tempo de busca, garantindo buscas rápidas mesmo com fator de carga de 0.9</text>
`),

  'DSA-STRUCT-HASH-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Consistent Hashing com Anel Virtual de Tokens</text>
  <g transform="translate(100, 45)">
    <circle cx="100" cy="50" r="42" fill="none" stroke="#3b82f6" stroke-width="4"/>
    <circle cx="100" cy="8" r="6" fill="#10b981"/><text x="100" y="0" fill="#10b981" font-size="9" text-anchor="middle">Node A</text>
    <circle cx="140" cy="65" r="6" fill="#f59e0b"/><text x="165" y="68" fill="#f59e0b" font-size="9">Node B</text>
    <circle cx="60" cy="65" r="6" fill="#a855f7"/><text x="35" y="68" fill="#a855f7" font-size="9">Node C</text>

    <!-- Key mapping arrow -->
    <g transform="translate(230, 10)">
      <rect x="0" y="0" width="250" height="70" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="125" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Roteamento no Sentido Horário</text>
      <text x="15" y="42" fill="#f8fafc" font-size="10">hash(key) cai entre A e B → Node B</text>
      <text x="15" y="58" fill="#94a3b8" font-size="10">Ao adicionar nó, apenas K/N chaves migram</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Base de sharding distribuído em DynamoDB, Cassandra e Memcached</text>
`),

  'DSA-STRUCT-HASH-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Cuckoo Hashing: Duas Funções Hash e Busca O(1) no Pior Caso</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="220" height="80" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="110" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Tabela 1 (h1(key))</text>
    <rect x="20" y="35" width="180" height="30" fill="#1e3a8a" rx="3"/>
    <text x="110" y="54" fill="#93c5fd" font-size="10" text-anchor="middle">Chave reside no slot h1(k)...</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="220" height="80" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="110" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Tabela 2 (h2(key))</text>
      <rect x="20" y="35" width="180" height="30" fill="#065f46" rx="3"/>
      <text x="110" y="54" fill="#a7f3d0" font-size="10" text-anchor="middle">...ou reside no slot h2(k)</text>
    </g>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Busca inspeciona estritamente 2 posições: Custo O(1) garantido no pior caso</text>
`),

  // === trees-bst ===
  'DSA-STRUCT-TREE-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Propriedade Fundamental de BST: Left &lt; Root &lt; Right (Busca O(h))</text>
  <g transform="translate(240, 50)">
    <!-- Root -->
    <circle cx="100" cy="20" r="18" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="100" y="25" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">8</text>

    <!-- Left Subtree -->
    <line x1="85" y1="30" x2="45" y2="65" stroke="#10b981" stroke-width="2"/>
    <circle cx="40" cy="70" r="16" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="40" y="75" fill="#fff" font-size="11" text-anchor="middle">3</text>
    <text x="15" y="95" fill="#34d399" font-size="9">&lt; 8 (Esq)</text>

    <!-- Right Subtree -->
    <line x1="115" y1="30" x2="155" y2="65" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="160" cy="70" r="16" fill="#b45309" stroke="#f59e0b" stroke-width="2"/>
    <text x="160" y="75" fill="#fff" font-size="11" text-anchor="middle">10</text>
    <text x="155" y="95" fill="#fcd34d" font-size="9">&gt; 8 (Dir)</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">A cada decisão de descida, metade dos nós da subárvore é eliminada: O(log N)</text>
`),

  'DSA-STRUCT-TREE-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Rotação Simples AVL (LL) à Direita O(1)</text>
  <g transform="translate(100, 50)">
    <!-- Unbalanced -->
    <circle cx="80" cy="20" r="14" fill="#7f1d1d" stroke="#ef4444"/><text x="80" y="24" fill="#fff" font-size="10" text-anchor="middle">Y(+2)</text>
    <line x1="70" y1="30" x2="40" y2="55" stroke="#64748b"/>
    <circle cx="35" cy="65" r="14" fill="#1e293b" stroke="#f59e0b"/><text x="35" y="69" fill="#fff" font-size="10" text-anchor="middle">X(+1)</text>
    <line x1="25" y1="75" x2="10" y2="95" stroke="#64748b"/>
    <circle cx="10" cy="100" r="12" fill="#1e293b" stroke="#10b981"/><text x="10" y="104" fill="#fff" font-size="9" text-anchor="middle">Z</text>

    <!-- Arrow -->
    <path d="M 140 50 L 190 50" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrow)"/>
    <text x="165" y="40" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">rotateRight</text>

    <!-- Balanced -->
    <g transform="translate(230, 0)">
      <circle cx="80" cy="20" r="14" fill="#047857" stroke="#10b981"/><text x="80" y="24" fill="#fff" font-size="10" text-anchor="middle">X(0)</text>
      <line x1="70" y1="30" x2="40" y2="55" stroke="#64748b"/>
      <circle cx="35" cy="65" r="12" fill="#1e293b" stroke="#10b981"/><text x="35" y="69" fill="#fff" font-size="9" text-anchor="middle">Z</text>
      <line x1="90" y1="30" x2="120" y2="55" stroke="#64748b"/>
      <circle cx="125" cy="65" r="12" fill="#1e293b" stroke="#3b82f6"/><text x="125" y="69" fill="#fff" font-size="9" text-anchor="middle">Y</text>
    </g>
  </g>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Preserva a invariante BST com estritamente 3 trocas de ponteiros O(1)</text>
`),

  'DSA-STRUCT-TREE-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Degeneração de BST em Lista Ligada O(N) vs Balanceada O(log N)</text>
  <g transform="translate(80, 50)">
    <!-- Degenerate Skewed -->
    <text x="70" y="10" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">BST Degenerada (Pior Caso)</text>
    <circle cx="20" cy="30" r="12" fill="#7f1d1d" stroke="#ef4444"/><text x="20" y="34" fill="#fff" font-size="9" text-anchor="middle">1</text>
    <line x1="28" y1="38" x2="42" y2="52" stroke="#ef4444"/>
    <circle cx="50" cy="60" r="12" fill="#7f1d1d" stroke="#ef4444"/><text x="50" y="64" fill="#fff" font-size="9" text-anchor="middle">2</text>
    <line x1="58" y1="68" x2="72" y2="82" stroke="#ef4444"/>
    <circle cx="80" cy="90" r="12" fill="#7f1d1d" stroke="#ef4444"/><text x="80" y="94" fill="#fff" font-size="9" text-anchor="middle">3</text>
    <text x="80" y="115" fill="#ef4444" font-size="10" font-weight="bold">Busca: O(N)</text>

    <!-- Balanced Tree -->
    <g transform="translate(280, 0)">
      <text x="80" y="10" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Árvore AVL / Red-Black</text>
      <circle cx="80" cy="30" r="14" fill="#047857" stroke="#10b981"/><text x="80" y="34" fill="#fff" font-size="10" text-anchor="middle">2</text>
      <line x1="70" y1="40" x2="40" y2="60" stroke="#10b981"/>
      <circle cx="35" cy="70" r="12" fill="#1e293b" stroke="#10b981"/><text x="35" y="74" fill="#fff" font-size="9" text-anchor="middle">1</text>
      <line x1="90" y1="40" x2="120" y2="60" stroke="#10b981"/>
      <circle cx="125" cy="70" r="12" fill="#1e293b" stroke="#10b981"/><text x="125" y="74" fill="#fff" font-size="9" text-anchor="middle">3</text>
      <text x="80" y="115" fill="#10b981" font-size="10" font-weight="bold">Busca: O(log N)</text>
    </g>
  </g>
  <text x="340" y="175" fill="#f59e0b" font-size="11" text-anchor="middle">Inserções ordenadas sem auto-balanceamento transformam árvores em listas encadeadas</text>
`),

  'DSA-STRUCT-TREE-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Travessias em Árvore: In-Order (Ordenada), Pre-Order e Post-Order</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="160" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="80" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">In-Order (E, R, D)</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">Visita em ordem crescente</text>
    <text x="15" y="60" fill="#a7f3d0" font-size="10">Usado para validar BST</text>

    <rect x="180" y="0" width="160" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Pre-Order (R, E, D)</text>
    <text x="195" y="42" fill="#f8fafc" font-size="10">Visita raiz primeiro</text>
    <text x="195" y="60" fill="#93c5fd" font-size="10">Serialização e cópia</text>

    <rect x="360" y="0" width="180" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="450" y="20" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">Post-Order (E, D, R)</text>
    <text x="375" y="42" fill="#f8fafc" font-size="10">Visita filhos primeiro</text>
    <text x="375" y="60" fill="#fde68a" font-size="10">Deleção e cálculo de altura</text>
  </g>
  <text x="340" y="165" fill="#94a3b8" font-size="11" text-anchor="middle">Todas as travessias DFS clássicas executam em tempo O(N) e espaço O(h)</text>
`),

  'DSA-STRUCT-TREE-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Lowest Common Ancestor (LCA) em BST em Tempo O(h)</text>
  <g transform="translate(120, 45)">
    <!-- Root -->
    <circle cx="150" cy="20" r="18" fill="#047857" stroke="#10b981" stroke-width="2.5"/>
    <text x="150" y="25" fill="#fff" font-size="12" font-weight="bold" text-anchor="middle">LCA (6)</text>

    <!-- Node P -->
    <line x1="135" y1="30" x2="75" y2="70" stroke="#64748b"/>
    <circle cx="70" cy="75" r="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="70" y="80" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">P (2)</text>

    <!-- Node Q -->
    <line x1="165" y1="30" x2="225" y2="70" stroke="#64748b"/>
    <circle cx="230" cy="75" r="16" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
    <text x="230" y="80" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">Q (8)</text>
  </g>
  <g transform="translate(390, 55)">
    <rect x="0" y="0" width="220" height="65" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="110" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Regra de Divisão na BST:</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">Se P &lt; root &amp;&amp; Q &gt; root:</text>
    <text x="15" y="56" fill="#34d399" font-size="10" font-weight="bold">→ A raiz atual é o LCA!</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Identificado em uma única descida da raiz às folhas: Tempo O(h), Espaço O(1)</text>
`),

  'DSA-STRUCT-TREE-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Morris Traversal: Travessia In-Order com Espaço O(1) Estrito</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Ponteiros Temporários (Threaded Binary Trees)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Localiza o predecessor in-order (nó mais à direita da subárvore esquerda).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Cria link temporário predecessor.right = curr. Na 2ª visita, remove o link e visita curr.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Elimina pilha de recursão e pilha explícita: Tempo O(N), Espaço O(1) Absoluto</text>
`)
};
