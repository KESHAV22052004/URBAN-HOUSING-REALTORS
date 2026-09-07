import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PropertyCard, Property as CardProperty } from "./PropertyCard";
import { toast } from "sonner";
import { propertyService } from "../services/propertyService";
import { Property } from "../lib/supabase";
import {
  MapPin,
  Share2,
  Heart,
  BedDouble,
  Bath,
  Maximize,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  Building2,
  Car,
  Dumbbell,
  Waves,
  Trees,
  Shield,
  Wifi,
  Sofa,
  Snowflake,
} from "lucide-react";

interface PropertyDetailsProps {
  propertyId?: string;
  onNavigate?: (page: string) => void;
}

export function PropertyDetails({ propertyId = "1" }: PropertyDetailsProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    async function loadProperty() {
      setLoading(true);
      try {
        const data = await propertyService.getPropertyById(propertyId);
        setProperty(data);
      } catch (err) {
        console.error("Error loading property details", err);
      } finally {
        setLoading(false);
      }
    }
    loadProperty();
  }, [propertyId]);

  const images = property?.images && property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1080"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.email || !inquiryForm.message) {
      toast.error("Please fill in name, email and message");
      return;
    }

    setInquirySubmitting(true);
    try {
      const res = await propertyService.submitInquiry({
        property_id: propertyId,
        name: inquiryForm.name,
        email: inquiryForm.email,
        phone: inquiryForm.phone,
        message: inquiryForm.message,
      });

      if (res.success) {
        toast.success("Inquiry Submitted Successfully!", {
          description: res.message,
        });
        setInquiryForm({ name: "", email: "", phone: "", message: "" });
        setShowContactForm(false);
      }
    } catch (err) {
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setInquirySubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary">Home</a>
            <span>/</span>
            <a href="/properties" className="hover:text-primary">Properties</a>
            <span>/</span>
            <span className="text-foreground">{property?.title || "Property Details"}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden bg-gray-200 mb-4">
            <img
              src={images[currentImageIndex]}
              alt={property?.title || "Property"}
              className="w-full h-full object-cover"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white text-sm rounded-md">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  toast.success("Property link copied to clipboard!");
                }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-md"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => toast.success("Saved to your favorites!")}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors shadow-md"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`h-20 rounded-lg overflow-hidden border-2 ${
                    idx === currentImageIndex ? "border-primary" : "border-transparent"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title & Price */}
            <div className="bg-white rounded-lg border border-border p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {property?.featured && (
                      <span className="px-3 py-1 bg-secondary text-white text-xs rounded-md">Featured</span>
                    )}
                    {property?.verified && (
                      <span className="px-3 py-1 bg-primary text-white text-xs rounded-md flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    {property?.title || "Luxury Property"}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>{property?.address || property?.location || "Prime Location"}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-primary">
                  {property?.price_formatted || (property?.price ? `$${property.price.toLocaleString()}` : "$425,000")}
                </span>
                <span className="text-muted-foreground mb-1">{property?.property_type} for {property?.listing_type || "Sale"}</span>
              </div>
            </div>

            {/* Key Details */}
            <div className="bg-white rounded-lg border border-border p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <BedDouble className="w-8 h-8 text-primary mb-2" />
                  <span className="text-2xl font-semibold">{property?.bedrooms ?? 3}</span>
                  <span className="text-sm text-muted-foreground">Bedrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Bath className="w-8 h-8 text-primary mb-2" />
                  <span className="text-2xl font-semibold">{property?.bathrooms ?? 2}</span>
                  <span className="text-sm text-muted-foreground">Bathrooms</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Maximize className="w-8 h-8 text-primary mb-2" />
                  <span className="text-2xl font-semibold">{property?.area_sqft ? `${property.area_sqft}` : "1,850"}</span>
                  <span className="text-sm text-muted-foreground">sq ft</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
                  <Calendar className="w-8 h-8 text-primary mb-2" />
                  <span className="text-2xl font-semibold">Ready</span>
                  <span className="text-sm text-muted-foreground">Status</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg border border-border p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {property?.description || "Welcome to this stunning property located in a prime neighborhood. Built with modern high-quality finishes, spacious living layout, and close proximity to transit, schools, and shopping."}
              </p>
            </div>

            {/* Amenities */}
            {property?.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-lg border border-border p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-muted border border-border rounded-lg text-sm text-foreground">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Contact & Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              {/* Owner / Agent Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{property?.owner_name || "Urban Housing Agent"}</h3>
                  <p className="text-sm text-muted-foreground">Verified Real Estate Partner</p>
                </div>
              </div>

              {/* Contact Form */}
              {!showContactForm ? (
                <div className="space-y-3">
                  <a 
                    href={`tel:${property?.owner_phone || "+15552345678"}`}
                    className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Agent</span>
                  </a>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="w-full px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Send Message / Inquiry</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-1 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 font-medium">Email Address</label>
                    <input
                      type="email"
                      required
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 font-medium">Message</label>
                    <textarea
                      rows={3}
                      required
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      placeholder={`I am interested in ${property?.title || "this property"} and would like to schedule a visit.`}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={inquirySubmitting}
                    className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 font-medium"
                  >
                    {inquirySubmitting ? "Submitting..." : "Send Inquiry"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="w-full px-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const similarProperties: CardProperty[] = [
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1679364297777-1db77b6199be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    title: "Modern Villa with Pool",
    price: "$850,000",
    location: "Beverly Hills, LA",
    bedrooms: 5,
    bathrooms: 4,
    area: "4,200 sq ft",
    propertyType: "Villa",
    verified: true,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1627141234469-24711efb373c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    title: "Contemporary House",
    price: "$595,000",
    location: "Chicago Suburbs",
    bedrooms: 4,
    bathrooms: 3,
    area: "2,800 sq ft",
    propertyType: "House",
    verified: true,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1605352081508-2e09927ecfe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    title: "Cozy 2BHK Apartment",
    price: "$295,000",
    location: "San Francisco",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,200 sq ft",
    propertyType: "Apartment",
    verified: true,
  },
];