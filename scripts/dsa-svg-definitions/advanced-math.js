import { svgWrapper } from '../dsa-svg-base.js';

export const ADVANCED_MATH_SVGS = {
  // === concurrent-data-structures ===
  'DSA-ADV-CONCURRENT-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Lock-Based vs Lock-Free Concurrency</text>
  <g transform="translate(80, 50)">
    <!-- Lock-based -->
    <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#ef4444" rx="6"/>
    <text x="120" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Lock-Based (Mutex / RWLock)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Thread suspensa pelo kernel</text>
    <text x="15" y="60" fill="#fca5a5" font-size="10">Overhead de context switch (~1-2µs)</text>

    <!-- Lock-free -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Lock-Free (Atômicos / CAS)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Instruções atômicas de CPU</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Pelo menos 1 thread progride sempre</text>
    </g>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Lock-free elimina deadlocks, priority inversions e gargalos de thread sleep</text>
`),

  'DSA-ADV-CONCURRENT-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compare-And-Swap (CAS): Primitiva Atômica em Hardware</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">bool CAS(memory_loc, expected_val, new_val)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Executado como instrução atômica única no barramento da CPU (CMPXCHG em x86).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Se o valor atual == expected_val → atualiza para new_val e retorna true; senão falha.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Se falhar, a thread repete o loop de CAS em modo spin sem bloquear o sistema</text>
`),

  'DSA-ADV-CONCURRENT-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">O Problema ABA e Ponteiros Tagueados (Tagged Pointers / Stamp)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Valor volta a 'A', mas a estrutura interna mudou</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Thread 1 lê A; Thread 2 muda para B e volta para A (reutilizando mesmo endereço de memória).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Solução: Adiciona contador de versão atômico: CAS([pointer, version]).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Implementado via AtomicStampedReference em Java e ponteiros com versão em Go/C++</text>
`),

  'DSA-ADV-CONCURRENT-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Michael-Scott Lock-Free Queue: Inserção com CAS no tail.next</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Fila Concorrente de Dois Passos com Nó Sentinela</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Thread usa CAS para ligar novo nó em tail.next.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">2. Thread usa CAS para avançar o ponteiro tail para o novo nó (outras threads ajudam se cauda atrasar).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Padrão da indústria implementado no ConcurrentLinkedQueue do Java</text>
`),

  'DSA-ADV-CONCURRENT-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Treiber Lock-Free Stack: Push/Pop com CAS no Ponteiro Head</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Push: new_node.next = head; CAS(&amp;head, new_node.next, new_node)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Pop: CAS(&amp;head, old_head, old_head.next) em um loop de retry sem bloqueios.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Garante que múltiplas threads empilhem e desempilhem simultaneamente sem corromper ponteiros.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">A mais simples e elegante estrutura concorrente sem locks</text>
`),

  'DSA-ADV-CONCURRENT-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Read-Copy-Update (RCU): Leituras com Custo Zero de Sincronização</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Escritores Alocam Cópia Modificada; Leitores Acessam sem Lock</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Escritor substitui o ponteiro global atomicamente; espera período de graça (Grace Period).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Versão antiga liberada apenas após todas as threads leitoras ativas terminarem.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Espinha dorsal de concorrência no Linux Kernel para tabelas de roteamento e drivers</text>
`),

  // === string-matching ===
  'DSA-ADV-STRING-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Knuth-Morris-Pratt (KMP): Tabela de Prefixo π (LPS) em Tempo O(N + M)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Longest Proper Prefix which is also Suffix (LPS)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao ocorrer mismatch no caractere j do padrão: j = lps[j - 1].</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">O ponteiro do texto NUNCA retrocede; salta diretamente para o prefixo coincidente.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Elimina o recuo quadrático O(N · M) da busca ingênua (brute force)</text>
