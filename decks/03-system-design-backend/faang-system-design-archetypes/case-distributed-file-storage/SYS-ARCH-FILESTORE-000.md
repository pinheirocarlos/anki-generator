---
id: SYS-ARCH-FILESTORE-000
title: "Armazenamento de Arquivos Distribuído (Google Drive / Dropbox): Chunking e Sincronização Delta"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::dropbox
  - freq::high
---

## Pergunta
Como a divisão de arquivos em blocos (Chunking de 4 MB) e a Sincronização Delta (Delta Sync) minimizam o tráfego de rede ao salvar arquivos?

## Resposta
### Quick Answer
**Solução Direta**:
- **Chunking (Fatiamento de 4 MB)**:
  - O cliente desktop divide arquivos grandes em blocos de tamanho fixo ou variável (ex: **4 MB** por chunk).
  - Cada chunk recebe um hash SHA-256 criptográfico exclusivo como seu identificador de conteúdo (*Content-Addressable Storage - CAS*).
- **Delta Sync (Sincronização Diferencial)**:
  - Quando o usuário modifica apenas 1 parágrafo de um documento de 500 MB, **apenas o chunk de 4 MB afetado é recomputado e transmitido pela rede**.
  - Os outros 124 chunks inalterados permanecem intactos no servidor, reduzindo o uso de largura de banda e tempo de upload em mais de $99\%$.

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/google-drive-chunking-delta-sync-pipeline-loop.webm">
    <p>Visualização: Divisão de arquivos em blocos de 4MB com hash SHA-256 e sincronização delta transmitindo apenas blocos modificados.</p>
  </video>
</div>

| Estratégia de Upload | Upload ao Modificar 1 Linha em 100 MB | Consumo de Rede e Tempo |
|---|---|---|
| **Upload do Arquivo Inteiro** | Reenvia todos os 100 MB | Lento e consome muita banda móvel |
| **Delta Sync com Chunking** | **Reenvia apenas 1 chunk de 4 MB** | **Instantâneo ($96\%$ de economia de dados)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Rolling Hash (Rabin Fingerprint) para Chunks de Tamanho Variável
- Chunks de tamanho fixo sofrem de *Shift Problems* (inserir 1 byte no início do arquivo altera o hash de todos os blocos subsequentes). O algoritmo de **Rolling Hash** define limites de chunks baseando-se no conteúdo (quando os últimos bits do hash batem com um padrão), isolando a alteração a um único bloco.

</details>
