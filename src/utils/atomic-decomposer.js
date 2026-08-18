import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { getMarkdownFiles } from '../generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const DECKS_DIR = path.join(ROOT_DIR, 'decks');

/**
 * Regular expressions for compound question detection.
 */
const COMPOUND_CONNECTIVES_REGEX = /(?:,\s*(?:e\s+)?|\s+e\s+|;\s*|\bal[eé]m\s+de\s+|\bcomo\s+tamb[eé]m\s+)(?:como\s+funciona|como\s+provar|como\s+projetar|como\s+implementar|como\s+mitigar|como\s+evitar|como\s+otimizar|como\s+resolver|como\s+tratar|como\s+a\b|como\s+o\b|como\s+os\b|como\s+as\b|por\s+que|qual\s+a\b|qual\s+o\b|qual\s+analogia|quais\s+s[aã]o|quais\s+os\b|quais\s+as\b|o\s+que\s+[eé]\b|o\s+que\s+acontece|de\s+que\s+forma|quando\s+escolher|quando\s+usar)\b/gi;

const INTERROGATIVE_STARTERS_REGEX = /\b(como\s+(?:funciona|provar|projetar|implementar|mitigar|evitar|otimizar|resolver|tratar|funciona|o\b|a\b|os\b|as\b)|por\s+que|qual\s+(?:a\b|o\b|analogia|diferen[cç]a|impacto|papel)|quais\s+(?:s[aã]o|os\b|as\b)|o\s+que\s+(?:[eé]\b|acontece|retorna)|de\s+que\s+forma|quando\s+(?:escolher|usar))\b/gi;

/**
 * Clean question text by stripping markdown code blocks and inline code.
 * @param {string} text
 * @returns {string}
 */
export function cleanQuestionText(text) {
  if (!text) return '';
  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/\$[^$\n]+\$/g, '')
    .trim();
}

/**
 * Extract sections from card markdown content.
 * @param {string} content
 * @returns {{ question: string, quickAnswer: string, visual: string, deepDive: string }}
 */