`),

  'DSA-ADV-STRING-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Rabin-Karp: Rolling Hash Polinomial com Módulo Primo</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Atualização de Hash da Janela em Tempo O(1)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">hash_next = ((hash_prev - text[i] · B^(M-1)) · B + text[i+M]) % MOD.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Compara a string apenas se o hash coincidir: Tempo Médio O(N + M).</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Ideal para detecção de plágio e busca de múltiplos padrões com mesmo tamanho</text>
`),

  'DSA-ADV-STRING-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Z-Algorithm: Construção do Z-Array em Tempo Linear O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Z[i] = Maior Substring Iniciando em i que Casar com Prefixo de S</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Mantém uma caixa de correspondência [L, R] mais à direita já explorada.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Reutiliza valores Z[i - L] previamente calculados: Tempo estrito O(N).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Aplicado na string pattern + "$" + text para localizar todas as ocorrências em O(N + M)</text>
`),

  'DSA-ADV-STRING-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Boyer-Moore: Regras do Bad Character e Good Suffix (O(N/M) Sublinear)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Casamento da Direita para a Esquerda</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Bad Character: Salta o padrão alinhando com a última ocorrência do caractere incorreto.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Good Suffix: Salta alinhando com o sufixo previamente casado.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">O algoritmo de busca textual mais rápido na prática (utilizado no comando GNU grep)</text>
`),

  'DSA-ADV-STRING-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Manacher's Algorithm: Maior Substring Palindrômica em Tempo Estrito O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Simetria em Torno do Centro do Palíndromo</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Insere '#' entre caracteres para unificar palíndromos pares e ímpares: "^#a#b#a#$".</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Espelha os raios P[i] em relação ao centro C: P[i] = min(R - i, P[2*C - i]).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Supera a expansão ingênua O(N²) alcançando complexidade linear estrita O(N)</text>
`),

  'DSA-ADV-STRING-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Suffix Automaton: Grafo Acíclico de Fatores em Tempo Linear O(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Representação Mínima de Todas as Substrings de uma String</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Contém no máximo 2N - 1 estados e 3N - 4 transições para uma string de tamanho N.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Resolve ocorrência de substrings, número de substrings distintas e menor fator cíclico em O(N).</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Estrutura de dados textual mais poderosa da ciência da computação</text>
`),

  // === sweepline-geometry ===
  'DSA-ADV-SWEEPLINE-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sweep-Line: Varredura de Eventos Ordenados por Coordenada X</text>
  <g transform="translate(140, 50)">
    <line x1="180" y1="0" x2="180" y2="85" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4"/>
    <text x="180" y="-8" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Sweep Line (X)</text>

    <circle cx="60" cy="30" r="6" fill="#3b82f6"/><text x="60" y="20" fill="#93c5fd" font-size="9" text-anchor="middle">Start (1)</text>
    <circle cx="180" cy="50" r="6" fill="#f59e0b"/><text x="180" y="70" fill="#fcd34d" font-size="9" text-anchor="middle">Event (2)</text>
    <circle cx="300" cy="20" r="6" fill="#10b981"/><text x="300" y="10" fill="#a7f3d0" font-size="9" text-anchor="middle">End (3)</text>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Transforma problemas geométricos 2D estáticos em problemas 1D dinâmicos em O(N log N)</text>
`),

  'DSA-ADV-SWEEPLINE-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Interseção de Segmentos com Algoritmo de Bentley-Ottmann</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">BST Balanceada Mantendo Segmentos Ativos Cortados pela Linha</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Apenas segmentos vizinhos adjacentes na BST de status podem se cruzar.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Testa interseção apenas entre vizinhos ao inserir/remover: Tempo O((N + K) log N).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Reduz teste quadrático O(N²) para quase-linear quando o número de interseções K é pequeno</text>
`),

  'DSA-ADV-SWEEPLINE-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Skyline Problem: Contorno de Edifícios com Sweep-Line + Max-Heap</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Eventos de Início e Fim de Edifícios (Li, Ri, Hi)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Início de edifício: adiciona altura ao Max-Heap.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Fim de edifício: remove altura. Se max_height mudar → registra ponto crítico no contorno.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Complexidade total: O(N log N) com armazenamento proporcional aos edifícios</text>
