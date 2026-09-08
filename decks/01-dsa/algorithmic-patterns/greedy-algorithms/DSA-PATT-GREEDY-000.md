---
id: DSA-PATT-GREEDY-000
title: "Propriedade da Escolha Gulosa (Greedy-Choice Property) vs Programação Dinâmica"
tags:
  - level::l3-junior
  - topic::dsa::greedy-algorithms
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença conceitual e de garantias entre a **Escolha Gulosa (Greedy)** e a **Programação Dinâmica (DP)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Algoritmo Guloso (Greedy)**: Toma a melhor decisão local no momento atual **sem jamais voltar atrás (*no backtracking*)**, assumindo que escolhas locais ótimas levarão à solução global ótima. Roda em $O(N)$ ou $O(N \log N)$.
- **Programação Dinâmica (DP)**: Avalia **todas as escolhas locais possíveis** através de subproblemas sobrepostos, tomando a decisão ótima após ponderar o impacto futuro.
- **Quando usar Greedy**: Somente quando for possível provar matematicamente a **Propriedade da Escolha Gulosa** e a **Subestrutura Ótima**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Propriedade da Escolha Gulosa: Decisão Local Ótima sem Backtracking</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="260" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="130" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Abordagem Gulosa (Greedy)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Escolhe o melhor passo imediato.</text>
    <text x="15" y="60" fill="#a7f3d0" font-size="10">Nunca reconsidera decisões passadas: O(N log N).</text>

    <g transform="translate(300, 0)">
      <rect x="0" y="0" width="260" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
      <text x="130" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Programação Dinâmica (DP)</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">Avalia todos os subproblemas sobrepostos.</text>
      <text x="15" y="60" fill="#93c5fd" font-size="10">Combina sub-ótimos com memoization / tabela.</text>
    </g>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Exige prova matemática rigorosa de que o ótimo local sempre conduz ao ótimo global</text>
</svg>
<p>Visualização: Algoritmos Gulosos escolhendo a melhor opção local imediatamente sem retrocesso quando provada a subestrutura ótima.</p>
| Paradigma | Decisão e Exploração | Custo Típico |
|---|---|---|
| **Greedy (Guloso)** | Irrevogável / 1 único caminho | $O(N)$ / $O(N log N)$ |
| **DP (Dinâmica)** | Avalia todas as transições | $O(N^2)$ / $O(N cdot W)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Se a escolha gulosa falhar em cobrir o caso ótimo (como na Mochila 0/1 com itens inteiros), deve-se usar Programação Dinâmica.

</details>
