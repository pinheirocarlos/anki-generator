---
id: SYS-RES-MESH-000
title: "Service Mesh: Arquitetura Control Plane (Istio) vs Data Plane (Envoy Sidecar)"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::lyft
  - freq::high
---

## Pergunta
Como a arquitetura de Service Mesh divide responsabilidades entre o Data Plane (proxies Envoy Sidecar) e o Control Plane (Istiod)?

## Resposta
### Quick Answer
**Solução Direta**:
- **Data Plane (Envoy Sidecar)**:
  - Um proxy reverso leve roda como processo adjacente (*Sidecar*) ao lado de cada contêiner de aplicação dentro do mesmo Pod Kubernetes.
  - Intercepta **100% do tráfego de entrada e saída (Inbound/Outbound)**, aplicando mTLS transparente, circuit breaking, retries, rate limiting e coleta de telemetria sem exigir alteração no código da aplicação.
- **Control Plane (Istiod)**:
  - Servidor central que traduz configurações declarativas de alto nível (ex: regras de roteamento de tráfego, canary releases) e as distribui dinamicamente para os proxies Envoy via APIs xDS.

### Dual Coding Visual
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Service Mesh (Istio &amp; Envoy Sidecar): Tráfego Leste-Oeste</text>
  <g transform="translate(40, 50)">
    <!-- Pod A -->
    <rect x="0" y="0" width="260" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="130" y="24" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Kubernetes Pod A</text>
    <rect x="15" y="40" width="105" height="65" rx="4" fill="#0284c7"/>
    <text x="67" y="68" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">App Service A</text>
    <rect x="135" y="40" width="110" height="65" rx="4" fill="#78350f"/>
    <text x="190" y="68" fill="#fde68a" font-size="9" font-weight="bold" text-anchor="middle">Envoy Proxy</text>

    <!-- Pod B -->
    <rect x="340" y="0" width="260" height="120" rx="8" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="470" y="24" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Kubernetes Pod B</text>
    <rect x="355" y="40" width="110" height="65" rx="4" fill="#78350f"/>
    <text x="410" y="68" fill="#fde68a" font-size="9" font-weight="bold" text-anchor="middle">Envoy Proxy</text>
    <rect x="480" y="40" width="105" height="65" rx="4" fill="#065f46"/>
    <text x="532" y="68" fill="#ffffff" font-size="9" font-weight="bold" text-anchor="middle">App Service B</text>

    <!-- Envoy to Envoy mTLS -->
    <line x1="245" y1="72" x2="355" y2="72" stroke="#10b981" stroke-width="2"/>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Envoy Sidecar intercepta todo tráfego via iptables: injeta Circuit Breaking, Retries, Métricas e mTLS de forma transparente.</text>

</svg>

| Plano do Service Mesh | Componente Típico | Responsabilidade Primária |
|---|---|---|
| **Data Plane** | Envoy Proxy (Sidecar) | Encaminha bytes de rede, aplica mTLS e métricas |
| **Control Plane** | Istiod | Gerencia políticas, certificados PKI e rotas |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Transparência para a Aplicação
- O desenvolvedor programa sua aplicação como se estivesse chamando `http://payment-service`. O Envoy local intercepta a chamada, criptografa com mTLS, seleciona a réplica saudável via Service Discovery e transmite com resiliência.

</details>
