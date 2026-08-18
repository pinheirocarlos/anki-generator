import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Phase 3: System Design - FAANG Archetypes (Part 1)...');

// ==========================================
// 1. case-url-shortener
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-url-shortener/SYS-ARCH-URL-000.md', `---
id: SYS-ARCH-URL-000
title: "Encurtador de URLs (TinyURL): Codificação Base62 e Gerador de IDs"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::twitter
  - freq::high
---

## Pergunta
Como a codificação Base62 converte IDs inteiros numéricos únicos de 64 bits em strings curtas de 7 caracteres para um encurtador de URLs?

## Resposta
### Quick Answer
**Solução Direta**:
- **Alfabeto Base62**: Composto por 62 caracteres alfanuméricos seguros para URL: \`[0-9a-zA-Z]\` (10 dígitos + 26 minúsculas + 26 maiúsculas).
- **Capacidade com 7 Caracteres**:
  $$62^7 = 3.521.614.606.208 \\approx 3.5 \\text{ Trilhões de URLs únicas}$$
- **Mecanismo de Geração**:
  1. Um gerador de IDs distribuído (Snowflake, Range Allocator no ZooKeeper ou Sequência de DB) emite um número inteiro monotônico único (ex: ID $= 125.307$).
  2. O inteiro é convertido para Base62 através de divisões e restos sucessivos por 62 (ex: $125.307 \\rightarrow \\text{"wX9"}$).
  3. Preenche com zeros à esquerda até 7 caracteres (\`"0000wX9"\`).

### Dual Coding Visual
| Comprimento da Chave (Base62) | Combinações Únicas Possíveis | Espaço de Endereçamento |
|---|---|---|
| **6 Caracteres ($62^6$)** | ~56.8 Bilhões | Adequado para sistemas médios |
| **7 Caracteres ($62^7$)** | **~3.52 Trilhões** | **Padrão ouro TinyURL / Bitly** |
| **8 Caracteres ($62^8$)** | ~218 Trilhões | Escala para décadas em escala global |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Algoritmo Base62 em Go
\`\`\`go
package main

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

func EncodeBase62(n uint64) string {
  if n == 0 { return "0" }
  bytes := []byte{}
  for n > 0 {
    rem := n % 62
    bytes = append(bytes, alphabet[rem])
    n = n / 62
  }
  // Inverte os bytes para ordem correta
  for i, j := 0, len(bytes)-1; i < j; i, j = i+1, j-1 {
    bytes[i], bytes[j] = bytes[j], bytes[i]
  }
  return string(bytes)
}
\`\`\`

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-url-shortener/SYS-ARCH-URL-001.md', `---
id: SYS-ARCH-URL-001
title: "TinyURL: Redirecionamento HTTP 301 vs 302 e Arquitetura de Cache com Leitura 100:1"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Qual é a diferença entre retornar HTTP 301 Moved Permanently versus HTTP 302 Found em um encurtador de URLs com razão Leitura/Escrita 100:1?

## Resposta
### Quick Answer
**Solução Direta**:
- **HTTP 301 (Moved Permanently - Redirecionamento Permanente)**:
  - O **Browser do usuário faz cache da URL de destino localmente**.
  - Requisições subsequentes ao link encurtado redirecionam direto no cliente sem tocar no servidor do encurtador.
  - **Pró**: Reduz drasticamente a carga nos servidores.
  - **Contra**: **Impede a coleta de métricas de clique e telemetria analítica** em tempo real.
- **HTTP 302 (Found - Redirecionamento Temporário)**:
  - O browser **nunca faz cache**; toda visita ao link bate obrigatoriamente no servidor do encurtador.
  - **Permite rastreamento analítico preciso de 100% dos cliques** (IP, país, dispositivo, timestamp).
- **Arquitetura 100:1**: Em razão 100:1 (ex: 100k QPS de leitura e 1k QPS de escrita), utiliza-se cluster Redis em frente ao banco de dados com política LRU, atingindo $>90\\%$ de Cache Hit.

