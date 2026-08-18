import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT_DIR = process.cwd();
const MANIFEST_PATH = path.join(ROOT_DIR, 'syllabus_manifest.json');
const DECKS_DIR = path.join(ROOT_DIR, 'decks', '01-dsa');

console.log('🔄 Syncing syllabus_manifest.json for Phase 01-dsa...');

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

const dsaPhase = manifest.phases.find(p => p.id === '01-dsa');
if (!dsaPhase) {
  throw new Error('Phase 01-dsa not found in syllabus_manifest.json');
}

let totalUpdatedCards = 0;

for (const mod of dsaPhase.modules) {
  const modDir = path.join(DECKS_DIR, mod.id);
  if (!fs.existsSync(modDir)) {
    console.warn(`⚠️ Module directory not found: ${modDir}`);
    continue;
  }

  for (const sub of mod.subtopics) {
    const subDir = path.join(modDir, sub.id);
    if (!fs.existsSync(subDir)) {
      console.warn(`⚠️ Subtopic directory not found: ${subDir}`);
      continue;
    }

    const files = fs.readdirSync(subDir).filter(f => f.endsWith('.md'));
    const ids = [];

    for (const f of files) {
      const filePath = path.join(subDir, f);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      if (data && data.id) {
        ids.push(data.id);
      }
    }

    ids.sort();
    sub.card_ids = ids;
    sub.status = 'completed';
    totalUpdatedCards += ids.length;
    console.log(`  📁 [${mod.id}/${sub.id}] -> ${ids.length} cards: ${ids.join(', ')}`);
  }
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`\n🎉 Successfully synced syllabus_manifest.json! Total cards in 01-dsa: ${totalUpdatedCards}`);
