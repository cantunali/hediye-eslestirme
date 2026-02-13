import React, { useState } from 'react';
import { Calendar, User, Lock, ArrowRight, Sparkles, AlertCircle, Eye, EyeOff, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { db } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

const CreateEvent = ({ onCreated }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        event_date: '',
        event_type: 'Evlilik - Ev Hediyesi'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.title && formData.event_date) {
            setIsChecking(true);
            setError('');

            try {
                const { exists, error: dbError } = await db.checkEventTitleExists(formData.title);

                if (exists) {
                    setError('Bu etkinlik adı zaten kullanılıyor. Lütfen başka bir ad seçin.');
                    setIsChecking(false);
                    return;
                }

                // Create the event in Supabase with user_id and owner details
                const eventPayload = {
                    ...formData,
                    owner_name: user.fullname || user.email.split('@')[0],
                    owner_email: user.email,
                    password: '123', // Default guest password if not asked
                    user_id: user.id
                };

                const { data, error: createError } = await db.createEvent(eventPayload);

                if (createError) {
                    console.error('Create Error:', createError);
                    setError('Etkinlik oluşturulurken bir hata oluştu: ' + createError.message);
                    setIsChecking(false);
                    return;
                }

                if (data) {
                    onCreated({ ...eventPayload, id: data.id });
                } else {
                    throw new Error('Veri dönerken bir hata oluştu.');
                }
            } catch (err) {
                console.error('Submit Error:', err);
                setError('Bir hata oluştu: ' + (err.message || 'Lütfen bağlantınızı kontrol edin.'));
            } finally {
                setIsChecking(false);
            }
        }
    };

    return (
        <div className="section container animate-fade-in" style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
            <Helmet>
                <title>HediyeEşle - Etkinlik Oluştur</title>
                <meta name="description" content="Yeni bir hediye eşleşme etkinliği oluşturun. Düğün, doğum günü veya özel günleriniz için hediye listesi hazırlayın." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(99, 102, 241, 0.1)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <Sparkles size={40} style={{ color: 'var(--primary)' }} />
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Yeni Etkinlik Oluştur</h2>
                <p style={{ color: 'var(--text-muted)' }}>Hayallerindeki etkinliği planlamaya başla.</p>
            </div>

            {error && (
                <div className="glass" style={{
                    padding: '1rem',
                    marginBottom: '2rem',
                    borderColor: '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'rgba(239, 68, 68, 0.05)'
                }}>
                    <AlertCircle size={20} style={{ color: '#ef4444' }} />
                    <span style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.75rem', fontWeight: '500' }}>Etkinliğin Adı</label>
                    <div style={{ position: 'relative' }}>
                        <Calendar size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            className="glass"
                            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', color: 'white', borderRadius: '12px', outline: 'none' }}
                            placeholder="Örn: Ahmet & Ayşe Düğünü"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            disabled={isChecking}
                        />
                    </div>
                </div>

                <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.75rem', fontWeight: '500' }}>Etkinlik Tipi</label>
                    <div style={{ position: 'relative' }}>
                        <Sparkles size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <select
                            className="glass"
                            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', color: 'white', borderRadius: '12px', outline: 'none', background: 'var(--card-bg)', appearance: 'none' }}
                            value={formData.event_type}
                            onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                            required
                            disabled={isChecking}
                        >
                            <option value="Evlilik - Ev Hediyesi">Evlilik - Ev Hediyesi</option>
                            <option value="Kız Bebek Hediyesi">Kız Bebek Hediyesi</option>
                            <option value="Erkek Bebek Hediyesi">Erkek Bebek Hediyesi</option>
                            <option value="Doğum Günü Hediyesi">Doğum Günü Hediyesi</option>
                        </select>
                        <ChevronDown size={20} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
                    </div>
                </div>

                <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.75rem', fontWeight: '500' }}>Etkinlik Tarihi</label>
                    <div style={{ position: 'relative' }}>
                        <Calendar size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="date"
                            className="glass"
                            style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', color: 'white', borderRadius: '12px', outline: 'none' }}
                            value={formData.event_date}
                            onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                            required
                            disabled={isChecking}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: '1.25rem', justifyContent: 'center', fontSize: '1.125rem' }}
                    disabled={isChecking}
                >
                    {isChecking ? 'Kontrol Ediliyor...' : 'Planlamaya Geç'}
                    {!isChecking && <ArrowRight size={22} />}
                </button>
            </form>

            <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <p>Yönetim sayfasına geçerek davetli ve hediye listesini düzenleyebilirsiniz.</p>
            </div>
        </div>

    );
};

export default CreateEvent;
