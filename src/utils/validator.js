import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import katex from 'katex';

const ID_REGEX = /^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[0-9]{3}$/;
const TAG_LEVEL_REGEX = /^level::(l2-fundamental|l3-junior|l4-pleno|l5-senior)$/;
const TAG_TOPIC_REGEX = /^topic::[a-z0-9_-]+::[a-z0-9_-]+$/;
const TAG_COMPANY_REGEX = /^company::[a-z0-9_-]+$/;
const TAG_FREQ_REGEX = /^freq::(high|medium|low)$/;

export const PLACEHOLDER_DOMAINS = new Set([
  'assets.faang-anki.dev',
  'example.com',
  'example.org',
  'localhost',
  'placeholder.com'
]);

/**
 * Checks if a hostname or URL belongs to a prohibited placeholder domain.
 * @param {string} domainOrUrl - Domain hostname or full URL string
 * @returns {boolean}
 */
export function isPlaceholderDomain(domainOrUrl) {
  if (!domainOrUrl || typeof domainOrUrl !== 'string') return false;
  let hostname = domainOrUrl.trim().toLowerCase();
  try {
    if (hostname.includes('://')) {
      hostname = new URL(hostname).hostname.toLowerCase();
    }
  } catch {
    // If not a full valid URL, retain raw string
  }
  for (const placeholder of PLACEHOLDER_DOMAINS) {
    if (hostname === placeholder || hostname.endsWith(`.${placeholder}`)) {
      return true;
    }
  }
  return false;
}

const ALLOWED_LANGUAGES = new Set([
  'go', 'java', 'python', 'sql', 'bash', 'sh', 'javascript', 'js',
  'typescript', 'ts', 'c', 'cpp', 'rust', 'json', 'yaml', 'yml',
  'text', 'plaintext', 'html', 'css', 'diff'
]);

/**
 * Validates an asset reference (remote URL or local file path).
 * @param {string} assetPath - Asset path or URL
 * @param {string|null} cardDir - Directory containing the card file, or null
 * @param {string} mediaType - Descriptive media type ('remote asset' or 'video asset')
 * @param {string[]} errors - Accumulator array for validation errors
 */
function validateAssetReference(assetPath, cardDir, mediaType, errors) {
  if (!assetPath || typeof assetPath !== 'string') return;
  const trimmedPath = assetPath.trim();

  if (trimmedPath.startsWith('http://') || trimmedPath.startsWith('https://')) {
    if (trimmedPath.startsWith('http://')) {
      errors.push(`Insecure HTTP ${mediaType} "${trimmedPath}". Remote ${mediaType.includes('video') ? 'videos' : 'assets'} MUST use secure HTTPS.`);
    }

    try {
      const parsedUrl = new URL(trimmedPath);
      if (parsedUrl.protocol !== 'https:' && !trimmedPath.startsWith('http://')) {
        errors.push(`Insecure protocol "${parsedUrl.protocol}" in ${mediaType} "${trimmedPath}". Remote assets MUST use secure HTTPS.`);
      }

      const hostname = parsedUrl.hostname.toLowerCase();
      if (isPlaceholderDomain(hostname)) {
        errors.push(`Prohibited placeholder domain "${hostname}" found in ${mediaType} "${trimmedPath}". Remote assets must use verified public URLs.`);
      }
    } catch (err) {
      errors.push(`Malformed remote URL in ${mediaType} "${trimmedPath}": ${err.message}`);
    }
  } else if (trimmedPath.startsWith('assets/')) {
    if (cardDir) {
      const fullAssetPath = path.resolve(cardDir, trimmedPath);
      if (!fs.existsSync(fullAssetPath)) {
        errors.push(`Referenced local ${mediaType.includes('video') ? 'video ' : ''}asset not found: "${trimmedPath}" (resolved to ${fullAssetPath})`);
      }
    }
  }
}

/**
 * Validates a flashcard markdown string and frontmatter.
 * @param {string} filePath - Absolute or relative file path to the .md file
 * @param {string} rawContent - Raw text content of the markdown file
 * @returns {{ valid: boolean, errors: string[], frontmatter?: object, content?: string }}
 */
