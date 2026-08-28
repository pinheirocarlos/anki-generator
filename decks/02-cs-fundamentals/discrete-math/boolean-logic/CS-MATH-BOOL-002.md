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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Teoremas de De Morgan &amp; Dualidade Lógica</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="260" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="130" y="24" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Primeira Lei de De Morgan</text>
    <text x="130" y="52" fill="#ffffff" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle">!(A &amp;&amp; B) ≡ !A || !B</text>
    <text x="130" y="70" fill="#94a3b8" font-size="10" text-anchor="middle">A negação da conjunção é a disjunção das negações</text>

    <rect x="300" y="0" width="260" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="430" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Segunda Lei de De Morgan</text>
    <text x="430" y="52" fill="#ffffff" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle">!(A || B) ≡ !A &amp;&amp; !B</text>
    <text x="430" y="70" fill="#94a3b8" font-size="10" text-anchor="middle">A negação da disjunção é a conjunção das negações</text>
  </g>
  <rect x="60" y="145" width="560" height="35" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
  <text x="340" y="167" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Aplicação Prática: Refatoração de condicionais complexas e otimização de queries SQL (WHERE clauses).</text>

</svg>

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
