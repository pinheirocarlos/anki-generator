import { svgWrapper } from '../dsa-svg-base.js';

export const PATTERNS_PART1_SVGS = {
  // === two-pointers ===
  'DSA-PATT-2POINT-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Dois Ponteiros Convergentes para Soma-Alvo (Two Sum Ordenado)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="20" width="60" height="40" fill="#047857" stroke="#10b981" stroke-width="2" rx="4"/><text x="30" y="45" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">2</text><text x="30" y="10" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">L →</text>
    <rect x="80" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="110" y="45" fill="#94a3b8" font-size="13" text-anchor="middle">7</text>
    <rect x="160" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="190" y="45" fill="#94a3b8" font-size="13" text-anchor="middle">11</text>
    <rect x="240" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="270" y="45" fill="#94a3b8" font-size="13" text-anchor="middle">15</text>
    <rect x="320" y="20" width="60" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="350" y="45" fill="#94a3b8" font-size="13" text-anchor="middle">19</text>
    <rect x="400" y="20" width="60" height="40" fill="#b45309" stroke="#f59e0b" stroke-width="2" rx="4"/><text x="430" y="45" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">23</text><text x="430" y="10" fill="#f59e0b" font-size="10" font-weight="bold" text-anchor="middle">← R</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="11" text-anchor="middle">Soma = 2 + 23 = 25. Se Target = 26 (Soma &lt; Target) → Incrementa L (L++)</text>
  <text x="340" y="170" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Varredura completa em O(N) de tempo e O(1) de memória</text>
`),

  'DSA-PATT-2POINT-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Ponteiros Rápido e Lento (Fast &amp; Slow / Floyd's Cycle Detection)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="20" width="80" height="35" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="40" y="42" fill="#fff" font-size="11" text-anchor="middle">Node 1</text>
    <line x1="80" y1="37" x2="130" y2="37" stroke="#3b82f6" stroke-width="2"/>
    <rect x="130" y="20" width="80" height="35" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="170" y="42" fill="#fff" font-size="11" text-anchor="middle">Node 2</text>
    
    <circle cx="320" cy="37" r="35" fill="none" stroke="#10b981" stroke-width="3"/>
    <circle cx="320" cy="2" r="6" fill="#f43f5e"/><text x="320" y="-8" fill="#f43f5e" font-size="9" text-anchor="middle">Fast (2 passos)</text>
    <circle cx="320" cy="72" r="6" fill="#38bdf8"/><text x="320" y="90" fill="#38bdf8" font-size="9" text-anchor="middle">Slow (1 passo)</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Garante colisão dentro do ciclo em O(N) sem usar Hash Set (Espaço O(1))</text>
`),

  'DSA-PATT-2POINT-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">3Sum O(N²) com Two Pointers após Ordenação</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Fixa nums[i] e resolve 2Sum no restante [i+1, N-1]</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Ordena o array em O(N log N). Ignora elementos duplicados adjacentes.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">2. Two Pointers para nums[L] + nums[R] == -nums[i]. Custo total: N × O(N) = O(N²).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz a busca por força bruta cúbica O(N³) para quadrática O(N²)</text>
`),

  'DSA-PATT-2POINT-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Container With Most Water: Escolha Gulosa com Two Pointers</text>
  <g transform="translate(140, 50)">
    <rect x="0" y="20" width="20" height="70" fill="#3b82f6" rx="2"/>
    <text x="10" y="12" fill="#38bdf8" font-size="10" text-anchor="middle">h[L]=8</text>

    <rect x="20" y="45" width="240" height="45" fill="#0284c7" opacity="0.4"/>
    <text x="140" y="70" fill="#e0f2fe" font-size="11" font-weight="bold" text-anchor="middle">Área = min(h[L], h[R]) × (R - L)</text>

    <rect x="260" y="45" width="20" height="45" fill="#f59e0b" rx="2"/>
    <text x="270" y="37" fill="#fcd34d" font-size="10" text-anchor="middle">h[R]=5 (Menor)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Mover a barra mais alta nunca aumentará a área; logo, move-se sempre o ponteiro menor (R--)</text>
`),

  'DSA-PATT-2POINT-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Trapping Rain Water com Two Pointers em Tempo O(N) e Espaço O(1)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Rastreamento de left_max e right_max</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se left_max &lt; right_max: água retida é left_max - height[L]; avança L++.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Caso contrário: água retida é right_max - height[R]; retrocede R--.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Elimina os arrays auxiliares prefix/suffix: Tempo O(N), Espaço Auxiliar O(1) estrito</text>
