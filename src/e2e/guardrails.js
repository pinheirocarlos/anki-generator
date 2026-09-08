/**
 * Guardrails and Layout Assertion Engine for E2E Flashcard Verification
 *
 * Implements strict DOM, CSS, Touch-Target, Video, KaTeX, and Syntax-Highlighting
 * guardrails conforming to Phase 1 Data Model and e2e-report.schema.json.
 */

import { MANDATORY_VIDEO_ATTRIBUTES as GENERATOR_VIDEO_ATTRS } from '../generator.js';

export const MANDATORY_VIDEO_ATTRIBUTES = Object.freeze(
  GENERATOR_VIDEO_ATTRS && GENERATOR_VIDEO_ATTRS.length > 0
    ? [...GENERATOR_VIDEO_ATTRS]
    : ['autoplay', 'loop', 'muted', 'playsinline', 'webkit-playsinline', 'disableRemotePlayback']
);

export const TOUCH_TARGET_MIN_HEIGHT = 44; // 44px minimum touch target requirement (SC-003)
export const MAX_DIFF_PIXEL_RATIO = 0.02;  // Maximum visual regression difference ratio

/**
 * Asserts 0% horizontal overflow inside the viewport (SC-001).
 * Inspects documentElement, body, and card container elements.
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @param {object} [options]
 * @param {string} [options.containerSelector] - Optional selector for card container
 * @param {number} [options.tolerance=0] - Pixel tolerance for subpixel rounding
 * @returns {Promise<{
 *   scrollWidth: number,
 *   clientWidth: number,
 *   windowInnerWidth: number,
 *   hasHorizontalOverflow: boolean,
 *   overflowAmount: number,
 *   overflowingElements: Array<{ tag: string, className: string, id: string, scrollWidth: number, clientWidth: number }>,
 *   passed: boolean,
 *   errors: string[]
 * }>}
 */
export async function assertHorizontalOverflow(page, options = {}) {
  const {
    containerSelector = '.card-container, .card, #qa',
    tolerance = 0,
    expectedViewportWidth = null
  } = options;

  const result = await page.evaluate(({ selector, tol, expWidth }) => {
    const docEl = document.documentElement;
    const body = document.body;
    const winWidth = window.innerWidth;

    const docScrollWidth = docEl ? docEl.scrollWidth : 0;
    const docClientWidth = docEl ? docEl.clientWidth : 0;
    const bodyScrollWidth = body ? body.scrollWidth : 0;
    const bodyClientWidth = body ? body.clientWidth : 0;

    // Check card container if present
    const container = document.querySelector(selector);
    const containerScrollWidth = container ? container.scrollWidth : 0;
    const containerClientWidth = container ? container.clientWidth : 0;

    const maxScrollWidth = Math.max(docScrollWidth, bodyScrollWidth, containerScrollWidth);
    const effectiveClientWidth = expWidth || docClientWidth || bodyClientWidth || winWidth;

    const hasScrollMismatch = maxScrollWidth > effectiveClientWidth + tol;
    const hasDocOverflow = docScrollWidth > effectiveClientWidth + tol;
    const hasBodyOverflow = bodyScrollWidth > effectiveClientWidth + tol;
    const hasContainerOverflow = container && containerScrollWidth > (containerClientWidth || effectiveClientWidth) + tol;
    const hasHorizontalOverflow = hasScrollMismatch || hasDocOverflow || hasBodyOverflow || hasContainerOverflow;

    // Find any specific child elements protruding horizontally
    const overflowingElements = [];
    if (hasHorizontalOverflow) {
      const allEls = document.querySelectorAll('*');
      for (const el of allEls) {
        const rect = el.getBoundingClientRect();
        if (rect.width > effectiveClientWidth + tol || rect.right > effectiveClientWidth + tol || el.scrollWidth > effectiveClientWidth + tol) {
          overflowingElements.push({
            tag: el.tagName.toLowerCase(),
            className: el.className ? String(el.className) : '',
            id: el.id || '',
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            rectRight: Math.round(rect.right),
            effectiveClientWidth
          });
        }
      }
    }

    return {
      scrollWidth: maxScrollWidth,
      clientWidth: effectiveClientWidth,
      windowInnerWidth: winWidth,
      hasHorizontalOverflow,
      overflowAmount: Math.max(0, maxScrollWidth - effectiveClientWidth),
      overflowingElements: overflowingElements.slice(0, 5) // Limit to top 5 culprits
    };
  }, { selector: containerSelector, tol: tolerance, expWidth: expectedViewportWidth });

  const errors = [];
  if (result.hasHorizontalOverflow) {
    const detail = result.overflowingElements.length > 0
      ? ` (Offending elements: ${result.overflowingElements.map(e => `<${e.tag} class="${e.className}">`).join(', ')})`
      : '';
    errors.push(
      `Horizontal overflow detected: scrollWidth (${result.scrollWidth}px) exceeds clientWidth (${result.clientWidth}px) by ${result.overflowAmount}px${detail}`
    );
  }

  return {
    ...result,
    passed: !result.hasHorizontalOverflow,
    errors
  };
}

