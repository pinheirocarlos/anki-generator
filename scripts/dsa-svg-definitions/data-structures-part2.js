import { svgWrapper } from '../dsa-svg-base.js';

export const DATA_STRUCTURES_PART2_SVGS = {
  // === heaps-priority-queues ===
  'DSA-STRUCT-HEAP-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Representação de Heap Binário em Array Contíguo</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="70" height="40" fill="#047857" stroke="#10b981" rx="4"/><text x="35" y="25" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">100 [0]</text>
    <rect x="80" y="0" width="70" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="115" y="25" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">19 [1]</text>
    <rect x="160" y="0" width="70" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="195" y="25" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">36 [2]</text>
    <rect x="240" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="275" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">17 [3]</text>
    <rect x="320" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="355" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">3 [4]</text>
    <rect x="400" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="435" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">25 [5]</text>
    <rect x="480" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="515" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">1 [6]</text>
  </g>
  <rect x="100" y="115" width="480" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
  <text x="340" y="133" fill="#34d399" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle">Pai(i) = (i - 1) / 2  |  FilhoEsq(i) = 2i + 1  |  FilhoDir(i) = 2i + 2</text>
  <text x="340" y="148" fill="#94a3b8" font-size="10" text-anchor="middle">Acesso a parentes via aritmética de índices sem alocar ponteiros extras</text>
`),

  'DSA-STRUCT-HEAP-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Operações Heapify-Up (Push) e Heapify-Down (Pop) O(log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="230" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="115" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Heapify-Up (Push O(log N))</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">Insere elemento no final do array</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Flutua trocando com o pai se maior</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Heapify-Down (Pop O(log N))</text>
      <text x="15" y="42" fill="#f8fafc" font-size="10">Move último item para a raiz</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Afunda trocando com o maior filho</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">A altura do heap é estritamente log₂ N, limitando o número máximo de swaps</text>
`),

  'DSA-STRUCT-HEAP-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Construção Linear de Heap: Build-Heap em Tempo O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Bottom-Up Heapify a partir do último nó não-folha (N/2 - 1)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">A maioria dos nós reside nos níveis inferiores (folhas não precisam de heapify).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11" font-family="monospace">Somatório Σ (h / 2^h) converge para 2 → Custo Total Estrito = O(N)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Construir heap elemento a elemento custa O(N log N); Build-Heap reduz para O(N)</text>
`),

  'DSA-STRUCT-HEAP-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Top-K Elementos Usando Min-Heap de Tamanho Fixo K</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="180" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="90" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Stream de N Itens</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Itera sobre N elementos</text>
    <text x="15" y="60" fill="#94a3b8" font-size="10">Para cada item num...</text>

    <path d="M 195 37 L 245 37" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arrow)"/>

    <g transform="translate(250, 0)">
      <rect x="0" y="0" width="290" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="145" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Min-Heap (Capacidade K)</text>
      <text x="15" y="42" fill="#f8fafc" font-size="10">Se num &gt; heap.peek():</text>
      <text x="15" y="60" fill="#34d399" font-size="10">heap.pop(); heap.push(num) em O(log K)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Complexidade de Tempo: O(N log K) | Complexidade de Espaço: O(K)</text>
`),

  'DSA-STRUCT-HEAP-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Median Finder em Tempo Real com Dois Heaps (Max-Heap + Min-Heap)</text>
  <g transform="translate(80, 50)">
    <!-- Max-Heap Low -->
    <rect x="0" y="0" width="220" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="110" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Max-Heap (Metade Inferior)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="10">Guarda os 50% menores</text>
    <text x="20" y="60" fill="#93c5fd" font-size="10">Topo = Maior dos menores (L_max)</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Min-Heap (Metade Superior)</text>
      <text x="20" y="45" fill="#f8fafc" font-size="10">Guarda os 50% maiores</text>
      <text x="20" y="60" fill="#a7f3d0" font-size="10">Topo = Menor dos maiores (R_min)</text>
    </g>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Mediana: Se N ímpar = L_max | Se N par = (L_max + R_min) / 2.0 em O(1)</text>
