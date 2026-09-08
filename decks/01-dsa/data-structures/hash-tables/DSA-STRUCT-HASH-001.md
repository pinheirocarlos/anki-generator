---
id: DSA-STRUCT-HASH-001
title: "Trade-offs de Cache e Memória: Separate Chaining vs Open Addressing"
tags:
  - level::l4-pleno
  - topic::dsa::hash-tables
  - company::meta
  - freq::high
---

## Pergunta
Quais os trade-offs de desempenho de cache e alocação de memória entre **Separate Chaining** e **Open Addressing** (Linear Probing)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Separate Chaining**: Aloca cada entrada em um nó individual do Heap. Vantagem: suporta $\alpha > 1.0$ sem travar. Desvantagem: gera múltiplos ponteiros extras e frequentes cache misses.
- **Open Addressing (Linear Probing / Robin Hood)**: Todos os pares residem diretamente em um array contíguo plano. Quando ocorre colisão, procura o próximo slot livre ($i+1, i+2$). Vantagem: excelente localidade de cache CPU (leituras sequenciais). Desvantagem: exige $\alpha < 0.7$ para evitar *clustering* (agrupamento primário de colisões).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Resolução de Colisões: Chaining (Encadeamento) vs Open Addressing</text>
  <g transform="translate(60, 50)">
    <!-- Separate Chaining -->
    <rect x="0" y="0" width="240" height="85" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="120" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Separate Chaining (Listas)</text>
    <text x="15" y="42" fill="#f8fafc" font-size="10">Bucket 2 → [k1, v1] → [k4, v4]</text>
    <text x="15" y="60" fill="#94a3b8" font-size="9">Aloca nós extras na Heap</text>

    <!-- Open Addressing -->
    <g transform="translate(280, 0)">
      <rect x="0" y="0" width="260" height="85" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="130" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Open Addressing (Sondagem Linear)</text>
      <text x="15" y="42" fill="#f8fafc" font-size="10">Colisão no slot 2 → tenta slot 3, slot 4</text>
      <text x="15" y="60" fill="#34d399" font-size="9">100% contíguo, sem alocações extras</text>
    </g>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Chaining tolera carga &gt; 1.0 | Open Addressing requer carga &lt; 0.7 para evitar clusters</text>

</svg>
<p>Visualização: Comparação entre Separate Chaining (listas encadeadas na heap) e Open Addressing (vetor contíguo com alta localidade de cache).</p>

| Característica | Separate Chaining | Open Addressing (Linear Probing) |
|---|---|---|
| **Localidade de Cache CPU** | Ruim (saltos no Heap) | Excelente (vetor contíguo) |
| **Overhead de Ponteiros** | Alto (8–16B por nó) | Zero ponteiros de nó |
| **Sensibilidade a $\alpha$** | Baixa ($alpha > 1$ ok) | Altíssima (degrada se $alpha > 0.8$) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Robin Hood Hashing
Variante de Open Addressing onde elementos com maior distância de sua posição ideal "roubam" o slot de elementos com menor distância durante a inserção, equalizando a variância de busca e prevenindo picos de latência.

#### Key Takeaways
- Linguagens modernas de alta performance (Rust `HashMap`, C++ `absl::flat_hash_map`, Go `map`) utilizam variantes de Open Addressing contíguo devido à velocidade dos caches L1/L2.

</details>
