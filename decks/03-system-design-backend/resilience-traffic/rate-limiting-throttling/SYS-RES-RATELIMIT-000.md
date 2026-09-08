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
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Algoritmos de Rate Limiting: Token Bucket vs Leaky Bucket</text>
  <g transform="translate(40, 50)">
    <!-- Token Bucket -->
    <rect x="0" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="140" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Token Bucket (Padrão AWS / Stripe)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Tokens chegam em taxa constante (r)</text>
    <text x="140" y="65" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Permite rajadas (bursts) até capacidade B</text>
    <text x="140" y="88" fill="#cbd5e1" font-size="10" text-anchor="middle">Requisição consome 1 token; se vazio: 429</text>
    <text x="140" y="112" fill="#34d399" font-size="9" text-anchor="middle">Memória O(1): salva (tokens, last_refill)</text>

    <!-- Leaky Bucket -->
    <rect x="320" y="0" width="280" height="135" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Leaky Bucket (Fila FIFO)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Requisições entram no balde com buffer</text>
    <text x="460" y="65" fill="#bae6fd" font-size="10" font-weight="bold" text-anchor="middle">Saída em vazão estritamente constante</text>
    <text x="460" y="88" fill="#f87171" font-size="10" text-anchor="middle">Elimina qualquer rajada (smooth flow)</text>
    <text x="460" y="112" fill="#cbd5e1" font-size="9" text-anchor="middle">Se buffer encher: descarta novas requisições</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Token Bucket é o mais adotado em APIs Web porque não penaliza picos legítimos de curta duração do cliente.</text>

</svg>
<p>Visualização: Algoritmo Leaky Bucket convertendo fluxos de requisições em rajada (bursty) em uma saída de taxa constante.</p>

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
