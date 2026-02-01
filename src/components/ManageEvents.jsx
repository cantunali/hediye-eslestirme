import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, ChevronDown, LayoutDashboard, PlusCircle, ArrowRight } from 'lucide-react';
import { db } from '../services/supabase';

const ManageEvents = ({ onEventSelected, onGoToCreate }) => {
    const [availableEvents, setAvailableEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTitle, setSelectedTitle] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await db.getEvents();
                if (data) {
                    const sorted = [...data].sort((a, b) => a.title.localeCompare(b.title));
                    setAvailableEvents(sorted);
                }
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const handleAccess = async (e) => {
        e.preventDefault();
        if (!selectedTitle) {
            setError('Lütfen bir etkinlik seçin.');
            return;
        }
        setError('');
        setIsVerifying(true);

        try {
            const { success, event } = await db.verifyEventPassword(selectedTitle, email, password);
            if (success) {
                onEventSelected({
                    id: event.id,
                    title: event.title,
                    owner: event.owner_name,
                    email: event.owner_email,
                    password: event.password
                });
            } else {
                setError('Hatalı şifre.');
            }
        } catch (err) {
            setError('Bağlantı hatası.');
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="section container animate-fade-in" style={{ maxWidth: '800px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* Create New Event Card */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '3rem 2rem' }}>
                    <div style={{ width: '64px', height: '64px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <PlusCircle size={32} style={{ color: 'var(--secondary)' }} />
                    </div>
                    <h3>Yeni Etkinlik Başlat</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Henüz bir etkinliğiniz yoksa buradan yeni bir tane oluşturun.</p>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onGoToCreate}>
                        Oluşturmaya Başla <ArrowRight size={20} />
                    </button>
                </div>

                {/* Manage Existing Event Card */}
                <div className="card" style={{ padding: '3rem 2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <LayoutDashboard size={32} style={{ color: 'var(--primary)' }} />
                        </div>
                        <h3>Mevcut Etkinliği Yönet</h3>
                    </div>

                    <form onSubmit={handleAccess} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Etkinlik Seçin</label>
                            <div style={{ position: 'relative' }}>
                                <select
                                    className="glass"
                                    style={{ width: '100%', padding: '0.75rem', color: 'white', borderRadius: '10px', outline: 'none', appearance: 'none', backgroundColor: 'var(--card-bg)' }}
                                    value={selectedTitle}
                                    onChange={(e) => setSelectedTitle(e.target.value)}
                                    disabled={isLoading}
                                >
                                    <option value="">{isLoading ? 'Yükleniyor...' : 'Seçiniz'}</option>
                                    {availableEvents.map(ev => <option key={ev.id} value={ev.title} style={{ background: '#1e293b' }}>{ev.title}</option>)}
                                </select>
                                <ChevronDown size={18} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>E-posta Adresi</label>
                            <input
                                type="email"
                                className="glass"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', color: 'white', outline: 'none' }}
                                placeholder="ornek@mail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Yönetici Şifresi</label>
                            <input
                                type="password"
                                className="glass"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', color: 'white', outline: 'none' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center' }}>{error}</p>}

                        <button type="submit" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} disabled={isVerifying || isLoading}>
                            {isVerifying ? 'Doğrulanıyor...' : 'Panele Giriş Yap'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageEvents;