/**
 * Asserts touch target geometry for accordion `<details><summary>` elements (SC-003).
 * Ensures touch targets have a bounding height >= 44px.
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @param {object} [options]
 * @param {number} [options.minHeight=TOUCH_TARGET_MIN_HEIGHT]
 * @param {string} [options.selector='details summary, summary']
 * @returns {Promise<{
 *   summaryCount: number,
 *   summaryTouchTargetHeight?: number,
 *   summaries: Array<{ text: string, height: number, width: number, passed: boolean }>,
 *   passed: boolean,
 *   errors: string[]
 * }>}
 */
export async function assertTouchTargets(page, options = {}) {
  const {
    minHeight = TOUCH_TARGET_MIN_HEIGHT,
    selector = 'details summary, summary'
  } = options;

  const data = await page.evaluate(({ sel, minH }) => {
    const summaryEls = Array.from(document.querySelectorAll(sel));
    if (summaryEls.length === 0) {
      return {
        summaryCount: 0,
        summaryTouchTargetHeight: undefined,
        summaries: []
      };
    }

    const summaries = summaryEls.map(el => {
      const rect = el.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(el);
      const minHeightStyle = parseFloat(computedStyle.minHeight) || 0;
      const effectiveHeight = Math.max(rect.height, minHeightStyle);
      return {
        text: (el.textContent || '').trim().slice(0, 60),
        height: Math.round(effectiveHeight * 100) / 100,
        width: Math.round(rect.width * 100) / 100,
        passed: effectiveHeight >= minH - 0.5 // 0.5px rounding tolerance
      };
    });

    const minFoundHeight = summaries.reduce((min, s) => Math.min(min, s.height), Infinity);

    return {
      summaryCount: summaries.length,
      summaryTouchTargetHeight: minFoundHeight === Infinity ? undefined : minFoundHeight,
      summaries
    };
  }, { sel: selector, minH: minHeight });

  const errors = [];
  for (const s of data.summaries) {
    if (!s.passed) {
      errors.push(
        `Touch target height for summary "${s.text}" is ${s.height}px, which is below the required minimum of ${minHeight}px (SC-003)`
      );
    }
  }

  return {
    ...data,
    passed: errors.length === 0,
    errors
  };
}

/**
 * Asserts zero KaTeX rendering errors (`.katex-error`) on the page (SC-002, Principle V).
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @returns {Promise<{
 *   katexErrorCount: number,
 *   katexErrors: string[],
 *   passed: boolean,
 *   errors: string[]
 * }>}
 */
export async function assertKatexErrors(page) {
  const data = await page.evaluate(() => {
    const errorEls = Array.from(document.querySelectorAll('.katex-error'));
    const katexErrors = errorEls.map(el => (el.textContent || el.getAttribute('title') || '').trim());
    return {
      katexErrorCount: errorEls.length,
      katexErrors
    };
  });

  const errors = [];
  if (data.katexErrorCount > 0) {
    errors.push(
      `Found ${data.katexErrorCount} KaTeX formula rendering error(s): ${data.katexErrors.join('; ')}`
    );
  }

  return {
    ...data,
    passed: data.katexErrorCount === 0,
    errors
  };
}

/**
 * Asserts SVG rendering integrity and detects corrupted/leaked SVG elements (SC-002, Principle II).
 * Validates:
 * 1. SVGs render with valid non-zero dimensions (width > 0, height > 0).
 * 2. SVGs contain graphical child nodes (rect, circle, path, text, g, line, etc.).
 * 3. SVGs do not contain nested <pre> or <code> blocks.
 * 4. No <pre><code ...> block on the page contains leaked raw SVG diagram markup.
 * 5. If requireSvg is true, asserts that at least one SVG is rendered.
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @param {object} [options]
 * @param {boolean} [options.requireSvg=false] - Whether to require at least one SVG element
 * @returns {Promise<{
 *   svgElementCount: number,
 *   svgs: Array<{ index: number, width: number, height: number, childCount: number, hasNestedCode: boolean, passed: boolean }>,
 *   leakedSvgInCodeBlocks: boolean,
 *   passed: boolean,
 *   errors: string[]
 * }>}
 */
