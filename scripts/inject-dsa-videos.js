import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateCard } from '../src/utils/validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const DSA_DIR = path.join(ROOT_DIR, 'decks', '01-dsa');

/**
 * Complete media mapping dictionary for all 180 DSA cards
 */
export const DSA_CARD_MEDIA_MAP = {
  // === arrays-strings ===
  'DSA-STRUCT-ARRAY-000': {
    fallbackText: 'Acesso indexado O(1) calculando endereço de memória física base + i * size.'
  },
  'DSA-STRUCT-ARRAY-001': {
    fallbackText: 'Duplicação geométrica da capacidade (2x) e redistribuição de créditos amortizados O(1).'
  },
  'DSA-STRUCT-ARRAY-002': {
    fallbackText: 'Alocação de novo buffer contíguo de tamanho duplicado e cópia em bloco dos elementos.'
  },
  'DSA-STRUCT-ARRAY-003': {
    fallbackText: 'Carregamento de linha de cache de 64 bytes com múltiplos elementos adjacentes eliminando cache misses.'
  },
  'DSA-STRUCT-ARRAY-004': {
    fallbackText: 'Mutação in-place em buffer de char ajustável evitando alocações e cópias O(N²).'
  },
  'DSA-STRUCT-ARRAY-005': {
    fallbackText: 'Avanço modular dos ponteiros head e tail com máscara bitwise (i & (N-1)) sobre array contíguo.'
  },

  // === linked-lists ===
  'DSA-STRUCT-LIST-000': {
    fallbackText: 'Travessia sequencial de ponteiros next em blocos não-contíguos na memória heap.'
  },
  'DSA-STRUCT-LIST-001': {
    fallbackText: 'Nós sentinelas eliminam verificações de ponteiro nulo nas extremidades da lista duplamente encadeada.'
  },
  'DSA-STRUCT-LIST-002': {
    fallbackText: 'Troca local de ponteiros prev e next em tempo O(1) sem deslocamento de elementos.'
  },
  'DSA-STRUCT-LIST-003': {
    fallbackText: 'Dispersão espacial de nós na memória heap gerando saltos e cache misses sucessivos na CPU.'
  },
  'DSA-STRUCT-LIST-004': {
    fallbackText: 'Hash Map mapeia chaves diretamente para nós da lista duplamente ligada para remoção e inserção O(1) na cabeça.'
  },
  'DSA-STRUCT-LIST-005': {
    fallbackText: 'Saltos rápidos através de faixas expressas multinível alcançando complexidade média de busca O(log N).'
  },

  // === stacks-queues ===
  'DSA-STRUCT-STACK-000': {
    fallbackText: 'Comparação visual de disciplinas de acesso: topo da pilha (LIFO) vs início e fim da fila (FIFO).'
  },
  'DSA-STRUCT-STACK-001': {
    fallbackText: 'Pilha auxiliar rastreia o valor mínimo corrente empilhado sincronizadamente com a pilha principal.'
  },
  'DSA-STRUCT-STACK-002': {
    fallbackText: 'Inserções e remoções em O(1) em ambas as extremidades (front e rear) de um Deque.'
  },
  'DSA-STRUCT-STACK-003': {
    fallbackText: 'Empilhamento de stack frames na execução de funções vs enfileiramento assíncrono de jobs.'
  },
  'DSA-STRUCT-STACK-004': {
    fallbackText: 'Transferência em lote de stack_in para stack_out invertendo a ordem para consumo FIFO O(1) amortizado.'
  },
  'DSA-STRUCT-STACK-005': {
    fallbackText: 'Desempilhamento de elementos menores ao encontrar um elemento maior, mantendo a monotonicidade decrescente.'
  },

  // === hash-tables ===
  'DSA-STRUCT-HASH-000': {
    fallbackText: 'Cálculo da função hash determinística e mapeamento de chave para índice do array via hash(key) % N.'
  },
  'DSA-STRUCT-HASH-001': {
    fallbackText: 'Listas encadeadas em buckets colidentes vs sondagem linear direta em slots livres adjacentes.'
  },
  'DSA-STRUCT-HASH-002': {
    fallbackText: 'Disparo de redimensionamento ao atingir fator de carga alpha >= 0.75 com alocação de nova tabela 2x e re-hash.'
  },
  'DSA-STRUCT-HASH-003': {
    fallbackText: 'Adição de nós na lista encadeada do bucket na ocorrência de colisão com travessia linear local.'
  },
  'DSA-STRUCT-HASH-004': {
    fallbackText: 'Comparação paralela de 16 bytes de controle (H2) em um único ciclo de instrução SIMD.'
  },
  'DSA-STRUCT-HASH-005': {
    fallbackText: 'Remoção do nó menos recentemente usado (LRU) na cauda e movimentação para a cabeça no acesso em O(1).'
  },

  // === trees-bst ===
  'DSA-STRUCT-TREE-000': {
    fallbackText: 'Divisão hierárquica por níveis k com até 2^k nós e capacidade máxima 2^(H+1)-1.'
  },
  'DSA-STRUCT-TREE-001': {
    fallbackText: 'Rotação simples à direita O(1) reequilibrando a altura para O(log N) preservando a invariante BST.'
  },
  'DSA-STRUCT-TREE-002': {
    fallbackText: 'Invariante de busca binária: todos os nós na subárvore esquerda são menores e na direita são maiores que a raiz.'
  },
  'DSA-STRUCT-TREE-003': {
    fallbackText: 'Visita recursiva esquerda -> raiz -> direita produzindo a sequência estritamente ordenada dos elementos.'
  },
  'DSA-STRUCT-TREE-004': {
    fallbackText: 'AVL com balanceamento rígido (delta h <= 1) vs Red-Black com no máximo 3 rotações por inserção.'
  },
  'DSA-STRUCT-TREE-005': {
    fallbackText: 'Degeneração de BST desbalanceada em lista linear O(N) em inserções sequenciais e correção auto-balanceada.'
  },

  // === advanced-trees ===
  'DSA-STRUCT-ADVTREE-000': {
    fallbackText: 'Atualização pontual forçando recálculo de todo o vetor de prefixos em tempo O(N).'
  },
  'DSA-STRUCT-ADVTREE-001': {
    fallbackText: 'Armazenamento do delta pendente no nó ancestral com propagação sob demanda aos filhos em O(log N).'
  },
  'DSA-STRUCT-ADVTREE-002': {
    fallbackText: 'Decomposição do intervalo [L, R] em no máximo 2 log N nós canônicos da árvore.'
  },
  'DSA-STRUCT-ADVTREE-003': {
    fallbackText: 'Navegação por saltos de índices usando isolamento do bit menos significativo i & (-i).'
  },
  'DSA-STRUCT-ADVTREE-004': {
    fallbackText: 'Atualização em grade 2D navegando bits nos eixos X e Y em tempo O(log N * log M).'
  },
  'DSA-STRUCT-ADVTREE-005': {
    fallbackText: 'Manutenção de BST nas chaves e Max-Heap nas prioridades aleatórias com rotações locais O(1).'
  },

  // === trie-prefix-tree ===
  'DSA-STRUCT-TRIE-000': {
    fallbackText: 'Compartilhamento de nós de prefixos comuns entre palavras reduzindo redundância estrutural.'
  },
  'DSA-STRUCT-TRIE-001': {
    fallbackText: 'Fusão de nós unários consecutivos em uma única aresta de string comprimida.'
  },
  'DSA-STRUCT-TRIE-002': {
    fallbackText: 'Descida caractere a caractere na árvore de ponteiros em tempo estritamente linear ao tamanho L.'
  },
  'DSA-STRUCT-TRIE-003': {
    fallbackText: 'Navegação até o nó do prefixo seguida de exploração DFS da subárvore coletando palavras válidas.'
  },
  'DSA-STRUCT-TRIE-004': {
    fallbackText: 'Escolha gulosa do bit oposto (1 vs 0) a cada nível da trie binária de 32 bits maximizando o XOR.'
  },
  'DSA-STRUCT-TRIE-005': {
    fallbackText: 'Array fixo de 26 ponteiros para velocidade direta vs Hash Map para economia em alfabetos esparsos.'
  },

  // === heaps-priority-queues ===
  'DSA-STRUCT-HEAP-000': {
    fallbackText: 'Invariante de Heap: o nó pai é sempre menor ou igual (Min-Heap) a todos os seus filhos.'
  },
  'DSA-STRUCT-HEAP-001': {
    fallbackText: 'Sift-down executado de floor(N/2) até a raiz resultando em somatório convergente O(N).'
  },
  'DSA-STRUCT-HEAP-002': {
    fallbackText: 'Mapeamento em array 0-indexado: pai (i-1)/2, filho esquerdo 2i+1 e filho direito 2i+2 sem ponteiros.'
  },
  'DSA-STRUCT-HEAP-003': {
    fallbackText: 'Substituição da raiz pelo último elemento seguida de sift-down restabelecendo o heap em O(log N).'
  },
  'DSA-STRUCT-HEAP-004': {
    fallbackText: 'Manutenção de Min-Heap de tamanho K onde elementos menores são descartados na raiz em tempo O(N log K).'
  },
  'DSA-STRUCT-HEAP-005': {
    fallbackText: 'Balanceamento entre Max-Heap (metade inferior) e Min-Heap (metade superior) fornecendo a mediana em O(1).'
  },

  // === disjoint-set-union ===
  'DSA-STRUCT-DSU-000': {
    fallbackText: 'Floresta de árvores onde cada nó aponta para seu pai até a raiz representativa do conjunto.'
  },
  'DSA-STRUCT-DSU-001': {
    fallbackText: 'Achatamento da árvore de apontadores diretamente para a raiz na chamada de find() reduzindo a altura para quase 1.'
  },
  'DSA-STRUCT-DSU-002': {
    fallbackText: 'Travessia recursiva de ponteiros parent[x] localizando o líder do componente conexo.'
  },
  'DSA-STRUCT-DSU-003': {
    fallbackText: 'Conexão da raiz da árvore mais rasa à raiz da árvore mais profunda preservando o rank mínimo.'
  },
  'DSA-STRUCT-DSU-004': {
    fallbackText: 'Detecção imediata de ciclo ao tentar unir dois vértices que já compartilham a mesma raiz (find(u) == find(v)).'
  },
  'DSA-STRUCT-DSU-005': {
    fallbackText: 'Processamento guloso de arestas ordenadas adicionando à MST apenas arestas que não formam ciclos via DSU.'
  },

  // === graphs-representations ===
  'DSA-STRUCT-GRAPH-000': {
    fallbackText: 'Representação de vértices e arestas direcionadas, bidirecionadas e ponderadas com pesos.'
  },
  'DSA-STRUCT-GRAPH-001': {
    fallbackText: 'Matriz O(V²) para grafos densos (E ≈ V²) vs Lista O(V+E) para grafos esparsos do mundo real.'
  },
  'DSA-STRUCT-GRAPH-002': {
    fallbackText: 'Verificação instantânea de adjacência em O(1) indexando a célula bidimensional matrix[u][v].'
  },
  'DSA-STRUCT-GRAPH-003': {
    fallbackText: 'Array de listas encadeadas contendo apenas vizinhos reais com travessia de adjacentes sem escanear V colunas.'
  },
  'DSA-STRUCT-GRAPH-004': {
    fallbackText: 'Três vetores contíguos (values, column_indices, row_offsets) compactando o grafo sem overhead de ponteiros.'
  },
  'DSA-STRUCT-GRAPH-005': {
    fallbackText: 'Comparativo de travessia: O(V+E) com lista de adjacência vs O(V²) obrigatório com matriz.'
  },

  // === two-pointers ===
  'DSA-PATT-2POINT-000': {
    fallbackText: 'Ponteiros left e right convergindo em direção ao centro com avanço condicional pela soma.'
  },
  'DSA-PATT-2POINT-001': {
    fallbackText: 'Movimentação da barra mais baixa garantindo que nenhuma área maior seja descartada.'
  },
  'DSA-PATT-2POINT-002': {
    fallbackText: 'Ponteiro rápido (2x) e lento (1x) reduzindo a distância relativa no ciclo a cada passo até o encontro.'
  },
  'DSA-PATT-2POINT-003': {
    fallbackText: 'Ponteiro de leitura e ponteiro de escrita reescrevendo o vetor in-place sem alocação auxiliar.'
  },
  'DSA-PATT-2POINT-004': {
    fallbackText: 'Fixação do primeiro elemento e busca com two pointers nos restantes com avanço em duplicatas adjacentes.'
  },
  'DSA-PATT-2POINT-005': {
    fallbackText: 'Reinício de um ponteiro na cabeça e avanço sincronizado a 1x encontrando o nó exato de entrada do ciclo.'
  },

  // === sliding-window ===
  'DSA-PATT-SLIDE-000': {
    fallbackText: 'Janela deslizante de tamanho K adicionando elemento à direita e removendo à esquerda com atualização delta O(1).'
  },
  'DSA-PATT-SLIDE-001': {
    fallbackText: 'Laço externo expande ponteiro direito; laço interno contrai ponteiro esquerdo enquanto a condição for inválida.'
  },
  'DSA-PATT-SLIDE-002': {
    fallbackText: 'Janela de amplitude constante K avançando a cada iteração mantendo o acumulador máximo.'
  },
  'DSA-PATT-SLIDE-003': {
    fallbackText: 'Ajuste elástico da janela mantendo a invariante válida do problema com custo total 2N -> O(N).'
  },
  'DSA-PATT-SLIDE-004': {
    fallbackText: 'Salto direto do ponteiro left para lastIndex + 1 ao encontrar caractere duplicado no Hash Map.'
  },
  'DSA-PATT-SLIDE-005': {
    fallbackText: 'Rastreamento do contador matched e contração da janela buscando o comprimento mínimo com todos os caracteres.'
  },

  // === binary-search ===
  'DSA-PATT-BSEARCH-000': {
    fallbackText: 'Cálculo do ponto médio M = L + (R-L)/2 e descarte imediato da metade do espaço de busca a cada iteração.'
  },
  'DSA-PATT-BSEARCH-001': {
    fallbackText: 'Uso da fórmula segura L + (R-L)/2 evitando estouro de 2^31 - 1 na soma (L+R).'
  },
  'DSA-PATT-BSEARCH-002': {
    fallbackText: 'Localização da primeira ocorrência (Bisect Left) vs última ocorrência (Bisect Right) em arrays com duplicatas.'
  },
  'DSA-PATT-BSEARCH-003': {
    fallbackText: 'Busca binária sobre valores de resposta aplicando predicado de viabilidade booleano feasible(x).'
  },
  'DSA-PATT-BSEARCH-004': {
    fallbackText: 'Identificação da metade estritamente ordenada e verificação se o alvo reside nela antes de descartar.'
  },
  'DSA-PATT-BSEARCH-005': {
    fallbackText: 'Invariante de laço: low <= high para busca exata vs low < high para convergência em ponto único.'
  },

  // === bfs-dfs-traversals ===
  'DSA-PATT-TRAVERSAL-000': {
    fallbackText: 'Expansão da fronteira de busca nível por nível em anéis concêntricos usando fila FIFO.'
  },
  'DSA-PATT-TRAVERSAL-001': {
    fallbackText: 'Descida contínua pelo ramo mais profundo até o nó folha antes de retroceder e visitar irmãos.'
  },
  'DSA-PATT-TRAVERSAL-002': {
    fallbackText: 'Primeira visita a um nó no BFS corresponde estritamente à distância mínima em número de arestas.'
  },
  'DSA-PATT-TRAVERSAL-003': {
    fallbackText: 'Marcação tri-color (Branco=Não visitado, Cinza=Na pilha de recursão, Preto=Concluído) detectando back-edges.'
  },
  'DSA-PATT-TRAVERSAL-004': {
    fallbackText: 'Propagação em matriz 2D em 4 direções marcando células conectadas para contagem de componentes.'
  },
  'DSA-PATT-TRAVERSAL-005': {
    fallbackText: 'DFS com limite incremental de profundidade combinando a economia de memória do DFS com a otimalidade do BFS.'
  },

  // === backtracking ===
  'DSA-PATT-BACKTRACK-000': {
    fallbackText: 'Exploração de escolhas candidatas na árvore de decisão com retrocesso imediato ao violar restrições.'
  },
  'DSA-PATT-BACKTRACK-001': {
    fallbackText: 'Corte antecipado de ramos inviáveis evitando explosão combinatória desnecessária.'
  },
  'DSA-PATT-BACKTRACK-002': {
    fallbackText: 'Padrão canônico: aplicar modificação de estado antes da recursão e reverter pontualmente após o retorno.'
  },
  'DSA-PATT-BACKTRACK-003': {
    fallbackText: 'Rastreamento de colunas e diagonais ocupadas usando máscaras binárias e avanço por linhas.'
  },
  'DSA-PATT-BACKTRACK-004': {
    fallbackText: 'Tentativa de dígitos de 1 a 9 com validação em linha, coluna e bloco 3x3 com backtracking nas falhas.'
  },
  'DSA-PATT-BACKTRACK-005': {
    fallbackText: 'Ordenação prévia e salto de elementos iguais consecutivos na árvore combinatória.'
  },

  // === topological-sort ===
  'DSA-PATT-TOPO-000': {
    fallbackText: 'Linearização dos vértices de um grafo acíclico garantindo que toda aresta (u -> v) tenha u antes de v.'
  },
  'DSA-PATT-TOPO-001': {
    fallbackText: 'Enfileiramento de nós com grau de entrada 0 e decremento dos vizinhos até esvaziar o grafo.'
  },
  'DSA-PATT-TOPO-002': {
    fallbackText: 'Sequenciamento de pacotes e tarefas respeitando restrições estritas de dependências upstream.'
  },
  'DSA-PATT-TOPO-003': {
    fallbackText: 'Bloqueio do algoritmo de Kahn com nós restantes de in-degree > 0 provando a presença de ciclos.'
  },
  'DSA-PATT-TOPO-004': {
    fallbackText: 'Empilhamento de nós no final da visitação DFS e desempilhamento para gerar a ordem topológica reversa.'
  },
  'DSA-PATT-TOPO-005': {
    fallbackText: 'Verificação de viabilidade curricular contando vértices processados contra total de disciplinas V.'
  },

  // === shortest-path-algorithms ===
  'DSA-PATT-SPATH-000': {
    fallbackText: 'Seleção do nó com menor distância na Fila de Prioridade e relaxamento de todas as arestas adjacentes.'
  },
  'DSA-PATT-SPATH-001': {
    fallbackText: 'Extração de V nós e atualização de até E arestas resultando em complexidade O((V+E) log V).'
  },
  'DSA-PATT-SPATH-002': {
    fallbackText: 'Reconstrução do caminho ótimo partindo do destino até a origem usando o vetor parent[v].'
  },
  'DSA-PATT-SPATH-003': {
    fallbackText: 'A premissa gulosa de que a menor distância já finalizada é imutável quebra na presença de pesos negativos.'
  },
  'DSA-PATT-SPATH-004': {
    fallbackText: 'Relaxamento de todas as E arestas V-1 vezes com V-ésima passada detectando ciclos de custo negativo.'
  },
  'DSA-PATT-SPATH-005': {
    fallbackText: 'Programação dinâmica tridimensional atualizando matriz de adjacência dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).'
  },

  // === minimum-spanning-tree ===
  'DSA-PATT-MST-000': {
    fallbackText: 'Subgrafo acíclico que conecta todos os V vértices com exatamente V-1 arestas de peso total mínimo.'
  },
  'DSA-PATT-MST-001': {
    fallbackText: 'A aresta de menor peso que cruza qualquer corte entre dois conjuntos de vértices pertence obrigatoriamente à MST.'
  },
  'DSA-PATT-MST-002': {
    fallbackText: 'Ordenação de arestas por peso e adição gulosa descartando arestas com extremidades no mesmo conjunto DSU.'
  },
  'DSA-PATT-MST-003': {
    fallbackText: 'Crescimento contínuo da árvore a partir de um vértice inicial anexando a aresta mais leve na fronteira.'
  },
  'DSA-PATT-MST-004': {
    fallbackText: 'Kruskal O(E log E) ideal para grafos esparsos vs Prim com heap Fibonacci O(E + V log V) para grafos densos.'
  },
  'DSA-PATT-MST-005': {
    fallbackText: 'Garantia formal de que quando todos os pesos das arestas são distintos, a MST do grafo é estritamente única.'
  },

  // === monotonic-stack-queue ===
  'DSA-PATT-MONOSTACK-000': {
    fallbackText: 'Desempilhamento contínuo de elementos menores para manter a pilha em ordem estritamente decrescente.'
  },
  'DSA-PATT-MONOSTACK-001': {
    fallbackText: 'Cada elemento entra e sai da pilha no máximo uma vez, identificando o primeiro maior à direita em O(N).'
  },
  'DSA-PATT-MONOSTACK-002': {
    fallbackText: 'Cálculo da largura máxima quando a barra atual limita a altura de expansão dos elementos empilhados.'
  },
  'DSA-PATT-MONOSTACK-003': {
    fallbackText: 'Cálculo do volume de água contida entre a barra atual e o limitador esquerdo desempilhado.'
  },
  'DSA-PATT-MONOSTACK-004': {
    fallbackText: 'Deque com valores decrescentes mantendo o maior elemento da janela sempre disponível na cabeça em O(1).'
  },
  'DSA-PATT-MONOSTACK-005': {
    fallbackText: 'Armazenamento de índices na pilha monotônica calculando a diferença de dias curr_index - popped_index.'
  },

  // === divide-and-conquer-sorting ===
  'DSA-PATT-DIVCONQ-000': {
    fallbackText: 'Divisão em subproblemas menores independentes, resolução na base e combinação das soluções parciais.'
  },
  'DSA-PATT-DIVCONQ-001': {
    fallbackText: 'Divisão recursiva até tamanho 1 e intercalação ordenada estável com dois ponteiros usando memória auxiliar O(N).'
  },
  'DSA-PATT-DIVCONQ-002': {
    fallbackText: 'Escolha de pivô e reorganização in-place com menores à esquerda e maiores à direita.'
  },
  'DSA-PATT-DIVCONQ-003': {
    fallbackText: 'Lomuto com um ponteiro de varredura vs Hoare com ponteiros bidirecionais fazendo 3x menos trocas.'
  },
  'DSA-PATT-DIVCONQ-004': {
    fallbackText: 'Pivô aleatório evitando a degeneração quadrática em arrays já ordenados garantindo média O(N log N).'
  },
  'DSA-PATT-DIVCONQ-005': {
    fallbackText: 'Comparação entre o custo do trabalho local f(n) e a taxa de crescimento das folhas da árvore n^(log_b a).'
  },

  // === dynamic-programming-1d ===
  'DSA-PATT-DP1D-000': {
    fallbackText: 'Memoização de subproblemas sobrepostos eliminando recálculos exponenciais O(2^N) -> O(N).'
  },
  'DSA-PATT-DP1D-001': {
    fallbackText: 'Recursão com cache em tabela vs iteração bottom-up preenchendo o vetor linear sequencialmente.'
  },
  'DSA-PATT-DP1D-002': {
    fallbackText: 'Substituição do array completo por duas variáveis escalares prev1 e prev2 mantendo apenas a janela de dependência.'
  },
  'DSA-PATT-DP1D-003': {
    fallbackText: 'Transição de estado escolhendo o máximo entre roubar a casa atual somando a dp[i-2] ou manter dp[i-1].'
  },
  'DSA-PATT-DP1D-004': {
    fallbackText: 'Preenchimento de valores de 1 até T computando min(dp[amount - coin] + 1) para cada moeda disponível.'
  },
  'DSA-PATT-DP1D-005': {
    fallbackText: 'Manutenção de array de menores caudas de subsequências com busca binária substituindo elementos em O(N log N).'
  },

  // === dynamic-programming-2d ===
  'DSA-PATT-DP2D-000': {
    fallbackText: 'Preenchimento de matriz bidimensional onde o estado atual depende de células vizinhas (cima, esquerda, diagonal).'
  },
  'DSA-PATT-DP2D-001': {
    fallbackText: 'Decisão de incluir o item (consumindo capacidade de peso) ou ignorar o item preservando o valor anterior.'
  },
  'DSA-PATT-DP2D-002': {
    fallbackText: 'Iteração reversa da capacidade máxima até o peso do item prevenindo reuso múltiplo do mesmo item.'
  },
  'DSA-PATT-DP2D-003': {
    fallbackText: 'Se caracteres coincidem: soma diagonal +1; se divergem: máximo entre vizinho superior e esquerdo.'
  },
  'DSA-PATT-DP2D-004': {
    fallbackText: 'Propagação de caminhos acumulando o número de rotas vindas de cima e da esquerda: dp[i][j] = dp[i-1][j] + dp[i][j-1].'
  },
  'DSA-PATT-DP2D-005': {
    fallbackText: 'Cálculo de operações mínimas (inserção, deleção, substituição) na transformação de uma string em outra.'
  },

  // === dynamic-programming-advanced ===
  'DSA-PATT-DPADV-000': {
    fallbackText: 'Inteiro de 32 bits utilizado como conjunto de elementos visitados indexando o estado da DP.'
  },
  'DSA-PATT-DPADV-001': {
    fallbackText: 'Busca pelo menor ciclo hamiltoniano computando dp[mask][u] com transições para vizinhos não visitados.'
  },
  'DSA-PATT-DPADV-002': {
    fallbackText: 'Construção dígito a dígito rastreando flag booleana isTight que restringe o limite numérico superior.'
  },
  'DSA-PATT-DPADV-003': {
    fallbackText: 'Agregação de respostas parciais de subárvores no retorno pós-ordem da travessia DFS.'
  },
  'DSA-PATT-DPADV-004': {
    fallbackText: 'Manutenção de envoltória de retas lineares reduzindo o cálculo de min(m_j * x + c_j) de O(N) para O(1).'
  },
  'DSA-PATT-DPADV-005': {
    fallbackText: 'Monotonicidade dos pontos de divisão ótima opt[i][j] reduzindo complexidade de O(K * N²) para O(K * N log N).'
  },

  // === greedy-algorithms ===
  'DSA-PATT-GREEDY-000': {
    fallbackText: 'Escolha local ótima a cada passo sem reavaliação ou backtracking em problemas com propriedade gulosa.'
  },
  'DSA-PATT-GREEDY-001': {
    fallbackText: 'Seleção gulosa de intervalos que terminam mais cedo liberando o recurso para o máximo de tarefas subsequentes.'
  },
  'DSA-PATT-GREEDY-002': {
    fallbackText: 'Fusão repetida dos dois nós de menor frequência gerando códigos binários mais curtos para caracteres mais frequentes.'
  },
  'DSA-PATT-GREEDY-003': {
    fallbackText: 'Atualização contínua do índice máximo alcançável maxReach = max(maxReach, i + nums[i]) em tempo linear O(N).'
  },
  'DSA-PATT-GREEDY-004': {
    fallbackText: 'Se o saldo acumulado de combustível cair abaixo de 0, o ponto de partida deve ser estritamente posterior a esse índice.'
  },
  'DSA-PATT-GREEDY-005': {
    fallbackText: 'Propriedade de troca de matroides garantindo matematicamente a convergência para o ótimo global.'
  },

  // === intervals-merge ===
  'DSA-PATT-INTERVAL-000': {
    fallbackText: 'Ordenação por início e fusão de intervalos sobrepostos estendendo o ponto final end = max(end, next_end).'
  },
  'DSA-PATT-INTERVAL-001': {
    fallbackText: 'Inserção ordenada: 1) anteriores sem sobreposição; 2) fusão com sobrepostos; 3) posteriores restantes.'
  },
  'DSA-PATT-INTERVAL-002': {
    fallbackText: 'Ao detectar sobreposição, descarte guloso do intervalo com maior término para minimizar conflitos futuros.'
  },
  'DSA-PATT-INTERVAL-003': {
    fallbackText: 'Min-Heap rastreia horários de término das reuniões em andamento alocando nova sala quando houver colisão.'
  },
  'DSA-PATT-INTERVAL-004': {
    fallbackText: 'Dois ponteiros calculando a interseção [max(A_s, B_s), min(A_e, B_e)] e avançando o intervalo que termina primeiro.'
  },
  'DSA-PATT-INTERVAL-005': {
    fallbackText: 'Geração de eventos de início (+1) e término (-1) processando pontos temporais para encontrar o pico concorrente.'
  },

  // === bit-manipulation-patterns ===
  'DSA-PATT-BIT-000': {
    fallbackText: 'Execução direta na ALU em 1 ciclo de instrução para operações lógicas bit a bit.'
  },
  'DSA-PATT-BIT-001': {
    fallbackText: 'A operação n & (n-1) limpa o bit menos significativo em cada passo reduzindo as iterações à quantidade de 1s.'
  },
  'DSA-PATT-BIT-002': {
    fallbackText: 'Propriedades a ^ a = 0 e a ^ 0 = a cancelando todos os elementos duplicados em O(N) e espaço O(1).'
  },
  'DSA-PATT-BIT-003': {
    fallbackText: 'A expressão n & (-n) isola estritamente a menor potência de 2 setada no número binário.'
  },
  'DSA-PATT-BIT-004': {
    fallbackText: 'Técnica sub = (sub - 1) & mask gerando todos os subconjuntos não-nulos em tempo O(3^N) em vez de O(4^N).'
  },
  'DSA-PATT-BIT-005': {
    fallbackText: 'Deslocamento de bits à esquerda (n << k = n * 2^k) e à direita (n >> k = floor(n / 2^k)) com custo O(1).'
  },

  // === concurrent-data-structures ===
  'DSA-ADV-CONCURRENT-000': {
    fallbackText: 'Substituição de travas com mutex por laços otimistas de Compare-And-Swap (CAS) eliminando context switches.'
  },
  'DSA-ADV-CONCURRENT-001': {
    fallbackText: 'Associação de contador de versão sequencial ao ponteiro (AtomicStampedReference) impedindo CAS espúrio.'
  },
  'DSA-ADV-CONCURRENT-002': {
    fallbackText: 'Ring buffer pré-alocado com padding de 64 bytes eliminando false sharing e disputa de locks.'
  },
  'DSA-ADV-CONCURRENT-003': {
    fallbackText: 'Atualização atômica do ponteiro da cabeça via CAS repetindo a operação em caso de colisão entre threads.'
  },
  'DSA-ADV-CONCURRENT-004': {
    fallbackText: 'Fila encadeada com dois ponteiros atômicos (head e tail) com avanço do tail atrasado por threads concorrentes.'
  },
  'DSA-ADV-CONCURRENT-005': {
    fallbackText: 'Registro de ponteiros protegidos impedindo que threads leitoras acessem memória liberada por outra thread.'
  },

  // === string-matching ===
  'DSA-ADV-STRING-000': {
    fallbackText: 'Tabela LPS permite saltar caracteres redundantes sem retroceder o ponteiro do texto principal.'
  },
  'DSA-ADV-STRING-001': {
    fallbackText: 'Dois ponteiros computando o maior prefixo próprio que também é sufixo para cada prefixo do padrão.'
  },
  'DSA-ADV-STRING-002': {
    fallbackText: 'Cálculo do hash da janela em O(1) removendo o caractere de saída e adicionando o novo caractere com módulo Q.'
  },
  'DSA-ADV-STRING-003': {
    fallbackText: 'Manutenção do intervalo [L, R] de maior casamento de prefixo acelerando a busca em tempo linear O(N+M).'
  },
  'DSA-ADV-STRING-004': {
    fallbackText: 'Trie enriquecida com links de falha e dicionário funcionando como autômato finito determinístico em O(N + sum(M)).'
  },
  'DSA-ADV-STRING-005': {
    fallbackText: 'Inserção de delimitadores e reaproveitamento do raio de simetria do centro mais à direita expandindo em O(N).'
  },

  // === sweepline-geometry ===
  'DSA-ADV-SWEEPLINE-000': {
    fallbackText: 'Linha imaginária varrendo o plano bidimensional processando eventos em ordem cronológica de coordenadas X.'
  },
  'DSA-ADV-SWEEPLINE-001': {
    fallbackText: 'Eventos de início e término de prédios inserindo e removendo alturas da Priority Queue detectando pontos de contorno.'
  },
  'DSA-ADV-SWEEPLINE-002': {
    fallbackText: 'Manutenção de árvore BST balanceada dos segmentos ativos testando apenas vizinhos adjacentes na linha de varredura.'
  },
  'DSA-ADV-SWEEPLINE-003': {
    fallbackText: 'Divisão e conquista examinando apenas pontos dentro da faixa de largura 2d no retorno ordenado por Y.'
  },
  'DSA-ADV-SWEEPLINE-004': {
    fallbackText: 'Sweep line no eixo X combinada com Segment Tree no eixo Y mantendo o comprimento total ativo coberto.'
  },
  'DSA-ADV-SWEEPLINE-005': {
    fallbackText: 'Ordenação angular e verificação de curvas à esquerda com produto vetorial (Cross Product) desempilhando pontos côncavos.'
  },

  // === game-theory-math ===
  'DSA-ADV-GAMETHEORY-000': {
    fallbackText: 'Cálculo do XOR de todas as pilhas: posição vencedora se XOR x_i != 0 e perdedora se XOR x_i == 0.'
  },
  'DSA-ADV-GAMETHEORY-001': {
    fallbackText: 'Mapeamento de jogos combinatórios imparciais para valores de Grundy usando o menor inteiro não negativo excluído (Mex).'
  },
  'DSA-ADV-GAMETHEORY-002': {
    fallbackText: 'Maximização de ganhos e minimização de perdas cortando ramos onde alpha >= beta na árvore de recursão.'
  },
  'DSA-ADV-GAMETHEORY-003': {
    fallbackText: 'Elevação ao quadrado da base e multiplicação do acumulador quando o bit menos significativo do expoente for 1.'
  },
  'DSA-ADV-GAMETHEORY-004': {
    fallbackText: 'Eliminação progressiva de múltiplos de primos marcando compostos na grade numérica contígua.'
  },
  'DSA-ADV-GAMETHEORY-005': {
    fallbackText: 'Cálculo simultâneo do MDC e coeficientes inteiros de Bézout ax + by = gcd(a, b).'
  }
};

