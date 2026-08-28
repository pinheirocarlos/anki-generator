---
id: DSA-PATT-INTERVAL-000
title: "Padrão de Ordenação Inicial por Início de Intervalo para Merge Intervals"
tags:
  - level::l3-junior
  - topic::dsa::intervals-merge
  - company::meta
  - freq::high
---

## Pergunta
Por que a ordenação preliminar dos intervalos por seu ponto de início (`start`) é a chave para resolver problemas de sobreposição em $O(N \log N)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Sem ordenação, qualquer intervalo poderia sobrepor qualquer outro, exigindo comparações de todos os pares em $O(N^2)$.
- Ao ordenar os intervalos por $\text{start}_i$ em ordem crescente:
  - Garantimos que se um intervalo $B$ sobrepõe o intervalo $A$, então obrigatoriamente $\text{start}_A \le \text{start}_B$.
  - A sobreposição depende unicamente de verificar se o início do próximo intervalo é menor ou igual ao fim do intervalo atual: $\text{start}_B \le \text{end}_A$.
  - Isso reduz o processamento a uma única varredura linear $O(N)$ após a ordenação $O(N \log N)$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Merge Overlapping Intervals: Ordenação por Início e Fusão em O(N log N)</text>
  <g transform="translate(100, 50)">
    <rect x="0" y="10" width="120" height="24" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="3"/><text x="60" y="26" fill="#fff" font-size="10" text-anchor="middle">[1, 5]</text>
    <rect x="80" y="30" width="120" height="24" fill="#1e293b" stroke="#f59e0b" stroke-width="2" rx="3"/><text x="140" y="46" fill="#fff" font-size="10" text-anchor="middle">[3, 8]</text>

    <g transform="translate(240, 15)">
      <path d="M 0 20 L 40 20" stroke="#10b981" stroke-width="2.5" marker-end="url(#arrow)"/>
      <rect x="50" y="5" width="180" height="32" fill="#065f46" stroke="#10b981" stroke-width="2" rx="4"/>
      <text x="140" y="25" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">[1, max(5, 8)] = [1, 8]</text>
    </g>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Se curr.start &lt;= prev.end → Funde os intervalos estendendo prev.end</text>

</svg>

| Estratégia de Intervalos | Comparações Necessárias | Complexidade Total |
|---|---|---|
| **Sem Ordenação** | Compara todos os pares $(i, j)$ | $O(N^2)$ |
| **Com Ordenação por Start** | Varredura linear sequencial | $O(N \log N)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Em qualquer problema envolvendo intervalos no LeetCode, o primeiro passo padrão deve ser ordenar por `start` (ou por `end` em problemas de agendamento guloso).

</details>
