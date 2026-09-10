import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  validateCard,
  validateManifest,
  validateMediaCurationRegistry,
  isPlaceholderDomain,
  PLACEHOLDER_DOMAINS
} from '../src/utils/validator.js';
import {
  getMarkdownFiles,
  cardCss,
  MANDATORY_VIDEO_ATTRIBUTES,
  ensureVideoAttributesAndContainers,
  splitCardContent,
  renderTagsHtml,
  renderMarkdownToHtml,
  wrapInCardDocument,
  renderCard,
  buildDecks
} from '../src/generator.js';
import { resolveMedia, MANDATORY_MOBILE_VIDEO_FLAGS, normalizeVideoAttributes } from '../src/utils/media-resolver.js';
import {
  auditCard,
  auditAllCards,
  analyzeQuestionAtomicity,
  proposeDecompositions,
  generateDecompositionPlan
} from '../src/utils/atomic-decomposer.js';
import {
  PRIORITY_SUBTOPIC_MAPPINGS,
  getMediaForSubtopic,
  getMediaForCard,
  getAllPrioritySubtopics,
  SVG_GENERATORS
} from '../src/utils/media-catalog.js';
import {
  generateManifest,
  generateMediaRegistry,
  scanDecksStructure
} from '../src/utils/manifest.js';
import {
  parseArgs,
  isValidContentType,
  createReport,
  validateReport,
  writeReport,
  checkLink,
  resolveTargetDir,
  auditLinks,
  extractMediaUrlsFromDecks,
  DEFAULT_CONFIG
} from '../src/utils/link-checker.js';
import { execSync } from 'child_process';
import { chromium } from '@playwright/test';
import { VIEWPORT_PROFILES } from '../playwright.config.js';
import {
  AnkiConnectClient,
  AnkiConnectError,
  buildDiagnostic,
  formatDiagnosticMessage,
  ANKI_CONNECT_RESOLUTION_STEPS,
  ankiConnect,
  cleanupTestDeck
} from '../src/utils/anki-connect.js';
import {
  CARD_TYPOLOGIES,
  ALL_TYPOLOGIES,
  DEFAULT_MIN_SAMPLE_RATIO,
  detectCardTypologies,
  extractPhaseAndSubtopic,
  parseCardFile,
  scanAllCards,
  sampleSanityDeck,
  validateSanityManifest,
  exportSanityManifest
} from '../src/e2e/sanity-sampler.js';
import {
  MANDATORY_VIDEO_ATTRIBUTES as GUARDRAILS_MANDATORY_VIDEO_ATTRS,
  TOUCH_TARGET_MIN_HEIGHT,
  MAX_DIFF_PIXEL_RATIO,
  assertHorizontalOverflow,
  assertTouchTargets,
  assertKatexErrors,
  assertSvgIntegrity,
  assertVideoAttributes,
  assertCodeHighlighting,
  assertAccordionInteraction,
  runCardGuardrails
} from '../src/e2e/guardrails.js';
import {
  parseCLIOptions,
  validateCLIOptions,
  generateE2EReport,
  validateE2EReport,
  saveE2EReport,
  formatReportSummary,
  runOrchestrator,
  compareVisualSnapshots,
  findBaselinePath,
  DEFAULT_BASELINES_DIR,
  DEFAULT_SCREENSHOTS_DIR as ORCH_DEFAULT_SCREENSHOTS_DIR,
  VALID_PHASES,
  VALID_SUITES,
  VALID_MODES,
  DEFAULT_CLI_OPTIONS
} from '../src/e2e/orchestrator.js';
import {
  AnkiWebRunner,
  getAnkiWebCredentials,
  extractCurrentCardId,
  isLoggedIn,
  validateSession,
  loginToAnkiWeb,
  navigateToDeck,
  showCardAnswer,
  answerCurrentCard,
  isDeckFinished,
  runStudySession,
  verifyTouchTargetsAndAccordions,
  saveSessionState,
  clearSessionState,
  isSessionExpired,
  DEFAULT_ANKIWEB_URL,
  DEFAULT_LOGIN_URL,
  DEFAULT_DECKS_URL,
  DEFAULT_DECK_NAME,
  DEFAULT_AUTH_STORAGE_PATH,
  DEFAULT_VIEWPORT,
  DEFAULT_SCREENSHOTS_DIR,
  DEFAULT_MOBILE_VIEWPORTS
} from '../src/e2e/ankiweb-runner.js';
import {
  LocalRunner,
  runLocalRunner,
  assertPerformanceBenchmark,
  parseLocalCLIOptions,
  BENCHMARK_MAX_DURATION_MS,
  DEFAULT_LOCAL_OPTIONS
} from '../src/e2e/local-runner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const DECKS_DIR = path.join(ROOT_DIR, 'decks');
const MANIFEST_PATH = path.join(ROOT_DIR, 'syllabus_manifest.json');
const REGISTRY_PATH = path.join(ROOT_DIR, 'media-curation-registry.json');

function testMediaCatalog() {
  console.log('🧪 Running Unit Tests for Priority Media Catalog (src/utils/media-catalog.js)...\n');
  let unitFailures = 0;

  // Test 1: Required Priority Subtopics Exist (Árvores, Grafos, Caches, TCP, Raft, Kafka, Consistência)
  const requiredSubtopics = [
    'trees-bst',
    'graph-algorithms-core',
    'caching-patterns',
    'tcp-udp-transport',
    'consensus-replication',
    'kafka-internals',
    'cap-pacelc-consistency'
  ];

  for (const subId of requiredSubtopics) {
    const mapping = getMediaForSubtopic(subId);
    if (!mapping) {
      console.error(`❌ Required priority subtopic "${subId}" is not registered in media catalog!`);
      unitFailures++;
    } else {
      console.log(`✅ PASS: Priority subtopic "${subId}" found with tier [${mapping.tier}] (${mapping.theme})`);
    }
  }

  // Test 2: Card ID lookup works correctly
  const sampleCardId = 'DSA-STRUCT-TREE-001';
  const cardMedia = getMediaForCard(sampleCardId);
  if (!cardMedia || cardMedia.subtopicId !== 'trees-bst') {
    console.error(`❌ Expected card ID "${sampleCardId}" to map to "trees-bst", got:`, cardMedia);
    unitFailures++;
  } else {
    console.log(`✅ PASS: getMediaForCard("${sampleCardId}") correctly returned mapping.`);
  }

  // Test 3: SVG Generators produce valid SVG strings
  for (const [genName, genFn] of Object.entries(SVG_GENERATORS)) {
    try {
      const svg = genFn();
      if (!svg || !svg.includes('<svg viewBox=') || !svg.includes('</svg>')) {
        console.error(`❌ SVG Generator "${genName}" did not produce valid SVG! Output:`, svg);
      }
    } catch (err) {
      console.error(`❌ SVG Generator "${genName}" threw error:`, err);
      unitFailures++;
    }
  }

  // Test 4: Verify DSA algorithmic cards contain valid micro-videos in loop and/or responsive SVGs
  const dsaFiles = getMarkdownFiles(path.join(DECKS_DIR, '01-dsa'));
  let dsaMediaCardsCount = 0;
  for (const file of dsaFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if ((content.includes('<video ') && content.includes('autoplay') && content.includes('loop')) ||
      (content.includes('<svg ') && content.includes('viewBox'))) {
      dsaMediaCardsCount++;
    }
  }

  if (dsaMediaCardsCount < 180) {
    console.error(`❌ Expected at least 180 DSA cards with multimedia, found ${dsaMediaCardsCount}`);
    unitFailures++;
  } else {
    console.log(`✅ PASS: Verified ${dsaMediaCardsCount} DSA cards containing looping micro-videos / SVGs.`);
  }

  // Test 5: Verify CS Fundamentals cards contain valid micro-videos in loop and/or responsive SVGs
  const csFiles = getMarkdownFiles(path.join(DECKS_DIR, '02-cs-fundamentals'));
  let csMediaCardsCount = 0;
  for (const file of csFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if ((content.includes('<video ') && content.includes('autoplay') && content.includes('loop')) ||
      (content.includes('<svg ') && content.includes('viewBox'))) {
      csMediaCardsCount++;
    }
  }

  if (csMediaCardsCount < 90) {
    console.error(`❌ Expected at least 90 CS Fundamentals cards with multimedia, found ${csMediaCardsCount}`);
    unitFailures++;
  } else {
    console.log(`✅ PASS: Verified ${csMediaCardsCount} CS Fundamentals cards containing looping micro-videos / SVGs.`);
  }

  // Test 6: Verify System Design cards contain valid micro-videos in loop and/or responsive SVGs
  const sysFiles = getMarkdownFiles(path.join(DECKS_DIR, '03-system-design-backend'));
  let sysMediaCardsCount = 0;
  for (const file of sysFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if ((content.includes('<video ') && content.includes('autoplay') && content.includes('loop')) ||
      (content.includes('<svg ') && content.includes('viewBox'))) {
      sysMediaCardsCount++;
    }
  }

  if (sysMediaCardsCount < 90) {
    console.error(`❌ Expected at least 90 System Design cards with multimedia, found ${sysMediaCardsCount}`);
    unitFailures++;
  } else {
    console.log(`✅ PASS: Verified ${sysMediaCardsCount} System Design cards containing looping micro-videos / SVGs.`);
  }

  console.log('');
  return unitFailures;
}

function testAtomicDecomposer() {
  console.log('🧪 Running Unit Tests for Atomic Decomposer Utility (src/utils/atomic-decomposer.js)...\n');
  let unitFailures = 0;

  // Test 1: Pure atomic question is correctly identified as atomic
  const atomicQ = 'Qual é o custo assintótico de acesso a um elemento em um array contíguo indexado?';
  const resAtomic = analyzeQuestionAtomicity(atomicQ);
  if (!resAtomic.isAtomic || resAtomic.compoundReasons.length > 0) {
    console.error('❌ Expected pure question to be identified as atomic, but failed:', resAtomic);
    unitFailures++;
  } else {
    console.log('✅ PASS: Atomic question correctly identified as atomic.');
  }

  // Test 2: Multi-part compound question with connectors is detected as compound
  const compoundQ = 'Por que arrays contíguos em memória oferecem acesso O(1), como funciona o redimensionamento dinâmico e como a localidade espacial de cache beneficia arrays?';
  const resCompound = analyzeQuestionAtomicity(compoundQ);
  if (resCompound.isAtomic || resCompound.compoundReasons.length === 0) {
    console.error('❌ Expected compound question to be identified as compound, but passed as atomic.');
    unitFailures++;
  } else if (resCompound.clauses.length < 3) {
    console.error('❌ Expected at least 3 clauses from compound question, got:', resCompound.clauses);
    unitFailures++;
  } else {
    console.log(`✅ PASS: Compound question correctly detected with ${resCompound.clauses.length} clauses and reasons:`, resCompound.compoundReasons);
  }

  // Test 3: Decomposition proposal generates valid deterministic IDs and single-concept titles
  const mockCard = {
    id: 'DSA-STRUCT-ARRAY-000',
    title: 'Introdução a Vetores Dinâmicos',
    tags: ['level::l3-junior', 'topic::dsa::arrays', 'freq::high'],
    levelTag: 'level::l3-junior',
    rawQuestion: compoundQ
  };
  const mockBullets = [
    { title: 'Acesso Indexado O(1)', text: 'Aritmética de ponteiros' },
    { title: 'Vetores Dinâmicos', text: 'Redimensionamento com duplicação geométrica' },
    { title: 'Localidade de Cache', text: 'Cache line de 64 bytes' }
  ];
  const proposals = proposeDecompositions(mockCard, resCompound, mockBullets);
  if (proposals.length !== 3) {
    console.error(`❌ Expected 3 decomposed proposals, got ${proposals.length}`);
    unitFailures++;
  } else {
    const expectedIds = ['DSA-STRUCT-ARRAY-000', 'DSA-STRUCT-ARRAY-002', 'DSA-STRUCT-ARRAY-003'];
    const actualIds = proposals.map(p => p.targetId);
    const idsMatch = expectedIds.every((id, i) => actualIds[i] === id);
    if (!idsMatch) {
      console.error(`❌ Proposed IDs do not match expected sequence: expected ${expectedIds}, got ${actualIds}`);
      unitFailures++;
    } else {
      console.log('✅ PASS: ProposeDecompositions generated correct deterministic IDs:', actualIds);
    }
  }

  // Test 4: auditCard returns complete audit structure
  const rawSampleCard = `---
id: CS-ARCH-CACHE-000
title: "Padrões de Cache"
tags:
  - level::l3-junior
  - topic::cs::cache
  - freq::high
---

## Pergunta
Quais são os 4 padrões clássicos de caching e quando escolher cada um?

## Resposta
### Quick Answer
**Solução Direta**:
- **Cache-Aside**: Busca sob demanda.
- **Write-Through**: Gravação síncrona.
- **Write-Back**: Gravação assíncrona.
`;
  const auditRes = auditCard('/virtual/path/CS-ARCH-CACHE-000.md', rawSampleCard);
  if (auditRes.isAtomic) {
    console.error('❌ Expected sample multi-bullet card to be compound, but was atomic.');
    unitFailures++;
  } else if (auditRes.proposedDecompositions.length < 2) {
    console.error('❌ Expected at least 2 proposed decompositions, got:', auditRes.proposedDecompositions.length);
    unitFailures++;
  } else {
    console.log(`✅ PASS: auditCard successfully analyzed card into ${auditRes.suggestedSplitCount} proposed atomic cards.`);
  }

  console.log('');
  return unitFailures;
}

function testL2AndAtomicityRules() {
  console.log('🧪 Running Unit Tests for L2 Tags and Question Atomicity Rules...\n');
  let unitFailures = 0;

  // Test 1: L2 Fundamental tag is valid
  const l2Card = `---
id: TEST-UNIT-L2-001
title: "Valid L2 Fundamental Card"
tags:
  - level::l2-fundamental
  - topic::cs::memory
  - freq::high
---

## Pergunta
Qual é a intuição fundamental do uso de memória virtual em sistemas operacionais?

## Resposta
### Quick Answer
**Solução Direta**: Abstrair a RAM física permitindo que cada processo enxergue um espaço de endereçamento contíguo e isolado.
`;
  const resL2 = validateCard(null, l2Card);
  if (!resL2.valid) {
    console.error('❌ Expected valid L2 card to pass validation, but failed:', resL2.errors);
    unitFailures++;
  } else {
    console.log('✅ PASS: level::l2-fundamental card passes validation.');
  }

  // Test 2: Invalid level tag is rejected
  const invalidLevelCard = `---
id: TEST-UNIT-LVL-002
title: "Invalid Level Tag Card"
tags:
  - level::l1-intern
  - topic::cs::memory
  - freq::high
---

## Pergunta
Como funciona a paginação?

## Resposta
### Quick Answer
**Solução Direta**: Divisão em páginas e frames.
`;
  const resInvalidLvl = validateCard(null, invalidLevelCard);
  if (resInvalidLvl.valid) {
    console.error('❌ Expected invalid level tag to fail validation, but passed.');
    unitFailures++;
  } else {
    console.log('✅ PASS: Invalid level tag correctly rejected.');
  }

  // Test 3: Compound question with multiple question marks is rejected
  const multiQCard = `---
id: TEST-UNIT-ATOM-003
title: "Compound Multi-Question Card"
tags:
  - level::l3-junior
  - topic::cs::memory
  - freq::high
---

## Pergunta
Como funciona a memória virtual? E como a TLB acelera a tradução de endereços?

## Resposta
### Quick Answer
**Solução Direta**: Traduz páginas virtuais e faz cache na TLB.
`;
  const resMultiQ = validateCard(null, multiQCard);
  if (resMultiQ.valid) {
    console.error('❌ Expected multi-question card to fail atomicity validation, but passed.');
    unitFailures++;
  } else if (!resMultiQ.errors.some(e => e.includes('Single-Concept Rule') || e.includes('question marks'))) {
    console.error('❌ Multi-question card failed but did not trigger atomicity error:', resMultiQ.errors);
    unitFailures++;
  } else {
    console.log('✅ PASS: Compound multi-question card correctly rejected by atomicity validator.');
  }

  // Test 4: Single question with inline code containing ternary operators passes
  const codeQCard = `---
id: TEST-UNIT-CODE-004
title: "Question with Code Snippet"
tags:
  - level::l4-pleno
  - topic::dsa::arrays
  - freq::high
---

## Pergunta
O que o operador ternário \`val != null ? val : default\` retorna em tempo de execução?

## Resposta
### Quick Answer
**Solução Direta**: Retorna o valor default quando o operando é nulo.
`;
  const resCodeQ = validateCard(null, codeQCard);
  if (!resCodeQ.valid) {
    console.error('❌ Expected single question with inline code ternary to pass validation, but failed:', resCodeQ.errors);
    unitFailures++;
  } else {
    console.log('✅ PASS: Single question with inline code ternary passes atomicity check.');
  }

  console.log('');
  return unitFailures;
}

