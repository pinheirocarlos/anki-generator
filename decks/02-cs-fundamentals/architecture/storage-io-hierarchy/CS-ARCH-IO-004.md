---
id: CS-ARCH-IO-004
title: "Mecanismo de DMA (Direct Memory Access) para Transferência de Dados"
tags:
  - level::l3-junior
  - topic::cs::architecture
  - company::google
  - freq::high
---

## Pergunta
Como o controlador **DMA (Direct Memory Access)** transfere dados entre armazenamento/rede e a memória RAM sem consumir ciclos da CPU?

## Resposta
### Quick Answer
**Solução Direta**:
- **DMA (Acesso Direto à Memória)**: É um controlador de hardware dedicado que permite a dispositivos periféricos (placas de rede, controladoras NVMe/SATA) transferir blocos de dados diretamente para/da memória RAM principal.
- **Sem DMA (Programmed I/O)**: A CPU teria que executar um laço instrução por instrução para copiar cada byte da porta do dispositivo para a RAM, consumindo 100% de um núcleo de processamento.
- **Com DMA**: A CPU apenas programa o controlador DMA com o endereço de origem, destino e tamanho do bloco, liberando-se imediatamente para executar outros processos. Quando a transferência termina, o DMA emite uma **interrupção de hardware (IRQ)** avisando a CPU.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/architecture/dma-direct-memory-access-transfer-loop.webm">
    <p>Visualização: Controlador DMA transferindo blocos entre periféricos e RAM liberando a CPU para outras tarefas.</p>
  </video>
</div>

| Método de Transferência | Intervenção da CPU Durante a Transferência | Carga de CPU |
|---|---|---|
| **Programmed I/O (Sem DMA)** | CPU lê e grava cada byte individualmente em loop | 100% de uso de núcleo |
| **DMA (Direct Memory Access)**| CPU delega ao chip DMA e atende a interrupção final | Próxima de 0% |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Modelo Mental do Gerente e o Entregador
- **Sem DMA**: O gerente da empresa (CPU) desce até a calçada, pega caixa por caixa do caminhão de entregas e sobe a escada para guardar no estoque.
- **Com DMA**: O gerente apenas assina a ordem: *"Entregue 100 caixas no depósito 3 e me envie uma mensagem no WhatsApp quando terminar"*. O gerente continua trabalhando normalmente em relatórios!

#### Key Takeaways
- DMA é o pilar fundamental que viabiliza Zero-Copy, buffers circulares de placa de rede (*Ring Buffers de NIC*) e transferência de dados em redes de 100 Gbps.

</details>
