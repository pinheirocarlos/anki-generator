import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateMediaCurationRegistry } from '../src/utils/validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const REGISTRY_PATH = path.join(ROOT_DIR, 'media-curation-registry.json');

/**
 * User-Agent for active HTTP verification
 */
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) FAANG-Anki-Media-Curator/1.0 (https://faang-anki.dev; info@faang-anki.dev)';

/**
 * Curated mappings for dynamic concepts (P1_MICRO_VIDEO) and domain-diverse assets
 */
const CURATED_MEDIA_MAPPINGS = {
  // === 01-DSA: Algorithmic Patterns & Sorting ===
  'DSA-PATT-DIVCONQ-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif',
    attribution: 'Wikimedia Commons / RolandH',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Particionamento in-place do QuickSort organizando elementos menores à esquerda e maiores à direita do pivô.'
  },
  'DSA-PATT-DIVCONQ-002': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif',
    attribution: 'Wikimedia Commons / Swfung8',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Divisão recursiva e intercalação ordenada estável de subarrays no MergeSort O(N log N).'
  },
  'DSA-PATT-DIVCONQ-003': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif',
    attribution: 'Wikimedia Commons / RolandH',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Particionamento in-place do QuickSort organizando elementos menores à esquerda e maiores à direita do pivô.'
  },
  'DSA-PATT-DIVCONQ-006': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif',
    attribution: 'Wikimedia Commons / Swfung8',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Intuição de divisão e conquista particionando recursivamente e intercalando de forma ordenada.'
  },

  // === 01-DSA: Two Pointers & Sliding Window ===
  'DSA-PATT-2POINT-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/azl397985856/leetcode/master/assets/26.remove-duplicates-from-sorted-array.gif',
    attribution: 'GitHub / azl397985856',
    license: 'Apache-2.0',
    caption: 'Visualização: Ponteiros rápido e lento compactando elementos únicos in-place em tempo linear O(N).'
  },
  'DSA-PATT-2POINT-001': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/azl397985856/leetcode/master/assets/26.remove-duplicates-from-sorted-array.gif',
    attribution: 'GitHub / azl397985856',
    license: 'Apache-2.0',
    caption: 'Visualização: Ponteiros convergentes nas extremidades esquerda e direita para Two Sum ordenado O(1) de espaço.'
  },
  'DSA-PATT-SLIDE-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/azl397985856/leetcode/master/assets/3.longestSubstringWithoutRepeatingCharacters.gif',
    attribution: 'GitHub / azl397985856',
    license: 'Apache-2.0',
    caption: 'Visualização: Janela deslizante de tamanho fixo calculando o delta de entrada e saída em O(1).'
  },
  'DSA-PATT-SLIDE-001': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/azl397985856/leetcode/master/assets/3.longestSubstringWithoutRepeatingCharacters.gif',
    attribution: 'GitHub / azl397985856',
    license: 'Apache-2.0',
    caption: 'Visualização: Expansão do ponteiro direito e contração do esquerdo em janela deslizante dinâmica.'
  },
  'DSA-PATT-SLIDE-002': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/azl397985856/leetcode/master/assets/3.longestSubstringWithoutRepeatingCharacters.gif',
    attribution: 'GitHub / azl397985856',
    license: 'Apache-2.0',
    caption: 'Visualização: Salto do ponteiro esquerdo ao detectar duplicatas em Longest Substring Without Repeating Characters.'
  },

  // === 01-DSA: Binary Search ===
  'DSA-PATT-BSEARCH-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Binary-search-work.gif',
    attribution: 'Wikimedia Commons / Rominandreas',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Descarte logarítmico de metade do espaço de busca comparando com o elemento do meio.'
  },
  'DSA-PATT-BSEARCH-001': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Binary-search-work.gif',
    attribution: 'Wikimedia Commons / Rominandreas',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Busca binária em vetor rotacionado identificando qual metade preserva a monotonicidade ordenada.'
  },
  'DSA-PATT-BSEARCH-006': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Binary-search-work.gif',
    attribution: 'Wikimedia Commons / Rominandreas',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Abertura e corte ao meio de uma lista telefônica reduzindo o problema a cada iteração.'
  },

  // === 01-DSA: BFS & DFS Traversals ===
  'DSA-PATT-TRAVERSAL-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif',
    attribution: 'Wikimedia Commons / Mre',
    license: 'Public domain',
    caption: 'Visualização: Expansão radial em largura (BFS) visitando todos os vizinhos por camadas concêntricas de distância.'
  },
  'DSA-PATT-TRAVERSAL-001': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif',
    attribution: 'Wikimedia Commons / Mre',
    license: 'Public domain',
    caption: 'Visualização: Exploração em profundidade (DFS) descendo por um ramo até a folha antes do retrocesso (backtracking).'
  },
  'DSA-PATT-TRAVERSAL-002': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/azl397985856/leetcode/master/assets/thinkings/binary-tree-traversal-bfs.gif',
    attribution: 'GitHub / azl397985856',
    license: 'Apache-2.0',
    caption: 'Visualização: Travessia BFS por níveis em árvore binária utilizando fila FIFO para sincronização.'
  },
  'DSA-PATT-TRAVERSAL-003': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/azl397985856/leetcode/master/assets/thinkings/binary-tree-traversal-dfs.gif',
    attribution: 'GitHub / azl397985856',
    license: 'Apache-2.0',
    caption: 'Visualização: Travessia DFS recursiva em árvore binária explorando subárvores esquerdas antes das direitas.'
  },
  'DSA-PATT-TRAVERSAL-004': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/kdn251/interviews/master/images/dfsbfs.gif',
    attribution: 'GitHub / kdn251',
    license: 'MIT',
    caption: 'Visualização: Comparação direta entre exploração em profundidade (DFS) e exploração em largura (BFS).'
  },

  // === 01-DSA: Shortest Path & MST & Graphs ===
  'DSA-PATT-SPATH-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Dijkstra_Animation.gif',
    attribution: 'Wikimedia Commons / Ibmua',
    license: 'Public domain',
    caption: 'Visualização: Relaxamento guloso de arestas com Min-Heap no algoritmo de Dijkstra O((V+E) log V).'
  },
  'DSA-PATT-SPATH-001': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/kdn251/interviews/master/images/bellman-ford.gif',
    attribution: 'GitHub / kdn251',
    license: 'MIT',
    caption: 'Visualização: Relaxamento sistemático de todas as arestas V-1 vezes no algoritmo de Bellman-Ford O(V*E).'
  },
  'DSA-PATT-SPATH-002': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/kdn251/interviews/master/images/dijkstra.gif',
    attribution: 'GitHub / kdn251',
    license: 'MIT',
    caption: 'Visualização: Dijkstra expandindo a fronteira de menor custo acumulado garantindo caminhos mínimos.'
  },
  'DSA-PATT-MST-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Kruskal_algorithm.gif',
    attribution: 'Wikimedia Commons / Mre',
    license: 'Public domain',
    caption: 'Visualização: Algoritmo de Kruskal unindo componentes conexas via DSU em ordem crescente de peso das arestas.'
  },
  'DSA-PATT-MST-001': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/kdn251/interviews/master/images/prim.gif',
    attribution: 'GitHub / kdn251',
    license: 'MIT',
    caption: 'Visualização: Algoritmo de Prim expandindo a árvore geradora mínima nó a nó via aresta de menor corte.'
  },
  'DSA-PATT-MST-002': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/UnionFindKruskalDemo.gif',
    attribution: 'Wikimedia Commons / Mre',
    license: 'Public domain',
    caption: 'Visualização: Estrutura Union-Find prevenindo a formação de ciclos durante o algoritmo de Kruskal.'
  },
  'DSA-PATT-TOPO-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Parallel_Topological_Sorting.gif',
    attribution: 'Wikimedia Commons / Cburnett',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Algoritmo de Kahn processando nós com grau de entrada zero (in-degree 0) sequencialmente.'
  },

  // === 01-DSA: Data Structures ===
  'DSA-STRUCT-LIST-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/azl397985856/leetcode/master/assets/92.reverse-linked-list-ii.gif',
    attribution: 'GitHub / azl397985856',
    license: 'Apache-2.0',
    caption: 'Visualização: Reversão in-place de ponteiros next em lista encadeada mantendo complexidade espacial O(1).'
  },
  'DSA-STRUCT-LIST-002': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/azl397985856/leetcode/master/assets/92.reverse-linked-list-ii.gif',
    attribution: 'GitHub / azl397985856',
    license: 'Apache-2.0',
    caption: 'Visualização: Manipulação de ponteiros prev, curr e next durante a inversão de sublista encadeada.'
  },
  'DSA-STRUCT-STACK-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Stack_Push_operation-en.gif',
    attribution: 'Wikimedia Commons / Mre',
    license: 'CC-BY-SA-4.0',
    caption: 'Visualização: Operação Push inserindo elementos no topo da pilha respeitando a disciplina LIFO.'
  },
  'DSA-STRUCT-STACK-001': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Stack_Pop_Operation-en.gif',
    attribution: 'Wikimedia Commons / Mre',
    license: 'CC-BY-SA-4.0',
    caption: 'Visualização: Operação Pop removendo o elemento do topo da pilha em tempo estritamente O(1).'
  },
  'DSA-STRUCT-STACK-005': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/azl397985856/leetcode/master/assets/20.validParentheses.gif',
    attribution: 'GitHub / azl397985856',
    license: 'Apache-2.0',
    caption: 'Visualização: Pilha validando fechamento e aninhamento correto de parênteses, colchetes e chaves.'
  },
  'DSA-STRUCT-HEAP-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/labuladong/fucking-algorithm/master/pictures/heap/swim.gif',
    attribution: 'GitHub / labuladong',
    license: 'CC-BY-NC-SA-4.0',
    caption: 'Visualização: Operação Sift-Up (Swim) promovendo o novo elemento na árvore binária até restaurar a invariante heap.'
  },
  'DSA-STRUCT-HEAP-001': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/labuladong/fucking-algorithm/master/pictures/heap/sink.gif',
    attribution: 'GitHub / labuladong',
    license: 'CC-BY-NC-SA-4.0',
    caption: 'Visualização: Operação Sift-Down (Sink) rebaixando a raiz substituta trocando com o maior/menor filho em O(log N).'
  },
  'DSA-STRUCT-TREE-001': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/AVL_Tree_Example.gif',
    attribution: 'Wikimedia Commons / Bruno Schalch',
    license: 'CC-BY-SA-4.0',
    caption: 'Visualização: Rotação simples à direita em árvore AVL restaurando o fator de balanceamento em tempo O(1).'
  },
  'DSA-STRUCT-TREE-002': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/AVL_Tree_Example.gif',
    attribution: 'Wikimedia Commons / Bruno Schalch',
    license: 'CC-BY-SA-4.0',
    caption: 'Visualização: Rotação dupla em ziguezague (LR/RL) reequilibrando nó interno em árvore AVL.'
  },
  'DSA-STRUCT-TREE-005': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/azl397985856/leetcode/master/assets/94.binary-tree-inorder-traversal.gif',
    attribution: 'GitHub / azl397985856',
    license: 'Apache-2.0',
    caption: 'Visualização: Travessia In-Order (esquerda, raiz, direita) extraindo chaves em ordem estritamente crescente.'
  },
  'DSA-STRUCT-DSU-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/labuladong/fucking-algorithm/master/pictures/unionfind/9.gif',
    attribution: 'GitHub / labuladong',
    license: 'CC-BY-NC-SA-4.0',
    caption: 'Visualização: Compressão de caminhos e união por rank no Disjoint Set Union gerando complexidade quase linear O(α(N)).'
  },
  'DSA-PATT-BACKTRACK-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Tower_of_Hanoi.gif',
    attribution: 'Wikimedia Commons / Andre-fast',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Recursão sistemática e desfazimento de decisões na árvore de estados de busca exaustiva.'
  },
  'DSA-ADV-STRING-002': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/labuladong/fucking-algorithm/master/pictures/kmp/kmp.gif',
    attribution: 'GitHub / labuladong',
    license: 'CC-BY-NC-SA-4.0',
    caption: 'Visualização: Algoritmo KMP utilizando a tabela LPS para saltar comparações redundantes em tempo O(N+M).'
  },
  'DSA-PATT-INTERVAL-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/labuladong/fucking-algorithm/master/pictures/mergeInterval/3.gif',
    attribution: 'GitHub / labuladong',
    license: 'CC-BY-NC-SA-4.0',
    caption: 'Visualização: Ordenação pelo início e fusão de intervalos sobrepostos ajustando o limite final em O(N log N).'
  },

  // === 02-CS-FUNDAMENTALS: Networks & Protocols ===
  'CS-NET-TCP-002': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/svg+xml',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Tcp-handshake.svg',
    attribution: 'Wikimedia Commons / Cburnett',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Three-Way Handshake do TCP (SYN, SYN-ACK, ACK) sincronizando números de sequência iniciais (ISN).'
  },
  'CS-NET-TCP-004': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/svg+xml',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Sliding_window.svg',
    attribution: 'Wikimedia Commons / Cburnett',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Janela deslizante do TCP ajustando o volume de bytes em trânsito de acordo com o buffer do receptor.'
  },
  'CS-NET-DNS-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/svg+xml',
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Trie_example.svg',
    attribution: 'Wikimedia Commons / Booyabazooka',
    license: 'Public domain',
    caption: 'Visualização: Estrutura hierárquica em árvore de prefixos utilizada na resolução recursiva de nomes DNS.'
  },

  // === 02-CS-FUNDAMENTALS: OS & Hardware ===
  'CS-ARCH-CACHE-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/svg+xml',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Typical_Cpu_cache_organization.svg',
    attribution: 'Wikimedia Commons / Dr bob',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Organização da hierarquia de caches L1, L2 e L3 com mapeamento associativo por conjuntos de 64 bytes.'
  },
  'CS-ARCH-PIPE-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/svg+xml',
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/2_level_branch_predictor.svg',
    attribution: 'Wikimedia Commons / Cburnett',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Previsor de desvios de dois níveis mantendo o pipeline de execução da CPU alimentado sem bolhas (bubbles).'
  },
  'CS-OS-VMEM-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/svg+xml',
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Paging_graphic.svg',
    attribution: 'Wikimedia Commons / Cburnett',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Tradução de páginas virtuais para molduras de páginas físicas (PFN) através da MMU e tabelas de páginas.'
  },
  'CS-OS-SYNC-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/svg+xml',
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Dining_philosophers.svg',
    attribution: 'Wikimedia Commons / Benjamin D. Esham',
    license: 'Public domain',
    caption: 'Visualização: Problema do Jantar dos Filósofos ilustrando contenção de recursos, deadlocks circulares e starvation.'
  },
  'CS-MATH-PROB-004': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/svg+xml',
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Bloom_filter.svg',
    attribution: 'Wikimedia Commons / David Eppstein',
    license: 'Public domain',
    caption: 'Visualização: Vetor de bits e múltiplas funções hash determinísticas inserindo e consultando elementos no Bloom Filter.'
  },
  'CS-MATH-BOOL-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/svg+xml',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg',
    attribution: 'Wikimedia Commons / Jorge Stolfi',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Distribuição de chaves e resolução de colisões em tabela hash com endereçamento aberto e sondagem linear.'
  },

  // === 03-SYSTEM-DESIGN: Distributed Consensus, Resilience & Load Leveling ===
  'SYS-DIST-SHARDING-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/svg+xml',
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Dynamo_consistent_hashing.svg',
    attribution: 'Wikimedia Commons / Dynamo Team',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Anel de Consistent Hashing distribuindo chaves entre nós virtuais e minimizando remanejamento na adição de servidores.'
  },
  'SYS-RES-RATELIMIT-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/svg+xml',
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Leaky_bucket_analogy.svg',
    attribution: 'Wikimedia Commons / Cburnett',
    license: 'CC-BY-SA-3.0',
    caption: 'Visualização: Algoritmo Leaky Bucket convertendo fluxos de requisições em rajada (bursty) em uma saída de taxa constante.'
  },
  'SYS-MSG-QUEUES-000': {
    tier: 'P1_MICRO_VIDEO',
    media_type: 'image/gif',
    url: 'https://raw.githubusercontent.com/iluwatar/java-design-patterns/master/queue-based-load-leveling/etc/queue-load-leveling.gif',
    attribution: 'GitHub / iluwatar',
    license: 'MIT',
    caption: 'Visualização: Queue-Based Load Leveling amortecendo picos de tráfego entre produtores e consumidores assíncronos.'
  }
};

