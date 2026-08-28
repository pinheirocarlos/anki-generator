import { svgWrapper } from '../dsa-svg-base.js';

export const PATTERNS_PART2_SVGS = {
  // === divide-and-conquer-sorting ===
  'DSA-PATT-DIVCONQ-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Merge Sort: Divisão ao Meio e Intercalação Estável O(N log N)</text>
  <g transform="translate(120, 50)">
    <rect x="0" y="0" width="180" height="30" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="90" y="20" fill="#38bdf8" font-size="11" text-anchor="middle">Array [38, 27, 43, 3, 9, 82]</text>
    <line x1="90" y1="30" x2="45" y2="55" stroke="#3b82f6"/>
    <line x1="90" y1="30" x2="135" y2="55" stroke="#3b82f6"/>

    <rect x="0" y="55" width="90" height="24" fill="#1e293b" stroke="#64748b" rx="3"/><text x="45" y="71" fill="#94a3b8" font-size="9" text-anchor="middle">[38, 27, 43]</text>
    <rect x="100" y="55" width="90" height="24" fill="#1e293b" stroke="#64748b" rx="3"/><text x="145" y="71" fill="#94a3b8" font-size="9" text-anchor="middle">[3, 9, 82]</text>

    <g transform="translate(240, 15)">
      <path d="M 0 35 L 40 35" stroke="#10b981" stroke-width="2.5" marker-end="url(#arrow)"/>
      <rect x="50" y="15" width="190" height="40" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
      <text x="145" y="38" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">Merge([27,38,43], [3,9,82])</text>
      <text x="145" y="68" fill="#34d399" font-size="10" font-family="monospace" text-anchor="middle">→ [3, 9, 27, 38, 43, 82]</text>
    </g>
  </g>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Garante O(N log N) no pior caso e estabilidade de ordem com espaço O(N)</text>
`),

  'DSA-PATT-DIVCONQ-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">QuickSort: Pivô e Partição In-Place (O(N log N) Médio, Espaço O(log N))</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Escolha de Pivô e Partição em Menores / Maiores</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Posiciona todos os itens &lt; pivot à esquerda e todos &gt; pivot à direita em tempo linear O(N).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Recursão sobre as duas metades in-place: Excelente localidade de cache L1 da CPU.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Pior caso O(N²) evitado com pivô aleatório ou mediana-de-três</text>
`),

  'DSA-PATT-DIVCONQ-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Teorema Mestre para Relações de Recorrência: T(N) = a T(N/b) + f(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Comparação entre f(N) e N^(log_b a)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="10">Caso 1: f(N) &lt; N^(log_b a) → T(N) = Θ(N^(log_b a)) [Custo dominado pelas folhas]</text>
    <text x="20" y="58" fill="#10b981" font-size="10">Caso 2: f(N) = Θ(N^(log_b a)) → T(N) = Θ(N^(log_b a) · log N) [Custo equilibrado por nível]</text>
    <text x="20" y="71" fill="#f59e0b" font-size="10">Caso 3: f(N) &gt; N^(log_b a) → T(N) = Θ(f(N)) [Custo dominado pela raiz]</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Exemplo: Merge Sort T(N) = 2T(N/2) + O(N) → Caso 2 → O(N log N)</text>
`),

  'DSA-PATT-DIVCONQ-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">QuickSelect: K-ésimo Menor Elemento em Tempo Linear Esperado O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Partição Unilateral: Descarta uma Metade a Cada Passo</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao contrário do QuickSort que entra em recursão em ambos os lados, entra em apenas um.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Série geométrica: N + N/2 + N/4 + ... = 2N → Tempo Médio Estrito O(N).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Encontra a mediana ou o K-ésimo maior elemento sem ordenar o array completo</text>
`),

  'DSA-PATT-DIVCONQ-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Contagem de Inversões em Array com Merge Sort em O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Inversão: Par (i, j) onde i &lt; j e arr[i] &gt; arr[j]</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Durante a etapa de merge: se arr[L] &gt; arr[R], todos os elementos restantes na esquerda invertem com arr[R].</text>
    <text x="20" y="62" fill="#10b981" font-size="11">inversions += (mid - L + 1). Contagem acumulada em tempo O(N log N).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Mede o grau de desordem de um vetor e resolve problemas de ranqueamento colaborativo</text>
