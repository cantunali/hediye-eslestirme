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
            // First, trigger Supabase password reset to get the token/session (simulated or real)
            const { data, error: resetError } = await resetPassword(email);
            if (resetError) throw resetError;

            // Generate the reset link (pointing to our ResetPassword component)
            // In a real flow, Supabase sends this, but since we want to control the email:
            const resetLink = `${window.location.origin}/reset-password?email=${encodeURIComponent(email)}`;

            // Send the custom email via our Netlify function
            const response = await fetch('/.netlify/functions/send-mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    type: 'reset',
                    resetLink
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'E-posta gönderilemedi.');
            }

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
            <div className="card" style={{ padding: '3rem 2.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <Mail size={32} style={{ color: 'var(--primary)' }} />
                    </div>
                    <h2>Şifremi Unuttum</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Şifrenizi sıfırlamak için e-posta adresinizi girin.</p>
                </div>

                {success ? (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '56px', height: '56px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <CheckCircle2 size={28} style={{ color: '#22c55e' }} />
                        </div>
                        <h3 style={{ marginBottom: '1rem' }}>E-posta Gönderildi!</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                            Sıfırlama linkini içeren bir e-posta gönderdik. Lütfen gelen kutunuzu (ve gereksiz kutusunu) kontrol edin.
                        </p>
                        <Link to="/login" className="btn btn-primary" style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}>
                            Giriş Ekranına Dön
                        </Link>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>E-posta</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="email"
                                        className="glass"
                                        style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', color: 'white', borderRadius: '12px', outline: 'none' }}
                                        placeholder="ornek@mail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', fontSize: '0.875rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                    {error}
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }} disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sıfırlama Linki Gönder'}
                                {!loading && <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />}
                            </button>
                        </form>

                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <Link to="/login" style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
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
