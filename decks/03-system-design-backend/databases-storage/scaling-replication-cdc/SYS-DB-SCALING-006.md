---
id: SYS-DB-SCALING-006
title: "Intuição Fundamental de Escala de Bancos de Dados: O Escritor Principal e os Leitores Assistentes"
tags:
  - level::l2-fundamental
  - topic::sys::databases
  - company::meta
  - freq::high
---

## Pergunta
Qual é a intuição fundamental de como escalar bancos de dados relacionais usando Réplicas de Leitura (Read Replicas) e Change Data Capture (CDC)?

## Resposta
### Quick Answer
**Solução Direta**:
- Na maioria dos sistemas web, **a proporção de leitura para escrita é de 10:1 até 100:1** (para cada post publicado, milhares de pessoas apenas visualizam).
- Para evitar que o banco principal engasgue:
  - **Réplicas de Leitura (Read Replicas)**: Todas as escritas (`INSERT/UPDATE`) vão para um único nó Primário (Master/Primary); ele replica as alterações assincronamente para vários nós Secundários (Read Replicas) dedicados exclusivamente a responder `SELECTs`.
  - **Change Data Capture (CDC)**: Ouve o log de transações do banco primário em tempo real (ex: com Debezium) e transmite cada alteração instantaneamente para caches (Redis) ou motores de busca (Elasticsearch) sem sobrecarregar a aplicação.

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Separação de Responsabilidades: Escrita Única vs Leitura Distribuída</text>

  <!-- Nó Primário (Escritas) -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="150" height="90" fill="#1e293b" stroke="#f59e0b" stroke-width="2" rx="8" />
    <text x="75" y="24" fill="#fde68a" font-size="11" font-weight="bold" text-anchor="middle">Banco Primário</text>
    <text x="75" y="44" fill="#ffffff" font-size="10" text-anchor="middle">✍️ Apenas Escritas</text>
    <rect x="15" y="56" width="120" height="20" fill="#0f172a" rx="4" />
    <text x="75" y="70" fill="#f59e0b" font-size="9" font-family="monospace" text-anchor="middle">WAL (Log de Eventos)</text>
  </g>

  <!-- CDC / Replicação -->
  <g transform="translate(200, 80)">
    <path d="M 0 10 L 40 10" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="3,3" />
    <polygon points="40,10 32,6 32,14" fill="#10b981" />
    <text x="20" y="0" fill="#a7f3d0" font-size="8" text-anchor="middle">CDC / Binlog</text>
  </g>

  <!-- Réplica de Leitura 1 -->
  <g transform="translate(260, 40)">
    <rect x="0" y="0" width="140" height="50" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="70" y="22" fill="#93c5fd" font-size="10" font-weight="bold" text-anchor="middle">Réplica de Leitura 1</text>
    <text x="70" y="38" fill="#cbd5e1" font-size="9" text-anchor="middle">👓 Responde SELECTs</text>
  </g>

  <!-- Réplica de Leitura 2 -->
  <g transform="translate(260, 100)">
    <rect x="0" y="0" width="140" height="50" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="70" y="22" fill="#93c5fd" font-size="10" font-weight="bold" text-anchor="middle">Réplica de Leitura 2</text>
    <text x="70" y="38" fill="#cbd5e1" font-size="9" text-anchor="middle">👓 Responde SELECTs</text>
  </g>

  <!-- Elasticsearch / Redis via CDC -->
  <g transform="translate(430, 65)">
    <rect x="0" y="0" width="130" height="60" fill="#065f46" stroke="#10b981" stroke-width="1.5" rx="6" />
    <text x="65" y="24" fill="#a7f3d0" font-size="10" font-weight="bold" text-anchor="middle">Redis / Elastic (CDC)</text>
    <text x="65" y="44" fill="#ffffff" font-size="9" text-anchor="middle">Sincronizado em tempo real</text>
  </g>

  <text x="300" y="180" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">Escalabilidade de leitura multiplicada por 10x a 50x!</text>
</svg>
<p>Visualização: Analogia intuitiva de escala de banco de dados ilustrando o nó primário exclusivo para gravações replicando assincronamente para read replicas e sistemas downstream via CDC.</p>

| Estratégia de Escala | Função Principal | Analogia do Cotidiano |
|---|---|---|
| **Read Replicas** | Desafoga o tráfego de leitura do banco principal | Um autor que escreve o manuscrito e várias gráficas que imprimem cópias para o público ler. |
| **Change Data Capture (CDC)** | Notifica sistemas externos sobre cada alteração de dado | O repórter que transmite ao vivo cada gol do jogo para as rádios e portais de notícia. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Problema Real
Se 100.000 usuários acessarem um e-commerce durante a Black Friday procurando produtos, o banco central travaria em poucos segundos se tivesse que processar as consultas de busca e as transações de pagamento na mesma máquina.

#### O Efeito do Atraso de Replicação (Replication Lag)
Como a replicação do Primary para as Replicas é assíncrona para não deixar a gravação lenta, pode haver um pequeno atraso (ex: 20 milissegundos).
- **Problema do Read-Your-Own-Writes**: Um usuário edita o perfil, clica em salvar, a página recarrega lendo de uma réplica atrasada, e parece que o perfil não foi atualizado!
- **Solução**: Leituras feitas pelo próprio usuário logo após uma alteração são direcionadas temporariamente ao banco Primário.

#### Key Takeaways
- Read Replicas resolvem o gargalo de leitura ($Read \gg Write$).
- Para gargalos severos de escrita, a solução passa a ser o particionamento horizontal (**Sharding**).

</details>
