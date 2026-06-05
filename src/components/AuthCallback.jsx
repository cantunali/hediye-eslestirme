"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, db } from '../services/supabase';
import { Loader2, AlertCircle } from 'lucide-react';

const REQUIRED_CONSENTS = ['terms', 'kvkk', 'marketing'];

const resolveDestination = async (userId) => {
    const { data: consents } = await db.getUserConsents(userId);
    const given = consents?.map(c => c.consent_type) ?? [];
    const hasAll = REQUIRED_CONSENTS.every(t => given.includes(t));
    return hasAll ? '/yonetim' : '/consent';
};

const AuthCallback = () => {
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        // onAuthStateChange fires when Supabase exchanges the PKCE code for a session
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
                const dest = await resolveDestination(session.user.id);
                router.replace(dest);
            }
        });

        // Fallback: session might already exist (e.g. page refresh on callback URL)
        supabase.auth.getSession().then(async ({ data: { session }, error: sessionError }) => {
            if (sessionError) {
                setError('Google girişi sırasında bir hata oluştu: ' + sessionError.message);
                return;
            }
            if (session) {
                const dest = await resolveDestination(session.user.id);
                router.replace(dest);
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    if (error) {
        return (
            <div className="section container animate-fade-in" style={{ maxWidth: '450px', margin: '4rem auto' }}>
                <div className="card" style={{ textAlign: 'center', padding: '3rem 2.5rem' }}>
                    <AlertCircle size={40} style={{ color: 'var(--error)', margin: '0 auto 1rem' }} />
                    <h3>Giriş Başarısız</h3>
                    <p style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem', fontSize: '0.9rem' }}>{error}</p>
                    <button className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }} onClick={() => router.push('/login')}>
                        Giriş Sayfasına Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="section container animate-fade-in" style={{ maxWidth: '450px', margin: '4rem auto' }}>
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2.5rem' }}>
                <Loader2 className="animate-spin" size={40} style={{ color: 'var(--primary)', margin: '0 auto 1.5rem', display: 'block' }} />
                <h3>Giriş yapılıyor...</h3>
                <p style={{ color: 'var(--on-surface-variant)', marginTop: '0.5rem' }}>Google hesabınız doğrulanıyor, lütfen bekleyin.</p>
            </div>
        </div>
    );
};

export default AuthCallback;
