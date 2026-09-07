-- ============================================================================
-- URBAN HOUSING WEB PORTAL - POSTGRESQL DATABASE SCHEMA
-- ============================================================================

-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES / USERS TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'user', -- user, admin, agent
    avatar_url TEXT,
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);

-- 2. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL,
    price_formatted VARCHAR(50),
    location VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100) NOT NULL DEFAULT 'New York',
    property_type VARCHAR(50) NOT NULL DEFAULT 'Apartment', -- Apartment, Villa, House, Commercial, Plot
    listing_type VARCHAR(50) NOT NULL DEFAULT 'Buy',        -- Buy, Rent, Commercial, Plots
    bedrooms INT NOT NULL DEFAULT 1,
    bathrooms INT NOT NULL DEFAULT 1,
    area_sqft INT NOT NULL,
    featured BOOLEAN DEFAULT false,
    verified BOOLEAN DEFAULT true,
    status VARCHAR(50) DEFAULT 'active', -- active, pending, sold, rented
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    amenities TEXT[] DEFAULT ARRAY[]::TEXT[],
    owner_id VARCHAR(255),
    owner_name VARCHAR(100),
    owner_email VARCHAR(100),
    owner_phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_owner_id ON properties(owner_id);

-- 3. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    sender_user_id VARCHAR(255),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new', -- new, contacted, resolved
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inquiries_property_id ON inquiries(property_id);

-- 4. FAVORITES / WISHLIST TABLE
CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255) NOT NULL,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, property_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Allow public access
CREATE POLICY "Allow public read access to profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update to profiles" ON profiles FOR ALL USING (true);

CREATE POLICY "Allow public read access to properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Allow inserting properties" ON properties FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow updating own properties" ON properties FOR UPDATE USING (true);
CREATE POLICY "Allow deleting properties" ON properties FOR DELETE USING (true);

CREATE POLICY "Allow inserting inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow reading inquiries" ON inquiries FOR SELECT USING (true);

CREATE POLICY "Allow reading favorites" ON favorites FOR SELECT USING (true);
CREATE POLICY "Allow inserting favorites" ON favorites FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow deleting favorites" ON favorites FOR DELETE USING (true);

-- ============================================================================
-- SEED DATA (Starter Properties)
-- ============================================================================
INSERT INTO properties (
    title, description, price, price_formatted, location, address, city, property_type, listing_type, bedrooms, bathrooms, area_sqft, featured, verified, status, images, amenities, owner_name, owner_email, owner_phone
) VALUES
(
    'Luxury 3BHK Apartment in Downtown',
    'Spectacular modern 3-bedroom apartment with panoramic skyline views, high-end Italian finishes, designer kitchen, and private balcony.',
    425000,
    '$425,000',
    'Downtown, New York',
    '124 Wall St, New York, NY 10005',
    'New York',
    'Apartment',
    'Buy',
    3,
    2,
    1850,
    true,
    true,
    'active',
    ARRAY['https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1080'],
    ARRAY['Swimming Pool', 'Gym / Fitness Center', '24/7 Security', 'Covered Parking', 'Balcony / Terrace', 'Central AC'],
    'Sarah Jenkins',
    'sarah.jenkins@urbanhousing.com',
    '+1 (555) 234-5678'
),
(
    'Modern Villa with Pool & Garden',
    'Stunning 5-bedroom luxury villa with private infinity pool, landscaped grounds, smart home automation, and 4-car garage.',
    850000,
    '$850,000',
    'Beverly Hills, Los Angeles',
    '742 Evergreen Terr, Los Angeles, CA 90210',
    'Los Angeles',
    'Villa',
    'Buy',
    5,
    4,
    4200,
    true,
    true,
    'active',
    ARRAY['https://images.unsplash.com/photo-1679364297777-1db77b6199be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080', 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1080'],
    ARRAY['Private Pool', 'Landscaped Garden', 'Smart Home System', 'Home Theater', 'Solar Power', 'Wine Cellar'],
    'Michael Chang',
    'michael.c@urbanhousing.com',
    '+1 (555) 876-5432'
),
(
    'Contemporary Family House',
    'Spacious 4-bedroom suburban residence with open-concept living, modern kitchen, backyard patio, and close proximity to top schools.',
    595000,
    '$595,000',
    'Suburb Area, Chicago',
    '88 Maple Ave, Chicago, IL 60614',
    'Chicago',
    'House',
    'Buy',
    4,
    3,
    2800,
    false,
    true,
    'active',
    ARRAY['https://images.unsplash.com/photo-1627141234469-24711efb373c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'],
    ARRAY['Fenced Yard', 'Garage', 'Fireplace', 'Modern Appliances', 'Hardwood Floors'],
    'David Miller',
    'david.m@urbanhousing.com',
    '+1 (555) 345-6789'
),
(
    'Cozy 2BHK Apartment Near Metro',
    'Charming 2-bedroom home in vibrant neighborhood, minutes away from metro transit station, cafes, and parks.',
    295000,
    '$295,000',
    'Downtown, San Francisco',
    '310 Mission St, San Francisco, CA 94105',
    'San Francisco',
    'Apartment',
    'Buy',
    2,
    2,
    1200,
    false,
    true,
    'active',
    ARRAY['https://images.unsplash.com/photo-1605352081508-2e09927ecfe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080'],
    ARRAY['Elevator', 'Pet Friendly', 'Balcony', 'In-unit Laundry'],
    'Elena Rostova',
    'elena.r@urbanhousing.com',
    '+1 (555) 456-7890'
),
(
    'Prime Commercial Office Space',
    'Grade-A commercial workspace with flexible floor plans, high-speed fiber internet, conference facilities, and 24/7 access.',
    720000,
    '$720,000',
    'Financial District, Seattle',
    '500 4th Ave, Seattle, WA 98104',
    'Seattle',
    'Commercial',
    'Commercial',
    0,
    4,
    3500,
    true,
    true,
    'active',
    ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080'],
    ARRAY['High-Speed Elevators', '24/7 Access', 'Conference Rooms', 'Cafeteria', 'Power Backup'],
    'Robert King',
    'robert.k@urbanhousing.com',
    '+1 (555) 567-8901'
),
(
    'Residential Development Plot',
    'Corner residential plot with clear title, water and electricity connections, ideal for building your custom dream villa.',
    180000,
    '$180,000',
    'Green Valley, Austin',
    'Lot 42 Oak Ridge Way, Austin, TX 78701',
    'Austin',
    'Plot',
    'Plots',
    0,
    0,
    5000,
    false,
    true,
    'active',
    ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1080'],
    ARRAY['Corner Plot', 'Gated Community', 'Paved Roads', 'Water Connection', 'Electricity'],
    'Amanda Price',
    'amanda.p@urbanhousing.com',
    '+1 (555) 678-9012'
);
