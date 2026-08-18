---
id: SYS-DB-ENGINE-000
title: "Mecanismo Interno de B+Trees em Bancos Relacionais (MySQL InnoDB / PostgreSQL)"
tags:
  - level::l3-junior
  - topic::sys::databases
  - company::oracle
  - freq::high
---

## Pergunta
Por que bancos de dados relacionais (OLTP) utilizam B+Trees em vez de B-Trees convencionais ou árvores binárias balanceadas como estrutura de armazenamento primária?

## Resposta
### Quick Answer
**Solução Direta**:
- **B+Tree**: Todos os dados reais (registros ou ponteiros para tuplas) residem exclusivamente nas **folhas** (*Leaf Nodes*). Os nós internos contêm apenas chaves de roteamento.
- **Vantagens Críticas sobre B-Tree e AVL**:
  1. **Fan-out Gigante**: Nós internos cabem milhares de chaves por página de 16 KB, mantendo a altura da árvore extremamente baixa ($h=3$ a $4$ para bilhões de linhas, exigindo apenas 3-4 I/Os).
  2. **Range Queries Eficientes**: As folhas formam uma **lista duplamente ligada**, permitindo varreduras sequenciais sem necessidade de percorrer nós superiores.
  3. **Localidade de Cache**: Nós internos menores cabem facilmente no Buffer Pool da memória RAM.

### Dual Coding Visual
| Estrutura de Índice | Altura Típica ($N=10^9$) | Eficiência em Range Query (`BETWEEN`) |
|---|---|---|
| **Árvore AVL / Red-Black** | ~30 níveis ($O(\log_2 N)$) | Ruim (Travessia in-order com saltos aleatórios) |
| **B-Tree Padrão** | ~4-5 níveis | Média (Dados dispersos em nós intermediários) |
| **B+Tree (InnoDB)** | ~3-4 níveis (Fan-out $\approx 1.000$) | Excelente (Varredura direta na lista ligada das folhas) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o Fan-out Alto Reduz I/O de Disco
- Página típica do InnoDB = 16 KB.
- Se uma chave + ponteiro ocupa 16 bytes, um nó interno acomoda $\approx 1.000$ ponteiros (*Fan-out* $= 1.000$).
- Altura $h=1$: $1.000$ páginas.
- Altura $h=2$: $1.000.000$ páginas.
- Altura $h=3$: $1.000.000.000$ páginas (1 Bilhão de páginas com apenas 3 acessos a disco).

</details>
