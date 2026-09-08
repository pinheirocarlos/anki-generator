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
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Swiss Table (Google Abseil): Vetorização SIMD de 16 Control Bytes (128 bits)</text>

  <!-- Hash Division -->
  <g transform="translate(60, 45)">
    <rect x="0" y="0" width="180" height="36" fill="#1e293b" stroke="#3b82f6" rx="4"/>
    <text x="90" y="16" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Hash 64-bit da Chave</text>
    <text x="45" y="30" fill="#94a3b8" font-size="9" font-family="monospace">H1 (57b: Grupo)</text>
    <text x="135" y="30" fill="#f59e0b" font-size="9" font-family="monospace" font-weight="bold">H2 (7b: Tag 0x4A)</text>

    <!-- Arrow down to Control Bytes -->
    <path d="M 135 36 L 135 60" stroke="#f59e0b" stroke-width="2"/>
  </g>

  <!-- Control Bytes and SIMD Register -->
  <g transform="translate(60, 110)">
    <text x="0" y="-12" fill="#94a3b8" font-size="10" font-weight="bold">Control Bytes (16 bytes = 128-bit chunk):</text>
    
    <!-- 16 control bytes boxes -->
    <g font-family="monospace" font-size="9" text-anchor="middle">
      <rect x="0" y="0" width="32" height="26" fill="#334155" stroke="#475569" rx="2"/><text x="16" y="17" fill="#64748b">0x80</text>
      <rect x="34" y="0" width="32" height="26" fill="#334155" stroke="#475569" rx="2"/><text x="50" y="17" fill="#64748b">0x80</text>
      <rect x="68" y="0" width="32" height="26" fill="#1e3a8a" stroke="#3b82f6" rx="2"/><text x="84" y="17" fill="#93c5fd">0x12</text>
      <rect x="102" y="0" width="32" height="26" fill="#065f46" stroke="#10b981" stroke-width="2" rx="2"/><text x="118" y="17" fill="#34d399" font-weight="bold">0x4A</text>
      <rect x="136" y="0" width="32" height="26" fill="#334155" stroke="#475569" rx="2"/><text x="152" y="17" fill="#64748b">0xFE</text>
      <rect x="170" y="0" width="32" height="26" fill="#334155" stroke="#475569" rx="2"/><text x="186" y="17" fill="#64748b">0x80</text>
      <rect x="204" y="0" width="32" height="26" fill="#334155" stroke="#475569" rx="2"/><text x="220" y="17" fill="#64748b">0x80</text>
      <rect x="238" y="0" width="32" height="26" fill="#334155" stroke="#475569" rx="2"/><text x="254" y="17" fill="#64748b">0x80</text>
    </g>
    <text x="280" y="17" fill="#94a3b8" font-size="11">... (16 slots)</text>
  </g>

  <!-- SIMD Operation Box on the right -->
  <g transform="translate(390, 50)">
    <rect x="0" y="0" width="230" height="90" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="115" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Instrução SIMD: _mm_cmpeq_epi8</text>
    <text x="15" y="40" fill="#f8fafc" font-size="10">Broadcast H2 (0x4A) em registrador 128-bit</text>
    <text x="15" y="58" fill="#a7f3d0" font-size="10">1 instrução compara 16 slots em paralelo</text>
    <text x="15" y="76" fill="#38bdf8" font-size="10">Gera máscara de bits: slot [3] = MATCH!</text>
  </g>

  <text x="340" y="195" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Elimina comparações de chaves para slots vazios/tombstones com 80% menos cache misses</text>
</svg>
<p>Visualização: Swiss Table particionando metadados em array de bytes de controle inspecionados em paralelo de 16 em 16 via instruções SIMD de 128 bits.</p>

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
