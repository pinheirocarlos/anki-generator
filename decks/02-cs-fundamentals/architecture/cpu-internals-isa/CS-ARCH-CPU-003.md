---
id: CS-ARCH-CPU-003
title: "Comparação de Filosofia de ISA: x86-64 (CISC) vs ARM64 (RISC)"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::apple
  - freq::high
---

## Pergunta
Quais são as diferenças fundamentais de filosofia de design entre arquiteturas **x86-64 (CISC)** e **ARM64 (RISC)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **x86-64 (CISC - Complex Instruction Set Computer)**:
  - Instruções de tamanho variável (1 a 15 bytes) que realizam operações complexas (ex: ler da memória, somar e salvar em 1 instrução).
  - Menor quantidade de registradores gerais (16 registradores).
  - Hardware interno mais denso com decodificadores complexos que traduzem instruções CISC em micro-operações ($mu	ext{ops}$).
- **ARM64 (RISC - Reduced Instruction Set Computer)**:
  - Arquitetura estrita **Load/Store**: operações aritméticas só ocorrem entre registradores; apenas instruções dedicadas (`LDR`/`STR`) tocam a memória.
  - Instruções com tamanho fixo (sempre 4 bytes / 32 bits), facilitando a decodificação paralela e reduzindo consumo de energia.
  - 31 registradores de propósito geral (`X0` a `X30`).

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Filosofia de ISA: CISC (x86-64) vs RISC (ARM64 / RISC-V)</text>
  <g transform="translate(50, 48)">
    <!-- CISC -->
    <rect x="0" y="0" width="270" height="110" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="13" font-weight="bold" text-anchor="middle">x86-64 (CISC)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">• Instruções de comprimento variável (1 a 15 bytes)</text>
    <text x="135" y="62" fill="#f8fafc" font-size="10" text-anchor="middle">• Operações diretas memória-registrador (add [rax], rbx)</text>
    <text x="135" y="80" fill="#f8fafc" font-size="10" text-anchor="middle">• Decodificadores complexos (hardware traduz p/ micro-ops)</text>
    <text x="135" y="98" fill="#94a3b8" font-size="9" text-anchor="middle">Foco: Densidade de código &amp; Retrocompatibilidade</text>

    <!-- RISC -->
    <rect x="310" y="0" width="270" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="13" font-weight="bold" text-anchor="middle">ARM64 / Apple Silicon (RISC)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">• Instruções de tamanho fixo (estritamente 4 bytes)</text>
    <text x="445" y="62" fill="#f8fafc" font-size="10" text-anchor="middle">• Arquitetura Load/Store (apenas LDR/STR tocam na RAM)</text>
    <text x="445" y="80" fill="#f8fafc" font-size="10" text-anchor="middle">• Decodificação paralela ultra-larga (8+ decoders simples)</text>
    <text x="445" y="98" fill="#94a3b8" font-size="9" text-anchor="middle">Foco: Eficiência energética &amp; Alto paralelismo IPC</text>
  </g>
  <text x="340" y="185" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Convergência: Processadores modernos x86 quebram CISC em micro-ops RISC internamente.</text>

</svg>
<p>Visualização: Filosofia CISC (instruções variáveis complexas) vs RISC (instruções atômicas de ciclo único).</p>

| Característica | x86-64 (Intel / AMD) | ARM64 / AArch64 (Graviton / Apple) |
|---|---|---|
| **Filosofia ISA** | CISC (Complexo) | RISC (Reduzido / Load-Store) |
| **Tamanho da Instrução** | Variável (1 a 15 bytes) | Fixo (4 bytes) |
| **Registradores Gerais** | 16 (`RAX` a `R15`) | 31 (`X0` a `X30`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que Servidores Cloud Estão Migrando para ARM (AWS Graviton)
- O tamanho fixo de instruções e o modelo simples de decodificação permitem criar processadores com núcleos menores, mais eficientes e com menor dissipação térmica.
- Isso possibilita empacotar até 128 núcleos físicos em um único soquete com custo por computação 20% a 40% menor que processadores x86 legados.

#### Key Takeaways
- Internamente, CPUs x86 modernas também executam um núcleo RISC, traduzindo instruções x86 complexas em $mu	ext{ops}$ na camada de decodificação de hardware.

</details>
