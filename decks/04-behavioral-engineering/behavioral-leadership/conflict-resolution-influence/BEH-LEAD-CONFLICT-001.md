---
id: BEH-LEAD-CONFLICT-001
title: "Matriz de Decisão Ponderada em RFCs para Escolhas Arquiteturais"
tags:
  - level::l4-pleno
  - topic::behavioral::behavioral-leadership
  - company::meta
  - freq::high
---

## Pergunta
Como estruturar uma **Matriz de Decisão Ponderada (Weighted Decision Matrix)** em um documento RFC para neutralizar vieses pessoais em escolhas arquiteturais?

## Resposta
### Quick Answer
**Solução Direta**:
- **Passos para Construção da Matriz**:
  1. **Definição Prévia de Critérios e Pesos**: O time estabelece os critérios de sucesso e seus respectivos pesos percentuais antes de pontuar as tecnologias (ex: Throughput: 30%, Complexidade Operacional: 25%, Custo: 25%, Curva de Aprendizado: 20%).
  2. **Pontuação Objetiva (1 a 5)**: Cada opção recebe notas fundamentadas em benchmarks, custos ou documentação oficial.
  3. **Cálculo da Média Ponderada**: A opção com maior pontuação ponderada consolidada é a indicada tecnicamente para o momento da organização.

### Dual Coding Visual
| Critério (Peso) | Opção A (Kafka) | Opção B (SQS/SNS) |
|---|---|---|
| **Throughput (30%)** | Nota 5 (1.50) | Nota 3 (0.90) |
| **Simplicidade (25%)** | Nota 2 (0.50) | Nota 5 (1.25) |
| **Pontuação Total** | **3.85 (Vencedor)** | **3.45** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Matriz em Markdown para Design Doc
```text
Critérios              | Peso | Opção 1 (PostgreSQL) | Opção 2 (Cassandra)
-----------------------|------|----------------------|--------------------
Transações ACID        | 35%  | 5 / 1.75             | 2 / 0.70
Escalabilidade Escrita | 30%  | 3 / 0.90             | 5 / 1.50
Familiaridade do Time  | 20%  | 5 / 1.00             | 2 / 0.40
Custo de Infra         | 15%  | 4 / 0.60             | 3 / 0.45
-----------------------|------|----------------------|--------------------
Total Ponderado        | 100% | 4.25 (Recomendado)   | 3.05
```

#### Key Takeaways
- A matriz de decisão documentada remove o viés pessoal das discussões e cria um registro histórico claro das razões pelas quais uma tecnologia foi selecionada.

</details>
