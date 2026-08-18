import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Phase 3: System Design - Messaging, Resilience & Low-Level Design...');

// ==========================================
// 1. message-queues
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/messaging-streaming/message-queues/SYS-MSG-QUEUES-000.md', `---
id: SYS-MSG-QUEUES-000
title: "Filas de Mensagens (RabbitMQ / SQS): Point-to-Point vs Publish-Subscribe"
tags:
  - level::l3-junior
  - topic::sys::messaging
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença conceitual entre o modelo Ponto a Ponto (Point-to-Point) e o modelo Publicação/Assinatura (Pub/Sub) em message brokers?

## Resposta
### Quick Answer
**Solução Direta**:
- **Ponto a Ponto (Queue / Worker Pool)**:
  - Cada mensagem enviada para a fila é processada por **exatamente um consumidor** entre os múltiplos workers disponíveis (*Competing Consumers*).
  - Ideal para distribuição balanceada de tarefas pesadas em background.
- **Publicação/Assinatura (Topic / Exchange)**:
  - O produtor publica a mensagem em um **Tópico/Fanout Exchange**.
  - A mensagem é copiada e entregue a **todos os assinantes inscritos** (cada serviço consumidor recebe sua própria cópia independente da mensagem).

### Dual Coding Visual
| Modelo de Mensageria | Quantidade de Consumidores por Mensagem | Caso de Uso Primário |
|---|---|---|
| **Point-to-Point (Queue)** | Exatamente 1 consumidor | Processamento de tarefas assíncronas |
| **Publish-Subscribe (Topic)** | Múltiplos consumidores (Broadcast) | Disseminação de eventos de domínio |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Prático: Evento \`OrderPlaced\`
- No modelo Pub/Sub, o evento \`OrderPlaced\` é entregue simultaneamente para:
  1. \`PaymentWorkerQueue\` (cobrar o cartão).
  2. \`InventoryWorkerQueue\` (reservar itens).
  3. \`NotificationWorkerQueue\` (enviar e-mail de confirmação).

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/messaging-streaming/message-queues/SYS-MSG-QUEUES-001.md', `---
id: SYS-MSG-QUEUES-001
title: "Dead Letter Queues (DLQ) e Visibility Timeout no Amazon SQS"
tags:
  - level::l4-pleno
  - topic::sys::messaging
  - company::aws
  - freq::high
---

## Pergunta
Como o mecanismo de Visibility Timeout e Dead Letter Queue (DLQ) previne perda de mensagens e travamentos por 'Mensagens Venenosas' (*Poison Pills*)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Visibility Timeout**:
  - Quando um consumidor busca uma mensagem no SQS, a mensagem **não é deletada**; ela fica temporariamente **invisível** para outros consumidores durante o timeout (ex: 30 segundos).
  - Se o consumidor processar e deletar a mensagem com sucesso, ela é removida definitivamente.
  - Se o consumidor sofrer crash ou timeout, a mensagem volta a ficar visível para outro worker processá-la.
- **Dead Letter Queue (DLQ)**:
  - Se uma mensagem falhar consecutivamente mais de $N$ vezes (\`maxReceiveCount\`, ex: 5 tentativas devido a bugs ou formato inválido - *Poison Pill*), o broker a move automaticamente para uma **DLQ isolada** para auditoria manual sem bloquear a fila principal.

### Dual Coding Visual
| Parâmetro SQS | Finalidade | Comportamento sob Falha |
|---|---|---|
| **Visibility Timeout** | Prevenir processamento duplicado temporário | Mensagem reaparece se o worker falhar |
| **maxReceiveCount** | Limite de tentativas de reprocessamento | Aciona desvio para a DLQ |
| **DLQ (Dead Letter)** | Quarentena de mensagens com erro persistente | Isola falhas sem travar a fila ativa |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Boas Práticas de Visibility Timeout
- O \`VisibilityTimeout\` deve ser configurado como **$3x$ a $5x$ o tempo médio** de processamento do worker. Se uma tarefa for mais longa, o consumidor deve chamar periodicamente \`ChangeMessageVisibility\` para estender o prazo.

</details>
`);

// ==========================================
// 2. kafka-internals
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/messaging-streaming/kafka-internals/SYS-MSG-KAFKA-000.md', `---
id: SYS-MSG-KAFKA-000
title: "Apache Kafka: Log Append-Only, Partições e Consumer Groups"
tags:
  - level::l3-junior
  - topic::sys::messaging
  - company::linkedin
  - freq::high
---

## Pergunta
Como o particionamento de tópicos e o modelo de Consumer Groups viabilizam escalabilidade horizontal e ordem estrita de mensagens no Apache Kafka?

## Resposta
### Quick Answer
**Solução Direta**:
- **Partições como Log Append-Only**:
  - Um Tópico no Kafka é dividido em múltiplas **Partições**.
  - Cada partição é um log ordenado e imutável gravado sequencialmente em disco com identificadores sequenciais chamados **Offsets**.
