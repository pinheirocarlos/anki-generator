---
id: CS-RNT-JVM-003
title: "Fases de GC: Stop-The-World (STW), Mark-Sweep-Compact e SafePoints"
tags:
  - level::l3-junior
  - topic::cs::runtimes
  - company::meta
  - freq::high
---

## Pergunta
O que é uma pausa **Stop-The-World (STW)** e como a JVM utiliza **SafePoints** para sincronizar threads durante o GC?

## Resposta
### Quick Answer
**Solução Direta**:
- **Stop-The-World (STW)**: Período durante o qual a JVM suspende a execução de **todas as threads da aplicação** para permitir que o Garbage Collector inspecione e altere ponteiros de objetos com segurança, garantindo que o grafo de memória não mude durante a checagem.
- **SafePoints**: Pontos específicos inseridos pelo compilador JIT no código compilado (como no final de métodos e voltas de loops) onde a thread da aplicação pode pausar seu estado com segurança e salvar seus registradores.
- **Algoritmo Mark-Sweep-Compact**:
  1. **Mark**: Percorre o grafo a partir das raízes (GC Roots) marcando objetos vivos.
  2. **Sweep**: Identifica e libera a memória dos objetos não marcados.
  3. **Compact**: Desloca objetos vivos contiguamente para o início do Heap, eliminando buracos de fragmentação.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fases do GC e SafePoints: Pausas Stop-The-World (STW)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="80" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="280" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">SafePoint: Ponto no código onde todas as threads da JVM pausam com segurança</text>
    <text x="280" y="45" fill="#f8fafc" font-size="10" text-anchor="middle">Permite ao coletor inspecionar raízes (Stack Roots) e mover objetos na memória sem race conditions.</text>
    <text x="280" y="65" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Cuidado com SafePoint Bias: Laços não-contáveis (int loops) podem demorar para atingir o SafePoint.</text>
  </g>
  <text x="340" y="155" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Coletores modernos tornam a grande maioria das fases (Mark e Relocate) concorrentes, reduzindo o STW a frações de ms.</text>

</svg>

| Fase do Algoritmo | Ação do Coletor | Efeito na Fragmentação |
|---|---|---|
| **Mark (Marcação)** | Identifica raízes ativas no grafo | Nenhum |
| **Sweep (Varredura)** | Libera slots de objetos mortos | Deixa memória fragmentada em blocos |
| **Compact (Compactação)**| Move objetos vivos para bloco contíguo | Elimina fragmentação 100% |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### SafePoint Time-To-Safepoint (TTSP)
- Às vezes, um pico de latência (*Latency Spike*) de 2 segundos não é causado pelo GC em si, mas pelo tempo que uma thread levou para atingir um SafePoint (por exemplo, presa em um loop longo sem verificação de safepoint).

#### Key Takeaways
- Coletores de lixo modernos de última geração (como ZGC e Shenandoah) realizam praticamente todas as fases de Mark e Compact de forma **concorrente**, reduzindo pausas STW para menos de 1 milissegundo.

</details>
