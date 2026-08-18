---
id: CS-ARCH-CACHE-004
title: "Protocolo de Coerência de Cache MESI (Modified, Exclusive, Shared, Invalid)"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::google
  - freq::high
---

## Pergunta
Como o protocolo de coerência de cache **MESI** coordena a consistência de dados entre caches L1/L2 em múltiplos núcleos de CPU?

## Resposta
### Quick Answer
**Solução Direta**:
- O protocolo **MESI** atribui um de quatro estados a cada Cache Line presente nos caches locais dos núcleos:
  - **M (Modified)**: A linha foi alterada no cache local e está divergente da RAM principal; nenhum outro núcleo a possui.
  - **E (Exclusive)**: A linha está idêntica à RAM principal e presente **apenas** neste núcleo.
  - **S (Shared)**: A linha está idêntica à RAM e pode estar presente no cache de múltiplos núcleos (apenas leitura).
  - **I (Invalid)**: A linha contém dados obsoletos e não pode ser lida (deve ser recarregada).
- Quando um núcleo grava em uma linha no estado **Shared**, ele transmite uma mensagem de invalidação (*Bus Invalidate*) no barramento, forçando todos os outros núcleos a marcar sua cópia como **Invalid**.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/architecture/cpu-cache-l1-l2-l3-latency-loop.webm">
    <p>Visualização: Comparação de latência: L1 (~1ns), L2 (~4ns), L3 (~15ns) e RAM principal (~80ns).</p>
  </video>
</div>

| Estado MESI | No Cache Local? | Modificado vs RAM? |
|---|---|---|
| **Modified (M)** | Válido e Exclusivo | Sim (Pendente de Flush) |
| **Exclusive (E)**| Válido e Exclusivo | Não (Cópia Limpa) |
| **Shared (S)**   | Válido em Múltiplos Núcleos | Não (Cópia Limpa) |
| **Invalid (I)**  | Inválido (Requer Recarga) | Indiferente |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Transição de Estados no Barramento
1. **Leitura inicial (Núcleo 0)**: Busca na RAM $ightarrow$ entra no estado **Exclusive (E)**.
2. **Leitura concorrente (Núcleo 1)**: Núcleo 0 escuta no barramento (*snooping*) $ightarrow$ ambas as linhas passam para **Shared (S)**.
3. **Escrita (Núcleo 0)**: Núcleo 0 emite *Invalidate* $ightarrow$ Núcleo 1 muda para **Invalid (I)**, Núcleo 0 muda para **Modified (M)**.

#### Key Takeaways
- O tráfego de mensagens de invalidação no barramento (*Interconnect Traffic*) é o principal gargalo de escalabilidade linear em CPUs com dezenas de núcleos.

</details>
