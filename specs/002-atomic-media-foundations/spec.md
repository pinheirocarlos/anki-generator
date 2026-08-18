# Feature Specification: Atomic Cards, Multimedia Upgrade & Foundations Level

**Feature Branch**: `002-atomic-media-foundations`

**Created**: 2026-08-17

**Status**: Draft

**Input**: User description: "1 Dividir em mais cards os casos atuais de múltiplas perguntas (atomicidade). 2 Incrementar qualidade audiovisual das cards atuais e garantir que as próximas geradas tenham isso naturalmente (micro vídeos e svgs interativos). 3 Arquitetar um novo nível abaixo de júnior para nivelamento/fundamentos."

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Atomic Flashcards for Frictionless Spaced Repetition (Priority: P1)

Como estudante/engenheiro revisando flashcards no AnkiDroid durante deslocamento diário, quero que cada cartão avalie exatamente um único conceito atômico e claro, para que eu consiga avaliar meu desempenho com precisão (*Again/Good*) em menos de 30 segundos, sem o dilema de acertar metade da resposta e errar a outra metade.

**Why this priority**: A atomicidade é o pilar fundamental dos sistemas de repetição espaçada (SRS). Cartões compostos geram fadiga de revisão, quebram o cálculo de intervalos do algoritmo SM-2/FSRS e criam ilusão de competência.

**Independent Test**: Pode ser testado inspecionando todos os cartões do baralho e verificando que cada um contém um único foco de interrogação/conceito, com tempo médio de resposta mental $\le 30$ segundos.

**Acceptance Scenarios**:
1. **Given** um cartão anteriormente composto contendo múltiplas indagações (ex: `DSA-ADV-CONCURRENT-000`), **When** o usuário estuda o baralho, **Then** ele encontra uma sequência de cartões atômicos e focados (ex: um para *Lock-Based vs Lock-Free*, um para o *Problema ABA* e outro para *Mechanical Sympathy no Disruptor*).
2. **Given** um cartão do baralho, **When** o usuário vira para a resposta, **Then** o `Quick Answer` valida estritamente a única pergunta formulada, permitindo classificar com precisão como *Again* ou *Good*.

---

### User Story 2 - High-Impact Multimedia & Interactive Dual Coding (Priority: P2)

Como candidato visual se preparando para entrevistas técnicas complexas, quero que conceitos abstratos (como balanceamento de árvores AVL, ciclos de GC, transições de estado TCP, arquitetura de brokers Kafka e algoritmos de consenso) sejam representados por micro-vídeos em loop ou diagramas vetoriais SVG responsivos, para que eu retenha a intuição mecânica do fluxo através do duplo código (verbal + visual).

**Why this priority**: Tabelas Markdown são estáticas e operam primariamente no canal verbal. Animações e diagramas de arquitetura ativam o córtex visual e aceleram drasticamente a compreensão de processos dinâmicos.

**Independent Test**: Pode ser testado renderizando cartões de tópicos dinâmicos no celular e desktop, verificando a execução fluida de micro-vídeos em loop sem travamento e a perfeita legibilidade de SVGs com `viewBox` responsivo.

**Acceptance Scenarios**:
1. **Given** um flashcard sobre um processo de estados ou fluxo dinâmico (ex: *TCP Handshake*, *Raft Consensus*, *Sliding Window*), **When** o usuário visualiza o verso, **Then** a seção de Dual Coding exibe um micro-vídeo em loop (3 a 15 segundos, silencioso, responsivo) ou um SVG vetorial nítido em qualquer resolução.
2. **Given** um cartão visual no dispositivo móvel (viewport $\ge 360$px), **When** o vídeo ou SVG é carregado, **Then** não ocorre estouro de layout, barra de rolagem horizontal ou sobreposição de elementos de texto.

---

### User Story 3 - Foundations / Leveling Tier (`level::l2-fundamental`) (Priority: P3)

Como iniciante ou profissional em transição de carreira precisando de nivelamento, quero acessar cartões de nível fundamental (*Foundations*) com foco exclusivo em intuição, metáforas do cotidiano e primeiros princípios, para que eu construa uma base conceitual sólida antes de ser exposto a código avançado e trade-offs complexos de Big Techs.

**Why this priority**: Muitos candidatos falham em entrevistas de Big Tech não por falta de memorização de sintaxe, mas por falta de modelos mentais intuitivos. O nível L2 democratiza o baralho para qualquer nível de entrada.

**Independent Test**: Pode ser testado filtrando os cards pela tag `level::l2-fundamental` no Anki e validando que o conteúdo explica a dor do mundo real e a intuição física/prática sem assumir jargão prévio.

