import React, { useState } from 'react';
import { Mail, MapPin, Send, Instagram, Twitter, Facebook, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { db } from '../services/supabase';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }

        setStatus('sending');
        setErrorMsg('');

        try {
            const response = await fetch('/.netlify/functions/send-mail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                const errorData = await response.text();
                throw new Error(errorData || 'Mesaj gönderilirken bir hata oluştu.');
            }
        } catch (err) {
            console.error('Contact Form Error:', err);
            setErrorMsg(err.message || 'Mesaj gönderilemedi. Lütfen teknik ayarları kontrol edin veya daha sonra tekrar deneyin.');
            setStatus('error');
        }
    };

    return (
        <div className="section container animate-fade-in" style={{ padding: '2rem 1rem' }}>
            <Helmet>
                <title>HediyeEşle - İletişim</title>
                <meta name="description" content="Sorularınız, görüşleriniz veya işbirlikleri için bize ulaşın. HediyeEşle ekibi size yardımcı olmaktan mutluluk duyar." />
            </Helmet>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    Bize <span className="gradient-text">Ulaşın</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>
                    Sorularınız, önerileriniz veya iş birliği talepleriniz için her zaman buradayız.
                </p>
            </div>

            <div className="grid-mobile-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                {/* Contact Info */}
                <div style={{ order: window.innerWidth < 768 ? 2 : 1 }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>İletişim Bilgileri</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <div className="glass" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                                <Mail size={20} />
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.125rem' }}>E-posta</p>
                                <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>destek@hediyeesle.com</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <div className="glass" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.125rem' }}>Ofis</p>
                                <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>Levent, İstanbul - Türkiye</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem' }}>
                        <h3 style={{ marginBottom: '1.25rem' }}>Sosyal Medya</h3>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" className="btn-outline" style={{ padding: '10px', borderRadius: '12px', color: 'var(--text)', display: 'flex' }}><Facebook size={20} /></a>
                            <a href="#" className="btn-outline" style={{ padding: '10px', borderRadius: '12px', color: 'var(--text)', display: 'flex' }}><Twitter size={20} /></a>
                            <a href="#" className="btn-outline" style={{ padding: '10px', borderRadius: '12px', color: 'var(--text)', display: 'flex' }}><Instagram size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card" style={{ order: window.innerWidth < 768 ? 1 : 2 }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Mesaj Gönderin</h2>

                    {status === 'success' ? (
                        <div style={{ textAlign: 'center', padding: '1.5rem' }} className="animate-fade-in">
                            <CheckCircle2 size={48} style={{ color: '#4ade80', marginBottom: '1rem' }} />
                            <h3>Mesajınız İletildi!</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem', fontSize: '0.9rem' }}>En kısa sürede size geri dönüş yapacağız.</p>
                            <button
                                className="btn btn-primary"
                                style={{ marginTop: '1.5rem', width: 'auto' }}
                                onClick={() => setStatus('idle')}
                            >
                                Yeni Mesaj Gönder
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Ad Soyad</label>
                                <input
                                    className="glass"
                                    style={{ width: '100%', padding: '0.875rem', color: 'white' }}
                                    placeholder="Adınız"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    disabled={status === 'sending'}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>E-posta</label>
                                <input
                                    type="email"
                                    className="glass"
                                    style={{ width: '100%', padding: '0.875rem', color: 'white' }}
                                    placeholder="ornek@mail.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    disabled={status === 'sending'}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Mesajınız</label>
                                <textarea
                                    className="glass"
                                    style={{ width: '100%', padding: '0.875rem', minHeight: '120px', color: 'white', border: '1px solid var(--border)', fontFamily: 'inherit' }}
                                    placeholder="Nasıl yardımcı olabiliriz?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    disabled={status === 'sending'}
                                ></textarea>
                            </div>

                            {status === 'error' && (
                                <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <AlertCircle size={16} />
                                    {errorMsg}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ justifyContent: 'center', padding: '0.875rem' }}
                                disabled={status === 'sending'}
                            >
                                {status === 'sending' ? (
                                    <>Gönderiliyor... <Loader2 size={18} className="animate-spin" /></>
                                ) : (
                                    <>Gönder <Send size={18} /></>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Contact;
