import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateCard } from '../src/utils/validator.js';
import { DATA_STRUCTURES_PART1_SVGS } from './dsa-svg-definitions/data-structures-part1.js';
import { DATA_STRUCTURES_PART2_SVGS } from './dsa-svg-definitions/data-structures-part2.js';
import { PATTERNS_PART1_SVGS } from './dsa-svg-definitions/patterns-part1.js';
import { PATTERNS_PART2_SVGS } from './dsa-svg-definitions/patterns-part2.js';
import { PATTERNS_PART3_SVGS } from './dsa-svg-definitions/patterns-part3.js';
import { ADVANCED_MATH_SVGS } from './dsa-svg-definitions/advanced-math.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const DSA_DIR = path.join(ROOT_DIR, 'decks', '01-dsa');
const REGISTRY_PATH = path.join(ROOT_DIR, 'media-curation-registry.json');

const ALL_DSA_SVGS = {
  ...DATA_STRUCTURES_PART1_SVGS,
  ...DATA_STRUCTURES_PART2_SVGS,
  ...PATTERNS_PART1_SVGS,
  ...PATTERNS_PART2_SVGS,
  ...PATTERNS_PART3_SVGS,
  ...ADVANCED_MATH_SVGS
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

export function remediateDsaCards() {
  console.log('🚀 Starting Task T012a: Remediating Batch 1 (DSA) cards with responsive inline SVGs & semantic captions...\n');

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const allFiles = findMarkdownFiles(DSA_DIR);
  console.log(`🔍 Total DSA markdown files: ${allFiles.length}`);
  console.log(`📦 Registered SVG definitions: ${Object.keys(ALL_DSA_SVGS).length}\n`);

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
    const svgCode = ALL_DSA_SVGS[cardId];

    if (!svgCode) {
      console.error(`❌ Missing SVG definition for card: ${cardId} in ${file}`);
      validationErrors++;
      continue;
    }

    const regEntry = registry.cards[cardId];
    let captionText = regEntry && regEntry.caption ? regEntry.caption : '';
    if (captionText && !captionText.startsWith('Visualização:')) {
      captionText = `Visualização: ${captionText}`;
    }

    // Replace the visual section in the markdown
    let newContent = rawContent;

    // Remove old <div class="video-wrapper">...</div>
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
  console.log(`✨ Remediated ${updatedCount} DSA cards with responsive inline SVGs.`);
  console.log(`⏩ Skipped ${skippedCount} L2 fundamental cards (already containing custom SVGs).`);
  console.log(`🚨 Errors encountered: ${validationErrors}`);
  console.log(`========================================\n`);

  if (validationErrors > 0) {
    throw new Error(`Remediation completed with ${validationErrors} errors.`);
  }

  return { updatedCount, skippedCount };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  remediateDsaCards();
}
