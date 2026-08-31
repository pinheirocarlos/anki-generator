# Feature Specification: AnkiWeb E2E Automation & Visual Layout Guardrails

**Feature Branch**: `004-ankiweb-e2e-automation`

**Created**: 2026-08-30

**Status**: Draft

**Input**: User description: "Criar uma camada de teste end-to-end (E2E) automatizada que gere o arquivo de deck, suba no Anki Desktop via Anki-Connect, sincronize com o AnkiWeb (https://ankiweb.net/), abra o deck no navegador via automação e verifique layout, responsividade mobile, integridade visual de micro-vídeos/SVGs/código/KaTeX e interações de sanfona, eliminando retrabalho no desenvolvimento de novas features."

---

## Clarifications

### Session 2026-08-30
- Q: Como o baralho de teste de sanidade (`MAANG_E2E_Sanity`) deve obter ou gerar seus cartões de teste? (FR-001) → A: Amostragem dinâmica automática selecionando cards reais representativos de cada tipologia (L2/L3/L4, micro-vídeos, SVG, tabelas, código, KaTeX) a partir dos diretórios de decks existentes do repositório.
- Q: Qual deve ser o comportamento de limpeza (*teardown*) do baralho `MAANG_E2E_Sanity` no Anki Desktop e AnkiWeb após a conclusão dos testes? (FR-002) → A: O baralho de sanidade é mantido no Anki Desktop e AnkiWeb por padrão para permitir auditoria visual humana pós-teste, sendo sobrescrito nas próximas execuções ou removido e sincronizado se a flag `--cleanup` for explicitamente passada.
- Q: Como o Playwright deve gerenciar a autenticação e a persistência de sessão no AnkiWeb para evitar bloqueios ou rate limit? (FR-003, FR-010) → A: Autenticação programática utilizando credenciais de `.env` (`ANKIWEB_USER`, `ANKIWEB_PASSWORD`) com persistência do estado de cookies de sessão em arquivo local seguro (`.auth/ankiweb-session.json`, bloqueado no `.gitignore`) para reutilização automática em execuções subsequentes sem novo login.
- Q: Como a suíte E2E deve validar a integridade visual e ausência de quebras de layout nos flashcards? (FR-004, FR-007, SC-001) → A: Abordagem dupla combinando asserções geométricas/estruturais estritas no DOM/CSS (`scrollWidth === clientWidth`, altura $\ge 44$px, ausência de `.katex-error`) com comparação de regressão visual pixel a pixel (*visual snapshot diffing*) contra screenshots de referência dourados (*golden baselines*), além do salvamento de screenshots de evidência no relatório.
- Q: Como o runner E2E deve se comportar se o Anki Desktop não estiver aberto ou o Anki-Connect (`127.0.0.1:8765`) estiver inacessível no momento do teste? (FR-002) → A: Adotar abordagem fail-fast imediata com saída estruturada contendo diagnóstico claro e orientações passo a passo (verificar processo do Anki Desktop aberto e add-on Anki-Connect 2055492159 ativo na porta 8765).

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Automated End-to-End Flashcard Verification on AnkiWeb (Priority: P1)

Como desenvolvedor e autor do baralho de flashcards de engenharia, quero que uma suíte automatizada compile um conjunto representativo de cartões, importe no Anki Desktop, sincronize com a nuvem do AnkiWeb e navegue pelos cards no navegador real, para que defeitos de layout, CSS corrompido ou falhas de renderização sejam capturados automaticamente antes do lançamento da versão final.

**Why this priority**: O ciclo de feedback atual é tardio (Shift-Right) e manual. Testar o artefato compilado diretamente no AnkiWeb garante paridade total com a experiência real de estudo e elimina o retrabalho em massa em centenas de cards.

**Independent Test**: Pode ser testado executando o pipeline automatizado via CLI e verificando se o deck de sanidade é gerado, sincronizado com o AnkiWeb, aberto no navegador e inspecionado com geração de relatório de aprovação/rejeição.

**Acceptance Scenarios**:
1. **Given** um conjunto de flashcards contendo diferentes tipologias (L2 Fundamental, L3 Junior, L4 Pleno com código, micro-vídeo, SVG, tabela e KaTeX), **When** o comando de teste E2E é disparado, **Then** o sistema compila o pacote de teste, importa no Anki Desktop via API local e dispara a sincronização com a conta AnkiWeb.
2. **Given** a sincronização concluída com o AnkiWeb, **When** o navegador automatizado acessa o deck de teste no AnkiWeb, **Then** ele estuda a sequência de cards (Front e Back) e valida com sucesso a presença e renderização dos elementos esperados.

---

### User Story 2 - High-Fidelity Mobile-First Layout & Visual Element Guardrails (Priority: P2)

