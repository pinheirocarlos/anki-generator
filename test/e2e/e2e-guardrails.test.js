/**
 * Playwright Visual Regression & Layout Guardrails Test Spec (Task T014)
 *
 * Validates:
 * - 0% Horizontal Overflow across mobile (360x640, 390x844) & desktop (1280x720) viewports (SC-001)
 * - 100% Visual Element Integrity (Videos, SVGs, Tables, Code, KaTeX) (SC-002)
 * - Touch-Target >= 44px on <details><summary> accordions & smooth toggle (SC-003)
 * - Visual Snapshot Diffing against golden baselines (SC-006)
 *
 * Conforming to:
 * - specs/004-ankiweb-e2e-automation/spec.md (User Story 2)
 * - specs/004-ankiweb-e2e-automation/data-model.md
 * - playwright.config.js
 */

import { test, expect } from '@playwright/test';
import { sampleSanityDeck } from '../../src/e2e/sanity-sampler.js';
import { renderCard } from '../../src/generator.js';
import {
  assertHorizontalOverflow,
  assertTouchTargets,
  assertKatexErrors,
  assertSvgIntegrity,
  assertVideoAttributes,
  assertCodeHighlighting,
  assertAccordionInteraction,
  runCardGuardrails,
  TOUCH_TARGET_MIN_HEIGHT
} from '../../src/e2e/guardrails.js';

// Dynamically sample the sanity deck cards covering all 8 required typologies
const { manifest, sampledCards } = sampleSanityDeck();

