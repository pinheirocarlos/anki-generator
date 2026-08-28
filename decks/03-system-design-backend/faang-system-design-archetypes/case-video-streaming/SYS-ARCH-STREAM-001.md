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
<svg viewBox="0 0 680 220" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="220" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Adaptive Bitrate Streaming (HLS / MPEG-DASH) &amp; Troca Dinâmica de Perfil</text>
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="600" height="110" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="300" y="22" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Player ajusta qualidade a cada chunk de 6s baseado na vazão da rede e buffer</text>

    <g transform="translate(20, 38)">
      <rect x="0" y="0" width="170" height="55" rx="4" fill="#065f46"/>
      <text x="85" y="22" fill="#86efac" font-size="10" font-weight="bold" text-anchor="middle">Banda Alta (&gt; 15 Mbps)</text>
      <text x="85" y="40" fill="#ffffff" font-size="9" text-anchor="middle">Pede chunks em 1080p / 4K</text>

      <rect x="195" y="0" width="170" height="55" rx="4" fill="#78350f"/>
      <text x="280" y="22" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Oscilação (3G / Instável)</text>
      <text x="280" y="40" fill="#ffffff" font-size="9" text-anchor="middle">Troca transparente para 720p/480p</text>

      <rect x="390" y="0" width="170" height="55" rx="4" fill="#0369a1"/>
      <text x="475" y="22" fill="#bae6fd" font-size="10" font-weight="bold" text-anchor="middle">Zero Buffering</text>
      <text x="475" y="40" fill="#ffffff" font-size="9" text-anchor="middle">Playback 100% contínuo</text>
    </g>
  </g>
  <text x="340" y="195" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Arquivos de manifesto (.m3u8) apontam para URIs de chunks segmentados servidos diretamente da CDN.</text>

</svg>

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
