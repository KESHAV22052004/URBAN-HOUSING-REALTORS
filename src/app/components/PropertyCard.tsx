import { Link } from "react-router";
import { Heart, MapPin, Maximize, BedDouble, Bath, Phone, Mail } from "lucide-react";

export interface Property {
  id: string;
  image: string;
  title: string;
  price: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area: string;
  propertyType?: string;
  listingType?: string;
  featured?: boolean;
  verified?: boolean;
}

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (id: string) => void;
}

export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const {
    id,
    image,
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    propertyType,
    featured = false,
    verified = false,
  } = property;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      e.preventDefault();
      return;
    }
  };

  return (
    <Link 
      to={`/property/${id}`}
      onClick={handleCardClick}
      className="block bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#2563eb] transition-all group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#2563eb] hover:text-white transition-colors shadow-md"
        >
          <Heart className="w-4 h-4" />
        </button>
        {featured && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-[#10b981] text-white text-xs rounded-md font-medium shadow-md">
            Featured
          </span>
        )}
        {verified && (
          <span className="absolute bottom-3 left-3 px-3 py-1 bg-[#2563eb] text-white text-xs rounded-md font-medium shadow-md">
            Verified
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1 pr-2 group-hover:text-[#2563eb] transition-colors">
            {title}
          </h3>
          {propertyType && (
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded flex-shrink-0">
              {propertyType}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-gray-600 mb-3">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          {bedrooms && (
            <div className="flex items-center gap-1">
              <BedDouble className="w-4 h-4" />
              <span>{bedrooms} BHK</span>
            </div>
          )}
          {bathrooms && (
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{bathrooms}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{area}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">Price</p>
            <p className="text-lg font-bold text-[#2563eb]">{price}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-2 border-2 border-gray-200 rounded-lg hover:border-[#2563eb] hover:bg-blue-50 hover:text-[#2563eb] transition-colors"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="p-2 border-2 border-gray-200 rounded-lg hover:border-[#2563eb] hover:bg-blue-50 hover:text-[#2563eb] transition-colors"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}