import React, { useState, useEffect, useMemo } from 'react';
import { db } from '../services/supabase';
import { Gift, Plus, ShoppingCart, ExternalLink, CheckCircle2, Loader2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const FeaturedGifts = ({ eventId, eventType, onGiftsAdded }) => {
    const [featuredGifts, setFeaturedGifts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedGifts, setSelectedGifts] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [activeCategory, setActiveCategory] = useState('Hepsi');

    useEffect(() => {
        fetchFeaturedGifts();
    }, [eventType]); // Refetch if eventType changes

    // Reset selection when category changes
    useEffect(() => {
        setSelectedGifts([]);
    }, [activeCategory]);

    const fetchFeaturedGifts = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await db.getFeaturedGifts(eventType);
            if (data) setFeaturedGifts(data);
        } catch (err) {
            console.error('Featured gifts fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleGiftSelection = (giftId) => {
        setSelectedGifts(prev =>
            prev.includes(giftId)
                ? prev.filter(id => id !== giftId)
                : [...prev, giftId]
        );
    };

    const handleAddSelected = async () => {
        if (!eventId) {
            alert('Lütfen önce bir etkinlik seçin veya oluşturun.');
            return;
        }

        if (selectedGifts.length === 0) {
            alert('Lütfen en az bir ürün seçin.');
            return;
        }

        setIsAdding(true);
        try {
            const giftsToAdd = featuredGifts.filter(g => selectedGifts.includes(g.id));
            const { data, error } = await db.copyFeaturedGiftsToEvent(eventId, giftsToAdd);

            if (!error) {
                // Log activity
                await db.logActivity(eventId, `${selectedGifts.length} adet önerilen ürün listeye eklendi.`);

                alert('Seçilen ürünler başarıyla listenize eklendi!');
                setSelectedGifts([]);
                if (onGiftsAdded) onGiftsAdded();
            }
        } catch (err) {
            console.error('Add featured gifts error:', err);
        } finally {
            setIsAdding(false);
        }
    };

    const handleAddAll = async () => {
        if (!eventId) {
            alert('Lütfen önce bir etkinlik seçin veya oluşturun.');
            return;
        }

        if (filteredGifts.length === 0) {
            alert('Eklenecek ürün bulunamadı.');
            return;
        }

        const confirmAdd = window.confirm(`Listedeki tüm (${filteredGifts.length}) ürünü eklemek istediğinize emin misiniz?`);
        if (!confirmAdd) return;

        setIsAdding(true);
        try {
            const { data, error } = await db.copyFeaturedGiftsToEvent(eventId, filteredGifts);

            if (!error) {
                await db.logActivity(eventId, `${filteredGifts.length} adet önerilen ürün toplu olarak eklendi.`);
                alert('Tüm ürünler başarıyla listenize eklendi!');
                if (onGiftsAdded) onGiftsAdded();
            }
        } catch (err) {
            console.error('Add all featured gifts error:', err);
        } finally {
            setIsAdding(false);
        }
    };

    const handleToggleSelectAll = () => {
        if (selectedGifts.length === filteredGifts.length) {
            setSelectedGifts([]);
        } else {
            setSelectedGifts(filteredGifts.map(g => g.id));
        }
    };

    const categories = useMemo(() => {
        const dataCats = featuredGifts.map(g => g.category || 'Aksesuar');
        const uniqueCats = Array.from(new Set(dataCats)).sort((a, b) => a.localeCompare(b, 'tr'));
        return ['Hepsi', ...uniqueCats];
    }, [featuredGifts]);
    const filteredGifts = activeCategory === 'Hepsi'
        ? featuredGifts
        : featuredGifts.filter(g => g.category === activeCategory);

    return (
        <div className="section container animate-fade-in">
            <Helmet>
                <title>HediyeEşle - Hediye Önerileri</title>
                <meta name="description" content="Özenle seçilmiş hediye önerileri. Sevdikleriniz için en güzel hediye fikirleri." />
            </Helmet>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', padding: '0 1rem' }}>
                    <div>
                        <h2 className="hero-title" style={{ marginBottom: '0.5rem' }}>Önerilen Ürünler</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Popüler ve en çok tercih edilen hediyeleri tek tıkla listenize ekleyin.</p>
                    </div>

                    {eventId && (
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <button
                                className="btn btn-outline"
                                onClick={handleAddAll}
                                disabled={isAdding || filteredGifts.length === 0}
                                style={{ padding: '0.8rem 1.5rem', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                            >
                                Tümünü Ekle ({filteredGifts.length})
                            </button>
                            <button
                                className="btn btn-outline"
                                onClick={handleToggleSelectAll}
                                disabled={isAdding || filteredGifts.length === 0}
                                style={{ padding: '0.8rem 1.5rem', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                            >
                                {selectedGifts.length === filteredGifts.length ? 'Seçimi Kaldır' : 'Tümünü Seç'}
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddSelected}
                                disabled={isAdding || selectedGifts.length === 0}
                                style={{ padding: '0.8rem 1.5rem', opacity: selectedGifts.length === 0 ? 0.5 : 1 }}
                            >
                                {isAdding ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
                                Seçilenleri Ekle ({selectedGifts.length})
                            </button>
                        </div>
                    )}

                </div>

                {/* Category Filter */}
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: '0 0.5rem'
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                            style={{
                                fontSize: '0.75rem',
                                padding: '0.4rem 1rem',
                                whiteSpace: 'nowrap',
                                borderRadius: '100px'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '5rem' }}>
                        <Loader2 size={48} className="animate-spin" style={{ color: 'var(--primary)', opacity: 0.5 }} />
                    </div>
                ) : (
                    <div className="no-scrollbar" style={{
                        maxHeight: '850px',
                        overflowY: 'auto',
                        paddingRight: '0.5rem',
                        scrollBehavior: 'smooth'
                    }}>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1.25rem',
                            padding: '0.5rem'
                        }}>
                            {filteredGifts.map(gift => (
                                <div
                                    key={gift.id}
                                    className="glass card-hover"
                                    style={{
                                        padding: '1.5rem',
                                        cursor: 'pointer',
                                        border: selectedGifts.includes(gift.id) ? '2px solid var(--primary)' : '1px solid var(--border)',
                                        position: 'relative',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%'
                                    }}
                                    onClick={() => toggleGiftSelection(gift.id)}
                                >
                                    {selectedGifts.includes(gift.id) && (
                                        <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--primary)' }}>
                                            <CheckCircle2 size={24} />
                                        </div>
                                    )}

                                    <div style={{
                                        width: '48px',
                                        height: '48px',
                                        background: 'rgba(99, 102, 241, 0.1)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1.25rem'
                                    }}>
                                        <Gift size={24} style={{ color: 'var(--primary)' }} />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{gift.category}</span>
                                        <h3 style={{ fontSize: '1.25rem', margin: '0.25rem 0 0.5rem 0' }}>{gift.name}</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>{gift.brand} - {gift.model}</p>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
                                        {gift.hepsiburada_url && (
                                            <a
                                                href={gift.hepsiburada_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                style={{ color: '#ff6000', display: 'flex', alignItems: 'center' }}
                                                title="Hepsiburada"
                                            >
                                                <ShoppingCart size={18} />
                                            </a>
                                        )}
                                        {gift.amazon_url && (
                                            <a
                                                href={gift.amazon_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                style={{ color: '#ff9900', display: 'flex', alignItems: 'center' }}
                                                title="Amazon"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeaturedGifts;
