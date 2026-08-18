<!--
Sync Impact Report:
- Version change: 1.3.0 -> 1.4.0
- List of modified principles:
  - Principle I (Dual Coding, Multi-Tier Visual Pedagogy & Micro-Videos): Established strict 3-tier visual priority (P1: Web/CDN High-Impact Media/Videos > P2: Declarative SVG/Tables > P3: Hybrid User Prompt). Added mobile-ready looping video standard.
  - Principle II (Progressive Disclosure, Single-Concept Atomicity & Unified Card Architecture): Enforces strict single-concept atomicity (max 1 question per card, <30s evaluation, <15s quick answer reading) to preserve spaced repetition algorithm integrity.
  - Principle IV (Strict Tag Hierarchy & Flat Deck Architecture): Added level::l2-fundamental to formal tag taxonomy.
  - Principle V (Static-Engine & Online-Enhanced Media): Preserves 100% static CSS, Highlight.js, and KaTeX compilation while allowing high-performance remote HTTPS media assets and micro-videos.
  - Principle VI (First-Principles & Entry-Level Pedagogy): Expanded into 3 pedagogical layers (L2: Intuição/Fundamentos -> L3: Mecânica/Complexidade -> L4/L5: Implementação/Arquitetura).
- Added sections: Micro-video mobile specifications (<video autoplay loop muted playsinline>) and Question Atomicity rules.
- Removed sections: Absolute prohibition of external HTTPS media assets.
- Follow-up TODOs: Update validator.js, media-resolver.js, and generator.js.
-->

# FAANG Anki Deck Constitution

## Core Principles

### I. Dual Coding, Multi-Tier Visual Pedagogy & Micro-Videos (NON-NEGOTIABLE)
Todos os conceitos complexos (como rastreio de algoritmos, estruturas de dados, diagramas de rede, arquitetura de sistemas distribuídos e modelos de banco de dados) **DEVEM** ser acompanhados por um recurso visual explicativo de alto impacto didático. O projeto adota uma hierarquia estrita de 3 níveis de prioridade para a seleção e criação de recursos visuais:

1. **Prioridade 1 (P1 — Mídia Externa de Excelência na Web):** A IA **DEVE** priorizar a busca e referência de ilustrações, diagramas canônicos consagrados pela indústria (ex: ByteByteGo, documentações oficiais de Go/Linux/JVM, VisuAlgo, Wikimedia Commons) ou **Micro-Vídeos / Animações em Loop** (WebM, MP4, GIF) que demonstrem com clareza o fluxo ou funcionamento dinâmico do conceito.
   - **Padrão Obrigatório de Micro-Vídeo Mobile:** Todo vídeo deve ser conciso (3 a 15 segundos), estritamente sem áudio e encapsulado com atributos responsivos para WebViews móveis:
     ```html
     <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback>
       <source src="https://..." type="video/webm">
       <source src="https://..." type="video/mp4">
     </video>
     ```
2. **Prioridade 2 (P2 — Visual Declarativo / Fallback 1):** Caso não exista uma mídia externa pública de excelência que represente perfeitamente o conceito, a IA **DEVE** gerar código SVG vetorial inline/local com `viewBox` responsivo (`width="100%"`) ou tabelas Markdown comparativas compactas (máximo **2 a 3 colunas**, sem barras inquebráveis longas).
3. **Prioridade 3 (P3 — Fluxo Híbrido com Usuário / Fallback 2):** Para diagramas densos e personalizados que não possam ser resolvidos por P1 ou P2, a IA **DEVE** fornecer o prompt estruturado de geração de imagem, indicar a pasta de destino co-localizada (`decks/<fase_id>/<modulo>/<subtopico>/assets/<card_id>.<png|svg|jpg>`) e aguardar o posicionamento do arquivo pelo usuário antes de concluir o card.
4. **Front-Card Trigger:** Quando o objetivo for treinar reconhecimento imediato de padrões de entrevista (pattern matching), o recurso visual **DEVE** ser posicionado na pergunta (`## Pergunta`).

*Rationale:* A Teoria do Duplo Código (Dual Coding) comprova que o aprendizado simultâneo verbal e visual potencializa a retenção em memória de longo prazo. Animações e micro-vídeos em loop transmitem transições de estado (ex: rotação de árvores, ciclos de GC, 3-way handshake) de forma infinitamente superior a textos estáticos.

