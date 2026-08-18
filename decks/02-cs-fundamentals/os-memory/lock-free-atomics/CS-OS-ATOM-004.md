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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/lock-free-cas-aba-tagged-loop.webm">
    <p>Visualização: Incremento atômico de versão em tagged pointer impedindo que mudanças ABA passem despercebidas pelo CAS.</p>
  </video>
</div>

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
