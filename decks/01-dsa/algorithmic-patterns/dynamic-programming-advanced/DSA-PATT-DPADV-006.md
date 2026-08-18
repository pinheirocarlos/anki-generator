---
id: DSA-PATT-DPADV-006
title: "Intuição Fundamental de DP Avançada (Bitmask): O Painel de Lâmpadas Ligadas e Desligadas"
tags:
  - level::l2-fundamental
  - topic::dsa::dynamic-programming-advanced
  - company::google
  - freq::low
---

## Pergunta
Qual é o modelo mental de Bitmask DP e como um único número inteiro pode representar o conjunto de escolhas ou cidades já visitadas?

## Resposta
### Quick Answer
**Solução Direta**:
- **Bitmask DP** usa os bits de um número binário como um **painel de interruptores de luz**: onde o bit `1` significa que uma cidade/item já foi visitado/escolhido, e `0` que ainda está pendente.
- Isso permite representar o estado completo de um subconjunto de até 20 elementos em **um único número inteiro de 32 bits**, viabilizando memoização ultrarrápida em arrays comuns (`dp[mask][u]`).

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Bitmask: Representando Cidades Visitadas com Bits 1 e 0</text>

  <!-- Interruptores Binários -->
  <g transform="translate(80, 50)">
    <!-- Cidade 3 (Visitada) -->
    <g transform="translate(0, 0)">
      <rect x="0" y="0" width="80" height="50" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4" />
      <text x="40" y="22" fill="#a7f3d0" font-size="10" text-anchor="middle">Cidade 3</text>
      <text x="40" y="42" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">Bit: 1</text>
      <text x="40" y="65" fill="#34d399" font-size="10" text-anchor="middle">Visitada ✓</text>
    </g>

    <!-- Cidade 2 (Não Visitada) -->
    <g transform="translate(110, 0)">
      <rect x="0" y="0" width="80" height="50" fill="#1e293b" stroke="#64748b" stroke-width="1.5" rx="4" />
      <text x="40" y="22" fill="#94a3b8" font-size="10" text-anchor="middle">Cidade 2</text>
      <text x="40" y="42" fill="#94a3b8" font-size="16" font-weight="bold" text-anchor="middle">Bit: 0</text>
      <text x="40" y="65" fill="#64748b" font-size="10" text-anchor="middle">Pendente ✗</text>
    </g>

    <!-- Cidade 1 (Visitada) -->
    <g transform="translate(220, 0)">
      <rect x="0" y="0" width="80" height="50" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4" />
      <text x="40" y="22" fill="#a7f3d0" font-size="10" text-anchor="middle">Cidade 1</text>
      <text x="40" y="42" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">Bit: 1</text>
      <text x="40" y="65" fill="#34d399" font-size="10" text-anchor="middle">Visitada ✓</text>
    </g>

    <!-- Cidade 0 (Visitada) -->
    <g transform="translate(330, 0)">
      <rect x="0" y="0" width="80" height="50" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4" />
      <text x="40" y="22" fill="#a7f3d0" font-size="10" text-anchor="middle">Cidade 0</text>
      <text x="40" y="42" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">Bit: 1</text>
      <text x="40" y="65" fill="#34d399" font-size="10" text-anchor="middle">Visitada ✓</text>
    </g>
  </g>

  <text x="300" y="160" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">Máscara Binária: 1011₂ = Número Decimal 11 ➔ Índice Direto no Array de DP!</text>
</svg>

| Operação Bitwise | Expressão | Significado Prático |
|---|---|---|
| **Verificar se cidade $i$ foi visitada** | `(mask & (1 << i)) != 0` | A lâmpada da cidade $i$ está acesa? |
| **Marcar cidade $i$ como visitada** | `new_mask = mask OR (1 << i)` | Acende a lâmpada da cidade $i$ |
| **Todas as $N$ cidades visitadas** | `mask == (1 << N) - 1` | Todas as lâmpadas acesas (ex: `1111₂ = 15`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Problema do Caixeiro Viajante (TSP)
Um vendedor precisa visitar 15 cidades e voltar à origem gastando o menor combustível possível:
- Como guardar quais cidades ele já visitou? Criar uma lista de cidades visitadas seria lento para comparar na memória do cache.
- Um número inteiro de 4 bytes tem 32 bits. Com apenas 15 bits, representamos qualquer uma das $2^{15} = 32.768$ combinações de itinerários possíveis instantaneamente.

#### Por que isso é considerado "Avançado"?
Porque reduz a complexidade teórica do Caixeiro Viajante de fatorial absurdo $O(N!)$ para $O(N^2 \cdot 2^N)$, tornando problemas com $N \le 20$ computáveis em menos de 1 segundo.

#### Key Takeaways
- Bitmask é a ponte perfeita entre a álgebra booleana de hardware e a programação dinâmica.

</details>
