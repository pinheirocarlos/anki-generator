---
id: CS-OS-SYS-001
title: "Direct I/O (O_DIRECT) vs Buffered I/O e Page Cache"
tags:
  - level::l4-pleno
  - topic::cs::os-memory
  - company::amazon
  - freq::high
---

## Pergunta
O que é **Direct I/O (`O_DIRECT`)** e por que bancos de dados relacionais transacionais (como PostgreSQL e MySQL InnoDB) contornam o **Page Cache** do Linux?

## Resposta
### Quick Answer
**Solução Direta**:
- **Buffered I/O (Padrão Linux)**:
  - Toda escrita com `write()` grava primeiro no **Page Cache do kernel** na RAM e retorna imediatamente (*Write-Back Assíncrono*).
  - O kernel decide quando descarregar para o disco (*Dirty Pages Flush*).
  - *Problema para Bancos*: Causa **Double Buffering** (o mesmo bloco de 16 KB fica duplicado no Buffer Pool do banco e no Page Cache do OS) e dificulta garantias estritas de durabilidade ACID.
- **Direct I/O (`O_DIRECT`)**:
  - Abre o arquivo contornando completamente o Page Cache do kernel.
  - A controladora lê e escreve diretamente entre o buffer de userspace da aplicação e o storage NVMe via DMA.
  - O banco de dados assume o controle total dos algoritmos de substituição de cache (LRU/Clock) e da ordem de gravação no WAL (*Write-Ahead Log*).

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>

  <text x="340" y="26" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Direct I/O (O_DIRECT) vs Buffered I/O e Page Cache</text>
  <g transform="translate(50, 48)">
    <rect x="0" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#f59e0b"/>
    <text x="135" y="22" fill="#fbbf24" font-size="11" font-weight="bold" text-anchor="middle">Buffered I/O (Padrão do OS)</text>
    <text x="135" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">read() copia do Page Cache para buffer da app</text>
    <text x="135" y="60" fill="#a7f3d0" font-size="10" text-anchor="middle">Cache transparente de leituras repetidas</text>
    <text x="135" y="76" fill="#94a3b8" font-size="9" text-anchor="middle">Custo: Cópia extra de memória CPU</text>

    <rect x="310" y="0" width="270" height="85" rx="6" fill="#1e293b" stroke="#10b981"/>
    <text x="445" y="22" fill="#34d399" font-size="11" font-weight="bold" text-anchor="middle">Direct I/O (flag O_DIRECT)</text>
    <text x="445" y="44" fill="#f8fafc" font-size="10" text-anchor="middle">DMA transfere direto do disco para buffer da app</text>
    <text x="445" y="60" fill="#34d399" font-size="10" font-weight="bold" text-anchor="middle">Zero sobrecarga no Page Cache do OS</text>
    <text x="445" y="76" fill="#a7f3d0" font-size="9" text-anchor="middle">Exige alinhamento estrito em 4 KB (Setores de Disco)</text>
  </g>
  <text x="340" y="160" fill="#38bdf8" font-size="11" font-weight="bold" text-anchor="middle">Bancos de dados profissionais implementam seus próprios caches inteligentes sobre Direct I/O.</text>

</svg>
<p>Visualização: Fluxo de dados comparando Buffered I/O (intermediação transparente pelo Page Cache) e Direct I/O O_DIRECT (transferência direta via DMA para a aplicação).</p>

| Modo de I/O | Passa pelo Page Cache do SO? | Risco de Duplicação de Memória |
|---|---|---|
| **Buffered I/O** | Sim (Retém em cache na RAM do kernel) | Sim (*Double Buffering* consome o dobro de RAM) |
| **Direct I/O (`O_DIRECT`)** | Não (Transfere direto via DMA) | Zero (Cache controlado 100% pelo banco) |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Requisitos de Alinhamento de Hardware do `O_DIRECT`
- Ao usar `O_DIRECT`, o buffer de memória, o deslocamento no arquivo (*offset*) e o tamanho da gravação **devem ser múltiplos exatos do tamanho do setor do disco** (geralmente 4.096 bytes / 4 KB). Qualquer desalinhamento faz a syscall falhar com `EINVAL`.

#### Key Takeaways
- Bancos de dados de classe empresarial utilizam `O_DIRECT` para seus arquivos de dados principais e `fsync()` / `fdatasync()` nos arquivos de log de transações.

</details>
