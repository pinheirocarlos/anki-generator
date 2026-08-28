import { svgWrapper } from '../cs-svg-base.js';

export const NETWORKING_SVGS = {
  // === dns-tls ===
  'CS-NET-DNS-000': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Resolução Hierárquica do DNS: Da Raiz ao Servidor Autoritativo</text>
  <g transform="translate(40, 50)">
    <!-- Client -->
    <rect x="0" y="20" width="100" height="50" rx="5" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="50" y="45" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Cliente / App</text>
    <text x="50" y="58" fill="#94a3b8" font-size="9" text-anchor="middle">Lookup Inicial</text>

    <!-- Recursive Resolver -->
    <rect x="140" y="20" width="120" height="50" rx="5" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="200" y="42" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Resolvedor Recursivo</text>
    <text x="200" y="58" fill="#bae6fd" font-size="9" text-anchor="middle">8.8.8.8 / 1.1.1.1</text>

    <!-- Hierarchy Stack -->
    <g transform="translate(300, 0)">
      <rect x="0" y="0" width="140" height="26" rx="4" fill="#1e293b" stroke="#64748b"/>
      <text x="70" y="17" fill="#f8fafc" font-size="10" text-anchor="middle">1. Root Server (.)</text>

      <rect x="0" y="32" width="140" height="26" rx="4" fill="#1e293b" stroke="#64748b"/>
      <text x="70" y="49" fill="#f8fafc" font-size="10" text-anchor="middle">2. TLD Server (.com)</text>

      <rect x="0" y="64" width="140" height="26" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
      <text x="70" y="81" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">3. Autoritativo (IP)</text>
    </g>

    <!-- Response -->
    <rect x="480" y="20" width="120" height="50" rx="5" fill="#047857" stroke="#10b981" stroke-width="2"/>
    <text x="540" y="42" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Resposta DNS A</text>
    <text x="540" y="58" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">142.250.190.46</text>
  </g>
  <text x="340" y="180" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Cache em Múltiplas Camadas (OS, Browser, Resolver ISP) esconde a latência de consultas iterativas.</text>
`),

  'CS-NET-DNS-001': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Handshake TLS 1.3 (1-RTT) vs TLS 1.2 (2-RTT)</text>
  <g transform="translate(50, 48)">
    <!-- TLS 1.2 -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">TLS 1.2: 2-RTT de Negociação</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">RTT 1: ClientHello / ServerHello + Cert</text>
    <text x="135" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">RTT 2: Key Exchange + Finished</text>
    <text x="135" y="78" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Total: 2 RTTs antes de enviar HTTP GET</text>

    <!-- TLS 1.3 -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">TLS 1.3: 1-RTT (Zero Ciphers Fracas)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">RTT 1: ClientHello + Key Share (Diffie-Hellman)</text>
    <text x="445" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">ServerHello + Finished em 1 única ida e volta</text>
    <text x="445" y="78" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Suporte a 0-RTT PSK para conexões prévias</text>
  </g>
  <text x="340" y="180" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Economia de 50% na latência de conexão segura e Forward Secrecy obrigatório por padrão.</text>
`),

  'CS-NET-DNS-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Tipos de Registros DNS &amp; TTL (Time To Live)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="130" height="75" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="65" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Registro A</text>
    <text x="65" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Nome → IPv4</text>
    <text x="65" y="60" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">192.0.2.1</text>

    <rect x="145" y="0" width="130" height="75" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="210" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Registro AAAA</text>
    <text x="210" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Nome → IPv6</text>
    <text x="210" y="60" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">2001:db8::1</text>

    <rect x="290" y="0" width="130" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="355" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Registro CNAME</text>
    <text x="355" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Alias Canônico</text>
    <text x="355" y="60" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">app.cdn.net</text>

    <rect x="435" y="0" width="125" height="75" rx="5" fill="#1e293b" stroke="#a855f7"/>
    <text x="497" y="22" fill="#c084fc" font-size="12" font-weight="bold" text-anchor="middle">DNS TTL</text>
    <text x="497" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Tempo de Cache</text>
    <text x="497" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">TTL=60s p/ Failover</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">CNAME na zona raiz (@) é proibido pela RFC 1034; provedores modernos usam registros ALIAS/ANAME virtuais.</text>
