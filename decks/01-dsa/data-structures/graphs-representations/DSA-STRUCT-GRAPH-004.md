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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/csr-sparse-graph-layout-loop.webm">
    <p>Visualização: Três vetores contíguos (values, column_indices, row_offsets) compactando o grafo sem overhead de ponteiros.</p>
  </video>
</div>

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