/**
 * Builds the responsive HTML video block
 */
export function buildVideoWrapper(videoUrl, fallbackText) {
  return `<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="${videoUrl}">
    <p>Visualização: ${fallbackText}</p>
  </video>
</div>`;
}

/**
 * Injects or updates the video block inside the Dual Coding Visual section of a card's content
 */
export function injectVideoIntoCard(content, cardId) {
  const mediaConfig = DSA_CARD_MEDIA_MAP[cardId];
  if (!mediaConfig || !mediaConfig.videoUrl) {
    return content;
  }

  const videoBlock = buildVideoWrapper(mediaConfig.videoUrl, mediaConfig.fallbackText);

  // If already contains video wrapper, replace it
  if (content.includes('<div class="video-wrapper">')) {
    return content.replace(
      /<div class="video-wrapper">[\s\S]*?<\/div>/,
      videoBlock
    );
  }

  // Otherwise inject right after `### Dual Coding Visual\n`
  if (content.includes('### Dual Coding Visual\n')) {
    return content.replace(
      '### Dual Coding Visual\n',
      `### Dual Coding Visual\n${videoBlock}\n\n`
    );
  }

  // If no newline after heading
  if (content.includes('### Dual Coding Visual')) {
    return content.replace(
      '### Dual Coding Visual',
      `### Dual Coding Visual\n${videoBlock}\n`
    );
  }

  return content;
}

