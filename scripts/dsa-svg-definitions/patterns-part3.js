import { svgWrapper } from '../dsa-svg-base.js';

export const PATTERNS_PART3_SVGS = {
  // === shortest-path-algorithms ===
  'DSA-PATT-SPATH-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Dijkstra: Relaxamento de Arestas com Min-Heap em O((V + E) log V)</text>
  <g transform="translate(100, 50)">
    <circle cx="50" cy="35" r="18" fill="#047857" stroke="#10b981" stroke-width="2"/><text x="50" y="38" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">U</text><text x="50" y="65" fill="#34d399" font-size="9" text-anchor="middle">dist[u]=4</text>
    
    <line x1="68" y1="35" x2="232" y2="35" stroke="#3b82f6" stroke-width="2.5"/>
    <rect x="130" y="22" width="40" height="24" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="150" y="38" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">w=3</text>

    <circle cx="250" cy="35" r="18" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="250" y="38" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">V</text><text x="250" y="65" fill="#f43f5e" font-size="9" text-decoration="line-through" text-anchor="middle">dist[v]=10</text>
  </g>
  <g transform="translate(420, 50)">
    <rect x="0" y="0" width="220" height="70" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="110" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Condição de Relaxamento:</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">dist[u] + w &lt; dist[v]</text>
    <text x="15" y="58" fill="#34d399" font-size="10" font-weight="bold">→ dist[v] = 4 + 3 = 7</text>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Garante menor distância para pesos não-negativos; falha em arestas com peso negativo</text>
`),

  'DSA-PATT-SPATH-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bellman-Ford: V - 1 Relaxamentos e Detecção de Ciclos Negativos em O(V · E)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f43f5e" rx="6"/>
    <text x="260" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Relaxa Todas as E Arestas V - 1 Vezes Sucessivas</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">O caminho mais curto simples contém no máximo V - 1 arestas.</text>
    <text x="20" y="62" fill="#fca5a5" font-size="11">Se na V-ésima iteração alguma distância ainda diminuir → CICLO DE PESO NEGATIVO DETECTADO!</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Tolera arestas negativas e é a base de protocolos de vetor de distância (RIP)</text>
`),

  'DSA-PATT-SPATH-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Floyd-Warshall: Todos os Pares de Caminhos Mínimos em O(V³)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">DP 3D: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) para cada intermediário k</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">3 loops aninhados simples: k (nó intermediário), i (origem), j (destino).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Calcula caminhos mais curtos entre qualquer par de nós em grafos densos.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Se a diagonal dist[i][i] &lt; 0 ao final → existe ciclo de peso negativo no grafo</text>
`),

  'DSA-PATT-SPATH-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">A* Search: Busca Heurística Admissível f(n) = g(n) + h(n)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">g(n) (Custo Real Acumulado) + h(n) (Estimativa Heurística até o Alvo)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Heurística admissível (h(n) nunca superestima o custo real) garante caminho ótimo.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Min-Heap ordena por menor f(n), direcionando a busca radial diretamente para o objetivo.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Explora frações mínimas dos nós explorados por Dijkstra em mapas 2D/3D (GPS routing)</text>
`),

  'DSA-PATT-SPATH-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">0-1 BFS com Deque em Tempo Linear O(V + E)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Substitui Min-Heap O((V+E) log V) por Deque O(V + E)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao relaxar aresta de peso 0: deque.push_front(v) (prioridade máxima imediata).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Ao relaxar aresta de peso 1: deque.push_back(v) (próximo nível).</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Mantém a monotonicidade de distância do deque com custo O(1) por operação</text>
