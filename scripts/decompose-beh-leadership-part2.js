import { writeAndValidateCard } from './decompose-helper.js';

console.log('--- Decompondo Behavioral Cultures, Failure & STAR ---');

// ==========================================
// 3. FAANG Company Cultures
// ==========================================

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/faang-company-cultures/BEH-LEAD-CULTURE-000.md', `---
id: BEH-LEAD-CULTURE-000
title: "Culturas FAANG: Googliness e Consenso no Google vs Move Fast na Meta"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::faang
  - freq::high
---

## Pergunta
Quais são os pilares culturais distintivos do **Google ("Googliness" & Rigor Analítico)** e da **Meta ("Move Fast" & Impacto Bottom-Up)** para engenheiros de software?

## Resposta
### Quick Answer
**Solução Direta**:
- **Google ("Googliness" & Rigor Científico)**:
  - Foco em escala global massiva, decisões estritamente baseadas em dados estatísticos, construção de consenso entre times, humildade intelectual e tratamento de edge cases complexos.
  - *Expectativa*: Soluções sustentáveis de longo prazo com alta colaboração e documentação aberta.
- **Meta ("Move Fast" & Impacto de Produto)**:
  - Foco em velocidade de iteração, autonomia individual radical (*bottom-up culture*), tolerância ao risco calculado e foco direto em métricas de engajamento do usuário.
  - *Expectativa*: Capacidade de prototipar em dias, lançar testes A/B rápidos e eliminar burocracias desnecessárias.

### Dual Coding Visual
| Big Tech | Arquétipo Cultural | Perfil de Engenheiro Valorizado |
|---|---|---|
| **Google** | Rigor Analítico & Googliness | Foco em escala, cooperação e decisões por dados |
| **Meta** | Move Fast & Impacto no Produto | Velocidade de iteração, autonomia e foco em métricas |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Comparação de Abordagem para um Novo Recurso
\`\`\`text
Cenário: "Lançamento de algoritmo de recomendação de conteúdo."
├── No Google: Elaboração de Design Doc formal, análise estatística de viabilidade e consenso.
└── Na Meta: Criação de MVP em 48h, teste A/B com 5% dos usuários e iteração baseada em métricas.
\`\`\`

#### Key Takeaways
- Entender as nuances entre o rigor consensual do Google e a agilidade orientada a impacto da Meta é essencial para alinhar a narrativa de carreira durante entrevistas comportamentais.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/faang-company-cultures/BEH-LEAD-CULTURE-001.md', `---
id: BEH-LEAD-CULTURE-001
title: "Critérios de Avaliação de Googliness & Leadership em Entrevistas do Google"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
O que os entrevistadores do **Google** avaliam sob o critério de **"Googliness & Leadership"** em rodadas comportamentais?

## Resposta
### Quick Answer
**Solução Direta**:
- **Pilares de Avaliação de Googliness**:
  1. **Humildade Intelectual**: Capacidade de reconhecer erros abertamente, mudar de ideia quando confrontado com dados melhores e ouvir opiniões divergentes.
  2. **Navegação em Ambiguidades**: Capacidade de avançar em projetos complexos sem requisitos perfeitamente definidos, criando clareza para o time.
  3. **Colaboração e Inclusão**: Valorizar perspectivas diversas e priorizar o sucesso coletivo em vez de conquistas individuais isoladas.
  4. **Fazer a Coisa Certa**: Preocupação genuína com a privacidade do usuário, segurança da informação e integridade dos sistemas.

### Dual Coding Visual
| Aspecto Avaliado | Demonstração Positiva | Anti-Pattern no Google |
|---|---|---|
| **Decisões Técnicas** | Baseadas em métricas e experimentos | Arrogância ou defesa de achismos |
| **Trabalho em Equipe** | Mentoria, escuta ativa e empatia | Postura competitiva e isolamento |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Demonstração de Googliness
\`\`\`text
Situação: "Havia duas propostas de arquitetura para a camada de busca."
├── Ação: Em vez de impor minha ideia, estruturei uma sessão de pareamento técnico,
│         implementamos benchmarks comparativos e decidimos juntos pelos dados.
└── Resultado: O time adotou a solução com entusiasmo e sem atrito interpessoal.
\`\`\`

#### Key Takeaways
- "Googliness" não significa ser bonzinho, mas ser uma pessoa com quem outros engenheiros de classe mundial têm orgulho e satisfação de trabalhar diariamente.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/faang-company-cultures/BEH-LEAD-CULTURE-002.md', `---
id: BEH-LEAD-CULTURE-002
title: "Culturas FAANG: Freedom & Responsibility na Netflix vs Modelo DRI na Apple"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::faang
  - freq::high
---

