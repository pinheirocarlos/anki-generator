---
id: SYS-RES-MESH-001
title: "Segurança Zero Trust com Mutual TLS (mTLS) Automático entre Microsserviços"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::google
  - freq::high
---

## Pergunta
Como o Mutual TLS (mTLS) garante autenticação criptográfica bidirecional e autorização de tráfego em arquiteturas Zero Trust?

## Resposta
### Quick Answer
**Solução Direta**:
- **TLS Padrão (Unidirecional)**: Apenas o cliente autentica a identidade do servidor (ex: browser validando o certificado HTTPS do banco).
- **Mutual TLS (mTLS - Bidirecional)**:
  - Tanto o cliente quanto o servidor apresentam certificados X.509 válidos assinados pela mesma autoridade certificadora interna (CA).
  - Ambos validam criptograficamente a identidade mútua antes de trafegar qualquer dado.
- **Zero Trust**:
  1. Elimina a premissa de que a rede interna do cluster é confiável.
  2. Garante **Criptografia em Trânsito** contra interceptação de pacotes (*Sniffing*).
  3. Viabiliza **Políticas de Autorização Estritas baseadas em Identidade** (ex: o serviço `Cart` só pode se comunicar com `Inventory` se apresentar certificado legítimo emitido para sua Service Account).

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Autenticação Zero Trust com Mutual TLS (mTLS) e Certificados SPIFFE / X.509</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Handshake mTLS Bilateral: Criptografia e Identidade Criptográfica</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="260" height="55" rx="4" fill="#0369a1"/>
      <text x="130" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">1. Client Valida Cert do Servidor</text>
      <text x="130" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Garante autenticidade do host</text>

      <rect x="300" y="0" width="260" height="55" rx="4" fill="#065f46"/>
      <text x="430" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">2. Servidor Valida Cert do Client</text>
      <text x="430" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">SPIFFE ID: spiffe://cluster/ns/prod/sa/order</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Zero Trust: nenhum pacote trafega sem criptografia e validação criptográfica mútua, mesmo dentro da rede interna.</text>

</svg>
<p>Visualização: Criptografia mTLS de ponta a ponta com certificados X.509 validados bilateralmente entre microsserviços.</p>

| Tipo de TLS | Quem Apresenta Certificado | Nível de Segurança |
|---|---|---|
| **TLS Convencional** | Apenas o Servidor | Cliente sabe com quem fala; servidor não valida cliente |
| **Mutual TLS (mTLS)** | **Ambos (Cliente e Servidor)** | **Autenticação forte bidirecional e canal 100% cifrado** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Rotação Automática de Certificados
- No Istio/Envoy, certificados de curta duração (ex: 24 horas) são emitidos e rotacionados automaticamente na memória dos sidecars sem interrupção de conexões ou intervenção humana.

</details>
