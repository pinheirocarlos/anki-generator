---
id: SYS-RES-FAULTTOL-006
title: "Intuição Fundamental de Circuit Breakers: O Disjuntor Elétrico da Residência"
tags:
  - level::l2-fundamental
  - topic::sys::resilience
  - company::netflix
  - freq::high
---

## Pergunta
Qual é a intuição fundamental do padrão Circuit Breaker (Disjuntor) e como ele impede que a falha de um único microsserviço derrube o sistema inteiro em cascata?

## Resposta
### Quick Answer
**Solução Direta**:
- Se o serviço de Pagamento ficar lento ou fora do ar, e o serviço de Pedidos continuar disparando milhares de chamadas que ficam travadas esperando timeout (30s cada), **todas as threads do serviço de Pedidos se esgotam**, derrubando-o também (*Cascading Failure*).
- O **Circuit Breaker** monitora a taxa de erros e opera em 3 estados (como um disjuntor elétrico):
  - **Fechado (Closed - Normal)**: O tráfego flui normalmente.
  - **Aberto (Open - Desarmado)**: Se a taxa de erros ultrapassar 50%, o disjuntor desarma e **rejeita chamadas imediatamente sem chamar o serviço com falha** (Fast-Fail), retornando um fallback amigável.
  - **Meio-Aberto (Half-Open - Teste)**: Após um tempo de espera (ex: 30s), deixa passar uma quantidade pequena de requisições de teste para verificar se o serviço se recuperou.

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Máquina de Estados do Circuit Breaker</text>

  <!-- Estado 1: FECHADO (Normal) -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="140" height="90" fill="#065f46" stroke="#10b981" stroke-width="2" rx="8" />
    <text x="70" y="24" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">FECHADO (Closed)</text>
    <text x="70" y="46" fill="#ffffff" font-size="10" text-anchor="middle">✅ Tudo Normal</text>
    <text x="70" y="68" fill="#34d399" font-size="9" text-anchor="middle">Requisições passam</text>
  </g>

  <!-- Seta: Erros ultrapassam limite -->
  <path d="M 185 85 L 235 85" fill="none" stroke="#ef4444" stroke-width="2" />
  <polygon points="235,85 225,80 225,90" fill="#ef4444" />
  <text x="210" y="75" fill="#fca5a5" font-size="8" text-anchor="middle">Falhas &gt; 50%</text>

  <!-- Estado 2: ABERTO (Desarmado) -->
  <g transform="translate(245, 50)">
    <rect x="0" y="0" width="140" height="90" fill="#7f1d1d" stroke="#ef4444" stroke-width="2" rx="8" />
    <text x="70" y="24" fill="#fca5a5" font-size="11" font-weight="bold" text-anchor="middle">ABERTO (Open)</text>
    <text x="70" y="46" fill="#ffffff" font-size="10" text-anchor="middle">🚫 Corta o Tráfego</text>
    <text x="70" y="68" fill="#fca5a5" font-size="9" text-anchor="middle">Retorna Fallback / Erro</text>
  </g>

  <!-- Seta: Sleep Time Passa -->
  <path d="M 390 85 L 435 85" fill="none" stroke="#f59e0b" stroke-width="2" />
  <polygon points="435,85 425,80 425,90" fill="#f59e0b" />
  <text x="412" y="75" fill="#fde68a" font-size="8" text-anchor="middle">Tempo passa</text>

  <!-- Estado 3: MEIO-ABERTO -->
  <g transform="translate(445, 50)">
    <rect x="0" y="0" width="130" height="90" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="8" />
    <text x="65" y="24" fill="#fde68a" font-size="11" font-weight="bold" text-anchor="middle">MEIO-ABERTO</text>
    <text x="65" y="46" fill="#ffffff" font-size="10" text-anchor="middle">🔍 Teste Gradual</text>
    <text x="65" y="68" fill="#fde68a" font-size="9" text-anchor="middle">Se OK volta a Fechado</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Combinado com Retries + Exponential Backoff com Jitter para não sobrecarregar!</text>
</svg>
<p>Visualização: Máquina de estados do Circuit Breaker operando como disjuntor de segurança: isolamento de falhas catastróficas e restabelecimento gradual do serviço.</p>

| Mecanismo de Resiliência | O que Faz | Analogia do Cotidiano |
|---|---|---|
| **Circuit Breaker** | Interrompe chamadas a serviços que estão falhando | O disjuntor da casa que desarma para a fiação não pegar fogo. |
| **Fallback** | Resposta alternativa de emergência | A luz de emergência que acende no prédio quando falta eletricidade da rua. |
| **Exponential Backoff & Jitter** | Re-tentativas com pausas cada vez maiores e aleatórias | Se a porta está emperrada, esperar 1s, depois 2s, depois 4s em vez de esmurrar sem parar. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Perigo de Re-tentativas Cegas (Retry Storm)
Se um banco de dados cai por sobrecarga e 10.000 clientes tentam reenviar a requisição imediatamente a cada 100 milissegundos (*Thundering Herd de Retries*), o banco nunca conseguirá subir de volta.
**Solução Obrigatória**: Re-tentar com **Exponential Backoff + Jitter** ($t = 2^{\text{tentativa}} + \text{random}(0, 500\text{ms})$).

#### Key Takeaways
- Resiliência em sistemas distribuídos assume que falhas são normais e frequentes.
- Bibliotecas consagradas: **Resilience4j** (Java), **Hystrix** (Netflix), **Sony/gobreaker** (Go).

</details>
