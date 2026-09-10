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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Huffman Coding: Árvore de Prefixos Ótima com Min-Heap</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Fusão Gulosa de Menor Frequência</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Extrai os dois nós com menores frequências do Min-Heap: parent.freq = f1 + f2.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Reinsere parent no heap até restar a raiz única. Aresta esquerda '0', direita '1'.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Caracteres mais frequentes recebem códigos binários curtos gerando compressão ótima sem perda</text>
</svg>
<p>Visualização: Construção da árvore de Huffman combinando sucessivamente os dois nós de menor frequência via Min-Heap.</p>

| Frequência do Símbolo | Posição na Árvore de Huffman | Tamanho do Código Binário |
|---|---|---|
| **Alta Frequência** | Próximo à Raiz | Curto (ex: 1 a 2 bits) |
| **Baixa Frequência** | Folhas Profundas | Longo (ex: 6 a 8 bits) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a base de algoritmos de compressão de arquivos como DEFLATE (ZIP, GZIP e PNG).

</details>