`),

  'DSA-PATT-DIVCONQ-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Multiplicação Rápida de Karatsuba: O(N^(log₂ 3)) ≈ O(N^1.585)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Redução de 4 Multiplicações de Subproblemas para 3</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Divide números de N dígitos em partes altas e baixas: X = X1·10^(N/2) + X0.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Calcula z0 = X0·Y0, z2 = X1·Y1 e z1 = (X1+X0)·(Y1+Y0) - z2 - z0 com apenas 3 multiplicações.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Base da biblioteca de números inteiros de precisão arbitrária (BigInt em Java/Python)</text>
`),

  // === dynamic-programming-1d ===
  'DSA-PATT-DP1D-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Paradigma de Programação Dinâmica: Subestrutura Ótima &amp; Sobreposição</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1. Subestrutura Ótima</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">A solução ótima do problema maior</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">contém soluções ótimas de subproblemas</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2. Subproblemas Sobrepostos</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Mesmos subproblemas resolvidos</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">repetidas vezes (memoization / tabela)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz árvores de recursão exponencial O(2ᴺ) para complexidade polinomial O(N)</text>
`),

  'DSA-PATT-DP1D-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Top-Down (Memoization) vs Bottom-Up (Tabulation)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Top-Down (Recursão + Cache)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Inicia no problema N e desce</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">Resolve apenas subestados necessários</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Bottom-Up (Iterativo / Array)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Inicia nos casos base: dp[0], dp[1]...</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Zero overhead de stack frame, mais rápido</text>
    </g>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Bottom-Up frequentemente permite otimização de espaço eliminando a tabela completa</text>
`),

  'DSA-PATT-DP1D-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Coin Change: dp[i] = min(dp[i - coin] + 1) para cada moeda</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Transição de Estado 1D (Bottom-Up)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Casos base: dp[0] = 0; todos os outros dp[i] inicializados com infinito (INF).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Para cada quantia i de 1 até Amount: dp[i] = min_{c} (dp[i - c] + 1).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Complexidade de Tempo: O(Amount × Moedas) | Complexidade de Espaço: O(Amount)</text>
`),

  'DSA-PATT-DP1D-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Longest Increasing Subsequence (LIS): DP O(N²) vs Patience Sorting O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="120" y="22" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">DP Clássico O(N²)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">dp[i] = max(dp[j] + 1) para j &lt; i</text>
    <text x="15" y="60" fill="#fde68a" font-size="10">Dois loops aninhados simples</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Patience Sorting O(N log N)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Mantém array 'tails' ordenado</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Substitui com binary search (lower_bound)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Patience sorting escala com facilidade para N = 10⁵ elementos</text>
`),

  'DSA-PATT-DP1D-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">House Robber: Otimização de Espaço O(N) → Duas Variáveis O(1)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Equação de Bellman: dp[i] = max(dp[i-1], dp[i-2] + nums[i])</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">A decisão depende estritamente dos dois estados imediatamente anteriores.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Rastreia apenas prev1 e prev2: temp = max(prev1, prev2 + num); prev2 = prev1; prev1 = temp.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Elimina o vetor de DP completo: Tempo O(N), Espaço Auxiliar O(1) estrito</text>
`),

  'DSA-PATT-DP1D-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Kadane's Algorithm: Subarray de Soma Máxima em Tempo O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Decisão Local: Estender Subarray Anterior ou Iniciar Novo a Partir de num</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">current_max = max(num, current_max + num).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">global_max = max(global_max, current_max).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Execução em uma única passada sem alocação de memória auxiliar</text>
`),

  // === dynamic-programming-2d ===
  'DSA-PATT-DP2D-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Matriz de DP 2D: Grid de Estados dp[i][j]</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="0" width="220" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="110" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Definição Bidimensional</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">i: índice do item / prefixo da string 1</text>
    <text x="15" y="60" fill="#93c5fd" font-size="10">j: capacidade restante / prefixo da string 2</text>

    <g transform="translate(260, 0)">
      <rect x="0" y="0" width="220" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="110" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Ordem de Preenchimento</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Linha por linha (Top → Bottom)</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Garante que dp[i-1][j] já está calculado</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Base para problemas de Mochila, LCS, Distância de Edição e Caminhos em Grid</text>
