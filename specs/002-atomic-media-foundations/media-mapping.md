# Priority Multimedia Mapping & Visual Asset Catalog

**Feature**: `002-atomic-media-foundations` | **Date**: 2026-08-18  
**Task**: T015 (User Story 2: High-Impact Multimedia Upgrade)  
**Status**: Completed / Ready for Injection (T016, T017, T018)

---

## 1. Overview & Dual Coding Taxonomy

Para maximizar a retenção mnemônica e o processamento cognitivo simultâneo (verbal + visual), o baralho adota uma hierarquia estrita de 3 níveis de mídia:

| Nível de Mídia | Formato Tecnológico | Casos de Uso Prioritários | Requisitos Técnicos |
|---|---|---|---|
| **P1 - Micro-Vídeo em Loop** | `<video autoplay loop muted playsinline>` | Processos dinâmicos temporais, transições de estado, fluxos de pacotes e algoritmos de busca. | 3 a 15 segundos, silencioso, WebM/MP4 sobre HTTPS seguro ou asset local, responsivo 100% largura. |
| **P2 - SVG Vetorial Responsivo** | `<svg viewBox="..." width="100%" height="auto">` | Estruturas de dados estáticas, topologias distribuídas, máquinas de estado e diagramas de blocos. | Declarativo inline, `viewBox` responsivo, cores semânticas compatíveis com dark mode (`#18181b`, `#27272a`, `#10b981`, `#3b82f6`, `#f59e0b`, `#f43f5e`). |
| **P3 - Tabela Markdown Compacta** | Markdown Table ($\le 3$ colunas) | Resumos tabulares comparativos rápidos, trade-offs assintóticos e matrizes de decisão. | No máximo 3 colunas, badges de complexidade KaTeX ($O(1)$, $O(N)$), sempre complementando ou servindo de fallback. |

---

## 2. Priority Subtopic Visual Mappings

### 2.1 Árvores & Estruturas Hierárquicas (DSA / Storage)

#### Subtópicos Mapeados:
- **`trees-bst`**: Árvores Binárias de Busca & Auto-Balanceamento (AVL / Red-Black)
- **`advanced-trees`**: Segment Trees, Fenwick Trees (BIT) e B-Trees / B+ Trees
- **`trie-prefix-tree`**: Tries, Busca por Prefixo e Radix Trees
- **`heaps-priority-queues`**: Min-Heaps, Max-Heaps e Operações de Heapify

#### Especificação de Mídia:
- **Cards Alvo**: `DSA-STRUCT-TREE-000` a `DSA-STRUCT-TREE-005`, `DSA-STRUCT-ADVTREE-000` a `005`, `DSA-STRUCT-TRIE-000` a `005`, `DSA-STRUCT-HEAP-000` a `005`
- **Mídia Primária**: **DUAL (Micro-Vídeo P1 + SVG Vetorial P2)**
- **Conceito Visual**:
  - **Rotações AVL (LL, RR, LR, RL)**: Demonstração vetorial e em micro-vídeo de 3 trocas de ponteiros $O(1)$ que reequilibram a altura para $O(\log N)$ preservando a invariante BST ($Z < X < T_2 < Y < T_3$).
  - **Trie Path Traversal**: Representação de árvore de caracteres com nós marcadores de fim de palavra (`isEndOfWord = true`).
  - **Heap Sift-Down / Sift-Up**: Borbulhamento de nós com trocas de pai/filho no vetor contíguo indexado.

---

### 2.2 Grafos & Algoritmos de Exploração (DSA)

#### Subtópicos Mapeados:
- **`graph-algorithms-core`**: Algoritmo de Dijkstra, Bellman-Ford, Ordenação Topológica (Kahn / DFS)
- **`bfs-shortest-path`**: Busca em Largura e Expansão de Fronteira por Níveis
- **`dfs-backtracking`**: Busca em Profundidade e Árvore de Estados com Poda
- **`disjoint-set-union`**: Estrutura Union-Find / DSU com Compressão de Caminhos e União por Rank

