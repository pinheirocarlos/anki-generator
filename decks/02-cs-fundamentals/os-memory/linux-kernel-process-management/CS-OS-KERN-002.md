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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Ciclo de Vida: Processos Zumbis vs Processos Órfãos</text>
  <g transform="translate(50, 48)">
    <!-- Zombie -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Processo Zumbi (&lt;defunct&gt;)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Processo encerrou, mas o Pai NÃO chamou wait()</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Retém entrada na Tabela de Processos (PID ocupado)</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Muitos zumbis esgotam a tabela de PIDs do OS</text>

    <!-- Orphan -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Processo Órfão</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Processo Pai morreu antes do Processo Filho</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Filho é adotado automaticamente pelo PID 1 (init/systemd)</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">PID 1 executa wait() garantindo limpeza limpa</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Em contêineres Docker, usar tini ou dumb-init como PID 1 previne o acúmulo de processos zumbis.</text>

</svg>
<p>Visualização: Ciclo de vida diferenciando Processos Zumbis (terminados aguardando wait() do pai) de Processos Órfãos (adotados pelo init/systemd PID 1).</p>

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
