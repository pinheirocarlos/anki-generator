---
id: DSA-PATT-TOPO-003
title: "Impossibilidade de Ordenação Topológica na Presença de Ciclos"
tags:
  - level::l3-junior
  - topic::dsa::topological-sort
  - company::meta
  - freq::high
---

## Pergunta
Por que a presença de um ciclo em um grafo direcionado quebra matematicamente qualquer tentativa de ordenação linear?

## Resposta
### Quick Answer
**Solução Direta**:
- Seja um ciclo simples $v_1 \to v_2 \to \dots \to v_k \to v_1$.
- Pela definição de ordenação topológica, deveríamos ter:
  $$\text{pos}(v_1) < \text{pos}(v_2) < \dots < \text{pos}(v_k) < \text{pos}(v_1)$$
- Isso imporia $\text{pos}(v_1) < \text{pos}(v_1)$, o que é uma contradição lógica estrita.
- Portanto, qualquer algoritmo de ordenação topológica atua simultaneamente como um **detector de ciclos direcionados**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Detecção de Ciclos em DAG com Coloração de Nós (3 Cores)</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="160" height="75" fill="#1e293b" stroke="#94a3b8" rx="6"/>
    <text x="80" y="22" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">0 - Branco (White)</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Não visitado</text>

    <rect x="180" y="0" width="160" height="75" fill="#7f1d1d" stroke="#ef4444" rx="6"/>
    <text x="260" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">1 - Cinza (Gray)</text>
    <text x="195" y="45" fill="#fecaca" font-size="10">Na pilha de recursão</text>
    <text x="195" y="60" fill="#f87171" font-size="10">Back-edge = CICLO!</text>

    <rect x="360" y="0" width="160" height="75" fill="#065f46" stroke="#10b981" rx="6"/>
    <text x="440" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">2 - Preto (Black)</text>
    <text x="375" y="45" fill="#f8fafc" font-size="10">Totalmente explorado</text>
  </g>
  <text x="340" y="165" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">Encontrar um nó vizinho CINZA comprova a existência de ciclo direcionado</text>

</svg>

| Estrutura de Dependência | Relação de Posição | Status de Validade |
|---|---|---|
| **Caminho Linear $A \to B \to C$** | $\text{pos}(A) < \text{pos}(B) < \text{pos}(C)$ | Válido |
| **Ciclo $A \to B \to C \to A$** | $\text{pos}(A) < \dots < \text{pos}(A)$ | Impossível (Contradição) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em entrevistas de código, o tratamento do caso em que o grafo contém ciclos (retornando array vazio `[]`) é o teste de borda mais comum em problemas como *Course Schedule*.

</details>
