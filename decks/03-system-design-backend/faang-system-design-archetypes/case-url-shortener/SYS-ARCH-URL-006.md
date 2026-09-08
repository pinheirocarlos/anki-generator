---
id: SYS-ARCH-URL-006
title: "Intuição Fundamental do TinyURL: A Ficha do Guarda-Volumes"
tags:
  - level::l2-fundamental
  - topic::sys::archetypes
  - company::twitter
  - freq::high
---

## Pergunta
Qual é a intuição fundamental da arquitetura de um encurtador de URLs (TinyURL / Bitly) e como ele converte números em links curtos usando Base62?

## Resposta
### Quick Answer
**Solução Direta**:
- Um encurtador de URL funciona como a **ficha do guarda-volumes**: você entrega uma mala pesada (uma URL longa de 200 caracteres) e recebe uma fichinha com apenas 7 caracteres (ex: `tinyurl.com/a9Xk2Z`).
- **Como Funciona nos Bastidores**:
  1. Cada nova URL inserida recebe um **ID numérico inteiro único** sequencial gerado pelo banco ou Snowflake (ex: ID `125.123.456`).
  2. O sistema converte esse número da Base 10 para **Base 62** (usando `[0-9]`, `[a-z]`, `[A-Z]`). Com apenas 7 caracteres em Base62, é possível gerar mais de **3,5 trilhões de URLs únicas** ($62^7 \approx 3.5 \times 10^{12}$).
  3. Quando alguém clica no link curto, o servidor busca no cache em memória (Redis) e devolve um redirecionamento **HTTP 301 / 302** para a URL original.

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">O Ciclo de Vida do TinyURL: Codificação Base62 e Redirecionamento</text>

  <!-- URL Longa Original -->
  <g transform="translate(30, 50)">
    <rect x="0" y="0" width="150" height="90" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="8" />
    <text x="75" y="24" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">URL Longa (200 bytes)</text>
    <text x="75" y="46" fill="#f8fafc" font-size="8" font-family="monospace" text-anchor="middle">https://loja.com/p/item?id=...</text>
    <text x="75" y="70" fill="#64748b" font-size="9" text-anchor="middle">Recebe ID: `125123456`</text>
  </g>

  <!-- Conversor Base62 -->
  <g transform="translate(210, 45)">
    <rect x="0" y="0" width="170" height="100" fill="#065f46" stroke="#10b981" stroke-width="2" rx="8" />
    <text x="85" y="24" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Conversor Base 62</text>
    <rect x="15" y="36" width="140" height="30" fill="#0f172a" rx="4" />
    <text x="85" y="56" fill="#ffffff" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle">tiny.cc/a9Xk2Z</text>
    <text x="85" y="86" fill="#34d399" font-size="9" text-anchor="middle">62^7 = 3.5 trilhões de links</text>
  </g>

  <!-- Redirecionamento de Leitura (Cache) -->
  <g transform="translate(410, 50)">
    <rect x="0" y="0" width="160" height="90" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="8" />
    <text x="80" y="24" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">Leitura (100:1 Read)</text>
    <text x="80" y="46" fill="#10b981" font-size="10" font-weight="bold" text-anchor="middle">HTTP 301 / 302</text>
    <text x="80" y="68" fill="#a5b4fc" font-size="9" text-anchor="middle">Resolvido no Redis em &lt;1ms</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Como o sistema lê 100x mais do que grava, o cache Redis absorve 99% do tráfego!</text>
</svg>
<p>Visualização: Ciclo do encurtador: mapeamento de ID numérico em token Base62 de 7 caracteres com redirecionamento de alta velocidade via cache.</p>

| Código HTTP | Significado | Quando Usar |
|---|---|---|
| **HTTP 301 (Moved Permanently)** | O navegador salva o link em cache localmente | Reduz carga no servidor, mas você perde as métricas de cliques. |
| **HTTP 302 (Found / Temporary)** | O navegador sempre pergunta ao servidor | Permite rastrear analytics, localização geográfica e cliques de cada link. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Alfabeto Base62
Ao contrário da Base 10 (`0` a `9`) ou Base 16 Hexadecimal (`0` a `f`), a Base 62 usa:
- 10 dígitos: `0-9`
- 26 minúsculas: `a-z`
- 26 maiúsculas: `A-Z`
Total = $10 + 26 + 26 = 62$ símbolos seguros para URLs sem caracteres especiais confusos.

#### Key Takeaways
- Um encurtador de URLs é o arquétipo perfeito para demonstrar estimativas de tráfego, hash Base62, proporções de leitura pesada e estratégias de cache em memória.

</details>
