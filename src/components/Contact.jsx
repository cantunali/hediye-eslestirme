
import React from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 2rem' }}>
            <Helmet>
                <title>HediyeEşle - İletişim</title>
                <meta name="description" content="Sorularınız, görüşleriniz veya işbirlikleri için bize ulaşın. HediyeEşle ekibi size yardımcı olmaktan mutluluk duyar." />
            </Helmet>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>
                    Bize <span className="gradient-text">Ulaşın</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>
                    Sorularınız, önerileriniz veya iş birliği talepleriniz için her zaman buradayız.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
                {/* Contact Info */}
                <div>
                    <h2 style={{ marginBottom: '2rem' }}>İletişim Bilgileri</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div className="glass" style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                <Mail size={24} />
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>E-posta</p>
                                <p style={{ fontWeight: '600' }}>destek@hediyeesle.com</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div className="glass" style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)' }}>
                                <Phone size={24} />
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Telefon</p>
                                <p style={{ fontWeight: '600' }}>+90 (212) 123 45 67</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                            <div className="glass" style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Ofis</p>
                                <p style={{ fontWeight: '600' }}>Levent, İstanbul - Türkiye</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '4rem' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Sosyal Medya</h3>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <div className="btn-outline" style={{ padding: '12px', borderRadius: '12px', cursor: 'pointer' }}><Facebook size={20} /></div>
                            <div className="btn-outline" style={{ padding: '12px', borderRadius: '12px', cursor: 'pointer' }}><Twitter size={20} /></div>
                            <div className="btn-outline" style={{ padding: '12px', borderRadius: '12px', cursor: 'pointer' }}><Instagram size={20} /></div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card">
                    <h2 style={{ marginBottom: '2rem' }}>Mesaj Gönderin</h2>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Ad Soyad</label>
                            <input className="glass" style={{ width: '100%', padding: '1rem', color: 'white' }} placeholder="Adınız" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>E-posta</label>
                            <input type="email" className="glass" style={{ width: '100%', padding: '1rem', color: 'white' }} placeholder="ornek@mail.com" />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Mesajınız</label>
                            <textarea className="glass" style={{ width: '100%', padding: '1rem', minHeight: '150px', color: 'white', border: '1px solid var(--border)' }} placeholder="Nasıl yardımcı olabiliriz?"></textarea>
                        </div>
                        <button className="btn btn-primary" style={{ justifyContent: 'center', padding: '1rem' }} onClick={(e) => e.preventDefault()}>
                            Gönder <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
