---
id: CS-OS-KERN-001
title: "Escalonador CFS (vruntime & RB-Tree), Cgroups v2 Throttling, Processos Zombie e OOM Killer"
tags:
  - level::l4-pleno
  - topic::cs::os
  - company::google
  - freq::high
---

## Pergunta
Como o escalonador **CFS (Completely Fair Scheduler)** do Linux prioriza tarefas via `vruntime` e **Red-Black Tree**, o que causa picos de latência (P99 spikes) por **CPU Throttling** em Cgroups no Kubernetes, e como o kernel gerencia **Processos Zombie/Órfãos** e o **OOM Killer**?

## Resposta
### Quick Answer
**Solução Direta**:
- **CFS & `vruntime`**: O CFS calcula o tempo de execução virtual (`vruntime = physical_runtime * (1024 / weight)`). As tarefas prontas para rodar são mantidas em uma **Red-Black Tree** ordenada por `vruntime`. O núcleo de CPU sempre escolhe o nó mais à esquerda da árvore (a tarefa que menos tempo de CPU virtual consumiu recentemente), garantindo justiça (*fairness*) com busca $O(1)$ em cache e reinserção $O(\log N)$.
- **Cgroups CPU Throttling**: No Kubernetes, quando você define `resources.limits.cpu: 500m`, o Cgroup define uma cota `cpu.cfs_quota_us = 50000` para cada período de `cpu.cfs_period_us = 100000` (100 ms). Se o processo usar seus 50 ms nos primeiros 10 ms do período, o kernel **congela a thread** pelos 90 ms restantes, gerando saltos brutais de latência P99 mesmo com o servidor tendo CPU ociosa!
- **Processos Zumbi vs Órfãos**:
  - **Zumbi (`Z`)**: O processo filho já encerrou, mas o pai não invocou `wait()`/`waitpid()`. Ele não consome CPU nem RAM, mas segura uma entrada na tabela de PIDs do kernel (limite do sistema).
  - **Órfão**: O pai encerrou antes do filho; o processo `init`/`systemd` (PID 1) adota o filho e recolhe seu status automaticamente.
- **OOM Killer**: Quando o sistema ou Cgroup atinge o limite de memória física e swap, o kernel calcula o `oom_score` (baseado em `% RAM usada + oom_score_adj`) e dispara `SIGKILL` no processo com maior pontuação.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Escalonador CFS (Completely Fair Scheduler) e vruntime</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="24" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Red-Black Tree ordenada por vruntime (Virtual Runtime)</text>
    <text x="280" y="48" fill="#f8fafc" font-size="10" text-anchor="middle">CFS sempre escolhe o nó mais à esquerda da árvore (menor vruntime) em O(1).</text>
    <text x="280" y="66" fill="#10b981" font-size="10" font-family="monospace" text-anchor="middle">vruntime += delta_exec * (NICE_0_LOAD / weight)</text>
  </g>
  <text x="340" y="155" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Processos com maior prioridade (nice negativo) acumulam vruntime mais lentamente, recebendo mais fatias de CPU.</text>

</svg>

| Mecanismo / Fenômeno | Estrutura no Kernel | Impacto Prático em Produção |
|---|---|---|
| **CFS Scheduler** | Red-Black Tree de `vruntime` | Balanceamento justo entre threads |
| **CFS Quota Throttling** | Cgroups CPU Bandwidth Control | Latência P99 degradada em K8s |
| **OOM Killer** | Cálculo de `oom_score` | Crash do Pod com Exit Code 137 |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Dilema de CPU Limits no Kubernetes em Entrevistas FAANG
- **Problema**: O CFS opera em janelas de 100ms. Uma aplicação multi-threaded (ex: Java ou Go com 8 goroutines ativas) pode consumir uma cota de 500m em apenas 6.25ms, ficando estrangulada (*throttled*) pelos 93.75ms restantes daquela janela de 100ms.
- **Prática Recomendada em Big Techs**:
  1. Utilizar apenas `resources.requests.cpu` para garantir agendamento de nós, omitindo `limits.cpu` para cargas sensíveis a latência (ou usar cgroups v2 com *CPU burst*).
  2. Sempre definir `resources.limits.memory` para proteger o nó contra vazamentos de memória (OOM).

#### Exemplo em Java: Monitorando e Evitando Vazamento de Processos Zumbi
```java
public class ProcessSpawner {
  public static void runChildProcess() throws Exception {
    ProcessBuilder pb = new ProcessBuilder("ls", "-la");
    Process process = pb.start();

    // Se omitir process.waitFor(), o processo filho vira Zumbi após terminar:
    int exitCode = process.waitFor();
    System.out.println("Processo filho finalizado com código: " + exitCode);
  }
}
```

#### Exemplo em Go: Manipulando Subprocessos e Capturando Exit Status
```go
package main

import (
  "fmt"
  "os/exec"
)

func runCommand() error {
  cmd := exec.Command("uptime")
  // cmd.Run() executa o fork/exec e internamente chama waitpid() para evitar zumbis:
  output, err := cmd.CombinedOutput()
  if err != nil {
    return fmt.Errorf("falha na execução: %w", err)
  }
  fmt.Printf("Resultado: %s", string(output))
  return nil
}
```

#### Key Takeaways
- Processos Zumbis esgotam a tabela `/proc/sys/kernel/pid_max`; um container que gera zumbis pode paralisar a máquina inteira impedindo a criação de novos processos.
- O Exit Code 137 no Linux/Docker/K8s significa $128 + 9 = \text{SIGKILL}$ disparado pelo OOM Killer.

</details>
