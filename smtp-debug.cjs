
const nodemailer = require('nodemailer');

const configs = [
    {
        name: "Port 465 (SSL)",
        host: "smtp.turkticaret.net",
        port: 465,
        secure: true,
        auth: { user: "info@photo-transform.com", pass: "S6$7c&uFont&" }
    },
    {
        name: "Port 587 (TLS)",
        host: "smtp.turkticaret.net",
        port: 587,
        secure: false, // TLS usually uses secure: false with requireTLS: true
        auth: { user: "info@photo-transform.com", pass: "S6$7c&uFont&" },
        tls: { rejectUnauthorized: false } // Avoid cert issues during testing
    }
];

async function testConfig(config) {
    console.log(`\n--- Test Ediliyor: ${config.name} ---`);
    const transporter = nodemailer.createTransport(config);

    try {
        await transporter.verify();
        console.log(`✅ ${config.name}: BAĞLANTI BAŞARILI!`);
        return true;
    } catch (error) {
        console.log(`❌ ${config.name}: BAŞARISIZ.`);
        console.log(`   Hata: ${error.message}`);
        return false;
    }
}

async function runAll() {
    console.log("E-posta Sunucu Tanılama Başlatıldı...");
    let successCount = 0;

    for (const config of configs) {
        const success = await testConfig(config);
        if (success) successCount++;
    }

    console.log("\n--- SONUÇ ---");
    if (successCount > 0) {
        console.log("Çalışan bir konfigürasyon bulundu! Lütfen Supabase panelinde bu ayarları kullanın.");
    } else {
        console.log("Hiçbir konfigürasyon çalışmadı. Lütfen şifrenizi (S6$7c&uFont&) ve kullanıcı adınızı kontrol edin.");
        console.log("Not: Turkticaret panelinden 'Dış erişim' veya 'SMTP izni'nin açık olduğundan emin olun.");
    }
}

runAll();
