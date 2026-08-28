import fs from 'fs';
import path from 'path';

const csCards = [
  // ==========================================
  // MODULE 1: ARCHITECTURE
  // ==========================================
  {
    id: 'CS-ARCH-CACHE-006',
    relPath: 'decks/02-cs-fundamentals/architecture/cpu-cache/CS-ARCH-CACHE-006.md',
    title: 'Intuição Fundamental de Cache de CPU: A Mesa de Trabalho, a Gaveta e a Biblioteca',
    tags: [
      'level::l2-fundamental',
      'topic::cs::architecture',
      'company::google',
      'freq::high'
    ],
    question: 'Qual é a intuição fundamental por trás da hierarquia de caches da CPU (L1, L2, L3) e por que ela é indispensável para o desempenho do computador?',
    quickAnswer: `**Solução Direta**:
- A CPU executa operações em frações de nanossegundo, mas a memória RAM é fisicamente distante e leva centenas de ciclos para responder (o chamado gargalo de Von Neumann).
- Para evitar que o processador fique ocioso esperando dados (*CPU Stalls*), arquitetos colocam pequenas memórias ultra-rápidas (SRAM) dentro do próprio chip da CPU:
  - **Cache L1**: O caderno aberto sobre a mesa (acesso em ~1 ns).
  - **Cache L2/L3**: As gavetas ao lado da mesa (acesso em ~3 a 15 ns).
  - **RAM**: O arquivo no corredor do prédio (acesso em ~60 a 100 ns).`,
    svg: `<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Hierarquia de Memória: A Pirâmide de Velocidade vs Capacidade</text>

  <!-- L1 Cache -->
  <g transform="translate(60, 45)">
    <rect x="0" y="0" width="100" height="60" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="50" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Cache L1</text>
    <text x="50" y="38" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">~1 ns (4 ciclos)</text>
    <text x="50" y="52" fill="#34d399" font-size="9" text-anchor="middle">32-64 KB / core</text>
  </g>

  <!-- L2 Cache -->
  <g transform="translate(180, 45)">
    <rect x="0" y="0" width="100" height="60" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="50" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Cache L2</text>
    <text x="50" y="38" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">~3-4 ns</text>
    <text x="50" y="52" fill="#60a5fa" font-size="9" text-anchor="middle">512KB-1MB / core</text>
  </g>

  <!-- L3 Cache -->
  <g transform="translate(300, 45)">
    <rect x="0" y="0" width="100" height="60" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="50" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Cache L3 (LLC)</text>
    <text x="50" y="38" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">~10-15 ns</text>
    <text x="50" y="52" fill="#60a5fa" font-size="9" text-anchor="middle">16-64 MB compartilhado</text>
  </g>

  <!-- RAM Principal -->
  <g transform="translate(420, 45)">
    <rect x="0" y="0" width="120" height="60" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="6" />
    <text x="60" y="22" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">Memória RAM</text>
    <text x="60" y="38" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">~60-100 ns</text>
    <text x="60" y="52" fill="#a5b4fc" font-size="9" text-anchor="middle">16-128 GB (Lenta!)</text>
  </g>

  <!-- Barra de escala e analogia -->
  <line x1="60" y1="135" x2="540" y2="135" stroke="#475569" stroke-width="2" />
  <polygon points="545,135 535,130 535,140" fill="#475569" />
  <text x="60" y="155" fill="#10b981" font-size="10" font-family="sans-serif">⚡ Mais Rápido &amp; Mais Caro</text>
  <text x="540" y="155" fill="#818cf8" font-size="10" font-family="sans-serif" text-anchor="end">📦 Maior Capacidade &amp; Mais Longe</text>
  <text x="300" y="180" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Princípio de Localidade: 95%+ dos acessos são resolvidos em L1/L2/L3!</text>
</svg>`,
    table: `| Nível de Memória | Latência / Velocidade | Analogia do Cotidiano |
|---|---|---|
| **Cache L1 / L2** | ~1 a 4 ns (Instantâneo) | Papel na mão / Caderno aberto na mesa |
| **Cache L3 (LLC)** | ~10 a 15 ns (Muito rápido) | Livro na gaveta da escrivaninha |
| **Memória RAM** | ~60 a 100 ns (Lento para a CPU) | Arquivo no armário do corredor |`,
    deepDive: `#### O Problema Real
A CPU evoluiu muito mais rápido do que a memória RAM ao longo das décadas. Se a CPU tivesse que buscar cada número na RAM física através do barramento da placa-mãe, passaria 90% do seu tempo de braços cruzados (*stalled*) esperando os elétrons chegarem.

#### A Regra dos 90/10 (Localidade de Referência)
Os programas de computador possuem dois comportamentos universais:
1. **Localidade Temporal**: Se você acessou uma variável agora (ex: o contador de um laço \`for\`), provavelmente vai acessá-la de novo no próximo microssegundo.
2. **Localidade Espacial**: Se você leu a posição \`arr[0]\`, é quase certo que lerá \`arr[1]\` logo em seguida.

Por isso, quando a CPU busca um dado, ela não traz apenas 1 byte: ela carrega uma **Cache Line inteira (64 bytes)** para o Cache L1.

#### Key Takeaways
- A hierarquia de memória existe para aproximar os dados mais quentes dos circuitos de cálculo da CPU.
- Escrever código "amigável ao cache" (*Cache-Friendly*) consiste simplesmente em percorrer dados de forma contígua em memória.`
  },

  // ------------------------------------------
  {
    id: 'CS-ARCH-CPU-006',
    relPath: 'decks/02-cs-fundamentals/architecture/cpu-internals-isa/CS-ARCH-CPU-006.md',
    title: 'Intuição Fundamental de CPU e ISA: O Chefe de Cozinha e o Livro de Receitas Padronizado',
    tags: [
      'level::l2-fundamental',
      'topic::cs::architecture',
      'company::apple',
      'freq::high'
    ],
    question: 'Qual é o papel fundamental do processador (CPU) e de seu Conjunto de Instruções (ISA) na execução de programas de computador?',
    quickAnswer: `**Solução Direta**:
- A **CPU** é o cérebro calculador do computador: ela não "entende" código complexo em Go ou Java, apenas executa um ciclo incessante de três passos: **Buscar** uma instrução da memória (*Fetch*), **Decodificar** o que ela manda fazer (*Decode*) e **Executar** o cálculo (*Execute*).
- O **ISA (Instruction Set Architecture)**, como x86 ou ARM, é o contrato formal entre software e hardware: é o catálogo de comandos básicos (somar, mover, comparar) que aquele modelo de chip sabe executar.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">O Ciclo Fundamental da CPU: Busca ➔ Decodificação ➔ Execução</text>

  <!-- 1. Fetch -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="140" height="75" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="70" y="25" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">1. Fetch (Busca)</text>
    <text x="70" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">Lê a próxima instrução</text>
    <text x="70" y="60" fill="#64748b" font-size="9" text-anchor="middle">Endereço no ponteiro PC</text>
  </g>

  <!-- Seta 1 -->
  <path d="M 185 87 L 215 87" stroke="#10b981" stroke-width="2" />

  <!-- 2. Decode -->
  <g transform="translate(225, 50)">
    <rect x="0" y="0" width="150" height="75" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="75" y="25" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">2. Decode (Decodifica)</text>
    <text x="75" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">Traduz opcode binário</text>
    <text x="75" y="60" fill="#64748b" font-size="9" text-anchor="middle">Unidade de Controle</text>
  </g>

  <!-- Seta 2 -->
  <path d="M 380 87 L 410 87" stroke="#10b981" stroke-width="2" />

  <!-- 3. Execute -->
  <g transform="translate(420, 50)">
    <rect x="0" y="0" width="140" height="75" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="70" y="25" fill="#a7f3d0" font-size="12" font-weight="bold" text-anchor="middle">3. Execute (Executa)</text>
    <text x="70" y="45" fill="#ffffff" font-size="10" text-anchor="middle">Calcula na ALU / Grava</text>
    <text x="70" y="60" fill="#34d399" font-size="9" text-anchor="middle">Registradores atualizados</text>
  </g>

  <!-- Legenda inferior -->
  <text x="300" y="160" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">ISA (ex: x86 / ARM): O catálogo de opcodes binários que a CPU aceita!</text>
</svg>`,
    table: `| Componente / Conceito | Função no Processador | Analogia na Cozinha |
|---|---|---|
| **Registradores** | Armazenamento de 64 bits ultra-rápido colado na ALU | Os ingredientes já picados na tábua de corte |
| **ALU (Unidade Lógica/Aritmética)** | Executa contas matemáticas e comparações lógicas | As mãos do cozinheiro misturando os itens |
| **ISA (Instruction Set)** | Conjunto de regras e comandos suportados pelo chip | O livro oficial de receitas padronizado |`,
    deepDive: `#### O Modelo Mental do Cozinheiro
Imagine um cozinheiro ultra-rápido trabalhando numa bancada:
- Ele tem um livro de receitas numeradas (Memória do Programa).
- Ele lê a linha atual: *"Misture 2 gramas do pote A com o pote B"* (Instrução).
- Ele realiza a mistura em 1 segundo e anota o resultado no pote C (Execução e Registradores).
- Ele avança para a próxima linha da receita.

#### x86 vs ARM no Mundo Real
- **x86 (Intel/AMD - CISC)**: Livro com milhares de receitas complexas, com instruções longas e variáveis (usado tradicionalmente em PCs e Servidores).
- **ARM / RISC-V (RISC)**: Livro com apenas instruções muito simples e atômicas de tamanho fixo. Como são simples, o chip gasta muito menos energia e dissipa menos calor (usado em iPhones, MacBooks Apple Silicon e servidores modernos em nuvem).

#### Key Takeaways
- Todo software de alto nível é compilado ou interpretado até se transformar em instruções fundamentais do ISA.
- Registradores são a memória mais rápida do universo computacional (~0.3 nanossegundos por ciclo).`
  },

  // ------------------------------------------
  {
    id: 'CS-ARCH-PIPE-006',
    relPath: 'decks/02-cs-fundamentals/architecture/pipelining-branch-prediction/CS-ARCH-PIPE-006.md',
    title: 'Intuição Fundamental de Pipeline e Previsão de Desvios: A Lavanderia Industrial e o Semáforo Inteligente',
    tags: [
      'level::l2-fundamental',
      'topic::cs::architecture',
      'company::intel',
      'freq::high'
    ],
    question: 'Como o pipeline de instruções e a previsão de desvios (branch prediction) permitem que uma CPU processe múltiplas instruções por ciclo de clock?',
    quickAnswer: `**Solução Direta**:
- **Pipeline de Instruções**: Em vez de esperar uma instrução terminar todas as suas etapas para só então iniciar a seguinte, a CPU divide o trabalho em estágios simultâneos em linha de produção (como uma lavanderia que lava a carga 2 enquanto a carga 1 está na secadora).
- **Branch Prediction (Previsão de Desvio)**: Quando o código encontra um \`if/else\`, a CPU não quer pausar o pipeline para esperar o resultado do teste; ela "adivinha" o caminho mais provável e já vai executando as instruções futuras adiantadas.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Pipeline de Instruções: Execução Simultânea em Estágios</text>

  <!-- Ciclos de Clock -->
  <g transform="translate(60, 45)">
    <!-- Linha Instrução 1 -->
    <text x="0" y="18" fill="#94a3b8" font-size="10" font-family="monospace">Instrução 1:</text>
    <rect x="90" y="5" width="40" height="20" fill="#3b82f6" rx="3" /><text x="110" y="19" fill="#fff" font-size="9" text-anchor="middle">Fetch</text>
    <rect x="135" y="5" width="40" height="20" fill="#8b5cf6" rx="3" /><text x="155" y="19" fill="#fff" font-size="9" text-anchor="middle">Decode</text>
    <rect x="180" y="5" width="40" height="20" fill="#10b981" rx="3" /><text x="200" y="19" fill="#fff" font-size="9" text-anchor="middle">Exec</text>
    <rect x="225" y="5" width="40" height="20" fill="#f59e0b" rx="3" /><text x="245" y="19" fill="#fff" font-size="9" text-anchor="middle">Write</text>

    <!-- Linha Instrução 2 -->
    <text x="0" y="48" fill="#94a3b8" font-size="10" font-family="monospace">Instrução 2:</text>
    <rect x="135" y="35" width="40" height="20" fill="#3b82f6" rx="3" /><text x="155" y="49" fill="#fff" font-size="9" text-anchor="middle">Fetch</text>
    <rect x="180" y="35" width="40" height="20" fill="#8b5cf6" rx="3" /><text x="200" y="49" fill="#fff" font-size="9" text-anchor="middle">Decode</text>
    <rect x="225" y="35" width="40" height="20" fill="#10b981" rx="3" /><text x="245" y="49" fill="#fff" font-size="9" text-anchor="middle">Exec</text>
    <rect x="270" y="35" width="40" height="20" fill="#f59e0b" rx="3" /><text x="290" y="49" fill="#fff" font-size="9" text-anchor="middle">Write</text>

    <!-- Linha Instrução 3 -->
    <text x="0" y="78" fill="#94a3b8" font-size="10" font-family="monospace">Instrução 3:</text>
    <rect x="180" y="65" width="40" height="20" fill="#3b82f6" rx="3" /><text x="200" y="79" fill="#fff" font-size="9" text-anchor="middle">Fetch</text>
    <rect x="225" y="65" width="40" height="20" fill="#8b5cf6" rx="3" /><text x="245" y="79" fill="#fff" font-size="9" text-anchor="middle">Decode</text>
    <rect x="270" y="65" width="40" height="20" fill="#10b981" rx="3" /><text x="290" y="79" fill="#fff" font-size="9" text-anchor="middle">Exec</text>
    <rect x="315" y="65" width="40" height="20" fill="#f59e0b" rx="3" /><text x="335" y="79" fill="#fff" font-size="9" text-anchor="middle">Write</text>
  </g>

  <text x="300" y="165" fill="#10b981" font-size="11" font-family="monospace" text-anchor="middle">Vantagem: A CPU conclui 1 instrução por ciclo (IPC = 1.0+) em vez de 1 a cada 4 ciclos!</text>
</svg>`,
    table: `| Conceito | Como Funciona | Analogia do Cotidiano |
|---|---|---|
| **Pipeline** | Etapas divididas operando em paralelo | Lavar, secar e passar cestos de roupa simultaneamente |
| **Branch Prediction** | Adivinha o rumo do \`if\` antes da condição terminar | Olhar o Waze e antecipar qual faixa da rodovia pegar |
| **Pipeline Flush** | Descarta instruções adiantadas se a previsão errou | Ter que dar marcha à ré na rodovia por pegar a saída errada |`,
    deepDive: `#### A Analogia da Lavanderia
Imagine que você tem 4 cestos de roupa suja. Cada cesto precisa de:
1. Lavar (30 min)
2. Secar (30 min)
3. Dobrar (30 min)
4. Guardar no armário (30 min)

- **Sem Pipeline (Sequencial)**: Você lava, seca, dobra e guarda o cesto 1 (2 horas). Só então começa o cesto 2. Total para 4 cestos: **8 horas**.
- **Com Pipeline**: Assim que o cesto 1 sai da lavadora e vai para a secadora, você já coloca o cesto 2 na lavadora! Todas as máquinas trabalham juntas. Total para 4 cestos: **3.5 horas**.

#### Por que Branch Prediction é Crítico?
Se o programa tem um comando condicional (\`if x > 10\`), a CPU precisaria parar o pipeline e esperar a conta terminar para saber qual instrução carregar a seguir. Para evitar essa pausa (*stall*), chips modernos possuem preditores neurais e tabelas de histórico que acertam o rumo de 95% a 99% dos desvios.

#### Key Takeaways
- Processadores modernos possuem pipelines profundos (12 a 20 estágios).
- Um *Branch Misprediction* custa cerca de 15 a 20 ciclos perdidos jogando fora o pipeline.`
  },

  // ------------------------------------------
  {
    id: 'CS-ARCH-IO-006',
    relPath: 'decks/02-cs-fundamentals/architecture/storage-io-hierarchy/CS-ARCH-IO-006.md',
    title: 'Intuição Fundamental de Storage e I/O: Memória Volátil vs Não-Volátil e a Escala de Latência',
    tags: [
      'level::l2-fundamental',
      'topic::cs::architecture',
      'company::amazon',
      'freq::high'
    ],
    question: 'Qual é a diferença fundamental entre memória principal (RAM) e armazenamento secundário (SSD/Disco) em relação à velocidade e permanência dos dados?',
    quickAnswer: `**Solução Direta**:
- A **Memória RAM** é **volátil** (perde tudo se faltar energia) e opera na velocidade dos elétrons em silício (~100 nanossegundos), mas é muito cara por gigabyte.
- O **Armazenamento Secundário (NVMe SSD / Disco HDD)** é **não-volátil** (os dados persistem desligados da tomada), mas é de 1.000 a 100.000 vezes mais lento para responder à CPU do que a RAM.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">A Escala Cósmica de Latência: RAM vs SSD vs HDD</text>

  <!-- Bloco RAM -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="150" height="70" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="75" y="24" fill="#a7f3d0" font-size="12" font-weight="bold" text-anchor="middle">Memória RAM</text>
    <text x="75" y="44" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">~100 ns</text>
    <text x="75" y="60" fill="#34d399" font-size="9" text-anchor="middle">⚡ Se 100ns = 1 segundo...</text>
  </g>

  <!-- Bloco SSD NVMe -->
  <g transform="translate(225, 50)">
    <rect x="0" y="0" width="150" height="70" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="75" y="24" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">SSD NVMe (Flash)</text>
    <text x="75" y="44" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">~50-100 µs</text>
    <text x="75" y="60" fill="#60a5fa" font-size="9" text-anchor="middle">🕒 ...equivale a 15 MINUTOS!</text>
  </g>

  <!-- Bloco HDD -->
  <g transform="translate(410, 50)">
    <rect x="0" y="0" width="150" height="70" fill="#1e1b4b" stroke="#ef4444" stroke-width="1.5" rx="6" />
    <text x="75" y="24" fill="#fca5a5" font-size="12" font-weight="bold" text-anchor="middle">Disco Rígido (HDD)</text>
    <text x="75" y="44" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">~10 ms</text>
    <text x="75" y="60" fill="#f87171" font-size="9" text-anchor="middle">🗓️ ...equivale a 3 MESES!</text>
  </g>

  <!-- Legenda de persistência -->
  <text x="115" y="145" fill="#34d399" font-size="10" font-family="sans-serif" text-anchor="middle">Volátil (Some ao desligar)</text>
  <text x="300" y="145" fill="#93c5fd" font-size="10" font-family="sans-serif" text-anchor="middle">Persistente (Memória Flash NAND)</text>
  <text x="485" y="145" fill="#f87171" font-size="10" font-family="sans-serif" text-anchor="middle">Persistente (Pratos Magnéticos)</text>

  <text x="300" y="172" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Regra de Ouro: Evite I/O síncrono em caminhos críticos de código!</text>
</svg>`,
    table: `| Meio de Armazenamento | Persistência & Latência | Analogia em Escala Humana |
|---|---|---|
| **RAM (DRAM)** | Volátil / ~100 ns | Olhar uma anotação na sua mão (1 segundo) |
| **SSD NVMe (PCIe)** | Não-volátil / ~50 µs | Ir até a cafeteria na esquina (15 minutos) |
| **HDD Magnético** | Não-volátil / ~10 ms | Fazer uma viagem de navio à Europa (3 meses) |`,
    deepDive: `#### A Analogia da Escala Humana
Se 1 ciclo de clock da CPU durasse **1 segundo** no nosso relógio:
- Acessar o **Cache L1** seria como esticar o braço e pegar uma caneta (4 segundos).
- Acessar a **Memória RAM** seria como descer o elevador e pegar um lanche no térreo (4 minutos).
- Fazer uma leitura em **SSD** seria como viajar até outra cidade de carro (alguns dias).
- Fazer uma busca em **HDD Mecânico** seria como esperar as estações do ano passarem (meses).

#### Por que Buffers de I/O Existem?
Como ler do disco é tão lento, o sistema operacional nunca lê 1 byte isolado. Ele lê blocos de 4 KB ou mais e guarda em um **Page Cache na RAM**. Quando o seu programa chama \`write()\`, o Linux apenas anota na RAM e devolve o controle instantaneamente, gravando no disco em segundo plano (*Flush assíncrono*).

#### Key Takeaways
- Todo acesso a disco ou rede deve ser tratado com respeito extremo à latência.
- O gargalo da maioria dos sistemas modernos é quase sempre I/O, raramente cálculo puro de CPU.`
  },

  // ==========================================
  // MODULE 2: OS & MEMORY
  // ==========================================
  {
    id: 'CS-OS-VMEM-006',
    relPath: 'decks/02-cs-fundamentals/os-memory/virtual-memory/CS-OS-VMEM-006.md',
    title: 'Intuição Fundamental de Memória Virtual: A Ilusão do Hotel Privado e a Tabela de Páginas',
    tags: [
      'level::l2-fundamental',
      'topic::cs::os-memory',
      'company::microsoft',
      'freq::high'
    ],
    question: 'Qual é o objetivo principal da memória virtual nos sistemas operacionais e como ela isola os processos com segurança?',
    quickAnswer: `**Solução Direta**:
- A **Memória Virtual** dá a cada aplicativo a ilusão perfeita de que ele possui **toda a memória RAM do computador exclusivamente para si**, começando do endereço \`0x0000\` até o infinito.
- Na realidade, o hardware da **MMU (Memory Management Unit)** e o Sistema Operacional fatiam a memória em blocos de 4 KB chamados **Páginas (Pages)** e traduzem esses endereços virtuais fictícios para endereços físicos reais (*Frames*) espalhados pela RAM.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Memória Virtual: Tradução de Páginas Fictícias para Frames Reais</text>

  <!-- Espaço Virtual Processo A -->
  <g transform="translate(30, 45)">
    <rect x="0" y="0" width="130" height="70" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="65" y="20" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Processo A (Virtual)</text>
    <text x="65" y="40" fill="#f8fafc" font-size="9" text-anchor="middle">Página 0 (0x0000)</text>
    <text x="65" y="58" fill="#f8fafc" font-size="9" text-anchor="middle">Página 1 (0x1000)</text>
  </g>

  <!-- MMU / Page Table -->
  <g transform="translate(225, 45)">
    <rect x="0" y="0" width="150" height="70" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="75" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">MMU + Page Table</text>
    <text x="75" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Tradução Instantânea</text>
    <text x="75" y="58" fill="#34d399" font-size="9" text-anchor="middle">Segurança &amp; Isolamento</text>
  </g>

  <!-- Memória RAM Física -->
  <g transform="translate(435, 45)">
    <rect x="0" y="0" width="135" height="70" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="6" />
    <text x="67" y="20" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">RAM Física (Frames)</text>
    <text x="67" y="40" fill="#f8fafc" font-size="9" text-anchor="middle">Frame 42 (Página 0 de A)</text>
    <text x="67" y="58" fill="#f8fafc" font-size="9" text-anchor="middle">Frame 88 (Página 1 de A)</text>
  </g>

  <!-- Setas de Mapeamento -->
  <path d="M 160 80 L 225 80" stroke="#10b981" stroke-width="2" />
  <path d="M 375 80 L 435 80" stroke="#10b981" stroke-width="2" />

  <text x="300" y="155" fill="#10b981" font-size="11" font-family="monospace" text-anchor="middle">Benefício: Se o Processo A falhar (Segmentation Fault), o Processo B segue intacto!</text>
</svg>`,
    table: `| Conceito | Papel no Sistema Operacional | Analogia no Mundo Real |
|---|---|---|
| **Endereço Virtual** | O endereço fictício que o código vê | O número do quarto na chave do hotel |
| **Page Table / MMU** | Dicionário de tradução hardware/SO | A recepção que sabe qual cômodo físico corresponde à chave |
| **Page Fault** | Ocorre quando a página está no disco (Swap) | O recepcionista que busca sua mala guardada no depósito |`,
    deepDive: `#### A Analogia do Hotel Compartilhado
Imagine 50 hóspedes (processos) chegando a um hotel. Em vez de cada um disputar um pedaço aleatório do chão:
- A recepção entrega para todos uma chave numerada de 1 a 100.
- O hóspede A acha que é dono dos quartos 1 a 100. O hóspede B também acha que é dono dos quartos 1 a 100.
- Quando o hóspede A vai ao "quarto 1", a recepção (MMU) discretamente o direciona para a suíte 405 no 4º andar.
- O hóspede A nunca conseguirá abrir a porta do hóspede B, porque o mapa da recepção não permite.

#### Por que isso é Revolucionário?
1. **Segurança Total**: Um programa com bug não consegue sobrescrever a memória de outro programa nem do Kernel.
2. **Memória Maior que a RAM Física (Swap)**: Páginas que não são usadas há muito tempo podem ser salvas no disco temporariamente.

#### Key Takeaways
- Todo ponteiro que manipulamos em C, Go ou Java é um endereço virtual, nunca físico.
- Segmentation Fault ocorre quando seu programa tenta acessar uma página virtual para a qual ele não tem permissão.`
  },

  // ------------------------------------------
  {
    id: 'CS-OS-PROC-006',
    relPath: 'decks/02-cs-fundamentals/os-memory/processes-threads/CS-OS-PROC-006.md',
    title: 'Intuição Fundamental de Processos e Threads: As Empresas Separadas vs os Operários na Mesma Sala',
    tags: [
      'level::l2-fundamental',
      'topic::cs::os-memory',
      'company::google',
      'freq::high'
    ],
    question: 'Qual é a diferença conceitual e prática essencial entre um processo e uma thread no sistema operacional?',
    quickAnswer: `**Solução Direta**:
- Um **Processo** é um programa completo em execução com seu próprio território blindado (espaço de memória virtual isolado, tabela de arquivos e permissões).
- Uma **Thread** é uma linha de execução independente que vive **dentro** de um processo. Múltiplas threads do mesmo processo compartilham a mesma memória (Heap e variáveis globais), mas cada uma possui sua própria pilha de chamadas (*Stack*) e registradores.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Processo (Casa Blindada) vs Threads (Moradores Compartilhando Espaço)</text>

  <!-- Processo Caixa -->
  <rect x="50" y="45" width="500" height="100" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="8" />
  <text x="70" y="65" fill="#93c5fd" font-size="11" font-weight="bold">PROCESSO: Espaço de Endereçamento Compartilhado (Heap, Código, Globais)</text>

  <!-- Thread 1 -->
  <g transform="translate(80, 75)">
    <rect x="0" y="0" width="130" height="55" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="4" />
    <text x="65" y="20" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Thread 1</text>
    <text x="65" y="36" fill="#ffffff" font-size="9" text-anchor="middle">Stack 1 + Registradores</text>
    <text x="65" y="48" fill="#34d399" font-size="8" text-anchor="middle">Executando Core 0</text>
  </g>

  <!-- Thread 2 -->
  <g transform="translate(235, 75)">
    <rect x="0" y="0" width="130" height="55" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="4" />
    <text x="65" y="20" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Thread 2</text>
    <text x="65" y="36" fill="#ffffff" font-size="9" text-anchor="middle">Stack 2 + Registradores</text>
    <text x="65" y="48" fill="#34d399" font-size="8" text-anchor="middle">Executando Core 1</text>
  </g>

  <!-- Thread 3 -->
  <g transform="translate(390, 75)">
    <rect x="0" y="0" width="130" height="55" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="4" />
    <text x="65" y="20" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Thread 3</text>
    <text x="65" y="36" fill="#ffffff" font-size="9" text-anchor="middle">Stack 3 + Registradores</text>
    <text x="65" y="48" fill="#34d399" font-size="8" text-anchor="middle">Esperando I/O</text>
  </g>

  <text x="300" y="168" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Vantagem das Threads: Comunicação ultrarrápida via memória compartilhada!</text>
</svg>`,
    table: `| Característica | Processo | Thread |
|---|---|---|
| **Memória** | Isolada (não enxerga outros processos) | Compartilhada com outras threads do processo |
| **Custo de Criação** | Alto (alocar Page Tables, descritores) | Baixo (aloca apenas uma nova Stack) |
| **Isolamento de Falhas** | Se um processo quebra, outros continuam | Se uma thread sofre crash (panic), o processo todo cai |`,
    deepDive: `#### A Metáfora dos Prédios e Operários
- **Dois Processos**: São como duas empresas vizinhas com muros altos entre elas. Para conversar, precisam passar pelo porteiro (IPC, Sockets ou Pipes).
- **Múltiplas Threads**: São como 3 funcionários trabalhando na mesma sala de reunião em volta de uma mesa compartilhada (Heap). Eles conversam instantaneamente apenas olhando os papéis na mesa, mas se dois tentarem escrever na mesma folha ao mesmo tempo com canetas diferentes, a anotação ficará ilegível (*Race Condition*).

#### Por que Threads Exigem Sincronização?
Como a memória é compartilhada sem barreiras, duas threads podem ler a variável \`saldo = 100\` e ambas sacarem 50 ao mesmo tempo. Sem travas (*Mutex*), o saldo final pode virar 50 em vez de 0.

#### Key Takeaways
- Processos priorizam isolamento e segurança; Threads priorizam velocidade e cooperação.
- A troca de contexto (*Context Switch*) entre threads do mesmo processo é mais rápida porque não exige troca da Tabela de Páginas da MMU.`
  },

  // ------------------------------------------
  {
    id: 'CS-OS-SYNC-006',
    relPath: 'decks/02-cs-fundamentals/os-memory/synchronization-primitives/CS-OS-SYNC-006.md',
    title: 'Intuição Fundamental de Sincronização: A Chave do Banheiro (Mutex) e a Garagem com Vagas (Semáforo)',
    tags: [
      'level::l2-fundamental',
      'topic::cs::os-memory',
      'company::meta',
      'freq::high'
    ],
    question: 'Qual é a intuição fundamental por trás das primitivas de sincronização (Mutex e Semáforos) e por que elas evitam condições de corrida?',
    quickAnswer: `**Solução Direta**:
- Quando duas ou mais threads tentam alterar a mesma variável compartilhada simultaneamente, os dados podem se corromper (fenômeno chamado de **Condição de Corrida / Race Condition**).
- As primitivas de sincronização controlam o acesso a essa área perigosa (**Seção Crítica**):
  - **Mutex (Mutual Exclusion)**: É a chave única de um banheiro — só 1 pessoa pode entrar por vez; quem chegar depois espera na fila.
  - **Semáforo Contador**: É a cancela de um estacionamento com $N$ vagas — permite até $N$ threads simultâneas, barrando as seguintes quando a contagem chega a zero.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Mutex (1 Exclusivo) vs Semáforo (N Vagas Disponíveis)</text>

  <!-- Lado Esquerdo: Mutex -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="230" height="90" fill="#1e293b" stroke="#ef4444" stroke-width="1.5" rx="6" />
    <text x="115" y="22" fill="#fca5a5" font-size="12" font-weight="bold" text-anchor="middle">🔒 Mutex (1 Vaga Apenas)</text>
    <rect x="25" y="35" width="80" height="40" fill="#065f46" stroke="#10b981" rx="4" />
    <text x="65" y="58" fill="#fff" font-size="10" text-anchor="middle">Thread A (Dona)</text>
    <text x="170" y="58" fill="#ef4444" font-size="10" text-anchor="middle">Thread B (Dorme)</text>
    <text x="115" y="118" fill="#94a3b8" font-size="10" text-anchor="middle">Apenas quem trancou pode destravar!</text>
  </g>

  <!-- Divisor -->
  <line x1="300" y1="45" x2="300" y2="155" stroke="#334155" stroke-width="2" stroke-dasharray="4,4" />

  <!-- Lado Direito: Semáforo -->
  <g transform="translate(330, 45)">
    <rect x="0" y="0" width="230" height="90" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="115" y="22" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">🚥 Semáforo (Contador = 3)</text>
    <circle cx="50" cy="55" r="14" fill="#065f46" stroke="#10b981" />
    <circle cx="115" cy="55" r="14" fill="#065f46" stroke="#10b981" />
    <circle cx="180" cy="55" r="14" fill="#065f46" stroke="#10b981" />
    <text x="50" y="59" fill="#fff" font-size="10" text-anchor="middle">T1</text>
    <text x="115" y="59" fill="#fff" font-size="10" text-anchor="middle">T2</text>
    <text x="180" y="59" fill="#fff" font-size="10" text-anchor="middle">T3</text>
    <text x="115" y="118" fill="#94a3b8" font-size="10" text-anchor="middle">Qualquer thread pode sinalizar liberação!</text>
  </g>
</svg>`,
    table: `| Primitiva | Como Funciona | Analogia do Cotidiano |
|---|---|---|
| **Mutex** | Bloqueio binário exclusivo (apenas 1 thread dona) | A chave física do banheiro único |
| **Semáforo** | Contador de recursos ($N$ permissões) | Painel eletrônico de vagas livres no estacionamento |
| **Condition Variable** | Thread dorme até receber um aviso de evento | Esperar seu número ser chamado no painel da farmácia |`,
    deepDive: `#### O Problema Clássico do Saldo Bancário
Imagine a instrução \`saldo = saldo + 10\`. Em nível de CPU, isso são 3 passos:
1. Lê o saldo da memória para o registrador (\`LOAD\`).
2. Soma 10 no registrador (\`ADD\`).
3. Grava de volta na memória (\`STORE\`).

Se duas threads fizerem isso ao mesmo tempo intercalando os passos, uma sobrescreverá a soma da outra e R$ 10 desaparecerão no ar.

#### O Risco do Deadlock (Abraço Mortal)
Um deadlock acontece quando duas threads ficam esperando eternamente uma pela outra:
- Thread 1 segura o Mutex A e pede o Mutex B.
- Thread 2 segura o Mutex B e pede o Mutex A.
- Nenhuma avança, o sistema congela.

#### Key Takeaways
- Sempre mantenha seções críticas as menores e mais rápidas possíveis.
- Para evitar deadlocks, estabeleça uma ordem rígida de aquisição de travas em todo o sistema.`
  },

  // ------------------------------------------
  {
    id: 'CS-OS-ATOM-006',
    relPath: 'decks/02-cs-fundamentals/os-memory/lock-free-atomics/CS-OS-ATOM-006.md',
    title: 'Intuição Fundamental de Operações Atômicas e CAS: O Carimbo Indivisível e a Troca sem Bloqueio',
    tags: [
      'level::l2-fundamental',
      'topic::cs::os-memory',
      'company::netflix',
      'freq::high'
    ],
    question: 'Qual é o modelo mental de uma operação atômica e como a instrução Compare-And-Swap (CAS) permite concorrência sem bloqueio de threads?',
    quickAnswer: `**Solução Direta**:
- Uma operação é **atômica** quando é executada como um bloco único e indivisível em hardware: nenhuma outra thread consegue observar o estado pela metade.
- O **Compare-And-Swap (CAS)** é uma instrução nativa da CPU que implementa concorrência otimista: *"Se o valor na memória ainda for X, mude imediatamente para Y"*. Se outra thread alterou o valor primeiro, o CAS falha e a thread simplesmente tenta de novo em loop, sem jamais ser suspensa pelo sistema operacional.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">O Ciclo Compare-And-Swap (CAS): Concorrência sem Dormir</text>

  <!-- Passo 1 -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="140" height="65" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="70" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">1. Lê Valor Atual</text>
    <text x="70" y="42" fill="#ffffff" font-size="12" text-anchor="middle">esperado = 100</text>
    <text x="70" y="56" fill="#64748b" font-size="9" text-anchor="middle">Calcula novo = 110</text>
  </g>

  <!-- Passo 2: Hardware CAS -->
  <g transform="translate(225, 50)">
    <rect x="0" y="0" width="150" height="65" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="75" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">2. CPU: CAS(100, 110)</text>
    <text x="75" y="42" fill="#ffffff" font-size="11" text-anchor="middle">"Ainda é 100?"</text>
    <text x="75" y="56" fill="#34d399" font-size="9" text-anchor="middle">1 instrução nativa!</text>
  </g>

  <!-- Passo 3: Decisão -->
  <g transform="translate(420, 50)">
    <rect x="0" y="0" width="140" height="65" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="70" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">3. Resultado</text>
    <text x="70" y="40" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">SIM ➔ Sucesso ✓</text>
    <text x="70" y="56" fill="#ef4444" font-size="10" text-anchor="middle">NÃO ➔ Repete laço</text>
  </g>

  <path d="M 180 82 L 225 82" stroke="#10b981" stroke-width="2" />
  <path d="M 375 82 L 420 82" stroke="#10b981" stroke-width="2" />

  <text x="300" y="155" fill="#10b981" font-size="11" font-family="monospace" text-anchor="middle">Sem Mutex, sem chamada ao Kernel, sem perda de milissegundos!</text>
</svg>`,
    table: `| Abordagem | Comportamento na Colisão | Vantagens / Desvantagens |
|---|---|---|
| **Com Locks (Mutex)** | Thread perdedora é suspensa pelo SO | Simples de programar, mas cara e sujeita a deadlock |
| **Sem Locks (CAS / Atomics)** | Thread perdedora tenta de novo imediatamente | Ultra-rápida, zero deadlock, mas consome CPU sob alta colisão |
| **Hardware Primitives** | Instruções atômicas diretas (\`CMPXCHG\`) | Custo de apenas 1 a poucos ciclos de clock |`,
    deepDive: `#### A Metáfora da Troca de Figurinhas
Imagine que você quer comprar uma figurinha rara na mão de um amigo por R$ 10:
- **Com Lock**: Você tranca seu amigo em uma sala fechada para ninguém conversar com ele até você terminar a compra.
- **Com CAS (Otimista)**: Você chega com o dinheiro e diz: *"Se a figurinha ainda estiver na sua mão e for a número 10, toma aqui os R$ 10 e me entrega"*. Se alguém comprou 1 segundo antes de você, ele apenas diz *"já foi"*, e você procura outra sem ter bloqueado ninguém.

#### O Problema ABA
Se uma variável tinha o valor \`A\`, mudou para \`B\` e voltou para \`A\` antes do seu CAS executar, o CAS achará que nada mudou. Em ponteiros, isso pode ser perigoso. A solução comum é adicionar um número de versão sequencial (*Stamped Reference / Tagged Pointer*).

#### Key Takeaways
- Operações atômicas são a fundação de estruturas de dados de altíssima escala como ConcurrentHashMap e filas Lock-Free do Disruptor.`
  },

  // ------------------------------------------
  {
    id: 'CS-OS-SYS-006',
    relPath: 'decks/02-cs-fundamentals/os-memory/linux-io-syscalls/CS-OS-SYS-006.md',
    title: 'Intuição Fundamental de Syscalls e I/O no Linux: O Guichê de Atendimento entre Cidadão e Governo',
    tags: [
      'level::l2-fundamental',
      'topic::cs::os-memory',
      'company::redhat',
      'freq::high'
    ],
    question: 'O que são chamadas de sistema (syscalls) e por que os programas de usuário não podem acessar o hardware diretamente?',
    quickAnswer: `**Solução Direta**:
- Para impedir que programas com falhas destruam o sistema ou invadam dados alheios, o processador trabalha em dois níveis de privilégio: **Modo Usuário (User Space / Ring 3)** e **Modo Núcleo (Kernel Space / Ring 0)**.
- Um programa comum não tem permissão para tocar na placa de rede, disco ou memória física. Quando ele precisa ler um arquivo ou enviar dados pela rede, ele emite uma **Syscall** (como \`read\`, \`write\`, \`open\`), que transfere o controle para o Kernel executar a tarefa com segurança e devolver o resultado.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">A Barreira de Segurança: User Space (Ring 3) ➔ Kernel Space (Ring 0)</text>

  <!-- User Space -->
  <g transform="translate(30, 45)">
    <rect x="0" y="0" width="150" height="80" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="75" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">User Space (Ring 3)</text>
    <text x="75" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Seu Código Go/Java</text>
    <text x="75" y="60" fill="#3b82f6" font-size="9" font-family="monospace" text-anchor="middle">write(fd, buf, len)</text>
  </g>

  <!-- Syscall Gate -->
  <g transform="translate(225, 45)">
    <rect x="0" y="0" width="150" height="80" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="75" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Syscall Boundary</text>
    <text x="75" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Troca de Privilégio</text>
    <text x="75" y="60" fill="#34d399" font-size="9" text-anchor="middle">Validação &amp; Segurança</text>
  </g>

  <!-- Kernel Space -->
  <g transform="translate(420, 45)">
    <rect x="0" y="0" width="150" height="80" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="6" />
    <text x="75" y="22" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">Kernel Space (Ring 0)</text>
    <text x="75" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Drivers de Dispositivo</text>
    <text x="75" y="60" fill="#818cf8" font-size="9" text-anchor="middle">Acesso Físico a Disco/Rede</text>
  </g>

  <path d="M 180 85 L 225 85" stroke="#10b981" stroke-width="2" />
  <path d="M 375 85 L 420 85" stroke="#10b981" stroke-width="2" />

  <text x="300" y="160" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">No Linux tudo é tratado como arquivo através de File Descriptors (inteiros 0, 1, 2, ...)!</text>
</svg>`,
    table: `| Nível / Conceito | O que Faz | Analogia do Cotidiano |
|---|---|---|
| **User Space (Ring 3)** | Executa a lógica de negócios da sua aplicação | O cidadão comum andando na rua |
| **Syscall Interface** | O ponto de entrada seguro para pedir serviços ao SO | O balcão de atendimento do cartório/banco |
| **Kernel Space (Ring 0)** | Controla a CPU, memória e drivers com privilégio total | O funcionário credenciado que entra no cofre |`,
    deepDive: `#### A Analogia do Banco e do Cofre
Imagine um banco onde os clientes guardam dinheiro:
- O cliente (User Space) não tem permissão para entrar andando no cofre e pegar as cédulas com a própria mão. Se isso fosse permitido, um cliente mal-intencionado roubaria o dinheiro de todos os outros.
- Em vez disso, o cliente preenche uma ordem de saque e entrega no guichê (Syscall). O caixa autentica a identidade e vai até o cofre (Kernel) pegar o dinheiro para entregar ao cliente.

#### O Conceito de File Descriptor (FD)
No Unix e Linux, quase tudo é representado como um fluxo de bytes: arquivos em disco, conexões de rede (sockets), teclado (\`stdin\`) e tela (\`stdout\`). O Kernel apenas devolve um número inteiro simples chamado **File Descriptor (FD)**, e seu programa usa sempre os mesmos comandos (\`read\`, \`write\`, \`close\`) para qualquer um deles.

#### Key Takeaways
- Fazer chamadas de sistema tem um pequeno custo de troca de contexto (*Context Switch* entre Ring 3 e Ring 0).
- Bibliotecas padrão usam *buffers* (como \`bufio\` em Go ou \`BufferedOutputStream\` em Java) para agrupar muitas escritas pequenas em uma única syscall.`
  },

  // ------------------------------------------
  {
    id: 'CS-OS-KERN-006',
    relPath: 'decks/02-cs-fundamentals/os-memory/linux-kernel-process-management/CS-OS-KERN-006.md',
    title: 'Intuição Fundamental do Escalonamento no Linux: O Professor Dedicado e as Fatias de Tempo',
    tags: [
      'level::l2-fundamental',
      'topic::cs::os-memory',
      'company::canonical',
      'freq::high'
    ],
    question: 'Como o escalonador de processos do Linux (CFS) divide o tempo de CPU entre dezenas de programas abertos para dar a sensação de execução simultânea?',
    quickAnswer: `**Solução Direta**:
- Um computador pode ter 8 núcleos de processador, mas centenas de programas abertos ao mesmo tempo.
- O escalonador do Linux (CFS - *Completely Fair Scheduler*) divide o tempo da CPU em pequenas fatias de milissegundos (*Time Slices*). Ele monitora quanto tempo cada programa já rodou (*vruntime*) e **sempre concede a próxima fatia de CPU para o processo que teve menos tempo de execução recente**, mantendo a justiça total do sistema.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Escalonador CFS: Fatiamento de Tempo (Time Slicing) em Milissegundos</text>

  <!-- Linha do tempo de CPU -->
  <g transform="translate(50, 50)">
    <rect x="0" y="0" width="110" height="50" fill="#3b82f6" rx="4" />
    <text x="55" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Processo A</text>
    <text x="55" y="38" fill="#dbeafe" font-size="9" text-anchor="middle">5ms de CPU</text>

    <rect x="125" y="0" width="110" height="50" fill="#10b981" rx="4" />
    <text x="180" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Processo B</text>
    <text x="180" y="38" fill="#d1fae5" font-size="9" text-anchor="middle">5ms de CPU</text>

    <rect x="250" y="0" width="110" height="50" fill="#8b5cf6" rx="4" />
    <text x="305" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Processo C</text>
    <text x="305" y="38" fill="#ede9fe" font-size="9" text-anchor="middle">5ms de CPU</text>

    <rect x="375" y="0" width="110" height="50" fill="#3b82f6" rx="4" />
    <text x="430" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Processo A (Volta)</text>
    <text x="430" y="38" fill="#dbeafe" font-size="9" text-anchor="middle">5ms de CPU</text>
  </g>

  <!-- Estados de Processo -->
  <text x="300" y="135" fill="#f8fafc" font-size="11" font-family="sans-serif" text-anchor="middle">Estados do Ciclo: <tspan fill="#10b981" font-weight="bold">Running</tspan> (Executando) ➔ <tspan fill="#3b82f6" font-weight="bold">Ready</tspan> (Pronto na Fila) ➔ <tspan fill="#f59e0b" font-weight="bold">Sleeping</tspan> (Esperando I/O)</text>
  <text x="300" y="165" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">A rotação é tão rápida (100x por segundo) que humanos percebem como simultâneo!</text>
</svg>`,
    table: `| Estado do Processo | O que Significa | Analogia na Sala de Aula |
|---|---|---|
| **Running** | Ocupando um núcleo da CPU agora | O aluno que está falando com o professor |
| **Ready / Runnable** | Pronto para rodar, esperando a sua vez | Alunos com a mão levantada esperando a vez |
| **Sleeping (Blocked)** | Parado aguardando disco ou pacote de rede | Aluno que foi ao banheiro e não pode ser atendido agora |`,
    deepDive: `#### A Metáfora do Professor e dos 30 Alunos
Imagine um professor que precisa tirar dúvidas de 30 alunos em 1 hora:
- Se ele passar 1 hora inteira com o primeiro aluno, os outros 29 vão embora revoltados.
- Em vez disso, o professor atende cada aluno por 30 segundos em rodízio contínuo. Como a troca é rápida, todos sentem que estão progredindo juntos.

#### O que é um Processo "Zombie"?
Quando um processo filho termina seu trabalho, ele não desaparece da memória imediatamente: ele vira um **Zombie** guardando seu código de saída (*exit code*) até que o processo pai faça a leitura (\`wait()\`). Se o pai nunca ler, o zumbi ocupa uma entrada na tabela de processos.

#### Key Takeaways
- O Linux organiza os processos em uma Árvore Red-Black indexada pelo tempo virtual de execução (\`vruntime\`).
- Processos que passam muito tempo dormindo esperando rede (I/O Bound) ganham prioridade imediata quando acordam para garantir responsividade.`
  },

  // ------------------------------------------
  {
    id: 'CS-OS-IPC-006',
    relPath: 'decks/02-cs-fundamentals/os-memory/ipc-inter-process-communication/CS-OS-IPC-006.md',
    title: 'Intuição Fundamental de IPC: O Tubo Pneumático (Pipes), a Lousa Compartilhada e a Sirene (Signals)',
    tags: [
      'level::l2-fundamental',
      'topic::cs::os-memory',
      'company::uber',
      'freq::high'
    ],
    question: 'Quais são as principais formas de comunicação entre processos independentes (IPC) no Linux e quando usar cada uma?',
    quickAnswer: `**Solução Direta**:
- Como processos vivem em memórias estritamente isoladas, eles precisam de mecanismos do sistema operacional para trocar informações (**IPC - Inter-Process Communication**):
  - **Pipes**: Um tubo de correio pneumático unidirecional onde a saída do Processo A entra como entrada do Processo B.
  - **Memória Compartilhada (Shared Memory)**: Uma lousa física comum onde ambos escrevem e leem na velocidade da RAM, sem intermediários.
  - **Sinais (Signals)**: Sirenes rápidas de notificação (como \`SIGINT\` ao apertar \`Ctrl+C\` ou \`SIGKILL\` para encerrar).`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Mecanismos de IPC: Pipes vs Memória Compartilhada vs Signals</text>

  <!-- 1. Pipes -->
  <g transform="translate(30, 45)">
    <rect x="0" y="0" width="160" height="75" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="80" y="20" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">1. Unix Pipe (Tubo)</text>
    <text x="80" y="40" fill="#ffffff" font-size="10" text-anchor="middle">Proc A ➔ [Tubo] ➔ Proc B</text>
    <text x="80" y="60" fill="#64748b" font-size="9" text-anchor="middle">Fluxo contínuo em bytes</text>
  </g>

  <!-- 2. Shared Memory -->
  <g transform="translate(220, 45)">
    <rect x="0" y="0" width="160" height="75" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="80" y="20" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">2. Shared Memory (Lousa)</text>
    <text x="80" y="40" fill="#ffffff" font-size="10" text-anchor="middle">Zero Cópia de Dados</text>
    <text x="80" y="60" fill="#34d399" font-size="9" text-anchor="middle">Máxima velocidade na RAM</text>
  </g>

  <!-- 3. Signals -->
  <g transform="translate(410, 45)">
    <rect x="0" y="0" width="160" height="75" fill="#1e1b4b" stroke="#ef4444" stroke-width="1.5" rx="6" />
    <text x="80" y="20" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">3. Signals (Sirene)</text>
    <text x="80" y="40" fill="#ffffff" font-size="10" text-anchor="middle">SIGINT (2), SIGTERM (15)</text>
    <text x="80" y="60" fill="#f87171" font-size="9" text-anchor="middle">Notificações assíncronas</text>
  </g>

  <text x="300" y="155" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Escolha: Pipes para simplicidade, Shared Memory para alta taxa de dados!</text>
</svg>`,
    table: `| Mecanismo de IPC | Velocidade & Características | Analogia do Mundo Real |
|---|---|---|
| **Unix Pipes** | Média (passa pelo Kernel) | Tubo de correio pneumático entre duas salas |
| **Shared Memory** | Instantânea (acesso direto à RAM) | Uma lousa branca instalada na parede divisória |
| **Unix Domain Sockets** | Bidirecional seguro com controle de acesso | Uma linha telefônica privada interna da empresa |`,
    deepDive: `#### A Filosofia Unix do Pipe
O comando \`cat logs.txt | grep ERROR | wc -l\` exemplifica a elegância dos Pipes:
- Cada programa faz apenas uma coisa com perfeição.
- O Kernel cria um buffer em memória e conecta o \`stdout\` de um no \`stdin\` do seguinte. Se o leitor for lento, o Kernel pausa o escritor automaticamente (*Backpressure*).

#### Por que Shared Memory exige Cuidado?
Como o Kernel não faz intermediação na Memória Compartilhada, os dois processos leem e escrevem no mesmo endereço físico. Se eles não usarem um Semáforo ou Mutex compartilhado para coordenar, um processo lerá dados incompletos gravados pelo outro.

#### Key Takeaways
- Signals não carregam dados complexos, apenas um número identificador de evento (ex: \`SIGKILL = 9\`).
- Unix Domain Sockets são mais rápidos que TCP/IP na mesma máquina porque evitam o empacotamento da pilha de rede.`
  },

  // ==========================================
  // MODULE 3: RUNTIMES & GC
  // ==========================================
  {
    id: 'CS-RNT-JVM-006',
    relPath: 'decks/02-cs-fundamentals/runtimes-garbage-collection/jvm-memory-gc/CS-RNT-JVM-006.md',
    title: 'Intuição Fundamental da JVM e Garbage Collection: O Berçário e o Museu da Hipótese Geracional',
    tags: [
      'level::l2-fundamental',
      'topic::cs::runtimes',
      'company::oracle',
      'freq::high'
    ],
    question: 'Qual é a intuição fundamental por trás da Hipótese Geracional do Garbage Collector da JVM e como ela organiza a memória Heap?',
    quickAnswer: `**Solução Direta**:
- A **Hipótese Geracional Fraca** comprova que **mais de 95% dos objetos criados em um programa morrem quase instantaneamente** (são descartados logo após a função terminar).
- Para não perder tempo varrendo a memória inteira, a JVM divide a Heap em duas regiões:
  - **Young Generation (Eden & Survivor)**: O berçário onde todos os objetos nascem e onde uma limpeza rápida (*Minor GC*) coleta o lixo recente em milissegundos.
  - **Old Generation (Tenured)**: O museu/asilo onde ficam apenas os poucos objetos que sobreviveram a vários ciclos de limpeza e viverão por muito tempo (ex: caches e conexões).`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Hipótese Geracional da JVM: Eden ➔ Survivor ➔ Old Generation</text>

  <!-- Young Generation Box -->
  <rect x="40" y="45" width="280" height="90" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
  <text x="180" y="65" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Young Generation (Minor GC Frequente)</text>

  <!-- Eden -->
  <rect x="55" y="75" width="130" height="45" fill="#065f46" stroke="#10b981" rx="4" />
  <text x="120" y="95" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Espaço Eden</text>
  <text x="120" y="110" fill="#ffffff" font-size="8" text-anchor="middle">Novos Objetos Nascem</text>

  <!-- Survivor -->
  <rect x="195" y="75" width="110" height="45" fill="#1e293b" stroke="#818cf8" rx="4" />
  <text x="250" y="95" fill="#c7d2fe" font-size="10" font-weight="bold" text-anchor="middle">Survivor (S0/S1)</text>
  <text x="250" y="110" fill="#ffffff" font-size="8" text-anchor="middle">Sobreviventes</text>

  <!-- Seta de Promoção -->
  <path d="M 325 90 L 370 90" stroke="#10b981" stroke-width="2" />
  <text x="348" y="80" fill="#10b981" font-size="8" text-anchor="middle">Promoção</text>

  <!-- Old Generation Box -->
  <rect x="375" y="45" width="185" height="90" fill="#1e1b4b" stroke="#8b5cf6" stroke-width="1.5" rx="6" />
  <text x="467" y="65" fill="#c4b5fd" font-size="11" font-weight="bold" text-anchor="middle">Old Generation (Tenured)</text>
  <text x="467" y="95" fill="#ffffff" font-size="10" text-anchor="middle">Objetos de Longa Vida</text>
  <text x="467" y="112" fill="#a78bfa" font-size="8" text-anchor="middle">Major / Full GC (Mais Raro)</text>

  <text x="300" y="165" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Benefício: Limpar apenas o Eden é 100x mais rápido do que varrer a memória inteira!</text>
</svg>`,
    table: `| Região da Memória | Vida Útil Típica | Analogia do Cotidiano |
|---|---|---|
| **Eden Space** | Frações de segundo (morrem logo) | Copos descartáveis usados e jogados no lixo na hora |
| **Survivor Spaces** | Alguns segundos | Roupas de teste que passaram pela primeira triagem |
| **Tenured (Old Gen)** | Minutos, horas ou dias | Móveis da casa que ficam por anos no mesmo lugar |`,
    deepDive: `#### O que é o Fenômeno Stop-The-World (STW)?
Para saber quais objetos ainda estão vivos sem risco de o programa mudar as referências por debaixo dos panos, o Garbage Collector pausa temporariamente todas as threads da aplicação (*Stop-The-World*).

Graças à divisão geracional:
- Um **Minor GC** (que limpa apenas o Eden) leva menos de **2 a 5 milissegundos**, sendo imperceptível para o usuário.
- Coletores modernos como **G1** e **ZGC** dividem a memória em centenas de pequenas regiões e realizam a maior parte da coleta de forma concorrente, reduzindo as pausas para menos de **1 milissegundo**.

#### Key Takeaways
- Crie objetos de curta duração sem medo: a JVM é extremamente eficiente para alocar no Eden e descartar no Minor GC.
- Evite criar objetos que fiquem vivos por tempo "médio": eles acabam promovidos para a Old Gen desnecessariamente.`
  },

  // ------------------------------------------
  {
    id: 'CS-RNT-GO-006',
    relPath: 'decks/02-cs-fundamentals/runtimes-garbage-collection/go-runtime-gc/CS-RNT-GO-006.md',
    title: 'Intuição Fundamental do Runtime do Go: O Modelo M:N de Goroutines e o Faxineiro Concorrente Tricolor',
    tags: [
      'level::l2-fundamental',
      'topic::cs::runtimes',
      'company::google',
      'freq::high'
    ],
    question: 'Por que o runtime do Go consegue executar centenas de milhares de goroutines simultâneas com pausas de Garbage Collection inferiores a 1 milissegundo?',
    quickAnswer: `**Solução Direta**:
- **Goroutines Ultraleves**: Uma thread comum do sistema operacional ocupa de 1 a 2 MB de memória de início. Uma **goroutine** do Go nasce com apenas **2 KB de stack** que cresce dinamicamente conforme necessário, permitindo criar 500.000 goroutines em um único servidor.
- **Escalonador M:N (G-M-P)**: O Go gerencia suas milhares de Goroutines (\`G\`) distribuindo-as entre poucas Threads do SO (\`M\`) acopladas aos núcleos de processador (\`P\`).
- **GC Tricolor Concorrente**: O faxineiro de memória do Go varre e marca os objetos vivos ao mesmo tempo em que seu código continua rodando, reduzindo pausas (*STW*) para microssegundos.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">O Escalonador G-M-P do Go: Milhares de Goroutines em Poucos Cores</text>

  <!-- Goroutines G -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="140" height="75" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="70" y="20" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Goroutines (G)</text>
    <text x="70" y="38" fill="#ffffff" font-size="10" text-anchor="middle">~2 KB de Stack inicial</text>
    <text x="70" y="55" fill="#60a5fa" font-size="9" text-anchor="middle">100.000+ simultâneas!</text>
  </g>

  <!-- Processador Lógico P -->
  <g transform="translate(225, 45)">
    <rect x="0" y="0" width="150" height="75" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="75" y="20" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Processor Lógico (P)</text>
    <text x="75" y="38" fill="#ffffff" font-size="10" text-anchor="middle">Fila Local de Tarefas</text>
    <text x="75" y="55" fill="#34d399" font-size="9" text-anchor="middle">Work Stealing se ocioso</text>
  </g>

  <!-- Machine Thread M -->
  <g transform="translate(420, 45)">
    <rect x="0" y="0" width="140" height="75" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="6" />
    <text x="70" y="20" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">OS Thread (M)</text>
    <text x="70" y="38" fill="#ffffff" font-size="10" text-anchor="middle">Executa no Core Real</text>
    <text x="70" y="55" fill="#a5b4fc" font-size="9" text-anchor="middle">CPU Física de Hardware</text>
  </g>

  <path d="M 180 82 L 225 82" stroke="#10b981" stroke-width="2" />
  <path d="M 375 82 L 420 82" stroke="#10b981" stroke-width="2" />

  <text x="300" y="160" fill="#10b981" font-size="11" font-family="monospace" text-anchor="middle">Pausa do GC no Go: Menos de 1 ms graças à marcação concorrente!</text>
</svg>`,
    table: `| Conceito do Runtime | O que Significa | Analogia do Cotidiano |
|---|---|---|
| **Goroutine (\`go func()\`)** | Tarefa ultraleve cooperativa de 2 KB | Uma ficha de pedido de restaurante |
| **Work Stealing** | Núcleo sem trabalho "rouba" tarefas do vizinho | Caixa livre no supermercado que chama clientes da outra fila |
| **GC Tricolor** | Classificação contínua: Branco (lixo), Cinza, Preto (vivo) | Faxineiro limpando o salão enquanto os clientes ainda jantam |`,
    deepDive: `#### Por que o Go não usa GC Geracional complexo?
O compilador do Go é extremamente agressivo em **Escape Analysis**: tudo o que não escapa da função é alocado diretamente na **Stack** (que é limpa a custo zero no retorno da função). Como menos objetos vão para a Heap, o GC do Go não precisa de geradores complexos: ele foca em simplicidade e pausas mínimas de latência.

#### Key Takeaways
- Goroutines são muito mais baratas que Threads de SO porque são gerenciadas totalmente no User Space pelo runtime do Go.
- Quando uma goroutine faz uma syscall bloqueante, o Go desvincula a thread e mantém as outras goroutines rodando em outros núcleos.`
  },

  // ------------------------------------------
  {
    id: 'CS-RNT-ALLOC-006',
    relPath: 'decks/02-cs-fundamentals/runtimes-garbage-collection/memory-allocation-escape-analysis/CS-RNT-ALLOC-006.md',
    title: 'Intuição Fundamental de Stack vs Heap e Escape Analysis: A Mochila Pessoal vs o Galpão Alugado',
    tags: [
      'level::l2-fundamental',
      'topic::cs::runtimes',
      'company::uber',
      'freq::high'
    ],
    question: 'Qual é a diferença fundamental entre alocar memória na Stack (Pilha) vs na Heap e como o compilador decide o destino usando Escape Analysis?',
    quickAnswer: `**Solução Direta**:
- **Stack (Pilha)**: É a sua **mochila de uso imediato**. A alocação é instantânea (apenas move o ponteiro de pilha) e quando a função termina, todas as variáveis locais são descartadas automaticamente sem custo de limpeza.
- **Heap (Montículo)**: É um **galpão compartilhado**. Usada quando os dados precisam continuar existindo mesmo depois que a função criadora terminou ou quando o tamanho do dado é desconhecido antecipadamente.
- **Escape Analysis**: É a inteligência do compilador que verifica: *"Esse ponteiro sai do escopo da função atual?"*. Se não escapar, aloca na Stack para máxima velocidade; se escapar, aloca na Heap.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Stack (Instantânea &amp; Automática) vs Heap (Dinâmica &amp; Com GC)</text>

  <!-- Lado Esquerdo: Stack -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="220" height="85" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="110" y="22" fill="#a7f3d0" font-size="12" font-weight="bold" text-anchor="middle">📦 Stack (Pilha de Execução)</text>
    <text x="110" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Variáveis locais da função</text>
    <text x="110" y="58" fill="#34d399" font-size="9" text-anchor="middle">Limpeza a custo ZERO no return</text>
    <text x="110" y="74" fill="#a7f3d0" font-size="8" font-family="monospace" text-anchor="middle">Apenas SP = SP - size</text>
  </g>

  <!-- Escape Analysis Gate -->
  <path d="M 265 87 L 330 87" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4,4" />
  <text x="298" y="75" fill="#93c5fd" font-size="8" text-anchor="middle">Escapa?</text>

  <!-- Lado Direito: Heap -->
  <g transform="translate(340, 45)">
    <rect x="0" y="0" width="220" height="85" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="110" y="22" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">🏭 Heap (Memória Dinâmica)</text>
    <text x="110" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Objetos compartilhados / Ponteiros</text>
    <text x="110" y="58" fill="#60a5fa" font-size="9" text-anchor="middle">Exige Garbage Collector ou free()</text>
    <text x="110" y="74" fill="#93c5fd" font-size="8" font-family="monospace" text-anchor="middle">Custo de fragmentação e busca</text>
  </g>

  <text x="300" y="160" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Regra de Performance: Quanto mais alocações ficarem na Stack, mais rápido seu código roda!</text>
</svg>`,
    table: `| Espaço de Memória | Custo e Limpeza | Analogia no Trabalho |
|---|---|---|
| **Stack (Pilha)** | Custo zero de limpeza; acesso em cache | Rascunho no bloco de notas da sua mesa |
| **Heap (Montículo)** | Custo de busca de blocos e passagem do GC | Alugar um box no depósito central da empresa |
| **Escape Analysis** | Decisão em tempo de compilação | O chefe avaliando se você precisa levar o arquivo para viagem |`,
    deepDive: `#### Exemplo Intuitivo em Go
\`\`\`go
// Alocado na STACK:
func somaLocal(a, b int) int {
    resultado := a + b // resultado morre aqui, fica na Stack
    return resultado
}

// Alocado na HEAP (Escapou!):
func criaUsuario() *Usuario {
    u := Usuario{Nome: "Ana"}
    return &u // Retornou o ponteiro: a memória precisa sobreviver, vai para a Heap!
}
\`\`\`

#### Key Takeaways
- Alocação na Stack não gera trabalho algum para o Garbage Collector.
- Otimização de performance de alto nível em Go/C++/Rust foca em desenhar estruturas que evitem escapar para a Heap.`
  },

  // ==========================================
  // MODULE 4: NETWORKING
  // ==========================================
  {
    id: 'CS-NET-TCP-006',
    relPath: 'decks/02-cs-fundamentals/networking/tcp-udp-transport/CS-NET-TCP-006.md',
    title: 'Intuição Fundamental de TCP vs UDP: O Sedex com Confirmação de Entrega vs a Transmissão de Rádio FM',
    tags: [
      'level::l2-fundamental',
      'topic::cs::networking',
      'company::cisco',
      'freq::high'
    ],
    question: 'Qual é a diferença conceitual e de garantias entre os protocolos da camada de transporte TCP e UDP na Internet?',
    quickAnswer: `**Solução Direta**:
- **TCP (Transmission Control Protocol)**: É como uma **carta registrada dos correios com aviso de recebimento**: antes de mandar qualquer dado, ele estabelece conexão formal (*3-Way Handshake*), numera cada pacote, reenvia tudo o que for perdido e garante a ordem perfeita de entrega.
- **UDP (User Datagram Protocol)**: É como uma **transmissão de rádio ao vivo ou megafone**: envia pacotes com velocidade máxima sem pedir confirmação nem reordenar. Se um pacote cair no caminho, a vida segue (ideal para jogos online, voz e streaming ao vivo).`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">TCP (Confiável &amp; Ordenado) vs UDP (Rápido &amp; Sem Garantias)</text>

  <!-- Lado Esquerdo: TCP -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="230" height="90" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="115" y="20" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">📦 TCP (Orientado à Conexão)</text>
    <text x="115" y="40" fill="#ffffff" font-size="10" text-anchor="middle">🤝 3-Way Handshake (SYN, SYN-ACK, ACK)</text>
    <text x="115" y="58" fill="#60a5fa" font-size="9" text-anchor="middle">✓ Entrega Garantida &amp; Na Ordem Exata</text>
    <text x="115" y="74" fill="#93c5fd" font-size="8" text-anchor="middle">Uso: Web (HTTP), Bancos, E-mails, Arquivos</text>
  </g>

  <!-- Lado Direito: UDP -->
  <g transform="translate(330, 45)">
    <rect x="0" y="0" width="230" height="90" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="115" y="20" fill="#a7f3d0" font-size="12" font-weight="bold" text-anchor="middle">⚡ UDP (Sem Conexão / Datagram)</text>
    <text x="115" y="40" fill="#ffffff" font-size="10" text-anchor="middle">🚀 Envia direto sem esperar confirmação</text>
    <text x="115" y="58" fill="#34d399" font-size="9" text-anchor="middle">✗ Perda tolerável, prioriza menor latência</text>
    <text x="115" y="74" fill="#a7f3d0" font-size="8" text-anchor="middle">Uso: Jogos Online (FPS), DNS, Vídeo ao Vivo</text>
  </g>

  <text x="300" y="160" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Regra: Se perder dados é inaceitável use TCP; se atraso é inaceitável use UDP!</text>
</svg>`,
    table: `| Característica | TCP | UDP |
|---|---|---|
| **Conexão** | Exige aperto de mão prévio (3-way handshake) | Nenhuma conexão prévia necessária |
| **Garantia de Entrega** | Sim (retransmite pacotes perdidos) | Não (pacotes perdidos são ignorados) |
| **Ordem dos Pacotes** | Rigorosamente garantida por números de sequência | Podem chegar fora de ordem |`,
    deepDive: `#### O 3-Way Handshake do TCP
Antes de trocar 1 byte sequer de dados:
1. **SYN**: Cliente diz *"Olá, quero conversar! Meu número inicial é X"*.
2. **SYN-ACK**: Servidor responde *"Recebi seu X, também quero conversar! Meu número inicial é Y"*.
3. **ACK**: Cliente confirma *"Combinado, recebi seu Y. Vamos começar!"*.

#### Por que Jogos usam UDP?
Em um jogo de tiro online, sua posição no mapa é enviada 60 vezes por segundo. Se o pacote com sua posição de 50 milissegundos atrás foi perdido na rede, não faz sentido o TCP parar tudo para retransmiti-lo: você já andou para outro lugar. É melhor receber a posição mais recente instantaneamente via UDP.

#### Key Takeaways
- O TCP implementa controle de congestionamento para não afogar a rede.
- O protocolo HTTP/3 usa o protocolo QUIC, que roda sobre UDP para unir o melhor dos dois mundos.`
  },

  // ------------------------------------------
  {
    id: 'CS-NET-HTTP-006',
    relPath: 'decks/02-cs-fundamentals/networking/http-protocols/CS-NET-HTTP-006.md',
    title: 'Intuição Fundamental de HTTP/1.1, HTTP/2 e HTTP/3: Do Pedágio com Fila Única à Rodovia Expressa sem Cancelas',
    tags: [
      'level::l2-fundamental',
      'topic::cs::networking',
      'company::cloudflare',
      'freq::high'
    ],
    question: 'Qual foi a motivação fundamental para a evolução do protocolo HTTP da versão 1.1 para o HTTP/2 (multiplexação) e HTTP/3 (QUIC/UDP)?',
    quickAnswer: `**Solução Direta**:
- **HTTP/1.1 (Fila Única)**: Cada arquivo precisava de sua própria requisição sequencial por conexão TCP. Se uma imagem demorava para carregar, todos os outros arquivos ficavam travados esperando atrás dela (**Head-of-Line Blocking**).
- **HTTP/2 (Multiplexação)**: Permitiu enviar dezenas de arquivos simultaneamente fatiados em pequenos quadros binários (*frames*) dentro de **uma única conexão TCP**.
- **HTTP/3 (Adeus ao Bloqueio TCP com QUIC/UDP)**: Substituiu o TCP por **QUIC (sobre UDP)**: agora, se um pacote de um arquivo for perdido na rede, apenas aquele arquivo específico espera a correção; todos os outros continuam carregando normalmente.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Evolução do HTTP: Do Bloqueio em Fila à Multiplexação Real</text>

  <!-- HTTP/1.1 -->
  <g transform="translate(30, 45)">
    <rect x="0" y="0" width="160" height="80" fill="#1e293b" stroke="#ef4444" stroke-width="1.5" rx="6" />
    <text x="80" y="20" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">HTTP/1.1 (Texto Puro)</text>
    <text x="80" y="40" fill="#ffffff" font-size="9" text-anchor="middle">1 requisição por vez</text>
    <text x="80" y="58" fill="#ef4444" font-size="9" text-anchor="middle">Gargalo HoL Blocking</text>
  </g>

  <!-- HTTP/2 -->
  <g transform="translate(220, 45)">
    <rect x="0" y="0" width="160" height="80" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="80" y="20" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">HTTP/2 (Multiplexado)</text>
    <text x="80" y="40" fill="#ffffff" font-size="9" text-anchor="middle">Vários streams em 1 TCP</text>
    <text x="80" y="58" fill="#60a5fa" font-size="9" text-anchor="middle">Quadros Binários (Frames)</text>
  </g>

  <!-- HTTP/3 -->
  <g transform="translate(410, 45)">
    <rect x="0" y="0" width="160" height="80" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="80" y="20" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">HTTP/3 (QUIC / UDP)</text>
    <text x="80" y="40" fill="#ffffff" font-size="9" text-anchor="middle">Streams independentes</text>
    <text x="80" y="58" fill="#34d399" font-size="9" text-anchor="middle">Zero HoL Blocking no TCP!</text>
  </g>

  <text x="300" y="155" fill="#10b981" font-size="11" font-family="monospace" text-anchor="middle">Resultado: Páginas web carregam de 2x a 5x mais rápido em redes móveis/instáveis!</text>
</svg>`,
    table: `| Versão do HTTP | Principal Inovação | Analogia no Trânsito |
|---|---|---|
| **HTTP/1.1** | Conexões persistentes (\`Keep-Alive\`) | Uma cabine de pedágio onde cada carro espera o anterior sair |
| **HTTP/2** | Multiplexação binária + compressão de cabeçalhos HPACK | Várias faixas entrando juntas na mesma ponte |
| **HTTP/3** | Protocolo QUIC sobre UDP + 0-RTT Handshake | Rodovia livre com cobrança eletrônica sem cancelas |`,
    deepDive: `#### O Problema do Head-of-Line Blocking no HTTP/2
O HTTP/2 resolveu o bloqueio no nível da aplicação, mas continuou sofrendo no nível do transporte TCP:
- Como todos os arquivos compartilham **a mesma conexão TCP**, se 1 único pacote de dados for perdido pelo sinal fraco do Wi-Fi, o protocolo TCP congela **todos** os outros arquivos até que aquele pacote seja retransmitido.
- O **HTTP/3** corrigiu isso usando UDP: cada arquivo é um fluxo QUIC totalmente isolado. Se o pacote da imagem 1 cair, a imagem 2 e o CSS continuam sendo entregues sem 1 milissegundo de atraso.

#### Key Takeaways
- O HTTP/2 e HTTP/3 utilizam protocolos binários em vez de texto puro legível.
- O HTTP/3 permite migração suave de conexões (ex: mudar do Wi-Fi de casa para o 5G na rua sem derrubar o download).`
  },

  // ------------------------------------------
  {
    id: 'CS-NET-DNS-006',
    relPath: 'decks/02-cs-fundamentals/networking/dns-tls/CS-NET-DNS-006.md',
    title: 'Intuição Fundamental de DNS e TLS: A Agenda de Contatos da Internet e a Mala Diplomática com Segredo',
    tags: [
      'level::l2-fundamental',
      'topic::cs::networking',
      'company::cloudflare',
      'freq::high'
    ],
    question: 'Como o DNS e o TLS trabalham juntos para permitir que um navegador encontre um servidor pelo nome e estabeleça uma comunicação segura e privada?',
    quickAnswer: `**Solução Direta**:
- **DNS (Domain Name System)**: É a **agenda de contatos da Internet**: os humanos lembram nomes como \`google.com\`, mas os roteadores só entendem endereços IP numéricos como \`142.250.190.46\`. O DNS resolve essa tradução através de uma árvore hierárquica (Root ➔ TLD ➔ Autoritativo).
- **TLS (Transport Layer Security / HTTPS)**: É o **envelope lacrado com segredo**: usa criptografia para garantir que ninguém no caminho (provedor, hackers no Wi-Fi público) consiga espionar (*confidencialidade*) ou alterar (*integridade*) as mensagens trocadas com o servidor autêntico.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">A Dupla Fundamental da Web: DNS (Endereço) + TLS (Segurança)</text>

  <!-- DNS Step -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="230" height="85" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="115" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">📖 1. Resolução DNS</text>
    <text x="115" y="42" fill="#ffffff" font-size="10" text-anchor="middle">"Onde fica google.com?"</text>
    <text x="115" y="60" fill="#60a5fa" font-size="9" text-anchor="middle">Devolve IP: 142.250.190.46</text>
    <text x="115" y="74" fill="#64748b" font-size="8" text-anchor="middle">Usa cache recursivo local</text>
  </g>

  <!-- TLS Step -->
  <g transform="translate(330, 45)">
    <rect x="0" y="0" width="230" height="85" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="115" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">🔒 2. Handshake TLS (HTTPS)</text>
    <text x="115" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Valida Certificado Digital (CA)</text>
    <text x="115" y="60" fill="#34d399" font-size="9" text-anchor="middle">Gera Chave Simétrica de Sessão</text>
    <text x="115" y="74" fill="#a7f3d0" font-size="8" text-anchor="middle">Túnel 100% Criptografado (AES-GCM)</text>
  </g>

  <text x="300" y="160" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Segurança Moderna: TLS 1.3 reduz o handshake para apenas 1 Round-Trip (1-RTT)!</text>
</svg>`,
    table: `| Etapa / Protocolo | O que Faz na Rede | Analogia do Cotidiano |
|---|---|---|
| **DNS** | Traduz nome de domínio para endereço IP | Procurar o número da empresa na lista telefônica |
| **Certificado TLS (CA)** | Prova que o servidor é quem diz ser | Apresentar o passaporte oficial emitido pelo governo |
| **Criptografia Simétrica** | Cifra o tráfego com uma chave secreta rápida | Conversar em uma sala à prova de som trancada por dentro |`,
    deepDive: `#### A Dança Criptográfica do TLS
1. **Criptografia Assimétrica (Chave Pública/Privada)**: É usada apenas no início (handshake) porque é pesada para o processador. Serve para conferir o certificado e combinar uma senha temporária em segurança.
2. **Criptografia Simétrica (AES-GCM / ChaCha20)**: Uma vez combinada a senha temporária, toda a troca real de dados usa essa chave simétrica, que é executada por instruções nativas de hardware na CPU na velocidade de gigabits por segundo.

#### Key Takeaways
- O DNS usa cache em múltiplos níveis (navegador, SO, roteador, ISP) para que 99% das consultas sejam resolvidas em 0 milissegundos.
- TLS 1.3 removeu algoritmos criptográficos legados e inseguros.`
  },

  // ------------------------------------------
  {
    id: 'CS-NET-SOCK-006',
    relPath: 'decks/02-cs-fundamentals/networking/socket-io-epoll/CS-NET-SOCK-006.md',
    title: 'Intuição Fundamental de Sockets e Multiplexação I/O (epoll): O Garçom Dedicado vs o Pager Eletrônico de Restaurante',
    tags: [
      'level::l2-fundamental',
      'topic::cs::networking',
      'company::nginx',
      'freq::high'
    ],
    question: 'Por que servidores modernos utilizam multiplexação de I/O orientada a eventos (epoll/kqueue) em vez de criar uma thread dedicada para cada conexão de socket?',
    quickAnswer: `**Solução Direta**:
- **Abordagem Tradicional (1 Thread por Conexão)**: É como contratar 1 garçom para ficar parado ao lado de cada mesa do restaurante esperando o cliente decidir o que pedir. Com 10.000 clientes, o restaurante vai à falência pagando 10.000 garçons que passam 99% do tempo sem fazer nada (*Blocking I/O*).
- **Multiplexação Não-Bloqueante (\`epoll\` / \`kqueue\`)**: É como colocar um **pager eletrônico com botão em cada mesa**: um único garçom fica no balcão e **o sistema operacional avisa instantaneamente apenas qual mesa apertou o botão**, permitindo que 1 única thread atenda 100.000 conexões simultâneas com facilidade (resolvendo o famoso problema C10K).`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Modelos de I/O: Thread por Conexão vs Loop de Eventos com epoll</text>

  <!-- Lado Esquerdo: 1 Thread por Conexão -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="230" height="85" fill="#1e293b" stroke="#ef4444" stroke-width="1.5" rx="6" />
    <text x="115" y="20" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">❌ 1 Thread por Conexão</text>
    <text x="115" y="40" fill="#ffffff" font-size="9" text-anchor="middle">10.000 clientes = 10.000 Threads</text>
    <text x="115" y="56" fill="#ef4444" font-size="9" text-anchor="middle">Gasto brutal de RAM e Context Switch</text>
    <text x="115" y="72" fill="#64748b" font-size="8" text-anchor="middle">Servidor trava com poucos clientes</text>
  </g>

  <!-- Lado Direito: epoll Event Loop -->
  <g transform="translate(330, 45)">
    <rect x="0" y="0" width="230" height="85" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="115" y="20" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">✓ Event Loop com epoll (Nginx/Node/Netty)</text>
    <text x="115" y="40" fill="#ffffff" font-size="9" text-anchor="middle">1 Thread atende 100.000+ Sockets</text>
    <text x="115" y="56" fill="#34d399" font-size="9" text-anchor="middle">Notificação O(1) pelo Kernel Linux</text>
    <text x="115" y="72" fill="#a7f3d0" font-size="8" text-anchor="middle">Consumo mínimo de memória e CPU</text>
  </g>

  <text x="300" y="160" fill="#10b981" font-size="11" font-family="monospace" text-anchor="middle">Fundação de alta performance do Nginx, Redis, Netty e Node.js!</text>
</svg>`,
    table: `| Modelo de I/O | Comportamento | Analogia de Restaurante |
|---|---|---|
| **Blocking I/O** | Thread para e dorme esperando dados chegarem | Garçom parado olhando o cliente ler o cardápio |
| **Select / Poll** | Varre todas as 10.000 conexões uma a uma ($O(N)$) | Garçom perguntando de mesa em mesa se alguém quer pedir |
| **epoll / kqueue** | Kernel notifica apenas quem tem dados prontos ($O(1)$) | Campainha na mesa que apita no painel do garçom |`,
    deepDive: `#### O Problema C10K (10.000 Conexões Simultâneas)
Nos anos 2000, servidores web como o Apache original criavam um processo ou thread por usuário. Quando 10.000 conexões conectavam ao mesmo tempo, a máquina gastava 10 GB de RAM só para pilhas de execução de threads e colapsava a CPU com trocas de contexto.

O surgimento do \`epoll\` no Linux 2.6 permitiu que servidores como o **Nginx** e o **Redis** processassem milhões de requisições por segundo em um único núcleo de CPU.

#### Key Takeaways
- Sockets são interfaces de rede operadas como arquivos no Linux.
- Multiplexação de I/O orientada a eventos é o padrão da indústria para qualquer serviço de alta concorrência.`
  },

  // ------------------------------------------
  {
    id: 'CS-NET-API-006',
    relPath: 'decks/02-cs-fundamentals/networking/modern-apis-protocols/CS-NET-API-006.md',
    title: 'Intuição Fundamental de REST, gRPC, GraphQL e WebSockets: O Menu Fechado, o Rádio Militar, o Buffet e o Telefone Aberto',
    tags: [
      'level::l2-fundamental',
      'topic::cs::networking',
      'company::meta',
      'freq::high'
    ],
    question: 'Qual é a intuição fundamental para escolher entre os diferentes estilos de APIs e protocolos modernos de comunicação de backend?',
    quickAnswer: `**Solução Direta**:
- Cada estilo de API resolve um tipo específico de problema de comunicação:
  - **REST (JSON/HTTP)**: O **menu clássico à la carte** — simples, universalmente suportado e padronizado em verbos HTTP (\`GET\`, \`POST\`).
  - **GraphQL**: O **buffet livre** — o cliente escreve uma consulta pedindo exatamente os campos que deseja, evitando carregar dados a mais ou a menos.
  - **gRPC (Protobuf/HTTP2)**: A **mensagem de rádio militar ultracompacta** — dados serializados em binário com contratos rígidos, ideal para comunicação ultra-rápida entre microsserviços.
  - **WebSockets**: Uma **linha telefônica contínua aberta** — canal bidirecional permanente (*Full-Duplex*) para streaming e mensagens em tempo real sem o overhead de abrir conexões repetidas.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Guia Visual de Escolha de APIs: O Formato Certo para Cada Caso</text>

  <!-- REST -->
  <g transform="translate(30, 45)">
    <rect x="0" y="0" width="120" height="75" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="60" y="20" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">REST (JSON)</text>
    <text x="60" y="38" fill="#ffffff" font-size="9" text-anchor="middle">Universal &amp; Simples</text>
    <text x="60" y="55" fill="#60a5fa" font-size="8" text-anchor="middle">APIs públicas web</text>
  </g>

  <!-- GraphQL -->
  <g transform="translate(165, 45)">
    <rect x="0" y="0" width="125" height="75" fill="#1e293b" stroke="#ec4899" stroke-width="1.5" rx="6" />
    <text x="62" y="20" fill="#f472b6" font-size="11" font-weight="bold" text-anchor="middle">GraphQL</text>
    <text x="62" y="38" fill="#ffffff" font-size="9" text-anchor="middle">Cliente escolhe dados</text>
    <text x="62" y="55" fill="#f472b6" font-size="8" text-anchor="middle">Apps mobile flexíveis</text>
  </g>

  <!-- gRPC -->
  <g transform="translate(305, 45)">
    <rect x="0" y="0" width="125" height="75" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="62" y="20" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">gRPC (Protobuf)</text>
    <text x="62" y="38" fill="#ffffff" font-size="9" text-anchor="middle">Binário &amp; 10x Rápido</text>
    <text x="62" y="55" fill="#34d399" font-size="8" text-anchor="middle">Microsserviços internos</text>
  </g>

  <!-- WebSockets -->
  <g transform="translate(445, 45)">
    <rect x="0" y="0" width="125" height="75" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="6" />
    <text x="62" y="20" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">WebSockets</text>
    <text x="62" y="38" fill="#ffffff" font-size="9" text-anchor="middle">Bi-direcional Realtime</text>
    <text x="62" y="55" fill="#a5b4fc" font-size="8" text-anchor="middle">Chat, Finanças, Jogos</text>
  </g>

  <text x="300" y="160" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Não existe bala de prata: use gRPC internamente e REST/GraphQL para clientes externos!</text>
</svg>`,
    table: `| Protocolo / Estilo | Formato & Transporte | Quando Escolher |
|---|---|---|
| **REST** | JSON textual sobre HTTP/1.1 ou HTTP/2 | APIs públicas e CRUDs tradicionais com clientes diversos |
| **gRPC** | Protobuf binário sobre HTTP/2 com streaming | Comunicação de altíssimo throughput entre microsserviços |
| **GraphQL** | JSON flexível sobre POST HTTP | Telas complexas de celular com muitas relações de entidades |
| **WebSockets** | Conexão TCP contínua bidirecional | Chats ao vivo, cotações financeiras e colaboração em tempo real |`,
    deepDive: `#### Por que o gRPC é tão mais rápido que o REST?
1. **Serialização Binária (Protobuf)**: O JSON precisa escrever \`{"idade": 25}\` como texto (14 bytes). O Protobuf codifica o número \`25\` em binário usando apenas 2 bytes.
2. **Contratos Estritos (.proto)**: O compilador gera código fortemente tipado nas linguagens dos serviços, eliminando erros manuais de parsing.

#### Key Takeaways
- Evite WebSockets para operações simples de requisição-resposta (use REST/HTTP simples).
- Use gRPC como padrão de ouro em arquiteturas de microsserviços modernas em nuvem.`
  },

  // ==========================================
  // MODULE 5: DISCRETE MATH
  // ==========================================
  {
    id: 'CS-MATH-BOOL-006',
    relPath: 'decks/02-cs-fundamentals/discrete-math/boolean-logic/CS-MATH-BOOL-006.md',
    title: 'Intuição Fundamental da Lógica Booleana e Portas Lógicas: Os Interruptores de Luz em Série e Paralelo',
    tags: [
      'level::l2-fundamental',
      'topic::cs::discrete-math',
      'company::intel',
      'freq::high'
    ],
    question: 'Como operações lógicas simples (AND, OR, NOT, XOR) se transformam em circuitos físicos capazes de realizar todos os cálculos de um computador?',
    quickAnswer: `**Solução Direta**:
- Toda a computação digital é construída sobre transistores microscópicos que funcionam como interruptores de luz (ligado = \`1\`, desligado = \`0\`):
  - **Porta AND (E)**: Dois interruptores em **série** — a corrente só passa se o interruptor A **E** o interruptor B estiverem fechados.
  - **Porta OR (OU)**: Dois interruptores em **paralelo** — a corrente passa se o interruptor A **OU** o B estiver fechado.
  - **Porta NOT (NÃO)**: Um inversor que inverte o sinal (\`1\` vira \`0\`, \`0\` vira \`1\`).
  - **Porta XOR (OU Exclusivo)**: A corrente só passa se exatamente um dos interruptores estiver ligado, sendo a base para somar números binários.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Lógica Booleana: Dos Interruptores Físicos aos Circuitos de Cálculo</text>

  <!-- AND Gate -->
  <g transform="translate(30, 45)">
    <rect x="0" y="0" width="120" height="75" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="60" y="20" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Porta AND (E)</text>
    <text x="60" y="38" fill="#ffffff" font-size="9" text-anchor="middle">Interruptores em Série</text>
    <text x="60" y="55" fill="#60a5fa" font-size="9" font-family="monospace" text-anchor="middle">1 AND 1 = 1</text>
    <text x="60" y="68" fill="#64748b" font-size="8" text-anchor="middle">Ambos ligados</text>
  </g>

  <!-- OR Gate -->
  <g transform="translate(165, 45)">
    <rect x="0" y="0" width="125" height="75" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="62" y="20" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Porta OR (OU)</text>
    <text x="62" y="38" fill="#ffffff" font-size="9" text-anchor="middle">Em Paralelo</text>
    <text x="62" y="55" fill="#60a5fa" font-size="9" font-family="monospace" text-anchor="middle">1 OR 0 = 1</text>
    <text x="62" y="68" fill="#64748b" font-size="8" text-anchor="middle">Ao menos um ligado</text>
  </g>

  <!-- NOT Gate -->
  <g transform="translate(305, 45)">
    <rect x="0" y="0" width="125" height="75" fill="#1e293b" stroke="#818cf8" stroke-width="1.5" rx="6" />
    <text x="62" y="20" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">Porta NOT (NÃO)</text>
    <text x="62" y="38" fill="#ffffff" font-size="9" text-anchor="middle">Inversor de Sinal</text>
    <text x="62" y="55" fill="#a5b4fc" font-size="9" font-family="monospace" text-anchor="middle">NOT 1 = 0</text>
    <text x="62" y="68" fill="#64748b" font-size="8" text-anchor="middle">Inverte o bit</text>
  </g>

  <!-- XOR Gate -->
  <g transform="translate(445, 45)">
    <rect x="0" y="0" width="125" height="75" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="62" y="20" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Porta XOR (Exclusivo)</text>
    <text x="62" y="38" fill="#ffffff" font-size="9" text-anchor="middle">Soma Binária (Bit)</text>
    <text x="62" y="55" fill="#34d399" font-size="9" font-family="monospace" text-anchor="middle">1 XOR 1 = 0</text>
    <text x="62" y="68" fill="#a7f3d0" font-size="8" text-anchor="middle">Diferentes = 1</text>
  </g>

  <text x="300" y="160" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Leis de De Morgan: !(A &amp;&amp; B) é matematicamente idêntico a (!A || !B)!</text>
</svg>`,
    table: `| Porta Lógica | Condição de Saída Verdadeira (\`1\`) | Circuito Elétrico Equivalente |
|---|---|---|
| **AND** | Todas as entradas são verdadeiras (\`A = 1\` e \`B = 1\`) | Chaves colocadas uma atrás da outra em série |
| **OR** | Ao menos uma entrada é verdadeira | Chaves colocadas em caminhos paralelos separados |
| **XOR** | As entradas são diferentes entre si | Circuito de soma de 1 bit (sem o transporte/vai-um) |`,
    deepDive: `#### Como Portas Lógicas Somam Números?
Para somar dois bits $A$ e $B$:
- O bit da **soma** é exatamente a operação $A \\oplus B$ (XOR).
- O bit do **vai-um (carry)** é exatamente a operação $A \\land B$ (AND).
Combinando 1 porta XOR e 1 porta AND, você obtém um **Meio Somador (Half Adder)** de hardware. Ligando 64 desses em cadeia, você constrói a ALU de 64 bits do seu processador.

#### As Leis de De Morgan no Código
Muitos bugs de \`if\` acontecem por má interpretação da negação:
- Negar *"Precisa ser Maior de Idade E Ter Ingresso"* é igual a *"Ser Menor de Idade OU Não Ter Ingresso"*.
- \`!(A && B) == !A || !B\`
- \`!(A || B) == !A && !B\`

#### Key Takeaways
- Todas as operações complexas de software se reduzem a portas lógicas operadas por bilhões de transistores.`
  },

  // ------------------------------------------
  {
    id: 'CS-MATH-NUM-006',
    relPath: 'decks/02-cs-fundamentals/discrete-math/number-representation-ieee754/CS-MATH-NUM-006.md',
    title: 'Intuição Fundamental de Ponto Flutuante (IEEE 754): Por que no Computador 0.1 + 0.2 != 0.3',
    tags: [
      'level::l2-fundamental',
      'topic::cs::discrete-math',
      'company::google',
      'freq::high'
    ],
    question: 'Por que números decimais com vírgula (como 0.1) sofrem pequenos erros de precisão quando armazenados em ponto flutuante binário (IEEE 754)?',
    quickAnswer: `**Solução Direta**:
- Assim como a fração $1/3$ não pode ser escrita de forma exata com dígitos decimais finitos (vira a dízima periódica $0.3333...$), o número decimal $0.1 = 1/10$ se transforma em uma **dízima periódica infinita em base binária** ($0.0001100110011..._2$).
- Como o computador tem espaço limitado (32 ou 64 bits), ele é obrigado a cortar a dízima (*truncamento*). Quando você soma $0.1 + 0.2$, o resultado binário é $0.30000000000000004$, gerando um erro sutil, mas perigoso em cálculos financeiros.`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Estrutura IEEE 754 Double Precision (64 bits): Notação Científica Binária</text>

  <!-- Bits breakdown -->
  <g transform="translate(40, 50)">
    <!-- Sinal 1 bit -->
    <rect x="0" y="0" width="50" height="60" fill="#ef4444" rx="4" />
    <text x="25" y="24" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Sinal</text>
    <text x="25" y="44" fill="#fee2e2" font-size="9" text-anchor="middle">1 bit</text>

    <!-- Expoente 11 bits -->
    <rect x="60" y="0" width="140" height="60" fill="#3b82f6" rx="4" />
    <text x="130" y="24" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Expoente (E)</text>
    <text x="130" y="44" fill="#dbeafe" font-size="9" text-anchor="middle">11 bits (Ordem de grandeza)</text>

    <!-- Mantissa 52 bits -->
    <rect x="210" y="0" width="310" height="60" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="4" />
    <text x="365" y="24" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Mantissa / Fração (M)</text>
    <text x="365" y="44" fill="#ffffff" font-size="10" text-anchor="middle">52 bits (Dígitos significativos da precisão)</text>
  </g>

  <!-- Fórmula -->
  <text x="300" y="145" fill="#f8fafc" font-size="12" font-family="monospace" text-anchor="middle">Fórmula: (-1)^Sinal × 1.Mantissa × 2^(Expoente - 1023)</text>
  <text x="300" y="172" fill="#ef4444" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">Regra de Ouro: NUNCA use float/double para dinheiro! Use inteiros (centavos) ou BigDecimal.</text>
</svg>`,
    table: `| Tipo Numérico | Como Armazena | Melhor Caso de Uso |
|---|---|---|
| **Inteiro (Int64 / Two's Comp)** | Exato e perfeito em base 2 | Contadores, IDs, dinheiro em centavos |
| **Float / Double (IEEE 754)** | Notação científica aproximada | Gráficos 3D, física, jogos, machine learning |
| **Decimal / BigDecimal** | Dígitos decimais exatos em software | Sistemas bancários e faturamento fiscal |`,
    deepDive: `#### A Metáfora da Régua Decimal vs Binária
- Em base 10, podemos representar frações que dividem 10 perfeitamente (como $1/2 = 0.5$ e $1/5 = 0.2$).
- Em base 2, só podemos representar frações que dividem potências de 2 ($1/2 = 0.5$, $1/4 = 0.25$, $1/8 = 0.125$).
- Como $1/10$ não é uma potência de 2, ele vira uma dízima sem fim, da mesma forma que tentar escrever $1/3$ em uma calculadora de 8 dígitos gera $0.33333333$.

#### Key Takeaways
- Complemento de Dois (*Two's Complement*) é a forma padrão universal de representar inteiros negativos em hardware sem precisar de circuitos separados de subtração.
- Testar igualdade estrita de floats (\`if (val == 0.3)\`) é um antipadrão: sempre compare com uma margem de tolerância (\`if (abs(val - 0.3) < 1e-9)\`).`
  },

  // ------------------------------------------
  {
    id: 'CS-MATH-PROB-006',
    relPath: 'decks/02-cs-fundamentals/discrete-math/combinatorics-probability/CS-MATH-PROB-006.md',
    title: 'Intuição Fundamental de Combinatória e Probabilidade: A Explosão de Combinações e o Paradoxo do Aniversário',
    tags: [
      'level::l2-fundamental',
      'topic::cs::discrete-math',
      'company::amazon',
      'freq::high'
    ],
    question: 'Qual é a intuição por trás do Paradoxo do Aniversário e por que ele explica o risco de colisões em tabelas hash e funções criptográficas?',
    quickAnswer: `**Solução Direta**:
- Em uma sala com apenas **23 pessoas**, a probabilidade de duas fazerem aniversário no mesmo dia ultrapassa **50%**.
- A intuição nos engana porque pensamos apenas nas pessoas comparadas a nós mesmos (22 comparações). No entanto, a colisão ocorre entre **qualquer par possível de pessoas** no grupo: com 23 pessoas, existem **253 pares distintos** sendo comparados simultaneamente ($23 \\times 22 / 2$).
- Esse mesmo princípio explica por que **tabelas hash e geradores de IDs sofrem colisões muito antes** da sua capacidade máxima teórica (aproximadamente na marca da raiz quadrada $\\sqrt{N}$).`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Paradoxo do Aniversário: A Explosão Combinatória de Pares</text>

  <!-- Bloco Pessoas -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="150" height="75" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="75" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">23 Pessoas na Sala</text>
    <text x="75" y="42" fill="#ffffff" font-size="11" text-anchor="middle">Parece pouco?</text>
    <text x="75" y="60" fill="#64748b" font-size="9" text-anchor="middle">365 dias possíveis no ano</text>
  </g>

  <!-- Bloco Pares -->
  <g transform="translate(225, 45)">
    <rect x="0" y="0" width="150" height="75" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="75" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">253 Pares de Comparação</text>
    <text x="75" y="42" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">P(Colisão) &gt; 50%</text>
    <text x="75" y="60" fill="#34d399" font-size="9" text-anchor="middle">Fórmula: N × (N-1) / 2</text>
  </g>

  <!-- Bloco Hash Collisions -->
  <g transform="translate(410, 45)">
    <rect x="0" y="0" width="150" height="75" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="6" />
    <text x="75" y="22" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">Impacto em Hashes</text>
    <text x="75" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Colisões em ~√Espaço</text>
    <text x="75" y="60" fill="#818cf8" font-size="9" text-anchor="middle">UUID / Hash Tables / Git</text>
  </g>

  <text x="300" y="160" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Regra: Um hash de 32 bits (4 bilhões de valores) colide com 50% de chance com apenas 77.000 itens!</text>
</svg>`,
    table: `| Conceito Matemático | Efeito Computacional | Aplicação Prática no Backend |
|---|---|---|
| **Permutação ($N!$)** | A ordem importa (explosão fatorial rápida) | Caixeiro Viajante, ordenações |
| **Combinação ($C(N, k)$)** | A ordem não importa (grupos de subconjuntos) | Cálculo de pares de colisão |
| **Ataque de Aniversário** | Colisões em $\\approx \\sqrt{N}$ tentativas | Escolha do tamanho de chave criptográfica (SHA-256) |`,
    deepDive: `#### A Matemática dos Pares
Para 23 pessoas:
$$\\text{Total de Pares} = \\frac{23 \\times 22}{2} = 253 \\text{ pares}$$
A probabilidade de nenhum par fazer aniversário junto é:
$$P(\\text{sem colisão}) = \\frac{365}{365} \\times \\frac{364}{365} \\times \\dots \\times \\frac{343}{365} \\approx 0.4927$$
Logo, a probabilidade de haver ao menos uma colisão é $1 - 0.4927 = 50.73\\%$.

#### Por que UUIDv4 usa 122 bits de aleatoriedade?
Porque com 122 bits, a chance de colisão atinge 50% apenas após gerar $\\approx 2^{61} \\approx 2.3 \\times 10^{18}$ IDs (bilhões de bilhões), tornando seguro gerar IDs distribuídos sem coordenação central.

#### Key Takeaways
- Tabelas Hash precisam de fator de carga (*Load Factor* ~0.75) para redimensionar muito antes de encherem completamente.`
  },

  // ------------------------------------------
  {
    id: 'CS-MATH-GRAPH-006',
    relPath: 'decks/02-cs-fundamentals/discrete-math/graph-theory/CS-MATH-GRAPH-006.md',
    title: 'Intuição Fundamental da Teoria dos Grafos: A Malha de Cidades, Estradas e Redes Sociais',
    tags: [
      'level::l2-fundamental',
      'topic::cs::discrete-math',
      'company::meta',
      'freq::high'
    ],
    question: 'Qual é o modelo mental de um grafo e como ele modela qualquer problema de conexões e relacionamentos no mundo real?',
    quickAnswer: `**Solução Direta**:
- Um **Grafo** é a estrutura de dados mais genérica da computação, composta por dois elementos fundamentais:
  - **Vértices / Nós ($V$)**: Os pontos de interesse (pessoas, cidades, páginas web, servidores).
  - **Arestas ($E$)**: As conexões entre eles (amizades, rodovias, links de hipertexto, cabos de rede).
- Dependendo do problema, as conexões podem ter sentido único (**Grafos Direcionados**, como o Twitter/X onde você segue alguém sem ser seguido) ou custos associados (**Grafos Ponderados**, como a distância em km no GPS).`,
    svg: `<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Grafos no Mundo Real: Vértices (Entidades) + Arestas (Relações)</text>

  <!-- Grafo Visual -->
  <g transform="translate(60, 45)">
    <!-- Linhas / Arestas -->
    <line x1="40" y1="40" x2="140" y2="15" stroke="#3b82f6" stroke-width="2" />
    <line x1="40" y1="40" x2="140" y2="65" stroke="#3b82f6" stroke-width="2" />
    <line x1="140" y1="15" x2="240" y2="40" stroke="#3b82f6" stroke-width="2" />
    <line x1="140" y1="65" x2="240" y2="40" stroke="#3b82f6" stroke-width="2" />

    <!-- Nós -->
    <circle cx="40" cy="40" r="16" fill="#065f46" stroke="#10b981" stroke-width="2" />
    <text x="40" y="44" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">A</text>

    <circle cx="140" cy="15" r="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
    <text x="140" y="19" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">B</text>

    <circle cx="140" cy="65" r="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2" />
    <text x="140" y="69" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">C</text>

    <circle cx="240" cy="40" r="16" fill="#065f46" stroke="#10b981" stroke-width="2" />
    <text x="240" y="44" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">D</text>
  </g>

  <!-- Tipos Explicados -->
  <g transform="translate(340, 45)">
    <rect x="0" y="0" width="220" height="85" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="110" y="20" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Classificações Principais</text>
    <text x="110" y="38" fill="#ffffff" font-size="9" text-anchor="middle">• Não-Direcionado (Amizade mútua)</text>
    <text x="110" y="54" fill="#ffffff" font-size="9" text-anchor="middle">• Direcionado (Seguidor no Twitter / Link)</text>
    <text x="110" y="70" fill="#34d399" font-size="9" text-anchor="middle">• Ponderado (Distância / Custo no GPS)</text>
  </g>

  <text x="300" y="160" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Árvores são apenas grafos especiais: conexos e sem nenhum ciclo!</text>
</svg>`,
    table: `| Tipo de Grafo | Característica | Analogia do Cotidiano |
|---|---|---|
| **Não-Direcionado** | As conexões são vias de mão dupla | Amizade no Facebook / Conexão no LinkedIn |
| **Direcionado (DAG)** | Arestas têm seta indicando sentido único | Seguir alguém no Twitter / Dependências de compilação |
| **Ponderado** | Cada aresta tem um peso numérico associado | Mapa do Google Maps com tempo de viagem em minutos |`,
    deepDive: `#### Grafos estão em Toda Parte
- **Redes Sociais**: Pessoas são nós, amizades são arestas.
- **GPS e Rotas**: Cruzamentos são nós, ruas são arestas com pesos de trânsito (Dijkstra encontra o caminho mais rápido).
- **Web (Google PageRank)**: Páginas são nós, hyperlinks são arestas direcionadas.
- **Gerenciadores de Pacote (npm, apt)**: Pacotes são nós, dependências são arestas direcionadas sem ciclos (DAG - *Directed Acyclic Graph*).

#### Key Takeaways
- Representações em código: Matriz de Adjacência ($O(1)$ para verificar aresta, mas usa $O(V^2)$ de memória) vs Lista de Adjacência (econômica $O(V + E)$, padrão da indústria).
- Algoritmos clássicos: BFS para menor número de saltos, DFS para exploração profunda e detecção de ciclos.`
  }
];

function generateMarkdown(card) {
  return `---
id: ${card.id}
title: "${card.title}"
tags:
${card.tags.map(t => `  - ${t}`).join('\n')}
---

## Pergunta
${card.question}

## Resposta
### Quick Answer
${card.quickAnswer}

### Dual Coding Visual
${card.svg}

${card.table}

<details>
<summary>Deep Dive & Walkthrough</summary>

${card.deepDive}

</details>
`;
}

console.log(`Gerando ${csCards.length} cartões L2 para decks/02-cs-fundamentals/...`);

let createdCount = 0;
for (const card of csCards) {
  const fullPath = path.resolve(process.cwd(), card.relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const content = generateMarkdown(card);
  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`✓ Criado [${card.id}] em ${card.relPath}`);
  createdCount++;
}

console.log(`\n🎉 Concluído com sucesso! ${createdCount} cartões L2 gerados.`);
