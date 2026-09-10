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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compare-And-Swap (CAS): Primitiva Atômica em Hardware</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="260" height="75" fill="#1e293b" stroke="#ef4444" rx="6"/>
    <text x="130" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Lock-Based (Mutex / RWLock)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Thread suspensa pelo kernel.</text>
    <text x="15" y="60" fill="#fca5a5" font-size="10">Overhead de context switch (~1-2µs).</text>

    <g transform="translate(300, 0)">
      <rect x="0" y="0" width="260" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="130" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Lock-Free (Atômicos / CAS)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Instruções atômicas de CPU (ex: CMPXCHG).</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Pelo menos uma thread progride sempre.</text>
    </g>
  </g>
  <text x="340" y="165" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">CAS elimina deadlocks, inversões de prioridade e suspensão de threads</text>
</svg>
<p>Visualização: Primitiva atômica Compare-And-Swap (CAS) em nível de CPU comparando o valor esperado antes de aplicar a alteração.</p>

| Mecanismo de Sincronização | Impacto de Contenção | Risco de Deadlock |
|---|---|---|
| **Mutex / Lock Tradicional** | Thread suspensa pelo SO (Context Switch) | Alto |
| **Lock-Free com CAS** | Thread reexecuta loop na CPU (Sem lock) | Zero Deadlocks |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Permite throughput ordens de grandeza maior em sistemas de alta frequência (HFT) e motores de banco de dados.

</details>
