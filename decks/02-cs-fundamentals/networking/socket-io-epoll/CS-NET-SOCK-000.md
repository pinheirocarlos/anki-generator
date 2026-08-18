---
id: CS-NET-SOCK-000
title: "Ciclo de Vida de Sockets TCP no Servidor (socket, bind, listen, accept)"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::google
  - freq::high
---

## Pergunta
Qual é o ciclo de vida completo e a sequência de syscalls de um **Socket TCP no servidor** no sistema operacional?

## Resposta
### Quick Answer
**Solução Direta**:
- A sequência padrão de chamadas de sistema no Linux para servidores TCP é:
  1. **`socket(AF_INET, SOCK_STREAM, 0)`**: Cria o endpoint de comunicação e retorna um *File Descriptor (FD)*.
  2. **`bind(fd, sockaddr, addrlen)`**: Associa o socket a um endereço IP e porta local específicos (ex: `0.0.0.0:8080`).
  3. **`listen(fd, backlog)`**: Coloca o socket em estado passivo de escuta e define a fila de conexões pendentes (*SYN Queue e Accept Queue*).
  4. **`accept(fd, ...)`**: Bloqueia até que uma conexão complete o Three-Way Handshake, retornando um **novo File Descriptor dedicado exclusivamente àquele cliente**.
  5. **`recv()` / `send()`**: Leitura e escrita bidirecional de dados.
  6. **`close(client_fd)`**: Encerra a conexão e dispara o Four-Way Handshake de término (FIN/ACK).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/networking/tcp-server-socket-bind-listen-accept-loop.webm">
    <p>Visualização: Sequência canônica de chamadas de sistema: socket() -> bind() -> listen() -> accept() criando socket conectado.</p>
  </video>
</div>

| Syscall no Servidor | Estado do Socket | Função no Kernel |
|---|---|---|
| **`socket()` + `bind()`** | Fechado / Associado à Porta | Aloca estrutura no kernel e reserva porta |
| **`listen()`** | `LISTEN` | Cria filas de conexões de entrada (*backlog*) |
| **`accept()`** | Cria novo FD em `ESTABLISHED` | Desempilha conexão pronta da fila |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o `accept()` Retorna um Novo File Descriptor?
- O socket original passado no `listen()` é o **Listening Socket** (seu único papel é aceitar novos clientes na porta 8080).
- Cada cliente aceito recebe um **Connected Socket** isolado com sua própria porta remota, buffers de leitura/escrita e máquina de estados, permitindo ao servidor atender milhares de clientes em paralelo.

#### Key Takeaways
- O parâmetro `backlog` do `listen()` define o tamanho máximo da fila de clientes que concluíram o handshake e estão aguardando o servidor chamar `accept()`.

</details>
