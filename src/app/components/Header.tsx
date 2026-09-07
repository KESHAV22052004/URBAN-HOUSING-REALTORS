import { Building2, Search, Menu, X, User, LogOut, LayoutDashboard, Shield, Heart, ChevronDown, Settings } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  onSearch?: (query: string) => void;
  currentPage?: string;
}

export function Header({ onSearch }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isSignedIn, signOut, isAdmin } = useAuth();

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isUserMenuOpen]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="w-8 h-8 text-[#2563eb]" />
            <span className="text-xl font-semibold text-gray-900">Urban Housing</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/properties" 
              className={`text-sm transition-colors ${
                isActive('/properties') ? 'text-[#2563eb] font-semibold' : 'text-gray-700 hover:text-[#2563eb]'
              }`}
            >
              Buy
            </Link>
            <Link 
              to="/properties" 
              className="text-sm text-gray-700 hover:text-[#2563eb] transition-colors"
            >
              Rent
            </Link>
            <Link 
              to="/properties" 
              className="text-sm text-gray-700 hover:text-[#2563eb] transition-colors"
            >
              Commercial
            </Link>
            <Link 
              to="/properties" 
              className="text-sm text-gray-700 hover:text-[#2563eb] transition-colors"
            >
              Plots
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors">
              <Heart className="w-5 h-5" />
              <span>Saved</span>
            </button>

            {isSignedIn && user ? (
              <div className="hidden md:block relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {user.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt={user.fullName || "User"} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-[#2563eb] rounded-full flex items-center justify-center text-white font-medium">
                      {user.firstName?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="font-medium">{user.firstName || "User"}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border-2 border-gray-100 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.fullName || user.firstName}</p>
                      <p className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                      {isAdmin && (
                        <span className="inline-block mt-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded font-medium">
                          Admin
                        </span>
                      )}
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => handleNavigation('/login')}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}

            <button 
              onClick={() => handleNavigation('/add-property')}
              className="px-4 py-2 text-sm bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors font-medium"
            >
              Post Property
            </button>
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col p-4 gap-3">
            <Link 
              to="/properties" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm text-gray-700 hover:text-[#2563eb] transition-colors py-2"
            >
              Buy
            </Link>
            <Link 
              to="/properties" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm text-gray-700 hover:text-[#2563eb] transition-colors py-2"
            >
              Rent
            </Link>
            <Link 
              to="/properties" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm text-gray-700 hover:text-[#2563eb] transition-colors py-2"
            >
              Commercial
            </Link>
            <Link 
              to="/properties" 
              onClick={() => setIsMenuOpen(false)}
              className="text-sm text-gray-700 hover:text-[#2563eb] transition-colors py-2"
            >
              Plots
            </Link>
            <div className="border-t border-gray-200 pt-3 mt-2">
              <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors py-2">
                <Heart className="w-5 h-5" />
                <span>Saved Properties</span>
              </button>
              
              {isSignedIn && user ? (
                <>
                  <div className="py-3 border-t border-gray-200 mt-3">
                    <div className="flex items-center gap-3 mb-3">
                      {user.imageUrl ? (
                        <img 
                          src={user.imageUrl} 
                          alt={user.fullName || "User"} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-[#2563eb] rounded-full flex items-center justify-center text-white font-medium">
                          {user.firstName?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.fullName || user.firstName}</p>
                        <p className="text-xs text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors py-2"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors py-2"
                      >
                        <Settings className="w-5 h-5" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors py-2 w-full mt-2"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => handleNavigation('/login')}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#2563eb] transition-colors py-2 w-full"
                  >
                    <User className="w-5 h-5" />
                    <span>Login / Signup</span>
                  </button>
                  <button 
                    onClick={() => handleNavigation('/add-property')}
                    className="mt-2 w-full px-4 py-2 text-sm bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors"
                  >
                    Post Property
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}