---
id: DSA-PATT-DIVCONQ-005
title: "TimSort: O Algoritmo Híbrido Adaptativo Padrão de Java e Python"
tags:
  - level::l4-pleno
  - topic::dsa::divide-and-conquer-sorting
  - company::apple
  - freq::high
---

## Pergunta
Como o algoritmo **TimSort** combina Insertion Sort e Mergesort para atingir performance linear $O(N)$ em dados quase ordenados?

## Resposta
### Quick Answer
**Solução Direta**:
- Dados do mundo real frequentemente contêm sequências naturais que já estão ordenadas (crescentes ou decrescentes):
  1. **Detecção de Runs**: O TimSort varre o array identificando sequências já ordenadas (*runs*). Se uma run for muito curta ($< \text{minRun} \approx 32\text{ a }64$), estende-a usando **Insertion Sort** (que é imbatível para $N \le 64$).
  2. **Merge Balanceado via Pilha**: Mantém uma pilha de runs garantindo invariantes de tamanho similares aos números de Fibonacci para fundir runs balanceadas.
- **Complexidade**: $O(N)$ no melhor caso (dados já ordenados) e $O(N \log N)$ no pior caso, mantendo estrita estabilidade.

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>
  <text x="340" y="24" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">TimSort: Runs Naturais + Insertion Sort + Merge Balanceado em Pilha</text>

  <g transform="translate(40, 42)">
    <!-- 1. Deteccao de Runs -->
    <rect x="0" y="0" width="180" height="75" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="90" y="20" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">1. Detecção de Runs</text>
    <text x="90" y="38" fill="#e2e8f0" font-size="10" text-anchor="middle">Identifica sequências já</text>
    <text x="90" y="52" fill="#e2e8f0" font-size="10" text-anchor="middle">ordenadas no array bruto.</text>
    <text x="90" y="66" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Melhor Caso: O(N) Linear!</text>

    <!-- Seta 1 -->
    <path d="M 190 38 L 210 38" stroke="#38bdf8" stroke-width="2" marker-end="url(#arrow)"/>
    <text x="200" y="30" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">→</text>

    <!-- 2. MinRun & Insertion Sort -->
    <rect x="215" y="0" width="185" height="75" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="307" y="20" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">2. Extensão de Runs</text>
    <text x="307" y="38" fill="#e2e8f0" font-size="10" text-anchor="middle">Se Run &lt; minRun (32 a 64):</text>
    <text x="307" y="52" fill="#e2e8f0" font-size="10" text-anchor="middle">Estende via Insertion Sort</text>
    <text x="307" y="66" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">(imbatível para N ≤ 64)</text>

    <!-- Seta 2 -->
    <text x="410" y="30" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">→</text>

    <!-- 3. Merge Balanceado via Pilha -->
    <rect x="420" y="0" width="180" height="75" rx="6" fill="#1e293b" stroke="#a855f7" stroke-width="1.5"/>
    <text x="510" y="20" fill="#a855f7" font-size="11" font-weight="bold" text-anchor="middle">3. Merge na Pilha</text>
    <text x="510" y="38" fill="#e2e8f0" font-size="10" text-anchor="middle">Mantém invariantes de</text>
    <text x="510" y="52" fill="#e2e8f0" font-size="10" text-anchor="middle">tamanho similares a Fibonacci:</text>
    <text x="510" y="66" fill="#c084fc" font-size="10" font-weight="bold" text-anchor="middle">A &gt; B + C  e  B &gt; C</text>
  </g>

  <!-- Painel de Beneficios Tecnicos -->
  <g transform="translate(40, 130)">
    <rect x="0" y="0" width="600" height="70" rx="6" fill="#0b1329" stroke="#334155" stroke-width="1"/>
    <text x="20" y="24" fill="#38bdf8" font-size="12" font-weight="bold">Por que o TimSort é o Padrão de Java (Arrays.sort) e Python (list.sort):</text>
    <text x="20" y="44" fill="#e2e8f0" font-size="11">• Dados reais quase nunca são puramente aleatórios — sempre contêm blocos parciais ordenados.</text>
    <text x="20" y="60" fill="#34d399" font-size="11" font-weight="bold">• Combina o melhor dos dois mundos: velocidade de Insertion Sort local + estabilidade de MergeSort.</text>
  </g>
</svg>
<p>Visualização: TimSort combina detecção de runs, Insertion Sort para N ≤ 64 e fusões balanceadas via pilha.</p>

| Algoritmo | Complexidade (Melhor / Pior) | Estabilidade |
|---|---|---|
| **Quicksort Padrão** | $O(N \log N)$ / $O(N^2)$ | Instável |
| **Mergesort Puro** | $O(N \log N)$ / $O(N \log N)$ | Estável |
| **TimSort (Híbrido)** | **$O(N)$ Linear** / **$O(N \log N)$** | Estável |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É o algoritmo oficial de ordenação de objetos de `java.util.Arrays.sort()`, `Collections.sort()` e do método `sort()` do Python.

</details>
