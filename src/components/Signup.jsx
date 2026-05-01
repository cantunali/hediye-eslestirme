import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, ArrowRight, Loader2, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const Signup = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsConsent, setTermsConsent] = useState(false);
    const [kvkkConsent, setKvkkConsent] = useState(false);
    const [marketingConsent, setMarketingConsent] = useState(false);
    const { signUp, recordConsents, signInWithGoogle } = useAuth();
    const [googleLoading, setGoogleLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        setError('');
        setGoogleLoading(true);
        try {
            const { error } = await signInWithGoogle();
            if (error) throw error;
        } catch (err) {
            setError('Google ile kayıt başarısız: ' + (err.message || 'Lütfen tekrar deneyin.'));
            setGoogleLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!termsConsent || !kvkkConsent || !marketingConsent) {
            setError('Lütfen Kullanıcı Sözleşmesi, KVKK ve Pazarlama İzni metinlerini onaylayın.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await signUp(email, password, fullname);
            if (error) throw error;

            // Record consents in the database
            if (data?.user?.id) {
                await recordConsents(data.user.id, {
                    terms: termsConsent,
                    kvkk: kvkkConsent,
                    marketing: marketingConsent
                });
            }

            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError('Kayıt başarısız: ' + (err.message || 'Lütfen bilgilerinizi kontrol edin.'));
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
                    <h2>Kayıt Başarılı!</h2>
                    <p style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem' }}>E-posta adresinize bir onay linki gönderilmiş olabilir. Lütfen kontrol edin.</p>
                    <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary)' }}>Yönlendiriliyorsunuz...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="section container animate-fade-in" style={{ maxWidth: '450px', margin: '2rem auto' }}>
            <div className="card">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'var(--surface-container)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <UserPlus size={32} style={{ color: 'var(--secondary)' }} />
                    </div>
                    <h2>Hesap Oluştur</h2>
                    <p style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem' }}>Hediye paylaşımlarınızı merkezi olarak yönetin.</p>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={googleLoading}
                    style={{
                        width: '100%', height: '3.5rem', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '0.75rem', background: '#ffffff',
                        border: '1px solid #dadce0', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                        fontSize: '0.95rem', fontWeight: '600', color: '#3c4043',
                        transition: 'var(--transition)', marginBottom: '1.5rem',
                        opacity: googleLoading ? 0.7 : 1
                    }}
                >
                    {googleLoading ? <Loader2 className="animate-spin" size={20} /> : (
                        <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                    )}
                    Google ile Kayıt Ol
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ flex: 1, height: '1px', background: 'var(--outline-variant)' }} />
                    <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.8rem', fontWeight: '600', whiteSpace: 'nowrap' }}>veya e-posta ile</span>
                    <div style={{ flex: 1, height: '1px', background: 'var(--outline-variant)' }} />
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group" style={{ marginBottom: '0' }}>
                        <label className="form-label">Tam Ad</label>
                        <div style={{ position: 'relative' }}>
                            <UserPlus size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--on-surface-variant)' }} />
                            <input
                                type="text"
                                className="input"
                                style={{ paddingLeft: '2.75rem' }}
                                placeholder="Adınız Soyadınız"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '0' }}>
                        <label className="form-label">E-posta</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--on-surface-variant)' }} />
                            <input
                                type="email"
                                className="input"
                                style={{ paddingLeft: '2.75rem' }}
                                placeholder="ornek@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '0' }}>
                        <label className="form-label">Şifre</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input"
                                style={{ paddingRight: '3rem' }}
                                placeholder="En az 6 karakter"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--on-surface-variant)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
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
                                style={{ paddingRight: '3rem' }}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--on-surface-variant)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Legal Checkboxes */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <input
                                type="checkbox"
                                id="termsConsent"
                                checked={termsConsent}
                                onChange={(e) => setTermsConsent(e.target.checked)}
                                style={{ marginTop: '0.25rem', accentColor: 'var(--primary)', cursor: 'pointer' }}
                            />
                            <label htmlFor="termsConsent" style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', lineHeight: '1.4', cursor: 'pointer' }}>
                                <Link to="/kullanim-kosullari" target="_blank" style={{ color: 'var(--on-surface)', fontWeight: '600' }}>Kullanıcı Sözleşmesini</Link> okudum ve kabul ediyorum.
                            </label>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <input
                                type="checkbox"
                                id="kvkkConsent"
                                checked={kvkkConsent}
                                onChange={(e) => setKvkkConsent(e.target.checked)}
                                style={{ marginTop: '0.25rem', accentColor: 'var(--primary)', cursor: 'pointer' }}
                            />
                            <label htmlFor="kvkkConsent" style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', lineHeight: '1.4', cursor: 'pointer' }}>
                                <Link to="/kvkk" target="_blank" style={{ color: 'var(--on-surface)', fontWeight: '600' }}>KVKK Aydınlatma Metnini</Link> okudum ve kabul ediyorum.
                            </label>
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <input
                                type="checkbox"
                                id="marketingConsent"
                                checked={marketingConsent}
                                onChange={(e) => setMarketingConsent(e.target.checked)}
                                style={{ marginTop: '0.25rem', accentColor: 'var(--primary)', cursor: 'pointer' }}
                            />
                            <label htmlFor="marketingConsent" style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', lineHeight: '1.4', cursor: 'pointer' }}>
                                <Link to="/pazarlama-izni" target="_blank" style={{ color: 'var(--on-surface)', fontWeight: '600' }}>Pazarlama İzni Metnini</Link> okudum ve kabul ediyorum.
                            </label>
                        </div>
                    </div>

                    {error && (
                        <div style={{ padding: '0.75rem', background: '#fff1f0', color: 'var(--error)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', textAlign: 'center', border: '1px solid #ffccc7' }}>
                            {error}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '3.5rem', marginTop: '0.5rem' }} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Ücretsiz Hesap Oluştur'}
                        {!loading && <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.9rem', color: 'var(--on-surface-variant)' }}>
                    Zaten bir hesabınız var mı? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Giriş Yap</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
