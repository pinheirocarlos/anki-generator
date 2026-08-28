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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Crescimento Amortizado de Vetores Dinâmicos: Duplicação Geométrica 2x</text>
  <g transform="translate(60, 50)">
    <text x="0" y="15" fill="#94a3b8" font-size="11">Capacidade = 4 (Cheio):</text>
    <rect x="140" y="0" width="50" height="24" fill="#3b82f6" rx="3"/>
    <rect x="195" y="0" width="50" height="24" fill="#3b82f6" rx="3"/>
    <rect x="250" y="0" width="50" height="24" fill="#3b82f6" rx="3"/>
    <rect x="305" y="0" width="50" height="24" fill="#3b82f6" rx="3"/>
  </g>
  <g transform="translate(60, 90)">
    <text x="0" y="15" fill="#10b981" font-size="11">Capacidade = 8 (Realloc 2x):</text>
    <rect x="140" y="0" width="50" height="24" fill="#10b981" rx="3"/>
    <rect x="195" y="0" width="50" height="24" fill="#10b981" rx="3"/>
    <rect x="250" y="0" width="50" height="24" fill="#10b981" rx="3"/>
    <rect x="305" y="0" width="50" height="24" fill="#10b981" rx="3"/>
    <rect x="360" y="0" width="50" height="24" fill="#047857" rx="3"/>
    <rect x="415" y="0" width="50" height="24" fill="#1e293b" stroke="#475569" rx="3"/>
    <rect x="470" y="0" width="50" height="24" fill="#1e293b" stroke="#475569" rx="3"/>
    <rect x="525" y="0" width="50" height="24" fill="#1e293b" stroke="#475569" rx="3"/>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Custo Total de N inserções = 1 + 2 + 4 + ... + N = 2N → Custo Amortizado = O(1)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Crescimento Amortizado de Vetores Dinâmicos: Duplicação Geométrica 2x</text>
  <g transform="translate(60, 50)">
    <text x="0" y="15" fill="#94a3b8" font-size="11">Capacidade = 4 (Cheio):</text>
    <rect x="140" y="0" width="50" height="24" fill="#3b82f6" rx="3"/>
    <rect x="195" y="0" width="50" height="24" fill="#3b82f6" rx="3"/>
    <rect x="250" y="0" width="50" height="24" fill="#3b82f6" rx="3"/>
    <rect x="305" y="0" width="50" height="24" fill="#3b82f6" rx="3"/>
  </g>
  <g transform="translate(60, 90)">
    <text x="0" y="15" fill="#10b981" font-size="11">Capacidade = 8 (Realloc 2x):</text>
    <rect x="140" y="0" width="50" height="24" fill="#10b981" rx="3"/>
    <rect x="195" y="0" width="50" height="24" fill="#10b981" rx="3"/>
    <rect x="250" y="0" width="50" height="24" fill="#10b981" rx="3"/>
    <rect x="305" y="0" width="50" height="24" fill="#10b981" rx="3"/>
    <rect x="360" y="0" width="50" height="24" fill="#047857" rx="3"/>
    <rect x="415" y="0" width="50" height="24" fill="#1e293b" stroke="#475569" rx="3"/>
    <rect x="470" y="0" width="50" height="24" fill="#1e293b" stroke="#475569" rx="3"/>
    <rect x="525" y="0" width="50" height="24" fill="#1e293b" stroke="#475569" rx="3"/>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Custo Total de N inserções = 1 + 2 + 4 + ... + N = 2N → Custo Amortizado = O(1)</text>

</svg>

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
