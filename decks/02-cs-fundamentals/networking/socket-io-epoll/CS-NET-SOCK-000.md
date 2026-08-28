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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Ciclo de Vida de Sockets TCP no Servidor</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="100" height="50" rx="4" fill="#0369a1"/>
    <text x="50" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">socket()</text>
    <text x="50" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Cria FD</text>

    <path d="M 105 25 L 135 25" stroke="#38bdf8" stroke-width="2"/>

    <rect x="140" y="0" width="100" height="50" rx="4" fill="#0284c7"/>
    <text x="190" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">bind()</text>
    <text x="190" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Porta/IP</text>

    <path d="M 245 25 L 275 25" stroke="#38bdf8" stroke-width="2"/>

    <rect x="280" y="0" width="110" height="50" rx="4" fill="#065f46"/>
    <text x="335" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">listen()</text>
    <text x="335" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">SYN Queue</text>

    <path d="M 395 25 L 425 25" stroke="#10b981" stroke-width="2"/>

    <rect x="430" y="0" width="130" height="50" rx="4" fill="#047857" stroke="#10b981" stroke-width="2"/>
    <text x="495" y="25" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">accept()</text>
    <text x="495" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">Novo Conn FD</text>
  </g>
  <text x="340" y="145" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">listen() gerencia duas filas no Kernel: SYN Queue (Incompletas) e Accept Queue (3-Way Handshake Concluído).</text>
  <text x="340" y="170" fill="#94a3b8" font-size="10" text-anchor="middle">accept() extrai uma conexão estabelecida da Accept Queue e retorna um novo File Descriptor dedicado àquele cliente.</text>

</svg>

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
