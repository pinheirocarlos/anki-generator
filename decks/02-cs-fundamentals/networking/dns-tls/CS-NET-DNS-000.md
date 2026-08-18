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
