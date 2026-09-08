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
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Topologia de Partições do Apache Kafka &amp; Consumer Groups</text>
  <g transform="translate(40, 50)">
    <!-- Topic Partitions -->
    <rect x="0" y="0" width="300" height="135" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="150" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Kafka Topic: 3 Partições</text>
    
    <!-- Partition 0 -->
    <rect x="15" y="35" width="270" height="26" rx="4" fill="#0284c7"/>
    <text x="150" y="52" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">P0: [Off 0] [Off 1] [Off 2] [Off 3] →</text>

    <!-- Partition 1 -->
    <rect x="15" y="68" width="270" height="26" rx="4" fill="#0284c7"/>
    <text x="150" y="85" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">P1: [Off 0] [Off 1] [Off 2] →</text>

    <!-- Partition 2 -->
    <rect x="15" y="100" width="270" height="26" rx="4" fill="#0284c7"/>
    <text x="150" y="117" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">P2: [Off 0] [Off 1] [Off 2] [Off 3] [Off 4] →</text>

    <!-- Consumer Group -->
    <rect x="340" y="0" width="260" height="135" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="470" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Consumer Group: 3 Instâncias</text>
    <rect x="355" y="35" width="230" height="26" rx="4" fill="#065f46"/>
    <text x="470" y="52" fill="#86efac" font-size="9" text-anchor="middle">Consumer C1 lê Partição 0 exclusivamente</text>
    <rect x="355" y="68" width="230" height="26" rx="4" fill="#065f46"/>
    <text x="470" y="85" fill="#86efac" font-size="9" text-anchor="middle">Consumer C2 lê Partição 1 exclusivamente</text>
    <rect x="355" y="100" width="230" height="26" rx="4" fill="#065f46"/>
    <text x="470" y="117" fill="#86efac" font-size="9" text-anchor="middle">Consumer C3 lê Partição 2 exclusivamente</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">A ordem das mensagens é estritamente garantida dentro de cada partição, nunca entre partições distintas.</text>

</svg>
<p>Visualização: Cada partição do Kafka é um log sequencial distribuído e lido de forma independente por consumidores.</p>

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
