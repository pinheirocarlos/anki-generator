---
id: DSA-PATT-MST-000
title: "Conceito de Árvore Geradora Mínima (MST) e a Propriedade do Corte (Cut Property)"
tags:
  - level::l3-junior
  - topic::dsa::minimum-spanning-tree
  - company::meta
  - freq::high
---

## Pergunta
O que é uma **Árvore Geradora Mínima (MST)** e qual a intuição da **Propriedade do Corte (Cut Property)**?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **MST** é um subconjunto de $V - 1$ arestas de um grafo conexo e não-direcionado que conecta todos os $V$ vértices com o **menor custo total de pesos possível**, sem formar ciclos.
- **Propriedade do Corte (Cut Property)**: Se dividirmos os vértices do grafo em dois conjuntos disjuntos $S$ e $V \setminus S$ (um corte), a **aresta de menor peso que atravessa esse corte pertence garantidamente à Árvore Geradora Mínima**.
- Essa propriedade matemática é o fundamento da corretude dos algoritmos gulosos de Kruskal e Prim.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Árvore Geradora Mínima (MST) e a Propriedade do Corte (Cut Property)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Propriedade do Corte: A aresta de menor peso cruzando qualquer corte PERTENCE à MST</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Uma MST conecta todos os V vértices com exatamente V - 1 arestas sem ciclos.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Minimiza o somatório total dos pesos das arestas selecionadas.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Fundamento teórico que garante a corretude dos algoritmos gulosos de Kruskal e Prim</text>

</svg>

| Propriedade de MST | Requisito Estrutural | Quantidade de Arestas |
|---|---|---|
| **Conexão Total** | Todos os $V$ nós conectados | Exatamente $V - 1$ arestas |
| **Sem Ciclos** | É uma árvore matemática | 0 ciclos |
| **Custo Mínimo** | $\sum w(e)$ minimizado globalmente | Baseado na Cut Property |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Uma MST conecta todos os vértices gastando o mínimo possível, mas **não garante** o menor caminho entre dois nós individuais (esse é o papel de Dijkstra).

</details>
