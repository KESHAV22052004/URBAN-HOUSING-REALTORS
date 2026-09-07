import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export interface UserProfile {
  id: string;
  fullName: string;
  firstName: string;
  lastName?: string;
  email: string;
  primaryEmailAddress?: { emailAddress: string };
  role: "user" | "admin";
  imageUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isSignedIn: boolean;
  isLoaded: boolean;
  isAdmin: boolean;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (name: string, email: string, password?: string, role?: "user" | "admin") => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "urban_housing_auth_user";

// Default Demo Users for convenience
export const DEMO_ADMIN: UserProfile = {
  id: "admin_1",
  fullName: "Admin User",
  firstName: "Admin",
  lastName: "User",
  email: "admin@urbanhousing.com",
  primaryEmailAddress: { emailAddress: "admin@urbanhousing.com" },
  role: "admin",
  imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
};

export const DEMO_USER: UserProfile = {
  id: "user_1",
  fullName: "John Doe",
  firstName: "John",
  lastName: "Doe",
  email: "john@urbanhousing.com",
  primaryEmailAddress: { emailAddress: "john@urbanhousing.com" },
  role: "user",
  imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved user", e);
    }
    return DEMO_USER;
  });
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const signIn = async (email: string, _password?: string) => {
    setIsLoaded(false);
    const isAdminEmail = email.toLowerCase().includes("admin");
    const names = email.split("@")[0].split(".");
    const firstName = names[0] ? names[0].charAt(0).toUpperCase() + names[0].slice(1) : "User";
    const lastName = names[1] ? names[1].charAt(0).toUpperCase() + names[1].slice(1) : "";
    const fullName = `${firstName} ${lastName}`.trim();

    let loggedUser: UserProfile = {
      id: `usr_${Date.now()}`,
      fullName: isAdminEmail ? "Admin User" : fullName,
      firstName: isAdminEmail ? "Admin" : firstName,
      lastName: isAdminEmail ? "User" : lastName,
      email: email,
      primaryEmailAddress: { emailAddress: email },
      role: isAdminEmail ? "admin" : "user",
      imageUrl: isAdminEmail ? DEMO_ADMIN.imageUrl : DEMO_USER.imageUrl,
    };

    // If Supabase is connected, query profile
    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase.from("profiles").select("*").eq("email", email).maybeSingle();
        if (data) {
          loggedUser = {
            id: data.id,
            fullName: data.full_name || fullName,
            firstName: (data.full_name || "").split(" ")[0] || firstName,
            lastName: (data.full_name || "").split(" ").slice(1).join(" "),
            email: data.email,
            primaryEmailAddress: { emailAddress: data.email },
            role: data.role || (isAdminEmail ? "admin" : "user"),
            imageUrl: data.avatar_url || (data.role === "admin" ? DEMO_ADMIN.imageUrl : DEMO_USER.imageUrl),
          };
        }
      } catch (e) {
        console.warn("Could not query profiles from Supabase", e);
      }
    }

    setUser(loggedUser);
    setIsLoaded(true);
    return { success: true };
  };

  const signUp = async (name: string, email: string, _password?: string, role: "user" | "admin" = "user") => {
    setIsLoaded(false);
    const parts = name.trim().split(" ");
    const firstName = parts[0] || "User";
    const lastName = parts.slice(1).join(" ") || "";

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      fullName: name,
      firstName,
      lastName,
      email,
      primaryEmailAddress: { emailAddress: email },
      role,
      imageUrl: role === "admin" ? DEMO_ADMIN.imageUrl : DEMO_USER.imageUrl,
    };

    // Save profile to Supabase database if connected
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("profiles").upsert([
          {
            full_name: name,
            email,
            role,
            avatar_url: newUser.imageUrl,
          }
        ], { onConflict: "email" });
      } catch (e) {
        console.warn("Could not save profile to Supabase", e);
      }
    }

    setUser(newUser);
    setIsLoaded(true);
    return { success: true };
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isSignedIn: Boolean(user),
        isLoaded,
        isAdmin: user?.role === "admin",
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useUser() {
  const { user, isSignedIn, isLoaded } = useAuth();
  return {
    user: user ? {
      ...user,
      publicMetadata: { role: user.role },
      imageUrl: user.imageUrl || "",
    } : null,
    isSignedIn,
    isLoaded,
  };
}
