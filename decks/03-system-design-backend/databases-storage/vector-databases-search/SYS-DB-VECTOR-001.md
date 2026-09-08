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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bancos de Dados Vetoriais &amp; Grafo HNSW (Hierarchical Navigable Small World)</text>
  <g transform="translate(40, 50)">
    <!-- Layer 2 (Express) -->
    <rect x="0" y="0" width="600" height="35" rx="4" fill="#0c4a6e" stroke="#38bdf8" stroke-width="1"/>
    <text x="50" y="22" fill="#38bdf8" font-size="10" font-weight="bold">Layer 2</text>
    <text x="300" y="22" fill="#ffffff" font-size="10" text-anchor="middle">Saltos Longos (Conexões Esparsas Globais) → Início da Busca ANN</text>

    <!-- Layer 1 (Medium) -->
    <rect x="0" y="45" width="600" height="35" rx="4" fill="#075985" stroke="#38bdf8" stroke-width="1"/>
    <text x="50" y="67" fill="#38bdf8" font-size="10" font-weight="bold">Layer 1</text>
    <text x="300" y="67" fill="#ffffff" font-size="10" text-anchor="middle">Conexões Intermediárias (Aproximação do Cluster Semântico)</text>

    <!-- Layer 0 (Dense) -->
    <rect x="0" y="90" width="600" height="35" rx="4" fill="#0369a1" stroke="#10b981" stroke-width="1.5"/>
    <text x="50" y="112" fill="#86efac" font-size="10" font-weight="bold">Layer 0</text>
    <text x="300" y="112" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Grafo Denso com Todos os Vetores (Busca K-NN Exata por Similaridade de Cosseno)</text>
  </g>
  <text x="340" y="205" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">HNSW atinge complexidade O(log N) para busca de vizinhos mais próximos em embeddings de 1536 dimensões.</text>

</svg>
<p>Visualização: Grafo multicamadas HNSW navegando por saltos longos na camada superior e busca de vizinhos densa na camada inferior.</p>

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
