---
id: DSA-ADV-STRING-006
title: "Intuição Fundamental de Casamento de Padrões (KMP): Nunca Voltar ao Começo ao Errar uma Letra"
tags:
  - level::l2-fundamental
  - topic::dsa::string-matching
  - company::google
  - freq::medium
---

## Pergunta
Qual é o princípio fundamental do algoritmo KMP (Knuth-Morris-Pratt) para buscar uma palavra em um texto sem nunca retroceder o cursor no texto principal?

## Resposta
### Quick Answer
**Solução Direta**:
- O algoritmo **KMP** pré-computa uma **tabela de prefixos/sufixos (tabela LPS)** do padrão buscado. Quando ocorre uma divergência (mismatch) entre caracteres, o cursor do texto principal **continua sempre avançando para a frente**, enquanto apenas o cursor do padrão salta para o maior prefixo já conhecido.
- Reduz o tempo de busca no texto de pior caso $O(N \times M)$ (força bruta) para tempo puramente linear de **$O(N + M)$**.

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">KMP: Aproveita Letras Iguais Já Lidas e Salta sem Retrocesso</text>

  <!-- Texto Principal -->
  <g transform="translate(60, 45)">
    <text x="-10" y="20" fill="#94a3b8" font-size="11" font-family="sans-serif">Texto:</text>
    <!-- A B A B C -->
    <rect x="50" y="5" width="40" height="26" fill="#1e293b" stroke="#3b82f6" rx="2" />
    <text x="70" y="22" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">A</text>

    <rect x="95" y="5" width="40" height="26" fill="#1e293b" stroke="#3b82f6" rx="2" />
    <text x="115" y="22" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">B</text>

    <rect x="140" y="5" width="40" height="26" fill="#1e293b" stroke="#3b82f6" rx="2" />
    <text x="160" y="22" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">A</text>

    <rect x="185" y="5" width="40" height="26" fill="#1e293b" stroke="#3b82f6" rx="2" />
    <text x="205" y="22" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">B</text>

    <rect x="230" y="5" width="40" height="26" fill="#991b1b" stroke="#ef4444" stroke-width="2" rx="2" />
    <text x="250" y="22" fill="#fca5a5" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">X</text>
  </g>

  <!-- Padrão Sendo Comparado -->
  <g transform="translate(60, 90)">
    <text x="-10" y="20" fill="#94a3b8" font-size="11" font-family="sans-serif">Padrão:</text>
    <rect x="50" y="5" width="40" height="26" fill="#065f46" stroke="#10b981" rx="2" />
    <text x="70" y="22" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">A</text>

    <rect x="95" y="5" width="40" height="26" fill="#065f46" stroke="#10b981" rx="2" />
    <text x="115" y="22" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">B</text>

    <rect x="140" y="5" width="40" height="26" fill="#065f46" stroke="#10b981" rx="2" />
    <text x="160" y="22" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">A</text>

    <rect x="185" y="5" width="40" height="26" fill="#065f46" stroke="#10b981" rx="2" />
    <text x="205" y="22" fill="#ffffff" font-size="12" font-family="monospace" text-anchor="middle">B</text>

    <rect x="230" y="5" width="40" height="26" fill="#991b1b" stroke="#ef4444" stroke-width="2" rx="2" />
    <text x="250" y="22" fill="#fca5a5" font-size="12" font-family="monospace" font-weight="bold" text-anchor="middle">C</text>
  </g>

  <!-- Seta de Salto Inteligente -->
  <path d="M 240 120 Q 150 160 110 120" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="3,3" />
  <polygon points="105,120 115,115 115,125" fill="#10b981" />
  <text x="350" y="105" fill="#a7f3d0" font-size="10" font-family="sans-serif">Erro no 'C' vs 'X'!</text>
  <text x="350" y="125" fill="#34d399" font-size="10" font-family="sans-serif">KMP sabe que "AB" já casou ➔ Pula direto sem reler do zero!</text>
</svg>

| Algoritmo | Complexidade de Tempo | Abordagem |
|---|---|---|
| **Busca Ingênua (Naive)** | $O(N \times M)$ | Ao errar letra, volta o texto para o início |
| **KMP** | $O(N + M)$ Linear | Usa tabela LPS e nunca retrocede o texto |
| **Rabin-Karp** | $O(N + M)$ Médio | Usa Rolling Hash para blocos de texto |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia da Leitura em Voz Alta
Imagine ler um livro procurando a palavra *"ABACATE"*:
- Se você lê *"A-B-A-C-A"* e a próxima letra do livro é *"R"* (*"ABACAR"*), a força bruta voltaria para o primeiro "B" e recomeçaria.
- Você, como ser humano inteligente, percebe que as letras *"A"* finais já servem como início da próxima tentativa. O KMP ensina o computador a ter essa mesma intuição humana.

#### A Tabela LPS (*Longest Prefix Suffix*)
A tabela pré-calcula para cada posição do padrão: *"qual é o maior prefixo que também é sufixo?"*. É essa informação que dita o salto exato do ponteiro.

#### Key Takeaways
- Fundamental em ferramentas como `grep`, motores de busca textual e alinhamento de sequências biológicas de DNA.

</details>
