---
id: CS-ARCH-PIPE-003
title: "Instruções Vetoriais SIMD (Single Instruction Multiple Data)"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::apple
  - freq::high
---

## Pergunta
O que é uma **Instrução SIMD** (*Single Instruction, Multiple Data*) e como ela acelera processamento massivo de vetores?

## Resposta
### Quick Answer
**Solução Direta**:
- **SIMD**: Paradigma de computação paralela em nível de instrução onde uma única instrução de CPU é aplicada simultaneamente sobre múltiplos elementos de dados empacotados em registradores largos.
- Em vez de somar dois inteiros de 32 bits por vez (modo escalar), extensões SIMD modernas (como **AVX-512** com 512 bits ou **ARM Neon** com 128 bits) carregam e somam **16 inteiros de 32 bits em 1 único ciclo de clock**.
- Essencial para computação gráfica, machine learning, codificação de áudio/vídeo e buscas analíticas em bancos colunares (ClickHouse/DuckDB).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Vetorização SIMD (Single Instruction, Multiple Data): AVX-512 / Neon</text>
  <g transform="translate(60, 48)">
    <!-- Scalar -->
    <rect x="0" y="0" width="260" height="75" rx="6" fill="#1e293b" stroke="#64748b"/>
    <text x="130" y="20" fill="#94a3b8" font-size="11" font-weight="bold" text-anchor="middle">Escalar (1 operação por ciclo)</text>
    <rect x="60" y="32" width="140" height="28" rx="4" fill="#334155"/>
    <text x="130" y="50" fill="#ffffff" font-size="11" font-family="monospace" text-anchor="middle">A[0] + B[0] = C[0]</text>

    <!-- SIMD 512-bit -->
    <rect x="300" y="0" width="260" height="75" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="430" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">SIMD Vetorial (8x Float64 em 1 ciclo)</text>
    <g transform="translate(310, 32)">
      <rect x="0" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="30" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="60" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="90" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="120" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="150" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="180" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <rect x="210" y="0" width="28" height="28" rx="3" fill="#0284c7"/>
      <text x="120" y="18" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">AVX-512 (512 bits)</text>
    </g>
  </g>
  <rect x="60" y="140" width="560" height="40" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
  <text x="340" y="165" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Aceleração de até 8x a 16x em Processamento de Imagens, Álgebra Linear e Machine Learning.</text>

</svg>

| Modelo de Execução | Largura de Registrador | Elementos Processados por Ciclo |
|---|---|---|
| **Escalar Padrão (x86-64)** | 64 bits | 1 valor escalar |
| **SIMD AVX-2 (256-bit)** | 256 bits | 8 inteiros de 32-bit ou 4 floats |
| **SIMD AVX-512 (512-bit)**| 512 bits | 16 inteiros de 32-bit ou 8 floats |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo Mental: Soma Escalar vs SIMD
- **Escalar**: `res[0] = a[0] + b[0]`, depois `res[1] = a[1] + b[1]`, etc. (8 instruções separadas).
- **SIMD (AVX)**: `_mm256_add_epi32(vecA, vecB)` calcula `res[0..7]` em uma única operação paralela de hardware.

#### Key Takeaways
- Compiladores modernos realizam auto-vetorização (*Auto-Vectorization*) quando loops são simples, contíguos e livres de dependências cruzadas entre iterações.

</details>
