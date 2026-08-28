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
    fallbackText: 'Cache Stampede: múltiplas requisições simultâneas em cache miss bloqueadas por Mutex/Singleflight enquanto apenas 1 worker recalcula o dado.'
  },
  'SYS-CACHE-ANOMALIES-001': {
    fallbackText: 'Filtro de Bloom intercepta consultas a chaves inexistentes (Penetration) e TTL jitter evita expiração simultânea em massa (Avalanche).'
  },

  // === caching-cdn/caching-patterns ===
  'SYS-CACHE-PATTERNS-000': {
    fallbackText: 'Cache-Aside lê sob demanda da cache com lazy loading vs Write-Through atualizando cache e banco de dados de forma síncrona.',
    svgGenerator: SVG_GENERATORS.cacheAsidePattern
  },
  'SYS-CACHE-PATTERNS-001': {
    fallbackText: 'Política W-TinyLFU combinando Window Cache para recência com Count-Min Sketch para frequência com 99% de hit ratio.'
  },

  // === caching-cdn/cdn-edge-caching ===
  'SYS-CACHE-CDN-000': {
    fallbackText: 'Roteamento Anycast BGP direcionando requisições do cliente ao Point of Presence (PoP) de menor latência geográfica.'
  },
  'SYS-CACHE-CDN-001': {
    fallbackText: 'Diretiva stale-while-revalidate servindo conteúdo em cache instantaneamente enquanto dispara revalidação assíncrona na origem.'
  },

  // === caching-cdn/redis-internals ===
  'SYS-CACHE-REDIS-000': {
    fallbackText: 'Event Loop do Redis operando em memória RAM física com multiplexador de I/O não-bloqueante (epoll/kqueue) sem contenção de locks.'
  },
  'SYS-CACHE-REDIS-001': {
    fallbackText: 'SkipList probabilística do Redis ZSet permitindo buscas e inserções em O(log N) combinada com Hash Map para lookup em O(1).'
  },

  // === databases-storage/acid-isolation-levels ===
  'SYS-DB-ACID-000': {
    fallbackText: 'Anomalias de concorrência ANSI SQL: leitura de dados não commitados (Dirty Read) e inserções invisíveis na mesma transação (Phantom Read).'
  },
  'SYS-DB-ACID-001': {
    fallbackText: 'Controle de Concorrência Multiversão (MVCC): leituras enxergam snapshot imutável baseado em xmin/xmax sem travar escritas.'
  },
  'SYS-DB-ACID-002': {
    fallbackText: 'Anomalia de Write Skew violando restrições de integridade cruzadas sob Snapshot Isolation e detecção de dependências no SSI.'
  },

  // === databases-storage/nosql-data-modeling ===
  'SYS-DB-NOSQL-000': {
    fallbackText: 'Modelagem Single-Table no DynamoDB particionando por HASH (PK) e ordenando ranges por SORT (SK) para consultas ricas em 1 RTT.'
  },
  'SYS-DB-NOSQL-001': {
    fallbackText: 'Deleções no Cassandra gravando marcadores Tombstone e degradação de leitura durante varreduras em SSTables não compactadas.'
  },

  // === databases-storage/scaling-replication-cdc ===
  'SYS-DB-SCALING-000': {
    fallbackText: 'Assincronia na replicação Leader-Follower gerando Replication Lag e leituras inconsistentes em réplicas secundárias.'
  },
  'SYS-DB-SCALING-001': {
    fallbackText: 'Change Data Capture (CDC) lendo o Write-Ahead Log (WAL) do banco de dados e transmitindo streams de mutações em tempo real.'
  },

  // === databases-storage/sql-indexing-optimization ===
  'SYS-DB-SQLOPT-000': {
    fallbackText: 'Índice Clustered contendo as páginas de dados na folha da B+Tree vs Índice Secundário apontando para a Primary Key.'
  },
  'SYS-DB-SQLOPT-001': {
    fallbackText: 'Regra do Prefixo Mais à Esquerda navegando na B+Tree composta (A, B, C) apenas quando a coluna antecedente é filtrada.'
  },
  'SYS-DB-SQLOPT-002': {
    fallbackText: 'Covering Index satisfazendo todas as colunas do SELECT e WHERE diretamente nos nós folhas sem acessar a tabela física.'
  },

  // === databases-storage/storage-engines ===
  'SYS-DB-ENGINE-000': {
    fallbackText: 'B+Tree com nós internos apenas como roteadores e folhas duplamente encadeadas otimizando range scans sequenciais.'
  },
  'SYS-DB-ENGINE-001': {
    fallbackText: 'LSM-Tree gravando em WAL e MemTable em memória com flush assíncrono para SSTables imutáveis em disco.',
    svgGenerator: SVG_GENERATORS.lsmTreeEngine
  },
  'SYS-DB-ENGINE-002': {
    fallbackText: 'Armazenamento colunar escaneando apenas as colunas solicitadas na agregação OLAP com alta taxa de compressão de dados.'
  },

  // === databases-storage/vector-databases-search ===
  'SYS-DB-VECTOR-000': {
    fallbackText: 'Índice Invertido mapeando termos normalizados para Postings Lists com busca booleana e scoring BM25 em O(1).'
  },
  'SYS-DB-VECTOR-001': {
    fallbackText: 'Grafo multicamadas HNSW navegando por saltos longos na camada superior e busca de vizinhos densa na camada inferior.'
  },

  // === distributed-systems/cap-pacelc-consistency ===
  'SYS-DIST-CONSISTENCY-000': {
    fallbackText: 'Teorema CAP: em caso de partição de rede (P), o sistema deve optar entre Consistência estrita (CP) ou Disponibilidade (AP).',
    svgGenerator: SVG_GENERATORS.capPacelcMatrix
  },
  'SYS-DIST-CONSISTENCY-001': {
    fallbackText: 'Teorema PACELC: Se houver partição (P) avalia-se A vs C; senão (E), avalia-se Latência (L) vs Consistência (C).',
    svgGenerator: SVG_GENERATORS.capPacelcMatrix
  },
  'SYS-DIST-CONSISTENCY-002': {
    fallbackText: 'Linearizabilidade simulando uma cópia única global atômica vs propagação assíncrona na consistência eventual.'
  },

  // === distributed-systems/consensus-replication ===
  'SYS-DIST-CONSENSUS-000': {
    fallbackText: 'Eleição de líder no Raft: candidato dispara RequestVote após Election Timeout e conquista liderança com maioria de votos.',
    svgGenerator: SVG_GENERATORS.raftConsensus
  },
  'SYS-DIST-CONSENSUS-001': {
    fallbackText: 'Replicação de entradas de log do líder para os seguidores e confirmação de commit ao atingir o quorum da maioria.',
    svgGenerator: SVG_GENERATORS.raftConsensus
  },
  'SYS-DIST-CONSENSUS-002': {
    fallbackText: 'A fórmula R + W > N garante que ao menos um nó no conjunto de leitura possui a versão mais recente escrita.'
  },

  // === distributed-systems/distributed-locking-coordination ===
  'SYS-DIST-LOCK-000': {
    fallbackText: 'Quebra de exclusão mútua quando uma pausa longa de GC no cliente faz o TTL do lock expirar antes do processamento terminar.',
    svgGenerator: SVG_GENERATORS.distributedLockRedlock
  },
  'SYS-DIST-LOCK-001': {
    fallbackText: 'Fencing Tokens monotonicamente crescentes rejeitando gravações de clientes antigos com tokens desatualizados.',
    svgGenerator: SVG_GENERATORS.distributedLockRedlock
  },

  // === distributed-systems/distributed-transactions ===
  'SYS-DIST-TX-000': {
    fallbackText: 'Protocolo Two-Phase Commit (2PC): fase Prepare obtendo votos de prontidão e fase Commit aplicando alterações atomicamente.',
    svgGenerator: SVG_GENERATORS.twoPhaseCommit
  },
  'SYS-DIST-TX-001': {
    fallbackText: 'Padrão Saga executando transações locais distribuídas com orquestrador central disparando transações compensatórias em falhas.'
  },
  'SYS-DIST-TX-002': {
    fallbackText: 'Gravação atômica da mutação de negócio e do evento na tabela Outbox na mesma transação SQL com relay via CDC.'
  },

  // === distributed-systems/sharding-consistent-hashing ===
  'SYS-DIST-SHARDING-000': {
    fallbackText: 'Anel de Consistent Hashing remapeando apenas as chaves do segmento vizinho quando nós entram ou saem do cluster.',
    svgGenerator: SVG_GENERATORS.consistentHashingRing
  },
  'SYS-DIST-SHARDING-001': {
    fallbackText: 'Nós virtuais (Vnodes) espalhando múltiplos pontos de cada servidor pelo anel para distribuição uniforme de carga.',
    svgGenerator: SVG_GENERATORS.consistentHashingRing
  },

  // === distributed-systems/time-clocks-id-generation ===
  'SYS-DIST-TIME-000': {
    fallbackText: 'Vector Clocks rastreando causalidade entre nós distribuídos e detectando conflitos de escrita concorrentes.'
  },
  'SYS-DIST-TIME-001': {
    fallbackText: 'Estrutura do Snowflake: 41 bits de timestamp, 10 bits de ID de máquina/datacenter e 12 bits de sequência local.'
  },
  'SYS-DIST-TIME-002': {
    fallbackText: 'TrueTime API garantindo linearizabilidade global através de espera deliberada pela janela de incerteza [earliest, latest].'
  },

  // === faang-system-design-archetypes/case-distributed-file-storage ===
  'SYS-ARCH-FILESTORE-000': {
    fallbackText: 'Divisão de arquivos em blocos de 4MB com hash SHA-256 e sincronização delta transmitindo apenas blocos modificados.'
  },
  'SYS-ARCH-FILESTORE-001': {
    fallbackText: 'Armazenamento endereçável por conteúdo (CAS) deduplicando blocos idênticos entre contas e bifurcando versões em conflito.'
  },

  // === faang-system-design-archetypes/case-distributed-task-scheduler ===
  'SYS-ARCH-SCHEDULER-000': {
    fallbackText: 'Agendador distribuído usando Redis Sorted Sets com score de timestamp para puxar tarefas prontas com baixa latência.',
    svgGenerator: SVG_GENERATORS.distributedTaskScheduler
  },
  'SYS-ARCH-SCHEDULER-001': {
    fallbackText: 'Coordenação de fluxos em DAG com monitoramento de heartbeat e reatribuição de tarefas órfãs após falha de worker.',
    svgGenerator: SVG_GENERATORS.distributedTaskScheduler
  },

  // === faang-system-design-archetypes/case-flash-sale-inventory ===
  'SYS-ARCH-FLASHSALE-000': {
    fallbackText: 'Decremento atômico de estoque via script Lua em Redis prevenindo overselling em picos de alta concorrência.',
    svgGenerator: SVG_GENERATORS.flashSaleInventoryTopology
  },
  'SYS-ARCH-FLASHSALE-001': {
    fallbackText: 'Sala de espera virtual liberando tokens de compra gradualmente e devolvendo estoque não pago após expiração do TTL.',
    svgGenerator: SVG_GENERATORS.flashSaleInventoryTopology
  },

  // === faang-system-design-archetypes/case-metrics-monitoring ===
  'SYS-ARCH-METRICS-000': {
    fallbackText: 'Algoritmo Gorilla comprimindo timestamps com delta-of-delta e valores float via XOR com os bits precedentes.'
  },
  'SYS-ARCH-METRICS-001': {
    fallbackText: 'Coleta Pull por scraper central vs Push por agentes locais e agregação temporal (downsampling) para histórico de longo prazo.'
  },

  // === faang-system-design-archetypes/case-payment-system-ledger ===
  'SYS-ARCH-PAYMENT-000': {
    fallbackText: 'Livro-razão imutável garantindo que toda transação financeira possua Débitos e Créditos equilibrados com soma zero.'
  },
  'SYS-ARCH-PAYMENT-001': {
    fallbackText: 'Tabela de idempotência atômica interceptando retentativas e reconciliação noturna comparando extratos de adquirentes.'
  },

  // === faang-system-design-archetypes/case-realtime-chat ===
  'SYS-ARCH-CHAT-000': {
    fallbackText: 'Servidores de WebSocket Gateway mantendo conexões TCP persistentes com heartbeat e presença agregada no Redis.',
    svgGenerator: SVG_GENERATORS.realtimeChatTopology
  },
  'SYS-ARCH-CHAT-001': {
    fallbackText: 'Roteamento de mensagens entre instâncias de WebSocket através de canais dedicados no Redis Pub/Sub.',
    svgGenerator: SVG_GENERATORS.realtimeChatTopology
  },

  // === faang-system-design-archetypes/case-ride-hailing-geospatial ===
  'SYS-ARCH-RIDE-000': {
    fallbackText: 'Grade espacial hexagonal Uber H3 com anéis k-ring de vizinhança uniforme sem distorções de cantos.',
    svgGenerator: SVG_GENERATORS.rideHailingGeospatial
  },
  'SYS-ARCH-RIDE-001': {
    fallbackText: 'Ingestão de localização de motoristas a cada 4 segundos com matching geoespacial por células H3 em tempo real.',
    svgGenerator: SVG_GENERATORS.rideHailingGeospatial
  },

  // === faang-system-design-archetypes/case-search-autocomplete ===
  'SYS-ARCH-TYPEAHEAD-000': {
    fallbackText: 'Árvore Trie em memória armazenando as K sugestões mais frequentes em cada nó para retorno em O(1).'
  },
  'SYS-ARCH-TYPEAHEAD-001': {
    fallbackText: 'Esteira MapReduce calculando frequências de busca offline e particionando a Trie por prefixos em clusters distribuídos.'
  },

  // === faang-system-design-archetypes/case-social-timeline-feed ===
  'SYS-ARCH-FEED-000': {
    fallbackText: 'Fan-Out on Write gravando posts na caixa de entrada de cada seguidor vs Fan-Out on Read consultando na hora da leitura.',
    svgGenerator: SVG_GENERATORS.socialTimelineTopology
  },
  'SYS-ARCH-FEED-001': {
    fallbackText: 'Arquitetura híbrida: push imediato para usuários regulares e pull sob demanda mesclado na leitura para contas com milhões de seguidores.',
    svgGenerator: SVG_GENERATORS.socialTimelineTopology
  },

  // === faang-system-design-archetypes/case-url-shortener ===
  'SYS-ARCH-URL-000': {
    fallbackText: 'Conversão de identificador numérico de 64 bits em string alfanumérica compacta de 7 caracteres via Base62.',
    svgGenerator: SVG_GENERATORS.urlShortenerTopology
  },
  'SYS-ARCH-URL-001': {
    fallbackText: 'Redirecionamento HTTP 302 permitindo rastrear métricas de cliques em camada de cache Redis com taxa 100:1.',
    svgGenerator: SVG_GENERATORS.urlShortenerTopology
  },

  // === faang-system-design-archetypes/case-video-streaming ===
  'SYS-ARCH-STREAM-000': {
    fallbackText: 'Upload de vídeo particionado em chunks com workers paralelos transcodificando múltiplos codecs e resoluções.',
    svgGenerator: SVG_GENERATORS.videoStreamingPipeline
  },
  'SYS-ARCH-STREAM-001': {
    fallbackText: 'Player alternando dinamicamente entre perfis de qualidade através de arquivos de manifesto HLS (.m3u8).',
    svgGenerator: SVG_GENERATORS.videoStreamingPipeline
  },

  // === faang-system-design-archetypes/case-web-crawler-search ===
  'SYS-ARCH-CRAWLER-000': {
    fallbackText: 'URL Frontier separando filas de prioridade e filas de polidez por hostname para evitar sobrecarga em servidores de destino.'
  },
  'SYS-ARCH-CRAWLER-001': {
    fallbackText: 'Filtros de Bloom descartando URLs já visitadas e SimHash detectando páginas com conteúdo quase idêntico (Near-Duplicates).'
  },

  // === low-level-design/concurrency-patterns-backend ===
  'SYS-LLD-CONCURRENCY-000': {
    fallbackText: 'Worker Pool distribuindo tarefas através de canal bufferizado para número fixo de goroutines controlando uso de CPU e memória.'
  },
  'SYS-LLD-CONCURRENCY-001': {
    fallbackText: 'Fan-Out disparando múltiplos workers independentes e Fan-In agregando resultados em um canal único com sync.WaitGroup.'
  },

  // === low-level-design/design-patterns-gang-of-four ===
  'SYS-LLD-PATTERNS-000': {
    fallbackText: 'Substituição de condicionais por polimorfismo instanciando algoritmos via Factory e executando via interface Strategy.'
  },
  'SYS-LLD-PATTERNS-001': {
    fallbackText: 'Decorator adicionando responsabilidades em cadeia sem alterar a interface vs Adapter convertendo interfaces incompatíveis.'
  },

  // === low-level-design/lld-case-studies ===
  'SYS-LLD-CASES-000': {
    fallbackText: 'Modelagem orientada a objetos de estacionamento com hierarquia de vagas, estratégia de alocação e cálculo de tarifas.'
  },
  'SYS-LLD-CASES-001': {
    fallbackText: 'Cache em memória com mutex RWMutex, limpeza ativa de chaves expiradas por worker em background e evicção LRU.'
  },

  // === low-level-design/solid-clean-architecture ===
  'SYS-LLD-SOLID-000': {
    fallbackText: 'Single Responsibility isolando motivos de mudança e Dependency Inversion fazendo o domínio depender de abstrações.'
  },
  'SYS-LLD-SOLID-001': {
    fallbackText: 'Núcleo de domínio isolado de infraestrutura comunicando-se exclusivamente através de Portas de Entrada e Saída.'
  },

  // === messaging-streaming/delivery-guarantees-idempotency ===
  'SYS-MSG-GUARANTEES-000': {
    fallbackText: 'At-Least-Once com retentativas e confirmações (ACKs) vs Exactly-Once usando streams transacionais e chaves de idempotência.'
  },
  'SYS-MSG-GUARANTEES-001': {
    fallbackText: 'Inserção de chave de idempotência com chave única no banco de dados bloqueando processamento duplicado.'
  },

  // === messaging-streaming/event-sourcing-cqrs ===
  'SYS-MSG-EVENTS-000': {
    fallbackText: 'Reidratação de estado de entidade reconstruindo a partir da sequência cronológica de eventos imutáveis.',
    svgGenerator: SVG_GENERATORS.eventSourcingCQRS
  },
  'SYS-MSG-EVENTS-001': {
    fallbackText: 'Separação estrita de modelo de escrita (Commands) e banco desnormalizado de leitura (Queries) via projeções assíncronas.',
    svgGenerator: SVG_GENERATORS.eventSourcingCQRS
  },

  // === messaging-streaming/kafka-internals ===
  'SYS-MSG-KAFKA-000': {
    fallbackText: 'Cada partição do Kafka é um log sequencial distribuído e lido de forma independente por consumidores.',
    svgGenerator: SVG_GENERATORS.kafkaPartitioning
  },
  'SYS-MSG-KAFKA-001': {
    fallbackText: 'Thread de Cleaner do Kafka mantendo apenas o último valor de cada chave no log compactado.',
    svgGenerator: SVG_GENERATORS.kafkaPartitioning
  },

  // === messaging-streaming/message-queues ===
  'SYS-MSG-QUEUES-000': {
    fallbackText: 'Fila Ponto a Ponto competindo por mensagens vs Fan-out Pub/Sub entregando cópia para múltiplos assinantes.'
  },
  'SYS-MSG-QUEUES-001': {
    fallbackText: 'Visibility Timeout escondendo mensagem em processamento e roteamento automático para DLQ após estourar limite de retentativas.'
  },

  // === resilience-traffic/api-design-gateways ===
  'SYS-RES-APIGW-000': {
    fallbackText: 'API Gateway agregando chamadas de microsserviços e BFF customizando respostas para interfaces mobile e web.'
  },
  'SYS-RES-APIGW-001': {
    fallbackText: 'Serialização binária compacta em Protobuf sobre HTTP/2 eliminando overhead textual de JSON e headers repetitivos.'
  },

  // === resilience-traffic/fault-tolerance-resilience ===
  'SYS-RES-FAULTTOL-000': {
    fallbackText: 'Circuit Breaker interrompendo requisições instantaneamente (Open) após limite de erros para evitar sobrecarga em cascata.',
    svgGenerator: SVG_GENERATORS.circuitBreaker
  },
  'SYS-RES-FAULTTOL-001': {
    fallbackText: 'Full Jitter aleatorizando tempos de espera entre retentativas dissipando tempestades de requisições sincronizadas.'
  },

  // === resilience-traffic/load-balancing-proxies ===
  'SYS-RES-LOADBAL-000': {
    fallbackText: 'Load Balancer L4 operando por IP/Porta sem abrir payload vs L7 inspecionando cabeçalhos HTTP, cookies e rotas.'
  },
  'SYS-RES-LOADBAL-001': {
    fallbackText: 'Algoritmo Least Connections distribuindo conexões para o servidor com menor número de sessões ativas.'
  },

  // === resilience-traffic/rate-limiting-throttling ===
  'SYS-RES-RATELIMIT-000': {
    fallbackText: 'Token Bucket permitindo rajadas até a capacidade máxima vs Leaky Bucket liberando vazão estritamente constante.',
    svgGenerator: SVG_GENERATORS.rateLimiterTokenBucket
  },
  'SYS-RES-RATELIMIT-001': {
    fallbackText: 'Janela deslizante com Redis Sorted Set contando elementos com timestamp acima de (now - window) em script Lua atômico.',
    svgGenerator: SVG_GENERATORS.rateLimiterTokenBucket
  },

  // === resilience-traffic/service-mesh-discovery ===
  'SYS-RES-MESH-000': {
    fallbackText: 'Proxies Envoy Sidecar interceptando todo tráfego leste-oeste coordenados pelas políticas do Control Plane Istiod.'
  },
  'SYS-RES-MESH-001': {
    fallbackText: 'Criptografia mTLS de ponta a ponta com certificados X.509 validados bilateralmente entre microsserviços.'
  },

  // === system-design-foundations/back-of-the-envelope-estimations ===
  'SYS-FND-ESTIMATION-000': {
    fallbackText: 'Comparação visual de latências de hardware: L1 Cache (0.5ns), RAM (100ns), SSD (100µs), Network RTT (150ms).'
  },
  'SYS-FND-ESTIMATION-001': {
    fallbackText: 'Cálculo de dimensionamento convertendo DAU para QPS médio, pico de tráfego e armazenamento para 5 anos.'
  },
  'SYS-FND-ESTIMATION-002': {
    fallbackText: 'Tabela de noves de disponibilidade: de 99.9% (8.7 horas de downtime/ano) a 99.999% (5 minutos de downtime/ano).'
  },

  // === system-design-foundations/system-design-interview-framework ===
  'SYS-FND-FRAMEWORK-000': {
    fallbackText: 'Framework em 4 etapas: 1. Escopo e Requisitos, 2. Arquitetura em Alto Nível, 3. Deep Dive, 4. Gargalos e Escala.'
  },
  'SYS-FND-FRAMEWORK-001': {
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
  if (!mediaConfig || !mediaConfig.videoUrl) {
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
