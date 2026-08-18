import fs from 'fs';
import path from 'path';

/**
 * Crawls and extracts media references from card markdown content,
 * reads binary buffers for Anki export, and rewrites markdown image links
 * to flat Anki media references.
 *
 * @param {string} cardFilePath - Absolute or relative path to the markdown card file
 * @param {string} rawMarkdown - Card markdown content
 * @returns {{ rewrittenMarkdown: string, mediaFiles: Array<{ filename: string, data: Buffer, sourcePath: string }> }}
 */
export function resolveMedia(cardFilePath, rawMarkdown) {
  const cardDir = path.dirname(cardFilePath);
  const mediaFiles = [];
  const registeredFilenames = new Set();

  let rewrittenMarkdown = rawMarkdown;

  // 1. Match Markdown images: ![alt](assets/foo.png) or ![](assets/foo.svg)
  const mdImgRegex = /!\[([^\]]*)\]\((assets\/[^)]+)\)/g;
  rewrittenMarkdown = rewrittenMarkdown.replace(mdImgRegex, (match, alt, relPath) => {
    const fullAssetPath = path.resolve(cardDir, relPath);
    const filename = path.basename(relPath);

    if (fs.existsSync(fullAssetPath)) {
      if (!registeredFilenames.has(filename)) {
        registeredFilenames.add(filename);
        mediaFiles.push({
          filename,
          data: fs.readFileSync(fullAssetPath),
          sourcePath: fullAssetPath
        });
      }
      return `![${alt}](${filename})`;
    }
    return match;
  });

  // 2. Match HTML images: <img src="assets/foo.png" ...>
  const htmlImgRegex = /<img\s+([^>]*?)src=["'](assets\/[^"']+)["']([^>]*)>/gi;
  rewrittenMarkdown = rewrittenMarkdown.replace(htmlImgRegex, (match, before, relPath, after) => {
    const fullAssetPath = path.resolve(cardDir, relPath);
    const filename = path.basename(relPath);

    if (fs.existsSync(fullAssetPath)) {
      if (!registeredFilenames.has(filename)) {
        registeredFilenames.add(filename);
        mediaFiles.push({
          filename,
          data: fs.readFileSync(fullAssetPath),
          sourcePath: fullAssetPath
        });
      }
      return `<img ${before}src="${filename}"${after}>`;
    }
    return match;
  });

  // 3. Match HTML videos & sources: <video src="assets/foo.mp4" ...> or <source src="assets/foo.mp4" ...>
  const videoSrcRegex = /<(video|source)\s+([^>]*?)src=["'](assets\/[^"']+)["']([^>]*)>/gi;
  rewrittenMarkdown = rewrittenMarkdown.replace(videoSrcRegex, (match, tag, before, relPath, after) => {
    const fullAssetPath = path.resolve(cardDir, relPath);
    const filename = path.basename(relPath);

    if (fs.existsSync(fullAssetPath)) {
      if (!registeredFilenames.has(filename)) {
        registeredFilenames.add(filename);
        mediaFiles.push({
          filename,
          data: fs.readFileSync(fullAssetPath),
          sourcePath: fullAssetPath
        });
      }
      return `<${tag} ${before}src="${filename}"${after}>`;
    }
    return match;
  });

  return {
    rewrittenMarkdown,
    mediaFiles
  };
}
