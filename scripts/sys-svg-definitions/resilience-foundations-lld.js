import { svgWrapper } from '../sys-svg-base.js';

export const RESILIENCE_FOUNDATIONS_LLD_SVGS = {
  // === low-level-design/concurrency-patterns-backend ===
  'SYS-LLD-CONCURRENCY-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Worker Pool em Go: Bounded Channels &amp; Controle Fixo de Goroutines</text>
  <g transform="translate(40, 50)">
    <!-- Task Queue -->
    <rect x="0" y="20" width="160" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="80" y="42" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Jobs Channel</text>
    <text x="80" y="65" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">jobs := make(chan Job, 100)</text>
    <text x="80" y="85" fill="#86efac" font-size="9" text-anchor="middle">Buffer finito limita RAM</text>

    <!-- 3 Fixed Workers -->
    <g transform="translate(200, 0)">
      <rect x="0" y="0" width="180" height="36" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="90" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Worker 1 (Goroutine fixa)</text>

      <rect x="0" y="45" width="180" height="36" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="90" y="67" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Worker 2 (Goroutine fixa)</text>

      <rect x="0" y="90" width="180" height="36" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="90" y="112" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Worker 3 (Goroutine fixa)</text>
    </g>

    <!-- Results Channel -->
    <rect x="420" y="20" width="160" height="90" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="500" y="42" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Results Channel</text>
    <text x="500" y="65" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">results &lt;- process(job)</text>
    <text x="500" y="85" fill="#86efac" font-size="9" text-anchor="middle">sync.WaitGroup sincroniza</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Evita o antipadrão 'go func()' descontrolado que causa OOM e sobrecarga do Go Runtime Scheduler.</text>
`),

  'SYS-LLD-CONCURRENCY-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Padrão Fan-Out / Fan-In: Processamento Paralelo e Agregação</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="30" width="130" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="65" y="55" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1 Input Stream</text>
    <text x="65" y="72" fill="#cbd5e1" font-size="9" text-anchor="middle">10.000 itens</text>

    <!-- Fan-out lines -->
    <g transform="translate(160, 0)">
      <rect x="0" y="0" width="140" height="30" rx="4" fill="#0284c7"/>
      <text x="70" y="20" fill="#ffffff" font-size="10" text-anchor="middle">Worker Branch A</text>

      <rect x="0" y="45" width="140" height="30" rx="4" fill="#0284c7"/>
      <text x="70" y="65" fill="#ffffff" font-size="10" text-anchor="middle">Worker Branch B</text>

      <rect x="0" y="90" width="140" height="30" rx="4" fill="#0284c7"/>
      <text x="70" y="110" fill="#ffffff" font-size="10" text-anchor="middle">Worker Branch C</text>
    </g>

    <!-- Fan-in multiplexer -->
    <rect x="340" y="25" width="240" height="70" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="460" y="50" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Fan-In Multiplexer</text>
    <text x="460" y="70" fill="#86efac" font-size="9" text-anchor="middle">Consolida múltiplos canais em 1 único canal de saída</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Utiliza sync.WaitGroup para fechar o canal de saída de forma segura somente após todos os workers terminarem.</text>
`),

  // === low-level-design/design-patterns-gang-of-four ===
  'SYS-LLD-PATTERNS-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Padrão Strategy + Factory: Eliminação de Switch Cases Gigantes</text>
  <g transform="translate(40, 50)">
    <!-- Factory -->
    <rect x="0" y="20" width="160" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="80" y="42" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">PaymentFactory</text>
    <text x="80" y="65" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">GetStrategy(type)</text>
    <text x="80" y="85" fill="#86efac" font-size="9" text-anchor="middle">Instanciação dinâmica</text>

    <!-- Interface -->
    <rect x="200" y="20" width="180" height="90" rx="6" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="290" y="45" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">&lt;&lt;interface&gt;&gt; PaymentStrategy</text>
    <text x="290" y="72" fill="#e0f2fe" font-size="10" font-family="monospace" text-anchor="middle">+ Pay(amount) error</text>

    <!-- Concrete Strategies -->
    <g transform="translate(420, 0)">
      <rect x="0" y="0" width="160" height="34" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="80" y="22" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">CreditCardStrategy</text>

      <rect x="0" y="42" width="160" height="34" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="80" y="64" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">PixPaymentStrategy</text>

      <rect x="0" y="84" width="160" height="34" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="80" y="106" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">CryptoPaymentStrategy</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Adesão perfeita ao Open/Closed Principle (OCP): novos métodos de pagamento são adicionados sem alterar código existente.</text>
