---
id: CS-ARCH-IO-002
title: "Vantagens de Performance de I/O Sequencial vs Aleatório em Discos"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::amazon
  - freq::high
---

## Pergunta
Por que acessos de I/O **Sequenciais** são ordens de grandeza mais rápidos que acessos **Aleatórios** tanto em HDDs quanto em SSDs?

## Resposta
### Quick Answer
**Solução Direta**:
- **Em HDDs**: O acesso sequencial mantém o braço mecânico imóvel enquanto o disco gira continuamente sob o cabeçote, atingindo até 200 MB/s. No acesso aleatório, cada busca exige deslocar o braço (*Seek Time*), derrubando a taxa efetiva para ~1-2 MB/s.
- **Em SSDs**: Embora não haja braço móvel, a memória Flash organiza dados em *Páginas (4-16 KB)* e *Blocos (2-8 MB)*. Leituras sequenciais ativam múltiplos canais NAND em paralelo e o *Read-Ahead* do controlador; escritas sequenciais evitam fragmentação e o custo severo de *Garbage Collection / Write Amplification* da controladora SSD.

### Dual Coding Visual
| Tipo de Acesso | Comportamento em HDD | Comportamento em SSD NVMe |
|---|---|---|
| **I/O Sequencial** | Braço parado, leitura contínua (~200 MB/s) | Canais NAND em paralelo máximo (~5.000 MB/s) |
| **I/O Aleatório** | Reposicionamento constante do braço (~1 MB/s) | Sobrecarga de lookup e GC Flash (~300-800 MB/s) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implicações em Arquitetura de Software
- Esta diferença fundamental é o motivo pelo qual sistemas distribuídos de altíssimo throughput (como **Apache Kafka**, **Cassandra**, **LSM-Trees**) desenham todas as suas estruturas de armazenamento como **Append-Only Logs** sequenciais.

#### Key Takeaways
- Mesmo em SSDs NVMe de última geração, gravações sequenciais têm throughput 3x a 5x maior e causam menor desgaste (*wear*) nas células NAND Flash.

</details>
