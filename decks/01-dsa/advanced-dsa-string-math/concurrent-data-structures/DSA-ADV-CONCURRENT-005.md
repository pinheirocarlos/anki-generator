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
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Read-Copy-Update (RCU): Leituras com Custo Zero de Sincronização</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#10b981" rx="6"/>
    <text x="260" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Leitores Lock-Free &amp; Período de Graça para Escritores</text>
    <text x="20" y="45" fill="#f8fafc" font-size="11">Escritor aloca nova cópia modificada e troca o ponteiro global atomicamente.</text>
    <text x="20" y="62" fill="#38bdf8" font-size="11">Memória antiga só é desalocada após todas as threads leitoras concluírem o Período de Graça.</text>
  </g>
  <text x="340" y="160" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Ideal para tabelas de roteamento e configurações em cenários de 99%+ leituras</text>
</svg>
<p>Visualização: Ciclo de vida de Read-Copy-Update (RCU) com leitores concorrentes sem bloqueio e liberação de memória após o período de graça.</p>

| Operação | Copy-On-Write Performance | Mecanismo |
|---|---|---|
| **Leitura (`get`)** | $O(1)$ Custo Zero de Lock | Acesso direto a array imutável |
| **Escrita (`add`)** | $O(N)$ Custo Alto de Cópia | Clona array inteiro + troca de ponteiro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- Se houver muitas escritas frequentes, Copy-On-Write gera alto consumo de GC e degrada a performance severamente.

</details>
