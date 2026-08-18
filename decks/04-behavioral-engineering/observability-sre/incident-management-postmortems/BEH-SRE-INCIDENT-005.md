---
id: BEH-SRE-INCIDENT-005
title: "Estruturação de Planos de Ação Preventiva (CAPA) com Donos e Prazos Estritos"
tags:
  - level::l4-pleno
  - topic::behavioral::observability-sre
  - company::google
  - freq::high
---

## Pergunta
Como estruturar **Action Items (Corrective and Preventive Actions - CAPA)** eficazes pós-incidente com donos nominais e prazos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Requisitos de Eficácia de um Plano CAPA**:
  1. **Ações Corretivas (Imediatas)**: Corrigir os dados corrompidos ou ajustar a configuração defeituosa no ambiente.
  2. **Ações Preventivas (Sistêmicas)**: Alterações de código, testes de regressão e automações de CI que tornem o erro estruturalmente impossível de se repetir.
  3. **Responsabilidade Nominal Única**: Cada ação deve possuir exatamente 1 engenheiro responsável (evitar "time de backend" ou "infra").
  4. **Prazos Estritos e Acompanhamento**: Ações P0 devem ser finalizadas em até 3 dias úteis e revisadas em fórum de engenharia.

### Dual Coding Visual
| Tipo de Ação | Propósito Principal | Exemplo Concreto |
|---|---|---|
| **Corretiva (Fix)** | Reparar o dano imediato | Restaurar dados de backup da tabela afetada |
| **Preventiva (CAPA)** | Eliminar a causa estrutural | Implementar validação de schema e testes no CI |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Matriz CAPA em Post-Mortem
```text
Action Items:
├── [P0] [Preventiva] Implementar soft-delete e proibir comandos DROP no banco (@carlos, 2 dias).
├── [P0] [Preventiva] Adicionar verificação de expiração de certificados TLS no CI (@alice, 3 dias).
└── [P1] [Observabilidade] Adicionar dashboard com alerta de taxa de erro 5xx (@bob, 1 semana).
```

#### Key Takeaways
- Planos de ação sem donos nominais e prazos definidos caem no esquecimento. A disciplina na execução das ações preventivas é a base da confiabilidade em escala.

</details>
