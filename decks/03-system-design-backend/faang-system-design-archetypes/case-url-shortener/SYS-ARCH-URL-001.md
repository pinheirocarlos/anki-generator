---
id: SYS-ARCH-URL-001
title: "TinyURL: Redirecionamento HTTP 301 vs 302 e Arquitetura de Cache com Leitura 100:1"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Qual é a diferença entre retornar HTTP 301 Moved Permanently versus HTTP 302 Found em um encurtador de URLs com razão Leitura/Escrita 100:1?

## Resposta
### Quick Answer
**Solução Direta**:
- **HTTP 301 (Moved Permanently - Redirecionamento Permanente)**:
  - O **Browser do usuário faz cache da URL de destino localmente**.
  - Requisições subsequentes ao link encurtado redirecionam direto no cliente sem tocar no servidor do encurtador.
  - **Pró**: Reduz drasticamente a carga nos servidores.
  - **Contra**: **Impede a coleta de métricas de clique e telemetria analítica** em tempo real.
- **HTTP 302 (Found - Redirecionamento Temporário)**:
  - O browser **nunca faz cache**; toda visita ao link bate obrigatoriamente no servidor do encurtador.
  - **Permite rastreamento analítico preciso de 100% dos cliques** (IP, país, dispositivo, timestamp).
- **Arquitetura 100:1**: Em razão 100:1 (ex: 100k QPS de leitura e 1k QPS de escrita), utiliza-se cluster Redis em frente ao banco de dados com política LRU, atingindo $>90\%$ de Cache Hit.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Redirecionamento HTTP: 301 (Moved Permanently) vs 302 (Found / Temporary)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">HTTP 301 (Moved Permanently)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Navegador armazena em cache permanente</text>
    <text x="140" y="65" fill="#86efac" font-size="10" text-anchor="middle">Zero latência nos cliques subsequentes</text>
    <text x="140" y="88" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Desvantagem: Impossível rastrear cliques (Analytics)</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">HTTP 302 (Found / Temporary)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Toda requisição passa pelo servidor</text>
    <text x="460" y="65" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Permite métricas de cliques, geolocalização e referrers</text>
    <text x="460" y="88" fill="#86efac" font-size="9" text-anchor="middle">Cache Redis absorve proporção 100:1 Leitura/Escrita</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Modelagem de dados: chave primária curta no DynamoDB ou Cassandra permite leituras em &lt; 2ms.</text>

</svg>

| Status HTTP | Cache no Navegador | Rastreamento Analítico de Cliques |
|---|---|---|
| **301 Moved Permanently** | Sim (Requisições futuras não batem no backend) | Parcial / Comprometido |
| **302 Found** | **Não (Toda visita bate no servidor)** | **Perfeito ($100\%$ dos cliques registrados)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Dimensionamento de Cache para 100M URLs Ativas
- Se o sistema possui 100M de URLs ativas e o topo $20\%$ das URLs gera $80\%$ do tráfego (Princípio de Pareto):
  - Capacidade necessária em RAM = $20\text{M} \times (7\text{B key} + 200\text{B target URL} + \text{overhead}) \approx 20\text{M} \times 500\text{B} = 10\text{ GB}$.
  - Cabe confortavelmente em uma única instância intermediária de Redis.

</details>
