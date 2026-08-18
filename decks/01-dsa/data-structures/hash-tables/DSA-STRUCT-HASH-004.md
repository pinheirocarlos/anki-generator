---
id: DSA-STRUCT-HASH-004
title: "Arquitetura de Swiss Tables com Vetorização SIMD para Tabelas Hash"
tags:
  - level::l4-pleno
  - topic::dsa::hash-tables
  - company::google
  - freq::high
---

## Pergunta
Como a arquitetura **Swiss Table (Google Abseil Flat Hash Map)** utiliza controle por bytes e instruções SIMD para acelerar buscas?

## Resposta
### Quick Answer
**Solução Direta**:
- A **Swiss Table** separa a tabela em dois arrays contíguos:
  1. **Array de Metadados (Control Bytes)**: Cada slot possui 1 byte (7 bits do hash superior + 1 bit de estado: vazio, cheio ou deletado).
  2. **Array de Slots**: Armazena as chaves e valores reais.
- **Vetorização SIMD**: Carrega 16 bytes de controle em um registrador SSE/AVX de 128-bit e compara 16 buckets simultaneamente em **uma única instrução de CPU**, eliminando comparações caras de chave para buckets vazios.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/swiss-tables-simd-ctrl-bytes-loop.webm">
    <p>Visualização: Comparação paralela de 16 bytes de controle (H2) em um único ciclo de instrução SIMD.</p>
  </video>
</div>

| Técnica de Tabela Hash | Comparação por Passo | Instrução CPU |
|---|---|---|
| **Linear Probing Tradicional** | 1 bucket por vez | Instruções escalares `CMP` |
| **Swiss Table (SIMD)** | 16 buckets simultâneos | `_mm_cmpeq_epi8` (128-bit) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Vantagens Arquiteturais
- Reduz a quantidade de acessos à memória RAM em até 80%.
- É a implementação padrão da biblioteca padrão do Rust (`hashbrown`) e do Google Abseil C++.

#### Key Takeaways
- Swiss Tables representam o estado da arte em estruturas de dados mecânicamente alinhadas com a arquitetura de processadores modernos.

</details>
