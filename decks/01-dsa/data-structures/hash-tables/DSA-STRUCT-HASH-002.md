---
id: DSA-STRUCT-HASH-002
title: "Fator de Carga (Load Factor) e Processo de Rehashing em Tabelas Hash"
tags:
  - level::l3-junior
  - topic::dsa::hash-tables
  - company::amazon
  - freq::high
---

## Pergunta
O que é o **Fator de Carga (Load Factor)** em uma tabela hash e quando o processo de **Rehashing** é disparado?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Fator de Carga ($\alpha$)** mede o nível de ocupação da tabela:
  $$\alpha = \frac{N}{M} = \frac{\text{número de elementos}}{\text{capacidade de buckets}}$$
- Quando $\alpha$ ultrapassa um limiar pré-definido (normalmente $0.75$ em Java `HashMap`):
  1. A capacidade do array de buckets é duplicada ($M \to 2M$).
  2. Um processo de **Rehashing** recalcula o novo índice de cada elemento existente: $\text{hash}(k) \pmod{2M}$.
- O custo do rehashing é $O(N)$, mas ocorre raramente, mantendo o custo médio por inserção em $O(1)$ amortizado.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fator de Carga (Load Factor α = N/M) e Rehashing Dinâmico</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="220" height="75" fill="#1e293b" stroke="#f43f5e" rx="6"/>
    <text x="110" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Limite de Carga Atingido</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">α = 12 itens / 16 buckets = 0.75</text>
    <text x="20" y="62" fill="#f87171" font-size="10">Colisões começam a degradar para O(N)</text>

    <path d="M 230 37 L 280 37" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow)"/>

    <g transform="translate(290, 0)">
      <rect x="0" y="0" width="230" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="115" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Rehash: Capacidade Duplicada (32)</text>
      <text x="20" y="45" fill="#f8fafc" font-size="11">Novo α = 12 / 32 = 0.375</text>
      <text x="20" y="62" fill="#34d399" font-size="10">Itens redistribuídos: Custo Amortizado O(1)</text>
    </g>
  </g>
  <text x="340" y="160" fill="#94a3b8" font-size="11" text-anchor="middle">Em Go e Java, o threshold padrão de redimensionamento é 0.75 (ou 6.5 em Go map)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fator de Carga (Load Factor α = N/M) e Rehashing Dinâmico</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="220" height="75" fill="#1e293b" stroke="#f43f5e" rx="6"/>
    <text x="110" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Limite de Carga Atingido</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">α = 12 itens / 16 buckets = 0.75</text>
    <text x="20" y="62" fill="#f87171" font-size="10">Colisões começam a degradar para O(N)</text>

    <path d="M 230 37 L 280 37" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#arrow)"/>

    <g transform="translate(290, 0)">
      <rect x="0" y="0" width="230" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="115" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Rehash: Capacidade Duplicada (32)</text>
      <text x="20" y="45" fill="#f8fafc" font-size="11">Novo α = 12 / 32 = 0.375</text>
      <text x="20" y="62" fill="#34d399" font-size="10">Itens redistribuídos: Custo Amortizado O(1)</text>
    </g>
  </g>
  <text x="340" y="160" fill="#94a3b8" font-size="11" text-anchor="middle">Em Go e Java, o threshold padrão de redimensionamento é 0.75 (ou 6.5 em Go map)</text>

</svg>

| Fator de Carga ($\alpha$) | Risco de Colisão | Ocupação de Memória |
|---|---|---|
| **$\alpha < 0.5$** | Muito baixo (rápido) | Desperdício de memória |
| **$\alpha = 0.75$ (Ideal)** | Balanceamento ótimo | Trade-off equilibrado |
| **$\alpha > 1.0$** | Altíssimo (degradação) | Array superlotado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Pré-dimensionar a capacidade inicial do mapa ao conhecer o volume de dados (`new HashMap<>(expectedSize / 0.75f)`) elimina rehashings custosos durante a execução.

</details>
