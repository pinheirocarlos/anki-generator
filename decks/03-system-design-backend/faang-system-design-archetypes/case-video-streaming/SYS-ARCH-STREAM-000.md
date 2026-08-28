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
<svg viewBox="0 0 680 240" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="240" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Pipeline de Ingestão e Transcodificação de Vídeo (YouTube / Netflix)</text>
  <g transform="translate(30, 50)">
    <!-- Source Upload -->
    <rect x="0" y="20" width="120" height="85" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="60" y="42" fill="#38bdf8" font-size="10" font-weight="bold" text-anchor="middle">Upload 4K Bruto</text>
    <text x="60" y="62" fill="#cbd5e1" font-size="9" text-anchor="middle">S3 Temp Bucket</text>
    <text x="60" y="80" fill="#86efac" font-size="9" text-anchor="middle">Multipart Upload</text>

    <!-- Chunking DAG -->
    <rect x="150" y="20" width="130" height="85" rx="6" fill="#78350f" stroke="#f59e0b" stroke-width="1.5"/>
    <text x="215" y="42" fill="#fbbf24" font-size="10" font-weight="bold" text-anchor="middle">Chunking Engine</text>
    <text x="215" y="62" fill="#fde68a" font-size="9" text-anchor="middle">GOP Alignment</text>
    <text x="215" y="80" fill="#cbd5e1" font-size="9" text-anchor="middle">Chunks de 4 a 10s</text>

    <!-- Parallel Transcoding Workers -->
    <rect x="310" y="0" width="160" height="125" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="390" y="22" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Transcoding DAG</text>
    <rect x="325" y="32" width="130" height="22" rx="3" fill="#065f46"/>
    <text x="390" y="47" fill="#ffffff" font-size="8" text-anchor="middle">1080p H.264 / AV1</text>
    <rect x="325" y="58" width="130" height="22" rx="3" fill="#065f46"/>
    <text x="390" y="73" fill="#ffffff" font-size="8" text-anchor="middle">720p H.264 / VP9</text>
    <rect x="325" y="84" width="130" height="22" rx="3" fill="#065f46"/>
    <text x="390" y="99" fill="#ffffff" font-size="8" text-anchor="middle">480p / 360p Mobile</text>

    <!-- CDN & Manifest -->
    <rect x="495" y="20" width="130" height="85" rx="6" fill="#1e293b" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="560" y="42" fill="#c084fc" font-size="10" font-weight="bold" text-anchor="middle">CDN Edge &amp; HLS</text>
    <text x="560" y="62" fill="#e9d5ff" font-size="9" text-anchor="middle">master.m3u8</text>
    <text x="560" y="80" fill="#a7f3d0" font-size="9" text-anchor="middle">Edge Cache 95% Hit</text>
  </g>
  <text x="340" y="215" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Transcodificação paralela particionada por chunks reduz o tempo de processamento de horas para minutos.</text>

</svg>

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
