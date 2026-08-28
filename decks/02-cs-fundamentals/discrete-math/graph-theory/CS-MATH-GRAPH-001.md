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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Princípio da Casa dos Pombos (Pigeonhole Principle)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="280" y="24" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Se n itens forem colocados em m caixas e n > m, pelo menos uma caixa contém ≥ 2 itens</text>
    <text x="280" y="50" fill="#f8fafc" font-size="11" text-anchor="middle">Exemplo: Em um grupo de 367 pessoas, pelo menos duas fazem aniversário no mesmo dia.</text>
    <text x="280" y="68" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">⌈n / m⌉ = cota inferior garantida de colisões</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Base matemática da prova de colisões inevitáveis em tabelas hash finitas e algoritmos de compressão sem perda.</text>

</svg>

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