`),

  'DSA-STRUCT-HEAP-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fibonacci Heap: Diminuição de Chave (Decrease-Key) em Tempo O(1)</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="560" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="280" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Floresta de Árvores com Corte em Cascata (Cascading Cut)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Inserções e decrease-key apenas adicionam árvores à lista de raízes em O(1) amortizado.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Consolidação adiada para a operação extract-min: O(log N) amortizado.</text>
  </g>
  <text x="340" y="165" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Otimiza o Algoritmo de Dijkstra para O(E + V log V), ideal para grafos densos</text>
`),

  // === trie-prefix-tree ===
  'DSA-STRUCT-TRIE-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estrutura do Nó de Trie: children[26] e flag isEndOfWord</text>
  <g transform="translate(140, 50)">
    <!-- Root -->
    <circle cx="100" cy="20" r="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="100" y="24" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Root</text>

    <!-- Branch 'c' -->
    <line x1="85" y1="30" x2="40" y2="65" stroke="#10b981" stroke-width="2"/>
    <text x="50" y="45" fill="#10b981" font-size="10" font-weight="bold">'c'</text>
    <circle cx="35" cy="75" r="14" fill="#1e293b" stroke="#10b981"/><text x="35" y="79" fill="#fff" font-size="10" text-anchor="middle">c</text>

    <!-- Branch 'a' -->
    <line x1="35" y1="90" x2="35" y2="120" stroke="#10b981" stroke-width="2"/>
    <text x="45" y="108" fill="#10b981" font-size="10" font-weight="bold">'a'</text>
    <circle cx="35" cy="130" r="14" fill="#1e293b" stroke="#10b981"/><text x="35" y="134" fill="#fff" font-size="10" text-anchor="middle">a</text>

    <!-- Branch 't' -->
    <line x1="35" y1="145" x2="35" y2="175" stroke="#10b981" stroke-width="2"/>
    <text x="45" y="163" fill="#10b981" font-size="10" font-weight="bold">'t'</text>
    <circle cx="35" cy="185" r="14" fill="#047857" stroke="#34d399" stroke-width="2"/>
    <text x="35" y="189" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">t*</text>
  </g>
  <g transform="translate(360, 60)">
    <rect x="0" y="0" width="240" height="70" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Nó Folha t*:</text>
    <text x="20" y="42" fill="#f8fafc" font-size="10">isEndOfWord = true</text>
    <text x="20" y="58" fill="#94a3b8" font-size="10">Palavra completa: "cat"</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" text-anchor="middle">Busca e inserção em O(L), onde L é o comprimento da palavra, independente de N</text>
`),

  'DSA-STRUCT-TRIE-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Busca de Prefixo (startsWith) vs Busca de Palavra Completa (search)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="230" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="115" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">startsWith("ca")</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Percorre 'c' → 'a'</text>
    <text x="15" y="60" fill="#34d399" font-size="10">Retorna true se o nó existe</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">search("ca")</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Percorre 'c' → 'a'</text>
      <text x="15" y="60" fill="#f87171" font-size="10">Retorna node.isEndOfWord (false se só "cat")</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Compartilhamento de prefixos reduz drasticamente a redundância na memória</text>
`),

  'DSA-STRUCT-TRIE-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Autocomplete e Sugestões com DFS na Subárvore de Prefixo</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Algoritmo de Sugestão de Busca:</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Navega até o nó do prefixo digitado (ex: "app") em O(L).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Executa DFS a partir deste nó para coletar todas as palavras filhas ("apple", "apply", "app").</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Base de motores typeahead de buscas e corretores ortográficos</text>