function testRemoteHttpsAndLocalAssetIntegrity() {
  console.log('🧪 Running Unit & Integration Tests for Remote HTTPS Links & Local Asset Integrity...\n');
  let unitFailures = 0;

  // 1. Unit Test: resolveMedia correctly extracts local assets and rewrites markdown
  const mockCardDir = path.join(DECKS_DIR, '01-dsa', 'data-structures', 'trees-bst');
  const mockCardPath = path.join(mockCardDir, 'mock-card.md');
  const mockMarkdownWithLocal = `---
id: MOCK-MEDIA-001
title: "Mock Media Test Card"
tags:
  - level::l3-junior
  - topic::dsa::trees-bst
  - freq::high
---

## Pergunta
Qual é o impacto da rotação AVL?

## Resposta
### Quick Answer
**Solução Direta**: Rebalanceia a árvore em O(1).

### Dual Coding Visual
![Diagram](assets/DSA-STRUCT-TREE-001.gif)
<img src="assets/DSA-STRUCT-TREE-001.gif" alt="Tree Diagram" />
<video src="https://assets.faang-anki.dev/media/dsa/avl-rotation-loop.webm" autoplay loop muted playsinline></video>
`;

  const resolved = resolveMedia(mockCardPath, mockMarkdownWithLocal);
  if (resolved.mediaFiles.length !== 1) {
    console.error(`❌ Expected exactly 1 unique extracted local media file, got ${resolved.mediaFiles.length}`);
    unitFailures++;
  } else if (resolved.mediaFiles[0].filename !== 'DSA-STRUCT-TREE-001.gif') {
    console.error(`❌ Expected filename "DSA-STRUCT-TREE-001.gif", got "${resolved.mediaFiles[0].filename}"`);
    unitFailures++;
  } else if (!Buffer.isBuffer(resolved.mediaFiles[0].data) || resolved.mediaFiles[0].data.length === 0) {
    console.error('❌ Expected valid non-empty Buffer for local media file data.');
    unitFailures++;
  } else {
    console.log('✅ PASS: resolveMedia correctly extracted and deduplicated local asset binary buffer.');
  }

  if (resolved.rewrittenMarkdown.includes('assets/DSA-STRUCT-TREE-001.gif')) {
    console.error('❌ Expected markdown paths to be rewritten to flat filenames for Anki package export.');
    unitFailures++;
  } else if (!resolved.rewrittenMarkdown.includes('DSA-STRUCT-TREE-001.gif')) {
    console.error('❌ Rewritten markdown missing flat filename reference.');
    unitFailures++;
  } else if (!resolved.rewrittenMarkdown.includes('https://assets.faang-anki.dev/media/dsa/avl-rotation-loop.webm')) {
    console.error('❌ Remote HTTPS URL was unexpectedly modified or stripped.');
    unitFailures++;
  } else {
    console.log('✅ PASS: resolveMedia correctly rewrote local paths while preserving remote HTTPS URLs.');
  }

  // 2. Unit Test: validator rejects insecure HTTP remote asset URLs
  const insecureHttpCard = `---
id: TEST-UNIT-INSECURE-001
title: "Card with Insecure HTTP Asset"
tags:
  - level::l3-junior
  - topic::dsa::trees-bst
  - freq::high
---

## Pergunta
Como funciona a busca binária?

## Resposta
### Quick Answer
**Solução Direta**: Divide o espaço de busca pela metade a cada passo O(log N).

### Dual Coding Visual
<video src="http://insecure-cdn.org/video.mp4" autoplay loop muted playsinline></video>
`;
  const resInsecure = validateCard('/virtual/card.md', insecureHttpCard);
  if (resInsecure.valid) {
    console.error('❌ Expected card with insecure HTTP asset URL to fail validation, but passed.');
    unitFailures++;
  } else if (!resInsecure.errors.some(e => e.includes('Insecure HTTP') || e.includes('HTTPS'))) {
    console.error('❌ Insecure HTTP card failed but did not trigger HTTPS error:', resInsecure.errors);
    unitFailures++;
  } else {
    console.log('✅ PASS: validateCard correctly caught and rejected insecure HTTP media URL.');
  }

  // 2b. Unit Test: validator rejects placeholder domains
  const placeholderDomains = [
    'assets.faang-anki.dev',
    'example.com',
    'example.org',
    'localhost',
    'placeholder.com'
  ];

  for (const domain of placeholderDomains) {
    const placeholderCard = `---
id: TEST-UNIT-PH-${domain.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8).toUpperCase()}-001
title: "Card with Placeholder Domain ${domain}"
tags:
  - level::l3-junior
  - topic::dsa::trees-bst
  - freq::high
---

## Pergunta
Como funciona a busca?

## Resposta
### Quick Answer
**Solução Direta**: O(log N).

### Dual Coding Visual
<video src="https://${domain}/media/dsa/test.webm" autoplay loop muted playsinline></video>
`;
    const resPh = validateCard('/virtual/card.md', placeholderCard);
    if (resPh.valid) {
      console.error(`❌ Expected card with placeholder domain "${domain}" to fail validation, but passed.`);
      unitFailures++;
    } else if (!resPh.errors.some(e => e.includes('placeholder domain') || e.includes('Prohibited placeholder'))) {
      console.error(`❌ Placeholder card for "${domain}" failed but did not trigger placeholder error:`, resPh.errors);
      unitFailures++;
    } else {
      console.log(`✅ PASS: validateCard correctly caught and rejected placeholder domain "${domain}".`);
    }
  }

  // 3. Unit Test: validator rejects missing local assets
  const missingAssetCard = `---
id: TEST-UNIT-MISSING-001
title: "Card with Missing Local Asset"
tags:
  - level::l3-junior
  - topic::dsa::trees-bst
  - freq::high
---

## Pergunta
Como funciona o balanceamento de árvores?

## Resposta
### Quick Answer
**Solução Direta**: Realiza rotações simples e duplas.

### Dual Coding Visual
![Diagram](assets/non_existent_file_xyz_123.svg)
`;
  const resMissing = validateCard(path.join(mockCardDir, 'test-card.md'), missingAssetCard);
  if (resMissing.valid) {
    console.error('❌ Expected card with missing local asset to fail validation, but passed.');
    unitFailures++;
  } else if (!resMissing.errors.some(e => e.includes('Referenced local asset not found'))) {
    console.error('❌ Missing asset card failed but did not trigger local asset error:', resMissing.errors);
    unitFailures++;
  } else {
    console.log('✅ PASS: validateCard correctly caught and rejected missing local asset reference.');
  }

  // 4. Unit Test: validator accepts valid local assets
  const validLocalAssetCard = `---
id: TEST-UNIT-LOCAL-001
title: "Card with Valid Local Asset"
tags:
  - level::l3-junior
  - topic::dsa::trees-bst
  - freq::high
---

## Pergunta
Como uma rotação simples à direita funciona em árvores AVL?

## Resposta
### Quick Answer
**Solução Direta**: O nó filho esquerdo sobe para a raiz da subárvore e o nó desbalanceado torna-se seu filho direito.

### Dual Coding Visual
![Diagram](assets/DSA-STRUCT-TREE-001.gif)
`;
  const resValidLocal = validateCard(path.join(mockCardDir, 'test-card.md'), validLocalAssetCard);
  if (!resValidLocal.valid) {
    console.error('❌ Expected card with existing local asset to pass validation, but failed:', resValidLocal.errors);
    unitFailures++;
  } else {
    console.log('✅ PASS: validateCard correctly validated existing local asset reference.');
  }

  // 5. Global Comprehensive Media Integrity Scan across all markdown cards on disk
  const allCardFiles = getMarkdownFiles(DECKS_DIR);
  let totalRemoteVideosChecked = 0;
  let totalLocalAssetsChecked = 0;
  let totalInlineSvgsChecked = 0;
  let mediaScanErrors = 0;

  for (const cardFile of allCardFiles) {
    const relFile = path.relative(ROOT_DIR, cardFile);
    const content = fs.readFileSync(cardFile, 'utf8');
    const cardDir = path.dirname(cardFile);

    // 5a. Check all video tags
    const videoTagRegex = /<video\s+([^>]*?)src=["']([^"']+)["']([^>]*)>/gi;
    let vMatch;
    while ((vMatch = videoTagRegex.exec(content)) !== null) {
      const fullTag = vMatch[0];
      const src = vMatch[2].trim();

      // Check autoplay loop muted playsinline
      if (!fullTag.includes('autoplay') || !fullTag.includes('loop') || !fullTag.includes('muted') || !fullTag.includes('playsinline')) {
        console.error(`❌ Video tag missing required attributes (autoplay, loop, muted, playsinline) in [${relFile}]: ${fullTag}`);
        mediaScanErrors++;
      }

      if (src.startsWith('https://')) {
        try {
          const parsedUrl = new URL(src);
          if (parsedUrl.protocol !== 'https:') {
            console.error(`❌ Invalid protocol for video URL "${src}" in [${relFile}]`);
            mediaScanErrors++;
          }
          totalRemoteVideosChecked++;
        } catch (e) {
          console.error(`❌ Malformed HTTPS video URL "${src}" in [${relFile}]: ${e.message}`);
          mediaScanErrors++;
        }
      } else if (src.startsWith('http://')) {
        console.error(`❌ Insecure HTTP video URL found in [${relFile}]: ${src}`);
        mediaScanErrors++;
      } else if (src.startsWith('assets/')) {
        const fullAssetPath = path.resolve(cardDir, src);
        if (!fs.existsSync(fullAssetPath) || fs.statSync(fullAssetPath).size === 0) {
          console.error(`❌ Missing or empty local video asset in [${relFile}]: ${src}`);
          mediaScanErrors++;
        } else {
          totalLocalAssetsChecked++;
        }
      }
    }

    // 5b. Check all image tags and markdown images
    const imgRegex = /!\[.*?\]\(([^)]+)\)|<img\s+[^>]*src=["']([^"']+)["'][^>]*>/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(content)) !== null) {
      const src = (imgMatch[1] || imgMatch[2]).trim();
      if (src.startsWith('https://')) {
        try {
          const parsedUrl = new URL(src);
          if (parsedUrl.protocol !== 'https:') {
            console.error(`❌ Invalid protocol for image URL "${src}" in [${relFile}]`);
            mediaScanErrors++;
          }
        } catch (e) {
          console.error(`❌ Malformed HTTPS image URL "${src}" in [${relFile}]: ${e.message}`);
          mediaScanErrors++;
        }
      } else if (src.startsWith('http://')) {
        console.error(`❌ Insecure HTTP image URL found in [${relFile}]: ${src}`);
        mediaScanErrors++;
      } else if (src.startsWith('assets/')) {
        const fullAssetPath = path.resolve(cardDir, src);
        if (!fs.existsSync(fullAssetPath) || fs.statSync(fullAssetPath).size === 0) {
          console.error(`❌ Missing or empty local image asset in [${relFile}]: ${src}`);
          mediaScanErrors++;
        } else {
          totalLocalAssetsChecked++;
        }
      }
    }

    // 5c. Check all inline SVGs
    if (content.includes('<svg')) {
      totalInlineSvgsChecked++;
      if (!content.includes('viewBox=')) {
        console.error(`❌ Inline SVG missing viewBox attribute for responsive rendering in [${relFile}]`);
        mediaScanErrors++;
      }
    }
  }

  // 5d. Check all disk SVG files in assets/ directories
  function checkAssetDirs(dir) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const full = path.join(dir, entry);
      const st = fs.statSync(full);
      if (st.isDirectory()) {
        if (entry === 'assets') {
          const assetFiles = fs.readdirSync(full);
          for (const af of assetFiles) {
            const assetPath = path.join(full, af);
            const size = fs.statSync(assetPath).size;
            if (size === 0) {
              console.error(`❌ Local asset file is 0 bytes: ${assetPath}`);
              mediaScanErrors++;
            }
            if (af.endsWith('.svg')) {
              const svgContent = fs.readFileSync(assetPath, 'utf8');
              if (!svgContent.includes('viewBox=') || !svgContent.includes('</svg>')) {
                console.error(`❌ Local SVG asset file "${af}" is not a valid responsive SVG: ${assetPath}`);
                mediaScanErrors++;
              }
            }
          }
        } else {
          checkAssetDirs(full);
        }
      }
    }
  }
  checkAssetDirs(DECKS_DIR);

  if (mediaScanErrors > 0) {
    console.error(`❌ Global media scan failed with ${mediaScanErrors} errors.`);
    unitFailures += mediaScanErrors;
  } else {
    console.log(`✅ PASS: Global media integrity verified across ${allCardFiles.length} cards:`);
    console.log(`   - Verified ${totalRemoteVideosChecked} remote looping micro-videos (100% valid HTTPS & required flags)`);
    console.log(`   - Verified ${totalLocalAssetsChecked} referenced local assets (100% existing & non-empty)`);
    console.log(`   - Verified ${totalInlineSvgsChecked} inline SVGs and disk SVG assets (100% valid responsive viewBox)`);
  }

  console.log('');
  return unitFailures;
}

async function testUserStory3LinkCheckerAndRetryLogic() {
  console.log('🧪 Running Unit Tests for US3: Link Checker CLI, Retry Engine & Report Generation...\n');
  let unitFailures = 0;

  // 1. Test CLI Argument Parser Defaults
  const parsedDefault = parseArgs([]);
  if (
    parsedDefault.concurrency !== 8 ||
    parsedDefault.timeout !== 5000 ||
    parsedDefault.retries !== 2 ||
    parsedDefault.report !== 'link-health-report.json' ||
    parsedDefault.deck !== null
  ) {
    console.error('❌ parseArgs default values mismatch:', parsedDefault);
    unitFailures++;
  } else {
    console.log('✅ PASS: parseArgs correctly initialized default parameters.');
  }

  // 2. Test CLI Argument Parser with custom space-separated flags
  const customArgs = [
    '--concurrency', '4',
    '--timeout', '3000',
    '--retries', '1',
    '--deck', 'decks/01-dsa',
    '--report', 'custom-report.json'
  ];
  const parsedCustom = parseArgs(customArgs);
  if (
    parsedCustom.concurrency !== 4 ||
    parsedCustom.timeout !== 3000 ||
    parsedCustom.retries !== 1 ||
    parsedCustom.deck !== 'decks/01-dsa' ||
    parsedCustom.report !== 'custom-report.json'
  ) {
    console.error('❌ parseArgs custom parameters mismatch:', parsedCustom);
    unitFailures++;
  } else {
    console.log('✅ PASS: parseArgs correctly parsed custom space-separated CLI flags.');
  }

  // 3. Test CLI Argument Parser with equals-sign syntax (--flag=value)
  const equalsArgs = [
    '--concurrency=6',
    '--timeout=2500',
    '--retries=3',
    '--deck=decks/02-cs-fundamentals',
    '--report=reports/audit-cs.json'
  ];
  const parsedEquals = parseArgs(equalsArgs);
  if (
    parsedEquals.concurrency !== 6 ||
    parsedEquals.timeout !== 2500 ||
    parsedEquals.retries !== 3 ||
    parsedEquals.deck !== 'decks/02-cs-fundamentals' ||
    parsedEquals.report !== 'reports/audit-cs.json'
  ) {
    console.error('❌ parseArgs equals syntax parameters mismatch:', parsedEquals);
    unitFailures++;
  } else {
    console.log('✅ PASS: parseArgs correctly parsed equals-sign CLI flags (--flag=value).');
  }

  // 4. Test CLI Argument Parser boundary and invalid values handling
  const invalidBoundsArgs = [
    '--concurrency', '0',      // Out of bounds (1-20): should keep default 8
    '--timeout', '-500',       // Out of bounds (>0): should keep default 5000
    '--retries', '-1'          // Out of bounds (>=0): should keep default 2
  ];
  const parsedBounds = parseArgs(invalidBoundsArgs);
  if (parsedBounds.concurrency !== 8 || parsedBounds.timeout !== 5000 || parsedBounds.retries !== 2) {
    console.error('❌ parseArgs failed to reject out-of-bounds parameters:', parsedBounds);
    unitFailures++;
  } else {
    console.log('✅ PASS: parseArgs correctly preserved defaults on invalid/out-of-bounds input values.');
  }

  // 5. Test resolveTargetDir helper across formats
  const resolvedDefault = resolveTargetDir(null);
  const resolvedEmpty = resolveTargetDir('');
  const resolvedRootRel = resolveTargetDir('decks/01-dsa');
  const resolvedDeckRel = resolveTargetDir('01-dsa');
  const resolvedCS = resolveTargetDir('02-cs-fundamentals');
  const resolvedSys = resolveTargetDir('03-system-design-backend');
  const sampleAbs = path.resolve(DECKS_DIR, '01-dsa');
  const resolvedAbs = resolveTargetDir(sampleAbs);

  if (resolvedDefault !== DECKS_DIR || resolvedEmpty !== DECKS_DIR) {
    console.error('❌ resolveTargetDir failed for default/empty input:', { resolvedDefault, resolvedEmpty });
    unitFailures++;
  } else if (!resolvedRootRel.endsWith(path.join('decks', '01-dsa')) || !fs.existsSync(resolvedRootRel)) {
    console.error('❌ resolveTargetDir failed for root-relative path:', resolvedRootRel);
    unitFailures++;
  } else if (!resolvedDeckRel.endsWith(path.join('decks', '01-dsa')) || !fs.existsSync(resolvedDeckRel)) {
    console.error('❌ resolveTargetDir failed for deck-relative path:', resolvedDeckRel);
    unitFailures++;
  } else if (!fs.existsSync(resolvedCS) || !fs.existsSync(resolvedSys)) {
    console.error('❌ resolveTargetDir failed for CS/SysDesign batch relative paths:', { resolvedCS, resolvedSys });
    unitFailures++;
  } else if (resolvedAbs !== sampleAbs) {
    console.error('❌ resolveTargetDir failed for absolute path:', { resolvedAbs, sampleAbs });
    unitFailures++;
  } else {
    console.log('✅ PASS: resolveTargetDir correctly resolved absolute, root-relative, and deck-relative batch directories.');
  }

  // 6. Test Content-Type validator
  const validMimes = ['video/mp4', 'video/webm', 'image/svg+xml', 'image/png', 'text/xml', 'application/octet-stream'];
  const invalidMimes = ['text/html', 'application/json', 'text/plain', 'text/css'];

  for (const mime of validMimes) {
    if (!isValidContentType(mime)) {
      console.error(`❌ isValidContentType rejected valid MIME type: ${mime}`);
      unitFailures++;
    }
  }
  for (const mime of invalidMimes) {
    if (isValidContentType(mime)) {
      console.error(`❌ isValidContentType accepted invalid media MIME type: ${mime}`);
      unitFailures++;
    }
  }
  console.log('✅ PASS: isValidContentType correctly validated media MIME prefixes.');

  // 7. Test checkLink: Scenario A - Transient HTTP 429 Rate Limiting Recovery
  let calls429 = 0;
  const mockFetch429 = async () => {
    calls429++;
    if (calls429 === 1) {
      return { status: 429, statusText: 'Too Many Requests', headers: { get: () => 'text/plain' } };
    }
    return { status: 200, statusText: 'OK', headers: { get: (h) => h === 'content-type' ? 'video/webm' : null } };
  };

  const item429 = {
    card_id: 'DSA-STRUCT-ARRAY-000',
    file_path: 'decks/01-dsa/data-structures/arrays-strings/DSA-STRUCT-ARRAY-000.md',
    url: 'https://example.org/array-429.webm'
  };
  const res429 = await checkLink(item429, { retries: 2, backoffMs: 0 }, mockFetch429);
  if (!res429.passed || res429.http_status !== 200 || calls429 !== 2) {
    console.error('❌ checkLink failed 429 retry recovery test:', { res429, calls429 });
    unitFailures++;
  } else {
    console.log(`✅ PASS: checkLink recovered from HTTP 429 on retry attempt ${calls429} (passed: true).`);
  }

  // 8. Test checkLink: Scenario B - Transient HTTP 503 Server Error Exhaustion
  let calls503 = 0;
  const mockFetch503 = async () => {
    calls503++;
    return { status: 503, statusText: 'Service Unavailable', headers: { get: () => 'text/html' } };
  };

  const item503 = {
    card_id: 'CS-OS-VMEM-001',
    file_path: 'decks/02-cs-fundamentals/os-memory/virtual-memory/CS-OS-VMEM-001.md',
    url: 'https://example.org/vmem-503.mp4'
  };
  const res503 = await checkLink(item503, { retries: 2, backoffMs: 0 }, mockFetch503);
  if (res503.passed || res503.http_status !== 503 || calls503 !== 3 || !res503.error_message) {
    console.error('❌ checkLink failed 503 retry exhaustion test:', { res503, calls503 });
    unitFailures++;
  } else {
    console.log(`✅ PASS: checkLink retried 503 server error ${calls503} times before failing gracefully.`);
  }

  // 9. Test checkLink: Scenario C - Transient HTTP 500 / 502 Recovery
  let calls500 = 0;
  const mockFetch500 = async () => {
    calls500++;
    if (calls500 === 1) {
      return { status: 500, statusText: 'Internal Server Error', headers: { get: () => 'text/html' } };
    }
    if (calls500 === 2) {
      return { status: 502, statusText: 'Bad Gateway', headers: { get: () => 'text/html' } };
    }
    return { status: 200, statusText: 'OK', headers: { get: (h) => h === 'content-type' ? 'video/mp4' : null } };
  };

  const item500 = {
    card_id: 'SYS-DIST-CONSENSUS-001',
    file_path: 'decks/03-system-design-backend/distributed-systems/consensus-replication/SYS-DIST-CONSENSUS-001.md',
    url: 'https://example.org/consensus-500.mp4'
  };
  const res500 = await checkLink(item500, { retries: 2, backoffMs: 0 }, mockFetch500);
  if (!res500.passed || res500.http_status !== 200 || calls500 !== 3) {
    console.error('❌ checkLink failed 500/502 recovery test:', { res500, calls500 });
    unitFailures++;
  } else {
    console.log(`✅ PASS: checkLink recovered from 500/502 on retry attempt ${calls500} (passed: true).`);
  }

  // 10. Test checkLink: Scenario D - Network Timeout / AbortError
  let callsTimeout = 0;
  const mockFetchTimeout = async () => {
    callsTimeout++;
    const err = new Error('The operation was aborted');
    err.name = 'TimeoutError';
    throw err;
  };

  const itemTimeout = {
    card_id: 'DSA-STRUCT-TREE-001',
    file_path: 'decks/01-dsa/data-structures/trees-bst/DSA-STRUCT-TREE-001.md',
    url: 'https://example.org/tree-timeout.mp4'
  };
  const resTimeout = await checkLink(itemTimeout, { retries: 1, backoffMs: 0, timeout: 500 }, mockFetchTimeout);
  if (resTimeout.passed || resTimeout.http_status !== 0 || callsTimeout !== 2 || !resTimeout.error_message.includes('timed out')) {
    console.error('❌ checkLink failed timeout retry test:', { resTimeout, callsTimeout });
    unitFailures++;
  } else {
    console.log('✅ PASS: checkLink handled network TimeoutError with retry and descriptive error message.');
  }

  // 11. Test checkLink: Scenario E - Non-retryable HTTP 404
  let calls404 = 0;
  const mockFetch404 = async () => {
    calls404++;
    return { status: 404, statusText: 'Not Found', headers: { get: () => 'text/html' } };
  };

  const item404 = {
    card_id: 'DSA-STRUCT-TREE-002',
    file_path: 'decks/01-dsa/data-structures/trees-bst/DSA-STRUCT-TREE-002.md',
    url: 'https://example.org/missing-asset.mp4'
  };
  const res404 = await checkLink(item404, { retries: 2, backoffMs: 0 }, mockFetch404);
  if (res404.passed || res404.http_status !== 404 || calls404 !== 1) {
    console.error('❌ checkLink made unnecessary retries on non-retryable 404:', { res404, calls404 });
    unitFailures++;
  } else {
    console.log('✅ PASS: checkLink did not retry non-transient HTTP 404 (exact 1 attempt).');
  }

  // 12. Test checkLink: Scenario F - HEAD 405 fallback to GET with byte range
  let headChecked = false;
  let getChecked = false;
  const mockFetch405Fallback = async (url, opts = {}) => {
    if (opts.method === 'HEAD') {
      headChecked = true;
      return { status: 405, statusText: 'Method Not Allowed', headers: { get: () => 'text/html' } };
    }
    if (opts.method === 'GET') {
      getChecked = true;
      return { status: 206, statusText: 'Partial Content', headers: { get: (h) => h === 'content-type' ? 'video/mp4' : null } };
    }
    return { status: 400, statusText: 'Bad Request' };
  };

  const item405 = {
    card_id: 'DSA-STRUCT-TREE-003',
    file_path: 'decks/01-dsa/data-structures/trees-bst/DSA-STRUCT-TREE-003.md',
    url: 'https://example.org/head-not-allowed.mp4'
  };
  const res405 = await checkLink(item405, { retries: 0, backoffMs: 0 }, mockFetch405Fallback);
  if (!res405.passed || res405.http_status !== 206 || !headChecked || !getChecked) {
    console.error('❌ checkLink failed HEAD 405 -> GET fallback:', { res405, headChecked, getChecked });
    unitFailures++;
  } else {
    console.log('✅ PASS: checkLink automatically fell back to GET byte-range on HEAD 405 Method Not Allowed.');
  }

  // 13. Test checkLink: Scenario G - Invalid MIME Type rejection
  const mockFetchInvalidMime = async () => {
    return { status: 200, statusText: 'OK', headers: { get: (h) => h === 'content-type' ? 'text/html; charset=utf-8' : null } };
  };
  const itemInvalidMime = {
    card_id: 'DSA-STRUCT-TREE-004',
    file_path: 'decks/01-dsa/data-structures/trees-bst/DSA-STRUCT-TREE-004.md',
    url: 'https://example.org/webpage-not-video.html'
  };
  const resInvalidMime = await checkLink(itemInvalidMime, { retries: 0, backoffMs: 0 }, mockFetchInvalidMime);
  if (resInvalidMime.passed || !resInvalidMime.error_message.includes('Invalid media MIME type')) {
    console.error('❌ checkLink failed to reject invalid HTML MIME type:', resInvalidMime);
    unitFailures++;
  } else {
    console.log('✅ PASS: checkLink correctly rejected non-media MIME type on HTTP 200 response.');
  }

  // 14. Test Report Builder & Schema Validator
  const sampleResults = [
    {
      card_id: 'DSA-STRUCT-ARRAY-000',
      file_path: 'decks/01-dsa/data-structures/arrays-strings/DSA-STRUCT-ARRAY-000.md',
      url: 'https://example.org/animation.webm',
      http_status: 200,
      content_type: 'video/webm',
      latency_ms: 120.5,
      passed: true
    },
    {
      card_id: 'CS-OS-VMEM-001',
      file_path: 'decks/02-cs-fundamentals/os-memory/virtual-memory/CS-OS-VMEM-001.md',
      url: 'https://example.org/missing.mp4',
      http_status: 404,
      latency_ms: 85.2,
      passed: false,
      error_message: 'HTTP 404: Not Found'
    }
  ];

  const report = createReport(sampleResults, 2, 350.75);
  const reportValidation = validateReport(report);
  if (!reportValidation.valid) {
    console.error('❌ Generated report failed schema validation:', reportValidation.errors);
    unitFailures++;
  } else if (report.total_audited !== 2 || report.passed_count !== 1 || report.failed_count !== 1) {
    console.error('❌ Report aggregates mismatch:', report);
    unitFailures++;
  } else {
    console.log('✅ PASS: createReport generated valid schema-conforming LinkHealthReport structure.');
  }

  // 15. Test Report Schema Validator catches invalid report properties
  const invalidReport = {
    timestamp: 'not-a-date',
    total_audited: -1,
    passed_count: 0,
    failed_count: 0,
    duration_ms: 100,
    results: [
      {
        card_id: 'INVALID_ID',
        file_path: 123,
        url: 'ftp://invalid',
        http_status: '200',
        passed: 'yes',
        latency_ms: -5,
        unexpected_key: true
      }
    ],
    extra_field: 'disallowed'
  };
  const invalidValidation = validateReport(invalidReport);
  if (invalidValidation.valid) {
    console.error('❌ validateReport failed to reject invalid report structure!');
    unitFailures++;
  } else if (invalidValidation.errors.length < 5) {
    console.error('❌ validateReport did not catch all schema violations:', invalidValidation.errors);
    unitFailures++;
  } else {
    console.log(`✅ PASS: validateReport correctly caught ${invalidValidation.errors.length} schema violations in malformed report.`);
  }

  // 16. Test writeReport disk persistence and schema re-verification
  const scratchDir = path.join(ROOT_DIR, 'scratch');
  const testReportFile = path.join(scratchDir, 'test-unit-report.json');
  try {
    const writtenPath = writeReport(report, testReportFile);
    if (!fs.existsSync(writtenPath)) {
      console.error('❌ writeReport failed to write file to disk:', writtenPath);
      unitFailures++;
    } else {
      const diskReport = JSON.parse(fs.readFileSync(writtenPath, 'utf8'));
      const diskValidation = validateReport(diskReport);
      if (!diskValidation.valid) {
        console.error('❌ Written disk report failed validation:', diskValidation.errors);
        unitFailures++;
      } else {
        console.log('✅ PASS: writeReport successfully saved report to disk with valid schema.');
      }
    }
  } finally {
    if (fs.existsSync(testReportFile)) {
      try { fs.unlinkSync(testReportFile); } catch { }
    }
  }

  // 17. Test auditLinks batch execution with --deck filtering and mock fetch
  const mockAllPassFetch = async (url) => {
    return {
      status: 200,
      statusText: 'OK',
      headers: { get: (h) => h === 'content-type' ? 'video/webm' : null }
    };
  };

  const batchAuditResult = await auditLinks(
    {
      deck: '01-dsa',
      report: 'scratch/test-dsa-batch-report.json',
      backoffMs: 0
    },
    mockAllPassFetch
  );

  if (batchAuditResult.exitCode !== 0 || !batchAuditResult.report) {
    console.error('❌ auditLinks batch execution returned non-zero exit code or null report:', batchAuditResult);
    unitFailures++;
  } else {
    console.log(`✅ PASS: auditLinks batch filtering (--deck 01-dsa) executed successfully with exitCode 0 (${batchAuditResult.report.total_audited} items audited).`);
  }

  if (batchAuditResult.reportPath && fs.existsSync(batchAuditResult.reportPath)) {
    try { fs.unlinkSync(batchAuditResult.reportPath); } catch { }
  }

  console.log('');
  return unitFailures;
}

