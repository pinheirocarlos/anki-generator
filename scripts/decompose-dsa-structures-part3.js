import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Module 1 Part 3: Trees, Tries, Heaps, DSU, Graphs & Advanced Trees...');

// 5. trees-bst
writeAndValidateCard('decks/01-dsa/data-structures/trees-bst/DSA-STRUCT-TREE-000.md', `---
id: DSA-STRUCT-TREE-000
title: "Definição e Propriedades Estruturais de uma Árvore Binária"
tags:
  - level::l3-junior
  - topic::dsa::trees-bst
  - company::apple
  - freq::high
---

## Pergunta
O que define formalmente uma **Árvore Binária** e quais são suas propriedades estruturais básicas?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Árvore Binária** é uma estrutura de dados hierárquica e não-linear composta por nós, onde:
  - Existe um nó raiz único (\`root\`) sem pai.
  - Cada nó possui **no máximo dois filhos**, denominados \`left\` (filho esquerdo) e \`right\` (filho direito).
  - Cada nó não-raiz possui exatamente um nó pai.
- Em uma árvore binária perfeitamente balanceada de altura $H$, ela pode armazenar até $2^{H+1} - 1$ nós, garantindo $H = \\lfloor \\log_2 N \\rfloor$.

### Dual Coding Visual
| Propriedade de Árvore | Fórmula Matemática | Exemplo ($H = 3$) |
|---|---|---|
| **Nós no nível $k$** | $2^k$ nós | Nível 3 tem até 8 nós |
| **Total de nós (Cheia)** | $2^{H+1} - 1$ nós | $H=3 \\to 15$ nós |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Tipos Estruturais
- **Full Binary Tree**: Todo nó possui 0 ou 2 filhos.
- **Complete Binary Tree**: Todos os níveis estão totalmente preenchidos, exceto possivelmente o último, que é preenchido da esquerda para a direita (base para Heaps).
- **Perfect Binary Tree**: Todos os nós internos possuem 2 filhos e todas as folhas estão no mesmo nível.

#### Key Takeaways
- A propriedade de divisão binária reduz o espaço de busca pela metade a cada passo, sendo o alicerce de algoritmos $O(\\log N)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/trees-bst/DSA-STRUCT-TREE-002.md', `---
id: DSA-STRUCT-TREE-002
title: "Invariante Fundamental de uma Árvore Binária de Busca (BST)"
tags:
  - level::l3-junior
  - topic::dsa::trees-bst
  - company::google
  - freq::high
---

## Pergunta
Qual é a invariante matemática fundamental que caracteriza uma **Árvore Binária de Busca (BST - Binary Search Tree)**?

## Resposta
### Quick Answer
**Solução Direta**:
- Para todo nó $N$ da árvore:
  1. Todos os nós na subárvore esquerda possuem chaves **estritamente menores** que a chave de $N$ ($\\text{left.val} < N.\\text{val}$).
  2. Todos os nós na subárvore direita possuem chaves **estritamente maiores** que a chave de $N$ ($\\text{right.val} > N.\\text{val}$).
  3. Ambas as subárvores esquerda e direita são também árvores binárias de busca válidas.

### Dual Coding Visual
| Posição do Nó | Relação de Valor com $N$ | Direção de Busca para Alvo $X$ |
|---|---|---|
| **Subárvore Esquerda** | $\\text{val} < N.\\text{val}$ | Se $X < N.\\text{val}$, vá para esquerda |
| **Subárvore Direita** | $\\text{val} > N.\\text{val}$ | Se $X > N.\\text{val}$, vá para direita |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Busca em BST
\`\`\`java
public class BSTSearch {
  public TreeNode searchBST(TreeNode root, int val) {
    if (root == null || root.val == val) return root;
    if (val < root.val) return searchBST(root.left, val);
    return searchBST(root.right, val);
  }
}
\`\`\`

#### Key Takeaways
- A invariante da BST permite descartar metade da árvore a cada comparação durante a busca quando a árvore está balanceada.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/trees-bst/DSA-STRUCT-TREE-003.md', `---
id: DSA-STRUCT-TREE-003
title: "Travessia In-order e Visita Ordenada em Árvores Binárias de Busca"
tags:
  - level::l3-junior
  - topic::dsa::trees-bst
  - company::amazon
  - freq::high
---

## Pergunta
Por que a travessia **In-order (Em-ordem)** visita os elementos de uma BST estritamente em ordem crescente?

## Resposta
### Quick Answer
**Solução Direta**:
- A travessia In-order segue a ordem recursiva rígida:
  1. Visitar recursivamente a **Subárvore Esquerda** (todos os nós $< \\text{nó atual}$).
  2. Visitar o **Nó Atual** (valor mediano local).
  3. Visitar recursivamente a **Subárvore Direita** (todos os nós $> \\text{nó atual}$).
- Pela própria invariante da BST, esse padrão garante que nenhum elemento maior seja processado antes de seus predecessores menores, gerando uma sequência monotônica estritamente ordenada em tempo linear $O(N)$.

### Dual Coding Visual
| Ordem de Travessia | Sequência de Passos | Propriedade em BST |
|---|---|---|
| **In-order** | Esquerda $\\to$ Raiz $\\to$ Direita | Produz array ordenado ($O(N)$) |
| **Pre-order** | Raiz $\\to$ Esquerda $\\to$ Direita | Serialização da árvore |
| **Post-order** | Esquerda $\\to$ Direita $\\to$ Raiz | Liberação de memória / Bottom-up |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Validação de BST (LeetCode 98)
Um método eficiente para validar se uma árvore binária é uma BST válida consiste em executar uma travessia in-order e verificar se cada elemento visitado é estritamente maior que o elemento anterior (\`prev < curr.val\`).

#### Key Takeaways
- A travessia In-order é a forma mais direta de recuperar todos os $N$ elementos ordenados de uma BST em $O(N)$ tempo e $O(H)$ espaço de pilha.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/trees-bst/DSA-STRUCT-TREE-001.md', `---
id: DSA-STRUCT-TREE-001
title: "Rotações Simples e Duplas em Árvores Auto-Balanceadas (AVL / Red-Black)"
tags:
  - level::l4-pleno
  - topic::dsa::trees-bst
  - company::oracle
  - freq::high
---

## Pergunta
Como as rotações simples e duplas (LL, RR, LR, RL) reequilibram a altura de uma árvore auto-balanceada em tempo $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Rotações são operações locais de troca de ponteiros em tempo $O(1)$ que preservam estritamente a invariante de ordenação da BST enquanto diminuem a altura da subárvore:
  - **Rotação Simples à Direita (LL)**: Corrige desbalanceamento causado por inserção na subárvore esquerda do filho esquerdo. O filho esquerdo sobe para a raiz.
  - **Rotação Simples à Esquerda (RR)**: Corrige inserção no filho direito da direita. O filho direito sobe.
  - **Rotação Dupla (LR)**: Rotação à esquerda no filho esquerdo seguida de rotação à direita na raiz.
  - **Rotação Dupla (RL)**: Rotação à direita no filho direito seguida de rotação à esquerda na raiz.

### Dual Coding Visual
| Tipo de Desbalanceamento | Caso | Rotação Necessária |
|---|---|---|
| **Esquerda-Esquerda** | LL | Rotação Simples à Direita ($O(1)$) |
| **Direita-Direita** | RR | Rotação Simples à Esquerda ($O(1)$) |
| **Esquerda-Direita** | LR | Rotação Dupla: Esquerda + Direita |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Rotação Simples à Direita
\`\`\`java
private Node rotateRight(Node y) {
  Node x = y.left;
  Node t2 = x.right;

  // Realiza a rotação
  x.right = y;
  y.left = t2;

  // Atualiza alturas
  y.height = Math.max(height(y.left), height(y.right)) + 1;
  x.height = Math.max(height(x.left), height(x.right)) + 1;

  return x; // Nova raiz
}
\`\`\`

#### Key Takeaways
- Como apenas um número fixo de ponteiros é atualizado ($O(1)$ por rotação), a reinserção balanceada completa executa em $O(\\log N)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/trees-bst/DSA-STRUCT-TREE-004.md', `---
id: DSA-STRUCT-TREE-004
title: "Trade-offs Práticos: Árvores AVL vs Red-Black Trees em Bibliotecas Padrão"
tags:
  - level::l4-pleno
  - topic::dsa::trees-bst
  - company::google
  - freq::high
---

## Pergunta
Quais são os trade-offs práticos entre **Árvores AVL** e **Red-Black Trees** e por que Red-Black Trees são predominantes em bibliotecas padrão de linguagens?

## Resposta
### Quick Answer
**Solução Direta**:
- **Árvores AVL**:
  - Balanceamento estrito ($|\\text{alt}(E) - \\text{alt}(D)| \\le 1$).
  - Árvore mais rasa e compacta $\\to$ **Buscas mais rápidas**.
  - Exige mais rotações em inserções e deleções. Ideal para cenários *Read-Heavy*.
- **Red-Black Trees**:
  - Balanceamento mais frouxo (o caminho mais longo tem no máximo o dobro do mais curto).
  - Exige no máximo **2 rotações por inserção** e 3 por deleção $\\to$ **Inserções e deleções muito mais rápidas**.
  - Escolhida para \`std::map\` (C++), \`TreeMap\` (Java) e o escalonador CFS do kernel Linux (*Workloads mistos*).

### Dual Coding Visual
| Critério | Árvore AVL | Red-Black Tree |
|---|---|---|
| **Foco de Performance** | Leituras ultra-rápidas | Inserções / Deleções rápidas |
| **Altura Máxima** | $\\approx 1.44 \\log_2 N$ | $\\approx 2 \\log_2 N$ |
| **Uso em Bibliotecas** | Caches / Índices estáticos | \`java.util.TreeMap\`, C++ STL |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Red-Black Trees amortizam muito melhor o custo de rebalanceamento contínuo sob intensa taxa de modificação de dados.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/trees-bst/DSA-STRUCT-TREE-005.md', `---
id: DSA-STRUCT-TREE-005
title: "Degeneração de BST em Lista Ligada O(N) vs Garantia O(log N)"
tags:
  - level::l4-pleno
  - topic::dsa::trees-bst
  - company::meta
  - freq::high
---

## Pergunta
Como ocorre a **degeneração de uma BST simples em uma lista encadeada** com busca $O(N)$ no pior caso?

## Resposta
### Quick Answer
**Solução Direta**:
- Se inserirmos elementos já ordenados (ex: \`1, 2, 3, 4, 5\`) em uma BST ingênua sem auto-balanceamento:
  - Cada novo nó é inserido exclusivamente como filho direito do nó anterior.
  - A árvore se transforma em uma cadeia linear unidimensional (lista encadeada) de altura $H = N$.
- A complexidade de busca, inserção e remoção degrada de $O(\\log N)$ para o pior caso desastroso de **$O(N)$ linear**.

### Dual Coding Visual
| Estrutura | Inserção Ordenada (\`1,2,3,4\`) | Custo de Busca de Alvo |
|---|---|---|
| **BST Ingênua** | Vira lista: \`1->2->3->4\` | $O(N)$ Pior Caso |
| **Árvore Balanceada** | Mantém \`2\` na raiz com \`1\` e \`3,4\` | $O(\\log N)$ Garantido |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Essa vulnerabilidade de pior caso $O(N)$ torna a BST ingênua inadequada para sistemas de produção sem garantias de balanceamento (AVL, Red-Black ou B-Trees).

</details>
`);

// 6. trie-prefix-tree
writeAndValidateCard('decks/01-dsa/data-structures/trie-prefix-tree/DSA-STRUCT-TRIE-000.md', `---
id: DSA-STRUCT-TRIE-000
title: "Estrutura de uma Trie (Árvore de Prefixos) e Compartilhamento de Prefixos"
tags:
  - level::l3-junior
  - topic::dsa::trie-prefix-tree
  - company::google
  - freq::high
---

## Pergunta
O que é uma **Trie (Árvore de Prefixos)** e como ela compartilha prefixos comuns entre palavras armazenadas?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Trie** é uma árvore $k$-ária onde cada nó representa um caractere e as arestas conectam caracteres sequenciais de uma palavra.
- Palavras que compartilham o mesmo prefixo (ex: \`"car" e "card"\`) compartilham exatamente os mesmos nós iniciais (\`c -> a -> r\`).
- Um flag booleano \`isEndOfWord\` no nó marca quando aquele caminho forma uma palavra completa válida, economizando espaço ao evitar duplicação de prefixos.

### Dual Coding Visual
| Estrutura de Busca | Custo de Busca por Palavra de Tam $L$ | Busca por Prefixo |
|---|---|---|
| **Hash Map** | $O(L)$ cálculo do hash | $O(N \\times L)$ Varredura total |
| **Trie** | $O(L)$ Caractere a caractere | $O(P)$ onde $P$ é tam do prefixo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Diagrama de Nós Compartilhados
\`\`\`text
         (root)
           |
           'c'
           |
           'a'
           |
           'r' (isEnd: true -> "car")
           |
           'd' (isEnd: true -> "card")
\`\`\`

#### Key Takeaways
- Em uma Trie, a complexidade de busca é totalmente independente do número total de palavras $N$ cadastradas; ela depende unicamente do comprimento $L$ da palavra consultada.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/trie-prefix-tree/DSA-STRUCT-TRIE-002.md', `---
id: DSA-STRUCT-TRIE-002
title: "Operações de Inserção, Busca Exata e Verificação de Prefixo em Trie em O(L)"
tags:
  - level::l3-junior
  - topic::dsa::trie-prefix-tree
  - company::amazon
  - freq::high
---

## Pergunta
Como uma Trie executa as operações de **inserção**, **busca exata** e **\`startsWith\`** em tempo $O(L)$ proporcional ao tamanho da palavra?

## Resposta
### Quick Answer
**Solução Direta**:
- **\`insert(word)\`**: Percorre cada caractere da palavra a partir da raiz; se o nó filho para o caractere atual não existe, aloca-o. No último caractere, marca \`isEndOfWord = true\` ($O(L)$).
- **\`search(word)\`**: Percorre os nós correspondentes aos caracteres; se algum caractere não existir, retorna \`false\`. No final, retorna \`curr.isEndOfWord\` ($O(L)$).
- **\`startsWith(prefix)\`**: Idêntico ao \`search\`, mas no final retorna \`true\` se alcançar o último caractere do prefixo, sem exigir que seja o fim de uma palavra ($O(P)$).

### Dual Coding Visual
| Operação em Trie | Critério de Sucesso | Complexidade de Tempo |
|---|---|---|
| **\`insert(word)\`** | Todos os nós criados + \`isEnd=true\` | $O(L)$ |
| **\`search(word)\`** | Caminho existe e \`isEnd == true\` | $O(L)$ |
| **\`startsWith(p)\`** | Caminho existe (ignora \`isEnd\`) | $O(P)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Classe Trie
\`\`\`java
public class Trie {
  private static class Node {
    Node[] children = new Node[26];
    boolean isEndOfWord = false;
  }

  private final Node root = new Node();

  public void insert(String word) {
    Node curr = root;
    for (char c : word.toCharArray()) {
      int idx = c - 'a';
      if (curr.children[idx] == null) curr.children[idx] = new Node();
      curr = curr.children[idx];
    }
    curr.isEndOfWord = true;
  }

  public boolean search(String word) {
    Node node = findPrefixNode(word);
    return node != null && node.isEndOfWord;
  }

  public boolean startsWith(String prefix) {
    return findPrefixNode(prefix) != null;
  }

  private Node findPrefixNode(String str) {
    Node curr = root;
    for (char c : str.toCharArray()) {
      int idx = c - 'a';
      if (curr.children[idx] == null) return null;
      curr = curr.children[idx];
    }
    return curr;
  }
}
\`\`\`

#### Key Takeaways
- A operação \`startsWith\` é a grande vantagem da Trie sobre Tabelas Hash, permitindo consultas instantâneas de prefixos.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/trie-prefix-tree/DSA-STRUCT-TRIE-003.md', `---
id: DSA-STRUCT-TRIE-003
title: "Implementação de Autocomplete e Sugestões de Busca com Trie e DFS"
tags:
  - level::l3-junior
  - topic::dsa::trie-prefix-tree
  - company::twitter
  - freq::high
---

## Pergunta
Como implementar um mecanismo de **Autocomplete** de palavras combinando busca em Trie com travessia DFS?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo de Autocomplete divide-se em duas etapas:
  1. **Localizar o Nó do Prefixo**: Percorre a Trie com o prefixo digitado pelo usuário em $O(P)$ até o nó terminal $N_{\\text{prefix}}$.
  2. **Explorar Sugestões via DFS**: A partir de $N_{\\text{prefix}}$, executa uma busca em profundidade (DFS) para coletar todas as palavras com flag \`isEndOfWord == true\` na subárvore abaixo daquele nó.
- **Complexidade**: $O(P + K)$, onde $P$ é o tamanho do prefixo e $K$ é o número total de caracteres explorados na subárvore de sugestões.

### Dual Coding Visual
| Etapa do Autocomplete | Algoritmo | Complexidade |
|---|---|---|
| **1. Navegação de Prefixo** | Busca padrão em Trie | $O(P)$ |
| **2. Coleta de Palavras** | DFS na subárvore | $O(K)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a espinha dorsal de caixas de sugestão de busca (Google Search / Typeahead) e corretores ortográficos de teclado.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/trie-prefix-tree/DSA-STRUCT-TRIE-001.md', `---
id: DSA-STRUCT-TRIE-001
title: "Radix Tree (Compressed Trie) e Compressão de Cadeias Unárias"
tags:
  - level::l4-pleno
  - topic::dsa::trie-prefix-tree
  - company::amazon
  - freq::high
---

## Pergunta
Como a **Radix Tree (Compressed / Compact Trie / Patricia Tree)** reduz o consumo de memória ao comprimir cadeias de caracteres unários?

## Resposta
### Quick Answer
**Solução Direta**:
- Em uma Trie tradicional, nós intermediários que possuem **exatamente 1 único filho** e não marcam fim de palavra geram overhead excessivo de alocação de nós.
- A **Radix Tree** compacta essas cadeias consecutivas de nós unários em uma **única aresta contendo uma string**:
  - Exemplo: A cadeia de nós \`r -> o -> o -> t\` é comprimida em uma única aresta rotulada como \`"root"\`.
- Isso reduz drasticamente o número total de nós alocados e economiza memória de ponteiros em até 70%.

### Dual Coding Visual
| Estrutura | Sequência \`"inter"\` sem bifurcação | Quantidade de Nós |
|---|---|---|
| **Trie Padrão** | \`'i' -> 'n' -> 't' -> 'e' -> 'r'\` | 5 nós alocados |
| **Radix Tree** | Aresta única \`"inter"\` | 1 nó alocado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Usos em Engenharia
- A Radix Tree é amplamente utilizada em **Roteadores IP (CIDR lookup)** e em roteadores HTTP de frameworks web modernos (ex: Gin em Go, Express e Fastify).

#### Key Takeaways
- A compactação mantém a velocidade $O(L)$ de busca enquanto elimina a maior desvantagem da Trie: o desperdício de memória por ponteiros esparsos.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/trie-prefix-tree/DSA-STRUCT-TRIE-004.md', `---
id: DSA-STRUCT-TRIE-004
title: "Bitwise Trie (Trie Binária) para Maximum XOR de Dois Números em O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::trie-prefix-tree
  - company::meta
  - freq::high
---

## Pergunta
Como uma **Bitwise Trie (Trie Binária de Bits)** resolve o problema clássico de *Maximum XOR of Two Numbers in an Array* em tempo linear $O(32N) = O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Inserimos a representação binária de 32 bits de todos os $N$ números em uma Trie onde cada nó possui apenas 2 filhos: \`children[0]\` e \`children[1]\`.
- Para cada número $X$:
  - Para cada bit $b$ de $X$ (do bit mais significativo 31 ao 0), tentamos gulosamente navegar pelo bit oposto $1 - b$ na Trie (pois $b \\oplus (1-b) = 1$, maximizando o bit resultante).
  - Se o caminho com o bit oposto existir, somamos $2^k$ ao resultado; se não existir, seguimos pelo caminho do próprio bit $b$.
- **Complexidade**: $O(32N) = O(N)$ linear contra $O(N^2)$ da força bruta com pares.

### Dual Coding Visual
| Abordagem | Tempo de Execução | Decisão de Bit em Cada Passo |
|---|---|---|
| **Pares Força Bruta** | $O(N^2)$ Quadrático | Nenhuma ($N^2$ cálculos) |
| **Bitwise Trie** | $O(32N) = O(N)$ | Escolhe gulosa do bit oposto $1-b$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Bitwise Trie XOR
\`\`\`java
public class BitwiseTrieXOR {
  private static class Node {
    Node[] children = new Node[2];
  }

  private final Node root = new Node();

  public void insert(int num) {
    Node curr = root;
    for (int i = 31; i >= 0; i--) {
      int bit = (num >> i) & 1;
      if (curr.children[bit] == null) curr.children[bit] = new Node();
      curr = curr.children[bit];
    }
  }

  public int findMaxXOR(int num) {
    Node curr = root;
    int maxVal = 0;
    for (int i = 31; i >= 0; i--) {
      int bit = (num >> i) & 1;
      int oppBit = 1 - bit;
      if (curr.children[oppBit] != null) {
        maxVal |= (1 << i);
        curr = curr.children[oppBit];
      } else {
        curr = curr.children[bit];
      }
    }
    return maxVal;
  }
}
\`\`\`

#### Key Takeaways
- Bitwise Tries são o padrão ouro para problemas de otimização de operações bitwise com restrições lineares.

</details>
`);

writeAndValidateCard('decks/01-dsa/data-structures/trie-prefix-tree/DSA-STRUCT-TRIE-005.md', `---
id: DSA-STRUCT-TRIE-005
title: "Trade-offs de Memória: Array de Ponteiros vs Hash Map nos Nós da Trie"
tags:
  - level::l4-pleno
  - topic::dsa::trie-prefix-tree
  - company::google
  - freq::high
---

## Pergunta
Quais os trade-offs de velocidade e consumo de memória entre usar um **Array Fixo de Ponteiros** (\`Node[26]\`) versus um **Hash Map** nos nós de uma Trie?

## Resposta
### Quick Answer
**Solução Direta**:
- **Array Fixo (\`Node[26]\`)**:
  - Acesso $O(1)$ instantâneo por aritmética de índice (\`c - 'a'\`).
  - Desperdício massivo de memória se o alfabeto for grande (ex: Unicode/UTF-8) ou se a Trie for esparsa (a maioria dos 26 ponteiros fica \`null\`).
- **Hash Map (\`Map<Character, Node>\`)**:
  - Aloca ponteiros estritamente sob demanda para os caracteres existentes $\\to$ **Excelente eficiência de memória**.
  - Pequeno overhead adicional de hashing e indireção de objetos.

### Dual Coding Visual
| Estratégia de Nós | Acesso por Caractere | Consumo de Memória |
|---|---|---|
| **Array Fixo \`Node[26]\`** | $O(1)$ Ultra-rápido | Alto (26 ponteiros por nó) |
| **\`Map<Character, Node>\`** | $O(1)$ Médio (hash) | Mínimo (apenas caracteres reais) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Para alfabetos restritos (\`a-z\`), arrays fixos são preferíveis por velocidade; para caracteres gerais ou Unicode, o uso de Hash Maps ou Radix Trees é obrigatório.

</details>
`);

console.log('✅ trees-bst and trie-prefix-tree decomposed.');
