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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/build-dependency-graph-topo-loop.webm">
    <p>Visualização: Sequenciamento de pacotes e tarefas respeitando restrições estritas de dependências upstream.</p>
  </video>
</div>

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
