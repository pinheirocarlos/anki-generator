---
id: CS-OS-IPC-002
title: "Unix Domain Sockets (UDS) vs TCP Loopback (127.0.0.1)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::netflix
  - freq::high
---

## Pergunta
Por que a comunicação via **Unix Domain Sockets (UDS)** é até 2x mais rápida e consome menos CPU do que **TCP Loopback (`127.0.0.1`)** no mesmo host?

## Resposta
### Quick Answer
**Solução Direta**:
- **TCP Loopback (`127.0.0.1:8080`)**:
  - Roda a pilha de rede completa do kernel: gera números de sequência TCP, calcula checksums, empacota cabeçalhos IP/TCP, gerencia janelas de congestionamento e ACK de pacotes, embora o tráfego nunca saia da máquina.
- **Unix Domain Sockets (`AF_UNIX` / ex: `/var/run/docker.sock`)**:
  - Abandona toda a pilha de rede e protocolos de transporte.
  - O kernel Linux simplesmente **copia blocos de memória diretamente do buffer de escrita de um processo para o buffer de leitura do outro**, sem empacotamento, sem checksums e sem handshakes TCP.
  - Oferece **o dobro de vazão (throughput)**, **metade da latência** e suporte a controle de permissões por arquivo padrão Unix (`chmod / chown`).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Unix Domain Sockets (UDS) vs TCP Loopback (127.0.0.1)</text>
  <g transform="translate(50, 48)">
    <!-- UDS -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="135" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Unix Domain Socket (AF_UNIX)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Comunicação direta por cópia de buffer no Kernel</text>
    <text x="135" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Sem TCP framing, sem checksum, sem routing</text>
    <text x="135" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Suporta transferência atômica de File Descriptors</text>

    <!-- Loopback -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="445" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">TCP Loopback (127.0.0.1)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Passa pela pilha inteira de rede do Kernel</text>
    <text x="445" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Gera cálculos de checksum e controle de fluxo TCP</text>
    <text x="445" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Consome portas TCP efêmeras locais</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">UDS entrega até 2x mais throughput e metade da latência em comparação com conexões de loopback.</text>

</svg>

| Característica | TCP Loopback (`127.0.0.1`) | Unix Domain Socket (`AF_UNIX`) |
|---|---|---|
| **Caminho dos Dados** | Pilha TCP/IP completa do kernel | Cópia direta de buffer em memória |
| **Segurança e Acesso** | Qualquer processo local conecta na porta | Restrito por permissões de arquivo Unix |
| **Performance Relativa**| Baseline | **~2x mais rápido com menor uso de CPU** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Onde o UDS é Utilizado em Produção
- Comunicação entre **NGINX $	o$ PHP-FPM / Puma / Gunicorn**.
- Comunicação do CLI do Docker com o daemon do Docker (`/var/run/docker.sock`).
- Sidecars no Kubernetes comunicando-se com a aplicação principal no mesmo Pod.

#### Key Takeaways
- Sempre que dois processos rodarem garantidamente dentro do mesmo nó Linux, use Unix Domain Sockets em vez de portas TCP locais.

</details>