- **Garantia de Ordem**: O Kafka garante ordem estrita de mensagens **dentro da mesma partição** (mensagens com a mesma \`Partition Key\` caem garantidamente na mesma partição).
- **Consumer Groups**:
  - Cada partição de um tópico é consumida por **exatamente um consumidor** dentro do mesmo Consumer Group.
  - Aumentar o paralelismo exige aumentar o número de partições ($N$ partições suportam até $N$ consumidores ativos em paralelo).

### Dual Coding Visual
| Componente Kafka | Papel Estrutural | Regra de Escala |
|---|---|---|
| **Partição** | Unidade básica de paralelismo e ordem | Mensagens com mesma chave mantêm ordem estrita |
| **Offset** | Posição sequencial do consumidor no log | Controlado pelo consumidor (replayável) |
| **Consumer Group** | Conjunto de workers balanceados | No máximo 1 consumidor por partição |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o Kafka é tão Rápido
1. **I/O Sequencial em Disco**: Append-only log aproveita a alta largura de banda sequencial do SO.
2. **OS Page Cache**: Mensagens recentes ficam na RAM gerenciadas pelo Kernel do Linux.
3. **Zero-Copy Transfer (\`sendfile\`)**: Transfere bytes do Page Cache direto para o socket de rede sem passar pelo User Space.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/messaging-streaming/kafka-internals/SYS-MSG-KAFKA-001.md', `---
id: SYS-MSG-KAFKA-001
title: "Log Compaction no Kafka e Gerenciamento de Estado (KTable / CDC)"
tags:
  - level::l4-pleno
  - topic::sys::messaging
  - company::uber
  - freq::high
---

## Pergunta
Como funciona a política de Log Compaction no Apache Kafka para manter apenas a versão mais recente de cada chave em tópicos de estado?

## Resposta
### Quick Answer
**Solução Direta**:
- **Log Retention Tradicional**: Descarta segmentos de log baseando-se em tempo (ex: 7 dias) ou tamanho total (ex: 100 GB).
- **Log Compaction**:
  - Em vez de deletar por tempo, o processo de compactação em background varre os segmentos de log e **retém exclusivamente o último valor gravado para cada chave (\`Message Key\`)**.
  - Se um valor for enviado como \`null\` (*Tombstone*), a chave é eventualmente purgada.
  - Permite utilizar tópicos Kafka como **tabelas de estado reconstruíveis (KTable)** para restauração instantânea de caches e bancos após crash.

### Dual Coding Visual
| Estratégia de Retenção | Critério de Limpeza | Caso de Uso |
|---|---|---|
| **Time-based Retention** | Idade do registro ($> N$ dias) | Eventos temporais efêmeros (Logs, métricas) |
| **Log Compaction** | Preserva o último update de cada chave | Snapshots de estado, CDC e KTables |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Compactação
- Mensagens brutas no log: \`[K1: v1] -> [K2: v1] -> [K1: v2] -> [K3: v1] -> [K1: v3]\`
- Após Log Compaction: \`[K2: v1] -> [K3: v1] -> [K1: v3]\` (versões intermediárias \`v1\` e \`v2\` de \`K1\` são removidas).

</details>
`);

// ==========================================
// 3. delivery-guarantees-idempotency
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/messaging-streaming/delivery-guarantees-idempotency/SYS-MSG-GUARANTEES-000.md', `---
id: SYS-MSG-GUARANTEES-000
title: "Garantias de Entrega: At-Least-Once vs At-Most-Once vs Exactly-Once (EOS)"
tags:
  - level::l3-junior
  - topic::sys::messaging
  - company::google
  - freq::high
---

## Pergunta
Qual é a diferença entre as garantias de entrega At-Most-Once, At-Least-Once e Exactly-Once em sistemas distribuídos de mensageria?

## Resposta
### Quick Answer
**Solução Direta**:
- **At-Most-Once (No máximo uma vez)**: Mensagens podem ser perdidas, mas nunca duplicadas. O consumidor commita o offset antes de processar a mensagem.
- **At-Least-Once (Pelo menos uma vez)**: Mensagens nunca são perdidas, mas **podem ser entregues duplicadas** devido a retries de rede. O consumidor commita o offset apenas após o término do processamento.
- **Exactly-Once Semantics (EOS)**: O efeito final no sistema de destino equivale a processar cada mensagem exatamente uma vez, combinando transações no produtor/broker com **consumidores idempotentes**.

### Dual Coding Visual
| Garantia de Entrega | Características de Risco | Padrão da Indústria |
|---|---|---|
| **At-Most-Once** | Risco de perda, zero duplicatas | Telemetria não-crítica |
| **At-Least-Once** | Zero perda, risco de duplicação (Exige Idempotência) | **Padrão ouro em Microsserviços** |
| **Exactly-Once** | Zero perda e zero duplicação | Kafka Streams / Transações 2PC |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Falácia do Exactly-Once na Rede
- No mundo real, pacotes de rede sempre podem ser reenviados após timeout. A única forma prática de alcançar *Exactly-Once* de ponta a ponta na camada de aplicação é adotar transporte *At-Least-Once* aliado a **idempotência estrita no consumidor**.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/messaging-streaming/delivery-guarantees-idempotency/SYS-MSG-GUARANTEES-001.md', `---
id: SYS-MSG-GUARANTEES-001
title: "Idempotency Keys e Deduplicação no Consumidor com Armazenamento Atômico"
tags:
  - level::l4-pleno
  - topic::sys::messaging
  - company::stripe
  - freq::high
---

## Pergunta
Como implementar processamento idempotente de pagamentos utilizando Chaves de Idempotência (Idempotency Keys) e tabelas de deduplicação no banco de dados?

## Resposta
### Quick Answer
**Solução Direta**:
- **Chave de Idempotência**: Um identificador exclusivo (UUIDv4) gerado pelo cliente/produtor para cada intenção de mutação.
- **Padrão de Deduplicação Atômica**:
  1. A requisição chega com o cabeçalho \`Idempotency-Key: id_123\`.
  2. O consumidor inicia uma transação no banco e tenta inserir na tabela \`processed_keys (idempotency_key, status, response_payload)\` com chave primária única.
  3. Se a inserção **falhar por violação de unicidade (\`UNIQUE constraint\`)**: o worker busca o \`response_payload\` previamente gravado e retorna a resposta anterior imediatamente sem reprocessar.
  4. Se a inserção for **bem-sucedida**: o worker processa o pagamento, grava o resultado e commita a transação.

### Dual Coding Visual
| Tentativa de Execução | Ação na Tabela de Idempotência | Efeito no Negócio |
|---|---|---|
| **1ª Tentativa (Original)** | \`INSERT INTO processed_keys\` (Sucesso) | Executa débito no cartão |
| **2ª Tentativa (Retry de Rede)** | \`INSERT\` falha com \`Duplicate Key\` | **Retorna resposta salva sem debitar** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em SQL
\`\`\`sql
BEGIN;

-- 1. Registro condicional atômico
INSERT INTO idempotency_records (key, status, created_at)
VALUES ('idem-uuid-999', 'PROCESSING', NOW())
ON CONFLICT (key) DO NOTHING;

-- Se nenhuma linha foi inserida, aborta e busca o registro existente:
-- Caso contrário, executa a operação financeira:
UPDATE accounts SET balance = balance - 100.00 WHERE user_id = 'usr-1';

UPDATE idempotency_records 
SET status = 'COMPLETED', response = '{"status":"SUCCESS"}'
WHERE key = 'idem-uuid-999';

COMMIT;
\`\`\`

</details>
`);

// ==========================================
// 4. event-sourcing-cqrs
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/messaging-streaming/event-sourcing-cqrs/SYS-MSG-EVENTS-000.md', `---
id: SYS-MSG-EVENTS-000
title: "Event Sourcing: Log Imutável de Eventos vs Estado Mutável Atual"
tags:
  - level::l4-pleno
  - topic::sys::messaging
  - company::netflix
  - freq::high
---

## Pergunta
Como o padrão Event Sourcing modela o estado de uma entidade como uma sequência imutável de eventos de domínio em vez de sobrescrever o registro atual?

