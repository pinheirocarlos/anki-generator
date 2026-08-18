import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Phase 2: CS Fundamentals - Networking...');

// ==========================================
// 1. tcp-udp-transport
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/networking/tcp-udp-transport/CS-NET-TCP-000.md', `---
id: CS-NET-TCP-000
title: "Garantias Fundamentais: TCP (Confiável/Orientado a Conexão) vs UDP (Datagrama/Rápido)"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::google
  - freq::high
---

## Pergunta
Quais são as diferenças essenciais de garantias entre o protocolo **TCP** e o protocolo **UDP** na camada de transporte?

## Resposta
### Quick Answer
**Solução Direta**:
- **TCP (Transmission Control Protocol)**:
  - Orientado a conexão (exige Handshake de 3 vias).
  - Garante entrega confiável, retransmissão de perdas e ordenação estrita de bytes via números de sequência e ACKs.
  - Implementa controle de fluxo e controle de congestionamento adaptativo.
- **UDP (User Datagram Protocol)**:
  - Sem conexão (*Connectionless*) e não-confiável (*Best-effort*).
  - Não garante entrega, ordem de pacotes nem retransmissão; possui overhead mínimo de cabeçalho (8 bytes vs 20-60 bytes do TCP).
  - Ideal para streaming de vídeo em tempo real, chamadas de voz (VoIP), jogos online, DNS e protocolo QUIC.

### Dual Coding Visual
| Característica | TCP | UDP |
|---|---|---|
| **Confiabilidade & Ordem** | Garantida com retransmissão | Não garantida (Best-Effort) |
| **Overhead de Cabeçalho** | 20 a 60 bytes | 8 bytes fixos |
| **Controle de Congestionamento** | Sim (CUBIC, BBR) | Não (Envia em taxa máxima) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia do Telefonema vs Carta Postal
- **TCP**: É um telefonema. Você liga, a pessoa atende, vocês confirmam que estão se ouvindo ("Alô?", "Oi, tudo bem?"), e você só continua falando após cada confirmação de entendimento.
- **UDP**: É enviar um cartão postal pelo correio. Você despacha a mensagem sem saber se a pessoa está em casa; se o carteiro perder a carta, você não recebe nenhum aviso.

#### Key Takeaways
- Use TCP para sistemas onde a perda de 1 único byte corrompe a mensagem (HTTP, bancos de dados, SSH, transferências de arquivos). Use UDP para dados com valor perecível em tempo real.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/tcp-udp-transport/CS-NET-TCP-002.md', `---
id: CS-NET-TCP-002
title: "Three-Way Handshake do TCP (SYN, SYN-ACK, ACK) e Sincronização de ISN"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::amazon
  - freq::high
---

## Pergunta
Como funciona o **Three-Way Handshake (SYN, SYN-ACK, ACK)** do TCP e por que são necessárias 3 etapas para sincronizar números de sequência?

## Resposta
### Quick Answer
**Solução Direta**:
- O handshake de 3 vias estabelece uma conexão TCP bidirecional e sincroniza os **Initial Sequence Numbers (ISN)** de ambos os lados:
  1. **Passo 1 (SYN)**: O cliente escolhe um ISN aleatório $X$ e envia \`SYN(seq=X)\` para o servidor (Cliente entra em \`SYN_SENT\`).
  2. **Passo 2 (SYN-ACK)**: O servidor aloca buffers, escolhe seu próprio ISN $Y$, e envia \`SYN-ACK(seq=Y, ack=X+1)\` confirmando o SYN do cliente (Servidor entra em \`SYN_RCVD\`).
  3. **Passo 3 (ACK)**: O cliente envia \`ACK(seq=X+1, ack=Y+1)\` confirmando o SYN do servidor (Ambos entram em \`ESTABLISHED\`).
- 3 etapas são o mínimo matemático necessário para que ambos os nós confirmem que os canais de envio e recepção estão 100% operacionais nos dois sentidos.

### Dual Coding Visual
| Etapa do Handshake | Origem $\\to$ Destino | Flags e Números de Sequência |
|---|---|---|
| **1. SYN** | Cliente $\\to$ Servidor | \`SYN=1\`, \`seq=X\` |
| **2. SYN-ACK** | Servidor $\\to$ Cliente | \`SYN=1\`, \`ACK=1\`, \`seq=Y\`, \`ack=X+1\` |
| **3. ACK** | Cliente $\\to$ Servidor | \`ACK=1\`, \`seq=X+1\`, \`ack=Y+1\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o ISN é Aleatório (SYN Flood & TCP Spoofing)
- O ISN não começa em zero por razões de segurança: números previsíveis permitiriam a invasores injetar pacotes forjados (*TCP Connection Hijacking*).
- Além disso, evita que pacotes atrasados de uma conexão TCP anterior terminada interfiram em uma nova conexão no mesmo par de portas.

#### Key Takeaways
- O Three-Way Handshake introduz **1 RTT completo (Round-Trip Time)** de latência antes que qualquer byte de dados da aplicação possa trafegar.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/tcp-udp-transport/CS-NET-TCP-003.md', `---
id: CS-NET-TCP-003
title: "Head-of-Line (HoL) Blocking na Camada de Transporte TCP"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::meta
  - freq::high
---

## Pergunta
O que é o fenômeno de **Head-of-Line (HoL) Blocking** na camada de transporte TCP e por que a perda de um único pacote bloqueia todo o stream?

