import { svgWrapper } from '../sys-svg-base.js';

export const CACHING_STORAGE_SVGS = {
  // === caching-cdn/cache-invalidation-anomalies ===
  'SYS-CACHE-ANOMALIES-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Cache Stampede (Thundering Herd) &amp; Singleflight / Mutex Lock</text>
  <g transform="translate(40, 50)">
    <!-- Stampede Problem -->
    <rect x="0" y="0" width="280" height="150" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="24" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Sem Proteção: Cache Miss Simultâneo</text>
    <text x="140" y="55" fill="#fca5a5" font-size="11" text-anchor="middle">50.000 QPS → Chave Hot Expira</text>
    <path d="M 40 75 L 240 75" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4"/>
    <text x="140" y="105" fill="#fca5a5" font-size="11" text-anchor="middle">50.000 queries disparam ao DB</text>
    <text x="140" y="130" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">💥 Colapso por Sobrecarga de I/O</text>

    <!-- Singleflight Solution -->
    <rect x="320" y="0" width="280" height="150" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Com Singleflight / Mutex em Go</text>
    <text x="460" y="55" fill="#86efac" font-size="11" text-anchor="middle">1 Goroutine adquire o Lock e calcula</text>
    <rect x="350" y="75" width="220" height="28" rx="4" fill="#065f46"/>
    <text x="460" y="94" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">49.999 requisições aguardam na RAM</text>
    <text x="460" y="130" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">✅ Exatamente 1 query ao DB primário</text>
  </g>
  <text x="340" y="222" fill="#94a3b8" font-size="11" text-anchor="middle">XFetch Probabilístico: recálculo antecipado assíncrono antes do TTL expirar.</text>
`),

  'SYS-CACHE-ANOMALIES-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Anomalias de Cache: Penetration vs Breakdown vs Avalanche</text>
  <g transform="translate(30, 50)">
    <!-- Penetration -->
    <rect x="0" y="0" width="190" height="140" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="95" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Cache Penetration</text>
    <text x="95" y="50" fill="#cbd5e1" font-size="10" text-anchor="middle">Chave inexistente no DB</text>
    <text x="95" y="70" fill="#cbd5e1" font-size="10" text-anchor="middle">Bate direto no DB sempre</text>
    <rect x="15" y="95" width="160" height="30" rx="4" fill="#78350f"/>
    <text x="95" y="114" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Solução: Bloom Filter / Null</text>

    <!-- Breakdown -->
    <rect x="215" y="0" width="190" height="140" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="310" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Cache Breakdown</text>
    <text x="310" y="50" fill="#cbd5e1" font-size="10" text-anchor="middle">1 Hot Key expira sob alta carga</text>
    <text x="310" y="70" fill="#cbd5e1" font-size="10" text-anchor="middle">Múltiplos misses da mesma chave</text>
    <rect x="230" y="95" width="160" height="30" rx="4" fill="#7f1d1d"/>
    <text x="310" y="114" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Solução: Mutex / Soft TTL</text>

    <!-- Avalanche -->
    <rect x="430" y="0" width="190" height="140" rx="6" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="525" y="22" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">Cache Avalanche</text>
    <text x="525" y="50" fill="#cbd5e1" font-size="10" text-anchor="middle">Milhares de chaves expiram juntas</text>
    <text x="525" y="70" fill="#cbd5e1" font-size="10" text-anchor="middle">Ou queda global do nó Redis</text>
    <rect x="445" y="95" width="160" height="30" rx="4" fill="#4c1d95"/>
    <text x="525" y="114" fill="#e9d5ff" font-size="10" font-weight="bold" text-anchor="middle">Solução: TTL Jitter + Cluster</text>
  </g>
  <text x="340" y="212" fill="#94a3b8" font-size="10" text-anchor="middle">TTL Jitter: TTL_final = Base_TTL + rand(0, delta) para dispersar a expiração temporal.</text>
`),

  // === caching-cdn/caching-patterns ===
  'SYS-CACHE-PATTERNS-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Padrões de Caching: Cache-Aside vs Write-Through vs Write-Back</text>
  <g transform="translate(40, 50)">
    <!-- Cache-Aside -->
    <rect x="0" y="0" width="180" height="140" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="90" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Cache-Aside (Lazy)</text>
    <text x="90" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">App lê do Cache primeiro</text>
    <text x="90" y="68" fill="#f87171" font-size="10" text-anchor="middle">Miss: App busca DB e salva</text>
    <text x="90" y="92" fill="#cbd5e1" font-size="10" text-anchor="middle">Escrita: App invalida Cache</text>
    <text x="90" y="122" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Ideal para Read-Heavy</text>

    <!-- Write-Through -->
    <rect x="210" y="0" width="180" height="140" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Write-Through (Síncrono)</text>
    <text x="300" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">App grava na Cache</text>
    <text x="300" y="68" fill="#cbd5e1" font-size="10" text-anchor="middle">Cache grava no DB síncrono</text>
    <text x="300" y="92" fill="#cbd5e1" font-size="10" text-anchor="middle">Garante consistência forte</text>
    <text x="300" y="122" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Latência maior na escrita</text>

    <!-- Write-Back -->
    <rect x="420" y="0" width="180" height="140" rx="6" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="510" y="22" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">Write-Back / Behind</text>
    <text x="510" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">App grava na Cache (Ack)</text>
    <text x="510" y="68" fill="#cbd5e1" font-size="10" text-anchor="middle">Flush assíncrono para DB</text>
    <text x="510" y="92" fill="#34d399" font-size="10" text-anchor="middle">Altíssimo Throughput</text>
    <text x="510" y="122" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Risco de perda se Cache cair</text>
  </g>
  <text x="340" y="220" fill="#94a3b8" font-size="10" text-anchor="middle">Trade-off clássico: consistência imediata vs performance extrema de gravação.</text>
