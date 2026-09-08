---
id: SYS-LLD-CASES-006
title: "Intuição Fundamental de Estudos de Caso LLD: A Modelagem de Entidades e Contratos do Mundo Real"
tags:
  - level::l2-fundamental
  - topic::sys::lld
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a intuição fundamental para resolver problemas de Low-Level Design (LLD / Modelagem Orientada a Objetos como Parking Lot ou Vending Machine)?

## Resposta
### Quick Answer
**Solução Direta**:
- Em Low-Level Design (LLD), o objetivo não é escolher bancos de dados ou servidores, mas **modelar a lógica de domínio interna de um sistema usando código limpo, orientado a objetos e desacoplado**:
  1. **Passo 1 (Descobrir Entidades)**: Identificar os substantivos principais (ex: `Vehicle`, `ParkingSpot`, `Ticket`, `Payment`).
  2. **Passo 2 (Definir Relações & Herança/Composição)**: Um `Car` e um `Truck` são tipos de `Vehicle`; um `ParkingLot` tem múltiplos `ParkingFloor`.
  3. **Passo 3 (Definir Contratos/Interfaces)**: Isolar estratégias que podem mudar (ex: `FeeCalculationStrategy` por hora ou diária).
  4. **Passo 4 (Thread-Safety & Concorrência)**: Garantir que duas pessoas não recebam a mesma vaga simultaneamente usando travas atômicas (`Mutex / ReentrantLock`).

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">O Framework de 4 Passos para Entrevistas de LLD</text>

  <!-- Passo 1: Entidades -->
  <g transform="translate(35, 50)">
    <rect x="0" y="0" width="115" height="90" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="57" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">1. Entidades</text>
    <text x="57" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Achar substantivos</text>
    <text x="57" y="62" fill="#64748b" font-size="8" text-anchor="middle">Vehicle, Spot, Ticket</text>
    <circle cx="57" cy="78" r="3" fill="#3b82f6" />
  </g>

  <!-- Passo 2: Relações -->
  <g transform="translate(170, 50)">
    <rect x="0" y="0" width="115" height="90" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="57" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">2. Relações</text>
    <text x="57" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Composição &gt; Herança</text>
    <text x="57" y="62" fill="#64748b" font-size="8" text-anchor="middle">1 Lot tem N Floors</text>
    <circle cx="57" cy="78" r="3" fill="#3b82f6" />
  </g>

  <!-- Passo 3: Padrões -->
  <g transform="translate(305, 50)">
    <rect x="0" y="0" width="115" height="90" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="57" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">3. Design Patterns</text>
    <text x="57" y="44" fill="#ffffff" font-size="9" text-anchor="middle">Estratégias flexíveis</text>
    <text x="57" y="62" fill="#34d399" font-size="8" text-anchor="middle">Strategy, Factory</text>
    <circle cx="57" cy="78" r="3" fill="#10b981" />
  </g>

  <!-- Passo 4: Concorrência -->
  <g transform="translate(440, 50)">
    <rect x="0" y="0" width="125" height="90" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="6" />
    <text x="62" y="22" fill="#fde68a" font-size="11" font-weight="bold" text-anchor="middle">4. Concorrência</text>
    <text x="62" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">Thread-Safety</text>
    <text x="62" y="62" fill="#f59e0b" font-size="8" text-anchor="middle">Mutex / Locks / Atomic</text>
    <circle cx="62" cy="78" r="3" fill="#f59e0b" />
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Evite código espaguete: mantenha classes pequenas e com responsabilidades únicas!</text>
</svg>
<p>Visualização: Framework estruturado de quatro etapas para entrevistas de Low-Level Design (LLD): Entidades, Contratos, Relacionamentos e Concorrência.</p>

| Etapa de LLD | O que Entregar | Analogia do Cotidiano |
|---|---|---|
| **Modelo de Classes** | Diagrama de classes limpo com métodos e atributos | As regras e componentes de um jogo de tabuleiro antes de começar a jogar. |
| **Padrões & Concorrência** | Estratégia de precificação e controle de vagas | A cancela eletrônica que só abre se houver vaga confirmada no sensor. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo do Caso de Estudo: Parking Lot
- **Entidades**: `Vehicle` (interface com métodos `GetSize()`), `CompactSpot`, `LargeSpot`, `ParkingLot` (Singleton).
- **Strategy Pattern para Cálculo de Taxa**:
  - `HourlyRateStrategy`: $R\$ 10$ por hora.
  - `FlatRateStrategy`: $R\$ 50$ diária fixa.
- **Concorrência**: Quando um carro tenta estacionar, o método `ParkVehicle()` usa um lock local para marcar o spot como ocupado atomicamente.

#### Key Takeaways
- LLD avalia sua proficiência em código limpo, design modular, boas práticas de POO e concorrência multithread.

</details>
