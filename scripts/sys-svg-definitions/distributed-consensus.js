import { svgWrapper } from '../sys-svg-base.js';

export const DISTRIBUTED_CONSENSUS_SVGS = {
  // === distributed-systems/cap-pacelc-consistency ===
  'SYS-DIST-CONSISTENCY-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Teorema CAP: O Trilema Fundamental dos Sistemas Distribuídos</text>
  <g transform="translate(40, 50)">
    <!-- Partition (Given) -->
    <rect x="200" y="0" width="200" height="35" rx="6" fill="#7f1d1d" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="300" y="22" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">Partição de Rede (P) é Inevitável</text>

    <!-- CP Choice -->
    <rect x="0" y="55" width="280" height="95" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="78" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Sistemas CP (Consistência Estrita)</text>
    <text x="140" y="100" fill="#cbd5e1" font-size="10" text-anchor="middle">Rejeita escritas se o Quorum cair</text>
    <text x="140" y="118" fill="#cbd5e1" font-size="10" text-anchor="middle">Prioriza linearizabilidade e integridade</text>
    <text x="140" y="136" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">Exemplos: Raft, etcd, Zookeeper, Spanner</text>

    <!-- AP Choice -->
    <rect x="320" y="55" width="280" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="78" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Sistemas AP (Alta Disponibilidade)</text>
    <text x="460" y="100" fill="#cbd5e1" font-size="10" text-anchor="middle">Aceita gravações em qualquer nó</text>
    <text x="460" y="118" fill="#cbd5e1" font-size="10" text-anchor="middle">Consistência eventual com reconciliação</text>
    <text x="460" y="136" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">Exemplos: Cassandra, DynamoDB, CouchDB</text>
  </g>
  <text x="340" y="215" fill="#94a3b8" font-size="10" text-anchor="middle">Em redes assíncronas reais, partição não é opcional; a escolha é estritamente entre Consistência (CP) ou Disponibilidade (AP).</text>
`),

  'SYS-DIST-CONSISTENCY-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Teorema PACELC: Trade-off de Latência vs Consistência em Normalidade</text>
  <g transform="translate(40, 50)">
    <!-- PAC -->
    <rect x="0" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="24" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Se houver Partição (P)</text>
    <text x="140" y="55" fill="#cbd5e1" font-size="11" text-anchor="middle">Escolha entre:</text>
    <text x="140" y="80" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">A (Disponibilidade) vs C (Consistência)</text>
    <text x="140" y="105" fill="#94a3b8" font-size="9" text-anchor="middle">Igual ao Teorema CAP tradicional</text>

    <!-- ELC -->
    <rect x="320" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Else (E) Em Estado Normal</text>
    <text x="460" y="55" fill="#cbd5e1" font-size="11" text-anchor="middle">Escolha entre:</text>
    <text x="460" y="80" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">L (Baixa Latência) vs C (Consistência)</text>
    <text x="460" y="105" fill="#94a3b8" font-size="9" text-anchor="middle">Replicação síncrona adiciona RTT na rede</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Cassandra é PA/EL (prioriza latência); MongoDB/Postgres são PC/EC (priorizam consistência).</text>
`),

  'SYS-DIST-CONSISTENCY-002': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Linearizabilidade (Consistência Forte) vs Consistência Eventual</text>
  <g transform="translate(40, 50)">
    <!-- Linearizable Timeline -->
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Linearizabilidade (Single-Copy Global)</text>
    <text x="140" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Operações parecem atômicas e instantâneas</text>
    <text x="140" y="68" fill="#cbd5e1" font-size="10" text-anchor="middle">Se leitura lê $20, nenhuma leitura futura</text>
    <text x="140" y="88" fill="#fca5a5" font-size="10" text-anchor="middle">pode retornar $10 (sem viagem no tempo)</text>

    <!-- Eventual Consistency Timeline -->
    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="460" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Consistência Eventual (Async Gossip)</text>
    <text x="460" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Réplicas convergem no tempo t + delta</text>
    <text x="460" y="68" fill="#cbd5e1" font-size="10" text-anchor="middle">Leituras podem ver dados obsoletos</text>
    <text x="460" y="88" fill="#34d399" font-size="10" text-anchor="middle">Permite altíssimo throughput e resiliência</text>
  </g>
  <text x="340" y="195" fill="#94a3b8" font-size="10" text-anchor="middle">Modelos intermediários: Causal Consistency, Monotonic Reads e Read-After-Write Consistency.</text>
