---
id: CS-OS-VMEM-003
title: "Page Faults no Sistema Operacional (Minor vs Major Page Fault)"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença entre um **Minor Page Fault** e um **Major Page Fault** no kernel Linux e qual o impacto de latência?

## Resposta
### Quick Answer
**Solução Direta**:
- **Page Fault**: É uma interrupção de hardware disparada pela MMU quando o processo tenta acessar uma página virtual cujo bit de presença (*Present Bit*) está zerado na Tabela de Páginas.
- **Minor Page Fault (Soft Fault)**:
  - A página de dados já está presente na memória RAM física (ex: no OS Page Cache ou alocação recente de `malloc`), mas ainda não estava mapeada na tabela do processo.
  - O kernel apenas atualiza a entrada da tabela e retoma o processo instantaneamente (**~1 a 5 µs**).
- **Major Page Fault (Hard Fault)**:
  - A página não está na RAM e precisa ser **lida fisicamente do disco ou partição de Swap**.
  - O processo é suspenso enquanto o driver de storage executa I/O de disco, gerando latência severa (**~20 µs em SSD NVMe a ~10 ms em HDD**).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/page-fault-major-minor-swap-loop.webm">
    <p>Visualização: Página ausente da tabela mas presente na RAM (Minor) vs busca obrigatória de bloco no disco/swap (Major).</p>
  </video>
</div>

| Tipo de Page Fault | Origem do Dado | Latência Típica |
|---|---|---|
| **Minor Page Fault** | Já residente na RAM (Page Cache / Zeroed Page) | ~1 a 5 µs (Rápido) |
| **Major Page Fault** | Leitura física do SSD NVMe ou Swap | ~20 µs a 10 ms (Gargalo de I/O) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Alocação Tardia do Linux (Lazy Allocation)
- Quando você chama `malloc(1024 * 1024 * 1024)` (1 GB) em C/Go, o sistema operacional não aloca 1 GB de RAM física imediatamente; ele apenas reserva o espaço virtual.
- A memória física só é atribuída página a página conforme o seu código escreve em cada endereço, disparando Minor Page Faults controlados sob demanda (*Demand Paging*).

#### Key Takeaways
- Picos frequentes de Major Page Faults indicam que o servidor está sofrendo de **Thrashing de Memória** (esgotamento de RAM e saturação de Swap).

</details>
