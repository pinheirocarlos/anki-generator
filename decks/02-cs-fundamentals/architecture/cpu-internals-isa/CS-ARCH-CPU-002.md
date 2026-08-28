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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Layout de Stack Frame x86-64 com Ponteiros RSP e RBP</text>
  <g transform="translate(180, 45)">
    <!-- Stack addresses -->
    <text x="-40" y="25" fill="#94a3b8" font-size="10" font-family="monospace">Endereço Alto</text>
    <text x="-40" y="135" fill="#94a3b8" font-size="10" font-family="monospace">Endereço Baixo</text>

    <!-- Caller Frame -->
    <rect x="50" y="0" width="260" height="28" rx="4" fill="#334155" stroke="#64748b"/>
    <text x="180" y="18" fill="#cbd5e1" font-size="10" text-anchor="middle">Parâmetros Passados pelo Caller (>6 args)</text>

    <!-- Return Address -->
    <rect x="50" y="30" width="260" height="26" rx="4" fill="#7f1d1d" stroke="#ef4444"/>
    <text x="180" y="47" fill="#fecaca" font-size="10" font-weight="bold" text-anchor="middle">Endereço de Retorno (RIP)</text>

    <!-- Saved RBP -->
    <rect x="50" y="58" width="260" height="26" rx="4" fill="#065f46" stroke="#10b981"/>
    <text x="180" y="75" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Saved Base Pointer (RBP Antigo) ← RBP</text>

    <!-- Local Variables -->
    <rect x="50" y="86" width="260" height="35" rx="4" fill="#1e3a8a" stroke="#3b82f6"/>
    <text x="180" y="103" fill="#bfdbfe" font-size="10" font-weight="bold" text-anchor="middle">Variáveis Locais &amp; Temporários</text>
    <text x="180" y="115" fill="#93c5fd" font-size="9" text-anchor="middle">Alocadas por sub $N, %rsp</text>

    <!-- Top of Stack -->
    <line x1="30" y1="125" x2="330" y2="125" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
    <text x="180" y="142" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Topo da Stack (Stack Pointer) ← RSP</text>
  </g>
  <text x="340" y="205" fill="#94a3b8" font-size="10" text-anchor="middle">A Stack cresce para baixo (direção a endereços menores). RSP diminui com cada push.</text>

</svg>

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