`),

  'DSA-STRUCT-TRIE-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compressed Trie (Radix Tree): Compactação de Arestas Unifilhas</text>
  <g transform="translate(80, 50)">
    <!-- Standard Trie -->
    <rect x="0" y="0" width="220" height="75" fill="#1e293b" stroke="#f43f5e" rx="6"/>
    <text x="110" y="20" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Standard Trie (Esparsa)</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">r → o → m → a → n</text>
    <text x="15" y="60" fill="#94a3b8" font-size="10">5 nós alocados na memória</text>

    <!-- Radix Tree -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Radix Tree (Compactada)</text>
      <text x="15" y="42" fill="#34d399" font-size="10">Aresta única: "roman"</text>
      <text x="15" y="60" fill="#f8fafc" font-size="10">1 único nó alocado (IP Routing)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz o consumo de memória em até 70% em tabelas de roteamento CIDR e Linux Kernel</text>
`),

  'DSA-STRUCT-TRIE-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bitwise Trie: Consulta de Maximum XOR de Pares em O(32)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Trie Binária (Filhos 0 e 1)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Para maximizar o XOR com o número X bit a bit (do bit 31 ao 0):</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Se o bit atual de X é 0, escolhe descer pelo ramo 1 (e vice-versa). Custo = O(32 × N) = O(N).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Transforma busca por força bruta O(N²) de XOR em tempo linear O(N)</text>
`),

  'DSA-STRUCT-TRIE-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Aho-Corasick Automaton: Busca de Múltiplos Padrões em O(N + M)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Trie + Failure Links (Suffix Automaton)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao falhar o casamento de caractere, o autômato salta pelo link de falha (maior sufixo que é prefixo).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Localiza simultaneamente K palavras-chave em um texto em uma única passada O(N).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Utilizado em filtros de spam, antivírus (ClamAV) e bioinformática (DNA search)</text>
`),

  // === disjoint-set-union ===
  'DSA-STRUCT-DSU-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Disjoint Set Union (DSU): Floresta de Árvores com Vetor parent[i]</text>
  <g transform="translate(100, 50)">
    <circle cx="80" cy="20" r="16" fill="#047857" stroke="#10b981"/><text x="80" y="24" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">Root 1</text>
    <line x1="70" y1="35" x2="40" y2="60" stroke="#64748b"/>
    <circle cx="35" cy="70" r="12" fill="#1e293b" stroke="#3b82f6"/><text x="35" y="74" fill="#fff" font-size="9" text-anchor="middle">2</text>
    <line x1="90" y1="35" x2="120" y2="60" stroke="#64748b"/>
    <circle cx="125" cy="70" r="12" fill="#1e293b" stroke="#3b82f6"/><text x="125" y="74" fill="#fff" font-size="9" text-anchor="middle">3</text>

    <!-- Component 2 -->
    <circle cx="360" cy="20" r="16" fill="#b45309" stroke="#f59e0b"/><text x="360" y="24" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">Root 4</text>
    <line x1="360" y1="35" x2="360" y2="60" stroke="#64748b"/>
    <circle cx="360" cy="70" r="12" fill="#1e293b" stroke="#f59e0b"/><text x="360" y="74" fill="#fff" font-size="9" text-anchor="middle">5</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Dois elementos estão no mesmo conjunto se e somente se find(x) == find(y)</text>
