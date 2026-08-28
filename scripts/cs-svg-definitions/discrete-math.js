import { svgWrapper } from '../cs-svg-base.js';

export const DISCRETE_MATH_SVGS = {
  // === boolean-logic ===
  'CS-MATH-BOOL-000': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Operadores Bitwise Fundamentais na ALU</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="125" height="85" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="62" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">AND (&amp;)</text>
    <text x="62" y="44" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">1 &amp; 1 = 1</text>
    <text x="62" y="60" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">1 &amp; 0 = 0</text>
    <text x="62" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Máscara / Clear</text>

    <rect x="145" y="0" width="125" height="85" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="207" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">OR (|)</text>
    <text x="207" y="44" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">1 | 0 = 1</text>
    <text x="207" y="60" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">0 | 0 = 0</text>
    <text x="207" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Set Bit (Ligar)</text>

    <rect x="290" y="0" width="125" height="85" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="352" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">XOR (^)</text>
    <text x="352" y="44" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">1 ^ 0 = 1</text>
    <text x="352" y="60" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">1 ^ 1 = 0</text>
    <text x="352" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Toggle / Diff</text>

    <rect x="435" y="0" width="125" height="85" rx="5" fill="#1e293b" stroke="#a855f7"/>
    <text x="497" y="22" fill="#c084fc" font-size="12" font-weight="bold" text-anchor="middle">NOT (~) &amp; Shift</text>
    <text x="497" y="44" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">~0 = 1, ~1 = 0</text>
    <text x="497" y="60" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">x &lt;&lt; 1 = x * 2</text>
    <text x="497" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">x &gt;&gt; 1 = x / 2</text>
  </g>
  <rect x="60" y="150" width="560" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Execução em 1 ciclo na ALU: base de flags booleanas de alto desempenho e compressão de dados.</text>
`),

  'CS-MATH-BOOL-001': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Brian Kernighan: n &amp; (n - 1) para Popcount</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="260" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="130" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Passo 1: n = 12 (0b1100)</text>
    <text x="130" y="44" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">n     = 0b1100</text>
    <text x="130" y="60" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">n - 1 = 0b1011</text>
    <text x="130" y="78" fill="#10b981" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">n &amp; (n-1) = 0b1000 (clear bit 2)</text>

    <rect x="300" y="0" width="260" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="430" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Passo 2: n = 8 (0b1000)</text>
    <text x="430" y="44" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">n     = 0b1000</text>
    <text x="430" y="60" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">n - 1 = 0b0111</text>
    <text x="430" y="78" fill="#10b981" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">n &amp; (n-1) = 0b0000 (clear bit 3)</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Complexidade: O(k), onde k é a quantidade de bits 1 (set bits), e não O(32) ou O(64)!</text>
  <text x="340" y="188" fill="#94a3b8" font-size="10" text-anchor="middle">Cada iteração desliga exatamente o bit 1 menos significativo (LSB set bit) em O(1).</text>
`),

  'CS-MATH-BOOL-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Teoremas de De Morgan &amp; Dualidade Lógica</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="260" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="130" y="24" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Primeira Lei de De Morgan</text>
    <text x="130" y="52" fill="#ffffff" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle">!(A &amp;&amp; B) ≡ !A || !B</text>
    <text x="130" y="70" fill="#94a3b8" font-size="10" text-anchor="middle">A negação da conjunção é a disjunção das negações</text>

    <rect x="300" y="0" width="260" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="430" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Segunda Lei de De Morgan</text>
    <text x="430" y="52" fill="#ffffff" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle">!(A || B) ≡ !A &amp;&amp; !B</text>
    <text x="430" y="70" fill="#94a3b8" font-size="10" text-anchor="middle">A negação da disjunção é a conjunção das negações</text>
  </g>
  <rect x="60" y="145" width="560" height="35" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
  <text x="340" y="167" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Aplicação Prática: Refatoração de condicionais complexas e otimização de queries SQL (WHERE clauses).</text>
