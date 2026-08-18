---
id: CS-ARCH-CPU-002
title: "Gestão de Stack Frames com Ponteiros RSP e RBP"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::amazon
  - freq::high
---

## Pergunta
Como a CPU gerencia **Stack Frames** utilizando os registradores de ponteiro de pilha (`RSP`) e ponteiro de base (`RBP`)?

## Resposta
### Quick Answer
**Solução Direta**:
- O **Stack Frame** é o bloco de memória na pilha alocado dinamicamente para cada invocação de função ativa, guardando variáveis locais, parâmetros excedentes e endereço de retorno.
- **RSP (Stack Pointer)**: Aponta sempre para o **topo atual da pilha** (o endereço mais baixo alocado, já que a Stack cresce para baixo na memória).
- **RBP (Base / Frame Pointer)**: Aponta para a **base fixa do frame atual**, servindo como âncora estável para acessar variáveis locais (`[rbp - 8]`) e parâmetros passados na Stack (`[rbp + 16]`).

### Dual Coding Visual
| Registrador | Papel no Stack Frame | Variação Durante a Execução |
|---|---|---|
| **RSP (Stack Pointer)** | Topo dinâmico da pilha | Altera a cada `PUSH`, `POP` ou alocação |
| **RBP (Base Pointer)**  | Base fixa do frame corrente | Permanece constante no corpo da função |
| **RIP (Instruction Ptr)**| Próxima instrução a executar | Atualizado pelo hardware a cada ciclo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Layout da Stack em Memória (Cresce para Baixo)
```text
[Endereço Alto]
  | Parâmetros excedentes (Arg 7, Arg 8...)
  | Endereço de Retorno (salvo pela instrução CALL)
  | RBP anterior (salvo pelo PUSH rbp) <-- RBP aponta aqui
  | Variável Local 1 [rbp - 8]
  | Variável Local 2 [rbp - 16]
  | ...
  v [RSP aponta aqui (Topo da Stack)]
[Endereço Baixo]
```

#### Key Takeaways
- Compiladores modernos com otimização ativada podem omitir o RBP (`-fomit-frame-pointer`), liberando o registrador para uso geral e calculando offsets puramente a partir de RSP.

</details>
