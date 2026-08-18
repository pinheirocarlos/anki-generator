# Quickstart & Validation Guide: Feature 002

**Feature**: `002-atomic-media-foundations` | **Date**: 2026-08-17

---

## 1. Prerequisites

- Node.js v18+ instalado
- Dependências instaladas (`npm install`)
- Anki Desktop (ou AnkiDroid / AnkiMobile) para validação visual

---

## 2. Automated Quality Verification

### 2.1 Testes de Validação de Esquema, Atomicidade e Mídias
Execute a suíte de testes de integridade:
```bash
npm test
```

A suíte valida:
- Taxonomia de tags (incluindo `level::l2-fundamental`, `level::l3-junior`, `level::l4-pleno`, `level::l5-senior`).
- Ausência de perguntas compostas na seção `## Pergunta`.
- Integridade de URLs de mídias HTTPS e arquivos locais em `assets/`.
- Sincronização bidirecional de IDs com o `syllabus_manifest.json`.
- Restrições mobile-first (máximo 3 colunas em tabelas, zero scroll horizontal).

---

## 3. Build & Packaging

### 3.1 Compilar o Baralho Master Consolidado
```bash
npm run build
```
Gera `MAANG_Engineering_Mastery.apkg` na raiz do projeto com realce de sintaxe estático, renderização matemática KaTeX e suporte a mídias.

### 3.2 Compilar Pacote Modular por Fase
```bash
node src/generator.js --phase 01-dsa
```
Gera `MAANG_01-dsa.apkg` para importação modular.

---

## 4. Visual Quality Inspection in Anki

1. Importe `MAANG_Engineering_Mastery.apkg` no Anki.
2. Abra o Navegador de Cartões (*Card Browser*) e filtre por:
   - `tag:level::l2-fundamental` (verifique badges esmeralda e analogias intuitivas).
   - `tag:level::l3-junior` (verifique badges azuis e perguntas atômicas).
3. Teste a reprodução de micro-vídeos em loop em dispositivos móveis ou na pré-visualização do Anki Desktop.
4. Verifique a ausência de rolagem horizontal em telas de largura $\ge 360$px.
