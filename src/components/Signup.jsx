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
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Şifreler eşleşmiyor.');
            return;
        }

        setLoading(true);

        try {
            const { error } = await signUp(email, password, fullname);
            if (error) throw error;
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
                    <div style={{ width: '64px', height: '64px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <CheckCircle2 size={32} style={{ color: '#22c55e' }} />
                    </div>
                    <h2>Kayıt Başarılı!</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>E-posta adresinize bir onay linki gönderilmiş olabilir. Lütfen kontrol edin.</p>
                    <p style={{ marginTop: '1.5rem', fontSize: '0.875rem' }}>Yönlendiriliyorsunuz...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="section container animate-fade-in" style={{ maxWidth: '450px', margin: '2rem auto' }}>
            <div className="card" style={{ padding: '2rem 1.5rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <UserPlus size={32} style={{ color: 'var(--secondary)' }} />
                    </div>
                    <h2>Hesap Oluştur</h2>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Hediye paylaşımlarınızı merkezi olarak yönetin.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Tam Ad</label>
                        <div style={{ position: 'relative' }}>
                            <UserPlus size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                className="glass"
                                style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', color: 'white', borderRadius: '12px', outline: 'none' }}
                                placeholder="Adınız Soyadınız"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>E-posta</label>
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

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Şifre</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="glass"
                                style={{ width: '100%', padding: '0.85rem 3rem 0.85rem 1rem', borderRadius: '12px', color: 'white', outline: 'none' }}
                                placeholder="En az 6 karakter"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Şifre Tekrar</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="glass"
                                style={{ width: '100%', padding: '0.85rem 3rem 0.85rem 1rem', borderRadius: '12px', color: 'white', outline: 'none' }}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div style={{ padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', fontSize: '0.875rem', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                            {error}
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Hesap Oluştur'}
                        {!loading && <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Zaten bir hesabınız var mı? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Giriş Yap</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
