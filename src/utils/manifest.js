import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const DECKS_DIR = path.join(ROOT_DIR, 'decks');
const MANIFEST_PATH = path.join(ROOT_DIR, 'syllabus_manifest.json');
const REGISTRY_PATH = path.join(ROOT_DIR, 'media-curation-registry.json');

/**
 * Recursively scans a directory for markdown (.md) card files.
 *
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of absolute file paths
 */
export function getMarkdownFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Human-readable fallbacks for known phase and module IDs.
 */
const DEFAULT_TITLES = {
  phases: {
    '01-dsa': 'Estruturas de Dados & Algoritmos (DSA / LeetCode Mastery)',
    '02-cs-fundamentals': 'Fundamentos de Computação para Big Techs (CS Core)',
    '03-system-design-backend': 'System Design & Arquitetura de Microsserviços Backend',
    '04-behavioral-engineering': 'Engenharia Comportamental, Liderança FAANG & Resiliência Operacional'
  },
  modules: {
    'data-structures': 'Estruturas de Dados Fundamentais e Avançadas',
    'algorithmic-patterns': 'Padrões Algorítmicos e Técnicas de Resolução LeetCode',
    'advanced-dsa-string-math': 'Estruturas Especializadas, Algoritmos de String e Teoria dos Jogos',
    'os-memory-concurrency': 'Sistemas Operacionais, Gerenciamento de Memória & Concorrência',
    'networking': 'Redes de Computadores e Protocolos de Baixa Latência',
    'runtimes-gc-compilers': 'Runtimes, Compiladores e Garbage Collection (Go & JVM)',
    'architecture-patterns': 'Padrões de Arquitetura de Computadores e Hardware Moderno',
    'discrete-math-algorithms': 'Matemática Discreta e Algoritmos Fundamentais de Engenharia',
    'distributed-consensus': 'Sistemas Distribuídos, Consistência e Consenso',
    'caching-storage-databases': 'Armazenamento, Índices e Padrões de Caching de Alta Performance',
    'messaging-streaming': 'Mensageria, Streaming de Eventos e Arquiteturas Reativas',
    'resilience-foundations-lld': 'Engenharia de Confiabilidade, Microsserviços e Low-Level Design (LLD)',
    'system-design-archetypes': 'Arquétipos Canônicos de System Design FAANG',
    'behavioral-leadership': 'Liderança Comportamental e Princípios de Cultura FAANG',
    'observability-sre': 'Engenharia de Confiabilidade (SRE) e Observabilidade',
    'release-security': 'Segurança de Backend, CI/CD e Estratégias de Deploy'
  }
};

/**
 * Converts a kebab-case slug to a Title Case string.
 * @param {string} slug
 * @returns {string}
 */
function slugToTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Scans the decks directory and extracts structured card data from Markdown files.
 *
 * @param {string} [decksDir=DECKS_DIR]
 * @returns {Map<string, Map<string, Map<string, Array<{ id: string, title: string, path: string, content: string, frontmatter: object }>>>>}
 */
export function scanDecksStructure(decksDir = DECKS_DIR) {
  const mdFiles = getMarkdownFiles(decksDir);
  const phasesMap = new Map();

  for (const file of mdFiles) {
    const rel = path.relative(decksDir, file);
    const parts = rel.split(path.sep);

    if (parts.length >= 4) {
      const [phaseId, moduleId, subtopicId, fileName] = parts;
      const rawContent = fs.readFileSync(file, 'utf8');
      const parsed = matter(rawContent);
      const cardId = parsed.data.id || path.basename(fileName, '.md');
      const cardTitle = parsed.data.title || cardId;

      if (!phasesMap.has(phaseId)) phasesMap.set(phaseId, new Map());
      const modulesMap = phasesMap.get(phaseId);

      if (!modulesMap.has(moduleId)) modulesMap.set(moduleId, new Map());
      const subtopicsMap = modulesMap.get(moduleId);

      if (!subtopicsMap.has(subtopicId)) subtopicsMap.set(subtopicId, []);
      subtopicsMap.get(subtopicId).push({
        id: cardId,
        title: cardTitle,
        path: file,
        content: parsed.content,
        frontmatter: parsed.data
      });
    }
  }

  // Sort card IDs predictably within each subtopic
  for (const modulesMap of phasesMap.values()) {
    for (const subtopicsMap of modulesMap.values()) {
      for (const [subtopicId, cards] of subtopicsMap.entries()) {
        cards.sort((a, b) => a.id.localeCompare(b.id));
      }
    }
  }

  return phasesMap;
}

