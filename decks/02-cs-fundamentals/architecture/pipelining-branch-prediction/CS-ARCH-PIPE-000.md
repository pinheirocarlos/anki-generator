---
id: CS-ARCH-PIPE-000
title: "Pipeline de Instruções da CPU e Paralelismo Temporal"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::amazon
  - freq::high
---

## Pergunta
O que é o **Pipeline de Instruções** da CPU e como ele aumenta o throughput de execução através do paralelismo temporal?

## Resposta
### Quick Answer
**Solução Direta**:
- O pipeline divide a execução de cada instrução de máquina em estágios sequenciais discretos (tipicamente 5 estágios clássicos de RISC):
  1. **IF (Instruction Fetch)**: Busca a instrução na memória/cache L1i.
  2. **ID (Instruction Decode)**: Decodifica o opcode e lê os registradores.
  3. **EX (Execute)**: Executa a operação aritmética ou lógica na ALU.
  4. **MEM (Memory Access)**: Lê ou grava dados na memória/cache L1d.
  5. **WB (Write Back)**: Escreve o resultado final de volta nos registradores.
- Em vez de esperar uma instrução completar todos os 5 ciclos para iniciar a próxima, a CPU inicia uma nova instrução a cada ciclo de clock, completando idealmente **1 instrução por ciclo (IPC = 1)** em regime contínuo.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Pipeline Clássico de 5 Estágios da CPU (RISC)</text>
  <g transform="translate(60, 50)">
    <!-- Stage 1 -->
    <rect x="0" y="0" width="95" height="60" rx="5" fill="#0369a1" stroke="#38bdf8"/>
    <text x="47" y="26" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">IF (Fetch)</text>
    <text x="47" y="45" fill="#bae6fd" font-size="9" text-anchor="middle">Busca da RAM/L1I</text>

    <!-- Stage 2 -->
    <rect x="115" y="0" width="95" height="60" rx="5" fill="#0284c7" stroke="#38bdf8"/>
    <text x="162" y="26" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">ID (Decode)</text>
    <text x="162" y="45" fill="#bae6fd" font-size="9" text-anchor="middle">Decodifica &amp; Regs</text>

    <!-- Stage 3 -->
    <rect x="230" y="0" width="95" height="60" rx="5" fill="#0d9488" stroke="#2dd4bf"/>
    <text x="277" y="26" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">EX (Execute)</text>
    <text x="277" y="45" fill="#ccfbf1" font-size="9" text-anchor="middle">Cálculo na ALU</text>

    <!-- Stage 4 -->
    <rect x="345" y="0" width="95" height="60" rx="5" fill="#4f46e5" stroke="#818cf8"/>
    <text x="392" y="26" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">MEM (Memory)</text>
    <text x="392" y="45" fill="#e0e7ff" font-size="9" text-anchor="middle">Acesso L1 Dados</text>

    <!-- Stage 5 -->
    <rect x="460" y="0" width="95" height="60" rx="5" fill="#059669" stroke="#34d399"/>
    <text x="507" y="26" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">WB (Writeback)</text>
    <text x="507" y="45" fill="#d1fae5" font-size="9" text-anchor="middle">Grava Registrador</text>
  </g>
  <text x="340" y="145" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Throughput Ideal: 1 Instrução Concluída por Ciclo (CPI = 1.0)</text>
  <text x="340" y="170" fill="#94a3b8" font-size="11" text-anchor="middle">Sobreposição temporal: 5 instruções diferentes sendo processadas simultaneamente em cada estágio.</text>

</svg>
<p>Visualização: Pipeline clássico de 5 estágios (IF, ID, EX, MEM, WB) com paralelismo temporal de 1 CPI.</p>

| Estágio de Pipeline | Função Principal | Recurso de Hardware |
|---|---|---|
| **IF / ID** | Busca e decodificação da instrução | Cache L1i + Decodificador |
| **EX** | Execução aritmética / cálculo de salto | ALU / Unidade de Branch |
| **MEM / WB** | Acesso à memória e escrita em registrador | Cache L1d + Register File |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia da Linha de Montagem de Carros
- Se 1 trabalhador montar um carro do início ao fim (chassi, motor, pintura, rodas), leva 10 horas para produzir 1 carro.
- Se houver uma linha de montagem com 10 estações especializadas de 1 hora cada, o primeiro carro demora 10 horas, mas a partir daí sai **1 carro novo a cada hora**.

#### Key Takeaways
- O pipeline não reduz o tempo de latência individual de uma instrução (continua levando $K$ ciclos), mas multiplica o **throughput global** por $K$.

</details>
