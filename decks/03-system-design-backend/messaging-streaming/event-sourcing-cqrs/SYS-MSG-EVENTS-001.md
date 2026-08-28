---
id: SYS-MSG-EVENTS-001
title: "CQRS (Command Query Responsibility Segregation) e Projeções de Leitura Assíncronas"
tags:
  - level::l4-pleno
  - topic::sys::messaging
  - company::microsoft
  - freq::high
---

## Pergunta
Como o padrão CQRS segrega os modelos de escrita (Commands) e leitura (Queries) e como as Projeções de Leitura são atualizadas?

## Resposta
### Quick Answer
**Solução Direta**:
- O **CQRS** divide a aplicação em dois modelos arquiteturais completamente isolados:
  1. **Lado de Comando (Write / Command)**: Otimizado estritamente para validação de regras de negócio complexas e gravação transacional atômica (ex: Event Store ou Postgres relacional).
  2. **Lado de Consulta (Read / Query)**: Otimizado estritamente para consultas rápidas com modelos desnormalizados prontos para exibição (ex: Elasticsearch para busca textual, Redis para ranking, MongoDB para leitura de telas).
- **Projeções de Leitura**: Consomem eventos emitidos pelo lado de comando e atualizam assincronamente as visões de leitura (*Read Models*), operando com **consistência eventual**.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">CQRS (Command Query Responsibility Segregation) com Projeções Assíncronas</text>
  <g transform="translate(30, 50)">
    <!-- Write Side -->
    <rect x="0" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="90" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">Write Model (Commands)</text>
    <text x="90" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Valida regras de negócio</text>
    <text x="90" y="70" fill="#cbd5e1" font-size="10" text-anchor="middle">Grava no Postgres OLTP</text>
    <text x="90" y="92" fill="#f87171" font-size="9" font-weight="bold" text-anchor="middle">Altamente Normalizado</text>

    <!-- Event Bus -->
    <rect x="210" y="25" width="180" height="60" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="300" y="50" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Event Bus / Kafka</text>
    <text x="300" y="70" fill="#fde68a" font-size="9" text-anchor="middle">Projeção Assíncrona</text>

    <!-- Read Side -->
    <rect x="420" y="0" width="180" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="510" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Read Model (Queries)</text>
    <text x="510" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">Elasticsearch / Read DB</text>
    <text x="510" y="70" fill="#cbd5e1" font-size="10" text-anchor="middle">Desnormalizado para UI</text>
    <text x="510" y="92" fill="#34d399" font-size="9" font-weight="bold" text-anchor="middle">Zero JOINs (O(1) Reads)</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Escalabilidade independente: escalonamento horizontal extremo da camada de leitura sem onerar o banco de escrita.</text>

</svg>

| Dimensão CQRS | Lado de Comando (Command) | Lado de Consulta (Query) |
|---|---|---|
| **Operações** | Mutação (`CreateOrder`, `CancelOrder`) | Leitura (`GetOrderDetails`, `SearchOrders`) |
| **Banco Otimizado** | Relacional ACID / Event Store | Elasticsearch, Redis, Read-Only Views |
| **Consistência** | Forte / Imediata | Eventual (Atualizado via Event Projections) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Desacoplamento de Escala
- Se sua aplicação recebe 100 leituras para cada 1 escrita, o lado de leitura pode ser escalado horizontalmente com 20 nós de Elasticsearch e Read Replicas sem impactar o nó primário de gravação de comandos.

</details>
