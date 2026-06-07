const https = require('https');

function findRef() {
    https.get('https://hediyeeslestir.com/_next/static/chunks/00-_6mk.v0eoh.js', (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            const ref = 'tlomiawiztpifcbmhbyl';
            let pos = body.indexOf(ref);
            if (pos !== -1) {
                console.log("Found ref at index:", pos);
                console.log("Snippet around ref:");
                console.log(body.substring(pos - 150, pos + 150));
            } else {
                console.log("Ref not found in this chunk.");
            }
        });
    });
}

findRef();
