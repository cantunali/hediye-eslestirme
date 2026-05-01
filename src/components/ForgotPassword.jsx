import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, ArrowRight, Loader2, CheckCircle2, ChevronLeft } from 'lucide-react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error: resetError } = await resetPassword(email);
            if (resetError) throw resetError;
            setSuccess(true);
        } catch (err) {
            console.error('Reset Password Error:', err);
            setError('Sıfırlama isteği başarısız: ' + (err.message || 'Lütfen bilgilerinizi kontrol edin.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="section container animate-fade-in" style={{ maxWidth: '450px', margin: '4rem auto' }}>
            <div className="card">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'var(--surface-container)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <Mail size={32} style={{ color: 'var(--primary)' }} />
                    </div>
                    <h2>Şifremi Unuttum</h2>
                    <p style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem' }}>Şifrenizi sıfırlamak için e-posta adresinizi girin.</p>
                </div>

                {success ? (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '56px', height: '56px', background: '#f6ffed', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', border: '1px solid #b7eb8f' }}>
                            <CheckCircle2 size={28} style={{ color: '#52c41a' }} />
                        </div>
                        <h3 style={{ marginBottom: '1rem' }}>E-posta Gönderildi!</h3>
                        <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            Sıfırlama linkini içeren bir e-posta gönderdik. Lütfen gelen kutunuzu (ve gereksiz kutusunu) kontrol edin.
                        </p>
                        <Link to="/login" className="btn btn-primary" style={{ marginTop: '2.5rem', width: '100%', height: '3.5rem' }}>
                            Giriş Ekranına Dön
                        </Link>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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

                            {error && (
                                <div style={{ padding: '0.75rem', background: '#fff1f0', color: 'var(--error)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', textAlign: 'center', border: '1px solid #ffccc7' }}>
                                    {error}
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '3.5rem' }} disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sıfırlama Linki Gönder'}
                                {!loading && <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                            <Link to="/login" style={{ color: 'var(--on-surface-variant)', fontSize: '0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: '600' }}>
                                <ChevronLeft size={16} /> Giriş Ekranına Dön
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
