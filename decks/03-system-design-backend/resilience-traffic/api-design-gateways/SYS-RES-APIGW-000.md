---
id: SYS-RES-APIGW-000
title: "API Gateway Pattern e Backend-for-Frontend (BFF)"
tags:
  - level::l3-junior
  - topic::sys::resilience
  - company::netflix
  - freq::high
---

## Pergunta
Qual é o papel arquitetural de um API Gateway e quando adotar a variação Backend-for-Frontend (BFF)?

## Resposta
### Quick Answer
**Solução Direta**:
- **API Gateway**:
  - Atua como ponto único de entrada para todos os clientes externos.
  - Centraliza preocupações transversais (*Cross-Cutting Concerns*): autenticação/autorização JWT, rate limiting, terminação SSL, agregação de dados e métricas.
- **Backend-for-Frontend (BFF)**:
  - Cria gateways específicos dedicados para cada tipo de cliente (ex: um BFF para Mobile iOS/Android, um BFF para Web SPA e um BFF para Smart TVs).
  - O BFF formata, compacta e filtra o payload sob medida para as necessidades específicas de rede e layout de cada plataforma (ex: mobile recebe payload enxuto de 2 KB; web recebe 50 KB com dados analíticos).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/api-gateway-pattern-bff-aggregation-loop.webm">
    <p>Visualização: API Gateway agregando chamadas de microsserviços e BFF customizando respostas para interfaces mobile e web.</p>
  </video>
</div>

| Padrão | Quantidade de Gateways | Vantagem Principal |
|---|---|---|
| **API Gateway Central** | 1 Gateway para todos os clientes | Centralização e manutenção simplificada |
| **BFF (Backend-for-Frontend)** | 1 Gateway por experiência de cliente | Payloads sob medida e evolução desacoplada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Benefício de Agregação de Chamadas
- Em vez de um app mobile disparar 5 chamadas HTTP separadas pela rede celular (3G/4G com alta latência), ele faz 1 chamada ao BFF, que executa as 5 chamadas internamente no data center via gRPC em sub-milissegundos e retorna a resposta consolidada.

</details>
