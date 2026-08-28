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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Condução de Deep Dives e Análise Estruturada de Trade-offs</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Em System Design não existem 'soluções perfeitas', apenas 'trade-offs conscientes'</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="170" height="55" rx="4" fill="#0369a1"/>
      <text x="85" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">1. Justifique Escolhas</text>
      <text x="85" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Por que NoSQL vs SQL?</text>

      <rect x="195" y="0" width="170" height="55" rx="4" fill="#065f46"/>
      <text x="280" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">2. Trate Casos Extremos</text>
      <text x="280" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">O que acontece se a rede cair?</text>

      <rect x="390" y="0" width="170" height="55" rx="4" fill="#78350f"/>
      <text x="475" y="22" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">3. Quantifique Impacto</text>
      <text x="475" y="40" fill="#fef3c7" font-size="9" text-anchor="middle">Custo de RAM vs Latência de disco</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Articular prós, contras e alternativas descartadas demonstra maturidade de engenharia de nível Staff+.</text>

</svg>

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
