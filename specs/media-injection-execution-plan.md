# 📋 Plano de Execução Sequencial: Injeção Contextual e Validação E2E de Mídias

Este documento define o roteiro granular de tarefas sequenciais para a **Fase 2: Injeção Contextual e Validação E2E de Mídias**, processando as entradas de `media-curation-registry.json` e incorporando-as aos flashcards em `decks/` de forma criteriosa e individualizada.

---

## 🎯 Diretrizes Obrigatórias de Injeção

1. **Análise Individualizada Card a Card**:
   - Cada card do subtópico alvo deve ser inspecionado individualmente no arquivo markdown correspondente.
   - Avaliar os componentes visuais já existentes (`<svg>`, `<table>`, `<video>`).
   - Se o card já possuir um diagrama SVG altamente didático e customizado para o seu conceito específico, **não substitua** cegamente; avalie se o micro-vídeo/GIF agrega movimento indispensável ou se o SVG deve ser mantido.
   - Uma mídia curada no registro pode ser injetada em 1 card, em N cards do mesmo subtópico, ou em 0 cards se os cards já contiverem representações superiores.

2. **Rastreamento de Tópicos e IDs**:
   - Utilize a hierarquia canônica em `syllabus_manifest.json` (`phases -> modules -> subtopics -> card_ids`) e `src/utils/media-catalog.js` para filtrar exatamente os arquivos e IDs pertinentes ao subtópico.
   - Nunca injete uma mídia em cards cujo conceito indivisível não tenha aderência direta à visualização.

3. **Sintaxe Canônica de Injeção**:
   - **Mídia P1 (GIF / Micro-vídeo)**:
     ```html
     <img src="URL_VALIDADA_HTTPS" alt="Legenda contextualizada" style="max-width: 100%; height: auto; border-radius: 8px; margin: 12px 0;" />
     <p>Visualização: [Explicação contextualizada do dinamismo do conceito]</p>
     ```
     *(ou tag `<video autoplay loop muted playsinline>` para arquivos MP4/WebM)*
   - **Diagrama P2 (SVG Responsivo)**:
     ```html
     <svg viewBox="0 0 680 260" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
       <!-- Elementos semânticos do diagrama -->
     </svg>
     <p>Visualização: [Explicação contextualizada da topologia]</p>
     ```

4. **Atualização do Registro**:
   - Ao injetar uma mídia com sucesso, atualize o `status` do card em `media-curation-registry.json` de `"pending_injection"` para `"verified"`.

5. **Garantia de Qualidade & Testes E2E**:
   - Após cada lote de injeção, executar:
     - `npm test`: Validação estrita de schema e ausência de domínios proibidos.
     - `npm run test:e2e` / Playwright runner: Teste de renderização, visual snapshots e integridade do layout mobile (`360x640`, `390x844`) e desktop.

---

## 🗂️ Roteiro de Tarefas Sequenciais

### 📦 Bloco 1: DSA (Estruturas de Dados & Algoritmos — 180 Cards)

- [x] **TASK-DSA-01**: Injeção e Análise em `arrays-strings` (Cards `DSA-STRUCT-ARRAY-000` a `006`)
- [x] **TASK-DSA-02**: Injeção e Análise em `linked-lists` (Cards `DSA-STRUCT-LIST-000` a `006`)
- [x] **TASK-DSA-03**: Injeção e Análise em `stacks-queues` e `monotonic-stack-queue` (Cards `DSA-STRUCT-STACK-000` a `006` e `DSA-PATT-MONOSTACK-000` a `006`)
- [x] **TASK-DSA-04**: Injeção e Análise em `trees-bst` e `advanced-trees` (Cards `DSA-STRUCT-TREE-000` a `006` e `DSA-STRUCT-ADVTREE-000` a `006`)
- [x] **TASK-DSA-05**: Injeção e Análise em `heaps-priority-queues` (Cards `DSA-STRUCT-HEAP-000` a `006`)
- [x] **TASK-DSA-06**: Injeção e Análise em `hash-tables` e `trie-prefix-tree` (Cards `DSA-STRUCT-HASH-000` a `006` e `DSA-STRUCT-TRIE-000` a `006`)
- [x] **TASK-DSA-07**: Injeção e Análise em `graphs-representations` e `disjoint-set-union` (Cards `DSA-STRUCT-GRAPH-000` a `006` e `DSA-STRUCT-DSU-000` a `006`)
- [x] **TASK-DSA-08**: Injeção e Análise em `bfs-dfs-traversals`, `shortest-path-algorithms`, `topological-sort` e `minimum-spanning-tree` (Cards `DSA-PATT-TRAVERSAL`, `DSA-PATT-SPATH`, `DSA-PATT-TOPO`, `DSA-PATT-MST`)
- [x] **TASK-DSA-09**: Injeção e Análise em Padrões: `two-pointers`, `sliding-window`, `binary-search`, `backtracking`, `intervals-merge` e `divide-and-conquer-sorting` (Cards `DSA-PATT-2POINT`, `SLIDE`, `BSEARCH`, `BACKTRACK`, `INTERVAL`, `DIVCONQ`)
- [x] **TASK-DSA-10**: Injeção e Análise em DP e Avançados: `dynamic-programming-1d`, `2d`, `advanced`, `greedy-algorithms`, `bit-manipulation-patterns`, `concurrent-data-structures`, `string-matching`, `sweepline-geometry`, `game-theory-math`

