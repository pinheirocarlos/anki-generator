---
id: CS-OS-SYS-002
title: "Zero-Copy no Linux com a Syscall sendfile()"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::netflix
  - freq::high
---

## Pergunta
Como a técnica de **Zero-Copy** com a syscall **`sendfile()`** transfere arquivos para a rede sem copiar bytes para o Userspace?

## Resposta
### Quick Answer
**Solução Direta**:
- **Caminho Tradicional (`read()` + `write()` = 4 cópias + 4 trocas de modo)**:
  1. Disco $	o$ Page Cache do Kernel (via DMA).
  2. Page Cache $	o$ Buffer de Userspace da Aplicação (Cópia pela CPU).
  3. Buffer de Userspace $	o$ Socket Buffer do Kernel (Cópia pela CPU).
  4. Socket Buffer $	o$ Placa de Rede NIC (via DMA).
- **Com `sendfile()` (Zero-Copy = 2 cópias DMA + 0 cópias de CPU)**:
  - O kernel transfere os dados diretamente do **Page Cache para a Placa de Rede (NIC)** via descritores de DMA com *Scatter-Gather*, sem transferir nenhum byte para a memória da aplicação.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/linux-zero-copy-sendfile-loop.webm">
    <p>Visualização: Transferência direta de dados do Page Cache para o Socket Buffer via DMA sem passar pelo User Space.</p>
  </video>
</div>

| Método de Transferência | Cópias de Dados na RAM | Trocas de Modo (Context Switches) |
|---|---|---|
| **`read()` + `write()`** | 4 cópias (2 por CPU + 2 DMA) | 4 trocas (User $	o$ Kernel $	o$ User $	o$ Kernel) |
| **`sendfile()` (Zero-Copy)** | 2 cópias (Apenas DMA) | 2 trocas (Apenas 1 syscall única) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Uso em Produção: Kafka e NGINX
- O **Apache Kafka** e o **NGINX** entregam petabytes de arquivos estáticos e mensagens com quase 0% de uso de CPU porque operam 100% sobre `sendfile()` / `splice()`, permitindo que o hardware de DMA e a rede saturem links de 100 Gbps.

#### Key Takeaways
- Zero-Copy economiza largura de banda de barramento de memória RAM e elimina cache evictions nos caches L1/L2/L3 da CPU.

</details>
