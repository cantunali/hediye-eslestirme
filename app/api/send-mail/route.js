import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, type, resetLink, to, subject, html: customHtml } = body;

    console.log("E-posta gönderim isteği alındı (Next.js API):", { type: type || 'contact', email });

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("HATA: SMTP yapılandırma değişkenleri eksik!");
      return NextResponse.json({ error: "Sunucu yapılandırma hatası (Eksik parametre)." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let mailOptions;

    if (type === 'reset') {
      mailOptions = {
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: email,
        subject: 'HediyeEşleştir - Şifre Sıfırlama İsteyi',
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #6366f1; text-align: center;">Şifre Sıfırlama</h2>
                <p>Merhaba,</p>
                <p>HediyeEşleştir hesabınız için şifre sıfırlama talebinde bulundunuz. Şifrenizi sıfırlamak için aşağıdaki butona tıklayabilirsiniz:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">Şifremi Sıfırla</a>
                </div>
                <p>Eğer bu talebi siz yapmadıysanız, bu e-postayı görmezden gelebilirsiniz. Güvenliğiniz için bu link 1 saat geçerlidir.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #999; text-align: center;">HediyeEşleştir - Mutlu Anların Paylaşım Noktası</p>
            </div>
        `,
        text: `HediyeEşleştir Şifre Sıfırlama\n\nŞifrenizi sıfırlamak için şu linke tıklayın: ${resetLink}\n\nEğer bu talebi siz yapmadıysanız bu e-postayı görmezden gelebilirsiniz.`
      };
    } else if (type === 'invite') {
      mailOptions = {
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: to || email,
        subject: subject || 'HediyeEşleştir Davet',
        html: customHtml || `
            <div style="font-family: sans-serif; padding: 20px;">
                <p>${message}</p>
            </div>
        `,
        text: message
      };
    } else {
      mailOptions = {
        from: process.env.MAIL_FROM || process.env.SMTP_USER,
        to: process.env.MAIL_TO,
        replyTo: email,
        subject: `HediyeEşleştir İletişim: ${name}`,
        text: `Ad: ${name}\nEmail: ${email}\n\nMesaj:\n${message}`,
      };
    }

    const info = await transporter.sendMail(mailOptions);
    console.log("E-posta başarıyla gönderildi (Next.js API):", info.messageId);
    return NextResponse.json({ message: "Mesaj başarıyla gönderildi." });
  } catch (err) {
    console.error("E-posta Gönderim Hatası (Next.js API):", err);
    return NextResponse.json({ error: `Gönderim hatası: ${err.message}` }, { status: 500 });
  }
}
