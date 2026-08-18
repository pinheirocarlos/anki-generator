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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/zero-trust-mutual-tls-mtls-handshake-loop.webm">
    <p>Visualização: Criptografia mTLS de ponta a ponta com certificados X.509 validados bilateralmente entre microsserviços.</p>
  </video>
</div>

| Tipo de TLS | Quem Apresenta Certificado | Nível de Segurança |
|---|---|---|
| **TLS Convencional** | Apenas o Servidor | Cliente sabe com quem fala; servidor não valida cliente |
| **Mutual TLS (mTLS)** | **Ambos (Cliente e Servidor)** | **Autenticação forte bidirecional e canal 100% cifrado** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Rotação Automática de Certificados
- No Istio/Envoy, certificados de curta duração (ex: 24 horas) são emitidos e rotacionados automaticamente na memória dos sidecars sem interrupção de conexões ou intervenção humana.

</details>
