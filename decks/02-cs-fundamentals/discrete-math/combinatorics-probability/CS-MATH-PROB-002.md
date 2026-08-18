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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/math/bayes-theorem-conditional-probability-loop.webm">
    <p>Visualização: Atualização da probabilidade a posteriori P(A|B) combinando verossimilhança e probabilidade a priori.</p>
  </video>
</div>

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
