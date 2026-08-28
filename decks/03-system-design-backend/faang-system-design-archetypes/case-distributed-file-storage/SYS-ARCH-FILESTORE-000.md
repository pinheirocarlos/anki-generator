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
<svg viewBox="0 0 680 230" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="230" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Google Drive / Dropbox: Chunking de 4MB &amp; Sincronização Delta</text>
  <g transform="translate(40, 50)">
    <!-- File -->
    <rect x="0" y="20" width="130" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="65" y="45" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Arquivo (16MB)</text>
    <text x="65" y="70" fill="#cbd5e1" font-size="9" text-anchor="middle">4 Chunks de 4MB</text>

    <!-- Chunks with SHA-256 -->
    <g transform="translate(160, 0)">
      <rect x="0" y="0" width="180" height="28" rx="4" fill="#0284c7"/>
      <text x="90" y="18" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">Chunk 1: SHA-256(a1...)</text>

      <rect x="0" y="32" width="180" height="28" rx="4" fill="#0284c7"/>
      <text x="90" y="50" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">Chunk 2: SHA-256(b2...)</text>

      <rect x="0" y="64" width="180" height="28" rx="4" fill="#065f46" stroke="#10b981" stroke-width="1.5"/>
      <text x="90" y="82" fill="#86efac" font-size="9" font-family="monospace" font-weight="bold" text-anchor="middle">Chunk 3: MODIFICADO (c3*)</text>

      <rect x="0" y="96" width="180" height="28" rx="4" fill="#0284c7"/>
      <text x="90" y="114" fill="#ffffff" font-size="9" font-family="monospace" text-anchor="middle">Chunk 4: SHA-256(d4...)</text>
    </g>

    <!-- Cloud Sync -->
    <rect x="380" y="20" width="220" height="80" rx="6" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
    <text x="490" y="45" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Sincronização Delta</text>
    <text x="490" y="68" fill="#86efac" font-size="10" text-anchor="middle">Upload APENAS do Chunk 3 (4MB)</text>
    <text x="490" y="88" fill="#a7f3d0" font-size="9" text-anchor="middle">Economia de 75% de banda e tempo</text>
  </g>
  <text x="340" y="200" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">Algoritmo Rsync / FastCDC calcula blocos variáveis identificando alterações mesmo com inserções no meio do arquivo.</text>

</svg>

| Estratégia de Upload | Upload ao Modificar 1 Linha em 100 MB | Consumo de Rede e Tempo |
|---|---|---|
| **Upload do Arquivo Inteiro** | Reenvia todos os 100 MB | Lento e consome muita banda móvel |
| **Delta Sync com Chunking** | **Reenvia apenas 1 chunk de 4 MB** | **Instantâneo ($96\%$ de economia de dados)** |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Rolling Hash (Rabin Fingerprint) para Chunks de Tamanho Variável
- Chunks de tamanho fixo sofrem de *Shift Problems* (inserir 1 byte no início do arquivo altera o hash de todos os blocos subsequentes). O algoritmo de **Rolling Hash** define limites de chunks baseando-se no conteúdo (quando os últimos bits do hash batem com um padrão), isolando a alteração a um único bloco.

</details>
