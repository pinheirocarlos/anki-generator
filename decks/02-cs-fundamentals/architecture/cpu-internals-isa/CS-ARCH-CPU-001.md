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
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Arquitetura NUMA (Non-Uniform Memory Access) Multi-Socket</text>
  <g transform="translate(60, 48)">
    <!-- Socket 0 -->
    <rect x="0" y="0" width="240" height="90" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="120" y="24" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">NUMA Node 0</text>
    <rect x="20" y="35" width="80" height="40" rx="4" fill="#0369a1"/>
    <text x="60" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">CPU 0..15</text>
    <rect x="120" y="35" width="100" height="40" rx="4" fill="#065f46"/>
    <text x="170" y="55" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Local RAM</text>
    <text x="170" y="68" fill="#a7f3d0" font-size="9" text-anchor="middle">~60 ns</text>

    <!-- Interconnect UPI / QPI -->
    <g transform="translate(240, 35)">
      <line x1="0" y1="20" x2="80" y2="20" stroke="#f59e0b" stroke-width="3"/>
      <text x="40" y="12" fill="#f59e0b" font-size="9" font-weight="bold" text-anchor="middle">UPI Link</text>
    </g>

    <!-- Socket 1 -->
    <rect x="320" y="0" width="240" height="90" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="440" y="24" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">NUMA Node 1</text>
    <rect x="340" y="35" width="80" height="40" rx="4" fill="#0369a1"/>
    <text x="380" y="60" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">CPU 16..31</text>
    <rect x="440" y="35" width="100" height="40" rx="4" fill="#065f46"/>
    <text x="490" y="55" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Local RAM</text>
    <text x="490" y="68" fill="#a7f3d0" font-size="9" text-anchor="middle">~60 ns</text>
  </g>
  <rect x="60" y="155" width="560" height="34" rx="6" fill="#0f172a" stroke="#f43f5e" stroke-width="1"/>
  <text x="340" y="176" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Acesso Remoto (Node 0 acessando RAM do Node 1): ~100-140 ns (Penalidade NUMA de ~2x)</text>

</svg>
<p>Visualização: Topologia NUMA com acesso local ultrarrápido vs acesso remoto inter-socket.</p>

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
