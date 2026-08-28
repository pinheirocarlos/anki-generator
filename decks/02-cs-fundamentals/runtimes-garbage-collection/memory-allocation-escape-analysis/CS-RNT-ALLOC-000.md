---
id: CS-RNT-ALLOC-000
title: "Alocação de Memória: Stack vs Heap e Trade-offs de Performance"
tags:
  - level::l3-junior
  - topic::cs::runtimes
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre **Stack Allocation** e **Heap Allocation** em termos de velocidade e impacto no Garbage Collector?

## Resposta
### Quick Answer
**Solução Direta**:
- **Stack Allocation (Pilha)**:
  - Alocação ultra-rápida em **1 único ciclo de CPU** incrementando/decrementando o registrador Stack Pointer (`RSP`).
  - Escopo estritamente restrito ao tempo de vida do método atual; a desalocação é **instantânea e com custo zero** quando o método retorna.
  - Zero trabalho para o Garbage Collector; possui excelente localidade de cache L1/L2.
- **Heap Allocation (Monte)**:
  - Alocação dinâmica para objetos cujo tamanho é desconhecido em tempo de compilação ou cujo tempo de vida ultrapassa o retorno da função.
  - Exige busca em estruturas de gerenciamento de memória (*Size Classes / Free Lists*), gerando fragmentação.
  - Cria trabalho contínuo de rastreamento e varredura para o **Garbage Collector**, impactando a latência da aplicação.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Alocação de Memória: Stack vs Heap</text>
  <g transform="translate(50, 48)">
    <!-- Stack -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="135" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Stack Allocation (Pilha)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Custo de Alocação: O(1) (Apenas move RSP)</text>
    <text x="135" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Desalocação Gratuita no retorno da função</text>
    <text x="135" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Localidade de Cache L1/L2 perfeita | Sem GC</text>

    <!-- Heap -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="445" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Heap Allocation (Monte)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Custo de Alocação: Gerenciamento de blocos livres</text>
    <text x="445" y="60" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Exige Garbage Collection ou free() manual</text>
    <text x="445" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Risco de fragmentação e pressão sobre o GC</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Alocar na Stack é dezenas de vezes mais rápido que alocar na Heap em qualquer linguagem moderna.</text>

</svg>

| Métrica | Stack Allocation | Heap Allocation |
|---|---|---|
| **Custo de Alocação** | 1 ciclo de clock (`SUB RSP, N`) | Busca em blocos / Lock / Syscall |
| **Custo de Desalocação** | 0 ns (Automático ao retornar método) | Rastreamento e varredura pelo GC |
| **Localidade de Cache**| Máxima (Quente nos caches L1/L2) | Espalhada pela memória RAM |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Regra Prática de Otimização em Go / Java / Rust
- *"Mantenha dados na Stack sempre que possível"*.
- Projetar código que evita alocações desnecessárias no Heap reduz diretamente o tempo que a CPU gasta pausando ou executando ciclos de Garbage Collection.

#### Key Takeaways
- Alocações na Stack não precisam de locks de sincronização nem de algoritmos de rastreamento de ponteiros.

</details>
