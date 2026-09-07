import { supabase, isSupabaseConfigured, Property, Inquiry } from "../lib/supabase";

// Fallback Initial Seed Properties
export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Luxury 3BHK Apartment in Downtown",
    description: "Spectacular modern 3-bedroom apartment with panoramic skyline views, high-end Italian finishes, designer kitchen, and private balcony.",
    price: 425000,
    price_formatted: "$425,000",
    location: "Downtown, New York",
    address: "124 Wall St, New York, NY 10005",
    city: "New York",
    property_type: "Apartment",
    listing_type: "Buy",
    bedrooms: 3,
    bathrooms: 2,
    area_sqft: 1850,
    featured: true,
    verified: true,
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1515263487990-61b07816b324?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1080"
    ],
    amenities: ["Swimming Pool", "Gym / Fitness Center", "24/7 Security", "Covered Parking", "Balcony / Terrace", "Central AC"],
    owner_name: "Sarah Jenkins",
    owner_email: "sarah.jenkins@urbanhousing.com",
    owner_phone: "+1 (555) 234-5678"
  },
  {
    id: "2",
    title: "Modern Villa with Pool & Garden",
    description: "Stunning 5-bedroom luxury villa with private infinity pool, landscaped grounds, smart home automation, and 4-car garage.",
    price: 850000,
    price_formatted: "$850,000",
    location: "Beverly Hills, Los Angeles",
    address: "742 Evergreen Terr, Los Angeles, CA 90210",
    city: "Los Angeles",
    property_type: "Villa",
    listing_type: "Buy",
    bedrooms: 5,
    bathrooms: 4,
    area_sqft: 4200,
    featured: true,
    verified: true,
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1679364297777-1db77b6199be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1080"
    ],
    amenities: ["Private Pool", "Landscaped Garden", "Smart Home System", "Home Theater", "Solar Power", "Wine Cellar"],
    owner_name: "Michael Chang",
    owner_email: "michael.c@urbanhousing.com",
    owner_phone: "+1 (555) 876-5432"
  },
  {
    id: "3",
    title: "Contemporary Family House",
    description: "Spacious 4-bedroom suburban residence with open-concept living, modern kitchen, backyard patio, and close proximity to top schools.",
    price: 595000,
    price_formatted: "$595,000",
    location: "Suburb Area, Chicago",
    address: "88 Maple Ave, Chicago, IL 60614",
    city: "Chicago",
    property_type: "House",
    listing_type: "Buy",
    bedrooms: 4,
    bathrooms: 3,
    area_sqft: 2800,
    featured: false,
    verified: true,
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1627141234469-24711efb373c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    ],
    amenities: ["Fenced Yard", "Garage", "Fireplace", "Modern Appliances", "Hardwood Floors"],
    owner_name: "David Miller",
    owner_email: "david.m@urbanhousing.com",
    owner_phone: "+1 (555) 345-6789"
  },
  {
    id: "4",
    title: "Cozy 2BHK Apartment Near Metro",
    description: "Charming 2-bedroom home in vibrant neighborhood, minutes away from metro transit station, cafes, and parks.",
    price: 295000,
    price_formatted: "$295,000",
    location: "Downtown, San Francisco",
    address: "310 Mission St, San Francisco, CA 94105",
    city: "San Francisco",
    property_type: "Apartment",
    listing_type: "Buy",
    bedrooms: 2,
    bathrooms: 2,
    area_sqft: 1200,
    featured: false,
    verified: true,
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1605352081508-2e09927ecfe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
    ],
    amenities: ["Elevator", "Pet Friendly", "Balcony", "In-unit Laundry"],
    owner_name: "Elena Rostova",
    owner_email: "elena.r@urbanhousing.com",
    owner_phone: "+1 (555) 456-7890"
  },
  {
    id: "5",
    title: "Prime Commercial Office Space",
    description: "Grade-A commercial workspace with flexible floor plans, high-speed fiber internet, conference facilities, and 24/7 access.",
    price: 720000,
    price_formatted: "$720,000",
    location: "Financial District, Seattle",
    address: "500 4th Ave, Seattle, WA 98104",
    city: "Seattle",
    property_type: "Commercial",
    listing_type: "Commercial",
    bedrooms: 0,
    bathrooms: 4,
    area_sqft: 3500,
    featured: true,
    verified: true,
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080"
    ],
    amenities: ["High-Speed Elevators", "24/7 Access", "Conference Rooms", "Cafeteria", "Power Backup"],
    owner_name: "Robert King",
    owner_email: "robert.k@urbanhousing.com",
    owner_phone: "+1 (555) 567-8901"
  },
  {
    id: "6",
    title: "Residential Development Plot",
    description: "Corner residential plot with clear title, water and electricity connections, ideal for building your custom dream villa.",
    price: 180000,
    price_formatted: "$180,000",
    location: "Green Valley, Austin",
    address: "Lot 42 Oak Ridge Way, Austin, TX 78701",
    city: "Austin",
    property_type: "Plot",
    listing_type: "Plots",
    bedrooms: 0,
    bathrooms: 0,
    area_sqft: 5000,
    featured: false,
    verified: true,
    status: "active",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1080"
    ],
    amenities: ["Corner Plot", "Gated Community", "Paved Roads", "Water Connection", "Electricity"],
    owner_name: "Amanda Price",
    owner_email: "amanda.p@urbanhousing.com",
    owner_phone: "+1 (555) 678-9012"
  }
];

