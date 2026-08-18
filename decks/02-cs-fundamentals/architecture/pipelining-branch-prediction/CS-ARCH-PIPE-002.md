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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/architecture/pipeline-data-hazard-forwarding-loop.webm">
    <p>Visualização: Encaminhamento de dados direto da saída da ALU (Bypassing) eliminando bolhas de espera (Stalls).</p>
  </video>
</div>

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
