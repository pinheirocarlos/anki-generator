---
id: DSA-STRUCT-LIST-003
title: "Trade-offs de Overhead de Ponteiros e Cache Misses em Listas Ligadas"
tags:
  - level::l3-junior
  - topic::dsa::linked-lists
  - company::meta
  - freq::high
---

## Pergunta
Quais são as desvantagens de consumo de memória e localidade de cache de listas encadeadas em relação a arrays?

## Resposta
### Quick Answer
**Solução Direta**:
- **Overhead de Memória**: Cada nó exige 8 bytes (em 64-bit) para o ponteiro `next` (mais 8 bytes para `prev` em listas duplas) além do payload, gerando um desperdício de 50% a 75% da memória apenas com ponteiros.
- **Cache Misses Críticos**: Como os nós são alocados em momentos distintos, eles ficam espalhados pelo Heap; percorrer a lista gera um salto aleatório de memória por nó, inutilizando o pré-fetcher de hardware da CPU.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Dispersão Espacial na Memória Heap e Cache Misses em Listas</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="100" height="50" fill="#7f1d1d" stroke="#ef4444" rx="4"/>
    <text x="50" y="25" fill="#fecaca" font-size="11" text-anchor="middle">Nó 1 (0x1000)</text>
    <text x="50" y="42" fill="#f87171" font-size="9" text-anchor="middle">Pointer Chase</text>

    <path d="M 100 25 Q 180 -15 220 25" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4"/>

    <rect x="220" y="0" width="100" height="50" fill="#7f1d1d" stroke="#ef4444" rx="4"/>
    <text x="270" y="25" fill="#fecaca" font-size="11" text-anchor="middle">Nó 2 (0x8F40)</text>
    <text x="270" y="42" fill="#f87171" font-size="9" text-anchor="middle">Salto na RAM</text>

    <path d="M 320 25 Q 390 65 440 25" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4"/>

    <rect x="440" y="0" width="100" height="50" fill="#7f1d1d" stroke="#ef4444" rx="4"/>
    <text x="490" y="25" fill="#fecaca" font-size="11" text-anchor="middle">Nó 3 (0x3100)</text>
    <text x="490" y="42" fill="#f87171" font-size="9" text-anchor="middle">Cache Miss L1/L2</text>
  </g>
  <text x="340" y="150" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">Cada acesso a próximo nó gera latência de ~50-100ns buscando na DRAM</text>
  <text x="340" y="172" fill="#94a3b8" font-size="11" text-anchor="middle">Razão pela qual vetores contíguos superam listas encadeadas na prática moderna</text>
</svg>

<p>Visualização: Dispersão espacial na memória Heap gerando cache misses e pointer chasing.</p>

| Característica | Lista Encadeada | Array Contíguo |
|---|---|---|
| **Overhead por Elemento** | 8–16 bytes (ponteiros) | 0 bytes extras |
| **Aproveitamento de Cache Line** | Baixo (1 nó por salto) | Alto (múltiplos itens na linha) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Análise de Overhead em 64-bit
Para armazenar um inteiro de 4 bytes (`int32`):
- **Array Contíguo**: 4 bytes por elemento.
- **Lista Duplamente Encadeada**: 4 bytes (valor) + 4 bytes (padding) + 8 bytes (`prev`) + 8 bytes (`next`) + 16 bytes (header de objeto JVM) = **40 bytes** para guardar 4 bytes de dado ($10\times$ mais memória).

#### Key Takeaways
- Em cenários com restrição de memória ou sensibilidade a latência de CPU, vetores dinâmicos são quase invariavelmente preferíveis a listas ligadas.

</details>