`),

  'DSA-PATT-DP2D-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">0/1 Knapsack: dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Decisão Binária: Não Incluir vs Incluir Item i</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Opção 1 (Não levar): dp[i-1][w] (copia valor da linha anterior).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Opção 2 (Levar): dp[i-1][w - wt[i]] + val[i] (consome peso wt[i] e soma valor).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Tempo: O(N × W) | Espaço: O(W) quando otimizado com iteração reversa de w</text>
`),

  'DSA-PATT-DP2D-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Longest Common Subsequence (LCS) e Reconstrução da Solução</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Transição de Caracteres</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] + 1 (diagonal + 1).</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Se s1[i-1] != s2[j-1]: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Backtracking a partir de dp[M][N] reconstrói a sequência em tempo O(M + N) (base do git diff)</text>
`),

  'DSA-PATT-DP2D-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Edit Distance (Levenshtein): Inserção, Deleção e Substituição</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Mínimo entre 3 Operações Elementares de Custo 1</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">dp[i][j] = 1 + min(dp[i][j-1] (Inserção), dp[i-1][j] (Deleção), dp[i-1][j-1] (Substituição)).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Se s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1] (custo zero).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Complexidade: O(M × N) de tempo e espaço</text>
`),

  'DSA-PATT-DP2D-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Unique Paths em Grid: dp[i][j] = dp[i-1][j] + dp[i][j-1]</text>
  <g transform="translate(120, 50)">
    <rect x="0" y="0" width="60" height="40" fill="#1e293b" stroke="#64748b" rx="3"/><text x="30" y="25" fill="#94a3b8" font-size="11" text-anchor="middle">Cima</text>
    <text x="80" y="25" fill="#34d399" font-size="14" font-weight="bold">+</text>
    <rect x="100" y="0" width="60" height="40" fill="#1e293b" stroke="#64748b" rx="3"/><text x="130" y="25" fill="#94a3b8" font-size="11" text-anchor="middle">Esq</text>
    <text x="180" y="25" fill="#34d399" font-size="14" font-weight="bold">=</text>
    <rect x="200" y="0" width="80" height="40" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="240" y="25" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">dp[i][j]</text>
  </g>
  <text x="340" y="145" fill="#38bdf8" font-size="11" text-anchor="middle">Se grid[i][j] é obstáculo: dp[i][j] = 0 (caminho bloqueado)</text>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Reduzível a 1 único array 1D de tamanho N (dp[j] += dp[j-1]) com espaço O(N)</text>
`),

  'DSA-PATT-DP2D-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Otimização de Espaço: Rolling Array (Duas Linhas / 1D)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Como a Linha i Depende Apenas da Linha i-1</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Aloca apenas 2 linhas de tamanho N usando índice modular: dp[i % 2][j].</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Ou um único array 1D percorrido na direção apropriada. Espaço reduz de O(M × N) para O(N).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Essencial para rodar problemas com M, N = 10⁴ sem estourar limites de memória (OOM)</text>
`),

  // === dynamic-programming-advanced ===
  'DSA-PATT-DPADV-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bitmask DP: Problema do Caixeiro Viajante (TSP) em O(2ᴺ · N²)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Estado: dp[mask][curr_city] onde mask representa cidades visitadas</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se o bit k da mask é 1: cidade k já foi visitada no percurso.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Transição: dp[mask | (1&lt;&lt;nxt)][nxt] = min(dp[mask][curr] + dist[curr][nxt]).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz a complexidade fatorial de força bruta O(N!) para O(2ᴺ · N²)</text>
`),

  'DSA-PATT-DPADV-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Digit DP: Contagem de Números com Propriedades em [L, R]</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">solve(R) - solve(L - 1) com Parâmetros de Estado</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">memo[idx][isTight][hasLeadingZero][conditionState].</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">isTight == true limita o dígito atual ao teto do número original; caso contrário, varia de 0 a 9.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Resolve problemas com números de até 10¹⁸ dígitos em tempo O(log₁₀ N · Estados)</text>
`),

  'DSA-PATT-DPADV-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Tree DP (DP em Árvores): Re-Rooting e Subárvores</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Duas Passadas DFS (Subindo e Descendo)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">DFS 1 (Bottom-Up): Calcula as respostas parciais de cada subárvore a partir das folhas.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">DFS 2 (Top-Down): Transfere a contribuição do pai ao re-enraizar a árvore para cada vizinho.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Calcula a resposta para TODAS as N possíveis raízes em tempo O(N) ao invés de O(N²)</text>
