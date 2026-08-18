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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/cdn-anycast-bgp-pop-routing-loop.webm">
    <p>Visualização: Roteamento Anycast BGP direcionando requisições do cliente ao Point of Presence (PoP) de menor latência geográfica.</p>
  </video>
</div>

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
