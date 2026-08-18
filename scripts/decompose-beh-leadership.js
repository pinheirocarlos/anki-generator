import { writeAndValidateCard } from './decompose-helper.js';

console.log('--- Decompondo Behavioral Leadership ---');

// ==========================================
// 1. Amazon Leadership Principles
// ==========================================

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/amazon-leadership-principles/BEH-LEAD-AMAZON-000.md', `---
id: BEH-LEAD-AMAZON-000
title: "Princípios de Liderança da Amazon: Os 16 Leadership Principles na Tomada de Decisão"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::amazon
  - freq::high
---

## Pergunta
O que são os **16 Leadership Principles (LPs)** da Amazon e qual o seu papel na tomada de decisões operacionais de engenharia?

## Resposta
### Quick Answer
**Solução Direta**:
- **Conceito dos LPs**: Não são slogans corporativos decorativos, mas a linguagem operacional cotidiana da Amazon para guiar decisões arquiteturais, de produto e de contratação.
- **Principais LPs para Engenheiros de Software**:
  1. **Customer Obsession**: Começar pelo cliente e trabalhar de trás para frente (*Working Backwards*).
  2. **Ownership**: Pensar a longo prazo e jamais assumir a postura de *"isso não é meu trabalho"*.
  3. **Bias for Action**: Velocidade importa no negócio; decisões com dados incompletos devem ser tomadas com agilidade quando o risco for reversível.
  4. **Dive Deep**: Operar em múltiplos níveis de detalhe técnico e auditar métricas continuamente.
  5. **Deliver Results**: Foco estrito em superar obstáculos e entregar valor tangível com qualidade e pontualidade.

### Dual Coding Visual
| Leadership Principle | Foco Operacional | Exemplo em Engenharia |
|---|---|---|
| **Customer Obsession** | Trabalhar de trás para frente | Projetar APIs a partir da experiência do cliente |
| **Ownership** | Pensamento de longo prazo | Criar runbooks e alertas para estabilidade futura |
| **Deliver Results** | Entrega com qualidade | Lançar MVP com métricas sólidas no prazo acordado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Aplicação Prática dos LPs em Incidentes
\`\`\`text
Cenário de Engenharia:
├── Customer Obsession: Proteger o checkout do cliente final acima de qualquer burocracia.
├── Ownership: Assumir o incidente, criar alerta preventivo e guiar o time até a estabilização.
└── Deliver Results: Normalizar a latência em menos de 15 minutos com taxa de erro zero.
\`\`\`

#### Key Takeaways
- Em entrevistas e no dia a dia da Amazon, cada decisão técnica deve ser justificada com base no impacto no cliente final e na responsabilidade de longo prazo.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/amazon-leadership-principles/BEH-LEAD-AMAZON-001.md', `---
id: BEH-LEAD-AMAZON-001
title: "Navegando Tensões entre Leadership Principles Conflitantes da Amazon"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::amazon
  - freq::high
---

## Pergunta
Como navegar estrategicamente as **tensões entre Leadership Principles aparentemente conflitantes** da Amazon (*Bias for Action vs Dive Deep*, *Deliver Results vs Highest Standards*)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Equilíbrio de Tensões Clássicas**:
  - *Bias for Action vs Dive Deep*: Decida rápido quando a mudança for reversível (Two-Way Door), mas aprofunde-se tecnicamente em detalhes quando houver risco de perda de dados, segurança ou falhas de arquitetura irreversíveis.
  - *Deliver Results vs Insist on Highest Standards*: Nunca entregue débitos técnicos graves de forma silenciosa para bater metas; se um corte temporário de escopo for necessário, registre o plano formal de refatoração imediata pós-entrega.
  - *Customer Obsession vs Frugality*: Priorize sempre a confiabilidade e experiência do cliente, buscando arquiteturas eficientes em custo de computação em nuvem sem comprometer SLAs.

