---
id: SYS-ARCH-CRAWLER-000
title: "Web Crawler Distribuído (Googlebot): URL Frontier e Políticas de Polidez (Politeness)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Como a arquitetura da URL Frontier equilibra prioridade de rastreamento com políticas de polidez (*Politeness*) para evitar ataques DoS acidentais a sites da web?

## Resposta
### Quick Answer
**Solução Direta**:
- **URL Frontier**: Estrutura de dados que armazena e despacha bilhões de URLs a serem rastreadas por workers distribuídos.
- **Dois Módulos de Filas Internas**:
  1. **Filas de Prioridade (Priority Queues)**: Atribuem pontuações de relevância (PageRank, frequência de atualização) para priorizar páginas importantes primeiro.
  2. **Filas de Polidez (Politeness Queues)**:
     - Cada **Host/Domínio** (ex: `wikipedia.org`) possui sua própria fila FIFO dedicada e um temporizador de delay (ex: aguardar no mínimo 500 ms entre requisições ao mesmo domínio).
     - Uma thread de worker só consome uma URL de um domínio se o temporizador daquele domínio tiver expirado, respeitando estritamente o arquivo `robots.txt`.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/web-crawler-url-frontier-politeness-queue-loop.webm">
    <p>Visualização: URL Frontier separando filas de prioridade e filas de polidez por hostname para evitar sobrecarga em servidores de destino.</p>
  </video>
</div>

| Módulo da URL Frontier | Estrutura | Responsabilidade |
|---|---|---|
| **Priority Selector** | Filas ponderadas por PageRank | Define *o que* deve ser baixado primeiro |
| **Politeness Manager** | 1 Fila por Host + Delay Queue | Impede sobrecarga de servidores de terceiros |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Respeito ao `robots.txt`
- Antes de rastrear qualquer URL de um novo host, o crawler baixa e faz cache em memória do arquivo `https://domain.com/robots.txt` para validar regras de `Disallow` e `Crawl-Delay`.

</details>