## Pergunta
Quais são os pilares culturais distintivos da **Netflix ("Freedom & Responsibility")** e da **Apple ("Directly Responsible Individual - DRI")**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Netflix ("Freedom & Responsibility" & "Context, Not Control")**:
  - Alta densidade de talento sênior com autonomia executiva irrestrita. Líderes fornecem contexto estratégico em vez de aprovações em cascata (*Keeper Test*).
  - *Expectativa*: Engenheiros tomam decisões complexas de forma independente e assumem plena responsabilidade pelos resultados.
- **Apple ("Directly Responsible Individual - DRI" & Excelência)**:
  - Sigilo rigoroso, foco obsessivo no produto e no acabamento para o usuário final, com um DRI claramente identificado para cada funcionalidade ou componente.
  - *Expectativa*: Responsabilidade individual indiscutível e perfeccionismo na execução técnica.

### Dual Coding Visual
| Empresa | Filosofia Central | Mecanismo de Governança |
|---|---|---|
| **Netflix** | Freedom & Responsibility | Contexto em vez de controle (*Context, Not Control*) |
| **Apple** | Foco Obsessivo no Produto | Dono direto e responsável (*Directly Responsible Individual*) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Comparação de Estrutura de Liderança
\`\`\`text
Modelo Netflix:
└── Líder compartilha metas do negócio ➔ Engenheiro decide arquitetura autonomamente.

Modelo Apple:
└── DRI lidera o módulo ➔ Coordena decisões com foco estrito na experiência do usuário.
\`\`\`

#### Key Takeaways
- Tanto a Netflix quanto a Apple confiam imensa responsabilidade a engenheiros seniores, variando entre a autonomia descentralizada e o foco focado de liderança por DRI.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/faang-company-cultures/BEH-LEAD-CULTURE-003.md', `---
id: BEH-LEAD-CULTURE-003
title: "Calibração Cultural: Adaptação de um Mesmo Projeto para Arquétipos Big Tech"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::faang
  - freq::high
---

## Pergunta
Como calibrar o ângulo de uma mesma narrativa de projeto técnico para atender aos arquétipos culturais de diferentes Big Techs?

## Resposta
### Quick Answer
**Solução Direta**:
- **O Mesmo Projeto sob 3 Lentes Distintas**:
  - **Para o Google**: Enfatize o rigor estatístico, testes A/B de significância, escalabilidade global e colaboração entre múltiplos times.
  - **Para a Meta**: Destaque a velocidade de entrega do MVP (ex: lançamento em 2 semanas), a remoção de burocracias e o impacto direto nas métricas de conversão e engajamento.
  - **Para a Netflix**: Destaque como você assumiu a liderança autônoma com base no contexto do negócio, tomando decisões arquiteturais sem requerer microgerenciamento.

### Dual Coding Visual
| Empresa | Ângulo de Destaque da História | Métrica Principal a Enfatizar |
|---|---|---|
| **Google** | Rigor estatístico e escala distribuída | Latência p99 e confiabilidade multi-região |
| **Meta** | Velocidade de execução e impacto | % de conversão e throughput de features |
| **Netflix** | Autonomia estratégica e julgamento maduro | Trade-offs de arquitetura e mitigação de risco |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Prático: Refatoração de Cache
\`\`\`text
1. Versão Meta: "Identifiquei 5% de falhas, subi o cache em 48h com A/B test e salvamos $40k/dia."
2. Versão Google: "Analisei a distribuição p99, escrevi Design Doc de consistência e validei com 4 times."
3. Versão Netflix: "Com base no contexto de SLO de streaming, liderei a troca do storage sem supervisão."
\`\`\`

#### Key Takeaways
- Ajustar a ênfase da sua experiência para a cultura da empresa demonstra inteligência estratégica e facilidade de integração no novo ambiente.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/faang-company-cultures/BEH-LEAD-CULTURE-004.md', `---
id: BEH-LEAD-CULTURE-004
title: "Critérios de Avaliação de Engineering Impact & Move Fast na Meta"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::meta
  - freq::high
---

## Pergunta
O que os entrevistadores da **Meta** buscam no critério de **"Engineering Impact & Move Fast"**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Critérios Centrais da Meta**:
  1. **Impacto Mensurável de Produto**: Foco em como o seu código alterou métricas concretas (usuários ativos, conversão, latência de renderização, custo de servidores).
  2. **Mentalidade Scrappy e Pragmática**: Preferir soluções simples e eficazes que funcionam hoje a arquiteturas hiper-complexas que demoram meses para sair do papel.
  3. **Remoção de Bloqueios**: Atitude ativa de desbloquear dependências técnicas sem aguardar instruções formais de superiores.
  4. **Iteração Contínua**: Lançar versões incrementais com validação via testes A/B.

