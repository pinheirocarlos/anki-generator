---
id: CS-ARCH-IO-003
title: "Papel do OS Page Cache na Aceleração de I/O de Arquivos"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::meta
  - freq::high
---

## Pergunta
Como o **OS Page Cache** do kernel Linux acelera leituras e gravações de arquivos utilizando a memória RAM livre?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Page Cache** é uma camada de cache transparente gerenciada pelo kernel Linux que utiliza toda a memória RAM não alocada por processos para reter páginas (4 KB) lidas ou gravadas no disco.
- **Leituras**: Se uma página solicitada já estiver no Page Cache (*Cache Hit*), a resposta é entregue instantaneamente na velocidade da RAM (~100ns), sem tocar no disco físico.
- **Gravações**: Syscalls `write()` gravam imediatamente no Page Cache marcando as páginas como *Dirty Pages*, retornando sucesso instantâneo para a aplicação; threads de background do kernel (`flusher/kswapd`) descarregam as páginas no disco de forma assíncrona.

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">OS Page Cache: Intermediando I/O entre Processo e Disco</text>
  <g transform="translate(60, 48)">
    <!-- Process -->
    <rect x="0" y="20" width="110" height="50" rx="5" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="55" y="45" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Aplicação</text>
    <text x="55" y="58" fill="#94a3b8" font-size="9" text-anchor="middle">read() / write()</text>

    <!-- Arrow -->
    <path d="M 115 45 L 175 45" stroke="#38bdf8" stroke-width="2"/>

    <!-- Page Cache -->
    <rect x="180" y="0" width="200" height="90" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="280" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Linux Page Cache (RAM)</text>
    <text x="280" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">Páginas de 4 KB em Memória</text>
    <text x="280" y="62" fill="#a7f3d0" font-size="10" text-anchor="middle">Leitura: Retorno em ~100ns (Hit)</text>
    <text x="280" y="78" fill="#fef3c7" font-size="9" text-anchor="middle">Escrita: Marcado como Dirty Page</text>

    <!-- Arrow Flush -->
    <path d="M 385 45 L 445 45" stroke="#f59e0b" stroke-width="2"/>
    <text x="415" y="38" fill="#f59e0b" font-size="8" text-anchor="middle">Flusher</text>

    <!-- Physical Disk -->
    <rect x="450" y="20" width="110" height="50" rx="5" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="505" y="45" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Disco / SSD</text>
    <text x="505" y="58" fill="#94a3b8" font-size="9" text-anchor="middle">Persistência Real</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">write() retorna instantaneamente após gravar no Page Cache; fsync() força o flush para a mídia física.</text>

</svg>

| Operação de I/O | Fluxo com Page Cache (Padrão) | Latência Percebida pelo App |
|---|---|---|
| **Leitura com Cache Hit** | App $leftarrow$ RAM Page Cache (Zero acesso ao disco) | ~100 ns |
| **Escrita Buffered** | App $ightarrow$ Grava na RAM como *Dirty Page* | ~1 µs (Assíncrono) |
| **Leitura com Cache Miss**| App $leftarrow$ Leitura física $ightarrow$ Popula Page Cache | ~20 µs a 10 ms |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Forçando Sincronização Durável
```go
package main

import "os"

func persistSecurely(file *os.File, data []byte) error {
  if _, err := file.Write(data); err != nil { // Grava no Page Cache do OS
    return err
  }
  // Invoca a syscall fsync() para forçar o flush imediato das Dirty Pages para o hardware:
  return file.Sync()
}
```

#### Key Takeaways
- "RAM livre é RAM desperdiçada": O Linux aloca quase 100% da RAM disponível para o Page Cache e a desaloca instantaneamente se um processo solicitar mais memória.

</details>
