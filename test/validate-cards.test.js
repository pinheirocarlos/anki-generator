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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const DECKS_DIR = path.join(ROOT_DIR, 'decks');
const MANIFEST_PATH = path.join(ROOT_DIR, 'syllabus_manifest.json');

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

function runTests() {
  console.log('🧪 Starting Automated Card & Manifest Validation...\n');

  let failureCount = 0;

  // Run Unit Tests first
  failureCount += testL2AndAtomicityRules();
  failureCount += testAtomicDecomposer();

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
