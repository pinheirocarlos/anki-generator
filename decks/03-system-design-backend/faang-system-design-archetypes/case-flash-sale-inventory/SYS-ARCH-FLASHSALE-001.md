---
id: SYS-ARCH-FLASHSALE-001
title: "Filas Virtuais de Espera (Virtual Waiting Room) e Liberação de Inventário por Timeout"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::ticketmaster
  - freq::high
---

## Pergunta
Como salas de espera virtuais (Virtual Waiting Room) e expiração automática de reservas protegem sistemas de ingressos sob demanda extrema?

## Resposta
### Quick Answer
**Solução Direta**:
- **Sala de Espera Virtual (Virtual Waiting Room)**:
  - Diante de 5 milhões de pessoas disputando 50.000 ingressos, o tráfego de entrada é retido em uma camada de borda (Cloudflare / Gateway).
  - Cada usuário recebe um **número de fila sequencial criptografado (Token de Fila)**.
  - O backend libera a entrada de novos usuários para a tela de checkout a uma taxa controlada e estável (ex: exatamente 500 usuários por segundo).
- **Liberação Automática de Inventário (Holding Pattern)**:
  - Ao reservar um assento, o usuário tem **10 minutos para concluir o pagamento**.
  - O sistema agenda uma mensagem atrasada (*Delayed Message* no SQS/Kafka). Se a confirmação de pagamento não chegar aos 10 minutos, o worker cancela a reserva e **devolve o estoque ao Redis automaticamente**.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Sala de Espera Virtual (Virtual Waiting Room) &amp; Liberação por TTL</text>
  <g transform="translate(40, 50)">
    <!-- Waiting Room -->
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Sala de Espera Virtual</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">1.000.000 usuários em fila</text>
    <text x="140" y="65" fill="#86efac" font-size="10" text-anchor="middle">Libera 1.000 tokens/segundo (Leaky Bucket)</text>
    <text x="140" y="88" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Protege o Checkout Backend</text>

    <!-- Order Reservation TTL -->
    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Reserva com TTL (15 minutos)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Se usuário pagar: status='PAID'</text>
    <text x="460" y="65" fill="#f87171" font-size="10" text-anchor="middle">Se TTL expirar sem pagamento:</text>
    <text x="460" y="88" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Devolve estoque ao Redis (+1)</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Garante que inventário bloqueado por desistência volta automaticamente à venda para outros clientes.</text>

</svg>
<p>Visualização: Sala de espera virtual liberando tokens de compra gradualmente e devolvendo estoque não pago após expiração do TTL.</p>

| Componente | Papel Arquitetural | Proteção do Sistema |
|---|---|---|
| **Virtual Waiting Room** | Retém usuários na borda via fila justa | Impede sobrecarga de CPU/Rede no backend |
| **Fila de Expiração (10 min)** | Libera reservas não pagas via Delayed Queue | Garante 100% de ocupação do inventário |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Prevenção de Bots e Fraudes
- A sala de espera implementa verificação de **Proof of Work (PoW) no navegador** ou reCAPTCHA v3 para garantir que os números da fila sejam emitidos para humanos reais, frustrando scripts automatizados de compra.

</details>
