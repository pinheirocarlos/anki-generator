---
id: SYS-ARCH-CRAWLER-006
title: "Intuição Fundamental do Web Crawler: O Explorador da Biblioteca e o Filtro de Páginas Vistas"
tags:
  - level::l2-fundamental
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Qual é a intuição fundamental da arquitetura de um Web Crawler distribuído (como o robô de busca do Google) para indexar bilhões de páginas sem entrar em loops infinitos?

## Resposta
### Quick Answer
**Solução Direta**:
- Um Web Crawler funciona como um **explorador de biblioteca**: ele começa com uma lista inicial de sementes (URLs confiáveis), baixa o HTML, extrai todos os links encontrados na página e os coloca em uma fila para serem visitados a seguir (**URL Frontier**).
- **Os Três Desafios Críticos**:
  1. **Evitar Loops e Duplicações**: Usa um **Bloom Filter** em memória para checar em 1 microssegundo se a URL já foi visitada antes de colocá-la na fila.
  2. **Polidez com os Sites (*Politeness*)**: Nunca dispara 1.000 requisições por segundo para o mesmo domínio para não derrubar o site alheio (espera um intervalo de 1 a 2 segundos por host).
  3. **Respeito ao `robots.txt`**: Checa as permissões do dono do site antes de baixar as páginas.

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">O Ciclo Contínuo do Web Crawler Distribuído</text>

  <!-- URL Frontier (Fila de Prioridade) -->
  <g transform="translate(30, 50)">
    <rect x="0" y="0" width="130" height="90" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.5" rx="6" />
    <text x="65" y="22" fill="#c7d2fe" font-size="10" font-weight="bold" text-anchor="middle">URL Frontier</text>
    <text x="65" y="44" fill="#ffffff" font-size="9" text-anchor="middle">Fila de Prioridade</text>
    <text x="65" y="62" fill="#a5b4fc" font-size="8" text-anchor="middle">Politeness / Host Queue</text>
    <text x="65" y="78" fill="#10b981" font-size="8" text-anchor="middle">Bilhões de URLs</text>
  </g>

  <!-- Fetcher & HTML Parser -->
  <g transform="translate(190, 45)">
    <rect x="0" y="0" width="170" height="100" fill="#065f46" stroke="#10b981" stroke-width="2" rx="8" />
    <text x="85" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Fetcher &amp; Parser</text>
    <text x="85" y="44" fill="#ffffff" font-size="9" text-anchor="middle">1. Checa `robots.txt`</text>
    <text x="85" y="62" fill="#ffffff" font-size="9" text-anchor="middle">2. Baixa HTML do site</text>
    <text x="85" y="80" fill="#34d399" font-size="9" text-anchor="middle">3. Extrai novos links `&lt;a&gt;`</text>
  </g>

  <!-- Bloom Filter / Deduplicação -->
  <g transform="translate(390, 50)">
    <rect x="0" y="0" width="180" height="90" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="6" />
    <text x="90" y="22" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Bloom Filter (Deduplicação)</text>
    <text x="90" y="44" fill="#ffffff" font-size="9" text-anchor="middle">URL já foi vista antes?</text>
    <text x="90" y="62" fill="#10b981" font-size="9" text-anchor="middle">Se NÃO: Adiciona na Frontier</text>
    <text x="90" y="78" fill="#ef4444" font-size="9" text-anchor="middle">Se SIM: Descarta na hora</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">O Bloom Filter permite verificar bilhões de URLs ocupando frações de megabytes de RAM!</text>
</svg>
<p>Visualização: Fluxo contínuo de rastreamento com URL Frontier controlando polidez por domínio e Filtro de Bloom evitando downloads repetidos.</p>

| Componente | Função | Analogia do Cotidiano |
|---|---|---|
| **URL Frontier** | Organiza quais sites visitar primeiro e com qual frequência | O itinerário de viagem do carteiro com as ruas prioritárias do dia. |
| **Bloom Filter** | Filtra links repetidos em microssegundos com zero I/O | Um carimbo na mão na entrada da festa para não deixar a mesma pessoa entrar duas vezes. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Funciona a Polidez (Politeness)
O crawler divide as URLs em **Filas por Host** (ex: `fila:wikipedia.org`, `fila:globo.com`). Cada thread trabalhadora lê de uma fila diferente e respeita um temporizador mínimo de espera antes de fazer a próxima requisição para o mesmo domínio.

#### Key Takeaways
- Crawlers da internet exigem arquitetura distribuída massiva com alta tolerância a falhas de DNS, páginas quebradas e timeouts de rede.
- A deduplicação de conteúdo e de URLs é a chave para a eficiência operacional.

</details>
