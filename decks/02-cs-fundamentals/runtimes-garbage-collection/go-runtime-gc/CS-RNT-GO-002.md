---
id: CS-RNT-GO-002
title: "Ajuste de GC em Go: GOGC e GOMEMLIMIT para Prevenção de OOM"
tags:
  - level::l3-junior
  - topic::cs::runtimes
  - company::meta
  - freq::high
---

## Pergunta
Como as variáveis de ambiente **`GOGC`** e **`GOMEMLIMIT`** controlam a frequência de coleta de lixo e evitam estouros de memória (*OOM*) no Go?

## Resposta
### Quick Answer
**Solução Direta**:
- **`GOGC` (Padrão: 100)**: Define o percentual de crescimento do Heap antes de disparar o próximo ciclo de GC:
  $$\text{Novo Heap Target} = \text{Heap Vivo Atual} \times (1 + \frac{\text{GOGC}}{100})$$
  - *GOGC=100*: O GC dispara quando a memória dobra em relação aos dados vivos.
  - *GOGC=off*: Desabilita totalmente o GC.
  - *GOGC menor (ex: 50)*: GC roda mais frequentemente (economiza RAM, consome mais CPU).
- **`GOMEMLIMIT` (Go 1.19+)**: Define um **limite máximo rígido de memória** (ex: `GOMEMLIMIT=1800MiB` em container de 2 GB).
  - Permite que o Go rode com `GOGC` alto para poupar CPU quando a memória estiver livre, mas se o uso se aproximar do teto, o runtime dispara GCs de emergência para **evitar o OOM Killer do Linux**.

### Dual Coding Visual
| Variável | Papel Principal | Risco se Configurado Incorretamente |
|---|---|---|
| **`GOGC`** | Trade-off entre CPU e Consumo de Heap | Muito baixo gera GC thrashing; muito alto estoura RAM |
| **`GOMEMLIMIT`** | Teto máximo de segurança contra OOM | Se menor que dados vivos, gera loop infinito de GC |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Configuração Recomendada para Containers Docker / Kubernetes
- Em um pod Kubernetes com limite de memória de **2 GiB**:
```yaml
env:
  - name: GOMEMLIMIT
    value: "1800MiB" # 90% do limite do pod para deixar 200MB para OS/binário
  - name: GOGC
    value: "off"     # Permite que o Go use a RAM livre e colete apenas perto do teto!
```

#### Key Takeaways
- Usar `GOMEMLIMIT` permite reduzir o consumo de CPU em até 30% em serviços backend sem nenhum risco de quebrar o container por OOM.

</details>
