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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">gRPC (HTTP/2 + Protocol Buffers) vs REST (HTTP/1.1 + JSON)</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="140" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">REST / JSON (Público / Edge)</text>
    <text x="140" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Payload textual legível por humanos</text>
    <text x="140" y="65" fill="#fca5a5" font-size="10" text-anchor="middle">Overhead de parsing e headers repetidos</text>
    <text x="140" y="88" fill="#86efac" font-size="10" text-anchor="middle">Ideal para APIs públicas de terceiros</text>

    <rect x="320" y="0" width="280" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="460" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">gRPC / Protobuf (Inter-Serviços)</text>
    <text x="460" y="45" fill="#cbd5e1" font-size="10" text-anchor="middle">Serialização binária compacta (7x menor)</text>
    <text x="460" y="65" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">HTTP/2 Multiplexing + Streaming Duplex</text>
    <text x="460" y="88" fill="#34d399" font-size="10" text-anchor="middle">Contratos estritos tipados (.proto)</text>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Comunicação leste-oeste (Leste-Oeste entre microsserviços) deve padronizar em gRPC para máxima eficiência de CPU.</text>

</svg>
<p>Visualização: Serialização binária compacta em Protobuf sobre HTTP/2 eliminando overhead textual de JSON e headers repetitivos.</p>

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
