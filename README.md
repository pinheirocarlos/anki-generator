# 🥋 Anki Generator — MAANG Engineering Mastery Engine

> Motor pedagógico e baralho definitivo focado em micro-learning para transformar engenheiros de software backend em candidatos preparados para entrevistas L2/L3/L4/L5+ nas principais Big Techs (*Meta, Amazon, Apple, Netflix, Google*).

---

## 🎯 Visão Geral & Filosofia Pedagógica

- **Público-Alvo:** Engenheiros de software backend com foco em entrevistas técnicas globais e nivelamento de fundamentos.
- **Plataforma Principal:** Mobile-first (*AnkiDroid*, *AnkiMobile* e *AnkiWeb*).
- **Carga de Estudo:** ~2 horas semanais em momentos de deslocamento/ociosidade (micro-learning de 15 a 90 segundos por card).
- **Engenharia Pedagógica (Governança da Constituição v1.4.0):**
  - **Atomicidade Estrita:** Cada flashcard avalia exatamente 1 conceito indivisível com tempo de resposta mental estimado em <30 segundos. Perguntas compostas são estritamente proibidas e decompostas em cartões atômicos uniconceituais.
  - **Dual Coding Visual Multi-Tier & Micro-Vídeos:** Todo conceito complexo possui um recurso visual de alto impacto seguindo a hierarquia de 3 níveis: (1) Mídias consagradas/animações e micro-vídeos em loop (`<video autoplay loop muted playsinline>`) na Web/CDN via HTTPS, (2) Visual declarativo com SVGs responsivos (`viewBox`) ou tabelas compactas $\le 3$ colunas, ou (3) Fluxo híbrido com diagramas textuais e tabelas comparativas.
  - **Nível L2 Foundations (Primeiros Princípios):** 100% dos subtópicos contam com cartão de nivelamento (`level::l2-fundamental`) usando analogias do mundo real e intuição física antes da formalização matemática/algorítmica.
  - **Progressive Disclosure:** Resposta imediata com badges de complexidade ($O(N)$, $O(1)$) visíveis em <15s, e aprofundamentos técnicos/código isolados no componente sanfona `<details><summary>Deep Dive & Walkthrough</summary>` (área de toque mínima de 44px).
  - **Template Unificado:** Arquitetura de nota sem duplicação de `{{FrontSide}}`, combinando contexto compacto da pergunta e resposta fluida em um único container estilizado.
  - **Bilinguismo Estratégico:** Prosa explicativa em PT-BR didático e termos técnicos, nomes de algoritmos e jargões mantidos em Inglês (`code`).
  - **Código Mobile-Ready & Syntax Highlighting Estático:** Snippets pré-compilados em tempo de build com `highlight.js` (tema *Dark Modern*), com quebras de linha automáticas (`pre code { white-space: pre-wrap; word-break: break-word; }`) sem rolagem horizontal no celular (≥360px) e **zero JavaScript em runtime**.
  - **Static Engine & Online-Enhanced Media:** Motor de renderização e CSS 100% estáticos com suporte a mídias de alta resolução e micro-vídeos remotos via HTTPS, mantendo o `.apkg` leve e escalável.

---

## 📊 Métricas & Estatísticas do Baralho

| Métrica | Quantidade | Observações |
|---|---|---|
| **Total de Flashcards Atômicos** | **550 cards** | 100% em conformidade com a Constituição v1.4.0 |
| **Subtópicos Curriculares** | **108 subtópicos** | Cobertura integral em 4 fases curriculares |
| **Foundations (L2)** | **108 cards** | 1 card introdutório com analogia por subtópico |
| **Junior / Standard (L3)** | **229 cards** | Conceitos fundamentais e padrões de implementação |
| **Pleno / Advanced (L4)** | **210 cards** | Trade-offs, otimizações e cenários de produção |
| **Senior / Staff (L5)** | **3 cards** | Arquiteturas avançadas e falhas bizantinas |
| **Cards com Micro-Vídeos** | **371 cards** | Animações em loop `<video>` via CDN HTTPS |
| **Cards com Diagramas SVG** | **108 cards** | Vetores responsivos com `viewBox` |
| **Deep Dives Expansíveis** | **550 cards** | `<details>` sanfona com área de toque $\ge 44$px |

---

## 🏗️ Anatomia de um Flashcard

Cada cartão é um arquivo Markdown isolado localizado na estrutura granular de subtópicos:
`decks/<fase_id>/<modulo>/<subtopico>/<card_id>.md`

Mídias locais e diagramas ficam co-localizados em:
`decks/<fase_id>/<modulo>/<subtopico>/assets/<asset_name>.<svg|png|jpg>`

### Exemplo 1: Card Foundations (`CS-ARCH-CACHE-000.md`)

