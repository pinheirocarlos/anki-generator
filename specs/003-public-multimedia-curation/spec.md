# Feature Specification: Public Multimedia Curation & Resilient Visual Engine

**Feature Branch**: `003-public-multimedia-curation`

**Created**: 2026-08-24

**Status**: Draft

**Input**: User description: "Curadoria individual e substituição de mídias animadas quebradas (domínio inexistente assets.faang-anki.dev) por conteúdos públicos reais da internet (vídeos, animações, SVGs responsivos), com validação ativa de alcance HTTP 200, resiliência de layout sem caixas pretas no Anki Desktop e AnkiDroid, e execução em lotes curriculares cobrindo 371 cards em DSA, CS Fundamentals e System Design."

---

## Clarifications

### Session 2026-08-24
- Q: Como o validador de links de mídia (`link-checker.js`) deve ser integrado ao ciclo de desenvolvimento e à suíte de testes automatizados (`npm test`)? → A: `npm test` valida regras, integridade e schemas estruturais de forma determinística e offline, enquanto `npm run test:links` executa a auditoria ativa de alcance e status HTTP 200 das URLs na rede.
- Q: Onde devem ser registradas as atribuições de autoria e licenças (ex: Creative Commons) das mídias públicas curadas? → A: Centralizado no catálogo `media-curation-registry.json` com menção contextual discreta no rodapé expansível da seção `<details>` para mídias sob licença aberta (CC-BY), mantendo a tela primária de revisão limpa no mobile.
- Q: Qual deve ser o critério de triagem pedagógica para escolher entre Mídia Pública Animada/Vídeo (P1) e SVG Inline Responsivo / Tabela (P2) na curadoria dos 371 cards? → A: Processos dinâmicos e transições temporais de estado (algoritmos passo a passo, protocolos de rede, concorrência, ciclos de vida) adotam P1 (Vídeo/Animação Web), enquanto topologias e estruturas estáticas (layouts de memória, nós de árvores/grafos, esquemas e trade-offs) adotam P2 (SVG inline responsivo ou tabela compacta).
- Q: Qual política de concorrência, retentativas e identificação HTTP deve ser adotada pelo `link-checker.js` ao auditar as mídias públicas na internet? → A: Concorrência controlada (pool de 5 a 10 requisições simultâneas), timeout individual de 5 segundos, até 2 retentativas com backoff em erros transitórios (429/5xx/timeout) e cabeçalho `User-Agent: FAANG-Anki-LinkChecker/1.0` descritivo.
- Q: Como deve ser estruturado o ciclo de validação e aprovação intermediária entre os lotes curriculares de curadoria (DSA, CS Fundamentals, System Design)? → A: Validação modular estrita por lote: cada fase curricular (Lote 2: DSA, Lote 3: CS Fundamentals, Lote 4: System Design) executa testes locais (`npm test`), teste de links (`npm run test:links`), compilação modular `.apkg` e registro de inspeção visual antes de avançar para a fase seguinte.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Flawless Online-Enhanced Multimedia Playback (Priority: P1)

Como estudante/engenheiro revisando flashcards técnicos no AnkiDroid e Anki Desktop conectado à internet, quero que toda mídia animada (micro-vídeo em loop, animação WebP/GIF ou SVG) carregue e execute fluidamente a partir de fontes públicas reais e estáveis da internet, para que eu visualize imediatamente a dinâmica do algoritmo ou protocolo sem me deparar com telas pretas opacas ou ícones de vídeo corrompido.

**Why this priority**: A promessa pedagógica do baralho apoia-se no Dual Coding (verbal + visual). Mídias quebradas causam quebra imediata de imersão, frustração e percepção de produto incompleto.

**Independent Test**: Pode ser testado abrindo qualquer flashcard que contenha animação no Anki Desktop e AnkiDroid com internet ativa, verificando que o micro-vídeo/animação executa em loop contínuo e sem intervenção manual.

