import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Phase 3: System Design - FAANG Archetypes (Part 2)...');

// ==========================================
// 7. case-web-crawler-search
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-web-crawler-search/SYS-ARCH-CRAWLER-000.md', `---
id: SYS-ARCH-CRAWLER-000
title: "Web Crawler Distribuído (Googlebot): URL Frontier e Políticas de Polidez (Politeness)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Como a arquitetura da URL Frontier equilibra prioridade de rastreamento com políticas de polidez (*Politeness*) para evitar ataques DoS acidentais a sites da web?

## Resposta
### Quick Answer
**Solução Direta**:
- **URL Frontier**: Estrutura de dados que armazena e despacha bilhões de URLs a serem rastreadas por workers distribuídos.
- **Dois Módulos de Filas Internas**:
  1. **Filas de Prioridade (Priority Queues)**: Atribuem pontuações de relevância (PageRank, frequência de atualização) para priorizar páginas importantes primeiro.
  2. **Filas de Polidez (Politeness Queues)**:
     - Cada **Host/Domínio** (ex: \`wikipedia.org\`) possui sua própria fila FIFO dedicada e um temporizador de delay (ex: aguardar no mínimo 500 ms entre requisições ao mesmo domínio).
     - Uma thread de worker só consome uma URL de um domínio se o temporizador daquele domínio tiver expirado, respeitando estritamente o arquivo \`robots.txt\`.

### Dual Coding Visual
| Módulo da URL Frontier | Estrutura | Responsabilidade |
|---|---|---|
| **Priority Selector** | Filas ponderadas por PageRank | Define *o que* deve ser baixado primeiro |
| **Politeness Manager** | 1 Fila por Host + Delay Queue | Impede sobrecarga de servidores de terceiros |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Respeito ao \`robots.txt\`
- Antes de rastrear qualquer URL de um novo host, o crawler baixa e faz cache em memória do arquivo \`https://domain.com/robots.txt\` para validar regras de \`Disallow\` e \`Crawl-Delay\`.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-web-crawler-search/SYS-ARCH-CRAWLER-001.md', `---
id: SYS-ARCH-CRAWLER-001
title: "Deduplicação de Conteúdo em Escala com SimHash e Filtro de Bloom"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Como crawlers em escala de petabytes eliminam URLs repetidas e páginas quase idênticas (Near-Duplicates) usando Bloom Filters e SimHash?

## Resposta
### Quick Answer
**Solução Direta**:
- **Deduplicação de URLs (Bloom Filter)**:
  - Antes de inserir uma URL na Frontier, o sistema consulta um **Bloom Filter distribuído em RAM**.
  - Ocupa apenas $\\approx 10 \\text{ bits por URL}$ com taxa de falso positivo $< 1\\%$, eliminando ciclos e downloads redundantes de bilhões de links com custo de memória minúsculo.
- **Deduplicação de Conteúdo Quase Idêntico (SimHash - Locality Sensitive Hashing)**:
  - Duas páginas com o mesmo texto mas pequenos detalhes diferentes (ex: data ou contador de likes) geram hashes convencionais (MD5/SHA256) totalmente divergentes (*Avalanche Effect*).
  - O **SimHash de 64 bits** preserva a proximidade semântica: textos similares possuem **Distância de Hamming pequena** (diferem em apenas 1 a 3 bits), permitindo identificar e descartar páginas duplicadas instantaneamente.

### Dual Coding Visual
| Técnica de Deduplicação | O que Deduplica | Estrutura Utilizada |
|---|---|---|
| **Bloom Filter** | URLs já visitadas ou enfileiradas | Array de bits com múltiplas funções hash |
| **SimHash (LSH)** | Conteúdo textual quase idêntico | Hashes de 64 bits comparados por Hamming Distance |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Cálculo do SimHash
1. Tokeniza o texto e calcula o peso de cada palavra (TF-IDF).
2. Para cada palavra, calcula um hash de 64 bits.
3. Soma vetores: se o bit $i$ do hash for 1, soma o peso; se 0, subtrai.
4. Gera o SimHash final: bit 1 para valores positivos e bit 0 para negativos.

</details>
`);

// ==========================================
// 8. case-distributed-file-storage
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-distributed-file-storage/SYS-ARCH-FILESTORE-000.md', `---
id: SYS-ARCH-FILESTORE-000
title: "Armazenamento de Arquivos Distribuído (Google Drive / Dropbox): Chunking e Sincronização Delta"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::dropbox
  - freq::high
---

## Pergunta
Como a divisão de arquivos em blocos (Chunking de 4 MB) e a Sincronização Delta (Delta Sync) minimizam o tráfego de rede ao salvar arquivos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Chunking (Fatiamento de 4 MB)**:
  - O cliente desktop divide arquivos grandes em blocos de tamanho fixo ou variável (ex: **4 MB** por chunk).
  - Cada chunk recebe um hash SHA-256 criptográfico exclusivo como seu identificador de conteúdo (*Content-Addressable Storage - CAS*).
- **Delta Sync (Sincronização Diferencial)**:
  - Quando o usuário modifica apenas 1 parágrafo de um documento de 500 MB, **apenas o chunk de 4 MB afetado é recomputado e transmitido pela rede**.
  - Os outros 124 chunks inalterados permanecem intactos no servidor, reduzindo o uso de largura de banda e tempo de upload em mais de $99\\%$.

### Dual Coding Visual
| Estratégia de Upload | Upload ao Modificar 1 Linha em 100 MB | Consumo de Rede e Tempo |
|---|---|---|
| **Upload do Arquivo Inteiro** | Reenvia todos os 100 MB | Lento e consome muita banda móvel |
| **Delta Sync com Chunking** | **Reenvia apenas 1 chunk de 4 MB** | **Instantâneo ($96\\%$ de economia de dados)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Rolling Hash (Rabin Fingerprint) para Chunks de Tamanho Variável
- Chunks de tamanho fixo sofrem de *Shift Problems* (inserir 1 byte no início do arquivo altera o hash de todos os blocos subsequentes). O algoritmo de **Rolling Hash** define limites de chunks baseando-se no conteúdo (quando os últimos bits do hash batem com um padrão), isolando a alteração a um único bloco.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-distributed-file-storage/SYS-ARCH-FILESTORE-001.md', `---
id: SYS-ARCH-FILESTORE-001
title: "Deduplicação Global de Blocos (CAS) e Resolução de Conflitos de Sincronização"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Como o Content-Addressable Storage (CAS) permite Deduplicação Global entre milhões de usuários e como conflitos de edição simultânea são resolvidos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Deduplicação Global (Cross-User Deduplication)**:
  - No CAS, o endereço de armazenamento do bloco é o seu próprio hash SHA-256 (\`s3://bucket/chunks/{sha256_hash}\`).
  - Antes de fazer upload de um chunk, o cliente envia seu hash para o servidor. Se o bloco já existir no cluster (mesmo que enviado por outro usuário), o servidor apenas cria um ponteiro de metadados (**Upload Instantâneo com Zero Bytes de I/O**).
- **Resolução de Conflitos Concorrentes**:
  - Quando dois dispositivos modificam o mesmo arquivo simultaneamente offline, o primeiro commit que chega ao servidor vence e avança o número de versão.
  - O segundo commit tem o conflito detectado e o sistema cria automaticamente uma cópia bifurcada (*Conflicted Copy*, ex: \`doc (Alice's conflicted copy 2026-08-18).pdf\`).

### Dual Coding Visual
| Cenário de Sincronização | Ação do Sistema | Resultado de Storage |
|---|---|---|
| **Chunk já existente no cluster** | Cria ponteiro de metadados | Upload instantâneo e zero custo de storage |
| **Conflito de versão concorrente** | Cria bifurcação (*Conflicted Copy*) | Zero perda de dados para ambos os autores |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Arquitetura de Notificação em Tempo Real
- O servidor de sincronização utiliza conexões persistentes **Server-Sent Events (SSE) ou WebSockets** para notificar outros dispositivos de um usuário assim que uma alteração é commitada, disparando o download do novo chunk em background.

</details>
`);

// ==========================================
// 9. case-metrics-monitoring
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-metrics-monitoring/SYS-ARCH-METRICS-000.md', `---
id: SYS-ARCH-METRICS-000
title: "Bancos de Séries Temporais (TSDB): Compressão Gorilla (XOR Float + Delta-of-Delta)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::meta
  - freq::high
---

## Pergunta
Como o algoritmo de compressão Gorilla (desenvolvido pelo Facebook/Meta) comprime timestamps e valores decimais (floats) em mais de 10x na memória RAM?

## Resposta
### Quick Answer
**Solução Direta**:
- **Compressão de Timestamps (Delta-of-Delta)**:
  - Métricas são coletadas em intervalos regulares (ex: a cada 10s).
  - O primeiro delta é $D = t_i - t_{i-1} = 10\\text{s}$. O delta do delta é $D' = (t_i - t_{i-1}) - (t_{i-1} - t_{i-2}) = 0$.
  - Se $D' = 0$, o Gorilla grava **apenas 1 bit (\`0\`)** em vez de 64 bits (\`int64\`).
- **Compressão de Valores (XOR de Floats)**:
  - Valores de métricas consecutivas (ex: uso de CPU $45.2\\% \\rightarrow 45.3\\%$) compartilham a mesma representação de bits de expoente e mantissa IEEE 754.
  - Executa $V_i \\oplus V_{i-1}$ e armazena apenas os bits significativos entre os zeros líderes e finais.
- Reduz o tamanho médio de cada ponto de telemetria de 16 bytes para **apenas 1.37 bytes (redução de ~12x)**.

### Dual Coding Visual
| Campo da Métrica | Formato Bruto sem Compressão | Formato Comprimido Gorilla |
|---|---|---|
| **Timestamp (Epoch ms)** | 64 bits (8 bytes) | **1 a 4 bits na maioria dos pontos** |
| **Valor Float64** | 64 bits (8 bytes) | **~1 a 10 bits após XOR** |
| **Total por Ponto** | 128 bits (16 bytes) | **~11 bits (~1.37 bytes)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Impacto na Capacidade de Ingestão
- A compressão Gorilla permitiu ao Facebook manter dezenas de bilhões de pontos de séries temporais na memória RAM de um cluster distribuído com latência de consulta sub-segundo para dashboards do Grafana.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-metrics-monitoring/SYS-ARCH-METRICS-001.md', `---
id: SYS-ARCH-METRICS-001
title: "Arquitetura de Métricas: Modelo Pull (Prometheus) vs Push (Datadog) e Downsampling"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::datadog
  - freq::high
---

## Pergunta
Quais são os trade-offs entre o modelo de coleta Pull (Prometheus) e Push (Datadog/StatsD) e como o Downsampling gerencia o custo de armazenamento?

## Resposta
### Quick Answer
**Solução Direta**:
- **Modelo Pull (Prometheus)**:
  - O servidor central faz *Scrape* periódico (HTTP \`/metrics\`) nos serviços registrados no Service Discovery.
  - **Pró**: Fácil monitoramento de saúde (se o scrape falha, o serviço está fora do ar); controle de taxa centralizado.
  - **Contra**: Exige que as instâncias sejam acessíveis via rede (dificuldade em tarefas Serverless/Batch).
- **Modelo Push (Datadog / StatsD / OpenTelemetry Agent)**:
  - A aplicação envia métricas ativamente via UDP/gRPC para um coletor local ou gateway central.
  - **Pró**: Ideal para funções efêmeras (AWS Lambda) e ambientes com restrições de firewall.
- **Downsampling (Rollups)**:
  - Dados brutos com resolução de 10 segundos são mantidos por 7 dias.
  - Após 7 dias, são agregados em médias/percentis de 5 minutos (retenção de 30 dias).
  - Após 30 dias, são agregados em médias de 1 hora (retenção de 1 ano), reduzindo em $>95\\%$ o volume de dados em disco.

### Dual Coding Visual
| Modelo de Coleta | Iniciação da Conexão | Cenário Ideal |
|---|---|---|
| **Pull (Prometheus)** | Servidor busca na aplicação | Microsserviços e contêineres de longa duração |
| **Push (StatsD / OTel)** | Aplicação envia para o coletor | Funções Serverless efêmeras e jobs em lote |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Cálculo de Percentis (p99 / p95) com t-Digest
- Ao realizar downsampling, médias simples distorcem a realidade de latência. Utilizam-se estruturas probabilísticas como **t-Digest ou HdrHistogram** para calcular percentis p95/p99 agregados com alta fidelidade matemática.

</details>
`);

// ==========================================
// 10. case-search-autocomplete
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-search-autocomplete/SYS-ARCH-TYPEAHEAD-000.md', `---
id: SYS-ARCH-TYPEAHEAD-000
title: "Autocompletar de Busca (Google Typeahead): Estrutura Trie em Memória e Cache Top-K"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Como uma Árvore de Prefixos (Trie) em memória combinada com pré-computação Top-K responde a sugestões de autocompletar em menos de 10 ms?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema da Busca Ingênua**: Percorrer toda a subárvore a cada tecla digitada pelo usuário e ordenar todos os termos filhos por frequência de busca tem complexidade $O(\\text{subárvore} \\log N)$, inviável para 100k QPS.
- **Trie Otimizada com Top-K em Cada Nó**:
  - Cada nó da Trie armazena uma lista fixa dos **Top-5 ou Top-10 termos mais populares** que compartilham aquele prefixo.
  - Ao digitar o prefixo (ex: \`"sys"\`), o servidor navega até o nó do prefixo em tempo **$O(L)$** (onde $L = \\text{comprimento da string} \\le 20$) e retorna o Top-5 **instantaneamente em $O(1)$** sem precisar varrer os nós filhos.

### Dual Coding Visual
| Estrutura de Autocomplete | Tempo de Resposta | Complexidade Algorítmica |
|---|---|---|
| **Trie sem Cache Top-K** | Lento (~50-100 ms sob alta carga) | $O(\\text{tamanho da subárvore} + K \\log K)$ |
| **Trie com Top-K nos Nós** | **Ultra-rápido (< 5 ms em RAM)** | **$O(L)$ onde $L \\le 20$ (Tempo constante na prática)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Visual do Nó
- Nó do caractere \`'s'\` $\\rightarrow$ Nó \`'y'\` $\\rightarrow$ Nó \`'s'\`:
  - \`top_5\`: \`["system design", "system of a down", "system32", "sysadmin", "systemctl"]\`

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-search-autocomplete/SYS-ARCH-TYPEAHEAD-001.md', `---
id: SYS-ARCH-TYPEAHEAD-001
title: "Pipeline de Agregação de Consultas Offline (MapReduce / Flink) e Sharding de Trie"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Como a esteira de agregação offline e o particionamento de Trie em servidores distribuídos escalam o Google Typeahead para centenas de milhões de termos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Pipeline de Agregação Offline (Apache Flink / Spark)**:
  - Atualizar a contagem de frequência na Trie em tempo real para cada busca causaria contenção massiva de escrita na RAM.
  - Consultas são descarregadas em logs no Kafka; um job em lote (Spark/Flink) agrega a contagem diária/semanal e gera uma **nova imagem da Trie imutável periodicamente** (ex: a cada hora), descarregando-a no cluster de consulta.
- **Particionamento da Trie (Sharding)**:
  - **Particionamento por Prefixo Inicial**: Servidor 1 armazena \`[a-m]\`, Servidor 2 armazena \`[n-z]\`.
  - **Particionamento por Consistent Hashing**: Hasheia o prefixo para balancear uniformemente letras com frequências desiguais (ex: 'e' tem muito mais termos que 'x').

### Dual Coding Visual
| Camada | Função | Tecnologia |
|---|---|---|
| **Tempo Real (Leitura)** | Responde sugestões em < 10ms a partir de Tries em RAM | Cluster C++ / Go com Trie em memória |
| **Offline (Escrita)** | Processa bilhões de buscas e recalcula Top-K | Apache Spark / Flink + S3 |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Cache no Navegador e CDN
- O cliente armazena respostas de autocompletar no cache local do browser (\`sessionStorage\` ou \`Cache-Control: private, max-age=3600\`), evitando chamadas de rede repetidas quando o usuário apaga ou redigita caracteres.

</details>
`);

// ==========================================
// 11. case-distributed-task-scheduler
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-distributed-task-scheduler/SYS-ARCH-SCHEDULER-000.md', `---
id: SYS-ARCH-SCHEDULER-000
title: "Agendador de Tarefas Distribuído (Temporal / Distributed Cron): Delay Queues e Timers de Alta Escala"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::uber
  - freq::high
---

## Pergunta
Como agendadores de tarefas distribuídos escalam a execução de milhões de timers usando Filas Atrasadas (Delay Queues) e Sorted Sets no Redis?

## Resposta
### Quick Answer
**Solução Direta**:
- **Delay Queue com Redis Sorted Set**:
  1. A tarefa agendada é inserida no ZSet com \`Score = execution_timestamp_epoch_ms\` e \`Member = task_id\`.
  2. Um pool de workers consulta periodicamente em lote:
     \`ZRANGEBYSCORE delay_queue 0 current_timestamp LIMIT 0 100\`.
  3. Para garantir que exatamente um worker processe a tarefa, utiliza-se script Lua ou \`ZPOPMIN\` atômico.
  4. As tarefas prontas são movidas imediatamente para a fila de execução ativa (Kafka / RabbitMQ / SQS) para despacho aos workers.

### Dual Coding Visual
| Componente do Agendador | Estrutura | Responsabilidade |
|---|---|---|
| **Timer Registry** | Redis ZSet / RocksDB ordenado | Mantém tarefas ordenadas por timestamp de disparo |
| **Poller / Dispatcher** | Workers distribuídos com \`ZPOPMIN\` | Dispara tarefas cujo timestamp $\\le$ momento atual |
| **Execution Queue** | RabbitMQ / Kafka | Execução real das tarefas com retries e workers |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Hierárquico Hashed Timing Wheel
- Para bilhões de timers em memória, frameworks como Netty e Kafka utilizam **Hashed Timing Wheels** (estruturas circulares inspiradas em ponteiros de relógio), permitindo agendamento e cancelamento de timers em **$O(1)$ constante**.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-distributed-task-scheduler/SYS-ARCH-SCHEDULER-001.md', `---
id: SYS-ARCH-SCHEDULER-001
title: "Execução de DAGs de Tarefas, Heartbeats de Workers e Resiliência a Falhas"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::airbnb
  - freq::high
---

## Pergunta
Como orquestradores de fluxo (Temporal / Apache Airflow) coordenam a execução de tarefas dependentes em DAGs e tratam falhas de workers?

## Resposta
### Quick Answer
**Solução Direta**:
- **Grafo Acíclico Direcionado (DAG)**:
  - Define a ordem topológica de dependências entre tarefas (a Tarefa C só pode iniciar após o término bem-sucedido de A e B).
  - O orquestrador mantém uma máquina de estados com a contagem de dependências pendentes (*In-degree*) de cada nó.
- **Heartbeats e Detecção de Falha de Workers**:
  - Enquanto um worker executa uma tarefa longa, ele envia **Heartbeats periódicos** (ex: a cada 5 segundos) para o servidor de controle.
  - Se o worker morrer (crash, falha de máquina ou perda de rede) e não enviar heartbeat antes do \`heartbeat_timeout\`, o orquestrador reatribui a tarefa para outro worker saudável a partir do último checkpoint gravado.

### Dual Coding Visual
| Mecanismo de Resiliência | Gatilho de Disparo | Ação do Orquestrador |
|---|---|---|
| **Heartbeat Timeout** | Worker para de enviar sinal de vida | Reatribui a tarefa para outro nó saudável |
| **Ordem Topológica (DAG)** | Tarefas pai concluem com sucesso | Destrava e despacha as tarefas filhas |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Event Sourcing na Execução de Workflows (Temporal)
- O Temporal grava cada passo executado como um evento imutável em um log transacional. Se o servidor do orquestrador cair, ele reproduz o histórico de eventos (*Workflow Replay*) e retoma a execução exatamente do ponto onde parou sem reexecutar tarefas já concluídas.

</details>
`);

