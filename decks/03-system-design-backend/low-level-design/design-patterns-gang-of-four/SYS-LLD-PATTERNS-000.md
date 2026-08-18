---
id: SYS-LLD-PATTERNS-000
title: "Padrões Estratégia (Strategy) e Fábrica (Factory Method) para Eliminar Condicionais"
tags:
  - level::l3-junior
  - topic::sys::lld
  - company::amazon
  - freq::high
---

## Pergunta
Como a combinação dos padrões Strategy e Factory Method substitui blocos complexos de `if/else` e `switch/case` por código extensível (Open/Closed Principle)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Problema de Design**: Métodos com longos blocos `switch (paymentType)` violam o princípio Aberto/Fechado (OCP), pois adicionar uma nova forma de pagamento exige alterar e retestar a classe principal.
- **Solução Strategy + Factory**:
  1. **Strategy**: Define uma interface comum (ex: `PaymentStrategy`) implementada por classes concretas independentes (`CreditCardPayment`, `PixPayment`, `BoletoPayment`).
  2. **Factory**: Mapeia o tipo solicitado para a instância correta da Strategy (usando um mapa estático ou registro dinâmico).
  3. A classe consumidora apenas invoca `factory.getStrategy(type).pay(amount)` em tempo constante sem condicionais aninhadas.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/design-patterns-strategy-factory-polymorphism-loop.webm">
    <p>Visualização: Substituição de condicionais por polimorfismo instanciando algoritmos via Factory e executando via interface Strategy.</p>
  </video>
</div>

| Abordagem | Manutenibilidade | Aderência ao OCP |
|---|---|---|
| **`switch/case` Monolítico** | Frágil (cresce indefinidamente com risco de regressão) | Violação (Modifica código existente a cada novo tipo) |
| **Strategy + Factory** | **Modular (Cada algoritmo isolado em sua própria classe)** | **Total (Adiciona novos tipos criando novas classes)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementação em Java
```java
public interface PaymentStrategy {
  void pay(BigDecimal amount);
}

@Service
public class PaymentService {
  private final Map<String, PaymentStrategy> strategies;

  public PaymentService(List<PaymentStrategy> strategyList) {
    this.strategies = strategyList.stream()
      .collect(Collectors.toMap(PaymentStrategy::getType, Function.identity()));
  }

  public void executePayment(String type, BigDecimal amount) {
    PaymentStrategy strategy = strategies.get(type);
    if (strategy == null) throw new IllegalArgumentException("Unsupported type");
    strategy.pay(amount);
  }
}
```

</details>