## Resposta
### Quick Answer
**Solução Direta**:
- **Persistência Tradicional (CRUD)**: Armazena apenas o estado atual da entidade (ex: \`balance = 500.00\`), descartando o histórico de como aquele estado foi alcançado.
- **Event Sourcing**:
  - O estado atual **nunca é gravado diretamente**.
  - O sistema grava uma sequência cronológica estritamente imutável e *append-only* de **Eventos de Domínio** em um **Event Store**:
    - \`AccountOpened(balance: 0)\`
    - \`MoneyDeposited(amount: 1000)\`
    - \`MoneyWithdrawn(amount: 500)\`
  - O estado atual é reconstruído executando uma função de redução (*Fold/Replay*) sobre todos os eventos históricos da entidade.
- Fornece **trilha de auditoria 100% perfeita**, viagem no tempo (*Time Travel Debugging*) e reconstrução histórica.

### Dual Coding Visual
| Paradigma | O que fica persistido no banco | Rastreabilidade Histórica |
|---|---|---|
| **CRUD Convencional** | Apenas a linha com valor atual | Nula (Sobrescrita destrutiva) |
| **Event Sourcing** | Sequência imutável de eventos passados | **Perfeita (Auditoria matemática)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização via Snapshots
- Se uma conta bancária possuir 100.000 eventos, reconstruir o saldo a cada leitura ficaria lento. O sistema grava periodicamente **Snapshots** (ex: a cada 100 eventos). Para carregar o estado, lê o último Snapshot e aplica apenas os eventos ocorridos após ele.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/messaging-streaming/event-sourcing-cqrs/SYS-MSG-EVENTS-001.md', `---
id: SYS-MSG-EVENTS-001
title: "CQRS (Command Query Responsibility Segregation) e Projeções de Leitura Assíncronas"
tags:
  - level::l4-pleno
  - topic::sys::messaging
  - company::microsoft
  - freq::high
---

## Pergunta
Como o padrão CQRS segrega os modelos de escrita (Commands) e leitura (Queries) e como as Projeções de Leitura são atualizadas?

## Resposta
### Quick Answer
**Solução Direta**:
- O **CQRS** divide a aplicação em dois modelos arquiteturais completamente isolados:
  1. **Lado de Comando (Write / Command)**: Otimizado estritamente para validação de regras de negócio complexas e gravação transacional atômica (ex: Event Store ou Postgres relacional).
  2. **Lado de Consulta (Read / Query)**: Otimizado estritamente para consultas rápidas com modelos desnormalizados prontos para exibição (ex: Elasticsearch para busca textual, Redis para ranking, MongoDB para leitura de telas).
- **Projeções de Leitura**: Consomem eventos emitidos pelo lado de comando e atualizam assincronamente as visões de leitura (*Read Models*), operando com **consistência eventual**.

### Dual Coding Visual
| Dimensão CQRS | Lado de Comando (Command) | Lado de Consulta (Query) |
|---|---|---|
| **Operações** | Mutação (\`CreateOrder\`, \`CancelOrder\`) | Leitura (\`GetOrderDetails\`, \`SearchOrders\`) |
| **Banco Otimizado** | Relacional ACID / Event Store | Elasticsearch, Redis, Read-Only Views |
| **Consistência** | Forte / Imediata | Eventual (Atualizado via Event Projections) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Desacoplamento de Escala
- Se sua aplicação recebe 100 leituras para cada 1 escrita, o lado de leitura pode ser escalado horizontalmente com 20 nós de Elasticsearch e Read Replicas sem impactar o nó primário de gravação de comandos.

</details>
`);

// ==========================================
// 5. load-balancing-proxies
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/resilience-traffic/load-balancing-proxies/SYS-RES-LOADBAL-000.md', `---
id: SYS-RES-LOADBAL-000
title: "Load Balancers de Camada 4 (Transporte) vs Camada 7 (Aplicação)"
tags:
  - level::l3-junior
  - topic::sys::resilience
  - company::cloudflare
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre Load Balancers de Camada 4 (L4) e Camada 7 (L7) em termos de inspeção de pacotes e latência?

## Resposta
### Quick Answer
**Solução Direta**:
- **Layer 4 Load Balancer (L4 - Transporte / TCP/UDP)**:
  - Roteia pacotes baseando-se estritamente em **IP de origem/destino e Porta TCP/UDP**.
  - Não inspeciona nem decodifica o payload HTTP ou TLS; opera na camada do Kernel (via IPVS/Maglev) com **altíssimo throughput e latência sub-milissegundo**.
- **Layer 7 Load Balancer (L7 - Aplicação / HTTP/gRPC)**:
  - Termina a conexão TCP e o handshake TLS, decodificando o cabeçalho HTTP, URLs, Cookies e payload.
  - Permite **roteamento inteligente** (ex: \`/api/v1/payments\` vai para o cluster A; cabeçalho \`User-Agent: Mobile\` vai para o cluster B), com custo de maior consumo de CPU e memória.

### Dual Coding Visual
| Critério de Comparação | Layer 4 (L4 - ex: AWS NLB, Maglev) | Layer 7 (L7 - ex: AWS ALB, NGINX, Envoy) |
|---|---|---|
| **Informações Analisadas** | Apenas IP e Porta TCP/UDP | Headers HTTP, Cookies, Path URL, JWT |
| **Término de TLS** | Passagem direta de pacotes (Pass-through) | Termina TLS e inspeciona dados |
| **Throughput / Latência** | Ultra-rápido (Milhões de conexões/seg) | Moderado (Exige decodificação de aplicação) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Arquitetura em Duas Camadas nas FAANG
- Grandes plataformas utilizam ambos em série:
  \`Internet -> L4 Load Balancer (Maglev/ECMP) -> L7 Reverse Proxies (NGINX/Envoy) -> Microsserviços\`.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/resilience-traffic/load-balancing-proxies/SYS-RES-LOADBAL-001.md', `---
id: SYS-RES-LOADBAL-001
title: "Algoritmos de Balanceamento: Round Robin, Weighted Least Connections e IP Hash"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::netflix
  - freq::high
---

## Pergunta
Quando escolher entre os algoritmos de balanceamento Round Robin, Weighted Least Connections e Consistent IP Hash em proxies reversos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Round Robin Ponderado (Weighted Round Robin)**:
  - Distribui requisições sequencialmente respeitando o peso/capacidade de cada servidor.
  - Ideal quando todas as requisições possuem custo de processamento uniforme e homogêneo.
- **Weighted Least Connections (Menos Conexões)**:
  - Encaminha a nova requisição para o servidor com o **menor número de conexões ativas no momento**.
  - Superior para conexões de longa duração (WebSockets, queries pesadas de banco, streaming) onde requisições acumulam em servidores sobrecarregados.
- **Consistent IP Hash (Sticky Session)**:
  - Mapeia o IP do cliente para o mesmo servidor backend físico, aproveitando caches locais na memória do nó.

### Dual Coding Visual
| Algoritmo | Critério de Decisão | Cenário Recomendado |
|---|---|---|
| **Round Robin** | Sequencial circular com pesos | APIs stateless com requisições rápidas e uniformes |
| **Least Connections** | Menor quantidade de conexões ativas | WebSockets, uploads lentos e queries longas |
| **IP / Key Hash** | Hash do IP ou Header do cliente | Sessões com cache em memória no nó local |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Algoritmo 'Power of Two Random Choices'
- Em vez de consultar todos os $N$ servidores para achar o com menos conexões ($O(N)$), o LB sorteia 2 servidores aleatórios e escolhe o menos carregado entre os dois. Reduz o overhead de monitoramento a zero com eficácia estatística comparável a $O(N)$.

</details>
`);

// ==========================================
// 6. rate-limiting-throttling
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/resilience-traffic/rate-limiting-throttling/SYS-RES-RATELIMIT-000.md', `---
id: SYS-RES-RATELIMIT-000
title: "Algoritmos de Rate Limiting: Token Bucket vs Leaky Bucket vs Sliding Window Log"
tags:
  - level::l3-junior
  - topic::sys::resilience
  - company::stripe
  - freq::high
---

## Pergunta
Qual é a diferença de funcionamento e capacidade de absorção de rajadas (Bursts) entre os algoritmos Token Bucket e Leaky Bucket?

## Resposta
### Quick Answer
**Solução Direta**:
- **Token Bucket**:
  - Tokens são adicionados a um balde de capacidade fixa $C$ a uma taxa constante $R$ tokens/segundo.
  - Cada requisição consome 1 token. Se houver tokens, a requisição passa; se o balde estiver vazio, é rejeitada (\`429 Too Many Requests\`).
  - **Permite rajadas (Bursts)** de até $C$ requisições simultâneas instantâneas.
- **Leaky Bucket**:
  - Requisições entram em uma fila FIFO e vazam (*Leaked*) para processamento a uma **taxa estritamente constante e suave**.
  - Se a fila transbordar, o excesso é descartado.
  - **Elimina rajadas completamente**, ideal para proteger serviços downstream sensíveis a picos.

### Dual Coding Visual
| Algoritmo | Permite Rajadas (Bursts)? | Taxa de Saída para o Backend |
|---|---|---|
| **Token Bucket** | **SIM (Até a capacidade do balde)** | Variável (Responde instantaneamente aos picos) |
| **Leaky Bucket** | NÃO (Suaviza tráfego em fila FIFO) | Estritamente constante |
| **Fixed Window** | SIM (Vulnerável a $2x$ limite nas bordas) | Variável (Picos nas transições de janela) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o Token Bucket é o Mais Usado (Stripe, AWS)
- Usuários legítimos frequentemente realizam disparos em rajada (ex: carregar uma página com 15 assets). O Token Bucket aceita a rajada se o usuário estava ocioso, enquanto mantém a taxa média delimitada a longo prazo.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/resilience-traffic/rate-limiting-throttling/SYS-RES-RATELIMIT-001.md', `---
id: SYS-RES-RATELIMIT-001
title: "Rate Limiting Distribuído no Redis com Sliding Window Counter e Script Lua"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::uber
  - freq::high
---

## Pergunta
Como implementar um Rate Limiter distribuído de Janela Deslizante (Sliding Window Counter) de alta performance no Redis usando Sorted Sets e scripts Lua?

## Resposta
### Quick Answer
**Solução Direta**:
- **Algoritmo de Janela Deslizante com Redis ZSet**:
  1. Utiliza um Sorted Set por usuário/IP com chave \`rate_limit:{user_id}\`.
  2. O \`Score\` e o \`Member\` armazenam o timestamp atual em milissegundos.
  3. **Passo 1 (Remover antigos)**: \`ZREMRANGEBYSCORE key 0 (now - window_size)\`.
  4. **Passo 2 (Contar requisições na janela)**: \`ZCARD key\`.
  5. **Passo 3 (Verificar e Inserir)**: Se contagem $< \\text{limite}$, executa \`ZADD key now now\` e define \`EXPIRE key window_size\`.
  6. Toda a sequência é encapsulada em um **Script Lua atômico** para evitar condições de corrida em ambientes multi-instância.

### Dual Coding Visual
| Etapa no ZSet do Redis | Comando Executado | Efeito |
|---|---|---|
| **1. Purga** | \`ZREMRANGEBYSCORE\` | Remove registros fora da janela deslizante |
| **2. Contagem** | \`ZCARD\` | Obtém volume de requisições recentes |
| **3. Admissão** | \`ZADD\` + \`EXPIRE\` | Registra requisição atual se contagem $<$ limite |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Script Lua de Janela Deslizante Atômica
\`\`\`text
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

local clearBefore = now - window
redis.call('ZREMRANGEBYSCORE', key, 0, clearBefore)

local currentRequests = redis.call('ZCARD', key)
if currentRequests < limit then
  redis.call('ZADD', key, now, now)
  redis.call('EXPIRE', key, math.ceil(window / 1000))
  return 1 -- Permitido
else
  return 0 -- Bloqueado (HTTP 429)
end
\`\`\`

</details>
`);

// ==========================================
// 7. fault-tolerance-resilience
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/resilience-traffic/fault-tolerance-resilience/SYS-RES-FAULTTOL-000.md', `---
id: SYS-RES-FAULTTOL-000
title: "Circuit Breaker Pattern: Estados Closed, Open e Half-Open"
tags:
  - level::l3-junior
  - topic::sys::resilience
  - company::netflix
  - freq::high
---

## Pergunta
Como o padrão Circuit Breaker protege microsserviços contra falhas em cascata alternando entre os estados Closed, Open e Half-Open?

## Resposta
### Quick Answer
**Solução Direta**:
- **Closed (Fechado - Operação Normal)**:
  - Todas as requisições passam normalmente para o serviço remoto.
  - Monitora a taxa de falhas/timeouts. Se a taxa ultrapassar um limite pré-configurado (ex: $50\\%$ de erros em 10s), o circuito transiciona para **Open**.
- **Open (Aberto - Falha Rápida / Fail-Fast)**:
  - Todas as chamadas são **rejeitadas instantaneamente na aplicação local** sem tentar chamar a rede (retornando fallback ou erro imediato).
  - Permite que o serviço sobrecarregado respire e se recupere.
- **Half-Open (Semi-Aberto - Teste de Recuperação)**:
  - Após um período de resfriamento (*Sleep Window*, ex: 30s), permite que um número limitado de requisições de teste passe.
  - Se tiverem sucesso, o circuito volta para **Closed**; se falharem, retorna para **Open**.

### Dual Coding Visual
| Estado do Circuito | Comportamento das Chamadas | Próxima Transição |
|---|---|---|
| **Closed** | Executa chamadas normalmente na rede | Vira **Open** se taxa de erro $>$ limite |
| **Open** | Fail-fast instantâneo (sem chamada de rede) | Vira **Half-Open** após timeout de espera |
| **Half-Open** | Envia chamadas de teste limitadas | Vira **Closed** se sucesso, ou **Open** se erro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o Fail-Fast é Vital
- Sem Circuit Breaker, centenas de threads ficam travadas aguardando timeout de 5 segundos de um serviço fora do ar, esgotando o Thread Pool da aplicação chamadora e derrubando o sistema inteiro (*Cascading Failure*).

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/resilience-traffic/fault-tolerance-resilience/SYS-RES-FAULTTOL-001.md', `---
id: SYS-RES-FAULTTOL-001
title: "Retries com Exponential Backoff e Full Jitter contra Tempestades de Sincronização"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::amazon
  - freq::high
---

## Pergunta
Por que adicionar Full Jitter aleatório ao Exponential Backoff é obrigatório para evitar o colapso de servidores em recuperação?

## Resposta
### Quick Answer
**Solução Direta**:
- **Exponential Backoff Puro**:
  - Dobra o tempo de espera a cada tentativa falha: $t = \\text{base} \\times 2^{\\text{attempt}}$.
  - **Problema**: Se 10.000 clientes falharem no mesmo milissegundo, todos calcularão exatamente o mesmo intervalo de espera e reenviarão as requisições em pulsos perfeitamente sincronizados (**Tempestade de Retries / Stampede**), derrubando o servidor novamente.
- **Full Jitter (Amazon Architecture)**:
  - Sorteia um tempo aleatório uniforme entre zero e o limite exponencial:
    $$t_{\\text{wait}} = \\text{random}(0, \\min(\\text{max\\_backoff}, \\text{base} \\times 2^{\\text{attempt}}))$$
  - Dispersa uniformemente a carga de retries no tempo, permitindo que o servidor se recupere suavemente.

### Dual Coding Visual
| Estratégia de Retry | Distribuição de Tráfego no Tempo | Risco de Ressaturação do Backend |
|---|---|---|
| **Retry Imediato** | Rajada violenta contínua | Colapso garantido do serviço |
| **Exponential Backoff sem Jitter** | Ondas sincronizadas periódicas | Alto (Pulsos de colisão periódica) |
| **Exponential Backoff + Full Jitter** | **Distribuição uniforme contínua** | **Mínimo (Recuperação suave)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementação em Go
\`\`\`go
package main

import (
  "math/rand"
  "time"
)

func BackoffWithJitter(attempt int, base time.Duration, max time.Duration) time.Duration {
  exp := base * time.Duration(1<<attempt)
  if exp > max { exp = max }
  return time.Duration(rand.Int63n(int64(exp))) // Full Jitter [0, exp)
}
\`\`\`

</details>
`);

// ==========================================
// 8. api-design-gateways
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/resilience-traffic/api-design-gateways/SYS-RES-APIGW-000.md', `---
id: SYS-RES-APIGW-000
title: "API Gateway Pattern e Backend-for-Frontend (BFF)"
tags:
  - level::l3-junior
  - topic::sys::resilience
  - company::netflix
  - freq::high
---

## Pergunta
Qual é o papel arquitetural de um API Gateway e quando adotar a variação Backend-for-Frontend (BFF)?

## Resposta
### Quick Answer
**Solução Direta**:
- **API Gateway**:
  - Atua como ponto único de entrada para todos os clientes externos.
  - Centraliza preocupações transversais (*Cross-Cutting Concerns*): autenticação/autorização JWT, rate limiting, terminação SSL, agregação de dados e métricas.
- **Backend-for-Frontend (BFF)**:
  - Cria gateways específicos dedicados para cada tipo de cliente (ex: um BFF para Mobile iOS/Android, um BFF para Web SPA e um BFF para Smart TVs).
  - O BFF formata, compacta e filtra o payload sob medida para as necessidades específicas de rede e layout de cada plataforma (ex: mobile recebe payload enxuto de 2 KB; web recebe 50 KB com dados analíticos).

### Dual Coding Visual
| Padrão | Quantidade de Gateways | Vantagem Principal |
|---|---|---|
| **API Gateway Central** | 1 Gateway para todos os clientes | Centralização e manutenção simplificada |
| **BFF (Backend-for-Frontend)** | 1 Gateway por experiência de cliente | Payloads sob medida e evolução desacoplada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Benefício de Agregação de Chamadas
- Em vez de um app mobile disparar 5 chamadas HTTP separadas pela rede celular (3G/4G com alta latência), ele faz 1 chamada ao BFF, que executa as 5 chamadas internamente no data center via gRPC em sub-milissegundos e retorna a resposta consolidada.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/resilience-traffic/api-design-gateways/SYS-RES-APIGW-001.md', `---
id: SYS-RES-APIGW-001
title: "gRPC sobre HTTP/2 com Protocol Buffers vs REST com JSON"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::google
  - freq::high
---

## Pergunta
Por que o gRPC com Protocol Buffers (Protobuf) é significativamente mais rápido e eficiente que REST sobre JSON para comunicação interna entre microsserviços?

## Resposta
### Quick Answer
**Solução Direta**:
- **Formato Binário Compacto (Protobuf)**:
  - JSON é textual e verboso (repete os nomes dos campos em toda mensagem).
  - Protobuf serializa dados em formato binário comprimido com tags numéricas, reduzindo o tamanho do payload em até **$70-80\\%$** e acelerando a serialização/deserialização em até **$10x$ na CPU**.
- **Transporte HTTP/2**:
  - Suporta **Multiplexação Verdadeira** (centenas de requisições simultâneas na mesma conexão TCP sem *Head-of-Line Blocking* no protocolo).
  - Suporta compressão de cabeçalhos (HPACK) e streaming bidirecional nativo em tempo real.
- **Contrato Tipado Estrito**: Esquemas \`.proto\` com geração automática de código em múltiplas linguagens.

### Dual Coding Visual
| Dimensão | REST / JSON | gRPC / Protocol Buffers |
|---|---|---|
| **Protocolo de Rede** | HTTP/1.1 (predominante) | HTTP/2 (Multiplexação nativa) |
| **Formato de Payload** | Texto (JSON legível) | Binário compactado (Protobuf) |
| **Velocidade na CPU** | Lenta (Parsing de strings JSON) | Ultra-rápida (Offsets de bytes binários) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Definição Protobuf
\`\`\`text
syntax = "proto3";

message UserProfileRequest {
  int64 user_id = 1;
}

message UserProfileResponse {
  int64 user_id = 1;
  string name = 2;
  string email = 3;
}

service UserService {
  rpc GetProfile (UserProfileRequest) returns (UserProfileResponse);
}
\`\`\`

</details>
`);

