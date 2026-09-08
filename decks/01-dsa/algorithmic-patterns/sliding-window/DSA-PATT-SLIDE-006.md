---
id: DSA-PATT-SLIDE-006
title: "Intuição Fundamental de Sliding Window: O Foco de uma Lupa Deslizante"
tags:
  - level::l2-fundamental
  - topic::dsa::sliding-window
  - company::amazon
  - freq::high
---

## Pergunta
Como a técnica de Janela Deslizante (Sliding Window) reaproveita cálculos anteriores ao analisar sequências contíguas em $O(N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Janela Deslizante (Sliding Window)** mantém uma moldura imaginária sobre um subarray contíguo. Ao avançar a janela um passo à direita, ela **apenas subtrai o elemento que saiu e soma o elemento que acabou de entrar**.
- Isso elimina o retrabalho de somar todos os elementos da janela do zero a cada posição, reduzindo a complexidade de $O(N \times K)$ para **$O(N)$**.

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Sliding Window: Nova Soma = Soma Anterior - Saiu + Entrou</text>

  <!-- Array Completo -->
  <g transform="translate(60, 50)">
    <!-- 0: 2 (Saiu) -->
    <rect x="0" y="0" width="65" height="50" fill="#991b1b" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3" rx="4" />
    <text x="32" y="32" fill="#fca5a5" font-size="16" font-family="sans-serif" text-anchor="middle">2</text>
    <text x="32" y="70" fill="#ef4444" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">- 2 (Saiu)</text>

    <!-- Moldura Ativa (Janela K=3) -->
    <rect x="70" y="-6" width="220" height="62" fill="#065f46" fill-opacity="0.3" stroke="#10b981" stroke-width="2.5" rx="6" />

    <!-- 1: 5 -->
    <rect x="75" y="0" width="65" height="50" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="4" />
    <text x="107" y="32" fill="#ffffff" font-size="16" font-family="sans-serif" text-anchor="middle">5</text>

    <!-- 2: 1 -->
    <rect x="150" y="0" width="65" height="50" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="4" />
    <text x="182" y="32" fill="#ffffff" font-size="16" font-family="sans-serif" text-anchor="middle">1</text>

    <!-- 3: 8 (Entrou) -->
    <rect x="225" y="0" width="65" height="50" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="4" />
    <text x="257" y="32" fill="#ffffff" font-size="16" font-family="sans-serif" font-weight="bold" text-anchor="middle">8</text>
    <text x="257" y="70" fill="#10b981" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">+ 8 (Entrou)</text>

    <!-- 4: 4 -->
    <rect x="305" y="0" width="65" height="50" fill="#1e293b" stroke="#475569" stroke-width="1" rx="4" />
    <text x="337" y="32" fill="#94a3b8" font-size="16" font-family="sans-serif" text-anchor="middle">4</text>

    <!-- 5: 9 -->
    <rect x="380" y="0" width="65" height="50" fill="#1e293b" stroke="#475569" stroke-width="1" rx="4" />
    <text x="412" y="32" fill="#94a3b8" font-size="16" font-family="sans-serif" text-anchor="middle">9</text>
  </g>

  <text x="300" y="160" fill="#a7f3d0" font-size="11" font-family="sans-serif" text-anchor="middle">Janela anterior: [2, 5, 1] (Soma = 8) ➔ Nova Janela: [5, 1, 8] ➔ Cálculo: 8 - 2 + 8 = 14 (Instantâneo!)</text>
</svg>
<p>Visualização: Moldura de lupa deslizando sobre uma régua de números mantendo o foco ativo.</p>

| Tipo de Janela | Comportamento | Exemplo Típico |
|---|---|---|
| **Tamanho Fixo ($K$)** | Desliza mantendo sempre $K$ elementos | Maior média de vendas em 7 dias consecutivos |
| **Tamanho Dinâmico** | Expande pela direita e encolhe pela esquerda conforme condição | Menor subarray cuja soma seja $\ge \text{Target}$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia do Vagão de Trem em Movimento
Pense em um trem passando por uma estação:
- Quando o trem anda um metro para frente, o último passageiro do fundo sai da estação e um novo passageiro da frente entra na plataforma.
- Para saber o peso total das pessoas dentro da estação, você não pesa todo mundo de novo; apenas subtrai o peso de quem acabou de sair e soma o de quem acabou de entrar.

#### Onde Aplicar
Sempre que o enunciado de um problema envolver palavras como **"contíguo"**, **"subarray"**, **"substring"** ou intervalos consecutivos de dados.

#### Key Takeaways
- Cada elemento é processado no máximo 2 vezes (uma vez ao entrar na janela e uma vez ao sair).
- Converte algoritmos lentos de repetição de cálculos em uma varredura $O(N)$ com custo de memória $O(1)$.

</details>
