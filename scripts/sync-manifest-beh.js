import fs from 'fs';
import path from 'path';

const manifestPath = path.resolve('syllabus_manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

const behPhase = manifest.phases.find(p => p.id === '04-behavioral-engineering');
if (!behPhase) {
  console.error('Phase 04-behavioral-engineering not found in manifest!');
  process.exit(1);
}

const decksRoot = path.resolve('decks/04-behavioral-engineering');

let totalCards = 0;

for (const mod of behPhase.modules) {
  const modDir = path.join(decksRoot, mod.id);
  if (!fs.existsSync(modDir)) {
    console.warn(`Module dir ${modDir} does not exist`);
    continue;
  }

  for (const sub of mod.subtopics) {
    const subDir = path.join(modDir, sub.id);
    if (!fs.existsSync(subDir)) {
      console.warn(`Subtopic dir ${subDir} does not exist`);
      continue;
    }

    const files = fs.readdirSync(subDir).filter(f => f.endsWith('.md'));
    const cardIds = [];

    for (const file of files) {
      const content = fs.readFileSync(path.join(subDir, file), 'utf-8');
      const idMatch = content.match(/^id:\s*([^\r\n]+)/m);
      if (idMatch) {
        cardIds.push(idMatch[1].trim());
      } else {
        cardIds.push(file.replace('.md', ''));
      }
    }

    // Sort cards numerically / alphabetically
    cardIds.sort();
    sub.card_ids = cardIds;
    sub.status = 'completed';
    totalCards += cardIds.length;
    console.log(`Synced [${mod.id}/${sub.id}]: ${cardIds.length} cards -> ${cardIds.join(', ')}`);
  }
}

manifest.last_updated = new Date().toISOString().split('T')[0];
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
console.log(`\n🎉 Successfully synced syllabus_manifest.json for 04-behavioral-engineering (${totalCards} total atomic cards)`);
