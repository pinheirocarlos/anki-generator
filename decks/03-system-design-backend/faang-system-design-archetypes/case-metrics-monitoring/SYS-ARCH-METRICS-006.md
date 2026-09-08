---
id: SYS-ARCH-METRICS-006
title: "Intuição Fundamental de Métricas & Monitoramento: O Eletrocardiograma Contínuo e o Resumo Diário"
tags:
  - level::l2-fundamental
  - topic::sys::archetypes
  - company::datadog
  - freq::high
---

## Pergunta
Qual é a intuição fundamental da arquitetura de ingestão de métricas e séries temporais (como Datadog ou Prometheus) baseada em Downsampling e Compressão Gorilla?

## Resposta
### Quick Answer
**Solução Direta**:
- Um sistema com 1.000 servidores gerando métricas de CPU, memória e requisições a cada 1 segundo produz **mais de 1 bilhão de pontos de dados por dia**; armazenar todos esses pontos crus por anos esgotaria qualquer orçamento de armazenamento.
- **Bancos de Séries Temporais (TSDB)** resolvem isso com dois pilares:
  1. **Compressão Delta-of-Delta (Gorilla)**: Como os timestamps sobem em intervalos constantes (+10s, +10s), e a CPU varia pouco entre segundos, o algoritmo armazena apenas a **diferença das diferenças**, reduzindo o tamanho de cada ponto para menos de **1.37 bytes**.
  2. **Downsampling (Redução de Resolução)**:
     - Dados dos últimos 7 dias: guardados a cada **1 segundo**.
     - Dados de 30 dias: compactados na média de **1 minuto**.
     - Dados de 1 ano: compactados na média de **1 hora** (economizando 99% do espaço).

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">A Pirâmide de Retenção e Downsampling em TSDB</text>

  <!-- Nível 1: Tempo Real (1 segundo) -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="160" height="90" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="80" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Últimas 24h: 1s</text>
    <text x="80" y="44" fill="#ffffff" font-size="10" text-anchor="middle">Alta Fidelidade (Raw)</text>
    <text x="80" y="64" fill="#34d399" font-size="9" text-anchor="middle">Para alertas imediatos</text>
    <text x="80" y="80" fill="#a7f3d0" font-size="8" text-anchor="middle">86.400 pontos / dia</text>
  </g>

  <!-- Nível 2: Médio Prazo (1 minuto) -->
  <g transform="translate(220, 50)">
    <rect x="0" y="0" width="160" height="90" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="80" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Últimos 30 dias: 1m</text>
    <text x="80" y="44" fill="#ffffff" font-size="10" text-anchor="middle">Média, Min, Max, P99</text>
    <text x="80" y="64" fill="#93c5fd" font-size="9" text-anchor="middle">Compactação de 60:1</text>
    <text x="80" y="80" fill="#64748b" font-size="8" text-anchor="middle">1.440 pontos / dia</text>
  </g>

  <!-- Nível 3: Longo Prazo (1 hora) -->
  <g transform="translate(400, 50)">
    <rect x="0" y="0" width="160" height="90" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="6" />
    <text x="80" y="22" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">Último 1 ano: 1h</text>
    <text x="80" y="44" fill="#ffffff" font-size="10" text-anchor="middle">Tendências &amp; Capacity</text>
    <text x="80" y="64" fill="#a5b4fc" font-size="9" text-anchor="middle">Compactação de 3600:1</text>
    <text x="80" y="80" fill="#64748b" font-size="8" text-anchor="middle">24 pontos / dia</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">A compressão Gorilla em memória RAM reduz o uso de espaço em mais de 10x!</text>
</svg>
<p>Visualização: Pirâmide de retenção em banco temporal reduzindo granularidade e custo de armazenamento via downsampling contínuo.</p>

| Conceito de Métricas | O que Representa | Analogia do Cotidiano |
|---|---|---|
| **Dado Bruto (Raw)** | Leitura segundo a segundo com resolução máxima | O monitor cardíaco apitando a cada batimento na UTI. |
| **Downsampling** | Agregação estatística (Média, Mínimo, Máximo, Percentil) | A planilha semanal onde você anota apenas seu peso de cada manhã. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Porquê de Medir Percentis (P95, P99) em vez de Médias
Se 99 pessoas forem atendidas em 10 milissegundos e 1 pessoa for atendida em 10 segundos:
- A **média** parecerá excelente (~109 ms), escondendo o sofrimento do cliente.
- O **P99 (Percentil 99)** mostrará a verdade: *"1% dos seus clientes está esperando 10 segundos!"*

#### Key Takeaways
- Bancos especializados (Prometheus, InfluxDB, VictoriaMetrics, TimescaleDB, Amazon Timestream) são projetados para ingestão massiva e consultas analíticas no tempo.

</details>
