import React, { useState, useEffect } from 'react';
import { db } from '../services/supabase';
import { Users, Calendar, Gift, Activity, ArrowLeft, Shield, ExternalLink, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({ users: 0, events: 0, gifts: 0, guests: 0 });
    const [events, setEvents] = useState([]);
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Auth state for the dashboard specifically
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        if (isAuthorized) {
            fetchAdminData();
        }
    }, [isAuthorized]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Simple hardcoded check - change this to env variables or specific table in production
        if (loginData.username === 'admin' && loginData.password === 'admin123') {
            setIsAuthorized(true);
            setAuthError('');
        } else {
            setAuthError('Geçersiz kullanıcı adı veya şifre.');
        }
    };

    const fetchAdminData = async () => {
        setLoading(true);
        try {
            const [statsRes, eventsRes, activitiesRes] = await Promise.all([
                db.getGlobalStats(),
                db.getAllEvents(20),
                db.getPlatformActivities(15)
            ]);

            if (statsRes.error) throw statsRes.error;
            setStats(statsRes);
            setEvents(eventsRes.data || []);
            setActivities(activitiesRes.data || []);
        } catch (err) {
            console.error('Admin Fetch Error:', err);
            setError('Veriler yüklenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthorized) {
        return (
            <div className="section container" style={{ maxWidth: '450px', margin: '4rem auto' }}>
                <div className="card animate-fade-in" style={{ padding: '3rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <Shield size={32} style={{ color: 'var(--primary)' }} />
                        </div>
                        <h2>Admin Girişi</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Bu alana erişim için yetki gereklidir.</p>
                    </div>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Kullanıcı Adı</label>
                            <input
                                type="text"
                                className="glass"
                                style={{ width: '100%', padding: '0.85rem 1rem' }}
                                value={loginData.username}
                                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Şifre</label>
                            <input
                                type="password"
                                className="glass"
                                style={{ width: '100%', padding: '0.85rem 1rem' }}
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                required
                            />
                        </div>

                        {authError && (
                            <div style={{ color: '#ef4444', fontSize: '0.85rem', textAlign: 'center' }}>
                                {authError}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
                            Giriş Yap <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                    </form>

                    <button
                        className="btn btn-outline"
                        style={{ width: '100%', marginTop: '1rem', justifyContent: 'center' }}
                        onClick={() => navigate('/')}
                    >
                        Siteye Dön
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="section container" style={{ textAlign: 'center', padding: '100px' }}>
                <div className="loader"></div>
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Sistem verileri yükleniyor...</p>
            </div>
        );
    }

    return (
        <div className="section container animate-fade-in" style={{ padding: '2rem' }}>
            <Helmet>
                <title>HediyeEşle - Sistem Admin Paneli</title>
            </Helmet>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Shield style={{ color: 'var(--primary)' }} /> Sistem <span className="gradient-text">Yönetimi</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Platform genel verileri ve aktivite takibi.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline" onClick={() => setIsAuthorized(false)}>
                        Güvenli Çıkış
                    </button>
                    <button className="btn btn-outline" onClick={() => navigate('/')}>
                        <ArrowLeft size={18} /> Siteye Dön
                    </button>
                </div>
            </div>

            {error && (
                <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid #ef4444', color: '#ef4444', textAlign: 'center' }}>
                    {error}
                </div>
            )}

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                <div className="card" style={{ textAlign: 'center', borderBottom: '4px solid var(--primary)' }}>
                    <Users size={32} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2.5rem' }}>{stats.users}</h2>
                    <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}>Sistem Kullanıcısı</p>
                </div>
                <div className="card" style={{ textAlign: 'center', borderBottom: '4px solid var(--secondary)' }}>
                    <Calendar size={32} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2.5rem' }}>{stats.events}</h2>
                    <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}>Oluşturulan Etkinlik</p>
                </div>
                <div className="card" style={{ textAlign: 'center', borderBottom: '4px solid var(--accent)' }}>
                    <Gift size={32} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2.5rem' }}>{stats.gifts}</h2>
                    <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}>Toplam Hediye</p>
                </div>
                <div className="card" style={{ textAlign: 'center', borderBottom: '4px solid #4ade80' }}>
                    <Shield size={32} style={{ color: '#4ade80', marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '2.5rem' }}>{stats.guests}</h2>
                    <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}>Kayıtlı Davetli</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem' }}>
                {/* Events Management */}
                <div className="card" style={{ padding: '0' }}>
                    <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Calendar size={20} style={{ color: 'var(--primary)' }} /> Son Etkinlikler
                        </h3>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Son 20 Kayıt</span>
                    </div>
                    <div style={{ maxHeight: '500px', overflowY: 'auto', padding: '1rem' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                    <th style={{ padding: '1rem' }}>Başlık</th>
                                    <th style={{ padding: '1rem' }}>Sahibi</th>
                                    <th style={{ padding: '1rem' }}>Tarih</th>
                                    <th style={{ padding: '1rem' }}>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event) => (
                                    <tr key={event.id} style={{ borderTop: '1px solid var(--border)', fontSize: '0.9rem' }}>
                                        <td style={{ padding: '1.25rem' }}>
                                            <span style={{ fontWeight: '600' }}>{event.title}</span>
                                        </td>
                                        <td style={{ padding: '1.25rem' }}>
                                            <div>{event.owner_name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{event.owner_email}</div>
                                        </td>
                                        <td style={{ padding: '1.25rem' }}>
                                            {event.event_date ? new Date(event.event_date).toLocaleDateString('tr-TR') : '-'}
                                        </td>
                                        <td style={{ padding: '1.25rem' }}>
                                            <button
                                                className="btn-outline"
                                                style={{ padding: '0.4rem', borderRadius: '8px' }}
                                                title="Detaylar (Geliştirme Aşamasında)"
                                            >
                                                <ExternalLink size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Global Activity Feed */}
                <div className="card" style={{ padding: '0' }}>
                    <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Activity size={20} style={{ color: 'var(--secondary)' }} /> Global Hareketler
                        </h3>
                    </div>
                    <div style={{ padding: '1rem', maxHeight: '500px', overflowY: 'auto' }}>
                        {activities.length > 0 ? (
                            activities.map((act) => (
                                <div key={act.id} style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
                                    <div style={{ color: 'var(--secondary)', paddingTop: '0.25rem' }}><Clock size={16} /></div>
                                    <div>
                                        <p style={{ fontSize: '0.95rem', marginBottom: '0.4rem', lineHeight: '1.5' }}>
                                            <strong style={{ color: 'var(--primary)' }}>[{act.events?.title || 'Bilinmeyen'}]</strong> {act.content}
                                        </p>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            {new Date(act.created_at).toLocaleString('tr-TR')}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Henüz bir hareket bulunmuyor.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
