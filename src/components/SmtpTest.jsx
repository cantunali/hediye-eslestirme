
import React, { useState } from 'react';
import { Mail, Send, AlertCircle, CheckCircle2, Loader2, Server, Eye, EyeOff, ArrowLeft, Settings2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../services/supabase';

const SmtpTest = () => {
    const [smtpConfig, setSmtpConfig] = useState({
        hostname: 'smtp.turkticaret.net',
        port: 465,
        username: 'info@photo-transform.com',
        password: '',
    });
    const [testEmail, setTestEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [response, setResponse] = useState(null);

    const handleTest = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setResponse(null);

        try {
            const { data, error } = await db.sendEmail({
                to: testEmail,
                subject: "HediyeEşle Dinamik SMTP Testi",
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #6366f1;">SMTP Test Başarılı!</h2>
                        <p>Bu e-posta, HediyeEşle dinamik test aracından gönderilmiştir.</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="font-size: 12px; color: #666;">Kullanılan Ayarlar: ${smtpConfig.hostname}:${smtpConfig.port}</p>
                    </div>
                `,
                text: "Dinamik SMTP Testi Başarılı!",
                smtpConfig: smtpConfig
            });

            if (error) throw error;

            if (data?.error) {
                setResponse(data.error);
                setStatus('error');
            } else {
                setResponse("Test e-postası başarıyla gönderildi. Lütfen kutunuzu kontrol edin.");
                setStatus('success');
            }
        } catch (err) {
            console.error('SMTP Test Error:', err);
            setResponse(err.message || "Bilinmeyen bir hata oluştu.");
            setStatus('error');
        }
    };

    return (
        <div className="section container animate-fade-in" style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                    <ArrowLeft size={16} /> Giriş Sayfasına Dön
                </Link>
            </div>

            <div className="card" style={{ padding: '2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <Settings2 size={32} style={{ color: 'var(--primary)' }} />
                    </div>
                    <h2>Dinamik SMTP Test Paneli</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Tüm parametreleri değiştirerek SMTP bağlantısını doğrulayın.</p>
                </div>

                <form onSubmit={handleTest} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>SMTP Host</label>
                            <input
                                type="text"
                                className="glass"
                                style={{ width: '100%', padding: '0.85rem 1rem', color: 'white', borderRadius: '12px', outline: 'none' }}
                                placeholder="smtp.example.com"
                                value={smtpConfig.hostname}
                                onChange={(e) => setSmtpConfig({ ...smtpConfig, hostname: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Port</label>
                            <input
                                type="number"
                                className="glass"
                                style={{ width: '100%', padding: '0.85rem 1rem', color: 'white', borderRadius: '12px', outline: 'none' }}
                                placeholder="465"
                                value={smtpConfig.port}
                                onChange={(e) => setSmtpConfig({ ...smtpConfig, port: parseInt(e.target.value) })}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>SMTP Kullanıcı Adı (Email)</label>
                        <input
                            type="email"
                            className="glass"
                            style={{ width: '100%', padding: '0.85rem 1rem', color: 'white', borderRadius: '12px', outline: 'none' }}
                            placeholder="info@yourdomain.com"
                            value={smtpConfig.username}
                            onChange={(e) => setSmtpConfig({ ...smtpConfig, username: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>SMTP Şifre</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="glass"
                                style={{ width: '100%', padding: '0.85rem 3rem 0.85rem 1rem', color: 'white', borderRadius: '12px', outline: 'none' }}
                                placeholder="Yeni şifreyi girin"
                                value={smtpConfig.password}
                                onChange={(e) => setSmtpConfig({ ...smtpConfig, password: e.target.value })}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--primary)' }}>Test Edilecek Alıcı Email</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                className="glass"
                                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', color: 'white', borderRadius: '12px', outline: 'none' }}
                                placeholder="alıcı@mail.com"
                                value={testEmail}
                                onChange={(e) => setTestEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.1rem' }} disabled={status === 'loading'}>
                        {status === 'loading' ? (
                            <>
                                <Loader2 className="animate-spin" size={20} style={{ marginRight: '0.5rem' }} />
                                Sunucuya Bağlanılıyor...
                            </>
                        ) : (
                            <>
                                <Send size={18} style={{ marginRight: '0.5rem' }} />
                                Ayarları Test Et ve Gönder
                            </>
                        )}
                    </button>
                </form>

                {status === 'success' && (
                    <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '12px', display: 'flex', gap: '1rem', alignItems: 'center', color: '#4ade80' }}>
                        <CheckCircle2 size={24} />
                        <div>
                            <div style={{ fontWeight: 'bold' }}>BAĞLANTI KUSURSUZ!</div>
                            <div style={{ fontSize: '0.875rem' }}>{response}</div>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', color: '#ef4444' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                            <AlertCircle size={24} />
                            <div style={{ fontWeight: 'bold' }}>Hata Raporu</div>
                        </div>
                        <div style={{
                            fontSize: '0.875rem',
                            fontFamily: 'monospace',
                            background: 'rgba(0,0,0,0.3)',
                            padding: '1rem',
                            borderRadius: '8px',
                            wordBreak: 'break-all',
                            border: '1px solid rgba(239,68,68,0.3)'
                        }}>
                            {response}
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                            💡 <b>İpucu:</b> Port 465 kullanıyorsanız sunucu SSL bekler. Port 587 ise genellikle TLS (STARTTLS) gerektirir. Turkticaret şifrenizde özel karakterler (${smtpConfig.password.includes('%') ? '%, ' : ''}=, -, %) varsa kopyalarken dikkat edin.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SmtpTest;
