import { writeAndValidateCard } from './decompose-helper.js';

console.log('--- Decompondo Observability & SRE ---');

// ==========================================
// 6. Capacity Planning & Chaos Engineering
// ==========================================

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/capacity-planning-chaos-engineering/BEH-SRE-CHAOS-000.md', `---
id: BEH-SRE-CHAOS-000
title: "Fundamentos de Capacity Planning e Dimensionamento de Headroom"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::netflix
  - freq::high
---

## Pergunta
O que é **Capacity Planning (Planejamento de Capacidade)** em infraestrutura de nuvem e engenharia backend?

## Resposta
### Quick Answer
**Solução Direta**:
- **Conceito**: Processo sistemático de estimar e provisionar recursos computacionais (CPU, memória RAM, IOPS de disco, throughput de rede) para garantir que a infraestrutura suporte a demanda futura com confiabilidade.
- **Headroom de Segurança**:
  - Prática padrão de manter entre **30% e 50% de capacidade excedente** (*headroom*) acima do pico esperado.
  - Permite absorver picos repentinos de tráfego, rebalanceamentos de cluster e quedas de zonas de disponibilidade (AZ failover) sem degradação de SLO.

### Dual Coding Visual
| Recurso Crítico | Métrica Monitorada | Risco de Subdimensionamento |
|---|---|---|
| **CPU / Threads** | % de utilização e Load Average | Enfileiramento e aumento de latência p99 |
| **Memória RAM** | RSS e Heap Usage | OOM Killer encerrando processos |
| **IOPS de Disco** | Fila de I/O e latência de leitura | Bloqueio de queries no banco de dados |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fórmula Básica de Estimativa de Capacidade
$$\\text{Capacidade Total Necessária} = \\text{Pico Esperado de QPS} \\times \\text{Custo por Requisição} \\times (1 + \\text{Headroom})$$

\`\`\`text
Exemplo:
- Pico Projetado: 10.000 QPS
- Capacidade por Container: 500 QPS
- Headroom Recomendado: 40%
-> Containers Necessários = (10.000 / 500) * 1.4 = 28 instâncias ativas
\`\`\`

#### Key Takeaways
- Planejamento de capacidade equilibra estabilidade e custos, evitando tanto o colapso do sistema por subdimensionamento quanto o desperdício orçamentário por superdimensionamento estático.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/capacity-planning-chaos-engineering/BEH-SRE-CHAOS-001.md', `---
id: BEH-SRE-CHAOS-001
title: "Princípios Fundamentais e Método Empírico do Chaos Engineering"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::netflix
  - freq::high
---

## Pergunta
O que são os **Princípios Fundamentais do Chaos Engineering** e o método empírico em 4 fases para validação de resiliência sistêmica?

## Resposta
### Quick Answer
**Solução Direta**:
- **Definição**: A disciplina de experimentar intencionalmente em sistemas distribuídos de produção para revelar vulnerabilidades e pontos únicos de falha antes que causem outages graves.
- **O Método Científico em 4 Fases**:
  1. **Definir Steady State**: Mensurar o comportamento normal do sistema através de métricas de negócio (ex: taxa de pedidos/segundo e latência p99).
  2. **Formular a Hipótese**: Prever que o Steady State se manterá estável mesmo após a injeção da falha.
  3. **Injetar Falha Controlada**: Simular eventos do mundo real (morte de pods, partições de rede, aumento de latência de I/O).
  4. **Refutar ou Confirmar a Hipótese**: Se o Steady State sofrer degradação não prevista, o experimento revelou uma vulnerabilidade arquitetural a ser corrigida.

### Dual Coding Visual
| Fase do Experimento | Ação Executada | Critério de Sucesso |
|---|---|---|
| **1. Steady State** | Medição de baseline | Métricas de negócio dentro do SLO |
| **2. Hipótese** | Previsão de auto-healing | Tolerância comprovada sem intervenção humana |
| **3. Injeção de Falha** | Chaos Monkey / Toxiproxy | Falha contida no blast radius previsto |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Ciclo de Experimentação do Chaos Engineering
\`\`\`text
┌─────────────────────────────────┐
│ 1. Medir Steady State Baseline  │
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 2. Formular Hipótese Científica │
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 3. Injetar Falha Controlada     │
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 4. Analisar Métricas & Corrigir │
└─────────────────────────────────┘
\`\`\`

#### Key Takeaways
- O objetivo do Chaos Engineering não é quebrar o sistema, mas demonstrar de forma empírica que ele possui mecanismos automáticos de recuperação diante de falhas inevitáveis.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/capacity-planning-chaos-engineering/BEH-SRE-CHAOS-002.md', `---
id: BEH-SRE-CHAOS-002
title: "Taxonomia de Testes de Carga: Load, Stress, Spike e Soak Tests com k6"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::netflix
  - freq::high
