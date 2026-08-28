import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateCard } from '../src/utils/validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const CS_DIR = path.join(ROOT_DIR, 'decks', '02-cs-fundamentals');
const REGISTRY_PATH = path.join(ROOT_DIR, 'media-curation-registry.json');

/**
 * Builds the responsive HTML video block
 */
export function buildVideoWrapper(videoUrl, caption) {
  const formattedCaption = caption.startsWith('Visualização:') ? caption : `Visualização: ${caption}`;
  return `<div class="video-wrapper">
  <video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="${videoUrl}">
    <p>${formattedCaption}</p>
  </video>
</div>`;
}

/**
 * Injects or updates the media block inside the Dual Coding Visual section of a card's content
 */
export function injectMediaIntoCard(content, cardId, regEntry) {
  if (!regEntry || !regEntry.url) {
    return content;
  }

  const videoBlock = buildVideoWrapper(regEntry.url, regEntry.caption);

  // If already contains video wrapper, replace it
  if (content.includes('<div class="video-wrapper">')) {
    return content.replace(
      /<div class="video-wrapper">[\s\S]*?<\/div>/,
      videoBlock
    );
  }

  // If contains a video tag directly
  if (content.includes('<video')) {
    return content.replace(
      /<video[^>]*>[\s\S]*?<\/video>/,
      `<div class="video-wrapper">\n  ${videoBlock}\n</div>`
    );
  }

  // Otherwise inject right after `### Dual Coding Visual\n`
  if (content.includes('### Dual Coding Visual\n')) {
    return content.replace(
      '### Dual Coding Visual\n',
      `### Dual Coding Visual\n${videoBlock}\n\n`
    );
  }

  if (content.includes('### Dual Coding Visual')) {
    return content.replace(
      '### Dual Coding Visual',
      `### Dual Coding Visual\n${videoBlock}\n`
    );
  }

  return content;
}

/**
 * Recursively find all markdown files in a directory
 */
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

/**
 * Main execution function
 */
export function executeInjection() {
  console.log('🚀 Starting CS Fundamentals Looping Micro-Video & Curation Injection...');
  const registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  const files = findMarkdownFiles(CS_DIR);
  console.log(`🔍 Found ${files.length} cards in ${CS_DIR}`);

  let updatedCount = 0;
  let validationErrors = 0;

  for (const filePath of files) {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const idMatch = rawContent.match(/^id:\s*([^\n\r]+)/m);
    if (!idMatch) {
      console.warn(`⚠️ No ID found in ${filePath}`);
      continue;
    }

    const cardId = idMatch[1].trim();
    const regEntry = registry.cards[cardId];
    if (!regEntry) {
      console.warn(`⚠️ No registry entry found for card ID: ${cardId}`);
      continue;
    }

    // Only update cards that have a remote video/media URL in registry (P1)
    if (regEntry.tier === 'P1_MICRO_VIDEO' && regEntry.url) {
      const newContent = injectMediaIntoCard(rawContent, cardId, regEntry);

      // Validate the updated card
      const validation = validateCard(filePath, newContent);
      if (!validation.valid) {
        console.error(`❌ Validation failed for updated card [${cardId}]:`, validation.errors);
        validationErrors++;
        continue;
      }

      fs.writeFileSync(filePath, newContent, 'utf8');
      updatedCount++;
    }
  }

  console.log(`\n🎉 Completed injection: ${updatedCount} cards updated successfully!`);
  if (validationErrors > 0) {
    console.error(`💥 Validation failed on ${validationErrors} cards.`);
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  executeInjection();
}
