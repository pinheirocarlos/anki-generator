---
id: CS-ARCH-IO-000
title: "Diferenças Mecânicas e Latências: HDD Mecânico vs SSD NVMe"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::netflix
  - freq::high
---

## Pergunta
Qual a diferença fundamental de mecânica e latência entre um **HDD mecânico** e um **SSD NVMe**?

## Resposta
### Quick Answer
**Solução Direta**:
- **HDD Mecânico**: Depende de componentes físicos móveis (discos magnéticos girando a 7.200-15.000 RPM e um braço atuador mecânico). A leitura aleatória exige mover o cabeçote (*Seek Time*) e esperar a rotação do disco, resultando em latência de **~5 a 10 milissegundos (ms)**.
- **SSD NVMe**: Construído com chips de memória Flash NAND em estado sólido sem peças móveis, comunicando-se diretamente pelo barramento PCIe de alta velocidade com milhares de filas de comandos paralelas, entregando latência de **~10 a 50 microssegundos (µs)** (~100x a 1000x mais rápido).

### Dual Coding Visual
| Meio de Armazenamento | Latência Típica | IOPS Típico |
|---|---|---|
| **HDD Mecânico** | ~10.000 µs (10 ms) | ~75 a 200 IOPS |
| **SSD SATA III** | ~500 µs (0.5 ms) | ~50.000 a 100.000 IOPS |
| **SSD NVMe (PCIe 4/5)** | ~20 µs (0.02 ms) | ~500.000 a 1.500.000 IOPS |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental do Toca-Discos vs Chip de Silício
- **HDD**: É como um toca-discos de vinil antigo. Se você quiser trocar de faixa aleatoriamente, a agulha precisa levantar fisicamente, viajar até o meio do disco e esperar o sulco correto passar embaixo dela.
- **SSD NVMe**: É como acessar diretamente uma matriz de lâmpadas elétricas onde você acende o interruptor do endereço desejado na velocidade dos elétrons.

#### Key Takeaways
- O protocolo NVMe suporta até 64.000 filas de comandos com 64.000 comandos cada, explorando paralelismo massivo em sistemas multi-core.

</details>