### Dual Coding Visual
| Tensão de LPs | Cenário de Decisão | Abordagem Recomendada |
|---|---|---|
| **Bias for Action vs Dive Deep** | Bug com impacto imediato em produção | Mitigação rápida $\to$ Análise 5-Whys posterior |
| **Deliver Results vs Highest Standards** | Prazo agressivo de lançamento de feature | Lançar MVP enxuto com dívida técnica documentada |
| **Customer Obsession vs Frugality** | Dimensionamento de infraestrutura | Autoscaling sob demanda com instâncias spot seguras |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Matriz de Decisão sob Tensão de LPs
\`\`\`text
Problema: "QPS aumentou 5x inesperadamente na campanha de marketing."
├── Ação Imediata (Bias for Action):
│   └── Aplicar rate limiter temporário em 10 minutos para proteger o banco.
└── Ação Estrutural (Dive Deep & Highest Standards):
    └── Analisar logs, criar índice faltante e executar teste de carga para 10x QPS.
\`\`\`

#### Key Takeaways
- Os melhores candidatos seniores demonstram capacidade de balancear princípios opostos com pragmatismo, compreendendo o contexto específico de cada trade-off técnico.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/amazon-leadership-principles/BEH-LEAD-AMAZON-002.md', `---
id: BEH-LEAD-AMAZON-002
title: "O Papel e o Poder de Veto do Bar Raiser nas Entrevistas da Amazon"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::amazon
  - freq::high
---

## Pergunta
Qual é o papel específico e a autoridade do **Bar Raiser** durante os processos seletivos de engenharia na Amazon?

## Resposta
### Quick Answer
**Solução Direta**:
- **Definição**: Um avaliador sênior de **outro departamento/organização** da Amazon, independente do time contratante, responsável por garantir a calibração cultural e técnica do processo seletivo.
- **A Regra da Régua ("Raise the Bar")**:
  - O candidato deve ser demonstradamente superior a pelo menos **50% dos funcionários atuais naquele mesmo nível** para ser aprovado.
- **Poder de Veto e Imparcialidade**:
  - O Bar Raiser tem poder de veto sobre a contratação, garantindo que a pressão do gestor por preencher a vaga rapidamente não comprometa o padrão de excelência da empresa.

### Dual Coding Visual
| Papel no Processo | Função Principal | Foco da Avaliação |
|---|---|---|
| **Hiring Manager** | Gestor da vaga com interesse na contratação | Ajuste funcional e entrega de projetos |
| **Bar Raiser** | Avaliador externo independente | Alinhamento aos 16 LPs e padrão de senioridade |
| **Poder de Decisão** | Consenso guiado pelo Bar Raiser | Veto a candidatos que não elevem o padrão |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Processo de Calibração no Debrief
\`\`\`text
Entrevistas Concluídas
        │
        ▼
[Reunião de Debrief] ──► Hiring Manager deseja contratar por urgência
        │
        ▼
[Bar Raiser avalia]: "O candidato é melhor que 50% dos SDEs atuais no nível?"
        │
        ├── SIM ──► Contratação Aprovada ✅
        └── NÃO ──► Veto Exercido (Barra Não Elevada) ❌
\`\`\`

#### Key Takeaways
- O Bar Raiser protege a cultura de longo prazo da Amazon, avaliando consistência comportamental e capacidade de adaptação em situações de alta complexidade.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/amazon-leadership-principles/BEH-LEAD-AMAZON-003.md', `---
id: BEH-LEAD-AMAZON-003
title: "Decisões One-Way Door vs Two-Way Door no Framework de Decisão da Amazon"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença operacional entre decisões **One-Way Door (Tipo 1)** e **Two-Way Door (Tipo 2)** no framework de tomada de decisões da Amazon?

## Resposta
### Quick Answer
**Solução Direta**:
- **Decisões One-Way Door (Tipo 1 - Porta de Sentido Único)**:
  - Decisões irreversíveis ou com custo quase proibitivo de reversão (ex: escolha do banco de dados relacional vs NoSQL core, protocolo base de comunicação da empresa, contrato de segurança).
  - *Abordagem*: Exigem *Dive Deep*, análise matemática/estatística detalhada, múltiplos reviews e cautela máxima.