`),

  // === http-protocols ===
  'CS-NET-HTTP-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">HTTP/1.1: Head-of-Line (HoL) Blocking na Camada de Aplicação</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="75" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="280" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Conexão TCP Serial: 1 Requisição e 1 Resposta por vez</text>
    
    <g transform="translate(30, 32)">
      <rect x="0" y="0" width="130" height="30" rx="4" fill="#7f1d1d" stroke="#ef4444"/>
      <text x="65" y="20" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Req 1 (Lenta / DB)</text>

      <rect x="150" y="0" width="130" height="30" rx="4" fill="#334155" stroke="#64748b"/>
      <text x="215" y="20" fill="#cbd5e1" font-size="10" text-anchor="middle">Req 2 (Bloqueada)</text>

      <rect x="300" y="0" width="130" height="30" rx="4" fill="#334155" stroke="#64748b"/>
      <text x="365" y="20" fill="#cbd5e1" font-size="10" text-anchor="middle">Req 3 (Bloqueada)</text>
    </g>
  </g>
  <text x="340" y="155" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Workaround Histórico: Browsers abriam até 6 conexões TCP paralelas por domínio gerando sobrecarga de portas.</text>
`),

  'CS-NET-HTTP-001': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compressão de Headers: HPACK (HTTP/2) vs QPACK (HTTP/3)</text>
  <g transform="translate(50, 48)">
    <!-- HPACK -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">HPACK (HTTP/2)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Tabela Estática (61 campos pré-definidos)</text>
    <text x="135" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Tabela Dinâmica baseada em conexão TCP</text>
    <text x="135" y="78" fill="#fca5a5" font-size="10" text-anchor="middle">Problema: Se perder pacote, tabela dessincroniza</text>

    <!-- QPACK -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">QPACK (HTTP/3 sobre QUIC)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Projetado para streams UDP não-ordenados</text>
    <text x="445" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Encoder/Decoder control streams independentes</text>
    <text x="445" y="78" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Zero HoL Blocking entre cabeçalhos de streams</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Reduz o tamanho dos cabeçalhos repetidos (Cookies, User-Agent, Auth) em até 85% por requisição.</text>
`),

  'CS-NET-HTTP-002': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">HTTP/2 Multiplexing: Streams Independentes em 1 Conexão TCP</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="280" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Única Conexão TCP Compartilhada (Intercalação de Frames Binários)</text>

    <g transform="translate(20, 35)">
      <rect x="0" y="0" width="100" height="30" rx="3" fill="#0369a1"/>
      <text x="50" y="20" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Stream 1 (HTML)</text>

      <rect x="110" y="0" width="100" height="30" rx="3" fill="#0d9488"/>
      <text x="160" y="20" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Stream 2 (CSS)</text>

      <rect x="220" y="0" width="100" height="30" rx="3" fill="#0369a1"/>
      <text x="270" y="20" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Stream 1 (DATA)</text>

      <rect x="330" y="0" width="100" height="30" rx="3" fill="#7c3aed"/>
      <text x="380" y="20" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Stream 3 (IMG)</text>

      <rect x="440" y="0" width="75" height="30" rx="3" fill="#0d9488"/>
      <text x="477" y="20" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Stream 2</text>
    </g>
  </g>
  <rect x="60" y="145" width="560" height="40" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
  <text x="340" y="170" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Elimina o HoL blocking de aplicação: streams prioritários trafegam sem esperar o fim dos secundários.</text>
`),

  'CS-NET-HTTP-003': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">HTTP/3 sobre QUIC (UDP): Eliminação de HoL Blocking de Transporte</text>
  <g transform="translate(50, 48)">
    <!-- HTTP/2 over TCP -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">HTTP/2 sobre TCP</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Perda de 1 pacote TCP na rede</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">TRAVA TODOS OS STREAMS</text>
    <text x="135" y="78" fill="#94a3b8" font-size="9" text-anchor="middle">Pilha TCP aguarda retransmissão ordenada</text>

    <!-- HTTP/3 over QUIC -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">HTTP/3 sobre QUIC (UDP)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Perda de pacote no Stream A</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Streams B e C continuam fluindo!</text>
    <text x="445" y="78" fill="#a7f3d0" font-size="9" text-anchor="middle">QUIC gerencia recuperação por stream isolado</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Connection Migration: Celular muda de Wi-Fi para 4G sem interromper downloads/streaming em QUIC.</text>
