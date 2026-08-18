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