```markdown
---
id: CS-ARCH-CACHE-000
title: "Fundamentos de Cache de CPU e Analogia da Mesa de Trabalho"
tags:
  - level::l2-fundamental
  - topic::cs::architecture
  - company::general
  - freq::high
---

## Pergunta
Qual é a analogia do mundo real que explica a diferença de velocidade entre os **Caches de CPU (L1/L2/L3)** e a **Memória RAM Principal**?

## Resposta
### Quick Answer
- **Caches de CPU (L1/L2/L3)** funcionam como os **papeis diretamente sobre a sua mesa de trabalho** ou nas gavetas imediatas (acesso instantâneo em segundos).
- **Memória RAM Principal** funciona como o **armário de arquivos no final do corredor** (acesso muito mais lento, exigindo levantar e caminhar).
- **SSD / Disco** funciona como a **biblioteca pública em outra cidade** (ordens de magnitude mais distante).

### Dual Coding Visual
| Nível de Memória | Analogia Física | Tempo Relativo Humano |
|---|---|---|
| **L1/L2 Cache** | Folha na mesa / gaveta | 1 a 5 segundos |
| **L3 Cache** | Estante na mesma sala | 15 a 30 segundos |
| **RAM Principal** | Armário no corredor | 2 a 5 minutos |
| **NVMe SSD / HD** | Biblioteca em outra cidade | Dias a semanas |

<details>
<summary>Deep Dive & Walkthrough</summary>
...
</details>
```

### Exemplo 2: Card Padrão Atômico (`CS-ARCH-CACHE-001.md`)

```markdown
---
id: CS-ARCH-CACHE-001
title: "Hierarquia de Latência de Caches (L1, L2, L3) vs RAM Principal"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a ordem de grandeza de **latência de acesso** aos diferentes níveis de memória da CPU (`L1`, `L2`, `L3`) em comparação com a `RAM Principal` (DRAM), e por que essa discrepância é crítica no design de software de alta performance?

## Resposta
### Quick Answer
**Solução Direta**:
- **L1 Cache**: ~1 ns (3–4 ciclos de clock)
- **L2 Cache**: ~3–5 ns (~14 ciclos de clock)
- **L3 Cache**: ~10–20 ns (~50 ciclos de clock)
- **RAM Principal (DRAM)**: ~60–100 ns (~200 ciclos de clock — ~100x mais lenta que L1)

### Dual Coding Visual
| Memória | Latência | Escala Relativa |
|---|---|---|
| **L1 Cache** | ~1 ns (4 ciclos) | 1x (Referência) |
| **L2 Cache** | ~4 ns (14 ciclos) | 4x mais lento |
| **L3 Cache** | ~15 ns (50 ciclos) | 15x mais lento |
| **RAM (DRAM)** | ~100 ns (200 ciclos) | 100x mais lento |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Impacto em Sistemas de Alta Performance & Big Techs
Em entrevistas para posições de backend e sistemas distribuídos de alta vazão (Low-Latency / High-Throughput), a latência de memória dita a eficiência de estruturas de dados:
- Estruturas baseadas em nós encadeados (`LinkedList`, árvores com ponteiros arbitrários) causam frequentes `Cache Misses` porque cada pulo de ponteiro exige buscar dados dispersos na DRAM.
- Estruturas baseadas em arrays contíguos (`Vector`, `Slice`, `RingBuffer`) aproveitam o prefetcher de hardware e a localidade espacial das `Cache Lines`.

#### Go Benchmark Conceptual Pattern
```go
// Array contíguo: cache-friendly (acessos sequenciais)
func sumContiguous(arr []int64) int64 {
  var sum int64
  for i := 0; i < len(arr); i++ {
    sum += arr[i]
  }
  return sum
}
```

#### Key Takeaways
- **Mechanical Sympathy**: Projetar structs contíguas compactas maximiza a densidade de dados nos caches `L1/L2`.
- **Latency Numbers Every Programmer Should Know**: Ter essas ordens de grandeza decoradas é padrão exigido em rodadas de System Design e Low-Level Coding.

</details>
```

---

## 🏷️ Taxonomia de Tags Obrigatória

O baralho adota arquitetura plana no Anki (sem sub-decks aninhados para preservar o algoritmo de repetição espaçada). A segmentação e filtragem dinâmica de estudo dá-se exclusivamente por tags no frontmatter:

- **Nível de Senioridade / Profundidade:** *(Exatamente 1 por card)*
  - `level::l2-fundamental` — Foundations, analogias físicas e intuição do zero aos primeiros princípios (Badge Esmeralda `#10b981`).
  - `level::l3-junior` — Conceitos canônicos, algoritmos básicos e complexidades assintóticas $O(N)$ (Badge Azul `#3b82f6`).
  - `level::l4-pleno` — Trade-offs arquiteturais, otimização de memória e cenários de alta concorrência (Badge Roxo `#8b5cf6`).
  - `level::l5-senior` — Sistemas distribuídos em larga escala, consistência estrita e resiliência a falhas bizantinas (Badge Âmbar `#f59e0b`).
