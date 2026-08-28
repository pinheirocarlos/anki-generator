import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { getMarkdownFiles } from '../generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT_DIR = path.resolve(__dirname, '..', '..');
export const DECKS_DIR = path.join(ROOT_DIR, 'decks');

export const DEFAULT_CONFIG = {
  concurrency: 8,
  timeout: 5000,
  retries: 2,
  report: 'link-health-report.json',
  deck: null,
  userAgent: 'FAANG-Anki-LinkChecker/1.0 (Educational flashcard media auditor)'
};

/**
 * Resolves target deck directory from a CLI --deck argument.
 * Supports absolute paths, root-relative paths ('decks/01-dsa'), and deck-relative paths ('01-dsa').
 *
 * @param {string|null} deckOption
 * @returns {string} Absolute directory path
 */
export function resolveTargetDir(deckOption) {
  if (!deckOption || typeof deckOption !== 'string' || deckOption.trim() === '') {
    return DECKS_DIR;
  }

  const cleanOption = deckOption.trim();

  if (path.isAbsolute(cleanOption)) {
    return cleanOption;
  }

  // 1. Check relative to ROOT_DIR (e.g. 'decks/01-dsa')
  const rootRelative = path.join(ROOT_DIR, cleanOption);
  if (fs.existsSync(rootRelative)) {
    return rootRelative;
  }

  // 2. Check relative to DECKS_DIR (e.g. '01-dsa')
  const decksRelative = path.join(DECKS_DIR, cleanOption);
  if (fs.existsSync(decksRelative)) {
    return decksRelative;
  }

  // Default fallback to root-relative path
  return rootRelative;
}

/**
 * Valid media MIME types accepted by the auditor.
 */
export const VALID_MEDIA_MIME_PREFIXES = [
  'video/',
  'image/',
  'text/xml',
  'application/xml',
  'application/octet-stream'
];

/**
 * Parses CLI arguments.
 * @param {string[]} argv - Command line arguments (e.g. process.argv.slice(2))
 * @returns {typeof DEFAULT_CONFIG}
 */
export function parseArgs(argv = []) {
  const config = { ...DEFAULT_CONFIG };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '--concurrency' && argv[i + 1]) {
      const parsed = parseInt(argv[i + 1], 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 20) {
        config.concurrency = parsed;
      }
      i++;
    } else if (arg.startsWith('--concurrency=')) {
      const parsed = parseInt(arg.split('=')[1], 10);
      if (!isNaN(parsed) && parsed >= 1 && parsed <= 20) {
        config.concurrency = parsed;
      }
    } else if (arg === '--timeout' && argv[i + 1]) {
      const parsed = parseInt(argv[i + 1], 10);
      if (!isNaN(parsed) && parsed > 0) {
        config.timeout = parsed;
      }
      i++;
    } else if (arg.startsWith('--timeout=')) {
      const parsed = parseInt(arg.split('=')[1], 10);
      if (!isNaN(parsed) && parsed > 0) {
        config.timeout = parsed;
      }
    } else if (arg === '--retries' && argv[i + 1]) {
      const parsed = parseInt(argv[i + 1], 10);
      if (!isNaN(parsed) && parsed >= 0) {
        config.retries = parsed;
      }
      i++;
    } else if (arg.startsWith('--retries=')) {
      const parsed = parseInt(arg.split('=')[1], 10);
      if (!isNaN(parsed) && parsed >= 0) {
        config.retries = parsed;
      }
    } else if (arg === '--deck' && argv[i + 1]) {
      config.deck = argv[i + 1];
      i++;
    } else if (arg.startsWith('--deck=')) {
      config.deck = arg.split('=')[1];
    } else if (arg === '--report' && argv[i + 1]) {
      config.report = argv[i + 1];
      i++;
    } else if (arg.startsWith('--report=')) {
      config.report = arg.split('=')[1];
    }
  }

  return config;
}

