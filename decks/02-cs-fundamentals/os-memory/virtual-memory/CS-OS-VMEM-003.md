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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Page Faults no OS: Minor vs Major Page Fault</text>
  <g transform="translate(50, 48)">
    <!-- Minor -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="135" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Minor Page Fault (Sem I/O de Disco)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">A página já está na RAM (ex: Page Cache/COW)</text>
    <text x="135" y="60" fill="#a7f3d0" font-size="10" text-anchor="middle">Kernel apenas atualiza a entrada na PTE</text>
    <text x="135" y="76" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Latência: ~1 a 2 µs</text>

    <!-- Major -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="445" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Major Page Fault (Exige I/O de Disco)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">A página precisa ser lida do Disco / Swap / Storage</text>
    <text x="445" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Thread é colocada em estado Uninterruptible Sleep (D)</text>
    <text x="445" y="76" fill="#f87171" font-size="9" font-weight="bold" text-anchor="middle">Latência: ~1 a 10 ms (Gargalo severo)</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Monitoramento de Major Faults no Prometheus é crucial para detectar Thrashing de memória e pressão de Swap.</text>

</svg>

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
