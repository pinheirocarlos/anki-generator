# 🥋 Anki Generator — MAANG Engineering Mastery Engine

> Motor pedagógico e baralho definitivo focado em micro-learning para transformar engenheiros de software backend em candidatos preparados para entrevistas L3/L4/L5+ nas principais Big Techs (*Meta, Amazon, Apple, Netflix, Google*).

---

## 🎯 Visão Geral & Filosofia Pedagógica

- **Público-Alvo:** Engenheiros de software backend com foco em entrevistas técnicas globais.
- **Plataforma Principal:** Mobile-first (*AnkiDroid*, *AnkiMobile* e *AnkiWeb*).
- **Carga de Estudo:** ~2 horas semanais em momentos de deslocamento/ociosidade (micro-learning de 15 a 90 segundos por card).
- **Engenharia Pedagógica (Governança da Constituição v1.4.0):**
  - **Dual Coding Visual Multi-Tier & Micro-Vídeos:** Todo conceito complexo possui um recurso visual de alto impacto seguindo a hierarquia de 3 níveis: (1) Mídias consagradas/animações e micro-vídeos em loop (`<video autoplay loop muted playsinline>`) na Web/CDN, (2) Visual declarativo com SVGs responsivos (`viewBox`) ou tabelas compactas $\le 3$ colunas, ou (3) Fluxo híbrido com prompt gerado pela IA.
  - **Progressive Disclosure:** Resposta imediata com badges de complexidade ($O(N)$, $O(1)$) visíveis em <15s, e aprofundamentos técnicos/código isolados no componente sanfona `<details><summary>Deep Dive & Walkthrough</summary>` (área de toque mínima de 44px).
  - **Template Unificado:** Arquitetura de nota sem duplicação de `{{FrontSide}}`, combinando contexto compacto da pergunta e resposta fluida em um único container estilizado.
  - **Bilinguismo Estratégico:** Prosa explicativa em PT-BR didático e termos técnicos, nomes de algoritmos e jargões mantidos em Inglês (`code`).
  - **Código Mobile-Ready & Syntax Highlighting Estático:** Snippets pré-compilados em tempo de build com `highlight.js` (tema *Dark Modern*), com quebras de linha automáticas (`pre code { white-space: pre-wrap; word-break: break-word; }`) sem rolagem horizontal no celular (≥360px) e **zero JavaScript em runtime**.
  - **Static Engine & Online-Enhanced Media:** Motor de renderização e CSS 100% estáticos com suporte a mídias de alta resolução e micro-vídeos remotos via HTTPS, mantendo o `.apkg` leve e escalável.

---

## 🏗️ Anatomia de um Flashcard

Cada cartão é um arquivo Markdown isolado localizado na estrutura granular de subtópicos:
`decks/<fase_id>/<modulo>/<subtopico>/<card_id>.md`

Mídias locais e diagramas ficam co-localizados em:
`decks/<fase_id>/<modulo>/<subtopico>/assets/<asset_name>.<svg|png|jpg>`

### Exemplo de Card Padrão (`CS-ARCH-CACHE-001.md`)

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

- `level::l3-junior` | `level::l4-pleno` | `level::l5-senior` *(Exatamente 1 por card)*
- `topic::<area>::<subtopico>` *(No mínimo 1 por card, ex: `topic::cs::architecture`, `topic::dsa::two-pointers`)*
- `company::<empresa>` *(Opcional/Recomendado, ex: `company::amazon`, `company::meta`, `company::google`)*
- `freq::high` | `freq::medium` | `freq::low` *(Exatamente 1 por card)*

---

## 📐 Contratos de Validação Automatizada (`validator.js`)

A suíte de testes (`npm test`) aplica verificações estritas em cada flashcard antes da compilação:

| Regra | Requisito Validado |
|---|---|
| **ID Canônico** | Deve seguir o padrão `^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[0-9]{3}$` (ex: `CS-ARCH-CACHE-001`). |
| **Título** | String de 3 a 120 caracteres no Frontmatter YAML. |
| **Tags** | Array com $\ge 3$ tags válidas (1 `level`, $\ge 1$ `topic`, 1 `freq` e opcionais `company`). |
| **Seções** | Exatamente uma seção `## Pergunta` e uma seção `## Resposta`. |
| **Linguagens de Código** | Todo bloco ` ```lang ` deve declarar uma linguagem suportada (`go`, `java`, `python`, `sql`, `bash`, `rust`, `cpp`, `ts`, `js`, etc.). |
| **Tabelas Mobile-First** | Máximo de 3 colunas por tabela e proibição de sequências longas de caracteres inquebráveis (`████...`). |
| **Resolução de Assets & Vídeos** | Toda mídia local em `assets/...` deve existir no disco; mídias remotas e vídeos devem usar protocolo seguro `https://`. |
| **Sincronização com Manifesto** | Validação bidirecional estrita com `syllabus_manifest.json` (sem IDs órfãos ou duplicados). |

---

## 📚 Estrutura Curricular (4 Fases do Syllabus)