### II. Progressive Disclosure, Single-Concept Atomicity & Unified Card Architecture (NON-NEGOTIABLE)
O design dos flashcards é estritamente **Mobile-First**, atômico e voltado ao micro-learning diário no AnkiDroid/AnkiWeb:
- **Atomicidade Estrita de Pergunta (Single-Concept Rule):** Cada flashcard **DEVE** testar exatamente um único conceito indivisível. A seção `## Pergunta` deve conter no máximo **1 proposição interrogativa direta** (máximo 1 ponto de interrogação). É terminantemente proibido formular perguntas compostas aglutinando múltiplos tópicos não-relacionados (ex: cobrar conceito X + código Y + trade-off Z no mesmo card).
- **Arquitetura de Template Unificado:** O modelo de cartão do Anki utiliza template de resposta unificado (`answerFormat: '{{Back}}'`), exibindo no verso a pergunta em formato compacto contextual + tags no topo, seguida imediatamente da resposta em um único container, sem duplicações de `{{FrontSide}}` e sem divisores `<hr>` desalinhados.
- **Resposta Imediata (Quick Answer):** O núcleo decisório que define se o usuário acertou ou errou o card **DEVE** estar imediatamente visível no início da resposta, sem requerer cliques, com badges visuais de complexidade de tempo/espaço ($O(1)$, $O(N)$) sempre que aplicável.
- **Taxonomia de Tempo:**
  - *Fundamentos & Quick Answer:* Tempo máximo de leitura da resposta primária de **15 segundos**.
  - *Avaliação Mental Total:* Tempo total de análise e classificação (*Again/Good*) inferior a **30 segundos** por card.
- **Mecanismo Sanfona (`<details>`):** Qualquer prova matemática, citação de bibliografia (ex: Designing Data-Intensive Applications), aprofundamento teórico ou *walkthrough* linha a linha de código **DEVE** estar encapsulado dentro da tag HTML `<details><summary>Deep Dive & Walkthrough</summary>...</details>`, prevenindo sobrecarga cognitiva na visualização primária. O cabeçalho do `<summary>` deve ter área de toque mínima de 44px (*touch-friendly*).

*Rationale:* A repetição espaçada depende de julgamentos binários claros. Cartões com múltiplas perguntas causam o dilema de acertar metade e errar a outra, corrompendo o agendamento de intervalos do algoritmo SRS e desestimulando revisões em mobilidade.

### III. Strategic Bilingualism, Mobile-Optimized Code & Static Syntax Highlighting
O vocabulário e a codificação dos flashcards seguem uma política de bilinguismo intencional e excelência visual:
- **Prosa em PT-BR:** A explicação conceitual, enunciados de problemas e raciocínio lógico **DEVEM** ser redigidos em Português do Brasil (PT-BR) claro, conciso e didático.
- **Jargão Técnico em Inglês:** Todos os termos técnicos, nomes de estruturas de dados, padrões de arquitetura, nomes de algoritmos e conceitos de engenharia (ex: *Hash Map*, *Sliding Window*, *Two Pointers*, *Throughput*, *Rate Limiter*, *Consistent Hashing*) **DEVEM** ser mantidos em **Inglês**, formatados como código inline (`` `Term` ``) ou tags.
- **Snippets de Código:** Devem cobrir exclusivamente **Go** e **Java**, sendo idiomáticos, concisos e focados na solução ótima esperada em entrevistas FAANG.
- **Syntax Highlighting Estático (100% Offline):** Todo bloco de código Markdown **DEVE** declarar a linguagem (` ```go ` ou ` ```java `) e ser pré-compilado pelo gerador em HTML tokenizado (`highlight.js`) com tema *Dark Modern* integrado no CSS do baralho. Não há execução de JavaScript de terceiros em runtime.
- **Zero Scroll Horizontal:** Nenhuma linha de código ou bloco de texto pode forçar scroll horizontal no celular. Quebras de linha legíveis (`white-space: pre-wrap; word-break: break-word;`) e indentação compacta (2 espaços) são obrigatórias.

*Rationale:* Entrevistas de Big Techs exigem fluência no jargão técnico internacional em inglês, enquanto o aprendizado acelerado se beneficia da clareza da língua nativa. A formatação de código com realce sintático escuro aumenta a legibilidade em sessões noturnas no AnkiDroid.

