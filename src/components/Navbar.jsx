"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Users, Menu, X, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Close checkbox when path changes
  useEffect(() => {
    const checkbox = document.getElementById('mobile-menu-checkbox');
    if (checkbox) {
      checkbox.checked = false;
    }
    setIsOpen(false);
  }, [currentPath]);

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

  const handleCheckboxChange = (e) => {
    setIsOpen(e.target.checked);
  };

  const handleGuestPortalClick = async (e) => {
    e.preventDefault();
    if (user) {
      await signOut();
    }
    router.push('/davetli-girisi');
  };

  return (
    <>
      <input 
        type="checkbox" 
        id="mobile-menu-checkbox" 
        className="mobile-menu-checkbox" 
        onChange={handleCheckboxChange}
      />
      <nav className="glass" style={{
        position: 'sticky',
        top: '0',
        zIndex: 100,
        padding: '1rem 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: '800', textDecoration: 'none', color: '#ffffff' }}
          >
            <span style={{ letterSpacing: '-0.03em' }}>HediyeEşleştir</span>
          </Link>

          {/* CSS-only Toggle Label instead of a Button */}
          <label
            htmlFor="mobile-menu-checkbox"
            className="mobile-menu-btn mobile-only"
            style={{
              padding: '0.5rem',
              color: 'var(--on-surface)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Menu className="menu-icon" size={28} />
            <X className="close-icon" size={28} />
          </label>

          {/* Desktop Menu */}
          <div className="desktop-only" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link
              href="/blog"
              className={`btn ${currentPath === '/blog' ? 'btn-primary' : 'btn-outline'}`}
            >
              Blog
            </Link>
            <button
              className={`btn ${currentPath === '/davetli-girisi' ? 'btn-primary' : 'btn-outline'}`}
              onClick={handleGuestPortalClick}
            >
              Davetli Girişi
            </button>

            {user ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link
                  href="/yonetim"
                  className={`btn ${currentPath.startsWith('/yonetim') ? 'btn-primary' : 'btn-outline'}`}
                >
                  <Settings size={18} /> Panelim
                </Link>
                <button className="btn btn-outline" onClick={signOut}>Çıkış</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link
                  href="/login"
                  className="btn"
                  style={{ color: 'var(--on-surface)', background: 'none' }}
                >
                  Giriş Yap
                </Link>
                <Link
                  href="/signup"
                  className="btn btn-primary"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay is rendered unconditionally in HTML so it is present without JavaScript */}
      <div className="mobile-menu-overlay mobile-only animate-fade-in" style={{
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
        <Link
          href="/blog"
          className={`btn ${currentPath === '/blog' ? 'btn-primary' : 'btn-outline'}`}
          style={{ fontSize: '1.1rem', padding: '1.25rem' }}
        >
          Blog & Rehberler
        </Link>
        <button
          className={`btn ${currentPath === '/davetli-girisi' ? 'btn-primary' : 'btn-outline'}`}
          onClick={handleGuestPortalClick}
          style={{ fontSize: '1.1rem', padding: '1.25rem' }}
        >
          <Users size={20} /> Davetli Girişi
        </button>

        {user ? (
          <>
            <Link
              href="/yonetim"
              className={`btn ${currentPath.startsWith('/yonetim') ? 'btn-primary' : 'btn-outline'}`}
              style={{ fontSize: '1.1rem', padding: '1.25rem' }}
            >
              <Settings size={20} /> Panelim
            </Link>
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
            <Link
              href="/login"
              className="btn btn-outline"
              style={{ fontSize: '1.1rem', padding: '1.25rem' }}
            >
              Giriş Yap
            </Link>
            <Link
              href="/signup"
              className="btn btn-primary"
              style={{ fontSize: '1.1rem', padding: '1.25rem' }}
            >
              Kayıt Ol
            </Link>
          </>
        )}
        <div style={{ marginTop: 'auto', textAlign: 'center', color: 'var(--on-surface-variant)', fontSize: '0.9rem' }}>
          HediyeEşleştir &copy; 2026
        </div>
      </div>
    </>
  );
};

export default Navbar;
