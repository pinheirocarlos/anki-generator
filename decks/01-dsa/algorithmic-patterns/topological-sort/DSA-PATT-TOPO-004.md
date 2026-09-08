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

  <text x="340" y="24" fill="#38bdf8" font-size="13" font-weight="bold" text-anchor="middle">Ordenação Topológica via DFS: Pós-Ordem Reversa (Reverse Post-Order)</text>

  <!-- Caminho DFS -->
  <g transform="translate(60, 45)">
    <!-- Raiz u -->
    <circle cx="40" cy="50" r="18" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="40" y="54" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">u</text>

    <!-- Seta u -> v -->
    <line x1="58" y1="50" x2="118" y2="50" stroke="#3b82f6" stroke-width="2"/>
    <polygon points="118,50 110,46 110,54" fill="#3b82f6"/>

    <!-- Intermediário v -->
    <circle cx="135" cy="50" r="18" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
    <text x="135" y="54" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">v</text>

    <!-- Seta v -> w -->
    <line x1="153" y1="50" x2="213" y2="50" stroke="#3b82f6" stroke-width="2"/>
    <polygon points="213,50 205,46 205,54" fill="#3b82f6"/>

    <!-- Folha w -->
    <circle cx="230" cy="50" r="18" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="230" y="54" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">w</text>

    <!-- Seta de retorno / backtrack -->
    <path d="M 230,70 Q 135,110 40,70" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3,3"/>
    <text x="135" y="105" fill="#fbbf24" font-size="9" text-anchor="middle">Backtrack insere na pilha</text>
  </g>

  <!-- Pilha de Pós-Ordem Reversa -->
  <g transform="translate(340, 45)">
    <rect x="0" y="0" width="300" height="95" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="150" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Pilha / Lista Encadeada (Insert Head)</text>
    <text x="15" y="44" fill="#f8fafc" font-size="10">1. DFS atinge folha <tspan fill="#34d399" font-weight="bold">w</tspan> (sem saídas) ➔ Empilha w: [w]</text>
    <text x="15" y="62" fill="#f8fafc" font-size="10">2. Retorna para <tspan fill="#60a5fa" font-weight="bold">v</tspan> ➔ Empilha v: [v, w]</text>
    <text x="15" y="80" fill="#f8fafc" font-size="10">3. Retorna para <tspan fill="#60a5fa" font-weight="bold">u</tspan> ➔ Empilha u: <tspan fill="#fbbf24" font-weight="bold">[u, v, w] (Ordem Válida)</tspan></text>
  </g>

  <text x="340" y="175" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Detecção de Ciclos: Se durante a DFS encontrar um nó Gray (na pilha ativa), aborta (ciclo detectado)</text>
</svg>
<p>Visualização: Ordenação topológica via DFS: nós são inseridos na lista linear no retorno da recursão (pós-ordem reversa), refletindo dependências satisfeitas.</p>

| Passo da DFS | Estado do Nó | Inserção na Ordem |
|---|---|---|
| **Entrada no nó** | Marcado como `Gray` (Ativo) | Nenhuma |
| **Retorno da recursão** | Marcado como `Black` (Pronto) | Empilhado (Pós-ordem reversa) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- A pós-ordem reversa de uma DFS em um DAG é matematicamente equivalente à ordenação topológica.

</details>