`),

  'DSA-PATT-2POINT-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Partição de Hoare no QuickSort com Dois Ponteiros Convergentes</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Dois Ponteiros em Direções Opostas Encontrando Inversões</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ponteiro L avança enquanto arr[L] &lt; pivot; Ponteiro R recua enquanto arr[R] &gt; pivot.</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Quando ambos param, troca swap(arr[L], arr[R]) em O(1).</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Executa 3x menos trocas que o esquema de partição de Lomuto</text>
`),

  // === sliding-window ===
  'DSA-PATT-SLIDE-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Janela Deslizante de Tamanho Fixo K em O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="10" width="50" height="35" fill="#1e293b" stroke="#64748b" rx="3"/><text x="25" y="32" fill="#94a3b8" font-size="11" text-anchor="middle">1</text>
    
    <g transform="translate(60, 0)">
      <rect x="0" y="0" width="180" height="55" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6"/>
      <text x="90" y="20" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Janela Ativa (K = 3)</text>
      <text x="30" y="42" fill="#fff" font-size="12" text-anchor="middle">2</text>
      <text x="90" y="42" fill="#fff" font-size="12" text-anchor="middle">3</text>
      <text x="150" y="42" fill="#fff" font-size="12" text-anchor="middle">4</text>
    </g>

    <rect x="250" y="10" width="50" height="35" fill="#1e293b" stroke="#64748b" rx="3"/><text x="275" y="32" fill="#94a3b8" font-size="11" text-anchor="middle">5</text>
    <rect x="310" y="10" width="50" height="35" fill="#1e293b" stroke="#64748b" rx="3"/><text x="335" y="32" fill="#94a3b8" font-size="11" text-anchor="middle">6</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="11" font-family="monospace" text-anchor="middle">Nova Soma = Soma_Anterior - arr[i - K] + arr[i]</text>
  <text x="340" y="170" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Atualização em tempo O(1) por passo → Complexidade total O(N)</text>
`),

  'DSA-PATT-SLIDE-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Janela Deslizante Dinâmica (Expansão de Right &amp; Contração de Left)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Padrão Geral para Subarrays Contíguos Ótimos</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Expande a janela com right++ incluindo novos elementos.</text>
    <text x="20" y="62" fill="#f87171" font-size="11">2. Enquanto a condição for violada, contrai com left++ e remove do estado da janela.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Cada índice é adicionado e removido no máximo 1 vez: Tempo amortizado O(2N) = O(N)</text>
`),

  'DSA-PATT-SLIDE-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Longest Substring Without Repeating Characters (Set / Map na Janela)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Rastreamento da Última Posição Vista last_idx[char]</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao encontrar caractere repetido c: left = max(left, last_idx[c] + 1).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Comprimento da maior substring: max_len = max(max_len, right - left + 1).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Tempo: O(N) em uma única passada | Espaço: O(min(N, Σ)) onde Σ é o alfabeto</text>
`),

  'DSA-PATT-SLIDE-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Minimum Window Substring: Contador de Caracteres Válidos</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Variável 'matched' rastreando caracteres atendidos</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Quando matched == target.unique_chars: tenta encolher left para achar janela mínima.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Atualiza min_start e min_len apenas quando a janela completa é válida.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Algoritmo clássico de hard interview resolvido em tempo estritamente O(N + M)</text>
`),

  'DSA-PATT-SLIDE-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sliding Window Maximum com Monotonic Deque em Tempo O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Deque Monotônico Decrescente de Índices</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Remove índices expirados da frente: if deque.front() &lt;= i - K → pop_front().</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Remove itens menores do fim antes de inserir: deque.peek() é sempre o máximo da janela.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Reduz o custo de O(N · K) ou O(N log K) com Heap para O(N) com Deque</text>
