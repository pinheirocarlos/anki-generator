---
id: DSA-PATT-INTERVAL-006
title: "Intuição Fundamental de Intervalos: A Agenda de Reuniões e Horários Sobrepostos"
tags:
  - level::l2-fundamental
  - topic::dsa::intervals-merge
  - company::google
  - freq::high
---

## Pergunta
Como ordenar intervalos pelo horário de início simplifica a fusão de compromissos sobrepostos em uma linha do tempo única?

## Resposta
### Quick Answer
**Solução Direta**:
- Ao **ordenar os intervalos pelo horário de início ($O(N \log N)$)**, garantimos que qualquer sobreposição só pode acontecer entre o intervalo atual e o **imediatamente anterior**.
- Se o início do próximo evento for menor ou igual ao fim do evento anterior (`start[i] <= end[anterior]`), eles se sobrepõem e são **fundidos em um único bloco** (`end = max(end[anterior], end[i])`).

### Dual Coding Visual
<svg viewBox="0 0 600 190" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="190" fill="#0f172a" rx="10" />

  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Fusão de Intervalos: [10h-12h] e [11h-14h] Fundem em [10h-14h]</text>

  <!-- Antes da Fusão (Linha de Cima) -->
  <g transform="translate(60, 45)">
    <text x="0" y="20" fill="#94a3b8" font-size="10" font-family="sans-serif">Reunião A:</text>
    <rect x="70" y="5" width="140" height="25" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4" />
    <text x="140" y="22" fill="#ffffff" font-size="11" text-anchor="middle">[10:00 ➔ 12:00]</text>

    <text x="0" y="55" fill="#94a3b8" font-size="10" font-family="sans-serif">Reunião B:</text>
    <rect x="140" y="40" width="180" height="25" fill="#78350f" stroke="#f59e0b" stroke-width="2" rx="4" />
    <text x="230" y="57" fill="#ffffff" font-size="11" text-anchor="middle">[11:00 ➔ 14:00]</text>

    <!-- Marca de Sobreposição -->
    <rect x="140" y="5" width="70" height="25" fill="#ef4444" fill-opacity="0.3" stroke="#ef4444" stroke-dasharray="2,2" />
  </g>

  <!-- Seta de Fusão -->
  <path d="M 400 80 L 440 80" fill="none" stroke="#10b981" stroke-width="3" />
  <polygon points="445,80 435,75 435,85" fill="#10b981" />

  <!-- Depois da Fusão (Linha Unificada) -->
  <g transform="translate(60, 130)">
    <text x="0" y="20" fill="#34d399" font-size="11" font-weight="bold" font-family="sans-serif">Bloco Único:</text>
    <rect x="70" y="5" width="250" height="30" fill="#065f46" stroke="#10b981" stroke-width="2.5" rx="4" />
    <text x="195" y="24" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">Bloco Ocupado: [10:00 ➔ 14:00]</text>
  </g>
</svg>

| Operação com Intervalos | Passo Chave | Complexidade |
|---|---|---|
| **Merge Intervals** | Ordenar por `start` e estender o `end` quando houver colisão | $O(N \log N)$ |
| **Insert Interval** | Encontrar o ponto de inserção e fundir adjacentes | $O(N)$ (se já ordenado) |
| **Meeting Rooms (Salas Necessárias)** | Min-Heap para rastrear horários de término das salas ocupadas | $O(N \log N)$ |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Analogia da Agenda Médica
Se você tem uma consulta marcada das 10h às 12h e outra das 11h às 14h, você não tem duas consultas separadas: você estará continuamente ocupado no consultório das 10h às 14h.

#### O Segredo da Ordenação Inicial
Sem ordenar os intervalos, você teria que comparar cada intervalo com todos os outros $N-1$ intervalos da lista para ver se eles colidem ($O(N^2)$). Ao ordenar pelo horário de início, você caminha pela linha do tempo em uma única passada de esquerda para a direita ($O(N)$ após o sort).

#### Key Takeaways
- Problema clássico de entrevistas no Google, Uber e Meta para agendamento de recursos e reservas de salas.

</details>