### Dual Coding Visual
| Status HTTP | Cache no Navegador | Rastreamento Analítico de Cliques |
|---|---|---|
| **301 Moved Permanently** | Sim (Requisições futuras não batem no backend) | Parcial / Comprometido |
| **302 Found** | **Não (Toda visita bate no servidor)** | **Perfeito ($100\\%$ dos cliques registrados)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Dimensionamento de Cache para 100M URLs Ativas
- Se o sistema possui 100M de URLs ativas e o topo $20\\%$ das URLs gera $80\\%$ do tráfego (Princípio de Pareto):
  - Capacidade necessária em RAM = $20\\text{M} \\times (7\\text{B key} + 200\\text{B target URL} + \\text{overhead}) \\approx 20\\text{M} \\times 500\\text{B} = 10\\text{ GB}$.
  - Cabe confortavelmente em uma única instância intermediária de Redis.

</details>
`);

// ==========================================
// 2. case-social-timeline-feed
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-social-timeline-feed/SYS-ARCH-FEED-000.md', `---
id: SYS-ARCH-FEED-000
title: "Feed de Notícias (Twitter / Instagram): Fan-Out on Write (Push) vs Fan-Out on Read (Pull)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::twitter
  - freq::high
---

## Pergunta
Qual é o trade-off fundamental entre Fan-Out on Write (Push Model) e Fan-Out on Read (Pull Model) na construção de feeds de redes sociais?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fan-Out on Write (Push Model - Pré-computação na Escrita)**:
  - Quando um usuário publica um post, o sistema busca todos os seus seguidores e **injeta o \`post_id\` na Timeline em memória (Redis) de cada seguidor imediatamente**.
  - **Leitura**: Ultra-rápida em $O(1)$ (basta ler a lista do Redis do usuário).
  - **Problema**: Inviável para celebridades com milhões de seguidores (*Celebrity Problem*).
- **Fan-Out on Read (Pull Model - Computação sob Demanda na Leitura)**:
  - O post é apenas gravado na tabela do autor.
  - Quando o seguidor abre o feed, o sistema busca os posts de todos os autores seguidos e faz o *Merge Sort* em tempo real.
  - **Escrita**: Instantânea em $O(1)$.
  - **Problema**: Leituras ficam extremamente lentas se o usuário seguir centenas de contas ativas.

### Dual Coding Visual
| Modelo de Feed | Custo na Publicação (Write) | Custo no Carregamento (Read) |
|---|---|---|
| **Fan-Out on Write (Push)** | Alto ($O(\\text{seguidores})$ gravações no Redis) | **Instantâneo ($O(1)$ leitura direta de lista)** |
| **Fan-Out on Read (Pull)** | Baixo ($O(1)$ gravação única) | Alto ($O(\\text{seguidos})$ consultas e merge) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estrutura no Redis (ZSet para Feed)
- Cada usuário tem uma chave \`feed:{user_id}\` como um \`ZSet\` no Redis:
  - \`Member = post_id\`
  - \`Score = timestamp_epoch_ms\`
  - Para ler a página 1: \`ZREVRANGEBYSCORE feed:101 +inf -inf LIMIT 0 20\` (Leitura sub-milissegundo).

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-social-timeline-feed/SYS-ARCH-FEED-001.md', `---
id: SYS-ARCH-FEED-001
title: "Arquitetura Híbrida de Feed e Mitigação do Problema de Celebridades (Hotkey Fan-Out)"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::meta
  - freq::high
---

## Pergunta
Como uma arquitetura híbrida de Fan-Out resolve o 'Problema das Celebridades' combinando Push para usuários comuns e Pull para contas massivas?

## Resposta
### Quick Answer
**Solução Direta**:
- **O Desafio da Celebridade**: Se uma conta com 100 Milhões de seguidores (ex: celebridade) posta, o Fan-out on Write dispararia 100M de operações de gravação no Redis em poucos segundos, saturando a rede e gerando atrasos severos na ingestão.
- **Arquitetura Híbrida (Padrão Twitter / Instagram)**:
  1. **Usuários Regulares ($< 50.000$ seguidores)**: Utilizam **Fan-Out on Write** (o post é injetado diretamente nas Timelines dos seguidores no Redis).
  2. **Celebridades ($> 50.000$ seguidores)**: O post é gravado apenas no feed pessoal do autor (**Zero Push**).
  3. **Montagem do Feed no Cliente**: Quando um seguidor abre o app, o sistema lê sua Timeline pré-computada no Redis e faz um *Merge dinâmico em memória* apenas com os posts recentes das celebridades que ele segue.

