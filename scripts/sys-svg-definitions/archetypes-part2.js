import { svgWrapper } from '../sys-svg-base.js';

export const ARCHETYPES_PART2_SVGS = {
  // === faang-system-design-archetypes/case-ride-hailing-geospatial ===
  'SYS-ARCH-RIDE-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Indexação Geoespacial: Geohash vs Google S2 vs Uber H3 (Hexágonos)</text>
  <g transform="translate(40, 50)">
    <!-- Geohash / S2 (Squares) -->
    <rect x="0" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Grades Quadradas (Geohash / S2)</text>
    <text x="140" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">8 Vizinhos: 4 lados + 4 diagonais</text>
    <text x="140" y="70" fill="#f87171" font-size="10" text-anchor="middle">Distorção: diagonais têm distâncias 1.41x</text>
    <text x="140" y="92" fill="#fca5a5" font-size="9" text-anchor="middle">Complica buscas de raio circular (k-ring)</text>

    <!-- Uber H3 (Hexagons) -->
    <rect x="320" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Grade Hexagonal Uber H3</text>
    <text x="460" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">6 Vizinhos Equidistantes</text>
    <text x="460" y="70" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Distância constante entre centros</text>
    <text x="460" y="92" fill="#a7f3d0" font-size="9" text-anchor="middle">Perfeito para matching e surge pricing contíguo</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Uber H3 indexa a Terra em 16 resoluções hierárquicas através de números inteiros compactos de 64 bits (uint64).</text>
`),

  'SYS-ARCH-RIDE-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Arquitetura de Matching Motorista-Passageiro e Streaming de GPS</text>
  <g transform="translate(30, 50)">
    <!-- Driver GPS -->
    <rect x="0" y="10" width="130" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="65" y="32" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Motoristas (1M+)</text>
    <text x="65" y="55" fill="#cbd5e1" font-size="9" text-anchor="middle">GPS a cada 4s (gRPC)</text>
    <text x="65" y="75" fill="#86efac" font-size="9" text-anchor="middle">250.000 QPS de ingestão</text>

    <!-- Location Buffer (Redis) -->
    <rect x="170" y="10" width="150" height="90" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="245" y="35" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Redis Geospatial</text>
    <text x="245" y="55" fill="#fde68a" font-size="9" text-anchor="middle">GEOADD / H3 Index</text>
    <text x="245" y="75" fill="#cbd5e1" font-size="9" text-anchor="middle">TTL curto na memória RAM</text>

    <!-- Match Engine -->
    <rect x="360" y="0" width="260" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="490" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Match Engine (DISPATCH)</text>
    <text x="490" y="48" fill="#86efac" font-size="9" text-anchor="middle">1. Consulta anel H3 de raio 1km (k-ring=2)</text>
    <text x="490" y="68" fill="#cbd5e1" font-size="9" text-anchor="middle">2. Ranking por ETA real + histórico de aceitação</text>
    <text x="490" y="90" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">3. Dispara oferta via WebSocket com timeout 15s</text>
  </g>
  <text x="340" y="198" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">O particionamento de memória por célula H3 isola o tráfego de cada cidade sem interdependência global.</text>
`),

  // === faang-system-design-archetypes/case-search-autocomplete ===
  'SYS-ARCH-TYPEAHEAD-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Search Autocomplete (Google Typeahead): Trie em Memória com Top-K Cache</text>
  <g transform="translate(40, 50)">
    <!-- Root -->
    <circle cx="100" cy="20" r="14" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="100" y="24" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">ROOT</text>

    <!-- Node 's' -->
    <line x1="100" y1="34" x2="60" y2="70" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="60" cy="70" r="12" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="60" y="74" fill="#ffffff" font-size="9" text-anchor="middle">'s'</text>

    <!-- Node 'sy' -->
    <line x1="60" y1="82" x2="60" y2="115" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="60" cy="115" r="12" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="60" y="119" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">'y'</text>

    <!-- Top-K Cache Box in Node 'sy' -->
    <rect x="180" y="40" width="420" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="390" y="62" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Top-5 Sugestões Pré-computadas no Nó 'sy'</text>
    <text x="390" y="84" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">1. "system design" (Freq: 50.000.000)</text>
    <text x="390" y="102" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">2. "system design interview" (Freq: 28.000.000)</text>
    <text x="390" y="120" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">3. "synchronization" (Freq: 15.000.000)</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Retorno em tempo O(p) onde p é o tamanho do prefixo digitado (ex: 2 caracteres), independente do tamanho do dicionário.</text>