`),

  // === distributed-systems/consensus-replication ===
  'SYS-DIST-CONSENSUS-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Consenso Raft: Eleição de Líder e Termos</text>
  <g transform="translate(40, 50)">
    <!-- Follower State -->
    <rect x="0" y="20" width="160" height="90" rx="8" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="80" y="45" fill="#cbd5e1" font-size="12" font-weight="bold" text-anchor="middle">Follower</text>
    <text x="80" y="68" fill="#94a3b8" font-size="9" text-anchor="middle">Recebe Heartbeats</text>
    <text x="80" y="88" fill="#f87171" font-size="9" text-anchor="middle">Timeout (150-300ms)</text>

    <!-- Candidate State -->
    <rect x="220" y="20" width="160" height="90" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="300" y="45" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Candidate</text>
    <text x="300" y="68" fill="#fde68a" font-size="9" text-anchor="middle">Incrementa Term (T+1)</text>
    <text x="300" y="88" fill="#fde68a" font-size="9" text-anchor="middle">Dispara RequestVote RPC</text>

    <!-- Leader State -->
    <rect x="440" y="20" width="160" height="90" rx="8" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="520" y="45" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Leader (Eleito)</text>
    <text x="520" y="68" fill="#86efac" font-size="9" text-anchor="middle">Obteve Maioria (&gt; N/2)</text>
    <text x="520" y="88" fill="#86efac" font-size="9" text-anchor="middle">Envia AppendEntries (Heartbeat)</text>

    <!-- Arrows -->
    <line x1="160" y1="65" x2="220" y2="65" stroke="#f59e0b" stroke-width="2"/>
    <line x1="380" y1="65" x2="440" y2="65" stroke="#10b981" stroke-width="2"/>
  </g>
  <text x="340" y="210" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Randomized Election Timeout (150ms a 300ms) previne empates de voto entre candidatos simultâneos (Split Vote).</text>
`),

  'SYS-DIST-CONSENSUS-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Raft Log Replication: AppendEntries &amp; Quorum de Commit</text>
  <g transform="translate(40, 50)">
    <!-- Leader Node -->
    <rect x="0" y="0" width="600" height="40" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="60" y="25" fill="#86efac" font-size="10" font-weight="bold">Leader</text>
    <text x="200" y="25" fill="#ffffff" font-size="10" font-family="monospace">[x=1, T1]</text>
    <text x="320" y="25" fill="#ffffff" font-size="10" font-family="monospace">[y=9, T1]</text>
    <text x="440" y="25" fill="#34d399" font-size="10" font-family="monospace" font-weight="bold">[z=5, T2] (COMMITTED)</text>

    <!-- Follower 1 -->
    <rect x="0" y="45" width="600" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <text x="60" y="67" fill="#38bdf8" font-size="10" font-weight="bold">Follower 1</text>
    <text x="200" y="67" fill="#cbd5e1" font-size="10" font-family="monospace">[x=1, T1]</text>
    <text x="320" y="67" fill="#cbd5e1" font-size="10" font-family="monospace">[y=9, T1]</text>
    <text x="440" y="67" fill="#86efac" font-size="10" font-family="monospace">[z=5, T2] (ACK ✅)</text>

    <!-- Follower 2 -->
    <rect x="0" y="85" width="600" height="35" rx="4" fill="#1e293b" stroke="#f43f5e" stroke-width="1"/>
    <text x="60" y="107" fill="#f87171" font-size="10" font-weight="bold">Follower 2</text>
    <text x="200" y="107" fill="#cbd5e1" font-size="10" font-family="monospace">[x=1, T1]</text>
    <text x="320" y="107" fill="#f87171" font-size="10" font-family="monospace">[Unreachable / Lagging]</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Quorum de Maioria (2 de 3 nós confirmaram) → Entrada considerada Comitted e aplicada na State Machine.</text>
