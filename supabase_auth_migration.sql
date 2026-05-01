-- ==============================================================================
-- SUPABASE AUTH MIGRATION SCRIPT
-- Bu scripti Supabase Dashboard -> SQL Editor kısmına yapıştırıp çalıştırın.
-- ==============================================================================

-- 1. MEVCUT KULLANICILARI AUTH.USERS TABLOSUNA AKTARMA
-- public.users tablosundaki kullanıcıları, şifreleri (bcrypt) ve id'leri ile
-- birlikte auth.users tablosuna kopyalıyoruz.

INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
)
SELECT 
    '00000000-0000-0000-0000-000000000000', -- Default instance UUID
    id,                                     -- public.users tablosundaki id (UUID)
    'authenticated',                        -- Varsayılan aud
    'authenticated',                        -- Varsayılan rol
    email,
    password,                               -- BCRYPT hashli şifre
    now(),                                  -- E-postaları otomatik onaylanmış sayıyoruz
    '{"provider":"email","providers":["email"]}'::jsonb,
    jsonb_build_object('fullname', fullname), -- İsim bilgisini meta_data içinde saklıyoruz
    created_at,
    now()
FROM public.users
-- Eğer daha önceden aynı ID ile eklenmişse hata vermemesi için
ON CONFLICT (id) DO NOTHING;

-- 2. OTOMATİK PROFİL OLUŞTURMA FONKSİYONU (TRIGGER FUNCTION)
-- Bundan sonra kayıt olan kullanıcılar auth.users'a eklendiğinde,
-- otomatik olarak public.users tablosuna da eklenecek.

CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, fullname, password, is_active)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'fullname', 'İsimsiz Kullanıcı'),
    'supabase-auth', -- Şifre artık auth.users tablosunda tutulduğu için buraya dummy bir değer yazıyoruz
    TRUE
  )
  ON CONFLICT (id) DO UPDATE SET 
    email = EXCLUDED.email,
    fullname = EXCLUDED.fullname;
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. TRIGGER OLUŞTURMA
-- auth.users tablosuna insert olduğunda handle_new_user fonksiyonunu tetikle.

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- İşlem Tamam!
