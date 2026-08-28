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
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Controle de Congestionamento TCP: CUBIC vs BBR (Google)</text>
  <g transform="translate(50, 48)">
    <!-- CUBIC -->
    <rect x="0" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="135" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">TCP CUBIC (Loss-Based)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Enche buffers dos roteadores até estourar</text>
    <text x="135" y="60" fill="#fca5a5" font-size="10" text-anchor="middle">Trata perda de pacote como congestão</text>
    <text x="135" y="78" fill="#94a3b8" font-size="9" text-anchor="middle">Problema: Bufferbloat (latência inflada)</text>

    <!-- BBR -->
    <rect x="310" y="0" width="270" height="95" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="445" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">TCP BBR (Model-Based)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Mede continuamente Bandwidth Máximo e RTT Mínimo</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Mantém buffers de roteador vazios</text>
    <text x="445" y="78" fill="#a7f3d0" font-size="9" text-anchor="middle">Throughput alto e latência mínima garantida</text>
  </g>
  <text x="340" y="175" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">BBR é o padrão adotado pelo YouTube, Cloudflare e Google Cloud para links de alta latência e perda residual.</text>

</svg>

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
