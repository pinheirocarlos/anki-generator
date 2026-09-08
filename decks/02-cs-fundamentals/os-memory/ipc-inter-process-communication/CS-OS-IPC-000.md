---
id: CS-OS-IPC-000
title: "Comparação de IPC: Pipes Anônimos vs Named Pipes (FIFOs)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
Qual é a diferença funcional entre **Pipes Anônimos** e **Named Pipes (FIFOs)** para comunicação entre processos no Linux?

## Resposta
### Quick Answer
**Solução Direta**:
- **Pipe Anônimo (`pipe()` syscall / operador `|` no shell)**:
  - Canal de comunicação unidirecional mantido exclusivamente em memória RAM pelo kernel (buffer de 64 KB).
  - Não possui nome no sistema de arquivos; só pode ser compartilhado entre **processos com relação de parentesco** (processo pai e filho criados via `fork()`).
  - É destruído automaticamente quando todos os descritores de arquivos são fechados.
- **Named Pipe (FIFO - `mkfifo` comando / syscall)**:
  - Aparece explicitamente como um nó especial no sistema de arquivos (ex: `/tmp/meu_pipe`).
  - Permite comunicação entre **dois processos completamente independentes e sem nenhum parentesco**.
  - O tráfego de dados continua ocorrendo 100% na memória RAM do kernel, sem escrita física no disco.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Pipes Anônimos vs Named Pipes (FIFOs)</text>
  <g transform="translate(50, 48)">
    <!-- Anonymous Pipe -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Pipe Anônimo (pipe())</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Unidirecional / Buffer em RAM no Kernel</text>
    <text x="135" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Apenas entre processos com parentesco (fork)</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Exemplo: ls | grep foo no Bash</text>

    <!-- Named Pipe -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Named Pipe (FIFO - mkfifo)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Possui ponto de entrada no filesystem</text>
    <text x="445" y="60" fill="#f8fafc" font-size="10" text-anchor="middle">Comunicação entre processos arbitrários sem parentesco</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Dados continuam trafegando 100% na RAM</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Buffer padrão do Linux: 64 KB (ajustável via fcntl F_SETPIPE_SZ). Escritas > 4 KB não são atômicas.</text>

</svg>
<p>Visualização: Comparação entre Pipe Anônimo (unidirecional em memória para processos com parentesco) e Named Pipe FIFO (acessível via filesystem para processos arbitrários).</p>

| Tipo de Pipe | Existe no Sistema de Arquivos? | Exige Relação de Parentesco (Pai/Filho)? |
|---|---|---|
| **Pipe Anônimo** | Não (Apenas FDs em memória) | Sim (Criado antes do `fork()`) |
| **Named Pipe (FIFO)**| Sim (Arquivo especial tipo `p`) | Não (Qualquer processo pode abrir) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo no Terminal com Named Pipe
```bash
# Cria o Named Pipe no disco:
mkfifo /tmp/app_fifo

# Terminal 1: Processo consumidor aguarda dados
cat < /tmp/app_fifo

# Terminal 2: Processo produtor envia dados (Desbloqueia o Terminal 1)
echo "Mensagem Inter-Processos" > /tmp/app_fifo
```

#### Key Takeaways
- Pipes operam com semântica de stream de bytes sem preservação de limites de mensagens; leituras em pipes vazios bloqueiam a thread por padrão.

</details>
