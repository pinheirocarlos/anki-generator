---
id: SYS-DIST-CONSENSUS-002
title: "Quorum Reads e Writes (Fórmula R + W > N) em Sistemas Leaderless"
tags:
  - level::l4-pleno
  - topic::sys::distributed
  - company::amazon
  - freq::high
---

## Pergunta
Como a fórmula de Quorum $R + W > N$ garante leituras com dados atualizados em arquiteturas distribuídas sem líder (*Leaderless* como DynamoDB e Cassandra)?

## Resposta
### Quick Answer
**Solução Direta**:
- Em um cluster com $N$ réplicas:
  - $W$ = Número mínimo de réplicas que devem confirmar uma escrita antes de retornar sucesso.
  - $R$ = Número mínimo de réplicas consultadas em uma leitura.
- **Princípio da Sobreposição (Pigeonhole Principle)**: Se $R + W > N$, o conjunto de nós lidos ($R$) e o conjunto de nós escritos ($W$) obrigatoriamente compartilham **pelo menos um nó em comum**.
- Esse nó compartilhado conterá o timestamp/versão mais recente, permitindo ao coordenador retornar o dado correto e disparar reparo em segundo plano (*Read Repair*).

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Quorum de Leitura e Escrita (R + W &gt; N) no Modelo Dynamo</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="25" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Cluster de N = 5 Nós Réplica</text>

    <!-- Write Quorum -->
    <rect x="20" y="45" width="260" height="50" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
    <text x="150" y="68" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">Quorum de Escrita: W = 3</text>
    <text x="150" y="85" fill="#a7f3d0" font-size="9" text-anchor="middle">Gravação confirmada em 3 nós</text>

    <!-- Read Quorum -->
    <rect x="320" y="45" width="260" height="50" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="450" y="68" fill="#e0f2fe" font-size="11" font-weight="bold" text-anchor="middle">Quorum de Leitura: R = 3</text>
    <text x="450" y="85" fill="#bae6fd" font-size="9" text-anchor="middle">Leitura consulta 3 nós</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Como R (3) + W (3) = 6 &gt; N (5), ao menos 1 nó da leitura certamente contém a versão mais recente escrita.</text>

</svg>

| Configuração ($N=3$) | Parâmetros ($W, R$) | Garantia de Consistência |
|---|---|---|
| **Quorum Forte** | $W=2, R=2$ ($R+W=4 > 3$) | Consistência forte (Lê escrita mais recente) |
| **Otimizado para Escrita** | $W=1, R=3$ ($R+W=4 > 3$) | Escritas ultra-rápidas, leituras mais lentas |
| **Leituras Eventuais (Baixa Latência)** | $W=1, R=1$ ($R+W=2 \le 3$) | Risco de ler dados defasados (Eventual) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo com Read Repair
1. Cliente escreve com $W=2$ nos nós $[A, B, C]$; nós $A$ e $B$ gravam com timestamp $T_2$, nó $C$ está temporariamente inacessível.
2. Cliente lê com $R=2$ consultando nós $B$ ($T_2$) e $C$ ($T_1$).
3. O coordenador identifica que $T_2 > T_1$, devolve o valor de $T_2$ ao cliente e envia um update assíncrono para atualizar o nó $C$.

</details>
