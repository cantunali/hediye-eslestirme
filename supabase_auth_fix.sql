-- ==============================================================================
-- SUPABASE AUTH FIX: IDENTITIES MIGRATION SCRIPT
-- ==============================================================================

-- Supabase Auth sisteminde bir kullanıcının (auth.users) e-posta ile giriş 
-- yapabilmesi için auth.identities tablosunda da bir kaydının olması gerekir.
-- Bu script eksik kimlik (identity) kayıtlarını oluşturacaktır.

INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
)
SELECT 
    gen_random_uuid(),
    id,
    jsonb_build_object('sub', id, 'email', email, 'email_verified', true),
    'email',
    id::text,
    now(),
    created_at,
    now()
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM auth.identities)
ON CONFLICT DO NOTHING;

-- İşlem Tamam! Lütfen bu kodu Supabase SQL Editor'de çalıştırın.
