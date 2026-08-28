---
id: SYS-CACHE-PATTERNS-006
title: "Intuição Fundamental de Cache: O Post-it na Tela vs O Arquivo Central"
tags:
  - level::l2-fundamental
  - topic::sys::caching
  - company::twitter
  - freq::high
---

## Pergunta
Qual é a intuição fundamental de por que usamos cache em memória e qual a diferença básica entre Cache-Aside (Lazy Loading) e Write-Through?

## Resposta
### Quick Answer
**Solução Direta**:
- Buscar dados na memória RAM (Redis / Memcached) leva **menos de 1 milissegundo**, enquanto consultar um banco de dados relacional em disco pode levar **dezenas ou centenas de milissegundos**.
- **Cache-Aside (Lazy Loading)**: A aplicação é quem manda. Ela tenta ler do cache primeiro (*Cache Hit*); se não encontrar (*Cache Miss*), busca no banco e salva no cache para a próxima pessoa.
- **Write-Through**: A aplicação sempre grava no cache, e o cache atualiza o banco imediatamente de forma síncrona antes de confirmar o sucesso, garantindo que o cache esteja sempre 100% atualizado.

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">O Fluxo Cache-Aside (Lazy Loading)</text>

  <!-- App Server -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="130" height="90" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="8" />
    <text x="65" y="24" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">App Backend</text>
    <text x="65" y="50" fill="#ffffff" font-size="10" text-anchor="middle">1. Checa Cache</text>
    <text x="65" y="70" fill="#f59e0b" font-size="10" text-anchor="middle">2. Se Miss, vai ao DB</text>
  </g>

  <!-- Redis Cache (Rápido) -->
  <g transform="translate(235, 45)">
    <rect x="0" y="0" width="140" height="50" fill="#065f46" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="70" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Cache (Redis RAM)</text>
    <text x="70" y="38" fill="#ffffff" font-size="11" text-anchor="middle">⚡ Latência: &lt; 1 ms</text>
  </g>

  <!-- Database (Lento) -->
  <g transform="translate(235, 105)">
    <rect x="0" y="0" width="140" height="50" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="6" />
    <text x="70" y="22" fill="#c7d2fe" font-size="11" font-weight="bold" text-anchor="middle">Database (Postgres)</text>
    <text x="70" y="38" fill="#ffffff" font-size="11" text-anchor="middle">🐢 Latência: ~20-50 ms</text>
  </g>

  <!-- Estatística de Proteção -->
  <g transform="translate(420, 50)">
    <rect x="0" y="0" width="140" height="90" fill="#1e293b" stroke="#10b981" rx="8" />
    <text x="70" y="24" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">Taxa de Acerto</text>
    <text x="70" y="50" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle">95% Hit Rate</text>
    <text x="70" y="72" fill="#94a3b8" font-size="9" text-anchor="middle">Blindagem do Banco</text>
  </g>

  <text x="300" y="180" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">O cache absorve quase todo o impacto, permitindo ao sistema atender 100x mais usuários!</text>
</svg>

| Padrão de Cache | Como Trata a Gravação | Analogia do Cotidiano |
|---|---|---|
| **Cache-Aside (Lazy)** | Só carrega dados no cache quando alguém pede | Anotar um telefone em um post-it na primeira vez que você precisa ligar para ele. |
| **Write-Through** | Grava no cache e no banco ao mesmo tempo | Fazer uma cópia com papel carbono: escreve uma vez e gera as duas vias no mesmo instante. |
| **Write-Back (Write-Behind)** | Grava no cache e joga no banco depois em lote | Guardar os comprovantes no bolso e lançar na planilha no final do dia. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Problema Real
Bancos de dados relacionais são máquinas de precisão matemática e durabilidade em disco. Quando uma postagem viraliza no Twitter ou um produto entra em promoção, milhares de pessoas requisitam exatamente os mesmos dados a cada segundo. Fazer o banco de dados calcular e ler o mesmo dado 10.000 vezes por segundo é um desperdício colossal de recursos.

#### Políticas de Evicção: O que fazer quando a RAM enche?
A memória RAM é cara e limitada. Quando o Redis atinge o limite de gigabytes configurado:
- **LRU (Least Recently Used)**: Joga fora o dado que ficou mais tempo sem ser acessado por ninguém.
- **LFU (Least Frequently Used)**: Joga fora o dado que teve o menor número total de acessos.

#### Key Takeaways
- O padrão **Cache-Aside** é o mais popular e flexível da indústria para leituras pesadas.
- Sempre configure um tempo de expiração (**TTL**) para evitar que dados obsoletos fiquem presos no cache para sempre.

</details>
