---
id: BEH-LEAD-CONFLICT-005
title: "Tradução de Dívida Técnica e Refatoração para Métricas de Negócio com Product Managers"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::meta
  - freq::high
---

## Pergunta
Como traduzir **dívidas técnicas e necessidades de refatoração** para métricas de negócio ao negociar com Product Managers?

## Resposta
### Quick Answer
**Solução Direta**:
- **Tradução de Linguagem Técnica para Linguagem de Negócio**:
  - *Em vez de dizer*: *"O código do monólito está acoplado e difícil de ler"*.
  - *Diga*: *"Se não isolarmos este módulo agora, o tempo de entrega de novas features aumentará de 3 dias para 4 semanas e o risco de indisponibilidade na Black Friday será de R$ 150k/hora"*.
- **Estratégias de Negociação**:
  1. **Quantificar Riscos em Reais/Dólares**: Conectar incidentes recentes ao débito técnico existente.
  2. **Regra dos 20% Constantes**: Estabelecer um acordo contínuo de dedicar 20% da capacidade de cada sprint para saúde de engenharia e refatorações preventivas.
  3. **Refatoração Acoplada a Novas Features (Boy Scout Rule)**: Melhorar a arquitetura gradualmente à medida que novas histórias de produto tocam o código legado.

### Dual Coding Visual
| Argumento Técnico | Tradução para Negócio / Produto | Impacto na Priorização |
|---|---|---|
| *"Código com acoplamento alto"* | *"Features futuras levarão 3x mais tempo"* | Facilita aprovação no roadmap |
| *"Queries de banco lentas"* | *"Risco de timeout e perda de conversão"* | Conexão direta com faturamento |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Proposta de Refatoração Estruturada
```text
Proposta de Engenharia: Migração da Camada de Autenticação
├── Custo: 1 sprint de dedicação de 2 engenheiros.
├── Risco de NÃO Fazer: Queda de SLO de disponibilidade para < 99.5% e risco de vazamento de sessão.
└── Retorno de Negócio: Redução de 30% no custo de servidores e suporte a 50k usuários simultâneos.
```

#### Key Takeaways
- Product Managers priorizam valor de negócio. Ao demonstrar que dívida técnica custa caro em receita e velocidade futura, o alinhamento torna-se colaborativo e natural.

</details>
