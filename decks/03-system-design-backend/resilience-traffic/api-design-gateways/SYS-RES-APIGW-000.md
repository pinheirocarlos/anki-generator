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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">API Gateway Pattern &amp; Backend for Frontend (BFF)</text>
  <g transform="translate(30, 50)">
    <!-- Clients -->
    <g transform="translate(0, 10)">
      <rect x="0" y="0" width="110" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
      <text x="55" y="22" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">Mobile iOS/Android</text>

      <rect x="0" y="55" width="110" height="35" rx="4" fill="#1e293b" stroke="#38bdf8" stroke-width="1"/>
      <text x="55" y="77" fill="#38bdf8" font-size="9" font-weight="bold" text-anchor="middle">Desktop Web App</text>
    </g>

    <!-- BFF Layer -->
    <g transform="translate(150, 0)">
      <rect x="0" y="0" width="150" height="45" rx="6" fill="#0284c7"/>
      <text x="75" y="24" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">BFF Mobile Gateway</text>
      <text x="75" y="38" fill="#bae6fd" font-size="8" text-anchor="middle">Payload compacto / 5G</text>

      <rect x="0" y="60" width="150" height="45" rx="6" fill="#0284c7"/>
      <text x="75" y="84" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">BFF Web Gateway</text>
      <text x="75" y="98" fill="#bae6fd" font-size="8" text-anchor="middle">Payload rico desnormalizado</text>
    </g>

    <!-- Microservices -->
    <g transform="translate(350, 0)">
      <rect x="0" y="0" width="250" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
      <text x="125" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Microsserviços Internos</text>
      <text x="125" y="48" fill="#86efac" font-size="9" text-anchor="middle">• User Service (Auth / Profile)</text>
      <text x="125" y="70" fill="#86efac" font-size="9" text-anchor="middle">• Order &amp; Payment Service</text>
      <text x="125" y="92" fill="#86efac" font-size="9" text-anchor="middle">• Inventory &amp; Catalog Service</text>
    </g>
  </g>
  <text x="340" y="198" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">O API Gateway centraliza SSL Termination, Rate Limiting, Autenticação JWT e agregação de chamadas.</text>

</svg>
<p>Visualização: API Gateway agregando chamadas de microsserviços e BFF customizando respostas para interfaces mobile e web.</p>

| Padrão | Quantidade de Gateways | Vantagem Principal |
|---|---|---|
| **API Gateway Central** | 1 Gateway para todos os clientes | Centralização e manutenção simplificada |
| **BFF (Backend-for-Frontend)** | 1 Gateway por experiência de cliente | Payloads sob medida e evolução desacoplada |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Benefício de Agregação de Chamadas
- Em vez de um app mobile disparar 5 chamadas HTTP separadas pela rede celular (3G/4G com alta latência), ele faz 1 chamada ao BFF, que executa as 5 chamadas internamente no data center via gRPC em sub-milissegundos e retorna a resposta consolidada.

</details>