---

## Pergunta
Qual é a distinção prática e o propósito de cada tipo de **Teste de Carga (Load, Stress, Spike e Soak Tests)** com ferramentas como \`k6\`?

## Resposta
### Quick Answer
**Solução Direta**:
- **Taxonomia dos 4 Tipos de Teste**:
  - **Load Test (Carga Típica)**: Avalia o comportamento e latências sob o volume esperado de tráfego regular diário.
  - **Stress Test (Ponto de Ruptura)**: Aumenta o tráfego progressivamente além da capacidade nominal para identificar o elo mais fraco (banco, pool de threads, conexões HTTP).
  - **Spike Test (Picos Abruptos)**: Injeta um aumento massivo de tráfego repentino (ex: de $1\text{k} \to 25\text{k}$ QPS em segundos) para testar autoscaling e rate limiting.
  - **Soak / Endurance Test (Longa Duração)**: Mantém carga constante moderada por horas ou dias para detectar memory leaks e vazamentos de conexões.

### Dual Coding Visual
| Tipo de Teste | Curva de Tráfego | Objetivo Principal |
|---|---|---|
| **Load Test** | Carga estável no baseline | Validar conformidade de SLO |
| **Stress Test** | Rampa crescente contínua | Encontrar o ponto de saturação |
| **Spike Test** | Degrau súbito e íngreme | Validar resiliência a picos |
| **Soak Test** | Duração longa (24-48h) | Detectar vazamentos de memória |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Configuração com k6 (JavaScript)
\`\`\`javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 },  // Ramp-up
    { duration: '3m', target: 500 },  // Stress load
    { duration: '1m', target: 0 },    // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(99)<300'], // 99% das requisições < 300ms
    http_req_failed: ['rate<0.01'],    // Erros < 1%
  },
};

export default function () {
  const res = http.get('https://api.empresa.com/v1/health');
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}
\`\`\`

#### Key Takeaways
- Cada modalidade de teste de carga responde a uma pergunta diferente sobre a estabilidade do sistema, compondo uma esteira completa de validação pré-lançamento.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/capacity-planning-chaos-engineering/BEH-SRE-CHAOS-003.md', `---
id: BEH-SRE-CHAOS-003
title: "Métricas de Disaster Recovery: RPO (Perda de Dados) vs RTO (Tempo de Recuperação)"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::amazon
  - freq::high
---

## Pergunta
Como definir e contrastar as métricas de Disaster Recovery **RPO (Recovery Point Objective)** e **RTO (Recovery Time Objective)** em sistemas de produção?

## Resposta
### Quick Answer
**Solução Direta**:
- **RPO (Recovery Point Objective — Tolerância a Perda de Dados)**:
  - A janela máxima de dados transacionais que a empresa aceita perder em caso de catástrofe total.
  - *Exemplo*: RPO de 5 minutos significa que replicação e backups devem garantir que no máximo 5 minutos de dados sejam perdidos.
- **RTO (Recovery Time Objective — Tolerância a Tempo de Inatividade)**:
  - O tempo máximo aceitável para restaurar o sistema e retomar a operação normal após o incidente.
  - *Exemplo*: RTO de 30 minutos significa que o failover e inicialização devem durar no máximo meia hora.

### Dual Coding Visual
| Métrica | Pergunta Central Respondida | Mecanismo Arquitetural Envolvido |
|---|---|---|
| **RPO** | *"Quantos dados podemos perder?"* | Frequência de snapshots e replicação de logs |
| **RTO** | *"Quanto tempo podemos ficar fora do ar?"* | Automação de failover e orquestração de containers |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Linha do Tempo Visual de RTO e RPO
\`\`\`text
             Último Snapshot Válido           Incidente Ocorre             Serviço Normalizado
                       │                              │                             │
                       ├─────────── RPO ──────────────┼──────────── RTO ────────────┤
                       │       (Dados Perdidos)       │       (Downtime Total)      │
\`\`\`

#### Key Takeaways
- RPO próximo de zero exige replicação síncrona com custo de latência de escrita; RTO próximo de zero exige infraestrutura ativa-ativa multi-região automatizada.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/capacity-planning-chaos-engineering/BEH-SRE-CHAOS-004.md', `---
id: BEH-SRE-CHAOS-004
title: "Definição de Hipótese de Estado Estável (Steady State) em Chaos Engineering"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::netflix
  - freq::high
