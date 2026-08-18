---
id: CS-RNT-GO-000
title: "Tri-Color Concurrent Mark-Sweep no Garbage Collector do Go"
tags:
  - level::l3-junior
  - topic::cs::runtimes
  - company::google
  - freq::high
---

## Pergunta
Como opera o algoritmo de **Tri-Color Concurrent Mark & Sweep** no Garbage Collector do runtime de Go?

## Resposta
### Quick Answer
**Solução Direta**:
- O Go utiliza um coletor de lixo não-geracional, concorrente e baseado em **três cores conceituais**:
  1. **Branco (White)**: Objetos candidatos à reciclagem (lixo potencial). No início do ciclo, todos os objetos são brancos.
  2. **Cinza (Grey)**: Objetos vivos alcançados pelo GC, mas cujos ponteiros filhos ainda não foram escaneados.
  3. **Preto (Black)**: Objetos vivos confirmados cujos ponteiros filhos já foram completamente escaneados.
- **Fluxo Concorrente**: O GC move objetos de Cinza para Preto enquanto as goroutines da aplicação continuam rodando.
- Ao término do escaneamento (quando a fila de Cinzas esvazia), qualquer objeto que permaneceu **Branco** não possui nenhuma referência viva e é liberado na fase de Sweep.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/runtimes/go-tri-color-gc-mark-sweep-loop.webm">
    <p>Visualização: Escaneamento concorrente com coloração Preto, Cinza e Branco com pausas STW sub-milissegundo.</p>
  </video>
</div>

| Cor do Objeto | Estado no Grafo de Memória | Ação do Coletor |
|---|---|---|
| **Branco** | Não visitado / Inalcançável | Será destruído na fase de Sweep |
| **Cinza** | Alcançável da raiz (Pendente) | Na fila para escanear filhos |
| **Preto** | Vivo com filhos escaneados | Preservado com certeza na memória |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o Go não é Geracional?
- Devido à agressiva **Escape Analysis** do compilador Go, a grande maioria dos objetos temporários de curta vida é alocada diretamente na **Stack** da Goroutine e desalocada com custo zero sem passar pelo GC.
- Portanto, o Heap do Go contém uma proporção muito maior de objetos de média e longa vida, reduzindo a vantagem teórica de um coletor geracional tradicional.

#### Key Takeaways
- As pausas STW do GC do Go são da ordem de **microsegundos (< 100 µs)**, focando em consistência e previsibilidade de latência para serviços web.

</details>
