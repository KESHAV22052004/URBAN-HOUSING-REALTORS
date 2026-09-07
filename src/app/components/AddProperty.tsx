import { useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { toast } from "sonner";
import { propertyService } from "../services/propertyService";
import {
  Home,
  MapPin,
  DollarSign,
  Maximize,
  CheckCircle,
  Upload,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
} from "lucide-react";

type StepType = 1 | 2 | 3 | 4 | 5;
type PageType = "home" | "listing" | "details" | "user-dashboard" | "add-property" | "admin-dashboard";

const steps = [
  { id: 1, title: "Basic Details", icon: Home },
  { id: 2, title: "Pricing & Area", icon: DollarSign },
  { id: 3, title: "Amenities", icon: CheckCircle },
  { id: 4, title: "Upload Media", icon: Upload },
  { id: 5, title: "Preview", icon: CheckCircle },
];

export function AddProperty({ onNavigate }: { onNavigate?: (page: PageType) => void }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<StepType>(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    propertyType: "Apartment",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    price: "",
    priceType: "Buy",
    area: "",
    bedrooms: "2",
    bathrooms: "2",
    amenities: [] as string[],
    description: "",
  });

  const amenitiesList = [
    "Parking",
    "Gym",
    "Swimming Pool",
    "Garden",
    "24/7 Security",
    "Wi-Fi",
    "Elevator",
    "Power Backup",
    "Playground",
    "Clubhouse",
    "Air Conditioning",
    "Furnished",
  ];

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep((currentStep + 1) as StepType);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as StepType);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const parsedPrice = parseFloat(formData.price.replace(/[^0-9.]/g, "")) || 350000;
      const parsedArea = parseInt(formData.area.replace(/[^0-9]/g, "")) || 1200;

      const newProp = await propertyService.createProperty({
        title: formData.title || "Modern Residential Property",
        description: formData.description || "Spacious, newly listed property with premium features and prime accessibility.",
        price: parsedPrice,
        price_formatted: `$${parsedPrice.toLocaleString()}`,
        location: `${formData.city || "New York"}, ${formData.state || "NY"}`,
        address: formData.address || `${formData.city || "New York"}, USA`,
        city: formData.city || "New York",
        property_type: formData.propertyType || "Apartment",
        listing_type: formData.priceType || "Buy",
        bedrooms: parseInt(formData.bedrooms) || 2,
        bathrooms: parseInt(formData.bathrooms) || 2,
        area_sqft: parsedArea,
        amenities: formData.amenities,
        images: [
          "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1080",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1080"
        ],
        verified: true,
        featured: false,
      });

      toast.success("Property Listed Successfully!", {
        description: `"${newProp.title}" is now published and available in listings!`,
        duration: 4000,
      });

      setTimeout(() => {
        navigate("/properties");
      }, 1200);
    } catch (err) {
      console.error("Error creating property", err);
      toast.error("Failed to list property. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Property</h1>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg border border-border p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                      currentStep >= step.id
                        ? "bg-primary border-primary text-white"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <p
                    className={`mt-2 text-sm font-medium hidden sm:block ${
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block">Step {step.id}</p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 transition-colors ${
                      currentStep > step.id ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg border border-border p-8">
          {/* Step 1: Basic Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Basic Details</h2>
              </div>

              <div>
                <label className="block text-sm mb-2">Property Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Luxury 3BHK Apartment in Downtown"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Property Type *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Apartment", "Villa", "House", "Plot"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, propertyType: type.toLowerCase() })}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        formData.propertyType === type.toLowerCase()
                          ? "border-primary bg-accent"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Home className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">{type}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Complete Address *</label>
                <input
                  type="text"
                  placeholder="Street address, building name, floor"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-2">City *</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">State *</label>
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    placeholder="ZIP"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Description</label>
                <textarea
                  rows={5}
                  placeholder="Describe your property..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Pricing & Area */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Pricing & Area Details</h2>
              </div>

              <div>
                <label className="block text-sm mb-2">Listing Type *</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, priceType: "sale" })}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      formData.priceType === "sale"
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-medium">For Sale</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, priceType: "rent" })}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      formData.priceType === "rent"
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-medium">For Rent</p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Price * {formData.priceType === "rent" && "(per month)"}
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Total Area (sq ft) *</label>
                <div className="relative">
                  <Maximize className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="e.g., 1850"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Bedrooms *</label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-2">Bathrooms *</label>
                  <select
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="1">1 Bathroom</option>
                    <option value="2">2 Bathrooms</option>
                    <option value="3">3 Bathrooms</option>
                    <option value="4">4 Bathrooms</option>
                    <option value="5">5+ Bathrooms</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Amenities */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Amenities & Features</h2>
                <p className="text-muted-foreground">Select all amenities available in your property</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenitiesList.map((amenity) => (
                  <label
                    key={amenity}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.amenities.includes(amenity)
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium">{amenity}</span>
                  </label>
                ))}
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Selected {formData.amenities.length} amenities
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Upload Media */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Upload Images & Videos</h2>
                <p className="text-muted-foreground">Add high-quality images to attract more buyers</p>
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-sm mb-2">Property Images *</label>
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG or JPEG (Max 10MB per image)</p>
                  <button
                    type="button"
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Choose Files
                  </button>
                </div>
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm mb-2">Property Video (Optional)</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="font-medium mb-1">Upload a video tour</p>
                  <p className="text-sm text-muted-foreground">MP4, MOV or AVI (Max 50MB)</p>
                  <button
                    type="button"
                    className="mt-3 px-6 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    Choose Video
                  </button>
                </div>
              </div>

              <div className="bg-accent p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Tip:</strong> Properties with at least 5 high-quality images get 3x more leads. 
                  Include images of all rooms, exteriors, and common areas.
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Preview */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Preview & Submit</h2>
                <p className="text-muted-foreground">Review your property details before submitting</p>
              </div>

              <div className="space-y-6">
                {/* Basic Details Preview */}
                <div className="p-6 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    Basic Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Property Title</p>
                      <p className="font-medium">{formData.title || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Property Type</p>
                      <p className="font-medium capitalize">{formData.propertyType}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground mb-1">Address</p>
                      <p className="font-medium">
                        {formData.address || "Not specified"}, {formData.city}, {formData.state} {formData.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pricing Preview */}
                <div className="p-6 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Pricing & Area
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Price</p>
                      <p className="font-medium">${formData.price || "0"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Area</p>
                      <p className="font-medium">{formData.area || "0"} sq ft</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Bedrooms</p>
                      <p className="font-medium">{formData.bedrooms} BHK</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Bathrooms</p>
                      <p className="font-medium">{formData.bathrooms}</p>
                    </div>
                  </div>
                </div>

                {/* Amenities Preview */}
                <div className="p-6 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Amenities ({formData.amenities.length})
                  </h3>
                  {formData.amenities.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 bg-white border border-border rounded-full text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No amenities selected</p>
                  )}
                </div>

                {/* Description Preview */}
                {formData.description && (
                  <div className="p-6 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">{formData.description}</p>
                  </div>
                )}

                {/* Terms */}
                <div className="flex items-start gap-3 p-4 border border-border rounded-lg">
                  <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">I agree to the terms and conditions</p>
                    <p className="text-muted-foreground">
                      By submitting this property, you confirm that all information provided is accurate and you have
                      the right to list this property.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center gap-2 px-8 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving Property...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submit Property
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}