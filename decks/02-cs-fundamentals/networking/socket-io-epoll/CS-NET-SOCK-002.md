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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/networking/tcp-timewait-2msl-drain-loop.webm">
    <p>Visualização: Retenção do socket por 2MSL garantindo que o ACK final chegue ao servidor e pacotes obsoletos na rede expirem.</p>
  </video>
</div>

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
