---
id: DSA-STRUCT-ARRAY-001
title: "Prova do Custo Amortizado O(1) de Vetores Dinâmicos via Método Contábil"
tags:
  - level::l4-pleno
  - topic::dsa::arrays-strings
  - company::meta
  - freq::high
---

## Pergunta
Como provar formalmente que o custo de inserção (`append`) em um vetor dinâmico é **$O(1)$ amortizado** utilizando o método contábil?

## Resposta
### Quick Answer
**Solução Direta**:
- No **Método Contábil (Accounting Method)**, cobramos um custo amortizado de **3 créditos virtuais** por cada inserção simples:
  - **1 crédito**: Paga o custo imediato de gravar o elemento no array.
  - **1 crédito**: Fica armazenado como saldo do próprio elemento para sua futura cópia.
  - **1 crédito**: Fica armazenado para pagar a futura cópia de um elemento mais antigo que já consumiu seu saldo.
- Quando o array atinge a capacidade $N$ e precisa duplicar para $2N$, exatamente $N$ créditos estão acumulados no saldo, pagando integralmente a cópia dos $N$ elementos para o novo buffer sem déficit. Logo, o custo por operação é $O(1)$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/dynamic-array-amortized-growth-loop.webm">
    <p>Visualização: Duplicação geométrica da capacidade (2x) e redistribuição de créditos amortizados O(1).</p>
  </video>
</div>

| Operação | Custo Real | Saldo Acumulado |
|---|---|---|
| **Append sem realocação** | 1 ciclo | $+2$ créditos no saldo |
| **Append com duplicação $N \to 2N$** | $N + 1$ ciclos | Saldo de $N$ zera o custo de cópia |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Dedução da Série Geométrica (Método Agregado)
O custo total $T(N)$ para inserir $N$ elementos começando com capacidade 1 é a soma das inserções imediatas mais as cópias nas potências de 2:
$$T(N) = N + \sum_{j=0}^{\lfloor \log_2 N \rfloor} 2^j = N + (2^{\lfloor \log_2 N \rfloor + 1} - 1) < N + 2N = 3N$$

Dividindo pelo número de operações $N$:
$$\text{Custo Amortizado} = \frac{T(N)}{N} < \frac{3N}{N} = O(1)$$

#### Key Takeaways
- A chave da prova matemática é que os elementos recém-inseridos subsidiam a cópia dos elementos antigos antes que ocorra a próxima realocação.
- Esse resultado só é válido quando o fator multiplicativo é maior que 1 ($gamma > 1$).

</details>
