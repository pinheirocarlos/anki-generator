---
id: SYS-ARCH-FILESTORE-006
title: "Intuição Fundamental de Armazenamento de Arquivos: Fatiar em Pedaços e Guardar pela Impressão Digital"
tags:
  - level::l2-fundamental
  - topic::sys::archetypes
  - company::google
  - freq::high
---

## Pergunta
Qual é a intuição fundamental da arquitetura de armazenamento e sincronização distribuída de arquivos (como Google Drive ou Dropbox) baseada em Chunking e Deduplicação?

## Resposta
### Quick Answer
**Solução Direta**:
- Se você editar apenas uma linha de texto em um arquivo PDF de 500 MB, enviar o arquivo inteiro de 500 MB novamente pela internet desperdiça gigabytes de banda e tempo.
- Sistemas modernos de armazenamento distribuído operam com **Chunking e Deduplicação (CAS - Content-Addressable Storage)**:
  1. O arquivo é **fatiado em blocos fixos de 4 MB** (Chunks).
  2. Cada bloco recebe um hash criptográfico exclusivo (SHA-256) que funciona como sua **impressão digital**.
  3. Ao sincronizar alterações, o cliente envia **apenas o bloco de 4 MB que mudou** (*Delta Sync*).
  4. Se 1.000 usuários salvarem o mesmo arquivo idêntico no drive, o servidor armazena apenas **uma única cópia física do bloco no disco** (Deduplicação Global), economizando até 80% do armazenamento.

### Dual Coding Visual
<svg viewBox="0 0 600 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="200" fill="#0f172a" rx="10" />
  <text x="300" y="24" fill="#10b981" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle">Chunking de 4 MB e Sincronização Incremental (Delta Sync)</text>

  <!-- Arquivo Original (3 Chunks) -->
  <g transform="translate(40, 50)">
    <rect x="0" y="0" width="140" height="90" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5" rx="8" />
    <text x="70" y="22" fill="#93c5fd" font-size="10" font-weight="bold" text-anchor="middle">Arquivo V1 (12 MB)</text>
    <rect x="15" y="32" width="110" height="15" fill="#065f46" rx="3" />
    <text x="70" y="44" fill="#a7f3d0" font-size="8" text-anchor="middle">Chunk 1 (4MB) - Hash A</text>
    <rect x="15" y="50" width="110" height="15" fill="#065f46" rx="3" />
    <text x="70" y="62" fill="#a7f3d0" font-size="8" text-anchor="middle">Chunk 2 (4MB) - Hash B</text>
    <rect x="15" y="68" width="110" height="15" fill="#065f46" rx="3" />
    <text x="70" y="80" fill="#a7f3d0" font-size="8" text-anchor="middle">Chunk 3 (4MB) - Hash C</text>
  </g>

  <!-- Edição Pequena no Meio -->
  <g transform="translate(220, 50)">
    <rect x="0" y="0" width="140" height="90" fill="#1e293b" stroke="#f59e0b" stroke-width="1.5" rx="8" />
    <text x="70" y="22" fill="#fde68a" font-size="10" font-weight="bold" text-anchor="middle">Arquivo V2 (Editado)</text>
    <rect x="15" y="32" width="110" height="15" fill="#065f46" rx="3" />
    <text x="70" y="44" fill="#a7f3d0" font-size="8" text-anchor="middle">Chunk 1 (Inalterado)</text>
    <rect x="15" y="50" width="110" height="15" fill="#7f1d1d" stroke="#ef4444" rx="3" />
    <text x="70" y="62" fill="#fca5a5" font-size="8" font-weight="bold" text-anchor="middle">Chunk 2 MODIFICADO! (Hash D)</text>
    <rect x="15" y="68" width="110" height="15" fill="#065f46" rx="3" />
    <text x="70" y="80" fill="#a7f3d0" font-size="8" text-anchor="middle">Chunk 3 (Inalterado)</text>
  </g>

  <!-- Transmissão na Rede (Apenas o Bloco D) -->
  <g transform="translate(400, 50)">
    <rect x="0" y="0" width="160" height="90" fill="#065f46" stroke="#10b981" stroke-width="2" rx="8" />
    <text x="80" y="24" fill="#a7f3d0" font-size="11" font-weight="bold" text-anchor="middle">Delta Sync (Rede)</text>
    <text x="80" y="48" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Envia apenas 4 MB!</text>
    <text x="80" y="70" fill="#34d399" font-size="9" text-anchor="middle">Economia de 66% de banda</text>
  </g>

  <text x="300" y="175" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">O banco relacional guarda apenas os metadados; os blocos brutos vão para o S3/GCS!</text>
</svg>

| Camada do Sistema | O que Armazena | Tecnologia Típica |
|---|---|---|
| **Metadados (Metadata DB)** | Nomes de arquivos, pastas, permissões e lista de hashes | PostgreSQL / MySQL com índices relacionais. |
| **Armazém de Blocos (Block Store)** | Os blocos brutos de 4 MB identificados pelo hash SHA-256 | AWS S3 / Google Cloud Storage / Ceph. |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Como Funciona a Deduplicação Global
Quando você faz upload de um arquivo:
1. O cliente calcula o hash SHA-256 de cada bloco de 4 MB localmente no seu computador.
2. O cliente pergunta ao servidor: *"Você já tem o bloco com hash `e3b0c44...`?"*
3. Se o servidor já tiver (porque outro usuário já fez upload daquele mesmo arquivo antes), o upload daquele bloco é pulado instantaneamente!

#### Key Takeaways
- Sincronização eficiente de arquivos divide dados em metadados leves e blocos binários pesados imutáveis.
- Arquitetura consagrada no Dropbox, Google Drive e OneDrive.

</details>
