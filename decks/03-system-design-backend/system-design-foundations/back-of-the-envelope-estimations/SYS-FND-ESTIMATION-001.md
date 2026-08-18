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