### Dual Coding Visual
| Comportamento na Meta | O que Fazer | Anti-Pattern a Evitar |
|---|---|---|
| **Velocidade & Impacto** | Lançar MVP rápido e medir resultados | Perfeccionismo paralisante e atrasos |
| **Autonomia** | Resolver bloqueios proativamente | Aguardar ordens de gerência |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Impacto Comprovado na Meta
\`\`\`text
Problema: "Tempo de carregamento de fotos no feed estava em 1.8s no 4G."
├── Ação: Criei pipeline de compressão WebP adaptativa em 4 dias e lancei em A/B test para 10%.
└── Resultado: Tempo de carregamento caiu para 400ms e o engajamento aumentou em 3.2%.
\`\`\`

#### Key Takeaways
- Na Meta, engenheiros bem avaliados são orientados a resultados pragmáticos e não têm receio de simplificar escopos para entregar valor rápido ao usuário.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/faang-company-cultures/BEH-LEAD-CULTURE-005.md', `---
id: BEH-LEAD-CULTURE-005
title: "Critérios de Avaliação de Context, Not Control na Netflix"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::netflix
  - freq::high
---

## Pergunta
O que os entrevistadores da **Netflix** exigem sob a filosofia de **"Context, Not Control & Freedom with Responsibility"**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Princípios Avaliados na Netflix**:
  1. **Julgamento Maduro**: Capacidade de tomar decisões técnicas críticas avaliando riscos de negócio de forma autônoma.
  2. **Transparência Radical**: Compartilhar abertamente falhas, lições aprendidas e contexto técnico com todos os níveis da organização.
  3. **Trabalho sem Comitês de Aprovação**: Demonstrar que você não depende de cadeias hierárquicas burocráticas para avançar com projetos de infraestrutura.
  4. **Foco em Confiabilidade e Negócio**: Alinhar decisões de engenharia diretamente à retenção e satisfação dos assinantes.

### Dual Coding Visual
| Abordagem Tradicional | Filosofia Netflix | Benefício Organizacional |
|---|---|---|
| Aprovações em múltiplos níveis | Contexto claro compartilhado | Decisões rápidas por quem está no código |
| Processos rígidos e burocracia | Liberdade com responsabilidade | Inovação contínua e alta densidade de talento |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Decisão Baseada em Contexto
\`\`\`text
Contexto Estratégico da Netflix: "Expansão para novos países com redes móveis instáveis."
├── Decisão Autônoma do Engenheiro: Implementar algoritmo de bitrate adaptativo dinâmico no player.
└── Responsabilidade: Monitorar taxa de buffering globalmente e ajustar parâmetros em tempo real.
\`\`\`

#### Key Takeaways
- A Netflix busca profissionais seniores que prosperam em ambientes de alta liberdade e que respondem com responsabilidade exemplar diante de desafios complexos.

</details>
`);

// ==========================================
// 4. Failure, Learning & Retrospectives
// ==========================================

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/failure-learning-retrospectives/BEH-LEAD-FAILURE-000.md', `---
id: BEH-LEAD-FAILURE-000
title: "Cultura de Blameless Post-Mortem no Modelo Google SRE"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
O que é o princípio de **Blameless Post-Mortem (Pós-Morte sem Culpa)** na cultura Google SRE e por que culpar indivíduos prejudica a confiabilidade dos sistemas?

## Resposta
### Quick Answer
**Solução Direta**:
- **Premissa Sistêmica Fundamental**: Seres humanos cometem erros involuntários. Se um engenheiro conseguiu derrubar a produção com um comando ou commit, a causa raiz **não é a pessoa**, mas sim uma **lacuna no sistema, processos, testes ou automações** que permitiu tal ação.
- **Danos da Cultura de Culpa**: Punir pessoas gera medo, encobrimento de incidentes e lentidão operacional.
- **Benefícios da Abordagem Sem Culpa**: Incentiva a transparência imediata, colaboração psicológica segura e criação de defesas sistêmicas duradouras contra reincidências.

### Dual Coding Visual
| Abordagem Punitiva | Abordagem Blameless SRE | Consequência no Sistema |
|---|---|---|
| *"Quem executou o comando errado?"* | *"Qual guardrail faltou para impedir o comando?"* | Eliminação da causa estrutural |
| Advertência individual | Testes automatizados e rollbacks | Redução contínua do MTTR |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Postura SRE Diante de Falhas Humanas
\`\`\`text
Incidente: Engenheiro apagou tabela de produção por engano.
├── Reação Punitiva (Errada): Demitir o engenheiro (o sistema continua vulnerável).
└── Reação Blameless SRE (Correta):
    ├── Remover permissão de DROP direta no banco de produção.
    ├── Implementar soft-delete e backup com PITR (Point-in-Time Recovery).
    └── Adicionar confirmação em duas etapas na CLI de administração.
\`\`\`

#### Key Takeaways
- Um sistema verdadeiramente confiável é resiliente a erros humanos normais através de guardrails de arquitetura e automações de proteção.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/failure-learning-retrospectives/BEH-LEAD-FAILURE-001.md', `---
id: BEH-LEAD-FAILURE-001
title: "Estrutura Formal de um Documento de Incident Post-Mortem / RCA SRE"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Quais são as seções estruturais obrigatórias de um documento formal de **Incident Post-Mortem / RCA** no padrão Google SRE?