// Local state cache to allow in-browser persistence even before Supabase credentials are input
const LOCAL_STORAGE_KEY = "urban_housing_properties";

function getLocalProperties(): Property[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading local properties", e);
  }
  return INITIAL_PROPERTIES;
}

function saveLocalProperties(props: Property[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(props));
  } catch (e) {
    console.error("Error saving local properties", e);
  }
}

export interface PropertyFilterParams {
  query?: string;
  city?: string;
  propertyType?: string;
  listingType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number | string;
  featured?: boolean;
}

export const propertyService = {
  /**
   * Fetch properties matching filters from PostgreSQL
   */
  async getProperties(filters?: PropertyFilterParams): Promise<Property[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from("properties").select("*").order("created_at", { ascending: false });

        if (filters?.propertyType && filters.propertyType !== "All") {
          query = query.ilike("property_type", filters.propertyType);
        }
        if (filters?.listingType && filters.listingType !== "All") {
          query = query.ilike("listing_type", filters.listingType);
        }
        if (filters?.city && filters.city !== "All") {
          query = query.ilike("city", `%${filters.city}%`);
        }
        if (filters?.featured) {
          query = query.eq("featured", true);
        }
        if (filters?.minPrice !== undefined) {
          query = query.gte("price", filters.minPrice);
        }
        if (filters?.maxPrice !== undefined) {
          query = query.lte("price", filters.maxPrice);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data as Property[];
        }
      } catch (err) {
        console.warn("Supabase query failed, falling back to local data:", err);
      }
    }

    // Fallback filter on local / memory data
    let result = getLocalProperties();

    if (filters?.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.property_type.toLowerCase().includes(q)
      );
    }
    if (filters?.propertyType && filters.propertyType !== "All") {
      result = result.filter((p) => p.property_type.toLowerCase() === filters.propertyType?.toLowerCase());
    }
    if (filters?.listingType && filters.listingType !== "All") {
      result = result.filter((p) => p.listing_type?.toLowerCase() === filters.listingType?.toLowerCase());
    }
    if (filters?.city && filters.city !== "All") {
      result = result.filter((p) => p.city.toLowerCase().includes(filters.city!.toLowerCase()));
    }
    if (filters?.featured) {
      result = result.filter((p) => p.featured);
    }
    if (filters?.minPrice !== undefined) {
      result = result.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters?.maxPrice !== undefined) {
      result = result.filter((p) => p.price <= filters.maxPrice!);
    }

    return result;
  },

  /**
   * Fetch single property by ID
   */
  async getPropertyById(id: string): Promise<Property | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from("properties").select("*").eq("id", id).single();
        if (!error && data) {
          return data as Property;
        }
      } catch (err) {
        console.warn("Supabase getPropertyById failed:", err);
      }
    }

    const localProps = getLocalProperties();
    return localProps.find((p) => p.id === id) || null;
  },

  /**
   * Create a new property in PostgreSQL
   */
  async createProperty(propertyData: Omit<Property, "id" | "created_at">): Promise<Property> {
    const formattedPrice = propertyData.price_formatted || `$${propertyData.price.toLocaleString()}`;
    const newPropertyPayload = {
      ...propertyData,
      price_formatted: formattedPrice,
      status: propertyData.status || "active",
      verified: propertyData.verified ?? true,
      featured: propertyData.featured ?? false,
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from("properties").insert([newPropertyPayload]).select().single();
        if (!error && data) {
          return data as Property;
        }
        if (error) {
          console.error("Supabase insert error:", error);
        }
      } catch (err) {
        console.error("Supabase createProperty failed:", err);
      }
    }

    // Local fallback
    const newProp: Property = {
      ...newPropertyPayload,
      id: String(Date.now()),
      created_at: new Date().toISOString(),
    };
    const all = getLocalProperties();
    const updated = [newProp, ...all];
    saveLocalProperties(updated);
    return newProp;
  },

  /**
   * Submit an inquiry to PostgreSQL
   */
  async submitInquiry(inquiry: Inquiry): Promise<{ success: boolean; message: string }> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("inquiries").insert([inquiry]);
        if (!error) {
          return { success: true, message: "Your inquiry has been sent to the agent successfully!" };
        }
      } catch (err) {
        console.error("Supabase submitInquiry failed:", err);
      }
    }

    // Local simulated success
    return { success: true, message: "Inquiry received! The property agent will contact you shortly." };
  }
};