`),

  'DSA-STRUCT-DSU-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Otimização de Path Compression (Compressão de Caminhos)</text>
  <g transform="translate(80, 50)">
    <!-- Deep Chain -->
    <text x="80" y="10" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Antes de find(4)</text>
    <circle cx="80" cy="30" r="12" fill="#047857"/><text x="80" y="34" fill="#fff" font-size="9" text-anchor="middle">R</text>
    <line x1="80" y1="42" x2="80" y2="58" stroke="#64748b"/>
    <circle cx="80" cy="70" r="10" fill="#1e293b" stroke="#475569"/><text x="80" y="73" fill="#fff" font-size="8" text-anchor="middle">2</text>
    <line x1="80" y1="80" x2="80" y2="95" stroke="#64748b"/>
    <circle cx="80" cy="105" r="10" fill="#1e293b" stroke="#3b82f6"/><text x="80" y="108" fill="#fff" font-size="8" text-anchor="middle">4</text>

    <!-- Arrow -->
    <path d="M 170 65 L 230 65" stroke="#3b82f6" stroke-width="3" marker-end="url(#arrow)"/>

    <!-- Flat -->
    <g transform="translate(300, 0)">
      <text x="80" y="10" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Após Compressão: parent[x] = find(parent[x])</text>
      <circle cx="80" cy="30" r="14" fill="#047857" stroke="#10b981"/><text x="80" y="34" fill="#fff" font-size="10" text-anchor="middle">R</text>
      <line x1="68" y1="40" x2="40" y2="70" stroke="#10b981"/>
      <circle cx="35" cy="80" r="10" fill="#1e293b" stroke="#10b981"/><text x="35" y="83" fill="#fff" font-size="8" text-anchor="middle">2</text>
      <line x1="92" y1="40" x2="120" y2="70" stroke="#10b981"/>
      <circle cx="125" cy="80" r="10" fill="#1e293b" stroke="#10b981"/><text x="125" y="83" fill="#fff" font-size="8" text-anchor="middle">4</text>
    </g>
  </g>
  <text x="340" y="175" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Conecta todos os nós visitados diretamente à raiz, achatando a árvore para altura 1</text>
`),

  'DSA-STRUCT-DSU-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">União por Rank ou Tamanho (Union by Rank)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Regra: Conecta a raiz da árvore mais rasa sob a raiz da mais profunda</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se rank(rootA) &lt; rank(rootB) → parent[rootA] = rootB (altura total não cresce).</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Se rank(rootA) == rank(rootB) → parent[rootB] = rootA; rank(rootA)++.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Garante altura máxima de O(log N) mesmo sem compressão de caminhos</text>
`),

  'DSA-STRUCT-DSU-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Complexidade Quase-Linear com Função Inversa de Ackermann α(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Combinação: Path Compression + Union by Rank</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Complexidade amortizada de M operações sobre N elementos: O(M · α(N)).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Como α(N) &lt; 5 para qualquer N até o número de átomos no universo observável (10⁸⁰) → O(1) na prática.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Operações Find e Union são indistinguíveis de tempo constante no mundo real</text>
`),

  'DSA-STRUCT-DSU-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Detecção de Ciclos em Grafos Não-Direcionados com DSU</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#ef4444" rx="6"/>
    <text x="260" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Para cada aresta (u, v) do grafo:</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. rootU = find(u), rootV = find(v).</text>
    <text x="20" y="62" fill="#f87171" font-size="11">2. Se rootU == rootV → CICLO DETECTADO! (u e v já pertenciam ao mesmo componente).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Utilizado no Algoritmo de Kruskal para construir Árvores Geradoras Mínimas (MST) sem ciclos</text>
`),

  'DSA-STRUCT-DSU-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">DSU com Rollback (Pilha de Histórico de Modificações)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Desfazendo Uniões em O(1) de Tempo</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Utiliza Union by Rank sem Path Compression (para preservar histórico de ponteiros).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Empilha [rootA, rootB, rankChanged] e desfaz com rollback() em divisão e conquista offline.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Permite resolver problemas de conectividade dinâmica com deleções de arestas</text>
`),

  // === advanced-trees ===
  'DSA-STRUCT-ADVTREE-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Segment Tree: Consultas de Intervalo e Atualizações O(log N)</text>
  <g transform="translate(140, 45)">
    <!-- Root [0-3] -->
    <circle cx="200" cy="20" r="16" fill="#047857" stroke="#10b981"/><text x="200" y="24" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">Sum[0-3]</text>
    <line x1="185" y1="32" x2="115" y2="60" stroke="#64748b"/>
    <circle cx="100" cy="70" r="14" fill="#1e293b" stroke="#3b82f6"/><text x="100" y="74" fill="#fff" font-size="9" text-anchor="middle">[0-1]</text>
    <line x1="215" y1="32" x2="285" y2="60" stroke="#64748b"/>
    <circle cx="300" cy="70" r="14" fill="#1e293b" stroke="#3b82f6"/><text x="300" y="74" fill="#fff" font-size="9" text-anchor="middle">[2-3]</text>

    <!-- Leaves -->
    <line x1="90" y1="82" x2="60" y2="105" stroke="#475569"/>
    <circle cx="50" cy="115" r="12" fill="#1e293b" stroke="#475569"/><text x="50" y="118" fill="#94a3b8" font-size="8" text-anchor="middle">A[0]</text>
    <line x1="110" y1="82" x2="140" y2="105" stroke="#475569"/>
    <circle cx="150" cy="115" r="12" fill="#1e293b" stroke="#475569"/><text x="150" y="118" fill="#94a3b8" font-size="8" text-anchor="middle">A[1]</text>
  </g>
  <text x="340" y="170" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Query(L, R): O(log N) combinando subárvores canônicas disjuntas</text>
