---
id: DSA-STRUCT-TRIE-003
title: "Implementação de Autocomplete e Sugestões de Busca com Trie e DFS"
tags:
  - level::l3-junior
  - topic::dsa::trie-prefix-tree
  - company::twitter
  - freq::high
---

## Pergunta
Como implementar um mecanismo de **Autocomplete** de palavras combinando busca em Trie com travessia DFS?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo de Autocomplete divide-se em duas etapas:
  1. **Localizar o Nó do Prefixo**: Percorre a Trie com o prefixo digitado pelo usuário em $O(P)$ até o nó terminal $N_{\text{prefix}}$.
  2. **Explorar Sugestões via DFS**: A partir de $N_{\text{prefix}}$, executa uma busca em profundidade (DFS) para coletar todas as palavras com flag `isEndOfWord == true` na subárvore abaixo daquele nó.
- **Complexidade**: $O(P + K)$, onde $P$ é o tamanho do prefixo e $K$ é o número total de caracteres explorados na subárvore de sugestões.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compressed Trie (Radix Tree): Compactação de Arestas Unifilhas</text>
  <g transform="translate(80, 50)">
    <!-- Standard Trie -->
    <rect x="0" y="0" width="220" height="75" fill="#1e293b" stroke="#f43f5e" rx="6"/>
    <text x="110" y="20" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Standard Trie (Esparsa)</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">r → o → m → a → n</text>
    <text x="15" y="60" fill="#94a3b8" font-size="10">5 nós alocados na memória</text>

    <!-- Radix Tree -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Radix Tree (Compactada)</text>
      <text x="15" y="42" fill="#34d399" font-size="10">Aresta única: "roman"</text>
      <text x="15" y="60" fill="#f8fafc" font-size="10">1 único nó alocado (IP Routing)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz o consumo de memória em até 70% em tabelas de roteamento CIDR e Linux Kernel</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compressed Trie (Radix Tree): Compactação de Arestas Unifilhas</text>
  <g transform="translate(80, 50)">
    <!-- Standard Trie -->
    <rect x="0" y="0" width="220" height="75" fill="#1e293b" stroke="#f43f5e" rx="6"/>
    <text x="110" y="20" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Standard Trie (Esparsa)</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">r → o → m → a → n</text>
    <text x="15" y="60" fill="#94a3b8" font-size="10">5 nós alocados na memória</text>

    <!-- Radix Tree -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Radix Tree (Compactada)</text>
      <text x="15" y="42" fill="#34d399" font-size="10">Aresta única: "roman"</text>
      <text x="15" y="60" fill="#f8fafc" font-size="10">1 único nó alocado (IP Routing)</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz o consumo de memória em até 70% em tabelas de roteamento CIDR e Linux Kernel</text>

</svg>

| Etapa do Autocomplete | Algoritmo | Complexidade |
|---|---|---|
| **1. Navegação de Prefixo** | Busca padrão em Trie | $O(P)$ |
| **2. Coleta de Palavras** | DFS na subárvore | $O(K)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a espinha dorsal de caixas de sugestão de busca (Google Search / Typeahead) e corretores ortográficos de teclado.

</details>
