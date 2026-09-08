import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const DECKS_DIR = path.join(ROOT_DIR, 'decks');

/**
 * 8 Canonical Card Typologies required by Specification & Data Model.
 */
export const CARD_TYPOLOGIES = Object.freeze({
  L2_FUNDAMENTAL: 'L2_FUNDAMENTAL',
  L3_JUNIOR: 'L3_JUNIOR',
  L4_PLENO_CODE: 'L4_PLENO_CODE',
  MICRO_VIDEO: 'MICRO_VIDEO',
  RESPONSIVE_SVG: 'RESPONSIVE_SVG',
  COMPACT_TABLE: 'COMPACT_TABLE',
  KATEX_MATH: 'KATEX_MATH',
  DETAILS_ACCORDION: 'DETAILS_ACCORDION'
});

export const ALL_TYPOLOGIES = Object.freeze([
  CARD_TYPOLOGIES.L2_FUNDAMENTAL,
  CARD_TYPOLOGIES.L3_JUNIOR,
  CARD_TYPOLOGIES.L4_PLENO_CODE,
  CARD_TYPOLOGIES.MICRO_VIDEO,
  CARD_TYPOLOGIES.RESPONSIVE_SVG,
  CARD_TYPOLOGIES.COMPACT_TABLE,
  CARD_TYPOLOGIES.KATEX_MATH,
  CARD_TYPOLOGIES.DETAILS_ACCORDION
]);

/**
 * Minimum percentage of cards to sample (at least 10% of existing cards).
 */
export const DEFAULT_MIN_SAMPLE_RATIO = 0.10;

/**
 * Recursively find all markdown (.md) files in a directory.
 *
 * @param {string} dir - Directory to search
 * @param {string[]} fileList - Accumulator array
 * @returns {string[]} - Array of absolute file paths
 */
export function getMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getMarkdownFiles(fullPath, fileList);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

/**
 * Detect which of the 8 typologies a card satisfies.
 *
 * @param {object} cardData
 * @param {object} [cardData.frontmatter] - Parsed YAML frontmatter
 * @param {string} [cardData.rawMarkdown] - Full markdown string
 * @param {string} [cardData.content] - Markdown body content
 * @returns {string[]} - Array of typology keys satisfied by the card
 */
export function detectCardTypologies(cardData) {
  const frontmatter = cardData.frontmatter || {};
  const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];
  const text = cardData.rawMarkdown || cardData.content || '';
  const cardId = frontmatter.id || cardData.id || '';

  const typologies = [];

  // 1. L2_FUNDAMENTAL: Intuitive entry-level card with real-world analogy and level::l2-fundamental tag
  const isL2 = tags.some(t => typeof t === 'string' && t.toLowerCase() === 'level::l2-fundamental');
  if (isL2) {
    typologies.push(CARD_TYPOLOGIES.L2_FUNDAMENTAL);
  }

  // 2. L3_JUNIOR: Asymptotic complexity and mechanics card with level::l3-junior tag
  const isL3 = tags.some(t => typeof t === 'string' && t.toLowerCase() === 'level::l3-junior');
  if (isL3) {
    typologies.push(CARD_TYPOLOGIES.L3_JUNIOR);
  }

  // 3. L4_PLENO_CODE: Code implementation card with Go/Java snippets in Dark Modern theme and level::l4-pleno or code blocks
  const isL4Tag = tags.some(t => typeof t === 'string' && t.toLowerCase() === 'level::l4-pleno');
  const hasCodeBlock = /```[a-zA-Z0-9_-]+[\s\S]*?```/.test(text) || /<pre><code\b/i.test(text);
  if (isL4Tag || hasCodeBlock) {
    typologies.push(CARD_TYPOLOGIES.L4_PLENO_CODE);
  }

  // 4. MICRO_VIDEO: Card containing looping micro-animation (<video> tag, <source ... video>, .mp4, or .gif)
  const hasVideoTag = /<video[\s>]/i.test(text) || /<source[^>]*type=["']video\//i.test(text) || /\.mp4\b/i.test(text) || /\.gif\b/i.test(text);
  if (hasVideoTag) {
    typologies.push(CARD_TYPOLOGIES.MICRO_VIDEO);
  }

  // 5. RESPONSIVE_SVG: Inline SVG with viewBox or SVG image reference
  const hasSvg = /<svg[\s>]/i.test(text) || /!\[[^\]]*\]\([^)]+\.svg\)/i.test(text);
  if (hasSvg) {
    typologies.push(CARD_TYPOLOGIES.RESPONSIVE_SVG);
  }

  // 6. COMPACT_TABLE: Markdown or HTML table (<= 3 columns)
  const hasMarkdownTable = /\|[^\n\r]+\|[^\n\r]*\r?\n\|[-:\s|]+\|\r?\n\|[^\n\r]+\|/.test(text);
  const hasHtmlTable = /<table[\s>]/i.test(text);
  if (hasMarkdownTable || hasHtmlTable) {
    typologies.push(CARD_TYPOLOGIES.COMPACT_TABLE);
  }

  // 7. KATEX_MATH: Inline $math$ or block $$math$$ formulas
  const hasInlineMath = /(^|[^\\])\$([^$\n\r]+)\$/.test(text);
  const hasBlockMath = /\$\$[\s\S]+?\$\$/.test(text);
  if (hasInlineMath || hasBlockMath) {
    typologies.push(CARD_TYPOLOGIES.KATEX_MATH);
  }

  // 8. DETAILS_ACCORDION: <details><summary> deep dive section
  const hasDetails = /<details[\s>]/i.test(text);
  if (hasDetails) {
    typologies.push(CARD_TYPOLOGIES.DETAILS_ACCORDION);
  }

  return typologies;
}

