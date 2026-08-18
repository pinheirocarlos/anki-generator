import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Phase 3: System Design - Foundations & Distributed Systems...');

// ==========================================
// 1. back-of-the-envelope-estimations
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/system-design-foundations/back-of-the-envelope-estimations/SYS-FND-ESTIMATION-000.md', `---
id: SYS-FND-ESTIMATION-000
title: "Latências de Hardware de Jeff Dean e Ordens de Grandeza"
tags:
  - level::l3-junior
  - topic::sys::foundations
  - company::google
  - freq::high
---

## Pergunta
Quais são os números de latência de hardware fundamentais de Jeff Dean que todo engenheiro de software deve memorizar para dimensionar sistemas distribuídos?

## Resposta
### Quick Answer
**Solução Direta**:
- **L1 CPU Cache**: ~0.5 a 1 ns.
- **L2 CPU Cache**: ~3 a 4 ns.
- **RAM (Acesso Principal)**: ~100 ns.
- **SSD NVMe (Leitura Aleatória)**: ~10 a 50 μs (microssegundos).
- **Rede no Mesmo Data Center**: ~500 μs (0.5 ms).
- **Disco Magnético HDD (Seek)**: ~10 ms.
- **RTT Transcontinental (EUA - Europa)**: ~150 ms.

### Dual Coding Visual
| Nível de Acesso | Latência Típica | Fator de Escala Relativo |
|---|---|---|
| **L1 / L2 Cache** | 0.5 - 4 ns | 1x (Fração de segundo) |
| **RAM Principal** | ~100 ns | ~100x |
| **NVMe SSD / Rede Local** | 10 - 500 μs | ~10.000x a 500.000x |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Analogia de Escala Temporal (Se 1 ciclo de CPU = 1 segundo)
- **Acesso L1**: 1 segundo.
- **Acesso RAM**: ~3 minutos (levantar e pegar um café).
- **Leitura SSD**: ~2 dias úteis.
- **Round-Trip Data Center**: ~6 dias.
- **Seek em HDD**: ~4 meses.
- **RTT Transcontinental**: ~5 anos.

#### Exemplo em Go: Por que evitar I/O em loops
\`\`\`go
package main

// Ruim: 1.000 round-trips de rede ou disco = 1000 * 0.5ms = 500ms
// Bom: Carregar em lote na RAM (100ns por acesso) = sub-milissegundo
func processItems(ids []int64) {
  // Batch fetching minimiza a penalidade de travessia de barramento de rede
}
\`\`\`

#### Key Takeaways
- Acesso à RAM é ~1.000x mais rápido que leitura em SSD NVMe e ~100.000x mais rápido que HDD.
- Sempre projete caches em memória para blindar storages secundários e chamadas remotas de rede.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/system-design-foundations/back-of-the-envelope-estimations/SYS-FND-ESTIMATION-001.md', `---
id: SYS-FND-ESTIMATION-001
title: "Cálculo de Throughput (QPS Médio vs Pico) e Dimensionamento de Storage"
tags:
  - level::l4-pleno
  - topic::sys::foundations
  - company::meta
  - freq::high
---

## Pergunta
Como calcular a taxa de requisições por segundo (QPS médio e pico) e a capacidade de armazenamento necessária para 5 anos a partir do volume de usuários ativos diários (DAU)?

## Resposta
### Quick Answer
**Solução Direta**:
- **QPS Médio**: $\\text{QPS} = \\frac{\\text{DAU} \\times \\text{Req por Usuário}}{86.400 \\text{ s}} \\approx \\frac{\\text{DAU} \\times \\text{Req}}{10^5}$.
- **QPS de Pico**: Geralmente dimensionado como **2x a 5x** do QPS médio para absorver flutuações sazonais.
- **Storage Diário**: $\\text{Bytes/dia} = \\text{DAU} \\times \\text{Gravações/Usuário} \\times \\text{Tamanho Médio do Payload}$.
- **Storage 5 Anos**: $\\text{Storage Diário} \\times 365 \\times 5 \\approx \\text{Storage Diário} \\times 2.000$.

### Dual Coding Visual
| Parâmetro de Cálculo | Fórmula Simplificada | Regra Prática FAANG |
|---|---|---|
| **Segundos por Dia** | 86.400 s | Arredondar para $10^5$ (100.000 s) |
| **QPS de Pico** | QPS Médio $\\times$ Multiplicador | Fator 2x a 5x (ou 10x para flash events) |
| **Retenção 5 Anos** | Diário $\\times 365 \\times 5$ | $\\approx 2.000$ dias de volume |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Prático: Sistema com 100M DAU
1. **Cenário**: 100 Milhões de DAU, cada usuário faz 10 leituras e 2 escritas por dia (1 KB por escrita).
2. **QPS de Leitura**:
   $$\\text{QPS}_{read} = \\frac{100\\text{M} \\times 10}{100.000} = 10.000 \\text{ QPS (Médio)} \\rightarrow 20.000 \\text{ QPS (Pico 2x)}$$
3. **QPS de Escrita**:
   $$\\text{QPS}_{write} = \\frac{100\\text{M} \\times 2}{100.000} = 2.000 \\text{ QPS (Médio)} \\rightarrow 4.000 \\text{ QPS (Pico 2x)}$$
4. **Armazenamento para 5 Anos**:
   - Diário: $100\\text{M} \\times 2 \\times 1\\text{ KB} = 200\\text{ GB/dia}$.
   - 5 Anos: $200\\text{ GB} \\times 2.000 = 400\\text{ TB}$ (sem replicação) $\\rightarrow \\times 3$ (com replicação) $= 1.2\\text{ PB}$.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/system-design-foundations/back-of-the-envelope-estimations/SYS-FND-ESTIMATION-002.md', `---
