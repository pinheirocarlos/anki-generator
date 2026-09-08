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
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Deadlocks: As 4 Condições Obrigatórias de Coffman</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="130" height="85" rx="5" fill="#1e293b" stroke="#f43f5e"/>
    <text x="65" y="22" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">1. Exclusão Mútua</text>
    <text x="65" y="44" fill="#cbd5e1" font-size="9" text-anchor="middle">Recursos não podem</text>
    <text x="65" y="58" fill="#cbd5e1" font-size="9" text-anchor="middle">ser compartilhados</text>

    <rect x="145" y="0" width="130" height="85" rx="5" fill="#1e293b" stroke="#f43f5e"/>
    <text x="210" y="22" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">2. Hold and Wait</text>
    <text x="210" y="44" fill="#cbd5e1" font-size="9" text-anchor="middle">Retém um recurso e</text>
    <text x="210" y="58" fill="#cbd5e1" font-size="9" text-anchor="middle">espera por outro</text>

    <rect x="290" y="0" width="130" height="85" rx="5" fill="#1e293b" stroke="#f43f5e"/>
    <text x="355" y="22" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">3. Não-Preempção</text>
    <text x="355" y="44" fill="#cbd5e1" font-size="9" text-anchor="middle">Recursos não podem</text>
    <text x="355" y="58" fill="#cbd5e1" font-size="9" text-anchor="middle">ser confiscados à força</text>

    <rect x="435" y="0" width="125" height="85" rx="5" fill="#1e293b" stroke="#f43f5e"/>
    <text x="497" y="22" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">4. Espera Circular</text>
    <text x="497" y="44" fill="#cbd5e1" font-size="9" text-anchor="middle">Ciclo fechado de</text>
    <text x="497" y="58" fill="#cbd5e1" font-size="9" text-anchor="middle">dependências em cadeia</text>
  </g>
  <text x="340" y="165" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Prevenção Canônica: Hierarquia Global de Locks (Adquirir múltiplos locks sempre em ordem estrita de endereço/ID).</text>

</svg>
<p>Visualização: Grafo de alocação de recursos ilustrando o surgimento de Deadlock quando as quatro condições de Coffman ocorrem simultaneamente.</p>

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