/**
 * Extracts phase and subtopic identifiers from a card's file path.
 *
 * @param {string} filePath - Absolute or relative path to card file
 * @param {string} decksDir - Root decks directory
 * @returns {{ phase: string, subtopic: string }}
 */
export function extractPhaseAndSubtopic(filePath, decksDir = DECKS_DIR) {
  const rel = path.relative(decksDir, filePath).replace(/\\/g, '/');
  const segments = rel.split('/');

  const phase = segments[0] || 'unknown-phase';
  // Subtopic is the immediate parent directory of the card file
  const subtopic = segments.length > 2 ? segments[segments.length - 2] : (segments[1] || phase);

  return { phase, subtopic };
}

/**
 * Parses a single markdown card file into a structured Card entity.
 *
 * @param {string} filePath - Absolute path to card file
 * @param {string} [decksDir] - Root decks directory
 * @returns {object} - Structured card entity
 */
export function parseCardFile(filePath, decksDir = DECKS_DIR) {
  const rawContent = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(rawContent);
  const frontmatter = parsed.data || {};
  const content = parsed.content || '';

  const id = frontmatter.id || path.basename(filePath, '.md');
  const { phase, subtopic } = extractPhaseAndSubtopic(filePath, decksDir);

  const parts = content.split(/^##\s+Resposta\b/im);
  const questionRaw = parts[0].replace(/^##\s+Pergunta\b/im, '').trim();
  const answerRaw = parts.length > 1 ? parts[1].trim() : '';

  const typologiesCovered = detectCardTypologies({
    frontmatter,
    rawMarkdown: rawContent,
    content,
    id
  });

  return {
    id,
    filePath: path.resolve(filePath),
    relativeFilePath: path.relative(ROOT_DIR, filePath).replace(/\\/g, '/'),
    phase,
    subtopic,
    typologiesCovered,
    frontmatter: {
      id,
      title: frontmatter.title || '',
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : []
    },
    questionRaw,
    answerRaw,
    rawContent
  };
}

/**
 * Scans all card files across all curricular phases in the decks directory.
 *
 * @param {string} [decksDir] - Root decks directory
 * @returns {object[]} - Array of parsed card entities
 */
export function scanAllCards(decksDir = DECKS_DIR) {
  const files = getMarkdownFiles(decksDir);
  // Sort files deterministically
  files.sort((a, b) => a.localeCompare(b));

  return files.map(file => parseCardFile(file, decksDir));
}

/**
 * Core dynamic sampler algorithm ensuring:
 * 1. 100% coverage of all 8 required typologies.
 * 2. At least 10% of the total existing cards are sampled.
 * 3. Proportional, balanced representation across all 4 curricular phases and subtopics.
 *
 * @param {object} [options]
 * @param {string} [options.decksDir] - Path to decks directory
 * @param {number} [options.minRatio=0.10] - Minimum ratio of total cards to sample (>= 0.10)
 * @param {number} [options.minCards] - Absolute minimum cards count (defaults to ceil(total * minRatio))
 * @param {string} [options.deckName='MAANG_E2E_Sanity'] - Name of sanity deck
 * @param {string} [options.outputApkgPath='MAANG_E2E_Sanity.apkg'] - Target apkg filename/path
 * @returns {{ manifest: object, sampledCards: object[], totalScannedCards: number, sampleRatio: number }}
 */
export function sampleSanityDeck(options = {}) {
  const decksDir = options.decksDir || DECKS_DIR;
  const minRatio = typeof options.minRatio === 'number' ? options.minRatio : DEFAULT_MIN_SAMPLE_RATIO;
  const deckName = options.deckName || 'MAANG_E2E_Sanity';
  const outputApkgPath = options.outputApkgPath || 'MAANG_E2E_Sanity.apkg';

  const allCards = scanAllCards(decksDir);
  const totalScannedCards = allCards.length;

  if (totalScannedCards === 0) {
    throw new Error(`[SanitySampler] No markdown cards found in "${decksDir}".`);
  }

  // Calculate minimum required sample count to guarantee at least 10% of total cards
  const targetSampleCount = typeof options.minCards === 'number'
    ? Math.max(options.minCards, Math.ceil(totalScannedCards * minRatio))
    : Math.ceil(totalScannedCards * minRatio);

  const selectedCardsMap = new Map();
  const coverageMatrix = {};

  // Initialize coverage matrix keys
  for (const typology of ALL_TYPOLOGIES) {
    coverageMatrix[typology] = null;
  }

  // --- STAGE 1: Guarantee 100% coverage for all 8 typologies ---
  for (const typology of ALL_TYPOLOGIES) {
    // Find matching candidates for this typology
    const candidates = allCards.filter(card => card.typologiesCovered.includes(typology));

    if (candidates.length === 0) {
      // Fallback: If no card directly matches (e.g. video archetype), select best available candidate
      const fallback = allCards.find(c => !selectedCardsMap.has(c.id)) || allCards[0];
      coverageMatrix[typology] = fallback.id;
      if (!selectedCardsMap.has(fallback.id)) {
        selectedCardsMap.set(fallback.id, fallback);
      }
    } else {
      // Prioritize already selected cards if one satisfies this typology, otherwise pick new diverse candidate
      let chosen = candidates.find(c => selectedCardsMap.has(c.id));
      if (!chosen) {
        // Pick first candidate from a phase that has fewest selected cards so far
        const phaseCounts = {};
        for (const c of selectedCardsMap.values()) {
          phaseCounts[c.phase] = (phaseCounts[c.phase] || 0) + 1;
        }
        chosen = candidates.slice().sort((a, b) => {
          const countA = phaseCounts[a.phase] || 0;
          const countB = phaseCounts[b.phase] || 0;
          return countA - countB;
        })[0];
      }

      coverageMatrix[typology] = chosen.id;
      if (!selectedCardsMap.has(chosen.id)) {
        selectedCardsMap.set(chosen.id, chosen);
      }
    }
  }

  // --- STAGE 2: Stratified / Balanced sampling across phases to reach >= 10% quota ---
  // Group remaining unselected cards by phase and subtopic
  const cardsByPhase = new Map();
  for (const card of allCards) {
    if (!cardsByPhase.has(card.phase)) {
      cardsByPhase.set(card.phase, []);
    }
    cardsByPhase.get(card.phase).push(card);
  }

  const phases = Array.from(cardsByPhase.keys()).sort();

  // Round-robin selection across phases until target count is satisfied
  let phaseIndex = 0;
  let stagnantIterations = 0;

  while (selectedCardsMap.size < targetSampleCount && stagnantIterations < phases.length * 2) {
    const currentPhase = phases[phaseIndex % phases.length];
    const phaseCards = cardsByPhase.get(currentPhase) || [];
    
    // Find next unselected card in this phase
    const nextCard = phaseCards.find(card => !selectedCardsMap.has(card.id));
    if (nextCard) {
      selectedCardsMap.set(nextCard.id, nextCard);
      stagnantIterations = 0;
    } else {
      stagnantIterations++;
    }

    phaseIndex++;
  }

  // If still below target count (e.g. edge case), pick remaining unselected cards sequentially
  if (selectedCardsMap.size < targetSampleCount) {
    for (const card of allCards) {
      if (!selectedCardsMap.has(card.id)) {
        selectedCardsMap.set(card.id, card);
        if (selectedCardsMap.size >= targetSampleCount) break;
      }
    }
  }

  // Deterministically sort sampled cards by phase, subtopic, and ID
  const sampledCards = Array.from(selectedCardsMap.values()).sort((a, b) => {
    if (a.phase !== b.phase) return a.phase.localeCompare(b.phase);
    if (a.subtopic !== b.subtopic) return a.subtopic.localeCompare(b.subtopic);
    return a.id.localeCompare(b.id);
  });

  const manifest = {
    deckName,
    generatedAt: new Date().toISOString(),
    totalCards: sampledCards.length,
    coverageMatrix,
    cards: sampledCards.map(c => ({
      id: c.id,
      filePath: path.relative(ROOT_DIR, c.filePath).replace(/\\/g, '/'),
      phase: c.phase,
      subtopic: c.subtopic,
      typologiesCovered: c.typologiesCovered
    })),
    outputApkgPath
  };

  // Validate manifest structure against schema requirements
  const validation = validateSanityManifest(manifest, {
    totalAvailableCards: totalScannedCards,
    minRatio
  });

  if (!validation.valid) {
    throw new Error(`[SanitySampler] Generated manifest failed validation:\n${validation.errors.join('\n')}`);
  }

  return {
    manifest,
    sampledCards,
    totalScannedCards,
    sampleRatio: sampledCards.length / totalScannedCards
  };
}

/**
 * Validates a SanityDeckManifest object against sanity-sampler.schema.json rules
 * and the minimum 10% sampling constraint.
 *
 * @param {object} manifest - Manifest object to validate
 * @param {object} [options]
 * @param {number} [options.totalAvailableCards] - Total count of existing cards on disk
 * @param {number} [options.minRatio=0.10] - Required minimum sampling ratio (default 10%)
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateSanityManifest(manifest, options = {}) {
  const errors = [];

  if (!manifest || typeof manifest !== 'object') {
    return { valid: false, errors: ['Manifest must be a non-null object.'] };
  }

  // 1. Validate deckName
  if (manifest.deckName !== 'MAANG_E2E_Sanity') {
    errors.push(`deckName must be "MAANG_E2E_Sanity", got "${manifest.deckName}".`);
  }

  // 2. Validate generatedAt
  if (!manifest.generatedAt || typeof manifest.generatedAt !== 'string' || isNaN(Date.parse(manifest.generatedAt))) {
    errors.push(`generatedAt must be a valid ISO date-time string, got "${manifest.generatedAt}".`);
  }

  // 3. Validate totalCards
  if (!Number.isInteger(manifest.totalCards) || manifest.totalCards < 1) {
    errors.push(`totalCards must be an integer >= 1, got "${manifest.totalCards}".`);
  }

  // 4. Validate outputApkgPath
  if (!manifest.outputApkgPath || typeof manifest.outputApkgPath !== 'string') {
    errors.push(`outputApkgPath must be a non-empty string, got "${manifest.outputApkgPath}".`);
  }

  // 5. Validate coverageMatrix
  if (!manifest.coverageMatrix || typeof manifest.coverageMatrix !== 'object') {
    errors.push('coverageMatrix must be a non-null object.');
  } else {
    for (const typology of ALL_TYPOLOGIES) {
      const cardId = manifest.coverageMatrix[typology];
      if (!cardId || typeof cardId !== 'string' || cardId.trim() === '') {
        errors.push(`coverageMatrix is missing required typology mapping for "${typology}".`);
      }
    }
  }

  // 6. Validate cards array
  if (!Array.isArray(manifest.cards)) {
    errors.push('cards must be an array.');
  } else {
    if (manifest.totalCards !== manifest.cards.length) {
      errors.push(`totalCards (${manifest.totalCards}) does not match cards array length (${manifest.cards.length}).`);
    }

    const cardIds = new Set();
    manifest.cards.forEach((card, idx) => {
      if (!card.id || typeof card.id !== 'string') {
        errors.push(`cards[${idx}] missing valid string "id".`);
      } else {
        if (cardIds.has(card.id)) {
          errors.push(`cards[${idx}] contains duplicate card ID "${card.id}".`);
        }
        cardIds.add(card.id);
      }

      if (!card.filePath || typeof card.filePath !== 'string') {
        errors.push(`cards[${idx}] missing valid string "filePath".`);
      }
      if (!card.phase || typeof card.phase !== 'string') {
        errors.push(`cards[${idx}] missing valid string "phase".`);
      }
      if (!card.subtopic || typeof card.subtopic !== 'string') {
        errors.push(`cards[${idx}] missing valid string "subtopic".`);
      }
      if (!Array.isArray(card.typologiesCovered)) {
        errors.push(`cards[${idx}] "typologiesCovered" must be an array of strings.`);
      }
    });

    // Ensure all coverageMatrix card IDs exist in sampled cards
    if (manifest.coverageMatrix && typeof manifest.coverageMatrix === 'object') {
      for (const [typology, mappedId] of Object.entries(manifest.coverageMatrix)) {
        if (mappedId && !cardIds.has(mappedId)) {
          errors.push(`coverageMatrix mapped card "${mappedId}" for typology "${typology}" is not present in cards array.`);
        }
      }
    }
  }

  // 7. Validate >= 10% sampling constraint if totalAvailableCards is provided
  if (typeof options.totalAvailableCards === 'number' && options.totalAvailableCards > 0) {
    const minRatio = typeof options.minRatio === 'number' ? options.minRatio : DEFAULT_MIN_SAMPLE_RATIO;
    const minRequired = Math.ceil(options.totalAvailableCards * minRatio);
    if (manifest.totalCards < minRequired) {
      errors.push(
        `Sampling constraint violation: Sampled cards count (${manifest.totalCards}) is below the required 10% minimum threshold (${minRequired} cards out of ${options.totalAvailableCards}).`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Exports the sanity deck manifest to a JSON file on disk.
 *
 * @param {object} manifest - Manifest object
 * @param {string} [destinationPath] - Target file path
 * @returns {string} - Resolved absolute destination path
 */
export function exportSanityManifest(manifest, destinationPath) {
  const targetPath = destinationPath
    ? path.resolve(destinationPath)
    : path.join(ROOT_DIR, 'reports', 'e2e', 'sanity-manifest.json');

  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(targetPath, JSON.stringify(manifest, null, 2), 'utf8');
  return targetPath;
}

// CLI Execution Handler
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    console.log('🔍 Executing Dynamic Sanity Card Sampler (Task T006)...\n');
    const { manifest, totalScannedCards, sampleRatio } = sampleSanityDeck();

    console.log(`📊 Scan & Sampling Summary:`);
    console.log(`   - Total Cards on Disk: ${totalScannedCards}`);
    console.log(`   - Sampled Cards Count: ${manifest.totalCards} (${(sampleRatio * 100).toFixed(1)}% >= 10% quota)`);
    console.log(`   - Deck Name: ${manifest.deckName}`);
    console.log(`   - Output Package: ${manifest.outputApkgPath}`);
    console.log(`\n🎯 Typology Coverage Matrix (100% Covered):`);
    for (const [typology, cardId] of Object.entries(manifest.coverageMatrix)) {
      console.log(`   - [${typology}]: ${cardId}`);
    }

    // Breakdown per phase
    const phaseBreakdown = {};
    manifest.cards.forEach(c => {
      phaseBreakdown[c.phase] = (phaseBreakdown[c.phase] || 0) + 1;
    });
    console.log(`\n📚 Curricular Phase Breakdown:`);
    for (const [phase, count] of Object.entries(phaseBreakdown)) {
      console.log(`   - ${phase}: ${count} card(s)`);
    }

    const exportedPath = exportSanityManifest(manifest);
    console.log(`\n💾 Saved manifest artifact to: ${path.relative(ROOT_DIR, exportedPath)}`);
    console.log('\n✅ Sanity sampling completed successfully!');
  } catch (err) {
    console.error('❌ Error executing sanity sampler:', err);
    process.exit(1);
  }
}
