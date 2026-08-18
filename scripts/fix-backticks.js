import fs from 'fs';

const targetFile = process.argv[2];
if (!targetFile) {
  console.error('Specify target file');
  process.exit(1);
}

let content = fs.readFileSync(targetFile, 'utf8');

// Replace code block fences ``` with \`\`\`
content = content.replace(/(?<!\\)```/g, '\\`\\`\\`');
// Replace inline `code` if unescaped inside strings, but wait: in our templates inline code is also written as `
// Let's replace any single backtick that is NOT the start/end of a writeAndValidateCard string
// In our templates, writeAndValidateCard('path', `---...`);
// The template starts with `--- and ends with `);

const parts = content.split("writeAndValidateCard(");
const fixedParts = [parts[0]];

for (let i = 1; i < parts.length; i++) {
  const part = parts[i];
  const firstBacktick = part.indexOf('`');
  const lastBacktick = part.lastIndexOf('`');
  if (firstBacktick !== -1 && lastBacktick !== -1 && lastBacktick > firstBacktick) {
    const pre = part.slice(0, firstBacktick + 1);
    const inner = part.slice(firstBacktick + 1, lastBacktick);
    const post = part.slice(lastBacktick);
    
    // In inner, escape all unescaped backticks
    const fixedInner = inner.replace(/(?<!\\)`/g, '\\`');
    fixedParts.push(pre + fixedInner + post);
  } else {
    fixedParts.push(part);
  }
}

fs.writeFileSync(targetFile, fixedParts.join('writeAndValidateCard('), 'utf8');
console.log(`✅ Fixed backticks in ${targetFile}`);
