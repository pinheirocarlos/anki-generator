---
id: SYS-RES-RATELIMIT-000
title: "Algoritmos de Rate Limiting: Token Bucket vs Leaky Bucket vs Sliding Window Log"
tags:
  - level::l3-junior
  - topic::sys::resilience
  - company::stripe
  - freq::high
---

## Pergunta
Qual é a diferença de funcionamento e capacidade de absorção de rajadas (Bursts) entre os algoritmos Token Bucket e Leaky Bucket?

## Resposta
### Quick Answer
**Solução Direta**:
- **Token Bucket**:
  - Tokens são adicionados a um balde de capacidade fixa $C$ a uma taxa constante $R$ tokens/segundo.
  - Cada requisição consome 1 token. Se houver tokens, a requisição passa; se o balde estiver vazio, é rejeitada (`429 Too Many Requests`).
  - **Permite rajadas (Bursts)** de até $C$ requisições simultâneas instantâneas.
- **Leaky Bucket**:
  - Requisições entram em uma fila FIFO e vazam (*Leaked*) para processamento a uma **taxa estritamente constante e suave**.
  - Se a fila transbordar, o excesso é descartado.
  - **Elimina rajadas completamente**, ideal para proteger serviços downstream sensíveis a picos.

### Dual Coding Visual
| Algoritmo | Permite Rajadas (Bursts)? | Taxa de Saída para o Backend |
|---|---|---|
| **Token Bucket** | **SIM (Até a capacidade do balde)** | Variável (Responde instantaneamente aos picos) |
| **Leaky Bucket** | NÃO (Suaviza tráfego em fila FIFO) | Estritamente constante |
| **Fixed Window** | SIM (Vulnerável a $2x$ limite nas bordas) | Variável (Picos nas transições de janela) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o Token Bucket é o Mais Usado (Stripe, AWS)
- Usuários legítimos frequentemente realizam disparos em rajada (ex: carregar uma página com 15 assets). O Token Bucket aceita a rajada se o usuário estava ocioso, enquanto mantém a taxa média delimitada a longo prazo.

</details>