id: SYS-FND-ESTIMATION-002
title: "Cálculo de Disponibilidade e Tabela de 'Nines' (SLA/SLO)"
tags:
  - level::l3-junior
  - topic::sys::foundations
  - company::amazon
  - freq::high
---

## Pergunta
O que representa a métrica de disponibilidade em 'noves' (99.9% vs 99.999%) e qual é o tempo máximo de downtime permitido por ano em cada nível?

## Resposta
### Quick Answer
**Solução Direta**:
- **Três Noves (99.9%)**: Permite até **8.76 horas** de downtime por ano (~43 minutos por mês).
- **Quatro Noves (99.99%)**: Permite até **52.6 minutos** de downtime por ano (~4.3 minutos por mês).
- **Cinco Noves (99.999%)**: Permite no máximo **5.26 minutos** de downtime por ano (~26 segundos por mês).
- Cada 'nove' adicional exige automação total de failover, replicação multi-região e arquiteturas ativas-ativas sem pontos únicos de falha (SPOF).

### Dual Coding Visual
| Disponibilidade (Nines) | Downtime / Mês | Downtime / Ano |
|---|---|---|
| **99.9% (3 noves)** | 43.8 minutos | 8.76 horas |
| **99.99% (4 noves)** | 4.38 minutos | 52.6 minutos |
| **99.999% (5 noves)** | 26.3 segundos | 5.26 minutos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Impacto na Arquitetura de Software
- **99.9%**: Aceitável para serviços corporativos internos; failover manual ou semi-automático.
- **99.99%**: Padrão ouro para plataformas web/e-commerce FAANG; failover automatizado com health checks.
- **99.999%**: Telecomunicações e pagamentos críticos (Stripe, VISA); exige infraestrutura multi-região ativa-ativa, consensus Raft/Paxos e isolamento estrito de fault domains.

</details>
`);

// ==========================================
// 2. system-design-interview-framework
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/system-design-foundations/system-design-interview-framework/SYS-FND-FRAMEWORK-000.md', `---
id: SYS-FND-FRAMEWORK-000
title: "Framework de Entrevista de System Design em 4 Etapas"
tags:
  - level::l3-junior
  - topic::sys::foundations
  - company::google
  - freq::high
---

## Pergunta
Qual é o framework padrão em 4 etapas utilizado para estruturar uma entrevista de System Design em 45 minutos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Etapa 1: Clarificação de Requisitos e Escopo (3-5 min)**: Delimitar requisitos funcionais (casos de uso principais) e não-funcionais (QPS, latência p99, disponibilidade, consistência).
- **Etapa 2: Estimativas de Ordem de Grandeza (3-5 min)**: Calcular QPS de leitura/escrita, largura de banda e storage para 5 anos.
- **Etapa 3: Design de Alto Nível (10-15 min)**: Desenhar diagrama de blocos (Clients -> LB -> API Gateway -> Microservices -> Cache -> DB).
- **Etapa 4: Deep Dives e Gargalos (15-20 min)**: Tratar falhas parciais, estratégias de particionamento, replicação, concorrência e monitoramento.

### Dual Coding Visual
| Etapa do Framework | Duração Sugerida | Objetivo Central |
|---|---|---|
| **1. Requisitos & Escopo** | 5 min | Eliminar ambiguidades e definir metas |
| **2. High-Level Design** | 15 min | Estabelecer topologia ponta a ponta |
| **3. Deep Dive & Bottlenecks** | 20 min | Resolver trade-offs e falhas críticas |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Erros Críticos a Evitar em Entrevistas FAANG
1. **Pular direto para o desenho**: Desenhar antes de definir requisitos funcionais leva à rejeição imediata.
2. **Monólogo**: Trate a entrevista como uma sessão colaborativa de arquitetura com um colega sênior.
3. **Ignorar Não-Funcionais**: Deixar de perguntar sobre tolerância a partição ou consistência (ex: ACID vs Eventual).

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/system-design-foundations/system-design-interview-framework/SYS-FND-FRAMEWORK-001.md', `---
id: SYS-FND-FRAMEWORK-001
title: "Condução de Deep Dives Arquiteturais e Análise de Trade-offs"
tags:
  - level::l4-pleno
  - topic::sys::foundations
  - company::meta
  - freq::high
---

## Pergunta
Como conduzir a fase de 'Deep Dive' em System Design demonstrando senioridade técnica ao avaliar trade-offs arquiteturais?

## Resposta
### Quick Answer
**Solução Direta**:
- Em vez de propor uma 'solução perfeita única', engenheiros seniores expõem as tensões fundamentais do sistema:
  - **Storage**: B-Tree (otimizado para leitura) vs LSM-Tree (otimizado para escrita pesada).
  - **Comunicação**: Síncrono (gRPC/REST para baixa latência) vs Assíncrono (Kafka/SQS para desacoplamento e absorção de picos).
  - **Consistência**: Linearizabilidade (alto custo de coordenação) vs Consistência Eventual (máxima disponibilidade).
- Identifique o componente mais crítico (gargalo de CPU, I/O ou rede) e proponha mitigação comprovada.

### Dual Coding Visual
| Dimensão de Decisão | Opção A | Opção B |
|---|---|---|
| **Mecanismo de Escrita** | Síncrono direto no DB | Fila buffer assíncrona (Write-Behind) |
| **Consistência de Leitura** | Strong Consistency (Quorum R+W > N) | Read from Replicas (Eventual) |
| **Comunicação entre Serviços** | REST/JSON (Simplicidade) | gRPC/Protobuf (Eficiência binária) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Argumentação Sênior
> "Para o feed de notícias, optamos por consistência eventual com Fan-out on Write para usuários normais, pois 1-2 segundos de atraso na visualização de um post são aceitáveis para o usuário, mas para celebridades (>1M seguidores) chaveamos para Fan-out on Read para evitar explosão de gravações no cluster Redis."

