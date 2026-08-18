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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/architecture/cpu-registers-pc-sp-flags-loop.webm">
    <p>Visualização: Manipulação de registradores de estado: Program Counter (PC), Stack Pointer (SP) e Flags aritméticas (ZF, CF, OF).</p>
  </video>
</div>

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
