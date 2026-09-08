---
id: SYS-RES-FAULTTOL-000
title: "Circuit Breaker Pattern: Estados Closed, Open e Half-Open"
tags:
  - level::l3-junior
  - topic::sys::resilience
  - company::netflix
  - freq::high
---

## Pergunta
Como o padrão Circuit Breaker protege microsserviços contra falhas em cascata alternando entre os estados Closed, Open e Half-Open?

## Resposta
### Quick Answer
**Solução Direta**:
- **Closed (Fechado - Operação Normal)**:
  - Todas as requisições passam normalmente para o serviço remoto.
  - Monitora a taxa de falhas/timeouts. Se a taxa ultrapassar um limite pré-configurado (ex: $50\%$ de erros em 10s), o circuito transiciona para **Open**.
- **Open (Aberto - Falha Rápida / Fail-Fast)**:
  - Todas as chamadas são **rejeitadas instantaneamente na aplicação local** sem tentar chamar a rede (retornando fallback ou erro imediato).
  - Permite que o serviço sobrecarregado respire e se recupere.
- **Half-Open (Semi-Aberto - Teste de Recuperação)**:
  - Após um período de resfriamento (*Sleep Window*, ex: 30s), permite que um número limitado de requisições de teste passe.
  - Se tiverem sucesso, o circuito volta para **Closed**; se falharem, retorna para **Open**.

### Dual Coding Visual
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Máquina de Estados do Circuit Breaker: Closed, Open, Half-Open</text>
  <g transform="translate(40, 50)">
    <!-- Closed -->
    <rect x="0" y="20" width="160" height="90" rx="8" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="80" y="45" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">CLOSED (Normal)</text>
    <text x="80" y="68" fill="#86efac" font-size="9" text-anchor="middle">Requisições passam</text>
    <text x="80" y="88" fill="#a7f3d0" font-size="9" text-anchor="middle">Falhas &lt; Limite (ex: 50%)</text>

    <!-- Open -->
    <rect x="220" y="20" width="160" height="90" rx="8" fill="#7f1d1d" stroke="#f43f5e" stroke-width="2"/>
    <text x="300" y="45" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">OPEN (Interrompido)</text>
    <text x="300" y="68" fill="#fca5a5" font-size="9" text-anchor="middle">Falha rápida instantânea</text>
    <text x="300" y="88" fill="#fca5a5" font-size="9" text-anchor="middle">Sleep Window: 30s</text>

    <!-- Half-Open -->
    <rect x="440" y="20" width="160" height="90" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="520" y="45" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">HALF-OPEN (Teste)</text>
    <text x="520" y="68" fill="#fde68a" font-size="9" text-anchor="middle">Permite 3 requisições teste</text>
    <text x="520" y="88" fill="#fde68a" font-size="9" text-anchor="middle">Sucesso → Closed / Falha → Open</text>
  </g>
  <text x="340" y="210" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Evita esgotamento de threads (Cascading Failure) isolando serviços downstream degradados.</text>

</svg>
<p>Visualização: Circuit Breaker interrompendo requisições instantaneamente (Open) após limite de erros para evitar sobrecarga em cascata.</p>

| Estado do Circuito | Comportamento das Chamadas | Próxima Transição |
|---|---|---|
| **Closed** | Executa chamadas normalmente na rede | Vira **Open** se taxa de erro $>$ limite |
| **Open** | Fail-fast instantâneo (sem chamada de rede) | Vira **Half-Open** após timeout de espera |
| **Half-Open** | Envia chamadas de teste limitadas | Vira **Closed** se sucesso, ou **Open** se erro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o Fail-Fast é Vital
- Sem Circuit Breaker, centenas de threads ficam travadas aguardando timeout de 5 segundos de um serviço fora do ar, esgotando o Thread Pool da aplicação chamadora e derrubando o sistema inteiro (*Cascading Failure*).

</details>
