---
id: DSA-PATT-BACKTRACK-006
title: "Intuição Fundamental de Backtracking: As Migalhas de Pão e Retorno nas Encruzilhadas"
tags:
  - level::l2-fundamental
  - topic::dsa::backtracking
  - company::google
  - freq::high
---

## Pergunta
Como o paradigma de Backtracking explora todas as soluções possíveis e por que a "Poda" (Pruning) economiza tempo ao evitar becos sem saída?

## Resposta
### Quick Answer
**Solução Direta**:
- **Backtracking** é uma estratégia de busca por tentativa e erro: você dá um passo em frente (faz uma escolha), testa se ela é válida e, se atingir um beco sem saída, **dá um passo atrás (desfaz a escolha)** e tenta o caminho seguinte.
- A **Poda (Pruning)** abandona galhos inteiros da árvore de decisão assim que percebe que nenhuma resposta válida pode vir dali (como não continuar jogando Sudoku se colocar dois números 5 na mesma linha).

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Árvore de Decisão: Escolha ➔ Valida ➔ Poda Beco sem Saída ➔ Desfaz</text>

  <!-- Raiz -->
  <circle cx="300" cy="50" r="14" fill="#065f46" stroke="#10b981" stroke-width="2" />
  <text x="300" y="54" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Início</text>

  <!-- Galhos Nível 1 -->
  <line x1="300" y1="50" x2="180" y2="95" stroke="#ef4444" stroke-width="2" stroke-dasharray="3,3" />
  <line x1="300" y1="50" x2="420" y2="95" stroke="#10b981" stroke-width="2" />

  <!-- Galho Inválido (Podado) -->
  <circle cx="180" cy="95" r="16" fill="#991b1b" stroke="#ef4444" stroke-width="2" />
  <text x="180" y="99" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">❌</text>
  <text x="180" y="130" fill="#f87171" font-size="10" text-anchor="middle">Poda (Pruning)!</text>
  <text x="180" y="145" fill="#64748b" font-size="9" text-anchor="middle">Não desce mais</text>

  <!-- Galho Válido -->
  <circle cx="420" cy="95" r="16" fill="#1e293b" stroke="#10b981" stroke-width="2" />
  <text x="420" y="99" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">✓</text>
  <text x="420" y="130" fill="#34d399" font-size="10" text-anchor="middle">Caminho Válido</text>

  <!-- Subgalhos do Válido -->
  <line x1="420" y1="95" x2="360" y2="150" stroke="#10b981" stroke-width="1.5" />
  <line x1="420" y1="95" x2="480" y2="150" stroke="#10b981" stroke-width="1.5" />

  <circle cx="360" cy="150" r="12" fill="#065f46" stroke="#10b981" stroke-width="1.5" />
  <text x="360" y="154" fill="#ffffff" font-size="9" text-anchor="middle">Sol 1</text>

  <circle cx="480" cy="150" r="12" fill="#065f46" stroke="#10b981" stroke-width="1.5" />
  <text x="480" y="154" fill="#ffffff" font-size="9" text-anchor="middle">Sol 2</text>
</svg>
<p>Visualização: Explorador no labirinto que deixa marcas e retrocede imediatamente ao atingir becos sem saída.</p>

| Etapa do Backtracking | Ação no Código | Analogia do Mundo Real |
|---|---|---|
| **1. Escolha (Choose)** | Adiciona elemento à lista atual | Escolher virar à direita em uma trilha |
| **2. Exploração (Explore)** | Chama a função recursiva | Andar pela trilha escolhida |
| **3. Desfazer (Unchoose)** | Remove o elemento da lista (`pop`) | Voltar para a encruzilhada se der em uma parede |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia de João e Maria na Floresta
Ao entrar em uma floresta cheia de bifurcações, você solta migalhas de pão no chão. Se você chega em um penhasco, segue a linha de migalhas de volta até a última encruzilhada e tenta o outro caminho.

#### Problemas Típicos de Backtracking
- **N-Queens**: Posicionar $N$ rainhas em um tabuleiro de xadrez de modo que nenhuma ataque outra.
- **Sudoku Solver**: Preencher números de 1 a 9 respeitando as restrições de linha, coluna e quadrante.
- **Permutações e Subconjuntos**: Gerar todas as combinações possíveis de uma senha.

#### Key Takeaways
- É a forma elegante e estruturada de fazer força bruta inteligente com descarte rápido de ramos inválidos.

</details>
