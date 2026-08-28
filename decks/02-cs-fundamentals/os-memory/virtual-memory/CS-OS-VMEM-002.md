---
id: CS-OS-VMEM-002
title: "Tabelas de Páginas Multinível e Tradução de Endereços pela MMU"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::google
  - freq::high
---

## Pergunta
Como a **MMU (Memory Management Unit)** e as **Tabelas de Páginas Multinível** traduzem endereços virtuais em endereços físicos de RAM?

## Resposta
### Quick Answer
**Solução Direta**:
- A memória é dividida em blocos de tamanho fixo chamados **Páginas Virtuais** e **Page Frames Físicos** (geralmente **4 KB**).
- **Tradução pela MMU**:
  1. O registrador especial da CPU **`CR3`** armazena o ponteiro para a raiz da Tabela de Páginas do processo ativo.
  2. Um endereço virtual de 48 bits em x86-64 é dividido em índices: `PGD (Nível 4) -> PUD (Nível 3) -> PMD (Nível 2) -> PTE (Nível 1) + Offset de 12 bits`.
  3. A MMU percorre a árvore de 4 níveis (*Page Table Walk*) para encontrar o endereço base do frame físico e soma o *Offset*, gerando o endereço real de RAM em hardware.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Tabela de Páginas de 4 Níveis no x86-64 (Page Walk)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="10" width="100" height="50" rx="4" fill="#0369a1"/>
    <text x="50" y="32" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">PGD</text>
    <text x="50" y="48" fill="#bae6fd" font-size="9" text-anchor="middle">Nível 4 (CR3)</text>

    <path d="M 105 35 L 135 35" stroke="#38bdf8" stroke-width="2"/>

    <rect x="140" y="10" width="100" height="50" rx="4" fill="#0284c7"/>
    <text x="190" y="32" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">PUD</text>
    <text x="190" y="48" fill="#bae6fd" font-size="9" text-anchor="middle">Nível 3</text>

    <path d="M 245 35 L 275 35" stroke="#38bdf8" stroke-width="2"/>

    <rect x="280" y="10" width="100" height="50" rx="4" fill="#0d9488"/>
    <text x="330" y="32" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">PMD</text>
    <text x="330" y="48" fill="#ccfbf1" font-size="9" text-anchor="middle">Nível 2</text>

    <path d="M 385 35 L 415 35" stroke="#10b981" stroke-width="2"/>

    <rect x="420" y="10" width="140" height="50" rx="4" fill="#047857" stroke="#10b981" stroke-width="2"/>
    <text x="490" y="32" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">PTE (Page Table Entry)</text>
    <text x="490" y="48" fill="#a7f3d0" font-size="9" text-anchor="middle">Endereço Físico PFN</text>
  </g>
  <text x="340" y="150" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Estrutura em árvore esparsa economiza memória: aloca apenas nós para regiões virtuais efetivamente utilizadas.</text>

</svg>

| Estrutura | Função no Hardware |
|---|---|
| **Registrador `CR3`** | Aponta para a base da Tabela de Páginas do processo atual |
| **Page Table Walk (4 Níveis)**| Navegação por ponteiros da MMU para achar o frame |
| **Offset (12 bits inferiores)**| Localiza o byte exato dentro da página de 4.096 bytes |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que a Tabela é Multinível e Não Plana?
- Se a tabela de páginas fosse plana (um array único para 48 bits), cada processo precisaria de uma tabela de **512 GB** apenas para mapear seus ponteiros!
- Com arquitetura multinível em árvore, páginas de memória não alocadas pelo processo simplesmente não criam nós filhos, reduzindo o consumo de memória da tabela para poucos kilobytes.

#### Key Takeaways
- Como um *Page Table Walk* exige 4 acessos sequenciais à RAM (~200ns), a CPU utiliza o cache **TLB** para memorizar as últimas traduções.

</details>
