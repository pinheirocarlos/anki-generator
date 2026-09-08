---
id: DSA-PATT-SPATH-003
title: "Por que o Algoritmo de Dijkstra Falha na Presença de Arestas de Peso Negativo"
tags:
  - level::l3-junior
  - topic::dsa::shortest-path-algorithms
  - company::meta
  - freq::high
---

## Pergunta
Por que a estratégia gulosa de Dijkstra falha em encontrar o caminho correto quando o grafo possui **arestas de peso negativo**?

## Resposta
### Quick Answer
**Solução Direta**:
- A premissa matemática gulosa de Dijkstra é que, ao extrair um nó $u$ do Min-Heap, **sua menor distância final já foi irrevogavelmente determinada**, pois qualquer caminho alternativo futuro somaria pesos positivos e seria estritamente mais longo.
- **A Falha com Pesos Negativos**: Uma aresta de peso negativo subsequente (ex: $-10$) pode reduzir a distância de um nó após ele já ter sido marcado como finalizado, violando a invariante de Dijkstra e produzindo distâncias incorretas (ou loop infinito em ciclos negativos).
- Para grafos com pesos negativos, deve-se utilizar o **Algoritmo de Bellman-Ford** ($O(V \cdot E)$).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="24" fill="#f87171" font-size="13" font-weight="bold" text-anchor="middle">Por que Dijkstra Falha com Arestas Negativas: Decisão Gulosa Irreversível</text>

  <!-- Grafo Contraexemplo -->
  <g transform="translate(60, 45)">
    <!-- Origem S -->
    <circle cx="40" cy="50" r="18" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="40" y="54" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">S</text>

    <!-- Aresta S -> A (peso 3) -->
    <line x1="56" y1="40" x2="164" y2="15" stroke="#10b981" stroke-width="2.5"/>
    <polygon points="164,15 153,13 157,21" fill="#10b981"/>
    <text x="100" y="22" fill="#34d399" font-size="11" font-weight="bold">w = 3</text>

    <!-- Aresta S -> B (peso 5) -->
    <line x1="56" y1="60" x2="164" y2="85" stroke="#64748b" stroke-width="1.5"/>
    <polygon points="164,85 157,79 153,87" fill="#64748b"/>
    <text x="100" y="85" fill="#94a3b8" font-size="11" font-weight="bold">w = 5</text>

    <!-- Nó A -->
    <circle cx="180" cy="15" r="18" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="180" y="19" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">A</text>
    <text x="180" y="-3" fill="#f59e0b" font-size="9" font-weight="bold" text-anchor="middle">Finalizado (3)</text>

    <!-- Nó B -->
    <circle cx="180" cy="85" r="18" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
    <text x="180" y="89" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">B</text>

    <!-- Aresta Negativa B -> A (peso -4) -->
    <line x1="180" y1="67" x2="180" y2="35" stroke="#ef4444" stroke-width="2.5"/>
    <polygon points="180,35 176,45 184,45" fill="#ef4444"/>
    <text x="195" y="55" fill="#f87171" font-size="11" font-weight="bold">w = -4</text>
  </g>

  <!-- Caixa de Diagnóstico -->
  <g transform="translate(320, 45)">
    <rect x="0" y="0" width="320" height="100" fill="#1e293b" stroke="#ef4444" stroke-width="1.5" rx="6"/>
    <text x="160" y="20" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">O Erro do Dijkstra</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">1. Min-Heap desempilha A com dist=3 (pois 3 &lt; 5).</text>
    <text x="15" y="60" fill="#f8fafc" font-size="10">2. Marca A como visitado permanentemente (guloso).</text>
    <text x="15" y="78" fill="#34d399" font-size="10">3. Caminho real S ➔ B ➔ A custa 5 + (-4) = 1 &lt; 3!</text>
    <text x="15" y="93" fill="#fbbf24" font-size="9">Dijkstra ignora e retorna 3 em vez de 1.</text>
  </g>

  <text x="340" y="175" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Conclusão: Em presença de pesos negativos, deve-se usar Bellman-Ford O(V·E)</text>
</svg>
<p>Visualização: Falha do Dijkstra com aresta negativa: a finalização gulosa e irreversível do nó A impede a posterior rota mais barata via B.</p>

| Algoritmo | Suporte a Pesos Negativos | Complexidade de Tempo |
|---|---|---|
| **Dijkstra** | Não (produz resultado errado) | $O((V + E) \log V)$ |
| **Bellman-Ford** | Sim (suporta e detecta ciclos) | $O(V \cdot E)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas FAANG, sempre verifique se os pesos das arestas podem ser negativos antes de escolher Dijkstra.

</details>
