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
