import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, Users, Gift, LayoutDashboard, Send, ChevronRight, ShieldCheck, Calendar, Pencil, Check, X as CloseIcon, FileSpreadsheet, Upload, ShoppingCart, ExternalLink, ArrowUpDown, ArrowUp, ArrowDown, Download, FileText, Loader2, UploadCloud, Activity, Share2, ClipboardList } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import * as XLSX from 'xlsx';
import { db } from '../services/supabase';
import FeaturedGifts from './FeaturedGifts';

const getCategoriesByEventType = (type) => {
    switch (type) {
        case 'Kız Bebek Hediyesi':
        case 'Erkek Bebek Hediyesi':
            return ['Bebek Bezi', 'Giyim', 'Oyuncak', 'Bakım Ürünleri', 'Beslenme', 'Tekstil', 'Mobilya & Güvenlik', 'Aksesuar'];
        case 'Doğum Günü Hediyesi':
            return ['Oyuncak', 'Hobi & Oyun', 'Giyim', 'Aksesuar', 'Kitap & Kırtasiye', 'Elektronik', 'Diğer'];
        default: // Evlilik - Ev Hediyesi
            return ['Elektronik', 'Ev Gereçleri', 'Mutfak', 'Tekstil', 'Züccaciye', 'Aksesuar', 'Diğer'];
    }
};

