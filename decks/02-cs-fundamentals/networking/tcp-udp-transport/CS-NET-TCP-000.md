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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">TCP vs UDP: Confiabilidade vs Baixa Latência</text>
  <g transform="translate(50, 48)">
    <!-- TCP -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">TCP (Orientado a Conexão)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Garante entrega ordenada sem perdas (Retransmissão)</text>
    <text x="135" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Controle de Fluxo &amp; Congestionamento</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">HTTP, SSH, Bancos de Dados, SMTP</text>

    <!-- UDP -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">UDP (Datagramas Sem Conexão)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Sem handshake, sem garantias de ordem</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Overhead mínimo (cabeçalho de apenas 8 Bytes)</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">DNS, VoIP, Live Video, Jogos FPS, QUIC</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">QUIC constrói confiabilidade e criptografia TLS 1.3 no espaço do usuário diretamente sobre UDP.</text>

</svg>
<p>Visualização: Comparação entre TCP (conexão confiável, retransmissão e ordenação) e UDP (datagramas rápidos com overhead de 8 bytes e sem garantias).</p>

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