`),

  'DSA-PATT-SLIDE-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Subarray Product Less Than K: Contagem Cumulativa right - left + 1</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Contagem de Novos Subarrays Terminando em 'right'</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se o produto [left...right] &lt; K, todos os subarrays terminando em right são válidos.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11" font-family="monospace">count += (right - left + 1)</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Evita enumeração combinatória quadrática: Tempo O(N), Espaço O(1)</text>
`),

  // === binary-search ===
  'DSA-PATT-BSEARCH-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Busca Binária: Eliminação de Metade do Espaço de Busca O(log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="15" width="60" height="35" fill="#1e293b" stroke="#64748b" rx="3"/><text x="30" y="37" fill="#94a3b8" text-anchor="middle">1</text>
    <rect x="65" y="15" width="60" height="35" fill="#1e293b" stroke="#64748b" rx="3"/><text x="95" y="37" fill="#94a3b8" text-anchor="middle">3</text>
    
    <rect x="130" y="15" width="60" height="35" fill="#047857" stroke="#10b981" stroke-width="2" rx="3"/><text x="160" y="37" fill="#fff" font-weight="bold" text-anchor="middle">7 (Mid)</text>
    
    <rect x="195" y="15" width="60" height="35" fill="#7f1d1d" stroke="#ef4444" rx="3" opacity="0.4"/><text x="225" y="37" fill="#fecaca" text-anchor="middle">11</text>
    <rect x="260" y="15" width="60" height="35" fill="#7f1d1d" stroke="#ef4444" rx="3" opacity="0.4"/><text x="290" y="37" fill="#fecaca" text-anchor="middle">15</text>
    <rect x="325" y="15" width="60" height="35" fill="#7f1d1d" stroke="#ef4444" rx="3" opacity="0.4"/><text x="355" y="37" fill="#fecaca" text-anchor="middle">19</text>
  </g>
  <text x="340" y="145" fill="#f87171" font-size="11" text-anchor="middle">Se Target = 3 (&lt; Mid 7) → Descarta toda a metade direita [mid, right] em O(1)</text>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">1 milhão de elementos são pesquisados em no máximo 20 comparações (log₂ 10⁶ ≈ 20)</text>
`),

  'DSA-PATT-BSEARCH-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Cálculo Seguro do Ponto Médio sem Overflow de Inteiros</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#7f1d1d" stroke="#ef4444" rx="6"/>
    <text x="120" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Incorreto (Bug Clássico do Java):</text>
    <text x="20" y="45" fill="#fecaca" font-size="10" font-family="monospace">mid = (low + high) / 2</text>
    <text x="20" y="62" fill="#fca5a5" font-size="9">Causa integer overflow para &gt; 2³¹ - 1</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#065f46" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Seguro em Produção:</text>
      <text x="20" y="45" fill="#ffffff" font-size="10" font-family="monospace">mid = low + (high - low) / 2</text>
      <text x="20" y="62" fill="#a7f3d0" font-size="9">Ou bitwise: mid = (low + high) &gt;&gt;&gt; 1</text>
    </g>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" text-anchor="middle">Regra fundamental para código robusto em C++, Java, Go e Rust</text>
`),

  'DSA-PATT-BSEARCH-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Invariantes de Busca Binária: lower_bound vs upper_bound</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">lower_bound(target)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Primeiro elemento onde arr[i] &gt;= target</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Início do intervalo de duplicatas</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">upper_bound(target)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Primeiro elemento onde arr[i] &gt; target</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Fim do intervalo de duplicatas</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Contagem de ocorrências de X em array ordenado: count = upper_bound(X) - lower_bound(X)</text>
