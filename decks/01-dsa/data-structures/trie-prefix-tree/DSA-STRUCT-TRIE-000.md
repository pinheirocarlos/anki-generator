---
id: DSA-STRUCT-TRIE-000
title: "Estrutura de uma Trie (Árvore de Prefixos) e Compartilhamento de Prefixos"
tags:
  - level::l3-junior
  - topic::dsa::trie-prefix-tree
  - company::google
  - freq::high
---

## Pergunta
O que é uma **Trie (Árvore de Prefixos)** e como ela compartilha prefixos comuns entre palavras armazenadas?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Trie** é uma árvore $k$-ária onde cada nó representa um caractere e as arestas conectam caracteres sequenciais de uma palavra.
- Palavras que compartilham o mesmo prefixo (ex: `"car" e "card"`) compartilham exatamente os mesmos nós iniciais (`c -> a -> r`).
- Um flag booleano `isEndOfWord` no nó marca quando aquele caminho forma uma palavra completa válida, economizando espaço ao evitar duplicação de prefixos.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estrutura do Nó de Trie: children[26] e flag isEndOfWord</text>
  <g transform="translate(140, 50)">
    <!-- Root -->
    <circle cx="100" cy="20" r="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="100" y="24" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Root</text>

    <!-- Branch 'c' -->
    <line x1="85" y1="30" x2="40" y2="65" stroke="#10b981" stroke-width="2"/>
    <text x="50" y="45" fill="#10b981" font-size="10" font-weight="bold">'c'</text>
    <circle cx="35" cy="75" r="14" fill="#1e293b" stroke="#10b981"/><text x="35" y="79" fill="#fff" font-size="10" text-anchor="middle">c</text>

    <!-- Branch 'a' -->
    <line x1="35" y1="90" x2="35" y2="120" stroke="#10b981" stroke-width="2"/>
    <text x="45" y="108" fill="#10b981" font-size="10" font-weight="bold">'a'</text>
    <circle cx="35" cy="130" r="14" fill="#1e293b" stroke="#10b981"/><text x="35" y="134" fill="#fff" font-size="10" text-anchor="middle">a</text>

    <!-- Branch 't' -->
    <line x1="35" y1="145" x2="35" y2="175" stroke="#10b981" stroke-width="2"/>
    <text x="45" y="163" fill="#10b981" font-size="10" font-weight="bold">'t'</text>
    <circle cx="35" cy="185" r="14" fill="#047857" stroke="#34d399" stroke-width="2"/>
    <text x="35" y="189" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">t*</text>
  </g>
  <g transform="translate(360, 60)">
    <rect x="0" y="0" width="240" height="70" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Nó Folha t*:</text>
    <text x="20" y="42" fill="#f8fafc" font-size="10">isEndOfWord = true</text>
    <text x="20" y="58" fill="#94a3b8" font-size="10">Palavra completa: "cat"</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" text-anchor="middle">Busca e inserção em O(L), onde L é o comprimento da palavra, independente de N</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estrutura do Nó de Trie: children[26] e flag isEndOfWord</text>
  <g transform="translate(140, 50)">
    <!-- Root -->
    <circle cx="100" cy="20" r="16" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="100" y="24" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Root</text>

    <!-- Branch 'c' -->
    <line x1="85" y1="30" x2="40" y2="65" stroke="#10b981" stroke-width="2"/>
    <text x="50" y="45" fill="#10b981" font-size="10" font-weight="bold">'c'</text>
    <circle cx="35" cy="75" r="14" fill="#1e293b" stroke="#10b981"/><text x="35" y="79" fill="#fff" font-size="10" text-anchor="middle">c</text>

    <!-- Branch 'a' -->
    <line x1="35" y1="90" x2="35" y2="120" stroke="#10b981" stroke-width="2"/>
    <text x="45" y="108" fill="#10b981" font-size="10" font-weight="bold">'a'</text>
    <circle cx="35" cy="130" r="14" fill="#1e293b" stroke="#10b981"/><text x="35" y="134" fill="#fff" font-size="10" text-anchor="middle">a</text>

    <!-- Branch 't' -->
    <line x1="35" y1="145" x2="35" y2="175" stroke="#10b981" stroke-width="2"/>
    <text x="45" y="163" fill="#10b981" font-size="10" font-weight="bold">'t'</text>
    <circle cx="35" cy="185" r="14" fill="#047857" stroke="#34d399" stroke-width="2"/>
    <text x="35" y="189" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">t*</text>
  </g>
  <g transform="translate(360, 60)">
    <rect x="0" y="0" width="240" height="70" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="120" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Nó Folha t*:</text>
    <text x="20" y="42" fill="#f8fafc" font-size="10">isEndOfWord = true</text>
    <text x="20" y="58" fill="#94a3b8" font-size="10">Palavra completa: "cat"</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" text-anchor="middle">Busca e inserção em O(L), onde L é o comprimento da palavra, independente de N</text>

</svg>

| Estrutura de Busca | Custo de Busca por Palavra de Tam $L$ | Busca por Prefixo |
|---|---|---|
| **Hash Map** | $O(L)$ cálculo do hash | $O(N \times L)$ Varredura total |
| **Trie** | $O(L)$ Caractere a caractere | $O(P)$ onde $P$ é tam do prefixo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Diagrama de Nós Compartilhados
```text
         (root)
           |
           'c'
           |
           'a'
           |
           'r' (isEnd: true -> "car")
           |
           'd' (isEnd: true -> "card")
```

#### Key Takeaways
- Em uma Trie, a complexidade de busca é totalmente independente do número total de palavras $N$ cadastradas; ela depende unicamente do comprimento $L$ da palavra consultada.

</details>
