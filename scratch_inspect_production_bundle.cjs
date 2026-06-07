const https = require('https');

function inspectBundle() {
    console.log("Fetching production JS chunk...");
    https.get('https://hediyeeslestir.com/_next/static/chunks/00-_6mk.v0eoh.js', (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            console.log("Chunk size:", body.length);
            
            // Look for createClient or placeholder-url or placeholder-key
            const createClientIndex = body.indexOf('createClient');
            if (createClientIndex !== -1) {
                console.log("\nFound 'createClient' at index:", createClientIndex);
                console.log("Snippet around 'createClient':");
                console.log(body.substring(createClientIndex - 300, createClientIndex + 300));
            } else {
                console.log("Could not find 'createClient' in this chunk.");
            }

            const placeholderUrlIndex = body.indexOf('placeholder-url');
            if (placeholderUrlIndex !== -1) {
                console.log("\nFound 'placeholder-url' at index:", placeholderUrlIndex);
                console.log("Snippet around 'placeholder-url':");
                console.log(body.substring(placeholderUrlIndex - 200, placeholderUrlIndex + 200));
            } else {
                console.log("Could not find 'placeholder-url'.");
            }

            const placeholderKeyIndex = body.indexOf('placeholder-key');
            if (placeholderKeyIndex !== -1) {
                console.log("\nFound 'placeholder-key' at index:", placeholderKeyIndex);
                console.log("Snippet around 'placeholder-key':");
                console.log(body.substring(placeholderKeyIndex - 200, placeholderKeyIndex + 200));
            } else {
                console.log("Could not find 'placeholder-key'.");
            }
        });
    }).on('error', (err) => {
        console.error("Fetch error:", err);
    });
}

inspectBundle();