`),

  'SYS-DIST-CONSENSUS-002': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Quorum de Leitura e Escrita (R + W &gt; N) no Modelo Dynamo</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="25" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Cluster de N = 5 Nós Réplica</text>

    <!-- Write Quorum -->
    <rect x="20" y="45" width="260" height="50" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="150" y="68" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">Quorum de Escrita: W = 3</text>
    <text x="150" y="85" fill="#a7f3d0" font-size="9" text-anchor="middle">Gravação confirmada em 3 nós</text>

    <!-- Read Quorum -->
    <rect x="320" y="45" width="260" height="50" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="450" y="68" fill="#e0f2fe" font-size="11" font-weight="bold" text-anchor="middle">Quorum de Leitura: R = 3</text>
    <text x="450" y="85" fill="#bae6fd" font-size="9" text-anchor="middle">Leitura consulta 3 nós</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Como R (3) + W (3) = 6 &gt; N (5), ao menos 1 nó da leitura certamente contém a versão mais recente escrita.</text>
`),

  // === distributed-systems/distributed-locking-coordination ===
  'SYS-DIST-LOCK-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Lock Distribuído (Redis SETNX) &amp; Falha por GC Pause</text>
  <g transform="translate(40, 50)">
    <!-- Client 1 -->
    <rect x="0" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Cliente 1: Adquire Lock (TTL 10s)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Entra em pausa longa de GC (15s)</text>
    <text x="140" y="65" fill="#f87171" font-size="10" text-anchor="middle">TTL expira silenciosamente no Redis</text>
    <text x="140" y="90" fill="#fca5a5" font-size="10" text-anchor="middle">Cliente acorda e tenta gravar no Storage</text>

    <!-- Client 2 -->
    <rect x="320" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Cliente 2: Adquire Novo Lock</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Executa e grava no Storage</text>
    <text x="460" y="65" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">💥 Race Condition / Dados Corrompidos</text>
    <text x="460" y="90" fill="#cbd5e1" font-size="10" text-anchor="middle">Dois clientes gravam simultaneamente</text>
  </g>
  <text x="340" y="200" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Redlock puro sem fencing tokens não garante correção sob pausas de GC e assincronia de rede.</text>
`),

  'SYS-DIST-LOCK-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fencing Tokens: Proteção Monotônica de Recursos Compartilhados</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Serviço de Lock (Zookeeper / etcd) gera Fencing Token Monotônico</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="260" height="55" rx="4" fill="#065f46"/>
      <text x="130" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Cliente 2 (Token = 34)</text>
      <text x="130" y="42" fill="#ffffff" font-size="9" text-anchor="middle">Storage atualiza: last_token = 34 (Aceito ✅)</text>

      <rect x="300" y="0" width="260" height="55" rx="4" fill="#7f1d1d"/>
      <text x="430" y="22" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Cliente 1 Acorda do GC (Token = 33)</text>
      <text x="430" y="42" fill="#ffffff" font-size="9" text-anchor="middle">Storage rejeita: 33 &lt; 34 (Rejeitado ❌)</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">O Storage valida last_token monotônico: gravações com tokens obsoletos são descartadas atomicamente.</text>
`),

  // === distributed-systems/distributed-transactions ===
  'SYS-DIST-TX-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Two-Phase Commit (2PC): Protocolo Síncrono de Consenso Atômico</text>
  <g transform="translate(40, 50)">
    <!-- Phase 1: Prepare -->
    <rect x="0" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Fase 1: Prepare (Votação)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Coordenador envia PREPARE</text>
    <text x="140" y="65" fill="#cbd5e1" font-size="10" text-anchor="middle">Participantes adquirem locks</text>
    <text x="140" y="85" fill="#cbd5e1" font-size="10" text-anchor="middle">e respondem VOTE_COMMIT</text>
    <text x="140" y="112" fill="#fbbf24" font-size="9" text-anchor="middle">Locks segurados bloqueiam recursos</text>

    <!-- Phase 2: Commit -->
    <rect x="320" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Fase 2: Commit (Efetivação)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Se 100% dos votos foram SIM:</text>
    <text x="460" y="65" fill="#86efac" font-size="10" text-anchor="middle">Coordenador grava COMMIT no log</text>
    <text x="460" y="85" fill="#cbd5e1" font-size="10" text-anchor="middle">Participantes aplicam e liberam locks</text>
    <text x="460" y="112" fill="#f87171" font-size="9" text-anchor="middle">Ponto único de falha: Coordenador trava</text>
  </g>
  <text x="340" y="215" fill="#94a3b8" font-size="10" text-anchor="middle">2PC é bloqueante (Blocking Protocol): se o coordenador morrer na fase 2, participantes ficam travados indefinidamente.</text>