/**
 * Generates syllabus_manifest data directly from decks directory.
 * Preserves existing descriptive titles where available.
 *
 * @param {string} [decksDir=DECKS_DIR]
 * @param {string} [existingManifestPath=MANIFEST_PATH]
 * @returns {object} Manifest conforming to validateManifest schema
 */
export function generateManifest(decksDir = DECKS_DIR, existingManifestPath = MANIFEST_PATH) {
  const phasesMap = scanDecksStructure(decksDir);

  // Load existing titles if manifest exists on disk
  const existingTitles = { phases: {}, modules: {}, subtopics: {} };
  if (fs.existsSync(existingManifestPath)) {
    try {
      const prev = JSON.parse(fs.readFileSync(existingManifestPath, 'utf8'));
      for (const p of prev.phases || []) {
        if (p.id && p.title) existingTitles.phases[p.id] = p.title;
        for (const m of p.modules || []) {
          if (m.id && m.title) existingTitles.modules[m.id] = m.title;
          for (const s of m.subtopics || []) {
            if (s.id && s.title) existingTitles.subtopics[s.id] = s.title;
          }
        }
      }
    } catch {
      // If parsing fails, fall back to defaults
    }
  }

  const phases = [];
  // Predictable phase ordering
  const sortedPhaseIds = Array.from(phasesMap.keys()).sort();

  for (const phaseId of sortedPhaseIds) {
    const modulesMap = phasesMap.get(phaseId);
    const phaseTitle = existingTitles.phases[phaseId] || DEFAULT_TITLES.phases[phaseId] || slugToTitle(phaseId);

    const modules = [];
    const sortedModuleIds = Array.from(modulesMap.keys()).sort();

    for (const moduleId of sortedModuleIds) {
      const subtopicsMap = modulesMap.get(moduleId);
      const moduleTitle = existingTitles.modules[moduleId] || DEFAULT_TITLES.modules[moduleId] || slugToTitle(moduleId);

      const subtopics = [];
      const sortedSubtopicIds = Array.from(subtopicsMap.keys()).sort();

      for (const subtopicId of sortedSubtopicIds) {
        const cards = subtopicsMap.get(subtopicId);
        const subtopicTitle = existingTitles.subtopics[subtopicId] || slugToTitle(subtopicId);

        subtopics.push({
          id: subtopicId,
          title: subtopicTitle,
          status: 'completed',
          card_ids: cards.map(c => c.id)
        });
      }

      modules.push({
        id: moduleId,
        title: moduleTitle,
        subtopics
      });
    }

    phases.push({
      id: phaseId,
      title: phaseTitle,
      modules
    });
  }

  return {
    version: '1.2.0',
    last_updated: new Date().toISOString().split('T')[0],
    phases
  };
}

/**
 * Generates media-curation-registry data dynamically from decks directory.
 * Auto-detects media tiers (SVG, local assets, videos, tables) from markdown content.
 *
 * @param {string} [decksDir=DECKS_DIR]
 * @param {string} [existingRegistryPath=REGISTRY_PATH]
 * @returns {object} Registry conforming to validateMediaCurationRegistry schema
 */
