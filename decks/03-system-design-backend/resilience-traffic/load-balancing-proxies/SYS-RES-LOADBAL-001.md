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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmos de Balanceamento: Round Robin vs Least Connections vs IP Hash</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
    <text x="90" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Round Robin / Weighted</text>
    <text x="90" y="48" fill="#cbd5e1" font-size="9" text-anchor="middle">Distribuição sequencial circular</text>
    <text x="90" y="70" fill="#cbd5e1" font-size="9" text-anchor="middle">Assume requisições homogêneas</text>
    <text x="90" y="92" fill="#86efac" font-size="9" text-anchor="middle">Ideal para servidores idênticos</text>

    <rect x="210" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="300" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Least Connections</text>
    <text x="300" y="48" fill="#cbd5e1" font-size="9" text-anchor="middle">Envia para o nó com menor carga</text>
    <text x="300" y="70" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">Ideal para conexões longas</text>
    <text x="300" y="92" fill="#a7f3d0" font-size="9" text-anchor="middle">(WebSocket, banco, uploads)</text>

    <rect x="420" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1"/>
    <text x="510" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">IP / Consistent Hash</text>
    <text x="510" y="48" fill="#cbd5e1" font-size="9" text-anchor="middle">Hash(Client_IP) % N</text>
    <text x="510" y="70" fill="#fde68a" font-size="9" text-anchor="middle">Sticky Sessions / Local Cache</text>
    <text x="510" y="92" fill="#cbd5e1" font-size="9" text-anchor="middle">Garante mesmo nó por cliente</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Weighted Least Connections é o algoritmo padrão para tráfego heterogêneo em produção.</text>

</svg>

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
