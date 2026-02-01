import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials missing. App will run in limited mode.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const db = {
    getEvents: async () => {
        const { data, error } = await supabase.from('events').select('*');
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
    createEvent: async ({ title, owner, owner_email, password, event_date }) => {
        const { data: eventData, error: eventError } = await supabase
            .from('events')
            .insert([{
                title,
                owner_name: owner,
                owner_email: owner_email,
                password,
                event_date,
                type: 'general'
            }])
            .select()
            .single();

        return { data: eventData, error: eventError };
    },
    verifyGuestLogin: async (eventTitle, email, password) => {
        // 1. Find the event
        const { data: event, error: eventError } = await supabase
            .from('events')
            .select('id')
            .eq('title', eventTitle)
            .single();

        if (eventError || !event) return { success: false, error: 'Etkinlik bulunamadı.' };

        // 2. Check if guest exists for this event with this email and password
        const { data: guest, error: guestError } = await supabase
            .from('guests')
            .select('*')
            .eq('event_id', event.id)
            .eq('email', email)
            .eq('password', password)
            .single();

        if (guestError || !guest) return { success: false, error: 'Hatalı e-posta veya şifre.' };

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
    getActivities: async (eventId) => {
        const { data, error } = await supabase
            .from('activities')
            .select('*')
            .eq('event_id', eventId)
            .order('created_at', { ascending: false })
            .limit(10);
        return { data, error };
    },
    logActivity: async (eventId, content) => {
        const { data, error } = await supabase
            .from('activities')
            .insert([{ event_id: eventId, content }]);
        return { data, error };
    },

    getFeaturedGifts: async () => {
        const { data, error } = await supabase
            .from('featured_gifts')
            .select('*');
        return { data, error };
    },

    copyFeaturedGiftsToEvent: async (eventId, featuredGifts) => {
        const giftsToInsert = featuredGifts.map(g => ({
            event_id: eventId,
            name: g.name,
            brand: g.brand,
            model: g.model,
            hepsiburada_url: g.hepsiburada_url,
            amazon_url: g.amazon_url,
            status: 'available'
        }));

        const { data, error } = await supabase
            .from('gifts')
            .insert(giftsToInsert)
            .select();

        return { data, error };
    }
};
