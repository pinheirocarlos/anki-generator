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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Zero-Copy no Linux: A Syscall sendfile() / splice()</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="280" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">sendfile(out_fd, in_fd, offset, count)</text>
    <text x="280" y="48" fill="#f8fafc" font-size="11" text-anchor="middle">Page Cache do Arquivo → DMA → Buffer da Placa de Rede (NIC) diretamente no Kernel</text>
    <text x="280" y="68" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Os dados NUNCA são copiados para o User Space! Reduz o uso de CPU em até 80%.</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Segredo do Throughput Monstruoso do Apache Kafka e Nginx ao servir arquivos e streams estáticos.</text>

</svg>
<p>Visualização: Operação Zero-Copy via sendfile() transferindo blocos do Page Cache diretamente para os buffers do socket de rede via DMA sem travessia para o User Space.</p>

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
