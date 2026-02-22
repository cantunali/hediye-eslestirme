import React, { useState, useEffect } from 'react';
import { db } from '../services/supabase';
import { Users, Calendar, Gift, Activity, ArrowLeft, Shield, ExternalLink, Clock, FileSpreadsheet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { slugify } from '../utils/helpers';
import * as XLSX from 'xlsx';

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
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Password change state
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
    const [passError, setPassError] = useState('');
    const [passSuccess, setPassSuccess] = useState('');
    const [isUpdatingPass, setIsUpdatingPass] = useState(false);

    useEffect(() => {
        if (isAuthorized) {
            fetchAdminData();
        }
    }, [isAuthorized]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthError('');
        setIsLoggingIn(true);

        try {
            // Username is still 'admin' for now, but password is dynamic
            if (loginData.username !== 'admin') {
                setAuthError('Geçersiz kullanıcı adı.');
                return;
            }

            const { success, error } = await db.verifyAdminPassword(loginData.password);
            if (success) {
                setIsAuthorized(true);
            } else {
                setAuthError(error ? 'Sistem hatası.' : 'Geçersiz şifre.');
            }
        } catch (err) {
            console.error('Login Error:', err);
            setAuthError('Giriş yapılırken bir hata oluştu.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPassError('');
        setPassSuccess('');

        if (passwords.new !== passwords.confirm) {
            setPassError('Yeni şifreler uyuşmuyor.');
            return;
        }

        if (passwords.new.length < 6) {
            setPassError('Yeni şifre en az 6 karakter olmalıdır.');
            return;
        }

        setIsUpdatingPass(true);
        try {
            // First verify current password
            const { success } = await db.verifyAdminPassword(passwords.current);
            if (!success) {
                setPassError('Mevcut şifre hatalı.');
                return;
            }

            // Update password
            const { error } = await db.updateAdminPassword(passwords.new);
            if (error) throw error;

            setPassSuccess('Şifre başarıyla güncellendi.');
            setPasswords({ current: '', new: '', confirm: '' });
        } catch (err) {
            console.error('Update Password Error:', err);
            setPassError('Şifre güncellenirken bir hata oluştu.');
        } finally {
            setIsUpdatingPass(false);
        }
    };

    const fetchAdminData = async () => {
        setLoading(true);
        try {
            const [statsRes, eventsRes, activitiesRes] = await Promise.all([
                db.getGlobalStats(),
                db.getAllEvents(50),
                db.getPlatformActivities(100)
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

    const exportEventsToExcel = () => {
        if (!events || events.length === 0) return;

        const worksheet = XLSX.utils.json_to_sheet(events.map(e => ({
            'Başlık': e.title,
            'Sahibi': e.owner_name,
            'E-posta': e.owner_email,
            'Etkinlik Tarihi': e.event_date ? new Date(e.event_date).toLocaleDateString('tr-TR') : '-',
            'Oluşturulma': new Date(e.created_at).toLocaleDateString('tr-TR'),
            'Tip': e.event_type || 'Evlilik'
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Etkinlikler");
        XLSX.writeFile(workbook, `Sistem_Etkinlik_Listesi_${new Date().toLocaleDateString('tr-TR')}.xlsx`);
    };

    const exportActivitiesToExcel = () => {
        if (!activities || activities.length === 0) return;

        const worksheet = XLSX.utils.json_to_sheet(activities.map(a => ({
            'Tarih': new Date(a.created_at).toLocaleString('tr-TR'),
            'Etkinlik': a.events?.title || 'Bilinmeyen',
            'İçerik': a.content
        })));

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Hareketler");
        XLSX.writeFile(workbook, `Sistem_Hareket_Loglari_${new Date().toLocaleDateString('tr-TR')}.xlsx`);
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

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? 'Kontrol Ediliyor...' : 'Giriş Yap'} <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
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
        <div className="section container animate-fade-in" style={{ padding: '1.5rem 1rem' }}>
            <Helmet>
                <title>HediyeEşle - Sistem Admin Paneli</title>
            </Helmet>

            <div className="admin-header" style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2.5rem',
                gap: '1.5rem'
            }}>
                <div>
                    <h1 className="hero-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
                        <Shield style={{ color: 'var(--primary)' }} /> Sistem <span className="gradient-text">Yönetimi</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.9rem' }}>Platform genel verileri ve aktivite takibi.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%', maxWidth: '400px' }} className="mobile-only-stack">
                    <button className="btn btn-outline" style={{ flex: 1, padding: '0.75rem' }} onClick={() => setIsAuthorized(false)}>
                        Güvenli Çıkış
                    </button>
                    <button className="btn btn-outline" style={{ flex: 1, padding: '0.75rem' }} onClick={() => navigate('/')}>
                        <ArrowLeft size={18} /> Siteye Dön
                    </button>
                </div>
            </div>

            {error && (
                <div className="glass" style={{ padding: '1rem', marginBottom: '2rem', border: '1px solid #ef4444', color: '#ef4444', textAlign: 'center', fontSize: '0.9rem' }}>
                    {error}
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid-mobile-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="card" style={{ textAlign: 'center', borderBottom: '4px solid var(--primary)', padding: '1.5rem' }}>
                    <Users size={28} style={{ color: 'var(--primary)', marginBottom: '0.75rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{stats.users}</h2>
                    <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>Kullanıcı</p>
                </div>
                <div className="card" style={{ textAlign: 'center', borderBottom: '4px solid var(--secondary)', padding: '1.5rem' }}>
                    <Calendar size={28} style={{ color: 'var(--secondary)', marginBottom: '0.75rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{stats.events}</h2>
                    <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>Etkinlik</p>
                </div>
                <div className="card" style={{ textAlign: 'center', borderBottom: '4px solid var(--accent)', padding: '1.5rem' }}>
                    <Gift size={28} style={{ color: 'var(--accent)', marginBottom: '0.75rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{stats.gifts}</h2>
                    <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>Hediye</p>
                </div>
                <div className="card" style={{ textAlign: 'center', borderBottom: '4px solid #4ade80', padding: '1.5rem' }}>
                    <Shield size={28} style={{ color: '#4ade80', marginBottom: '0.75rem' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{stats.guests}</h2>
                    <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: 'bold', letterSpacing: '0.05em' }}>Davetli</p>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
                gap: '2rem'
            }}>
                {/* Events Management */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                            <Calendar size={18} style={{ color: 'var(--primary)' }} /> Son Etkinlikler
                        </h3>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
                            <thead>
                                <tr style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    <th style={{ padding: '1rem' }}>Başlık</th>
                                    <th style={{ padding: '1rem' }}>Sahibi</th>
                                    <th style={{ padding: '1rem' }}>Tarih</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event) => (
                                    <tr key={event.id} style={{ borderTop: '1px solid var(--border)', fontSize: '0.85rem' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ fontWeight: '600' }}>{event.title}</span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div>{event.owner_name}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{event.owner_email}</div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            {event.event_date ? new Date(event.event_date).toLocaleDateString('tr-TR') : '-'}
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <button
                                                className="btn-outline"
                                                style={{ padding: '0.4rem', borderRadius: '8px' }}
                                                onClick={() => window.open(`/davetli-girisi/${slugify(event.title)}`, '_blank')}
                                            >
                                                <ExternalLink size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                        <button
                            className="btn btn-secondary"
                            style={{ fontSize: '0.85rem', width: '100%', justifyContent: 'center' }}
                            onClick={exportEventsToExcel}
                        >
                            <FileSpreadsheet size={16} /> Tüm Etkinlikleri Excel'e Aktar
                        </button>
                    </div>
                </div>

                {/* Global Activity Feed */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                            <Activity size={18} style={{ color: 'var(--secondary)' }} /> Hareketler
                        </h3>
                    </div>
                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        {activities.length > 0 ? (
                            activities.map((act) => (
                                <div key={act.id} style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', gap: '1rem' }}>
                                    <div style={{ color: 'var(--secondary)', paddingTop: '0.2rem' }}><Clock size={14} /></div>
                                    <div>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '0.3rem', lineHeight: '1.5' }}>
                                            <strong style={{ color: 'var(--primary)', fontSize: '0.8rem' }}>[{act.events?.title || 'Bilinmeyen'}]</strong> {act.content}
                                        </p>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                            {new Date(act.created_at).toLocaleString('tr-TR')}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Henüz bir hareket bulunmuyor.</p>
                        )}
                    </div>
                    <div style={{ padding: '1rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                        <button
                            className="btn btn-secondary"
                            style={{ fontSize: '0.85rem', width: '100%', justifyContent: 'center' }}
                            onClick={exportActivitiesToExcel}
                        >
                            <FileSpreadsheet size={16} /> Tüm Hareketleri Excel'e Aktar
                        </button>
                    </div>
                </div>
            </div>

            {/* Admin Password Change Section */}
            <div className="card shadow-soft" style={{ marginTop: '3rem', padding: '2rem', maxWidth: '600px', margin: '3rem auto 0' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                    <Shield size={20} style={{ color: 'var(--primary)' }} /> Yönetici Şifresini Değiştir
                </h3>
                <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mevcut Şifre</label>
                            <input
                                type="password"
                                className="glass"
                                style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.9rem' }}
                                value={passwords.current}
                                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Yeni Şifre</label>
                            <input
                                type="password"
                                className="glass"
                                style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.9rem' }}
                                value={passwords.new}
                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Yeni Şifre (Tekrar)</label>
                        <input
                            type="password"
                            className="glass"
                            style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '0.9rem' }}
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                            required
                        />
                    </div>

                    {passError && <div style={{ color: '#ef4444', fontSize: '0.85rem' }}>{passError}</div>}
                    {passSuccess && <div style={{ color: '#4ade80', fontSize: '0.85rem' }}>{passSuccess}</div>}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem' }}
                        disabled={isUpdatingPass}
                    >
                        {isUpdatingPass ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminDashboard;
