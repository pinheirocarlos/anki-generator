import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import katex from 'katex';

const ID_REGEX = /^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[0-9]{3}$/;
const TAG_LEVEL_REGEX = /^level::(l2-fundamental|l3-junior|l4-pleno|l5-senior)$/;
const TAG_TOPIC_REGEX = /^topic::[a-z0-9_-]+::[a-z0-9_-]+$/;
const TAG_COMPANY_REGEX = /^company::[a-z0-9_-]+$/;
const TAG_FREQ_REGEX = /^freq::(high|medium|low)$/;

const ALLOWED_LANGUAGES = new Set([
  'go', 'java', 'python', 'sql', 'bash', 'sh', 'javascript', 'js',
  'typescript', 'ts', 'c', 'cpp', 'rust', 'json', 'yaml', 'yml',
  'text', 'plaintext', 'html', 'css', 'diff'
]);

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
  if (filePath) {
    const cardDir = path.dirname(filePath);
    
    // Markdown images ![alt](path_or_url)
    const mdImgRegex = /!\[.*?\]\(([^)]+)\)/g;
    let match;
    while ((match = mdImgRegex.exec(content)) !== null) {
      const assetPath = match[1].trim();
      if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
        if (assetPath.startsWith('http://')) {
          errors.push(`Insecure HTTP remote asset "${assetPath}". Remote assets MUST use secure HTTPS.`);
        }
      } else if (assetPath.startsWith('assets/')) {
        const fullAssetPath = path.resolve(cardDir, assetPath);
        if (!fs.existsSync(fullAssetPath)) {
          errors.push(`Referenced local asset not found: "${assetPath}" (resolved to ${fullAssetPath})`);
        }
      }
    }

    // HTML images <img src="...">
    const htmlImgRegex = /<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
    while ((match = htmlImgRegex.exec(content)) !== null) {
      const assetPath = match[1].trim();
      if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
        if (assetPath.startsWith('http://')) {
          errors.push(`Insecure HTTP remote asset "${assetPath}". Remote assets MUST use secure HTTPS.`);
        }
      } else if (assetPath.startsWith('assets/')) {
        const fullAssetPath = path.resolve(cardDir, assetPath);
        if (!fs.existsSync(fullAssetPath)) {
          errors.push(`Referenced local asset not found: "${assetPath}" (resolved to ${fullAssetPath})`);
        }
      }
    }

    // HTML Videos <video src="..."> or <source src="...">
    const videoSrcRegex = /<(?:video|source)\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
    while ((match = videoSrcRegex.exec(content)) !== null) {
      const assetPath = match[1].trim();
      if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
        if (assetPath.startsWith('http://')) {
          errors.push(`Insecure HTTP video asset "${assetPath}". Remote videos MUST use secure HTTPS.`);
        }
      } else if (assetPath.startsWith('assets/')) {
        const fullAssetPath = path.resolve(cardDir, assetPath);
        if (!fs.existsSync(fullAssetPath)) {
          errors.push(`Referenced local video asset not found: "${assetPath}" (resolved to ${fullAssetPath})`);
        }
      }
    }
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
