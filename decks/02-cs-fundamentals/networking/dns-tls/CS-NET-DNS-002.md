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