// ==========================================
// 12. case-payment-system-ledger
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-payment-system-ledger/SYS-ARCH-PAYMENT-000.md', `---
id: SYS-ARCH-PAYMENT-000
title: "Sistema de Pagamentos (Stripe): Livro-Razão de Partidas Dobradas (Double-Entry Bookkeeping)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::stripe
  - freq::high
---

## Pergunta
Por que sistemas financeiros e gateways de pagamento utilizam o princípio de Contabilidade de Partidas Dobradas (Double-Entry Bookkeeping) em vez de uma coluna simples de saldo?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema da Coluna Simples (\`balance = balance + amount\`)**: Um erro de mutação, race condition ou crash destrói a rastreabilidade e faz dinheiro "surgir ou sumir do nada" sem possibilidade de auditoria.
- **Partidas Dobradas (Double-Entry Bookkeeping)**:
  - Dinheiro nunca é criado ou destruído; ele é **transferido entre contas**.
  - Toda transação financeira consiste em **no mínimo dois lançamentos imutáveis**: um **Débito** em uma conta e um **Crédito** correspondente em outra conta.
  - **Invariante Matemática Absoluta**: A soma de todos os débitos DEVE ser rigorosamente igual à soma de todos os créditos em qualquer transação:
    $$\\sum \\text{Débitos} - \\sum \\text{Créditos} = 0$$

### Dual Coding Visual
| Tipo de Conta | Aumento de Valor | Redução de Valor |
|---|---|---|
| **Ativo / Despesas (Asset / Expense)** | Lançamento a DÉBITO | Lançamento a CRÉDITO |
| **Passivo / Receitas (Liability / Equity)** | Lançamento a CRÉDITO | Lançamento a DÉBITO |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Transferência de $100 da Alice para o Bob
\`\`\`sql
BEGIN;
-- Transação financeira atômica no livro-razão (Ledger):
INSERT INTO ledger_entries (tx_id, account_id, type, amount) VALUES
('tx_100', 'alice_checking', 'DEBIT',  100.00),
('tx_100', 'bob_checking',   'CREDIT', 100.00);

-- Validação de integridade: soma(débito) == soma(crédito)
COMMIT;
\`\`\`

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/faang-system-design-archetypes/case-payment-system-ledger/SYS-ARCH-PAYMENT-001.md', `---
id: SYS-ARCH-PAYMENT-001
title: "Idempotência Financeira, Gateway de Pagamentos e Processo de Reconciliação Noturna"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::stripe
  - freq::high
---

## Pergunta
Como gateways de pagamento garantem que nenhuma cobrança seja duplicada sob falhas de rede e como a Reconciliação Noturna detecta divergências financeiras?

## Resposta
### Quick Answer
**Solução Direta**:
- **Idempotência Financeira de Ponta a Ponta**:
  - O cliente gera uma \`Idempotency-Key\` exclusiva para cada checkout.
  - O gateway repassa essa mesma chave para os adquirentes bancários (Visa, Mastercard, Adyen).
  - Se a rede cair durante a confirmação, o cliente pode reenviar a requisição com segurança: o adquirente reconhece a chave e retorna o comprovante existente sem debitar novamente o cartão.
- **Processo de Reconciliação Noturna (Reconciliation Batch)**:
  - Diariamente, os bancos e adquirentes disponibilizam arquivos de liquidação financeira (**Settlement Files / Extratos de Liquidação**).
  - Um pipeline batch (Spark/EMR) executa um *Outer Join* entre os registros do Ledger interno e o arquivo do adquirente para verificar se $100\\%$ das transações batem em centavos, sinalizando divergências para auditoria humana.

### Dual Coding Visual
| Mecanismo de Segurança | Momento de Atuação | Objetivo |
|---|---|---|
| **Idempotency Keys** | Tempo Real (No ato do pagamento) | Impede cobrança dupla por retries de rede |
| **Reconciliação Noturna** | Batch Assíncrono (D+1) | Garante paridade entre o banco interno e adquirentes externos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Tratamento de Estados Indeterminados
- Se uma chamada à adquirente der timeout, o pagamento entra no estado \`PENDING_VERIFICATION\`. Um worker de polling consulta a API da adquirente via query idempotente antes de tentar qualquer nova cobrança ou cancelamento.

</details>
`);

console.log('✅ FAANG Archetypes (Part 2) cards successfully generated and validated!');
