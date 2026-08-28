---
id: DSA-STRUCT-HASH-003
title: "Resolução de Colisões por Encadeamento Separado (Separate Chaining)"
tags:
  - level::l3-junior
  - topic::dsa::hash-tables
  - company::microsoft
  - freq::high
---

## Pergunta
Como funciona a resolução de colisões por **Encadeamento Separado (Separate Chaining)** em tabelas hash?

## Resposta
### Quick Answer
**Solução Direta**:
- Em **Separate Chaining**, cada posição do array de buckets armazena uma lista encadeada (ou árvore binária balanceada) contendo todas as entradas que colidiram naquele mesmo índice.
- Ao buscar uma chave:
  1. Calcula-se o índice do bucket via $\text{hash}(k) \pmod M$.
  2. Percorre-se a lista daquele bucket comparando as chaves via `equals()`.
- **Complexidade**: $O(1)$ em média (com distribuição uniforme); $O(N)$ no pior caso (se todas as chaves colidirem no mesmo bucket).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Robin Hood Hashing: Minimização da Variância de Sondagem</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Princípio: "Tira do rico (baixo DIB) e dá ao pobre (alto DIB)"</text>
    <text x="30" y="45" fill="#f8fafc" font-size="11">DIB (Distance from Initial Bucket): conta quantos passos longe do hash original o item está.</text>
    <text x="30" y="62" fill="#10b981" font-size="11">Se novo_item.DIB &gt; slot.DIB → troca os elementos e continua sondando o desalojado.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz o desvio padrão do tempo de busca, garantindo buscas rápidas mesmo com fator de carga de 0.9</text>

</svg>

<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Robin Hood Hashing: Minimização da Variância de Sondagem</text>
  <g transform="translate(80, 50)">
    <rect x="0" y="0" width="520" height="75" fill="#1e293b" stroke="#3b82f6" rx="6"/>
    <text x="260" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Princípio: "Tira do rico (baixo DIB) e dá ao pobre (alto DIB)"</text>
    <text x="30" y="45" fill="#f8fafc" font-size="11">DIB (Distance from Initial Bucket): conta quantos passos longe do hash original o item está.</text>
    <text x="30" y="62" fill="#10b981" font-size="11">Se novo_item.DIB &gt; slot.DIB → troca os elementos e continua sondando o desalojado.</text>
  </g>
  <text x="340" y="160" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">Reduz o desvio padrão do tempo de busca, garantindo buscas rápidas mesmo com fator de carga de 0.9</text>

</svg>

| Estratégia de Colisão | Estrutura no Bucket | Tratamento de Colisão |
|---|---|---|
| **Separate Chaining** | Lista Encadeada / AVL | Insere novo nó na lista do bucket |
| **Open Addressing** | Elemento direto no slot | Procura próximo slot livre |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização no Java 8 (Treeification)
Quando um bucket individual acumula **mais de 8 nós** e a capacidade total é $\ge 64$, o Java converte a lista encadeada daquele bucket em uma **Red-Black Tree**, melhorando o pior caso de busca de $O(N)$ para $O(\log N)$ contra ataques de DoS por colisão de hash.

#### Key Takeaways
- Separate Chaining é simples de implementar e degrada graciosamente mesmo quando o fator de carga ultrapassa $1.0$.

</details>