---

## Pergunta
Como definir a **Métrica de Estado Estável (Steady State)** e formular uma hipótese científica em experimentos de Chaos Engineering?

## Resposta
### Quick Answer
**Solução Direta**:
- **Métrica de Steady State**: Deve ser uma métrica de negócio observável em tempo real que reflita o funcionamento saudável do sistema (ex: *taxa de reprodução de vídeos iniciados por segundo*, *pedidos faturados com sucesso*, *taxa de erro global $< 0.05\%$*).
- **Formulação da Hipótese**: Deve descrever precisamente o comportamento de auto-recuperação esperado.
  - *Exemplo*: *"Se encerrarmos abruptamente a instância primária do banco de dados relacional, a réplica assumirá como primária em menos de 10 segundos sem interrupção de transações para o usuário final."*

### Dual Coding Visual
| Componente da Hipótese | Boa Definição (Científica) | Má Definição (Vaga) |
|---|---|---|
| **Steady State** | Pedidos completados/s com erro $< 0.1\%$ | *"O servidor parece rápido"* |
| **Falha Injetada** | Interrupção de 1 nó de Redis Sentinel | *"Testar falha no cache"* |
| **Previsão** | Failover automático em $< 3\text{s}$ | *"O sistema deve aguentar"* |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estrutura de Documento de Experimento de Caos
\`\`\`text
Experimento: Resiliência a Queda de Nó de Cache (Redis Sentinel)
├── Steady State: Latência de leitura de catálogo p99 < 50ms e taxa de acerto > 85%.
├── Hipótese: Com a queda do nó Master, a eleição Sentinel promoverá um nó Slave em < 3s,
│             com aumento transitório de latência p99 para no máximo 120ms por 5 segundos.
└── Execução: Matar processo Redis Master via Chaos Mesh.
\`\`\`

#### Key Takeaways
- Uma hipótese bem formulada permite validar objetivamente se a arquitetura atende às garantias de resiliência sem depender de impressões subjetivas.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/capacity-planning-chaos-engineering/BEH-SRE-CHAOS-005.md', `---
id: BEH-SRE-CHAOS-005
title: "Controle de Blast Radius e Mecanismos de Parada de Emergência em Chaos Testing"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::netflix
  - freq::high
---

## Pergunta
Como mitigar e limitar o **Raio de Explosão (Blast Radius)** ao executar testes de injeção de falhas controladas em ambientes de produção?

## Resposta
### Quick Answer
**Solução Direta**:
- **Estratégias de Contenção de Blast Radius**:
  1. **Evolução Gradual de Ambientes**: Executar o teste primeiro em staging, depois em canary/ambiente de pré-produção e, finalmente, em produção.
  2. **Segmentação Mínima de Instâncias**: Injetar a falha em apenas 1 pod ou em uma fração mínima de tráfego de usuários sintéticos (ex: 1%).
  3. **Botão de Parada de Emergência (Dead Man's Switch)**: Automação que aborta imediatamente a injeção de falha e executa rollback se o Error Budget do SLO atingir um limiar de alerta.

### Dual Coding Visual
| Mecanismo de Proteção | Função Técnica | Ação em Caso de Anomalia |
|---|---|---|
| **Canary Ingestion** | Limita falha a pequena % de tráfego | Isola impacto de usuários reais |
| **Dead Man's Switch** | Monitora violação de SLO em tempo real | Aborta o experimento instantaneamente |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fluxo de Segurança em Testes de Chaos em Produção
\`\`\`text
┌─────────────────────────────────┐
│ 1. Checa Saldo de Error Budget  │ ──► Se Budget < 20%: Aborta experimento!
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 2. Injeta Falha em 1% do Tráfego│
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 3. Monitora Steady State (Real) │ ──► Se Latência > Limiar: Rollback Imediato!
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 4. Conclusão Segura do Teste    │
└─────────────────────────────────┘
\`\`\`

#### Key Takeaways
- Chaos Engineering responsável opera com guardrails rigorosos de segurança que protegem a experiência dos clientes acima de tudo.

</details>
`);