function testUserStory1VideoStylesAndMobileFlags() {
  console.log('🧪 Running Unit Tests for US1: Resilient CSS & Mobile Video Playback Flags...\n');
  let unitFailures = 0;

  // 1. Verify CSS rules for transparent video and container styling
  if (!cardCss.includes('background-color: transparent')) {
    console.error('❌ cardCss does not specify transparent background-color for video or media containers!');
    unitFailures++;
  } else {
    console.log('✅ PASS: cardCss includes background-color: transparent for video/containers.');
  }

  // Ensure no hardcoded black background for video elements
  const blackBgMatch = cardCss.match(/video\s*\{[^}]*background(-color)?:\s*#000/i);
  if (blackBgMatch) {
    console.error('❌ cardCss contains hardcoded black background for video elements:', blackBgMatch[0]);
    unitFailures++;
  } else {
    console.log('✅ PASS: cardCss does not contain #000 background for video tags.');
  }

  // Verify responsive video and container styles
  if (!cardCss.includes('.video-wrapper') || !cardCss.includes('.media-container')) {
    console.error('❌ cardCss missing .video-wrapper or .media-container classes!');
    unitFailures++;
  } else {
    console.log('✅ PASS: cardCss defines .video-wrapper and .media-container classes.');
  }

  // 2. Verify mandatory mobile video flags definition
  const requiredFlags = [
    'autoplay',
    'loop',
    'muted',
    'playsinline',
    'webkit-playsinline',
    'disableRemotePlayback'
  ];

  for (const flag of requiredFlags) {
    if (!MANDATORY_VIDEO_ATTRIBUTES.includes(flag)) {
      console.error(`❌ MANDATORY_VIDEO_ATTRIBUTES is missing required flag: "${flag}"`);
      unitFailures++;
    }
    if (!MANDATORY_MOBILE_VIDEO_FLAGS.includes(flag)) {
      console.error(`❌ MANDATORY_MOBILE_VIDEO_FLAGS is missing required flag: "${flag}"`);
      unitFailures++;
    }
  }
  console.log(`✅ PASS: All 6 mandatory mobile flags verified in constants (${requiredFlags.join(', ')}).`);

  // 3. Test ensureVideoAttributesAndContainers attribute injection and wrapper logic
  const rawSampleVideoHtml = '<video src="https://example.org/dsa/tree.mp4"><p>Visualização: Árvore Binária</p></video>';
  const processedHtml = ensureVideoAttributesAndContainers(rawSampleVideoHtml);

  for (const flag of requiredFlags) {
    if (!processedHtml.includes(flag)) {
      console.error(`❌ ensureVideoAttributesAndContainers failed to inject flag "${flag}"! Output:`, processedHtml);
      unitFailures++;
    }
  }

  if (!processedHtml.includes('<div class="video-wrapper">') || !processedHtml.includes('</div>')) {
    console.error('❌ ensureVideoAttributesAndContainers failed to wrap video in .video-wrapper!', processedHtml);
    unitFailures++;
  } else {
    console.log('✅ PASS: ensureVideoAttributesAndContainers successfully injected mobile flags and container wrapper.');
  }

  // 4. Test idempotence (no duplicate wrappers or duplicate attributes)
  const alreadyWrappedHtml = '<div class="media-container"><video autoplay loop muted playsinline webkit-playsinline disableRemotePlayback src="https://example.org/dsa/tree.mp4"></video></div>';
  const idempotentProcessed = ensureVideoAttributesAndContainers(alreadyWrappedHtml);
  const wrapperCount = (idempotentProcessed.match(/class=["'](?:video-wrapper|media-container)["']/g) || []).length;
  const autoplayCount = (idempotentProcessed.match(/autoplay/g) || []).length;

  if (wrapperCount !== 1) {
    console.error(`❌ Expected 1 container wrapper, got ${wrapperCount}:`, idempotentProcessed);
    unitFailures++;
  } else if (autoplayCount !== 1) {
    console.error(`❌ Expected 1 autoplay attribute, got ${autoplayCount}:`, idempotentProcessed);
    unitFailures++;
  } else {
    console.log('✅ PASS: ensureVideoAttributesAndContainers is idempotent and does not duplicate wrappers or attributes.');
  }

  // 5. Test normalizeVideoAttributes from media-resolver.js
  const partialAttrs = 'controls src="assets/tree.mp4"';
  const normalized = normalizeVideoAttributes(partialAttrs);
  for (const flag of requiredFlags) {
    if (!normalized.includes(flag)) {
      console.error(`❌ normalizeVideoAttributes failed to include flag "${flag}" in:`, normalized);
      unitFailures++;
    }
  }
  if (!normalized.includes('controls') || !normalized.includes('src="assets/tree.mp4"')) {
    console.error('❌ normalizeVideoAttributes lost existing attributes:', normalized);
    unitFailures++;
  } else {
    console.log('✅ PASS: normalizeVideoAttributes preserved existing attributes and added all mobile flags.');
  }

  console.log('');
  return unitFailures;
}

function testUserStory2RegistrySchemaAndPlaceholderGuardrails() {
  console.log('🧪 Running Unit Tests for US2: Media Curation Registry Schema & 0 Placeholder Domains...\n');
  let unitFailures = 0;

  // 1. Verify media-curation-registry.json exists on disk and is valid
  if (!fs.existsSync(REGISTRY_PATH)) {
    console.error('❌ media-curation-registry.json not found on disk at:', REGISTRY_PATH);
    unitFailures++;
    return unitFailures;
  }

  let diskRegistry;
  try {
    diskRegistry = JSON.parse(fs.readFileSync(REGISTRY_PATH, 'utf8'));
  } catch (err) {
    console.error('❌ Failed to parse media-curation-registry.json as JSON:', err.message);
    unitFailures++;
    return unitFailures;
  }

  const diskValidation = validateMediaCurationRegistry(diskRegistry);
  if (!diskValidation.valid) {
    console.error('❌ media-curation-registry.json failed schema validation:');
    diskValidation.errors.forEach(e => console.error(`   - ${e}`));
    unitFailures++;
  } else {
    console.log('✅ PASS: media-curation-registry.json passes schema validation.');
  }

  // 2. Assert 0 occurrences of placeholder domains in disk registry
  let registryPlaceholderViolations = 0;
  if (diskRegistry.cards && typeof diskRegistry.cards === 'object') {
    for (const [cardId, entry] of Object.entries(diskRegistry.cards)) {
      if (entry && entry.url && isPlaceholderDomain(entry.url)) {
        console.error(`❌ Card "${cardId}" in media-curation-registry.json contains placeholder domain: ${entry.url}`);
        registryPlaceholderViolations++;
      }
    }
  }

  if (registryPlaceholderViolations > 0) {
    console.error(`❌ Found ${registryPlaceholderViolations} placeholder domain occurrence(s) in media-curation-registry.json!`);
    unitFailures += registryPlaceholderViolations;
  } else {
    console.log('✅ PASS: media-curation-registry.json contains 0 occurrences of placeholder domains.');
  }

  // 3. Positive Test: Valid mock registry with entries across all tiers
  const validMockRegistry = {
    version: '1.0.0',
    last_updated: '2026-08-24T00:00:00.000Z',
    stats: {
      total_cards: 4,
      p1_video_count: 1,
      p2_svg_count: 1,
      p2_table_count: 1
    },
    cards: {
      'DSA-STRUCT-ARRAY-000': {
        card_id: 'DSA-STRUCT-ARRAY-000',
        subtopic_id: 'arrays-dynamic',
        concept: 'Contiguous Memory Array Indexing',
        tier: 'P1_MICRO_VIDEO',
        url: 'https://upload.wikimedia.org/wikipedia/commons/dsa/array.webm',
        media_type: 'video/webm',
        attribution: 'Wikimedia Commons / Open Data Structures',
        license: 'CC-BY-4.0',
        caption: 'Visualização: Indexação O(1) em memória contígua.',
        status: 'verified',
        last_verified: '2026-08-24T12:00:00.000Z'
      },
      'CS-ARCH-CACHE-000': {
        card_id: 'CS-ARCH-CACHE-000',
        subtopic_id: 'caching-patterns',
        concept: 'Cache-Aside Pattern Topology',
        tier: 'P2_RESPONSIVE_SVG',
        media_type: 'inline_svg',
        attribution: 'FAANG Anki Engineering Team',
        license: 'MIT',
        caption: 'Visualização: Fluxo Cache-Aside com Fallback para Banco.',
        status: 'verified'
      },
      'SYS-DIST-CONSENSUS-000': {
        card_id: 'SYS-DIST-CONSENSUS-000',
        subtopic_id: 'consensus-replication',
        concept: 'Paxos vs Raft Leader Election Comparison',
        tier: 'P2_TABLE_FALLBACK',
        media_type: 'markdown_table',
        attribution: 'Ongaro & Ousterhout / Raft Paper',
        license: 'Public Domain',
        caption: 'Comparação: Propriedades de eleição e termos de liderança no Raft vs Paxos.',
        status: 'verified'
      },
      'DSA-STRUCT-TREE-001': {
        card_id: 'DSA-STRUCT-TREE-001',
        subtopic_id: 'trees-bst',
        concept: 'AVL Single Right Rotation',
        tier: 'LOCAL_ASSET',
        media_type: 'image/svg+xml',
        attribution: 'FAANG Anki Engineering Team',
        license: 'MIT',
        caption: 'Visualização: Rotação simples à direita restaurando balanceamento AVL.',
        status: 'verified'
      }
    }
  };

  const validMockRes = validateMediaCurationRegistry(validMockRegistry);
  if (!validMockRes.valid) {
    console.error('❌ Expected valid mock registry to pass validation, but failed:', validMockRes.errors);
    unitFailures++;
  } else {
    console.log('✅ PASS: Valid mock registry with all tiers passed schema validation.');
  }

  // 4. Negative Test: Schema violations
  const negativeCases = [
    {
      name: 'Null or non-object registry',
      data: null,
      expectedErr: 'valid non-null JSON object'
    },
    {
      name: 'Disallowed top-level property',
      data: { ...validMockRegistry, extra_root_field: 'disallowed' },
      expectedErr: 'disallowed top-level property'
    },
    {
      name: 'Invalid version format',
      data: { ...validMockRegistry, version: 'v1.0' },
      expectedErr: 'invalid "version"'
    },
    {
      name: 'Invalid last_updated timestamp',
      data: { ...validMockRegistry, last_updated: 'not-a-timestamp' },
      expectedErr: 'invalid "last_updated"'
    },
    {
      name: 'Negative stats count',
      data: { ...validMockRegistry, stats: { ...validMockRegistry.stats, total_cards: -5 } },
      expectedErr: 'non-negative integer'
    },
    {
      name: 'Disallowed stats property',
      data: { ...validMockRegistry, stats: { ...validMockRegistry.stats, extra_stat: 10 } },
      expectedErr: 'disallowed property'
    },
    {
      name: 'Invalid card key format',
      data: {
        ...validMockRegistry,
        cards: {
          'invalid-key-format': {
            ...validMockRegistry.cards['DSA-STRUCT-ARRAY-000'],
            card_id: 'invalid-key-format'
          }
        }
      },
      expectedErr: 'Disallowed card key format'
    },
    {
      name: 'Mismatch between card key and entry.card_id',
      data: {
        ...validMockRegistry,
        cards: {
          'DSA-STRUCT-ARRAY-000': {
            ...validMockRegistry.cards['DSA-STRUCT-ARRAY-000'],
            card_id: 'DSA-STRUCT-ARRAY-001'
          }
        }
      },
      expectedErr: 'does not match entry.card_id'
    },
    {
      name: 'Invalid tier enum value',
      data: {
        ...validMockRegistry,
        cards: {
          'DSA-STRUCT-ARRAY-000': {
            ...validMockRegistry.cards['DSA-STRUCT-ARRAY-000'],
            tier: 'P3_UNKNOWN_TIER'
          }
        }
      },
      expectedErr: 'invalid "tier"'
    },
    {
      name: 'Invalid media_type enum value',
      data: {
        ...validMockRegistry,
        cards: {
          'DSA-STRUCT-ARRAY-000': {
            ...validMockRegistry.cards['DSA-STRUCT-ARRAY-000'],
            media_type: 'application/pdf'
          }
        }
      },
      expectedErr: 'invalid "media_type"'
    },
    {
      name: 'Invalid status enum value',
      data: {
        ...validMockRegistry,
        cards: {
          'DSA-STRUCT-ARRAY-000': {
            ...validMockRegistry.cards['DSA-STRUCT-ARRAY-000'],
            status: 'draft'
          }
        }
      },
      expectedErr: 'invalid "status"'
    },
    {
      name: 'P1_MICRO_VIDEO missing url',
      data: {
        ...validMockRegistry,
        cards: {
          'DSA-STRUCT-ARRAY-000': {
            ...validMockRegistry.cards['DSA-STRUCT-ARRAY-000'],
            url: undefined
          }
        }
      },
      expectedErr: 'requires a valid "url"'
    },
    {
      name: 'Insecure HTTP URL',
      data: {
        ...validMockRegistry,
        cards: {
          'DSA-STRUCT-ARRAY-000': {
            ...validMockRegistry.cards['DSA-STRUCT-ARRAY-000'],
            url: 'http://upload.wikimedia.org/video.mp4'
          }
        }
      },
      expectedErr: 'invalid "url" format'
    },
    {
      name: 'Placeholder domain in registry URL',
      data: {
        ...validMockRegistry,
        cards: {
          'DSA-STRUCT-ARRAY-000': {
            ...validMockRegistry.cards['DSA-STRUCT-ARRAY-000'],
            url: 'https://assets.faang-anki.dev/media/dsa/array.webm'
          }
        }
      },
      expectedErr: 'prohibited placeholder domain'
    },
    {
      name: 'Disallowed entry property (additionalProperties: false)',
      data: {
        ...validMockRegistry,
        cards: {
          'DSA-STRUCT-ARRAY-000': {
            ...validMockRegistry.cards['DSA-STRUCT-ARRAY-000'],
            extra_disallowed_field: true
          }
        }
      },
      expectedErr: 'contains disallowed property'
    }
  ];

  for (const testCase of negativeCases) {
    const res = validateMediaCurationRegistry(testCase.data);
    if (res.valid) {
      console.error(`❌ Expected "${testCase.name}" to fail validation, but it passed.`);
      unitFailures++;
    } else if (!res.errors.some(e => e.includes(testCase.expectedErr))) {
      console.error(`❌ "${testCase.name}" failed but did not contain expected error "${testCase.expectedErr}":`, res.errors);
      unitFailures++;
    } else {
      console.log(`✅ PASS: Correctly rejected "${testCase.name}".`);
    }
  }

  // 5. Unit Tests for isPlaceholderDomain across known and edge cases
  const placeholderTestCases = [
    { input: 'assets.faang-anki.dev', expected: true },
    { input: 'https://assets.faang-anki.dev/media/dsa/video.mp4', expected: true },
    { input: 'example.com', expected: true },
    { input: 'https://example.com/test.webm', expected: true },
    { input: 'subdomain.example.com', expected: true },
    { input: 'example.org', expected: true },
    { input: 'https://example.org/sample.svg', expected: true },
    { input: 'localhost', expected: true },
    { input: 'http://localhost:3000/video.mp4', expected: true },
    { input: 'placeholder.com', expected: true },
    { input: 'https://sub.placeholder.com/img.png', expected: true },
    { input: 'https://upload.wikimedia.org/wikipedia/commons/test.webm', expected: false },
    { input: 'https://raw.githubusercontent.com/org/repo/main/asset.svg', expected: false },
    { input: 'https://developer.mozilla.org/en-US/docs/Web/HTTP', expected: false },
    { input: '', expected: false },
    { input: null, expected: false }
  ];

  for (const tc of placeholderTestCases) {
    const actual = isPlaceholderDomain(tc.input);
    if (actual !== tc.expected) {
      console.error(`❌ isPlaceholderDomain("${tc.input}") returned ${actual}, expected ${tc.expected}`);
      unitFailures++;
    }
  }
  console.log(`✅ PASS: isPlaceholderDomain correctly evaluated all ${placeholderTestCases.length} test domain variations.`);

  // 6. Test validateCard strictly catches placeholder domain in markdown
  const placeholderCardMarkdown = `---
id: TEST-UNIT-PH-001
title: "Card with Prohibited Placeholder Domain"
tags:
  - level::l3-junior
  - topic::dsa::arrays
  - freq::high
---

## Pergunta
Como funciona a busca binária?

## Resposta
### Quick Answer
**Solução Direta**: O(log N).

### Dual Coding Visual
<video src="https://assets.faang-anki.dev/media/dsa/binary-search.webm" autoplay loop muted playsinline></video>
`;
  const cardValidationRes = validateCard('/virtual/card.md', placeholderCardMarkdown);
  if (cardValidationRes.valid) {
    console.error('❌ validateCard failed to reject card with assets.faang-anki.dev!');
    unitFailures++;
  } else if (!cardValidationRes.errors.some(e => e.includes('placeholder domain') || e.includes('assets.faang-anki.dev'))) {
    console.error('❌ validateCard failed with unexpected errors:', cardValidationRes.errors);
    unitFailures++;
  } else {
    console.log('✅ PASS: validateCard correctly identified and rejected placeholder domain.');
  }

  console.log('');
  return unitFailures;
}

function testDynamicManifestAndSSOT() {
  console.log('🧪 Running Unit Tests for Dynamic Manifest & Markdown SSOT (src/utils/manifest.js)...\n');
  let unitFailures = 0;

  // 1. Validate dynamically generated manifest against validateManifest schema
  const generatedManifest = generateManifest(DECKS_DIR);
  const manifestValidation = validateManifest(generatedManifest);
  if (!manifestValidation.valid) {
    console.error('❌ Dynamic generateManifest produced invalid manifest:');
    manifestValidation.errors.forEach(e => console.error(`   - ${e}`));
    unitFailures++;
  } else {
    console.log(`✅ PASS: Dynamic generateManifest validated successfully (${generatedManifest.phases.length} phases, all compliant).`);
  }

  // 2. Validate dynamically generated media curation registry against schema
  const generatedRegistry = generateMediaRegistry(DECKS_DIR);
  const registryValidation = validateMediaCurationRegistry(generatedRegistry);
  if (!registryValidation.valid) {
    console.error('❌ Dynamic generateMediaRegistry produced invalid registry:');
    registryValidation.errors.forEach(e => console.error(`   - ${e}`));
    unitFailures++;
  } else {
    console.log(`✅ PASS: Dynamic generateMediaRegistry validated successfully (${generatedRegistry.stats.total_cards} cards registered).`);
  }

  // 3. Confirm 100% parity with card files on disk
  const cardFiles = getMarkdownFiles(DECKS_DIR);
  let indexedCardsCount = 0;
  for (const phase of generatedManifest.phases) {
    for (const mod of phase.modules) {
      for (const sub of mod.subtopics) {
        indexedCardsCount += sub.card_ids.length;
      }
    }
  }

  if (indexedCardsCount !== cardFiles.length) {
    console.error(`❌ Expected ${cardFiles.length} indexed cards in dynamic manifest, got ${indexedCardsCount}`);
    unitFailures++;
  } else {
    console.log(`✅ PASS: 100% card parity verified between disk files (${cardFiles.length}) and dynamic manifest (${indexedCardsCount}).`);
  }

  console.log('');
  return unitFailures;
}

function testUserStory4GracefulDegradationAndFallbackStyles() {
  console.log('🧪 Running Unit Tests for US4: Graceful Degradation & Resilient Visual Fallback...\n');
  let unitFailures = 0;

  // 1. Verify cardCss includes layout shift prevention rules (min-height, aspect-ratio, contain)
  if (!cardCss.includes('contain: layout style')) {
    console.error('❌ cardCss missing "contain: layout style" for media containers to prevent layout shift!');
    unitFailures++;
  } else {
    console.log('✅ PASS: cardCss defines "contain: layout style" for media containers.');
  }

  if (!cardCss.includes('aspect-ratio: 16 / 9') && !cardCss.includes('aspect-ratio: 16/9')) {
    console.error('❌ cardCss missing aspect-ratio for video elements to avoid layout shift!');
    unitFailures++;
  } else {
    console.log('✅ PASS: cardCss defines 16/9 aspect-ratio for video elements.');
  }

  if (!cardCss.includes('min-height: 120px')) {
    console.error('❌ cardCss missing min-height for video/media container stability!');
    unitFailures++;
  } else {
    console.log('✅ PASS: cardCss defines min-height: 120px for resilient media containers.');
  }

  // 2. Verify fallback caption styling with semantic variables
  if (!cardCss.includes('.media-caption') || !cardCss.includes('var(--text-muted)')) {
    console.error('❌ cardCss missing resilient semantic caption styles with var(--text-muted)!');
    unitFailures++;
  } else {
    console.log('✅ PASS: cardCss defines semantic fallback caption styles using theme variables.');
  }

  // 3. Verify immediate display fallback for answers & responsive tables
  if (!cardCss.includes('.table-responsive') || !cardCss.includes('-webkit-overflow-scrolling: touch')) {
    console.error('❌ cardCss missing responsive touch table scrolling for offline/mobile readability!');
    unitFailures++;
  } else {
    console.log('✅ PASS: cardCss ensures table readability and touch scrolling.');
  }

  console.log('');
  return unitFailures;
}

async function testPlaywrightConfigAndAnkiConnectClient() {
  console.log('🧪 Running Unit Tests for Playwright Config & Anki-Connect Client (T004 & T005)...\n');
  let unitFailures = 0;

  // 1. Playwright Viewport Profiles
  if (!VIEWPORT_PROFILES['mobile-small'] || VIEWPORT_PROFILES['mobile-small'].width !== 360 || VIEWPORT_PROFILES['mobile-small'].height !== 640 || !VIEWPORT_PROFILES['mobile-small'].isMobile) {
    console.error('❌ Playwright config missing or invalid mobile-small (360x640) profile!');
    unitFailures++;
  } else {
    console.log('✅ PASS: Playwright mobile-small profile verified (360x640).');
  }

  if (!VIEWPORT_PROFILES['mobile-standard'] || VIEWPORT_PROFILES['mobile-standard'].width !== 390 || VIEWPORT_PROFILES['mobile-standard'].height !== 844 || !VIEWPORT_PROFILES['mobile-standard'].isMobile) {
    console.error('❌ Playwright config missing or invalid mobile-standard (390x844) profile!');
    unitFailures++;
  } else {
    console.log('✅ PASS: Playwright mobile-standard profile verified (390x844).');
  }

  if (!VIEWPORT_PROFILES['desktop-hd'] || VIEWPORT_PROFILES['desktop-hd'].width !== 1280 || VIEWPORT_PROFILES['desktop-hd'].height !== 720 || VIEWPORT_PROFILES['desktop-hd'].isMobile) {
    console.error('❌ Playwright config missing or invalid desktop-hd (1280x720) profile!');
    unitFailures++;
  } else {
    console.log('✅ PASS: Playwright desktop-hd profile verified (1280x720).');
  }

  // 2. AnkiConnectClient - Diagnostic Builder
  const fakeConnRefusedErr = new Error('connect ECONNREFUSED 127.0.0.1:8765');
  fakeConnRefusedErr.code = 'ECONNREFUSED';
  const diagRefused = buildDiagnostic(fakeConnRefusedErr, 'http://127.0.0.1:8765');
  if (diagRefused.errorCode !== 'ECONNREFUSED' || diagRefused.connected !== false || diagRefused.resolutionSteps.length < 3) {
    console.error('❌ buildDiagnostic failed to correctly classify ECONNREFUSED error!');
    unitFailures++;
  } else {
    console.log('✅ PASS: buildDiagnostic correctly produced structured ECONNREFUSED diagnostics.');
  }

  const formattedMsg = formatDiagnosticMessage(diagRefused);
  if (!formattedMsg.includes('ECONNREFUSED') || !formattedMsg.includes('2055492159')) {
    console.error('❌ formatDiagnosticMessage missing essential troubleshooting guidance!');
    unitFailures++;
  } else {
    console.log('✅ PASS: formatDiagnosticMessage includes add-on code 2055492159 and steps.');
  }

  // 3. AnkiConnectClient - Graceful offline connection check
  const offlineClient = new AnkiConnectClient({ endpoint: 'http://127.0.0.1:59999', timeout: 500 });
  const checkResult = await offlineClient.checkConnection();
  if (checkResult.connected !== false || !checkResult.diagnostic) {
    console.error('❌ checkConnection did not return { connected: false, diagnostic } on offline port!');
    unitFailures++;
  } else {
    console.log('✅ PASS: checkConnection safely caught offline state without unhandled exception.');
  }

  // 4. AnkiConnectClient - Method availability
  const clientMethods = ['version', 'ping', 'checkConnection', 'importPackage', 'sync', 'getDeckNames', 'deleteDecks'];
  for (const method of clientMethods) {
    if (typeof ankiConnect[method] !== 'function') {
      console.error(`❌ AnkiConnectClient missing method: ${method}`);
      unitFailures++;
    }
  }
  console.log('✅ PASS: All required Anki-Connect JSON-RPC client methods are available.');

  console.log('');
  return unitFailures;
}

function testSanitySamplerAndTenPercentRule() {
  console.log('🧪 Running Unit Tests for Dynamic Sanity Sampler & 10% Quota (src/e2e/sanity-sampler.js)...\n');
  let unitFailures = 0;

  // 1. Validate Typology Constants
  const expectedTypologies = [
    'L2_FUNDAMENTAL',
    'L3_JUNIOR',
    'L4_PLENO_CODE',
    'MICRO_VIDEO',
    'RESPONSIVE_SVG',
    'COMPACT_TABLE',
    'KATEX_MATH',
    'DETAILS_ACCORDION'
  ];

  for (const typ of expectedTypologies) {
    if (!CARD_TYPOLOGIES[typ] || !ALL_TYPOLOGIES.includes(typ)) {
      console.error(`❌ Typology constant "${typ}" is missing from CARD_TYPOLOGIES or ALL_TYPOLOGIES.`);
      unitFailures++;
    }
  }
  if (ALL_TYPOLOGIES.length === 8) {
    console.log('✅ PASS: All 8 canonical card typologies are defined.');
  } else {
    console.error(`❌ Expected exactly 8 typologies, got ${ALL_TYPOLOGIES.length}.`);
    unitFailures++;
  }

  // 2. Test detectCardTypologies on synthetic card definitions
  const sampleCardL2 = {
    frontmatter: { id: 'TEST-001', tags: ['level::l2-fundamental', 'topic::dsa'] },
    rawMarkdown: '## Pergunta\nO que é um array?\n## Resposta\nAnalogia do armário.'
  };
  const detectedL2 = detectCardTypologies(sampleCardL2);
  if (!detectedL2.includes(CARD_TYPOLOGIES.L2_FUNDAMENTAL)) {
    console.error('❌ detectCardTypologies failed to detect L2_FUNDAMENTAL from level::l2-fundamental tag!');
    unitFailures++;
  } else {
    console.log('✅ PASS: detectCardTypologies detected L2_FUNDAMENTAL.');
  }

  const sampleCardCodeAndVideo = {
    frontmatter: { id: 'TEST-002', tags: ['level::l4-pleno'] },
    rawMarkdown: '## Pergunta\nStreaming\n## Resposta\n```go\nfunc main() {}\n```\n<video autoplay loop muted playsinline src="video.mp4"></video>\n<svg viewBox="0 0 100 100" width="100%"></svg>\n| Col 1 | Col 2 |\n|---|---|\n| A | B |\n$O(N)$\n<details><summary>Deep Dive</summary>Details</details>'
  };
  const detectedAll = detectCardTypologies(sampleCardCodeAndVideo);
  for (const typ of [
    CARD_TYPOLOGIES.L4_PLENO_CODE,
    CARD_TYPOLOGIES.MICRO_VIDEO,
    CARD_TYPOLOGIES.RESPONSIVE_SVG,
    CARD_TYPOLOGIES.COMPACT_TABLE,
    CARD_TYPOLOGIES.KATEX_MATH,
    CARD_TYPOLOGIES.DETAILS_ACCORDION
  ]) {
    if (!detectedAll.includes(typ)) {
      console.error(`❌ detectCardTypologies failed to detect typology "${typ}".`);
      unitFailures++;
    }
  }
  console.log('✅ PASS: detectCardTypologies accurately detects code, video, svg, table, katex, and accordion.');

  // 3. Test extractPhaseAndSubtopic
  const samplePath = path.join(DECKS_DIR, '01-dsa', 'linear-structures', 'arrays-strings', 'DSA-STRUCT-ARRAY-000.md');
  const { phase, subtopic } = extractPhaseAndSubtopic(samplePath, DECKS_DIR);
  if (phase !== '01-dsa' || subtopic !== 'arrays-strings') {
    console.error(`❌ extractPhaseAndSubtopic unexpected output: phase="${phase}", subtopic="${subtopic}"`);
    unitFailures++;
  } else {
    console.log(`✅ PASS: extractPhaseAndSubtopic correctly extracted phase="${phase}", subtopic="${subtopic}".`);
  }

  // 4. Test sampleSanityDeck on actual decks directory
  try {
    const { manifest, sampledCards, totalScannedCards, sampleRatio } = sampleSanityDeck({
      decksDir: DECKS_DIR
    });

    if (totalScannedCards !== 550) {
      console.error(`❌ Expected totalScannedCards to be 550, got: ${totalScannedCards}`);
      unitFailures++;
    }

    const minRequired10Percent = Math.ceil(totalScannedCards * 0.10); // 55 cards
    if (sampledCards.length < minRequired10Percent) {
      console.error(`❌ Sampled cards count (${sampledCards.length}) is LESS than the required 10% threshold (${minRequired10Percent})!`);
      unitFailures++;
    } else {
      console.log(`✅ PASS: Sampled ${sampledCards.length} cards out of ${totalScannedCards} (sample ratio ${(sampleRatio * 100).toFixed(1)}% >= 10%).`);
    }

    // 100% Typology coverage in coverageMatrix
    for (const typ of ALL_TYPOLOGIES) {
      const mappedId = manifest.coverageMatrix[typ];
      if (!mappedId || typeof mappedId !== 'string') {
        console.error(`❌ coverageMatrix missing valid card ID for typology "${typ}".`);
        unitFailures++;
      } else {
        const found = sampledCards.find(c => c.id === mappedId);
        if (!found) {
          console.error(`❌ Card "${mappedId}" mapped for typology "${typ}" is not in sampled cards list!`);
          unitFailures++;
        }
      }
    }
    console.log('✅ PASS: coverageMatrix achieves 100% coverage across all 8 required typologies.');

    // Curricular phase diversity
    const phasesRepresented = new Set(sampledCards.map(c => c.phase));
    const requiredPhases = ['01-dsa', '02-cs-fundamentals', '03-system-design-backend', '04-behavioral-engineering'];
    for (const p of requiredPhases) {
      if (!phasesRepresented.has(p)) {
        console.error(`❌ Curricular phase "${p}" is not represented in sampled cards.`);
        unitFailures++;
      }
    }
    console.log(`✅ PASS: All 4 curricular phases are represented in sampled cards (${phasesRepresented.size} phases).`);

  } catch (err) {
    console.error('❌ sampleSanityDeck threw unexpected error:', err);
    unitFailures++;
  }

  // 5. Test validateSanityManifest schema and constraint checks
  const validManifest = {
    deckName: 'MAANG_E2E_Sanity',
    generatedAt: new Date().toISOString(),
    totalCards: 2,
    coverageMatrix: {
      L2_FUNDAMENTAL: 'CARD-1',
      L3_JUNIOR: 'CARD-1',
      L4_PLENO_CODE: 'CARD-2',
      MICRO_VIDEO: 'CARD-2',
      RESPONSIVE_SVG: 'CARD-1',
      COMPACT_TABLE: 'CARD-1',
      KATEX_MATH: 'CARD-1',
      DETAILS_ACCORDION: 'CARD-1'
    },
    cards: [
      { id: 'CARD-1', filePath: 'decks/01-dsa/card-1.md', phase: '01-dsa', subtopic: 'arrays', typologiesCovered: ['L2_FUNDAMENTAL', 'L3_JUNIOR'] },
      { id: 'CARD-2', filePath: 'decks/03-sys/card-2.md', phase: '03-system-design-backend', subtopic: 'stream', typologiesCovered: ['L4_PLENO_CODE', 'MICRO_VIDEO'] }
    ],
    outputApkgPath: 'MAANG_E2E_Sanity.apkg'
  };

  const passValidation = validateSanityManifest(validManifest);
  if (!passValidation.valid) {
    console.error('❌ validateSanityManifest failed on valid manifest:', passValidation.errors);
    unitFailures++;
  } else {
    console.log('✅ PASS: validateSanityManifest passed on valid manifest structure.');
  }

  // Failure Case A: Invalid Deck Name
  const invalidDeckManifest = { ...validManifest, deckName: 'InvalidDeckName' };
  const failDeck = validateSanityManifest(invalidDeckManifest);
  if (failDeck.valid) {
    console.error('❌ validateSanityManifest should have failed on invalid deckName!');
    unitFailures++;
  } else {
    console.log('✅ PASS: validateSanityManifest caught invalid deckName.');
  }

  // Failure Case B: Below 10% constraint
  const fail10Percent = validateSanityManifest(validManifest, {
    totalAvailableCards: 550,
    minRatio: 0.10
  });
  if (fail10Percent.valid) {
    console.error('❌ validateSanityManifest should have failed when totalCards (2) is below 10% of 550 (55)!');
    unitFailures++;
  } else {
    console.log('✅ PASS: validateSanityManifest strictly enforces the >= 10% sampling constraint.');
  }

  // Failure Case C: Missing typology key
  const incompleteMatrix = { ...validManifest, coverageMatrix: { ...validManifest.coverageMatrix } };
  delete incompleteMatrix.coverageMatrix.MICRO_VIDEO;
  const failMatrix = validateSanityManifest(incompleteMatrix);
  if (failMatrix.valid) {
    console.error('❌ validateSanityManifest should have failed on missing MICRO_VIDEO typology in coverageMatrix!');
    unitFailures++;
  } else {
    console.log('✅ PASS: validateSanityManifest caught missing coverageMatrix typology.');
  }

  // Failure Case D: Duplicate Card ID
  const duplicateCardsManifest = {
    ...validManifest,
    cards: [
      { id: 'CARD-1', filePath: 'decks/01-dsa/card-1.md', phase: '01-dsa', subtopic: 'arrays', typologiesCovered: [] },
      { id: 'CARD-1', filePath: 'decks/01-dsa/card-1-dup.md', phase: '01-dsa', subtopic: 'arrays', typologiesCovered: [] }
    ]
  };
  const failDup = validateSanityManifest(duplicateCardsManifest);
  if (failDup.valid) {
    console.error('❌ validateSanityManifest should have failed on duplicate card ID!');
    unitFailures++;
  } else {
    console.log('✅ PASS: validateSanityManifest caught duplicate card IDs.');
  }

  // 6. Test custom sampling options (e.g. 20% quota)
  try {
    const result20 = sampleSanityDeck({ decksDir: DECKS_DIR, minRatio: 0.20 });
    const expected20 = Math.ceil(550 * 0.20); // 110 cards
    if (result20.manifest.totalCards < expected20) {
      console.error(`❌ sampleSanityDeck with minRatio=0.20 sampled ${result20.manifest.totalCards} cards, expected >= ${expected20}.`);
      unitFailures++;
    } else {
      console.log(`✅ PASS: sampleSanityDeck with custom minRatio=0.20 sampled ${result20.manifest.totalCards} cards (>= ${expected20}).`);
    }
  } catch (err) {
    console.error('❌ sampleSanityDeck custom options test failed:', err);
    unitFailures++;
  }

  console.log('');
  return unitFailures;
}

async function testGeneratorModularHelpersAndCustomPackaging() {
  console.log('🧪 Running Unit Tests for Generator Modular Helpers & Custom Packaging (Task T007)...\n');
  let unitFailures = 0;

  // 1. Test splitCardContent helper
  const sampleCardMarkdown = `---
id: TEST-001
---
## Pergunta
O que é uma Hash Table?

## Resposta
### Quick Answer
Uma estrutura de chave-valor.
`;
  const splitRes = splitCardContent(sampleCardMarkdown);
  if (!splitRes.questionRaw.includes('O que é uma Hash Table?')) {
    console.error('❌ splitCardContent failed to extract questionRaw:', splitRes);
    unitFailures++;
  } else if (!splitRes.answerRaw.includes('Uma estrutura de chave-valor.')) {
    console.error('❌ splitCardContent failed to extract answerRaw:', splitRes);
    unitFailures++;
  } else {
    console.log('✅ PASS: splitCardContent correctly extracted question and answer components.');
  }

  // Test splitCardContent fallback on missing answer
  const noAnswerRes = splitCardContent('## Pergunta\nApenas pergunta sem resposta');
  if (!noAnswerRes.answerRaw.includes('Nenhuma resposta fornecida')) {
    console.error('❌ splitCardContent did not supply default answer fallback:', noAnswerRes);
    unitFailures++;
  } else {
    console.log('✅ PASS: splitCardContent supplied fallback when answer section is missing.');
  }

  // 2. Test renderTagsHtml helper
  const testTags = ['level::l2-fundamental', 'level::l3-junior', 'level::l4-pleno', 'level::l5-senior', 'topic::dsa'];
  const tagsHtml = renderTagsHtml(testTags);
  if (!tagsHtml.includes('tag-level-l2') || !tagsHtml.includes('tag-level-l3') || !tagsHtml.includes('tag-level-l4') || !tagsHtml.includes('tag-level-l5') || !tagsHtml.includes('topic::dsa')) {
    console.error('❌ renderTagsHtml missing expected tag level classes:', tagsHtml);
    unitFailures++;
  } else {
    console.log('✅ PASS: renderTagsHtml rendered all seniority badges and general topic tags.');
  }

  // 3. Test renderMarkdownToHtml with KaTeX, Code, Table, and Video
  const complexMarkdown = `
Aqui está uma fórmula inline $O(\\log N)$ e um bloco:
$$E = mc^2$$

\`\`\`go
func QuickSort(arr []int) []int {
    return arr
}
\`\`\`

| Estrutura | Inserção | Busca |
| :--- | :--- | :--- |
| Array | O(1) | O(N) |

<video src="https://example.com/demo.mp4"></video>
`;
  const renderedHtml = renderMarkdownToHtml(complexMarkdown);
  if (!renderedHtml.includes('katex') || !renderedHtml.includes('math-block')) {
    console.error('❌ renderMarkdownToHtml failed to render KaTeX math elements:', renderedHtml);
    unitFailures++;
  } else if (!renderedHtml.includes('code-block') || !renderedHtml.includes('hljs')) {
    console.error('❌ renderMarkdownToHtml failed to render highlighted code block:', renderedHtml);
    unitFailures++;
  } else if (!renderedHtml.includes('table-responsive')) {
    console.error('❌ renderMarkdownToHtml failed to wrap table in responsive container:', renderedHtml);
    unitFailures++;
  } else if (!renderedHtml.includes('video-wrapper') || !renderedHtml.includes('autoplay') || !renderedHtml.includes('playsinline')) {
    console.error('❌ renderMarkdownToHtml failed to wrap video or inject mobile attributes:', renderedHtml);
    unitFailures++;
  } else {
    console.log('✅ PASS: renderMarkdownToHtml rendered KaTeX, Highlight.js code blocks, responsive tables, and resilient video containers.');
  }

  // 4. Test wrapInCardDocument
  const innerHtml = '<div class="card-container"><p>Teste Documento</p></div>';
  const lightDoc = wrapInCardDocument(innerHtml, { title: 'Test Light' });
  const darkDoc = wrapInCardDocument(innerHtml, { isNightMode: true, title: 'Test Dark', customCss: '.custom-test { color: red; }' });

  if (!lightDoc.includes('<!DOCTYPE html>') || !lightDoc.includes('<style>') || !lightDoc.includes('<title>Test Light</title>')) {
    console.error('❌ wrapInCardDocument failed on basic HTML structure:', lightDoc);
    unitFailures++;
  } else if (!darkDoc.includes('class="nightMode"') || !darkDoc.includes('.custom-test { color: red; }')) {
    console.error('❌ wrapInCardDocument failed on nightMode or customCss injection:', darkDoc);
    unitFailures++;
  } else {
    console.log('✅ PASS: wrapInCardDocument produced complete, responsive HTML documents with theme and custom CSS support.');
  }

  // 5. Test renderCard from raw markdown and from object
  const cardEntity = {
    frontmatter: { id: 'CARD-HELPER-001', title: 'Helper Card', tags: ['level::l4-pleno', 'topic::trees'] },
    content: `## Pergunta\nComo balancear uma AVL Tree?\n\n## Resposta\n### Quick Answer\nAtravés de rotações simples e duplas.\n\n<details><summary>Deep Dive</summary><p>Detalhes aqui.</p></details>`
  };
  const renderedCard = renderCard(cardEntity);
  if (!renderedCard.front.includes('Como balancear uma AVL Tree?') || !renderedCard.back.includes('Através de rotações simples e duplas.')) {
    console.error('❌ renderCard failed to render front/back sides:', renderedCard);
    unitFailures++;
  } else if (!renderedCard.frontDocument.includes('<!DOCTYPE html>') || !renderedCard.backDocument.includes('Deep Dive')) {
    console.error('❌ renderCard failed to generate full frontDocument or backDocument:', renderedCard);
    unitFailures++;
  } else {
    console.log('✅ PASS: renderCard generated front, back, frontDocument, and backDocument representations.');
  }

  // 6. Test buildDecks with custom files array and custom deckName (MAANG_E2E_Sanity packaging)
  const sampleCardFiles = getMarkdownFiles(DECKS_DIR).slice(0, 2);
  const tempTestApkgPath = path.join(ROOT_DIR, 'reports', 'e2e', 'temp-test-sanity.apkg');

  try {
    const buildResult = await buildDecks({
      files: sampleCardFiles,
      deckName: 'MAANG_E2E_Sanity',
      outputFile: tempTestApkgPath,
      silent: true
    });

    if (buildResult.count !== 2) {
      console.error(`❌ buildDecks expected 2 cards compiled, got ${buildResult.count}`);
      unitFailures++;
    } else if (!fs.existsSync(tempTestApkgPath) || fs.statSync(tempTestApkgPath).size === 0) {
      console.error('❌ buildDecks did not generate valid .apkg file on disk at:', tempTestApkgPath);
      unitFailures++;
    } else {
      console.log(`✅ PASS: buildDecks successfully compiled custom file list into ${path.basename(tempTestApkgPath)} (${fs.statSync(tempTestApkgPath).size} bytes).`);
      // Clean up temp test artifact
      fs.unlinkSync(tempTestApkgPath);
    }
  } catch (err) {
    console.error('❌ buildDecks custom packaging test encountered error:', err);
    unitFailures++;
  }

  console.log('');
  return unitFailures;
}

async function testDOMAndCSSLayoutGuardrailsEngine() {
  console.log('🧪 Running Unit Tests for DOM & CSS Layout Guardrails Engine (src/e2e/guardrails.js)...\n');
  let unitFailures = 0;

  // 1. Validate constants and exports
  if (
    !Array.isArray(GUARDRAILS_MANDATORY_VIDEO_ATTRS) ||
    !GUARDRAILS_MANDATORY_VIDEO_ATTRS.includes('autoplay') ||
    !GUARDRAILS_MANDATORY_VIDEO_ATTRS.includes('loop') ||
    !GUARDRAILS_MANDATORY_VIDEO_ATTRS.includes('muted') ||
    !GUARDRAILS_MANDATORY_VIDEO_ATTRS.includes('playsinline') ||
    !GUARDRAILS_MANDATORY_VIDEO_ATTRS.includes('webkit-playsinline') ||
    !GUARDRAILS_MANDATORY_VIDEO_ATTRS.includes('disableRemotePlayback')
  ) {
    console.error('❌ MANDATORY_VIDEO_ATTRIBUTES is missing mandatory mobile flags:', GUARDRAILS_MANDATORY_VIDEO_ATTRS);
    unitFailures++;
  } else if (TOUCH_TARGET_MIN_HEIGHT !== 44 || MAX_DIFF_PIXEL_RATIO !== 0.02) {
    console.error(`❌ Unexpected constants: TOUCH_TARGET_MIN_HEIGHT=${TOUCH_TARGET_MIN_HEIGHT}, MAX_DIFF_PIXEL_RATIO=${MAX_DIFF_PIXEL_RATIO}`);
    unitFailures++;
  } else {
    console.log('✅ PASS: Guardrails constants (video flags, touch-target 44px, diff ratio 0.02) validated.');
  }

  // Launch Playwright Chromium in mobile-small viewport (360x640)
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 360, height: 640 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    const page = await context.newPage();

    // 2. Test assertHorizontalOverflow (0% overflow at 360px)
    // 2.1 Compliant HTML
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>body { margin: 0; padding: 10px; box-sizing: border-box; max-width: 100%; }</style>
      </head>
      <body><div class="card-container" style="width: 100%; box-sizing: border-box;"><p>Compliant Content</p></div></body>
      </html>
    `);
    const overflowPass = await assertHorizontalOverflow(page);
    if (!overflowPass.passed || overflowPass.hasHorizontalOverflow || overflowPass.errors.length > 0) {
      console.error('❌ assertHorizontalOverflow falsely failed compliant content:', overflowPass);
      unitFailures++;
    } else {
      console.log('✅ PASS: assertHorizontalOverflow passed compliant 360px mobile viewport content.');
    }

    // 2.2 Non-compliant overflowing HTML
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>body { margin: 0; }</style>
      </head>
      <body><div class="card-container" style="width: 500px; height: 100px; background: red;">Wide Content</div></body>
      </html>
    `);
    const overflowFail = await assertHorizontalOverflow(page);
    if (overflowFail.passed || !overflowFail.hasHorizontalOverflow || overflowFail.errors.length === 0) {
      console.error('❌ assertHorizontalOverflow failed to detect horizontal overflow on 500px element:', overflowFail);
      unitFailures++;
    } else {
      console.log('✅ PASS: assertHorizontalOverflow correctly caught 500px horizontal overflow with culprit details.');
    }

    // 3. Test assertTouchTargets (>= 44px)
    // 3.1 Compliant summary (min-height 48px from cardCss)
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head><style>details summary { display: block; min-height: 48px; line-height: 48px; padding: 0 12px; cursor: pointer; }</style></head>
      <body><details><summary>Deep Dive & Walkthrough</summary><p>Detailed explanation</p></details></body>
      </html>
    `);
    const touchPass = await assertTouchTargets(page);
    if (!touchPass.passed || touchPass.summaryTouchTargetHeight < 44 || touchPass.errors.length > 0) {
      console.error('❌ assertTouchTargets falsely failed 48px summary:', touchPass);
      unitFailures++;
    } else {
      console.log(`✅ PASS: assertTouchTargets confirmed summary height ${touchPass.summaryTouchTargetHeight}px >= 44px.`);
    }

    // 3.2 Non-compliant undersized summary (20px)
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head><style>details summary { display: block; height: 20px; min-height: 20px; line-height: 20px; }</style></head>
      <body><details><summary>Small Summary</summary><p>Content</p></details></body>
      </html>
    `);
    const touchFail = await assertTouchTargets(page);
    if (touchFail.passed || touchFail.errors.length === 0) {
      console.error('❌ assertTouchTargets failed to reject 20px summary:', touchFail);
      unitFailures++;
    } else {
      console.log('✅ PASS: assertTouchTargets rejected undersized summary (< 44px).');
    }

    // 4. Test assertKatexErrors
    // 4.1 Valid KaTeX
    await page.setContent(`
      <!DOCTYPE html>
      <html><body><div class="katex"><span class="katex-html">O(N)</span></div></body></html>
    `);
    const katexPass = await assertKatexErrors(page);
    if (!katexPass.passed || katexPass.katexErrorCount !== 0) {
      console.error('❌ assertKatexErrors falsely reported errors on valid KaTeX:', katexPass);
      unitFailures++;
    } else {
      console.log('✅ PASS: assertKatexErrors verified 0 KaTeX errors on valid math formula.');
    }

    // 4.2 Invalid KaTeX error element
    await page.setContent(`
      <!DOCTYPE html>
      <html><body><span class="katex-error" title="ParseError: KaTeX parse error">Invalid Formula</span></body></html>
    `);
    const katexFail = await assertKatexErrors(page);
    if (katexFail.passed || katexFail.katexErrorCount === 0 || katexFail.errors.length === 0) {
      console.error('❌ assertKatexErrors failed to detect .katex-error element:', katexFail);
      unitFailures++;
    } else {
      console.log('✅ PASS: assertKatexErrors caught .katex-error rendering failure.');
    }

    // 4.3 Test assertSvgIntegrity
    // 4.3.1 Valid compliant SVG
    await page.setContent(`
      <!DOCTYPE html>
      <html><body>
        <svg viewBox="0 0 400 200" width="100%" height="auto">
          <rect x="10" y="10" width="100" height="50" fill="#3b82f6"/>
          <text x="60" y="35" fill="#ffffff">Node</text>
        </svg>
      </body></html>
    `);
    const svgPass = await assertSvgIntegrity(page, { requireSvg: true });
    if (!svgPass.passed || svgPass.svgElementCount !== 1 || svgPass.leakedSvgInCodeBlocks) {
      console.error('❌ assertSvgIntegrity falsely failed compliant SVG:', svgPass);
      unitFailures++;
    } else {
      console.log('✅ PASS: assertSvgIntegrity verified compliant SVG diagram rendering.');
    }

    // 4.3.2 Non-compliant: Leaked SVG XML inside code block
    await page.setContent(`
      <!DOCTYPE html>
      <html><body>
        <div class="code-block">
          <pre><code class="hljs">&lt;rect x="10" y="10" width="100" height="50" fill="#3b82f6"/&gt;</code></pre>
        </div>
      </body></html>
    `);
    const svgLeakFail = await assertSvgIntegrity(page);
    if (svgLeakFail.passed || !svgLeakFail.leakedSvgInCodeBlocks) {
      console.error('❌ assertSvgIntegrity failed to detect leaked SVG XML inside code block:', svgLeakFail);
      unitFailures++;
    } else {
      console.log('✅ PASS: assertSvgIntegrity successfully caught leaked SVG XML in code block.');
    }

    // 5. Test assertVideoAttributes
    // 5.1 Fully compliant video
    await page.setContent(`
      <!DOCTYPE html>
      <html><body>
        <video src="https://example.com/demo.mp4" autoplay loop muted playsinline webkit-playsinline disableRemotePlayback></video>
      </body></html>
    `);
    const videoPass = await assertVideoAttributes(page);
    if (!videoPass.passed || videoPass.videoMissingAttributes.length > 0 || videoPass.videoElementCount !== 1) {
      console.error('❌ assertVideoAttributes falsely failed compliant video:', videoPass);
      unitFailures++;
    } else {
      console.log('✅ PASS: assertVideoAttributes validated compliant video mobile flags.');
    }

    // 5.2 Video with missing attributes
    await page.setContent(`
      <!DOCTYPE html>
      <html><body><video src="https://example.com/demo.mp4" controls></video></body></html>
    `);
    const videoFail = await assertVideoAttributes(page);
    if (videoFail.passed || videoFail.videoMissingAttributes.length === 0) {
      console.error('❌ assertVideoAttributes failed to flag missing video attributes:', videoFail);
      unitFailures++;
    } else {
      console.log('✅ PASS: assertVideoAttributes flagged missing video attributes:', videoFail.videoMissingAttributes.join(', '));
    }

    // 6. Test assertCodeHighlighting
    // 6.1 Highlighted code block
    await page.setContent(`
      <!DOCTYPE html>
      <html><body>
        <pre><code class="hljs language-go"><span class="hljs-keyword">func</span> <span class="hljs-title function_">main</span>() {}</code></pre>
      </body></html>
    `);
    const codePass = await assertCodeHighlighting(page);
    if (!codePass.passed || codePass.highlightJsTokensFound === 0 || codePass.codeBlockCount !== 1) {
      console.error('❌ assertCodeHighlighting failed on tokenized code:', codePass);
      unitFailures++;
    } else {
      console.log(`✅ PASS: assertCodeHighlighting verified ${codePass.highlightJsTokensFound} syntax token(s).`);
    }

    // 6.2 Plain non-tokenized code block
    await page.setContent(`
      <!DOCTYPE html>
      <html><body><pre><code>plain untokenized code</code></pre></body></html>
    `);
    const codeFail = await assertCodeHighlighting(page);
    if (codeFail.passed || codeFail.errors.length === 0) {
      console.error('❌ assertCodeHighlighting failed to flag non-tokenized code:', codeFail);
      unitFailures++;
    } else {
      console.log('✅ PASS: assertCodeHighlighting flagged unhighlighted code block.');
    }

    // 7. Test assertAccordionInteraction
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head><style>details summary { cursor: pointer; min-height: 44px; display: block; }</style></head>
      <body>
        <div class="card-container" style="max-width: 100%;">
          <details>
            <summary>Click to Expand</summary>
            <p>Hidden body text inside accordion</p>
          </details>
        </div>
      </body>
      </html>
    `);
    const accordionResult = await assertAccordionInteraction(page);
    if (!accordionResult.passed || !accordionResult.toggledSuccessfully || accordionResult.accordionCount !== 1) {
      console.error('❌ assertAccordionInteraction failed to toggle accordion:', accordionResult);
      unitFailures++;
    } else {
      console.log('✅ PASS: assertAccordionInteraction clicked and verified accordion open/close cycle.');
    }

    // 8. Test runCardGuardrails on full real rendered card document
    const sampleCard = {
      frontmatter: {
        id: 'E2E-GUARDRAILS-001',
        title: 'Guardrails Real Card Test',
        tags: ['level::l4-pleno', 'topic::trees-bst', 'company::meta']
      },
      content: `## Pergunta\nO que é uma AVL Tree?\n\n## Resposta\n### Quick Answer\nUma árvore binária de busca auto-balanceada com fator de balanceamento entre -1 e +1.\n\n\`\`\`go\ntype Node struct {\n    Val int\n    Height int\n}\n\`\`\`\n\n<details><summary>Deep Dive & Walkthrough</summary>\n<p>Detalhes de rotações simples e duplas.</p>\n</details>`
    };

    const { backDocument } = renderCard(sampleCard);
    await page.setContent(backDocument);

    const fullCardResult = await runCardGuardrails(page, {
      cardId: 'E2E-GUARDRAILS-001',
      side: 'back',
      viewport: VIEWPORT_PROFILES['mobile-small']
    });

    if (!fullCardResult.passed || fullCardResult.errors.length > 0) {
      console.error('❌ runCardGuardrails failed on real rendered card document:', fullCardResult);
      unitFailures++;
    } else if (
      fullCardResult.cardId !== 'E2E-GUARDRAILS-001' ||
      fullCardResult.side !== 'back' ||
      fullCardResult.metrics.hasHorizontalOverflow !== false ||
      fullCardResult.metrics.katexErrorCount !== 0 ||
      fullCardResult.metrics.videoMissingAttributes.length !== 0 ||
      fullCardResult.metrics.highlightJsTokensFound === 0
    ) {
      console.error('❌ runCardGuardrails returned invalid metrics structure:', fullCardResult);
      unitFailures++;
    } else {
      console.log('✅ PASS: runCardGuardrails successfully ran complete inspection on real card HTML producing conforming CardVisualAssertionResult metrics.');
    }

    await browser.close();
  } catch (err) {
    if (browser) await browser.close().catch(() => { });
    console.error('❌ Error executing DOM & CSS layout guardrails tests:', err);
    unitFailures++;
  }

  console.log('');
  return unitFailures;
}

