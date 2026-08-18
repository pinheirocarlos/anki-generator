---
id: CS-ARCH-CPU-000
title: "Registradores de CPU e Calling Conventions (Caller-Saved vs Callee-Saved)"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::google
  - freq::high
---

## Pergunta
Qual é o papel dos **Registradores de Propósito Geral** e como a **Calling Convention** divide responsabilidades entre Caller e Callee?

## Resposta
### Quick Answer
**Solução Direta**:
- Registradores são as células de memória mais rápidas da CPU (~0.3ns), operando diretamente no pipeline de execução.
- Em x86-64 (System V ABI usada por Linux/macOS), a **Calling Convention** define o protocolo de passagem de argumentos e preservação de registradores:
  - **Passagem de Argumentos**: Os primeiros 6 argumentos inteiros/ponteiros são passados via registradores: `RDI, RSI, RDX, RCX, R8, R9`.
  - **Caller-Saved (Volatile)**: `RAX, RCX, RDX, RSI, RDI, R8-R11`. A função que chama deve salvá-los na Stack se quiser preservar seus valores após a chamada.
  - **Callee-Saved (Non-Volatile)**: `RBX, RSP, RBP, R12-R15`. A função chamada deve salvar e restaurar seus valores intactos antes de retornar.

### Dual Coding Visual
| Categoria de Registrador | Registradores Típicos (x86-64) | Responsabilidade de Preservação |
|---|---|---|
| **Passagem de Args (1-6)** | `RDI, RSI, RDX, RCX, R8, R9` | Caller fornece antes de `CALL` |
| **Caller-Saved (Temporários)**| `RAX` (Retorno), `R10, R11` | Função chamadora salva na Stack |
| **Callee-Saved (Preservados)**| `RBX, RBP, R12-R15` | Função chamada salva e restaura |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Assembly: Prólogo e Epílogo de Função
```text
minha_funcao:
  push rbp          ; Salva o RBP antigo na Stack (Callee-Saved)
  mov rbp, rsp      ; Define o novo Stack Frame
  push rbx          ; Salva RBX porque a função vai utilizá-lo

  ; Corpo da função...
  mov eax, edi      ; Retorna o primeiro argumento (RDI) em EAX

  pop rbx           ; Restaura o valor original de RBX
  mov rsp, rbp      ; Desfaz o Stack Frame
  pop rbp           ; Restaura o RBP da função anterior
  ret               ; Retorna para o chamador
```

#### Key Takeaways
- Seguir a Calling Convention garante interoperabilidade perfeita entre código compilado em C, Go, Rust e Assembly puro.

</details>
