---
id: CS-NET-TCP-000
title: "Garantias Fundamentais: TCP (Confiável/Orientado a Conexão) vs UDP (Datagrama/Rápido)"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::google
  - freq::high
---

## Pergunta
Quais são as diferenças essenciais de garantias entre o protocolo **TCP** e o protocolo **UDP** na camada de transporte?

## Resposta
### Quick Answer
**Solução Direta**:
- **TCP (Transmission Control Protocol)**:
  - Orientado a conexão (exige Handshake de 3 vias).
  - Garante entrega confiável, retransmissão de perdas e ordenação estrita de bytes via números de sequência e ACKs.
  - Implementa controle de fluxo e controle de congestionamento adaptativo.
- **UDP (User Datagram Protocol)**:
  - Sem conexão (*Connectionless*) e não-confiável (*Best-effort*).
  - Não garante entrega, ordem de pacotes nem retransmissão; possui overhead mínimo de cabeçalho (8 bytes vs 20-60 bytes do TCP).
  - Ideal para streaming de vídeo em tempo real, chamadas de voz (VoIP), jogos online, DNS e protocolo QUIC.

### Dual Coding Visual
| Característica | TCP | UDP |
|---|---|---|
| **Confiabilidade & Ordem** | Garantida com retransmissão | Não garantida (Best-Effort) |
| **Overhead de Cabeçalho** | 20 a 60 bytes | 8 bytes fixos |
| **Controle de Congestionamento** | Sim (CUBIC, BBR) | Não (Envia em taxa máxima) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia do Telefonema vs Carta Postal
- **TCP**: É um telefonema. Você liga, a pessoa atende, vocês confirmam que estão se ouvindo ("Alô?", "Oi, tudo bem?"), e você só continua falando após cada confirmação de entendimento.
- **UDP**: É enviar um cartão postal pelo correio. Você despacha a mensagem sem saber se a pessoa está em casa; se o carteiro perder a carta, você não recebe nenhum aviso.

#### Key Takeaways
- Use TCP para sistemas onde a perda de 1 único byte corrompe a mensagem (HTTP, bancos de dados, SSH, transferências de arquivos). Use UDP para dados com valor perecível em tempo real.

</details>