## Resposta
### Quick Answer
**Solução Direta**:
- **Seções Obrigatórias do Documento**:
  1. **Sumário Executivo & Métricas de Impacto**: Duração do outage, % de requisições afetadas, faturamento perdido e impacto no Error Budget do SLO.
  2. **Timeline Detalhada (UTC)**: Linha cronológica minuto a minuto da detecção, triagem, mitigação e resolução final.
  3. **Causa-Raiz vs Fatores Contribuintes**: Distinção entre o gatilho imediato (*trigger*) e a vulnerabilidade estrutural de fundo.
  4. **O que Funcionou Bem vs O que Falhou**: Avaliação do monitoramento e resposta da equipe.
  5. **Action Items SMART (P0/P1)**: Tarefas com donos nominais e prazos estritos para prevenção de reincidência.

### Dual Coding Visual
| Seção do Post-Mortem | Finalidade | Exemplo de Conteúdo |
|---|---|---|
| **Impacto no SLO** | Mensurar o prejuízo real | *"Disponibilidade caiu para 98.4% por 25 min"* |
| **Timeline (UTC)** | Identificar atrasos de resposta | *"14:02 Alerta disparou $\to$ 14:15 Rollback concluído"* |
| **Action Items** | Evitar repetição do erro | *"[P0] Adicionar Circuit Breaker (Dono: Alice, 3 dias)"* |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Modelo de Post-Mortem em Markdown
\`\`\`text
# Post-Mortem: Indisponibilidade no Gateway de Pagamentos [2026-08-18]
- Impacto: 12.000 transações afetadas (HTTP 504) durante 20 minutos.
- Timeline: 10:00 Deploy v2.1 ➔ 10:03 Alerta ➔ 10:12 Rollback ➔ 10:20 Estabilizado.
- Causa Raiz: Timeout HTTP do parceiro adquirente configurado para 60s em vez de 2s.
- Action Items: [P0] Reduzir timeout para 2000ms com Circuit Breaker (@carlos, 2 dias).
\`\`\`

#### Key Takeaways
- O documento de Post-Mortem é uma ferramenta de aprendizado e governança técnica que transforma incidentes em blindagem para toda a organização.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/failure-learning-retrospectives/BEH-LEAD-FAILURE-002.md', `---
id: BEH-LEAD-FAILURE-002
title: "Aplicação da Técnica dos 5 Porquês (5 Whys) para Identificação de Causas-Raiz Sistêmicas"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Como aplicar a técnica dos **5 Porquês (5 Whys)** para rastrear a causa-raiz sistêmica de um incidente de produção além de falhas superficiais?

## Resposta
### Quick Answer
**Solução Direta**:
- **Conceito dos 5 Whys**: Consiste em aprofundar recursivamente a pergunta *"Por que isso aconteceu?"* para ultrapassar o sintoma superficial e revelar a deficiência estrutural em processos, testes ou arquitetura.
- **Passo a Passo da Cadeia Causal**:
  - 1º Por quê: Identifica a falha imediata no software.
  - 2º e 3º Por quês: Identificam a mecânica técnica do erro.
  - 4º e 5º Por quês: Identificam a ausência de testes, guardrails ou processos de governança que permitiram o bug chegar à produção.

### Dual Coding Visual
| Nível do "Por quê?" | Análise do Incidente | Camada de Causalidade |
|---|---|---|
| **1. Por que caiu?** | Pool de conexões do banco esgotou | Sintoma operacional imediato |
| **3. Por que esgotou?** | Query pesada sem índice executou Full Scan | Causa técnica direta |
| **5. Por que foi a prod?** | Ausência de linter de migrações no CI/CD | **Causa-Raiz Sistêmica** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Completo de Análise 5 Whys
\`\`\`text
Incidente: O banco de produção atingiu 100% de CPU e travou por 15 minutos.
├── 1. Por que? O pool de conexões do PostgreSQL esgotou.
├── 2. Por que? Uma query de relatórios levou 45 segundos para responder.
├── 3. Por que? A query fazia full scan na tabela de 80 milhões de usuários.
├── 4. Por que? A migração que criava o índice composto não foi executada no deploy.
└── 5. Por que (Causa Raiz)? O deploy de migrations era um script manual sem validação no CI.
    └── Ação Preventiva Definitiva: Integrar ferramenta automatizada de migrações na esteira de CI/CD.
\`\`\`

#### Key Takeaways
- A técnica dos 5 Whys evita correções superficiais que apenas mascaram o problema e conduz a automações de qualidade que blindam a arquitetura.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/failure-learning-retrospectives/BEH-LEAD-FAILURE-003.md', `---
id: BEH-LEAD-FAILURE-003
title: "Estruturação de Resposta para 'Fale Sobre uma Falha Grave' em Entrevistas"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Como estruturar uma resposta de alto impacto para a pergunta de entrevista *"Fale sobre uma falha técnica grave que você cometeu"*?