`),

  'SYS-CACHE-PATTERNS-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Políticas de Evicção: LRU vs LFU vs ARC vs W-TinyLFU</text>
  <g transform="translate(40, 50)">
    <!-- LRU -->
    <rect x="0" y="0" width="280" height="65" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">LRU (Least Recently Used)</text>
    <text x="140" y="42" fill="#cbd5e1" font-size="10" text-anchor="middle">Doubly-Linked List + Hash Map O(1). Vulnerável a Scan Pollution.</text>
    <text x="140" y="56" fill="#94a3b8" font-size="9" text-anchor="middle">Evita elementos acessados há mais tempo.</text>

    <!-- LFU -->
    <rect x="320" y="0" width="280" height="65" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="460" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">LFU (Least Frequently Used)</text>
    <text x="460" y="42" fill="#cbd5e1" font-size="10" text-anchor="middle">Contadores de frequência. Risco de 'Frequency Starvation' de novos dados.</text>
    <text x="460" y="56" fill="#94a3b8" font-size="9" text-anchor="middle">Itens antigos acumulam contagens altas e não saem.</text>

    <!-- W-TinyLFU (Caffeine / Modern Caches) -->
    <rect x="0" y="80" width="600" height="60" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="102" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">W-TinyLFU: Window Cache (Recência) + Count-Min Sketch (Frequência Compacta)</text>
    <text x="300" y="122" fill="#cbd5e1" font-size="10" text-anchor="middle">Combina o melhor de LRU (absorve rajadas) com LFU de 4 bits por item via Bloom-like hashing com decay periódico.</text>
  </g>
  <text x="340" y="210" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">W-TinyLFU atinge taxas de hit próximas de 99% em benchmarks de servidores de alta escala.</text>
`),

  // === caching-cdn/cdn-edge-caching ===
  'SYS-CACHE-CDN-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">CDN Edge Caching &amp; Roteamento Anycast BGP</text>
  <g transform="translate(40, 50)">
    <!-- Client SP -->
    <circle cx="50" cy="50" r="28" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="50" y="54" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Cliente SP</text>

    <!-- PoP SP -->
    <rect x="170" y="20" width="130" height="60" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="235" y="44" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">Edge PoP (SP)</text>
    <text x="235" y="62" fill="#a7f3d0" font-size="9" text-anchor="middle">RTT: ~3 ms (Hit)</text>

    <!-- Client NY -->
    <circle cx="50" cy="120" r="28" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="50" y="124" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Cliente NY</text>

    <!-- PoP NY -->
    <rect x="170" y="90" width="130" height="60" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="235" y="114" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">Edge PoP (NY)</text>
    <text x="235" y="132" fill="#a7f3d0" font-size="9" text-anchor="middle">RTT: ~2 ms (Hit)</text>

    <!-- Origin DC -->
    <rect x="420" y="45" width="160" height="80" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="500" y="75" fill="#fde68a" font-size="12" font-weight="bold" text-anchor="middle">Origin Data Center</text>
    <text x="500" y="95" fill="#fef3c7" font-size="9" text-anchor="middle">(BGP Anycast IP único)</text>
    <text x="500" y="112" fill="#cbd5e1" font-size="9" text-anchor="middle">Acessado apenas em Miss</text>

    <!-- Lines -->
    <line x1="80" y1="50" x2="170" y2="50" stroke="#38bdf8" stroke-width="2"/>
    <line x1="80" y1="120" x2="170" y2="120" stroke="#38bdf8" stroke-width="2"/>
    <line x1="300" y1="50" x2="420" y2="70" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4"/>
    <line x1="300" y1="120" x2="420" y2="100" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4"/>
  </g>
  <text x="340" y="212" fill="#94a3b8" font-size="10" text-anchor="middle">BGP Anycast anuncia o mesmo IP globalmente; roteadores da Internet direcionam para o PoP topologicamente mais próximo.</text>