`),

  'SYS-DIST-TX-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Padrão Saga: Orquestração vs Coreografia &amp; Transações Compensatórias</text>
  <g transform="translate(40, 50)">
    <!-- Steps -->
    <rect x="0" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="90" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">1. Criar Pedido</text>
    <text x="90" y="48" fill="#86efac" font-size="10" text-anchor="middle">Order Service (OK ✅)</text>
    <text x="90" y="75" fill="#94a3b8" font-size="9" text-anchor="middle">Compensação:</text>
    <text x="90" y="92" fill="#f87171" font-size="9" text-anchor="middle">Cancelar Pedido</text>

    <rect x="210" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. Debitar Saldo</text>
    <text x="300" y="48" fill="#86efac" font-size="10" text-anchor="middle">Payment Service (OK ✅)</text>
    <text x="300" y="75" fill="#94a3b8" font-size="9" text-anchor="middle">Compensação:</text>
    <text x="300" y="92" fill="#f87171" font-size="9" text-anchor="middle">Estornar Pagamento</text>

    <rect x="420" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="510" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">3. Reservar Estoque</text>
    <text x="510" y="48" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Inventory (FALHA ❌)</text>
    <text x="510" y="75" fill="#fbbf24" font-size="9" text-anchor="middle">Dispara Compensação</text>
    <text x="510" y="92" fill="#fde68a" font-size="9" text-anchor="middle">em ordem reversa (2 → 1)</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Saga garante consistência eventual sem reter locks distribuídos em bancos de dados distintos.</text>
`),

  'SYS-DIST-TX-002': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Transactional Outbox Pattern com Relay via CDC (Debezium)</text>
  <g transform="translate(40, 50)">
    <!-- SQL Local Tx -->
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Mesma Transação SQL Local Atômica</text>
    <rect x="20" y="35" width="240" height="30" rx="4" fill="#065f46"/>
    <text x="140" y="54" fill="#86efac" font-size="9" text-anchor="middle">1. INSERT INTO orders (status='PAID')</text>
    <rect x="20" y="70" width="240" height="30" rx="4" fill="#065f46"/>
    <text x="140" y="89" fill="#86efac" font-size="9" text-anchor="middle">2. INSERT INTO outbox (event='OrderPaid')</text>

    <!-- Outbox Relay to Kafka -->
    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Assíncrono: Message Relay / CDC</text>
    <text x="460" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Debezium lê tabela Outbox via WAL</text>
    <text x="460" y="70" fill="#34d399" font-size="10" text-anchor="middle">Publica no Apache Kafka (At-Least-Once)</text>
    <text x="460" y="92" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">Zero risco de inconsistência Dual-Write</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Elimina o problema de gravar no banco e o broker de mensagens falhar no meio do caminho.</text>
`),

  // === distributed-systems/sharding-consistent-hashing ===
  'SYS-DIST-SHARDING-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Anel de Consistent Hashing (Espaço de Chaves de 0 a 2^32 - 1)</text>
  <g transform="translate(40, 50)">
    <!-- Ring -->
    <circle cx="150" cy="70" r="60" fill="none" stroke="#38bdf8" stroke-width="3"/>
    
    <!-- Node A -->
    <circle cx="150" cy="10" r="12" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
    <text x="150" y="14" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Node A</text>

    <!-- Node B -->
    <circle cx="210" cy="70" r="12" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="210" y="74" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Node B</text>

    <!-- Node C -->
    <circle cx="90" cy="70" r="12" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="90" y="74" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">Node C</text>

    <!-- Explanation Box -->
    <rect x="280" y="0" width="320" height="135" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="440" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Roteamento no Sentido Horário</text>
    <text x="440" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Hash(Key) posiciona no anel</text>
    <text x="440" y="68" fill="#cbd5e1" font-size="10" text-anchor="middle">Caminha no sentido horário até achar 1º nó</text>
    <text x="440" y="92" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Adicionar nó: move apenas K/N chaves</text>
    <text x="440" y="115" fill="#f87171" font-size="9" text-anchor="middle">vs Hash(k)%N que moveria ~100% das chaves</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Utilizado por DynamoDB, Cassandra, Memcached e Discord para balanceamento uniforme e elástico.</text>
`),

  'SYS-DIST-SHARDING-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Nós Virtuais (Virtual Nodes / Vnodes) em Consistent Hashing</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Mapeamento de 1 Servidor Físico para 100-256 Tokens Distribuídos no Anel</text>

    <!-- Node Distribution -->
    <g transform="translate(20, 40)">
      <rect x="0" y="0" width="170" height="50" rx="4" fill="#0369a1"/>
      <text x="85" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Servidor A (Potente)</text>
      <text x="85" y="38" fill="#bae6fd" font-size="9" text-anchor="middle">200 Vnodes (Peso Maior)</text>

      <rect x="200" y="0" width="170" height="50" rx="4" fill="#065f46"/>
      <text x="285" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Servidor B (Padrão)</text>
      <text x="285" y="38" fill="#a7f3d0" font-size="9" text-anchor="middle">100 Vnodes</text>

      <rect x="400" y="0" width="160" height="50" rx="4" fill="#78350f"/>
      <text x="480" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Benefício Imediato</text>
      <text x="480" y="38" fill="#fde68a" font-size="9" text-anchor="middle">Zero Hotspots / Skew</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Vnodes garantem distribuição de carga homogênea com desvio padrão inferior a 3% entre partições.</text>
