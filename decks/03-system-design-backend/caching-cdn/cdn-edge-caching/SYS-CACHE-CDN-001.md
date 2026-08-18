---
id: SYS-CACHE-CDN-001
title: "Diretivas HTTP Cache-Control: max-age, s-maxage, stale-while-revalidate e ETag"
tags:
  - level::l4-pleno
  - topic::sys::caching
  - company::akamai
  - freq::high
---

## Pergunta
Qual é a diferença entre as diretivas `max-age`, `s-maxage` e `stale-while-revalidate` do cabeçalho HTTP `Cache-Control` na interação entre Browsers e CDNs?

## Resposta
### Quick Answer
**Solução Direta**:
- `max-age=N`: Tempo máximo (em segundos) que a resposta pode ficar em cache no **Browser (Cliente privado)**.
- `s-maxage=N`: Tempo máximo específico para **Caches Compartilhados / CDNs** (sobrescreve o `max-age` para CDNs e proxies intermediários).
- `stale-while-revalidate=N`: Permite que a CDN sirva imediatamente um dado expirado (*stale*) ao usuário em frações de milissegundo, enquanto dispara **assincronamente em background** uma requisição à origem para revalidar e atualizar o cache.
- `ETag / If-None-Match`: Validador de conteúdo que retorna status `304 Not Modified` sem reenviar o payload se o conteúdo não mudou.

### Dual Coding Visual
| Diretiva HTTP | Onde se Aplica | Efeito Prático |
|---|---|---|
| **`max-age=300`** | Navegador do Usuário | Cache privado local de 5 minutos |
| **`s-maxage=86400`** | Servidor Edge da CDN | Cache público compartilhado de 24 horas |
| **`stale-while-revalidate=60`** | CDN e Navegadores modernos | Resposta instantânea com refresh assíncrono |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Cabeçalho de Alta Performance
```text
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: public, max-age=60, s-maxage=3600, stale-while-revalidate=300
ETag: "w/33a64df551425fcc3e"
```

</details>
