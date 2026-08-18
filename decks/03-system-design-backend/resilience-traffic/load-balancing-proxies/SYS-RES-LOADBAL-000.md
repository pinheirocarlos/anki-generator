---
id: SYS-RES-LOADBAL-000
title: "Load Balancers de Camada 4 (Transporte) vs Camada 7 (Aplicação)"
tags:
  - level::l3-junior
  - topic::sys::resilience
  - company::cloudflare
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre Load Balancers de Camada 4 (L4) e Camada 7 (L7) em termos de inspeção de pacotes e latência?

## Resposta
### Quick Answer
**Solução Direta**:
- **Layer 4 Load Balancer (L4 - Transporte / TCP/UDP)**:
  - Roteia pacotes baseando-se estritamente em **IP de origem/destino e Porta TCP/UDP**.
  - Não inspeciona nem decodifica o payload HTTP ou TLS; opera na camada do Kernel (via IPVS/Maglev) com **altíssimo throughput e latência sub-milissegundo**.
- **Layer 7 Load Balancer (L7 - Aplicação / HTTP/gRPC)**:
  - Termina a conexão TCP e o handshake TLS, decodificando o cabeçalho HTTP, URLs, Cookies e payload.
  - Permite **roteamento inteligente** (ex: `/api/v1/payments` vai para o cluster A; cabeçalho `User-Agent: Mobile` vai para o cluster B), com custo de maior consumo de CPU e memória.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/load-balancer-l4-transport-vs-l7-application-loop.webm">
    <p>Visualização: Load Balancer L4 operando por IP/Porta sem abrir payload vs L7 inspecionando cabeçalhos HTTP, cookies e rotas.</p>
  </video>
</div>

| Critério de Comparação | Layer 4 (L4 - ex: AWS NLB, Maglev) | Layer 7 (L7 - ex: AWS ALB, NGINX, Envoy) |
|---|---|---|
| **Informações Analisadas** | Apenas IP e Porta TCP/UDP | Headers HTTP, Cookies, Path URL, JWT |
| **Término de TLS** | Passagem direta de pacotes (Pass-through) | Termina TLS e inspeciona dados |
| **Throughput / Latência** | Ultra-rápido (Milhões de conexões/seg) | Moderado (Exige decodificação de aplicação) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Arquitetura em Duas Camadas nas FAANG
- Grandes plataformas utilizam ambos em série:
  `Internet -> L4 Load Balancer (Maglev/ECMP) -> L7 Reverse Proxies (NGINX/Envoy) -> Microsserviços`.

</details>