`),

  'SYS-LLD-PATTERNS-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Padrão Decorator (Composição de Middleware) vs Adapter (Conversão de Interface)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Decorator (Cadeia de Comportamentos)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Mantém a mesma interface</text>
    <text x="140" y="65" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">Logging(Auth(RateLimit(Handler)))</text>
    <text x="140" y="88" fill="#34d399" font-size="9" text-anchor="middle">Envelopa dinamicamente em camadas</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Adapter (Compatibilização)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Converte interface incompatível</text>
    <text x="460" y="65" fill="#e0f2fe" font-size="9" font-family="monospace" text-anchor="middle">LegacyStripeAPI → ModernPaymentGateway</text>
    <text x="460" y="88" fill="#38bdf8" font-size="9" text-anchor="middle">Permite interoperabilidade sem reescrever legado</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Decorator adiciona responsabilidade sem herança; Adapter traduz uma assinatura de método em outra.</text>
`),

  // === low-level-design/lld-case-studies ===
  'SYS-LLD-CASES-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">LLD Case Study: Sistema de Estacionamento Orientado a Objetos (Parking Lot)</text>
  <g transform="translate(40, 50)">
    <!-- ParkingLot Hierarchy -->
    <rect x="0" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="90" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">ParkingLot (Singleton)</text>
    <text x="90" y="45" fill="#cbd5e1" font-size="9" text-anchor="middle">- List&lt;ParkingFloor&gt;</text>
    <text x="90" y="65" fill="#cbd5e1" font-size="9" text-anchor="middle">- EntrancePanels</text>
    <text x="90" y="85" fill="#cbd5e1" font-size="9" text-anchor="middle">- ExitPanels</text>
    <text x="90" y="105" fill="#86efac" font-size="9" text-anchor="middle">+ AssignTicket(Vehicle)</text>

    <!-- ParkingSpot Hierarchy -->
    <rect x="210" y="0" width="180" height="120" rx="6" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="300" y="22" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">&lt;&lt;abstract&gt;&gt; ParkingSpot</text>
    <text x="300" y="45" fill="#e0f2fe" font-size="9" text-anchor="middle">- CompactSpot</text>
    <text x="300" y="65" fill="#e0f2fe" font-size="9" text-anchor="middle">- LargeSpot (Trucks)</text>
    <text x="300" y="85" fill="#e0f2fe" font-size="9" text-anchor="middle">- ElectricSpot (Charger)</text>
    <text x="300" y="105" fill="#86efac" font-size="9" text-anchor="middle">+ IsFree() / Occupy()</text>

    <!-- Pricing Strategy -->
    <rect x="420" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="510" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">PricingStrategy</text>
    <text x="510" y="45" fill="#cbd5e1" font-size="9" text-anchor="middle">- HourlyPricing</text>
    <text x="510" y="65" fill="#cbd5e1" font-size="9" text-anchor="middle">- DynamicSurgePricing</text>
    <text x="510" y="85" fill="#cbd5e1" font-size="9" text-anchor="middle">- FlatRatePricing</text>
    <text x="510" y="105" fill="#34d399" font-size="9" text-anchor="middle">+ CalculateFee(Ticket)</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Separação estrita de responsabilidades: concorrência protegida por Mutex por vaga ou andar.</text>
