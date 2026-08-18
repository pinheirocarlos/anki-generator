import { writeAndValidateCard } from './decompose-helper.js';

console.log('🚀 Decomposing Module 2 Part 2b: Backtrack, Bitwise, Sorting & Monotonic (23 to 26)...');

// 23. backtracking
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/backtracking/DSA-PATT-BACKTRACK-000.md', `---
id: DSA-PATT-BACKTRACK-000
title: "Conceito de Backtracking como DFS com Poda sobre Árvores de Decisão"
tags:
  - level::l3-junior
  - topic::dsa::backtracking
  - company::meta
  - freq::high
---

## Pergunta
O que define o paradigma de **Backtracking** e como a **Poda (Pruning)** evita a explosão combinatória da força bruta?

## Resposta
### Quick Answer
**Solução Direta**:
- **Backtracking** é uma busca exaustiva em profundidade (DFS) sobre uma árvore de decisões que constrói candidatos à solução incrementalmente:
  1. **Escolha**: Toma uma decisão adicionando um elemento ao caminho (\`path.add(x)\`).
  2. **Exploração**: Chama recursivamente a função para o próximo nível.
  3. **Desfazer (Backtrack)**: Reverte a decisão removendo o elemento (\`path.removeLast()\`) para testar o próximo ramo.
- **Poda (Pruning)**: Aborta ramos inteiros assim que uma restrição de negócio for violada (ex: soma já ultrapassou o alvo), evitando explorar subárvores inviáveis.

### Dual Coding Visual
| Etapa de Backtracking | Ação no Estado | Reversão na Saída |
|---|---|---|
| **1. Escolha** | \`path.add(candidate)\` | Estado modificado |
| **2. Recursão** | \`backtrack(nextIndex, path)\` | Explora subárvore |
| **3. Backtrack** | \`path.remove(path.size() - 1)\` | Estado restaurado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O Backtracking consome apenas $O(\\text{profundidade})$ de memória auxiliar (reutilizando a mesma lista \`path\`), em contraste com a criação de novas listas a cada chamada.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/backtracking/DSA-PATT-BACKTRACK-002.md', `---
id: DSA-PATT-BACKTRACK-002
title: "Padrão Subsets (2^N) vs Permutations (N!) vs Combinations"
tags:
  - level::l3-junior
  - topic::dsa::backtracking
  - company::google
  - freq::high
---

## Pergunta
Quais são as diferenças de estrutura de loop e complexidade entre os padrões de **Subsets ($O(2^N)$)**, **Permutations ($O(N!)$)** e **Combinations ($O(\\binom{N}{K})$)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Subsets (Subconjuntos - $O(2^N)$)**: A cada nível, adiciona o estado atual à resposta e itera a partir de \`start\` até $N-1$ (\`backtrack(i + 1)\`).
- **Permutations (Permutações - $O(N!)$)**: A ordem importa (\`[1,2] != [2,1]\`). Itera sempre de $0$ a $N-1$, utilizando um array booleano \`used[]\` para não repetir elementos já selecionados.
- **Combinations (Combinações - $O(\\binom{N}{K})$)**: Subsets de tamanho fixo $K$. Itera a partir de \`start\` até $N-1$, adicionando à resposta quando \`path.size() == k\`.

### Dual Coding Visual
| Problema Combinatório | Estrutura de Loop | Complexidade |
|---|---|---|
| **Subsets** | \`i = start .. N-1\` (Todos os passos) | $O(N \\cdot 2^N)$ |
| **Combinations** | \`i = start .. N-1\` (Quando \`len == K\`) | $O(K \\cdot \\binom{N}{K})$ |
| **Permutations** | \`i = 0 .. N-1\` (Com \`used[i]\`) | $O(N \\cdot N!)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em combinações e subsets, o parâmetro \`start\` garante que combinações espelhadas (como \`[2, 1]\` após \`[1, 2]\`) nunca sejam geradas.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/backtracking/DSA-PATT-BACKTRACK-003.md', `---
id: DSA-PATT-BACKTRACK-003
title: "Deduplicação em Backtracking com Elementos Repetidos (Subsets II / Combination Sum II)"
tags:
  - level::l3-junior
  - topic::dsa::backtracking
  - company::amazon
  - freq::high
---

## Pergunta
Como evitar a geração de subconjuntos e combinações duplicadas em Backtracking quando o array de entrada contém números repetidos?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. **Ordenamos o array preliminarmente** (\`Arrays.sort(nums)\`) para agrupar elementos idênticos adjacentes.
- 2. No loop de escolhas: se o elemento atual for igual ao anterior no mesmo nível de profundidade (\`i > start && nums[i] == nums[i - 1]\`), pulamos com **\`continue\`**.
- **Por que funciona**: A condição \`i > start\` permite usar o mesmo número duplicado em níveis mais profundos (ramos filhos), mas impede escolher o mesmo número mais de uma vez como a primeira opção daquele nível de ramificação (irmãos).

### Dual Coding Visual
| Nível de Decisão | Condição de Duplicata | Ação |
|---|---|---|
| **Primeiro item do nível (\`i == start\`)** | \`nums[i] == nums[i-1]\` | Processa normalmente (ramo filho) |
| **Irmãos subsequentes (\`i > start\`)** | \`nums[i] == nums[i-1]\` | Pula com \`continue\` (evita duplicata) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Subsets II
\`\`\`java
import java.util.*;

public class SubsetsWithDup {
  public List<List<Integer>> subsetsWithDup(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), res);
    return res;
  }

  private void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> res) {
    res.add(new ArrayList<>(path));
    for (int i = start; i < nums.length; i++) {
      if (i > start && nums[i] == nums[i - 1]) continue; // Deduplicação
      path.add(nums[i]);
      backtrack(nums, i + 1, path, res);
      path.remove(path.size() - 1);
    }
  }
}
\`\`\`

#### Key Takeaways
- Essa técnica economiza o custo de usar um \`Set<List<Integer>>\` e evita a geração de soluções redundantes.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/backtracking/DSA-PATT-BACKTRACK-001.md', `---
id: DSA-PATT-BACKTRACK-001
title: "N-Queens Problem com Validação O(1) de Diagonais via Hash Sets / Bitmasks"
tags:
  - level::l4-pleno
  - topic::dsa::backtracking
  - company::meta
  - freq::high
---

## Pergunta
Como otimizar a verificação de segurança de rainhas no **Problema das N-Rainhas (N-Queens)** para tempo $O(1)$ usando propriedades matemáticas de diagonais?

## Resposta
### Quick Answer
**Solução Direta**:
- Posicionamos uma rainha por linha $r$ (de $0$ a $N-1$), testando cada coluna $c$:
  - **Coluna**: Invalida se $c$ já está no conjunto \`cols\`.
  - **Diagonal Principal (\\)**: Células na mesma diagonal possuem a propriedade matemática constante: **$r - c = \\text{constante}$**.
  - **Anti-Diagonal (/)**: Células na mesma anti-diagonal possuem a propriedade: **$r + c = \\text{constante}$**.
- Mantendo três Hash Sets (ou Bitmasks inteiros) para \`cols\`, \`diag1\` e \`diag2\`, verificamos a segurança em tempo **estritamente $O(1)$** sem precisar varrer o tabuleiro.

### Dual Coding Visual
| Linha de Ataque da Rainha | Propriedade Matemática em $(r, c)$ | Rastreamento em $O(1)$ |
|---|---|---|
| **Coluna Vertical** | $c$ | \`Set<Integer> cols\` |
| **Diagonal Principal (\\)** | $r - c$ | \`Set<Integer> diag1\` |
| **Anti-Diagonal (/)** | $r + c$ | \`Set<Integer> diag2\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: N-Queens com O(1) Check
\`\`\`java
import java.util.*;

public class NQueens {
  private final Set<Integer> cols = new HashSet<>();
  private final Set<Integer> diag1 = new HashSet<>(); // r - c
  private final Set<Integer> diag2 = new HashSet<>(); // r + c

  public void solve(int r, int n, char[][] board, List<List<String>> res) {
    if (r == n) {
      res.add(construct(board));
      return;
    }
    for (int c = 0; c < n; c++) {
      if (cols.contains(c) || diag1.contains(r - c) || diag2.contains(r + c)) continue;

      board[r][c] = 'Q';
      cols.add(c); diag1.add(r - c); diag2.add(r + c);

      solve(r + 1, n, board, res);

      board[r][c] = '.';
      cols.remove(c); diag1.remove(r - c); diag2.remove(r + c);
    }
  }
}
\`\`\`

#### Key Takeaways
- Substituir a varredura linear de diagonais ($O(N)$) por conjuntos $O(1)$ acelera o algoritmo em até $10\\times$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/backtracking/DSA-PATT-BACKTRACK-004.md', `---
id: DSA-PATT-BACKTRACK-004
title: "Sudoku Solver com Poda Rigorosa por Linhas, Colunas e Caixas 3x3"
tags:
  - level::l4-pleno
  - topic::dsa::backtracking
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo de Backtracking para **Sudoku Solver** (LeetCode 37) valida números em tempo $O(1)$ com a fórmula de caixas $(r/3) \\times 3 + (c/3)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos matrizes booleanas ou bitmasks de dígitos $[0..9]$ para:
  - \`rows[9][10]\`: Dígitos presentes em cada linha.
  - \`cols[9][10]\`: Dígitos presentes em cada coluna.
  - \`boxes[9][10]\`: Dígitos presentes em cada uma das 9 subcaixas $3 \\times 3$.
- O índice da caixa $3 \\times 3$ correspondente à célula $(r, c)$ é calculado por:
  $$\\text{boxId} = \\left(\\frac{r}{3}\\right) \\times 3 + \\left(\\frac{c}{3}\\right)$$
- Ao tentar colocar o dígito $d$ em $(r, c)$: testa \`!rows[r][d] && !cols[c][d] && !boxes[boxId][d]\` em $O(1)$. Se válido, marca as 3 matrizes e avança recursivamente.

### Dual Coding Visual
| Restrição de Sudoku | Estrutura de Validação | Fórmula de Índice |
|---|---|---|
| **Linha** | \`rows[r][d]\` | $r \\in [0, 8]$ |
| **Coluna** | \`cols[c][d]\` | $c \\in [0, 8]$ |
| **Caixa $3 \\times 3$** | \`boxes[boxId][d]\` | $(r/3) \\times 3 + (c/3)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Retornar um booleano (\`true\` assim que o primeiro tabuleiro completo for preenchido) interrompe imediatamente a recursão e evita continuar a busca.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/backtracking/DSA-PATT-BACKTRACK-005.md', `---
id: DSA-PATT-BACKTRACK-005
title: "Word Search II com Acoplamento de Trie e Backtracking em Matriz 2D"
tags:
  - level::l4-pleno
  - topic::dsa::backtracking
  - company::amazon
  - freq::high
---

## Pergunta
Por que acoplar uma **Trie** ao Backtracking em **Word Search II** (LeetCode 212) é exponencialmente mais rápido que rodar Word Search I para cada palavra?

## Resposta
### Quick Answer
**Solução Direta**:
- Executar Backtracking individual para $K$ palavras no tabuleiro $M \\times N$ custa $O(K \\times M \\cdot N \\cdot 4^L)$.
- **Acoplamento com Trie ($O(M \\cdot N \\cdot 4^L)$)**:
  1. Inserimos todas as $K$ palavras em uma **Trie**.
  2. Disparamos a DFS a partir de cada célula $(r, c)$ do tabuleiro, caminhando simultaneamente no tabuleiro e nos nós da Trie.
  3. **Poda Instantânea**: Se o caractere atual da grade não for filho do nó atual da Trie (\`currNode.children[c] == null\`), abortamos a DFS imediatamente.
  4. Uma única busca no tabuleiro valida todas as $K$ palavras em paralelo.

### Dual Coding Visual
| Abordagem | Número de Buscas no Tabuleiro | Complexidade |
|---|---|---|
| **Busca Individual por Palavra** | $K$ buscas independentes | $O(K \\cdot M \\cdot N \\cdot 4^L)$ |
| **Trie + Backtracking Combinado** | 1 única busca global | $O(M \\cdot N \\cdot 4^L)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização Extra: Remoção de Folhas da Trie
Ao encontrar uma palavra válida, marcamos \`currNode.word = null\` e podamos nós da Trie que ficaram sem filhos para não reencontrar a mesma palavra em outros caminhos.

#### Key Takeaways
- É um exemplo perfeito de fusão de estruturas de dados (Trie) com padrões de exploração (Backtracking).

</details>
`);

// 24. bit-manipulation-patterns
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/bit-manipulation-patterns/DSA-PATT-BIT-000.md', `---
id: DSA-PATT-BIT-000
title: "Operadores Bitwise Fundamentais (AND, OR, XOR, NOT, Shifts) e Propriedades"
tags:
  - level::l3-junior
  - topic::dsa::bit-manipulation-patterns
  - company::google
  - freq::high
---

## Pergunta
Como funcionam os operadores bitwise fundamentais (\`&\`, \`|\`, \`^\`, \`~\`, \`<<\`, \`>>\`) e quais suas identidades matemáticas básicas?

## Resposta
### Quick Answer
**Solução Direta**:
- **AND (\`&\`)**: $1 \\ \\& \\ 1 = 1$; todos os outros dão $0$ (usado para máscaras de filtragem).
- **OR (\`|\`)**: $0 \\mid 0 = 0$; todos os outros dão $1$ (usado para ligar bits).
- **XOR (\`^\`)**: $x \\oplus x = 0$, $x \\oplus 0 = x$ (dá $1$ se os bits forem diferentes; usado para alternar bits e detectar elementos únicos).
- **NOT (\`~\`)**: Inverte todos os bits ($~x = -x - 1$ em complemento de dois).
- **Left Shift (\`x << k\`)**: Multiplica $x$ por $2^k$.
- **Right Shift (\`x >> k\`)**: Divide $x$ por $2^k$.

### Dual Coding Visual
| Operador | Operação em Bits | Identidade Chave |
|---|---|---|
| **Operador AND** | Interseção de bits | $x \\ \\& \\ x = x, \\quad x \\ \\& \\ 0 = 0$ |
| **Operador OR** | União de bits | $x \\mid x = x, \\quad x \\mid 0 = x$ |
| **Operador XOR** | Diferença simétrica | $x \\oplus x = 0, \\quad x \\oplus 0 = x$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Operações bitwise executam em 1 ciclo de clock da ALU, sendo as instruções mais rápidas da computação.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/bit-manipulation-patterns/DSA-PATT-BIT-002.md', `---
id: DSA-PATT-BIT-002
title: "Truque de Brian Kernighan (n & (n - 1)) para Contagem de Bits 1 (Hamming Weight)"
tags:
  - level::l3-junior
  - topic::dsa::bit-manipulation-patterns
  - company::microsoft
  - freq::high
---

## Pergunta
Como a expressão bitwise **\`n & (n - 1)\` (Algoritmo de Brian Kernighan)** apaga o bit 1 menos significativo e conta bits ativos em $O(K)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Subtrair 1 de um número binário (\`n - 1\`) inverte todos os bits a partir do bit 1 mais à direita até o final (ex: \`...1000 - 1 = ...0111\`).
- Ao executar \`n & (n - 1)\`, o bit 1 menos significativo e todos os zeros subsequentes são transformados em zeros, preservando os bits mais à esquerda inalterados.
- **Contagem de Bits (Hamming Weight)**: Executamos \`n = n & (n - 1)\` em um loop até que \`n == 0\`. O laço executa exatamente $K$ vezes, onde $K$ é o número de bits 1 ativos.

### Dual Coding Visual
| Passo | Valor de \`n\` (Binário) | Ação \`n & (n - 1)\` |
|---|---|---|
| **Inicial** | \`11000\` ($24$) | $24 \\ \\& \\ 23 = 11000 \\ \\& \\ 10111 = 10000$ |
| **Passo 2** | \`10000\` ($16$) | $16 \\ \\& \\ 15 = 10000 \\ \\& \\ 01111 = 00000$ |
| **Total** | 2 iterações | Exatamente 2 bits 1 ativos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Teste de Potência de 2
Um número inteiro positivo $N$ é potência de 2 se e somente se possuir exatamente 1 bit ativo: \`n > 0 && (n & (n - 1)) == 0\`.

#### Key Takeaways
- É estritamente mais rápido que varrer todos os 32 bits ($O(K)$ vs $O(32)$).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/bit-manipulation-patterns/DSA-PATT-BIT-003.md', `---
id: DSA-PATT-BIT-003
title: "Propriedade do XOR para Encontrar Elemento Único (Single Number I) em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::bit-manipulation-patterns
  - company::amazon
  - freq::high
---

## Pergunta
Como as propriedades comutativa e associativa do **XOR** encontram o único elemento não duplicado em **Single Number I** em $O(N)$ tempo e $O(1)$ espaço?

## Resposta
### Quick Answer
**Solução Direta**:
- O operador XOR satisfaz:
  1. $x \\oplus x = 0$ (qualquer número aplicado com ele mesmo se anula).
  2. $x \\oplus 0 = x$ (o zero é o elemento neutro).
  3. Comutatividade e Associatividade: $A \\oplus B \\oplus A = (A \\oplus A) \\oplus B = 0 \\oplus B = B$.
- Acumulando o XOR de todos os elementos do array em uma variável (\`result ^= num\`), todos os pares duplicados se cancelam ($0$), restando exclusivamente o **único elemento solitário**.

### Dual Coding Visual
| Abordagem | Tempo | Memória Auxiliar |
|---|---|---|
| **Hash Set** | $O(N)$ | $O(N)$ Conjunto de elementos |
| **XOR Acumulado** | $O(N)$ | $O(1)$ Único registrador |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Single Number I
\`\`\`java
public class SingleNumberSolution {
  public int singleNumber(int[] nums) {
    int res = 0;
    for (int num : nums) res ^= num;
    return res;
  }
}
\`\`\`

#### Key Takeaways
- Transforma um problema que exigiria memória linear de conjunto em uma solução de espaço constante $O(1)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/bit-manipulation-patterns/DSA-PATT-BIT-001.md', `---
id: DSA-PATT-BIT-001
title: "Single Number II (3N + 1) e Contagem de Bits Módulo 3 com Máquinas de Estado"
tags:
  - level::l4-pleno
  - topic::dsa::bit-manipulation-patterns
  - company::meta
  - freq::high
---

## Pergunta
Como resolver **Single Number II** (onde todos os números aparecem 3 vezes, exceto um que aparece 1 vez) em $O(N)$ tempo e $O(1)$ espaço?

## Resposta
### Quick Answer
**Solução Direta**:
- Para cada posição de bit $i$ de $0$ a $31$:
  - Somamos a quantidade de números que possuem o $i$-ésimo bit ativo.
  - Calculamos $\\text{soma} \\pmod 3$.
  - Como os números duplicados aparecem 3 vezes, sua contribuição para a soma de cada bit será múltiplo de 3 ($3k$).
  - O resto $\\text{soma} \\pmod 3$ revelará com exatidão se o número único solitário possui aquele bit $i$ ativo ($1$) ou não ($0$).
- **Complexidade**: $O(32N) = O(N)$ tempo e $O(1)$ espaço.

### Dual Coding Visual
| Contribuição de Bit | Ocorrências do Número | Valor Módulo 3 ($\\% 3$) |
|---|---|---|
| **Números Triplicados** | Aparecem $3k$ vezes | $3k \\pmod 3 = 0$ (Anulados) |
| **Número Solitário** | Aparece 1 vez | $1 \\pmod 3 = 1$ (Preservado) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Solução Digital Avançada com 2 Variáveis (Ones e Twos)
\`\`\`java
public int singleNumber(int[] nums) {
  int ones = 0, twos = 0;
  for (int x : nums) {
    ones = (ones ^ x) & ~twos;
    twos = (twos ^ x) & ~ones;
  }
  return ones;
}
\`\`\`

#### Key Takeaways
- Generaliza para qualquer problema onde elementos aparecem $K$ vezes e um aparece $1$ vez (basta fazer módulo $K$).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/bit-manipulation-patterns/DSA-PATT-BIT-004.md', `---
id: DSA-PATT-BIT-004
title: "Single Number III: Separação de Grupos via Bit Isolado (diff & -diff)"
tags:
  - level::l4-pleno
  - topic::dsa::bit-manipulation-patterns
  - company::google
  - freq::high
---

## Pergunta
Como resolver **Single Number III** (encontrar dois números únicos $X$ e $Y$ em meio a pares duplicados) isolando o bit mais à direita?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. Calcula o XOR acumulado de todo o array: $\\text{xor} = X \\oplus Y$. Como $X \\neq Y$, ao menos um bit de \`xor\` é $1$.
- 2. Isola o bit 1 menos significativo com **\`diff = xor & (-xor)\`**. Esse bit indica uma posição onde $X$ e $Y$ possuem bits opostos ($0$ e $1$).
- 3. Divide os elementos do array em dois grupos independentes com base nesse bit (\`(num & diff) == 0\` vs \`!= 0\`):
  - $X$ cairá no primeiro grupo e todos os seus pares duplicados se anulam.
  - $Y$ cairá no segundo grupo e todos os seus pares se anulam.
- **Complexidade**: $O(N)$ tempo e $O(1)$ espaço.

### Dual Coding Visual
| Grupo de Separação | Condição Bitwise | Resultado do XOR Acumulado |
|---|---|---|
| **Grupo 0** | \`(num & diff) == 0\` | Produz exatamente o número $X$ |
| **Grupo 1** | \`(num & diff) != 0\` | Produz exatamente o número $Y$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O isolamento do LSB (\`diff & -diff\`) atua como uma chave de particionamento binário perfeita em $O(1)$ memória.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/bit-manipulation-patterns/DSA-PATT-BIT-005.md', `---
id: DSA-PATT-BIT-005
title: "Geração de Todos os Subconjuntos de uma Máscara via (sub - 1) & mask em O(3^N)"
tags:
  - level::l4-pleno
  - topic::dsa::bit-manipulation-patterns
  - company::amazon
  - freq::high
---

## Pergunta
Como iterar estritamente sobre todos os subconjuntos de uma máscara binária usando a expressão **\`sub = (sub - 1) & mask\`** em tempo total $O(3^N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Para iterar sobre todos os sub-padrões de bits ativos de uma máscara \`mask\` sem testar inteiros irrelevantes:
  \`\`\`java
  for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
    // Processa o subconjunto ativo 'sub'
  }
  \`\`\`
- **Por que funciona**: Subtrair 1 decrementa o padrão; ao fazer AND com \`mask\`, limpamos todos os bits que não faziam parte da máscara original, pulando diretamente para o próximo subconjunto válido.
- **Complexidade Global**: Para todas as $2^N$ máscaras possíveis, o total de iterações sobre todos os subconjuntos é:
  $$\\sum_{k=0}^N \\binom{N}{k} 2^k = (1 + 2)^N = 3^N$$

### Dual Coding Visual
| Abordagem | Estados Avaliados | Complexidade para todas as máscaras |
|---|---|---|
| **Loop Ingênuo de $0$ a \`mask\`** | Testa números inválidos | $O(4^N)$ |
| **\`(sub - 1) & mask\`** | Visita apenas subconjuntos válidos | $O(3^N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a técnica fundamental para problemas avançados de Bitmask DP com particionamento de conjuntos (*Partition Array into Subsets*).

</details>
`);

// 25. divide-and-conquer-sorting
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/divide-and-conquer-sorting/DSA-PATT-DIVCONQ-000.md', `---
id: DSA-PATT-DIVCONQ-000
title: "Paradigma de Divisão e Conquista e o Teorema Mestre para Análise de Recorrência"
tags:
  - level::l3-junior
  - topic::dsa::divide-and-conquer-sorting
  - company::google
  - freq::high
---

## Pergunta
Como o paradigma de **Divisão e Conquista (Divide and Conquer)** decompõe problemas e como o **Teorema Mestre** resolve suas complexidades assintóticas?

## Resposta
### Quick Answer
**Solução Direta**:
- O paradigma segue 3 etapas:
  1. **Dividir**: Quebra o problema original em $a$ subproblemas menores de tamanho $N/b$.
  2. **Conquistar**: Resolve os subproblemas recursivamente (ou diretamente nos casos base).
  3. **Combinar**: Funde as soluções dos subproblemas na solução final com custo $f(N) = O(N^d)$.
- **Teorema Mestre ($T(N) = a T(N/b) + O(N^d)$)**:
  - Se $d < \\log_b a \\implies T(N) = O(N^{\\log_b a})$ (Folhas dominam).
  - Se $d = \\log_b a \\implies T(N) = O(N^d \\log N)$ (Custo uniforme por nível, como Mergesort).
  - Se $d > \\log_b a \\implies T(N) = O(N^d)$ (Raiz domina).

### Dual Coding Visual
| Algoritmo | Recorrência e Parâmetros | Complexidade Final |
|---|---|---|
| **Binary Search** | $T(N/2) + O(1)$ com $a=1, b=2, d=0$ | $O(\\log N)$ |
| **Mergesort** | $2T(N/2) + O(N)$ com $a=2, b=2, d=1$ | $O(N \\log N)$ |
| **Karatsuba** | $3T(N/2) + O(N)$ com $a=3, b=2, d=1$ | $O(N^{1.585})$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O Teorema Mestre permite deduzir a complexidade de algoritmos recursivos balanceados instantaneamente sem desenhar a árvore completa.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/divide-and-conquer-sorting/DSA-PATT-DIVCONQ-002.md', `---
id: DSA-PATT-DIVCONQ-002
title: "Mergesort: Divisão Balanceada, Estabilidade e Complexidade Garantida O(N log N)"
tags:
  - level::l3-junior
  - topic::dsa::divide-and-conquer-sorting
  - company::amazon
  - freq::high
---

## Pergunta
Por que o **Mergesort** garante complexidade $O(N \\log N)$ em todos os casos (melhor, médio e pior) e como ele preserva a **estabilidade**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Garantia $O(N \\log N)$**: Divide o array estritamente ao meio em $\\lfloor N/2 \\rfloor$, gerando uma árvore de recursão perfeitamente balanceada de altura $\\log_2 N$. Em cada nível, a fusão (\`merge\`) processa todos os $N$ elementos em tempo linear $O(N)$, totalizando $O(N \\log N)$ impreterivelmente.
- **Estabilidade**: Durante o merge de duas metades ordenadas, se dois elementos forem iguais ($A[i] == B[j]$), selecionamos prioritariamente o elemento da metade esquerda ($A[i]$), preservando a ordem relativa original dos itens.
- **Desvantagem**: Exige $O(N)$ de memória auxiliar para o buffer temporário de fusão.

### Dual Coding Visual
| Caso de Execução | Tempo Mergesort | Tempo Quicksort |
|---|---|---|
| **Melhor Caso** | $O(N \\log N)$ | $O(N \\log N)$ |
| **Caso Médio** | $O(N \\log N)$ | $O(N \\log N)$ |
| **Pior Caso** | **$O(N \\log N)$ Garantido** | $O(N^2)$ Degenerado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Mergesort é o algoritmo de escolha para ordenação externa em disco e ordenação de listas encadeadas (onde a fusão pode ser feita in-place sem array extra).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/divide-and-conquer-sorting/DSA-PATT-DIVCONQ-003.md', `---
id: DSA-PATT-DIVCONQ-003
title: "Quicksort: Particionamento In-Place (Lomuto vs Hoare) e Pior Caso O(N²)"
tags:
  - level::l3-junior
  - topic::dsa::divide-and-conquer-sorting
  - company::meta
  - freq::high
---

## Pergunta
Como funciona o particionamento in-place no **Quicksort** e sob quais condições ele degenera para $O(N^2)$?

## Resposta
### Quick Answer
**Solução Direta**:
- O Quicksort escolhe um elemento pivô e rearranja o array in-place tal que todos os elementos $\\le \\text{pivô}$ fiquem à esquerda e os $> \\text{pivô}$ à direita:
  - **Lomuto Partition**: Usa um único ponteiro de varredura. Mais simples, porém faz mais swaps.
  - **Hoare Partition**: Usa dois ponteiros convergentes nas pontas. Faz em média $3\\times$ menos swaps que Lomuto.
- **Degeneração $O(N^2)$**: Se o pivô escolhido for sempre o menor ou maior elemento (ex: array já ordenado com pivô fixo no primeiro/último elemento), o particionamento divide o array em tamanhos $0$ e $N-1$, gerando uma árvore de altura $N$ com custo total $\\sum_{i=1}^N i = O(N^2)$.

### Dual Coding Visual
| Estratégia de Pivô | Desempenho com Array Ordenado | Risco de $O(N^2)$ |
|---|---|---|
| **Pivô Fixo na Ponta** | Degrada para $O(N^2)$ | Alto |
| **Pivô Aleatório / Mediana de 3** | $O(N \\log N)$ com alta probabilidade | Praticamente Zero |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Na prática, o Quicksort aleatorizado é mais rápido que o Mergesort devido a constantes menores e localidade de cache perfeita (operações in-place).

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/divide-and-conquer-sorting/DSA-PATT-DIVCONQ-001.md', `---
id: DSA-PATT-DIVCONQ-001
title: "Quickselect para Encontrar o K-ésimo Elemento em Tempo Médio Linear O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::divide-and-conquer-sorting
  - company::google
  - freq::high
---

## Pergunta
Como o algoritmo **Quickselect** localiza o $K$-ésimo menor elemento de um array não ordenado em tempo médio $O(N)$ sem ordenar o array completo?

## Resposta
### Quick Answer
**Solução Direta**:
- Diferente do Quicksort (que faz recursão em ambos os lados do pivô), o **Quickselect descarta metade do array a cada passo**:
  1. Executa o particionamento in-place posicionando o pivô em seu índice final exato \`pIndex\`.
  2. Se \`pIndex == K\`: encontramos o elemento exato ($O(1)$).
  3. Se \`K < pIndex\`: faz recursão **apenas na partição esquerda**.
  4. Se \`K > pIndex\`: faz recursão **apenas na partição direita**.
- A soma das iterações segue a série geométrica:
  $$N + \\frac{N}{2} + \\frac{N}{4} + \\dots < 2N = O(N) \\text{ linear}$$

### Dual Coding Visual
| Algoritmo | Chamadas Recursivas por Nível | Complexidade de Tempo Médio |
|---|---|---|
| **Quicksort** | Ambas as metades ($2 \\times T(N/2)$) | $O(N \\log N)$ |
| **Quickselect** | Apenas 1 metade ($1 \\times T(N/2)$) | $O(N)$ Linear |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Quickselect
\`\`\`java
public class QuickselectSolution {
  public int findKthLargest(int[] nums, int k) {
    int target = nums.length - k; // Converte para k-ésimo menor
    return quickselect(nums, 0, nums.length - 1, target);
  }

  private int quickselect(int[] nums, int l, int r, int k) {
    if (l == r) return nums[l];
    int pIndex = partition(nums, l, r);
    if (pIndex == k) return nums[k];
    else if (pIndex < k) return quickselect(nums, pIndex + 1, r, k);
    else return quickselect(nums, l, pIndex - 1, k);
  }

  private int partition(int[] nums, int l, int r) {
    int pivot = nums[r], i = l;
    for (int j = l; j < r; j++) {
      if (nums[j] <= pivot) {
        swap(nums, i++, j);
      }
    }
    swap(nums, i, r);
    return i;
  }

  private void swap(int[] a, int i, int j) {
    int t = a[i]; a[i] = a[j]; a[j] = t;
  }
}
\`\`\`

#### Key Takeaways
- É a solução mais rápida e eficiente em memória ($O(1)$ espaço) para problemas de Top-K e seleção de medianas.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/divide-and-conquer-sorting/DSA-PATT-DIVCONQ-004.md', `---
id: DSA-PATT-DIVCONQ-004
title: "Contagem de Inversões (Inversion Count) com Mergesort Modificado em O(N log N)"
tags:
  - level::l4-pleno
  - topic::dsa::divide-and-conquer-sorting
  - company::meta
  - freq::high
---

## Pergunta
Como modificar a etapa de fusão do **Mergesort** para contar o número de inversões ($i < j$ com $A[i] > A[j]$) em tempo $O(N \\log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma inversão ocorre quando um elemento maior aparece antes de um menor no array.
- Durante a etapa de merge entre duas metades ordenadas \`left[]\` e \`right[]\`:
  - Se \`right[j] < left[i]\`: Como \`left[]\` está ordenado, todos os elementos restantes de \`left[i]\` até o fim da metade esquerda são estritamente maiores que \`right[j]\`.
  - Contabilizamos instantaneamente $(\\text{mid} - i + 1)$ inversões em tempo $O(1)$.
- **Complexidade**: $O(N \\log N)$ tempo contra $O(N^2)$ da contagem ingênua por pares.

### Dual Coding Visual
| Condição no Merge | Relação de Valor | Inversões Somadas |
|---|---|---|
| \`left[i] <= right[j]\` | Normal (sem inversão) | $0$ |
| \`left[i] > right[j]\` | Inversão detectada | $+ (\\text{mid} - i + 1)$ de uma vez |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Reduz drasticamente a complexidade de problemas como *Count of Smaller Numbers After Self* e métricas de desordem de rankings.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/divide-and-conquer-sorting/DSA-PATT-DIVCONQ-005.md', `---
id: DSA-PATT-DIVCONQ-005
title: "TimSort: O Algoritmo Híbrido Adaptativo Padrão de Java e Python"
tags:
  - level::l4-pleno
  - topic::dsa::divide-and-conquer-sorting
  - company::apple
  - freq::high
---

## Pergunta
Como o algoritmo **TimSort** combina Insertion Sort e Mergesort para atingir performance linear $O(N)$ em dados quase ordenados?

## Resposta
### Quick Answer
**Solução Direta**:
- Dados do mundo real frequentemente contêm sequências naturais que já estão ordenadas (crescentes ou decrescentes):
  1. **Detecção de Runs**: O TimSort varre o array identificando sequências já ordenadas (*runs*). Se uma run for muito curta ($< \\text{minRun} \\approx 32\\text{ a }64$), estende-a usando **Insertion Sort** (que é imbatível para $N \\le 64$).
  2. **Merge Balanceado via Pilha**: Mantém uma pilha de runs garantindo invariantes de tamanho similares aos números de Fibonacci para fundir runs balanceadas.
- **Complexidade**: $O(N)$ no melhor caso (dados já ordenados) e $O(N \\log N)$ no pior caso, mantendo estrita estabilidade.

### Dual Coding Visual
| Algoritmo | Complexidade (Melhor / Pior) | Estabilidade |
|---|---|---|
| **Quicksort Padrão** | $O(N \\log N)$ / $O(N^2)$ | Instável |
| **Mergesort Puro** | $O(N \\log N)$ / $O(N \\log N)$ | Estável |
| **TimSort (Híbrido)** | **$O(N)$ Linear** / **$O(N \\log N)$** | Estável |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É o algoritmo oficial de ordenação de objetos de \`java.util.Arrays.sort()\`, \`Collections.sort()\` e do método \`sort()\` do Python.

</details>
`);

// 26. monotonic-stack-queue
writeAndValidateCard('decks/01-dsa/algorithmic-patterns/monotonic-stack-queue/DSA-PATT-MONOSTACK-000.md', `---
id: DSA-PATT-MONOSTACK-000
title: "Definição e Invariante de Monotonic Stack (Crescente vs Decrescente)"
tags:
  - level::l3-junior
  - topic::dsa::monotonic-stack-queue
  - company::meta
  - freq::high
---

## Pergunta
Qual é a invariante estrutural de uma **Monotonic Stack** e quando escolher uma pilha monótona crescente versus decrescente?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Monotonic Stack** é uma pilha onde os elementos são mantidos estritamente ordenados da base até o topo:
  - **Monótona Crescente**: Elementos aumentam da base para o topo ($A[\\text{base}] < \\dots < A[\\text{topo}]$). Usada para encontrar o **Previous / Next Smaller Element**.
  - **Monótona Decrescente**: Elementos diminuem da base para o topo ($A[\\text{base}] > \\dots > A[\\text{topo}]$). Usada para encontrar o **Previous / Next Greater Element**.
- Ao inserir $x$, desempilhamos todos os elementos que violam a invariante de ordem, garantindo amortização total de $O(N)$ linear.

### Dual Coding Visual
| Tipo de Pilha Monótona | Ordem da Base ao Topo | Objetivo de Busca |
|---|---|---|
| **Crescente** | Valores aumentam | Próximo / Anterior **Menor** |
| **Decrescente** | Valores diminuem | Próximo / Anterior **Maior** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Como cada elemento entra e sai da pilha no máximo uma vez, a complexidade total sobre todo o array de tamanho $N$ é estritamente $O(2N) = O(N)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/monotonic-stack-queue/DSA-PATT-MONOSTACK-002.md', `---
id: DSA-PATT-MONOSTACK-002
title: "Daily Temperatures (LeetCode 739) e Contagem de Dias até Temperatura Maior em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::monotonic-stack-queue
  - company::amazon
  - freq::high
---

## Pergunta
Como a **Monotonic Stack** resolve o problema **Daily Temperatures** (dias de espera até um dia mais quente) em tempo $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos uma **Pilha Monótona Decrescente** armazenando os **índices** dos dias:
  - Para cada dia $i$ com temperatura $T[i]$:
    - Enquanto a pilha não estiver vazia e a temperatura de hoje for maior que a do topo ($T[i] > T[\\text{stack.peek()}]]$):
      - Desempilhamos o índice anterior \`prevIndex = stack.pop()\`.
      - Calculamos a quantidade de dias de espera: \`result[prevIndex] = i - prevIndex\`.
    - Empilhamos o índice atual $i$.
- **Complexidade**: $O(N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
| Estado da Pilha | Temperatura Atual $T[i]$ | Ação |
|---|---|---|
| $T[i] \\le T[\\text{topo}]$ | Mais fria/igual | Empilha $i$ (mantém ordem decrescente) |
| $T[i] > T[\\text{topo}]$ | Mais quente | Desempilha e calcula $\\Delta = i - \\text{topo}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Daily Temperatures
\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class DailyTemperatures {
  public int[] dailyTemperatures(int[] temperatures) {
    int n = temperatures.length;
    int[] res = new int[n];
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
      while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
        int prev = stack.pop();
        res[prev] = i - prev;
      }
      stack.push(i);
    }
    return res;
  }
}
\`\`\`

#### Key Takeaways
- Armazenar os índices na pilha (em vez dos valores) permite obter tanto o valor quanto a distância relativa em $O(1)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/monotonic-stack-queue/DSA-PATT-MONOSTACK-003.md', `---
id: DSA-PATT-MONOSTACK-003
title: "Monotonic Queue / Deque para Sliding Window Maximum (LeetCode 239) em O(N)"
tags:
  - level::l3-junior
  - topic::dsa::monotonic-stack-queue
  - company::google
  - freq::high
---

## Pergunta
Como um **Monotonic Deque** obtém o valor máximo de cada janela deslizante em **Sliding Window Maximum** em tempo estritamente linear $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos um **Deque Monótono Decrescente** que armazena os índices dos elementos:
  1. **Remoção de Elementos Expirados**: Remove do início do deque índices que saíram da janela: \`deque.peekFirst() <= i - K\`.
  2. **Manutenção da Monotonicidade**: Remove do fim do deque todos os índices cujos valores sejam menores que o elemento atual (\`nums[deque.peekLast()] < nums[i]\`), pois eles jamais poderão ser o máximo enquanto \`nums[i]\` estiver na janela.
  3. Adiciona $i$ ao fim do deque.
  4. O elemento máximo da janela ativa reside sempre em **\`nums[deque.peekFirst()]\`** em $O(1)$.
- **Complexidade**: $O(N)$ tempo contra $O(N \\log K)$ do Heap.

### Dual Coding Visual
| Estrutura para Janela Máxima | Consulta do Máximo | Custo por Deslizamento |
|---|---|---|
| **Max-Heap** | $O(1)$ na raiz | $O(\\log K)$ Inserção / Deleção |
| **Monotonic Deque** | $O(1)$ em \`peekFirst\` | $O(1)$ Amortizado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Sliding Window Maximum
\`\`\`java
import java.util.ArrayDeque;
import java.util.Deque;

public class SlidingWindowMax {
  public int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    int[] res = new int[n - k + 1];
    Deque<Integer> deque = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
      // 1. Remove fora da janela
      if (!deque.isEmpty() && deque.peekFirst() <= i - k) {
        deque.pollFirst();
      }
      // 2. Remove menores
      while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
        deque.pollLast();
      }
      deque.offerLast(i);
      // 3. Coleta resultado
      if (i >= k - 1) {
        res[i - k + 1] = nums[deque.peekFirst()];
      }
    }
    return res;
  }
}
\`\`\`

#### Key Takeaways
- Eliminar candidatos subótimos do fim do deque é o segredo para manter o máximo sempre no início em $O(1)$.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/monotonic-stack-queue/DSA-PATT-MONOSTACK-001.md', `---
id: DSA-PATT-MONOSTACK-001
title: "Largest Rectangle in Histogram com Pilha Monótona Crescente em Tempo O(N)"
tags:
  - level::l4-pleno
  - topic::dsa::monotonic-stack-queue
  - company::meta
  - freq::high
---

## Pergunta
Como a **Monotonic Stack Crescente** resolve o clássico hard **Largest Rectangle in Histogram** (LeetCode 84) em tempo $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Para cada barra $i$, a altura máxima do retângulo que usa $H[i]$ como gargalo estende-se para a esquerda e direita até encontrar barras estritamente menores:
- Mantemos uma **Pilha Monótona Crescente** com índices:
  - Quando a barra atual é menor que o topo da pilha (\`H[i] < H[stack.peek()]\`), a barra do topo $H[\\text{tp}]$ atingiu seu limite direito em $i$.
  - Desempilhamos $\\text{tp}$. O limite esquerdo é o novo topo da pilha (\`stack.peek()\`).
  - Largura: $\\text{width} = \\text{stack.isEmpty}() \\ ? \\ i : (i - \\text{stack.peek}() - 1)$.
  - Área: $\\text{area} = H[\\text{tp}] \\times \\text{width}$.
- **Complexidade**: $O(N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
| Elemento Desempilhado | Limites (Esq / Dir) | Cálculo de Largura |
|---|---|---|
| Barra de altura $H[\\text{tp}]$ | Topo anterior / Índice atual $i$ | $i - \\text{stack.peek}() - 1$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Ao adicionar uma barra sentinela de altura $0$ no final do array, garantimos que todas as barras restantes na pilha sejam desempilhadas e avaliadas sem código duplicado.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/monotonic-stack-queue/DSA-PATT-MONOSTACK-004.md', `---
id: DSA-PATT-MONOSTACK-004
title: "Maximal Rectangle em Matriz Binária Reduzido para Histogramas 1D em O(M·N)"
tags:
  - level::l4-pleno
  - topic::dsa::monotonic-stack-queue
  - company::google
  - freq::high
---

## Pergunta
Como o problema **Maximal Rectangle** (LeetCode 85) em uma matriz binária é decomposto em chamadas repetidas de *Largest Rectangle in Histogram* em $O(M \\times N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Mantemos um array de alturas de histograma \`heights[]\` de tamanho $N$ (número de colunas):
  - Para cada linha $r$ da matriz:
    - Para cada coluna $c$: se $\\text{matrix}[r][c] == '1'$, incrementamos $\\text{heights}[c]++$; se for $'0'$, resetamos $\\text{heights}[c] = 0$.
    - Executamos o algoritmo **Largest Rectangle in Histogram** ($O(N)$) sobre o array \`heights[]\` acumulado até a linha $r$.
- **Complexidade**: $O(M \\times N)$ tempo total e $O(N)$ espaço auxiliar.

### Dual Coding Visual
| Linha da Matriz | Alturas de Histograma (\`heights[]\`) | Algoritmo Aplicado |
|---|---|---|
| Linha 0 | \`[1, 0, 1, 0, 0]\` | \`largestRectangle(heights)\` |
| Linha 1 | \`[2, 0, 2, 1, 1]\` | \`largestRectangle(heights)\` |
| Linha 2 | \`[3, 1, 3, 2, 2]\` | \`largestRectangle(heights)\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Reduz um problema aparentemente complexo em 2D para uma sequência de $M$ instâncias de um problema 1D já resolvido eficientemente por pilha monótona.

</details>
`);

writeAndValidateCard('decks/01-dsa/algorithmic-patterns/monotonic-stack-queue/DSA-PATT-MONOSTACK-005.md', `---
id: DSA-PATT-MONOSTACK-005
title: "Constrained Subsequence Sum (LeetCode 1425) com DP Acelerada por Monotonic Deque"
tags:
  - level::l4-pleno
  - topic::dsa::monotonic-stack-queue
  - company::apple
  - freq::high
---

## Pergunta
Como um **Monotonic Deque** acelera a transição de DP $DP[i] = nums[i] + \\max_{i-K \\le j < i} (0, DP[j])$ de $O(N \\cdot K)$ para $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Em **Constrained Subsequence Sum**, a transição de DP busca o valor máximo de $DP[j]$ nos últimos $K$ índices anteriores.
- Uma busca linear nos últimos $K$ termos resultaria em $O(N \\cdot K)$ (inviável para $N, K = 10^5$).
- **Monotonic Deque ($O(N)$)**:
  - Mantemos um Deque monótono decrescente com os valores de $DP$:
    - Remove índices expirados: \`deque.peekFirst() < i - K\`.
    - $DP[i] = nums[i] + \\max(0, DP[\\text{deque.peekFirst()}])$.
    - Mantém ordem decrescente no deque removendo elementos do fim menores que $DP[i]$.
- **Complexidade**: $O(N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
| Abordagem de DP | Busca do Máximo nos Últimos $K$ | Complexidade Total |
|---|---|---|
| **Varredura Linear de Janela** | Varre $K$ posições | $O(N \\cdot K)$ TLE |
| **DP + Monotonic Deque** | Consulta instantânea em \`peekFirst\` | $O(N)$ Ótimo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É uma das técnicas mais avançadas para otimização de janelas deslizantes em equações de Programação Dinâmica.

</details>
`);

console.log('✅ Backtracking, Bitwise, Sorting and Monotonic subtopics decomposed.');