## Resposta
### Quick Answer
**Solução Direta**:
- **Os 4 Componentes de uma Resposta de Alto Impacto**:
  1. **Escolha de um Erro Real e Relevante**: Evite respostas clichês (ex: *"meu erro é ser perfeccionista"*). Escolha um erro técnico real em que você tenha sido protagonista.
  2. **Assumir Total Responsabilidade (Ownership)**: Sem transferir culpa para terceiros ou sistemas legados.
  3. **Ação Imediata de Mitigação**: Demonstrar calma e velocidade para estancar o sangramento em minutos (rollback, alerta, contenção).
  4. **Prevenção Sistêmica Definitiva**: Explicar os testes automatizados, guardrails e processos implementados para garantir que o erro nunca mais se repita.

### Dual Coding Visual
| Etapa da Resposta | Postura Esperada | O que Evitar |
|---|---|---|
| **Apresentação do Erro** | Transparência e assunção de autoria | Culpar colegas ou infraestrutura |
| **Mitigação & Resolução** | Foco em velocidade e foco no cliente | Paralisia ou tentativa de ocultar |
| **Lições Aprendidas** | Criação de guardrails e testes no CI | Dizer apenas que "ficou mais atento" |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo no Modelo STAR
\`\`\`text
[S] "No deploy de uma nova tabela, esqueci de adicionar timeout na conexão com o banco."
[T] "O tráfego de pico saturou as threads do servidor e causou erro 504 no checkout."
[A] "Assumi o incidente, fiz o rollback em 4 minutos e restabeleci o serviço. Em seguida,
     configurei timeout padrão na biblioteca de banco e adicionei teste de carga no CI."
[R] "O sistema suportou a Black Friday com zero outages e o teste evitou 3 bugs semelhantes."
\`\`\`

#### Key Takeaways
- Entrevistadores utilizam perguntas sobre erros para avaliar maturidade emocional, humildade intelectual e a capacidade do candidato de transformar falhas em melhorias estruturais.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/failure-learning-retrospectives/BEH-LEAD-FAILURE-004.md', `---
id: BEH-LEAD-FAILURE-004
title: "Reconstrução de Timeline Minuto a Minuto em Análises Pós-Incidente"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Como construir uma **Timeline Minuto a Minuto** precisa durante a análise retrospectiva de um incidente crítico de produção?

## Resposta
### Quick Answer
**Solução Direta**:
- **Diretrizes para Construção da Timeline**:
  1. **Padronização em Timestamp UTC**: Usar horário UTC universal em todos os registros para correlacionar logs de múltiplos servidores e regiões.
  2. **Marcos Temporais Críticos**:
     - *Início do Evento*: Quando a mudança nociva foi introduzida (ex: deploy, alteração de flag).
     - *Detecção*: Momento exato em que o alerta disparou ou o cliente reportou.
     - *Triagem e Mobilização*: Abertura da War Room e convocação do time.
     - *Mitigação*: Execução de rollback ou contenção de tráfego.
     - *Recuperação Total*: Normalização de latências e taxas de erro nos dashboards.

### Dual Coding Visual
| Marco Temporal | Significado Técnico | Métrica SRE Impactada |
|---|---|---|
| **Início $\to$ Detecção** | Tempo até o alerta disparar | MTTD (Mean Time to Detect) |
| **Detecção $\to$ Mitigação** | Tempo até estancar a falha | MTTR (Mean Time to Resolve) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Linha do Tempo em Formato UTC
\`\`\`text
14:00 UTC - Início do rollout da versão v3.2.0 no cluster de produção.
14:04 UTC - Alerta Prometheus: Taxa de HTTP 500 ultrapassa 2% no serviço de auth.
14:07 UTC - Engenheiro on-call declara Sev-1 e abre canal de War Room.
14:11 UTC - Identificado deadlock no Redis; Incident Commander autoriza rollback.
14:16 UTC - Rollback concluído; tráfego redirecionado para versão estável v3.1.9.
14:22 UTC - Latência p99 normalizada em 85ms; incidente encerrado.
\`\`\`

#### Key Takeaways
- Uma timeline precisa identifica com clareza os gargalos na esteira de resposta a incidentes, permitindo acelerar a detecção e mitigação de eventos futuros.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/failure-learning-retrospectives/BEH-LEAD-FAILURE-005.md', `---
id: BEH-LEAD-FAILURE-005
title: "Estruturação e Classificação de Action Items SMART Pós-Incidente"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Como classificar e redigir **Action Items (AIs) SMART** pós-incidente para garantir a não-reincidência de outages?

