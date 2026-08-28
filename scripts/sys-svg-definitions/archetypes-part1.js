import { svgWrapper } from '../sys-svg-base.js';

export const ARCHETYPES_PART1_SVGS = {
  // === faang-system-design-archetypes/case-distributed-file-storage ===
  'SYS-ARCH-FILESTORE-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Google Drive / Dropbox: Chunking de 4MB &amp; Sincronização Delta</text>
  <g transform="translate(40, 50)">
    <!-- File -->
    <rect x="0" y="20" width="130" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="65" y="45" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Arquivo (16MB)</text>
    <text x="65" y="70" fill="#cbd5e1" font-size="9" text-anchor="middle">4 Chunks de 4MB</text>

    <!-- Chunks with SHA-256 -->
    <g transform="translate(160, 0)">
      <rect x="0" y="0" width="180" height="28" rx="4" fill="#0284c7"/>
      <text x="90" y="18" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">Chunk 1: SHA-256(a1...)</text>

      <rect x="0" y="32" width="180" height="28" rx="4" fill="#0284c7"/>
      <text x="90" y="50" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">Chunk 2: SHA-256(b2...)</text>

      <rect x="0" y="64" width="180" height="28" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
      <text x="90" y="82" fill="#86efac" font-size="9" font-family="monospace" font-weight="bold" text-anchor="middle">Chunk 3: MODIFICADO (c3*)</text>

      <rect x="0" y="96" width="180" height="28" rx="4" fill="#0284c7"/>
      <text x="90" y="114" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">Chunk 4: SHA-256(d4...)</text>
    </g>

    <!-- Cloud Sync -->
    <rect x="380" y="20" width="220" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="490" y="45" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Sincronização Delta</text>
    <text x="490" y="68" fill="#86efac" font-size="10" text-anchor="middle">Upload APENAS do Chunk 3 (4MB)</text>
    <text x="490" y="88" fill="#a7f3d0" font-size="9" text-anchor="middle">Economia de 75% de banda e tempo</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Algoritmo Rsync / FastCDC calcula blocos variáveis identificando alterações mesmo com inserções no meio do arquivo.</text>
`),

  'SYS-ARCH-FILESTORE-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Content-Addressable Storage (CAS) &amp; Deduplicação Global de Blocos</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">S3 Object Storage armazena blocos indexados pelo Hash SHA-256</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="260" height="55" rx="4" fill="#0369a1"/>
      <text x="130" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">10.000 Usuários com Ubuntu ISO</text>
      <text x="130" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Metadados: 10.000 ponteiros para o mesmo hash</text>

      <rect x="300" y="0" width="260" height="55" rx="4" fill="#065f46"/>
      <text x="430" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">S3 Armazena Apenas 1 Cópia Física</text>
      <text x="430" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">Economia massiva de Petabytes de Storage</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Resolução de conflito: se dois clientes salvam versões conflitantes simultaneamente, cria-se 'Arquivo (Cópia em Conflito)'.</text>
`),

  // === faang-system-design-archetypes/case-distributed-task-scheduler ===
  'SYS-ARCH-SCHEDULER-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Agendador Distribuído: Delay Queue com Redis Sorted Set (ZSet)</text>
  <g transform="translate(40, 50)">
    <!-- Task Insertion -->
    <rect x="0" y="20" width="160" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="80" y="45" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Nova Tarefa</text>
    <text x="80" y="68" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">ZADD tasks_delayed</text>
    <text x="80" y="88" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">score = execution_epoch</text>

    <!-- Redis ZSet -->
    <rect x="200" y="0" width="200" height="120" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="300" y="24" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Redis Sorted Set</text>
    <rect x="215" y="38" width="170" height="22" rx="3" fill="#451a03"/>
    <text x="300" y="53" fill="#fde68a" font-size="8" font-family="monospace" text-anchor="middle">Task A (score: 1700000000)</text>
    <rect x="215" y="64" width="170" height="22" rx="3" fill="#451a03"/>
    <text x="300" y="79" fill="#fde68a" font-size="8" font-family="monospace" text-anchor="middle">Task B (score: 1700000060)</text>
    <rect x="215" y="90" width="170" height="22" rx="3" fill="#451a03"/>
    <text x="300" y="105" fill="#fde68a" font-size="8" font-family="monospace" text-anchor="middle">Task C (score: 1700000300)</text>

    <!-- Workers Polling via Lua -->
    <rect x="440" y="20" width="160" height="85" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="520" y="45" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Workers Polling</text>
    <text x="520" y="68" fill="#ffffff" font-size="8" font-family="monospace" text-anchor="middle">ZRANGEBYSCORE 0 now</text>
    <text x="520" y="88" fill="#a7f3d0" font-size="9" text-anchor="middle">ZREM atômico via Lua</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Script Lua atômico (ZRANGEBYSCORE + ZREM) garante que cada tarefa é entregue a exatamente 1 worker.</text>