// ==========================================
// 7. Incident Management & Post-Mortems
// ==========================================

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/incident-management-postmortems/BEH-SRE-INCIDENT-000.md', `---
id: BEH-SRE-INCIDENT-000
title: "Classificação de Níveis de Severidade de Incidentes (Sev-1 a Sev-4)"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::amazon
  - freq::high
---

## Pergunta
Como classificar os **Níveis de Severidade de Incidentes (Sev-1 a Sev-4)** em sistemas backend de produção?

## Resposta
### Quick Answer
**Solução Direta**:
- **Níveis Padronizados de Severidade**:
  - **Sev-1 (Crítico / Outage Total)**: Interrupção catastrófica com impacto financeiro direto ou bloqueio total de clientes essenciais (ex: *checkout de pagamentos fora do ar*). War Room 24/7 imediata.
  - **Sev-2 (Grave / Degradação Severa)**: Funcionalidade crítica com impacto substancial e sem contorno simples (ex: *busca de produtos falhando para 30% dos usuários*).
  - **Sev-3 (Moderado)**: Problema não bloqueante ou com impacto restrito a poucos usuários internos (ex: *dashboard de relatórios internos com atraso*).
  - **Sev-4 (Baixo)**: Bug cosmético, inconsistência menor de UI ou dúvida operacional sem impacto em faturamento.

### Dual Coding Visual
| Nível de Severidade | Impacto no Negócio | Mobilização de Resposta |
|---|---|---|
| **Sev-1** | Outage total e perda direta de receita | War Room 24/7 imediata com liderança |
| **Sev-2** | Degradação severa de funcionalidade core | Resposta imediata em horário de plantão |
| **Sev-3 / Sev-4** | Impacto baixo ou puramente cosmético | Tratamento em horário comercial normal |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Matriz de Decisão de Severidade
\`\`\`text
O problema bloqueia compras ou autenticação de clientes?
├── SIM ──► Sev-1 (Mobilização Imediata 24/7)
└── NÃO
    ├── Afeta grande volume de clientes com funcionalidade secundária?
    │   ├── SIM ──► Sev-2
    │   └── NÃO ──► Sev-3 / Sev-4 (Fila normal de bugs)
\`\`\`

#### Key Takeaways
- Uma taxonomia clara de severidade alinha expectativas de resposta, evitando falso alarme em problemas menores e garantindo mobilização instantânea em crises reais.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/incident-management-postmortems/BEH-SRE-INCIDENT-001.md', `---
id: BEH-SRE-INCIDENT-001
title: "Estrutura e Seções Obrigatórias de um Post-Mortem SRE"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Quais são os elementos e seções essenciais de um documento de **Post-Mortem Sem Culpa (Blameless Post-Mortem)** no padrão Google SRE?

## Resposta
### Quick Answer
**Solução Direta**:
- **Seções Fundamentais do Post-Mortem**:
  1. **Executive Summary & Impacto**: Resumo executivo, tempo total de downtime e métricas financeiras ou de SLO violadas.
  2. **Timeline Detalhada em UTC**: Linha do tempo minuto a minuto cobrindo detecção, escalada, mitigação e resolução.
  3. **Root Cause Analysis (RCA) com 5 Whys**: Análise aprofundada da falha estrutural subjacente.
  4. **Lessons Learned**: O que funcionou bem, o que deu errado e onde o time teve sorte.
  5. **Action Items SMART (P0/P1)**: Tarefas com donos nominais e prazos para eliminar a possibilidade de reincidência.

