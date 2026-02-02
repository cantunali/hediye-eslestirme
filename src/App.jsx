import React, { useState, useEffect } from 'react';
import { Gift, Users, Package, ArrowRight, Star, Heart, Menu, X, Instagram, Twitter, Facebook, Settings } from 'lucide-react';
import logo from './assets/logo.jpg';
import './index.css';
import GuestPortal from './components/GuestPortal';
import OwnerDashboard from './components/OwnerDashboard';
import CreateEvent from './components/CreateEvent';
import ManageEvents from './components/ManageEvents';
import FeaturedGifts from './components/FeaturedGifts';
import Features from './components/Features';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';

const Navbar = ({ onNavigate, currentPage }) => (
  <nav className="glass" style={{ position: 'sticky', top: '1rem', margin: '1rem 2rem', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem' }}>
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer' }}
      onClick={() => onNavigate('landing')}
    >
      <img src={logo} alt="Logo" style={{ width: '24px', height: '24px', borderRadius: '6px' }} />
      <span className="gradient-text">HediyeEşle</span>
    </div>
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <button
        style={{ background: 'none', border: 'none', color: currentPage === 'features' ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem', fontWeight: currentPage === 'features' ? '600' : '400' }}
        onClick={() => onNavigate('features')}
      >
        Özellikler
      </button>

      <button
        className={`btn ${currentPage === 'guest' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => onNavigate('guest')}
      >
        Davetli Girişi
      </button>
      <button
        className={`btn ${currentPage === 'owner' || currentPage === 'create-event' ? 'btn-primary' : 'btn-outline'}`}
        onClick={() => onNavigate('create-event')}
      >
        <Settings size={18} /> Yönetim
      </button>
    </div>
  </nav>
);

const Footer = ({ onNavigate }) => (
  <footer className="glass" style={{ marginTop: 'auto', padding: '4rem 2rem', margin: '2rem', borderRadius: '24px 24px 0 0' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <img src={logo} alt="Logo" style={{ width: '24px', height: '24px', borderRadius: '6px' }} />
          <h3 className="gradient-text">HediyeEşle</h3>
        </div>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>En özel günlerinizde hediyelerinizi sevdiklerinizle kolayca eşleştirin. Mutluluğu paylaşın, karmaşayı önleyin.</p>
      </div>
      <div>
        <h4 style={{ marginBottom: '1.5rem' }}>Kurumsal</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left', padding: 0 }} onClick={() => onNavigate('about')}>Hakkımızda</button>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left', padding: 0 }} onClick={() => onNavigate('featured-gifts')}>Hediye Önerileri</button>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left', padding: 0 }} onClick={() => onNavigate('contact')}>İletişim</button>
          <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left', padding: 0 }} onClick={() => onNavigate('privacy')}>Gizlilik Politikası</button>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '1.5rem' }}>Bizi Takip Edin</h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Facebook className="btn-outline" style={{ padding: '8px', borderRadius: '50%', width: '40px', height: '40px' }} />
          <Twitter className="btn-outline" style={{ padding: '8px', borderRadius: '50%', width: '40px', height: '40px' }} />
          <Instagram className="btn-outline" style={{ padding: '8px', borderRadius: '50%', width: '40px', height: '40px' }} />
        </div>
      </div>
    </div>

    <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
      © 2026 HediyeEşle. Tüm Hakları Saklıdır.
    </div>
  </footer>
);

const LandingPage = ({ onStart, onNavigate }) => (
  <div className="animate-fade-in">
    {/* Hero Section */}
    <section className="section" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
      <div className="container">
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
          Hayalindeki <span className="gradient-text">Hediyeleri</span> <br />
          Sevdiklerinle Buluştur
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 3rem' }}>
          Düğün, doğum günü veya yeni ev hazırlığında... İhtiyaçlarını belirle, sevdiklerinle paylaş ve mükemmel eşleşmeyi sağla.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <button
            className="btn btn-primary"
            style={{ padding: '1rem 2.5rem' }}
            onClick={() => onNavigate('guest')}
          >
            Davetli Girişi <Users size={20} style={{ marginLeft: '0.5rem' }} />
          </button>
          <button
            className="btn btn-outline"
            style={{ padding: '1rem 2.5rem' }}
            onClick={() => onStart('create-event')}
          >
            Etkinlik Başlat <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
          </button>
        </div>
      </div>
    </section>

    {/* Features/Stats Section */}
    <section id="features" className="section" style={{ padding: '4rem 2rem' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <Package size={40} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem' }}>42</h2>
          <p style={{ color: 'var(--text-muted)' }}>Toplam Hediye</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <Users size={40} style={{ color: 'var(--secondary)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem' }}>85</h2>
          <p style={{ color: 'var(--text-muted)' }}>Davetli Sayısı</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <Gift size={40} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem' }}>18</h2>
          <p style={{ color: 'var(--text-muted)' }}>Alınan Hediyeler</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <Heart size={40} style={{ color: '#ef4444', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '2.5rem' }}>24</h2>
          <p style={{ color: 'var(--text-muted)' }}>Kalan Hediyeler</p>
        </div>
      </div>
    </section>
  </div>
);

function App() {
  const [page, setPage] = useState('landing');
  const [managementMode, setManagementMode] = useState('select'); // 'select', 'create'
  const [eventDetails, setEventDetails] = useState(null);

  // Dummy data for initial dev
  const [gifts] = useState([
    { id: 1, name: 'Kahve Makinesi', brand: 'Nespresso', model: 'Vertuo Next', reserved: false },
    { id: 2, name: 'Robot Süpürge', brand: 'Roborock', model: 'S7 MaxV', reserved: true },
    { id: 3, name: 'Airfryer', brand: 'Philips', model: 'XXL Premium', reserved: false },
  ]);

  const [guests] = useState([
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', status: 'invited' },
    { id: 2, name: 'Ayşe Kaya', email: 'ayse@example.com', status: 'registered' },
    { id: 3, name: 'Mehmet Demir', email: 'mehmet@example.com', status: 'invited' },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handleEventSelected = (details) => {
    setEventDetails(details);
    setPage('owner');
  };

  const handleManagementNav = () => {
    setManagementMode('select');
    setPage('create-event');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onNavigate={(p) => p === 'create-event' ? handleManagementNav() : setPage(p)} currentPage={page} />
      <main style={{ flex: 1 }}>
        {page === 'landing' && <LandingPage onStart={handleManagementNav} onNavigate={setPage} />}
        {page === 'features' && <Features onStart={handleManagementNav} />}
        {page === 'create-event' && (
          managementMode === 'select' ? (
            <ManageEvents onEventSelected={handleEventSelected} onGoToCreate={() => setManagementMode('create')} />
          ) : (
            <CreateEvent onCreated={handleEventSelected} />
          )
        )}
        {page === 'guest' && <GuestPortal />}
        {page === 'owner' && <OwnerDashboard eventDetails={eventDetails} />}
        {page === 'featured-gifts' && (
          <div className="section container">
            <FeaturedGifts onGiftsAdded={() => setPage('landing')} />
          </div>
        )}
        {page === 'about' && <AboutUs />}
        {page === 'contact' && <Contact />}
        {page === 'privacy' && <PrivacyPolicy />}
      </main>
      <Footer onNavigate={setPage} />
    </div>
  );
}

export default App;
