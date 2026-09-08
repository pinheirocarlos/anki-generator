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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Coletor Tricolor Concorrente (Tri-Color Mark-Sweep) do Go</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#64748b"/>
    <text x="85" y="22" fill="#cbd5e1" font-size="11" font-weight="bold" text-anchor="middle">Branco (White)</text>
    <text x="85" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Objetos não visitados</text>
    <text x="85" y="60" fill="#fca5a5" font-size="9" font-weight="bold" text-anchor="middle">Candidatos a Coleta</text>

    <rect x="195" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="280" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Cinza (Grey)</text>
    <text x="280" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Alcançáveis / Na Fila</text>
    <text x="280" y="60" fill="#fef3c7" font-size="9" font-weight="bold" text-anchor="middle">Filhos ainda não varridos</text>

    <rect x="390" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="475" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Preto (Black)</text>
    <text x="475" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Vivos e Confirmados</text>
    <text x="475" y="60" fill="#a7f3d0" font-size="9" font-weight="bold" text-anchor="middle">Todos os filhos verificados</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Write Barrier (Write Barrier Híbrido) previne que ponteiros pretos apontem para brancos sem passar por cinza.</text>

</svg>
<p>Visualização: Algoritmo Tri-Color Concurrent Mark-Sweep do Go classificando objetos em Branco (candidato a descarte), Cinza (em visitação na fronteira) e Preto (alcançável e verificado) com barreira de escrita híbrida.</p>

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
