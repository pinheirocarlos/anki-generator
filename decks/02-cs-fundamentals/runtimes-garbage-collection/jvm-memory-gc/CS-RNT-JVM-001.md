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