- **Tópico Curricular:** `topic::<area>::<subtopico>` *(No mínimo 1 por card, ex: `topic::cs::architecture`, `topic::dsa::two-pointers`)*
- **Empresa / Foco de Entrevista:** `company::<empresa>` *(Opcional/Recomendado, ex: `company::amazon`, `company::meta`, `company::google`, `company::netflix`)*
- **Frequência em Entrevistas:** `freq::high` | `freq::medium` | `freq::low` *(Exatamente 1 por card)*

---

---

## 🎨 Arquitetura de Mídias Online-Enhanced & Dual Coding Resiliente

O motor pedagógico adota o conceito de **Online-Enhanced Multimedia Architecture**, combinando máxima riqueza visual com empacotamento ultraleve e resiliência total contra falhas de rede:

### 1. Hierarquia Visual Multi-Tier (Constituição v1.4.0)
- **Tier P1 — Micro-Vídeos & Animações em Loop (Processos Dinâmicos):**
  - Utilizado para transições temporais de estado (ex: rotações em árvores AVL, balanceamento Raft, handshake TCP).
  - Executados via tags `<video>` com atributos móveis obrigatórios: `autoplay loop muted playsinline webkit-playsinline disableRemotePlayback`.
  - Hospedados em fontes públicas e CDNs seguras via HTTPS com código de resposta HTTP `200 OK`.
- **Tier P2 — SVGs Responsivos Declarativos (Estruturas Estáticas):**
  - Utilizado para topologias de memória, grafos, esquemas conceituais e nós de dados.
  - Implementados com `viewBox` escalável para ajuste perfeito em qualquer largura de tela sem rolagem horizontal.
- **Tier P2 — Tabelas Comparativas Estruturadas ($\le 3$ colunas):**
  - Utilizado para trade-offs diretos (ex: Latência L1 vs DRAM, Paxos vs Raft).

### 2. Resiliência de Layout & Degradação Graciosa (Zero Layout Shift)
- **Eliminação de Caixas Pretas:** Remoção de `background-color: #000`, adotando transparência e integração total com as variáveis semânticas do tema (`--bg-card`, `--border-color`).
- **Prevenção de Salto Visual (CLS):** Containers `.video-wrapper` e `.media-container` contam com `min-height: 120px`, `aspect-ratio: 16/9` e `contain: layout style`.
- **Fallback Imediato:** Em redes lentas ou offline, a resposta direta (`Quick Answer`), a tabela comparativa e a legenda didática renderizam instantaneamente sem bloqueio de renderização.

---

## 🏛️ Padrões de Curadoria Pública & Registro Central (`media-curation-registry.json`)

Toda mídia utilizada no currículo passa por auditoria e catalogação rigorosa:

- **Atomicidade Visual Estrita:** Cada diagrama ou animação retrata exclusivamente o conceito atômico daquele flashcard específico (zero imagens genéricas ou meramente ilustrativas).
- **Catálogo Canônico (`media-curation-registry.json`):** Dicionário estruturado que rastreia os 550 cards, mapeando:
  - `card_id` canônico e `subtopic_id`.
  - `concept` indivisível e `tier` pedagógico (`P1_MICRO_VIDEO`, `P2_RESPONSIVE_SVG`, `P2_TABLE_FALLBACK`, `LOCAL_ASSET`).
  - `url` pública segura HTTPS e `media_type` validado.
  - `attribution` da fonte original e `license` de uso aberto (*Creative Commons*, *MIT*, *Public Domain*).
  - `caption` explicativa em PT-BR contextualizando os termos técnicos.
- **Erradicação de Placeholders:** 100% dos cards livres de domínios fictícios (`assets.faang-anki.dev`, `example.com`, `localhost`).

---

## 📐 Contratos de Validação Automatizada (`validator.js` & `link-checker.js`)

A qualidade do baralho é garantida por duas camadas complementares de validação:

