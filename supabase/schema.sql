-- ==============================================================================
-- THE CLOVER KITCHEN — SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase Project SQL Editor
-- (Dashboard -> SQL Editor -> New Query -> Paste & Run)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. RECIPES TABLE
CREATE TABLE IF NOT EXISTS public.recipes (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cuisine TEXT NOT NULL,
    cuisine_id TEXT,
    image TEXT,
    description TEXT,
    prep_time INTEGER DEFAULT 20,
    cook_time INTEGER DEFAULT 30,
    total_time INTEGER DEFAULT 50,
    servings INTEGER DEFAULT 4,
    difficulty TEXT DEFAULT 'medium',
    calories INTEGER DEFAULT 500,
    protein INTEGER DEFAULT 25,
    carbs INTEGER DEFAULT 45,
    fat INTEGER DEFAULT 18,
    fiber INTEGER DEFAULT 4,
    sugar INTEGER DEFAULT 3,
    rating NUMERIC(3, 1) DEFAULT 4.8,
    saves INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    creator_id TEXT,
    creator_name TEXT,
    creator_avatar TEXT,
    has_video BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    ingredients JSONB DEFAULT '[]'::jsonb,
    instructions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PANTRY ITEMS TABLE (For Smart Pantry AI Cooker persistence)
CREATE TABLE IF NOT EXISTS public.pantry_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    ingredient_name TEXT NOT NULL,
    category TEXT DEFAULT 'staple',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. SAVED RECIPES (Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    recipe_id TEXT REFERENCES public.recipes(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, recipe_id)
);

-- 5. SOCIAL FEED POSTS TABLE
CREATE TABLE IF NOT EXISTS public.posts (
    id TEXT PRIMARY KEY DEFAULT ('post-' || substr(md5(random()::text), 1, 8)),
    creator_id TEXT NOT NULL,
    creator_name TEXT NOT NULL,
    creator_avatar TEXT,
    creator_level INTEGER DEFAULT 4,
    creator_badge TEXT DEFAULT 'Creator',
    type TEXT DEFAULT 'recipe',
    content TEXT NOT NULL,
    image TEXT,
    recipe_id TEXT,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    saves INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    chef_coins_earned INTEGER DEFAULT 50,
    hashtags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. MARKETPLACE ITEMS TABLE ("From My Kitchen")
CREATE TABLE IF NOT EXISTS public.marketplace_items (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image TEXT,
    price NUMERIC(10, 2) NOT NULL,
    rating NUMERIC(3, 1) DEFAULT 4.9,
    reviews INTEGER DEFAULT 0,
    seller_id TEXT,
    seller_name TEXT,
    seller_avatar TEXT,
    seller_rating NUMERIC(3, 1) DEFAULT 4.9,
    cuisine TEXT DEFAULT 'North Indian',
    is_veg BOOLEAN DEFAULT true,
    allergens TEXT[] DEFAULT '{}',
    portion_size TEXT DEFAULT '1-2 People',
    prep_time TEXT DEFAULT '30 mins',
    availability TEXT DEFAULT 'Available Now',
    delivery_type TEXT DEFAULT 'Both',
    orders INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. USER PROFILES & WALLET
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    avatar TEXT,
    level INTEGER DEFAULT 4,
    level_name TEXT DEFAULT 'Food Creator',
    chef_coins INTEGER DEFAULT 1248,
    followers INTEGER DEFAULT 340,
    following INTEGER DEFAULT 120,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. WALLET TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('earn', 'spend')),
    amount INTEGER NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. COMMUNITIES TABLE
CREATE TABLE IF NOT EXISTS public.communities (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    cover_image TEXT,
    icon TEXT,
    members INTEGER DEFAULT 100,
    category TEXT DEFAULT 'Regional',
    is_public BOOLEAN DEFAULT true,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ENABLE ROW LEVEL SECURITY (RLS) FOR SAFE PUBLIC ACCESS
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pantry_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;

-- CREATE OPEN READ & INSERT POLICIES FOR DEMO / PUBLIC PURPOSES
CREATE POLICY "Allow public read on recipes" ON public.recipes FOR SELECT USING (true);
CREATE POLICY "Allow public insert on recipes" ON public.recipes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on recipes" ON public.recipes FOR UPDATE USING (true);

CREATE POLICY "Allow public all on pantry_items" ON public.pantry_items FOR ALL USING (true);
CREATE POLICY "Allow public all on saved_recipes" ON public.saved_recipes FOR ALL USING (true);
CREATE POLICY "Allow public all on posts" ON public.posts FOR ALL USING (true);
CREATE POLICY "Allow public all on marketplace_items" ON public.marketplace_items FOR ALL USING (true);
CREATE POLICY "Allow public all on user_profiles" ON public.user_profiles FOR ALL USING (true);
CREATE POLICY "Allow public all on transactions" ON public.transactions FOR ALL USING (true);
CREATE POLICY "Allow public all on communities" ON public.communities FOR ALL USING (true);

-- ==============================================================================
-- INITIAL SEED DATA (Authentic Indian Legal Recipes)
-- ==============================================================================
INSERT INTO public.recipes (id, name, cuisine, cuisine_id, image, description, prep_time, cook_time, total_time, servings, difficulty, calories, protein, carbs, fat, fiber, sugar, rating, saves, views, likes, creator_id, creator_name, creator_avatar, has_video, tags, ingredients, instructions)
VALUES
(
    'recipe-1',
    'Hyderabadi Dum Biryani',
    'North Indian',
    'cuisine-1',
    'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f4?w=600&h=400&fit=crop&auto=format&q=80',
    'A masterpiece of royal Indian culinary tradition. Tender marinated meat layered with aged basmati rice, saffron-infused milk, caramelized onions, and pure desi ghee, slow-cooked on dum.',
    30, 60, 90, 6, 'hard', 650, 34, 65, 22, 4, 3, 4.9, 15420, 89000, 12450,
    'creator-1', 'Chef Priya', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=80',
    true,
    ARRAY['#SundayBiryani', '#DumCooking', '#IndianFood', '#RoyalFlavours'],
    '[
        {"name": "Aged Basmati Rice", "amount": "2", "unit": "cups", "checked": false},
        {"name": "Chicken / Mutton Pieces", "amount": "600", "unit": "g", "checked": false},
        {"name": "Curd (Dahi)", "amount": "1", "unit": "cup", "checked": false},
        {"name": "Crispy Fried Onions (Birista)", "amount": "1.5", "unit": "cups", "checked": false},
        {"name": "Ginger Garlic Paste", "amount": "2", "unit": "tbsp", "checked": false},
        {"name": "Shahi Biryani Masala", "amount": "2", "unit": "tbsp", "checked": false},
        {"name": "Desi Ghee", "amount": "4", "unit": "tbsp", "checked": false},
        {"name": "Kashmiri Saffron Milk", "amount": "1", "unit": "pinch", "checked": false}
    ]'::jsonb,
    '[
        {"step": 1, "title": "Marinate the Meat", "description": "Marinate chicken with thick curd, ginger garlic paste, biryani spices, mint, fried onions, and ghee for 2 hours.", "duration": "120 mins"},
        {"step": 2, "title": "Parboil Rice", "description": "Boil soaked basmati rice in whole-spiced boiling water until 70% cooked. Drain immediately.", "duration": "15 mins"},
        {"step": 3, "title": "Handi Layering", "description": "Layer the marinated meat at the base, cover with fragrant rice, drizzle saffron milk and desi ghee.", "duration": "10 mins"},
        {"step": 4, "title": "Dum Seal Cooking", "description": "Seal the handi with wheat dough and slow cook on a hot tawa for 45 minutes on low flame.", "duration": "45 mins"}
    ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;
