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

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compare-And-Swap (CAS): Primitiva Atômica em Hardware</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">bool CAS(memory_loc, expected_val, new_val)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Executado como instrução atômica única no barramento da CPU (CMPXCHG em x86).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Se o valor atual == expected_val → atualiza para new_val e retorna true; senão falha.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Se falhar, a thread repete o loop de CAS em modo spin sem bloquear o sistema</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Compare-And-Swap (CAS): Primitiva Atômica em Hardware</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">bool CAS(memory_loc, expected_val, new_val)</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Executado como instrução atômica única no barramento da CPU (CMPXCHG em x86).</text>
    <text x="20" y="62" fill="#34d399" font-size="11">Se o valor atual == expected_val → atualiza para new_val e retorna true; senão falha.</text>
  </g>
  <text x="340" y="160" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Se falhar, a thread repete o loop de CAS em modo spin sem bloquear o sistema</text>

</svg>

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
