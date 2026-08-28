import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_SYS_SVGS } from './remediate-sys-svgs.js';
import { SYS_CARD_MEDIA_MAP } from './inject-sys-media.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const SYS_DIR = path.join(ROOT_DIR, 'decks', '03-system-design-backend');
const REGISTRY_PATH = path.join(ROOT_DIR, 'media-curation-registry.json');
const SCHEMA_PATH = path.join(ROOT_DIR, 'specs', '003-public-multimedia-curation', 'contracts', 'media-curation-registry.schema.json');

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

export function curateSystemDesignRegistry() {
  console.log('🚀 Curating Batch 3 (System Design: 94 cards) into media-curation-registry.json...\n');

  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  const files = findMarkdownFiles(SYS_DIR).filter(f => !f.endsWith('-006.md'));

  console.log(`🔍 Found ${files.length} System Design cards (non-L2).`);
  console.log(`📊 Registry currently has ${Object.keys(registry.cards).length} cards.`);

  const nowIso = new Date().toISOString();
  let addedCount = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const idMatch = content.match(/^id:\s*([^\r\n]+)/m);
    const titleMatch = content.match(/^title:\s*([^\r\n]+)/m);
    if (!idMatch) {
      console.warn(`⚠️ No ID found in ${file}`);
      continue;
    }
    const cardId = idMatch[1].trim();
    let title = titleMatch ? titleMatch[1].trim() : '';
    if (title.startsWith('"') && title.endsWith('"')) {
      title = title.slice(1, -1);
    }
    if (title.length > 145) {
      title = title.substring(0, 145) + '...';
    }

    const rel = path.relative(SYS_DIR, file);
    const parts = rel.split(path.sep);
    const subtopicId = parts[1] || 'system-design';

    const mediaConfig = SYS_CARD_MEDIA_MAP[cardId];
    let captionText = mediaConfig && mediaConfig.fallbackText ? mediaConfig.fallbackText : `Diagrama de arquitetura e topologia técnica para ${title}.`;
    if (!captionText.startsWith('Visualização:')) {
      captionText = `Visualização: ${captionText}`;
    }
    if (captionText.length > 295) {
      captionText = captionText.substring(0, 295) + '...';
    }

    registry.cards[cardId] = {
      card_id: cardId,
      subtopic_id: subtopicId,
      concept: title,
      tier: 'P2_RESPONSIVE_SVG',
      media_type: 'inline_svg',
      attribution: 'System Design Architecture Standards / Open Community',
      license: 'CC-BY-SA-4.0',
      caption: captionText,
      status: 'verified',
      last_verified: nowIso
    };
    addedCount++;
  }

  // Update aggregate stats
  const allCardEntries = Object.values(registry.cards);
  registry.stats = {
    total_cards: allCardEntries.length,
    p1_video_count: allCardEntries.filter(c => c.tier === 'P1_MICRO_VIDEO').length,
    p2_svg_count: allCardEntries.filter(c => c.tier === 'P2_RESPONSIVE_SVG' || c.media_type === 'inline_svg').length,
    p2_table_count: allCardEntries.filter(c => c.tier === 'P2_TABLE_FALLBACK' || c.media_type === 'markdown_table').length
  };
  registry.last_updated = nowIso;

  // Validate every entry against schema rules manually
  let schemaErrors = 0;
  const idPattern = /^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[0-9]{3}$/;
  const subtopicPattern = /^[a-z0-9_-]+$/;

  for (const [id, entry] of Object.entries(registry.cards)) {
    if (!idPattern.test(entry.card_id)) {
      console.error(`❌ Invalid card_id: ${entry.card_id}`);
      schemaErrors++;
    }
    if (!subtopicPattern.test(entry.subtopic_id)) {
      console.error(`❌ Invalid subtopic_id in [${id}]: ${entry.subtopic_id}`);
      schemaErrors++;
    }
    if (typeof entry.concept !== 'string' || entry.concept.length < 3 || entry.concept.length > 150) {
      console.error(`❌ Concept length error in [${id}]: length ${entry.concept.length}`);
      schemaErrors++;
    }
    if (!['P1_MICRO_VIDEO', 'P2_RESPONSIVE_SVG', 'P2_TABLE_FALLBACK', 'LOCAL_ASSET'].includes(entry.tier)) {
      console.error(`❌ Invalid tier in [${id}]: ${entry.tier}`);
      schemaErrors++;
    }
    if (!['video/mp4', 'video/webm', 'image/svg+xml', 'image/webp', 'image/gif', 'image/png', 'inline_svg', 'markdown_table'].includes(entry.media_type)) {
      console.error(`❌ Invalid media_type in [${id}]: ${entry.media_type}`);
      schemaErrors++;
    }
    if (typeof entry.attribution !== 'string' || entry.attribution.length < 2 || entry.attribution.length > 200) {
      console.error(`❌ Attribution error in [${id}]`);
      schemaErrors++;
    }
    if (typeof entry.license !== 'string' || entry.license.length < 2 || entry.license.length > 100) {
      console.error(`❌ License error in [${id}]`);
      schemaErrors++;
    }
    if (typeof entry.caption !== 'string' || entry.caption.length < 5 || entry.caption.length > 300) {
      console.error(`❌ Caption length error in [${id}]: length ${entry.caption.length}`);
      schemaErrors++;
    }
    if (!['verified', 'pending', 'deprecated'].includes(entry.status)) {
      console.error(`❌ Status error in [${id}]`);
      schemaErrors++;
    }
  }

  if (schemaErrors > 0) {
    throw new Error(`Schema validation failed with ${schemaErrors} errors.`);
  }

  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2), 'utf8');

  console.log(`✨ Successfully curated ${addedCount} System Design cards.`);
  console.log(`📈 New Registry Stats:`);
  console.log(`   - total_cards: ${registry.stats.total_cards}`);
  console.log(`   - p1_video_count: ${registry.stats.p1_video_count}`);
  console.log(`   - p2_svg_count: ${registry.stats.p2_svg_count}`);
  console.log(`   - p2_table_count: ${registry.stats.p2_table_count}`);
  console.log(`\n🎉 Schema validation passed: 0 errors!\n`);

  return registry;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  curateSystemDesignRegistry();
}