- **Decisões Two-Way Door (Tipo 2 - Porta de Vaivém)**:
  - Decisões facilmente reversíveis caso a hipótese se mostre incorreta (ex: teste A/B de UI, ajuste de parâmetros de cache, criação de feature flags).
  - *Abordagem*: Exigem *Bias for Action*, rapidez e experimentação com dados parciais (~70% de certeza).

### Dual Coding Visual
| Tipo de Porta | Reversibilidade | Abordagem Recomendada |
|---|---|---|
| **One-Way (Tipo 1)** | Praticamente irreversível | Deliberação profunda, RFC formal e cautela |
| **Two-Way (Tipo 2)** | Facilmente reversível | Decisão rápida, experimentação e *Bias for Action* |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Classificação Prática em Engenharia Backend
\`\`\`text
Tipo 1 (One-Way): "Migrar todo o storage de pedidos de PostgreSQL para Cassandra."
└── Requer PoC exaustiva, análise de consistência e aprovação de Staff Engineers.

Tipo 2 (Two-Way): "Habilitar compressão Gzip em endpoint REST com feature flag."
└── Testar em 5% dos usuários; se aumentar CPU além do limite, desativar flag em 1s.
\`\`\`

#### Key Takeaways
- Tratar todas as decisões como Tipo 1 gera paralisia por análise; tratar decisões Tipo 1 como Tipo 2 gera desastres arquiteturais. O discernimento do tipo de porta é marca de senioridade.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/amazon-leadership-principles/BEH-LEAD-AMAZON-004.md', `---
id: BEH-LEAD-AMAZON-004
title: "Estruturação de Resposta para Have Backbone; Disagree and Commit em Entrevistas"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::amazon
  - freq::high
---

## Pergunta
Como estruturar uma resposta de alto impacto para a pergunta de LP *"Tell me about a time you strongly disagreed"* (**Have Backbone; Disagree and Commit**)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Estrutura em 4 Passos**:
  1. **Situação e Desacordo Técnico**: Apresente o impasse técnico ou de prioridade com foco em dados objetivos (nunca em opiniões subjetivas ou egos).
  2. **Have Backbone (Defesa Firme)**: Demonstre como você preparou dados, benchmarks ou uma matriz de trade-offs por escrito para defender seu ponto tecnicamente.
  3. **Decisão e Alinhamento**: Explique como a decisão final foi tomada (seja a seu favor ou a favor da alternativa oposta).
  4. **Commit Incondicional**: Destaque que, uma vez definida a direção pelo time ou liderança, você abraçou o plano com 100% de esforço, sem atitudes de *"eu avisei"*.

### Dual Coding Visual
| Fase da Narrativa | Comportamento Esperado | Anti-Pattern |
|---|---|---|
| **Fase de Debate** | Defesa com dados e benchmarks (*Backbone*) | Submissão passiva sem questionamento |
| **Pós-Decisão** | Execução com 100% de dedicação (*Commit*) | Sabotagem velada ou ressentimento |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Estruturado no Método STAR
\`\`\`text
[S] "O time propôs utilizar armazenamento em arquivo JSON para persistir transações."
[T] "Como tech lead, identifiquei risco de concorrência e corrupção de dados sob alta carga."
[A] "Escrevi um benchmark comparativo comprovando que um banco relacional eliminava deadlocks.
     Apresentei a matriz de trade-offs ao Staff Engineer. A liderança optou por Postgres."
[R] "Executamos a migração no prazo com 99.999% de integridade contábil em 50M de registros."
\`\`\`

#### Key Takeaways
- Entrevistadores buscam verificar se o candidato sabe defender posições difíceis com respeito e dados, mantendo foco absoluto no sucesso coletivo após a decisão.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/amazon-leadership-principles/BEH-LEAD-AMAZON-005.md', `---
id: BEH-LEAD-AMAZON-005
title: "Anti-Patterns Comportamentais Críticos que Reprovam no Bar Raiser da Amazon"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::amazon
  - freq::high
