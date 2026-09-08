---
id: SYS-ARCH-FEED-001
title: "Arquitetura Híbrida de Feed e Mitigação do Problema de Celebridades (Hotkey Fan-Out)"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::meta
  - freq::high
---

## Pergunta
Como uma arquitetura híbrida de Fan-Out resolve o 'Problema das Celebridades' combinando Push para usuários comuns e Pull para contas massivas?

## Resposta
### Quick Answer
**Solução Direta**:
- **O Desafio da Celebridade**: Se uma conta com 100 Milhões de seguidores (ex: celebridade) posta, o Fan-out on Write dispararia 100M de operações de gravação no Redis em poucos segundos, saturando a rede e gerando atrasos severos na ingestão.
- **Arquitetura Híbrida (Padrão Twitter / Instagram)**:
  1. **Usuários Regulares ($< 50.000$ seguidores)**: Utilizam **Fan-Out on Write** (o post é injetado diretamente nas Timelines dos seguidores no Redis).
  2. **Celebridades ($> 50.000$ seguidores)**: O post é gravado apenas no feed pessoal do autor (**Zero Push**).
  3. **Montagem do Feed no Cliente**: Quando um seguidor abre o app, o sistema lê sua Timeline pré-computada no Redis e faz um *Merge dinâmico em memória* apenas com os posts recentes das celebridades que ele segue.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Arquitetura Híbrida de Feed &amp; Mitigação do Problema de Celebridades</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="300" y="24" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Separação Estrita de Usuários por Volume de Seguidores</text>

    <g transform="translate(20, 42)">
      <rect x="0" y="0" width="260" height="60" rx="4" fill="#065f46"/>
      <text x="130" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Usuário Padrão (&lt; 20.000 seguidores)</text>
      <text x="130" y="42" fill="#ffffff" font-size="9" text-anchor="middle">Push imediato no Redis Feed dos amigos</text>

      <rect x="300" y="0" width="260" height="60" rx="4" fill="#78350f"/>
      <text x="430" y="22" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Celebridade (&gt; 20.000 seguidores)</text>
      <text x="430" y="42" fill="#ffffff" font-size="9" text-anchor="middle">Zero Push! Post puxado na leitura e mesclado</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Ao abrir o app, o Feed Service mescla a lista pré-calculada do Redis com os posts recentes das celebridades seguidas.</text>

</svg>
<p>Visualização: Arquitetura híbrida: push imediato para usuários regulares e pull sob demanda mesclado na leitura para contas com milhões de seguidores.</p>

| Tipo de Autor | Estratégia de Disseminação | Impacto na Infraestrutura |
|---|---|---|
| **Usuário Regular** | Fan-Out on Write (Push no Redis) | Carga diluída e absorvida facilmente |
| **Celebridade (>50k)** | **Fan-Out on Read (Pull no Merge)** | **Zero avalanche de gravações no Redis** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização de Usuários Inativos
- Para economizar memória RAM, o sistema só executa Fan-out on Write para usuários que acessaram a plataforma nos últimos 30 dias (*Active Users*). Para usuários inativos, o feed só é reconstruído quando eles realizam novo login.

</details>
