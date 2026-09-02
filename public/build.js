const fs = require('fs');
const path = require('path');

const src = fs.existsSync('public') && fs.statSync('public').isDirectory() ? 'public' : '.';
const outDir = path.join('.vercel', 'output', 'static');

fs.mkdirSync(outDir, { recursive: true });

const ignoreList = new Set(['.vercel', '.git', 'node_modules', 'backend', 'build.js', 'package.json', 'package-lock.json', 'render.yaml', 'DEPLOYMENT.md']);

const files = fs.readdirSync(src);
for (const file of files) {
    if (ignoreList.has(file)) continue;
    const srcPath = path.join(src, file);
    const destPath = path.join(outDir, file);
    try {
        fs.cpSync(srcPath, destPath, { recursive: true });
    } catch (err) {
        console.error(`Warning copying ${file}:`, err.message);
    }
}

console.log('✅ Static build complete! Output placed in .vercel/output/static');