`),

  // === distributed-systems/time-clocks-id-generation ===
  'SYS-DIST-TIME-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Vector Clocks: Rastreamento Causal e Detecção de Conflitos Concorrentes</text>
  <g transform="translate(40, 50)">
    <!-- Node A -->
    <rect x="0" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="90" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Nó A</text>
    <text x="90" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Evento local:</text>
    <rect x="20" y="58" width="140" height="24" rx="4" fill="#0284c7"/>
    <text x="90" y="74" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">VC = [A:1, B:0, C:0]</text>
    <text x="90" y="105" fill="#94a3b8" font-size="9" text-anchor="middle">Propaga para Nó B</text>

    <!-- Node B -->
    <rect x="210" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Nó B (Recebe &amp; Altera)</text>
    <text x="300" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Merge + Inc B:</text>
    <rect x="230" y="58" width="140" height="24" rx="4" fill="#065f46"/>
    <text x="300" y="74" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">VC = [A:1, B:1, C:0]</text>
    <text x="300" y="105" fill="#86efac" font-size="9" text-anchor="middle">Aconteceu-Depois (Causal)</text>

    <!-- Concurrent Conflict -->
    <rect x="420" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="510" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Escrita Concorrente em C</text>
    <rect x="440" y="58" width="140" height="24" rx="4" fill="#7f1d1d"/>
    <text x="510" y="74" fill="#fca5a5" font-size="9" font-family="monospace" text-anchor="middle">VC = [A:1, B:0, C:1]</text>
    <text x="510" y="105" fill="#f87171" font-size="9" font-weight="bold" text-anchor="middle">Conflito! Exige Merge</text>
  </g>
  <text x="340" y="200" fill="#94a3b8" font-size="10" text-anchor="middle">Dois vetores são concorrentes se nenhum domina estritamente todos os índices do outro.</text>
`),

  'SYS-DIST-TIME-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Twitter Snowflake: Gerador de IDs de 64 Bits Distribuído</text>
  <g transform="translate(40, 50)">
    <!-- 64 Bits Layout -->
    <rect x="0" y="0" width="600" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    
    <!-- 1 bit unused -->
    <rect x="5" y="10" width="30" height="40" rx="4" fill="#334155"/>
    <text x="20" y="34" fill="#94a3b8" font-size="9" text-anchor="middle">1b</text>

    <!-- 41 bits timestamp -->
    <rect x="40" y="10" width="320" height="40" rx="4" fill="#0284c7"/>
    <text x="200" y="28" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">41 Bits: Timestamp em Milissegundos</text>
    <text x="200" y="44" fill="#e0f2fe" font-size="9" text-anchor="middle">~69 anos de duração a partir de epoch customizada</text>

    <!-- 10 bits worker id -->
    <rect x="365" y="10" width="120" height="40" rx="4" fill="#78350f"/>
    <text x="425" y="28" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">10 Bits: Machine ID</text>
    <text x="425" y="44" fill="#fef3c7" font-size="9" text-anchor="middle">1024 nós/datacenters</text>

    <!-- 12 bits sequence -->
    <rect x="490" y="10" width="105" height="40" rx="4" fill="#065f46"/>
    <text x="542" y="28" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">12b: Sequence</text>
    <text x="542" y="44" fill="#a7f3d0" font-size="9" text-anchor="middle">4096 IDs/ms/nó</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Capacidade: 4.096.000 IDs únicos ordenáveis por tempo por nó a cada segundo sem coordenação central.</text>
