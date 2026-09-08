---
id: SYS-DIST-TIME-000
title: "Relógios Físicos (NTP Drift) vs Relógios Lógicos de Lamport e Vector Clocks"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::google
  - freq::high
---

## Pergunta
Por que relógios físicos de parede (Time of Day via NTP) são inadequados para ordenar eventos distribuídos e como relógios lógicos resolvem a causalidade?

## Resposta
### Quick Answer
**Solução Direta**:
- **Clock Drift e NTP**: Osciladores de quartzo em servidores sofrem desvios térmicos; sincronizações NTP podem adiantar ou atrasar bruscamente o relógio (*Clock Jumps* ou *Leap Seconds*), quebrando a ordem temporal entre servidores.
- **Relógios Lógicos de Lamport**:
  - Cada processo mantém um contador inteiro simples.
  - Ao executar um evento local, incrementa $C = C + 1$.
  - Ao enviar mensagem, envia $C$. O receptor atualiza seu relógio para $C_{local} = \max(C_{local}, C_{msg}) + 1$.
  - Estabelece a relação causal **Happens-Before ($A \rightarrow B$)**.
- **Vector Clocks**: Mantêm um vetor de inteiros por processo, permitindo detectar eventos concorrentes que causaram divergência (*Conflicting Writes*).

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Vector Clocks: Rastreamento Causal e Detecção de Conflitos Concorrentes</text>
  <g transform="translate(40, 50)">
    <!-- Node A -->
    <rect x="0" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="90" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Nó A</text>
    <text x="90" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Evento local:</text>
    <rect x="20" y="58" width="140" height="24" rx="4" fill="#0284c7"/>
    <text x="90" y="74" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">VC = [A:1, B:0, C:0]</text>
    <text x="90" y="105" fill="#94a3b8" font-size="9" text-anchor="middle">Propaga para Nó B</text>

    <!-- Node B -->
    <rect x="210" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Nó B (Recebe &amp; Altera)</text>
    <text x="300" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Merge + Inc B:</text>
    <rect x="230" y="58" width="140" height="24" rx="4" fill="#065f46"/>
    <text x="300" y="74" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">VC = [A:1, B:1, C:0]</text>
    <text x="300" y="105" fill="#86efac" font-size="9" text-anchor="middle">Aconteceu-Depois (Causal)</text>

    <!-- Concurrent Conflict -->
    <rect x="420" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="510" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Escrita Concorrente em C</text>
    <rect x="440" y="58" width="140" height="24" rx="4" fill="#7f1d1d"/>
    <text x="510" y="74" fill="#fca5a5" font-size="9" font-family="monospace" text-anchor="middle">VC = [A:1, B:0, C:1]</text>
    <text x="510" y="105" fill="#f87171" font-size="9" font-weight="bold" text-anchor="middle">Conflito! Exige Merge</text>
  </g>
  <text x="340" y="200" fill="#94a3b8" font-size="10" text-anchor="middle">Dois vetores são concorrentes se nenhum domina estritamente todos os índices do outro.</text>

</svg>
<p>Visualização: Vector Clocks rastreando causalidade entre nós distribuídos e detectando conflitos de escrita concorrentes.</p>

| Tipo de Relógio | Garantia Oferecida | Limitação Principal |
|---|---|---|
| **Físico (NTP)** | Horário aproximado de parede | Sujeito a skew/drift de dezenas de milissegundos |
| **Lamport Clock** | Ordem causal parcial estrita | Não consegue diferenciar causalidade de concorrência |
| **Vector Clock** | Detecta causalidade e concorrência explícita | Tamanho do vetor cresce com o número de nós ($O(N)$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Prático de Vector Clock
- Se o Nó A tem estado $[A:2, B:1]$ e o Nó B tem estado $[A:1, B:2]$, nenhum domina o outro: o sistema detecta um **conflito concorrente** que exige resolução via aplicação ou CRDT.

</details>