export function validateCard(filePath, rawContent) {
  const errors = [];

  let parsed;
  try {
    parsed = matter(rawContent);
  } catch (err) {
    return { valid: false, errors: [`Frontmatter YAML parsing error: ${err.message}`] };
  }

  const { data: frontmatter, content } = parsed;

  // 1. Validate ID
  if (!frontmatter.id) {
    errors.push('Missing required frontmatter field: "id"');
  } else if (!ID_REGEX.test(frontmatter.id)) {
    errors.push(`Invalid id "${frontmatter.id}". Must match format: ^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[0-9]{3}$ (e.g. CS-ARCH-CACHE-001)`);
  }

  // 2. Validate Title
  if (!frontmatter.title) {
    errors.push('Missing required frontmatter field: "title"');
  } else if (typeof frontmatter.title !== 'string' || frontmatter.title.length < 3 || frontmatter.title.length > 120) {
    errors.push(`Invalid title length: must be between 3 and 120 characters (got ${frontmatter.title?.length || 0})`);
  }

  // 3. Validate Tags
  if (!frontmatter.tags || !Array.isArray(frontmatter.tags)) {
    errors.push('Missing or invalid frontmatter field: "tags" must be an array of strings');
  } else {
    const tags = frontmatter.tags;
    if (tags.length < 3) {
      errors.push(`Tags array must contain at least 3 items (got ${tags.length})`);
    }

    const levelTags = tags.filter(t => TAG_LEVEL_REGEX.test(t));
    const topicTags = tags.filter(t => TAG_TOPIC_REGEX.test(t));
    const freqTags = tags.filter(t => TAG_FREQ_REGEX.test(t));
    const companyTags = tags.filter(t => TAG_COMPANY_REGEX.test(t));

    if (levelTags.length !== 1) {
      errors.push(`Must have exactly 1 level tag (level::l2-fundamental, level::l3-junior, level::l4-pleno, level::l5-senior). Found ${levelTags.length}`);
    }

    if (topicTags.length < 1) {
      errors.push(`Must have at least 1 topic tag (topic::<phase>::<subtopic>). Found ${topicTags.length}`);
    }

    if (freqTags.length !== 1) {
      errors.push(`Must have exactly 1 freq tag (freq::high, freq::medium, freq::low). Found ${freqTags.length}`);
    }

    for (const tag of tags) {
      if (
        !TAG_LEVEL_REGEX.test(tag) &&
        !TAG_TOPIC_REGEX.test(tag) &&
        !TAG_FREQ_REGEX.test(tag) &&
        !TAG_COMPANY_REGEX.test(tag)
      ) {
        errors.push(`Invalid tag format "${tag}". Must conform to level::*, topic::*::*, company::*, or freq::*`);
      }
    }
  }

  // 4. Validate Section Headings
  const perguntaMatches = content.match(/^##\s+Pergunta\b/gim) || [];
  const respostaMatches = content.match(/^##\s+Resposta\b/gim) || [];

  if (perguntaMatches.length !== 1) {
    errors.push(`Card must contain exactly one "## Pergunta" heading (found ${perguntaMatches.length})`);
  }

  if (respostaMatches.length !== 1) {
    errors.push(`Card must contain exactly one "## Resposta" heading (found ${respostaMatches.length})`);
  }

  // 5. Validate Single-Concept Question Atomicity (Principle II)
  if (perguntaMatches.length === 1 && respostaMatches.length === 1) {
    const parts = content.split(/^##\s+Resposta\b/im);
    const questionText = parts[0].replace(/^##\s+Pergunta\b/im, '').trim();
    if (!questionText) {
      errors.push('Card has an empty "## Pergunta" section');
    } else {
      // Strip code blocks and inline code before checking punctuation
      const cleanQuestion = questionText
        .replace(/```[\s\S]*?```/g, '')
        .replace(/`[^`]+`/g, '');
      
      const questionMarks = (cleanQuestion.match(/\?/g) || []).length;
      if (questionMarks > 1) {
        errors.push(`Card question contains ${questionMarks} question marks. Cards must be atomic and test a single indivisible question/concept (Single-Concept Rule).`);
      }
    }
  }

  // 6. Validate Code Blocks & Language Declarations (Principle III)
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
  let codeMatch;
  while ((codeMatch = codeBlockRegex.exec(content)) !== null) {
    const lang = (codeMatch[1] || '').trim().toLowerCase();
    if (!lang) {
      errors.push('Code block missing language declaration (e.g. ```go, ```java, ```text). All code blocks must specify a language.');
    } else if (!ALLOWED_LANGUAGES.has(lang)) {
      errors.push(`Unrecognized or unstyled code language "${lang}". Use one of: ${Array.from(ALLOWED_LANGUAGES).join(', ')}`);
    }
  }

  // 7. Validate Mobile-First Table Constraints (Principle I)
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      const colCount = line.split('|').filter((_, idx, arr) => idx > 0 && idx < arr.length - 1).length;
      if (colCount > 3) {
        errors.push(`Markdown table on line ${i + 1} has ${colCount} columns. Mobile-first constitution limits tables to max 3 columns to prevent horizontal scroll.`);
      }
      // Check for long unbroken character bars
      if (/[█▓▒░#]{10,}/.test(line)) {
        errors.push(`Markdown table on line ${i + 1} contains long unbroken character bars. Use compact notation or visual CSS indicators.`);
      }
    }
  }

  // 8. Validate Asset References (Local assets & Remote HTTPS media/videos)
  const cardDir = filePath ? path.dirname(filePath) : null;

  // Markdown images ![alt](path_or_url)
  const mdImgRegex = /!\[.*?\]\(([^)]+)\)/g;
  let match;
  while ((match = mdImgRegex.exec(content)) !== null) {
    validateAssetReference(match[1], cardDir, 'remote asset', errors);
  }

  // HTML images <img src="...">
  const htmlImgRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
  while ((match = htmlImgRegex.exec(content)) !== null) {
    validateAssetReference(match[1], cardDir, 'remote asset', errors);
  }

  // HTML Videos <video src="..."> or <source src="...">
  const videoSrcRegex = /<(?:video|source)\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
  while ((match = videoSrcRegex.exec(content)) !== null) {
    validateAssetReference(match[1], cardDir, 'video asset', errors);
  }

  // 9. Validate LaTeX Mathematical Expressions
  const blockMathRegex = /\$\$([\s\S]+?)\$\$/g;
  let blockMathMatch;
  while ((blockMathMatch = blockMathRegex.exec(content)) !== null) {
    const formula = blockMathMatch[1].trim();
    try {
      katex.renderToString(formula, { displayMode: true, throwOnError: true });
    } catch (err) {
      errors.push(`Invalid LaTeX block math "$$${formula}$$": ${err.message}`);
    }
  }

  const cleanContent = content.replace(/\$\$[\s\S]+?\$\$/g, '');
  const inlineMathRegex = /\$((?:\\\$|[^$\n])+?)\$/g;
  let inlineMathMatch;
  while ((inlineMathMatch = inlineMathRegex.exec(cleanContent)) !== null) {
    const formula = inlineMathMatch[1].trim();
    try {
      katex.renderToString(formula, { displayMode: false, throwOnError: true });
    } catch (err) {
      errors.push(`Invalid LaTeX inline math "$${formula}$": ${err.message}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    frontmatter,
    content
  };
}

/**
 * Validates the curriculum manifest object.
 * @param {object} manifest - Parsed syllabus_manifest.json
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateManifest(manifest) {
  const errors = [];
  if (!manifest || typeof manifest !== 'object') {
    return { valid: false, errors: ['Manifest must be a valid JSON object'] };
  }

  if (!manifest.version || typeof manifest.version !== 'string') {
    errors.push('Manifest missing required string "version"');
  }

  if (!manifest.last_updated || typeof manifest.last_updated !== 'string') {
    errors.push('Manifest missing required string "last_updated"');
  }

  if (!Array.isArray(manifest.phases)) {
    errors.push('Manifest missing required array "phases"');
  } else {
    for (const phase of manifest.phases) {
      if (!phase.id || !phase.title || !Array.isArray(phase.modules)) {
        errors.push(`Invalid phase entry: ${JSON.stringify(phase)}`);
        continue;
      }
      for (const mod of phase.modules) {
        if (!mod.id || !mod.title || !Array.isArray(mod.subtopics)) {
          errors.push(`Invalid module entry in phase ${phase.id}: ${JSON.stringify(mod)}`);
          continue;
        }
        for (const subtopic of mod.subtopics) {
          if (!subtopic.id || !subtopic.title || !subtopic.status || !Array.isArray(subtopic.card_ids)) {
            errors.push(`Invalid subtopic entry in module ${mod.id}: ${JSON.stringify(subtopic)}`);
          }
          if (!['pending', 'in_progress', 'completed'].includes(subtopic.status)) {
            errors.push(`Invalid subtopic status "${subtopic.status}" in subtopic ${subtopic.id}`);
          }
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

const REGISTRY_VERSION_REGEX = /^[0-9]+\.[0-9]+\.[0-9]+$/;
const REGISTRY_SUBTOPIC_REGEX = /^[a-z0-9_-]+$/;
const REGISTRY_URL_REGEX = /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;

export const VALID_TIERS = new Set([
  'P1_MICRO_VIDEO',
  'P2_RESPONSIVE_SVG',
  'P2_TABLE_FALLBACK',
  'LOCAL_ASSET'
]);

export const VALID_MEDIA_TYPES = new Set([
  'video/mp4',
  'video/webm',
  'image/svg+xml',
  'image/webp',
  'image/gif',
  'image/png',
  'inline_svg',
  'markdown_table',
  'mp4',
  'webm',
  'gif'
]);

export const VALID_ENTRY_STATUSES = new Set([
  'verified',
  'pending',
  'pending_injection',
  'deprecated'
]);

/**
 * Validates a media curation registry object against media-curation-registry.schema.json.
 * @param {object} registry - Parsed media-curation-registry.json
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateMediaCurationRegistry(registry) {
  const errors = [];
  if (!registry || typeof registry !== 'object' || Array.isArray(registry)) {
    return { valid: false, errors: ['Media Curation Registry must be a valid non-null JSON object'] };
  }

  const allowedTopKeys = new Set(['version', 'last_updated', 'stats', 'cards']);
  for (const key of Object.keys(registry)) {
    if (!allowedTopKeys.has(key)) {
      errors.push(`Registry contains disallowed top-level property: "${key}"`);
    }
  }

  // 1. Version
  if (!registry.version || typeof registry.version !== 'string' || !REGISTRY_VERSION_REGEX.test(registry.version)) {
    errors.push(`Registry missing or invalid "version" (expected semver string like "1.0.0", got "${registry.version}")`);
  }

  // 2. Last Updated
  if (!registry.last_updated || typeof registry.last_updated !== 'string' || isNaN(Date.parse(registry.last_updated))) {
    errors.push('Registry missing or invalid "last_updated" (ISO 8601 date-time string expected)');
  }

  // 3. Stats
  if (!registry.stats || typeof registry.stats !== 'object' || Array.isArray(registry.stats)) {
    errors.push('Registry missing or invalid "stats" object');
  } else {
    const allowedStatsKeys = new Set(['total_cards', 'p1_video_count', 'p2_svg_count', 'p2_table_count']);
    for (const key of Object.keys(registry.stats)) {
      if (!allowedStatsKeys.has(key)) {
        errors.push(`Registry stats contains disallowed property: "${key}"`);
      }
    }

    const statFields = ['total_cards', 'p1_video_count', 'p2_svg_count', 'p2_table_count'];
    for (const field of statFields) {
      const val = registry.stats[field];
      if (!Number.isInteger(val) || val < 0) {
        errors.push(`Registry stats field "${field}" must be a non-negative integer (got ${val})`);
      }
    }
  }

  // 4. Cards
  if (!registry.cards || typeof registry.cards !== 'object' || Array.isArray(registry.cards)) {
    errors.push('Registry missing or invalid "cards" object');
  } else {
    const allowedEntryKeys = new Set([
      'card_id',
      'subtopic_id',
      'concept',
      'tier',
      'url',
      'media_type',
      'attribution',
      'license',
      'caption',
      'status',
      'last_verified'
    ]);

    for (const [cardKey, entry] of Object.entries(registry.cards)) {
      if (!ID_REGEX.test(cardKey)) {
        errors.push(`Disallowed card key format "${cardKey}". Must match ^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[0-9]{3}$`);
      }

      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
        errors.push(`Card entry for "${cardKey}" must be a non-null object`);
        continue;
      }

      for (const key of Object.keys(entry)) {
        if (!allowedEntryKeys.has(key)) {
          errors.push(`Card entry [${cardKey}] contains disallowed property: "${key}"`);
        }
      }

      // card_id
      if (!entry.card_id || typeof entry.card_id !== 'string' || !ID_REGEX.test(entry.card_id)) {
        errors.push(`Card entry [${cardKey}] missing or invalid "card_id"`);
      } else if (entry.card_id !== cardKey) {
        errors.push(`Card entry key "${cardKey}" does not match entry.card_id "${entry.card_id}"`);
      }

      // subtopic_id
      if (!entry.subtopic_id || typeof entry.subtopic_id !== 'string' || !REGISTRY_SUBTOPIC_REGEX.test(entry.subtopic_id)) {
        errors.push(`Card entry [${cardKey}] missing or invalid "subtopic_id"`);
      }

      // concept
      if (!entry.concept || typeof entry.concept !== 'string' || entry.concept.length < 3 || entry.concept.length > 150) {
        errors.push(`Card entry [${cardKey}] "concept" must be a string between 3 and 150 characters`);
      }

      // tier
      if (!entry.tier || typeof entry.tier !== 'string' || !VALID_TIERS.has(entry.tier)) {
        errors.push(`Card entry [${cardKey}] invalid "tier" "${entry.tier}". Must be one of: ${Array.from(VALID_TIERS).join(', ')}`);
      }

      // media_type
      if (!entry.media_type || typeof entry.media_type !== 'string' || !VALID_MEDIA_TYPES.has(entry.media_type)) {
        errors.push(`Card entry [${cardKey}] invalid "media_type" "${entry.media_type}". Must be one of: ${Array.from(VALID_MEDIA_TYPES).join(', ')}`);
      }

      // attribution
      if (!entry.attribution || typeof entry.attribution !== 'string' || entry.attribution.length < 2 || entry.attribution.length > 200) {
        errors.push(`Card entry [${cardKey}] "attribution" must be a string between 2 and 200 characters`);
      }

      // license
      if (!entry.license || typeof entry.license !== 'string' || entry.license.length < 2 || entry.license.length > 100) {
        errors.push(`Card entry [${cardKey}] "license" must be a string between 2 and 100 characters`);
      }

      // caption
      if (!entry.caption || typeof entry.caption !== 'string' || entry.caption.length < 5 || entry.caption.length > 300) {
        errors.push(`Card entry [${cardKey}] "caption" must be a string between 5 and 300 characters`);
      }

      // status
      if (!entry.status || typeof entry.status !== 'string' || !VALID_ENTRY_STATUSES.has(entry.status)) {
        errors.push(`Card entry [${cardKey}] invalid "status" "${entry.status}". Must be one of: ${Array.from(VALID_ENTRY_STATUSES).join(', ')}`);
      }

      // url (optional unless P1_MICRO_VIDEO, but if present must be valid HTTPS and not placeholder)
      if (entry.tier === 'P1_MICRO_VIDEO' && !entry.url) {
        errors.push(`Card entry [${cardKey}] with tier P1_MICRO_VIDEO requires a valid "url"`);
      }

      if (entry.url !== undefined) {
        if (typeof entry.url !== 'string' || !REGISTRY_URL_REGEX.test(entry.url)) {
          errors.push(`Card entry [${cardKey}] invalid "url" format "${entry.url}". Must be a valid HTTPS URL.`);
        } else if (isPlaceholderDomain(entry.url)) {
          errors.push(`Card entry [${cardKey}] contains prohibited placeholder domain in url: "${entry.url}"`);
        }
      }

      // last_verified (optional)
      if (entry.last_verified !== undefined) {
        if (typeof entry.last_verified !== 'string' || isNaN(Date.parse(entry.last_verified))) {
          errors.push(`Card entry [${cardKey}] invalid "last_verified" (expected ISO 8601 date-time string)`);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
