import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { syncManifestFiles } from '../utils/manifest.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const DECKS_DIR = path.join(ROOT_DIR, 'decks');

/**
 * Parses CLI arguments into an options object.
 * Supports --key=value and --key value.
 *
 * @param {string[]} argv
 * @returns {Record<string, string>}
 */
export function parseArgs(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const eqIdx = arg.indexOf('=');
      if (eqIdx !== -1) {
        const key = arg.slice(2, eqIdx);
        const value = arg.slice(eqIdx + 1);
        options[key] = value;
      } else {
        const key = arg.slice(2);
        const nextArg = argv[i + 1];
        if (nextArg && !nextArg.startsWith('--')) {
          options[key] = nextArg;
          i++;
        } else {
          options[key] = 'true';
        }
      }
    }
  }
  return options;
}

/**
 * Generates card markdown template content.
 *
 * @param {object} params
 * @param {string} params.id
 * @param {string} params.title
 * @param {string} params.level
 * @param {string} params.topic
 * @param {string} params.company
 * @param {string} params.freq
 * @returns {string}
 */
export function createCardTemplate({ id, title, level, topic, company, freq }) {
  return `---
id: ${id}
title: "${title}"
tags:
  - level::${level}
  - topic::${topic}
  - company::${company}
  - freq::${freq}
---

## Pergunta
[Enunciado objetivo com no máximo 1 pergunta direta em PT-BR com termos em inglês.]

## Resposta
### Quick Answer
**Solução Direta**:
- **Conceito Central**: [Definição avaliável em <15 segundos]
- **Time Complexity**: \`O(1)\`
- **Space Complexity**: \`O(1)\`

### Dual Coding Visual
<svg viewBox="0 0 680 200" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="680" height="200" fill="#0f172a" rx="8"/>
  <text x="340" y="32" fill="#38bdf8" font-size="14" font-weight="bold" text-anchor="middle">Visualização Conceitual: ${title}</text>
  
  <g transform="translate(60, 60)">
    <rect x="0" y="0" width="260" height="90" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" rx="6"/>
    <text x="130" y="30" fill="#38bdf8" font-size="12" font-weight="bold" text-anchor="middle">Estado / Fluxo A</text>
    <text x="130" y="60" fill="#94a3b8" font-size="11" text-anchor="middle">Descrição breve</text>
  </g>

  <g transform="translate(360, 60)">
    <rect x="0" y="0" width="260" height="90" fill="#1e293b" stroke="#10b981" stroke-width="1.5" rx="6"/>
    <text x="130" y="30" fill="#34d399" font-size="12" font-weight="bold" text-anchor="middle">Estado / Fluxo B</text>
    <text x="130" y="60" fill="#94a3b8" font-size="11" text-anchor="middle">Resultado ótimo</text>
  </g>
</svg>
<p>Visualização: Comparação direta de fluxo e transição de estado para ${title}.</p>

| Aspecto | Abordagem A | Abordagem B (Ótima) |
|---|---|---|
| **Mecânica** | Descrição básica | Descrição avançada |
| **Complexidade** | \`O(N)\` | \`O(1)\` |

<details>
<summary>Deep Dive & Walkthrough</summary>

#### Implementation (Go & Java)
\`\`\`go
// Snippet conciso e idiomático em Go
\`\`\`

\`\`\`java
// Snippet conciso e idiomático em Java
\`\`\`

#### Key Takeaways & Trade-offs
- Nuances, armadilhas comuns em entrevistas e edge cases.

</details>
`;
}

/**
 * CLI Command runner to create a new card.
 */
export function runNewCard(args = process.argv.slice(2)) {
  const options = parseArgs(args);

  const phase = options.phase || options.p || '01-dsa';
  const module = options.module || options.m || 'data-structures';
  const subtopic = options.subtopic || options.s || 'arrays-strings';
  const id = options.id;
  const title = options.title || options.t || 'Novo Card';
  const level = options.level || options.l || 'l3-junior';
  const company = options.company || options.c || 'meta';
  const freq = options.freq || options.f || 'high';

  if (!id) {
    console.error('❌ Erro: Argumento --id é obrigatório. Exemplo:');
    console.error('   npm run card:new -- --phase=01-dsa --module=data-structures --subtopic=arrays-strings --id=DSA-STRUCT-ARRAY-007 --title="Novo Título"');
    process.exit(1);
  }

  const targetDir = path.join(DECKS_DIR, phase, module, subtopic);
  const targetFile = path.join(targetDir, `${id}.md`);

  if (fs.existsSync(targetFile)) {
    console.error(`❌ Erro: Card com ID "${id}" já existe em: ${path.relative(ROOT_DIR, targetFile)}`);
    process.exit(1);
  }

  fs.mkdirSync(targetDir, { recursive: true });

  const topicTag = `${phase.replace(/^[0-9]+-/, '')}::${subtopic}`;
  const content = createCardTemplate({
    id,
    title,
    level,
    topic: topicTag,
    company,
    freq
  });

  fs.writeFileSync(targetFile, content, 'utf8');
  console.log(`\n🎉 Card criado com sucesso em: ${path.relative(ROOT_DIR, targetFile)}`);

  // Auto-sync manifest and registry in background
  syncManifestFiles({ silent: true });
  console.log('✅ Manifesto e Registro de Mídia auto-sincronizados diretamente do Markdown.');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  runNewCard();
}
