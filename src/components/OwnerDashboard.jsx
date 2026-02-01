import React, { useState } from 'react';
import { Plus, Trash2, Users, Gift, LayoutDashboard, Send, ChevronRight, ShieldCheck, Calendar, Pencil, Check, X as CloseIcon, FileSpreadsheet, Upload, ShoppingCart, ExternalLink, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { db } from '../services/supabase';
import FeaturedGifts from './FeaturedGifts';

const OwnerDashboard = ({ eventDetails, initialGuests }) => {
    const [activeTab, setActiveTab] = useState('inventory');
    const [gifts, setGifts] = useState([]);
    const [guests, setGuests] = useState([]);
    const [isLoadingGifts, setIsLoadingGifts] = useState(true);
    const [isLoadingGuests, setIsLoadingGuests] = useState(true);
    const [activities, setActivities] = useState([]);
    const [isLoadingActivities, setIsLoadingActivities] = useState(false);

    React.useEffect(() => {
        if (eventDetails?.id) {
            fetchGifts();
            fetchGuests();
            fetchActivities();
        }
    }, [eventDetails?.id]);

    const fetchGifts = async () => {
        setIsLoadingGifts(true);
        const { data } = await db.getGifts(eventDetails.id);
        if (data) setGifts(data);
        setIsLoadingGifts(false);
    };

    const fetchGuests = async () => {
        setIsLoadingGuests(true);
        const { data } = await db.getGuests(eventDetails.id);
        if (data) setGuests(data);
        setIsLoadingGuests(false);
    };

    const fetchActivities = async () => {
        setIsLoadingActivities(true);
        const { data } = await db.getActivities(eventDetails.id);
        if (data) setActivities(data);
        setIsLoadingActivities(false);
    };

    const [newGift, setNewGift] = useState({ name: '', brand: '', model: '', hepsiburada_url: '', amazon_url: '' });
    const [newGuest, setNewGuest] = useState({ name: '', email: '' });
    const [bulkPassword, setBulkPassword] = useState('');
    const [isUpdatingBulk, setIsUpdatingBulk] = useState(false);
    const [bulkMessage, setBulkMessage] = useState('');
    const [editingGiftId, setEditingGiftId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', brand: '', model: '', hepsiburada_url: '', amazon_url: '' });
    const [sortBy, setSortBy] = useState('name'); // 'name' or 'status'
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    const toggleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const sortedGifts = [...gifts].sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'name') {
            comparison = (a.name || '').localeCompare(b.name || '', 'tr');
        } else if (sortBy === 'status') {
            const statusOrder = { 'available': 0, 'reserved': 1 };
            comparison = (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
        }
        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const addGift = async () => {
        if (newGift.name && eventDetails?.id) {
            const { data, error } = await db.addGift(eventDetails.id, newGift);
            if (data) {
                setGifts([...gifts, data]);
                setNewGift({ name: '', brand: '', model: '', hepsiburada_url: '', amazon_url: '' });
            }
        }
    };

    const addGuest = async () => {
        if (newGuest.name && newGuest.email && eventDetails?.id) {
            const { data, error } = await db.addGuest(eventDetails.id, newGuest);
            if (data) {
                setGuests([...guests, data]);
                setNewGuest({ name: '', email: '' });
            }
        }
    };

    const removeGift = async (id) => {
        const { error } = await db.removeGift(id);
        if (!error) {
            setGifts(gifts.filter(g => g.id !== id));
        }
    };
    const removeGuest = async (id) => {
        const { error } = await db.removeGuest(id);
        if (!error) {
            setGuests(guests.filter(g => g.id !== id));
        }
    };

    const handleEditGift = (gift) => {
        setEditingGiftId(gift.id);
        setEditFormData({
            name: gift.name,
            brand: gift.brand,
            model: gift.model,
            hepsiburada_url: gift.hepsiburada_url || '',
            amazon_url: gift.amazon_url || ''
        });
    };

    const handleSaveEdit = async () => {
        const { data, error } = await db.updateGift(editingGiftId, editFormData);
        if (!error && data) {
            setGifts(gifts.map(g => g.id === editingGiftId ? data : g));
            setEditingGiftId(null);
            await db.logActivity(eventDetails.id, `${editFormData.name} adlı hediye bilgileri güncellendi.`);
            fetchActivities();
        }
    };

    const handleBulkPasswordUpdate = async () => {
        if (!bulkPassword) return;
        setIsUpdatingBulk(true);
        setBulkMessage('');

        try {
            const { error } = await db.bulkUpdateGuestPasswords(eventDetails.id, bulkPassword);
            if (error) throw error;

            await db.logActivity(eventDetails.id, 'Tüm davetli şifreleri toplu olarak güncellendi.');

            setBulkMessage('Tüm şifreler başarıyla güncellendi!');
            setBulkPassword('');
            fetchActivities(); // Refresh activities
        } catch (err) {
            console.error('Bulk update error:', err);
            setBulkMessage('Şifreler güncellenirken bir hata oluştu.');
        } finally {
            setIsUpdatingBulk(false);
        }
    };

    const [isImporting, setIsImporting] = useState(false);
    const [isImportingGifts, setIsImportingGifts] = useState(false);
    const fileInputRef = React.useRef(null);
    const giftFileInputRef = React.useRef(null);

    const handleImportExcel = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsImporting(true);
        const reader = new FileReader();

        reader.onload = async (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

                // Map all data including the first row
                const guestsToImport = data
                    .filter(row => row[0] && row[1]) // Ensure name and email exist
                    .map(row => ({
                        name: row[0].toString(),
                        email: row[1].toString()
                    }));

                if (guestsToImport.length > 0) {
                    const { data: imported, error } = await db.bulkAddGuests(eventDetails.id, guestsToImport);
                    if (!error && imported) {
                        setGuests([...guests, ...imported]);
                        await db.logActivity(eventDetails.id, `${guestsToImport.length} davetli Excel'den toplu olarak yüklendi.`);
                        fetchActivities();
                        alert(`${guestsToImport.length} davetli başarıyla eklendi!`);
                    } else if (error) {
                        alert('Ekleme sırasında bir hata oluştu: ' + error.message);
                    }
                } else {
                    alert('Excel dosyasında geçerli veri bulunamadı. Lütfen "Ad Soyad" ve "E-posta" kolonlarını kontrol edin.');
                }
            } catch (err) {
                console.error('Import error:', err);
                alert('Dosya okunurken bir hata oluştu. Lütfen geçerli bir Excel dosyası yükleyin.');
            } finally {
                setIsImporting(false);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        };

        reader.readAsBinaryString(file);
    };

    const handleImportGiftsExcel = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsImportingGifts(true);
        const reader = new FileReader();

        reader.onload = async (evt) => {
            try {
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: 'binary' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

                // Map data (İçerik, Marka, Model, Hepsiburada, Amazon) - Start from first row
                const giftsToImport = data
                    .filter(row => row[0]) // Ensure name (item) exists
                    .map(row => ({
                        name: row[0].toString(),
                        brand: row[1] ? row[1].toString() : '',
                        model: row[2] ? row[2].toString() : '',
                        hepsiburada_url: row[3] ? row[3].toString() : '',
                        amazon_url: row[4] ? row[4].toString() : ''
                    }));

                if (giftsToImport.length > 0) {
                    const { data: imported, error } = await db.bulkAddGifts(eventDetails.id, giftsToImport);
                    if (!error && imported) {
                        setGifts([...gifts, ...imported]);
                        await db.logActivity(eventDetails.id, `${giftsToImport.length} hediye Excel'den toplu olarak yüklendi.`);
                        fetchActivities();
                        alert(`${giftsToImport.length} hediye başarıyla eklendi!`);
                    } else if (error) {
                        alert('Ekleme sırasında bir hata oluştu: ' + error.message);
                    }
                } else {
                    alert('Excel dosyasında geçerli veri bulunamadı. Lütfen ilk kolonu (Hediye Adı) kontrol edin.');
                }
            } catch (err) {
                console.error('Import error:', err);
                alert('Dosya okunurken bir hata oluştu. Lütfen geçerli bir Excel dosyası yükleyin.');
            } finally {
                setIsImportingGifts(false);
                if (giftFileInputRef.current) giftFileInputRef.current.value = '';
            }
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div className="section container animate-fade-in">
            {/* Event Info Header */}
            {eventDetails && (
                <div className="card" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1))' }}>
                    <div>
                        <h1 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{eventDetails.title}</h1>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Etkinlik Sahibi: <strong>{eventDetails.owner}</strong></p>
                            {eventDetails.event_date && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                    <Calendar size={16} />
                                    <span>{new Date(eventDetails.event_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Erişim Şifresi</span>
                        <code style={{ background: 'var(--glass)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{eventDetails.password}</code>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
                {/* Sidebar */}
                <aside className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '2rem', padding: '0 0.5rem' }}>Yönetim</h3>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button
                            className={`btn ${activeTab === 'recommendations' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ width: '100%', justifyContent: 'flex-start' }}
                            onClick={() => setActiveTab('recommendations')}
                        >
                            <Gift size={20} /> Önerilen Ürünler
                        </button>
                        <button
                            className={`btn ${activeTab === 'inventory' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ width: '100%', justifyContent: 'flex-start' }}
                            onClick={() => setActiveTab('inventory')}
                        >
                            <Gift size={20} /> Hediye Listesi
                        </button>
                        <button
                            className={`btn ${activeTab === 'guests' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ width: '100%', justifyContent: 'flex-start' }}
                            onClick={() => setActiveTab('guests')}
                        >
                            <Users size={20} /> Davetli Listesi
                        </button>
                        <button
                            className={`btn ${activeTab === 'admin' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ width: '100%', justifyContent: 'flex-start' }}
                            onClick={() => setActiveTab('admin')}
                        >
                            <LayoutDashboard size={20} /> Admin Paneli
                        </button>
                    </nav>
                </aside>

                {/* Content Area */}
                <main>
                    {activeTab === 'inventory' && (
                        <div className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h2>Hediye Envanteri</h2>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button
                                            className={`btn ${sortBy === 'name' ? 'btn-primary' : 'btn-outline'}`}
                                            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
                                            onClick={() => toggleSort('name')}
                                        >
                                            Ada Göre {sortBy === 'name' && (sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                                        </button>
                                        <button
                                            className={`btn ${sortBy === 'status' ? 'btn-primary' : 'btn-outline'}`}
                                            style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}
                                            onClick={() => toggleSort('status')}
                                        >
                                            Duruma Göre {sortBy === 'status' && (sortOrder === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                                        </button>
                                    </div>
                                    <span style={{ color: 'var(--text-muted)' }}>{gifts.length} Toplam</span>
                                </div>
                            </div>

                            {/* Add Gift Form */}
                            {/* Add Gift Form */}
                            <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'minmax(150px, 1fr) minmax(120px, 1fr) minmax(120px, 1fr) minmax(150px, 1.5fr) minmax(150px, 1.5fr) auto', gap: '0.75rem', alignItems: 'end' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Hediye Adı</label>
                                    <input
                                        className="glass"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', color: 'white' }}
                                        placeholder="Örn: Kahve Makinesi"
                                        value={newGift.name}
                                        onChange={e => setNewGift({ ...newGift, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Marka</label>
                                    <input
                                        className="glass"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', color: 'white' }}
                                        placeholder="Örn: Nespresso"
                                        value={newGift.brand}
                                        onChange={e => setNewGift({ ...newGift, brand: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Model</label>
                                    <input
                                        className="glass"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', color: 'white' }}
                                        placeholder="Örn: Vertuo Next"
                                        value={newGift.model}
                                        onChange={e => setNewGift({ ...newGift, model: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Hepsiburada Linki</label>
                                    <input
                                        className="glass"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', color: 'white' }}
                                        placeholder="Hepsiburada Linki"
                                        value={newGift.hepsiburada_url}
                                        onChange={e => setNewGift({ ...newGift, hepsiburada_url: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Amazon Linki</label>
                                    <input
                                        className="glass"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', color: 'white' }}
                                        placeholder="Amazon Linki"
                                        value={newGift.amazon_url}
                                        onChange={e => setNewGift({ ...newGift, amazon_url: e.target.value })}
                                    />
                                </div>
                                <button className="btn btn-primary" onClick={addGift}><Plus size={20} /></button>
                            </div>

                            {/* Excel Gift Import Section */}
                            <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ margin: '0 0 0.25rem 0' }}>Excel'den Hediye Yükle</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                                        Kolonlar: Hediye Adı | Marka | Model | Hepsiburada | Amazon (İlk satırdan başlar)
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <input
                                        type="file"
                                        accept=".xlsx, .xls, .csv"
                                        ref={giftFileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleImportGiftsExcel}
                                    />
                                    <button
                                        className="btn btn-secondary"
                                        style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}
                                        onClick={() => giftFileInputRef.current.click()}
                                        disabled={isImportingGifts}
                                    >
                                        <FileSpreadsheet size={18} /> {isImportingGifts ? 'Yükleniyor...' : "Excel'den Yükle"}
                                    </button>
                                </div>
                            </div>

                            {/* Gift List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {sortedGifts.map(gift => (
                                    <div key={gift.id} className="glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {editingGiftId === gift.id ? (
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.5fr 1.5fr', gap: '0.5rem', flex: 1, marginRight: '1.5rem' }}>
                                                <input
                                                    className="glass"
                                                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--primary)', color: 'white', fontSize: '0.875rem' }}
                                                    value={editFormData.name}
                                                    onChange={e => setEditFormData({ ...editFormData, name: e.target.value })}
                                                />
                                                <input
                                                    className="glass"
                                                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--primary)', color: 'white', fontSize: '0.875rem' }}
                                                    value={editFormData.brand}
                                                    onChange={e => setEditFormData({ ...editFormData, brand: e.target.value })}
                                                />
                                                <input
                                                    className="glass"
                                                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--primary)', color: 'white', fontSize: '0.875rem' }}
                                                    value={editFormData.model}
                                                    onChange={e => setEditFormData({ ...editFormData, model: e.target.value })}
                                                />
                                                <input
                                                    className="glass"
                                                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--primary)', color: 'white', fontSize: '0.875rem' }}
                                                    placeholder="Hepsiburada"
                                                    value={editFormData.hepsiburada_url}
                                                    onChange={e => setEditFormData({ ...editFormData, hepsiburada_url: e.target.value })}
                                                />
                                                <input
                                                    className="glass"
                                                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--primary)', color: 'white', fontSize: '0.875rem' }}
                                                    placeholder="Amazon"
                                                    value={editFormData.amazon_url}
                                                    onChange={e => setEditFormData({ ...editFormData, amazon_url: e.target.value })}
                                                />
                                            </div>
                                        ) : (
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ marginBottom: '0.25rem' }}>{gift.name}</h4>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>{gift.brand} - {gift.model}</p>
                                                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                                                        {gift.hepsiburada_url && (
                                                            <a href={gift.hepsiburada_url} target="_blank" rel="noopener noreferrer" title="Hepsiburada" style={{ color: '#ff6000', display: 'flex', alignItems: 'center' }}>
                                                                <ShoppingCart size={14} />
                                                            </a>
                                                        )}
                                                        {gift.amazon_url && (
                                                            <a href={gift.amazon_url} target="_blank" rel="noopener noreferrer" title="Amazon" style={{ color: '#ff9900', display: 'flex', alignItems: 'center' }}>
                                                                <ExternalLink size={14} />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={{
                                                fontSize: '0.75rem',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                background: gift.status === 'reserved' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(94, 114, 228, 0.1)',
                                                color: gift.status === 'reserved' ? '#4ade80' : 'var(--primary)',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {gift.status === 'reserved' ? 'Ayırıldı' : 'Beklemede'}
                                            </span>

                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {editingGiftId === gift.id ? (
                                                    <>
                                                        <button className="btn-outline" style={{ border: 'none', color: '#4ade80', padding: '0.5rem' }} onClick={handleSaveEdit}>
                                                            <Check size={18} />
                                                        </button>
                                                        <button className="btn-outline" style={{ border: 'none', color: '#ef4444', padding: '0.5rem' }} onClick={() => setEditingGiftId(null)}>
                                                            <CloseIcon size={18} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {gift.status !== 'reserved' && (
                                                            <button className="btn-outline" style={{ border: 'none', color: 'var(--text-muted)', padding: '0.5rem' }} onClick={() => handleEditGift(gift)}>
                                                                <Pencil size={18} />
                                                            </button>
                                                        )}
                                                        <button className="btn-outline" style={{ border: 'none', color: '#ef4444', padding: '0.5rem' }} onClick={() => removeGift(gift.id)}>
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'recommendations' && (
                        <div className="card">
                            <FeaturedGifts
                                eventId={eventDetails?.id}
                                onGiftsAdded={fetchGifts}
                            />
                        </div>
                    )}

                    {activeTab === 'guests' && (
                        <div className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h2>Davetlileri Yönet</h2>
                                <button className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
                                    Hepsine Davet Gönder <Send size={16} />
                                </button>
                            </div>

                            {/* Bulk Password Update Tool */}
                            <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px dashed var(--primary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <ShieldCheck size={20} style={{ color: 'var(--primary)' }} />
                                    <h4 style={{ margin: 0 }}>Toplu Şifre Yönetimi</h4>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Sistemdeki tüm davetlilerin giriş şifresini tek seferde değiştirin.</p>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <input
                                        type="text"
                                        className="glass"
                                        style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', color: 'white' }}
                                        placeholder="Yeni Toplu Şifre"
                                        value={bulkPassword}
                                        onChange={e => setBulkPassword(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-outline"
                                        onClick={handleBulkPasswordUpdate}
                                        disabled={isUpdatingBulk}
                                    >
                                        {isUpdatingBulk ? 'Güncelleniyor...' : 'Tüm Şifreleri Değiştir'}
                                    </button>
                                </div>
                                {bulkMessage && <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: bulkMessage.includes('başarıyla') ? '#4ade80' : '#ef4444' }}>{bulkMessage}</p>}
                            </div>

                            {/* Excel Import Section */}
                            <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ margin: '0 0 0.25rem 0' }}>Excel'den Aktar</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                                        Kolon 1: Ad Soyad | Kolon 2: E-posta adresi (İlk satırdan başlar)
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <input
                                        type="file"
                                        accept=".xlsx, .xls, .csv"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleImportExcel}
                                    />
                                    <button
                                        className="btn btn-secondary"
                                        style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}
                                        onClick={() => fileInputRef.current.click()}
                                        disabled={isImporting}
                                    >
                                        <FileSpreadsheet size={18} /> {isImporting ? 'Yükleniyor...' : "Excel'den Yükle"}
                                    </button>
                                </div>
                            </div>

                            {/* Add Guest Form */}
                            <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Ad Soyad</label>
                                    <input
                                        className="glass"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', color: 'white' }}
                                        placeholder="Ahmet Yılmaz"
                                        value={newGuest.name}
                                        onChange={e => setNewGuest({ ...newGuest, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>E-posta</label>
                                    <input
                                        className="glass"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', color: 'white' }}
                                        placeholder="ahmet@example.com"
                                        value={newGuest.email}
                                        onChange={e => setNewGuest({ ...newGuest, email: e.target.value })}
                                    />
                                </div>
                                <button className="btn btn-primary" onClick={addGuest}><Plus size={20} /></button>
                            </div>

                            {/* Guest List */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {guests.map(guest => (
                                    <div key={guest.id} className="glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h4 style={{ marginBottom: '0.25rem' }}>{guest.name}</h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{guest.email}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <button className="btn-outline" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}>
                                                Şifreyi Gönder
                                            </button>
                                            <button className="btn-outline" style={{ border: 'none', color: '#ef4444' }} onClick={() => removeGuest(guest.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'admin' && (
                        <div className="card">
                            <div style={{ marginBottom: '2rem' }}>
                                <h2>Admin Özeti</h2>
                                <p style={{ color: 'var(--text-muted)' }}>Etkinlikteki tüm hareketleri buradan takip edebilirsiniz.</p>
                            </div>

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div className="glass" style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <h3 style={{ fontSize: '1.125rem', margin: 0 }}>Son Hareketler</h3>
                                        <button
                                            onClick={fetchActivities}
                                            className="btn-outline"
                                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', border: 'none' }}
                                            disabled={isLoadingActivities}
                                        >
                                            {isLoadingActivities ? 'Yükleniyor...' : 'Yenile'}
                                        </button>
                                    </div>
                                    {activities.length > 0 ? (
                                        activities.map((act) => (
                                            <div key={act.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
                                                <ChevronRight size={16} style={{ color: 'var(--primary)' }} />
                                                <div style={{ flex: 1 }}>
                                                    <span style={{ fontSize: '0.875rem' }}>{act.content}</span>
                                                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: 0 }}>
                                                        {new Date(act.created_at).toLocaleString('tr-TR')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textAlign: 'center', padding: '2rem' }}>Henüz bir hareket bulunmuyor.</p>
                                    )}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                    <div className="glass" style={{ padding: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Grup Hediyeleri</h3>
                                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                            {gifts.filter(g => g.status === 'reserved' && g.group_id).length}
                                        </p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Grup halinde alınanlar</p>
                                    </div>
                                    <div className="glass" style={{ padding: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Bireysel Hediyeler</h3>
                                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                                            {gifts.filter(g => g.status === 'reserved' && !g.group_id).length}
                                        </p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Kişisel seçimler</p>
                                    </div>
                                    <div className="glass" style={{ padding: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>Toplam Davetli</h3>
                                        <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{guests.length}</p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Sistemdeki toplam kişi</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default OwnerDashboard;
