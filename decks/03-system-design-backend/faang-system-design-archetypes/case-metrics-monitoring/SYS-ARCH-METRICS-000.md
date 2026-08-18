---
id: SYS-ARCH-METRICS-000
title: "Bancos de Séries Temporais (TSDB): Compressão Gorilla (XOR Float + Delta-of-Delta)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::meta
  - freq::high
---

## Pergunta
Como o algoritmo de compressão Gorilla (desenvolvido pelo Facebook/Meta) comprime timestamps e valores decimais (floats) em mais de 10x na memória RAM?

## Resposta
### Quick Answer
**Solução Direta**:
- **Compressão de Timestamps (Delta-of-Delta)**:
  - Métricas são coletadas em intervalos regulares (ex: a cada 10s).
  - O primeiro delta é $D = t_i - t_{i-1} = 10\text{s}$. O delta do delta é $D' = (t_i - t_{i-1}) - (t_{i-1} - t_{i-2}) = 0$.
  - Se $D' = 0$, o Gorilla grava **apenas 1 bit (`0`)** em vez de 64 bits (`int64`).
- **Compressão de Valores (XOR de Floats)**:
  - Valores de métricas consecutivas (ex: uso de CPU $45.2\% \rightarrow 45.3\%$) compartilham a mesma representação de bits de expoente e mantissa IEEE 754.
  - Executa $V_i \oplus V_{i-1}$ e armazena apenas os bits significativos entre os zeros líderes e finais.
- Reduz o tamanho médio de cada ponto de telemetria de 16 bytes para **apenas 1.37 bytes (redução de ~12x)**.

### Dual Coding Visual
| Campo da Métrica | Formato Bruto sem Compressão | Formato Comprimido Gorilla |
|---|---|---|
| **Timestamp (Epoch ms)** | 64 bits (8 bytes) | **1 a 4 bits na maioria dos pontos** |
| **Valor Float64** | 64 bits (8 bytes) | **~1 a 10 bits após XOR** |
| **Total por Ponto** | 128 bits (16 bytes) | **~11 bits (~1.37 bytes)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Impacto na Capacidade de Ingestão
- A compressão Gorilla permitiu ao Facebook manter dezenas de bilhões de pontos de séries temporais na memória RAM de um cluster distribuído com latência de consulta sub-segundo para dashboards do Grafana.

</details>
