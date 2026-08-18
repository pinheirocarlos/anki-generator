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
