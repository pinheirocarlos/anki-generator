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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Fencing Tokens: Proteção Monotônica de Recursos Compartilhados</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Serviço de Lock (Zookeeper / etcd) gera Fencing Token Monotônico</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="260" height="55" rx="4" fill="#065f46"/>
      <text x="130" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Cliente 2 (Token = 34)</text>
      <text x="130" y="42" fill="#ffffff" font-size="9" text-anchor="middle">Storage atualiza: last_token = 34 (Aceito ✅)</text>

      <rect x="300" y="0" width="260" height="55" rx="4" fill="#7f1d1d"/>
      <text x="430" y="22" fill="#fca5a5" font-size="10" font-weight="bold" text-anchor="middle">Cliente 1 Acorda do GC (Token = 33)</text>
      <text x="430" y="42" fill="#ffffff" font-size="9" text-anchor="middle">Storage rejeita: 33 &lt; 34 (Rejeitado ❌)</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">O Storage valida last_token monotônico: gravações com tokens obsoletos são descartadas atomicamente.</text>

</svg>

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
