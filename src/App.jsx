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
import FAQ from './components/FAQ';
import TermsOfService from './components/TermsOfService';
import KVKK from './components/KVKK';
import MarketingConsent from './components/MarketingConsent';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SmtpTest from './components/SmtpTest';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import Blog from './components/Blog';
import BebekHediyesiBlog from './components/BlogPosts/BebekHediyesiBlog';
import GenelHediyeRehberiBlog from './components/BlogPosts/GenelHediyeRehberiBlog';
import DugunHediyesiBlog from './components/BlogPosts/DugunHediyesiBlog';
import { useAuth } from './context/AuthContext';

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
        top: '0.75rem',
        margin: '0.75rem',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        padding: '0.75rem 1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="Logo" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
            <span className="gradient-text">HediyeEşle</span>
          </div>

          {/* Hamburger Menu Icon */}
          <button
            className="mobile-only"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              padding: '0.5rem',
              border: 'none',
              background: 'none',
              color: 'var(--text)',
              cursor: 'pointer',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Desktop Menu */}
          <div className="desktop-only" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              className={`btn ${currentPath === '/davetli-girisi' ? 'btn-primary' : 'btn-outline'}`}
              onClick={handleGuestPortalClick}
              style={{ padding: '0.6rem 1.25rem' }}
            >
              Davetli Girişi
            </button>

            {user ? (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  className={`btn ${currentPath.startsWith('/yonetim') ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => navigate('/yonetim')}
                  style={{ padding: '0.6rem 1.25rem' }}
                >
                  <Settings size={18} /> Panelim
                </button>
                <button className="btn btn-outline" onClick={signOut} style={{ padding: '0.6rem 1.25rem' }}>Çıkış</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  className={`btn ${currentPath === '/login' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => navigate('/login')}
                  style={{ padding: '0.6rem 1.25rem' }}
                >
                  Giriş Yap
                </button>
                <button
                  className={`btn ${currentPath === '/signup' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => navigate('/signup')}
                  style={{ padding: '0.6rem 1.25rem' }}
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
          background: '#0f172a', // Solid color
          padding: '7rem 1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          zIndex: 99
        }}>
          <button
            className={`btn ${currentPath === '/davetli-girisi' ? 'btn-primary' : 'btn-outline'}`}
            onClick={handleGuestPortalClick}
            style={{ fontSize: '1.1rem', padding: '1rem' }}
          >
            <Users size={20} /> Davetli Girişi
          </button>

          {user ? (
            <>
              <button
                className={`btn ${currentPath.startsWith('/yonetim') ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => navigate('/yonetim')}
                style={{ fontSize: '1.1rem', padding: '1rem' }}
              >
                <Settings size={20} /> Panelim
              </button>
              <button
                className="btn btn-outline"
                onClick={signOut}
                style={{ fontSize: '1.1rem', padding: '1rem' }}
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <button
                className={`btn ${currentPath === '/login' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => navigate('/login')}
                style={{ fontSize: '1.1rem', padding: '1rem' }}
              >
                Giriş Yap
              </button>
              <button
                className={`btn ${currentPath === '/signup' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => navigate('/signup')}
                style={{ fontSize: '1.1rem', padding: '1rem' }}
              >
                Kayıt Ol
              </button>
            </>
          )}
          <div style={{ marginTop: 'auto', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            HediyeEşle &copy; 2026
          </div>
        </div>
      )}
    </>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="glass" style={{
      marginTop: 'auto',
      padding: '3rem 1.5rem',
      margin: '1.5rem 0.75rem 0.75rem',
      borderRadius: '24px'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2.5rem'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <img src={logo} alt="Logo" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
            <h3 className="gradient-text">HediyeEşle</h3>
          </div>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
            En özel günlerinizde hediyelerinizi sevdiklerinizle kolayca eşleştirin. Mutluluğu paylaşın, karmaşayı önleyin.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Kurumsal</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/hakkimizda" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Hakkımızda</Link>
            <Link to="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Blog</Link>
            <Link to="/iletisim" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>İletişim</Link>
            <Link to="/sss" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Sıkça Sorulan Sorular</Link>
            <Link to="/gizlilik-politikasi" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Gizlilik Politikası</Link>
            <Link to="/kullanim-kosullari" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Kullanıcı Sözleşmesi</Link>
            <Link to="/kvkk" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>KVKK Aydınlatma Metni</Link>
            <Link to="/pazarlama-izni" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>Pazarlama İzni</Link>
            <Link to="/admin" style={{
              color: 'var(--primary)',
              textDecoration: 'none',
              fontWeight: '600',
              marginTop: '0.5rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border)',
              display: 'inline-block'
            }}>Admin Paneli</Link>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '1.25rem', fontSize: '1.1rem' }}>Bizi Takip Edin</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" className="btn-outline" style={{ padding: '10px', borderRadius: '50%', color: 'var(--text)', display: 'flex' }}><Facebook size={20} /></a>
            <a href="#" className="btn-outline" style={{ padding: '10px', borderRadius: '50%', color: 'var(--text)', display: 'flex' }}><Twitter size={20} /></a>
            <a href="#" className="btn-outline" style={{ padding: '10px', borderRadius: '50%', color: 'var(--text)', display: 'flex' }}><Instagram size={20} /></a>
          </div>
        </div>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: '3rem',
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border)',
        paddingTop: '2rem',
        fontSize: '0.875rem'
      }}>
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
        <title>HediyeEşle - Sevdiklerinle Hayallerindeki Hediyeleri Buluştur</title>
        <meta name="description" content="Düğün, doğum veya yeni ev hazırlığında... İhtiyaçlarını belirle, sevdiklerinle paylaş ve mükemmel eşleşmeyi sağla." />
      </Helmet>

      {/* Hero Section */}
      <section className="section hero-section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h1 className="hero-title animate-reveal stagger-1">
            Sevdiklerinle <span className="gradient-text">Hayallerindeki Hediyeleri</span> <br />
            Buluştur
          </h1>
          <p className="animate-reveal stagger-2" style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: '1.6' }}>
            Düğün, doğum veya yeni ev hazırlığında... İhtiyaçlarını belirle, sevdiklerinle paylaş ve mükemmel eşleşmeyi sağla.
          </p>
          <div className="animate-reveal stagger-3" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            maxWidth: '650px',
            margin: '0 auto'
          }}>
            <button
              className="btn btn-primary btn-micro"
              style={{ flex: '1 1 200px', minHeight: '3.5rem' }}
              onClick={() => navigate('/davetli-girisi')}
            >
              Davetli Girişi <Users size={22} className="glow-soft" />
            </button>
            <button
              className="btn btn-outline"
              style={{ flex: '1 1 200px', minHeight: '3.5rem' }}
              onClick={() => navigate('/yonetim/olustur')}
            >
              Etkinlik Başlat <ArrowRight size={22} />
            </button>
          </div>

          <div className="animate-reveal stagger-4" style={{ marginTop: '2rem' }}>
            <Link
              to="/ozellikler"
              className="btn btn-outline"
              style={{
                width: 'auto',
                padding: '0.6rem 1.5rem',
                fontSize: '0.95rem',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                borderRadius: '50px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              Özellikleri Keşfet <Star size={16} className="glow-soft" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features/Stats Section */}
      <section id="features" className="section" style={{ background: 'rgba(0,0,0,0.1)' }}>
        <div className="container">
          <div className="grid-mobile-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div className="card animate-reveal stagger-1" style={{ textAlign: 'center' }}>
              <Package size={32} className="glow-soft" style={{ color: 'var(--accent-sharp)', marginBottom: '0.75rem' }} />
              <h2 style={{ marginBottom: '0.5rem' }}>42</h2>
              <p style={{ color: 'var(--text-muted)' }}>Toplam Hediye</p>
            </div>
            <div className="card animate-reveal stagger-2" style={{ textAlign: 'center' }}>
              <Users size={32} style={{ color: 'var(--secondary)', marginBottom: '0.75rem' }} />
              <h2 style={{ marginBottom: '0.5rem' }}>85</h2>
              <p style={{ color: 'var(--text-muted)' }}>Davetli Sayısı</p>
            </div>
            <div className="card animate-reveal stagger-3" style={{ textAlign: 'center' }}>
              <Gift size={32} style={{ color: 'var(--accent)', marginBottom: '0.75rem' }} />
              <h2 style={{ marginBottom: '0.5rem' }}>18</h2>
              <p style={{ color: 'var(--text-muted)' }}>Alınan Hediyeler</p>
            </div>
            <div className="card animate-reveal stagger-4" style={{ textAlign: 'center' }}>
              <Heart size={32} style={{ color: '#ef4444', marginBottom: '0.75rem' }} />
              <h2 style={{ marginBottom: '0.5rem' }}>24</h2>
              <p style={{ color: 'var(--text-muted)' }}>Kalan Hediyeler</p>
            </div>
          </div>
        </div>
      </section>
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
        <link rel="canonical" href={`https://hediyeeslestir.netlify.app${location.pathname}`} />
        <meta property="og:url" content={`https://hediyeeslestir.netlify.app${location.pathname}`} />
        <meta property="og:site_name" content="HediyeEşle" />
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
          <Route path="/smtp-test" element={<SmtpTest />} />

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
