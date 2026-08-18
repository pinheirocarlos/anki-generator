/**
 * Media Catalog & Priority Subtopic Mapping Registry
 *
 * Implements the official visual mapping and SVG generator catalog for:
 * 1. Árvores & Estruturas Hierárquicas (BST, AVL, Red-Black, Segment Tree, Trie, Heap)
 * 2. Grafos & Algoritmos de Exploração (BFS, DFS, Dijkstra, Topological Sort, DSU)
 * 3. Algoritmos Dinâmicos & Padrões LeetCode (Sliding Window, Floyd Cycle, Monotonic Stack, DP)
 * 4. Redes & Protocolos de Transporte (TCP 3-Way Handshake, Teardown, Sliding Window, TLS 1.3, DNS)
 * 5. Sistemas Operacionais, Memória & Concorrência (Virtual Memory/TLB, Process Lifecycle, CPU Cache, Go GMP, Tri-Color GC)
 * 6. Caching & Armazenamento (Cache-Aside, Write-Through/Back, LRU, Consistent Hashing, LSM-Tree vs B-Tree)
 * 7. Consistência, Replicação & Consenso (Raft Leader Election/Replication, 2PC, Vector Clocks, CAP/PACELC)
 * 8. Apache Kafka, Mensageria & Streaming (Kafka Partitions, Idempotency, Event Sourcing/CQRS, SAGA, Rate Limiting)
 * 9. SRE, Observabilidade & Deploy (Blue/Green/Canary, Testing Pyramid, Circuit Breaker, Tracing Waterfall)
 */

export const MEDIA_TIERS = {
  P1_MICRO_VIDEO: 'P1_MICRO_VIDEO',
  P2_RESPONSIVE_SVG: 'P2_RESPONSIVE_SVG',
  DUAL: 'DUAL'
};

/**
 * Standard visual theme constants for SVG diagrams
 */
export const SVG_THEME = {
  bg: '#18181b',
  cardBg: '#27272a',
  border: '#3f3f46',
  text: '#f4f4f5',
  textMuted: '#a1a1aa',
  accentEmerald: '#10b981',
  accentBlue: '#3b82f6',
  accentPurple: '#8b5cf6',
  accentAmber: '#f59e0b',
  accentRose: '#f43f5e',
  accentCyan: '#06b6d4'
};

/**
 * SVG Generators for Priority Concepts
 */
