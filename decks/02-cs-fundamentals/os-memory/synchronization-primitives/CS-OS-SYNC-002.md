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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/os/mutex-vs-counting-semaphore-loop.webm">
    <p>Visualização: Propriedade exclusiva de travamento (Mutex) vs controle de pool de N recursos disponíveis (Semáforo).</p>
  </video>
</div>

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
