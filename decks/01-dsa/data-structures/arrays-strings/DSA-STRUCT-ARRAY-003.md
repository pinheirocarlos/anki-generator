---
id: DSA-STRUCT-ARRAY-003
title: "Localidade Espacial de Cache da CPU em Arrays vs Listas Encadeadas"
tags:
  - level::l3-junior
  - topic::dsa::arrays-strings
  - company::apple
  - freq::high
---

## Pergunta
Como a **localidade espacial de cache da CPU** beneficia arrays contíguos em comparação com listas encadeadas?

## Resposta
### Quick Answer
**Solução Direta**:
- Quando a CPU acessa `arr[0]`, o controlador de hardware carrega automaticamente uma **Cache Line inteira (normalmente 64 bytes)** da memória RAM para os caches L1/L2.
- Em arrays contíguos, os elementos vizinhos (`arr[1]`, `arr[2]`, etc.) já estão pré-carregados na mesma linha de cache, gerando **Cache Hits** com latência de ~1ns.
- Em listas encadeadas, cada nó é alocado individualmente no Heap em posições esparsas de memória, provocando frequentes **Cache Misses** e forçando acessos lentos à RAM (~50–100ns).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Localidade Espacial de Cache e Prefetching em Vetores Contíguos</text>
  <g transform="translate(60, 50)">
    <!-- Cache Line 64 Bytes -->
    <rect x="0" y="0" width="560" height="60" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="6"/>
    <text x="280" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Linha de Cache L1 da CPU (64 Bytes = 16 inteiros de 4B)</text>
    <g transform="translate(15, 28)">
      <rect x="0" y="0" width="30" height="24" fill="#047857" rx="2"/><text x="15" y="16" fill="#fff" font-size="10" text-anchor="middle">A[0]</text>
      <rect x="35" y="0" width="30" height="24" fill="#047857" rx="2"/><text x="50" y="16" fill="#fff" font-size="10" text-anchor="middle">A[1]</text>
      <rect x="70" y="0" width="30" height="24" fill="#047857" rx="2"/><text x="85" y="16" fill="#fff" font-size="10" text-anchor="middle">A[2]</text>
      <rect x="105" y="0" width="30" height="24" fill="#047857" rx="2"/><text x="120" y="16" fill="#fff" font-size="10" text-anchor="middle">A[3]</text>
      <rect x="140" y="0" width="30" height="24" fill="#047857" rx="2"/><text x="155" y="16" fill="#fff" font-size="10" text-anchor="middle">A[4]</text>
      <text x="200" y="16" fill="#94a3b8" font-size="10">... Carregados juntos na mesma busca em L1 (~1ns)</text>
    </g>
  </g>
  <text x="340" y="145" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Iteração linear em Array = 1 Cache Miss a cada 16 acessos (93.75% Cache Hits)</text>
  <text x="340" y="170" fill="#94a3b8" font-size="11" text-anchor="middle">Ao contrário de nós esparsos em Heap (listas), vetores maximizam a largura de banda da CPU</text>
</svg>

<p>Visualização: Linha de cache L1 de 64 bytes carregando elementos contíguos com 93.75% de cache hits.</p>

| Estrutura | Disposição em Memória | Padrão de Cache L1/L2 |
|---|---|---|
| **Array Contíguo** | Bloco contínuo único | Cache Hits sequenciais (~1ns) |
| **Lista Encadeada** | Nós fragmentados no Heap | Cache Misses frequentes (~100ns) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental do Leitor de Livro
- **Array**: É como ler as páginas encadernadas de um livro em sequência; ao virar a folha, o conteúdo já está nas suas mãos.
- **Lista Encadeada**: É como ler um livro onde cada parágrafo termina com um bilhete apontando para uma biblioteca diferente na cidade.

#### Impacto Prático de Performance
```text
Operação de Travessia em 1.000.000 de inteiros:
- Array Contíguo:       ~0.8 ms (Pré-fetcher de hardware ativo)
- Lista Encadeada:     ~14.5 ms (Penalidade constante de latência RAM)
```

#### Key Takeaways
- Arrays superam listas encadeadas na prática moderna mesmo em cenários com complexidade teórica similar, devido à arquitetura de hierarquia de memória e pipelines de instrução da CPU.

</details>