</details>
`);

// ==========================================
// 3. cap-pacelc-consistency
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/cap-pacelc-consistency/SYS-DIST-CONSISTENCY-000.md', `---
id: SYS-DIST-CONSISTENCY-000
title: "Teorema CAP e a Inevitabilidade de Partições de Rede"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::google
  - freq::high
---

## Pergunta
Por que em sistemas distribuídos sob o Teorema CAP a escolha real é sempre entre Consistência (CP) e Disponibilidade (AP) durante uma Partição de Rede?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Teorema CAP** dita que um sistema distribuído pode garantir no máximo 2 de 3 propriedades: **C**onsistência (Linearizabilidade), **A**vailability (Toda requisição não com falha recebe resposta) e **P**artition Tolerance (Tolerância a perda de mensagens na rede).
- Como redes físicas sofrem inevitavelmente cortes de cabos, congestionamentos e atrasos (**P é obrigatório** no mundo real), sob partição a escolha forçada é:
  - **Sistema CP**: Recusa escritas/leituras para evitar servir dados obsoletos ou divergentes (prioriza exatidão).
  - **Sistema AP**: Permite leituras e escritas em nós isolados, gerando divergência temporária (prioriza disponibilidade).

### Dual Coding Visual
| Propriedade CAP | Definição Rigorosa | Exemplo de Sistema |
|---|---|---|
| **Consistência (C)** | Toda leitura retorna a escrita mais recente ou erro | Spanner, etcd, ZooKeeper (CP) |
| **Disponibilidade (A)** | Todo nó não-falho responde com sucesso (sem garantia do dado mais novo) | Cassandra, DynamoDB AP (AP) |
| **Tolerância a Partição (P)** | O sistema opera mesmo com perda de pacotes na rede | Premissa obrigatória de redes distribuídas |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Cenário de Partição
- Se o Nó A e o Nó B não conseguem se comunicar devido a uma partição de rede:
  - Se um cliente grava no Nó A:
    - No modo **CP**, o Nó A trava a escrita até conseguir sincronizar com B ou retorna erro ao cliente.
    - No modo **AP**, o Nó A aceita a escrita localmente, mas leituras vindas do Nó B verão dados desatualizados.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/cap-pacelc-consistency/SYS-DIST-CONSISTENCY-001.md', `---
id: SYS-DIST-CONSISTENCY-001
title: "Teorema PACELC: Trade-offs na Ausência de Partições (Latência vs Consistência)"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::amazon
  - freq::high
---

## Pergunta
Como o Teorema PACELC expande o CAP ao definir trade-offs de Latência versus Consistência mesmo quando o sistema está operando normalmente sem partições?

## Resposta
### Quick Answer
**Solução Direta**:
- O **PACELC** estende o CAP formalizando o comportamento em estado normal:
  - **IF Partition (P)**: Escolha entre **A**vailability ou **C**onsistency.
  - **ELSE (E)** (operação normal): Escolha entre **L**atency ou **C**onsistency.
- Para garantir consistência forte em operação normal (PC/EC), nós precisam coordenar via rede (round-trips de replicação síncrona), aumentando a **latência**.
- Para minimizar latência (PA/EL), responde-se ao cliente antes de replicar a todos os nós (replicação assíncrona), arriscando inconsistências temporárias.

### Dual Coding Visual
| Classificação PACELC | Trade-off Operacional | Exemplo de Banco |
|---|---|---|
| **PC / EC** | Consistência forte e replicação síncrona | Google Spanner, CockroachDB |
| **PA / EL** | Disponibilidade e replicação assíncrona | Apache Cassandra, Amazon DynamoDB |
| **PA / EC** | Consistência em normalidade, disponível sob partição | MongoDB configurado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implicações Práticas
- Mesmo que seu data center nunca sofra partições de rede, você ainda precisa decidir: prefere que um \`INSERT\` retorne em 2 ms (assíncrono, risco de perder dados em crash) ou em 25 ms (aguardando confirmação de quorum multi-região)?

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/cap-pacelc-consistency/SYS-DIST-CONSISTENCY-002.md', `---
id: SYS-DIST-CONSISTENCY-002
title: "Modelos de Consistência: Linearizabilidade vs Consistência Eventual vs Read-Your-Writes"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::meta
  - freq::high
---

## Pergunta
Qual é a diferença conceitual entre Linearizabilidade (Strong Consistency), Consistência Eventual e a garantia Read-Your-Writes?

## Resposta
### Quick Answer
**Solução Direta**:
- **Linearizabilidade (Forte)**: O sistema se comporta como se existisse apenas uma única cópia global do dado. Qualquer leitura iniciada após o término de uma escrita DEVE retornar o novo valor.
- **Consistência Eventual**: Não há garantias de quando réplicas convergirão; se nenhuma nova escrita ocorrer, eventualmente todas as réplicas retornarão o mesmo valor.
- **Read-Your-Writes (Causal)**: Garante que um usuário específico sempre enxerga suas próprias alterações imediatamente (mesmo que outros usuários ainda vejam dados antigos).

