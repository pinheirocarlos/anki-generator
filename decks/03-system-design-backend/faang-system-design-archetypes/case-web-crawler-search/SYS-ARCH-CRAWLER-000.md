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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Web Crawler Distribuído (Googlebot): URL Frontier &amp; Políticas de Polidez</text>
  <g transform="translate(40, 50)">
    <!-- Priority Queues -->
    <rect x="0" y="0" width="180" height="120" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="90" y="22" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Prioritization (PageRank)</text>
    <rect x="15" y="35" width="150" height="22" rx="3" fill="#0284c7"/>
    <text x="90" y="50" fill="#ffffff" font-size="9" text-anchor="middle">Fila Alta Prioridade (F0)</text>
    <rect x="15" y="62" width="150" height="22" rx="3" fill="#0369a1"/>
    <text x="90" y="77" fill="#ffffff" font-size="9" text-anchor="middle">Fila Média (F1)</text>
    <rect x="15" y="88" width="150" height="22" rx="3" fill="#075985"/>
    <text x="90" y="103" fill="#ffffff" font-size="9" text-anchor="middle">Fila Baixa (F2)</text>

    <!-- Politeness Queues by Hostname -->
    <rect x="220" y="0" width="380" height="120" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="410" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Politeness Queues (Mapeadas por Hostname)</text>
    <rect x="240" y="35" width="340" height="22" rx="3" fill="#065f46"/>
    <text x="410" y="50" fill="#86efac" font-size="9" text-anchor="middle">Queue: wikipedia.org (1 worker com delay de 1000ms)</text>
    <rect x="240" y="62" width="340" height="22" rx="3" fill="#065f46"/>
    <text x="410" y="77" fill="#86efac" font-size="9" text-anchor="middle">Queue: github.com (1 worker com delay de 500ms)</text>
    <rect x="240" y="88" width="340" height="22" rx="3" fill="#065f46"/>
    <text x="410" y="103" fill="#86efac" font-size="9" text-anchor="middle">Queue: nytimes.com (Respeita robots.txt)</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">A URL Frontier isola hostnames garantindo que o crawler nunca cause negação de serviço (DDoS) no servidor alvo.</text>

</svg>
<p>Visualização: URL Frontier separando filas de prioridade e filas de polidez por hostname para evitar sobrecarga em servidores de destino.</p>

| Módulo da URL Frontier | Estrutura | Responsabilidade |
|---|---|---|
| **Priority Selector** | Filas ponderadas por PageRank | Define *o que* deve ser baixado primeiro |
| **Politeness Manager** | 1 Fila por Host + Delay Queue | Impede sobrecarga de servidores de terceiros |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Respeito ao `robots.txt`
- Antes de rastrear qualquer URL de um novo host, o crawler baixa e faz cache em memória do arquivo `https://domain.com/robots.txt` para validar regras de `Disallow` e `Crawl-Delay`.

</details>
