---
id: DSA-ADV-CONCURRENT-005
title: "Estruturas Read-Copy-Update (RCU) e Copy-On-Write (COW) para Leitura Intensiva"
tags:
  - level::l4-pleno
  - topic::dsa::concurrent-data-structures
  - company::netflix
  - freq::high
---

## Pergunta
Como as técnicas de **Read-Copy-Update (RCU)** e **Copy-On-Write (COW)** garantem leituras com custo zero de sincronização ($O(1)$) em cenários de alta leitura?

## Resposta
### Quick Answer
**Solução Direta**:
- **Copy-On-Write (`CopyOnWriteArrayList`)**:
  - **Leituras**: Acessam o array interno imutável diretamente sem nenhum lock ou barreira de sincronização (velocidade nativa máxima).
  - **Escritas**: Criam uma cópia completa do array (`clone()`), aplicam a modificação na cópia e trocam a referência do array via ponteiro `volatile` atômico.
  - Ideal para cenários com $99.9\%$ de leituras e pouquíssimas escritas (ex: listas de ouvintes de eventos / cache de configurações).
- **Read-Copy-Update (RCU)**: Padrão similar utilizado no Kernel Linux, onde leitores não sofrem bloqueio e os dados antigos são desalocados após um período de graça (*grace period*).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/hazard-pointers-safe-memory-reclaim-loop.webm">
    <p>Visualização: Registro de ponteiros protegidos impedindo que threads leitoras acessem memória liberada por outra thread.</p>
  </video>
</div>

| Operação | Copy-On-Write Performance | Mecanismo |
|---|---|---|
| **Leitura (`get`)** | $O(1)$ Custo Zero de Lock | Acesso direto a array imutável |
| **Escrita (`add`)** | $O(N)$ Custo Alto de Cópia | Clona array inteiro + troca de ponteiro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Se houver muitas escritas frequentes, Copy-On-Write gera alto consumo de GC e degrada a performance severamente.

</details>