### Dual Coding Visual
| Modelo de Consistência | Garantia Oferecida | Custo de Implementação |
|---|---|---|
| **Linearizabilidade** | Ordem global estrita em tempo real | Alto (Quorum síncrono / Raft / Paxos) |
| **Read-Your-Writes** | Usuário vê seus próprios updates | Médio (Sticky routing ou read from primary) |
| **Eventual** | Convergência no tempo sem prazo estrito | Mínimo (Gossip protocol / async replication) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Implementar Read-Your-Writes com Replicação Assíncrona
1. **Roteamento Baseado em Janela de Tempo**: Após uma escrita, force as leituras desse usuário específico para o nó primário durante 5 segundos.
2. **Version Vector no Token de Sessão**: O cliente anexa a versão da sua última escrita no cabeçalho HTTP; a réplica só responde se já aplicou essa versão (caso contrário, aguarda ou delega ao primário).

</details>
`);

// ==========================================
// 4. consensus-replication
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/consensus-replication/SYS-DIST-CONSENSUS-000.md', `---
id: SYS-DIST-CONSENSUS-000
title: "Algoritmo de Consenso Raft: Eleição de Líder e Heartbeats"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::uber
  - freq::high
---

## Pergunta
Como o algoritmo de consenso Raft realiza a eleição de um novo líder utilizando termos e timeouts aleatórios (*Election Timeout*)?

## Resposta
### Quick Answer
**Solução Direta**:
- No Raft, os nós assumem um de 3 estados: **Leader**, **Follower** ou **Candidate**.
- **Heartbeats**: O Leader envia mensagens periódicas de *AppendEntries* (heartbeats) para manter sua autoridade.
- **Eleição**:
  1. Se um Follower não recebe heartbeat antes de expirar seu **Election Timeout** aleatório (ex: 150-300 ms), ele se torna **Candidate**.
  2. O Candidate incrementa o **Termo (Term)**, vota em si mesmo e envia requisições de voto (*RequestVote*) aos demais nós.
  3. Ao receber a maioria simples dos votos ($N/2 + 1$), o candidato é eleito o novo **Leader**.
  4. Timeouts aleatórios evitam divisão de votos (*Split Votes*).

### Dual Coding Visual
| Estado no Raft | Responsabilidade Principal | Transição |
|---|---|---|
| **Follower** | Responde a RPCs de Leader/Candidate | Vira Candidate se timeout expirar |
| **Candidate** | Solicita votos e disputa eleição | Vira Leader com maioria dos votos |
| **Leader** | Recebe escritas e replica log para followers | Vira Follower se encontrar termo maior |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Mecânica de Votação Justa
- Cada nó pode votar em no máximo 1 candidato por termo (First-Come, First-Served).
- Um nó só concede voto a um candidato cujo log esteja pelo menos tão atualizado quanto o seu próprio (*Log Completeness Rule*).

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/consensus-replication/SYS-DIST-CONSENSUS-001.md', `---
id: SYS-DIST-CONSENSUS-001
title: "Replicação de Log no Raft e Mecanismo de Commit por Quorum"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::google
  - freq::high
---

## Pergunta
Como o líder no algoritmo Raft garante a consistência do log replicado e determina quando uma entrada de log está efetivamente 'commitada'?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fluxo de Escrita**:
  1. O cliente envia um comando para o **Leader**.
  2. O Leader grava o comando em seu próprio log local como *uncommitted*.
  3. O Leader dispara RPCs \`AppendEntries\` em paralelo para todos os Followers.
  4. Quando a maioria dos nós ($N/2 + 1$) confirma a gravação no disco, a entrada é considerada **Commitada**.
  5. O Leader aplica a entrada à sua Máquina de Estados (FSM) e retorna sucesso ao cliente.
  6. No próximo heartbeat, o Leader notifica os Followers do novo \`commitIndex\`, que aplicam a entrada às suas respectivas FSMs.

### Dual Coding Visual
| Fase da Replicação | Estado da Entrada de Log | Visibilidade para o Cliente |
|---|---|---|
| **1. Proposta** | Gravada apenas no log do Leader | Invisível (Em processamento) |
| **2. Quorum Atingido** | Gravada em $>50\\%$ dos nós | Efetivada (Retorna sucesso ao cliente) |
| **3. Aplicação na FSM** | Executada na Máquina de Estados | Dados consultáveis via leitura |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Resolução de Conflitos de Log
- Se um Follower divergir do Leader (devido a falhas anteriores), o Leader força o log do Follower a duplicar o seu:
  - O Leader localiza a última entrada comum retrocedendo o \`nextIndex\` para esse nó e sobrescreve todas as entradas conflitantes subsequentes.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/consensus-replication/SYS-DIST-CONSENSUS-002.md', `---
id: SYS-DIST-CONSENSUS-002
title: "Quorum Reads e Writes (Fórmula R + W > N) em Sistemas Leaderless"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::amazon
  - freq::high
---

## Pergunta
Como a fórmula de Quorum $R + W > N$ garante leituras com dados atualizados em arquiteturas distribuídas sem líder (*Leaderless* como DynamoDB e Cassandra)?

## Resposta
### Quick Answer
**Solução Direta**:
- Em um cluster com $N$ réplicas:
  - $W$ = Número mínimo de réplicas que devem confirmar uma escrita antes de retornar sucesso.
  - $R$ = Número mínimo de réplicas consultadas em uma leitura.
- **Princípio da Sobreposição (Pigeonhole Principle)**: Se $R + W > N$, o conjunto de nós lidos ($R$) e o conjunto de nós escritos ($W$) obrigatoriamente compartilham **pelo menos um nó em comum**.
- Esse nó compartilhado conterá o timestamp/versão mais recente, permitindo ao coordenador retornar o dado correto e disparar reparo em segundo plano (*Read Repair*).