export const SVG_GENERATORS = {
  /**
   * Árvores: AVL Rotations (LL & RR)
   */
  avlRotations: () => `
<svg viewBox="0 0 680 260" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="28" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Rotação Simples AVL: Caso Esquerda-Esquerda (LL) → Rotação à Direita O(1)</text>
  
  <!-- Left Side: Unbalanced Tree -->
  <g transform="translate(60, 50)">
    <text x="100" y="0" fill="#f43f5e" font-size="12" font-weight="bold" text-anchor="middle">Desbalanceado (Fator +2)</text>
    
    <!-- Lines -->
    <line x1="100" y1="30" x2="50" y2="80" stroke="#52525b" stroke-width="2"/>
    <line x1="50" y1="90" x2="20" y2="140" stroke="#52525b" stroke-width="2"/>
    <line x1="50" y1="90" x2="80" y2="140" stroke="#52525b" stroke-width="2"/>
    <line x1="100" y1="30" x2="150" y2="80" stroke="#52525b" stroke-width="2"/>
    
    <!-- Node Y (Root) -->
    <circle cx="100" cy="30" r="18" fill="#27272a" stroke="#f43f5e" stroke-width="2"/>
    <text x="100" y="35" fill="#f4f4f5" font-size="12" font-weight="bold" text-anchor="middle">Y</text>
    
    <!-- Node X (Left Child) -->
    <circle cx="50" cy="85" r="18" fill="#27272a" stroke="#f59e0b" stroke-width="2"/>
    <text x="50" y="90" fill="#f4f4f5" font-size="12" font-weight="bold" text-anchor="middle">X</text>
    
    <!-- Node Z (Left-Left) -->
    <circle cx="20" cy="145" r="15" fill="#10b981" stroke="#10b981" stroke-width="2"/>
    <text x="20" y="150" fill="#18181b" font-size="11" font-weight="bold" text-anchor="middle">Z</text>
    
    <!-- Subtree T2 -->
    <rect x="68" y="130" width="24" height="24" rx="4" fill="#3f3f46" stroke="#71717a" stroke-width="1"/>
    <text x="80" y="146" fill="#a1a1aa" font-size="10" text-anchor="middle">T2</text>
    
    <!-- Subtree T3 -->
    <rect x="138" y="70" width="24" height="24" rx="4" fill="#3f3f46" stroke="#71717a" stroke-width="1"/>
    <text x="150" y="86" fill="#a1a1aa" font-size="10" text-anchor="middle">T3</text>
  </g>

  <!-- Middle Arrow -->
  <g transform="translate(300, 110)">
    <path d="M 10 20 L 70 20 M 55 10 L 70 20 L 55 30" stroke="#3b82f6" stroke-width="3" fill="none"/>
    <text x="40" y="0" fill="#3b82f6" font-size="11" font-weight="bold" text-anchor="middle">rotateRight(Y)</text>
  </g>

  <!-- Right Side: Balanced Tree -->
  <g transform="translate(420, 50)">
    <text x="100" y="0" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Balanceado (Fator 0)</text>
    
    <!-- Lines -->
    <line x1="100" y1="30" x2="40" y2="90" stroke="#52525b" stroke-width="2"/>
    <line x1="100" y1="30" x2="160" y2="90" stroke="#52525b" stroke-width="2"/>
    <line x1="160" y1="90" x2="135" y2="140" stroke="#52525b" stroke-width="2"/>
    <line x1="160" y1="90" x2="185" y2="140" stroke="#52525b" stroke-width="2"/>
    
    <!-- Node X (New Root) -->
    <circle cx="100" cy="30" r="18" fill="#27272a" stroke="#10b981" stroke-width="2"/>
    <text x="100" y="35" fill="#f4f4f5" font-size="12" font-weight="bold" text-anchor="middle">X</text>
    
    <!-- Node Z (Left Child) -->
    <circle cx="40" cy="90" r="16" fill="#10b981" stroke="#10b981" stroke-width="2"/>
    <text x="40" y="95" fill="#18181b" font-size="11" font-weight="bold" text-anchor="middle">Z</text>
    
    <!-- Node Y (Right Child) -->
    <circle cx="160" cy="90" r="18" fill="#27272a" stroke="#3b82f6" stroke-width="2"/>
    <text x="160" y="95" fill="#f4f4f5" font-size="12" font-weight="bold" text-anchor="middle">Y</text>
    
    <!-- Subtree T2 (Now left of Y) -->
    <rect x="123" y="130" width="24" height="24" rx="4" fill="#3f3f46" stroke="#71717a" stroke-width="1"/>
    <text x="135" y="146" fill="#a1a1aa" font-size="10" text-anchor="middle">T2</text>
    
    <!-- Subtree T3 -->
    <rect x="173" y="130" width="24" height="24" rx="4" fill="#3f3f46" stroke="#71717a" stroke-width="1"/>
    <text x="185" y="146" fill="#a1a1aa" font-size="10" text-anchor="middle">T3</text>
  </g>

  <!-- Bottom Legend -->
  <text x="340" y="240" fill="#a1a1aa" font-size="11" text-anchor="middle">Preserva a Invariante BST: Z &lt; X &lt; T2 &lt; Y &lt; T3 | Custo: 3 trocas de ponteiros O(1)</text>
</svg>`,

  /**
   * Grafos: Dijkstra Relaxation
   */
  dijkstraRelaxation: () => `
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="28" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Algoritmo de Dijkstra: Relaxamento de Arestas &amp; Min-Heap</text>

  <!-- Node U -->
  <g transform="translate(100, 70)">
    <circle cx="50" cy="50" r="26" fill="#27272a" stroke="#10b981" stroke-width="3"/>
    <text x="50" y="47" fill="#f4f4f5" font-size="14" font-weight="bold" text-anchor="middle">U</text>
    <text x="50" y="63" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">dist[u]=4</text>
  </g>

  <!-- Edge U -> V -->
  <g transform="translate(176, 120)">
    <line x1="0" y1="0" x2="220" y2="0" stroke="#3b82f6" stroke-width="3"/>
    <polygon points="220,0 205,-6 205,6" fill="#3b82f6"/>
    <rect x="90" y="-18" width="50" height="22" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1"/>
    <text x="115" y="-3" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">peso = 3</text>
  </g>

  <!-- Node V -->
  <g transform="translate(420, 70)">
    <circle cx="50" cy="50" r="26" fill="#27272a" stroke="#f59e0b" stroke-width="3"/>
    <text x="50" y="47" fill="#f4f4f5" font-size="14" font-weight="bold" text-anchor="middle">V</text>
    <text x="50" y="63" fill="#f43f5e" font-size="10" text-decoration="line-through" text-anchor="middle">dist[v]=10</text>
  </g>

  <!-- Relaxation Calculation Box -->
  <g transform="translate(140, 160)">
    <rect x="0" y="0" width="400" height="42" rx="6" fill="#27272a" stroke="#3f3f46" stroke-width="1"/>
    <text x="200" y="26" fill="#f4f4f5" font-size="12" font-weight="bold" text-anchor="middle">
      if (dist[u] + weight &lt; dist[v]) → <tspan fill="#10b981">dist[v] = 4 + 3 = 7</tspan> (Min-Heap Push)
    </text>
  </g>
  
  <text x="340" y="224" fill="#a1a1aa" font-size="11" text-anchor="middle">Complexidade com Min-Heap Binário: O((V + E) log V)</text>
</svg>`,

  /**
   * Redes: TCP 3-Way Handshake & 4-Way Teardown
   */
  tcpHandshake: () => `
<svg viewBox="0 0 680 300" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">TCP 3-Way Handshake (Estabelecimento de Conexão Confiável)</text>

  <!-- Client & Server Headers -->
  <rect x="80" y="45" width="140" height="32" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
  <text x="150" y="66" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">CLIENT (Active Open)</text>

  <rect x="460" y="45" width="140" height="32" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
  <text x="530" y="66" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">SERVER (Listen)</text>

  <!-- Timelines -->
  <line x1="150" y1="80" x2="150" y2="260" stroke="#52525b" stroke-width="2" stroke-dasharray="4"/>
  <line x1="530" y1="80" x2="530" y2="260" stroke="#52525b" stroke-width="2" stroke-dasharray="4"/>

  <!-- Step 1: SYN -->
  <g transform="translate(150, 110)">
    <line x1="0" y1="0" x2="380" y2="35" stroke="#3b82f6" stroke-width="2"/>
    <polygon points="380,35 365,28 368,40" fill="#3b82f6"/>
    <rect x="110" y="2" width="160" height="22" rx="4" fill="#27272a" stroke="#3b82f6" stroke-width="1"/>
    <text x="190" y="17" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1. SYN (seq = ISN_c)</text>
  </g>

  <!-- Step 2: SYN-ACK -->
  <g transform="translate(150, 160)">
    <line x1="380" y1="0" x2="0" y2="35" stroke="#10b981" stroke-width="2"/>
    <polygon points="0,35 15,28 12,40" fill="#10b981"/>
    <rect x="80" y="2" width="220" height="22" rx="4" fill="#27272a" stroke="#10b981" stroke-width="1"/>
    <text x="190" y="17" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. SYN-ACK (seq = ISN_s, ack = ISN_c + 1)</text>
  </g>

  <!-- Step 3: ACK -->
  <g transform="translate(150, 210)">
    <line x1="0" y1="0" x2="380" y2="35" stroke="#f59e0b" stroke-width="2"/>
    <polygon points="380,35 365,28 368,40" fill="#f59e0b"/>
    <rect x="110" y="2" width="160" height="22" rx="4" fill="#27272a" stroke="#f59e0b" stroke-width="1"/>
    <text x="190" y="17" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">3. ACK (ack = ISN_s + 1)</text>
  </g>

  <!-- Status badges -->
  <rect x="80" y="260" width="140" height="24" rx="4" fill="#14532d" stroke="#10b981" stroke-width="1"/>
  <text x="150" y="276" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">ESTABLISHED</text>

  <rect x="460" y="260" width="140" height="24" rx="4" fill="#14532d" stroke="#10b981" stroke-width="1"/>
  <text x="530" y="276" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">ESTABLISHED</text>
</svg>`,

  /**
   * Caching: Cache-Aside Pattern
   */
  cacheAsidePattern: () => `
<svg viewBox="0 0 680 260" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Padrão Cache-Aside (Lazy Loading sob Demanda)</text>

  <!-- App Server Box -->
  <g transform="translate(60, 70)">
    <rect x="0" y="0" width="130" height="90" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="65" y="40" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Application</text>
    <text x="65" y="60" fill="#94a3b8" font-size="11" text-anchor="middle">Backend Server</text>
  </g>

  <!-- Cache Box -->
  <g transform="translate(280, 50)">
    <rect x="0" y="0" width="120" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
    <text x="60" y="32" fill="#fbbf24" font-size="13" font-weight="bold" text-anchor="middle">Cache</text>
    <text x="60" y="48" fill="#94a3b8" font-size="10" text-anchor="middle">Redis / Memcached</text>
  </g>

  <!-- Database Box -->
  <g transform="translate(480, 120)">
    <rect x="0" y="0" width="130" height="70" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="65" y="36" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">Primary DB</text>
    <text x="65" y="54" fill="#94a3b8" font-size="10" text-anchor="middle">PostgreSQL / MySQL</text>
  </g>

  <!-- Flow 1: Read Cache -->
  <path d="M 190 90 L 280 80" stroke="#3b82f6" stroke-width="2" fill="none"/>
  <polygon points="280,80 268,74 270,86" fill="#3b82f6"/>
  <text x="235" y="70" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">1. Get(key)</text>

  <!-- Flow 2: Cache Miss -->
  <path d="M 280 95 L 190 105" stroke="#f43f5e" stroke-width="2" stroke-dasharray="3" fill="none"/>
  <polygon points="190,105 202,111 200,99" fill="#f43f5e"/>
  <text x="235" y="118" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">2. Miss (null)</text>

  <!-- Flow 3: Query DB -->
  <path d="M 190 135 L 480 145" stroke="#10b981" stroke-width="2" fill="none"/>
  <polygon points="480,145 468,139 470,151" fill="#10b981"/>
  <text x="335" y="138" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">3. Query DB on Miss</text>

  <!-- Flow 4: Populate Cache -->
  <path d="M 190 120 Q 300 200 350 110" stroke="#8b5cf6" stroke-width="2" fill="none"/>
  <polygon points="350,110 342,122 354,120" fill="#8b5cf6"/>
  <text x="310" y="195" fill="#a78bfa" font-size="10" font-weight="bold" text-anchor="middle">4. Set(key, val, TTL)</text>

  <!-- Footer Trade-off -->
  <text x="340" y="240" fill="#a1a1aa" font-size="11" text-anchor="middle">Vantagem: Resiliente a falhas no cache | Desvantagem: Penalidade de 3 saltos no Cache Miss</text>
</svg>`,

  /**
   * Consenso: Raft Leader Election & Heartbeats
   */
  raftConsensus: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Protocolo de Consenso Raft: Estados &amp; Eleição de Líder</text>

  <!-- State 1: Follower -->
  <g transform="translate(60, 65)">
    <circle cx="50" cy="50" r="42" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="50" y="47" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">FOLLOWER</text>
    <text x="50" y="64" fill="#94a3b8" font-size="10" text-anchor="middle">Passivo</text>
  </g>

  <!-- Transition: Follower -> Candidate -->
  <g transform="translate(160, 80)">
    <path d="M 0 35 L 120 35" stroke="#f59e0b" stroke-width="2"/>
    <polygon points="120,35 108,29 110,41" fill="#f59e0b"/>
    <text x="60" y="22" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Election Timeout</text>
    <text x="60" y="52" fill="#94a3b8" font-size="9" text-anchor="middle">Term++ / Vote self</text>
  </g>

  <!-- State 2: Candidate -->
  <g transform="translate(290, 65)">
    <circle cx="50" cy="50" r="42" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
    <text x="50" y="47" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">CANDIDATE</text>
    <text x="50" y="64" fill="#94a3b8" font-size="10" text-anchor="middle">RequestVotes</text>
  </g>

  <!-- Transition: Candidate -> Leader -->
  <g transform="translate(390, 80)">
    <path d="M 0 35 L 120 35" stroke="#10b981" stroke-width="2"/>
    <polygon points="120,35 108,29 110,41" fill="#10b981"/>
    <text x="60" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Quórum Maioria</text>
    <text x="60" y="52" fill="#94a3b8" font-size="9" text-anchor="middle">(N/2 + 1) Votos</text>
  </g>

  <!-- State 3: Leader -->
  <g transform="translate(520, 65)">
    <circle cx="50" cy="50" r="42" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="50" y="47" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">LEADER</text>
    <text x="50" y="64" fill="#94a3b8" font-size="10" text-anchor="middle">Heartbeats / Log</text>
  </g>

  <!-- Return Flow: Leader -> Follower -->
  <path d="M 540 160 Q 340 230 140 160" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4" fill="none"/>
  <polygon points="140,160 152,168 150,154" fill="#f43f5e"/>
  <text x="340" y="215" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">Descobre Term Maior (Step Down)</text>

  <!-- Footer Info -->
  <text x="340" y="255" fill="#a1a1aa" font-size="11" text-anchor="middle">Invariante de Segurança: Em qualquer termo t, existe no máximo 1 líder eleito.</text>
</svg>`,

  /**
   * Streaming: Apache Kafka Partitioning & Consumer Groups
   */
  kafkaPartitioning: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Apache Kafka: Particionamento de Tópicos &amp; Consumer Groups</text>

  <!-- Topic Box -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="360" height="170" rx="8" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
    <text x="180" y="24" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Topic: "orders-stream" (Append-Only Commit Logs)</text>

    <!-- Partition 0 -->
    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="320" height="32" rx="4" fill="#27272a" stroke="#3b82f6" stroke-width="1"/>
      <text x="60" y="20" fill="#f4f4f5" font-size="10" font-weight="bold">Partição 0:</text>
      <rect x="130" y="6" width="30" height="20" rx="2" fill="#3b82f6"/><text x="145" y="20" fill="#fff" font-size="9" text-anchor="middle">#0</text>
      <rect x="165" y="6" width="30" height="20" rx="2" fill="#3b82f6"/><text x="180" y="20" fill="#fff" font-size="9" text-anchor="middle">#1</text>
      <rect x="200" y="6" width="30" height="20" rx="2" fill="#3b82f6"/><text x="215" y="20" fill="#fff" font-size="9" text-anchor="middle">#2</text>
      <rect x="235" y="6" width="30" height="20" rx="2" fill="#10b981"/><text x="250" y="20" fill="#fff" font-size="9" text-anchor="middle">#3</text>
    </g>

    <!-- Partition 1 -->
    <g transform="translate(20, 78)">
      <rect x="0" y="0" width="320" height="32" rx="4" fill="#27272a" stroke="#8b5cf6" stroke-width="1"/>
      <text x="60" y="20" fill="#f4f4f5" font-size="10" font-weight="bold">Partição 1:</text>
      <rect x="130" y="6" width="30" height="20" rx="2" fill="#8b5cf6"/><text x="145" y="20" fill="#fff" font-size="9" text-anchor="middle">#0</text>
      <rect x="165" y="6" width="30" height="20" rx="2" fill="#8b5cf6"/><text x="180" y="20" fill="#fff" font-size="9" text-anchor="middle">#1</text>
      <rect x="200" y="6" width="30" height="20" rx="2" fill="#10b981"/><text x="215" y="20" fill="#fff" font-size="9" text-anchor="middle">#2</text>
    </g>

    <!-- Partition 2 -->
    <g transform="translate(20, 118)">
      <rect x="0" y="0" width="320" height="32" rx="4" fill="#27272a" stroke="#f59e0b" stroke-width="1"/>
      <text x="60" y="20" fill="#f4f4f5" font-size="10" font-weight="bold">Partição 2:</text>
      <rect x="130" y="6" width="30" height="20" rx="2" fill="#f59e0b"/><text x="145" y="20" fill="#fff" font-size="9" text-anchor="middle">#0</text>
      <rect x="165" y="6" width="30" height="20" rx="2" fill="#10b981"/><text x="180" y="20" fill="#fff" font-size="9" text-anchor="middle">#1</text>
    </g>
  </g>

  <!-- Consumer Group Box -->
  <g transform="translate(460, 50)">
    <rect x="0" y="0" width="180" height="170" rx="8" fill="#18181b" stroke="#10b981" stroke-width="1.5"/>
    <text x="90" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Consumer Group: "payments"</text>

    <!-- Consumer 1 -->
    <rect x="20" y="42" width="140" height="30" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1"/>
    <text x="90" y="61" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Consumer A (Part 0)</text>

    <!-- Consumer 2 -->
    <rect x="20" y="82" width="140" height="30" rx="4" fill="#1e293b" stroke="#8b5cf6" stroke-width="1"/>
    <text x="90" y="101" fill="#a78bfa" font-size="10" font-weight="bold" text-anchor="middle">Consumer B (Part 1)</text>

    <!-- Consumer 3 -->
    <rect x="20" y="122" width="140" height="30" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
    <text x="90" y="141" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Consumer C (Part 2)</text>
  </g>

  <!-- Connectors -->
  <line x1="380" y1="104" x2="480" y2="107" stroke="#3b82f6" stroke-width="2"/>
  <line x1="380" y1="144" x2="480" y2="147" stroke="#8b5cf6" stroke-width="2"/>
  <line x1="380" y1="184" x2="480" y2="187" stroke="#f59e0b" stroke-width="2"/>

  <!-- Footer -->
  <text x="340" y="250" fill="#a1a1aa" font-size="11" text-anchor="middle">Ordenação estrita é garantida por partição individual (chave hash(key) % N)</text>
</svg>`,

  /**
   * Resiliência: Circuit Breaker State Machine
   */
  circuitBreaker: () => `
<svg viewBox="0 0 680 260" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Máquina de Estados: Circuit Breaker Pattern</text>

  <!-- State 1: CLOSED -->
  <g transform="translate(60, 80)">
    <circle cx="50" cy="50" r="42" fill="#1e293b" stroke="#10b981" stroke-width="3"/>
    <text x="50" y="47" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">CLOSED</text>
    <text x="50" y="64" fill="#86efac" font-size="10" text-anchor="middle">Tráfego 100%</text>
  </g>

  <!-- Closed -> Open -->
  <g transform="translate(160, 95)">
    <line x1="0" y1="0" x2="160" y2="0" stroke="#f43f5e" stroke-width="2"/>
    <polygon points="160,0 148,-5 150,5" fill="#f43f5e"/>
    <text x="80" y="-10" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">Falhas &gt; Threshold (50%)</text>
  </g>

  <!-- State 2: OPEN -->
  <g transform="translate(330, 80)">
    <circle cx="50" cy="50" r="42" fill="#1e293b" stroke="#f43f5e" stroke-width="3"/>
    <text x="50" y="47" fill="#f43f5e" font-size="12" font-weight="bold" text-anchor="middle">OPEN</text>
    <text x="50" y="64" fill="#fca5a5" font-size="10" text-anchor="middle">Fail-Fast (0%)</text>
  </g>

  <!-- Open -> Half-Open -->
  <g transform="translate(430, 95)">
    <line x1="0" y1="0" x2="110" y2="0" stroke="#f59e0b" stroke-width="2"/>
    <polygon points="110,0 98,-5 100,5" fill="#f59e0b"/>
    <text x="55" y="-10" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Sleep Window Expira</text>
  </g>

  <!-- State 3: HALF-OPEN -->
  <g transform="translate(550, 80)">
    <circle cx="50" cy="50" r="42" fill="#1e293b" stroke="#f59e0b" stroke-width="3"/>
    <text x="50" y="42" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">HALF-OPEN</text>
    <text x="50" y="58" fill="#fde68a" font-size="9" text-anchor="middle">Canary Probe</text>
  </g>

  <!-- Half-Open -> Closed -->
  <path d="M 580 170 Q 340 240 130 170" stroke="#10b981" stroke-width="2" fill="none"/>
  <polygon points="130,170 142,178 140,164" fill="#10b981"/>
  <text x="340" y="225" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">Sucesso em Probes → Reseta Contador</text>

  <!-- Half-Open -> Open -->
  <path d="M 570 70 Q 480 35 400 70" stroke="#f43f5e" stroke-width="2" stroke-dasharray="3" fill="none"/>
  <polygon points="400,70 412,62 414,76" fill="#f43f5e"/>
  <text x="480" y="45" fill="#f43f5e" font-size="9" font-weight="bold" text-anchor="middle">1 Falha → Reabre</text>
</svg>`,

  /**
   * Redes: HTTP/1.1 vs HTTP/2 vs HTTP/3 Multiplexing
   */
  httpMultiplex: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Evolução HTTP: HTTP/1.1 vs HTTP/2 (Multiplexação) vs HTTP/3 (QUIC / UDP)</text>

  <!-- HTTP/1.1 -->
  <g transform="translate(30, 50)">
    <rect x="0" y="0" width="185" height="175" rx="6" fill="#27272a" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="92" y="22" fill="#f43f5e" font-size="12" font-weight="bold" text-anchor="middle">HTTP/1.1 (TCP)</text>
    <rect x="15" y="35" width="155" height="24" rx="3" fill="#3f3f46"/><text x="92" y="51" fill="#f4f4f5" font-size="10" text-anchor="middle">Req #1 (Bloqueante)</text>
    <rect x="15" y="65" width="155" height="24" rx="3" fill="#52525b"/><text x="92" y="81" fill="#a1a1aa" font-size="10" text-anchor="middle">Req #2 (Aguardando #1)</text>
    <rect x="15" y="95" width="155" height="24" rx="3" fill="#52525b"/><text x="92" y="111" fill="#a1a1aa" font-size="10" text-anchor="middle">Req #3 (Aguardando #2)</text>
    <text x="92" y="150" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Head-of-Line Blocking</text>
    <text x="92" y="165" fill="#a1a1aa" font-size="9" text-anchor="middle">Exige 6 conexões TCP paralelas</text>
  </g>

  <!-- HTTP/2 -->
  <g transform="translate(245, 50)">
    <rect x="0" y="0" width="190" height="175" rx="6" fill="#27272a" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="95" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">HTTP/2 (1 TCP)</text>
    <rect x="15" y="35" width="45" height="22" rx="3" fill="#3b82f6"/><text x="37" y="50" fill="#fff" font-size="9" text-anchor="middle">F1 #1</text>
    <rect x="70" y="35" width="45" height="22" rx="3" fill="#10b981"/><text x="92" y="50" fill="#fff" font-size="9" text-anchor="middle">F1 #2</text>
    <rect x="125" y="35" width="45" height="22" rx="3" fill="#f59e0b"/><text x="147" y="50" fill="#fff" font-size="9" text-anchor="middle">F1 #3</text>
    <rect x="15" y="65" width="45" height="22" rx="3" fill="#10b981"/><text x="37" y="80" fill="#fff" font-size="9" text-anchor="middle">F2 #2</text>
    <rect x="70" y="65" width="45" height="22" rx="3" fill="#3b82f6"/><text x="92" y="80" fill="#fff" font-size="9" text-anchor="middle">F2 #1</text>
    <rect x="125" y="65" width="45" height="22" rx="3" fill="#f59e0b"/><text x="147" y="80" fill="#fff" font-size="9" text-anchor="middle">F2 #3</text>
    <text x="95" y="115" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Multiplexação de Streams</text>
    <text x="95" y="145" fill="#fca5a5" font-size="9" text-anchor="middle">Perda de 1 pacote TCP</text>
    <text x="95" y="160" fill="#fca5a5" font-size="9" text-anchor="middle">pausa todas as streams</text>
  </g>

  <!-- HTTP/3 -->
  <g transform="translate(465, 50)">
    <rect x="0" y="0" width="185" height="175" rx="6" fill="#27272a" stroke="#10b981" stroke-width="1.5"/>
    <text x="92" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">HTTP/3 (QUIC / UDP)</text>
    <rect x="15" y="35" width="155" height="22" rx="3" fill="#047857"/><text x="92" y="50" fill="#a7f3d0" font-size="9" text-anchor="middle">Stream #1 (Independente)</text>
    <rect x="15" y="65" width="155" height="22" rx="3" fill="#047857"/><text x="92" y="80" fill="#a7f3d0" font-size="9" text-anchor="middle">Stream #2 (Independente)</text>
    <rect x="15" y="95" width="155" height="22" rx="3" fill="#047857"/><text x="92" y="110" fill="#a7f3d0" font-size="9" text-anchor="middle">Stream #3 (Independente)</text>
    <text x="92" y="145" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Zero HoL Blocking</text>
    <text x="92" y="160" fill="#a1a1aa" font-size="9" text-anchor="middle">Perda em Stream 1 não afeta 2</text>
  </g>

  <text x="340" y="250" fill="#a1a1aa" font-size="11" text-anchor="middle">Evolução: Conexões Múltiplas (1.1) → Conexão Única Multiplexada (2) → Transporte Independente por Stream (3)</text>
</svg>`,

  /**
   * Redes & Segurança: Handshake TLS 1.3
   */
  tlsHandshake: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">TLS 1.3 Handshake Criptográfico (1-RTT com Troca ECDHE)</text>

  <!-- Client and Server Columns -->
  <rect x="70" y="45" width="130" height="30" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="135" y="65" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">CLIENT</text>

  <rect x="480" y="45" width="130" height="30" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
  <text x="545" y="65" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">SERVER</text>

  <line x1="135" y1="80" x2="135" y2="230" stroke="#52525b" stroke-width="2" stroke-dasharray="4"/>
  <line x1="545" y1="80" x2="545" y2="230" stroke="#52525b" stroke-width="2" stroke-dasharray="4"/>

  <!-- Step 1: ClientHello -->
  <g transform="translate(135, 95)">
    <line x1="0" y1="0" x2="410" y2="30" stroke="#3b82f6" stroke-width="2"/>
    <polygon points="410,30 395,23 398,35" fill="#3b82f6"/>
    <rect x="70" y="-3" width="270" height="22" rx="4" fill="#27272a" stroke="#3b82f6" stroke-width="1"/>
    <text x="205" y="12" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">1. ClientHello + KeyShare (ECDHE) + Ciphers</text>
  </g>

  <!-- Step 2: ServerHello -->
  <g transform="translate(135, 145)">
    <line x1="410" y1="0" x2="0" y2="30" stroke="#10b981" stroke-width="2"/>
    <polygon points="0,30 15,23 12,35" fill="#10b981"/>
    <rect x="40" y="-3" width="330" height="22" rx="4" fill="#27272a" stroke="#10b981" stroke-width="1"/>
    <text x="205" y="12" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">2. ServerHello + KeyShare + {EncryptedExtensions, Cert, Finished}</text>
  </g>

  <!-- Step 3: Application Data Encrypted -->
  <g transform="translate(135, 195)">
    <line x1="0" y1="0" x2="410" y2="0" stroke="#f59e0b" stroke-width="3"/>
    <polygon points="410,0 395,-6 395,6" fill="#f59e0b"/>
    <line x1="410" y1="12" x2="0" y2="12" stroke="#f59e0b" stroke-width="3"/>
    <polygon points="0,12 15,6 15,18" fill="#f59e0b"/>
    <rect x="100" y="-8" width="210" height="26" rx="4" fill="#14532d" stroke="#10b981" stroke-width="1.5"/>
    <text x="205" y="9" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">🔒 Dados da Aplicação (HTTP/2 / HTTP/3)</text>
  </g>

  <text x="340" y="255" fill="#a1a1aa" font-size="11" text-anchor="middle">1-RTT: Parâmetros Diffie-Hellman enviados no primeiro pacote economizam 1 ida e volta completa</text>
</svg>`,

  /**
   * Memória: Tradução de Memória Virtual & TLB
   */
  virtualMemory: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Tradução de Memória Virtual: TLB, Page Table Multinível &amp; Frame Físico</text>

  <!-- Virtual Address Box -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="180" height="50" rx="6" fill="#27272a" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="90" y="18" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Endereço Virtual (48-bit)</text>
    <rect x="10" y="25" width="100" height="18" rx="2" fill="#1e293b" stroke="#3b82f6" stroke-width="1"/>
    <text x="60" y="38" fill="#38bdf8" font-size="9" text-anchor="middle">VPN (Virtual Page)</text>
    <rect x="115" y="25" width="55" height="18" rx="2" fill="#1e293b" stroke="#a1a1aa" stroke-width="1"/>
    <text x="142" y="38" fill="#a1a1aa" font-size="9" text-anchor="middle">Offset</text>
  </g>

  <!-- TLB Box -->
  <g transform="translate(260, 50)">
    <rect x="0" y="0" width="160" height="70" rx="6" fill="#27272a" stroke="#f59e0b" stroke-width="2"/>
    <text x="80" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">TLB (MMU Hardware)</text>
    <text x="80" y="42" fill="#a1a1aa" font-size="10" text-anchor="middle">Cache L1 de Tradução</text>
    <text x="80" y="58" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">Hit: ~0.5 - 1 ns</text>
  </g>

  <!-- Page Table Walk (Miss) -->
  <g transform="translate(260, 145)">
    <rect x="0" y="0" width="160" height="65" rx="6" fill="#27272a" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="80" y="20" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">Page Table 4 Níveis</text>
    <text x="80" y="38" fill="#a1a1aa" font-size="9" text-anchor="middle">CR3 → PGD → PUD → PTE</text>
    <text x="80" y="54" fill="#fca5a5" font-size="9" text-anchor="middle">TLB Miss: ~50 - 100 ns</text>
  </g>

  <!-- Physical Address Box -->
  <g transform="translate(460, 50)">
    <rect x="0" y="0" width="180" height="50" rx="6" fill="#27272a" stroke="#10b981" stroke-width="1.5"/>
    <text x="90" y="18" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Endereço Físico na RAM</text>
    <rect x="10" y="25" width="100" height="18" rx="2" fill="#14532d" stroke="#10b981" stroke-width="1"/>
    <text x="60" y="38" fill="#86efac" font-size="9" text-anchor="middle">PFN (Page Frame)</text>
    <rect x="115" y="25" width="55" height="18" rx="2" fill="#1e293b" stroke="#a1a1aa" stroke-width="1"/>
    <text x="142" y="38" fill="#a1a1aa" font-size="9" text-anchor="middle">Offset</text>
  </g>

  <!-- Flow Arrows -->
  <path d="M 220 75 L 260 75" stroke="#3b82f6" stroke-width="2" fill="none"/>
  <polygon points="260,75 250,70 250,80" fill="#3b82f6"/>

  <path d="M 420 75 L 460 75" stroke="#10b981" stroke-width="2" fill="none"/>
  <polygon points="460,75 450,70 450,80" fill="#10b981"/>
  <text x="440" y="65" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">Hit</text>

  <path d="M 340 120 L 340 145" stroke="#f43f5e" stroke-width="2" stroke-dasharray="3" fill="none"/>
  <polygon points="340,145 335,135 345,135" fill="#f43f5e"/>
  <text x="365" y="135" fill="#f43f5e" font-size="9" font-weight="bold">Miss</text>

  <path d="M 420 180 Q 550 180 550 100" stroke="#10b981" stroke-width="2" fill="none"/>
  <polygon points="550,100 545,110 555,110" fill="#10b981"/>

  <text x="340" y="245" fill="#a1a1aa" font-size="11" text-anchor="middle">HugePages (2MB / 1GB) reduzem a pressão na TLB aumentando a cobertura de memória por entrada</text>
</svg>`,

  /**
   * SO: Ciclo de Vida de Processos
   */
  processLifecycle: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Máquina de Estados: Ciclo de Vida de Processos no SO</text>

  <!-- NEW -->
  <g transform="translate(30, 110)">
    <circle cx="35" cy="35" r="32" fill="#1e293b" stroke="#a1a1aa" stroke-width="2"/>
    <text x="35" y="32" fill="#f4f4f5" font-size="11" font-weight="bold" text-anchor="middle">NEW</text>
    <text x="35" y="46" fill="#a1a1aa" font-size="9" text-anchor="middle">fork()</text>
  </g>

  <!-- READY -->
  <g transform="translate(160, 110)">
    <circle cx="35" cy="35" r="32" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="35" y="32" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">READY</text>
    <text x="35" y="46" fill="#94a3b8" font-size="9" text-anchor="middle">Fila CFS</text>
  </g>

  <!-- RUNNING -->
  <g transform="translate(350, 110)">
    <circle cx="35" cy="35" r="32" fill="#1e293b" stroke="#10b981" stroke-width="2.5"/>
    <text x="35" y="32" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">RUNNING</text>
    <text x="35" y="46" fill="#86efac" font-size="9" text-anchor="middle">CPU Core</text>
  </g>

  <!-- WAITING / BLOCKED -->
  <g transform="translate(255, 195)">
    <circle cx="35" cy="35" r="30" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
    <text x="35" y="32" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">BLOCKED</text>
    <text x="35" y="45" fill="#fde68a" font-size="8" text-anchor="middle">I/O / Lock</text>
  </g>

  <!-- TERMINATED -->
  <g transform="translate(540, 110)">
    <circle cx="35" cy="35" r="32" fill="#1e293b" stroke="#f43f5e" stroke-width="2"/>
    <text x="35" y="32" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">TERMINATED</text>
    <text x="35" y="46" fill="#fca5a5" font-size="8" text-anchor="middle">exit() / Zombie</text>
  </g>

  <!-- Arrows -->
  <line x1="97" y1="145" x2="160" y2="145" stroke="#a1a1aa" stroke-width="2"/>
  <polygon points="160,145 150,140 150,150" fill="#a1a1aa"/>
  <text x="128" y="138" fill="#a1a1aa" font-size="8" text-anchor="middle">Admitted</text>

  <line x1="227" y1="135" x2="350" y2="135" stroke="#3b82f6" stroke-width="2"/>
  <polygon points="350,135 340,130 340,140" fill="#3b82f6"/>
  <text x="288" y="128" fill="#38bdf8" font-size="8" text-anchor="middle">Scheduler Dispatch</text>

  <path d="M 365 110 Q 290 65 215 110" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="3" fill="none"/>
  <polygon points="215,110 227,105 223,115" fill="#8b5cf6"/>
  <text x="290" y="78" fill="#a78bfa" font-size="8" text-anchor="middle">Preemption / Time Slice Expired</text>

  <path d="M 365 175 L 320 205" stroke="#f59e0b" stroke-width="1.5" fill="none"/>
  <polygon points="320,205 330,198 322,190" fill="#f59e0b"/>
  <text x="375" y="200" fill="#fbbf24" font-size="8">I/O Wait</text>

  <path d="M 255 215 L 205 175" stroke="#10b981" stroke-width="1.5" fill="none"/>
  <polygon points="205,175 210,186 218,178" fill="#10b981"/>
  <text x="195" y="210" fill="#34d399" font-size="8">I/O Complete</text>

  <line x1="417" y1="145" x2="540" y2="145" stroke="#f43f5e" stroke-width="2"/>
  <polygon points="540,145 530,140 530,150" fill="#f43f5e"/>
  <text x="478" y="138" fill="#f43f5e" font-size="8" text-anchor="middle">Exit / Syscall</text>

  <text x="340" y="255" fill="#a1a1aa" font-size="11" text-anchor="middle">Context Switch: Salva PCB/TCB da thread anterior e restaura registradores e ponteiro de pilha (SP)</text>
</svg>`,

  /**
   * Hardware: CPU Cache Coherence MESI & False Sharing
   */
  cpuCacheMESI: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Coerência de Cache MESI &amp; False Sharing em Linhas de 64 Bytes</text>

  <!-- Core 0 -->
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="220" height="150" rx="8" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="110" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">CPU Core 0 (Thread A)</text>
    
    <!-- L1 Cache Line -->
    <g transform="translate(15, 45)">
      <rect x="0" y="0" width="190" height="40" rx="4" fill="#27272a" stroke="#f59e0b" stroke-width="1.5"/>
      <text x="95" y="16" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Cache Line 64 Bytes [Estado: M]</text>
      <rect x="10" y="22" width="80" height="14" rx="2" fill="#3b82f6"/><text x="50" y="33" fill="#fff" font-size="8" text-anchor="middle">var a (Core 0)</text>
      <rect x="100" y="22" width="80" height="14" rx="2" fill="#52525b"/><text x="140" y="33" fill="#a1a1aa" font-size="8" text-anchor="middle">var b (Core 1)</text>
    </g>
    <text x="110" y="125" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">Escrita em var a</text>
    <text x="110" y="140" fill="#a1a1aa" font-size="9" text-anchor="middle">Invalida a linha inteira no Core 1</text>
  </g>

  <!-- Bus Invalidation Pulse -->
  <g transform="translate(300, 100)">
    <path d="M 0 20 L 80 20 M 65 10 L 80 20 L 65 30" stroke="#f43f5e" stroke-width="2.5" fill="none"/>
    <text x="40" y="10" fill="#f43f5e" font-size="9" font-weight="bold" text-anchor="middle">Bus Invalidate</text>
    <text x="40" y="42" fill="#a1a1aa" font-size="8" text-anchor="middle">MESI Snooping</text>
  </g>

  <!-- Core 1 -->
  <g transform="translate(400, 50)">
    <rect x="0" y="0" width="220" height="150" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="110" y="24" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">CPU Core 1 (Thread B)</text>
    
    <!-- L1 Cache Line -->
    <g transform="translate(15, 45)">
      <rect x="0" y="0" width="190" height="40" rx="4" fill="#27272a" stroke="#f43f5e" stroke-width="1.5"/>
      <text x="95" y="16" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">Cache Line 64 Bytes [Estado: I]</text>
      <rect x="10" y="22" width="80" height="14" rx="2" fill="#52525b"/><text x="50" y="33" fill="#a1a1aa" font-size="8" text-anchor="middle">var a (Core 0)</text>
      <rect x="100" y="22" width="80" height="14" rx="2" fill="#10b981"/><text x="140" y="33" fill="#fff" font-size="8" text-anchor="middle">var b (Core 1)</text>
    </g>
    <text x="110" y="125" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">Cache Miss Contínuo</text>
    <text x="110" y="140" fill="#a1a1aa" font-size="9" text-anchor="middle">Mesmo alterando apenas var b</text>
  </g>

  <text x="340" y="250" fill="#a1a1aa" font-size="11" text-anchor="middle">Solução: Padding de 64 bytes (@Contended / alignas(64)) isolando variáveis em linhas distintas</text>
</svg>`,

  /**
   * Runtimes: Tri-Color GC
   */
  triColorGC: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Garbage Collector: Abstração Tri-Color Concorrente &amp; Write Barrier</text>

  <!-- Black Set -->
  <g transform="translate(50, 55)">
    <rect x="0" y="0" width="160" height="150" rx="8" fill="#18181b" stroke="#10b981" stroke-width="2"/>
    <text x="80" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">PRETO (Black Set)</text>
    <circle cx="50" cy="65" r="18" fill="#27272a" stroke="#10b981" stroke-width="2"/>
    <text x="50" y="70" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Root</text>
    <circle cx="110" cy="95" r="18" fill="#27272a" stroke="#10b981" stroke-width="2"/>
    <text x="110" y="100" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Obj A</text>
    <text x="80" y="138" fill="#a1a1aa" font-size="9" text-anchor="middle">Escaneado (VIVO)</text>
  </g>

  <!-- Grey Set -->
  <g transform="translate(260, 55)">
    <rect x="0" y="0" width="160" height="150" rx="8" fill="#18181b" stroke="#f59e0b" stroke-width="2"/>
    <text x="80" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">CINZA (Grey Set)</text>
    <circle cx="80" cy="75" r="22" fill="#27272a" stroke="#f59e0b" stroke-width="2.5"/>
    <text x="80" y="80" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Obj B</text>
    <text x="80" y="125" fill="#fde68a" font-size="9" font-weight="bold" text-anchor="middle">Fronteira / Fila GC</text>
    <text x="80" y="140" fill="#a1a1aa" font-size="9" text-anchor="middle">Ponteiros pendentes</text>
  </g>

  <!-- White Set -->
  <g transform="translate(470, 55)">
    <rect x="0" y="0" width="160" height="150" rx="8" fill="#18181b" stroke="#f43f5e" stroke-width="2"/>
    <text x="80" y="22" fill="#f43f5e" font-size="12" font-weight="bold" text-anchor="middle">BRANCO (White Set)</text>
    <circle cx="55" cy="75" r="18" fill="#27272a" stroke="#71717a" stroke-width="2"/>
    <text x="55" y="80" fill="#a1a1aa" font-size="11" text-anchor="middle">Obj C</text>
    <circle cx="115" cy="100" r="18" fill="#27272a" stroke="#f43f5e" stroke-width="2"/>
    <text x="115" y="105" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">Lixo</text>
    <text x="80" y="138" fill="#a1a1aa" font-size="9" text-anchor="middle">Não alcançado (Sweep)</text>
  </g>

  <!-- Pointers -->
  <line x1="128" y1="95" x2="260" y2="95" stroke="#10b981" stroke-width="2"/>
  <polygon points="260,95 250,90 250,100" fill="#10b981"/>

  <line x1="362" y1="95" x2="470" y2="95" stroke="#f59e0b" stroke-width="2"/>
  <polygon points="470,95 460,90 460,100" fill="#f59e0b"/>

  <!-- Write Barrier Warning -->
  <text x="340" y="235" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Write Barrier: Impede que mutator crie ponteiro direto Preto → Branco sem colorir de Cinza</text>
  <text x="340" y="255" fill="#a1a1aa" font-size="10" text-anchor="middle">Fase Final: Todo o conjunto branco restante é desalocado na etapa concorrente de Sweep</text>
</svg>`,

  /**
   * Runtimes: Go GMP Scheduler & Work Stealing
   */
  goGMP: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Go Runtime Scheduler: Modelo GMP &amp; Work-Stealing</text>

  <!-- Global Run Queue -->
  <g transform="translate(180, 45)">
    <rect x="0" y="0" width="320" height="30" rx="4" fill="#27272a" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="80" y="20" fill="#a78bfa" font-size="10" font-weight="bold">Global Run Queue (GRQ):</text>
    <rect x="200" y="5" width="22" height="20" rx="2" fill="#8b5cf6"/><text x="211" y="19" fill="#fff" font-size="9" text-anchor="middle">G5</text>
    <rect x="230" y="5" width="22" height="20" rx="2" fill="#8b5cf6"/><text x="241" y="19" fill="#fff" font-size="9" text-anchor="middle">G6</text>
    <rect x="260" y="5" width="22" height="20" rx="2" fill="#8b5cf6"/><text x="271" y="19" fill="#fff" font-size="9" text-anchor="middle">G7</text>
  </g>

  <!-- Processor P0 -->
  <g transform="translate(60, 95)">
    <rect x="0" y="0" width="240" height="125" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="120" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Processor P0 (Logical Context)</text>
    
    <!-- Local Run Queue -->
    <rect x="15" y="32" width="210" height="28" rx="3" fill="#27272a" stroke="#3b82f6" stroke-width="1"/>
    <text x="25" y="50" fill="#94a3b8" font-size="9">LRQ:</text>
    <rect x="55" y="37" width="22" height="18" rx="2" fill="#3b82f6"/><text x="66" y="50" fill="#fff" font-size="9" text-anchor="middle">G1</text>
    <rect x="85" y="37" width="22" height="18" rx="2" fill="#3b82f6"/><text x="96" y="50" fill="#fff" font-size="9" text-anchor="middle">G2</text>
    <rect x="115" y="37" width="22" height="18" rx="2" fill="#3b82f6"/><text x="126" y="50" fill="#fff" font-size="9" text-anchor="middle">G3</text>

    <!-- Attached OS Thread M0 -->
    <rect x="15" y="70" width="210" height="42" rx="4" fill="#14532d" stroke="#10b981" stroke-width="1.5"/>
    <text x="120" y="88" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">OS Thread M0 (Running G0)</text>
    <text x="120" y="103" fill="#a7f3d0" font-size="9" text-anchor="middle">Executa Goroutine ativa na CPU</text>
  </g>

  <!-- Work-Stealing Arrow -->
  <g transform="translate(315, 130)">
    <path d="M 40 10 L 0 10 M 15 0 L 0 10 L 15 20" stroke="#f59e0b" stroke-width="2.5" fill="none"/>
    <text x="20" y="35" fill="#fbbf24" font-size="9" font-weight="bold" text-anchor="middle">Work Stealing</text>
    <text x="20" y="48" fill="#a1a1aa" font-size="8" text-anchor="middle">Rouba 50% de P0</text>
  </g>

  <!-- Processor P1 -->
  <g transform="translate(380, 95)">
    <rect x="0" y="0" width="240" height="125" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/>
    <text x="120" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Processor P1 (Idle / Stealing)</text>
    
    <!-- Local Run Queue -->
    <rect x="15" y="32" width="210" height="28" rx="3" fill="#27272a" stroke="#f59e0b" stroke-width="1"/>
    <text x="25" y="50" fill="#94a3b8" font-size="9">LRQ:</text>
    <text x="120" y="50" fill="#f43f5e" font-size="9" font-style="italic" text-anchor="middle">[Fila Vazia → Dispara Roubo]</text>

    <!-- Attached OS Thread M1 -->
    <rect x="15" y="70" width="210" height="42" rx="4" fill="#27272a" stroke="#52525b" stroke-width="1"/>
    <text x="120" y="88" fill="#a1a1aa" font-size="11" font-weight="bold" text-anchor="middle">OS Thread M1</text>
    <text x="120" y="103" fill="#71717a" font-size="9" text-anchor="middle">Aguardando Goroutine</text>
  </g>

  <text x="340" y="250" fill="#a1a1aa" font-size="11" text-anchor="middle">M:N Scheduler: Mapeia milhares de Goroutines (2KB) sobre um número fixo de Threads do Kernel (GOMAXPROCS)</text>
</svg>`,

  /**
   * Runtimes: JVM Generational Heap & Metaspace
   */
  jvmGenerationalHeap: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Organização da Memória da JVM: Heap Generacional &amp; Metaspace</text>

  <!-- Young Generation -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="150" rx="6" fill="#18181b" stroke="#3b82f6" stroke-width="2"/>
    <text x="140" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Young Generation (Minor GC - Rápido)</text>
    
    <!-- Eden -->
    <rect x="15" y="35" width="130" height="60" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1"/>
    <text x="80" y="60" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Eden Space</text>
    <text x="80" y="78" fill="#94a3b8" font-size="9" text-anchor="middle">Novos Objetos (new)</text>

    <!-- Survivor S0 / S1 -->
    <g transform="translate(155, 35)">
      <rect x="0" y="0" width="110" height="26" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
      <text x="55" y="17" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Survivor S0 (From)</text>
      <rect x="0" y="34" width="110" height="26" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
      <text x="55" y="51" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Survivor S1 (To)</text>
    </g>

    <text x="140" y="125" fill="#a1a1aa" font-size="9" text-anchor="middle">Hipótese Geracional Fraca: 98% dos objetos morrem jovens</text>
    <text x="140" y="140" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">Idade &gt; MaxTenuringThreshold (15) → Promoção</text>
  </g>

  <!-- Old / Tenured Generation -->
  <g transform="translate(340, 50)">
    <rect x="0" y="0" width="180" height="150" rx="6" fill="#18181b" stroke="#f59e0b" stroke-width="2"/>
    <text x="90" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Old / Tenured Gen</text>
    <rect x="15" y="35" width="150" height="85" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
    <text x="90" y="65" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Objetos Longevos</text>
    <text x="90" y="85" fill="#94a3b8" font-size="9" text-anchor="middle">Caches, Singletons, Pools</text>
    <text x="90" y="105" fill="#f43f5e" font-size="9" font-weight="bold" text-anchor="middle">Major / Full GC (STW)</text>
    <text x="90" y="138" fill="#a1a1aa" font-size="9" text-anchor="middle">Mark-Sweep-Compact</text>
  </g>

  <!-- Metaspace (Native Memory) -->
  <g transform="translate(540, 50)">
    <rect x="0" y="0" width="100" height="150" rx="6" fill="#18181b" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="50" y="22" fill="#a78bfa" font-size="11" font-weight="bold" text-anchor="middle">Metaspace</text>
    <rect x="10" y="35" width="80" height="85" rx="4" fill="#1e293b" stroke="#8b5cf6" stroke-width="1"/>
    <text x="50" y="60" fill="#a78bfa" font-size="9" font-weight="bold" text-anchor="middle">Off-Heap</text>
    <text x="50" y="80" fill="#94a3b8" font-size="8" text-anchor="middle">Klass Meta,</text>
    <text x="50" y="95" fill="#94a3b8" font-size="8" text-anchor="middle">Bytecode,</text>
    <text x="50" y="110" fill="#94a3b8" font-size="8" text-anchor="middle">JIT code</text>
    <text x="50" y="138" fill="#a1a1aa" font-size="8" text-anchor="middle">Auto-grow</text>
  </g>

  <text x="340" y="250" fill="#a1a1aa" font-size="11" text-anchor="middle">Coletores Modernos: G1GC (Regiões de 1-32MB) e ZGC (Colored Pointers com pausas &lt; 1ms)</text>
</svg>`,

  /**
   * Linux OS: epoll Event Loop
   */
  epollEventLoop: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="25" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Linux I/O Multiplexing: epoll O(1) vs select/poll O(N)</text>

  <!-- Left: Select/Poll O(N) -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="260" height="160" rx="6" fill="#18181b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="130" y="22" fill="#f43f5e" font-size="12" font-weight="bold" text-anchor="middle">select() / poll() — O(N)</text>
    <rect x="15" y="35" width="230" height="40" rx="3" fill="#27272a" stroke="#52525b" stroke-width="1"/>
    <text x="130" y="52" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Cópia do Array de FDs (User → Kernel)</text>
    <text x="130" y="67" fill="#a1a1aa" font-size="9" text-anchor="middle">Copia 10.000 FDs a cada chamada</text>
    
    <rect x="15" y="85" width="230" height="40" rx="3" fill="#27272a" stroke="#f43f5e" stroke-width="1"/>
    <text x="130" y="102" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">Varredura Linear O(N)</text>
    <text x="130" y="117" fill="#a1a1aa" font-size="9" text-anchor="middle">Testa todos os sockets 1 a 1</text>
    <text x="130" y="148" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">Degradação severa com alto C10K</text>
  </g>

  <!-- Right: epoll O(1) -->
  <g transform="translate(340, 50)">
    <rect x="0" y="0" width="300" height="160" rx="6" fill="#18181b" stroke="#10b981" stroke-width="2"/>
    <text x="150" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Linux epoll — O(1)</text>
    
    <g transform="translate(15, 35)">
      <rect x="0" y="0" width="130" height="50" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1"/>
      <text x="65" y="18" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Red-Black Tree</text>
      <text x="65" y="34" fill="#94a3b8" font-size="8" text-anchor="middle">FDs registrados</text>
      <text x="65" y="44" fill="#94a3b8" font-size="8" text-anchor="middle">via epoll_ctl O(log N)</text>
    </g>

    <g transform="translate(155, 35)">
      <rect x="0" y="0" width="130" height="50" rx="4" fill="#14532d" stroke="#10b981" stroke-width="1.5"/>
      <text x="65" y="18" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Ready List O(1)</text>
      <text x="65" y="34" fill="#a7f3d0" font-size="8" text-anchor="middle">Lista duplamente ligada</text>
      <text x="65" y="44" fill="#a7f3d0" font-size="8" text-anchor="middle">populada por callback</text>
    </g>

    <rect x="15" y="95" width="270" height="35" rx="3" fill="#27272a" stroke="#10b981" stroke-width="1"/>
    <text x="150" y="112" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">epoll_wait() consome apenas Ready List</text>
    <text x="150" y="124" fill="#a1a1aa" font-size="8" text-anchor="middle">Zero cópia de FDs inativos | Retorno O(Eventos_Ativos)</text>
    <text x="150" y="148" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">Escala até 1.000.000+ conexões simultâneas</text>
  </g>

  <text x="340" y="250" fill="#a1a1aa" font-size="11" text-anchor="middle">Edge-Triggered (EPOLLET): Notifica apenas na transição de estado exigindo leitura em loop até EAGAIN</text>
</svg>`,

  /**
   * Arquitetura: Hierarquia de Memória & Latência
   */
  storageHierarchy: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="22" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Pirâmide de Latência &amp; Hierarquia de Memória (Mechanical Sympathy)</text>

  <!-- Registers -->
  <rect x="260" y="40" width="160" height="22" rx="3" fill="#ef4444"/><text x="340" y="55" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">CPU Registers (0.5 ns, ~1 KB)</text>
  
  <!-- L1 Cache -->
  <rect x="230" y="65" width="220" height="22" rx="3" fill="#f97316"/><text x="340" y="80" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">L1 Cache (1 ns, ~64 KB)</text>

  <!-- L2 Cache -->
  <rect x="200" y="90" width="280" height="22" rx="3" fill="#eab308"/><text x="340" y="105" fill="#18181b" font-size="10" font-weight="bold" text-anchor="middle">L2 Cache (4 ns, ~512 KB)</text>

  <!-- L3 Cache -->
  <rect x="170" y="115" width="340" height="22" rx="3" fill="#10b981"/><text x="340" y="130" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">L3 Cache Compartilhado (10-20 ns, ~32 MB)</text>

  <!-- Main Memory RAM -->
  <rect x="140" y="140" width="400" height="22" rx="3" fill="#3b82f6"/><text x="340" y="155" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">RAM Principal (60-100 ns, ~64 GB)</text>

  <!-- NVMe SSD -->
  <rect x="110" y="165" width="460" height="22" rx="3" fill="#8b5cf6"/><text x="340" y="180" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">NVMe SSD PCIe (10-50 µs, ~2 TB)</text>

  <!-- HDD / Network -->
  <rect x="80" y="190" width="520" height="22" rx="3" fill="#64748b"/><text x="340" y="205" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">HDD Mecânico / Rede WAN (1-10 ms, Petabytes)</text>

  <!-- Bottom Comparison -->
  <text x="340" y="240" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Ordens de Grandeza: 1 acesso à RAM equivale a 200 ciclos de CPU; 1 acesso a Disco equivale a meses humanos.</text>
  <text x="340" y="258" fill="#a1a1aa" font-size="10" text-anchor="middle">Princípio de Localidade Temporal (reuso recente) e Espacial (dados contíguos na mesma cache line)</text>
</svg>`,

  /**
   * Distributed Systems: Consistent Hashing Ring with Virtual Nodes
   */
  consistentHashingRing: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Consistent Hashing com Nós Virtuais (Virtual Nodes)</text>
  <!-- Circle Ring -->
  <g transform="translate(140, 40)">
    <circle cx="100" cy="100" r="85" fill="none" stroke="#3f3f46" stroke-width="4" stroke-dasharray="6,4"/>
    <text x="100" y="96" fill="#a1a1aa" font-size="11" font-weight="bold" text-anchor="middle">Hash Ring</text>
    <text x="100" y="112" fill="#71717a" font-size="9" text-anchor="middle">[0 ... 2^32-1]</text>

    <!-- Physical Nodes / Vnodes -->
    <circle cx="100" cy="15" r="12" fill="#3b82f6" stroke="#60a5fa" stroke-width="2"/>
    <text x="100" y="19" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">A1</text>

    <circle cx="185" cy="100" r="12" fill="#10b981" stroke="#34d399" stroke-width="2"/>
    <text x="185" y="104" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">B1</text>

    <circle cx="100" cy="185" r="12" fill="#f59e0b" stroke="#fbbf24" stroke-width="2"/>
    <text x="100" y="189" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">C1</text>

    <circle cx="15" cy="100" r="12" fill="#3b82f6" stroke="#60a5fa" stroke-width="2"/>
    <text x="15" y="104" fill="#fff" font-size="9" font-weight="bold" text-anchor="middle">A2</text>

    <!-- Keys -->
    <rect x="150" y="35" width="10" height="10" rx="2" fill="#f43f5e"/>
    <text x="175" y="44" fill="#fca5a5" font-size="9">Key K1 → B1</text>

    <rect x="40" y="150" width="10" height="10" rx="2" fill="#f43f5e"/>
    <text x="10" y="170" fill="#fca5a5" font-size="9">Key K2 → A2</text>

    <!-- Clockwise routing arrow -->
    <path d="M 140 30 A 85 85 0 0 1 175 70" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="2"/>
  </g>

  <!-- Legend / Info Box -->
  <g transform="translate(390, 48)">
    <rect x="0" y="0" width="250" height="175" rx="6" fill="#27272a" stroke="#3f3f46" stroke-width="1.5"/>
    <text x="125" y="24" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Propriedades do Anel</text>

    <text x="15" y="52" fill="#f4f4f5" font-size="10" font-weight="bold">1. Roteamento Sentido Horário</text>
    <text x="15" y="68" fill="#a1a1aa" font-size="9">hash(key) busca o 1º nó &gt;= hash</text>

    <text x="15" y="95" fill="#10b981" font-size="10" font-weight="bold">2. Adição / Remoção de Nó</text>
    <text x="15" y="111" fill="#a1a1aa" font-size="9">Remapeia apenas K/N chaves</text>

    <text x="15" y="138" fill="#fbbf24" font-size="10" font-weight="bold">3. Vnodes (Nós Virtuais)</text>
    <text x="15" y="154" fill="#a1a1aa" font-size="9">Evitam hotspots e carga desigual</text>
  </g>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">Complexidade de busca do nó responsável via Binary Search no array de tokens: O(log V)</text>
</svg>`,

  /**
   * Storage Engines: LSM-Tree Architecture
   */
  lsmTreeEngine: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">LSM-Tree Storage Engine: MemTable, WAL &amp; Compaction</text>

  <!-- RAM Section -->
  <g transform="translate(30, 45)">
    <rect x="0" y="0" width="280" height="175" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">RAM (Memória Principal)</text>

    <!-- WAL -->
    <rect x="15" y="35" width="250" height="40" rx="4" fill="#27272a" stroke="#f59e0b" stroke-width="1"/>
    <text x="25" y="54" fill="#fbbf24" font-size="10" font-weight="bold">Write-Ahead Log (WAL - Append-Only)</text>
    <text x="25" y="68" fill="#a1a1aa" font-size="9">Garante durabilidade e recuperação de crash O(1)</text>

    <!-- MemTable -->
    <rect x="15" y="85" width="250" height="50" rx="4" fill="#27272a" stroke="#10b981" stroke-width="1.5"/>
    <text x="25" y="105" fill="#34d399" font-size="11" font-weight="bold">MemTable (SkipList / Red-Black Tree)</text>
    <text x="25" y="122" fill="#a1a1aa" font-size="9">Buffer ordenado em RAM. Escrita 100% sequencial</text>

    <text x="140" y="160" fill="#f43f5e" font-size="9" font-weight="bold" text-anchor="middle">Ao atingir limite de tamanho (ex: 64MB) → Flush</text>
  </g>

  <!-- Flush Arrow -->
  <g transform="translate(315, 125)">
    <path d="M 0 0 L 40 0" stroke="#10b981" stroke-width="3"/>
    <polygon points="40,0 28,-6 28,6" fill="#10b981"/>
    <text x="20" y="-8" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">Flush</text>
  </g>

  <!-- Disk Section -->
  <g transform="translate(365, 45)">
    <rect x="0" y="0" width="285" height="175" rx="6" fill="#18181b" stroke="#10b981" stroke-width="1.5"/>
    <text x="142" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">DISCO (SSTables Imutáveis)</text>

    <!-- Level 0 -->
    <rect x="15" y="35" width="255" height="32" rx="4" fill="#27272a" stroke="#f59e0b" stroke-width="1"/>
    <text x="25" y="55" fill="#fbbf24" font-size="10" font-weight="bold">L0 SSTables (Chaves Sobrepostas)</text>

    <!-- Level 1 -->
    <rect x="15" y="75" width="255" height="32" rx="4" fill="#27272a" stroke="#10b981" stroke-width="1"/>
    <text x="25" y="95" fill="#34d399" font-size="10" font-weight="bold">L1 SSTables (Ranges Disjuntos 100MB)</text>

    <!-- Level 2 -->
    <rect x="15" y="115" width="255" height="32" rx="4" fill="#27272a" stroke="#3b82f6" stroke-width="1"/>
    <text x="25" y="135" fill="#38bdf8" font-size="10" font-weight="bold">L2 SSTables (1GB) + Bloom Filters</text>

    <text x="142" y="165" fill="#a78bfa" font-size="9" font-weight="bold" text-anchor="middle">Leveled Compaction mescla e remove chaves obsoletas</text>
  </g>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">LSM Trade-off: Altíssima vazão de escrita (Write Throughput) com leitura otimizada por Bloom Filter</text>
</svg>`,

  /**
   * Distributed Transactions: Two-Phase Commit (2PC)
   */
  twoPhaseCommit: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Two-Phase Commit (2PC): Transações Distribuídas Atômicas</text>

  <!-- Coordinator & Cohorts -->
  <rect x="60" y="45" width="130" height="30" rx="4" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="125" y="65" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">COORDINATOR</text>

  <rect x="275" y="45" width="130" height="30" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
  <text x="340" y="65" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">COHORT 1 (DB A)</text>

  <rect x="490" y="45" width="130" height="30" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
  <text x="555" y="65" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">COHORT 2 (DB B)</text>

  <line x1="125" y1="80" x2="125" y2="230" stroke="#52525b" stroke-width="2" stroke-dasharray="4"/>
  <line x1="340" y1="80" x2="340" y2="230" stroke="#52525b" stroke-width="2" stroke-dasharray="4"/>
  <line x1="555" y1="80" x2="555" y2="230" stroke="#52525b" stroke-width="2" stroke-dasharray="4"/>

  <!-- Phase 1: Prepare -->
  <g transform="translate(125, 95)">
    <line x1="0" y1="0" x2="215" y2="20" stroke="#f59e0b" stroke-width="2"/>
    <polygon points="215,20 202,13 203,25" fill="#f59e0b"/>
    <line x1="0" y1="0" x2="430" y2="20" stroke="#f59e0b" stroke-width="2"/>
    <polygon points="430,20 417,13 418,25" fill="#f59e0b"/>
    <rect x="130" y="-3" width="170" height="20" rx="3" fill="#27272a" stroke="#f59e0b" stroke-width="1"/>
    <text x="215" y="11" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Fase 1: PREPARE (Can Commit?)</text>
  </g>

  <!-- Phase 1: VOTE_COMMIT -->
  <g transform="translate(125, 140)">
    <line x1="215" y1="0" x2="0" y2="20" stroke="#10b981" stroke-width="2"/>
    <polygon points="0,20 15,13 14,25" fill="#10b981"/>
    <line x1="430" y1="0" x2="0" y2="20" stroke="#10b981" stroke-width="2"/>
    <polygon points="0,20 15,13 14,25" fill="#10b981"/>
    <rect x="130" y="-3" width="170" height="20" rx="3" fill="#27272a" stroke="#10b981" stroke-width="1"/>
    <text x="215" y="11" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">VOTE_COMMIT (Locks Adquiridos)</text>
  </g>

  <!-- Phase 2: GLOBAL_COMMIT -->
  <g transform="translate(125, 185)">
    <line x1="0" y1="0" x2="215" y2="20" stroke="#3b82f6" stroke-width="2"/>
    <polygon points="215,20 202,13 203,25" fill="#3b82f6"/>
    <line x1="0" y1="0" x2="430" y2="20" stroke="#3b82f6" stroke-width="2"/>
    <polygon points="430,20 417,13 418,25" fill="#3b82f6"/>
    <rect x="130" y="-3" width="170" height="20" rx="3" fill="#27272a" stroke="#3b82f6" stroke-width="1"/>
    <text x="215" y="11" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Fase 2: GLOBAL_COMMIT</text>
  </g>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">Vulnerabilidade Crítica: Se o coordenador falha na Fase 2, cohorts ficam bloqueados segurando locks</text>
</svg>`,

  /**
   * Messaging: CQRS & Event Sourcing
   */
  eventSourcingCQRS: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Arquitetura CQRS &amp; Event Sourcing com Projeções Assíncronas</text>

  <!-- Command Side -->
  <g transform="translate(30, 50)">
    <rect x="0" y="0" width="180" height="160" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="90" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Command Side (Write)</text>
    <rect x="15" y="38" width="150" height="28" rx="3" fill="#27272a" stroke="#3b82f6" stroke-width="1"/>
    <text x="90" y="56" fill="#f4f4f5" font-size="10" font-weight="bold" text-anchor="middle">Command Handler</text>
    
    <rect x="15" y="78" width="150" height="42" rx="3" fill="#18181b" stroke="#f59e0b" stroke-width="1"/>
    <text x="90" y="96" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Event Store (Log)</text>
    <text x="90" y="110" fill="#a1a1aa" font-size="8" text-anchor="middle">Append-Only Imutável</text>
  </g>

  <!-- Event Bus Stream -->
  <g transform="translate(225, 110)">
    <path d="M 0 10 L 100 10" stroke="#f59e0b" stroke-width="3"/>
    <polygon points="100,10 88,4 88,16" fill="#f59e0b"/>
    <text x="50" y="-4" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Event Bus / Kafka</text>
    <text x="50" y="30" fill="#a1a1aa" font-size="8" text-anchor="middle">OrderCreatedEvent</text>
  </g>

  <!-- Read Side -->
  <g transform="translate(340, 50)">
    <rect x="0" y="0" width="310" height="160" rx="6" fill="#14532d" stroke="#10b981" stroke-width="1.5"/>
    <text x="155" y="22" fill="#86efac" font-size="12" font-weight="bold" text-anchor="middle">Query Side (Read Model / Projeções)</text>
    
    <g transform="translate(15, 38)">
      <rect x="0" y="0" width="130" height="40" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
      <text x="65" y="18" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Elasticsearch</text>
      <text x="65" y="32" fill="#94a3b8" font-size="8" text-anchor="middle">Busca Textual</text>
    </g>

    <g transform="translate(155, 38)">
      <rect x="0" y="0" width="135" height="40" rx="3" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
      <text x="67" y="18" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Redis / Postgres</text>
      <text x="67" y="32" fill="#94a3b8" font-size="8" text-anchor="middle">Views Desnormalizadas</text>
    </g>

    <rect x="15" y="90" width="275" height="30" rx="3" fill="#27272a" stroke="#10b981" stroke-width="1"/>
    <text x="152" y="110" fill="#f4f4f5" font-size="10" font-weight="bold" text-anchor="middle">Query API: Consultas O(1) sem JOINs complexos</text>
  </g>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">Vantagem: Escala de leitura independente da escrita | Trade-off: Consistência Eventual nas Projeções</text>
</svg>`,

  /**
   * Resilience: Rate Limiter Token Bucket
   */
  rateLimiterTokenBucket: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Algoritmo de Rate Limiting: Token Bucket com Taxa de Recarga (r) &amp; Capacidade (B)</text>

  <!-- Refill Stream -->
  <g transform="translate(120, 50)">
    <rect x="0" y="0" width="120" height="40" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="60" y="18" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Refill Rate (r)</text>
    <text x="60" y="32" fill="#86efac" font-size="9" text-anchor="middle">+10 tokens / seg</text>
    <path d="M 60 40 L 60 70" stroke="#10b981" stroke-width="2"/>
    <polygon points="60,70 55,60 65,60" fill="#10b981"/>
  </g>

  <!-- Bucket Container -->
  <g transform="translate(130, 120)">
    <path d="M 0 0 L 15 70 L 85 70 L 100 0" fill="#27272a" stroke="#3b82f6" stroke-width="2"/>
    <text x="50" y="35" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Bucket (B)</text>
    <text x="50" y="50" fill="#a1a1aa" font-size="9" text-anchor="middle">Capacidade = 100</text>
  </g>

  <!-- Incoming Requests -->
  <g transform="translate(270, 130)">
    <path d="M 0 25 L 80 25" stroke="#f59e0b" stroke-width="2"/>
    <polygon points="80,25 68,19 70,31" fill="#f59e0b"/>
    <text x="40" y="14" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Requisição</text>
    <text x="40" y="42" fill="#a1a1aa" font-size="8" text-anchor="middle">Consome 1 token</text>
  </g>

  <!-- Decision Fork -->
  <g transform="translate(370, 80)">
    <rect x="0" y="0" width="130" height="120" rx="6" fill="#27272a" stroke="#3f3f46" stroke-width="1"/>
    <text x="65" y="24" fill="#f4f4f5" font-size="11" font-weight="bold" text-anchor="middle">Verificação</text>
    
    <!-- Pass -->
    <rect x="10" y="38" width="110" height="30" rx="3" fill="#14532d" stroke="#10b981" stroke-width="1"/>
    <text x="65" y="57" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Tokens &gt; 0 → 200 OK</text>

    <!-- Reject -->
    <rect x="10" y="78" width="110" height="30" rx="3" fill="#450a0a" stroke="#f43f5e" stroke-width="1"/>
    <text x="65" y="97" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Tokens = 0 → 429 Error</text>
  </g>

  <!-- Sliding Window Note -->
  <g transform="translate(520, 80)">
    <rect x="0" y="0" width="130" height="120" rx="6" fill="#1e293b" stroke="#8b5cf6" stroke-width="1"/>
    <text x="65" y="24" fill="#a78bfa" font-size="11" font-weight="bold" text-anchor="middle">Redis Sliding Window</text>
    <text x="65" y="50" fill="#a1a1aa" font-size="9" text-anchor="middle">ZREMRANGEBYSCORE</text>
    <text x="65" y="70" fill="#a1a1aa" font-size="9" text-anchor="middle">ZADD (now, now)</text>
    <text x="65" y="90" fill="#a1a1aa" font-size="9" text-anchor="middle">ZCARD (contagem)</text>
  </g>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">Token Bucket acomoda rajadas súbitas até B tokens sem descartar requisições legítimas</text>
</svg>`,

  /**
   * Distributed Systems: CAP vs PACELC Matrix
   */
  capPacelcMatrix: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Matriz de Teoremas: CAP vs PACELC</text>

  <!-- Left: CAP Triangle -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="280" height="175" rx="6" fill="#18181b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Teorema CAP (Sob Partição de Rede)</text>

    <!-- CP Box -->
    <rect x="15" y="38" width="250" height="55" rx="4" fill="#27272a" stroke="#f59e0b" stroke-width="1"/>
    <text x="25" y="58" fill="#fbbf24" font-size="11" font-weight="bold">CP (Consistência + Tolerância)</text>
    <text x="25" y="75" fill="#a1a1aa" font-size="9">Rejeita leituras/escritas se nó isolado (HBase, ZooKeeper)</text>

    <!-- AP Box -->
    <rect x="15" y="105" width="250" height="55" rx="4" fill="#27272a" stroke="#10b981" stroke-width="1"/>
    <text x="25" y="125" fill="#34d399" font-size="11" font-weight="bold">AP (Disponibilidade + Tolerância)</text>
    <text x="25" y="142" fill="#a1a1aa" font-size="9">Retorna dado stale garantindo 100% uptime (Cassandra, Dynamo)</text>
  </g>

  <!-- Right: PACELC Matrix -->
  <g transform="translate(345, 45)">
    <rect x="0" y="0" width="295" height="175" rx="6" fill="#18181b" stroke="#10b981" stroke-width="1.5"/>
    <text x="147" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Teorema PACELC (P/A ou C) Else (L ou C)</text>

    <!-- PC/EC -->
    <rect x="15" y="38" width="265" height="38" rx="4" fill="#27272a" stroke="#3b82f6" stroke-width="1"/>
    <text x="25" y="54" fill="#38bdf8" font-size="10" font-weight="bold">PC/EC (Consistente Sempre):</text>
    <text x="25" y="68" fill="#a1a1aa" font-size="9">Google Spanner, MongoDB (majority)</text>

    <!-- PA/EL -->
    <rect x="15" y="82" width="265" height="38" rx="4" fill="#27272a" stroke="#10b981" stroke-width="1"/>
    <text x="25" y="98" fill="#34d399" font-size="10" font-weight="bold">PA/EL (Disponível + Baixa Latência):</text>
    <text x="25" y="112" fill="#a1a1aa" font-size="9">Amazon DynamoDB, Cassandra, Riak</text>

    <!-- PC/EL -->
    <rect x="15" y="126" width="265" height="38" rx="4" fill="#27272a" stroke="#f59e0b" stroke-width="1"/>
    <text x="25" y="142" fill="#fbbf24" font-size="10" font-weight="bold">PC/EL (Consistente em partição, Rápido normal):</text>
    <text x="25" y="156" fill="#a1a1aa" font-size="9">MySQL Cluster, PostgreSQL (Replication)</text>
  </g>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">Regra de Ouro: Alta disponibilidade em partição (AP) exige aceitar consistência eventual</text>
</svg>`,

  /**
   * System Design Archetypes: Social Timeline (Push vs Pull)
   */
  socialTimelineTopology: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Topologia de Feed Social: Fan-Out on Write (Push) vs Fan-Out on Read (Pull)</text>

  <!-- User Post -->
  <g transform="translate(30, 60)">
    <rect x="0" y="0" width="140" height="70" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="70" y="30" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Usuário Regular</text>
    <text x="70" y="48" fill="#94a3b8" font-size="9" text-anchor="middle">(&lt; 10k seguidores)</text>
  </g>

  <!-- Push Arrow -->
  <path d="M 170 95 L 240 95" stroke="#10b981" stroke-width="2.5"/>
  <polygon points="240,95 228,89 230,101" fill="#10b981"/>
  <text x="205" y="85" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">Push</text>

  <!-- Celebrity Post -->
  <g transform="translate(30, 150)">
    <rect x="0" y="0" width="140" height="70" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="70" y="30" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Celebridade / VIP</text>
    <text x="70" y="48" fill="#94a3b8" font-size="9" text-anchor="middle">(&gt; 50M seguidores)</text>
  </g>

  <!-- Pull Arrow -->
  <path d="M 170 185 L 430 185" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
  <polygon points="430,185 418,179 420,191" fill="#f59e0b"/>
  <text x="300" y="175" fill="#fbbf24" font-size="9" font-weight="bold" text-anchor="middle">Pull on Read (Evita 50M escritas)</text>

  <!-- Middle: Redis Timelines -->
  <g transform="translate(240, 60)">
    <rect x="0" y="0" width="160" height="85" rx="6" fill="#27272a" stroke="#10b981" stroke-width="1.5"/>
    <text x="80" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Redis In-Memory</text>
    <text x="80" y="42" fill="#a1a1aa" font-size="9" text-anchor="middle">User Timeline (ZSet)</text>
    <text x="80" y="58" fill="#a1a1aa" font-size="8" text-anchor="middle">Top 800 posts recentes</text>
    <text x="80" y="74" fill="#86efac" font-size="8" text-anchor="middle">Leitura instantânea O(1)</text>
  </g>

  <!-- Feed Aggregator / Client -->
  <g transform="translate(450, 80)">
    <rect x="0" y="0" width="190" height="110" rx="6" fill="#18181b" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="95" y="24" fill="#a78bfa" font-size="11" font-weight="bold" text-anchor="middle">Feed Merger / Client</text>
    <rect x="15" y="38" width="160" height="26" rx="3" fill="#27272a" stroke="#10b981" stroke-width="1"/>
    <text x="95" y="54" fill="#34d399" font-size="9" text-anchor="middle">Timeline Pessoal (Cache)</text>
    
    <rect x="15" y="68" width="160" height="26" rx="3" fill="#27272a" stroke="#f59e0b" stroke-width="1"/>
    <text x="95" y="84" fill="#fbbf24" font-size="9" text-anchor="middle">+ Posts de Celebridades (Pull)</text>
  </g>

  <path d="M 400 100 L 450 100" stroke="#3b82f6" stroke-width="2"/>
  <polygon points="450,100 438,94 440,106" fill="#3b82f6"/>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">Arquitetura Híbrida: Push para 99% dos usuários e Pull para o top 1% de celebridades</text>
</svg>`,

  /**
   * System Design Archetypes: Realtime Chat
   */
  realtimeChatTopology: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Topologia de Chat em Tempo Real: WebSocket Gateway &amp; Redis Pub/Sub</text>

  <!-- Client A -->
  <g transform="translate(30, 80)">
    <rect x="0" y="0" width="100" height="70" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="50" y="32" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">User A</text>
    <text x="50" y="48" fill="#94a3b8" font-size="9" text-anchor="middle">(Mobile / Web)</text>
  </g>

  <!-- WS Gateway 1 -->
  <g transform="translate(160, 60)">
    <rect x="0" y="0" width="120" height="110" rx="6" fill="#27272a" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="60" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">WS Gateway #1</text>
    <text x="60" y="45" fill="#a1a1aa" font-size="9" text-anchor="middle">TCP Persistente</text>
    <text x="60" y="65" fill="#a1a1aa" font-size="9" text-anchor="middle">Auth &amp; Session</text>
    <text x="60" y="90" fill="#10b981" font-size="8" text-anchor="middle">User A Conectado</text>
  </g>

  <line x1="130" y1="115" x2="160" y2="115" stroke="#3b82f6" stroke-width="2"/>

  <!-- Middle: Redis Pub/Sub & Presence -->
  <g transform="translate(310, 50)">
    <rect x="0" y="0" width="140" height="60" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="70" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Redis Pub/Sub</text>
    <text x="70" y="42" fill="#a1a1aa" font-size="8" text-anchor="middle">Canal por Usuário / Sala</text>

    <rect x="0" y="70" width="140" height="60" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="70" y="94" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Presence Service</text>
    <text x="70" y="112" fill="#a1a1aa" font-size="8" text-anchor="middle">Heartbeat TTL (30s)</text>
  </g>

  <path d="M 280 90 L 310 80" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 450 80 L 480 90" stroke="#f59e0b" stroke-width="2"/>

  <!-- WS Gateway 2 -->
  <g transform="translate(480, 60)">
    <rect x="0" y="0" width="120" height="110" rx="6" fill="#27272a" stroke="#10b981" stroke-width="1.5"/>
    <text x="60" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">WS Gateway #2</text>
    <text x="60" y="45" fill="#a1a1aa" font-size="9" text-anchor="middle">TCP Persistente</text>
    <text x="60" y="65" fill="#a1a1aa" font-size="9" text-anchor="middle">Auth &amp; Session</text>
    <text x="60" y="90" fill="#10b981" font-size="8" text-anchor="middle">User B Conectado</text>
  </g>

  <!-- Client B -->
  <g transform="translate(630, 80)">
    <rect x="0" y="0" width="40" height="70" rx="4" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="20" y="32" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">User</text>
    <text x="20" y="48" fill="#86efac" font-size="9" text-anchor="middle">B</text>
  </g>

  <line x1="600" y1="115" x2="630" y2="115" stroke="#10b981" stroke-width="2"/>

  <!-- Cassandra Storage Footer -->
  <g transform="translate(200, 185)">
    <rect x="0" y="0" width="280" height="35" rx="4" fill="#27272a" stroke="#8b5cf6" stroke-width="1"/>
    <text x="140" y="22" fill="#a78bfa" font-size="10" font-weight="bold" text-anchor="middle">Cassandra / ScyllaDB (Histórico de Mensagens Append-Only)</text>
  </g>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">Roteamento: Mensagens de A para B trafegam via Redis Pub/Sub sem acoplamento entre os Gateways</text>
</svg>`,

  /**
   * System Design Archetypes: URL Shortener
   */
  urlShortenerTopology: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Topologia Encurtador de URLs: Base62 &amp; Cache 100:1</text>

  <!-- Client -->
  <g transform="translate(30, 80)">
    <rect x="0" y="0" width="110" height="80" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="55" y="32" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Client Request</text>
    <text x="55" y="50" fill="#a1a1aa" font-size="9" text-anchor="middle">GET /aB3x9Qz</text>
  </g>

  <!-- Load Balancer -->
  <g transform="translate(170, 70)">
    <rect x="0" y="0" width="110" height="100" rx="6" fill="#27272a" stroke="#3f3f46" stroke-width="1"/>
    <text x="55" y="30" fill="#f4f4f5" font-size="11" font-weight="bold" text-anchor="middle">API Gateway</text>
    <text x="55" y="50" fill="#a1a1aa" font-size="9" text-anchor="middle">Rate Limiting</text>
    <text x="55" y="70" fill="#a1a1aa" font-size="9" text-anchor="middle">L7 Routing</text>
  </g>

  <!-- Redis Cache (99% hits) -->
  <g transform="translate(310, 50)">
    <rect x="0" y="0" width="150" height="65" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="75" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Redis Cache (100:1)</text>
    <text x="75" y="42" fill="#86efac" font-size="9" text-anchor="middle">99% Cache Hit Ratio</text>
    <text x="75" y="56" fill="#a1a1aa" font-size="8" text-anchor="middle">Retorno 302 Found em ~1ms</text>
  </g>

  <!-- KGS & DB (Writes & Misses) -->
  <g transform="translate(310, 130)">
    <rect x="0" y="0" width="150" height="65" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="75" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">KGS + Postgres / Dynamo</text>
    <text x="75" y="42" fill="#a1a1aa" font-size="9" text-anchor="middle">Base62 ID Generator</text>
    <text x="75" y="56" fill="#a1a1aa" font-size="8" text-anchor="middle">62^7 = 3.5 trilhões de URLs</text>
  </g>

  <!-- Target Destination -->
  <g transform="translate(500, 80)">
    <rect x="0" y="0" width="150" height="80" rx="6" fill="#14532d" stroke="#10b981" stroke-width="1.5"/>
    <text x="75" y="32" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">Destino Final</text>
    <text x="75" y="50" fill="#a7f3d0" font-size="9" text-anchor="middle">https://loooong-url.com/...</text>
  </g>

  <line x1="140" y1="120" x2="170" y2="120" stroke="#3b82f6" stroke-width="2"/>
  <path d="M 280 100 L 310 80" stroke="#10b981" stroke-width="2"/>
  <path d="M 280 140 L 310 160" stroke="#f59e0b" stroke-width="2"/>
  <line x1="460" y1="85" x2="500" y2="120" stroke="#10b981" stroke-width="2"/>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">HTTP 302 permite rastrear analytics de cliques sem cache agressivo no browser do cliente</text>
</svg>`,

  /**
   * System Design Archetypes: Ride Hailing Geospatial (Uber H3)
   */
  rideHailingGeospatial: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Indexação Geoespacial &amp; Matching em Tempo Real (Uber H3 Hexágonos)</text>

  <!-- Left: Hexagons -->
  <g transform="translate(60, 50)">
    <polygon points="50,15 90,38 90,83 50,105 10,83 10,38" fill="#27272a" stroke="#10b981" stroke-width="2"/>
    <text x="50" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">H3 Cell #0</text>
    <circle cx="50" cy="40" r="4" fill="#3b82f6"/>
    <circle cx="65" cy="70" r="4" fill="#3b82f6"/>

    <polygon points="130,15 170,38 170,83 130,105 90,83 90,38" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="130" y="60" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">k-ring (1)</text>

    <text x="90" y="130" fill="#a1a1aa" font-size="9" text-anchor="middle">Vizinhos a distância uniforme</text>
    <text x="90" y="145" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">Resolução 8 (~460m)</text>
  </g>

  <!-- Middle: Stream Ingestion -->
  <g transform="translate(260, 60)">
    <rect x="0" y="0" width="170" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="85" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">GPS Ingestion Stream</text>
    <text x="85" y="45" fill="#a1a1aa" font-size="9" text-anchor="middle">1M motoristas (4s ping)</text>
    <text x="85" y="65" fill="#a1a1aa" font-size="9" text-anchor="middle">250.000 QPS de Escrita</text>
    <rect x="15" y="75" width="140" height="24" rx="3" fill="#27272a" stroke="#f59e0b" stroke-width="1"/>
    <text x="85" y="91" fill="#fbbf24" font-size="9" text-anchor="middle">Redis GEO / Memory Map</text>
  </g>

  <!-- Right: Matching Engine -->
  <g transform="translate(460, 60)">
    <rect x="0" y="0" width="180" height="110" rx="6" fill="#18181b" stroke="#10b981" stroke-width="1.5"/>
    <text x="90" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Matching Engine</text>
    <text x="90" y="45" fill="#a1a1aa" font-size="9" text-anchor="middle">Passageiro solicita corrida</text>
    <text x="90" y="65" fill="#86efac" font-size="9" text-anchor="middle">Expande anéis k-ring (0, 1, 2)</text>
    <text x="90" y="90" fill="#f4f4f5" font-size="9" font-weight="bold" text-anchor="middle">Filtra ETA &lt; 5 min</text>
  </g>

  <path d="M 200 100 L 260 100" stroke="#3b82f6" stroke-width="2"/>
  <path d="M 430 115 L 460 115" stroke="#10b981" stroke-width="2"/>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">Hexágonos eliminam o problema de distorção de cantos dos Geohashes retangulares</text>
</svg>`,

  /**
   * System Design Archetypes: Video Streaming (HLS/DASH)
   */
  videoStreamingPipeline: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Pipeline de Transcodificação &amp; Streaming Adaptativo (HLS / DASH)</text>

  <!-- Upload & Chunking -->
  <g transform="translate(30, 60)">
    <rect x="0" y="0" width="130" height="95" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="65" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Upload Bruto</text>
    <text x="65" y="44" fill="#a1a1aa" font-size="9" text-anchor="middle">Arquivo MP4 (4K)</text>
    <rect x="10" y="58" width="110" height="24" rx="3" fill="#27272a" stroke="#3b82f6" stroke-width="1"/>
    <text x="65" y="74" fill="#38bdf8" font-size="9" text-anchor="middle">Chunking (4MB)</text>
  </g>

  <!-- Transcoding Workers DAG -->
  <g transform="translate(190, 50)">
    <rect x="0" y="0" width="160" height="115" rx="6" fill="#27272a" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="80" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">DAG Workers (FFmpeg)</text>
    <rect x="10" y="32" width="140" height="20" rx="2" fill="#3b82f6"/><text x="80" y="46" fill="#fff" font-size="9" text-anchor="middle">1080p (6 Mbps)</text>
    <rect x="10" y="56" width="140" height="20" rx="2" fill="#10b981"/><text x="80" y="70" fill="#fff" font-size="9" text-anchor="middle">720p (3 Mbps)</text>
    <rect x="10" y="80" width="140" height="20" rx="2" fill="#f59e0b"/><text x="80" y="94" fill="#fff" font-size="9" text-anchor="middle">480p (1 Mbps)</text>
  </g>

  <!-- HLS Packager & CDN -->
  <g transform="translate(380, 50)">
    <rect x="0" y="0" width="130" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="65" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">HLS Packager</text>
    <text x="65" y="44" fill="#a1a1aa" font-size="9" text-anchor="middle">master.m3u8</text>
    <text x="65" y="62" fill="#a1a1aa" font-size="9" text-anchor="middle">segment_001.ts</text>
    <text x="65" y="80" fill="#a1a1aa" font-size="9" text-anchor="middle">segment_002.ts</text>
    <rect x="10" y="88" width="110" height="20" rx="2" fill="#10b981"/><text x="65" y="102" fill="#fff" font-size="8" text-anchor="middle">Edge CDN Caching</text>
  </g>

  <!-- Client Player -->
  <g transform="translate(540, 60)">
    <rect x="0" y="0" width="110" height="95" rx="6" fill="#18181b" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="55" y="24" fill="#a78bfa" font-size="11" font-weight="bold" text-anchor="middle">Client Player</text>
    <text x="55" y="44" fill="#a1a1aa" font-size="8" text-anchor="middle">ABR Algorithm</text>
    <text x="55" y="62" fill="#86efac" font-size="8" text-anchor="middle">WiFi: 1080p</text>
    <text x="55" y="78" fill="#fca5a5" font-size="8" text-anchor="middle">4G Fraco: 480p</text>
  </g>

  <path d="M 160 105 L 190 105" stroke="#3b82f6" stroke-width="2"/>
  <path d="M 350 105 L 380 105" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 510 105 L 540 105" stroke="#10b981" stroke-width="2"/>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">Adaptive Bitrate (ABR) comuta dinamicamente segmentos de 2 a 6 segundos sem congelar o player</text>
</svg>`,

  /**
   * System Design Archetypes: Distributed Task Scheduler
   */
  distributedTaskScheduler: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Agendador Distribuído de Tarefas: Delay Queues &amp; Redis ZSet</text>

  <!-- Submit API -->
  <g transform="translate(30, 70)">
    <rect x="0" y="0" width="120" height="75" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="60" y="28" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Task Producer</text>
    <text x="60" y="46" fill="#a1a1aa" font-size="9" text-anchor="middle">schedule(job, t)</text>
    <text x="60" y="60" fill="#94a3b8" font-size="8" text-anchor="middle">Delay: 30 minutos</text>
  </g>

  <!-- Redis Delay Queue (Sorted Set) -->
  <g transform="translate(180, 50)">
    <rect x="0" y="0" width="180" height="115" rx="6" fill="#27272a" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="90" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Redis Delay Queue (ZSet)</text>
    <rect x="15" y="32" width="150" height="22" rx="2" fill="#1e293b"/><text x="90" y="47" fill="#a1a1aa" font-size="8" text-anchor="middle">score = execution_timestamp</text>
    <rect x="15" y="58" width="150" height="22" rx="2" fill="#1e293b"/><text x="90" y="73" fill="#a1a1aa" font-size="8" text-anchor="middle">ZRANGEBYSCORE (0, now)</text>
    <rect x="15" y="84" width="150" height="22" rx="2" fill="#14532d"/><text x="90" y="99" fill="#86efac" font-size="8" text-anchor="middle">ZPOPMIN com Script Lua</text>
  </g>

  <!-- Worker Fleet -->
  <g transform="translate(390, 50)">
    <rect x="0" y="0" width="140" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="70" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Worker Pool</text>
    <rect x="10" y="32" width="120" height="20" rx="2" fill="#14532d"/><text x="70" y="46" fill="#86efac" font-size="8" text-anchor="middle">Worker A (Executing)</text>
    <rect x="10" y="56" width="120" height="20" rx="2" fill="#14532d"/><text x="70" y="70" fill="#86efac" font-size="8" text-anchor="middle">Worker B (Executing)</text>
    <rect x="10" y="80" width="120" height="20" rx="2" fill="#27272a"/><text x="70" y="94" fill="#a1a1aa" font-size="8" text-anchor="middle">Worker C (Idle)</text>
  </g>

  <!-- Execution & Heartbeat DB -->
  <g transform="translate(550, 70)">
    <rect x="0" y="0" width="100" height="75" rx="6" fill="#18181b" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="50" y="28" fill="#a78bfa" font-size="11" font-weight="bold" text-anchor="middle">Postgres DB</text>
    <text x="50" y="46" fill="#a1a1aa" font-size="8" text-anchor="middle">DAG State</text>
    <text x="50" y="60" fill="#a1a1aa" font-size="8" text-anchor="middle">Heartbeat Lock</text>
  </g>

  <path d="M 150 105 L 180 105" stroke="#3b82f6" stroke-width="2"/>
  <path d="M 360 105 L 390 105" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 530 105 L 550 105" stroke="#10b981" stroke-width="2"/>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">Resiliência: Se um worker falha, o heartbeat expira e a tarefa é reatribuída por outro worker</text>
</svg>`,

  /**
   * System Design Archetypes: Flash Sale Inventory (500k QPS)
   */
  flashSaleInventoryTopology: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Arquitetura de Vendas Relâmpago (Flash Sale): 500k QPS com Redis Lua</text>

  <!-- Traffic Ingress -->
  <g transform="translate(20, 60)">
    <rect x="0" y="0" width="120" height="95" rx="6" fill="#450a0a" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="60" y="24" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">Pico de Tráfego</text>
    <text x="60" y="44" fill="#f4f4f5" font-size="10" font-weight="bold" text-anchor="middle">500.000 QPS</text>
    <text x="60" y="65" fill="#a1a1aa" font-size="8" text-anchor="middle">Black Friday / Ingressos</text>
    <text x="60" y="80" fill="#fca5a5" font-size="8" text-anchor="middle">10.000 itens disponíveis</text>
  </g>

  <!-- Virtual Waiting Room -->
  <g transform="translate(160, 60)">
    <rect x="0" y="0" width="120" height="95" rx="6" fill="#27272a" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="60" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Sala de Espera</text>
    <text x="60" y="44" fill="#a1a1aa" font-size="9" text-anchor="middle">Token Bucket Throttling</text>
    <text x="60" y="65" fill="#a1a1aa" font-size="8" text-anchor="middle">Libera 5.000 users/s</text>
    <text x="60" y="80" fill="#10b981" font-size="8" text-anchor="middle">Protege o backend</text>
  </g>

  <!-- Redis Lua Cluster -->
  <g transform="translate(300, 50)">
    <rect x="0" y="0" width="170" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="85" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Redis Cluster (In-Memory)</text>
    <rect x="10" y="32" width="150" height="24" rx="2" fill="#27272a"/><text x="85" y="48" fill="#fbbf24" font-size="8" text-anchor="middle">Script Lua Atômico</text>
    <rect x="10" y="60" width="150" height="24" rx="2" fill="#14532d"/><text x="85" y="76" fill="#86efac" font-size="8" text-anchor="middle">if stock &gt; 0 then DECR</text>
    <text x="85" y="102" fill="#38bdf8" font-size="8" font-weight="bold" text-anchor="middle">Zero Overselling / Lock-Free</text>
  </g>

  <!-- Async MQ & DB -->
  <g transform="translate(490, 50)">
    <rect x="0" y="0" width="170" height="115" rx="6" fill="#18181b" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="85" y="22" fill="#a78bfa" font-size="11" font-weight="bold" text-anchor="middle">Fila &amp; Banco de Dados</text>
    <rect x="10" y="32" width="150" height="24" rx="2" fill="#27272a" stroke="#f59e0b" stroke-width="1"/>
    <text x="85" y="48" fill="#fbbf24" font-size="8" text-anchor="middle">RabbitMQ (Pedidos Válidos)</text>
    <rect x="10" y="62" width="150" height="42" rx="2" fill="#27272a" stroke="#10b981" stroke-width="1"/>
    <text x="85" y="78" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">PostgreSQL / Aurora</text>
    <text x="85" y="94" fill="#a1a1aa" font-size="8" text-anchor="middle">Escrita Assíncrona Tranquila</text>
  </g>

  <path d="M 140 105 L 160 105" stroke="#f43f5e" stroke-width="2"/>
  <path d="M 280 105 L 300 105" stroke="#f59e0b" stroke-width="2"/>
  <path d="M 470 105 L 490 105" stroke="#10b981" stroke-width="2"/>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">O banco relacional nunca recebe o impacto de 500k QPS; processa apenas pedidos confirmados via fila</text>
</svg>`,

  /**
   * Distributed Systems: Distributed Lock & Fencing Tokens
   */
  distributedLockRedlock: () => `
<svg viewBox="0 0 680 270" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#18181b; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <text x="340" y="24" fill="#f4f4f5" font-size="15" font-weight="bold" text-anchor="middle">Locks Distribuídos: SETNX NX PX, Redlock &amp; Fencing Tokens</text>

  <!-- Client 1 -->
  <g transform="translate(30, 50)">
    <rect x="0" y="0" width="150" height="75" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="75" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Client 1 (Válido)</text>
    <text x="75" y="44" fill="#a1a1aa" font-size="9" text-anchor="middle">Adquire Lock no Redis</text>
    <text x="75" y="62" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">Fencing Token = 33</text>
  </g>

  <!-- Client 2 -->
  <g transform="translate(30, 140)">
    <rect x="0" y="0" width="150" height="75" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="75" y="24" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">Client 2 (Zumbi / GC)</text>
    <text x="75" y="44" fill="#fca5a5" font-size="9" text-anchor="middle">Lock expirou durante pausa</text>
    <text x="75" y="62" fill="#f43f5e" font-size="9" font-weight="bold" text-anchor="middle">Fencing Token = 32 (Velho)</text>
  </g>

  <!-- Lock Manager Redis -->
  <g transform="translate(220, 75)">
    <rect x="0" y="0" width="170" height="110" rx="6" fill="#27272a" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="85" y="24" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Redis Lock Manager</text>
    <rect x="10" y="35" width="150" height="24" rx="2" fill="#1e293b"/><text x="85" y="51" fill="#f4f4f5" font-size="8" text-anchor="middle">SET lock_key uuid NX PX 10000</text>
    <rect x="10" y="65" width="150" height="24" rx="2" fill="#14532d"/><text x="85" y="81" fill="#86efac" font-size="8" text-anchor="middle">INCR token_counter → 33</text>
  </g>

  <!-- Shared Storage -->
  <g transform="translate(440, 75)">
    <rect x="0" y="0" width="210" height="110" rx="6" fill="#18181b" stroke="#10b981" stroke-width="2"/>
    <text x="105" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Shared Resource / Storage</text>
    <rect x="10" y="35" width="190" height="28" rx="2" fill="#14532d" stroke="#10b981" stroke-width="1"/>
    <text x="105" y="53" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">Token 33 &gt; 32 → ACEITO (Write)</text>
    
    <rect x="10" y="70" width="190" height="28" rx="2" fill="#450a0a" stroke="#f43f5e" stroke-width="1"/>
    <text x="105" y="88" fill="#fca5a5" font-size="9" font-weight="bold" text-anchor="middle">Token 32 &lt;= 33 → REJEITADO</text>
  </g>

  <path d="M 180 85 L 220 110" stroke="#3b82f6" stroke-width="2"/>
  <path d="M 390 120 L 440 120" stroke="#10b981" stroke-width="2"/>

  <text x="340" y="252" fill="#a1a1aa" font-size="11" text-anchor="middle">Fencing Tokens monotonicamente crescentes impedem corrupção de dados sob pausas de GC</text>
</svg>`
};

/**
 * Mapping of Priority Subtopics with metadata and visual assets
 */
export const PRIORITY_SUBTOPIC_MAPPINGS = {
  // 1. Árvores & Estruturas Hierárquicas
  'trees-bst': {
    theme: 'Árvores & Estruturas Hierárquicas',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Rotações Simples (LL, RR) e Duplas (LR, RL) em Árvores Auto-Balanceadas AVL / Red-Black',
    targetCards: ['DSA-STRUCT-TREE-000', 'DSA-STRUCT-TREE-001', 'DSA-STRUCT-TREE-002', 'DSA-STRUCT-TREE-003', 'DSA-STRUCT-TREE-004', 'DSA-STRUCT-TREE-005'],
    svgGenerator: SVG_GENERATORS.avlRotations,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/avl-rotation-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Rotações AVL preservam a altura O(log N) através de trocas locais de ponteiros O(1).'
    }
  },
  'advanced-trees': {
    theme: 'Árvores Avançadas & Índices',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Estrutura de Segment Tree para Range Queries e B-Tree Node Splits',
    targetCards: ['DSA-STRUCT-ADVTREE-000', 'DSA-STRUCT-ADVTREE-001', 'DSA-STRUCT-ADVTREE-002', 'DSA-STRUCT-ADVTREE-003', 'DSA-STRUCT-ADVTREE-004', 'DSA-STRUCT-ADVTREE-005'],
    svgGenerator: SVG_GENERATORS.avlRotations,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/segment-tree-range-query-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Decomposição do intervalo [L, R] em nós canônicos da Segment Tree em O(log N).'
    }
  },
  'trie-prefix-tree': {
    theme: 'Tries & Busca por Prefixo',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Grafo de caminhos de caracteres com flag de terminação de palavra isEndOfWord',
    targetCards: ['DSA-STRUCT-TRIE-000', 'DSA-STRUCT-TRIE-001', 'DSA-STRUCT-TRIE-002', 'DSA-STRUCT-TRIE-003', 'DSA-STRUCT-TRIE-004', 'DSA-STRUCT-TRIE-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/trie-prefix-sharing-loop.webm',
      durationSeconds: 7,
      fallbackText: 'Compartilhamento de nós de prefixos comuns entre palavras reduzindo redundância estrutural.'
    }
  },
  'heaps-priority-queues': {
    theme: 'Heaps & Filas de Prioridade',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Min-Heap Sift-Down / Sift-Up e reconstrução Heapify em O(N)',
    targetCards: ['DSA-STRUCT-HEAP-000', 'DSA-STRUCT-HEAP-001', 'DSA-STRUCT-HEAP-002', 'DSA-STRUCT-HEAP-003', 'DSA-STRUCT-HEAP-004', 'DSA-STRUCT-HEAP-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/min-max-heap-property-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Invariante de Heap: o nó pai é sempre menor ou igual a todos os seus filhos.'
    }
  },
  'arrays-strings': {
    theme: 'Vetores Dinâmicos & Buffers Contíguos',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Acesso Indexado O(1), Duplicação Geométrica e Ring Buffer',
    targetCards: ['DSA-STRUCT-ARRAY-000', 'DSA-STRUCT-ARRAY-001', 'DSA-STRUCT-ARRAY-002', 'DSA-STRUCT-ARRAY-003', 'DSA-STRUCT-ARRAY-004', 'DSA-STRUCT-ARRAY-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/dynamic-array-amortized-growth-loop.webm',
      durationSeconds: 6,
      fallbackText: 'Duplicação geométrica da capacidade e redistribuição de créditos amortizados O(1).'
    }
  },
  'linked-lists': {
    theme: 'Listas Encadeadas & Skip Lists',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Ponteiros Sentinela, Reversão In-Place e LRU Doubly-Linked List',
    targetCards: ['DSA-STRUCT-LIST-000', 'DSA-STRUCT-LIST-001', 'DSA-STRUCT-LIST-002', 'DSA-STRUCT-LIST-003', 'DSA-STRUCT-LIST-004', 'DSA-STRUCT-LIST-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/linked-list-insert-delete-loop.webm',
      durationSeconds: 6,
      fallbackText: 'Troca local de ponteiros prev e next em tempo O(1) sem deslocamento de elementos.'
    }
  },
  'stacks-queues': {
    theme: 'Pilhas, Filas & Deques',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Disciplinas LIFO vs FIFO, MinStack O(1) e Monotonic Stack',
    targetCards: ['DSA-STRUCT-STACK-000', 'DSA-STRUCT-STACK-001', 'DSA-STRUCT-STACK-002', 'DSA-STRUCT-STACK-003', 'DSA-STRUCT-STACK-004', 'DSA-STRUCT-STACK-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/lifo-stack-fifo-queue-loop.webm',
      durationSeconds: 7,
      fallbackText: 'Comparação visual de disciplinas de acesso: topo da pilha (LIFO) vs início e fim da fila (FIFO).'
    }
  },
  'hash-tables': {
    theme: 'Tabelas Hash & Swiss Tables',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Resolução de Colisões, Rehashing e Vetorização SIMD',
    targetCards: ['DSA-STRUCT-HASH-000', 'DSA-STRUCT-HASH-001', 'DSA-STRUCT-HASH-002', 'DSA-STRUCT-HASH-003', 'DSA-STRUCT-HASH-004', 'DSA-STRUCT-HASH-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/hash-function-bucket-index-loop.webm',
      durationSeconds: 7,
      fallbackText: 'Cálculo determinístico de bucket index via hash(key) % N.'
    }
  },

  // 2. Grafos & Algoritmos de Exploração
  'graph-algorithms-core': {
    theme: 'Grafos & Caminho Mínimo',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Relaxamento de arestas no Algoritmo de Dijkstra e Ordenação Topológica com Kahn / DFS',
    targetCards: ['DSA-PATT-SPATH-000', 'DSA-PATT-SPATH-001', 'DSA-PATT-SPATH-002', 'DSA-PATT-SPATH-003', 'DSA-PATT-SPATH-004', 'DSA-PATT-SPATH-005'],
    svgGenerator: SVG_GENERATORS.dijkstraRelaxation,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/dijkstra-wavefront-loop.webm',
      durationSeconds: 10,
      fallbackText: 'Dijkstra seleciona o nó de menor custo no Min-Heap e relaxa suas arestas adjacentes.'
    }
  },
  'graphs-representations': {
    theme: 'Representações de Grafos & CSR',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Matriz vs Lista de Adjacência e Compressed Sparse Row',
    targetCards: ['DSA-STRUCT-GRAPH-000', 'DSA-STRUCT-GRAPH-001', 'DSA-STRUCT-GRAPH-002', 'DSA-STRUCT-GRAPH-003', 'DSA-STRUCT-GRAPH-004', 'DSA-STRUCT-GRAPH-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/adj-list-vs-matrix-density-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Matriz O(V²) para grafos densos vs Lista O(V+E) para grafos esparsos.'
    }
  },
  'disjoint-set-union': {
    theme: 'Disjoint Set Union (DSU / Union-Find)',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Compressão de Caminhos e União por Rank gerando complexidade quase linear O(α(N))',
    targetCards: ['DSA-STRUCT-DSU-000', 'DSA-STRUCT-DSU-001', 'DSA-STRUCT-DSU-002', 'DSA-STRUCT-DSU-003', 'DSA-STRUCT-DSU-004', 'DSA-STRUCT-DSU-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/dsu-path-compression-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Achatamento da árvore de apontadores diretamente para a raiz na chamada find().'
    }
  },
  'shortest-path-algorithms': {
    theme: 'Algoritmos de Caminho Mínimo',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Dijkstra com Min-Heap, Bellman-Ford e Floyd-Warshall',
    targetCards: ['DSA-PATT-SPATH-000', 'DSA-PATT-SPATH-001', 'DSA-PATT-SPATH-002', 'DSA-PATT-SPATH-003', 'DSA-PATT-SPATH-004', 'DSA-PATT-SPATH-005'],
    svgGenerator: SVG_GENERATORS.dijkstraRelaxation,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/dijkstra-wavefront-loop.webm',
      durationSeconds: 10,
      fallbackText: 'Seleção do nó com menor distância na Fila de Prioridade e relaxamento de arestas.'
    }
  },
  'topological-sort': {
    theme: 'Ordenação Topológica & DAGs',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Algoritmo de Kahn com fila de in-degree e DFS pós-ordem reversa',
    targetCards: ['DSA-PATT-TOPO-000', 'DSA-PATT-TOPO-001', 'DSA-PATT-TOPO-002', 'DSA-PATT-TOPO-003', 'DSA-PATT-TOPO-004', 'DSA-PATT-TOPO-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/topological-sort-kahn-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Enfileiramento de nós com grau de entrada 0 e decremento dos vizinhos.'
    }
  },
  'minimum-spanning-tree': {
    theme: 'Árvore Geradora Mínima (MST)',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Algoritmo de Kruskal com DSU e Algoritmo de Prim com Min-Heap',
    targetCards: ['DSA-PATT-MST-000', 'DSA-PATT-MST-001', 'DSA-PATT-MST-002', 'DSA-PATT-MST-003', 'DSA-PATT-MST-004', 'DSA-PATT-MST-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/kruskal-mst-dsu-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Processamento guloso de arestas ordenadas adicionando à MST via DSU.'
    }
  },

  // 3. Padrões Algorítmicos Dinâmicos
  'two-pointers': {
    theme: 'Two Pointers & Floyd Cycle Detection',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Ponteiros Convergentes e Algoritmo de Floyd (Tortoise and Hare)',
    targetCards: ['DSA-PATT-2POINT-000', 'DSA-PATT-2POINT-001', 'DSA-PATT-2POINT-002', 'DSA-PATT-2POINT-003', 'DSA-PATT-2POINT-004', 'DSA-PATT-2POINT-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/floyd-cycle-detection-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Ponteiro rápido (2x) e lento (1x) reduzindo a distância relativa no ciclo a cada passo.'
    }
  },
  'sliding-window': {
    theme: 'Sliding Window Fixo & Dinâmico',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Expansão à direita e contração à esquerda com cálculo delta O(1)',
    targetCards: ['DSA-PATT-SLIDE-000', 'DSA-PATT-SLIDE-001', 'DSA-PATT-SLIDE-002', 'DSA-PATT-SLIDE-003', 'DSA-PATT-SLIDE-004', 'DSA-PATT-SLIDE-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/sliding-window-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Janela deslizante de tamanho K adicionando à direita e removendo à esquerda em O(1).'
    }
  },
  'binary-search': {
    theme: 'Busca Binária & Espaço de Respostas',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Descarte logarítmico de metade do espaço e busca monotônica por predicado',
    targetCards: ['DSA-PATT-BSEARCH-000', 'DSA-PATT-BSEARCH-001', 'DSA-PATT-BSEARCH-002', 'DSA-PATT-BSEARCH-003', 'DSA-PATT-BSEARCH-004', 'DSA-PATT-BSEARCH-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/binary-search-bisect-loop.webm',
      durationSeconds: 7,
      fallbackText: 'Cálculo do ponto médio M e descarte da metade do espaço a cada iteração.'
    }
  },
  'bfs-dfs-traversals': {
    theme: 'Travessias BFS & DFS',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Expansão de Fronteira por Níveis (BFS) e Recursão em Profundidade (DFS)',
    targetCards: ['DSA-PATT-TRAVERSAL-000', 'DSA-PATT-TRAVERSAL-001', 'DSA-PATT-TRAVERSAL-002', 'DSA-PATT-TRAVERSAL-003', 'DSA-PATT-TRAVERSAL-004', 'DSA-PATT-TRAVERSAL-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/bfs-wavefront-expansion-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Expansão da fronteira de busca nível por nível em anéis concêntricos usando fila FIFO.'
    }
  },
  'backtracking': {
    theme: 'Backtracking & Poda de Estados',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Árvore de decisão com Choose-Explore-Unchoose e poda de ramos inválidos',
    targetCards: ['DSA-PATT-BACKTRACK-000', 'DSA-PATT-BACKTRACK-001', 'DSA-PATT-BACKTRACK-002', 'DSA-PATT-BACKTRACK-003', 'DSA-PATT-BACKTRACK-004', 'DSA-PATT-BACKTRACK-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/backtracking-pruning-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Exploração de escolhas candidatas com retrocesso imediato ao violar restrições.'
    }
  },
  'monotonic-stack-queue': {
    theme: 'Monotonic Stack & Deque',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Next Greater Element em O(N) e Sliding Window Maximum com Deque',
    targetCards: ['DSA-PATT-MONOSTACK-000', 'DSA-PATT-MONOSTACK-001', 'DSA-PATT-MONOSTACK-002', 'DSA-PATT-MONOSTACK-003', 'DSA-PATT-MONOSTACK-004', 'DSA-PATT-MONOSTACK-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/monotonic-stack-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Desempilhamento contínuo de elementos menores para manter a pilha decrescente.'
    }
  },
  'divide-and-conquer-sorting': {
    theme: 'Dividir & Conquistar / Ordenação',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'QuickSort In-Place Partitioning e MergeSort Intercalação Estável',
    targetCards: ['DSA-PATT-DIVCONQ-000', 'DSA-PATT-DIVCONQ-001', 'DSA-PATT-DIVCONQ-002', 'DSA-PATT-DIVCONQ-003', 'DSA-PATT-DIVCONQ-004', 'DSA-PATT-DIVCONQ-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/quicksort-partition-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Escolha de pivô e reorganização in-place com menores à esquerda e maiores à direita.'
    }
  },
  'dynamic-programming-1d': {
    theme: 'Programação Dinâmica 1D',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Transições de estado, memoização e otimização de espaço para O(1)',
    targetCards: ['DSA-PATT-DP1D-000', 'DSA-PATT-DP1D-001', 'DSA-PATT-DP1D-002', 'DSA-PATT-DP1D-003', 'DSA-PATT-DP1D-004', 'DSA-PATT-DP1D-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/dp-state-transition-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Memoização de subproblemas sobrepostos eliminando recálculos exponenciais O(2^N) -> O(N).'
    }
  },
  'dynamic-programming-2d': {
    theme: 'Programação Dinâmica 2D',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: '0/1 Knapsack, Longest Common Subsequence e Grid Paths',
    targetCards: ['DSA-PATT-DP2D-000', 'DSA-PATT-DP2D-001', 'DSA-PATT-DP2D-002', 'DSA-PATT-DP2D-003', 'DSA-PATT-DP2D-004', 'DSA-PATT-DP2D-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/dp-2d-knapsack-grid-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Preenchimento de matriz bidimensional onde o estado atual depende de células vizinhas.'
    }
  },
  'dynamic-programming-advanced': {
    theme: 'Programação Dinâmica Avançada',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Bitmask DP, Traveling Salesperson, Digit DP e Tree DP',
    targetCards: ['DSA-PATT-DPADV-000', 'DSA-PATT-DPADV-001', 'DSA-PATT-DPADV-002', 'DSA-PATT-DPADV-003', 'DSA-PATT-DPADV-004', 'DSA-PATT-DPADV-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/dp-bitmask-tsp-loop.webm',
      durationSeconds: 10,
      fallbackText: 'Inteiro de 32 bits utilizado como conjunto de elementos visitados indexando a DP.'
    }
  },
  'greedy-algorithms': {
    theme: 'Algoritmos Gulosos & Huffman',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Interval Scheduling, Codificação de Huffman e Alcance no Jump Game',
    targetCards: ['DSA-PATT-GREEDY-000', 'DSA-PATT-GREEDY-001', 'DSA-PATT-GREEDY-002', 'DSA-PATT-GREEDY-003', 'DSA-PATT-GREEDY-004', 'DSA-PATT-GREEDY-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/greedy-interval-scheduling-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Seleção gulosa de intervalos que terminam mais cedo liberando recursos.'
    }
  },
  'intervals-merge': {
    theme: 'Fusão & Manipulação de Intervalos',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Merge Intervals, Insert Interval e Min-Heap para Meeting Rooms',
    targetCards: ['DSA-PATT-INTERVAL-000', 'DSA-PATT-INTERVAL-001', 'DSA-PATT-INTERVAL-002', 'DSA-PATT-INTERVAL-003', 'DSA-PATT-INTERVAL-004', 'DSA-PATT-INTERVAL-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/intervals-merge-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Ordenação por início e fusão de intervalos sobrepostos estendendo o ponto final.'
    }
  },
  'bit-manipulation-patterns': {
    theme: 'Manipulação de Bits & Bitmasks',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Brian Kernighan LSB, Cancelamento de XOR e Iteração de Subconjuntos',
    targetCards: ['DSA-PATT-BIT-000', 'DSA-PATT-BIT-001', 'DSA-PATT-BIT-002', 'DSA-PATT-BIT-003', 'DSA-PATT-BIT-004', 'DSA-PATT-BIT-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/bit-manipulation-lsb-loop.webm',
      durationSeconds: 7,
      fallbackText: 'A operação n & (n-1) limpa o bit menos significativo em cada passo.'
    }
  },
  'concurrent-data-structures': {
    theme: 'Estruturas de Dados Concorrentes & Lock-Free',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Lock-Free CAS Loops, Tagged Pointers para ABA e Disruptor Ring Buffer',
    targetCards: ['DSA-ADV-CONCURRENT-000', 'DSA-ADV-CONCURRENT-001', 'DSA-ADV-CONCURRENT-002', 'DSA-ADV-CONCURRENT-003', 'DSA-ADV-CONCURRENT-004', 'DSA-ADV-CONCURRENT-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/lock-free-cas-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Laços otimistas de Compare-And-Swap (CAS) eliminando context switches e travas de mutex.'
    }
  },
  'string-matching': {
    theme: 'Algoritmos de Casamento de Strings',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'KMP com Tabela LPS, Rabin-Karp Rolling Hash e Z-Algorithm',
    targetCards: ['DSA-ADV-STRING-000', 'DSA-ADV-STRING-001', 'DSA-ADV-STRING-002', 'DSA-ADV-STRING-003', 'DSA-ADV-STRING-004', 'DSA-ADV-STRING-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/kmp-lps-automaton-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Tabela LPS permite saltar caracteres redundantes sem retroceder o texto principal.'
    }
  },
  'sweepline-geometry': {
    theme: 'Geometria Computacional & Sweep Line',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Fila de eventos no eixo X, Skyline Problem com Heap e Graham Scan',
    targetCards: ['DSA-ADV-SWEEPLINE-000', 'DSA-ADV-SWEEPLINE-001', 'DSA-ADV-SWEEPLINE-002', 'DSA-ADV-SWEEPLINE-003', 'DSA-ADV-SWEEPLINE-004', 'DSA-ADV-SWEEPLINE-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/sweepline-events-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Linha imaginária varrendo o plano 2D processando eventos em ordem cronológica.'
    }
  },
  'game-theory-math': {
    theme: 'Teoria dos Jogos & Algoritmos Matemáticos',
    phase: '01-dsa',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Nim-Sum XOR, Teorema de Sprague-Grundy e Minimax com Alpha-Beta',
    targetCards: ['DSA-ADV-GAMETHEORY-000', 'DSA-ADV-GAMETHEORY-001', 'DSA-ADV-GAMETHEORY-002', 'DSA-ADV-GAMETHEORY-003', 'DSA-ADV-GAMETHEORY-004', 'DSA-ADV-GAMETHEORY-005'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/dsa/game-theory-nim-sum-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Cálculo do XOR de todas as pilhas para determinação de posições vencedoras e perdedoras.'
    }
  },

  // 3. Redes de Computadores & Protocolos de Transporte
  'tcp-udp-transport': {
    theme: 'Redes & Protocolos de Transporte',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'TCP 3-Way Handshake, 4-Way Teardown, Janela Deslizante e Controle de Congestionamento (Slow Start)',
    targetCards: ['CS-NET-TCP-000', 'CS-NET-TCP-001', 'CS-NET-TCP-002', 'CS-NET-TCP-003', 'CS-NET-TCP-004'],
    svgGenerator: SVG_GENERATORS.tcpHandshake,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/networking/tcp-handshake-loop.webm',
      durationSeconds: 6,
      fallbackText: 'O handshake de 3 vias sincroniza números de sequência iniciais (ISN) entre cliente e servidor.'
    }
  },
  'http-protocols': {
    theme: 'HTTP & Protocolos Web',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Multiplexação de Streams no HTTP/2 vs Remoção do Head-of-Line Blocking no HTTP/3 (QUIC/UDP)',
    targetCards: ['CS-NET-HTTP-000', 'CS-NET-HTTP-001', 'CS-NET-HTTP-002', 'CS-NET-HTTP-003'],
    svgGenerator: SVG_GENERATORS.httpMultiplex,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/networking/http2-multiplexing-streams-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Streams binárias independentes multiplexadas sobre uma única conexão TCP no HTTP/2 e sobre QUIC no HTTP/3.'
    }
  },
  'dns-tls': {
    theme: 'Segurança & Resolução de Nomes',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Resolução Recursiva DNS e Handshake TLS 1.3 de 1-RTT com troca de chaves ECDHE',
    targetCards: ['CS-NET-DNS-000', 'CS-NET-DNS-001', 'CS-NET-DNS-002'],
    svgGenerator: SVG_GENERATORS.tlsHandshake,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/networking/tls-13-handshake-keyshare-loop.webm',
      durationSeconds: 7,
      fallbackText: 'Handshake TLS 1.3 de 1-RTT enviando parâmetros Diffie-Hellman na primeira mensagem.'
    }
  },
  'modern-apis-protocols': {
    theme: 'Paradigmas de APIs & Serialização',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'REST vs WebSockets vs SSE e Serialização Binária Protobuf no gRPC',
    targetCards: ['CS-NET-API-000', 'CS-NET-API-001', 'CS-NET-API-002', 'CS-NET-API-003'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/networking/grpc-protobuf-binary-framing-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Mensagens codificadas em binário compacto Protobuf trafegando em streams multiplexadas HTTP/2.'
    }
  },
  'socket-io-epoll': {
    theme: 'Sockets TCP & I/O Multiplexing',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Ciclo de vida de sockets, TCP_NODELAY, TIME_WAIT e epoll O(1)',
    targetCards: ['CS-NET-SOCK-000', 'CS-NET-SOCK-001', 'CS-NET-SOCK-002'],
    svgGenerator: SVG_GENERATORS.epollEventLoop,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/networking/epoll-event-ready-list-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Linux epoll notificando em tempo O(1) apenas descritores de arquivo que receberam eventos de I/O.'
    }
  },

  // 4. Sistemas Operacionais & Memória
  'virtual-memory': {
    theme: 'Memória Virtual & Paginação',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Tradução VPN -> PFN via TLB, Page Tables Multinível e Page Faults',
    targetCards: ['CS-OS-VMEM-000', 'CS-OS-VMEM-001', 'CS-OS-VMEM-002', 'CS-OS-VMEM-003', 'CS-OS-VMEM-005'],
    svgGenerator: SVG_GENERATORS.virtualMemory,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/os/virtual-memory-tlb-translation-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Divisão de endereço virtual em VPN e Offset com busca ultrarrápida na TLB em hardware.'
    }
  },
  'processes-threads': {
    theme: 'Processos, Threads & Escalonamento',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Ciclo de vida de processos, sobrecarga de context switch e Green Threads',
    targetCards: ['CS-OS-PROC-000', 'CS-OS-PROC-001', 'CS-OS-PROC-002', 'CS-OS-PROC-003'],
    svgGenerator: SVG_GENERATORS.processLifecycle,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/os/process-context-switch-pcb-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Troca de contexto salvando registradores, stack pointer e atualizando CR3 na troca de processos.'
    }
  },
  'synchronization-primitives': {
    theme: 'Primitivas de Sincronização & Deadlocks',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Spinlock vs Mutex vs Futex, Semáforos e Condições de Coffman',
    targetCards: ['CS-OS-SYNC-000', 'CS-OS-SYNC-001', 'CS-OS-SYNC-002', 'CS-OS-SYNC-003', 'CS-OS-SYNC-004'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/os/futex-fast-userspace-mutex-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Tentativa rápida de lock em User Space via CAS com fallback para syscall futex no Kernel apenas em contenção.'
    }
  },
  'lock-free-atomics': {
    theme: 'Programação Lock-Free & Atômicos',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Instrução Compare-And-Swap (CAS), Memory Barriers e Problema ABA com Tagged Pointers',
    targetCards: ['CS-OS-ATOM-000', 'CS-OS-ATOM-001', 'CS-OS-ATOM-002', 'CS-OS-ATOM-004'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/os/lock-free-cas-aba-tagged-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Incremento atômico de versão em tagged pointer impedindo que mudanças ABA passem despercebidas pelo CAS.'
    }
  },
  'linux-kernel-process-management': {
    theme: 'Kernel Linux & Gerenciamento de Processos',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'fork() Copy-On-Write (COW), Escalonador CFS com RB-Tree e Processos Zumbis',
    targetCards: ['CS-OS-KERN-000', 'CS-OS-KERN-001', 'CS-OS-KERN-002', 'CS-OS-KERN-003'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/os/linux-fork-copy-on-write-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Compartilhamento de páginas físicas marcadas como read-only duplicando apenas na primeira tentativa de escrita.'
    }
  },
  'linux-io-syscalls': {
    theme: 'Syscalls & Linux I/O Subsystem',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Transição Ring 3 -> Ring 0, Direct I/O, Zero-Copy sendfile() e Page Cache',
    targetCards: ['CS-OS-SYS-000', 'CS-OS-SYS-001', 'CS-OS-SYS-002', 'CS-OS-SYS-003'],
    svgGenerator: SVG_GENERATORS.epollEventLoop,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/os/linux-zero-copy-sendfile-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Transferência direta de dados do Page Cache para o Socket Buffer via DMA sem passar pelo User Space.'
    }
  },
  'ipc-inter-process-communication': {
    theme: 'Comunicação Inter-Processos (IPC)',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Pipes, Unix Domain Sockets e Memória Compartilhada POSIX shm_open',
    targetCards: ['CS-OS-IPC-000', 'CS-OS-IPC-001', 'CS-OS-IPC-002', 'CS-OS-IPC-003'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/os/posix-shared-memory-shm-loop.webm',
      durationSeconds: 7,
      fallbackText: 'Mapeamento do mesmo bloco de memória física nos espaços virtuais de dois processos para transferência em O(1).'
    }
  },

  // 5. Arquitetura de Computadores & Hardware
  'cpu-cache': {
    theme: 'Hierarquia de Cache & Coerência MESI',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Linhas de Cache de 64 bytes, Protocolo MESI, False Sharing e Write-Through/Back',
    targetCards: ['CS-ARCH-CACHE-000', 'CS-ARCH-CACHE-001', 'CS-ARCH-CACHE-002', 'CS-ARCH-CACHE-003', 'CS-ARCH-CACHE-004'],
    svgGenerator: SVG_GENERATORS.cpuCacheMESI,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/architecture/cpu-cache-false-sharing-mesi-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Invalidação de linha de cache compartilhada entre cores distintos durante escritas simultâneas em variáveis vizinhas.'
    }
  },
  'cpu-internals-isa': {
    theme: 'Processadores & Conjunto de Instruções',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Von Neumann vs Harvard, Ciclo Fetch-Decode-Execute, CISC vs RISC e Registradores',
    targetCards: ['CS-ARCH-CPU-000', 'CS-ARCH-CPU-001', 'CS-ARCH-CPU-002', 'CS-ARCH-CPU-003'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/architecture/cpu-fetch-decode-execute-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Ciclo de instrução da CPU buscando comando no PC, decodificando na Control Unit e executando na ALU.'
    }
  },
  'pipelining-branch-prediction': {
    theme: 'Pipelines & Previsão de Desvios',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Pipelining de Instruções, Hazards Estruturais/Dados, Branch Prediction e SIMD',
    targetCards: ['CS-ARCH-PIPE-000', 'CS-ARCH-PIPE-001', 'CS-ARCH-PIPE-002', 'CS-ARCH-PIPE-003'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/architecture/cpu-pipeline-branch-flush-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Previsão especulativa de ramificação mantendo o pipeline cheio e penalidade de flush em caso de erro.'
    }
  },
  'storage-io-hierarchy': {
    theme: 'Hierarquia de I/O & Armazenamento',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'HDD vs SSD NVMe, Append-Only Logs, I/O Sequencial vs Aleatório e DMA',
    targetCards: ['CS-ARCH-IO-000', 'CS-ARCH-IO-001', 'CS-ARCH-IO-002', 'CS-ARCH-IO-003', 'CS-ARCH-IO-004', 'CS-ARCH-IO-005'],
    svgGenerator: SVG_GENERATORS.storageHierarchy,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/architecture/memory-storage-latency-pyramid-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Diferenças de ordens de magnitude na latência de acesso: L1 Cache (~1ns) vs RAM (~100ns) vs NVMe (~20µs) vs HDD (~5ms).'
    }
  },

  // 6. Runtimes & Garbage Collection
  'go-runtime-gc': {
    theme: 'Go Runtime, GC & GMP',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Tri-Color Concurrent Mark-Sweep, Modelo GMP com Work-Stealing e GOMEMLIMIT',
    targetCards: ['CS-RNT-GO-000', 'CS-RNT-GO-001', 'CS-RNT-GO-002'],
    svgGenerator: SVG_GENERATORS.goGMP,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/runtimes/go-gmp-scheduler-stealing-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Processador lógico ocioso roubando goroutines da fila local de outro processador no modelo GMP do Go.'
    }
  },
  'jvm-memory-gc': {
    theme: 'JVM Internals & Garbage Collectors',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Heap Generacional (Eden, S0/S1, Tenured), Metaspace, G1GC vs ZGC e Pausas STW',
    targetCards: ['CS-RNT-JVM-000', 'CS-RNT-JVM-001', 'CS-RNT-JVM-002', 'CS-RNT-JVM-003'],
    svgGenerator: SVG_GENERATORS.jvmGenerationalHeap,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/runtimes/jvm-generational-gc-promotion-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Objetos sobreviventes promovidos de Eden para Survivor e posteriormente para Tenured no ciclo de GC da JVM.'
    }
  },
  'memory-allocation-escape-analysis': {
    theme: 'Alocação de Memória & Escape Analysis',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Stack vs Heap, Escape Analysis do Compilador e sync.Pool para Reúso',
    targetCards: ['CS-RNT-ALLOC-000', 'CS-RNT-ALLOC-002', 'CS-RNT-ALLOC-003'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/runtimes/escape-analysis-stack-heap-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Ponteiros que não escapam do escopo da função são alocados diretamente no stack frame sem overhead de GC.'
    }
  },

  // 7. Matemática Discreta & Lógica
  'boolean-logic': {
    theme: 'Lógica Booleana & Operações Bitwise',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Operações Bitwise, Algoritmo de Brian Kernighan, Leis de De Morgan e Bitsets',
    targetCards: ['CS-MATH-BOOL-000', 'CS-MATH-BOOL-001', 'CS-MATH-BOOL-002', 'CS-MATH-BOOL-003', 'CS-MATH-BOOL-004'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/math/bitwise-brian-kernighan-popcount-loop.webm',
      durationSeconds: 7,
      fallbackText: 'A operação n & (n-1) desliga o bit 1 menos significativo em cada iteração contando os bits ativos.'
    }
  },
  'combinatorics-probability': {
    theme: 'Combinatória, Probabilidade & Hashing',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Permutações vs Combinações, Paradoxo do Aniversário e Bloom Filters',
    targetCards: ['CS-MATH-PROB-000', 'CS-MATH-PROB-001', 'CS-MATH-PROB-002', 'CS-MATH-PROB-004'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/math/birthday-paradox-hash-collision-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Crescimento exponencial da probabilidade de colisão atingindo 50% em apenas sqrt(N) elementos.'
    }
  },
  'graph-theory': {
    theme: 'Teoria dos Grafos & Invariantes',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'DAGs, Princípio da Casa dos Pombos, SCCs com Tarjan e DSU',
    targetCards: ['CS-MATH-GRAPH-000', 'CS-MATH-GRAPH-001', 'CS-MATH-GRAPH-002', 'CS-MATH-GRAPH-003', 'CS-MATH-GRAPH-004'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/math/tarjan-strongly-connected-components-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Busca em profundidade com low-link values identificando componentes fortemente conexos em tempo O(V+E).'
    }
  },
  'number-representation-ieee754': {
    theme: 'Representação Numérica & IEEE 754',
    phase: '02-cs-fundamentals',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Complemento de Dois, Endianness e IEEE 754 (Sinal, Expoente, Mantissa)',
    targetCards: ['CS-MATH-NUM-000', 'CS-MATH-NUM-001', 'CS-MATH-NUM-002', 'CS-MATH-NUM-003', 'CS-MATH-NUM-004'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/math/ieee-754-floating-point-layout-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Decomposição binária em 1 bit de sinal, 8 bits de expoente com bias e 23 bits de mantissa normalizada.'
    }
  },

  // 4. Caches & Topologias de Armazenamento
  'caching-patterns': {
    theme: 'Estratégias & Padrões de Caching',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Fluxo comparativo: Cache-Aside vs Write-Through vs Write-Back e Estrutura LRU (Map + Doubly-Linked List)',
    targetCards: ['SYS-CACHE-PATTERNS-000', 'SYS-CACHE-PATTERNS-001'],
    svgGenerator: SVG_GENERATORS.cacheAsidePattern,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/cache-aside-vs-write-through-loop.webm',
      durationSeconds: 7,
      fallbackText: 'Cache-Aside lê sob demanda da cache com lazy loading vs Write-Through atualizando cache e banco de dados de forma síncrona.'
    }
  },
  'cache-invalidation-anomalies': {
    theme: 'Anomalias de Cache & Invalidação',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Cache Stampede com Mutex / Singleflight e Cache Penetration com Bloom Filter',
    targetCards: ['SYS-CACHE-ANOMALIES-000', 'SYS-CACHE-ANOMALIES-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/cache-stampede-mutex-singleflight-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Cache Stampede: múltiplas requisições simultâneas em cache miss bloqueadas por Mutex/Singleflight enquanto apenas 1 worker recalcula o dado.'
    }
  },
  'cdn-edge-caching': {
    theme: 'CDNs & Edge Caching',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Roteamento Anycast BGP para PoPs e diretiva HTTP stale-while-revalidate',
    targetCards: ['SYS-CACHE-CDN-000', 'SYS-CACHE-CDN-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/cdn-anycast-bgp-pop-routing-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Roteamento Anycast BGP direcionando requisições do cliente ao Point of Presence (PoP) de menor latência geográfica.'
    }
  },
  'redis-internals': {
    theme: 'Redis Internals & Estruturas de Dados',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Event Loop Single-Threaded com epoll e SkipLists probabilísticas em ZSets',
    targetCards: ['SYS-CACHE-REDIS-000', 'SYS-CACHE-REDIS-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/redis-single-thread-event-loop-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Event Loop do Redis operando em memória RAM física com multiplexador de I/O não-bloqueante (epoll/kqueue) sem contenção de locks.'
    }
  },

  // 5. Bancos de Dados & Storage Engines
  'acid-isolation-levels': {
    theme: 'Níveis de Isolamento ACID & MVCC',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Anomalias ANSI SQL (Dirty, Non-Repeatable, Phantom Read), MVCC e Write Skew',
    targetCards: ['SYS-DB-ACID-000', 'SYS-DB-ACID-001', 'SYS-DB-ACID-002'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/mvcc-snapshot-isolation-xmin-xmax-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Controle de Concorrência Multiversão (MVCC): leituras enxergam snapshot imutável baseado em xmin/xmax sem travar escritas.'
    }
  },
  'nosql-data-modeling': {
    theme: 'Modelagem NoSQL (DynamoDB & Cassandra)',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'DynamoDB Single-Table Design (PK/SK) e Cassandra Tombstone Storms',
    targetCards: ['SYS-DB-NOSQL-000', 'SYS-DB-NOSQL-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/dynamodb-single-table-design-pk-sk-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Modelagem Single-Table no DynamoDB particionando por HASH (PK) e ordenando ranges por SORT (SK) para consultas ricas em 1 RTT.'
    }
  },
  'scaling-replication-cdc': {
    theme: 'Replicação de BD & Change Data Capture (CDC)',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Replication Lag em Leader-Follower e Debezium lendo WAL/Binlog',
    targetCards: ['SYS-DB-SCALING-000', 'SYS-DB-SCALING-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/cdc-debezium-wal-binlog-streaming-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Change Data Capture (CDC) lendo o Write-Ahead Log (WAL) do banco de dados e transmitindo streams de mutações em tempo real.'
    }
  },
  'sql-indexing-optimization': {
    theme: 'Índices SQL & Otimização de Consultas',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Índice Clustered vs Secundário, Leftmost Prefix Rule e Covering Index',
    targetCards: ['SYS-DB-SQLOPT-000', 'SYS-DB-SQLOPT-001', 'SYS-DB-SQLOPT-002'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/sql-covering-index-zero-table-lookup-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Covering Index satisfazendo todas as colunas do SELECT e WHERE diretamente nos nós folhas sem acessar a tabela física.'
    }
  },
  'storage-engines': {
    theme: 'Storage Engines: B+Tree vs LSM-Tree vs Colunar',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'B+Tree vs LSM-Tree (MemTable, WAL, SSTables, Compaction) vs Formato Colunar (Parquet)',
    targetCards: ['SYS-DB-ENGINE-000', 'SYS-DB-ENGINE-001', 'SYS-DB-ENGINE-002'],
    svgGenerator: SVG_GENERATORS.lsmTreeEngine,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/lsm-tree-memtable-wal-sstable-compaction-loop.webm',
      durationSeconds: 9,
      fallbackText: 'LSM-Tree gravando em WAL e MemTable em memória com flush assíncrono para SSTables imutáveis em disco.'
    }
  },
  'vector-databases-search': {
    theme: 'Bancos Vetoriais & Busca Textual',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Elasticsearch Inverted Index & BM25 vs Grafo HNSW para Busca Vetorial',
    targetCards: ['SYS-DB-VECTOR-000', 'SYS-DB-VECTOR-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/hnsw-vector-graph-ann-search-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Grafo multicamadas HNSW navegando por saltos longos na camada superior e busca de vizinhos densa na camada inferior.'
    }
  },

  // 6. Sistemas Distribuídos & Consenso
  'cap-pacelc-consistency': {
    theme: 'Teoremas CAP & PACELC',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Trade-off CAP em partição de rede e Espectro de Consistência (Linearizability vs Eventual)',
    targetCards: ['SYS-DIST-CONSISTENCY-000', 'SYS-DIST-CONSISTENCY-001', 'SYS-DIST-CONSISTENCY-002'],
    svgGenerator: SVG_GENERATORS.capPacelcMatrix,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/cap-theorem-network-partition-tradeoff-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Teorema CAP: em caso de partição de rede (P), o sistema deve optar entre Consistência estrita (CP) ou Disponibilidade (AP).'
    }
  },
  'consensus-replication': {
    theme: 'Consenso & Replicação de Estado',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Protocolo Raft: Estados (Follower, Candidate, Leader), Heartbeats de Keep-Alive e Replicação de Log',
    targetCards: ['SYS-DIST-CONSENSUS-000', 'SYS-DIST-CONSENSUS-001', 'SYS-DIST-CONSENSUS-002'],
    svgGenerator: SVG_GENERATORS.raftConsensus,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/raft-leader-election-loop.webm',
      durationSeconds: 12,
      fallbackText: 'Followers disparam eleição após Election Timeout e tornam-se Líder com maioria estrita de votos.'
    }
  },
  'distributed-locking-coordination': {
    theme: 'Locks Distribuídos & Coordenação',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Redis SETNX, Risco de GC Pauses e Fencing Tokens Monotônicos',
    targetCards: ['SYS-DIST-LOCK-000', 'SYS-DIST-LOCK-001'],
    svgGenerator: SVG_GENERATORS.distributedLockRedlock,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/fencing-tokens-monotonic-resource-protection-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Fencing Tokens monotonicamente crescentes rejeitando gravações de clientes antigos com tokens desatualizados.'
    }
  },
  'distributed-transactions': {
    theme: 'Transações Distribuídas & Sagas',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Two-Phase Commit (2PC), Saga Orchestration e Transactional Outbox Pattern',
    targetCards: ['SYS-DIST-TX-000', 'SYS-DIST-TX-001', 'SYS-DIST-TX-002'],
    svgGenerator: SVG_GENERATORS.twoPhaseCommit,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/two-phase-commit-2pc-prepare-commit-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Protocolo Two-Phase Commit (2PC): fase Prepare obtendo votos de prontidão e fase Commit aplicando alterações atomicamente.'
    }
  },
  'sharding-consistent-hashing': {
    theme: 'Particionamento & Consistent Hashing',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Anel de Hash com Nós Virtuais (Virtual Nodes) para balanceamento uniforme e minimização de migração de chaves',
    targetCards: ['SYS-DIST-SHARDING-000', 'SYS-DIST-SHARDING-001'],
    svgGenerator: SVG_GENERATORS.consistentHashingRing,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/consistent-hashing-ring-node-add-remove-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Anel de Consistent Hashing remapeando apenas as chaves do segmento vizinho quando nós entram ou saem do cluster.'
    }
  },
  'time-clocks-id-generation': {
    theme: 'Relógios Lógicos & Geração de IDs',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Vector Clocks, Twitter Snowflake 64-bit e Google TrueTime API',
    targetCards: ['SYS-DIST-TIME-000', 'SYS-DIST-TIME-001', 'SYS-DIST-TIME-002'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/twitter-snowflake-64bit-id-structure-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Estrutura do Snowflake: 41 bits de timestamp, 10 bits de ID de máquina/datacenter e 12 bits de sequência local.'
    }
  },

  // 7. Arquétipos FAANG de System Design
  'case-distributed-file-storage': {
    theme: 'Arquétipo: Armazenamento Distribuído de Arquivos',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Chunking de 4MB, Sincronização Delta e Deduplicação CAS',
    targetCards: ['SYS-ARCH-FILESTORE-000', 'SYS-ARCH-FILESTORE-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/google-drive-chunking-delta-sync-pipeline-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Divisão de arquivos em blocos de 4MB com hash SHA-256 e sincronização delta transmitindo apenas blocos modificados.'
    }
  },
  'case-distributed-task-scheduler': {
    theme: 'Arquétipo: Agendador de Tarefas Distribuído',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Delay Queues com Redis ZSet, Orquestração de DAGs e Heartbeats',
    targetCards: ['SYS-ARCH-SCHEDULER-000', 'SYS-ARCH-SCHEDULER-001'],
    svgGenerator: SVG_GENERATORS.distributedTaskScheduler,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/distributed-task-scheduler-delay-queue-redis-zset-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Agendador distribuído usando Redis Sorted Sets com score de timestamp para puxar tarefas prontas com baixa latência.'
    }
  },
  'case-flash-sale-inventory': {
    theme: 'Arquétipo: Vendas Relâmpago & Alta Concorrência',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Reserva Atômica via Redis Lua, Virtual Waiting Room e Desacoplamento por Fila',
    targetCards: ['SYS-ARCH-FLASHSALE-000', 'SYS-ARCH-FLASHSALE-001'],
    svgGenerator: SVG_GENERATORS.flashSaleInventoryTopology,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/flash-sale-redis-lua-atomic-decrement-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Decremento atômico de estoque via script Lua em Redis prevenindo overselling em picos de alta concorrência.'
    }
  },
  'case-metrics-monitoring': {
    theme: 'Arquétipo: Métricas & Séries Temporais (TSDB)',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Compressão Gorilla (Delta-of-Delta + Float XOR) e Prometheus Pull vs Push',
    targetCards: ['SYS-ARCH-METRICS-000', 'SYS-ARCH-METRICS-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/gorilla-tsdb-delta-of-delta-float-xor-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Algoritmo Gorilla comprimindo timestamps com delta-of-delta e valores float via XOR com os bits precedentes.'
    }
  },
  'case-payment-system-ledger': {
    theme: 'Arquétipo: Sistema de Pagamentos & Livro-Razão',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Double-Entry Bookkeeping Ledger, Idempotency Keys e Reconciliação Noturna',
    targetCards: ['SYS-ARCH-PAYMENT-000', 'SYS-ARCH-PAYMENT-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/double-entry-bookkeeping-ledger-debit-credit-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Livro-razão imutável garantindo que toda transação financeira possua Débitos e Créditos equilibrados com soma zero.'
    }
  },
  'case-realtime-chat': {
    theme: 'Arquétipo: Chat em Tempo Real (WhatsApp/Discord)',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'WebSocket Gateways, Camada de Presença e Roteamento via Redis Pub/Sub',
    targetCards: ['SYS-ARCH-CHAT-000', 'SYS-ARCH-CHAT-001'],
    svgGenerator: SVG_GENERATORS.realtimeChatTopology,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/websocket-gateway-presence-heartbeat-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Servidores de WebSocket Gateway mantendo conexões TCP persistentes com heartbeat e presença agregada no Redis.'
    }
  },
  'case-ride-hailing-geospatial': {
    theme: 'Arquétipo: Mobilidade Urbana & Geoespacial',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Grade Hexagonal Uber H3 e Ingestão de GPS em Tempo Real para Matching',
    targetCards: ['SYS-ARCH-RIDE-000', 'SYS-ARCH-RIDE-001'],
    svgGenerator: SVG_GENERATORS.rideHailingGeospatial,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/uber-h3-hexagonal-spatial-index-rings-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Grade espacial hexagonal Uber H3 com anéis k-ring de vizinhança uniforme sem distorções de cantos.'
    }
  },
  'case-search-autocomplete': {
    theme: 'Arquétipo: Autocompletar de Busca (Typeahead)',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Árvore Trie em Memória com Top-K Cache e Agregação Offline MapReduce',
    targetCards: ['SYS-ARCH-TYPEAHEAD-000', 'SYS-ARCH-TYPEAHEAD-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/typeahead-trie-topk-cache-lookup-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Árvore Trie em memória armazenando as K sugestões mais frequentes em cada nó para retorno em O(1).'
    }
  },
  'case-social-timeline-feed': {
    theme: 'Arquétipo: Feed Social (Twitter/Instagram)',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Fan-Out on Write (Push) vs Fan-Out on Read (Pull) e Arquitetura Híbrida',
    targetCards: ['SYS-ARCH-FEED-000', 'SYS-ARCH-FEED-001'],
    svgGenerator: SVG_GENERATORS.socialTimelineTopology,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/social-feed-fanout-push-vs-pull-timeline-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Fan-Out on Write gravando posts na caixa de entrada de cada seguidor vs Fan-Out on Read consultando na hora da leitura.'
    }
  },
  'case-url-shortener': {
    theme: 'Arquétipo: Encurtador de URLs (TinyURL)',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Codificação Base62, KGS e Cache Redis com Razão 100:1',
    targetCards: ['SYS-ARCH-URL-000', 'SYS-ARCH-URL-001'],
    svgGenerator: SVG_GENERATORS.urlShortenerTopology,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/tinyurl-base62-encoding-id-generator-loop.webm',
      durationSeconds: 7,
      fallbackText: 'Conversão de identificador numérico de 64 bits em string alfanumérica compacta de 7 caracteres via Base62.'
    }
  },
  'case-video-streaming': {
    theme: 'Arquétipo: Streaming de Vídeo (YouTube/Netflix)',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Chunking de Vídeo, Transcodificação DAG e Streaming Adaptativo HLS/DASH',
    targetCards: ['SYS-ARCH-STREAM-000', 'SYS-ARCH-STREAM-001'],
    svgGenerator: SVG_GENERATORS.videoStreamingPipeline,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/video-ingestion-chunking-transcoding-dag-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Upload de vídeo particionado em chunks com workers paralelos transcodificando múltiplos codecs e resoluções.'
    }
  },
  'case-web-crawler-search': {
    theme: 'Arquétipo: Web Crawler Distribuído (Googlebot)',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'URL Frontier com Filas de Polidez e Deduplicação via Bloom Filter & SimHash',
    targetCards: ['SYS-ARCH-CRAWLER-000', 'SYS-ARCH-CRAWLER-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/web-crawler-url-frontier-politeness-queue-loop.webm',
      durationSeconds: 8,
      fallbackText: 'URL Frontier separando filas de prioridade e filas de polidez por hostname para evitar sobrecarga em servidores de destino.'
    }
  },

  // 8. Low-Level Design & Padrões de Projeto
  'concurrency-patterns-backend': {
    theme: 'Padrões de Concorrência Backend',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Worker Pools Bounded e Fan-Out / Fan-In Multiplexing em Go',
    targetCards: ['SYS-LLD-CONCURRENCY-000', 'SYS-LLD-CONCURRENCY-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/concurrency-worker-pool-bounded-channels-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Worker Pool distribuindo tarefas através de canal bufferizado para número fixo de goroutines controlando uso de CPU e memória.'
    }
  },
  'design-patterns-gang-of-four': {
    theme: 'Design Patterns GoF no Backend',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Strategy + Factory para eliminar condicionais e Decorator vs Adapter',
    targetCards: ['SYS-LLD-PATTERNS-000', 'SYS-LLD-PATTERNS-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/design-patterns-strategy-factory-polymorphism-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Substituição de condicionais por polimorfismo instanciando algoritmos via Factory e executando via interface Strategy.'
    }
  },
  'lld-case-studies': {
    theme: 'Estudos de Caso em Low-Level Design',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Estacionamento (Parking Lot) Polimórfico e In-Memory Cache Thread-Safe',
    targetCards: ['SYS-LLD-CASES-000', 'SYS-LLD-CASES-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/lld-in-memory-cache-threadsafe-ttl-eviction-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Cache em memória com mutex RWMutex, limpeza ativa de chaves expiradas por worker em background e evicção LRU.'
    }
  },
  'solid-clean-architecture': {
    theme: 'SOLID & Arquitetura Hexagonal',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Princípios SRP & DIP e Arquitetura Hexagonal (Ports & Adapters)',
    targetCards: ['SYS-LLD-SOLID-000', 'SYS-LLD-SOLID-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/hexagonal-architecture-ports-and-adapters-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Núcleo de domínio isolado de infraestrutura comunicando-se exclusivamente através de Portas de Entrada e Saída.'
    }
  },

  // 9. Mensageria & Streaming
  'delivery-guarantees-idempotency': {
    theme: 'Garantias de Entrega & Idempotência',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Garantias At-Least-Once vs Exactly-Once e Deduplicação por Idempotency Key',
    targetCards: ['SYS-MSG-GUARANTEES-000', 'SYS-MSG-GUARANTEES-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/idempotency-key-consumer-deduplication-sql-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Inserção de chave de idempotência com chave única no banco de dados bloqueando processamento duplicado.'
    }
  },
  'event-sourcing-cqrs': {
    theme: 'Event Sourcing & CQRS',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Event Store Append-Only, Reidratação de Entidades e Projeções de Leitura CQRS',
    targetCards: ['SYS-MSG-EVENTS-000', 'SYS-MSG-EVENTS-001'],
    svgGenerator: SVG_GENERATORS.eventSourcingCQRS,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/event-sourcing-append-only-log-rehydration-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Reidratação de estado de entidade reconstruindo a partir da sequência cronológica de eventos imutáveis.'
    }
  },
  'kafka-internals': {
    theme: 'Apache Kafka & Streaming',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Append-Only Partition Log, Consumer Groups, Offset Tracking e Log Compaction',
    targetCards: ['SYS-MSG-KAFKA-000', 'SYS-MSG-KAFKA-001'],
    svgGenerator: SVG_GENERATORS.kafkaPartitioning,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/kafka-partition-stream-loop.webm',
      durationSeconds: 9,
      fallbackText: 'Cada partição do Kafka é um log sequencial distribuído e lido de forma independente por consumidores.'
    }
  },
  'message-queues': {
    theme: 'Filas de Mensagens (RabbitMQ & SQS)',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Modelos Point-to-Point vs Pub/Sub e Visibility Timeout com Dead Letter Queues (DLQ)',
    targetCards: ['SYS-MSG-QUEUES-000', 'SYS-MSG-QUEUES-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/sqs-visibility-timeout-dead-letter-queue-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Visibility Timeout escondendo mensagem em processamento e roteamento automático para DLQ após estourar limite de retentativas.'
    }
  },

  // 10. Resiliência, Tráfego & Service Mesh
  'api-design-gateways': {
    theme: 'API Gateways & Protocolos de Comunicação',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'API Gateway com Backend-For-Frontend (BFF) e gRPC Protobuf sobre HTTP/2 vs REST',
    targetCards: ['SYS-RES-APIGW-000', 'SYS-RES-APIGW-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/grpc-protobuf-vs-rest-json-framing-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Serialização binária compacta em Protobuf sobre HTTP/2 eliminando overhead textual de JSON e headers repetitivos.'
    }
  },
  'fault-tolerance-resilience': {
    theme: 'Tolerância a Falhas & Resiliência',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Máquina de Estados do Circuit Breaker (Closed, Open, Half-Open) com Retries e Exponential Jitter',
    targetCards: ['SYS-RES-FAULTTOL-000', 'SYS-RES-FAULTTOL-001'],
    svgGenerator: SVG_GENERATORS.circuitBreaker,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/circuit-breaker-state-transitions-closed-open-half-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Circuit Breaker interrompendo requisições instantaneamente (Open) após limite de erros para evitar sobrecarga em cascata.'
    }
  },
  'load-balancing-proxies': {
    theme: 'Balanceamento de Carga & Proxies',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Load Balancers L4 vs L7 e Algoritmos de Balanceamento (Round Robin, Least Connections, IP Hash)',
    targetCards: ['SYS-RES-LOADBAL-000', 'SYS-RES-LOADBAL-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/load-balancer-l4-transport-vs-l7-application-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Load Balancer L4 operando por IP/Porta sem abrir payload vs L7 inspecionando cabeçalhos HTTP, cookies e rotas.'
    }
  },
  'rate-limiting-throttling': {
    theme: 'Rate Limiting & Throttling',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Token Bucket vs Leaky Bucket e Sliding Window Counter Distribuído no Redis com Lua',
    targetCards: ['SYS-RES-RATELIMIT-000', 'SYS-RES-RATELIMIT-001'],
    svgGenerator: SVG_GENERATORS.rateLimiterTokenBucket,
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/rate-limiting-token-bucket-vs-leaky-bucket-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Token Bucket permitindo rajadas até a capacidade máxima vs Leaky Bucket liberando vazão estritamente constante.'
    }
  },
  'service-mesh-discovery': {
    theme: 'Service Mesh & Segurança mTLS',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Istio Control Plane vs Envoy Sidecar e Autenticação Zero Trust mTLS',
    targetCards: ['SYS-RES-MESH-000', 'SYS-RES-MESH-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/zero-trust-mutual-tls-mtls-handshake-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Criptografia mTLS de ponta a ponta com certificados X.509 validados bilateralmente entre microsserviços.'
    }
  },

  // 11. Fundamentos de System Design & Entrevistas
  'back-of-the-envelope-estimations': {
    theme: 'Estimativas Back-of-the-Envelope',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Latências de Jeff Dean, Dimensionamento de QPS/Storage e Tabela de Noves de Disponibilidade',
    targetCards: ['SYS-FND-ESTIMATION-000', 'SYS-FND-ESTIMATION-001', 'SYS-FND-ESTIMATION-002'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/jeff-dean-latency-numbers-orders-of-magnitude-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Comparação visual de latências de hardware: L1 Cache (0.5ns), RAM (100ns), SSD (100µs), Network RTT (150ms).'
    }
  },
  'system-design-interview-framework': {
    theme: 'Framework de Entrevista de System Design',
    phase: '03-system-design-backend',
    tier: MEDIA_TIERS.DUAL,
    visualConcept: 'Framework de 4 Etapas e Condução de Deep Dives com Análise de Trade-offs',
    targetCards: ['SYS-FND-FRAMEWORK-000', 'SYS-FND-FRAMEWORK-001'],
    videoConfig: {
      url: 'https://assets.faang-anki.dev/media/system-design/system-design-interview-4-step-framework-loop.webm',
      durationSeconds: 8,
      fallbackText: 'Framework em 4 etapas: 1. Escopo e Requisitos, 2. Arquitetura em Alto Nível, 3. Deep Dive, 4. Gargalos e Escala.'
    }
  }
};

/**
 * Retrieves the media mapping metadata for a specific subtopic ID
 * @param {string} subtopicId
 * @returns {object|null}
 */
export function getMediaForSubtopic(subtopicId) {
  return PRIORITY_SUBTOPIC_MAPPINGS[subtopicId] || null;
}

/**
 * Retrieves media details for a card ID
 * @param {string} cardId
 * @returns {{ subtopicId: string, mapping: object }|null}
 */
export function getMediaForCard(cardId) {
  for (const [subtopicId, mapping] of Object.entries(PRIORITY_SUBTOPIC_MAPPINGS)) {
    if (mapping.targetCards && mapping.targetCards.includes(cardId)) {
      return {
        subtopicId,
        mapping
      };
    }
  }
  return null;
}

/**
 * Returns all registered priority subtopics
 * @returns {Array<string>}
 */
export function getAllPrioritySubtopics() {
  return Object.keys(PRIORITY_SUBTOPIC_MAPPINGS);
}
