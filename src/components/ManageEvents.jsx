
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ShieldCheck, ChevronDown, LayoutDashboard, PlusCircle, ArrowRight, UserPlus, Pencil, Search, X, Calendar, User, Link as LinkIcon, Copy, Check, MessageCircle, Twitter, Share2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { db } from '../services/supabase';
import { useAuth } from '../context/AuthContext';

const ManageEvents = ({ onEventSelected, onGoToCreate }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [userEvents, setUserEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserEvents = async () => {
            if (!user) return;
            try {
                const { data, error: fetchError } = await db.getUserEvents(user.id);
                if (fetchError) throw fetchError;
                if (data) {
                    setUserEvents(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
                }
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Etkinlikler yüklenirken bir hata oluştu.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserEvents();
    }, [user]);

    const slugify = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');
    };

    const [copiedId, setCopiedId] = useState(null);

    const handleCopyLink = (e, event) => {
        if (e) e.stopPropagation();
        const slug = slugify(event.title);
        const url = `${window.location.origin}/davetli-girisi/${slug}`;

        navigator.clipboard.writeText(url).then(() => {
            setCopiedId(event.id);
            setTimeout(() => setCopiedId(null), 2000);
        });
    };

    const handleShare = (e, platform, event) => {
        e.stopPropagation();
        const slug = slugify(event.title);
        const url = `${window.location.origin}/davetli-girisi/${slug}`;
        const text = `${event.title} etkinliğimizin hediye listesine buradan ulaşabilirsiniz: `;

        switch (platform) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(text + url)}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
                break;
            case 'share':
                if (navigator.share) {
                    navigator.share({
                        title: event.title,
                        text: text,
                        url: url,
                    }).catch(console.error);
                } else {
                    handleCopyLink(null, event);
                }
                break;
            default:
                break;
        }
    };

    const handleSelectEvent = (event) => {
        onEventSelected({
            id: event.id,
            title: event.title,
            owner: event.owner_name,
            email: event.owner_email,
            password: event.password,
            event_date: event.event_date,
            event_type: event.event_type
        });
    };

    return (
        <div className="section container animate-fade-in" style={{ maxWidth: '1000px', margin: '2rem auto', padding: '2rem' }}>
            <Helmet>
                <title>HediyeEşle - Etkinliklerim</title>
                <meta name="description" content="Mevcut etkinliklerinizi yönetin veya yeni bir etkinlik oluşturun." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>Etkinlik Yönetimi</h1>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>Hesabınıza bağlı tüm etkinlikleri buradan yönetebilirsiniz.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 3fr', gap: '2rem', alignItems: 'start' }} className="manage-grid">
                {/* Sidebar Actions */}
                <aside className="card" style={{ padding: '1.5rem', position: 'sticky', top: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', padding: '0 0.5rem' }}>İşlemler</h3>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => navigate('/profil')}>
                            <User size={20} /> Profilim
                        </button>
                        <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={onGoToCreate}>
                            <PlusCircle size={20} /> Yeni Etkinlik Başlat
                        </button>
                    </nav>
                </aside>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {isLoading ? (
                        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
                            <div className="animate-spin" style={{ margin: '0 auto 1rem' }}>
                                <LayoutDashboard size={40} style={{ color: 'var(--primary)', opacity: 0.5 }} />
                            </div>
                            <p>Etkinlikleriniz yükleniyor...</p>
                        </div>
                    ) : userEvents.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Etkinlikleriniz ({userEvents.length})</h2>
                            {userEvents.map(event => (
                                <div
                                    key={event.id}
                                    className="card glass hover-scale"
                                    style={{
                                        padding: '1.5rem 2rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        border: '1px solid rgba(255,255,255,0.05)'
                                    }}
                                    onClick={() => handleSelectEvent(event)}
                                >
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{event.title}</h3>
                                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <Calendar size={14} /> {new Date(event.event_date).toLocaleDateString('tr-TR')}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <ShieldCheck size={14} /> {event.owner_name}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '0.25rem', borderRight: '1px solid var(--border)', paddingRight: '0.75rem', marginRight: '0.25rem' }}>
                                            <button
                                                className="btn-icon"
                                                onClick={(e) => handleShare(e, 'whatsapp', event)}
                                                title="WhatsApp'ta Paylaş"
                                                style={{ color: '#25D366' }}
                                            >
                                                <MessageCircle size={18} />
                                            </button>
                                            <button
                                                className="btn-icon"
                                                onClick={(e) => handleShare(e, 'twitter', event)}
                                                title="Twitter'da Paylaş"
                                                style={{ color: '#1DA1F2' }}
                                            >
                                                <Twitter size={18} />
                                            </button>
                                            <button
                                                className="btn-icon"
                                                onClick={(e) => handleShare(e, 'share', event)}
                                                title="Paylaş"
                                                style={{ color: 'var(--primary)' }}
                                            >
                                                <Share2 size={18} />
                                            </button>
                                        </div>
                                        <button
                                            className="btn btn-outline"
                                            style={{
                                                padding: '0.5rem 1rem',
                                                borderColor: copiedId === event.id ? '#4ade80' : 'var(--border)',
                                                color: copiedId === event.id ? '#4ade80' : 'var(--text)',
                                                fontSize: '0.875rem'
                                            }}
                                            onClick={(e) => handleCopyLink(e, event)}
                                            title="Davet Linkini Kopyala"
                                        >
                                            {copiedId === event.id ? <Check size={16} /> : <LinkIcon size={16} />}
                                            {copiedId === event.id ? ' Kopyalandı' : ' Linki Kopyala'}
                                        </button>
                                        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                            Yönet <Pencil size={16} style={{ marginLeft: '0.5rem' }} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card" style={{ textAlign: 'center', padding: '4rem', background: 'rgba(99, 102, 241, 0.05)' }}>
                            <div style={{ marginBottom: '1.5rem', opacity: 0.3 }}>
                                <PlusCircle size={64} style={{ color: 'var(--primary)' }} />
                            </div>
                            <h3>Henüz bir etkinliğiniz yok</h3>
                            <p style={{ color: 'var(--text-muted)', margin: '1rem auto 2rem', maxWidth: '400px' }}>
                                İlk etkinliğinizi hemen oluşturun ve hediye listenizi hazırlamaya başlayın.
                            </p>
                            <button className="btn btn-primary" onClick={onGoToCreate} style={{ padding: '0.85rem 2rem' }}>
                                Yeni Etkinlik Başlat <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .hover-scale {
                    transition: all 0.2s ease;
                }
                .hover-scale:hover {
                    transform: translateY(-2px);
                    background: rgba(255, 255, 255, 0.03);
                    border-color: var(--primary) !important;
                }
                .btn-icon {
                    background: none;
                    border: none;
                    padding: 0.5rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    transition: background 0.2s ease;
                }
                .btn-icon:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
                @media (max-width: 768px) {
                    .manage-grid {
                        grid-template-columns: 1fr !important;
                    }
                    aside {
                        position: static !important;
                        order: 2;
                    }
                }
            `}</style>
        </div>
    );
};

export default ManageEvents;
