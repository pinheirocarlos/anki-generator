---
id: BEH-SRE-CHAOS-000
title: "Fundamentos de Capacity Planning e Dimensionamento de Headroom"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::netflix
  - freq::high
---

## Pergunta
O que é **Capacity Planning (Planejamento de Capacidade)** em infraestrutura de nuvem e engenharia backend?

## Resposta
### Quick Answer
**Solução Direta**:
- **Conceito**: Processo sistemático de estimar e provisionar recursos computacionais (CPU, memória RAM, IOPS de disco, throughput de rede) para garantir que a infraestrutura suporte a demanda futura com confiabilidade.
- **Headroom de Segurança**:
  - Prática padrão de manter entre **30% e 50% de capacidade excedente** (*headroom*) acima do pico esperado.
  - Permite absorver picos repentinos de tráfego, rebalanceamentos de cluster e quedas de zonas de disponibilidade (AZ failover) sem degradação de SLO.

### Dual Coding Visual
| Recurso Crítico | Métrica Monitorada | Risco de Subdimensionamento |
|---|---|---|
| **CPU / Threads** | % de utilização e Load Average | Enfileiramento e aumento de latência p99 |
| **Memória RAM** | RSS e Heap Usage | OOM Killer encerrando processos |
| **IOPS de Disco** | Fila de I/O e latência de leitura | Bloqueio de queries no banco de dados |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fórmula Básica de Estimativa de Capacidade
$$\text{Capacidade Total Necessária} = \text{Pico Esperado de QPS} \times \text{Custo por Requisição} \times (1 + \text{Headroom})$$

```text
Exemplo:
- Pico Projetado: 10.000 QPS
- Capacidade por Container: 500 QPS
- Headroom Recomendado: 40%
-> Containers Necessários = (10.000 / 500) * 1.4 = 28 instâncias ativas
```

#### Key Takeaways
- Planejamento de capacidade equilibra estabilidade e custos, evitando tanto o colapso do sistema por subdimensionamento quanto o desperdício orçamentário por superdimensionamento estático.

</details>