## Resposta
### Quick Answer
**Solução Direta**:
- **Classificação em 3 Categorias Fundamentais**:
  1. **Detectar Mais Rápido**: Criar alertas proativos de SLO no Prometheus para reduzir o MTTD.
  2. **Mitigar Mais Rápido**: Implementar automações de rollback em Canary e ferramentas de traffic shedding.
  3. **Prevenir Ocorrência**: Adicionar linters, testes de integração reais com Testcontainers e validações no CI.
- **Regras SMART para Action Items**:
  - *Specific*: Tarefa técnica precisa (não genérica como *"melhorar testes"*).
  - *Measurable*: Critério de aceite claro (ex: *"teste de carga cobrindo 20k QPS"*).
  - *Assignable*: Dono nominal único e intransferível.
  - *Time-Bound*: Prazo máximo de entrega (P0: $\le 3$ dias; P1: $\le 2$ semanas).

### Dual Coding Visual
| Prioridade & Categoria | Prazo Máximo | Exemplo de Action Item |
|---|---|---|
| **P0 (Prevenção Crítica)** | 1 a 3 dias | Adicionar Circuit Breaker e timeout estrito de 2s |
| **P1 (Melhoria de Observabilidade)** | 1 a 2 semanas | Configurar alerta Multi-Window Multi-Burn-Rate |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Action Items Formatados
\`\`\`text
Action Items do Incidente de Checkout:
├── [P0] [Prevenir] Adicionar linter de queries SQL no CI/CD (Dono: @carlos, Prazo: 3 dias).
├── [P0] [Mitigar] Habilitar rollback automático no Argo Rollouts se 5xx > 1% (Dono: @alice, Prazo: 2 dias).
└── [P1] [Detectar] Criar dashboard de saturação de pool de conexões (Dono: @bob, Prazo: 1 semana).
\`\`\`

#### Key Takeaways
- Um Post-Mortem só é considerado concluído quando todos os Action Items P0 forem implementados e validados em ambiente de produção.

</details>
`);

// ==========================================
// 5. STAR Framework & Storytelling
// ==========================================

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/star-framework-storytelling/BEH-LEAD-STAR-000.md', `---
id: BEH-LEAD-STAR-000
title: "Estruturação de Histórias no Método STAR e Distribuição Temporal"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Como está estruturado o método **STAR (Situation, Task, Action, Result)** e qual deve ser a distribuição percentual de tempo entre suas 4 etapas?

## Resposta
### Quick Answer
**Solução Direta**:
- **Estrutura das 4 Etapas**:
  - **Situation (~15% do tempo / 30-45s)**: Contextualização breve e objetiva do cenário, projeto, empresa e problema enfrentado.
  - **Task (~10% do tempo / 15-30s)**: O desafio específico sob sua responsabilidade individual e a meta a ser alcançada.
  - **Action (~55% do tempo / 2-2.5 min — O Coração da Resposta)**: As decisões concretas, análises de trade-off e ações práticas que **você pessoalmente executou**.
  - **Result (~20% do tempo / 45-60s)**: O impacto mensurável final, métricas quantitativas alcançadas e lições aprendidas.

### Dual Coding Visual
| Etapa STAR | Proporção de Tempo | Foco Central da Mensagem |
|---|---|---|
| **Situation (S)** | 15% (~30s) | Contexto e gravidade do problema |
| **Task (T)** | 10% (~20s) | Missão individual e métrica-alvo |
| **Action (A)** | 55% (~2min) | Trade-offs técnicos e protagonismo seu |
| **Result (R)** | 20% (~45s) | Métricas numéricas de impacto no negócio |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Linha de Tempo Ideal de Resposta (Total: ~3.5 minutos)
\`\`\`text
0:00 ──────── 0:30 ──────── 0:50 ──────────────────────── 2:50 ──────── 3:30
 │  Situation  │    Task    │            Action            │   Result   │
 └─────────────┴────────────┴──────────────────────────────┴────────────┘
\`\`\`

#### Key Takeaways
- O maior erro em entrevistas comportamentais é gastar muito tempo contextualizando a situação (S) e pouco tempo detalhando as decisões técnicas e ações individuais (A).

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/star-framework-storytelling/BEH-LEAD-STAR-001.md', `---
id: BEH-LEAD-STAR-001
title: "Construção de uma Matriz de Histórias STAR (Story Grid) para Engenharia Sênior"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Como construir uma **Matriz de Histórias (Story Grid)** para cobrir as 5 competências essenciais avaliadas em entrevistas de engenharia sênior?

## Resposta
### Quick Answer
**Solução Direta**:
- **Metodologia da Story Grid**:
  - Selecione de 4 a 6 projetos reais multifacetados da sua carreira.
  - Mapeie como cada projeto atende às 5 competências essenciais:
    1. **Liderança Técnica & Arquitetura**: Projetos desenhados e liderados do zero.
    2. **Resolução de Conflitos**: Desacordos técnicos superados com dados e RFCs.
    3. **Resposta a Incidentes**: Mitigação de outages críticos sob pressão.
    4. **Falhas & Post-Mortem**: Erros assumidos e blindagens sistêmicas criadas.
    5. **Otimização de Performance**: Reduções expressivas de latência e custos.

