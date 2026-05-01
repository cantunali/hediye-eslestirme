import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowRight, Loader2, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { updatePassword, updatePasswordByEmail } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get email from query params for manual reset flow
    const queryParams = new URLSearchParams(location.search);
    const resetEmail = queryParams.get('email');

    // Supabase sets a hash in the URL when coming from a reset link
    useEffect(() => {
        const hasAccessToken = location.hash || window.location.href.includes('access_token=');
        const hasEmailParam = resetEmail;

        if (!hasAccessToken && !hasEmailParam) {
            setError('Geçersiz veya süresi dolmuş sıfırlama linki.');
        }
    }, [location, resetEmail]);

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
            let result;
            if (resetEmail) {
                result = await updatePasswordByEmail(resetEmail, password);
            } else {
                result = await updatePassword(password);
            }

            if (result.error) throw result.error;
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
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

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group" style={{ marginBottom: '0' }}>
                        <label className="form-label">Yeni Şifre</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input"
                                style={{ paddingRight: '3rem' }}
                                placeholder="••••••••"
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
            </div>
        </div>
    );
};

export default ResetPassword;
