import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase, db } from '../services/supabase';

const AuthContext = createContext();

// Google → 'name', email/password → 'fullname', bazı provider'lar → 'full_name'
const mapUser = (authUser) => ({
    ...authUser,
    fullname:
        authUser.user_metadata?.fullname ||
        authUser.user_metadata?.name ||
        authUser.user_metadata?.full_name ||
        authUser.email?.split('@')[0] ||
        'İsimsiz Kullanıcı'
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser(mapUser(session.user));
            }
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser(mapUser(session.user));
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const value = {
        signUp: async (email, password, fullname) => {
            return await db.signUp(email, password, fullname);
        },
        signIn: async (email, password) => {
            return await db.signIn(email, password);
        },
        signInWithGoogle: async () => {
            return await db.signInWithGoogle();
        },
        signOut: async () => {
            return await db.signOut();
        },
        resetPassword: (email) => db.resetPassword(email),
        updatePassword: (newPassword) => {
            return db.updatePassword(newPassword);
        },
        updatePasswordByEmail: (email, newPassword) => db.updatePasswordByEmail(email, newPassword),
        updateProfile: async (updates) => {
            const res = await db.updateProfile(user.id, updates);
            if (!res.error) {
                // Also update auth metadata if fullname changes
                if (updates.fullname) {
                    await supabase.auth.updateUser({
                        data: { fullname: updates.fullname }
                    });
                }
            }
            return res;
        },
        deactivateAccount: async () => {
            if (!user?.id) return { error: { message: 'Not logged in' } };
            const res = await db.deactivateAccount(user.id);
            if (!res.error) {
                await db.signOut();
            }
            return res;
        },
        recordConsents: (userId, consents) => db.recordConsents(userId, consents),
        checkPassword: () => true, // Deprecated with Supabase Auth
        user,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
