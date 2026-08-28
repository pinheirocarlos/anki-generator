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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Matriz Laplaciana de Grafo: L = D - A</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">D (Matriz de Graus) - A (Matriz de Adjacência)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Diagonal = grau do vértice | Fora da diagonal = -1 se existe aresta, 0 caso contrário.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">O número de autovalores zero corresponde exatamente ao número de componentes conexos.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Base da Teoria Espectral de Grafos, particionamento de redes e clustering</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Matriz Laplaciana de Grafo: L = D - A</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">D (Matriz de Graus) - A (Matriz de Adjacência)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Diagonal = grau do vértice | Fora da diagonal = -1 se existe aresta, 0 caso contrário.</text>
    <text x="20" y="62" fill="#10b981" font-size="11">O número de autovalores zero corresponde exatamente ao número de componentes conexos.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Base da Teoria Espectral de Grafos, particionamento de redes e clustering</text>

</svg>

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
