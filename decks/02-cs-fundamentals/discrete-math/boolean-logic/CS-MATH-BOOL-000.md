---
id: CS-MATH-BOOL-000
title: "Operações Bitwise Fundamentais (AND, OR, XOR, NOT, Shifts) e Máscaras"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
O que são as operações **bitwise fundamentais** (AND, OR, XOR, NOT, Shifts) e como utilizá-las para manipular máscaras de bits em $O(1)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Operações bitwise atuam diretamente sobre bits individuais no hardware da ALU em **1 ciclo de clock**:
  - **AND (`&`)**: Retorna 1 se ambos os bits forem 1 (usado para *filtrar / testar* bits: `flags & MASK`).
  - **OR (`|`)**: Retorna 1 se pelo menos um bit for 1 (usado para *ligar / setar* bits: `flags | MASK`).
  - **XOR (`^`)**: Retorna 1 se os bits forem diferentes (usado para *alternar / toggle* bits: `flags ^ MASK`).
  - **NOT (`~`)**: Inverte todos os bits (usado para *desligar* bits em conjunto com AND: `flags & ~MASK`).
  - **Shifts (`<<`, `>>`)**: Deslocam bits para esquerda (multiplica por $2^k$) ou direita (divide por $2^k$).

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Operadores Bitwise Fundamentais na ALU</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="125" height="85" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="62" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">AND (&amp;)</text>
    <text x="62" y="44" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">1 &amp; 1 = 1</text>
    <text x="62" y="60" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">1 &amp; 0 = 0</text>
    <text x="62" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Máscara / Clear</text>

    <rect x="145" y="0" width="125" height="85" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="207" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">OR (|)</text>
    <text x="207" y="44" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">1 | 0 = 1</text>
    <text x="207" y="60" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">0 | 0 = 0</text>
    <text x="207" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Set Bit (Ligar)</text>

    <rect x="290" y="0" width="125" height="85" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="352" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">XOR (^)</text>
    <text x="352" y="44" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">1 ^ 0 = 1</text>
    <text x="352" y="60" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">1 ^ 1 = 0</text>
    <text x="352" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Toggle / Diff</text>

    <rect x="435" y="0" width="125" height="85" rx="5" fill="#1e293b" stroke="#a855f7"/>
    <text x="497" y="22" fill="#c084fc" font-size="12" font-weight="bold" text-anchor="middle">NOT (~) &amp; Shift</text>
    <text x="497" y="44" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">~0 = 1, ~1 = 0</text>
    <text x="497" y="60" fill="#cbd5e1" font-size="10" font-family="monospace" text-anchor="middle">x &lt;&lt; 1 = x * 2</text>
    <text x="497" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">x &gt;&gt; 1 = x / 2</text>
  </g>
  <rect x="60" y="150" width="560" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Execução em 1 ciclo na ALU: base de flags booleanas de alto desempenho e compressão de dados.</text>

</svg>
<p>Visualização: Operações bitwise fundamentais (AND, OR, XOR, NOT, Shifts) executadas em 1 ciclo na ALU para controle e teste de flags.</p>

| Operação Bitwise | Exemplo de Código | Efeito Prático na Flag |
|---|---|---|
| **Setar Bit $k$** | `set_bit(flags, k)` | Liga o bit na posição $k$ |
| **Limpar Bit $k$**| `clear_bit(flags, k)` | Desliga o bit na posição $k$ |
| **Testar Bit $k$**| `test_bit(flags, k)` | Retorna `true` se ativo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Sistema de Permissões de Alta Performance
```go
package main

import "fmt"

const (
  PermRead    = 1 << 0 // 0001 (1)
  PermWrite   = 1 << 1 // 0010 (2)
  PermExecute = 1 << 2 // 0100 (4)
  PermAdmin   = 1 << 3 // 1000 (8)
)

func main() {
  var userPerms uint8 = PermRead | PermWrite // 0011

  // Testando permissão de escrita:
  hasWrite := (userPerms & PermWrite) != 0 // true

  // Revogando permissão de escrita:
  userPerms &= ^PermWrite // 0001 (em Go ^ é NOT bitwise)

  fmt.Printf("Permissões: %04b, Pode Escrever: %v\n", userPerms, hasWrite)
}
```

#### Key Takeaways
- Máscaras de bits empacotam até 64 flags booleanas em um único inteiro de 8 bytes (`uint64`), economizando 90% de memória comparado a arrays de booleanos.

</details>
