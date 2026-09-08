---
id: SYS-FND-FRAMEWORK-006
title: "Intuição Fundamental de System Design: O Funil dos 4 Passos do Arquiteto"
tags:
  - level::l2-fundamental
  - topic::sys::foundations
  - company::meta
  - freq::high
---

## Pergunta
Qual é a intuição fundamental por trás do framework estruturado de 4 passos em entrevistas e projetos de System Design?

## Resposta
### Quick Answer
**Solução Direta**:
- Um sistema complexo não se projeta desenhando caixas e servidores aleatoriamente; ele segue um **funil de refinamento progressivo** do abstrato ao concreto:
  1. **Passo 1 (Requisitos & Escopo)**: Definir o que o sistema faz (e o que NÃO faz).
  2. **Passo 2 (Estimativas Rápidas)**: Dimensionar a escala de tráfego e armazenamento.
  3. **Passo 3 (Design de Alto Nível)**: Esboçar os blocos principais (Clientes, Gateway, Serviços, Bancos).
  4. **Passo 4 (Deep Dives & Gargalos)**: Resolver gargalos específicos (Caches, Falhas, Concorrência).
- É a mesma disciplina da construção civil: ninguém compra o tipo de cimento antes de saber se o prédio terá 2 ou 80 andares.

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">O Funil de Resolução em System Design (4 Fases)</text>

  <!-- Passo 1 -->
  <g transform="translate(40, 45)">
    <rect x="0" y="0" width="115" height="100" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="57" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">1. Requisitos</text>
    <text x="57" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">O que construir?</text>
    <text x="57" y="62" fill="#64748b" font-size="9" text-anchor="middle">Casos de Uso</text>
    <text x="57" y="78" fill="#64748b" font-size="9" text-anchor="middle">SLA / Latência</text>
    <circle cx="57" cy="92" r="3" fill="#3b82f6" />
  </g>

  <!-- Passo 2 -->
  <g transform="translate(170, 45)">
    <rect x="0" y="0" width="115" height="100" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="6" />
    <text x="57" y="22" fill="#93c5fd" font-size="11" font-weight="bold" text-anchor="middle">2. Escopo</text>
    <text x="57" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Qual o tamanho?</text>
    <text x="57" y="62" fill="#64748b" font-size="9" text-anchor="middle">QPS &amp; Storage</text>
    <text x="57" y="78" fill="#64748b" font-size="9" text-anchor="middle">Leitura vs Escrita</text>
    <circle cx="57" cy="92" r="3" fill="#3b82f6" />
  </g>

  <!-- Passo 3 -->
  <g transform="translate(300, 45)">
    <rect x="0" y="0" width="115" height="100" fill="#1e293b" stroke="#10b981" stroke-width="2" rx="6" />
    <text x="57" y="22" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">3. Alto Nível</text>
    <text x="57" y="44" fill="#ffffff" font-size="10" text-anchor="middle">Arquitetura Base</text>
    <text x="57" y="62" fill="#34d399" font-size="9" text-anchor="middle">API &amp; Endpoints</text>
    <text x="57" y="78" fill="#34d399" font-size="9" text-anchor="middle">Data Model</text>
    <circle cx="57" cy="92" r="3" fill="#10b981" />
  </g>

  <!-- Passo 4 -->
  <g transform="translate(430, 45)">
    <rect x="0" y="0" width="130" height="100" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="6" />
    <text x="65" y="22" fill="#fde68a" font-size="11" font-weight="bold" text-anchor="middle">4. Deep Dives</text>
    <text x="65" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">Onde vai quebrar?</text>
    <text x="65" y="62" fill="#fbbf24" font-size="9" text-anchor="middle">Caches &amp; Filas</text>
    <text x="65" y="78" fill="#fbbf24" font-size="9" text-anchor="middle">Ponto Único Falha</text>
    <circle cx="65" cy="92" r="3" fill="#f59e0b" />
  </g>

  <!-- Setas entre fases -->
  <text x="160" y="98" fill="#475569" font-size="14" font-weight="bold">→</text>
  <text x="290" y="98" fill="#475569" font-size="14" font-weight="bold">→</text>
  <text x="420" y="98" fill="#475569" font-size="14" font-weight="bold">→</text>

  <text x="300" y="175" fill="#94a3b8" font-size="11" font-family="monospace" text-anchor="middle">A regra de ouro: Nunca pule para a solução técnica antes de travar o escopo!</text>
</svg>
<p>Visualização: O funil progressivo em 4 fases de System Design: Requisitos, Escopo, Alto Nível e Deep Dives.</p>

| Etapa do Framework | Foco Principal | Analogia da Construção |
|---|---|---|
| **1. Requisitos & Escopo** | Clarear funcionalidades e restrições | Perguntar para que servirá o imóvel e quantos moradores terá |
| **2. Design de Alto Nível** | Diagramar o fluxo de ponta a ponta | Desenhar a planta baixa com os cômodos e entradas |
| **3. Deep Dive & Resiliência** | Identificar e proteger gargalos | Dimensionar a rede elétrica, disjuntores e caixa d'água |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### O Erro Comum
O erro mais frequente de engenheiros juniores e plenos ao serem solicitados a "Projetar o Twitter" é começar imediatamente dizendo: *"Vou usar Redis para cache e Cassandra para o feed"*. Sem saber quantas pessoas postam, qual a tolerância a atraso e se haverá vídeos ou apenas texto, qualquer escolha tecnológica é um mero chute.

#### O Fluxo de Comunicação
1. **Perguntas Clarificadoras**: "Usuários podem editar posts?", "Precisamos suportar busca textual agora ou focamos no feed cronológico?"
2. **Modelo de Dados Mínimo**: Quais são as 2 ou 3 tabelas/documentos essenciais?
3. **Fluxos de Leitura vs Escrita**: Como um dado nasce no cliente e como ele chega aos outros usuários?

#### Key Takeaways
- O framework garante que o design resolva exatamente o problema proposto, sem over-engineering desnecessário.
- Ele demonstra maturidade arquitetural e capacidade de comunicação clara.

</details>
