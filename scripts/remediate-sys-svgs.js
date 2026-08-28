import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CACHING_STORAGE_SVGS } from './sys-svg-definitions/caching-storage.js';
import { DISTRIBUTED_CONSENSUS_SVGS } from './sys-svg-definitions/distributed-consensus.js';
import { ARCHETYPES_PART1_SVGS } from './sys-svg-definitions/archetypes-part1.js';
import { ARCHETYPES_PART2_SVGS } from './sys-svg-definitions/archetypes-part2.js';
import { RESILIENCE_FOUNDATIONS_LLD_SVGS } from './sys-svg-definitions/resilience-foundations-lld.js';
import { validateCard } from '../src/utils/validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const SYS_DIR = path.join(ROOT_DIR, 'decks', '03-system-design-backend');
const REGISTRY_PATH = path.join(ROOT_DIR, 'media-curation-registry.json');

export const ALL_SYS_SVGS = {
  ...CACHING_STORAGE_SVGS,
  ...DISTRIBUTED_CONSENSUS_SVGS,
  ...ARCHETYPES_PART1_SVGS,
  ...ARCHETYPES_PART2_SVGS,
  ...RESILIENCE_FOUNDATIONS_LLD_SVGS
};

function findMarkdownFiles(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      findMarkdownFiles(fullPath, list);
    } else if (fullPath.endsWith('.md')) {
      list.push(fullPath);
    }
  }
  return list;
}

export function checkSysSvgs() {
  console.log('🔍 Checking Batch 3 (System Design) SVG definitions...');
  const files = findMarkdownFiles(SYS_DIR).filter(f => !f.endsWith('-006.md'));
  console.log(`📦 Markdown cards (non-L2): ${files.length}`);
  console.log(`🎨 Total SVGs registered: ${Object.keys(ALL_SYS_SVGS).length}`);

  let missing = 0;
  for (const file of files) {
    const rawContent = fs.readFileSync(file, 'utf8');
    const idMatch = rawContent.match(/^id:\s*([^\r\n]+)/m);
    if (!idMatch) continue;
    const cardId = idMatch[1].trim();
    if (!ALL_SYS_SVGS[cardId]) {
      console.error(`❌ Missing SVG for card: ${cardId} in ${file}`);
      missing++;
    }
  }

  if (missing === 0) {
    console.log(`✅ All ${files.length} System Design cards have registered SVG definitions!`);
  } else {
    console.error(`💥 ${missing} cards missing SVG definitions.`);
  }

  return { totalCards: files.length, totalSvgs: Object.keys(ALL_SYS_SVGS).length, missing };
}

export function remediateSysCards() {
  console.log('🚀 Remediating Batch 3 (System Design) cards with responsive inline SVGs & semantic captions...\n');

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const allFiles = findMarkdownFiles(SYS_DIR);
  console.log(`🔍 Total System Design markdown files: ${allFiles.length}`);
  console.log(`📦 Registered SVG definitions: ${Object.keys(ALL_SYS_SVGS).length}\n`);

  let updatedCount = 0;
  let skippedCount = 0;
  let validationErrors = 0;

  for (const file of allFiles) {
    if (file.endsWith('-006.md')) {
      skippedCount++;
      continue;
    }

    const rawContent = fs.readFileSync(file, 'utf8');
    const idMatch = rawContent.match(/^id:\s*([^\r\n]+)/m);
    if (!idMatch) {
      console.warn(`⚠️ No ID found in ${file}`);
      continue;
    }
    const cardId = idMatch[1].trim();
    const svgCode = ALL_SYS_SVGS[cardId];

    if (!svgCode) {
      console.error(`❌ Missing SVG definition for card: ${cardId} in ${file}`);
      validationErrors++;
      continue;
    }

    // Replace the visual section in the markdown
    let newContent = rawContent;

    // Remove old <div class="video-wrapper">...</div> or <video> or markdown image
    if (newContent.includes('<div class="video-wrapper">')) {
      newContent = newContent.replace(
        /<div class="video-wrapper">[\s\S]*?<\/div>/,
        svgCode
      );
    } else if (newContent.includes('<video')) {
      newContent = newContent.replace(
        /<video[^>]*>[\s\S]*?<\/video>/,
        svgCode
      );
    } else if (newContent.includes('![Visualização:')) {
      newContent = newContent.replace(
        /!\[Visualização:[^\]]*\]\([^)]+\)/,
        svgCode
      );
    } else if (newContent.includes('### Dual Coding Visual\n')) {
      newContent = newContent.replace(
        '### Dual Coding Visual\n',
        `### Dual Coding Visual\n${svgCode}\n\n`
      );
    }

    // Validate the updated card
    const validation = validateCard(file, newContent);
    if (!validation.valid) {
      console.error(`❌ Validation failed for ${cardId} (${file}):`);
      validation.errors.forEach(err => console.error(`   - ${err}`));
      validationErrors++;
      continue;
    }

    fs.writeFileSync(file, newContent, 'utf8');
    updatedCount++;
  }

  console.log(`\n========================================`);
  console.log(`✨ Remediated ${updatedCount} System Design cards with responsive inline SVGs.`);
  console.log(`⏩ Skipped ${skippedCount} L2 fundamental cards (already containing custom SVGs).`);
  console.log(`🚨 Errors encountered: ${validationErrors}`);
  console.log(`========================================\n`);

  if (validationErrors > 0) {
    throw new Error(`Remediation completed with ${validationErrors} errors.`);
  }

  return { updatedCount, skippedCount };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  checkSysSvgs();
  remediateSysCards();
}