`),

  'CS-MATH-BOOL-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Propriedades Matemáticas do Operador XOR (^)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="85" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Auto-Anulação</text>
    <text x="85" y="45" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">x ^ x = 0</text>
    <text x="85" y="65" fill="#94a3b8" font-size="9" text-anchor="middle">Pares se cancelam</text>

    <rect x="195" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="280" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Identidade Neutra</text>
    <text x="280" y="45" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">x ^ 0 = x</text>
    <text x="280" y="65" fill="#94a3b8" font-size="9" text-anchor="middle">Preserva o operando</text>

    <rect x="390" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="475" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Involução (Reversibilidade)</text>
    <text x="475" y="45" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">(x ^ y) ^ y = x</text>
    <text x="475" y="65" fill="#94a3b8" font-size="9" text-anchor="middle">Base da Criptografia &amp; RAID 5</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Single Number Problem (LeetCode 136): Reduz array de O(N) espaço para O(1) com acumulador XOR.</text>
`),

  'CS-MATH-BOOL-004': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estrutura de Bitset / Bit Array de Alta Densidade</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="55" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Palavra uint64 (64 flags booleanas em 8 Bytes de memória)</text>
    
    <g transform="translate(40, 30)">
      <rect x="0" y="0" width="15" height="15" fill="#10b981"/>
      <rect x="16" y="0" width="15" height="15" fill="#334155"/>
      <rect x="32" y="0" width="15" height="15" fill="#10b981"/>
      <rect x="48" y="0" width="15" height="15" fill="#10b981"/>
      <rect x="64" y="0" width="15" height="15" fill="#334155"/>
      <rect x="80" y="0" width="15" height="15" fill="#334155"/>
      <text x="120" y="12" fill="#94a3b8" font-size="10" font-family="monospace">... bits 0..63</text>
    </g>
  </g>
  <g transform="translate(60, 115)">
    <rect x="0" y="0" width="270" height="60" rx="5" fill="#0f172a" stroke="#10b981"/>
    <text x="135" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Set(i): words[i/64] |= (1ULL &lt;&lt; (i%64))</text>
    <text x="135" y="44" fill="#a7f3d0" font-size="10" text-anchor="middle">Liga o i-ésimo bit em tempo O(1)</text>

    <rect x="290" y="0" width="270" height="60" rx="5" fill="#0f172a" stroke="#38bdf8"/>
    <text x="425" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Test(i): (words[i/64] &amp; (1ULL &lt;&lt; (i%64))) != 0</text>
    <text x="425" y="44" fill="#bae6fd" font-size="10" text-anchor="middle">Consulta o estado do bit em O(1)</text>
  </g>
`),

  // === combinatorics-probability ===
  'CS-MATH-PROB-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Permutações vs Combinações e Explosão Combinatória</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="265" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="132" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Permutação: A Ordem IMPORTA</text>
    <text x="132" y="44" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">P(n, k) = n! / (n - k)!</text>
    <text x="132" y="62" fill="#94a3b8" font-size="10" text-anchor="middle">Exemplo: [A, B] ≠ [B, A] (Senhas, Filas)</text>
    <text x="132" y="76" fill="#fca5a5" font-size="9" text-anchor="middle">Complexidade: O(n!) — Impraticável p/ n > 12</text>

    <rect x="295" y="0" width="265" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="427" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Combinação: A Ordem NÃO Importa</text>
    <text x="427" y="44" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">C(n, k) = n! / (k! * (n - k)!)</text>
    <text x="427" y="62" fill="#94a3b8" font-size="10" text-anchor="middle">Exemplo: {A, B} ≡ {B, A} (Subconjuntos, Loterias)</text>
    <text x="427" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Coeficiente Binomial (Triângulo de Pascal)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Identificação de Gargalos: Problemas O(n!) e O(2^n) exigem poda por Branch &amp; Bound ou DP.</text>
`),

  'CS-MATH-PROB-001': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Paradoxo do Aniversário: Probabilidade de Colisão de Hash</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="90" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="280" y="24" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Apenas 23 pessoas para 50% de chance de 2 pessoas com o mesmo aniversário</text>
    <text x="280" y="48" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">P(Colisão) ≈ 1 - e^(-k^2 / (2N)) | k ≈ 1.177 * √N</text>
    <text x="280" y="72" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Para N = 365 dias → k = 23 | Para hash 64-bit (2^64) → Colisão com ~2^32 itens!</text>
  </g>
  <rect x="60" y="150" width="560" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Impacto em Arquitetura: UUIDs de 64 bits colidem rápido; UUIDv4 (128 bits) garante segurança.</text>
