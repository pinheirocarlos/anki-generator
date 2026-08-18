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
