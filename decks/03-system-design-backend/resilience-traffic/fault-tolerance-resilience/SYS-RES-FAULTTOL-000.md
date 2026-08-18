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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/circuit-breaker-state-transitions-closed-open-half-loop.webm">
    <p>Visualização: Circuit Breaker interrompendo requisições instantaneamente (Open) após limite de erros para evitar sobrecarga em cascata.</p>
  </video>
</div>

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
