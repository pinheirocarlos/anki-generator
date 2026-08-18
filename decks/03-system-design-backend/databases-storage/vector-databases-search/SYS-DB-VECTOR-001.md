---
id: SYS-DB-VECTOR-001
title: "Bancos Vetoriais (HNSW / pgvector) e Busca Aproximada de Vizinhos Mais Próximos (ANN)"
tags:
  - level::l4-pleno
  - topic::sys::databases
  - company::openai
  - freq::high
---

## Pergunta
Como o algoritmo Hierarchical Navigable Small World (HNSW) viabiliza buscas por similaridade semântica (ANN) em espaços vetoriais de alta dimensão para RAG?

## Resposta
### Quick Answer
**Solução Direta**:
- Em embeddings de LLM (ex: 1536 dimensões), calcular a distância euclidiana ou cosseno contra todos os vetores (*k-NN exato / Brute Force*) é inviável em escala ($O(N \cdot D)$).
- **HNSW (Hierarchical Navigable Small World)**:
  - Constrói um grafo hierárquico multi-camadas inspirado em **Skip Lists**:
  - **Camadas Superiores**: Possuem conexões longas e esparsas para saltos rápidos no espaço vetorial.
  - **Camadas Inferiores**: Conexões densas e locais para refinamento fino.
- Permite encontrar os $K$ vizinhos mais próximos em tempo **logarítmico $O(\log N)$** com alta precisão (*Recall* $> 95\%$).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/hnsw-vector-graph-ann-search-loop.webm">
    <p>Visualização: Grafo multicamadas HNSW navegando por saltos longos na camada superior e busca de vizinhos densa na camada inferior.</p>
  </video>
</div>

| Algoritmo de Busca Vetorial | Complexidade de Tempo | Trade-off Operacional |
|---|---|---|
| **Flat (Brute Force k-NN)** | $O(N \times D)$ | $100\%$ Recall, inviável para $>100\text{k}$ vetores |
| **IVF (Inverted File Index)** | $O(\sqrt{N} \times D)$ | Menor consumo de RAM, menor recall sob alta escala |
| **HNSW (Multi-layer Graph)** | $O(\log N)$ | Altíssima velocidade de consulta, consome mais memória RAM |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em PostgreSQL com `pgvector`
```sql
-- Cria índice HNSW com métrica de distância cosseno:
CREATE INDEX ON document_embeddings 
USING hnsw (embedding vector_cosine_ops) 
WITH (m = 16, ef_construction = 64);

-- Busca semântica dos 5 documentos mais similares:
SELECT id, title, 1 - (embedding <=> $1) AS cosine_similarity
FROM document_embeddings
ORDER BY embedding <=> $1
LIMIT 5;
```

</details>
