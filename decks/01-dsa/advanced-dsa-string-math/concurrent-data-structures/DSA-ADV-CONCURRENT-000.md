---
id: DSA-ADV-CONCURRENT-000
title: "Primitivas Atômicas e Compare-And-Swap (CAS) em Estruturas de Dados Lock-Free"
tags:
  - level::l3-junior
  - topic::dsa::concurrent-data-structures
  - company::google
  - freq::high
---

## Pergunta
Como funciona a instrução atômica de hardware **Compare-And-Swap (CAS)** e como ela viabiliza algoritmos lock-free sem travas mutex?

## Resposta
### Quick Answer
**Solução Direta**:
- **CAS(`address`, `expectedValue`, `newValue`)**: É uma instrução atômica indivisível de hardware (ex: `CMPXCHG` no x86) que:
  1. Compara o valor na memória em `address` com `expectedValue`.
  2. Se forem iguais, grava `newValue` e retorna `true`.
  3. Se forem diferentes (outra thread modificou a memória no meio do caminho), aborta sem alterar e retorna `false`.
- **Loop Lock-Free**: Uma thread lê o estado atual, computa o novo estado e tenta gravar via CAS em um laço: `while (!CAS(ptr, old, new))`. Se falhar, relê o estado e tenta novamente sem jamais bloquear o sistema operacional.

### Dual Coding Visual
| Mecanismo de Sincronização | Impacto de Contenção | Risco de Deadlock |
|---|---|---|
| **Mutex / Lock Tradicional** | Thread suspensa pelo SO (Context Switch) | Alto |
| **Lock-Free com CAS** | Thread reexecuta loop na CPU (Sem lock) | Zero Deadlocks |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Permite throughput ordens de grandeza maior em sistemas de alta frequência (HFT) e motores de banco de dados.

</details>
