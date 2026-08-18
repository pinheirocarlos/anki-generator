import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateCard } from '../src/utils/validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to write a card file and validate it immediately
export function writeAndValidateCard(subpath, content) {
  const fullPath = path.join(ROOT_DIR, subpath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n', 'utf8');

  const res = validateCard(fullPath, content);
  if (!res.valid) {
    console.error(`❌ Validation error in ${subpath}:`, res.errors);
    throw new Error(`Validation failed for ${subpath}`);
  }
  console.log(`✅ Decomposed & Validated: [${res.frontmatter.id}] ${subpath}`);
  return res.frontmatter.id;
}
