---
id: CS-OS-IPC-001
title: "Mecanismos de IPC no Linux: Unix Domain Sockets vs TCP Loopback, Shared Memory & POSIX Queues"
tags:
  - level::l4-pleno
  - topic::cs::os
  - company::meta
  - freq::high
---

## Pergunta
Por que **Unix Domain Sockets (UDS)** entregam o dobro do throughput e metade da latência em comparação com **TCP Loopback (`127.0.0.1`)**, como funciona o **Shared Memory (`shm_open` + `mmap`)** com sincronização, e quando usar **POSIX Message Queues**?

## Resposta
### Quick Answer
**Solução Direta**:
- **UDS vs TCP Loopback (`127.0.0.1`)**: O TCP Loopback ainda executa todo o stack de rede (cálculo de checksums, segmentação TCP, handshake SYN/ACK, buffers de controle de fluxo e congestionamento). O UDS apenas copia bytes de memória diretamente de um buffer de socket para outro no kernel, suporta passagem de descritores de arquivos abertos (`SCM_RIGHTS`) e valida credenciais nativas de usuário/grupo (`SO_PEERCRED`).
- **Shared Memory (`shm_open` / `mmap`)**: É o único mecanismo de IPC com **Zero-Copy real** (processos leem e escrevem diretamente nos mesmos endereços físicos de memória RAM). Exige sincronização explícita via semáforos POSIX ou Mutexes com o atributo `PTHREAD_PROCESS_SHARED` ou operações atômicas com `futex`.
- **POSIX Message Queues**: Diferente de sockets e pipes (que transmitem fluxos contínuos de bytes), as filas de mensagens transmitem pacotes delimitados (*message boundaries*) com suporte nativo a prioridades numéricas e notificações assíncronas via sinais Unix.

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Mecanismos de IPC no Linux: Latência vs Complexidade</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="24" rx="4" fill="#065f46"/>
    <text x="15" y="16" fill="#ffffff" font-size="10" font-weight="bold">Shared Memory (shm_open / mmap)</text>
    <text x="545" y="16" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="end">&lt; 0.1 µs (Zero-Copy direto na RAM)</text>

    <rect x="0" y="28" width="560" height="24" rx="4" fill="#0369a1"/>
    <text x="15" y="44" fill="#ffffff" font-size="10" font-weight="bold">Unix Domain Sockets (AF_UNIX)</text>
    <text x="545" y="44" fill="#bae6fd" font-size="10" font-family="monospace" text-anchor="end">~1 a 2 µs (Passagem de FDs, sem checksum)</text>

    <rect x="0" y="56" width="560" height="24" rx="4" fill="#0284c7"/>
    <text x="15" y="72" fill="#ffffff" font-size="10" font-weight="bold">Pipes / FIFOs</text>
    <text x="545" y="72" fill="#bae6fd" font-size="10" font-family="monospace" text-anchor="end">~2 a 3 µs (Stream sequencial no Kernel)</text>

    <rect x="0" y="84" width="560" height="24" rx="4" fill="#d97706"/>
    <text x="15" y="100" fill="#ffffff" font-size="10" font-weight="bold">POSIX Message Queues (mq_send)</text>
    <text x="545" y="100" fill="#fef3c7" font-size="10" font-family="monospace" text-anchor="end">~3 a 5 µs (Mensagens com prioridade)</text>

    <rect x="0" y="112" width="560" height="24" rx="4" fill="#b91c1c"/>
    <text x="15" y="128" fill="#ffffff" font-size="10" font-weight="bold">TCP Loopback (127.0.0.1)</text>
    <text x="545" y="128" fill="#fecaca" font-size="10" font-family="monospace" text-anchor="end">~10 a 20 µs (Overhead de pilha TCP/IP)</text>
  </g>
  <text x="340" y="195" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Regra de ouro: Comunicação local no mesmo host deve usar Unix Domain Sockets ou Shared Memory.</text>

</svg>

| Primitiva IPC | Cópias de Dados na Memória | Latência Média de Transferência |
|---|---|---|
| **TCP Loopback (`127.0.0.1`)** | 2 Cópias + Stack de Rede TCP/IP | ~10 a 25 µs |
| **Unix Domain Socket (UDS)** | 1 Cópia direta no Kernel Buffer | ~3 a 8 µs |
| **Shared Memory (`shm`/`mmap`)** | 0 Cópias (Acesso direto à RAM) | < 1 µs (Nanossegundos) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Cliente HTTP sobre Unix Domain Socket
```go
package main

import (
  "context"
  "net"
  "net/http"
)

func createUDSHttpClient(socketPath string) *http.Client {
  return &http.Client{
    Transport: &http.Transport{
      // Redireciona o transporte HTTP para discar diretamente no socket Unix:
      DialContext: func(ctx context.Context, _, _ string) (net.Conn, error) {
        var d net.Dialer
        return d.DialContext(ctx, "unix", socketPath)
      },
    },
  }
}
```

#### Exemplo em Java: Leitura de Arquivo / Memória Compartilhada via `MappedByteBuffer`
```java
import java.io.RandomAccessFile;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;

public class SharedMemoryIPC {
  public static void writeSharedMemory(String path, byte[] data) throws Exception {
    try (var file = new RandomAccessFile(path, "rw");
         var channel = file.getChannel()) {
      
      // Mapeia a memória compartilhada diretamente no espaço de endereçamento:
      MappedByteBuffer buffer = channel.map(FileChannel.MapMode.READ_WRITE, 0, data.length);
      buffer.put(data);
      buffer.force(); // Garante flush se necessário
    }
  }
}
```

#### Key Takeaways & Entrevistas FAANG
- Plataformas de microsserviços em malha (Service Mesh como Envoy e Istio) utilizam Unix Domain Sockets para comunicação entre a aplicação principal e o container sidecar, reduzindo o overhead de CPU e latência de rede.
- O PostgreSQL utiliza Shared Memory para o `shared_buffers` (cache de páginas de tabelas acessado por todos os processos worker do banco).

</details>
