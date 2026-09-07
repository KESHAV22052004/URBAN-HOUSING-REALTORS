import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PropertyCard, Property as CardProperty } from "./PropertyCard";
import { ChevronDown, SlidersHorizontal, Grid3x3, List, X, Loader2 } from "lucide-react";
import { propertyService } from "../services/propertyService";

export function PropertyListing() {
  const [properties, setProperties] = useState<CardProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevant");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [selectedBHK, setSelectedBHK] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      try {
        const rawProps = await propertyService.getProperties({
          maxPrice: priceRange[1],
        });

        let mapped: CardProperty[] = rawProps.map((p) => ({
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
          featured: p.featured ?? false,
          verified: p.verified ?? true,
        }));

        // Filter by types
        if (selectedTypes.length > 0) {
          mapped = mapped.filter((p) => p.propertyType && selectedTypes.includes(p.propertyType));
        }

        // Filter by BHK
        if (selectedBHK.length > 0) {
          mapped = mapped.filter((p) => {
            if (!p.bedrooms) return false;
            if (selectedBHK.includes("5+ BHK") && p.bedrooms >= 5) return true;
            return selectedBHK.includes(`${p.bedrooms} BHK`);
          });
        }

        // Sorting
        if (sortBy === "price-low") {
          mapped.sort((a, b) => (parseInt(a.price.replace(/[^0-9]/g, "")) || 0) - (parseInt(b.price.replace(/[^0-9]/g, "")) || 0));
        } else if (sortBy === "price-high") {
          mapped.sort((a, b) => (parseInt(b.price.replace(/[^0-9]/g, "")) || 0) - (parseInt(a.price.replace(/[^0-9]/g, "")) || 0));
        } else if (sortBy === "area") {
          mapped.sort((a, b) => (parseInt(b.area.replace(/[^0-9]/g, "")) || 0) - (parseInt(a.area.replace(/[^0-9]/g, "")) || 0));
        }

        setProperties(mapped);
      } catch (err) {
        console.error("Error loading properties:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, [priceRange, selectedTypes, selectedBHK, sortBy]);

  const toggleBHK = (bhk: string) => {
    setSelectedBHK(prev =>
      prev.includes(bhk) ? prev.filter(b => b !== bhk) : [...prev, bhk]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-muted border-b border-border">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary">Home</a>
            <span>/</span>
            <a href="#" className="hover:text-primary">Properties</a>
            <span>/</span>
            <span className="text-foreground">Buy in New York</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button className="text-sm text-primary hover:underline">Reset All</button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">$0</span>
                    <span className="font-medium text-primary">${(priceRange[1] / 1000)}K</span>
                  </div>
                </div>
              </div>

              {/* BHK Type */}
              <div className="mb-6 pb-6 border-b border-border">
                <h4 className="mb-3">BHK Type</h4>
                <div className="space-y-2">
                  {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((bhk) => (
                    <label key={bhk} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedBHK.includes(bhk)}
                        onChange={() => toggleBHK(bhk)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{bhk}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div className="mb-6 pb-6 border-b border-border">
                <h4 className="mb-3">Property Type</h4>
                <div className="space-y-2">
                  {["Apartment", "Villa", "House", "Penthouse", "Studio"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Possession Status */}
              <div className="mb-6 pb-6 border-b border-border">
                <h4 className="mb-3">Possession Status</h4>
                <div className="space-y-2">
                  {["Ready to Move", "Under Construction", "New Launch"].map((status) => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h4 className="mb-3">Amenities</h4>
                <div className="space-y-2">
                  {["Parking", "Gym", "Swimming Pool", "Garden", "Security"].map((amenity) => (
                    <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="bg-white rounded-lg border border-border p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{properties.length} Properties</span> found in New York
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-sm">Filters</span>
                  </button>

                  {/* Sort By */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="pl-4 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm appearance-none bg-white"
                    >
                      <option value="relevant">Most Relevant</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="area">Area: Largest First</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
                  </div>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-1">
                    <button
                      onClick={() => setView("grid")}
                      className={`p-2 rounded ${view === "grid" ? "bg-primary text-white" : "hover:bg-muted"}`}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={`p-2 rounded ${view === "list" ? "bg-primary text-white" : "hover:bg-muted"}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Grid */}
            <div className={`grid gap-6 ${view === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted">2</button>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted">3</button>
              <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Same filter content as desktop */}
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h4 className="mb-3">Price Range</h4>
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-muted-foreground">$0</span>
                    <span className="font-medium text-primary">${(priceRange[1] / 1000)}K</span>
                  </div>
                </div>

                {/* BHK Type */}
                <div className="pb-6 border-b border-border">
                  <h4 className="mb-3">BHK Type</h4>
                  <div className="space-y-2">
                    {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((bhk) => (
                      <label key={bhk} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedBHK.includes(bhk)}
                          onChange={() => toggleBHK(bhk)}
                          className="w-4 h-4 rounded border-border text-primary"
                        />
                        <span className="text-sm">{bhk}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div className="pb-6 border-b border-border">
                  <h4 className="mb-3">Property Type</h4>
                  <div className="space-y-2">
                    {["Apartment", "Villa", "House", "Penthouse", "Studio"].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(type)}
                          onChange={() => toggleType(type)}
                          className="w-4 h-4 rounded border-border text-primary"
                        />
                        <span className="text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 px-4 py-3 border border-border rounded-lg hover:bg-muted"
                >
                  Reset
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}