---
id: DSA-STRUCT-TRIE-005
title: "Trade-offs de Memória: Array de Ponteiros vs Hash Map nos Nós da Trie"
tags:
  - level::l4-pleno
  - topic::dsa::trie-prefix-tree
  - company::google
  - freq::high
---

## Pergunta
Quais os trade-offs de velocidade e consumo de memória entre usar um **Array Fixo de Ponteiros** (`Node[26]`) versus um **Hash Map** nos nós de uma Trie?

## Resposta
### Quick Answer
**Solução Direta**:
- **Array Fixo (`Node[26]`)**:
  - Acesso $O(1)$ instantâneo por aritmética de índice (`c - 'a'`).
  - Desperdício massivo de memória se o alfabeto for grande (ex: Unicode/UTF-8) ou se a Trie for esparsa (a maioria dos 26 ponteiros fica `null`).
- **Hash Map (`Map<Character, Node>`)**:
  - Aloca ponteiros estritamente sob demanda para os caracteres existentes $\to$ **Excelente eficiência de memória**.
  - Pequeno overhead adicional de hashing e indireção de objetos.

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="24" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Trade-offs de Memória nos Nós da Trie: Array Fixo Node[26] vs HashMap</text>

  <!-- Left Side: Array Fixo Node[26] -->
  <g transform="translate(40, 42)">
    <rect x="0" y="0" width="280" height="120" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="140" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Array Fixo: Node[26] (208 bytes / nó)</text>
    
    <!-- Slots visualization -->
    <g transform="translate(15, 32)">
      <rect x="0" y="0" width="25" height="24" fill="#065f46" stroke="#10b981" rx="2"/><text x="12" y="16" fill="#34d399" font-size="9" font-family="monospace" text-anchor="middle">c*</text>
      <rect x="28" y="0" width="25" height="24" fill="#334155" stroke="#475569" rx="2"/><text x="40" y="16" fill="#64748b" font-size="9" font-family="monospace" text-anchor="middle">∅</text>
      <rect x="56" y="0" width="25" height="24" fill="#334155" stroke="#475569" rx="2"/><text x="68" y="16" fill="#64748b" font-size="9" font-family="monospace" text-anchor="middle">∅</text>
      <rect x="84" y="0" width="25" height="24" fill="#065f46" stroke="#10b981" rx="2"/><text x="96" y="16" fill="#34d399" font-size="9" font-family="monospace" text-anchor="middle">t*</text>
      <rect x="112" y="0" width="25" height="24" fill="#334155" stroke="#475569" rx="2"/><text x="124" y="16" fill="#64748b" font-size="9" font-family="monospace" text-anchor="middle">∅</text>
      <rect x="140" y="0" width="25" height="24" fill="#334155" stroke="#475569" rx="2"/><text x="152" y="16" fill="#64748b" font-size="9" font-family="monospace" text-anchor="middle">∅</text>
      <text x="185" y="16" fill="#94a3b8" font-size="9">... 26 slots</text>
    </g>

    <text x="15" y="80" fill="#f8fafc" font-size="10">⚡ Acesso O(1) direto: children[c - 'a']</text>
    <text x="15" y="96" fill="#f87171" font-size="10">⚠️ 90%+ dos ponteiros são nulos (esparso)</text>
    <text x="15" y="110" fill="#94a3b8" font-size="9">Ideal para alfabetos restritos (a-z minúsculo)</text>
  </g>

  <!-- Right Side: HashMap<Character, Node> -->
  <g transform="translate(360, 42)">
    <rect x="0" y="0" width="280" height="120" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="140" y="20" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Map&lt;Character, Node&gt; (Sob Demanda)</text>

    <!-- Entries visualization -->
    <g transform="translate(20, 32)">
      <rect x="0" y="0" width="105" height="24" fill="#065f46" stroke="#10b981" rx="3"/>
      <text x="52" y="16" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">'c' → NodeChild1</text>

      <rect x="115" y="0" width="105" height="24" fill="#065f46" stroke="#10b981" rx="3"/>
      <text x="167" y="16" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">'t' → NodeChild2</text>
    </g>

    <text x="15" y="80" fill="#f8fafc" font-size="10">💾 Zero desperdício de ponteiros vazios</text>
    <text x="15" y="96" fill="#38bdf8" font-size="10">🌐 Suporta Unicode / UTF-8 sem penalidade</text>
    <text x="15" y="110" fill="#94a3b8" font-size="9">Overhead pequeno de hash por transição</text>
  </g>

  <text x="340" y="195" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Array Fixo otimiza CPU (sem hashing); HashMap otimiza memória RAM em grandes conjuntos esparsos</text>
</svg>
<p>Visualização: Comparação de representação de nós de Trie: Array fixo Node[26] com acesso O(1) direto vs Hash Map com alocação esparsa sob demanda.</p>

| Estratégia de Nós | Acesso por Caractere | Consumo de Memória |
|---|---|---|
| **Array Fixo `Node[26]`** | $O(1)$ Ultra-rápido | Alto (26 ponteiros por nó) |
| **`Map<Character, Node>`** | $O(1)$ Médio (hash) | Mínimo (apenas caracteres reais) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Para alfabetos restritos (`a-z`), arrays fixos são preferíveis por velocidade; para caracteres gerais ou Unicode, o uso de Hash Maps ou Radix Trees é obrigatório.

</details>