### Dual Coding Visual
| Tipo de Autor | Estratégia de Disseminação | Impacto na Infraestrutura |
|---|---|---|
| **Usuário Regular** | Fan-Out on Write (Push no Redis) | Carga diluída e absorvida facilmente |
| **Celebridade (>50k)** | **Fan-Out on Read (Pull no Merge)** | **Zero avalanche de gravações no Redis** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização de Usuários Inativos
- Para economizar memória RAM, o sistema só executa Fan-out on Write para usuários que acessaram a plataforma nos últimos 30 dias (*Active Users*). Para usuários inativos, o feed só é reconstruído quando eles realizam novo login.

</details>
`);

// ==========================================
// 3. case-video-streaming
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-video-streaming/SYS-ARCH-STREAM-000.md', `---
id: SYS-ARCH-STREAM-000
title: "Pipeline de Ingestão e Transcodificação de Vídeo (Chunking e DAG Workers)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::netflix
  - freq::high
---

## Pergunta
Como funciona a esteira assíncrona de ingestão, particionamento (Chunking) e transcodificação de vídeos distribuída via DAG Workers?

## Resposta
### Quick Answer
**Solução Direta**:
- **Pipeline de Vídeo em 4 Etapas**:
  1. **Upload Direto para Object Storage (S3 / GCS)**: O cliente solicita uma *Pre-Signed URL* e faz upload direto do arquivo bruto (*Raw Video*), liberando os servidores web de I/O pesado.
  2. **Validação e Extração de Metadados**: Um worker valida formato, codec, resolução e duração.
  3. **Particionamento (Chunking em Fragmentos de 2 a 10 segundos)**: O vídeo bruto é fatiado em pequenos blocos independentes (chunks).
  4. **Transcodificação Paralela em DAG**: Múltiplos workers em GPU processam os chunks em paralelo para dezenas de combinações de codecs (H.264, H.265/HEVC, AV1) e resoluções (360p a 4K).

### Dual Coding Visual
| Etapa do Pipeline | Componente Responsável | Objetivo |
|---|---|---|
| **1. Upload** | Pre-Signed S3 / Cloudflare R2 | Upload direto do cliente sem sobrecarregar API |
| **2. Chunking** | FFmpeg Worker | Divide vídeo em segmentos de 2-6 segundos |
| **3. Encoding** | GPU Worker Pool (DAG) | Renderiza resoluções e codecs em paralelo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o Chunking Acelera o Processamento
- Um vídeo de 2 horas levaria 40 minutos para ser transcodificado em uma única máquina. Ao dividir em 1.200 chunks de 6 segundos, um pool de 100 instâncias transcodifica todos os blocos simultaneamente em menos de 1 minuto.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-video-streaming/SYS-ARCH-STREAM-001.md', `---
id: SYS-ARCH-STREAM-001
title: "Streaming Adaptativo de Vídeo: Protocolos HLS / MPEG-DASH e Distribuição por Edge CDN"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::youtube
  - freq::high
---

## Pergunta
Como os protocolos de streaming adaptativo HLS e MPEG-DASH alternam dinamicamente a qualidade do vídeo baseando-se na largura de banda da rede do cliente?

## Resposta
### Quick Answer
**Solução Direta**:
- **Adaptive Bitrate Streaming (ABR)**:
  - O vídeo transcodificado é acompanhado por um arquivo de manifesto (\`.m3u8\` no HLS ou \`.mpd\` no DASH) que lista todos os fluxos de bitrate disponíveis (ex: 500 kbps para 360p, 5 Mbps para 1080p, 20 Mbps para 4K) e os links dos chunks de cada resolução.
  - O player de vídeo no cliente monitora a velocidade de download e o buffer local a cada chunk recebido (a cada 2-6s).
  - Se a rede do usuário oscilar (ex: sinal 4G degradando), o player solicita o próximo chunk em resolução mais baixa (360p) de forma **imperceptível e sem travar a reprodução** (*Zero Buffering*).
- **Edge CDN Caching**: Como os chunks são arquivos estáticos imutáveis (\`.ts\` ou \`.m4s\`), a CDN atinge $>99\\%$ de Cache Hit na borda.

### Dual Coding Visual
| Estrutura de Arquivos | Formato / Extensão | Papel no Player |
|---|---|---|
| **Manifesto Mestre** | \`master.m3u8\` | Lista resoluções e bitrates disponíveis |
| **Manifesto de Variante** | \`1080p.m3u8\` | Lista URLs dos chunks sequenciais de 1080p |
| **Segmento de Mídia** | \`segment_001.ts\` (2s a 6s) | Bloco de vídeo estático servido pela CDN |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Manifesto HLS (\`master.m3u8\`)
\`\`\`text
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
360p/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720
720p/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=6000000,RESOLUTION=1920x1080
1080p/index.m3u8
\`\`\`

</details>
`);