`),

  'CS-MATH-PROB-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Probabilidade Condicional e Teorema de Bayes em Sistemas</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="280" y="26" fill="#60a5fa" font-size="14" font-weight="bold" font-family="monospace" text-anchor="middle">P(A|B) = [ P(B|A) * P(A) ] / P(B)</text>
    <text x="280" y="52" fill="#f8fafc" font-size="11" text-anchor="middle">• P(A|B): Probabilidade a posteriori (hipótese A após observar a evidência B)</text>
    <text x="280" y="70" fill="#a1a1aa" font-size="10" text-anchor="middle">• P(A): Prior | P(B|A): Likelihood (Verossimilhança) | P(B): Evidência marginal</text>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Aplicações Reais: Filtros Anti-Spam Bayesianos, Detecção de Fraude e Diagnóstico de Anomalias SRE.</text>
`),

  'CS-MATH-PROB-004': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bloom Filter: Estrutura Probabilística de Pertencimento</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="280" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Vetor de m bits com k funções de hash independentes</text>
    
    <g transform="translate(50, 35)">
      <rect x="0" y="0" width="22" height="22" fill="#334155" stroke="#475569"/>
      <rect x="25" y="0" width="22" height="22" fill="#10b981" stroke="#34d399"/><text x="36" y="15" fill="#ffffff" font-size="10" text-anchor="middle">1</text>
      <rect x="50" y="0" width="22" height="22" fill="#334155" stroke="#475569"/>
      <rect x="75" y="0" width="22" height="22" fill="#10b981" stroke="#34d399"/><text x="86" y="15" fill="#ffffff" font-size="10" text-anchor="middle">1</text>
      <rect x="100" y="0" width="22" height="22" fill="#334155" stroke="#475569"/>
      <rect x="125" y="0" width="22" height="22" fill="#10b981" stroke="#34d399"/><text x="136" y="15" fill="#ffffff" font-size="10" text-anchor="middle">1</text>
      <text x="220" y="15" fill="#94a3b8" font-size="10" font-family="monospace">... m bits no array</text>
    </g>
    <text x="280" y="75" fill="#fef3c7" font-size="10" text-anchor="middle">Falso Positivo Possível (Hash Collisions) | Falso Negativo IMPOSSÍVEL (Zero Falsos Negativos)</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Se Bloom Filter diz 'NÃO': certeza absoluta de ausência (evita I/O de disco em Cassandra/RocksDB).</text>
`),

  // === graph-theory ===
  'CS-MATH-GRAPH-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Grafo Direcionado Acíclico (DAG) &amp; Ordenação Topológica</text>
  <g transform="translate(80, 50)">
    <!-- Nodes -->
    <circle cx="40" cy="30" r="18" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="40" y="35" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">A</text>

    <path d="M 60 30 L 140 30" stroke="#38bdf8" stroke-width="2"/>

    <circle cx="160" cy="30" r="18" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="160" y="35" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">B</text>

    <path d="M 180 30 L 260 30" stroke="#38bdf8" stroke-width="2"/>

    <circle cx="280" cy="30" r="18" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="280" y="35" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">C</text>

    <path d="M 300 30 L 380 30" stroke="#38bdf8" stroke-width="2"/>

    <circle cx="400" cy="30" r="18" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="400" y="35" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">D</text>
  </g>
  <g transform="translate(60, 115)">
    <rect x="0" y="0" width="560" height="55" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
    <text x="280" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Algoritmo de Kahn (In-Degree) / DFS Post-Order Reverso: Tempo O(V + E)</text>
    <text x="280" y="44" fill="#94a3b8" font-size="10" text-anchor="middle">Aplicações: Ordem de compilação (Make/Bazel), execução de DAGs em Airflow e resolução de dependências.</text>
  </g>
`),

  'CS-MATH-GRAPH-001': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Princípio da Casa dos Pombos (Pigeonhole Principle)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="280" y="24" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Se n itens forem colocados em m caixas e n > m, pelo menos uma caixa contém ≥ 2 itens</text>
    <text x="280" y="50" fill="#f8fafc" font-size="11" text-anchor="middle">Exemplo: Em um grupo de 367 pessoas, pelo menos duas fazem aniversário no mesmo dia.</text>
    <text x="280" y="68" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">⌈n / m⌉ = cota inferior garantida de colisões</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Base matemática da prova de colisões inevitáveis em tabelas hash finitas e algoritmos de compressão sem perda.</text>
