---
id: DSA-STRUCT-HASH-000
title: "Funcionamento Interno de Tabelas Hash e Papel da Função de Hash"
tags:
  - level::l3-junior
  - topic::dsa::hash-tables
  - company::google
  - freq::high
---

## Pergunta
Como funciona internamente uma **Tabela Hash (Hash Map)** e qual o papel desempenhado pela **Função de Hash**?

## Resposta
### Quick Answer
**Solução Direta**:
- Uma Tabela Hash mantém um array interno de *buckets* indexados de $0$ a $M-1$.
- A **Função de Hash** mapeia uma chave arbitrária (ex: `"user_123"`) para um número inteiro pseudo-aleatório e determinístico:
  $$\text{índice} = \text{hash}(\text{chave}) \pmod M$$
- Esse cálculo direto permite localizar, inserir e remover pares chave-valor em tempo médio $O(1)$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/hash-function-bucket-index-loop.webm">
    <p>Visualização: Cálculo da função hash determinística e mapeamento de chave para índice do array via hash(key) % N.</p>
  </video>
</div>

| Componente | Função Principal | Complexidade Média |
|---|---|---|
| **Função de Hash** | Mapeia chave para inteiro uniforme | $O(L)$ (tam da chave) |
| **Array de Buckets** | Acesso indexado ao endereço físico | $O(1)$ Instantâneo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Propriedades de uma Boa Função de Hash
1. **Determinismo**: A mesma chave sempre produz exatamente o mesmo valor de hash.
2. **Distribuição Uniforme**: Espalha as chaves homogeneamente por todos os buckets para minimizar colisões.
3. **Eficiência**: Executa rapidamente em poucas instruções de CPU.

#### Key Takeaways
- Sem uma boa função de hash, chaves se concentram no mesmo bucket, degradando o tempo de busca de $O(1)$ para $O(N)$.

</details>