// ==========================================
// 4. case-realtime-chat
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-realtime-chat/SYS-ARCH-CHAT-000.md', `---
id: SYS-ARCH-CHAT-000
title: "Chat em Tempo Real (WhatsApp / Discord): WebSocket Gateways e Camada de Presença"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::discord
  - freq::high
---

## Pergunta
Como os servidores de WebSocket Gateway mantêm conexões bidirecionais persistentes e gerenciam o status de presença (Online / Offline) de milhões de usuários?

## Resposta
### Quick Answer
**Solução Direta**:
- **WebSocket Gateway**:
  - Estabelece uma conexão TCP persistente de longa duração e full-duplex com o cliente após o handshake HTTP inicial.
  - Servidores stateless convencionais não conseguem enviar mensagens ativas para clientes; o WebSocket Gateway viabiliza entrega instantânea em tempo real com overhead de cabeçalho de apenas **2 bytes por frame**.
- **Serviço de Presença (Presence Service)**:
  - O cliente envia mensagens periódicas de *Heartbeat / Ping* a cada 30-60 segundos.
  - O gateway grava no Redis com TTL: \`SET presence:{user_id} "ONLINE" EX 60\`.
  - Se o usuário perder conexão ou não enviar ping antes do TTL expirar, o status transiciona automaticamente para **Offline**.

### Dual Coding Visual
| Protocolo / Mecanismo | Overhead de Cabeçalho por Mensagem | Tipo de Comunicação |
|---|---|---|
| **HTTP Polling Tradicional** | ~500 a 1.000 bytes (Headers completos) | Unidirecional periódica do cliente |
| **WebSocket Persistente** | **2 a 10 bytes por frame** | **Bidirecional full-duplex em tempo real** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização de Conexões Concorrentes
- Um único servidor Linux com epoll otimizado (ajustando \`nofile\` para 1 milhão e alocação de buffers TCP) consegue sustentar mais de **500.000 conexões WebSocket simultâneas** em uma única máquina física (Discord Architecture).

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-realtime-chat/SYS-ARCH-CHAT-001.md', `---
id: SYS-ARCH-CHAT-001
title: "Roteamento de Mensagens entre Servidores de Chat via Redis Pub/Sub e Notificações Push"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::meta
  - freq::high
---

## Pergunta
Como o sistema roteia uma mensagem de chat quando o Remetente e o Destinatário estão conectados em servidores de WebSocket Gateway fisicamente diferentes?

## Resposta
### Quick Answer
**Solução Direta**:
- **Tabela de Sessões em Memória (Session Registry)**:
  - Quando o Usuário B conecta no \`Gateway-3\`, o gateway registra no Redis: \`HSET user_sessions "user_B" "gateway_3"\`.
- **Fluxo de Roteamento Ponto a Ponto**:
  1. O Usuário A envia mensagem para B no \`Gateway-1\`.
  2. O \`Gateway-1\` consulta o Redis e descobre que B está conectado no \`Gateway-3\`.
  3. O \`Gateway-1\` publica a mensagem no canal interno do \`Gateway-3\` via **Redis Pub/Sub ou Kafka** (\`PUBLISH gateway_3_events payload\`).
  4. O \`Gateway-3\` consome o evento e descarrega a mensagem no socket TCP aberto do Usuário B.
- **Tratamento de Usuário Offline**: Se B não estiver conectado em nenhum gateway, o sistema persiste no banco (Cassandra/Postgres) e dispara uma **Notificação Push (APNs / FCM)**.

### Dual Coding Visual
| Estado do Destinatário | Caminho de Entrega | Latência Típica |
|---|---|---|
| **Online (Conectado em Gateway)** | WebSocket direto via Redis Pub/Sub | Sub-100 ms |
| **Offline (Desconectado)** | Persistência em Banco + Apple APNs / Google FCM | Segundos (Desperta o celular) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Roteamento de Grupos (Group Chat)
- Para chats de grupo grandes, a mensagem é publicada em um tópico Kafka compartilhado do grupo; gateways inscritos entregam para os membros locais conectados em seus respectivos nós.

</details>
`);