Como estudante revisando flashcards em dispositivos móveis ou desktop, quero que todos os elementos visuais (vídeos em loop sem fundo preto opaco, SVGs escaláveis com `viewBox`, tabelas comparativas $\le 3$ colunas, blocos de código com destaque sintático e fórmulas KaTeX) renderizem sem causar barra de rolagem horizontal e com área de toque mínima de 44px na sanfona de detalhes, para que a revisão seja ergonomicamente fluida e sem sobrecarga cognitiva.

**Why this priority**: A promessa pedagógica do baralho apoia-se no Dual Coding e no micro-learning. Falhas de CSS como overflow horizontal ou botões difíceis de tocar quebram a imersão e violam os princípios da Constituição do projeto.

**Independent Test**: Pode ser testado executando a suíte em viewport móvel simulado (`360x640` e `390x844`) e validando que `scrollWidth <= clientWidth`, o `<details><summary>` possui altura $\ge 44$px e os tokens de realce sintático estão visíveis.

**Acceptance Scenarios**:
1. **Given** um card aberto no AnkiWeb em viewport móvel de 360px de largura, **When** a interface é inspecionada, **Then** a largura total do conteúdo (`scrollWidth`) é exatamente igual à largura da janela (`clientWidth`), sem gerar barra de rolagem horizontal no corpo do card.
2. **Given** um card com seção expansível `<details><summary>Deep Dive & Walkthrough</summary>`, **When** o elemento de sumário é testado, **Then** sua área de toque mede no mínimo 44px de altura e o clique expande o conteúdo sem desalinhamento visual.
3. **Given** um card contendo micro-vídeo em loop, **When** o verso do cartão é renderizado, **Then** o vídeo possui os atributos de reprodução contínua e proporção 16:9 sem salto de layout (*layout shift*).

---

### User Story 3 - Secure Isolation & SRS History Protection (Priority: P3)

Como mantenedor do projeto com histórico ativo de repetição espaçada no Anki, quero que a automação E2E utilize um deck de teste isolado e credenciais protegidas em arquivo de ambiente local nunca versionado, para que meus dados de agendamento de estudo real não sejam alterados e nenhuma senha seja exposta publicamente no repositório.

**Why this priority**: Segurança e integridade de dados são inegociáveis. Evita vazamento acidental de credenciais no GitHub e impede que as execuções de teste corrompam o algoritmo SM-2/FSRS dos 550 cards principais.

**Independent Test**: Pode ser testado verificando que o arquivo `.gitignore` bloqueia terminantemente arquivos de credenciais e cookies de sessão, e que a suíte atua exclusivamente sobre o identificador do deck de teste dedicado.

**Acceptance Scenarios**:
1. **Given** a execução do teste automatizado, **When** os dados de autenticação são lidos, **Then** o sistema utiliza variáveis locais isoladas e bloqueadas pelo `.gitignore`.
2. **Given** a criação e sincronização dos cartões de teste, **When** o deck é processado no AnkiWeb, **Then** apenas o deck isolado de sanidade é manipulado, preservando intacto o deck mestre de estudo.

---

### User Story 4 - Fast Local Component Runner for Instant Dev Feedback (Priority: P4)

Como desenvolvedor criando novos cards em lote ou ajustando o CSS do baralho, quero executar uma validação E2E local em navegador headless em menos de 3 segundos, para que eu obtenha feedback imediato de layout durante o ciclo de desenvolvimento sem precisar de conexão com a internet ou sincronização com a nuvem.

**Why this priority**: Proporciona velocidade de iteração máxima no dia a dia, permitindo que falhas estruturais sejam corrigidas antes mesmo do build `.apkg` ou do envio para a nuvem.

**Independent Test**: Pode ser testado disparando o runner local e cronometrando o tempo de execução e asserções do DOM diretamente sobre o HTML/CSS compilado em memória.

**Acceptance Scenarios**:
1. **Given** alterações em arquivos Markdown de cards ou no CSS do baralho, **When** o comando de teste local é executado, **Then** a suíte valida o DOM e layout em menos de 3 segundos e reporta quaisquer inconsistências.

---

### Edge Cases

