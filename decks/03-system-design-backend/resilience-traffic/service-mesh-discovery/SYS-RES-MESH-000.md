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
| Plano do Service Mesh | Componente Típico | Responsabilidade Primária |
|---|---|---|
| **Data Plane** | Envoy Proxy (Sidecar) | Encaminha bytes de rede, aplica mTLS e métricas |
| **Control Plane** | Istiod | Gerencia políticas, certificados PKI e rotas |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Transparência para a Aplicação
- O desenvolvedor programa sua aplicação como se estivesse chamando `http://payment-service`. O Envoy local intercepta a chamada, criptografa com mTLS, seleciona a réplica saudável via Service Discovery e transmite com resiliência.

</details>