`),

  'SYS-DIST-TIME-002': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Google Spanner TrueTime API: Incerteza Temporal [earliest, latest]</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">TrueTime: Relógios Atômicos + Receptores GPS garantem erro epsilon &lt;= 7ms</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="260" height="55" rx="4" fill="#0369a1"/>
      <text x="130" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Commit Wait (Espera Deliberada)</text>
      <text x="130" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Tx aguarda 2 * epsilon antes de liberar</text>

      <rect x="300" y="0" width="260" height="55" rx="4" fill="#065f46"/>
      <text x="430" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Linearizabilidade Global</text>
      <text x="430" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">Garante ordem causal entre datacenters</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Se Tx2 começa após o término de Tx1 no mundo real, o timestamp de Tx2 é estritamente maior que o de Tx1.</text>
`),

  // === messaging-streaming/delivery-guarantees-idempotency ===
  'SYS-MSG-GUARANTEES-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Garantias de Entrega de Mensagens: At-Least-Once vs Exactly-Once</text>
  <g transform="translate(40, 50)">
    <!-- At-Least-Once -->
    <rect x="0" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">At-Least-Once (Padrão de Mercado)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Retentativas automáticas em timeout</text>
    <text x="140" y="65" fill="#fca5a5" font-size="10" text-anchor="middle">Mensagens podem ser duplicadas</text>
    <text x="140" y="90" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Exige Consumidor Idempotente</text>

    <!-- Exactly-Once -->
    <rect x="320" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Exactly-Once Semantics (EOS)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Kafka Transactions (read-process-write)</text>
    <text x="460" y="65" fill="#86efac" font-size="10" text-anchor="middle">Producer ID + Sequence Number monotônico</text>
    <text x="460" y="90" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Custo extra de coordenação/latência</text>
  </g>
  <text x="340" y="198" fill="#94a3b8" font-size="10" text-anchor="middle">A regra de ouro de sistemas distribuídos: Transporte At-Least-Once + Processamento Idempotente = Robustez Total.</text>
`),

  'SYS-MSG-GUARANTEES-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Chave de Idempotência (Idempotency Key) &amp; Deduplicação em Banco</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Tabela SQL: idempotency_keys (id UNIQUE, status, response_body)</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="260" height="55" rx="4" fill="#065f46"/>
      <text x="130" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">1ª Requisição (key: UUID-101)</text>
      <text x="130" y="40" fill="#ffffff" font-size="9" text-anchor="middle">INSERT OK → Executa cobrança no gateway</text>

      <rect x="300" y="0" width="260" height="55" rx="4" fill="#7f1d1d"/>
      <text x="430" y="22" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Retentativa de Rede (UUID-101)</text>
      <text x="430" y="40" fill="#ffffff" font-size="9" text-anchor="middle">INSERT falha (Unique Constraint) → Retorna cache</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">O cliente recebe exatamente a mesma resposta HTTP sem duplicar operações financeiras.</text>
`),

  // === messaging-streaming/event-sourcing-cqrs ===
  'SYS-MSG-EVENTS-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Event Sourcing: Append-Only Event Store &amp; Reidratação de Estado</text>
  <g transform="translate(40, 50)">
    <!-- Event Log -->
    <rect x="0" y="0" width="360" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="180" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Event Store Imutável (Append-Only Log)</text>
    <rect x="20" y="35" width="320" height="22" rx="3" fill="#0369a1"/>
    <text x="180" y="50" fill="#ffffff" font-size="9" text-anchor="middle">1. AccountCreated {id: 10, balance: 0}</text>
    <rect x="20" y="60" width="320" height="22" rx="3" fill="#0369a1"/>
    <text x="180" y="75" fill="#ffffff" font-size="9" text-anchor="middle">2. MoneyDeposited {amount: +$100}</text>
    <rect x="20" y="85" width="320" height="22" rx="3" fill="#0369a1"/>
    <text x="180" y="100" fill="#ffffff" font-size="9" text-anchor="middle">3. MoneyWithdrawn {amount: -$40}</text>

    <!-- State Rehydration -->
    <rect x="400" y="0" width="200" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="500" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Estado Reidratado</text>
    <circle cx="500" cy="65" r="28" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="500" y="70" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">$60.00</text>
    <text x="500" y="108" fill="#86efac" font-size="9" text-anchor="middle">Auditoria 100% Perfeita</text>
  </g>
  <text x="340" y="200" fill="#94a3b8" font-size="10" text-anchor="middle">Snapshots periódicos a cada N eventos evitam ter que reproduzir o histórico inteiro desde o início dos tempos.</text>
