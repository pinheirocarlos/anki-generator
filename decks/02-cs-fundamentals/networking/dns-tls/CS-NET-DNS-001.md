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
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Handshake TLS 1.3 (1-RTT) vs TLS 1.2 (2-RTT)</text>
  <g transform="translate(50, 48)">
    <!-- TLS 1.2 -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">TLS 1.2: 2-RTT de Negociação</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">RTT 1: ClientHello / ServerHello + Cert</text>
    <text x="135" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">RTT 2: Key Exchange + Finished</text>
    <text x="135" y="78" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Total: 2 RTTs antes de enviar HTTP GET</text>

    <!-- TLS 1.3 -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">TLS 1.3: 1-RTT (Zero Ciphers Fracas)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">RTT 1: ClientHello + Key Share (Diffie-Hellman)</text>
    <text x="445" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">ServerHello + Finished em 1 única ida e volta</text>
    <text x="445" y="78" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Suporte a 0-RTT PSK para conexões prévias</text>
  </g>
  <text x="340" y="180" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Economia de 50% na latência de conexão segura e Forward Secrecy obrigatório por padrão.</text>

</svg>

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
