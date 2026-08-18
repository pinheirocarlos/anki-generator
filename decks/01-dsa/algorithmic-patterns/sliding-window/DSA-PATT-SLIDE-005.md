---
id: DSA-PATT-SLIDE-005
title: "Minimum Window Substring em O(N) com Contadores de Frequência"
tags:
  - level::l4-pleno
  - topic::dsa::sliding-window
  - company::meta
  - freq::high
---

## Pergunta
Como implementar o clássico hard **Minimum Window Substring** (LeetCode 76) em tempo linear $O(N)$ e espaço $O(|\Sigma|)$?

## Resposta
### Quick Answer
**Solução Direta**:
- Contamos a frequência dos caracteres da string alvo $T$ em um mapa `targetMap` e mantemos uma variável `formed` contando quantos caracteres únicos atingiram a frequência necessária.
- Expandimos `right`:
  - Se `windowMap[c] == targetMap[c]`, incrementamos `formed++`.
- Quando `formed == required` (janela válida contendo todo $T$):
  - Atualizamos a menor janela encontrada.
  - Contraímos `left++` removendo caracteres até que a janela deixe de ser válida (`formed--`).
- **Complexidade**: $O(|S| + |T|)$ tempo e $O(|\Sigma|)$ espaço (onde $|\Sigma| \le 128$ para ASCII).

### Dual Coding Visual
| Variável de Controle | Significado | Condição de Janela Válida |
|---|---|---|
| **`required`** | Total de caracteres únicos em $T$ | Constante |
| **`formed`** | Quantidade de caracteres atendidos na janela | Válida quando `formed == required` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Key Takeaways
- O uso de uma variável escalar `formed` evita comparar o mapa inteiro a cada passo ($O(|\Sigma|)$), mantendo cada avanço em tempo estritamente $O(1)$.

</details>
