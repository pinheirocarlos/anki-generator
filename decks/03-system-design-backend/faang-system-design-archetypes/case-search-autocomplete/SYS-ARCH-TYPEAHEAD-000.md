---
id: SYS-ARCH-TYPEAHEAD-000
title: "Autocompletar de Busca (Google Typeahead): Estrutura Trie em Memória e Cache Top-K"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Como uma Árvore de Prefixos (Trie) em memória combinada com pré-computação Top-K responde a sugestões de autocompletar em menos de 10 ms?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema da Busca Ingênua**: Percorrer toda a subárvore a cada tecla digitada pelo usuário e ordenar todos os termos filhos por frequência de busca tem complexidade $O(\text{subárvore} \log N)$, inviável para 100k QPS.
- **Trie Otimizada com Top-K em Cada Nó**:
  - Cada nó da Trie armazena uma lista fixa dos **Top-5 ou Top-10 termos mais populares** que compartilham aquele prefixo.
  - Ao digitar o prefixo (ex: `"sys"`), o servidor navega até o nó do prefixo em tempo **$O(L)$** (onde $L = \text{comprimento da string} \le 20$) e retorna o Top-5 **instantaneamente em $O(1)$** sem precisar varrer os nós filhos.

### Dual Coding Visual
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Search Autocomplete (Google Typeahead): Trie em Memória com Top-K Cache</text>
  <g transform="translate(40, 50)">
    <!-- Root -->
    <circle cx="100" cy="20" r="14" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="100" y="24" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">ROOT</text>

    <!-- Node 's' -->
    <line x1="100" y1="34" x2="60" y2="70" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="60" cy="70" r="12" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="60" y="74" fill="#ffffff" font-size="9" text-anchor="middle">'s'</text>

    <!-- Node 'sy' -->
    <line x1="60" y1="82" x2="60" y2="115" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="60" cy="115" r="12" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="60" y="119" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">'y'</text>

    <!-- Top-K Cache Box in Node 'sy' -->
    <rect x="180" y="40" width="420" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="390" y="62" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Top-5 Sugestões Pré-computadas no Nó 'sy'</text>
    <text x="390" y="84" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">1. "system design" (Freq: 50.000.000)</text>
    <text x="390" y="102" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">2. "system design interview" (Freq: 28.000.000)</text>
    <text x="390" y="120" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">3. "synchronization" (Freq: 15.000.000)</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Retorno em tempo O(p) onde p é o tamanho do prefixo digitado (ex: 2 caracteres), independente do tamanho do dicionário.</text>

</svg>

| Estrutura de Autocomplete | Tempo de Resposta | Complexidade Algorítmica |
|---|---|---|
| **Trie sem Cache Top-K** | Lento (~50-100 ms sob alta carga) | $O(\text{tamanho da subárvore} + K \log K)$ |
| **Trie com Top-K nos Nós** | **Ultra-rápido (< 5 ms em RAM)** | **$O(L)$ onde $L \le 20$ (Tempo constante na prática)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Visual do Nó
- Nó do caractere `'s'` $\rightarrow$ Nó `'y'` $\rightarrow$ Nó `'s'`:
  - `top_5`: `["system design", "system of a down", "system32", "sysadmin", "systemctl"]`

</details>
