import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Module 3: Advanced DSA, Strings & Math (27 to 30)...');

// 27. string-matching
writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/string-matching/DSA-ADV-STRING-000.md', `---
id: DSA-ADV-STRING-000
title: "Algoritmo de Rabin-Karp com Rolling Hash Polinomial e Aritmética Modular"
tags:
  - level::l3-junior
  - topic::dsa::string-matching
  - company::google
  - freq::high
---

## Pergunta
Como o **Algoritmo de Rabin-Karp** utiliza **Rolling Hash polinomial** para buscar padrões em texto em tempo médio linear $O(N + M)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Em vez de comparar substrings caractere por caractere ($O(M)$), Rabin-Karp calcula o valor de hash do padrão e de uma janela deslizante de tamanho $M$ no texto:
- **Rolling Hash**: Ao deslizar a janela de $i$ para $i+1$, o novo hash é computado em **$O(1)$**:
  $$H_{\\text{novo}} = ( (H_{\\text{ant}} - S[i] \\cdot B^{M-1}) \\cdot B + S[i+M] ) \\pmod P$$
  - Onde $B$ é a base (ex: 31 ou 257) e $P$ é um primo grande (ex: $10^9 + 7$).
- Se $H_{\\text{janela}} == H_{\\text{padrão}}$, compara os caracteres reais para descartar colisões espúrias.
- **Complexidade**: $O(N + M)$ tempo médio e $O(1)$ espaço.

### Dual Coding Visual
| Algoritmo | Custo por Janela | Complexidade de Tempo Médio |
|---|---|---|
| **Busca Ingênua** | $O(M)$ Comparações | $O(N \\cdot M)$ |
| **Rabin-Karp (Rolling Hash)** | $O(1)$ Recálculo do Hash | $O(N + M)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O uso de módulo primo grande ($10^9 + 7$) e double-hashing reduz a probabilidade de colisões para perto de zero.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/string-matching/DSA-ADV-STRING-002.md', `---
id: DSA-ADV-STRING-002
title: "Algoritmo KMP e a Tabela de Prefixos Pi (LPS - Longest Prefix Suffix) em O(N+M)"
tags:
  - level::l3-junior
  - topic::dsa::string-matching
  - company::meta
  - freq::high
---

## Pergunta
Como o **Algoritmo KMP (Knuth-Morris-Pratt)** utiliza a tabela LPS para nunca retroceder o ponteiro do texto durante o casamento de padrões?