`),

  'DSA-PATT-BSEARCH-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Busca Binária em Array Rotacionado: Metade Monotônica</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Pelo menos uma das metades [low..mid] ou [mid..high] está perfeitamente ordenada</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se nums[low] &lt;= nums[mid]: a metade esquerda é contínua e ordenada.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Verifica se target reside dentro de [nums[low], nums[mid]] para descartar a outra metade.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Complexidade mantida em O(log N) mesmo com rotação circular</text>
`),

  'DSA-PATT-BSEARCH-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Binary Search on Answer (Busca Binária na Resposta Monotônica)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Predicado Monotônico: F, F, F, ..., V, V, V</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Quando a função de viabilidade isPossible(X) é monotônica (se X funciona, X+1 também funciona).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Aplica busca binária no espaço de possíveis respostas [min_ans, max_ans] em O(log(Range) · f(N)).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Resolve problemas clássicos de alocação de capacidade (ex: Koko Eating Bananas, Capacity to Ship)</text>
`),

  'DSA-PATT-BSEARCH-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Busca Ternária para Extremos de Funções Unimodais em O(log₃ N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Dois Pontos Médios: m1 = L + (R-L)/3  |  m2 = R - (R-L)/3</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se f(m1) &lt; f(m2) (buscando máximo) → descarta o terço esquerdo [L, m1].</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Reduz o espaço de busca por um fator de 2/3 a cada iteração.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Ideal para otimização contínua e geometria computacional sem cálculo de derivadas</text>
`),

  // === bfs-dfs-traversals ===
  'DSA-PATT-TRAVERSAL-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">BFS (Breadth-First Search): Menor Caminho Nível por Nível com Fila FIFO</text>
  <g transform="translate(140, 45)">
    <circle cx="200" cy="20" r="14" fill="#047857" stroke="#10b981"/><text x="200" y="24" fill="#fff" font-size="10" text-anchor="middle">Nível 0</text>
    <line x1="185" y1="30" x2="115" y2="55" stroke="#64748b"/>
    <circle cx="100" cy="65" r="14" fill="#1e3a8a" stroke="#3b82f6"/><text x="100" y="69" fill="#fff" font-size="10" text-anchor="middle">N1</text>
    <line x1="215" y1="30" x2="285" y2="55" stroke="#64748b"/>
    <circle cx="300" cy="65" r="14" fill="#1e3a8a" stroke="#3b82f6"/><text x="300" y="69" fill="#fff" font-size="10" text-anchor="middle">N1</text>

    <line x1="90" y1="75" x2="55" y2="105" stroke="#475569"/>
    <circle cx="45" cy="115" r="12" fill="#1e293b" stroke="#f59e0b"/><text x="45" y="118" fill="#fff" font-size="9" text-anchor="middle">N2</text>
  </g>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Garante menor distância em grafos não-ponderados: Tempo O(V + E), Espaço O(V)</text>
`),

  'DSA-PATT-TRAVERSAL-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">DFS (Depth-First Search): Exploração em Profundidade com Pilha/Recursão</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Mergulho até as Folhas com Backtracking</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Visita um ramo completo até o final antes de retroceder e explorar irmãos.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Espaço de memória proporcional à profundidade máxima: O(h), ideal para grafos profundos.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Base para detecção de ciclos, ordenação topológica e caminhos Eulerianos</text>
`),

  'DSA-PATT-TRAVERSAL-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">BFS Multi-Fonte (Multi-Source BFS): Propagação Simultânea</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Inicialização da Fila com Múltiplos Pontos de Partida</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Enfileira todas as fontes iniciais (ex: laranjas podres, focos de incêndio) com dist = 0.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">A propagação em ondas concêntricas calcula a menor distância de qualquer fonte em O(R × C).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Equivalente a criar um nó fantasma conectado a todas as fontes com peso 0</text>
