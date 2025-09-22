"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/app/_types";

/**
 * Defines the shape of the authentication context.
 * This includes the current user, loading state, and action functions.
 */
interface AuthContextType {
  user: User | null;
  isInitialized: boolean;
  updateUser: (userData: Partial<User>) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

/**
 * React context for managing application-wide authentication state.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

/**
 * Custom hook for accessing the authentication context.
 * Provides a clean and safe way to consume auth state and actions.
 * Throws an error if used outside an AuthProvider.
 * @returns {AuthContextType} The authentication context.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * Provider component that wraps the application and provides authentication state.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to render.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setInitialized] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
    } finally {
      setInitialized(true);
    }
  }, []);

  const updateUser = (userData: Partial<User>) => {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...userData } as User;
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    });
  };
  const login = async (email: string, password: string): Promise<void> => {
    if (email === "test@example.com" && password === "password123") {
      const userData: User = {
        name: "Test User",
        email: "test@example.com",
        avatarUrl: "https://github.com/shadcn.png",
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/chat");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  const value = { user, isInitialized, login, logout, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
