---
id: CS-OS-KERN-002
title: "Ciclo de Vida de Processos: Processos Zumbis vs Processos Órfãos"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre um **Processo Zumbi (`defunct`)** e um **Processo Órfão** no sistema operacional Linux?

## Resposta
### Quick Answer
**Solução Direta**:
- **Processo Zumbi (`defunct` / `Z` no `ps`)**:
  - É um processo que já terminou sua execução (`exit()`), liberou toda a sua memória RAM, arquivos e recursos, mas **continua ocupando uma entrada na Tabela de Processos do Kernel**.
  - Permanece retido até que o processo pai leia seu código de saída com a syscall **`wait()` / `waitpid()`** (*Reaping*).
  - *Perigo*: Centenas de zumbis esgotam a tabela de PIDs do kernel (`/proc/sys/kernel/pid_max`), impedindo o sistema de iniciar qualquer novo processo.
- **Processo Órfão**:
  - É um processo cujo processo pai morreu antes dele.
  - O kernel Linux automaticamente adota o processo órfão, reatribuindo seu pai para o **PID 1 (`systemd` / `init`)**, que chama `wait()` periodicamente para coletar seu status quando ele morrer.

### Dual Coding Visual
| Tipo de Processo | O Processo ainda Roda Código? | Causa Raiz do Problema |
|---|---|---|
| **Zumbi (`defunct`)** | Não (Morto, apenas retém o PID) | O pai esqueceu de chamar `waitpid()` |
| **Órfão** | Sim (Executando normalmente) | O pai terminou antes do filho |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Problema do PID 1 em Containers Docker
- Se sua aplicação Node.js ou Go rodar como PID 1 dentro de um container Docker sem um init system leve (como `tini`) e criar processos filhos que morrem, esses processos viram zumbis eternos porque o Node.js não implementa reaping de sinais `SIGCHLD`.
- **Solução**: Usar a flag `docker run --init` para embutir um init system correto.

#### Key Takeaways
- Um processo zumbi não consome memória RAM nem CPU; seu único consumo é um slot numérico na tabela de PIDs do kernel.

</details>
