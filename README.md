# 🥋 Anki Generator — MAANG Engineering Mastery Engine

> Motor pedagógico e baralho definitivo focado em micro-learning para transformar engenheiros de software backend em candidatos preparados para entrevistas L2/L3/L4/L5+ nas principais Big Techs (*Meta, Amazon, Apple, Netflix, Google*).

---

## 🎯 Visão Geral & Filosofia Pedagógica

- **Público-Alvo:** Engenheiros de software backend com foco em entrevistas técnicas globais e nivelamento de fundamentos.
- **Plataforma Principal:** Mobile-first (*AnkiDroid*, *AnkiMobile* e *AnkiWeb*).
- **Carga de Estudo:** ~2 horas semanais em momentos de deslocamento/ociosidade (micro-learning de 15 a 90 segundos por card).
- **Engenharia Pedagógica (Governança da Constituição v1.4.0):**
  - **Atomicidade Estrita:** Cada flashcard avalia exatamente 1 proposição interrogativa principal com tempo de resposta mental estimado em <30 segundos. Validação sintática contínua contra perguntas multipartes no pipeline de build.
  - **Dual Coding Visual Multi-Tier & Offline-First:** Todo conceito complexo possui um recurso visual explicativo de alto impacto: (1) **453 cards com diagramas SVG declarativos responsivos** (`viewBox`) embutidos inline, (2) **26 cards com animações visuais e GIFs dinâmicos locais** co-localizados em `assets/` e empacotados no `.apkg`, e (3) suporte arquitetural completo a micro-vídeos em loop (`<video autoplay loop muted playsinline>`) com atributos mobile normalizados.
  - **Nível L2 Foundations (Primeiros Princípios):** 100% dos 108 subtópicos contam com cartão de nivelamento (`level::l2-fundamental`, sufixo canônico `006`/`007`) usando analogias do mundo real e intuição física antes da formalização matemática/algorítmica.
  - **Progressive Disclosure:** Resposta imediata com badges de complexidade ($O(N)$, $O(1)$) visíveis em <15s, e aprofundamentos técnicos/código isolados no componente sanfona `<details><summary>Deep Dive & Walkthrough</summary>` (área de toque mínima de 44px).
  - **Template Unificado:** Arquitetura de nota sem duplicação de `{{FrontSide}}`, combinando contexto compacto da pergunta e resposta fluida em um único container estilizado.
  - **Bilinguismo Estratégico:** Prosa explicativa em PT-BR didático e termos técnicos, nomes de algoritmos e jargões mantidos em Inglês (`code`).
  - **Código Mobile-Ready & Syntax Highlighting Estático:** Snippets pré-compilados em tempo de build com `highlight.js` (tema *Dark Modern*), com quebras de linha automáticas (`pre code { white-space: pre-wrap; word-break: break-word; }`) sem rolagem horizontal no celular (≥360px) e **zero JavaScript em runtime**.
  - **Static Engine & Empacotamento Ultraleve:** Motor de renderização e CSS 100% estáticos com compilação de fórmulas matemáticas via `KaTeX`, gerando um pacote `.apkg` consolidado com menos de 10MB para os 550 cards e carregamento instantâneo.

---

## 📊 Métricas & Estatísticas do Baralho

| Métrica | Quantidade | Observações |
|---|---|---|
| **Total de Flashcards Atômicos** | **550 cards** | 100% em conformidade com a Constituição v1.4.0 e testes automatizados |
| **Subtópicos Curriculares** | **108 subtópicos** | Cobertura integral em 4 fases curriculares (manifesto canônico) |
| **Foundations (L2)** | **108 cards** | 1 card introdutório com analogia por subtópico (sufixo canônico `006`/`007`) |
| **Junior / Standard (L3)** | **229 cards** | Conceitos fundamentais, invariantes e padrões de implementação |
| **Pleno / Advanced (L4)** | **210 cards** | Trade-offs, otimizações de baixo nível e cenários de alta concorrência |
| **Senior / Staff (L5)** | **3 cards** | Arquiteturas distribuídas avançadas, CAP/PACELC e tolerância a falhas bizantinas |
| **Cards com Diagramas Vetoriais SVG** | **453 cards** | Vetores inline responsivos com `viewBox` e paleta semântica Dark Modern |
| **Cards com Animações / GIFs Locais** | **26 cards** | Processos dinâmicos co-localizados em `assets/` e embutidos no `.apkg` |
| **Deep Dives Expansíveis** | **550 cards** | Componente sanfona `<details>` com área de toque $\ge 44$px |
| **Tabelas Compactas Mobile-First** | **550 cards** | Tabelas estruturadas $\le 3$ colunas com `overflow-x: auto` defensivo |

