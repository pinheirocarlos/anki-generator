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