export async function assertSvgIntegrity(page, options = {}) {
  const { requireSvg = false } = options;

  const data = await page.evaluate((reqSvg) => {
    const svgEls = Array.from(document.querySelectorAll('svg'));
    const svgDetails = [];
    const errors = [];

    // 1. Inspect all SVGs on page
    for (let i = 0; i < svgEls.length; i++) {
      const svg = svgEls[i];
      const rect = svg.getBoundingClientRect();
      const graphicChildren = svg.querySelectorAll('rect, circle, ellipse, path, polygon, polyline, line, text, g, use, image');
      const nestedPreCode = svg.querySelectorAll('pre, code');

      const width = Math.round(rect.width * 100) / 100;
      const height = Math.round(rect.height * 100) / 100;
      const hasNestedCode = nestedPreCode.length > 0;
      const hasGraphicContent = graphicChildren.length > 0;

      if (width <= 0 || height <= 0) {
        errors.push(`SVG #${i + 1} has invalid dimensions (${width}px x ${height}px)`);
      }
      if (!hasGraphicContent) {
        errors.push(`SVG #${i + 1} contains no graphical child elements (empty/corrupted SVG)`);
      }
      if (hasNestedCode) {
        errors.push(`SVG #${i + 1} contains nested <pre>/<code> elements caused by markdown parser corruption`);
      }

      svgDetails.push({
        index: i + 1,
        width,
        height,
        childCount: graphicChildren.length,
        hasNestedCode,
        passed: width > 0 && height > 0 && hasGraphicContent && !hasNestedCode
      });
    }

    if (reqSvg && svgEls.length === 0) {
      errors.push('Card is expected to render a responsive SVG diagram, but no <svg> element was found in the DOM');
    }

    // 2. Check for leaked raw SVG tags inside <pre><code> blocks
    const codeBlocks = Array.from(document.querySelectorAll('pre code, code.hljs'));
    let leakedSvgInCodeBlocks = false;
    const svgLeakRegex = /(?:<rect\s+[^>]*\b(?:x|y|width|height|fill|stroke)=|<circle\s+[^>]*\b(?:cx|cy|r)=|<path\s+[^>]*\bd=|<g\s+[^>]*\b(?:transform|fill|stroke)=|<svg\s+[^>]*\bviewBox=)/i;

    for (let i = 0; i < codeBlocks.length; i++) {
      const block = codeBlocks[i];
      const html = block.innerHTML || '';
      const text = block.textContent || '';
      if (svgLeakRegex.test(html) || svgLeakRegex.test(text)) {
        leakedSvgInCodeBlocks = true;
        errors.push(`Code block #${i + 1} contains raw leaked SVG diagram XML tags instead of clean programming code`);
      }
    }

    return {
      svgElementCount: svgEls.length,
      svgs: svgDetails,
      leakedSvgInCodeBlocks,
      errors
    };
  }, requireSvg);

  return {
    ...data,
    passed: data.errors.length === 0,
    errors: data.errors
  };
}

/**
 * Asserts image rendering integrity across cards.
 * Validates that all <img> elements load successfully without error,
 * have non-zero natural dimensions when complete, and have valid non-empty src attributes.
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @param {object} [options]
 * @param {boolean} [options.requireImage=false] - Whether to require at least one image element
 * @returns {Promise<{
 *   imageCount: number,
 *   brokenImages: Array<{ index: number, src: string, reason: string }>,
 *   passed: boolean,
 *   errors: string[]
 * }>}
 */
