---
id: CS-NET-HTTP-001
title: "Compressão de Cabeçalhos HPACK (HTTP/2) vs QPACK (HTTP/3)"
tags:
  - level::l4-pleno
  - topic::cs::networking
  - company::netflix
  - freq::high
---

## Pergunta
Como funciona a compressão de cabeçalhos **HPACK** no HTTP/2 e por que o HTTP/3 precisou substituí-la pelo **QPACK**?

## Resposta
### Quick Answer
**Solução Direta**:
- **HPACK (HTTP/2)**: Reduz o tamanho de cabeçalhos em até 85% usando 3 mecanismos:
  1. *Tabela Estática*: 61 cabeçalhos pré-definidos (`:method: GET`, `:status: 200`) referenciados por índices de 1 byte.
  2. *Tabela Dinâmica*: Armazena novos headers observados na sessão (ex: tokens JWT longos) para referenciá-los por índice em requisições futuras.
  3. *Codificação Huffman Estática*: Compacta strings personalizadas.
- **Problema no HTTP/3**: O HPACK assume que todos os frames de headers chegam em **ordem estrita**. No QUIC (onde streams chegam fora de ordem), o HPACK causaria bloqueio mútuo entre streams esperando atualizações da tabela dinâmica.
- **QPACK (HTTP/3)**: Separa os fluxos em **Encoder Stream** e **Decoder Stream** dedicados, permitindo decodificação não-bloqueante mesmo com perda de pacotes.

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compressão de Headers: HPACK (HTTP/2) vs QPACK (HTTP/3)</text>
  <g transform="translate(50, 48)">
    <!-- HPACK -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">HPACK (HTTP/2)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Tabela Estática (61 campos pré-definidos)</text>
    <text x="135" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Tabela Dinâmica baseada em conexão TCP</text>
    <text x="135" y="78" fill="#fca5a5" font-size="10" text-anchor="middle">Problema: Se perder pacote, tabela dessincroniza</text>

    <!-- QPACK -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">QPACK (HTTP/3 sobre QUIC)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Projetado para streams UDP não-ordenados</text>
    <text x="445" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Encoder/Decoder control streams independentes</text>
    <text x="445" y="78" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Zero HoL Blocking entre cabeçalhos de streams</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Reduz o tamanho dos cabeçalhos repetidos (Cookies, User-Agent, Auth) em até 85% por requisição.</text>

</svg>

| Mecanismo de Compressão | Protocolo | Tolerância a Entrega Fora de Ordem |
|---|---|---|
| **HPACK** | HTTP/2 (sobre TCP) | Não suporta (Exige entrega estritamente ordenada) |
| **QPACK** | HTTP/3 (sobre QUIC) | Totalmente tolerante (Usa streams de controle dedicados) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que GZIP não é Usado em Cabeçalhos (Ataque CRIME)
- O algoritmo DEFLATE/GZIP em cabeçalhos HTTP foi proibido após a vulnerabilidade criptográfica **CRIME** (2012), onde atacantes conseguiam inferir cookies secretos observando o tamanho de payloads comprimidos com dados controlados pelo invasor.
- O HPACK foi projetado do zero para ser imune a esse vetor de ataque.

#### Key Takeaways
- Um cabeçalho repetido com token JWT de 1 KB que consumiria 1 KB por requisição em HTTP/1.1 é comprimido para **apenas 2 bytes** em HPACK/QPACK após a primeira transmissão.

</details>