### Dual Coding Visual
| Seção | Finalidade Principal | Exemplo de Conteúdo |
|---|---|---|
| **Impacto no Negócio** | Quantificar o dano real | *$35k em pedidos afetados, 28 minutos de queda* |
| **Timeline (UTC)** | Avaliar eficiência de resposta | *14:02 Alerta $\to$ 14:08 War Room $\to$ 14:15 Rollback* |
| **Action Items** | Prevenir novas falhas | *Adicionar timeout de 2s e Circuit Breaker no cliente* |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Estrutura de Documento
\`\`\`text
# Incident Post-Mortem: Queda no Serviço de Autenticação [2026-08-18]
- **Duração**: 22 minutos (11:00 às 11:22 UTC)
- **Impacto**: 5.400 tentativas de login rejeitadas (HTTP 500).
- **Causa Raiz**: Certificado TLS expirado em um dos pods de federação.
- **Action Items**:
  - [P0] Automatizar rotação de certificados via Cert-Manager (@alice, 2 dias).
  - [P1] Criar alerta de expiração de certificados com 30 dias de antecedência (@bob, 5 dias).
\`\`\`

#### Key Takeaways
- O Post-Mortem é um investimento institucional em confiabilidade que assegura a evolução contínua da arquitetura sociotécnica da organização.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/incident-management-postmortems/BEH-SRE-INCIDENT-002.md', `---
id: BEH-SRE-INCIDENT-002
title: "Papéis e Responsabilidades no War Room: Incident Commander, Ops Lead e Comms Lead"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::amazon
  - freq::high
---

## Pergunta
Quais são as responsabilidades específicas dos papéis de **Incident Commander (IC)**, **Operations Lead** e **Communications Lead** em um War Room de crise?

## Resposta
### Quick Answer
**Solução Direta**:
- **Incident Commander (IC)**:
  - Comanda a sala de crise, mantém a calma, delega tarefas técnicas e toma decisões estratégicas (ex: autorizar rollback).
  - **Regra de Ouro**: O IC **não programa ou executa comandos diretamente** para não perder a visão macro do incidente.
- **Operations / Tech Lead**:
  - Engenheiro sênior responsável por diagnosticar o sistema, analisar traces e executar ações de mitigação aprovadas pelo IC.
- **Communications Lead**:
  - Atualiza a Status Page externa, gerentes de produto e times de suporte, blindando os engenheiros operacionais de interrupções.

### Dual Coding Visual
| Papel no War Room | Responsabilidade Principal | O que NUNCA Deve Fazer |
|---|---|---|
| **Incident Commander** | Orquestrar time e definir prioridades | Não codar ou rodar comandos na hora |
| **Operations Lead** | Diagnóstico técnico e mitigação | Não responder stakeholders externos |
| **Communications Lead** | Atualizar Status Page e suporte | Não alterar infraestrutura |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Dinâmica de Comunicação em Crise
\`\`\`text
Stakeholders Externos ◄─── Comms Lead ◄───┐
                                          │
Incident Commander (Comando Estratégico) ─┴─► Operations Lead (Execução Técnica)
\`\`\`

#### Key Takeaways
- A divisão clara de papéis em momentos de crise evita confusão, reduz ruídos de comunicação e diminui drasticamente o MTTR.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/incident-management-postmortems/BEH-SRE-INCIDENT-003.md', `---
id: BEH-SRE-INCIDENT-003
title: "O Princípio de Mitigação Imediata sobre Investigação durante Outages de Produção"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::amazon
  - freq::high
---

## Pergunta
Por que o princípio de **"Mitigação Imediata $\gg$ Investigação de Causa-Raiz (First, Stop the Bleeding)"** é a regra de ouro durante um outage ativo?

## Resposta
### Quick Answer
**Solução Direta**:
- **Foco em Estancar o Sangramento**: Durante a crise ativa, a única missão da equipe é restaurar o serviço para os usuários com a máxima velocidade (via rollback de versão, traffic shedding, scale-up forçado ou desligamento de feature flags).
- **Proibição de Depuração Profunda na Crise**: Tentar descobrir exatamente qual linha de código gerou o bug enquanto os clientes estão sem acesso atrasa a recuperação e eleva os prejuízos de negócio.
- **Separação de Fases**: A investigação meticulosa da causa raiz pertence exclusivamente à etapa posterior de Post-Mortem.

### Dual Coding Visual
| Fase do Incidente | Prioridade Absoluta | Ação Típica |
|---|---|---|
| **Durante o Outage** | Mitigação rápida e restabelecimento | Rollback de versão, restart ou corte de tráfego |
| **Pós-Incidente** | Investigação detalhada e causa-raiz | Análise de logs, 5 Whys e escrita de Post-Mortem |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Mitigação Imediata
\`\`\`text
Cenário: Novo deploy causou 15% de erro 500 no checkout.
├── Decisão Errada: Abrir IDE e tentar debugar a query SQL ao vivo em produção.
└── Decisão Correta: Executar rollback imediato para a versão anterior em 2 minutos.
    └── Serviço volta a 100% -> time investiga a causa raiz tranquilamente em staging.
\`\`\`

#### Key Takeaways
- Priorizar a mitigação imediata protege os clientes e os negócios da empresa, adiando a curiosidade diagnóstica para um ambiente seguro.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/incident-management-postmortems/BEH-SRE-INCIDENT-004.md', `---
id: BEH-SRE-INCIDENT-004
title: "Condução Prática da Análise 5 Whys em Incidentes Críticos de Infraestrutura"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Como conduzir a técnica dos **5 Whys** em incidentes de infraestrutura para rastrear a causa-raiz sistêmica subjacente?

