---
id: SYS-MSG-GUARANTEES-006
title: "Intuição Fundamental de Idempotência: O Botão do Elevador e as Chaves Anti-Duplicidade"
tags:
  - level::l2-fundamental
  - topic::sys::messaging
  - company::stripe
  - freq::high
---

## Pergunta
Qual é a intuição fundamental por trás de operações idempotentes e por que elas são indispensáveis para lidar com mensagens duplicadas em sistemas distribuídos?

## Resposta
### Quick Answer
**Solução Direta**:
- Em redes de computadores, mensagens **inevitavelmente serão duplicadas** (garantia de entrega *At-Least-Once*): se o servidor processa o pagamento com sucesso mas a conexão cai antes de enviar o comprovante de volta, o cliente reenviará a requisição.
- Uma operação é **Idempotente** quando executá-la **1 vez ou 1.000 vezes produz exatamente o mesmo resultado final**:
  - **Exemplo Não-Idempotente**: `saldo = saldo - 50` (se rodar 2 vezes, debita R$ 100).
  - **Exemplo Idempotente**: `saldo = 50` ou `cobrar(chave_idempotencia: "req-9876")`.
- Usando uma **Chave de Idempotência (Idempotency Key)**, o sistema checa se já processou aquele ID único; se já processou, apenas devolve a resposta salva sem refazer a cobrança.

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Tratamento de Retries com Chave de Idempotência</text>

  <!-- Cliente Enviando Retries -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="130" height="90" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="8" />
    <text x="65" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">Cliente / App</text>
    <text x="65" y="44" fill="#f8fafc" font-size="9" text-anchor="middle">1ª tentativa: timeout</text>
    <text x="65" y="60" fill="#f59e0b" font-size="9" text-anchor="middle">2ª tentativa: retry</text>
    <text x="65" y="76" fill="#a7f3d0" font-size="8" font-family="monospace" text-anchor="middle">Key: "tx_abc123"</text>
  </g>

  <!-- Gateway / Tabela de Idempotência -->
  <g transform="translate(220, 45)">
    <rect x="0" y="0" width="160" height="100" fill="#065f46" stroke="#10b981" stroke-width="2" rx="8" />
    <text x="80" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Gateway de Pagamento</text>
    <rect x="15" y="34" width="130" height="24" fill="#0f172a" rx="4" />
    <text x="80" y="50" fill="#34d399" font-size="9" font-family="monospace" text-anchor="middle">Chave tx_abc123: VISTA</text>
    <text x="80" y="74" fill="#ffffff" font-size="10" text-anchor="middle">Ignora o 2º processamento</text>
    <text x="80" y="90" fill="#a7f3d0" font-size="8" text-anchor="middle">Retorna resposta em cache ✓</text>
  </g>

  <!-- Banco de Dados Financeiro Protegido -->
  <g transform="translate(430, 50)">
    <rect x="0" y="0" width="130" height="90" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="8" />
    <text x="65" y="24" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">Core Bancário</text>
    <text x="65" y="50" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Cobrança Única</text>
    <text x="65" y="70" fill="#10b981" font-size="9" text-anchor="middle">Zero risco de bitributar!</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Analogia: Apertar o botão do elevador 10 vezes não faz descer 10 elevadores!</text>
</svg>
<p>Visualização: Analogia do botão de elevador: chave de idempotência garantindo que múltiplas retentativas de envio executem a ação exatamente uma vez.</p>

| Método HTTP / Ação | É Idempotente? | Comportamento ao Repetir |
|---|---|---|
| **`GET` / `DELETE` / `PUT`** | Sim (por especificação) | Pedir o mesmo dado ou deletar o mesmo ID várias vezes deixa o sistema no mesmo estado final. |
| **`POST` sem Chave de Idempotência** | Não | Repetir a chamada criará múltiplos pedidos e cobranças indesejadas no cartão. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Implementar Idempotência na Prática (Tabela de Locks / Redis)
1. Quando a requisição chega com o cabeçalho `Idempotency-Key: uuid-v4`, o backend tenta inserir a chave no Redis com status `PROCESSING` e TTL de 2 minutos (`SET key uuid NX EX 120`).
2. Se a inserção falhar (chave já existe), o backend aguarda ou retorna a resposta armazenada.
3. Se a inserção passar, o backend executa a cobrança no banco, salva a resposta final na chave com status `COMPLETED` e retorna ao cliente.

#### Key Takeaways
- Como a entrega exatamente uma vez (*Exactly-Once*) na rede física é uma ilusão teórica impossível, a indústria resolve com **At-Least-Once Delivery + Consumidor Idempotente**.
- Essencial em APIs de pagamento (Stripe, Adyen, Pix, PayPal).

</details>
