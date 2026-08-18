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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/unix-domain-sockets-vs-loopback-loop.webm">
    <p>Visualização: UDS eliminando encapsulamento de cabeçalhos TCP/IP, checksums e controle de congestionamento na mesma máquina.</p>
  </video>
</div>

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