**Acceptance Scenarios**:
1. **Given** um card com processo temporal (ex: `DSA-STRUCT-ARRAY-000`, `CS-NET-TCP-000`), **When** o usuário vira para a resposta com conexão de rede ativa, **Then** o micro-vídeo/animação pública carrega com sucesso e executa em loop silencioso imediato.
2. **Given** o aplicativo Anki Desktop ou AnkiDroid, **When** um card com mídia é renderizado, **Then** nenhum elemento exibe o background preto sólido de erro ou o ícone cinza de vídeo inacessível do Android.

---

### User Story 2 - Strict Card-by-Card Concept Curation (Priority: P2)

Como candidato se preparando para rodadas técnicas de alta complexidade em Big Techs, quero que a mídia associada a cada flashcard retrate com exatidão cirúrgica o conceito atômico daquela pergunta específica (e não uma imagem genérica ou desalinhada), para que o estímulo visual reforce o modelo mental exato cobrado na entrevista.

**Why this priority**: Mídias genéricas ou incorretas geram confusão mnemônica e deseducam o estudante sobre nuances críticas (ex: confundir rotação AVL LL com LR, ou confundir isolamento MVCC com Lock Pessimista).

**Independent Test**: Pode ser testado auditando uma amostra representativa de cards em cada subtópico e validando que o diagrama/animação exibido corresponde diretamente à resposta técnica e aos termos-chave da pergunta.

**Acceptance Scenarios**:
1. **Given** um card de algoritmo específico (ex: *Relaxamento de Arestas no Dijkstra* em `DSA-PAT-GRAPH-000`), **When** o usuário examina o recurso visual, **Then** a mídia ilustra exatamente a atualização do vetor de distâncias mínimas e o uso do Min-Heap, acompanhada de legenda explicativa contextualizada.
2. **Given** um card de arquitetura distribuída (ex: *Eleição de Líder no Raft* em `SYS-DIST-CONSENSUS-000`), **When** o recurso visual é exibido, **Then** a animação/diagrama representa com precisão os estados Follower $\to$ Candidate $\to$ Leader e o disparo de Heartbeats.

---

### User Story 3 - Active Reachability & Content-Type Guardrails (Priority: P3)

Como mantenedor e desenvolvedor do ecossistema de geração de flashcards, quero que a suíte automatizada de testes (`npm test` e `link-checker.js`) teste ativamente todas as URLs de mídias públicas contra servidores reais (HTTP Status 200, Content-Type válido e tempo de resposta aceitável), para que nenhuma mídia fictícia, link quebrado ou domínio inacessível passe silenciosamente pelo processo de build.

**Why this priority**: Evita regressões futuras e garante a sustentabilidade contínua do baralho à medida que novos cartões forem adicionados ao currículo.

**Independent Test**: Pode ser testado executando o comando de validação automatizada e verificando que qualquer URL 404, domínio inexistente ou tipo de mídia inválido causa falha imediata no teste com relatório detalhado.

**Acceptance Scenarios**:
1. **Given** um card contendo uma URL pública de mídia, **When** a suíte de testes é executada, **Then** o sistema realiza uma verificação HTTP ativa (`HEAD`/`GET`) assegurando status `200 OK` e MIME Type compatível (`video/mp4`, `video/webm`, `image/svg+xml`, `image/webp`, `image/gif`).
2. **Given** um card referenciando um domínio não registrado ou inacessível (ex: `assets.faang-anki.dev`), **When** a validação é disparada, **Then** o validador rejeita o card e aponta o arquivo e a linha com erro.

---

### User Story 4 - Graceful Degradation & Resilient Visual Fallback (Priority: P4)

Como estudante utilizando o baralho em redes móveis instáveis ou de alta latência, quero que o layout do cartão degrade com elegância (exibindo imediatamente a tabela comparativa estruturada e a legenda conceitual sem deformar a interface), para que a minha sessão de revisão continue 100% produtiva mesmo se o streaming do vídeo sofrer atraso de rede.

**Why this priority**: Garante robustez contra flutuações de rede comuns em smartphones e conexões móveis durante deslocamentos diários.