function testOrchestratorCLIAndReportGenerator() {
  console.log('🧪 Running Orchestrator CLI Option Parser & Report Generator Unit Tests (Task T009)...');
  let unitFailures = 0;

  // 1. Test parseCLIOptions
  // 1.1 Default options
  const defaultOpts = parseCLIOptions([]);
  if (
    defaultOpts.cleanup !== false ||
    defaultOpts.headed !== false ||
    defaultOpts.updateSnapshots !== false ||
    defaultOpts.phase !== undefined ||
    defaultOpts.sampleCount !== 8 ||
    defaultOpts.reportDir !== 'reports/e2e' ||
    defaultOpts.help !== false
  ) {
    console.error('❌ parseCLIOptions failed on default arguments:', defaultOpts);
    unitFailures++;
  } else {
    console.log('✅ PASS: parseCLIOptions defaults match e2e-cli.schema.json.');
  }

  // 1.2 Custom flags with space and equal delimiters
  const customArgs = [
    '--cleanup',
    '--headed',
    '--update-snapshots',
    '--phase=01-dsa',
    '--sample-count', '12',
    '--report-dir', 'custom/reports/e2e'
  ];
  const customOpts = parseCLIOptions(customArgs);
  if (
    customOpts.cleanup !== true ||
    customOpts.headed !== true ||
    customOpts.updateSnapshots !== true ||
    customOpts.phase !== '01-dsa' ||
    customOpts.sampleCount !== 12 ||
    customOpts.reportDir !== 'custom/reports/e2e'
  ) {
    console.error('❌ parseCLIOptions failed on custom flags:', customOpts);
    unitFailures++;
  } else {
    console.log('✅ PASS: parseCLIOptions successfully parsed all CLI flags.');
  }

  // 1.3 Help flag
  const helpOpts = parseCLIOptions(['--help']);
  if (!helpOpts.help) {
    console.error('❌ parseCLIOptions failed to recognize --help flag.');
    unitFailures++;
  } else {
    console.log('✅ PASS: parseCLIOptions recognized --help flag.');
  }

  // 2. Test validateCLIOptions
  // 2.1 Valid options
  const validCheck = validateCLIOptions(customOpts);
  if (!validCheck.valid || validCheck.errors.length > 0) {
    console.error('❌ validateCLIOptions rejected valid options:', validCheck);
    unitFailures++;
  } else {
    console.log('✅ PASS: validateCLIOptions accepted valid options.');
  }

  // 2.2 Invalid phase
  const invalidPhase = validateCLIOptions({ ...customOpts, phase: '05-quantum-computing' });
  if (invalidPhase.valid || invalidPhase.errors.length === 0) {
    console.error('❌ validateCLIOptions allowed invalid phase:', invalidPhase);
    unitFailures++;
  } else {
    console.log('✅ PASS: validateCLIOptions rejected invalid phase with descriptive error.');
  }

  // 2.3 Invalid sampleCount (out of bounds)
  const invalidCount = validateCLIOptions({ ...customOpts, sampleCount: 100 });
  if (invalidCount.valid || invalidCount.errors.length === 0) {
    console.error('❌ validateCLIOptions allowed sampleCount > 50:', invalidCount);
    unitFailures++;
  } else {
    console.log('✅ PASS: validateCLIOptions rejected out-of-bounds sampleCount (> 50).');
  }

  // 3. Test generateE2EReport & validateE2EReport
  const mockCardResults = [
    {
      cardId: 'CS-ARCH-CACHE-001',
      viewport: { name: 'mobile-small', width: 360, height: 640, isMobile: true },
      side: 'front',
      passed: true,
      metrics: {
        scrollWidth: 360,
        clientWidth: 360,
        hasHorizontalOverflow: false,
        katexErrorCount: 0,
        videoMissingAttributes: [],
        highlightJsTokensFound: 0
      },
      errors: []
    },
    {
      cardId: 'CS-ARCH-CACHE-001',
      viewport: { name: 'mobile-small', width: 360, height: 640, isMobile: true },
      side: 'back',
      passed: true,
      metrics: {
        scrollWidth: 360,
        clientWidth: 360,
        hasHorizontalOverflow: false,
        summaryTouchTargetHeight: 48,
        katexErrorCount: 0,
        videoElementCount: 1,
        videoMissingAttributes: [],
        highlightJsTokensFound: 4,
        visualDiffRatio: 0.005
      },
      screenshotPath: 'reports/e2e/screenshots/CS-ARCH-CACHE-001-back.png',
      errors: []
    }
  ];

  const report = generateE2EReport({
    suite: 'AnkiWeb E2E Automation',
    mode: 'cloud-ankiweb',
    deckName: 'MAANG_E2E_Sanity',
    startTime: '2026-08-30T20:00:00.000Z',
    endTime: '2026-08-30T20:00:05.500Z',
    cardResults: mockCardResults,
    typologiesCovered: {
      L2_FUNDAMENTAL: true,
      L3_JUNIOR: true,
      L4_PLENO_CODE: true,
      MICRO_VIDEO: true,
      RESPONSIVE_SVG: true,
      COMPACT_TABLE: true,
      KATEX_MATH: true,
      DETAILS_ACCORDION: true
    },
    artifacts: {
      sanityApkg: 'MAANG_E2E_Sanity.apkg',
      screenshotsDir: 'reports/e2e/screenshots'
    }
  });

  // Check generated report structure
  if (
    report.suite !== 'AnkiWeb E2E Automation' ||
    report.durationMs !== 5500 ||
    report.environment.mode !== 'cloud-ankiweb' ||
    report.environment.deckName !== 'MAANG_E2E_Sanity' ||
    report.summary.totalCardsTested !== 1 ||
    report.summary.passedAssertions <= 0 ||
    report.summary.failedAssertions !== 0 ||
    report.summary.overallStatus !== 'PASSED' ||
    report.cardResults.length !== 2
  ) {
    console.error('❌ generateE2EReport returned malformed report:', report);
    unitFailures++;
  } else {
    console.log('✅ PASS: generateE2EReport correctly compiled report metrics and summary.');
  }

  // Validate report against schema
  const reportValidation = validateE2EReport(report);
  if (!reportValidation.valid) {
    console.error('❌ validateE2EReport failed on generated report:', reportValidation.errors);
    unitFailures++;
  } else {
    console.log('✅ PASS: validateE2EReport verified generated report strictly conforms to e2e-report.schema.json.');
  }

  // 4. Test validateE2EReport with invalid reports
  // 4.1 Invalid suite
  const invalidSuiteReport = validateE2EReport({ ...report, suite: 'Invalid Test Suite' });
  if (invalidSuiteReport.valid || invalidSuiteReport.errors.length === 0) {
    console.error('❌ validateE2EReport failed to flag invalid suite name.');
    unitFailures++;
  } else {
    console.log('✅ PASS: validateE2EReport caught invalid suite name enum.');
  }

  // 4.2 Invalid overallStatus
  const invalidStatusReport = validateE2EReport({
    ...report,
    summary: { ...report.summary, overallStatus: 'UNKNOWN' }
  });
  if (invalidStatusReport.valid || invalidStatusReport.errors.length === 0) {
    console.error('❌ validateE2EReport failed to flag invalid overallStatus.');
    unitFailures++;
  } else {
    console.log('✅ PASS: validateE2EReport caught invalid overallStatus enum.');
  }

  // 5. Test saveE2EReport and file persistence
  const tempReportDir = path.join(ROOT_DIR, 'reports', 'test-scratch-e2e');
  const savedPath = saveE2EReport(report, tempReportDir);
  if (!fs.existsSync(savedPath)) {
    console.error('❌ saveE2EReport failed to write file to disk at:', savedPath);
    unitFailures++;
  } else {
    const loaded = JSON.parse(fs.readFileSync(savedPath, 'utf8'));
    if (loaded.suite !== report.suite || loaded.summary.overallStatus !== 'PASSED') {
      console.error('❌ Saved report contents do not match memory object:', loaded);
      unitFailures++;
    } else {
      console.log('✅ PASS: saveE2EReport wrote and validated persistent JSON artifact.');
    }
    // Clean up temporary test report directory
    fs.rmSync(tempReportDir, { recursive: true, force: true });
  }

  // 6. Test formatReportSummary
  const summaryText = formatReportSummary(report);
  if (!summaryText.includes('PASSED') || !summaryText.includes('MAANG_E2E_Sanity')) {
    console.error('❌ formatReportSummary failed to include key summary indicators:', summaryText);
    unitFailures++;
  } else {
    console.log('✅ PASS: formatReportSummary generated formatted console summary.');
  }

  console.log('');
  return unitFailures;
}