`),

  // === modern-apis-protocols ===
  'CS-NET-API-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Comparativo de Paradigmas: REST vs WebSockets vs SSE</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="170" height="85" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="85" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">REST (HTTP/1.1-2)</text>
    <text x="85" y="44" fill="#cbd5e1" font-size="10" text-anchor="middle">Request / Response</text>
    <text x="85" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">Unidirecional / Sem estado</text>
    <text x="85" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">CRUD / APIs Públicas</text>

    <rect x="195" y="0" width="170" height="85" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="280" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">WebSockets</text>
    <text x="280" y="44" fill="#cbd5e1" font-size="10" text-anchor="middle">Full-Duplex Persistente</text>
    <text x="280" y="60" fill="#a7f3d0" font-size="9" text-anchor="middle">Cliente &amp; Servidor emitem</text>
    <text x="280" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Chat / Jogos / Trading</text>

    <rect x="390" y="0" width="170" height="85" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="475" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">SSE (Server-Sent)</text>
    <text x="475" y="44" fill="#cbd5e1" font-size="10" text-anchor="middle">Streaming Unidirecional</text>
    <text x="475" y="60" fill="#fef3c7" font-size="9" text-anchor="middle">Server → Client push</text>
    <text x="475" y="76" fill="#fef3c7" font-size="9" text-anchor="middle">LLM Tokens / Notificações</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">SSE roda nativamente sobre HTTP padrão com reconexão automática; WebSockets requer infra dedicada de state.</text>
`),

  'CS-NET-API-001': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Upgrade de Protocolo HTTP para WebSocket (101 Switching Protocols)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Handshake Inicial HTTP GET com Headers de Upgrade</text>
    <text x="280" y="44" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">GET /ws HTTP/1.1 | Upgrade: websocket | Connection: Upgrade | Sec-WebSocket-Key: ...</text>
    <text x="280" y="68" fill="#10b981" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle">HTTP/1.1 101 Switching Protocols → Socket bidirecional TCP estabelecido!</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Após o status 101, os headers HTTP são descartados e a comunicação passa a ser puramente por frames WS (2B overhead).</text>
`),

  'CS-NET-API-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Protocol Buffers em gRPC vs JSON: Densidade e Velocidade</text>
  <g transform="translate(50, 48)">
    <!-- JSON -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">JSON (Base Textual)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">{"user_id": 12345, "name": "A"}</text>
    <text x="135" y="62" fill="#fca5a5" font-size="10" text-anchor="middle">Payload: ~60 bytes | Parse CPU-intensive</text>
    <text x="135" y="78" fill="#94a3b8" font-size="9" text-anchor="middle">Sem contrato tipado estrito em tempo de compilação</text>

    <!-- Protobuf -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Protocol Buffers (gRPC)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">[0x08, 0xB9, 0x60, 0x12, 0x01, 0x41]</text>
    <text x="445" y="62" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Payload: 6 bytes (10x menor) | Varints</text>
    <text x="445" y="78" fill="#a7f3d0" font-size="9" text-anchor="middle">Serialização/Desserialização até 7x mais rápida</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">gRPC utiliza HTTP/2 multiplexado nativo, viabilizando streaming bidirecional e RPCs de altíssimo throughput entre microsserviços.</text>
`),

  'CS-NET-API-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">GraphQL: Solução para Over-fetching e Under-fetching</text>
  <g transform="translate(50, 48)">
    <!-- REST Issues -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="135" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">REST Clássico</text>
    <text x="135" y="44" fill="#fca5a5" font-size="10" text-anchor="middle">Over-fetching: Traz 50 campos quando precisa de 2</text>
    <text x="135" y="62" fill="#fca5a5" font-size="10" text-anchor="middle">Under-fetching: Requer N chamadas sequenciais</text>
    <text x="135" y="78" fill="#94a3b8" font-size="9" text-anchor="middle">GET /users/1 + GET /posts?user=1</text>

    <!-- GraphQL -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">GraphQL Query</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Cliente pede a forma exata dos dados</text>
    <text x="445" y="62" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">1 única requisição trazendo exatamente o necessário</text>
    <text x="445" y="78" fill="#a7f3d0" font-size="9" text-anchor="middle">Atenção ao problema N+1 em resolvers (DataLoader)</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Trade-off: GraphQL dificulta caching HTTP de borda (CDN) porque quase todas as requisições usam método POST.</text>
