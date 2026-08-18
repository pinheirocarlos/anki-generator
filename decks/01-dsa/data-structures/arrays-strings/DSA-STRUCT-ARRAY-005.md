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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/dsa/circular-ring-buffer-bitwise-loop.webm">
    <p>Visualização: Avanço modular dos ponteiros head e tail com máscara bitwise (i & (N-1)) sobre array contíguo.</p>
  </video>
</div>

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
