const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key prefix:", supabaseAnonKey ? supabaseAnonKey.substring(0, 10) : "undefined");

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testReset() {
    const email = 'cantunali@gmail.com'; // Using a standard email to test
    console.log(`Sending reset request for ${email}...`);
    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://hediyeeslestir.com/reset-password',
        });
        if (error) {
            console.error("Supabase returned error:", error);
        } else {
            console.log("Supabase returned success! Data:", data);
        }
    } catch (err) {
        console.error("Exception occurred:", err);
    }
}

testReset();
