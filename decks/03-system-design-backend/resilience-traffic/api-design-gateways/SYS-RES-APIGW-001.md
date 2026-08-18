---
id: SYS-RES-APIGW-001
title: "gRPC sobre HTTP/2 com Protocol Buffers vs REST com JSON"
tags:
  - level::l4-pleno
  - topic::sys::resilience
  - company::google
  - freq::high
---

## Pergunta
Por que o gRPC com Protocol Buffers (Protobuf) é significativamente mais rápido e eficiente que REST sobre JSON para comunicação interna entre microsserviços?

## Resposta
### Quick Answer
**Solução Direta**:
- **Formato Binário Compacto (Protobuf)**:
  - JSON é textual e verboso (repete os nomes dos campos em toda mensagem).
  - Protobuf serializa dados em formato binário comprimido com tags numéricas, reduzindo o tamanho do payload em até **$70-80\%$** e acelerando a serialização/deserialização em até **$10x$ na CPU**.
- **Transporte HTTP/2**:
  - Suporta **Multiplexação Verdadeira** (centenas de requisições simultâneas na mesma conexão TCP sem *Head-of-Line Blocking* no protocolo).
  - Suporta compressão de cabeçalhos (HPACK) e streaming bidirecional nativo em tempo real.
- **Contrato Tipado Estrito**: Esquemas `.proto` com geração automática de código em múltiplas linguagens.

### Dual Coding Visual
| Dimensão | REST / JSON | gRPC / Protocol Buffers |
|---|---|---|
| **Protocolo de Rede** | HTTP/1.1 (predominante) | HTTP/2 (Multiplexação nativa) |
| **Formato de Payload** | Texto (JSON legível) | Binário compactado (Protobuf) |
| **Velocidade na CPU** | Lenta (Parsing de strings JSON) | Ultra-rápida (Offsets de bytes binários) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Definição Protobuf
```text
syntax = "proto3";

message UserProfileRequest {
  int64 user_id = 1;
}

message UserProfileResponse {
  int64 user_id = 1;
  string name = 2;
  string email = 3;
}

service UserService {
  rpc GetProfile (UserProfileRequest) returns (UserProfileResponse);
}
```

</details>
