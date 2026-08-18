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