test.describe('E2E Visual Layout Guardrails & Regression Suite (User Story 2)', () => {

  test.describe('1. Universal Responsive Layout & DOM Guardrails', () => {
    for (const card of sampledCards) {
      test.describe(`Card [${card.id}] (${card.phase} / ${card.subtopic})`, () => {
        const rendered = renderCard(card.filePath, { resolveLocalMedia: true });

        test('Front View: 0% Horizontal Overflow & DOM Guardrails', async ({ page }, testInfo) => {
          const viewport = page.viewportSize();
          await page.setContent(rendered.frontDocument, { waitUntil: 'domcontentloaded' });

          // 1. Assert zero horizontal overflow (SC-001)
          const overflowResult = await assertHorizontalOverflow(page, {
            expectedViewportWidth: viewport?.width
          });
          expect(
            overflowResult.passed,
            `Horizontal overflow on Front of ${card.id} at ${viewport?.width}px:\n${overflowResult.errors.join('\n')}`
          ).toBe(true);

          // 2. Assert zero KaTeX formula rendering errors (SC-002)
          const katexResult = await assertKatexErrors(page);
          expect(
            katexResult.passed,
            `KaTeX rendering error on Front of ${card.id}:\n${katexResult.errors.join('\n')}`
          ).toBe(true);

          // 3. Assert SVG integrity and zero leaked XML code blocks (SC-002, Principle II)
          const svgResult = await assertSvgIntegrity(page);
          expect(
            svgResult.passed,
            `SVG rendering or leakage error on Front of ${card.id}:\n${svgResult.errors.join('\n')}`
          ).toBe(true);

          // 4. Assert video attributes if video present on Front
          const videoResult = await assertVideoAttributes(page);
          expect(
            videoResult.passed,
            `Video playback attributes missing on Front of ${card.id}:\n${videoResult.errors.join('\n')}`
          ).toBe(true);

          // 5. Assert code syntax highlighting if code present on Front
          const codeResult = await assertCodeHighlighting(page);
          expect(
            codeResult.passed,
            `Code block syntax highlighting missing on Front of ${card.id}:\n${codeResult.errors.join('\n')}`
          ).toBe(true);

          // 6. Run full guardrail aggregator
          const guardrailResult = await runCardGuardrails(page, {
            cardId: card.id,
            side: 'front',
            viewport: {
              name: testInfo.project.name,
              width: viewport?.width || 360,
              height: viewport?.height || 640,
              isMobile: testInfo.project.use.isMobile
            }
          });
          expect(
            guardrailResult.passed,
            `runCardGuardrails failed on Front of ${card.id}:\n${guardrailResult.errors.join('\n')}`
          ).toBe(true);
        });

        test('Back View: 0% Overflow, Touch Targets >= 44px, Video & Code Guardrails', async ({ page }, testInfo) => {
          const viewport = page.viewportSize();
          await page.setContent(rendered.backDocument, { waitUntil: 'domcontentloaded' });

          // 1. Assert zero horizontal overflow (SC-001)
          const overflowResult = await assertHorizontalOverflow(page, {
            expectedViewportWidth: viewport?.width
          });
          expect(
            overflowResult.passed,
            `Horizontal overflow on Back of ${card.id} at ${viewport?.width}px:\n${overflowResult.errors.join('\n')}`
          ).toBe(true);

          // 2. Assert Touch Target height >= 44px for accordion summaries (SC-003)
          const touchResult = await assertTouchTargets(page, {
            minHeight: TOUCH_TARGET_MIN_HEIGHT
          });
          expect(
            touchResult.passed,
            `Touch target height below 44px on Back of ${card.id}:\n${touchResult.errors.join('\n')}`
          ).toBe(true);

          // 3. Assert zero KaTeX rendering errors (SC-002)
          const katexResult = await assertKatexErrors(page);
          expect(
            katexResult.passed,
            `KaTeX rendering error on Back of ${card.id}:\n${katexResult.errors.join('\n')}`
          ).toBe(true);

          // 4. Assert SVG rendering integrity and zero leaked XML code blocks (SC-002, Principle II)
          const svgResult = await assertSvgIntegrity(page);
          expect(
            svgResult.passed,
            `SVG rendering or leakage error on Back of ${card.id}:\n${svgResult.errors.join('\n')}`
          ).toBe(true);

          // 5. Assert video playback attributes (Principle I)
          const videoResult = await assertVideoAttributes(page);
          expect(
            videoResult.passed,
            `Video playback attributes missing on Back of ${card.id}:\n${videoResult.errors.join('\n')}`
          ).toBe(true);

          // 6. Assert code syntax highlighting (Principle III)
          const codeResult = await assertCodeHighlighting(page);
          expect(
            codeResult.passed,
            `Code block syntax highlighting missing on Back of ${card.id}:\n${codeResult.errors.join('\n')}`
          ).toBe(true);

          // 7. Assert accordion interactive toggle & layout stability
          const accordionResult = await assertAccordionInteraction(page);
          expect(
            accordionResult.passed,
            `Accordion toggle failed or induced overflow on Back of ${card.id}:\n${accordionResult.errors.join('\n')}`
          ).toBe(true);

          // 8. Run full guardrail aggregator
          const guardrailResult = await runCardGuardrails(page, {
            cardId: card.id,
            side: 'back',
            viewport: {
              name: testInfo.project.name,
              width: viewport?.width || 360,
              height: viewport?.height || 640,
              isMobile: testInfo.project.use.isMobile
            },
            options: { testAccordion: true }
          });
          expect(
            guardrailResult.passed,
            `runCardGuardrails failed on Back of ${card.id}:\n${guardrailResult.errors.join('\n')}`
          ).toBe(true);
        });
      });
    }
  });

  test.describe('2. Visual Snapshot Regression Diffing against Baselines (SC-006)', () => {
    for (const card of sampledCards) {
      test(`Visual Snapshot: Front of [${card.id}]`, async ({ page }) => {
        const rendered = renderCard(card.filePath, { resolveLocalMedia: true });
        await page.setContent(rendered.frontDocument, { waitUntil: 'domcontentloaded' });

        const cardContainer = page.locator('.card-container');
        await expect(cardContainer).toBeVisible();

        // Compare card container snapshot against golden baseline
        await expect(cardContainer).toHaveScreenshot(`${card.id}-front.png`, {
          maxDiffPixelRatio: 0.02,
          threshold: 0.2
        });
      });

      test(`Visual Snapshot: Back of [${card.id}]`, async ({ page }) => {
        const rendered = renderCard(card.filePath, { resolveLocalMedia: true });
        await page.setContent(rendered.backDocument, { waitUntil: 'domcontentloaded' });

        const cardContainer = page.locator('.card-container');
        await expect(cardContainer).toBeVisible();

        // Compare card container snapshot against golden baseline
        await expect(cardContainer).toHaveScreenshot(`${card.id}-back.png`, {
          maxDiffPixelRatio: 0.02,
          threshold: 0.2
        });
      });
    }
  });

  test.describe('3. Specific Typology & Pedagogical Guardrail Checks', () => {
    test('100% Typology Coverage in Sanity Deck Manifest', async () => {
      expect(manifest.totalCards).toBeGreaterThanOrEqual(6);
      expect(Object.keys(manifest.coverageMatrix).length).toBe(8);

      for (const [typology, cardId] of Object.entries(manifest.coverageMatrix)) {
        expect(cardId, `Missing card for typology ${typology}`).toBeTruthy();
      }
    });

    test('L2 Fundamental cards contain senior badge & clear question', async ({ page }) => {
      const l2CardId = manifest.coverageMatrix.L2_FUNDAMENTAL;
      const card = sampledCards.find(c => c.id === l2CardId);
      expect(card).toBeDefined();

      const rendered = renderCard(card.filePath);
      await page.setContent(rendered.frontDocument, { waitUntil: 'domcontentloaded' });

      const levelTag = page.locator('.tag-level-l2, .tag:has-text("level::l2-fundamental")');
      await expect(levelTag.first()).toBeVisible();
    });

    test('L3 Junior cards contain complexity badges & level tag', async ({ page }) => {
      const l3CardId = manifest.coverageMatrix.L3_JUNIOR;
      const card = sampledCards.find(c => c.id === l3CardId);
      expect(card).toBeDefined();

      const rendered = renderCard(card.filePath);
      await page.setContent(rendered.frontDocument, { waitUntil: 'domcontentloaded' });

      const levelTag = page.locator('.tag-level-l3, .tag:has-text("level::l3-junior")');
      await expect(levelTag.first()).toBeVisible();
    });

    test('L4 Pleno Code cards contain syntax highlighted pre code blocks', async ({ page }) => {
      const l4CardId = manifest.coverageMatrix.L4_PLENO_CODE;
      const card = sampledCards.find(c => c.id === l4CardId);
      expect(card).toBeDefined();

      const rendered = renderCard(card.filePath);
      await page.setContent(rendered.backDocument, { waitUntil: 'domcontentloaded' });

      const codeTokens = page.locator('pre code span[class*="hljs-"]');
      const tokenCount = await codeTokens.count();
      expect(tokenCount).toBeGreaterThan(0);
    });

    test('Details Accordion has fat-finger touch area >= 44px', async ({ page }) => {
      const accordionCardId = manifest.coverageMatrix.DETAILS_ACCORDION;
      const card = sampledCards.find(c => c.id === accordionCardId);
      expect(card).toBeDefined();

      const rendered = renderCard(card.filePath);
      await page.setContent(rendered.backDocument, { waitUntil: 'domcontentloaded' });

      const summary = page.locator('details summary').first();
      await expect(summary).toBeVisible();

      const box = await summary.boundingBox();
      expect(box).not.toBeNull();
      expect(box.height).toBeGreaterThanOrEqual(43.5); // 44px with subpixel rounding tolerance
    });

    test('KaTeX Math formulas render cleanly without .katex-error class', async ({ page }) => {
      const katexCardId = manifest.coverageMatrix.KATEX_MATH;
      const card = sampledCards.find(c => c.id === katexCardId);
      expect(card).toBeDefined();

      const rendered = renderCard(card.filePath);
      await page.setContent(rendered.backDocument, { waitUntil: 'domcontentloaded' });

      const katexElements = page.locator('.katex');
      const katexCount = await katexElements.count();
      expect(katexCount).toBeGreaterThan(0);

      const katexErrors = page.locator('.katex-error');
      expect(await katexErrors.count()).toBe(0);
    });

    test('Responsive SVG cards render valid SVG graphics without XML code leaking', async ({ page }) => {
      const svgCardId = manifest.coverageMatrix.RESPONSIVE_SVG;
      const card = sampledCards.find(c => c.id === svgCardId);
      expect(card).toBeDefined();

      const rendered = renderCard(card.filePath, { resolveLocalMedia: true });
      await page.setContent(rendered.backDocument, { waitUntil: 'domcontentloaded' });

      const svgResult = await assertSvgIntegrity(page, { requireSvg: true });
      expect(svgResult.passed, `Responsive SVG integrity failed on ${svgCardId}:\n${svgResult.errors.join('\n')}`).toBe(true);
      expect(svgResult.svgElementCount).toBeGreaterThanOrEqual(1);
      expect(svgResult.leakedSvgInCodeBlocks).toBe(false);
    });
  });
});