`),

  'SYS-LLD-CASES-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">LLD Case Study: Cache Thread-Safe em Memória com TTL e Evicção LRU</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Estrutura Concorrente: sync.RWMutex + Map + Doubly-Linked List</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="170" height="55" rx="4" fill="#0369a1"/>
      <text x="85" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">RLock() para Get(key)</text>
      <text x="85" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Múltiplos leitores concorrentes</text>

      <rect x="195" y="0" width="170" height="55" rx="4" fill="#78350f"/>
      <text x="280" y="22" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Lock() para Set/Evict</text>
      <text x="280" y="40" fill="#ffffff" font-size="9" text-anchor="middle">Escrita exclusiva O(1)</text>

      <rect x="390" y="0" width="170" height="55" rx="4" fill="#065f46"/>
      <text x="475" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Cleanup Goroutine</text>
      <text x="475" y="40" fill="#ffffff" font-size="9" text-anchor="middle">Purga chaves expiradas por TTL</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Sharded Cache (ex: 32 partições de locks independentes) reduz contenção de threads em 96%.</text>
`),

  // === low-level-design/solid-clean-architecture ===
  'SYS-LLD-SOLID-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Princípios SOLID em Engenharia de Software Moderna (FAANG Standards)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="110" height="110" rx="4" fill="#0284c7"/>
    <text x="55" y="35" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">S</text>
    <text x="55" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Single</text>
    <text x="55" y="75" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Responsibility</text>
    <text x="55" y="95" fill="#e0f2fe" font-size="8" text-anchor="middle">1 motivo p/ mudar</text>

    <rect x="120" y="0" width="110" height="110" rx="4" fill="#0369a1"/>
    <text x="175" y="35" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">O</text>
    <text x="175" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Open /</text>
    <text x="175" y="75" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Closed</text>
    <text x="175" y="95" fill="#e0f2fe" font-size="8" text-anchor="middle">Extensão vs Edição</text>

    <rect x="240" y="0" width="110" height="110" rx="4" fill="#075985"/>
    <text x="295" y="35" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">L</text>
    <text x="295" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Liskov</text>
    <text x="295" y="75" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Substitution</text>
    <text x="295" y="95" fill="#e0f2fe" font-size="8" text-anchor="middle">Subtipos compatíveis</text>

    <rect x="360" y="0" width="110" height="110" rx="4" fill="#065f46"/>
    <text x="415" y="35" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">I</text>
    <text x="415" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Interface</text>
    <text x="415" y="75" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Segregation</text>
    <text x="415" y="95" fill="#a7f3d0" font-size="8" text-anchor="middle">Interfaces enxutas</text>

    <rect x="480" y="0" width="110" height="110" rx="4" fill="#047857"/>
    <text x="535" y="35" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">D</text>
    <text x="535" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Dependency</text>
    <text x="535" y="75" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Inversion</text>
    <text x="535" y="95" fill="#a7f3d0" font-size="8" text-anchor="middle">Depender de abstrações</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">DIP é o alicerce da Arquitetura Hexagonal: o domínio central nunca importa pacotes de infraestrutura.</text>
`),

  'SYS-LLD-SOLID-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Arquitetura Hexagonal (Ports &amp; Adapters / Clean Architecture)</text>
  <g transform="translate(40, 50)">
    <!-- Adapters In -->
    <rect x="0" y="20" width="140" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="70" y="45" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Primary Adapters</text>
    <text x="70" y="65" fill="#cbd5e1" font-size="9" text-anchor="middle">HTTP Controller</text>
    <text x="70" y="85" fill="#cbd5e1" font-size="9" text-anchor="middle">gRPC / CLI Handler</text>

    <!-- Domain Core -->
    <rect x="180" y="0" width="240" height="120" rx="8" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="300" y="32" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Domain Core (Puro)</text>
    <text x="300" y="55" fill="#ffffff" font-size="10" text-anchor="middle">Entities &amp; Use Cases</text>
    <text x="300" y="75" fill="#86efac" font-size="9" text-anchor="middle">&lt;&lt;interface&gt;&gt; Input / Output Ports</text>
    <text x="300" y="98" fill="#a7f3d0" font-size="9" text-anchor="middle">Zero dependência externa</text>

    <!-- Adapters Out -->
    <rect x="460" y="20" width="140" height="80" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="530" y="45" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Secondary Adapters</text>
    <text x="530" y="65" fill="#cbd5e1" font-size="9" text-anchor="middle">PostgresRepository</text>
    <text x="530" y="85" fill="#cbd5e1" font-size="9" text-anchor="middle">KafkaEventPublisher</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">A inversão de controle permite trocar o banco de dados Postgres por MongoDB sem encostar em 1 linha de Use Case.</text>
`),

  // === resilience-traffic/api-design-gateways ===
  'SYS-RES-APIGW-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">API Gateway Pattern &amp; Backend for Frontend (BFF)</text>
  <g transform="translate(30, 50)">
    <!-- Clients -->
    <g transform="translate(0, 10)">
      <rect x="0" y="0" width="110" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
      <text x="55" y="22" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">Mobile iOS/Android</text>

      <rect x="0" y="55" width="110" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
      <text x="55" y="77" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">Desktop Web App</text>
    </g>

    <!-- BFF Layer -->
    <g transform="translate(150, 0)">
      <rect x="0" y="0" width="150" height="45" rx="6" fill="#0284c7"/>
      <text x="75" y="24" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">BFF Mobile Gateway</text>
      <text x="75" y="38" fill="#bae6fd" font-size="8" text-anchor="middle">Payload compacto / 5G</text>

      <rect x="0" y="60" width="150" height="45" rx="6" fill="#0284c7"/>
      <text x="75" y="84" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">BFF Web Gateway</text>
      <text x="75" y="98" fill="#bae6fd" font-size="8" text-anchor="middle">Payload rico desnormalizado</text>
    </g>

    <!-- Microservices -->
    <g transform="translate(350, 0)">
      <rect x="0" y="0" width="250" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
      <text x="125" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Microsserviços Internos</text>
      <text x="125" y="48" fill="#86efac" font-size="9" text-anchor="middle">• User Service (Auth / Profile)</text>
      <text x="125" y="70" fill="#86efac" font-size="9" text-anchor="middle">• Order &amp; Payment Service</text>
      <text x="125" y="92" fill="#86efac" font-size="9" text-anchor="middle">• Inventory &amp; Catalog Service</text>
    </g>
  </g>
  <text x="340" y="198" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">O API Gateway centraliza SSL Termination, Rate Limiting, Autenticação JWT e agregação de chamadas.</text>
