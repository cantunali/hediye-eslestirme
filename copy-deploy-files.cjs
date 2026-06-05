const fs = require('fs');
const path = require('path');

function copyDirRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDirRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Clean and recreate dist
if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
}
fs.mkdirSync('dist');

// Copy out contents to dist
console.log('Copying static export from out/ to dist/...');
copyDirRecursive('out', 'dist');

// Copy netlify functions
console.log('Copying Netlify functions...');
copyDirRecursive('netlify/functions', 'dist/functions');

// Copy config files
const filesToCopy = [
    { src: 'netlify-deploy.toml', dest: 'dist/netlify.toml' },
    { src: 'package.json', dest: 'dist/package.json' },
    { src: 'package-lock.json', dest: 'dist/package-lock.json' },
    { src: '.npmrc', dest: 'dist/.npmrc' },
];

filesToCopy.forEach(file => {
    if (fs.existsSync(file.src)) {
        fs.copyFileSync(file.src, file.dest);
        console.log(`Copied ${file.src} to ${file.dest}`);
    }
});

console.log('Deploy folder dist/ successfully prepared!');
