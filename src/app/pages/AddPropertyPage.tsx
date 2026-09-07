import { useNavigate } from "react-router";
import { AddProperty } from "../components/AddProperty";

// TODO: Add authentication check when auth is implemented
export function AddPropertyPage() {
  const navigate = useNavigate();
  
  const handleNavigate = (page: string) => {
    const routeMap: Record<string, string> = {
      "home": "/",
      "user-dashboard": "/dashboard",
      "add-property": "/add-property",
      "admin-dashboard": "/admin",
      "listing": "/properties",
      "details": "/property",
    };
    
    navigate(routeMap[page] || "/");
  };
  
  return <AddProperty onNavigate={handleNavigate} />;
}
