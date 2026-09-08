import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DECKS_DIR = path.join(ROOT_DIR, 'decks');

const USER_AGENT = 'FAANGAnkiDeckBot/1.0 (https://github.com/pinheirocarlos/anki-generator; info@faang-anki.dev)';

function getMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) getMarkdownFiles(fullPath, fileList);
    else if (entry.isFile() && entry.name.endsWith('.md')) fileList.push(fullPath);
  }
  return fileList;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function downloadFile(url, destPath) {
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // If already downloaded and non-empty, skip
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
    return { cached: true, size: fs.statSync(destPath).size };
  }

  // Check if identical file was already downloaded elsewhere in decks
  const existingFiles = getMarkdownFiles(DECKS_DIR)
    .map(f => path.join(path.dirname(f), 'assets'))
    .filter(d => fs.existsSync(d))
    .flatMap(d => fs.readdirSync(d).map(name => path.join(d, name)));

  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
      if (res.status === 429) {
        console.warn(`      ⚠️ Rate limited (429). Waiting ${attempt * 3}s before retry...`);
        await sleep(attempt * 3000);
        continue;
      }
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status} fetching ${url}`);
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(destPath, buffer);
      return { cached: false, size: buffer.length };
    } catch (err) {
      if (attempt === 4) throw err;
      await sleep(attempt * 2000);
    }
  }
}

export async function localizeAllMedia() {
  const files = getMarkdownFiles(DECKS_DIR);
  console.log(`🔍 Scanning ${files.length} cards for remote media to localize...`);

  let localizedCount = 0;
  let errorCount = 0;
  const results = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const idMatch = content.match(/^id:\s*(.+)$/m);
    const cardId = idMatch ? idMatch[1].trim() : path.basename(file, '.md');
    const cardDir = path.dirname(file);

    // Find remote img tags
    const imgRegex = /<img\s+([^>]*?)src=["'](https?:\/\/[^"']+)["']([^>]*)>/gi;
    const matches = [...content.matchAll(imgRegex)];

    if (matches.length === 0) continue;

    let updatedContent = content;

    for (const match of matches) {
      const fullTag = match[0];
      const before = match[1];
      const remoteUrl = match[2];
      const after = match[3];

      // Determine extension (.gif, .png, .svg, etc.)
      let ext = '.gif';
      if (remoteUrl.toLowerCase().endsWith('.png')) ext = '.png';
      else if (remoteUrl.toLowerCase().endsWith('.jpg') || remoteUrl.toLowerCase().endsWith('.jpeg')) ext = '.jpg';
      else if (remoteUrl.toLowerCase().endsWith('.svg')) ext = '.svg';

      const filename = `${cardId}${ext}`;
      const destPath = path.join(cardDir, 'assets', filename);

      try {
        console.log(`⬇️ Downloading [${cardId}] ${remoteUrl} -> assets/${filename}...`);
        const dl = await downloadFile(remoteUrl, destPath);
        console.log(`   ✅ Saved (${dl.size} bytes${dl.cached ? ' [cached]' : ''})`);

        // Replace remote URL with relative local path assets/filename
        const localSrc = `assets/${filename}`;
        const newTag = `<img ${before}src="${localSrc}"${after}>`;
        updatedContent = updatedContent.replace(fullTag, newTag);

        localizedCount++;
        results.push({ cardId, file: path.relative(ROOT_DIR, file), remoteUrl, filename, success: true });
      } catch (err) {
        console.error(`   ❌ Failed downloading ${remoteUrl} for card ${cardId}:`, err.message);
        errorCount++;
        results.push({ cardId, file: path.relative(ROOT_DIR, file), remoteUrl, filename, success: false, error: err.message });
      }
    }

    if (updatedContent !== content) {
      fs.writeFileSync(file, updatedContent, 'utf8');
    }
  }

  console.log(`\n🎉 Localization completed: ${localizedCount} media files downloaded & localized, ${errorCount} errors.`);
  return { localizedCount, errorCount, results };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  localizeAllMedia()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('Localization error:', err);
      process.exit(1);
    });
}
