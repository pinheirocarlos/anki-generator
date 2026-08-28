---
id: DSA-PATT-TOPO-002
title: "Resolução de Dependências de Tarefas e Compilação com Topological Sort"
tags:
  - level::l3-junior
  - topic::dsa::topological-sort
  - company::amazon
  - freq::high
---

## Pergunta
Como a Ordenação Topológica modela sistemas de resolução de dependências de compilação (ex: Make, Gradle, npm)?

## Resposta
### Quick Answer
**Solução Direta**:
- Modelamos cada pacote/tarefa como um vértice e cada pré-requisito como uma aresta direcionada $\text{Dependência} \to \text{Alvo}$ (ou $\text{Tarefa} \to \text{Pré-requisito}$).
- A ordenação topológica gera a **sequência de execução segura** onde nenhuma tarefa é iniciada antes que todos os seus pré-requisitos tenham sido completamente compilados e instalados.
- Se o algoritmo falhar em ordenar todos os nós, significa que foi detectada uma **Dependência Circular** fatal.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Topological Sort via DFS: Pilha de Pós-Ordem Invertida</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Empilhamento no Retorno da Recursão</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Executa DFS completa; empilha o vértice u estritamente após todos os seus descendentes serem visitados.</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Ao final, desempilhar a pilha resulta na ordem topológica válida: Tempo O(V + E).</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Garante que qualquer dependência de u já apareça após u na sequência</text>

</svg>

| Elemento de Sistema | Modelagem em DAG |
|---|---|
| **Biblioteca / Módulo** | Vértice $V$ |
| **`import` / Pré-requisito** | Aresta Direcionada $u \to v$ |
| **Ordem de Build** | Ordem Topológica linearizada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Sistemas de CI/CD modernos constroem seus grafos de execução com base em ordenação topológica para maximizar o paralelismo de nós com `in-degree == 0`.

</details>