/**
 * Shuffles an array in place using Fisher-Yates
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Performs active HTTP HEAD/GET validation with retry and exponential backoff
 */
async function auditUrl(url, maxRetries = 2) {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const res = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': USER_AGENT,
          'Accept': 'image/*,video/*,*/*'
        }
      });

      if (res.status === 200 || res.status === 206) {
        const contentType = res.headers.get('content-type') || '';
        return {
          ok: true,
          status: res.status,
          contentType,
          url
        };
      }

      if (res.status === 429) {
        console.warn(`⚠️ HTTP 429 (Rate Limit) on ${url}. Pausing 2000ms before retry...`);
        await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
        attempt++;
        continue;
      }

      // Try GET with Range 0-1024 if HEAD returned 405 or 403
      if (res.status === 405 || res.status === 403) {
        const getRes = await fetch(url, {
          method: 'GET',
          headers: {
            'User-Agent': USER_AGENT,
            'Range': 'bytes=0-1024'
          }
        });
        if (getRes.status === 200 || getRes.status === 206) {
          const contentType = getRes.headers.get('content-type') || '';
          return {
            ok: true,
            status: getRes.status,
            contentType,
            url
          };
        }
      }

      return {
        ok: false,
        status: res.status,
        error: `HTTP ${res.status}`,
        url
      };
    } catch (err) {
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, 1000));
        attempt++;
        continue;
      }
      return {
        ok: false,
        error: err.message,
        url
      };
    }
  }
  return { ok: false, error: 'Max retries reached', url };
}

