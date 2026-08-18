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
