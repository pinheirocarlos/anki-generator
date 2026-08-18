---
id: CS-NET-HTTP-003
title: "HTTP/3 sobre QUIC/UDP e Eliminação de Head-of-Line Blocking de Transporte"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::meta
  - freq::high
---

## Pergunta
Como o **HTTP/3 sobre QUIC/UDP** elimina o Head-of-Line Blocking na camada de transporte e atinge 0-RTT de estabelecimento?

## Resposta
### Quick Answer
**Solução Direta**:
- **QUIC sobre UDP**: O HTTP/3 abandona o TCP e opera sobre o protocolo **QUIC**, que roda em userspace sobre datagramas **UDP**.
- **Eliminação Total de HoL Blocking**: No QUIC, cada stream possui seu próprio controle de perdas e números de sequência isolados. Se 1 pacote de um stream for perdido, **apenas esse stream pausa para retransmissão**; todos os outros streams continuam entregando bytes sem interrupção.
- **Handshake Unificado (0-RTT / 1-RTT)**: O QUIC funde o handshake de transporte com o handshake de criptografia do **TLS 1.3** em um único fluxo, estabelecendo conexão segura em **1 RTT** (ou **0-RTT** para conexões reutilizadas com chaves pré-compartilhadas).

### Dual Coding Visual
| Propriedade de Rede | HTTP/2 (sobre TCP + TLS 1.3) | HTTP/3 (sobre QUIC / UDP) |
|---|---|---|
| **Camada de Transporte** | TCP (Kernel) | QUIC sobre UDP (Userspace) |
| **HoL Blocking sob Perda de Pacote**| Trava todos os streams da conexão | Trava apenas o stream afetado |
| **Latência de Handshake Inicial**| 2 a 3 RTTs (TCP + TLS separados) | 1 RTT unificado (0-RTT com cache) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Comparação de Latência em Redes Instáveis
- Em redes com 2% de perda de pacotes (redes móveis e Wi-Fi público), o HTTP/2 sofre quedas severas de vazão devido ao HoL blocking do TCP. O HTTP/3 mantém performance praticamente constante e entrega páginas até **30% mais rápido**.

#### Key Takeaways
- O HTTP/3 utiliza **QPACK** para compressão de headers, evitando dependências de ordem que reintroduziriam HoL blocking entre streams.

</details>
