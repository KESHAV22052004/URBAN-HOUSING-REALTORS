import { createClient } from "@supabase/supabase-js";

// Supabase Connection Credentials
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith("https://") &&
  supabaseAnonKey.length > 20
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database Types
export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  price_formatted?: string;
  location: string;
  address?: string;
  city: string;
  property_type: "Apartment" | "Villa" | "House" | "Commercial" | "Plot" | string;
  listing_type?: "Buy" | "Rent" | "Commercial" | "Plots" | string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  featured?: boolean;
  verified?: boolean;
  status?: "active" | "pending" | "sold" | "rented";
  images: string[];
  amenities?: string[];
  owner_id?: string;
  owner_name?: string;
  owner_email?: string;
  owner_phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Inquiry {
  id?: string;
  property_id: string;
  sender_user_id?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status?: string;
  created_at?: string;
}

export interface Favorite {
  id?: string;
  user_id: string;
  property_id: string;
  created_at?: string;
}