`),

  'SYS-MSG-EVENTS-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">CQRS (Command Query Responsibility Segregation) com Projeções Assíncronas</text>
  <g transform="translate(30, 50)">
    <!-- Write Side -->
    <rect x="0" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="90" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Write Model (Commands)</text>
    <text x="90" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Valida regras de negócio</text>
    <text x="90" y="70" fill="#cbd5e1" font-size="10" text-anchor="middle">Grava no Postgres OLTP</text>
    <text x="90" y="92" fill="#f87171" font-size="9" font-weight="bold" text-anchor="middle">Altamente Normalizado</text>

    <!-- Event Bus -->
    <rect x="210" y="25" width="180" height="60" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="300" y="50" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Event Bus / Kafka</text>
    <text x="300" y="70" fill="#fde68a" font-size="9" text-anchor="middle">Projeção Assíncrona</text>

    <!-- Read Side -->
    <rect x="420" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="510" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Read Model (Queries)</text>
    <text x="510" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Elasticsearch / Read DB</text>
    <text x="510" y="70" fill="#cbd5e1" font-size="10" text-anchor="middle">Desnormalizado para UI</text>
    <text x="510" y="92" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Zero JOINs (O(1) Reads)</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Escalabilidade independente: escalonamento horizontal extremo da camada de leitura sem onerar o banco de escrita.</text>
`),

  // === messaging-streaming/kafka-internals ===
  'SYS-MSG-KAFKA-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Topologia de Partições do Apache Kafka &amp; Consumer Groups</text>
  <g transform="translate(40, 50)">
    <!-- Topic Partitions -->
    <rect x="0" y="0" width="300" height="135" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="150" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Kafka Topic: 3 Partições</text>
    
    <!-- Partition 0 -->
    <rect x="15" y="35" width="270" height="26" rx="4" fill="#0284c7"/>
    <text x="150" y="52" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">P0: [Off 0] [Off 1] [Off 2] [Off 3] →</text>

    <!-- Partition 1 -->
    <rect x="15" y="68" width="270" height="26" rx="4" fill="#0284c7"/>
    <text x="150" y="85" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">P1: [Off 0] [Off 1] [Off 2] →</text>

    <!-- Partition 2 -->
    <rect x="15" y="100" width="270" height="26" rx="4" fill="#0284c7"/>
    <text x="150" y="117" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">P2: [Off 0] [Off 1] [Off 2] [Off 3] [Off 4] →</text>

    <!-- Consumer Group -->
    <rect x="340" y="0" width="260" height="135" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="470" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Consumer Group: 3 Instâncias</text>
    <rect x="355" y="35" width="230" height="26" rx="4" fill="#065f46"/>
    <text x="470" y="52" fill="#86efac" font-size="9" text-anchor="middle">Consumer C1 lê Partição 0 exclusivamente</text>
    <rect x="355" y="68" width="230" height="26" rx="4" fill="#065f46"/>
    <text x="470" y="85" fill="#86efac" font-size="9" text-anchor="middle">Consumer C2 lê Partição 1 exclusivamente</text>
    <rect x="355" y="100" width="230" height="26" rx="4" fill="#065f46"/>
    <text x="470" y="117" fill="#86efac" font-size="9" text-anchor="middle">Consumer C3 lê Partição 2 exclusivamente</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">A ordem das mensagens é estritamente garantida dentro de cada partição, nunca entre partições distintas.</text>