**Acceptance Scenarios**:
1. **Given** um subtópico técnico do syllabus (ex: *Memória Virtual*, *Algoritmo de Raft*, *B-Trees*), **When** o usuário estuda o cartão `level::l2-fundamental`, **Then** o card apresenta uma analogia do mundo real (ex: índice de livro para B-Trees, despachante para SO) e foco zero em código complexo ou provas matemáticas.
2. **Given** a filtragem dinâmica no Anki por `level::l2-fundamental`, **When** o estudante conclui essa trilha, **Then** ele possui a intuição necessária para avançar com confiança para os cartões `level::l3-junior` e `level::l4-pleno`.

---

### Edge Cases

- **Vídeos offline ou falhas de rede**: Se uma mídia remota HTTPS estiver temporariamente inacessível, o cartão deve manter uma representação textual de fallback estruturada (resumo de trade-offs ou diagrama conceitual) para que a revisão não seja interrompida.
- **Renumeração e compatibilidade de IDs canônicos**: A quebra de cartões múltiplos não deve quebrar o histórico de sincronização de quem já estuda os cards anteriores; os novos cards atômicos devem receber IDs determinísticos incrementais no manifesto.
- **Sobrecarga de cartões no baralho**: Com a decomposição atômica e inclusão do nível L2, o volume de cards crescerá para 500–800 unidades. O sistema de build e importação deve manter o arquivo `.apkg` leve (< 50MB sem mídias pesadas locais) e tempo de compilação < 5 segundos.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema de validação e autoria DEVE garantir que todo flashcard contenha estritamente uma única pergunta conceitual indivisível na seção `## Pergunta`.
- **FR-002**: Todos os flashcards atualmente existentes que contenham perguntas compostas DEVEM ser decompostos em cartões atômicos individuais, cada um com seu próprio ID canônico determinístico.
- **FR-003**: O catálogo curricular `syllabus_manifest.json` DEVE ser expandido para registrar e mapear todos os novos IDs atômicos por subtópico, mantendo consistência bidirecional estrita.
- **FR-004**: O baralho DEVE implementar suporte completo a micro-vídeos em loop (`<video autoplay loop muted playsinline>`) e SVGs com `viewBox` responsivo no template visual.
- **FR-005**: A suíte de validação de qualidade DEVE validar que tópicos dinâmicos priorizem mídias visuais de alto impacto (micro-vídeos P1 ou SVGs P2) em detrimento de tabelas puramente textuais.
- **FR-006**: O sistema DEVE introduzir e suportar formalmente a taxonomia `level::l2-fundamental` para cartões de nivelamento e intuição.
- **FR-007**: Todo subtópico do syllabus DEVE conter um cartão introdutório de nivelamento `level::l2-fundamental` baseado em primeiros princípios, analogias cotidianas e didática visual desmistificadora.
- **FR-008**: O design system do Anki DEVE fornecer identificação visual semântica diferenciada (badges/cores de cabeçalho) para o nível `L2 Fundamental`.
- **FR-009**: O motor de compilação DEVE permitir a exportação modular tanto por fases curriculares quanto por nível de senioridade (ex: pacote exclusivo de *Foundations*).

---

### Key Entities

- **Flashcard Atômico**: Entidade individual de conhecimento contendo identificador canônico, taxonomia de tags (`level`, `topic`, `freq`, `company`), pergunta atômica única, resposta rápida e recurso visual.
- **Recurso de Mídia Dual Coding**: Ativo visual acoplado ao cartão, podendo ser um micro-vídeo remoto seguro (HTTPS), um SVG vetorial responsivo ou uma imagem de alta resolução embutida.
- **Subtópico Curricular**: Agrupamento temático no `syllabus_manifest.json` que organiza a progressão pedagógica da intuição fundamental (`l2`) até o design de alta senioridade (`l4/l5`).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% dos flashcards do baralho são estritamente atômicos (0 cartões com múltiplas perguntas ou perguntas compostas).
- **SC-002**: 100% dos subtópicos do manifesto possuem ao menos 1 cartão de nivelamento intuitivo `level::l2-fundamental`.
- **SC-003**: Ao menos 70% dos cartões com processos dinâmicos/algorítmicos utilizam mídias de alto impacto (Micro-Vídeos em loop ou SVGs responsivos dedicados).
- **SC-004**: O tempo médio de avaliação e virada de cada cartão no AnkiDroid é reduzido para $\le 25$ segundos por card.
- **SC-005**: 100% dos cartões passam na suíte de validação automatizada sem erros de sintaxe, layout, tags ou mídias quebradas.

---

## Assumptions

- Os micro-vídeos em loop continuarão a ser hospedados em CDNs/URLs HTTPS públicas e estáveis ou mídias locais otimizadas, garantindo que o arquivo `.apkg` permaneça leve.
- A fragmentação em cards atômicas aumentará o número total de cartões para a faixa de ~500 a 750 cards, o que é a faixa ideal para o algoritmo de repetição espaçada sem sobrecarregar a rotina do usuário.
- O nível `level::l2-fundamental` será compatível com os mecanismos existentes de filtragem por tag no AnkiDroid e AnkiMobile.
