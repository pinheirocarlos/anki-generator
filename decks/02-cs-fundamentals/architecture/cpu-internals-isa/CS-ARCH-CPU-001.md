---
id: CS-ARCH-CPU-001
title: "Arquitetura NUMA (Non-Uniform Memory Access) e Afinidade de CPU"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::netflix
  - freq::high
---

## Pergunta
Como a arquitetura **NUMA (Non-Uniform Memory Access)** impacta a latência em servidores multi-socket e como o *CPU Pinning* mitiga a contenção?

## Resposta
### Quick Answer
**Solução Direta**:
- **NUMA**: Em servidores com múltiplos soquetes de CPU, a memória RAM física é particionada em nós (*NUMA Nodes*), com cada banco conectado diretamente ao controlador de uma CPU específica.
- **Acesso Local vs Remoto**:
  - *Local Node*: A CPU acessa seu próprio banco de RAM com latência mínima (~60-80ns).
  - *Remote Node*: Para ler dados na RAM de outro soquete, a requisição trafega pelo barramento de interconexão (UPI/Infinity Fabric), gerando **latência 2x a 3x maior** (~150-250ns).
- **CPU Pinning / Thread Affinity**: Vincular processos ou threads a núcleos de um único nó NUMA específico (via comando `numactl` ou syscall `sched_setaffinity`), garantindo alocação estritamente local de memória.

### Dual Coding Visual
| Tipo de Acesso NUMA | Caminho do Barramento | Latência Típica |
|---|---|---|
| **Local Memory Access** | CPU $ightarrow$ RAM Local | ~60 a 80 ns |
| **Remote Memory Access**| CPU 0 $ightarrow$ Interconnect $ightarrow$ CPU 1 $ightarrow$ RAM 1 | ~160 a 240 ns |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Linux: Executando com Isolamento NUMA
```bash
# Executa o banco de dados vinculado exclusivamente aos núcleos do Nó 0 com memória local:
numactl --cpunodebind=0 --membind=0 ./meu_banco_de_dados
```

#### Exemplo em Go: Definindo Afinidade de Thread
```go
package main

import (
  "runtime"
)

func lockToThread() {
  // Fixa a goroutine atual a uma OS Thread exclusiva para evitar migração entre núcleos NUMA:
  runtime.LockOSThread()
}
```

#### Key Takeaways
- Em bancos de dados de alta vazão (PostgreSQL, Redis, ScyllaDB), desbalanceamento NUMA descontrolado pode causar quedas abruptas de throughput de 50% por saturação do barramento de interconexão.

</details>
