---
id: DSA-PATT-TOPO-001
title: "Algoritmo de Kahn (BFS Baseado em In-Degree) para Ordenação Topológica em O(V+E)"
tags:
  - level::l4-pleno
  - topic::dsa::topological-sort
  - company::google
  - freq::high
---

## Pergunta
Como o **Algoritmo de Kahn (BFS In-Degree)** calcula a ordenação topológica e detecta ciclos em tempo $O(V + E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- 1. Calcula o **Grau de Entrada (`in-degree`)** de cada vértice (número de arestas que chegam nele).
- 2. Enfileira todos os vértices com `in-degree == 0` (tarefas sem nenhum pré-requisito pendente).
- 3. Enquanto a fila não estiver vazia:
  - Desenfileira $u$, adiciona $u$ à ordem topológica.
  - Para cada vizinho $v$ de $u$: decrementa `in-degree[v]--`. Se `in-degree[v] == 0`, enfileira $v$.
- **Detecção de Ciclo**: Se o número de elementos processados for menor que $|V|$, **existe ciclo** no grafo.
- **Complexidade**: $O(V + E)$ tempo e $O(V + E)$ espaço.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Kahn's Algorithm: Graus de Entrada (in_degree == 0) e Fila BFS</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Processamento por Eliminação de Pré-requisitos</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Enfileira todos os nós com in_degree == 0 (zero dependências pendentes).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">2. Ao desenfileirar u: adiciona à ordem e decrementa in_degree[v]--; se zerar, enfileira v.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Se a ordem final contiver menos de V vértices → O GRAFO CONTÉM UM CICLO!</text>

</svg>

<p>Visualização: Algoritmo de Kahn decrementando graus de entrada e enfileirando nós com in-degree 0 para produzir a ordem topológica.</p>

| Grau de Entrada (`in-degree`) | Significado de Negócio | Ação no Algoritmo |
|---|---|---|
| `in-degree == 0` | Pré-requisitos 100% satisfeitos | Enfileira para execução |
| `in-degree > 0` | Aguarda dependências | Bloqueado até zerar |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Algoritmo de Kahn
```java
import java.util.*;

public class KahnTopoSort {
  public int[] findOrder(int numCourses, int[][] prerequisites) {
    int[] inDegree = new int[numCourses];
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());

    for (int[] pre : prerequisites) {
      adj.get(pre[1]).add(pre[0]);
      inDegree[pre[0]]++;
    }

    Queue<Integer> queue = new ArrayDeque<>();
    for (int i = 0; i < numCourses; i++) {
      if (inDegree[i] == 0) queue.offer(i);
    }

    int[] order = new int[numCourses];
    int index = 0;

    while (!queue.isEmpty()) {
      int curr = queue.poll();
      order[index++] = curr;
      for (int neighbor : adj.get(curr)) {
        inDegree[neighbor]--;
        if (inDegree[neighbor] == 0) queue.offer(neighbor);
      }
    }

    return index == numCourses ? order : new int[0]; // Se index < V -> Tem ciclo!
  }
}
```

#### Key Takeaways
- O Algoritmo de Kahn é intuitivo, iterativo e elimina preocupações com estouro de recursão de pilha.

</details>
