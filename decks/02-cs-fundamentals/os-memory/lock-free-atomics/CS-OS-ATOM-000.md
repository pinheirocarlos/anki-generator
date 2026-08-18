---
id: CS-OS-ATOM-000
title: "Não-Atomicidade de count++ em Nível de Hardware"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
Por que uma operação simples como `count++` não é atômica no nível de hardware e instruções de máquina da CPU?

## Resposta
### Quick Answer
**Solução Direta**:
- Em linguagens compiladas (C, Go, Rust) e interpretadas (Java, Python), a instrução `count++` é decomposta pelo compilador em **3 passos discretos em Assembly**:
  1. **`MOV EAX, [count]` (Read)**: Copia o valor da variável da memória RAM/cache para o registrador da CPU.
  2. **`ADD EAX, 1` (Modify)**: A ALU soma 1 ao registrador.
  3. **`MOV [count], EAX` (Write)**: Grava o novo valor de volta na posição de memória.
- Se duas threads em núcleos diferentes executarem o passo 1 simultaneamente, ambas lerão o mesmo valor antigo (ex: 5) e ambas gravarão 6, perdendo 1 incremento (*Lost Update*).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/non-atomic-increment-hardware-race-loop.webm">
    <p>Visualização: Decomposição da instrução em 3 etapas (Read, Modify, Write) gerando race condition entre múltiplos cores.</p>
  </video>
</div>

| Ciclo de CPU | Thread 1 vs Thread 2 | Memória `count` |
|---|---|---|
| **1-2 (Read)** | Ambas leem count (5) para registradores locais | 5 |
| **3 (Modify)** | Ambas somam 1 em seus registradores (6) | 5 |
| **4 (Write)** | Ambas gravam 6 na memória | **6 (Deveria ser 7!)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Instrução Atômica de Hardware (`LOCK INC`)
- Para tornar o incremento seguro em 1 única instrução de máquina x86 sem Mutex de software, o processador fornece o prefixo de barramento **`LOCK`**:
```text
LOCK INC DWORD PTR [count]  ; Trava a Cache Line no barramento e incrementa atomicamente
```

#### Key Takeaways
- Pacotes como `sync/atomic` em Go e `AtomicInteger` em Java invocam diretamente essas instruções de hardware (`LOCK ADD`, `LOCK CMPXCHG`).

</details>