### Dual Coding Visual
| Competência | Pergunta Típica | Projeto Mapeado |
|---|---|---|
| **Liderança Técnica** | Projeto liderado do zero | Migração para Microsserviços |
| **Resolução de Conflitos** | Desacordo superado | RFC de Mensageria (Kafka vs SQS) |
| **Resposta a Incidentes** | Mitigação sob pressão | Rollback de Gateway em 4min |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estrutura de Flexibilidade Narrativa
\`\`\`text
Projeto Mapeado: "Migração de Monólito para Microsserviços"
├── Se perguntarem de LIDERANÇA: Destaque como alinhou os 4 times na esteira CI/CD.
├── Se perguntarem de CONFLITO: Destaque o debate de consistência de dados no RFC.
└── Se perguntarem de INCIDENTE: Destaque como resolveu a saturação de conexões no deploy.
\`\`\`

#### Key Takeaways
- A Story Grid permite responder a dezenas de perguntas comportamentais diferentes usando um repertório compacto e bem dominado de projetos.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/star-framework-storytelling/BEH-LEAD-STAR-002.md', `---
id: BEH-LEAD-STAR-002
title: "Aplicação da Fórmula X-Y-Z do Google para Quantificação de Resultados"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Como aplicar a **Fórmula X-Y-Z do Google** para quantificar resultados de engenharia com evidências numéricas incontestáveis?

## Resposta
### Quick Answer
**Solução Direta**:
- **Estrutura da Fórmula X-Y-Z**:
  - *"Accomplished [X], as measured by [Y], by doing [Z]"*
  - **[X] O que você alcançou**: O impacto ou conquista de engenharia.
  - **[Y] Como foi medido**: A métrica objetiva e a ferramenta de medição.
  - **[Z] O que você fez**: A solução técnica concreta implementada por você.

### Dual Coding Visual
| Elemento | Significado | Exemplo Concreto em Backend |
|---|---|---|
| **[X] Conquista** | O que melhorou | Redução de latência de checkout de 1.2s para 180ms |
| **[Y] Medição** | Métrica e ferramenta | Medido pelo percentil p99 no Datadog APM |
| **[Z] Ação** | O que você fez | Ao projetar camada de cache TinyLFU no Redis |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplos de Aplicação da Fórmula X-Y-Z
\`\`\`text
Exemplo 1 (Performance & Custo):
"Reduzi o custo de computação em nuvem em $180k/ano [X], medido pelo relatório de faturamento da AWS [Y],
ao migrar serviços assíncronos para instâncias Spot com desligamento gracioso [Z]."

Exemplo 2 (Confiabilidade de CI/CD):
"Acelerei o ciclo de deploy de 45 para 8 minutos [X], medido pela métrica DORA de Lead Time [Y],
ao paralelizar a suíte de testes com Testcontainers e Docker caching [Z]."
\`\`\`

#### Key Takeaways
- Utilizar a fórmula X-Y-Z transforma declarações vagas em afirmações de engenharia robustas e verificáveis.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/star-framework-storytelling/BEH-LEAD-STAR-003.md', `---
id: BEH-LEAD-STAR-003
title: "Foco em Protagonismo e Ações Individuais em Entrevistas FAANG"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::faang
  - freq::high
---

## Pergunta
Por que focar em **ações e decisões individuais ("eu fiz/eu decidi")** é a regra de ouro em entrevistas comportamentais FAANG?

## Resposta
### Quick Answer
**Solução Direta**:
- **O Risco do *"Nós Fizemos"***: Se você narrar uma história dizendo *"nós decidimos criar um cache e nós migramos o banco"*, o entrevistador não consegue saber se você foi o arquiteto líder da mudança ou apenas um observador passivo no time.
- **Protagonismo Claro**: Use a primeira pessoa do singular para ações suas (*"eu analisei os traces", "eu propus o RFC", "eu implementei o fallback"*), sem deixar de reconhecer com humildade as contribuições dos colegas quando relevante.

### Dual Coding Visual
| Linguagem Fraca (Genérica) | Linguagem de Alto Impacto | Percepção do Entrevistador |
|---|---|---|
| *"Nós melhoramos o sistema"* | *"Eu identifiquei a lentidão nos traces e projetei o índice"* | Clareza de senioridade e ownership |
| *"Decidimos usar Kafka"* | *"Apresentei o trade-off de Kafka vs SQS e liderei a adoção"* | Capacidade de liderança técnica |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Calibração de Comunicação em Entrevistas
\`\`\`text
❌ Fraco: "Nós tínhamos um bug em produção e nós conseguimos resolver rapidamente."

✅ Forte: "Quando o alerta disparou, assumi como Operations Lead na War Room,
           identifiquei o deadlock nas queries e executei o rollback em 5 minutos."
\`\`\`

#### Key Takeaways
- A entrevista avalia as suas competências individuais. O protagonismo nas ações demonstra segurança, domínio técnico e clareza de contribuição.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/star-framework-storytelling/BEH-LEAD-STAR-004.md', `---
id: BEH-LEAD-STAR-004
title: "Métricas Quantitativas de Impacto Backend para Histórias Comportamentais"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Quais categorias de **métricas quantitativas de backend** devem ser incorporadas ao resultado de histórias comportamentais?

