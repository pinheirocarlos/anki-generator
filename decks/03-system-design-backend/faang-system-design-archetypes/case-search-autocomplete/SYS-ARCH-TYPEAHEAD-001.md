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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/typeahead-offline-aggregation-trie-sharding-loop.webm">
    <p>Visualização: Esteira MapReduce calculando frequências de busca offline e particionando a Trie por prefixos em clusters distribuídos.</p>
  </video>
</div>

| Camada | Função | Tecnologia |
|---|---|---|
| **Tempo Real (Leitura)** | Responde sugestões em < 10ms a partir de Tries em RAM | Cluster C++ / Go com Trie em memória |
| **Offline (Escrita)** | Processa bilhões de buscas e recalcula Top-K | Apache Spark / Flink + S3 |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Cache no Navegador e CDN
- O cliente armazena respostas de autocompletar no cache local do browser (`sessionStorage` ou `Cache-Control: private, max-age=3600`), evitando chamadas de rede repetidas quando o usuário apaga ou redigita caracteres.

</details>