`),

  'DSA-ADV-SWEEPLINE-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Convex Hull: Algoritmo de Monotone Chain (Andrew / Graham Scan) em O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Produto Vetorial (Cross Product) para Verificar Curvas à Esquerda</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Ordena pontos por coordenadas (x, y).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Constrói envoltória inferior e superior desempilhando pontos que formam curvas à direita em O(N).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Garante a menor fronteira convexa contendo todos os N pontos no plano</text>
`),

  'DSA-ADV-SWEEPLINE-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Closest Pair of Points: Divisão e Conquista / Sweep-Line em O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Faixa Central de Largura 2d</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Calcula menor distância d nas metades esquerda e direita.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Na faixa central [-d, +d], cada ponto precisa ser comparado com no máximo 7 vizinhos ordenados por Y.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Elimina o custo quadrático O(N²) de comparação todos-contra-todos</text>
`),

  'DSA-ADV-SWEEPLINE-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Área de União de Retângulos: Sweep-Line + Segment Tree em O(N log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Discretização de Coordenadas Y</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Linha vertical varre eventos de início e fim de retângulos no eixo X.</text>
    <text x="20" y="62" fill="#f59e0b" font-size="11">Segment Tree mantém o comprimento total coberto no eixo Y: Área += ΔX · Y_covered.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Resolve sobreposição massiva de milhares de retângulos em tempo O(N log N)</text>
`),

  // === game-theory-math ===
  'DSA-ADV-GAMETHEORY-000': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Teorema de Sprague-Grundy: Redução de Jogos Imparciais a Nim via XOR</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Nim-Sum = G1 ⊕ G2 ⊕ ... ⊕ Gk</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Cada estado de jogo possui um valor Grundy G = mex({ G(estados_alcançáveis) }).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Se Nim-Sum != 0 → Posição Vencedora (P1 ganha com jogada ótima); se Nim-Sum == 0 → Posição Perdedora.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Unifica qualquer jogo combinatório finito em avaliação matemática O(1)</text>
`),

  'DSA-ADV-GAMETHEORY-001': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Minimax com Poda Alpha-Beta (Alpha-Beta Pruning)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Poda de Ramos onde o Oponente já Tem Opção Superior</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">α: melhor valor para o jogador MAX | β: melhor valor para o jogador MIN.</text>
    <text x="20" y="62" fill="#f87171" font-size="11">Se β ≤ α → PODA! O valor do ramo atual nunca será escolhido pelo oponente.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Dobra a profundidade de busca efetiva de árvores de jogos (xadrez, damas, Connect4)</text>
`),

  'DSA-ADV-GAMETHEORY-002': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Euclides Estendido: Coeficientes de Bézout a·x + b·y = gcd(a, b)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Cálculo de Inversos Modulares e Equações Diofantinas Lineares</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Recursão clássica: gcd(a, b) = gcd(b, a % b).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">No retorno, atualiza: x = y1, y = x1 - (a / b) · y1 em tempo O(log(min(a, b))).</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Pedra fundamental da criptografia de chave pública RSA e ECC</text>
`),

  'DSA-ADV-GAMETHEORY-003': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Crivo de Eratóstenes: Primos até N em Tempo O(N log log N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Marcação de Múltiplos com Array Booleano is_prime[]</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Para cada primo p de 2 até √N: marca múltiplos p², p²+p, p²+2p... como compostos.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Permite consultas de primalidade O(1) e fatoração em fatores primos em O(log N).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Calcula todos os primos até 10⁷ em menos de 100 milissegundos</text>
`),

  'DSA-ADV-GAMETHEORY-004': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fast Modular Exponentiation: (A^B) % MOD em Tempo O(log B)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Exponenciação Binária por Elevação ao Quadrado</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Se B é ímpar: res = (res · A) % MOD; B--.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">A = (A · A) % MOD; B = B / 2. Executa em no máximo 64 iterações para inteiros de 64 bits.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Substitui multiplicação linear O(B) por logarítmica O(log B)</text>
`),

  'DSA-ADV-GAMETHEORY-005': svgWrapper(680, 200, `
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Inverso Modular via Pequeno Teorema de Fermat: A^(P - 2) ≡ A⁻¹ (mod P)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Divisão Modular Sob Módulo Primo P</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">(A / B) % P = (A · B⁻¹) % P = (A · power(B, P - 2, P)) % P.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Permite calcular combinações C(n, k) = n! / (k! · (n-k)!) sob módulo 10⁹ + 7 em O(log P).</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Essencial para problemas combinatórios e probabilidade em entrevistas avançadas</text>
`)
};