// ==========================================
// 9. service-mesh-discovery
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/resilience-traffic/service-mesh-discovery/SYS-RES-MESH-000.md', `---
id: SYS-RES-MESH-000
title: "Service Mesh: Arquitetura Control Plane (Istio) vs Data Plane (Envoy Sidecar)"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::lyft
  - freq::high
---

## Pergunta
Como a arquitetura de Service Mesh divide responsabilidades entre o Data Plane (proxies Envoy Sidecar) e o Control Plane (Istiod)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Data Plane (Envoy Sidecar)**:
  - Um proxy reverso leve roda como processo adjacente (*Sidecar*) ao lado de cada contêiner de aplicação dentro do mesmo Pod Kubernetes.
  - Intercepta **100% do tráfego de entrada e saída (Inbound/Outbound)**, aplicando mTLS transparente, circuit breaking, retries, rate limiting e coleta de telemetria sem exigir alteração no código da aplicação.
- **Control Plane (Istiod)**:
  - Servidor central que traduz configurações declarativas de alto nível (ex: regras de roteamento de tráfego, canary releases) e as distribui dinamicamente para os proxies Envoy via APIs xDS.

### Dual Coding Visual
| Plano do Service Mesh | Componente Típico | Responsabilidade Primária |
|---|---|---|
| **Data Plane** | Envoy Proxy (Sidecar) | Encaminha bytes de rede, aplica mTLS e métricas |
| **Control Plane** | Istiod | Gerencia políticas, certificados PKI e rotas |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Transparência para a Aplicação
- O desenvolvedor programa sua aplicação como se estivesse chamando \`http://payment-service\`. O Envoy local intercepta a chamada, criptografa com mTLS, seleciona a réplica saudável via Service Discovery e transmite com resiliência.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/resilience-traffic/service-mesh-discovery/SYS-RES-MESH-001.md', `---
id: SYS-RES-MESH-001
title: "Segurança Zero Trust com Mutual TLS (mTLS) Automático entre Microsserviços"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::google
  - freq::high
