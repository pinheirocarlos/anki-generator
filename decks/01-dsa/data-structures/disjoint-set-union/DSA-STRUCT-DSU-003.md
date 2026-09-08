---
id: DSA-STRUCT-DSU-003
title: "Operação Union e Fusão de Componentes Conexos em DSU"
tags:
  - level::l3-junior
  - topic::dsa::disjoint-set-union
  - company::amazon
  - freq::high
---

## Pergunta
Como a operação **`union`** funde dois conjuntos no DSU e como ela verifica se dois nós já estavam conectados?

## Resposta
### Quick Answer
**Solução Direta**:
- Para fundir os conjuntos de $x$ e $y$:
  1. Encontra as raízes de ambos: `rootX = find(x)` e `rootY = find(y)`.
  2. Se `rootX == rootY`, os elementos **já pertencem ao mesmo conjunto** (nenhuma ação é necessária e retorna `false`).
  3. Se `rootX != rootY`, faz uma raiz apontar para a outra (`parent[rootX] = rootY`), unificando os grupos e decrementando o total de componentes conexos.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Operação union(x, y): Fusão de Componentes e Union by Rank</text>
  
  <g transform="translate(45, 45)">
    <!-- Caso 1: Já Conectados -->
    <rect x="0" y="0" width="280" height="100" fill="#1e293b" stroke="#ef4444" stroke-width="1.5" rx="6"/>
    <text x="140" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Caso 1: rootX == rootY</text>
    <text x="15" y="44" fill="#f8fafc" font-size="10">• find(x) e find(y) retornam a mesma raiz</text>
    <text x="15" y="62" fill="#f87171" font-size="10">• Nós já pertencem ao mesmo conjunto!</text>
    <text x="15" y="80" fill="#94a3b8" font-size="10">• Retorna false (detecta ciclo / redundância)</text>

    <!-- Caso 2: Diferentes Componentes -->
    <g transform="translate(310, 0)">
      <rect x="0" y="0" width="280" height="100" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
      <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Caso 2: rootX != rootY (Fusão)</text>
      <text x="15" y="44" fill="#f8fafc" font-size="10">• Conecta árvore de menor rank sob a maior</text>
      <text x="15" y="62" fill="#34d399" font-size="10">• parent[rootX] = rootY (ou vice-versa)</text>
      <text x="15" y="80" fill="#38bdf8" font-size="10">• Decrementa o número total de componentes</text>
    </g>
  </g>

  <text x="340" y="175" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">União por Rank garante altura máxima O(log N) das árvores da floresta</text>
</svg>

<p>Visualização: Operação union conectando a raiz de uma árvore sob a outra com união por rank para evitar degeneração de altura.</p>

| Condição em `union(x, y)` | Ação | Conectividade |
|---|---|---|
| `rootX == rootY` | Ignora / Sinaliza ciclo | Já conectados |
| `rootX != rootY` | `parent[rootX] = rootY` | Nova conexão estabelecida |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O retorno booleano de `union` (verdadeiro se conectou, falso se já estavam conectados) é a chave para algoritmos de detecção de ciclos e Kruskal.

</details>
