---
id: DSA-PATT-GREEDY-005
title: "Algoritmo de Huffman Coding para Compressão de Dados com Min-Heap"
tags:
  - level::l4-pleno
  - topic::dsa::greedy-algorithms
  - company::google
  - freq::high
---

## Pergunta
Como o **Algoritmo de Huffman Coding** utiliza uma estratégia gulosa com Min-Heap para gerar códigos prefixados de tamanho ótimo?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo atribui códigos binários mais curtos aos caracteres mais frequentes e códigos mais longos aos caracteres raros:
  1. Insere todos os caracteres e suas frequências em um **Min-Heap**.
  2. Enquanto o heap tiver mais de 1 nó:
     - Extrai os dois nós de menor frequência $N_1$ e $N_2$.
     - Cria um nó pai com frequência $\text{freq}(N_1) + \text{freq}(N_2)$, conectando $N_1$ à esquerda (bit 0) e $N_2$ à direita (bit 1).
     - Reinsere o nó pai no Min-Heap.
  3. A árvore final produz um código livre de prefixos (*Prefix-Free Code*) com comprimento médio mínimo.
- **Complexidade**: $O(N \log N)$ tempo e $O(N)$ espaço.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/matroid-greedy-exchange-proof-loop.webm">
    <p>Visualização: Propriedade de troca de matroides garantindo matematicamente a convergência para o ótimo global.</p>
  </video>
</div>

| Frequência do Símbolo | Posição na Árvore de Huffman | Tamanho do Código Binário |
|---|---|---|
| **Alta Frequência** | Próximo à Raiz | Curto (ex: 1 a 2 bits) |
| **Baixa Frequência** | Folhas Profundas | Longo (ex: 6 a 8 bits) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a base de algoritmos de compressão de arquivos como DEFLATE (ZIP, GZIP e PNG).

</details>
