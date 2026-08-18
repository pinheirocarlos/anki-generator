---
id: BEH-SEC-OWASP-001
title: "Prevenção Definitiva de BOLA / IDOR em APIs REST e GraphQL"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::google
  - freq::high
---

## Pergunta
O que é a vulnerabilidade **BOLA / IDOR (Broken Object Level Authorization)** e como mitigá-la de forma definitiva em APIs REST/GraphQL?

## Resposta
### Quick Answer
**Solução Direta**:
- **O que é BOLA / IDOR (Vulnerabilidade #1 da OWASP API)**:
  - Ocorre quando a API expõe identificadores de objetos diretamente no endpoint (ex: `GET /api/v1/invoices/9921`) e o backend retorna o recurso sem validar se o usuário autenticado é o dono legítimo daquele objeto.
- **Mitigação Definitiva**:
  - Nunca confiar exclusivamente no ID passado na rota.
  - O backend deve sempre injetar o `user_id` autenticado extraído do token de sessão validado diretamente na cláusula de consulta ao banco de dados:
    `WHERE invoice_id = ? AND user_id = ?`.

### Dual Coding Visual
| Abordagem | Código / Query Executada | Segurança |
|---|---|---|
| **Vulnerável a BOLA** | `SELECT * FROM invoices WHERE id = ?` | Qualquer usuário acessa faturas de outros |
| **Segura (Ownership)** | `SELECT * FROM invoices WHERE id = ? AND user_id = ?` | Acesso restrito estritamente ao dono do registro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Handler Seguro contra BOLA
```go
func (h *InvoiceHandler) GetInvoice(w http.ResponseWriter, r *http.Request) {
  invoiceID := chi.URLParam(r, "id")
  // Extrai o user_id autenticado e validado do contexto da requisição
  authUserID := r.Context().Value("user_id").(string)

  var inv Invoice
  // Query vincula obrigatoriamente o ID do recurso ao dono autenticado
  err := h.db.QueryRow(
    "SELECT id, amount, status FROM invoices WHERE id = $1 AND user_id = $2",
    invoiceID, authUserID,
  ).Scan(&inv.ID, &inv.Amount, &inv.Status)

  if err == sql.ErrNoRows {
    http.Error(w, "invoice not found or access denied", http.StatusNotFound)
    return
  }
  json.NewEncoder(w).Encode(inv)
}
```

#### Key Takeaways
- A validação de posse do recurso no nível do banco ou repositório neutraliza ataques de enumeração e manipulação de IDs em APIs.

</details>