`),

  'DSA-PATT-DPADV-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Exponenciação Rápida de Matrizes para Recorrências em O(K³ log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Matriz de Transição M elevado à potência N</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">[F(n+1), F(n)] = [[1, 1], [1, 0]]ⁿ · [F(1), F(0)].</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Calcula Mⁿ usando binary exponentiation (M^(N/2) · M^(N/2)) em O(log N).</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Calcula o N-ésimo Fibonacci para N = 10¹⁸ sob módulo em frações de microssegundo</text>
`),

  'DSA-PATT-DPADV-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Convex Hull Trick (CHT): Otimização de Transições de DP de O(N²) → O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Transições na Forma de Retas: dp[i] = min_{j} (m_j · x_i + c_j)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Mantém a envoltória convexa inferior das retas candidatas.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Busca a melhor reta em tempo O(log N) com binary search ou O(1) se as inclinações forem monotônicas.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Técnica padrão para problemas de partição de custos quadráticos em competições avançadas</text>
`),

  'DSA-PATT-DPADV-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Knuth-Yao e Divide and Conquer DP Optimization: Redução O(N³) → O(N²)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Monotonicidade do Ponto de Divisão Ótimo: opt[i][j-1] ≤ opt[i][j] ≤ opt[i+1][j]</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Aplica-se quando o custo satisfaz a desigualdade do quadrilátero (Quadrangle Inequality).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Restringe o espaço de busca do índice k ao intervalo [opt[i][j-1], opt[i+1][j]], somando O(N²).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Reduz a complexidade de problemas de Árvore de Busca Binária Ótima de O(N³) para O(N²)</text>
`),

  // === greedy-algorithms ===
  'DSA-PATT-GREEDY-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmos Gulosos: Escolha Gulosa Local &amp; Subestrutura Ótima</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Decisão Local Ótima sem Backtracking (Irreversível)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">A cada passo, seleciona a melhor opção imediata sem reavaliar escolhas passadas.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Corretude provada por argumento de troca (Exchange Argument) demonstrando que não há solução superior.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Tempo de execução frequentemente dominado pela ordenação inicial: O(N log N)</text>
`),

  'DSA-PATT-GREEDY-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Activity Selection / Agendamento de Intervalos: Ordenação por End-Time</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Escolha: Atividade que Termina Mais Cedo (Minimiza Bloqueio Futuro)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Ordena os intervalos por tempo de término: intervals.sort(by: end_time).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">2. Seleciona o próximo intervalo se start_time &gt;= last_end_time; atualiza last_end_time.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Maximiza a quantidade total de eventos compatíveis em tempo O(N log N)</text>
`),

  'DSA-PATT-GREEDY-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fractional Knapsack: Ordenação por Densidade de Valor (val / weight)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Itens Fracionáveis Permitem Abordagem Gulosa Ótima</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ordena decrescentemente por densidade ratio = value / weight.</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Consome itens inteiros; no último item que não couber por completo, leva a fração restante W_rest / weight.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Mochila 0/1 exige DP O(N·W); Mochila Fracionária é resolvida gulosamente em O(N log N)</text>
`),

  'DSA-PATT-GREEDY-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Huffman Coding: Árvore de Prefixos Ótima com Min-Heap</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Caracteres Mais Frequentes Recebem Códigos Menores</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Insere nós de frequência em um Min-Heap.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Combina os dois menores nós sucessivamente até restar uma única raiz em O(N log N).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Garante compressão sem perdas com códigos livres de prefixo (prefix-free)</text>
`),

  'DSA-PATT-GREEDY-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Jump Game: Rastreamento Guloso da Máxima Posição Alcançável</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">max_reach = max(max_reach, i + nums[i])</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se o índice atual i &gt; max_reach → impossível avançar (retorna false).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Se max_reach &gt;= N - 1 → destino alcançado com sucesso (retorna true).</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Substitui DP O(N²) por varredura gulosa em tempo linear O(N) e espaço O(1)</text>
