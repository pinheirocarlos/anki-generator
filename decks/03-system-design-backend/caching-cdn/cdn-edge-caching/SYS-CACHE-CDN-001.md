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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Diretivas HTTP Cache-Control &amp; stale-while-revalidate</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="25" fill="#38bdf8" font-size="11" font-family="monospace" text-anchor="middle">Cache-Control: max-age=600, s-maxage=3600, stale-while-revalidate=60</text>

    <g transform="translate(0, 55)">
      <rect x="0" y="0" width="190" height="70" rx="6" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
      <text x="95" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">0 a 600s: Fresh</text>
      <text x="95" y="44" fill="#cbd5e1" font-size="10" text-anchor="middle">Servido direto do browser/CDN</text>
      <text x="95" y="58" fill="#86efac" font-size="9" text-anchor="middle">Zero requisições à origem</text>

      <rect x="205" y="0" width="190" height="70" rx="6" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
      <text x="300" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">601 a 660s: Stale Window</text>
      <text x="300" y="44" fill="#cbd5e1" font-size="10" text-anchor="middle">Retorna dado antigo instantâneo</text>
      <text x="300" y="58" fill="#fde68a" font-size="9" text-anchor="middle">+ Dispara revalidação em background</text>

      <rect x="410" y="0" width="190" height="70" rx="6" fill="#0f172a" stroke="#f43f5e" stroke-width="1"/>
      <text x="505" y="22" fill="#f87171" font-size="11" font-weight="bold" text-anchor="middle">&gt; 660s: Expired</text>
      <text x="505" y="44" fill="#cbd5e1" font-size="10" text-anchor="middle">Bloqueia e aguarda resposta</text>
      <text x="505" y="58" fill="#fca5a5" font-size="9" text-anchor="middle">Validação síncrona com ETag (304)</text>
    </g>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">stale-while-revalidate elimina latência percebida pelo usuário final durante atualizações de cache.</text>

</svg>

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
