---
id: SYS-DIST-TIME-002
title: "Google TrueTime API e Janela de Incerteza Bound [earliest, latest]"
tags:
  - level::l5-senior
  - topic::sys::distributed
  - company::google
  - freq::high
---

## Pergunta
Como a TrueTime API do Google Spanner utiliza relógios atômicos e GPS para fornecer uma janela de incerteza delimitada $[t_{earliest}, t_{latest}]$ e viabilizar Linearizabilidade global?

## Resposta
### Quick Answer
**Solução Direta**:
- Em vez de retornar um timestamp escalar pontual, a **TrueTime API** do Google retorna explicitamente um intervalo de tempo:
  $$\text{TT.now}() = [t - \epsilon, t + \epsilon]$$
  onde $\epsilon$ representa a **incerteza máxima** delimitada por hardware sincronizado via relógios atômicos e receptores GPS em cada data center ($epsilon \le 7 \text{ ms}$).
- **Commit Wait Rule**: Para garantir que uma transação $T_2$ iniciada após $T_1$ receba um timestamp rigorosamente maior, o Spanner faz o coordenador da transação $T_1$ esperar voluntariamente $2\epsilon$ antes de liberar o commit para clientes.
- Isso garante **Linearizabilidade global** estrita sem necessidade de comunicação cruzada entre continentes para verificar ordem temporal.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Google Spanner TrueTime API: Incerteza Temporal [earliest, latest]</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">TrueTime: Relógios Atômicos + Receptores GPS garantem erro epsilon &lt;= 7ms</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="260" height="55" rx="4" fill="#0369a1"/>
      <text x="130" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Commit Wait (Espera Deliberada)</text>
      <text x="130" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Tx aguarda 2 * epsilon antes de liberar</text>

      <rect x="300" y="0" width="260" height="55" rx="4" fill="#065f46"/>
      <text x="430" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Linearizabilidade Global</text>
      <text x="430" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">Garante ordem causal entre datacenters</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Se Tx2 começa após o término de Tx1 no mundo real, o timestamp de Tx2 é estritamente maior que o de Tx1.</text>

</svg>

| Mecanismo de Tempo | Tratamento de Incerteza | Garantia Oferecida |
|---|---|---|
| **NTP Convencional** | Ignora incerteza (assume relógio perfeito) | Não garante consistência temporal estrita |
| **TrueTime (Spanner)** | Retorna intervalo explícito $[t-\epsilon, t+\epsilon]$ com Commit Wait | Linearizabilidade global com timestamps físicos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Princípio do Commit Wait
- Se $T_1$ grava com timestamp $s = \text{TT.now}().latest$, o Spanner aguarda até que $\text{TT.now}().earliest > s$ antes de commitar.
- Assim, qualquer transação $T_2$ subsequente receberá garantidamente um timestamp $s_2 > s_1$.

</details>
