import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SearchBar } from "../components/SearchBar";
import { PropertyCard, Property as CardProperty } from "../components/PropertyCard";
import { Building2, Home, Store, MapPin, ArrowRight } from "lucide-react";
import { propertyService } from "../services/propertyService";

const popularCities = [
  { name: "Mumbai", properties: "15,234", image: "https://images.unsplash.com/photo-1758022959220-3f082ac0fd11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2Nzg1NDQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Bangalore", properties: "12,456", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2NzgxMzI1MXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Delhi NCR", properties: "18,892", image: "https://images.unsplash.com/photo-1580741753044-b3f303ad361b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMGNvbW1lcmNpYWx8ZW58MXx8fHwxNzY3ODY4MjkyfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { name: "Pune", properties: "8,234", image: "https://images.unsplash.com/photo-1767472873864-5912fa593e11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMHRvd25ob3VzZXxlbnwxfHx8fDE3Njc4OTQ3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080" },
];

export function HomePage() {
  const navigate = useNavigate();
  const [featuredProperties, setFeaturedProperties] = useState<CardProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await propertyService.getProperties({ featured: true });
        const mapped: CardProperty[] = data.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price_formatted || `$${p.price?.toLocaleString()}`,
          location: p.location,
          bedrooms: p.bedrooms,
          bathrooms: p.bathrooms,
          area: `${p.area_sqft} sq ft`,
          image: p.images?.[0] || "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1080",
          propertyType: p.property_type,
          listingType: p.listing_type || "sale",
          featured: p.featured ?? true,
          verified: p.verified ?? true,
        }));
        setFeaturedProperties(mapped);
      } catch (e) {
        console.error("Failed to load featured properties", e);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);


  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onNavigate={navigate} currentPage="home" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Find Your Dream Property
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
              Search from thousands of properties across India. Buy, Rent, or Invest in your perfect home.
            </p>
          </div>
          <SearchBar />
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/properties")}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#2563eb] hover:shadow-lg transition-all group"
            >
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#2563eb] transition-colors">
                <Home className="h-6 w-6 text-[#2563eb] group-hover:text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Buy</h3>
              <p className="text-sm text-gray-600">15,234 Properties</p>
            </button>

            <button
              onClick={() => navigate("/properties")}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#2563eb] hover:shadow-lg transition-all group"
            >
              <div className="bg-green-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-[#10b981] transition-colors">
                <Building2 className="h-6 w-6 text-[#10b981] group-hover:text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Rent</h3>
              <p className="text-sm text-gray-600">8,456 Properties</p>
            </button>

            <button
              onClick={() => navigate("/properties")}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#2563eb] hover:shadow-lg transition-all group"
            >
              <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-600 transition-colors">
                <Store className="h-6 w-6 text-purple-600 group-hover:text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Commercial</h3>
              <p className="text-sm text-gray-600">3,892 Properties</p>
            </button>

            <button
              onClick={() => navigate("/properties")}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#2563eb] hover:shadow-lg transition-all group"
            >
              <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-600 transition-colors">
                <MapPin className="h-6 w-6 text-orange-600 group-hover:text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Plots</h3>
              <p className="text-sm text-gray-600">2,234 Properties</p>
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Properties</h2>
            <button
              onClick={() => navigate("/properties")}
              className="text-[#2563eb] hover:text-[#1d4ed8] flex items-center gap-1 group"
            >
              View All
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={(id) => navigate("property-details", { state: { id } })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Cities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {popularCities.map((city) => (
              <button
                key={city.name}
                onClick={() => navigate("/properties")}
                className="group relative h-48 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                  <p className="text-sm text-gray-200">{city.properties} Properties</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#2563eb] to-[#10b981] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to List Your Property?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of property owners and reach millions of potential buyers and renters.
          </p>
          <button
            onClick={() => navigate("/add-property")}
            className="px-8 py-3 bg-white text-[#2563eb] rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Post Your Property for FREE
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}