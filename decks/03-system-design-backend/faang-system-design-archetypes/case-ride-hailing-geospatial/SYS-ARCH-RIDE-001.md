---
id: SYS-ARCH-RIDE-001
title: "Arquitetura de Matching Motorista-Passageiro e Atualizações de GPS em Alta Frequência"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::uber
  - freq::high
---

## Pergunta
Como dimensionar a ingestão e matching de localização GPS de 1 milhão de motoristas emitindo coordenadas a cada 4 segundos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Dimensionamento de Ingestão**:
  - $1.000.000 \text{ motoristas} / 4 \text{ s} = 250.000 \text{ QPS de gravação de GPS}$.
  - Gravar diretamente em disco no PostgreSQL/MySQL causaria colapso de I/O.
- **Arquitetura de Armazenamento em Memória**:
  1. O app do motorista envia `(driver_id, lat, lng, status)` via WebSocket/gRPC para um cluster de ingestão.
  2. O cluster calcula o índice H3 da coordenada e grava no **Redis Geospatial / Cluster em Memória shardeado por cidade**:
     - `GEOADD drivers:sp lng lat driver_id` (armazenado como Sorted Set de 52 bits).
  3. **Matching de Corrida**:
     - Passageiro solicita corrida em `(lat_p, lng_p)`.
     - O backend executa `GEORADIUSBYMEMBER` ou busca nos hexágonos H3 vizinhos (*k-ring* de raio 2 km) em **$O(\log N)$ na RAM**, filtrando motoristas livres em milissegundos.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Arquitetura de Matching Motorista-Passageiro e Streaming de GPS</text>
  <g transform="translate(30, 50)">
    <!-- Driver GPS -->
    <rect x="0" y="10" width="130" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="65" y="32" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Motoristas (1M+)</text>
    <text x="65" y="55" fill="#cbd5e1" font-size="9" text-anchor="middle">GPS a cada 4s (gRPC)</text>
    <text x="65" y="75" fill="#86efac" font-size="9" text-anchor="middle">250.000 QPS de ingestão</text>

    <!-- Location Buffer (Redis) -->
    <rect x="170" y="10" width="150" height="90" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="245" y="35" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Redis Geospatial</text>
    <text x="245" y="55" fill="#fde68a" font-size="9" text-anchor="middle">GEOADD / H3 Index</text>
    <text x="245" y="75" fill="#cbd5e1" font-size="9" text-anchor="middle">TTL curto na memória RAM</text>

    <!-- Match Engine -->
    <rect x="360" y="0" width="260" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="490" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Match Engine (DISPATCH)</text>
    <text x="490" y="48" fill="#86efac" font-size="9" text-anchor="middle">1. Consulta anel H3 de raio 1km (k-ring=2)</text>
    <text x="490" y="68" fill="#cbd5e1" font-size="9" text-anchor="middle">2. Ranking por ETA real + histórico de aceitação</text>
    <text x="490" y="90" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">3. Dispara oferta via WebSocket com timeout 15s</text>
  </g>
  <text x="340" y="198" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">O particionamento de memória por célula H3 isola o tráfego de cada cidade sem interdependência global.</text>

</svg>

| Camada | Tecnologia | Função no Sistema |
|---|---|---|
| **Ingestão (250k QPS)** | WebSockets + Kafka | Absorção e validação do fluxo de telemetria |
| **Localização em Tempo Real** | Redis Cluster em RAM | Localização atual e buscas espaciais sub-5ms |
| **Histórico / Faturamento** | Apache Cassandra / S3 | Armazenamento analítico e auditoria de viagens |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Algoritmo de Despacho em Lote (Batch Matching)
- Em vez de atribuir a corrida instantaneamente ao primeiro motorista que aceitar (First-Come First-Served), o motor de matching agrupa requisições de passageiros e motoristas em **janelas de 5 a 10 segundos** e resolve um problema de otimização combinatória (*Bipartite Matching*) minimizando o tempo total de espera global.

</details>
