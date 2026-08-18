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
