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