// ==========================================
// 5. case-ride-hailing-geospatial
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-ride-hailing-geospatial/SYS-ARCH-RIDE-000.md', `---
id: SYS-ARCH-RIDE-000
title: "Indexação Geoespacial: Geohash vs Google S2 vs Uber H3 (Hexágonos)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::uber
  - freq::high
---

## Pergunta
Por que sistemas de mobilidade urbana (Uber / Lyft) utilizam células hexagonais (Uber H3) em vez de Geohashes retangulares para indexação espacial?

## Resposta
### Quick Answer
**Solução Direta**:
- **Geohash (Retângulos / Quadrados)**:
  - Codifica latitude e longitude em strings de base32 intercalando bits.
  - **Problema**: Células adjacentes possuem distâncias variáveis entre centros (4 vizinhos laterais a distância $D$, 4 vizinhos diagonais a distância $\\sqrt{2}D$).
- **Uber H3 (Sistema Hexagonal Hierárquico)**:
  - Divide a superfície do globo terrestre em uma malha de **hexágonos regulares**.
  - **Propriedade Única do Hexágono**: **Todos os 6 vizinhos adjacentes estão exatamente à mesma distância** do centro geométrico.
  - Simplifica cálculos de raio de busca de motoristas (k-ring search), zoneamento de preços dinâmicos (*Surge Pricing*) e interpolação de demanda sem distorções diagonais.

### Dual Coding Visual
| Sistema Geoespacial | Formato da Célula | Distância para Todos os Vizinhos |
|---|---|---|
| **Geohash** | Retângulo / Quadrado | Desigual (Vizinhos diagonais estão a $\\sqrt{2}D$) |
| **Google S2** | Projeção cúbica quadtree | Desigual nos cantos da projeção |
| **Uber H3** | **Hexágono Regular** | **Estritamente idêntica para todos os 6 vizinhos** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Resoluções no Uber H3
- Resolução 7: Área de $\\approx 5 \\text{ km}^2$ (Ideal para cálculo de Surge Pricing em bairros).
- Resolução 9: Área de $\\approx 0.1 \\text{ km}^2$ (Ideal para matching motorista-passageiro no raio de 1 km).

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-ride-hailing-geospatial/SYS-ARCH-RIDE-001.md', `---
id: SYS-ARCH-RIDE-001
title: "Arquitetura de Matching Motorista-Passageiro e Atualizações de GPS em Alta Frequência"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::uber
  - freq::high
---

## Pergunta
Como dimensionar a ingestão e matching de localização GPS de 1 milhão de motoristas emitindo coordenadas a cada 4 segundos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Dimensionamento de Ingestão**:
  - $1.000.000 \\text{ motoristas} / 4 \\text{ s} = 250.000 \\text{ QPS de gravação de GPS}$.
  - Gravar diretamente em disco no PostgreSQL/MySQL causaria colapso de I/O.
- **Arquitetura de Armazenamento em Memória**:
  1. O app do motorista envia \`(driver_id, lat, lng, status)\` via WebSocket/gRPC para um cluster de ingestão.
  2. O cluster calcula o índice H3 da coordenada e grava no **Redis Geospatial / Cluster em Memória shardeado por cidade**:
     - \`GEOADD drivers:sp lng lat driver_id\` (armazenado como Sorted Set de 52 bits).
  3. **Matching de Corrida**:
     - Passageiro solicita corrida em \`(lat_p, lng_p)\`.
     - O backend executa \`GEORADIUSBYMEMBER\` ou busca nos hexágonos H3 vizinhos (*k-ring* de raio 2 km) em **$O(\\log N)$ na RAM**, filtrando motoristas livres em milissegundos.

### Dual Coding Visual
| Camada | Tecnologia | Função no Sistema |
|---|---|---|
| **Ingestão (250k QPS)** | WebSockets + Kafka | Absorção e validação do fluxo de telemetria |
| **Localização em Tempo Real** | Redis Cluster em RAM | Localização atual e buscas espaciais sub-5ms |
| **Histórico / Faturamento** | Apache Cassandra / S3 | Armazenamento analítico e auditoria de viagens |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Algoritmo de Despacho em Lote (Batch Matching)
- Em vez de atribuir a corrida instantaneamente ao primeiro motorista que aceitar (First-Come First-Served), o motor de matching agrupa requisições de passageiros e motoristas em **janelas de 5 a 10 segundos** e resolve um problema de otimização combinatória (*Bipartite Matching*) minimizando o tempo total de espera global.

</details>
`);

