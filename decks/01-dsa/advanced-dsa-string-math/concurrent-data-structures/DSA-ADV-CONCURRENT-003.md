---
id: DSA-ADV-CONCURRENT-003
title: "O Problema ABA em Algoritmos Lock-Free e Mitigação com Tagged Pointers"
tags:
  - level::l3-junior
  - topic::dsa::concurrent-data-structures
  - company::amazon
  - freq::high
---

## Pergunta
O que é o **Problema ABA** em estruturas lock-free baseadas em CAS e como **Tagged Pointers / Versionamento** resolvem essa vulnerabilidade?

## Resposta
### Quick Answer
**Solução Direta**:
- **O Problema ABA**:
  1. Thread 1 lê o ponteiro com valor $A$.
  2. Thread 2 intervém: altera o valor de $A$ para $B$, e depois de volta para $A$ (reutilizando o mesmo endereço de memória).
  3. Thread 1 executa `CAS(ptr, A, C)`. O CAS é bem-sucedido porque o ponteiro ainda aponta para o endereço $A$, mas o **estado interno dos dados foi corrompido** (nós intermediários foram desalocados/reorganizados).
- **Mitigação com Tagged Pointers / Versionamento**: Acopla um contador de versão (ou timestamp) ao ponteiro: $(A, v_1) \to (B, v_2) \to (A, v_3)$. Como $v_1 \neq v_3$, o CAS falha com segurança (ex: `AtomicStampedReference` no Java).

### Dual Coding Visual
| Tipo de Referência | Transição de Estados | Resultado do CAS |
|---|---|---|
| **Ponteiro Puro (Sem Versão)** | $A \to B \to A$ | CAS tem **sucesso falso** (Corrompe memória) |
| **Tagged Pointer (Com Versão)** | $(A, 1) \to (B, 2) \to (A, 3)$ | CAS **falha com segurança** ($1 \neq 3$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em linguagens com Garbage Collection (Java, Go), o problema ABA em referências puras é mitigado pela retenção de objetos vivos, mas reaparece em pooling e ponteiros numéricos.

</details>