`),

  'DSA-PATT-SPATH-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Johnson's Algorithm: Reponderação de Arestas Negativas em Grafos Esparsos</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">1× Bellman-Ford + V× Dijkstra em O(V · E + V · E log V)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Executa Bellman-Ford a partir de nó fonte artificial para computar potenciais h(v).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Transforma pesos: w'(u, v) = w(u, v) + h(u) - h(v) ≥ 0, viabilizando V execuções de Dijkstra.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Supera Floyd-Warshall O(V³) em grafos esparsos (onde E ≪ V²)</text>
`),

  // === topological-sort ===
  'DSA-PATT-TOPO-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Ordenação Topológica em DAG: Resolução Linear de Dependências</text>
  <g transform="translate(120, 50)">
    <rect x="0" y="15" width="80" height="35" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="40" y="37" fill="#fff" font-size="11" text-anchor="middle">Compilar</text>
    <path d="M 85 32 L 135 32" stroke="#3b82f6" stroke-width="2.5" marker-end="url(#arrow)"/>
    <rect x="140" y="15" width="80" height="35" fill="#1e293b" stroke="#10b981" rx="4"/><text x="180" y="37" fill="#fff" font-size="11" text-anchor="middle">Testar</text>
    <path d="M 225 32 L 275 32" stroke="#10b981" stroke-width="2.5" marker-end="url(#arrow)"/>
    <rect x="280" y="15" width="80" height="35" fill="#1e293b" stroke="#f59e0b" rx="4"/><text x="320" y="37" fill="#fff" font-size="11" text-anchor="middle">Deploy</text>
  </g>
  <text x="340" y="150" fill="#34d399" font-size="11" text-anchor="middle">Ordem linear u antes de v para toda aresta direcionada (u → v)</text>
  <text x="340" y="170" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Só existe se o grafo for Acíclico (DAG): Tempo O(V + E)</text>
`),

  'DSA-PATT-TOPO-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Kahn's Algorithm: Graus de Entrada (in_degree == 0) e Fila BFS</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Processamento por Eliminação de Pré-requisitos</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Enfileira todos os nós com in_degree == 0 (zero dependências pendentes).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">2. Ao desenfileirar u: adiciona à ordem e decrementa in_degree[v]--; se zerar, enfileira v.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Se a ordem final contiver menos de V vértices → O GRAFO CONTÉM UM CICLO!</text>
`),

  'DSA-PATT-TOPO-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Topological Sort via DFS: Pilha de Pós-Ordem Invertida</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Empilhamento no Retorno da Recursão</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Executa DFS completa; empilha o vértice u estritamente após todos os seus descendentes serem visitados.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Ao final, desempilhar a pilha resulta na ordem topológica válida: Tempo O(V + E).</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Garante que qualquer dependência de u já apareça após u na sequência</text>
`),

  'DSA-PATT-TOPO-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Detecção de Ciclos em DAG com Coloração de Nós (3 Cores)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="160" height="75" fill="#1e293b" stroke="#94a3b8" rx="6"/>
    <text x="80" y="22" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">0 - Branco (White)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Não visitado</text>

    <rect x="180" y="0" width="160" height="75" fill="#7f1d1d" stroke="#ef4444" rx="6"/>
    <text x="260" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">1 - Cinza (Gray)</text>
    <text x="195" y="45" fill="#fecaca" font-size="10">Na pilha de recursão</text>
    <text x="195" y="60" fill="#f87171" font-size="10">Back-edge = CICLO!</text>

    <rect x="360" y="0" width="160" height="75" fill="#065f46" stroke="#10b981" rx="6"/>
    <text x="440" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2 - Preto (Black)</text>
    <text x="375" y="45" fill="#f8fafc" font-size="10">Totalmente explorado</text>
  </g>
  <text x="340" y="165" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">Encontrar um nó vizinho CINZA comprova a existência de ciclo direcionado</text>
`),

  'DSA-PATT-TOPO-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Course Schedule II: Retorno de Ordem Válida de Execução de Tarefas</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Construção do Grafo de Pré-Requisitos e Resolução</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Mapeia prerequisites [a, b] como aresta direcionada b → a (fazer b antes de a).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Executa Kahn's Algorithm; se tamanho da ordem == numCourses retorna ordem, senão array vazio [].</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Aplicações diretas em compiladores (ordem de build em Make/Bazel/npm) e gerenciadores de pacotes</text>