`),

  'SYS-CACHE-CDN-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Diretivas HTTP Cache-Control &amp; stale-while-revalidate</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="25" fill="#38bdf8" font-size="11" font-family="monospace" text-anchor="middle">Cache-Control: max-age=600, s-maxage=3600, stale-while-revalidate=60</text>

    <g transform="translate(0, 55)">
      <rect x="0" y="0" width="190" height="70" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
      <text x="95" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">0 a 600s: Fresh</text>
      <text x="95" y="44" fill="#cbd5e1" font-size="10" text-anchor="middle">Servido direto do browser/CDN</text>
      <text x="95" y="58" fill="#86efac" font-size="9" text-anchor="middle">Zero requisições à origem</text>

      <rect x="205" y="0" width="190" height="70" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
      <text x="300" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">601 a 660s: Stale Window</text>
      <text x="300" y="44" fill="#cbd5e1" font-size="10" text-anchor="middle">Retorna dado antigo instantâneo</text>
      <text x="300" y="58" fill="#fde68a" font-size="9" text-anchor="middle">+ Dispara revalidação em background</text>

      <rect x="410" y="0" width="190" height="70" rx="6" fill="#0f172a" stroke="#f43f5e" stroke-width="1"/>
      <text x="505" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">&gt; 660s: Expired</text>
      <text x="505" y="44" fill="#cbd5e1" font-size="10" text-anchor="middle">Bloqueia e aguarda resposta</text>
      <text x="505" y="58" fill="#fca5a5" font-size="9" text-anchor="middle">Validação síncrona com ETag (304)</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">stale-while-revalidate elimina latência percebida pelo usuário final durante atualizações de cache.</text>
`),

  // === caching-cdn/redis-internals ===
  'SYS-CACHE-REDIS-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Event Loop Single-Threaded do Redis &amp; I/O Multiplexing (epoll)</text>
  <g transform="translate(40, 50)">
    <!-- Socket Connections -->
    <rect x="0" y="0" width="150" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="75" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">10.000+ Conexões TCP</text>
    <text x="75" y="50" fill="#cbd5e1" font-size="10" text-anchor="middle">Socket Client 1 (read)</text>
    <text x="75" y="70" fill="#cbd5e1" font-size="10" text-anchor="middle">Socket Client 2 (write)</text>
    <text x="75" y="90" fill="#cbd5e1" font-size="10" text-anchor="middle">Socket Client N (idle)</text>

    <!-- Epoll Multiplexer -->
    <rect x="180" y="25" width="130" height="70" rx="6" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="245" y="52" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">I/O Multiplexer</text>
    <text x="245" y="72" fill="#e0f2fe" font-size="9" text-anchor="middle">epoll / kqueue (O(1))</text>

    <!-- Single Thread Event Loop -->
    <rect x="340" y="0" width="260" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="470" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Single-Threaded Execution Engine</text>
    <text x="470" y="50" fill="#86efac" font-size="10" text-anchor="middle">1. Pega evento pronto da fila</text>
    <text x="470" y="70" fill="#86efac" font-size="10" text-anchor="middle">2. Executa comando em RAM pura (O(1))</text>
    <text x="470" y="90" fill="#86efac" font-size="10" text-anchor="middle">3. Zero Locks, Zero Context Switch, Zero Race</text>
  </g>
  <text x="340" y="210" fill="#94a3b8" font-size="11" text-anchor="middle">Gargalo do Redis é largura de banda de rede e memória RAM, nunca contenção de threads de CPU.</text>
