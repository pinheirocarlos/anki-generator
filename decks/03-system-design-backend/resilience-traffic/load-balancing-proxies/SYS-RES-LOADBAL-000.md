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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Load Balancers: Camada L4 (Transporte) vs Camada L7 (Aplicação)</text>
  <g transform="translate(40, 50)">
    <!-- L4 -->
    <rect x="0" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="140" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">L4 Load Balancer (IP / Porta TCP)</text>
    <text x="140" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Não abre payload HTTP (Zero SSL decrypt)</text>
    <text x="140" y="70" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Throughput altíssimo (Milhões de QPS)</text>
    <text x="140" y="92" fill="#94a3b8" font-size="9" text-anchor="middle">Exemplos: AWS NLB, Linux IPVS, HAProxy TCP</text>

    <!-- L7 -->
    <rect x="320" y="0" width="280" height="115" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">L7 Load Balancer (HTTP / HTTPS / gRPC)</text>
    <text x="460" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Inspeciona Headers, Cookies, Path (/api/v2)</text>
    <text x="460" y="70" fill="#86efac" font-size="10" text-anchor="middle">Roteamento inteligente por URL e SSL Termination</text>
    <text x="460" y="92" fill="#94a3b8" font-size="9" text-anchor="middle">Exemplos: AWS ALB, NGINX, Envoy, Traefik</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Topologia clássica: L4 na borda distribuindo para um pool de proxies reversos L7 escalonados horizontalmente.</text>

</svg>
<p>Visualização: Load Balancer L4 operando por IP/Porta sem abrir payload vs L7 inspecionando cabeçalhos HTTP, cookies e rotas.</p>

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
