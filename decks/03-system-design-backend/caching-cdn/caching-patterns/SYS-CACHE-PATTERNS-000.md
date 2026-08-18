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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/cache-aside-vs-write-through-loop.webm">
    <p>Visualização: Cache-Aside lê sob demanda da cache com lazy loading vs Write-Through atualizando cache e banco de dados de forma síncrona.</p>
  </video>
</div>

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
