---
id: DSA-STRUCT-TRIE-005
title: "Trade-offs de Memória: Array de Ponteiros vs Hash Map nos Nós da Trie"
tags:
  - level::l4-pleno
  - topic::dsa::trie-prefix-tree
  - company::google
  - freq::high
---

## Pergunta
Quais os trade-offs de velocidade e consumo de memória entre usar um **Array Fixo de Ponteiros** (`Node[26]`) versus um **Hash Map** nos nós de uma Trie?

## Resposta
### Quick Answer
**Solução Direta**:
- **Array Fixo (`Node[26]`)**:
  - Acesso $O(1)$ instantâneo por aritmética de índice (`c - 'a'`).
  - Desperdício massivo de memória se o alfabeto for grande (ex: Unicode/UTF-8) ou se a Trie for esparsa (a maioria dos 26 ponteiros fica `null`).
- **Hash Map (`Map<Character, Node>`)**:
  - Aloca ponteiros estritamente sob demanda para os caracteres existentes $\to$ **Excelente eficiência de memória**.
  - Pequeno overhead adicional de hashing e indireção de objetos.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Aho-Corasick Automaton: Busca de Múltiplos Padrões em O(N + M)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Trie + Failure Links (Suffix Automaton)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao falhar o casamento de caractere, o autômato salta pelo link de falha (maior sufixo que é prefixo).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Localiza simultaneamente K palavras-chave em um texto em uma única passada O(N).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Utilizado em filtros de spam, antivírus (ClamAV) e bioinformática (DNA search)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Aho-Corasick Automaton: Busca de Múltiplos Padrões em O(N + M)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Trie + Failure Links (Suffix Automaton)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao falhar o casamento de caractere, o autômato salta pelo link de falha (maior sufixo que é prefixo).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Localiza simultaneamente K palavras-chave em um texto em uma única passada O(N).</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Utilizado em filtros de spam, antivírus (ClamAV) e bioinformática (DNA search)</text>

</svg>

| Estratégia de Nós | Acesso por Caractere | Consumo de Memória |
|---|---|---|
| **Array Fixo `Node[26]`** | $O(1)$ Ultra-rápido | Alto (26 ponteiros por nó) |
| **`Map<Character, Node>`** | $O(1)$ Médio (hash) | Mínimo (apenas caracteres reais) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Para alfabetos restritos (`a-z`), arrays fixos são preferíveis por velocidade; para caracteres gerais ou Unicode, o uso de Hash Maps ou Radix Trees é obrigatório.

</details>
