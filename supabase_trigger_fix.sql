-- ==============================================================================
-- SUPABASE AUTH TRIGGER FIX
-- Supabase SQL Editor'da çalıştırın.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- ADIM 1: TANI — Trigger ve fonksiyon durumunu kontrol edin
-- Bu bloğu çalıştırın ve sonuçları okuyun.
-- ------------------------------------------------------------------------------

-- Trigger var mı?
SELECT
    trigger_name,
    event_manipulation,
    event_object_schema,
    event_object_table,
    action_timing
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
-- Sonuç boşsa trigger HİÇ oluşturulmamış demektir.

-- Fonksiyon var mı ve search_path ayarı doğru mu?
SELECT
    proname,
    prosecdef,          -- TRUE = SECURITY DEFINER
    proconfig           -- search_path ayarı burada görünür
FROM pg_proc
WHERE proname = 'handle_new_user';
-- proconfig NULL veya search_path içermiyorsa bug #1 budur.

-- auth.users'da olup public.users'da olmayan kullanıcılar:
SELECT count(*) AS eksik_kullanici_sayisi
FROM auth.users au
WHERE au.id NOT IN (SELECT id FROM public.users);

-- Bu kullanıcıların detayları:
SELECT au.id, au.email, au.raw_user_meta_data, au.created_at
FROM auth.users au
WHERE au.id NOT IN (SELECT id FROM public.users)
ORDER BY au.created_at DESC;


-- ------------------------------------------------------------------------------
-- ADIM 2: DÜZELTİLMİŞ TRIGGER FONKSİYONU
--
-- Düzeltmeler:
--   - SET search_path = ''  →  Supabase'in auth trigger güvenlik zorunluluğu
--   - Google 'name' alanı  →  Google, raw_user_meta_data'ya 'name' yazar, 'fullname' değil
--   - EXECUTE FUNCTION     →  EXECUTE PROCEDURE eski sözdizimi (PostgreSQL 11+)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''              -- Supabase auth trigger zorunluluğu
AS $$
BEGIN
    INSERT INTO public.users (id, email, fullname, password, is_active, created_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(
            NULLIF(NEW.raw_user_meta_data->>'fullname', ''),  -- e-posta/şifre ile kayıt
            NULLIF(NEW.raw_user_meta_data->>'name', ''),      -- Google OAuth
            NULLIF(NEW.raw_user_meta_data->>'full_name', ''), -- bazı OAuth sağlayıcılar
            split_part(NEW.email, '@', 1)                     -- son çare: email prefix
        ),
        'supabase-auth',   -- şifre artık auth.users'da, burası placeholder
        TRUE,
        NEW.created_at
    )
    ON CONFLICT (id) DO UPDATE SET
        email    = EXCLUDED.email,
        fullname = CASE
            WHEN public.users.fullname IS NULL OR public.users.fullname = 'İsimsiz Kullanıcı'
            THEN EXCLUDED.fullname
            ELSE public.users.fullname
        END;

    RETURN NEW;
END;
$$;

-- ------------------------------------------------------------------------------
-- ADIM 3: TRIGGER'I YENİDEN OLUŞTUR
-- ------------------------------------------------------------------------------

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- ADIM 4: GERİYE DÖNÜK SYNC (BACKFILL)
-- auth.users'da olup public.users'da olmayan mevcut kullanıcıları ekler.
-- Trigger düzeltmesi yalnızca YENİ girişleri yakalar; eskiler için bu gerekli.
-- ------------------------------------------------------------------------------

INSERT INTO public.users (id, email, fullname, password, is_active, created_at)
SELECT
    au.id,
    au.email,
    COALESCE(
        NULLIF(au.raw_user_meta_data->>'fullname', ''),
        NULLIF(au.raw_user_meta_data->>'name', ''),
        NULLIF(au.raw_user_meta_data->>'full_name', ''),
        split_part(au.email, '@', 1)
    ),
    'supabase-auth',
    TRUE,
    au.created_at
FROM auth.users au
WHERE au.id NOT IN (SELECT id FROM public.users)
ON CONFLICT (id) DO NOTHING;

-- Kaç kullanıcı eklendi?
SELECT count(*) AS public_users_toplam FROM public.users;

-- ------------------------------------------------------------------------------
-- ADIM 5: DOĞRULAMA
-- Her şey doğruysa bu sorgular eşleşmeli.
-- ------------------------------------------------------------------------------

-- auth.users sayısı = public.users sayısı olmalı
SELECT
    (SELECT count(*) FROM auth.users)    AS auth_users,
    (SELECT count(*) FROM public.users)  AS public_users,
    (SELECT count(*) FROM auth.users) - (SELECT count(*) FROM public.users) AS fark;

-- Trigger tanımı doğru mu?
SELECT
    trigger_name,
    action_timing,
    event_manipulation,
    action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- Fonksiyon search_path ayarı yerinde mi?
SELECT proname, proconfig
FROM pg_proc
WHERE proname = 'handle_new_user';
-- proconfig → {search_path=} görünmeli
