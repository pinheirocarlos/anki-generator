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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Autocomplete e Sugestões com DFS na Subárvore de Prefixo</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Algoritmo de Sugestão de Busca:</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Navega até o nó do prefixo digitado (ex: "app") em O(P).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Executa DFS a partir deste nó para coletar todas as palavras filhas ("apple", "apply", "app").</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Base de motores typeahead de buscas e corretores ortográficos</text>

</svg>
<p>Visualização: Algoritmo de autocomplete navegando até o nó do prefixo em O(P) e explorando palavras filhas via DFS.</p>

| Etapa do Autocomplete | Algoritmo | Complexidade |
|---|---|---|
| **1. Navegação de Prefixo** | Busca padrão em Trie | $O(P)$ |
| **2. Coleta de Palavras** | DFS na subárvore | $O(K)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É a espinha dorsal de caixas de sugestão de busca (Google Search / Typeahead) e corretores ortográficos de teclado.

</details>
