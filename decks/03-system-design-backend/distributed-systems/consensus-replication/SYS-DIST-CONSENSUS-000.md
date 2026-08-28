---
id: SYS-DIST-CONSENSUS-000
title: "Algoritmo de Consenso Raft: Eleição de Líder e Heartbeats"
tags:
  - level::l3-junior
  - topic::sys::distributed
  - company::uber
  - freq::high
---

## Pergunta
Como o algoritmo de consenso Raft realiza a eleição de um novo líder utilizando termos e timeouts aleatórios (*Election Timeout*)?

## Resposta
### Quick Answer
**Solução Direta**:
- No Raft, os nós assumem um de 3 estados: **Leader**, **Follower** ou **Candidate**.
- **Heartbeats**: O Leader envia mensagens periódicas de *AppendEntries* (heartbeats) para manter sua autoridade.
- **Eleição**:
  1. Se um Follower não recebe heartbeat antes de expirar seu **Election Timeout** aleatório (ex: 150-300 ms), ele se torna **Candidate**.
  2. O Candidate incrementa o **Termo (Term)**, vota em si mesmo e envia requisições de voto (*RequestVote*) aos demais nós.
  3. Ao receber a maioria simples dos votos ($N/2 + 1$), o candidato é eleito o novo **Leader**.
  4. Timeouts aleatórios evitam divisão de votos (*Split Votes*).

### Dual Coding Visual
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmo de Consenso Raft: Eleição de Líder e Termos</text>
  <g transform="translate(40, 50)">
    <!-- Follower State -->
    <rect x="0" y="20" width="160" height="90" rx="8" fill="#1e293b" stroke="#94a3b8" stroke-width="1.5"/>
    <text x="80" y="45" fill="#cbd5e1" font-size="12" font-weight="bold" text-anchor="middle">Follower</text>
    <text x="80" y="68" fill="#94a3b8" font-size="9" text-anchor="middle">Recebe Heartbeats</text>
    <text x="80" y="88" fill="#f87171" font-size="9" text-anchor="middle">Timeout (150-300ms)</text>

    <!-- Candidate State -->
    <rect x="220" y="20" width="160" height="90" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="300" y="45" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Candidate</text>
    <text x="300" y="68" fill="#fde68a" font-size="9" text-anchor="middle">Incrementa Term (T+1)</text>
    <text x="300" y="88" fill="#fde68a" font-size="9" text-anchor="middle">Dispara RequestVote RPC</text>

    <!-- Leader State -->
    <rect x="440" y="20" width="160" height="90" rx="8" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="520" y="45" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Leader (Eleito)</text>
    <text x="520" y="68" fill="#86efac" font-size="9" text-anchor="middle">Obteve Maioria (&gt; N/2)</text>
    <text x="520" y="88" fill="#86efac" font-size="9" text-anchor="middle">Envia AppendEntries (Heartbeat)</text>

    <!-- Arrows -->
    <line x1="160" y1="65" x2="220" y2="65" stroke="#f59e0b" stroke-width="2"/>
    <line x1="380" y1="65" x2="440" y2="65" stroke="#10b981" stroke-width="2"/>
  </g>
  <text x="340" y="210" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Randomized Election Timeout (150ms a 300ms) previne empates de voto entre candidatos simultâneos (Split Vote).</text>

</svg>

| Estado no Raft | Responsabilidade Principal | Transição |
|---|---|---|
| **Follower** | Responde a RPCs de Leader/Candidate | Vira Candidate se timeout expirar |
| **Candidate** | Solicita votos e disputa eleição | Vira Leader com maioria dos votos |
| **Leader** | Recebe escritas e replica log para followers | Vira Follower se encontrar termo maior |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Mecânica de Votação Justa
- Cada nó pode votar em no máximo 1 candidato por termo (First-Come, First-Served).
- Um nó só concede voto a um candidato cujo log esteja pelo menos tão atualizado quanto o seu próprio (*Log Completeness Rule*).

</details>
