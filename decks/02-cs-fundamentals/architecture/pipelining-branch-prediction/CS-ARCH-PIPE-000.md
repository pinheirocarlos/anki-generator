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
