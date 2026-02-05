
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function listTables() {
    try {
        const { data, error } = await supabase.rpc('get_tables'); // Checking if a helper function exists
        if (error) {
            // Fallback: try querying information_schema
            const { data: tables, error: schemaError } = await supabase
                .from('information_schema.tables')
                .select('table_name')
                .eq('table_schema', 'public');

            if (schemaError) {
                console.log('Error Listing Tables:', schemaError.message);
            } else {
                console.log('Tables:', tables.map(t => t.table_name));
            }
        } else {
            console.log('Tables:', data);
        }
    } catch (e) {
        console.log('Error:', e.message);
    }
}

listTables();