---

## Pergunta
Como o Mutual TLS (mTLS) garante autenticação criptográfica bidirecional e autorização de tráfego em arquiteturas Zero Trust?

## Resposta
### Quick Answer
**Solução Direta**:
- **TLS Padrão (Unidirecional)**: Apenas o cliente autentica a identidade do servidor (ex: browser validando o certificado HTTPS do banco).
- **Mutual TLS (mTLS - Bidirecional)**:
  - Tanto o cliente quanto o servidor apresentam certificados X.509 válidos assinados pela mesma autoridade certificadora interna (CA).
  - Ambos validam criptograficamente a identidade mútua antes de trafegar qualquer dado.
- **Zero Trust**:
  1. Elimina a premissa de que a rede interna do cluster é confiável.
  2. Garante **Criptografia em Trânsito** contra interceptação de pacotes (*Sniffing*).
  3. Viabiliza **Políticas de Autorização Estritas baseadas em Identidade** (ex: o serviço \`Cart\` só pode se comunicar com \`Inventory\` se apresentar certificado legítimo emitido para sua Service Account).

### Dual Coding Visual
| Tipo de TLS | Quem Apresenta Certificado | Nível de Segurança |
|---|---|---|
| **TLS Convencional** | Apenas o Servidor | Cliente sabe com quem fala; servidor não valida cliente |
| **Mutual TLS (mTLS)** | **Ambos (Cliente e Servidor)** | **Autenticação forte bidirecional e canal 100% cifrado** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Rotação Automática de Certificados
- No Istio/Envoy, certificados de curta duração (ex: 24 horas) são emitidos e rotacionados automaticamente na memória dos sidecars sem interrupção de conexões ou intervenção humana.

</details>
`);

