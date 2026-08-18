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