---

## 🏗️ Anatomia de um Flashcard

Cada cartão é um arquivo Markdown isolado localizado na estrutura granular de subtópicos:
`decks/<fase_id>/<modulo>/<subtopico>/<card_id>.md`

Mídias locais e assets ficam co-localizados em:
`decks/<fase_id>/<modulo>/<subtopico>/assets/<asset_name>.<svg|png|jpg|gif>`

### Exemplo 1: Card Foundations L2 (`CS-ARCH-CACHE-006.md`)

```markdown
---
id: CS-ARCH-CACHE-006
title: "Intuição Fundamental de Cache de CPU: A Mesa de Trabalho, a Gaveta e a Biblioteca"
tags:
  - level::l2-fundamental
  - topic::cs::architecture
  - company::google
  - freq::high
---

## Pergunta
Qual é a intuição fundamental por trás da hierarquia de caches da CPU (L1, L2, L3) e por que ela é indispensável para o desempenho do computador?

## Resposta
### Quick Answer
**Solução Direta**:
- A CPU executa operações em frações de nanossegundo, mas a memória RAM é fisicamente distante e leva centenas de ciclos para responder (o chamado gargalo de Von Neumann).
- Para evitar que o processador fique ocioso esperando dados (*CPU Stalls*), arquitetos colocam pequenas memórias ultra-rápidas (SRAM) dentro do próprio chip da CPU:
  - **Cache L1**: O caderno aberto sobre a mesa (acesso em ~1 ns).
  - **Cache L2/L3**: As gavetas ao lado da mesa (acesso em ~3 a 15 ns).
  - **RAM**: O arquivo no corredor do prédio (acesso em ~60 a 100 ns).

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <!-- Diagrama vetorial escalável com pirâmide de memória L1/L2/L3 vs RAM -->
</svg>
<p>Visualização: Analogia da mesa de trabalho (L1), gaveta (L3) e biblioteca distante (RAM).</p>

| Nível de Memória | Latência / Velocidade | Analogia do Cotidiano |
|---|---|---|
| **Cache L1 / L2** | ~1 a 4 ns (Instantâneo) | Papel na mão / Caderno aberto na mesa |
| **Cache L3 (LLC)** | ~10 a 15 ns (Muito rápido) | Livro na gaveta da escrivaninha |
| **Memória RAM** | ~60 a 100 ns (Lento para a CPU) | Arquivo no armário do corredor |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Problema Real
A CPU evoluiu muito mais rápido do que a memória RAM ao longo das décadas...

#### A Regra dos 90/10 (Localidade de Referência)
1. **Localidade Temporal**: Dados acessados recentemente serão reutilizados em breve.
2. **Localidade Espacial**: Dados contíguos na mesma Cache Line (64 bytes) serão lidos sequencialmente.

</details>
```

### Exemplo 2: Card Padrão Atômico L4 (`CS-ARCH-CACHE-001.md`)