### Dual Coding Visual
| Configuração ($N=3$) | Parâmetros ($W, R$) | Garantia de Consistência |
|---|---|---|
| **Quorum Forte** | $W=2, R=2$ ($R+W=4 > 3$) | Consistência forte (Lê escrita mais recente) |
| **Otimizado para Escrita** | $W=1, R=3$ ($R+W=4 > 3$) | Escritas ultra-rápidas, leituras mais lentas |
| **Leituras Eventuais (Baixa Latência)** | $W=1, R=1$ ($R+W=2 \\le 3$) | Risco de ler dados defasados (Eventual) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo com Read Repair
1. Cliente escreve com $W=2$ nos nós $[A, B, C]$; nós $A$ e $B$ gravam com timestamp $T_2$, nó $C$ está temporariamente inacessível.
2. Cliente lê com $R=2$ consultando nós $B$ ($T_2$) e $C$ ($T_1$).
3. O coordenador identifica que $T_2 > T_1$, devolve o valor de $T_2$ ao cliente e envia um update assíncrono para atualizar o nó $C$.

</details>
`);

// ==========================================
// 5. distributed-transactions
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/distributed-transactions/SYS-DIST-TX-000.md', `---
id: SYS-DIST-TX-000
title: "Two-Phase Commit (2PC): Fases Prepare e Commit e Vulnerabilidade de Bloqueio"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::oracle
  - freq::high
---

## Pergunta
Como funciona o protocolo Two-Phase Commit (2PC) e por que ele é classificado como um protocolo de commit síncrono bloqueante?

## Resposta
### Quick Answer
**Solução Direta**:
- O 2PC coordena uma transação atômica entre múltiplos bancos através de um **Coordenador**:
  - **Fase 1 (Prepare)**: O coordenador envia \`PREPARE\` para todos os nós participantes. Cada nó aloca locks locais, valida restrições, grava em WAL e responde \`VOTE_COMMIT\` ou \`VOTE_ABORT\`.
  - **Fase 2 (Commit/Abort)**: Se TODOS votaram sim, o coordenador grava \`COMMIT\` no log e envia \`DO_COMMIT\` a todos. Se qualquer nó votou não ou deu timeout, envia \`DO_ABORT\`.
- **Natureza Bloqueante**: Se o coordenador cair após a Fase 1 enquanto nós mantêm locks abertos, os participantes ficam bloqueados indefinidamente sem saber se devem commitar ou abortar (*Coordinator Failure Problem*).

### Dual Coding Visual
| Fase do 2PC | Ação do Coordenador | Ação dos Participantes |
|---|---|---|
| **Fase 1: Prepare** | Envia requisição de voto | Adquire locks e responde Sim/Não |
| **Fase 2: Commit/Abort** | Decide pelo consenso unânime | Aplica alteração e libera locks |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Desvantagens em Escala Web / Microsserviços
- **Latência elevada**: O tempo total da transação é limitado pelo participante mais lento.
- **Deadlocks distribuídos**: Segurar locks por longos períodos sob alto throughput causa saturação de conexões.
- Por isso, microsserviços modernos substituem o 2PC por **Sagas** e consistência eventual.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/distributed-transactions/SYS-DIST-TX-001.md', `---
id: SYS-DIST-TX-001
title: "Saga Pattern: Coreografia vs Orquestração e Transações Compensatórias"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::uber
  - freq::high
---

## Pergunta
Como o padrão Saga garante consistência eventual entre múltiplos microsserviços e qual é a diferença entre Coreografia e Orquestração?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Saga** decompõe uma transação distribuída em uma sequência de transações locais individuais em cada serviço.
- Cada etapa concluída dispara um evento/mensagem para a próxima etapa.
- **Rollback via Compensação**: Se uma etapa falhar no meio do caminho, a Saga executa explicitamente **Transações Compensatórias** em ordem reversa para desfazer as alterações já gravadas (ex: estornar pagamento no cartão se o estoque esgotou).
- **Coreografia**: Serviços comunicam-se via eventos assíncronos (Pub/Sub) sem coordenador central.
- **Orquestração**: Um serviço centralizado (Orchestrator/Workflow Engine como Temporal) controla a máquina de estados e dispara os comandos.

### Dual Coding Visual
| Modelo de Saga | Prós | Contras |
|---|---|---|
| **Coreografia (Event-Driven)** | Desacoplamento total, sem gargalo central | Rastreamento complexo de fluxo e dependências cíclicas |
| **Orquestração (Central Coordinator)** | Fluxo explícito, fácil auditoria e gestão de falhas | Ponto central de lógica e acoplamento com orchestrator |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo: Criação de Pedido em E-commerce (Saga Orquestrada)
1. \`Orchestrator\` chama \`OrderService.create()\` (Sucesso).
2. \`Orchestrator\` chama \`PaymentService.charge()\` (Sucesso).
3. \`Orchestrator\` chama \`InventoryService.reserve()\` (FALHA: Sem estoque).
4. \`Orchestrator\` executa compensação: chama \`PaymentService.refund()\` (Sucesso).
5. \`Orchestrator\` executa compensação: chama \`OrderService.cancel()\` (Sucesso).

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/distributed-transactions/SYS-DIST-TX-002.md', `---
id: SYS-DIST-TX-002
title: "Transactional Outbox Pattern e CDC para Publicação Confiável de Eventos"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::netflix
  - freq::high
---