`),

  'DSA-STRUCT-ADVTREE-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Lazy Propagation em Segment Tree: Atualizações de Intervalo O(log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Atualização Preguiçosa com Array lazy[node]</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao invés de descer até todas as folhas, armazena a alteração pendente no nó ancestral.</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Propaga o valor aos filhos estritamente quando eles forem visitados por consultas futuras.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Reduz o custo de Range Update de O(N) para O(log N)</text>
`),

  'DSA-STRUCT-ADVTREE-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fenwick Tree (Binary Indexed Tree / BIT): Operações com i &amp; (-i)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Navegação Bitwise pelo LSB (Least Significant Bit)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Soma de prefixo: idx -= (idx &amp; -idx) descendo para a esquerda em O(log N).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Atualização pontual: idx += (idx &amp; -idx) subindo e atualizando os responsáveis em O(log N).</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Requer apenas 1 array de tamanho N (metade da memória da Segment Tree de 4N)</text>
`),

  'DSA-STRUCT-ADVTREE-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Treap (Tree + Heap): Balanceamento Probabilístico com Prioridades Aleatórias</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Invariante Dupla: BST na Chave + Max-Heap na Prioridade</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Cada nó gera uma prioridade aleatória rand(). Insere como BST e restaura Heap com rotações.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Garante altura esperada de O(log N) sem algoritmos complexos de rebalanceamento.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Facilita operações poderosas de Split(k) e Merge(T1, T2) em tempo O(log N)</text>
`),

  'DSA-STRUCT-ADVTREE-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Splay Tree: Auto-Ajuste com Operação Splay Trazendo Nós à Raiz</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Princípio de Localidade Temporal (Zig-Zig &amp; Zig-Zag)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Todo nó acessado é promovido à raiz através de uma sequência de rotações duplas.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Custo amortizado de busca, inserção e deleção: O(log N).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Ideal para caches de memória e alocadores onde certos nós são acessados frequentemente</text>
`),

  'DSA-STRUCT-ADVTREE-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Suffix Tree &amp; Suffix Automaton: Indexação de Substrings em Tempo Linear</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Construção com Algoritmo de Ukkonen em Tempo O(N)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Armazena todos os sufixos de uma string compactados em uma árvore.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Responde se qualquer padrão de tamanho M existe no texto em tempo O(M).</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Resolve Maior Substring Comum e Substring Palindrômica Mais Longa em tempo ótimo</text>
`),

  // === graphs-representations ===
  'DSA-STRUCT-GRAPH-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Matriz de Adjacência (Espaço O(V²), Consulta de Aresta O(1))</text>
  <g transform="translate(100, 50)">
    <!-- Small graph -->
    <circle cx="40" cy="20" r="14" fill="#1e293b" stroke="#3b82f6"/><text x="40" y="24" fill="#fff" font-size="10" text-anchor="middle">0</text>
    <line x1="55" y1="20" x2="105" y2="20" stroke="#3b82f6" stroke-width="2"/>
    <circle cx="120" cy="20" r="14" fill="#1e293b" stroke="#10b981"/><text x="120" y="24" fill="#fff" font-size="10" text-anchor="middle">1</text>
    <line x1="40" y1="35" x2="40" y2="65" stroke="#3b82f6" stroke-width="2"/>
    <circle cx="40" cy="80" r="14" fill="#1e293b" stroke="#f59e0b"/><text x="40" y="84" fill="#fff" font-size="10" text-anchor="middle">2</text>

    <!-- Matrix -->
    <g transform="translate(240, 0)">
      <rect x="0" y="0" width="180" height="90" fill="#1e293b" stroke="#3b82f6" rx="4"/>
      <text x="90" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Matriz adj[3][3]</text>
      <text x="40" y="42" fill="#94a3b8" font-size="11" font-family="monospace">[ 0, 1, 1 ]</text>
      <text x="40" y="60" fill="#94a3b8" font-size="11" font-family="monospace">[ 1, 0, 0 ]</text>
      <text x="40" y="78" fill="#94a3b8" font-size="11" font-family="monospace">[ 1, 0, 0 ]</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">hasEdge(u, v) é O(1) instantâneo; inadequada para grafos esparsos devido a O(V²) de memória</text>
