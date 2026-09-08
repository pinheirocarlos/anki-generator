---
id: SYS-FND-ESTIMATION-001
title: "Cálculo de Throughput (QPS Médio vs Pico) e Dimensionamento de Storage"
tags:
  - level::l4-pleno
  - topic::sys::foundations
  - company::meta
  - freq::high
---

## Pergunta
Como calcular a taxa de requisições por segundo (QPS médio e pico) e a capacidade de armazenamento necessária para 5 anos a partir do volume de usuários ativos diários (DAU)?

## Resposta
### Quick Answer
**Solução Direta**:
- **QPS Médio**: $\text{QPS} = \frac{\text{DAU} \times \text{Req por Usuário}}{86.400 \text{ s}} \approx \frac{\text{DAU} \times \text{Req}}{10^5}$.
- **QPS de Pico**: Geralmente dimensionado como **2x a 5x** do QPS médio para absorver flutuações sazonais.
- **Storage Diário**: $\text{Bytes/dia} = \text{DAU} \times \text{Gravações/Usuário} \times \text{Tamanho Médio do Payload}$.
- **Storage 5 Anos**: $\text{Storage Diário} \times 365 \times 5 \approx \text{Storage Diário} \times 2.000$.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Dimensionamento Back-of-the-Envelope: QPS, Throughput e Storage para 5 Anos</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Cálculo de QPS (300M DAU)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="9" text-anchor="middle">300M * 5 req/dia = 1.5 Bilhões req/dia</text>
    <text x="140" y="65" fill="#86efac" font-size="10" font-family="monospace" text-anchor="middle">QPS Médio = 1.5B / 86.400s ≈ 17.500 QPS</text>
    <text x="140" y="90" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Pico (Peak 2x) = ~35.000 QPS</text>

    <rect x="320" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Storage para 5 Anos (100KB/post)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="9" text-anchor="middle">30M posts/dia * 100KB = 3 TB/dia</text>
    <text x="460" y="65" fill="#86efac" font-size="10" font-family="monospace" text-anchor="middle">3 TB * 365 dias = ~1.1 PB / ano</text>
    <text x="460" y="90" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Total 5 Anos = ~5.5 Petabytes</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">A regra de bolso 80-20 de Pareto: 20% das chaves geram 80% do tráfego → Memória RAM para cache de 20% do volume diário (600 GB).</text>

</svg>
<p>Visualização: Cálculo de dimensionamento convertendo DAU para QPS médio, pico de tráfego e armazenamento para 5 anos.</p>

| Parâmetro de Cálculo | Fórmula Simplificada | Regra Prática FAANG |
|---|---|---|
| **Segundos por Dia** | 86.400 s | Arredondar para $10^5$ (100.000 s) |
| **QPS de Pico** | QPS Médio $\times$ Multiplicador | Fator 2x a 5x (ou 10x para flash events) |
| **Retenção 5 Anos** | Diário $\times 365 \times 5$ | $\approx 2.000$ dias de volume |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Prático: Sistema com 100M DAU
1. **Cenário**: 100 Milhões de DAU, cada usuário faz 10 leituras e 2 escritas por dia (1 KB por escrita).
2. **QPS de Leitura**:
   $$\text{QPS}_{read} = \frac{100\text{M} \times 10}{100.000} = 10.000 \text{ QPS (Médio)} \rightarrow 20.000 \text{ QPS (Pico 2x)}$$
3. **QPS de Escrita**:
   $$\text{QPS}_{write} = \frac{100\text{M} \times 2}{100.000} = 2.000 \text{ QPS (Médio)} \rightarrow 4.000 \text{ QPS (Pico 2x)}$$
4. **Armazenamento para 5 Anos**:
   - Diário: $100\text{M} \times 2 \times 1\text{ KB} = 200\text{ GB/dia}$.
   - 5 Anos: $200\text{ GB} \times 2.000 = 400\text{ TB}$ (sem replicação) $\rightarrow \times 3$ (com replicação) $= 1.2\text{ PB}$.

</details>
