import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateCard, validateManifest } from '../src/utils/validator.js';
import { getMarkdownFiles } from '../src/generator.js';
import { resolveMedia } from '../src/utils/media-resolver.js';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const DECKS_DIR = path.join(ROOT_DIR, 'decks');
const MANIFEST_PATH = path.join(ROOT_DIR, 'syllabus_manifest.json');

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

  // Test 4: Verify DSA algorithmic cards contain valid micro-videos in loop
  const dsaFiles = getMarkdownFiles(path.join(DECKS_DIR, '01-dsa'));
  let videoCardsCount = 0;
  for (const file of dsaFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('<video ') && content.includes('autoplay') && content.includes('loop')) {
      videoCardsCount++;
    }
  }

  if (videoCardsCount < 150) {
    console.error(`❌ Expected at least 150 DSA cards with micro-video loops, found ${videoCardsCount}`);
    unitFailures++;
  } else {
    console.log(`✅ PASS: Verified ${videoCardsCount} DSA cards containing looping micro-videos (<video autoplay loop muted>).`);
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

function runTests() {
  console.log('🧪 Starting Automated Card & Manifest Validation...\n');

  let failureCount = 0;

  // Run Unit Tests first
  failureCount += testL2AndAtomicityRules();
  failureCount += testAtomicDecomposer();
  failureCount += testMediaCatalog();
  failureCount += testRemoteHttpsAndLocalAssetIntegrity();

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

    if (!result.valid) {
      console.error(`\n❌ Validation FAILED for [${relPath}]:`);
      result.errors.forEach(err => console.error(`   - ${err}`));
      failureCount++;
    } else {
      console.log(`✅ [${result.frontmatter.id}] ${relPath}`);

      if (diskCardIds.has(result.frontmatter.id)) {
        console.error(`❌ Duplicate card ID on disk: "${result.frontmatter.id}" in ${relPath}`);
        failureCount++;
      }
      diskCardIds.add(result.frontmatter.id);
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
