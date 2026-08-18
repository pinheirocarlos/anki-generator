import fs from 'fs';
import path from 'path';

// 1. Move runtimes/* to runtimes-garbage-collection/*
const runtimesSrc = path.resolve('decks/02-cs-fundamentals/runtimes');
const runtimesDest = path.resolve('decks/02-cs-fundamentals/runtimes-garbage-collection');

if (fs.existsSync(runtimesSrc)) {
  const subdirs = fs.readdirSync(runtimesSrc);
  for (const sub of subdirs) {
    const srcSub = path.join(runtimesSrc, sub);
    const destSub = path.join(runtimesDest, sub);
    if (!fs.existsSync(destSub)) fs.mkdirSync(destSub, { recursive: true });
    // Remove old files in destSub
    const oldFiles = fs.readdirSync(destSub).filter(f => f.endsWith('.md'));
    for (const f of oldFiles) {
      fs.unlinkSync(path.join(destSub, f));
    }
    // Copy new files from srcSub
    const newFiles = fs.readdirSync(srcSub).filter(f => f.endsWith('.md'));
    for (const f of newFiles) {
      fs.copyFileSync(path.join(srcSub, f), path.join(destSub, f));
    }
  }
  fs.rmSync(runtimesSrc, { recursive: true, force: true });
  console.log('✅ Moved runtimes to runtimes-garbage-collection and removed old composite cards');
}

// 2. Remove old composite cards in linux-io-syscalls
const syscall0 = path.resolve('decks/02-cs-fundamentals/os-memory/linux-io-syscalls/CS-OS-SYSCALL-000.md');
const syscall1 = path.resolve('decks/02-cs-fundamentals/os-memory/linux-io-syscalls/CS-OS-SYSCALL-001.md');
if (fs.existsSync(syscall0)) {
  fs.unlinkSync(syscall0);
  console.log('✅ Removed old CS-OS-SYSCALL-000.md');
}
if (fs.existsSync(syscall1)) {
  fs.unlinkSync(syscall1);
  console.log('✅ Removed old CS-OS-SYSCALL-001.md');
}
