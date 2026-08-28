---
id: SYS-ARCH-TYPEAHEAD-006
title: "Intuição Fundamental do Autocomplete: A Árvore de Palavras com os Atalhos Mais Populares (Trie + Top-K)"
tags:
  - level::l2-fundamental
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Qual é a intuição fundamental da arquitetura de sistemas de sugestão de busca em tempo real (Typeahead / Autocomplete) para responder sugestões em menos de 10 milissegundos?

## Resposta
### Quick Answer
**Solução Direta**:
- A cada letra que o usuário digita na barra de pesquisa do Google (ex: "a", "an", "ank"), o sistema tem uma janela minúscula de **menos de 30 milissegundos** para sugerir as 5 frases mais populares do mundo antes que ele digite a próxima letra.
- Fazer consultas `LIKE 'ank%'` em um banco de dados relacional é lento demais.
- A solução usa uma **Trie em Memória RAM com Cache Top-K pré-calculado**:
  - Cada nó da árvore representa uma letra.
  - Em cada nó (ex: no nó `"ank"`), já fica armazenada em cache a lista pronta com as **5 palavras mais buscadas** (ex: `["anki flashcards", "ankara", "ankle pain", ...]`).
  - A busca não precisa varrer a subárvore: ela chega no nó do prefixo e devolve a lista do Top-5 em **tempo constante ($O(1)$)**.

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Árvore Trie com Sugestões Top-K Pré-Calculadas em Memória</text>

  <!-- Estrutura Trie -->
  <g transform="translate(100, 50)">
    <!-- Raiz -->
    <circle cx="100" cy="15" r="14" fill="#1e293b" stroke="#3b82f6" />
    <text x="100" y="19" fill="#93c5fd" font-size="10" text-anchor="middle">Raiz</text>

    <!-- Nó A -->
    <circle cx="100" cy="55" r="14" fill="#065f46" stroke="#10b981" stroke-width="2" />
    <text x="100" y="59" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">"a"</text>

    <!-- Nó AN -->
    <circle cx="100" cy="95" r="14" fill="#065f46" stroke="#10b981" stroke-width="2" />
    <text x="100" y="99" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">"an"</text>

    <line x1="100" y1="29" x2="100" y2="41" stroke="#10b981" stroke-width="2" />
    <line x1="100" y1="69" x2="100" y2="81" stroke="#10b981" stroke-width="2" />
  </g>

  <!-- Cache Top-K anexado ao Nó AN -->
  <g transform="translate(250, 60)">
    <rect x="0" y="0" width="280" height="85" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="8" />
    <text x="140" y="20" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Top-3 Pré-Calculado no Nó "an" (Cache em RAM)</text>
    <text x="15" y="40" fill="#ffffff" font-size="10" font-family="monospace">1. "anki flashcards" (850k buscas)</text>
    <text x="15" y="58" fill="#ffffff" font-size="10" font-family="monospace">2. "android studio"  (620k buscas)</text>
    <text x="15" y="74" fill="#ffffff" font-size="10" font-family="monospace">3. "animation css"   (410k buscas)</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Os cálculos de popularidade (Top-K) são agregados em lote offline via MapReduce/Spark!</text>
</svg>

| Abordagem | Tempo de Resposta | Viabilidade para Escala Google |
|---|---|---|
| **Query SQL (`WHERE query LIKE 'an%'`)** | ~200 a 500 ms | Inviável: trava com centenas de milhares de digitações por segundo. |
| **Trie em RAM + Top-K pré-calculado** | &lt; 5 ms | Excelente: tempo de resposta instantâneo antes da próxima tecla. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como a Árvore é Atualizada Sem Travar Leituras
A contagem de buscas não é atualizada em tempo real a cada digitação individual.
1. O backend grava os termos buscados em logs assíncronos no Kafka.
2. Um job de processamento em lote (Apache Spark / Flink) roda uma vez a cada hora e gera uma **nova versão completa da árvore Trie**.
3. O servidor em produção apenas troca o ponteiro em memória para a nova árvore (*Atomic Pointer Swap*), sem nenhum downtime.

#### Key Takeaways
- Typeahead combina estrutura de dados clássica (Trie) com pré-computação offline para entregar latência sub-humana na experiência do usuário.

</details>