---

### 📦 Bloco 2: CS Fundamentals (Fundamentos de Computação — 97 Cards)

- [x] **TASK-CS-01**: Injeção e Análise em Arquitetura: `cpu-cache`, `cpu-internals-isa`, `storage-io-hierarchy`, `pipelining-branch-prediction` (Cards `CS-ARCH-*`)
- [x] **TASK-CS-02**: Injeção e Análise em Matemática Discreta: `boolean-logic`, `combinatorics-probability`, `graph-theory`, `number-representation-ieee754` (Cards `CS-MATH-*`)
- [x] **TASK-CS-03**: Injeção e Análise em Redes: `tcp-udp-transport`, `http-protocols`, `dns-tls`, `modern-apis-protocols`, `socket-io-epoll` (Cards `CS-NET-*`)
- [x] **TASK-CS-04**: Injeção e Análise em Sistemas Operacionais & Memória: `virtual-memory`, `processes-threads`, `synchronization-primitives`, `lock-free-atomics`, `linux-kernel-process-management`, `linux-io-syscalls`, `ipc-inter-process-communication` (Cards `CS-OS-*`)
- [x] **TASK-CS-05**: Injeção e Análise em Runtimes: `go-runtime-gc`, `jvm-memory-gc`, `memory-allocation-escape-analysis` (Cards `CS-RNT-*`)

---

### 📦 Bloco 3: System Design & Backend (Arquitetura Distribuída — 94 Cards)

- [x] **TASK-SYS-01**: Injeção e Análise em Caching: `caching-patterns`, `cache-invalidation-anomalies`, `cdn-edge-caching`, `redis-internals` (Cards `SYS-CACHE-*`)
- [x] **TASK-SYS-02**: Injeção e Análise em Banco de Dados: `acid-isolation-levels`, `nosql-data-modeling`, `scaling-replication-cdc`, `sql-indexing-optimization`, `storage-engines`, `vector-databases-search` (Cards `SYS-DB-*`)
- [x] **TASK-SYS-03**: Injeção e Análise em Sistemas Distribuídos & Consenso: `cap-pacelc-consistency`, `consensus-replication`, `distributed-locking-coordination`, `distributed-transactions`, `sharding-consistent-hashing`, `time-clocks-id-generation` (Cards `SYS-DIST-*`)
- [x] **TASK-SYS-04**: Injeção e Análise em Arquétipos FAANG: `case-distributed-file-storage`, `task-scheduler`, `flash-sale`, `metrics-monitoring`, `payment-system-ledger`, `realtime-chat`, `ride-hailing`, `search-autocomplete`, `social-timeline-feed`, `url-shortener`, `video-streaming`, `web-crawler-search` (Cards `SYS-ARCH-*`)
- [x] **TASK-SYS-05**: Injeção e Análise em LLD, Mensageria & Resiliência: `concurrency-patterns-backend`, `design-patterns-gang-of-four`, `lld-case-studies`, `solid-clean-architecture`, `delivery-guarantees-idempotency`, `event-sourcing-cqrs`, `kafka-internals`, `message-queues`, `api-design-gateways`, `fault-tolerance-resilience`, `load-balancing-proxies`, `rate-limiting-throttling`, `service-mesh-discovery` (Cards `SYS-LLD-*`, `SYS-MSG-*`, `SYS-RES-*`)
- [x] **TASK-SYS-06**: Injeção e Análise em Fundamentos de Entrevista: `back-of-the-envelope-estimations`, `system-design-interview-framework` (Cards `SYS-FND-*`)

---

### 📦 Bloco 4: Validação Global & E2E Sanity

- [x] **TASK-VAL-01**: Execução da suíte de validação estrita (`node test/validate-cards.test.js`)
- [x] **TASK-VAL-02**: Auditoria de links e geração do relatório (`node src/utils/link-checker.js`)
- [x] **TASK-VAL-03**: Validação visual E2E com Playwright em viewports mobile e desktop