`),

  'SYS-ARCH-TYPEAHEAD-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Esteira de Agregação Offline (MapReduce / Spark) &amp; Sharding de Trie</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Agregação Offline (Analytics)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Logs brutos de busca no S3 / Data Lake</text>
    <text x="140" y="65" fill="#fde68a" font-size="10" text-anchor="middle">Job Spark roda a cada 1 hora</text>
    <text x="140" y="88" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Recalcula frequências e gera Trie snapshot</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Sharding da Trie Distribuída</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Particionamento por prefixo alfabético</text>
    <text x="460" y="65" fill="#86efac" font-size="10" text-anchor="middle">Shard 1: [a-c], Shard 2: [d-f]...</text>
    <text x="460" y="88" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Replicado em cluster com Consistent Hashing</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Cache local de 1 hora no navegador do cliente (Cache-Control) absorve até 40% das requisições de autocomplete.</text>
`),

  // === faang-system-design-archetypes/case-social-timeline-feed ===
  'SYS-ARCH-FEED-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Feed de Notícias (Twitter / Instagram): Fan-Out on Write vs Fan-Out on Read</text>
  <g transform="translate(40, 50)">
    <!-- Fan-Out on Write (Push) -->
    <rect x="0" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Fan-Out on Write (Push Model)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Post novo grava na Inbox de cada seguidor</text>
    <text x="140" y="65" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Leitura do Feed: O(1) instantânea (Redis)</text>
    <text x="140" y="88" fill="#f87171" font-size="10" text-anchor="middle">Problema: Celebridade com 50M seguidores</text>
    <text x="140" y="112" fill="#fca5a5" font-size="9" text-anchor="middle">Dispara 50.000.000 gravações simultâneas!</text>

    <!-- Fan-Out on Read (Pull) -->
    <rect x="320" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Fan-Out on Read (Pull Model)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Post grava apenas na tabela do autor O(1)</text>
    <text x="460" y="65" fill="#f87171" font-size="10" text-anchor="middle">Leitura: busca posts de todas as pessoas</text>
    <text x="460" y="88" fill="#f87171" font-size="10" text-anchor="middle">que o usuário segue e mescla com K-Way</text>
    <text x="460" y="112" fill="#fca5a5" font-size="9" text-anchor="middle">Gera latência inaceitável na leitura</text>
  </g>
  <text x="340" y="215" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Sistemas modernos usam o modelo híbrido para obter o melhor de ambos os mundos.</text>
`),

  'SYS-ARCH-FEED-001': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Arquitetura Híbrida de Feed &amp; Mitigação do Problema de Celebridades</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="300" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Separação Estrita de Usuários por Volume de Seguidores</text>

    <g transform="translate(20, 42)">
      <rect x="0" y="0" width="260" height="60" rx="4" fill="#065f46"/>
      <text x="130" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Usuário Padrão (&lt; 20.000 seguidores)</text>
      <text x="130" y="42" fill="#ffffff" font-size="9" text-anchor="middle">Push imediato no Redis Feed dos amigos</text>

      <rect x="300" y="0" width="260" height="60" rx="4" fill="#78350f"/>
      <text x="430" y="22" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Celebridade (&gt; 20.000 seguidores)</text>
      <text x="430" y="42" fill="#ffffff" font-size="9" text-anchor="middle">Zero Push! Post puxado na leitura e mesclado</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Ao abrir o app, o Feed Service mescla a lista pré-calculada do Redis com os posts recentes das celebridades seguidas.</text>
`),

  // === faang-system-design-archetypes/case-url-shortener ===
  'SYS-ARCH-URL-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Encurtador de URL (TinyURL): Codificação Base62 de ID Numérico</text>
  <g transform="translate(40, 50)">
    <!-- ID Generation -->
    <rect x="0" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Gerador de ID Único de 64 Bits</text>
    <text x="140" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Snowflake ou Range Allocator (ZooKeeper)</text>
    <text x="140" y="68" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">ID = 20.092.148.972</text>
    <text x="140" y="95" fill="#86efac" font-size="9" text-anchor="middle">Zero colisão e geração determinística</text>

    <!-- Base62 Conversion -->
    <rect x="320" y="0" width="280" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Codificação Base62 [0-9, a-z, A-Z]</text>
    <text x="460" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">62^7 = ~3.5 Trilhões de URLs únicas</text>
    <text x="460" y="70" fill="#34d399" font-size="13" font-family="monospace" font-weight="bold" text-anchor="middle">https://tiny.url/9Ab4x1z</text>
    <text x="460" y="98" fill="#a7f3d0" font-size="9" text-anchor="middle">String curta e compacta de 7 caracteres</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Evita funções de Hash (MD5/SHA) que exigem truncamento e loops de verificação de colisão caros no banco.</text>
