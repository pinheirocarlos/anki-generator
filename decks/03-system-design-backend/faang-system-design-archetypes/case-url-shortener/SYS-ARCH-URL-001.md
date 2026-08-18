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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/tinyurl-http-301-vs-302-redirect-cache-loop.webm">
    <p>Visualização: Redirecionamento HTTP 302 permitindo rastrear métricas de cliques em camada de cache Redis com taxa 100:1.</p>
  </video>
</div>

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
