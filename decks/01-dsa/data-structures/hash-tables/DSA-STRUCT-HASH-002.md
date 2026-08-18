---
id: DSA-STRUCT-HASH-002
title: "Fator de Carga (Load Factor) e Processo de Rehashing em Tabelas Hash"
tags:
  - level::l3-junior
  - topic::dsa::hash-tables
  - company::amazon
  - freq::high
---

## Pergunta
O que é o **Fator de Carga (Load Factor)** em uma tabela hash e quando o processo de **Rehashing** é disparado?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Fator de Carga ($\alpha$)** mede o nível de ocupação da tabela:
  $$\alpha = \frac{N}{M} = \frac{\text{número de elementos}}{\text{capacidade de buckets}}$$
- Quando $\alpha$ ultrapassa um limiar pré-definido (normalmente $0.75$ em Java `HashMap`):
  1. A capacidade do array de buckets é duplicada ($M \to 2M$).
  2. Um processo de **Rehashing** recalcula o novo índice de cada elemento existente: $\text{hash}(k) \pmod{2M}$.
- O custo do rehashing é $O(N)$, mas ocorre raramente, mantendo o custo médio por inserção em $O(1)$ amortizado.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/hash-table-rehashing-growth-loop.webm">
    <p>Visualização: Disparo de redimensionamento ao atingir fator de carga alpha >= 0.75 com alocação de nova tabela 2x e re-hash.</p>
  </video>
</div>

| Fator de Carga ($\alpha$) | Risco de Colisão | Ocupação de Memória |
|---|---|---|
| **$\alpha < 0.5$** | Muito baixo (rápido) | Desperdício de memória |
| **$\alpha = 0.75$ (Ideal)** | Balanceamento ótimo | Trade-off equilibrado |
| **$\alpha > 1.0$** | Altíssimo (degradação) | Array superlotado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Pré-dimensionar a capacidade inicial do mapa ao conhecer o volume de dados (`new HashMap<>(expectedSize / 0.75f)`) elimina rehashings custosos durante a execução.

</details>
