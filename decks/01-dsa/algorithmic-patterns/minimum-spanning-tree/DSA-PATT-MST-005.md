---
id: DSA-PATT-MST-005
title: "Unicidade da Árvore Geradora Mínima quando os Pesos são Distintos"
tags:
  - level::l4-pleno
  - topic::dsa::minimum-spanning-tree
  - company::google
  - freq::high
---

## Pergunta
Por que a unicidade estrita dos pesos de todas as arestas em um grafo garante que a **MST seja matematicamente única**?

## Resposta
### Quick Answer
**Solução Direta**:
- Pela **Propriedade do Corte**, em qualquer corte que divide o grafo em dois grupos, a aresta de menor peso que atravessa o corte deve obrigatoriamente pertencer a qualquer MST.
- Se todos os pesos das arestas forem distintos:
  - Em cada corte, existe uma **única aresta de peso estritamente mínimo** que o atravessa.
  - Não há empates e, portanto, não há escolhas arbitrárias entre arestas equivalentes.
  - Kruskal e Prim farão exatamente as mesmas escolhas unívocas, resultando em uma **MST única**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Segunda Melhor MST (Second Best MST) em Tempo O(E log V)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Troca de 1 Aresta da MST Original</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Constrói a MST primária.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">2. Para cada aresta não utilizada (u, v): adiciona ao ciclo e remove a aresta mais pesada do caminho u-v.</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Identifica o menor incremento de peso: weight(MST) + w(u, v) - max_edge(u, v) em O(E log V)</text>

</svg>

| Pesos das Arestas no Grafo | Quantidade de MSTs Possíveis |
|---|---|
| **Todos os pesos distintos** | Garantidamente **1 única MST** |
| **Arestas com pesos repetidos** | Podem existir múltiplas MSTs de mesmo custo total |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É um teorema clássico de teoria dos grafos cobrado frequentemente em perguntas conceituais de entrevistas sênior.

</details>
