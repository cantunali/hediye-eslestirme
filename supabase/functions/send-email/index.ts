// Follow Supabase Edge Function standard structure
// To deploy: supabase functions deploy send-email

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts"

const SMTP_CONFIG = {
    hostname: "smtp.turkticaret.net",
    port: 465,
    username: "info@photo-transform.com",
    password: "S6$7c&uFont&", // This should ideally be a secret in production
}

const client = new SmtpClient()

serve(async (req) => {
    // CORS check
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } })
    }

    try {
        const { to, subject, html, text, smtpConfig } = await req.json()

        const config = smtpConfig || {
            hostname: "smtp.turkticaret.net",
            port: 465,
            username: "info@photo-transform.com",
            password: "S6$7c&uFont&",
        }

        const client = new SmtpClient()

        if (config.port === 465) {
            await client.connectTLS({
                hostname: config.hostname,
                port: config.port,
                username: config.username,
                password: config.password,
            })
        } else {
            await client.connect({
                hostname: config.hostname,
                port: config.port,
                username: config.username,
                password: config.password,
            })
        }

        await client.send({
            from: config.username,
            to,
            subject,
            content: text || html,
            html: html,
        })

        await client.close()

        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 200, // Return 200 so we can read the error JSON easily in frontend
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
    }
})