/**
 * Extracts remote media URLs and metadata from all cards in the specified directory.
 * @param {string} targetDir - Root directory to scan for cards
 * @returns {Array<{ card_id: string, file_path: string, url: string }>}
 */
export function extractMediaUrlsFromDecks(targetDir) {
  const cardFiles = getMarkdownFiles(targetDir);
  const items = [];

  for (const filePath of cardFiles) {
    const rawContent = fs.readFileSync(filePath, 'utf8');
    const relFilePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');

    let cardId = 'UNKNOWN-CARD-000';
    let content = rawContent;

    try {
      const parsed = matter(rawContent);
      if (parsed.data && parsed.data.id) {
        cardId = parsed.data.id;
      }
      content = parsed.content || rawContent;
    } catch {
      const idMatch = rawContent.match(/^id:\s*([A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[0-9]{3})/m);
      if (idMatch) cardId = idMatch[1];
    }

    const foundUrls = new Set();

    // 1. Video & Source tags
    const videoRegex = /<(?:video|source)\s+[^>]*src=["'](https?:\/\/[^"']+)["'][^>]*>/gi;
    let vMatch;
    while ((vMatch = videoRegex.exec(content)) !== null) {
      foundUrls.add(vMatch[1].trim());
    }

    // 2. Image tags
    const imgRegex = /<img\s+[^>]*src=["'](https?:\/\/[^"']+)["'][^>]*>/gi;
    let iMatch;
    while ((iMatch = imgRegex.exec(content)) !== null) {
      foundUrls.add(iMatch[1].trim());
    }

    // 3. Markdown images
    const mdImgRegex = /!\[.*?\]\((https?:\/\/[^)]+)\)/gi;
    let mMatch;
    while ((mMatch = mdImgRegex.exec(content)) !== null) {
      foundUrls.add(mMatch[1].trim());
    }

    for (const url of foundUrls) {
      items.push({
        card_id: cardId,
        file_path: relFilePath,
        url
      });
    }
  }

  return items;
}

/**
 * Checks if a Content-Type is considered valid media.
 * @param {string|null} contentType
 * @returns {boolean}
 */
export function isValidContentType(contentType) {
  if (!contentType || typeof contentType !== 'string') return true; // lenient if header omitted by server
  const lower = contentType.toLowerCase().trim();
  return VALID_MEDIA_MIME_PREFIXES.some(prefix => lower.includes(prefix));
}

/**
 * Sleep helper for backoff delays.
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Performs active HTTP reachability check with retry policy and HEAD/GET fallback.
 * @param {{ card_id: string, file_path: string, url: string }} item
 * @param {object} options
 * @param {typeof fetch} [customFetch] - Optional fetch override for unit testing
 * @returns {Promise<{ card_id: string, file_path: string, url: string, http_status: number, content_type?: string, latency_ms: number, passed: boolean, error_message?: string }>}
 */