## Resposta
### Quick Answer
**Solução Direta**:
- **As 4 Categorias Essenciais de Métricas**:
  1. **Performance & Latência**: Percentis p95/p99 (ex: de $800\\text{ms} \\to 120\\text{ms}$), Throughput/QPS (ex: de $4\\text{k} \\to 35\\text{k}$ QPS).
  2. **Confiabilidade & Disponibilidade**: Redução da taxa de erros HTTP 5xx (ex: de $1.8\\% \\to 0.02\\%$), MTTR (de $40\\text{min} \\to 4\\text{min}$), consumo de Error Budget.
  3. **Eficiência de Infraestrutura & Custos**: Redução de instâncias EC2/pods Kubernetes (ex: economia de US$ 150k/ano ou $-45\\%$ de uso de memória).
  4. **Produtividade do Time (Métricas DORA)**: Lead time for changes (de $5\\text{dias} \\to 2\\text{horas}$), frequência de deploys.

### Dual Coding Visual
| Categoria de Métrica | Exemplo de Métrica Backend | Impacto no Negócio |
|---|---|---|
| **Latência (p99)** | $900\\text{ms} \\to 150\\text{ms}$ | Maior conversão de usuários |
| **Disponibilidade** | $99.2\\% \\to 99.95\\%$ | Cumprimento de SLAs sem multas |
| **Custo de Nuvem** | Economia de US$ 200k/ano | Eficiência financeira comprovada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Incorporando Métricas no Resultado (R)
\`\`\`text
Resultado Estruturado:
"Como resultado do particionamento de tabelas e cache:
 - A latência p99 caiu em 82% (de 850ms para 150ms).
 - A utilização de CPU do banco reduziu de 90% para 35% nos horários de pico.
 - Suportamos 3x mais tráfego na Black Friday com zero incidentes Sev-1."
\`\`\`

#### Key Takeaways
- Métricas quantitativas específicas fornecem credibilidade imediata à história, comprovando o impacto tangível da solução técnica.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/star-framework-storytelling/BEH-LEAD-STAR-005.md', `---
id: BEH-LEAD-STAR-005
title: "Estratégia de Resposta para Perguntas de Aprofundamento (Drill-Down Questions)"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::google
  - freq::high
---

## Pergunta
Como se preparar e responder a perguntas de aprofundamento técnico (**Drill-Down Questions**) do entrevistador durante uma história STAR?

## Resposta
### Quick Answer
**Solução Direta**:
- **Objetivo dos Drill-Downs**: Entrevistadores seniores testam a veracidade das ações com perguntas como: *"Por que você escolheu Redis e não Memcached?"*, *"Qual foi o principal risco da migração?"*, *"Se tivesse que refazer hoje, o que mudaria?"*.
- **Estratégia de Preparação**:
  1. **Dominar os Trade-offs das Escolhas**: Ter claras as 2 principais alternativas descartadas e os motivos de descarte.
  2. **Reconhecer Limitações com Maturidade**: Saber apontar o que não funcionou perfeitamente e o que foi aprimorado depois.
  3. **Conexão com Números Reais**: Saber explicar a ordem de grandeza dos dados (tamanho de payload, volume diário, queries por segundo).

### Dual Coding Visual
| Pergunta de Drill-Down | O que o Entrevistador Quer Avaliar | Abordagem Recomendada |
|---|---|---|
| *"Por que escolheu essa tecnologia?"* | Profundidade técnica e análise de trade-off | Explicar alternativas descartadas com prós e contras |
| *"O que você faria diferente hoje?"* | Capacidade de autorreflexão e evolução | Apontar melhorias de automação ou arquitetura |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Resposta a Drill-Down
\`\`\`text
Entrevistador: "Por que você utilizou Kafka em vez de RabbitMQ nesse microsserviço?"
Candidato: "Avaliamos RabbitMQ pela simplicidade de roteamento, mas optamos por Kafka porque
            precisávamos de retenção de eventos por 7 dias para permitir reprocessamento histórico
            (event replay) e throughput superior a 50k mensagens/segundo por partição."
\`\`\`

#### Key Takeaways
- Respostas sólidas a perguntas de aprofundamento confirmam que o candidato liderou genuinamente o projeto e compreende a fundo os fundamentos da engenharia.

</details>
`);

console.log('✅ Behavioral Cultures, Failure & STAR concluído com sucesso!');