`),

  'SYS-RES-APIGW-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">gRPC (HTTP/2 + Protocol Buffers) vs REST (HTTP/1.1 + JSON)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">REST / JSON (Público / Edge)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Payload textual legível por humanos</text>
    <text x="140" y="65" fill="#fca5a5" font-size="10" text-anchor="middle">Overhead de parsing e headers repetidos</text>
    <text x="140" y="88" fill="#86efac" font-size="10" text-anchor="middle">Ideal para APIs públicas de terceiros</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">gRPC / Protobuf (Inter-Serviços)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Serialização binária compacta (7x menor)</text>
    <text x="460" y="65" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">HTTP/2 Multiplexing + Streaming Duplex</text>
    <text x="460" y="88" fill="#34d399" font-size="10" text-anchor="middle">Contratos estritos tipados (.proto)</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Comunicação leste-oeste (Leste-Oeste entre microsserviços) deve padronizar em gRPC para máxima eficiência de CPU.</text>
`),

  // === resilience-traffic/fault-tolerance-resilience ===
  'SYS-RES-FAULTTOL-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Máquina de Estados do Circuit Breaker: Closed, Open, Half-Open</text>
  <g transform="translate(40, 50)">
    <!-- Closed -->
    <rect x="0" y="20" width="160" height="90" rx="8" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="80" y="45" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">CLOSED (Normal)</text>
    <text x="80" y="68" fill="#86efac" font-size="9" text-anchor="middle">Requisições passam</text>
    <text x="80" y="88" fill="#a7f3d0" font-size="9" text-anchor="middle">Falhas &lt; Limite (ex: 50%)</text>

    <!-- Open -->
    <rect x="220" y="20" width="160" height="90" rx="8" fill="#7f1d1d" stroke="#f43f5e" stroke-width="2"/>
    <text x="300" y="45" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">OPEN (Interrompido)</text>
    <text x="300" y="68" fill="#fca5a5" font-size="9" text-anchor="middle">Falha rápida instantânea</text>
    <text x="300" y="88" fill="#fca5a5" font-size="9" text-anchor="middle">Sleep Window: 30s</text>

    <!-- Half-Open -->
    <rect x="440" y="20" width="160" height="90" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="520" y="45" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">HALF-OPEN (Teste)</text>
    <text x="520" y="68" fill="#fde68a" font-size="9" text-anchor="middle">Permite 3 requisições teste</text>
    <text x="520" y="88" fill="#fde68a" font-size="9" text-anchor="middle">Sucesso → Closed / Falha → Open</text>
  </g>
  <text x="340" y="210" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Evita esgotamento de threads (Cascading Failure) isolando serviços downstream degradados.</text>
