---
id: BEH-SEC-PYRAMID-002
title: "Testcontainers: Eliminação de Mocks Quebradiços em Testes de Integração com Banco Real"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::google
  - freq::high
---

## Pergunta
Por que o uso de **Testcontainers (Containers Docker Efêmeros)** é superior a bancos em memória (H2/SQLite) ou mocks em testes de integração backend?

## Resposta
### Quick Answer
**Solução Direta**:
- **Limitações de Mocks e Bancos em Memória (H2 / SQLite)**:
  - Escondem diferenças críticas de produção: dialetos SQL específicos, funções JSONB, concorrência real (`SELECT FOR UPDATE`), extensões e comportamento de índices do PostgreSQL/MySQL.
- **Vantagens do Testcontainers**:
  - Inicializa uma instância Docker real e efêmera do mesmo banco de dados (ex: `postgres:16-alpine`) durante os testes no CI.
  - Garante **100% de paridade** com o ambiente de produção, executando migrations reais e destruindo o container automaticamente ao final da suíte.

### Dual Coding Visual
| Abordagem de Teste | Paridade com Produção | Risco de Bug Silencioso |
|---|---|---|
| **Mocks / Banco em Memória (H2)** | Baixa (dialetos e locks diferentes) | Alto (falha apenas em produção) |
| **Testcontainers (Docker Real)** | **Máxima (100% idêntico a produção)** | **Mínimo (validação real de queries)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java com JUnit 5 e Testcontainers
```java
@Testcontainers
class OrderRepositoryTest {
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("secret");

    @Test
    void shouldPersistAndQueryOrder() {
        DataSource ds = createDataSource(postgres.getJdbcUrl(), postgres.getUsername(), postgres.getPassword());
        OrderRepository repo = new OrderRepository(ds);
        
        repo.save(new Order("ORD-1", 99.90, "APPROVED"));
        Optional<Order> result = repo.findById("ORD-1");
        
        assertTrue(result.isPresent());
        assertEquals("APPROVED", result.get().getStatus());
    }
}
```

#### Key Takeaways
- Testcontainers viabiliza testes de integração determinísticos e confiáveis, eliminando surpresas causadas por divergências entre bancos de teste e produção.

</details>