`),

  'SYS-ARCH-SCHEDULER-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Orquestrador DAG &amp; Recuperação de Falhas por Heartbeat</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Topologia DAG: A → B e A → C antes de D</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="260" height="55" rx="4" fill="#065f46"/>
      <text x="130" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Worker Ativo (Heartbeat OK)</text>
      <text x="130" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">Heartbeat a cada 5s no Redis</text>

      <rect x="300" y="0" width="260" height="55" rx="4" fill="#7f1d1d"/>
      <text x="430" y="22" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Worker Falha (Sem Heartbeat por 30s)</text>
      <text x="430" y="40" fill="#fca5a5" font-size="9" text-anchor="middle">Tarefa reatribuída automaticamente a novo worker</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Tarefas idempotentes garantem que retentativas em workers secundários não corrompem o resultado final do pipeline.</text>
`),

  // === faang-system-design-archetypes/case-flash-sale-inventory ===
  'SYS-ARCH-FLASHSALE-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Vendas Relâmpago (Flash Sale): Reserva Atômica com Redis Lua</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="300" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Script Lua Atômico Executando em RAM Pura no Redis (100.000 QPS)</text>

    <!-- Lua code snippet -->
    <rect x="20" y="40" width="560" height="65" rx="4" fill="#0f172a" stroke="#0284c7" stroke-width="1"/>
    <text x="40" y="60" fill="#38bdf8" font-size="9" font-family="monospace">local stock = tonumber(redis.call('GET', KEYS[1]))</text>
    <text x="40" y="78" fill="#38bdf8" font-size="9" font-family="monospace">if stock &gt;= tonumber(ARGV[1]) then redis.call('DECRBY', KEYS[1], ARGV[1]); return 1;</text>
    <text x="40" y="96" fill="#f87171" font-size="9" font-family="monospace">else return 0; end</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Single-thread do Redis garante zero race condition e zero overselling sem travar o banco relacional.</text>
`),

  'SYS-ARCH-FLASHSALE-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sala de Espera Virtual (Virtual Waiting Room) &amp; Liberação por TTL</text>
  <g transform="translate(40, 50)">
    <!-- Waiting Room -->
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Sala de Espera Virtual</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">1.000.000 usuários em fila</text>
    <text x="140" y="65" fill="#86efac" font-size="10" text-anchor="middle">Libera 1.000 tokens/segundo (Leaky Bucket)</text>
    <text x="140" y="88" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Protege o Checkout Backend</text>

    <!-- Order Reservation TTL -->
    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Reserva com TTL (15 minutos)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Se usuário pagar: status='PAID'</text>
    <text x="460" y="65" fill="#f87171" font-size="10" text-anchor="middle">Se TTL expirar sem pagamento:</text>
    <text x="460" y="88" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Devolve estoque ao Redis (+1)</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Garante que inventário bloqueado por desistência volta automaticamente à venda para outros clientes.</text>
`),

  // === faang-system-design-archetypes/case-metrics-monitoring ===
  'SYS-ARCH-METRICS-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bancos TSDB: Compressão Gorilla (XOR Float + Delta-of-Delta)</text>
  <g transform="translate(40, 50)">
    <!-- Timestamp Compression -->
    <rect x="0" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Timestamps: Delta-of-Delta</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">t0 = 100, t1 = 160 (delta: 60)</text>
    <text x="140" y="65" fill="#cbd5e1" font-size="10" text-anchor="middle">t2 = 220 (delta: 60 → D_of_D = 0)</text>
    <text x="140" y="90" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Armazena exatamente 1 bit '0'</text>

    <!-- Value Compression -->
    <rect x="320" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Valores Float64: XOR Bitwise</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Métricas variam suavemente</text>
    <text x="460" y="65" fill="#cbd5e1" font-size="10" text-anchor="middle">V_current XOR V_prev tem zeros à esq/dir</text>
    <text x="460" y="90" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Comprime 16B para ~1.37 Bytes</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Redução de 12x no consumo de memória RAM e disco em sistemas como Prometheus e Facebook Gorilla TSDB.</text>
`),

  'SYS-ARCH-METRICS-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Arquitetura de Métricas: Pull (Prometheus) vs Push (Datadog) &amp; Downsampling</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Modelo Pull (Prometheus)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Servidor busca /metrics nos targets</text>
    <text x="140" y="65" fill="#86efac" font-size="10" text-anchor="middle">Detecção imediata de nós offline</text>
    <text x="140" y="88" fill="#34d399" font-size="9" text-anchor="middle">Ideal para infraestrutura estática/K8s</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Modelo Push (Datadog / StatsD)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Agente envia métricas para o Gateway</text>
    <text x="460" y="65" fill="#86efac" font-size="10" text-anchor="middle">Melhor para jobs efêmeros (AWS Lambda)</text>
    <text x="460" y="88" fill="#34d399" font-size="9" text-anchor="middle">Exige proteção contra tempestades de tráfego</text>
  </g>
  <text x="340" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">Downsampling: 10s resolution (7 dias) → 5m resolution (30 dias) → 1h resolution (1 ano).</text>
`),

  // === faang-system-design-archetypes/case-payment-system-ledger ===
  'SYS-ARCH-PAYMENT-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sistema de Pagamentos (Stripe): Livro-Razão de Partidas Dobradas</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Invariante Fundamental: SUM(Débitos) - SUM(Créditos) == 0</text>

    <!-- Entry Example -->
    <rect x="20" y="38" width="560" height="60" rx="4" fill="#0f172a" stroke="#0284c7" stroke-width="1"/>
    <text x="150" y="60" fill="#f87171" font-size="10" font-family="monospace" text-anchor="middle">Conta Origem (Cliente): -$100 (Débito)</text>
    <text x="430" y="60" fill="#34d399" font-size="10" font-family="monospace" text-anchor="middle">Conta Destino (Merchant): +$97 (Crédito)</text>
    <text x="430" y="80" fill="#fbbf24" font-size="10" font-family="monospace" text-anchor="middle">Taxa Plataforma (Fee): +$3 (Crédito)</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Livro-razão é estritamente append-only e imutável; correções exigem lançamentos de estorno equilibrados.</text>
