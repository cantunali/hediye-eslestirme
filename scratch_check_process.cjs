const https = require('https');

function checkProcess() {
    https.get('https://hediyeeslestir.com/_next/static/chunks/00-_6mk.v0eoh.js', (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            let pos = body.indexOf('process');
            while (pos !== -1) {
                // Ignore if it's part of a word like "processor" or "processing" unless it's "process." or "process "
                const snippet = body.substring(pos - 50, pos + 50);
                console.log(`Found 'process' at index ${pos}: \n...${snippet}...\n`);
                pos = body.indexOf('process', pos + 1);
            }
        });
    });
}

checkProcess();