`),

  'DSA-PATT-TRAVERSAL-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Componentes Conexos (Flood Fill / Number of Islands)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Varredura de Matriz 2D com Marcação de Visitados</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Para cada célula '1' (terra): incrementa contador de ilhas e dispara DFS/BFS.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Substitui '1' por '0' in-place para eliminar necessidade de matriz 'visited' separada.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Tempo total: O(M × N) — Cada célula é processada no máximo 4 vezes (4 direções)</text>
`),

  'DSA-PATT-TRAVERSAL-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bidirectional BFS: Redução do Fator de Ramificação O(b^d) → O(b^(d/2))</text>
  <g transform="translate(100, 50)">
    <circle cx="80" cy="40" r="35" fill="none" stroke="#3b82f6" stroke-width="2"/>
    <circle cx="80" cy="40" r="8" fill="#3b82f6"/><text x="80" y="25" fill="#38bdf8" font-size="9" text-anchor="middle">Origem</text>

    <line x1="115" y1="40" x2="245" y2="40" stroke="#f59e0b" stroke-dasharray="4"/>
    <circle cx="180" cy="40" r="10" fill="#f59e0b"/><text x="180" y="60" fill="#fcd34d" font-size="9" text-anchor="middle">Interseção</text>

    <circle cx="280" cy="40" r="35" fill="none" stroke="#10b981" stroke-width="2"/>
    <circle cx="280" cy="40" r="8" fill="#10b981"/><text x="280" y="25" fill="#34d399" font-size="9" text-anchor="middle">Destino</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz nós explorados de 10⁶ para 2 × 10³ em problemas como Word Ladder</text>
`),

  'DSA-PATT-TRAVERSAL-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Iterative Deepening DFS (IDDFS): Espaço O(d) com Completude de BFS</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">DFS com Limite de Profundidade Iterativo: depth = 1, 2, 3, ... d</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Combina o baixo consumo de memória de DFS (O(d)) com a garantia de menor caminho de BFS.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">O reprocessamento de níveis superiores custa apenas um fator constante adicional insignificante.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Padrão em motores de IA para xadrez e resolução de quebra-cabeças 15-Puzzle</text>
`),

  // === backtracking ===
  'DSA-PATT-BACKTRACK-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Backtracking: Escolher → Explorar → Desfazer Escolha (Reversão de Estado)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="0" width="130" height="60" fill="#1e293b" stroke="#3b82f6" rx="4"/>
    <text x="65" y="25" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1. Escolha</text>
    <text x="65" y="45" fill="#f8fafc" font-size="10" font-family="monospace">state.add(c)</text>

    <path d="M 135 30 L 175 30" stroke="#10b981" stroke-width="2"/>

    <rect x="180" y="0" width="130" height="60" fill="#1e293b" stroke="#10b981" rx="4"/>
    <text x="245" y="25" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. Explore (DFS)</text>
    <text x="245" y="45" fill="#f8fafc" font-size="10" font-family="monospace">backtrack(i+1)</text>

    <path d="M 315 30 L 355 30" stroke="#f43f5e" stroke-width="2"/>

    <rect x="360" y="0" width="130" height="60" fill="#1e293b" stroke="#f43f5e" rx="4"/>
    <text x="425" y="25" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">3. Desfazer</text>
    <text x="425" y="45" fill="#f8fafc" font-size="10" font-family="monospace">state.pop()</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Reutiliza a mesma estrutura de memória sem clonar listas a cada nível</text>
`),

  'DSA-PATT-BACKTRACK-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Poda de Ramos (Pruning): Eliminação Antecipada de Ramos Inválidos</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#ef4444" rx="6"/>
    <text x="260" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Poda de Subárvores Inviáveis antes da Chamada Recursiva</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se current_sum + candidate &gt; target: aborta imediatamente com continue/return.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Reduz o espaço de busca de O(2ᴺ) ou O(N!) para frações minúsculas executáveis em ms.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Diferença entre Time Limit Exceeded (TLE) e aprovação em testes de Big Tech</text>
`),

  'DSA-PATT-BACKTRACK-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Problema das N-Rainhas: Validação com Vetores de Colunas e Diagonais</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Validação de Ataques em Tempo O(1)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Rastreia ocupação em 3 sets/bitsets: cols[c], diag1[row - col], diag2[row + col].</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Permite posicionar uma rainha por linha sem inspecionar o tabuleiro completo O(N).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Tempo reduzido para colocar N rainhas com validação O(1) instantânea</text>
