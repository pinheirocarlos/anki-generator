---
id: CS-MATH-GRAPH-001
title: "Provas de Invariantes via Indução Matemática e Princípio da Casa dos Pombos"
tags:
  - level::l4-pleno
  - topic::cs::discrete-math
  - company::google
  - freq::high
---

## Pergunta
Como utilizar **Indução Matemática** e o **Princípio da Casa dos Pombos** para provar invariantes e limites em estruturas de dados e grafos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Indução Matemática**: Técnica de prova formal em 2 passos:
  1. *Caso Base*: Provar que a propriedade $P(n)$ é verdadeira para $n = 0$ ou $n = 1$.
  2. *Passo Indutivo*: Assumir que $P(k)$ é verdadeira (Hipótese de Indução) e demonstrar rigorosamente que $P(k+1)$ também é verdadeira.
  - *Exemplo*: Provar que uma árvore binária cheia com $L$ folhas possui exatamente $2L - 1$ nós totais.
- **Princípio da Casa dos Pombos (Pigeonhole Principle)**: Se $N$ pombos forem colocados em $M$ casas e $N > M$, então **ao menos uma casa conterá $\ge 2$ pombos**.
  - *Exemplo*: Em qualquer grafo simples com $V \ge 2$ nós, existem **ao menos dois vértices com exatamente o mesmo grau de conexões**.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/pigeonhole-principle-induction-loop.webm">
    <p>Visualização: Se n itens são colocados em m recipientes com n > m, ao menos um recipiente contém múltiplos itens.</p>
  </video>
</div>

| Método de Prova | Estrutura Lógica | Aplicação em Engenharia de Software |
|---|---|---|
| **Indução Matemática** | Base $P(1)$ + Passo $P(k) \implies P(k+1)$ | Prova de terminação e invariante de laços |
| **Casa dos Pombos** | $N > M \implies \ge \lceil N/M \rceil$ pombos em 1 casa | Prova de colisões de hash e ciclos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Prova via Pigeonhole: Ciclos em Grafos Finitos
- Se você percorrer um caminho de comprimento $V$ em um grafo com $V$ vértices, pela Casa dos Pombos você terá visitado $V + 1$ vértices no total.
- Como existem apenas $V$ vértices distintos no grafo, ao menos um vértice foi visitado duas vezes $\implies$ **o caminho contém garantidamente um ciclo**!

#### Key Takeaways
- Provas por invariantes de laço são essenciais em entrevistas de algoritmos para demonstrar a corretude de algoritmos gulosos (*Greedy*) e de dois ponteiros.

</details>
