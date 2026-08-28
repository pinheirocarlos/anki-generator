import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateCard } from '../src/utils/validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const DSA_DIR = path.join(ROOT_DIR, 'decks', '01-dsa');
const REGISTRY_PATH = path.join(ROOT_DIR, 'media-curation-registry.json');

/**
 * Standard SVG wrapper helper
 */
function svgWrapper(width, height, content) {
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" height="auto" xmlns="http://www.w3.org/2000/svg" style="background:#0f172a; border-radius:8px; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <rect width="${width}" height="${height}" fill="#0f172a" rx="8"/>
${content}
</svg>`;
}

export { svgWrapper };
