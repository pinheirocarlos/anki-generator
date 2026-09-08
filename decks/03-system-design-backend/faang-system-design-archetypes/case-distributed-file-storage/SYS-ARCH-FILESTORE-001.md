---
id: SYS-ARCH-FILESTORE-001
title: "Deduplicação Global de Blocos (CAS) e Resolução de Conflitos de Sincronização"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Como o Content-Addressable Storage (CAS) permite Deduplicação Global entre milhões de usuários e como conflitos de edição simultânea são resolvidos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Deduplicação Global (Cross-User Deduplication)**:
  - No CAS, o endereço de armazenamento do bloco é o seu próprio hash SHA-256 (`s3://bucket/chunks/{sha256_hash}`).
  - Antes de fazer upload de um chunk, o cliente envia seu hash para o servidor. Se o bloco já existir no cluster (mesmo que enviado por outro usuário), o servidor apenas cria um ponteiro de metadados (**Upload Instantâneo com Zero Bytes de I/O**).
- **Resolução de Conflitos Concorrentes**:
  - Quando dois dispositivos modificam o mesmo arquivo simultaneamente offline, o primeiro commit que chega ao servidor vence e avança o número de versão.
  - O segundo commit tem o conflito detectado e o sistema cria automaticamente uma cópia bifurcada (*Conflicted Copy*, ex: `doc (Alice's conflicted copy 2026-08-18).pdf`).

### Dual Coding Visual
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Content-Addressable Storage (CAS) &amp; Deduplicação Global de Blocos</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="1.5"/>
    <text x="300" y="22" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">S3 Object Storage armazena blocos indexados pelo Hash SHA-256</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="260" height="55" rx="4" fill="#0369a1"/>
      <text x="130" y="22" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">10.000 Usuários com Ubuntu ISO</text>
      <text x="130" y="40" fill="#bae6fd" font-size="9" text-anchor="middle">Metadados: 10.000 ponteiros para o mesmo hash</text>

      <rect x="300" y="0" width="260" height="55" rx="4" fill="#065f46"/>
      <text x="430" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">S3 Armazena Apenas 1 Cópia Física</text>
      <text x="430" y="40" fill="#a7f3d0" font-size="9" text-anchor="middle">Economia massiva de Petabytes de Storage</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Resolução de conflito: se dois clientes salvam versões conflitantes simultaneamente, cria-se 'Arquivo (Cópia em Conflito)'.</text>

</svg>
<p>Visualização: Armazenamento endereçável por conteúdo (CAS) deduplicando blocos idênticos entre contas e bifurcando versões em conflito.</p>

| Cenário de Sincronização | Ação do Sistema | Resultado de Storage |
|---|---|---|
| **Chunk já existente no cluster** | Cria ponteiro de metadados | Upload instantâneo e zero custo de storage |
| **Conflito de versão concorrente** | Cria bifurcação (*Conflicted Copy*) | Zero perda de dados para ambos os autores |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Arquitetura de Notificação em Tempo Real
- O servidor de sincronização utiliza conexões persistentes **Server-Sent Events (SSE) ou WebSockets** para notificar outros dispositivos de um usuário assim que uma alteração é commitada, disparando o download do novo chunk em background.

</details>