async function testUserStory1AnkiConnectSamplerAndReportValidation() {
  console.log('🧪 Running Unit Tests for User Story 1 (T010): Anki-Connect RPC, Sampler Typologies & Report Schema...\n');
  let unitFailures = 0;

  // =========================================================================
  // Part 1: Anki-Connect RPC Payload Generation & Schema Compliance
  // =========================================================================
  const originalFetch = globalThis.fetch;
  const capturedCalls = [];

  globalThis.fetch = async (url, opts) => {
    const payload = JSON.parse(opts.body);
    capturedCalls.push({ url, opts, payload });

    // Handle mock responses based on action
    if (payload.action === 'version') {
      return {
        ok: true,
        json: async () => ({ result: 6, error: null })
      };
    } else if (payload.action === 'importPackage') {
      return {
        ok: true,
        json: async () => ({ result: null, error: null })
      };
    } else if (payload.action === 'sync') {
      return {
        ok: true,
        json: async () => ({ result: null, error: null })
      };
    } else if (payload.action === 'deckNames' || payload.action === 'getDeckNames') {
      return {
        ok: true,
        json: async () => ({ result: ['Default', 'MAANG_E2E_Sanity'], error: null })
      };
    } else if (payload.action === 'deleteDecks') {
      return {
        ok: true,
        json: async () => ({ result: null, error: null })
      };
    }
    return {
      ok: true,
      json: async () => ({ result: null, error: null })
    };
  };

  try {
    const testClient = new AnkiConnectClient({ endpoint: 'http://127.0.0.1:8765', timeout: 3000 });

    // 1.1 Test version & ping RPC payload
    capturedCalls.length = 0;
    const ver = await testClient.version();
    if (ver !== 6 || capturedCalls.length !== 1 || capturedCalls[0].payload.action !== 'version' || capturedCalls[0].payload.version !== 6) {
      console.error('❌ Anki-Connect version payload generation failed:', capturedCalls[0]);
      unitFailures++;
    } else {
      console.log('✅ PASS: version() generates valid JSON-RPC 2.0 payload { action: "version", version: 6 }.');
    }

    capturedCalls.length = 0;
    const pingRes = await testClient.ping();
    if (pingRes !== 6 || capturedCalls.length !== 1 || capturedCalls[0].payload.action !== 'version') {
      console.error('❌ Anki-Connect ping payload generation failed:', capturedCalls[0]);
      unitFailures++;
    } else {
      console.log('✅ PASS: ping() generates valid JSON-RPC 2.0 version request.');
    }

    // 1.2 Test importPackage RPC payload with relative and absolute paths
    capturedCalls.length = 0;
    const relativeApkg = 'reports/e2e/MAANG_E2E_Sanity.apkg';
    const expectedAbsolute = path.resolve(process.cwd(), relativeApkg);
    await testClient.importPackage(relativeApkg);
    if (
      capturedCalls.length !== 1 ||
      capturedCalls[0].payload.action !== 'importPackage' ||
      capturedCalls[0].payload.version !== 6 ||
      capturedCalls[0].payload.params?.path !== expectedAbsolute
    ) {
      console.error('❌ Anki-Connect importPackage payload mismatch:', capturedCalls[0]);
      unitFailures++;
    } else {
      console.log('✅ PASS: importPackage() resolves relative paths to absolute and generates valid payload.');
    }

    // Test invalid path throws
    try {
      await testClient.importPackage('');
      console.error('❌ importPackage did not reject empty path string!');
      unitFailures++;
    } catch (err) {
      console.log('✅ PASS: importPackage correctly throws on empty/invalid path argument.');
    }

    // 1.3 Test sync RPC payload
    capturedCalls.length = 0;
    await testClient.sync();
    if (
      capturedCalls.length !== 1 ||
      capturedCalls[0].payload.action !== 'sync' ||
      capturedCalls[0].payload.version !== 6
    ) {
      console.error('❌ Anki-Connect sync payload mismatch:', capturedCalls[0]);
      unitFailures++;
    } else {
      console.log('✅ PASS: sync() generates valid JSON-RPC 2.0 payload { action: "sync", version: 6 }.');
    }

    // 1.4 Test deckNames / getDeckNames RPC payload
    capturedCalls.length = 0;
    const deckNamesList = await testClient.deckNames();
    if (
      capturedCalls.length !== 1 ||
      capturedCalls[0].payload.action !== 'deckNames' ||
      !Array.isArray(deckNamesList) ||
      !deckNamesList.includes('MAANG_E2E_Sanity')
    ) {
      console.error('❌ Anki-Connect deckNames payload mismatch:', capturedCalls[0]);
      unitFailures++;
    } else {
      console.log('✅ PASS: deckNames() / getDeckNames() generates valid JSON-RPC 2.0 payload.');
    }

    // 1.5 Test deleteDecks RPC payload (string input and array input)
    capturedCalls.length = 0;
    await testClient.deleteDecks('MAANG_E2E_Sanity', true);
    if (
      capturedCalls.length !== 1 ||
      capturedCalls[0].payload.action !== 'deleteDecks' ||
      !Array.isArray(capturedCalls[0].payload.params?.decks) ||
      capturedCalls[0].payload.params.decks[0] !== 'MAANG_E2E_Sanity' ||
      capturedCalls[0].payload.params.cardsToo !== true
    ) {
      console.error('❌ Anki-Connect deleteDecks (single string) payload mismatch:', capturedCalls[0]);
      unitFailures++;
    } else {
      console.log('✅ PASS: deleteDecks() wraps string deck into array with cardsToo: true.');
    }

    capturedCalls.length = 0;
    await testClient.deleteDecks(['DeckA', 'DeckB'], false);
    if (
      capturedCalls.length !== 1 ||
      capturedCalls[0].payload.params?.decks?.length !== 2 ||
      capturedCalls[0].payload.params.cardsToo !== false
    ) {
      console.error('❌ Anki-Connect deleteDecks (array) payload mismatch:', capturedCalls[0]);
      unitFailures++;
    } else {
      console.log('✅ PASS: deleteDecks() passes array of deck names with cardsToo: false.');
    }

    // 1.6 Test Anki-Connect error handling when remote returns error
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({ result: null, error: 'deck was not found: MAANG_E2E_Sanity' })
    });

    try {
      await testClient.deleteDecks('MAANG_E2E_Sanity');
      console.error('❌ Anki-Connect error response did not throw AnkiConnectError!');
      unitFailures++;
    } catch (err) {
      if (err instanceof AnkiConnectError && err.action === 'deleteDecks' && err.message.includes('deck was not found')) {
        console.log('✅ PASS: Anki-Connect error response correctly converted to AnkiConnectError with action context.');
      } else {
        console.error('❌ Anki-Connect error thrown was not expected AnkiConnectError:', err);
        unitFailures++;
      }
    }

    // 1.7 Test HTTP non-200 error handling
    globalThis.fetch = async () => ({
      ok: false,
      status: 502,
      statusText: 'Bad Gateway'
    });

    try {
      await testClient.sync();
      console.error('❌ HTTP 502 error did not throw AnkiConnectError!');
      unitFailures++;
    } catch (err) {
      if (err instanceof AnkiConnectError && err.diagnostic && err.diagnostic.connected === false) {
        console.log('✅ PASS: HTTP 502 error correctly converted to AnkiConnectError with diagnostic.');
      } else {
        console.error('❌ HTTP error did not produce structured AnkiConnectError:', err);
        unitFailures++;
      }
    }
  } finally {
    globalThis.fetch = originalFetch;
  }

  // =========================================================================
  // Part 2: Sampler Typology Coverage & Diversity Constraints
  // =========================================================================
  const sampleResult = sampleSanityDeck({ decksDir: DECKS_DIR });
  const { manifest, sampledCards, totalScannedCards } = sampleResult;

  // 2.1 Check total available card count and sample count >= 10%
  if (totalScannedCards !== 550) {
    console.error(`❌ Expected 550 scanned cards on disk, got: ${totalScannedCards}`);
    unitFailures++;
  } else {
    console.log(`✅ PASS: Sampler scanned all ${totalScannedCards} cards on disk across all 4 phases.`);
  }

  const minRequired10Percent = Math.ceil(totalScannedCards * 0.10);
  if (sampledCards.length < minRequired10Percent) {
    console.error(`❌ Sampler card count (${sampledCards.length}) is under the 10% quota (${minRequired10Percent})!`);
    unitFailures++;
  } else {
    console.log(`✅ PASS: Sampler sampled ${sampledCards.length} cards (>= ${minRequired10Percent} required by 10% rule).`);
  }

  // 2.2 Validate 100% coverage across all 8 canonical typologies
  for (const typ of ALL_TYPOLOGIES) {
    const cardId = manifest.coverageMatrix[typ];
    if (!cardId) {
      console.error(`❌ coverageMatrix missing entry for typology "${typ}"!`);
      unitFailures++;
      continue;
    }
    const cardObj = sampledCards.find(c => c.id === cardId);
    if (!cardObj) {
      console.error(`❌ Card "${cardId}" mapped for typology "${typ}" is missing from sampledCards!`);
      unitFailures++;
      continue;
    }
    const hasCandidatesOnDisk = scanAllCards().some(c => c.typologiesCovered.includes(typ));
    if (hasCandidatesOnDisk && !cardObj.typologiesCovered.includes(typ)) {
      console.error(`❌ Card "${cardId}" in coverageMatrix does not actually contain typology "${typ}"!`);
      unitFailures++;
    }
  }
  console.log('✅ PASS: All 8 typologies verified with 100% coverage in manifest coverageMatrix.');

  // 2.3 Curricular phase balance
  const representedPhases = new Set(sampledCards.map(c => c.phase));
  const expectedPhases = ['01-dsa', '02-cs-fundamentals', '03-system-design-backend', '04-behavioral-engineering'];
  for (const expPhase of expectedPhases) {
    if (!representedPhases.has(expPhase)) {
      console.error(`❌ Curricular phase "${expPhase}" is not represented in sampled cards!`);
      unitFailures++;
    }
  }
  console.log('✅ PASS: Sampled sanity deck covers all 4 curricular phases.');

  // 2.4 Negative test cases for validateSanityManifest
  const badManifestTypology = { ...manifest, coverageMatrix: { ...manifest.coverageMatrix } };
  delete badManifestTypology.coverageMatrix.DETAILS_ACCORDION;
  const resBadTypology = validateSanityManifest(badManifestTypology);
  if (resBadTypology.valid) {
    console.error('❌ validateSanityManifest failed to detect missing DETAILS_ACCORDION typology in coverageMatrix.');
    unitFailures++;
  } else {
    console.log('✅ PASS: validateSanityManifest caught missing typology in coverageMatrix.');
  }

  const badManifestDeckName = { ...manifest, deckName: 'Wrong_Deck_Name' };
  const resBadDeckName = validateSanityManifest(badManifestDeckName);
  if (resBadDeckName.valid) {
    console.error('❌ validateSanityManifest allowed invalid deckName.');
    unitFailures++;
  } else {
    console.log('✅ PASS: validateSanityManifest rejected non-conforming deckName.');
  }

  // =========================================================================
  // Part 3: Report Schema Validation (e2e-report.schema.json)
  // =========================================================================
  const passingReport = generateE2EReport({
    suite: 'AnkiWeb E2E Automation',
    mode: 'cloud-ankiweb',
    deckName: 'MAANG_E2E_Sanity',
    startTime: new Date(Date.now() - 4000).toISOString(),
    endTime: new Date().toISOString(),
    cardResults: [
      {
        cardId: 'DSA-STRUCT-ARRAY-000',
        viewport: { name: 'mobile-small', width: 360, height: 640, isMobile: true },
        side: 'front',
        passed: true,
        metrics: {
          scrollWidth: 360,
          clientWidth: 360,
          hasHorizontalOverflow: false,
          katexErrorCount: 0,
          videoMissingAttributes: [],
          highlightJsTokensFound: 0
        },
        errors: []
      },
      {
        cardId: 'DSA-STRUCT-ARRAY-000',
        viewport: { name: 'mobile-small', width: 360, height: 640, isMobile: true },
        side: 'back',
        passed: true,
        metrics: {
          scrollWidth: 360,
          clientWidth: 360,
          hasHorizontalOverflow: false,
          summaryTouchTargetHeight: 48,
          katexErrorCount: 0,
          videoElementCount: 0,
          videoMissingAttributes: [],
          highlightJsTokensFound: 3,
          visualDiffRatio: 0.002
        },
        screenshotPath: 'reports/e2e/screenshots/DSA-STRUCT-ARRAY-000-back.png',
        errors: []
      }
    ],
    typologiesCovered: {
      L2_FUNDAMENTAL: true,
      L3_JUNIOR: true,
      L4_PLENO_CODE: true,
      MICRO_VIDEO: true,
      RESPONSIVE_SVG: true,
      COMPACT_TABLE: true,
      KATEX_MATH: true,
      DETAILS_ACCORDION: true
    },
    artifacts: {
      sanityApkg: 'MAANG_E2E_Sanity.apkg',
      screenshotsDir: 'reports/e2e/screenshots'
    }
  });

  const passValidation = validateE2EReport(passingReport);
  if (!passValidation.valid || passingReport.summary.overallStatus !== 'PASSED' || passingReport.summary.failedAssertions !== 0) {
    console.error('❌ validateE2EReport failed on passing report:', passValidation);
    unitFailures++;
  } else {
    console.log('✅ PASS: validateE2EReport accepted compliant passing E2E report.');
  }

  // 3.2 Failing report validation
  const failingReport = generateE2EReport({
    suite: 'AnkiWeb E2E Automation',
    mode: 'cloud-ankiweb',
    deckName: 'MAANG_E2E_Sanity',
    startTime: new Date(Date.now() - 3000).toISOString(),
    endTime: new Date().toISOString(),
    cardResults: [
      {
        cardId: 'CS-ARCH-CACHE-001',
        viewport: { name: 'mobile-small', width: 360, height: 640, isMobile: true },
        side: 'front',
        passed: false,
        metrics: {
          scrollWidth: 420,
          clientWidth: 360,
          hasHorizontalOverflow: true,
          katexErrorCount: 0,
          videoMissingAttributes: [],
          highlightJsTokensFound: 0
        },
        errors: ['Horizontal overflow detected: scrollWidth 420px > clientWidth 360px']
      }
    ],
    typologiesCovered: {
      L2_FUNDAMENTAL: true,
      L3_JUNIOR: true,
      L4_PLENO_CODE: true,
      MICRO_VIDEO: false,
      RESPONSIVE_SVG: true,
      COMPACT_TABLE: true,
      KATEX_MATH: true,
      DETAILS_ACCORDION: true
    }
  });

  const failValidation = validateE2EReport(failingReport);
  if (!failValidation.valid || failingReport.summary.overallStatus !== 'FAILED' || failingReport.summary.failedAssertions !== 1) {
    console.error('❌ validateE2EReport did not validate failing report metrics properly:', failValidation, failingReport);
    unitFailures++;
  } else {
    console.log('✅ PASS: validateE2EReport correctly validated failing report metrics and FAILED status.');
  }

  // 3.3 Negative report schema tests
  const invalidModeReport = validateE2EReport({
    ...passingReport,
    environment: { ...passingReport.environment, mode: 'unsupported-mode' }
  });
  if (invalidModeReport.valid) {
    console.error('❌ validateE2EReport failed to reject invalid environment.mode.');
    unitFailures++;
  } else {
    console.log('✅ PASS: validateE2EReport rejected invalid environment.mode enum.');
  }

  const missingResultsReport = validateE2EReport({
    ...passingReport,
    cardResults: 'not-an-array'
  });
  if (missingResultsReport.valid) {
    console.error('❌ validateE2EReport failed to reject non-array cardResults.');
    unitFailures++;
  } else {
    console.log('✅ PASS: validateE2EReport rejected non-array cardResults.');
  }

  console.log('');
  return unitFailures;
}

