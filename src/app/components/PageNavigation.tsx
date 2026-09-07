import { LayoutDashboard, Home as HomeIcon, List, FileText, PlusCircle, Settings } from "lucide-react";

type PageType = "home" | "listing" | "details" | "user-dashboard" | "add-property" | "admin-dashboard";

interface PageNavigationProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export function PageNavigation({ currentPage, onPageChange }: PageNavigationProps) {
  const pages = [
    { id: "home" as PageType, label: "Home Page", icon: HomeIcon },
    { id: "listing" as PageType, label: "Property Listing", icon: List },
    { id: "details" as PageType, label: "Property Details", icon: FileText },
    { id: "user-dashboard" as PageType, label: "User Dashboard", icon: LayoutDashboard },
    { id: "add-property" as PageType, label: "Add Property", icon: PlusCircle },
    { id: "admin-dashboard" as PageType, label: "Admin Dashboard", icon: Settings },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white border-2 border-primary rounded-full shadow-2xl px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground mr-2 hidden sm:block">
            Demo Pages:
          </span>
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => onPageChange(page.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
                currentPage === page.id
                  ? "bg-primary text-white shadow-md"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              title={page.label}
            >
              <page.icon className="w-4 h-4" />
              <span className="hidden lg:inline text-xs">{page.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