`),

  'SYS-RES-FAULTTOL-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Exponential Backoff com Full Jitter: Dissipação de Tempestades de Rede</text>
  <g transform="translate(40, 50)">
    <!-- Fixed Retry (Thundering Herd) -->
    <rect x="0" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Retentativa Fixa / Sem Jitter</text>
    <text x="140" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">10.000 clientes retentam no segundo t=2s</text>
    <text x="140" y="70" fill="#fca5a5" font-size="10" text-anchor="middle">Picos de carga sincronizados</text>
    <text x="140" y="92" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Derruba o servidor que tenta se recuperar</text>

    <!-- Exponential Backoff with Full Jitter -->
    <rect x="320" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Full Jitter (AWS Architecture)</text>
    <text x="460" y="48" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">sleep = rand(0, min(cap, base * 2^attempt))</text>
    <text x="460" y="70" fill="#86efac" font-size="10" text-anchor="middle">Distribuição suave e uniforme de requisições</text>
    <text x="460" y="92" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Zero pulsos de contenção sincronizada</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Padrão obrigatório em todos os SDKs de clientes cloud resilientes.</text>
`),

  // === resilience-traffic/load-balancing-proxies ===
  'SYS-RES-LOADBAL-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Load Balancers: Camada L4 (Transporte) vs Camada L7 (Aplicação)</text>
  <g transform="translate(40, 50)">
    <!-- L4 -->
    <rect x="0" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">L4 Load Balancer (IP / Porta TCP)</text>
    <text x="140" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Não abre payload HTTP (Zero SSL decrypt)</text>
    <text x="140" y="70" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Throughput altíssimo (Milhões de QPS)</text>
    <text x="140" y="92" fill="#94a3b8" font-size="9" text-anchor="middle">Exemplos: AWS NLB, Linux IPVS, HAProxy TCP</text>

    <!-- L7 -->
    <rect x="320" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">L7 Load Balancer (HTTP / HTTPS / gRPC)</text>
    <text x="460" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Inspeciona Headers, Cookies, Path (/api/v2)</text>
    <text x="460" y="70" fill="#86efac" font-size="10" text-anchor="middle">Roteamento inteligente por URL e SSL Termination</text>
    <text x="460" y="92" fill="#94a3b8" font-size="9" text-anchor="middle">Exemplos: AWS ALB, NGINX, Envoy, Traefik</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Topologia clássica: L4 na borda distribuindo para um pool de proxies reversos L7 escalonados horizontalmente.</text>
`),

  'SYS-RES-LOADBAL-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmos de Balanceamento: Round Robin vs Least Connections vs IP Hash</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <text x="90" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Round Robin / Weighted</text>
    <text x="90" y="48" fill="#cbd5e1" font-size="9" text-anchor="middle">Distribuição sequencial circular</text>
    <text x="90" y="70" fill="#cbd5e1" font-size="9" text-anchor="middle">Assume requisições homogêneas</text>
    <text x="90" y="92" fill="#86efac" font-size="9" text-anchor="middle">Ideal para servidores idênticos</text>

    <rect x="210" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="300" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Least Connections</text>
    <text x="300" y="48" fill="#cbd5e1" font-size="9" text-anchor="middle">Envia para o nó com menor carga</text>
    <text x="300" y="70" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">Ideal para conexões longas</text>
    <text x="300" y="92" fill="#a7f3d0" font-size="9" text-anchor="middle">(WebSocket, banco, uploads)</text>

    <rect x="420" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
    <text x="510" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">IP / Consistent Hash</text>
    <text x="510" y="48" fill="#cbd5e1" font-size="9" text-anchor="middle">Hash(Client_IP) % N</text>
    <text x="510" y="70" fill="#fde68a" font-size="9" text-anchor="middle">Sticky Sessions / Local Cache</text>
    <text x="510" y="92" fill="#cbd5e1" font-size="9" text-anchor="middle">Garante mesmo nó por cliente</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Weighted Least Connections é o algoritmo padrão para tráfego heterogêneo em produção.</text>
`),

  // === resilience-traffic/rate-limiting-throttling ===
  'SYS-RES-RATELIMIT-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmos de Rate Limiting: Token Bucket vs Leaky Bucket</text>
  <g transform="translate(40, 50)">
    <!-- Token Bucket -->
    <rect x="0" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Token Bucket (Padrão AWS / Stripe)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Tokens chegam em taxa constante (r)</text>
    <text x="140" y="65" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Permite rajadas (bursts) até capacidade B</text>
    <text x="140" y="88" fill="#cbd5e1" font-size="10" text-anchor="middle">Requisição consome 1 token; se vazio: 429</text>
    <text x="140" y="112" fill="#34d399" font-size="9" text-anchor="middle">Memória O(1): salva (tokens, last_refill)</text>

    <!-- Leaky Bucket -->
    <rect x="320" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Leaky Bucket (Fila FIFO)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Requisições entram no balde com buffer</text>
    <text x="460" y="65" fill="#bae6fd" font-size="10" font-weight="bold" text-anchor="middle">Saída em vazão estritamente constante</text>
    <text x="460" y="88" fill="#f87171" font-size="10" text-anchor="middle">Elimina qualquer rajada (smooth flow)</text>
    <text x="460" y="112" fill="#cbd5e1" font-size="9" text-anchor="middle">Se buffer encher: descarta novas requisições</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Token Bucket é o mais adotado em APIs Web porque não penaliza picos legítimos de curta duração do cliente.</text>
