---
id: SYS-CACHE-CDN-000
title: "CDNs, Anycast BGP Routing e Redução de RTT via Pontos de Presença (PoPs)"
tags:
  - level::l3-junior
  - topic::sys::caching
  - company::cloudflare
  - freq::high
---

## Pergunta
Como Redes de Entrega de Conteúdo (CDNs) utilizam Anycast BGP e Pontos de Presença (PoPs) distribuídos para reduzir a latência de Round-Trip Time (RTT)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Anycast BGP**: Múltiplos servidores CDN espalhados globalmente anunciam o **mesmo endereço IP público** via protocolo BGP na internet. Os roteadores dos provedores de internet (ISPs) encaminham o pacote do usuário para o servidor geograficamente ou topologicamente mais próximo.
- **Pontos de Presença (PoPs)**:
  - Terminam o aperto de mão TCP e TLS 1.3 na **borda da rede** (Edge), a poucos milissegundos do usuário final.
  - Se o asset estiver em cache no PoP (Edge Cache Hit), a resposta é entregue em $\sim 5-15 \text{ ms}$, blindando os servidores de origem (*Origin Shields*).

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">CDN Edge Caching &amp; Roteamento Anycast BGP</text>
  <g transform="translate(40, 50)">
    <!-- Client SP -->
    <circle cx="50" cy="50" r="28" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="50" y="54" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Cliente SP</text>

    <!-- PoP SP -->
    <rect x="170" y="20" width="130" height="60" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="235" y="44" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">Edge PoP (SP)</text>
    <text x="235" y="62" fill="#a7f3d0" font-size="9" text-anchor="middle">RTT: ~3 ms (Hit)</text>

    <!-- Client NY -->
    <circle cx="50" cy="120" r="28" fill="#0369a1" stroke="#38bdf8" stroke-width="2"/>
    <text x="50" y="124" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Cliente NY</text>

    <!-- PoP NY -->
    <rect x="170" y="90" width="130" height="60" rx="6" fill="#065f46" stroke="#10b981" stroke-width="2"/>
    <text x="235" y="114" fill="#86efac" font-size="11" font-weight="bold" text-anchor="middle">Edge PoP (NY)</text>
    <text x="235" y="132" fill="#a7f3d0" font-size="9" text-anchor="middle">RTT: ~2 ms (Hit)</text>

    <!-- Origin DC -->
    <rect x="420" y="45" width="160" height="80" rx="8" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
    <text x="500" y="75" fill="#fde68a" font-size="12" font-weight="bold" text-anchor="middle">Origin Data Center</text>
    <text x="500" y="95" fill="#fef3c7" font-size="9" text-anchor="middle">(BGP Anycast IP único)</text>
    <text x="500" y="112" fill="#cbd5e1" font-size="9" text-anchor="middle">Acessado apenas em Miss</text>

    <!-- Lines -->
    <line x1="80" y1="50" x2="170" y2="50" stroke="#38bdf8" stroke-width="2"/>
    <line x1="80" y1="120" x2="170" y2="120" stroke="#38bdf8" stroke-width="2"/>
    <line x1="300" y1="50" x2="420" y2="70" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4"/>
    <line x1="300" y1="120" x2="420" y2="100" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4"/>
  </g>
  <text x="340" y="212" fill="#94a3b8" font-size="10" text-anchor="middle">BGP Anycast anuncia o mesmo IP globalmente; roteadores da Internet direcionam para o PoP topologicamente mais próximo.</text>

</svg>
<p>Visualização: Roteamento Anycast BGP direcionando requisições do cliente ao Point of Presence (PoP) de menor latência geográfica.</p>

| Tipo de Requisição | Roteamento e Término | Latência de RTT Típica |
|---|---|---|
| **Sem CDN (Direto na Origem)** | Roteamento Unicast transcontinental | 150 - 300 ms |
| **Com CDN (Edge Cache Hit)** | Roteamento Anycast para PoP local | 5 - 15 ms |
| **Com CDN (Cache Miss na Edge)** | PoP busca na Origem via conexão persistente | ~150 ms (Próximas requisições ficam em cache) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Otimização de Conexão com a Origem
- Entre o PoP da CDN e o servidor de origem, a CDN mantém **pools de conexões TCP/TLS aquecidas** (*Persistent Keep-Alive Connections*), eliminando a latência de novos handshakes mesmo em caso de Cache Miss.

</details>
