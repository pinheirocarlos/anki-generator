import { writeAndValidateCard } from './decompose-helper.js';

console.log('--- Decompondo Release, Security & Testing Pyramid ---');

// ==========================================
// 10. Backend Security & OWASP
// ==========================================

writeAndValidateCard('decks/04-behavioral-engineering/release-security/backend-security-owasp/BEH-SEC-OWASP-000.md', `---
id: BEH-SEC-OWASP-000
title: "Distinção Fundamental entre Autenticação (AuthN) e Autorização (AuthZ)"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a diferença fundamental entre **Autenticação (AuthN)** e **Autorização (AuthZ)** em segurança de aplicações backend?

## Resposta
### Quick Answer
**Solução Direta**:
- **Autenticação (AuthN — "Quem é você?")**:
  - Processo de verificar e validar a identidade alegada do usuário ou serviço (ex: usuário e senha com hash Argon2, MFA/TOTP, biometria WebAuthn, login federado OIDC).
- **Autorização (AuthZ — "O que você pode fazer?")**:
  - Processo de determinar quais permissões, recursos e operações uma identidade já autenticada tem direito de acessar ou executar (ex: permissões de leitura/escrita, escopos OAuth2, regras RBAC/ABAC).

### Dual Coding Visual
| Conceito de Segurança | Pergunta Central | Mecanismo Típico no Backend |
|---|---|---|
| **Autenticação (AuthN)** | *"Quem é você?"* | Validação de credenciais, MFA e tokens OIDC |
| **Autorização (AuthZ)** | *"O que você pode acessar?"* | Escopos de permissão, RBAC e ABAC |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fluxo Sequencial de Segurança
\`\`\`text
[Usuário envia Credenciais]
          │
          ▼
1. Autenticação (AuthN): Valida senha e MFA ──► Identidade Confirmada (ID: usr_99)
          │
          ▼
2. Autorização (AuthZ): Checa se usr_99 tem role ADMIN ──► Permissão Concedida ✅
\`\`\`

#### Key Takeaways
- AuthN sempre precede AuthZ: primeiro confirmamos a identidade com certeza criptográfica, e em seguida validamos as permissões específicas sobre cada recurso solicitado.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/backend-security-owasp/BEH-SEC-OWASP-001.md', `---
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
  - Ocorre quando a API expõe identificadores de objetos diretamente no endpoint (ex: \`GET /api/v1/invoices/9921\`) e o backend retorna o recurso sem validar se o usuário autenticado é o dono legítimo daquele objeto.
- **Mitigação Definitiva**:
  - Nunca confiar exclusivamente no ID passado na rota.
  - O backend deve sempre injetar o \`user_id\` autenticado extraído do token de sessão validado diretamente na cláusula de consulta ao banco de dados:
    \`WHERE invoice_id = ? AND user_id = ?\`.

### Dual Coding Visual
| Abordagem | Código / Query Executada | Segurança |
|---|---|---|
| **Vulnerável a BOLA** | \`SELECT * FROM invoices WHERE id = ?\` | Qualquer usuário acessa faturas de outros |
| **Segura (Ownership)** | \`SELECT * FROM invoices WHERE id = ? AND user_id = ?\` | Acesso restrito estritamente ao dono do registro |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Go: Handler Seguro contra BOLA
\`\`\`go
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
\`\`\`

#### Key Takeaways
- A validação de posse do recurso no nível do banco ou repositório neutraliza ataques de enumeração e manipulação de IDs em APIs.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/backend-security-owasp/BEH-SEC-OWASP-002.md', `---
id: BEH-SEC-OWASP-002
title: "OAuth 2.0 (Autorização Delegada) vs OpenID Connect / OIDC (Identidade)"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::amazon
  - freq::high
---

## Pergunta
Qual é a distinção funcional entre os padrões **OAuth 2.0 (Autorização)** e **OpenID Connect / OIDC (Autenticação)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **OAuth 2.0 (Framework de Autorização Delegada)**:
  - Permite que uma aplicação terceira acesse recursos protegidos em nome do usuário sem ter acesso à senha dele.
  - Emite um \`access_token\` com escopos de permissão (ex: \`scope="read:photos"\`).
- **OpenID Connect / OIDC (Camada de Identidade)**:
  - Protocolo de autenticação construído sobre o OAuth 2.0.
  - Emite um \`id_token\` assinado no formato JWT contendo as informações de perfil do usuário (\`sub\`, \`name\`, \`email\`).

### Dual Coding Visual
| Protocolo | Função Central | Token Principal Emitido |
|---|---|---|
| **OAuth 2.0** | Autorização Delegada de Recursos | \`access_token\` (Chave de Acesso) |
| **OpenID Connect (OIDC)** | Autenticação Federada e Identidade | \`id_token\` (Documento de Identidade / RG) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Analogia Prática do Crachá e da Chave
\`\`\`text
- id_token (OIDC): O crachá com sua foto e nome comprovando quem você é.
- access_token (OAuth 2.0): O cartão magnético que abre as portas das salas autorizadas.
\`\`\`

#### Key Takeaways
- OAuth 2.0 resolve o problema de delegação de acesso a APIs; OIDC adiciona a camada padronizada de login federado e perfil de usuário.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/backend-security-owasp/BEH-SEC-OWASP-003.md', `---
id: BEH-SEC-OWASP-003
title: "Estrutura do JWT e Mecanismo de Validação Stateless via Chave Pública JWKS"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::google
  - freq::high
---

## Pergunta
Como está estruturado um **JWT (JSON Web Token)** e por que sua validação de assinatura criptográfica é considerada *stateless*?

## Resposta
### Quick Answer
**Solução Direta**:
- **Estrutura em 3 Partes (Codificadas em Base64URL)**:
  \`Header.Payload.Signature\`
  1. **Header**: Metadados do algoritmo de assinatura (ex: \`RS256\`, \`ES256\`) e ID da chave (\`kid\`).
  2. **Payload**: Claims de dados (identificador \`sub\`, emissor \`iss\`, expiração \`exp\`, roles).
  3. **Signature**: Assinatura criptográfica gerada com a chave privada do servidor de autenticação.
- **Validação Stateless via JWKS**:
  - Qualquer microsserviço backend pode baixar a chave pública do emissor (endpoint JWKS) e verificar a assinatura localmente em memória com computação puramente matemática, sem consultar banco de dados ou servidor central a cada requisição.

### Dual Coding Visual
| Componente do JWT | O que Contém | Função de Segurança |
|---|---|---|
| **Header** | Algoritmo e \`kid\` | Instruções de validação criptográfica |
| **Payload** | Dados e permissões | Claims de identidade com validade (\`exp\`) |
| **Signature** | Assinatura com Chave Privada | Garante que o payload não foi adulterado |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Validação Stateless entre Microsserviços
\`\`\`text
[Auth Server] ──(Emite JWT assinado com Chave Privada)──► [Cliente]
                                                               │
┌──────────────────────────────────────────────────────────────┘
│ (Envia Header: Bearer <jwt>)
▼
[API Gateway / Microsserviço]
├── Baixa Chave Pública uma vez do endpoint /.well-known/jwks.json (com cache local).
├── Valida a assinatura matematicamente em < 1ms.
└── Processa a requisição sem fazer nenhuma consulta de rede ou banco!
\`\`\`

#### Key Takeaways
- JWTs viabilizam arquiteturas de microsserviços altamente escaláveis e desacopladas, dispensando compartilhamento de sessões em bancos de dados centrais.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/backend-security-owasp/BEH-SEC-OWASP-004.md', `---
id: BEH-SEC-OWASP-004
title: "Controle de Acesso RBAC (Role-Based) vs ABAC (Attribute-Based)"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::amazon
  - freq::high
---

## Pergunta
Qual é o contraste operacional e de granularidade entre os modelos de controle de acesso **RBAC (Role-Based)** e **ABAC (Attribute-Based)**?

## Resposta
### Quick Answer
**Solução Direta**:
- **RBAC (Role-Based Access Control — Papéis Estáticos)**:
  - Permissões associadas a funções pré-definidas (ex: \`ADMIN\`, \`EDITOR\`, \`VIEWER\`).
  - *Vantagem*: Simples de configurar e gerenciar em sistemas de baixa complexidade.
  - *Limitação*: Sofre com explosão de papéis (*role explosion*) quando surgem exceções contextuais.
- **ABAC (Attribute-Based Access Control — Atributos Dinâmicos)**:
  - Permissões avaliadas em tempo real com base em atributos do sujeito, recurso, ação e ambiente.
  - *Exemplo*: *"Usuário pode editar contrato SE for o criador E status for RASCUNHO E o acesso for em horário comercial"*.
  - *Vantagem*: Máxima granularidade e flexibilidade sem proliferar papéis estáticos.

### Dual Coding Visual
| Modelo | Base de Avaliação | Complexidade |
|---|---|---|
| **RBAC** | Papel fixo atribuído ao usuário (\`Role == "ADMIN"\`) | Baixa (Ideal para regras simples) |
| **ABAC** | Atributos combinados de usuário, recurso e ambiente | Média/Alta (Motor de políticas como OPA) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Política ABAC com Rego (Open Policy Agent - OPA)
\`\`\`text
package authz

default allow = false

# Permite acesso se o usuário for do mesmo departamento E o documento for público
allow {
    input.user.department == input.document.department
    input.document.is_classified == false
}

# Permite edição apenas pelo autor durante dias úteis
allow {
    input.user.id == input.document.author_id
    input.action == "edit"
    input.environment.is_business_day == true
}
\`\`\`

#### Key Takeaways
- Comece com RBAC para estruturas simples de permissão; migre para ABAC (com OPA/Zanzibar) quando as regras de autorização dependerem de contexto e dados do recurso.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/backend-security-owasp/BEH-SEC-OWASP-005.md', `---
id: BEH-SEC-OWASP-005
title: "Mitigação de Ataques SSRF (Server-Side Request Forgery) em Serviços Backend"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::google
  - freq::high
---

## Pergunta
O que é o vetor de ataque **SSRF (Server-Side Request Forgery)** e quais mecanismos de rede e aplicação o neutralizam?

## Resposta
### Quick Answer
**Solução Direta**:
- **O que é SSRF**:
  - Ocorre quando um serviço backend recebe uma URL fornecida pelo usuário e busca seu conteúdo sem validação, permitindo que atacantes alcancem serviços internos da rede privada ou endpoints de metadados da nuvem (ex: \`http://169.254.169.254/latest/meta-data/\` para roubar credenciais IAM da AWS).
- **Mecanismos de Mitigação**:
  1. **Lista Restrita de Domínios Permitidos (*Allowlist*)**: Permitir apenas conexões a domínios explicitamente confiáveis.
  2. **Bloqueio de Faixas IP Privadas e Link-Local**: Bloquear estritamente acessos a \`127.0.0.1\`, \`10.0.0.0/8\`, \`172.16.0.0/12\`, \`192.168.0.0/16\` e \`169.254.169.254\`.
  3. **Validação Após Resolução DNS**: Resolver o IP do hostname antes de disparar a requisição para evitar ataques de DNS Rebinding.

### Dual Coding Visual
| Alvo do Ataque SSRF | Risco de Segurança | Mecanismo de Defesa |
|---|---|---|
| **Metadados da Nuvem (169.254.169.254)** | Roubo de chaves IAM e takeover da conta | Bloqueio via firewall e IMDSv2 com token |
| **Bancos / Redis Internos** | Acesso direto a dados confidenciais | Bloqueio de sub-redes privadas na aplicação |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Validação Segura de URL contra SSRF em Go
\`\`\`go
func validateURL(targetURL string) error {
  parsed, err := url.Parse(targetURL)
  if err != nil || (parsed.Scheme != "http" && parsed.Scheme != "https") {
    return errors.New("invalid protocol scheme")
  }

  // Resolve o IP do host para evitar bypass via DNS
  ips, err := net.LookupIP(parsed.Hostname())
  if err != nil || len(ips) == 0 {
    return errors.New("failed to resolve host")
  }

  for _, ip := range ips {
    // Bloqueia IPs privados, loopback e link-local
    if ip.IsLoopback() || ip.IsPrivate() || ip.IsLinkLocalUnicast() {
      return fmt.Errorf("forbidden private IP address: %s", ip.String())
    }
  }
  return nil
}
\`\`\`

#### Key Takeaways
- Bloquear requisições a IPs privados e impor metadados da nuvem com token de sessão (IMDSv2) elimina os vetores mais devastadores de exploração SSRF.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/backend-security-owasp/BEH-SEC-OWASP-006.md', `---
id: BEH-SEC-OWASP-006
title: "Gestão e Rotação Automática de Segredos com HashiCorp Vault em Microsserviços"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::amazon
  - freq::high
---

## Pergunta
Como arquitetar uma infraestrutura segura de **Gestão e Rotação Automática de Segredos** (HashiCorp Vault / AWS Secrets Manager) em microsserviços?

## Resposta
### Quick Answer
**Solução Direta**:
- **Regras de Ouro de Segurança**:
  - Proibição estrita de credenciais em repositórios Git, imagens Docker ou variáveis de ambiente estáticas.
- **Arquitetura com HashiCorp Vault**:
  1. **Autenticação Segura de Máquina**: O pod do Kubernetes autentica no Vault via ServiceAccount token assinado e mTLS.
  2. **Credenciais Efêmeras e Dinâmicas**: O Vault gera usuários de banco de dados sob demanda com tempo de vida curto (ex: TTL de 1 hora).
  3. **Rotação Transparente em Memória**: A aplicação renova o token automaticamente ou recebe o novo secret via sidecar, sem necessidade de restart ou deploy.

### Dual Coding Visual
| Prática Insegura | Prática com Vault / Secrets Manager | Benefício de Segurança |
|---|---|---|
| Senha fixa em \`.env\` ou Git | Credenciais dinâmicas com TTL curto | Vazamentos de credenciais expiram em 1h |
| Rotação manual com downtime | Rotação automática via Secrets Engine | Zero intervenção humana e zero downtime |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Fluxo de Geração de Credencial Dinâmica no Vault
\`\`\`text
[Microsserviço] ──(Autentica com ServiceAccount)──► [HashiCorp Vault]
                                                             │
                                                             ▼
[Banco de Dados] ◄──(Vault cria usuário temporário com TTL)──┘
        │
        ▼
[Microsserviço conecta com credencial efêmera válida por 1 hora]
\`\`\`

#### Key Takeaways
- O uso de credenciais dinâmicas e efêmeras transforma segredos estáticos em acessos temporários e auditáveis, limitando drasticamente o impacto de eventuais vazamentos.

</details>
`);

// ==========================================
// 11. Deployment Strategies
// ==========================================

writeAndValidateCard('decks/04-behavioral-engineering/release-security/deployment-strategies/BEH-SEC-DEPLOY-000.md', `---
id: BEH-SEC-DEPLOY-000
title: "Rolling Update vs Blue-Green Deployment: Operação, Custo e Velocidade de Rollback"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::meta
  - freq::high
---

## Pergunta
Qual é a distinção operacional, custo de infraestrutura e velocidade de rollback entre **Rolling Update** e **Blue-Green Deployment**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Rolling Update (Substituição Gradual)**:
  - Atualiza instâncias em lotes incrementais (ex: 2 pods por vez em um total de 10).
  - *Custo*: Baixo ($1\times$), sem necessidade de duplicar infraestrutura.
  - *Rollback*: Moderado (exige novo rolling update reverso).
  - *Atenção*: As versões antiga e nova convivem ativas por vários minutos.
- **Blue-Green Deployment (Comutação Total de Ambientes)**:
  - Mantém dois ambientes completos idênticos: **Blue (Ativo)** e **Green (Novo com a nova versão)**.
  - O Load Balancer comuta 100% do tráfego para o ambiente Green instantaneamente.
  - *Custo*: Alto ($2\times$ durante o deploy).
  - *Rollback*: Instantâneo (basta comutar o tráfego de volta para o Blue).

### Dual Coding Visual
| Estratégia | Custo de Infra | Velocidade de Rollback |
|---|---|---|
| **Rolling Update** | $1\times$ (Zero custo extra) | Moderada (requer rollout reverso) |
| **Blue-Green** | $2\times$ (Ambiente duplicado) | **Instantânea (< 1 segundo)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Comutação no Load Balancer (Blue-Green)
\`\`\`text
Antes do Deploy:
[Load Balancer] ──(100% Tráfego)──► [Ambiente BLUE (v1.0)]  |  [Ambiente GREEN (v2.0 em Teste)]

Após Homologação do Green:
[Load Balancer] ──(100% Tráfego)──► [Ambiente GREEN (v2.0)] |  [Ambiente BLUE (v1.0 Standby)]
\`\`\`

#### Key Takeaways
- Rolling Update é a escolha padrão em Kubernetes por economia de recursos; Blue-Green é ideal para aplicações críticas onde o rollback instantâneo é mandatário.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/deployment-strategies/BEH-SEC-DEPLOY-001.md', `---
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
  1. **Fase 1 (Expand)**: Adiciona a nova coluna ou tabela como opcional (\`NULLABLE\`) no banco de dados. Ambas as estruturas coexistem.
  2. **Fase 2 (Dual-Write)**: Deploy da aplicação que passa a gravar dados em **ambas as colunas simultaneamente** (antiga e nova), mantendo a leitura na antiga.
  3. **Fase 3 (Backfill & Switch Read)**:
     - Um job em background copia e converte os dados históricos da coluna antiga para a nova.
     - Novo deploy da aplicação que passa a **ler da nova coluna** (com fallback se nulo).
  4. **Fase 4 (Contract)**:
     - Remove o código de escrita na coluna legada.
     - Executa o comando \`DROP COLUMN\` na coluna antiga com segurança total.

### Dual Coding Visual
| Fase do Processo | Estado do Banco de Dados | Comportamento da Aplicação |
|---|---|---|
| **1. Expand** | Cria nova coluna \`NULLABLE\` | Aplicação inalterada |
| **2. Dual-Write** | Ambas as colunas existem | Grava em ambas; lê da antiga |
| **3. Backfill & Read** | Dados históricos sincronizados | Grava em ambas; lê da nova |
| **4. Contract** | \`DROP COLUMN\` na coluna antiga | Grava e lê apenas da nova |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Linha do Tempo de Execução Segura
\`\`\`text
Passo 1 (DB): ALTER TABLE users ADD COLUMN phone_v2 VARCHAR(20);
Passo 2 (App Deploy): Escreve em phone E phone_v2; lê de phone.
Passo 3 (Script): Backfill assíncrono copia phone -> phone_v2 em lotes de 1.000.
Passo 4 (App Deploy): Lê de phone_v2; escreve apenas em phone_v2.
Passo 5 (DB): ALTER TABLE users DROP COLUMN phone;
\`\`\`

#### Key Takeaways
- O padrão Expand-and-Contract garante compatibilidade retroativa e futura contínua, permitindo deploys e rollbacks sem corrupção de dados ou paradas no serviço.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/deployment-strategies/BEH-SEC-DEPLOY-002.md', `---
id: BEH-SEC-DEPLOY-002
title: "Estratégia de Canary Release com Promoção e Rollback Automatizados por Métricas"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::meta
  - freq::high
---

## Pergunta
Como funciona uma estratégia de **Canary Release** com promoção e rollback automatizados baseados em métricas de observabilidade?

## Resposta
### Quick Answer
**Solução Direta**:
- **Funcionamento do Canary Release**:
  1. Roteia uma fração ínfima do tráfego real de produção (ex: 2% a 5%) para a nova versão da aplicação (*Canary*).
  2. A ferramenta de CD (ex: Argo Rollouts / Flagger) coleta métricas do Prometheus durante janelas de observação (ex: 10 minutos).
  3. **Critérios de Validação**:
     - Taxa de erros HTTP 5xx $< 0.1\%$.
     - Latência percentil p99 $< 250\text{ms}$.
  4. Se as métricas estiverem saudáveis, a ferramenta aumenta o tráfego progressivamente ($25\% \to 50\% \to 100\%$).
  5. Se qualquer métrica violar o limiar, o tráfego volta para 0% **automaticamente em segundos**.

### Dual Coding Visual
| Etapa do Canary | % de Tráfego Real | Condição para Próxima Etapa |
|---|---|---|
| **Etapa 1** | 5% por 10 minutos | Erro 5xx $< 0.1\%$ e p99 $< 200\text{ms}$ |
| **Etapa 2** | 25% por 15 minutos | Métricas estáveis no Prometheus |
| **Promoção Final** | 100% (Versão Estável) | Conclusão do rollout com sucesso |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Rollout Automatizado com Argo Rollouts
\`\`\`text
┌─────────────────────────────────┐
│ Início: Envia 5% para Canary    │
└───────────────┬─────────────────┘
                ▼
┌─────────────────────────────────┐
│ Consulta Métricas no Prometheus │ ──► Se Erro > 0.1%: Rollback Instantâneo!
└───────────────┬─────────────────┘
                ▼ (Métricas Verdes)
┌─────────────────────────────────┐
│ Promove para 25% ➔ 50% ➔ 100%   │
└─────────────────────────────────┘
\`\`\`

#### Key Takeaways
- Canary Release expõe uma porcentagem mínima de usuários a possíveis falhas de novos códigos, contendo o impacto de incidentes antes da propagação global.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/deployment-strategies/BEH-SEC-DEPLOY-003.md', `---
id: BEH-SEC-DEPLOY-003
title: "Feature Flags e Dark Launching: Desacoplando Deploy de Release"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::meta
  - freq::high
---

## Pergunta
Como o padrão de **Feature Flags / Dark Launching** desacopla o envio de código (*Deploy*) da disponibilização para os usuários (*Release*)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Desacoplamento de Deploy e Release**:
  - **Deploy (Ato Técnico)**: O código novo é compilado, testado e enviado para produção com a funcionalidade desativada por padrão.
  - **Release (Ato de Negócio)**: A ativação da funcionalidade ocorre em tempo de execução via painel de configuração (ex: LaunchDarkly / Unleash) para grupos específicos de usuários, sem necessidade de novo deploy.
- **Vantagens Operacionais**:
  - Rollback instantâneo (desligar a flag em milissegundos se houver erro).
  - Liberação gradual por público (ex: apenas funcionários internos $\to$ beta testers $\to$ 100%).

### Dual Coding Visual
| Abordagem Tradicional | Abordagem com Feature Flags | Vantagem Decisiva |
|---|---|---|
| Deploy e liberação ocorrem juntos | Código dorme desativado em produção | Zero risco no momento do deploy |
| Rollback exige novo deploy no CI/CD | Rollback via chave de flag em runtime | **Recuperação instantânea (< 1 segundo)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Avaliação Dinâmica em Go
\`\`\`go
func (s *PaymentService) Charge(ctx context.Context, order *Order) error {
  // Avalia dinamicamente se a flag está ativa para o ID do usuário
  if s.flags.IsEnabled("use_new_payment_v2", order.UserID) {
    return s.processWithNewEngine(ctx, order)
  }
  return s.processWithLegacyEngine(ctx, order)
}
\`\`\`

#### Key Takeaways
- Feature flags transformam decisões de lançamento em controles dinâmicos de runtime, mitigando riscos e capacitando times de produto a controlar experimentos de forma autônoma.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/deployment-strategies/BEH-SEC-DEPLOY-004.md', `---
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
| **Gravação** | \`INSERT ... (col_old, col_new) VALUES ($1, $1)\` | Ambas as versões recebem novos dados |
| **Leitura** | \`if col_new != nil ? col_new : col_old\` | Suporta registros antigos e novos |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Repositório em Go
\`\`\`go
type UserRepo struct {
  db *sql.DB
}

func (r *UserRepo) Save(ctx context.Context, u *User) error {
  // Dual-Write: grava em ambas as colunas
  query := \`INSERT INTO users (id, phone, mobile_contact) VALUES ($1, $2, $2)
            ON CONFLICT (id) DO UPDATE SET phone = $2, mobile_contact = $2\`
  _, err := r.db.ExecContext(ctx, query, u.ID, u.Phone)
  return err
}

func (r *UserRepo) FindByID(ctx context.Context, id string) (*User, error) {
  var u User
  var legacyPhone, newMobile sql.NullString
  query := \`SELECT id, phone, mobile_contact FROM users WHERE id = $1\`
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
\`\`\`

#### Key Takeaways
- A leitura com fallback no repositório desacopla a migração de código da execução do backfill de dados históricos no banco.

</details>
`);

// ==========================================
// 12. Testing Pyramid & Backend Quality
// ==========================================

writeAndValidateCard('decks/04-behavioral-engineering/release-security/testing-pyramid-backend/BEH-SEC-PYRAMID-000.md', `---
id: BEH-SEC-PYRAMID-000
title: "Estrutura da Pirâmide de Testes Backend: Unitários, Integração e E2E"
tags:
  - level::l3-junior
  - topic::behavioral::release-security
  - company::google
  - freq::high
---

## Pergunta
Como está estruturada a **Pirâmide de Testes Backend** e qual é a distribuição percentual recomendada entre testes unitários, de integração e End-to-End?

## Resposta
### Quick Answer
**Solução Direta**:
- **Distribuição Percentual Ideal da Pirâmide**:
  - **Base (~70% — Testes Unitários)**: Testam funções puras, regras de negócio e lógica de domínio isoladas em memória. Executam em milissegundos e fornecem feedback instantâneo.
  - **Meio (~20% — Testes de Integração)**: Validam a integração real com containers efêmeros de banco de dados (PostgreSQL), caches (Redis) e mensageria (Kafka) via Testcontainers.
  - **Topo (~10% — Testes End-to-End / E2E)**: Validam fluxos completos de ponta a ponta na malha de microsserviços. Mais lentos e custosos de manter.

### Dual Coding Visual
| Nível da Pirâmide | Proporção & Velocidade | Escopo de Validação |
|---|---|---|
| **Testes Unitários** | ~70% ($\approx 1\text{ms}$) | Lógica de negócio isolada |
| **Testes de Integração** | ~20% ($\approx 500\text{ms}$) | I/O com banco de dados real |
| **Testes E2E** | ~10% ($\approx 5\text{s}$ a $30\text{s}$) | Jornada de ponta a ponta |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### A Pirâmide Visual de Testes
\`\`\`text
           /\
          /  \     Testes E2E (~10%) -> Alto Custo / Execução Lenta
         /────\
        /      \   Testes de Integração (~20%) -> Testcontainers / Banco Real
       /────────\
      /          \ Testes Unitários (~70%) -> Baixo Custo / Feedback Instantâneo
     /────────────\
\`\`\`

#### Key Takeaways
- Inverter a pirâmide criando muitos testes E2E gera suítes lentas e frágeis (*flaky tests*). O equilíbrio ideal concentra a maior parte da validação na base unitária e de integração.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/testing-pyramid-backend/BEH-SEC-PYRAMID-001.md', `---
id: BEH-SEC-PYRAMID-001
title: "Princípios de Consumer-Driven Contract Testing (Pact) vs Esquemas Estáticos"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::netflix
  - freq::high
---

## Pergunta
O que é a filosofia de **Consumer-Driven Contract Testing (Pact)** e em que ela difere da validação estática de esquemas OpenAPI / JSON Schema?

## Resposta
### Quick Answer
**Solução Direta**:
- **Filosofia Consumer-Driven**:
  - Em vez de o fornecedor (Provider) apenas publicar um catálogo estático amplo, cada serviço cliente (Consumer) declara formalmente **quais campos, formatos e respostas ele realmente usa e depende**.
  - Essas expectativas geram um arquivo de contrato (\`pact.json\`) executável.
- **Diferença para OpenAPI / JSON Schema Estático**:
  - Esquemas estáticos validam apenas tipos de dados teóricos.
  - Contract Testing com Pact valida **comportamento dinâmico real**: se o Provider alterar o nome de um campo usado pelo Consumer, o teste do Provider falha imediatamente no CI antes do deploy.

### Dual Coding Visual
| Abordagem | O que Valida | Ponto Fraco |
|---|---|---|
| **OpenAPI / JSON Schema** | Estrutura sintática de campos | Não sabe quais campos os clientes usam de fato |
| **Consumer-Driven (Pact)** | Dependência e comportamento real de uso | Exige integração contínua com o Pact Broker |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Vantagem do Consumer-Driven
\`\`\`text
Cenário: Provider deseja remover o campo legado "telefone".
├── Com OpenAPI: Não sabe se algum dos 15 clientes ainda usa o campo.
└── Com Pact: Consulta a matriz do Pact Broker; se nenhum contrato usar "telefone",
    a remoção é segura; se algum usar, o build falha alertando o time.
\`\`\`

#### Key Takeaways
- Consumer-Driven Contract Testing permite evolução independente de microsserviços com a segurança de testes integrados e a velocidade de testes locais.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/testing-pyramid-backend/BEH-SEC-PYRAMID-002.md', `---
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
  - Escondem diferenças críticas de produção: dialetos SQL específicos, funções JSONB, concorrência real (\`SELECT FOR UPDATE\`), extensões e comportamento de índices do PostgreSQL/MySQL.
- **Vantagens do Testcontainers**:
  - Inicializa uma instância Docker real e efêmera do mesmo banco de dados (ex: \`postgres:16-alpine\`) durante os testes no CI.
  - Garante **100% de paridade** com o ambiente de produção, executando migrations reais e destruindo o container automaticamente ao final da suíte.

### Dual Coding Visual
| Abordagem de Teste | Paridade com Produção | Risco de Bug Silencioso |
|---|---|---|
| **Mocks / Banco em Memória (H2)** | Baixa (dialetos e locks diferentes) | Alto (falha apenas em produção) |
| **Testcontainers (Docker Real)** | **Máxima (100% idêntico a produção)** | **Mínimo (validação real de queries)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Java com JUnit 5 e Testcontainers
\`\`\`java
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
\`\`\`

#### Key Takeaways
- Testcontainers viabiliza testes de integração determinísticos e confiáveis, eliminando surpresas causadas por divergências entre bancos de teste e produção.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/testing-pyramid-backend/BEH-SEC-PYRAMID-003.md', `---
id: BEH-SEC-PYRAMID-003
title: "Fluxo de Verificação de Contratos entre Consumer e Provider com Pact Broker"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::netflix
  - freq::high
---

## Pergunta
Como funciona o fluxo de verificação de contratos entre pipelines CI/CD do Consumidor e do Provedor via **Pact Broker**?

## Resposta
### Quick Answer
**Solução Direta**:
- **Fluxo em 3 Etapas**:
  1. **Consumer Pipeline**: O consumidor executa seus testes unitários contra o Mock Server do Pact. Ao passar, gera o arquivo \`pact.json\` e o publica no **Pact Broker**.
  2. **Webhook & Provider Verification**: O Pact Broker aciona a esteira do Provider via webhook. O Provider baixa os contratos e dispara requisições reais contra sua própria aplicação.
  3. **Publicação dos Resultados**: O Provider publica os resultados da validação de volta no Pact Broker, atualizando a matriz de compatibilidade de versões.

### Dual Coding Visual
| Etapa | Responsável | Ação Executada |
|---|---|---|
| **1. Publicação** | Pipeline do Consumidor | Envia contrato JSON para o Pact Broker |
| **2. Verificação** | Pipeline do Provedor | Valida endpoints reais contra o contrato |
| **3. Matriz** | Pact Broker | Registra se as versões são compatíveis |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Arquitetura de Comunicação no CI/CD
\`\`\`text
[Pipeline Consumer] ──(1. Publica Contrato)──► [Pact Broker]
                                                     ▲
[Pipeline Provider] ──(2. Executa Verificação)───────┘
         │
         └──► (3. Publica Resultado: Aprovado ✅ / Quebrado ❌)
\`\`\`

#### Key Takeaways
- O Pact Broker atua como o registro central e orquestrador de compatibilidade de APIs entre times autônomos de microsserviços.

</details>
`);

writeAndValidateCard('decks/04-behavioral-engineering/release-security/testing-pyramid-backend/BEH-SEC-PYRAMID-004.md', `---
id: BEH-SEC-PYRAMID-004
title: "O Comando can-i-deploy do Pact Broker como Quality Gate de CI/CD"
tags:
  - level::l4-pleno
  - topic::behavioral::release-security
  - company::netflix
  - freq::high
---

## Pergunta
Como o comando **\`can-i-deploy\`** do Pact Broker atua como portão de qualidade (*Quality Gate*) automatizado na esteira de CI/CD para impedir quebras de API em produção?

## Resposta
### Quick Answer
**Solução Direta**:
- **Funcionamento do \`can-i-deploy\`**:
  - Antes de promover qualquer nova versão para o ambiente de produção, a esteira de CI/CD executa a CLI do Pact:
    \`pact-broker can-i-deploy --pacticipant OrderService --version 2.4.0 --to-environment production\`
  - A ferramenta consulta a matriz de compatibilidade do Pact Broker.
  - **Decisão do Gate**:
    - Se todos os contratos com consumidores ativos em produção estiverem verificados com sucesso: **Deploy Aprovado ✅**.
    - Se houver qualquer contrato incompatível ou não verificado: **Deploy Bloqueado com Código de Saída 1 ❌**.

### Dual Coding Visual
| Resultado da Matriz | Ação do \`can-i-deploy\` | Efeito na Esteira de CI/CD |
|---|---|---|
| **Compatível com 100% dos Clientes** | Retorna código \`0\` | Pipeline prossegue com o deploy |
| **Quebra contrato de cliente ativo** | Retorna código \`1\` | Pipeline aborta e impede outage |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo em Step de CI/CD (GitHub Actions)
\`\`\`yaml
- name: Check Contract Compatibility
  run: |
    pact-broker can-i-deploy \
      --broker-base-url https://pact.empresa.com \
      --broker-token \${{ secrets.PACT_BROKER_TOKEN }} \
      --pacticipant PaymentService \
      --version \${{ github.sha }} \
      --to-environment production
\`\`\`

#### Key Takeaways
- O comando \`can-i-deploy\` é o guardrail definitivo para garantir que nenhuma alteração incompatível de API seja lançada em produção.

</details>
`);

console.log('✅ Release, Security & Testing Pyramid concluído com sucesso!');
