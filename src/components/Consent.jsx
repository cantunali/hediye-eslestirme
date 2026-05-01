import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const Consent = () => {
    const [termsConsent, setTermsConsent] = useState(false);
    const [kvkkConsent, setKvkkConsent] = useState(false);
    const [marketingConsent, setMarketingConsent] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, loading: authLoading, recordConsents } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login', { replace: true });
        }
    }, [user, authLoading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!termsConsent || !kvkkConsent || !marketingConsent) {
            setError('Lütfen devam etmek için tüm onay metinlerini kabul edin.');
            return;
        }

        setLoading(true);
        try {
            const { error: consentError } = await recordConsents(user.id, {
                terms: true,
                kvkk: true,
                marketing: true
            });
            if (consentError) throw consentError;
            navigate('/yonetim', { replace: true });
        } catch (err) {
            setError('Onaylar kaydedilemedi: ' + (err.message || 'Lütfen tekrar deneyin.'));
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return null;

    return (
        <div className="section container animate-fade-in" style={{ maxWidth: '500px', margin: '2rem auto' }}>
            <div className="card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '64px', height: '64px', background: 'var(--surface-container)',
                        borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', margin: '0 auto 1.5rem'
                    }}>
                        <ShieldCheck size={32} style={{ color: 'var(--primary)' }} />
                    </div>
                    <h2>Onay Gerekiyor</h2>
                    <p style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem', lineHeight: '1.6' }}>
                        Platformumuzu kullanmaya başlamadan önce aşağıdaki metinleri okumanız ve onaylamanız gerekmektedir.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid var(--outline-variant)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem' }}>
                        {[
                            {
                                id: 'terms',
                                checked: termsConsent,
                                onChange: setTermsConsent,
                                linkTo: '/kullanim-kosullari',
                                linkText: 'Kullanıcı Sözleşmesi',
                                label: 'okudum ve kabul ediyorum.'
                            },
                            {
                                id: 'kvkk',
                                checked: kvkkConsent,
                                onChange: setKvkkConsent,
                                linkTo: '/kvkk',
                                linkText: 'KVKK Aydınlatma Metni',
                                label: 'okudum ve kabul ediyorum.'
                            },
                            {
                                id: 'marketing',
                                checked: marketingConsent,
                                onChange: setMarketingConsent,
                                linkTo: '/pazarlama-izni',
                                linkText: 'Pazarlama İzni Metni',
                                label: 'okudum ve kabul ediyorum.'
                            }
                        ].map((item, i, arr) => (
                            <label
                                key={item.id}
                                htmlFor={item.id}
                                style={{
                                    display: 'flex', gap: '1rem', alignItems: 'flex-start',
                                    padding: '1rem 1.25rem', cursor: 'pointer',
                                    borderBottom: i < arr.length - 1 ? '1px solid var(--outline-variant)' : 'none',
                                    background: item.checked ? 'rgba(var(--primary-rgb, 99,102,241), 0.05)' : 'transparent',
                                    transition: 'var(--transition)'
                                }}
                            >
                                <input
                                    type="checkbox"
                                    id={item.id}
                                    checked={item.checked}
                                    onChange={(e) => item.onChange(e.target.checked)}
                                    style={{ marginTop: '0.2rem', accentColor: 'var(--primary)', cursor: 'pointer', flexShrink: 0, width: '16px', height: '16px' }}
                                />
                                <span style={{ fontSize: '0.875rem', color: 'var(--on-surface-variant)', lineHeight: '1.5' }}>
                                    <Link
                                        to={item.linkTo}
                                        target="_blank"
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ color: 'var(--on-surface)', fontWeight: '700', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                                    >
                                        {item.linkText}
                                    </Link>
                                    {' '}{item.label}
                                </span>
                            </label>
                        ))}
                    </div>

                    {error && (
                        <div style={{
                            padding: '0.75rem 1rem', background: '#fff1f0', color: 'var(--error)',
                            borderRadius: 'var(--radius-md)', fontSize: '0.875rem', border: '1px solid #ffccc7',
                            display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem'
                        }}>
                            <AlertCircle size={16} style={{ flexShrink: 0 }} />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', height: '3.5rem' }}
                        disabled={loading || !termsConsent || !kvkkConsent || !marketingConsent}
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Onayla ve Devam Et'}
                        {!loading && <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Consent;
