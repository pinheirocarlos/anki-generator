---
id: DSA-STRUCT-TREE-005
title: "Degeneração de BST em Lista Ligada O(N) vs Garantia O(log N)"
tags:
  - level::l4-pleno
  - topic::dsa::trees-bst
  - company::meta
  - freq::high
---

## Pergunta
Como ocorre a **degeneração de uma BST simples em uma lista encadeada** com busca $O(N)$ no pior caso?

## Resposta
### Quick Answer
**Solução Direta**:
- Se inserirmos elementos já ordenados (ex: `1, 2, 3, 4, 5`) em uma BST ingênua sem auto-balanceamento:
  - Cada novo nó é inserido exclusivamente como filho direito do nó anterior.
  - A árvore se transforma em uma cadeia linear unidimensional (lista encadeada) de altura $H = N$.
- A complexidade de busca, inserção e remoção degrada de $O(\log N)$ para o pior caso desastroso de **$O(N)$ linear**.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Morris Traversal: Travessia In-Order com Espaço O(1) Estrito</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Ponteiros Temporários (Threaded Binary Trees)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Localiza o predecessor in-order (nó mais à direita da subárvore esquerda).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Cria link temporário predecessor.right = curr. Na 2ª visita, remove o link e visita curr.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Elimina pilha de recursão e pilha explícita: Tempo O(N), Espaço O(1) Absoluto</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Morris Traversal: Travessia In-Order com Espaço O(1) Estrito</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#a855f7" rx="6"/>
    <text x="260" y="22" fill="#d8b4fe" font-size="12" font-weight="bold" text-anchor="middle">Ponteiros Temporários (Threaded Binary Trees)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">1. Localiza o predecessor in-order (nó mais à direita da subárvore esquerda).</text>
    <text x="20" y="62" fill="#10b981" font-size="11">2. Cria link temporário predecessor.right = curr. Na 2ª visita, remove o link e visita curr.</text>
  </g>
  <text x="340" y="160" fill="#a855f7" font-size="12" font-weight="bold" text-anchor="middle">Elimina pilha de recursão e pilha explícita: Tempo O(N), Espaço O(1) Absoluto</text>

</svg>

| Estrutura | Inserção Ordenada (`1,2,3,4`) | Custo de Busca de Alvo |
|---|---|---|
| **BST Ingênua** | Vira lista: `1->2->3->4` | $O(N)$ Pior Caso |
| **Árvore Balanceada** | Mantém `2` na raiz com `1` e `3,4` | $O(\log N)$ Garantido |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Essa vulnerabilidade de pior caso $O(N)$ torna a BST ingênua inadequada para sistemas de produção sem garantias de balanceamento (AVL, Red-Black ou B-Trees).

</details>
