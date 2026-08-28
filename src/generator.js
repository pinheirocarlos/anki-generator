import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';
import katex from 'katex';
import { createRequire } from 'module';
import initSqlJs from 'sql.js';
import { validateCard } from './utils/validator.js';
import { resolveMedia } from './utils/media-resolver.js';

const require = createRequire(import.meta.url);
const { Exporter } = require('anki-apkg-export');
const createTemplate = require('anki-apkg-export/dist/template').default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const DECKS_DIR = path.join(ROOT_DIR, 'decks');

/**
 * Mandatory mobile playback flags for looping micro-videos across Anki Desktop and mobile WebViews.
 */
export const MANDATORY_VIDEO_ATTRIBUTES = [
  'autoplay',
  'loop',
  'muted',
  'playsinline',
  'webkit-playsinline',
  'disableRemotePlayback'
];

/**
 * Ensures all <video> tags contain mandatory mobile playback attributes
 * (autoplay loop muted playsinline webkit-playsinline disableRemotePlayback)
 * and are wrapped in responsive container classes (.video-wrapper / .media-container).
 *
 * @param {string} html - Raw or parsed HTML content
 * @returns {string} - Post-processed HTML with resilient video attributes and wrappers
 */
export function ensureVideoAttributesAndContainers(html) {
  if (!html || typeof html !== 'string' || !html.includes('<video')) {
    return html;
  }

  // 1. Inject missing mandatory mobile attributes into opening <video> tags
  let processed = html.replace(/<video(\s+[^>]*)?>/gi, (match, attrs = '') => {
    let cleanAttrs = (attrs || '').trim();
    for (const attr of MANDATORY_VIDEO_ATTRIBUTES) {
      const attrRegex = new RegExp(`(?:^|\\s)${attr}(?:\\s|=|$)`, 'i');
      if (!attrRegex.test(cleanAttrs)) {
        cleanAttrs = `${attr} ${cleanAttrs}`.trim();
      }
    }
    return `<video ${cleanAttrs}>`;
  });

  // 2. Wrap any unwrapped <video ...>...</video> elements into responsive <div class="video-wrapper">
  processed = processed.replace(
    /(<div\s+class=["'][^"']*\b(?:video-wrapper|media-container)\b[^"']*["'][^>]*>[\s\S]*?<\/div>)|(<video[\s\S]*?<\/video>)/gi,
    (fullMatch, wrappedBlock, unwrappedVideo) => {
      if (wrappedBlock) {
        return wrappedBlock;
      }
      if (unwrappedVideo) {
        return `<div class="video-wrapper">\n  ${unwrappedVideo}\n</div>`;
      }
      return fullMatch;
    }
  );

  return processed;
}

// Read KaTeX CSS for zero-CDN offline embedding
let katexCss = '';
try {
  const katexCssPath = path.join(ROOT_DIR, 'node_modules', 'katex', 'dist', 'katex.min.css');
  if (fs.existsSync(katexCssPath)) {
    katexCss = fs.readFileSync(katexCssPath, 'utf8');
  }
} catch (err) {
  console.warn('⚠️ Could not load KaTeX CSS:', err.message);
}

// KaTeX marked extensions for Math rendering (inline $...$ and block $$...$$)
export const mathInlineExtension = {
  name: 'mathInline',
  level: 'inline',
  start(src) {
    let index = src.indexOf('$');
    while (index !== -1) {
      if (index === 0 || src[index - 1] !== '\\') {
        return index;
      }
      index = src.indexOf('$', index + 1);
    }
    return -1;
  },
  tokenizer(src, tokens) {
    // Check if it's block math $$...$$ encountered in inline context (e.g. inside list item)
    if (src.startsWith('$$')) {
      const blockMatch = src.match(/^\$\$([\s\S]+?)\$\$/);
      if (blockMatch) {
        return {
          type: 'mathInline',
          raw: blockMatch[0],
          text: blockMatch[1].trim(),
          displayMode: true
        };
      }
    }
    const inlineMatch = src.match(/^\$((?:\\\$|[^$\n])+?)\$/);
    if (inlineMatch) {
      return {
        type: 'mathInline',
        raw: inlineMatch[0],
        text: inlineMatch[1].trim(),
        displayMode: false
      };
    }
  },
  renderer(token) {
    try {
      const rendered = katex.renderToString(token.text, {
        displayMode: token.displayMode || false,
        throwOnError: false
      });
      return token.displayMode ? `<div class="math-block">${rendered}</div>` : rendered;
    } catch (e) {
      return token.raw;
    }
  }
};

export const mathBlockExtension = {
  name: 'mathBlock',
  level: 'block',
  start(src) {
    return src.indexOf('$$');
  },
  tokenizer(src, tokens) {
    const blockMatch = src.match(/^\$\$([\s\S]+?)\$\$(?:\n+|$)/);
    if (blockMatch) {
      return {
        type: 'mathBlock',
        raw: blockMatch[0],
        text: blockMatch[1].trim()
      };
    }
  },
  renderer(token) {
    try {
      return `<div class="math-block">${katex.renderToString(token.text, {
        displayMode: true,
        throwOnError: false
      })}</div>\n`;
    } catch (e) {
      return token.raw;
    }
  }
};

// Configure custom marked renderer for Syntax Highlighting and Responsive Tables
const renderer = new marked.Renderer();

renderer.code = function (codeArg, langArg) {
  const text = typeof codeArg === 'object' && codeArg !== null ? codeArg.text : codeArg;
  const lang = typeof codeArg === 'object' && codeArg !== null ? codeArg.lang : langArg;

  const cleanLang = (lang || '').trim().toLowerCase();
  let highlighted = '';
  let displayLang = cleanLang ? cleanLang.toUpperCase() : 'CODE';

  if (cleanLang === 'go') displayLang = 'Go';
  else if (cleanLang === 'java') displayLang = 'Java';
  else if (cleanLang === 'python') displayLang = 'Python';
  else if (cleanLang === 'sql') displayLang = 'SQL';
  else if (cleanLang === 'bash' || cleanLang === 'sh') displayLang = 'Bash';
  else if (cleanLang === 'c' || cleanLang === 'cpp') displayLang = cleanLang.toUpperCase();
  else if (cleanLang === 'rust') displayLang = 'Rust';
  else if (cleanLang === 'javascript' || cleanLang === 'js') displayLang = 'JavaScript';
  else if (cleanLang === 'typescript' || cleanLang === 'ts') displayLang = 'TypeScript';

  if (cleanLang && hljs.getLanguage(cleanLang)) {
    try {
      highlighted = hljs.highlight(text, { language: cleanLang }).value;
    } catch (err) {
      highlighted = hljs.highlightAuto(text).value;
    }
  } else {
    highlighted = hljs.highlightAuto(text).value;
  }

  return `
    <div class="code-block">
      <div class="code-header">
        <span class="code-lang-badge">${displayLang}</span>
      </div>
      <pre><code class="hljs ${cleanLang ? 'language-' + cleanLang : ''}">${highlighted}</code></pre>
    </div>
  `;
};

renderer.table = function (token) {
  // Support both marked v12+ token object and older (header, rows)
  if (token && Array.isArray(token.header)) {
    let headerCells = '';
    token.header.forEach((cell, i) => {
      const align = token.align && token.align[i] ? ` align="${token.align[i]}"` : '';
      const cellContent = this.parser ? this.parser.parseInline(cell.tokens) : (cell.text || '');
      headerCells += `<th${align}>${cellContent}</th>`;
    });

    let bodyRows = '';
    if (Array.isArray(token.rows)) {
      token.rows.forEach(row => {
        let rowCells = '';
        row.forEach((cell, i) => {
          const align = token.align && token.align[i] ? ` align="${token.align[i]}"` : '';
          const cellContent = this.parser ? this.parser.parseInline(cell.tokens) : (cell.text || '');
          rowCells += `<td${align}>${cellContent}</td>`;
        });
        bodyRows += `<tr>${rowCells}</tr>`;
      });
    }

    return `
      <div class="table-responsive">
        <table>
          <thead><tr>${headerCells}</tr></thead>
          <tbody>${bodyRows}</tbody>
        </table>
      </div>
    `;
  }

  // Fallback for string signatures
  return `
    <div class="table-responsive">
      <table>
        <thead>${token}</thead>
        <tbody>${arguments[1] || ''}</tbody>
      </table>
    </div>
  `;
};

marked.use({
  renderer,
  extensions: [mathBlockExtension, mathInlineExtension],
  gfm: true,
  breaks: true
});

// Mobile-First CSS Design System (Dark/Light themes, AnkiDroid resets, touch accordion, zero-scroll code)
export const cardCss = `
:root {
  --bg-primary: #f8fafc;
  --bg-card: #ffffff;
  --bg-secondary: #f1f5f9;
  --bg-code: #0d1117;
  --bg-code-header: #161b22;
  --text-primary: #0f172a;
  --text-secondary: #334155;
  --text-muted: #64748b;
  --border-color: #e2e8f0;
  --border-subtle: #cbd5e1;
  --border-code: #30363d;
  --accent-primary: #2563eb;
  --accent-badge: #dbeafe;
  --accent-badge-text: #1e40af;
  --tag-bg: #e2e8f0;
  --tag-text: #334155;
  --table-header: #f1f5f9;
  --table-alt: #f8fafc;
  --table-border: #e2e8f0;
  --details-bg: #f8fafc;
  --details-border: #cbd5e1;
  --badge-lang-bg: #21262d;
  --badge-lang-text: #58a6ff;
}

.nightMode, .night_mode, .night-mode, body.nightMode, body.night_mode {
  --bg-primary: #090d16;
  --bg-card: #111827;
  --bg-secondary: #1e293b;
  --bg-code: #090d16;
  --bg-code-header: #131b2e;
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-muted: #94a3b8;
  --border-color: #243048;
  --border-subtle: #334155;
  --border-code: #243048;
  --accent-primary: #3b82f6;
  --accent-badge: #1e3a8a;
  --accent-badge-text: #93c5fd;
  --tag-bg: #1e293b;
  --tag-text: #cbd5e1;
  --table-header: #192237;
  --table-alt: #111827;
  --table-border: #243048;
  --details-bg: #0f172a;
  --details-border: #243048;
  --badge-lang-bg: #1e293b;
  --badge-lang-text: #60a5fa;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #090d16;
    --bg-card: #111827;
    --bg-secondary: #1e293b;
    --bg-code: #090d16;
    --bg-code-header: #131b2e;
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-muted: #94a3b8;
    --border-color: #243048;
    --border-subtle: #334155;
    --border-code: #243048;
    --accent-primary: #3b82f6;
    --accent-badge: #1e3a8a;
    --accent-badge-text: #93c5fd;
    --tag-bg: #1e293b;
    --tag-text: #cbd5e1;
    --table-header: #192237;
    --table-alt: #111827;
    --table-border: #243048;
    --details-bg: #0f172a;
    --details-border: #243048;
    --badge-lang-bg: #1e293b;
    --badge-lang-text: #60a5fa;
  }
}

html, body {
  margin: 0;
  padding: 0;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  background-color: var(--bg-primary);
}

.card {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  text-align: left !important;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  padding: 12px 8px;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
}

.card-container {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 16px 14px;
  max-width: 680px;
  margin: 0 auto;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Tag Pills & Seniority Badges */
.tags {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.tag {
  display: inline-block;
  background: var(--tag-bg);
  color: var(--tag-text);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.2;
}

.tag-level {
  background: var(--accent-badge);
  color: var(--accent-badge-text);
}

.tag-level-l2 {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #10b981;
}

.tag-level-l3 {
  background: #dbeafe;
  color: #1e40af;
  border: 1px solid #3b82f6;
}

.tag-level-l4 {
  background: #ede9fe;
  color: #5b21b6;
  border: 1px solid #8b5cf6;
}

.tag-level-l5 {
  background: #fef3c7;
  color: #92400e;
  border: 1px solid #f59e0b;
}

.nightMode .tag-level-l2, .night_mode .tag-level-l2, .night-mode .tag-level-l2, body.nightMode .tag-level-l2, body.night_mode .tag-level-l2 {
  background: #064e3b;
  color: #6ee7b7;
  border: 1px solid #10b981;
}

.nightMode .tag-level-l3, .night_mode .tag-level-l3, .night-mode .tag-level-l3, body.nightMode .tag-level-l3, body.night_mode .tag-level-l3 {
  background: #1e3a8a;
  color: #93c5fd;
  border: 1px solid #3b82f6;
}

.nightMode .tag-level-l4, .night_mode .tag-level-l4, .night-mode .tag-level-l4, body.nightMode .tag-level-l4, body.night_mode .tag-level-l4 {
  background: #4c1d95;
  color: #c4b5fd;
  border: 1px solid #8b5cf6;
}

.nightMode .tag-level-l5, .night_mode .tag-level-l5, .night-mode .tag-level-l5, body.nightMode .tag-level-l5, body.night_mode .tag-level-l5 {
  background: #78350f;
  color: #fde68a;
  border: 1px solid #f59e0b;
}

@media (prefers-color-scheme: dark) {
  .tag-level-l2 {
    background: #064e3b;
    color: #6ee7b7;
    border: 1px solid #10b981;
  }
  .tag-level-l3 {
    background: #1e3a8a;
    color: #93c5fd;
    border: 1px solid #3b82f6;
  }
  .tag-level-l4 {
    background: #4c1d95;
    color: #c4b5fd;
    border: 1px solid #8b5cf6;
  }
  .tag-level-l5 {
    background: #78350f;
    color: #fde68a;
    border: 1px solid #f59e0b;
  }
}

/* Question Header */
.question-title {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--accent-primary);
  margin-bottom: 6px;
}

.question-text {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border-color);
  line-height: 1.45;
}

.question-text p {
  margin: 0;
}

.question-compact {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px dashed var(--border-color);
  line-height: 1.4;
}

.question-compact p {
  margin: 0;
}

/* Answer Body */
.answer-section {
  margin-top: 10px;
  color: var(--text-primary);
}

.answer-section h3 {
  font-size: 15px;
  font-weight: 700;
  color: var(--accent-primary);
  margin-top: 14px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 4px;
}

.answer-section h4 {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text-secondary);
  margin-top: 12px;
  margin-bottom: 6px;
}

/* Responsive Table Wrapper */
.table-responsive {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin: 12px 0;
  border-radius: 8px;
  border: 1px solid var(--table-border);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  font-size: 13px;
}

th {
  background-color: var(--table-header);
  color: var(--text-primary);
  font-weight: 700;
  text-align: left;
  padding: 7px 9px;
  border: 1px solid var(--table-border);
  white-space: nowrap;
}

td {
  padding: 7px 9px;
  border: 1px solid var(--table-border);
  color: var(--text-secondary);
}

tr:nth-child(even) td {
  background-color: var(--table-alt);
}

/* Code Blocks - Build-time Tokenized Dark Modern Highlighting */
.code-block {
  background-color: var(--bg-code);
  border: 1px solid var(--border-code);
  border-radius: 8px;
  margin: 12px 0;
  overflow: hidden;
}

.code-header {
  background-color: var(--bg-code-header);
  padding: 4px 10px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid var(--border-code);
}

.code-lang-badge {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  font-weight: 700;
  color: var(--badge-lang-text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

pre {
  margin: 0;
  padding: 10px 12px;
  background: transparent;
  overflow-x: auto;
}

pre code {
  white-space: pre-wrap !important;
  word-break: break-word !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 12.5px;
  line-height: 1.5;
  background: transparent;
  padding: 0;
  color: #c9d1d9;
  display: block;
}

/* Highlight.js Dark Modern Syntax Theme */
.hljs-keyword, .hljs-selector-tag, .hljs-built_in, .hljs-name, .hljs-tag {
  color: #ff7b72;
  font-weight: 600;
}
.hljs-string, .hljs-title, .hljs-section, .hljs-attribute, .hljs-literal, .hljs-template-tag, .hljs-template-variable, .hljs-type, .hljs-addition {
  color: #a5d6ff;
}
.hljs-comment, .hljs-quote, .hljs-deletion, .hljs-meta {
  color: #8b949e;
  font-style: italic;
}
.hljs-number, .hljs-regexp, .hljs-link {
  color: #79c0ff;
}
.hljs-variable, .hljs-attr, .hljs-symbol, .hljs-bullet {
  color: #ffa657;
}
.hljs-function, .hljs-title.function_, .hljs-function .hljs-title {
  color: #d2a8ff;
}
.hljs-emphasis {
  font-style: italic;
}
.hljs-strong {
  font-weight: bold;
}

/* Inline code */
code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 13px;
  background: var(--bg-secondary);
  color: var(--accent-primary);
  padding: 2px 5px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
}

/* Accordion (<details>) - Fat Finger Friendly (min 44px touch) */
details {
  background-color: var(--details-bg);
  border: 1px solid var(--details-border);
  border-radius: 8px;
  margin-top: 14px;
  padding: 0 12px 10px 12px;
}

summary {
  font-weight: 700;
  font-size: 14.5px;
  color: var(--text-primary);
  cursor: pointer;
  outline: none;
  min-height: 44px;
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
  list-style: none;
}

summary::-webkit-details-marker {
  display: none;
}

summary::before {
  content: "▶";
  font-size: 11px;
  color: var(--accent-primary);
  transition: transform 0.2s ease;
  display: inline-block;
}

details[open] summary::before {
  transform: rotate(90deg);
}

details[open] summary {
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 10px;
  padding-bottom: 6px;
}

/* Media Wrappers, Inline SVGs & Micro-Videos (Graceful Degradation & Resilient Layout) */
.video-wrapper, .media-container, .svg-wrapper {
  width: 100%;
  max-width: 100%;
  margin: 12px auto;
  text-align: center;
  overflow: hidden;
  border-radius: 8px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 120px;
  contain: layout style;
  box-sizing: border-box;
}

img, svg, video {
  max-width: 100% !important;
  max-height: 360px !important;
  width: auto;
  height: auto;
  display: block;
  margin: 8px auto;
  border-radius: 8px;
  box-sizing: border-box;
  object-fit: contain;
}

img, video {
  border: 1px solid var(--border-color);
}

video {
  width: 100%;
  aspect-ratio: 16 / 9;
  min-height: 120px;
  background-color: transparent;
  object-fit: contain;
}

.card-container video,
.card-container .media-container video,
.card-container .video-wrapper video {
  background-color: transparent;
  border: 1px solid var(--border-color);
}

/* Fallback & Resilient Semantic Captions */
.media-caption,
.video-wrapper + p,
.media-container + p,
.svg-wrapper + p {
  font-size: 12.5px;
  color: var(--text-muted);
  text-align: center;
  margin: 6px 0 12px 0;
  line-height: 1.4;
  font-style: italic;
}

/* High-Latency & Offline Visual Fallback: Immediate Display without Layout Shift */
.answer-section > h3:first-of-type,
.answer-section .quick-answer {
  display: block;
  content-visibility: visible;
}

/* Key Lists */
ul, ol {
  padding-left: 20px;
  margin: 8px 0;
}

li {
  margin-bottom: 4px;
}

/* KaTeX Mathematical Typography & Responsive Styling */
.katex {
  font-size: 1.06em;
  color: inherit;
}

.katex .katex-html {
  color: inherit;
}

.math-block {
  margin: 10px 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  text-align: center;
  padding: 4px 0;
}

.math-block .katex-display {
  margin: 0;
  display: block;
}

${katexCss}
`;

/**
 * Recursively find all .md files in a directory.
 */
export function getMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getMarkdownFiles(filePath, fileList);
    } else if (filePath.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

/**
 * Main packaging and compilation routine.
 */
export async function buildDecks(options = {}) {
  const { phaseFilter = null, deckName = 'MAANG Engineering Mastery' } = options;

  let targetDir = DECKS_DIR;
  let outputFile = path.join(ROOT_DIR, 'MAANG_Engineering_Mastery.apkg');

  if (phaseFilter) {
    targetDir = path.join(DECKS_DIR, phaseFilter);
    outputFile = path.join(ROOT_DIR, `MAANG_${phaseFilter}.apkg`);
  }

  const mdFiles = getMarkdownFiles(targetDir);
  console.log(`\n🔍 Found ${mdFiles.length} markdown card(s) in "${targetDir}"`);

  if (mdFiles.length === 0) {
    console.warn('⚠️ No markdown flashcards found to compile.');
    return { count: 0, outputFile };
  }

  const SQL = await initSqlJs();
  const template = createTemplate({
    questionFormat: '{{Front}}',
    answerFormat: '{{Back}}',
    css: cardCss
  });

  const apkg = new Exporter(deckName, {
    template,
    sql: SQL
  });

  let processedCount = 0;
  const globalMediaRegistered = new Set();

  for (const file of mdFiles) {
    const rawContent = fs.readFileSync(file, 'utf8');

    // Validate card schema
    const validation = validateCard(file, rawContent);
    if (!validation.valid) {
      console.warn(`\n⚠️ Card validation warnings for ${path.relative(ROOT_DIR, file)}:`);
      validation.errors.forEach(err => console.warn(`   - ${err}`));
    }

    const { frontmatter, content } = validation.frontmatter ? validation : matter(rawContent);

    // Resolve local co-located media
    const { rewrittenMarkdown, mediaFiles } = resolveMedia(file, content);

    // Add media files to .apkg bundle
    for (const media of mediaFiles) {
      if (!globalMediaRegistered.has(media.filename)) {
        globalMediaRegistered.add(media.filename);
        apkg.addMedia(media.filename, media.data);
      }
    }

    // Split Pergunta / Resposta
    const parts = rewrittenMarkdown.split(/^##\s+Resposta\b/im);
    let questionRaw = parts[0].replace(/^##\s+Pergunta\b/im, '').trim();
    let answerRaw = parts.length > 1 ? parts[1].trim() : 'Nenhuma resposta fornecida.';

    const questionHtml = ensureVideoAttributesAndContainers(marked.parse(questionRaw));
    const answerHtml = ensureVideoAttributesAndContainers(marked.parse(answerRaw));

    const tags = (frontmatter && frontmatter.tags) || [];
    const tagsHtml = tags
      .map(t => {
        const isLevel = t.startsWith('level::');
        let levelClass = '';
        if (t === 'level::l2-fundamental') levelClass = 'tag-level-l2';
        else if (t === 'level::l3-junior') levelClass = 'tag-level-l3';
        else if (t === 'level::l4-pleno') levelClass = 'tag-level-l4';
        else if (t === 'level::l5-senior') levelClass = 'tag-level-l5';
        return `<span class="tag ${isLevel ? 'tag-level ' + levelClass : ''}">${t}</span>`;
      })
      .join('');

    const front = `
      <div class="card-container">
        <div class="tags">${tagsHtml}</div>
        <div class="question-title">Pergunta</div>
        <div class="question-text">${questionHtml}</div>
      </div>
    `;

    const back = `
      <div class="card-container">
        <div class="tags">${tagsHtml}</div>
        <div class="question-title">Pergunta</div>
        <div class="question-compact">${questionHtml}</div>
        <div class="answer-section">${answerHtml}</div>
      </div>
    `;

    apkg.addCard(front, back, { tags });
    processedCount++;
  }

  try {
    const zip = await apkg.save();
    fs.writeFileSync(outputFile, zip, 'binary');
    console.log(`✅ Successfully generated ${outputFile} with ${processedCount} cards.\n`);
    return { count: processedCount, outputFile };
  } catch (err) {
    console.error('❌ Error generating .apkg package:', err.stack || err);
    throw err;
  }
}

// CLI Execution Handler
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  let phaseFilter = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--phase' && args[i + 1]) {
      phaseFilter = args[i + 1];
      i++;
    }
  }

  buildDecks({ phaseFilter }).catch(err => {
    process.exit(1);
  });
}