export async function checkLink(item, options = {}, customFetch = fetch) {
  const timeout = options.timeout || DEFAULT_CONFIG.timeout;
  const maxRetries = options.retries !== undefined ? options.retries : DEFAULT_CONFIG.retries;
  const userAgent = options.userAgent || DEFAULT_CONFIG.userAgent;

  let attempt = 0;
  let lastStatus = 0;
  let lastError = '';
  let lastContentType = undefined;
  let totalLatency = 0;

  while (attempt <= maxRetries) {
    const startTime = performance.now();
    let isRetryable = false;

    try {
      // 1. Try HEAD request first
      let response;
      try {
        response = await customFetch(item.url, {
          method: 'HEAD',
          headers: { 'User-Agent': userAgent },
          signal: AbortSignal.timeout(timeout)
        });
      } catch (headErr) {
        // If HEAD fails on network / abort, let it throw or handle below
        throw headErr;
      }

      // If HEAD is not allowed (405) or forbidden (403), fallback to GET with byte range
      if (response.status === 405 || response.status === 403 || response.status === 501) {
        response = await customFetch(item.url, {
          method: 'GET',
          headers: {
            'User-Agent': userAgent,
            'Range': 'bytes=0-1024'
          },
          signal: AbortSignal.timeout(timeout)
        });
      }

      const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
      totalLatency = elapsed;
      lastStatus = response.status;
      lastContentType = response.headers?.get ? (response.headers.get('content-type') || undefined) : undefined;

      // Status 200 or 206 (Partial Content from Range GET) is considered success
      if (response.status === 200 || response.status === 206) {
        const mimeValid = isValidContentType(lastContentType);
        if (!mimeValid) {
          const result = {
            card_id: item.card_id,
            file_path: item.file_path,
            url: item.url,
            http_status: lastStatus,
            latency_ms: totalLatency,
            passed: false,
            error_message: `Invalid media MIME type: ${lastContentType}`
          };
          if (lastContentType) result.content_type = lastContentType;
          return result;
        }

        const result = {
          card_id: item.card_id,
          file_path: item.file_path,
          url: item.url,
          http_status: lastStatus,
          latency_ms: totalLatency,
          passed: true
        };
        if (lastContentType) result.content_type = lastContentType;
        return result;
      }

      // Check if status is transient (429 or 5xx)
      if (response.status === 429 || (response.status >= 500 && response.status <= 599)) {
        isRetryable = true;
        lastError = `HTTP ${response.status}: ${response.statusText || 'Server Error'}`;
      } else {
        // Non-transient failure (e.g. 404 Not Found, 410 Gone)
        const result = {
          card_id: item.card_id,
          file_path: item.file_path,
          url: item.url,
          http_status: lastStatus,
          latency_ms: totalLatency,
          passed: false,
          error_message: `HTTP ${response.status}: ${response.statusText || 'Not Found'}`
        };
        if (lastContentType) result.content_type = lastContentType;
        return result;
      }
    } catch (err) {
      const elapsed = Math.round((performance.now() - startTime) * 100) / 100;
      totalLatency = elapsed;
      lastStatus = 0;
      lastError = err.name === 'TimeoutError' || err.name === 'AbortError'
        ? `Request timed out after ${timeout}ms`
        : err.message || 'Network request failed';
      isRetryable = true;
    }

    attempt++;
    if (attempt <= maxRetries && isRetryable) {
      // Exponential / stepped backoff: 500ms on first retry, 1500ms on second (or override via options.backoffMs)
      const backoffMs = options.backoffMs !== undefined
        ? options.backoffMs
        : (attempt === 1 ? 500 : 1500);
      if (backoffMs > 0) {
        await sleep(backoffMs);
      }
    }
  }

  // All retries exhausted
  const finalResult = {
    card_id: item.card_id,
    file_path: item.file_path,
    url: item.url,
    http_status: lastStatus,
    latency_ms: totalLatency,
    passed: false,
    error_message: lastError || 'Max retries exceeded'
  };
  if (lastContentType) finalResult.content_type = lastContentType;
  return finalResult;
}

/**
 * Worker pool processor for concurrent execution.
 * @param {Array<T>} items
 * @param {number} concurrency
 * @param {(item: T, index: number) => Promise<R>} fn
 * @returns {Promise<Array<R>>}
 */
export async function runWorkerPool(items, concurrency, fn) {
  const results = new Array(items.length);
  let currentIndex = 0;

  async function worker() {
    while (currentIndex < items.length) {
      const index = currentIndex++;
      results[index] = await fn(items[index], index);
    }
  }

  const workerCount = Math.min(concurrency, items.length);
  const workers = Array.from({ length: workerCount }, () => worker());
  await Promise.all(workers);
  return results;
}

/**
 * Creates a structured JSON report conforming to link-health-report.schema.json.
 * @param {Array<object>} results - Array of LinkCheckResult objects
 * @param {number|null} [totalAudited] - Total audited items count
 * @param {number} [durationMs] - Elapsed wall-clock time in ms
 * @returns {object}
 */
