import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Gift, Users, Package, ArrowRight, Star, Heart, Menu, X, Instagram, Twitter, Facebook, Settings } from 'lucide-react';
import logo from './assets/logo.jpg';
import './index.css';
import { db } from './services/supabase';
import GuestPortal from './components/GuestPortal';
import OwnerDashboard from './components/OwnerDashboard';
import CreateEvent from './components/CreateEvent';
import ManageEvents from './components/ManageEvents';
import FeaturedGifts from './components/FeaturedGifts';
import Features from './components/Features';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import FAQ from './components/FAQ';
import TermsOfService from './components/TermsOfService';
import KVKK from './components/KVKK';
import MarketingConsent from './components/MarketingConsent';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import Blog from './components/Blog';
import BebekHediyesiBlog from './components/BlogPosts/BebekHediyesiBlog';
import GenelHediyeRehberiBlog from './components/BlogPosts/GenelHediyeRehberiBlog';
import DugunHediyesiBlog from './components/BlogPosts/DugunHediyesiBlog';
import { useAuth } from './context/AuthContext';
import AdBanner from './components/AdBanner';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleGuestPortalClick = async () => {
    if (user) {
      await signOut();
    }
    navigate('/davetli-girisi');
  };

  return (
    <>
      <nav className="glass" style={{
        position: 'sticky',
        top: '0',
        zIndex: 100,
        padding: '1rem 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: '800', cursor: 'pointer', color: '#ffffff' }}
            onClick={() => navigate('/')}
          >
            <span style={{ letterSpacing: '-0.03em' }}>HediyeEşleştir</span>
          </div>

          {/* Hamburger Menu Icon */}
          <button
            className="mobile-only"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              padding: '0.5rem',
              border: 'none',
              background: 'none',
              color: 'var(--on-surface)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Menu */}
          <div className="desktop-only" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              className={`btn ${currentPath === '/davetli-girisi' ? 'btn-primary' : 'btn-outline'}`}
              onClick={handleGuestPortalClick}
            >
              Davetli Girişi
            </button>

            {user ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button
                  className={`btn ${currentPath.startsWith('/yonetim') ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => navigate('/yonetim')}
                >
                  <Settings size={18} /> Panelim
                </button>
                <button className="btn btn-outline" onClick={signOut}>Çıkış</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  className="btn"
                  onClick={() => navigate('/login')}
                  style={{ color: 'var(--on-surface)', background: 'none' }}
                >
                  Giriş Yap
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/signup')}
                >
                  Kayıt Ol
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="mobile-only animate-fade-in" style={{
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'var(--surface)',
          padding: '7rem 1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          zIndex: 99
        }}>
          <button
            className={`btn ${currentPath === '/davetli-girisi' ? 'btn-primary' : 'btn-outline'}`}
            onClick={handleGuestPortalClick}
            style={{ fontSize: '1.1rem', padding: '1.25rem' }}
          >
            <Users size={20} /> Davetli Girişi
          </button>

          {user ? (
            <>
              <button
                className={`btn ${currentPath.startsWith('/yonetim') ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => navigate('/yonetim')}
                style={{ fontSize: '1.1rem', padding: '1.25rem' }}
              >
                <Settings size={20} /> Panelim
              </button>
              <button
                className="btn btn-outline"
                onClick={signOut}
                style={{ fontSize: '1.1rem', padding: '1.25rem' }}
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-outline"
                onClick={() => navigate('/login')}
                style={{ fontSize: '1.1rem', padding: '1.25rem' }}
              >
                Giriş Yap
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate('/signup')}
                style={{ fontSize: '1.1rem', padding: '1.25rem' }}
              >
                Kayıt Ol
              </button>
            </>
          )}
          <div style={{ marginTop: 'auto', textAlign: 'center', color: 'var(--on-surface-variant)', fontSize: '0.9rem' }}>
            HediyeEşleştir &copy; 2026
          </div>
        </div>
      )}
    </>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer style={{
      padding: '2rem 0',
      marginTop: 'auto',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      background: 'transparent'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem'
      }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <h3 style={{ color: '#ffffff', fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>HediyeEşleştir</h3>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { t: 'Hakkımızda', p: '/hakkimizda' },
            { t: 'İletişim', p: '/iletisim' },
            { t: 'Kullanım Şartları', p: '/kullanim-kosullari' },
            { t: 'Gizlilik Politikası', p: '/gizlilik-politikasi' },
            { t: 'KVKK', p: '/kvkk' },
            { t: 'Blog', p: '/blog' },
            { t: 'S.S.S', p: '/sss' },
            { t: 'Admin', p: '/admin' }
          ].map((link, i) => (
            <Link key={i} to={link.p} style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontSize: '0.9rem', transition: 'var(--transition)' }}>{link.t}</Link>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          {[Facebook, Twitter, Instagram].map((Icon, i) => (
            <a key={i} href="#" style={{ 
              width: '36px', 
              height: '36px', 
              borderRadius: '50%', 
              border: '1px solid rgba(255, 255, 255, 0.3)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: '#ffffff',
              textDecoration: 'none'
            }}>
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, events: 0, gifts: 0, guests: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await db.getGlobalStats();
        if (data) setStats(data);
      } catch (err) {
        console.error('Stats fetch error:', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="animate-fade-in">
      <Helmet>
        <title>HediyeEşleştir - Sevdiklerinle Hayallerindeki Hediyeleri Buluştur</title>
        <meta name="description" content="Düğün, doğum veya yeni ev hazırlığında... İhtiyaçlarını belirle, sevdiklerinle paylaş ve mükemmel eşleşmeyi sağla." />
      </Helmet>

      {/* Hero Section */}
      <section className="section hero-section" style={{ textAlign: 'center', paddingTop: '6rem', paddingBottom: '6rem' }}>
        <div className="container">
          <h1 className="animate-reveal stagger-1" style={{ marginBottom: '1.5rem' }}>
            Sevdiklerinle <span className="gradient-text">Hayallerindeki Hediyeleri</span> <br />
            Buluştur
          </h1>
          <p className="animate-reveal stagger-2" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.35rem)', color: 'var(--on-surface-variant)', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
            Düğün, doğum veya yeni ev hazırlığında... İhtiyaçlarını belirle, sevdiklerinle paylaş ve mükemmel eşleşmeyi sağla.
          </p>
          <div className="animate-reveal stagger-3" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <button
              className="btn btn-primary"
              style={{ flex: '1 1 240px', height: '4rem', fontSize: '1.1rem' }}
              onClick={() => navigate('/davetli-girisi')}
            >
              Davetli Girişi <Users size={22} />
            </button>
            <button
              className="btn btn-outline"
              style={{ flex: '1 1 240px', height: '4rem', fontSize: '1.1rem' }}
              onClick={() => navigate('/yonetim/olustur')}
            >
              Etkinlik Başlat <ArrowRight size={22} />
            </button>
          </div>

          <div className="animate-reveal stagger-4" style={{ marginTop: '3rem' }}>
            <Link
              to="/ozellikler"
              className="btn btn-outline"
              style={{
                width: 'auto',
                padding: '0.75rem 1.75rem',
                fontSize: '1rem',
                borderRadius: '50px',
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.1)'
              }}
            >
              Özellikleri Keşfet <Star size={18} style={{ color: '#ffffff' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section className="section" style={{ borderTop: '1px solid var(--outline-variant)', borderBottom: '1px solid var(--outline-variant)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            <div className="card animate-reveal stagger-1" style={{ textAlign: 'center' }}>
              <Users size={40} style={{ color: '#ffffff', marginBottom: '1rem' }} />
              <h2>{stats.guests || 0}</h2>
              <p>Toplam Katılımcı</p>
            </div>
            <div className="card animate-reveal stagger-2" style={{ textAlign: 'center' }}>
              <Package size={40} style={{ color: '#ffffff', marginBottom: '1rem' }} />
              <h2>{stats.events || 0}</h2>
              <p>Toplam Etkinlik</p>
            </div>
            <div className="card animate-reveal stagger-3" style={{ textAlign: 'center' }}>
              <Gift size={40} style={{ color: '#ffffff', marginBottom: '1rem' }} />
              <h2>{stats.gifts || 0}</h2>
              <p>Toplam Hediye</p>
            </div>
            <div className="card animate-reveal stagger-4" style={{ textAlign: 'center' }}>
              <Heart size={40} style={{ color: '#ffffff', marginBottom: '1rem' }} />
              <h2>%99</h2>
              <p>Memnuniyet Oranı</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Section */}
      <div className="container">
        <AdBanner slot="homepage_bottom" />
      </div>
    </div>
  );
};

// Management Wrapper to handle selection vs creation
const ManagementWrapper = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);
  const location = useLocation();

  if (loading) return <div className="section container">Yükleniyor...</div>;
  if (!user) {
    // Redirect to login if not authenticated
    return <Login />;
  }

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
      <Helmet>
        <link rel="canonical" href={`https://hediyeeslestir.com${location.pathname}`} />
        <meta property="og:url" content={`https://hediyeeslestir.com${location.pathname}`} />
        <meta property="og:site_name" content="HediyeEşleştir" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/ozellikler" element={<div className="section container"><Features onStart={() => window.location.href = '/yonetim/olustur'} /></div>} />
          <Route path="/davetli-girisi" element={<GuestPortal />} />
          <Route path="/davetli-girisi/:urlSlug" element={<GuestPortal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

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
          <Route path="/sss" element={<FAQ />} />
          <Route path="/kullanim-kosullari" element={<TermsOfService />} />
          <Route path="/kvkk" element={<KVKK />} />
          <Route path="/pazarlama-izni" element={<MarketingConsent />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/bebek-hediyesi-ne-alinir-akilli-liste-rehberi-2026" element={<BebekHediyesiBlog />} />
          <Route path="/blog/hediye-eslestirme-uygulamasi-akilli-hediye-listesi-rehberi" element={<GenelHediyeRehberiBlog />} />
          <Route path="/blog/dugun-hediyesi-karmasasina-son-akilli-liste-sistemi" element={<DugunHediyesiBlog />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
