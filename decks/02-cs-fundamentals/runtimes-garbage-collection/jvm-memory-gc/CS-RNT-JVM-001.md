---
id: CS-RNT-JVM-001
title: "Coletores Modernos da JVM: G1GC vs ZGC (Pausas Sub-Milissegundo)"
tags:
  - level::l4-pleno
  - topic::cs::runtimes
  - company::netflix
  - freq::high
---

## Pergunta
Qual é a diferença arquitetural entre o **G1GC** e o **ZGC (Z Garbage Collector)** na JVM para controle de pausas de baixa latência?

## Resposta
### Quick Answer
**Solução Direta**:
- **G1GC (Garbage-First / Padrão Java 11+)**:
  - Divide o Heap em milhares de regiões de tamanho igual (1 MB a 32 MB).
  - Coleta primeiro as regiões com mais lixo (*Garbage-First*).
  - Permite configurar uma meta de pausa (`-XX:MaxGCPauseMillis=200`), mas pausas STW ainda variam entre **10 a 200 ms** dependendo do tamanho do Heap.
- **ZGC (Z Garbage Collector / Java 15+)**:
  - Coletor concorrente de ultra-baixa latência desenhado para Heaps gigantes (de 16 MB até **16 Terabytes**).
  - Realiza marcação, realocação e compactação de objetos **concorrentemente** com a aplicação rodando.
  - Utiliza **Colored Pointers (Bits de Referência)** e **Load Barriers**: se a aplicação acessar um objeto sendo movido, a barreira intercepta e atualiza o ponteiro na hora (*Self-Healing*).
  - Garante pausas STW **menores que 1 milissegundo (< 1ms)** independente do tamanho do Heap.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Coletores Modernos da JVM: G1GC vs ZGC (Pausas Sub-Milissegundo)</text>
  <g transform="translate(50, 48)">
    <!-- G1GC -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">G1GC (Garbage-First - Padrão)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Divide heap em ~2048 regiões independentes</text>
    <text x="135" y="60" fill="#a7f3d0" font-size="10" text-anchor="middle">Pausas STW controladas (-XX:MaxGCPauseMillis)</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Pausas típicas: ~10 a 50 ms</text>

    <!-- ZGC -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">ZGC / Generational ZGC (Ultra-Low Latency)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Colored Pointers &amp; Load Barriers concorrentes</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Pausas STW estritamente &lt; 1 ms para Heaps até 16 TB!</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Ideal para Trading, Bancos e Serviços Críticos</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">No Java 21 LTS: Ative com '-XX:+UseZGC -XX:+ZGenerational' para eliminar pausas perceptíveis de Garbage Collection.</text>

</svg>

| Coletor de GC | Pausa Típica de STW | Escala Máxima de Heap |
|---|---|---|
| **G1GC** | ~10 a 200 milissegundos | Até ~64 GB |
| **ZGC (Generational)**| **< 1 milissegundo (Sub-ms)** | Até **16 Terabytes** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Habilitar Generational ZGC no Java 21+
```bash
# Executa a aplicação com ZGC Generacional ativado:
java -XX:+UseZGC -XX:+ZGenerational -jar minha-app-backend.jar
```

#### Key Takeaways
- Para aplicações financeiras de baixa latência, streaming de mídia e microsserviços de alto tráfego com SLAs rígidos de P99/P99.9, o ZGC elimina quase 100% dos picos de latência causados pelo GC.

</details>
