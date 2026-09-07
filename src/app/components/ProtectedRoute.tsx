import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isSignedIn, isLoaded, isAdmin } = useAuth();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#2563eb]"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    // Redirect to login page, but save the location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check for admin role
  if (requireAdmin && !isAdmin) {
    // Redirect to home if user is not an admin
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}