`),

  'SYS-RES-RATELIMIT-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Rate Limiter Distribuído: Sliding Window Counter com Redis ZSet e Lua</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="300" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Script Lua Atômico: Janela Deslizante Exata de 60 Segundos</text>

    <!-- Steps -->
    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="170" height="65" rx="4" fill="#0369a1"/>
      <text x="85" y="22" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">1. ZREMRANGEBYSCORE</text>
      <text x="85" y="42" fill="#bae6fd" font-size="8" text-anchor="middle">Remove timestamps &lt; (now - 60s)</text>

      <rect x="195" y="0" width="170" height="65" rx="4" fill="#0369a1"/>
      <text x="280" y="22" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">2. ZCARD key</text>
      <text x="280" y="42" fill="#bae6fd" font-size="8" text-anchor="middle">Conta requisições na janela ativa</text>

      <rect x="390" y="0" width="170" height="65" rx="4" fill="#065f46"/>
      <text x="475" y="22" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">3. ZADD key now now</text>
      <text x="475" y="42" fill="#ffffff" font-size="8" text-anchor="middle">Se ZCARD &lt; limit: aceita / senão: 429</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Elimina o problema de borda (Boundary Burst) do contador de janela fixa que permitia 2x o limite no cruzamento do minuto.</text>
`),

  // === resilience-traffic/service-mesh-discovery ===
  'SYS-RES-MESH-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Service Mesh (Istio &amp; Envoy Sidecar): Tráfego Leste-Oeste</text>
  <g transform="translate(40, 50)">
    <!-- Pod A -->
    <rect x="0" y="0" width="260" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="130" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Kubernetes Pod A</text>
    <rect x="15" y="40" width="105" height="65" rx="4" fill="#0284c7"/>
    <text x="67" y="68" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">App Service A</text>
    <rect x="135" y="40" width="110" height="65" rx="4" fill="#78350f"/>
    <text x="190" y="68" fill="#fde68a" font-size="9" font-weight="bold" text-anchor="middle">Envoy Proxy</text>

    <!-- Pod B -->
    <rect x="340" y="0" width="260" height="120" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="470" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Kubernetes Pod B</text>
    <rect x="355" y="40" width="110" height="65" rx="4" fill="#78350f"/>
    <text x="410" y="68" fill="#fde68a" font-size="9" font-weight="bold" text-anchor="middle">Envoy Proxy</text>
    <rect x="480" y="40" width="105" height="65" rx="4" fill="#065f46"/>
    <text x="532" y="68" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">App Service B</text>

    <!-- Envoy to Envoy mTLS -->
    <line x1="245" y1="72" x2="355" y2="72" stroke="#10b981" stroke-width="2"/>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Envoy Sidecar intercepta todo tráfego via iptables: injeta Circuit Breaking, Retries, Métricas e mTLS de forma transparente.</text>
