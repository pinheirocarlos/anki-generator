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

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Unicidade da MST: Teorema dos Pesos Distintos e Propriedade do Corte</text>

  <!-- Partição de Corte (S e V \ S) -->
  <g transform="translate(60, 45)">
    <!-- Subconjunto S -->
    <rect x="0" y="0" width="100" height="100" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6"/>
    <text x="50" y="20" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Conjunto S</text>
    <circle cx="50" cy="55" r="14" fill="#0f172a" stroke="#3b82f6" stroke-width="2"/>
    <text x="50" y="59" fill="#fff" font-size="10" text-anchor="middle">u</text>

    <!-- Linha do Corte -->
    <line x1="130" y1="0" x2="130" y2="105" stroke="#ef4444" stroke-width="2" stroke-dasharray="4,3"/>
    <text x="130" y="-5" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Corte (S, V\S)</text>

    <!-- Subconjunto V \ S -->
    <rect x="160" y="0" width="100" height="100" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="210" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Conjunto V \ S</text>
    <circle cx="210" cy="40" r="14" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
    <text x="210" y="44" fill="#fff" font-size="10" text-anchor="middle">v₁</text>
    <circle cx="210" cy="75" r="14" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
    <text x="210" y="79" fill="#fff" font-size="10" text-anchor="middle">v₂</text>

    <!-- Arestas atravessando o corte -->
    <line x1="64" y1="55" x2="196" y2="40" stroke="#10b981" stroke-width="2.5"/>
    <text x="130" y="38" fill="#34d399" font-size="10" font-weight="bold">w=2 (Único Min)</text>

    <line x1="64" y1="55" x2="196" y2="75" stroke="#64748b" stroke-width="1.5"/>
    <text x="130" y="75" fill="#94a3b8" font-size="10">w=5</text>
  </g>

  <!-- Prova Matemática -->
  <g transform="translate(360, 45)">
    <rect x="0" y="0" width="280" height="100" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="140" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Prova por Contradição</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">1. A Propriedade do Corte prova que a aresta mais leve do corte DEVE estar na MST.</text>
    <text x="15" y="65" fill="#f8fafc" font-size="10">2. Se todos os pesos são distintos: w=2 &lt; w=5 (nunca há empate).</text>
    <text x="15" y="88" fill="#fbbf24" font-size="10">3. Logo, cada passo tem escolha unívoca ➔ MST única!</text>
  </g>

  <text x="340" y="175" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Pesos distintos = 1 única MST | Pesos repetidos = podem existir múltiplas MSTs de mesmo custo</text>
</svg>
<p>Visualização: Propriedade do corte com pesos distintos: a aresta de menor peso que atravessa o corte é única e obrigatória em qualquer MST.</p>

| Pesos das Arestas no Grafo | Quantidade de MSTs Possíveis |
|---|---|
| **Todos os pesos distintos** | Garantidamente **1 única MST** |
| **Arestas com pesos repetidos** | Podem existir múltiplas MSTs de mesmo custo total |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É um teorema clássico de teoria dos grafos cobrado frequentemente em perguntas conceituais de entrevistas sênior.

</details>