export async function assertImageIntegrity(page, options = {}) {
  const { requireImage = false } = options;

  const data = await page.evaluate((reqImg) => {
    const imgEls = Array.from(document.querySelectorAll('img'));
    if (imgEls.length === 0) {
      return {
        imageCount: 0,
        brokenImages: [],
        requiredImageMissing: reqImg
      };
    }

    const broken = [];
    for (let i = 0; i < imgEls.length; i++) {
      const img = imgEls[i];
      const src = img.getAttribute('src') || '';
      if (!src) {
        broken.push({ index: i + 1, src: '', reason: 'Empty src attribute' });
      } else if (img.complete && img.naturalWidth === 0) {
        broken.push({ index: i + 1, src, reason: 'Image failed to load (naturalWidth === 0)' });
      }
    }

    return {
      imageCount: imgEls.length,
      brokenImages: broken,
      requiredImageMissing: false
    };
  }, requireImage);

  const errors = [];
  if (data.requiredImageMissing) {
    errors.push('Card is expected to render an image, but no <img> element was found in the DOM');
  }
  for (const b of data.brokenImages) {
    errors.push(`Image #${b.index} (${b.src}): ${b.reason}`);
  }

  return {
    ...data,
    passed: errors.length === 0,
    errors
  };
}

/**
 * Asserts that all `<video>` elements contain mandatory mobile playback flags (Principle I).
 * Required: autoplay, loop, muted, playsinline, webkit-playsinline, disableRemotePlayback.
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @param {object} [options]
 * @param {string[]} [options.requiredAttributes=MANDATORY_VIDEO_ATTRIBUTES]
 * @param {boolean} [options.requireVideo=false] - Whether to require at least one video element
 * @returns {Promise<{
 *   videoElementCount: number,
 *   videoMissingAttributes: string[],
 *   videos: Array<{ src: string, missing: string[], attributes: string[] }>,
 *   passed: boolean,
 *   errors: string[]
 * }>}
 */
export async function assertVideoAttributes(page, options = {}) {
  const {
    requiredAttributes = MANDATORY_VIDEO_ATTRIBUTES,
    requireVideo = false
  } = options;

  const data = await page.evaluate(({ reqAttrs, reqVid }) => {
    const videoEls = Array.from(document.querySelectorAll('video'));
    if (videoEls.length === 0) {
      return {
        videoElementCount: 0,
        videoMissingAttributes: [],
        videos: [],
        requiredVideoMissing: reqVid
      };
    }

    const allMissing = new Set();
    const videos = videoEls.map(v => {
      const src = v.getAttribute('src') || v.querySelector('source')?.getAttribute('src') || 'inline';
      const missing = [];
      const present = [];

      for (const attr of reqAttrs) {
        const hasAttr = v.hasAttribute(attr) ||
          (attr === 'playsinline' && v.hasAttribute('playsinline')) ||
          (attr === 'webkit-playsinline' && v.hasAttribute('webkit-playsinline')) ||
          (attr === 'muted' && (v.muted || v.hasAttribute('muted'))) ||
          (attr === 'autoplay' && (v.autoplay || v.hasAttribute('autoplay'))) ||
          (attr === 'loop' && (v.loop || v.hasAttribute('loop')));

        if (hasAttr) {
          present.push(attr);
        } else {
          missing.push(attr);
          allMissing.add(attr);
        }
      }

      return {
        src,
        missing,
        attributes: present
      };
    });

    return {
      videoElementCount: videos.length,
      videoMissingAttributes: Array.from(allMissing),
      videos,
      requiredVideoMissing: false
    };
  }, { reqAttrs: requiredAttributes, reqVid: requireVideo });

  const errors = [];
  if (data.requiredVideoMissing) {
    errors.push('Card is expected to render a micro-video, but no <video> element was found in the DOM');
  }
  if (data.videoMissingAttributes.length > 0) {
    for (const v of data.videos) {
      if (v.missing.length > 0) {
        errors.push(
          `Video element (${v.src}) is missing mandatory mobile playback attributes: [${v.missing.join(', ')}]`
        );
      }
    }
  }

  return {
    ...data,
    passed: errors.length === 0,
    errors
  };
}

/**
 * Asserts that code blocks contain Dark Modern syntax-highlighting tokens (Principle III).
 * If `<pre><code>` blocks exist, at least one syntax highlight token must be present.
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @returns {Promise<{
 *   codeBlockCount: number,
 *   highlightJsTokensFound: number,
 *   passed: boolean,
 *   errors: string[]
 * }>}
 */
