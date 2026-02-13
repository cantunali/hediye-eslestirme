import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Gift, Users, ShieldCheck, Lock, X, CheckCircle2, ChevronDown, ExternalLink, ShoppingCart, CreditCard, Landmark, Search, PlusCircle, UserPlus, Pencil, LayoutDashboard, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { db } from '../services/supabase';

const STANDARD_CATEGORIES = ['Hepsi', 'Aksesuar', 'Elektronik', 'Ev Gereçleri', 'Mutfak', 'Tekstil', 'Züccaciye'];

const GuestPortal = ({ gifts, guests, onSelectGift, onCreateGroup }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ title: '', email: '' });
    const [currentGuest, setCurrentGuest] = useState(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [loginError, setLoginError] = useState('');

    const [availableEvents, setAvailableEvents] = useState([]);
    const [isLoadingEvents, setIsLoadingEvents] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [selectedGift, setSelectedGift] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentData, setPaymentData] = useState({ amount: '', cardNumber: '', expiry: '', cvv: '', cardHolder: '' });
    const [isPaying, setIsPaying] = useState(false);

    const [eventGifts, setEventGifts] = useState([]);
    const [eventGuests, setEventGuests] = useState([]);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Hepsi');

    const categories = useMemo(() => {
        const cats = new Set(STANDARD_CATEGORIES);
        // Also add any custom categories that might exist in the data
        eventGifts.forEach(gift => {
            if (gift.category && !STANDARD_CATEGORIES.includes(gift.category)) {
                cats.add(gift.category);
            }
        });

        const catsArray = Array.from(cats);
        const others = catsArray.filter(c => c !== 'Hepsi').sort((a, b) => a.localeCompare(b, 'tr'));
        return ['Hepsi', ...others];
    }, [eventGifts]);

    const filteredGifts = useMemo(() => {
        return eventGifts.filter(gift => {
            if (activeCategory === 'Hepsi') return true;
            return gift.category === activeCategory;
        });
    }, [eventGifts, activeCategory]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data, error } = await db.getEvents();
                if (data) {
                    const sorted = [...data].sort((a, b) => a.title.localeCompare(b.title));
                    setAvailableEvents(sorted);
                }
            } catch (err) {
                console.error('Events fetch error:', err);
            } finally {
                setIsLoadingEvents(false);
            }
        };
        fetchEvents();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredEvents = availableEvents.filter(ev =>
        ev.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectEvent = (title) => {
        setLoginData({ ...loginData, title });
        setSearchTerm(title);
        setIsDropdownOpen(false);
    };

    const [termsConsent, setTermsConsent] = useState(false);
    const [kvkkConsent, setKvkkConsent] = useState(false);
    const [marketingConsent, setMarketingConsent] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!termsConsent || !kvkkConsent) {
            setLoginError('Lütfen Kullanıcı Sözleşmesi ve KVKK metnini onaylayın.');
            return;
        }

        if (!loginData.title) {
            setLoginError('Lütfen bir etkinlik seçin.');
            return;
        }

        setLoginError('');
        setIsLoggingIn(true);

        try {
            const { success, guest, eventId, error } = await db.verifyGuestLogin(loginData.title, loginData.email);

            if (success) {
                // Record guest consents
                if (guest?.id) {
                    await db.recordGuestConsents(guest.id, {
                        terms: termsConsent,
                        kvkk: kvkkConsent,
                        marketing: marketingConsent
                    });
                }

                setCurrentEvent({ id: eventId, title: loginData.title });
                setCurrentGuest(guest);
                setIsLoggedIn(true);
                fetchEventData(eventId);
            } else {
                setLoginError(error || 'Hatalı giriş bilgileri.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setLoginError('Bağlantı hatası oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const fetchEventData = async (eventId) => {
        setIsLoadingData(true);
        try {
            const [giftsRes, guestsRes] = await Promise.all([
                db.getGifts(eventId),
                db.getGuests(eventId)
            ]);

            if (giftsRes.data) {
                const sortedGifts = [...giftsRes.data].sort((a, b) => {
                    if (a.status === 'available' && b.status !== 'available') return -1;
                    if (a.status !== 'available' && b.status === 'available') return 1;
                    return a.name.localeCompare(b.name);
                });
                setEventGifts(sortedGifts);
            }
            if (guestsRes.data) setEventGuests(guestsRes.data);
        } catch (err) {
            console.error('Data fetch error:', err);
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleSelectGift = async (giftId) => {
        const gift = eventGifts.find(g => g.id === giftId);
        const { error } = await db.reserveGift(
            giftId,
            currentGuest.id,
            currentEvent.id,
            `${currentGuest.name} adlı davetli ${gift.name} adlı hediyeyi ayırdı.`
        );
        if (!error) {
            setEventGifts(prev => {
                const updated = prev.map(g => g.id === giftId ? { ...g, status: 'reserved', reserved_by: currentGuest.id } : g);
                return [...updated].sort((a, b) => {
                    if (a.status === 'available' && b.status !== 'available') return -1;
                    if (a.status !== 'available' && b.status === 'available') return 1;
                    return a.name.localeCompare(b.name);
                });
            });
            alert('Hediye başarıyla ayrıldı!');
        }
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        setIsPaying(true);

        setTimeout(async () => {
            const { error } = await db.logActivity(
                currentEvent.id,
                `${currentGuest.name} adlı davetli ${selectedGift.name} için ${paymentData.amount} TL nakit katkıda bulundu.`
            );

            if (!error) {
                setShowPaymentModal(false);
                setSelectedGift(null);
                setPaymentData({ amount: '', cardNumber: '', expiry: '', cvv: '', cardHolder: '' });
                alert('Ödemeniz başarıyla alındı! Katkınız etkinlik sahibine iletildi.');
            }
            setIsPaying(false);
        }, 2000);
    };

    if (!isLoggedIn) {
        return (
            <div className="section container animate-fade-in" style={{ maxWidth: '1000px', margin: '2rem auto', padding: '2rem' }}>
                <Helmet>
                    <title>HediyeEşle - Davetli Girişi</title>
                    <meta name="description" content="HediyeEşle davetli paneline giriş yapın ve sevdiklerinizin hediye listesine ulaşın." />
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '1rem' }}>Davetli Girişi</h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>Etkinliğe girmek için seçiminizi yapın ve bilgilerinizi girin.</p>
                </div>

                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                    {/* Login Card */}
                    <div className="card" style={{ padding: '3rem 2rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <div style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <Lock size={32} style={{ color: 'var(--primary)' }} />
                            </div>
                            <h3>Giriş Yap</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Hediye listesine erişmek için bilgilerinizi doğrulayın.</p>
                        </div>

                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px', margin: '0 auto' }}>
                            {/* Custom Searchable Dropdown */}
                            <div style={{ position: 'relative' }} ref={dropdownRef}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>Etkinlik Ara ve Seç</label>
                                <div style={{ position: 'relative' }}>
                                    <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        className="glass"
                                        style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', color: 'white', borderRadius: '12px', outline: 'none', fontSize: '1rem' }}
                                        placeholder={isLoadingEvents ? 'Yükleniyor...' : 'Etkinlik adını yazın...'}
                                        value={searchTerm}
                                        onFocus={() => setIsDropdownOpen(true)}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setLoginData({ ...loginData, title: '' });
                                            setIsDropdownOpen(true);
                                        }}
                                        disabled={isLoadingEvents}
                                    />
                                    {searchTerm && (
                                        <button
                                            type="button"
                                            onClick={() => { setSearchTerm(''); setLoginData({ ...loginData, title: '' }); }}
                                            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>

                                {isDropdownOpen && !isLoadingEvents && (
                                    <div className="glass shadow-lg" style={{
                                        position: 'absolute',
                                        top: 'calc(100% + 8px)',
                                        left: 0,
                                        right: 0,
                                        maxHeight: '250px',
                                        overflowY: 'auto',
                                        zIndex: 100,
                                        borderRadius: '12px',
                                        background: 'rgba(15, 23, 42, 0.95)',
                                        backdropFilter: 'blur(16px)',
                                        border: '1px solid var(--border)',
                                        animation: 'fadeSlideDown 0.2s ease-out'
                                    }}>
                                        {filteredEvents.length > 0 ? (
                                            filteredEvents.map(ev => (
                                                <div
                                                    key={ev.id}
                                                    onClick={() => handleSelectEvent(ev.title)}
                                                    style={{
                                                        padding: '0.85rem 1.25rem',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                        color: loginData.title === ev.title ? 'var(--primary)' : 'white',
                                                        background: loginData.title === ev.title ? 'rgba(99, 102, 241, 0.1)' : 'transparent'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                                                    onMouseLeave={(e) => e.target.style.background = loginData.title === ev.title ? 'rgba(99, 102, 241, 0.1)' : 'transparent'}
                                                >
                                                    <div style={{ fontSize: '0.95rem', fontWeight: '500' }}>{ev.title}</div>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ev.owner_name}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                                Sonuç bulunamadı...
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>E-posta Adresiniz</label>
                                <input
                                    type="email"
                                    className="glass"
                                    style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', color: 'white', outline: 'none' }}
                                    placeholder="ornek@mail.com"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Legal Checkboxes */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <input
                                        type="checkbox"
                                        id="termsConsent"
                                        checked={termsConsent}
                                        onChange={(e) => setTermsConsent(e.target.checked)}
                                        style={{ marginTop: '0.25rem', accentColor: 'var(--primary)', cursor: 'pointer' }}
                                    />
                                    <label htmlFor="termsConsent" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', cursor: 'pointer' }}>
                                        <Link to="/kullanim-kosullari" target="_blank" style={{ color: 'var(--text)', textDecoration: 'underline' }}>Kullanıcı Sözleşmesini</Link> okudum ve kabul ediyorum.
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <input
                                        type="checkbox"
                                        id="kvkkConsent"
                                        checked={kvkkConsent}
                                        onChange={(e) => setKvkkConsent(e.target.checked)}
                                        style={{ marginTop: '0.25rem', accentColor: 'var(--primary)', cursor: 'pointer' }}
                                    />
                                    <label htmlFor="kvkkConsent" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', cursor: 'pointer' }}>
                                        <Link to="/kvkk" target="_blank" style={{ color: 'var(--text)', textDecoration: 'underline' }}>KVKK Aydınlatma Metnini</Link> okudum ve kabul ediyorum.
                                    </label>
                                </div>

                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <input
                                        type="checkbox"
                                        id="marketingConsent"
                                        checked={marketingConsent}
                                        onChange={(e) => setMarketingConsent(e.target.checked)}
                                        style={{ marginTop: '0.25rem', accentColor: 'var(--primary)', cursor: 'pointer' }}
                                    />
                                    <label htmlFor="marketingConsent" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', cursor: 'pointer' }}>
                                        <Link to="/pazarlama-izni" target="_blank" style={{ color: 'var(--text)', textDecoration: 'underline' }}>Pazarlama İzni Metnini</Link> okudum ve kabul ediyorum.
                                    </label>
                                </div>
                            </div>

                            {loginError && (
                                <div style={{
                                    padding: '0.75rem',
                                    background: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    borderRadius: '8px',
                                    fontSize: '0.875rem',
                                    textAlign: 'center',
                                    border: '1px solid rgba(239, 68, 68, 0.2)'
                                }}>
                                    {loginError}
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.1rem' }} disabled={isLoggingIn || isLoadingEvents || !loginData.title}>
                                {isLoggingIn ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                                {!isLoggingIn && <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />}
                            </button>
                        </form>
                    </div>
                </div>

                <style>{`
                    @keyframes fadeSlideDown {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
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
            </div >
        );
    }


    return (
        <div className="section container animate-fade-in">
            <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem' }}>Hoş Geldiniz, <span className="gradient-text">{currentGuest?.name || 'Davetli'}</span></h2>
                    <p style={{ color: 'var(--text-muted)' }}>Mevcut hediyeleri inceleyebilir veya bir grup kurarak ortak hediye alabilirsiniz.</p>
                </div>
                <button
                    className="btn btn-outline"
                    onClick={() => setIsLoggedIn(false)}
                    style={{ fontSize: '0.875rem' }}
                >
                    Çıkış Yap
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Category Filter */}
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    overflowX: 'auto',
                    paddingBottom: '0.5rem',
                    scrollbarWidth: 'none'
                }} className="no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                            style={{
                                padding: '0.5rem 1.25rem',
                                fontSize: '0.875rem',
                                borderRadius: '100px',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {filteredGifts.map((gift) => (
                        <div key={gift.id} className="glass" style={{ padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: gift.status === 'reserved' ? 0.7 : 1 }}>
                            <div style={{ width: '250px' }}>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{gift.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>{gift.brand} {gift.brand && gift.model ? '-' : ''} {gift.model}</p>
                            </div>

                            {/* Shopping Links Area */}
                            <div style={{ display: 'flex', gap: '1rem', flex: 1, justifyContent: 'center' }}>
                                {gift.hepsiburada_url && (
                                    <a
                                        href={gift.hepsiburada_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline"
                                        style={{
                                            fontSize: '0.65rem',
                                            padding: '0.4rem 1rem',
                                            borderColor: '#ff6000',
                                            color: '#ff6000',
                                            textDecoration: 'none',
                                            background: 'rgba(255, 96, 0, 0.05)'
                                        }}
                                    >
                                        <ShoppingCart size={14} /> Hepsiburada'da Gör
                                    </a>
                                )}
                                {gift.amazon_url && (
                                    <a
                                        href={gift.amazon_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline"
                                        style={{
                                            fontSize: '0.65rem',
                                            padding: '0.4rem 1rem',
                                            borderColor: '#ff9900',
                                            color: '#ff9900',
                                            textDecoration: 'none',
                                            background: 'rgba(255, 153, 0, 0.05)'
                                        }}
                                    >
                                        <ExternalLink size={14} /> Amazon'da Gör
                                    </a>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', width: '300px', justifyContent: 'flex-end' }}>
                                {gift.status === 'reserved' ? (
                                    <span style={{ color: '#4ade80', fontSize: '0.875rem', fontWeight: '500', background: 'rgba(34, 197, 94, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '8px' }}>
                                        Alındı
                                    </span>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-primary"
                                            style={{ fontSize: '0.875rem', padding: '0.6rem 1.2rem' }}
                                            onClick={() => handleSelectGift(gift.id)}
                                        >
                                            Hediyeyi Al
                                        </button>
                                        <button
                                            className="btn btn-outline"
                                            style={{ fontSize: '0.875rem', padding: '0.6rem 1.2rem' }}
                                            onClick={() => {
                                                setSelectedGift(gift);
                                                setShowPaymentModal(true);
                                            }}
                                        >
                                            Nakit Katıl
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && selectedGift && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '1rem'
                }}>
                    <div className="card animate-fade-in" style={{ maxWidth: '500px', width: '100%', position: 'relative', border: '1px solid var(--primary)' }}>
                        <button
                            onClick={() => setShowPaymentModal(false)}
                            style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ width: '48px', height: '48px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                                <CreditCard size={24} style={{ color: 'var(--primary)' }} />
                            </div>
                            <h2 style={{ marginBottom: '0.5rem' }}>Nakit Katıl</h2>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{selectedGift.name} için ödeme yapın</p>
                        </div>

                        <form onSubmit={handlePaymentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Katkı Tutarı (TL)</label>
                                <input
                                    type="number"
                                    className="glass"
                                    style={{ width: '100%', padding: '0.875rem', borderRadius: '12px', color: 'white' }}
                                    placeholder="Örn: 1000"
                                    value={paymentData.amount}
                                    onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)' }}>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Kart Üzerindeki İsim</label>
                                    <input
                                        className="glass"
                                        style={{ width: '100%', padding: '0.5rem', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white' }}
                                        placeholder="AD SOYAD"
                                        value={paymentData.cardHolder}
                                        onChange={(e) => setPaymentData({ ...paymentData, cardHolder: e.target.value.toUpperCase() })}
                                        required
                                    />
                                </div>
                                <div style={{ marginBottom: '1.25rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Kart Numarası</label>
                                    <input
                                        className="glass"
                                        style={{ width: '100%', padding: '0.5rem', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', letterSpacing: '2px' }}
                                        placeholder="0000 0000 0000 0000"
                                        maxLength="19"
                                        value={paymentData.cardNumber}
                                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Sön Kullanma</label>
                                        <input
                                            className="glass"
                                            style={{ width: '100%', padding: '0.5rem', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white' }}
                                            placeholder="AA/YY"
                                            maxLength="5"
                                            value={paymentData.expiry}
                                            onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', marginBottom: '0.25rem' }}>CVV</label>
                                        <input
                                            className="glass"
                                            style={{ width: '100%', padding: '0.5rem', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white' }}
                                            placeholder="000"
                                            maxLength="3"
                                            value={paymentData.cvv}
                                            onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '1rem' }}
                                disabled={isPaying}
                            >
                                {isPaying ? 'İşlem Yapılıyor...' : `${paymentData.amount ? paymentData.amount + ' TL' : ''} Ödemeyi Tamamla`}
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                <ShieldCheck size={14} /> 256-bit SSL Güvenli Ödeme
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GuestPortal;