// ==========================================
// 10. solid-clean-architecture
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/low-level-design/solid-clean-architecture/SYS-LLD-SOLID-000.md', `---
id: SYS-LLD-SOLID-000
title: "Princípios SOLID: Single Responsibility (SRP) e Dependency Inversion (DIP)"
tags:
  - level::l3-junior
  - topic::sys::lld
  - company::microsoft
  - freq::high
---

## Pergunta
Como o Single Responsibility Principle (SRP) e o Dependency Inversion Principle (DIP) desacoplam a lógica de domínio de detalhes de infraestrutura?

## Resposta
### Quick Answer
**Solução Direta**:
- **Single Responsibility Principle (SRP)**: Um módulo ou classe deve ter **um único motivo para mudar** (responsabilidade coesa focada em um único ator de negócio).
- **Dependency Inversion Principle (DIP)**:
  1. Módulos de alto nível (Regras de Negócio / Domínio) **não devem depender** de módulos de baixo nível (Bancos de dados, frameworks, HTTP clients). Ambos devem depender de **Abstrações (Interfaces)**.
  2. Abstrações não devem depender de detalhes; detalhes devem depender de abstrações.
- Permite trocar o banco de dados (ex: Postgres por DynamoDB) sem alterar uma única linha de regra de negócio do core.

### Dual Coding Visual
| Princípio SOLID | Violação Comum | Design Correto |
|---|---|---|
| **SRP** | Classe de Negócio calcula imposto e grava no SQL | Lógica de cálculo isolada de repositórios |
| **DIP** | Domínio instancia diretamente \`new PostgresClient()\` | Domínio recebe interface \`UserRepository\` injetada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go (DIP na Prática)
\`\`\`go
package domain

// Alto Nível (Domínio Puro - Sem import de SQL):
type PaymentRepository interface {
  SavePayment(amount float64) error
}

type PaymentUseCase struct {
  repo PaymentRepository // Injeção de dependência via interface
}

func (uc *PaymentUseCase) Process(amount float64) error {
  return uc.repo.SavePayment(amount)
}
\`\`\`

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/low-level-design/solid-clean-architecture/SYS-LLD-SOLID-001.md', `---
id: SYS-LLD-SOLID-001
title: "Arquitetura Hexagonal (Ports & Adapters) e Clean Architecture"
tags:
  - level::l4-pleno
  - topic::sys::lld
  - company::uber
  - freq::high
---

## Pergunta
Como a Arquitetura Hexagonal (Ports & Adapters) organiza os limites do software através de Portas de Entrada/Saída e Adaptadores?

## Resposta
### Quick Answer
**Solução Direta**:
- **Núcleo Hexagonal (Core / Domínio)**:
  - Contém as entidades e casos de uso de negócio, isolados e sem dependências de tecnologias externas.
- **Ports (Portas - Abstrações/Interfaces)**:
  - **Inbound Ports (Driving)**: Interfaces que expõem o que a aplicação faz (ex: \`CreateUserUseCase\`).
  - **Outbound Ports (Driven)**: Interfaces que o domínio exige para funcionar (ex: \`UserStoragePort\`, \`EmailNotificationPort\`).
- **Adapters (Adaptadores - Implementações Concretas)**:
  - **Driving Adapters**: Traduzem chamadas externas para as Inbound Ports (ex: REST Controller, gRPC Handler, CLI).
  - **Driven Adapters**: Implementam as Outbound Ports conectando ao mundo externo (ex: \`PostgresUserRepository\`, \`SendgridEmailAdapter\`).

### Dual Coding Visual
| Componente Hexagonal | Natureza | Exemplo Concreto |
|---|---|---|
| **Core Domain** | Regras de Negócio Puras | Entidades \`Order\`, \`PaymentRule\` |
| **Ports** | Interfaces (Contratos) | \`PaymentGatewayPort\`, \`OrderRepositoryPort\` |
| **Adapters** | Código de Infraestrutura | \`StripeAdapter\`, \`PostgresOrderAdapter\`, \`HTTPController\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Regra de Dependência Fundamental
- Todas as dependências de código apontam **para dentro**, em direção ao Core. O banco de dados e a web são meros detalhes periféricos conectáveis via adaptadores intercambiáveis.

</details>
`);

