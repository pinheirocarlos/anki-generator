---
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
  - Ocorre quando um serviço backend recebe uma URL fornecida pelo usuário e busca seu conteúdo sem validação, permitindo que atacantes alcancem serviços internos da rede privada ou endpoints de metadados da nuvem (ex: `http://169.254.169.254/latest/meta-data/` para roubar credenciais IAM da AWS).
- **Mecanismos de Mitigação**:
  1. **Lista Restrita de Domínios Permitidos (*Allowlist*)**: Permitir apenas conexões a domínios explicitamente confiáveis.
  2. **Bloqueio de Faixas IP Privadas e Link-Local**: Bloquear estritamente acessos a `127.0.0.1`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` e `169.254.169.254`.
  3. **Validação Após Resolução DNS**: Resolver o IP do hostname antes de disparar a requisição para evitar ataques de DNS Rebinding.

### Dual Coding Visual
| Alvo do Ataque SSRF | Risco de Segurança | Mecanismo de Defesa |
|---|---|---|
| **Metadados da Nuvem (169.254.169.254)** | Roubo de chaves IAM e takeover da conta | Bloqueio via firewall e IMDSv2 com token |
| **Bancos / Redis Internos** | Acesso direto a dados confidenciais | Bloqueio de sub-redes privadas na aplicação |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Validação Segura de URL contra SSRF em Go
```go
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
```

#### Key Takeaways
- Bloquear requisições a IPs privados e impor metadados da nuvem com token de sessão (IMDSv2) elimina os vetores mais devastadores de exploração SSRF.

</details>
