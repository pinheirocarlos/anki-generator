---
id: DSA-STRUCT-HEAP-002
title: "Representação Compacta de Heap Binário em Array Contíguo sem Ponteiros"
tags:
  - level::l3-junior
  - topic::dsa::heaps-priority-queues
  - company::google
  - freq::high
---

## Pergunta
Por que um Heap Binário pode ser representado compactamente em um **array contíguo sem ponteiros** e quais são as fórmulas de indexação?

## Resposta
### Quick Answer
**Solução Direta**:
- Como um Heap é uma árvore binária completa (preenchida nível por nível da esquerda para a direita), não existem "buracos" na estrutura.
- Cada nó no índice $i$ (indexação 0-based) mapeia diretamente para seus parentes via fórmulas aritméticas rápidas:
  - **Pai**: $\lfloor (i - 1) / 2 \rfloor$
  - **Filho Esquerdo**: $2i + 1$
  - **Filho Direito**: $2i + 2$
- Isso elimina 100% dos ponteiros de árvore, resultando em localidade de cache perfeita e zero overhead de memória.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Representação de Heap Binário em Array Contíguo</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="70" height="40" fill="#047857" stroke="#10b981" rx="4"/><text x="35" y="25" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">100 [0]</text>
    <rect x="80" y="0" width="70" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="115" y="25" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">19 [1]</text>
    <rect x="160" y="0" width="70" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/><text x="195" y="25" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">36 [2]</text>
    <rect x="240" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="275" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">17 [3]</text>
    <rect x="320" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="355" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">3 [4]</text>
    <rect x="400" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="435" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">25 [5]</text>
    <rect x="480" y="0" width="70" height="40" fill="#1e293b" stroke="#475569" rx="4"/><text x="515" y="25" fill="#94a3b8" font-size="13" text-anchor="middle">1 [6]</text>
  </g>
  <rect x="100" y="115" width="480" height="40" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1"/>
  <text x="340" y="133" fill="#34d399" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle">Pai(i) = (i - 1) / 2  |  FilhoEsq(i) = 2i + 1  |  FilhoDir(i) = 2i + 2</text>
  <text x="340" y="148" fill="#94a3b8" font-size="10" text-anchor="middle">Acesso a parentes via aritmética de índices sem alocar ponteiros extras</text>

</svg>

<p>Visualização: Mapeamento em array contíguo indexado por aritmética sem alocação de ponteiros.</p>

| Relação Familiar | Fórmula (0-Indexed) | Exemplo para Índice $i = 2$ |
|---|---|---|
| **Pai** | $(i - 1) / 2$ | $(2 - 1) / 2 = 0$ (Raiz) |
| **Filho Esquerdo** | $2i + 1$ | $2(2) + 1 = 5$ |
| **Filho Direito** | $2i + 2$ | $2(2) + 2 = 6$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O mapeamento em array contíguo torna o Heap uma das estruturas mais rápidas e eficientes em memória na computação.

</details>
