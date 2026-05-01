const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(dirPath);
        }
    });
}

const targetDir = path.join(__dirname, 'src');
walkDir(targetDir, (filePath) => {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('HediyeEşle')) {
            content = content.replace(/HediyeEşle'nin/g, "HediyeEşleştir'in");
            content = content.replace(/HediyeEşle'yi/g, "HediyeEşleştir'i");
            content = content.replace(/HediyeEşle'ye/g, "HediyeEşleştir'e");
            content = content.replace(/HediyeEşle'den/g, "HediyeEşleştir'den");
            content = content.replace(/HediyeEşle/g, 'HediyeEşleştir');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated: ' + filePath);
        }
    }
});

['index.html', 'netlify/functions/send-mail.js'].forEach(p => {
    const fullPath = path.join(__dirname, p);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('HediyeEşle')) {
            content = content.replace(/HediyeEşle'nin/g, "HediyeEşleştir'in");
            content = content.replace(/HediyeEşle'yi/g, "HediyeEşleştir'i");
            content = content.replace(/HediyeEşle'ye/g, "HediyeEşleştir'e");
            content = content.replace(/HediyeEşle'den/g, "HediyeEşleştir'den");
            content = content.replace(/HediyeEşle/g, 'HediyeEşleştir');
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log('Updated: ' + fullPath);
        }
    }
});
