---
id: CS-NET-DNS-001
title: "Handshake do TLS 1.3 (1-RTT e 0-RTT PSK) vs TLS 1.2 (2-RTT)"
tags:
  - level::l4-pleno
  - topic::cs::networking
  - company::meta
  - freq::high
---

## Pergunta
Como o **Handshake do TLS 1.3** reduziu a latência de estabelecimento seguro para 1 RTT (ou 0-RTT com PSK) em relação ao TLS 1.2?

## Resposta
### Quick Answer
**Solução Direta**:
- **TLS 1.2 (2 RTTs)**:
  - RTT 1: Troca de algoritmos suportados (`ClientHello` $\to$ `ServerHello` + Certificado).
  - RTT 2: Troca de chaves Diffie-Hellman e verificação de integridade (`ClientKeyExchange` $\to$ `Finished`).
- **TLS 1.3 (1 RTT)**:
  - O cliente adivinha os algoritmos criptográficos modernos mais comuns e **envia sua chave pública Diffie-Hellman (ECDHE) já dentro do primeiro `ClientHello`**.
  - O servidor responde com seu certificado e sua chave pública no `ServerHello`. A partir desse momento, ambos já possuem a chave de sessão simétrica (AES-GCM) pronta em **1 único RTT**.
- **0-RTT Resumption (Early Data)**: Clientes que já visitaram o site anteriormente utilizam um *Pre-Shared Key (PSK)* para enviar dados criptografados na primeira mensagem, com **zero RTT** de espera.

### Dual Coding Visual
| Versão TLS | RTTs de Handshake | Algoritmos Criptográficos Legados (RSA Key Exch, CBC, MD5) |
|---|---|---|
| **TLS 1.2** | 2 RTTs | Suportados (Vulnerabilidades conhecidas) |
| **TLS 1.3** | 1 RTT (0-RTT com PSK) | Removidos totalmente (Apenas Ciphers Seguros) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Proteção contra Replay Attack em 0-RTT
- Mensagens enviadas em 0-RTT podem ser capturadas por um atacante e reenviadas (*Replay Attack*).
- Por essa razão, servidores e CDNs só aceitam requisições **idempotentes e seguras (como HTTP GET)** no modo 0-RTT; mutações (POST/PUT de pagamento) são forçadas a esperar o handshake de 1 RTT completo.

#### Key Takeaways
- O TLS 1.3 eliminou todas as cifras criptográficas inseguras do passado e tornou o algoritmo **Ephemeral Diffie-Hellman (ECDHE)** obrigatório, garantindo **Forward Secrecy** total.

</details>
