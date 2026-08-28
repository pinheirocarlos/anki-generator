---
id: CS-MATH-PROB-002
title: "Probabilidade Condicional e Teorema de Bayes em Sistemas de Decisão"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::meta
  - freq::high
---

## Pergunta
O que é **Probabilidade Condicional** e como o **Teorema de Bayes** calcula a probabilidade atualizada de um evento à luz de novas evidências?

## Resposta
### Quick Answer
**Solução Direta**:
- **Probabilidade Condicional ($P(A \mid B)$)**: A probabilidade do evento $A$ ocorrer dado que o evento $B$ já ocorreu com certeza:
  $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$
- **Teorema de Bayes**: Fórmula matemática fundamental para inverter probabilidades condicionais, atualizando a probabilidade a priori $P(A)$ para a probabilidade a posteriori $P(A \mid B)$ ao observar a evidência $B$:
  $$P(A \mid B) = \frac{P(B \mid A) \cdot P(A)}{P(B)}$$
- Base para classificadores Naive Bayes (filtros anti-spam, detecção de fraude e diagnósticos de falhas em sistemas distribuídos).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Probabilidade Condicional e Teorema de Bayes em Sistemas</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="280" y="26" fill="#60a5fa" font-size="14" font-weight="bold" font-family="monospace" text-anchor="middle">P(A|B) = [ P(B|A) * P(A) ] / P(B)</text>
    <text x="280" y="52" fill="#f8fafc" font-size="11" text-anchor="middle">• P(A|B): Probabilidade a posteriori (hipótese A após observar a evidência B)</text>
    <text x="280" y="70" fill="#a1a1aa" font-size="10" text-anchor="middle">• P(A): Prior | P(B|A): Likelihood (Verossimilhança) | P(B): Evidência marginal</text>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Aplicações Reais: Filtros Anti-Spam Bayesianos, Detecção de Fraude e Diagnóstico de Anomalias SRE.</text>

</svg>

| Termo Bayesiano | Significado no Sistema | Exemplo em Filtro Anti-Spam |
|---|---|---|
| **$P(A)$ (Prior)** | Probabilidade base antes de ver o dado | Taxa geral de spam recebido (ex: 20%) |
| **$P(B \mid A)$ (Likelihood)** | Chance da evidência ocorrer dado que é $A$ | Chance da palavra "promoção" estar em spams |
| **$P(A \mid B)$ (Posterior)** | Probabilidade atualizada após ver a evidência | Chance do e-mail ser spam contendo "promoção" |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Paradoxo do Falso Positivo
- Se uma doença afeta 1 em 1.000 pessoas ($P(D) = 0.001$) e um teste tem 99% de precisão ($P(T \mid D) = 0.99$ e $P(T \mid \neg D) = 0.05$ de falso positivo):
  $$P(D \mid T) = \frac{0.99 \times 0.001}{(0.99 \times 0.001) + (0.05 \times 0.999)} \approx \frac{0.00099}{0.05094} \approx 1.94\%$$
- Mesmo com teste positivo, a chance real de ter a doença é de apenas ~2% devido à raridade da condição a priori!

#### Key Takeaways
- Ignorar a probabilidade a priori (*Base Rate Fallacy*) é um dos erros estatísticos mais comuns em engenharia e análise de dados.

</details>