## Resposta
### Quick Answer
**Solução Direta**:
- O TCP expõe à aplicação a abstração de um **stream contínuo e estritamente ordenado de bytes**.
- **HoL Blocking**: Se o pacote com \`seq=2\` for perdido no trânsito, o kernel do receptor recebe e armazena em buffer os pacotes subsequentes (\`seq=3, 4, 5\`), mas **proíbe a aplicação de ler qualquer um deles** até que o pacote 2 seja retransmitido com sucesso e chegue ao destino.
- Em protocolos que multiplexam múltiplas requisições independentes em uma única conexão TCP (como o HTTP/2), a perda de 1 pacote de uma imagem paralisa a entrega de todas as outras requisições e respostas ativas simultaneamente.

### Dual Coding Visual
| Situação da Rede | Comportamento no Kernel do Receptor | Impacto no App |
|---|---|---|
| **Fluxo Normal** | Pacotes 1, 2, 3 chegam em ordem | Leitura imediata contínua |
| **Perda do Pacote 2**| Pacotes 3 e 4 retidos no buffer do socket | App bloqueado esperando retransmissão do pacote 2 |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como o HTTP/3 Resolve o HoL Blocking
- O **HTTP/3** substitui o TCP pelo protocolo **QUIC (sobre UDP)**.
- No QUIC, cada stream de dados possui sua própria máquina de estados e números de sequência independentes. Se o pacote de um stream for perdido, **apenas aquele stream específico pausa**, enquanto todos os outros streams continuam transmitindo sem nenhum atraso.

#### Key Takeaways
- O HoL Blocking é uma limitação arquitetural intrínseca da garantia de ordem sequencial do TCP, e não um bug de implementação.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/tcp-udp-transport/CS-NET-TCP-001.md', `---
id: CS-NET-TCP-001
title: "Controle de Congestionamento TCP: CUBIC (Loss-Based) vs BBR (Model-Based)"
tags:
  - level::l4-pleno
  - topic::cs::networking
  - company::netflix
  - freq::high
---

## Pergunta
Como operam os algoritmos de controle de congestionamento TCP baseados em perda (**TCP CUBIC**) versus baseados em modelo (**TCP BBR**)?

