---
id: DSA-STRUCT-LIST-005
title: "Mecânica Probabilística de Skip Lists para Busca em Tempo O(log N)"
tags:
  - level::l4-pleno
  - topic::dsa::linked-lists
  - company::redis
  - freq::high
---

## Pergunta
Como as **Skip Lists** alcançam busca, inserção e remoção em tempo $O(\log N)$ usando ponteiros multinível e aleatoriedade?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Skip List** sobrepõe múltiplas camadas de listas encadeadas ordenadas com atalhos:
  - A camada 0 (base) contém todos os $N$ elementos ordenados.
  - Cada camada superior $k$ atua como uma "pista expressa", contendo um subconjunto aleatório dos elementos da camada $k-1$ (geralmente com probabilidade $p = 1/2$).
- Durante a busca, caminhamos horizontalmente na camada mais alta até que o próximo valor seja maior que o alvo; em seguida, descemos verticalmente para a camada inferior.
- Essa descida em torre divide o espaço de busca pela metade a cada nível, atingindo $O(\log N)$ esperado.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Skip List e Faixas Expressas Multinível (Busca O(log N))</text>
  <g transform="translate(60, 50)">
    <!-- Level 3 (Express) -->
    <text x="0" y="15" fill="#f59e0b" font-size="10" font-weight="bold">L3 (Express):</text>
    <rect x="100" y="0" width="40" height="20" fill="#b45309" rx="3"/><text x="120" y="14" fill="#fff" font-size="9" text-anchor="middle">1</text>
    <line x1="140" y1="10" x2="380" y2="10" stroke="#f59e0b" stroke-width="2"/>
    <rect x="380" y="0" width="40" height="20" fill="#b45309" rx="3"/><text x="400" y="14" fill="#fff" font-size="9" text-anchor="middle">9</text>

    <!-- Level 2 -->
    <text x="0" y="45" fill="#38bdf8" font-size="10" font-weight="bold">L2 (Interm):</text>
    <rect x="100" y="30" width="40" height="20" fill="#0369a1" rx="3"/><text x="120" y="44" fill="#fff" font-size="9" text-anchor="middle">1</text>
    <line x1="140" y1="40" x2="240" y2="40" stroke="#38bdf8" stroke-width="2"/>
    <rect x="240" y="30" width="40" height="20" fill="#0369a1" rx="3"/><text x="260" y="44" fill="#fff" font-size="9" text-anchor="middle">5</text>
    <line x1="280" y1="40" x2="380" y2="40" stroke="#38bdf8" stroke-width="2"/>
    <rect x="380" y="30" width="40" height="20" fill="#0369a1" rx="3"/><text x="400" y="44" fill="#fff" font-size="9" text-anchor="middle">9</text>

    <!-- Level 1 (Base) -->
    <text x="0" y="75" fill="#10b981" font-size="10" font-weight="bold">L1 (Base):</text>
    <rect x="100" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="120" y="74" fill="#fff" font-size="9" text-anchor="middle">1</text>
    <rect x="170" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="190" y="74" fill="#fff" font-size="9" text-anchor="middle">3</text>
    <rect x="240" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="260" y="74" fill="#fff" font-size="9" text-anchor="middle">5</text>
    <rect x="310" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="330" y="74" fill="#fff" font-size="9" text-anchor="middle">7</text>
    <rect x="380" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="400" y="74" fill="#fff" font-size="9" text-anchor="middle">9</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Saltos exponenciais probabilísticos substituem árvores auto-balanceadas (usado em Redis ZSET)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Skip List e Faixas Expressas Multinível (Busca O(log N))</text>
  <g transform="translate(60, 50)">
    <!-- Level 3 (Express) -->
    <text x="0" y="15" fill="#f59e0b" font-size="10" font-weight="bold">L3 (Express):</text>
    <rect x="100" y="0" width="40" height="20" fill="#b45309" rx="3"/><text x="120" y="14" fill="#fff" font-size="9" text-anchor="middle">1</text>
    <line x1="140" y1="10" x2="380" y2="10" stroke="#f59e0b" stroke-width="2"/>
    <rect x="380" y="0" width="40" height="20" fill="#b45309" rx="3"/><text x="400" y="14" fill="#fff" font-size="9" text-anchor="middle">9</text>

    <!-- Level 2 -->
    <text x="0" y="45" fill="#38bdf8" font-size="10" font-weight="bold">L2 (Interm):</text>
    <rect x="100" y="30" width="40" height="20" fill="#0369a1" rx="3"/><text x="120" y="44" fill="#fff" font-size="9" text-anchor="middle">1</text>
    <line x1="140" y1="40" x2="240" y2="40" stroke="#38bdf8" stroke-width="2"/>
    <rect x="240" y="30" width="40" height="20" fill="#0369a1" rx="3"/><text x="260" y="44" fill="#fff" font-size="9" text-anchor="middle">5</text>
    <line x1="280" y1="40" x2="380" y2="40" stroke="#38bdf8" stroke-width="2"/>
    <rect x="380" y="30" width="40" height="20" fill="#0369a1" rx="3"/><text x="400" y="44" fill="#fff" font-size="9" text-anchor="middle">9</text>

    <!-- Level 1 (Base) -->
    <text x="0" y="75" fill="#10b981" font-size="10" font-weight="bold">L1 (Base):</text>
    <rect x="100" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="120" y="74" fill="#fff" font-size="9" text-anchor="middle">1</text>
    <rect x="170" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="190" y="74" fill="#fff" font-size="9" text-anchor="middle">3</text>
    <rect x="240" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="260" y="74" fill="#fff" font-size="9" text-anchor="middle">5</text>
    <rect x="310" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="330" y="74" fill="#fff" font-size="9" text-anchor="middle">7</text>
    <rect x="380" y="60" width="40" height="20" fill="#047857" rx="3"/><text x="400" y="74" fill="#fff" font-size="9" text-anchor="middle">9</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Saltos exponenciais probabilísticos substituem árvores auto-balanceadas (usado em Redis ZSET)</text>

</svg>

| Estrutura de Busca | Custo de Busca | Complexidade de Implementação |
|---|---|---|
| **Árvore Red-Black** | $O(\log N)$ Pior caso | Alta (Rotações e recolorações) |
| **Skip List** | $O(\log N)$ Esperado | Média (Ponteiros + `coinFlip`) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Modelo de Torres da Skip List
```text
Level 3:  [Head] -------------------------> [30] -----------------> nil
Level 2:  [Head] -------------> [15] ------> [30] ------> [50] ----> nil
Level 1:  [Head] -----> [8] --> [15] ------> [30] ------> [50] ----> nil
Level 0:  [Head] -> [3]->[8]->[12]->[15]->[20]->[30]->[42]->[50]-> nil
```

#### Key Takeaways
- Skip Lists são utilizadas no **Redis (Sorted Sets / ZSET)** e em bancos de dados LSM-Tree (como LevelDB/RocksDB) porque são significativamente mais fáceis de sincronizar em ambientes concorrentes (*Lock-Free Skip Lists*) do que árvores balanceadas.

</details>