async function testAnkiWebRunnerController() {
  console.log('🧪 Running Unit Tests for AnkiWeb Runner Controller (Task T011: src/e2e/ankiweb-runner.js)...\n');
  let unitFailures = 0;

  // =========================================================================
  // 1. Credentials Extraction & Defaults
  // =========================================================================
  const explicitCreds = getAnkiWebCredentials({ user: 'tester@faang.dev', password: 'testPassword123!' });
  if (explicitCreds.user !== 'tester@faang.dev' || explicitCreds.password !== 'testPassword123!') {
    console.error('❌ getAnkiWebCredentials failed to return explicit credentials:', explicitCreds);
    unitFailures++;
  } else {
    console.log('✅ PASS: getAnkiWebCredentials returns explicitly passed credentials.');
  }

  const aliasCreds = getAnkiWebCredentials({ username: 'aliasUser', password: 'aliasPassword' });
  if (aliasCreds.user !== 'aliasUser') {
    console.error('❌ getAnkiWebCredentials failed to map username alias:', aliasCreds);
    unitFailures++;
  } else {
    console.log('✅ PASS: getAnkiWebCredentials correctly maps username alias.');
  }

  // =========================================================================
  // 2. Playwright Headless Tests for DOM Extraction & State Checks
  // =========================================================================
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: 360, height: 640 }
    });

    // 2.1 extractCurrentCardId tests
    // 2.1a Explicit .card-id element
    await page.setContent(`
      <!DOCTYPE html>
      <html><body><span class="card-id">DSA-STRUCT-TREE-001</span><div id="qa">Card Content</div></body></html>
    `);
    const id1 = await extractCurrentCardId(page);
    if (id1 !== 'DSA-STRUCT-TREE-001') {
      console.error(`❌ extractCurrentCardId failed on explicit .card-id: expected "DSA-STRUCT-TREE-001", got "${id1}"`);
      unitFailures++;
    } else {
      console.log('✅ PASS: extractCurrentCardId extracted ID from .card-id element.');
    }

    // 2.1b data-card-id attribute
    await page.setContent(`
      <!DOCTYPE html>
      <html><body><div class="card-header" data-card-id="CS-ARCH-CACHE-002">Header</div></body></html>
    `);
    const id2 = await extractCurrentCardId(page);
    if (id2 !== 'CS-ARCH-CACHE-002') {
      console.error(`❌ extractCurrentCardId failed on [data-card-id]: expected "CS-ARCH-CACHE-002", got "${id2}"`);
      unitFailures++;
    } else {
      console.log('✅ PASS: extractCurrentCardId extracted ID from data-card-id attribute.');
    }

    // 2.1c Text regex match in #qa
    await page.setContent(`
      <!DOCTYPE html>
      <html><body><div id="qa"><h2>SYS-DESIGN-KAFKA-003: Message Broker</h2><p>Explanation</p></div></body></html>
    `);
    const id3 = await extractCurrentCardId(page);
    if (id3 !== 'SYS-DESIGN-KAFKA-003') {
      console.error(`❌ extractCurrentCardId failed on text regex match: expected "SYS-DESIGN-KAFKA-003", got "${id3}"`);
      unitFailures++;
    } else {
      console.log('✅ PASS: extractCurrentCardId extracted canonical ID from text pattern.');
    }

    // 2.1d Fallback indexed ID
    await page.setContent(`
      <!DOCTYPE html>
      <html><body><div id="qa"><p>Anonymous content with no ID pattern</p></div></body></html>
    `);
    const idFallback = await extractCurrentCardId(page, 5);
    if (idFallback !== 'SANITY-CARD-005') {
      console.error(`❌ extractCurrentCardId failed on fallback: expected "SANITY-CARD-005", got "${idFallback}"`);
      unitFailures++;
    } else {
      console.log('✅ PASS: extractCurrentCardId returned formatted fallback index ID.');
    }

    // 2.2 isLoggedIn tests
    // 2.2a On authenticated decks dashboard
    await page.setContent(`
      <!DOCTYPE html>
      <html><body>
        <nav><a href="/account/logout">Log Out</a></nav>
        <div id="deck-list"><button class="deck-btn">MAANG_E2E_Sanity</button></div>
      </body></html>
    `);
    const loggedInTrue = await isLoggedIn(page);
    if (!loggedInTrue) {
      console.error('❌ isLoggedIn failed to recognize authenticated dashboard elements.');
      unitFailures++;
    } else {
      console.log('✅ PASS: isLoggedIn recognized authenticated state via dashboard elements.');
    }

    // 2.3 isDeckFinished tests
    // 2.3a Deck completed text
    await page.setContent(`
      <!DOCTYPE html>
      <html><body><div class="alert alert-info">Congratulations! You have finished this deck for now.</div></body></html>
    `);
    const finishedTrue = await isDeckFinished(page);
    if (!finishedTrue) {
      console.error('❌ isDeckFinished failed to recognize completion message.');
      unitFailures++;
    } else {
      console.log('✅ PASS: isDeckFinished detected standard completion text.');
    }

    // 2.3b Active study card in progress
    await page.setContent(`
      <!DOCTYPE html>
      <html><body>
        <div id="qa"><span class="card-id">DSA-STRUCT-ARRAY-000</span><p>Question?</p></div>
        <button id="quiz-ans">Show Answer</button>
      </body></html>
    `);
    const finishedFalse = await isDeckFinished(page);
    if (finishedFalse) {
      console.error('❌ isDeckFinished falsely marked active card as finished.');
      unitFailures++;
    } else {
      console.log('✅ PASS: isDeckFinished correctly identified active study card.');
    }

    // 2.4 showCardAnswer & answerCurrentCard interaction tests
    let showAnswerClicked = false;
    await page.exposeFunction('mockShowAnswerClick', () => { showAnswerClicked = true; });
    await page.setContent(`
      <!DOCTYPE html>
      <html><body>
        <div id="qa"><p>Front Question</p></div>
        <button id="quiz-ans" onclick="window.mockShowAnswerClick()">Show Answer</button>
      </body></html>
    `);
    await showCardAnswer(page);
    if (!showAnswerClicked) {
      console.error('❌ showCardAnswer did not click #quiz-ans button.');
      unitFailures++;
    } else {
      console.log('✅ PASS: showCardAnswer clicked #quiz-ans button successfully.');
    }

    let easeRatingSelected = null;
    await page.exposeFunction('mockEaseClick', (val) => { easeRatingSelected = val; });
    await page.setContent(`
      <!DOCTYPE html>
      <html><body>
        <div id="easebtns">
          <button id="ease1" onclick="window.mockEaseClick('again')">Again</button>
          <button id="ease2" onclick="window.mockEaseClick('hard')">Hard</button>
          <button id="ease3" onclick="window.mockEaseClick('good')">Good</button>
          <button id="ease4" onclick="window.mockEaseClick('easy')">Easy</button>
        </div>
      </body></html>
    `);
    await answerCurrentCard(page, 'good');
    if (easeRatingSelected !== 'good') {
      console.error('❌ answerCurrentCard did not click Good (#ease3) button, got:', easeRatingSelected);
      unitFailures++;
    } else {
      console.log('✅ PASS: answerCurrentCard clicked #ease3 (Good) button successfully.');
    }

    // 2.5 navigateToDeck test
    let deckClicked = false;
    await page.exposeFunction('mockDeckClick', () => { deckClicked = true; });
    await page.setContent(`
      <!DOCTYPE html>
      <html><body>
        <table id="deck-list">
          <tr><td><button class="deck-btn" onclick="window.mockDeckClick()">MAANG_E2E_Sanity</button></td></tr>
        </table>
      </body></html>
    `);
    await navigateToDeck(page, 'MAANG_E2E_Sanity');
    if (!deckClicked) {
      console.error('❌ navigateToDeck failed to locate and click MAANG_E2E_Sanity deck button.');
      unitFailures++;
    } else {
      console.log('✅ PASS: navigateToDeck found and clicked target deck button.');
    }

    // Negative navigateToDeck test
    try {
      await navigateToDeck(page, 'NonExistentDeck_12345', { skipNavigation: true });
      console.error('❌ navigateToDeck did not throw when deck was absent!');
      unitFailures++;
    } catch (err) {
      if (err.message.includes('NonExistentDeck_12345') && err.message.includes('was not found')) {
        console.log('✅ PASS: navigateToDeck threw clear diagnostic error when deck was absent.');
      } else {
        console.error('❌ navigateToDeck threw unexpected error:', err);
        unitFailures++;
      }
    }

    // 2.6 loginToAnkiWeb credentials validation test
    try {
      await loginToAnkiWeb(page, { user: '', password: '' });
      console.error('❌ loginToAnkiWeb did not reject empty credentials!');
      unitFailures++;
    } catch (err) {
      if (err.message.includes('credentials missing')) {
        console.log('✅ PASS: loginToAnkiWeb rejected empty credentials with clear instruction.');
      } else {
        console.error('❌ loginToAnkiWeb threw unexpected error on missing credentials:', err);
        unitFailures++;
      }
    }

    // =========================================================================
    // 3. AnkiWebRunner Class Lifecycle & Config Tests
    // =========================================================================
    const runnerInstance = new AnkiWebRunner({
      credentials: { user: 'test@maang.dev', password: 'testPassword' },
      headed: false,
      timeout: 15000,
      viewport: { name: 'mobile-small', width: 360, height: 640, deviceScaleFactor: 2, isMobile: true }
    });

    if (
      runnerInstance.options.credentials.user !== 'test@maang.dev' ||
      runnerInstance.options.headed !== false ||
      runnerInstance.options.viewport.width !== 360 ||
      runnerInstance.options.authStoragePath !== DEFAULT_AUTH_STORAGE_PATH
    ) {
      console.error('❌ AnkiWebRunner constructor options mismatch:', runnerInstance.options);
      unitFailures++;
    } else {
      console.log('✅ PASS: AnkiWebRunner constructor initializes options and storage defaults properly.');
    }

    await browser.close();
  } catch (err) {
    if (browser) await browser.close().catch(() => { });
    console.error('❌ Error executing AnkiWebRunner unit tests:', err);
    unitFailures++;
  }

  console.log('');
  return unitFailures;
}

