---
id: CS-MATH-BOOL-002
title: "Teoremas de De Morgan e Simplificação de Expressões Lógicas"
tags:
  - level::l3-junior
  - topic::cs::discrete-math
  - company::amazon
  - freq::high
---

## Pergunta
O que estabelecem os **Teoremas de De Morgan** e como aplicá-los para simplificar condições lógicas complexas em código?

## Resposta
### Quick Answer
**Solução Direta**:
- Os **Teoremas de De Morgan** definem a relação de dualidade entre conjunção (`AND`) e disjunção (`OR`) sob negação (`NOT`):
  1. **Primeira Lei**: A negação de uma conjunção é a disjunção das negações:
     $$\neg(A \land B) \iff (\neg A \lor \neg B)$$
  2. **Segunda Lei**: A negação de uma disjunção é a conjunção das negações:
     $$\neg(A \lor B) \iff (\neg A \land \neg B)$$
- Permite refatorar expressões com múltiplos `!` aninhados em código legível, eliminando bugs de limites (*boundary errors*).

### Dual Coding Visual
| Expressão com Negação Externa | Forma Equivalente De Morgan | Legibilidade em Código |
|---|---|---|
| `!(A && B)` | `!A OR !B` | Condição de recusa imediata |
| `!(A OR B)` | `!A && !B` | Verificação de restrição estrita |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Refatorando Condicional Complexa
```java
// Código Difícil de Ler (Negação Externa):
if (!(user.isActive() && !user.isBanned() && user.hasValidSubscription())) {
  denyAccess();
}

// Código Refatorado com Teorema de De Morgan (Claro e Direto):
if (!user.isActive() || user.isBanned() || !user.hasValidSubscription()) {
  denyAccess();
}
```

#### Key Takeaways
- Aplicar De Morgan transforma negações de conjuntos em verificações sequenciais com *Short-Circuit Evaluation* eficiente.

</details>
