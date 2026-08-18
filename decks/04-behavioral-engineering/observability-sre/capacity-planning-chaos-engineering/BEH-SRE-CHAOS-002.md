---
id: BEH-SRE-CHAOS-002
title: "Taxonomia de Testes de Carga: Load, Stress, Spike e Soak Tests com k6"
tags:
  - level::l3-junior
  - topic::behavioral::observability-sre
  - company::netflix
  - freq::high
---

## Pergunta
Qual é a distinção prática e o propósito de cada tipo de **Teste de Carga (Load, Stress, Spike e Soak Tests)** com ferramentas como `k6`?

## Resposta
### Quick Answer
**Solução Direta**:
- **Taxonomia dos 4 Tipos de Teste**:
  - **Load Test (Carga Típica)**: Avalia o comportamento e latências sob o volume esperado de tráfego regular diário.
  - **Stress Test (Ponto de Ruptura)**: Aumenta o tráfego progressivamente além da capacidade nominal para identificar o elo mais fraco (banco, pool de threads, conexões HTTP).
  - **Spike Test (Picos Abruptos)**: Injeta um aumento massivo de tráfego repentino (ex: de $1	ext{k} 	o 25	ext{k}$ QPS em segundos) para testar autoscaling e rate limiting.
  - **Soak / Endurance Test (Longa Duração)**: Mantém carga constante moderada por horas ou dias para detectar memory leaks e vazamentos de conexões.

### Dual Coding Visual
| Tipo de Teste | Curva de Tráfego | Objetivo Principal |
|---|---|---|
| **Load Test** | Carga estável no baseline | Validar conformidade de SLO |
| **Stress Test** | Rampa crescente contínua | Encontrar o ponto de saturação |
| **Spike Test** | Degrau súbito e íngreme | Validar resiliência a picos |
| **Soak Test** | Duração longa (24-48h) | Detectar vazamentos de memória |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Configuração com k6 (JavaScript)
```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 100 },  // Ramp-up
    { duration: '3m', target: 500 },  // Stress load
    { duration: '1m', target: 0 },    // Ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(99)<300'], // 99% das requisições < 300ms
    http_req_failed: ['rate<0.01'],    // Erros < 1%
  },
};

export default function () {
  const res = http.get('https://api.empresa.com/v1/health');
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}
```

#### Key Takeaways
- Cada modalidade de teste de carga responde a uma pergunta diferente sobre a estabilidade do sistema, compondo uma esteira completa de validação pré-lançamento.

</details>
