import React, { useState } from 'react';
import { User, Lock, Trash2, ShieldCheck, ArrowLeft, Save, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, updateProfile, updatePassword, deactivateAccount } = useAuth();
    const navigate = useNavigate();

    const [fullname, setFullname] = useState(user?.fullname || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const { error } = await updateProfile({ fullname });
            if (error) throw error;
            setMessage({ type: 'success', text: 'Profil başarıyla güncellendi.' });
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Hata oluştu.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        // Manual password check for this demo/manual auth setup
        if (currentPassword !== user?.password) {
            setMessage({ type: 'error', text: 'Mevcut şifreniz hatalı.' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Yeni şifreler uyuşmuyor.' });
            return;
        }

        if (newPassword === currentPassword) {
            setMessage({ type: 'error', text: 'Yeni şifre eskisiyle aynı olamaz.' });
            return;
        }

        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const { error } = await updatePassword(newPassword);
            if (error) throw error;
            setMessage({ type: 'success', text: 'Şifre başarıyla güncellendi.' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Hata oluştu.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        setIsLoading(true);
        try {
            const { error } = await deactivateAccount();
            if (error) throw error;
            navigate('/');
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Hesap kapatılırken hata oluştu.' });
            setIsLoading(false);
        }
    };

    return (
        <div className="section container animate-fade-in" style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
            <Helmet>
                <title>HediyeEşle - Profilim</title>
            </Helmet>

            <button
                className="btn btn-outline"
                onClick={() => navigate('/yonetim')}
                style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                <ArrowLeft size={18} /> Geri Dön
            </button>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Profil <span className="gradient-text">Ayarları</span></h1>
                <p style={{ color: 'var(--text-muted)' }}>Kişisel bilgilerinizi ve hesap güvenliğinizi buradan yönetin.</p>
            </div>

            {message.text && (
                <div style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: message.type === 'success' ? '#22c55e' : '#ef4444',
                    border: `1px solid ${message.type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                }}>
                    {message.text}
                </div>
            )}

            <div style={{ display: 'grid', gap: '2rem' }}>
                {/* Personal Info */}
                <section className="card" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <User size={20} style={{ color: 'var(--primary)' }} /> Kişisel Bilgiler
                    </h2>
                    <form onSubmit={handleUpdateProfile}>
                        <div className="form-group">
                            <label>Ad Soyad</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>E-posta Adresi</label>
                            <input
                                type="email"
                                className="form-control"
                                value={user?.email || ''}
                                disabled
                                style={{ opacity: 0.6, cursor: 'not-allowed' }}
                            />
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                E-posta adresi değiştirilemez.
                            </p>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ marginTop: '0.5rem' }}>
                            <Save size={18} /> Bilgileri Güncelle
                        </button>
                    </form>
                </section>

                {/* Password Change */}
                <section className="card" style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Lock size={20} style={{ color: 'var(--secondary)' }} /> Şifre Değiştir
                    </h2>
                    <form onSubmit={handleUpdatePassword}>
                        <div className="form-group">
                            <label>Mevcut Şifre</label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    className="form-control"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    style={{ paddingRight: '3rem' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                >
                                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Yeni Şifre</label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    placeholder="••••••••"
                                    style={{ paddingRight: '3rem' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Yeni Şifre (Tekrar)</label>
                            <div style={{ position: 'relative', width: '100%' }}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    style={{ paddingRight: '3rem' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-outline" disabled={isLoading} style={{ marginTop: '0.5rem' }}>
                            Şifreyi Güncelle
                        </button>
                    </form>
                </section>

                {/* Account Deletion */}
                <section className="card" style={{ padding: '2rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444' }}>
                        <Trash2 size={20} /> Hesabı Kapat
                    </h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                        Hesabınızı kapattığınızda verileriniz dondurulur ve sisteme erişiminiz kesilir. Bu işlem geri alınabilir değildir.
                    </p>

                    {!showDeleteConfirm ? (
                        <button
                            className="btn btn-outline"
                            style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                            onClick={() => setShowDeleteConfirm(true)}
                        >
                            Hesabımı Kapat
                        </button>
                    ) : (
                        <div className="glass" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                            <p style={{ fontWeight: '600', marginBottom: '1rem', color: '#ef4444' }}>Emin misiniz? Hesabınız pasife alınacaktır.</p>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    className="btn"
                                    style={{ background: '#ef4444', color: 'white' }}
                                    onClick={handleDeleteAccount}
                                    disabled={isLoading}
                                >
                                    Evet, Hesabımı Kapat
                                </button>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setShowDeleteConfirm(false)}
                                    disabled={isLoading}
                                >
                                    Vazgeç
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </div>

            <style>{`
                .form-group {
                    margin-bottom: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    align-items: flex-start;
                }
                .form-group label {
                    font-size: 0.9rem;
                    color: var(--text-muted);
                    font-weight: 500;
                    margin-left: 0.25rem;
                }
                .form-control {
                    width: 100%;
                    padding: 0.85rem 1.25rem;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    color: white;
                    font-size: 1rem;
                    outline: none;
                    transition: all 0.2s ease;
                }
                .form-control:focus {
                    border-color: var(--primary);
                    background: rgba(255, 255, 255, 0.08);
                    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
                }
                .form-control::placeholder {
                    color: rgba(255, 255, 255, 0.2);
                }
                @media (max-width: 480px) {
                    .container {
                        padding: 1rem;
                    }
                    .card {
                        padding: 1.5rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Profile;