## Pergunta
Como o Transactional Outbox Pattern resolve o problema de 'Dual-Write' garantindo que alterações no banco de dados e eventos no message broker sejam emitidos atomicamente?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema do Dual-Write**: Gravar no banco de dados e publicar no Kafka em operações separadas falha se a aplicação cair entre as duas ações (ou grava no DB sem publicar no Kafka, ou publica no Kafka sem commitar no DB).
- **Solução (Outbox Pattern)**:
  1. A aplicação grava o registro de negócio (ex: \`orders\`) e o evento a ser publicado em uma tabela \`outbox\` na **mesma transação ACID local do banco de dados**.
  2. Um processo independente (ou conector **Change Data Capture / CDC** como Debezium lendo o WAL do Postgres) lê as mensagens da tabela \`outbox\` e as envia confiavelmente ao broker (Kafka).
  3. Garante entrega *At-Least-Once* sem risco de inconsistência.

### Dual Coding Visual
| Etapa do Processo | Onde Ocorre | Garantia |
|---|---|---|
| **1. Transação Local** | DB da Aplicação (\`orders\` + \`outbox\`) | ACID (Tudo ou nada no banco) |
| **2. Leitura do Outbox** | Polling worker ou CDC (WAL) | Garante extração sem perda |
| **3. Publicação no Broker** | Envio ao Kafka / RabbitMQ | At-Least-Once delivery |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Esquema SQL Outbox
\`\`\`sql
BEGIN;

-- 1. Mutação de negócio
INSERT INTO orders (id, user_id, amount) VALUES ('ord-123', 'usr-456', 99.90);

-- 2. Registro do evento na mesma transação atômica
INSERT INTO outbox_events (id, aggregate_type, payload, created_at)
VALUES (gen_random_uuid(), 'ORDER_CREATED', '{"order_id": "ord-123", "amount": 99.90}', NOW());

COMMIT;
\`\`\`

</details>
`);

// ==========================================
// 6. sharding-consistent-hashing
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/sharding-consistent-hashing/SYS-DIST-SHARDING-000.md', `---
id: SYS-DIST-SHARDING-000
title: "Consistent Hashing e Anel Hash (Hash Ring)"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::amazon
  - freq::high
---

## Pergunta
Como o algoritmo de Consistent Hashing minimiza a realocação de chaves quando nós são adicionados ou removidos de um cluster de armazenamento distribuído?

## Resposta
### Quick Answer
**Solução Direta**:
- Em abordagens ingênuas com módulo $(\\text{hash}(key) \\pmod N)$, adicionar ou remover 1 nó faz com que quase **100% das chaves** sejam remapeadas para novos nós (*Cache Invalidation Storm*).
- **Consistent Hashing**:
  1. Mapeia tanto os servidores quanto as chaves em um espaço circular contínuo de endereçamento (**Hash Ring**, ex: $0$ a $2^{32}-1$).
  2. Para localizar o nó responsável por uma chave, calcula-se $\\text{hash}(key)$ e caminha-se no sentido horário pelo anel até encontrar o primeiro nó.
  3. Ao adicionar ou remover 1 servidor, apenas **$1/N$ das chaves** em média precisam ser migradas (apenas as chaves entre o novo nó e seu antecessor).

### Dual Coding Visual
| Estratégia de Hashing | Chaves Remapeadas ao Alterar Cluster | Impacto em Produção |
|---|---|---|
| **Hash Tradicional ($\\% N$)** | $\\approx \\frac{N-1}{N} \\approx 100\\%$ | Avalanche de requisições no DB primário |
| **Consistent Hashing** | $\\approx \\frac{1}{N}$ | Migração pontual e suave de dados |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Conceitual
- Se temos 4 nós ($A, B, C, D$) e adicionamos o nó $E$ entre $B$ e $C$:
  - Apenas as chaves que antes caíam em $C$ mas possuem hash anterior a $E$ são transferidas para $E$.
  - Todas as chaves pertencentes a $A, B$ e $D$ permanecem 100% inalteradas.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/sharding-consistent-hashing/SYS-DIST-SHARDING-001.md', `---
id: SYS-DIST-SHARDING-001
title: "Nós Virtuais (Virtual Nodes) para Distribuição Uniforme e Hotspots"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::discord
  - freq::high
---

## Pergunta
Por que a técnica de Nós Virtuais (Virtual Nodes / Vnodes) é essencial no Consistent Hashing para evitar desbalanceamento de carga (*Hotspots*)?

## Resposta
### Quick Answer
**Solução Direta**:
- Sem nós virtuais, uma quantidade pequena de servidores físicos pode se posicionar de forma não uniforme no anel hash, criando segmentos desproporcionalmente grandes onde um servidor recebe muito mais tráfego que os outros.
- **Nós Virtuais**: Cada servidor físico é mapeado para **múltiplos pontos discretos no anel** (ex: 100 a 300 réplicas virtuais por nó com hashes como \`hash("ServerA#1")\`, \`hash("ServerA#2")\`).
- **Benefícios**:
  - Distribuição estatisticamente uniforme de dados e tráfego.
  - Permite atribuir pesos diferentes para servidores heterogêneos (um servidor com o dobro de RAM/CPU recebe o dobro de vnodes).

### Dual Coding Visual
| Abordagem | Distribuição de Chaves | Tratamento de Hardware Heterogêneo |
|---|---|---|
| **1 Ponto Físico por Nó** | Altamente irregular (Risco de Hotspots) | Não suporta proporcionalidade |
| **100-300 Vnodes por Nó** | Distribuição quase perfeitamente gaussiana | Suporta pesos dinâmicos por capacidade |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Busca Binária no Hash Ring
\`\`\`go
package main

import (
  "crypto/sha256"
  "sort"
)

type HashRing struct {
  vnodes []uint32          // Hashes ordenados no anel
  nodes  map[uint32]string // Mapeamento vnode_hash -> physical_node_id
}

func (r *HashRing) GetNode(key string) string {
  if len(r.vnodes) == 0 { return "" }
  h := hash(key)
  // Busca binária pelo primeiro nó >= h no anel circular
  idx := sort.Search(len(r.vnodes), func(i int) bool {
    return r.vnodes[i] >= h
  })
  if idx == len(r.vnodes) { idx = 0 } // Wrap-around circular
  return r.nodes[r.vnodes[idx]]
}
\`\`\`

</details>
`);

