---
id: CS-OS-IPC-006
title: "Intuição Fundamental de IPC: O Tubo Pneumático (Pipes), a Lousa Compartilhada e a Sirene (Signals)"
tags:
  - level::l2-fundamental
  - topic::cs::os-memory
  - company::uber
  - freq::high
---

## Pergunta
Quais são as principais formas de comunicação entre processos independentes (IPC) no Linux e quando usar cada uma?

## Resposta
### Quick Answer
**Solução Direta**:
- Como processos vivem em memórias estritamente isoladas, eles precisam de mecanismos do sistema operacional para trocar informações (**IPC - Inter-Process Communication**):
  - **Pipes**: Um tubo de correio pneumático unidirecional onde a saída do Processo A entra como entrada do Processo B.
  - **Memória Compartilhada (Shared Memory)**: Uma lousa física comum onde ambos escrevem e leem na velocidade da RAM, sem intermediários.
  - **Sinais (Signals)**: Sirenes rápidas de notificação (como `SIGINT` ao apertar `Ctrl+C` ou `SIGKILL` para encerrar).

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Mecanismos de IPC: Pipes vs Memória Compartilhada vs Signals</text>

  <!-- 1. Pipes -->
  <g transform="translate(30, 45)">
    <rect x="0" y="0" width="160" height="75" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="80" y="20" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">1. Unix Pipe (Tubo)</text>
    <text x="80" y="40" fill="#ffffff" font-size="10" text-anchor="middle">Proc A ➔ [Tubo] ➔ Proc B</text>
    <text x="80" y="60" fill="#64748b" font-size="9" text-anchor="middle">Fluxo contínuo em bytes</text>
  </g>

  <!-- 2. Shared Memory -->
  <g transform="translate(220, 45)">
    <rect x="0" y="0" width="160" height="75" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="80" y="20" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">2. Shared Memory (Lousa)</text>
    <text x="80" y="40" fill="#ffffff" font-size="10" text-anchor="middle">Zero Cópia de Dados</text>
    <text x="80" y="60" fill="#34d399" font-size="9" text-anchor="middle">Máxima velocidade na RAM</text>
  </g>

  <!-- 3. Signals -->
  <g transform="translate(410, 45)">
    <rect x="0" y="0" width="160" height="75" fill="#1e1b4b" stroke="#ef4444" stroke-width="1.5" rx="6" />
    <text x="80" y="20" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">3. Signals (Sirene)</text>
    <text x="80" y="40" fill="#ffffff" font-size="10" text-anchor="middle">SIGINT (2), SIGTERM (15)</text>
    <text x="80" y="60" fill="#f87171" font-size="9" text-anchor="middle">Notificações assíncronas</text>
  </g>

  <text x="300" y="155" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">Escolha: Pipes para simplicidade, Shared Memory para alta taxa de dados!</text>
</svg>
<p>Visualização: Analogia intuitiva dos padrões de IPC comparando o Tubo Pneumático (Pipes), a Lousa Comunitária (Shared Memory) e a Sirene de Alarme (Signals).</p>

| Mecanismo de IPC | Velocidade & Características | Analogia do Mundo Real |
|---|---|---|
| **Unix Pipes** | Média (passa pelo Kernel) | Tubo de correio pneumático entre duas salas |
| **Shared Memory** | Instantânea (acesso direto à RAM) | Uma lousa branca instalada na parede divisória |
| **Unix Domain Sockets** | Bidirecional seguro com controle de acesso | Uma linha telefônica privada interna da empresa |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Filosofia Unix do Pipe
O comando `cat logs.txt | grep ERROR | wc -l` exemplifica a elegância dos Pipes:
- Cada programa faz apenas uma coisa com perfeição.
- O Kernel cria um buffer em memória e conecta o `stdout` de um no `stdin` do seguinte. Se o leitor for lento, o Kernel pausa o escritor automaticamente (*Backpressure*).

#### Por que Shared Memory exige Cuidado?
Como o Kernel não faz intermediação na Memória Compartilhada, os dois processos leem e escrevem no mesmo endereço físico. Se eles não usarem um Semáforo ou Mutex compartilhado para coordenar, um processo lerá dados incompletos gravados pelo outro.

#### Key Takeaways
- Signals não carregam dados complexos, apenas um número identificador de evento (ex: `SIGKILL = 9`).
- Unix Domain Sockets são mais rápidos que TCP/IP na mesma máquina porque evitam o empacotamento da pilha de rede.

</details>
