import { Link } from "react-router";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage="not-found" />
      
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-lg">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-50 rounded-full mb-6">
              <Search className="w-12 h-12 text-[#2563eb]" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn't find the page you're looking for. The property you're searching for might have been moved or doesn't exist.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors font-medium"
            >
              <Home className="w-5 h-5" />
              Go to Home
            </Link>
            <Link
              to="/properties"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#2563eb] hover:text-[#2563eb] transition-colors font-medium"
            >
              <Search className="w-5 h-5" />
              Browse Properties
            </Link>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Popular searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Mumbai", "Bangalore", "Delhi NCR", "Pune"].map((city) => (
                <Link
                  key={city}
                  to="/properties"
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