`),

  'SYS-ARCH-PAYMENT-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Idempotência Financeira &amp; Reconciliação Noturna de Adquirentes</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Idempotency Key no Gateway</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Header: Idempotency-Key: UUID</text>
    <text x="140" y="65" fill="#86efac" font-size="10" text-anchor="middle">Impede cobrança duplicada no cartão</text>
    <text x="140" y="88" fill="#34d399" font-size="9" text-anchor="middle">Salva estado da transação em Lock</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="460" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Reconciliação Noturna</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Baixa arquivos de extrato de bancos</text>
    <text x="460" y="65" fill="#fde68a" font-size="10" text-anchor="middle">Compara 1 a 1 com o livro-razão interno</text>
    <text x="460" y="88" fill="#f87171" font-size="9" text-anchor="middle">Gera alertas em caso de divergência de centavos</text>
  </g>
  <text x="340" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">Reconciliação é o teste definitivo da integridade dos registros contábeis da instituição financeira.</text>
`),

  // === faang-system-design-archetypes/case-realtime-chat ===
  'SYS-ARCH-CHAT-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Chat em Tempo Real: WebSocket Gateways &amp; Camada de Presença</text>
  <g transform="translate(40, 50)">
    <!-- Clients -->
    <rect x="0" y="10" width="130" height="95" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="65" y="32" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Clientes Mobile/Web</text>
    <text x="65" y="55" fill="#cbd5e1" font-size="9" text-anchor="middle">Conexão WSS Duplex</text>
    <text x="65" y="75" fill="#86efac" font-size="9" text-anchor="middle">Heartbeat a cada 30s</text>

    <!-- WebSocket Servers -->
    <rect x="180" y="10" width="160" height="95" rx="6" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
    <text x="260" y="35" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">WS Gateway Cluster</text>
    <text x="260" y="55" fill="#e0f2fe" font-size="9" text-anchor="middle">100.000 conexões/nó</text>
    <text x="260" y="75" fill="#bae6fd" font-size="9" text-anchor="middle">Mantém sockets TCP abertos</text>

    <!-- Redis Presence -->
    <rect x="390" y="10" width="190" height="95" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="485" y="35" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Redis Presence Engine</text>
    <text x="485" y="55" fill="#fef3c7" font-size="9" text-anchor="middle">HSET presence:user_id</text>
    <text x="485" y="75" fill="#fde68a" font-size="9" text-anchor="middle">{server_ip, status, ttl:60s}</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Se o cliente perder a conexão e não enviar heartbeat, o TTL do Redis expira e marca status 'offline'.</text>
`),

  'SYS-ARCH-CHAT-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Roteamento de Mensagens entre Servidores WS via Redis Pub/Sub</text>
  <g transform="translate(40, 50)">
    <!-- Server 1 (Alice) -->
    <rect x="0" y="0" width="170" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="85" y="22" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">WS Gateway 1 (Alice)</text>
    <text x="85" y="48" fill="#cbd5e1" font-size="9" text-anchor="middle">Alice envia: "Olá Bob!"</text>
    <text x="85" y="70" fill="#fbbf24" font-size="9" text-anchor="middle">Publica no canal de Bob</text>
    <text x="85" y="90" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">PUBLISH user:bob</text>

    <!-- Redis Message Broker -->
    <rect x="210" y="25" width="180" height="60" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="300" y="50" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Redis Pub/Sub / Kafka</text>
    <text x="300" y="70" fill="#fde68a" font-size="9" text-anchor="middle">Entrega em &lt; 2ms</text>

    <!-- Server 2 (Bob) -->
    <rect x="430" y="0" width="170" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="515" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">WS Gateway 2 (Bob)</text>
    <text x="515" y="48" fill="#cbd5e1" font-size="9" text-anchor="middle">Inscrito em user:bob</text>
    <text x="515" y="70" fill="#86efac" font-size="9" text-anchor="middle">Recebe evento e despacha</text>
    <text x="515" y="90" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Socket TCP → Bob UI</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Se Bob estiver offline, a mensagem é gravada no banco de histórico (Cassandra/ScyllaDB) e disparada via Push Notification (FCM/APNS).</text>
`)
};