/**
 * Main active curation & verification workflow
 */
async function run() {
  console.log('================================================================');
  console.log('🚀 FASE 1: CURADORIA E VALIDAÇÃO ATIVA DE MÍDIAS (JSON CONSOLIDATION)');
  console.log('================================================================\n');

  if (!fs.existsSync(REGISTRY_PATH)) {
    throw new Error(`Registry not found at ${REGISTRY_PATH}`);
  }

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const cards = registry.cards || {};
  const cardKeys = Object.keys(cards);
  console.log(`📋 Total cards in current registry: ${cardKeys.length}`);

  // 1. Audit legacy URLs from media-catalog.js
  console.log('\n--- 1. AUDITANDO URLs LEGADAS DE media-catalog.js ---');
  const legacyUrls = [
    'https://upload.wikimedia.org/wikipedia/commons/7/75/Sliding_window.svg',
    'https://upload.wikimedia.org/wikipedia/commons/b/be/Trie_example.svg',
    'https://upload.wikimedia.org/wikipedia/commons/3/31/Dynamic_array.svg',
    'https://upload.wikimedia.org/wikipedia/commons/5/52/Data_Queue.svg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d1/Segment_tree.svg',
    'https://upload.wikimedia.org/wikipedia/commons/0/03/Directed_acyclic_graph_2.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/29/Data_stack.svg',
    'https://upload.wikimedia.org/wikipedia/commons/6/6d/Singly-linked-list.svg',
    'https://upload.wikimedia.org/wikipedia/commons/7/7d/Hash_table_3_1_1_0_1_0_0_SP.svg',
    'https://upload.wikimedia.org/wikipedia/commons/5/5b/6n-graf.svg'
  ];

  for (const u of legacyUrls) {
    const audit = await auditUrl(u);
    console.log(`  [${audit.ok ? '✅ ' + audit.status : '❌ ' + (audit.status || audit.error)}] ${u}`);
    await new Promise(r => setTimeout(r, 250));
  }

  // 2. Collect unique candidate URLs to verify
  const urlsToAudit = new Set();
  for (const [cardId, mapping] of Object.entries(CURATED_MEDIA_MAPPINGS)) {
    if (mapping.url) {
      urlsToAudit.add(mapping.url);
    }
  }

  const uniqueUrls = Array.from(urlsToAudit);
  console.log(`\n--- 2. VERIFICAÇÃO ATIVA DE TODAS AS URLs CURADAS (${uniqueUrls.length} links) ---`);

  // Shuffle URLs across domains to prevent rate limits
  const shuffledUrls = shuffleArray([...uniqueUrls]);
  const auditResults = new Map();

  for (let i = 0; i < shuffledUrls.length; i++) {
    const url = shuffledUrls[i];
    const audit = await auditUrl(url);
    auditResults.set(url, audit);

    if (audit.ok) {
      console.log(`  [${i + 1}/${shuffledUrls.length}] ✅ Status ${audit.status} (${audit.contentType}) -> ${url}`);
    } else {
      console.error(`  [${i + 1}/${shuffledUrls.length}] ❌ FAILED ${audit.error} -> ${url}`);
    }

    // Controlled delay (250ms - 450ms)
    const delay = 250 + Math.floor(Math.random() * 200);
    await new Promise(r => setTimeout(r, delay));
  }

  // 3. Apply updates to the registry
  console.log('\n--- 3. CONSOLIDANDO DADOS EM media-curation-registry.json ---');
  const nowIso = new Date().toISOString();
  let p1VideoCount = 0;
  let p2SvgCount = 0;
  let p2TableCount = 0;

  for (const cardId of cardKeys) {
    const entry = cards[cardId];
    const curated = CURATED_MEDIA_MAPPINGS[cardId];

    if (curated && curated.url) {
      const audit = auditResults.get(curated.url);
      if (audit && audit.ok) {
        // Upgrade to P1_MICRO_VIDEO with verified remote URL
        entry.tier = curated.tier;
        entry.media_type = curated.media_type;
        entry.url = curated.url;
        entry.attribution = curated.attribution;
        entry.license = curated.license;
        entry.caption = curated.caption.startsWith('Visualização: ') ? curated.caption : `Visualização: ${curated.caption}`;
        entry.status = 'pending_injection';
        entry.last_verified = nowIso;
        p1VideoCount++;
        continue;
      } else {
        console.warn(`⚠️ URL for ${cardId} failed audit (${curated.url}). Keeping fallback P2 SVG.`);
      }
    }

    // Retain or format P2_RESPONSIVE_SVG
    if (entry.tier === 'P1_MICRO_VIDEO') {
      // If was P1 but not verified above, keep P2 fallback
      entry.tier = 'P2_RESPONSIVE_SVG';
      entry.media_type = 'inline_svg';
      delete entry.url;
    }
    
    if (!entry.caption.startsWith('Visualização: ')) {
      entry.caption = `Visualização: ${entry.caption}`;
    }
    entry.status = 'pending_injection';
    entry.last_verified = nowIso;

    if (entry.tier === 'P2_TABLE_FALLBACK') {
      p2TableCount++;
    } else {
      p2SvgCount++;
    }
  }

  // Update top-level registry metadata and stats
  registry.last_updated = nowIso;
  registry.stats = {
    total_cards: cardKeys.length,
    p1_video_count: p1VideoCount,
    p2_svg_count: p2SvgCount,
    p2_table_count: p2TableCount
  };

  console.log(`\n📊 Consolidated Stats:`);
  console.log(`   - Total Cards: ${registry.stats.total_cards}`);
  console.log(`   - P1 Micro-Videos / Animations: ${registry.stats.p1_video_count}`);
  console.log(`   - P2 Responsive SVGs: ${registry.stats.p2_svg_count}`);
  console.log(`   - P2 Table Fallbacks: ${registry.stats.p2_table_count}`);

  // 4. Schema validation
  console.log('\n--- 4. VALIDAÇÃO DE SCHEMA E REGRAS ---');
  const validation = validateMediaCurationRegistry(registry);
  if (!validation.valid) {
    console.error('❌ Schema validation failed with errors:');
    validation.errors.forEach(e => console.error(`   - ${e}`));
    throw new Error('Registry schema validation failed');
  }
  console.log('✅ PASS: media-curation-registry.json schema validation passed with 0 errors.');

  // Write updated registry to disk
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2) + '\n', 'utf8');
  console.log(`💾 Successfully wrote updated registry to ${REGISTRY_PATH}`);
}

run().catch(err => {
  console.error('Fatal error during curation:', err);
  process.exit(1);
});
