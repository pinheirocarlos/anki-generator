import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateCard } from '../src/utils/validator.js';
import { SVG_GENERATORS } from '../src/utils/media-catalog.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const SYS_DIR = path.join(ROOT_DIR, 'decks', '03-system-design-backend');

/**
 * Complete media mapping dictionary for all 94 System Design cards
 */
export const SYS_CARD_MEDIA_MAP = {
  // === caching-cdn/cache-invalidation-anomalies ===
  'SYS-CACHE-ANOMALIES-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/cache-stampede-mutex-singleflight-loop.webm',
    fallbackText: 'Cache Stampede: múltiplas requisições simultâneas em cache miss bloqueadas por Mutex/Singleflight enquanto apenas 1 worker recalcula o dado.'
  },
  'SYS-CACHE-ANOMALIES-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/cache-penetration-bloom-filter-avalanche-loop.webm',
    fallbackText: 'Filtro de Bloom intercepta consultas a chaves inexistentes (Penetration) e TTL jitter evita expiração simultânea em massa (Avalanche).'
  },

  // === caching-cdn/caching-patterns ===
  'SYS-CACHE-PATTERNS-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/cache-aside-vs-write-through-loop.webm',
    fallbackText: 'Cache-Aside lê sob demanda da cache com lazy loading vs Write-Through atualizando cache e banco de dados de forma síncrona.',
    svgGenerator: SVG_GENERATORS.cacheAsidePattern
  },
  'SYS-CACHE-PATTERNS-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/lru-vs-lfu-wtinylfu-eviction-loop.webm',
    fallbackText: 'Política W-TinyLFU combinando Window Cache para recência com Count-Min Sketch para frequência com 99% de hit ratio.'
  },

  // === caching-cdn/cdn-edge-caching ===
  'SYS-CACHE-CDN-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/cdn-anycast-bgp-pop-routing-loop.webm',
    fallbackText: 'Roteamento Anycast BGP direcionando requisições do cliente ao Point of Presence (PoP) de menor latência geográfica.'
  },
  'SYS-CACHE-CDN-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/http-cache-control-stale-while-revalidate-loop.webm',
    fallbackText: 'Diretiva stale-while-revalidate servindo conteúdo em cache instantaneamente enquanto dispara revalidação assíncrona na origem.'
  },

  // === caching-cdn/redis-internals ===
  'SYS-CACHE-REDIS-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/redis-single-thread-event-loop-loop.webm',
    fallbackText: 'Event Loop do Redis operando em memória RAM física com multiplexador de I/O não-bloqueante (epoll/kqueue) sem contenção de locks.'
  },
  'SYS-CACHE-REDIS-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/redis-skiplist-zset-hierarchy-loop.webm',
    fallbackText: 'SkipList probabilística do Redis ZSet permitindo buscas e inserções em O(log N) combinada com Hash Map para lookup em O(1).'
  },

  // === databases-storage/acid-isolation-levels ===
  'SYS-DB-ACID-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/db-isolation-anomalies-dirty-phantom-loop.webm',
    fallbackText: 'Anomalias de concorrência ANSI SQL: leitura de dados não commitados (Dirty Read) e inserções invisíveis na mesma transação (Phantom Read).'
  },
  'SYS-DB-ACID-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/mvcc-snapshot-isolation-xmin-xmax-loop.webm',
    fallbackText: 'Controle de Concorrência Multiversão (MVCC): leituras enxergam snapshot imutável baseado em xmin/xmax sem travar escritas.'
  },
  'SYS-DB-ACID-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/db-write-skew-ssi-locks-loop.webm',
    fallbackText: 'Anomalia de Write Skew violando restrições de integridade cruzadas sob Snapshot Isolation e detecção de dependências no SSI.'
  },

  // === databases-storage/nosql-data-modeling ===
  'SYS-DB-NOSQL-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/dynamodb-single-table-design-pk-sk-loop.webm',
    fallbackText: 'Modelagem Single-Table no DynamoDB particionando por HASH (PK) e ordenando ranges por SORT (SK) para consultas ricas em 1 RTT.'
  },
  'SYS-DB-NOSQL-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/cassandra-wide-column-tombstone-storm-loop.webm',
    fallbackText: 'Deleções no Cassandra gravando marcadores Tombstone e degradação de leitura durante varreduras em SSTables não compactadas.'
  },

  // === databases-storage/scaling-replication-cdc ===
  'SYS-DB-SCALING-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/database-replication-lag-leader-follower-loop.webm',
    fallbackText: 'Assincronia na replicação Leader-Follower gerando Replication Lag e leituras inconsistentes em réplicas secundárias.'
  },
  'SYS-DB-SCALING-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/cdc-debezium-wal-binlog-streaming-loop.webm',
    fallbackText: 'Change Data Capture (CDC) lendo o Write-Ahead Log (WAL) do banco de dados e transmitindo streams de mutações em tempo real.'
  },

  // === databases-storage/sql-indexing-optimization ===
  'SYS-DB-SQLOPT-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/sql-clustered-vs-secondary-index-lookup-loop.webm',
    fallbackText: 'Índice Clustered contendo as páginas de dados na folha da B+Tree vs Índice Secundário apontando para a Primary Key.'
  },
  'SYS-DB-SQLOPT-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/sql-composite-index-leftmost-prefix-loop.webm',
    fallbackText: 'Regra do Prefixo Mais à Esquerda navegando na B+Tree composta (A, B, C) apenas quando a coluna antecedente é filtrada.'
  },
  'SYS-DB-SQLOPT-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/sql-covering-index-zero-table-lookup-loop.webm',
    fallbackText: 'Covering Index satisfazendo todas as colunas do SELECT e WHERE diretamente nos nós folhas sem acessar a tabela física.'
  },

  // === databases-storage/storage-engines ===
  'SYS-DB-ENGINE-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/b-plus-tree-node-split-linked-leaves-loop.webm',
    fallbackText: 'B+Tree com nós internos apenas como roteadores e folhas duplamente encadeadas otimizando range scans sequenciais.'
  },
  'SYS-DB-ENGINE-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/lsm-tree-memtable-wal-sstable-compaction-loop.webm',
    fallbackText: 'LSM-Tree gravando em WAL e MemTable em memória com flush assíncrono para SSTables imutáveis em disco.',
    svgGenerator: SVG_GENERATORS.lsmTreeEngine
  },
  'SYS-DB-ENGINE-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/columnar-storage-parquet-clickhouse-olap-loop.webm',
    fallbackText: 'Armazenamento colunar escaneando apenas as colunas solicitadas na agregação OLAP com alta taxa de compressão de dados.'
  },

  // === databases-storage/vector-databases-search ===
  'SYS-DB-VECTOR-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/elasticsearch-inverted-index-postings-list-loop.webm',
    fallbackText: 'Índice Invertido mapeando termos normalizados para Postings Lists com busca booleana e scoring BM25 em O(1).'
  },
  'SYS-DB-VECTOR-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/hnsw-vector-graph-ann-search-loop.webm',
    fallbackText: 'Grafo multicamadas HNSW navegando por saltos longos na camada superior e busca de vizinhos densa na camada inferior.'
  },

  // === distributed-systems/cap-pacelc-consistency ===
  'SYS-DIST-CONSISTENCY-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/cap-theorem-network-partition-tradeoff-loop.webm',
    fallbackText: 'Teorema CAP: em caso de partição de rede (P), o sistema deve optar entre Consistência estrita (CP) ou Disponibilidade (AP).',
    svgGenerator: SVG_GENERATORS.capPacelcMatrix
  },
  'SYS-DIST-CONSISTENCY-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/pacelc-latency-vs-consistency-matrix-loop.webm',
    fallbackText: 'Teorema PACELC: Se houver partição (P) avalia-se A vs C; senão (E), avalia-se Latência (L) vs Consistência (C).',
    svgGenerator: SVG_GENERATORS.capPacelcMatrix
  },
  'SYS-DIST-CONSISTENCY-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/linearizability-vs-eventual-consistency-timeline-loop.webm',
    fallbackText: 'Linearizabilidade simulando uma cópia única global atômica vs propagação assíncrona na consistência eventual.'
  },

  // === distributed-systems/consensus-replication ===
  'SYS-DIST-CONSENSUS-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/raft-leader-election-term-timeout-loop.webm',
    fallbackText: 'Eleição de líder no Raft: candidato dispara RequestVote após Election Timeout e conquista liderança com maioria de votos.',
    svgGenerator: SVG_GENERATORS.raftConsensus
  },
  'SYS-DIST-CONSENSUS-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/raft-log-replication-quorum-commit-loop.webm',
    fallbackText: 'Replicação de entradas de log do líder para os seguidores e confirmação de commit ao atingir o quorum da maioria.',
    svgGenerator: SVG_GENERATORS.raftConsensus
  },
  'SYS-DIST-CONSENSUS-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/quorum-reads-writes-overlap-formula-loop.webm',
    fallbackText: 'A fórmula R + W > N garante que ao menos um nó no conjunto de leitura possui a versão mais recente escrita.'
  },

  // === distributed-systems/distributed-locking-coordination ===
  'SYS-DIST-LOCK-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/distributed-lock-redis-setnx-gc-pause-loop.webm',
    fallbackText: 'Quebra de exclusão mútua quando uma pausa longa de GC no cliente faz o TTL do lock expirar antes do processamento terminar.',
    svgGenerator: SVG_GENERATORS.distributedLockRedlock
  },
  'SYS-DIST-LOCK-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/fencing-tokens-monotonic-resource-protection-loop.webm',
    fallbackText: 'Fencing Tokens monotonicamente crescentes rejeitando gravações de clientes antigos com tokens desatualizados.',
    svgGenerator: SVG_GENERATORS.distributedLockRedlock
  },

  // === distributed-systems/distributed-transactions ===
  'SYS-DIST-TX-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/two-phase-commit-2pc-prepare-commit-loop.webm',
    fallbackText: 'Protocolo Two-Phase Commit (2PC): fase Prepare obtendo votos de prontidão e fase Commit aplicando alterações atomicamente.',
    svgGenerator: SVG_GENERATORS.twoPhaseCommit
  },
  'SYS-DIST-TX-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/saga-pattern-orchestrator-compensating-tx-loop.webm',
    fallbackText: 'Padrão Saga executando transações locais distribuídas com orquestrador central disparando transações compensatórias em falhas.'
  },
  'SYS-DIST-TX-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/transactional-outbox-pattern-cdc-relay-loop.webm',
    fallbackText: 'Gravação atômica da mutação de negócio e do evento na tabela Outbox na mesma transação SQL com relay via CDC.'
  },

  // === distributed-systems/sharding-consistent-hashing ===
  'SYS-DIST-SHARDING-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/consistent-hashing-ring-node-add-remove-loop.webm',
    fallbackText: 'Anel de Consistent Hashing remapeando apenas as chaves do segmento vizinho quando nós entram ou saem do cluster.',
    svgGenerator: SVG_GENERATORS.consistentHashingRing
  },
  'SYS-DIST-SHARDING-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/consistent-hashing-virtual-nodes-uniform-distribution-loop.webm',
    fallbackText: 'Nós virtuais (Vnodes) espalhando múltiplos pontos de cada servidor pelo anel para distribuição uniforme de carga.',
    svgGenerator: SVG_GENERATORS.consistentHashingRing
  },

  // === distributed-systems/time-clocks-id-generation ===
  'SYS-DIST-TIME-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/vector-clocks-causality-tracking-concurrent-loop.webm',
    fallbackText: 'Vector Clocks rastreando causalidade entre nós distribuídos e detectando conflitos de escrita concorrentes.'
  },
  'SYS-DIST-TIME-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/twitter-snowflake-64bit-id-structure-loop.webm',
    fallbackText: 'Estrutura do Snowflake: 41 bits de timestamp, 10 bits de ID de máquina/datacenter e 12 bits de sequência local.'
  },
  'SYS-DIST-TIME-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/google-spanner-truetime-uncertainty-wait-loop.webm',
    fallbackText: 'TrueTime API garantindo linearizabilidade global através de espera deliberada pela janela de incerteza [earliest, latest].'
  },

  // === faang-system-design-archetypes/case-distributed-file-storage ===
  'SYS-ARCH-FILESTORE-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/google-drive-chunking-delta-sync-pipeline-loop.webm',
    fallbackText: 'Divisão de arquivos em blocos de 4MB com hash SHA-256 e sincronização delta transmitindo apenas blocos modificados.'
  },
  'SYS-ARCH-FILESTORE-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/content-addressable-storage-deduplication-conflict-loop.webm',
    fallbackText: 'Armazenamento endereçável por conteúdo (CAS) deduplicando blocos idênticos entre contas e bifurcando versões em conflito.'
  },

  // === faang-system-design-archetypes/case-distributed-task-scheduler ===
  'SYS-ARCH-SCHEDULER-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/distributed-task-scheduler-delay-queue-redis-zset-loop.webm',
    fallbackText: 'Agendador distribuído usando Redis Sorted Sets com score de timestamp para puxar tarefas prontas com baixa latência.',
    svgGenerator: SVG_GENERATORS.distributedTaskScheduler
  },
  'SYS-ARCH-SCHEDULER-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/dag-task-orchestrator-worker-heartbeat-loop.webm',
    fallbackText: 'Coordenação de fluxos em DAG com monitoramento de heartbeat e reatribuição de tarefas órfãs após falha de worker.',
    svgGenerator: SVG_GENERATORS.distributedTaskScheduler
  },

  // === faang-system-design-archetypes/case-flash-sale-inventory ===
  'SYS-ARCH-FLASHSALE-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/flash-sale-redis-lua-atomic-decrement-loop.webm',
    fallbackText: 'Decremento atômico de estoque via script Lua em Redis prevenindo overselling em picos de alta concorrência.',
    svgGenerator: SVG_GENERATORS.flashSaleInventoryTopology
  },
  'SYS-ARCH-FLASHSALE-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/virtual-waiting-room-token-bucket-reservation-ttl-loop.webm',
    fallbackText: 'Sala de espera virtual liberando tokens de compra gradualmente e devolvendo estoque não pago após expiração do TTL.',
    svgGenerator: SVG_GENERATORS.flashSaleInventoryTopology
  },

  // === faang-system-design-archetypes/case-metrics-monitoring ===
  'SYS-ARCH-METRICS-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/gorilla-tsdb-delta-of-delta-float-xor-loop.webm',
    fallbackText: 'Algoritmo Gorilla comprimindo timestamps com delta-of-delta e valores float via XOR com os bits precedentes.'
  },
  'SYS-ARCH-METRICS-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/metrics-pull-vs-push-downsampling-pipeline-loop.webm',
    fallbackText: 'Coleta Pull por scraper central vs Push por agentes locais e agregação temporal (downsampling) para histórico de longo prazo.'
  },

  // === faang-system-design-archetypes/case-payment-system-ledger ===
  'SYS-ARCH-PAYMENT-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/double-entry-bookkeeping-ledger-debit-credit-loop.webm',
    fallbackText: 'Livro-razão imutável garantindo que toda transação financeira possua Débitos e Créditos equilibrados com soma zero.'
  },
  'SYS-ARCH-PAYMENT-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/payment-gateway-idempotency-reconciliation-loop.webm',
    fallbackText: 'Tabela de idempotência atômica interceptando retentativas e reconciliação noturna comparando extratos de adquirentes.'
  },

  // === faang-system-design-archetypes/case-realtime-chat ===
  'SYS-ARCH-CHAT-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/websocket-gateway-presence-heartbeat-loop.webm',
    fallbackText: 'Servidores de WebSocket Gateway mantendo conexões TCP persistentes com heartbeat e presença agregada no Redis.',
    svgGenerator: SVG_GENERATORS.realtimeChatTopology
  },
  'SYS-ARCH-CHAT-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/chat-routing-redis-pubsub-cross-server-loop.webm',
    fallbackText: 'Roteamento de mensagens entre instâncias de WebSocket através de canais dedicados no Redis Pub/Sub.',
    svgGenerator: SVG_GENERATORS.realtimeChatTopology
  },

  // === faang-system-design-archetypes/case-ride-hailing-geospatial ===
  'SYS-ARCH-RIDE-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/uber-h3-hexagonal-spatial-index-rings-loop.webm',
    fallbackText: 'Grade espacial hexagonal Uber H3 com anéis k-ring de vizinhança uniforme sem distorções de cantos.',
    svgGenerator: SVG_GENERATORS.rideHailingGeospatial
  },
  'SYS-ARCH-RIDE-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/driver-rider-geospatial-matching-stream-loop.webm',
    fallbackText: 'Ingestão de localização de motoristas a cada 4 segundos com matching geoespacial por células H3 em tempo real.',
    svgGenerator: SVG_GENERATORS.rideHailingGeospatial
  },

  // === faang-system-design-archetypes/case-search-autocomplete ===
  'SYS-ARCH-TYPEAHEAD-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/typeahead-trie-topk-cache-lookup-loop.webm',
    fallbackText: 'Árvore Trie em memória armazenando as K sugestões mais frequentes em cada nó para retorno em O(1).'
  },
  'SYS-ARCH-TYPEAHEAD-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/typeahead-offline-aggregation-trie-sharding-loop.webm',
    fallbackText: 'Esteira MapReduce calculando frequências de busca offline e particionando a Trie por prefixos em clusters distribuídos.'
  },

  // === faang-system-design-archetypes/case-social-timeline-feed ===
  'SYS-ARCH-FEED-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/social-feed-fanout-push-vs-pull-timeline-loop.webm',
    fallbackText: 'Fan-Out on Write gravando posts na caixa de entrada de cada seguidor vs Fan-Out on Read consultando na hora da leitura.',
    svgGenerator: SVG_GENERATORS.socialTimelineTopology
  },
  'SYS-ARCH-FEED-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/hybrid-feed-celebrity-fanout-merge-loop.webm',
    fallbackText: 'Arquitetura híbrida: push imediato para usuários regulares e pull sob demanda mesclado na leitura para contas com milhões de seguidores.',
    svgGenerator: SVG_GENERATORS.socialTimelineTopology
  },

  // === faang-system-design-archetypes/case-url-shortener ===
  'SYS-ARCH-URL-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/tinyurl-base62-encoding-id-generator-loop.webm',
    fallbackText: 'Conversão de identificador numérico de 64 bits em string alfanumérica compacta de 7 caracteres via Base62.',
    svgGenerator: SVG_GENERATORS.urlShortenerTopology
  },
  'SYS-ARCH-URL-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/tinyurl-http-301-vs-302-redirect-cache-loop.webm',
    fallbackText: 'Redirecionamento HTTP 302 permitindo rastrear métricas de cliques em camada de cache Redis com taxa 100:1.',
    svgGenerator: SVG_GENERATORS.urlShortenerTopology
  },

  // === faang-system-design-archetypes/case-video-streaming ===
  'SYS-ARCH-STREAM-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/video-ingestion-chunking-transcoding-dag-loop.webm',
    fallbackText: 'Upload de vídeo particionado em chunks com workers paralelos transcodificando múltiplos codecs e resoluções.',
    svgGenerator: SVG_GENERATORS.videoStreamingPipeline
  },
  'SYS-ARCH-STREAM-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/adaptive-bitrate-hls-dash-manifest-switch-loop.webm',
    fallbackText: 'Player alternando dinamicamente entre perfis de qualidade através de arquivos de manifesto HLS (.m3u8).',
    svgGenerator: SVG_GENERATORS.videoStreamingPipeline
  },

  // === faang-system-design-archetypes/case-web-crawler-search ===
  'SYS-ARCH-CRAWLER-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/web-crawler-url-frontier-politeness-queue-loop.webm',
    fallbackText: 'URL Frontier separando filas de prioridade e filas de polidez por hostname para evitar sobrecarga em servidores de destino.'
  },
  'SYS-ARCH-CRAWLER-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/crawler-simhash-bloom-filter-deduplication-loop.webm',
    fallbackText: 'Filtros de Bloom descartando URLs já visitadas e SimHash detectando páginas com conteúdo quase idêntico (Near-Duplicates).'
  },

  // === low-level-design/concurrency-patterns-backend ===
  'SYS-LLD-CONCURRENCY-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/concurrency-worker-pool-bounded-channels-loop.webm',
    fallbackText: 'Worker Pool distribuindo tarefas através de canal bufferizado para número fixo de goroutines controlando uso de CPU e memória.'
  },
  'SYS-LLD-CONCURRENCY-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/concurrency-fan-out-fan-in-multiplexing-loop.webm',
    fallbackText: 'Fan-Out disparando múltiplos workers independentes e Fan-In agregando resultados em um canal único com sync.WaitGroup.'
  },

  // === low-level-design/design-patterns-gang-of-four ===
  'SYS-LLD-PATTERNS-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/design-patterns-strategy-factory-polymorphism-loop.webm',
    fallbackText: 'Substituição de condicionais por polimorfismo instanciando algoritmos via Factory e executando via interface Strategy.'
  },
  'SYS-LLD-PATTERNS-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/design-patterns-decorator-vs-adapter-wrapper-loop.webm',
    fallbackText: 'Decorator adicionando responsabilidades em cadeia sem alterar a interface vs Adapter convertendo interfaces incompatíveis.'
  },

  // === low-level-design/lld-case-studies ===
  'SYS-LLD-CASES-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/lld-parking-lot-class-diagram-polymorphism-loop.webm',
    fallbackText: 'Modelagem orientada a objetos de estacionamento com hierarquia de vagas, estratégia de alocação e cálculo de tarifas.'
  },
  'SYS-LLD-CASES-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/lld-in-memory-cache-threadsafe-ttl-eviction-loop.webm',
    fallbackText: 'Cache em memória com mutex RWMutex, limpeza ativa de chaves expiradas por worker em background e evicção LRU.'
  },

  // === low-level-design/solid-clean-architecture ===
  'SYS-LLD-SOLID-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/solid-principles-srp-dip-inversion-loop.webm',
    fallbackText: 'Single Responsibility isolando motivos de mudança e Dependency Inversion fazendo o domínio depender de abstrações.'
  },
  'SYS-LLD-SOLID-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/hexagonal-architecture-ports-and-adapters-loop.webm',
    fallbackText: 'Núcleo de domínio isolado de infraestrutura comunicando-se exclusivamente através de Portas de Entrada e Saída.'
  },

  // === messaging-streaming/delivery-guarantees-idempotency ===
  'SYS-MSG-GUARANTEES-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/message-delivery-guarantees-ack-retry-loop.webm',
    fallbackText: 'At-Least-Once com retentativas e confirmações (ACKs) vs Exactly-Once usando streams transacionais e chaves de idempotência.'
  },
  'SYS-MSG-GUARANTEES-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/idempotency-key-consumer-deduplication-sql-loop.webm',
    fallbackText: 'Inserção de chave de idempotência com chave única no banco de dados bloqueando processamento duplicado.'
  },

  // === messaging-streaming/event-sourcing-cqrs ===
  'SYS-MSG-EVENTS-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/event-sourcing-append-only-log-rehydration-loop.webm',
    fallbackText: 'Reidratação de estado de entidade reconstruindo a partir da sequência cronológica de eventos imutáveis.',
    svgGenerator: SVG_GENERATORS.eventSourcingCQRS
  },
  'SYS-MSG-EVENTS-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/cqrs-command-query-async-projections-loop.webm',
    fallbackText: 'Separação estrita de modelo de escrita (Commands) e banco desnormalizado de leitura (Queries) via projeções assíncronas.',
    svgGenerator: SVG_GENERATORS.eventSourcingCQRS
  },

  // === messaging-streaming/kafka-internals ===
  'SYS-MSG-KAFKA-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/kafka-partition-stream-loop.webm',
    fallbackText: 'Cada partição do Kafka é um log sequencial distribuído e lido de forma independente por consumidores.',
    svgGenerator: SVG_GENERATORS.kafkaPartitioning
  },
  'SYS-MSG-KAFKA-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/kafka-log-compaction-cleaner-head-tail-loop.webm',
    fallbackText: 'Thread de Cleaner do Kafka mantendo apenas o último valor de cada chave no log compactado.',
    svgGenerator: SVG_GENERATORS.kafkaPartitioning
  },

  // === messaging-streaming/message-queues ===
  'SYS-MSG-QUEUES-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/message-queues-point-to-point-vs-pubsub-loop.webm',
    fallbackText: 'Fila Ponto a Ponto competindo por mensagens vs Fan-out Pub/Sub entregando cópia para múltiplos assinantes.'
  },
  'SYS-MSG-QUEUES-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/sqs-visibility-timeout-dead-letter-queue-loop.webm',
    fallbackText: 'Visibility Timeout escondendo mensagem em processamento e roteamento automático para DLQ após estourar limite de retentativas.'
  },

  // === resilience-traffic/api-design-gateways ===
  'SYS-RES-APIGW-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/api-gateway-pattern-bff-aggregation-loop.webm',
    fallbackText: 'API Gateway agregando chamadas de microsserviços e BFF customizando respostas para interfaces mobile e web.'
  },
  'SYS-RES-APIGW-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/grpc-protobuf-vs-rest-json-framing-loop.webm',
    fallbackText: 'Serialização binária compacta em Protobuf sobre HTTP/2 eliminando overhead textual de JSON e headers repetitivos.'
  },

  // === resilience-traffic/fault-tolerance-resilience ===
  'SYS-RES-FAULTTOL-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/circuit-breaker-state-transitions-closed-open-half-loop.webm',
    fallbackText: 'Circuit Breaker interrompendo requisições instantaneamente (Open) após limite de erros para evitar sobrecarga em cascata.',
    svgGenerator: SVG_GENERATORS.circuitBreaker
  },
  'SYS-RES-FAULTTOL-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/exponential-backoff-full-jitter-distribution-loop.webm',
    fallbackText: 'Full Jitter aleatorizando tempos de espera entre retentativas dissipando tempestades de requisições sincronizadas.'
  },

  // === resilience-traffic/load-balancing-proxies ===
  'SYS-RES-LOADBAL-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/load-balancer-l4-transport-vs-l7-application-loop.webm',
    fallbackText: 'Load Balancer L4 operando por IP/Porta sem abrir payload vs L7 inspecionando cabeçalhos HTTP, cookies e rotas.'
  },
  'SYS-RES-LOADBAL-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/load-balancer-algorithms-least-connections-round-robin-loop.webm',
    fallbackText: 'Algoritmo Least Connections distribuindo conexões para o servidor com menor número de sessões ativas.'
  },

  // === resilience-traffic/rate-limiting-throttling ===
  'SYS-RES-RATELIMIT-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/rate-limiting-token-bucket-vs-leaky-bucket-loop.webm',
    fallbackText: 'Token Bucket permitindo rajadas até a capacidade máxima vs Leaky Bucket liberando vazão estritamente constante.',
    svgGenerator: SVG_GENERATORS.rateLimiterTokenBucket
  },
  'SYS-RES-RATELIMIT-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/redis-rate-limiter-sliding-window-sorted-set-loop.webm',
    fallbackText: 'Janela deslizante com Redis Sorted Set contando elementos com timestamp acima de (now - window) em script Lua atômico.',
    svgGenerator: SVG_GENERATORS.rateLimiterTokenBucket
  },

  // === resilience-traffic/service-mesh-discovery ===
  'SYS-RES-MESH-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/service-mesh-istio-control-plane-envoy-sidecar-loop.webm',
    fallbackText: 'Proxies Envoy Sidecar interceptando todo tráfego leste-oeste coordenados pelas políticas do Control Plane Istiod.'
  },
  'SYS-RES-MESH-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/zero-trust-mutual-tls-mtls-handshake-loop.webm',
    fallbackText: 'Criptografia mTLS de ponta a ponta com certificados X.509 validados bilateralmente entre microsserviços.'
  },

  // === system-design-foundations/back-of-the-envelope-estimations ===
  'SYS-FND-ESTIMATION-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/jeff-dean-latency-numbers-orders-of-magnitude-loop.webm',
    fallbackText: 'Comparação visual de latências de hardware: L1 Cache (0.5ns), RAM (100ns), SSD (100µs), Network RTT (150ms).'
  },
  'SYS-FND-ESTIMATION-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/back-of-the-envelope-qps-storage-calculation-loop.webm',
    fallbackText: 'Cálculo de dimensionamento convertendo DAU para QPS médio, pico de tráfego e armazenamento para 5 anos.'
  },
  'SYS-FND-ESTIMATION-002': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/availability-nines-sla-downtime-table-loop.webm',
    fallbackText: 'Tabela de noves de disponibilidade: de 99.9% (8.7 horas de downtime/ano) a 99.999% (5 minutos de downtime/ano).'
  },

  // === system-design-foundations/system-design-interview-framework ===
  'SYS-FND-FRAMEWORK-000': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/system-design-interview-4-step-framework-loop.webm',
    fallbackText: 'Framework em 4 etapas: 1. Escopo e Requisitos, 2. Arquitetura em Alto Nível, 3. Deep Dive, 4. Gargalos e Escala.'
  },
  'SYS-FND-FRAMEWORK-001': {
    videoUrl: 'https://assets.faang-anki.dev/media/system-design/system-design-deep-dive-tradeoffs-analysis-loop.webm',
    fallbackText: 'Análise estruturada de trade-offs arquiteturais: consistência vs latência, particionamento e pontos únicos de falha.'
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
  const mediaConfig = SYS_CARD_MEDIA_MAP[cardId];
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
  console.log('🚀 Starting System Design Looping Micro-Video & SVG Topology Injection...');
  const files = findMarkdownFiles(SYS_DIR);
  console.log(`🔍 Found ${files.length} cards in ${SYS_DIR}`);

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
    if (!SYS_CARD_MEDIA_MAP[cardId]) {
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