export function generateMediaRegistry(decksDir = DECKS_DIR, existingRegistryPath = REGISTRY_PATH) {
  const phasesMap = scanDecksStructure(decksDir);

  // Load existing metadata (attributions, captions) if available
  let prevCards = {};
  if (fs.existsSync(existingRegistryPath)) {
    try {
      const prev = JSON.parse(fs.readFileSync(existingRegistryPath, 'utf8'));
      if (prev.cards && typeof prev.cards === 'object') {
        prevCards = prev.cards;
      }
    } catch {
      // Fall back if unparseable
    }
  }

  const cards = {};
  let p1VideoCount = 0;
  let p2SvgCount = 0;
  let p2TableCount = 0;

  const nowIso = new Date().toISOString();

  for (const [phaseId, modulesMap] of phasesMap.entries()) {
    for (const [moduleId, subtopicsMap] of modulesMap.entries()) {
      for (const [subtopicId, cardList] of subtopicsMap.entries()) {
        for (const card of cardList) {
          const content = card.content;
          const prev = prevCards[card.id] || {};

          let tier = 'P2_RESPONSIVE_SVG';
          let mediaType = 'inline_svg';

          if (content.includes('<video')) {
            tier = 'P1_MICRO_VIDEO';
            mediaType = 'video/mp4';
            p1VideoCount++;
          } else if (content.includes('<svg')) {
            tier = 'P2_RESPONSIVE_SVG';
            mediaType = 'inline_svg';
            p2SvgCount++;
          } else if (content.includes('<img') || /!\[.*?\]\(assets\//.test(content)) {
            tier = 'LOCAL_ASSET';
            mediaType = 'image/png';
          } else if (content.includes('|---|') || content.includes('|:---|')) {
            tier = 'P2_TABLE_FALLBACK';
            mediaType = 'markdown_table';
            p2TableCount++;
          }

          // Extract caption from visual section if present
          let caption = prev.caption;
          if (!caption) {
            const captionMatch = content.match(/<p>Visualiza[çc][aã]o:\s*([\s\S]*?)<\/p>/i);
            if (captionMatch) {
              caption = `Visualização: ${captionMatch[1].trim()}`;
            } else {
              caption = `Visualização didática para ${card.title}.`;
            }
          }

          cards[card.id] = {
            card_id: card.id,
            subtopic_id: subtopicId,
            concept: prev.concept || card.title,
            tier: prev.tier || tier,
            media_type: prev.media_type || mediaType,
            attribution: prev.attribution || 'FAANG Anki Pedagogy Engine / Open Data Structures',
            license: prev.license || 'CC-BY-SA-4.0',
            caption,
            status: 'verified',
            last_verified: prev.last_verified || nowIso
          };
        }
      }
    }
  }

  const totalCards = Object.keys(cards).length;

  return {
    version: '1.0.0',
    last_updated: nowIso,
    stats: {
      total_cards: totalCards,
      p1_video_count: p1VideoCount,
      p2_svg_count: p2SvgCount,
      p2_table_count: p2TableCount
    },
    cards
  };
}

/**
 * Synchronizes syllabus_manifest.json and media-curation-registry.json to disk
 * directly from the Markdown cards in decks/.
 *
 * @param {object} [options]
 * @param {string} [options.decksDir=DECKS_DIR]
 * @param {string} [options.manifestPath=MANIFEST_PATH]
 * @param {string} [options.registryPath=REGISTRY_PATH]
 * @param {boolean} [options.silent=false]
 * @returns {{ manifest: object, registry: object, totalCards: number, totalSubtopics: number }}
 */
export function syncManifestFiles(options = {}) {
  const {
    decksDir = DECKS_DIR,
    manifestPath = MANIFEST_PATH,
    registryPath = REGISTRY_PATH,
    silent = false
  } = options;

  const log = (...args) => {
    if (!silent) console.log(...args);
  };

  const manifest = generateManifest(decksDir, manifestPath);
  const registry = generateMediaRegistry(decksDir, registryPath);

  let totalSubtopics = 0;
  let totalCards = 0;
  for (const p of manifest.phases) {
    for (const m of p.modules) {
      for (const s of m.subtopics) {
        totalSubtopics++;
        totalCards += s.card_ids.length;
      }
    }
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf8');

  log(`✅ Synced syllabus_manifest.json & media-curation-registry.json directly from decks/ SSOT:`);
  log(`   - Total Cards: ${totalCards}`);
  log(`   - Total Subtopics: ${totalSubtopics}`);
  log(`   - Total Phases: ${manifest.phases.length}`);

  return {
    manifest,
    registry,
    totalCards,
    totalSubtopics
  };
}

// Auto-run if executed directly via CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  syncManifestFiles();
}
