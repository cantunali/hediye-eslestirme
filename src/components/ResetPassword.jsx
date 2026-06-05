"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../services/supabase';
import { Lock, ArrowRight, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sessionReady, setSessionReady] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        console.log('ResetPassword Component Mounted. Current URL:', window.location.href);
        console.log('Current Hash:', window.location.hash);

        // Listen to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('onAuthStateChange fired in ResetPassword:', event, !!session);
            if (event === 'PASSWORD_RECOVERY' || (session && event === 'SIGNED_IN')) {
                console.log('Recovery session detected via auth state change.');
                setSessionReady(true);
                setError('');
            }
        });

        // Check if there is an active session right away
        supabase.auth.getSession()
            .then(({ data, error: sessionError }) => {
                console.log('getSession resolved in ResetPassword. Data:', data, 'Error:', sessionError);
                if (sessionError) {
                    setError('Sıfırlama linki doğrulanırken hata oluştu: ' + sessionError.message);
                } else if (data && data.session) {
                    console.log('Session exists in getSession, setting ready.');
                    setSessionReady(true);
                    setError('');
                } else {
                    // Let's also check if we have recovery parameters in the URL hash before showing invalid link error
                    const hash = window.location.hash || '';
                    if (hash.includes('access_token=') && (hash.includes('type=recovery') || hash.includes('type=signup'))) {
                        console.log('Hash contains access token and type recovery/signup. Waiting for onAuthStateChange to parse it.');
                        // Do not show error yet, wait a bit for Supabase to process it
                    } else {
                        console.log('No session and no recovery parameters in hash.');
                        setError('Geçersiz veya süresi dolmuş sıfırlama linki.');
                    }
                }
            })
            .catch(err => {
                console.error('getSession rejected in ResetPassword:', err);
                setError('Sıfırlama linki doğrulanırken beklenmeyen bir hata oluştu.');
            });

        return () => {
            console.log('ResetPassword Component Unmounted.');
            subscription.unsubscribe();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }

        if (password.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır.');
            return;
        }

        setLoading(true);
        try {
            const { error: updateError } = await supabase.auth.updateUser({ password });
            if (updateError) throw updateError;
            setSuccess(true);
            setTimeout(() => router.push('/login'), 3000);
        } catch (err) {
            setError('Şifre güncelleme başarısız: ' + (err.message || 'Lütfen tekrar deneyin.'));
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="section container animate-fade-in" style={{ maxWidth: '450px', margin: '4rem auto' }}>
                <div className="card" style={{ padding: '3rem 2.5rem', textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '64px', background: '#f6ffed', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid #b7eb8f' }}>
                        <CheckCircle2 size={32} style={{ color: '#52c41a' }} />
                    </div>
                    <h2>Şifre Güncellendi!</h2>
                    <p style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem' }}>Yeni şifreniz başarıyla kaydedildi. Giriş ekranına yönlendiriliyorsunuz.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="section container animate-fade-in" style={{ maxWidth: '450px', margin: '4rem auto' }}>
            <div className="card">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'var(--surface-container)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <Lock size={32} style={{ color: 'var(--primary)' }} />
                    </div>
                    <h2>Yeni Şifre Belirle</h2>
                    <p style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem' }}>Lütfen hesabınız için yeni bir şifre girin.</p>
                </div>

                {!sessionReady && error ? (
                    <div style={{ padding: '1rem', background: '#fff1f0', color: 'var(--error)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', textAlign: 'center', border: '1px solid #ffccc7', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <AlertCircle size={16} />
                        {error}
                    </div>
                ) : !sessionReady ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--on-surface-variant)' }}>
                        <Loader2 className="animate-spin" size={28} style={{ margin: '0 auto 1rem' }} />
                        <p>Link doğrulanıyor...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div className="form-group" style={{ marginBottom: '0' }}>
                            <label className="form-label">Yeni Şifre</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="input"
                                    style={{ paddingRight: '3rem', color: '#333' }}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '0' }}>
                            <label className="form-label">Şifre Tekrar</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="input"
                                    style={{ paddingRight: '3rem', color: '#333' }}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#333', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div style={{ padding: '0.75rem', background: '#fff1f0', color: 'var(--error)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', textAlign: 'center', border: '1px solid #ffccc7', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '3.5rem' }} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Şifreyi Güncelle'}
                            {!loading && <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