- **Anki Desktop fechado ou plugin Anki-Connect ausente**: O sistema deve adotar política *fail-fast*, abortando imediatamente a execução com instruções claras de diagnóstico (verificar se o Anki Desktop está aberto no Windows e se o add-on `2055492159` está ouvindo na porta `8765`).
- **Instabilidade momentânea ou rate limit no login do AnkiWeb**: O sistema deve suportar persistência de sessão autenticada local reutilizável para evitar requisições repetidas de login.
- **Deck de teste já existente no AnkiWeb**: O fluxo deve atualizar ou recriar o deck de teste de forma idempotente sem duplicar notas.
- **Fórmulas matemáticas KaTeX com sintaxe inválida**: O validador visual deve detectar a presença de elementos com a classe `.katex-error` e falhar o teste indicando a fórmula afetada.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema DEVE fornecer um seletor de amostragem dinâmica que analise os arquivos Markdown de cards reais existentes no repositório e compile um baralho representativo isolado (`MAANG_E2E_Sanity`) contendo no mínimo 1 card real para cada tipologia: níveis de senioridade (`l2-fundamental`, `l3-junior`, `l4-pleno`), micro-vídeos em loop, SVGs com `viewBox`, tabelas $\le 3$ colunas, blocos de código com realce sintático Dark Modern e fórmulas KaTeX.
- **FR-002**: O sistema DEVE implementar um cliente de comunicação com a API local do Anki-Connect (`http://127.0.0.1:8765`) com comportamento *fail-fast* e diagnóstico guiado de conectividade (`ping`), capaz de importar pacotes `.apkg`, acionar a sincronização com o AnkiWeb e suportar remoção do deck de teste via flag `--cleanup` (mantendo-o por padrão para inspeção visual).
- **FR-003**: O sistema DEVE implementar uma suíte de automação web com Playwright que realize autenticação no AnkiWeb (`https://ankiweb.net/account/login`), persista o estado da sessão (`.auth/ankiweb-session.json`), navegue até o deck de teste e inicie a sessão de estudo.
- **FR-004**: O runner E2E DEVE validar programaticamente a renderização do Front de cada cartão, verificando a presença de tags hierárquicas, badges de senioridade e ausência de barra de rolagem horizontal em largura de 360px.
- **FR-005**: O runner E2E DEVE interagir com a ação de virar o cartão ("Show Answer"), validando a visibilidade dos elementos visuais do verso (vídeos, SVGs, tabelas, blocos de código tokenizados e KaTeX).
- **FR-006**: O runner E2E DEVE testar a interatividade da sanfona `<details><summary>`, assegurando altura de toque $\ge 44$px e expansão correta do conteúdo sem colapso de layout.
- **FR-007**: O sistema DEVE capturar screenshots de evidência visual (Front e Back, em viewport móvel de 360px e desktop), realizar comparação de regressão visual (*visual snapshot diffing*) contra imagens de referência (*golden baselines*) com limiar de tolerância configurável e salvar os artefatos de evidência em diretório de relatórios.
- **FR-008**: O sistema DEVE emitir um relatório estruturado ao final da execução com o sumário de testes, métricas de tempo, asserções de layout e links para as evidências visuais capturadas.
- **FR-009**: O sistema DEVE fornecer uma suíte E2E local em modo headless para validação imediata do DOM e CSS em menos de 3 segundos sem dependência de rede.
- **FR-010**: O sistema DEVE proteger todas as credenciais sensíveis e arquivos de sessão (`.env`, `.auth/ankiweb-session.json`, relatórios temporários), mantendo-os estritamente fora do controle de versão Git via `.gitignore` e fornecendo um arquivo de exemplo `.env.example`.

---

### Key Entities

- **Deck de Sanidade E2E (`MAANG_E2E_Sanity`)**: Pacote de cartões representativos isolado, projetado especificamente para exercitar todos os componentes e estados visuais do baralho sem interferir no baralho master.
- **Sessão Autenticada AnkiWeb**: Estado de autenticação persistido localmente em ambiente seguro para viabilizar execuções ágeis de teste sem dependência de login contínuo.
- **Relatório de Execução E2E**: Documento estruturado que consolida o resultado das validações de DOM, overflow, interações táteis e evidências visuais coletadas.

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: **0% de Overflow Horizontal** — 100% dos cartões testados apresentam `scrollWidth === clientWidth` em viewport móvel de 360px.
- **SC-002**: **100% de Elementos Visuais Validados** — Todos os componentes visuais previstos (vídeos, SVGs, tabelas, código e KaTeX) são renderizados sem classes de erro ou caixas pretas opacas.
- **SC-003**: **100% de Aderência Touch-Friendly** — Todas as sanfonas `<details><summary>` testadas possuem altura mínima $\ge 44$px.
- **SC-004**: **Zero Vazamento de Credenciais** — 100% dos arquivos de configuração sensíveis e relatórios temporários são ignorados pelo versionamento Git.
- **SC-005**: **Velocidade de Feedback Local** — A suíte E2E local executa em menos de 3 segundos por rodada de validação.
- **SC-006**: **Evidências Visuais Auditáveis e Regressão 0** — Geração completa de screenshots de Front e Back em alta resolução com 100% de conformidade no teste de regressão visual contra as imagens de referência.

---

## Assumptions

- O usuário possui o Anki Desktop instalado e em execução no Windows com o add-on Anki-Connect (código `2055492159`) configurado na porta padrão `8765`.
- O usuário possui uma conta ativa no AnkiWeb (`https://ankiweb.net/`) vinculada ao seu Anki Desktop para sincronização na nuvem.
- Os micro-vídeos remotos e assets embutidos continuarão compatíveis com os navegadores baseados em Chromium e WebViews móveis.
- O deck de teste dedicado `MAANG_E2E_Sanity` pode ser sobrescrito ou limpo entre execuções de teste sem prejuízo ao usuário.
