---
id: DSA-STRUCT-TRIE-001
title: "Radix Tree (Compressed Trie) e Compressão de Cadeias Unárias"
tags:
  - level::l4-pleno
  - topic::dsa::trie-prefix-tree
  - company::amazon
  - freq::high
---

## Pergunta
Como a **Radix Tree (Compressed / Compact Trie / Patricia Tree)** reduz o consumo de memória ao comprimir cadeias de caracteres unários?

## Resposta
### Quick Answer
**Solução Direta**:
- Em uma Trie tradicional, nós intermediários que possuem **exatamente 1 único filho** e não marcam fim de palavra geram overhead excessivo de alocação de nós.
- A **Radix Tree** compacta essas cadeias consecutivas de nós unários em uma **única aresta contendo uma string**:
  - Exemplo: A cadeia de nós `r -> o -> o -> t` é comprimida em uma única aresta rotulada como `"root"`.
- Isso reduz drasticamente o número total de nós alocados e economiza memória de ponteiros em até 70%.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Busca de Prefixo (startsWith) vs Busca de Palavra Completa (search)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="230" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="115" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">startsWith("ca")</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Percorre 'c' → 'a'</text>
    <text x="15" y="60" fill="#34d399" font-size="10">Retorna true se o nó existe</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">search("ca")</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Percorre 'c' → 'a'</text>
      <text x="15" y="60" fill="#f87171" font-size="10">Retorna node.isEndOfWord (false se só "cat")</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Compartilhamento de prefixos reduz drasticamente a redundância na memória</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Busca de Prefixo (startsWith) vs Busca de Palavra Completa (search)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="230" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="115" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">startsWith("ca")</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Percorre 'c' → 'a'</text>
    <text x="15" y="60" fill="#34d399" font-size="10">Retorna true se o nó existe</text>

    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="240" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">search("ca")</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Percorre 'c' → 'a'</text>
      <text x="15" y="60" fill="#f87171" font-size="10">Retorna node.isEndOfWord (false se só "cat")</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Compartilhamento de prefixos reduz drasticamente a redundância na memória</text>

</svg>

| Estrutura | Sequência `"inter"` sem bifurcação | Quantidade de Nós |
|---|---|---|
| **Trie Padrão** | `'i' -> 'n' -> 't' -> 'e' -> 'r'` | 5 nós alocados |
| **Radix Tree** | Aresta única `"inter"` | 1 nó alocado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Usos em Engenharia
- A Radix Tree é amplamente utilizada em **Roteadores IP (CIDR lookup)** e em roteadores HTTP de frameworks web modernos (ex: Gin em Go, Express e Fastify).

#### Key Takeaways
- A compactação mantém a velocidade $O(L)$ de busca enquanto elimina a maior desvantagem da Trie: o desperdício de memória por ponteiros esparsos.

</details>