`),

  'DSA-PATT-BACKTRACK-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Geração de Subconjuntos (Power Set O(2ᴺ)) vs Permutações (O(N!))</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Subsets (Escolha Binária)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Para cada item: inclui ou não inclui</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">2ᴺ combinações totais</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Permutations (Troca de Posições)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Fixa cada elemento na posição i</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">N! ordenações distintas</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Subsets usam índice inicial 'start'; Permutações usam vetor 'used[]' ou swap in-place</text>
`),

  'DSA-PATT-BACKTRACK-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sudoku Solver: Validação de Linha, Coluna e Bloco 3x3</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Mapeamento de Sub-Grade 3x3: box_idx = (r/3)*3 + (c/3)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Rastreia dígitos 1-9 com máscaras de bits: rows[r], cols[c], boxes[box_idx].</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Tenta dígitos válidos em células vazias; se travar, desfaz a escrita e retrocede.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Garante preenchimento determinístico de qualquer grade 9x9 válida em milissegundos</text>
`),

  'DSA-PATT-BACKTRACK-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Knuth's Dancing Links (DLX): Algoritmo X para Cobertura Exata</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Listas Duplamente Ligadas Circulares em 4 Direções (L, R, U, D)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Remove colunas e linhas cobrindo nós em O(1); restaura perfeitamente no backtrack.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Resolve problemas complexos de pentaminós, Sudoku e Cobertura de Conjuntos em tempo recorde.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Obra-prima de Donald Knuth para backtracking ultra-otimizado</text>
`),

  // === monotonic-stack-queue ===
  'DSA-PATT-MONOSTACK-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Pilha Monotônica Crescente vs Decrescente</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Monotônica Crescente (Base → Topo)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Itens: [ 1, 3, 5, 8 ] (Cresce até o topo)</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Encontra: Próximo Menor Elemento (NSE)</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Monotônica Decrescente</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Itens: [ 8, 5, 3, 1 ] (Diminui até o topo)</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Encontra: Próximo Maior Elemento (NGE)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Mantém a invariante desempilhando violadores antes de cada push: Custo Amortizado O(1)</text>
`),

  'DSA-PATT-MONOSTACK-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Next Greater Element (NGE) com Armazenamento de Índices em O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Resolução com Pilha Monotônica de Índices</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Itera sobre o array; enquanto arr[i] &gt; arr[stack.top()]: ans[stack.pop()] = arr[i].</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Ao final, elementos restantes na pilha recebem -1 (não possuem NGE).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Cada elemento é empilhado e desempilhado exatamente uma vez: Tempo estrito O(N)</text>
`),

  'DSA-PATT-MONOSTACK-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Largest Rectangle in Histogram com Pilha Monotônica em O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Cálculo de Área de Barra como Altura Mínima</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao desempilhar barra de altura H: largura = i - stack.peek() - 1.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Área = H × largura. Rastreia max_area em uma única passada linear.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Substitui a abordagem quadrática O(N²) por complexidade linear ótima O(N)</text>
`),

  'DSA-PATT-MONOSTACK-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Daily Temperatures: Dias de Espera por Temperatura Mais Alta</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Diferença de Índices: wait_days[prev_day] = curr_day - prev_day</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Empilha índices de dias com temperaturas decrescentes.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Ao encontrar dia mais quente T[i] &gt; T[stack.top()], resolve todos os dias pendentes.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Execução linear O(N) com memória auxiliar O(N)</text>
`),

  'DSA-PATT-MONOSTACK-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Monotonic Deque para Sliding Window Maximum</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Deque de Índices Mantendo Candidatos Vivos</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Frente do Deque: sempre o índice do maior elemento da janela atual.</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Fim do Deque: remove elementos menores que o novo elemento inserido.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Obtém o máximo de cada janela em tempo O(1) amortizado</text>
`),

  'DSA-PATT-MONOSTACK-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Shortest Subarray with Sum at Least K (Monotonic Deque + Prefix Sums)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Suporte a Números Negativos no Array</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Calcula vetor de somas prefixas P[i]. Mantém Deque de índices com P[i] estritamente crescente.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Enquanto P[i] - P[deque.front()] &gt;= K: min_len = min(min_len, i - deque.pop_front()).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Supera a limitação de Two Pointers para arrays com valores negativos em O(N)</text>
`)
};
