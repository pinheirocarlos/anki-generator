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