export async function assertCodeHighlighting(page) {
  const data = await page.evaluate(() => {
    const codeBlocks = Array.from(document.querySelectorAll('pre code, code.hljs'));
    if (codeBlocks.length === 0) {
      return {
        codeBlockCount: 0,
        highlightJsTokensFound: 0
      };
    }

    // Filter out plaintext blocks (text, txt, plaintext, output)
    const programmingCodeBlocks = codeBlocks.filter(block => {
      const className = block.className || '';
      return !className.includes('language-text') &&
             !className.includes('language-plaintext') &&
             !className.includes('language-txt') &&
             !className.includes('language-output');
    });

    if (programmingCodeBlocks.length === 0) {
      return {
        codeBlockCount: 0,
        highlightJsTokensFound: 0
      };
    }

    // Count all syntax-highlight token spans
    const tokenSpans = document.querySelectorAll(
      'pre code span[class*="hljs-"], code.hljs span[class*="hljs-"], pre code span[class*="token"]'
    );

    return {
      codeBlockCount: programmingCodeBlocks.length,
      highlightJsTokensFound: tokenSpans.length
    };
  });

  const errors = [];
  if (data.codeBlockCount > 0 && data.highlightJsTokensFound === 0) {
    errors.push(
      `Found ${data.codeBlockCount} code block(s) with 0 syntax-highlighted tokens (missing highlight.js tokenization)`
    );
  }

  return {
    ...data,
    passed: errors.length === 0,
    errors
  };
}

/**
 * Asserts accordion `<details><summary>` toggle interaction without layout collapse or overflow.
 * Clicks the summary element, confirms `open` state toggling, and checks post-toggle overflow.
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @param {object} [options]
 * @param {string} [options.selector='details summary, summary']
 * @param {number} [options.expectedViewportWidth]
 * @returns {Promise<{
 *   accordionCount: number,
 *   toggledSuccessfully: boolean,
 *   passed: boolean,
 *   errors: string[]
 * }>}
 */
export async function assertAccordionInteraction(page, options = {}) {
  const {
    selector = 'details summary, summary',
    expectedViewportWidth = null
  } = options;

  const count = await page.locator(selector).count();
  if (count === 0) {
    return {
      accordionCount: 0,
      toggledSuccessfully: true,
      passed: true,
      errors: []
    };
  }

  const errors = [];
  let toggledCount = 0;

  for (let i = 0; i < count; i++) {
    const summary = page.locator(selector).nth(i);
    try {
      // Check initial state
      const details = summary.locator('xpath=..');
      const wasOpen = await details.evaluate(el => el.hasAttribute('open'));

      // Click summary to toggle
      await summary.click();

      // Check toggled state
      const isNowOpen = await details.evaluate(el => el.hasAttribute('open'));
      if (isNowOpen === wasOpen) {
        errors.push(`Accordion #${i + 1} did not toggle 'open' state upon click`);
      } else {
        toggledCount++;
      }

      // Check overflow after toggle
      const overflowResult = await assertHorizontalOverflow(page, {
        expectedViewportWidth
      });
      if (!overflowResult.passed) {
        errors.push(...overflowResult.errors.map(err => `Post-accordion-expansion: ${err}`));
      }

      // Restore original state if we toggled it open
      if (!wasOpen && isNowOpen) {
        await summary.click();
      }
    } catch (err) {
      errors.push(`Error interacting with accordion #${i + 1}: ${err.message}`);
    }
  }

  return {
    accordionCount: count,
    toggledSuccessfully: errors.length === 0 && toggledCount === count,
    passed: errors.length === 0,
    errors
  };
}

/**
 * Executes the complete set of visual, DOM, and layout guardrails on the active card page.
 * Compiles metrics conforming strictly to CardVisualAssertionResult and e2e-report.schema.json.
 *
 * @param {import('@playwright/test').Page} page - Playwright Page instance
 * @param {object} context
 * @param {string} context.cardId - Canonical Card ID (e.g. "CS-ARCH-CACHE-001")
 * @param {"front"|"back"} context.side - Card side under evaluation
 * @param {object} [context.viewport] - Active ViewportProfile object
 * @param {string} [context.viewport.name='mobile-small']
 * @param {number} [context.viewport.width=360]
 * @param {number} [context.viewport.height=640]
 * @param {boolean} [context.viewport.isMobile=true]
 * @param {object} [context.options] - Custom guardrail thresholds or toggles
 * @param {boolean} [context.options.testAccordion=true] - Whether to test accordion click interaction
 * @param {boolean} [context.options.requireSvg=false] - Whether to require responsive SVG
 * @param {boolean} [context.options.requireVideo=false] - Whether to require micro-video
 * @param {number} [context.options.visualDiffRatio] - Optional visual diff ratio from snapshot comparison
 * @param {string} [context.screenshotPath] - Optional path to saved screenshot artifact
 * @returns {Promise<{
 *   cardId: string,
 *   viewport: { name: string, width: number, height: number, isMobile?: boolean },
 *   side: "front" | "back",
 *   passed: boolean,
 *   metrics: {
 *     scrollWidth: number,
 *     clientWidth: number,
 *     hasHorizontalOverflow: boolean,
 *     summaryTouchTargetHeight?: number,
 *     katexErrorCount: number,
 *     svgElementCount: number,
 *     videoElementCount: number,
 *     videoMissingAttributes: string[],
 *     highlightJsTokensFound: number,
 *     visualDiffRatio?: number
 *   },
 *   screenshotPath?: string,
 *   errors: string[]
 * }>}
 */