#### Especificação de Mídia:
- **Cards Alvo**: `DSA-PAT-GRAPH-000` a `005`, `DSA-PAT-BFS-000` a `005`, `DSA-PAT-DFS-000` a `005`, `DSA-STRUCT-DSU-000` a `005`
- **Mídia Primária**: **DUAL (Micro-Vídeo P1 + SVG Vetorial P2)**
- **Conceito Visual**:
  - **Relaxamento de Arestas no Dijkstra**: Visualização de extração do nó $U$ com menor distância no Min-Heap e atualização de $dist[v] = \min(dist[v], dist[u] + w)$.
  - **Compressão de Caminho DSU**: Flattening da árvore de apontadores diretamente para o nó raiz representativo durante a chamada recursiva de `find(x)`.
  - **Fronteira de Onda BFS**: Visualização da expansão concêntrica em matrizes/grafos usando fila FIFO $O(V + E)$.

---

### 2.3 Redes de Computadores & Protocolos de Transporte (CS Fundamentals)

#### Subtópicos Mapeados:
- **`tcp-udp-transport`**: TCP 3-Way Handshake, TCP 4-Way Teardown, Janela Deslizante e Controle de Congestionamento
- **`http-protocols`**: HTTP/1.1 Pipelining vs HTTP/2 Multiplexing vs HTTP/3 QUIC (UDP)
- **`dns-tls`**: Resolução Recursiva DNS e Handshake Criptográfico TLS 1.3 (ECDHE)

#### Especificação de Mídia:
- **Cards Alvo**: `CS-NET-TCP-000` a `004`, `CS-NET-HTTP-000` a `003`, `CS-NET-DNS-000` a `002`
- **Mídia Primária**: **DUAL (Micro-Vídeo P1 + SVG Vetorial P2)**
- **Conceito Visual**:
  - **TCP 3-Way Handshake**: Sequência temporal `SYN (ISN_c)` $\to$ `SYN-ACK (ISN_s, ISN_c + 1)` $\to$ `ACK (ISN_s + 1)` com transição de estados `SYN_SENT` $\to$ `ESTABLISHED`.
  - **Janela Deslizante (Sliding Window)**: Buffers de transmissão com bytes confirmados (*Acked*), em trânsito (*Flight*) e utilizáveis (*Usable Window*).
  - **TLS 1.3 1-RTT Handshake**: Troca simultânea de parâmetros Diffie-Hellman na mensagem `ClientHello` reduzindo a latência de handshake pela metade em relação ao TLS 1.2.

---

### 2.4 Sistemas Operacionais, Memória & Runtimes (CS Fundamentals)

#### Subtópicos Mapeados:
- **`memory-management-virtual-memory`**: Memória Virtual, Paginação, TLB (Translation Lookaside Buffer) e Page Faults
- **`processes-threads-concurrency`**: Ciclo de Vida de Processos, Context Switching e Escalonamento
- **`cpu-cache-locality`**: Cache Lines (64 bytes), Coerência de Cache MESI e False Sharing
- **`garbage-collection-internals`**: Garbage Collection Generacional e Abstração Tri-Color (White, Grey, Black)
- **`runtime-threading-async`**: Escalonador Go GMP (Goroutines, OS Threads, Logical Processors) & Work Stealing

#### Especificação de Mídia:
- **Cards Alvo**: `CS-OS-MEM-000` a `005`, `CS-OS-PROC-000` a `005`, `CS-OS-CACHE-000` a `005`, `CS-RUN-GC-000` a `003`, `CS-RUN-ASYNC-000` a `003`
- **Mídia Primária**: **DUAL (Micro-Vídeo P1 + SVG Vetorial P2)**
- **Conceito Visual**:
  - **Tradução de Endereço Virtual**: Split do endereço virtual em *Virtual Page Number (VPN)* e *Offset*, verificação de cache na TLB (Hit vs Miss) e busca na Page Table de múltiplos níveis.
  - **Máquina de Estados de Processo**: Transições entre `NEW` $\to$ `READY` $\to$ `RUNNING` $\to$ `WAITING/BLOCKED` $\to$ `TERMINATED`.
  - **Coerência de Cache e False Sharing**: Duas threads em cores distintos alterando variáveis adjacentes que residem na mesma linha de cache de 64 bytes.

---

### 2.5 Caches, Topologias & Armazenamento (System Design)

#### Subtópicos Mapeados:
- **`caching-patterns`**: Cache-Aside, Write-Through, Write-Back, Write-Around e Políticas LRU / LFU
- **`sharding-consistent-hashing`**: Consistent Hashing com Nós Virtuais (Virtual Nodes)
- **`lsm-trees-nosql-storage`**: Arquitetura LSM-Tree (MemTable, WAL, SSTables, Bloom Filters e Leveled Compaction)
- **`b-trees-relational-storage`**: B+ Tree Page Structure, Nós Folha Encadeados e Clustered Index

