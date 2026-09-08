---
id: SYS-LLD-PATTERNS-001
title: "Padrão Decorator vs Adapter: Modificação Dinâmica de Comportamento vs Compatibilidade"
tags:
  - level::l4-pleno
  - topic::sys::lld
  - company::google
  - freq::high
---

## Pergunta
Qual é a diferença de intenção arquitetural entre o padrão Decorator e o padrão Adapter?

## Resposta
### Quick Answer
**Solução Direta**:
- **Decorator (Envoltório de Comportamento)**:
  - **Mesma Interface**: O decorador implementa a mesma interface do objeto envolvido.
  - **Intenção**: Adicionar responsabilidades, comportamentos ou camadas dinâmicas de forma transparente e combinável em tempo de execução (ex: adicionar Compressão + Criptografia + Cache sobre um `DataStream`).
- **Adapter (Conversor de Interface)**:
  - **Interfaces Diferentes**: O adaptador converte a interface incompatível de um componente terceiro para a interface esperada pela aplicação.
  - **Intenção**: Permitir que duas classes com contratos divergentes trabalhem juntas sem alterar seu código-fonte.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Padrão Decorator (Composição de Middleware) vs Adapter (Conversão de Interface)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Decorator (Cadeia de Comportamentos)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Mantém a mesma interface</text>
    <text x="140" y="65" fill="#86efac" font-size="9" font-family="monospace" text-anchor="middle">Logging(Auth(RateLimit(Handler)))</text>
    <text x="140" y="88" fill="#34d399" font-size="9" text-anchor="middle">Envelopa dinamicamente em camadas</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Adapter (Compatibilização)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Converte interface incompatível</text>
    <text x="460" y="65" fill="#e0f2fe" font-size="9" font-family="monospace" text-anchor="middle">LegacyStripeAPI → ModernPaymentGateway</text>
    <text x="460" y="88" fill="#38bdf8" font-size="9" text-anchor="middle">Permite interoperabilidade sem reescrever legado</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Decorator adiciona responsabilidade sem herança; Adapter traduz uma assinatura de método em outra.</text>

</svg>
<p>Visualização: Decorator adicionando responsabilidades em cadeia sem alterar a interface vs Adapter convertendo interfaces incompatíveis.</p>

| Padrão GoF | Relação de Interface | Intenção Primária |
|---|---|---|
| **Decorator** | Mantém a **mesma** interface | Adiciona novas funcionalidades dinâmicas em camadas |
| **Adapter** | Converte entre interfaces **diferentes** | Compatibiliza sistemas com contratos incompatíveis |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Decorator em Go (HTTP Middlewares)
```go
package main

import "net/http"

func LoggingMiddleware(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    // Adiciona log antes e depois sem alterar o handler interno:
    next.ServeHTTP(w, r)
  })
}
```

</details>
