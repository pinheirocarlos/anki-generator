---
id: SYS-ARCH-STREAM-000
title: "Pipeline de Ingestão e Transcodificação de Vídeo (Chunking e DAG Workers)"
tags:
  - level::l3-junior
  - topic::sys::archetypes
  - company::netflix
  - freq::high
---

## Pergunta
Como funciona a esteira assíncrona de ingestão, particionamento (Chunking) e transcodificação de vídeos distribuída via DAG Workers?

## Resposta
### Quick Answer
**Solução Direta**:
- **Pipeline de Vídeo em 4 Etapas**:
  1. **Upload Direto para Object Storage (S3 / GCS)**: O cliente solicita uma *Pre-Signed URL* e faz upload direto do arquivo bruto (*Raw Video*), liberando os servidores web de I/O pesado.
  2. **Validação e Extração de Metadados**: Um worker valida formato, codec, resolução e duração.
  3. **Particionamento (Chunking em Fragmentos de 2 a 10 segundos)**: O vídeo bruto é fatiado em pequenos blocos independentes (chunks).
  4. **Transcodificação Paralela em DAG**: Múltiplos workers em GPU processam os chunks em paralelo para dezenas de combinações de codecs (H.264, H.265/HEVC, AV1) e resoluções (360p a 4K).

### Dual Coding Visual
<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://assets.faang-anki.dev/media/system-design/video-ingestion-chunking-transcoding-dag-loop.webm">
    <p>Visualização: Upload de vídeo particionado em chunks com workers paralelos transcodificando múltiplos codecs e resoluções.</p>
  </video>
</div>

| Etapa do Pipeline | Componente Responsável | Objetivo |
|---|---|---|
| **1. Upload** | Pre-Signed S3 / Cloudflare R2 | Upload direto do cliente sem sobrecarregar API |
| **2. Chunking** | FFmpeg Worker | Divide vídeo em segmentos de 2-6 segundos |
| **3. Encoding** | GPU Worker Pool (DAG) | Renderiza resoluções e codecs em paralelo |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Por que o Chunking Acelera o Processamento
- Um vídeo de 2 horas levaria 40 minutos para ser transcodificado em uma única máquina. Ao dividir em 1.200 chunks de 6 segundos, um pool de 100 instâncias transcodifica todos os blocos simultaneamente em menos de 1 minuto.

</details>