`),

  'SYS-CACHE-REDIS-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">SkipList Probabilística do Redis ZSet: Busca O(log N) em Memória</text>
  <g transform="translate(40, 50)">
    <!-- Level 3 -->
    <text x="30" y="25" fill="#f59e0b" font-size="10" font-weight="bold">L3</text>
    <circle cx="80" cy="20" r="12" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="80" y="24" fill="#ffffff" font-size="9" text-anchor="middle">HEAD</text>
    <line x1="95" y1="20" x2="485" y2="20" stroke="#f59e0b" stroke-width="2"/>
    <circle cx="500" cy="20" r="12" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="500" y="24" fill="#ffffff" font-size="9" text-anchor="middle">90</text>

    <!-- Level 2 -->
    <text x="30" y="60" fill="#38bdf8" font-size="10" font-weight="bold">L2</text>
    <circle cx="80" cy="55" r="12" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <line x1="95" y1="55" x2="285" y2="55" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="300" cy="55" r="12" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="59" fill="#ffffff" font-size="9" text-anchor="middle">45</text>
    <line x1="315" y1="55" x2="485" y2="55" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="500" cy="55" r="12" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="500" y="59" fill="#ffffff" font-size="9" text-anchor="middle">90</text>

    <!-- Level 1 (All nodes) -->
    <text x="30" y="95" fill="#10b981" font-size="10" font-weight="bold">L1</text>
    <circle cx="80" cy="90" r="12" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <line x1="95" y1="90" x2="185" y2="90" stroke="#10b981" stroke-width="1.5"/>
    <circle cx="200" cy="90" r="12" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="200" y="94" fill="#ffffff" font-size="9" text-anchor="middle">20</text>
    <line x1="215" y1="90" x2="285" y2="90" stroke="#10b981" stroke-width="1.5"/>
    <circle cx="300" cy="90" r="12" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="94" fill="#ffffff" font-size="9" text-anchor="middle">45</text>
    <line x1="315" y1="90" x2="385" y2="90" stroke="#10b981" stroke-width="1.5"/>
    <circle cx="400" cy="90" r="12" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="400" y="94" fill="#ffffff" font-size="9" text-anchor="middle">70</text>
    <line x1="415" y1="90" x2="485" y2="90" stroke="#10b981" stroke-width="1.5"/>
    <circle cx="500" cy="90" r="12" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="500" y="94" fill="#ffffff" font-size="9" text-anchor="middle">90</text>
  </g>
  <text x="340" y="200" fill="#94a3b8" font-size="11" text-anchor="middle">ZSet combina Hash Map (lookup O(1) por membro) com SkipList (consultas de range por score O(log N + M)).</text>
`),

  // === databases-storage/acid-isolation-levels ===
  'SYS-DB-ACID-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Níveis de Isolamento ANSI SQL vs Anomalias de Concorrência</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="140" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <!-- Table Header -->
    <rect x="0" y="0" width="600" height="30" rx="6" fill="#0284c7"/>
    <text x="100" y="20" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Nível de Isolamento</text>
    <text x="260" y="20" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Dirty Read</text>
    <text x="400" y="20" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Non-Repeatable Read</text>
    <text x="530" y="20" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Phantom Read</text>

    <!-- Rows -->
    <text x="100" y="55" fill="#f87171" font-size="10" text-anchor="middle">Read Uncommitted</text>
    <text x="260" y="55" fill="#f87171" font-size="10" text-anchor="middle">Permite ❌</text>
    <text x="400" y="55" fill="#f87171" font-size="10" text-anchor="middle">Permite ❌</text>
    <text x="530" y="55" fill="#f87171" font-size="10" text-anchor="middle">Permite ❌</text>

    <text x="100" y="82" fill="#fbbf24" font-size="10" text-anchor="middle">Read Committed</text>
    <text x="260" y="82" fill="#34d399" font-size="10" text-anchor="middle">Bloqueia ✅</text>
    <text x="400" y="82" fill="#f87171" font-size="10" text-anchor="middle">Permite ❌</text>
    <text x="530" y="82" fill="#f87171" font-size="10" text-anchor="middle">Permite ❌</text>

    <text x="100" y="108" fill="#38bdf8" font-size="10" text-anchor="middle">Repeatable Read</text>
    <text x="260" y="108" fill="#34d399" font-size="10" text-anchor="middle">Bloqueia ✅</text>
    <text x="400" y="108" fill="#34d399" font-size="10" text-anchor="middle">Bloqueia ✅</text>
    <text x="530" y="108" fill="#fbbf24" font-size="10" text-anchor="middle">Possível ⚠️</text>

    <text x="100" y="132" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Serializable</text>
    <text x="260" y="132" fill="#34d399" font-size="10" text-anchor="middle">Bloqueia ✅</text>
    <text x="400" y="132" fill="#34d399" font-size="10" text-anchor="middle">Bloqueia ✅</text>
    <text x="530" y="132" fill="#34d399" font-size="10" text-anchor="middle">Bloqueia ✅</text>
  </g>
  <text x="340" y="218" fill="#94a3b8" font-size="10" text-anchor="middle">PostgreSQL e MySQL InnoDB utilizam MVCC para prevenir Phantom Reads em Repeatable Read sem locks em tabela.</text>
`),

  'SYS-DB-ACID-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">MVCC (Multi-Version Concurrency Control) &amp; Snapshot Isolation</text>
  <g transform="translate(40, 50)">
    <!-- Tuple Versions in PostgreSQL -->
    <rect x="0" y="0" width="600" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Estrutura de Tuplas no Disco: xmin (Tx Criadora) e xmax (Tx Deletora)</text>

    <!-- Version 1 -->
    <rect x="20" y="40" width="170" height="65" rx="4" fill="#0f172a" stroke="#64748b" stroke-width="1"/>
    <text x="105" y="58" fill="#94a3b8" font-size="10" font-weight="bold" text-anchor="middle">Versão 1 (Saldo: $100)</text>
    <text x="105" y="78" fill="#cbd5e1" font-size="9" text-anchor="middle">xmin: 100 | xmax: 105 (Morto)</text>
    <text x="105" y="94" fill="#f87171" font-size="9" text-anchor="middle">Visível para Tx &lt; 105</text>

    <!-- Version 2 -->
    <rect x="215" y="40" width="170" height="65" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="58" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Versão 2 (Saldo: $150)</text>
    <text x="300" y="78" fill="#cbd5e1" font-size="9" text-anchor="middle">xmin: 105 | xmax: 120 (Morto)</text>
    <text x="300" y="94" fill="#fbbf24" font-size="9" text-anchor="middle">Visível para 105 &lt;= Tx &lt; 120</text>

    <!-- Version 3 (Active) -->
    <rect x="410" y="40" width="170" height="65" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="495" y="58" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Versão 3 (Saldo: $220)</text>
    <text x="495" y="78" fill="#cbd5e1" font-size="9" text-anchor="middle">xmin: 120 | xmax: 0 (Ativo)</text>
    <text x="495" y="94" fill="#86efac" font-size="9" text-anchor="middle">Visível para Tx &gt;= 120</text>
  </g>
  <text x="340" y="205" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Regra de Ouro do MVCC: Leituras nunca bloqueiam Escritas; Escritas nunca bloqueiam Leituras.</text>
`),

  'SYS-DB-ACID-002': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Write Skew: Anomalia sob Snapshot Isolation &amp; SSI (Serializable Snapshot)</text>
  <g transform="translate(40, 50)">
    <!-- Scenario -->
    <rect x="0" y="0" width="600" height="120" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="300" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Regra de Integridade: Ao menos 1 médico deve estar de plantão (on_call = true)</text>

    <!-- Tx 1 -->
    <rect x="20" y="40" width="260" height="65" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
    <text x="150" y="58" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Transação A (Dr. Alice)</text>
    <text x="150" y="76" fill="#cbd5e1" font-size="9" text-anchor="middle">Lê: 2 médicos de plantão (Alice, Bob)</text>
    <text x="150" y="92" fill="#f87171" font-size="9" text-anchor="middle">Alice sai de plantão (on_call = false)</text>

    <!-- Tx 2 -->
    <rect x="320" y="40" width="260" height="65" rx="4" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
    <text x="450" y="58" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Transação B Concorrente (Dr. Bob)</text>
    <text x="450" y="76" fill="#cbd5e1" font-size="9" text-anchor="middle">Lê: 2 médicos de plantão no Snapshot</text>
    <text x="450" y="92" fill="#f87171" font-size="9" text-anchor="middle">Bob sai de plantão (on_call = false)</text>
  </g>
  <text x="340" y="200" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">Resultado: 0 médicos de plantão! Solução: SELECT FOR UPDATE ou SSI com detecção de conflito siREAD.</text>