`),

  'SYS-RES-MESH-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Autenticação Zero Trust com Mutual TLS (mTLS) e Certificados SPIFFE / X.509</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Handshake mTLS Bilateral: Criptografia e Identidade Criptográfica</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="260" height="55" rx="4" fill="#0369a1"/>
      <text x="130" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">1. Client Valida Cert do Servidor</text>
      <text x="130" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Garante autenticidade do host</text>

      <rect x="300" y="0" width="260" height="55" rx="4" fill="#065f46"/>
      <text x="430" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">2. Servidor Valida Cert do Client</text>
      <text x="430" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">SPIFFE ID: spiffe://cluster/ns/prod/sa/order</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Zero Trust: nenhum pacote trafega sem criptografia e validação criptográfica mútua, mesmo dentro da rede interna.</text>
`),

  // === system-design-foundations/back-of-the-envelope-estimations ===
  'SYS-FND-ESTIMATION-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Latências de Hardware de Jeff Dean: Ordens de Grandeza</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="135" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    
    <rect x="20" y="15" width="200" height="24" rx="3" fill="#0284c7"/>
    <text x="30" y="31" fill="#ffffff" font-size="10" font-weight="bold">L1 Cache Reference</text>
    <text x="210" y="31" fill="#e0f2fe" font-size="10" text-anchor="end">0.5 ns</text>

    <rect x="20" y="43" width="260" height="24" rx="3" fill="#0369a1"/>
    <text x="30" y="59" fill="#ffffff" font-size="10" font-weight="bold">Main Memory (RAM) Reference</text>
    <text x="270" y="59" fill="#e0f2fe" font-size="10" text-anchor="end">100 ns (200x L1)</text>

    <rect x="20" y="71" width="360" height="24" rx="3" fill="#78350f"/>
    <text x="30" y="87" fill="#ffffff" font-size="10" font-weight="bold">SSD Random Read</text>
    <text x="370" y="87" fill="#fde68a" font-size="10" text-anchor="end">100.000 ns (100 µs)</text>

    <rect x="20" y="99" width="560" height="24" rx="3" fill="#7f1d1d"/>
    <text x="30" y="115" fill="#ffffff" font-size="10" font-weight="bold">Cross-Continent Round Trip (CA to Netherlands)</text>
    <text x="570" y="115" fill="#fca5a5" font-size="10" text-anchor="end">150.000.000 ns (150 ms)</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Acessar a memória RAM é 1000x mais rápido que ler do SSD e 1.500.000x mais rápido que uma chamada de rede transatlântica.</text>
`),

  'SYS-FND-ESTIMATION-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Dimensionamento Back-of-the-Envelope: QPS, Throughput e Storage para 5 Anos</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Cálculo de QPS (300M DAU)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="9" text-anchor="middle">300M * 5 req/dia = 1.5 Bilhões req/dia</text>
    <text x="140" y="65" fill="#86efac" font-size="10" font-family="monospace" text-anchor="middle">QPS Médio = 1.5B / 86.400s ≈ 17.500 QPS</text>
    <text x="140" y="90" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Pico (Peak 2x) = ~35.000 QPS</text>

    <rect x="320" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Storage para 5 Anos (100KB/post)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="9" text-anchor="middle">30M posts/dia * 100KB = 3 TB/dia</text>
    <text x="460" y="65" fill="#86efac" font-size="10" font-family="monospace" text-anchor="middle">3 TB * 365 dias = ~1.1 PB / ano</text>
    <text x="460" y="90" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Total 5 Anos = ~5.5 Petabytes</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">A regra de bolso 80-20 de Pareto: 20% das chaves geram 80% do tráfego → Memória RAM para cache de 20% do volume diário (600 GB).</text>
`),

  'SYS-FND-ESTIMATION-002': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Tabela de Noves de Disponibilidade (SLA / SLO Downtime)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <rect x="0" y="0" width="600" height="26" rx="6" fill="#0284c7"/>
    <text x="100" y="17" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Disponibilidade</text>
    <text x="300" y="17" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Downtime por Ano</text>
    <text x="500" y="17" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Downtime por Mês</text>

    <text x="100" y="44" fill="#f87171" font-size="9" text-anchor="middle">99% (Dois Noves)</text>
    <text x="300" y="44" fill="#f87171" font-size="9" text-anchor="middle">3.65 dias</text>
    <text x="500" y="44" fill="#f87171" font-size="9" text-anchor="middle">7.20 horas</text>

    <text x="100" y="66" fill="#fbbf24" font-size="9" text-anchor="middle">99.9% (Três Noves)</text>
    <text x="300" y="66" fill="#fbbf24" font-size="9" text-anchor="middle">8.76 horas</text>
    <text x="500" y="66" fill="#fbbf24" font-size="9" text-anchor="middle">43.2 minutos</text>

    <text x="100" y="88" fill="#34d399" font-size="9" text-anchor="middle">99.99% (Quatro Noves)</text>
    <text x="300" y="88" fill="#34d399" font-size="9" text-anchor="middle">52.6 minutos</text>
    <text x="500" y="88" fill="#34d399" font-size="9" text-anchor="middle">4.32 minutos</text>

    <text x="100" y="104" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">99.999% (Cinco Noves)</text>
    <text x="300" y="104" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">5.26 minutos</text>
    <text x="500" y="104" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">25.9 segundos</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Atingir 99.999% exige failover automático multi-região ativo-ativo sem intervenção humana manual.</text>
