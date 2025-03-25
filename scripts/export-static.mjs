import pkg from 'fs-extra';
const { copySync, ensureDirSync } = pkg;

import { join, dirname } from 'path';
import { existsSync, readdirSync, statSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';

const outDir = join(process.cwd(), 'out');
const serverAppDir = join(process.cwd(), '.next/server/app');
const staticDir = join(process.cwd(), '.next/static');

console.log('🛠 Exporting static files from Next.js build...');

ensureDirSync(outDir);

// Copy static assets (_next)
if (existsSync(staticDir)) {
  copySync(staticDir, join(outDir, '_next/static'));
}

// Recursively copy index.html files from .next/server/app
function copyHTMLFiles(srcDir, destDir) {
  readdirSync(srcDir).forEach((file) => {
    const srcPath = join(srcDir, file);
    const destPath = join(destDir, file);

    if (statSync(srcPath).isDirectory()) {
      copyHTMLFiles(srcPath, destPath);
    } else if (file === 'index.html') {
      ensureDirSync(destDir);
      copyFileSync(srcPath, join(destDir, 'index.html'));
    }
  });
}

if (existsSync(serverAppDir)) {
  copyHTMLFiles(serverAppDir, outDir);
}

console.log('✅ Static export complete!');