export function createReport(results = [], totalAudited = null, durationMs = 0) {
  const actualTotal = totalAudited !== null && totalAudited !== undefined ? totalAudited : results.length;
  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.filter(r => !r.passed).length;

  return {
    timestamp: new Date().toISOString(),
    total_audited: actualTotal,
    passed_count: passedCount,
    failed_count: failedCount,
    duration_ms: Math.max(0, Math.round(durationMs * 100) / 100),
    results: results.map(r => {
      const item = {
        card_id: r.card_id || 'UNKNOWN-CARD-000',
        file_path: r.file_path || '',
        url: r.url || '',
        http_status: Number.isInteger(r.http_status) ? r.http_status : 0,
        latency_ms: typeof r.latency_ms === 'number' ? Math.max(0, Math.round(r.latency_ms * 100) / 100) : 0,
        passed: Boolean(r.passed)
      };
      if (r.content_type && typeof r.content_type === 'string') {
        item.content_type = r.content_type;
      }
      if (r.error_message && typeof r.error_message === 'string') {
        item.error_message = r.error_message;
      }
      return item;
    })
  };
}

/**
 * Validates a report object against link-health-report.schema.json specifications.
 * @param {object} report
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateReport(report) {
  const errors = [];
  if (!report || typeof report !== 'object' || Array.isArray(report)) {
    return { valid: false, errors: ['Report must be a non-null JSON object'] };
  }

  const allowedTopKeys = new Set(['timestamp', 'total_audited', 'passed_count', 'failed_count', 'duration_ms', 'results']);
  for (const key of Object.keys(report)) {
    if (!allowedTopKeys.has(key)) {
      errors.push(`Report contains disallowed top-level property: "${key}"`);
    }
  }

  if (typeof report.timestamp !== 'string' || isNaN(Date.parse(report.timestamp))) {
    errors.push('Report missing or invalid "timestamp" (ISO 8601 date-time string expected)');
  }

  if (!Number.isInteger(report.total_audited) || report.total_audited < 0) {
    errors.push('Report missing or invalid "total_audited" (non-negative integer expected)');
  }

  if (!Number.isInteger(report.passed_count) || report.passed_count < 0) {
    errors.push('Report missing or invalid "passed_count" (non-negative integer expected)');
  }

  if (!Number.isInteger(report.failed_count) || report.failed_count < 0) {
    errors.push('Report missing or invalid "failed_count" (non-negative integer expected)');
  }

  if (typeof report.duration_ms !== 'number' || report.duration_ms < 0) {
    errors.push('Report missing or invalid "duration_ms" (non-negative number expected)');
  }

  if (!Array.isArray(report.results)) {
    errors.push('Report missing or invalid "results" array');
  } else {
    const cardIdRegex = /^[A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+-[0-9]{3}$/;
    const urlRegex = /^https?:\/\//;
    const allowedResultKeys = new Set(['card_id', 'file_path', 'url', 'http_status', 'content_type', 'latency_ms', 'passed', 'error_message']);

    report.results.forEach((item, index) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) {
        errors.push(`Result [${index}] is not an object`);
        return;
      }

      for (const key of Object.keys(item)) {
        if (!allowedResultKeys.has(key)) {
          errors.push(`Result [${index}] contains disallowed property: "${key}"`);
        }
      }

      if (!item.card_id || typeof item.card_id !== 'string' || !cardIdRegex.test(item.card_id)) {
        errors.push(`Result [${index}] missing or invalid card_id "${item.card_id}"`);
      }

      if (typeof item.file_path !== 'string') {
        errors.push(`Result [${index}] missing or invalid file_path`);
      }

      if (!item.url || typeof item.url !== 'string' || !urlRegex.test(item.url)) {
        errors.push(`Result [${index}] missing or invalid url "${item.url}"`);
      }

      if (!Number.isInteger(item.http_status)) {
        errors.push(`Result [${index}] missing or invalid integer http_status`);
      }

      if (typeof item.passed !== 'boolean') {
        errors.push(`Result [${index}] missing or invalid boolean passed`);
      }

      if (typeof item.latency_ms !== 'number' || item.latency_ms < 0) {
        errors.push(`Result [${index}] missing or invalid non-negative number latency_ms`);
      }

      if (item.content_type !== undefined && typeof item.content_type !== 'string') {
        errors.push(`Result [${index}] invalid string content_type`);
      }

      if (item.error_message !== undefined && typeof item.error_message !== 'string') {
        errors.push(`Result [${index}] invalid string error_message`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Writes a report object to disk as formatted JSON.
 * @param {object} report
 * @param {string} [reportPath]
 * @returns {string} Absolute path to written report
 */
