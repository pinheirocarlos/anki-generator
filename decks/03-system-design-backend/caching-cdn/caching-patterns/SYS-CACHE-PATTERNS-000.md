---
id: SYS-CACHE-PATTERNS-000
title: "Padrões de Cache: Cache-Aside (Lazy Loading) vs Read-Through / Write-Through"
tags:
  - level::l3-junior
  - topic::sys::caching
  - company::twitter
  - freq::high
---

## Pergunta
Qual é a diferença operacional entre o padrão Cache-Aside (Lazy Loading) e o padrão Write-Through no ciclo de vida de atualização de dados?

## Resposta
### Quick Answer
**Solução Direta**:
- **Cache-Aside (Lazy Loading)**:
  - A aplicação é responsável por coordenar o cache e o banco:
  - Na leitura: consulta o cache; em caso de *Cache Miss*, lê do banco, grava no cache e retorna.
  - Na escrita: grava no banco de dados e **invalida (deleta)** a chave no cache.
- **Write-Through**:
  - A aplicação grava exclusivamente no cache; o componente de cache grava **sincronamente** no banco de dados na mesma operação antes de retornar sucesso.
  - Garante consistência imediata entre cache e storage, com custo de maior latência de escrita.

### Dual Coding Visual
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Padrões de Caching: Cache-Aside vs Write-Through vs Write-Back</text>
  <g transform="translate(40, 50)">
    <!-- Cache-Aside -->
    <rect x="0" y="0" width="180" height="140" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="90" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Cache-Aside (Lazy)</text>
    <text x="90" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">App lê do Cache primeiro</text>
    <text x="90" y="68" fill="#f87171" font-size="10" text-anchor="middle">Miss: App busca DB e salva</text>
    <text x="90" y="92" fill="#cbd5e1" font-size="10" text-anchor="middle">Escrita: App invalida Cache</text>
    <text x="90" y="122" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Ideal para Read-Heavy</text>

    <!-- Write-Through -->
    <rect x="210" y="0" width="180" height="140" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Write-Through (Síncrono)</text>
    <text x="300" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">App grava na Cache</text>
    <text x="300" y="68" fill="#cbd5e1" font-size="10" text-anchor="middle">Cache grava no DB síncrono</text>
    <text x="300" y="92" fill="#cbd5e1" font-size="10" text-anchor="middle">Garante consistência forte</text>
    <text x="300" y="122" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Latência maior na escrita</text>

    <!-- Write-Back -->
    <rect x="420" y="0" width="180" height="140" rx="6" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="510" y="22" fill="#c084fc" font-size="11" font-weight="bold" text-anchor="middle">Write-Back / Behind</text>
    <text x="510" y="48" fill="#cbd5e1" font-size="10" text-anchor="middle">App grava na Cache (Ack)</text>
    <text x="510" y="68" fill="#cbd5e1" font-size="10" text-anchor="middle">Flush assíncrono para DB</text>
    <text x="510" y="92" fill="#34d399" font-size="10" text-anchor="middle">Altíssimo Throughput</text>
    <text x="510" y="122" fill="#f87171" font-size="10" font-weight="bold" text-anchor="middle">Risco de perda se Cache cair</text>
  </g>
  <text x="340" y="220" fill="#94a3b8" font-size="10" text-anchor="middle">Trade-off clássico: consistência imediata vs performance extrema de gravação.</text>

</svg>

| Padrão de Cache | Responsável pela Integração | Comportamento na Escrita |
|---|---|---|
| **Cache-Aside** | Código da Aplicação | Grava no DB e deleta chave no cache |
| **Write-Through** | Mecanismo do Próprio Cache | Grava no Cache e no DB sincronicamente |
| **Write-Back (Behind)** | Mecanismo do Próprio Cache | Grava no Cache; DB atualizado assincronamente |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que Deletar é Melhor do que Atualizar a Chave no Cache-Aside
- Se duas requisições concorrentes gravarem no banco, atualizar o cache diretamente pode causar uma condição de corrida onde o cache fica com um valor antigo sobrescrevendo um novo. Deletar a chave força a próxima leitura a buscar o dado mais recente no banco.

</details>