#### Especificação de Mídia:
- **Cards Alvo**: `SYS-CACHE-PATTERNS-000` a `001`, `SYS-DIST-SHARDING-000` a `001`, `SYS-STORAGE-LSM-000` a `001`, `SYS-STORAGE-BTREE-000` a `001`
- **Mídia Primária**: **DUAL (Micro-Vídeo P1 + SVG Vetorial P2)**
- **Conceito Visual**:
  - **Fluxo do Padrão Cache-Aside**: Sequência de 4 passos na leitura com Cache Miss e escrita com invalidação direta.
  - **Anel de Consistent Hashing**: Círculo de $0$ a $2^{32}-1$ com distribuição de chaves e réplicas virtuais que evitam re-hashing em massa quando um nó entra ou sai.
  - **LSM-Tree Write Pipeline**: Ingestão sequencial no Write-Ahead Log (WAL) e MemTable em memória $\to$ Flush para SSTables imutáveis no disco com Bloom Filter para buscas rápidas.

---

### 2.6 Consistência, Replicação & Consenso Distribuído (System Design)

#### Subtópicos Mapeados:
- **`consensus-replication`**: Algoritmo de Consenso Raft (Eleição de Líder, Heartbeats e Replicação de Log)
- **`cap-pacelc-consistency`**: Teorema CAP, PACELC e Espectro de Consistência
- **`distributed-transactions`**: Two-Phase Commit (2PC) e Padrão Saga (Orquestração vs Coreografia)
- **`time-clocks-id-generation`**: Relógios Lógicos de Lamport, Vector Clocks e Gerador Snowflake de 64 bits

#### Especificação de Mídia:
- **Cards Alvo**: `SYS-DIST-CONSENSUS-000` a `002`, `SYS-DIST-CONSISTENCY-000` a `002`, `SYS-DIST-TX-000` a `002`, `SYS-DIST-TIME-000` a `002`
- **Mídia Primária**: **DUAL (Micro-Vídeo P1 + SVG Vetorial P2)**
- **Conceito Visual**:
  - **Eleição de Líder no Raft**: Transição de `Follower` para `Candidate` ao expirar o *Election Timeout* randômico $\to$ Broadcast de `RequestVote` $\to$ Conquista de quórum majoritário ($\lfloor N/2 \rfloor + 1$) $\to$ Transição para `Leader` emitindo *AppendEntries Heartbeats*.
  - **Two-Phase Commit (2PC)**: Fase de Preparação (`Prepare` $\to$ `Vote Commit/Abort`) e Fase de Confirmação (`Global Commit/Abort`).
  - **Vector Clocks**: Atualização de vetores multidimensionais para detecção precisa de eventos causais e escritas concorrentes conflitantes.

---

### 2.7 Apache Kafka, Mensageria & Streaming (System Design)

#### Subtópicos Mapeados:
- **`kafka-internals`**: Particionamento de Tópicos, Consumer Groups, Offsets e Zero-Copy
- **`delivery-guarantees-idempotency`**: Semântica de Entrega Exactly-Once (EOS), Produtor Idempotente e Deduplicação
- **`event-sourcing-cqrs`**: Event Store Imutável, Event Handlers e Projeções de Leitura
- **`rate-limiting-throttling`**: Token Bucket, Leaky Bucket e Sliding Window Counter

#### Especificação de Mídia:
- **Cards Alvo**: `SYS-MSG-KAFKA-000` a `001`, `SYS-MSG-DELIVERY-000` a `001`, `SYS-MSG-CQRS-000` a `001`, `SYS-RESIL-RATELIMIT-000` a `001`
- **Mídia Primária**: **DUAL (Micro-Vídeo P1 + SVG Vetorial P2)**
- **Conceito Visual**:
  - **Partições do Kafka e Consumer Groups**: Distribuição balanceada de partições exclusivas por consumidor dentro de um mesmo grupo e preservação de ordem estrita por chave de partição.
  - **Token Bucket vs Leaky Bucket**: Recarga de tokens a uma taxa constante $R$ permitindo rajadas até a capacidade $B$ vs escoamento contínuo uniforme.
  - **Event Sourcing & CQRS**: Segregação estrita entre comandos de escrita que produzem eventos no Event Store e consultas rápidas sobre visualizações materializadas no Read DB.

