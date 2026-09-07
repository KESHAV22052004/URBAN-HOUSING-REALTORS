import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { PropertyListingPage } from "./pages/PropertyListingPage";
import { PropertyDetailsPage } from "./pages/PropertyDetailsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AddPropertyPage } from "./pages/AddPropertyPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ProtectedRoute } from "./components/ProtectedRoute";

/**
 * Application routes configuration
 * 
 * Protected routes require authentication:
 * - /dashboard - User dashboard (requires user authentication)
 * - /add-property - Add property form (requires user authentication)
 * - /admin - Admin dashboard (requires admin role)
 */
export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignupPage,
  },
  {
    path: "/properties",
    Component: PropertyListingPage,
  },
  {
    path: "/property/:id",
    Component: PropertyDetailsPage,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/add-property",
    element: (
      <ProtectedRoute>
        <AddPropertyPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requireAdmin>
        <AdminDashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);