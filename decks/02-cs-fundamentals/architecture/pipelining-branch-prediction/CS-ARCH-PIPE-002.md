---
id: CS-ARCH-PIPE-002
title: "Hazards Estruturais e de Dados (RAW) no Pipeline e Bypassing da ALU"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::google
  - freq::high
---

## Pergunta
O que são **Hazards Estruturais e de Dados (RAW)** no pipeline da CPU e como a técnica de *Forwarding/Bypassing* resolve dependências?

## Resposta
### Quick Answer
**Solução Direta**:
- **Hazards**: São conflitos que impedem a próxima instrução de executar no ciclo de clock esperado, forçando a inserção de bolhas de espera (*Pipeline Stalls / NOPs*).
- **Hazard Estrutural**: Dois estágios disputam o mesmo recurso físico (resolvido por caches L1 separados: L1-Instrução e L1-Dados na arquitetura Harvard).
- **Hazard de Dados (RAW - Read After Write)**: Uma instrução precisa do resultado de uma instrução anterior que ainda não terminou o estágio Write-Back.
- **Forwarding (Bypassing)**: Circuito de hardware que conecta a saída da ALU diretamente à entrada da ALU para a próxima instrução, eliminando 2 ciclos de espera sem precisar aguardar a gravação no registrador.

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Data Hazard (Read-After-Write) &amp; Soluções: Stall vs ALU Forwarding</text>
  <g transform="translate(50, 48)">
    <!-- Stall Bubble -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="135" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Sem Forwarding: Pipeline Stall</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">ADD R1, R2, R3 (escreve em R1)</text>
    <text x="135" y="60" fill="#f8fafc" font-size="10" font-family="monospace" text-anchor="middle">SUB R4, R1, R5 (precisa de R1)</text>
    <text x="135" y="76" fill="#fca5a5" font-size="9" text-anchor="middle">Aguarda WriteBack → Insere 2 Bolhas (NOPs)</text>

    <!-- ALU Forwarding / Bypassing -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Com ALU Forwarding (Bypassing)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Saída da ALU (estágio EX) é roteada</text>
    <text x="445" y="60" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">diretamente para a entrada da próxima ALU</text>
    <text x="445" y="76" fill="#34d399" font-size="9" text-anchor="middle">Zero bolhas de espera para operações aritméticas</text>
  </g>
  <text x="340" y="165" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Load-Use Hazard: Quando a dependência vem de um LOAD da memória, 1 ciclo de stall ainda é obrigatório.</text>
  <text x="340" y="185" fill="#94a3b8" font-size="10" text-anchor="middle">Compiladores reordenam instruções independentes (Instruction Scheduling) para preencher essa lacuna.</text>

</svg>

| Tipo de Hazard | Causa Primária | Solução de Hardware |
|---|---|---|
| **Structural Hazard** | Conflito por recurso de hardware | Caches L1i e L1d fisicamente separados |
| **Data Hazard (RAW)** | Dependência de cálculo anterior | Forwarding/Bypassing direto da ALU |
| **Control Hazard** | Desvio condicional incerto | Branch Predictor especulativo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Assembly: Dependência RAW
```text
ADD R1, R2, R3   ; R1 = R2 + R3 (Resultado pronto no final do estágio EX)
SUB R4, R1, R5   ; R4 = R1 - R5 (Precisa de R1 imediatamente no estágio EX)

Sem Forwarding: SUB precisa esperar 2 ciclos (NOP, NOP) até R1 ser gravado em WB.
Com Forwarding: Saída da ALU do ADD é encaminhada diretamente para a entrada da ALU do SUB.
```

#### Key Takeaways
- Compiladores modernos reordenam instruções independentes para preencher possíveis bolhas (*Delay Slots*) sem alterar a semântica do programa.

</details>