## Resposta
### Quick Answer
**Solução Direta**:
- A tabela **LPS (\`pi[]\`)** armazena o comprimento do maior prefixo próprio que também é sufixo para cada prefixo do padrão.
- Ao encontrar uma incompatibilidade (*mismatch*) no caractere $j$ do padrão após casar $j$ caracteres:
  - O KMP não reinicia a busca do texto; ele consulta **\`j = lps[j - 1]\`**.
  - Esse salto reaproveita os caracteres que já sabemos que casam com o início do padrão, mantendo o ponteiro do texto $i$ avançando **estritamente para a frente**.
- **Complexidade**: $O(N + M)$ tempo estrito garantido no pior caso e $O(M)$ espaço auxiliar.

### Dual Coding Visual
| Comportamento em Mismatch | Ponteiro do Texto $i$ | Ponteiro do Padrão $j$ |
|---|---|---|
| **Busca Ingênua** | Retrocede para $i - j + 1$ | Reinicia em $0$ |
| **KMP (Knuth-Morris-Pratt)** | **Nunca retrocede** (Avança sempre) | Salta para \`lps[j - 1]\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É o algoritmo canônico para garantir que o casamento de strings seja concluído em tempo estritamente determinístico $O(N + M)$ sem depender de hashing.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/string-matching/DSA-ADV-STRING-003.md', `---
id: DSA-ADV-STRING-003
title: "Algoritmo Z (Z-Algorithm) e o Z-Array para Busca de Padrões em O(N+M)"
tags:
  - level::l3-junior
  - topic::dsa::string-matching
  - company::amazon
  - freq::high
---

## Pergunta
O que é o **Z-Array** e como o **Algoritmo Z** encontra todas as ocorrências de um padrão concatenando $\\text{Padrão} + \\$ + \\text{Texto}$?

## Resposta
### Quick Answer
**Solução Direta**:
- Para uma string $S$, $Z[i]$ é o comprimento do maior prefixo comum entre $S$ e a substring que começa em $S[i]$.
- **Busca de Padrões**:
  1. Constrói a string concatenada: $S = \\text{pattern} + \\text{"\\$"} + \\text{text}$ (onde \`$\` é um caractere sentinela único).
  2. Computa o Z-Array de $S$ em tempo linear $O(N + M)$ mantendo uma janela $[L, R]$ de casamento máximo.
  3. Qualquer posição $i$ onde $Z[i] == |\\text{pattern}|$ indica uma ocorrência exata do padrão no texto no índice $i - |\\text{pattern}| - 1$.

### Dual Coding Visual
| Estrutura Concatenada | Condição de Casamento | Índice Real no Texto |
|---|---|---|
| $\\text{Padrão} + \\$ + \\text{Texto}$ | $Z[i] == \\text{len}(\\text{Padrão})$ | $i - \\text{len}(\\text{Padrão}) - 1$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O Algoritmo Z é muito mais simples de implementar e raciocinar que o KMP, mantendo a mesma complexidade linear $O(N + M)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/string-matching/DSA-ADV-STRING-001.md', `---
id: DSA-ADV-STRING-001
title: "Autômato de Aho-Corasick para Busca Simultânea de Dicionários em O(N + sum(M))"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::google
  - freq::high
---

## Pergunta
Como o **Autômato de Aho-Corasick** combina uma Trie com links de falha (*failure links*) para buscar milhares de palavras simultaneamente em tempo linear?

## Resposta
### Quick Answer
**Solução Direta**:
- Em vez de rodar KMP $K$ vezes para $K$ palavras diferentes ($O(K \\cdot N)$), Aho-Corasick constrói uma máquina de estados finitos:
  1. Constrói uma **Trie** contendo todas as palavras do dicionário.
  2. Computa **Links de Falha (Suffix Links)** via BFS em camadas (similar à tabela $\\pi$ do KMP estendida para árvores).
  3. Varre o texto $T$ em uma única passagem: a cada caractere, transita pelos estados da Trie e salta pelos links de falha em caso de mismatch.
- **Complexidade**: $O(|T| + \\sum |P_i|)$ tempo linear absoluto, independentemente do número de palavras no dicionário.

### Dual Coding Visual
| Abordagem Multi-Padrão | Custo com $K$ Palavras | Escalabilidade |
|---|---|---|
| **$K \\times$ KMP** | $O(K \\cdot N)$ | Degrada com dicionários grandes |
| **Aho-Corasick Automaton** | $O(N + \\text{TamanhoTotal})$ | Escala para milhões de palavras |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Aplicações Industriais
- É o algoritmo utilizado pelo utilitário \`fgrep\`, filtros de moderação de conteúdo e sistemas de detecção de intrusão (Snort).

#### Key Takeaways
- Aho-Corasick é a generalização do KMP para conjuntos de strings organizados em Trie.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/string-matching/DSA-ADV-STRING-004.md', `---
id: DSA-ADV-STRING-004
title: "Suffix Array e LCP Array para Indexação e Consultas de Substrings em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::meta
  - freq::high
---

## Pergunta
Como a combinação de **Suffix Array** e **LCP Array (Longest Common Prefix)** indexa textos para consultas e contagem de substrings distintas?

## Resposta
### Quick Answer
**Solução Direta**:
- **Suffix Array (\`SA[]\`)**: Array com os índices de todos os sufixos da string ordenados lexicograficamente. Permite buscar qualquer padrão de tamanho $M$ via Busca Binária em $O(M \\log N)$.
- **LCP Array (\`LCP[]\`)**: Armazena o comprimento do maior prefixo comum entre sufixos adjacentes no Suffix Array (computado em $O(N)$ via Algoritmo de Kasai).
- **Contagem de Substrings Distintas**: O total de substrings únicas de uma string de tamanho $N$ é dado diretamente por:
  $$\\text{Substrings Distintas} = \\frac{N(N + 1)}{2} - \\sum_{i=1}^{N-1} LCP[i]$$

### Dual Coding Visual
| Estrutura de Sufixos | Memória de Armazenamento | Propósito Principal |
|---|---|---|
| **Suffix Tree** | $O(N)$ (Constante alta ~20 bytes/nó) | Consultas complexas em grafos |
| **Suffix Array + LCP** | $O(N)$ (Arrays planos de 4 bytes) | Indexação compacta e rápida em cache |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O Suffix Array oferece o mesmo poder expressivo que uma Suffix Tree com uma fração minúscula do consumo de memória.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/string-matching/DSA-ADV-STRING-005.md', `---
id: DSA-ADV-STRING-005
title: "Algoritmo de Manacher para Encontrar Todos os Palíndromos em Tempo Estritamente O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::apple
  - freq::high
---

## Pergunta
Como o **Algoritmo de Manacher** calcula o maior raio palíndromo centrado em cada posição de uma string em tempo linear estrito $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. **Transformação de Formato**: Insere um caractere sentinela (ex: \`#\`) entre cada letra (ex: \`"aba" -> "^#a#b#a#$"\`), unificando palíndromos de comprimento par e ímpar sob a mesma lógica de centro.
- 2. Mantém o centro $C$ e a borda direita $R$ do palíndromo mais longo avistado até o momento.
- 3. Para cada posição $i$:
  - Se $i < R$, inicializa o raio $P[i]$ aproveitando a **simetria espelhada** em relação ao centro $C$ ($i' = 2C - i$):
    $$P[i] = \\min(R - i, \\ P[i'])$$
  - Expande além de $P[i]$ apenas se o palíndromo ultrapassar a borda direita $R$.
- **Complexidade**: $O(N)$ linear estrito, pois a borda direita $R$ avança monotonicamente.

### Dual Coding Visual
| Algoritmo de Palíndromos | Complexidade de Tempo | Tratamento de Tamanho Par/Ímpar |
|---|---|---|
| **Expand Around Center** | $O(N^2)$ | Exige 2 loops separados ($2N-1$ centros) |
| **Algoritmo de Manacher** | **$O(N)$ Linear** | Unificado via sentinelas \`#\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a resposta definitiva e ótima para o problema *Longest Palindromic Substring*.

</details>
`);

// 28. concurrent-data-structures
writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/concurrent-data-structures/DSA-ADV-CONCURRENT-000.md', `---
id: DSA-ADV-CONCURRENT-000
title: "Primitivas Atômicas e Compare-And-Swap (CAS) em Estruturas de Dados Lock-Free"
tags:
  - level::l3-junior
  - topic::dsa::concurrent-data-structures
  - company::google
  - freq::high
---

## Pergunta
Como funciona a instrução atômica de hardware **Compare-And-Swap (CAS)** e como ela viabiliza algoritmos lock-free sem travas mutex?

## Resposta
### Quick Answer
**Solução Direta**:
- **CAS(\`address\`, \`expectedValue\`, \`newValue\`)**: É uma instrução atômica indivisível de hardware (ex: \`CMPXCHG\` no x86) que:
  1. Compara o valor na memória em \`address\` com \`expectedValue\`.
  2. Se forem iguais, grava \`newValue\` e retorna \`true\`.
  3. Se forem diferentes (outra thread modificou a memória no meio do caminho), aborta sem alterar e retorna \`false\`.
- **Loop Lock-Free**: Uma thread lê o estado atual, computa o novo estado e tenta gravar via CAS em um laço: \`while (!CAS(ptr, old, new))\`. Se falhar, relê o estado e tenta novamente sem jamais bloquear o sistema operacional.

### Dual Coding Visual
| Mecanismo de Sincronização | Impacto de Contenção | Risco de Deadlock |
|---|---|---|
| **Mutex / Lock Tradicional** | Thread suspensa pelo SO (Context Switch) | Alto |
| **Lock-Free com CAS** | Thread reexecuta loop na CPU (Sem lock) | Zero Deadlocks |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Permite throughput ordens de grandeza maior em sistemas de alta frequência (HFT) e motores de banco de dados.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/concurrent-data-structures/DSA-ADV-CONCURRENT-002.md', `---
id: DSA-ADV-CONCURRENT-002
title: "Fila Concorrente Lock-Free de Michael-Scott com Ponteiros Atômicos"
tags:
  - level::l3-junior
  - topic::dsa::concurrent-data-structures
  - company::meta
  - freq::high
---

## Pergunta
Como a **Fila de Michael-Scott (ConcurrentLinkedQueue)** implementa operações de enfileiramento e desenfileiramento lock-free usando dois ponteiros atômicos?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantém um nó sentinela fictício (\`dummy node\`) com ponteiros \`head\` e \`tail\` do tipo \`AtomicReference\`:
  - **Enqueue(x)**:
    1. Cria o novo nó.
    2. Lê \`tail\` e \`tail.next\`.
    3. Se \`tail.next == null\`, tenta avançar \`tail.next\` para o novo nó via CAS.
    4. Se bem-sucedido, tenta avançar o ponteiro global \`tail\` para o novo nó. Se outra thread já tiver avançado, auxilia no avanço (*helping mechanism*).
  - **Dequeue()**: Tenta avançar o ponteiro \`head\` para \`head.next\` via CAS e retorna o valor do nó.

### Dual Coding Visual
| Operação Concorrente | Mecanismo de Proteção | Propriedade Garantida |
|---|---|---|
| **Enqueue** | 2 passos com CAS + Helping | Lock-Free (Não bloqueia) |
| **Dequeue** | CAS sobre o ponteiro \`head\` | Thread-Safe FIFO |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a base exata da classe \`java.util.concurrent.ConcurrentLinkedQueue\`.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/concurrent-data-structures/DSA-ADV-CONCURRENT-003.md', `---
id: DSA-ADV-CONCURRENT-003
title: "O Problema ABA em Algoritmos Lock-Free e Mitigação com Tagged Pointers"
tags:
  - level::l3-junior
  - topic::dsa::concurrent-data-structures
  - company::amazon
  - freq::high
---

## Pergunta
O que é o **Problema ABA** em estruturas lock-free baseadas em CAS e como **Tagged Pointers / Versionamento** resolvem essa vulnerabilidade?

## Resposta
### Quick Answer
**Solução Direta**:
- **O Problema ABA**:
  1. Thread 1 lê o ponteiro com valor $A$.
  2. Thread 2 intervém: altera o valor de $A$ para $B$, e depois de volta para $A$ (reutilizando o mesmo endereço de memória).
  3. Thread 1 executa \`CAS(ptr, A, C)\`. O CAS é bem-sucedido porque o ponteiro ainda aponta para o endereço $A$, mas o **estado interno dos dados foi corrompido** (nós intermediários foram desalocados/reorganizados).
- **Mitigação com Tagged Pointers / Versionamento**: Acopla um contador de versão (ou timestamp) ao ponteiro: $(A, v_1) \\to (B, v_2) \\to (A, v_3)$. Como $v_1 \\neq v_3$, o CAS falha com segurança (ex: \`AtomicStampedReference\` no Java).

### Dual Coding Visual
| Tipo de Referência | Transição de Estados | Resultado do CAS |
|---|---|---|
| **Ponteiro Puro (Sem Versão)** | $A \\to B \\to A$ | CAS tem **sucesso falso** (Corrompe memória) |
| **Tagged Pointer (Com Versão)** | $(A, 1) \\to (B, 2) \\to (A, 3)$ | CAS **falha com segurança** ($1 \\neq 3$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em linguagens com Garbage Collection (Java, Go), o problema ABA em referências puras é mitigado pela retenção de objetos vivos, mas reaparece em pooling e ponteiros numéricos.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/concurrent-data-structures/DSA-ADV-CONCURRENT-001.md', `---
id: DSA-ADV-CONCURRENT-001
title: "Evolução do ConcurrentHashMap: Striped Locking (Java 7) vs CAS + TreeBins (Java 8+)"
tags:
  - level::l4-pleno
  - topic::dsa::concurrent-data-structures
  - company::google
  - freq::high
---

## Pergunta
Qual a evolução arquitetural do **ConcurrentHashMap** entre Java 7 (Segment Locking) e Java 8+ (CAS + Synchronized Node-Level Locking)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Java 7 (Striped Locking / Segments)**:
  - Dividia a tabela em uma matriz fixa de 16 segmentos independentes (\`Segment<K,V>\`), onde cada segmento era um \`ReentrantLock\`. Operações em buckets de segmentos diferentes ocorriam em paralelo, mas múltiplos acessos ao mesmo segmento bloqueavam.
- **Java 8+ (CAS + Synchronized Node-Level)**:
  - Removeu completamente os segmentos.
  - Inserção em bucket vazio usa **CAS sem lock** (\`casTabAt\`).
  - Inserção em bucket com colisão trava **apenas o primeiro nó daquele bucket específico** (\`synchronized(node)\`), reduzindo a contenção para granularidade de 1 único bucket.
  - Converte buckets longos ($> 8$ nós) em árvores rubro-negras (\`TreeBin\`) garantindo tempo $O(\\log K)$ em colisões severas.

### Dual Coding Visual
| Característica | ConcurrentHashMap Java 7 | ConcurrentHashMap Java 8+ |
|---|---|---|
| **Granularidade de Lock** | Segmento (1/16 da tabela) | Nó da cabeça do bucket individual |
| **Bucket Vazio** | Exigia lock de segmento | Inserção 100% Lock-Free via CAS |
| **Colisão Pior Caso** | Lista encadeada $O(K)$ | Árvore Red-Black $O(\\log K)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É um dos estudos de caso de concorrência e design de estruturas de dados mais cobrados em entrevistas para vagas Sênior/Staff.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/concurrent-data-structures/DSA-ADV-CONCURRENT-004.md', `---
id: DSA-ADV-CONCURRENT-004
title: "SkipList Concorrente (ConcurrentSkipListMap) para Mapas Ordenados Lock-Free"
tags:
  - level::l4-pleno
  - topic::dsa::concurrent-data-structures
  - company::amazon
  - freq::high
---

## Pergunta
Por que a **SkipList Concorrente (ConcurrentSkipListMap)** é preferida em relação a árvores balanceadas concorrentes (ex: AVL/Red-Black) para mapas ordenados thread-safe?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema em Árvores Balanceadas Concorrentes**: Uma inserção que dispara uma rotação de rebalanceamento (AVL ou Red-Black) precisa modificar múltiplos nós ancestrais até a raiz, exigindo travas globais ou travamento de árvore inteira, destruindo a escalabilidade multicore.
- **Vantagem da SkipList**: As inserções e deleções em uma SkipList envolvem apenas modificações de ponteiros locais em uma lista encadeada multinível:
  - Cada nível pode ser atualizado de forma independente via CAS.
  - Leituras (\`get\`, \`containsKey\`, \`subMap\`) são **100% lock-free e nunca bloqueiam**.
- **Complexidade**: $O(\\log N)$ tempo médio para busca, inserção e remoção com alta concorrência.

### Dual Coding Visual
| Estrutura Ordenada | Custo de Modificação Concorrente | Escalabilidade Multithread |
|---|---|---|
| **Red-Black Tree Concorrente** | Rotações afetam árvore inteira | Baixa (Locks amplos) |
| **Concurrent SkipList** | Updates locais por ponteiros CAS | Altíssima (Lock-Free reads) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a estrutura de dados utilizada internamente no motor de armazenamento de bancos de dados modernos como Cassandra e RocksDB (MemTable).

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/concurrent-data-structures/DSA-ADV-CONCURRENT-005.md', `---
id: DSA-ADV-CONCURRENT-005
title: "Estruturas Read-Copy-Update (RCU) e Copy-On-Write (COW) para Leitura Intensiva"
tags:
  - level::l4-pleno
  - topic::dsa::concurrent-data-structures
  - company::netflix
  - freq::high
---

## Pergunta
Como as técnicas de **Read-Copy-Update (RCU)** e **Copy-On-Write (COW)** garantem leituras com custo zero de sincronização ($O(1)$) em cenários de alta leitura?

## Resposta
### Quick Answer
**Solução Direta**:
- **Copy-On-Write (\`CopyOnWriteArrayList\`)**:
  - **Leituras**: Acessam o array interno imutável diretamente sem nenhum lock ou barreira de sincronização (velocidade nativa máxima).
  - **Escritas**: Criam uma cópia completa do array (\`clone()\`), aplicam a modificação na cópia e trocam a referência do array via ponteiro \`volatile\` atômico.
  - Ideal para cenários com $99.9\\%$ de leituras e pouquíssimas escritas (ex: listas de ouvintes de eventos / cache de configurações).
- **Read-Copy-Update (RCU)**: Padrão similar utilizado no Kernel Linux, onde leitores não sofrem bloqueio e os dados antigos são desalocados após um período de graça (*grace period*).

### Dual Coding Visual
| Operação | Copy-On-Write Performance | Mecanismo |
|---|---|---|
| **Leitura (\`get\`)** | $O(1)$ Custo Zero de Lock | Acesso direto a array imutável |
| **Escrita (\`add\`)** | $O(N)$ Custo Alto de Cópia | Clona array inteiro + troca de ponteiro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Se houver muitas escritas frequentes, Copy-On-Write gera alto consumo de GC e degrada a performance severamente.

</details>
`);

// 29. sweepline-geometry
writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/sweepline-geometry/DSA-ADV-SWEEPLINE-000.md', `---
id: DSA-ADV-SWEEPLINE-000
title: "Paradigma de Linha de Varredura (Sweep-Line) e Fila de Eventos Discretos em O(N log N)"
tags:
  - level::l3-junior
  - topic::dsa::sweepline-geometry
  - company::meta
  - freq::high
---

## Pergunta
O que é o paradigma de **Linha de Varredura (Sweep-Line)** e como ele converte problemas geométricos 2D contínuos em uma sequência de eventos discretos 1D?

## Resposta
### Quick Answer
**Solução Direta**:
- O paradigma imagina uma linha vertical infinita varrendo o plano cartesiano da esquerda para a direita ($X \\to \\infty$):
  1. **Fila de Eventos (*Event Queue*)**: Armazena os pontos críticos de transição (inícios de segmentos, fins, vértices) ordenados pela coordenada $X$ ($O(N \\log N)$).
  2. **Estrutura de Estado (*Sweep-Line Status*)**: Mantém os objetos geométricos ativos que intersectam a linha no momento atual, armazenados em uma BST balanceada (ex: TreeMap) ordenada pela coordenada $Y$.
  3. A cada evento, o estado é atualizado e as propriedades geométricas são computadas em $O(\\log N)$.
- **Complexidade**: Reduz problemas $O(N^2)$ para $O(N \\log N)$.

### Dual Coding Visual
| Componente de Sweep-Line | Estrutura de Dados | Papel no Algoritmo |
|---|---|---|
| **Fila de Eventos** | Array Ordenado / Min-Heap ($X$) | Determina a ordem cronológica da varredura |
| **Estado da Linha** | BST Balanceada / TreeMap ($Y$) | Rastreia objetos ativos que cruzam a linha |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É uma das técnicas geométricas mais poderosas para transformar complexidades espaciais contínuas em eventos computáveis.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/sweepline-geometry/DSA-ADV-SWEEPLINE-002.md', `---
id: DSA-ADV-SWEEPLINE-002
title: "The Skyline Problem (LeetCode 218) com Sweep-Line e TreeMap de Alturas em O(N log N)"
tags:
  - level::l3-junior
  - topic::dsa::sweepline-geometry
  - company::google
  - freq::high
---

## Pergunta
Como a técnica de **Sweep-Line com TreeMap de contagem de alturas** resolve **The Skyline Problem** em tempo $O(N \\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Convertemos cada edifício $[L, R, H]$ em 2 eventos na coordenada $X$:
  - Evento de início em $L$ com altura $+H$.
  - Evento de fim em $R$ com altura $-H$.
- Ordenamos todos os eventos por $X$ (desempates: início com maior altura primeiro, término com menor altura primeiro).
- Mantemos um **TreeMap de frequências de alturas ativas**:
  - Ao processar um ponto $X$, adicionamos $+H$ ou decrementamos/removemos $-H$.
  - Consultamos a altura máxima ativa \`maxH = treeMap.lastKey()\`.
  - Se a altura máxima **mudou** em relação à anterior, adicionamos $[X, \\text{maxH}]$ ao contorno do horizonte (*Skyline*).
- **Complexidade**: $O(N \\log N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
| Evento de Edifício | Modificação no TreeMap | Condição de Ponto no Skyline |
|---|---|---|
| **Início em $L$ ($+H$)** | Incrementa contagem de $H$ | $\\text{maxH atual} \\neq \\text{maxH anterior}$ |
| **Fim em $R$ ($-H$)** | Decrementa/Remove altura $H$ | $\\text{maxH atual} \\neq \\text{maxH anterior}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O TreeMap com contadores de frequência substitui o Max-Heap puro porque permite remoção arbitrária de elementos em $O(\\log N)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/sweepline-geometry/DSA-ADV-SWEEPLINE-003.md', `---
id: DSA-ADV-SWEEPLINE-003
title: "Detecção de Interseção de Segmentos (Bentley-Ottmann) em O((N + K) log N)"
tags:
  - level::l3-junior
  - topic::dsa::sweepline-geometry
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Algoritmo de Bentley-Ottmann** encontra todas as $K$ interseções entre $N$ segmentos de reta em $O((N + K) \\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Testar todos os pares de segmentos custaria $O(N^2)$.
- **Bentley-Ottmann com Sweep-Line**:
  - Dois segmentos só podem se cruzar se forem **vizinhos adjacentes imediatos** no estado da linha de varredura (BST ordenada por $Y$).
  - **Eventos**: Ponto inicial de segmento, ponto final de segmento e ponto de interseção recém-descoberto.
  - A cada inserção/remoção na BST, testamos interseção **apenas entre os vizinhos adjacentes acima e abaixo**.
  - Ao encontrar uma interseção, inserimos o novo evento na fila para trocar a ordem relativa dos dois segmentos na BST após o cruzamento.
- **Complexidade**: $O((N + K) \\log N)$ tempo.

### Dual Coding Visual
| Abordagem | Pares Testados | Complexidade de Tempo |
|---|---|---|
| **Força Bruta** | Todos os $\\binom{N}{2}$ pares | $O(N^2)$ |
| **Bentley-Ottmann (Sweep-Line)** | Apenas vizinhos adjacentes na BST | $O((N + K) \\log N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Reduz dramaticamente o processamento gráfico em sistemas CAD e renderização de polígonos.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/sweepline-geometry/DSA-ADV-SWEEPLINE-001.md', `---
id: DSA-ADV-SWEEPLINE-001
title: "Fecho Convexo (Convex Hull) com Monotone Chain de Andrew e Graham Scan em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo **Monotone Chain de Andrew** constrói o Fecho Convexo (Convex Hull) de um conjunto de pontos 2D em $O(N \\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. Ordena todos os $N$ pontos lexicograficamente por $X$ (e depois por $Y$) em $O(N \\log N)$.
- 2. **Construção da Casca Inferior (*Lower Hull*)**:
  - Para cada ponto $P$: enquanto a pilha tiver $\\ge 2$ pontos e os últimos 3 pontos não formarem uma curva para a esquerda (produto vetorial $\\le 0$), desempilha o ponto anterior.
- 3. **Construção da Casca Superior (*Upper Hull*)**:
  - Repete o mesmo processo iterando os pontos em ordem reversa.
- 4. A união das duas cascas forma o Fecho Convexo mínimo.
- **Produto Vetorial 2D (Cross Product)**:
  $$\\text{cross}(A, B, C) = (B_x - A_x)(C_y - A_y) - (B_y - A_y)(C_x - A_x)$$
  - Se $> 0$: Curva para a esquerda (anti-horário, válido). Se $\\le 0$: Curva para a direita ou colinear (inválido).

### Dual Coding Visual
| Sinal do Produto Vetorial | Orientação dos 3 Pontos | Ação na Pilha Monótona |
|---|---|---|
| $\\text{cross}(A, B, C) > 0$ | Curva estritamente para a esquerda | Adiciona ponto $C$ |
| $\\text{cross}(A, B, C) \\le 0$ | Curva para a direita ou reto | Desempilha $B$ (viola convexidade) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O algoritmo Monotone Chain de Andrew é numericamente mais estável e fácil de implementar que o Graham Scan clássico por evitar cálculos trigonométricos de ângulos polares (\`atan2\`).

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/sweepline-geometry/DSA-ADV-SWEEPLINE-004.md', `---
id: DSA-ADV-SWEEPLINE-004
title: "Par de Pontos Mais Próximos (Closest Pair of Points) via Divisão e Conquista em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::meta
  - freq::high
---

## Pergunta
Como o algoritmo de Divisão e Conquista geométrico encontra o **Par de Pontos Mais Próximos** em tempo $O(N \\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. Ordena os pontos por coordenada $X$ e divide ao meio com uma linha vertical.
- 2. Resolve recursivamente para a metade esquerda e direita, obtendo a menor distância $d = \\min(d_L, d_R)$.
- 3. **Faixa Central (*Strip*)**: Filtra os pontos que estão a uma distância $< d$ da linha vertical de divisão e ordena-os por $Y$.
- 4. **Teorema Geométrico de Densidade**: Para cada ponto na faixa central, basta compará-lo com no máximo **7 pontos subsequentes** na lista ordenada por $Y$, pois uma caixa $d \\times 2d$ não pode conter mais de 8 pontos com distância mútua $\\ge d$.
- **Complexidade**: $T(N) = 2T(N/2) + O(N) = O(N \\log N)$.

### Dual Coding Visual
| Etapa do Algoritmo | Complexidade | Propriedade Chave |
|---|---|---|
| **Divisão e Conquista** | $2T(N/2)$ | Resolve metades esquerda e direita |
| **Faixa Central ($2d$)** | $O(N)$ | Compara com no máximo 7 vizinhos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Prova como uma análise geométrica rigorosa reduz um teste que seria quadrático na faixa central para tempo linear estrito.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/sweepline-geometry/DSA-ADV-SWEEPLINE-005.md', `---
id: DSA-ADV-SWEEPLINE-005
title: "União de Retângulos 2D (Rectangle Area II) com Sweep-Line e Segment Tree em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::apple
  - freq::high
---

## Pergunta
Como a combinação de **Linha de Varredura** com **Árvore de Segmentos (Segment Tree)** calcula a área total da união de retângulos em $O(N \\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Para cada retângulo $[x_1, y_1, x_2, y_2]$:
  - Cria um evento em $x_1$ inserindo o intervalo vertical $[y_1, y_2]$ com peso $+1$.
  - Cria um evento em $x_2$ removendo o intervalo $[y_1, y_2]$ com peso $-1$.
- Ordenamos todos os eventos por $X$.
- Mantemos uma **Segment Tree com compressão de coordenadas em $Y$**:
  - A raiz da Segment Tree reporta em $O(1)$ o comprimento total coberto no eixo $Y$ (\`totalCoveredY\`).
  - Ao avançar da posição anterior $x_{\\text{prev}}$ para a atual $x_{\\text{curr}}$:
    $$\\text{Área Acumulada} += \\text{totalCoveredY} \\times (x_{\\text{curr}} - x_{\\text{prev}})$$
- **Complexidade**: $O(N \\log N)$ tempo contra $O(N^2)$ da abordagem sem Segment Tree.

### Dual Coding Visual
| Evento no Eixo $X$ | Atualização na Segment Tree | Cálculo da Área da Faixa |
|---|---|---|
| Avanço $X_{i-1} \\to X_i$ | $\\pm 1$ no intervalo $[y_1, y_2]$ | $\\text{comprimentoY} \\times (X_i - X_{i-1})$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a técnica ideal para problemas de geometria computacional no LeetCode como *Rectangle Area II* (LeetCode 850).

</details>
`);

// 30. game-theory-math
writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/game-theory-math/DSA-ADV-GAMETHEORY-000.md', `---
id: DSA-ADV-GAMETHEORY-000
title: "Posições Vencedoras (N-Positions) e Perdedoras (P-Positions) em Jogos Imparciais"
tags:
  - level::l3-junior
  - topic::dsa::game-theory-math
  - company::google
  - freq::high
---

## Pergunta
O que caracteriza as **Posições Vencedoras (N-Positions)** e **Perdedoras (P-Positions)** na Teoria dos Jogos Combinatórios sob jogo normal?

## Resposta
### Quick Answer
**Solução Direta**:
- Sob a **Convenção de Jogo Normal** (o último jogador a fazer um movimento válido vence):
  - **P-Position (Previous Player Wins - Posição Perdedora para quem joga)**:
    - O estado terminal (sem movimentos válidos) é uma P-Position.
    - De uma P-Position, **qualquer movimento possível** leva obrigatoriamente a uma N-Position.
  - **N-Position (Next Player Wins - Posição Vencedora para quem joga)**:
    - De uma N-Position, existe **ao menos um movimento válido** que transita para uma P-Position (deixando o oponente em estado de derrota).
- Um jogador perfeito sempre escolhe o movimento que força o oponente a cair em uma P-Position.

### Dual Coding Visual
| Tipo de Posição | Significado Prático | Movimentos Disponíveis |
|---|---|---|
| **P-Position** | Quem está com a vez perde | Todos os movimentos levam a N-Positions |
| **N-Position** | Quem está com a vez vence | Ao menos 1 movimento leva a P-Position |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A determinação de vitória em jogos de soma zero finitos é obtida rotulando os estados dos nós do grafo de baixo para cima (retroanálise).

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/game-theory-math/DSA-ADV-GAMETHEORY-002.md', `---
id: DSA-ADV-GAMETHEORY-002
title: "Jogo de Nim e o Teorema de Bouton (Nim-Sum via XOR) em Tempo O(N)"
tags:
  - level::l3-junior
  - topic::dsa::game-theory-math
  - company::meta
  - freq::high
---

## Pergunta
Como o **Teorema de Bouton** utiliza a **Soma de Nim (XOR acumulado das pilhas)** para determinar instantaneamente o vencedor do Jogo de Nim?

## Resposta
### Quick Answer
**Solução Direta**:
- Sejam $n$ pilhas de moedas com tamanhos $x_1, x_2, \\dots, x_n$.
- A **Soma de Nim** é calculada como o XOR bitwise de todos os tamanhos de pilha:
  $$S = x_1 \\oplus x_2 \\oplus \\dots \\oplus x_n$$
- **Teorema de Bouton**:
  - Se **$S = 0$**: O estado é uma **P-Position** (o primeiro jogador perde com jogo perfeito).
  - Se **$S \\neq 0$**: O estado é uma **N-Position** (o primeiro jogador vence garantidamente).
- **Estratégia Vencedora**: Sempre que $S \\neq 0$, o jogador atual pode alterar uma pilha $x_k$ para $x_k' = x_k \\oplus S < x_k$, restaurando a nova soma de Nim para $0$ e deixando o adversário em posição perdedora.

### Dual Coding Visual
| Soma de Nim ($S = \\bigoplus x_i$) | Tipo de Posição | Destino do Primeiro Jogador |
|---|---|---|
| $S = 0$ | P-Position | Derrota garantida contra jogo perfeito |
| $S \\neq 0$ | N-Position | Vitória garantida com jogada ótima |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Transforma a análise de combinações exponenciais de jogadas em um único cálculo linear de XOR $O(N)$ em tempo constante de memória $O(1)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/game-theory-math/DSA-ADV-GAMETHEORY-003.md', `---
id: DSA-ADV-GAMETHEORY-003
title: "Teorema de Sprague-Grundy e a Função MEX para Jogos Combinados e Grafos"
tags:
  - level::l3-junior
  - topic::dsa::game-theory-math
  - company::amazon
  - freq::high
---

## Pergunta
Como o **Teorema de Sprague-Grundy** e a função **MEX (Minimum Excluded Value)** convertem qualquer jogo imparcial em um jogo equivalente de Nim?

## Resposta
### Quick Answer
**Solução Direta**:
- **Função MEX (Minimum Excluded Value)**: Para um conjunto de inteiros não-negativos $S$, $\\text{MEX}(S)$ é o menor inteiro $\\ge 0$ que **não** pertence a $S$ (ex: $\\text{MEX}(\\{0, 1, 3\\}) = 2$).
- **Valor de Grundy ($G(u)$)** de um estado $u$:
  $$G(u) = \\text{MEX}(\\{ G(v) : u \\to v \\text{ é uma jogada válida} \\})$$
- **Teorema de Sprague-Grundy**: Qualquer jogo imparcial composto pela união de múltiplos subjogo independentes $J_1, J_2, \\dots, J_k$ é matematicamente idêntico a um Jogo de Nim cujos tamanhos de pilhas são os valores de Grundy:
  $$G_{\\text{global}} = G(J_1) \\oplus G(J_2) \\oplus \\dots \\oplus G(J_k)$$
  - Se $G_{\\text{global}} \\neq 0$, o primeiro jogador vence.

### Dual Coding Visual
| Componente | Definição Matemática | Papel no Jogo |
|---|---|---|
| **MEX** | Menor inteiro $\\ge 0$ ausente | Atribui valor ao estado |
| **Grundy XOR** | $G_1 \\oplus G_2 \\oplus \\dots \\oplus G_k$ | Determina vitória no jogo composto |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a ferramenta universal mais importante da Teoria dos Jogos Combinatórios para resolver problemas compostos no LeetCode.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/game-theory-math/DSA-ADV-GAMETHEORY-001.md', `---
id: DSA-ADV-GAMETHEORY-001
title: "Algoritmo Minimax e Poda Alfa-Beta (Alpha-Beta Pruning) para Jogos com 2 Jogadores"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::google
  - freq::high
---

## Pergunta
Como a **Poda Alfa-Beta (Alpha-Beta Pruning)** reduz o número de nós avaliados pelo Algoritmo Minimax de $O(B^d)$ para $O(B^{d/2})$?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo **Minimax** assume que o jogador MAX tenta maximizar a pontuação e MIN tenta minimizá-la.
- **Poda Alfa-Beta**: Mantém dois limites na árvore de recursão:
  - $\\alpha$: A melhor pontuação que o jogador MAX já garantiu até o momento.
  - $\\beta$: A melhor pontuação que o jogador MIN já garantiu até o momento.
- **Condição de Poda**: Se em qualquer nó for detectado que **$\\beta \\le \\alpha$**, a busca naquele ramo é **imediatamente abortada**:
  - Significa que o oponente em um nível superior jamais permitirá que o jogo chegue a este estado, tornando inútil calcular seus filhos.
- **Complexidade**: Com ordenação ótima de jogadas, reduz a árvore de $O(B^d)$ para **$O(B^{d/2})$**, dobrando a profundidade explorável no mesmo tempo.

### Dual Coding Visual
| Parâmetro de Poda | Papel na Busca | Condição de Corte |
|---|---|---|
| **$\\alpha$ (Alfa)** | Maximizador (Piso de pontuação) | Se $\\beta \\le \\alpha \\implies$ Poda ramo |
| **$\\beta$ (Beta)** | Minimizador (Teto de pontuação) | Se $\\beta \\le \\alpha \\implies$ Poda ramo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É o algoritmo central para motores de jogos clássicos como Xadrez, Damas e Jogo da Velha (Tic-Tac-Toe).

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/game-theory-math/DSA-ADV-GAMETHEORY-004.md', `---
id: DSA-ADV-GAMETHEORY-004
title: "Algoritmo de Euclides Estendido e Inverso Modular (a·x = 1 mod m)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::meta
  - freq::high
---

## Pergunta
Como o **Algoritmo de Euclides Estendido** calcula o **Inverso Modular** $a^{-1} \\pmod m$ resolvendo a identidade de Bézout em tempo $O(\\log(\\min(a, m)))$?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo calcula os coeficientes inteiros $x$ e $y$ da **Identidade de Bézout**:
  $$a \\cdot x + m \\cdot y = \\gcd(a, m)$$
- Se $\\gcd(a, m) = 1$ (coprimos):
  $$a \\cdot x + m \\cdot y = 1 \\implies a \\cdot x \\equiv 1 \\pmod m$$
- Logo, $x \\pmod m$ é o **Inverso Modular de $a$ módulo $m$**, permitindo executar divisão modular:
  $$\\frac{u}{a} \\pmod m = (u \\cdot x) \\pmod m$$
- **Pequeno Teorema de Fermat** (caso $m$ seja primo): $a^{-1} \\equiv a^{m-2} \\pmod m$, calculado em $O(\\log m)$ via exponenciação binária.

### Dual Coding Visual
| Método de Inverso Modular | Condição para Módulo $m$ | Complexidade |
|---|---|---|
| **Pequeno Teorema de Fermat** | $m$ deve ser **Primo** ($a^{m-2}$) | $O(\\log m)$ |
| **Euclides Estendido** | Apenas $\\gcd(a, m) = 1$ | $O(\\log(\\min(a, m)))$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Essencial para o cálculo de combinações $\\binom{N}{K} \\pmod{10^9+7}$ em problemas de contagem e criptografia RSA.

</details>
`);

writeAndValidateCard('decks/01-dsa/advanced-dsa-string-math/game-theory-math/DSA-ADV-GAMETHEORY-005.md', `---
id: DSA-ADV-GAMETHEORY-005
title: "Crivo de Eratóstenes Linear (Crivo de Euler) para Fatoração em Tempo O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::apple
  - freq::high
---

## Pergunta
Como o **Crivo Linear (Crivo de Euler)** visita cada número composto exatamente uma única vez para encontrar todos os primos até $N$ em tempo estritamente $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O Crivo de Eratóstenes tradicional marca o mesmo número composto múltiplas vezes (ex: $12$ é marcado pelo primo $2$ e pelo $3$), resultando em $O(N \\log \\log N)$.
- **Crivo Linear ($O(N)$)**:
  - Mantém uma lista de números primos encontrados e um array \`minPrime[i]\` (o menor fator primo de $i$).
  - Para cada $i$ de $2$ a $N$:
    - Se \`minPrime[i] == 0\`, $i$ é primo $\\to$ adiciona à lista de primos e \`minPrime[i] = i\`.
    - Para cada primo $p \\le \\text{minPrime}[i]$ tal que $i \\cdot p \\le N$:
      - Marca $\\text{minPrime}[i \\cdot p] = p$.
      - **Condição de Parada Única**: Se $i \\% p == 0$, interrompe o loop interno com \`break\`.
- Como cada composto é marcado exclusivamente pelo seu **menor fator primo**, a complexidade é **estritamente $O(N)$**.

### Dual Coding Visual
| Algoritmo de Crivo | Visitas por Número Composto | Complexidade de Tempo |
|---|---|---|
| **Eratóstenes Tradicional** | Múltiplas vezes (uma por fator primo) | $O(N \\log \\log N)$ |
| **Crivo Linear (Euler)** | **Exatamente 1 vez** (Apenas pelo menor fator) | **$O(N)$ Estrito** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Crivo Linear
\`\`\`java
import java.util.*;

public class LinearSieve {
  public static List<Integer> getPrimes(int n) {
    int[] minPrime = new int[n + 1];
    List<Integer> primes = new ArrayList<>();

    for (int i = 2; i <= n; i++) {
      if (minPrime[i] == 0) {
        minPrime[i] = i;
        primes.add(i);
      }
      for (int p : primes) {
        if (p > minPrime[i] || i * p > n) break;
        minPrime[i * p] = p;
      }
    }
    return primes;
  }
}
\`\`\`

#### Key Takeaways
- Além de listar primos, o array \`minPrime[]\` permite fatorar qualquer número $\\le N$ em tempo logarítmico ótimo $O(\\log N)$.

</details>
`);

console.log('✅ Module 3 subtopics (27 to 30) decomposed.');
