---
id: CS-OS-SYS-003
title: "Multiplexação de I/O: epoll O(1) vs select/poll O(N)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::meta
  - freq::high
---

## Pergunta
Por que a API **`epoll`** do Linux escala em tempo **$O(1)$** com milhões de conexões simultâneas enquanto **`select` / `poll`** degradam em **$O(N)$**?

## Resposta
### Quick Answer
**Solução Direta**:
- **`select` / `poll` ($O(N)$ Linear)**:
  - A aplicação deve passar uma lista com todos os $N$ descritores de arquivos (FDs) para o kernel a cada chamada.
  - O kernel precisa **percorrer linearmente os $N$ sockets** para descobrir quais receberam dados, e a aplicação precisa varrer a lista inteira novamente no retorno.
- **`epoll` ($O(1)$ Orientado a Eventos)**:
  1. Cria uma estrutura persistente no kernel via **Red-Black Tree** (`epoll_create`).
  2. Registra sockets apenas uma vez (`epoll_ctl`). A placa de rede dispara interrupções de hardware que inserem os sockets ativos diretamente em uma **Lista Encadeada de Prontos (Ready List)**.
  3. Ao chamar `epoll_wait`, o kernel retorna **apenas os sockets que já possuem dados prontos**, sem nenhuma varredura linear.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Multiplexação de I/O: epoll O(1) vs select/poll O(N)</text>
  <g transform="translate(50, 48)">
    <!-- select/poll -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">select() / poll() — Custo O(N)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Passa array com todos os N sockets em cada syscall</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Kernel precisa varrer N conexões linearmente</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Inviável para C10K (10.000 conexões)</text>

    <!-- epoll -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Linux epoll — Custo O(Eventos Prontos)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Registra FDs uma única vez no Kernel (RB-Tree)</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">epoll_wait() retorna lista de conexões ativas em O(1)</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Escala facilmente para 1.000.000 de conexões</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Motor fundamental por trás de Netty, Node.js (libuv), Go Netpoller, Redis e Nginx.</text>

</svg>
<p>Visualização: Comparação de escalabilidade I/O entre a varredura linear O(N) do select/poll e o monitoramento dirigido a eventos em O(1) do epoll no Linux.</p>

| API de I/O | Custo por Evento | Comportamento com 100.000 Sockets Ociosos |
|---|---|---|
| **`select` / `poll`** | $O(N)$ | Varia 100.000 sockets a cada milissegundo (Inviável) |
| **`epoll` (Linux)** | $O(\text{eventos ativos})$ | Retorna instantaneamente em $O(1)$ apenas os ativos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Problema C10K e C1000K
- No final dos anos 1990, servidores travavam ao atingir 10.000 conexões simultâneas (*The C10K Problem*) devido ao $O(N)$ do `select`.
- O advento do `epoll` no kernel Linux 2.6 viabilizou servidores modernos como NGINX, Node.js e Redis atenderem mais de 1.000.000 de conexões simultâneas por máquina (*C1000K*).

#### Key Takeaways
- O equivalente do `epoll` no macOS/BSD é o **`kqueue`** e no Windows é o **`IOCP`**.

</details>