async function testUserStory1OrchestratorPipelineIntegration() {
  console.log('🧪 Running Unit Tests for Orchestrator Pipeline Integration (Task T012: runOrchestrator)...\n');
  let unitFailures = 0;

  const tempReportDir = path.join(ROOT_DIR, 'reports', 'test-scratch-orch-t012');

  try {
    // 1. Test full pipeline execution with mock AnkiConnect client and mock AnkiWebRunner
    const callSequence = [];

    const mockAnkiConnectClient = {
      endpoint: 'http://127.0.0.1:8765',
      ping: async () => {
        callSequence.push('ping');
        return 6;
      },
      importPackage: async (pkgPath) => {
        callSequence.push(`importPackage:${path.basename(pkgPath)}`);
        return null;
      },
      sync: async () => {
        callSequence.push('sync');
        return null;
      },
      deleteDecks: async (decks, cardsToo) => {
        callSequence.push(`deleteDecks:${decks}:${cardsToo}`);
        return null;
      }
    };

    const mockCardResults = [
      {
        cardId: 'DSA-STRUCT-ARRAY-000',
        viewport: { name: 'mobile-small', width: 360, height: 640, isMobile: true },
        side: 'front',
        passed: true,
        metrics: {
          scrollWidth: 360,
          clientWidth: 360,
          hasHorizontalOverflow: false,
          katexErrorCount: 0,
          videoMissingAttributes: [],
          highlightJsTokensFound: 0
        },
        errors: []
      },
      {
        cardId: 'DSA-STRUCT-ARRAY-000',
        viewport: { name: 'mobile-small', width: 360, height: 640, isMobile: true },
        side: 'back',
        passed: true,
        metrics: {
          scrollWidth: 360,
          clientWidth: 360,
          hasHorizontalOverflow: false,
          summaryTouchTargetHeight: 48,
          katexErrorCount: 0,
          videoMissingAttributes: [],
          highlightJsTokensFound: 2
        },
        errors: []
      }
    ];

    let runnerClosed = false;
    const mockAnkiWebRunner = {
      runStudySession: async (options) => {
        callSequence.push(`runStudySession:${options.deckName}`);
        return {
          cardResults: mockCardResults,
          totalCardsStudied: 1,
          completed: true
        };
      },
      close: async () => {
        callSequence.push('runner.close');
        runnerClosed = true;
      }
    };

    const report = await runOrchestrator({
      cleanup: true,
      reportDir: tempReportDir,
      ankiConnectClient: mockAnkiConnectClient,
      ankiWebRunner: mockAnkiWebRunner
    });

    // 1.1 Verify call sequence
    const expectedSequence = [
      'ping',
      'importPackage:MAANG_E2E_Sanity.apkg',
      'sync',
      'runStudySession:MAANG_E2E_Sanity',
      'runner.close',
      'deleteDecks:MAANG_E2E_Sanity:true',
      'sync'
    ];

    if (JSON.stringify(callSequence) !== JSON.stringify(expectedSequence)) {
      console.error('❌ runOrchestrator call sequence mismatch!\nExpected:', expectedSequence, '\nGot:', callSequence);
      unitFailures++;
    } else {
      console.log('✅ PASS: runOrchestrator executed ping -> importPackage -> sync -> runStudySession -> runner.close -> deleteDecks -> sync in exact order.');
    }

    // 1.2 Verify runner was closed
    if (!runnerClosed) {
      console.error('❌ runOrchestrator failed to close runner instance.');
      unitFailures++;
    } else {
      console.log('✅ PASS: runOrchestrator ensured browser runner was closed in finally block.');
    }

    // 1.3 Verify returned report structure & validation
    const reportValidation = validateE2EReport(report);
    if (!reportValidation.valid || report.summary.overallStatus !== 'PASSED') {
      console.error('❌ runOrchestrator returned invalid report:', reportValidation, report);
      unitFailures++;
    } else {
      console.log('✅ PASS: runOrchestrator generated and validated conforming E2EExecutionReport.');
    }

    // 1.4 Verify report file saved to disk
    const savedReportPath = path.join(tempReportDir, 'e2e-report.json');
    if (!fs.existsSync(savedReportPath)) {
      console.error('❌ runOrchestrator did not save report to:', savedReportPath);
      unitFailures++;
    } else {
      console.log('✅ PASS: runOrchestrator successfully saved report to disk.');
    }

    // 2. Test fail-fast behavior when Anki-Connect ping fails
    const failingAnkiClient = {
      ping: async () => {
        throw new AnkiConnectError('Anki-Connect unreachable', { connected: false, endpoint: 'http://127.0.0.1:8765' }, 'ping');
      }
    };

    try {
      await runOrchestrator({
        reportDir: tempReportDir,
        ankiConnectClient: failingAnkiClient,
        skipBrowser: true
      });
      console.error('❌ runOrchestrator did not fail fast on Anki-Connect ping failure!');
      unitFailures++;
    } catch (err) {
      if (err instanceof AnkiConnectError && err.action === 'ping') {
        console.log('✅ PASS: runOrchestrator fails fast on Anki-Connect connectivity error.');
      } else {
        console.error('❌ runOrchestrator threw unexpected error on ping failure:', err);
        unitFailures++;
      }
    }
  } catch (err) {
    console.error('❌ Error executing Orchestrator pipeline integration tests:', err);
    unitFailures++;
  } finally {
    if (fs.existsSync(tempReportDir)) {
      fs.rmSync(tempReportDir, { recursive: true, force: true });
    }
  }

  console.log('');
  return unitFailures;
}

function testUserStory2PlaywrightVisualRegressionSpecAndPackageJsonScripts() {
  console.log('🧪 Running Unit Tests for Visual Regression Spec & Scripts (Tasks T013 & T014)...\n');
  let unitFailures = 0;

  // 1. Validate package.json scripts (Task T013)
  const pkgPath = path.join(ROOT_DIR, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    console.error('❌ package.json not found!');
    unitFailures++;
  } else {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (!pkg.scripts || pkg.scripts['test:e2e'] !== 'node src/e2e/orchestrator.js') {
      console.error('❌ package.json missing "test:e2e": "node src/e2e/orchestrator.js", got:', pkg.scripts?.['test:e2e']);
      unitFailures++;
    } else {
      console.log('✅ PASS: package.json properly configures "test:e2e": "node src/e2e/orchestrator.js".');
    }
  }

  // 2. Validate test/e2e/e2e-guardrails.test.js spec (Task T014)
  const specPath = path.join(ROOT_DIR, 'test', 'e2e', 'e2e-guardrails.test.js');
  if (!fs.existsSync(specPath)) {
    console.error('❌ test/e2e/e2e-guardrails.test.js does not exist!');
    unitFailures++;
  } else {
    const specContent = fs.readFileSync(specPath, 'utf8');

    // 2.1 Check for Playwright imports
    if (!specContent.includes('@playwright/test') || !specContent.includes('test.describe')) {
      console.error('❌ e2e-guardrails.test.js missing @playwright/test runner structure.');
      unitFailures++;
    } else {
      console.log('✅ PASS: e2e-guardrails.test.js imports and uses @playwright/test structure.');
    }

    // 2.2 Check for guardrails assertions integration
    const expectedAssertions = [
      'assertHorizontalOverflow',
      'assertTouchTargets',
      'assertKatexErrors',
      'assertVideoAttributes',
      'assertCodeHighlighting',
      'runCardGuardrails',
      'toHaveScreenshot'
    ];

    for (const assertion of expectedAssertions) {
      if (!specContent.includes(assertion)) {
        console.error(`❌ e2e-guardrails.test.js missing assertion "${assertion}".`);
        unitFailures++;
      }
    }
    console.log('✅ PASS: e2e-guardrails.test.js incorporates all required guardrails and snapshot assertions.');

    // 2.3 Check for dynamic sampler integration
    if (!specContent.includes('sampleSanityDeck') || !specContent.includes('renderCard')) {
      console.error('❌ e2e-guardrails.test.js missing sampleSanityDeck or renderCard integration.');
      unitFailures++;
    } else {
      console.log('✅ PASS: e2e-guardrails.test.js dynamically samples sanity cards and renders Front/Back HTML.');
    }
  }

  console.log('');
  return unitFailures;
}

function testUserStory2GoldenBaselinesAndMobileViewportEvidence() {
  console.log('🧪 Running Unit Tests for Golden Baselines & Mobile Viewport Evidence (Tasks T015, T016)...\n');
  let unitFailures = 0;

  // 1. Validate Baseline Directories (Task T015)
  const baselinesDir = path.join(ROOT_DIR, 'test', 'e2e', 'baselines');
  if (!fs.existsSync(baselinesDir)) {
    console.error('❌ test/e2e/baselines directory does not exist!');
    unitFailures++;
  } else {
    const requiredProjects = ['mobile-small', 'mobile-standard', 'desktop-hd'];
    for (const proj of requiredProjects) {
      const projDir = path.join(baselinesDir, proj);
      if (!fs.existsSync(projDir)) {
        console.error(`❌ Missing golden baseline project directory: ${proj}`);
        unitFailures++;
      } else {
        const files = fs.readdirSync(projDir).filter(f => f.endsWith('.png'));
        if (files.length < 50) {
          console.error(`❌ Expected at least 50 baseline PNG screenshots in ${proj}, found ${files.length}`);
          unitFailures++;
        } else {
          console.log(`✅ PASS: Golden baseline project "${proj}" contains ${files.length} reference screenshots.`);
        }
      }
    }
  }

  // 2. Validate generate-baselines.js exists and exports generateGoldenBaselines
  const genBaselinesPath = path.join(ROOT_DIR, 'src', 'e2e', 'generate-baselines.js');
  if (!fs.existsSync(genBaselinesPath)) {
    console.error('❌ src/e2e/generate-baselines.js not found!');
    unitFailures++;
  } else {
    console.log('✅ PASS: src/e2e/generate-baselines.js is available for baseline generation.');
  }

  // 3. Validate AnkiWebRunner mobile viewport & evidence capture extensions (Task T016)
  const runner = new AnkiWebRunner();
  if (typeof runner.setViewport !== 'function') {
    console.error('❌ AnkiWebRunner missing setViewport() method!');
    unitFailures++;
  } else {
    console.log('✅ PASS: AnkiWebRunner exports setViewport() method.');
  }

  if (typeof runner.runMultiViewportStudySession !== 'function') {
    console.error('❌ AnkiWebRunner missing runMultiViewportStudySession() method!');
    unitFailures++;
  } else {
    console.log('✅ PASS: AnkiWebRunner exports runMultiViewportStudySession() method.');
  }

  if (!DEFAULT_SCREENSHOTS_DIR || !DEFAULT_MOBILE_VIEWPORTS || DEFAULT_MOBILE_VIEWPORTS.length < 2) {
    console.error('❌ AnkiWebRunner missing DEFAULT_SCREENSHOTS_DIR or DEFAULT_MOBILE_VIEWPORTS exports.');
    unitFailures++;
  } else {
    console.log('✅ PASS: AnkiWebRunner exports DEFAULT_SCREENSHOTS_DIR and DEFAULT_MOBILE_VIEWPORTS (360x640, 390x844).');
  }

  console.log('');
  return unitFailures;
}

