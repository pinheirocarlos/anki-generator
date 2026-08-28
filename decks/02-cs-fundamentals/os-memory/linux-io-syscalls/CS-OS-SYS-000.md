---
id: CS-OS-SYS-000
title: "Transição User Space para Kernel Space em Syscalls no Linux"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
O que acontece na CPU durante a transição de **User Mode (Ring 3)** para **Kernel Mode (Ring 0)** ao executar uma Syscall?

## Resposta
### Quick Answer
**Solução Direta**:
- Processos de aplicação rodam em modo não-privilegiado (**Ring 3 / User Space**) sem permissão para tocar em hardware ou placas de rede.
- **Passo a Passo da Syscall (ex: instrução `SYSCALL` em x86-64)**:
  1. A aplicação coloca o número da syscall no registrador `RAX` e argumentos em `RDI, RSI, RDX...`.
  2. A CPU eleva seu nível de privilégio para **Ring 0 (Kernel Mode)** e salta para o endereço do tratador do kernel (*System Call Table*).
  3. A CPU troca da Stack de Userspace para a **Stack de Kernel** do processo.
  4. O kernel executa a operação protegida e retorna via `SYSRET`, restaurando o Ring 3.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Transição Ring 3 (User) para Ring 0 (Kernel) em Syscalls</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="260" height="80" rx="6" fill="#1e293b" stroke="#38bdf8"/>
    <text x="130" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">User Space (Ring 3)</text>
    <text x="130" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Código da aplicação sem privilégios</text>
    <text x="130" y="62" fill="#bae6fd" font-size="10" text-anchor="middle">Executa instrução SYSCALL no x86-64</text>

    <!-- Transition Arrow -->
    <path d="M 265 40 L 295 40" stroke="#f59e0b" stroke-width="2"/>

    <rect x="300" y="0" width="260" height="80" rx="6" fill="#1e293b" stroke="#f43f5e"/>
    <text x="430" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Kernel Space (Ring 0)</text>
    <text x="430" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Troca de pilha para Kernel Stack</text>
    <text x="430" y="62" fill="#fca5a5" font-size="10" text-anchor="middle">Despacha para a Syscall Table indexada em RAX</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Custo de transição: ~50 a 100 ns por chamada. I/O multiplexado (epoll/io_uring) reduz o volume de syscalls.</text>

</svg>

| Nível de Privilégio | Acesso a Hardware | Estrutura de Stack Ativa |
|---|---|---|
| **Ring 3 (User Space)** | Bloqueado (Dispara Trap de CPU) | Stack da Thread do Processo |
| **Ring 0 (Kernel Space)**| Irrestrito (Memória total / I/O) | Kernel Stack dedicada da Thread |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Custo de uma Syscall
- Uma syscall simples (como `getpid()`) consome em média **50 a 100 nanossegundos**.
- Em loops com milhões de iterações, fazer syscalls a cada byte destruirá o throughput da aplicação; por isso I/O em linguagens modernas utiliza buffers em userspace (`bufio` em Go, `BufferedReader` em Java).

#### Key Takeaways
- Syscalls são a única porta de entrada controlada e segura pela qual processos de userspace solicitam serviços ao sistema operacional.

</details>