`),

  // === databases-storage/nosql-data-modeling ===
  'SYS-DB-NOSQL-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">DynamoDB Single-Table Design: Partition Key (PK) &amp; Sort Key (SK)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="125" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <!-- Header -->
    <rect x="0" y="0" width="600" height="28" rx="6" fill="#0284c7"/>
    <text x="80" y="19" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">PK (Hash)</text>
    <text x="220" y="19" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">SK (Range / Sort)</text>
    <text x="360" y="19" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Data / Attributes</text>
    <text x="510" y="19" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">GSI1-PK / GSI1-SK</text>

    <!-- Rows -->
    <text x="80" y="48" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">USER#101</text>
    <text x="220" y="48" fill="#fbbf24" font-size="9" font-family="monospace" text-anchor="middle">METADATA</text>
    <text x="360" y="48" fill="#cbd5e1" font-size="9" text-anchor="middle">Name: "Carlos", email: "..."</text>
    <text x="510" y="48" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">STATUS#ACTIVE</text>

    <text x="80" y="73" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">USER#101</text>
    <text x="220" y="73" fill="#fbbf24" font-size="9" font-family="monospace" text-anchor="middle">ORDER#2026-08#991</text>
    <text x="360" y="73" fill="#cbd5e1" font-size="9" text-anchor="middle">Total: $450.00, Status: PAID</text>
    <text x="510" y="73" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">DATE#2026-08-28</text>

    <text x="80" y="98" fill="#38bdf8" font-size="9" font-family="monospace" text-anchor="middle">USER#101</text>
    <text x="220" y="98" fill="#fbbf24" font-size="9" font-family="monospace" text-anchor="middle">ORDER#2026-08#992</text>
    <text x="360" y="98" fill="#cbd5e1" font-size="9" text-anchor="middle">Total: $89.00, Status: SHIPPED</text>
    <text x="510" y="98" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">DATE#2026-08-28</text>
  </g>
  <text x="340" y="208" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Uma única Query(PK=USER#101, SK begins_with ORDER#) retorna usuário e histórico em 1 RTT O(1).</text>
`),

  'SYS-DB-NOSQL-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Cassandra Wide-Column &amp; Tombstone Storms em Leituras</text>
  <g transform="translate(40, 50)">
    <!-- MemTable / SSTables with Tombstones -->
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Deleção no Cassandra = Tombstone</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Deleções gravam marcador imutável</text>
    <text x="140" y="65" fill="#fca5a5" font-size="10" text-anchor="middle">com timestamp de expiração (gc_grace)</text>
    <text x="140" y="90" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Milhares de tombstones acumulam</text>

    <!-- Reading overhead -->
    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="460" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Degradação em Consultas Range</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Scan lê até 100.000 células mortas</text>
    <text x="460" y="65" fill="#fde68a" font-size="10" text-anchor="middle">Gera GC Pauses e Read Timeouts</text>
    <text x="460" y="90" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Solução: Compaction Leveled &amp; TTL</text>
  </g>
  <text x="340" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">Major Compaction mescla SSTables e purga tombstones após expiração do gc_grace_seconds (padrão 10 dias).</text>