### IV. Strict Tag Hierarchy & Flat Deck Architecture
A organização e o filtro de conteúdo no Anki operam com arquitetura plana:
- **Proibição de Sub-decks:** É estritamente proibido aninhar sub-baralhos para divisão temática dentro do Anki. A organização interna preserva o algoritmo de repetição espaçada.
- **Tags Hierárquicas Obrigatórias:** O isolamento e os filtros de estudo dinâmico dão-se obrigatoriamente através do Frontmatter YAML do arquivo `.md`, seguindo as categorias:
  - `level::l2-fundamental`, `level::l3-junior`, `level::l4-pleno`, `level::l5-senior`
  - `topic::<area>::<subtopico>` (ex: `topic::dsa::two-pointers`, `topic::hld::databases`, `topic::sys::os`)
  - `company::<empresa>` (ex: `company::amazon`, `company::meta`, `company::google`)
  - `freq::<frequencia>` (`freq::high`, `freq::medium`, `freq::low`)
- **Identificadores Canônicos:** Todo card deve possuir um ID canônico único no frontmatter (ex: `id: CS-ARCH-CACHE-001`) sincronizado com o manifesto de currículo para evitar duplicações em escala massiva.

*Rationale:* Sub-baralhos engessam a revisão e quebram a interleaving (prática intercalada). Tags hierárquicas e IDs canônicos fornecem total flexibilidade para sessões de estudo filtradas sem corromper o agendamento global.

### V. Static-Engine, Online-Enhanced Media & Multi-Target Build Capability
O motor do baralho preserva total eficiência e rapidez de renderização:
- **Motor de Renderização 100% Estático:** Folhas de estilo CSS, realce sintático (`highlight.js`) e notação matemática (`KaTeX`) são pré-compilados em tempo de build e embutidos diretamente no `.apkg`, garantindo 0ms de atraso de script no celular.
- **Mídias Online de Alta Performance & Mídias Locais:** Recursos visuais podem referenciar URLs HTTPS externas de CDNs estáveis/repositórios públicos ou mídias locais embutidas (`assets/`), mantendo o arquivo `.apkg` enxuto e escalável sem risco de saturação da cota de 250MB do AnkiWeb.
- **Exportação Modular por Fase:** O motor de compilação deve permitir exportar tanto o pacote consolidado (`MAANG_Engineering_Mastery.apkg`) quanto pacotes por fase (`MAANG_02-cs-fundamentals.apkg`).

*Rationale:* Manter o código e os estilos estáticos elimina latência e gasto de bateria no celular, enquanto permitir mídias e animações via HTTPS destrava o uso de recursos didáticos modernos de ponta.

### VI. First-Principles & Entry-Level Pedagogy (Zero-to-Hero) (NON-NEGOTIABLE)
Todo subtópico mapeado no currículo **DEVE** incluir cards introdutórios (*entry-level / noob-friendly*) concebidos primordialmente para **ensinar do absoluto zero pela primeira vez**, antes de cobrar memorização ou testes avançados de entrevista:
- **Intuição & Analogias do Mundo Real:** O card de entrada deve explicar o problema fundamental e a intuição de design com metáforas do dia a dia (ex: cache como post-it na mesa vs estante na biblioteca; B-Tree como índice de enciclopédia; Raft como eleição em condomínio) desmistificando abstrações.
- **Didática Visual Passo a Passo:** Conter diagramas visuais intuitivos imediatos (Micro-vídeos, SVG responsivo ou tabelas de 2-3 colunas) que ilustram o fluxo ou estado inicial vs final de forma autoexplicativa.
- **Progressão Curricular em Três Camadas:**
  1. *Camada 1 (Intuição & Fundamentos - `level::l2-fundamental`):* Ensinar o conceito do zero absoluto, a dor real no mundo físico e o modelo mental sem assumir jargão prévio.
  2. *Camada 2 (Mecânica & Complexidade - `level::l3-junior`):* Estruturas básicas, mecânica operacional, complexidade assintótica $O(1)$ / $O(N)$ e algoritmos fundamentais.
  3. *Camada 3 (Implementação, Código & Arquitetura - `level::l4-pleno` / `level::l5-senior`):* Implementações idiomáticas em Go/Java, concorrência, otimização de I/O, falhas parciais e cenários avançados de Big Techs.

