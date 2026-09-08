---
id: DSA-STRUCT-GRAPH-004
title: "Compressed Sparse Row (CSR) para Grafos Estáticos de Alta Performance"
tags:
  - level::l4-pleno
  - topic::dsa::graphs-representations
  - company::meta
  - freq::high
---

## Pergunta
Como a estrutura **Compressed Sparse Row (CSR)** elimina ponteiros e atinge máxima localidade de cache em grafos estáticos de grande escala?

## Resposta
### Quick Answer
**Solução Direta**:
- O **CSR** comprime a lista de adjacência inteira em **3 arrays planos contíguos**:
  1. `values[]`: Pesos de todas as arestas (opcional).
  2. `column_indices[]` (`cols`): Os nós de destino de todas as arestas concatenados em sequência contígua ($|E|$ inteiros).
  3. `row_offsets[]` (`row_ptr`): Ponteiros de índice ($|V| + 1$ inteiros) onde as arestas do vértice $u$ iniciam em `row_ptr[u]` e terminam em `row_ptr[u+1]`.
- **Benefício**: Zero ponteiros ou listas dinâmicas no Heap, compactação máxima de memória e vetorização SIMD de travessia na CPU/GPU.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compressed Sparse Row (CSR): Grafos Estáticos em Arrays Contíguos</text>
  
  <g transform="translate(60, 45)">
    <rect x="0" y="0" width="560" height="105" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6"/>
    
    <!-- Arrays de CSR -->
    <g transform="translate(20, 20)">
      <text x="0" y="16" fill="#38bdf8" font-size="11" font-weight="bold" font-family="monospace">row_ptr: [ 0,  2,  3,  5 ]</text>
      <text x="240" y="16" fill="#94a3b8" font-size="10">Offset onde iniciam os vizinhos do nó u (|V|+1 inteiros)</text>

      <text x="0" y="45" fill="#34d399" font-size="11" font-weight="bold" font-family="monospace">cols:    [ 1,  2,  0,  0,  1 ]</text>
      <text x="240" y="45" fill="#94a3b8" font-size="10">Destinos concatenados de todas as arestas (|E| inteiros)</text>

      <text x="0" y="74" fill="#fbbf24" font-size="11" font-weight="bold" font-family="monospace">values:  [ 7,  4,  7,  4,  9 ]</text>
      <text x="240" y="74" fill="#94a3b8" font-size="10">Pesos correspondentes de cada aresta (opcional)</text>
    </g>
  </g>

  <text x="340" y="175" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Vizinhos do nó u estão na faixa contígua cols[row_ptr[u] .. row_ptr[u+1]-1] com zero ponteiros</text>
</svg>

<p>Visualização: Estrutura CSR compactando arestas em arrays contíguos com row_offsets delimitando intervalos de vizinhos sem ponteiros.</p>

| Estrutura de Grafo | Disposição na Memória | Localidade de Cache |
|---|---|---|
| **Lista de Listas (`vector<vector>`)** | Múltiplos buffers fragmentados | Ruim (Cache Misses) |
| **CSR (Compressed Sparse Row)** | 2 arrays planos contíguos | Perfeita (Pré-fetch sequencial) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Aplicações Industriais
- Utilizado em bibliotecas de grafos em GPU (NVIDIA cuGraph), motores de Graph Neural Networks (PyTorch Geometric) e computação científica de matrizes esparsas.

#### Key Takeaways
- O CSR é a representação mais compacta e rápida para grafos estáticos que não sofrem mutação frequente de arestas.

</details>
