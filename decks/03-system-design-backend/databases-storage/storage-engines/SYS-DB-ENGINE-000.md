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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Estrutura B+Tree em Storage Engines Relacionais (InnoDB / Postgres)</text>
  <g transform="translate(40, 50)">
    <!-- Root Node -->
    <rect x="230" y="0" width="140" height="30" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="20" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Root: [ 20 | 50 ]</text>

    <!-- Intermediate Nodes -->
    <rect x="90" y="45" width="130" height="28" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1"/>
    <text x="155" y="63" fill="#ffffff" font-size="10" text-anchor="middle">[ 5 | 12 ]</text>

    <rect x="380" y="45" width="130" height="28" rx="4" fill="#0369a1" stroke="#38bdf8" stroke-width="1"/>
    <text x="445" y="63" fill="#ffffff" font-size="10" text-anchor="middle">[ 60 | 80 ]</text>

    <!-- Leaf Nodes (Doubly Linked) -->
    <g transform="translate(0, 90)">
      <rect x="0" y="0" width="130" height="35" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
      <text x="65" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Folha [1..19]</text>

      <rect x="155" y="0" width="130" height="35" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
      <text x="220" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Folha [20..49]</text>

      <rect x="310" y="0" width="130" height="35" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
      <text x="375" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Folha [50..79]</text>

      <rect x="465" y="0" width="135" height="35" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
      <text x="532" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Folha [80..99]</text>

      <!-- Linked list arrows -->
      <line x1="130" y1="18" x2="155" y2="18" stroke="#10b981" stroke-width="2"/>
      <line x1="285" y1="18" x2="310" y2="18" stroke="#10b981" stroke-width="2"/>
      <line x1="440" y1="18" x2="465" y2="18" stroke="#10b981" stroke-width="2"/>
    </g>
  </g>
  <text x="340" y="200" fill="#94a3b8" font-size="10" text-anchor="middle">Folhas duplamente encadeadas permitem Range Scans sequenciais contíguos em disco sem subir na árvore.</text>

</svg>

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