---

## Pergunta
Quais são os **anti-patterns comportamentais críticos** que causam reprovação imediata por falta de alinhamento com os Leadership Principles da Amazon?

## Resposta
### Quick Answer
**Solução Direta**:
- **Principais Anti-Patterns de Reprovação**:
  1. **Falta de Ownership (Culpar Terceiros)**: Atribuir atrasos ou bugs a outros times, gerentes de produto ou fornecedores (*"o time de DevOps demorou"*).
  2. **Passividade e Falta de Backbone**: Concordar cegamente com más decisões técnicas por receio de confrontar a gerência (*"eu sabia que ia falhar, mas fiz o que mandaram"*).
  3. **Superficialidade Técnica (Violação de Dive Deep)**: Desconhecer as métricas exatas, os trade-offs arquiteturais ou a causa-raiz do problema apresentado.
  4. **Ausência de Foco no Cliente**: Justificar escolhas tecnológicas sofisticadas apenas por gosto pessoal, sem conexão com benefícios para o usuário final.

### Dual Coding Visual
| Anti-Pattern | Violação de LP | Comportamento Ideal |
|---|---|---|
| Culpar outro time | Violação de *Ownership* | Assumir responsabilidade e criar processo preventivo |
| Falta de métricas exatas | Violação de *Dive Deep* | Apresentar percentis p95/p99, custos e QPS |
| Submissão cega | Violação de *Have Backbone* | Apresentar contraproposta fundamentada com dados |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Correção de Postura em Entrevistas
\`\`\`text
❌ Anti-Pattern:
"O projeto atrasou porque o DBA demorou 3 semanas para aprovar o schema."

✅ Postura de Alto Alinhamento (Ownership + Bias for Action):
"Percebi que o processo de aprovação manual era um gargalo. Agendei uma sessão de pareamento
com o DBA para ajustar o schema em 1 dia e propus um pipeline de validação automatizada."
\`\`\`

#### Key Takeaways
- O Bar Raiser avalia se o candidato tem maturidade para assumir a liderança diante de bloqueios, transformando dificuldades em processos aprimorados para toda a organização.

</details>
`);

// ==========================================
// 2. Conflict Resolution & Influence
// ==========================================

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/conflict-resolution-influence/BEH-LEAD-CONFLICT-000.md', `---
id: BEH-LEAD-CONFLICT-000
title: "Framework Sistemático para Resolução de Desacordos Técnicos em Engenharia"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::meta
  - freq::high
---

## Pergunta
Qual é o framework sistemático para desarmar e resolver **desacordos técnicos** entre engenheiros seniores sem paralisia decisória?

## Resposta
### Quick Answer
**Solução Direta**:
- **Os 3 Pilares da Resolução Técnica**:
  1. **Separar Fatos de Opiniões/Egos**: Substituir preferências subjetivas por critérios mensuráveis (latência p99, custo de infraestrutura, tempo de entrega, facilidade de manutenção).
  2. **Provas de Conceito com Limite de Tempo (Time-Boxed Spikes)**: Criar um experimento de 2 a 3 dias com critérios de sucesso predefinidos para que dados empíricos guiem a decisão.
  3. **Documentação Escrita via RFCs / Design Docs**: Expor trade-offs, vantagens e desvantagens de forma assíncrona, permitindo análise reflexiva e sem pressões em reuniões.

