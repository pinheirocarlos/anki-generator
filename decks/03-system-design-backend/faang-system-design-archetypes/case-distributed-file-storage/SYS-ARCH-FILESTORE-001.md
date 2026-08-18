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
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/content-addressable-storage-deduplication-conflict-loop.webm">
    <p>Visualização: Armazenamento endereçável por conteúdo (CAS) deduplicando blocos idênticos entre contas e bifurcando versões em conflito.</p>
  </video>
</div>

| Cenário de Sincronização | Ação do Sistema | Resultado de Storage |
|---|---|---|
| **Chunk já existente no cluster** | Cria ponteiro de metadados | Upload instantâneo e zero custo de storage |
| **Conflito de versão concorrente** | Cria bifurcação (*Conflicted Copy*) | Zero perda de dados para ambos os autores |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Arquitetura de Notificação em Tempo Real
- O servidor de sincronização utiliza conexões persistentes **Server-Sent Events (SSE) ou WebSockets** para notificar outros dispositivos de um usuário assim que uma alteração é commitada, disparando o download do novo chunk em background.

</details>
