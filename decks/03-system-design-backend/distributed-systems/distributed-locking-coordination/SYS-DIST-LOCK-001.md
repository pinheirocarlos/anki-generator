---
id: SYS-DIST-LOCK-001
title: "Fencing Tokens para Proteção Absoluta de Recursos em Locks Distribuídos"
tags:
  - level::l5-senior
  - topic::sys::distributed
  - company::google
  - freq::high
---

## Pergunta
Como o mecanismo de Fencing Tokens (proposto por Martin Kleppmann) protege storages compartilhados contra clientes zumbis que perderam locks por timeout?

## Resposta
### Quick Answer
**Solução Direta**:
- Locks distribuídos baseados em timeout nunca podem garantir exclusão mútua perfeita por si só devido a atrasos imprevisíveis de rede e GC.
- **Mecanismo de Fencing Token**:
  1. O servidor de lock (ZooKeeper, etcd ou Redis) gera um número inteiro estritamente **monotônico crescente** a cada aquisição de lock (o *Fencing Token*, ex: 31, 32, 33).
  2. O cliente anexa esse token a toda operação de escrita enviada ao storage de destino.
  3. O storage de destino valida o token: ele rejeita qualquer requisição cujo token seja menor que o maior token já aceito anteriormente.
- Se o Cliente A acordar após timeout com token antigo (31) e tentar gravar, o storage rejeita porque já aceitou uma gravação do Cliente B com token mais recente (32).

### Dual Coding Visual
| Origem da Operação | Token Apresentado | Decisão do Storage |
|---|---|---|
| **Cliente 1** | Token = 31 | Aceito (Marca maior token = 31) |
| **Cliente 2** | Token = 32 | Aceito (Marca maior token = 32) |
| **Cliente 1 (Zumbi)** | Token = 31 | Rejeitado (Token 31 < 32) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Integração em Banco de Dados
- Em bancos relacionais, implementa-se com verificação condicional:
```sql
UPDATE resource_table 
SET data = 'novo_valor', last_fencing_token = 32
WHERE id = 'res_1' AND last_fencing_token < 32;
```

</details>