// ==========================================
// 7. distributed-locking-coordination
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/distributed-locking-coordination/SYS-DIST-LOCK-000.md', `---
id: SYS-DIST-LOCK-000
title: "Distributed Lock com Redis (SETNX) e o Risco de Expirar por Timeout (GC Pause)"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::redis
  - freq::high
---

## Pergunta
Como implementar um Distributed Lock no Redis com comando atômico \`SET resource value NX PX milliseconds\` e por que pausas de Garbage Collection podem quebrar sua exclusão mútua?

## Resposta
### Quick Answer
**Solução Direta**:
- **Aquisição**: \`SET lock_key unique_token NX PX 10000\` (grava apenas se a chave não existir com expiração de 10s).
- **Liberação Segura**: Executar script Lua para validar que o \`unique_token\` ainda pertence ao chamador antes de deletar a chave.
- **Falha por GC Pause / Rede**:
  1. O Processo A adquire o lock com TTL de 10 segundos.
  2. O Processo A sofre uma pausa de GC (*Stop-the-World*) de 12 segundos.
  3. O Redis expira o lock por timeout.
  4. O Processo B adquire o mesmo lock legitimamente.
  5. O Processo A acorda da pausa de GC e prossegue achando que ainda detém o lock, executando mutações concorrentes com B (**Violação de Exclusão Mútua**).

### Dual Coding Visual
| Linha do Tempo | Estado dos Processos | Estado do Lock no Redis |
|---|---|---|
| **$t_0$** | Processo A adquire lock (TTL 10s) | Chave atribuída a A |
| **$t_1$** | Processo A entra em GC pause (12s) | Expira aos 10s no Redis |
| **$t_2$** | Processo B adquire lock livre | Chave atribuída a B |
| **$t_3$** | Processo A acorda e grava com B | Conflito e corrupção |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Script Lua de Liberação Atômica
\`\`\`text
if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1])
else
  return 0
end
\`\`\`

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/distributed-locking-coordination/SYS-DIST-LOCK-001.md', `---
id: SYS-DIST-LOCK-001
title: "Fencing Tokens para Proteção Absoluta de Recursos em Locks Distribuídos"
tags:
  - level::l5-senior
  - topic::sys::distributed
  - company::google
  - freq::high
---

## Pergunta
Como o mecanismo de Fencing Tokens (proposto por Martin Kleppmann) protege storages compartilhados contra clientes zumbis que perderam locks por timeout?

## Resposta
### Quick Answer
**Solução Direta**:
- Locks distribuídos baseados em timeout nunca podem garantir exclusão mútua perfeita por si só devido a atrasos imprevisíveis de rede e GC.
- **Mecanismo de Fencing Token**:
  1. O servidor de lock (ZooKeeper, etcd ou Redis) gera um número inteiro estritamente **monotônico crescente** a cada aquisição de lock (o *Fencing Token*, ex: 31, 32, 33).
  2. O cliente anexa esse token a toda operação de escrita enviada ao storage de destino.
  3. O storage de destino valida o token: ele rejeita qualquer requisição cujo token seja menor que o maior token já aceito anteriormente.
- Se o Cliente A acordar após timeout com token antigo (31) e tentar gravar, o storage rejeita porque já aceitou uma gravação do Cliente B com token mais recente (32).

### Dual Coding Visual
| Origem da Operação | Token Apresentado | Decisão do Storage |
|---|---|---|
| **Cliente 1** | Token = 31 | Aceito (Marca maior token = 31) |
| **Cliente 2** | Token = 32 | Aceito (Marca maior token = 32) |
| **Cliente 1 (Zumbi)** | Token = 31 | Rejeitado (Token 31 < 32) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Integração em Banco de Dados
- Em bancos relacionais, implementa-se com verificação condicional:
\`\`\`sql
UPDATE resource_table 
SET data = 'novo_valor', last_fencing_token = 32
WHERE id = 'res_1' AND last_fencing_token < 32;
\`\`\`

</details>
`);

// ==========================================
// 8. time-clocks-id-generation
// ==========================================

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/time-clocks-id-generation/SYS-DIST-TIME-000.md', `---
id: SYS-DIST-TIME-000
title: "Relógios Físicos (NTP Drift) vs Relógios Lógicos de Lamport e Vector Clocks"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::google
  - freq::high
---

## Pergunta
Por que relógios físicos de parede (Time of Day via NTP) são inadequados para ordenar eventos distribuídos e como relógios lógicos resolvem a causalidade?

## Resposta
### Quick Answer
**Solução Direta**:
- **Clock Drift e NTP**: Osciladores de quartzo em servidores sofrem desvios térmicos; sincronizações NTP podem adiantar ou atrasar bruscamente o relógio (*Clock Jumps* ou *Leap Seconds*), quebrando a ordem temporal entre servidores.
- **Relógios Lógicos de Lamport**:
  - Cada processo mantém um contador inteiro simples.
  - Ao executar um evento local, incrementa $C = C + 1$.
  - Ao enviar mensagem, envia $C$. O receptor atualiza seu relógio para $C_{local} = \\max(C_{local}, C_{msg}) + 1$.
  - Estabelece a relação causal **Happens-Before ($A \\rightarrow B$)**.
- **Vector Clocks**: Mantêm um vetor de inteiros por processo, permitindo detectar eventos concorrentes que causaram divergência (*Conflicting Writes*).