## Resposta
### Quick Answer
**Solução Direta**:
- **TCP CUBIC (Padrão Linux / Loss-Based)**:
  - Aumenta agressivamente a janela de congestionamento (\`cwnd\`) através de uma função cúbica até que ocorra **perda de pacotes**.
  - Ao detectar perda, reduz a janela pela metade e recomeça.
  - *Problema*: Em conexões com roteadores com buffers gigantes (*Bufferbloat*), o CUBIC enche os buffers antes de detectar perdas, inflando a latência RTT em centenas de milissegundos.
- **TCP BBR (Bottleneck Bandwidth and RTT / Google)**:
  - Não espera a perda de pacotes ocorrer; mede continuamente a **largura de banda do gargalo** ($B_{\\text{bottleneck}}$) e o **tempo de trânsito mínimo** ($RTT_{\\text{min}}$).
  - Mantém a quantidade exata de dados em trânsito igual ao produto $BDP = B_{\\text{bottleneck}} \\times RTT_{\\text{min}}$, maximizando a vazão sem inflar os buffers de fila.

### Dual Coding Visual
| Algoritmo | Sinal Primário de Congestionamento | Comportamento sob Bufferbloat |
|---|---|---|
| **TCP CUBIC** | Perda de pacotes (Packet Drop) | Enche buffers de roteador, gerando alta latência |
| **TCP BBR** | Variação de RTT mínimo e taxa de entrega | Mantém buffers vazios e latência mínima constante |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Ativar TCP BBR no Kernel Linux
\`\`\`bash
# Verifica os algoritmos disponíveis no sistema:
sysctl net.ipv4.tcp_available_congestion_control

# Ativa BBR como algoritmo padrão de congestionamento:
sudo sysctl -w net.core.default_qdisc=fq
sudo sysctl -w net.ipv4.tcp_congestion_control=bbr
\`\`\`

#### Key Takeaways
- O algoritmo BBR foi desenvolvido pelo Google e entrega até 20% mais vazão e 10x menor latência em redes com perdas espúrias (redes móveis 4G/5G e Wi-Fi).

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/tcp-udp-transport/CS-NET-TCP-004.md', `---
id: CS-NET-TCP-004
title: "Janela Deslizante (Sliding Window), Window Scaling e BDP"
tags:
  - level::l4-pleno
  - topic::cs::networking
  - company::apple
  - freq::high
---

## Pergunta
Como o mecanismo de **Janela Deslizante (Sliding Window)** e **Window Scaling** do TCP permite atingir máxima utilização do Bandwidth-Delay Product (BDP)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Sliding Window**: Mecanismo de controle de fluxo onde o receptor anuncia no cabeçalho TCP quantos bytes seu buffer de socket consegue receber sem estourar (\`Receive Window - rwnd\`). O emissor envia múltiplos pacotes em voo sem esperar ACK individual para cada um.
- **BDP (Bandwidth-Delay Product)**: A capacidade de dados que a rede consegue manter em trânsito simultâneo:
  $$\\text{BDP} = \\text{Largura de Banda} \\times \\text{RTT}$$
  *Ex*: Link de 10 Gbps com 50ms de RTT $\\implies \\text{BDP} = 10^9 \\text{ B/s} \\times 0.05\\text{ s} = 62.5 \\text{ MB}$.
- **Window Scaling (RFC 1323)**: O cabeçalho TCP padrão limita o campo de janela a 16 bits (máximo 64 KB). A opção Window Scale multiplica esse valor por potências de 2 (até $2^{14}$), permitindo janelas de até **1 GB**, viabilizando alta vazão em conexões de alta velocidade.

### Dual Coding Visual
| Tipo de Janela | Tamanho Máximo de Janela | Vazão Máxima em Link com 50ms RTT |
|---|---|---|
| **TCP Padrão (Sem Scale)** | 64 KB (16 bits) | ~10 Mbps (Gargalo severo) |
| **TCP com Window Scaling** | Até 1 GB (Fator $2^{14}$) | 10+ Gbps (Satura o link físico) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental do Cano de Água
- **Largura de Banda**: O diâmetro do cano.
- **RTT**: O comprimento do cano.
- **BDP**: O volume total de água que cabe dentro do cano. Se a janela TCP for menor que o BDP, o cano fica quase vazio, operando com uma fração ínfima de sua capacidade.

#### Key Takeaways
- Para links transoceânicos ou de data centers com alto BDP (*Long Fat Networks - LFNs*), Window Scaling e buffers de socket afinados no Linux são obrigatórios.

</details>
`);

// ==========================================
// 2. http-protocols
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/networking/http-protocols/CS-NET-HTTP-000.md', `---
id: CS-NET-HTTP-000
title: "Limitações de Performance do HTTP/1.1 e Ineficiência de Pipelining"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::google
  - freq::high
---

## Pergunta
Quais foram as limitações de performance do **HTTP/1.1** (como o Head-of-Line Blocking de requisições) que motivaram o surgimento do HTTP/2?

## Resposta
### Quick Answer
**Solução Direta**:
- **HTTP/1.1 Head-of-Line Blocking na Camada de Aplicação**: Em uma única conexão TCP, o cliente só pode receber a Resposta 2 após o servidor concluir e enviar 100% da Resposta 1. Se uma query de banco na Resposta 1 demorar 3 segundos, todos os outros recursos enfileirados ficam travados.
- **Falha do HTTP Pipelining**: Embora permitisse enviar múltiplas requisições sem esperar resposta, os servidores continuavam obrigados a responder em ordem estrita de chegada, e intermediários (proxies) frequentemente quebravam o pipeline.
- **Contornos Ineficientes**: Navegadores eram forçados a abrir **6 conexões TCP simultâneas por domínio**, exigindo 6 handshakes TCP/TLS separados e multiplicando a carga nos servidores.

### Dual Coding Visual
| Problema no HTTP/1.1 | Impacto de Performance | Solução Adotada no HTTP/2 |
|---|---|---|
| **HoL Blocking de Requisições** | 1 resposta lenta bloqueia a fila | Multiplexing com Streams Binários |
| **Cabeçalhos Redundantes** | Envia cookies/headers texto repetidos | Compressão HPACK com tabela de estado |
| **Conexões Múltiplas (6 por host)**| Múltiplos handshakes TCP/TLS pesados | 1 única conexão TCP multiplexada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Técnicas de Hack Antigas do Frontend (Obsoletas no HTTP/2+)
- **Domain Sharding**: Espalhar assets por múltiplos subdomínios (\`cdn1.exemplo.com\`, \`cdn2.exemplo.com\`) para burlar o limite de 6 conexões.
- **CSS Sprites / Inlining**: Juntar 50 ícones em uma única imagem PNG gigante ou embutir Base64 no HTML para economizar requisições HTTP.

#### Key Takeaways
- No HTTP/2 e HTTP/3, essas técnicas antigas se tornaram anti-patterns, pois prejudicam o cache individual de arquivos no navegador.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/http-protocols/CS-NET-HTTP-002.md', `---
id: CS-NET-HTTP-002
title: "HTTP/2 Multiplexing com Frames Binários e Streams Independentes"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::amazon
  - freq::high
---

## Pergunta
Como o **HTTP/2 Multiplexing** permite trafegar centenas de requisições e respostas simultâneas em uma única conexão TCP?

## Resposta
### Quick Answer
**Solução Direta**:
- **Framing Binário**: O HTTP/2 divide todas as mensagens em frames binários atômicos tipados (\`HEADERS\`, \`DATA\`, \`SETTINGS\`, \`RST_STREAM\`), substituindo o texto puro do HTTP/1.1.
- **Streams Independentes**: Cada par de requisição/resposta recebe um **Stream ID** numérico único (ímpares iniciados pelo cliente, pares pelo servidor).
- **Multiplexação Real**: Frames de dezenas de streams distintos são intercalados livremente na mesma conexão TCP em tempo real. O receptor remonta as mensagens baseado no Stream ID, eliminando o Head-of-Line Blocking na camada de aplicação.

### Dual Coding Visual
| Camada de Mensagem | HTTP/1.1 | HTTP/2 |
|---|---|---|
| **Formato de Protocolo** | Texto puro delimitado por CRLF (\`\\r\\n\`) | Frames binários estruturados em bytes |
| **Conexões TCP por Origem**| 6 conexões independentes paralelas | 1 conexão única compartilhada |
| **Ordem de Entrega** | Estritamente sequencial por conexão | Multiplexada e intercalada em tempo real |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estrutura de um Frame Binário HTTP/2 (9 Bytes de Cabeçalho)
\`\`\`text
+-----------------------------------------------+
|                 Length (24)                   |
+---------------+---------------+---------------+
|   Type (8)    |   Flags (8)   |
+---------------+---------------+---------------+
|R|                 Stream ID (31)              |
+-----------------------------------------------+
|                   Payload                     |
+-----------------------------------------------+
\`\`\`

#### Key Takeaways
- O HTTP/2 suporta priorização de streams (*Stream Prioritization*), permitindo que o navegador declare que o arquivo CSS principal tem prioridade de entrega sobre imagens de rodapé.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/http-protocols/CS-NET-HTTP-003.md', `---
id: CS-NET-HTTP-003
title: "HTTP/3 sobre QUIC/UDP e Eliminação de Head-of-Line Blocking de Transporte"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::meta
  - freq::high
---

## Pergunta
Como o **HTTP/3 sobre QUIC/UDP** elimina o Head-of-Line Blocking na camada de transporte e atinge 0-RTT de estabelecimento?

## Resposta
### Quick Answer
**Solução Direta**:
- **QUIC sobre UDP**: O HTTP/3 abandona o TCP e opera sobre o protocolo **QUIC**, que roda em userspace sobre datagramas **UDP**.
- **Eliminação Total de HoL Blocking**: No QUIC, cada stream possui seu próprio controle de perdas e números de sequência isolados. Se 1 pacote de um stream for perdido, **apenas esse stream pausa para retransmissão**; todos os outros streams continuam entregando bytes sem interrupção.
- **Handshake Unificado (0-RTT / 1-RTT)**: O QUIC funde o handshake de transporte com o handshake de criptografia do **TLS 1.3** em um único fluxo, estabelecendo conexão segura em **1 RTT** (ou **0-RTT** para conexões reutilizadas com chaves pré-compartilhadas).

### Dual Coding Visual
| Propriedade de Rede | HTTP/2 (sobre TCP + TLS 1.3) | HTTP/3 (sobre QUIC / UDP) |
|---|---|---|
| **Camada de Transporte** | TCP (Kernel) | QUIC sobre UDP (Userspace) |
| **HoL Blocking sob Perda de Pacote**| Trava todos os streams da conexão | Trava apenas o stream afetado |
| **Latência de Handshake Inicial**| 2 a 3 RTTs (TCP + TLS separados) | 1 RTT unificado (0-RTT com cache) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Comparação de Latência em Redes Instáveis
- Em redes com 2% de perda de pacotes (redes móveis e Wi-Fi público), o HTTP/2 sofre quedas severas de vazão devido ao HoL blocking do TCP. O HTTP/3 mantém performance praticamente constante e entrega páginas até **30% mais rápido**.

#### Key Takeaways
- O HTTP/3 utiliza **QPACK** para compressão de headers, evitando dependências de ordem que reintroduziriam HoL blocking entre streams.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/http-protocols/CS-NET-HTTP-001.md', `---
id: CS-NET-HTTP-001
title: "Compressão de Cabeçalhos HPACK (HTTP/2) vs QPACK (HTTP/3)"
tags:
  - level::l4-pleno
  - topic::cs::networking
  - company::netflix
  - freq::high
---

## Pergunta
Como funciona a compressão de cabeçalhos **HPACK** no HTTP/2 e por que o HTTP/3 precisou substituí-la pelo **QPACK**?

## Resposta
### Quick Answer
**Solução Direta**:
- **HPACK (HTTP/2)**: Reduz o tamanho de cabeçalhos em até 85% usando 3 mecanismos:
  1. *Tabela Estática*: 61 cabeçalhos pré-definidos (\`:method: GET\`, \`:status: 200\`) referenciados por índices de 1 byte.
  2. *Tabela Dinâmica*: Armazena novos headers observados na sessão (ex: tokens JWT longos) para referenciá-los por índice em requisições futuras.
  3. *Codificação Huffman Estática*: Compacta strings personalizadas.
- **Problema no HTTP/3**: O HPACK assume que todos os frames de headers chegam em **ordem estrita**. No QUIC (onde streams chegam fora de ordem), o HPACK causaria bloqueio mútuo entre streams esperando atualizações da tabela dinâmica.
- **QPACK (HTTP/3)**: Separa os fluxos em **Encoder Stream** e **Decoder Stream** dedicados, permitindo decodificação não-bloqueante mesmo com perda de pacotes.

### Dual Coding Visual
| Mecanismo de Compressão | Protocolo | Tolerância a Entrega Fora de Ordem |
|---|---|---|
| **HPACK** | HTTP/2 (sobre TCP) | Não suporta (Exige entrega estritamente ordenada) |
| **QPACK** | HTTP/3 (sobre QUIC) | Totalmente tolerante (Usa streams de controle dedicados) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que GZIP não é Usado em Cabeçalhos (Ataque CRIME)
- O algoritmo DEFLATE/GZIP em cabeçalhos HTTP foi proibido após a vulnerabilidade criptográfica **CRIME** (2012), onde atacantes conseguiam inferir cookies secretos observando o tamanho de payloads comprimidos com dados controlados pelo invasor.
- O HPACK foi projetado do zero para ser imune a esse vetor de ataque.

#### Key Takeaways
- Um cabeçalho repetido com token JWT de 1 KB que consumiria 1 KB por requisição em HTTP/1.1 é comprimido para **apenas 2 bytes** em HPACK/QPACK após a primeira transmissão.

</details>
`);

// ==========================================
// 3. dns-tls
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/networking/dns-tls/CS-NET-DNS-000.md', `---
id: CS-NET-DNS-000
title: "Arquitetura Hierárquica do DNS: Resolvedor Recursivo vs Servidor Autoritativo"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::google
  - freq::high
---

## Pergunta
Como funciona a resolução hierárquica do **DNS** e qual a diferença entre um **Resolvedor Recursivo** e um **Servidor Autoritativo**?

## Resposta
### Quick Answer
**Solução Direta**:
- O **DNS (Domain Name System)** é um banco de dados distribuído global em árvore hierárquica que traduz nomes legíveis (\`api.exemplo.com\`) em endereços IP:
  1. **Resolvedor Recursivo (ex: 8.8.8.8 / ISP)**: Recebe a consulta do cliente e faz todo o trabalho de buscar na árvore hierárquica em múltiplos passos.
  2. **Root Servers (\`.\`)**: 13 grupos de clusters globais que direcionam a consulta para o servidor TLD correto.
  3. **TLD Servers (\`.com\`, \`.br\`)**: Servidores que apontam para os servidores com autoridade sobre o domínio específico.
  4. **Servidor Autoritativo (ex: Route 53, Cloudflare DNS)**: O servidor oficial do dono do domínio que armazena os registros DNS finais (A, AAAA, CNAME) e entrega a resposta definitiva com autoridade.

### Dual Coding Visual
| Tipo de Servidor DNS | Papel no Fluxo de Resolução | Armazena Registros Definitivos? |
|---|---|---|
| **Resolvedor Recursivo** | Faz buscas iterativas e armazena cache local | Não (Apenas retém em cache pelo TTL) |
| **Root & TLD Server** | Direciona para o próximo nível da hierarquia | Não (Apenas ponteiros NS) |
| **Servidor Autoritativo** | Detém a fonte da verdade oficial do domínio | Sim (Registros oficiais do dono) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Passo a Passo da Resolução de \`api.google.com\`
\`\`\`text
1. Cliente -> Resolvedor Recursivo: "Qual o IP de api.google.com?"
2. Recursivo -> Root Server (.): "Quem cuida de .com?" -> Resposta: TLD Server de .com
3. Recursivo -> TLD Server (.com): "Quem cuida de google.com?" -> Resposta: NS da Google
4. Recursivo -> Servidor Autoritativo da Google: "Qual o IP de api.google.com?" -> Resposta: 142.250.190.46
5. Recursivo armazena em cache e retorna o IP final para o cliente.
\`\`\`

#### Key Takeaways
- Mais de 95% das consultas DNS do dia a dia são resolvidas instantaneamente pelo cache do Resolvedor Recursivo ou do próprio sistema operacional.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/dns-tls/CS-NET-DNS-002.md', `---
id: CS-NET-DNS-002
title: "TTL (Time to Live) em DNS e Tipos de Registros (A, AAAA, CNAME, ALIAS)"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::amazon
  - freq::high
---

## Pergunta
O que é o **TTL (Time to Live)** em registros DNS e quais as diferenças fundamentais entre registros **A, AAAA, CNAME e ALIAS**?

## Resposta
### Quick Answer
**Solução Direta**:
- **TTL (Time to Live)**: Tempo em segundos que um registro DNS pode ser retido em cache por resolvedores recursivos e navegadores antes de exigir nova consulta ao servidor autoritativo.
  - *TTL Alto (86400s / 24h)*: Reduz tráfego e latência; dificulta migrações rápidas de IP em emergências.
  - *TTL Baixo (60s)*: Permite failover rápido de DNS; aumenta carga de consultas.
- **Tipos de Registros**:
  - **A**: Mapeia nome para endereço **IPv4** (32 bits, ex: \`192.0.2.1\`).
  - **AAAA**: Mapeia nome para endereço **IPv6** (128 bits, ex: \`2001:db8::1\`).
  - **CNAME (Canonical Name)**: Aponta um alias para outro domínio (*não pode ser usado na raiz apex do domínio*).
  - **ALIAS / ANAME**: Registro virtual que resolve o IP de outro domínio em tempo real e entrega registros A/AAAA na raiz do domínio (\`exemplo.com\`).

### Dual Coding Visual
| Registro DNS | Tipo de Destino | Permite Raiz Apex (\`exemplo.com\`)? |
|---|---|---|
| **A / AAAA** | Endereço IP direto (IPv4 / IPv6) | Sim |
| **CNAME** | Outro nome de domínio (Alias) | Não (RFC proíbe coexistência com SOA/NS) |
| **ALIAS / ANAME** | Resolução interna para IP | Sim (Suportado por Route53/Cloudflare) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estratégia de Migração de Servidores em Produção
- **48 horas antes da migração**: Reduzir o TTL do domínio de 86400s (24h) para 300s (5 minutos).
- **No momento da virada**: Alterar o IP do registro A. Em 5 minutos, 100% dos clientes globais estarão apontando para o novo servidor.
- **Após estabilização**: Retornar o TTL para valor mais alto para economizar custos de consulta DNS.

#### Key Takeaways
- Alterações em registros DNS não propagam instantaneamente devido aos caches dos provedores respeitando o TTL configurado anteriormente.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/dns-tls/CS-NET-DNS-001.md', `---
id: CS-NET-DNS-001
title: "Handshake do TLS 1.3 (1-RTT e 0-RTT PSK) vs TLS 1.2 (2-RTT)"
tags:
  - level::l4-pleno
  - topic::cs::networking
  - company::meta
  - freq::high
---

## Pergunta
Como o **Handshake do TLS 1.3** reduziu a latência de estabelecimento seguro para 1 RTT (ou 0-RTT com PSK) em relação ao TLS 1.2?

## Resposta
### Quick Answer
**Solução Direta**:
- **TLS 1.2 (2 RTTs)**:
  - RTT 1: Troca de algoritmos suportados (\`ClientHello\` $\\to$ \`ServerHello\` + Certificado).
  - RTT 2: Troca de chaves Diffie-Hellman e verificação de integridade (\`ClientKeyExchange\` $\\to$ \`Finished\`).
- **TLS 1.3 (1 RTT)**:
  - O cliente adivinha os algoritmos criptográficos modernos mais comuns e **envia sua chave pública Diffie-Hellman (ECDHE) já dentro do primeiro \`ClientHello\`**.
  - O servidor responde com seu certificado e sua chave pública no \`ServerHello\`. A partir desse momento, ambos já possuem a chave de sessão simétrica (AES-GCM) pronta em **1 único RTT**.
- **0-RTT Resumption (Early Data)**: Clientes que já visitaram o site anteriormente utilizam um *Pre-Shared Key (PSK)* para enviar dados criptografados na primeira mensagem, com **zero RTT** de espera.

### Dual Coding Visual
| Versão TLS | RTTs de Handshake | Algoritmos Criptográficos Legados (RSA Key Exch, CBC, MD5) |
|---|---|---|
| **TLS 1.2** | 2 RTTs | Suportados (Vulnerabilidades conhecidas) |
| **TLS 1.3** | 1 RTT (0-RTT com PSK) | Removidos totalmente (Apenas Ciphers Seguros) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Proteção contra Replay Attack em 0-RTT
- Mensagens enviadas em 0-RTT podem ser capturadas por um atacante e reenviadas (*Replay Attack*).
- Por essa razão, servidores e CDNs só aceitam requisições **idempotentes e seguras (como HTTP GET)** no modo 0-RTT; mutações (POST/PUT de pagamento) são forçadas a esperar o handshake de 1 RTT completo.

#### Key Takeaways
- O TLS 1.3 eliminou todas as cifras criptográficas inseguras do passado e tornou o algoritmo **Ephemeral Diffie-Hellman (ECDHE)** obrigatório, garantindo **Forward Secrecy** total.

</details>
`);

// ==========================================
// 4. socket-io-epoll
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/networking/socket-io-epoll/CS-NET-SOCK-000.md', `---
id: CS-NET-SOCK-000
title: "Ciclo de Vida de Sockets TCP no Servidor (socket, bind, listen, accept)"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::google
  - freq::high
---

## Pergunta
Qual é o ciclo de vida completo e a sequência de syscalls de um **Socket TCP no servidor** no sistema operacional?

## Resposta
### Quick Answer
**Solução Direta**:
- A sequência padrão de chamadas de sistema no Linux para servidores TCP é:
  1. **\`socket(AF_INET, SOCK_STREAM, 0)\`**: Cria o endpoint de comunicação e retorna um *File Descriptor (FD)*.
  2. **\`bind(fd, sockaddr, addrlen)\`**: Associa o socket a um endereço IP e porta local específicos (ex: \`0.0.0.0:8080\`).
  3. **\`listen(fd, backlog)\`**: Coloca o socket em estado passivo de escuta e define a fila de conexões pendentes (*SYN Queue e Accept Queue*).
  4. **\`accept(fd, ...)\`**: Bloqueia até que uma conexão complete o Three-Way Handshake, retornando um **novo File Descriptor dedicado exclusivamente àquele cliente**.
  5. **\`recv()\` / \`send()\`**: Leitura e escrita bidirecional de dados.
  6. **\`close(client_fd)\`**: Encerra a conexão e dispara o Four-Way Handshake de término (FIN/ACK).

### Dual Coding Visual
| Syscall no Servidor | Estado do Socket | Função no Kernel |
|---|---|---|
| **\`socket()\` + \`bind()\`** | Fechado / Associado à Porta | Aloca estrutura no kernel e reserva porta |
| **\`listen()\`** | \`LISTEN\` | Cria filas de conexões de entrada (*backlog*) |
| **\`accept()\`** | Cria novo FD em \`ESTABLISHED\` | Desempilha conexão pronta da fila |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o \`accept()\` Retorna um Novo File Descriptor?
- O socket original passado no \`listen()\` é o **Listening Socket** (seu único papel é aceitar novos clientes na porta 8080).
- Cada cliente aceito recebe um **Connected Socket** isolado com sua própria porta remota, buffers de leitura/escrita e máquina de estados, permitindo ao servidor atender milhares de clientes em paralelo.

#### Key Takeaways
- O parâmetro \`backlog\` do \`listen()\` define o tamanho máximo da fila de clientes que concluíram o handshake e estão aguardando o servidor chamar \`accept()\`.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/socket-io-epoll/CS-NET-SOCK-002.md', `---
id: CS-NET-SOCK-002
title: "Estado TIME_WAIT na Máquina de Estados TCP e Período 2MSL"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::netflix
  - freq::high
---

## Pergunta
O que é o estado **TIME_WAIT** no encerramento de conexões TCP e por que o kernel mantém o socket retido por $2 \times \text{MSL}$ (~60s)?

## Resposta
### Quick Answer
**Solução Direta**:
- **TIME_WAIT**: É o estado final assumido pelo nó que toma a iniciativa de **fechar ativamente a conexão** (\`active closer\`) após enviar o último ACK do encerramento (Four-Way Teardown).
- O kernel mantém a 4-tupla (\`IP_origem, Porta_origem, IP_destino, Porta_destino\`) bloqueada por **$2 \times \text{MSL}$ (Maximum Segment Lifetime)**, tipicamente 60 segundos no Linux, por 2 razões fundamentais:
  1. **Garantir a entrega do último ACK**: Se o último ACK for perdido, o outro nó retransmitirá seu \`FIN\`; estando em \`TIME_WAIT\`, o nó reenvia o \`ACK\` sem emitir um erro de conexão resetada (\`RST\`).
  2. **Drenagem de pacotes fantasmas**: Garante que qualquer pacote atrasado ou duplicado da conexão anterior morra na rede antes que uma nova conexão use a mesma porta.

### Dual Coding Visual
| Lado do Encerramento | Sequência de Estados de Término | Assume TIME_WAIT? |
|---|---|---|
| **Active Closer (Inicia o Close)** | \`ESTABLISHED\` $\\to$ \`FIN_WAIT_1\` $\\to$ \`FIN_WAIT_2\` $\\to$ **\`TIME_WAIT\`** | **Sim (Retido por 2MSL)** |
| **Passive Closer (Recebe o FIN)** | \`ESTABLISHED\` $\\to$ \`CLOSE_WAIT\` $\\to$ \`LAST_ACK\` $\\to$ \`CLOSED\` | Não (Liberado após o último ACK) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Perigo de Saturação de Portas Efêmeras (TIME_WAIT Accumulation)
- Se um servidor backend abrir e fechar milhares de conexões HTTP curtas por segundo com um banco de dados ou microsserviço sem Connection Pooling:
- Todas as ~30.000 portas efêmeras locais entram em \`TIME_WAIT\`, causando o erro clássico **\`EADDRNOTAVAIL (Cannot assign requested address)\`**.
- **Solução**: Usar conexões persistentes (*HTTP Keep-Alive / Connection Pool*) ou habilitar \`tcp_tw_reuse\` no kernel Linux.

#### Key Takeaways
- TIME_WAIT não é um vazamento de memória nem um bug, mas um mecanismo de segurança essencial do protocolo TCP.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/socket-io-epoll/CS-NET-SOCK-001.md', `---
id: CS-NET-SOCK-001
title: "Algoritmo de Nagle vs TCP_NODELAY para Aplicações de Baixa Latência"
tags:
  - level::l4-pleno
  - topic::cs::networking
  - company::meta
  - freq::high
---

## Pergunta
O que faz o **Algoritmo de Nagle** e por que aplicações backend de baixa latência e microsserviços desabilitam esse algoritmo via **\`TCP_NODELAY\`**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Algoritmo de Nagle (RFC 896)**: Projetado para evitar o envio de pacotes minúsculos com 40 bytes de cabeçalho TCP/IP para transportar apenas 1 byte de payload (*Tinygrams*).
  - *Mecânica*: Se houver dados menores que 1 MSS (\`~1460 bytes\`) e houver pacotes em trânsito sem confirmação de ACK, o kernel **atém e agrupa os dados no buffer** até receber o ACK ou atingir o tamanho do MSS.
- **Interação Destrutiva com Delayed ACK**: O receptor do TCP normalmente aguarda até 40-200ms para enviar um ACK (*Delayed ACK*). A combinação de **Nagle no emissor + Delayed ACK no receptor** introduz atrasos artificiais de **40 a 200 milissegundos** em cada requisição RPC curta.
- **\`TCP_NODELAY\`**: Flag de socket que desabilita o Algoritmo de Nagle, forçando o kernel a enviar qualquer fragmento de dados imediatamente para a rede sem espera.

### Dual Coding Visual
| Configuração de Socket | Comportamento de Envio | Latência em Mensagens Pequenas (gRPC / Redis) |
|---|---|---|
| **Nagle Ativado (Padrão Antigo)** | Agrupa bytes até receber ACK | ~40 a 200 ms de atraso com Delayed ACK |
| **\`TCP_NODELAY\` Ativado** | Envio instantâneo na rede | Latência de trânsito em nanossegundos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Habilitando TCP_NODELAY
\`\`\`go
package main

import "net"

func configureSocket(conn net.Conn) error {
  if tcpConn, ok := conn.(*net.TCPConn); ok {
    // Go habilita TCP_NODELAY como true por padrão em todas as conexões de rede:
    return tcpConn.SetNoDelay(true)
  }
  return nil
}
\`\`\`

#### Key Takeaways
- Todos os frameworks modernos de backend e microsserviços (Netty, gRPC, Node.js, Go) habilitam \`TCP_NODELAY\` por padrão para eliminar a latência de Nagle.

</details>
`);

// ==========================================
// 5. modern-apis-protocols
// ==========================================

writeAndValidateCard('decks/02-cs-fundamentals/networking/modern-apis-protocols/CS-NET-API-000.md', `---
id: CS-NET-API-000
title: "Comparação de Paradigmas: REST vs WebSockets vs Server-Sent Events (SSE)"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::google
  - freq::high
---

## Pergunta
Quais são as diferenças fundamentais de modelo de comunicação entre **HTTP REST**, **WebSockets** e **Server-Sent Events (SSE)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **HTTP REST (Request/Response)**: Modelo unidirecional iniciado exclusivamente pelo cliente. O servidor não pode enviar dados espontaneamente sem requisição prévia; alto overhead se usado com polling periódico.
- **WebSockets (Full-Duplex Bidirecional)**: Conexão TCP persistente bidirecional sobre 1 único socket. Cliente e servidor podem transmitir mensagens simultaneamente com overhead de framing de apenas 2 a 10 bytes. Ideal para chat, jogos multiplayer e colaboração em tempo real.
- **Server-Sent Events (SSE - Unidirecional Servidor $\\to$ Cliente)**: Fluxo contínuo de texto sobre HTTP padrão (\`text/event-stream\`) onde o servidor envia atualizações em tempo real para o cliente. Suporta reconexão automática nativa; ideal para feeds de notícias, cotações financeiras e streaming de tokens de LLMs (ChatGPT).

### Dual Coding Visual
| Protocolo | Direção da Comunicação | Protocolo Base |
|---|---|---|
| **HTTP REST** | Unidirecional (Cliente $\to$ Servidor) | HTTP/1.1 ou HTTP/2 |
| **WebSockets** | Full-Duplex (Bidirecional) | TCP Puro (via Upgrade) |
| **SSE** | Unidirecional (Servidor $\to$ Cliente) | HTTP (\`text/event-stream\`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que LLMs usam SSE em vez de WebSockets?
- Plataformas de IA generativa transmitem respostas usando **SSE** porque o fluxo de tokens é estritamente unidirecional (do servidor para o cliente).
- SSE roda sobre HTTP padrão, aproveitando balanceadores de carga existentes, autenticação HTTP tradicional, TLS e compressão sem o overhead de gerenciar estado de sockets bidirecionais.

#### Key Takeaways
- Use WebSockets para tráfego bidirecional intenso e SSE para streaming unidirecional do servidor para o cliente.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/modern-apis-protocols/CS-NET-API-002.md', `---
id: CS-NET-API-002
title: "Serialização Binária com Protocol Buffers em gRPC vs JSON"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::netflix
  - freq::high
---

## Pergunta
Por que o framework **gRPC com Protocol Buffers (Protobuf)** é significativamente mais rápido e compacto que **REST com JSON** em microsserviços?

## Resposta
### Quick Answer
**Solução Direta**:
- **Serialização Binária Tipada**:
  - *JSON*: Texto legível com nomes de campos repetidos em cada mensagem (\`{"user_id": 123}\`), exigindo parsing de strings caro na CPU.
  - *Protobuf*: Codifica campos como **tags numéricas binárias (Field Numbers)** com inteiros de tamanho variável (*Varints*), gerando payloads **3x a 10x menores**.
- **Parsing em Nível de Hardware**:
  - Protobuf é deserializado diretamente para structs tipadas sem necessidade de analisar sintaxe de texto, sendo **5x a 8x mais rápido em uso de CPU**.
- **Transporte Otimizado**: gRPC roda nativamente sobre **HTTP/2**, aproveitando multiplexação de streams, compressão de headers e conexões TCP persistentes.

### Dual Coding Visual
| Métrica | REST com JSON | gRPC com Protocol Buffers |
|---|---|---|
| **Tamanho do Payload** | Grande (Texto com chaves repetidas) | Compacto binário (Tags de 1-2 bytes) |
| **Custo de CPU (Parsing)** | Alto (Conversão de strings em tipos) | Mínimo (Mapeamento direto em memória) |
| **Contrato de Tipos** | Opcional (OpenAPI / JSON Schema) | Obrigatório e Estrito (\`.proto\` compilado) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Definição Protobuf
\`\`\`text
syntax = "proto3";

message UserProfile {
  uint64 id = 1;         // Tag 1: ocupa 1 byte de identificador binário
  string name = 2;       // Tag 2
  string email = 3;      // Tag 3
  bool is_active = 4;    // Tag 4
}
\`\`\`

#### Key Takeaways
- Em arquiteturas de milhares de microsserviços com centenas de milhares de RPCs por segundo, a economia de CPU e largura de banda com gRPC reduz diretamente o número de instâncias de servidores necessárias.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/modern-apis-protocols/CS-NET-API-003.md', `---
id: CS-NET-API-003
title: "Resolução de Over-fetching e Under-fetching com GraphQL"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::meta
  - freq::high
---

## Pergunta
Como o **GraphQL** resolve os problemas clássicos de *Over-fetching* e *Under-fetching* comuns em APIs RESTful?

## Resposta
### Quick Answer
**Solução Direta**:
- **Over-fetching**: Ocorre em REST quando um endpoint retorna um objeto com 50 campos, mas o cliente móvel só precisa de 2 campos (ex: \`name\` e \`avatar\`), desperdiçando dados e bateria.
  - *Solução GraphQL*: O cliente envia uma query declarativa especificando **exatamente os campos desejados**, e o servidor retorna apenas esses campos.
- **Under-fetching (Problema $N+1$ de Rede)**: Ocorre em REST quando uma tela precisa de dados relacionados e é forçada a fazer múltiplos roundtrips sequenciais (ex: \`/users/1\`, depois \`/users/1/orders\`, depois \`/orders/10/items\`).
  - *Solução GraphQL*: Uma **única requisição HTTP** recupera toda a árvore de dados aninhados em 1 único RTT.

### Dual Coding Visual
| Problema em REST | Sintoma em Clientes Móveis | Resolução com GraphQL |
|---|---|---|
| **Over-fetching** | Baixa 100 KB de JSON para usar 2 KB | Query solicita apenas campos necessários |
| **Under-fetching** | 4 roundtrips HTTP em sequência para montar 1 tela | 1 única query aninhada resolve todo o grafo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Query GraphQL Aninhada
\`\`\`text
query GetUserProfile {
  user(id: "123") {
    name
    email
    orders(limit: 3) {
      id
      total
      items {
        productName
      }
    }
  }
}
\`\`\`

#### O Trade-off: Complexidade no Backend (Problema N+1 de Banco)
- Se não for protegido com a técnica de **DataLoader** (que agrupa IDs e faz batching com \`IN (?, ?, ?)\`), o GraphQL pode disparar centenas de queries individuais ao banco de dados no backend para resolver árvores aninhadas.

#### Key Takeaways
- GraphQL transfere a flexibilidade de composição de dados para o cliente frontend, enquanto REST mantém endpoints estáticos com caching de HTTP público simplificado em CDNs.

</details>
`);

writeAndValidateCard('decks/02-cs-fundamentals/networking/modern-apis-protocols/CS-NET-API-001.md', `---
id: CS-NET-API-001
title: "Mecanismo de Upgrade de Protocolo HTTP para WebSocket"
tags:
  - level::l4-pleno
  - topic::cs::networking
  - company::amazon
  - freq::high
---

## Pergunta
Como funciona o mecanismo de **Upgrade de Conexão HTTP para WebSocket** via cabeçalhos e negociação de chave \`Sec-WebSocket-Accept\`?

## Resposta
### Quick Answer
**Solução Direta**:
- A conexão WebSocket se inicia como uma requisição HTTP/1.1 padrão contendo cabeçalhos de upgrade:
  1. **Requisição do Cliente**:
     \`\`\`text
     GET /chat HTTP/1.1
     Host: server.exemplo.com
     Upgrade: websocket
     Connection: Upgrade
     Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
     Sec-WebSocket-Version: 13
     \`\`\`
  2. **Resposta do Servidor (Status 101 Switching Protocols)**:
     - O servidor concatena a chave recebida com um GUID global padronizado (\`258EAFA5-E914-47DA-95CA-C5AB0DC85B11\`), calcula o hash **SHA-1** e codifica em Base64, retornando no cabeçalho \`Sec-WebSocket-Accept\`.
  3. A partir deste momento, o socket abandona o protocolo HTTP e passa a transmitir **frames binários WebSocket bidirecionais** sobre o mesmo túnel TCP.

### Dual Coding Visual
| Fase da Conexão | Protocolo Ativo | Código de Status HTTP |
|---|---|---|
| **Início (Handshake)** | HTTP/1.1 (Texto com cabeçalhos de upgrade) | \`101 Switching Protocols\` |
| **Após Handshake** | WebSocket (Frames binários Full-Duplex) | Nenhum (Túnel TCP direto ativo) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Desafios com Load Balancers e Proxies
- Proxies reversos (como NGINX ou AWS ALB) precisam ser explicitamente configurados para suportar o upgrade:
\`\`\`text
location /ws {
    proxy_pass http://backend_nodes;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_read_timeout 3600s;
}
\`\`\`

#### Key Takeaways
- O cálculo do \`Sec-WebSocket-Accept\` com SHA-1 não é para autenticação ou segurança criptográfica, mas para provar que o servidor suporta nativamente a especificação WebSocket e não é um proxy HTTP desavisado.

</details>
`);

console.log('✅ Phase 2 Networking module successfully decomposed!');
