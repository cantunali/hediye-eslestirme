
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function check() {
    try {
        const { data, error } = await supabase.from('users').select('*').limit(1);
        if (error) {
            console.log('Error:', error.message);
        } else {
            console.log('EXISTS');
        }
    } catch (e) {
        console.log('Error:', e.message);
    }
}

check();
