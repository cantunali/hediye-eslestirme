#!/usr/bin/env node
/**
 * Blog görselleri indirme scripti
 * Unsplash'taki blog görsellerini public/blog-images/ klasörüne indirir
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'public', 'blog-images');

// Unsplash fotoğraf ID -> dosya adı eşlemesi
const images = [
    {
        photoId: '1522071820081-009f0129c71c',
        filename: 'is-yerinde-hediyelesme.jpg',
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=85&w=1200',
    },
    {
        photoId: '1549465220-1a8b9238cd48',
        filename: 'sunnet-dugunu-hediyesi.jpg',
        url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=85&w=1200',
    },
    {
        photoId: '1541339907198-e08756dedf3f',
        filename: 'mezuniyet-hediyesi.jpg',
        url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=85&w=1200',
    },
    {
        photoId: '1583847268964-b28dc8f51f92',
        filename: 'ceyiz-alisverisi.jpg',
        url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=85&w=1200',
    },
    {
        photoId: '1519689680058-324335c77eba',
        filename: 'baby-shower.jpg',
        url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=85&w=1200',
    },
    {
        photoId: '1515934751635-c81c6bc9a2d8',
        filename: 'nisan-yildonumu-hediyesi.jpg',
        url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=85&w=1200',
    },
    {
        photoId: '1511795409834-ef04bbd61622',
        filename: 'dugun-hediyesi.jpg',
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=85&w=1200',
    },
    {
        photoId: '1556909114-f6e7ad7d3136',
        filename: 'ev-tasinma-hediyesi.jpg',
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=85&w=1200',
    },
    {
        photoId: '1512909006721-3d6018887383',
        filename: 'yilbasi-hediye-degisimi.jpg',
        url: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=85&w=1200',
    },
    {
        photoId: '1530103862676-de8c9debad1d',
        filename: 'dogum-gunu-hediyesi.jpg',
        url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=85&w=1200',
    },
    {
        photoId: '1522771739844-6a9f6d5f14af',
        filename: 'bebek-hediyesi.jpg',
        url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=85&w=1200',
    },
    {
        photoId: '1513201099705-a9746e1e201f',
        filename: 'genel-hediye-rehberi.jpg',
        url: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=85&w=1200',
    },
];

function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(destPath);
        const protocol = url.startsWith('https') ? https : http;

        function doRequest(reqUrl) {
            protocol.get(reqUrl, (response) => {
                if (response.statusCode === 301 || response.statusCode === 302) {
                    // Redirect
                    file.close();
                    doRequest(response.headers.location);
                    return;
                }
                if (response.statusCode !== 200) {
                    file.close();
                    fs.unlink(destPath, () => {});
                    reject(new Error(`HTTP ${response.statusCode} for ${reqUrl}`));
                    return;
                }
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            }).on('error', (err) => {
                file.close();
                fs.unlink(destPath, () => {});
                reject(err);
            });
        }

        doRequest(url);
    });
}

async function main() {
    // Klasörü oluştur
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`✅ Klasör oluşturuldu: ${OUTPUT_DIR}`);
    }

    console.log(`\n📥 ${images.length} görsel indiriliyor...\n`);

    for (const img of images) {
        const destPath = path.join(OUTPUT_DIR, img.filename);

        if (fs.existsSync(destPath)) {
            const stats = fs.statSync(destPath);
            if (stats.size > 10000) {
                console.log(`⏩ Zaten mevcut: ${img.filename} (${Math.round(stats.size / 1024)} KB)`);
                continue;
            }
        }

        process.stdout.write(`⬇️  İndiriliyor: ${img.filename} ... `);
        try {
            await downloadFile(img.url, destPath);
            const stats = fs.statSync(destPath);
            console.log(`✅ ${Math.round(stats.size / 1024)} KB`);
        } catch (err) {
            console.log(`❌ HATA: ${err.message}`);
        }
    }

    console.log('\n🎉 İndirme tamamlandı!');
    console.log(`\nGörseller şu klasörde: ${OUTPUT_DIR}`);
    console.log('\nŞimdi kaynak dosyalardaki Unsplash URL\'lerini yerel yollarla güncelleyebilirsiniz.');
}

main().catch(console.error);
