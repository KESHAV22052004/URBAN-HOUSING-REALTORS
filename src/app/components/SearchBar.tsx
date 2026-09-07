import { Search, MapPin, DollarSign, Home } from "lucide-react";

export function SearchBar() {
  return (
    <div className="bg-white rounded-lg shadow-xl border border-border p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="relative">
          <label className="block text-sm text-muted-foreground mb-2">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="City, locality or project"
              className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Property Type</label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
              <option>All Types</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>House</option>
              <option>Plot</option>
              <option>Commercial</option>
            </select>
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm text-muted-foreground mb-2">Budget</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <select className="w-full pl-10 pr-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring appearance-none">
              <option>Any Budget</option>
              <option>Under $50k</option>
              <option>$50k - $100k</option>
              <option>$100k - $250k</option>
              <option>$250k - $500k</option>
              <option>Above $500k</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Search className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}
