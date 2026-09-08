---
id: SYS-LLD-CONCURRENCY-006
title: "Intuição Fundamental de Concorrência Backend: A Cozinha Industrial com Divisão de Tarefas"
tags:
  - level::l2-fundamental
  - topic::sys::lld
  - company::uber
  - freq::high
---

## Pergunta
Qual é a intuição fundamental por trás dos padrões de concorrência backend (Worker Pool, Fan-In/Fan-Out e Pipeline) e como eles evitam a criação descontrolada de threads?

## Resposta
### Quick Answer
**Solução Direta**:
- Se uma API criar uma nova thread ou goroutine sem limite a cada requisição que chega (`go handleRequest()`), uma rajada de 50.000 requisições esgotará a memória RAM e a CPU com troca de contexto, derrubando o servidor.
- Os **Padrões de Concorrência** organizam o trabalho em fluxos controlados:
  - **Worker Pool**: Cria um número fixo de cozinheiros (ex: 8 workers) que retiram tarefas de uma fila de entrada compartilhada (Channel/Queue) de forma balanceada.
  - **Fan-Out / Fan-In**: Distribui uma tarefa grande em vários workers paralelos (Fan-Out) e junta todos os resultados parciais em um único canal de saída (Fan-In).
  - **Pipeline**: Processa dados em etapas encadeadas (Etapa 1: Baixar $\rightarrow$ Etapa 2: Redimensionar $\rightarrow$ Etapa 3: Salvar no S3).

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Padrão Worker Pool com Fila de Tarefas Concorrente</text>

  <!-- Fila de Entrada de Tarefas -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="140" height="90" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="8" />
    <text x="70" y="22" fill="#c7d2fe" font-size="10" font-weight="bold" text-anchor="middle">Task Channel / Queue</text>
    <rect x="15" y="34" width="24" height="24" fill="#312e81" rx="4" />
    <text x="27" y="50" fill="#ffffff" font-size="9" text-anchor="middle">T1</text>
    <rect x="45" y="34" width="24" height="24" fill="#312e81" rx="4" />
    <text x="57" y="50" fill="#ffffff" font-size="9" text-anchor="middle">T2</text>
    <rect x="75" y="34" width="24" height="24" fill="#312e81" rx="4" />
    <text x="87" y="50" fill="#ffffff" font-size="9" text-anchor="middle">T3</text>
    <text x="115" y="50" fill="#a5b4fc" font-size="12">···</text>
    <text x="70" y="76" fill="#a5b4fc" font-size="8" text-anchor="middle">Backpressure Natural</text>
  </g>

  <!-- Pool de Workers Fixos -->
  <g transform="translate(240, 35)">
    <rect x="0" y="0" width="130" height="35" fill="#065f46" stroke="#10b981" rx="6" />
    <text x="65" y="22" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Worker 1 (CPU Core 0)</text>

    <rect x="0" y="45" width="130" height="35" fill="#065f46" stroke="#10b981" rx="6" />
    <text x="65" y="22" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Worker 2 (CPU Core 1)</text>

    <rect x="0" y="90" width="130" height="35" fill="#065f46" stroke="#10b981" rx="6" />
    <text x="65" y="22" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Worker 3 (CPU Core 2)</text>
  </g>

  <!-- Canal de Resultados Agregados -->
  <g transform="translate(420, 50)">
    <rect x="0" y="0" width="140" height="90" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="8" />
    <text x="70" y="24" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Result Channel</text>
    <text x="70" y="48" fill="#ffffff" font-size="10" text-anchor="middle">Resultados Prontos</text>
    <text x="70" y="70" fill="#10b981" font-size="9" text-anchor="middle">Fan-In Consolidado ✓</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Controle de Concorrência: Recursos previsíveis e zero risco de Out-Of-Memory!</text>
</svg>
<p>Visualização: Padrão Worker Pool desacoplando produtores de tarefas e workers concorrentes através de um canal de fila com capacidade finita.</p>

| Padrão de Concorrência | Como Opera | Analogia do Cotidiano |
|---|---|---|
| **Worker Pool** | Equipe fixa de threads processando uma fila de tarefas | Os caixas do banco que atendem a senha da vez da fila única. |
| **Pipeline** | Cada worker executa 1 etapa e passa para o próximo | A linha de montagem industrial de carros (Solda $\rightarrow$ Pintura $\rightarrow$ Motor). |
| **Fan-Out / Fan-In** | Divide o lote entre vários e reúne os resultados | Vários detetives investigando pistas diferentes e se reunindo para montar o relatório final. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Princípio do CSP (Communicating Sequential Processes) em Go
*"Não se comunique compartilhando memória; em vez disso, compartilhe memória comunicando-se."*
Em vez de usar locks e variáveis globais compartilhadas (que causam deadlocks e condições de corrida sutis), usamos **Canais tipados (`chan`)** para passar a posse dos dados entre goroutines.

#### Key Takeaways
- Limite sempre a concorrência máxima de chamadas para recursos externos (bancos, APIs de terceiros).
- Use `context.Context` para cancelar goroutines imediatamente quando o cliente desconectar (*Graceful Cancellation*).

</details>
