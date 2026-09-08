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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Intuição de Bitmask: O Painel de Lâmpadas (1 = Visitada, 0 = Pendente)</text>
  <g transform="translate(140, 50)">
    <circle cx="40" cy="30" r="18" fill="#10b981"/><text x="40" y="35" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">1</text><text x="40" y="62" fill="#a7f3d0" font-size="10" text-anchor="middle">Cidade 0</text>
    <circle cx="120" cy="30" r="18" fill="#10b981"/><text x="120" y="35" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">1</text><text x="120" y="62" fill="#a7f3d0" font-size="10" text-anchor="middle">Cidade 1</text>
    <circle cx="200" cy="30" r="18" fill="#334155"/><text x="200" y="35" fill="#94a3b8" font-size="12" font-weight="bold" text-anchor="middle">0</text><text x="200" y="62" fill="#64748b" font-size="10" text-anchor="middle">Cidade 2</text>
    <circle cx="280" cy="30" r="18" fill="#10b981"/><text x="280" y="35" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">1</text><text x="280" y="62" fill="#a7f3d0" font-size="10" text-anchor="middle">Cidade 3</text>
    <circle cx="360" cy="30" r="18" fill="#334155"/><text x="360" y="35" fill="#94a3b8" font-size="12" font-weight="bold" text-anchor="middle">0</text><text x="360" y="62" fill="#64748b" font-size="10" text-anchor="middle">Cidade 4</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Máscara binária: 01011₂ = 11 (número inteiro único indexando o estado da DP em O(1))</text>
</svg>
<p>Visualização: Metáfora do painel de interruptores: cada bit representa se uma tarefa já foi executada ou um item foi selecionado.</p>
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