### Dual Coding Visual
| Abordagem | Característica Principal | Resultado no Time |
|---|---|---|
| **Conflito Baseado em Egos** | Disputa de opiniões subjetivas | Paralisia e atrito interpessoal |
| **Conflito Baseado em Dados** | Benchmarks e matrizes de trade-off | Escolha técnica sólida e aprendizado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fluxo de Resolução de Impasse Técnico
\`\`\`text
[Impasse Arquitetural entre Engenheiros]
        │
        ├──► 1. Redigir Design Doc com critérios objetivos (SLA, custo, escala)
        │
        ├──► 2. Spike técnico de 3 dias para benchmark sob carga real
        │
        └──► 3. Decisão baseada nos dados do benchmark com apoio de todos
\`\`\`

#### Key Takeaways
- Conflitos técnicos são oportunidades de aprofundamento. O líder sênior neutraliza discussões emocionais ao direcionar o debate para dados empíricos e necessidades de negócio.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/conflict-resolution-influence/BEH-LEAD-CONFLICT-001.md', `---
id: BEH-LEAD-CONFLICT-001
title: "Matriz de Decisão Ponderada em RFCs para Escolhas Arquiteturais"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::meta
  - freq::high
---

## Pergunta
Como estruturar uma **Matriz de Decisão Ponderada (Weighted Decision Matrix)** em um documento RFC para neutralizar vieses pessoais em escolhas arquiteturais?

## Resposta
### Quick Answer
**Solução Direta**:
- **Passos para Construção da Matriz**:
  1. **Definição Prévia de Critérios e Pesos**: O time estabelece os critérios de sucesso e seus respectivos pesos percentuais antes de pontuar as tecnologias (ex: Throughput: 30%, Complexidade Operacional: 25%, Custo: 25%, Curva de Aprendizado: 20%).
  2. **Pontuação Objetiva (1 a 5)**: Cada opção recebe notas fundamentadas em benchmarks, custos ou documentação oficial.
  3. **Cálculo da Média Ponderada**: A opção com maior pontuação ponderada consolidada é a indicada tecnicamente para o momento da organização.

### Dual Coding Visual
| Critério (Peso) | Opção A (Kafka) | Opção B (SQS/SNS) |
|---|---|---|
| **Throughput (30%)** | Nota 5 (1.50) | Nota 3 (0.90) |
| **Simplicidade (25%)** | Nota 2 (0.50) | Nota 5 (1.25) |
| **Pontuação Total** | **3.85 (Vencedor)** | **3.45** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Matriz em Markdown para Design Doc
\`\`\`text
Critérios              | Peso | Opção 1 (PostgreSQL) | Opção 2 (Cassandra)
-----------------------|------|----------------------|--------------------
Transações ACID        | 35%  | 5 / 1.75             | 2 / 0.70
Escalabilidade Escrita | 30%  | 3 / 0.90             | 5 / 1.50
Familiaridade do Time  | 20%  | 5 / 1.00             | 2 / 0.40
Custo de Infra         | 15%  | 4 / 0.60             | 3 / 0.45
-----------------------|------|----------------------|--------------------
Total Ponderado        | 100% | 4.25 (Recomendado)   | 3.05
\`\`\`

#### Key Takeaways
- A matriz de decisão documentada remove o viés pessoal das discussões e cria um registro histórico claro das razões pelas quais uma tecnologia foi selecionada.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/conflict-resolution-influence/BEH-LEAD-CONFLICT-002.md', `---
id: BEH-LEAD-CONFLICT-002
title: "O Princípio de Disagree and Commit na Agilidade e Alinhamento de Times"
tags:
  - level::l3-junior
  - topic::behavioral::behavioral-leadership
  - company::amazon
  - freq::high
---

## Pergunta
Por que o princípio de **Disagree and Commit (Discordar e Comprometer-se)** é crucial para a agilidade e alinhamento de times de engenharia de alta performance?

## Resposta
### Quick Answer
**Solução Direta**:
- **Dever de Discordar na Discussão**: Engenheiros têm a obrigação de apresentar contra-argumentos fundamentados, dados e riscos durante o processo deliberativo.
- **Compromisso Total na Execução**: Uma vez tomada a decisão final pela equipe ou liderança, **todos devem apoiar e executar o plano com 100% de esforço**, sem sabotagens passivas ou atitudes de *"eu avisei"*.
- **Prevenção de Paralisia**: Impede que discussões intermináveis atrasem a entrega de produtos quando não houver consenso perfeito.

