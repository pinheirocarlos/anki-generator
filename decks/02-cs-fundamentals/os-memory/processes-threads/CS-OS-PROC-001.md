---
id: CS-OS-PROC-001
title: "Sobrecarga de Context Switch: Processo (CR3/TLB Flush) vs Thread"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
O que torna a **Troca de Contexto (Context Switch)** de um processo significativamente mais custosa do que a de uma thread?

## Resposta
### Quick Answer
**Solução Direta**:
- **Context Switch entre Threads do mesmo Processo**:
  - Salva e restaura apenas registradores de CPU e o Stack Pointer (`RSP`).
  - O espaço de memória virtual continua o mesmo; o registrador `CR3` **não é alterado** e o cache **TLB permanece intacto**. Custo: **~0.5 a 1 µs**.
- **Context Switch entre Processos Distintos**:
  1. *Troca de Registrador `CR3`*: Carrega a raiz da nova Tabela de Páginas do outro processo.
  2. *Invalidação do TLB (TLB Flush)*: Todas as traduções de endereços em cache no TLB são invalidadas.
  3. *Poluição de Caches L1/L2/L3*: O novo processo toca endereços de memória diferentes, causando uma avalanche de Cache Misses subsequentes. Custo: **~2 a 5 µs** + penalidade prolongada de cache misses.

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sobrecarga de Context Switch: Processo vs Thread</text>
  <g transform="translate(50, 48)">
    <!-- Process Switch -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Context Switch de Processo</text>
    <text x="135" y="42" fill="#f8fafc" font-size="10" text-anchor="middle">1. Salva registradores no PCB</text>
    <text x="135" y="58" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">2. Troca registrador CR3 (Tabela de Páginas)</text>
    <text x="135" y="74" fill="#fca5a5" font-size="10" text-anchor="middle">3. TLB Flush (Invalida cache de tradução)</text>
    <text x="135" y="88" fill="#94a3b8" font-size="9" text-anchor="middle">Custo alto: ~1.000 a 2.000 ns + Cache Misses</text>

    <!-- Thread Switch -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Context Switch de Thread (Mesmo Processo)</text>
    <text x="445" y="42" fill="#f8fafc" font-size="10" text-anchor="middle">1. Salva registradores no TCB</text>
    <text x="445" y="58" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">2. CR3 permanece INTACTO (Mesmo espaço)</text>
    <text x="445" y="74" fill="#34d399" font-size="10" text-anchor="middle">3. TLB preservado sem invalidações</text>
    <text x="445" y="88" fill="#a7f3d0" font-size="9" text-anchor="middle">Custo moderado: ~100 a 300 ns</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">A preservação da TLB é a principal razão pela qual threads são muito mais leves para troca de contexto que processos.</text>

</svg>
<p>Visualização: Custos de troca de contexto comparando a sobrecarga de substituição do registrador CR3 e flush da TLB contra a troca leve de TCB entre threads.</p>

| Operação de Troca de Contexto | Entre Threads do mesmo Processo | Entre Processos Distintos |
|---|---|---|
| **Troca de Registradores de CPU** | Sim | Sim |
| **Troca de Registrador `CR3` (Memória)** | Não (Mesma memória) | **Sim (Nova Tabela de Páginas)** |
| **Invalidação do TLB** | Não (TLB preservado) | **Sim (Flush completo do TLB)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização de Hardware: PCID (Process-Context Identifiers)
- Processadores x86 modernos suportam a funcionalidade **PCID** (Process-Context Identifier), que etiqueta as entradas do TLB com um ID do processo.
- Isso permite alternar o registrador `CR3` sem descartar todo o cache do TLB, reduzindo o impacto de performance das trocas de contexto entre processos em até 30%.

#### Key Takeaways
- Em arquiteturas de micro-serviços com altíssima taxa de requisições, evitar processos pesados e adotar pools de threads ou runtimes concorrentes minimiza o desperdício de ciclos em context switches.

</details>
