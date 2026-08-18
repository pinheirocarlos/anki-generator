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
