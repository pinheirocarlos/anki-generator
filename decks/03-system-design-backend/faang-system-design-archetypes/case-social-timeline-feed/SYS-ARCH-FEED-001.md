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
| Tipo de Autor | Estratégia de Disseminação | Impacto na Infraestrutura |
|---|---|---|
| **Usuário Regular** | Fan-Out on Write (Push no Redis) | Carga diluída e absorvida facilmente |
| **Celebridade (>50k)** | **Fan-Out on Read (Pull no Merge)** | **Zero avalanche de gravações no Redis** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização de Usuários Inativos
- Para economizar memória RAM, o sistema só executa Fan-out on Write para usuários que acessaram a plataforma nos últimos 30 dias (*Active Users*). Para usuários inativos, o feed só é reconstruído quando eles realizam novo login.

</details>