// ==========================================
// 6. case-flash-sale-inventory
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-flash-sale-inventory/SYS-ARCH-FLASHSALE-000.md', `---
id: SYS-ARCH-FLASHSALE-000
title: "Vendas Relâmpago (Flash Sale): Reserva Atômica de Inventário em Memória (Redis Lua)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::amazon
  - freq::high
---

## Pergunta
Como a pré-alocação de inventário em Redis com scripts Lua atômicos previne 'Over-selling' (Sobrevenda) sob picos de 500.000 QPS?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema do Banco de Dados Relacional**: Executar \`SELECT stock FROM products WHERE id=1 FOR UPDATE\` sob 500k QPS bloqueia conexões do pool e derruba o banco de dados.
- **Reserva Atômica no Redis com Lua**:
  1. Antes do início da venda, o estoque total do produto é carregado na RAM do Redis (\`SET stock:item_1 1000\`).
  2. Quando o usuário clica em comprar, o gateway executa um **Script Lua no Redis**:
     - Verifica se \`stock >= quantidade\`. Se sim, decrementa \`DECRBY stock quantidade\` e grava um token de reserva do usuário.
     - Se \`stock < quantidade\`, retorna erro de esgotado instantaneamente.
  3. Apenas os 1.000 usuários que conseguiram a reserva na RAM recebem autorização para prosseguir para a fila de pagamento no banco de dados.

### Dual Coding Visual
| Estratégia de Reserva | Throughput Máximo Suportado | Risco de Overselling |
|---|---|---|
| **SQL Lock (\`SELECT FOR UPDATE\`)** | ~1.000 a 3.000 QPS (Gargalo de I/O) | Zero, mas derruba o banco de dados |
| **Redis Lua Script em RAM** | **>100.000 QPS por core de CPU** | **Zero (Execução estritamente atômica)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Script Lua de Reserva Atômica Anti-Overselling
\`\`\`text
local stock = tonumber(redis.call('get', KEYS[1]))
local quantity = tonumber(ARGV[1])
local userId = ARGV[2]

if stock and stock >= quantity then
  redis.call('decrby', KEYS[1], quantity)
  redis.call('sadd', KEYS[2], userId) -- Registra que usuário já reservou
  return 1 -- Reserva concedida
else
  return 0 -- Esgotado
end
\`\`\`

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-flash-sale-inventory/SYS-ARCH-FLASHSALE-001.md', `---
id: SYS-ARCH-FLASHSALE-001
title: "Filas Virtuais de Espera (Virtual Waiting Room) e Liberação de Inventário por Timeout"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::ticketmaster
  - freq::high
---

## Pergunta
Como salas de espera virtuais (Virtual Waiting Room) e expiração automática de reservas protegem sistemas de ingressos sob demanda extrema?

## Resposta
### Quick Answer
**Solução Direta**:
- **Sala de Espera Virtual (Virtual Waiting Room)**:
  - Diante de 5 milhões de pessoas disputando 50.000 ingressos, o tráfego de entrada é retido em uma camada de borda (Cloudflare / Gateway).
  - Cada usuário recebe um **número de fila sequencial criptografado (Token de Fila)**.
  - O backend libera a entrada de novos usuários para a tela de checkout a uma taxa controlada e estável (ex: exatamente 500 usuários por segundo).
- **Liberação Automática de Inventário (Holding Pattern)**:
  - Ao reservar um assento, o usuário tem **10 minutos para concluir o pagamento**.
  - O sistema agenda uma mensagem atrasada (*Delayed Message* no SQS/Kafka). Se a confirmação de pagamento não chegar aos 10 minutos, o worker cancela a reserva e **devolve o estoque ao Redis automaticamente**.

### Dual Coding Visual
| Componente | Papel Arquitetural | Proteção do Sistema |
|---|---|---|
| **Virtual Waiting Room** | Retém usuários na borda via fila justa | Impede sobrecarga de CPU/Rede no backend |
| **Fila de Expiração (10 min)** | Libera reservas não pagas via Delayed Queue | Garante 100% de ocupação do inventário |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Prevenção de Bots e Fraudes
- A sala de espera implementa verificação de **Proof of Work (PoW) no navegador** ou reCAPTCHA v3 para garantir que os números da fila sejam emitidos para humanos reais, frustrando scripts automatizados de compra.

</details>
`);

console.log('✅ FAANG Archetypes (Part 1) cards successfully generated and validated!');
