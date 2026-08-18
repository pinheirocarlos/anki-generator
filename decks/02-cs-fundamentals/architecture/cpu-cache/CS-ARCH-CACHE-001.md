---
id: CS-ARCH-CACHE-001
title: "False Sharing em Multi-Core e Mitigação por Padding de Cache Line"
tags:
  - level::l4-pleno
  - topic::cs::architecture
  - company::meta
  - freq::high
---

## Pergunta
O que é o fenômeno destrutivo de **False Sharing** em sistemas multi-core e como mitigá-lo com alinhamento e padding de memória?

## Resposta
### Quick Answer
**Solução Direta**:
- **False Sharing**: Ocorre quando duas threads em núcleos de CPU diferentes modificam variáveis independentes que residem por acaso na **mesma Cache Line de 64 bytes**.
- Embora as variáveis sejam distintas no código (ex: `a` e `b`), o hardware invalida a Cache Line inteira a cada escrita através do protocolo de coerência (MESI), forçando recargas contínuas e degradando brutalmente a performance.
- **Mitigação**: Inserir **padding de 64 bytes** (ex: `[8]uint64` em Go ou `@Contended` em Java) ou alinhar as estruturas para garantir que variáveis concorrentes fiquem em Cache Lines isoladas.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/architecture/cpu-cache-line-64bytes-spatial-loop.webm">
    <p>Visualização: Carregamento contíguo de 64 bytes da RAM para a cache L1 acelerando acessos sequenciais a vetores.</p>
  </video>
</div>

| Cenário Multi-Thread | Disposição na Memória | Impacto de Performance |
|---|---|---|
| **False Sharing Ativo** | Variáveis concorrentes na mesma linha (64B) | Invalidação constante da Cache Line |
| **Isolamento com Padding** | Linhas de 64B separadas por padding | Zero contenção de coerência no barramento |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Mitigando False Sharing com Padding
```go
package main

// ESTRUTURA COM FALSE SHARING (Invalidação mútua a cada incremento):
type BadCounters struct {
  c1 uint64 // 8 bytes
  c2 uint64 // 8 bytes (reside na mesma Cache Line de 64B que c1)
}

// ESTRUTURA OTIMIZADA (Cada contador tem sua própria Cache Line de 64B):
type GoodCounters struct {
  c1 uint64
  _  [7]uint64 // 56 bytes de padding preenchendo a linha de 64B
  c2 uint64
  _  [7]uint64 // 56 bytes de padding preenchendo a linha de 64B
}
```

#### Key Takeaways
- Em Java, a anotação `@jdk.internal.vm.annotation.Contended` adiciona padding automático de 128 bytes para evitar False Sharing em classes de alta concorrência como `LongAdder` e `ConcurrentHashMap`.

</details>
