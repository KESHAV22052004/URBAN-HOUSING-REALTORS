import { useParams, Navigate } from "react-router";
import { PropertyDetails } from "../components/PropertyDetails";

export function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  
  // If no ID is provided, redirect to properties page
  if (!id) {
    return <Navigate to="/properties" replace />;
  }
  
  return <PropertyDetails propertyId={id} />;
}
