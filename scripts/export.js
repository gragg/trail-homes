// scripts/export.js
const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

// Generate static routes first
console.log('🔄 Generating static routes...');
execSync('npm run generate', { stdio: 'inherit' });

// Build the Next.js application
console.log('🏗️ Building Next.js application...');
execSync('next build', { stdio: 'inherit' });

// Ensure the out directory exists
const outDir = path.join(process.cwd(), 'out');
fs.ensureDirSync(outDir);

// Copy any additional assets if needed
const publicDir = path.join(process.cwd(), 'public');
if (fs.existsSync(publicDir)) {
  console.log('📂 Copying public assets...');
  fs.copySync(publicDir, outDir, {
    filter: (src) => {
      // Filter out any files you don't want to copy
      return true;
    }
  });
}

console.log('✅ Static export complete! Output is in the "out" directory.');