**Independent Test**: Pode ser testado simulando indisponibilidade temporária de rede ou alta latência e verificando que o cartão preserva legibilidade completa, tipografia perfeita e ausência de caixas pretas estouradas.

**Acceptance Scenarios**:
1. **Given** uma conexão com alta latência de rede, **When** o card é aberto, **Then** o usuário enxerga a resposta direta (`Quick Answer`), a tabela comparativa e o bloco explicativo sem qualquer salto visual (*layout shift*) ou caixa preta.
2. **Given** um cartão renderizado em modo noturno (*Dark Mode*) ou claro (*Light Mode*), **When** o container de mídia é carregado, **Then** as cores e bordas integram-se harmonicamente às variáveis CSS do tema (`--bg-card`, `--border-color`).

---

### Edge Cases

- **Links públicos modificados ou descontinuados por terceiros**: O catálogo de curadoria deve priorizar fontes públicas estáveis (Wikimedia Commons, repositórios educacionais oficiais de algoritmos, documentações consagradas) e manter fallback em SVG declarativo local para tópicos críticos.
- **Incompatibilidade de codecs de vídeo em WebViews legadas**: Priorizar formatos universalmente suportados (MP4 H.264 / WebM VP9 / WebP animado / SVG) com atributos `autoplay loop muted playsinline webkit-playsinline disableRemotePlayback`.
- **Bloqueio de autoplay em dispositivos móveis**: O container de vídeo deve ser complementado com imagens de pôster ou legendas semânticas diretas para assegurar valor didático mesmo se a reprodução automática for restrita pelo sistema operacional.
- **Cards sem mídias públicas ideais disponíveis**: Quando não houver vídeo público externo que atenda com fidelidade cirúrgica ao conceito indivisível, utilizar **SVGs responsivos declarativos sob medida com `viewBox`**.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE erradicar todas as 371 ocorrências de URLs apontando para o domínio fictício `assets.faang-anki.dev` em todo o repositório.
- **FR-002**: Cada um dos 371 cards afetados DEVE receber curadoria individual e mapeamento específico no catálogo de mídias (`media-curation-registry.json`), associando o `card_id` ao seu conceito pedagógico exato.
- **FR-003**: Todo recurso multimídia externo associado a um card DEVE ser uma URL pública segura (`https://`) com conteúdo educacional verificado e estável na internet.
- **FR-004**: O sistema DEVE aplicar uma regra de triagem pedagógica explícita na curadoria: conceitos com dinamismo temporal (algoritmos, protocolos, concorrência) recebem mídias públicas animadas/vídeos (P1), enquanto conceitos estruturais e topologias estáticas (layouts de memória, árvores, esquemas) recebem SVGs responsivos dedicados ou tabelas comparativas compactas (P2).
- **FR-005**: O motor de renderização CSS (`generator.js`) DEVE remover qualquer definição de cor de fundo estática opaca (`background-color: #000`) em tags de vídeo, adotando estilos responsivos flexíveis integrados às variáveis semânticas do tema.
- **FR-006**: O sistema DEVE fornecer um utilitário automatizado de verificação de conectividade (`link-checker.js`) disparado via script dedicado (`npm run test:links`) com pool de concorrência controlada (5-10 reqs simultâneas), timeout de 5s por requisição, até 2 retentativas em 429/5xx, User-Agent explícito e geração do relatório estruturado `link-health-report.json`.
- **FR-007**: A suíte de validação padrão (`validator.js` e `npm test`) DEVE bloquear terminantemente a presença de domínios placeholders e inconsistências estruturais de forma determinística offline, reservando a verificação de status HTTP de rede ativa para o script `npm run test:links`.
- **FR-008**: Toda mídia pública inserida em um card DEVE conter uma legenda explicativa estruturada (`<p>Visualização: [Explicação contextualizada]</p>`) que mencione expressamente o conceito chave abordado no flashcard, reservando a atribuição de autoria/licença para o catálogo central `media-curation-registry.json` e para o rodapé expansível `<details>` (quando aplicável).
- **FR-009**: A execução da curadoria DEVE ser particionada em lotes modulares por fase curricular, com validação de build, testes e inspeção antes de avançar para a fase seguinte:
  - Lote 2A/2B/2C: **01-DSA (180 cards)**
  - Lote 3A/3B/3C: **02-CS-Fundamentals (97 cards)**
  - Lote 4A/4B/4C: **03-System-Design (94 cards)**
