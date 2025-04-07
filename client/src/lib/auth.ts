import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "./queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface AuthContextType {
  user: any | null;
  admin: any | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  adminLogin: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  admin: null,
  isAuthenticated: false,
  isAdmin: false,
  isLoading: true,
  login: async () => false,
  adminLogin: async () => false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [admin, setAdmin] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/users/me", {
          credentials: "include",
        });
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          setAdmin(null);
          return;
        }

        // Check if admin is logged in
        const adminRes = await fetch("/api/admin/me", {
          credentials: "include",
        });
        
        if (adminRes.ok) {
          const adminData = await adminRes.json();
          setAdmin(adminData);
          setUser(null);
          return;
        }

        // Neither user nor admin is logged in
        setUser(null);
        setAdmin(null);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setUser(null);
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await apiRequest("POST", "/api/auth/login", { username, password });
      const userData = await res.json();
      setUser(userData);
      setAdmin(null);
      toast({
        title: "Success",
        description: "You have been logged in successfully.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
      return false;
    }
  };

  const adminLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await apiRequest("POST", "/api/auth/admin/login", { username, password });
      const adminData = await res.json();
      setAdmin(adminData);
      setUser(null);
      toast({
        title: "Success",
        description: "You have been logged in as admin successfully.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login as admin. Please check your credentials.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      setUser(null);
      setAdmin(null);
      toast({
        title: "Success",
        description: "You have been logged out successfully.",
      });
      setLocation("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout.",
        variant: "destructive",
      });
    }
  };

  // Create the value object for the context
  const providerValue = {
    user,
    admin,
    isAuthenticated: !!user || !!admin,
    isAdmin: !!admin,
    isLoading,
    login,
    adminLogin,
    logout
  };

  // Use createElement to avoid JSX parsing issues
  return createElement(
    AuthContext.Provider,
    { value: providerValue },
    children
  );
}

// Helper function to create elements without JSX
function createElement(type: any, props: any, ...children: any[]) {
  return {
    $$typeof: Symbol.for('react.element'),
    type,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children
    },
    key: null,
    ref: null
  };
}

export function useAuth() {
  return useContext(AuthContext);
}
