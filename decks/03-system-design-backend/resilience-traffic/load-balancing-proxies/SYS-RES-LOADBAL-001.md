---
id: SYS-RES-LOADBAL-001
title: "Algoritmos de Balanceamento: Round Robin, Weighted Least Connections e IP Hash"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::netflix
  - freq::high
---

## Pergunta
Quando escolher entre os algoritmos de balanceamento Round Robin, Weighted Least Connections e Consistent IP Hash em proxies reversos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Round Robin Ponderado (Weighted Round Robin)**:
  - Distribui requisições sequencialmente respeitando o peso/capacidade de cada servidor.
  - Ideal quando todas as requisições possuem custo de processamento uniforme e homogêneo.
- **Weighted Least Connections (Menos Conexões)**:
  - Encaminha a nova requisição para o servidor com o **menor número de conexões ativas no momento**.
  - Superior para conexões de longa duração (WebSockets, queries pesadas de banco, streaming) onde requisições acumulam em servidores sobrecarregados.
- **Consistent IP Hash (Sticky Session)**:
  - Mapeia o IP do cliente para o mesmo servidor backend físico, aproveitando caches locais na memória do nó.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/load-balancer-algorithms-least-connections-round-robin-loop.webm">
    <p>Visualização: Algoritmo Least Connections distribuindo conexões para o servidor com menor número de sessões ativas.</p>
  </video>
</div>

| Algoritmo | Critério de Decisão | Cenário Recomendado |
|---|---|---|
| **Round Robin** | Sequencial circular com pesos | APIs stateless com requisições rápidas e uniformes |
| **Least Connections** | Menor quantidade de conexões ativas | WebSockets, uploads lentos e queries longas |
| **IP / Key Hash** | Hash do IP ou Header do cliente | Sessões com cache em memória no nó local |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Algoritmo 'Power of Two Random Choices'
- Em vez de consultar todos os $N$ servidores para achar o com menos conexões ($O(N)$), o LB sorteia 2 servidores aleatórios e escolhe o menos carregado entre os dois. Reduz o overhead de monitoramento a zero com eficácia estatística comparável a $O(N)$.

</details>
