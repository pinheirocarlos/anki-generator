---
id: SYS-MSG-KAFKA-000
title: "Apache Kafka: Log Append-Only, Partições e Consumer Groups"
tags:
  - level::l3-junior
  - topic::sys::messaging
  - company::linkedin
  - freq::high
---

## Pergunta
Como o particionamento de tópicos e o modelo de Consumer Groups viabilizam escalabilidade horizontal e ordem estrita de mensagens no Apache Kafka?

## Resposta
### Quick Answer
**Solução Direta**:
- **Partições como Log Append-Only**:
  - Um Tópico no Kafka é dividido em múltiplas **Partições**.
  - Cada partição é um log ordenado e imutável gravado sequencialmente em disco com identificadores sequenciais chamados **Offsets**.
- **Garantia de Ordem**: O Kafka garante ordem estrita de mensagens **dentro da mesma partição** (mensagens com a mesma `Partition Key` caem garantidamente na mesma partição).
- **Consumer Groups**:
  - Cada partição de um tópico é consumida por **exatamente um consumidor** dentro do mesmo Consumer Group.
  - Aumentar o paralelismo exige aumentar o número de partições ($N$ partições suportam até $N$ consumidores ativos em paralelo).

### Dual Coding Visual
| Componente Kafka | Papel Estrutural | Regra de Escala |
|---|---|---|
| **Partição** | Unidade básica de paralelismo e ordem | Mensagens com mesma chave mantêm ordem estrita |
| **Offset** | Posição sequencial do consumidor no log | Controlado pelo consumidor (replayável) |
| **Consumer Group** | Conjunto de workers balanceados | No máximo 1 consumidor por partição |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o Kafka é tão Rápido
1. **I/O Sequencial em Disco**: Append-only log aproveita a alta largura de banda sequencial do SO.
2. **OS Page Cache**: Mensagens recentes ficam na RAM gerenciadas pelo Kernel do Linux.
3. **Zero-Copy Transfer (`sendfile`)**: Transfere bytes do Page Cache direto para o socket de rede sem passar pelo User Space.

</details>