`),

  // === databases-storage/scaling-replication-cdc ===
  'SYS-DB-SCALING-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Replicação de Banco de Dados: Replication Lag em Leader-Follower</text>
  <g transform="translate(40, 50)">
    <!-- Leader -->
    <rect x="0" y="20" width="160" height="90" rx="6" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="80" y="45" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Leader (Primary)</text>
    <text x="80" y="68" fill="#e0f2fe" font-size="10" text-anchor="middle">Write t=0: balance=$200</text>
    <text x="80" y="88" fill="#86efac" font-size="9" text-anchor="middle">WAL gravado imediatamente</text>

    <!-- Async Replication Stream -->
    <path d="M 160 65 L 340 65" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
    <text x="250" y="55" fill="#fbbf24" font-size="9" font-weight="bold" text-anchor="middle">Binlog / WAL Stream (Async)</text>
    <text x="250" y="80" fill="#f87171" font-size="9" text-anchor="middle">Lag: ~250 ms</text>

    <!-- Follower Replica -->
    <rect x="340" y="20" width="160" height="90" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="420" y="45" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Follower Replica</text>
    <text x="420" y="68" fill="#fca5a5" font-size="10" text-anchor="middle">Read t=50ms: balance=$100</text>
    <text x="420" y="88" fill="#f87171" font-size="9" text-anchor="middle">⚠️ Inconsistência de Leitura</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Solução Read-Your-Own-Writes: Roteia leituras do próprio usuário que alterou para o Leader por 5 segundos.</text>
`),

  'SYS-DB-SCALING-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Change Data Capture (CDC) com Debezium &amp; Kafka</text>
  <g transform="translate(30, 50)">
    <!-- PostgreSQL / MySQL -->
    <rect x="0" y="10" width="140" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="70" y="36" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Postgres / MySQL</text>
    <rect x="20" y="52" width="100" height="32" rx="4" fill="#0369a1"/>
    <text x="70" y="72" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">WAL / Binlog</text>

    <!-- Debezium CDC Connector -->
    <rect x="180" y="20" width="120" height="70" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="240" y="48" fill="#fde68a" font-size="11" font-weight="bold" text-anchor="middle">Debezium</text>
    <text x="240" y="68" fill="#cbd5e1" font-size="9" text-anchor="middle">Tailer do WAL</text>

    <!-- Apache Kafka -->
    <rect x="340" y="10" width="120" height="90" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="400" y="42" fill="#86efac" font-size="12" font-weight="bold" text-anchor="middle">Kafka Topic</text>
    <text x="400" y="65" fill="#a7f3d0" font-size="9" text-anchor="middle">orders.events</text>
    <text x="400" y="82" fill="#cbd5e1" font-size="9" text-anchor="middle">Imutável O(1)</text>

    <!-- Downstream Consumers -->
    <rect x="495" y="0" width="135" height="48" rx="4" fill="#1e293b" stroke="#8b5cf6" stroke-width="1"/>
    <text x="562" y="28" fill="#c084fc" font-size="9" font-weight="bold" text-anchor="middle">Elasticsearch (Busca)</text>

    <rect x="495" y="60" width="135" height="48" rx="4" fill="#1e293b" stroke="#f43f5e" stroke-width="1"/>
    <text x="562" y="88" fill="#fca5a5" font-size="9" font-weight="bold" text-anchor="middle">Redis (Cache Inval)</text>

    <!-- Arrows -->
    <line x1="140" y1="55" x2="180" y2="55" stroke="#38bdf8" stroke-width="2"/>
    <line x1="300" y1="55" x2="340" y2="55" stroke="#f59e0b" stroke-width="2"/>
    <line x1="460" y1="40" x2="495" y2="25" stroke="#10b981" stroke-width="1.5"/>
    <line x1="460" y1="70" x2="495" y2="85" stroke="#10b981" stroke-width="1.5"/>
  </g>
  <text x="340" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">CDC desacopla a gravação de banco primário da sincronização de caches e mecanismos de busca em tempo real.</text>