async function testUserStory2TouchTargetsAndAccordionToggle() {
  console.log('🧪 Running Unit Tests for Touch-Target >= 44px & Accordion Toggle (Task T017)...\n');
  let unitFailures = 0;

  // 1. Validate constant
  if (TOUCH_TARGET_MIN_HEIGHT !== 44) {
    console.error(`❌ TOUCH_TARGET_MIN_HEIGHT must be 44, got: ${TOUCH_TARGET_MIN_HEIGHT}`);
    unitFailures++;
  } else {
    console.log('✅ PASS: TOUCH_TARGET_MIN_HEIGHT is strictly set to 44px (SC-003).');
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: 360, height: 640 }
    });

    // 2. Test assertTouchTargets on passing accordion (>= 44px)
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            details summary {
              min-height: 48px;
              padding: 12px 14px;
              display: flex;
              align-items: center;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          <div class="card-container">
            <details id="acc1">
              <summary>Deep Dive Analysis & Walkthrough</summary>
              <p>Expanded detailed explanation text.</p>
            </details>
          </div>
        </body>
      </html>
    `, { waitUntil: 'domcontentloaded' });

    const touchPassRes = await assertTouchTargets(page);
    if (!touchPassRes.passed || touchPassRes.summaryTouchTargetHeight < 44) {
      console.error('❌ assertTouchTargets failed on valid 48px summary:', touchPassRes);
      unitFailures++;
    } else {
      console.log(`✅ PASS: assertTouchTargets passed for compliant summary (${touchPassRes.summaryTouchTargetHeight}px >= 44px).`);
    }

    // 3. Test assertTouchTargets on failing accordion (< 44px)
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            details summary {
              height: 24px;
              line-height: 24px;
              padding: 0;
              font-size: 11px;
            }
          </style>
        </head>
        <body>
          <div class="card-container">
            <details id="acc2">
              <summary>Small Non-Compliant Summary</summary>
              <p>Text</p>
            </details>
          </div>
        </body>
      </html>
    `, { waitUntil: 'domcontentloaded' });

    const touchFailRes = await assertTouchTargets(page);
    if (touchFailRes.passed || touchFailRes.errors.length === 0) {
      console.error('❌ assertTouchTargets unexpectedly passed for non-compliant 24px summary!');
      unitFailures++;
    } else {
      console.log('✅ PASS: assertTouchTargets correctly rejected non-compliant touch target < 44px.');
    }

    // 4. Test assertAccordionInteraction toggling state and checking overflow
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; padding: 0; }
            .card-container { width: 360px; box-sizing: border-box; }
            details { margin-top: 10px; }
            details summary { min-height: 44px; display: flex; align-items: center; cursor: pointer; }
            .content { padding: 8px; }
          </style>
        </head>
        <body>
          <div class="card-container">
            <details id="acc3">
              <summary>Interactive Toggle Test</summary>
              <div class="content">Collapsible content inside deep dive section.</div>
            </details>
          </div>
        </body>
      </html>
    `, { waitUntil: 'domcontentloaded' });

    const accordionRes = await assertAccordionInteraction(page, { expectedViewportWidth: 360 });
    if (!accordionRes.passed || !accordionRes.toggledSuccessfully || accordionRes.accordionCount !== 1) {
      console.error('❌ assertAccordionInteraction failed:', accordionRes);
      unitFailures++;
    } else {
      console.log('✅ PASS: assertAccordionInteraction verified smooth toggle and 0% overflow on expansion.');
    }

    // 5. Test verifyTouchTargetsAndAccordions helper and AnkiWebRunner integration
    const verifyHelperRes = await verifyTouchTargetsAndAccordions(page, { minHeight: 44 });
    if (!verifyHelperRes.passed || verifyHelperRes.touchResult.summaryCount !== 1) {
      console.error('❌ verifyTouchTargetsAndAccordions helper failed:', verifyHelperRes);
      unitFailures++;
    } else {
      console.log('✅ PASS: verifyTouchTargetsAndAccordions validated touch targets and accordion states.');
    }

    const testRunner = new AnkiWebRunner({ viewport: { width: 360, height: 640 } });
    testRunner.page = page;
    const runnerAccordionRes = await testRunner.verifyTouchTargetsAndAccordions({ minHeight: 44 });
    if (!runnerAccordionRes.passed) {
      console.error('❌ AnkiWebRunner.prototype.verifyTouchTargetsAndAccordions failed:', runnerAccordionRes);
      unitFailures++;
    } else {
      console.log('✅ PASS: AnkiWebRunner.prototype.verifyTouchTargetsAndAccordions correctly executed verification.');
    }

    // 6. Test runCardGuardrails with testAccordion on Back side
    const cardGuardrailRes = await runCardGuardrails(page, {
      cardId: 'DSA-STRUCT-TREE-001',
      side: 'back',
      viewport: { name: 'mobile-small', width: 360, height: 640, isMobile: true },
      options: { testAccordion: true }
    });
    if (!cardGuardrailRes.passed || typeof cardGuardrailRes.metrics.summaryTouchTargetHeight !== 'number') {
      console.error('❌ runCardGuardrails failed with accordion verification on Back side:', cardGuardrailRes);
      unitFailures++;
    } else {
      console.log(`✅ PASS: runCardGuardrails integrated accordion checks and captured summaryTouchTargetHeight (${cardGuardrailRes.metrics.summaryTouchTargetHeight}px).`);
    }

    await browser.close();
  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    console.error('❌ Error executing Touch Target & Accordion unit tests:', err);
    unitFailures++;
  }

  console.log('');
  return unitFailures;
}

async function testUserStory2VisualDiffSnapshotComparatorAndArtifacts() {
  console.log('🧪 Running Unit Tests for Visual Diff Comparator & Artifact Saving (Task T018)...\n');
  let unitFailures = 0;

  const tempScreenshotsDir = path.join(ROOT_DIR, 'reports', 'test-scratch-diff-t018');
  if (!fs.existsSync(tempScreenshotsDir)) {
    fs.mkdirSync(tempScreenshotsDir, { recursive: true });
  }

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // 1. Validate findBaselinePath
    const existingBaseline = findBaselinePath('CS-ARCH-CACHE-000', 'front', 'mobile-small');
    if (!existingBaseline || !fs.existsSync(existingBaseline)) {
      console.error('❌ findBaselinePath could not locate existing baseline for CS-ARCH-CACHE-000 front mobile-small:', existingBaseline);
      unitFailures++;
    } else {
      console.log(`✅ PASS: findBaselinePath correctly located baseline: ${path.basename(existingBaseline)}`);
    }

    const nonExistentBaseline = findBaselinePath('NON-EXISTENT-CARD-999', 'front', 'mobile-small');
    if (nonExistentBaseline !== null) {
      console.error('❌ findBaselinePath should return null for non-existent card ID, got:', nonExistentBaseline);
      unitFailures++;
    } else {
      console.log('✅ PASS: findBaselinePath correctly returned null for non-existent baseline.');
    }

    // 2. Test compareVisualSnapshots on identical images
    const img1Path = path.join(tempScreenshotsDir, 'img1.png');
    const img2Path = path.join(tempScreenshotsDir, 'img2.png');
    const diffOutPath = path.join(tempScreenshotsDir, 'diff.png');

    await page.setViewportSize({ width: 100, height: 100 });
    await page.setContent('<div style="width:100px; height:100px; background-color:#1e293b;"></div>');
    await page.screenshot({ path: img1Path });
    await page.screenshot({ path: img2Path });

    const identicalRes = await compareVisualSnapshots(img1Path, img2Path, {
      page,
      maxDiffPixelRatio: 0.02,
      diffOutputPath: diffOutPath
    });

    if (!identicalRes.match || identicalRes.diffRatio !== 0 || identicalRes.diffPixelCount !== 0) {
      console.error('❌ compareVisualSnapshots failed on identical images:', identicalRes);
      unitFailures++;
    } else {
      console.log('✅ PASS: compareVisualSnapshots returned match=true and diffRatio=0 for identical images.');
    }

    // 3. Test compareVisualSnapshots on divergent images
    const imgDivergentPath = path.join(tempScreenshotsDir, 'img-divergent.png');
    await page.setContent('<div style="width:100px; height:100px; background-color:#ef4444;"></div>');
    await page.screenshot({ path: imgDivergentPath });

    const divergentRes = await compareVisualSnapshots(img1Path, imgDivergentPath, {
      page,
      maxDiffPixelRatio: 0.02,
      diffOutputPath: diffOutPath
    });

    if (divergentRes.match || divergentRes.diffRatio <= 0.02 || !fs.existsSync(diffOutPath)) {
      console.error('❌ compareVisualSnapshots failed to flag divergence or write diff artifact:', divergentRes);
      unitFailures++;
    } else {
      console.log(`✅ PASS: compareVisualSnapshots correctly flagged divergence (diffRatio=${(divergentRes.diffRatio * 100).toFixed(1)}%) and saved diff artifact to disk.`);
    }

    // 4. Test compareVisualSnapshots with missing file error handling
    const missingRes = await compareVisualSnapshots('non-existent-1.png', 'non-existent-2.png');
    if (missingRes.match || !missingRes.error) {
      console.error('❌ compareVisualSnapshots did not handle missing files gracefully:', missingRes);
      unitFailures++;
    } else {
      console.log('✅ PASS: compareVisualSnapshots returned clear diagnostic error for missing screenshot files.');
    }

    await browser.close();
  } catch (err) {
    if (browser) await browser.close().catch(() => {});
    console.error('❌ Error executing Visual Diff comparator unit tests:', err);
    unitFailures++;
  } finally {
    if (fs.existsSync(tempScreenshotsDir)) {
      fs.rmSync(tempScreenshotsDir, { recursive: true, force: true });
    }
  }

  console.log('');
  return unitFailures;
}

async function testUserStory3SecurityIsolationAndSessionManagement() {
  console.log('🧪 Running Unit Tests for User Story 3: Secure Isolation, Session Caching & SRS History Protection (Tasks T019-T021)...\n');
  let unitFailures = 0;

  // ---------------------------------------------------------------------------
  // 1. Security Audit: Git Exclusions & Secret Shielding (T021, FR-010, SC-004)
  // ---------------------------------------------------------------------------
  const gitignorePath = path.join(ROOT_DIR, '.gitignore');
  if (!fs.existsSync(gitignorePath)) {
    console.error('❌ .gitignore file not found in repository root!');
    unitFailures++;
  } else {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    const requiredPatterns = ['.env', '.auth/', 'reports/', 'test-results/'];
    const missingPatterns = requiredPatterns.filter(p => !gitignoreContent.includes(p));

    if (missingPatterns.length > 0) {
      console.error(`❌ .gitignore is missing mandatory exclusion patterns: ${missingPatterns.join(', ')}`);
      unitFailures++;
    } else {
      console.log('✅ PASS: .gitignore contains all mandatory security exclusions (.env, .auth/, reports/, test-results/).');
    }
  }

  // Verify Git does not track sensitive directories or files
  try {
    const trackedEnv = execSync('git ls-files .env', { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
    const trackedAuth = execSync('git ls-files .auth', { cwd: ROOT_DIR, encoding: 'utf8' }).trim();
    const trackedReports = execSync('git ls-files reports', { cwd: ROOT_DIR, encoding: 'utf8' }).trim();

    if (trackedEnv !== '' || trackedAuth !== '' || trackedReports !== '') {
      console.error('❌ Security leak: Sensitive files are tracked by Git:', {
        trackedEnv,
        trackedAuth,
        trackedReports
      });
      unitFailures++;
    } else {
      console.log('✅ PASS: Git tracking audit verified zero tracking of .env, .auth/, or reports/.');
    }
  } catch (gitErr) {
    console.warn('⚠️ Warning: Git tracking check skipped (not a git repo or git command unavailable):', gitErr.message);
  }

  // Verify .env.example exists and is safe
  const envExamplePath = path.join(ROOT_DIR, '.env.example');
  if (!fs.existsSync(envExamplePath)) {
    console.error('❌ .env.example template file is missing!');
    unitFailures++;
  } else {
    const envExampleContent = fs.readFileSync(envExamplePath, 'utf8');
    if (!envExampleContent.includes('ANKIWEB_USER') || !envExampleContent.includes('ANKIWEB_PASSWORD')) {
      console.error('❌ .env.example does not contain ANKIWEB_USER and ANKIWEB_PASSWORD keys!');
      unitFailures++;
    } else {
      console.log('✅ PASS: .env.example exists and defines sanitized placeholder credentials.');
    }
  }

  // ---------------------------------------------------------------------------
  // 2. Session Caching, Cookie Persistence & Expiration Handling (T019, FR-003)
  // ---------------------------------------------------------------------------
  const testAuthDir = path.join(ROOT_DIR, '.auth-test-scratch-t019');
  const testSessionPath = path.join(testAuthDir, 'ankiweb-test-session.json');

  try {
    if (!fs.existsSync(testAuthDir)) {
      fs.mkdirSync(testAuthDir, { recursive: true });
    }

    // A. Test saveSessionState with Playwright Browser Context
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    await context.addCookies([
      {
        name: 'ankiweb_test_cookie',
        value: 'test_token_xyz_123',
        domain: '.ankiweb.net',
        path: '/',
        expires: Date.now() / 1000 + 3600,
        httpOnly: true,
        secure: true,
        sameSite: 'Lax'
      }
    ]);

    const savedPath = await saveSessionState(context, testSessionPath);
    if (!savedPath || !fs.existsSync(testSessionPath)) {
      console.error('❌ saveSessionState failed to persist storage state to disk!');
      unitFailures++;
    } else {
      const parsedSession = JSON.parse(fs.readFileSync(testSessionPath, 'utf8'));
      if (!Array.isArray(parsedSession.cookies) || !parsedSession.cookies.some(c => c.name === 'ankiweb_test_cookie')) {
        console.error('❌ saveSessionState output JSON does not contain expected cookies payload!');
        unitFailures++;
      } else {
        console.log('✅ PASS: saveSessionState successfully persisted Playwright session state with cookies and origins.');
      }
    }

    // B. Test isSessionExpired
    const page = await context.newPage();
    await page.setContent('<div><form action="/account/login"><input name="username"/></form></div>');
    const expiredOnLogin = await isSessionExpired(page);
    if (!expiredOnLogin) {
      console.error('❌ isSessionExpired failed to identify unauthenticated/login form state!');
      unitFailures++;
    } else {
      console.log('✅ PASS: isSessionExpired correctly detected unauthenticated state.');
    }

    // C. Test AnkiWebRunner with malformed session file (Graceful Degradation)
    const malformedSessionPath = path.join(testAuthDir, 'malformed-session.json');
    fs.writeFileSync(malformedSessionPath, '{ invalid_json_syntax: 123', 'utf8');

    const runnerWithBadStorage = new AnkiWebRunner({
      authStoragePath: malformedSessionPath,
      headed: false
    });

    const badStoragePage = await runnerWithBadStorage.launch();
    if (!badStoragePage) {
      console.error('❌ AnkiWebRunner.launch crashed on malformed storage state JSON!');
      unitFailures++;
    } else {
      console.log('✅ PASS: AnkiWebRunner.launch gracefully handled malformed session JSON without throwing.');
    }
    await runnerWithBadStorage.close();

    // D. Test AnkiWebRunner clearSession
    const runnerToClear = new AnkiWebRunner({
      authStoragePath: testSessionPath,
      credentials: { user: 'test@example.com', password: 'secretpassword' }
    });

    const cleared = runnerToClear.clearSession();
    if (!cleared || fs.existsSync(testSessionPath)) {
      console.error('❌ AnkiWebRunner.clearSession failed to remove session file from disk!');
      unitFailures++;
    } else {
      console.log('✅ PASS: AnkiWebRunner.clearSession successfully removed cached session from disk.');
    }
    await runnerToClear.close();
    await browser.close();
  } catch (err) {
    console.error('❌ Error executing session persistence unit tests:', err);
    unitFailures++;
  } finally {
    if (fs.existsSync(testAuthDir)) {
      fs.rmSync(testAuthDir, { recursive: true, force: true });
    }
  }

  // ---------------------------------------------------------------------------
  // 3. Deck Isolation & --cleanup Flag Handling (T020, FR-002)
  // ---------------------------------------------------------------------------
  try {
    // A. Test CLI option parser handles --cleanup and --no-cleanup
    const defaultOpts = parseCLIOptions([]);
    const cleanupOpts = parseCLIOptions(['--cleanup']);
    const noCleanupOpts = parseCLIOptions(['--no-cleanup']);

    if (defaultOpts.cleanup !== false) {
      console.error('❌ parseCLIOptions default cleanup must be false, got:', defaultOpts.cleanup);
      unitFailures++;
    } else if (cleanupOpts.cleanup !== true) {
      console.error('❌ parseCLIOptions failed to set cleanup: true with --cleanup flag.');
      unitFailures++;
    } else if (noCleanupOpts.cleanup !== false) {
      console.error('❌ parseCLIOptions failed to handle --no-cleanup.');
      unitFailures++;
    } else {
      console.log('✅ PASS: parseCLIOptions correctly manages --cleanup flag (default: false, --cleanup: true).');
    }

    // B. Test AnkiConnectClient.cleanupTestDeck method
    const rpcLog = [];
    const mockClient = new AnkiConnectClient({ endpoint: 'http://127.0.0.1:8765' });
    mockClient.request = async (action, params) => {
      rpcLog.push({ action, params });
      if (action === 'version') return 6;
      if (action === 'deleteDecks') return null;
      if (action === 'sync') return null;
      return null;
    };

    const cleanupRes = await mockClient.cleanupTestDeck('MAANG_E2E_Sanity', true);
    if (!cleanupRes.deleted || !cleanupRes.synced) {
      console.error('❌ mockClient.cleanupTestDeck did not return expected status:', cleanupRes);
      unitFailures++;
    } else {
      const deleteCall = rpcLog.find(c => c.action === 'deleteDecks');
      const syncCall = rpcLog.find(c => c.action === 'sync');

      if (!deleteCall || !deleteCall.params || !deleteCall.params.decks.includes('MAANG_E2E_Sanity')) {
        console.error('❌ cleanupTestDeck did not dispatch deleteDecks with MAANG_E2E_Sanity:', deleteCall);
        unitFailures++;
      } else if (!syncCall) {
        console.error('❌ cleanupTestDeck did not trigger cloud sync after deletion!');
        unitFailures++;
      } else {
        console.log('✅ PASS: AnkiConnectClient.cleanupTestDeck isolated and deleted test deck and synced with AnkiWeb.');
      }
    }

    // C. Test Deck Isolation in Orchestrator (never target master decks)
    const tempReportDir = path.join(ROOT_DIR, 'reports', 'test-scratch-isolation-t020');
    const orchRpcLog = [];
    const mockOrchClient = {
      ping: async () => 6,
      importPackage: async () => null,
      sync: async () => { orchRpcLog.push('sync'); return null; },
      deleteDecks: async (decks, cardsToo) => { orchRpcLog.push({ action: 'deleteDecks', decks, cardsToo }); return null; },
      cleanupTestDeck: async (deckName, syncAfter) => {
        orchRpcLog.push({ action: 'cleanupTestDeck', deckName, syncAfter });
        return { deleted: true, synced: syncAfter };
      }
    };

    // Run orchestrator with cleanup: false
    await runOrchestrator({
      skipBrowser: true,
      skipAnkiConnect: false,
      ankiConnectClient: mockOrchClient,
      cleanup: false,
      sampleCount: 1,
      reportDir: tempReportDir
    });

    const deletedWhenFalse = orchRpcLog.some(c => c.action === 'deleteDecks' || c.action === 'cleanupTestDeck');
    if (deletedWhenFalse) {
      console.error('❌ runOrchestrator deleted deck even when cleanup was false!');
      unitFailures++;
    } else {
      console.log('✅ PASS: runOrchestrator preserved MAANG_E2E_Sanity when cleanup was false (default mode).');
    }

    // Run orchestrator with cleanup: true
    orchRpcLog.length = 0;
    await runOrchestrator({
      skipBrowser: true,
      skipAnkiConnect: false,
      ankiConnectClient: mockOrchClient,
      cleanup: true,
      sampleCount: 1,
      reportDir: tempReportDir
    });

    const cleanedWhenTrue = orchRpcLog.some(c => (c.action === 'deleteDecks' || c.action === 'cleanupTestDeck') && (c.deckName === 'MAANG_E2E_Sanity' || (c.decks && c.decks.includes('MAANG_E2E_Sanity'))));
    if (!cleanedWhenTrue) {
      console.error('❌ runOrchestrator failed to clean up MAANG_E2E_Sanity when cleanup was true!', orchRpcLog);
      unitFailures++;
    } else {
      console.log('✅ PASS: runOrchestrator deleted MAANG_E2E_Sanity and triggered cloud sync when cleanup was true.');
    }

    // Verify master decks are never in the delete log
    const deletedMasterDecks = orchRpcLog.filter(c => {
      const decks = c.decks || [c.deckName];
      return decks.some(d => d && (d.startsWith('01-') || d.startsWith('02-') || d.startsWith('03-') || d.startsWith('04-')));
    });

    if (deletedMasterDecks.length > 0) {
      console.error('❌ Critical violation: Master decks targeted for deletion in orchestrator:', deletedMasterDecks);
      unitFailures++;
    } else {
      console.log('✅ PASS: Master curricular decks are 100% isolated and never deleted.');
    }

    if (fs.existsSync(tempReportDir)) {
      fs.rmSync(tempReportDir, { recursive: true, force: true });
    }
  } catch (err) {
    console.error('❌ Error executing deck isolation and cleanup unit tests:', err);
    unitFailures++;
  }

  console.log('');
  return unitFailures;
}

async function testUserStory4FastLocalRunnerAndPerformanceBenchmark() {
  console.log('🧪 Running Unit Tests for User Story 4: Fast Local Component Runner & Benchmark (src/e2e/local-runner.js)...\n');
  let unitFailures = 0;

  // Test 1: Verify BENCHMARK_MAX_DURATION_MS constant and default options (Task T024, SC-005)
  if (BENCHMARK_MAX_DURATION_MS !== 3000) {
    console.error(`❌ Expected BENCHMARK_MAX_DURATION_MS to be 3000ms, got ${BENCHMARK_MAX_DURATION_MS}`);
    unitFailures++;
  } else {
    console.log('✅ PASS: BENCHMARK_MAX_DURATION_MS is set to 3000ms (3.0s budget).');
  }

  if (DEFAULT_LOCAL_OPTIONS.maxDurationMs !== 3000 || DEFAULT_LOCAL_OPTIONS.sampleCount !== 8) {
    console.error('❌ DEFAULT_LOCAL_OPTIONS has unexpected defaults:', DEFAULT_LOCAL_OPTIONS);
    unitFailures++;
  } else {
    console.log('✅ PASS: DEFAULT_LOCAL_OPTIONS properly configured with 3000ms and 8 cards.');
  }

  // Test 2: Verify assertPerformanceBenchmark logic (Task T024)
  const passBench = assertPerformanceBenchmark(1850, 3000);
  if (!passBench.passed || passBench.error !== null || passBench.marginMs !== 1150) {
    console.error('❌ assertPerformanceBenchmark failed for duration within budget:', passBench);
    unitFailures++;
  } else {
    console.log('✅ PASS: assertPerformanceBenchmark correctly passes for durations <= 3000ms.');
  }

  const failBench = assertPerformanceBenchmark(3500, 3000);
  if (failBench.passed || !failBench.error || failBench.marginMs !== -500) {
    console.error('❌ assertPerformanceBenchmark failed to catch over-budget execution:', failBench);
    unitFailures++;
  } else {
    console.log('✅ PASS: assertPerformanceBenchmark correctly flags durations > 3000ms with error details.');
  }

  // Test 3: Verify parseLocalCLIOptions CLI parser (Task T022)
  const parsedCli = parseLocalCLIOptions([
    '--phase', '01-dsa',
    '--sample-count', '5',
    '--max-duration', '2500',
    '--headed',
    '--concurrency', '2',
    '--all-viewports',
    '--no-save'
  ]);

  if (
    parsedCli.phase !== '01-dsa' ||
    parsedCli.sampleCount !== 5 ||
    parsedCli.maxDurationMs !== 2500 ||
    parsedCli.headed !== true ||
    parsedCli.concurrency !== 2 ||
    parsedCli.saveReport !== false ||
    parsedCli.viewports.length !== 3
  ) {
    console.error('❌ parseLocalCLIOptions produced unexpected output:', parsedCli);
    unitFailures++;
  } else {
    console.log('✅ PASS: parseLocalCLIOptions correctly parses all CLI flags.');
  }

  // Test 4: Verify package.json contains test:e2e:local script (Task T023)
  const pkgJsonPath = path.join(ROOT_DIR, 'package.json');
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
  if (pkgJson.scripts['test:e2e:local'] !== 'node src/e2e/local-runner.js') {
    console.error(`❌ package.json script "test:e2e:local" missing or invalid: "${pkgJson.scripts['test:e2e:local']}"`);
    unitFailures++;
  } else {
    console.log('✅ PASS: package.json scripts correctly includes "test:e2e:local": "node src/e2e/local-runner.js".');
  }

  // Test 5: Execute LocalRunner end-to-end in-memory and assert report + benchmark (Task T022, T024)
  try {
    const localResult = await runLocalRunner({
      sampleCount: 8,
      maxDurationMs: 3000,
      saveReport: false
    });

    if (!localResult || typeof localResult !== 'object') {
      console.error('❌ runLocalRunner did not return a valid result object:', localResult);
      unitFailures++;
    } else {
      const { report, benchmark, passed, durationMs } = localResult;

      if (!passed || report.summary.overallStatus !== 'PASSED') {
        console.error('❌ runLocalRunner failed validation:', report.summary, report.cardResults);
        unitFailures++;
      } else {
        console.log(`✅ PASS: runLocalRunner executed with status PASSED across ${report.summary.totalCardsTested} cards.`);
      }

      if (report.suite !== 'Local E2E Component Runner' || report.environment.mode !== 'local-headless') {
        console.error('❌ runLocalRunner report suite/mode mismatch:', report.suite, report.environment);
        unitFailures++;
      } else {
        console.log('✅ PASS: Report suite is "Local E2E Component Runner" and mode is "local-headless".');
      }

      // Assert all 8 typologies are covered
      const unmappedTypology = ALL_TYPOLOGIES.find(t => !report.typologiesCovered[t]);
      if (unmappedTypology) {
        console.error(`❌ Typology "${unmappedTypology}" not covered in local runner report!`, report.typologiesCovered);
        unitFailures++;
      } else {
        console.log('✅ PASS: 100% of all 8 card typologies verified by local runner.');
      }

      // Assert report conforms to schema
      const reportValidation = validateE2EReport(report);
      if (!reportValidation.valid) {
        console.error('❌ Local runner report failed schema validation:', reportValidation.errors);
        unitFailures++;
      } else {
        console.log('✅ PASS: Local runner execution report strictly satisfies e2e-report.schema.json.');
      }

      // Assert benchmark under 3000ms
      if (!benchmark.passed || durationMs > 3000) {
        console.error(`❌ Performance benchmark violation: Local runner took ${durationMs}ms (> 3000ms budget)!`);
        unitFailures++;
      } else {
        console.log(`✅ PASS: Sub-3-second benchmark satisfied! (Executed in ${durationMs}ms, budget: 3000ms, margin: +${benchmark.marginMs}ms).`);
      }
    }
  } catch (err) {
    console.error('❌ Error during runLocalRunner execution:', err);
    unitFailures++;
  }

  console.log('');
  return unitFailures;
}

async function runTests() {
  console.log('🧪 Starting Automated Card & Manifest Validation...\n');

  let failureCount = 0;

  // Run Unit Tests first
  failureCount += testL2AndAtomicityRules();
  failureCount += testAtomicDecomposer();
  failureCount += testMediaCatalog();
  failureCount += testRemoteHttpsAndLocalAssetIntegrity();
  failureCount += await testUserStory3LinkCheckerAndRetryLogic();
  failureCount += testUserStory1VideoStylesAndMobileFlags();
  failureCount += testUserStory2RegistrySchemaAndPlaceholderGuardrails();
  failureCount += testDynamicManifestAndSSOT();
  failureCount += testUserStory4GracefulDegradationAndFallbackStyles();
  failureCount += await testPlaywrightConfigAndAnkiConnectClient();
  failureCount += testSanitySamplerAndTenPercentRule();
  failureCount += await testGeneratorModularHelpersAndCustomPackaging();
  failureCount += await testDOMAndCSSLayoutGuardrailsEngine();
  failureCount += testOrchestratorCLIAndReportGenerator();
  failureCount += await testUserStory1AnkiConnectSamplerAndReportValidation();
  failureCount += await testAnkiWebRunnerController();
  failureCount += await testUserStory1OrchestratorPipelineIntegration();
  failureCount += testUserStory2PlaywrightVisualRegressionSpecAndPackageJsonScripts();
  failureCount += testUserStory2GoldenBaselinesAndMobileViewportEvidence();
  failureCount += await testUserStory2TouchTargetsAndAccordionToggle();
  failureCount += await testUserStory2VisualDiffSnapshotComparatorAndArtifacts();
  failureCount += await testUserStory3SecurityIsolationAndSessionManagement();
  failureCount += await testUserStory4FastLocalRunnerAndPerformanceBenchmark();

  // 1. Validate Manifest
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('❌ syllabus_manifest.json not found!');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const manifestValidation = validateManifest(manifest);

  if (!manifestValidation.valid) {
    console.error('❌ Manifest Validation Errors:');
    manifestValidation.errors.forEach(e => console.error(`   - ${e}`));
    failureCount++;
  } else {
    console.log('✅ syllabus_manifest.json is valid.');
  }

  // Collect all card IDs registered in manifest
  const registeredCardIds = new Set();
  manifest.phases.forEach(phase => {
    phase.modules.forEach(mod => {
      mod.subtopics.forEach(sub => {
        sub.card_ids.forEach(id => {
          if (registeredCardIds.has(id)) {
            console.error(`❌ Duplicate card ID in manifest: "${id}"`);
            failureCount++;
          }
          registeredCardIds.add(id);
        });
      });
    });
  });

  // 2. Validate all Markdown Flashcards
  const cardFiles = getMarkdownFiles(DECKS_DIR);
  console.log(`\n🔍 Found ${cardFiles.length} card file(s) on disk to validate.`);

  const diskCardIds = new Set();

  for (const file of cardFiles) {
    const relPath = path.relative(ROOT_DIR, file);
    const content = fs.readFileSync(file, 'utf8');

    const result = validateCard(file, content);

    if (result.frontmatter && result.frontmatter.id) {
      if (diskCardIds.has(result.frontmatter.id)) {
        console.error(`❌ Duplicate card ID on disk: "${result.frontmatter.id}" in ${relPath}`);
        failureCount++;
      }
      diskCardIds.add(result.frontmatter.id);
    }

    if (!result.valid) {
      console.error(`\n❌ Validation FAILED for [${relPath}]:`);
      result.errors.forEach(err => console.error(`   - ${err}`));
      failureCount++;
    } else {
      console.log(`✅ [${result.frontmatter.id}] ${relPath}`);
    }
  }

  // 3. Cross-reference manifest IDs and disk IDs
  for (const id of registeredCardIds) {
    if (!diskCardIds.has(id)) {
      console.error(`❌ Card ID "${id}" is in manifest but missing on disk!`);
      failureCount++;
    }
  }

  for (const id of diskCardIds) {
    if (!registeredCardIds.has(id)) {
      console.warn(`⚠️ Warning: Card ID "${id}" on disk is not registered in syllabus_manifest.json`);
    }
  }

  console.log('\n========================================');
  if (failureCount === 0) {
    console.log(`🎉 ALL VALIDATION CHECKS PASSED (${cardFiles.length} cards verified)`);
    console.log('========================================\n');
    process.exit(0);
  } else {
    console.error(`💥 VALIDATION FAILED with ${failureCount} error(s)!`);
    console.log('========================================\n');
    process.exit(1);
  }
}

runTests();