## Resposta
### Quick Answer
**Solução Direta**:
- **Condução Passo a Passo dos 5 Porquês**:
  - *1º Por quê*: Qual foi a falha imediata? (Ex: *O pod de pagamento encerrou por OOM*).
  - *2º Por quê*: Por que faltou memória? (Ex: *Uma resposta JSON gigante de 50MB foi desserializada em memória*).
  - *3º Por quê*: Por que a resposta foi tão grande? (Ex: *A query do banco retornou todos os registros sem paginação*).
  - *4º Por quê*: Por que não havia paginação? (Ex: *A API legada não tinha limite máximo de tamanho de página imposto*).
  - *5º Por quê (Causa Raiz)*: Por que isso foi aceito em produção? (Ex: *Não havia linter ou contrato de schema OpenAPI validando limites de payload no CI*).

### Dual Coding Visual
| Nível do Porquê | Resposta Identificada | Categoria de Falha |
|---|---|---|
| **1-2** | OOM e payload gigante | Sintoma operacional e consumo de recursos |
| **3-4** | Query sem paginação | Falha de implementação no código |
| **5 (Raiz)** | Ausência de linter de API no CI | **Falha de Governança e Processo** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Ação Corretiva Derivada do 5º Porquê
\`\`\`text
Causa Raiz: Ausência de limite obrigatório de paginação em contratos de API.
├── Ação Preventiva 1: Adicionar middleware global impondo max_limit=100 em todas as APIs.
└── Ação Preventiva 2: Adicionar teste automatizado no CI rejeitando endpoints sem paginação.
\`\`\`

#### Key Takeaways
- A análise dos 5 Whys garante que o time ataque as raízes institucionais e processuais dos problemas, evitando soluções paliativas.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/observability-sre/incident-management-postmortems/BEH-SRE-INCIDENT-005.md', `---
id: BEH-SRE-INCIDENT-005
title: "Estruturação de Planos de Ação Preventiva (CAPA) com Donos e Prazos Estritos"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Como estruturar **Action Items (Corrective and Preventive Actions - CAPA)** eficazes pós-incidente com donos nominais e prazos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Requisitos de Eficácia de um Plano CAPA**:
  1. **Ações Corretivas (Imediatas)**: Corrigir os dados corrompidos ou ajustar a configuração defeituosa no ambiente.
  2. **Ações Preventivas (Sistêmicas)**: Alterações de código, testes de regressão e automações de CI que tornem o erro estruturalmente impossível de se repetir.
  3. **Responsabilidade Nominal Única**: Cada ação deve possuir exatamente 1 engenheiro responsável (evitar "time de backend" ou "infra").
  4. **Prazos Estritos e Acompanhamento**: Ações P0 devem ser finalizadas em até 3 dias úteis e revisadas em fórum de engenharia.

### Dual Coding Visual
| Tipo de Ação | Propósito Principal | Exemplo Concreto |
|---|---|---|
| **Corretiva (Fix)** | Reparar o dano imediato | Restaurar dados de backup da tabela afetada |
| **Preventiva (CAPA)** | Eliminar a causa estrutural | Implementar validação de schema e testes no CI |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Matriz CAPA em Post-Mortem
\`\`\`text
Action Items:
├── [P0] [Preventiva] Implementar soft-delete e proibir comandos DROP no banco (@carlos, 2 dias).
├── [P0] [Preventiva] Adicionar verificação de expiração de certificados TLS no CI (@alice, 3 dias).
└── [P1] [Observabilidade] Adicionar dashboard com alerta de taxa de erro 5xx (@bob, 1 semana).
\`\`\`

#### Key Takeaways
- Planos de ação sem donos nominais e prazos definidos caem no esquecimento. A disciplina na execução das ações preventivas é a base da confiabilidade em escala.

</details>
`);

console.log('✅ Observability & SRE (Parte 1) concluído com sucesso!');
