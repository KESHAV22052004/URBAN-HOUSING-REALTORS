import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function FilterSidebar({ isOpen = true, onClose }: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedBHK, setSelectedBHK] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [possessionStatus, setPossessionStatus] = useState<string[]>([]);

  const toggleBHK = (bhk: string) => {
    setSelectedBHK((prev) =>
      prev.includes(bhk) ? prev.filter((b) => b !== bhk) : [...prev, bhk]
    );
  };

  const togglePropertyType = (type: string) => {
    setPropertyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const togglePossessionStatus = (status: string) => {
    setPossessionStatus((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 sm:p-6 h-fit ${
        !isOpen ? "hidden lg:block" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-white"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] bg-white"
            />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full accent-[#2563eb]"
          />
        </div>
      </div>

      {/* BHK Type */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">BHK Type</h4>
        <div className="flex flex-wrap gap-2">
          {["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"].map((bhk) => (
            <button
              key={bhk}
              onClick={() => toggleBHK(bhk)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedBHK.includes(bhk)
                  ? "bg-[#2563eb] text-white border-[#2563eb]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {bhk}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Property Type</h4>
        <div className="space-y-2">
          {["Apartment", "Villa", "Builder Floor", "Plot", "Studio"].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={propertyTypes.includes(type)}
                onChange={() => togglePropertyType(type)}
                className="w-4 h-4 accent-[#2563eb] rounded"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Possession Status */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Possession Status</h4>
        <div className="space-y-2">
          {["Ready to Move", "Under Construction", "New Launch"].map((status) => (
            <label key={status} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={possessionStatus.includes(status)}
                onChange={() => togglePossessionStatus(status)}
                className="w-4 h-4 accent-[#2563eb] rounded"
              />
              <span className="text-sm text-gray-700">{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
        <div className="space-y-2">
          {["Parking", "Gym", "Swimming Pool", "Security", "Power Backup"].map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-[#2563eb] rounded" />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          Reset
        </button>
        <button className="flex-1 px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors">
          Apply
        </button>
      </div>
    </div>
  );
}