O projeto mapeia a jornada completa de preparação técnica em 4 fases definidas no `syllabus_manifest.json`:

1. **`01-dsa` — Estruturas de Dados & Algoritmos (LeetCode Patterns)**
   - *Data Structures:* Arrays, Slices, LinkedLists, Stacks/Queues, Trees, Heaps, Trie, Hash Tables, Segment Trees, DSU.
   - *Algorithmic Patterns:* Two Pointers, Sliding Window, Binary Search, Monotonic Stack, Backtracking, DP, Greedy, Graphs (BFS/DFS, Dijkstra, Topological Sort).
2. **`02-cs-fundamentals` — Fundamentos da Ciência da Computação**
   - *Architecture:* Hierarquia de Memória, Caches L1/L2/L3, Cache Lines, False Sharing, Branch Prediction.
   - *OS & Concurrency:* Virtual Memory, Paging/TLB, Threads/Processes, Mutexes, Semaphores, Lock-Free, Atomics, I/O Multiplexing (epoll/kqueue).
   - *Discrete Math & Networking:* Lógica Booleana, Teoria dos Grafos, Bitwise Tricks, TCP/UDP, TLS, DNS, HTTP/2 e HTTP/3.
3. **`03-system-design-backend` — Engenharia de Sistemas & Backend Architecture**
   - *High-Level Design:* Escalabilidade horizontal, Load Balancers, Consistent Hashing, Rate Limiters, CAP Theorem, PACELC.
   - *Storage & Databases:* SQL vs NoSQL, Sharding, Replicação, Índices B-Tree/LSM, Níveis de Isolamento e Transações ACID.
   - *Distributed Systems & Messaging:* Mensageria/Streams (Kafka, RabbitMQ), Idempotência, Padrão Saga, Caching distribuído (Redis).
4. **`04-behavioral-engineering` — Cultura FAANG, Liderança & Engenharia**
   - *Leadership Principles & STAR:* Ownership, Customer Obsession, Deep Dive, Resolução de Conflitos e Post-Mortems de Incidentes.

---

## 📁 Estrutura do Repositório

```text
anki-generator/
├── decks/                                      # Repositório de conteúdo particionado
│   └── 02-cs-fundamentals/                    # Fase curricular
│       ├── architecture/                       # Módulo
│       │   └── cpu-cache/                      # Subtópico granular
│       │       ├── CS-ARCH-CACHE-001.md        # Flashcards individuais
│       │       ├── CS-ARCH-CACHE-002.md
│       │       ├── CS-ARCH-CACHE-003.md
│       │       └── assets/                     # Mídias locais co-localizadas
│       │           └── CS-ARCH-CACHE-002.svg
│       ├── discrete-math/
│       │   └── boolean-logic/
│       │       ├── CS-MATH-BOOL-001.md
│       │       └── CS-MATH-BOOL-002.md
│       └── os-memory/
│           └── virtual-memory/
│               ├── CS-OS-VMEM-001.md
│               └── assets/
│                   └── CS-OS-VMEM-001.svg
├── src/
│   ├── generator.js                            # Pipeline de compilação e packaging .apkg
│   └── utils/
│       ├── validator.js                        # Validador de esquemas e constituição
│       └── media-resolver.js                   # Extrator de mídias e reescritor de URLs
├── test/
│   └── validate-cards.test.js                  # Suíte automatizada de testes
├── syllabus_manifest.json                      # Catálogo central de currículo e IDs
├── package.json
└── README.md
```

---

## 📋 Catálogo Curricular (`syllabus_manifest.json`)

Para viabilizar a escalabilidade para milhares de cards sem duplicações:
1. O arquivo `syllabus_manifest.json` rastreia o status de cada subtópico (`pending`, `in_progress`, `completed`) e lista seus `card_ids`.
2. Todo card possui um ID canônico determinístico (ex: `CS-ARCH-CACHE-001`).
3. O script de teste valida a sincronização bidirecional entre o manifesto e os arquivos no disco.

---

## 🚀 Como Executar, Testar e Compilar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar Testes Automatizados de Validação
Valida todos os cards contra os esquemas da constituição, tags obrigatórias, cabeçalhos, tabelas responsivas, resolução de imagens e catálogo curricular:
```bash
npm test
```

### 3. Compilar o Baralho Consolidado Master
```bash
npm run build
```
Gera `MAANG_Engineering_Mastery.apkg` na raiz do projeto contendo todos os cards e mídias embutidas.

### 4. Compilar Baralho Modular por Fase
```bash
node src/generator.js --phase 02-cs-fundamentals
```
Gera `MAANG_02-cs-fundamentals.apkg` na raiz para sincronizações modulares.

### 5. Como Importar no Anki
1. Abra o **Anki** no desktop ou aplicativo móvel (*AnkiDroid* / *AnkiMobile*).
2. Clique em **Arquivo -> Importar** (ou abra diretamente o arquivo `.apkg` no celular).
3. O baralho será importado com todos os estilos mobile-first, tags hierárquicas, realce sintático Dark Modern e mídias embutidas 100% offline.