`),

  // === system-design-foundations/system-design-interview-framework ===
  'SYS-FND-FRAMEWORK-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Framework de 4 Etapas para Entrevistas de System Design (FAANG / Top Tech)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="135" height="115" rx="6" fill="#0284c7"/>
    <text x="67" y="24" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Etapa 1 (3-5 min)</text>
    <text x="67" y="48" fill="#e0f2fe" font-size="9" font-weight="bold" text-anchor="middle">Escopo &amp; Requisitos</text>
    <text x="67" y="70" fill="#bae6fd" font-size="8" text-anchor="middle">• Funcionais vs Não-Func</text>
    <text x="67" y="88" fill="#bae6fd" font-size="8" text-anchor="middle">• Escala (DAU, QPS, SLA)</text>
    <text x="67" y="104" fill="#ffffff" font-size="8" text-anchor="middle">• Esclarecer premissas</text>

    <rect x="155" y="0" width="135" height="115" rx="6" fill="#0369a1"/>
    <text x="222" y="24" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Etapa 2 (10-15 min)</text>
    <text x="222" y="48" fill="#e0f2fe" font-size="9" font-weight="bold" text-anchor="middle">High-Level Design</text>
    <text x="222" y="70" fill="#bae6fd" font-size="8" text-anchor="middle">• Diagrama de blocos</text>
    <text x="222" y="88" fill="#bae6fd" font-size="8" text-anchor="middle">• APIs &amp; Esquema de BD</text>
    <text x="222" y="104" fill="#ffffff" font-size="8" text-anchor="middle">• Fluxo ponta a ponta</text>

    <rect x="310" y="0" width="135" height="115" rx="6" fill="#065f46"/>
    <text x="377" y="24" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Etapa 3 (15-20 min)</text>
    <text x="377" y="48" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">Design Deep Dive</text>
    <text x="377" y="70" fill="#a7f3d0" font-size="8" text-anchor="middle">• Gargalos específicos</text>
    <text x="377" y="88" fill="#a7f3d0" font-size="8" text-anchor="middle">• Algoritmos &amp; Caches</text>
    <text x="377" y="104" fill="#ffffff" font-size="8" text-anchor="middle">• Consistência &amp; Falhas</text>

    <rect x="465" y="0" width="135" height="115" rx="6" fill="#047857"/>
    <text x="532" y="24" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Etapa 4 (5 min)</text>
    <text x="532" y="48" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">Wrap-up &amp; Escala</text>
    <text x="532" y="70" fill="#a7f3d0" font-size="8" text-anchor="middle">• Single Points of Failure</text>
    <text x="532" y="88" fill="#a7f3d0" font-size="8" text-anchor="middle">• Monitoramento &amp; SRE</text>
    <text x="532" y="104" fill="#ffffff" font-size="8" text-anchor="middle">• Resumo de trade-offs</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Conduza a entrevista como uma sessão de colaboração técnica entre pares de engenharia sênior.</text>
`),

  'SYS-FND-FRAMEWORK-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Condução de Deep Dives e Análise Estruturada de Trade-offs</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Em System Design não existem 'soluções perfeitas', apenas 'trade-offs conscientes'</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="170" height="55" rx="4" fill="#0369a1"/>
      <text x="85" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">1. Justifique Escolhas</text>
      <text x="85" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Por que NoSQL vs SQL?</text>

      <rect x="195" y="0" width="170" height="55" rx="4" fill="#065f46"/>
      <text x="280" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">2. Trate Casos Extremos</text>
      <text x="280" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">O que acontece se a rede cair?</text>

      <rect x="390" y="0" width="170" height="55" rx="4" fill="#78350f"/>
      <text x="475" y="22" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">3. Quantifique Impacto</text>
      <text x="475" y="40" fill="#fef3c7" font-size="9" text-anchor="middle">Custo de RAM vs Latência de disco</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Articular prós, contras e alternativas descartadas demonstra maturidade de engenharia de nível Staff+.</text>
`)
};
