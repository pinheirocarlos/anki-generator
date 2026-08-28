---
id: DSA-STRUCT-HASH-000
title: "Funcionamento Interno de Tabelas Hash e Papel da Função de Hash"
tags:
  - level::l3-junior
  - topic::dsa::hash-tables
  - company::google
  - freq::high
---

## Pergunta
Como funciona internamente uma **Tabela Hash (Hash Map)** e qual o papel desempenhado pela **Função de Hash**?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma Tabela Hash mantém um array interno de *buckets* indexados de $0$ a $M-1$.
- A **Função de Hash** mapeia uma chave arbitrária (ex: `"user_123"`) para um número inteiro pseudo-aleatório e determinístico:
  $$\text{índice} = \text{hash}(\text{chave}) \pmod M$$
- Esse cálculo direto permite localizar, inserir e remover pares chave-valor em tempo médio $O(1)$.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Função Hash Determinística e Mapeamento de Índice % N</text>
  <g transform="translate(60, 50)">
    <!-- Key -->
    <rect x="0" y="15" width="90" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/>
    <text x="45" y="38" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">"alice"</text>

    <!-- Hash Engine -->
    <path d="M 95 35 L 145 35" stroke="#3b82f6" stroke-width="2"/>
    <rect x="150" y="5" width="160" height="60" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="230" y="25" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Hash Function</text>
    <text x="230" y="42" fill="#94a3b8" font-size="10" font-family="monospace">Murmur3 / xxHash</text>
    <text x="230" y="56" fill="#f8fafc" font-size="10" font-family="monospace">hash = 0x8A4F3912</text>

    <!-- Index Calc -->
    <path d="M 315 35 L 365 35" stroke="#f59e0b" stroke-width="2"/>
    <rect x="370" y="15" width="140" height="40" fill="#047857" stroke="#10b981" rx="4"/>
    <text x="440" y="33" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">hash % BucketCount</text>
    <text x="440" y="47" fill="#a7f3d0" font-size="10" font-family="monospace">→ Bucket [4]</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Garante distribuição uniforme com probabilidade mínima de colisão em O(1)</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Função Hash Determinística e Mapeamento de Índice % N</text>
  <g transform="translate(60, 50)">
    <!-- Key -->
    <rect x="0" y="15" width="90" height="40" fill="#1e293b" stroke="#3b82f6" rx="4"/>
    <text x="45" y="38" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">"alice"</text>

    <!-- Hash Engine -->
    <path d="M 95 35 L 145 35" stroke="#3b82f6" stroke-width="2"/>
    <rect x="150" y="5" width="160" height="60" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="230" y="25" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Hash Function</text>
    <text x="230" y="42" fill="#94a3b8" font-size="10" font-family="monospace">Murmur3 / xxHash</text>
    <text x="230" y="56" fill="#f8fafc" font-size="10" font-family="monospace">hash = 0x8A4F3912</text>

    <!-- Index Calc -->
    <path d="M 315 35 L 365 35" stroke="#f59e0b" stroke-width="2"/>
    <rect x="370" y="15" width="140" height="40" fill="#047857" stroke="#10b981" rx="4"/>
    <text x="440" y="33" fill="#fff" font-size="11" font-weight="bold" text-anchor="middle">hash % BucketCount</text>
    <text x="440" y="47" fill="#a7f3d0" font-size="10" font-family="monospace">→ Bucket [4]</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Garante distribuição uniforme com probabilidade mínima de colisão em O(1)</text>

</svg>

| Componente | Função Principal | Complexidade Média |
|---|---|---|
| **Função de Hash** | Mapeia chave para inteiro uniforme | $O(L)$ (tam da chave) |
| **Array de Buckets** | Acesso indexado ao endereço físico | $O(1)$ Instantâneo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Propriedades de uma Boa Função de Hash
1. **Determinismo**: A mesma chave sempre produz exatamente o mesmo valor de hash.
2. **Distribuição Uniforme**: Espalha as chaves homogeneamente por todos os buckets para minimizar colisões.
3. **Eficiência**: Executa rapidamente em poucas instruções de CPU.

#### Key Takeaways
- Sem uma boa função de hash, chaves se concentram no mesmo bucket, degradando o tempo de busca de $O(1)$ para $O(N)$.

</details>
