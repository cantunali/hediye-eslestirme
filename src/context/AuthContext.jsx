import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../services/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem('hediye_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse stored user', e);
                localStorage.removeItem('hediye_user');
            }
        }
        setLoading(false);
    }, []);

    const value = {
        signUp: async (email, password, fullname) => {
            const { data, error } = await db.signUp(email, password, fullname);
            return { data, error };
        },
        signIn: async (email, password) => {
            const { data, error } = await db.signIn(email, password);
            if (data?.user) {
                setUser(data.user);
                localStorage.setItem('hediye_user', JSON.stringify(data.user));
            }
            return { data, error };
        },
        signOut: async () => {
            localStorage.removeItem('hediye_user');
            setUser(null);
            return { error: null };
        },
        resetPassword: (email) => db.resetPassword(email),
        updatePassword: (newPassword) => {
            if (!user?.id) return { error: { message: 'Not logged in' } };
            return db.updatePassword(newPassword, user.id);
        },
        updatePasswordByEmail: (email, newPassword) => db.updatePasswordByEmail(email, newPassword),
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
