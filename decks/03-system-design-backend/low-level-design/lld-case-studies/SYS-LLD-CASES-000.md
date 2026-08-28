---
id: SYS-LLD-CASES-000
title: "Low-Level Design: Sistema de Estacionamento (Parking Lot) com Enums e Polimorfismo"
tags:
  - level::l3-junior
  - topic::sys::lld
  - company::amazon
  - freq::high
---

## Pergunta
Como modelar as classes, enums e regras de alocação de vagas para um Estacionamento (Parking Lot) multi-andares em Low-Level Design?

## Resposta
### Quick Answer
**Solução Direta**:
- **Entidades Principais**:
  - `VehicleType` (Enum: `MOTORCYCLE`, `COMPACT`, `LARGE`).
  - `ParkingSpot` (Abstração com tipos `MotorcycleSpot`, `CompactSpot`, `LargeSpot`, status `isFree`, atributo `spotNumber`).
  - `ParkingFloor` (Coleção de vagas agrupadas por tipo, calcula disponibilidade em $O(1)$).
  - `ParkingLot` (Singleton que gerencia múltiplos andares, emite e valida `Ticket`).
  - `Ticket` (Contém `ticketId`, `spotAssigned`, `entryTime`, `vehiclePlate`).
- **Estratégia de Vagas**: Utiliza uma interface `ParkingStrategy` (ex: `NearestToEntranceStrategy`) para desacoplar a lógica de busca.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">LLD Case Study: Sistema de Estacionamento Orientado a Objetos (Parking Lot)</text>
  <g transform="translate(40, 50)">
    <!-- ParkingLot Hierarchy -->
    <rect x="0" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="90" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">ParkingLot (Singleton)</text>
    <text x="90" y="45" fill="#cbd5e1" font-size="9" text-anchor="middle">- List&lt;ParkingFloor&gt;</text>
    <text x="90" y="65" fill="#cbd5e1" font-size="9" text-anchor="middle">- EntrancePanels</text>
    <text x="90" y="85" fill="#cbd5e1" font-size="9" text-anchor="middle">- ExitPanels</text>
    <text x="90" y="105" fill="#86efac" font-size="9" text-anchor="middle">+ AssignTicket(Vehicle)</text>

    <!-- ParkingSpot Hierarchy -->
    <rect x="210" y="0" width="180" height="120" rx="6" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="300" y="22" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">&lt;&lt;abstract&gt;&gt; ParkingSpot</text>
    <text x="300" y="45" fill="#e0f2fe" font-size="9" text-anchor="middle">- CompactSpot</text>
    <text x="300" y="65" fill="#e0f2fe" font-size="9" text-anchor="middle">- LargeSpot (Trucks)</text>
    <text x="300" y="85" fill="#e0f2fe" font-size="9" text-anchor="middle">- ElectricSpot (Charger)</text>
    <text x="300" y="105" fill="#86efac" font-size="9" text-anchor="middle">+ IsFree() / Occupy()</text>

    <!-- Pricing Strategy -->
    <rect x="420" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="510" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">PricingStrategy</text>
    <text x="510" y="45" fill="#cbd5e1" font-size="9" text-anchor="middle">- HourlyPricing</text>
    <text x="510" y="65" fill="#cbd5e1" font-size="9" text-anchor="middle">- DynamicSurgePricing</text>
    <text x="510" y="85" fill="#cbd5e1" font-size="9" text-anchor="middle">- FlatRatePricing</text>
    <text x="510" y="105" fill="#34d399" font-size="9" text-anchor="middle">+ CalculateFee(Ticket)</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Separação estrita de responsabilidades: concorrência protegida por Mutex por vaga ou andar.</text>

</svg>

| Classe | Responsabilidade Central | Relacionamentos |
|---|---|---|
| **`ParkingLot`** | Ponto de entrada, emite tickets e calcula tarifas | Contém múltiplos `ParkingFloor` |
| **`ParkingFloor`** | Gerencia vagas do andar e calcula vagas livres | Contém múltiplos `ParkingSpot` |
| **`Ticket`** | Comprovante de entrada com timestamp e vaga | Vinculado a 1 `Vehicle` e 1 `ParkingSpot` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Assinaturas em Java
```java
public class Ticket {
  private final String ticketId;
  private final Instant entryTime;
  private final ParkingSpot spot;
  private final Vehicle vehicle;
}

public interface FeeCalculationStrategy {
  BigDecimal calculateFee(Ticket ticket, Instant exitTime);
}
```

</details>