/**
 * Recursively find all markdown files in a directory
 */
function findMarkdownFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      findMarkdownFiles(fullPath, list);
    } else if (fullPath.endsWith('.md')) {
      list.push(fullPath);
    }
  }
  return list;
}

/**
 * Main execution function
 */
export function executeInjection() {
  console.log('🚀 Starting DSA Looping Micro-Video Injection...');
  const files = findMarkdownFiles(DSA_DIR);
  console.log(`🔍 Found ${files.length} cards in ${DSA_DIR}`);

  let updatedCount = 0;
  let validationErrors = 0;

  for (const filePath of files) {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const idMatch = rawContent.match(/^id:\s*([^\n\r]+)/m);
    if (!idMatch) {
      console.warn(`⚠️ No ID found in ${filePath}`);
      continue;
    }

    const cardId = idMatch[1].trim();
    if (!DSA_CARD_MEDIA_MAP[cardId]) {
      console.warn(`⚠️ No media mapping defined for card ID: ${cardId}`);
      continue;
    }

    const newContent = injectVideoIntoCard(rawContent, cardId);

    // Validate the updated card
    const validation = validateCard(filePath, newContent);
    if (!validation.valid) {
      console.error(`❌ Validation failed for updated card [${cardId}]:`, validation.errors);
      validationErrors++;
      continue;
    }

    fs.writeFileSync(filePath, newContent, 'utf8');
    updatedCount++;
  }

  console.log(`\n🎉 Completed injection: ${updatedCount} cards updated successfully!`);
  if (validationErrors > 0) {
    console.error(`💥 Validation failed on ${validationErrors} cards.`);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  executeInjection();
}
