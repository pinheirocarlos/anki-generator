---
id: CS-NET-TCP-001
title: "Controle de Congestionamento TCP: CUBIC (Loss-Based) vs BBR (Model-Based)"
tags:
  - level::l4-pleno
  - topic::cs::networking
  - company::netflix
  - freq::high
---

## Pergunta
Como operam os algoritmos de controle de congestionamento TCP baseados em perda (**TCP CUBIC**) versus baseados em modelo (**TCP BBR**)?

## Resposta
### Quick Answer
**Solução Direta**:
- **TCP CUBIC (Padrão Linux / Loss-Based)**:
  - Aumenta agressivamente a janela de congestionamento (`cwnd`) através de uma função cúbica até que ocorra **perda de pacotes**.
  - Ao detectar perda, reduz a janela pela metade e recomeça.
  - *Problema*: Em conexões com roteadores com buffers gigantes (*Bufferbloat*), o CUBIC enche os buffers antes de detectar perdas, inflando a latência RTT em centenas de milissegundos.
- **TCP BBR (Bottleneck Bandwidth and RTT / Google)**:
  - Não espera a perda de pacotes ocorrer; mede continuamente a **largura de banda do gargalo** ($B_{\text{bottleneck}}$) e o **tempo de trânsito mínimo** ($RTT_{\text{min}}$).
  - Mantém a quantidade exata de dados em trânsito igual ao produto $BDP = B_{\text{bottleneck}} \times RTT_{\text{min}}$, maximizando a vazão sem inflar os buffers de fila.

### Dual Coding Visual
| Algoritmo | Sinal Primário de Congestionamento | Comportamento sob Bufferbloat |
|---|---|---|
| **TCP CUBIC** | Perda de pacotes (Packet Drop) | Enche buffers de roteador, gerando alta latência |
| **TCP BBR** | Variação de RTT mínimo e taxa de entrega | Mantém buffers vazios e latência mínima constante |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Ativar TCP BBR no Kernel Linux
```bash
# Verifica os algoritmos disponíveis no sistema:
sysctl net.ipv4.tcp_available_congestion_control

# Ativa BBR como algoritmo padrão de congestionamento:
sudo sysctl -w net.core.default_qdisc=fq
sudo sysctl -w net.ipv4.tcp_congestion_control=bbr
```

#### Key Takeaways
- O algoritmo BBR foi desenvolvido pelo Google e entrega até 20% mais vazão e 10x menor latência em redes com perdas espúrias (redes móveis 4G/5G e Wi-Fi).

</details>
