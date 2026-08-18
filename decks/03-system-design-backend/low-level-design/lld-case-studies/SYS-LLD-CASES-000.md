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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/lld-parking-lot-class-diagram-polymorphism-loop.webm">
    <p>Visualização: Modelagem orientada a objetos de estacionamento com hierarquia de vagas, estratégia de alocação e cálculo de tarifas.</p>
  </video>
</div>

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
