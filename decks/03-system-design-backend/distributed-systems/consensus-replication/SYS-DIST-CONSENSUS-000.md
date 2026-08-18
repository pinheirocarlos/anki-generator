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