const OwnerDashboard = ({ eventDetails, initialGuests }) => {
    const [activeTab, setActiveTab] = useState('summary');
    const [currentEvent, setCurrentEvent] = useState(eventDetails);
    const [gifts, setGifts] = useState([]);
    const [guests, setGuests] = useState([]);
    const [isLoadingGifts, setIsLoadingGifts] = useState(true);
    const [isLoadingGuests, setIsLoadingGuests] = useState(true);
    const [activities, setActivities] = useState([]);
    const [isLoadingActivities, setIsLoadingActivities] = useState(false);

    React.useEffect(() => {
        if (eventDetails?.id) {
            fetchEventDetails();
            fetchGifts();
            fetchGuests();
            fetchActivities();
        }
    }, [eventDetails?.id]);

    const fetchEventDetails = async () => {
        if (!eventDetails?.id) return;
        // If we already have the date, we can skip or still refresh
        const { data, error } = await db.getEventById(eventDetails.id);
        if (data && !error) {
            setCurrentEvent(data);
        }
    };

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

    const eventCategories = useMemo(() => getCategoriesByEventType(currentEvent?.event_type), [currentEvent?.event_type]);

    const [newGift, setNewGift] = useState({ name: '', brand: '', model: '', category: eventCategories[0], hepsiburada_url: '', amazon_url: '', img_url: '' });
    const [newGuest, setNewGuest] = useState({ name: '', email: '' });
    const [isUpdatingBulk, setIsUpdatingBulk] = useState(false);
    const [bulkMessage, setBulkMessage] = useState('');
    const [editingGiftId, setEditingGiftId] = useState(null);
    const [editFormData, setEditFormData] = useState({ name: '', brand: '', model: '', category: eventCategories[0], hepsiburada_url: '', amazon_url: '', img_url: '' });
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

    const sortedGuests = useMemo(() => {
        return [...guests].sort((a, b) => (a.name || '').localeCompare(b.name || '', 'tr'));
    }, [guests]);

    const addGift = async () => {
        if (newGift.name && eventDetails?.id) {
            const { data, error } = await db.addGift(eventDetails.id, newGift);
            if (data) {
                setGifts([...gifts, data]);
                setNewGift({ name: '', brand: '', model: '', category: eventCategories[0], hepsiburada_url: '', amazon_url: '', img_url: '' });
            }
        }
    };

    const addGuest = async () => {
        if (newGuest.name && newGuest.email && eventDetails?.id) {
            const { data, error } = await db.addGuest(eventDetails.id, newGuest);
            if (data) {
                setGuests(prev => [...prev, data]);
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
            setGuests(prev => prev.filter(g => g.id !== id));
        }
    };

    const handleEditGift = (gift) => {
        setEditingGiftId(gift.id);
        setEditFormData({
            name: gift.name,
            brand: gift.brand,
            model: gift.model,
            category: gift.category || 'Aksesuar',
            hepsiburada_url: gift.hepsiburada_url || '',
            amazon_url: gift.amazon_url || '',
            img_url: gift.img_url || ''
        });
    };

    const singleGiftFileInputRef = React.useRef(null);
    const newGiftFileInputRef = React.useRef(null);
    const [uploadingGiftId, setUploadingGiftId] = useState(null);
    const [isUploadingNewGiftImage, setIsUploadingNewGiftImage] = useState(false);

    const handleExistingGiftImageUploadClick = (giftId) => {
        setUploadingGiftId(giftId);
        if (singleGiftFileInputRef.current) singleGiftFileInputRef.current.click();
    };

    const handleExistingGiftFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file || !uploadingGiftId) return;

        try {
            setGifts(prev => prev.map(g => g.id === uploadingGiftId ? { ...g, isUploading: true } : g));
            const { url, error } = await db.uploadGiftImage(file);
            if (error) throw error;
            if (url) {
                await db.updateGiftImage(uploadingGiftId, url);
                setGifts(prev => prev.map(g => g.id === uploadingGiftId ? { ...g, img_url: url, isUploading: false } : g));
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Görsel yüklenemedi: ' + error.message);
            setGifts(prev => prev.map(g => g.id === uploadingGiftId ? { ...g, isUploading: false } : g));
        } finally {
            e.target.value = '';
            setUploadingGiftId(null);
        }
    };

    const handleNewGiftFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setIsUploadingNewGiftImage(true);
            const { url, error } = await db.uploadGiftImage(file);
            if (error) throw error;
            if (url) setNewGift(prev => ({ ...prev, img_url: url }));
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Görsel yüklenemedi: ' + error.message);
        } finally {
            setIsUploadingNewGiftImage(false);
            e.target.value = '';
        }
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

    const handleBulkInvite = async () => {
        setIsUpdatingBulk(true);
        setBulkMessage('');

        try {
            const eventDate = currentEvent.event_date
                ? new Date(currentEvent.event_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
                : 'belirlenmiş';

            const subject = `${currentEvent.title} - ${eventDate} - hediye listesi`;
            const portalUrl = 'https://hediyeeslestir.com/davetli-girisi';

            // Send to all guests
            const invitePromises = guests.map(guest =>
                fetch('/.netlify/functions/send-mail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to: guest.email,
                        subject: subject,
                        type: 'invite',
                        message: `Sayın ${guest.name}, ${currentEvent.title}'ın ${eventDate} tarihindeki etkinliğine hediye almak isterseniz hediye listelerinden seçebilirsiniz. Giriş için: ${portalUrl}`,
                        html: `
                            <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
                                <h2 style="color: #6366f1;">Etkinlik Daveti</h2>
                                <p>Sayın <strong>${guest.name}</strong>,</p>
                                <p><strong>${currentEvent.title}</strong>'ın <strong>${eventDate}</strong> tarihindeki etkinliğine hediye almak isterseniz hediye listelerinden seçebilirsiniz.</p>
                                
                                <div style="margin: 30px 0;">
                                    <a href="${portalUrl}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Hediye Listesine Git</a>
                                </div>

                                <div style="margin-top: 30px; font-size: 14px; color: #666; border-top: 1px solid #eee; padding-top: 20px;">
                                    <p>Sitemize buradan da ulaşabilirsiniz: <a href="${portalUrl}" style="color: #6366f1;">${portalUrl}</a></p>
                                    <p>Mutluluğumuzu paylaşmanız dileğiyle.</p>
                                </div>
                            </div>
                        `
                    })
                })
            );

            await Promise.all(invitePromises);
            await db.logActivity(currentEvent.id, `Tüm davetlilere (${guests.length} kişi) toplu davet e-postası gönderildi.`);

            setBulkMessage('Tüm davetler başarıyla gönderildi!');
            fetchActivities();
        } catch (err) {
            console.error('Bulk invite error:', err);
            setBulkMessage(`Davetler gönderilirken bir hata oluştu: ${err.message}`);
        } finally {
            setIsUpdatingBulk(false);
        }
    };

    const handleSingleInvite = async (guest) => {
        try {
            const eventDate = currentEvent.event_date
                ? new Date(currentEvent.event_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
                : 'belirlenmiş';

            const subject = `${currentEvent.title} - ${eventDate} - hediye listesi`;
            const portalUrl = 'https://hediyeeslestir.com/davetli-girisi';
            const message = `Sayın ${guest.name}, ${currentEvent.title}'ın ${eventDate} tarihindeki etkinliğine hediye almak isterseniz hediye listelerinden seçebilirsiniz. Giriş için: ${portalUrl}`;

            // Call Netlify function instead of Supabase
            const response = await fetch('/.netlify/functions/send-mail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: guest.email,
                    subject: subject,
                    type: 'invite',
                    message: message,
                    html: `
                        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
                            <h2 style="color: #6366f1;">Etkinlik Daveti</h2>
                            <p>Sayın <strong>${guest.name}</strong>,</p>
                            <p><strong>${currentEvent.title}</strong>'ın <strong>${eventDate}</strong> tarihindeki etkinliğine hediye almak isterseniz hediye listelerinden seçebilirsiniz.</p>
                            
                            <div style="margin: 30px 0;">
                                <a href="${portalUrl}" style="background-color: #6366f1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Hediye Listesine Git</a>
                            </div>

                            <div style="margin-top: 30px; font-size: 14px; color: #666; border-top: 1px solid #eee; padding-top: 20px;">
                                <p>Sitemize buradan da ulaşabilirsiniz: <a href="${portalUrl}" style="color: #6366f1;">${portalUrl}</a></p>
                                <p>Mutluluğumuzu paylaşmanız dileğiyle.</p>
                            </div>
                        </div>
                    `
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'E-posta gönderilemedi.');
            }

            await db.logActivity(currentEvent.id, `${guest.name} (${guest.email}) adlı davetliye davet e-postası gönderildi. Konu: ${subject}`);
            alert(`Davet e-postası ${guest.email} adresine başarıyla gönderildi!`);
            fetchActivities();
        } catch (err) {
            console.error('Invite error:', err);
            alert(`Davet gönderilirken bir hata oluştu: ${err.message || 'Bilinmeyen hata'}`);
        }
    };

    const [isImporting, setIsImporting] = useState(false);
    const [isImportingGifts, setIsImportingGifts] = useState(false);
    const fileInputRef = React.useRef(null);
    const exportActivities = async (type) => {
        setIsLoadingActivities(true);
        try {
            // Fetch ALL activities for export
            const { data: allActivities } = await db.getActivities(eventDetails.id, null);
            if (!allActivities || allActivities.length === 0) {
                alert('Dışa aktarılacak hareket bulunamadı.');
                return;
            }

            const fileName = `${eventDetails.title}_Olay_Ozeti_${new Date().toLocaleDateString('tr-TR')}`;

            if (type === 'excel') {
                const worksheet = XLSX.utils.json_to_sheet(allActivities.map(a => ({
                    'Tarih': new Date(a.created_at).toLocaleString('tr-TR'),
                    'İçerik': a.content
                })));
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Olaylar");
                XLSX.writeFile(workbook, `${fileName}.xlsx`);
            } else if (type === 'txt') {
                const content = allActivities.map(a =>
                    `[${new Date(a.created_at).toLocaleString('tr-TR')}] ${a.content}`
                ).join('\n');
                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${fileName}.txt`;
                link.click();
                URL.revokeObjectURL(url);
            }
        } catch (err) {
            console.error('Export error:', err);
            alert('Dışa aktarma sırasında bir hata oluştu.');
        } finally {
            setIsLoadingActivities(false);
        }
    };

    const giftFileInputRef = React.useRef(null);

    const [isExportingGifts, setIsExportingGifts] = useState(false);
    const exportGifts = async (type) => {
        setIsExportingGifts(true);
        try {
            if (!gifts || gifts.length === 0) {
                alert('Dışa aktarılacak hediye bulunamadı.');
                return;
            }

            const fileName = `${eventDetails.title}_Hediye_Envanteri_${new Date().toLocaleDateString('tr-TR')}`;

            if (type === 'excel') {
                const worksheet = XLSX.utils.json_to_sheet(gifts.map(g => ({
                    'Hediye Adı': g.name,
                    'Marka': g.brand || '',
                    'Model': g.model || '',
                    'Kategori': g.category || 'Aksesuar',
                    'Durum': g.status === 'reserved' ? 'Alındı' : 'Beklemede',
                    'Hepsiburada': g.hepsiburada_url || '',
                    'Amazon': g.amazon_url || ''
                })));
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Envanter");
                XLSX.writeFile(workbook, `${fileName}.xlsx`);
            } else if (type === 'txt') {
                const content = gifts.map(g =>
                    `Hediye: ${g.name}\nMarka: ${g.brand || '-'}\nModel: ${g.model || '-'}\nKategori: ${g.category || 'Aksesuar'}\nDurum: ${g.status === 'reserved' ? 'Alındı' : 'Beklemede'}\n${g.hepsiburada_url ? 'HB: ' + g.hepsiburada_url + '\n' : ''}${g.amazon_url ? 'Amazon: ' + g.amazon_url + '\n' : ''}-------------------`
                ).join('\n');
                const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${fileName}.txt`;
                link.click();
                URL.revokeObjectURL(url);
            }
        } catch (err) {
            console.error('Export error:', err);
            alert('Dışa aktarma sırasında bir hata oluştu.');
        } finally {
            setIsExportingGifts(false);
        }
    };

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
                        setGuests(prev => [...prev, ...imported]);
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
                        amazon_url: row[4] ? row[4].toString() : '',
                        category: row[5] ? row[5].toString() : 'Aksesuar',
                        img_url: row[6] ? row[6].toString() : null
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
            <Helmet>
                <title>HediyeEşleştir - Etkinlik Yönetim Paneli</title>
                <meta name="description" content="Etkinliğinizi yönetin, hediye listenizi düzenleyin ve davetli durumlarını takip edin." />
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            {/* Mobile Warning Banner */}
            <div className="mobile-only card" style={{
                marginBottom: '1.5rem',
                background: 'rgba(234, 179, 8, 0.1)',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                padding: '1rem',
                textAlign: 'center'
            }}>
                <p style={{ color: '#eab308', margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>
                    ⚠️ En iyi deneyim için lütfen bilgisayardan veya tabletten giriş yapınız.
                </p>
            </div>
            {
                eventDetails && (
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
                    </div>
                )
            }

            <div style={{
                display: 'flex',
                flexDirection: window.innerWidth < 1024 ? 'column' : 'row',
                gap: '1.5rem',
                alignItems: 'flex-start'
            }}>
                {/* Sidebar */}
                <aside className="card" style={{
                    padding: '1.25rem',
                    width: window.innerWidth < 1024 ? '100%' : '280px',
                    position: window.innerWidth < 1024 ? 'static' : 'sticky',
                    top: '6rem'
                }}>
                    <h3 style={{ marginBottom: '1.5rem', padding: '0 0.5rem', fontSize: '1.1rem' }}>Yönetim</h3>
                    <nav style={{
                        display: 'flex',
                        flexDirection: window.innerWidth < 1024 ? 'row' : 'column',
                        gap: '0.5rem',
                        overflowX: window.innerWidth < 1024 ? 'auto' : 'visible',
                        paddingBottom: window.innerWidth < 1024 ? '0.5rem' : '0'
                    }} className="no-scrollbar">
                        <button
                            className={`btn ${activeTab === 'summary' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ width: window.innerWidth < 1024 ? 'auto' : '100%', justifyContent: 'flex-start', whiteSpace: 'nowrap', padding: '0.75rem 1rem' }}
                            onClick={() => setActiveTab('summary')}
                        >
                            <LayoutDashboard size={18} /> <span className={window.innerWidth < 1024 ? 'mobile-text-small' : ''}>Özet</span>
                        </button>
                        <button
                            className={`btn ${activeTab === 'recommendations' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ width: window.innerWidth < 1024 ? 'auto' : '100%', justifyContent: 'flex-start', whiteSpace: 'nowrap', padding: '0.75rem 1rem' }}
                            onClick={() => setActiveTab('recommendations')}
                        >
                            <Gift size={18} /> <span className={window.innerWidth < 1024 ? 'mobile-text-small' : ''}>Önerilen Ürünler</span>
                        </button>
                        <button
                            className={`btn ${activeTab === 'inventory' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ width: window.innerWidth < 1024 ? 'auto' : '100%', justifyContent: 'flex-start', whiteSpace: 'nowrap', padding: '0.75rem 1rem' }}
                            onClick={() => setActiveTab('inventory')}
                        >
                            <Gift size={18} /> <span className={window.innerWidth < 1024 ? 'mobile-text-small' : ''}>Hediye Listesi</span>
                        </button>
                        <button
                            className={`btn ${activeTab === 'guests' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ width: window.innerWidth < 1024 ? 'auto' : '100%', justifyContent: 'flex-start', whiteSpace: 'nowrap', padding: '0.75rem 1rem' }}
                            onClick={() => setActiveTab('guests')}
                        >
                            <Users size={18} /> <span className={window.innerWidth < 1024 ? 'mobile-text-small' : ''}>Davetliler</span>
                        </button>
                        <button
                            className={`btn ${activeTab === 'admin' ? 'btn-primary' : 'btn-outline'}`}
                            style={{ width: window.innerWidth < 1024 ? 'auto' : '100%', justifyContent: 'flex-start', whiteSpace: 'nowrap', padding: '0.75rem 1rem' }}
                            onClick={() => setActiveTab('admin')}
                        >
                            <Activity size={18} /> <span className={window.innerWidth < 1024 ? 'mobile-text-small' : ''}>Olaylar</span>
                        </button>
                    </nav>
                </aside>

                {/* Content Area */}
                <main style={{ flex: 1, width: '100%', minWidth: 0 }}>
                    {activeTab === 'summary' && (
                        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                                <div className="card" style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <Gift style={{ color: 'var(--primary)' }} size={24} />
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hediye Durumu</span>
                                    </div>
                                    <h2 style={{ margin: 0, fontSize: '2rem' }}>{gifts.length}</h2>
                                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                        <span style={{ color: '#4ade80' }}>{gifts.filter(g => g.status === 'reserved').length} Ayırıldı</span> • {gifts.filter(g => g.status !== 'reserved').length} Bekliyor
                                    </p>
                                </div>
                                <div className="card" style={{ padding: '1.5rem', background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <Users style={{ color: '#a855f7' }} size={24} />
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Toplam Davetli</span>
                                    </div>
                                    <h2 style={{ margin: 0, fontSize: '2rem' }}>{guests.length}</h2>
                                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Aktif Katılımcı Listesi</p>
                                </div>
                                <div className="card" style={{ padding: '1.5rem', background: 'rgba(234, 179, 8, 0.05)', border: '1px solid rgba(234, 179, 8, 0.2)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <Calendar style={{ color: '#eab308' }} size={24} />
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Kalan Gün</span>
                                    </div>
                                    <h2 style={{ margin: 0, fontSize: '2rem' }}>
                                        {eventDetails.event_date ? Math.ceil((new Date(eventDetails.event_date) - new Date()) / (1000 * 60 * 60 * 24)) : '-'}
                                    </h2>
                                    <p style={{ margin: '0.5rem 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Etkinliğe Kalan Süre</p>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <Share2 size={20} style={{ color: 'var(--primary)' }} /> Paylaşım Linki
                                    </h3>
                                </div>
                                <div className="glass" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <input 
                                        readOnly 
                                        className="glass" 
                                        style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}
                                        value={`${window.location.origin}/davetli-girisi`}
                                    />
                                    <button 
                                        className="btn btn-primary"
                                        onClick={() => {
                                            navigator.clipboard.writeText(`${window.location.origin}/davetli-girisi`);
                                            alert('Bağlantı kopyalandı!');
                                        }}
                                    >
                                        Kopyala
                                    </button>
                                </div>
                                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                    Davetlileriniz bu bağlantıyı kullanarak hediye listenize ulaşabilir ve seçim yapabilirler.
                                </p>
                            </div>

                            <div className="card" style={{ padding: '2rem' }}>
                                <h3 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Activity size={20} style={{ color: 'var(--primary)' }} /> Son Hareketler
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {activities.slice(0, 5).map((activity, index) => (
                                        <div key={index} style={{ 
                                            padding: '1rem', 
                                            borderRadius: '12px', 
                                            background: 'rgba(255,255,255,0.02)',
                                            borderLeft: '3px solid var(--primary)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{ fontSize: '0.9rem' }}>{activity.content}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                                {new Date(activity.created_at).toLocaleDateString('tr-TR')}
                                            </span>
                                        </div>
                                    ))}
                                    {activities.length === 0 && (
                                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>Henüz bir hareket bulunmuyor.</p>
                                    )}
                                </div>
                                {activities.length > 5 && (
                                    <button 
                                        className="btn btn-outline" 
                                        style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
                                        onClick={() => setActiveTab('admin')}
                                    >
                                        Tümünü Gör
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

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

                            <input type="file" ref={singleGiftFileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleExistingGiftFileChange} />
                            <input type="file" ref={newGiftFileInputRef} style={{ display: 'none' }} accept="image/*" onChange={handleNewGiftFileChange} />

                            {/* Add Gift Form */}
                            {/* Add Gift Form */}
                            <div className="glass" style={{
                                padding: '1.5rem',
                                marginBottom: '2rem',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1rem',
                                alignItems: 'end'
                            }}>
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
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Kategori</label>
                                    <select
                                        className="glass"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', color: 'white', background: 'var(--card-bg)' }}
                                        value={newGift.category}
                                        onChange={e => setNewGift({ ...newGift, category: e.target.value })}
                                    >
                                        {eventCategories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.75rem', marginBottom: '0.5rem' }}>Hediye Görseli</label>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        <button
                                            className="btn btn-outline"
                                            style={{ flex: 1, padding: '0.75rem', borderColor: 'var(--border)', color: 'white', justifyContent: 'center' }}
                                            onClick={() => newGiftFileInputRef.current?.click()}
                                            disabled={isUploadingNewGiftImage}
                                        >
                                            {isUploadingNewGiftImage ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                                            <span style={{ marginLeft: '0.5rem' }}>{newGift.img_url ? 'Değiştir' : 'Yükle'}</span>
                                        </button>
                                        {newGift.img_url && (
                                            <img src={newGift.img_url} alt="Preview" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                                        )}
                                    </div>
                                </div>
                                <button className="btn btn-primary" onClick={addGift}><Plus size={20} /></button>
                            </div>

                            {/* Excel Gift Import Section */}
                            <div className="glass" style={{
                                padding: '1.5rem',
                                marginBottom: '2rem',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                                justifyContent: 'space-between',
                                alignItems: window.innerWidth < 768 ? 'stretch' : 'center',
                                gap: '1.5rem'
                            }}>
                                <div>
                                    <h4 style={{ margin: '0 0 0.25rem 0' }}>Excel'den Hediye Yükle</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                                        Kolonlar: Hediye Adı | Marka | Model | Hepsiburada | Amazon | Kategori | Resim Linki (İlk satırdan başlar)
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
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                maxHeight: '450px',
                                overflowY: 'auto',
                                paddingRight: '0.5rem',
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'var(--primary) transparent'
                            }}>
                                {sortedGifts.map(gift => (
                                    <div key={gift.id} className="glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                                        
                                        <div style={{
                                            width: '48px', height: '48px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, position: 'relative'
                                        }}>
                                            {gift.isUploading ? (
                                                <Loader2 size={24} className="animate-spin" style={{ color: 'var(--primary)' }} />
                                            ) : gift.img_url ? (
                                                <img src={gift.img_url} alt={gift.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <Gift size={24} style={{ color: 'var(--primary)' }} />
                                            )}
                                            <button
                                                onClick={() => handleExistingGiftImageUploadClick(gift.id)}
                                                style={{
                                                    position: 'absolute', bottom: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: 'white',
                                                    border: 'none', padding: '0.2rem', cursor: 'pointer', borderTopLeftRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}
                                                title="Görsel Değiştir/Yükle"
                                            >
                                                <UploadCloud size={14} />
                                            </button>
                                        </div>

                                        {editingGiftId === gift.id ? (
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1.5fr 1.5fr', gap: '0.5rem', flex: 1, marginRight: '1.5rem' }}>
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
                                                <select
                                                    className="glass"
                                                    style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--primary)', color: 'white', fontSize: '0.875rem', background: 'var(--card-bg)' }}
                                                    value={editFormData.category}
                                                    onChange={e => setEditFormData({ ...editFormData, category: e.target.value })}
                                                >
                                                    {eventCategories.map(cat => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
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
                                                    <span style={{ fontSize: '0.7rem', color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                                        {gift.category || 'Aksesuar'}
                                                    </span>
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

                            {/* Export Options */}
                            <div className="glass" style={{
                                marginTop: '2rem',
                                padding: '1.5rem',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <h4 style={{ margin: '0 0 0.25rem 0' }}>Hediye Envanterini Aktar</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                                        Mevcut hediye listenizi Excel veya TXT formatında bilgisayarınıza indirin.
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button
                                        onClick={() => exportGifts('excel')}
                                        className="btn-outline"
                                        style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderColor: '#22c55e', color: '#22c55e' }}
                                        disabled={isExportingGifts}
                                    >
                                        <FileSpreadsheet size={18} /> Excel'e Aktar
                                    </button>
                                    <button
                                        onClick={() => exportGifts('txt')}
                                        className="btn-outline"
                                        style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                        disabled={isExportingGifts}
                                    >
                                        <FileText size={18} /> TXT'ye Aktar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'recommendations' && (
                        <div className="card">
                            <FeaturedGifts
                                eventId={eventDetails?.id}
                                eventType={eventDetails?.event_type}
                                onGiftsAdded={fetchGifts}
                            />
                        </div>
                    )}

                    {activeTab === 'guests' && (
                        <div className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h2>Davetlileri Yönet</h2>
                            </div>

                            {/* Bulk Invitation Tool */}
                            <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px dashed var(--primary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                    <ShieldCheck size={20} style={{ color: 'var(--primary)' }} />
                                    <h4 style={{ margin: 0 }}>Toplu Davet</h4>
                                </div>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Sistemdeki tüm davetlilere toplu olarak davet mesajı gönderin.</p>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        className="btn btn-primary"
                                        style={{ padding: '0.75rem 3rem' }}
                                        onClick={handleBulkInvite}
                                        disabled={isUpdatingBulk}
                                    >
                                        {isUpdatingBulk ? 'Davetler Gönderiliyor...' : 'Tüm Davetleri Gönder'}
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
                            <div className="glass" style={{
                                padding: '1.5rem',
                                marginBottom: '2rem',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '1rem',
                                alignItems: 'end'
                            }}>
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
                                <button className="btn btn-primary" style={{ padding: '0.75rem 2rem' }} onClick={addGuest}>Ekle</button>
                            </div>

                            {/* Guest List */}
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                                maxHeight: '400px',
                                overflowY: 'auto',
                                paddingRight: '0.5rem',
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'var(--primary) transparent'
                            }}>
                                {sortedGuests.map(guest => (
                                    <div key={guest.id} className="glass" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '85px' }}>
                                        <div>
                                            <h4 style={{ marginBottom: '0.25rem' }}>{guest.name}</h4>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>{guest.email}</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                            <button
                                                className="btn-outline"
                                                style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem' }}
                                                onClick={() => handleSingleInvite(guest)}
                                            >
                                                Davet et
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
                                <h2>Olaylar Özeti</h2>
                                <p style={{ color: 'var(--text-muted)' }}>Etkinlikteki tüm hareketleri buradan takip edebilirsiniz.</p>
                            </div>

                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div className="glass" style={{ padding: '1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Son Hareketler</h3>
                                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                                            <button
                                                onClick={() => exportActivities('excel')}
                                                className="btn-outline"
                                                style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderColor: '#22c55e', color: '#22c55e' }}
                                                disabled={isLoadingActivities}
                                            >
                                                <FileSpreadsheet size={16} /> Excel
                                            </button>
                                            <button
                                                onClick={() => exportActivities('txt')}
                                                className="btn-outline"
                                                style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                                                disabled={isLoadingActivities}
                                            >
                                                <FileText size={16} /> TXT
                                            </button>
                                            <button
                                                onClick={fetchActivities}
                                                className="btn-outline"
                                                style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem', border: 'none', background: 'rgba(255,255,255,0.05)' }}
                                                disabled={isLoadingActivities}
                                            >
                                                {isLoadingActivities ? '...' : 'Yenile'}
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{
                                        maxHeight: '280px',
                                        overflowY: 'auto',
                                        paddingRight: '0.5rem',
                                        scrollbarWidth: 'thin',
                                        scrollbarColor: 'var(--primary) transparent'
                                    }}>
                                        {activities.length > 0 ? (
                                            activities.map((act) => (
                                                <div key={act.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                                                    <div style={{ minWidth: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', opacity: 0.5 }}></div>
                                                    <div style={{ flex: 1 }}>
                                                        <span style={{ fontSize: '0.95rem', display: 'block', marginBottom: '0.25rem' }}>{act.content}</span>
                                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                                                            {new Date(act.created_at).toLocaleString('tr-TR')}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', textAlign: 'center', padding: '2rem' }}>Henüz bir hareket bulunmuyor.</p>
                                        )}
                                    </div>
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
                <div style={{ textAlign: 'center', padding: '1rem', fontSize: '10px', color: 'var(--text-muted)', opacity: 0.5 }}>
                    v2.1 - Sistem Güncellendi
                </div>
            </div>
        </div >
    );
};

export default OwnerDashboard;
