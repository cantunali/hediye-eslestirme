"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, X } from 'lucide-react';

const CookieConsent = () => {
    const [isAccepted, setIsAccepted] = useState(true); // Default true on server to hide it from hydration pop, will toggle on mount

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsAccepted(false);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsAccepted(true);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsAccepted(true);
    };

    if (isAccepted) {
        return null;
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            left: '24px',
            maxWidth: '500px',
            zIndex: 9999,
            marginLeft: 'auto', // Will center or align right depending on screen
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '24px',
            background: 'rgba(15, 15, 15, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            padding: '1.5rem',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }} className="animate-fade-in">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(212, 160, 23, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)'
                }}>
                    <ShieldCheck size={20} />
                </div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Çerez Tercihleriniz</h4>
                <button 
                    onClick={handleDecline}
                    style={{
                        marginLeft: 'auto',
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.6)',
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '50%',
                        transition: 'var(--transition)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                    <X size={18} />
                </button>
            </div>

            {/* Description */}
            <p style={{ 
                margin: 0, 
                fontSize: '0.9rem', 
                lineHeight: '1.6', 
                color: 'rgba(255, 255, 255, 0.85)' 
            }}>
                HediyeEşleştir olarak sitemizde kullanıcı deneyimini iyileştirmek, oturum yönetimini güvenle sağlamak ve Google AdSense üzerinden kişiselleştirilmiş reklamlar sunabilmek amacıyla çerezler (cookies) kullanıyoruz. 
                Detaylı bilgi edinmek için <Link href="/gizlilik-politikasi" style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}>Gizlilik ve Çerez Politikamızı</Link> ve <Link href="/kvkk" style={{ color: 'var(--primary)', textDecoration: 'underline', fontWeight: 600 }}>KVKK Aydınlatma Metnimizi</Link> okuyabilirsiniz.
            </p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button 
                    onClick={handleDecline}
                    style={{
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        color: '#ffffff',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        transition: 'var(--transition)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    }}
                >
                    Reddet
                </button>
                <button 
                    onClick={handleAccept}
                    style={{
                        background: 'linear-gradient(135deg, #e6b800, #b8860b)',
                        border: 'none',
                        color: '#1a1a1a',
                        padding: '0.6rem 1.4rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        boxShadow: '0 4px 12px rgba(184, 134, 11, 0.25)',
                        transition: 'var(--transition)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(184, 134, 11, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(184, 134, 11, 0.25)';
                    }}
                >
                    Kabul Et
                </button>
            </div>
            
            {/* Embedded styles for animation */}
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes slideUp {
                    from {
                        transform: translateY(30px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}} />
        </div>
    );
};

export default CookieConsent;