export function extractSections(content) {
  const perguntaMatch = content.match(/##\s+Pergunta\b([\s\S]*?)(?=##\s+Resposta\b|$)/i);
  const respostaMatch = content.match(/##\s+Resposta\b([\s\S]*?)$/i);

  const question = perguntaMatch ? perguntaMatch[1].trim() : '';
  const respostaBody = respostaMatch ? respostaMatch[1].trim() : '';

  const quickAnswerMatch = respostaBody.match(/###\s+Quick Answer\b([\s\S]*?)(?=###\s+Dual Coding Visual\b|<details\b|$)/i);
  const visualMatch = respostaBody.match(/###\s+Dual Coding Visual\b([\s\S]*?)(?=<details\b|$)/i);
  const deepDiveMatch = respostaBody.match(/<details\b([\s\S]*?)<\/details>/i);

  return {
    question,
    quickAnswer: quickAnswerMatch ? quickAnswerMatch[1].trim() : '',
    visual: visualMatch ? visualMatch[1].trim() : '',
    deepDive: deepDiveMatch ? deepDiveMatch[0].trim() : ''
  };
}

/**
 * Extract top-level bullet points from a markdown section.
 * @param {string} text
 * @returns {string[]}
 */
export function extractTopLevelBullets(text) {
  if (!text) return [];
  const lines = text.split('\n');
  const bullets = [];
  let currentBullet = null;

  for (const line of lines) {
    const match = line.match(/^[-*]\s+\*\*?([^*:]+)\*\*?:?\s*(.*)$/);
    if (match) {
      if (currentBullet) bullets.push(currentBullet);
      currentBullet = {
        title: match[1].trim(),
        text: match[2].trim(),
        full: line.trim()
      };
    } else if (line.match(/^[-*]\s+(.*)$/) && !line.startsWith('  ') && !line.startsWith('\t')) {
      if (currentBullet) bullets.push(currentBullet);
      currentBullet = {
        title: '',
        text: line.replace(/^[-*]\s+/, '').trim(),
        full: line.trim()
      };
    } else if (currentBullet && (line.startsWith('  ') || line.startsWith('\t') || line.startsWith('    '))) {
      currentBullet.full += '\n' + line;
      currentBullet.text += ' ' + line.trim();
    }
  }
  if (currentBullet) bullets.push(currentBullet);
  return bullets;
}

/**
 * Extract question clauses and analyze question atomicity.
 * @param {string} rawQuestion
 * @returns {{ isAtomic: boolean, questionMarksCount: number, compoundReasons: string[], clauses: string[] }}
 */
export function analyzeQuestionAtomicity(rawQuestion) {
  const clean = cleanQuestionText(rawQuestion);
  const questionMarksCount = (clean.match(/\?/g) || []).length;
  const compoundReasons = [];
  const clauses = [];

  // 1. Multiple question marks check
  if (questionMarksCount > 1) {
    compoundReasons.push(`Contém ${questionMarksCount} pontos de interrogação na seção ## Pergunta.`);
  }

  // 2. Interrogative bullet points in question
  const questionBullets = clean.split('\n').filter(l => l.trim().match(/^[-*0-9.]+\s+/));
  if (questionBullets.length > 1) {
    compoundReasons.push(`A pergunta está estruturada em ${questionBullets.length} tópicos/bullets separados.`);
  }

  // 3. Connective conjunctions matching compound questions
  const connectiveMatches = clean.match(COMPOUND_CONNECTIVES_REGEX) || [];
  if (connectiveMatches.length > 0) {
    compoundReasons.push(`Detectados conectivos de pergunta composta: ${connectiveMatches.map(m => `"${m.trim()}"`).join(', ')}`);
  }

  // 4. Starter count check (e.g. "Como ... e qual ... e por que ...")
  const starters = clean.match(INTERROGATIVE_STARTERS_REGEX) || [];
  if (starters.length > 1) {
    compoundReasons.push(`Detectadas ${starters.length} proposições interrogativas distintas: ${starters.map(s => `"${s.trim()}"`).join(', ')}`);
  }

  // Split into estimated clauses
  if (connectiveMatches.length > 0 || starters.length > 1) {
    const splitRegex = /(?:,\s*(?:e\s+)?|\s+e\s+|;\s*|\bal[eé]m\s+de\s+|\bcomo\s+tamb[eé]m\s+)(?=(?:como|por\s+que|qual|quais|o\s+que|de\s+que\s+forma|quando)\b)/gi;
    const parts = clean.split(splitRegex).map(p => p.trim()).filter(Boolean);
    parts.forEach(p => clauses.push(p));
  } else {
    clauses.push(clean);
  }

  const isAtomic = compoundReasons.length === 0;

  return {
    isAtomic,
    questionMarksCount,
    compoundReasons,
    clauses
  };
}

/**
 * Generate proposed atomic card IDs and decompositions based on card structure.
 * @param {object} cardInfo
 * @param {object} questionAnalysis
 * @param {Array} quickAnswerBullets
 * @returns {Array}
 */
export function proposeDecompositions(cardInfo, questionAnalysis, quickAnswerBullets) {
  const { id, title, tags, levelTag, topicTag, freqTag, companyTag } = cardInfo;

  if (questionAnalysis.isAtomic && quickAnswerBullets.length <= 1) {
    return [
      {
        targetId: id,
        title: title,
        question: cardInfo.rawQuestion,
        level: levelTag || 'level::l3-junior',
        tags: tags || [],
        conceptSummary: title
      }
    ];
  }

  // Determine split count: max of detected clauses and quick answer bullets (capped between 2 and 4)
  const splitCandidateCount = Math.max(
    questionAnalysis.clauses.length,
    quickAnswerBullets.length,
    questionAnalysis.compoundReasons.length > 0 ? 2 : 1
  );
  const targetCount = Math.min(Math.max(splitCandidateCount, 2), 4);

  // Extract base prefix and suffix number
  const match = id.match(/^([A-Z0-9]+-[A-Z0-9]+-[A-Z0-9]+)-(\d{3})$/);
  const basePrefix = match ? match[1] : id;
  const originalSeq = match ? parseInt(match[2], 10) : 0;

  const proposed = [];

  for (let i = 0; i < targetCount; i++) {
    const clause = questionAnalysis.clauses[i] || questionAnalysis.clauses[0] || cardInfo.rawQuestion;
    const bullet = quickAnswerBullets[i] || null;

    // Deterministic new ID calculation:
    // Original 000 -> 000 (primary concept), 002 (secondary), 003 (tertiary)
    // Original 001 -> 001 (primary advanced), 004 (secondary advanced), 005 (tertiary advanced)
    let newSeq;
    if (i === 0) {
      newSeq = originalSeq; // Preserve primary ID
    } else if (originalSeq === 0) {
      newSeq = 1 + i; // 002, 003
    } else {
      newSeq = originalSeq + (i * 3); // 004, 007 or sequential offset
    }
    const targetId = `${basePrefix}-${String(newSeq).padStart(3, '0')}`;

    let proposedTitle = title;
    if (bullet && bullet.title) {
      proposedTitle = `${title.split(':')[0]}: ${bullet.title}`;
    } else if (clause) {
      const cleanClause = clause.replace(/^\W+/, '').replace(/\?+$/, '');
      proposedTitle = `${title.split(':')[0]}: ${cleanClause.slice(0, 60)}`;
    }

    let proposedQuestion = clause;
    if (!proposedQuestion.endsWith('?')) {
      proposedQuestion += '?';
    }
    // Capitalize first letter
    proposedQuestion = proposedQuestion.charAt(0).toUpperCase() + proposedQuestion.slice(1);

    proposed.push({
      targetId,
      originalId: id,
      splitIndex: i + 1,
      totalSplits: targetCount,
      title: proposedTitle,
      question: proposedQuestion,
      level: levelTag || 'level::l3-junior',
      tags: tags || [],
      conceptBullet: bullet ? bullet.title : `Conceito ${i + 1}`,
      quickAnswerExtract: bullet ? bullet.full : ''
    });
  }

  return proposed;
}

/**
 * Audit a single flashcard file.
 * @param {string} filePath
 * @param {string} [rawContent]
 * @returns {object}
 */
export function auditCard(filePath, rawContent = null) {
  const contentStr = rawContent !== null ? rawContent : fs.readFileSync(filePath, 'utf8');
  let parsed;
  try {
    parsed = matter(contentStr);
  } catch (err) {
    return {
      filePath,
      id: 'PARSE_ERROR',
      valid: false,
      error: `YAML frontmatter error: ${err.message}`
    };
  }

  const { data: frontmatter, content } = parsed;
  const sections = extractSections(content);
  const questionAnalysis = analyzeQuestionAtomicity(sections.question);
  const quickAnswerBullets = extractTopLevelBullets(sections.quickAnswer);

  const tags = frontmatter.tags || [];
  const levelTag = tags.find(t => t.startsWith('level::')) || 'level::l3-junior';
  const topicTag = tags.find(t => t.startsWith('topic::')) || '';
  const freqTag = tags.find(t => t.startsWith('freq::')) || 'freq::high';
  const companyTag = tags.find(t => t.startsWith('company::')) || '';

  // Extract phase, module, subtopic from path
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const pathParts = relPath.split('/');
  const phase = pathParts[1] || '';
  const moduleName = pathParts[2] || '';
  const subtopic = pathParts[3] || '';

  const cardInfo = {
    id: frontmatter.id || path.basename(filePath, '.md'),
    title: frontmatter.title || '',
    tags,
    levelTag,
    topicTag,
    freqTag,
    companyTag,
    rawQuestion: sections.question
  };

  const proposedDecompositions = proposeDecompositions(cardInfo, questionAnalysis, quickAnswerBullets);

  return {
    filePath,
    relativePath: relPath,
    id: cardInfo.id,
    title: cardInfo.title,
    phase,
    module: moduleName,
    subtopic,
    tags,
    level: levelTag,
    topic: topicTag,
    rawQuestion: sections.question,
    cleanQuestion: cleanQuestionText(sections.question),
    isAtomic: questionAnalysis.isAtomic && quickAnswerBullets.length <= 1,
    compoundScore: questionAnalysis.compoundReasons.length + (quickAnswerBullets.length > 2 ? 1 : 0),
    compoundReasons: questionAnalysis.compoundReasons,
    clauses: questionAnalysis.clauses,
    quickAnswerBulletCount: quickAnswerBullets.length,
    quickAnswerBullets: quickAnswerBullets.map(b => b.title || b.text.slice(0, 50)),
    suggestedSplitCount: proposedDecompositions.length,
    proposedDecompositions
  };
}

/**
 * Audit all cards across decks.
 * @param {object} [options]
 * @returns {object}
 */
export function auditAllCards(options = {}) {
  const { decksDir = DECKS_DIR, phaseFilter = null } = options;

  let allFiles = getMarkdownFiles(decksDir);
  if (phaseFilter) {
    allFiles = allFiles.filter(f => f.includes(phaseFilter));
  }

  const results = [];
  const phaseStats = {};
  let totalCards = 0;
  let atomicCount = 0;
  let compoundCount = 0;
  let projectedTotal = 0;

  for (const file of allFiles) {
    const cardAudit = auditCard(file);
    if (!cardAudit.id || cardAudit.id === 'PARSE_ERROR') continue;

    totalCards++;
    if (cardAudit.isAtomic) {
      atomicCount++;
    } else {
      compoundCount++;
    }
    projectedTotal += cardAudit.suggestedSplitCount;

    // Track per phase
    const p = cardAudit.phase || 'unknown';
    if (!phaseStats[p]) {
      phaseStats[p] = {
        phase: p,
        total: 0,
        atomic: 0,
        compound: 0,
        projected: 0
      };
    }
    phaseStats[p].total++;
    if (cardAudit.isAtomic) {
      phaseStats[p].atomic++;
    } else {
      phaseStats[p].compound++;
    }
    phaseStats[p].projected += cardAudit.suggestedSplitCount;

    results.push(cardAudit);
  }

  const atomicPercentage = totalCards > 0 ? ((atomicCount / totalCards) * 100).toFixed(1) : '0';
  const compoundPercentage = totalCards > 0 ? ((compoundCount / totalCards) * 100).toFixed(1) : '0';

  return {
    timestamp: new Date().toISOString(),
    totalCards,
    atomicCount,
    compoundCount,
    atomicPercentage: `${atomicPercentage}%`,
    compoundPercentage: `${compoundPercentage}%`,
    projectedTotalCards: projectedTotal,
    expansionMultiplier: totalCards > 0 ? (projectedTotal / totalCards).toFixed(2) + 'x' : '1x',
    phaseBreakdown: phaseStats,
    results
  };
}

/**
 * Generate a Markdown report string from audit summary.
 * @param {object} auditSummary
 * @returns {string}
 */
export function generateMarkdownReport(auditSummary) {
  let md = `# Atomic Flashcard Audit & Decomposition Report\n\n`;
  md += `**Date**: ${auditSummary.timestamp.split('T')[0]} | **Audited Cards**: ${auditSummary.totalCards}\n\n`;
  md += `## 1. Executive Summary\n\n`;
  md += `| Métrica | Valor | Observação |\n`;
  md += `|---|---|---|\n`;
  md += `| **Total de Cartões Existentes** | ${auditSummary.totalCards} | Base inicial de flashcards |\n`;
  md += `| **Cartões 100% Atômicos** | ${auditSummary.atomicCount} (${auditSummary.atomicPercentage}) | Conformidade imediata com a Constituição |\n`;
  md += `| **Cartões Compostos Identificados** | ${auditSummary.compoundCount} (${auditSummary.compoundPercentage}) | Elegíveis para decomposição uniconceitual |\n`;
  md += `| **Projeção Total Pós-Decomposição** | ${auditSummary.projectedTotalCards} cards (${auditSummary.expansionMultiplier}) | Baralho final 100% uniconceitual |\n\n`;

  md += `## 2. Phase Breakdown\n\n`;
  md += `| Fase Curricular | Total Atual | Atômicos | Compostos | % Composto | Projeção Atômica |\n`;
  md += `|---|---|---|---|---|---|\n`;
  for (const [phase, stat] of Object.entries(auditSummary.phaseBreakdown)) {
    const compPct = stat.total > 0 ? ((stat.compound / stat.total) * 100).toFixed(0) + '%' : '0%';
    md += `| \`${phase}\` | ${stat.total} | ${stat.atomic} | ${stat.compound} | ${compPct} | **${stat.projected}** |\n`;
  }
  md += `\n`;

  md += `## 3. Detailed Decomposition Plan (Sample Compound Cards)\n\n`;
  const compoundCards = auditSummary.results.filter(r => !r.isAtomic);
  md += `Total de cartões compostos mapeados: **${compoundCards.length}**.\n\n`;

  for (const card of compoundCards.slice(0, 30)) {
    md += `### [${card.id}] ${card.title}\n`;
    md += `- **Caminho**: \`${card.relativePath}\`\n`;
    md += `- **Diagnóstico**: ${card.compoundReasons.join('; ')}\n`;
    md += `- **Pergunta Original**: *${card.cleanQuestion}*\n`;
    md += `- **Decomposição Proposta (${card.suggestedSplitCount} cards)**:\n`;
    card.proposedDecompositions.forEach((p, idx) => {
      md += `  ${idx + 1}. **\`${p.targetId}\`** - *${p.title}*\n`;
      md += `     - *Pergunta*: ${p.question}\n`;
      if (p.conceptBullet) {
        md += `     - *Foco*: ${p.conceptBullet}\n`;
      }
    });
    md += `\n`;
  }

  if (compoundCards.length > 30) {
    md += `\n*(... e mais ${compoundCards.length - 30} cartões mapeados no plano JSON completo)*\n`;
  }

  return md;
}

/**
 * Generate a JSON decomposition plan object.
 * @param {object} auditSummary
 * @returns {object}
 */
export function generateDecompositionPlan(auditSummary) {
  const plan = {
    version: '1.0.0',
    generated_at: auditSummary.timestamp,
    stats: {
      total_original_cards: auditSummary.totalCards,
      atomic_cards: auditSummary.atomicCount,
      compound_cards: auditSummary.compoundCount,
      projected_atomic_cards: auditSummary.projectedTotalCards
    },
    phases: {}
  };

  for (const card of auditSummary.results) {
    const p = card.phase || 'common';
    const mod = card.module || 'general';
    const sub = card.subtopic || 'core';

    if (!plan.phases[p]) plan.phases[p] = {};
    if (!plan.phases[p][mod]) plan.phases[p][mod] = {};
    if (!plan.phases[p][mod][sub]) plan.phases[p][mod][sub] = [];

    plan.phases[p][mod][sub].push({
      original_id: card.id,
      file_path: card.relativePath,
      is_atomic: card.isAtomic,
      compound_reasons: card.compoundReasons,
      suggested_splits: card.proposedDecompositions.map(d => ({
        target_id: d.targetId,
        title: d.title,
        question: d.question,
        level: d.level,
        tags: d.tags,
        concept: d.conceptBullet
      }))
    });
  }

  return plan;
}

/**
 * Print a visually rich summary to console.
 * @param {object} auditSummary
 * @param {boolean} verbose
 */
export function printConsoleSummary(auditSummary, verbose = false) {
  console.log('\n===============================================================');
  console.log('  🔬 FAANG ANKI - AUDITORIA DE ATOMICIDADE & DECOMPOSIÇÃO (US1) ');
  console.log('===============================================================\n');

  console.log(`📊 MÉTIRICAS GERAIS:`);
  console.log(`   - Total de Flashcards Analisados : ${auditSummary.totalCards}`);
  console.log(`   - Cartões 100% Atômicos          : ${auditSummary.atomicCount} (${auditSummary.atomicPercentage})`);
  console.log(`   - Cartões Compostos (A Dividir)  : ${auditSummary.compoundCount} (${auditSummary.compoundPercentage})`);
  console.log(`   - Projeção Pós-Decomposição      : ${auditSummary.projectedTotalCards} cartões (${auditSummary.expansionMultiplier})\n`);

  console.log('📁 DISTRIBUIÇÃO POR FASE CURRICULAR:');
  console.log('--------------------------------------------------------------------------------------');
  console.log('| Fase Curricular              | Total | Atômicos | Compostos | % Composto | Projeção |');
  console.log('--------------------------------------------------------------------------------------');

  for (const [phase, stat] of Object.entries(auditSummary.phaseBreakdown)) {
    const compPct = stat.total > 0 ? ((stat.compound / stat.total) * 100).toFixed(0) + '%' : '0%';
    const phaseName = phase.padEnd(28, ' ');
    const totalStr = String(stat.total).padStart(5, ' ');
    const atomicStr = String(stat.atomic).padStart(8, ' ');
    const compStr = String(stat.compound).padStart(9, ' ');
    const pctStr = compPct.padStart(10, ' ');
    const projStr = String(stat.projected).padStart(8, ' ');
    console.log(`| ${phaseName} | ${totalStr} | ${atomicStr} | ${compStr} | ${pctStr} | ${projStr} |`);
  }
  console.log('--------------------------------------------------------------------------------------\n');

  if (verbose) {
    const compoundCards = auditSummary.results.filter(r => !r.isAtomic);
    console.log(`🔍 DETALHES DE CARTÕES COMPOSTOS (${compoundCards.length} itens):`);
    compoundCards.forEach((c, idx) => {
      console.log(`\n[${idx + 1}/${compoundCards.length}] [${c.id}] ${c.title}`);
      console.log(`  Path: ${c.relativePath}`);
      console.log(`  Motivos: ${c.compoundReasons.join(' | ')}`);
      console.log(`  Decomposição Proposta (${c.suggestedSplitCount} cards):`);
      c.proposedDecompositions.forEach(p => {
        console.log(`    -> [${p.targetId}] ${p.question}`);
      });
    });
    console.log('');
  }
}

/**
 * CLI Handler.
 */
export async function runCli() {
  const args = process.argv.slice(2);
  const isJson = args.includes('--json');
  const isReport = args.includes('--report');
  const isAudit = args.includes('--audit') || (!isJson && !isReport);
  const isVerbose = args.includes('--verbose') || args.includes('-v');

  const deckArgIndex = args.indexOf('--deck');
  const phaseFilter = deckArgIndex !== -1 && args[deckArgIndex + 1] ? args[deckArgIndex + 1] : null;

  const outArgIndex = args.indexOf('--out');
  const outputPath = outArgIndex !== -1 && args[outArgIndex + 1] ? args[outArgIndex + 1] : null;

  const summary = auditAllCards({ phaseFilter });

  if (isJson) {
    const plan = generateDecompositionPlan(summary);
    const jsonStr = JSON.stringify(plan, null, 2);
    if (outputPath) {
      fs.writeFileSync(path.resolve(ROOT_DIR, outputPath), jsonStr, 'utf8');
      console.log(`✅ Plano JSON de decomposição salvo em: ${outputPath}`);
    } else {
      console.log(jsonStr);
    }
    return;
  }

  if (isReport) {
    const reportMd = generateMarkdownReport(summary);
    if (outputPath) {
      fs.writeFileSync(path.resolve(ROOT_DIR, outputPath), reportMd, 'utf8');
      console.log(`✅ Relatório Markdown de auditoria salvo em: ${outputPath}`);
    } else {
      console.log(reportMd);
    }
    return;
  }

  if (isAudit) {
    printConsoleSummary(summary, isVerbose);
  }
}

// Run CLI directly if executed from node
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli().catch(err => {
    console.error('❌ Erro na execução do auditor atômico:', err);
    process.exit(1);
  });
}