`),

  // === databases-storage/sql-indexing-optimization ===
  'SYS-DB-SQLOPT-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Índice Clustered (PK) vs Índice Secundário (Non-Clustered)</text>
  <g transform="translate(40, 50)">
    <!-- Clustered Index -->
    <rect x="0" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Índice Clustered (B+Tree)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Nós folhas = Linhas de dados completas</text>
    <text x="140" y="65" fill="#86efac" font-size="10" text-anchor="middle">Apenas 1 por tabela (organiza o disco)</text>
    <text x="140" y="90" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Busca por PK: 1 travessia na árvore</text>

    <!-- Secondary Index -->
    <rect x="320" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Índice Secundário (ex: email)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Nós folhas contêm: (email, PK_id)</text>
    <text x="460" y="65" fill="#f87171" font-size="10" text-anchor="middle">Exige 'Table Lookup' / 'Bookmark Lookup'</text>
    <text x="460" y="90" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">2 travessias: Secundário → Clustered</text>
  </g>
  <text x="340" y="200" fill="#94a3b8" font-size="10" text-anchor="middle">No InnoDB, a chave primária curta (ex: BIGINT) reduz o tamanho de todos os índices secundários da tabela.</text>
`),

  'SYS-DB-SQLOPT-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Regra do Prefixo Mais à Esquerda (Leftmost Prefix Rule) em Índices Compostos</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="35" rx="6" fill="#0284c7"/>
    <text x="300" y="22" fill="#ffffff" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle">CREATE INDEX idx_user ON users(company_id, department_id, created_at);</text>

    <g transform="translate(0, 48)">
      <rect x="0" y="0" width="190" height="65" rx="6" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="95" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">WHERE company_id = 1</text>
      <text x="95" y="45" fill="#86efac" font-size="9" text-anchor="middle">✅ Utiliza Índice (Prefixo A)</text>

      <rect x="205" y="0" width="190" height="65" rx="6" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="300" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">WHERE company &amp; dept</text>
      <text x="300" y="45" fill="#86efac" font-size="9" text-anchor="middle">✅ Utiliza Índice (Prefixo A, B)</text>

      <rect x="410" y="0" width="190" height="65" rx="6" fill="#7f1d1d" stroke="#f43f5e" stroke-width="1"/>
      <text x="505" y="22" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">WHERE department_id = 2</text>
      <text x="505" y="45" fill="#fca5a5" font-size="9" text-anchor="middle">❌ Full Table Scan (Ignora Índice)</text>
    </g>
  </g>
  <text x="340" y="195" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">A B+Tree é ordenada lexicograficamente: colunas sem o prefixo inicial quebram a navegação na árvore.</text>
`),

  'SYS-DB-SQLOPT-002': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Covering Index: Zero Acesso à Tabela Física (Index-Only Scan)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Sem Covering Index</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">SELECT name, email WHERE age &gt; 25</text>
    <text x="140" y="65" fill="#fca5a5" font-size="9" text-anchor="middle">Index Scan em age → Busca PK</text>
    <text x="140" y="85" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Random I/O para ler páginas de disco</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Com Covering Index (INCLUDE)</text>
    <text x="460" y="45" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">CREATE INDEX idx ON (age) INCLUDE (name, email)</text>
    <text x="460" y="65" fill="#a7f3d0" font-size="9" text-anchor="middle">Folha do índice já contém name e email</text>
    <text x="460" y="90" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">⚡ Zero Random I/O (10x mais rápido)</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Index-Only Scan atende 100% da consulta direto da memória RAM do buffer pool.</text>
`),

  // === databases-storage/storage-engines ===
  'SYS-DB-ENGINE-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estrutura B+Tree em Storage Engines Relacionais (InnoDB / Postgres)</text>
  <g transform="translate(40, 50)">
    <!-- Root Node -->
    <rect x="230" y="0" width="140" height="30" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="20" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Root: [ 20 | 50 ]</text>

    <!-- Intermediate Nodes -->
    <rect x="90" y="45" width="130" height="28" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1"/>
    <text x="155" y="63" fill="#ffffff" font-size="10" text-anchor="middle">[ 5 | 12 ]</text>

    <rect x="380" y="45" width="130" height="28" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1"/>
    <text x="445" y="63" fill="#ffffff" font-size="10" text-anchor="middle">[ 60 | 80 ]</text>

    <!-- Leaf Nodes (Doubly Linked) -->
    <g transform="translate(0, 90)">
      <rect x="0" y="0" width="130" height="35" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
      <text x="65" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Folha [1..19]</text>

      <rect x="155" y="0" width="130" height="35" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
      <text x="220" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Folha [20..49]</text>

      <rect x="310" y="0" width="130" height="35" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
      <text x="375" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Folha [50..79]</text>

      <rect x="465" y="0" width="135" height="35" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
      <text x="532" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Folha [80..99]</text>

      <!-- Linked list arrows -->
      <line x1="130" y1="18" x2="155" y2="18" stroke="#10b981" stroke-width="2"/>
      <line x1="285" y1="18" x2="310" y2="18" stroke="#10b981" stroke-width="2"/>
      <line x1="440" y1="18" x2="465" y2="18" stroke="#10b981" stroke-width="2"/>
    </g>
  </g>
  <text x="340" y="200" fill="#94a3b8" font-size="10" text-anchor="middle">Folhas duplamente encadeadas permitem Range Scans sequenciais contíguos em disco sem subir na árvore.</text>
