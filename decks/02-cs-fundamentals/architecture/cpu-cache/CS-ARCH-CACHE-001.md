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
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">False Sharing: Invalidação de Cache Line em Multi-Core</text>
  <g transform="translate(40, 50)">
    <!-- Core 1 -->
    <rect x="0" y="0" width="280" height="65" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="140" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Core 0: Modifica threadA_count</text>
    <rect x="20" y="32" width="110" height="24" rx="4" fill="#7f1d1d"/>
    <text x="75" y="48" fill="#fca5a5" font-size="10" font-family="monospace" text-anchor="middle">var a (8B)</text>
    <rect x="150" y="32" width="110" height="24" rx="4" fill="#334155"/>
    <text x="205" y="48" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">var b (8B)</text>
    
    <!-- Core 2 -->
    <rect x="320" y="0" width="280" height="65" rx="6" fill="#1e293b" stroke="#f43f5e" stroke-width="1.5"/>
    <text x="460" y="22" fill="#f87171" font-size="12" font-weight="bold" text-anchor="middle">Core 1: Modifica threadB_count</text>
    <rect x="340" y="32" width="110" height="24" rx="4" fill="#334155"/>
    <text x="395" y="48" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">var a (8B)</text>
    <rect x="470" y="32" width="110" height="24" rx="4" fill="#7f1d1d"/>
    <text x="525" y="48" fill="#fca5a5" font-size="10" font-family="monospace" text-anchor="middle">var b (8B)</text>
  </g>
  <g transform="translate(60, 130)">
    <rect x="0" y="0" width="560" height="35" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
    <text x="280" y="22" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Mesma Cache Line (64 Bytes) → Invalidação Contínua (Cache Bouncing / MESI ping-pong)</text>
  </g>
  <text x="340" y="190" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Solução: Padding de 64 bytes (Cache Line Alignment) isolando as variáveis em linhas distintas.</text>

</svg>

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
