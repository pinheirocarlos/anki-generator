---
id: CS-RNT-JVM-000
title: "Organização da Memória da JVM: Metaspace, Heap e Stack"
tags:
  - level::l3-junior
  - topic::cs::runtimes
  - company::google
  - freq::high
---

## Pergunta
Como a memória da JVM é dividida entre **Metaspace (Off-Heap)**, **Heap** (Eden, Survivor, Tenured) e **Thread Stack**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Metaspace (Off-Heap / Nativo)**: Armazena metadados de classes carregadas, bytecode de métodos e constant pools; cresce dinamicamente na memória nativa do SO.
- **JVM Heap (Compartilhado / Gerenciado pelo GC)**: Onde todos os objetos instanciados com `new` residem:
  - *Young Generation*: Composta por **Eden** (onde novos objetos nascem) e **Survivor Spaces (S0 / S1)** (onde objetos que sobreviveram a coletas menores são promovidos).
  - *Old / Tenured Generation*: Onde objetos de longa vida que sobreviveram a múltiplos ciclos de GC residem.
- **Thread Stack (Privativo por Thread)**: Armazena frames de execução de métodos, variáveis locais primitivas e ponteiros de referência para objetos do Heap.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Layout de Memória da JVM: Heap, Metaspace e Stacks</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="200" height="75" rx="5" fill="#065f46" stroke="#10b981"/>
    <text x="100" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">JVM Heap (-Xmx / -Xms)</text>
    <text x="100" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Objetos e Arrays</text>
    <text x="100" y="58" fill="#a7f3d0" font-size="9" text-anchor="middle">Gerenciado pelo Garbage Collector</text>

    <rect x="215" y="0" width="160" height="75" rx="5" fill="#1e3a8a" stroke="#3b82f6"/>
    <text x="295" y="22" fill="#60a5fa" font-size="11" font-weight="bold" text-anchor="middle">Metaspace (Off-Heap)</text>
    <text x="295" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">Metadados de Classes</text>
    <text x="295" y="58" fill="#bae6fd" font-size="9" text-anchor="middle">Alocado na RAM nativa</text>

    <rect x="390" y="0" width="170" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="475" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Thread Stacks (-Xss)</text>
    <text x="475" y="42" fill="#f8fafc" font-size="9" text-anchor="middle">~1 MB por thread nativa</text>
    <text x="475" y="58" fill="#fef3c7" font-size="9" text-anchor="middle">Frames, primitivos e referências</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">O consumo total de RAM da JVM = Heap + Metaspace + (Threads × Xss) + Code Cache + Direct Buffers.</text>

</svg>
<p>Visualização: Topologia de memória do processo Java dividindo a Heap gerenciada pelo GC, o Metaspace em RAM nativa para metadados de classes e as Stacks isoladas de cada thread do sistema operacional.</p>

| Área de Memória | Compartilhada entre Threads? | Gerenciada pelo Garbage Collector? |
|---|---|---|
| **JVM Heap** | Sim (Global) | **Sim (Eden, Survivor, Tenured)** |
| **Metaspace** | Sim (Global) | Não (Coletado apenas ao descarregar ClassLoader) |
| **Thread Stack**| Não (Privativo por Thread) | Não (Desalocação instantânea no retorno do método) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Ciclo de Vida de um Objeto na JVM
1. O objeto nasce no espaço **Eden**.
2. Quando Eden enche, dispara um **Minor GC**: objetos vivos são copiados para **S0**.
3. No próximo Minor GC, sobreviventes de Eden e S0 são copiados para **S1** (alternando entre S0 e S1 a cada ciclo e incrementando a "idade" do objeto).
4. Ao atingir a idade limite (*Tenuring Threshold*, padrão 15 ciclos), o objeto é promovido para a **Old Generation**.

#### Key Takeaways
- Entender essa separação é a chave para diagnosticar erros clássicos de `OutOfMemoryError: Java heap space` versus `OutOfMemoryError: Metaspace`.

</details>