`),

  'SYS-ARCH-URL-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Redirecionamento HTTP: 301 (Moved Permanently) vs 302 (Found / Temporary)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">HTTP 301 (Moved Permanently)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Navegador armazena em cache permanente</text>
    <text x="140" y="65" fill="#86efac" font-size="10" text-anchor="middle">Zero latência nos cliques subsequentes</text>
    <text x="140" y="88" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Desvantagem: Impossível rastrear cliques (Analytics)</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">HTTP 302 (Found / Temporary)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Toda requisição passa pelo servidor</text>
    <text x="460" y="65" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Permite métricas de cliques, geolocalização e referrers</text>
    <text x="460" y="88" fill="#86efac" font-size="9" text-anchor="middle">Cache Redis absorve proporção 100:1 Leitura/Escrita</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Modelagem de dados: chave primária curta no DynamoDB ou Cassandra permite leituras em &lt; 2ms.</text>
`),

  // === faang-system-design-archetypes/case-video-streaming ===
  'SYS-ARCH-STREAM-000': svgWrapper(680, 240, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Pipeline de Ingestão e Transcodificação de Vídeo (YouTube / Netflix)</text>
  <g transform="translate(30, 50)">
    <!-- Source Upload -->
    <rect x="0" y="20" width="120" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="60" y="42" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Upload 4K Bruto</text>
    <text x="60" y="62" fill="#cbd5e1" font-size="9" text-anchor="middle">S3 Temp Bucket</text>
    <text x="60" y="80" fill="#86efac" font-size="9" text-anchor="middle">Multipart Upload</text>

    <!-- Chunking DAG -->
    <rect x="150" y="20" width="130" height="85" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="215" y="42" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Chunking Engine</text>
    <text x="215" y="62" fill="#fde68a" font-size="9" text-anchor="middle">GOP Alignment</text>
    <text x="215" y="80" fill="#cbd5e1" font-size="9" text-anchor="middle">Chunks de 4 a 10s</text>

    <!-- Parallel Transcoding Workers -->
    <rect x="310" y="0" width="160" height="125" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="390" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Transcoding DAG</text>
    <rect x="325" y="32" width="130" height="22" rx="3" fill="#065f46"/>
    <text x="390" y="47" fill="#ffffff" font-size="8" text-anchor="middle">1080p H.264 / AV1</text>
    <rect x="325" y="58" width="130" height="22" rx="3" fill="#065f46"/>
    <text x="390" y="73" fill="#ffffff" font-size="8" text-anchor="middle">720p H.264 / VP9</text>
    <rect x="325" y="84" width="130" height="22" rx="3" fill="#065f46"/>
    <text x="390" y="99" fill="#ffffff" font-size="8" text-anchor="middle">480p / 360p Mobile</text>

    <!-- CDN & Manifest -->
    <rect x="495" y="20" width="130" height="85" rx="6" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="560" y="42" fill="#c084fc" font-size="10" font-weight="bold" text-anchor="middle">CDN Edge &amp; HLS</text>
    <text x="560" y="62" fill="#e9d5ff" font-size="9" text-anchor="middle">master.m3u8</text>
    <text x="560" y="80" fill="#a7f3d0" font-size="9" text-anchor="middle">Edge Cache 95% Hit</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Transcodificação paralela particionada por chunks reduz o tempo de processamento de horas para minutos.</text>
`),

  'SYS-ARCH-STREAM-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Adaptive Bitrate Streaming (HLS / MPEG-DASH) &amp; Troca Dinâmica de Perfil</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Player ajusta qualidade a cada chunk de 6s baseado na vazão da rede e buffer</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="170" height="55" rx="4" fill="#065f46"/>
      <text x="85" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Banda Alta (&gt; 15 Mbps)</text>
      <text x="85" y="40" fill="#ffffff" font-size="9" text-anchor="middle">Pede chunks em 1080p / 4K</text>

      <rect x="195" y="0" width="170" height="55" rx="4" fill="#78350f"/>
      <text x="280" y="22" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Oscilação (3G / Instável)</text>
      <text x="280" y="40" fill="#ffffff" font-size="9" text-anchor="middle">Troca transparente para 720p/480p</text>

      <rect x="390" y="0" width="170" height="55" rx="4" fill="#0369a1"/>
      <text x="475" y="22" fill="#bae6fd" font-size="10" font-weight="bold" text-anchor="middle">Zero Buffering</text>
      <text x="475" y="40" fill="#ffffff" font-size="9" text-anchor="middle">Playback 100% contínuo</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Arquivos de manifesto (.m3u8) apontam para URIs de chunks segmentados servidos diretamente da CDN.</text>
`),

  // === faang-system-design-archetypes/case-web-crawler-search ===
  'SYS-ARCH-CRAWLER-000': svgWrapper(680, 230, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Web Crawler Distribuído (Googlebot): URL Frontier &amp; Políticas de Polidez</text>
  <g transform="translate(40, 50)">
    <!-- Priority Queues -->
    <rect x="0" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="90" y="22" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Prioritization (PageRank)</text>
    <rect x="15" y="35" width="150" height="22" rx="3" fill="#0284c7"/>
    <text x="90" y="50" fill="#ffffff" font-size="9" text-anchor="middle">Fila Alta Prioridade (F0)</text>
    <rect x="15" y="62" width="150" height="22" rx="3" fill="#0369a1"/>
    <text x="90" y="77" fill="#ffffff" font-size="9" text-anchor="middle">Fila Média (F1)</text>
    <rect x="15" y="88" width="150" height="22" rx="3" fill="#075985"/>
    <text x="90" y="103" fill="#ffffff" font-size="9" text-anchor="middle">Fila Baixa (F2)</text>

    <!-- Politeness Queues by Hostname -->
    <rect x="220" y="0" width="380" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="410" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Politeness Queues (Mapeadas por Hostname)</text>
    <rect x="240" y="35" width="340" height="22" rx="3" fill="#065f46"/>
    <text x="410" y="50" fill="#86efac" font-size="9" text-anchor="middle">Queue: wikipedia.org (1 worker com delay de 1000ms)</text>
    <rect x="240" y="62" width="340" height="22" rx="3" fill="#065f46"/>
    <text x="410" y="77" fill="#86efac" font-size="9" text-anchor="middle">Queue: github.com (1 worker com delay de 500ms)</text>
    <rect x="240" y="88" width="340" height="22" rx="3" fill="#065f46"/>
    <text x="410" y="103" fill="#86efac" font-size="9" text-anchor="middle">Queue: nytimes.com (Respeita robots.txt)</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">A URL Frontier isola hostnames garantindo que o crawler nunca cause negação de serviço (DDoS) no servidor alvo.</text>
`),

  'SYS-ARCH-CRAWLER-001': svgWrapper(680, 220, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Deduplicação de Conteúdo em Escala com SimHash &amp; Filtro de Bloom</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Filtro de Bloom: URLs Visitadas</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">10 Bilhões de URLs no Bloom Filter</text>
    <text x="140" y="65" fill="#86efac" font-size="10" text-anchor="middle">Consome apenas ~1.2 GB de RAM</text>
    <text x="140" y="88" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Zero falso negativo: nunca revisita URL</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">SimHash: Detecção de Quase-Duplicatas</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Gera fingerprint de 64 bits do texto</text>
    <text x="460" y="65" fill="#86efac" font-size="10" text-anchor="middle">Distância de Hamming &lt;= 3 bits</text>
    <text x="460" y="88" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Descarta páginas com conteúdo idêntico</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Reduz em até 30% o volume de páginas processadas na esteira de indexação sem perda de qualidade.</text>
`)
};
