---
id: DSA-ADV-CONCURRENT-001
title: "Evolução do ConcurrentHashMap: Striped Locking (Java 7) vs CAS + TreeBins (Java 8+)"
tags:
  - level::l4-pleno
  - topic::dsa::concurrent-data-structures
  - company::google
  - freq::high
---

## Pergunta
Qual a evolução arquitetural do **ConcurrentHashMap** entre Java 7 (Segment Locking) e Java 8+ (CAS + Synchronized Node-Level Locking)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Java 7 (Striped Locking / Segments)**:
  - Dividia a tabela em uma matriz fixa de 16 segmentos independentes (`Segment<K,V>`), onde cada segmento era um `ReentrantLock`. Operações em buckets de segmentos diferentes ocorriam em paralelo, mas múltiplos acessos ao mesmo segmento bloqueavam.
- **Java 8+ (CAS + Synchronized Node-Level)**:
  - Removeu completamente os segmentos.
  - Inserção em bucket vazio usa **CAS sem lock** (`casTabAt`).
  - Inserção em bucket com colisão trava **apenas o primeiro nó daquele bucket específico** (`synchronized(node)`), reduzindo a contenção para granularidade de 1 único bucket.
  - Converte buckets longos ($> 8$ nós) em árvores rubro-negras (`TreeBin`) garantindo tempo $O(\log K)$ em colisões severas.

### Dual Coding Visual
| Característica | ConcurrentHashMap Java 7 | ConcurrentHashMap Java 8+ |
|---|---|---|
| **Granularidade de Lock** | Segmento (1/16 da tabela) | Nó da cabeça do bucket individual |
| **Bucket Vazio** | Exigia lock de segmento | Inserção 100% Lock-Free via CAS |
| **Colisão Pior Caso** | Lista encadeada $O(K)$ | Árvore Red-Black $O(\log K)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- É um dos estudos de caso de concorrência e design de estruturas de dados mais cobrados em entrevistas para vagas Sênior/Staff.

</details>