`),

  'CS-MATH-GRAPH-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Representação de Grafos: Matriz vs Lista de Adjacência</text>
  <g transform="translate(50, 48)">
    <!-- Matrix -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Matriz de Adjacência [V x V]</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Espaço: O(V²) | Consulta hasEdge(u,v): O(1)</text>
    <text x="135" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Iterar vizinhos: O(V) fixo</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Ideal para: Grafos Densos (E ≈ V²)</text>

    <!-- List -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Lista de Adjacência Array[V]</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Espaço: O(V + E) | Consulta: O(deg(u))</text>
    <text x="445" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Iterar vizinhos: O(deg(u)) instantâneo</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Ideal para: Grafos Esparsos (Maioria dos problemas reais)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Em entrevistas FAANG: Lista de Adjacência é o padrão de implementação para BFS, DFS e Dijkstra.</text>
`),

  'CS-MATH-GRAPH-003': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Componentes Fortemente Conexos (SCC) &amp; Algoritmo de Tarjan</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="24" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Algoritmo de Tarjan: DFS com Pilha e Low-Link Values em O(V + E)</text>
    <text x="280" y="48" fill="#f8fafc" font-size="10" text-anchor="middle">Identifica subgrafos direcionados onde todo vértice é alcançável a partir de qualquer outro.</text>
    <text x="280" y="66" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">low[u] = min(ids[u], ids[v]) | Raiz do SCC identificada quando low[u] == ids[u]</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Permite condensar grafos complexos em um supergrafo DAG para análise de dependências circulares.</text>
`),

  'CS-MATH-GRAPH-004': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Disjoint Set Union (DSU / Union-Find) com Path Compression</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="265" height="80" rx="6" fill="#1e293b" stroke="#3b82f6"/>
    <text x="132" y="24" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Find(x) com Path Compression</text>
    <text x="132" y="48" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">parent[x] = find(parent[x])</text>
    <text x="132" y="66" fill="#a7f3d0" font-size="9" text-anchor="middle">Achata a árvore diretamente na raiz</text>

    <rect x="295" y="0" width="265" height="80" rx="6" fill="#1e293b" stroke="#10b981"/>
    <text x="427" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Union(x, y) por Rank / Size</text>
    <text x="427" y="48" fill="#f8fafc" font-size="10" text-anchor="middle">Árvore menor acoplada sob a maior</text>
    <text x="427" y="66" fill="#a7f3d0" font-size="9" text-anchor="middle">Mantém a altura controlada em O(log N)</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Complexidade Amortizada: O(α(N)) por operação (Função Inversa de Ackermann ≤ 4 para qualquer N prático).</text>
`),

  // === number-representation-ieee754 ===
  'CS-MATH-NUM-000': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Complemento de Dois: Representação de Inteiros Negativos</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Mecânica: Inverte todos os bits e soma 1 (~x + 1)</text>
    <text x="280" y="44" fill="#ffffff" font-size="11" font-family="monospace" text-anchor="middle">+5 = 0b00000101 → Inverte: 0b11111010 → Soma 1: 0b11111011 (-5)</text>
    <text x="280" y="68" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Vantagem: Subtração (A - B) torna-se uma simples soma binária A + (~B + 1) na ALU!</text>
  </g>
  <text x="340" y="165" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">Integer Overflow: Somar 1 ao maior int32 positivo (0x7FFFFFFF) resulta no menor número negativo (-2^31).</text>
