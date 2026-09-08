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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Padrão Strategy + Factory: Eliminação de Switch Cases Gigantes</text>
  <g transform="translate(40, 50)">
    <!-- Factory -->
    <rect x="0" y="20" width="160" height="90" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="80" y="42" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">PaymentFactory</text>
    <text x="80" y="65" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">GetStrategy(type)</text>
    <text x="80" y="85" fill="#86efac" font-size="9" text-anchor="middle">Instanciação dinâmica</text>

    <!-- Interface -->
    <rect x="200" y="20" width="180" height="90" rx="6" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="290" y="45" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">&lt;&lt;interface&gt;&gt; PaymentStrategy</text>
    <text x="290" y="72" fill="#e0f2fe" font-size="10" font-family="monospace" text-anchor="middle">+ Pay(amount) error</text>

    <!-- Concrete Strategies -->
    <g transform="translate(420, 0)">
      <rect x="0" y="0" width="160" height="34" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="80" y="22" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">CreditCardStrategy</text>

      <rect x="0" y="42" width="160" height="34" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="80" y="64" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">PixPaymentStrategy</text>

      <rect x="0" y="84" width="160" height="34" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1"/>
      <text x="80" y="106" fill="#86efac" font-size="9" font-weight="bold" text-anchor="middle">CryptoPaymentStrategy</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Adesão perfeita ao Open/Closed Principle (OCP): novos métodos de pagamento são adicionados sem alterar código existente.</text>

</svg>
<p>Visualização: Substituição de condicionais por polimorfismo instanciando algoritmos via Factory e executando via interface Strategy.</p>

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
