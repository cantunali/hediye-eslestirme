"use client";
import React from 'react';
import { Mail, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Contact = () => {
    return (
        <div className="section container animate-fade-in" style={{ padding: '4rem 1rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                    Bize <span className="gradient-text">Ulaşın</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1rem, 4vw, 1.25rem)' }}>
                    Sorularınız, önerileriniz veya iş birliği talepleriniz için her zaman buradayız.
                </p>
            </div>

            <div style={{ maxWidth: '500px', margin: '0 auto', padding: '3rem 2rem' }} className="card">
                <h2 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.75rem' }}>İletişim Bilgileri</h2>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div className="glass" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                            <Mail size={20} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.125rem' }}>E-posta</p>
                            <a href="mailto:bilgi@hediyeeslestir.com" style={{ fontWeight: '600', fontSize: '1.05rem', color: 'inherit', textDecoration: 'none' }}>
                                bilgi@hediyeeslestir.com
                            </a>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                        <div className="glass" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                            <MapPin size={20} />
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.125rem' }}>Ofis</p>
                            <p style={{ fontWeight: '600', fontSize: '1.05rem' }}>Levent, İstanbul - Türkiye</p>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <h3 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Sosyal Medya</h3>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <a href="#" className="btn-outline" style={{ padding: '10px', borderRadius: '12px', color: 'var(--text)', display: 'flex' }}><Facebook size={20} /></a>
                        <a href="#" className="btn-outline" style={{ padding: '10px', borderRadius: '12px', color: 'var(--text)', display: 'flex' }}><Twitter size={20} /></a>
                        <a href="#" className="btn-outline" style={{ padding: '10px', borderRadius: '12px', color: 'var(--text)', display: 'flex' }}><Instagram size={20} /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
