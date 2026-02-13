import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials missing. App will run in limited mode.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const db = {
    // Auth Methods (Manual DB Auth)
    signUp: async (email, password, fullname) => {
        const { data, error } = await supabase
            .from('users')
            .insert([{ email, password, fullname }])
            .select()
            .single();
        return { data: { user: data }, error };
    },
    signIn: async (email, password) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .eq('is_active', true)
            .single();

        if (error || !data) {
            return { data: null, error: error || { message: 'Geçersiz bilgiler veya hesap pasif durumda.' } };
        }
        return { data: { user: data }, error: null };
    },
    signOut: async () => {
        // Handled in AuthContext (localStorage.removeItem)
        return { error: null };
    },
    getSession: async () => {
        // Handled in AuthContext (localStorage.getItem)
        return { session: null, error: null };
    },
    resetPassword: async (email) => {
        const { data, error } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .maybeSingle();

        if (error) return { data: null, error };
        if (!data) return { data: null, error: { message: 'Bu e-posta adresi ile kayıtlı bir kullanıcı bulunamadı.' } };

        return { data: true, error: null };
    },
    updatePassword: async (newPassword, userId) => {
        const { data, error } = await supabase
            .from('users')
            .update({ password: newPassword })
            .eq('id', userId);
        return { data, error };
    },
    updatePasswordByEmail: async (email, newPassword) => {
        const { data, error } = await supabase
            .from('users')
            .update({ password: newPassword })
            .eq('email', email);
        return { data, error };
    },
    updateProfile: async (userId, updates) => {
        const { data, error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();
        return { data: { user: data }, error };
    },
    deactivateAccount: async (userId) => {
        const { data, error } = await supabase
            .from('users')
            .update({ is_active: false })
            .eq('id', userId);
        return { data, error };
    },

    recordConsents: async (userId, consents) => {
        const entries = Object.entries(consents)
            .filter(([_, accepted]) => accepted)
            .map(([type, _]) => ({
                user_id: userId,
                consent_type: type,
                accepted_at: new Date().toISOString()
            }));

        if (entries.length === 0) return { data: null, error: null };

        const { data, error } = await supabase
            .from('user_consents')
            .insert(entries);
        return { data, error };
    },

    recordGuestConsents: async (guestId, consents) => {
        const entries = Object.entries(consents)
            .filter(([_, accepted]) => accepted)
            .map(([type, _]) => ({
                guest_id: guestId,
                consent_type: type,
                accepted_at: new Date().toISOString()
            }));

        if (entries.length === 0) return { data: null, error: null };

        const { data, error } = await supabase
            .from('guest_consents')
            .insert(entries);
        return { data, error };
    },

    getUserEvents: async (userId) => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('user_id', userId);
        return { data, error };
    },

    getEvents: async () => {
        const { data, error } = await supabase.from('events').select('*');
        return { data, error };
    },
    getEventById: async (eventId) => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('id', eventId)
            .maybeSingle();
        return { data, error };
    },
    checkEventTitleExists: async (title) => {
        const { data, error } = await supabase
            .from('events')
            .select('id')
            .eq('title', title)
            .maybeSingle();
        return { exists: !!data, error };
    },
    getGifts: async (eventId) => {
        const { data, error } = await supabase.from('gifts').select('*').eq('event_id', eventId);
        return { data, error };
    },
    reserveGift: async (giftId, guestId, eventId, content, groupId = null) => {
        const { data, error } = await supabase
            .from('gifts')
            .update({
                status: 'reserved',
                reserved_by: guestId,
                group_id: groupId
            })
            .eq('id', giftId);

        if (!error && eventId && content) {
            await db.logActivity(eventId, content);
        }
        return { data, error };
    },
    createGroup: async (name, event_id, members) => {
        const { data, error } = await supabase
            .from('groups')
            .insert([{ name, event_id, members }])
            .select()
            .single();

        if (data) {
            await db.logActivity(event_id, `${name} adlı yeni bir grup kuruldu.`);
        }
        return { data, error };
    },
    createEvent: async ({ title, owner_name, owner_email, password, event_date, user_id, event_type = 'Evlilik - Ev Hediyesi' }) => {
        const { data: eventData, error: eventError } = await supabase
            .from('events')
            .insert([{
                title,
                owner_name,
                owner_email,
                password,
                event_date,
                user_id, // Link to the logged-in user
                event_type // Categorization of the event
            }])
            .select()
            .single();

        return { data: eventData, error: eventError };
    },
    verifyGuestLogin: async (eventTitle, email) => {
        // 1. Find the event
        const { data: event, error: eventError } = await supabase
            .from('events')
            .select('id')
            .eq('title', eventTitle)
            .single();

        if (eventError || !event) return { success: false, error: 'Etkinlik bulunamadı.' };

        // 2. Check if guest exists for this event with this email
        const { data: guest, error: guestError } = await supabase
            .from('guests')
            .select('*')
            .eq('event_id', event.id)
            .eq('email', email)
            .maybeSingle();

        if (guestError || !guest) return { success: false, error: 'Bu e-posta adresi ile kayıtlı davetli bulunamadı.' };

        return { success: true, guest, eventId: event.id };
    },
    verifyEventPassword: async (title, email, password) => {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('title', title)
            .eq('owner_email', email)
            .eq('password', password)
            .maybeSingle();

        return { success: !!data, event: data, error };
    },
    bulkUpdateGuestPasswords: async (eventId, newPassword) => {
        const { data, error } = await supabase
            .from('guests')
            .update({ password: newPassword })
            .eq('event_id', eventId);
        return { data, error };
    },
    addGift: async (eventId, gift) => {
        const { data, error } = await supabase
            .from('gifts')
            .insert([{
                ...gift,
                event_id: eventId,
                status: 'available',
                category: gift.category || 'Diğer',
                hepsiburada_url: gift.hepsiburada_url || '',
                amazon_url: gift.amazon_url || ''
            }])
            .select()
            .single();
        return { data, error };
    },
    removeGift: async (giftId) => {
        const { data, error } = await supabase
            .from('gifts')
            .delete()
            .eq('id', giftId);
        return { data, error };
    },
    bulkAddGifts: async (eventId, giftsList) => {
        const formattedGifts = giftsList.map(g => ({
            name: g.name,
            brand: g.brand || '',
            model: g.model || '',
            category: g.category || 'Diğer',
            hepsiburada_url: g.hepsiburada_url || '',
            amazon_url: g.amazon_url || '',
            event_id: eventId,
            status: 'available'
        }));
        const { data, error } = await supabase
            .from('gifts')
            .insert(formattedGifts)
            .select();
        return { data, error };
    },
    updateGift: async (giftId, updates) => {
        const { data, error } = await supabase
            .from('gifts')
            .update({
                name: updates.name,
                brand: updates.brand,
                model: updates.model,
                category: updates.category,
                hepsiburada_url: updates.hepsiburada_url,
                amazon_url: updates.amazon_url
            })
            .eq('id', giftId)
            .select()
            .single();
        return { data, error };
    },
    getGuests: async (eventId) => {
        const { data, error } = await supabase
            .from('guests')
            .select('*')
            .eq('event_id', eventId);
        return { data, error };
    },
    addGuest: async (eventId, guest) => {
        const { data, error } = await supabase
            .from('guests')
            .insert([{
                ...guest,
                event_id: eventId,
                password: '123' // Default password for new members
            }])
            .select()
            .single();
        return { data, error };
    },
    removeGuest: async (guestId) => {
        const { data, error } = await supabase
            .from('guests')
            .delete()
            .eq('id', guestId);
        return { data, error };
    },
    bulkAddGuests: async (eventId, guestsList) => {
        const formattedGuests = guestsList.map(g => ({
            name: g.name,
            email: g.email,
            event_id: eventId,
            password: '123' // Default password
        }));
        const { data, error } = await supabase
            .from('guests')
            .insert(formattedGuests)
            .select();
        return { data, error };
    },
    getActivities: async (eventId, limit = 10) => {
        let query = supabase
            .from('activities')
            .select('*')
            .eq('event_id', eventId)
            .order('created_at', { ascending: false });

        if (limit) {
            query = query.limit(limit);
        }

        const { data, error } = await query;
        return { data, error };
    },
    logActivity: async (eventId, content) => {
        const { data, error } = await supabase
            .from('activities')
            .insert([{ event_id: eventId, content }]);
        return { data, error };
    },

    getFeaturedGifts: async (eventType = null) => {
        let query = supabase.from('featured_gifts').select('*');
        if (eventType) {
            query = query.eq('event_type', eventType);
        }
        const { data, error } = await query;
        return { data, error };
    },

    copyFeaturedGiftsToEvent: async (eventId, featuredGifts) => {
        const giftsToInsert = featuredGifts.map(g => ({
            event_id: eventId,
            name: g.name,
            brand: g.brand,
            model: g.model,
            category: g.category,
            hepsiburada_url: g.hepsiburada_url,
            amazon_url: g.amazon_url,
            status: 'available'
        }));

        const { data, error } = await supabase
            .from('gifts')
            .insert(giftsToInsert)
            .select();

        return { data, error };
    },

    sendEmail: async ({ to, subject, html, text, smtpConfig }) => {
        const { data, error } = await supabase.functions.invoke('send-email', {
            body: { to, subject, html, text, smtpConfig },
        });
        return { data, error };
    },

    // Global Admin Methods
    getGlobalStats: async () => {
        const [users, events, gifts, guests] = await Promise.all([
            supabase.from('users').select('*', { count: 'exact', head: true }),
            supabase.from('events').select('*', { count: 'exact', head: true }),
            supabase.from('gifts').select('*', { count: 'exact', head: true }),
            supabase.from('guests').select('*', { count: 'exact', head: true })
        ]);

        return {
            users: users.count || 0,
            events: events.count || 0,
            gifts: gifts.count || 0,
            guests: guests.count || 0,
            error: users.error || events.error || gifts.error || guests.error
        };
    },

    getAllEvents: async (limit = 50) => {
        const { data, error } = await supabase
            .from('events')
            .select('*, users(fullname, email)')
            .order('created_at', { ascending: false })
            .limit(limit);
        return { data, error };
    },

    getPlatformActivities: async (limit = 50) => {
        const { data, error } = await supabase
            .from('activities')
            .select('*, events(title)')
            .order('created_at', { ascending: false })
            .limit(limit);
        return { data, error };
    }
};