`),

  'SYS-DB-ENGINE-001': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">LSM-Tree (Log-Structured Merge-Tree): RocksDB, Cassandra, Kafka</text>
  <g transform="translate(40, 50)">
    <!-- Write Path (RAM) -->
    <rect x="0" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Memória RAM (Escrita Rápida)</text>
    <rect x="20" y="35" width="240" height="35" rx="4" fill="#0284c7"/>
    <text x="140" y="57" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">MemTable (SkipList / Red-Black Tree)</text>
    <rect x="20" y="80" width="240" height="35" rx="4" fill="#78350f"/>
    <text x="140" y="102" fill="#fde68a" font-size="10" font-family="monospace" text-anchor="middle">WAL (Append-Only Disk Log)</text>

    <!-- Flush & Disk SSTables -->
    <rect x="320" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Disco Imutável (SSTables)</text>
    <rect x="340" y="35" width="240" height="26" rx="4" fill="#065f46"/>
    <text x="460" y="52" fill="#86efac" font-size="9" text-anchor="middle">L0: SSTables não compactadas</text>
    <rect x="340" y="68" width="240" height="26" rx="4" fill="#047857"/>
    <text x="460" y="85" fill="#a7f3d0" font-size="9" text-anchor="middle">L1: SSTables ordenadas e sem overlap</text>
    <rect x="340" y="100" width="240" height="26" rx="4" fill="#065f46"/>
    <text x="460" y="117" fill="#a7f3d0" font-size="9" text-anchor="middle">Compaction em Background (Purge)</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Gravações sequenciais no WAL/MemTable conferem à LSM-Tree taxa de escrita ordens de grandeza superior à B+Tree.</text>
`),

  'SYS-DB-ENGINE-002': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Armazenamento Colunar (Parquet / ClickHouse) vs Linha (Row-Oriented OLTP)</text>
  <g transform="translate(40, 50)">
    <!-- Row-Oriented -->
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Row-Oriented (OLTP: MySQL, Postgres)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">Disco: [ID, Name, Age, Salary] [ID, Name...]</text>
    <text x="140" y="68" fill="#fca5a5" font-size="10" text-anchor="middle">Ótimo para INSERT/UPDATE de registros inteiros</text>
    <text x="140" y="90" fill="#f87171" font-size="10" text-anchor="middle">Péssimo para agregação: lê colunas inúteis</text>

    <!-- Columnar -->
    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Columnar (OLAP: ClickHouse, Parquet, Snowflake)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">Disco: [Age, Age, Age...] [Salary, Salary...]</text>
    <text x="460" y="68" fill="#86efac" font-size="10" text-anchor="middle">Lê apenas a coluna do SELECT AVG(salary)</text>
    <text x="460" y="90" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Alta taxa de compressão (Snappy/ZSTD)</text>
  </g>
  <text x="340" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">Compressão homogênea por coluna + SIMD vectorization aceleram agregações analíticas em centenas de vezes.</text>
`),

  // === databases-storage/vector-databases-search ===
  'SYS-DB-VECTOR-000': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Índice Invertido &amp; BM25 Scoring (Elasticsearch / Lucene)</text>
  <g transform="translate(40, 50)">
    <!-- Term Dictionary -->
    <rect x="0" y="0" width="200" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="100" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Term Dictionary (FST)</text>
    <text x="100" y="45" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">"distributed" →</text>
    <text x="100" y="68" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">"consensus"   →</text>
    <text x="100" y="90" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">"raft"        →</text>

    <!-- Postings Lists -->
    <rect x="230" y="0" width="370" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="415" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Postings Lists (DocID + Term Freq + Positions)</text>
    <text x="415" y="45" fill="#86efac" font-size="10" font-family="monospace" text-anchor="middle">[Doc 1 (tf:3), Doc 4 (tf:1), Doc 9 (tf:2)]</text>
    <text x="415" y="68" fill="#86efac" font-size="10" font-family="monospace" text-anchor="middle">[Doc 1 (tf:1), Doc 9 (tf:4)]</text>
    <text x="415" y="90" fill="#86efac" font-size="10" font-family="monospace" text-anchor="middle">[Doc 9 (tf:5)]</text>
  </g>
  <text x="340" y="195" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Interseção booleana via Roaring Bitmaps e ranking BM25 ponderado por TF-IDF em sub-milissegundos.</text>
`),

  'SYS-DB-VECTOR-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bancos de Dados Vetoriais &amp; Grafo HNSW (Hierarchical Navigable Small World)</text>
  <g transform="translate(40, 50)">
    <!-- Layer 2 (Express) -->
    <rect x="0" y="0" width="600" height="35" rx="4" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1"/>
    <text x="50" y="22" fill="#38bdf8" font-size="10" font-weight="bold">Layer 2</text>
    <text x="300" y="22" fill="#ffffff" font-size="10" text-anchor="middle">Saltos Longos (Conexões Esparsas Globais) → Início da Busca ANN</text>

    <!-- Layer 1 (Medium) -->
    <rect x="0" y="45" width="600" height="35" rx="4" fill="#075985" stroke="#38bdf8" stroke-width="1"/>
    <text x="50" y="67" fill="#38bdf8" font-size="10" font-weight="bold">Layer 1</text>
    <text x="300" y="67" fill="#ffffff" font-size="10" text-anchor="middle">Conexões Intermediárias (Aproximação do Cluster Semântico)</text>

    <!-- Layer 0 (Dense) -->
    <rect x="0" y="90" width="600" height="35" rx="4" fill="#0369a1" stroke="#10b981" stroke-width="1.5"/>
    <text x="50" y="112" fill="#86efac" font-size="10" font-weight="bold">Layer 0</text>
    <text x="300" y="112" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Grafo Denso com Todos os Vetores (Busca K-NN Exata por Similaridade de Cosseno)</text>
  </g>
  <text x="340" y="205" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">HNSW atinge complexidade O(log N) para busca de vizinhos mais próximos em embeddings de 1536 dimensões.</text>
`)
};