```markdown
---
id: CS-ARCH-CACHE-001
title: "False Sharing em Multi-Core e Mitigação por Padding de Cache Line"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::meta
  - freq::high
---

## Pergunta
O que é o fenômeno destrutivo de **False Sharing** em sistemas multi-core e como mitigá-lo com alinhamento e padding de memória?

## Resposta
### Quick Answer
**Solução Direta**:
- **False Sharing**: Ocorre quando duas threads em núcleos de CPU diferentes modificam variáveis independentes que residem por acaso na **mesma Cache Line de 64 bytes**.
- Embora as variáveis sejam distintas no código (ex: `a` e `b`), o hardware invalida a Cache Line inteira a cada escrita através do protocolo de coerência (MESI), forçando recargas contínuas e degradando brutalmente a performance.
- **Mitigação**: Inserir **padding de 64 bytes** (ex: `[8]uint64` em Go ou `@Contended` em Java) ou alinhar as estruturas para garantir que variáveis concorrentes fiquem em Cache Lines isoladas.

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <!-- Diagrama vetorial ilustrando Cache Bouncing entre Core 0 e Core 1 -->
</svg>
<p>Visualização: Padding de cache line isolando variáveis concorrentes para eliminar false sharing.</p>

| Cenário Multi-Thread | Disposição na Memória | Impacto de Performance |
|---|---|---|
| **False Sharing Ativo** | Variáveis concorrentes na mesma linha (64B) | Invalidação constante da Cache Line |
| **Isolamento com Padding** | Linhas de 64B separadas por padding | Zero contenção de coerência no barramento |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Mitigando False Sharing com Padding
```go
type PaddedCounter struct {
  count uint64
  _     [7]uint64 // Padding de 56 bytes para preencher a Cache Line de 64B
}
```

#### Key Takeaways
- **Mechanical Sympathy**: Compreender como o hardware gerencia linhas de cache evita gargalos invisíveis em código concorrente de alta vazão.

</details>
```

---

## 🏷️ Taxonomia de Tags & Convenção de IDs

O baralho adota arquitetura plana no Anki (sem sub-decks aninhados para preservar o algoritmo de repetição espaçada e prática intercalada). A segmentação e filtragem dinâmica de estudo dá-se exclusivamente por tags no frontmatter:

- **Nível de Senioridade / Profundidade:** *(Exatamente 1 por card)*
  - `level::l2-fundamental` — Foundations, analogias físicas e intuição do zero aos primeiros princípios (Badge Esmeralda `#10b981`).
  - `level::l3-junior` — Conceitos canônicos, algoritmos básicos e complexidades assintóticas $O(N)$ (Badge Azul `#3b82f6`).
  - `level::l4-pleno` — Trade-offs arquiteturais, otimização de memória e cenários de alta concorrência (Badge Roxo `#8b5cf6`).
  - `level::l5-senior` — Sistemas distribuídos em larga escala, consistência estrita e resiliência a falhas bizantinas (Badge Âmbar `#f59e0b`).
- **Tópico Curricular:** `topic::<area>::<subtopico>` *(No mínimo 1 por card, ex: `topic::cs::architecture`, `topic::dsa::two-pointers`)*
- **Empresa / Foco de Entrevista:** `company::<empresa>` *(Opcional/Recomendado, ex: `company::amazon`, `company::meta`, `company::google`, `company::netflix`)*
- **Frequência em Entrevistas:** `freq::high` | `freq::medium` | `freq::low` *(Exatamente 1 por card)*

### 🆔 Convenção Determinística de IDs Canônicos
Para assegurar unicidade e rastreabilidade:
- Cada subtópico possui cartões numerados de `000` a `005` dedicados a conceitos canônicos, algoritmos e implementações L3/L4/L5 (ex: `CS-ARCH-CACHE-000` a `CS-ARCH-CACHE-005`).
- O cartão de nivelamento introdutório **L2 Foundations** recebe deterministamente o sufixo canônico `006` (ex: `CS-ARCH-CACHE-006`, ou `007` para subtópicos estendidos), garantindo indexação uniforme em todos os 108 subtópicos.

---

## 🎨 Arquitetura de Mídias Offline-First & Dual Coding Resiliente

O motor pedagógico adota uma arquitetura híbrida de alta resiliência, priorizando mídias autocontidas e offline-ready para que o baralho funcione com 100% de confiabilidade em viagens, deslocamentos ou modo avião:

### 1. Hierarquia Visual Implementada (Constituição v1.4.0)
- **SVGs Vetoriais Declarativos Inline (453 cards — 82.4% do acervo):**
  - Diagramas vetoriais embutidos diretamente no corpo dos cartões com `viewBox` responsivo, adaptando-se sem distorção ou quebra de layout de 360px a 4K.
  - Zero chamadas de rede externas, zero problemas de CORS e imunidade total a bit rot (links quebrados ao longo dos anos).
- **Animações & GIFs Locais Co-localizados (26 cards):**
  - Utilizados para transições dinâmicas (ex: operações de pilha/fila, particionamento quickselect, travessias em grafos).
  - Co-localizados nas pastas `assets/` e incorporados ao arquivo `.apkg` via `resolveMedia` no momento do build.