`),

  'DSA-STRUCT-GRAPH-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Lista de Adjacência: Eficiência de Memória O(V + E) para Grafos Esparsos</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="0" width="480" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="20" y="25" fill="#34d399" font-size="11" font-family="monospace">adj[0] → [ 1, 2 ]</text>
    <text x="20" y="45" fill="#38bdf8" font-size="11" font-family="monospace">adj[1] → [ 0 ]</text>
    <text x="20" y="65" fill="#f59e0b" font-size="11" font-family="monospace">adj[2] → [ 0 ]</text>
    <text x="250" y="45" fill="#f8fafc" font-size="11">Iteração sobre vizinhos em O(grau(u))</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Padrão da indústria para algoritmos BFS, DFS, Dijkstra e Tarjan</text>
`),

  'DSA-STRUCT-GRAPH-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Grafos Direcionados vs Não-Direcionados (In-Degree &amp; Out-Degree)</text>
  <g transform="translate(80, 50)">
    <!-- Directed -->
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Direcionado (Arestas com Seta)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">In-Degree: arestas que chegam ao nó</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Out-Degree: arestas que saem do nó</text>

    <!-- Undirected -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Não-Direcionado (Simétrico)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Aresta (u, v) implica (v, u)</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Grau total = Σ vizinhos conectados</text>
    </g>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">In-Degree == 0 é a condição inicial de Kahn para Ordenação Topológica</text>
`),

  'DSA-STRUCT-GRAPH-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Grafos Ponderados: Representação de Custos e Pesos em Arestas</text>
  <g transform="translate(140, 50)">
    <circle cx="50" cy="40" r="16" fill="#1e293b" stroke="#3b82f6"/><text x="50" y="44" fill="#fff" font-size="11" text-anchor="middle">U</text>
    
    <line x1="68" y1="40" x2="232" y2="40" stroke="#f59e0b" stroke-width="2.5"/>
    <rect x="130" y="28" width="40" height="24" fill="#1e293b" stroke="#f59e0b" rx="4"/>
    <text x="150" y="44" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">w=7</text>

    <circle cx="250" cy="40" r="16" fill="#1e293b" stroke="#10b981"/><text x="250" y="44" fill="#fff" font-size="11" text-anchor="middle">V</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="11" font-family="monospace" text-anchor="middle">Lista de adjacência: adj[u].push_back({ v, weight = 7 })</text>
  <text x="340" y="170" fill="#94a3b8" font-size="11" text-anchor="middle">Modelagem de redes de computadores (latência), mapas de trânsito e fluxo de capacidade</text>
`),

  'DSA-STRUCT-GRAPH-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Matriz Laplaciana de Grafo: L = D - A</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">D (Matriz de Graus) - A (Matriz de Adjacência)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Diagonal = grau do vértice | Fora da diagonal = -1 se existe aresta, 0 caso contrário.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">O número de autovalores zero corresponde exatamente ao número de componentes conexos.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Base da Teoria Espectral de Grafos, particionamento de redes e clustering</text>
`),

  'DSA-STRUCT-GRAPH-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compressed Sparse Row (CSR): Grafos Estáticos de Alta Performance</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Armazenamento em 2 Arrays Contíguos (Zero Ponteiros na Heap)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">values/edges[]: lista sequencial de todos os destinos de arestas na memória contígua.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">row_ptr[v]: offset de início dos vizinhos do nó v no array de arestas.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Maximiza vetorização SIMD e elimina 100% dos overheads de ponteiros em Big Graph Analytics</text>
`)
};
