---
id: BEH-SEC-DEPLOY-001
title: "As 4 Fases do Padrão Expand-and-Contract para Migrações de Banco Zero-Downtime"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::stripe
  - freq::high
---

## Pergunta
Quais são as 4 fases do padrão **Expand-and-Contract (Parallel Run)** para executar migrações de schema de banco de dados sem downtime?

## Resposta
### Quick Answer
**Solução Direta**:
- **As 4 Fases do Padrão**:
  1. **Fase 1 (Expand)**: Adiciona a nova coluna ou tabela como opcional (`NULLABLE`) no banco de dados. Ambas as estruturas coexistem.
  2. **Fase 2 (Dual-Write)**: Deploy da aplicação que passa a gravar dados em **ambas as colunas simultaneamente** (antiga e nova), mantendo a leitura na antiga.
  3. **Fase 3 (Backfill & Switch Read)**:
     - Um job em background copia e converte os dados históricos da coluna antiga para a nova.
     - Novo deploy da aplicação que passa a **ler da nova coluna** (com fallback se nulo).
  4. **Fase 4 (Contract)**:
     - Remove o código de escrita na coluna legada.
     - Executa o comando `DROP COLUMN` na coluna antiga com segurança total.

### Dual Coding Visual
| Fase do Processo | Estado do Banco de Dados | Comportamento da Aplicação |
|---|---|---|
| **1. Expand** | Cria nova coluna `NULLABLE` | Aplicação inalterada |
| **2. Dual-Write** | Ambas as colunas existem | Grava em ambas; lê da antiga |
| **3. Backfill & Read** | Dados históricos sincronizados | Grava em ambas; lê da nova |
| **4. Contract** | `DROP COLUMN` na coluna antiga | Grava e lê apenas da nova |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Linha do Tempo de Execução Segura
```text
Passo 1 (DB): ALTER TABLE users ADD COLUMN phone_v2 VARCHAR(20);
Passo 2 (App Deploy): Escreve em phone E phone_v2; lê de phone.
Passo 3 (Script): Backfill assíncrono copia phone -> phone_v2 em lotes de 1.000.
Passo 4 (App Deploy): Lê de phone_v2; escreve apenas em phone_v2.
Passo 5 (DB): ALTER TABLE users DROP COLUMN phone;
```

#### Key Takeaways
- O padrão Expand-and-Contract garante compatibilidade retroativa e futura contínua, permitindo deploys e rollbacks sem corrupção de dados ou paradas no serviço.

</details>