`),

  // === socket-io-epoll ===
  'CS-NET-SOCK-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Ciclo de Vida de Sockets TCP no Servidor</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="100" height="50" rx="4" fill="#0369a1"/>
    <text x="50" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">socket()</text>
    <text x="50" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Cria FD</text>

    <path d="M 105 25 L 135 25" stroke="#38bdf8" stroke-width="2"/>

    <rect x="140" y="0" width="100" height="50" rx="4" fill="#0284c7"/>
    <text x="190" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">bind()</text>
    <text x="190" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Porta/IP</text>

    <path d="M 245 25 L 275 25" stroke="#38bdf8" stroke-width="2"/>

    <rect x="280" y="0" width="110" height="50" rx="4" fill="#065f46"/>
    <text x="335" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">listen()</text>
    <text x="335" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">SYN Queue</text>

    <path d="M 395 25 L 425 25" stroke="#10b981" stroke-width="2"/>

    <rect x="430" y="0" width="130" height="50" rx="4" fill="#047857" stroke="#10b981" stroke-width="2"/>
    <text x="495" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">accept()</text>
    <text x="495" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">Novo Conn FD</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">listen() gerencia duas filas no Kernel: SYN Queue (Incompletas) e Accept Queue (3-Way Handshake Concluído).</text>
  <text x="340" y="170" fill="#94a3b8" font-size="10" text-anchor="middle">accept() extrai uma conexão estabelecida da Accept Queue e retorna um novo File Descriptor dedicado àquele cliente.</text>
`),

  'CS-NET-SOCK-001': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Nagle vs TCP_NODELAY (Baixa Latência)</text>
  <g transform="translate(50, 48)">
    <!-- Nagle ON -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="135" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Algoritmo de Nagle (Padrão)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Bufferiza pequenos pacotes até completar MSS</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Interação ruim com Delayed ACK → Latência 40-200ms</text>
    <text x="135" y="78" fill="#94a3b8" font-size="9" text-anchor="middle">Ideal para: Transferência de arquivos em massa</text>

    <!-- TCP_NODELAY -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">TCP_NODELAY Ativado</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Desativa bufferização de Nagle</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Envia cada write() imediatamente para o cabo</text>
    <text x="445" y="78" fill="#a7f3d0" font-size="9" text-anchor="middle">Obrigatório em: Redis, RPCs, Games, SSH</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Sistemas de backend de alto desempenho e microsserviços ativam TCP_NODELAY por padrão para eliminar pausas artificiais.</text>
`),

  'CS-NET-SOCK-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estado TIME_WAIT e Período 2MSL no Encerramento TCP</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">O lado que inicia o encerramento ativo (FIN) entra em TIME_WAIT</text>
    <text x="280" y="46" fill="#f8fafc" font-size="11" text-anchor="middle">Duração: 2MSL (Maximum Segment Lifetime = ~60 a 120 segundos)</text>
    <text x="280" y="70" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">Finalidade: 1) Garantir que último ACK chegue | 2) Drenar pacotes duplicados atrasados na rede</text>
  </g>
  <text x="340" y="165" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">Perigo em Microservices: Milhares de conexões curtas sem Keep-Alive esgotam a tabela de portas efêmeras (Port Exhaustion).</text>
`),

  // === tcp-udp-transport ===
  'CS-NET-TCP-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">TCP vs UDP: Confiabilidade vs Baixa Latência</text>
  <g transform="translate(50, 48)">
    <!-- TCP -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">TCP (Orientado a Conexão)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Garante entrega ordenada sem perdas (Retransmissão)</text>
    <text x="135" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Controle de Fluxo &amp; Congestionamento</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">HTTP, SSH, Bancos de Dados, SMTP</text>

    <!-- UDP -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">UDP (Datagramas Sem Conexão)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Sem handshake, sem garantias de ordem</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Overhead mínimo (cabeçalho de apenas 8 Bytes)</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">DNS, VoIP, Live Video, Jogos FPS, QUIC</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">QUIC constrói confiabilidade e criptografia TLS 1.3 no espaço do usuário diretamente sobre UDP.</text>