export async function runCardGuardrails(page, context) {
  const {
    cardId = 'UNKNOWN_CARD',
    side = 'front',
    viewport = { name: 'mobile-small', width: 360, height: 640, isMobile: true },
    options = {},
    screenshotPath
  } = context;

  const {
    testAccordion = (side === 'back'),
    requireSvg = false,
    requireVideo = false,
    requireImage = false,
    visualDiffRatio
  } = options;

  const allErrors = [];

  // 1. Horizontal Overflow Guardrail (SC-001)
  const overflowRes = await assertHorizontalOverflow(page, {
    expectedViewportWidth: viewport?.width,
    ...options
  });
  allErrors.push(...overflowRes.errors);

  // 2. Touch Target Guardrail (SC-003)
  const touchRes = await assertTouchTargets(page);
  allErrors.push(...touchRes.errors);

  // 3. KaTeX Errors Guardrail (SC-002)
  const katexRes = await assertKatexErrors(page);
  allErrors.push(...katexRes.errors);

  // 4. SVG Rendering & Leakage Guardrail (SC-002, Principle II)
  const svgRes = await assertSvgIntegrity(page, { requireSvg });
  allErrors.push(...svgRes.errors);

  // 5. Image & Animated GIF Integrity Guardrail
  const imageRes = await assertImageIntegrity(page, { requireImage });
  allErrors.push(...imageRes.errors);

  // 6. Video Attributes Guardrail (Principle I)
  const videoRes = await assertVideoAttributes(page, { requireVideo });
  allErrors.push(...videoRes.errors);

  // 7. Code Highlighting Guardrail (Principle III)
  const codeRes = await assertCodeHighlighting(page);
  allErrors.push(...codeRes.errors);

  // 8. Accordion Interactive Toggle (if requested and details present)
  if (testAccordion && touchRes.summaryCount > 0) {
    const accordionRes = await assertAccordionInteraction(page, {
      expectedViewportWidth: viewport?.width
    });
    allErrors.push(...accordionRes.errors);
  }

  // 9. Visual Diff Ratio check (if provided)
  if (typeof visualDiffRatio === 'number' && visualDiffRatio > MAX_DIFF_PIXEL_RATIO) {
    allErrors.push(
      `Visual regression diff ratio ${visualDiffRatio} exceeds maximum allowed threshold of ${MAX_DIFF_PIXEL_RATIO}`
    );
  }

  const metrics = {
    scrollWidth: overflowRes.scrollWidth,
    clientWidth: overflowRes.clientWidth,
    hasHorizontalOverflow: overflowRes.hasHorizontalOverflow,
    katexErrorCount: katexRes.katexErrorCount,
    svgElementCount: svgRes.svgElementCount,
    imageElementCount: imageRes.imageCount,
    videoMissingAttributes: videoRes.videoMissingAttributes,
    videoElementCount: videoRes.videoElementCount,
    highlightJsTokensFound: codeRes.highlightJsTokensFound
  };

  if (typeof touchRes.summaryTouchTargetHeight === 'number') {
    metrics.summaryTouchTargetHeight = touchRes.summaryTouchTargetHeight;
  }

  if (typeof visualDiffRatio === 'number') {
    metrics.visualDiffRatio = visualDiffRatio;
  }

  const result = {
    cardId,
    viewport: {
      name: viewport.name || 'mobile-small',
      width: viewport.width || 360,
      height: viewport.height || 640,
      isMobile: !!viewport.isMobile
    },
    side,
    passed: allErrors.length === 0,
    metrics,
    errors: allErrors
  };

  if (screenshotPath) {
    result.screenshotPath = screenshotPath;
  }

  return result;
}
