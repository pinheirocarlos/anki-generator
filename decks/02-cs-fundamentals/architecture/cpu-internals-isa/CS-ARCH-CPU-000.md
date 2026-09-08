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
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Calling Conventions x86-64: Caller-Saved vs Callee-Saved</text>
  <g transform="translate(50, 48)">
    <!-- Caller-Saved -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="135" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Caller-Saved (Voláteis)</text>
    <text x="135" y="45" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">RAX, RCX, RDX, RSI, RDI, R8-R11</text>
    <text x="135" y="70" fill="#94a3b8" font-size="10" text-anchor="middle">Função chamada PODE sobrescrever livremente.</text>
    <text x="135" y="85" fill="#94a3b8" font-size="10" text-anchor="middle">Se caller precisar, ele mesmo salva na stack.</text>

    <!-- Callee-Saved -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Callee-Saved (Não-Voláteis)</text>
    <text x="445" y="45" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">RBX, RSP, RBP, R12, R13, R14, R15</text>
    <text x="445" y="70" fill="#94a3b8" font-size="10" text-anchor="middle">Função chamada DEVE preservar o valor original.</text>
    <text x="445" y="85" fill="#94a3b8" font-size="10" text-anchor="middle">Faz push no prólogo e pop no epílogo.</text>
  </g>
  <text x="340" y="180" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">System V AMD64 ABI: Argumentos 1 a 6 em RDI, RSI, RDX, RCX, R8, R9. Retorno em RAX.</text>

</svg>
<p>Visualização: Preservação de registradores callee-saved e caller-saved durante chamadas de função.</p>

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