`),

  'CS-NET-TCP-001': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Controle de Congestionamento TCP: CUBIC vs BBR (Google)</text>
  <g transform="translate(50, 48)">
    <!-- CUBIC -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="135" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">TCP CUBIC (Loss-Based)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Enche buffers dos roteadores até estourar</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Trata perda de pacote como congestão</text>
    <text x="135" y="78" fill="#94a3b8" font-size="9" text-anchor="middle">Problema: Bufferbloat (latência inflada)</text>

    <!-- BBR -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">TCP BBR (Model-Based)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Mede continuamente Bandwidth Máximo e RTT Mínimo</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Mantém buffers de roteador vazios</text>
    <text x="445" y="78" fill="#a7f3d0" font-size="9" text-anchor="middle">Throughput alto e latência mínima garantida</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">BBR é o padrão adotado pelo YouTube, Cloudflare e Google Cloud para links de alta latência e perda residual.</text>
`),

  'CS-NET-TCP-002': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Three-Way Handshake do TCP: Sincronização de ISN</text>
  <g transform="translate(60, 48)">
    <!-- Client -->
    <rect x="0" y="0" width="120" height="95" rx="5" fill="#1e293b" stroke="#38bdf8"/>
    <text x="60" y="25" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Cliente</text>
    <text x="60" y="55" fill="#94a3b8" font-size="10" text-anchor="middle">CLOSED</text>
    <text x="60" y="80" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">ESTABLISHED</text>

    <!-- Arrows -->
    <g transform="translate(130, 10)">
      <line x1="0" y1="10" x2="300" y2="25" stroke="#38bdf8" stroke-width="2"/>
      <text x="150" y="12" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">1. SYN (seq = ISN_c)</text>

      <line x1="300" y1="35" x2="0" y2="50" stroke="#10b981" stroke-width="2"/>
      <text x="150" y="40" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">2. SYN-ACK (seq = ISN_s, ack = ISN_c + 1)</text>

      <line x1="0" y1="60" x2="300" y2="75" stroke="#38bdf8" stroke-width="2"/>
      <text x="150" y="68" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">3. ACK (ack = ISN_s + 1)</text>
    </g>

    <!-- Server -->
    <rect x="440" y="0" width="120" height="95" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="500" y="25" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Servidor</text>
    <text x="500" y="55" fill="#94a3b8" font-size="10" text-anchor="middle">LISTEN</text>
    <text x="500" y="80" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">ESTABLISHED</text>
  </g>
  <text x="340" y="180" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">O ISN (Initial Sequence Number) é gerado de forma pseudorandômica para evitar ataques de injeção e session hijacking.</text>
`),

  'CS-NET-TCP-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Head-of-Line (HoL) Blocking no Buffer de Recepção TCP</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="280" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Buffer de Recepção do Kernel (TCP Receive Buffer)</text>

    <g transform="translate(30, 32)">
      <rect x="0" y="0" width="100" height="32" rx="4" fill="#065f46" stroke="#10b981"/>
      <text x="50" y="20" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">Pacote 1 (OK)</text>

      <rect x="115" y="0" width="110" height="32" rx="4" fill="#7f1d1d" stroke="#ef4444"/>
      <text x="170" y="20" fill="#fecaca" font-size="10" font-weight="bold" font-family="monospace" text-anchor="middle">Pacote 2 (PERDIDO)</text>

      <rect x="240" y="0" width="125" height="32" rx="4" fill="#334155" stroke="#64748b"/>
      <text x="302" y="20" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">Pacote 3 (Aguardando)</text>

      <rect x="380" y="0" width="125" height="32" rx="4" fill="#334155" stroke="#64748b"/>
      <text x="442" y="20" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">Pacote 4 (Aguardando)</text>
    </g>
  </g>
  <text x="340" y="155" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">A aplicação NÃO recebe os pacotes 3 e 4 até que o pacote 2 seja retransmitido com sucesso!</text>
`),

  'CS-NET-TCP-004': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Janela Deslizante (Sliding Window) e Produto BDP</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Bandwidth-Delay Product (BDP) = Largura de Banda × RTT</text>
    <text x="280" y="44" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">Exemplo: 10 Gbps × 40ms RTT = 50 MB de dados em trânsito no cabo</text>
    <text x="280" y="68" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">TCP Window Scaling (RFC 7323) expande o teto da janela de 64 KB para até 1 GB.</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Se o buffer TCP for menor que o BDP, o link de alta velocidade fica subutilizado com a conexão ociosa aguardando ACKs.</text>
`)
};
