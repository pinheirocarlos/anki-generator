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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Protocolo de Coerência de Cache MESI: Máquina de Estados</text>
  <g transform="translate(60, 45)">
    <!-- Modified -->
    <rect x="0" y="10" width="115" height="50" rx="6" fill="#7f1d1d" stroke="#ef4444" stroke-width="2"/>
    <text x="57" y="32" fill="#fca5a5" font-size="12" font-weight="bold" text-anchor="middle">M (Modified)</text>
    <text x="57" y="48" fill="#fecaca" font-size="9" text-anchor="middle">Dirty, Exclusivo</text>

    <!-- Exclusive -->
    <rect x="155" y="10" width="115" height="50" rx="6" fill="#14532d" stroke="#22c55e" stroke-width="2"/>
    <text x="212" y="32" fill="#86efac" font-size="12" font-weight="bold" text-anchor="middle">E (Exclusive)</text>
    <text x="212" y="48" fill="#bbf7d0" font-size="9" text-anchor="middle">Clean, 1 Núcleo</text>

    <!-- Shared -->
    <rect x="310" y="10" width="115" height="50" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="2"/>
    <text x="367" y="32" fill="#93c5fd" font-size="12" font-weight="bold" text-anchor="middle">S (Shared)</text>
    <text x="367" y="48" fill="#bfdbfe" font-size="9" text-anchor="middle">Clean, Multi-Core</text>

    <!-- Invalid -->
    <rect x="445" y="10" width="115" height="50" rx="6" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
    <text x="502" y="32" fill="#cbd5e1" font-size="12" font-weight="bold" text-anchor="middle">I (Invalid)</text>
    <text x="502" y="48" fill="#e2e8f0" font-size="9" text-anchor="middle">Dados Inválidos</text>
  </g>
  <g transform="translate(60, 125)">
    <rect x="0" y="0" width="560" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <text x="280" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Transições de Escrita (BusRdX): Invalida todas as cópias 'S' em outros núcleos → Estado 'M'</text>
    <text x="280" y="45" fill="#94a3b8" font-size="10" text-anchor="middle">Snooping no Barramento Compartilhado garante coerência estrita de memória entre todos os cores.</text>
  </g>

</svg>

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
