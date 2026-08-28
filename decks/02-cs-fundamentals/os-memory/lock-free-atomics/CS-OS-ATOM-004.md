---
id: CS-OS-ATOM-004
title: "O Problema ABA em Estruturas Lock-Free e Tagged Pointers"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::netflix
  - freq::high
---

## Pergunta
O que é o **Problema ABA** em estruturas de dados Lock-Free e como ponteiros versionados (*Tagged Pointers*) o eliminam?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema ABA**: Ocorre em algoritmos Lock-Free baseados em CAS quando uma thread $T_1$ lê o valor $A$, é suspensa, e durante a pausa:
  1. Outra thread $T_2$ altera o valor de $A$ para $B$.
  2. $T_2$ (ou outra thread) altera de volta de $B$ para $A$ (ou desaloca e recicla o mesmo endereço de memória de $A$).
  3. Quando $T_1$ acorda e executa `CAS(ptr, A, C)`, a instrução tem sucesso falso porque o ponteiro tem o mesmo valor $A$, mas o estado interno ou os nós subsequentes da estrutura foram completamente corrompidos!
- **Solução com Tagged Pointers / Versionamento**:
  - Armazenar junto com o ponteiro um **contador de versão / tag de 64 bits** que é incrementado monotonicamente a cada mutação: `Pair(pointer, version)`.
  - O CAS passa a validar o par completo: `Double-Word CAS (DCAS / CMPXCHG16B)`. Mesmo que o ponteiro volte para $A$, a versão será diferente ($A_1 \to B_2 \to A_3 \neq A_1$), fazendo o CAS falhar com segurança.

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Problema ABA em Pilhas Lock-Free &amp; Solução por Tagged Pointers</text>
  <g transform="translate(50, 48)">
    <!-- ABA Problem -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Problema ABA</text>
    <text x="135" y="42" fill="#f8fafc" font-size="10" text-anchor="middle">1. Thread 1 lê ponteiro A</text>
    <text x="135" y="58" fill="#f8fafc" font-size="10" text-anchor="middle">2. Thread 2 muda A → B e depois B → A</text>
    <text x="135" y="78" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">CAS(A) sucede falsamente com estado corrompido</text>

    <!-- Tagged Pointer -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Solução: Tagged Pointer (Ponteiro + Versão)</text>
    <text x="445" y="42" fill="#f8fafc" font-size="10" text-anchor="middle">Armazena (Ponteiro 48b + Versão 16b)</text>
    <text x="445" y="58" fill="#f8fafc" font-size="10" text-anchor="middle">Transição: (A, v1) → (B, v2) → (A, v3)</text>
    <text x="445" y="78" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">CAS((A, v1)) falha corretamente!</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">No x86-64, instruções de 128-bit (CMPXCHG16B) realizam CAS atômico de ponteiro e contador de versão juntos.</text>

</svg>

| Linha do Tempo | Ação Concorrente | Estado da Pilha |
|---|---|---|
| **$t_1$ (Leitura T1)** | T1 lê Topo = $A$ (aponta para $B$) | Pilha: $A \to B$ |
| **$t_2$ (T2 Mutação)** | T2 remove $A$, remove $B$, reinsere $A$ reciclado | Pilha: $A \to C$ |
| **$t_3$ (CAS Falso T1)**| T1 executa CAS(Topo, $A$, $B$) com sucesso falso | **Pilha corrompida ($A \to B$ desalocado)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que Linguagens com Garbage Collector Sofrem Menos com ABA
- Em linguagens com GC (como Go e Java), enquanto a Thread 1 mantiver uma referência ao nó $A$, o coletor de lixo não desaloca nem recicla a memória de $A$ para um novo objeto, reduzindo drasticamente a ocorrência do problema ABA comparado a C/C++ com `free()`.
- Em Java, classes especializadas como `AtomicStampedReference` implementam Tagged Pointers nativamente.

#### Key Takeaways
- Sempre que você reciclar nós em memória (*Memory Pools / Free Lists*) em código Lock-Free, utilize Tagged Pointers ou Hazard Pointers para prevenir o problema ABA.

</details>