- **FR-010**: Cada lote curricular concluído DEVE gerar seu respectivo `.apkg` modular, relatório de integridade de links e walkthrough de inspeção visual antes de liberar a fase seguinte.
- **FR-011**: O compilador de baralhos (`generator.js`) DEVE gerar pacotes `.apkg` (Master e Modulares) 100% livres de erros de mídia e compatíveis com Anki Desktop (Windows/macOS/Linux), AnkiDroid (Android) e AnkiMobile (iOS).
- **FR-012**: O arquivo `README.md` e os manifestos de documentação DEVEM ser atualizados para refletir com exatidão a infraestrutura Online-Enhanced de mídias públicas verificadas.

---

### Key Entities

- **Registro de Curadoria de Mídia (`media-curation-registry.json`)**: Dicionário central que mapeia cada `card_id` canônico ao seu conceito indivisível, URL pública validada, tipo de mídia (MP4, WebM, SVG, WebP, GIF), atribuição da fonte e legenda pedagógica.
- **Recurso de Mídia Pública Validado**: Ativo audiovisual hospedado em CDN ou repositório público com protocolo HTTPS, código de status 200 verificado e cabeçalho MIME type de vídeo ou imagem.
- **Relatório de Acessibilidade de Links (`link-health-report.json`)**: Log estruturado contendo a auditoria de latência, status HTTP e integridade de cada URL remota referenciada no baralho.
- **Container de Visualização Resiliente**: Estrutura HTML/CSS no verso do card que envelopa a animação com atributos móveis responsivos e garante transição suave para a tabela comparativa e o texto explicativo.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: **0% de links quebrados** — 100% das URLs de mídias públicas referenciadas no baralho respondem com status HTTP `200 OK` na verificação automatizada.
- **SC-002**: **100% de erradicação de placeholders** — Zero ocorrências do domínio `assets.faang-anki.dev` em todos os 550 cards do repositório.
- **SC-003**: **100% de adequação conceitual** — Todos os 371 cards anteriormente defeituosos possuem representação visual precisa correspondente ao seu conceito atômico (mídia pública animada ou SVG dedicado).
- **SC-004**: **Zero caixas pretas ou telas corrompidas** — Testes no Anki Desktop e AnkiDroid confirmam renderização fluida e integrada ao tema escuro/claro.
- **SC-005**: **100% de aprovação na suíte de testes** — `npm test` executa com zero falhas e valida todas as regras constitucionais e de alcance de rede.
- **SC-006**: **Tamanho otimizado do pacote `.apkg`** — O arquivo consolidado master permanece leve (< 50MB) e compilável em < 5 segundos.

---

## Assumptions

- Os usuários do baralho contam com conexão de rede ativa no momento do estudo para carregar mídias remotas públicas via HTTPS, com suporte a fallback estruturado em tabelas e texto na hipótese de instabilidade momentânea.
- Repositórios públicos e CDNs abertas (Wikimedia Commons, documentações oficiais de linguagens e ferramentas, repositórios de algoritmos em open-source) mantêm estabilidade de URLs de longo prazo.
- As WebViews modernas do Anki Desktop (Chromium) e do AnkiDroid (Android System WebView) suportam nativamente tags `<video>` com atributos `autoplay loop muted playsinline` para streams MP4/WebM quando servidos sobre HTTPS público.
- Para tópicos estritamente teóricos ou topologias arquiteturais complexas onde vídeos externos não forneçam foco uniconceitual, a utilização de SVGs declarativos responsivos dedicados oferece valor didático superior.
