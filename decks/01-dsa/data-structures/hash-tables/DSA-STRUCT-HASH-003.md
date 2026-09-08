---
id: DSA-STRUCT-HASH-003
title: "Resolução de Colisões por Encadeamento Separado (Separate Chaining)"
tags:
  - level::l3-junior
  - topic::dsa::hash-tables
  - company::microsoft
  - freq::high
---

## Pergunta
Como funciona a resolução de colisões por **Encadeamento Separado (Separate Chaining)** em tabelas hash?

## Resposta
### Quick Answer
**Solução Direta**:
- Em **Separate Chaining**, cada posição do array de buckets armazena uma lista encadeada (ou árvore binária balanceada) contendo todas as entradas que colidiram naquele mesmo índice.
- Ao buscar uma chave:
  1. Calcula-se o índice do bucket via $\text{hash}(k) \pmod M$.
  2. Percorre-se a lista daquele bucket comparando as chaves via `equals()`.
- **Complexidade**: $O(1)$ em média (com distribuição uniforme); $O(N)$ no pior caso (se todas as chaves colidirem no mesmo bucket).

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Separate Chaining: Buckets com Lista Encadeada e Treeification (Red-Black Tree)</text>

  <!-- Array de Buckets -->
  <g transform="translate(40, 45)">
    <!-- Bucket 0 -->
    <rect x="0" y="0" width="70" height="28" fill="#1e293b" stroke="#475569" rx="3"/>
    <text x="35" y="18" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">[0] null</text>

    <!-- Bucket 1 (Chained List) -->
    <rect x="0" y="32" width="70" height="28" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="3"/>
    <text x="35" y="50" fill="#38bdf8" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">[1] •--></text>
    
    <!-- Linked Nodes for Bucket 1 -->
    <path d="M 70 46 L 110 46" stroke="#38bdf8" stroke-width="2"/>
    <rect x="110" y="32" width="75" height="28" fill="#1e3a8a" stroke="#3b82f6" rx="4"/>
    <text x="147" y="50" fill="#93c5fd" font-size="10" font-family="monospace" text-anchor="middle">K1 | V1 •-</text>
    
    <path d="M 185 46 L 225 46" stroke="#38bdf8" stroke-width="2"/>
    <rect x="225" y="32" width="75" height="28" fill="#1e3a8a" stroke="#3b82f6" rx="4"/>
    <text x="262" y="50" fill="#93c5fd" font-size="10" font-family="monospace" text-anchor="middle">K5 | V5 •-</text>

    <path d="M 300 46 L 335 46" stroke="#38bdf8" stroke-width="2"/>
    <text x="345" y="50" fill="#64748b" font-size="11" font-family="monospace">null</text>

    <!-- Bucket 2 -->
    <rect x="0" y="64" width="70" height="28" fill="#1e293b" stroke="#475569" rx="3"/>
    <text x="35" y="82" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">[2] null</text>

    <!-- Bucket 3 (Treeified Bucket) -->
    <rect x="0" y="96" width="70" height="28" fill="#1e293b" stroke="#f59e0b" stroke-width="2" rx="3"/>
    <text x="35" y="114" fill="#f59e0b" font-size="11" font-family="monospace" font-weight="bold" text-anchor="middle">[3] •--></text>

    <!-- Treeification Box -->
    <path d="M 70 110 L 110 110" stroke="#f59e0b" stroke-width="2"/>
    <rect x="110" y="78" width="490" height="60" fill="#1e293b" stroke="#f59e0b" stroke-dasharray="4" rx="6"/>
    <text x="130" y="98" fill="#f59e0b" font-size="11" font-weight="bold">Colisões &gt; 8 nós (Treeify Threshold): Conversão em Red-Black Tree</text>
    <text x="130" y="116" fill="#f8fafc" font-size="10">Substitui lista encadeada O(N) por árvore balanceada com busca em tempo garantido O(log N).</text>
    <text x="130" y="130" fill="#34d399" font-size="10">Protege contra ataques DoS de colisão de hash (HashDoS Mitigation).</text>
  </g>

  <text x="340" y="195" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Java 8+: buckets com &gt; 8 colisões convertem lista encadeada O(N) em Red-Black Tree O(log N)</text>
</svg>
<p>Visualização: Resolução de colisões por encadeamento separado (Separate Chaining) e conversão em Red-Black Tree ao atingir o limiar de treeification.</p>

| Estratégia de Colisão | Estrutura no Bucket | Tratamento de Colisão |
|---|---|---|
| **Separate Chaining** | Lista Encadeada / AVL | Insere novo nó na lista do bucket |
| **Open Addressing** | Elemento direto no slot | Procura próximo slot livre |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização no Java 8 (Treeification)
Quando um bucket individual acumula **mais de 8 nós** e a capacidade total é $\ge 64$, o Java converte a lista encadeada daquele bucket em uma **Red-Black Tree**, melhorando o pior caso de busca de $O(N)$ para $O(\log N)$ contra ataques de DoS por colisão de hash.

#### Key Takeaways
- Separate Chaining é simples de implementar e degrada graciosamente mesmo quando o fator de carga ultrapassa $1.0$.

</details>
