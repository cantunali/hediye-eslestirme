import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="glass" style={{ position: 'sticky', top: '1rem', margin: '1rem 2rem', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer' }}
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="Logo" style={{ width: '24px', height: '24px', borderRadius: '6px' }} />
        <span className="gradient-text">HediyeEşle</span>
      </div>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link
          to="/ozellikler"
          style={{ background: 'none', border: 'none', color: currentPath === '/ozellikler' ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem', fontWeight: currentPath === '/ozellikler' ? '600' : '400', textDecoration: 'none' }}
        >
          Özellikler
        </Link>

        <button
          className={`btn ${currentPath === '/davetli-girisi' ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => navigate('/davetli-girisi')}
        >
          Davetli Girişi
        </button>
        <button
          className={`btn ${currentPath.startsWith('/yonetim') ? 'btn-primary' : 'btn-outline'}`}
          onClick={() => navigate('/yonetim')}
        >
          <Settings size={18} /> Yönetim
        </button>
      </div>
    </nav>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  return (
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
            <Link to="/hakkimizda" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Hakkımızda</Link>
            <Link to="/hediye-onerileri" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Hediye Önerileri</Link>
            <Link to="/iletisim" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>İletişim</Link>
            <Link to="/gizlilik-politikasi" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Gizlilik Politikası</Link>
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
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>HediyeEşle - Hayalindeki Hediyeleri Sevdiklerinle Buluştur</title>
        <meta name="description" content="Düğün, doğum günü veya yeni ev hazırlığında... İhtiyaçlarını belirle, sevdiklerinle paylaş ve mükemmel eşleşmeyi sağla." />
      </Helmet>

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
              onClick={() => navigate('/davetli-girisi')}
            >
              Davetli Girişi <Users size={20} style={{ marginLeft: '0.5rem' }} />
            </button>
            <button
              className="btn btn-outline"
              style={{ padding: '1rem 2.5rem' }}
              onClick={() => navigate('/yonetim/olustur')}
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
};

// Management Wrapper to handle selection vs creation
const ManagementWrapper = () => {
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);
  const location = useLocation();

  // Check if we are in create mode or dashboard mode
  const isCreateMode = location.pathname === '/yonetim/olustur';
  const isDashboardMode = location.pathname === '/yonetim/dashboard' && eventDetails;

  const handleEventSelected = (details) => {
    setEventDetails(details);
    navigate('/yonetim/dashboard');
  };

  const handleCreateNew = () => {
    navigate('/yonetim/olustur');
  }

  if (isDashboardMode) {
    return <OwnerDashboard eventDetails={eventDetails} />;
  }

  if (isCreateMode) {
    return <CreateEvent onCreated={handleEventSelected} />;
  }

  return <ManageEvents onEventSelected={handleEventSelected} onGoToCreate={handleCreateNew} />;
};


function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ozellikler" element={<div className="section container"><Features onStart={() => window.location.href = '/yonetim/olustur'} /></div>} />
          <Route path="/davetli-girisi" element={<GuestPortal />} />

          {/* Management Routes */}
          <Route path="/yonetim" element={<ManagementWrapper />} />
          <Route path="/yonetim/olustur" element={<ManagementWrapper />} />
          <Route path="/yonetim/dashboard" element={<ManagementWrapper />} />

          <Route path="/hediye-onerileri" element={
            <div className="section container">
              <FeaturedGifts onGiftsAdded={() => { }} />
            </div>
          } />
          <Route path="/hakkimizda" element={<AboutUs />} />
          <Route path="/iletisim" element={<Contact />} />
          <Route path="/gizlilik-politikasi" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
