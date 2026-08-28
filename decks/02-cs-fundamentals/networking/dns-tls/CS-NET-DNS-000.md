---
id: CS-NET-DNS-000
title: "Arquitetura Hierárquica do DNS: Resolvedor Recursivo vs Servidor Autoritativo"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::google
  - freq::high
---

## Pergunta
Como funciona a resolução hierárquica do **DNS** e qual a diferença entre um **Resolvedor Recursivo** e um **Servidor Autoritativo**?

## Resposta
### Quick Answer
**Solução Direta**:
- O **DNS (Domain Name System)** é um banco de dados distribuído global em árvore hierárquica que traduz nomes legíveis (`api.exemplo.com`) em endereços IP:
  1. **Resolvedor Recursivo (ex: 8.8.8.8 / ISP)**: Recebe a consulta do cliente e faz todo o trabalho de buscar na árvore hierárquica em múltiplos passos.
  2. **Root Servers (`.`)**: 13 grupos de clusters globais que direcionam a consulta para o servidor TLD correto.
  3. **TLD Servers (`.com`, `.br`)**: Servidores que apontam para os servidores com autoridade sobre o domínio específico.
  4. **Servidor Autoritativo (ex: Route 53, Cloudflare DNS)**: O servidor oficial do dono do domínio que armazena os registros DNS finais (A, AAAA, CNAME) e entrega a resposta definitiva com autoridade.

### Dual Coding Visual
<svg viewBox="0 0 680 210" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="210" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Resolução Hierárquica do DNS: Da Raiz ao Servidor Autoritativo</text>
  <g transform="translate(40, 50)">
    <!-- Client -->
    <rect x="0" y="20" width="100" height="50" rx="5" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="50" y="45" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Cliente / App</text>
    <text x="50" y="58" fill="#94a3b8" font-size="9" text-anchor="middle">Lookup Inicial</text>

    <!-- Recursive Resolver -->
    <rect x="140" y="20" width="120" height="50" rx="5" fill="#0369a1" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="200" y="42" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Resolvedor Recursivo</text>
    <text x="200" y="58" fill="#bae6fd" font-size="9" text-anchor="middle">8.8.8.8 / 1.1.1.1</text>

    <!-- Hierarchy Stack -->
    <g transform="translate(300, 0)">
      <rect x="0" y="0" width="140" height="26" rx="4" fill="#1e293b" stroke="#64748b"/>
      <text x="70" y="17" fill="#f8fafc" font-size="10" text-anchor="middle">1. Root Server (.)</text>

      <rect x="0" y="32" width="140" height="26" rx="4" fill="#1e293b" stroke="#64748b"/>
      <text x="70" y="49" fill="#f8fafc" font-size="10" text-anchor="middle">2. TLD Server (.com)</text>

      <rect x="0" y="64" width="140" height="26" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
      <text x="70" y="81" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">3. Autoritativo (IP)</text>
    </g>

    <!-- Response -->
    <rect x="480" y="20" width="120" height="50" rx="5" fill="#047857" stroke="#10b981" stroke-width="2"/>
    <text x="540" y="42" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Resposta DNS A</text>
    <text x="540" y="58" fill="#a7f3d0" font-size="10" font-family="monospace" text-anchor="middle">142.250.190.46</text>
  </g>
  <text x="340" y="180" fill="#f59e0b" font-size="11" font-weight="bold" text-anchor="middle">Cache em Múltiplas Camadas (OS, Browser, Resolver ISP) esconde a latência de consultas iterativas.</text>

</svg>

| Tipo de Servidor DNS | Papel no Fluxo de Resolução | Armazena Registros Definitivos? |
|---|---|---|
| **Resolvedor Recursivo** | Faz buscas iterativas e armazena cache local | Não (Apenas retém em cache pelo TTL) |
| **Root & TLD Server** | Direciona para o próximo nível da hierarquia | Não (Apenas ponteiros NS) |
| **Servidor Autoritativo** | Detém a fonte da verdade oficial do domínio | Sim (Registros oficiais do dono) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Passo a Passo da Resolução de `api.google.com`
```text
1. Cliente -> Resolvedor Recursivo: "Qual o IP de api.google.com?"
2. Recursivo -> Root Server (.): "Quem cuida de .com?" -> Resposta: TLD Server de .com
3. Recursivo -> TLD Server (.com): "Quem cuida de google.com?" -> Resposta: NS da Google
4. Recursivo -> Servidor Autoritativo da Google: "Qual o IP de api.google.com?" -> Resposta: 142.250.190.46
5. Recursivo armazena em cache e retorna o IP final para o cliente.
```

#### Key Takeaways
- Mais de 95% das consultas DNS do dia a dia são resolvidas instantaneamente pelo cache do Resolvedor Recursivo ou do próprio sistema operacional.

</details>
