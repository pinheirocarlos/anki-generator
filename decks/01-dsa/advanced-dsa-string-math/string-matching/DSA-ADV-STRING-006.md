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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">KMP: Aproveita Letras Iguais Já Lidas e Salta sem Retrocesso</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Metáfora do Gabarito Deslizante</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Ao errar uma letra no final da palavra, você não recomeça a ler o texto do início.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Você desliza o gabarito até o maior prefixo coincidente que você já comprovou que existe.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">O ponteiro do texto avança estritamente para a frente em tempo O(N + M)</text>
</svg>
<p>Visualização: Intuição do KMP: reaproveitar informações de letras já lidas evita recuos desnecessários no texto de entrada.</p>
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
