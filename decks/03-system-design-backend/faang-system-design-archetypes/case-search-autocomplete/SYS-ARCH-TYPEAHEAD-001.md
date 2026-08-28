---
id: SYS-ARCH-TYPEAHEAD-001
title: "Pipeline de Agregação de Consultas Offline (MapReduce / Flink) e Sharding de Trie"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Como a esteira de agregação offline e o particionamento de Trie em servidores distribuídos escalam o Google Typeahead para centenas de milhões de termos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Pipeline de Agregação Offline (Apache Flink / Spark)**:
  - Atualizar a contagem de frequência na Trie em tempo real para cada busca causaria contenção massiva de escrita na RAM.
  - Consultas são descarregadas em logs no Kafka; um job em lote (Spark/Flink) agrega a contagem diária/semanal e gera uma **nova imagem da Trie imutável periodicamente** (ex: a cada hora), descarregando-a no cluster de consulta.
- **Particionamento da Trie (Sharding)**:
  - **Particionamento por Prefixo Inicial**: Servidor 1 armazena `[a-m]`, Servidor 2 armazena `[n-z]`.
  - **Particionamento por Consistent Hashing**: Hasheia o prefixo para balancear uniformemente letras com frequências desiguais (ex: 'e' tem muito mais termos que 'x').

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Esteira de Agregação Offline (MapReduce / Spark) &amp; Sharding de Trie</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Agregação Offline (Analytics)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Logs brutos de busca no S3 / Data Lake</text>
    <text x="140" y="65" fill="#fde68a" font-size="10" text-anchor="middle">Job Spark roda a cada 1 hora</text>
    <text x="140" y="88" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Recalcula frequências e gera Trie snapshot</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="460" y="22" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Sharding da Trie Distribuída</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Particionamento por prefixo alfabético</text>
    <text x="460" y="65" fill="#86efac" font-size="10" text-anchor="middle">Shard 1: [a-c], Shard 2: [d-f]...</text>
    <text x="460" y="88" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Replicado em cluster com Consistent Hashing</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Cache local de 1 hora no navegador do cliente (Cache-Control) absorve até 40% das requisições de autocomplete.</text>

</svg>

| Camada | Função | Tecnologia |
|---|---|---|
| **Tempo Real (Leitura)** | Responde sugestões em < 10ms a partir de Tries em RAM | Cluster C++ / Go com Trie em memória |
| **Offline (Escrita)** | Processa bilhões de buscas e recalcula Top-K | Apache Spark / Flink + S3 |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Cache no Navegador e CDN
- O cliente armazena respostas de autocompletar no cache local do browser (`sessionStorage` ou `Cache-Control: private, max-age=3600`), evitando chamadas de rede repetidas quando o usuário apaga ou redigita caracteres.

</details>