// ==========================================
// 11. design-patterns-gang-of-four
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/low-level-design/design-patterns-gang-of-four/SYS-LLD-PATTERNS-000.md', `---
id: SYS-LLD-PATTERNS-000
title: "Padrões Estratégia (Strategy) e Fábrica (Factory Method) para Eliminar Condicionais"
tags:
  - level::l3-junior
  - topic::sys::lld
  - company::amazon
  - freq::high
---

## Pergunta
Como a combinação dos padrões Strategy e Factory Method substitui blocos complexos de \`if/else\` e \`switch/case\` por código extensível (Open/Closed Principle)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema de Design**: Métodos com longos blocos \`switch (paymentType)\` violam o princípio Aberto/Fechado (OCP), pois adicionar uma nova forma de pagamento exige alterar e retestar a classe principal.
- **Solução Strategy + Factory**:
  1. **Strategy**: Define uma interface comum (ex: \`PaymentStrategy\`) implementada por classes concretas independentes (\`CreditCardPayment\`, \`PixPayment\`, \`BoletoPayment\`).
  2. **Factory**: Mapeia o tipo solicitado para a instância correta da Strategy (usando um mapa estático ou registro dinâmico).
  3. A classe consumidora apenas invoca \`factory.getStrategy(type).pay(amount)\` em tempo constante sem condicionais aninhadas.

### Dual Coding Visual
| Abordagem | Manutenibilidade | Aderência ao OCP |
|---|---|---|
| **\`switch/case\` Monolítico** | Frágil (cresce indefinidamente com risco de regressão) | Violação (Modifica código existente a cada novo tipo) |
| **Strategy + Factory** | **Modular (Cada algoritmo isolado em sua própria classe)** | **Total (Adiciona novos tipos criando novas classes)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementação em Java
\`\`\`java
public interface PaymentStrategy {
  void pay(BigDecimal amount);
}

@Service
public class PaymentService {
  private final Map<String, PaymentStrategy> strategies;

  public PaymentService(List<PaymentStrategy> strategyList) {
    this.strategies = strategyList.stream()
      .collect(Collectors.toMap(PaymentStrategy::getType, Function.identity()));
  }

  public void executePayment(String type, BigDecimal amount) {
    PaymentStrategy strategy = strategies.get(type);
    if (strategy == null) throw new IllegalArgumentException("Unsupported type");
    strategy.pay(amount);
  }
}
\`\`\`

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/low-level-design/design-patterns-gang-of-four/SYS-LLD-PATTERNS-001.md', `---
id: SYS-LLD-PATTERNS-001
title: "Padrão Decorator vs Adapter: Modificação Dinâmica de Comportamento vs Compatibilidade"
tags:
  - level::l4-pleno
  - topic::sys::lld
  - company::google
  - freq::high
---

## Pergunta
Qual é a diferença de intenção arquitetural entre o padrão Decorator e o padrão Adapter?

## Resposta
### Quick Answer
**Solução Direta**:
- **Decorator (Envoltório de Comportamento)**:
  - **Mesma Interface**: O decorador implementa a mesma interface do objeto envolvido.
  - **Intenção**: Adicionar responsabilidades, comportamentos ou camadas dinâmicas de forma transparente e combinável em tempo de execução (ex: adicionar Compressão + Criptografia + Cache sobre um \`DataStream\`).
- **Adapter (Conversor de Interface)**:
  - **Interfaces Diferentes**: O adaptador converte a interface incompatível de um componente terceiro para a interface esperada pela aplicação.
  - **Intenção**: Permitir que duas classes com contratos divergentes trabalhem juntas sem alterar seu código-fonte.

### Dual Coding Visual
| Padrão GoF | Relação de Interface | Intenção Primária |
|---|---|---|
| **Decorator** | Mantém a **mesma** interface | Adiciona novas funcionalidades dinâmicas em camadas |
| **Adapter** | Converte entre interfaces **diferentes** | Compatibiliza sistemas com contratos incompatíveis |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Decorator em Go (HTTP Middlewares)
\`\`\`go
package main

import "net/http"

func LoggingMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    // Adiciona log antes e depois sem alterar o handler interno:
    next.ServeHTTP(w, r)
  })
}
\`\`\`

</details>
`);

// ==========================================
// 12. concurrency-patterns-backend
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/low-level-design/concurrency-patterns-backend/SYS-LLD-CONCURRENCY-000.md', `---
id: SYS-LLD-CONCURRENCY-000
title: "Padrão Worker Pool em Go e Gerenciamento de Concorrência Bounded"
tags:
  - level::l3-junior
  - topic::sys::lld
  - company::uber
  - freq::high
---

