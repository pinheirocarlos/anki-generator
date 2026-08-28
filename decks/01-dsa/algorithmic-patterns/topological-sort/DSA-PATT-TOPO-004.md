---
id: DSA-PATT-TOPO-004
title: "Ordenação Topológica via DFS com Pós-Ordem Reversa e Detecção de Back-Edges"
tags:
  - level::l4-pleno
  - topic::dsa::topological-sort
  - company::meta
  - freq::high
---

## Pergunta
Como a **DFS com Pós-Ordem Reversa (Post-Order)** gera uma ordenação topológica válida e detecta ciclos direcionados em $O(V + E)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Executa DFS com coloração de 3 estados (0: White, 1: Gray, 2: Black):
  - Ao iniciar visita ao nó $u$: marca como `Gray`.
  - Para cada vizinho $v$: se $v$ for `Gray`, aborta (detectou ciclo / Back-Edge). Se for `White`, visita recursivamente.
  - Ao terminar de processar todos os descendentes de $u$: marca $u$ como `Black` e empilha $u$ em uma Pilha (ou insere no início de uma lista).
- Como um nó só é empilhado após todas as suas dependências terem sido concluídas, desempilhar todos os nós produz a **ordem topológica exata**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Course Schedule II: Retorno de Ordem Válida de Execução de Tarefas</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Construção do Grafo de Pré-Requisitos e Resolução</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Mapeia prerequisites [a, b] como aresta direcionada b → a (fazer b antes de a).</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Executa Kahn's Algorithm; se tamanho da ordem == numCourses retorna ordem, senão array vazio [].</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Aplicações diretas em compiladores (ordem de build em Make/Bazel/npm) e gerenciadores de pacotes</text>

</svg>

| Passo da DFS | Estado do Nó | Inserção na Ordem |
|---|---|---|
| **Entrada no nó** | Marcado como `Gray` (Ativo) | Nenhuma |
| **Retorno da recursão** | Marcado como `Black` (Pronto) | Empilhado (Pós-ordem reversa) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A pós-ordem reversa de uma DFS em um DAG é matematicamente equivalente à ordenação topológica.

</details>
