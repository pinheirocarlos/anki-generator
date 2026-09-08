---
id: CS-NET-TCP-002
title: "Three-Way Handshake do TCP (SYN, SYN-ACK, ACK) e Sincronização de ISN"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::amazon
  - freq::high
---

## Pergunta
Como funciona o **Three-Way Handshake (SYN, SYN-ACK, ACK)** do TCP e por que são necessárias 3 etapas para sincronizar números de sequência?

## Resposta
### Quick Answer
**Solução Direta**:
- O handshake de 3 vias estabelece uma conexão TCP bidirecional e sincroniza os **Initial Sequence Numbers (ISN)** de ambos os lados:
  1. **Passo 1 (SYN)**: O cliente escolhe um ISN aleatório $X$ e envia `SYN(seq=X)` para o servidor (Cliente entra em `SYN_SENT`).
  2. **Passo 2 (SYN-ACK)**: O servidor aloca buffers, escolhe seu próprio ISN $Y$, e envia `SYN-ACK(seq=Y, ack=X+1)` confirmando o SYN do cliente (Servidor entra em `SYN_RCVD`).
  3. **Passo 3 (ACK)**: O cliente envia `ACK(seq=X+1, ack=Y+1)` confirmando o SYN do servidor (Ambos entram em `ESTABLISHED`).
- 3 etapas são o mínimo matemático necessário para que ambos os nós confirmem que os canais de envio e recepção estão 100% operacionais nos dois sentidos.

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Three-Way Handshake do TCP: Sincronização de ISN</text>
  <g transform="translate(60, 48)">
    <!-- Client -->
    <rect x="0" y="0" width="120" height="95" rx="5" fill="#1e293b" stroke="#38bdf8"/>
    <text x="60" y="25" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Cliente</text>
    <text x="60" y="55" fill="#94a3b8" font-size="10" text-anchor="middle">CLOSED</text>
    <text x="60" y="80" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">ESTABLISHED</text>

    <!-- Arrows -->
    <g transform="translate(130, 10)">
      <line x1="0" y1="10" x2="300" y2="25" stroke="#38bdf8" stroke-width="2"/>
      <text x="150" y="12" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">1. SYN (seq = ISN_c)</text>

      <line x1="300" y1="35" x2="0" y2="50" stroke="#10b981" stroke-width="2"/>
      <text x="150" y="40" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">2. SYN-ACK (seq = ISN_s, ack = ISN_c + 1)</text>

      <line x1="0" y1="60" x2="300" y2="75" stroke="#38bdf8" stroke-width="2"/>
      <text x="150" y="68" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">3. ACK (ack = ISN_s + 1)</text>
    </g>

    <!-- Server -->
    <rect x="440" y="0" width="120" height="95" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="500" y="25" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Servidor</text>
    <text x="500" y="55" fill="#94a3b8" font-size="10" text-anchor="middle">LISTEN</text>
    <text x="500" y="80" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">ESTABLISHED</text>
  </g>
  <text x="340" y="180" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">O ISN (Initial Sequence Number) é gerado de forma pseudorandômica para evitar ataques de injeção e session hijacking.</text>

</svg>
<p>Visualização: Fluxo do Three-Way Handshake TCP (SYN, SYN-ACK, ACK) sincronizando números de sequência iniciais (ISN) em 1 RTT.</p>

| Etapa do Handshake | Origem $\to$ Destino | Flags e Números de Sequência |
|---|---|---|
| **1. SYN** | Cliente $\to$ Servidor | `SYN=1`, `seq=X` |
| **2. SYN-ACK** | Servidor $\to$ Cliente | `SYN=1`, `ACK=1`, `seq=Y`, `ack=X+1` |
| **3. ACK** | Cliente $\to$ Servidor | `ACK=1`, `seq=X+1`, `ack=Y+1` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o ISN é Aleatório (SYN Flood & TCP Spoofing)
- O ISN não começa em zero por razões de segurança: números previsíveis permitiriam a invasores injetar pacotes forjados (*TCP Connection Hijacking*).
- Além disso, evita que pacotes atrasados de uma conexão TCP anterior terminada interfiram em uma nova conexão no mesmo par de portas.

#### Key Takeaways
- O Three-Way Handshake introduz **1 RTT completo (Round-Trip Time)** de latência antes que qualquer byte de dados da aplicação possa trafegar.

</details>
