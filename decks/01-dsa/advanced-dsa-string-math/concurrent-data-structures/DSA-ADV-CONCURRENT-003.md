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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">O Problema ABA e Mitigação via Tagged Pointers (Stamp / Versão)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#ef4444" rx="6"/>
    <text x="260" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Sequência: A (v1) → B (v2) → A (v3)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Thread 1 lê A; Thread 2 remove A, insere B e reinsere A no mesmo endereço de memória.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Solução com AtomicStampedReference: compara (ponteiro, versão). (A, 1) != (A, 3) ➔ CAS falha com segurança.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Tagging de versão previne corrupção silenciosa de estruturas de dados lock-free</text>
</svg>
<p>Visualização: Problema ABA em estruturas concorrentes e mitigação através de ponteiros versionados (tagged pointers / stamps).</p>
| Tipo de Referência | Transição de Estados | Resultado do CAS |
|---|---|---|
| **Ponteiro Puro (Sem Versão)** | $A \to B \to A$ | CAS tem **sucesso falso** (Corrompe memória) |
| **Tagged Pointer (Com Versão)** | $(A, 1) \to (B, 2) \to (A, 3)$ | CAS **falha com segurança** ($1 \neq 3$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em linguagens com Garbage Collection (Java, Go), o problema ABA em referências puras é mitigado pela retenção de objetos vivos, mas reaparece em pooling e ponteiros numéricos.

</details>
