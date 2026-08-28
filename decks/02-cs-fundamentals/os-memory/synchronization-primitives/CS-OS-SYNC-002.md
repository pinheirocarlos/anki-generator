---
id: CS-OS-SYNC-002
title: "Mutex (Exclusão Mútua) vs Semáforos Contadores"
tags:
  - level::l3-junior
  - topic::cs::os-memory
  - company::meta
  - freq::high
---

## Pergunta
Qual é a diferença essencial de comportamento e caso de uso entre um **Mutex** e um **Semáforo Contador**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Mutex (Mutual Exclusion Lock)**:
  - Primitiva de bloqueio com estado binário (0 ou 1).
  - Possui o conceito estrito de **Propriedade (*Ownership*)**: a **mesma thread** que adquiriu o lock com `Lock()` é a única autorizada a liberá-lo com `Unlock()`.
  - Usado para proteger seções críticas exclusivas em estruturas de dados.
- **Semáforo Contador (Counting Semaphore)**:
  - Mantém um contador de permissões disponíveis ($N$).
  - **Não possui propriedade**: qualquer thread pode sinalizar (`Signal() / Post()`) para incrementar o contador, permitindo que até $N$ threads acessem um recurso simultaneamente.
  - Usado para controle de concorrência limitada (ex: pool de 20 conexões de banco de dados) e sinalização entre threads produtoras e consumidoras.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Mutex (Exclusão Mútua) vs Semáforos Contadores</text>
  <g transform="translate(50, 48)">
    <!-- Mutex -->
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="135" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Mutex (Lock Binário com Ownership)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Apenas 1 thread entra por vez</text>
    <text x="135" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Ownership Estrito: Somente quem travou pode destravar!</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Proteção de estruturas de dados e variáveis</text>

    <!-- Semaphore -->
    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Semáforo Contador (Controle de Vagas)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Controla o acesso a um pool de N recursos</text>
    <text x="445" y="60" fill="#f59e0b" font-size="10" font-weight="bold" text-anchor="middle">Sem Ownership: Qualquer thread pode sinalizar (Post/Release)</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Pool de conexões de BD, Limitação de Concorrência</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Semáforos também são amplamente utilizados para sinalização e sincronização produtor-consumidor entre threads.</text>

</svg>

| Característica | Mutex | Semáforo Contador ($N$) |
|---|---|---|
| **Concorrência Máxima** | Exatamente 1 thread | Até $N$ threads simultâneas |
| **Conceito de Ownership** | Sim (Apenas quem trancou pode destrancar) | Não (Qualquer thread pode sinalizar) |
| **Caso de Uso Primário** | Proteger mutação de struct / variável | Rate limiting / Pool de conexões / Notificação |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Limitando Concorrência com Channel como Semáforo
```go
package main

// Canal com buffer de tamanho 5 atua como semáforo contador de 5 slots:
type Semaphore chan struct{}

func NewSemaphore(limit int) Semaphore {
  return make(chan struct{}, limit)
}

func (s Semaphore) Acquire() { s <- struct{}{} }
func (s Semaphore) Release() { <-s }
```

#### Key Takeaways
- Um Mutex não é simplesmente um semáforo binário com $N=1$; o Mutex garante propriedades extras de segurança contra liberação indevida por threads estranhas.

</details>
