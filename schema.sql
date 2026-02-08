-- Database Schema for Hediye Eşleştirme
-- WARNING: These commands will DELETE all existing data!

-- Drop existing tables if they exist (Order matters due to foreign keys)
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS guests;
DROP TABLE IF EXISTS gifts;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;


-- Events Table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_name TEXT NOT NULL,
  owner_email TEXT NOT NULL,
  password TEXT NOT NULL,
  title TEXT NOT NULL UNIQUE,
  type TEXT DEFAULT 'general',
  event_date DATE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gifts Table
CREATE TABLE gifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  brand TEXT,
  model TEXT,
  hepsiburada_url TEXT,
  amazon_url TEXT,
  status TEXT DEFAULT 'available', -- 'available', 'reserved'
  category TEXT DEFAULT 'Diğer',
  reserved_by UUID,
  group_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guests Table
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Groups Table
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  members JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);-- Activities Table
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Featured gifts (Recommended products)
CREATE TABLE featured_gifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  brand TEXT,
  model TEXT,
  hepsiburada_url TEXT,
  amazon_url TEXT,
  image_url TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
-- Sample Data for Featured Gifts
INSERT INTO featured_gifts (name, brand, model, hepsiburada_url, amazon_url, category) VALUES
('Filtre Kahve Makinesi', 'Moccamaster', 'KBG Select', 'https://www.hepsiburada.com/ara?q=moccamaster', 'https://www.amazon.com.tr/s?k=moccamaster', 'Elektronik'),
('Robot Süpürge', 'Roborock', 'Q7 Max', 'https://www.hepsiburada.com/ara?q=roborock+q7', 'https://www.amazon.com.tr/s?k=roborock+q7', 'Ev Gereçleri'),
('Airfryer XXL', 'Philips', 'HD9650/90', 'https://www.hepsiburada.com/ara?q=philips+airfryer+xxl', 'https://www.amazon.com.tr/s?k=philips+airfryer+xxl', 'Mutfak'),
('Döküm Tencere Seti', 'Lava', 'Vintage', 'https://www.hepsiburada.com/ara?q=lava+dokum+tencere', 'https://www.amazon.com.tr/s?k=lava+dokum+tencere', 'Mutfak'),
('Akıllı Saat', 'Apple', 'Watch Series 8', 'https://www.hepsiburada.com/ara?q=apple+watch+8', 'https://www.amazon.com.tr/s?k=apple+watch+8', 'Elektronik'),
('Nevresim Takımı', 'Linens', 'Saten', 'https://www.hepsiburada.com/ara?q=linens+nevresim', 'https://www.amazon.com.tr/s?k=linens+nevresim', 'Tekstil'),
('Yemek Takımı', 'Kütahya Porselen', '6 Kişilik', 'https://www.hepsiburada.com/ara?q=kutahya+porselen+yemek+takimi', 'https://www.amazon.com.tr/s?k=kutahya+porselen+yemek+takimi', 'Züccaciye');


CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  fullname TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);