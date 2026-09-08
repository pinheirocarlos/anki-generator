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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Bancos TSDB: Compressão Gorilla (XOR Float + Delta-of-Delta)</text>
  <g transform="translate(40, 50)">
    <!-- Timestamp Compression -->
    <rect x="0" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Timestamps: Delta-of-Delta</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">t0 = 100, t1 = 160 (delta: 60)</text>
    <text x="140" y="65" fill="#cbd5e1" font-size="10" text-anchor="middle">t2 = 220 (delta: 60 → D_of_D = 0)</text>
    <text x="140" y="90" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Armazena exatamente 1 bit '0'</text>

    <!-- Value Compression -->
    <rect x="320" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Valores Float64: XOR Bitwise</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Métricas variam suavemente</text>
    <text x="460" y="65" fill="#cbd5e1" font-size="10" text-anchor="middle">V_current XOR V_prev tem zeros à esq/dir</text>
    <text x="460" y="90" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Comprime 16B para ~1.37 Bytes</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Redução de 12x no consumo de memória RAM e disco em sistemas como Prometheus e Facebook Gorilla TSDB.</text>

</svg>
<p>Visualização: Algoritmo Gorilla comprimindo timestamps com delta-of-delta e valores float via XOR com os bits precedentes.</p>

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
