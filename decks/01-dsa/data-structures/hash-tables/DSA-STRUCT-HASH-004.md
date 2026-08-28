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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Consistent Hashing com Anel Virtual de Tokens</text>
  <g transform="translate(100, 45)">
    <circle cx="100" cy="50" r="42" fill="none" stroke="#3b82f6" stroke-width="4"/>
    <circle cx="100" cy="8" r="6" fill="#10b981"/><text x="100" y="0" fill="#10b981" font-size="9" text-anchor="middle">Node A</text>
    <circle cx="140" cy="65" r="6" fill="#f59e0b"/><text x="165" y="68" fill="#f59e0b" font-size="9">Node B</text>
    <circle cx="60" cy="65" r="6" fill="#a855f7"/><text x="35" y="68" fill="#a855f7" font-size="9">Node C</text>

    <!-- Key mapping arrow -->
    <g transform="translate(230, 10)">
      <rect x="0" y="0" width="250" height="70" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="125" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Roteamento no Sentido Horário</text>
      <text x="15" y="42" fill="#f8fafc" font-size="10">hash(key) cai entre A e B → Node B</text>
      <text x="15" y="58" fill="#94a3b8" font-size="10">Ao adicionar nó, apenas K/N chaves migram</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Base de sharding distribuído em DynamoDB, Cassandra e Memcached</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Consistent Hashing com Anel Virtual de Tokens</text>
  <g transform="translate(100, 45)">
    <circle cx="100" cy="50" r="42" fill="none" stroke="#3b82f6" stroke-width="4"/>
    <circle cx="100" cy="8" r="6" fill="#10b981"/><text x="100" y="0" fill="#10b981" font-size="9" text-anchor="middle">Node A</text>
    <circle cx="140" cy="65" r="6" fill="#f59e0b"/><text x="165" y="68" fill="#f59e0b" font-size="9">Node B</text>
    <circle cx="60" cy="65" r="6" fill="#a855f7"/><text x="35" y="68" fill="#a855f7" font-size="9">Node C</text>

    <!-- Key mapping arrow -->
    <g transform="translate(230, 10)">
      <rect x="0" y="0" width="250" height="70" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="125" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Roteamento no Sentido Horário</text>
      <text x="15" y="42" fill="#f8fafc" font-size="10">hash(key) cai entre A e B → Node B</text>
      <text x="15" y="58" fill="#94a3b8" font-size="10">Ao adicionar nó, apenas K/N chaves migram</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Base de sharding distribuído em DynamoDB, Cassandra e Memcached</text>

</svg>

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
