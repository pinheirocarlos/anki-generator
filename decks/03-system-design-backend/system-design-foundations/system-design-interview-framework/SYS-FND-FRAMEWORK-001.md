---
id: SYS-FND-FRAMEWORK-001
title: "Condução de Deep Dives Arquiteturais e Análise de Trade-offs"
tags:
  - level::l4-pleno
  - topic::sys::foundations
  - company::meta
  - freq::high
---

## Pergunta
Como conduzir a fase de 'Deep Dive' em System Design demonstrando senioridade técnica ao avaliar trade-offs arquiteturais?

## Resposta
### Quick Answer
**Solução Direta**:
- Em vez de propor uma 'solução perfeita única', engenheiros seniores expõem as tensões fundamentais do sistema:
  - **Storage**: B-Tree (otimizado para leitura) vs LSM-Tree (otimizado para escrita pesada).
  - **Comunicação**: Síncrono (gRPC/REST para baixa latência) vs Assíncrono (Kafka/SQS para desacoplamento e absorção de picos).
  - **Consistência**: Linearizabilidade (alto custo de coordenação) vs Consistência Eventual (máxima disponibilidade).
- Identifique o componente mais crítico (gargalo de CPU, I/O ou rede) e proponha mitigação comprovada.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/system-design-deep-dive-tradeoffs-analysis-loop.webm">
    <p>Visualização: Análise estruturada de trade-offs arquiteturais: consistência vs latência, particionamento e pontos únicos de falha.</p>
  </video>
</div>

| Dimensão de Decisão | Opção A | Opção B |
|---|---|---|
| **Mecanismo de Escrita** | Síncrono direto no DB | Fila buffer assíncrona (Write-Behind) |
| **Consistência de Leitura** | Strong Consistency (Quorum R+W > N) | Read from Replicas (Eventual) |
| **Comunicação entre Serviços** | REST/JSON (Simplicidade) | gRPC/Protobuf (Eficiência binária) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Argumentação Sênior
> "Para o feed de notícias, optamos por consistência eventual com Fan-out on Write para usuários normais, pois 1-2 segundos de atraso na visualização de um post são aceitáveis para o usuário, mas para celebridades (>1M seguidores) chaveamos para Fan-out on Read para evitar explosão de gravações no cluster Redis."

</details>
