---
id: SYS-ARCH-STREAM-001
title: "Streaming Adaptativo de Vídeo: Protocolos HLS / MPEG-DASH e Distribuição por Edge CDN"
tags:
  - level::l4-pleno
  - topic::sys::archetypes
  - company::youtube
  - freq::high
---

## Pergunta
Como os protocolos de streaming adaptativo HLS e MPEG-DASH alternam dinamicamente a qualidade do vídeo baseando-se na largura de banda da rede do cliente?

## Resposta
### Quick Answer
**Solução Direta**:
- **Adaptive Bitrate Streaming (ABR)**:
  - O vídeo transcodificado é acompanhado por um arquivo de manifesto (`.m3u8` no HLS ou `.mpd` no DASH) que lista todos os fluxos de bitrate disponíveis (ex: 500 kbps para 360p, 5 Mbps para 1080p, 20 Mbps para 4K) e os links dos chunks de cada resolução.
  - O player de vídeo no cliente monitora a velocidade de download e o buffer local a cada chunk recebido (a cada 2-6s).
  - Se a rede do usuário oscilar (ex: sinal 4G degradando), o player solicita o próximo chunk em resolução mais baixa (360p) de forma **imperceptível e sem travar a reprodução** (*Zero Buffering*).
- **Edge CDN Caching**: Como os chunks são arquivos estáticos imutáveis (`.ts` ou `.m4s`), a CDN atinge $>99\%$ de Cache Hit na borda.

### Dual Coding Visual
| Estrutura de Arquivos | Formato / Extensão | Papel no Player |
|---|---|---|
| **Manifesto Mestre** | `master.m3u8` | Lista resoluções e bitrates disponíveis |
| **Manifesto de Variante** | `1080p.m3u8` | Lista URLs dos chunks sequenciais de 1080p |
| **Segmento de Mídia** | `segment_001.ts` (2s a 6s) | Bloco de vídeo estático servido pela CDN |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Exemplo de Manifesto HLS (`master.m3u8`)
```text
#EXTM3U
#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360
360p/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720
720p/index.m3u8
#EXT-X-STREAM-INF:BANDWIDTH=6000000,RESOLUTION=1920x1080
1080p/index.m3u8
```

</details>
