---
id: BEH-SRE-CHAOS-004
title: "Definição de Hipótese de Estado Estável (Steady State) em Chaos Engineering"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::netflix
  - freq::high
---

## Pergunta
Como definir a **Métrica de Estado Estável (Steady State)** e formular uma hipótese científica em experimentos de Chaos Engineering?

## Resposta
### Quick Answer
**Solução Direta**:
- **Métrica de Steady State**: Deve ser uma métrica de negócio observável em tempo real que reflita o funcionamento saudável do sistema (ex: *taxa de reprodução de vídeos iniciados por segundo*, *pedidos faturados com sucesso*, *taxa de erro global $< 0.05\%$*).
- **Formulação da Hipótese**: Deve descrever precisamente o comportamento de auto-recuperação esperado.
  - *Exemplo*: *"Se encerrarmos abruptamente a instância primária do banco de dados relacional, a réplica assumirá como primária em menos de 10 segundos sem interrupção de transações para o usuário final."*

### Dual Coding Visual
| Componente da Hipótese | Boa Definição (Científica) | Má Definição (Vaga) |
|---|---|---|
| **Steady State** | Pedidos completados/s com erro $< 0.1\%$ | *"O servidor parece rápido"* |
| **Falha Injetada** | Interrupção de 1 nó de Redis Sentinel | *"Testar falha no cache"* |
| **Previsão** | Failover automático em $< 3\text{s}$ | *"O sistema deve aguentar"* |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estrutura de Documento de Experimento de Caos
```text
Experimento: Resiliência a Queda de Nó de Cache (Redis Sentinel)
├── Steady State: Latência de leitura de catálogo p99 < 50ms e taxa de acerto > 85%.
├── Hipótese: Com a queda do nó Master, a eleição Sentinel promoverá um nó Slave em < 3s,
│             com aumento transitório de latência p99 para no máximo 120ms por 5 segundos.
└── Execução: Matar processo Redis Master via Chaos Mesh.
```

#### Key Takeaways
- Uma hipótese bem formulada permite validar objetivamente se a arquitetura atende às garantias de resiliência sem depender de impressões subjetivas.

</details>
