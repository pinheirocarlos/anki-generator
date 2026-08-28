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

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  checkSysSvgs();
}
