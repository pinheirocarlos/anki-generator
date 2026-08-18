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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/multilevel-page-tables-cr3-walk-loop.webm">
    <p>Visualização: Árvore de tradução hierárquica (PGD -> PUD -> PMD -> PTE) economizando memória para espaços esparsos.</p>
  </video>
</div>

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
