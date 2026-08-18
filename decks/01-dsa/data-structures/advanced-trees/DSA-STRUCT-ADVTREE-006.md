---
id: DSA-STRUCT-ADVTREE-006
title: "Intuição Fundamental de Segment Trees: O Livro Contábil com Subtotais"
tags:
  - level::l2-fundamental
  - topic::dsa::advanced-trees
  - company::google
  - freq::medium
---

## Pergunta
Qual problema prático uma Árvore de Segmentos (Segment Tree) resolve ao lidar com somas em intervalos e atualizações frequentes?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma **Árvore de Segmentos** resolve o dilema entre consultar somas em intervalos e atualizar valores rapidamente, executando **ambas as operações em $O(\log N)$**.
- Funciona como um **livro contábil com subtotais pré-calculados**: em vez de somar 100 dias um por um, ela combina os subtotais prontos das semanas e meses que cobrem o período desejado.

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Segment Tree: Nós Superiores Guardam a Soma dos Filhos</text>

  <!-- Galhos -->
  <line x1="300" y1="50" x2="180" y2="95" stroke="#3b82f6" stroke-width="2" />
  <line x1="300" y1="50" x2="420" y2="95" stroke="#3b82f6" stroke-width="2" />
  <line x1="180" y1="95" x2="120" y2="140" stroke="#3b82f6" stroke-width="2" />
  <line x1="180" y1="95" x2="240" y2="140" stroke="#3b82f6" stroke-width="2" />
  <line x1="420" y1="95" x2="360" y2="140" stroke="#3b82f6" stroke-width="2" />
  <line x1="420" y1="95" x2="480" y2="140" stroke="#3b82f6" stroke-width="2" />

  <!-- Raiz: Soma Total [0..3] -->
  <rect x="255" y="35" width="90" height="30" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4" />
  <text x="300" y="55" fill="#ffffff" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">Soma [0..3] = 36</text>

  <!-- Nível 1: Subtotais [0..1] e [2..3] -->
  <rect x="135" y="80" width="90" height="30" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4" />
  <text x="180" y="100" fill="#93c5fd" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">[0..1] = 15</text>

  <rect x="375" y="80" width="90" height="30" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4" />
  <text x="420" y="100" fill="#93c5fd" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">[2..3] = 21</text>

  <!-- Folhas: Itens Individuais [0], [1], [2], [3] -->
  <rect x="85" y="125" width="70" height="28" fill="#334155" stroke="#64748b" stroke-width="1.5" rx="3" />
  <text x="120" y="143" fill="#f8fafc" font-size="11" font-family="sans-serif" text-anchor="middle">A[0] = 5</text>

  <rect x="205" y="125" width="70" height="28" fill="#334155" stroke="#64748b" stroke-width="1.5" rx="3" />
  <text x="240" y="143" fill="#f8fafc" font-size="11" font-family="sans-serif" text-anchor="middle">A[1] = 10</text>

  <rect x="325" y="125" width="70" height="28" fill="#334155" stroke="#64748b" stroke-width="1.5" rx="3" />
  <text x="360" y="143" fill="#f8fafc" font-size="11" font-family="sans-serif" text-anchor="middle">A[2] = 7</text>

  <rect x="445" y="125" width="70" height="28" fill="#334155" stroke="#64748b" stroke-width="1.5" rx="3" />
  <text x="480" y="143" fill="#f8fafc" font-size="11" font-family="sans-serif" text-anchor="middle">A[3] = 14</text>

  <text x="300" y="178" fill="#94a3b8" font-size="10" font-family="sans-serif" text-anchor="middle">Consulta de soma no intervalo [0..2]: Basta somar bloco [0..1] (15) + A[2] (7) = 22</text>
</svg>

| Abordagem | Consulta de Soma de Intervalo | Atualização de 1 Valor |
|---|---|---|
| **Array Simples** | $O(N)$ (lento para consultar) | $O(1)$ (rápido para atualizar) |
| **Prefix Sum Array** | $O(1)$ (rápido para consultar) | $O(N)$ (lento para atualizar) |
| **Segment Tree / Fenwick** | $O(\log N)$ (equilibrado e rápido) | $O(\log N)$ (equilibrado e rápido) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Dilema do Gerente da Loja
Imagine que você tem as vendas diárias de um ano inteiro (365 dias):
1. Se você não pré-calcula nada e o chefe pergunta *"quanto vendemos de março a outubro?"*, você tem que somar centenas de dias um por um ($O(N)$).
2. Se você pré-calcula as somas acumuladas (Prefix Sum), a resposta é imediata ($O(1)$), mas se alguém alterar a venda do dia 3 de janeiro, terá que recalcular as somas acumuladas de todos os 362 dias seguintes ($O(N)$).

#### A Solução Elegante da Árvore de Segmentos
A Segment Tree cria uma hierarquia de pirâmide:
- A base tem os dias individuais.
- O nível acima agrupa dias em pares.
- O topo tem a soma do ano.

Para qualquer intervalo de datas, você consulta apenas **poucos blocos intermediários** ($O(\log N)$) e, se um dia mudar, atualiza apenas o caminho direto daquele dia até o topo ($O(\log N)$).

#### Key Takeaways
- Ideal para sistemas financeiros, jogos e processamento de séries temporais com consultas e alterações simultâneas.

</details>