`),

  'DSA-PATT-GREEDY-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Gas Station: Ponto de Partida Viável em Única Passada O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Total Gas ≥ Total Cost Garante a Existência de Solução</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se o tanque atual curr_tank &lt; 0 ao viajar do posto i para i+1:</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Nenhum posto entre o início e i pode ser o ponto de partida! Reinicia: start = i + 1; curr_tank = 0.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Complexidade: Tempo O(N) em uma única iteração, Espaço O(1)</text>
`),

  // === intervals-merge ===
  'DSA-PATT-INTERVAL-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Merge Overlapping Intervals: Ordenação por Início e Fusão em O(N log N)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="10" width="120" height="24" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="3"/><text x="60" y="26" fill="#fff" font-size="10" text-anchor="middle">[1, 5]</text>
    <rect x="80" y="30" width="120" height="24" fill="#1e293b" stroke="#f59e0b" stroke-width="2" rx="3"/><text x="140" y="46" fill="#fff" font-size="10" text-anchor="middle">[3, 8]</text>

    <g transform="translate(240, 15)">
      <path d="M 0 20 L 40 20" stroke="#10b981" stroke-width="2.5" marker-end="url(#arrow)"/>
      <rect x="50" y="5" width="180" height="32" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
      <text x="140" y="25" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">[1, max(5, 8)] = [1, 8]</text>
    </g>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Se curr.start &lt;= prev.end → Funde os intervalos estendendo prev.end</text>
`),

  'DSA-PATT-INTERVAL-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Insert Interval: Inserção Ordenada em Lista sem Sobreposições em O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Três Etapas em Varredura Linear</text>
    <text x="20" y="42" fill="#94a3b8" font-size="10">1. Adiciona todos os intervalos que terminam antes de newInterval.start.</text>
    <text x="20" y="56" fill="#34d399" font-size="10">2. Funde todos os intervalos sobrepostos expandindo newInterval.</text>
    <text x="20" y="70" fill="#94a3b8" font-size="10">3. Adiciona os intervalos restantes que começam após newInterval.end.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Complexidade linear O(N) sem necessidade de re-ordenar o array</text>
`),

  'DSA-PATT-INTERVAL-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Meeting Rooms II: Mínimo de Salas Simultâneas com Min-Heap</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Rastreia Horários de Término de Reuniões em Andamento</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Ordena reuniões por tempo de início (start_time).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Se meeting.start &gt;= heap.peek() → reutiliza sala (heap.pop()). Adiciona novo término: heap.push(meeting.end).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Tamanho máximo do heap ao final = quantidade mínima de salas necessárias: O(N log N)</text>
`),

  'DSA-PATT-INTERVAL-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Non-overlapping Intervals: Mínimo de Remoções para Eliminar Sobreposição</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#ef4444" rx="6"/>
    <text x="260" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Escolha Gulosa: Remove o Intervalo que Termina Mais Tarde</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao detectar sobreposição entre prev e curr: incrementa contador de remoções.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Mantém o intervalo com menor término: prev.end = min(prev.end, curr.end).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Deixar o menor término livre maximiza o espaço para acomodar intervalos subsequentes</text>
`),

  'DSA-PATT-INTERVAL-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Interval List Intersections: Interseção entre Duas Listas com Two Pointers</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Interseção Válida: start = max(A.start, B.start) ≤ end = min(A.end, B.end)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se start ≤ end: adiciona intervalo [start, end] à lista de respostas.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Avança o ponteiro do intervalo que terminar primeiro: if A.end &lt; B.end → i++ else → j++.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Tempo total: O(M + N) em uma única passada sincronizada</text>
`),

  'DSA-PATT-INTERVAL-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Employee Free Time: Janelas Livres Compartilhadas entre Cronogramas</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Fusão de Todos os Intervalos de Trabalho e Identificação de Gaps</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Funde todos os períodos ocupados em uma linha do tempo unificada com Min-Heap / Sort.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Os intervalos entre prev.end e curr.start (onde prev.end &lt; curr.start) são os horários livres comuns.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Complexidade: O(N log K), onde N é o total de intervalos e K é o número de funcionários</text>
`)
};