`),

  'CS-MATH-NUM-001': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Inexatidão de Float Binário: Por Que 0.1 + 0.2 ≠ 0.3</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="280" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">0.1 em binário é uma dízima periódica infinita: 0.0001100110011...</text>
    <text x="280" y="44" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">0.1 + 0.2 = 0.300000000000000044408920985006...</text>
    <text x="280" y="70" fill="#fef3c7" font-size="11" font-weight="bold" text-anchor="middle">Regra para Finanças &amp; Bancos: NUNCA use float/double para valores monetários!</text>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Solução: Inteiros representando centavos (int64) ou tipos decimais exatos (BigDecimal / shopspring/decimal).</text>
`),

  'CS-MATH-NUM-002': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Endianness: Big-Endian (Network) vs Little-Endian (x86/ARM)</text>
  <g transform="translate(50, 48)">
    <!-- Little Endian -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Little-Endian (x86-64 / ARM64)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Valor: 0x12345678</text>
    <text x="135" y="60" fill="#ffffff" font-size="11" font-family="monospace" text-anchor="middle">Memória: [0x78] [0x56] [0x34] [0x12]</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">LSB no menor endereço de memória</text>

    <!-- Big Endian -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Big-Endian (Network Byte Order)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Valor: 0x12345678</text>
    <text x="445" y="60" fill="#ffffff" font-size="11" font-family="monospace" text-anchor="middle">Memória: [0x12] [0x34] [0x56] [0x78]</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">MSB no menor endereço (leitura humana)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Funções htons() / ntohs() realizam a conversão obrigatória entre Host e Network Byte Order.</text>
`),

  'CS-MATH-NUM-003': svgWrapper(680, 210, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estrutura IEEE 754: Ponto Flutuante de Precisão Simples (Float32)</text>
  <g transform="translate(60, 48)">
    <!-- 32-bit layout -->
    <rect x="0" y="0" width="30" height="50" rx="4" fill="#f43f5e"/>
    <text x="15" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">S</text>
    <text x="15" y="42" fill="#fecaca" font-size="9" text-anchor="middle">1b</text>

    <rect x="35" y="0" width="160" height="50" rx="4" fill="#3b82f6"/>
    <text x="115" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Expoente com Bias (127)</text>
    <text x="115" y="42" fill="#bfdbfe" font-size="9" text-anchor="middle">8 bits</text>

    <rect x="200" y="0" width="360" height="50" rx="4" fill="#10b981"/>
    <text x="380" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Mantissa / Fração Normalizada (1.M)</text>
    <text x="380" y="42" fill="#bbf7d0" font-size="9" text-anchor="middle">23 bits</text>
  </g>
  <g transform="translate(60, 115)">
    <rect x="0" y="0" width="560" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <text x="280" y="24" fill="#38bdf8" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle">Valor = (-1)^S × (1 + Mantissa) × 2^(Expoente - 127)</text>
    <text x="280" y="42" fill="#94a3b8" font-size="10" text-anchor="middle">Float64 (Double): 1 bit sinal, 11 bits expoente (bias 1023), 52 bits mantissa (53 bits de precisão).</text>
  </g>
`),

  'CS-MATH-NUM-004': svgWrapper(680, 200, `
  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Valores Especiais IEEE 754: NaN, Infinito e Subnormais</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="175" height="75" rx="5" fill="#1e293b" stroke="#f43f5e"/>
    <text x="87" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">NaN (Not a Number)</text>
    <text x="87" y="42" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">0/0, sqrt(-1)</text>
    <text x="87" y="60" fill="#fecaca" font-size="9" text-anchor="middle">NaN ≠ NaN (sempre falso)</text>

    <rect x="190" y="0" width="180" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="280" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Infinito (±Inf)</text>
    <text x="280" y="42" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">1.0 / 0.0 → +Inf</text>
    <text x="280" y="60" fill="#fef3c7" font-size="9" text-anchor="middle">Exp = Todos 1, Mant = 0</text>

    <rect x="385" y="0" width="175" height="75" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="472" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Subnormais (Denormais)</text>
    <text x="472" y="42" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">Exp = 0, Mant ≠ 0</text>
    <text x="472" y="60" fill="#bfdbfe" font-size="9" text-anchor="middle">Penalidade grave de FPU</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Números subnormais podem tornar cálculos de FPU até 100x mais lentos se não tratados via flags FTZ/DAZ.</text>
`)
};
