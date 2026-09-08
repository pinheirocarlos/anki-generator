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

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Resolução de Dependências de Compilação de Pacotes</text>

  <!-- Grafo de Pacotes -->
  <g transform="translate(50, 45)">
    <!-- Core -->
    <rect x="0" y="35" width="80" height="30" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="4"/>
    <text x="40" y="54" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">1. Core</text>

    <!-- DB -->
    <rect x="120" y="10" width="80" height="30" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
    <text x="160" y="29" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">2. DB</text>

    <!-- Net -->
    <rect x="120" y="60" width="80" height="30" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="4"/>
    <text x="160" y="79" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">3. Net</text>

    <!-- API -->
    <rect x="240" y="35" width="80" height="30" fill="#78350f" stroke="#f59e0b" stroke-width="1.5" rx="4"/>
    <text x="280" y="54" fill="#fff" font-size="10" font-weight="bold" text-anchor="middle">4. API</text>

    <!-- Setas -->
    <line x1="80" y1="45" x2="118" y2="25" stroke="#10b981" stroke-width="1.5"/>
    <line x1="80" y1="55" x2="118" y2="75" stroke="#10b981" stroke-width="1.5"/>
    <line x1="200" y1="25" x2="238" y2="45" stroke="#3b82f6" stroke-width="1.5"/>
    <line x1="200" y1="75" x2="238" y2="55" stroke="#3b82f6" stroke-width="1.5"/>
  </g>

  <!-- Seta de Compilação -->
  <path d="M 390 95 L 430 95" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="3,3"/>
  <polygon points="435,95 425,90 425,100" fill="#fbbf24"/>

  <!-- Sequência Linear de Build -->
  <g transform="translate(445, 55)">
    <rect x="0" y="0" width="200" height="80" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="100" y="20" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Ordem Válida de Build (make/npm)</text>
    <text x="15" y="42" fill="#fff" font-size="10" font-family="monospace">1. Core (in-degree 0)</text>
    <text x="15" y="58" fill="#fff" font-size="10" font-family="monospace">2. DB, Net (paralelo)</text>
    <text x="15" y="74" fill="#fbbf24" font-size="10" font-family="monospace">3. API (dependências OK)</text>
  </g>

  <text x="340" y="175" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Base de gerenciadores de pacotes (npm, Cargo, Gradle, Bazel) e pipelines CI/CD</text>
</svg>
<p>Visualização: Resolução de dependências de compilação: grafo acíclico de pacotes linearizado para garantir pré-requisitos antes dos consumidores.</p>

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
