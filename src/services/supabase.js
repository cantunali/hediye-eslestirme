import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
    if (!password) return '';
    return await bcrypt.hash(password, SALT_ROUNDS);
};

const isHashed = (str) => {
    if (!str) return false;
    return (str.startsWith('$2a$') || str.startsWith('$2b$') || str.startsWith('$2y$')) && str.length >= 50;
};

const comparePassword = async (password, hash) => {
    if (!isHashed(hash)) {
        return password === hash;
    }
    try {
        return await bcrypt.compare(password, hash);
    } catch (e) {
        console.error('Bcrypt comparison error:', e);
        return password === hash;
    }
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials missing. App will run in limited mode.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        detectSessionFromUrl: true,  // hash'teki #access_token ve ?code parametrelerini parse et
        persistSession: true,
        autoRefreshToken: true,
    }
});

export const db = {
    // Auth Methods (Using Supabase Auth)
    signUp: async (email, password, fullname) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    fullname
                }
            }
        });
        return { data, error };
    },
    signIn: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    },
    signInWithGoogle: async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        });
        return { data, error };
    },
    signOut: async () => {
        return await supabase.auth.signOut();
    },
    getSession: async () => {
        return await supabase.auth.getSession();
    },
    resetPassword: async (email) => {
        // Send reset email via Supabase Auth directly
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        return { data, error };
    },
    updatePassword: async (newPassword) => {
        const { data, error } = await supabase.auth.updateUser({ password: newPassword });
        return { data, error };
    },
    updatePasswordByEmail: async (email, newPassword) => {
        // Warning: This should only be called if the user is already authenticated
        // Supabase Auth doesn't allow updating other users' passwords by email from the client
        const { data, error } = await supabase.auth.updateUser({ password: newPassword });
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

    getUserConsents: async (userId) => {
        const { data, error } = await supabase
            .from('user_consents')
            .select('consent_type')
            .eq('user_id', userId);
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

    checkGuestConsentsByEmailAndName: async (email, name, eventId) => {
        if (!eventId) return { accepted: false };

        // Find if this specific guest record exists for THIS event
        const { data: guest, error: guestError } = await supabase
            .from('guests')
            .select('id')
            .eq('event_id', eventId)
            .eq('email', email)
            .eq('name', name)
            .maybeSingle();

        if (guestError || !guest) return { accepted: false };

        // Check if THIS guest ID has recorded consents
        const { data: consents, error: consentError } = await supabase
            .from('guest_consents')
            .select('consent_type')
            .eq('guest_id', guest.id);

        if (consentError || !consents) return { accepted: false };

        // We look for 'terms', 'kvkk', and 'marketing'
        const types = consents.map(c => c.consent_type);
        const hasTerms = types.includes('terms');
        const hasKvkk = types.includes('kvkk');
        const hasMarketing = types.includes('marketing');

        return {
            accepted: hasTerms && hasKvkk && hasMarketing,
            consents: {
                terms: hasTerms,
                kvkk: hasKvkk,
                marketing: hasMarketing
            }
        };
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
    reserveGift: async (giftId, guestId, eventId, content, message = null, groupId = null) => {
        const { data, error } = await supabase
            .from('gifts')
            .update({
                status: 'reserved',
                reserved_by: guestId,
                reservation_message: message,
                group_id: groupId
            })
            .eq('id', giftId);

        if (!error && eventId && content) {
            const finalContent = message ? `${content} - Mesaj: ${message}` : content;
            await db.logActivity(eventId, finalContent);
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
        const hashedPassword = await hashPassword(password);
        const { data: eventData, error: eventError } = await supabase
            .from('events')
            .insert([{
                title,
                owner_name,
                owner_email,
                password: hashedPassword,
                event_date,
                user_id, // Link to the logged-in user
                event_type // Categorization of the event
            }])
            .select()
            .single();

        return { data: eventData, error: eventError };
    },
    verifyGuestLogin: async (eventTitle, email, name = null) => {
        // 1. Find the event
        const { data: event, error: eventError } = await supabase
            .from('events')
            .select('id, event_type')
            .eq('title', eventTitle)
            .single();

        if (eventError || !event) return { success: false, error: 'Etkinlik bulunamadı.' };

        // 2. Check if guest exists for this event with this email
        let { data: guest, error: guestError } = await supabase
            .from('guests')
            .select('*')
            .eq('event_id', event.id)
            .eq('email', email)
            .eq('is_active', true)
            .maybeSingle();

        // 3. If guest doesn't exist and name is provided, auto-register
        if (!guest && name) {
            const { data: newGuest, error: createError } = await supabase
                .from('guests')
                .insert([{
                    event_id: event.id,
                    email: email,
                    name: name,
                    password: '' // No password for auto-registered guests
                }])
                .select()
                .single();

            if (createError) return { success: false, error: 'Davetli kaydı oluşturulurken hata oluştu.' };
            guest = newGuest;

            // Log this as an activity
            await db.logActivity(event.id, `${name} (${email}) adlı misafir etkinliğe kendiliğinden katıldı.`);
        }

        if (guestError || !guest) return { success: false, error: 'Bu e-posta adresi ile kayıtlı davetli bulunamadı.' };

        return { success: true, guest, eventId: event.id, eventType: event.event_type };
    },
    verifyEventPassword: async (title, email, password) => {
        // 1. Fetch event
        const { data: event, error } = await supabase
            .from('events')
            .select('*')
            .eq('title', title)
            .eq('owner_email', email)
            .maybeSingle();

        if (error || !event) return { success: false, event: null, error };

        // 2. Compare password
        const isMatch = await comparePassword(password, event.password);
        if (!isMatch) return { success: false, event: null, error: null };

        // 3. Lazy Migration
        if (!isHashed(event.password)) {
            try {
                const hashedPassword = await hashPassword(password);
                const { error: updateError } = await supabase.from('events').update({ password: hashedPassword }).eq('id', event.id);
                if (!updateError) {
                    event.password = hashedPassword;
                }
            } catch (err) {
                console.error('Event lazy migration failed:', err);
            }
        }

        return { success: true, event, error: null };
    },
    bulkUpdateGuestPasswords: async (eventId, newPassword) => {
        const hashedPassword = await hashPassword(newPassword);
        const { data, error } = await supabase
            .from('guests')
            .update({ password: hashedPassword })
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
                amazon_url: gift.amazon_url || '',
                img_url: gift.img_url || null
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
            img_url: g.img_url || null,
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
                amazon_url: updates.amazon_url,
                img_url: updates.img_url
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
        const defaultPassword = await hashPassword('123');
        const { data, error } = await supabase
            .from('guests')
            .insert([{
                ...guest,
                event_id: eventId,
                password: defaultPassword // Default password for new members
            }])
            .select()
            .single();
        return { data, error };
    },
    softDeleteGuest: async (guestId) => {
        const { data, error } = await supabase
            .from('guests')
            .update({ is_active: false })
            .eq('id', guestId);
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
        const defaultPassword = await hashPassword('123');
        const formattedGuests = guestsList.map(g => ({
            name: g.name,
            email: g.email,
            event_id: eventId,
            password: defaultPassword // Default password
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
            img_url: g.img_url || g.image_url || null,
            status: 'available'
        }));

        const { data, error } = await supabase
            .from('gifts')
            .insert(giftsToInsert)
            .select();

        return { data, error };
    },

    uploadGiftImage: async (file) => {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('gift_images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('gift_images')
                .getPublicUrl(filePath);

            return { url: data.publicUrl, error: null };
        } catch (error) {
            console.error('Image upload error:', error.message);
            return { url: null, error };
        }
    },

    updateFeaturedGiftImage: async (giftId, imgUrl) => {
        const { data, error } = await supabase
            .from('featured_gifts')
            .update({ img_url: imgUrl })
            .eq('id', giftId)
            .select()
            .single();
        return { data, error };
    },

    updateGiftImage: async (giftId, imgUrl) => {
        const { data, error } = await supabase
            .from('gifts')
            .update({ img_url: imgUrl })
            .eq('id', giftId)
            .select()
            .single();
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
            supabase.from('user_stats').select('total_users').single(),
            supabase.from('event_stats').select('total_events').single(),
            supabase.from('gift_stats').select('total_gifts').single(),
            supabase.from('guest_stats').select('total_guests').single()
        ]);
        return {
            users: users.data?.total_users || 0,
            events: events.data?.total_events || 0,
            gifts: gifts.data?.total_gifts || 0,
            guests: guests.data?.total_guests || 0,
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
    },

    // Admin Config Methods
    verifyAdminPassword: async (password) => {
        const { data, error } = await supabase
            .from('admin_config')
            .select('value')
            .eq('key', 'admin_password')
            .single();

        if (error || !data) return { success: false, error };

        const isMatch = await comparePassword(password, data.value);
        if (!isMatch) return { success: false, error: null };

        // Lazy Migration for admin
        if (!isHashed(data.value)) {
            try {
                const hashedPassword = await hashPassword(password);
                const { error: updateError } = await db.updateAdminPassword(hashedPassword);
                // No need to update local data.value as it's not returned to a persistent state here
            } catch (err) {
                console.error('Admin lazy migration failed:', err);
            }
        }

        return { success: true, error: null };
    },

    updateAdminPassword: async (newPassword) => {
        // Note: we assume newPassword might already be hashed if called from verifyAdminPassword lazy migration
        // or it's a plain password from the UI.
        const passwordToStore = (newPassword.startsWith('$2a$') || newPassword.startsWith('$2b$'))
            ? newPassword
            : await hashPassword(newPassword);

        const { data, error } = await supabase
            .from('admin_config')
            .update({ value: passwordToStore, updated_at: new Date().toISOString() })
            .eq('key', 'admin_password');
        return { data, error };
    }
};