## Pergunta
Como o padrão Worker Pool gerencia o consumo de recursos limitando o número máximo de goroutines ativas através de canais bufferizados?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema do Spawn Irrestrito**: Criar uma goroutine por tarefa (\`go process(job)\`) sob pico de 100.000 requisições esgota descritores de arquivos, conexões de banco de dados e causa saturação de memória.
- **Worker Pool Limitado**:
  1. Cria um canal de entrada \`jobs := make(chan Job, bufferSize)\`.
  2. Inicializa um número fixo $K$ de goroutines workers concorrentes (ex: $K=50$).
  3. Cada worker consome tarefas do mesmo canal compartilhado em um laço \`for job := range jobs\`.
  4. Sincroniza a finalização com \`sync.WaitGroup\`.

### Dual Coding Visual
| Abordagem Concorrente | Uso de Memória e Conexões sob Pico | Risco Operacional |
|---|---|---|
| **Goroutine sem Limite (\`go fn()\`)** | Ilimitado ($O(N)$ goroutines) | Queda por OOM ou esgotamento de sockets |
| **Worker Pool Fixo ($K=50$)** | **Estritamente delimitado ($O(K)$)** | **Estabilidade absoluta sob carga extrema** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementação do Worker Pool em Go
\`\`\`go
package main

import (
  "sync"
)

func Worker(id int, jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {
  defer wg.Done()
  for j := range jobs {
    results <- j * 2 // Processa a tarefa
  }
}

func RunPool(numWorkers int, totalJobs int) {
  jobs := make(chan int, totalJobs)
  results := make(chan int, totalJobs)
  var wg sync.WaitGroup

  for w := 1; w <= numWorkers; w++ {
    wg.Add(1)
    go Worker(w, jobs, results, &wg)
  }
  for j := 1; j <= totalJobs; j++ { jobs <- j }
  close(jobs)
  wg.Wait()
  close(results)
}
\`\`\`

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/low-level-design/concurrency-patterns-backend/SYS-LLD-CONCURRENCY-001.md', `---
id: SYS-LLD-CONCURRENCY-001
title: "Padrão Fan-Out / Fan-In e Pipeline Concorrente com Canais"
tags:
  - level::l4-pleno
  - topic::sys::lld
  - company::meta
  - freq::high
---

## Pergunta
Como os padrões Fan-Out e Fan-In aceleram tarefas computacionalmente intensivas distribuindo e consolidando fluxos de dados concorrentes?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fan-Out**: Múltiplas goroutines/threads leem do **mesmo canal de entrada** simultaneamente para processar tarefas CPU-bound ou I/O-bound em paralelo.
- **Fan-In**: Uma única função multiplexadora combina as saídas de múltiplos canais independentes gerados pelo Fan-Out em um **único canal consolidado de saída**.
- **Benefício**: Permite paralelizar etapas demoradas de uma esteira (*Pipeline*) mantendo a sincronização limpa e livre de deadlocks.

### Dual Coding Visual
| Etapa do Fluxo | Ação Estrutural | Cardinalidade de Canais |
|---|---|---|
| **Fan-Out** | Distribuição de carga em múltiplos workers | 1 Canal de Entrada $\\rightarrow N$ Workers |
| **Fan-In** | Consolidação dos resultados em stream único | $N$ Canais de Saída $\\rightarrow 1$ Canal Final |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Função Fan-In Genérica em Go
\`\`\`go
package main

import "sync"

func FanIn(channels ...<-chan int) <-chan int {
  out := make(chan int)
  var wg sync.WaitGroup
  wg.Add(len(channels))

  for _, ch := range channels {
    go func(c <-chan int) {
      defer wg.Done()
      for val := range c { out <- val }
    }(ch)
  }

  go func() {
    wg.Wait()
    close(out)
  }()
  return out
}
\`\`\`

</details>
`);

// ==========================================
// 13. lld-case-studies
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/low-level-design/lld-case-studies/SYS-LLD-CASES-000.md', `---
id: SYS-LLD-CASES-000
title: "Low-Level Design: Sistema de Estacionamento (Parking Lot) com Enums e Polimorfismo"
tags:
  - level::l3-junior
  - topic::sys::lld
  - company::amazon
  - freq::high
---

## Pergunta
Como modelar as classes, enums e regras de alocação de vagas para um Estacionamento (Parking Lot) multi-andares em Low-Level Design?

## Resposta
### Quick Answer
**Solução Direta**:
- **Entidades Principais**:
  - \`VehicleType\` (Enum: \`MOTORCYCLE\`, \`COMPACT\`, \`LARGE\`).
  - \`ParkingSpot\` (Abstração com tipos \`MotorcycleSpot\`, \`CompactSpot\`, \`LargeSpot\`, status \`isFree\`, atributo \`spotNumber\`).
  - \`ParkingFloor\` (Coleção de vagas agrupadas por tipo, calcula disponibilidade em $O(1)$).
  - \`ParkingLot\` (Singleton que gerencia múltiplos andares, emite e valida \`Ticket\`).
  - \`Ticket\` (Contém \`ticketId\`, \`spotAssigned\`, \`entryTime\`, \`vehiclePlate\`).
- **Estratégia de Vagas**: Utiliza uma interface \`ParkingStrategy\` (ex: \`NearestToEntranceStrategy\`) para desacoplar a lógica de busca.

### Dual Coding Visual
| Classe | Responsabilidade Central | Relacionamentos |
|---|---|---|
| **\`ParkingLot\`** | Ponto de entrada, emite tickets e calcula tarifas | Contém múltiplos \`ParkingFloor\` |
| **\`ParkingFloor\`** | Gerencia vagas do andar e calcula vagas livres | Contém múltiplos \`ParkingSpot\` |
| **\`Ticket\`** | Comprovante de entrada com timestamp e vaga | Vinculado a 1 \`Vehicle\` e 1 \`ParkingSpot\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Assinaturas em Java
\`\`\`java
public class Ticket {
  private final String ticketId;
  private final Instant entryTime;
  private final ParkingSpot spot;
  private final Vehicle vehicle;
}

public interface FeeCalculationStrategy {
  BigDecimal calculateFee(Ticket ticket, Instant exitTime);
}
\`\`\`

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/low-level-design/lld-case-studies/SYS-LLD-CASES-001.md', `---
id: SYS-LLD-CASES-001
title: "Low-Level Design: In-Memory Cache Thread-Safe com Expiração Ativa e Passiva"
tags:
  - level::l4-pleno
  - topic::sys::lld
  - company::google
  - freq::high
---

## Pergunta
Como projetar um Cache em Memória Thread-Safe de alta performance com suporte a TTL e limpeza de chaves expiradas?

## Resposta
### Quick Answer
**Solução Direta**:
- **Estruturas de Dados Internas**:
  - \`map[string]CacheItem\`: Tabela hash para acesso em $O(1)$.
  - \`sync.RWMutex\` (ou sharding com múltiplos buckets) para permitir leituras concorrentes simultâneas (\`RLock\`).
- **Estratégias de Expiração de TTL**:
  1. **Expiração Passiva (Lazy Expiration)**: Ao executar \`Get(key)\`, verifica se \`item.ExpiresAt < now\`. Se expirado, remove e retorna *Miss*.
  2. **Expiração Ativa em Background (Active Purge)**: Uma goroutine roda periodicamente (ex: a cada 100 ms), sorteia 20 chaves aleatórias com TTL e purga as expiradas, evitando vazamento de memória para chaves que nunca mais são consultadas.

### Dual Coding Visual
| Mecanismo de Expiração | Gatilho | Finalidade |
|---|---|---|
| **Lazy (Passiva)** | Ocorre sob demanda na chamada \`Get(key)\` | Zero overhead enquanto a chave não for lida |
| **Active (Background)** | Loop periódico amostrando chaves aleatórias | Impede que chaves órfãs vazem memória RAM |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementação Thread-Safe em Go
\`\`\`go
package main

import (
  "sync"
  "time"
)

type Item struct {
  value     any
  expiresAt int64
}

type InMemoryCache struct {
  mu    sync.RWMutex
  items map[string]Item
}

func (c *InMemoryCache) Get(key string) (any, bool) {
  c.mu.RLock()
  item, found := c.items[key]
  c.mu.RUnlock()

  if !found { return nil, false }
  if item.expiresAt > 0 && time.Now().UnixMilli() > item.expiresAt {
    c.mu.Lock()
    delete(c.items, key) // Lazy purge
    c.mu.Unlock()
    return nil, false
  }
  return item.value, true
}
\`\`\`

</details>
`);

console.log('✅ Messaging, Resilience & Low-Level Design cards successfully generated and validated!');
