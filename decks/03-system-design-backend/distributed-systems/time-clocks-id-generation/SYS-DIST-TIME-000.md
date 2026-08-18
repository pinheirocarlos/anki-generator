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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/vector-clocks-causality-tracking-concurrent-loop.webm">
    <p>Visualização: Vector Clocks rastreando causalidade entre nós distribuídos e detectando conflitos de escrita concorrentes.</p>
  </video>
</div>

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
