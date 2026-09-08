---
id: CS-NET-TCP-004
title: "Janela Deslizante (Sliding Window), Window Scaling e BDP"
tags:
  - level::l4-pleno
  - topic::cs::networking
  - company::apple
  - freq::high
---

## Pergunta
Como o mecanismo de **Janela Deslizante (Sliding Window)** e **Window Scaling** do TCP permite atingir máxima utilização do Bandwidth-Delay Product (BDP)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Sliding Window**: Mecanismo de controle de fluxo onde o receptor anuncia no cabeçalho TCP quantos bytes seu buffer de socket consegue receber sem estourar (`Receive Window - rwnd`). O emissor envia múltiplos pacotes em voo sem esperar ACK individual para cada um.
- **BDP (Bandwidth-Delay Product)**: A capacidade de dados que a rede consegue manter em trânsito simultâneo:
  $$\text{BDP} = \text{Largura de Banda} \times \text{RTT}$$
  *Ex*: Link de 10 Gbps com 50ms de RTT $\implies \text{BDP} = 10^9 \text{ B/s} \times 0.05\text{ s} = 62.5 \text{ MB}$.
- **Window Scaling (RFC 1323)**: O cabeçalho TCP padrão limita o campo de janela a 16 bits (máximo 64 KB). A opção Window Scale multiplica esse valor por potências de 2 (até $2^{14}$), permitindo janelas de até **1 GB**, viabilizando alta vazão em conexões de alta velocidade.

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Janela Deslizante (Sliding Window) e Produto BDP</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="560" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="280" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Bandwidth-Delay Product (BDP) = Largura de Banda × RTT</text>
    <text x="280" y="44" fill="#f8fafc" font-size="11" font-family="monospace" text-anchor="middle">Exemplo: 10 Gbps × 40ms RTT = 50 MB de dados em trânsito no cabo</text>
    <text x="280" y="68" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">TCP Window Scaling (RFC 7323) expande o teto da janela de 64 KB para até 1 GB.</text>
  </g>
  <text x="340" y="165" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Se o buffer TCP for menor que o BDP, o link de alta velocidade fica subutilizado com a conexão ociosa aguardando ACKs.</text>

</svg>
<p>Visualização: Dinâmica da Janela Deslizante e Bandwidth-Delay Product (BDP) dimensionando a quantidade de dados em trânsito sem confirmação prévia.</p>

| Tipo de Janela | Tamanho Máximo de Janela | Vazão Máxima em Link com 50ms RTT |
|---|---|---|
| **TCP Padrão (Sem Scale)** | 64 KB (16 bits) | ~10 Mbps (Gargalo severo) |
| **TCP com Window Scaling** | Até 1 GB (Fator $2^{14}$) | 10+ Gbps (Satura o link físico) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental do Cano de Água
- **Largura de Banda**: O diâmetro do cano.
- **RTT**: O comprimento do cano.
- **BDP**: O volume total de água que cabe dentro do cano. Se a janela TCP for menor que o BDP, o cano fica quase vazio, operando com uma fração ínfima de sua capacidade.

#### Key Takeaways
- Para links transoceânicos ou de data centers com alto BDP (*Long Fat Networks - LFNs*), Window Scaling e buffers de socket afinados no Linux são obrigatórios.

</details>
