---
id: DSA-ADV-STRING-001
title: "Autômato de Aho-Corasick para Busca Simultânea de Dicionários em O(N + sum(M))"
tags:
  - level::l4-pleno
  - topic::dsa::advanced-dsa-string-math
  - company::google
  - freq::high
---

## Pergunta
Como o **Autômato de Aho-Corasick** combina uma Trie com links de falha (*failure links*) para buscar milhares de palavras simultaneamente em tempo linear?

## Resposta
### Quick Answer
**Solução Direta**:
- Em vez de rodar KMP $K$ vezes para $K$ palavras diferentes ($O(K \cdot N)$), Aho-Corasick constrói uma máquina de estados finitos:
  1. Constrói uma **Trie** contendo todas as palavras do dicionário.
  2. Computa **Links de Falha (Suffix Links)** via BFS em camadas (similar à tabela $\pi$ do KMP estendida para árvores).
  3. Varre o texto $T$ em uma única passagem: a cada caractere, transita pelos estados da Trie e salta pelos links de falha em caso de mismatch.
- **Complexidade**: $O(|T| + \sum |P_i|)$ tempo linear absoluto, independentemente do número de palavras no dicionário.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Rabin-Karp: Rolling Hash Polinomial com Módulo Primo</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Atualização de Hash da Janela em Tempo O(1)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">hash_next = ((hash_prev - text[i] · B^(M-1)) · B + text[i+M]) % MOD.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Compara a string apenas se o hash coincidir: Tempo Médio O(N + M).</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Ideal para detecção de plágio e busca de múltiplos padrões com mesmo tamanho</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Rabin-Karp: Rolling Hash Polinomial com Módulo Primo</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Atualização de Hash da Janela em Tempo O(1)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">hash_next = ((hash_prev - text[i] · B^(M-1)) · B + text[i+M]) % MOD.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Compara a string apenas se o hash coincidir: Tempo Médio O(N + M).</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Ideal para detecção de plágio e busca de múltiplos padrões com mesmo tamanho</text>

</svg>

| Abordagem Multi-Padrão | Custo com $K$ Palavras | Escalabilidade |
|---|---|---|
| **$K \times$ KMP** | $O(K \cdot N)$ | Degrada com dicionários grandes |
| **Aho-Corasick Automaton** | $O(N + \text{TamanhoTotal})$ | Escala para milhões de palavras |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Aplicações Industriais
- É o algoritmo utilizado pelo utilitário `fgrep`, filtros de moderação de conteúdo e sistemas de detecção de intrusão (Snort).

#### Key Takeaways
- Aho-Corasick é a generalização do KMP para conjuntos de strings organizados em Trie.

</details>