- **Micro-Vídeos & WebM/MP4 em Loop (Suporte de Motor Ativo):**
  - O pipeline de compilação em [generator.js](src/generator.js) conta com suporte nativo e injeção automática de atributos obrigatórios para WebViews móveis: `autoplay loop muted playsinline webkit-playsinline disableRemotePlayback`.
- **Tabelas Comparativas Estruturadas ($\le 3$ colunas):**
  - Presentes em 100% dos cartões para trade-offs rápidos e síntese de complexidades.

### 2. Resiliência de Layout & Degradação Graciosa (Zero Layout Shift)
- **Eliminação de Caixas Pretas:** Integração total dos containers de mídia com as variáveis de cor semântica do tema (`--bg-card`, `--border-color`).
- **Prevenção de Salto Visual (CLS):** Containers `.video-wrapper`, `.svg-wrapper` e `.media-container` contam com `min-height: 120px`, `aspect-ratio: 16/9` e `contain: layout style`.
- **Fallback Imediato:** Em qualquer dispositivo, a resposta direta (`Quick Answer`), a tabela comparativa e o diagrama renderizam instantaneamente sem bloqueio de renderização.

---

## 🏛️ Governança Curricular & Registro Central de Mídias

A consistência pedagógica do acervo adota o **Markdown como Única Fonte da Verdade (SSOT)**, derivando automaticamente dois catálogos centrais:

- **Manifesto Curricular Canônico (`syllabus_manifest.json`):** Rastreia os **550 cards** em **108 subtópicos** em 4 fases, gerado dinamicamente a partir da estrutura física de `decks/`.
- **Catálogo de Curadoria de Mídias (`media-curation-registry.json`):** Dicionário auto-sincronizado que audita e cataloga **100% dos 550 cards** cobrindo todas as Fases Técnicas 1 a 4, mapeando:
  - `card_id` e `subtopic_id`.
  - `concept` atômico indivisível e `tier` pedagógico (`P2_RESPONSIVE_SVG`, `LOCAL_ASSET`, `P2_TABLE_FALLBACK`).
  - Atribuição de autoria, licença de uso aberto (*MIT*, *Creative Commons*, *Public Domain*) e legenda didática em PT-BR.
- **Erradicação de Placeholders:** 100% dos cards livres de domínios fictícios (`assets.faang-anki.dev`, `example.com`, `localhost`).

---

## 📐 Contratos de Validação Automatizada

A qualidade e a integridade do baralho são asseguradas por três camadas complementares de validação:

