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
import { getMarkdownFiles, cardCss, MANDATORY_VIDEO_ATTRIBUTES, ensureVideoAttributesAndContainers } from '../src/generator.js';
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
![Diagram](assets/DSA-STRUCT-TREE-001.svg)
<img src="assets/DSA-STRUCT-TREE-001.svg" alt="Tree Diagram" />
<video src="https://assets.faang-anki.dev/media/dsa/avl-rotation-loop.webm" autoplay loop muted playsinline></video>
`;

  const resolved = resolveMedia(mockCardPath, mockMarkdownWithLocal);
  if (resolved.mediaFiles.length !== 1) {
    console.error(`❌ Expected exactly 1 unique extracted local media file, got ${resolved.mediaFiles.length}`);
    unitFailures++;
  } else if (resolved.mediaFiles[0].filename !== 'DSA-STRUCT-TREE-001.svg') {
    console.error(`❌ Expected filename "DSA-STRUCT-TREE-001.svg", got "${resolved.mediaFiles[0].filename}"`);
    unitFailures++;
  } else if (!Buffer.isBuffer(resolved.mediaFiles[0].data) || resolved.mediaFiles[0].data.length === 0) {
    console.error('❌ Expected valid non-empty Buffer for local media file data.');
    unitFailures++;
  } else {
    console.log('✅ PASS: resolveMedia correctly extracted and deduplicated local asset binary buffer.');
  }

  if (resolved.rewrittenMarkdown.includes('assets/DSA-STRUCT-TREE-001.svg')) {
    console.error('❌ Expected markdown paths to be rewritten to flat filenames for Anki package export.');
    unitFailures++;
  } else if (!resolved.rewrittenMarkdown.includes('DSA-STRUCT-TREE-001.svg')) {
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
![Diagram](assets/DSA-STRUCT-TREE-001.svg)
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
      try { fs.unlinkSync(testReportFile); } catch {}
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
    try { fs.unlinkSync(batchAuditResult.reportPath); } catch {}
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
  failureCount += testUserStory4GracefulDegradationAndFallbackStyles();

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