*Rationale:* Flashcards que cobram jargão ou código complexo sem primeiro construir o modelo mental intuitivo geram atrito e frustração. A retenção a longo prazo e a capacidade de resolver problemas inéditos em entrevistas dependem da compreensão sólida dos primeiros princípios (*first principles*).

## Card Architecture & Markdown Standards

Cada flashcard no projeto é um arquivo Markdown isolado localizado na estrutura particionada por subtópicos granulares:
`decks/<fase_id>/<modulo>/<subtopico>/<card_id>.md`

Assets locais de imagem/mídia ficam em:
`decks/<fase_id>/<modulo>/<subtopico>/assets/<card_id>.<png|svg|jpg>`

### Estrutura Padrão do Arquivo Markdown
```markdown
---
id: CS-ARCH-CACHE-001
title: "Título Claro e Sucinto do Card"
tags:
  - level::l2-fundamental
  - topic::cs::architecture
  - company::amazon
  - freq::high
---

## Pergunta
[Enunciado objetivo com no máximo 1 pergunta direta em PT-BR com termos em inglês. Estímulo visual (SVG ou imagem local) se necessário para reconhecimento de padrão.]

## Resposta
### Quick Answer
**Solução Direta**: [Definição ou resposta atômica avaliável em <15s]
- **Time Complexity**: `O(1)`
- **Key Concept**: [Conceito central]

### Dual Coding Visual
[Micro-vídeo em loop, diagrama SVG inline responsivo com viewBox ou tabela comparativa de 2-3 colunas]

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementation (Go & Java)
```go
// Snippet conciso sem linhas longas com linguagem declarada
```

```java
// Snippet conciso sem linhas longas com linguagem declarada
```

#### Key Takeaways & Trade-offs
- [Nuances, armadilhas comuns em entrevistas e edge cases]
</details>
```

## Development Workflow & Multi-Agent Continuity

### 1. Rastreamento pelo Manifesto do Currículo (`syllabus_manifest.json`)
Para viabilizar a criação de centenas ou milhares de subtópicos sem duplicidade:
1. O repositório mantém um arquivo `syllabus_manifest.json` com a árvore exaustiva de tópicos/subtópicos e status de cobertura (`pending`, `in_progress`, `completed`).
2. Antes de gerar um lote de 5 a 10 cards, a IA consulta o manifesto, seleciona o próximo subtópico pendente e reserva os IDs canônicos.
3. Ao finalizar e validar os cards e assets locais, o manifesto é atualizado com os novos `card_ids`.

### 2. Geração Incremental em Lotes
Agentes de IA geram conteúdo em fatias atômicas de 5 a 10 cards por iteração, garantindo qualidade pedagógica e cobertura exaustiva de edge cases.

### 3. Desacoplamento da Compilação
A criação dos arquivos Markdown é independente da geração do `.apkg`. O motor de compilação em Node.js (`npm run build`) pode ser executado a qualquer momento para validar o parsing do frontmatter, a tokenização do código, o envelopamento de tabelas responsivas e a compilação do pacote SQLite consolidado ou por fase.

## Governance

1. **Autoridade:** Esta Constituição é o documento de governança supremo do projeto `faang_anki`. Nenhuma implementação de card, pipeline de geração ou automação por IA pode violar os princípios aqui estabelecidos.
2. **Procedimento de Emenda:** Qualquer alteração nos princípios, na taxonomia de tags ou nas regras de arquitetura requer atualização explícita deste arquivo com justificativa documentada e versionamento semântico:
   - **MAJOR:** Mudanças que quebram o padrão de cards existentes, alteração drástica da taxonomia de tags ou remoção de princípios não-negociáveis.
   - **MINOR:** Adição de novos princípios, novas seções de diretrizes ou expansão substantiva de regras.
   - **PATCH:** Correções gramaticais, pequenos ajustes de redação ou esclarecimentos que não alterem a governança.
3. **Conformidade em Agentes:** Todos os agentes de IA envolvidos no ciclo de geração de conteúdo devem ler esta constituição como fonte de verdade antes de propor ou gravar novos cards.

**Version**: 1.4.0 | **Ratified**: 2026-08-16 | **Last Amended**: 2026-08-17