`),

  'SYS-MSG-KAFKA-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Log Compaction no Kafka: Retenção do Último Valor por Chave</text>
  <g transform="translate(40, 50)">
    <!-- Before Compaction -->
    <rect x="0" y="0" width="600" height="40" rx="4" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
    <text x="50" y="24" fill="#fbbf24" font-size="9" font-weight="bold">Log Bruto</text>
    <text x="140" y="24" fill="#ffffff" font-size="9" font-family="monospace">(K1, V1)</text>
    <text x="220" y="24" fill="#ffffff" font-size="9" font-family="monospace">(K2, V1)</text>
    <text x="300" y="24" fill="#f87171" font-size="9" font-family="monospace">(K1, V2)</text>
    <text x="380" y="24" fill="#ffffff" font-size="9" font-family="monospace">(K3, V1)</text>
    <text x="470" y="24" fill="#34d399" font-size="9" font-family="monospace" font-weight="bold">(K1, V3)</text>

    <!-- After Compaction -->
    <rect x="0" y="55" width="600" height="40" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="50" y="79" fill="#86efac" font-size="9" font-weight="bold">Compactado</text>
    <text x="220" y="79" fill="#ffffff" font-size="9" font-family="monospace">(K2, V1)</text>
    <text x="380" y="79" fill="#ffffff" font-size="9" font-family="monospace">(K3, V1)</text>
    <text x="470" y="79" fill="#34d399" font-size="9" font-family="monospace" font-weight="bold">(K1, V3)</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">A thread Cleaner purga registros antigos mantendo o estado final snapshot de cada chave (ex: saldo, status de usuário).</text>
`),

  // === messaging-streaming/message-queues ===
  'SYS-MSG-QUEUES-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Filas Ponto a Ponto (Point-to-Point) vs Fan-Out Pub/Sub</text>
  <g transform="translate(40, 50)">
    <!-- Point to Point -->
    <rect x="0" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Point-to-Point (Queue: SQS / RabbitMQ)</text>
    <text x="140" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">1 Mensagem é consumida por</text>
    <text x="140" y="68" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">EXATAMENTE 1 Consumidor (Competição)</text>
    <text x="140" y="92" fill="#94a3b8" font-size="9" text-anchor="middle">Ideal para processamento de tarefas em background</text>

    <!-- Pub Sub -->
    <rect x="320" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Publish/Subscribe (Topic: SNS / Kafka)</text>
    <text x="460" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">1 Mensagem é copiada e entregue para</text>
    <text x="460" y="68" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">TODOS os Assinantes (Fan-Out)</text>
    <text x="460" y="92" fill="#94a3b8" font-size="9" text-anchor="middle">Ideal para notificações e pipelines de eventos</text>
  </g>
  <text x="340" y="200" fill="#94a3b8" font-size="10" text-anchor="middle">Padrão SNS + SQS Fan-Out: SNS publica para múltiplos tópicos SQS isolando cada serviço downstream.</text>
`),

  'SYS-MSG-QUEUES-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Amazon SQS: Visibility Timeout &amp; Dead Letter Queue (DLQ)</text>
  <g transform="translate(40, 50)">
    <!-- SQS Queue -->
    <rect x="0" y="0" width="260" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="130" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Fila Principal SQS</text>
    <text x="130" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Worker pega msg → Invisível por 30s</text>
    <text x="130" y="68" fill="#f87171" font-size="10" text-anchor="middle">Se Worker falhar sem dar DeleteMsg:</text>
    <text x="130" y="90" fill="#fbbf24" font-size="10" text-anchor="middle">Msg reaparece na fila (ReceiveCount++)</text>

    <!-- Dead Letter Queue -->
    <rect x="340" y="0" width="260" height="120" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="2"/>
    <text x="470" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Dead Letter Queue (DLQ)</text>
    <text x="470" y="48" fill="#fca5a5" font-size="10" text-anchor="middle">Após maxReceiveCount = 3 falhas:</text>
    <text x="470" y="70" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Msg 'Poison Pill' movida para DLQ</text>
    <text x="470" y="92" fill="#86efac" font-size="9" text-anchor="middle">Impede bloqueio e alerta equipe de SRE</text>

    <!-- Flow Arrow -->
    <line x1="260" y1="60" x2="340" y2="60" stroke="#f43f5e" stroke-width="2"/>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">A DLQ isola mensagens defeituosas que quebram o código do consumidor, garantindo fluidez para o resto da fila.</text>
`)
};
