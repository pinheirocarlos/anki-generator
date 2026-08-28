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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Não-Atomicidade de count++: Race Condition em Nível de Hardware</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="85" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">1. READ</text>
    <text x="85" y="44" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">MOV EAX, [count]</text>
    <text x="85" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">Carrega RAM/L1 p/ Reg</text>

    <rect x="195" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="280" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">2. MODIFY</text>
    <text x="280" y="44" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">ADD EAX, 1</text>
    <text x="280" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">Incremento na ALU</text>

    <rect x="390" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#f43f5e"/>
    <text x="475" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">3. WRITE</text>
    <text x="475" y="44" fill="#ffffff" font-size="10" font-family="monospace" text-anchor="middle">MOV [count], EAX</text>
    <text x="475" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">Grava Reg na Memória</text>
  </g>
  <text x="340" y="160" fill="#f43f5e" font-size="11" font-weight="bold" text-anchor="middle">Sem instrução atômica (LOCK XADD), duas threads intercaladas sobrescrevem o resultado gerando perda de dados.</text>

</svg>

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