### Dual Coding Visual
| Momento | Papel do Engenheiro | Comportamento Inaceitável |
|---|---|---|
| **Antes da Decisão** | Debate franco com dados e opções | Omissão ou concordância passiva |
| **Após a Decisão** | Apoio total e execução dedicada | Questionamento contínuo e desengajamento |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Ciclo de Decisão Saudável
\`\`\`text
┌─────────────────────────────────┐
│ 1. Debate Aberto & Vigoroso     │ ──► Defesa com dados técnicos
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 2. Decisão Final Tomada         │ ──► Escolha pela liderança/time
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ 3. Disagree and Commit          │ ──► Todos executam com excelência
└─────────────────────────────────┘
\`\`\`

#### Key Takeaways
- O alinhamento organizacional não exige concordância unânime, mas sim compromisso compartilhado inegociável com a execução do plano escolhido.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/conflict-resolution-influence/BEH-LEAD-CONFLICT-003.md', `---
id: BEH-LEAD-CONFLICT-003
title: "Estratégias de Influência sem Autoridade para Engenheiros Seniores"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::meta
  - freq::high
---

## Pergunta
Como engenheiros seniores exercem **Influência sem Autoridade** sobre decisões técnicas de times adjacentes e stakeholders?

## Resposta
### Quick Answer
**Solução Direta**:
- **Mecanismos de Influência Técnica**:
  1. **Escuta Ativa das Dores dos Outros Times**: Compreender os gargalos e objetivos dos times parceiros antes de propor alterações arquiteturais.
  2. **Prototipação Prática (Show, Don't Tell)**: Desenvolver PoCs funcionais e bibliotecas reutilizáveis que facilitem a vida de outros desenvolvedores.
  3. **Comunicação Clara de Trade-offs**: Evitar jargões puramente teóricos e conectar mudanças técnicas a ganhos de velocidade e estabilidade.
  4. **Construção de Coalizões**: Alinhar ideias individualmente com tech leads de outros times antes de apresentar propostas em fóruns amplos.

### Dual Coding Visual
| Estratégia | Abordagem Eficaz | Anti-Pattern |
|---|---|---|
| **Proposta Técnica** | Apresentar protótipo funcional e métricas | Tentar impor padrões por decreto |
| **Comunicação** | Traduzir impacto em tempo e confiabilidade | Usar argumentos de autoridade abstratos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Adoção de Nova Biblioteca Interna
\`\`\`text
Objetivo: Padronizar cliente gRPC com retry automático em 8 microsserviços.
├── Passo 1: Conversar com os leads dos serviços para entender problemas de timeout.
├── Passo 2: Criar pacote SDK em Go que resolve o problema com 3 linhas de código.
├── Passo 3: Testar e demonstrar redução de 90% em falhas de rede no primeiro time.
└── Passo 4: Os outros 7 times adotam a solução voluntariamente devido ao benefício claro.
\`\`\`

#### Key Takeaways
- A influência de engenheiros seniores decorre da capacidade de gerar valor real para colegas e stakeholders, tornando a solução proposta a escolha natural e vantajosa.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/conflict-resolution-influence/BEH-LEAD-CONFLICT-004.md', `---
id: BEH-LEAD-CONFLICT-004
title: "Processo de Escalação Saudável (Healthy Escalation) para a Liderança Técnica"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::meta
  - freq::high
---

## Pergunta
Como conduzir uma **Escalação Saudável (Healthy Escalation)** para a liderança técnica sem criar animosidade interpessoal?

## Resposta
### Quick Answer
**Solução Direta**:
- **O Conceito de Escalação Saudável**: Não se trata de acusar um colega, mas de reconhecer que há um impasse legítimo de premissas ou prioridades cujo escopo ultrapassa a autonomia individual dos engenheiros.
- **Regras de Conduta**:
  1. **Transparência e Pré-Aviso**: Nunca escalar pelas costas. Avise a outra parte: *"Temos visões válidas com premissas diferentes; vamos levar o caso juntos para o Staff Engineer/Diretor decidir"*.
  2. **Apresentação Conjunta e Equitativa**: Ambas as partes redigem o documento apresentando os dois lados com justiça e imparcialidade.
  3. **Foco em Metas da Empresa**: Contextualizar o dilema em termos de risco de negócio, prazos globais e arquitetura corporativa.

### Dual Coding Visual
| Tipo de Escalação | Características | Percepção da Liderança |
|---|---|---|
| **Escalação Tóxica** | Reclamação unilateral pelas costas | Imaturidade e atrito interpessoal |
| **Escalação Saudável** | Apresentação conjunta de trade-offs | Maturidade profissional e foco no negócio |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estrutura de Documento de Escalação Conjunta
\`\`\`text
Documento de Alinhamento: Escolha de Protocolo de Comunicação (Time A & Time B)
├── Contexto: Integração entre Serviço de Pedidos e Gateway de Pagamentos.
├── Proposta 1 (gRPC - Time A): Menor latência (5ms vs 45ms), validação de tipos estática.
├── Proposta 2 (REST - Time B): Facilidade de debug imediato e menor curva de aprendizado.
└── Solicitação à Liderança: Definir se a prioridade do trimestre é latência p99 ou time-to-market.
\`\`\`

#### Key Takeaways
- Escalar com transparência e coleguismo desbloqueia impasses rapidamente e reforça a confiança entre engenheiros e liderança.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/behavioral-leadership/conflict-resolution-influence/BEH-LEAD-CONFLICT-005.md', `---
id: BEH-LEAD-CONFLICT-005
title: "Tradução de Dívida Técnica e Refatoração para Métricas de Negócio com Product Managers"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::meta
  - freq::high
---

## Pergunta
Como traduzir **dívidas técnicas e necessidades de refatoração** para métricas de negócio ao negociar com Product Managers?

## Resposta
### Quick Answer
**Solução Direta**:
- **Tradução de Linguagem Técnica para Linguagem de Negócio**:
  - *Em vez de dizer*: *"O código do monólito está acoplado e difícil de ler"*.
  - *Diga*: *"Se não isolarmos este módulo agora, o tempo de entrega de novas features aumentará de 3 dias para 4 semanas e o risco de indisponibilidade na Black Friday será de R$ 150k/hora"*.
- **Estratégias de Negociação**:
  1. **Quantificar Riscos em Reais/Dólares**: Conectar incidentes recentes ao débito técnico existente.
  2. **Regra dos 20% Constantes**: Estabelecer um acordo contínuo de dedicar 20% da capacidade de cada sprint para saúde de engenharia e refatorações preventivas.
  3. **Refatoração Acoplada a Novas Features (Boy Scout Rule)**: Melhorar a arquitetura gradualmente à medida que novas histórias de produto tocam o código legado.

### Dual Coding Visual
| Argumento Técnico | Tradução para Negócio / Produto | Impacto na Priorização |
|---|---|---|
| *"Código com acoplamento alto"* | *"Features futuras levarão 3x mais tempo"* | Facilita aprovação no roadmap |
| *"Queries de banco lentas"* | *"Risco de timeout e perda de conversão"* | Conexão direta com faturamento |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Proposta de Refatoração Estruturada
\`\`\`text
Proposta de Engenharia: Migração da Camada de Autenticação
├── Custo: 1 sprint de dedicação de 2 engenheiros.
├── Risco de NÃO Fazer: Queda de SLO de disponibilidade para < 99.5% e risco de vazamento de sessão.
└── Retorno de Negócio: Redução de 30% no custo de servidores e suporte a 50k usuários simultâneos.
\`\`\`

#### Key Takeaways
- Product Managers priorizam valor de negócio. Ao demonstrar que dívida técnica custa caro em receita e velocidade futura, o alinhamento torna-se colaborativo e natural.

</details>
`);

console.log('✅ Behavioral Leadership concluído com sucesso!');
