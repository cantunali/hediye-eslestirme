const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkCounts() {
    try {
        const tables = ['users', 'events', 'guests', 'gifts'];
        for (const table of tables) {
            const { count, error } = await supabase
                .from(table)
                .select('*', { count: 'exact', head: true });
            
            if (error) {
                console.error(`Failed to get count for ${table}:`, error.message);
            } else {
                console.log(`Table "${table}" has ${count} rows.`);
            }
        }
    } catch (err) {
        console.error("Exception occurred:", err);
    }
}

checkCounts();
