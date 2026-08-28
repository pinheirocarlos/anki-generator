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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Complexidade Quase-Linear com Função Inversa de Ackermann α(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Combinação: Path Compression + Union by Rank</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Complexidade amortizada de M operações sobre N elementos: O(M · α(N)).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Como α(N) &lt; 5 para qualquer N até o número de átomos no universo observável (10⁸⁰) → O(1) na prática.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Operações Find e Union são indistinguíveis de tempo constante no mundo real</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Complexidade Quase-Linear com Função Inversa de Ackermann α(N)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="260" y="22" fill="#fcd34d" font-size="12" font-weight="bold" text-anchor="middle">Combinação: Path Compression + Union by Rank</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Complexidade amortizada de M operações sobre N elementos: O(M · α(N)).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">Como α(N) &lt; 5 para qualquer N até o número de átomos no universo observável (10⁸⁰) → O(1) na prática.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Operações Find e Union são indistinguíveis de tempo constante no mundo real</text>

</svg>

| Condição em `union(x, y)` | Ação | Conectividade |
|---|---|---|
| `rootX == rootY` | Ignora / Sinaliza ciclo | Já conectados |
| `rootX != rootY` | `parent[rootX] = rootY` | Nova conexão estabelecida |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O retorno booleano de `union` (verdadeiro se conectou, falso se já estavam conectados) é a chave para algoritmos de detecção de ciclos e Kruskal.

</details>
