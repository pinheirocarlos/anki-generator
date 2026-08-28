import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DECKS_DIR = path.join(ROOT_DIR, 'decks');

function getAllMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getAllMarkdownFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  }
  return results;
}

const cardFiles = getAllMarkdownFiles(DECKS_DIR);

const stats = {
  totalCards: cardFiles.length,
  byPhase: {},
  placeholderCardsCount: 0,
  wikimediaCardsCount: 0,
  inlineSvgCardsCount: 0,
  svgInVideoTagCount: 0,
  videoTagCount: 0,
  imgTagCount: 0,
  noMediaCount: 0
};

for (const filePath of cardFiles) {
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const phase = relPath.split('/')[1] || 'unknown';
  stats.byPhase[phase] = (stats.byPhase[phase] || 0) + 1;

  const raw = fs.readFileSync(filePath, 'utf8');
  let content = raw;
  try {
    content = matter(raw).content;
  } catch (e) {}

  if (content.includes('assets.faang-anki.dev')) {
    stats.placeholderCardsCount++;
  }
  if (content.includes('upload.wikimedia.org')) {
    stats.wikimediaCardsCount++;
  }

  const videoMatches = [...content.matchAll(/<video\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)];
  const imgMatches = [...content.matchAll(/<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi)];
  const mdImgMatches = [...content.matchAll(/!\[.*?\]\((https?:\/\/[^)]+)\)/gi)];

  if (videoMatches.length > 0) {
    stats.videoTagCount += videoMatches.length;
    for (const m of videoMatches) {
      const src = m[1].trim();
      if (src.toLowerCase().endsWith('.svg')) stats.svgInVideoTagCount++;
    }
  }
  if (imgMatches.length > 0) {
    stats.imgTagCount += imgMatches.length;
  }

  if (content.includes('<svg') && !videoMatches.length && !imgMatches.length && !mdImgMatches.length) {
    stats.inlineSvgCardsCount++;
  }
  if (!videoMatches.length && !imgMatches.length && !mdImgMatches.length && !content.includes('<svg')) {
    stats.noMediaCount++;
  }
}

console.log('STATS SUMMARY:', JSON.stringify(stats, null, 2));
