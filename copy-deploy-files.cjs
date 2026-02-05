const fs = require('fs');
const path = require('path');

const filesToCopy = [
    { src: 'netlify-deploy.toml', dest: 'dist/netlify.toml' },
    { src: 'package.json', dest: 'dist/package.json' },
    { src: 'package-lock.json', dest: 'dist/package-lock.json' },
    { src: '.npmrc', dest: 'dist/.npmrc' },
];

const foldersToCopy = [
    { src: 'netlify/functions', dest: 'dist/functions' }
];

// Ensure dist exists
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

filesToCopy.forEach(file => {
    if (fs.existsSync(file.src)) {
        fs.copyFileSync(file.src, file.src.replace(file.src, file.dest));
        console.log(`Copied ${file.src} to ${file.dest}`);
    }
});

foldersToCopy.forEach(folder => {
    if (fs.existsSync(folder.src)) {
        if (!fs.existsSync(folder.dest)) {
            fs.mkdirSync(folder.dest, { recursive: true });
        }
        const files = fs.readdirSync(folder.src);
        files.forEach(file => {
            fs.copyFileSync(path.join(folder.src, file), path.join(folder.dest, file));
            console.log(`Copied ${file} to ${folder.dest}`);
        });
    }
});
