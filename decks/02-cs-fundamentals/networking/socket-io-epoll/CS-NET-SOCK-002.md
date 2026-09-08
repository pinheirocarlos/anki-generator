---
id: CS-NET-SOCK-002
title: "Estado TIME_WAIT na Máquina de Estados TCP e Período 2MSL"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::netflix
  - freq::high
---

## Pergunta
O que é o estado **TIME_WAIT** no encerramento de conexões TCP e por que o kernel mantém o socket retido por $2 	imes 	ext{MSL}$ (~60s)?

## Resposta
### Quick Answer
**Solução Direta**:
- **TIME_WAIT**: É o estado final assumido pelo nó que toma a iniciativa de **fechar ativamente a conexão** (`active closer`) após enviar o último ACK do encerramento (Four-Way Teardown).
- O kernel mantém a 4-tupla (`IP_origem, Porta_origem, IP_destino, Porta_destino`) bloqueada por **$2 	imes 	ext{MSL}$ (Maximum Segment Lifetime)**, tipicamente 60 segundos no Linux, por 2 razões fundamentais:
  1. **Garantir a entrega do último ACK**: Se o último ACK for perdido, o outro nó retransmitirá seu `FIN`; estando em `TIME_WAIT`, o nó reenvia o `ACK` sem emitir um erro de conexão resetada (`RST`).
  2. **Drenagem de pacotes fantasmas**: Garante que qualquer pacote atrasado ou duplicado da conexão anterior morra na rede antes que uma nova conexão use a mesma porta.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estado TIME_WAIT e Período 2MSL no Encerramento TCP</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">O lado que inicia o encerramento ativo (FIN) entra em TIME_WAIT</text>
    <text x="280" y="46" fill="#f8fafc" font-size="11" text-anchor="middle">Duração: 2MSL (Maximum Segment Lifetime = ~60 a 120 segundos)</text>
    <text x="280" y="70" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">Finalidade: 1) Garantir que último ACK chegue | 2) Drenar pacotes duplicados atrasados na rede</text>
  </g>
  <text x="340" y="165" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">Perigo em Microservices: Milhares de conexões curtas sem Keep-Alive esgotam a tabela de portas efêmeras (Port Exhaustion).</text>

</svg>
<p>Visualização: Estado TIME_WAIT retendo o socket durante 2MSL para prevenir colisões de pacotes de conexões antigas e garantir entrega do ACK final.</p>

| Lado do Encerramento | Sequência de Estados de Término | Assume TIME_WAIT? |
|---|---|---|
| **Active Closer (Inicia o Close)** | `ESTABLISHED` $\to$ `FIN_WAIT_1` $\to$ `FIN_WAIT_2` $\to$ **`TIME_WAIT`** | **Sim (Retido por 2MSL)** |
| **Passive Closer (Recebe o FIN)** | `ESTABLISHED` $\to$ `CLOSE_WAIT` $\to$ `LAST_ACK` $\to$ `CLOSED` | Não (Liberado após o último ACK) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Perigo de Saturação de Portas Efêmeras (TIME_WAIT Accumulation)
- Se um servidor backend abrir e fechar milhares de conexões HTTP curtas por segundo com um banco de dados ou microsserviço sem Connection Pooling:
- Todas as ~30.000 portas efêmeras locais entram em `TIME_WAIT`, causando o erro clássico **`EADDRNOTAVAIL (Cannot assign requested address)`**.
- **Solução**: Usar conexões persistentes (*HTTP Keep-Alive / Connection Pool*) ou habilitar `tcp_tw_reuse` no kernel Linux.

#### Key Takeaways
- TIME_WAIT não é um vazamento de memória nem um bug, mas um mecanismo de segurança essencial do protocolo TCP.

</details>