`),

  'DSA-PATT-TOPO-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Caminho Mais Longo em DAG (Critical Path Method) em O(V + E)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Em DAGs, o Caminho Mais Longo NÃO é NP-Difícil!</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Encontra a ordenação topológica dos nós do DAG.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Relaxa na ordem topológica buscando máximo: dist[v] = max(dist[v], dist[u] + weight).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Identifica o caminho crítico e o tempo mínimo de conclusão de projetos em O(V + E)</text>
`),

  // === minimum-spanning-tree ===
  'DSA-PATT-MST-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Árvore Geradora Mínima (MST) e a Propriedade do Corte (Cut Property)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Propriedade do Corte: A aresta de menor peso cruzando qualquer corte PERTENCE à MST</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Uma MST conecta todos os V vértices com exatamente V - 1 arestas sem ciclos.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Minimiza o somatório total dos pesos das arestas selecionadas.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Fundamento teórico que garante a corretude dos algoritmos gulosos de Kruskal e Prim</text>
`),

  'DSA-PATT-MST-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Kruskal: Ordenação de Arestas + DSU em O(E log E)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Abordagem Baseada em Arestas</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Ordena todas as E arestas por peso crescente.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">2. Para cada aresta (u, v): se find(u) != find(v) → union(u, v) e adiciona à MST.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Ideal para grafos esparsos (E ≈ V); para assim que V - 1 arestas forem incluídas</text>
`),

  'DSA-PATT-MST-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Prim: Crescimento de Vértice com Min-Heap em O((V + E) log V)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Abordagem Baseada em Vértices (Crescimento de Árvore Conexa)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Inicia em um vértice arbitrário e adiciona suas arestas a um Min-Heap.</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">A cada passo, extrai a aresta mais leve conectando a árvore a um nó não-visitado.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Estrutura idêntica ao Dijkstra; superior a Kruskal em grafos densos (com Fibonacci Heap O(E + V log V))</text>
`),

  'DSA-PATT-MST-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Borůvka's Algorithm: Seleção Paralela de Arestas Mínimas em O(E log V)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Fusão Simultânea de Componentes em Cada Rodada</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Cada componente conectado escolhe concorrentemente sua aresta incidente de menor peso.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">O número de componentes reduz pela metade a cada fase: estritamente log₂ V fases.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">O algoritmo de MST mais naturalmente paralelizável em GPUs e computação distribuída (MapReduce)</text>
`),

  'DSA-PATT-MST-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Minimax Path: Aresta Gargalo na Árvore Geradora Mínima</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Minimiza o Peso Máximo de Aresta entre Qualquer Par de Nós</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">O caminho único entre u e v dentro da MST minimiza a maior aresta ao longo do percurso.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Consulta de menor aresta gargalo respondida em O(log V) com Binary Lifting / LCA.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Aplicações em redes de telecomunicação para garantir largura de banda mínima de tráfego</text>
`),

  'DSA-PATT-MST-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Segunda Melhor MST (Second Best MST) em Tempo O(E log V)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Troca de 1 Aresta da MST Original</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Constrói a MST primária.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">2. Para cada aresta não utilizada (u, v): adiciona ao ciclo e remove a aresta mais pesada do caminho u-v.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Identifica o menor incremento de peso: weight(MST) + w(u, v) - max_edge(u, v) em O(E log V)</text>
`),

  // === bit-manipulation-patterns ===
  'DSA-PATT-BIT-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Operações Bitwise Fundamentais em Hardware (1 Ciclo de CPU)</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="120" height="65" fill="#1e293b" stroke="#3b82f6" rx="4"/>
    <text x="60" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">AND (&amp;)</text>
    <text x="60" y="42" fill="#f8fafc" font-size="10">1 &amp; 1 = 1</text>
    <text x="60" y="56" fill="#94a3b8" font-size="9">Máscara / Clear</text>

    <rect x="140" y="0" width="120" height="65" fill="#1e293b" stroke="#10b981" rx="4"/>
    <text x="200" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">OR (|)</text>
    <text x="200" y="42" fill="#f8fafc" font-size="10">0 | 1 = 1</text>
    <text x="200" y="56" fill="#94a3b8" font-size="9">Set Bit</text>

    <rect x="280" y="0" width="120" height="65" fill="#1e293b" stroke="#f59e0b" rx="4"/>
    <text x="340" y="22" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">XOR (^)</text>
    <text x="340" y="42" fill="#f8fafc" font-size="10">1 ^ 1 = 0</text>
    <text x="340" y="56" fill="#94a3b8" font-size="9">Toggle / Diff</text>

    <rect x="420" y="0" width="140" height="65" fill="#1e293b" stroke="#a855f7" rx="4"/>
    <text x="490" y="22" fill="#d8b4fe" font-size="11" font-weight="bold" text-anchor="middle">Shifting (&lt;&lt;, &gt;&gt;)</text>
    <text x="490" y="42" fill="#f8fafc" font-size="10">x &lt;&lt; 1 = x * 2</text>
    <text x="490" y="56" fill="#94a3b8" font-size="9">x &gt;&gt; 1 = x / 2</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Executadas diretamente pela ALU do processador em tempo O(1) de altíssima vazão</text>