### Camada 1: Validação Offline Determinística (`validator.js` / `npm test`)
| Regra | Requisito Validado |
|---|---|
| **ID Canônico** | Padrão `^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[0-9]{3}$` (ex: `CS-ARCH-CACHE-001`). |
| **Título** | String de 3 a 120 caracteres no Frontmatter YAML. |
| **Tags** | $\ge 3$ tags válidas (1 `level::*`, $\ge 1$ `topic::*`, 1 `freq::*` e opcionais `company::*`). |
| **Atomicidade de Pergunta** | Exatamente uma interrogação e proibição de conectivos compostos. |
| **Seções Estruturais** | Exatamente uma seção `## Pergunta` e uma seção `## Resposta`. |
| **Linguagens de Código** | Todo bloco ` ```lang ` deve declarar linguagem suportada (`go`, `java`, `python`, `sql`, etc.). |
| **Tabelas Mobile-First** | Máximo de 3 colunas por tabela e proibição de barras inquebráveis. |
| **Zero Placeholders** | Bloqueio estrito de domínios fictícios (`assets.faang-anki.dev`). |
| **Sincronização com Manifesto** | Validação bidirecional com `syllabus_manifest.json` (zero IDs órfãos). |

### Camada 2: Auditoria Ativa de Links de Rede (`link-checker.js` / `npm run test:links`)
| Recurso | Especificação |
|---|---|
| **Pool de Concorrência** | 8 workers simultâneos para verificação de alta vazão. |
| **Timeout Individual** | 5000ms por requisição HTTP. |
| **Política de Retentativas** | Até 2 retentativas com backoff em erros transitórios (429 / 5xx / timeout). |
| **Identificação HTTP** | Cabeçalho `User-Agent: FAANG-Anki-LinkChecker/1.0`. |
| **Relatório Estruturado** | Emissão do arquivo `link-health-report.json` com latências, status e MIME types. |

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
│   ├── generator.js                            # Pipeline de compilação e packaging .apkg
│   └── utils/
│       ├── validator.js                        # Validador de esquemas, atomicidade e constituição
│       ├── link-checker.js                     # Auditor ativo de alcance HTTP 200 e MIME types
│       ├── media-catalog.js                    # Catálogo de mídias prioritárias e geradores SVG
│       ├── media-resolver.js                   # Extrator de mídias e reescritor de URLs
│       └── atomic-decomposer.js                # Auditoria e decomposição atômica de cards
├── test/
│   └── validate-cards.test.js                  # Suíte automatizada de testes e schemas
├── media-curation-registry.json                 # Catálogo canônico central de curadoria de mídias
├── link-health-report.json                      # Relatório de auditoria de links gerado
├── syllabus_manifest.json                      # Catálogo central de currículo e IDs (550 cards)
├── package.json
└── README.md
```

---

## 📋 Catálogo Curricular (`syllabus_manifest.json`)

Para viabilizar a escalabilidade para centenas de cards sem duplicações:
1. O arquivo `syllabus_manifest.json` rastreia o status de cada subtópico (`completed`) e lista seus `card_ids`.
2. Todo card possui um ID canônico determinístico (ex: `CS-ARCH-CACHE-000` para L2, `CS-ARCH-CACHE-001` a `006` para L3/L4/L5).
3. O script de teste valida a sincronização bidirecional entre o manifesto e os arquivos no disco.

---

## 🚀 Como Executar, Testar e Compilar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar Testes Automatizados de Validação (Offline)
Valida todos os 550 cards contra os esquemas da constituição, atomicidade de perguntas, tags obrigatórias, cabeçalhos, tabelas responsivas, resolução de imagens/vídeos e catálogo curricular:
```bash
npm test
```

### 3. Executar Auditoria Ativa de Mídias Públicas (Online)
Audita ativamente todas as URLs de mídias na internet garantindo HTTP 200 e MIME types válidos:
```bash
# Auditar todos os decks do repositório
npm run test:links

# Auditar lotes curriculares individuais
node src/utils/link-checker.js --deck decks/01-dsa
node src/utils/link-checker.js --deck decks/02-cs-fundamentals
node src/utils/link-checker.js --deck decks/03-system-design-backend

# Executar com opções customizadas de concorrência e relatório
node src/utils/link-checker.js --concurrency 8 --timeout 5000 --retries 2 --report link-health-report.json
```

### 4. Compilar o Baralho Consolidado Master
```bash
npm run build
```
Gera `MAANG_Engineering_Mastery.apkg` na raiz do projeto contendo todos os 550 cards e mídias embutidas (< 50MB, compilação em < 5s).

### 5. Compilar Baralhos Modulares por Fase
```bash
node src/generator.js --phase 01-dsa
node src/generator.js --phase 02-cs-fundamentals
node src/generator.js --phase 03-system-design-backend
node src/generator.js --phase 04-behavioral-engineering
```
Gera os arquivos `.apkg` modulares correspondentes na raiz para sincronizações parciais.

### 6. Como Importar no Anki
1. Abra o **Anki** no desktop ou aplicativo móvel (*AnkiDroid* / *AnkiMobile*).
2. Clique em **Arquivo -> Importar** (ou abra diretamente o arquivo `.apkg` no celular).
3. O baralho será importado com todos os estilos mobile-first, tags hierárquicas, badges coloridos por senioridade, realce sintático Dark Modern e mídias 100% responsivas e resilientes.