### Dual Coding Visual
| Tipo de Relógio | Garantia Oferecida | Limitação Principal |
|---|---|---|
| **Físico (NTP)** | Horário aproximado de parede | Sujeito a skew/drift de dezenas de milissegundos |
| **Lamport Clock** | Ordem causal parcial estrita | Não consegue diferenciar causalidade de concorrência |
| **Vector Clock** | Detecta causalidade e concorrência explícita | Tamanho do vetor cresce com o número de nós ($O(N)$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Prático de Vector Clock
- Se o Nó A tem estado $[A:2, B:1]$ e o Nó B tem estado $[A:1, B:2]$, nenhum domina o outro: o sistema detecta um **conflito concorrente** que exige resolução via aplicação ou CRDT.

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/time-clocks-id-generation/SYS-DIST-TIME-001.md', `---
id: SYS-DIST-TIME-001
title: "Gerador de IDs Únicos Twitter Snowflake de 64 Bits"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::twitter
  - freq::high
---

## Pergunta
Qual é a estrutura binária de 64 bits do algoritmo Twitter Snowflake e como ele gera IDs únicos e ordenáveis por tempo sem coordenação central?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Twitter Snowflake** gera inteiros de **64 bits** (compatíveis com \`BIGINT\` e inteiros padrão) com o seguinte layout de bits:
  1. **1 bit de sinal**: Sempre \`0\` (garante número positivo).
  2. **41 bits de Timestamp**: Milissegundos decorridos desde uma época customizada (permite ~69 anos de operação).
  3. **10 bits de Node ID / Machine ID**: 5 bits para Data Center ID + 5 bits para Worker ID (suporta até 1.024 instâncias geradoras simultâneas).
  4. **12 bits de Sequência**: Contador local incrementado a cada ID gerado no mesmo milissegundo (suporta até $4.096$ IDs por milissegundo por nó $\\approx 4.096.000$ IDs/segundo por nó).

### Dual Coding Visual
| Segmento do Snowflake ID | Quantidade de Bits | Capacidade / Propósito |
|---|---|---|
| **Sign Bit** | 1 bit | Sempre 0 (Valor positivo) |
| **Timestamp (ms)** | 41 bits | $2^{41} \\text{ ms} \\approx 69.7 \\text{ anos}$ de tempo útil |
| **Node ID (DC + Worker)** | 10 bits | Até 1.024 nós geradores independentes |
| **Contador de Sequência** | 12 bits | 4.096 IDs por milissegundo por máquina |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementação em Go
\`\`\`go
package main

import (
  "sync"
  "time"
)

type Snowflake struct {
  mu        sync.Mutex
  epoch     int64
  nodeID    int64
  sequence  int64
  lastTime  int64
}

func (s *Snowflake) Generate() int64 {
  s.mu.Lock()
  defer s.mu.Unlock()

  now := time.Now().UnixMilli()
  if now == s.lastTime {
    s.sequence = (s.sequence + 1) & 0xFFF // 12 bits max (4095)
    if s.sequence == 0 {
      for now <= s.lastTime { now = time.Now().UnixMilli() }
    }
  } else {
    s.sequence = 0
  }
  s.lastTime = now

  return ((now - s.epoch) << 22) | (s.nodeID << 12) | s.sequence
}
\`\`\`

</details>
`);

writeAndValidateCard('decks/03-system-design-backend/distributed-systems/time-clocks-id-generation/SYS-DIST-TIME-002.md', `---
id: SYS-DIST-TIME-002
title: "Google TrueTime API e Janela de Incerteza Bound [earliest, latest]"
tags:
  - level::l5-senior
  - topic::sys::distributed
  - company::google
  - freq::high
---

## Pergunta
Como a TrueTime API do Google Spanner utiliza relógios atômicos e GPS para fornecer uma janela de incerteza delimitada $[t_{earliest}, t_{latest}]$ e viabilizar Linearizabilidade global?

## Resposta
### Quick Answer
**Solução Direta**:
- Em vez de retornar um timestamp escalar pontual, a **TrueTime API** do Google retorna explicitamente um intervalo de tempo:
  $$\\text{TT.now}() = [t - \\epsilon, t + \\epsilon]$$
  onde $\\epsilon$ representa a **incerteza máxima** delimitada por hardware sincronizado via relógios atômicos e receptores GPS em cada data center ($\epsilon \\le 7 \\text{ ms}$).
- **Commit Wait Rule**: Para garantir que uma transação $T_2$ iniciada após $T_1$ receba um timestamp rigorosamente maior, o Spanner faz o coordenador da transação $T_1$ esperar voluntariamente $2\\epsilon$ antes de liberar o commit para clientes.
- Isso garante **Linearizabilidade global** estrita sem necessidade de comunicação cruzada entre continentes para verificar ordem temporal.

### Dual Coding Visual
| Mecanismo de Tempo | Tratamento de Incerteza | Garantia Oferecida |
|---|---|---|
| **NTP Convencional** | Ignora incerteza (assume relógio perfeito) | Não garante consistência temporal estrita |
| **TrueTime (Spanner)** | Retorna intervalo explícito $[t-\\epsilon, t+\\epsilon]$ com Commit Wait | Linearizabilidade global com timestamps físicos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Princípio do Commit Wait
- Se $T_1$ grava com timestamp $s = \\text{TT.now}().latest$, o Spanner aguarda até que $\\text{TT.now}().earliest > s$ antes de commitar.
- Assim, qualquer transação $T_2$ subsequente receberá garantidamente um timestamp $s_2 > s_1$.

</details>
`);

console.log('✅ Foundations & Distributed Systems cards successfully generated and validated!');