`),

  'DSA-PATT-BIT-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Brian Kernighan's Algorithm: n &amp; (n - 1) para Contar Bits 1 (Popcount)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Elimina o Bit '1' Mais à Direita a Cada Passo</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Exemplo: n = 12 (1100₂) → n - 1 = 11 (1011₂) → n &amp; (n - 1) = 8 (1000₂).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">O loop executa estritamente a quantidade de bits '1' ativos no número: Tempo O(set_bits).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Muito mais rápido que iterar sobre todos os 32 ou 64 bits do inteiro</text>
`),

  'DSA-PATT-BIT-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Single Number: XOR Cumulativo para Cancelar Elementos Duplicados</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Propriedades: x ^ x = 0  e  x ^ 0 = x</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao acumular XOR sobre todo o array: (2 ^ 2) ^ (4 ^ 4) ^ 5 = 0 ^ 0 ^ 5 = 5.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Todos os elementos com número par de repetições anulam-se mutualmente a zero.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Tempo linear O(N) com espaço auxiliar O(1) absoluto (zero Hash Set)</text>
`),

  'DSA-PATT-BIT-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Subsets via Bitmask: Enumeração de 0 a 2ᴺ - 1 em O(N · 2ᴺ)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Cada Inteiro de 0 a 2ᴺ - 1 Mapeia 1 Subconjunto Único</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se o bit j da máscara (mask &amp; (1 &lt;&lt; j)) é 1: inclui o elemento nums[j] no subconjunto.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Iteração iterativa limpa sem pilha de recursão ou chamadas de função.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Ideal para gerar combinações e particionamentos de conjuntos de tamanho N ≤ 20</text>
`),

  'DSA-PATT-BIT-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Isolamento do Bit Menos Significativo Ativo (LSB): n &amp; (-n)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Complemento de Dois: -n = (~n) + 1</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Exemplo: n = 12 (01100₂) → -n = 11100₂ → n &amp; (-n) = 00100₂ = 4 (LSB isolado).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Operação central da Fenwick Tree (Binary Indexed Tree / BIT) para atualizações O(log N).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Isola a menor potência de 2 que compõe o número em 1 ciclo de instrução</text>
`),

  'DSA-PATT-BIT-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Swap de Duas Variáveis sem Memória Temporária via XOR</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="0" width="480" height="70" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="240" y="25" fill="#34d399" font-size="11" font-family="monospace" text-anchor="middle">a = a ^ b;   // a guarda a diferença bitwise</text>
    <text x="240" y="45" fill="#38bdf8" font-size="11" font-family="monospace" text-anchor="middle">b = a ^ b;   // (a ^ b) ^ b = a  (b recebe valor original de a)</text>
    <text x="240" y="65" fill="#f59e0b" font-size="11" font-family="monospace" text-anchor="middle">a = a ^ b;   // (a ^ b) ^ a = b  (a recebe valor original de b)</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" text-anchor="middle">Atenção: Se &amp;a == &amp;b (mesmo endereço de memória), o valor é zerado; use if (&amp;a != &amp;b)</text>
`)
};
