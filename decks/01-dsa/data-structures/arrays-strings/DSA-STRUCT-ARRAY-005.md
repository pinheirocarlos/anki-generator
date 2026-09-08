---
id: DSA-STRUCT-ARRAY-005
title: "Design e Otimização Bitwise de um Ring Buffer Circular Contíguo"
tags:
  - level::l4-pleno
  - topic::dsa::arrays-strings
  - company::netflix
  - freq::high
---

## Pergunta
Como projetar um **Ring Buffer (Buffer Circular)** contíguo de alta performance e como a otimização com máscara bitwise acelera o avanço de ponteiros?

## Resposta
### Quick Answer
**Solução Direta**:
- Um **Ring Buffer** utiliza um array de tamanho fixo com dois ponteiros de índice (`head` e `tail`) que avançam circularmente sem deslocar elementos:
  $$\text{tail} = (\text{tail} + 1) \pmod{\text{capacity}}$$
- **Otimização Bitwise**: Quando a capacidade é configurada como potência de 2 ($2^k$), a operação cara de divisão/módulo (`%`) é substituída por uma operação bitwise rápida:
  $$\text{tail} = (\text{tail} + 1) \ \& \ (\text{capacity} - 1)$$
- Essa operação executa em **1 único ciclo de clock** da CPU contra 15–40 ciclos da instrução `DIV`.

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="28" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Ring Buffers Circulares com Máscara Bitwise (head/tail)</text>
  <g transform="translate(120, 50)">
    <circle cx="220" cy="55" r="50" fill="none" stroke="#475569" stroke-width="12" stroke-dasharray="35 5"/>
    <rect x="180" y="-10" width="80" height="25" fill="#1e293b" stroke="#3b82f6" stroke-width="2" rx="4"/>
    <text x="220" y="7" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Head (Read)</text>

    <rect x="250" y="80" width="80" height="25" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="4"/>
    <text x="290" y="97" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Tail (Write)</text>
  </g>
  <g transform="translate(360, 60)">
    <rect x="0" y="0" width="240" height="70" fill="#1e293b" stroke="#3b82f6" stroke-width="1" rx="6"/>
    <text x="120" y="25" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">idx = (idx + 1) &amp; (N - 1)</text>
    <text x="120" y="50" fill="#38bdf8" font-size="10" text-anchor="middle">Substitui módulo % por bitwise AND</text>
  </g>
  <text x="340" y="170" fill="#a1a1aa" font-size="11" text-anchor="middle">Utilizado em buffers IPC de áudio, sockets de rede e filas LMAX Disruptor</text>
</svg>

<p>Visualização: Buffer circular com ponteiros head/tail avançando por máscara bitwise O(1).</p>

| Estratégia de Avanço | Instrução CPU | Ciclos de Clock |
|---|---|---|
| **Aritmética Modular (`% cap`)** | `DIV` / `IDIV` | ~15 a 40 ciclos |
| **Máscara Bitwise (`& (cap - 1)`)** | `AND` | 1 ciclo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java: Ring Buffer com Bitwise Mask
```java
public class FastRingBuffer<T> {
  private final Object[] buffer;
  private final int mask; // capacity - 1 (para capacidade 2^k)
  private int head = 0;
  private int tail = 0;
  private int size = 0;

  public FastRingBuffer(int powerOfTwoCap) {
    this.buffer = new Object[powerOfTwoCap];
    this.mask = powerOfTwoCap - 1;
  }

  public boolean push(T item) {
    if (size == buffer.length) return false;
    buffer[tail] = item;
    tail = (tail + 1) & mask;
    size++;
    return true;
  }

  @SuppressWarnings("unchecked")
  public T pop() {
    if (size == 0) return null;
    T item = (T) buffer[head];
    buffer[head] = null;
    head = (head + 1) & mask;
    size--;
    return item;
  }
}
```

#### Key Takeaways
- O Ring Buffer é a base estrutural de filas de mensagens em memória de baixa latência (ex: LMAX Disruptor e buffers de socket no kernel Linux).

</details>