export function writeReport(report, reportPath = DEFAULT_CONFIG.report) {
  const resolvedPath = path.isAbsolute(reportPath)
    ? reportPath
    : path.join(ROOT_DIR, reportPath);

  const dir = path.dirname(resolvedPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(resolvedPath, JSON.stringify(report, null, 2), 'utf8');
  return resolvedPath;
}

/**
 * Main link auditor runner.
 * @param {Partial<typeof DEFAULT_CONFIG>} options
 * @param {typeof fetch} [customFetch]
 * @returns {Promise<{ report: object, exitCode: number }>}
 */
export async function auditLinks(options = {}, customFetch = fetch) {
  const config = { ...DEFAULT_CONFIG, ...options };
  const overallStartTime = performance.now();

  const targetDir = resolveTargetDir(config.deck);

  console.log('\n======================================================');
  console.log('🌐 FAANG Anki Live Multimedia Reachability Auditor');
  console.log('======================================================');
  console.log(`📁 Target Directory : ${targetDir}`);
  console.log(`⚡ Concurrency Pool  : ${config.concurrency} workers`);
  console.log(`⏱️  Request Timeout   : ${config.timeout}ms`);
  console.log(`🔄 Max Retries       : ${config.retries} (on 429/5xx/timeout)`);
  console.log(`📄 Report Output     : ${config.report}`);
  console.log('------------------------------------------------------\n');

  const mediaItems = extractMediaUrlsFromDecks(targetDir);
  console.log(`🔍 Discovered ${mediaItems.length} remote media URL(s) to audit.\n`);

  if (mediaItems.length === 0) {
    console.log('✅ No remote media URLs found to audit. Deck is clean.');
    const duration = Math.round((performance.now() - overallStartTime) * 100) / 100;
    const emptyReport = createReport([], 0, duration);
    const reportPath = writeReport(emptyReport, config.report);

    return { report: emptyReport, exitCode: 0, reportPath };
  }

  let completedCount = 0;
  const results = await runWorkerPool(mediaItems, config.concurrency, async (item) => {
    const res = await checkLink(item, config, customFetch);
    completedCount++;

    const progress = `[${completedCount}/${mediaItems.length}]`;
    if (res.passed) {
      console.log(`✅ ${progress} PASS (${res.http_status}, ${res.latency_ms}ms) [${res.card_id}]: ${res.url}`);
    } else {
      console.error(`❌ ${progress} FAIL (${res.http_status}) [${res.card_id}]: ${res.url} -> ${res.error_message}`);
    }
    return res;
  });

  const totalDuration = Math.round((performance.now() - overallStartTime) * 100) / 100;
  const report = createReport(results, mediaItems.length, totalDuration);
  const reportPath = writeReport(report, config.report);
  console.log(`\n📄 Report written to: ${reportPath}`);

  console.log('\n======================================================');
  console.log(`📊 Audit Summary: ${report.passed_count} passed, ${report.failed_count} failed in ${totalDuration}ms`);
  console.log('======================================================\n');

  const exitCode = report.failed_count === 0 ? 0 : 1;
  return { report, exitCode, reportPath };
}

// Direct CLI Execution Handler
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const cliConfig = parseArgs(process.argv.slice(2));
  auditLinks(cliConfig)
    .then(({ exitCode }) => {
      process.exit(exitCode);
    })
    .catch(err => {
      console.error('💥 Fatal error during link audit:', err);
      process.exit(1);
    });
}