### Camada 1: Validação Offline Determinística (`validator.js` / `npm test`)
| Regra | Requisito Validado |
|---|---|
| **ID Canônico** | Padrão `^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[0-9]{3}$` (ex: `CS-ARCH-CACHE-001`). |
| **Título** | String de 3 a 120 caracteres no Frontmatter YAML. |
| **Tags** | $\ge 3$ tags válidas (1 `level::*`, $\ge 1$ `topic::*`, 1 `freq::*` e opcionais `company::*`). |
| **Atomicidade Sintática** | No máximo uma interrogação na pergunta (`?`), proibindo cartões multipartes. |
| **Seções Estruturais** | Exatamente uma seção `## Pergunta` e uma seção `## Resposta`. |
| **Linguagens de Código** | Todo bloco ` ```lang ` deve declarar linguagem suportada (`go`, `java`, `python`, `sql`, etc.). |
| **Tabelas Mobile-First** | Máximo de 3 colunas por tabela e proibição de barras inquebráveis. |
| **Zero Placeholders** | Bloqueio estrito de domínios fictícios (`assets.faang-anki.dev`). |
| **Sincronização com Manifesto** | Validação bidirecional com `syllabus_manifest.json` (zero IDs órfãos). |

### Camada 2: Auditoria Semântica de Atomicidade (`atomic-decomposer.js` / `npm run audit:atomic`)
Auditor pedagógico avançado que detecta conectivos gramaticais compostos ("e como funciona...", "e por que...") no enunciado da pergunta, fornecendo diagnósticos e planos de decomposição para preservar a precisão do algoritmo de repetição espaçada.

### Camada 3: Auditoria de Links de Rede (`link-checker.js` / `npm run test:links`)
Auditor concorrente (pool de 8 workers, timeout de 5000ms e retentativas) que verifica a acessibilidade HTTP 200 e integridade de MIME types de eventuais links e mídias externas.

---

## 📚 Estrutura Curricular (4 Fases do Syllabus)

O projeto mapeia a jornada completa de preparação técnica em 4 fases definidas no `syllabus_manifest.json`:

1. **`01-dsa` — Estruturas de Dados & Algoritmos (210 cards)**
   - *Data Structures:* Arrays, Slices, LinkedLists, Stacks/Queues, Trees, Heaps, Trie, Hash Tables, Segment Trees, DSU.
   - *Algorithmic Patterns:* Two Pointers, Sliding Window, Binary Search, Monotonic Stack, Backtracking, DP, Greedy, Graphs (BFS/DFS, Dijkstra, Topological Sort).
2. **`02-cs-fundamentals` — Fundamentos da Ciência da Computação (120 cards)**
   - *Architecture:* Hierarquia de Memória, Caches L1/L2/L3, Cache Lines, False Sharing, Branch Prediction.
   - *OS & Concurrency:* Virtual Memory, Paging/TLB, Threads/Processes, Mutexes, Semaphores, Lock-Free, Atomics, I/O Multiplexing (epoll/kqueue).
   - *Discrete Math & Networking:* Lógica Booleana, Teoria dos Grafos, Bitwise Tricks, TCP/UDP, TLS, DNS, HTTP/2 e HTTP/3.
3. **`03-system-design-backend` — Engenharia de Sistemas & Backend Architecture (137 cards)**
   - *High-Level Design:* Escalabilidade horizontal, Load Balancers, Consistent Hashing, Rate Limiters, CAP Theorem, PACELC.
   - *Storage & Databases:* SQL vs NoSQL, Sharding, Replicação, Índices B-Tree/LSM, Níveis de Isolamento e Transações ACID.
   - *Distributed Systems & Messaging:* Mensageria/Streams (Kafka, RabbitMQ), Idempotência, Padrão Saga, Caching distribuído (Redis).
4. **`04-behavioral-engineering` — Cultura FAANG, Liderança & Engenharia (83 cards)**
   - *Leadership Principles & STAR:* Ownership, Customer Obsession, Deep Dive, Resolução de Conflitos e Post-Mortems de Incidentes.
   - *Observability & SRE:* Métricas, Logs, Traces Distribuídos, SLI/SLO/SLA, Error Budgets, Chaos Engineering e Gestão de Incidentes.
   - *Security & Deployment:* OWASP Backend Top 10, Zero Trust, Blue-Green, Canary Releases e Pirâmide de Testes.

---

## 📁 Estrutura do Repositório

```text
anki-generator/
├── decks/                                      # Repositório de conteúdo particionado (550 cards)
│   ├── 01-dsa/                                 # 210 cards
│   ├── 02-cs-fundamentals/                     # 120 cards
│   ├── 03-system-design-backend/               # 137 cards
│   └── 04-behavioral-engineering/              # 83 cards
├── src/
│   ├── generator.js                            # Pipeline de compilação e packaging .apkg (auto-sync SSOT)
│   ├── cli/                                    # Ferramentas CLI para authoring de conteúdo
│   │   └── new-card.js                         # Scaffolding instantâneo de novos cards
│   ├── e2e/                                    # Suíte de automação E2E e guardrails de layout
│   │   ├── orchestrator.js                     # CLI & orquestrador central do pipeline E2E
│   │   ├── local-runner.js                     # Runner local in-memory headless ultra-rápido (<1s)
│   │   ├── ankiweb-runner.js                   # Controlador Playwright do AnkiWeb e sessão de estudo
│   │   ├── guardrails.js                       # Assertions DOM/CSS (overflow 360px, touch target, KaTeX)
│   │   ├── sanity-sampler.js                   # Amostrador dinâmico cobrindo 100% das 8 tipologias
│   │   └── generate-baselines.js               # Gerador de snapshots golden para regressão visual
│   └── utils/
│       ├── manifest.js                         # Auto-indexador e gerador dinâmico de manifestos (SSOT)
│       ├── anki-connect.js                     # Cliente JSON-RPC Anki-Connect (import, sync, teardown)
│       ├── validator.js                        # Validador de esquemas, atomicidade e constituição
│       ├── link-checker.js                     # Auditor ativo de alcance HTTP 200 e MIME types
│       ├── media-catalog.js                    # Catálogo de mídias prioritárias e geradores SVG
│       ├── media-resolver.js                   # Extrator de mídias e reescritor de URLs
│       └── atomic-decomposer.js                # Auditoria e decomposição atômica de cards
├── test/
│   ├── validate-cards.test.js                  # Suíte automatizada de validação de esquemas e contratos
│   └── e2e/                                    # Testes Playwright e baselines de regressão visual
│       ├── e2e-guardrails.test.js              # Especificação de testes de regressão visual multi-viewport
│       └── baselines/                          # Screenshots golden de referência (360x640, 390x844, 1280x720)
├── reports/e2e/                                # Relatórios estruturados JSON e evidências de screenshots
├── playwright.config.js                        # Configuração multi-viewport do Playwright
├── media-curation-registry.json                 # Catálogo derivado de curadoria de mídias (550 cards)
├── link-health-report.json                      # Relatório de auditoria de links gerado
├── syllabus_manifest.json                      # Catálogo derivado de currículo e IDs (550 cards)
├── .env.example                                # Modelo de variáveis de ambiente para AnkiWeb
├── package.json
└── README.md
```

---

## 🚀 Como Executar, Testar e Compilar

### 1. Instalar Dependências & Navegadores Playwright
```bash
npm install
npx playwright install chromium
```

### 2. Executar Testes Automatizados de Validação (Offline)
Valida todos os 550 cards contra os esquemas da constituição, atomicidade sintática, tags obrigatórias, cabeçalhos, tabelas responsivas, resolução de imagens e integridade do catálogo curricular:
```bash
npm test
```

### 3. Fast Local Component Runner (Feedback Instantâneo < 1s)
Executa em memória via Playwright headless a verificação completa de guardrails visuais e DOM em cards representativos de **100% das 8 tipologias**, com **0 dependências externas** (sem necessidade de Anki Desktop aberto ou credenciais de rede):
```bash
npm run test:e2e:local
```
**Guardrails Auditados:**
- 📐 **Zero Overflow a 360px:** `scrollWidth === clientWidth` em telas móveis estreitas.
- 👆 **Touch Target $\ge 44$px:** Elementos interativos `<details><summary>` com área para toque confortável (*fat-finger proof*).
- 🎨 **Dark Modern Tokens:** Realce sintático pré-compilado sem JavaScript em runtime.
- 🔢 **Zero KaTeX Errors:** Fórmulas matemáticas livres da classe `.katex-error`.
- 📊 **SVGs & Tabelas:** SVGs com `viewBox` responsivo e tabelas compactas $\le 3$ colunas.

### 4. Scaffolding Instantâneo de Novos Cards (CLI)
Cria novos cards padronizados diretamente no subtópico desejado com frontmatter válido, blocos de Pergunta/Resposta, SVG Dark responsivo e `<details>`, auto-sincronizando o manifesto:
```bash
npm run card:new -- --phase=01-dsa --module=data-structures --subtopic=arrays-strings --id=DSA-STRUCT-ARRAY-007 --title="Dois Ponteiros Avançados"
```

### 5. Sincronização Dinâmica de Manifestos (SSOT)
Gera e sincroniza `syllabus_manifest.json` e `media-curation-registry.json` a partir dos arquivos Markdown em `decks/` em ~40ms (também executado automaticamente ao rodar `npm run build`):
```bash
npm run manifest:sync
```

### 6. Auditoria Semântica de Atomicidade de Perguntas
Analisa a estrutura gramatical das perguntas em busca de conectivos compostos e projeta cenários de decomposição uniconceitual:
```bash
npm run audit:atomic
```

### 7. Full AnkiWeb E2E Pipeline (Validação em Nuvem)
Executa o ciclo completo end-to-end:
1. Amostragem dinâmica de baralho de sanidade (`MAANG_E2E_Sanity.apkg`).
2. Importação e sincronização com AnkiWeb via Anki-Connect.
3. Autenticação segura no AnkiWeb com persistência de sessão em `.auth/ankiweb-session.json`.
4. Navegação automatizada no navegador (frente/verso de cada card) e comparação de regressão visual com imagens golden baselines.
5. Geração de relatório JSON em `reports/e2e/e2e-report.json`.

```bash
npm run test:e2e
```

#### Flags e Opções da CLI:
| Flag | Descrição | Padrão |
|---|---|---|
| `--cleanup` | Deleta o baralho de teste `MAANG_E2E_Sanity` do Anki Desktop e sincroniza com AnkiWeb ao final | `false` (preserva baralho) |
| `--no-cleanup` | Preserva explicitamente o baralho de sanidade para inspeção manual | `true` |
| `--headed` | Executa o Playwright com navegador visível para acompanhar cliques e transições | `false` (headless) |
| `--update-snapshots` | Atualiza os screenshots de referência golden em `test/e2e/baselines/` | `false` |
| `--phase <fase>` | Filtra a amostragem para uma fase específica (ex: `--phase 01-dsa`) | Todas as fases |
| `--sample-count <n>` | Quantidade de cards amostrados para o baralho de sanidade (1 a 50) | `8` |
| `--report-dir <dir>` | Diretório para saída do relatório estruturado e capturas de tela | `reports/e2e` |
| `-h, --help` | Exibe o menu de ajuda da CLI com todas as opções | — |

### 6. Suíte Playwright de Regressão Visual Multi-Viewport
Executa testes de regressão visual multi-resolução (`mobile-small` 360x640, `mobile-standard` 390x844, `desktop-hd` 1280x720) contra todos os 110 baselines de referência:
```bash
npx playwright test
```

### 7. Auditoria de Links e Mídias de Rede
Audita ativamente eventuais URLs externas na internet garantindo HTTP 200 e integridade de MIME types:
```bash
npm run test:links
```

### 8. Compilar o Baralho Consolidado Master
```bash
npm run build
```
Gera `MAANG_Engineering_Mastery.apkg` na raiz do projeto contendo todos os 550 cards e mídias embutidas (< 10MB, compilação em < 5s).

### 9. Compilar Baralhos Modulares por Fase
```bash
node src/generator.js --phase 01-dsa
node src/generator.js --phase 02-cs-fundamentals
node src/generator.js --phase 03-system-design-backend
node src/generator.js --phase 04-behavioral-engineering
```
Gera os arquivos `.apkg` modulares correspondentes na raiz para sincronizações parciais.

### 10. Como Importar no Anki
1. Abra o **Anki** no desktop ou aplicativo móvel (*AnkiDroid* / *AnkiMobile*).
2. Clique em **Arquivo -> Importar** (ou abra diretamente o arquivo `.apkg` no celular).
3. O baralho será importado com todos os estilos mobile-first, tags hierárquicas, badges coloridos por senioridade, realce sintático Dark Modern e diagramas vetoriais SVG perfeitamente escaláveis.

---

## 🛠️ Diagnóstico & Resolução de Problemas (Troubleshooting)

### 1. Erro de Conexão com Anki-Connect (`ECONNREFUSED` na porta 8765)
Se o Anki Desktop não estiver em execução ou o complemento Anki-Connect estiver inativo, o orquestrador aborta com instruções claras:
```text
❌ Anki-Connect Connection Error (ECONNREFUSED)
   Unable to connect to Anki-Connect at http://127.0.0.1:8765.

Resolution Steps:
   1. Ensure Anki Desktop is running on this machine.
   2. Verify that add-on 'Anki-Connect' (code 2055492159) is enabled (Tools -> Add-ons).
   3. Check that no firewall or antivirus is blocking port 8765.
```

### 2. Autenticação & Renovação de Sessão AnkiWeb
- As credenciais de login são lidas do arquivo `.env` (`ANKIWEB_USER` e `ANKIWEB_PASSWORD`).
- A sessão e os cookies autenticados são cacheados em `.auth/ankiweb-session.json`.
- Caso os cookies expirem, o runner realiza login automático de forma transparente e atualiza o arquivo de sessão.

### 3. Divergências em Snapshots Visuais (Visual Diff Mismatch)
Se houver alterações intencionais de CSS ou layout que causem falhas nos testes de regressão visual:
1. Inspecione as imagens de diferença em `reports/e2e/screenshots/*-diff.png`.
2. Após validar as mudanças de design, atualize os baselines com:
   ```bash
   npm run test:e2e -- --update-snapshots
   ```
   ou
   ```bash
   npx playwright test --update-snapshots
   ```
