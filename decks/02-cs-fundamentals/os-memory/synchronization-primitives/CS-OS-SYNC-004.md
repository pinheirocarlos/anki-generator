---
id: CS-OS-SYNC-004
title: "Deadlocks e as 4 Condições de Coffman"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
O que é um **Deadlock** e quais são as 4 condições necessárias de Coffman para que ele ocorra?

## Resposta
### Quick Answer
**Solução Direta**:
- **Deadlock (Impasse)**: Situação de congelamento permanente onde duas ou mais threads ficam bloqueadas eternamente, com cada uma aguardando um recurso retido pela outra.
- **As 4 Condições de Coffman (Todas devem ser satisfeitas simultaneamente)**:
  1. **Exclusão Mútua**: Os recursos não podem ser compartilhados simultaneamente.
  2. **Posse e Espera (*Hold and Wait*)**: Uma thread retém um recurso enquanto aguarda outro.
  3. **Não-Preempção (*No Preemption*)**: Recursos não podem ser tomados à força de uma thread.
  4. **Espera Circular (*Circular Wait*)**: Existe um ciclo fechado de dependências ($T_1 	o R_2 	o T_2 	o R_1 	o T_1$).
- Quebrar **qualquer uma** das 4 condições torna o deadlock matematicamente impossível.

### Dual Coding Visual
| Thread | Recursos Retidos | Recursos Aguardados |
|---|---|---|
| **Thread 1** | Retém Lock A | Aguarda Lock B (Bloqueada) |
| **Thread 2** | Retém Lock B | Aguarda Lock A (Bloqueada) |
| **Resultado** | Ciclo Fechado: $T_1 	o B 	o T_2 	o A 	o T_1$ | **Deadlock Permanente** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Jantar dos Filósofos
- 5 filósofos sentados ao redor de uma mesa com 5 garfos (1 garfo entre cada par).
- Cada filósofo pega o garfo da sua esquerda e tenta pegar o da direita.
- Todos ficam segurando 1 garfo esperando o garfo vizinho ser solto $	o$ todos morrem de fome (*Deadlock clássico por espera circular*).

#### Key Takeaways
- A forma mais comum de prevenir deadlocks na prática de software é quebrar a **Espera Circular** através da regra estrita de **Lock Ordering** (adquirir locks sempre na mesma ordem global).

</details>
