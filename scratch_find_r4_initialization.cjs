const https = require('https');

function findCreateClient() {
    https.get('https://hediyeeslestir.com/_next/static/chunks/00-_6mk.v0eoh.js', (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            // Find all indices of "createClient"
            let pos = body.indexOf('createClient');
            while (pos !== -1) {
                console.log("\nFound 'createClient' at index:", pos);
                console.log("Snippet:");
                console.log(body.substring(pos - 150, pos + 150));
                pos = body.indexOf('createClient', pos + 1);
            }
        });
    });
}

findCreateClient();
