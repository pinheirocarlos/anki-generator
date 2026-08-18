---
id: BEH-SEC-DEPLOY-004
title: "Implementação de Dual-Write e Leitura com Fallback no Repositório de Dados"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::stripe
  - freq::high
---

## Pergunta
Como implementar a fase de **Dual-Write e Leitura com Fallback** na camada de repositório da aplicação durante uma migração de schema?

## Resposta
### Quick Answer
**Solução Direta**:
- **Padrão de Implementação no Repositório**:
  - **Escrita (Dual-Write)**: O método de gravação persiste simultaneamente na coluna legada e na coluna nova dentro da mesma instrução SQL ou transação.
  - **Leitura Resiliente (com Fallback)**: O método de leitura busca ambas as colunas e prioriza o valor da nova coluna; se ela for nula ou vazia, usa o valor da coluna legada como fallback transparente.

### Dual Coding Visual
| Operação | Comportamento no Código | Garantia de Integridade |
|---|---|---|
| **Gravação** | `INSERT ... (col_old, col_new) VALUES ($1, $1)` | Ambas as versões recebem novos dados |
| **Leitura** | `if col_new != nil ? col_new : col_old` | Suporta registros antigos e novos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Repositório em Go
```go
type UserRepo struct {
  db *sql.DB
}

func (r *UserRepo) Save(ctx context.Context, u *User) error {
  // Dual-Write: grava em ambas as colunas
  query := `INSERT INTO users (id, phone, mobile_contact) VALUES ($1, $2, $2)
            ON CONFLICT (id) DO UPDATE SET phone = $2, mobile_contact = $2`
  _, err := r.db.ExecContext(ctx, query, u.ID, u.Phone)
  return err
}

func (r *UserRepo) FindByID(ctx context.Context, id string) (*User, error) {
  var u User
  var legacyPhone, newMobile sql.NullString
  query := `SELECT id, phone, mobile_contact FROM users WHERE id = $1`
  err := r.db.QueryRowContext(ctx, query, id).Scan(&u.ID, &legacyPhone, &newMobile)
  if err != nil {
    return nil, err
  }
  
  // Leitura com Fallback seguro
  if newMobile.Valid && newMobile.String != "" {
    u.Phone = newMobile.String
  } else {
    u.Phone = legacyPhone.String
  }
  return &u, nil
}
```

#### Key Takeaways
- A leitura com fallback no repositório desacopla a migração de código da execução do backfill de dados históricos no banco.

</details>