---

### 2.8 Resiliência, SRE & Estratégias de Deploy

#### Subtópicos Mapeados:
- **`fault-tolerance-resilience`**: Circuit Breakers, Retries com Exponential Backoff & Jitter e Bulkheads
- **`deployment-strategies`**: Blue/Green, Canary Releases, Rolling Updates e Feature Flags
- **`metrics-logs-traces`**: Os 3 Pilares da Observabilidade e Distributed Tracing Waterfall
- **`testing-pyramid-backend`**: Proporções da Pirâmide de Testes (Unit, Integration, Contract, E2E)

#### Especificação de Mídia:
- **Cards Alvo**: `SYS-RESIL-FAULT-000` a `001`, `BEH-SEC-DEPLOY-000` a `004`, `BEH-SRE-PILARS-000` a `005`, `BEH-SEC-PYRAMID-000` a `004`
- **Mídia Primária**: **SVG Vetorial Responsivo P2**
- **Conceito Visual**:
  - **Máquina de Estados do Circuit Breaker**: Estados `CLOSED` (100% tráfego) $\to$ `OPEN` (Fail-fast imediato) $\to$ `HALF-OPEN` (Canary probes controlados) $\to$ `CLOSED`.
  - **Transição Blue/Green vs Canary**: Divisão percentual de tráfego no Load Balancer/Router direcionando gradualmente 10% $\to$ 25% $\to$ 100% dos usuários.
  - **Cascata de Rastreamento Distribuído (Distributed Trace)**: Spans hierárquicos com `trace_id` correlacionado entre API Gateway, Auth Service e Database Query.

---

## 3. Matriz Consolidada de Execução para Tasks Subsequentes

| Subtópico | Fase | Tipo de Mídia | Arquivo Gerador / SVG | Task Vinculada |
|---|---|---|---|---|
| `trees-bst` | DSA (Phase 1) | DUAL (Vídeo + SVG) | `SVG_GENERATORS.avlRotations` | **T016** |
| `advanced-trees` | DSA (Phase 1) | SVG P2 | `SVG_GENERATORS.avlRotations` | **T016** |
| `graph-algorithms-core` | DSA (Phase 1) | DUAL (Vídeo + SVG) | `SVG_GENERATORS.dijkstraRelaxation` | **T016** |
| `disjoint-set-union` | DSA (Phase 1) | SVG P2 | `SVG_GENERATORS.dsuCompression` | **T016** |
| `tcp-udp-transport` | CS (Phase 2) | DUAL (Vídeo + SVG) | `SVG_GENERATORS.tcpHandshake` | **T017** |
| `http-protocols` | CS (Phase 2) | SVG P2 | `SVG_GENERATORS.httpMultiplex` | **T017** |
| `memory-management-virtual-memory` | CS (Phase 2) | DUAL (Vídeo + SVG) | `SVG_GENERATORS.virtualMemory` | **T017** |
| `caching-patterns` | System Design (Phase 3) | DUAL (Vídeo + SVG) | `SVG_GENERATORS.cacheAsidePattern` | **T018** |
| `sharding-consistent-hashing` | System Design (Phase 3) | SVG P2 | `SVG_GENERATORS.consistentHashing` | **T018** |
| `consensus-replication` | System Design (Phase 3) | DUAL (Vídeo + SVG) | `SVG_GENERATORS.raftConsensus` | **T018** |
| `kafka-internals` | System Design (Phase 3) | DUAL (Vídeo + SVG) | `SVG_GENERATORS.kafkaPartitioning` | **T018** |
| `fault-tolerance-resilience` | System Design (Phase 3) | SVG P2 | `SVG_GENERATORS.circuitBreaker` | **T018** |
| `deployment-strategies` | Behavioral/SRE (Phase 4) | SVG P2 | `SVG_GENERATORS.canaryDeploy` | **T018** |

---

## 4. Conclusão

O mapeamento dos tópicos prioritários exigido pela **Task 15 (T015)** está formalmente estabelecido, documentado e implementado programaticamente em `src/utils/media-catalog.js`. As especificações aqui definidas desbloqueiam a injeção multimídia direta nas tasks T016 (DSA), T017 (CS Fundamentals) e T018 (System Design & SRE).
