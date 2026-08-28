---
id: CS-NET-DNS-002
title: "TTL (Time to Live) em DNS e Tipos de Registros (A, AAAA, CNAME, ALIAS)"
tags:
  - level::l3-junior
  - topic::cs::networking
  - company::amazon
  - freq::high
---

## Pergunta
O que é o **TTL (Time to Live)** em registros DNS e quais as diferenças fundamentais entre registros **A, AAAA, CNAME e ALIAS**?

## Resposta
### Quick Answer
**Solução Direta**:
- **TTL (Time to Live)**: Tempo em segundos que um registro DNS pode ser retido em cache por resolvedores recursivos e navegadores antes de exigir nova consulta ao servidor autoritativo.
  - *TTL Alto (86400s / 24h)*: Reduz tráfego e latência; dificulta migrações rápidas de IP em emergências.
  - *TTL Baixo (60s)*: Permite failover rápido de DNS; aumenta carga de consultas.
- **Tipos de Registros**:
  - **A**: Mapeia nome para endereço **IPv4** (32 bits, ex: `192.0.2.1`).
  - **AAAA**: Mapeia nome para endereço **IPv6** (128 bits, ex: `2001:db8::1`).
  - **CNAME (Canonical Name)**: Aponta um alias para outro domínio (*não pode ser usado na raiz apex do domínio*).
  - **ALIAS / ANAME**: Registro virtual que resolve o IP de outro domínio em tempo real e entrega registros A/AAAA na raiz do domínio (`exemplo.com`).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Tipos de Registros DNS &amp; TTL (Time To Live)</text>
  <g transform="translate(60, 48)">
    <rect x="0" y="0" width="130" height="75" rx="5" fill="#1e293b" stroke="#3b82f6"/>
    <text x="65" y="22" fill="#60a5fa" font-size="12" font-weight="bold" text-anchor="middle">Registro A</text>
    <text x="65" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Nome → IPv4</text>
    <text x="65" y="60" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">192.0.2.1</text>

    <rect x="145" y="0" width="130" height="75" rx="5" fill="#1e293b" stroke="#10b981"/>
    <text x="210" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Registro AAAA</text>
    <text x="210" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Nome → IPv6</text>
    <text x="210" y="60" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">2001:db8::1</text>

    <rect x="290" y="0" width="130" height="75" rx="5" fill="#1e293b" stroke="#f59e0b"/>
    <text x="355" y="22" fill="#fbbf24" font-size="12" font-weight="bold" text-anchor="middle">Registro CNAME</text>
    <text x="355" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Alias Canônico</text>
    <text x="355" y="60" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle">app.cdn.net</text>

    <rect x="435" y="0" width="125" height="75" rx="5" fill="#1e293b" stroke="#a855f7"/>
    <text x="497" y="22" fill="#c084fc" font-size="12" font-weight="bold" text-anchor="middle">DNS TTL</text>
    <text x="497" y="42" fill="#ffffff" font-size="10" text-anchor="middle">Tempo de Cache</text>
    <text x="497" y="60" fill="#94a3b8" font-size="9" text-anchor="middle">TTL=60s p/ Failover</text>
  </g>
  <text x="340" y="155" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">CNAME na zona raiz (@) é proibido pela RFC 1034; provedores modernos usam registros ALIAS/ANAME virtuais.</text>

</svg>

| Registro DNS | Tipo de Destino | Permite Raiz Apex (`exemplo.com`)? |
|---|---|---|
| **A / AAAA** | Endereço IP direto (IPv4 / IPv6) | Sim |
| **CNAME** | Outro nome de domínio (Alias) | Não (RFC proíbe coexistência com SOA/NS) |
| **ALIAS / ANAME** | Resolução interna para IP | Sim (Suportado por Route53/Cloudflare) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Estratégia de Migração de Servidores em Produção
- **48 horas antes da migração**: Reduzir o TTL do domínio de 86400s (24h) para 300s (5 minutos).
- **No momento da virada**: Alterar o IP do registro A. Em 5 minutos, 100% dos clientes globais estarão apontando para o novo servidor.
- **Após estabilização**: Retornar o TTL para valor mais alto para economizar custos de consulta DNS.

#### Key Takeaways
- Alterações em registros DNS não propagam instantaneamente devido aos caches dos provedores respeitando o TTL configurado anteriormente.

</details>
