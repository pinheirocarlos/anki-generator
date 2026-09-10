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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Evolução do ConcurrentHashMap: Java 7 vs Java 8+</text>
  <g transform="translate(60, 50)">
    <rect x="0" y="0" width="260" height="75" fill="#1e293b" stroke="#f59e0b" rx="6"/>
    <text x="130" y="22" fill="#fcd34d" font-size="11" font-weight="bold" text-anchor="middle">Java 7: Segmented / Striped Locks</text>
    <text x="15" y="45" fill="#f8fafc" font-size="10">Array fixo de 16 segmentos ReentrantLock.</text>
    <text x="15" y="60" fill="#fde68a" font-size="10">Bloqueia o segmento inteiro na escrita.</text>

    <g transform="translate(300, 0)">
      <rect x="0" y="0" width="260" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
      <text x="130" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Java 8+: CAS + TreeBins por Balde</text>
      <text x="15" y="45" fill="#f8fafc" font-size="10">CAS atômico no primeiro nó se vazio.</text>
      <text x="15" y="60" fill="#a7f3d0" font-size="10">Synchronized apenas na cabeça do balde colidido.</text>
    </g>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Concorrência fina por balde individual reduz contenção drasticamente em larga escala</text>
</svg>
<p>Visualização: Evolução arquitetural do ConcurrentHashMap de Striped Locks (Java 7) para CAS no primeiro nó de cada balde (Java 8+).</p>

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
